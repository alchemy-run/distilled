// ==========================================================================
// Network Security API (networksecurity v1)
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
  name: "networksecurity",
  version: "v1",
  rootUrl: "https://networksecurity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AuthzPolicyAuthzRuleStringMatch {
  /** The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * ``abc`` matches the value ``abc.xyz`` */
  prefix?: string;
  /** The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * ``abc`` matches the value ``xyz.abc.def`` */
  contains?: string;
  /** If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher ``data`` will match both input string ``Data`` and ``data`` if set to true. */
  ignoreCase?: boolean;
  /** The input string must match exactly the string specified here. Examples: * ``abc`` only matches the value ``abc``. */
  exact?: string;
  /** The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * ``abc`` matches the value ``xyz.abc`` */
  suffix?: string;
}

export const AuthzPolicyAuthzRuleStringMatch: Schema.Schema<AuthzPolicyAuthzRuleStringMatch> = Schema.suspend(() => Schema.Struct({
  prefix: Schema.optional(Schema.String),
  contains: Schema.optional(Schema.String),
  ignoreCase: Schema.optional(Schema.Boolean),
  exact: Schema.optional(Schema.String),
  suffix: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthzPolicyAuthzRuleStringMatch" }) as any as Schema.Schema<AuthzPolicyAuthzRuleStringMatch>;

export interface AuthzPolicyAuthzRuleRequestResourceTagValueIdSet {
  /** Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set. */
  ids?: Array<string>;
}

export const AuthzPolicyAuthzRuleRequestResourceTagValueIdSet: Schema.Schema<AuthzPolicyAuthzRuleRequestResourceTagValueIdSet> = Schema.suspend(() => Schema.Struct({
  ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleRequestResourceTagValueIdSet" }) as any as Schema.Schema<AuthzPolicyAuthzRuleRequestResourceTagValueIdSet>;

export interface AuthzPolicyAuthzRuleRequestResource {
  /** Optional. An IAM service account to match against the source service account of the VM sending the request. */
  iamServiceAccount?: AuthzPolicyAuthzRuleStringMatch;
  /** Optional. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. */
  tagValueIdSet?: AuthzPolicyAuthzRuleRequestResourceTagValueIdSet;
}

export const AuthzPolicyAuthzRuleRequestResource: Schema.Schema<AuthzPolicyAuthzRuleRequestResource> = Schema.suspend(() => Schema.Struct({
  iamServiceAccount: Schema.optional(AuthzPolicyAuthzRuleStringMatch),
  tagValueIdSet: Schema.optional(AuthzPolicyAuthzRuleRequestResourceTagValueIdSet),
})).annotate({ identifier: "AuthzPolicyAuthzRuleRequestResource" }) as any as Schema.Schema<AuthzPolicyAuthzRuleRequestResource>;

export interface AuthzPolicyAuthzRulePrincipal {
  /** Required. A non-empty string whose value is matched against the principal value based on the principal_selector. Only exact match can be applied for CLIENT_CERT_URI_SAN, CLIENT_CERT_DNS_NAME_SAN, CLIENT_CERT_COMMON_NAME selectors. */
  principal?: AuthzPolicyAuthzRuleStringMatch;
  /** Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN. */
  principalSelector?: "PRINCIPAL_SELECTOR_UNSPECIFIED" | "CLIENT_CERT_URI_SAN" | "CLIENT_CERT_DNS_NAME_SAN" | "CLIENT_CERT_COMMON_NAME" | (string & {});
}

export const AuthzPolicyAuthzRulePrincipal: Schema.Schema<AuthzPolicyAuthzRulePrincipal> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(AuthzPolicyAuthzRuleStringMatch),
  principalSelector: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthzPolicyAuthzRulePrincipal" }) as any as Schema.Schema<AuthzPolicyAuthzRulePrincipal>;

export interface AuthzPolicyAuthzRuleIpBlock {
  /** Required. The address prefix. */
  prefix?: string;
  /** Required. The length of the address range. */
  length?: number;
}

export const AuthzPolicyAuthzRuleIpBlock: Schema.Schema<AuthzPolicyAuthzRuleIpBlock> = Schema.suspend(() => Schema.Struct({
  prefix: Schema.optional(Schema.String),
  length: Schema.optional(Schema.Number),
})).annotate({ identifier: "AuthzPolicyAuthzRuleIpBlock" }) as any as Schema.Schema<AuthzPolicyAuthzRuleIpBlock>;

export interface AuthzPolicyAuthzRuleFromRequestSource {
  /** Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy. */
  resources?: Array<AuthzPolicyAuthzRuleRequestResource>;
  /** Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers. */
  principals?: Array<AuthzPolicyAuthzRulePrincipal>;
  /** Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy */
  ipBlocks?: Array<AuthzPolicyAuthzRuleIpBlock>;
}

export const AuthzPolicyAuthzRuleFromRequestSource: Schema.Schema<AuthzPolicyAuthzRuleFromRequestSource> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleRequestResource)),
  principals: Schema.optional(Schema.Array(AuthzPolicyAuthzRulePrincipal)),
  ipBlocks: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleIpBlock)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleFromRequestSource" }) as any as Schema.Schema<AuthzPolicyAuthzRuleFromRequestSource>;

export interface AuthzPolicyAuthzRuleFrom {
  /** Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match. */
  sources?: Array<AuthzPolicyAuthzRuleFromRequestSource>;
  /** Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified. */
  notSources?: Array<AuthzPolicyAuthzRuleFromRequestSource>;
}

export const AuthzPolicyAuthzRuleFrom: Schema.Schema<AuthzPolicyAuthzRuleFrom> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleFromRequestSource)),
  notSources: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleFromRequestSource)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleFrom" }) as any as Schema.Schema<AuthzPolicyAuthzRuleFrom>;

export interface AuthzPolicyAuthzRuleHeaderMatch {
  /** Optional. Specifies the name of the header in the request. */
  name?: string;
  /** Optional. Specifies how the header match will be performed. */
  value?: AuthzPolicyAuthzRuleStringMatch;
}

export const AuthzPolicyAuthzRuleHeaderMatch: Schema.Schema<AuthzPolicyAuthzRuleHeaderMatch> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(AuthzPolicyAuthzRuleStringMatch),
})).annotate({ identifier: "AuthzPolicyAuthzRuleHeaderMatch" }) as any as Schema.Schema<AuthzPolicyAuthzRuleHeaderMatch>;

export interface AuthzPolicyAuthzRuleToRequestOperationHeaderSet {
  /** Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy. */
  headers?: Array<AuthzPolicyAuthzRuleHeaderMatch>;
}

export const AuthzPolicyAuthzRuleToRequestOperationHeaderSet: Schema.Schema<AuthzPolicyAuthzRuleToRequestOperationHeaderSet> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleHeaderMatch)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleToRequestOperationHeaderSet" }) as any as Schema.Schema<AuthzPolicyAuthzRuleToRequestOperationHeaderSet>;

export interface AuthzPolicyAuthzRuleToRequestOperation {
  /** Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method. */
  paths?: Array<AuthzPolicyAuthzRuleStringMatch>;
  /** Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy. */
  methods?: Array<string>;
  /** Optional. A list of headers to match against in http header. */
  headerSet?: AuthzPolicyAuthzRuleToRequestOperationHeaderSet;
  /** Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy. */
  hosts?: Array<AuthzPolicyAuthzRuleStringMatch>;
}

export const AuthzPolicyAuthzRuleToRequestOperation: Schema.Schema<AuthzPolicyAuthzRuleToRequestOperation> = Schema.suspend(() => Schema.Struct({
  paths: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleStringMatch)),
  methods: Schema.optional(Schema.Array(Schema.String)),
  headerSet: Schema.optional(AuthzPolicyAuthzRuleToRequestOperationHeaderSet),
  hosts: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleStringMatch)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleToRequestOperation" }) as any as Schema.Schema<AuthzPolicyAuthzRuleToRequestOperation>;

export interface AuthzPolicyAuthzRuleTo {
  /** Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches. */
  operations?: Array<AuthzPolicyAuthzRuleToRequestOperation>;
  /** Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified. */
  notOperations?: Array<AuthzPolicyAuthzRuleToRequestOperation>;
}

export const AuthzPolicyAuthzRuleTo: Schema.Schema<AuthzPolicyAuthzRuleTo> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleToRequestOperation)),
  notOperations: Schema.optional(Schema.Array(AuthzPolicyAuthzRuleToRequestOperation)),
})).annotate({ identifier: "AuthzPolicyAuthzRuleTo" }) as any as Schema.Schema<AuthzPolicyAuthzRuleTo>;

export interface AuthzPolicyAuthzRule {
  /** Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes. */
  when?: string;
  /** Optional. Describes properties of a source of a request. */
  from?: AuthzPolicyAuthzRuleFrom;
  /** Optional. Describes properties of a target of a request. */
  to?: AuthzPolicyAuthzRuleTo;
}

export const AuthzPolicyAuthzRule: Schema.Schema<AuthzPolicyAuthzRule> = Schema.suspend(() => Schema.Struct({
  when: Schema.optional(Schema.String),
  from: Schema.optional(AuthzPolicyAuthzRuleFrom),
  to: Schema.optional(AuthzPolicyAuthzRuleTo),
})).annotate({ identifier: "AuthzPolicyAuthzRule" }) as any as Schema.Schema<AuthzPolicyAuthzRule>;

export interface AuthzPolicyCustomProviderCloudIap {
}

export const AuthzPolicyCustomProviderCloudIap: Schema.Schema<AuthzPolicyCustomProviderCloudIap> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AuthzPolicyCustomProviderCloudIap" }) as any as Schema.Schema<AuthzPolicyCustomProviderCloudIap>;

export interface AuthzPolicyCustomProviderAuthzExtension {
  /** Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider. */
  resources?: Array<string>;
}

export const AuthzPolicyCustomProviderAuthzExtension: Schema.Schema<AuthzPolicyCustomProviderAuthzExtension> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuthzPolicyCustomProviderAuthzExtension" }) as any as Schema.Schema<AuthzPolicyCustomProviderAuthzExtension>;

export interface AuthzPolicyCustomProvider {
  /** Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places. */
  cloudIap?: AuthzPolicyCustomProviderCloudIap;
  /** Optional. Delegate authorization decision to user authored Service Extension. Only one of cloudIap or authzExtension can be specified. */
  authzExtension?: AuthzPolicyCustomProviderAuthzExtension;
}

export const AuthzPolicyCustomProvider: Schema.Schema<AuthzPolicyCustomProvider> = Schema.suspend(() => Schema.Struct({
  cloudIap: Schema.optional(AuthzPolicyCustomProviderCloudIap),
  authzExtension: Schema.optional(AuthzPolicyCustomProviderAuthzExtension),
})).annotate({ identifier: "AuthzPolicyCustomProvider" }) as any as Schema.Schema<AuthzPolicyCustomProvider>;

export interface AuthzPolicyTarget {
  /** Required. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service). */
  loadBalancingScheme?: "LOAD_BALANCING_SCHEME_UNSPECIFIED" | "INTERNAL_MANAGED" | "EXTERNAL_MANAGED" | "INTERNAL_SELF_MANAGED" | (string & {});
  /** Required. A list of references to the Forwarding Rules on which this policy will be applied. */
  resources?: Array<string>;
}

export const AuthzPolicyTarget: Schema.Schema<AuthzPolicyTarget> = Schema.suspend(() => Schema.Struct({
  loadBalancingScheme: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuthzPolicyTarget" }) as any as Schema.Schema<AuthzPolicyTarget>;

export interface AuthzPolicy {
  /** Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules. */
  httpRules?: Array<AuthzPolicyAuthzRule>;
  /** Optional. Required if the action is `CUSTOM`. Allows delegating authorization decisions to Cloud IAP or to Service Extensions. One of `cloudIap` or `authzExtension` must be specified. */
  customProvider?: AuthzPolicyCustomProvider;
  /** Required. Specifies the set of resources to which this policy should be applied to. */
  target?: AuthzPolicyTarget;
  /** Optional. A human-readable description of the resource. */
  description?: string;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements). */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If there are no `ALLOW` policies for the resource or if any of the `ALLOW` policies match the request, the request is allowed. 4. Else the request is denied by default if none of the configured AuthzPolicies with `ALLOW` action match the request. */
  action?: "AUTHZ_ACTION_UNSPECIFIED" | "ALLOW" | "DENY" | "CUSTOM" | (string & {});
  /** Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. */
  name?: string;
}

export const AuthzPolicy: Schema.Schema<AuthzPolicy> = Schema.suspend(() => Schema.Struct({
  httpRules: Schema.optional(Schema.Array(AuthzPolicyAuthzRule)),
  customProvider: Schema.optional(AuthzPolicyCustomProvider),
  target: Schema.optional(AuthzPolicyTarget),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthzPolicy" }) as any as Schema.Schema<AuthzPolicy>;

export interface ListAuthzPoliciesResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results that the server returns. */
  nextPageToken?: string;
  /** The list of `AuthzPolicy` resources. */
  authzPolicies?: Array<AuthzPolicy>;
}

export const ListAuthzPoliciesResponse: Schema.Schema<ListAuthzPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  authzPolicies: Schema.optional(Schema.Array(AuthzPolicy)),
})).annotate({ identifier: "ListAuthzPoliciesResponse" }) as any as Schema.Schema<ListAuthzPoliciesResponse>;

export interface FirewallEndpointEndpointSettings {
  /** Optional. Immutable. Indicates whether Jumbo Frames are enabled. Default value is false. */
  jumboFramesEnabled?: boolean;
}

export const FirewallEndpointEndpointSettings: Schema.Schema<FirewallEndpointEndpointSettings> = Schema.suspend(() => Schema.Struct({
  jumboFramesEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FirewallEndpointEndpointSettings" }) as any as Schema.Schema<FirewallEndpointEndpointSettings>;

export interface FirewallEndpointAssociationReference {
  /** Output only. The resource name of the FirewallEndpointAssociation. Format: projects/{project}/locations/{location}/firewallEndpointAssociations/{id} */
  name?: string;
  /** Output only. The VPC network associated. Format: projects/{project}/global/networks/{name}. */
  network?: string;
}

export const FirewallEndpointAssociationReference: Schema.Schema<FirewallEndpointAssociationReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "FirewallEndpointAssociationReference" }) as any as Schema.Schema<FirewallEndpointAssociationReference>;

export interface FirewallEndpoint {
  /** Output only. Current state of the endpoint. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "INACTIVE" | (string & {});
  /** Immutable. Identifier. Name of resource. */
  name?: string;
  /** Output only. Update time stamp */
  updateTime?: string;
  /** Output only. Whether reconciling is in progress, recommended per https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Output only. Create time stamp. */
  createTime?: string;
  /** Output only. List of networks that are associated with this endpoint in the local zone. This is a projection of the FirewallEndpointAssociations pointing at this endpoint. A network will only appear in this list after traffic routing is fully configured. Format: projects/{project}/global/networks/{name}. */
  associatedNetworks?: Array<string>;
  /** Optional. Settings for the endpoint. */
  endpointSettings?: FirewallEndpointEndpointSettings;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. [Output Only] Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. List of FirewallEndpointAssociations that are associated to this endpoint. An association will only appear in this list after traffic routing is fully configured. */
  associations?: Array<FirewallEndpointAssociationReference>;
  /** Required. Project to bill on endpoint uptime usage. */
  billingProjectId?: string;
  /** Optional. Description of the firewall endpoint. Max length 2048 characters. */
  description?: string;
}

export const FirewallEndpoint: Schema.Schema<FirewallEndpoint> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  associatedNetworks: Schema.optional(Schema.Array(Schema.String)),
  endpointSettings: Schema.optional(FirewallEndpointEndpointSettings),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  associations: Schema.optional(Schema.Array(FirewallEndpointAssociationReference)),
  billingProjectId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "FirewallEndpoint" }) as any as Schema.Schema<FirewallEndpoint>;

