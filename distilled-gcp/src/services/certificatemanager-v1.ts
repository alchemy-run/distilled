// ==========================================================================
// Certificate Manager API (certificatemanager v1)
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
  name: "certificatemanager",
  version: "v1",
  rootUrl: "https://certificatemanager.googleapis.com/",
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

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface SelfManagedCertificate {
  /** Optional. Input only. The PEM-encoded certificate chain. Leaf certificate comes first, followed by intermediate ones if any. */
  pemCertificate?: string;
  /** Optional. Input only. The PEM-encoded private key of the leaf certificate. */
  pemPrivateKey?: string;
}

export const SelfManagedCertificate: Schema.Schema<SelfManagedCertificate> = Schema.suspend(() => Schema.Struct({
  pemCertificate: Schema.optional(Schema.String),
  pemPrivateKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SelfManagedCertificate" }) as any as Schema.Schema<SelfManagedCertificate>;

export interface ProvisioningIssue {
  /** Output only. Reason for provisioning failures. */
  reason?: "REASON_UNSPECIFIED" | "AUTHORIZATION_ISSUE" | "RATE_LIMITED" | (string & {});
  /** Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum. */
  details?: string;
}

export const ProvisioningIssue: Schema.Schema<ProvisioningIssue> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "ProvisioningIssue" }) as any as Schema.Schema<ProvisioningIssue>;

export interface CNAME {
  /** Output only. The name of the CNAME record for the domain, equals to `dns_resource_record.name` in the corresponding `DnsAuthorization`. */
  name?: string;
  /** Output only. The expected value of the CNAME record for the domain, equals to `dns_resource_record.data` in the corresponding `DnsAuthorization`. */
  expectedData?: string;
  /** Output only. The resolved CNAME chain. Empty list if the CNAME record for `CNAME.name` is not found. Otherwise the first item is the value of the CNAME record for `CNAME.name`. If the CNAME chain is longer, the second item is the value of the CNAME record for the first item, and so on. */
  resolvedData?: Array<string>;
}

export const CNAME: Schema.Schema<CNAME> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  expectedData: Schema.optional(Schema.String),
  resolvedData: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CNAME" }) as any as Schema.Schema<CNAME>;

export interface IPs {
  /** Output only. The list of IP addresses, where the certificate is attached and port 443 is open. */
  serving?: Array<string>;
  /** Output only. The list of IP addresses, where the certificate is attached, but port 443 is not open. */
  servingOnAltPorts?: Array<string>;
  /** Output only. The list of IP addresses resolved from the domain's A/AAAA records. Can contain both ipv4 and ipv6 addresses. */
  resolved?: Array<string>;
}

export const IPs: Schema.Schema<IPs> = Schema.suspend(() => Schema.Struct({
  serving: Schema.optional(Schema.Array(Schema.String)),
  servingOnAltPorts: Schema.optional(Schema.Array(Schema.String)),
  resolved: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IPs" }) as any as Schema.Schema<IPs>;

export interface Troubleshooting {
  /** Output only. The list of issues discovered during the authorization attempt. */
  issues?: Array<"ISSUE_UNSPECIFIED" | "CNAME_MISMATCH" | "RESOLVED_TO_NOT_SERVING" | "RESOLVED_TO_SERVING_ON_ALT_PORTS" | "NO_RESOLVED_IPS" | "CERTIFICATE_NOT_ATTACHED" | (string & {})>;
  /** Output only. CNAME troubleshooting information. */
  cname?: CNAME;
  /** Output only. IPs troubleshooting information. */
  ips?: IPs;
}

export const Troubleshooting: Schema.Schema<Troubleshooting> = Schema.suspend(() => Schema.Struct({
  issues: Schema.optional(Schema.Array(Schema.String)),
  cname: Schema.optional(CNAME),
  ips: Schema.optional(IPs),
})).annotate({ identifier: "Troubleshooting" }) as any as Schema.Schema<Troubleshooting>;

export interface AuthorizationAttemptInfo {
  /** Output only. Domain name of the authorization attempt. */
  domain?: string;
  /** Output only. State of the domain for managed certificate issuance. */
  state?: "STATE_UNSPECIFIED" | "AUTHORIZING" | "AUTHORIZED" | "FAILED" | (string & {});
  /** Output only. Reason for failure of the authorization attempt for the domain. */
  failureReason?: "FAILURE_REASON_UNSPECIFIED" | "CONFIG" | "CAA" | "RATE_LIMITED" | (string & {});
  /** Output only. Human readable explanation for reaching the state. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use FailureReason enum. */
  details?: string;
  /** Output only. The timestamp, when the authorization attempt was made. */
  attemptTime?: string;
  /** Output only. Troubleshooting information for the authorization attempt. This field is only populated if the authorization attempt failed. */
  troubleshooting?: Troubleshooting;
}

export const AuthorizationAttemptInfo: Schema.Schema<AuthorizationAttemptInfo> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  attemptTime: Schema.optional(Schema.String),
  troubleshooting: Schema.optional(Troubleshooting),
})).annotate({ identifier: "AuthorizationAttemptInfo" }) as any as Schema.Schema<AuthorizationAttemptInfo>;

export interface ManagedCertificate {
  /** Optional. Immutable. The domains for which a managed SSL certificate will be generated. Wildcard domains are only supported with DNS challenge resolution. */
  domains?: Array<string>;
  /** Optional. Immutable. Authorizations that will be used for performing domain authorization. */
  dnsAuthorizations?: Array<string>;
  /** Optional. Immutable. The resource name for a CertificateIssuanceConfig used to configure private PKI certificates in the format `projects/* /locations/* /certificateIssuanceConfigs/*`. If this field is not set, the certificates will instead be publicly signed as documented at https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#caa. */
  issuanceConfig?: string;
  /** Output only. State of the managed certificate resource. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONING" | "FAILED" | "ACTIVE" | (string & {});
  /** Output only. Information about issues with provisioning a Managed Certificate. */
  provisioningIssue?: ProvisioningIssue;
  /** Output only. Detailed state of the latest authorization attempt for each domain specified for managed certificate resource. */
  authorizationAttemptInfo?: Array<AuthorizationAttemptInfo>;
}

export const ManagedCertificate: Schema.Schema<ManagedCertificate> = Schema.suspend(() => Schema.Struct({
  domains: Schema.optional(Schema.Array(Schema.String)),
  dnsAuthorizations: Schema.optional(Schema.Array(Schema.String)),
  issuanceConfig: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  provisioningIssue: Schema.optional(ProvisioningIssue),
  authorizationAttemptInfo: Schema.optional(Schema.Array(AuthorizationAttemptInfo)),
})).annotate({ identifier: "ManagedCertificate" }) as any as Schema.Schema<ManagedCertificate>;

export interface ManagedIdentityCertificate {
  /** Required. Immutable. SPIFFE ID of the Managed Identity used for this certificate. */
  identity?: string;
  /** Output only. State of the managed certificate resource. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONING" | "FAILED" | "ACTIVE" | (string & {});
  /** Output only. Information about issues with provisioning a managed certificate. */
  provisioningIssue?: ProvisioningIssue;
}

export const ManagedIdentityCertificate: Schema.Schema<ManagedIdentityCertificate> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  provisioningIssue: Schema.optional(ProvisioningIssue),
})).annotate({ identifier: "ManagedIdentityCertificate" }) as any as Schema.Schema<ManagedIdentityCertificate>;

