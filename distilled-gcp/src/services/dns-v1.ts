// ==========================================================================
// Cloud DNS API (dns v1)
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
  name: "dns",
  version: "v1",
  rootUrl: "https://dns.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface RRSetRoutingPolicyLoadBalancerTarget {
  /** The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer. */
  loadBalancerType?: "none" | "globalL7ilb" | "regionalL4ilb" | "regionalL7ilb" | (string & {});
  /** The frontend IP address of the load balancer to health check. */
  ipAddress?: string;
  /** The configured port of the load balancer. */
  port?: string;
  /** The protocol of the load balancer to health check. */
  ipProtocol?: "undefined" | "tcp" | "udp" | (string & {});
  /** The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`. */
  networkUrl?: string;
  /** The project ID in which the load balancer is located. */
  project?: string;
  /** The region in which the load balancer is located. */
  region?: string;
  kind?: string;
}

export const RRSetRoutingPolicyLoadBalancerTarget: Schema.Schema<RRSetRoutingPolicyLoadBalancerTarget> = Schema.suspend(() => Schema.Struct({
  loadBalancerType: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  port: Schema.optional(Schema.String),
  ipProtocol: Schema.optional(Schema.String),
  networkUrl: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyLoadBalancerTarget" }) as any as Schema.Schema<RRSetRoutingPolicyLoadBalancerTarget>;

export interface RRSetRoutingPolicyHealthCheckTargets {
  /** Configuration for internal load balancers to be health checked. */
  internalLoadBalancers?: Array<RRSetRoutingPolicyLoadBalancerTarget>;
  /** The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) */
  externalEndpoints?: Array<string>;
}

export const RRSetRoutingPolicyHealthCheckTargets: Schema.Schema<RRSetRoutingPolicyHealthCheckTargets> = Schema.suspend(() => Schema.Struct({
  internalLoadBalancers: Schema.optional(Schema.Array(RRSetRoutingPolicyLoadBalancerTarget)),
  externalEndpoints: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RRSetRoutingPolicyHealthCheckTargets" }) as any as Schema.Schema<RRSetRoutingPolicyHealthCheckTargets>;

export interface RRSetRoutingPolicyGeoPolicyGeoPolicyItem {
  /** The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc. */
  location?: string;
  rrdatas?: Array<string>;
  /** DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. */
  signatureRrdatas?: Array<string>;
  /** For A and AAAA types only. Endpoints to return in the query result only if they are healthy. These can be specified along with `rrdata` within this item. */
  healthCheckedTargets?: RRSetRoutingPolicyHealthCheckTargets;
  kind?: string;
}

export const RRSetRoutingPolicyGeoPolicyGeoPolicyItem: Schema.Schema<RRSetRoutingPolicyGeoPolicyGeoPolicyItem> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  rrdatas: Schema.optional(Schema.Array(Schema.String)),
  signatureRrdatas: Schema.optional(Schema.Array(Schema.String)),
  healthCheckedTargets: Schema.optional(RRSetRoutingPolicyHealthCheckTargets),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyGeoPolicyGeoPolicyItem" }) as any as Schema.Schema<RRSetRoutingPolicyGeoPolicyGeoPolicyItem>;

export interface RRSetRoutingPolicyGeoPolicy {
  /** The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead. */
  items?: Array<RRSetRoutingPolicyGeoPolicyGeoPolicyItem>;
  /** Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy. */
  enableFencing?: boolean;
  kind?: string;
}

export const RRSetRoutingPolicyGeoPolicy: Schema.Schema<RRSetRoutingPolicyGeoPolicy> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(RRSetRoutingPolicyGeoPolicyGeoPolicyItem)),
  enableFencing: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyGeoPolicy" }) as any as Schema.Schema<RRSetRoutingPolicyGeoPolicy>;

export interface RRSetRoutingPolicyWrrPolicyWrrPolicyItem {
  /** The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative. */
  weight?: number;
  rrdatas?: Array<string>;
  /** DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. */
  signatureRrdatas?: Array<string>;
  /** Endpoints that are health checked before making the routing decision. The unhealthy endpoints are omitted from the result. If all endpoints within a bucket are unhealthy, we choose a different bucket (sampled with respect to its weight) for responding. If DNSSEC is enabled for this zone, only one of `rrdata` or `health_checked_targets` can be set. */
  healthCheckedTargets?: RRSetRoutingPolicyHealthCheckTargets;
  kind?: string;
}

export const RRSetRoutingPolicyWrrPolicyWrrPolicyItem: Schema.Schema<RRSetRoutingPolicyWrrPolicyWrrPolicyItem> = Schema.suspend(() => Schema.Struct({
  weight: Schema.optional(Schema.Number),
  rrdatas: Schema.optional(Schema.Array(Schema.String)),
  signatureRrdatas: Schema.optional(Schema.Array(Schema.String)),
  healthCheckedTargets: Schema.optional(RRSetRoutingPolicyHealthCheckTargets),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyWrrPolicyWrrPolicyItem" }) as any as Schema.Schema<RRSetRoutingPolicyWrrPolicyWrrPolicyItem>;

export interface RRSetRoutingPolicyWrrPolicy {
  items?: Array<RRSetRoutingPolicyWrrPolicyWrrPolicyItem>;
  kind?: string;
}

export const RRSetRoutingPolicyWrrPolicy: Schema.Schema<RRSetRoutingPolicyWrrPolicy> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(RRSetRoutingPolicyWrrPolicyWrrPolicyItem)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyWrrPolicy" }) as any as Schema.Schema<RRSetRoutingPolicyWrrPolicy>;

export interface RRSetRoutingPolicyPrimaryBackupPolicy {
  /** Endpoints that are health checked before making the routing decision. Unhealthy endpoints are omitted from the results. If all endpoints are unhealthy, we serve a response based on the `backup_geo_targets`. */
  primaryTargets?: RRSetRoutingPolicyHealthCheckTargets;
  /** Backup targets provide a regional failover policy for the otherwise global primary targets. If serving state is set to `BACKUP`, this policy essentially becomes a geo routing policy. */
  backupGeoTargets?: RRSetRoutingPolicyGeoPolicy;
  /** When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets. */
  trickleTraffic?: number;
  kind?: string;
}

export const RRSetRoutingPolicyPrimaryBackupPolicy: Schema.Schema<RRSetRoutingPolicyPrimaryBackupPolicy> = Schema.suspend(() => Schema.Struct({
  primaryTargets: Schema.optional(RRSetRoutingPolicyHealthCheckTargets),
  backupGeoTargets: Schema.optional(RRSetRoutingPolicyGeoPolicy),
  trickleTraffic: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicyPrimaryBackupPolicy" }) as any as Schema.Schema<RRSetRoutingPolicyPrimaryBackupPolicy>;

export interface RRSetRoutingPolicy {
  geo?: RRSetRoutingPolicyGeoPolicy;
  wrr?: RRSetRoutingPolicyWrrPolicy;
  primaryBackup?: RRSetRoutingPolicyPrimaryBackupPolicy;
  /** The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks */
  healthCheck?: string;
  kind?: string;
}

export const RRSetRoutingPolicy: Schema.Schema<RRSetRoutingPolicy> = Schema.suspend(() => Schema.Struct({
  geo: Schema.optional(RRSetRoutingPolicyGeoPolicy),
  wrr: Schema.optional(RRSetRoutingPolicyWrrPolicy),
  primaryBackup: Schema.optional(RRSetRoutingPolicyPrimaryBackupPolicy),
  healthCheck: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RRSetRoutingPolicy" }) as any as Schema.Schema<RRSetRoutingPolicy>;

export interface ResourceRecordSet {
  /** For example, www.example.com. */
  name?: string;
  /** The identifier of a supported record type. See the list of Supported DNS record types. */
  type?: string;
  /** Number of seconds that this `ResourceRecordSet` can be cached by resolvers. */
  ttl?: number;
  /** As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. */
  rrdatas?: Array<string>;
  /** As defined in RFC 4034 (section 3.2). */
  signatureRrdatas?: Array<string>;
  /** Configures dynamic query responses based on either the geo location of the querying user or a weighted round robin based routing policy. A valid `ResourceRecordSet` contains only `rrdata` (for static resolution) or a `routing_policy` (for dynamic resolution). */
  routingPolicy?: RRSetRoutingPolicy;
  kind?: string;
}

export const ResourceRecordSet: Schema.Schema<ResourceRecordSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.Number),
  rrdatas: Schema.optional(Schema.Array(Schema.String)),
  signatureRrdatas: Schema.optional(Schema.Array(Schema.String)),
  routingPolicy: Schema.optional(RRSetRoutingPolicy),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceRecordSet" }) as any as Schema.Schema<ResourceRecordSet>;

export interface ResourceRecordSetsListResponse {
  /** The resource record set resources. */
  rrsets?: Array<ResourceRecordSet>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const ResourceRecordSetsListResponse: Schema.Schema<ResourceRecordSetsListResponse> = Schema.suspend(() => Schema.Struct({
  rrsets: Schema.optional(Schema.Array(ResourceRecordSet)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceRecordSetsListResponse" }) as any as Schema.Schema<ResourceRecordSetsListResponse>;

export interface ResourceRecordSetsDeleteResponse {
}

export const ResourceRecordSetsDeleteResponse: Schema.Schema<ResourceRecordSetsDeleteResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResourceRecordSetsDeleteResponse" }) as any as Schema.Schema<ResourceRecordSetsDeleteResponse>;

export interface Change {
  /** Which ResourceRecordSets to add? */
  additions?: Array<ResourceRecordSet>;
  /** Which ResourceRecordSets to remove? Must match existing data exactly. */
  deletions?: Array<ResourceRecordSet>;
  /** The time that this operation was started by the server (output only). This is in RFC3339 text format. */
  startTime?: string;
  /** Unique identifier for the resource; defined by the server (output only). */
  id?: string;
  /** Status of the operation (output only). A status of "done" means that the request to update the authoritative servers has been sent, but the servers might not be updated yet. */
  status?: "pending" | "done" | (string & {});
  /** If the DNS queries for the zone will be served. */
  isServing?: boolean;
  kind?: string;
}

export const Change: Schema.Schema<Change> = Schema.suspend(() => Schema.Struct({
  additions: Schema.optional(Schema.Array(ResourceRecordSet)),
  deletions: Schema.optional(Schema.Array(ResourceRecordSet)),
  startTime: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  isServing: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Change" }) as any as Schema.Schema<Change>;

export interface ChangesListResponse {
  /** The requested changes. */
  changes?: Array<Change>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const ChangesListResponse: Schema.Schema<ChangesListResponse> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(Change)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ChangesListResponse" }) as any as Schema.Schema<ChangesListResponse>;

export interface DnsKeyDigest {
  /** Specifies the algorithm used to calculate this digest. */
  type?: "sha1" | "sha256" | "sha384" | (string & {});
  /** The base-16 encoded bytes of this digest. Suitable for use in a DS resource record. */
  digest?: string;
}

export const DnsKeyDigest: Schema.Schema<DnsKeyDigest> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsKeyDigest" }) as any as Schema.Schema<DnsKeyDigest>;

export interface DnsKey {
  /** Unique identifier for the resource; defined by the server (output only). */
  id?: string;
  /** String mnemonic specifying the DNSSEC algorithm of this key. Immutable after creation time. */
  algorithm?: "rsasha1" | "rsasha256" | "rsasha512" | "ecdsap256sha256" | "ecdsap384sha384" | (string & {});
  /** Length of the key in bits. Specified at creation time, and then immutable. */
  keyLength?: number;
  /** Base64 encoded public half of this key. Output only. */
  publicKey?: string;
  /** The time that this resource was created in the control plane. This is in RFC3339 text format. Output only. */
  creationTime?: string;
  /** Active keys are used to sign subsequent changes to the ManagedZone. Inactive keys are still present as DNSKEY Resource Records for the use of resolvers validating existing signatures. */
  isActive?: boolean;
  /** One of "KEY_SIGNING" or "ZONE_SIGNING". Keys of type KEY_SIGNING have the Secure Entry Point flag set and, when active, are used to sign only resource record sets of type DNSKEY. Otherwise, the Secure Entry Point flag is cleared, and this key is used to sign only resource record sets of other types. Immutable after creation time. */
  type?: "keySigning" | "zoneSigning" | (string & {});
  /** The key tag is a non-cryptographic hash of the a DNSKEY resource record associated with this DnsKey. The key tag can be used to identify a DNSKEY more quickly (but it is not a unique identifier). In particular, the key tag is used in a parent zone's DS record to point at the DNSKEY in this child ManagedZone. The key tag is a number in the range [0, 65535] and the algorithm to calculate it is specified in RFC4034 Appendix B. Output only. */
  keyTag?: number;
  /** Cryptographic hashes of the DNSKEY resource record associated with this DnsKey. These digests are needed to construct a DS record that points at this DNS key. Output only. */
  digests?: Array<DnsKeyDigest>;
  /** A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the resource's function. */
  description?: string;
  kind?: string;
}

export const DnsKey: Schema.Schema<DnsKey> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  keyLength: Schema.optional(Schema.Number),
  publicKey: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  isActive: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  keyTag: Schema.optional(Schema.Number),
  digests: Schema.optional(Schema.Array(DnsKeyDigest)),
  description: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsKey" }) as any as Schema.Schema<DnsKey>;

export interface DnsKeysListResponse {
  /** The requested resources. */
  dnsKeys?: Array<DnsKey>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const DnsKeysListResponse: Schema.Schema<DnsKeysListResponse> = Schema.suspend(() => Schema.Struct({
  dnsKeys: Schema.optional(Schema.Array(DnsKey)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsKeysListResponse" }) as any as Schema.Schema<DnsKeysListResponse>;

export interface DnsKeySpec {
  /** Specifies whether this is a key signing key (KSK) or a zone signing key (ZSK). Key signing keys have the Secure Entry Point flag set and, when active, are only used to sign resource record sets of type DNSKEY. Zone signing keys do not have the Secure Entry Point flag set and are used to sign all other types of resource record sets. */
  keyType?: "keySigning" | "zoneSigning" | (string & {});
  /** String mnemonic specifying the DNSSEC algorithm of this key. */
  algorithm?: "rsasha1" | "rsasha256" | "rsasha512" | "ecdsap256sha256" | "ecdsap384sha384" | (string & {});
  /** Length of the keys in bits. */
  keyLength?: number;
  kind?: string;
}

export const DnsKeySpec: Schema.Schema<DnsKeySpec> = Schema.suspend(() => Schema.Struct({
  keyType: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  keyLength: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsKeySpec" }) as any as Schema.Schema<DnsKeySpec>;

export interface Quota {
  /** Maximum allowed number of managed zones in the project. */
  managedZones?: number;
  /** Maximum allowed number of ResourceRecordSets per zone in the project. */
  rrsetsPerManagedZone?: number;
  /** Maximum allowed number of ResourceRecordSets to add per ChangesCreateRequest. */
  rrsetAdditionsPerChange?: number;
  /** Maximum allowed number of ResourceRecordSets to delete per ChangesCreateRequest. */
  rrsetDeletionsPerChange?: number;
  /** Maximum allowed size for total rrdata in one ChangesCreateRequest in bytes. */
  totalRrdataSizePerChange?: number;
  /** Maximum allowed number of ResourceRecords per ResourceRecordSet. */
  resourceRecordsPerRrset?: number;
  /** Maximum allowed number of DnsKeys per ManagedZone. */
  dnsKeysPerManagedZone?: number;
  /** DNSSEC algorithm and key length types that can be used for DnsKeys. */
  whitelistedKeySpecs?: Array<DnsKeySpec>;
  /** Maximum allowed number of networks to which a privately scoped zone can be attached. */
  networksPerManagedZone?: number;
  /** Maximum allowed number of managed zones which can be attached to a network. */
  managedZonesPerNetwork?: number;
  /** Maximum allowed number of policies per project. */
  policies?: number;
  /** Maximum allowed number of networks per policy. */
  networksPerPolicy?: number;
  /** Maximum allowed number of alternative target name servers per policy. */
  targetNameServersPerPolicy?: number;
  /** Maximum allowed number of target name servers per managed forwarding zone. */
  targetNameServersPerManagedZone?: number;
  /** Maximum allowed number of consumer peering zones per target network owned by this producer project */
  peeringZonesPerTargetNetwork?: number;
  /** Maximum allowed number of response policies per project. */
  responsePolicies?: number;
  /** Maximum allowed number of networks per response policy. */
  networksPerResponsePolicy?: number;
  /** Maximum number of nameservers per delegation, meant to prevent abuse */
  nameserversPerDelegation?: number;
  /** Maximum allowed number of GKE clusters to which a privately scoped zone can be attached. */
  gkeClustersPerManagedZone?: number;
  /** Maximum allowed number of managed zones which can be attached to a GKE cluster. */
  managedZonesPerGkeCluster?: number;
  /** Maximum allowed number of GKE clusters per policy. */
  gkeClustersPerPolicy?: number;
  /** Maximum allowed number of rules per response policy. */
  responsePolicyRulesPerResponsePolicy?: number;
  /** Maximum allowed number of GKE clusters per response policy. */
  gkeClustersPerResponsePolicy?: number;
  /** Maximum allowed number of items per routing policy. */
  itemsPerRoutingPolicy?: number;
  internetHealthChecksPerManagedZone?: number;
  kind?: string;
}

export const Quota: Schema.Schema<Quota> = Schema.suspend(() => Schema.Struct({
  managedZones: Schema.optional(Schema.Number),
  rrsetsPerManagedZone: Schema.optional(Schema.Number),
  rrsetAdditionsPerChange: Schema.optional(Schema.Number),
  rrsetDeletionsPerChange: Schema.optional(Schema.Number),
  totalRrdataSizePerChange: Schema.optional(Schema.Number),
  resourceRecordsPerRrset: Schema.optional(Schema.Number),
  dnsKeysPerManagedZone: Schema.optional(Schema.Number),
  whitelistedKeySpecs: Schema.optional(Schema.Array(DnsKeySpec)),
  networksPerManagedZone: Schema.optional(Schema.Number),
  managedZonesPerNetwork: Schema.optional(Schema.Number),
  policies: Schema.optional(Schema.Number),
  networksPerPolicy: Schema.optional(Schema.Number),
  targetNameServersPerPolicy: Schema.optional(Schema.Number),
  targetNameServersPerManagedZone: Schema.optional(Schema.Number),
  peeringZonesPerTargetNetwork: Schema.optional(Schema.Number),
  responsePolicies: Schema.optional(Schema.Number),
  networksPerResponsePolicy: Schema.optional(Schema.Number),
  nameserversPerDelegation: Schema.optional(Schema.Number),
  gkeClustersPerManagedZone: Schema.optional(Schema.Number),
  managedZonesPerGkeCluster: Schema.optional(Schema.Number),
  gkeClustersPerPolicy: Schema.optional(Schema.Number),
  responsePolicyRulesPerResponsePolicy: Schema.optional(Schema.Number),
  gkeClustersPerResponsePolicy: Schema.optional(Schema.Number),
  itemsPerRoutingPolicy: Schema.optional(Schema.Number),
  internetHealthChecksPerManagedZone: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Quota" }) as any as Schema.Schema<Quota>;

export interface Project {
  /** Unique numeric identifier for the resource; defined by the server (output only). */
  number?: string;
  /** User assigned unique identifier for the resource (output only). */
  id?: string;
  /** Quotas assigned to this project (output only). */
  quota?: Quota;
  kind?: string;
}

export const Project: Schema.Schema<Project> = Schema.suspend(() => Schema.Struct({
  number: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  quota: Schema.optional(Quota),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Project" }) as any as Schema.Schema<Project>;

export interface ManagedZoneDnsSecConfig {
  /** Specifies whether DNSSEC is enabled, and what mode it is in. */
  state?: "off" | "on" | "transfer" | (string & {});
  /** Specifies parameters for generating initial DnsKeys for this ManagedZone. Can only be changed while the state is OFF. */
  defaultKeySpecs?: Array<DnsKeySpec>;
  /** Specifies the mechanism for authenticated denial-of-existence responses. Can only be changed while the state is OFF. */
  nonExistence?: "nsec" | "nsec3" | (string & {});
  kind?: string;
}

export const ManagedZoneDnsSecConfig: Schema.Schema<ManagedZoneDnsSecConfig> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  defaultKeySpecs: Schema.optional(Schema.Array(DnsKeySpec)),
  nonExistence: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneDnsSecConfig" }) as any as Schema.Schema<ManagedZoneDnsSecConfig>;

export interface ManagedZonePrivateVisibilityConfigNetwork {
  /** The fully qualified URL of the VPC network to bind to. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` */
  networkUrl?: string;
  kind?: string;
}

export const ManagedZonePrivateVisibilityConfigNetwork: Schema.Schema<ManagedZonePrivateVisibilityConfigNetwork> = Schema.suspend(() => Schema.Struct({
  networkUrl: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonePrivateVisibilityConfigNetwork" }) as any as Schema.Schema<ManagedZonePrivateVisibilityConfigNetwork>;

export interface ManagedZonePrivateVisibilityConfigGKECluster {
  /** The resource name of the cluster to bind this ManagedZone to. This should be specified in the format like: projects/* /locations/* /clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get */
  gkeClusterName?: string;
  kind?: string;
}

export const ManagedZonePrivateVisibilityConfigGKECluster: Schema.Schema<ManagedZonePrivateVisibilityConfigGKECluster> = Schema.suspend(() => Schema.Struct({
  gkeClusterName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonePrivateVisibilityConfigGKECluster" }) as any as Schema.Schema<ManagedZonePrivateVisibilityConfigGKECluster>;

export interface ManagedZonePrivateVisibilityConfig {
  /** The list of VPC networks that can see this zone. */
  networks?: Array<ManagedZonePrivateVisibilityConfigNetwork>;
  /** The list of Google Kubernetes Engine clusters that can see this zone. */
  gkeClusters?: Array<ManagedZonePrivateVisibilityConfigGKECluster>;
  kind?: string;
}

export const ManagedZonePrivateVisibilityConfig: Schema.Schema<ManagedZonePrivateVisibilityConfig> = Schema.suspend(() => Schema.Struct({
  networks: Schema.optional(Schema.Array(ManagedZonePrivateVisibilityConfigNetwork)),
  gkeClusters: Schema.optional(Schema.Array(ManagedZonePrivateVisibilityConfigGKECluster)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonePrivateVisibilityConfig" }) as any as Schema.Schema<ManagedZonePrivateVisibilityConfig>;

export interface ManagedZoneForwardingConfigNameServerTarget {
  /** IPv4 address of a target name server. */
  ipv4Address?: string;
  /** Forwarding path for this NameServerTarget. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on IP address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target. */
  forwardingPath?: "default" | "private" | (string & {});
  /** IPv6 address of a target name server. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022. */
  ipv6Address?: string;
  /** Fully qualified domain name for the forwarding target. */
  domainName?: string;
  kind?: string;
}

export const ManagedZoneForwardingConfigNameServerTarget: Schema.Schema<ManagedZoneForwardingConfigNameServerTarget> = Schema.suspend(() => Schema.Struct({
  ipv4Address: Schema.optional(Schema.String),
  forwardingPath: Schema.optional(Schema.String),
  ipv6Address: Schema.optional(Schema.String),
  domainName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneForwardingConfigNameServerTarget" }) as any as Schema.Schema<ManagedZoneForwardingConfigNameServerTarget>;

export interface ManagedZoneForwardingConfig {
  /** List of target name servers to forward to. Cloud DNS selects the best available name server if more than one target is given. */
  targetNameServers?: Array<ManagedZoneForwardingConfigNameServerTarget>;
  kind?: string;
}

export const ManagedZoneForwardingConfig: Schema.Schema<ManagedZoneForwardingConfig> = Schema.suspend(() => Schema.Struct({
  targetNameServers: Schema.optional(Schema.Array(ManagedZoneForwardingConfigNameServerTarget)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneForwardingConfig" }) as any as Schema.Schema<ManagedZoneForwardingConfig>;

export interface ManagedZonePeeringConfigTargetNetwork {
  /** The fully qualified URL of the VPC network to forward queries to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` */
  networkUrl?: string;
  /** The time at which the zone was deactivated, in RFC 3339 date-time format. An empty string indicates that the peering connection is active. The producer network can deactivate a zone. The zone is automatically deactivated if the producer network that the zone targeted is deleted. Output only. */
  deactivateTime?: string;
  kind?: string;
}

export const ManagedZonePeeringConfigTargetNetwork: Schema.Schema<ManagedZonePeeringConfigTargetNetwork> = Schema.suspend(() => Schema.Struct({
  networkUrl: Schema.optional(Schema.String),
  deactivateTime: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonePeeringConfigTargetNetwork" }) as any as Schema.Schema<ManagedZonePeeringConfigTargetNetwork>;

export interface ManagedZonePeeringConfig {
  /** The network with which to peer. */
  targetNetwork?: ManagedZonePeeringConfigTargetNetwork;
  kind?: string;
}

export const ManagedZonePeeringConfig: Schema.Schema<ManagedZonePeeringConfig> = Schema.suspend(() => Schema.Struct({
  targetNetwork: Schema.optional(ManagedZonePeeringConfigTargetNetwork),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonePeeringConfig" }) as any as Schema.Schema<ManagedZonePeeringConfig>;

export interface ManagedZoneReverseLookupConfig {
  kind?: string;
}

export const ManagedZoneReverseLookupConfig: Schema.Schema<ManagedZoneReverseLookupConfig> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneReverseLookupConfig" }) as any as Schema.Schema<ManagedZoneReverseLookupConfig>;

export interface ManagedZoneServiceDirectoryConfigNamespace {
  /** The fully qualified URL of the namespace associated with the zone. Format must be `https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}` */
  namespaceUrl?: string;
  /** The time that the namespace backing this zone was deleted; an empty string if it still exists. This is in RFC3339 text format. Output only. */
  deletionTime?: string;
  kind?: string;
}

export const ManagedZoneServiceDirectoryConfigNamespace: Schema.Schema<ManagedZoneServiceDirectoryConfigNamespace> = Schema.suspend(() => Schema.Struct({
  namespaceUrl: Schema.optional(Schema.String),
  deletionTime: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneServiceDirectoryConfigNamespace" }) as any as Schema.Schema<ManagedZoneServiceDirectoryConfigNamespace>;

export interface ManagedZoneServiceDirectoryConfig {
  /** Contains information about the namespace associated with the zone. */
  namespace?: ManagedZoneServiceDirectoryConfigNamespace;
  kind?: string;
}

export const ManagedZoneServiceDirectoryConfig: Schema.Schema<ManagedZoneServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(ManagedZoneServiceDirectoryConfigNamespace),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneServiceDirectoryConfig" }) as any as Schema.Schema<ManagedZoneServiceDirectoryConfig>;

export interface ManagedZoneCloudLoggingConfig {
  /** If set, enable query logging for this ManagedZone. False by default, making logging opt-in. */
  enableLogging?: boolean;
  kind?: string;
}

export const ManagedZoneCloudLoggingConfig: Schema.Schema<ManagedZoneCloudLoggingConfig> = Schema.suspend(() => Schema.Struct({
  enableLogging: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneCloudLoggingConfig" }) as any as Schema.Schema<ManagedZoneCloudLoggingConfig>;

export interface ManagedZone {
  /** User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes. */
  name?: string;
  /** The DNS name of this managed zone, for instance "example.com.". */
  dnsName?: string;
  /** A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the managed zone's function. */
  description?: string;
  /** Unique identifier for the resource; defined by the server (output only) */
  id?: string;
  /** Delegate your managed_zone to these virtual name servers; defined by the server (output only) */
  nameServers?: Array<string>;
  /** The time that this resource was created on the server. This is in RFC3339 text format. Output only. */
  creationTime?: string;
  /** DNSSEC configuration. */
  dnssecConfig?: ManagedZoneDnsSecConfig;
  /** Optionally specifies the NameServerSet for this ManagedZone. A NameServerSet is a set of DNS name servers that all host the same ManagedZones. Most users leave this field unset. If you need to use this field, contact your account team. */
  nameServerSet?: string;
  /** The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources. */
  visibility?: "public" | "private" | (string & {});
  /** For privately visible zones, the set of Virtual Private Cloud resources that the zone is visible from. */
  privateVisibilityConfig?: ManagedZonePrivateVisibilityConfig;
  /** The presence for this field indicates that outbound forwarding is enabled for this zone. The value of this field contains the set of destinations to forward to. */
  forwardingConfig?: ManagedZoneForwardingConfig;
  /** User labels. */
  labels?: Record<string, string>;
  /** The presence of this field indicates that DNS Peering is enabled for this zone. The value of this field contains the network to peer with. */
  peeringConfig?: ManagedZonePeeringConfig;
  /** The presence of this field indicates that this is a managed reverse lookup zone and Cloud DNS resolves reverse lookup queries using automatically configured records for VPC resources. This only applies to networks listed under private_visibility_config. */
  reverseLookupConfig?: ManagedZoneReverseLookupConfig;
  /** This field links to the associated service directory namespace. Do not set this field for public zones or forwarding zones. */
  serviceDirectoryConfig?: ManagedZoneServiceDirectoryConfig;
  cloudLoggingConfig?: ManagedZoneCloudLoggingConfig;
  kind?: string;
}

export const ManagedZone: Schema.Schema<ManagedZone> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dnsName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  nameServers: Schema.optional(Schema.Array(Schema.String)),
  creationTime: Schema.optional(Schema.String),
  dnssecConfig: Schema.optional(ManagedZoneDnsSecConfig),
  nameServerSet: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  privateVisibilityConfig: Schema.optional(ManagedZonePrivateVisibilityConfig),
  forwardingConfig: Schema.optional(ManagedZoneForwardingConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  peeringConfig: Schema.optional(ManagedZonePeeringConfig),
  reverseLookupConfig: Schema.optional(ManagedZoneReverseLookupConfig),
  serviceDirectoryConfig: Schema.optional(ManagedZoneServiceDirectoryConfig),
  cloudLoggingConfig: Schema.optional(ManagedZoneCloudLoggingConfig),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZone" }) as any as Schema.Schema<ManagedZone>;

export interface OperationManagedZoneContext {
  /** The pre-operation ManagedZone resource. */
  oldValue?: ManagedZone;
  /** The post-operation ManagedZone resource. */
  newValue?: ManagedZone;
}

export const OperationManagedZoneContext: Schema.Schema<OperationManagedZoneContext> = Schema.suspend(() => Schema.Struct({
  oldValue: Schema.optional(ManagedZone),
  newValue: Schema.optional(ManagedZone),
})).annotate({ identifier: "OperationManagedZoneContext" }) as any as Schema.Schema<OperationManagedZoneContext>;

export interface OperationDnsKeyContext {
  /** The pre-operation DnsKey resource. */
  oldValue?: DnsKey;
  /** The post-operation DnsKey resource. */
  newValue?: DnsKey;
}

export const OperationDnsKeyContext: Schema.Schema<OperationDnsKeyContext> = Schema.suspend(() => Schema.Struct({
  oldValue: Schema.optional(DnsKey),
  newValue: Schema.optional(DnsKey),
})).annotate({ identifier: "OperationDnsKeyContext" }) as any as Schema.Schema<OperationDnsKeyContext>;

export interface Operation {
  /** Unique identifier for the resource. This is the client_operation_id if the client specified it when the mutation was initiated, otherwise, it is generated by the server. The name must be 1-63 characters long and match the regular expression [-a-z0-9]? (output only) */
  id?: string;
  /** The time that this operation was started by the server. This is in RFC3339 text format (output only). */
  startTime?: string;
  /** Status of the operation. Can be one of the following: "PENDING" or "DONE" (output only). A status of "DONE" means that the request to update the authoritative servers has been sent, but the servers might not be updated yet. */
  status?: "pending" | "done" | (string & {});
  /** User who requested the operation, for example: user@example.com. cloud-dns-system for operations automatically done by the system. (output only) */
  user?: string;
  /** Type of the operation. Operations include insert, update, and delete (output only). */
  type?: string;
  /** Only populated if the operation targeted a ManagedZone (output only). */
  zoneContext?: OperationManagedZoneContext;
  /** Only populated if the operation targeted a DnsKey (output only). */
  dnsKeyContext?: OperationDnsKeyContext;
  kind?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  zoneContext: Schema.optional(OperationManagedZoneContext),
  dnsKeyContext: Schema.optional(OperationDnsKeyContext),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ManagedZoneOperationsListResponse {
  /** The operation resources. */
  operations?: Array<Operation>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const ManagedZoneOperationsListResponse: Schema.Schema<ManagedZoneOperationsListResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZoneOperationsListResponse" }) as any as Schema.Schema<ManagedZoneOperationsListResponse>;

export interface ManagedZonesListResponse {
  /** The managed zone resources. */
  managedZones?: Array<ManagedZone>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const ManagedZonesListResponse: Schema.Schema<ManagedZonesListResponse> = Schema.suspend(() => Schema.Struct({
  managedZones: Schema.optional(Schema.Array(ManagedZone)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedZonesListResponse" }) as any as Schema.Schema<ManagedZonesListResponse>;

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

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "GoogleIamV1Binding" }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleIamV1SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const GoogleIamV1SetIamPolicyRequest: Schema.Schema<GoogleIamV1SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1SetIamPolicyRequest" }) as any as Schema.Schema<GoogleIamV1SetIamPolicyRequest>;

export interface GoogleIamV1GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GoogleIamV1GetPolicyOptions: Schema.Schema<GoogleIamV1GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleIamV1GetPolicyOptions" }) as any as Schema.Schema<GoogleIamV1GetPolicyOptions>;

export interface GoogleIamV1GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GoogleIamV1GetPolicyOptions;
}

export const GoogleIamV1GetIamPolicyRequest: Schema.Schema<GoogleIamV1GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GoogleIamV1GetPolicyOptions),
})).annotate({ identifier: "GoogleIamV1GetIamPolicyRequest" }) as any as Schema.Schema<GoogleIamV1GetIamPolicyRequest>;

export interface GoogleIamV1TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsRequest: Schema.Schema<GoogleIamV1TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsRequest" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsRequest>;

export interface GoogleIamV1TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsResponse: Schema.Schema<GoogleIamV1TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsResponse" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsResponse>;

export interface PolicyNetwork {
  /** The fully qualified URL of the VPC network to bind to. This should be formatted like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} */
  networkUrl?: string;
  kind?: string;
}

export const PolicyNetwork: Schema.Schema<PolicyNetwork> = Schema.suspend(() => Schema.Struct({
  networkUrl: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyNetwork" }) as any as Schema.Schema<PolicyNetwork>;

export interface PolicyAlternativeNameServerConfigTargetNameServer {
  /** IPv4 address to forward queries to. */
  ipv4Address?: string;
  /** Forwarding path for this TargetNameServer. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target. */
  forwardingPath?: "default" | "private" | (string & {});
  /** IPv6 address to forward to. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022. */
  ipv6Address?: string;
  kind?: string;
}

export const PolicyAlternativeNameServerConfigTargetNameServer: Schema.Schema<PolicyAlternativeNameServerConfigTargetNameServer> = Schema.suspend(() => Schema.Struct({
  ipv4Address: Schema.optional(Schema.String),
  forwardingPath: Schema.optional(Schema.String),
  ipv6Address: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyAlternativeNameServerConfigTargetNameServer" }) as any as Schema.Schema<PolicyAlternativeNameServerConfigTargetNameServer>;

export interface PolicyAlternativeNameServerConfig {
  /** Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as .internal are not available when an alternative name server is specified. */
  targetNameServers?: Array<PolicyAlternativeNameServerConfigTargetNameServer>;
  kind?: string;
}

export const PolicyAlternativeNameServerConfig: Schema.Schema<PolicyAlternativeNameServerConfig> = Schema.suspend(() => Schema.Struct({
  targetNameServers: Schema.optional(Schema.Array(PolicyAlternativeNameServerConfigTargetNameServer)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyAlternativeNameServerConfig" }) as any as Schema.Schema<PolicyAlternativeNameServerConfig>;

export interface PolicyDns64ConfigScope {
  /** Controls whether DNS64 is enabled globally for all networks bound to the policy. */
  allQueries?: boolean;
  kind?: string;
}

export const PolicyDns64ConfigScope: Schema.Schema<PolicyDns64ConfigScope> = Schema.suspend(() => Schema.Struct({
  allQueries: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyDns64ConfigScope" }) as any as Schema.Schema<PolicyDns64ConfigScope>;

export interface PolicyDns64Config {
  /** The scope to which DNS64 config will be applied to. */
  scope?: PolicyDns64ConfigScope;
  kind?: string;
}

export const PolicyDns64Config: Schema.Schema<PolicyDns64Config> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(PolicyDns64ConfigScope),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyDns64Config" }) as any as Schema.Schema<PolicyDns64Config>;

export interface Policy {
  /** Unique identifier for the resource; defined by the server (output only). */
  id?: string;
  /** User-assigned name for this policy. */
  name?: string;
  /** Allows networks bound to this policy to receive DNS queries sent by VMs or applications over VPN connections. When enabled, a virtual IP address is allocated from each of the subnetworks that are bound to this policy. */
  enableInboundForwarding?: boolean;
  /** A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the policy's function. */
  description?: string;
  /** List of network names specifying networks to which this policy is applied. */
  networks?: Array<PolicyNetwork>;
  /** Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as .internal are not available when an alternative name server is specified. */
  alternativeNameServerConfig?: PolicyAlternativeNameServerConfig;
  /** Controls whether logging is enabled for the networks bound to this policy. Defaults to no logging if not set. */
  enableLogging?: boolean;
  /** Configurations related to DNS64 for this policy. */
  dns64Config?: PolicyDns64Config;
  kind?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  enableInboundForwarding: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  networks: Schema.optional(Schema.Array(PolicyNetwork)),
  alternativeNameServerConfig: Schema.optional(PolicyAlternativeNameServerConfig),
  enableLogging: Schema.optional(Schema.Boolean),
  dns64Config: Schema.optional(PolicyDns64Config),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface PoliciesListResponse {
  /** The policy resources. */
  policies?: Array<Policy>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
  /** Type of resource. */
  kind?: string;
}

export const PoliciesListResponse: Schema.Schema<PoliciesListResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(Policy)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PoliciesListResponse" }) as any as Schema.Schema<PoliciesListResponse>;

export interface PoliciesPatchResponse {
  policy?: Policy;
}

export const PoliciesPatchResponse: Schema.Schema<PoliciesPatchResponse> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "PoliciesPatchResponse" }) as any as Schema.Schema<PoliciesPatchResponse>;

export interface PoliciesUpdateResponse {
  policy?: Policy;
}

export const PoliciesUpdateResponse: Schema.Schema<PoliciesUpdateResponse> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "PoliciesUpdateResponse" }) as any as Schema.Schema<PoliciesUpdateResponse>;

export interface ResponsePolicyNetwork {
  /** The fully qualified URL of the VPC network to bind to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` */
  networkUrl?: string;
  kind?: string;
}

export const ResponsePolicyNetwork: Schema.Schema<ResponsePolicyNetwork> = Schema.suspend(() => Schema.Struct({
  networkUrl: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePolicyNetwork" }) as any as Schema.Schema<ResponsePolicyNetwork>;

export interface ResponsePolicyGKECluster {
  /** The resource name of the cluster to bind this response policy to. This should be specified in the format like: projects/* /locations/* /clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get */
  gkeClusterName?: string;
  kind?: string;
}

export const ResponsePolicyGKECluster: Schema.Schema<ResponsePolicyGKECluster> = Schema.suspend(() => Schema.Struct({
  gkeClusterName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePolicyGKECluster" }) as any as Schema.Schema<ResponsePolicyGKECluster>;

export interface ResponsePolicy {
  /** Unique identifier for the resource; defined by the server (output only). */
  id?: string;
  /** User assigned name for this Response Policy. */
  responsePolicyName?: string;
  /** User-provided description for this Response Policy. */
  description?: string;
  /** List of network names specifying networks to which this policy is applied. */
  networks?: Array<ResponsePolicyNetwork>;
  /** The list of Google Kubernetes Engine clusters to which this response policy is applied. */
  gkeClusters?: Array<ResponsePolicyGKECluster>;
  /** User labels. */
  labels?: Record<string, string>;
  kind?: string;
}

export const ResponsePolicy: Schema.Schema<ResponsePolicy> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  responsePolicyName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  networks: Schema.optional(Schema.Array(ResponsePolicyNetwork)),
  gkeClusters: Schema.optional(Schema.Array(ResponsePolicyGKECluster)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePolicy" }) as any as Schema.Schema<ResponsePolicy>;

export interface ResponsePoliciesListResponse {
  /** The Response Policy resources. */
  responsePolicies?: Array<ResponsePolicy>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
}

export const ResponsePoliciesListResponse: Schema.Schema<ResponsePoliciesListResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicies: Schema.optional(Schema.Array(ResponsePolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePoliciesListResponse" }) as any as Schema.Schema<ResponsePoliciesListResponse>;

export interface ResponsePoliciesPatchResponse {
  responsePolicy?: ResponsePolicy;
}

export const ResponsePoliciesPatchResponse: Schema.Schema<ResponsePoliciesPatchResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicy: Schema.optional(ResponsePolicy),
})).annotate({ identifier: "ResponsePoliciesPatchResponse" }) as any as Schema.Schema<ResponsePoliciesPatchResponse>;

export interface ResponsePoliciesUpdateResponse {
  responsePolicy?: ResponsePolicy;
}

export const ResponsePoliciesUpdateResponse: Schema.Schema<ResponsePoliciesUpdateResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicy: Schema.optional(ResponsePolicy),
})).annotate({ identifier: "ResponsePoliciesUpdateResponse" }) as any as Schema.Schema<ResponsePoliciesUpdateResponse>;

export interface ResponsePolicyRuleLocalData {
  /** All resource record sets for this selector, one per resource record type. The name must match the dns_name. */
  localDatas?: Array<ResourceRecordSet>;
}

export const ResponsePolicyRuleLocalData: Schema.Schema<ResponsePolicyRuleLocalData> = Schema.suspend(() => Schema.Struct({
  localDatas: Schema.optional(Schema.Array(ResourceRecordSet)),
})).annotate({ identifier: "ResponsePolicyRuleLocalData" }) as any as Schema.Schema<ResponsePolicyRuleLocalData>;

export interface ResponsePolicyRule {
  /** An identifier for this rule. Must be unique with the ResponsePolicy. */
  ruleName?: string;
  /** The DNS name (wildcard or exact) to apply this rule to. Must be unique within the Response Policy Rule. */
  dnsName?: string;
  /** Answer this query directly with DNS data. These ResourceRecordSets override any other DNS behavior for the matched name; in particular they override private zones, the public internet, and GCP internal DNS. No SOA nor NS types are allowed. */
  localData?: ResponsePolicyRuleLocalData;
  /** Answer this query with a behavior rather than DNS data. */
  behavior?: "behaviorUnspecified" | "bypassResponsePolicy" | (string & {});
  kind?: string;
}

export const ResponsePolicyRule: Schema.Schema<ResponsePolicyRule> = Schema.suspend(() => Schema.Struct({
  ruleName: Schema.optional(Schema.String),
  dnsName: Schema.optional(Schema.String),
  localData: Schema.optional(ResponsePolicyRuleLocalData),
  behavior: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePolicyRule" }) as any as Schema.Schema<ResponsePolicyRule>;

export interface ResponsePolicyRulesListResponse {
  /** The Response Policy Rule resources. */
  responsePolicyRules?: Array<ResponsePolicyRule>;
  /** This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. */
  nextPageToken?: string;
}

export const ResponsePolicyRulesListResponse: Schema.Schema<ResponsePolicyRulesListResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicyRules: Schema.optional(Schema.Array(ResponsePolicyRule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponsePolicyRulesListResponse" }) as any as Schema.Schema<ResponsePolicyRulesListResponse>;

export interface ResponsePolicyRulesPatchResponse {
  responsePolicyRule?: ResponsePolicyRule;
}

export const ResponsePolicyRulesPatchResponse: Schema.Schema<ResponsePolicyRulesPatchResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicyRule: Schema.optional(ResponsePolicyRule),
})).annotate({ identifier: "ResponsePolicyRulesPatchResponse" }) as any as Schema.Schema<ResponsePolicyRulesPatchResponse>;

export interface ResponsePolicyRulesUpdateResponse {
  responsePolicyRule?: ResponsePolicyRule;
}

export const ResponsePolicyRulesUpdateResponse: Schema.Schema<ResponsePolicyRulesUpdateResponse> = Schema.suspend(() => Schema.Struct({
  responsePolicyRule: Schema.optional(ResponsePolicyRule),
})).annotate({ identifier: "ResponsePolicyRulesUpdateResponse" }) as any as Schema.Schema<ResponsePolicyRulesUpdateResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Enumerates ResourceRecordSets that you have created but not yet deleted. */
export interface ListResourceRecordSetsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
  /** Specify a fully qualified domain name to view only those records. The name parameter is not supported and must be omitted when you use filter. */
  name?: string;
  /** Specify a record type to view only those records. You must also specify the name parameter. The type parameter is not supported and must be omitted when you use filter. */
  type?: string;
  /** Specify a filter expression to view records that exactly match the specified domain. Both the name and type parameters are not supported when you use filter and must be omitted. Your filter expression must conform to AIP-160 and you must specify a domain in the name field. Optionally, you can include the type field to filter records by type. You can also include the has_suffix function to view records that match by domain suffix. Examples: - name="example.com." - name="example.com." AND type="A" - name=has_suffix("example.com.") - name=has_suffix("example.com.") AND type="A" */
  filter?: string;
}

export const ListResourceRecordSetsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/rrsets" }),
  svc,
) as unknown as Schema.Schema<ListResourceRecordSetsRequest>;

export type ListResourceRecordSetsResponse = ResourceRecordSetsListResponse;
export const ListResourceRecordSetsResponse = ResourceRecordSetsListResponse;

export type ListResourceRecordSetsError = CommonErrors;

export const listResourceRecordSets = API.makePaginated(() => ({
  input: ListResourceRecordSetsRequest,
  output: ListResourceRecordSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new ResourceRecordSet. */
export interface CreateResourceRecordSetsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResourceRecordSet;
}

export const CreateResourceRecordSetsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResourceRecordSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/managedZones/{managedZone}/rrsets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateResourceRecordSetsRequest>;

export type CreateResourceRecordSetsResponse = ResourceRecordSet;
export const CreateResourceRecordSetsResponse = ResourceRecordSet;

export type CreateResourceRecordSetsError = CommonErrors;

export const createResourceRecordSets: API.OperationMethod<CreateResourceRecordSetsRequest, CreateResourceRecordSetsResponse, CreateResourceRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateResourceRecordSetsRequest,
  output: CreateResourceRecordSetsResponse,
  errors: [],
}));

/** Fetches the representation of an existing ResourceRecordSet. */
export interface GetResourceRecordSetsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Fully qualified domain name. */
  name: string;
  /** RRSet type. */
  type: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetResourceRecordSetsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  type: Schema.String.pipe(T.HttpPath("type")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}" }),
  svc,
) as unknown as Schema.Schema<GetResourceRecordSetsRequest>;

export type GetResourceRecordSetsResponse = ResourceRecordSet;
export const GetResourceRecordSetsResponse = ResourceRecordSet;

export type GetResourceRecordSetsError = CommonErrors;

export const getResourceRecordSets: API.OperationMethod<GetResourceRecordSetsRequest, GetResourceRecordSetsResponse, GetResourceRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetResourceRecordSetsRequest,
  output: GetResourceRecordSetsResponse,
  errors: [],
}));

/** Deletes a previously created ResourceRecordSet. */
export interface DeleteResourceRecordSetsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Fully qualified domain name. */
  name: string;
  /** RRSet type. */
  type: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const DeleteResourceRecordSetsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  type: Schema.String.pipe(T.HttpPath("type")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}" }),
  svc,
) as unknown as Schema.Schema<DeleteResourceRecordSetsRequest>;

export type DeleteResourceRecordSetsResponse = ResourceRecordSetsDeleteResponse;
export const DeleteResourceRecordSetsResponse = ResourceRecordSetsDeleteResponse;

export type DeleteResourceRecordSetsError = CommonErrors;

export const deleteResourceRecordSets: API.OperationMethod<DeleteResourceRecordSetsRequest, DeleteResourceRecordSetsResponse, DeleteResourceRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResourceRecordSetsRequest,
  output: DeleteResourceRecordSetsResponse,
  errors: [],
}));

/** Applies a partial update to an existing ResourceRecordSet. */
export interface PatchResourceRecordSetsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Fully qualified domain name. */
  name: string;
  /** RRSet type. */
  type: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResourceRecordSet;
}

export const PatchResourceRecordSetsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  type: Schema.String.pipe(T.HttpPath("type")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResourceRecordSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResourceRecordSetsRequest>;

export type PatchResourceRecordSetsResponse = ResourceRecordSet;
export const PatchResourceRecordSetsResponse = ResourceRecordSet;

export type PatchResourceRecordSetsError = CommonErrors;

export const patchResourceRecordSets: API.OperationMethod<PatchResourceRecordSetsRequest, PatchResourceRecordSetsResponse, PatchResourceRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResourceRecordSetsRequest,
  output: PatchResourceRecordSetsResponse,
  errors: [],
}));

/** Atomically updates the ResourceRecordSet collection. */
export interface CreateChangesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: Change;
}

export const CreateChangesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(Change).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/managedZones/{managedZone}/changes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateChangesRequest>;

export type CreateChangesResponse = Change;
export const CreateChangesResponse = Change;

export type CreateChangesError = CommonErrors;

export const createChanges: API.OperationMethod<CreateChangesRequest, CreateChangesResponse, CreateChangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateChangesRequest,
  output: CreateChangesResponse,
  errors: [],
}));

/** Fetches the representation of an existing Change. */
export interface GetChangesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** The identifier of the requested change, from a previous ResourceRecordSetsChangeResponse. */
  changeId: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetChangesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  changeId: Schema.String.pipe(T.HttpPath("changeId")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}" }),
  svc,
) as unknown as Schema.Schema<GetChangesRequest>;

export type GetChangesResponse = Change;
export const GetChangesResponse = Change;

export type GetChangesError = CommonErrors;

export const getChanges: API.OperationMethod<GetChangesRequest, GetChangesResponse, GetChangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetChangesRequest,
  output: GetChangesResponse,
  errors: [],
}));

/** Enumerates Changes to a ResourceRecordSet collection. */
export interface ListChangesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
  /** Sorting criterion. The only supported value is change sequence. */
  sortBy?: "changeSequence" | (string & {});
  /** Sorting order direction: 'ascending' or 'descending'. */
  sortOrder?: string;
}

export const ListChangesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortBy: Schema.optional(Schema.String).pipe(T.HttpQuery("sortBy")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/changes" }),
  svc,
) as unknown as Schema.Schema<ListChangesRequest>;

export type ListChangesResponse = ChangesListResponse;
export const ListChangesResponse = ChangesListResponse;

export type ListChangesError = CommonErrors;

export const listChanges = API.makePaginated(() => ({
  input: ListChangesRequest,
  output: ListChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches the representation of an existing DnsKey. */
export interface GetDnsKeysRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** The identifier of the requested DnsKey. */
  dnsKeyId: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed. */
  digestType?: string;
}

export const GetDnsKeysRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  dnsKeyId: Schema.String.pipe(T.HttpPath("dnsKeyId")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  digestType: Schema.optional(Schema.String).pipe(T.HttpQuery("digestType")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys/{dnsKeyId}" }),
  svc,
) as unknown as Schema.Schema<GetDnsKeysRequest>;

export type GetDnsKeysResponse = DnsKey;
export const GetDnsKeysResponse = DnsKey;

export type GetDnsKeysError = CommonErrors;

export const getDnsKeys: API.OperationMethod<GetDnsKeysRequest, GetDnsKeysResponse, GetDnsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDnsKeysRequest,
  output: GetDnsKeysResponse,
  errors: [],
}));

/** Enumerates DnsKeys to a ResourceRecordSet collection. */
export interface ListDnsKeysRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
  /** An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed. */
  digestType?: string;
}

export const ListDnsKeysRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  digestType: Schema.optional(Schema.String).pipe(T.HttpQuery("digestType")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys" }),
  svc,
) as unknown as Schema.Schema<ListDnsKeysRequest>;

export type ListDnsKeysResponse = DnsKeysListResponse;
export const ListDnsKeysResponse = DnsKeysListResponse;

export type ListDnsKeysError = CommonErrors;

export const listDnsKeys = API.makePaginated(() => ({
  input: ListDnsKeysRequest,
  output: ListDnsKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches the representation of an existing Project. */
export interface GetProjectsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetProjectsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = Project;
export const GetProjectsResponse = Project;

export type GetProjectsError = CommonErrors;

export const getProjects: API.OperationMethod<GetProjectsRequest, GetProjectsResponse, GetProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

/** Fetches the representation of an existing Operation. */
export interface GetManagedZoneOperationsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. */
  managedZone: string;
  /** Identifies the operation addressed by this request (ID of the operation). */
  operation: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetManagedZoneOperationsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  operation: Schema.String.pipe(T.HttpPath("operation")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/operations/{operation}" }),
  svc,
) as unknown as Schema.Schema<GetManagedZoneOperationsRequest>;

export type GetManagedZoneOperationsResponse = Operation;
export const GetManagedZoneOperationsResponse = Operation;

export type GetManagedZoneOperationsError = CommonErrors;

export const getManagedZoneOperations: API.OperationMethod<GetManagedZoneOperationsRequest, GetManagedZoneOperationsResponse, GetManagedZoneOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagedZoneOperationsRequest,
  output: GetManagedZoneOperationsResponse,
  errors: [],
}));

/** Enumerates Operations for the given ManagedZone. */
export interface ListManagedZoneOperationsRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. */
  managedZone: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
  /** Sorting criterion. The only supported values are START_TIME and ID. */
  sortBy?: "startTime" | "id" | (string & {});
}

export const ListManagedZoneOperationsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortBy: Schema.optional(Schema.String).pipe(T.HttpQuery("sortBy")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}/operations" }),
  svc,
) as unknown as Schema.Schema<ListManagedZoneOperationsRequest>;

export type ListManagedZoneOperationsResponse = ManagedZoneOperationsListResponse;
export const ListManagedZoneOperationsResponse = ManagedZoneOperationsListResponse;

export type ListManagedZoneOperationsError = CommonErrors;

export const listManagedZoneOperations = API.makePaginated(() => ({
  input: ListManagedZoneOperationsRequest,
  output: ListManagedZoneOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new ManagedZone. */
export interface CreateManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ManagedZone;
}

export const CreateManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ManagedZone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/managedZones", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateManagedZonesRequest>;

export type CreateManagedZonesResponse = ManagedZone;
export const CreateManagedZonesResponse = ManagedZone;

export type CreateManagedZonesError = CommonErrors;

export const createManagedZones: API.OperationMethod<CreateManagedZonesRequest, CreateManagedZonesResponse, CreateManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateManagedZonesRequest,
  output: CreateManagedZonesResponse,
  errors: [],
}));

/** Fetches the representation of an existing ManagedZone. */
export interface GetManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones/{managedZone}" }),
  svc,
) as unknown as Schema.Schema<GetManagedZonesRequest>;

export type GetManagedZonesResponse = ManagedZone;
export const GetManagedZonesResponse = ManagedZone;

export type GetManagedZonesError = CommonErrors;

export const getManagedZones: API.OperationMethod<GetManagedZonesRequest, GetManagedZonesResponse, GetManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagedZonesRequest,
  output: GetManagedZonesResponse,
  errors: [],
}));

/** Enumerates ManagedZones that have been created but not yet deleted. */
export interface ListManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
  /** Restricts the list to return only zones with this domain name. */
  dnsName?: string;
}

export const ListManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  dnsName: Schema.optional(Schema.String).pipe(T.HttpQuery("dnsName")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/managedZones" }),
  svc,
) as unknown as Schema.Schema<ListManagedZonesRequest>;

export type ListManagedZonesResponse = ManagedZonesListResponse;
export const ListManagedZonesResponse = ManagedZonesListResponse;

export type ListManagedZonesError = CommonErrors;

export const listManagedZones = API.makePaginated(() => ({
  input: ListManagedZonesRequest,
  output: ListManagedZonesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a previously created ManagedZone. */
export interface DeleteManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const DeleteManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "dns/v1/projects/{project}/managedZones/{managedZone}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagedZonesRequest>;

export interface DeleteManagedZonesResponse {}
export const DeleteManagedZonesResponse: Schema.Schema<DeleteManagedZonesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagedZonesResponse>;

export type DeleteManagedZonesError = CommonErrors;

export const deleteManagedZones: API.OperationMethod<DeleteManagedZonesRequest, DeleteManagedZonesResponse, DeleteManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagedZonesRequest,
  output: DeleteManagedZonesResponse,
  errors: [],
}));

/** Applies a partial update to an existing ManagedZone. */
export interface PatchManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ManagedZone;
}

export const PatchManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ManagedZone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "dns/v1/projects/{project}/managedZones/{managedZone}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagedZonesRequest>;

export type PatchManagedZonesResponse = Operation;
export const PatchManagedZonesResponse = Operation;

export type PatchManagedZonesError = CommonErrors;

export const patchManagedZones: API.OperationMethod<PatchManagedZonesRequest, PatchManagedZonesResponse, PatchManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagedZonesRequest,
  output: PatchManagedZonesResponse,
  errors: [],
}));

/** Updates an existing ManagedZone. */
export interface UpdateManagedZonesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Identifies the managed zone addressed by this request. Can be the managed zone name or ID. */
  managedZone: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ManagedZone;
}

export const UpdateManagedZonesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  managedZone: Schema.String.pipe(T.HttpPath("managedZone")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ManagedZone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "dns/v1/projects/{project}/managedZones/{managedZone}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagedZonesRequest>;

export type UpdateManagedZonesResponse = Operation;
export const UpdateManagedZonesResponse = Operation;

export type UpdateManagedZonesError = CommonErrors;

export const updateManagedZones: API.OperationMethod<UpdateManagedZonesRequest, UpdateManagedZonesResponse, UpdateManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagedZonesRequest,
  output: UpdateManagedZonesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyManagedZonesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyManagedZonesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{projectsId}/managedZones/{managedZonesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyManagedZonesRequest>;

export type SetIamPolicyManagedZonesResponse = GoogleIamV1Policy;
export const SetIamPolicyManagedZonesResponse = GoogleIamV1Policy;

export type SetIamPolicyManagedZonesError = CommonErrors;

export const setIamPolicyManagedZones: API.OperationMethod<SetIamPolicyManagedZonesRequest, SetIamPolicyManagedZonesResponse, SetIamPolicyManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyManagedZonesRequest,
  output: SetIamPolicyManagedZonesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyManagedZonesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1GetIamPolicyRequest;
}

export const GetIamPolicyManagedZonesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{projectsId}/managedZones/{managedZonesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyManagedZonesRequest>;

export type GetIamPolicyManagedZonesResponse = GoogleIamV1Policy;
export const GetIamPolicyManagedZonesResponse = GoogleIamV1Policy;

export type GetIamPolicyManagedZonesError = CommonErrors;

export const getIamPolicyManagedZones: API.OperationMethod<GetIamPolicyManagedZonesRequest, GetIamPolicyManagedZonesResponse, GetIamPolicyManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyManagedZonesRequest,
  output: GetIamPolicyManagedZonesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this returns an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsManagedZonesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsManagedZonesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{projectsId}/managedZones/{managedZonesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsManagedZonesRequest>;

export type TestIamPermissionsManagedZonesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsManagedZonesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsManagedZonesError = CommonErrors;

export const testIamPermissionsManagedZones: API.OperationMethod<TestIamPermissionsManagedZonesRequest, TestIamPermissionsManagedZonesResponse, TestIamPermissionsManagedZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsManagedZonesRequest,
  output: TestIamPermissionsManagedZonesResponse,
  errors: [],
}));

/** Creates a new policy. */
export interface CreatePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: Policy;
}

export const CreatePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePoliciesRequest>;

export type CreatePoliciesResponse = Policy;
export const CreatePoliciesResponse = Policy;

export type CreatePoliciesError = CommonErrors;

export const createPolicies: API.OperationMethod<CreatePoliciesRequest, CreatePoliciesResponse, CreatePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePoliciesRequest,
  output: CreatePoliciesResponse,
  errors: [],
}));

/** Fetches the representation of an existing policy. */
export interface GetPoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User given friendly name of the policy addressed by this request. */
  policy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetPoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  policy: Schema.String.pipe(T.HttpPath("policy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/policies/{policy}" }),
  svc,
) as unknown as Schema.Schema<GetPoliciesRequest>;

export type GetPoliciesResponse = Policy;
export const GetPoliciesResponse = Policy;

export type GetPoliciesError = CommonErrors;

export const getPolicies: API.OperationMethod<GetPoliciesRequest, GetPoliciesResponse, GetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

/** Enumerates all policies associated with a project. */
export interface ListPoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
}

export const ListPoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/policies" }),
  svc,
) as unknown as Schema.Schema<ListPoliciesRequest>;

export type ListPoliciesResponse = PoliciesListResponse;
export const ListPoliciesResponse = PoliciesListResponse;

export type ListPoliciesError = CommonErrors;

export const listPolicies = API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a previously created policy. Fails if the policy is still being referenced by a network. */
export interface DeletePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User given friendly name of the policy addressed by this request. */
  policy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const DeletePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  policy: Schema.String.pipe(T.HttpPath("policy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "dns/v1/projects/{project}/policies/{policy}" }),
  svc,
) as unknown as Schema.Schema<DeletePoliciesRequest>;

export interface DeletePoliciesResponse {}
export const DeletePoliciesResponse: Schema.Schema<DeletePoliciesResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePoliciesResponse>;

export type DeletePoliciesError = CommonErrors;

export const deletePolicies: API.OperationMethod<DeletePoliciesRequest, DeletePoliciesResponse, DeletePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePoliciesRequest,
  output: DeletePoliciesResponse,
  errors: [],
}));

/** Applies a partial update to an existing policy. */
export interface PatchPoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User given friendly name of the policy addressed by this request. */
  policy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: Policy;
}

export const PatchPoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  policy: Schema.String.pipe(T.HttpPath("policy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "dns/v1/projects/{project}/policies/{policy}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPoliciesRequest>;

export type PatchPoliciesResponse = PoliciesPatchResponse;
export const PatchPoliciesResponse = PoliciesPatchResponse;

export type PatchPoliciesError = CommonErrors;

export const patchPolicies: API.OperationMethod<PatchPoliciesRequest, PatchPoliciesResponse, PatchPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPoliciesRequest,
  output: PatchPoliciesResponse,
  errors: [],
}));

/** Updates an existing policy. */
export interface UpdatePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User given friendly name of the policy addressed by this request. */
  policy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: Policy;
}

export const UpdatePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  policy: Schema.String.pipe(T.HttpPath("policy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "dns/v1/projects/{project}/policies/{policy}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePoliciesRequest>;

export type UpdatePoliciesResponse = PoliciesUpdateResponse;
export const UpdatePoliciesResponse = PoliciesUpdateResponse;

export type UpdatePoliciesError = CommonErrors;

export const updatePolicies: API.OperationMethod<UpdatePoliciesRequest, UpdatePoliciesResponse, UpdatePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePoliciesRequest,
  output: UpdatePoliciesResponse,
  errors: [],
}));

/** Creates a new Response Policy */
export interface CreateResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicy;
}

export const CreateResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/responsePolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateResponsePoliciesRequest>;

export type CreateResponsePoliciesResponse = ResponsePolicy;
export const CreateResponsePoliciesResponse = ResponsePolicy;

export type CreateResponsePoliciesError = CommonErrors;

export const createResponsePolicies: API.OperationMethod<CreateResponsePoliciesRequest, CreateResponsePoliciesResponse, CreateResponsePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateResponsePoliciesRequest,
  output: CreateResponsePoliciesResponse,
  errors: [],
}));

/** Fetches the representation of an existing Response Policy. */
export interface GetResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy addressed by this request. */
  responsePolicy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}" }),
  svc,
) as unknown as Schema.Schema<GetResponsePoliciesRequest>;

export type GetResponsePoliciesResponse = ResponsePolicy;
export const GetResponsePoliciesResponse = ResponsePolicy;

export type GetResponsePoliciesError = CommonErrors;

export const getResponsePolicies: API.OperationMethod<GetResponsePoliciesRequest, GetResponsePoliciesResponse, GetResponsePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetResponsePoliciesRequest,
  output: GetResponsePoliciesResponse,
  errors: [],
}));

/** Enumerates all Response Policies associated with a project. */
export interface ListResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
}

export const ListResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/responsePolicies" }),
  svc,
) as unknown as Schema.Schema<ListResponsePoliciesRequest>;

export type ListResponsePoliciesResponse = ResponsePoliciesListResponse;
export const ListResponsePoliciesResponse = ResponsePoliciesListResponse;

export type ListResponsePoliciesError = CommonErrors;

export const listResponsePolicies = API.makePaginated(() => ({
  input: ListResponsePoliciesRequest,
  output: ListResponsePoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a previously created Response Policy. Fails if the response policy is non-empty or still being referenced by a network. */
export interface DeleteResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy addressed by this request. */
  responsePolicy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const DeleteResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}" }),
  svc,
) as unknown as Schema.Schema<DeleteResponsePoliciesRequest>;

export interface DeleteResponsePoliciesResponse {}
export const DeleteResponsePoliciesResponse: Schema.Schema<DeleteResponsePoliciesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteResponsePoliciesResponse>;

export type DeleteResponsePoliciesError = CommonErrors;

export const deleteResponsePolicies: API.OperationMethod<DeleteResponsePoliciesRequest, DeleteResponsePoliciesResponse, DeleteResponsePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResponsePoliciesRequest,
  output: DeleteResponsePoliciesResponse,
  errors: [],
}));

/** Applies a partial update to an existing Response Policy. */
export interface PatchResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the response policy addressed by this request. */
  responsePolicy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicy;
}

export const PatchResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResponsePoliciesRequest>;

export type PatchResponsePoliciesResponse = ResponsePoliciesPatchResponse;
export const PatchResponsePoliciesResponse = ResponsePoliciesPatchResponse;

export type PatchResponsePoliciesError = CommonErrors;

export const patchResponsePolicies: API.OperationMethod<PatchResponsePoliciesRequest, PatchResponsePoliciesResponse, PatchResponsePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResponsePoliciesRequest,
  output: PatchResponsePoliciesResponse,
  errors: [],
}));

/** Updates an existing Response Policy. */
export interface UpdateResponsePoliciesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy addressed by this request. */
  responsePolicy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicy;
}

export const UpdateResponsePoliciesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateResponsePoliciesRequest>;

export type UpdateResponsePoliciesResponse = ResponsePoliciesUpdateResponse;
export const UpdateResponsePoliciesResponse = ResponsePoliciesUpdateResponse;

export type UpdateResponsePoliciesError = CommonErrors;

export const updateResponsePolicies: API.OperationMethod<UpdateResponsePoliciesRequest, UpdateResponsePoliciesResponse, UpdateResponsePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateResponsePoliciesRequest,
  output: UpdateResponsePoliciesResponse,
  errors: [],
}));

/** Creates a new Response Policy Rule. */
export interface CreateResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy containing the Response Policy Rule. */
  responsePolicy: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicyRule;
}

export const CreateResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicyRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateResponsePolicyRulesRequest>;

export type CreateResponsePolicyRulesResponse = ResponsePolicyRule;
export const CreateResponsePolicyRulesResponse = ResponsePolicyRule;

export type CreateResponsePolicyRulesError = CommonErrors;

export const createResponsePolicyRules: API.OperationMethod<CreateResponsePolicyRulesRequest, CreateResponsePolicyRulesResponse, CreateResponsePolicyRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateResponsePolicyRulesRequest,
  output: CreateResponsePolicyRulesResponse,
  errors: [],
}));

/** Fetches the representation of an existing Response Policy Rule. */
export interface GetResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy containing the Response Policy Rule. */
  responsePolicy: string;
  /** User assigned name of the Response Policy Rule addressed by this request. */
  responsePolicyRule: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const GetResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  responsePolicyRule: Schema.String.pipe(T.HttpPath("responsePolicyRule")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}" }),
  svc,
) as unknown as Schema.Schema<GetResponsePolicyRulesRequest>;

export type GetResponsePolicyRulesResponse = ResponsePolicyRule;
export const GetResponsePolicyRulesResponse = ResponsePolicyRule;

export type GetResponsePolicyRulesError = CommonErrors;

export const getResponsePolicyRules: API.OperationMethod<GetResponsePolicyRulesRequest, GetResponsePolicyRulesResponse, GetResponsePolicyRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetResponsePolicyRulesRequest,
  output: GetResponsePolicyRulesResponse,
  errors: [],
}));

/** Deletes a previously created Response Policy Rule. */
export interface DeleteResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy containing the Response Policy Rule. */
  responsePolicy: string;
  /** User assigned name of the Response Policy Rule addressed by this request. */
  responsePolicyRule: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
}

export const DeleteResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  responsePolicyRule: Schema.String.pipe(T.HttpPath("responsePolicyRule")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}" }),
  svc,
) as unknown as Schema.Schema<DeleteResponsePolicyRulesRequest>;

export interface DeleteResponsePolicyRulesResponse {}
export const DeleteResponsePolicyRulesResponse: Schema.Schema<DeleteResponsePolicyRulesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteResponsePolicyRulesResponse>;

export type DeleteResponsePolicyRulesError = CommonErrors;

export const deleteResponsePolicyRules: API.OperationMethod<DeleteResponsePolicyRulesRequest, DeleteResponsePolicyRulesResponse, DeleteResponsePolicyRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResponsePolicyRulesRequest,
  output: DeleteResponsePolicyRulesResponse,
  errors: [],
}));

