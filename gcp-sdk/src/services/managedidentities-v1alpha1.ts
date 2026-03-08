// ==========================================================================
// Managed Service for Microsoft Active Directory API (managedidentities v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "managedidentities",
  version: "v1alpha1",
  rootUrl: "https://managedidentities.googleapis.com/",
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

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
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
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
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
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface Trust {
  /** The fully qualified target domain name which will be in trust with current domain. */
  targetDomainName?: string;
  /** The type of trust represented by the trust resource. */
  trustType?: "TRUST_TYPE_UNSPECIFIED" | "FOREST" | "EXTERNAL" | (string & {});
  /** The trust direction decides the current domain is trusted, trusting or both. */
  trustDirection?:
    | "TRUST_DIRECTION_UNSPECIFIED"
    | "INBOUND"
    | "OUTBOUND"
    | "BIDIRECTIONAL"
    | (string & {});
  /** The trust authentication type which decides whether the trusted side has forest/domain wide access or selective access to approved set of resources. */
  selectiveAuthentication?: boolean;
  /** The target dns server ip addresses which can resolve the remote domain involved in trust. */
  targetDnsIpAddresses?: Array<string>;
  /** Input only, and will not be stored. The trust secret used for handshake with target domain. */
  trustHandshakeSecret?: string;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Output only. Last update time. */
  updateTime?: string;
  /** Output only. The current state of this trust. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "UPDATING"
    | "DELETING"
    | "CONNECTED"
    | "DISCONNECTED"
    | (string & {});
  /** Output only. Additional information about the current state of this trust, if available. */
  stateDescription?: string;
  /** Output only. The last heartbeat time when the trust was known to be connected. */
  lastKnownTrustConnectedHeartbeatTime?: string;
}

export const Trust: Schema.Schema<Trust> = Schema.suspend(() =>
  Schema.Struct({
    targetDomainName: Schema.optional(Schema.String),
    trustType: Schema.optional(Schema.String),
    trustDirection: Schema.optional(Schema.String),
    selectiveAuthentication: Schema.optional(Schema.Boolean),
    targetDnsIpAddresses: Schema.optional(Schema.Array(Schema.String)),
    trustHandshakeSecret: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    stateDescription: Schema.optional(Schema.String),
    lastKnownTrustConnectedHeartbeatTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Trust" }) as any as Schema.Schema<Trust>;

export interface Domain {
  /** Output only. Unique name of the domain in this scope including projects and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`. */
  name?: string;
  /** Optional. Resource labels to represent user provided metadata */
  labels?: Record<string, string>;
  /** Optional. The full names of the Google Compute Engine [networks](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. Network can be added using UpdateDomain later. Domain is only available on network part of authorized_networks. Caller needs to make sure that CIDR subnets do not overlap between networks, else domain creation will fail. */
  authorizedNetworks?: Array<string>;
  /** Required. The CIDR range of internal addresses that are reserved for this domain. Reserved networks must be /24 or larger. Ranges must be unique and non-overlapping with existing subnets in [Domain].[authorized_networks]. */
  reservedIpRange?: string;
  /** Required. Locations where domain needs to be provisioned. regions e.g. us-west1 or us-east4 Service supports up to 4 locations at once. Each location will use a /26 block. */
  locations?: Array<string>;
  /** Optional. Name of customer-visible admin used to perform Active Directory operations. If not specified `setupadmin` would be used. */
  managedIdentitiesAdminName?: string;
  /** Output only. Fully-qualified domain name of the exposed domain used by clients to connect to the service. Similar to what would be chosen for an Active Directory that is set up on an internal network. */
  fqdn?: string;
  /** Output only. The time the instance was created. Synthetic field is populated automatically by CCFE. go/ccfe-synthetic-field-user-guide */
  createTime?: string;
  /** Output only. Last update time. Synthetic field is populated automatically by CCFE. */
  updateTime?: string;
  /** Output only. The current state of this domain. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "DELETING"
    | "REPAIRING"
    | "PERFORMING_MAINTENANCE"
    | "DOWN"
    | (string & {});
  /** Output only. Additional information about the current status of this domain, if available. */
  statusMessage?: string;
  /** Output only. The current trusts associated with the domain. */
  trusts?: Array<Trust>;
  /** Optional. Configuration for audit logs. True if audit logs are enabled, else false. Default is audit logs disabled. */
  auditLogsEnabled?: boolean;
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    authorizedNetworks: Schema.optional(Schema.Array(Schema.String)),
    reservedIpRange: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(Schema.String)),
    managedIdentitiesAdminName: Schema.optional(Schema.String),
    fqdn: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    statusMessage: Schema.optional(Schema.String),
    trusts: Schema.optional(Schema.Array(Trust)),
    auditLogsEnabled: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface ResetAdminPasswordRequest {}

export const ResetAdminPasswordRequest: Schema.Schema<ResetAdminPasswordRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ResetAdminPasswordRequest",
  }) as any as Schema.Schema<ResetAdminPasswordRequest>;

export interface ResetAdminPasswordResponse {
  /** A random password. See admin for more information. */
  password?: string;
}

export const ResetAdminPasswordResponse: Schema.Schema<ResetAdminPasswordResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      password: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResetAdminPasswordResponse",
  }) as any as Schema.Schema<ResetAdminPasswordResponse>;

export interface ListDomainsResponse {
  /** A list of Managed Identities Service domains in the project. */
  domains?: Array<Domain>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDomainsResponse: Schema.Schema<ListDomainsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      domains: Schema.optional(Schema.Array(Domain)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListDomainsResponse",
  }) as any as Schema.Schema<ListDomainsResponse>;

export interface AttachTrustRequest {
  /** The domain trust resource. */
  trust?: Trust;
}

export const AttachTrustRequest: Schema.Schema<AttachTrustRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      trust: Schema.optional(Trust),
    }),
  ).annotate({
    identifier: "AttachTrustRequest",
  }) as any as Schema.Schema<AttachTrustRequest>;

export interface ReconfigureTrustRequest {
  /** The domain trust resource with updated dns conditional forwarder. */
  trust?: Trust;
}

export const ReconfigureTrustRequest: Schema.Schema<ReconfigureTrustRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      trust: Schema.optional(Trust),
    }),
  ).annotate({
    identifier: "ReconfigureTrustRequest",
  }) as any as Schema.Schema<ReconfigureTrustRequest>;

export interface DetachTrustRequest {
  /** The domain trust resource to removed. */
  trust?: Trust;
}

export const DetachTrustRequest: Schema.Schema<DetachTrustRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      trust: Schema.optional(Trust),
    }),
  ).annotate({
    identifier: "DetachTrustRequest",
  }) as any as Schema.Schema<DetachTrustRequest>;

export interface ValidateTrustRequest {
  /** The domain trust to validate trust state for. */
  trust?: Trust;
}

export const ValidateTrustRequest: Schema.Schema<ValidateTrustRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      trust: Schema.optional(Trust),
    }),
  ).annotate({
    identifier: "ValidateTrustRequest",
  }) as any as Schema.Schema<ValidateTrustRequest>;