export interface ListFirewallEndpointsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The list of Endpoint */
  firewallEndpoints?: Array<FirewallEndpoint>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListFirewallEndpointsResponse: Schema.Schema<ListFirewallEndpointsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  firewallEndpoints: Schema.optional(Schema.Array(FirewallEndpoint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFirewallEndpointsResponse" }) as any as Schema.Schema<ListFirewallEndpointsResponse>;

export interface Source {
  /** Optional. List of CIDR ranges to match based on source IP address. At least one IP block should match. Single IP (e.g., "1.2.3.4") and CIDR (e.g., "1.2.3.0/24") are supported. Authorization based on source IP alone should be avoided. The IP addresses of any load balancers or proxies should be considered untrusted. */
  ipBlocks?: Array<string>;
  /** Optional. List of peer identities to match for authorization. At least one principal should match. Each peer can be an exact match, or a prefix match (example, "namespace/*") or a suffix match (example, "* /service-account") or a presence match "*". Authorization based on the principal name without certificate validation (configured by ServerTlsPolicy resource) is considered insecure. */
  principals?: Array<string>;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  ipBlocks: Schema.optional(Schema.Array(Schema.String)),
  principals: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface SecurityProfileGroup {
  /** Optional. Reference to a SecurityProfile with the ThreatPrevention configuration. */
  threatPreventionProfile?: string;
  /** Output only. Resource creation timestamp. */
  createTime?: string;
  /** Optional. Reference to a SecurityProfile with the CustomMirroring configuration. */
  customMirroringProfile?: string;
  /** Optional. Reference to a SecurityProfile with the CustomIntercept configuration. */
  customInterceptProfile?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Immutable. Identifier. Name of the SecurityProfileGroup resource. It matches pattern `projects|organizations/* /locations/{location}/securityProfileGroups/{security_profile_group}`. */
  name?: string;
  /** Output only. Last resource update timestamp. */
  updateTime?: string;
  /** Output only. Identifier used by the data-path. Unique within {container, location}. */
  dataPathId?: string;
  /** Optional. An optional description of the profile group. Max length 2048 characters. */
  description?: string;
  /** Optional. Reference to a SecurityProfile with the UrlFiltering configuration. */
  urlFilteringProfile?: string;
}

export const SecurityProfileGroup: Schema.Schema<SecurityProfileGroup> = Schema.suspend(() => Schema.Struct({
  threatPreventionProfile: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  customMirroringProfile: Schema.optional(Schema.String),
  customInterceptProfile: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  dataPathId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  urlFilteringProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityProfileGroup" }) as any as Schema.Schema<SecurityProfileGroup>;

export interface MirroringDeploymentGroupConnectedEndpointGroup {
  /** Output only. The connected endpoint group's resource name, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/124. */
  name?: string;
}

export const MirroringDeploymentGroupConnectedEndpointGroup: Schema.Schema<MirroringDeploymentGroupConnectedEndpointGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringDeploymentGroupConnectedEndpointGroup" }) as any as Schema.Schema<MirroringDeploymentGroupConnectedEndpointGroup>;

export interface MirroringDeploymentGroupDeployment {
  /** Output only. The name of the Mirroring Deployment, in the format: `projects/{project}/locations/{location}/mirroringDeployments/{mirroring_deployment}`. */
  name?: string;
  /** Output only. Most recent known state of the deployment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
}

export const MirroringDeploymentGroupDeployment: Schema.Schema<MirroringDeploymentGroupDeployment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringDeploymentGroupDeployment" }) as any as Schema.Schema<MirroringDeploymentGroupDeployment>;

export interface MirroringLocation {
  /** Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". */
  location?: string;
  /** Output only. The current state of the association in this location. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "OUT_OF_SYNC" | (string & {});
}

export const MirroringLocation: Schema.Schema<MirroringLocation> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringLocation" }) as any as Schema.Schema<MirroringLocation>;

export interface MirroringDeploymentGroup {
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new deployment to the group) See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Output only. The list of endpoint groups that are connected to this resource. */
  connectedEndpointGroups?: Array<MirroringDeploymentGroupConnectedEndpointGroup>;
  /** Required. Immutable. The network that will be used for all child deployments, for example: `projects/{project}/global/networks/{network}`. See https://google.aip.dev/124. */
  network?: string;
  /** Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Optional. User-provided description of the deployment group. Used as additional context for the deployment group. */
  description?: string;
  /** Output only. The list of Mirroring Deployments that belong to this group. */
  nestedDeployments?: Array<MirroringDeploymentGroupDeployment>;
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The current state of the deployment group. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "CLOSED" | (string & {});
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Output only. The list of locations where the deployment group is present. */
  locations?: Array<MirroringLocation>;
}

export const MirroringDeploymentGroup: Schema.Schema<MirroringDeploymentGroup> = Schema.suspend(() => Schema.Struct({
  reconciling: Schema.optional(Schema.Boolean),
  connectedEndpointGroups: Schema.optional(Schema.Array(MirroringDeploymentGroupConnectedEndpointGroup)),
  network: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  nestedDeployments: Schema.optional(Schema.Array(MirroringDeploymentGroupDeployment)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(MirroringLocation)),
})).annotate({ identifier: "MirroringDeploymentGroup" }) as any as Schema.Schema<MirroringDeploymentGroup>;

export interface CertificateProviderInstance {
  /** Required. Plugin instance name, used to locate and load CertificateProvider instance configuration. Set to "google_cloud_private_spiffe" to use Certificate Authority Service certificate provider instance. */
  pluginInstance?: string;
}

export const CertificateProviderInstance: Schema.Schema<CertificateProviderInstance> = Schema.suspend(() => Schema.Struct({
  pluginInstance: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateProviderInstance" }) as any as Schema.Schema<CertificateProviderInstance>;

export interface GoogleCloudNetworksecurityV1GrpcEndpoint {
  /** Required. The target URI of the gRPC endpoint. Only UDS path is supported, and should start with "unix:". */
  targetUri?: string;
}

export const GoogleCloudNetworksecurityV1GrpcEndpoint: Schema.Schema<GoogleCloudNetworksecurityV1GrpcEndpoint> = Schema.suspend(() => Schema.Struct({
  targetUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudNetworksecurityV1GrpcEndpoint" }) as any as Schema.Schema<GoogleCloudNetworksecurityV1GrpcEndpoint>;

export interface ValidationCA {
  /** The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. */
  certificateProviderInstance?: CertificateProviderInstance;
  /** gRPC specific configuration to access the gRPC server to obtain the CA certificate. */
  grpcEndpoint?: GoogleCloudNetworksecurityV1GrpcEndpoint;
}

export const ValidationCA: Schema.Schema<ValidationCA> = Schema.suspend(() => Schema.Struct({
  certificateProviderInstance: Schema.optional(CertificateProviderInstance),
  grpcEndpoint: Schema.optional(GoogleCloudNetworksecurityV1GrpcEndpoint),
})).annotate({ identifier: "ValidationCA" }) as any as Schema.Schema<ValidationCA>;

export interface MTLSPolicy {
  /** Required if the policy is to be used with Traffic Director. For Application Load Balancers it must be empty. Defines the mechanism to obtain the Certificate Authority certificate to validate the client certificate. */
  clientValidationCa?: Array<ValidationCA>;
  /** When the client presents an invalid certificate or no certificate to the load balancer, the `client_validation_mode` specifies how the client connection is handled. Required if the policy is to be used with the Application Load Balancers. For Traffic Director it must be empty. */
  clientValidationMode?: "CLIENT_VALIDATION_MODE_UNSPECIFIED" | "ALLOW_INVALID_OR_MISSING_CLIENT_CERT" | "REJECT_INVALID" | (string & {});
  /** Reference to the TrustConfig from certificatemanager.googleapis.com namespace. If specified, the chain validation will be performed against certificates configured in the given TrustConfig. Allowed only if the policy is to be used with Application Load Balancers. */
  clientValidationTrustConfig?: string;
}

export const MTLSPolicy: Schema.Schema<MTLSPolicy> = Schema.suspend(() => Schema.Struct({
  clientValidationCa: Schema.optional(Schema.Array(ValidationCA)),
  clientValidationMode: Schema.optional(Schema.String),
  clientValidationTrustConfig: Schema.optional(Schema.String),
})).annotate({ identifier: "MTLSPolicy" }) as any as Schema.Schema<MTLSPolicy>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
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

export interface HttpHeaderMatch {
  /** Required. The name of the HTTP header to match. For matching against the HTTP request's authority, use a headerMatch with the header name ":authority". For matching a request's method, use the headerName ":method". */
  headerName?: string;
  /** Required. The value of the header must match the regular expression specified in regexMatch. For regular expression grammar, please see: en.cppreference.com/w/cpp/regex/ecmascript For matching against a port specified in the HTTP request, use a headerMatch with headerName set to Host and a regular expression that satisfies the RFC2616 Host header's port specifier. */
  regexMatch?: string;
}

export const HttpHeaderMatch: Schema.Schema<HttpHeaderMatch> = Schema.suspend(() => Schema.Struct({
  headerName: Schema.optional(Schema.String),
  regexMatch: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpHeaderMatch" }) as any as Schema.Schema<HttpHeaderMatch>;

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
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface InterceptDeploymentGroupConnectedEndpointGroup {
  /** Output only. The connected endpoint group's resource name, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/124. */
  name?: string;
}

export const InterceptDeploymentGroupConnectedEndpointGroup: Schema.Schema<InterceptDeploymentGroupConnectedEndpointGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptDeploymentGroupConnectedEndpointGroup" }) as any as Schema.Schema<InterceptDeploymentGroupConnectedEndpointGroup>;

export interface GoogleCloudNetworksecurityV1CertificateProvider {
  /** The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. */
  certificateProviderInstance?: CertificateProviderInstance;
  /** gRPC specific configuration to access the gRPC server to obtain the cert and private key. */
  grpcEndpoint?: GoogleCloudNetworksecurityV1GrpcEndpoint;
}

export const GoogleCloudNetworksecurityV1CertificateProvider: Schema.Schema<GoogleCloudNetworksecurityV1CertificateProvider> = Schema.suspend(() => Schema.Struct({
  certificateProviderInstance: Schema.optional(CertificateProviderInstance),
  grpcEndpoint: Schema.optional(GoogleCloudNetworksecurityV1GrpcEndpoint),
})).annotate({ identifier: "GoogleCloudNetworksecurityV1CertificateProvider" }) as any as Schema.Schema<GoogleCloudNetworksecurityV1CertificateProvider>;

export interface ServerTlsPolicy {
  /** This field is required if the policy is used with Application Load Balancers. This field can be empty for Traffic Director. Defines a mechanism to provision peer validation certificates for peer to peer authentication (Mutual TLS - mTLS). If not specified, client certificate will not be requested. The connection is treated as TLS and not mTLS. If `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. */
  mtlsPolicy?: MTLSPolicy;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Free-text description of the resource. */
  description?: string;
  /** This field applies only for Traffic Director policies. It is must be set to false for Application Load Balancer policies. Determines if server allows plaintext connections. If set to true, server allows plain text connections. By default, it is set to false. This setting is not exclusive of other encryption modes. For example, if `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. See documentation of other encryption modes to confirm compatibility. Consider using it if you wish to upgrade in place your deployment to TLS while having mixed TLS and non-TLS traffic reaching port :80. */
  allowOpen?: boolean;
  /** Set of label tags associated with the resource. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Optional if policy is to be used with Traffic Director. For Application Load Balancers must be empty. Defines a mechanism to provision server identity (public and private keys). Cannot be combined with `allow_open` as a permissive mode that allows both plain text and TLS is not supported. */
  serverCertificate?: GoogleCloudNetworksecurityV1CertificateProvider;
  /** Required. Name of the ServerTlsPolicy resource. It matches the pattern `projects/* /locations/{location}/serverTlsPolicies/{server_tls_policy}` */
  name?: string;
}

export const ServerTlsPolicy: Schema.Schema<ServerTlsPolicy> = Schema.suspend(() => Schema.Struct({
  mtlsPolicy: Schema.optional(MTLSPolicy),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  allowOpen: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  serverCertificate: Schema.optional(GoogleCloudNetworksecurityV1CertificateProvider),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ServerTlsPolicy" }) as any as Schema.Schema<ServerTlsPolicy>;

export interface ListServerTlsPoliciesResponse {
  /** Unreachable resources. Populated when the request opts into `return_partial_success` and reading across collections e.g. when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** List of ServerTlsPolicy resources. */
  serverTlsPolicies?: Array<ServerTlsPolicy>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListServerTlsPoliciesResponse: Schema.Schema<ListServerTlsPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  serverTlsPolicies: Schema.optional(Schema.Array(ServerTlsPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServerTlsPoliciesResponse" }) as any as Schema.Schema<ListServerTlsPoliciesResponse>;

export interface ListMirroringDeploymentGroupsResponse {
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
  /** The deployment groups from the specified parent. */
  mirroringDeploymentGroups?: Array<MirroringDeploymentGroup>;
}

export const ListMirroringDeploymentGroupsResponse: Schema.Schema<ListMirroringDeploymentGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  mirroringDeploymentGroups: Schema.optional(Schema.Array(MirroringDeploymentGroup)),
})).annotate({ identifier: "ListMirroringDeploymentGroupsResponse" }) as any as Schema.Schema<ListMirroringDeploymentGroupsResponse>;

export interface CustomMirroringProfile {
  /** Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group. */
  mirroringEndpointGroup?: string;
}

export const CustomMirroringProfile: Schema.Schema<CustomMirroringProfile> = Schema.suspend(() => Schema.Struct({
  mirroringEndpointGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomMirroringProfile" }) as any as Schema.Schema<CustomMirroringProfile>;

export interface CustomInterceptProfile {
  /** Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group. */
  interceptEndpointGroup?: string;
}

export const CustomInterceptProfile: Schema.Schema<CustomInterceptProfile> = Schema.suspend(() => Schema.Struct({
  interceptEndpointGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomInterceptProfile" }) as any as Schema.Schema<CustomInterceptProfile>;

export interface UrlFilter {
  /** Required. The action taken when this filter is applied. */
  filteringAction?: "URL_FILTERING_ACTION_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile. */
  priority?: number;
  /** Required. The list of strings that a URL must match with for this filter to be applied. */
  urls?: Array<string>;
}

export const UrlFilter: Schema.Schema<UrlFilter> = Schema.suspend(() => Schema.Struct({
  filteringAction: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  urls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UrlFilter" }) as any as Schema.Schema<UrlFilter>;

export interface UrlFilteringProfile {
  /** Optional. The list of filtering configs in which each config defines an action to take for some URL match. */
  urlFilters?: Array<UrlFilter>;
}

export const UrlFilteringProfile: Schema.Schema<UrlFilteringProfile> = Schema.suspend(() => Schema.Struct({
  urlFilters: Schema.optional(Schema.Array(UrlFilter)),
})).annotate({ identifier: "UrlFilteringProfile" }) as any as Schema.Schema<UrlFilteringProfile>;

export interface ThreatOverride {
  /** Output only. Type of the threat (read only). */
  type?: "THREAT_TYPE_UNSPECIFIED" | "UNKNOWN" | "VULNERABILITY" | "ANTIVIRUS" | "SPYWARE" | "DNS" | (string & {});
  /** Required. Vendor-specific ID of a threat to override. */
  threatId?: string;
  /** Required. Threat action override. For some threat types, only a subset of actions applies. */
  action?: "THREAT_ACTION_UNSPECIFIED" | "DEFAULT_ACTION" | "ALLOW" | "ALERT" | "DENY" | (string & {});
}

export const ThreatOverride: Schema.Schema<ThreatOverride> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  threatId: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "ThreatOverride" }) as any as Schema.Schema<ThreatOverride>;

export interface AntivirusOverride {
  /** Required. Threat action override. For some threat types, only a subset of actions applies. */
  action?: "THREAT_ACTION_UNSPECIFIED" | "DEFAULT_ACTION" | "ALLOW" | "ALERT" | "DENY" | (string & {});
  /** Required. Protocol to match. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "SMTP" | "SMB" | "POP3" | "IMAP" | "HTTP2" | "HTTP" | "FTP" | (string & {});
}

export const AntivirusOverride: Schema.Schema<AntivirusOverride> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "AntivirusOverride" }) as any as Schema.Schema<AntivirusOverride>;

export interface SeverityOverride {
  /** Required. Threat action override. */
  action?: "THREAT_ACTION_UNSPECIFIED" | "DEFAULT_ACTION" | "ALLOW" | "ALERT" | "DENY" | (string & {});
  /** Required. Severity level to match. */
  severity?: "SEVERITY_UNSPECIFIED" | "INFORMATIONAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
}

export const SeverityOverride: Schema.Schema<SeverityOverride> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "SeverityOverride" }) as any as Schema.Schema<SeverityOverride>;

export interface ThreatPreventionProfile {
  /** Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied. */
  threatOverrides?: Array<ThreatOverride>;
  /** Optional. Configuration for overriding antivirus actions per protocol. */
  antivirusOverrides?: Array<AntivirusOverride>;
  /** Optional. Configuration for overriding threats actions by severity match. */
  severityOverrides?: Array<SeverityOverride>;
}

export const ThreatPreventionProfile: Schema.Schema<ThreatPreventionProfile> = Schema.suspend(() => Schema.Struct({
  threatOverrides: Schema.optional(Schema.Array(ThreatOverride)),
  antivirusOverrides: Schema.optional(Schema.Array(AntivirusOverride)),
  severityOverrides: Schema.optional(Schema.Array(SeverityOverride)),
})).annotate({ identifier: "ThreatPreventionProfile" }) as any as Schema.Schema<ThreatPreventionProfile>;

export interface SecurityProfile {
  /** Optional. An optional description of the profile. Max length 512 characters. */
  description?: string;
  /** The custom Packet Mirroring v2 configuration for the SecurityProfile. */
  customMirroringProfile?: CustomMirroringProfile;
  /** Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/* /locations/{location}/securityProfiles/{security_profile}`. */
  name?: string;
  /** Output only. Resource creation timestamp. */
  createTime?: string;
  /** The custom TPPI configuration for the SecurityProfile. */
  customInterceptProfile?: CustomInterceptProfile;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** The URL filtering configuration for the SecurityProfile. */
  urlFilteringProfile?: UrlFilteringProfile;
  /** The threat prevention configuration for the SecurityProfile. */
  threatPreventionProfile?: ThreatPreventionProfile;
  /** Immutable. The single ProfileType that the SecurityProfile resource configures. */
  type?: "PROFILE_TYPE_UNSPECIFIED" | "THREAT_PREVENTION" | "CUSTOM_MIRRORING" | "CUSTOM_INTERCEPT" | "URL_FILTERING" | (string & {});
  /** Output only. Last resource update timestamp. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
}

export const SecurityProfile: Schema.Schema<SecurityProfile> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  customMirroringProfile: Schema.optional(CustomMirroringProfile),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  customInterceptProfile: Schema.optional(CustomInterceptProfile),
  etag: Schema.optional(Schema.String),
  urlFilteringProfile: Schema.optional(UrlFilteringProfile),
  threatPreventionProfile: Schema.optional(ThreatPreventionProfile),
  type: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SecurityProfile" }) as any as Schema.Schema<SecurityProfile>;

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

export interface RemoveAddressGroupItemsRequest {
  /** Required. List of items to remove. */
  items?: Array<string>;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RemoveAddressGroupItemsRequest: Schema.Schema<RemoveAddressGroupItemsRequest> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Schema.String)),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveAddressGroupItemsRequest" }) as any as Schema.Schema<RemoveAddressGroupItemsRequest>;

export interface GatewaySecurityPolicyRule {
  /** Optional. CEL expression for matching on L7/application level criteria. */
  applicationMatcher?: string;
  /** Output only. Time when the rule was updated. */
  updateTime?: string;
  /** Required. CEL expression for matching on session criteria. */
  sessionMatcher?: string;
  /** Required. Priority of the rule. Lower number corresponds to higher precedence. */
  priority?: number;
  /** Required. Whether the rule is enforced. */
  enabled?: boolean;
  /** Optional. Flag to enable TLS inspection of traffic matching on , can only be true if the parent GatewaySecurityPolicy references a TLSInspectionConfig. */
  tlsInspectionEnabled?: boolean;
  /** Required. Profile which tells what the primitive action should be. */
  basicProfile?: "BASIC_PROFILE_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Output only. Time when the rule was created. */
  createTime?: string;
  /** Required. Immutable. Name of the resource. ame is the full resource name so projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy}/rules/{rule} rule should match the pattern: (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
}

export const GatewaySecurityPolicyRule: Schema.Schema<GatewaySecurityPolicyRule> = Schema.suspend(() => Schema.Struct({
  applicationMatcher: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  sessionMatcher: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  enabled: Schema.optional(Schema.Boolean),
  tlsInspectionEnabled: Schema.optional(Schema.Boolean),
  basicProfile: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GatewaySecurityPolicyRule" }) as any as Schema.Schema<GatewaySecurityPolicyRule>;

export interface ListGatewaySecurityPolicyRulesResponse {
  /** List of GatewaySecurityPolicyRule resources. */
  gatewaySecurityPolicyRules?: Array<GatewaySecurityPolicyRule>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. */
  nextPageToken?: string;
}

export const ListGatewaySecurityPolicyRulesResponse: Schema.Schema<ListGatewaySecurityPolicyRulesResponse> = Schema.suspend(() => Schema.Struct({
  gatewaySecurityPolicyRules: Schema.optional(Schema.Array(GatewaySecurityPolicyRule)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGatewaySecurityPolicyRulesResponse" }) as any as Schema.Schema<ListGatewaySecurityPolicyRulesResponse>;

export interface ListSecurityProfilesResponse {
  /** List of SecurityProfile resources. */
  securityProfiles?: Array<SecurityProfile>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListSecurityProfilesResponse: Schema.Schema<ListSecurityProfilesResponse> = Schema.suspend(() => Schema.Struct({
  securityProfiles: Schema.optional(Schema.Array(SecurityProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSecurityProfilesResponse" }) as any as Schema.Schema<ListSecurityProfilesResponse>;

export interface InterceptDeployment {
  /** Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/interceptDeployments/my-dep`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. linking a new association to the parent group). See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Required. Immutable. The deployment group that this deployment is a part of, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  interceptDeploymentGroup?: string;
  /** Optional. User-provided description of the deployment. Used as additional context for the deployment. */
  description?: string;
  /** Required. Immutable. The regional forwarding rule that fronts the interceptors, for example: `projects/123456789/regions/us-central1/forwardingRules/my-rule`. See https://google.aip.dev/124. */
  forwardingRule?: string;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Output only. The current state of the deployment. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
}

export const InterceptDeployment: Schema.Schema<InterceptDeployment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  interceptDeploymentGroup: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptDeployment" }) as any as Schema.Schema<InterceptDeployment>;

export interface ListInterceptDeploymentsResponse {
  /** The deployments from the specified parent. */
  interceptDeployments?: Array<InterceptDeployment>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInterceptDeploymentsResponse: Schema.Schema<ListInterceptDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  interceptDeployments: Schema.optional(Schema.Array(InterceptDeployment)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInterceptDeploymentsResponse" }) as any as Schema.Schema<ListInterceptDeploymentsResponse>;

export interface ClientTlsPolicy {
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Optional. Defines a mechanism to provision client identity (public and private keys) for peer to peer authentication. The presence of this dictates mTLS. */
  clientCertificate?: GoogleCloudNetworksecurityV1CertificateProvider;
  /** Optional. Defines the mechanism to obtain the Certificate Authority certificate to validate the server certificate. If empty, client does not validate the server certificate. */
  serverValidationCa?: Array<ValidationCA>;
  /** Optional. Server Name Indication string to present to the server during TLS handshake. E.g: "secure.example.com". */
  sni?: string;
  /** Required. Name of the ClientTlsPolicy resource. It matches the pattern `projects/{project}/locations/{location}/clientTlsPolicies/{client_tls_policy}` */
  name?: string;
  /** Optional. Set of label tags associated with the resource. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
}

export const ClientTlsPolicy: Schema.Schema<ClientTlsPolicy> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  clientCertificate: Schema.optional(GoogleCloudNetworksecurityV1CertificateProvider),
  serverValidationCa: Schema.optional(Schema.Array(ValidationCA)),
  sni: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientTlsPolicy" }) as any as Schema.Schema<ClientTlsPolicy>;

export interface ListClientTlsPoliciesResponse {
  /** List of ClientTlsPolicy resources. */
  clientTlsPolicies?: Array<ClientTlsPolicy>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListClientTlsPoliciesResponse: Schema.Schema<ListClientTlsPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  clientTlsPolicies: Schema.optional(Schema.Array(ClientTlsPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientTlsPoliciesResponse" }) as any as Schema.Schema<ListClientTlsPoliciesResponse>;

export interface Destination {
  /** Optional. A list of HTTP methods to match. At least one method should match. Should not be set for gRPC services. */
  methods?: Array<string>;
  /** Optional. Match against key:value pair in http header. Provides a flexible match based on HTTP headers, for potentially advanced use cases. At least one header should match. Avoid using header matches to make authorization decisions unless there is a strong guarantee that requests arrive through a trusted client or proxy. */
  httpHeaderMatch?: HttpHeaderMatch;
  /** Required. List of destination ports to match. At least one port should match. */
  ports?: Array<number>;
  /** Required. List of host names to match. Matched against the ":authority" header in http requests. At least one host should match. Each host can be an exact match, or a prefix match (example "mydomain.*") or a suffix match (example "*.myorg.com") or a presence (any) match "*". */
  hosts?: Array<string>;
}

export const Destination: Schema.Schema<Destination> = Schema.suspend(() => Schema.Struct({
  methods: Schema.optional(Schema.Array(Schema.String)),
  httpHeaderMatch: Schema.optional(HttpHeaderMatch),
  ports: Schema.optional(Schema.Array(Schema.Number)),
  hosts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Destination" }) as any as Schema.Schema<Destination>;

export interface MirroringEndpointGroupAssociationLocationDetails {
  /** Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". */
  location?: string;
  /** Output only. The current state of the association in this location. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "OUT_OF_SYNC" | (string & {});
}

export const MirroringEndpointGroupAssociationLocationDetails: Schema.Schema<MirroringEndpointGroupAssociationLocationDetails> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringEndpointGroupAssociationLocationDetails" }) as any as Schema.Schema<MirroringEndpointGroupAssociationLocationDetails>;

export interface MirroringEndpointGroupAssociation {
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. adding a new location to the target deployment group). See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Output only. Current state of the endpoint group association. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "CLOSED" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Output only. The list of locations where the association is configured. This information is retrieved from the linked endpoint group. */
  locations?: Array<MirroringLocation>;
  /** Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Immutable. The VPC network that is associated. for example: `projects/123456789/global/networks/my-network`. See https://google.aip.dev/124. */
  network?: string;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Immutable. The endpoint group that this association is connected to, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/124. */
  mirroringEndpointGroup?: string;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Output only. The list of locations where the association is present. This information is retrieved from the linked endpoint group, and not configured as part of the association itself. */
  locationsDetails?: Array<MirroringEndpointGroupAssociationLocationDetails>;
}

export const MirroringEndpointGroupAssociation: Schema.Schema<MirroringEndpointGroupAssociation> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(MirroringLocation)),
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  mirroringEndpointGroup: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  locationsDetails: Schema.optional(Schema.Array(MirroringEndpointGroupAssociationLocationDetails)),
})).annotate({ identifier: "MirroringEndpointGroupAssociation" }) as any as Schema.Schema<MirroringEndpointGroupAssociation>;

export interface ListMirroringEndpointGroupAssociationsResponse {
  /** The associations from the specified parent. */
  mirroringEndpointGroupAssociations?: Array<MirroringEndpointGroupAssociation>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
}

export const ListMirroringEndpointGroupAssociationsResponse: Schema.Schema<ListMirroringEndpointGroupAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  mirroringEndpointGroupAssociations: Schema.optional(Schema.Array(MirroringEndpointGroupAssociation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMirroringEndpointGroupAssociationsResponse" }) as any as Schema.Schema<ListMirroringEndpointGroupAssociationsResponse>;

export interface MirroringEndpointGroupConnectedDeploymentGroup {
  /** Output only. The connected deployment group's resource name, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  name?: string;
  /** Output only. The list of locations where the deployment group is present. */
  locations?: Array<MirroringLocation>;
}

export const MirroringEndpointGroupConnectedDeploymentGroup: Schema.Schema<MirroringEndpointGroupConnectedDeploymentGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(MirroringLocation)),
})).annotate({ identifier: "MirroringEndpointGroupConnectedDeploymentGroup" }) as any as Schema.Schema<MirroringEndpointGroupConnectedDeploymentGroup>;

export interface TlsInspectionPolicy {
  /** Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Optional. If FALSE (the default), use our default set of public CAs in addition to any CAs specified in trust_config. These public CAs are currently based on the Mozilla Root Program and are subject to change over time. If TRUE, do not accept our default set of public CAs. Only CAs specified in trust_config will be accepted. This defaults to FALSE (use public CAs in addition to trust_config) for backwards compatibility, but trusting public root CAs is *not recommended* unless the traffic in question is outbound to public web servers. When possible, prefer setting this to "false" and explicitly specifying trusted CAs and certificates in a TrustConfig. Note that Secure Web Proxy does not yet honor this field. */
  excludePublicCaSet?: boolean;
  /** Optional. A TrustConfig resource used when making a connection to the TLS server. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". This is necessary to intercept TLS connections to servers with certificates signed by a private CA or self-signed certificates. Note that Secure Web Proxy does not yet honor this field. */
  trustConfig?: string;
  /** Required. A CA pool resource used to issue interception certificates. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}". */
  caPool?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Optional. The selected Profile. If this is not set, then the default value is to allow the broadest set of clients and servers ("PROFILE_COMPATIBLE"). Setting this to more restrictive values may improve security, but may also prevent the TLS inspection proxy from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field. */
  tlsFeatureProfile?: "PROFILE_UNSPECIFIED" | "PROFILE_COMPATIBLE" | "PROFILE_MODERN" | "PROFILE_RESTRICTED" | "PROFILE_CUSTOM" | (string & {});
  /** Optional. List of custom TLS cipher suites selected. This field is valid only if the selected tls_feature_profile is CUSTOM. The compute.SslPoliciesService.ListAvailableFeatures method returns the set of features that can be specified in this list. Note that Secure Web Proxy does not yet honor this field. */
  customTlsFeatures?: Array<string>;
  /** Optional. Minimum TLS version that the firewall should use when negotiating connections with both clients and servers. If this is not set, then the default value is to allow the broadest set of clients and servers (TLS 1.0 or higher). Setting this to more restrictive values may improve security, but may also prevent the firewall from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field. */
  minTlsVersion?: "TLS_VERSION_UNSPECIFIED" | "TLS_1_0" | "TLS_1_1" | "TLS_1_2" | "TLS_1_3" | (string & {});
}

export const TlsInspectionPolicy: Schema.Schema<TlsInspectionPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  excludePublicCaSet: Schema.optional(Schema.Boolean),
  trustConfig: Schema.optional(Schema.String),
  caPool: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  tlsFeatureProfile: Schema.optional(Schema.String),
  customTlsFeatures: Schema.optional(Schema.Array(Schema.String)),
  minTlsVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "TlsInspectionPolicy" }) as any as Schema.Schema<TlsInspectionPolicy>;

export interface ListTlsInspectionPoliciesResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. */
  nextPageToken?: string;
  /** List of TlsInspectionPolicies resources. */
  tlsInspectionPolicies?: Array<TlsInspectionPolicy>;
}

export const ListTlsInspectionPoliciesResponse: Schema.Schema<ListTlsInspectionPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  tlsInspectionPolicies: Schema.optional(Schema.Array(TlsInspectionPolicy)),
})).annotate({ identifier: "ListTlsInspectionPoliciesResponse" }) as any as Schema.Schema<ListTlsInspectionPoliciesResponse>;

export interface ListAddressGroupReferencesResponseAddressGroupReference {
  /** Cloud Armor SecurityPolicy that is using the Address Group. */
  securityPolicy?: string;
  /** Rule priority of the FirewallPolicy that is using the Address Group. */
  rulePriority?: number;
  /** FirewallPolicy that is using the Address Group. */
  firewallPolicy?: string;
}

export const ListAddressGroupReferencesResponseAddressGroupReference: Schema.Schema<ListAddressGroupReferencesResponseAddressGroupReference> = Schema.suspend(() => Schema.Struct({
  securityPolicy: Schema.optional(Schema.String),
  rulePriority: Schema.optional(Schema.Number),
  firewallPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAddressGroupReferencesResponseAddressGroupReference" }) as any as Schema.Schema<ListAddressGroupReferencesResponseAddressGroupReference>;

export interface InterceptEndpointGroupAssociationDetails {
  /** Output only. The associated network, for example: projects/123456789/global/networks/my-network. See https://google.aip.dev/124. */
  network?: string;
  /** Output only. The connected association's resource name, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-ega`. See https://google.aip.dev/124. */
  name?: string;
  /** Output only. Most recent known state of the association. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "CLOSED" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
}

export const InterceptEndpointGroupAssociationDetails: Schema.Schema<InterceptEndpointGroupAssociationDetails> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptEndpointGroupAssociationDetails" }) as any as Schema.Schema<InterceptEndpointGroupAssociationDetails>;

export interface InterceptLocation {
  /** Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". */
  location?: string;
  /** Output only. The current state of the association in this location. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "OUT_OF_SYNC" | (string & {});
}

export const InterceptLocation: Schema.Schema<InterceptLocation> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptLocation" }) as any as Schema.Schema<InterceptLocation>;

export interface InterceptEndpointGroupConnectedDeploymentGroup {
  /** Output only. The connected deployment group's resource name, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  name?: string;
  /** Output only. The list of locations where the deployment group is present. */
  locations?: Array<InterceptLocation>;
}

export const InterceptEndpointGroupConnectedDeploymentGroup: Schema.Schema<InterceptEndpointGroupConnectedDeploymentGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(InterceptLocation)),
})).annotate({ identifier: "InterceptEndpointGroupConnectedDeploymentGroup" }) as any as Schema.Schema<InterceptEndpointGroupConnectedDeploymentGroup>;

export interface InterceptEndpointGroup {
  /** Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Output only. List of associations to this endpoint group. */
  associations?: Array<InterceptEndpointGroupAssociationDetails>;
  /** Output only. The current state of the endpoint group. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CLOSED" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Required. Immutable. The deployment group that this endpoint group is connected to, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  interceptDeploymentGroup?: string;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new association to the group). See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Optional. User-provided description of the endpoint group. Used as additional context for the endpoint group. */
  description?: string;
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. Details about the connected deployment group to this endpoint group. */
  connectedDeploymentGroup?: InterceptEndpointGroupConnectedDeploymentGroup;
}

export const InterceptEndpointGroup: Schema.Schema<InterceptEndpointGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  associations: Schema.optional(Schema.Array(InterceptEndpointGroupAssociationDetails)),
  state: Schema.optional(Schema.String),
  interceptDeploymentGroup: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  connectedDeploymentGroup: Schema.optional(InterceptEndpointGroupConnectedDeploymentGroup),
})).annotate({ identifier: "InterceptEndpointGroup" }) as any as Schema.Schema<InterceptEndpointGroup>;

export interface FirewallEndpointAssociation {
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Required. The URL of the network that is being associated. */
  network?: string;
  /** Output only. Create time stamp */
  createTime?: string;
  /** Output only. Current state of the association. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "INACTIVE" | "ORPHAN" | (string & {});
  /** Output only. Update time stamp */
  updateTime?: string;
  /** Required. The URL of the FirewallEndpoint that is being associated. */
  firewallEndpoint?: string;
  /** Optional. The URL of the TlsInspectionPolicy that is being associated. */
  tlsInspectionPolicy?: string;
  /** Immutable. Identifier. name of resource */
  name?: string;
  /** Optional. Whether the association is disabled. True indicates that traffic won't be intercepted */
  disabled?: boolean;
  /** Output only. Whether reconciling is in progress, recommended per https://google.aip.dev/128. */
  reconciling?: boolean;
}

export const FirewallEndpointAssociation: Schema.Schema<FirewallEndpointAssociation> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  network: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  firewallEndpoint: Schema.optional(Schema.String),
  tlsInspectionPolicy: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  reconciling: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FirewallEndpointAssociation" }) as any as Schema.Schema<FirewallEndpointAssociation>;

export interface ListFirewallEndpointAssociationsResponse {
  /** The list of Association */
  firewallEndpointAssociations?: Array<FirewallEndpointAssociation>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListFirewallEndpointAssociationsResponse: Schema.Schema<ListFirewallEndpointAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  firewallEndpointAssociations: Schema.optional(Schema.Array(FirewallEndpointAssociation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListFirewallEndpointAssociationsResponse" }) as any as Schema.Schema<ListFirewallEndpointAssociationsResponse>;

export interface InterceptEndpointGroupAssociationLocationDetails {
  /** Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". */
  location?: string;
  /** Output only. The current state of the association in this location. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "OUT_OF_SYNC" | (string & {});
}

export const InterceptEndpointGroupAssociationLocationDetails: Schema.Schema<InterceptEndpointGroupAssociationLocationDetails> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptEndpointGroupAssociationLocationDetails" }) as any as Schema.Schema<InterceptEndpointGroupAssociationLocationDetails>;

export interface OperationMetadata {
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface InterceptDeploymentGroupDeployment {
  /** Output only. Most recent known state of the deployment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Output only. The name of the Intercept Deployment, in the format: `projects/{project}/locations/{location}/interceptDeployments/{intercept_deployment}`. */
  name?: string;
}

export const InterceptDeploymentGroupDeployment: Schema.Schema<InterceptDeploymentGroupDeployment> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptDeploymentGroupDeployment" }) as any as Schema.Schema<InterceptDeploymentGroupDeployment>;

export interface InterceptDeploymentGroup {
  /** Output only. The list of locations where the deployment group is present. */
  locations?: Array<InterceptLocation>;
  /** Output only. The list of endpoint groups that are connected to this resource. */
  connectedEndpointGroups?: Array<InterceptDeploymentGroupConnectedEndpointGroup>;
  /** Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Required. Immutable. The network that will be used for all child deployments, for example: `projects/{project}/global/networks/{network}`. See https://google.aip.dev/124. */
  network?: string;
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Optional. User-provided description of the deployment group. Used as additional context for the deployment group. */
  description?: string;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new deployment to the group) See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Output only. The list of Intercept Deployments that belong to this group. */
  nestedDeployments?: Array<InterceptDeploymentGroupDeployment>;
  /** Output only. The current state of the deployment group. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | (string & {});
}

export const InterceptDeploymentGroup: Schema.Schema<InterceptDeploymentGroup> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(InterceptLocation)),
  connectedEndpointGroups: Schema.optional(Schema.Array(InterceptDeploymentGroupConnectedEndpointGroup)),
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  nestedDeployments: Schema.optional(Schema.Array(InterceptDeploymentGroupDeployment)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "InterceptDeploymentGroup" }) as any as Schema.Schema<InterceptDeploymentGroup>;

export interface ListInterceptDeploymentGroupsResponse {
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
  /** The deployment groups from the specified parent. */
  interceptDeploymentGroups?: Array<InterceptDeploymentGroup>;
}

export const ListInterceptDeploymentGroupsResponse: Schema.Schema<ListInterceptDeploymentGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  interceptDeploymentGroups: Schema.optional(Schema.Array(InterceptDeploymentGroup)),
})).annotate({ identifier: "ListInterceptDeploymentGroupsResponse" }) as any as Schema.Schema<ListInterceptDeploymentGroupsResponse>;

export interface ListInterceptEndpointGroupsResponse {
  /** The endpoint groups from the specified parent. */
  interceptEndpointGroups?: Array<InterceptEndpointGroup>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
}

export const ListInterceptEndpointGroupsResponse: Schema.Schema<ListInterceptEndpointGroupsResponse> = Schema.suspend(() => Schema.Struct({
  interceptEndpointGroups: Schema.optional(Schema.Array(InterceptEndpointGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInterceptEndpointGroupsResponse" }) as any as Schema.Schema<ListInterceptEndpointGroupsResponse>;

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

export interface InterceptEndpointGroupAssociation {
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. Current state of the endpoint group association. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "CLOSED" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Required. Immutable. The endpoint group that this association is connected to, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/124. */
  interceptEndpointGroup?: string;
  /** Output only. The list of locations where the association is configured. This information is retrieved from the linked endpoint group. */
  locations?: Array<InterceptLocation>;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Required. Immutable. The VPC network that is associated. for example: `projects/123456789/global/networks/my-network`. See https://google.aip.dev/124. */
  network?: string;
  /** Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. adding a new location to the target deployment group). See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Output only. The list of locations where the association is present. This information is retrieved from the linked endpoint group, and not configured as part of the association itself. */
  locationsDetails?: Array<InterceptEndpointGroupAssociationLocationDetails>;
}

export const InterceptEndpointGroupAssociation: Schema.Schema<InterceptEndpointGroupAssociation> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  interceptEndpointGroup: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(InterceptLocation)),
  updateTime: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  locationsDetails: Schema.optional(Schema.Array(InterceptEndpointGroupAssociationLocationDetails)),
})).annotate({ identifier: "InterceptEndpointGroupAssociation" }) as any as Schema.Schema<InterceptEndpointGroupAssociation>;

export interface ListInterceptEndpointGroupAssociationsResponse {
  /** The associations from the specified parent. */
  interceptEndpointGroupAssociations?: Array<InterceptEndpointGroupAssociation>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
}

export const ListInterceptEndpointGroupAssociationsResponse: Schema.Schema<ListInterceptEndpointGroupAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  interceptEndpointGroupAssociations: Schema.optional(Schema.Array(InterceptEndpointGroupAssociation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInterceptEndpointGroupAssociationsResponse" }) as any as Schema.Schema<ListInterceptEndpointGroupAssociationsResponse>;

export interface Location {
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
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

export interface AddressGroup {
  /** Required. Capacity of the Address Group */
  capacity?: number;
  /** Optional. List of supported purposes of the Address Group. */
  purpose?: Array<"PURPOSE_UNSPECIFIED" | "DEFAULT" | "CLOUD_ARMOR" | (string & {})>;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. List of items. */
  items?: Array<string>;
  /** Optional. Set of label tags associated with the AddressGroup resource. */
  labels?: Record<string, string>;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Required. Name of the AddressGroup resource. It matches pattern `projects/* /locations/{location}/addressGroups/`. */
  name?: string;
  /** Output only. Server-defined fully-qualified URL for this resource. */
  selfLink?: string;
  /** Required. The type of the Address Group. Possible values are "IPv4" or "IPV6". */
  type?: "TYPE_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
}

export const AddressGroup: Schema.Schema<AddressGroup> = Schema.suspend(() => Schema.Struct({
  capacity: Schema.optional(Schema.Number),
  purpose: Schema.optional(Schema.Array(Schema.String)),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "AddressGroup" }) as any as Schema.Schema<AddressGroup>;

export interface UrlList {
  /** Output only. Time when the security policy was created. */
  createTime?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Output only. Time when the security policy was updated. */
  updateTime?: string;
  /** Required. FQDNs and URLs. */
  values?: Array<string>;
  /** Required. Name of the resource provided by the user. Name is of the form projects/{project}/locations/{location}/urlLists/{url_list} url_list should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name?: string;
}

export const UrlList: Schema.Schema<UrlList> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlList" }) as any as Schema.Schema<UrlList>;

export interface GatewaySecurityPolicy {
  /** Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy} gateway_security_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name?: string;
  /** Optional. Name of a TLS Inspection Policy resource that defines how TLS inspection will be performed for any rule(s) which enables it. */
  tlsInspectionPolicy?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
}

export const GatewaySecurityPolicy: Schema.Schema<GatewaySecurityPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tlsInspectionPolicy: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GatewaySecurityPolicy" }) as any as Schema.Schema<GatewaySecurityPolicy>;

export interface DnsThreatDetector {
  /** Optional. A list of network resource names which aren't monitored by this DnsThreatDetector. Example: `projects/PROJECT_ID/global/networks/NETWORK_NAME`. */
  excludedNetworks?: Array<string>;
  /** Required. The provider used for DNS threat analysis. */
  provider?: "PROVIDER_UNSPECIFIED" | "INFOBLOX" | (string & {});
  /** Optional. Any labels associated with the DnsThreatDetector, listed as key value pairs. */
  labels?: Record<string, string>;
  /** Output only. Create time stamp. */
  createTime?: string;
  /** Immutable. Identifier. Name of the DnsThreatDetector resource. */
  name?: string;
  /** Output only. Update time stamp. */
  updateTime?: string;
}

export const DnsThreatDetector: Schema.Schema<DnsThreatDetector> = Schema.suspend(() => Schema.Struct({
  excludedNetworks: Schema.optional(Schema.Array(Schema.String)),
  provider: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsThreatDetector" }) as any as Schema.Schema<DnsThreatDetector>;

export interface ListSecurityProfileGroupsResponse {
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** List of SecurityProfileGroups resources. */
  securityProfileGroups?: Array<SecurityProfileGroup>;
}

export const ListSecurityProfileGroupsResponse: Schema.Schema<ListSecurityProfileGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  securityProfileGroups: Schema.optional(Schema.Array(SecurityProfileGroup)),
})).annotate({ identifier: "ListSecurityProfileGroupsResponse" }) as any as Schema.Schema<ListSecurityProfileGroupsResponse>;

export interface MirroringEndpointGroupAssociationDetails {
  /** Output only. The connected association's resource name, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-ega`. See https://google.aip.dev/124. */
  name?: string;
  /** Output only. The associated network, for example: projects/123456789/global/networks/my-network. See https://google.aip.dev/124. */
  network?: string;
  /** Output only. Most recent known state of the association. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "CLOSED" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
}

export const MirroringEndpointGroupAssociationDetails: Schema.Schema<MirroringEndpointGroupAssociationDetails> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringEndpointGroupAssociationDetails" }) as any as Schema.Schema<MirroringEndpointGroupAssociationDetails>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AddAddressGroupItemsRequest {
  /** Required. List of items to add. */
  items?: Array<string>;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const AddAddressGroupItemsRequest: Schema.Schema<AddAddressGroupItemsRequest> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Schema.String)),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "AddAddressGroupItemsRequest" }) as any as Schema.Schema<AddAddressGroupItemsRequest>;

export interface ListGatewaySecurityPoliciesResponse {
  /** If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** List of GatewaySecurityPolicies resources. */
  gatewaySecurityPolicies?: Array<GatewaySecurityPolicy>;
}

export const ListGatewaySecurityPoliciesResponse: Schema.Schema<ListGatewaySecurityPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  gatewaySecurityPolicies: Schema.optional(Schema.Array(GatewaySecurityPolicy)),
})).annotate({ identifier: "ListGatewaySecurityPoliciesResponse" }) as any as Schema.Schema<ListGatewaySecurityPoliciesResponse>;

export interface GoogleIamV1TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsResponse: Schema.Schema<GoogleIamV1TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsResponse" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsResponse>;

export interface CloneAddressGroupItemsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Source address group to clone items from. */
  sourceAddressGroup?: string;
}

export const CloneAddressGroupItemsRequest: Schema.Schema<CloneAddressGroupItemsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  sourceAddressGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "CloneAddressGroupItemsRequest" }) as any as Schema.Schema<CloneAddressGroupItemsRequest>;

export interface Rule {
  /** Optional. List of attributes for the traffic destination. All of the destinations must match. A destination is a match if a request matches all the specified hosts, ports, methods and headers. If not set, the action specified in the 'action' field will be applied without any rule checks for the destination. */
  destinations?: Array<Destination>;
  /** Optional. List of attributes for the traffic source. All of the sources must match. A source is a match if both principals and ip_blocks match. If not set, the action specified in the 'action' field will be applied without any rule checks for the source. */
  sources?: Array<Source>;
}

export const Rule: Schema.Schema<Rule> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Destination)),
  sources: Schema.optional(Schema.Array(Source)),
})).annotate({ identifier: "Rule" }) as any as Schema.Schema<Rule>;

export interface AuthorizationPolicy {
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. Set of label tags associated with the AuthorizationPolicy resource. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Required. The action to take when a rule match is found. Possible values are "ALLOW" or "DENY". */
  action?: "ACTION_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Required. Name of the AuthorizationPolicy resource. It matches pattern `projects/{project}/locations/{location}/authorizationPolicies/`. */
  name?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Optional. List of rules to match. Note that at least one of the rules must match in order for the action specified in the 'action' field to be taken. A rule is a match if there is a matching source and destination. If left blank, the action specified in the `action` field will be applied on every request. */
  rules?: Array<Rule>;
}

export const AuthorizationPolicy: Schema.Schema<AuthorizationPolicy> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(Rule)),
})).annotate({ identifier: "AuthorizationPolicy" }) as any as Schema.Schema<AuthorizationPolicy>;

export interface MirroringDeployment {
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The current state of the deployment. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/mirroringDeployments/my-dep`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Optional. User-provided description of the deployment. Used as additional context for the deployment. */
  description?: string;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Required. Immutable. The regional forwarding rule that fronts the mirroring collectors, for example: `projects/123456789/regions/us-central1/forwardingRules/my-rule`. See https://google.aip.dev/124. */
  forwardingRule?: string;
  /** Required. Immutable. The deployment group that this deployment is a part of, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  mirroringDeploymentGroup?: string;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. linking a new association to the parent group). See https://google.aip.dev/128. */
  reconciling?: boolean;
}

export const MirroringDeployment: Schema.Schema<MirroringDeployment> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
  mirroringDeploymentGroup: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MirroringDeployment" }) as any as Schema.Schema<MirroringDeployment>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListUrlListsResponse {
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** List of UrlList resources. */
  urlLists?: Array<UrlList>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListUrlListsResponse: Schema.Schema<ListUrlListsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  urlLists: Schema.optional(Schema.Array(UrlList)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListUrlListsResponse" }) as any as Schema.Schema<ListUrlListsResponse>;

export interface MirroringEndpointGroup {
  /** Output only. List of details about the connected deployment groups to this endpoint group. */
  connectedDeploymentGroups?: Array<MirroringEndpointGroupConnectedDeploymentGroup>;
  /** Immutable. The type of the endpoint group. If left unspecified, defaults to DIRECT. */
  type?: "TYPE_UNSPECIFIED" | "DIRECT" | (string & {});
  /** Immutable. The deployment group that this DIRECT endpoint group is connected to, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. */
  mirroringDeploymentGroup?: string;
  /** Output only. The current state of the endpoint group. See https://google.aip.dev/216. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CLOSED" | "CREATING" | "DELETING" | "OUT_OF_SYNC" | "DELETE_FAILED" | (string & {});
  /** Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. */
  name?: string;
  /** Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. */
  updateTime?: string;
  /** Output only. List of associations to this endpoint group. */
  associations?: Array<MirroringEndpointGroupAssociationDetails>;
  /** Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. */
  createTime?: string;
  /** Optional. Labels are key/value pairs that help to organize and filter resources. */
  labels?: Record<string, string>;
  /** Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new association to the group). See https://google.aip.dev/128. */
  reconciling?: boolean;
  /** Optional. User-provided description of the endpoint group. Used as additional context for the endpoint group. */
  description?: string;
}

export const MirroringEndpointGroup: Schema.Schema<MirroringEndpointGroup> = Schema.suspend(() => Schema.Struct({
  connectedDeploymentGroups: Schema.optional(Schema.Array(MirroringEndpointGroupConnectedDeploymentGroup)),
  type: Schema.optional(Schema.String),
  mirroringDeploymentGroup: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  associations: Schema.optional(Schema.Array(MirroringEndpointGroupAssociationDetails)),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "MirroringEndpointGroup" }) as any as Schema.Schema<MirroringEndpointGroup>;

export interface ListMirroringDeploymentsResponse {
  /** The deployments from the specified parent. */
  mirroringDeployments?: Array<MirroringDeployment>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
}

export const ListMirroringDeploymentsResponse: Schema.Schema<ListMirroringDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  mirroringDeployments: Schema.optional(Schema.Array(MirroringDeployment)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMirroringDeploymentsResponse" }) as any as Schema.Schema<ListMirroringDeploymentsResponse>;

export interface ListAddressGroupReferencesResponse {
  /** A list of references that matches the specified filter in the request. */
  addressGroupReferences?: Array<ListAddressGroupReferencesResponseAddressGroupReference>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListAddressGroupReferencesResponse: Schema.Schema<ListAddressGroupReferencesResponse> = Schema.suspend(() => Schema.Struct({
  addressGroupReferences: Schema.optional(Schema.Array(ListAddressGroupReferencesResponseAddressGroupReference)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAddressGroupReferencesResponse" }) as any as Schema.Schema<ListAddressGroupReferencesResponse>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface BackendAuthenticationConfig {
  /** Optional. A reference to a certificatemanager.googleapis.com.Certificate resource. This is a relative resource path following the form "projects/{project}/locations/{location}/certificates/{certificate}". Used by a BackendService to negotiate mTLS when the backend connection uses TLS and the backend requests a client certificate. Must have a CLIENT_AUTH scope. */
  clientCertificate?: string;
  /** Optional. Free-text description of the resource. */
  description?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Output only. The timestamp when the resource was updated. */
  updateTime?: string;
  /** Set of label tags associated with the resource. */
  labels?: Record<string, string>;
  /** Well known roots to use for server certificate validation. */
  wellKnownRoots?: "WELL_KNOWN_ROOTS_UNSPECIFIED" | "NONE" | "PUBLIC_ROOTS" | (string & {});
  /** Output only. Etag of the resource. */
  etag?: string;
  /** Optional. A reference to a TrustConfig resource from the certificatemanager.googleapis.com namespace. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". A BackendService uses the chain of trust represented by this TrustConfig, if specified, to validate the server certificates presented by the backend. Required unless wellKnownRoots is set to PUBLIC_ROOTS. */
  trustConfig?: string;
  /** Required. Name of the BackendAuthenticationConfig resource. It matches the pattern `projects/* /locations/{location}/backendAuthenticationConfigs/{backend_authentication_config}` */
  name?: string;
}

export const BackendAuthenticationConfig: Schema.Schema<BackendAuthenticationConfig> = Schema.suspend(() => Schema.Struct({
  clientCertificate: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  wellKnownRoots: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  trustConfig: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "BackendAuthenticationConfig" }) as any as Schema.Schema<BackendAuthenticationConfig>;

export interface ListBackendAuthenticationConfigsResponse {
  /** List of BackendAuthenticationConfig resources. */
  backendAuthenticationConfigs?: Array<BackendAuthenticationConfig>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBackendAuthenticationConfigsResponse: Schema.Schema<ListBackendAuthenticationConfigsResponse> = Schema.suspend(() => Schema.Struct({
  backendAuthenticationConfigs: Schema.optional(Schema.Array(BackendAuthenticationConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListBackendAuthenticationConfigsResponse" }) as any as Schema.Schema<ListBackendAuthenticationConfigsResponse>;

export interface ListDnsThreatDetectorsResponse {
  /** Unordered list. Unreachable `DnsThreatDetector` resources. */
  unreachable?: Array<string>;
  /** A token, which can be sent as `page_token`, to retrieve the next page. */
  nextPageToken?: string;
  /** The list of DnsThreatDetector resources. */
  dnsThreatDetectors?: Array<DnsThreatDetector>;
}

export const ListDnsThreatDetectorsResponse: Schema.Schema<ListDnsThreatDetectorsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  dnsThreatDetectors: Schema.optional(Schema.Array(DnsThreatDetector)),
})).annotate({ identifier: "ListDnsThreatDetectorsResponse" }) as any as Schema.Schema<ListDnsThreatDetectorsResponse>;

export interface ListAuthorizationPoliciesResponse {
  /** List of AuthorizationPolicies resources. */
  authorizationPolicies?: Array<AuthorizationPolicy>;
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
}

export const ListAuthorizationPoliciesResponse: Schema.Schema<ListAuthorizationPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  authorizationPolicies: Schema.optional(Schema.Array(AuthorizationPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAuthorizationPoliciesResponse" }) as any as Schema.Schema<ListAuthorizationPoliciesResponse>;

export interface ListAddressGroupsResponse {
  /** If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. */
  nextPageToken?: string;
  /** List of AddressGroups resources. */
  addressGroups?: Array<AddressGroup>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAddressGroupsResponse: Schema.Schema<ListAddressGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  addressGroups: Schema.optional(Schema.Array(AddressGroup)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAddressGroupsResponse" }) as any as Schema.Schema<ListAddressGroupsResponse>;

export interface ListMirroringEndpointGroupsResponse {
  /** The endpoint groups from the specified parent. */
  mirroringEndpointGroups?: Array<MirroringEndpointGroup>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. */
  nextPageToken?: string;
}

export const ListMirroringEndpointGroupsResponse: Schema.Schema<ListMirroringEndpointGroupsResponse> = Schema.suspend(() => Schema.Struct({
  mirroringEndpointGroups: Schema.optional(Schema.Array(MirroringEndpointGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMirroringEndpointGroupsResponse" }) as any as Schema.Schema<ListMirroringEndpointGroupsResponse>;

export interface GoogleIamV1TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsRequest: Schema.Schema<GoogleIamV1TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsRequest" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse = Operation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse = Empty;

export type DeleteOrganizationsLocationsOperationsError = CommonErrors;

export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Updates the parameters of a single SecurityProfile. */
export interface PatchOrganizationsLocationsSecurityProfilesRequest {
  /** Immutable. Identifier. Name of the SecurityProfile resource. It matches pattern `projects|organizations/* /locations/{location}/securityProfiles/{security_profile}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the SecurityProfile resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. */
  updateMask?: string;
  /** Request body */
  body?: SecurityProfile;
}

export const PatchOrganizationsLocationsSecurityProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SecurityProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfiles/{securityProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsSecurityProfilesRequest>;

export type PatchOrganizationsLocationsSecurityProfilesResponse = Operation;
export const PatchOrganizationsLocationsSecurityProfilesResponse = Operation;

export type PatchOrganizationsLocationsSecurityProfilesError = CommonErrors;

export const patchOrganizationsLocationsSecurityProfiles: API.OperationMethod<PatchOrganizationsLocationsSecurityProfilesRequest, PatchOrganizationsLocationsSecurityProfilesResponse, PatchOrganizationsLocationsSecurityProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsSecurityProfilesRequest,
  output: PatchOrganizationsLocationsSecurityProfilesResponse,
  errors: [],
}));

/** Lists SecurityProfiles in a given organization and location. */
export interface ListOrganizationsLocationsSecurityProfilesRequest {
  /** Optional. The value returned by the last `ListSecurityProfilesResponse` Indicates that this is a continuation of a prior `ListSecurityProfiles` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Maximum number of SecurityProfiles to return per call. */
  pageSize?: number;
  /** Required. The project or organization and location from which the SecurityProfiles should be listed, specified in the format `projects|organizations/* /locations/{location}`. */
  parent: string;
}

export const ListOrganizationsLocationsSecurityProfilesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfiles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsSecurityProfilesRequest>;

export type ListOrganizationsLocationsSecurityProfilesResponse = ListSecurityProfilesResponse;
export const ListOrganizationsLocationsSecurityProfilesResponse = ListSecurityProfilesResponse;

export type ListOrganizationsLocationsSecurityProfilesError = CommonErrors;

export const listOrganizationsLocationsSecurityProfiles = API.makePaginated(() => ({
  input: ListOrganizationsLocationsSecurityProfilesRequest,
  output: ListOrganizationsLocationsSecurityProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single SecurityProfile. */
export interface DeleteOrganizationsLocationsSecurityProfilesRequest {
  /** Optional. If client provided etag is out of date, delete will return FAILED_PRECONDITION error. */
  etag?: string;
  /** Required. A name of the SecurityProfile to delete. Must be in the format `projects|organizations/* /locations/{location}/securityProfiles/{security_profile_id}`. */
  name: string;
}

export const DeleteOrganizationsLocationsSecurityProfilesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfiles/{securityProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsSecurityProfilesRequest>;

export type DeleteOrganizationsLocationsSecurityProfilesResponse = Operation;
export const DeleteOrganizationsLocationsSecurityProfilesResponse = Operation;

export type DeleteOrganizationsLocationsSecurityProfilesError = CommonErrors;

export const deleteOrganizationsLocationsSecurityProfiles: API.OperationMethod<DeleteOrganizationsLocationsSecurityProfilesRequest, DeleteOrganizationsLocationsSecurityProfilesResponse, DeleteOrganizationsLocationsSecurityProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsSecurityProfilesRequest,
  output: DeleteOrganizationsLocationsSecurityProfilesResponse,
  errors: [],
}));

/** Creates a new SecurityProfile in a given organization and location. */
export interface CreateOrganizationsLocationsSecurityProfilesRequest {
  /** Required. The parent resource of the SecurityProfile. Must be in the format `projects|organizations/* /locations/{location}`. */
  parent: string;
  /** Required. Short name of the SecurityProfile resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile1". */
  securityProfileId?: string;
  /** Request body */
  body?: SecurityProfile;
}

export const CreateOrganizationsLocationsSecurityProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  securityProfileId: Schema.optional(Schema.String).pipe(T.HttpQuery("securityProfileId")),
  body: Schema.optional(SecurityProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsSecurityProfilesRequest>;

export type CreateOrganizationsLocationsSecurityProfilesResponse = Operation;
export const CreateOrganizationsLocationsSecurityProfilesResponse = Operation;

export type CreateOrganizationsLocationsSecurityProfilesError = CommonErrors;

export const createOrganizationsLocationsSecurityProfiles: API.OperationMethod<CreateOrganizationsLocationsSecurityProfilesRequest, CreateOrganizationsLocationsSecurityProfilesResponse, CreateOrganizationsLocationsSecurityProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsSecurityProfilesRequest,
  output: CreateOrganizationsLocationsSecurityProfilesResponse,
  errors: [],
}));

/** Gets details of a single SecurityProfile. */
export interface GetOrganizationsLocationsSecurityProfilesRequest {
  /** Required. A name of the SecurityProfile to get. Must be in the format `projects|organizations/* /locations/{location}/securityProfiles/{security_profile_id}`. */
  name: string;
}

export const GetOrganizationsLocationsSecurityProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfiles/{securityProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsSecurityProfilesRequest>;

export type GetOrganizationsLocationsSecurityProfilesResponse = SecurityProfile;
export const GetOrganizationsLocationsSecurityProfilesResponse = SecurityProfile;

export type GetOrganizationsLocationsSecurityProfilesError = CommonErrors;

export const getOrganizationsLocationsSecurityProfiles: API.OperationMethod<GetOrganizationsLocationsSecurityProfilesRequest, GetOrganizationsLocationsSecurityProfilesResponse, GetOrganizationsLocationsSecurityProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsSecurityProfilesRequest,
  output: GetOrganizationsLocationsSecurityProfilesResponse,
  errors: [],
}));

/** Update a single org Endpoint. */
export interface PatchOrganizationsLocationsFirewallEndpointsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the Endpoint resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Immutable. Identifier. Name of resource. */
  name: string;
  /** Request body */
  body?: FirewallEndpoint;
}

export const PatchOrganizationsLocationsFirewallEndpointsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(FirewallEndpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsFirewallEndpointsRequest>;

export type PatchOrganizationsLocationsFirewallEndpointsResponse = Operation;
export const PatchOrganizationsLocationsFirewallEndpointsResponse = Operation;

export type PatchOrganizationsLocationsFirewallEndpointsError = CommonErrors;

export const patchOrganizationsLocationsFirewallEndpoints: API.OperationMethod<PatchOrganizationsLocationsFirewallEndpointsRequest, PatchOrganizationsLocationsFirewallEndpointsResponse, PatchOrganizationsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsFirewallEndpointsRequest,
  output: PatchOrganizationsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Lists FirewallEndpoints in a given organization and location. */
export interface ListOrganizationsLocationsFirewallEndpointsRequest {
  /** Optional. Filtering results */
  filter?: string;
  /** Hint for how to order the results */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. Parent value for ListEndpointsRequest */
  parent: string;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListOrganizationsLocationsFirewallEndpointsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/firewallEndpoints" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsFirewallEndpointsRequest>;

export type ListOrganizationsLocationsFirewallEndpointsResponse = ListFirewallEndpointsResponse;
export const ListOrganizationsLocationsFirewallEndpointsResponse = ListFirewallEndpointsResponse;

export type ListOrganizationsLocationsFirewallEndpointsError = CommonErrors;

export const listOrganizationsLocationsFirewallEndpoints = API.makePaginated(() => ({
  input: ListOrganizationsLocationsFirewallEndpointsRequest,
  output: ListOrganizationsLocationsFirewallEndpointsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new FirewallEndpoint in a given organization and location. */
export interface CreateOrganizationsLocationsFirewallEndpointsRequest {
  /** Required. Id of the requesting object. If auto-generating Id server-side, remove this field and firewall_endpoint_id from the method_signature of Create RPC. */
  firewallEndpointId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Value for parent. */
  parent: string;
  /** Request body */
  body?: FirewallEndpoint;
}

export const CreateOrganizationsLocationsFirewallEndpointsRequest = Schema.Struct({
  firewallEndpointId: Schema.optional(Schema.String).pipe(T.HttpQuery("firewallEndpointId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(FirewallEndpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/firewallEndpoints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsFirewallEndpointsRequest>;

export type CreateOrganizationsLocationsFirewallEndpointsResponse = Operation;
export const CreateOrganizationsLocationsFirewallEndpointsResponse = Operation;

export type CreateOrganizationsLocationsFirewallEndpointsError = CommonErrors;

export const createOrganizationsLocationsFirewallEndpoints: API.OperationMethod<CreateOrganizationsLocationsFirewallEndpointsRequest, CreateOrganizationsLocationsFirewallEndpointsResponse, CreateOrganizationsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsFirewallEndpointsRequest,
  output: CreateOrganizationsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Deletes a single org Endpoint. */
export interface DeleteOrganizationsLocationsFirewallEndpointsRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteOrganizationsLocationsFirewallEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsFirewallEndpointsRequest>;

export type DeleteOrganizationsLocationsFirewallEndpointsResponse = Operation;
export const DeleteOrganizationsLocationsFirewallEndpointsResponse = Operation;

export type DeleteOrganizationsLocationsFirewallEndpointsError = CommonErrors;

export const deleteOrganizationsLocationsFirewallEndpoints: API.OperationMethod<DeleteOrganizationsLocationsFirewallEndpointsRequest, DeleteOrganizationsLocationsFirewallEndpointsResponse, DeleteOrganizationsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsFirewallEndpointsRequest,
  output: DeleteOrganizationsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Gets details of a single org Endpoint. */
export interface GetOrganizationsLocationsFirewallEndpointsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetOrganizationsLocationsFirewallEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsFirewallEndpointsRequest>;

export type GetOrganizationsLocationsFirewallEndpointsResponse = FirewallEndpoint;
export const GetOrganizationsLocationsFirewallEndpointsResponse = FirewallEndpoint;

export type GetOrganizationsLocationsFirewallEndpointsError = CommonErrors;

export const getOrganizationsLocationsFirewallEndpoints: API.OperationMethod<GetOrganizationsLocationsFirewallEndpointsRequest, GetOrganizationsLocationsFirewallEndpointsResponse, GetOrganizationsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsFirewallEndpointsRequest,
  output: GetOrganizationsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Updates the parameters of a single SecurityProfileGroup. */
export interface PatchOrganizationsLocationsSecurityProfileGroupsRequest {
  /** Immutable. Identifier. Name of the SecurityProfileGroup resource. It matches pattern `projects|organizations/* /locations/{location}/securityProfileGroups/{security_profile_group}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the SecurityProfileGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. */
  updateMask?: string;
  /** Request body */
  body?: SecurityProfileGroup;
}

export const PatchOrganizationsLocationsSecurityProfileGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SecurityProfileGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfileGroups/{securityProfileGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsSecurityProfileGroupsRequest>;

export type PatchOrganizationsLocationsSecurityProfileGroupsResponse = Operation;
export const PatchOrganizationsLocationsSecurityProfileGroupsResponse = Operation;

export type PatchOrganizationsLocationsSecurityProfileGroupsError = CommonErrors;

export const patchOrganizationsLocationsSecurityProfileGroups: API.OperationMethod<PatchOrganizationsLocationsSecurityProfileGroupsRequest, PatchOrganizationsLocationsSecurityProfileGroupsResponse, PatchOrganizationsLocationsSecurityProfileGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsSecurityProfileGroupsRequest,
  output: PatchOrganizationsLocationsSecurityProfileGroupsResponse,
  errors: [],
}));

/** Gets details of a single SecurityProfileGroup. */
export interface GetOrganizationsLocationsSecurityProfileGroupsRequest {
  /** Required. A name of the SecurityProfileGroup to get. Must be in the format `projects|organizations/* /locations/{location}/securityProfileGroups/{security_profile_group}`. */
  name: string;
}

export const GetOrganizationsLocationsSecurityProfileGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfileGroups/{securityProfileGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsSecurityProfileGroupsRequest>;

export type GetOrganizationsLocationsSecurityProfileGroupsResponse = SecurityProfileGroup;
export const GetOrganizationsLocationsSecurityProfileGroupsResponse = SecurityProfileGroup;

export type GetOrganizationsLocationsSecurityProfileGroupsError = CommonErrors;

export const getOrganizationsLocationsSecurityProfileGroups: API.OperationMethod<GetOrganizationsLocationsSecurityProfileGroupsRequest, GetOrganizationsLocationsSecurityProfileGroupsResponse, GetOrganizationsLocationsSecurityProfileGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsSecurityProfileGroupsRequest,
  output: GetOrganizationsLocationsSecurityProfileGroupsResponse,
  errors: [],
}));

/** Deletes a single SecurityProfileGroup. */
export interface DeleteOrganizationsLocationsSecurityProfileGroupsRequest {
  /** Optional. If client provided etag is out of date, delete will return FAILED_PRECONDITION error. */
  etag?: string;
  /** Required. A name of the SecurityProfileGroup to delete. Must be in the format `projects|organizations/* /locations/{location}/securityProfileGroups/{security_profile_group}`. */
  name: string;
}

export const DeleteOrganizationsLocationsSecurityProfileGroupsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfileGroups/{securityProfileGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsSecurityProfileGroupsRequest>;

export type DeleteOrganizationsLocationsSecurityProfileGroupsResponse = Operation;
export const DeleteOrganizationsLocationsSecurityProfileGroupsResponse = Operation;

export type DeleteOrganizationsLocationsSecurityProfileGroupsError = CommonErrors;

export const deleteOrganizationsLocationsSecurityProfileGroups: API.OperationMethod<DeleteOrganizationsLocationsSecurityProfileGroupsRequest, DeleteOrganizationsLocationsSecurityProfileGroupsResponse, DeleteOrganizationsLocationsSecurityProfileGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsSecurityProfileGroupsRequest,
  output: DeleteOrganizationsLocationsSecurityProfileGroupsResponse,
  errors: [],
}));

/** Creates a new SecurityProfileGroup in a given organization and location. */
export interface CreateOrganizationsLocationsSecurityProfileGroupsRequest {
  /** Required. The parent resource of the SecurityProfileGroup. Must be in the format `projects|organizations/* /locations/{location}`. */
  parent: string;
  /** Required. Short name of the SecurityProfileGroup resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "security_profile_group1". */
  securityProfileGroupId?: string;
  /** Request body */
  body?: SecurityProfileGroup;
}

export const CreateOrganizationsLocationsSecurityProfileGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  securityProfileGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("securityProfileGroupId")),
  body: Schema.optional(SecurityProfileGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfileGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsSecurityProfileGroupsRequest>;

export type CreateOrganizationsLocationsSecurityProfileGroupsResponse = Operation;
export const CreateOrganizationsLocationsSecurityProfileGroupsResponse = Operation;

export type CreateOrganizationsLocationsSecurityProfileGroupsError = CommonErrors;

export const createOrganizationsLocationsSecurityProfileGroups: API.OperationMethod<CreateOrganizationsLocationsSecurityProfileGroupsRequest, CreateOrganizationsLocationsSecurityProfileGroupsResponse, CreateOrganizationsLocationsSecurityProfileGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsSecurityProfileGroupsRequest,
  output: CreateOrganizationsLocationsSecurityProfileGroupsResponse,
  errors: [],
}));

/** Lists SecurityProfileGroups in a given organization and location. */
export interface ListOrganizationsLocationsSecurityProfileGroupsRequest {
  /** Optional. The value returned by the last `ListSecurityProfileGroupsResponse` Indicates that this is a continuation of a prior `ListSecurityProfileGroups` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project or organization and location from which the SecurityProfileGroups should be listed, specified in the format `projects|organizations/* /locations/{location}`. */
  parent: string;
  /** Optional. Maximum number of SecurityProfileGroups to return per call. */
  pageSize?: number;
}

export const ListOrganizationsLocationsSecurityProfileGroupsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/securityProfileGroups" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsSecurityProfileGroupsRequest>;

export type ListOrganizationsLocationsSecurityProfileGroupsResponse = ListSecurityProfileGroupsResponse;
export const ListOrganizationsLocationsSecurityProfileGroupsResponse = ListSecurityProfileGroupsResponse;

export type ListOrganizationsLocationsSecurityProfileGroupsError = CommonErrors;

export const listOrganizationsLocationsSecurityProfileGroups = API.makePaginated(() => ({
  input: ListOrganizationsLocationsSecurityProfileGroupsRequest,
  output: ListOrganizationsLocationsSecurityProfileGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Clones items from one address group to another. */
export interface CloneItemsOrganizationsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to clone items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: CloneAddressGroupItemsRequest;
}

export const CloneItemsOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(CloneAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:cloneItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloneItemsOrganizationsLocationsAddressGroupsRequest>;

export type CloneItemsOrganizationsLocationsAddressGroupsResponse = Operation;
export const CloneItemsOrganizationsLocationsAddressGroupsResponse = Operation;

export type CloneItemsOrganizationsLocationsAddressGroupsError = CommonErrors;

export const cloneItemsOrganizationsLocationsAddressGroups: API.OperationMethod<CloneItemsOrganizationsLocationsAddressGroupsRequest, CloneItemsOrganizationsLocationsAddressGroupsResponse, CloneItemsOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloneItemsOrganizationsLocationsAddressGroupsRequest,
  output: CloneItemsOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Removes items from an address group. */
export interface RemoveItemsOrganizationsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to remove items from. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: RemoveAddressGroupItemsRequest;
}

export const RemoveItemsOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(RemoveAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:removeItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveItemsOrganizationsLocationsAddressGroupsRequest>;

export type RemoveItemsOrganizationsLocationsAddressGroupsResponse = Operation;
export const RemoveItemsOrganizationsLocationsAddressGroupsResponse = Operation;

export type RemoveItemsOrganizationsLocationsAddressGroupsError = CommonErrors;

export const removeItemsOrganizationsLocationsAddressGroups: API.OperationMethod<RemoveItemsOrganizationsLocationsAddressGroupsRequest, RemoveItemsOrganizationsLocationsAddressGroupsResponse, RemoveItemsOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveItemsOrganizationsLocationsAddressGroupsRequest,
  output: RemoveItemsOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Lists references of an address group. */
export interface ListReferencesOrganizationsLocationsAddressGroupsRequest {
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** The maximum number of references to return. If unspecified, server will pick an appropriate default. Server may return fewer items than requested. A caller should only rely on response's next_page_token to determine if there are more AddressGroupUsers left to be queried. */
  pageSize?: number;
  /** Required. A name of the AddressGroup to clone items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
}

export const ListReferencesOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:listReferences" }),
  svc,
) as unknown as Schema.Schema<ListReferencesOrganizationsLocationsAddressGroupsRequest>;

export type ListReferencesOrganizationsLocationsAddressGroupsResponse = ListAddressGroupReferencesResponse;
export const ListReferencesOrganizationsLocationsAddressGroupsResponse = ListAddressGroupReferencesResponse;

export type ListReferencesOrganizationsLocationsAddressGroupsError = CommonErrors;

export const listReferencesOrganizationsLocationsAddressGroups = API.makePaginated(() => ({
  input: ListReferencesOrganizationsLocationsAddressGroupsRequest,
  output: ListReferencesOrganizationsLocationsAddressGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new address group in a given project and location. */
export interface CreateOrganizationsLocationsAddressGroupsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent resource of the AddressGroup. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Required. Short name of the AddressGroup resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". */
  addressGroupId?: string;
  /** Request body */
  body?: AddressGroup;
}

export const CreateOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  addressGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("addressGroupId")),
  body: Schema.optional(AddressGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsAddressGroupsRequest>;

export type CreateOrganizationsLocationsAddressGroupsResponse = Operation;
export const CreateOrganizationsLocationsAddressGroupsResponse = Operation;

export type CreateOrganizationsLocationsAddressGroupsError = CommonErrors;

export const createOrganizationsLocationsAddressGroups: API.OperationMethod<CreateOrganizationsLocationsAddressGroupsRequest, CreateOrganizationsLocationsAddressGroupsResponse, CreateOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsAddressGroupsRequest,
  output: CreateOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Deletes an address group. */
export interface DeleteOrganizationsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to delete. Must be in the format `projects/* /locations/{location}/addressGroups/*`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsAddressGroupsRequest>;

export type DeleteOrganizationsLocationsAddressGroupsResponse = Operation;
export const DeleteOrganizationsLocationsAddressGroupsResponse = Operation;

export type DeleteOrganizationsLocationsAddressGroupsError = CommonErrors;

export const deleteOrganizationsLocationsAddressGroups: API.OperationMethod<DeleteOrganizationsLocationsAddressGroupsRequest, DeleteOrganizationsLocationsAddressGroupsResponse, DeleteOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsAddressGroupsRequest,
  output: DeleteOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Updates parameters of an address group. */
export interface PatchOrganizationsLocationsAddressGroupsRequest {
  /** Required. Name of the AddressGroup resource. It matches pattern `projects/* /locations/{location}/addressGroups/`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the AddressGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: AddressGroup;
}

export const PatchOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(AddressGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsAddressGroupsRequest>;

export type PatchOrganizationsLocationsAddressGroupsResponse = Operation;
export const PatchOrganizationsLocationsAddressGroupsResponse = Operation;

export type PatchOrganizationsLocationsAddressGroupsError = CommonErrors;

export const patchOrganizationsLocationsAddressGroups: API.OperationMethod<PatchOrganizationsLocationsAddressGroupsRequest, PatchOrganizationsLocationsAddressGroupsResponse, PatchOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsAddressGroupsRequest,
  output: PatchOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Adds items to an address group. */
export interface AddItemsOrganizationsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to add items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: AddAddressGroupItemsRequest;
}

export const AddItemsOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(AddAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:addItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddItemsOrganizationsLocationsAddressGroupsRequest>;

export type AddItemsOrganizationsLocationsAddressGroupsResponse = Operation;
export const AddItemsOrganizationsLocationsAddressGroupsResponse = Operation;

export type AddItemsOrganizationsLocationsAddressGroupsError = CommonErrors;

export const addItemsOrganizationsLocationsAddressGroups: API.OperationMethod<AddItemsOrganizationsLocationsAddressGroupsRequest, AddItemsOrganizationsLocationsAddressGroupsResponse, AddItemsOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddItemsOrganizationsLocationsAddressGroupsRequest,
  output: AddItemsOrganizationsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Lists address groups in a given project and location. */
export interface ListOrganizationsLocationsAddressGroupsRequest {
  /** Optional. If true, allow partial responses for multi-regional Aggregated List requests. */
  returnPartialSuccess?: boolean;
  /** Required. The project and location from which the AddressGroups should be listed, specified in the format `projects/* /locations/{location}`. */
  parent: string;
  /** The value returned by the last `ListAddressGroupsResponse` Indicates that this is a continuation of a prior `ListAddressGroups` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Maximum number of AddressGroups to return per call. */
  pageSize?: number;
}

export const ListOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsAddressGroupsRequest>;

export type ListOrganizationsLocationsAddressGroupsResponse = ListAddressGroupsResponse;
export const ListOrganizationsLocationsAddressGroupsResponse = ListAddressGroupsResponse;

export type ListOrganizationsLocationsAddressGroupsError = CommonErrors;

export const listOrganizationsLocationsAddressGroups = API.makePaginated(() => ({
  input: ListOrganizationsLocationsAddressGroupsRequest,
  output: ListOrganizationsLocationsAddressGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single address group. */
export interface GetOrganizationsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to get. Must be in the format `projects/* /locations/{location}/addressGroups/*`. */
  name: string;
}

export const GetOrganizationsLocationsAddressGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/addressGroups/{addressGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsAddressGroupsRequest>;

export type GetOrganizationsLocationsAddressGroupsResponse = AddressGroup;
export const GetOrganizationsLocationsAddressGroupsResponse = AddressGroup;

export type GetOrganizationsLocationsAddressGroupsError = CommonErrors;

export const getOrganizationsLocationsAddressGroups: API.OperationMethod<GetOrganizationsLocationsAddressGroupsRequest, GetOrganizationsLocationsAddressGroupsResponse, GetOrganizationsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsAddressGroupsRequest,
  output: GetOrganizationsLocationsAddressGroupsResponse,
  errors: [],
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

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Lists endpoint groups in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsInterceptEndpointGroupsRequest {
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Required. The parent, which owns this collection of endpoint groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListInterceptEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
}

export const ListProjectsLocationsInterceptEndpointGroupsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInterceptEndpointGroupsRequest>;

export type ListProjectsLocationsInterceptEndpointGroupsResponse = ListInterceptEndpointGroupsResponse;
export const ListProjectsLocationsInterceptEndpointGroupsResponse = ListInterceptEndpointGroupsResponse;

export type ListProjectsLocationsInterceptEndpointGroupsError = CommonErrors;

export const listProjectsLocationsInterceptEndpointGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsInterceptEndpointGroupsRequest,
  output: ListProjectsLocationsInterceptEndpointGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an endpoint group in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsInterceptEndpointGroupsRequest {
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The parent resource where this endpoint group will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the endpoint group, which will become the final component of the endpoint group's resource name. */
  interceptEndpointGroupId?: string;
  /** Request body */
  body?: InterceptEndpointGroup;
}

export const CreateProjectsLocationsInterceptEndpointGroupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  interceptEndpointGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("interceptEndpointGroupId")),
  body: Schema.optional(InterceptEndpointGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInterceptEndpointGroupsRequest>;

export type CreateProjectsLocationsInterceptEndpointGroupsResponse = Operation;
export const CreateProjectsLocationsInterceptEndpointGroupsResponse = Operation;

export type CreateProjectsLocationsInterceptEndpointGroupsError = CommonErrors;

export const createProjectsLocationsInterceptEndpointGroups: API.OperationMethod<CreateProjectsLocationsInterceptEndpointGroupsRequest, CreateProjectsLocationsInterceptEndpointGroupsResponse, CreateProjectsLocationsInterceptEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInterceptEndpointGroupsRequest,
  output: CreateProjectsLocationsInterceptEndpointGroupsResponse,
  errors: [],
}));

/** Updates an endpoint group. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsInterceptEndpointGroupsRequest {
  /** Optional. The list of fields to update. Fields are specified relative to the endpoint group (e.g. `description`; *not* `intercept_endpoint_group.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: InterceptEndpointGroup;
}

export const PatchProjectsLocationsInterceptEndpointGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(InterceptEndpointGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroups/{interceptEndpointGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInterceptEndpointGroupsRequest>;

export type PatchProjectsLocationsInterceptEndpointGroupsResponse = Operation;
export const PatchProjectsLocationsInterceptEndpointGroupsResponse = Operation;

export type PatchProjectsLocationsInterceptEndpointGroupsError = CommonErrors;

export const patchProjectsLocationsInterceptEndpointGroups: API.OperationMethod<PatchProjectsLocationsInterceptEndpointGroupsRequest, PatchProjectsLocationsInterceptEndpointGroupsResponse, PatchProjectsLocationsInterceptEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInterceptEndpointGroupsRequest,
  output: PatchProjectsLocationsInterceptEndpointGroupsResponse,
  errors: [],
}));

/** Deletes an endpoint group. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsInterceptEndpointGroupsRequest {
  /** Required. The endpoint group to delete. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsInterceptEndpointGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroups/{interceptEndpointGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInterceptEndpointGroupsRequest>;

export type DeleteProjectsLocationsInterceptEndpointGroupsResponse = Operation;
export const DeleteProjectsLocationsInterceptEndpointGroupsResponse = Operation;

export type DeleteProjectsLocationsInterceptEndpointGroupsError = CommonErrors;

export const deleteProjectsLocationsInterceptEndpointGroups: API.OperationMethod<DeleteProjectsLocationsInterceptEndpointGroupsRequest, DeleteProjectsLocationsInterceptEndpointGroupsResponse, DeleteProjectsLocationsInterceptEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInterceptEndpointGroupsRequest,
  output: DeleteProjectsLocationsInterceptEndpointGroupsResponse,
  errors: [],
}));

/** Gets a specific endpoint group. See https://google.aip.dev/131. */
export interface GetProjectsLocationsInterceptEndpointGroupsRequest {
  /** Required. The name of the endpoint group to retrieve. Format: projects/{project}/locations/{location}/interceptEndpointGroups/{intercept_endpoint_group} */
  name: string;
}

export const GetProjectsLocationsInterceptEndpointGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroups/{interceptEndpointGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInterceptEndpointGroupsRequest>;

export type GetProjectsLocationsInterceptEndpointGroupsResponse = InterceptEndpointGroup;
export const GetProjectsLocationsInterceptEndpointGroupsResponse = InterceptEndpointGroup;

export type GetProjectsLocationsInterceptEndpointGroupsError = CommonErrors;

export const getProjectsLocationsInterceptEndpointGroups: API.OperationMethod<GetProjectsLocationsInterceptEndpointGroupsRequest, GetProjectsLocationsInterceptEndpointGroupsResponse, GetProjectsLocationsInterceptEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInterceptEndpointGroupsRequest,
  output: GetProjectsLocationsInterceptEndpointGroupsResponse,
  errors: [],
}));

/** Lists deployment groups in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsInterceptDeploymentGroupsRequest {
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListInterceptDeploymentGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptDeploymentGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of deployment groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
}

export const ListProjectsLocationsInterceptDeploymentGroupsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeploymentGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInterceptDeploymentGroupsRequest>;

export type ListProjectsLocationsInterceptDeploymentGroupsResponse = ListInterceptDeploymentGroupsResponse;
export const ListProjectsLocationsInterceptDeploymentGroupsResponse = ListInterceptDeploymentGroupsResponse;

export type ListProjectsLocationsInterceptDeploymentGroupsError = CommonErrors;

export const listProjectsLocationsInterceptDeploymentGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsInterceptDeploymentGroupsRequest,
  output: ListProjectsLocationsInterceptDeploymentGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a deployment group. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsInterceptDeploymentGroupsRequest {
  /** Required. The deployment group to delete. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsInterceptDeploymentGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeploymentGroups/{interceptDeploymentGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInterceptDeploymentGroupsRequest>;

export type DeleteProjectsLocationsInterceptDeploymentGroupsResponse = Operation;
export const DeleteProjectsLocationsInterceptDeploymentGroupsResponse = Operation;

export type DeleteProjectsLocationsInterceptDeploymentGroupsError = CommonErrors;

export const deleteProjectsLocationsInterceptDeploymentGroups: API.OperationMethod<DeleteProjectsLocationsInterceptDeploymentGroupsRequest, DeleteProjectsLocationsInterceptDeploymentGroupsResponse, DeleteProjectsLocationsInterceptDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInterceptDeploymentGroupsRequest,
  output: DeleteProjectsLocationsInterceptDeploymentGroupsResponse,
  errors: [],
}));

/** Updates a deployment group. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsInterceptDeploymentGroupsRequest {
  /** Optional. The list of fields to update. Fields are specified relative to the deployment group (e.g. `description`; *not* `intercept_deployment_group.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Request body */
  body?: InterceptDeploymentGroup;
}

export const PatchProjectsLocationsInterceptDeploymentGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(InterceptDeploymentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeploymentGroups/{interceptDeploymentGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInterceptDeploymentGroupsRequest>;

export type PatchProjectsLocationsInterceptDeploymentGroupsResponse = Operation;
export const PatchProjectsLocationsInterceptDeploymentGroupsResponse = Operation;

export type PatchProjectsLocationsInterceptDeploymentGroupsError = CommonErrors;

export const patchProjectsLocationsInterceptDeploymentGroups: API.OperationMethod<PatchProjectsLocationsInterceptDeploymentGroupsRequest, PatchProjectsLocationsInterceptDeploymentGroupsResponse, PatchProjectsLocationsInterceptDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInterceptDeploymentGroupsRequest,
  output: PatchProjectsLocationsInterceptDeploymentGroupsResponse,
  errors: [],
}));

/** Creates a deployment group in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsInterceptDeploymentGroupsRequest {
  /** Required. The parent resource where this deployment group will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The ID to use for the new deployment group, which will become the final component of the deployment group's resource name. */
  interceptDeploymentGroupId?: string;
  /** Request body */
  body?: InterceptDeploymentGroup;
}

export const CreateProjectsLocationsInterceptDeploymentGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  interceptDeploymentGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("interceptDeploymentGroupId")),
  body: Schema.optional(InterceptDeploymentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeploymentGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInterceptDeploymentGroupsRequest>;

export type CreateProjectsLocationsInterceptDeploymentGroupsResponse = Operation;
export const CreateProjectsLocationsInterceptDeploymentGroupsResponse = Operation;

export type CreateProjectsLocationsInterceptDeploymentGroupsError = CommonErrors;

export const createProjectsLocationsInterceptDeploymentGroups: API.OperationMethod<CreateProjectsLocationsInterceptDeploymentGroupsRequest, CreateProjectsLocationsInterceptDeploymentGroupsResponse, CreateProjectsLocationsInterceptDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInterceptDeploymentGroupsRequest,
  output: CreateProjectsLocationsInterceptDeploymentGroupsResponse,
  errors: [],
}));

/** Gets a specific deployment group. See https://google.aip.dev/131. */
export interface GetProjectsLocationsInterceptDeploymentGroupsRequest {
  /** Required. The name of the deployment group to retrieve. Format: projects/{project}/locations/{location}/interceptDeploymentGroups/{intercept_deployment_group} */
  name: string;
}

export const GetProjectsLocationsInterceptDeploymentGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeploymentGroups/{interceptDeploymentGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInterceptDeploymentGroupsRequest>;

export type GetProjectsLocationsInterceptDeploymentGroupsResponse = InterceptDeploymentGroup;
export const GetProjectsLocationsInterceptDeploymentGroupsResponse = InterceptDeploymentGroup;

export type GetProjectsLocationsInterceptDeploymentGroupsError = CommonErrors;

export const getProjectsLocationsInterceptDeploymentGroups: API.OperationMethod<GetProjectsLocationsInterceptDeploymentGroupsRequest, GetProjectsLocationsInterceptDeploymentGroupsResponse, GetProjectsLocationsInterceptDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInterceptDeploymentGroupsRequest,
  output: GetProjectsLocationsInterceptDeploymentGroupsResponse,
  errors: [],
}));

/** Updates a deployment. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsInterceptDeploymentsRequest {
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/interceptDeployments/my-dep`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. The list of fields to update. Fields are specified relative to the deployment (e.g. `description`; *not* `intercept_deployment.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Request body */
  body?: InterceptDeployment;
}

export const PatchProjectsLocationsInterceptDeploymentsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InterceptDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeployments/{interceptDeploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInterceptDeploymentsRequest>;

export type PatchProjectsLocationsInterceptDeploymentsResponse = Operation;
export const PatchProjectsLocationsInterceptDeploymentsResponse = Operation;

export type PatchProjectsLocationsInterceptDeploymentsError = CommonErrors;

export const patchProjectsLocationsInterceptDeployments: API.OperationMethod<PatchProjectsLocationsInterceptDeploymentsRequest, PatchProjectsLocationsInterceptDeploymentsResponse, PatchProjectsLocationsInterceptDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInterceptDeploymentsRequest,
  output: PatchProjectsLocationsInterceptDeploymentsResponse,
  errors: [],
}));

/** Deletes a deployment. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsInterceptDeploymentsRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsInterceptDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeployments/{interceptDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInterceptDeploymentsRequest>;

export type DeleteProjectsLocationsInterceptDeploymentsResponse = Operation;
export const DeleteProjectsLocationsInterceptDeploymentsResponse = Operation;

export type DeleteProjectsLocationsInterceptDeploymentsError = CommonErrors;

export const deleteProjectsLocationsInterceptDeployments: API.OperationMethod<DeleteProjectsLocationsInterceptDeploymentsRequest, DeleteProjectsLocationsInterceptDeploymentsResponse, DeleteProjectsLocationsInterceptDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInterceptDeploymentsRequest,
  output: DeleteProjectsLocationsInterceptDeploymentsResponse,
  errors: [],
}));

/** Creates a deployment in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsInterceptDeploymentsRequest {
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The parent resource where this deployment will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the new deployment, which will become the final component of the deployment's resource name. */
  interceptDeploymentId?: string;
  /** Request body */
  body?: InterceptDeployment;
}

export const CreateProjectsLocationsInterceptDeploymentsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  interceptDeploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("interceptDeploymentId")),
  body: Schema.optional(InterceptDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInterceptDeploymentsRequest>;

export type CreateProjectsLocationsInterceptDeploymentsResponse = Operation;
export const CreateProjectsLocationsInterceptDeploymentsResponse = Operation;

export type CreateProjectsLocationsInterceptDeploymentsError = CommonErrors;

export const createProjectsLocationsInterceptDeployments: API.OperationMethod<CreateProjectsLocationsInterceptDeploymentsRequest, CreateProjectsLocationsInterceptDeploymentsResponse, CreateProjectsLocationsInterceptDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInterceptDeploymentsRequest,
  output: CreateProjectsLocationsInterceptDeploymentsResponse,
  errors: [],
}));

/** Gets a specific deployment. See https://google.aip.dev/131. */
export interface GetProjectsLocationsInterceptDeploymentsRequest {
  /** Required. The name of the deployment to retrieve. Format: projects/{project}/locations/{location}/interceptDeployments/{intercept_deployment} */
  name: string;
}

export const GetProjectsLocationsInterceptDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeployments/{interceptDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInterceptDeploymentsRequest>;

export type GetProjectsLocationsInterceptDeploymentsResponse = InterceptDeployment;
export const GetProjectsLocationsInterceptDeploymentsResponse = InterceptDeployment;

export type GetProjectsLocationsInterceptDeploymentsError = CommonErrors;

export const getProjectsLocationsInterceptDeployments: API.OperationMethod<GetProjectsLocationsInterceptDeploymentsRequest, GetProjectsLocationsInterceptDeploymentsResponse, GetProjectsLocationsInterceptDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInterceptDeploymentsRequest,
  output: GetProjectsLocationsInterceptDeploymentsResponse,
  errors: [],
}));

/** Lists deployments in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsInterceptDeploymentsRequest {
  /** Required. The parent, which owns this collection of deployments. Example: `projects/123456789/locations/us-central1-a`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. A page token, received from a previous `ListInterceptDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptDeployments` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
}

export const ListProjectsLocationsInterceptDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptDeployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInterceptDeploymentsRequest>;

export type ListProjectsLocationsInterceptDeploymentsResponse = ListInterceptDeploymentsResponse;
export const ListProjectsLocationsInterceptDeploymentsResponse = ListInterceptDeploymentsResponse;

export type ListProjectsLocationsInterceptDeploymentsError = CommonErrors;

export const listProjectsLocationsInterceptDeployments = API.makePaginated(() => ({
  input: ListProjectsLocationsInterceptDeploymentsRequest,
  output: ListProjectsLocationsInterceptDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a deployment. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsMirroringDeploymentsRequest {
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. Name of the resource */
  name: string;
}

export const DeleteProjectsLocationsMirroringDeploymentsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeployments/{mirroringDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMirroringDeploymentsRequest>;

export type DeleteProjectsLocationsMirroringDeploymentsResponse = Operation;
export const DeleteProjectsLocationsMirroringDeploymentsResponse = Operation;

export type DeleteProjectsLocationsMirroringDeploymentsError = CommonErrors;

export const deleteProjectsLocationsMirroringDeployments: API.OperationMethod<DeleteProjectsLocationsMirroringDeploymentsRequest, DeleteProjectsLocationsMirroringDeploymentsResponse, DeleteProjectsLocationsMirroringDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMirroringDeploymentsRequest,
  output: DeleteProjectsLocationsMirroringDeploymentsResponse,
  errors: [],
}));

