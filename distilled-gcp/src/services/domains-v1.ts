// ==========================================================================
// Cloud Domains API (domains v1)
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
  name: "domains",
  version: "v1",
  rootUrl: "https://domains.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LoadBalancerTarget {
  /** The protocol of the load balancer to health check. */
  ipProtocol?: "UNDEFINED" | "TCP" | "UDP" | (string & {});
  /** The project ID in which the load balancer is located. */
  project?: string;
  /** The region in which the load balancer is located. */
  region?: string;
  /** The configured port of the load balancer. */
  port?: string;
  /** The frontend IP address of the load balancer to health check. */
  ipAddress?: string;
  /** The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`. */
  networkUrl?: string;
  /** The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer. */
  loadBalancerType?: "NONE" | "GLOBAL_L7ILB" | "REGIONAL_L4ILB" | "REGIONAL_L7ILB" | (string & {});
}

export const LoadBalancerTarget: Schema.Schema<LoadBalancerTarget> = Schema.suspend(() => Schema.Struct({
  ipProtocol: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  port: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  networkUrl: Schema.optional(Schema.String),
  loadBalancerType: Schema.optional(Schema.String),
})).annotate({ identifier: "LoadBalancerTarget" }) as any as Schema.Schema<LoadBalancerTarget>;

export interface HealthCheckTargets {
  /** Configuration for internal load balancers to be health checked. */
  internalLoadBalancer?: Array<LoadBalancerTarget>;
  /** The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) */
  externalEndpoints?: Array<string>;
}