export interface SQLIntegration {
  /** The unique name of the sql integration in the form of `projects/{project_id}/locations/global/domains/{domain_name}/sqlIntegrations/{sql_integration}` */
  name?: string;
  /** The full resource name of an integrated sql instance */
  sqlInstance?: string;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Output only. Last update time for this SQL instance. */
  updateTime?: string;
  /** Output only. The current state of the managed OU. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "DELETING"
    | "READY"
    | (string & {});
}

export const SQLIntegration: Schema.Schema<SQLIntegration> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sqlInstance: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SQLIntegration",
}) as any as Schema.Schema<SQLIntegration>;

export interface ListSQLIntegrationsResponse {
  /** A list of SQLIntegrations of a domain. */
  sqlIntegrations?: Array<SQLIntegration>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSQLIntegrationsResponse: Schema.Schema<ListSQLIntegrationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      sqlIntegrations: Schema.optional(Schema.Array(SQLIntegration)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListSQLIntegrationsResponse",
  }) as any as Schema.Schema<ListSQLIntegrationsResponse>;

export interface RestoreDomainRequest {
  /** Required. ID of the backup to be restored */
  backupId?: string;
}

export const RestoreDomainRequest: Schema.Schema<RestoreDomainRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      backupId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RestoreDomainRequest",
  }) as any as Schema.Schema<RestoreDomainRequest>;

export interface Certificate {
  /** The certificate subject. */
  subject?: string;
  /** The certificate thumbprint which uniquely identifies the certificate. */
  thumbprint?: string;
  /** The additional hostnames for the domain. */
  subjectAlternativeName?: Array<string>;
  /** The issuer of this certificate. */
  issuingCertificate?: Certificate;
  /** The certificate expire time. */
  expireTime?: string;
}

export const Certificate: Schema.Schema<Certificate> = Schema.suspend(() =>
  Schema.Struct({
    subject: Schema.optional(Schema.String),
    thumbprint: Schema.optional(Schema.String),
    subjectAlternativeName: Schema.optional(Schema.Array(Schema.String)),
    issuingCertificate: Schema.optional(Certificate),
    expireTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Certificate" }) as any as Schema.Schema<Certificate>;

export interface LDAPSSettings {
  /** The resource name of the LDAPS settings. Uses the form: `projects/{project}/locations/{location}/domains/{domain}`. */
  name?: string;
  /** Output only. The certificate used to configure LDAPS. Certificates can be chained with a maximum length of 15. */
  certificate?: Certificate;
  /** Output only. The current state of this LDAPS settings. */
  state?:
    | "STATE_UNSPECIFIED"
    | "UPDATING"
    | "ACTIVE"
    | "FAILED"
    | (string & {});
  /** Input only. The uploaded PKCS12-formatted certificate to configure LDAPS with. It will enable the domain controllers in this domain to accept LDAPS connections (either LDAP over SSL/TLS or the StartTLS operation). A valid certificate chain must form a valid x.509 certificate chain (or be comprised of a single self-signed certificate. It must be encrypted with either: 1) PBES2 + PBKDF2 + AES256 encryption and SHA256 PRF; or 2) pbeWithSHA1And3-KeyTripleDES-CBC Private key must be included for the leaf / single self-signed certificate. Note: For a fqdn your-example-domain.com, the wildcard fqdn is *.your-example-domain.com. Specifically the leaf certificate must have: - Either a blank subject or a subject with CN matching the wildcard fqdn. - Exactly two SANs - the fqdn and wildcard fqdn. - Encipherment and digital key signature key usages. - Server authentication extended key usage (OID=1.3.6.1.5.5.7.3.1) - Private key must be in one of the following formats: RSA, ECDSA, ED25519. - Private key must have appropriate key length: 2048 for RSA, 256 for ECDSA - Signature algorithm of the leaf certificate cannot be MD2, MD5 or SHA1. */
  certificatePfx?: string;
  /** Input only. The password used to encrypt the uploaded pfx certificate. */
  certificatePassword?: string;
  /** Output only. Last update time. */
  updateTime?: string;
}

export const LDAPSSettings: Schema.Schema<LDAPSSettings> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    certificate: Schema.optional(Certificate),
    state: Schema.optional(Schema.String),
    certificatePfx: Schema.optional(Schema.String),
    certificatePassword: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "LDAPSSettings",
}) as any as Schema.Schema<LDAPSSettings>;

export interface Peering {
  /** Output only. Unique name of the peering in this scope including projects and location using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`. */
  name?: string;
  /** Optional. Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Required. The full names of the Google Compute Engine [networks](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. Caller needs to make sure that CIDR subnets do not overlap between networks, else peering creation will fail. */
  authorizedNetwork?: string;
  /** Required. Full domain resource path for the Managed AD Domain involved in peering. The resource path should be in the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  domainResource?: string;
  /** Output only. The time the instance was created. */
  createTime?: string;
  /** Output only. Last update time. */
  updateTime?: string;
  /** Output only. The current state of this Peering. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "CONNECTED"
    | "DISCONNECTED"
    | "DELETING"
    | (string & {});
  /** Output only. Additional information about the current status of this peering, if available. */
  statusMessage?: string;
}

export const Peering: Schema.Schema<Peering> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    authorizedNetwork: Schema.optional(Schema.String),
    domainResource: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    statusMessage: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Peering" }) as any as Schema.Schema<Peering>;

export interface ListPeeringsResponse {
  /** A list of Managed Identities Service Peerings in the project. */
  peerings?: Array<Peering>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPeeringsResponse: Schema.Schema<ListPeeringsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      peerings: Schema.optional(Schema.Array(Peering)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListPeeringsResponse",
  }) as any as Schema.Schema<ListPeeringsResponse>;

export interface Backup {
  /** Output only. The unique name of the Backup in the form of projects/{project_id}/locations/global/domains/{domain_name}/backups/{name} */
  name?: string;
  /** Optional. Resource labels to represent user provided metadata. */
  labels?: Record<string, string>;
  /** Output only. The time the backups was created. */
  createTime?: string;
  /** Output only. Last update time. */
  updateTime?: string;
  /** Output only. Indicates whether it’s an on-demand backup or scheduled. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "ON_DEMAND"
    | "SCHEDULED"
    | "SCHEMA_EXTENSION"
    | (string & {});
  /** Output only. The current state of the backup. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "ACTIVE"
    | "FAILED"
    | "DELETING"
    | (string & {});
  /** Output only. Additional information about the current status of this backup, if available. */
  statusMessage?: string;
  /** Optional. A short description of the backup. */
  description?: string;
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    statusMessage: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** A list of Cloud AD backups in the domain. */
  backups?: Array<Backup>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      backups: Schema.optional(Schema.Array(Backup)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBackupsResponse",
  }) as any as Schema.Schema<ListBackupsResponse>;

export interface ExtendSchemaRequest {
  /** Required. Description for Schema Change. */
  description?: string;
  /** File stored in Cloud Storage bucket and represented in the form projects/{project_id}/buckets/{bucket_name}/objects/{object_name} File should be in the same project as the domain. */
  gcsPath?: string;
  /** File uploaded as a byte stream input. */
  fileContents?: string;
}

export const ExtendSchemaRequest: Schema.Schema<ExtendSchemaRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      gcsPath: Schema.optional(Schema.String),
      fileContents: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExtendSchemaRequest",
  }) as any as Schema.Schema<ExtendSchemaRequest>;

export interface OnPremDomainDetails {
  /** Required. FQDN of the on-prem domain being migrated. */
  domainName?: string;
  /** Optional. Option to disable SID filtering. */
  disableSidFiltering?: boolean;
}

export const OnPremDomainDetails: Schema.Schema<OnPremDomainDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      domainName: Schema.optional(Schema.String),
      disableSidFiltering: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OnPremDomainDetails",
  }) as any as Schema.Schema<OnPremDomainDetails>;

export interface EnableMigrationRequest {
  /** Required. List of the on-prem domains to be migrated. */
  migratingDomains?: Array<OnPremDomainDetails>;
  /** Optional. Period after which the migration would be auto disabled. If unspecified, a default timeout of 48h is used. */
  enableDuration?: string;
}