export interface UsedBy {
  /** Output only. Full name of the resource https://google.aip.dev/122#full-resource-names, e.g. `//certificatemanager.googleapis.com/projects/* /locations/* /certificateMaps/* /certificateMapEntries/*` or `//compute.googleapis.com/projects/* /locations/* /targetHttpsProxies/*`. */
  name?: string;
}

export const UsedBy: Schema.Schema<UsedBy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UsedBy" }) as any as Schema.Schema<UsedBy>;

export interface Certificate {
  /** Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/* /locations/* /certificates/*`. */
  name?: string;
  /** Optional. One or more paragraphs of text description of a certificate. */
  description?: string;
  /** Output only. The creation timestamp of a Certificate. */
  createTime?: string;
  /** Output only. The last update timestamp of a Certificate. */
  updateTime?: string;
  /** Optional. Set of labels associated with a Certificate. */
  labels?: Record<string, string>;
  /** If set, defines data of a self-managed certificate. */
  selfManaged?: SelfManagedCertificate;
  /** If set, contains configuration and state of a managed certificate. */
  managed?: ManagedCertificate;
  /** If set, contains configuration and state of a managed identity certificate. */
  managedIdentity?: ManagedIdentityCertificate;
  /** Output only. The list of Subject Alternative Names of dnsName type defined in the certificate (see RFC 5280 4.2.1.6). Managed certificates that haven't been provisioned yet have this field populated with a value of the managed.domains field. */
  sanDnsnames?: Array<string>;
  /** Output only. The PEM-encoded certificate chain. */
  pemCertificate?: string;
  /** Output only. The expiry timestamp of a Certificate. */
  expireTime?: string;
  /** Optional. Immutable. The scope of the certificate. */
  scope?: "DEFAULT" | "EDGE_CACHE" | "ALL_REGIONS" | "CLIENT_AUTH" | (string & {});
  /** Output only. The list of resources that use this Certificate. */
  usedBy?: Array<UsedBy>;
}

export const Certificate: Schema.Schema<Certificate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  selfManaged: Schema.optional(SelfManagedCertificate),
  managed: Schema.optional(ManagedCertificate),
  managedIdentity: Schema.optional(ManagedIdentityCertificate),
  sanDnsnames: Schema.optional(Schema.Array(Schema.String)),
  pemCertificate: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  usedBy: Schema.optional(Schema.Array(UsedBy)),
})).annotate({ identifier: "Certificate" }) as any as Schema.Schema<Certificate>;

export interface ListCertificatesResponse {
  /** A list of certificates for the parent resource. */
  certificates?: Array<Certificate>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** A list of locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificatesResponse: Schema.Schema<ListCertificatesResponse> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(Certificate)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificatesResponse" }) as any as Schema.Schema<ListCertificatesResponse>;

export interface IpConfig {
  /** Output only. An external IP address. */
  ipAddress?: string;
  /** Output only. Ports. */
  ports?: Array<number>;
}

export const IpConfig: Schema.Schema<IpConfig> = Schema.suspend(() => Schema.Struct({
  ipAddress: Schema.optional(Schema.String),
  ports: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "IpConfig" }) as any as Schema.Schema<IpConfig>;

export interface GclbTarget {
  /** Output only. This field returns the resource name in the following format: `//compute.googleapis.com/projects/* /global/targetHttpsProxies/*`. */
  targetHttpsProxy?: string;
  /** Output only. This field returns the resource name in the following format: `//compute.googleapis.com/projects/* /global/targetSslProxies/*`. */
  targetSslProxy?: string;
  /** Output only. IP configurations for this Target Proxy where the Certificate Map is serving. */
  ipConfigs?: Array<IpConfig>;
}

export const GclbTarget: Schema.Schema<GclbTarget> = Schema.suspend(() => Schema.Struct({
  targetHttpsProxy: Schema.optional(Schema.String),
  targetSslProxy: Schema.optional(Schema.String),
  ipConfigs: Schema.optional(Schema.Array(IpConfig)),
})).annotate({ identifier: "GclbTarget" }) as any as Schema.Schema<GclbTarget>;

export interface CertificateMap {
  /** Identifier. A user-defined name of the Certificate Map. Certificate Map names must be unique globally and match pattern `projects/* /locations/* /certificateMaps/*`. */
  name?: string;
  /** Optional. One or more paragraphs of text description of a certificate map. */
  description?: string;
  /** Output only. The creation timestamp of a Certificate Map. */
  createTime?: string;
  /** Output only. The update timestamp of a Certificate Map. */
  updateTime?: string;
  /** Optional. Set of labels associated with a Certificate Map. */
  labels?: Record<string, string>;
  /** Output only. A list of GCLB targets that use this Certificate Map. A Target Proxy is only present on this list if it's attached to a Forwarding Rule. */
  gclbTargets?: Array<GclbTarget>;
}

export const CertificateMap: Schema.Schema<CertificateMap> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  gclbTargets: Schema.optional(Schema.Array(GclbTarget)),
})).annotate({ identifier: "CertificateMap" }) as any as Schema.Schema<CertificateMap>;