/** Enumerates all Response Policy Rules associated with a project. */
export interface ListResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy to list. */
  responsePolicy: string;
  /** Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. */
  maxResults?: number;
  /** Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. */
  pageToken?: string;
}

export const ListResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules" }),
  svc,
) as unknown as Schema.Schema<ListResponsePolicyRulesRequest>;

export type ListResponsePolicyRulesResponse = ResponsePolicyRulesListResponse;
export const ListResponsePolicyRulesResponse = ResponsePolicyRulesListResponse;

export type ListResponsePolicyRulesError = CommonErrors;

export const listResponsePolicyRules = API.makePaginated(() => ({
  input: ListResponsePolicyRulesRequest,
  output: ListResponsePolicyRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Applies a partial update to an existing Response Policy Rule. */
export interface PatchResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy containing the Response Policy Rule. */
  responsePolicy: string;
  /** User assigned name of the Response Policy Rule addressed by this request. */
  responsePolicyRule: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicyRule;
}

export const PatchResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  responsePolicyRule: Schema.String.pipe(T.HttpPath("responsePolicyRule")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicyRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResponsePolicyRulesRequest>;

export type PatchResponsePolicyRulesResponse = ResponsePolicyRulesPatchResponse;
export const PatchResponsePolicyRulesResponse = ResponsePolicyRulesPatchResponse;

export type PatchResponsePolicyRulesError = CommonErrors;

export const patchResponsePolicyRules: API.OperationMethod<PatchResponsePolicyRulesRequest, PatchResponsePolicyRulesResponse, PatchResponsePolicyRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResponsePolicyRulesRequest,
  output: PatchResponsePolicyRulesResponse,
  errors: [],
}));