export const EnableMigrationRequest: Schema.Schema<EnableMigrationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      migratingDomains: Schema.optional(Schema.Array(OnPremDomainDetails)),
      enableDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnableMigrationRequest",
  }) as any as Schema.Schema<EnableMigrationRequest>;

export interface DisableMigrationRequest {}

export const DisableMigrationRequest: Schema.Schema<DisableMigrationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableMigrationRequest",
  }) as any as Schema.Schema<DisableMigrationRequest>;

export interface CheckMigrationPermissionRequest {}

export const CheckMigrationPermissionRequest: Schema.Schema<CheckMigrationPermissionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CheckMigrationPermissionRequest",
  }) as any as Schema.Schema<CheckMigrationPermissionRequest>;

export interface OnPremDomainSIDDetails {
  /** FQDN of the on-prem domain being migrated. */
  name?: string;
  /** Current SID filtering state. */
  sidFilteringState?:
    | "SID_FILTERING_STATE_UNSPECIFIED"
    | "ENABLED"
    | "DISABLED"
    | (string & {});
}

export const OnPremDomainSIDDetails: Schema.Schema<OnPremDomainSIDDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sidFilteringState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OnPremDomainSIDDetails",
  }) as any as Schema.Schema<OnPremDomainSIDDetails>;

export interface CheckMigrationPermissionResponse {
  /** The state of DomainMigration. */
  state?:
    | "STATE_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | "NEEDS_MAINTENANCE"
    | (string & {});
  /** The state of SID filtering of all the domains which has trust established. */
  onpremDomains?: Array<OnPremDomainSIDDetails>;
}

export const CheckMigrationPermissionResponse: Schema.Schema<CheckMigrationPermissionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      onpremDomains: Schema.optional(Schema.Array(OnPremDomainSIDDetails)),
    }),
  ).annotate({
    identifier: "CheckMigrationPermissionResponse",
  }) as any as Schema.Schema<CheckMigrationPermissionResponse>;

export interface DomainJoinMachineRequest {
  /** Required. Full instance id token of compute engine VM to verify instance identity. More about this: https://cloud.google.com/compute/docs/instances/verifying-instance-identity#request_signature */
  vmIdToken?: string;
  /** Optional. OU name where the VM needs to be domain joined */
  ouName?: string;
  /** Optional. force if True, forces domain join even if the computer account already exists. */
  force?: boolean;
}

export const DomainJoinMachineRequest: Schema.Schema<DomainJoinMachineRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      vmIdToken: Schema.optional(Schema.String),
      ouName: Schema.optional(Schema.String),
      force: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DomainJoinMachineRequest",
  }) as any as Schema.Schema<DomainJoinMachineRequest>;

export interface DomainJoinMachineResponse {
  /** Offline domain join blob as the response */
  domainJoinBlob?: string;
}

export const DomainJoinMachineResponse: Schema.Schema<DomainJoinMachineResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      domainJoinBlob: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DomainJoinMachineResponse",
  }) as any as Schema.Schema<DomainJoinMachineResponse>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
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

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
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

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
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
  Schema.suspend(() =>
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
  Schema.suspend(() =>
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
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface GoogleCloudManagedidentitiesV1OpMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudManagedidentitiesV1OpMetadata: Schema.Schema<GoogleCloudManagedidentitiesV1OpMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudManagedidentitiesV1OpMetadata",
  }) as any as Schema.Schema<GoogleCloudManagedidentitiesV1OpMetadata>;

export interface GoogleCloudManagedidentitiesV1alpha1OpMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudManagedidentitiesV1alpha1OpMetadata: Schema.Schema<GoogleCloudManagedidentitiesV1alpha1OpMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudManagedidentitiesV1alpha1OpMetadata",
  }) as any as Schema.Schema<GoogleCloudManagedidentitiesV1alpha1OpMetadata>;