export interface ListCertificateMapsResponse {
  /** A list of certificate maps for the parent resource. */
  certificateMaps?: Array<CertificateMap>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateMapsResponse: Schema.Schema<ListCertificateMapsResponse> = Schema.suspend(() => Schema.Struct({
  certificateMaps: Schema.optional(Schema.Array(CertificateMap)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateMapsResponse" }) as any as Schema.Schema<ListCertificateMapsResponse>;

export interface CertificateMapEntry {
  /** Identifier. A user-defined name of the Certificate Map Entry. Certificate Map Entry names must be unique globally and match pattern `projects/* /locations/* /certificateMaps/* /certificateMapEntries/*`. */
  name?: string;
  /** Optional. One or more paragraphs of text description of a certificate map entry. */
  description?: string;
  /** Output only. The creation timestamp of a Certificate Map Entry. */
  createTime?: string;
  /** Output only. The update timestamp of a Certificate Map Entry. */
  updateTime?: string;
  /** Optional. Set of labels associated with a Certificate Map Entry. */
  labels?: Record<string, string>;
  /** A Hostname (FQDN, e.g. `example.com`) or a wildcard hostname expression (`*.example.com`) for a set of hostnames with common suffix. Used as Server Name Indication (SNI) for selecting a proper certificate. */
  hostname?: string;
  /** A predefined matcher for particular cases, other than SNI selection. */
  matcher?: "MATCHER_UNSPECIFIED" | "PRIMARY" | (string & {});
  /** Optional. A set of Certificates defines for the given `hostname`. There can be defined up to four certificates in each Certificate Map Entry. Each certificate must match pattern `projects/* /locations/* /certificates/*`. */
  certificates?: Array<string>;
  /** Output only. A serving state of this Certificate Map Entry. */
  state?: "SERVING_STATE_UNSPECIFIED" | "ACTIVE" | "PENDING" | (string & {});
}

export const CertificateMapEntry: Schema.Schema<CertificateMapEntry> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  hostname: Schema.optional(Schema.String),
  matcher: Schema.optional(Schema.String),
  certificates: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateMapEntry" }) as any as Schema.Schema<CertificateMapEntry>;

export interface ListCertificateMapEntriesResponse {
  /** A list of certificate map entries for the parent resource. */
  certificateMapEntries?: Array<CertificateMapEntry>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateMapEntriesResponse: Schema.Schema<ListCertificateMapEntriesResponse> = Schema.suspend(() => Schema.Struct({
  certificateMapEntries: Schema.optional(Schema.Array(CertificateMapEntry)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateMapEntriesResponse" }) as any as Schema.Schema<ListCertificateMapEntriesResponse>;

export interface DnsResourceRecord {
  /** Output only. Fully qualified name of the DNS Resource Record. e.g. `_acme-challenge.example.com` */
  name?: string;
  /** Output only. Type of the DNS Resource Record. Currently always set to "CNAME". */
  type?: string;
  /** Output only. Data of the DNS Resource Record. */
  data?: string;
}

export const DnsResourceRecord: Schema.Schema<DnsResourceRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsResourceRecord" }) as any as Schema.Schema<DnsResourceRecord>;

export interface DnsAuthorization {
  /** Identifier. A user-defined name of the dns authorization. DnsAuthorization names must be unique globally and match pattern `projects/* /locations/* /dnsAuthorizations/*`. */
  name?: string;
  /** Output only. The creation timestamp of a DnsAuthorization. */
  createTime?: string;
  /** Output only. The last update timestamp of a DnsAuthorization. */
  updateTime?: string;
  /** Optional. Set of labels associated with a DnsAuthorization. */
  labels?: Record<string, string>;
  /** Optional. One or more paragraphs of text description of a DnsAuthorization. */
  description?: string;
  /** Required. Immutable. A domain that is being authorized. A DnsAuthorization resource covers a single domain and its wildcard, e.g. authorization for `example.com` can be used to issue certificates for `example.com` and `*.example.com`. */
  domain?: string;
  /** Output only. DNS Resource Record that needs to be added to DNS configuration. */
  dnsResourceRecord?: DnsResourceRecord;
  /** Optional. Immutable. Type of DnsAuthorization. If unset during resource creation the following default will be used: - in location `global`: FIXED_RECORD, - in other locations: PER_PROJECT_RECORD. */
  type?: "TYPE_UNSPECIFIED" | "FIXED_RECORD" | "PER_PROJECT_RECORD" | (string & {});
}

export const DnsAuthorization: Schema.Schema<DnsAuthorization> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  dnsResourceRecord: Schema.optional(DnsResourceRecord),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsAuthorization" }) as any as Schema.Schema<DnsAuthorization>;

export interface ListDnsAuthorizationsResponse {
  /** A list of dns authorizations for the parent resource. */
  dnsAuthorizations?: Array<DnsAuthorization>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDnsAuthorizationsResponse: Schema.Schema<ListDnsAuthorizationsResponse> = Schema.suspend(() => Schema.Struct({
  dnsAuthorizations: Schema.optional(Schema.Array(DnsAuthorization)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDnsAuthorizationsResponse" }) as any as Schema.Schema<ListDnsAuthorizationsResponse>;

export interface CertificateAuthorityServiceConfig {
  /** Required. A CA pool resource used to issue a certificate. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}". */
  caPool?: string;
}

export const CertificateAuthorityServiceConfig: Schema.Schema<CertificateAuthorityServiceConfig> = Schema.suspend(() => Schema.Struct({
  caPool: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateAuthorityServiceConfig" }) as any as Schema.Schema<CertificateAuthorityServiceConfig>;

export interface CertificateAuthorityConfig {
  /** Defines a CertificateAuthorityServiceConfig. */
  certificateAuthorityServiceConfig?: CertificateAuthorityServiceConfig;
}

export const CertificateAuthorityConfig: Schema.Schema<CertificateAuthorityConfig> = Schema.suspend(() => Schema.Struct({
  certificateAuthorityServiceConfig: Schema.optional(CertificateAuthorityServiceConfig),
})).annotate({ identifier: "CertificateAuthorityConfig" }) as any as Schema.Schema<CertificateAuthorityConfig>;

export interface CertificateIssuanceConfig {
  /** Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/* /locations/* /certificateIssuanceConfigs/*`. */
  name?: string;
  /** Output only. The creation timestamp of a CertificateIssuanceConfig. */
  createTime?: string;
  /** Output only. The last update timestamp of a CertificateIssuanceConfig. */
  updateTime?: string;
  /** Optional. Set of labels associated with a CertificateIssuanceConfig. */
  labels?: Record<string, string>;
  /** Optional. One or more paragraphs of text description of a CertificateIssuanceConfig. */
  description?: string;
  /** Required. The CA that issues the workload certificate. It includes the CA address, type, authentication to CA service, etc. */
  certificateAuthorityConfig?: CertificateAuthorityConfig;
  /** Required. Workload certificate lifetime requested. */
  lifetime?: string;
  /** Required. Specifies the percentage of elapsed time of the certificate lifetime to wait before renewing the certificate. Must be a number between 1-99, inclusive. */
  rotationWindowPercentage?: number;
  /** Required. The key algorithm to use when generating the private key. */
  keyAlgorithm?: "KEY_ALGORITHM_UNSPECIFIED" | "RSA_2048" | "ECDSA_P256" | (string & {});
}

export const CertificateIssuanceConfig: Schema.Schema<CertificateIssuanceConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  certificateAuthorityConfig: Schema.optional(CertificateAuthorityConfig),
  lifetime: Schema.optional(Schema.String),
  rotationWindowPercentage: Schema.optional(Schema.Number),
  keyAlgorithm: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateIssuanceConfig" }) as any as Schema.Schema<CertificateIssuanceConfig>;

export interface ListCertificateIssuanceConfigsResponse {
  /** A list of certificate configs for the parent resource. */
  certificateIssuanceConfigs?: Array<CertificateIssuanceConfig>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateIssuanceConfigsResponse: Schema.Schema<ListCertificateIssuanceConfigsResponse> = Schema.suspend(() => Schema.Struct({
  certificateIssuanceConfigs: Schema.optional(Schema.Array(CertificateIssuanceConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateIssuanceConfigsResponse" }) as any as Schema.Schema<ListCertificateIssuanceConfigsResponse>;

export interface TrustAnchor {
  /** PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB. */
  pemCertificate?: string;
}

export const TrustAnchor: Schema.Schema<TrustAnchor> = Schema.suspend(() => Schema.Struct({
  pemCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "TrustAnchor" }) as any as Schema.Schema<TrustAnchor>;

export interface IntermediateCA {
  /** PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB. */
  pemCertificate?: string;
}

export const IntermediateCA: Schema.Schema<IntermediateCA> = Schema.suspend(() => Schema.Struct({
  pemCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "IntermediateCA" }) as any as Schema.Schema<IntermediateCA>;

export interface TrustStore {
  /** Optional. List of Trust Anchors to be used while performing validation against a given TrustStore. */
  trustAnchors?: Array<TrustAnchor>;
  /** Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature. */
  intermediateCas?: Array<IntermediateCA>;
}

export const TrustStore: Schema.Schema<TrustStore> = Schema.suspend(() => Schema.Struct({
  trustAnchors: Schema.optional(Schema.Array(TrustAnchor)),
  intermediateCas: Schema.optional(Schema.Array(IntermediateCA)),
})).annotate({ identifier: "TrustStore" }) as any as Schema.Schema<TrustStore>;

export interface AllowlistedCertificate {
  /** Required. PEM certificate that is allowlisted. The certificate can be up to 5k bytes, and must be a parseable X.509 certificate. */
  pemCertificate?: string;
}

export const AllowlistedCertificate: Schema.Schema<AllowlistedCertificate> = Schema.suspend(() => Schema.Struct({
  pemCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "AllowlistedCertificate" }) as any as Schema.Schema<AllowlistedCertificate>;

export interface TrustConfig {
  /** Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/* /locations/* /trustConfigs/*`. */
  name?: string;
  /** Output only. The creation timestamp of a TrustConfig. */
  createTime?: string;
  /** Output only. The last update timestamp of a TrustConfig. */
  updateTime?: string;
  /** Optional. Set of labels associated with a TrustConfig. */
  labels?: Record<string, string>;
  /** Optional. One or more paragraphs of text description of a TrustConfig. */
  description?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Defines a mapping from a trust domain to a TrustStore. This is used for SPIFFE certificate validation. */
  spiffeTrustStores?: Record<string, TrustStore>;
  /** Optional. Set of trust stores to perform validation against. This field is supported when TrustConfig is configured with Load Balancers, currently not supported for SPIFFE certificate validation. Only one TrustStore specified is currently allowed. */
  trustStores?: Array<TrustStore>;
  /** Optional. A certificate matching an allowlisted certificate is always considered valid as long as the certificate is parseable, proof of private key possession is established, and constraints on the certificate's SAN field are met. */
  allowlistedCertificates?: Array<AllowlistedCertificate>;
}

export const TrustConfig: Schema.Schema<TrustConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  spiffeTrustStores: Schema.optional(Schema.Record(Schema.String, TrustStore)),
  trustStores: Schema.optional(Schema.Array(TrustStore)),
  allowlistedCertificates: Schema.optional(Schema.Array(AllowlistedCertificate)),
})).annotate({ identifier: "TrustConfig" }) as any as Schema.Schema<TrustConfig>;

export interface ListTrustConfigsResponse {
  /** A list of TrustConfigs for the parent resource. */
  trustConfigs?: Array<TrustConfig>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListTrustConfigsResponse: Schema.Schema<ListTrustConfigsResponse> = Schema.suspend(() => Schema.Struct({
  trustConfigs: Schema.optional(Schema.Array(TrustConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListTrustConfigsResponse" }) as any as Schema.Schema<ListTrustConfigsResponse>;

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

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
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

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists Certificates in a given project and location. */
export interface ListProjectsLocationsCertificatesRequest {
  /** Required. The project and location from which the certificate should be listed, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of certificates to return per call. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListCertificatesResponse`. Indicates that this is a continuation of a prior `ListCertificates` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the Certificates returned. */
  filter?: string;
  /** Optional. A list of Certificate field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificatesRequest>;

export type ListProjectsLocationsCertificatesResponse = ListCertificatesResponse;
export const ListProjectsLocationsCertificatesResponse = ListCertificatesResponse;

export type ListProjectsLocationsCertificatesError = CommonErrors;

export const listProjectsLocationsCertificates = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificatesRequest,
  output: ListProjectsLocationsCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Certificate. */
export interface GetProjectsLocationsCertificatesRequest {
  /** Required. A name of the certificate to describe. Must be in the format `projects/* /locations/* /certificates/*`. */
  name: string;
}

export const GetProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificatesRequest>;

export type GetProjectsLocationsCertificatesResponse = Certificate;
export const GetProjectsLocationsCertificatesResponse = Certificate;

export type GetProjectsLocationsCertificatesError = CommonErrors;

export const getProjectsLocationsCertificates: API.OperationMethod<GetProjectsLocationsCertificatesRequest, GetProjectsLocationsCertificatesResponse, GetProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificatesRequest,
  output: GetProjectsLocationsCertificatesResponse,
  errors: [],
}));

/** Creates a new Certificate in a given project and location. */
export interface CreateProjectsLocationsCertificatesRequest {
  /** Required. The parent resource of the certificate. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. A user-provided name of the certificate. */
  certificateId?: string;
  /** Request body */
  body?: Certificate;
}

export const CreateProjectsLocationsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateId")),
  body: Schema.optional(Certificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificatesRequest>;

export type CreateProjectsLocationsCertificatesResponse = Operation;
export const CreateProjectsLocationsCertificatesResponse = Operation;

export type CreateProjectsLocationsCertificatesError = CommonErrors;

export const createProjectsLocationsCertificates: API.OperationMethod<CreateProjectsLocationsCertificatesRequest, CreateProjectsLocationsCertificatesResponse, CreateProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificatesRequest,
  output: CreateProjectsLocationsCertificatesResponse,
  errors: [],
}));

/** Updates a Certificate. */
export interface PatchProjectsLocationsCertificatesRequest {
  /** Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/* /locations/* /certificates/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: Certificate;
}

export const PatchProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Certificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificatesRequest>;

export type PatchProjectsLocationsCertificatesResponse = Operation;
export const PatchProjectsLocationsCertificatesResponse = Operation;

export type PatchProjectsLocationsCertificatesError = CommonErrors;

export const patchProjectsLocationsCertificates: API.OperationMethod<PatchProjectsLocationsCertificatesRequest, PatchProjectsLocationsCertificatesResponse, PatchProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificatesRequest,
  output: PatchProjectsLocationsCertificatesResponse,
  errors: [],
}));

/** Deletes a single Certificate. */
export interface DeleteProjectsLocationsCertificatesRequest {
  /** Required. A name of the certificate to delete. Must be in the format `projects/* /locations/* /certificates/*`. */
  name: string;
}

export const DeleteProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificatesRequest>;

export type DeleteProjectsLocationsCertificatesResponse = Operation;
export const DeleteProjectsLocationsCertificatesResponse = Operation;

export type DeleteProjectsLocationsCertificatesError = CommonErrors;

export const deleteProjectsLocationsCertificates: API.OperationMethod<DeleteProjectsLocationsCertificatesRequest, DeleteProjectsLocationsCertificatesResponse, DeleteProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificatesRequest,
  output: DeleteProjectsLocationsCertificatesResponse,
  errors: [],
}));

/** Lists CertificateMaps in a given project and location. */
export interface ListProjectsLocationsCertificateMapsRequest {
  /** Required. The project and location from which the certificate maps should be listed, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of certificate maps to return per call. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListCertificateMapsResponse`. Indicates that this is a continuation of a prior `ListCertificateMaps` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the Certificates Maps returned. */
  filter?: string;
  /** Optional. A list of Certificate Map field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsCertificateMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificateMapsRequest>;

export type ListProjectsLocationsCertificateMapsResponse = ListCertificateMapsResponse;
export const ListProjectsLocationsCertificateMapsResponse = ListCertificateMapsResponse;

export type ListProjectsLocationsCertificateMapsError = CommonErrors;

export const listProjectsLocationsCertificateMaps = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificateMapsRequest,
  output: ListProjectsLocationsCertificateMapsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single CertificateMap. */
export interface GetProjectsLocationsCertificateMapsRequest {
  /** Required. A name of the certificate map to describe. Must be in the format `projects/* /locations/* /certificateMaps/*`. */
  name: string;
}

export const GetProjectsLocationsCertificateMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificateMapsRequest>;

export type GetProjectsLocationsCertificateMapsResponse = CertificateMap;
export const GetProjectsLocationsCertificateMapsResponse = CertificateMap;

export type GetProjectsLocationsCertificateMapsError = CommonErrors;

export const getProjectsLocationsCertificateMaps: API.OperationMethod<GetProjectsLocationsCertificateMapsRequest, GetProjectsLocationsCertificateMapsResponse, GetProjectsLocationsCertificateMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificateMapsRequest,
  output: GetProjectsLocationsCertificateMapsResponse,
  errors: [],
}));

/** Creates a new CertificateMap in a given project and location. */
export interface CreateProjectsLocationsCertificateMapsRequest {
  /** Required. The parent resource of the certificate map. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. A user-provided name of the certificate map. */
  certificateMapId?: string;
  /** Request body */
  body?: CertificateMap;
}

export const CreateProjectsLocationsCertificateMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateMapId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateMapId")),
  body: Schema.optional(CertificateMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificateMapsRequest>;

export type CreateProjectsLocationsCertificateMapsResponse = Operation;
export const CreateProjectsLocationsCertificateMapsResponse = Operation;

export type CreateProjectsLocationsCertificateMapsError = CommonErrors;

export const createProjectsLocationsCertificateMaps: API.OperationMethod<CreateProjectsLocationsCertificateMapsRequest, CreateProjectsLocationsCertificateMapsResponse, CreateProjectsLocationsCertificateMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificateMapsRequest,
  output: CreateProjectsLocationsCertificateMapsResponse,
  errors: [],
}));

/** Updates a CertificateMap. */
export interface PatchProjectsLocationsCertificateMapsRequest {
  /** Identifier. A user-defined name of the Certificate Map. Certificate Map names must be unique globally and match pattern `projects/* /locations/* /certificateMaps/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: CertificateMap;
}

export const PatchProjectsLocationsCertificateMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CertificateMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificateMapsRequest>;

export type PatchProjectsLocationsCertificateMapsResponse = Operation;
export const PatchProjectsLocationsCertificateMapsResponse = Operation;

export type PatchProjectsLocationsCertificateMapsError = CommonErrors;

export const patchProjectsLocationsCertificateMaps: API.OperationMethod<PatchProjectsLocationsCertificateMapsRequest, PatchProjectsLocationsCertificateMapsResponse, PatchProjectsLocationsCertificateMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificateMapsRequest,
  output: PatchProjectsLocationsCertificateMapsResponse,
  errors: [],
}));

/** Deletes a single CertificateMap. A Certificate Map can't be deleted if it contains Certificate Map Entries. Remove all the entries from the map before calling this method. */
export interface DeleteProjectsLocationsCertificateMapsRequest {
  /** Required. A name of the certificate map to delete. Must be in the format `projects/* /locations/* /certificateMaps/*`. */
  name: string;
}

export const DeleteProjectsLocationsCertificateMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificateMapsRequest>;

export type DeleteProjectsLocationsCertificateMapsResponse = Operation;
export const DeleteProjectsLocationsCertificateMapsResponse = Operation;

export type DeleteProjectsLocationsCertificateMapsError = CommonErrors;

export const deleteProjectsLocationsCertificateMaps: API.OperationMethod<DeleteProjectsLocationsCertificateMapsRequest, DeleteProjectsLocationsCertificateMapsResponse, DeleteProjectsLocationsCertificateMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificateMapsRequest,
  output: DeleteProjectsLocationsCertificateMapsResponse,
  errors: [],
}));

/** Lists CertificateMapEntries in a given project and location. */
export interface ListProjectsLocationsCertificateMapsCertificateMapEntriesRequest {
  /** Required. The project, location and certificate map from which the certificate map entries should be listed, specified in the format `projects/* /locations/* /certificateMaps/*`. */
  parent: string;
  /** Optional. Maximum number of certificate map entries to return. The service may return fewer than this value. If unspecified, at most 50 certificate map entries will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListCertificateMapEntriesResponse`. Indicates that this is a continuation of a prior `ListCertificateMapEntries` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the returned Certificate Map Entries. */
  filter?: string;
  /** Optional. A list of Certificate Map Entry field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsCertificateMapsCertificateMapEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}/certificateMapEntries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificateMapsCertificateMapEntriesRequest>;

export type ListProjectsLocationsCertificateMapsCertificateMapEntriesResponse = ListCertificateMapEntriesResponse;
export const ListProjectsLocationsCertificateMapsCertificateMapEntriesResponse = ListCertificateMapEntriesResponse;

export type ListProjectsLocationsCertificateMapsCertificateMapEntriesError = CommonErrors;

export const listProjectsLocationsCertificateMapsCertificateMapEntries = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificateMapsCertificateMapEntriesRequest,
  output: ListProjectsLocationsCertificateMapsCertificateMapEntriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single CertificateMapEntry. */
export interface GetProjectsLocationsCertificateMapsCertificateMapEntriesRequest {
  /** Required. A name of the certificate map entry to describe. Must be in the format `projects/* /locations/* /certificateMaps/* /certificateMapEntries/*`. */
  name: string;
}

export const GetProjectsLocationsCertificateMapsCertificateMapEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}/certificateMapEntries/{certificateMapEntriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificateMapsCertificateMapEntriesRequest>;

export type GetProjectsLocationsCertificateMapsCertificateMapEntriesResponse = CertificateMapEntry;
export const GetProjectsLocationsCertificateMapsCertificateMapEntriesResponse = CertificateMapEntry;

export type GetProjectsLocationsCertificateMapsCertificateMapEntriesError = CommonErrors;

export const getProjectsLocationsCertificateMapsCertificateMapEntries: API.OperationMethod<GetProjectsLocationsCertificateMapsCertificateMapEntriesRequest, GetProjectsLocationsCertificateMapsCertificateMapEntriesResponse, GetProjectsLocationsCertificateMapsCertificateMapEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificateMapsCertificateMapEntriesRequest,
  output: GetProjectsLocationsCertificateMapsCertificateMapEntriesResponse,
  errors: [],
}));

/** Creates a new CertificateMapEntry in a given project and location. */
export interface CreateProjectsLocationsCertificateMapsCertificateMapEntriesRequest {
  /** Required. The parent resource of the certificate map entry. Must be in the format `projects/* /locations/* /certificateMaps/*`. */
  parent: string;
  /** Required. A user-provided name of the certificate map entry. */
  certificateMapEntryId?: string;
  /** Request body */
  body?: CertificateMapEntry;
}

export const CreateProjectsLocationsCertificateMapsCertificateMapEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateMapEntryId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateMapEntryId")),
  body: Schema.optional(CertificateMapEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}/certificateMapEntries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificateMapsCertificateMapEntriesRequest>;

export type CreateProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;
export const CreateProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;

export type CreateProjectsLocationsCertificateMapsCertificateMapEntriesError = CommonErrors;

export const createProjectsLocationsCertificateMapsCertificateMapEntries: API.OperationMethod<CreateProjectsLocationsCertificateMapsCertificateMapEntriesRequest, CreateProjectsLocationsCertificateMapsCertificateMapEntriesResponse, CreateProjectsLocationsCertificateMapsCertificateMapEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificateMapsCertificateMapEntriesRequest,
  output: CreateProjectsLocationsCertificateMapsCertificateMapEntriesResponse,
  errors: [],
}));

/** Updates a CertificateMapEntry. */
export interface PatchProjectsLocationsCertificateMapsCertificateMapEntriesRequest {
  /** Identifier. A user-defined name of the Certificate Map Entry. Certificate Map Entry names must be unique globally and match pattern `projects/* /locations/* /certificateMaps/* /certificateMapEntries/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: CertificateMapEntry;
}

export const PatchProjectsLocationsCertificateMapsCertificateMapEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CertificateMapEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}/certificateMapEntries/{certificateMapEntriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificateMapsCertificateMapEntriesRequest>;

export type PatchProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;
export const PatchProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;

export type PatchProjectsLocationsCertificateMapsCertificateMapEntriesError = CommonErrors;

export const patchProjectsLocationsCertificateMapsCertificateMapEntries: API.OperationMethod<PatchProjectsLocationsCertificateMapsCertificateMapEntriesRequest, PatchProjectsLocationsCertificateMapsCertificateMapEntriesResponse, PatchProjectsLocationsCertificateMapsCertificateMapEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificateMapsCertificateMapEntriesRequest,
  output: PatchProjectsLocationsCertificateMapsCertificateMapEntriesResponse,
  errors: [],
}));

/** Deletes a single CertificateMapEntry. */
export interface DeleteProjectsLocationsCertificateMapsCertificateMapEntriesRequest {
  /** Required. A name of the certificate map entry to delete. Must be in the format `projects/* /locations/* /certificateMaps/* /certificateMapEntries/*`. */
  name: string;
}

export const DeleteProjectsLocationsCertificateMapsCertificateMapEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateMaps/{certificateMapsId}/certificateMapEntries/{certificateMapEntriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificateMapsCertificateMapEntriesRequest>;

export type DeleteProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;
export const DeleteProjectsLocationsCertificateMapsCertificateMapEntriesResponse = Operation;

export type DeleteProjectsLocationsCertificateMapsCertificateMapEntriesError = CommonErrors;

export const deleteProjectsLocationsCertificateMapsCertificateMapEntries: API.OperationMethod<DeleteProjectsLocationsCertificateMapsCertificateMapEntriesRequest, DeleteProjectsLocationsCertificateMapsCertificateMapEntriesResponse, DeleteProjectsLocationsCertificateMapsCertificateMapEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificateMapsCertificateMapEntriesRequest,
  output: DeleteProjectsLocationsCertificateMapsCertificateMapEntriesResponse,
  errors: [],
}));

/** Lists DnsAuthorizations in a given project and location. */
export interface ListProjectsLocationsDnsAuthorizationsRequest {
  /** Required. The project and location from which the dns authorizations should be listed, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of dns authorizations to return per call. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListDnsAuthorizationsResponse`. Indicates that this is a continuation of a prior `ListDnsAuthorizations` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the Dns Authorizations returned. */
  filter?: string;
  /** Optional. A list of Dns Authorization field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsDnsAuthorizationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsAuthorizations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDnsAuthorizationsRequest>;

export type ListProjectsLocationsDnsAuthorizationsResponse = ListDnsAuthorizationsResponse;
export const ListProjectsLocationsDnsAuthorizationsResponse = ListDnsAuthorizationsResponse;

export type ListProjectsLocationsDnsAuthorizationsError = CommonErrors;

export const listProjectsLocationsDnsAuthorizations = API.makePaginated(() => ({
  input: ListProjectsLocationsDnsAuthorizationsRequest,
  output: ListProjectsLocationsDnsAuthorizationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single DnsAuthorization. */
export interface GetProjectsLocationsDnsAuthorizationsRequest {
  /** Required. A name of the dns authorization to describe. Must be in the format `projects/* /locations/* /dnsAuthorizations/*`. */
  name: string;
}

export const GetProjectsLocationsDnsAuthorizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsAuthorizations/{dnsAuthorizationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDnsAuthorizationsRequest>;

export type GetProjectsLocationsDnsAuthorizationsResponse = DnsAuthorization;
export const GetProjectsLocationsDnsAuthorizationsResponse = DnsAuthorization;

export type GetProjectsLocationsDnsAuthorizationsError = CommonErrors;

export const getProjectsLocationsDnsAuthorizations: API.OperationMethod<GetProjectsLocationsDnsAuthorizationsRequest, GetProjectsLocationsDnsAuthorizationsResponse, GetProjectsLocationsDnsAuthorizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDnsAuthorizationsRequest,
  output: GetProjectsLocationsDnsAuthorizationsResponse,
  errors: [],
}));

/** Creates a new DnsAuthorization in a given project and location. */
export interface CreateProjectsLocationsDnsAuthorizationsRequest {
  /** Required. The parent resource of the dns authorization. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. A user-provided name of the dns authorization. */
  dnsAuthorizationId?: string;
  /** Request body */
  body?: DnsAuthorization;
}

export const CreateProjectsLocationsDnsAuthorizationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dnsAuthorizationId: Schema.optional(Schema.String).pipe(T.HttpQuery("dnsAuthorizationId")),
  body: Schema.optional(DnsAuthorization).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsAuthorizations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDnsAuthorizationsRequest>;

export type CreateProjectsLocationsDnsAuthorizationsResponse = Operation;
export const CreateProjectsLocationsDnsAuthorizationsResponse = Operation;

export type CreateProjectsLocationsDnsAuthorizationsError = CommonErrors;

export const createProjectsLocationsDnsAuthorizations: API.OperationMethod<CreateProjectsLocationsDnsAuthorizationsRequest, CreateProjectsLocationsDnsAuthorizationsResponse, CreateProjectsLocationsDnsAuthorizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDnsAuthorizationsRequest,
  output: CreateProjectsLocationsDnsAuthorizationsResponse,
  errors: [],
}));

/** Updates a DnsAuthorization. */
export interface PatchProjectsLocationsDnsAuthorizationsRequest {
  /** Identifier. A user-defined name of the dns authorization. DnsAuthorization names must be unique globally and match pattern `projects/* /locations/* /dnsAuthorizations/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: DnsAuthorization;
}

export const PatchProjectsLocationsDnsAuthorizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DnsAuthorization).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsAuthorizations/{dnsAuthorizationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDnsAuthorizationsRequest>;

export type PatchProjectsLocationsDnsAuthorizationsResponse = Operation;
export const PatchProjectsLocationsDnsAuthorizationsResponse = Operation;

export type PatchProjectsLocationsDnsAuthorizationsError = CommonErrors;

export const patchProjectsLocationsDnsAuthorizations: API.OperationMethod<PatchProjectsLocationsDnsAuthorizationsRequest, PatchProjectsLocationsDnsAuthorizationsResponse, PatchProjectsLocationsDnsAuthorizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDnsAuthorizationsRequest,
  output: PatchProjectsLocationsDnsAuthorizationsResponse,
  errors: [],
}));

/** Deletes a single DnsAuthorization. */
export interface DeleteProjectsLocationsDnsAuthorizationsRequest {
  /** Required. A name of the dns authorization to delete. Must be in the format `projects/* /locations/* /dnsAuthorizations/*`. */
  name: string;
}

export const DeleteProjectsLocationsDnsAuthorizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsAuthorizations/{dnsAuthorizationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDnsAuthorizationsRequest>;

export type DeleteProjectsLocationsDnsAuthorizationsResponse = Operation;
export const DeleteProjectsLocationsDnsAuthorizationsResponse = Operation;

export type DeleteProjectsLocationsDnsAuthorizationsError = CommonErrors;

export const deleteProjectsLocationsDnsAuthorizations: API.OperationMethod<DeleteProjectsLocationsDnsAuthorizationsRequest, DeleteProjectsLocationsDnsAuthorizationsResponse, DeleteProjectsLocationsDnsAuthorizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDnsAuthorizationsRequest,
  output: DeleteProjectsLocationsDnsAuthorizationsResponse,
  errors: [],
}));

/** Lists CertificateIssuanceConfigs in a given project and location. */
export interface ListProjectsLocationsCertificateIssuanceConfigsRequest {
  /** Required. The project and location from which the certificate should be listed, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of certificate configs to return per call. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListCertificateIssuanceConfigsResponse`. Indicates that this is a continuation of a prior `ListCertificateIssuanceConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the Certificates Configs returned. */
  filter?: string;
  /** Optional. A list of Certificate Config field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsCertificateIssuanceConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateIssuanceConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificateIssuanceConfigsRequest>;

export type ListProjectsLocationsCertificateIssuanceConfigsResponse = ListCertificateIssuanceConfigsResponse;
export const ListProjectsLocationsCertificateIssuanceConfigsResponse = ListCertificateIssuanceConfigsResponse;

export type ListProjectsLocationsCertificateIssuanceConfigsError = CommonErrors;

export const listProjectsLocationsCertificateIssuanceConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificateIssuanceConfigsRequest,
  output: ListProjectsLocationsCertificateIssuanceConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single CertificateIssuanceConfig. */
export interface GetProjectsLocationsCertificateIssuanceConfigsRequest {
  /** Required. A name of the certificate issuance config to describe. Must be in the format `projects/* /locations/* /certificateIssuanceConfigs/*`. */
  name: string;
}

export const GetProjectsLocationsCertificateIssuanceConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateIssuanceConfigs/{certificateIssuanceConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificateIssuanceConfigsRequest>;

export type GetProjectsLocationsCertificateIssuanceConfigsResponse = CertificateIssuanceConfig;
export const GetProjectsLocationsCertificateIssuanceConfigsResponse = CertificateIssuanceConfig;

export type GetProjectsLocationsCertificateIssuanceConfigsError = CommonErrors;

export const getProjectsLocationsCertificateIssuanceConfigs: API.OperationMethod<GetProjectsLocationsCertificateIssuanceConfigsRequest, GetProjectsLocationsCertificateIssuanceConfigsResponse, GetProjectsLocationsCertificateIssuanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificateIssuanceConfigsRequest,
  output: GetProjectsLocationsCertificateIssuanceConfigsResponse,
  errors: [],
}));

/** Creates a new CertificateIssuanceConfig in a given project and location. */
export interface CreateProjectsLocationsCertificateIssuanceConfigsRequest {
  /** Required. The parent resource of the certificate issuance config. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. A user-provided name of the certificate config. */
  certificateIssuanceConfigId?: string;
  /** Request body */
  body?: CertificateIssuanceConfig;
}

export const CreateProjectsLocationsCertificateIssuanceConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateIssuanceConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateIssuanceConfigId")),
  body: Schema.optional(CertificateIssuanceConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateIssuanceConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificateIssuanceConfigsRequest>;

export type CreateProjectsLocationsCertificateIssuanceConfigsResponse = Operation;
export const CreateProjectsLocationsCertificateIssuanceConfigsResponse = Operation;

export type CreateProjectsLocationsCertificateIssuanceConfigsError = CommonErrors;

export const createProjectsLocationsCertificateIssuanceConfigs: API.OperationMethod<CreateProjectsLocationsCertificateIssuanceConfigsRequest, CreateProjectsLocationsCertificateIssuanceConfigsResponse, CreateProjectsLocationsCertificateIssuanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificateIssuanceConfigsRequest,
  output: CreateProjectsLocationsCertificateIssuanceConfigsResponse,
  errors: [],
}));

/** Updates a CertificateIssuanceConfig. */
export interface PatchProjectsLocationsCertificateIssuanceConfigsRequest {
  /** Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/* /locations/* /certificateIssuanceConfigs/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: CertificateIssuanceConfig;
}

export const PatchProjectsLocationsCertificateIssuanceConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CertificateIssuanceConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateIssuanceConfigs/{certificateIssuanceConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificateIssuanceConfigsRequest>;

export type PatchProjectsLocationsCertificateIssuanceConfigsResponse = Operation;
export const PatchProjectsLocationsCertificateIssuanceConfigsResponse = Operation;

export type PatchProjectsLocationsCertificateIssuanceConfigsError = CommonErrors;

export const patchProjectsLocationsCertificateIssuanceConfigs: API.OperationMethod<PatchProjectsLocationsCertificateIssuanceConfigsRequest, PatchProjectsLocationsCertificateIssuanceConfigsResponse, PatchProjectsLocationsCertificateIssuanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificateIssuanceConfigsRequest,
  output: PatchProjectsLocationsCertificateIssuanceConfigsResponse,
  errors: [],
}));

/** Deletes a single CertificateIssuanceConfig. */
export interface DeleteProjectsLocationsCertificateIssuanceConfigsRequest {
  /** Required. A name of the certificate issuance config to delete. Must be in the format `projects/* /locations/* /certificateIssuanceConfigs/*`. */
  name: string;
}

export const DeleteProjectsLocationsCertificateIssuanceConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateIssuanceConfigs/{certificateIssuanceConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificateIssuanceConfigsRequest>;

export type DeleteProjectsLocationsCertificateIssuanceConfigsResponse = Operation;
export const DeleteProjectsLocationsCertificateIssuanceConfigsResponse = Operation;

export type DeleteProjectsLocationsCertificateIssuanceConfigsError = CommonErrors;

export const deleteProjectsLocationsCertificateIssuanceConfigs: API.OperationMethod<DeleteProjectsLocationsCertificateIssuanceConfigsRequest, DeleteProjectsLocationsCertificateIssuanceConfigsResponse, DeleteProjectsLocationsCertificateIssuanceConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificateIssuanceConfigsRequest,
  output: DeleteProjectsLocationsCertificateIssuanceConfigsResponse,
  errors: [],
}));

/** Lists TrustConfigs in a given project and location. */
export interface ListProjectsLocationsTrustConfigsRequest {
  /** Required. The project and location from which the TrustConfigs should be listed, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of TrustConfigs to return per call. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListTrustConfigsResponse`. Indicates that this is a continuation of a prior `ListTrustConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the TrustConfigs returned. */
  filter?: string;
  /** Optional. A list of TrustConfig field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`. */
  orderBy?: string;
}

export const ListProjectsLocationsTrustConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/trustConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTrustConfigsRequest>;

export type ListProjectsLocationsTrustConfigsResponse = ListTrustConfigsResponse;
export const ListProjectsLocationsTrustConfigsResponse = ListTrustConfigsResponse;

export type ListProjectsLocationsTrustConfigsError = CommonErrors;

export const listProjectsLocationsTrustConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsTrustConfigsRequest,
  output: ListProjectsLocationsTrustConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single TrustConfig. */
export interface GetProjectsLocationsTrustConfigsRequest {
  /** Required. A name of the TrustConfig to describe. Must be in the format `projects/* /locations/* /trustConfigs/*`. */
  name: string;
}

export const GetProjectsLocationsTrustConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/trustConfigs/{trustConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTrustConfigsRequest>;

export type GetProjectsLocationsTrustConfigsResponse = TrustConfig;
export const GetProjectsLocationsTrustConfigsResponse = TrustConfig;

export type GetProjectsLocationsTrustConfigsError = CommonErrors;

export const getProjectsLocationsTrustConfigs: API.OperationMethod<GetProjectsLocationsTrustConfigsRequest, GetProjectsLocationsTrustConfigsResponse, GetProjectsLocationsTrustConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTrustConfigsRequest,
  output: GetProjectsLocationsTrustConfigsResponse,
  errors: [],
}));

/** Creates a new TrustConfig in a given project and location. */
export interface CreateProjectsLocationsTrustConfigsRequest {
  /** Required. The parent resource of the TrustConfig. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. A user-provided name of the TrustConfig. Must match the regexp `[a-z0-9-]{1,63}`. */
  trustConfigId?: string;
  /** Request body */
  body?: TrustConfig;
}

export const CreateProjectsLocationsTrustConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  trustConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("trustConfigId")),
  body: Schema.optional(TrustConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/trustConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTrustConfigsRequest>;

export type CreateProjectsLocationsTrustConfigsResponse = Operation;
export const CreateProjectsLocationsTrustConfigsResponse = Operation;

export type CreateProjectsLocationsTrustConfigsError = CommonErrors;

export const createProjectsLocationsTrustConfigs: API.OperationMethod<CreateProjectsLocationsTrustConfigsRequest, CreateProjectsLocationsTrustConfigsResponse, CreateProjectsLocationsTrustConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTrustConfigsRequest,
  output: CreateProjectsLocationsTrustConfigsResponse,
  errors: [],
}));