/** Updates an existing Response Policy Rule. */
export interface UpdateResponsePolicyRulesRequest {
  /** Identifies the project addressed by this request. */
  project: string;
  /** User assigned name of the Response Policy containing the Response Policy Rule. */
  responsePolicy: string;
  /** User assigned name of the Response Policy Rule addressed by this request. */
  responsePolicyRule: string;
  /** For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. */
  clientOperationId?: string;
  /** Request body */
  body?: ResponsePolicyRule;
}

export const UpdateResponsePolicyRulesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  responsePolicy: Schema.String.pipe(T.HttpPath("responsePolicy")),
  responsePolicyRule: Schema.String.pipe(T.HttpPath("responsePolicyRule")),
  clientOperationId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientOperationId")),
  body: Schema.optional(ResponsePolicyRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateResponsePolicyRulesRequest>;

export type UpdateResponsePolicyRulesResponse = ResponsePolicyRulesUpdateResponse;
export const UpdateResponsePolicyRulesResponse = ResponsePolicyRulesUpdateResponse;

export type UpdateResponsePolicyRulesError = CommonErrors;

export const updateResponsePolicyRules: API.OperationMethod<UpdateResponsePolicyRulesRequest, UpdateResponsePolicyRulesResponse, UpdateResponsePolicyRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateResponsePolicyRulesRequest,
  output: UpdateResponsePolicyRulesResponse,
  errors: [],
}));