export const HealthCheckTargets: Schema.Schema<HealthCheckTargets> = Schema.suspend(() => Schema.Struct({
  internalLoadBalancer: Schema.optional(Schema.Array(LoadBalancerTarget)),
  externalEndpoints: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HealthCheckTargets" }) as any as Schema.Schema<HealthCheckTargets>;

export interface GeoPolicyItem {
  rrdata?: Array<string>;
  /** The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc. */
  location?: string;
  /** DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. */
  signatureRrdata?: Array<string>;
  /** For A and AAAA types only. Endpoints to return in the query result only if they are healthy. These can be specified along with `rrdata` within this item. */
  healthCheckedTargets?: HealthCheckTargets;
}

export const GeoPolicyItem: Schema.Schema<GeoPolicyItem> = Schema.suspend(() => Schema.Struct({
  rrdata: Schema.optional(Schema.Array(Schema.String)),
  location: Schema.optional(Schema.String),
  signatureRrdata: Schema.optional(Schema.Array(Schema.String)),
  healthCheckedTargets: Schema.optional(HealthCheckTargets),
})).annotate({ identifier: "GeoPolicyItem" }) as any as Schema.Schema<GeoPolicyItem>;

export interface GeoPolicy {
  /** The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead. */
  item?: Array<GeoPolicyItem>;
  /** Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy. */
  enableFencing?: boolean;
}

export const GeoPolicy: Schema.Schema<GeoPolicy> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(Schema.Array(GeoPolicyItem)),
  enableFencing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GeoPolicy" }) as any as Schema.Schema<GeoPolicy>;

export interface PostalAddress {
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() => Schema.Struct({
  addressLines: Schema.optional(Schema.Array(Schema.String)),
  administrativeArea: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.Number),
  locality: Schema.optional(Schema.String),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
})).annotate({ identifier: "PostalAddress" }) as any as Schema.Schema<PostalAddress>;

export interface EmailForwarding {
  /** Target email that receives emails sent to the `alias`. */
  targetEmailAddress?: string;
  /** An alias recipient email that forwards emails to the `target_email_address`. For example, `admin@example.com` or `*@example.com` (wildcard alias forwards all the emails under the registered domain). */
  alias?: string;
}

export const EmailForwarding: Schema.Schema<EmailForwarding> = Schema.suspend(() => Schema.Struct({
  targetEmailAddress: Schema.optional(Schema.String),
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "EmailForwarding" }) as any as Schema.Schema<EmailForwarding>;

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

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface RenewDomainRequest {
  /** Required. Acknowledgement of the price to renew the domain for one year. To get the price, see [Cloud Domains pricing](https://cloud.google.com/domains/pricing). If not provided, the expected price is returned in the error message. */
  yearlyPrice?: Money;
  /** Optional. When true, only validation is performed, without actually renewing the domain. For more information, see [Request validation](https://cloud.google.com/apis/design/design_patterns#request_validation) */
  validateOnly?: boolean;
}

export const RenewDomainRequest: Schema.Schema<RenewDomainRequest> = Schema.suspend(() => Schema.Struct({
  yearlyPrice: Schema.optional(Money),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RenewDomainRequest" }) as any as Schema.Schema<RenewDomainRequest>;

export interface GlueRecord {
  /** Required. Domain name of the host in Punycode format. */
  hostName?: string;
  /** List of IPv6 addresses corresponding to this host in the standard hexadecimal format (e.g. `2001:db8::`). At least one of `ipv4_address` and `ipv6_address` must be set. */
  ipv6Addresses?: Array<string>;
  /** List of IPv4 addresses corresponding to this host in the standard decimal format (e.g. `198.51.100.1`). At least one of `ipv4_address` and `ipv6_address` must be set. */
  ipv4Addresses?: Array<string>;
}

export const GlueRecord: Schema.Schema<GlueRecord> = Schema.suspend(() => Schema.Struct({
  hostName: Schema.optional(Schema.String),
  ipv6Addresses: Schema.optional(Schema.Array(Schema.String)),
  ipv4Addresses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GlueRecord" }) as any as Schema.Schema<GlueRecord>;

export interface DomainForwarding {
  /** The PEM-encoded certificate chain. */
  pemCertificate?: string;
  /** If true, the forwarding works also over HTTPS. */
  sslEnabled?: boolean;
  /** If true, forwards the path after the domain name to the same path at the new address. */
  pathForwarding?: boolean;
  /** The subdomain of the registered domain that is being forwarded. E.g. `www.example.com`, `example.com` (i.e. the registered domain itself) or `*.example.com` (i.e. all subdomains). */
  subdomain?: string;
  /** The redirect type. */
  redirectType?: "REDIRECT_TYPE_UNSPECIFIED" | "TEMPORARY" | "PERMANENT" | (string & {});
  /** The target of the domain forwarding, i.e. the path to redirect the `subdomain` to. */
  targetUri?: string;
}

export const DomainForwarding: Schema.Schema<DomainForwarding> = Schema.suspend(() => Schema.Struct({
  pemCertificate: Schema.optional(Schema.String),
  sslEnabled: Schema.optional(Schema.Boolean),
  pathForwarding: Schema.optional(Schema.Boolean),
  subdomain: Schema.optional(Schema.String),
  redirectType: Schema.optional(Schema.String),
  targetUri: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainForwarding" }) as any as Schema.Schema<DomainForwarding>;

export interface Domain {
  /** The state of this domain as a `Registration` resource. */
  resourceState?: "RESOURCE_STATE_UNSPECIFIED" | "IMPORTABLE" | "UNSUPPORTED" | "SUSPENDED" | "EXPIRED" | "DELETED" | (string & {});
  /** Price to renew the domain for one year. Only set when `resource_state` is `IMPORTABLE`. */
  yearlyPrice?: Money;
  /** The domain name. Unicode domain names are expressed in Punycode format. */
  domainName?: string;
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() => Schema.Struct({
  resourceState: Schema.optional(Schema.String),
  yearlyPrice: Schema.optional(Money),
  domainName: Schema.optional(Schema.String),
})).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface WrrPolicyItem {
  /** DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. */
  signatureRrdata?: Array<string>;
  /** The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative. */
  weight?: number;
  /** Endpoints that are health checked before making the routing decision. The unhealthy endpoints are omitted from the result. If all endpoints within a bucket are unhealthy, we choose a different bucket (sampled with respect to its weight) for responding. If DNSSEC is enabled for this zone, only one of `rrdata` or `health_checked_targets` can be set. */
  healthCheckedTargets?: HealthCheckTargets;
  rrdata?: Array<string>;
}

export const WrrPolicyItem: Schema.Schema<WrrPolicyItem> = Schema.suspend(() => Schema.Struct({
  signatureRrdata: Schema.optional(Schema.Array(Schema.String)),
  weight: Schema.optional(Schema.Number),
  healthCheckedTargets: Schema.optional(HealthCheckTargets),
  rrdata: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "WrrPolicyItem" }) as any as Schema.Schema<WrrPolicyItem>;

export interface WrrPolicy {
  item?: Array<WrrPolicyItem>;
}

export const WrrPolicy: Schema.Schema<WrrPolicy> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(Schema.Array(WrrPolicyItem)),
})).annotate({ identifier: "WrrPolicy" }) as any as Schema.Schema<WrrPolicy>;

export interface RetrieveImportableDomainsResponse {
  /** When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. */
  nextPageToken?: string;
  /** A list of domains that the calling user manages in Google Domains. */
  domains?: Array<Domain>;
}

export const RetrieveImportableDomainsResponse: Schema.Schema<RetrieveImportableDomainsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  domains: Schema.optional(Schema.Array(Domain)),
})).annotate({ identifier: "RetrieveImportableDomainsResponse" }) as any as Schema.Schema<RetrieveImportableDomainsResponse>;

export interface PrimaryBackupPolicy {
  /** When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets. */
  trickleTraffic?: number;
  /** Endpoints that are health checked before making the routing decision. Unhealthy endpoints are omitted from the results. If all endpoints are unhealthy, we serve a response based on the `backup_geo_targets`. */
  primaryTargets?: HealthCheckTargets;
  /** Backup targets provide a regional failover policy for the otherwise global primary targets. If serving state is set to `BACKUP`, this policy essentially becomes a geo routing policy. */
  backupGeoTargets?: GeoPolicy;
}

export const PrimaryBackupPolicy: Schema.Schema<PrimaryBackupPolicy> = Schema.suspend(() => Schema.Struct({
  trickleTraffic: Schema.optional(Schema.Number),
  primaryTargets: Schema.optional(HealthCheckTargets),
  backupGeoTargets: Schema.optional(GeoPolicy),
})).annotate({ identifier: "PrimaryBackupPolicy" }) as any as Schema.Schema<PrimaryBackupPolicy>;

export interface RRSetRoutingPolicy {
  /** The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks */
  healthCheck?: string;
  geo?: GeoPolicy;
  primaryBackup?: PrimaryBackupPolicy;
  wrrPolicy?: WrrPolicy;
  geoPolicy?: GeoPolicy;
  wrr?: WrrPolicy;
}

export const RRSetRoutingPolicy: Schema.Schema<RRSetRoutingPolicy> = Schema.suspend(() => Schema.Struct({
  healthCheck: Schema.optional(Schema.String),
  geo: Schema.optional(GeoPolicy),
  primaryBackup: Schema.optional(PrimaryBackupPolicy),
  wrrPolicy: Schema.optional(WrrPolicy),
  geoPolicy: Schema.optional(GeoPolicy),
  wrr: Schema.optional(WrrPolicy),
})).annotate({ identifier: "RRSetRoutingPolicy" }) as any as Schema.Schema<RRSetRoutingPolicy>;

export interface RetrieveGoogleDomainsForwardingConfigResponse {
  /** The list of email forwarding configurations. A forwarding configuration might not work correctly if the required DNS records are not present in the domain's authoritative DNS zone. */
  emailForwardings?: Array<EmailForwarding>;
  /** The list of domain forwarding configurations. A forwarding configuration might not work correctly if the required DNS records are not present in the domain's authoritative DNS zone. */
  domainForwardings?: Array<DomainForwarding>;
}

export const RetrieveGoogleDomainsForwardingConfigResponse: Schema.Schema<RetrieveGoogleDomainsForwardingConfigResponse> = Schema.suspend(() => Schema.Struct({
  emailForwardings: Schema.optional(Schema.Array(EmailForwarding)),
  domainForwardings: Schema.optional(Schema.Array(DomainForwarding)),
})).annotate({ identifier: "RetrieveGoogleDomainsForwardingConfigResponse" }) as any as Schema.Schema<RetrieveGoogleDomainsForwardingConfigResponse>;

export interface DsRecord {
  /** The hash function used to generate the digest of the referenced DNSKEY. */
  digestType?: "DIGEST_TYPE_UNSPECIFIED" | "SHA1" | "SHA256" | "GOST3411" | "SHA384" | (string & {});
  /** The key tag of the record. Must be set in range 0 -- 65535. */
  keyTag?: number;
  /** The algorithm used to generate the referenced DNSKEY. */
  algorithm?: "ALGORITHM_UNSPECIFIED" | "RSAMD5" | "DH" | "DSA" | "ECC" | "RSASHA1" | "DSANSEC3SHA1" | "RSASHA1NSEC3SHA1" | "RSASHA256" | "RSASHA512" | "ECCGOST" | "ECDSAP256SHA256" | "ECDSAP384SHA384" | "ED25519" | "ED448" | "INDIRECT" | "PRIVATEDNS" | "PRIVATEOID" | (string & {});
  /** The digest generated from the referenced DNSKEY. */
  digest?: string;
}

export const DsRecord: Schema.Schema<DsRecord> = Schema.suspend(() => Schema.Struct({
  digestType: Schema.optional(Schema.String),
  keyTag: Schema.optional(Schema.Number),
  algorithm: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
})).annotate({ identifier: "DsRecord" }) as any as Schema.Schema<DsRecord>;

export interface CustomDns {
  /** The list of DS records for this domain, which are used to enable DNSSEC. The domain's DNS provider can provide the values to set here. If this field is empty, DNSSEC is disabled. */
  dsRecords?: Array<DsRecord>;
  /** Required. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. */
  nameServers?: Array<string>;
}

export const CustomDns: Schema.Schema<CustomDns> = Schema.suspend(() => Schema.Struct({
  dsRecords: Schema.optional(Schema.Array(DsRecord)),
  nameServers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomDns" }) as any as Schema.Schema<CustomDns>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

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
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface RegisterParameters {
  /** Price to register or renew the domain for one year. */
  yearlyPrice?: Money;
  /** Notices about special properties of the domain. */
  domainNotices?: Array<"DOMAIN_NOTICE_UNSPECIFIED" | "HSTS_PRELOADED" | (string & {})>;
  /** The domain name. Unicode domain names are expressed in Punycode format. */
  domainName?: string;
  /** Contact privacy options that the domain supports. */
  supportedPrivacy?: Array<"CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA" | (string & {})>;
  /** Indicates whether the domain is available for registration. This value is accurate when obtained by calling `RetrieveRegisterParameters`, but is approximate when obtained by calling `SearchDomains`. */
  availability?: "AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "UNAVAILABLE" | "UNSUPPORTED" | "UNKNOWN" | (string & {});
}

export const RegisterParameters: Schema.Schema<RegisterParameters> = Schema.suspend(() => Schema.Struct({
  yearlyPrice: Schema.optional(Money),
  domainNotices: Schema.optional(Schema.Array(Schema.String)),
  domainName: Schema.optional(Schema.String),
  supportedPrivacy: Schema.optional(Schema.Array(Schema.String)),
  availability: Schema.optional(Schema.String),
})).annotate({ identifier: "RegisterParameters" }) as any as Schema.Schema<RegisterParameters>;

export interface RetrieveRegisterParametersResponse {
  /** Parameters to use when calling the `RegisterDomain` method. */
  registerParameters?: RegisterParameters;
}

export const RetrieveRegisterParametersResponse: Schema.Schema<RetrieveRegisterParametersResponse> = Schema.suspend(() => Schema.Struct({
  registerParameters: Schema.optional(RegisterParameters),
})).annotate({ identifier: "RetrieveRegisterParametersResponse" }) as any as Schema.Schema<RetrieveRegisterParametersResponse>;

export interface Contact {
  /** Required. Email address of the contact. */
  email?: string;
  /** Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`. */
  phoneNumber?: string;
  /** Required. Postal address of the contact. */
  postalAddress?: PostalAddress;
  /** Fax number of the contact in international format. For example, `"+1-800-555-0123"`. */
  faxNumber?: string;
}

export const Contact: Schema.Schema<Contact> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  postalAddress: Schema.optional(PostalAddress),
  faxNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "Contact" }) as any as Schema.Schema<Contact>;

export interface ContactSettings {
  /** Required. Privacy setting for the contacts associated with the `Registration`. */
  privacy?: "CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA" | (string & {});
  /** Required. The registrant contact for the `Registration`. *Caution: Anyone with access to this email address, phone number, and/or postal address can take control of the domain.* *Warning: For new `Registration`s, the registrant receives an email confirmation that they must complete within 15 days to avoid domain suspension.* */
  registrantContact?: Contact;
  /** Required. The technical contact for the `Registration`. */
  technicalContact?: Contact;
  /** Required. The administrative contact for the `Registration`. */
  adminContact?: Contact;
}

export const ContactSettings: Schema.Schema<ContactSettings> = Schema.suspend(() => Schema.Struct({
  privacy: Schema.optional(Schema.String),
  registrantContact: Schema.optional(Contact),
  technicalContact: Schema.optional(Contact),
  adminContact: Schema.optional(Contact),
})).annotate({ identifier: "ContactSettings" }) as any as Schema.Schema<ContactSettings>;

export interface GoogleDomainsDns {
  /** Output only. The list of DS records published for this domain. The list is automatically populated when `ds_state` is `DS_RECORDS_PUBLISHED`, otherwise it remains empty. */
  dsRecords?: Array<DsRecord>;
  /** Output only. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. This field is automatically populated with the name servers assigned to the Google Domains DNS zone. */
  nameServers?: Array<string>;
  /** Required. The state of DS records for this domain. Used to enable or disable automatic DNSSEC. */
  dsState?: "DS_STATE_UNSPECIFIED" | "DS_RECORDS_UNPUBLISHED" | "DS_RECORDS_PUBLISHED" | (string & {});
}

export const GoogleDomainsDns: Schema.Schema<GoogleDomainsDns> = Schema.suspend(() => Schema.Struct({
  dsRecords: Schema.optional(Schema.Array(DsRecord)),
  nameServers: Schema.optional(Schema.Array(Schema.String)),
  dsState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDomainsDns" }) as any as Schema.Schema<GoogleDomainsDns>;

export interface DnsSettings {
  /** Output only. Indicates if this `Registration` has configured one of the following deprecated Google Domains DNS features: * Domain forwarding (HTTP `301` and `302` response status codes), * Email forwarding. See https://cloud.google.com/domains/docs/deprecations/feature-deprecations for more details. If any of these features is enabled call the `RetrieveGoogleDomainsForwardingConfig` method to get details about the feature's configuration. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone. */
  googleDomainsRedirectsDataAvailable?: boolean;
  /** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations). The free DNS zone provided by [Google Domains](https://domains.google/). */
  googleDomainsDns?: GoogleDomainsDns;
  /** The list of glue records for this `Registration`. Commonly empty. */
  glueRecords?: Array<GlueRecord>;
  /** An arbitrary DNS provider identified by its name servers. */
  customDns?: CustomDns;
}

export const DnsSettings: Schema.Schema<DnsSettings> = Schema.suspend(() => Schema.Struct({
  googleDomainsRedirectsDataAvailable: Schema.optional(Schema.Boolean),
  googleDomainsDns: Schema.optional(GoogleDomainsDns),
  glueRecords: Schema.optional(Schema.Array(GlueRecord)),
  customDns: Schema.optional(CustomDns),
})).annotate({ identifier: "DnsSettings" }) as any as Schema.Schema<DnsSettings>;

export interface ManagementSettings {
  /** Output only. The actual renewal method for this `Registration`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be equal to `RENEWAL_DISABLED`—for example, when there are problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours. */
  renewalMethod?: "RENEWAL_METHOD_UNSPECIFIED" | "AUTOMATIC_RENEWAL" | "MANUAL_RENEWAL" | "RENEWAL_DISABLED" | (string & {});
  /** Output only. The actual transfer lock state for this `Registration`. */
  effectiveTransferLockState?: "TRANSFER_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED" | (string & {});
  /** Optional. The desired renewal method for this `Registration`. The actual `renewal_method` is automatically updated to reflect this choice. If unset or equal to `RENEWAL_METHOD_UNSPECIFIED`, the actual `renewalMethod` is treated as if it were set to `AUTOMATIC_RENEWAL`. You cannot use `RENEWAL_DISABLED` during resource creation, and you can update the renewal status only when the `Registration` resource has state `ACTIVE` or `SUSPENDED`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be set to `RENEWAL_DISABLED` in case of problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours. */
  preferredRenewalMethod?: "RENEWAL_METHOD_UNSPECIFIED" | "AUTOMATIC_RENEWAL" | "MANUAL_RENEWAL" | "RENEWAL_DISABLED" | (string & {});
  /** This is the desired transfer lock state for this `Registration`. A transfer lock controls whether the domain can be transferred to another registrar. The transfer lock state of the domain is returned in the `effective_transfer_lock_state` property. The transfer lock state values might be different for the following reasons: * `transfer_lock_state` was updated only a short time ago. * Domains with the `TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY` state are in the list of `domain_properties`. These domains are always in the `UNLOCKED` state. */
  transferLockState?: "TRANSFER_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED" | (string & {});
}

export const ManagementSettings: Schema.Schema<ManagementSettings> = Schema.suspend(() => Schema.Struct({
  renewalMethod: Schema.optional(Schema.String),
  effectiveTransferLockState: Schema.optional(Schema.String),
  preferredRenewalMethod: Schema.optional(Schema.String),
  transferLockState: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagementSettings" }) as any as Schema.Schema<ManagementSettings>;

export interface Registration {
  /** Output only. The state of the `Registration` */
  state?: "STATE_UNSPECIFIED" | "REGISTRATION_PENDING" | "REGISTRATION_FAILED" | "TRANSFER_PENDING" | "TRANSFER_FAILED" | "IMPORT_PENDING" | "ACTIVE" | "SUSPENDED" | "EXPORTED" | "EXPIRED" | (string & {});
  /** Output only. Pending contact settings for the `Registration`. Updates to the `contact_settings` field that change its `registrant_contact` or `privacy` fields require email confirmation by the `registrant_contact` before taking effect. This field is set only if there are pending updates to the `contact_settings` that have not been confirmed. To confirm the changes, the `registrant_contact` must follow the instructions in the email they receive. */
  pendingContactSettings?: ContactSettings;
  /** Output only. Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations). The reason the domain transfer failed. Only set for domains in TRANSFER_FAILED state. */
  transferFailureReason?: "TRANSFER_FAILURE_REASON_UNSPECIFIED" | "TRANSFER_FAILURE_REASON_UNKNOWN" | "EMAIL_CONFIRMATION_FAILURE" | "DOMAIN_NOT_REGISTERED" | "DOMAIN_HAS_TRANSFER_LOCK" | "INVALID_AUTHORIZATION_CODE" | "TRANSFER_CANCELLED" | "TRANSFER_REJECTED" | "INVALID_REGISTRANT_EMAIL_ADDRESS" | "DOMAIN_NOT_ELIGIBLE_FOR_TRANSFER" | "TRANSFER_ALREADY_PENDING" | (string & {});
  /** Output only. The set of issues with the `Registration` that require attention. */
  issues?: Array<"ISSUE_UNSPECIFIED" | "CONTACT_SUPPORT" | "UNVERIFIED_EMAIL" | "PROBLEM_WITH_BILLING" | "DNS_NOT_ACTIVATED" | "AUTO_RENEWAL_UPDATE_NOT_EFFECTIVE" | (string & {})>;
  /** Settings controlling the DNS configuration of the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureDnsSettings` method. */
  dnsSettings?: DnsSettings;
  /** Output only. Special properties of the domain. */
  domainProperties?: Array<"DOMAIN_PROPERTY_UNSPECIFIED" | "TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY" | "REQUIRE_PUSH_TRANSFER" | (string & {})>;
  /** Output only. The reason the domain registration failed. Only set for domains in REGISTRATION_FAILED state. */
  registerFailureReason?: "REGISTER_FAILURE_REASON_UNSPECIFIED" | "REGISTER_FAILURE_REASON_UNKNOWN" | "DOMAIN_NOT_AVAILABLE" | "INVALID_CONTACTS" | (string & {});
  /** Required. Immutable. The domain name. Unicode domain names must be expressed in Punycode format. */
  domainName?: string;
  /** Set of labels associated with the `Registration`. */
  labels?: Record<string, string>;
  /** Output only. Name of the `Registration` resource, in the format `projects/* /locations/* /registrations/`. */
  name?: string;
  /** Output only. The creation timestamp of the `Registration` resource. */
  createTime?: string;
  /** Output only. Set of options for the `contact_settings.privacy` field that this `Registration` supports. */
  supportedPrivacy?: Array<"CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA" | (string & {})>;
  /** Required. Settings for contact information linked to the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureContactSettings` method. */
  contactSettings?: ContactSettings;
  /** Settings for management of the `Registration`, including renewal, billing, and transfer. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureManagementSettings` method. */
  managementSettings?: ManagementSettings;
  /** Output only. The expiration timestamp of the `Registration`. */
  expireTime?: string;
}

export const Registration: Schema.Schema<Registration> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  pendingContactSettings: Schema.optional(ContactSettings),
  transferFailureReason: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(Schema.String)),
  dnsSettings: Schema.optional(DnsSettings),
  domainProperties: Schema.optional(Schema.Array(Schema.String)),
  registerFailureReason: Schema.optional(Schema.String),
  domainName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  supportedPrivacy: Schema.optional(Schema.Array(Schema.String)),
  contactSettings: Schema.optional(ContactSettings),
  managementSettings: Schema.optional(ManagementSettings),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Registration" }) as any as Schema.Schema<Registration>;

export interface AuthorizationCode {
  /** The Authorization Code in ASCII. It can be used to transfer the domain to or from another registrar. */
  code?: string;
}

export const AuthorizationCode: Schema.Schema<AuthorizationCode> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizationCode" }) as any as Schema.Schema<AuthorizationCode>;

export interface TransferDomainRequest {
  /** The list of contact notices that you acknowledge. The notices needed here depend on the values specified in `registration.contact_settings`. */
  contactNotices?: Array<"CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT" | (string & {})>;
  /** Required. The complete `Registration` resource to be created. You can leave `registration.dns_settings` unset to import the domain's current DNS configuration from its current registrar. Use this option only if you are sure that the domain's current DNS service does not cease upon transfer, as is often the case for DNS services provided for free by the registrar. */
  registration?: Registration;
  /** Required. Acknowledgement of the price to transfer or renew the domain for one year. Call `RetrieveTransferParameters` to obtain the price, which you must acknowledge. */
  yearlyPrice?: Money;
  /** Validate the request without actually transferring the domain. */
  validateOnly?: boolean;
  /** The domain's transfer authorization code. You can obtain this from the domain's current registrar. */
  authorizationCode?: AuthorizationCode;
}

export const TransferDomainRequest: Schema.Schema<TransferDomainRequest> = Schema.suspend(() => Schema.Struct({
  contactNotices: Schema.optional(Schema.Array(Schema.String)),
  registration: Schema.optional(Registration),
  yearlyPrice: Schema.optional(Money),
  validateOnly: Schema.optional(Schema.Boolean),
  authorizationCode: Schema.optional(AuthorizationCode),
})).annotate({ identifier: "TransferDomainRequest" }) as any as Schema.Schema<TransferDomainRequest>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface ResetAuthorizationCodeRequest {
}

export const ResetAuthorizationCodeRequest: Schema.Schema<ResetAuthorizationCodeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetAuthorizationCodeRequest" }) as any as Schema.Schema<ResetAuthorizationCodeRequest>;

export interface ConfigureDnsSettingsRequest {
  /** Validate the request without actually updating the DNS settings. */
  validateOnly?: boolean;
  /** Fields of the `DnsSettings` to update. */
  dnsSettings?: DnsSettings;
  /** Required. The field mask describing which fields to update as a comma-separated list. For example, if only the name servers are being updated for an existing Custom DNS configuration, the `update_mask` is `"custom_dns.name_servers"`. When changing the DNS provider from one type to another, pass the new provider's field name as part of the field mask. For example, when changing from a Google Domains DNS configuration to a Custom DNS configuration, the `update_mask` is `"custom_dns"`. // */
  updateMask?: string;
}

export const ConfigureDnsSettingsRequest: Schema.Schema<ConfigureDnsSettingsRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  dnsSettings: Schema.optional(DnsSettings),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigureDnsSettingsRequest" }) as any as Schema.Schema<ConfigureDnsSettingsRequest>;

export interface ResourceRecordSet {
  /** Number of seconds that this `ResourceRecordSet` can be cached by resolvers. */
  ttl?: number;
  /** For example, www.example.com. */
  name?: string;
  /** As defined in RFC 4034 (section 3.2). */
  signatureRrdata?: Array<string>;
  /** Configures dynamic query responses based on either the geo location of the querying user or a weighted round robin based routing policy. A valid `ResourceRecordSet` contains only `rrdata` (for static resolution) or a `routing_policy` (for dynamic resolution). */
  routingPolicy?: RRSetRoutingPolicy;
  /** As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. */
  rrdata?: Array<string>;
  /** The identifier of a supported record type. See the list of Supported DNS record types. */
  type?: string;
}

export const ResourceRecordSet: Schema.Schema<ResourceRecordSet> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  signatureRrdata: Schema.optional(Schema.Array(Schema.String)),
  routingPolicy: Schema.optional(RRSetRoutingPolicy),
  rrdata: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceRecordSet" }) as any as Schema.Schema<ResourceRecordSet>;

export interface RegisterDomainRequest {
  /** Required. The complete `Registration` resource to be created. */
  registration?: Registration;
  /** The list of domain notices that you acknowledge. Call `RetrieveRegisterParameters` to see the notices that need acknowledgement. */
  domainNotices?: Array<"DOMAIN_NOTICE_UNSPECIFIED" | "HSTS_PRELOADED" | (string & {})>;
  /** The list of contact notices that the caller acknowledges. The notices needed here depend on the values specified in `registration.contact_settings`. */
  contactNotices?: Array<"CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT" | (string & {})>;
  /** Required. Yearly price to register or renew the domain. The value that should be put here can be obtained from RetrieveRegisterParameters or SearchDomains calls. */
  yearlyPrice?: Money;
  /** When true, only validation is performed, without actually registering the domain. Follows: https://cloud.google.com/apis/design/design_patterns#request_validation */
  validateOnly?: boolean;
}

export const RegisterDomainRequest: Schema.Schema<RegisterDomainRequest> = Schema.suspend(() => Schema.Struct({
  registration: Schema.optional(Registration),
  domainNotices: Schema.optional(Schema.Array(Schema.String)),
  contactNotices: Schema.optional(Schema.Array(Schema.String)),
  yearlyPrice: Schema.optional(Money),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RegisterDomainRequest" }) as any as Schema.Schema<RegisterDomainRequest>;

export interface ListRegistrationsResponse {
  /** When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. */
  nextPageToken?: string;
  /** A list of `Registration`s. */
  registrations?: Array<Registration>;
}

export const ListRegistrationsResponse: Schema.Schema<ListRegistrationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  registrations: Schema.optional(Schema.Array(Registration)),
})).annotate({ identifier: "ListRegistrationsResponse" }) as any as Schema.Schema<ListRegistrationsResponse>;

export interface InitiatePushTransferRequest {
  /** Required. The Tag of the new registrar. Can be found at [List of registrars](https://nominet.uk/registrar-list/). */
  tag?: string;
}

export const InitiatePushTransferRequest: Schema.Schema<InitiatePushTransferRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "InitiatePushTransferRequest" }) as any as Schema.Schema<InitiatePushTransferRequest>;

export interface ConfigureContactSettingsRequest {
  /** The list of contact notices that the caller acknowledges. The notices needed here depend on the values specified in `contact_settings`. */
  contactNotices?: Array<"CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT" | (string & {})>;
  /** Fields of the `ContactSettings` to update. */
  contactSettings?: ContactSettings;
  /** Validate the request without actually updating the contact settings. */
  validateOnly?: boolean;
  /** Required. The field mask describing which fields to update as a comma-separated list. For example, if only the registrant contact is being updated, the `update_mask` is `"registrant_contact"`. */
  updateMask?: string;
}

export const ConfigureContactSettingsRequest: Schema.Schema<ConfigureContactSettingsRequest> = Schema.suspend(() => Schema.Struct({
  contactNotices: Schema.optional(Schema.Array(Schema.String)),
  contactSettings: Schema.optional(ContactSettings),
  validateOnly: Schema.optional(Schema.Boolean),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigureContactSettingsRequest" }) as any as Schema.Schema<ConfigureContactSettingsRequest>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

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

export interface RetrieveGoogleDomainsDnsRecordsResponse {
  /** When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. */
  nextPageToken?: string;
  /** The resource record set resources (DNS Zone records). */
  rrset?: Array<ResourceRecordSet>;
}

export const RetrieveGoogleDomainsDnsRecordsResponse: Schema.Schema<RetrieveGoogleDomainsDnsRecordsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  rrset: Schema.optional(Schema.Array(ResourceRecordSet)),
})).annotate({ identifier: "RetrieveGoogleDomainsDnsRecordsResponse" }) as any as Schema.Schema<RetrieveGoogleDomainsDnsRecordsResponse>;

export interface OperationMetadata {
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** The time the operation was created. */
  createTime?: string;
  /** Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface SetIamPolicyRequest {
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface ConfigureManagementSettingsRequest {
  /** Fields of the `ManagementSettings` to update. */
  managementSettings?: ManagementSettings;
  /** Required. The field mask describing which fields to update as a comma-separated list. For example, if only the transfer lock is being updated, the `update_mask` is `"transfer_lock_state"`. */
  updateMask?: string;
}

export const ConfigureManagementSettingsRequest: Schema.Schema<ConfigureManagementSettingsRequest> = Schema.suspend(() => Schema.Struct({
  managementSettings: Schema.optional(ManagementSettings),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigureManagementSettingsRequest" }) as any as Schema.Schema<ConfigureManagementSettingsRequest>;

export interface ImportDomainRequest {
  /** Set of labels associated with the `Registration`. */
  labels?: Record<string, string>;
  /** Required. The domain name. Unicode domain names must be expressed in Punycode format. */
  domainName?: string;
}

export const ImportDomainRequest: Schema.Schema<ImportDomainRequest> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  domainName: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportDomainRequest" }) as any as Schema.Schema<ImportDomainRequest>;

export interface SearchDomainsResponse {
  /** Results of the domain name search. */
  registerParameters?: Array<RegisterParameters>;
}

export const SearchDomainsResponse: Schema.Schema<SearchDomainsResponse> = Schema.suspend(() => Schema.Struct({
  registerParameters: Schema.optional(Schema.Array(RegisterParameters)),
})).annotate({ identifier: "SearchDomainsResponse" }) as any as Schema.Schema<SearchDomainsResponse>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(Operation)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface TransferParameters {
  /** The domain name. Unicode domain names are expressed in Punycode format. */
  domainName?: string;
  /** Contact privacy options that the domain supports. */
  supportedPrivacy?: Array<"CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA" | (string & {})>;
  /** Price to transfer or renew the domain for one year. */
  yearlyPrice?: Money;
  /** The registrar that currently manages the domain. */
  currentRegistrar?: string;
  /** Indicates whether the domain is protected by a transfer lock. For a transfer to succeed, this must show `UNLOCKED`. To unlock a domain, go to its current registrar. */
  transferLockState?: "TRANSFER_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED" | (string & {});
  /** The name servers that currently store the configuration of the domain. */
  nameServers?: Array<string>;
  /** The URL of the registrar that currently manages the domain. */
  currentRegistrarUri?: string;
}

export const TransferParameters: Schema.Schema<TransferParameters> = Schema.suspend(() => Schema.Struct({
  domainName: Schema.optional(Schema.String),
  supportedPrivacy: Schema.optional(Schema.Array(Schema.String)),
  yearlyPrice: Schema.optional(Money),
  currentRegistrar: Schema.optional(Schema.String),
  transferLockState: Schema.optional(Schema.String),
  nameServers: Schema.optional(Schema.Array(Schema.String)),
  currentRegistrarUri: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferParameters" }) as any as Schema.Schema<TransferParameters>;

export interface RetrieveTransferParametersResponse {
  /** Parameters to use when calling the `TransferDomain` method. */
  transferParameters?: TransferParameters;
}

export const RetrieveTransferParametersResponse: Schema.Schema<RetrieveTransferParametersResponse> = Schema.suspend(() => Schema.Struct({
  transferParameters: Schema.optional(TransferParameters),
})).annotate({ identifier: "RetrieveTransferParametersResponse" }) as any as Schema.Schema<RetrieveTransferParametersResponse>;

export interface ExportRegistrationRequest {
}

export const ExportRegistrationRequest: Schema.Schema<ExportRegistrationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportRegistrationRequest" }) as any as Schema.Schema<ExportRegistrationRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
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

/** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Exports a `Registration` resource, such that it is no longer managed by Cloud Domains. When an active domain is successfully exported, you can continue to use the domain in [Google Domains](https://domains.google/) until it expires. The calling user becomes the domain's sole owner in Google Domains, and permissions for the domain are subsequently managed there. The domain does not renew automatically unless the new owner sets up billing in Google Domains. */
export interface ExportProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` to export, in the format `projects/* /locations/* /registrations/*`. */
  name: string;
  /** Request body */
  body?: ExportRegistrationRequest;
}

export const ExportProjectsLocationsRegistrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportRegistrationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsRegistrationsRequest>;

export type ExportProjectsLocationsRegistrationsResponse = Operation;
export const ExportProjectsLocationsRegistrationsResponse = Operation;

export type ExportProjectsLocationsRegistrationsError = CommonErrors;

export const exportProjectsLocationsRegistrations: API.OperationMethod<ExportProjectsLocationsRegistrationsRequest, ExportProjectsLocationsRegistrationsResponse, ExportProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsRegistrationsRequest,
  output: ExportProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Registers a new domain name and creates a corresponding `Registration` resource. Call `RetrieveRegisterParameters` first to check availability of the domain name and determine parameters like price that are needed to build a call to this method. A successful call creates a `Registration` resource in state `REGISTRATION_PENDING`, which resolves to `ACTIVE` within 1-2 minutes, indicating that the domain was successfully registered. If the resource ends up in state `REGISTRATION_FAILED`, it indicates that the domain was not registered successfully, and you can safely delete the resource and retry registration. */
export interface RegisterProjectsLocationsRegistrationsRequest {
  /** Required. The parent resource of the `Registration`. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: RegisterDomainRequest;
}

export const RegisterProjectsLocationsRegistrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RegisterDomainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:register", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RegisterProjectsLocationsRegistrationsRequest>;

export type RegisterProjectsLocationsRegistrationsResponse = Operation;
export const RegisterProjectsLocationsRegistrationsResponse = Operation;

export type RegisterProjectsLocationsRegistrationsError = CommonErrors;

export const registerProjectsLocationsRegistrations: API.OperationMethod<RegisterProjectsLocationsRegistrationsRequest, RegisterProjectsLocationsRegistrationsResponse, RegisterProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RegisterProjectsLocationsRegistrationsRequest,
  output: RegisterProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Gets parameters needed to register a new domain name, including price and up-to-date availability. Use the returned values to call `RegisterDomain`. */
export interface RetrieveRegisterParametersProjectsLocationsRegistrationsRequest {
  /** Required. The domain name. Unicode domain names must be expressed in Punycode format. */
  domainName?: string;
  /** Required. The location. Must be in the format `projects/* /locations/*`. */
  location: string;
}

export const RetrieveRegisterParametersProjectsLocationsRegistrationsRequest = Schema.Struct({
  domainName: Schema.optional(Schema.String).pipe(T.HttpQuery("domainName")),
  location: Schema.String.pipe(T.HttpPath("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:retrieveRegisterParameters" }),
  svc,
) as unknown as Schema.Schema<RetrieveRegisterParametersProjectsLocationsRegistrationsRequest>;

export type RetrieveRegisterParametersProjectsLocationsRegistrationsResponse = RetrieveRegisterParametersResponse;
export const RetrieveRegisterParametersProjectsLocationsRegistrationsResponse = RetrieveRegisterParametersResponse;

export type RetrieveRegisterParametersProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveRegisterParametersProjectsLocationsRegistrations: API.OperationMethod<RetrieveRegisterParametersProjectsLocationsRegistrationsRequest, RetrieveRegisterParametersProjectsLocationsRegistrationsResponse, RetrieveRegisterParametersProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveRegisterParametersProjectsLocationsRegistrationsRequest,
  output: RetrieveRegisterParametersProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Updates select fields of a `Registration` resource, notably `labels`. To update other fields, use the appropriate custom update method: * To update management settings, see `ConfigureManagementSettings` * To update DNS configuration, see `ConfigureDnsSettings` * To update contact information, see `ConfigureContactSettings` */
export interface PatchProjectsLocationsRegistrationsRequest {
  /** Output only. Name of the `Registration` resource, in the format `projects/* /locations/* /registrations/`. */
  name: string;
  /** Required. The field mask describing which fields to update as a comma-separated list. For example, if only the labels are being updated, the `update_mask` is `"labels"`. */
  updateMask?: string;
  /** Request body */
  body?: Registration;
}

export const PatchProjectsLocationsRegistrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Registration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRegistrationsRequest>;

export type PatchProjectsLocationsRegistrationsResponse = Operation;
export const PatchProjectsLocationsRegistrationsResponse = Operation;

export type PatchProjectsLocationsRegistrationsError = CommonErrors;

export const patchProjectsLocationsRegistrations: API.OperationMethod<PatchProjectsLocationsRegistrationsRequest, PatchProjectsLocationsRegistrationsResponse, PatchProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRegistrationsRequest,
  output: PatchProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Updates a `Registration`'s management settings. */
export interface ConfigureManagementSettingsProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose management settings are being updated, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: ConfigureManagementSettingsRequest;
}

export const ConfigureManagementSettingsProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(ConfigureManagementSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:configureManagementSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConfigureManagementSettingsProjectsLocationsRegistrationsRequest>;

export type ConfigureManagementSettingsProjectsLocationsRegistrationsResponse = Operation;
export const ConfigureManagementSettingsProjectsLocationsRegistrationsResponse = Operation;

export type ConfigureManagementSettingsProjectsLocationsRegistrationsError = CommonErrors;

export const configureManagementSettingsProjectsLocationsRegistrations: API.OperationMethod<ConfigureManagementSettingsProjectsLocationsRegistrationsRequest, ConfigureManagementSettingsProjectsLocationsRegistrationsResponse, ConfigureManagementSettingsProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConfigureManagementSettingsProjectsLocationsRegistrationsRequest,
  output: ConfigureManagementSettingsProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Imports a domain name from [Google Domains](https://domains.google/) for use in Cloud Domains. To transfer a domain from another registrar, use the `TransferDomain` method instead. Since individual users can own domains in Google Domains, the calling user must have ownership permission on the domain. */
export interface ImportProjectsLocationsRegistrationsRequest {
  /** Required. The parent resource of the Registration. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: ImportDomainRequest;
}

export const ImportProjectsLocationsRegistrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportDomainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsRegistrationsRequest>;

export type ImportProjectsLocationsRegistrationsResponse = Operation;
export const ImportProjectsLocationsRegistrationsResponse = Operation;

export type ImportProjectsLocationsRegistrationsError = CommonErrors;

export const importProjectsLocationsRegistrations: API.OperationMethod<ImportProjectsLocationsRegistrationsRequest, ImportProjectsLocationsRegistrationsResponse, ImportProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsRegistrationsRequest,
  output: ImportProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Renews a recently expired domain. This method can only be called on domains that expired in the previous 30 days. After the renewal, the new expiration time of the domain is one year after the old expiration time and you are charged a `yearly_price` for the renewal. */
export interface RenewDomainProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whish is being renewed, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: RenewDomainRequest;
}

export const RenewDomainProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(RenewDomainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:renewDomain", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenewDomainProjectsLocationsRegistrationsRequest>;

export type RenewDomainProjectsLocationsRegistrationsResponse = Operation;
export const RenewDomainProjectsLocationsRegistrationsResponse = Operation;

export type RenewDomainProjectsLocationsRegistrationsError = CommonErrors;

export const renewDomainProjectsLocationsRegistrations: API.OperationMethod<RenewDomainProjectsLocationsRegistrationsRequest, RenewDomainProjectsLocationsRegistrationsResponse, RenewDomainProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenewDomainProjectsLocationsRegistrationsRequest,
  output: RenewDomainProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Lists the deprecated domain and email forwarding configurations you set up in the deprecated Google Domains UI. The configuration is present only for domains with the `google_domains_redirects_data_available` set to `true` in the `Registration`'s `dns_settings`. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone. */
export interface RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose Google Domains forwarding configuration details are being retrieved, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
}

export const RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:retrieveGoogleDomainsForwardingConfig" }),
  svc,
) as unknown as Schema.Schema<RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsRequest>;

export type RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsResponse = RetrieveGoogleDomainsForwardingConfigResponse;
export const RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsResponse = RetrieveGoogleDomainsForwardingConfigResponse;

export type RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrations: API.OperationMethod<RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsRequest, RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsResponse, RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsRequest,
  output: RetrieveGoogleDomainsForwardingConfigProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRegistrationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRegistrationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRegistrationsRequest>;

export type TestIamPermissionsProjectsLocationsRegistrationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRegistrationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRegistrationsError = CommonErrors;

export const testIamPermissionsProjectsLocationsRegistrations: API.OperationMethod<TestIamPermissionsProjectsLocationsRegistrationsRequest, TestIamPermissionsProjectsLocationsRegistrationsResponse, TestIamPermissionsProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRegistrationsRequest,
  output: TestIamPermissionsProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Searches for available domain names similar to the provided query. Availability results from this method are approximate; call `RetrieveRegisterParameters` on a domain before registering to confirm availability. */
export interface SearchDomainsProjectsLocationsRegistrationsRequest {
  /** Required. The location. Must be in the format `projects/* /locations/*`. */
  location: string;
  /** Required. String used to search for available domain names. */
  query?: string;
}

export const SearchDomainsProjectsLocationsRegistrationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:searchDomains" }),
  svc,
) as unknown as Schema.Schema<SearchDomainsProjectsLocationsRegistrationsRequest>;

export type SearchDomainsProjectsLocationsRegistrationsResponse = SearchDomainsResponse;
export const SearchDomainsProjectsLocationsRegistrationsResponse = SearchDomainsResponse;

export type SearchDomainsProjectsLocationsRegistrationsError = CommonErrors;

export const searchDomainsProjectsLocationsRegistrations: API.OperationMethod<SearchDomainsProjectsLocationsRegistrationsRequest, SearchDomainsProjectsLocationsRegistrationsResponse, SearchDomainsProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchDomainsProjectsLocationsRegistrationsRequest,
  output: SearchDomainsProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Updates a `Registration`'s DNS settings. */
export interface ConfigureDnsSettingsProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose DNS settings are being updated, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: ConfigureDnsSettingsRequest;
}

export const ConfigureDnsSettingsProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(ConfigureDnsSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:configureDnsSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConfigureDnsSettingsProjectsLocationsRegistrationsRequest>;

export type ConfigureDnsSettingsProjectsLocationsRegistrationsResponse = Operation;
export const ConfigureDnsSettingsProjectsLocationsRegistrationsResponse = Operation;

export type ConfigureDnsSettingsProjectsLocationsRegistrationsError = CommonErrors;

export const configureDnsSettingsProjectsLocationsRegistrations: API.OperationMethod<ConfigureDnsSettingsProjectsLocationsRegistrationsRequest, ConfigureDnsSettingsProjectsLocationsRegistrationsResponse, ConfigureDnsSettingsProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConfigureDnsSettingsProjectsLocationsRegistrationsRequest,
  output: ConfigureDnsSettingsProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Gets parameters needed to transfer a domain name from another registrar to Cloud Domains. For domains already managed by [Google Domains](https://domains.google/), use `ImportDomain` instead. Use the returned values to call `TransferDomain`. */
export interface RetrieveTransferParametersProjectsLocationsRegistrationsRequest {
  /** Required. The location. Must be in the format `projects/* /locations/*`. */
  location: string;
  /** Required. The domain name. Unicode domain names must be expressed in Punycode format. */
  domainName?: string;
}

export const RetrieveTransferParametersProjectsLocationsRegistrationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  domainName: Schema.optional(Schema.String).pipe(T.HttpQuery("domainName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:retrieveTransferParameters" }),
  svc,
) as unknown as Schema.Schema<RetrieveTransferParametersProjectsLocationsRegistrationsRequest>;

export type RetrieveTransferParametersProjectsLocationsRegistrationsResponse = RetrieveTransferParametersResponse;
export const RetrieveTransferParametersProjectsLocationsRegistrationsResponse = RetrieveTransferParametersResponse;

export type RetrieveTransferParametersProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveTransferParametersProjectsLocationsRegistrations: API.OperationMethod<RetrieveTransferParametersProjectsLocationsRegistrationsRequest, RetrieveTransferParametersProjectsLocationsRegistrationsResponse, RetrieveTransferParametersProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveTransferParametersProjectsLocationsRegistrationsRequest,
  output: RetrieveTransferParametersProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Gets the authorization code of the `Registration` for the purpose of transferring the domain to another registrar. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the process to transfer the domain to a different registrar. */
export interface RetrieveAuthorizationCodeProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose authorization code is being retrieved, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
}

export const RetrieveAuthorizationCodeProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:retrieveAuthorizationCode" }),
  svc,
) as unknown as Schema.Schema<RetrieveAuthorizationCodeProjectsLocationsRegistrationsRequest>;

export type RetrieveAuthorizationCodeProjectsLocationsRegistrationsResponse = AuthorizationCode;
export const RetrieveAuthorizationCodeProjectsLocationsRegistrationsResponse = AuthorizationCode;

export type RetrieveAuthorizationCodeProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveAuthorizationCodeProjectsLocationsRegistrations: API.OperationMethod<RetrieveAuthorizationCodeProjectsLocationsRegistrationsRequest, RetrieveAuthorizationCodeProjectsLocationsRegistrationsResponse, RetrieveAuthorizationCodeProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveAuthorizationCodeProjectsLocationsRegistrationsRequest,
  output: RetrieveAuthorizationCodeProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Transfers a domain name from another registrar to Cloud Domains. For domains already managed by [Google Domains](https://domains.google/), use `ImportDomain` instead. Before calling this method, go to the domain's current registrar to unlock the domain for transfer and retrieve the domain's transfer authorization code. Then call `RetrieveTransferParameters` to confirm that the domain is unlocked and to get values needed to build a call to this method. A successful call creates a `Registration` resource in state `TRANSFER_PENDING`. It can take several days to complete the transfer process. The registrant can often speed up this process by approving the transfer through the current registrar, either by clicking a link in an email from the registrar or by visiting the registrar's website. A few minutes after transfer approval, the resource transitions to state `ACTIVE`, indicating that the transfer was successful. If the transfer is rejected or the request expires without being approved, the resource can end up in state `TRANSFER_FAILED`. If transfer fails, you can safely delete the resource and retry the transfer. */
export interface TransferProjectsLocationsRegistrationsRequest {
  /** Required. The parent resource of the `Registration`. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: TransferDomainRequest;
}

export const TransferProjectsLocationsRegistrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(TransferDomainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:transfer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TransferProjectsLocationsRegistrationsRequest>;

export type TransferProjectsLocationsRegistrationsResponse = Operation;
export const TransferProjectsLocationsRegistrationsResponse = Operation;

export type TransferProjectsLocationsRegistrationsError = CommonErrors;

export const transferProjectsLocationsRegistrations: API.OperationMethod<TransferProjectsLocationsRegistrationsRequest, TransferProjectsLocationsRegistrationsResponse, TransferProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TransferProjectsLocationsRegistrationsRequest,
  output: TransferProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Resets the authorization code of the `Registration` to a new random string. You can call this method only after 60 days have elapsed since the initial domain registration. Domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties` don't support authorization codes and must use the `InitiatePushTransfer` method to initiate the process to transfer the domain to a different registrar. */
export interface ResetAuthorizationCodeProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose authorization code is being reset, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: ResetAuthorizationCodeRequest;
}

export const ResetAuthorizationCodeProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(ResetAuthorizationCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:resetAuthorizationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAuthorizationCodeProjectsLocationsRegistrationsRequest>;

export type ResetAuthorizationCodeProjectsLocationsRegistrationsResponse = AuthorizationCode;
export const ResetAuthorizationCodeProjectsLocationsRegistrationsResponse = AuthorizationCode;

export type ResetAuthorizationCodeProjectsLocationsRegistrationsError = CommonErrors;

export const resetAuthorizationCodeProjectsLocationsRegistrations: API.OperationMethod<ResetAuthorizationCodeProjectsLocationsRegistrationsRequest, ResetAuthorizationCodeProjectsLocationsRegistrationsResponse, ResetAuthorizationCodeProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAuthorizationCodeProjectsLocationsRegistrationsRequest,
  output: ResetAuthorizationCodeProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Updates a `Registration`'s contact settings. Some changes require confirmation by the domain's registrant contact . Caution: Please consider carefully any changes to contact privacy settings when changing from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA.` There may be a delay in reflecting updates you make to registrant contact information such that any changes you make to contact privacy (including from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA`) will be applied without delay but changes to registrant contact information may take a limited time to be publicized. This means that changes to contact privacy from `REDACTED_CONTACT_DATA` to `PUBLIC_CONTACT_DATA` may make the previous registrant contact data public until the modified registrant contact details are published. */
export interface ConfigureContactSettingsProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` whose contact settings are being updated, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: ConfigureContactSettingsRequest;
}

export const ConfigureContactSettingsProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(ConfigureContactSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:configureContactSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConfigureContactSettingsProjectsLocationsRegistrationsRequest>;

export type ConfigureContactSettingsProjectsLocationsRegistrationsResponse = Operation;
export const ConfigureContactSettingsProjectsLocationsRegistrationsResponse = Operation;

export type ConfigureContactSettingsProjectsLocationsRegistrationsError = CommonErrors;

export const configureContactSettingsProjectsLocationsRegistrations: API.OperationMethod<ConfigureContactSettingsProjectsLocationsRegistrationsRequest, ConfigureContactSettingsProjectsLocationsRegistrationsResponse, ConfigureContactSettingsProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConfigureContactSettingsProjectsLocationsRegistrationsRequest,
  output: ConfigureContactSettingsProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Lists the DNS records from the Google Domains DNS zone for domains that use the deprecated `google_domains_dns` in the `Registration`'s `dns_settings`. */
export interface RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsRequest {
  /** Optional. Maximum number of results to return. */
  pageSize?: number;
  /** Required. The name of the `Registration` whose Google Domains DNS records details you are retrieving, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Optional. When set to the `next_page_token` from a prior response, provides the next page of results. */
  pageToken?: string;
}

export const RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  registration: Schema.String.pipe(T.HttpPath("registration")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:retrieveGoogleDomainsDnsRecords" }),
  svc,
) as unknown as Schema.Schema<RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsRequest>;

export type RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsResponse = RetrieveGoogleDomainsDnsRecordsResponse;
export const RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsResponse = RetrieveGoogleDomainsDnsRecordsResponse;

export type RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrations = API.makePaginated(() => ({
  input: RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsRequest,
  output: RetrieveGoogleDomainsDnsRecordsProjectsLocationsRegistrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the `Registration` resources in a project. */
export interface ListProjectsLocationsRegistrationsRequest {
  /** Filter expression to restrict the `Registration`s returned. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, a boolean, or an enum value. The comparison operator should be one of =, !=, >, <, >=, <=, or : for prefix or wildcard matches. For example, to filter to a specific domain name, use an expression like `domainName="example.com"`. You can also check for the existence of a field; for example, to find domains using custom DNS settings, use an expression like `dnsSettings.customDns:*`. You can also create compound filters by combining expressions with the `AND` and `OR` operators. For example, to find domains that are suspended or have specific issues flagged, use an expression like `(state=SUSPENDED) OR (issue:*)`. */
  filter?: string;
  /** Maximum number of results to return. */
  pageSize?: number;
  /** When set to the `next_page_token` from a prior response, provides the next page of results. */
  pageToken?: string;
  /** Required. The project and location from which to list `Registration`s, specified in the format `projects/* /locations/*`. */
  parent: string;
}

export const ListProjectsLocationsRegistrationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRegistrationsRequest>;

export type ListProjectsLocationsRegistrationsResponse = ListRegistrationsResponse;
export const ListProjectsLocationsRegistrationsResponse = ListRegistrationsResponse;

export type ListProjectsLocationsRegistrationsError = CommonErrors;

export const listProjectsLocationsRegistrations = API.makePaginated(() => ({
  input: ListProjectsLocationsRegistrationsRequest,
  output: ListProjectsLocationsRegistrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRegistrationsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsRegistrationsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRegistrationsRequest>;

export type GetIamPolicyProjectsLocationsRegistrationsResponse = Policy;
export const GetIamPolicyProjectsLocationsRegistrationsResponse = Policy;

export type GetIamPolicyProjectsLocationsRegistrationsError = CommonErrors;

export const getIamPolicyProjectsLocationsRegistrations: API.OperationMethod<GetIamPolicyProjectsLocationsRegistrationsRequest, GetIamPolicyProjectsLocationsRegistrationsResponse, GetIamPolicyProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRegistrationsRequest,
  output: GetIamPolicyProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRegistrationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRegistrationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRegistrationsRequest>;

export type SetIamPolicyProjectsLocationsRegistrationsResponse = Policy;
export const SetIamPolicyProjectsLocationsRegistrationsResponse = Policy;

export type SetIamPolicyProjectsLocationsRegistrationsError = CommonErrors;

export const setIamPolicyProjectsLocationsRegistrations: API.OperationMethod<SetIamPolicyProjectsLocationsRegistrationsRequest, SetIamPolicyProjectsLocationsRegistrationsResponse, SetIamPolicyProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRegistrationsRequest,
  output: SetIamPolicyProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Gets the details of a `Registration` resource. */
export interface GetProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` to get, in the format `projects/* /locations/* /registrations/*`. */
  name: string;
}

export const GetProjectsLocationsRegistrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRegistrationsRequest>;

export type GetProjectsLocationsRegistrationsResponse = Registration;
export const GetProjectsLocationsRegistrationsResponse = Registration;

export type GetProjectsLocationsRegistrationsError = CommonErrors;

export const getProjectsLocationsRegistrations: API.OperationMethod<GetProjectsLocationsRegistrationsRequest, GetProjectsLocationsRegistrationsResponse, GetProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRegistrationsRequest,
  output: GetProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) Lists domain names from [Google Domains](https://domains.google/) that can be imported to Cloud Domains using the `ImportDomain` method. Since individual users can own domains in Google Domains, the list of domains returned depends on the individual user making the call. Domains already managed by Cloud Domains are not returned. */
export interface RetrieveImportableDomainsProjectsLocationsRegistrationsRequest {
  /** Maximum number of results to return. */
  pageSize?: number;
  /** Required. The location. Must be in the format `projects/* /locations/*`. */
  location: string;
  /** When set to the `next_page_token` from a prior response, provides the next page of results. */
  pageToken?: string;
}

export const RetrieveImportableDomainsProjectsLocationsRegistrationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  location: Schema.String.pipe(T.HttpPath("location")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations:retrieveImportableDomains" }),
  svc,
) as unknown as Schema.Schema<RetrieveImportableDomainsProjectsLocationsRegistrationsRequest>;

export type RetrieveImportableDomainsProjectsLocationsRegistrationsResponse = RetrieveImportableDomainsResponse;
export const RetrieveImportableDomainsProjectsLocationsRegistrationsResponse = RetrieveImportableDomainsResponse;

export type RetrieveImportableDomainsProjectsLocationsRegistrationsError = CommonErrors;

export const retrieveImportableDomainsProjectsLocationsRegistrations = API.makePaginated(() => ({
  input: RetrieveImportableDomainsProjectsLocationsRegistrationsRequest,
  output: RetrieveImportableDomainsProjectsLocationsRegistrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Initiates the `Push Transfer` process to transfer the domain to another registrar. The process might complete instantly or might require confirmation or additional work. Check the emails sent to the email address of the registrant. The process is aborted after a timeout if it's not completed. This method is only supported for domains that have the `REQUIRE_PUSH_TRANSFER` property in the list of `domain_properties`. The domain must also be unlocked before it can be transferred to a different registrar. For more information, see [Transfer a registered domain to another registrar](https://cloud.google.com/domains/docs/transfer-domain-to-another-registrar). */
export interface InitiatePushTransferProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` for which the push transfer is initiated, in the format `projects/* /locations/* /registrations/*`. */
  registration: string;
  /** Request body */
  body?: InitiatePushTransferRequest;
}

export const InitiatePushTransferProjectsLocationsRegistrationsRequest = Schema.Struct({
  registration: Schema.String.pipe(T.HttpPath("registration")),
  body: Schema.optional(InitiatePushTransferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}:initiatePushTransfer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitiatePushTransferProjectsLocationsRegistrationsRequest>;

export type InitiatePushTransferProjectsLocationsRegistrationsResponse = Operation;
export const InitiatePushTransferProjectsLocationsRegistrationsResponse = Operation;

export type InitiatePushTransferProjectsLocationsRegistrationsError = CommonErrors;

export const initiatePushTransferProjectsLocationsRegistrations: API.OperationMethod<InitiatePushTransferProjectsLocationsRegistrationsRequest, InitiatePushTransferProjectsLocationsRegistrationsResponse, InitiatePushTransferProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitiatePushTransferProjectsLocationsRegistrationsRequest,
  output: InitiatePushTransferProjectsLocationsRegistrationsResponse,
  errors: [],
}));

/** Deletes a `Registration` resource. This method works on any `Registration` resource using [Subscription or Commitment billing](/domains/pricing#billing-models), provided that the resource was created at least 1 day in the past. When an active registration is successfully deleted, you can continue to use the domain in [Google Domains](https://domains.google/) until it expires. The calling user becomes the domain's sole owner in Google Domains, and permissions for the domain are subsequently managed there. The domain does not renew automatically unless the new owner sets up billing in Google Domains. After January 2024 you will only be able to delete `Registration` resources when `state` is one of: `EXPORTED`, `EXPIRED`,`REGISTRATION_FAILED` or `TRANSFER_FAILED`. See [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations) for more details. */
export interface DeleteProjectsLocationsRegistrationsRequest {
  /** Required. The name of the `Registration` to delete, in the format `projects/* /locations/* /registrations/*`. */
  name: string;
}

export const DeleteProjectsLocationsRegistrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/registrations/{registrationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRegistrationsRequest>;

export type DeleteProjectsLocationsRegistrationsResponse = Operation;
export const DeleteProjectsLocationsRegistrationsResponse = Operation;

export type DeleteProjectsLocationsRegistrationsError = CommonErrors;

export const deleteProjectsLocationsRegistrations: API.OperationMethod<DeleteProjectsLocationsRegistrationsRequest, DeleteProjectsLocationsRegistrationsResponse, DeleteProjectsLocationsRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRegistrationsRequest,
  output: DeleteProjectsLocationsRegistrationsResponse,
  errors: [],
}));