/** Creates a deployment in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsMirroringDeploymentsRequest {
  /** Required. The parent resource where this deployment will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the new deployment, which will become the final component of the deployment's resource name. */
  mirroringDeploymentId?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: MirroringDeployment;
}

export const CreateProjectsLocationsMirroringDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  mirroringDeploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("mirroringDeploymentId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MirroringDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMirroringDeploymentsRequest>;

export type CreateProjectsLocationsMirroringDeploymentsResponse = Operation;
export const CreateProjectsLocationsMirroringDeploymentsResponse = Operation;

export type CreateProjectsLocationsMirroringDeploymentsError = CommonErrors;

export const createProjectsLocationsMirroringDeployments: API.OperationMethod<CreateProjectsLocationsMirroringDeploymentsRequest, CreateProjectsLocationsMirroringDeploymentsResponse, CreateProjectsLocationsMirroringDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMirroringDeploymentsRequest,
  output: CreateProjectsLocationsMirroringDeploymentsResponse,
  errors: [],
}));

/** Lists deployments in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsMirroringDeploymentsRequest {
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListMirroringDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringDeployments` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The parent, which owns this collection of deployments. Example: `projects/123456789/locations/us-central1-a`. See https://google.aip.dev/132 for more details. */
  parent: string;
}

export const ListProjectsLocationsMirroringDeploymentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMirroringDeploymentsRequest>;

export type ListProjectsLocationsMirroringDeploymentsResponse = ListMirroringDeploymentsResponse;
export const ListProjectsLocationsMirroringDeploymentsResponse = ListMirroringDeploymentsResponse;

export type ListProjectsLocationsMirroringDeploymentsError = CommonErrors;

export const listProjectsLocationsMirroringDeployments = API.makePaginated(() => ({
  input: ListProjectsLocationsMirroringDeploymentsRequest,
  output: ListProjectsLocationsMirroringDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a deployment. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsMirroringDeploymentsRequest {
  /** Optional. The list of fields to update. Fields are specified relative to the deployment (e.g. `description`; *not* `mirroring_deployment.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/mirroringDeployments/my-dep`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Request body */
  body?: MirroringDeployment;
}

export const PatchProjectsLocationsMirroringDeploymentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MirroringDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeployments/{mirroringDeploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMirroringDeploymentsRequest>;

export type PatchProjectsLocationsMirroringDeploymentsResponse = Operation;
export const PatchProjectsLocationsMirroringDeploymentsResponse = Operation;

export type PatchProjectsLocationsMirroringDeploymentsError = CommonErrors;

export const patchProjectsLocationsMirroringDeployments: API.OperationMethod<PatchProjectsLocationsMirroringDeploymentsRequest, PatchProjectsLocationsMirroringDeploymentsResponse, PatchProjectsLocationsMirroringDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMirroringDeploymentsRequest,
  output: PatchProjectsLocationsMirroringDeploymentsResponse,
  errors: [],
}));

/** Gets a specific deployment. See https://google.aip.dev/131. */
export interface GetProjectsLocationsMirroringDeploymentsRequest {
  /** Required. The name of the deployment to retrieve. Format: projects/{project}/locations/{location}/mirroringDeployments/{mirroring_deployment} */
  name: string;
}

export const GetProjectsLocationsMirroringDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeployments/{mirroringDeploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMirroringDeploymentsRequest>;

export type GetProjectsLocationsMirroringDeploymentsResponse = MirroringDeployment;
export const GetProjectsLocationsMirroringDeploymentsResponse = MirroringDeployment;

export type GetProjectsLocationsMirroringDeploymentsError = CommonErrors;

export const getProjectsLocationsMirroringDeployments: API.OperationMethod<GetProjectsLocationsMirroringDeploymentsRequest, GetProjectsLocationsMirroringDeploymentsResponse, GetProjectsLocationsMirroringDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMirroringDeploymentsRequest,
  output: GetProjectsLocationsMirroringDeploymentsResponse,
  errors: [],
}));