/** Updates a TrustConfig. */
export interface PatchProjectsLocationsTrustConfigsRequest {
  /** Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/* /locations/* /trustConfigs/*`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  updateMask?: string;
  /** Request body */
  body?: TrustConfig;
}

export const PatchProjectsLocationsTrustConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(TrustConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/trustConfigs/{trustConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTrustConfigsRequest>;

export type PatchProjectsLocationsTrustConfigsResponse = Operation;
export const PatchProjectsLocationsTrustConfigsResponse = Operation;

export type PatchProjectsLocationsTrustConfigsError = CommonErrors;

export const patchProjectsLocationsTrustConfigs: API.OperationMethod<PatchProjectsLocationsTrustConfigsRequest, PatchProjectsLocationsTrustConfigsResponse, PatchProjectsLocationsTrustConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTrustConfigsRequest,
  output: PatchProjectsLocationsTrustConfigsResponse,
  errors: [],
}));

/** Deletes a single TrustConfig. */
export interface DeleteProjectsLocationsTrustConfigsRequest {
  /** Required. A name of the TrustConfig to delete. Must be in the format `projects/* /locations/* /trustConfigs/*`. */
  name: string;
  /** Optional. The current etag of the TrustConfig. If an etag is provided and does not match the current etag of the resource, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsTrustConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/trustConfigs/{trustConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTrustConfigsRequest>;

export type DeleteProjectsLocationsTrustConfigsResponse = Operation;
export const DeleteProjectsLocationsTrustConfigsResponse = Operation;

export type DeleteProjectsLocationsTrustConfigsError = CommonErrors;

export const deleteProjectsLocationsTrustConfigs: API.OperationMethod<DeleteProjectsLocationsTrustConfigsRequest, DeleteProjectsLocationsTrustConfigsResponse, DeleteProjectsLocationsTrustConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTrustConfigsRequest,
  output: DeleteProjectsLocationsTrustConfigsResponse,
  errors: [],
}));