export interface GoogleCloudManagedidentitiesV1beta1OpMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudManagedidentitiesV1beta1OpMetadata: Schema.Schema<GoogleCloudManagedidentitiesV1beta1OpMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudManagedidentitiesV1beta1OpMetadata",
  }) as any as Schema.Schema<GoogleCloudManagedidentitiesV1beta1OpMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource {
  /** Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. */
  resourceType?: string;
  /** URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". */
  resourceUrl?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.String),
      resourceUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility {
  /** Whether an instance is eligible or ineligible. */
  eligible?: boolean;
  /** User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. */
  reason?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility> =
  Schema.suspend(() =>
    Schema.Struct({
      eligible: Schema.optional(Schema.Boolean),
      reason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility {
  /** An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. */
  eligibilities?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility
  >;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility> =
  Schema.suspend(() =>
    Schema.Struct({
      eligibilities: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata {
  /** The id of the node. This should be equal to SaasInstanceNode.node_id. */
  nodeId?: string;
  /** The location of the node, if different from instance location. */
  location?: string;
  /** If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeId: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      perSliEligibility: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata {
  /** Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. */
  tier?: string;
  /** Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. */
  nodes?: Array<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata>;
  /** Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      tier: Schema.optional(Schema.String),
      nodes: Schema.optional(
        Schema.Array(
          GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata,
        ),
      ),
      perSliEligibility: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  /** The scheduled start time for the maintenance. */
  startTime?: string;
  /** The scheduled end time for the maintenance. */
  endTime?: string;
  /** This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. */
  canReschedule?: boolean;
  /** The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. */
  rolloutManagementPolicy?: string;
  /** schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. */
  scheduleDeadlineTime?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      canReschedule: Schema.optional(Schema.Boolean),
      rolloutManagementPolicy: Schema.optional(Schema.String),
      scheduleDeadlineTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() =>
  Schema.Struct({
    hours: Schema.optional(Schema.Number),
    minutes: Schema.optional(Schema.Number),
    seconds: Schema.optional(Schema.Number),
    nanos: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DailyCycle {
  /** Time within the day to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const DailyCycle: Schema.Schema<DailyCycle> = Schema.suspend(() =>
  Schema.Struct({
    startTime: Schema.optional(TimeOfDay),
    duration: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DailyCycle" }) as any as Schema.Schema<DailyCycle>;

export interface Schedule {
  /** Allows to define schedule that runs specified day of the week. */
  day?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Time within the window to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() =>
  Schema.Struct({
    day: Schema.optional(Schema.String),
    startTime: Schema.optional(TimeOfDay),
    duration: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface WeeklyCycle {
  /** User can specify multiple windows in a week. Minimum of 1 window. */
  schedule?: Array<Schedule>;
}

export const WeeklyCycle: Schema.Schema<WeeklyCycle> = Schema.suspend(() =>
  Schema.Struct({
    schedule: Schema.optional(Schema.Array(Schedule)),
  }),
).annotate({ identifier: "WeeklyCycle" }) as any as Schema.Schema<WeeklyCycle>;

export interface MaintenanceWindow {
  /** Daily cycle. */
  dailyCycle?: DailyCycle;
  /** Weekly cycle. */
  weeklyCycle?: WeeklyCycle;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> =
  Schema.suspend(() =>
    Schema.Struct({
      dailyCycle: Schema.optional(DailyCycle),
      weeklyCycle: Schema.optional(WeeklyCycle),
    }),
  ).annotate({
    identifier: "MaintenanceWindow",
  }) as any as Schema.Schema<MaintenanceWindow>;

export interface Managedidentities_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Managedidentities_Date: Schema.Schema<Managedidentities_Date> =
  Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Managedidentities_Date",
  }) as any as Schema.Schema<Managedidentities_Date>;

export interface DenyMaintenancePeriod {
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. */
  startDate?: Managedidentities_Date;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. */
  endDate?: Managedidentities_Date;
  /** Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: * Full time. * All zeros for 00:00:00 UTC */
  time?: TimeOfDay;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> =
  Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(Managedidentities_Date),
      endDate: Schema.optional(Managedidentities_Date),
      time: Schema.optional(TimeOfDay),
    }),
  ).annotate({
    identifier: "DenyMaintenancePeriod",
  }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface UpdatePolicy {
  /** Optional. Maintenance window that is applied to resources covered by this policy. */
  window?: MaintenanceWindow;
  /** Optional. Relative scheduling channel applied to resource. */
  channel?:
    | "UPDATE_CHANNEL_UNSPECIFIED"
    | "EARLIER"
    | "LATER"
    | "WEEK1"
    | "WEEK2"
    | "WEEK5"
    | (string & {});
  /** Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. */
  denyMaintenancePeriods?: Array<DenyMaintenancePeriod>;
}

export const UpdatePolicy: Schema.Schema<UpdatePolicy> = Schema.suspend(() =>
  Schema.Struct({
    window: Schema.optional(MaintenanceWindow),
    channel: Schema.optional(Schema.String),
    denyMaintenancePeriods: Schema.optional(
      Schema.Array(DenyMaintenancePeriod),
    ),
  }),
).annotate({
  identifier: "UpdatePolicy",
}) as any as Schema.Schema<UpdatePolicy>;

export interface MaintenancePolicy {
  /** Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. */
  name?: string;
  /** Output only. The time when the resource was created. */
  createTime?: string;
  /** Output only. The time when the resource was updated. */
  updateTime?: string;
  /** Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Optional. The state of the policy. */
  state?: "STATE_UNSPECIFIED" | "READY" | "DELETING" | (string & {});
  /** Maintenance policy applicable to instance update. */
  updatePolicy?: UpdatePolicy;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      updatePolicy: Schema.optional(UpdatePolicy),
    }),
  ).annotate({
    identifier: "MaintenancePolicy",
  }) as any as Schema.Schema<MaintenancePolicy>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  /** Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. */
  exclude?: boolean;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. */
  maintenancePolicies?: Record<string, MaintenancePolicy>;
  /** Optional. If the update call is triggered from rollback, set the value as true. */
  isRollback?: boolean;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      exclude: Schema.optional(Schema.Boolean),
      maintenancePolicies: Schema.optional(
        Schema.Record(Schema.String, MaintenancePolicy),
      ),
      isRollback: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter {
  /** Optional. Array of string values. e.g. instance's replica information. */
  values?: Array<string>;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter> =
  Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter>;

export interface GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  /** Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout (go/wipeout) compliance. See go/elysium/project_ids#storage-guidance for more details. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "REPAIRING"
    | "DELETING"
    | "ERROR"
    | (string & {});
  /** Software versions that are used to deploy this instance. This can be mutated by rollout services. */
  softwareVersions?: Record<string, string>;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_settings.maintenance_policies is set. */
  maintenancePolicyNames?: Record<string, string>;
  /** Output only. ID of the associated GCP tenant project. See go/get-instance-metadata. */
  tenantProjectId?: string;
  /** Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See go/get-instance-metadata. */
  producerMetadata?: Record<string, string>;
  /** Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See go/get-instance-metadata. */
  provisionedResources?: Array<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource>;
  /** Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See go/cloud-ssa-standard-slo for feature description. */
  sloMetadata?: GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata;
  /** The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. */
  maintenanceSchedules?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule
  >;
  /** consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications (go/slm-rollout-maintenance-policies#prerequisites). */
  consumerDefinedName?: string;
  /** Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. */
  slmInstanceTemplate?: string;
  /** Optional. The MaintenanceSettings associated with instance. */
  maintenanceSettings?: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings;
  /** Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. */
  instanceType?: string;
  /** Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. */
  notificationParameters?: Record<
    string,
    GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter
  >;
  /** Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. */
  consumerProjectNumber?: string;
}

export const GoogleCloudSaasacceleratorManagementProvidersV1Instance: Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      softwareVersions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      maintenancePolicyNames: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      tenantProjectId: Schema.optional(Schema.String),
      producerMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      provisionedResources: Schema.optional(
        Schema.Array(
          GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource,
        ),
      ),
      sloMetadata: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata,
      ),
      maintenanceSchedules: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule,
        ),
      ),
      consumerDefinedName: Schema.optional(Schema.String),
      slmInstanceTemplate: Schema.optional(Schema.String),
      maintenanceSettings: Schema.optional(
        GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings,
      ),
      instanceType: Schema.optional(Schema.String),
      notificationParameters: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter,
        ),
      ),
      consumerProjectNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudSaasacceleratorManagementProvidersV1Instance",
  }) as any as Schema.Schema<GoogleCloudSaasacceleratorManagementProvidersV1Instance>;

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

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalOperationsRequest>;

export type ListProjectsLocationsGlobalOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsGlobalOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsGlobalOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsGlobalOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsGlobalOperationsRequest,
  ListProjectsLocationsGlobalOperationsResponse,
  ListProjectsLocationsGlobalOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalOperationsRequest,
  output: ListProjectsLocationsGlobalOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalOperationsRequest>;

export type GetProjectsLocationsGlobalOperationsResponse = Operation;
export const GetProjectsLocationsGlobalOperationsResponse = Operation;

export type GetProjectsLocationsGlobalOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsGlobalOperations: API.OperationMethod<
  GetProjectsLocationsGlobalOperationsRequest,
  GetProjectsLocationsGlobalOperationsResponse,
  GetProjectsLocationsGlobalOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsGlobalOperationsRequest,
  output: GetProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/locations/global/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalOperationsRequest>;

export type DeleteProjectsLocationsGlobalOperationsResponse = Empty;
export const DeleteProjectsLocationsGlobalOperationsResponse = Empty;

export type DeleteProjectsLocationsGlobalOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsGlobalOperations: API.OperationMethod<
  DeleteProjectsLocationsGlobalOperationsRequest,
  DeleteProjectsLocationsGlobalOperationsResponse,
  DeleteProjectsLocationsGlobalOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalOperationsRequest,
  output: DeleteProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsGlobalOperationsRequest>;

export type CancelProjectsLocationsGlobalOperationsResponse = Empty;
export const CancelProjectsLocationsGlobalOperationsResponse = Empty;

export type CancelProjectsLocationsGlobalOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsGlobalOperations: API.OperationMethod<
  CancelProjectsLocationsGlobalOperationsRequest,
  CancelProjectsLocationsGlobalOperationsResponse,
  CancelProjectsLocationsGlobalOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsGlobalOperationsRequest,
  output: CancelProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGlobalDomainsRequest {
  /** Resource project name and location using the form: `projects/{project_id}/locations/global` */
  parent: string;
  /** The fully qualified domain name. e.g. mydomain.myorganization.com, with the following restrictions: * Must contain only lowercase letters, numbers, periods and hyphens. * Must start with a letter. * Must contain between 2-64 characters. * Must end with a number or a letter. * Must not start with period. * Must be unique within the project. * First segment length (mydomain form example above) shouldn't exceed 15 chars. * The last segment cannot be fully numeric. */
  domainName?: string;
  /** Request body */
  body?: Domain;
}

export const CreateProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  domainName: Schema.optional(Schema.String).pipe(T.HttpQuery("domainName")),
  body: Schema.optional(Domain).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalDomainsRequest>;

export type CreateProjectsLocationsGlobalDomainsResponse = Operation;
export const CreateProjectsLocationsGlobalDomainsResponse = Operation;

export type CreateProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Creates a Microsoft AD Domain in a given project. Operation */
export const createProjectsLocationsGlobalDomains: API.OperationMethod<
  CreateProjectsLocationsGlobalDomainsRequest,
  CreateProjectsLocationsGlobalDomainsResponse,
  CreateProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsGlobalDomainsRequest,
  output: CreateProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ResetAdminPasswordProjectsLocationsGlobalDomainsRequest {
  /** The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
  /** Request body */
  body?: ResetAdminPasswordRequest;
}

export const ResetAdminPasswordProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ResetAdminPasswordRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:resetAdminPassword",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResetAdminPasswordProjectsLocationsGlobalDomainsRequest>;

export type ResetAdminPasswordProjectsLocationsGlobalDomainsResponse =
  ResetAdminPasswordResponse;
export const ResetAdminPasswordProjectsLocationsGlobalDomainsResponse =
  ResetAdminPasswordResponse;

export type ResetAdminPasswordProjectsLocationsGlobalDomainsError =
  DefaultErrors;

/** Resets managed identities admin password identified by managed_identities_admin_name */
export const resetAdminPasswordProjectsLocationsGlobalDomains: API.OperationMethod<
  ResetAdminPasswordProjectsLocationsGlobalDomainsRequest,
  ResetAdminPasswordProjectsLocationsGlobalDomainsResponse,
  ResetAdminPasswordProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ResetAdminPasswordProjectsLocationsGlobalDomainsRequest,
  output: ResetAdminPasswordProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalDomainsRequest {
  /** Required. The resource name of the domain location using the form: `projects/{project_id}/locations/global` */
  parent: string;
  /** If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. Filter specifying constraints of a list operation. For example, `Domain.fqdn="mydomain.myorginization"`. */
  filter?: string;
  /** Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalDomainsRequest>;

export type ListProjectsLocationsGlobalDomainsResponse = ListDomainsResponse;
export const ListProjectsLocationsGlobalDomainsResponse = ListDomainsResponse;

export type ListProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Lists Domains in a given project. */
export const listProjectsLocationsGlobalDomains: API.PaginatedOperationMethod<
  ListProjectsLocationsGlobalDomainsRequest,
  ListProjectsLocationsGlobalDomainsResponse,
  ListProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalDomainsRequest,
  output: ListProjectsLocationsGlobalDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalDomainsRequest {
  /** Domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
}

export const GetProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalDomainsRequest>;

export type GetProjectsLocationsGlobalDomainsResponse = Domain;
export const GetProjectsLocationsGlobalDomainsResponse = Domain;

export type GetProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Gets details of a single Domain. */
export const getProjectsLocationsGlobalDomains: API.OperationMethod<
  GetProjectsLocationsGlobalDomainsRequest,
  GetProjectsLocationsGlobalDomainsResponse,
  GetProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsGlobalDomainsRequest,
  output: GetProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGlobalDomainsRequest {
  /** Output only. Unique name of the domain in this scope including projects and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`. */
  name: string;
  /** Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Domain: * `labels` * `locations` * `authorized_networks` * `audit_logs_enabled` */
  updateMask?: string;
  /** Request body */
  body?: Domain;
}

export const PatchProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Domain).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalDomainsRequest>;

export type PatchProjectsLocationsGlobalDomainsResponse = Operation;
export const PatchProjectsLocationsGlobalDomainsResponse = Operation;

export type PatchProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Updates the metadata and configuration of a specified domain. Operation */
export const patchProjectsLocationsGlobalDomains: API.OperationMethod<
  PatchProjectsLocationsGlobalDomainsRequest,
  PatchProjectsLocationsGlobalDomainsResponse,
  PatchProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsGlobalDomainsRequest,
  output: PatchProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGlobalDomainsRequest {
  /** Domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
}

export const DeleteProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalDomainsRequest>;

export type DeleteProjectsLocationsGlobalDomainsResponse = Operation;
export const DeleteProjectsLocationsGlobalDomainsResponse = Operation;

export type DeleteProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Deletes identified domain. Operation */
export const deleteProjectsLocationsGlobalDomains: API.OperationMethod<
  DeleteProjectsLocationsGlobalDomainsRequest,
  DeleteProjectsLocationsGlobalDomainsResponse,
  DeleteProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalDomainsRequest,
  output: DeleteProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface AttachTrustProjectsLocationsGlobalDomainsRequest {
  /** The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
  /** Request body */
  body?: AttachTrustRequest;
}

export const AttachTrustProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AttachTrustRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:attachTrust",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AttachTrustProjectsLocationsGlobalDomainsRequest>;

export type AttachTrustProjectsLocationsGlobalDomainsResponse = Operation;
export const AttachTrustProjectsLocationsGlobalDomainsResponse = Operation;

export type AttachTrustProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Adds AD trust in a given domain. Operation */
export const attachTrustProjectsLocationsGlobalDomains: API.OperationMethod<
  AttachTrustProjectsLocationsGlobalDomainsRequest,
  AttachTrustProjectsLocationsGlobalDomainsResponse,
  AttachTrustProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AttachTrustProjectsLocationsGlobalDomainsRequest,
  output: AttachTrustProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ReconfigureTrustProjectsLocationsGlobalDomainsRequest {
  /** The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
  /** Request body */
  body?: ReconfigureTrustRequest;
}

export const ReconfigureTrustProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ReconfigureTrustRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:reconfigureTrust",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReconfigureTrustProjectsLocationsGlobalDomainsRequest>;

export type ReconfigureTrustProjectsLocationsGlobalDomainsResponse = Operation;
export const ReconfigureTrustProjectsLocationsGlobalDomainsResponse = Operation;

export type ReconfigureTrustProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Updates the dns conditional forwarder. Operation */
export const reconfigureTrustProjectsLocationsGlobalDomains: API.OperationMethod<
  ReconfigureTrustProjectsLocationsGlobalDomainsRequest,
  ReconfigureTrustProjectsLocationsGlobalDomainsResponse,
  ReconfigureTrustProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ReconfigureTrustProjectsLocationsGlobalDomainsRequest,
  output: ReconfigureTrustProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface DetachTrustProjectsLocationsGlobalDomainsRequest {
  /** The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
  /** Request body */
  body?: DetachTrustRequest;
}

export const DetachTrustProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DetachTrustRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:detachTrust",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DetachTrustProjectsLocationsGlobalDomainsRequest>;

export type DetachTrustProjectsLocationsGlobalDomainsResponse = Operation;
export const DetachTrustProjectsLocationsGlobalDomainsResponse = Operation;

export type DetachTrustProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Removes identified trust. Operation */
export const detachTrustProjectsLocationsGlobalDomains: API.OperationMethod<
  DetachTrustProjectsLocationsGlobalDomainsRequest,
  DetachTrustProjectsLocationsGlobalDomainsResponse,
  DetachTrustProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DetachTrustProjectsLocationsGlobalDomainsRequest,
  output: DetachTrustProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ValidateTrustProjectsLocationsGlobalDomainsRequest {
  /** The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
  /** Request body */
  body?: ValidateTrustRequest;
}

export const ValidateTrustProjectsLocationsGlobalDomainsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ValidateTrustRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:validateTrust",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ValidateTrustProjectsLocationsGlobalDomainsRequest>;

export type ValidateTrustProjectsLocationsGlobalDomainsResponse = Operation;
export const ValidateTrustProjectsLocationsGlobalDomainsResponse = Operation;

export type ValidateTrustProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Validate the trust state Operation */
export const validateTrustProjectsLocationsGlobalDomains: API.OperationMethod<
  ValidateTrustProjectsLocationsGlobalDomainsRequest,
  ValidateTrustProjectsLocationsGlobalDomainsResponse,
  ValidateTrustProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ValidateTrustProjectsLocationsGlobalDomainsRequest,
  output: ValidateTrustProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsGlobalDomainsRequest {
  /** Required. resource name for the domain to which the backup belongs */
  name: string;
  /** Request body */
  body?: RestoreDomainRequest;
}

export const RestoreProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreDomainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:restore",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsGlobalDomainsRequest>;

export type RestoreProjectsLocationsGlobalDomainsResponse = Operation;
export const RestoreProjectsLocationsGlobalDomainsResponse = Operation;

export type RestoreProjectsLocationsGlobalDomainsError = DefaultErrors;

/** RestoreDomain restores domain backup mentioned in the RestoreDomainRequest */
export const restoreProjectsLocationsGlobalDomains: API.OperationMethod<
  RestoreProjectsLocationsGlobalDomainsRequest,
  RestoreProjectsLocationsGlobalDomainsResponse,
  RestoreProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreProjectsLocationsGlobalDomainsRequest,
  output: RestoreProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface GetLdapssettingsProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  name: string;
}

export const GetLdapssettingsProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/ldapssettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLdapssettingsProjectsLocationsGlobalDomainsRequest>;

export type GetLdapssettingsProjectsLocationsGlobalDomainsResponse =
  LDAPSSettings;
export const GetLdapssettingsProjectsLocationsGlobalDomainsResponse =
  LDAPSSettings;

export type GetLdapssettingsProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Gets the domain ldaps settings. */
export const getLdapssettingsProjectsLocationsGlobalDomains: API.OperationMethod<
  GetLdapssettingsProjectsLocationsGlobalDomainsRequest,
  GetLdapssettingsProjectsLocationsGlobalDomainsResponse,
  GetLdapssettingsProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLdapssettingsProjectsLocationsGlobalDomainsRequest,
  output: GetLdapssettingsProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface UpdateLdapssettingsProjectsLocationsGlobalDomainsRequest {
  /** The resource name of the LDAPS settings. Uses the form: `projects/{project}/locations/{location}/domains/{domain}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: LDAPSSettings;
}

export const UpdateLdapssettingsProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(LDAPSSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/ldapssettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLdapssettingsProjectsLocationsGlobalDomainsRequest>;

export type UpdateLdapssettingsProjectsLocationsGlobalDomainsResponse =
  Operation;
export const UpdateLdapssettingsProjectsLocationsGlobalDomainsResponse =
  Operation;

export type UpdateLdapssettingsProjectsLocationsGlobalDomainsError =
  DefaultErrors;

/** Patches a single ldaps settings. */
export const updateLdapssettingsProjectsLocationsGlobalDomains: API.OperationMethod<
  UpdateLdapssettingsProjectsLocationsGlobalDomainsRequest,
  UpdateLdapssettingsProjectsLocationsGlobalDomainsResponse,
  UpdateLdapssettingsProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateLdapssettingsProjectsLocationsGlobalDomainsRequest,
  output: UpdateLdapssettingsProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ExtendSchemaProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  domain: string;
  /** Request body */
  body?: ExtendSchemaRequest;
}

export const ExtendSchemaProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  domain: Schema.String.pipe(T.HttpPath("domain")),
  body: Schema.optional(ExtendSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:extendSchema",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExtendSchemaProjectsLocationsGlobalDomainsRequest>;

export type ExtendSchemaProjectsLocationsGlobalDomainsResponse = Operation;
export const ExtendSchemaProjectsLocationsGlobalDomainsResponse = Operation;

export type ExtendSchemaProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Extend Schema for Domain */
export const extendSchemaProjectsLocationsGlobalDomains: API.OperationMethod<
  ExtendSchemaProjectsLocationsGlobalDomainsRequest,
  ExtendSchemaProjectsLocationsGlobalDomainsResponse,
  ExtendSchemaProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExtendSchemaProjectsLocationsGlobalDomainsRequest,
  output: ExtendSchemaProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface EnableMigrationProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  domain: string;
  /** Request body */
  body?: EnableMigrationRequest;
}

export const EnableMigrationProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    domain: Schema.String.pipe(T.HttpPath("domain")),
    body: Schema.optional(EnableMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:enableMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnableMigrationProjectsLocationsGlobalDomainsRequest>;

export type EnableMigrationProjectsLocationsGlobalDomainsResponse = Operation;
export const EnableMigrationProjectsLocationsGlobalDomainsResponse = Operation;

export type EnableMigrationProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Enable Domain Migration */
export const enableMigrationProjectsLocationsGlobalDomains: API.OperationMethod<
  EnableMigrationProjectsLocationsGlobalDomainsRequest,
  EnableMigrationProjectsLocationsGlobalDomainsResponse,
  EnableMigrationProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableMigrationProjectsLocationsGlobalDomainsRequest,
  output: EnableMigrationProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface DisableMigrationProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  domain: string;
  /** Request body */
  body?: DisableMigrationRequest;
}

export const DisableMigrationProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    domain: Schema.String.pipe(T.HttpPath("domain")),
    body: Schema.optional(DisableMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:disableMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DisableMigrationProjectsLocationsGlobalDomainsRequest>;

export type DisableMigrationProjectsLocationsGlobalDomainsResponse = Operation;
export const DisableMigrationProjectsLocationsGlobalDomainsResponse = Operation;

export type DisableMigrationProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Disable Domain Migration */
export const disableMigrationProjectsLocationsGlobalDomains: API.OperationMethod<
  DisableMigrationProjectsLocationsGlobalDomainsRequest,
  DisableMigrationProjectsLocationsGlobalDomainsResponse,
  DisableMigrationProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableMigrationProjectsLocationsGlobalDomainsRequest,
  output: DisableMigrationProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface CheckMigrationPermissionProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  domain: string;
  /** Request body */
  body?: CheckMigrationPermissionRequest;
}

export const CheckMigrationPermissionProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    domain: Schema.String.pipe(T.HttpPath("domain")),
    body: Schema.optional(CheckMigrationPermissionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:checkMigrationPermission",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CheckMigrationPermissionProjectsLocationsGlobalDomainsRequest>;

export type CheckMigrationPermissionProjectsLocationsGlobalDomainsResponse =
  CheckMigrationPermissionResponse;
export const CheckMigrationPermissionProjectsLocationsGlobalDomainsResponse =
  CheckMigrationPermissionResponse;

export type CheckMigrationPermissionProjectsLocationsGlobalDomainsError =
  DefaultErrors;

/** AuditMigration API gets the current state of DomainMigration */
export const checkMigrationPermissionProjectsLocationsGlobalDomains: API.OperationMethod<
  CheckMigrationPermissionProjectsLocationsGlobalDomainsRequest,
  CheckMigrationPermissionProjectsLocationsGlobalDomainsResponse,
  CheckMigrationPermissionProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CheckMigrationPermissionProjectsLocationsGlobalDomainsRequest,
  output: CheckMigrationPermissionProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface DomainJoinMachineProjectsLocationsGlobalDomainsRequest {
  /** Required. The domain resource name using the form: projects/{project_id}/locations/global/domains/{domain_name} */
  domain: string;
  /** Request body */
  body?: DomainJoinMachineRequest;
}

export const DomainJoinMachineProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    domain: Schema.String.pipe(T.HttpPath("domain")),
    body: Schema.optional(DomainJoinMachineRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:domainJoinMachine",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DomainJoinMachineProjectsLocationsGlobalDomainsRequest>;

export type DomainJoinMachineProjectsLocationsGlobalDomainsResponse =
  DomainJoinMachineResponse;
export const DomainJoinMachineProjectsLocationsGlobalDomainsResponse =
  DomainJoinMachineResponse;

export type DomainJoinMachineProjectsLocationsGlobalDomainsError =
  DefaultErrors;

/** DomainJoinMachine API joins a Compute Engine VM to the domain */
export const domainJoinMachineProjectsLocationsGlobalDomains: API.OperationMethod<
  DomainJoinMachineProjectsLocationsGlobalDomainsRequest,
  DomainJoinMachineProjectsLocationsGlobalDomainsResponse,
  DomainJoinMachineProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DomainJoinMachineProjectsLocationsGlobalDomainsRequest,
  output: DomainJoinMachineProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsGlobalDomainsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalDomainsRequest>;

export type SetIamPolicyProjectsLocationsGlobalDomainsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalDomainsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsGlobalDomains: API.OperationMethod<
  SetIamPolicyProjectsLocationsGlobalDomainsRequest,
  SetIamPolicyProjectsLocationsGlobalDomainsResponse,
  SetIamPolicyProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalDomainsRequest,
  output: SetIamPolicyProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsGlobalDomainsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalDomainsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalDomainsRequest>;

export type GetIamPolicyProjectsLocationsGlobalDomainsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalDomainsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalDomainsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsGlobalDomains: API.OperationMethod<
  GetIamPolicyProjectsLocationsGlobalDomainsRequest,
  GetIamPolicyProjectsLocationsGlobalDomainsResponse,
  GetIamPolicyProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalDomainsRequest,
  output: GetIamPolicyProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsGlobalDomainsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalDomainsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalDomainsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalDomainsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalDomainsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalDomainsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsGlobalDomains: API.OperationMethod<
  TestIamPermissionsProjectsLocationsGlobalDomainsRequest,
  TestIamPermissionsProjectsLocationsGlobalDomainsResponse,
  TestIamPermissionsProjectsLocationsGlobalDomainsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalDomainsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalDomainsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalDomainsSqlIntegrationsRequest {
  /** Required. The resource name of the SqlIntegrations using the form: `projects/{project_id}/locations/global/domains/*` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response'ANIZATIONs next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. Filter specifying constraints of a list operation. For example, `SqlIntegration.name="sql"`. */
  filter?: string;
  /** Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalDomainsSqlIntegrationsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/sqlIntegrations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsGlobalDomainsSqlIntegrationsRequest>;

export type ListProjectsLocationsGlobalDomainsSqlIntegrationsResponse =
  ListSQLIntegrationsResponse;
export const ListProjectsLocationsGlobalDomainsSqlIntegrationsResponse =
  ListSQLIntegrationsResponse;

export type ListProjectsLocationsGlobalDomainsSqlIntegrationsError =
  DefaultErrors;

/** Lists SQLIntegrations in a given domain. */
export const listProjectsLocationsGlobalDomainsSqlIntegrations: API.PaginatedOperationMethod<
  ListProjectsLocationsGlobalDomainsSqlIntegrationsRequest,
  ListProjectsLocationsGlobalDomainsSqlIntegrationsResponse,
  ListProjectsLocationsGlobalDomainsSqlIntegrationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalDomainsSqlIntegrationsRequest,
  output: ListProjectsLocationsGlobalDomainsSqlIntegrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalDomainsSqlIntegrationsRequest {
  /** Required. MangedOU resource name using the form: `projects/{project_id}/locations/global/domains/* /sqlIntegrations/{name}` */
  name: string;
}

export const GetProjectsLocationsGlobalDomainsSqlIntegrationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/sqlIntegrations/{sqlIntegrationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsGlobalDomainsSqlIntegrationsRequest>;

export type GetProjectsLocationsGlobalDomainsSqlIntegrationsResponse =
  SQLIntegration;
export const GetProjectsLocationsGlobalDomainsSqlIntegrationsResponse =
  SQLIntegration;

export type GetProjectsLocationsGlobalDomainsSqlIntegrationsError =
  DefaultErrors;

/** Gets details of a single sqlIntegration. */
export const getProjectsLocationsGlobalDomainsSqlIntegrations: API.OperationMethod<
  GetProjectsLocationsGlobalDomainsSqlIntegrationsRequest,
  GetProjectsLocationsGlobalDomainsSqlIntegrationsResponse,
  GetProjectsLocationsGlobalDomainsSqlIntegrationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsGlobalDomainsSqlIntegrationsRequest,
  output: GetProjectsLocationsGlobalDomainsSqlIntegrationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGlobalDomainsBackupsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  parent: string;
  /** Required. Backup Id, unique name to identify the backups with the following restrictions: * Must be lowercase letters, numbers, and hyphens * Must start with a letter. * Must contain between 1-63 characters. * Must end with a number or a letter. * Must be unique within the domain. */
  backupId?: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsLocationsGlobalDomainsBackupsRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
    body: Schema.optional(Backup).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalDomainsBackupsRequest>;

export type CreateProjectsLocationsGlobalDomainsBackupsResponse = Operation;
export const CreateProjectsLocationsGlobalDomainsBackupsResponse = Operation;

export type CreateProjectsLocationsGlobalDomainsBackupsError = DefaultErrors;

/** Creates a Backup for a domain. */
export const createProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  CreateProjectsLocationsGlobalDomainsBackupsRequest,
  CreateProjectsLocationsGlobalDomainsBackupsResponse,
  CreateProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsGlobalDomainsBackupsRequest,
  output: CreateProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalDomainsBackupsRequest {
  /** Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. Filter specifying constraints of a list operation. */
  filter?: string;
  /** Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalDomainsBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalDomainsBackupsRequest>;

export type ListProjectsLocationsGlobalDomainsBackupsResponse =
  ListBackupsResponse;
export const ListProjectsLocationsGlobalDomainsBackupsResponse =
  ListBackupsResponse;

export type ListProjectsLocationsGlobalDomainsBackupsError = DefaultErrors;

/** Lists Backup in a given project. */
export const listProjectsLocationsGlobalDomainsBackups: API.PaginatedOperationMethod<
  ListProjectsLocationsGlobalDomainsBackupsRequest,
  ListProjectsLocationsGlobalDomainsBackupsResponse,
  ListProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalDomainsBackupsRequest,
  output: ListProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalDomainsBackupsRequest {
  /** Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}` */
  name: string;
}

export const GetProjectsLocationsGlobalDomainsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalDomainsBackupsRequest>;

export type GetProjectsLocationsGlobalDomainsBackupsResponse = Backup;
export const GetProjectsLocationsGlobalDomainsBackupsResponse = Backup;

export type GetProjectsLocationsGlobalDomainsBackupsError = DefaultErrors;

/** Gets details of a single Backup. */
export const getProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  GetProjectsLocationsGlobalDomainsBackupsRequest,
  GetProjectsLocationsGlobalDomainsBackupsResponse,
  GetProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsGlobalDomainsBackupsRequest,
  output: GetProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGlobalDomainsBackupsRequest {
  /** Output only. The unique name of the Backup in the form of projects/{project_id}/locations/global/domains/{domain_name}/backups/{name} */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Backup: * `labels` */
  updateMask?: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsLocationsGlobalDomainsBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalDomainsBackupsRequest>;

export type PatchProjectsLocationsGlobalDomainsBackupsResponse = Operation;
export const PatchProjectsLocationsGlobalDomainsBackupsResponse = Operation;

export type PatchProjectsLocationsGlobalDomainsBackupsError = DefaultErrors;

/** Updates the labels for specified Backup. */
export const patchProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  PatchProjectsLocationsGlobalDomainsBackupsRequest,
  PatchProjectsLocationsGlobalDomainsBackupsResponse,
  PatchProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsGlobalDomainsBackupsRequest,
  output: PatchProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGlobalDomainsBackupsRequest {
  /** Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}` */
  name: string;
}

export const DeleteProjectsLocationsGlobalDomainsBackupsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalDomainsBackupsRequest>;

export type DeleteProjectsLocationsGlobalDomainsBackupsResponse = Operation;
export const DeleteProjectsLocationsGlobalDomainsBackupsResponse = Operation;

export type DeleteProjectsLocationsGlobalDomainsBackupsError = DefaultErrors;

/** Deletes identified Backup. */
export const deleteProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  DeleteProjectsLocationsGlobalDomainsBackupsRequest,
  DeleteProjectsLocationsGlobalDomainsBackupsResponse,
  DeleteProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalDomainsBackupsRequest,
  output: DeleteProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest>;

export type SetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalDomainsBackupsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  SetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest,
  SetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse,
  SetIamPolicyProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest,
  output: SetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest>;

export type GetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalDomainsBackupsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  GetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest,
  GetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse,
  GetIamPolicyProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalDomainsBackupsRequest,
  output: GetIamPolicyProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsGlobalDomainsBackupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalDomainsBackupsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/domains/{domainsId}/backups/{backupsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalDomainsBackupsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalDomainsBackupsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalDomainsBackupsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalDomainsBackupsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsGlobalDomainsBackups: API.OperationMethod<
  TestIamPermissionsProjectsLocationsGlobalDomainsBackupsRequest,
  TestIamPermissionsProjectsLocationsGlobalDomainsBackupsResponse,
  TestIamPermissionsProjectsLocationsGlobalDomainsBackupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalDomainsBackupsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalDomainsBackupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGlobalPeeringsRequest {
  /** Required. Resource project name and location using the form: `projects/{project_id}/locations/global` */
  parent: string;
  /** Required. Peering Id, unique name to identify peering. */
  peeringId?: string;
  /** Request body */
  body?: Peering;
}

export const CreateProjectsLocationsGlobalPeeringsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  peeringId: Schema.optional(Schema.String).pipe(T.HttpQuery("peeringId")),
  body: Schema.optional(Peering).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalPeeringsRequest>;

export type CreateProjectsLocationsGlobalPeeringsResponse = Operation;
export const CreateProjectsLocationsGlobalPeeringsResponse = Operation;

export type CreateProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Creates a Peering for Managed AD instance. */
export const createProjectsLocationsGlobalPeerings: API.OperationMethod<
  CreateProjectsLocationsGlobalPeeringsRequest,
  CreateProjectsLocationsGlobalPeeringsResponse,
  CreateProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsGlobalPeeringsRequest,
  output: CreateProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalPeeringsRequest {
  /** Required. The resource name of the domain location using the form: `projects/{project_id}/locations/global` */
  parent: string;
  /** Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. Filter specifying constraints of a list operation. For example, `peering.authoized_network ="/projects/myprojectid"`. */
  filter?: string;
  /** Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalPeeringsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalPeeringsRequest>;

export type ListProjectsLocationsGlobalPeeringsResponse = ListPeeringsResponse;
export const ListProjectsLocationsGlobalPeeringsResponse = ListPeeringsResponse;

export type ListProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Lists Peerings in a given project. */
export const listProjectsLocationsGlobalPeerings: API.PaginatedOperationMethod<
  ListProjectsLocationsGlobalPeeringsRequest,
  ListProjectsLocationsGlobalPeeringsResponse,
  ListProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalPeeringsRequest,
  output: ListProjectsLocationsGlobalPeeringsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalPeeringsRequest {
  /** Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}` */
  name: string;
}

export const GetProjectsLocationsGlobalPeeringsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalPeeringsRequest>;

export type GetProjectsLocationsGlobalPeeringsResponse = Peering;
export const GetProjectsLocationsGlobalPeeringsResponse = Peering;

export type GetProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Gets details of a single Peering. */
export const getProjectsLocationsGlobalPeerings: API.OperationMethod<
  GetProjectsLocationsGlobalPeeringsRequest,
  GetProjectsLocationsGlobalPeeringsResponse,
  GetProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsGlobalPeeringsRequest,
  output: GetProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGlobalPeeringsRequest {
  /** Output only. Unique name of the peering in this scope including projects and location using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`. */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Peering: * `labels` */
  updateMask?: string;
  /** Request body */
  body?: Peering;
}

export const PatchProjectsLocationsGlobalPeeringsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Peering).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalPeeringsRequest>;

export type PatchProjectsLocationsGlobalPeeringsResponse = Operation;
export const PatchProjectsLocationsGlobalPeeringsResponse = Operation;

export type PatchProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Updates the labels for specified Peering. */
export const patchProjectsLocationsGlobalPeerings: API.OperationMethod<
  PatchProjectsLocationsGlobalPeeringsRequest,
  PatchProjectsLocationsGlobalPeeringsResponse,
  PatchProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsGlobalPeeringsRequest,
  output: PatchProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGlobalPeeringsRequest {
  /** Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}` */
  name: string;
}

export const DeleteProjectsLocationsGlobalPeeringsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalPeeringsRequest>;

export type DeleteProjectsLocationsGlobalPeeringsResponse = Operation;
export const DeleteProjectsLocationsGlobalPeeringsResponse = Operation;

export type DeleteProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Deletes identified Peering. */
export const deleteProjectsLocationsGlobalPeerings: API.OperationMethod<
  DeleteProjectsLocationsGlobalPeeringsRequest,
  DeleteProjectsLocationsGlobalPeeringsResponse,
  DeleteProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalPeeringsRequest,
  output: DeleteProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsGlobalPeeringsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalPeeringsRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalPeeringsRequest>;

export type SetIamPolicyProjectsLocationsGlobalPeeringsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalPeeringsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsGlobalPeerings: API.OperationMethod<
  SetIamPolicyProjectsLocationsGlobalPeeringsRequest,
  SetIamPolicyProjectsLocationsGlobalPeeringsResponse,
  SetIamPolicyProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalPeeringsRequest,
  output: SetIamPolicyProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsGlobalPeeringsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalPeeringsRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalPeeringsRequest>;

export type GetIamPolicyProjectsLocationsGlobalPeeringsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalPeeringsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalPeeringsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsGlobalPeerings: API.OperationMethod<
  GetIamPolicyProjectsLocationsGlobalPeeringsRequest,
  GetIamPolicyProjectsLocationsGlobalPeeringsResponse,
  GetIamPolicyProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalPeeringsRequest,
  output: GetIamPolicyProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsGlobalPeeringsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalPeeringsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/global/peerings/{peeringsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalPeeringsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalPeeringsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalPeeringsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalPeeringsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsGlobalPeerings: API.OperationMethod<
  TestIamPermissionsProjectsLocationsGlobalPeeringsRequest,
  TestIamPermissionsProjectsLocationsGlobalPeeringsResponse,
  TestIamPermissionsProjectsLocationsGlobalPeeringsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalPeeringsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalPeeringsResponse,
  errors: [],
}));