/** Deletes a single address group. */
export interface DeleteProjectsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to delete. Must be in the format `projects/* /locations/{location}/addressGroups/*`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsAddressGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAddressGroupsRequest>;

export type DeleteProjectsLocationsAddressGroupsResponse = Operation;
export const DeleteProjectsLocationsAddressGroupsResponse = Operation;

export type DeleteProjectsLocationsAddressGroupsError = CommonErrors;

export const deleteProjectsLocationsAddressGroups: API.OperationMethod<DeleteProjectsLocationsAddressGroupsRequest, DeleteProjectsLocationsAddressGroupsResponse, DeleteProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAddressGroupsRequest,
  output: DeleteProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Lists references of an address group. */
export interface ListReferencesProjectsLocationsAddressGroupsRequest {
  /** The maximum number of references to return. If unspecified, server will pick an appropriate default. Server may return fewer items than requested. A caller should only rely on response's next_page_token to determine if there are more AddressGroupUsers left to be queried. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. A name of the AddressGroup to clone items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
}

export const ListReferencesProjectsLocationsAddressGroupsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:listReferences" }),
  svc,
) as unknown as Schema.Schema<ListReferencesProjectsLocationsAddressGroupsRequest>;

export type ListReferencesProjectsLocationsAddressGroupsResponse = ListAddressGroupReferencesResponse;
export const ListReferencesProjectsLocationsAddressGroupsResponse = ListAddressGroupReferencesResponse;

export type ListReferencesProjectsLocationsAddressGroupsError = CommonErrors;

export const listReferencesProjectsLocationsAddressGroups = API.makePaginated(() => ({
  input: ListReferencesProjectsLocationsAddressGroupsRequest,
  output: ListReferencesProjectsLocationsAddressGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsAddressGroupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAddressGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAddressGroupsRequest>;

export type SetIamPolicyProjectsLocationsAddressGroupsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAddressGroupsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAddressGroupsError = CommonErrors;

export const setIamPolicyProjectsLocationsAddressGroups: API.OperationMethod<SetIamPolicyProjectsLocationsAddressGroupsRequest, SetIamPolicyProjectsLocationsAddressGroupsResponse, SetIamPolicyProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAddressGroupsRequest,
  output: SetIamPolicyProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Updates the parameters of a single address group. */
export interface PatchProjectsLocationsAddressGroupsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Name of the AddressGroup resource. It matches pattern `projects/* /locations/{location}/addressGroups/`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the AddressGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: AddressGroup;
}

export const PatchProjectsLocationsAddressGroupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddressGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAddressGroupsRequest>;

export type PatchProjectsLocationsAddressGroupsResponse = Operation;
export const PatchProjectsLocationsAddressGroupsResponse = Operation;

export type PatchProjectsLocationsAddressGroupsError = CommonErrors;

export const patchProjectsLocationsAddressGroups: API.OperationMethod<PatchProjectsLocationsAddressGroupsRequest, PatchProjectsLocationsAddressGroupsResponse, PatchProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAddressGroupsRequest,
  output: PatchProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Gets details of a single address group. */
export interface GetProjectsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to get. Must be in the format `projects/* /locations/{location}/addressGroups/*`. */
  name: string;
}

export const GetProjectsLocationsAddressGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAddressGroupsRequest>;

export type GetProjectsLocationsAddressGroupsResponse = AddressGroup;
export const GetProjectsLocationsAddressGroupsResponse = AddressGroup;

export type GetProjectsLocationsAddressGroupsError = CommonErrors;

export const getProjectsLocationsAddressGroups: API.OperationMethod<GetProjectsLocationsAddressGroupsRequest, GetProjectsLocationsAddressGroupsResponse, GetProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAddressGroupsRequest,
  output: GetProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Creates a new address group in a given project and location. */
export interface CreateProjectsLocationsAddressGroupsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent resource of the AddressGroup. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Required. Short name of the AddressGroup resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". */
  addressGroupId?: string;
  /** Request body */
  body?: AddressGroup;
}

export const CreateProjectsLocationsAddressGroupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  addressGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("addressGroupId")),
  body: Schema.optional(AddressGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAddressGroupsRequest>;

export type CreateProjectsLocationsAddressGroupsResponse = Operation;
export const CreateProjectsLocationsAddressGroupsResponse = Operation;

export type CreateProjectsLocationsAddressGroupsError = CommonErrors;

export const createProjectsLocationsAddressGroups: API.OperationMethod<CreateProjectsLocationsAddressGroupsRequest, CreateProjectsLocationsAddressGroupsResponse, CreateProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAddressGroupsRequest,
  output: CreateProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Clones items from one address group to another. */
export interface CloneItemsProjectsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to clone items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: CloneAddressGroupItemsRequest;
}

export const CloneItemsProjectsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(CloneAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:cloneItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloneItemsProjectsLocationsAddressGroupsRequest>;

export type CloneItemsProjectsLocationsAddressGroupsResponse = Operation;
export const CloneItemsProjectsLocationsAddressGroupsResponse = Operation;

export type CloneItemsProjectsLocationsAddressGroupsError = CommonErrors;

export const cloneItemsProjectsLocationsAddressGroups: API.OperationMethod<CloneItemsProjectsLocationsAddressGroupsRequest, CloneItemsProjectsLocationsAddressGroupsResponse, CloneItemsProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloneItemsProjectsLocationsAddressGroupsRequest,
  output: CloneItemsProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Lists address groups in a given project and location. */
export interface ListProjectsLocationsAddressGroupsRequest {
  /** Required. The project and location from which the AddressGroups should be listed, specified in the format `projects/* /locations/{location}`. */
  parent: string;
  /** The value returned by the last `ListAddressGroupsResponse` Indicates that this is a continuation of a prior `ListAddressGroups` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. If true, allow partial responses for multi-regional Aggregated List requests. */
  returnPartialSuccess?: boolean;
  /** Maximum number of AddressGroups to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsAddressGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAddressGroupsRequest>;

export type ListProjectsLocationsAddressGroupsResponse = ListAddressGroupsResponse;
export const ListProjectsLocationsAddressGroupsResponse = ListAddressGroupsResponse;

export type ListProjectsLocationsAddressGroupsError = CommonErrors;

export const listProjectsLocationsAddressGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsAddressGroupsRequest,
  output: ListProjectsLocationsAddressGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsAddressGroupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAddressGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAddressGroupsRequest>;

export type TestIamPermissionsProjectsLocationsAddressGroupsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAddressGroupsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAddressGroupsError = CommonErrors;

export const testIamPermissionsProjectsLocationsAddressGroups: API.OperationMethod<TestIamPermissionsProjectsLocationsAddressGroupsRequest, TestIamPermissionsProjectsLocationsAddressGroupsResponse, TestIamPermissionsProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAddressGroupsRequest,
  output: TestIamPermissionsProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsAddressGroupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAddressGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAddressGroupsRequest>;

export type GetIamPolicyProjectsLocationsAddressGroupsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAddressGroupsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAddressGroupsError = CommonErrors;

export const getIamPolicyProjectsLocationsAddressGroups: API.OperationMethod<GetIamPolicyProjectsLocationsAddressGroupsRequest, GetIamPolicyProjectsLocationsAddressGroupsResponse, GetIamPolicyProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAddressGroupsRequest,
  output: GetIamPolicyProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Removes items from an address group. */
export interface RemoveItemsProjectsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to remove items from. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: RemoveAddressGroupItemsRequest;
}

export const RemoveItemsProjectsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(RemoveAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:removeItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveItemsProjectsLocationsAddressGroupsRequest>;

export type RemoveItemsProjectsLocationsAddressGroupsResponse = Operation;
export const RemoveItemsProjectsLocationsAddressGroupsResponse = Operation;

export type RemoveItemsProjectsLocationsAddressGroupsError = CommonErrors;

export const removeItemsProjectsLocationsAddressGroups: API.OperationMethod<RemoveItemsProjectsLocationsAddressGroupsRequest, RemoveItemsProjectsLocationsAddressGroupsResponse, RemoveItemsProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveItemsProjectsLocationsAddressGroupsRequest,
  output: RemoveItemsProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Adds items to an address group. */
export interface AddItemsProjectsLocationsAddressGroupsRequest {
  /** Required. A name of the AddressGroup to add items to. Must be in the format `projects|organization/* /locations/{location}/addressGroups/*`. */
  addressGroup: string;
  /** Request body */
  body?: AddAddressGroupItemsRequest;
}

export const AddItemsProjectsLocationsAddressGroupsRequest = Schema.Struct({
  addressGroup: Schema.String.pipe(T.HttpPath("addressGroup")),
  body: Schema.optional(AddAddressGroupItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/addressGroups/{addressGroupsId}:addItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddItemsProjectsLocationsAddressGroupsRequest>;

export type AddItemsProjectsLocationsAddressGroupsResponse = Operation;
export const AddItemsProjectsLocationsAddressGroupsResponse = Operation;

export type AddItemsProjectsLocationsAddressGroupsError = CommonErrors;

export const addItemsProjectsLocationsAddressGroups: API.OperationMethod<AddItemsProjectsLocationsAddressGroupsRequest, AddItemsProjectsLocationsAddressGroupsResponse, AddItemsProjectsLocationsAddressGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddItemsProjectsLocationsAddressGroupsRequest,
  output: AddItemsProjectsLocationsAddressGroupsResponse,
  errors: [],
}));

/** Gets a specific association. See https://google.aip.dev/131. */
export interface GetProjectsLocationsMirroringEndpointGroupAssociationsRequest {
  /** Required. The name of the association to retrieve. Format: projects/{project}/locations/{location}/mirroringEndpointGroupAssociations/{mirroring_endpoint_group_association} */
  name: string;
}

export const GetProjectsLocationsMirroringEndpointGroupAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroupAssociations/{mirroringEndpointGroupAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMirroringEndpointGroupAssociationsRequest>;

export type GetProjectsLocationsMirroringEndpointGroupAssociationsResponse = MirroringEndpointGroupAssociation;
export const GetProjectsLocationsMirroringEndpointGroupAssociationsResponse = MirroringEndpointGroupAssociation;

export type GetProjectsLocationsMirroringEndpointGroupAssociationsError = CommonErrors;

export const getProjectsLocationsMirroringEndpointGroupAssociations: API.OperationMethod<GetProjectsLocationsMirroringEndpointGroupAssociationsRequest, GetProjectsLocationsMirroringEndpointGroupAssociationsResponse, GetProjectsLocationsMirroringEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMirroringEndpointGroupAssociationsRequest,
  output: GetProjectsLocationsMirroringEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Lists associations in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsMirroringEndpointGroupAssociationsRequest {
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The parent, which owns this collection of associations. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListMirroringEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
}

export const ListProjectsLocationsMirroringEndpointGroupAssociationsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroupAssociations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMirroringEndpointGroupAssociationsRequest>;

export type ListProjectsLocationsMirroringEndpointGroupAssociationsResponse = ListMirroringEndpointGroupAssociationsResponse;
export const ListProjectsLocationsMirroringEndpointGroupAssociationsResponse = ListMirroringEndpointGroupAssociationsResponse;

export type ListProjectsLocationsMirroringEndpointGroupAssociationsError = CommonErrors;

export const listProjectsLocationsMirroringEndpointGroupAssociations = API.makePaginated(() => ({
  input: ListProjectsLocationsMirroringEndpointGroupAssociationsRequest,
  output: ListProjectsLocationsMirroringEndpointGroupAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an association. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsMirroringEndpointGroupAssociationsRequest {
  /** Required. The association to delete. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsMirroringEndpointGroupAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroupAssociations/{mirroringEndpointGroupAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMirroringEndpointGroupAssociationsRequest>;

export type DeleteProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;
export const DeleteProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;

export type DeleteProjectsLocationsMirroringEndpointGroupAssociationsError = CommonErrors;

export const deleteProjectsLocationsMirroringEndpointGroupAssociations: API.OperationMethod<DeleteProjectsLocationsMirroringEndpointGroupAssociationsRequest, DeleteProjectsLocationsMirroringEndpointGroupAssociationsResponse, DeleteProjectsLocationsMirroringEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMirroringEndpointGroupAssociationsRequest,
  output: DeleteProjectsLocationsMirroringEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Updates an association. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsMirroringEndpointGroupAssociationsRequest {
  /** Optional. The list of fields to update. Fields are specified relative to the association (e.g. `description`; *not* `mirroring_endpoint_group_association.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: MirroringEndpointGroupAssociation;
}

export const PatchProjectsLocationsMirroringEndpointGroupAssociationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MirroringEndpointGroupAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroupAssociations/{mirroringEndpointGroupAssociationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMirroringEndpointGroupAssociationsRequest>;

export type PatchProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;
export const PatchProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;

export type PatchProjectsLocationsMirroringEndpointGroupAssociationsError = CommonErrors;

export const patchProjectsLocationsMirroringEndpointGroupAssociations: API.OperationMethod<PatchProjectsLocationsMirroringEndpointGroupAssociationsRequest, PatchProjectsLocationsMirroringEndpointGroupAssociationsResponse, PatchProjectsLocationsMirroringEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMirroringEndpointGroupAssociationsRequest,
  output: PatchProjectsLocationsMirroringEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Creates an association in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsMirroringEndpointGroupAssociationsRequest {
  /** Optional. The ID to use for the new association, which will become the final component of the endpoint group's resource name. If not provided, the server will generate a unique ID. */
  mirroringEndpointGroupAssociationId?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The parent resource where this association will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: MirroringEndpointGroupAssociation;
}

export const CreateProjectsLocationsMirroringEndpointGroupAssociationsRequest = Schema.Struct({
  mirroringEndpointGroupAssociationId: Schema.optional(Schema.String).pipe(T.HttpQuery("mirroringEndpointGroupAssociationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(MirroringEndpointGroupAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroupAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMirroringEndpointGroupAssociationsRequest>;

export type CreateProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;
export const CreateProjectsLocationsMirroringEndpointGroupAssociationsResponse = Operation;

export type CreateProjectsLocationsMirroringEndpointGroupAssociationsError = CommonErrors;

export const createProjectsLocationsMirroringEndpointGroupAssociations: API.OperationMethod<CreateProjectsLocationsMirroringEndpointGroupAssociationsRequest, CreateProjectsLocationsMirroringEndpointGroupAssociationsResponse, CreateProjectsLocationsMirroringEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMirroringEndpointGroupAssociationsRequest,
  output: CreateProjectsLocationsMirroringEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Deletes a single FirewallEndpointAssociation. */
export interface DeleteProjectsLocationsFirewallEndpointAssociationsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Name of the resource */
  name: string;
}

export const DeleteProjectsLocationsFirewallEndpointAssociationsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpointAssociations/{firewallEndpointAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsFirewallEndpointAssociationsRequest>;

export type DeleteProjectsLocationsFirewallEndpointAssociationsResponse = Operation;
export const DeleteProjectsLocationsFirewallEndpointAssociationsResponse = Operation;

export type DeleteProjectsLocationsFirewallEndpointAssociationsError = CommonErrors;

export const deleteProjectsLocationsFirewallEndpointAssociations: API.OperationMethod<DeleteProjectsLocationsFirewallEndpointAssociationsRequest, DeleteProjectsLocationsFirewallEndpointAssociationsResponse, DeleteProjectsLocationsFirewallEndpointAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsFirewallEndpointAssociationsRequest,
  output: DeleteProjectsLocationsFirewallEndpointAssociationsResponse,
  errors: [],
}));

/** Gets details of a single FirewallEndpointAssociation. */
export interface GetProjectsLocationsFirewallEndpointAssociationsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsFirewallEndpointAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpointAssociations/{firewallEndpointAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsFirewallEndpointAssociationsRequest>;

export type GetProjectsLocationsFirewallEndpointAssociationsResponse = FirewallEndpointAssociation;
export const GetProjectsLocationsFirewallEndpointAssociationsResponse = FirewallEndpointAssociation;

export type GetProjectsLocationsFirewallEndpointAssociationsError = CommonErrors;

export const getProjectsLocationsFirewallEndpointAssociations: API.OperationMethod<GetProjectsLocationsFirewallEndpointAssociationsRequest, GetProjectsLocationsFirewallEndpointAssociationsResponse, GetProjectsLocationsFirewallEndpointAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsFirewallEndpointAssociationsRequest,
  output: GetProjectsLocationsFirewallEndpointAssociationsResponse,
  errors: [],
}));

/** Update a single FirewallEndpointAssociation. */
export interface PatchProjectsLocationsFirewallEndpointAssociationsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the Association resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Immutable. Identifier. name of resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: FirewallEndpointAssociation;
}

export const PatchProjectsLocationsFirewallEndpointAssociationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(FirewallEndpointAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpointAssociations/{firewallEndpointAssociationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsFirewallEndpointAssociationsRequest>;

export type PatchProjectsLocationsFirewallEndpointAssociationsResponse = Operation;
export const PatchProjectsLocationsFirewallEndpointAssociationsResponse = Operation;

export type PatchProjectsLocationsFirewallEndpointAssociationsError = CommonErrors;

export const patchProjectsLocationsFirewallEndpointAssociations: API.OperationMethod<PatchProjectsLocationsFirewallEndpointAssociationsRequest, PatchProjectsLocationsFirewallEndpointAssociationsResponse, PatchProjectsLocationsFirewallEndpointAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsFirewallEndpointAssociationsRequest,
  output: PatchProjectsLocationsFirewallEndpointAssociationsResponse,
  errors: [],
}));

/** Creates a new FirewallEndpointAssociation in a given project and location. */
export interface CreateProjectsLocationsFirewallEndpointAssociationsRequest {
  /** Optional. Id of the requesting object. If auto-generating Id server-side, remove this field and firewall_endpoint_association_id from the method_signature of Create RPC. */
  firewallEndpointAssociationId?: string;
  /** Required. Value for parent. */
  parent: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: FirewallEndpointAssociation;
}

export const CreateProjectsLocationsFirewallEndpointAssociationsRequest = Schema.Struct({
  firewallEndpointAssociationId: Schema.optional(Schema.String).pipe(T.HttpQuery("firewallEndpointAssociationId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(FirewallEndpointAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpointAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsFirewallEndpointAssociationsRequest>;

export type CreateProjectsLocationsFirewallEndpointAssociationsResponse = Operation;
export const CreateProjectsLocationsFirewallEndpointAssociationsResponse = Operation;

export type CreateProjectsLocationsFirewallEndpointAssociationsError = CommonErrors;

export const createProjectsLocationsFirewallEndpointAssociations: API.OperationMethod<CreateProjectsLocationsFirewallEndpointAssociationsRequest, CreateProjectsLocationsFirewallEndpointAssociationsResponse, CreateProjectsLocationsFirewallEndpointAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsFirewallEndpointAssociationsRequest,
  output: CreateProjectsLocationsFirewallEndpointAssociationsResponse,
  errors: [],
}));

/** Lists Associations in a given project and location. */
export interface ListProjectsLocationsFirewallEndpointAssociationsRequest {
  /** Hint for how to order the results */
  orderBy?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Required. Parent value for ListAssociationsRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsFirewallEndpointAssociationsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpointAssociations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsFirewallEndpointAssociationsRequest>;

export type ListProjectsLocationsFirewallEndpointAssociationsResponse = ListFirewallEndpointAssociationsResponse;
export const ListProjectsLocationsFirewallEndpointAssociationsResponse = ListFirewallEndpointAssociationsResponse;

export type ListProjectsLocationsFirewallEndpointAssociationsError = CommonErrors;

export const listProjectsLocationsFirewallEndpointAssociations = API.makePaginated(() => ({
  input: ListProjectsLocationsFirewallEndpointAssociationsRequest,
  output: ListProjectsLocationsFirewallEndpointAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a deployment group. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsMirroringDeploymentGroupsRequest {
  /** Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Optional. The list of fields to update. Fields are specified relative to the deployment group (e.g. `description`; *not* `mirroring_deployment_group.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Request body */
  body?: MirroringDeploymentGroup;
}

export const PatchProjectsLocationsMirroringDeploymentGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(MirroringDeploymentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeploymentGroups/{mirroringDeploymentGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMirroringDeploymentGroupsRequest>;

export type PatchProjectsLocationsMirroringDeploymentGroupsResponse = Operation;
export const PatchProjectsLocationsMirroringDeploymentGroupsResponse = Operation;

export type PatchProjectsLocationsMirroringDeploymentGroupsError = CommonErrors;

export const patchProjectsLocationsMirroringDeploymentGroups: API.OperationMethod<PatchProjectsLocationsMirroringDeploymentGroupsRequest, PatchProjectsLocationsMirroringDeploymentGroupsResponse, PatchProjectsLocationsMirroringDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMirroringDeploymentGroupsRequest,
  output: PatchProjectsLocationsMirroringDeploymentGroupsResponse,
  errors: [],
}));

/** Lists deployment groups in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsMirroringDeploymentGroupsRequest {
  /** Required. The parent, which owns this collection of deployment groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListMirroringDeploymentGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringDeploymentGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
}

export const ListProjectsLocationsMirroringDeploymentGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeploymentGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMirroringDeploymentGroupsRequest>;

export type ListProjectsLocationsMirroringDeploymentGroupsResponse = ListMirroringDeploymentGroupsResponse;
export const ListProjectsLocationsMirroringDeploymentGroupsResponse = ListMirroringDeploymentGroupsResponse;

export type ListProjectsLocationsMirroringDeploymentGroupsError = CommonErrors;

export const listProjectsLocationsMirroringDeploymentGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsMirroringDeploymentGroupsRequest,
  output: ListProjectsLocationsMirroringDeploymentGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a deployment group in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsMirroringDeploymentGroupsRequest {
  /** Required. The parent resource where this deployment group will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the new deployment group, which will become the final component of the deployment group's resource name. */
  mirroringDeploymentGroupId?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: MirroringDeploymentGroup;
}

export const CreateProjectsLocationsMirroringDeploymentGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  mirroringDeploymentGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("mirroringDeploymentGroupId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MirroringDeploymentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeploymentGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMirroringDeploymentGroupsRequest>;

export type CreateProjectsLocationsMirroringDeploymentGroupsResponse = Operation;
export const CreateProjectsLocationsMirroringDeploymentGroupsResponse = Operation;

export type CreateProjectsLocationsMirroringDeploymentGroupsError = CommonErrors;

export const createProjectsLocationsMirroringDeploymentGroups: API.OperationMethod<CreateProjectsLocationsMirroringDeploymentGroupsRequest, CreateProjectsLocationsMirroringDeploymentGroupsResponse, CreateProjectsLocationsMirroringDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMirroringDeploymentGroupsRequest,
  output: CreateProjectsLocationsMirroringDeploymentGroupsResponse,
  errors: [],
}));

/** Deletes a deployment group. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsMirroringDeploymentGroupsRequest {
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The deployment group to delete. */
  name: string;
}

export const DeleteProjectsLocationsMirroringDeploymentGroupsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeploymentGroups/{mirroringDeploymentGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMirroringDeploymentGroupsRequest>;

export type DeleteProjectsLocationsMirroringDeploymentGroupsResponse = Operation;
export const DeleteProjectsLocationsMirroringDeploymentGroupsResponse = Operation;

export type DeleteProjectsLocationsMirroringDeploymentGroupsError = CommonErrors;

export const deleteProjectsLocationsMirroringDeploymentGroups: API.OperationMethod<DeleteProjectsLocationsMirroringDeploymentGroupsRequest, DeleteProjectsLocationsMirroringDeploymentGroupsResponse, DeleteProjectsLocationsMirroringDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMirroringDeploymentGroupsRequest,
  output: DeleteProjectsLocationsMirroringDeploymentGroupsResponse,
  errors: [],
}));

/** Gets a specific deployment group. See https://google.aip.dev/131. */
export interface GetProjectsLocationsMirroringDeploymentGroupsRequest {
  /** Required. The name of the deployment group to retrieve. Format: projects/{project}/locations/{location}/mirroringDeploymentGroups/{mirroring_deployment_group} */
  name: string;
}

export const GetProjectsLocationsMirroringDeploymentGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringDeploymentGroups/{mirroringDeploymentGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMirroringDeploymentGroupsRequest>;

export type GetProjectsLocationsMirroringDeploymentGroupsResponse = MirroringDeploymentGroup;
export const GetProjectsLocationsMirroringDeploymentGroupsResponse = MirroringDeploymentGroup;

export type GetProjectsLocationsMirroringDeploymentGroupsError = CommonErrors;

export const getProjectsLocationsMirroringDeploymentGroups: API.OperationMethod<GetProjectsLocationsMirroringDeploymentGroupsRequest, GetProjectsLocationsMirroringDeploymentGroupsResponse, GetProjectsLocationsMirroringDeploymentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMirroringDeploymentGroupsRequest,
  output: GetProjectsLocationsMirroringDeploymentGroupsResponse,
  errors: [],
}));

/** Creates a new DnsThreatDetector in a given project and location. */
export interface CreateProjectsLocationsDnsThreatDetectorsRequest {
  /** Optional. The ID of the requesting DnsThreatDetector object. If this field is not supplied, the service generates an identifier. */
  dnsThreatDetectorId?: string;
  /** Required. The value for the parent of the DnsThreatDetector resource. */
  parent: string;
  /** Request body */
  body?: DnsThreatDetector;
}

export const CreateProjectsLocationsDnsThreatDetectorsRequest = Schema.Struct({
  dnsThreatDetectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("dnsThreatDetectorId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DnsThreatDetector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsThreatDetectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDnsThreatDetectorsRequest>;

export type CreateProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;
export const CreateProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;

export type CreateProjectsLocationsDnsThreatDetectorsError = CommonErrors;

export const createProjectsLocationsDnsThreatDetectors: API.OperationMethod<CreateProjectsLocationsDnsThreatDetectorsRequest, CreateProjectsLocationsDnsThreatDetectorsResponse, CreateProjectsLocationsDnsThreatDetectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDnsThreatDetectorsRequest,
  output: CreateProjectsLocationsDnsThreatDetectorsResponse,
  errors: [],
}));

/** Deletes a single DnsThreatDetector. */
export interface DeleteProjectsLocationsDnsThreatDetectorsRequest {
  /** Required. Name of the DnsThreatDetector resource. */
  name: string;
}

export const DeleteProjectsLocationsDnsThreatDetectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsThreatDetectors/{dnsThreatDetectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDnsThreatDetectorsRequest>;

export type DeleteProjectsLocationsDnsThreatDetectorsResponse = Empty;
export const DeleteProjectsLocationsDnsThreatDetectorsResponse = Empty;

export type DeleteProjectsLocationsDnsThreatDetectorsError = CommonErrors;

export const deleteProjectsLocationsDnsThreatDetectors: API.OperationMethod<DeleteProjectsLocationsDnsThreatDetectorsRequest, DeleteProjectsLocationsDnsThreatDetectorsResponse, DeleteProjectsLocationsDnsThreatDetectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDnsThreatDetectorsRequest,
  output: DeleteProjectsLocationsDnsThreatDetectorsResponse,
  errors: [],
}));

/** Updates a single DnsThreatDetector. */
export interface PatchProjectsLocationsDnsThreatDetectorsRequest {
  /** Immutable. Identifier. Name of the DnsThreatDetector resource. */
  name: string;
  /** Optional. The field mask is used to specify the fields to be overwritten in the DnsThreatDetector resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the mask is not provided then all fields present in the request will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: DnsThreatDetector;
}

export const PatchProjectsLocationsDnsThreatDetectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DnsThreatDetector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsThreatDetectors/{dnsThreatDetectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDnsThreatDetectorsRequest>;

export type PatchProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;
export const PatchProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;

export type PatchProjectsLocationsDnsThreatDetectorsError = CommonErrors;

export const patchProjectsLocationsDnsThreatDetectors: API.OperationMethod<PatchProjectsLocationsDnsThreatDetectorsRequest, PatchProjectsLocationsDnsThreatDetectorsResponse, PatchProjectsLocationsDnsThreatDetectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDnsThreatDetectorsRequest,
  output: PatchProjectsLocationsDnsThreatDetectorsResponse,
  errors: [],
}));

/** Lists DnsThreatDetectors in a given project and location. */
export interface ListProjectsLocationsDnsThreatDetectorsRequest {
  /** Optional. A page token received from a previous `ListDnsThreatDetectorsRequest` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. The parent value for `ListDnsThreatDetectorsRequest`. */
  parent: string;
  /** Optional. The requested page size. The server may return fewer items than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsDnsThreatDetectorsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsThreatDetectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDnsThreatDetectorsRequest>;

export type ListProjectsLocationsDnsThreatDetectorsResponse = ListDnsThreatDetectorsResponse;
export const ListProjectsLocationsDnsThreatDetectorsResponse = ListDnsThreatDetectorsResponse;

export type ListProjectsLocationsDnsThreatDetectorsError = CommonErrors;

export const listProjectsLocationsDnsThreatDetectors = API.makePaginated(() => ({
  input: ListProjectsLocationsDnsThreatDetectorsRequest,
  output: ListProjectsLocationsDnsThreatDetectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a single DnsThreatDetector. */
export interface GetProjectsLocationsDnsThreatDetectorsRequest {
  /** Required. Name of the DnsThreatDetector resource. */
  name: string;
}

export const GetProjectsLocationsDnsThreatDetectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsThreatDetectors/{dnsThreatDetectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDnsThreatDetectorsRequest>;

export type GetProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;
export const GetProjectsLocationsDnsThreatDetectorsResponse = DnsThreatDetector;

export type GetProjectsLocationsDnsThreatDetectorsError = CommonErrors;

export const getProjectsLocationsDnsThreatDetectors: API.OperationMethod<GetProjectsLocationsDnsThreatDetectorsRequest, GetProjectsLocationsDnsThreatDetectorsResponse, GetProjectsLocationsDnsThreatDetectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDnsThreatDetectorsRequest,
  output: GetProjectsLocationsDnsThreatDetectorsResponse,
  errors: [],
}));

/** Creates a new FirewallEndpoint in a given project and location. */
export interface CreateProjectsLocationsFirewallEndpointsRequest {
  /** Required. Id of the requesting object. If auto-generating Id server-side, remove this field and firewall_endpoint_id from the method_signature of Create RPC. */
  firewallEndpointId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Value for parent. */
  parent: string;
  /** Request body */
  body?: FirewallEndpoint;
}

export const CreateProjectsLocationsFirewallEndpointsRequest = Schema.Struct({
  firewallEndpointId: Schema.optional(Schema.String).pipe(T.HttpQuery("firewallEndpointId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(FirewallEndpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpoints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsFirewallEndpointsRequest>;

export type CreateProjectsLocationsFirewallEndpointsResponse = Operation;
export const CreateProjectsLocationsFirewallEndpointsResponse = Operation;

export type CreateProjectsLocationsFirewallEndpointsError = CommonErrors;

export const createProjectsLocationsFirewallEndpoints: API.OperationMethod<CreateProjectsLocationsFirewallEndpointsRequest, CreateProjectsLocationsFirewallEndpointsResponse, CreateProjectsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsFirewallEndpointsRequest,
  output: CreateProjectsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Deletes a single project Endpoint. */
export interface DeleteProjectsLocationsFirewallEndpointsRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Name of the resource */
  name: string;
}

export const DeleteProjectsLocationsFirewallEndpointsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsFirewallEndpointsRequest>;

export type DeleteProjectsLocationsFirewallEndpointsResponse = Operation;
export const DeleteProjectsLocationsFirewallEndpointsResponse = Operation;

export type DeleteProjectsLocationsFirewallEndpointsError = CommonErrors;

export const deleteProjectsLocationsFirewallEndpoints: API.OperationMethod<DeleteProjectsLocationsFirewallEndpointsRequest, DeleteProjectsLocationsFirewallEndpointsResponse, DeleteProjectsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsFirewallEndpointsRequest,
  output: DeleteProjectsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Gets details of a single project Endpoint. */
export interface GetProjectsLocationsFirewallEndpointsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsFirewallEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsFirewallEndpointsRequest>;

export type GetProjectsLocationsFirewallEndpointsResponse = FirewallEndpoint;
export const GetProjectsLocationsFirewallEndpointsResponse = FirewallEndpoint;

export type GetProjectsLocationsFirewallEndpointsError = CommonErrors;

export const getProjectsLocationsFirewallEndpoints: API.OperationMethod<GetProjectsLocationsFirewallEndpointsRequest, GetProjectsLocationsFirewallEndpointsResponse, GetProjectsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsFirewallEndpointsRequest,
  output: GetProjectsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Update a single project Endpoint. */
export interface PatchProjectsLocationsFirewallEndpointsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the Endpoint resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Immutable. Identifier. Name of resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: FirewallEndpoint;
}

export const PatchProjectsLocationsFirewallEndpointsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(FirewallEndpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpoints/{firewallEndpointsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsFirewallEndpointsRequest>;

export type PatchProjectsLocationsFirewallEndpointsResponse = Operation;
export const PatchProjectsLocationsFirewallEndpointsResponse = Operation;

export type PatchProjectsLocationsFirewallEndpointsError = CommonErrors;

export const patchProjectsLocationsFirewallEndpoints: API.OperationMethod<PatchProjectsLocationsFirewallEndpointsRequest, PatchProjectsLocationsFirewallEndpointsResponse, PatchProjectsLocationsFirewallEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsFirewallEndpointsRequest,
  output: PatchProjectsLocationsFirewallEndpointsResponse,
  errors: [],
}));

/** Lists FirewallEndpoints in a given project and location. */
export interface ListProjectsLocationsFirewallEndpointsRequest {
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Required. Parent value for ListEndpointsRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsFirewallEndpointsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/firewallEndpoints" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsFirewallEndpointsRequest>;

export type ListProjectsLocationsFirewallEndpointsResponse = ListFirewallEndpointsResponse;
export const ListProjectsLocationsFirewallEndpointsResponse = ListFirewallEndpointsResponse;

export type ListProjectsLocationsFirewallEndpointsError = CommonErrors;

export const listProjectsLocationsFirewallEndpoints = API.makePaginated(() => ({
  input: ListProjectsLocationsFirewallEndpointsRequest,
  output: ListProjectsLocationsFirewallEndpointsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists UrlLists in a given project and location. */
export interface ListProjectsLocationsUrlListsRequest {
  /** The value returned by the last `ListUrlListsResponse` Indicates that this is a continuation of a prior `ListUrlLists` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project and location from which the UrlLists should be listed, specified in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Maximum number of UrlLists to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsUrlListsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/urlLists" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsUrlListsRequest>;

export type ListProjectsLocationsUrlListsResponse = ListUrlListsResponse;
export const ListProjectsLocationsUrlListsResponse = ListUrlListsResponse;

export type ListProjectsLocationsUrlListsError = CommonErrors;

export const listProjectsLocationsUrlLists = API.makePaginated(() => ({
  input: ListProjectsLocationsUrlListsRequest,
  output: ListProjectsLocationsUrlListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single UrlList. */
export interface GetProjectsLocationsUrlListsRequest {
  /** Required. A name of the UrlList to get. Must be in the format `projects/* /locations/{location}/urlLists/*`. */
  name: string;
}

export const GetProjectsLocationsUrlListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/urlLists/{urlListsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsUrlListsRequest>;

export type GetProjectsLocationsUrlListsResponse = UrlList;
export const GetProjectsLocationsUrlListsResponse = UrlList;

export type GetProjectsLocationsUrlListsError = CommonErrors;

export const getProjectsLocationsUrlLists: API.OperationMethod<GetProjectsLocationsUrlListsRequest, GetProjectsLocationsUrlListsResponse, GetProjectsLocationsUrlListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsUrlListsRequest,
  output: GetProjectsLocationsUrlListsResponse,
  errors: [],
}));

/** Updates the parameters of a single UrlList. */
export interface PatchProjectsLocationsUrlListsRequest {
  /** Required. Name of the resource provided by the user. Name is of the form projects/{project}/locations/{location}/urlLists/{url_list} url_list should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the UrlList resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: UrlList;
}

export const PatchProjectsLocationsUrlListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(UrlList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/urlLists/{urlListsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsUrlListsRequest>;

export type PatchProjectsLocationsUrlListsResponse = Operation;
export const PatchProjectsLocationsUrlListsResponse = Operation;

export type PatchProjectsLocationsUrlListsError = CommonErrors;

export const patchProjectsLocationsUrlLists: API.OperationMethod<PatchProjectsLocationsUrlListsRequest, PatchProjectsLocationsUrlListsResponse, PatchProjectsLocationsUrlListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsUrlListsRequest,
  output: PatchProjectsLocationsUrlListsResponse,
  errors: [],
}));

/** Creates a new UrlList in a given project and location. */
export interface CreateProjectsLocationsUrlListsRequest {
  /** Required. Short name of the UrlList resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "url_list". */
  urlListId?: string;
  /** Required. The parent resource of the UrlList. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Request body */
  body?: UrlList;
}

export const CreateProjectsLocationsUrlListsRequest = Schema.Struct({
  urlListId: Schema.optional(Schema.String).pipe(T.HttpQuery("urlListId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UrlList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/urlLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsUrlListsRequest>;

export type CreateProjectsLocationsUrlListsResponse = Operation;
export const CreateProjectsLocationsUrlListsResponse = Operation;

export type CreateProjectsLocationsUrlListsError = CommonErrors;

export const createProjectsLocationsUrlLists: API.OperationMethod<CreateProjectsLocationsUrlListsRequest, CreateProjectsLocationsUrlListsResponse, CreateProjectsLocationsUrlListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsUrlListsRequest,
  output: CreateProjectsLocationsUrlListsResponse,
  errors: [],
}));

/** Deletes a single UrlList. */
export interface DeleteProjectsLocationsUrlListsRequest {
  /** Required. A name of the UrlList to delete. Must be in the format `projects/* /locations/{location}/urlLists/*`. */
  name: string;
}

export const DeleteProjectsLocationsUrlListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/urlLists/{urlListsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsUrlListsRequest>;

export type DeleteProjectsLocationsUrlListsResponse = Operation;
export const DeleteProjectsLocationsUrlListsResponse = Operation;

export type DeleteProjectsLocationsUrlListsError = CommonErrors;

export const deleteProjectsLocationsUrlLists: API.OperationMethod<DeleteProjectsLocationsUrlListsRequest, DeleteProjectsLocationsUrlListsResponse, DeleteProjectsLocationsUrlListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsUrlListsRequest,
  output: DeleteProjectsLocationsUrlListsResponse,
  errors: [],
}));

/** Creates an endpoint group in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsMirroringEndpointGroupsRequest {
  /** Required. The parent resource where this endpoint group will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Required. The ID to use for the endpoint group, which will become the final component of the endpoint group's resource name. */
  mirroringEndpointGroupId?: string;
  /** Request body */
  body?: MirroringEndpointGroup;
}

export const CreateProjectsLocationsMirroringEndpointGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  mirroringEndpointGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("mirroringEndpointGroupId")),
  body: Schema.optional(MirroringEndpointGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMirroringEndpointGroupsRequest>;

export type CreateProjectsLocationsMirroringEndpointGroupsResponse = Operation;
export const CreateProjectsLocationsMirroringEndpointGroupsResponse = Operation;

export type CreateProjectsLocationsMirroringEndpointGroupsError = CommonErrors;

export const createProjectsLocationsMirroringEndpointGroups: API.OperationMethod<CreateProjectsLocationsMirroringEndpointGroupsRequest, CreateProjectsLocationsMirroringEndpointGroupsResponse, CreateProjectsLocationsMirroringEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMirroringEndpointGroupsRequest,
  output: CreateProjectsLocationsMirroringEndpointGroupsResponse,
  errors: [],
}));

/** Lists endpoint groups in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsMirroringEndpointGroupsRequest {
  /** Optional. A page token, received from a previous `ListMirroringEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Required. The parent, which owns this collection of endpoint groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
}

export const ListProjectsLocationsMirroringEndpointGroupsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMirroringEndpointGroupsRequest>;

export type ListProjectsLocationsMirroringEndpointGroupsResponse = ListMirroringEndpointGroupsResponse;
export const ListProjectsLocationsMirroringEndpointGroupsResponse = ListMirroringEndpointGroupsResponse;

export type ListProjectsLocationsMirroringEndpointGroupsError = CommonErrors;

export const listProjectsLocationsMirroringEndpointGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsMirroringEndpointGroupsRequest,
  output: ListProjectsLocationsMirroringEndpointGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an endpoint group. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsMirroringEndpointGroupsRequest {
  /** Required. The endpoint group to delete. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsMirroringEndpointGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroups/{mirroringEndpointGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMirroringEndpointGroupsRequest>;

export type DeleteProjectsLocationsMirroringEndpointGroupsResponse = Operation;
export const DeleteProjectsLocationsMirroringEndpointGroupsResponse = Operation;

export type DeleteProjectsLocationsMirroringEndpointGroupsError = CommonErrors;

export const deleteProjectsLocationsMirroringEndpointGroups: API.OperationMethod<DeleteProjectsLocationsMirroringEndpointGroupsRequest, DeleteProjectsLocationsMirroringEndpointGroupsResponse, DeleteProjectsLocationsMirroringEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMirroringEndpointGroupsRequest,
  output: DeleteProjectsLocationsMirroringEndpointGroupsResponse,
  errors: [],
}));

/** Gets a specific endpoint group. See https://google.aip.dev/131. */
export interface GetProjectsLocationsMirroringEndpointGroupsRequest {
  /** Required. The name of the endpoint group to retrieve. Format: projects/{project}/locations/{location}/mirroringEndpointGroups/{mirroring_endpoint_group} */
  name: string;
}

export const GetProjectsLocationsMirroringEndpointGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroups/{mirroringEndpointGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMirroringEndpointGroupsRequest>;

export type GetProjectsLocationsMirroringEndpointGroupsResponse = MirroringEndpointGroup;
export const GetProjectsLocationsMirroringEndpointGroupsResponse = MirroringEndpointGroup;

export type GetProjectsLocationsMirroringEndpointGroupsError = CommonErrors;

export const getProjectsLocationsMirroringEndpointGroups: API.OperationMethod<GetProjectsLocationsMirroringEndpointGroupsRequest, GetProjectsLocationsMirroringEndpointGroupsResponse, GetProjectsLocationsMirroringEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMirroringEndpointGroupsRequest,
  output: GetProjectsLocationsMirroringEndpointGroupsResponse,
  errors: [],
}));

/** Updates an endpoint group. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsMirroringEndpointGroupsRequest {
  /** Optional. The list of fields to update. Fields are specified relative to the endpoint group (e.g. `description`; *not* `mirroring_endpoint_group.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: MirroringEndpointGroup;
}

export const PatchProjectsLocationsMirroringEndpointGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MirroringEndpointGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/mirroringEndpointGroups/{mirroringEndpointGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMirroringEndpointGroupsRequest>;

export type PatchProjectsLocationsMirroringEndpointGroupsResponse = Operation;
export const PatchProjectsLocationsMirroringEndpointGroupsResponse = Operation;

export type PatchProjectsLocationsMirroringEndpointGroupsError = CommonErrors;

export const patchProjectsLocationsMirroringEndpointGroups: API.OperationMethod<PatchProjectsLocationsMirroringEndpointGroupsRequest, PatchProjectsLocationsMirroringEndpointGroupsResponse, PatchProjectsLocationsMirroringEndpointGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMirroringEndpointGroupsRequest,
  output: PatchProjectsLocationsMirroringEndpointGroupsResponse,
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Creates a new BackendAuthenticationConfig in a given project and location. */
export interface CreateProjectsLocationsBackendAuthenticationConfigsRequest {
  /** Required. Short name of the BackendAuthenticationConfig resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "backend-auth-config". */
  backendAuthenticationConfigId?: string;
  /** Required. The parent resource of the BackendAuthenticationConfig. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Request body */
  body?: BackendAuthenticationConfig;
}

export const CreateProjectsLocationsBackendAuthenticationConfigsRequest = Schema.Struct({
  backendAuthenticationConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("backendAuthenticationConfigId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BackendAuthenticationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/backendAuthenticationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBackendAuthenticationConfigsRequest>;

export type CreateProjectsLocationsBackendAuthenticationConfigsResponse = Operation;
export const CreateProjectsLocationsBackendAuthenticationConfigsResponse = Operation;

export type CreateProjectsLocationsBackendAuthenticationConfigsError = CommonErrors;

export const createProjectsLocationsBackendAuthenticationConfigs: API.OperationMethod<CreateProjectsLocationsBackendAuthenticationConfigsRequest, CreateProjectsLocationsBackendAuthenticationConfigsResponse, CreateProjectsLocationsBackendAuthenticationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsBackendAuthenticationConfigsRequest,
  output: CreateProjectsLocationsBackendAuthenticationConfigsResponse,
  errors: [],
}));

/** Updates the parameters of a single BackendAuthenticationConfig to BackendAuthenticationConfig. */
export interface PatchProjectsLocationsBackendAuthenticationConfigsRequest {
  /** Optional. Field mask is used to specify the fields to be overwritten in the BackendAuthenticationConfig resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Required. Name of the BackendAuthenticationConfig resource. It matches the pattern `projects/* /locations/{location}/backendAuthenticationConfigs/{backend_authentication_config}` */
  name: string;
  /** Request body */
  body?: BackendAuthenticationConfig;
}

export const PatchProjectsLocationsBackendAuthenticationConfigsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(BackendAuthenticationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/backendAuthenticationConfigs/{backendAuthenticationConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBackendAuthenticationConfigsRequest>;

export type PatchProjectsLocationsBackendAuthenticationConfigsResponse = Operation;
export const PatchProjectsLocationsBackendAuthenticationConfigsResponse = Operation;

export type PatchProjectsLocationsBackendAuthenticationConfigsError = CommonErrors;

export const patchProjectsLocationsBackendAuthenticationConfigs: API.OperationMethod<PatchProjectsLocationsBackendAuthenticationConfigsRequest, PatchProjectsLocationsBackendAuthenticationConfigsResponse, PatchProjectsLocationsBackendAuthenticationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsBackendAuthenticationConfigsRequest,
  output: PatchProjectsLocationsBackendAuthenticationConfigsResponse,
  errors: [],
}));

/** Deletes a single BackendAuthenticationConfig to BackendAuthenticationConfig. */
export interface DeleteProjectsLocationsBackendAuthenticationConfigsRequest {
  /** Optional. Etag of the resource. If this is provided, it must match the server's etag. */
  etag?: string;
  /** Required. A name of the BackendAuthenticationConfig to delete. Must be in the format `projects/* /locations/{location}/backendAuthenticationConfigs/*`. */
  name: string;
}

export const DeleteProjectsLocationsBackendAuthenticationConfigsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/backendAuthenticationConfigs/{backendAuthenticationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBackendAuthenticationConfigsRequest>;

export type DeleteProjectsLocationsBackendAuthenticationConfigsResponse = Operation;
export const DeleteProjectsLocationsBackendAuthenticationConfigsResponse = Operation;

export type DeleteProjectsLocationsBackendAuthenticationConfigsError = CommonErrors;

export const deleteProjectsLocationsBackendAuthenticationConfigs: API.OperationMethod<DeleteProjectsLocationsBackendAuthenticationConfigsRequest, DeleteProjectsLocationsBackendAuthenticationConfigsResponse, DeleteProjectsLocationsBackendAuthenticationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsBackendAuthenticationConfigsRequest,
  output: DeleteProjectsLocationsBackendAuthenticationConfigsResponse,
  errors: [],
}));

/** Gets details of a single BackendAuthenticationConfig to BackendAuthenticationConfig. */
export interface GetProjectsLocationsBackendAuthenticationConfigsRequest {
  /** Required. A name of the BackendAuthenticationConfig to get. Must be in the format `projects/* /locations/{location}/backendAuthenticationConfigs/*`. */
  name: string;
}

export const GetProjectsLocationsBackendAuthenticationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backendAuthenticationConfigs/{backendAuthenticationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBackendAuthenticationConfigsRequest>;

export type GetProjectsLocationsBackendAuthenticationConfigsResponse = BackendAuthenticationConfig;
export const GetProjectsLocationsBackendAuthenticationConfigsResponse = BackendAuthenticationConfig;

export type GetProjectsLocationsBackendAuthenticationConfigsError = CommonErrors;

export const getProjectsLocationsBackendAuthenticationConfigs: API.OperationMethod<GetProjectsLocationsBackendAuthenticationConfigsRequest, GetProjectsLocationsBackendAuthenticationConfigsResponse, GetProjectsLocationsBackendAuthenticationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsBackendAuthenticationConfigsRequest,
  output: GetProjectsLocationsBackendAuthenticationConfigsResponse,
  errors: [],
}));

/** Lists BackendAuthenticationConfigs in a given project and location. */
export interface ListProjectsLocationsBackendAuthenticationConfigsRequest {
  /** Required. The project and location from which the BackendAuthenticationConfigs should be listed, specified in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Maximum number of BackendAuthenticationConfigs to return per call. */
  pageSize?: number;
  /** The value returned by the last `ListBackendAuthenticationConfigsResponse` Indicates that this is a continuation of a prior `ListBackendAuthenticationConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsLocationsBackendAuthenticationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/backendAuthenticationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBackendAuthenticationConfigsRequest>;

export type ListProjectsLocationsBackendAuthenticationConfigsResponse = ListBackendAuthenticationConfigsResponse;
export const ListProjectsLocationsBackendAuthenticationConfigsResponse = ListBackendAuthenticationConfigsResponse;

export type ListProjectsLocationsBackendAuthenticationConfigsError = CommonErrors;

export const listProjectsLocationsBackendAuthenticationConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsBackendAuthenticationConfigsRequest,
  output: ListProjectsLocationsBackendAuthenticationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ClientTlsPolicy. */
export interface GetProjectsLocationsClientTlsPoliciesRequest {
  /** Required. A name of the ClientTlsPolicy to get. Must be in the format `projects/* /locations/{location}/clientTlsPolicies/*`. */
  name: string;
}

export const GetProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClientTlsPoliciesRequest>;

export type GetProjectsLocationsClientTlsPoliciesResponse = ClientTlsPolicy;
export const GetProjectsLocationsClientTlsPoliciesResponse = ClientTlsPolicy;

export type GetProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const getProjectsLocationsClientTlsPolicies: API.OperationMethod<GetProjectsLocationsClientTlsPoliciesRequest, GetProjectsLocationsClientTlsPoliciesResponse, GetProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClientTlsPoliciesRequest,
  output: GetProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsClientTlsPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsClientTlsPoliciesRequest>;

export type SetIamPolicyProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsClientTlsPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsClientTlsPoliciesRequest, SetIamPolicyProjectsLocationsClientTlsPoliciesResponse, SetIamPolicyProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsClientTlsPoliciesRequest,
  output: SetIamPolicyProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Deletes a single ClientTlsPolicy. */
export interface DeleteProjectsLocationsClientTlsPoliciesRequest {
  /** Required. A name of the ClientTlsPolicy to delete. Must be in the format `projects/* /locations/{location}/clientTlsPolicies/*`. */
  name: string;
}

export const DeleteProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClientTlsPoliciesRequest>;

export type DeleteProjectsLocationsClientTlsPoliciesResponse = Operation;
export const DeleteProjectsLocationsClientTlsPoliciesResponse = Operation;

export type DeleteProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const deleteProjectsLocationsClientTlsPolicies: API.OperationMethod<DeleteProjectsLocationsClientTlsPoliciesRequest, DeleteProjectsLocationsClientTlsPoliciesResponse, DeleteProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClientTlsPoliciesRequest,
  output: DeleteProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Creates a new ClientTlsPolicy in a given project and location. */
export interface CreateProjectsLocationsClientTlsPoliciesRequest {
  /** Required. Short name of the ClientTlsPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "client_mtls_policy". */
  clientTlsPolicyId?: string;
  /** Required. The parent resource of the ClientTlsPolicy. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Request body */
  body?: ClientTlsPolicy;
}

export const CreateProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  clientTlsPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientTlsPolicyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ClientTlsPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClientTlsPoliciesRequest>;

export type CreateProjectsLocationsClientTlsPoliciesResponse = Operation;
export const CreateProjectsLocationsClientTlsPoliciesResponse = Operation;

export type CreateProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const createProjectsLocationsClientTlsPolicies: API.OperationMethod<CreateProjectsLocationsClientTlsPoliciesRequest, CreateProjectsLocationsClientTlsPoliciesResponse, CreateProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClientTlsPoliciesRequest,
  output: CreateProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Updates the parameters of a single ClientTlsPolicy. */
export interface PatchProjectsLocationsClientTlsPoliciesRequest {
  /** Required. Name of the ClientTlsPolicy resource. It matches the pattern `projects/{project}/locations/{location}/clientTlsPolicies/{client_tls_policy}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ClientTlsPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ClientTlsPolicy;
}

export const PatchProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ClientTlsPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClientTlsPoliciesRequest>;

export type PatchProjectsLocationsClientTlsPoliciesResponse = Operation;
export const PatchProjectsLocationsClientTlsPoliciesResponse = Operation;

export type PatchProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const patchProjectsLocationsClientTlsPolicies: API.OperationMethod<PatchProjectsLocationsClientTlsPoliciesRequest, PatchProjectsLocationsClientTlsPoliciesResponse, PatchProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClientTlsPoliciesRequest,
  output: PatchProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Lists ClientTlsPolicies in a given project and location. */
export interface ListProjectsLocationsClientTlsPoliciesRequest {
  /** Maximum number of ClientTlsPolicies to return per call. */
  pageSize?: number;
  /** The value returned by the last `ListClientTlsPoliciesResponse` Indicates that this is a continuation of a prior `ListClientTlsPolicies` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project and location from which the ClientTlsPolicies should be listed, specified in the format `projects/* /locations/{location}`. */
  parent: string;
}

export const ListProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClientTlsPoliciesRequest>;

export type ListProjectsLocationsClientTlsPoliciesResponse = ListClientTlsPoliciesResponse;
export const ListProjectsLocationsClientTlsPoliciesResponse = ListClientTlsPoliciesResponse;

export type ListProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const listProjectsLocationsClientTlsPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsClientTlsPoliciesRequest,
  output: ListProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsClientTlsPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsClientTlsPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsClientTlsPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsClientTlsPoliciesRequest, TestIamPermissionsProjectsLocationsClientTlsPoliciesResponse, TestIamPermissionsProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsClientTlsPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsClientTlsPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsClientTlsPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clientTlsPolicies/{clientTlsPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsClientTlsPoliciesRequest>;

export type GetIamPolicyProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsClientTlsPoliciesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsClientTlsPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsClientTlsPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsClientTlsPoliciesRequest, GetIamPolicyProjectsLocationsClientTlsPoliciesResponse, GetIamPolicyProjectsLocationsClientTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsClientTlsPoliciesRequest,
  output: GetIamPolicyProjectsLocationsClientTlsPoliciesResponse,
  errors: [],
}));

/** Updates the parameters of a single TlsInspectionPolicy. */
export interface PatchProjectsLocationsTlsInspectionPoliciesRequest {
  /** Optional. Field mask is used to specify the fields to be overwritten in the TlsInspectionPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name: string;
  /** Request body */
  body?: TlsInspectionPolicy;
}

export const PatchProjectsLocationsTlsInspectionPoliciesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TlsInspectionPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/tlsInspectionPolicies/{tlsInspectionPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTlsInspectionPoliciesRequest>;

export type PatchProjectsLocationsTlsInspectionPoliciesResponse = Operation;
export const PatchProjectsLocationsTlsInspectionPoliciesResponse = Operation;

export type PatchProjectsLocationsTlsInspectionPoliciesError = CommonErrors;

export const patchProjectsLocationsTlsInspectionPolicies: API.OperationMethod<PatchProjectsLocationsTlsInspectionPoliciesRequest, PatchProjectsLocationsTlsInspectionPoliciesResponse, PatchProjectsLocationsTlsInspectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTlsInspectionPoliciesRequest,
  output: PatchProjectsLocationsTlsInspectionPoliciesResponse,
  errors: [],
}));

/** Lists TlsInspectionPolicies in a given project and location. */
export interface ListProjectsLocationsTlsInspectionPoliciesRequest {
  /** Maximum number of TlsInspectionPolicies to return per call. */
  pageSize?: number;
  /** Required. The project and location from which the TlsInspectionPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** The value returned by the last 'ListTlsInspectionPoliciesResponse' Indicates that this is a continuation of a prior 'ListTlsInspectionPolicies' call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsLocationsTlsInspectionPoliciesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/tlsInspectionPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTlsInspectionPoliciesRequest>;

export type ListProjectsLocationsTlsInspectionPoliciesResponse = ListTlsInspectionPoliciesResponse;
export const ListProjectsLocationsTlsInspectionPoliciesResponse = ListTlsInspectionPoliciesResponse;

export type ListProjectsLocationsTlsInspectionPoliciesError = CommonErrors;

export const listProjectsLocationsTlsInspectionPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsTlsInspectionPoliciesRequest,
  output: ListProjectsLocationsTlsInspectionPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single TlsInspectionPolicy. */
export interface DeleteProjectsLocationsTlsInspectionPoliciesRequest {
  /** Required. A name of the TlsInspectionPolicy to delete. Must be in the format `projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy}`. */
  name: string;
  /** If set to true, any rules for this TlsInspectionPolicy will also be deleted. (Otherwise, the request will only work if the TlsInspectionPolicy has no rules.) */
  force?: boolean;
}

export const DeleteProjectsLocationsTlsInspectionPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/tlsInspectionPolicies/{tlsInspectionPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTlsInspectionPoliciesRequest>;

export type DeleteProjectsLocationsTlsInspectionPoliciesResponse = Operation;
export const DeleteProjectsLocationsTlsInspectionPoliciesResponse = Operation;

export type DeleteProjectsLocationsTlsInspectionPoliciesError = CommonErrors;

export const deleteProjectsLocationsTlsInspectionPolicies: API.OperationMethod<DeleteProjectsLocationsTlsInspectionPoliciesRequest, DeleteProjectsLocationsTlsInspectionPoliciesResponse, DeleteProjectsLocationsTlsInspectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTlsInspectionPoliciesRequest,
  output: DeleteProjectsLocationsTlsInspectionPoliciesResponse,
  errors: [],
}));

/** Gets details of a single TlsInspectionPolicy. */
export interface GetProjectsLocationsTlsInspectionPoliciesRequest {
  /** Required. A name of the TlsInspectionPolicy to get. Must be in the format `projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy}`. */
  name: string;
}

export const GetProjectsLocationsTlsInspectionPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/tlsInspectionPolicies/{tlsInspectionPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTlsInspectionPoliciesRequest>;

export type GetProjectsLocationsTlsInspectionPoliciesResponse = TlsInspectionPolicy;
export const GetProjectsLocationsTlsInspectionPoliciesResponse = TlsInspectionPolicy;

export type GetProjectsLocationsTlsInspectionPoliciesError = CommonErrors;

export const getProjectsLocationsTlsInspectionPolicies: API.OperationMethod<GetProjectsLocationsTlsInspectionPoliciesRequest, GetProjectsLocationsTlsInspectionPoliciesResponse, GetProjectsLocationsTlsInspectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTlsInspectionPoliciesRequest,
  output: GetProjectsLocationsTlsInspectionPoliciesResponse,
  errors: [],
}));

/** Creates a new TlsInspectionPolicy in a given project and location. */
export interface CreateProjectsLocationsTlsInspectionPoliciesRequest {
  /** Required. The parent resource of the TlsInspectionPolicy. Must be in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. Short name of the TlsInspectionPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "tls_inspection_policy1". */
  tlsInspectionPolicyId?: string;
  /** Request body */
  body?: TlsInspectionPolicy;
}

export const CreateProjectsLocationsTlsInspectionPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  tlsInspectionPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("tlsInspectionPolicyId")),
  body: Schema.optional(TlsInspectionPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/tlsInspectionPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTlsInspectionPoliciesRequest>;

export type CreateProjectsLocationsTlsInspectionPoliciesResponse = Operation;
export const CreateProjectsLocationsTlsInspectionPoliciesResponse = Operation;

export type CreateProjectsLocationsTlsInspectionPoliciesError = CommonErrors;

export const createProjectsLocationsTlsInspectionPolicies: API.OperationMethod<CreateProjectsLocationsTlsInspectionPoliciesRequest, CreateProjectsLocationsTlsInspectionPoliciesResponse, CreateProjectsLocationsTlsInspectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTlsInspectionPoliciesRequest,
  output: CreateProjectsLocationsTlsInspectionPoliciesResponse,
  errors: [],
}));

/** Gets details of a single ServerTlsPolicy. */
export interface GetProjectsLocationsServerTlsPoliciesRequest {
  /** Required. A name of the ServerTlsPolicy to get. Must be in the format `projects/* /locations/{location}/serverTlsPolicies/*`. */
  name: string;
}

export const GetProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServerTlsPoliciesRequest>;

export type GetProjectsLocationsServerTlsPoliciesResponse = ServerTlsPolicy;
export const GetProjectsLocationsServerTlsPoliciesResponse = ServerTlsPolicy;

export type GetProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const getProjectsLocationsServerTlsPolicies: API.OperationMethod<GetProjectsLocationsServerTlsPoliciesRequest, GetProjectsLocationsServerTlsPoliciesResponse, GetProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServerTlsPoliciesRequest,
  output: GetProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsServerTlsPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServerTlsPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsServerTlsPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsServerTlsPoliciesRequest, TestIamPermissionsProjectsLocationsServerTlsPoliciesResponse, TestIamPermissionsProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServerTlsPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Deletes a single ServerTlsPolicy. */
export interface DeleteProjectsLocationsServerTlsPoliciesRequest {
  /** Required. A name of the ServerTlsPolicy to delete. Must be in the format `projects/* /locations/{location}/serverTlsPolicies/*`. */
  name: string;
}

export const DeleteProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServerTlsPoliciesRequest>;

export type DeleteProjectsLocationsServerTlsPoliciesResponse = Operation;
export const DeleteProjectsLocationsServerTlsPoliciesResponse = Operation;

export type DeleteProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const deleteProjectsLocationsServerTlsPolicies: API.OperationMethod<DeleteProjectsLocationsServerTlsPoliciesRequest, DeleteProjectsLocationsServerTlsPoliciesResponse, DeleteProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServerTlsPoliciesRequest,
  output: DeleteProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Updates the parameters of a single ServerTlsPolicy. */
export interface PatchProjectsLocationsServerTlsPoliciesRequest {
  /** Optional. Field mask is used to specify the fields to be overwritten in the ServerTlsPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Required. Name of the ServerTlsPolicy resource. It matches the pattern `projects/* /locations/{location}/serverTlsPolicies/{server_tls_policy}` */
  name: string;
  /** Request body */
  body?: ServerTlsPolicy;
}

export const PatchProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ServerTlsPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServerTlsPoliciesRequest>;

export type PatchProjectsLocationsServerTlsPoliciesResponse = Operation;
export const PatchProjectsLocationsServerTlsPoliciesResponse = Operation;

export type PatchProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const patchProjectsLocationsServerTlsPolicies: API.OperationMethod<PatchProjectsLocationsServerTlsPoliciesRequest, PatchProjectsLocationsServerTlsPoliciesResponse, PatchProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServerTlsPoliciesRequest,
  output: PatchProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServerTlsPoliciesRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServerTlsPoliciesRequest>;

export type GetIamPolicyProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsServerTlsPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsServerTlsPoliciesRequest, GetIamPolicyProjectsLocationsServerTlsPoliciesResponse, GetIamPolicyProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServerTlsPoliciesRequest,
  output: GetIamPolicyProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Lists ServerTlsPolicies in a given project and location. */
export interface ListProjectsLocationsServerTlsPoliciesRequest {
  /** Required. The project and location from which the ServerTlsPolicies should be listed, specified in the format `projects/* /locations/{location}`. */
  parent: string;
  /** The value returned by the last `ListServerTlsPoliciesResponse` Indicates that this is a continuation of a prior `ListServerTlsPolicies` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Setting this field to `true` will opt the request into returning the resources that are reachable, and into including the names of those that were unreachable in the [ListServerTlsPoliciesResponse.unreachable] field. This can only be `true` when reading across collections e.g. when `parent` is set to `"projects/example/locations/-"`. */
  returnPartialSuccess?: boolean;
  /** Maximum number of ServerTlsPolicies to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServerTlsPoliciesRequest>;

export type ListProjectsLocationsServerTlsPoliciesResponse = ListServerTlsPoliciesResponse;
export const ListProjectsLocationsServerTlsPoliciesResponse = ListServerTlsPoliciesResponse;

export type ListProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const listProjectsLocationsServerTlsPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsServerTlsPoliciesRequest,
  output: ListProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new ServerTlsPolicy in a given project and location. */
export interface CreateProjectsLocationsServerTlsPoliciesRequest {
  /** Required. Short name of the ServerTlsPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "server_mtls_policy". */
  serverTlsPolicyId?: string;
  /** Required. The parent resource of the ServerTlsPolicy. Must be in the format `projects/* /locations/{location}`. */
  parent: string;
  /** Request body */
  body?: ServerTlsPolicy;
}

export const CreateProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  serverTlsPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("serverTlsPolicyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ServerTlsPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServerTlsPoliciesRequest>;

export type CreateProjectsLocationsServerTlsPoliciesResponse = Operation;
export const CreateProjectsLocationsServerTlsPoliciesResponse = Operation;

export type CreateProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const createProjectsLocationsServerTlsPolicies: API.OperationMethod<CreateProjectsLocationsServerTlsPoliciesRequest, CreateProjectsLocationsServerTlsPoliciesResponse, CreateProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServerTlsPoliciesRequest,
  output: CreateProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsServerTlsPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServerTlsPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serverTlsPolicies/{serverTlsPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServerTlsPoliciesRequest>;

export type SetIamPolicyProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsServerTlsPoliciesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsServerTlsPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsServerTlsPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsServerTlsPoliciesRequest, SetIamPolicyProjectsLocationsServerTlsPoliciesResponse, SetIamPolicyProjectsLocationsServerTlsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServerTlsPoliciesRequest,
  output: SetIamPolicyProjectsLocationsServerTlsPoliciesResponse,
  errors: [],
}));

/** Lists GatewaySecurityPolicies in a given project and location. */
export interface ListProjectsLocationsGatewaySecurityPoliciesRequest {
  /** The value returned by the last 'ListGatewaySecurityPoliciesResponse' Indicates that this is a continuation of a prior 'ListGatewaySecurityPolicies' call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project and location from which the GatewaySecurityPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Maximum number of GatewaySecurityPolicies to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsGatewaySecurityPoliciesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGatewaySecurityPoliciesRequest>;

export type ListProjectsLocationsGatewaySecurityPoliciesResponse = ListGatewaySecurityPoliciesResponse;
export const ListProjectsLocationsGatewaySecurityPoliciesResponse = ListGatewaySecurityPoliciesResponse;

export type ListProjectsLocationsGatewaySecurityPoliciesError = CommonErrors;

export const listProjectsLocationsGatewaySecurityPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsGatewaySecurityPoliciesRequest,
  output: ListProjectsLocationsGatewaySecurityPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the parameters of a single GatewaySecurityPolicy. */
export interface PatchProjectsLocationsGatewaySecurityPoliciesRequest {
  /** Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy} gateway_security_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the GatewaySecurityPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: GatewaySecurityPolicy;
}

export const PatchProjectsLocationsGatewaySecurityPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GatewaySecurityPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGatewaySecurityPoliciesRequest>;

export type PatchProjectsLocationsGatewaySecurityPoliciesResponse = Operation;
export const PatchProjectsLocationsGatewaySecurityPoliciesResponse = Operation;

export type PatchProjectsLocationsGatewaySecurityPoliciesError = CommonErrors;

export const patchProjectsLocationsGatewaySecurityPolicies: API.OperationMethod<PatchProjectsLocationsGatewaySecurityPoliciesRequest, PatchProjectsLocationsGatewaySecurityPoliciesResponse, PatchProjectsLocationsGatewaySecurityPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGatewaySecurityPoliciesRequest,
  output: PatchProjectsLocationsGatewaySecurityPoliciesResponse,
  errors: [],
}));

/** Creates a new GatewaySecurityPolicy in a given project and location. */
export interface CreateProjectsLocationsGatewaySecurityPoliciesRequest {
  /** Required. Short name of the GatewaySecurityPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "gateway_security_policy1". */
  gatewaySecurityPolicyId?: string;
  /** Required. The parent resource of the GatewaySecurityPolicy. Must be in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Request body */
  body?: GatewaySecurityPolicy;
}

export const CreateProjectsLocationsGatewaySecurityPoliciesRequest = Schema.Struct({
  gatewaySecurityPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("gatewaySecurityPolicyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GatewaySecurityPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGatewaySecurityPoliciesRequest>;

export type CreateProjectsLocationsGatewaySecurityPoliciesResponse = Operation;
export const CreateProjectsLocationsGatewaySecurityPoliciesResponse = Operation;

export type CreateProjectsLocationsGatewaySecurityPoliciesError = CommonErrors;

export const createProjectsLocationsGatewaySecurityPolicies: API.OperationMethod<CreateProjectsLocationsGatewaySecurityPoliciesRequest, CreateProjectsLocationsGatewaySecurityPoliciesResponse, CreateProjectsLocationsGatewaySecurityPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGatewaySecurityPoliciesRequest,
  output: CreateProjectsLocationsGatewaySecurityPoliciesResponse,
  errors: [],
}));

/** Deletes a single GatewaySecurityPolicy. */
export interface DeleteProjectsLocationsGatewaySecurityPoliciesRequest {
  /** Required. A name of the GatewaySecurityPolicy to delete. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/*`. */
  name: string;
}

export const DeleteProjectsLocationsGatewaySecurityPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGatewaySecurityPoliciesRequest>;

export type DeleteProjectsLocationsGatewaySecurityPoliciesResponse = Operation;
export const DeleteProjectsLocationsGatewaySecurityPoliciesResponse = Operation;

export type DeleteProjectsLocationsGatewaySecurityPoliciesError = CommonErrors;

export const deleteProjectsLocationsGatewaySecurityPolicies: API.OperationMethod<DeleteProjectsLocationsGatewaySecurityPoliciesRequest, DeleteProjectsLocationsGatewaySecurityPoliciesResponse, DeleteProjectsLocationsGatewaySecurityPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGatewaySecurityPoliciesRequest,
  output: DeleteProjectsLocationsGatewaySecurityPoliciesResponse,
  errors: [],
}));

/** Gets details of a single GatewaySecurityPolicy. */
export interface GetProjectsLocationsGatewaySecurityPoliciesRequest {
  /** Required. A name of the GatewaySecurityPolicy to get. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/*`. */
  name: string;
}

export const GetProjectsLocationsGatewaySecurityPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGatewaySecurityPoliciesRequest>;

export type GetProjectsLocationsGatewaySecurityPoliciesResponse = GatewaySecurityPolicy;
export const GetProjectsLocationsGatewaySecurityPoliciesResponse = GatewaySecurityPolicy;

export type GetProjectsLocationsGatewaySecurityPoliciesError = CommonErrors;

export const getProjectsLocationsGatewaySecurityPolicies: API.OperationMethod<GetProjectsLocationsGatewaySecurityPoliciesRequest, GetProjectsLocationsGatewaySecurityPoliciesResponse, GetProjectsLocationsGatewaySecurityPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGatewaySecurityPoliciesRequest,
  output: GetProjectsLocationsGatewaySecurityPoliciesResponse,
  errors: [],
}));

/** Gets details of a single GatewaySecurityPolicyRule. */
export interface GetProjectsLocationsGatewaySecurityPoliciesRulesRequest {
  /** Required. The name of the GatewaySecurityPolicyRule to retrieve. Format: projects/{project}/location/{location}/gatewaySecurityPolicies/* /rules/* */
  name: string;
}

export const GetProjectsLocationsGatewaySecurityPoliciesRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}/rules/{rulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGatewaySecurityPoliciesRulesRequest>;

export type GetProjectsLocationsGatewaySecurityPoliciesRulesResponse = GatewaySecurityPolicyRule;
export const GetProjectsLocationsGatewaySecurityPoliciesRulesResponse = GatewaySecurityPolicyRule;

export type GetProjectsLocationsGatewaySecurityPoliciesRulesError = CommonErrors;

export const getProjectsLocationsGatewaySecurityPoliciesRules: API.OperationMethod<GetProjectsLocationsGatewaySecurityPoliciesRulesRequest, GetProjectsLocationsGatewaySecurityPoliciesRulesResponse, GetProjectsLocationsGatewaySecurityPoliciesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGatewaySecurityPoliciesRulesRequest,
  output: GetProjectsLocationsGatewaySecurityPoliciesRulesResponse,
  errors: [],
}));

/** Lists GatewaySecurityPolicyRules in a given project and location. */
export interface ListProjectsLocationsGatewaySecurityPoliciesRulesRequest {
  /** The value returned by the last 'ListGatewaySecurityPolicyRulesResponse' Indicates that this is a continuation of a prior 'ListGatewaySecurityPolicyRules' call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project, location and GatewaySecurityPolicy from which the GatewaySecurityPolicyRules should be listed, specified in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/{gatewaySecurityPolicy}`. */
  parent: string;
  /** Maximum number of GatewaySecurityPolicyRules to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsGatewaySecurityPoliciesRulesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}/rules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGatewaySecurityPoliciesRulesRequest>;

export type ListProjectsLocationsGatewaySecurityPoliciesRulesResponse = ListGatewaySecurityPolicyRulesResponse;
export const ListProjectsLocationsGatewaySecurityPoliciesRulesResponse = ListGatewaySecurityPolicyRulesResponse;

export type ListProjectsLocationsGatewaySecurityPoliciesRulesError = CommonErrors;

export const listProjectsLocationsGatewaySecurityPoliciesRules = API.makePaginated(() => ({
  input: ListProjectsLocationsGatewaySecurityPoliciesRulesRequest,
  output: ListProjectsLocationsGatewaySecurityPoliciesRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single GatewaySecurityPolicyRule. */
export interface DeleteProjectsLocationsGatewaySecurityPoliciesRulesRequest {
  /** Required. A name of the GatewaySecurityPolicyRule to delete. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/{gatewaySecurityPolicy}/rules/*`. */
  name: string;
}

export const DeleteProjectsLocationsGatewaySecurityPoliciesRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}/rules/{rulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGatewaySecurityPoliciesRulesRequest>;

export type DeleteProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;
export const DeleteProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;

export type DeleteProjectsLocationsGatewaySecurityPoliciesRulesError = CommonErrors;

export const deleteProjectsLocationsGatewaySecurityPoliciesRules: API.OperationMethod<DeleteProjectsLocationsGatewaySecurityPoliciesRulesRequest, DeleteProjectsLocationsGatewaySecurityPoliciesRulesResponse, DeleteProjectsLocationsGatewaySecurityPoliciesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGatewaySecurityPoliciesRulesRequest,
  output: DeleteProjectsLocationsGatewaySecurityPoliciesRulesResponse,
  errors: [],
}));

/** Creates a new GatewaySecurityPolicy in a given project and location. */
export interface CreateProjectsLocationsGatewaySecurityPoliciesRulesRequest {
  /** The ID to use for the rule, which will become the final component of the rule's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. */
  gatewaySecurityPolicyRuleId?: string;
  /** Required. The parent where this rule will be created. Format : projects/{project}/location/{location}/gatewaySecurityPolicies/* */
  parent: string;
  /** Request body */
  body?: GatewaySecurityPolicyRule;
}

export const CreateProjectsLocationsGatewaySecurityPoliciesRulesRequest = Schema.Struct({
  gatewaySecurityPolicyRuleId: Schema.optional(Schema.String).pipe(T.HttpQuery("gatewaySecurityPolicyRuleId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GatewaySecurityPolicyRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}/rules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGatewaySecurityPoliciesRulesRequest>;

export type CreateProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;
export const CreateProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;

export type CreateProjectsLocationsGatewaySecurityPoliciesRulesError = CommonErrors;

export const createProjectsLocationsGatewaySecurityPoliciesRules: API.OperationMethod<CreateProjectsLocationsGatewaySecurityPoliciesRulesRequest, CreateProjectsLocationsGatewaySecurityPoliciesRulesResponse, CreateProjectsLocationsGatewaySecurityPoliciesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGatewaySecurityPoliciesRulesRequest,
  output: CreateProjectsLocationsGatewaySecurityPoliciesRulesResponse,
  errors: [],
}));

/** Updates the parameters of a single GatewaySecurityPolicyRule. */
export interface PatchProjectsLocationsGatewaySecurityPoliciesRulesRequest {
  /** Required. Immutable. Name of the resource. ame is the full resource name so projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy}/rules/{rule} rule should match the pattern: (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$). */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the GatewaySecurityPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: GatewaySecurityPolicyRule;
}

export const PatchProjectsLocationsGatewaySecurityPoliciesRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GatewaySecurityPolicyRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/gatewaySecurityPolicies/{gatewaySecurityPoliciesId}/rules/{rulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGatewaySecurityPoliciesRulesRequest>;

export type PatchProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;
export const PatchProjectsLocationsGatewaySecurityPoliciesRulesResponse = Operation;

export type PatchProjectsLocationsGatewaySecurityPoliciesRulesError = CommonErrors;

export const patchProjectsLocationsGatewaySecurityPoliciesRules: API.OperationMethod<PatchProjectsLocationsGatewaySecurityPoliciesRulesRequest, PatchProjectsLocationsGatewaySecurityPoliciesRulesResponse, PatchProjectsLocationsGatewaySecurityPoliciesRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGatewaySecurityPoliciesRulesRequest,
  output: PatchProjectsLocationsGatewaySecurityPoliciesRulesResponse,
  errors: [],
}));

/** Deletes a single AuthzPolicy. */
export interface DeleteProjectsLocationsAuthzPoliciesRequest {
  /** Required. The name of the `AuthzPolicy` resource to delete. Must be in the format `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAuthzPoliciesRequest>;

export type DeleteProjectsLocationsAuthzPoliciesResponse = Operation;
export const DeleteProjectsLocationsAuthzPoliciesResponse = Operation;

export type DeleteProjectsLocationsAuthzPoliciesError = CommonErrors;

export const deleteProjectsLocationsAuthzPolicies: API.OperationMethod<DeleteProjectsLocationsAuthzPoliciesRequest, DeleteProjectsLocationsAuthzPoliciesResponse, DeleteProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAuthzPoliciesRequest,
  output: DeleteProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsAuthzPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAuthzPoliciesRequest>;

export type SetIamPolicyProjectsLocationsAuthzPoliciesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAuthzPoliciesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAuthzPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsAuthzPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsAuthzPoliciesRequest, SetIamPolicyProjectsLocationsAuthzPoliciesResponse, SetIamPolicyProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAuthzPoliciesRequest,
  output: SetIamPolicyProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Gets details of a single AuthzPolicy. */
export interface GetProjectsLocationsAuthzPoliciesRequest {
  /** Required. A name of the `AuthzPolicy` resource to get. Must be in the format `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. */
  name: string;
}

export const GetProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAuthzPoliciesRequest>;

export type GetProjectsLocationsAuthzPoliciesResponse = AuthzPolicy;
export const GetProjectsLocationsAuthzPoliciesResponse = AuthzPolicy;

export type GetProjectsLocationsAuthzPoliciesError = CommonErrors;

export const getProjectsLocationsAuthzPolicies: API.OperationMethod<GetProjectsLocationsAuthzPoliciesRequest, GetProjectsLocationsAuthzPoliciesResponse, GetProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAuthzPoliciesRequest,
  output: GetProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Lists AuthzPolicies in a given project and location. */
export interface ListProjectsLocationsAuthzPoliciesRequest {
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
  /** Required. The project and location from which the `AuthzPolicy` resources are listed, specified in the following format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. A token identifying a page of results that the server returns. */
  pageToken?: string;
  /** Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
  /** Optional. Filtering results. */
  filter?: string;
}

export const ListProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAuthzPoliciesRequest>;

export type ListProjectsLocationsAuthzPoliciesResponse = ListAuthzPoliciesResponse;
export const ListProjectsLocationsAuthzPoliciesResponse = ListAuthzPoliciesResponse;

export type ListProjectsLocationsAuthzPoliciesError = CommonErrors;

export const listProjectsLocationsAuthzPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsAuthzPoliciesRequest,
  output: ListProjectsLocationsAuthzPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsAuthzPoliciesRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAuthzPoliciesRequest>;

export type GetIamPolicyProjectsLocationsAuthzPoliciesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAuthzPoliciesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAuthzPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsAuthzPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsAuthzPoliciesRequest, GetIamPolicyProjectsLocationsAuthzPoliciesResponse, GetIamPolicyProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAuthzPoliciesRequest,
  output: GetIamPolicyProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Creates a new AuthzPolicy in a given project and location. */
export interface CreateProjectsLocationsAuthzPoliciesRequest {
  /** Required. User-provided ID of the `AuthzPolicy` resource to be created. */
  authzPolicyId?: string;
  /** Required. The parent resource of the `AuthzPolicy` resource. Must be in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: AuthzPolicy;
}

export const CreateProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  authzPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("authzPolicyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(AuthzPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAuthzPoliciesRequest>;

export type CreateProjectsLocationsAuthzPoliciesResponse = Operation;
export const CreateProjectsLocationsAuthzPoliciesResponse = Operation;

export type CreateProjectsLocationsAuthzPoliciesError = CommonErrors;

export const createProjectsLocationsAuthzPolicies: API.OperationMethod<CreateProjectsLocationsAuthzPoliciesRequest, CreateProjectsLocationsAuthzPoliciesResponse, CreateProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAuthzPoliciesRequest,
  output: CreateProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsAuthzPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAuthzPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsAuthzPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAuthzPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAuthzPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsAuthzPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsAuthzPoliciesRequest, TestIamPermissionsProjectsLocationsAuthzPoliciesResponse, TestIamPermissionsProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAuthzPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Updates the parameters of a single AuthzPolicy. */
export interface PatchProjectsLocationsAuthzPoliciesRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. */
  name: string;
  /** Required. Used to specify the fields to be overwritten in the `AuthzPolicy` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. */
  updateMask?: string;
  /** Request body */
  body?: AuthzPolicy;
}

export const PatchProjectsLocationsAuthzPoliciesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AuthzPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/authzPolicies/{authzPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAuthzPoliciesRequest>;

export type PatchProjectsLocationsAuthzPoliciesResponse = Operation;
export const PatchProjectsLocationsAuthzPoliciesResponse = Operation;

export type PatchProjectsLocationsAuthzPoliciesError = CommonErrors;

export const patchProjectsLocationsAuthzPolicies: API.OperationMethod<PatchProjectsLocationsAuthzPoliciesRequest, PatchProjectsLocationsAuthzPoliciesResponse, PatchProjectsLocationsAuthzPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAuthzPoliciesRequest,
  output: PatchProjectsLocationsAuthzPoliciesResponse,
  errors: [],
}));

/** Lists associations in a given project and location. See https://google.aip.dev/132. */
export interface ListProjectsLocationsInterceptEndpointGroupAssociationsRequest {
  /** Required. The parent, which owns this collection of associations. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. */
  parent: string;
  /** Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListInterceptEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. */
  pageToken?: string;
  /** Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. */
  pageSize?: number;
}

export const ListProjectsLocationsInterceptEndpointGroupAssociationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroupAssociations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInterceptEndpointGroupAssociationsRequest>;

export type ListProjectsLocationsInterceptEndpointGroupAssociationsResponse = ListInterceptEndpointGroupAssociationsResponse;
export const ListProjectsLocationsInterceptEndpointGroupAssociationsResponse = ListInterceptEndpointGroupAssociationsResponse;

export type ListProjectsLocationsInterceptEndpointGroupAssociationsError = CommonErrors;

export const listProjectsLocationsInterceptEndpointGroupAssociations = API.makePaginated(() => ({
  input: ListProjectsLocationsInterceptEndpointGroupAssociationsRequest,
  output: ListProjectsLocationsInterceptEndpointGroupAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an association in a given project and location. See https://google.aip.dev/133. */
export interface CreateProjectsLocationsInterceptEndpointGroupAssociationsRequest {
  /** Required. The parent resource where this association will be created. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The ID to use for the new association, which will become the final component of the endpoint group's resource name. If not provided, the server will generate a unique ID. */
  interceptEndpointGroupAssociationId?: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Request body */
  body?: InterceptEndpointGroupAssociation;
}

export const CreateProjectsLocationsInterceptEndpointGroupAssociationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  interceptEndpointGroupAssociationId: Schema.optional(Schema.String).pipe(T.HttpQuery("interceptEndpointGroupAssociationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(InterceptEndpointGroupAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroupAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInterceptEndpointGroupAssociationsRequest>;

export type CreateProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;
export const CreateProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;

export type CreateProjectsLocationsInterceptEndpointGroupAssociationsError = CommonErrors;

export const createProjectsLocationsInterceptEndpointGroupAssociations: API.OperationMethod<CreateProjectsLocationsInterceptEndpointGroupAssociationsRequest, CreateProjectsLocationsInterceptEndpointGroupAssociationsResponse, CreateProjectsLocationsInterceptEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInterceptEndpointGroupAssociationsRequest,
  output: CreateProjectsLocationsInterceptEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Updates an association. See https://google.aip.dev/134. */
export interface PatchProjectsLocationsInterceptEndpointGroupAssociationsRequest {
  /** Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
  /** Optional. The list of fields to update. Fields are specified relative to the association (e.g. `description`; *not* `intercept_endpoint_group_association.description`). See https://google.aip.dev/161 for more details. */
  updateMask?: string;
  /** Request body */
  body?: InterceptEndpointGroupAssociation;
}

export const PatchProjectsLocationsInterceptEndpointGroupAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InterceptEndpointGroupAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroupAssociations/{interceptEndpointGroupAssociationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInterceptEndpointGroupAssociationsRequest>;

export type PatchProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;
export const PatchProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;

export type PatchProjectsLocationsInterceptEndpointGroupAssociationsError = CommonErrors;

export const patchProjectsLocationsInterceptEndpointGroupAssociations: API.OperationMethod<PatchProjectsLocationsInterceptEndpointGroupAssociationsRequest, PatchProjectsLocationsInterceptEndpointGroupAssociationsResponse, PatchProjectsLocationsInterceptEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInterceptEndpointGroupAssociationsRequest,
  output: PatchProjectsLocationsInterceptEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Gets a specific association. See https://google.aip.dev/131. */
export interface GetProjectsLocationsInterceptEndpointGroupAssociationsRequest {
  /** Required. The name of the association to retrieve. Format: projects/{project}/locations/{location}/interceptEndpointGroupAssociations/{intercept_endpoint_group_association} */
  name: string;
}

export const GetProjectsLocationsInterceptEndpointGroupAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroupAssociations/{interceptEndpointGroupAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInterceptEndpointGroupAssociationsRequest>;

export type GetProjectsLocationsInterceptEndpointGroupAssociationsResponse = InterceptEndpointGroupAssociation;
export const GetProjectsLocationsInterceptEndpointGroupAssociationsResponse = InterceptEndpointGroupAssociation;

export type GetProjectsLocationsInterceptEndpointGroupAssociationsError = CommonErrors;

export const getProjectsLocationsInterceptEndpointGroupAssociations: API.OperationMethod<GetProjectsLocationsInterceptEndpointGroupAssociationsRequest, GetProjectsLocationsInterceptEndpointGroupAssociationsResponse, GetProjectsLocationsInterceptEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInterceptEndpointGroupAssociationsRequest,
  output: GetProjectsLocationsInterceptEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Deletes an association. See https://google.aip.dev/135. */
export interface DeleteProjectsLocationsInterceptEndpointGroupAssociationsRequest {
  /** Required. The association to delete. */
  name: string;
  /** Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. */
  requestId?: string;
}

export const DeleteProjectsLocationsInterceptEndpointGroupAssociationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/interceptEndpointGroupAssociations/{interceptEndpointGroupAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInterceptEndpointGroupAssociationsRequest>;

export type DeleteProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;
export const DeleteProjectsLocationsInterceptEndpointGroupAssociationsResponse = Operation;

export type DeleteProjectsLocationsInterceptEndpointGroupAssociationsError = CommonErrors;

export const deleteProjectsLocationsInterceptEndpointGroupAssociations: API.OperationMethod<DeleteProjectsLocationsInterceptEndpointGroupAssociationsRequest, DeleteProjectsLocationsInterceptEndpointGroupAssociationsResponse, DeleteProjectsLocationsInterceptEndpointGroupAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInterceptEndpointGroupAssociationsRequest,
  output: DeleteProjectsLocationsInterceptEndpointGroupAssociationsResponse,
  errors: [],
}));

/** Creates a new AuthorizationPolicy in a given project and location. */
export interface CreateProjectsLocationsAuthorizationPoliciesRequest {
  /** Required. The parent resource of the AuthorizationPolicy. Must be in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. Short name of the AuthorizationPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". */
  authorizationPolicyId?: string;
  /** Request body */
  body?: AuthorizationPolicy;
}

export const CreateProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  authorizationPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizationPolicyId")),
  body: Schema.optional(AuthorizationPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAuthorizationPoliciesRequest>;

export type CreateProjectsLocationsAuthorizationPoliciesResponse = Operation;
export const CreateProjectsLocationsAuthorizationPoliciesResponse = Operation;

export type CreateProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const createProjectsLocationsAuthorizationPolicies: API.OperationMethod<CreateProjectsLocationsAuthorizationPoliciesRequest, CreateProjectsLocationsAuthorizationPoliciesResponse, CreateProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAuthorizationPoliciesRequest,
  output: CreateProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsAuthorizationPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAuthorizationPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsAuthorizationPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsAuthorizationPoliciesRequest, TestIamPermissionsProjectsLocationsAuthorizationPoliciesResponse, TestIamPermissionsProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAuthorizationPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsAuthorizationPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAuthorizationPoliciesRequest>;

export type GetIamPolicyProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsAuthorizationPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsAuthorizationPoliciesRequest, GetIamPolicyProjectsLocationsAuthorizationPoliciesResponse, GetIamPolicyProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAuthorizationPoliciesRequest,
  output: GetIamPolicyProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsAuthorizationPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAuthorizationPoliciesRequest>;

export type SetIamPolicyProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAuthorizationPoliciesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsAuthorizationPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsAuthorizationPoliciesRequest, SetIamPolicyProjectsLocationsAuthorizationPoliciesResponse, SetIamPolicyProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAuthorizationPoliciesRequest,
  output: SetIamPolicyProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Gets details of a single AuthorizationPolicy. */
export interface GetProjectsLocationsAuthorizationPoliciesRequest {
  /** Required. A name of the AuthorizationPolicy to get. Must be in the format `projects/{project}/locations/{location}/authorizationPolicies/*`. */
  name: string;
}

export const GetProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAuthorizationPoliciesRequest>;

export type GetProjectsLocationsAuthorizationPoliciesResponse = AuthorizationPolicy;
export const GetProjectsLocationsAuthorizationPoliciesResponse = AuthorizationPolicy;

export type GetProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const getProjectsLocationsAuthorizationPolicies: API.OperationMethod<GetProjectsLocationsAuthorizationPoliciesRequest, GetProjectsLocationsAuthorizationPoliciesResponse, GetProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAuthorizationPoliciesRequest,
  output: GetProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Lists AuthorizationPolicies in a given project and location. */
export interface ListProjectsLocationsAuthorizationPoliciesRequest {
  /** The value returned by the last `ListAuthorizationPoliciesResponse` Indicates that this is a continuation of a prior `ListAuthorizationPolicies` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The project and location from which the AuthorizationPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. */
  parent: string;
  /** Maximum number of AuthorizationPolicies to return per call. */
  pageSize?: number;
}

export const ListProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAuthorizationPoliciesRequest>;

export type ListProjectsLocationsAuthorizationPoliciesResponse = ListAuthorizationPoliciesResponse;
export const ListProjectsLocationsAuthorizationPoliciesResponse = ListAuthorizationPoliciesResponse;

export type ListProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const listProjectsLocationsAuthorizationPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsAuthorizationPoliciesRequest,
  output: ListProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the parameters of a single AuthorizationPolicy. */
export interface PatchProjectsLocationsAuthorizationPoliciesRequest {
  /** Optional. Field mask is used to specify the fields to be overwritten in the AuthorizationPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Required. Name of the AuthorizationPolicy resource. It matches pattern `projects/{project}/locations/{location}/authorizationPolicies/`. */
  name: string;
  /** Request body */
  body?: AuthorizationPolicy;
}

export const PatchProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AuthorizationPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAuthorizationPoliciesRequest>;

export type PatchProjectsLocationsAuthorizationPoliciesResponse = Operation;
export const PatchProjectsLocationsAuthorizationPoliciesResponse = Operation;

export type PatchProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const patchProjectsLocationsAuthorizationPolicies: API.OperationMethod<PatchProjectsLocationsAuthorizationPoliciesRequest, PatchProjectsLocationsAuthorizationPoliciesResponse, PatchProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAuthorizationPoliciesRequest,
  output: PatchProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

/** Deletes a single AuthorizationPolicy. */
export interface DeleteProjectsLocationsAuthorizationPoliciesRequest {
  /** Required. A name of the AuthorizationPolicy to delete. Must be in the format `projects/{project}/locations/{location}/authorizationPolicies/*`. */
  name: string;
}

export const DeleteProjectsLocationsAuthorizationPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizationPolicies/{authorizationPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAuthorizationPoliciesRequest>;

export type DeleteProjectsLocationsAuthorizationPoliciesResponse = Operation;
export const DeleteProjectsLocationsAuthorizationPoliciesResponse = Operation;

export type DeleteProjectsLocationsAuthorizationPoliciesError = CommonErrors;

export const deleteProjectsLocationsAuthorizationPolicies: API.OperationMethod<DeleteProjectsLocationsAuthorizationPoliciesRequest, DeleteProjectsLocationsAuthorizationPoliciesResponse, DeleteProjectsLocationsAuthorizationPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAuthorizationPoliciesRequest,
  output: DeleteProjectsLocationsAuthorizationPoliciesResponse,
  errors: [],
}));

