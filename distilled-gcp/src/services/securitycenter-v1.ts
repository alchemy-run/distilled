// ==========================================================================
// Security Command Center API (securitycenter v1)
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
  name: "securitycenter",
  version: "v1",
  rootUrl: "https://securitycenter.googleapis.com/",
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

export interface BulkMuteFindingsRequest {
  /** Expression that identifies findings that should be updated. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the corresponding resource. The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. */
  filter?: string;
  /** This can be a mute configuration name or any identifier for mute/unmute of findings based on the filter. */
  muteAnnotation?: string;
  /** Optional. All findings matching the given filter will have their mute state set to this value. The default value is `MUTED`. Setting this to `UNDEFINED` will clear the mute state on all matching findings. */
  muteState?: "MUTE_STATE_UNSPECIFIED" | "MUTED" | "UNDEFINED" | (string & {});
}

export const BulkMuteFindingsRequest: Schema.Schema<BulkMuteFindingsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  muteAnnotation: Schema.optional(Schema.String),
  muteState: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkMuteFindingsRequest" }) as any as Schema.Schema<BulkMuteFindingsRequest>;

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

export interface GoogleCloudSecuritycenterV1Property {
  /** Name of the property for the custom output. */
  name?: string;
  /** The CEL expression for the custom output. A resource property can be specified to return the value of the property or a text string enclosed in quotation marks. */
  valueExpression?: Expr;
}

export const GoogleCloudSecuritycenterV1Property: Schema.Schema<GoogleCloudSecuritycenterV1Property> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  valueExpression: Schema.optional(Expr),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1Property" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1Property>;

export interface GoogleCloudSecuritycenterV1CustomOutputSpec {
  /** A list of custom output properties to add to the finding. */
  properties?: Array<GoogleCloudSecuritycenterV1Property>;
}

export const GoogleCloudSecuritycenterV1CustomOutputSpec: Schema.Schema<GoogleCloudSecuritycenterV1CustomOutputSpec> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1Property)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1CustomOutputSpec" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1CustomOutputSpec>;

export interface GoogleCloudSecuritycenterV1ResourceSelector {
  /** The resource types to run the detector on. */
  resourceTypes?: Array<string>;
}

export const GoogleCloudSecuritycenterV1ResourceSelector: Schema.Schema<GoogleCloudSecuritycenterV1ResourceSelector> = Schema.suspend(() => Schema.Struct({
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceSelector" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceSelector>;

export interface GoogleCloudSecuritycenterV1CustomConfig {
  /** The CEL expression to evaluate to produce findings. When the expression evaluates to true against a resource, a finding is generated. */
  predicate?: Expr;
  /** Custom output properties. */
  customOutput?: GoogleCloudSecuritycenterV1CustomOutputSpec;
  /** The resource types that the custom module operates on. Each custom module can specify up to 5 resource types. */
  resourceSelector?: GoogleCloudSecuritycenterV1ResourceSelector;
  /** The severity to assign to findings generated by the module. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Text that describes the vulnerability or misconfiguration that the custom module detects. This explanation is returned with each finding instance to help investigators understand the detected issue. The text must be enclosed in quotation marks. */
  description?: string;
  /** An explanation of the recommended steps that security teams can take to resolve the detected issue. This explanation is returned with each finding generated by this module in the `nextSteps` property of the finding JSON. */
  recommendation?: string;
}

export const GoogleCloudSecuritycenterV1CustomConfig: Schema.Schema<GoogleCloudSecuritycenterV1CustomConfig> = Schema.suspend(() => Schema.Struct({
  predicate: Schema.optional(Expr),
  customOutput: Schema.optional(GoogleCloudSecuritycenterV1CustomOutputSpec),
  resourceSelector: Schema.optional(GoogleCloudSecuritycenterV1ResourceSelector),
  severity: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  recommendation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1CustomConfig" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1CustomConfig>;

export interface GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule {
  /** Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits. */
  name?: string;
  /** The display name of the Security Health Analytics custom module. This display name becomes the finding category for all findings that are returned by this custom module. The display name must be between 1 and 128 characters, start with a lowercase letter, and contain alphanumeric characters or underscores only. */
  displayName?: string;
  /** The enablement state of the custom module. */
  enablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "INHERITED" | (string & {});
  /** Output only. The time at which the custom module was last updated. */
  updateTime?: string;
  /** Output only. The editor that last updated the custom module. */
  lastEditor?: string;
  /** Output only. If empty, indicates that the custom module was created in the organization, folder, or project in which you are viewing the custom module. Otherwise, `ancestor_module` specifies the organization or folder from which the custom module is inherited. */
  ancestorModule?: string;
  /** The user specified custom configuration for the module. */
  customConfig?: GoogleCloudSecuritycenterV1CustomConfig;
  /** The cloud provider of the custom module. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
}

export const GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule: Schema.Schema<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  enablementState: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastEditor: Schema.optional(Schema.String),
  ancestorModule: Schema.optional(Schema.String),
  customConfig: Schema.optional(GoogleCloudSecuritycenterV1CustomConfig),
  cloudProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule>;

export interface Source {
  /** The relative resource name of this source. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}" */
  name?: string;
  /** The source's display name. A source's display name must be unique amongst its siblings, for example, two sources with the same parent can't share the same display name. The display name must have a length between 1 and 64 characters (inclusive). */
  displayName?: string;
  /** The description of the source (max of 1024 characters). Example: "Web Security Scanner is a web security scanner for common vulnerabilities in App Engine applications. It can automatically scan and detect four common vulnerabilities, including cross-site-scripting (XSS), Flash injection, mixed content (HTTP in HTTPS), and outdated or insecure libraries." */
  description?: string;
  /** The canonical name of the finding source. It's either "organizations/{organization_id}/sources/{source_id}", "folders/{folder_id}/sources/{source_id}", or "projects/{project_number}/sources/{source_id}", depending on the closest CRM ancestor of the resource associated with the finding. */
  canonicalName?: string;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface SecurityMarks {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name?: string;
  /** Mutable user specified security marks belonging to the parent resource. Constraints are as follows: * Keys and values are treated as case insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys must be letters, numbers, underscores, or dashes * Values have leading and trailing whitespace trimmed, remaining characters must be between 1 - 4096 characters (inclusive) */
  marks?: Record<string, string>;
  /** The canonical name of the marks. Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "folders/{folder_id}/assets/{asset_id}/securityMarks" "projects/{project_number}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks" */
  canonicalName?: string;
}

export const SecurityMarks: Schema.Schema<SecurityMarks> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityMarks" }) as any as Schema.Schema<SecurityMarks>;

export interface Detection {
  /** The name of the binary associated with the memory hash signature detection. */
  binary?: string;
  /** The percentage of memory page hashes in the signature that were matched. */
  percentPagesMatched?: number;
}

export const Detection: Schema.Schema<Detection> = Schema.suspend(() => Schema.Struct({
  binary: Schema.optional(Schema.String),
  percentPagesMatched: Schema.optional(Schema.Number),
})).annotate({ identifier: "Detection" }) as any as Schema.Schema<Detection>;

export interface MemoryHashSignature {
  /** The binary family. */
  binaryFamily?: string;
  /** The list of memory hash detections contributing to the binary family match. */
  detections?: Array<Detection>;
}

export const MemoryHashSignature: Schema.Schema<MemoryHashSignature> = Schema.suspend(() => Schema.Struct({
  binaryFamily: Schema.optional(Schema.String),
  detections: Schema.optional(Schema.Array(Detection)),
})).annotate({ identifier: "MemoryHashSignature" }) as any as Schema.Schema<MemoryHashSignature>;

export interface YaraRuleSignature {
  /** The name of the YARA rule. */
  yaraRule?: string;
}

export const YaraRuleSignature: Schema.Schema<YaraRuleSignature> = Schema.suspend(() => Schema.Struct({
  yaraRule: Schema.optional(Schema.String),
})).annotate({ identifier: "YaraRuleSignature" }) as any as Schema.Schema<YaraRuleSignature>;

export interface ProcessSignature {
  /** Signature indicating that a binary family was matched. */
  memoryHashSignature?: MemoryHashSignature;
  /** Signature indicating that a YARA rule was matched. */
  yaraRuleSignature?: YaraRuleSignature;
  /** Describes the type of resource associated with the signature. */
  signatureType?: "SIGNATURE_TYPE_UNSPECIFIED" | "SIGNATURE_TYPE_PROCESS" | "SIGNATURE_TYPE_FILE" | (string & {});
}

export const ProcessSignature: Schema.Schema<ProcessSignature> = Schema.suspend(() => Schema.Struct({
  memoryHashSignature: Schema.optional(MemoryHashSignature),
  yaraRuleSignature: Schema.optional(YaraRuleSignature),
  signatureType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProcessSignature" }) as any as Schema.Schema<ProcessSignature>;

export interface Indicator {
  /** The list of IP addresses that are associated with the finding. */
  ipAddresses?: Array<string>;
  /** List of domains associated to the Finding. */
  domains?: Array<string>;
  /** The list of matched signatures indicating that the given process is present in the environment. */
  signatures?: Array<ProcessSignature>;
  /** The list of URIs associated to the Findings. */
  uris?: Array<string>;
}

export const Indicator: Schema.Schema<Indicator> = Schema.suspend(() => Schema.Struct({
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  domains: Schema.optional(Schema.Array(Schema.String)),
  signatures: Schema.optional(Schema.Array(ProcessSignature)),
  uris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Indicator" }) as any as Schema.Schema<Indicator>;

export interface Reference {
  /** Source of the reference e.g. NVD */
  source?: string;
  /** Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527. */
  uri?: string;
}

export const Reference: Schema.Schema<Reference> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "Reference" }) as any as Schema.Schema<Reference>;

export interface Cvssv3 {
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. This metric reflects the context by which vulnerability exploitation is possible. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  /** This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability. */
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | (string & {});
  /** This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. */
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  /** This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. */
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
  /** The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. */
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  /** This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. */
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** This metric measures the impact to integrity of a successfully exploited vulnerability. */
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. */
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
}

export const Cvssv3: Schema.Schema<Cvssv3> = Schema.suspend(() => Schema.Struct({
  baseScore: Schema.optional(Schema.Number),
  attackVector: Schema.optional(Schema.String),
  attackComplexity: Schema.optional(Schema.String),
  privilegesRequired: Schema.optional(Schema.String),
  userInteraction: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  confidentialityImpact: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  availabilityImpact: Schema.optional(Schema.String),
})).annotate({ identifier: "Cvssv3" }) as any as Schema.Schema<Cvssv3>;

export interface Cve {
  /** The unique identifier for the vulnerability. e.g. CVE-2021-34527 */
  id?: string;
  /** Additional information about the CVE. e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527 */
  references?: Array<Reference>;
  /** Describe Common Vulnerability Scoring System specified at https://www.first.org/cvss/v3.1/specification-document */
  cvssv3?: Cvssv3;
  /** Whether upstream fix is available for the CVE. */
  upstreamFixAvailable?: boolean;
  /** The potential impact of the vulnerability if it was to be exploited. */
  impact?: "RISK_RATING_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The exploitation activity of the vulnerability in the wild. */
  exploitationActivity?: "EXPLOITATION_ACTIVITY_UNSPECIFIED" | "WIDE" | "CONFIRMED" | "AVAILABLE" | "ANTICIPATED" | "NO_KNOWN" | (string & {});
  /** Whether or not the vulnerability has been observed in the wild. */
  observedInTheWild?: boolean;
  /** Whether or not the vulnerability was zero day when the finding was published. */
  zeroDay?: boolean;
  /** Date the first publicly available exploit or PoC was released. */
  exploitReleaseDate?: string;
  /** Date of the earliest known exploitation. */
  firstExploitationDate?: string;
}

export const Cve: Schema.Schema<Cve> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(Reference)),
  cvssv3: Schema.optional(Cvssv3),
  upstreamFixAvailable: Schema.optional(Schema.Boolean),
  impact: Schema.optional(Schema.String),
  exploitationActivity: Schema.optional(Schema.String),
  observedInTheWild: Schema.optional(Schema.Boolean),
  zeroDay: Schema.optional(Schema.Boolean),
  exploitReleaseDate: Schema.optional(Schema.String),
  firstExploitationDate: Schema.optional(Schema.String),
})).annotate({ identifier: "Cve" }) as any as Schema.Schema<Cve>;

export interface Package {
  /** The name of the package where the vulnerability was detected. */
  packageName?: string;
  /** The CPE URI where the vulnerability was detected. */
  cpeUri?: string;
  /** Type of package, for example, os, maven, or go. */
  packageType?: string;
  /** The version of the package. */
  packageVersion?: string;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  packageVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface SecurityBulletin {
  /** ID of the bulletin corresponding to the vulnerability. */
  bulletinId?: string;
  /** Submission time of this Security Bulletin. */
  submissionTime?: string;
  /** This represents a version that the cluster receiving this notification should be upgraded to, based on its current version. For example, 1.15.0 */
  suggestedUpgradeVersion?: string;
}

export const SecurityBulletin: Schema.Schema<SecurityBulletin> = Schema.suspend(() => Schema.Struct({
  bulletinId: Schema.optional(Schema.String),
  submissionTime: Schema.optional(Schema.String),
  suggestedUpgradeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityBulletin" }) as any as Schema.Schema<SecurityBulletin>;

export interface Cwe {
  /** The CWE identifier, e.g. CWE-94 */
  id?: string;
  /** Any reference to the details on the CWE, for example, https://cwe.mitre.org/data/definitions/94.html */
  references?: Array<Reference>;
}

export const Cwe: Schema.Schema<Cwe> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(Reference)),
})).annotate({ identifier: "Cwe" }) as any as Schema.Schema<Cwe>;

export interface Vulnerability {
  /** CVE stands for Common Vulnerabilities and Exposures (https://cve.mitre.org/about/) */
  cve?: Cve;
  /** The offending package is relevant to the finding. */
  offendingPackage?: Package;
  /** The fixed package is relevant to the finding. */
  fixedPackage?: Package;
  /** The security bulletin is relevant to this finding. */
  securityBulletin?: SecurityBulletin;
  /** Provider provided risk_score based on multiple factors. The higher the risk score, the more risky the vulnerability is. */
  providerRiskScore?: string;
  /** Represents whether the vulnerability is reachable (detected via static analysis) */
  reachable?: boolean;
  /** Represents one or more Common Weakness Enumeration (CWE) information on this vulnerability. */
  cwes?: Array<Cwe>;
}

export const Vulnerability: Schema.Schema<Vulnerability> = Schema.suspend(() => Schema.Struct({
  cve: Schema.optional(Cve),
  offendingPackage: Schema.optional(Package),
  fixedPackage: Schema.optional(Package),
  securityBulletin: Schema.optional(SecurityBulletin),
  providerRiskScore: Schema.optional(Schema.String),
  reachable: Schema.optional(Schema.Boolean),
  cwes: Schema.optional(Schema.Array(Cwe)),
})).annotate({ identifier: "Vulnerability" }) as any as Schema.Schema<Vulnerability>;

export interface TicketInfo {
  /** The identifier of the ticket in the ticket system. */
  id?: string;
  /** The assignee of the ticket in the ticket system. */
  assignee?: string;
  /** The description of the ticket in the ticket system. */
  description?: string;
  /** The link to the ticket in the ticket system. */
  uri?: string;
  /** The latest status of the ticket, as reported by the ticket system. */
  status?: string;
  /** The time when the ticket was last updated, as reported by the ticket system. */
  updateTime?: string;
}

export const TicketInfo: Schema.Schema<TicketInfo> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  assignee: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TicketInfo" }) as any as Schema.Schema<TicketInfo>;

export interface GoogleCloudSecuritycenterV1ExternalSystem {
  /** Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira" */
  name?: string;
  /** References primary/secondary etc assignees in the external system. */
  assignees?: Array<string>;
  /** The identifier that's used to track the finding's corresponding case in the external system. */
  externalUid?: string;
  /** The most recent status of the finding's corresponding case, as reported by the external system. */
  status?: string;
  /** The time when the case was last updated, as reported by the external system. */
  externalSystemUpdateTime?: string;
  /** The link to the finding's corresponding case in the external system. */
  caseUri?: string;
  /** The priority of the finding's corresponding case in the external system. */
  casePriority?: string;
  /** The SLA of the finding's corresponding case in the external system. */
  caseSla?: string;
  /** The time when the case was created, as reported by the external system. */
  caseCreateTime?: string;
  /** The time when the case was closed, as reported by the external system. */
  caseCloseTime?: string;
  /** Information about the ticket, if any, that is being used to track the resolution of the issue that is identified by this finding. */
  ticketInfo?: TicketInfo;
}

export const GoogleCloudSecuritycenterV1ExternalSystem: Schema.Schema<GoogleCloudSecuritycenterV1ExternalSystem> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assignees: Schema.optional(Schema.Array(Schema.String)),
  externalUid: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  externalSystemUpdateTime: Schema.optional(Schema.String),
  caseUri: Schema.optional(Schema.String),
  casePriority: Schema.optional(Schema.String),
  caseSla: Schema.optional(Schema.String),
  caseCreateTime: Schema.optional(Schema.String),
  caseCloseTime: Schema.optional(Schema.String),
  ticketInfo: Schema.optional(TicketInfo),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ExternalSystem" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ExternalSystem>;

export interface MitreAttack {
  /** The MITRE ATT&CK tactic most closely represented by this finding, if any. */
  primaryTactic?: "TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT" | (string & {});
  /** The MITRE ATT&CK technique most closely represented by this finding, if any. primary_techniques is a repeated field because there are multiple levels of MITRE ATT&CK techniques. If the technique most closely represented by this finding is a sub-technique (e.g. `SCANNING_IP_BLOCKS`), both the sub-technique and its parent technique(s) will be listed (e.g. `SCANNING_IP_BLOCKS`, `ACTIVE_SCANNING`). */
  primaryTechniques?: Array<"TECHNIQUE_UNSPECIFIED" | "DATA_OBFUSCATION" | "DATA_OBFUSCATION_STEGANOGRAPHY" | "OS_CREDENTIAL_DUMPING" | "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM" | "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW" | "DATA_FROM_LOCAL_SYSTEM" | "AUTOMATED_EXFILTRATION" | "OBFUSCATED_FILES_OR_INFO" | "STEGANOGRAPHY" | "COMPILE_AFTER_DELIVERY" | "COMMAND_OBFUSCATION" | "SCHEDULED_TRANSFER" | "SYSTEM_OWNER_USER_DISCOVERY" | "MASQUERADING" | "MATCH_LEGITIMATE_NAME_OR_LOCATION" | "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS" | "STARTUP_ITEMS" | "NETWORK_SERVICE_DISCOVERY" | "SCHEDULED_TASK_JOB" | "SCHEDULED_TASK_JOB_CRON" | "CONTAINER_ORCHESTRATION_JOB" | "PROCESS_INJECTION" | "INPUT_CAPTURE" | "INPUT_CAPTURE_KEYLOGGING" | "PROCESS_DISCOVERY" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "PYTHON" | "EXPLOITATION_FOR_PRIVILEGE_ESCALATION" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "INDICATOR_REMOVAL" | "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS" | "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY" | "INDICATOR_REMOVAL_FILE_DELETION" | "INDICATOR_REMOVAL_TIMESTOMP" | "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA" | "APPLICATION_LAYER_PROTOCOL" | "DNS" | "SOFTWARE_DEPLOYMENT_TOOLS" | "VALID_ACCOUNTS" | "DEFAULT_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "FILE_AND_DIRECTORY_DISCOVERY" | "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "ACCOUNT_MANIPULATION" | "ADDITIONAL_CLOUD_CREDENTIALS" | "ADDITIONAL_CLOUD_ROLES" | "SSH_AUTHORIZED_KEYS" | "ADDITIONAL_CONTAINER_CLUSTER_ROLES" | "MULTI_STAGE_CHANNELS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "BRUTE_FORCE" | "AUTOMATED_COLLECTION" | "SHARED_MODULES" | "DATA_ENCODING" | "STANDARD_ENCODING" | "ACCESS_TOKEN_MANIPULATION" | "TOKEN_IMPERSONATION_OR_THEFT" | "CREATE_ACCOUNT" | "LOCAL_ACCOUNT" | "DEOBFUSCATE_DECODE_FILES_OR_INFO" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "SUPPLY_CHAIN_COMPROMISE" | "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS" | "EXPLOITATION_FOR_CLIENT_EXECUTION" | "USER_EXECUTION" | "EXPLOITATION_FOR_CREDENTIAL_ACCESS" | "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION" | "DOMAIN_POLICY_MODIFICATION" | "DATA_DESTRUCTION" | "DATA_ENCRYPTED_FOR_IMPACT" | "SERVICE_STOP" | "INHIBIT_SYSTEM_RECOVERY" | "FIRMWARE_CORRUPTION" | "RESOURCE_HIJACKING" | "NETWORK_DENIAL_OF_SERVICE" | "CLOUD_SERVICE_DISCOVERY" | "STEAL_APPLICATION_ACCESS_TOKEN" | "ACCOUNT_ACCESS_REMOVAL" | "TRANSFER_DATA_TO_CLOUD_ACCOUNT" | "STEAL_WEB_SESSION_COOKIE" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "EVENT_TRIGGERED_EXECUTION" | "BOOT_OR_LOGON_AUTOSTART_EXECUTION" | "KERNEL_MODULES_AND_EXTENSIONS" | "SHORTCUT_MODIFICATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING" | "UNSECURED_CREDENTIALS" | "CREDENTIALS_IN_FILES" | "BASH_HISTORY" | "PRIVATE_KEYS" | "SUBVERT_TRUST_CONTROL" | "INSTALL_ROOT_CERTIFICATE" | "COMPROMISE_HOST_SOFTWARE_BINARY" | "CREDENTIALS_FROM_PASSWORD_STORES" | "MODIFY_AUTHENTICATION_PROCESS" | "PLUGGABLE_AUTHENTICATION_MODULES" | "MULTI_FACTOR_AUTHENTICATION" | "IMPAIR_DEFENSES" | "DISABLE_OR_MODIFY_TOOLS" | "INDICATOR_BLOCKING" | "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM" | "HIDE_ARTIFACTS" | "HIDDEN_FILES_AND_DIRECTORIES" | "HIDDEN_USERS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "DYNAMIC_RESOLUTION" | "LATERAL_TOOL_TRANSFER" | "HIJACK_EXECUTION_FLOW" | "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "CREATE_SNAPSHOT" | "CLOUD_INFRASTRUCTURE_DISCOVERY" | "DEVELOP_CAPABILITIES" | "DEVELOP_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES" | "OBTAIN_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES_VULNERABILITIES" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "STAGE_CAPABILITIES" | "UPLOAD_MALWARE" | "CONTAINER_ADMINISTRATION_COMMAND" | "DEPLOY_CONTAINER" | "ESCAPE_TO_HOST" | "CONTAINER_AND_RESOURCE_DISCOVERY" | "REFLECTIVE_CODE_LOADING" | "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES" | "FINANCIAL_THEFT" | (string & {})>;
  /** Additional MITRE ATT&CK tactics related to this finding, if any. */
  additionalTactics?: Array<"TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT" | (string & {})>;
  /** Additional MITRE ATT&CK techniques related to this finding, if any, along with any of their respective parent techniques. */
  additionalTechniques?: Array<"TECHNIQUE_UNSPECIFIED" | "DATA_OBFUSCATION" | "DATA_OBFUSCATION_STEGANOGRAPHY" | "OS_CREDENTIAL_DUMPING" | "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM" | "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW" | "DATA_FROM_LOCAL_SYSTEM" | "AUTOMATED_EXFILTRATION" | "OBFUSCATED_FILES_OR_INFO" | "STEGANOGRAPHY" | "COMPILE_AFTER_DELIVERY" | "COMMAND_OBFUSCATION" | "SCHEDULED_TRANSFER" | "SYSTEM_OWNER_USER_DISCOVERY" | "MASQUERADING" | "MATCH_LEGITIMATE_NAME_OR_LOCATION" | "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS" | "STARTUP_ITEMS" | "NETWORK_SERVICE_DISCOVERY" | "SCHEDULED_TASK_JOB" | "SCHEDULED_TASK_JOB_CRON" | "CONTAINER_ORCHESTRATION_JOB" | "PROCESS_INJECTION" | "INPUT_CAPTURE" | "INPUT_CAPTURE_KEYLOGGING" | "PROCESS_DISCOVERY" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "PYTHON" | "EXPLOITATION_FOR_PRIVILEGE_ESCALATION" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "INDICATOR_REMOVAL" | "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS" | "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY" | "INDICATOR_REMOVAL_FILE_DELETION" | "INDICATOR_REMOVAL_TIMESTOMP" | "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA" | "APPLICATION_LAYER_PROTOCOL" | "DNS" | "SOFTWARE_DEPLOYMENT_TOOLS" | "VALID_ACCOUNTS" | "DEFAULT_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "FILE_AND_DIRECTORY_DISCOVERY" | "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "ACCOUNT_MANIPULATION" | "ADDITIONAL_CLOUD_CREDENTIALS" | "ADDITIONAL_CLOUD_ROLES" | "SSH_AUTHORIZED_KEYS" | "ADDITIONAL_CONTAINER_CLUSTER_ROLES" | "MULTI_STAGE_CHANNELS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "BRUTE_FORCE" | "AUTOMATED_COLLECTION" | "SHARED_MODULES" | "DATA_ENCODING" | "STANDARD_ENCODING" | "ACCESS_TOKEN_MANIPULATION" | "TOKEN_IMPERSONATION_OR_THEFT" | "CREATE_ACCOUNT" | "LOCAL_ACCOUNT" | "DEOBFUSCATE_DECODE_FILES_OR_INFO" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "SUPPLY_CHAIN_COMPROMISE" | "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS" | "EXPLOITATION_FOR_CLIENT_EXECUTION" | "USER_EXECUTION" | "EXPLOITATION_FOR_CREDENTIAL_ACCESS" | "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION" | "DOMAIN_POLICY_MODIFICATION" | "DATA_DESTRUCTION" | "DATA_ENCRYPTED_FOR_IMPACT" | "SERVICE_STOP" | "INHIBIT_SYSTEM_RECOVERY" | "FIRMWARE_CORRUPTION" | "RESOURCE_HIJACKING" | "NETWORK_DENIAL_OF_SERVICE" | "CLOUD_SERVICE_DISCOVERY" | "STEAL_APPLICATION_ACCESS_TOKEN" | "ACCOUNT_ACCESS_REMOVAL" | "TRANSFER_DATA_TO_CLOUD_ACCOUNT" | "STEAL_WEB_SESSION_COOKIE" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "EVENT_TRIGGERED_EXECUTION" | "BOOT_OR_LOGON_AUTOSTART_EXECUTION" | "KERNEL_MODULES_AND_EXTENSIONS" | "SHORTCUT_MODIFICATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING" | "UNSECURED_CREDENTIALS" | "CREDENTIALS_IN_FILES" | "BASH_HISTORY" | "PRIVATE_KEYS" | "SUBVERT_TRUST_CONTROL" | "INSTALL_ROOT_CERTIFICATE" | "COMPROMISE_HOST_SOFTWARE_BINARY" | "CREDENTIALS_FROM_PASSWORD_STORES" | "MODIFY_AUTHENTICATION_PROCESS" | "PLUGGABLE_AUTHENTICATION_MODULES" | "MULTI_FACTOR_AUTHENTICATION" | "IMPAIR_DEFENSES" | "DISABLE_OR_MODIFY_TOOLS" | "INDICATOR_BLOCKING" | "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM" | "HIDE_ARTIFACTS" | "HIDDEN_FILES_AND_DIRECTORIES" | "HIDDEN_USERS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "DYNAMIC_RESOLUTION" | "LATERAL_TOOL_TRANSFER" | "HIJACK_EXECUTION_FLOW" | "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "CREATE_SNAPSHOT" | "CLOUD_INFRASTRUCTURE_DISCOVERY" | "DEVELOP_CAPABILITIES" | "DEVELOP_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES" | "OBTAIN_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES_VULNERABILITIES" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "STAGE_CAPABILITIES" | "UPLOAD_MALWARE" | "CONTAINER_ADMINISTRATION_COMMAND" | "DEPLOY_CONTAINER" | "ESCAPE_TO_HOST" | "CONTAINER_AND_RESOURCE_DISCOVERY" | "REFLECTIVE_CODE_LOADING" | "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES" | "FINANCIAL_THEFT" | (string & {})>;
  /** The MITRE ATT&CK version referenced by the above fields. E.g. "8". */
  version?: string;
}

export const MitreAttack: Schema.Schema<MitreAttack> = Schema.suspend(() => Schema.Struct({
  primaryTactic: Schema.optional(Schema.String),
  primaryTechniques: Schema.optional(Schema.Array(Schema.String)),
  additionalTactics: Schema.optional(Schema.Array(Schema.String)),
  additionalTechniques: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "MitreAttack" }) as any as Schema.Schema<MitreAttack>;

export interface Geolocation {
  /** A CLDR. */
  regionCode?: string;
}

export const Geolocation: Schema.Schema<Geolocation> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Geolocation" }) as any as Schema.Schema<Geolocation>;

export interface ServiceAccountDelegationInfo {
  /** The email address of a Google account. */
  principalEmail?: string;
  /** A string representing the principal_subject associated with the identity. As compared to `principal_email`, supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subjects/{subject}` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` */
  principalSubject?: string;
}

export const ServiceAccountDelegationInfo: Schema.Schema<ServiceAccountDelegationInfo> = Schema.suspend(() => Schema.Struct({
  principalEmail: Schema.optional(Schema.String),
  principalSubject: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAccountDelegationInfo" }) as any as Schema.Schema<ServiceAccountDelegationInfo>;

export interface Access {
  /** Associated email, such as "foo@google.com". The email address of the authenticated user or a service account acting on behalf of a third party principal making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id). */
  principalEmail?: string;
  /** Caller's IP address, such as "1.1.1.1". */
  callerIp?: string;
  /** The caller IP's geolocation, which identifies where the call came from. */
  callerIpGeo?: Geolocation;
  /** Type of user agent associated with the finding. For example, an operating system shell or an embedded or standalone application. */
  userAgentFamily?: string;
  /** The caller's user agent string associated with the finding. */
  userAgent?: string;
  /** This is the API service that the service account made a call to, e.g. "iam.googleapis.com" */
  serviceName?: string;
  /** The method that the service account called, e.g. "SetIamPolicy". */
  methodName?: string;
  /** A string that represents the principal_subject that is associated with the identity. Unlike `principal_email`, `principal_subject` supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format is `principal://iam.googleapis.com/{identity pool name}/subject/{subject}`. Some GKE identities, such as GKE_WORKLOAD, FREEFORM, and GKE_HUB_WORKLOAD, still use the legacy format `serviceAccount:{identity pool name}[{subject}]`. */
  principalSubject?: string;
  /** The name of the service account key that was used to create or exchange credentials when authenticating the service account that made the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}". */
  serviceAccountKeyName?: string;
  /** The identity delegation history of an authenticated service account that made the request. The `serviceAccountDelegationInfo[]` object contains information about the real authorities that try to access Google Cloud resources by delegating on a service account. When multiple authorities are present, they are guaranteed to be sorted based on the original ordering of the identity delegation events. */
  serviceAccountDelegationInfo?: Array<ServiceAccountDelegationInfo>;
  /** A string that represents a username. The username provided depends on the type of the finding and is likely not an IAM principal. For example, this can be a system username if the finding is related to a virtual machine, or it can be an application login username. */
  userName?: string;
}

export const Access: Schema.Schema<Access> = Schema.suspend(() => Schema.Struct({
  principalEmail: Schema.optional(Schema.String),
  callerIp: Schema.optional(Schema.String),
  callerIpGeo: Schema.optional(Geolocation),
  userAgentFamily: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  methodName: Schema.optional(Schema.String),
  principalSubject: Schema.optional(Schema.String),
  serviceAccountKeyName: Schema.optional(Schema.String),
  serviceAccountDelegationInfo: Schema.optional(Schema.Array(ServiceAccountDelegationInfo)),
  userName: Schema.optional(Schema.String),
})).annotate({ identifier: "Access" }) as any as Schema.Schema<Access>;

export interface Connection {
  /** Destination IP address. Not present for sockets that are listening and not connected. */
  destinationIp?: string;
  /** Destination port. Not present for sockets that are listening and not connected. */
  destinationPort?: number;
  /** Source IP address. */
  sourceIp?: string;
  /** Source port. */
  sourcePort?: number;
  /** IANA Internet Protocol Number such as TCP(6) and UDP(17). */
  protocol?: "PROTOCOL_UNSPECIFIED" | "ICMP" | "TCP" | "UDP" | "GRE" | "ESP" | (string & {});
}

export const Connection: Schema.Schema<Connection> = Schema.suspend(() => Schema.Struct({
  destinationIp: Schema.optional(Schema.String),
  destinationPort: Schema.optional(Schema.Number),
  sourceIp: Schema.optional(Schema.String),
  sourcePort: Schema.optional(Schema.Number),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "Connection" }) as any as Schema.Schema<Connection>;

export interface StaticMute {
  /** The static mute state. If the value is `MUTED` or `UNMUTED`, then the finding's overall mute state will have the same value. */
  state?: "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED" | (string & {});
  /** When the static mute was applied. */
  applyTime?: string;
}

export const StaticMute: Schema.Schema<StaticMute> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  applyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "StaticMute" }) as any as Schema.Schema<StaticMute>;

export interface DynamicMuteRecord {
  /** The relative resource name of the mute rule, represented by a mute config, that created this record, for example `organizations/123/muteConfigs/mymuteconfig` or `organizations/123/locations/global/muteConfigs/mymuteconfig`. */
  muteConfig?: string;
  /** When the dynamic mute rule first matched the finding. */
  matchTime?: string;
}

export const DynamicMuteRecord: Schema.Schema<DynamicMuteRecord> = Schema.suspend(() => Schema.Struct({
  muteConfig: Schema.optional(Schema.String),
  matchTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicMuteRecord" }) as any as Schema.Schema<DynamicMuteRecord>;

export interface MuteInfo {
  /** If set, the static mute applied to this finding. Static mutes override dynamic mutes. If unset, there is no static mute. */
  staticMute?: StaticMute;
  /** The list of dynamic mute rules that currently match the finding. */
  dynamicMuteRecords?: Array<DynamicMuteRecord>;
}

export const MuteInfo: Schema.Schema<MuteInfo> = Schema.suspend(() => Schema.Struct({
  staticMute: Schema.optional(StaticMute),
  dynamicMuteRecords: Schema.optional(Schema.Array(DynamicMuteRecord)),
})).annotate({ identifier: "MuteInfo" }) as any as Schema.Schema<MuteInfo>;

export interface DiskPath {
  /** UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid) */
  partitionUuid?: string;
  /** Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh */
  relativePath?: string;
}

export const DiskPath: Schema.Schema<DiskPath> = Schema.suspend(() => Schema.Struct({
  partitionUuid: Schema.optional(Schema.String),
  relativePath: Schema.optional(Schema.String),
})).annotate({ identifier: "DiskPath" }) as any as Schema.Schema<DiskPath>;

export interface FileOperation {
  /** The type of the operation */
  type?: "OPERATION_TYPE_UNSPECIFIED" | "OPEN" | "READ" | "RENAME" | "WRITE" | "EXECUTE" | (string & {});
}

export const FileOperation: Schema.Schema<FileOperation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "FileOperation" }) as any as Schema.Schema<FileOperation>;

export interface File {
  /** Absolute path of the file as a JSON encoded string. */
  path?: string;
  /** Size of the file in bytes. */
  size?: string;
  /** SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file. */
  sha256?: string;
  /** The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file. */
  hashedSize?: string;
  /** True when the hash covers only a prefix of the file. */
  partiallyHashed?: boolean;
  /** Prefix of the file contents as a JSON-encoded string. */
  contents?: string;
  /** Path of the file in terms of underlying disk/partition identifiers. */
  diskPath?: DiskPath;
  /** Operation(s) performed on a file. */
  operations?: Array<FileOperation>;
  /** The load state of the file. */
  fileLoadState?: "FILE_LOAD_STATE_UNSPECIFIED" | "LOADED_BY_PROCESS" | "NOT_LOADED_BY_PROCESS" | (string & {});
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  sha256: Schema.optional(Schema.String),
  hashedSize: Schema.optional(Schema.String),
  partiallyHashed: Schema.optional(Schema.Boolean),
  contents: Schema.optional(Schema.String),
  diskPath: Schema.optional(DiskPath),
  operations: Schema.optional(Schema.Array(FileOperation)),
  fileLoadState: Schema.optional(Schema.String),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface EnvironmentVariable {
  /** Environment variable name as a JSON encoded string. */
  name?: string;
  /** Environment variable value as a JSON encoded string. */
  val?: string;
}

export const EnvironmentVariable: Schema.Schema<EnvironmentVariable> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  val: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvironmentVariable" }) as any as Schema.Schema<EnvironmentVariable>;

export interface Process {
  /** The process name, as displayed in utilities like `top` and `ps`. This name can be accessed through `/proc/[pid]/comm` and changed with `prctl(PR_SET_NAME)`. */
  name?: string;
  /** File information for the process executable. */
  binary?: File;
  /** File information for libraries loaded by the process. */
  libraries?: Array<File>;
  /** When the process represents the invocation of a script, `binary` provides information about the interpreter, while `script` provides information about the script file provided to the interpreter. */
  script?: File;
  /** Process arguments as JSON encoded strings. */
  args?: Array<string>;
  /** True if `args` is incomplete. */
  argumentsTruncated?: boolean;
  /** Process environment variables. */
  envVariables?: Array<EnvironmentVariable>;
  /** True if `env_variables` is incomplete. */
  envVariablesTruncated?: boolean;
  /** The process ID. */
  pid?: string;
  /** The parent process ID. */
  parentPid?: string;
  /** The ID of the user that executed the process. E.g. If this is the root user this will always be 0. */
  userId?: string;
}

export const Process: Schema.Schema<Process> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  binary: Schema.optional(File),
  libraries: Schema.optional(Schema.Array(File)),
  script: Schema.optional(File),
  args: Schema.optional(Schema.Array(Schema.String)),
  argumentsTruncated: Schema.optional(Schema.Boolean),
  envVariables: Schema.optional(Schema.Array(EnvironmentVariable)),
  envVariablesTruncated: Schema.optional(Schema.Boolean),
  pid: Schema.optional(Schema.String),
  parentPid: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "Process" }) as any as Schema.Schema<Process>;

export interface Contact {
  /** An email address. For example, "`person123@company.com`". */
  email?: string;
}

export const Contact: Schema.Schema<Contact> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "Contact" }) as any as Schema.Schema<Contact>;

export interface ContactDetails {
  /** A list of contacts */
  contacts?: Array<Contact>;
}

export const ContactDetails: Schema.Schema<ContactDetails> = Schema.suspend(() => Schema.Struct({
  contacts: Schema.optional(Schema.Array(Contact)),
})).annotate({ identifier: "ContactDetails" }) as any as Schema.Schema<ContactDetails>;

export interface Compliance {
  /** Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP. */
  standard?: string;
  /** Version of the standard or benchmark, for example, 1.1 */
  version?: string;
  /** Policies within the standard or benchmark, for example, A.12.4.1 */
  ids?: Array<string>;
}

export const Compliance: Schema.Schema<Compliance> = Schema.suspend(() => Schema.Struct({
  standard: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Compliance" }) as any as Schema.Schema<Compliance>;

export interface ExfilResource {
  /** The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name). */
  name?: string;
  /** Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket. */
  components?: Array<string>;
}

export const ExfilResource: Schema.Schema<ExfilResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  components: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExfilResource" }) as any as Schema.Schema<ExfilResource>;

export interface Exfiltration {
  /** If there are multiple sources, then the data is considered "joined" between them. For instance, BigQuery can join multiple tables, and each table would be considered a source. */
  sources?: Array<ExfilResource>;
  /** If there are multiple targets, each target would get a complete copy of the "joined" source data. */
  targets?: Array<ExfilResource>;
  /** Total exfiltrated bytes processed for the entire job. */
  totalExfiltratedBytes?: string;
}

export const Exfiltration: Schema.Schema<Exfiltration> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(ExfilResource)),
  targets: Schema.optional(Schema.Array(ExfilResource)),
  totalExfiltratedBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "Exfiltration" }) as any as Schema.Schema<Exfiltration>;

export interface IamBinding {
  /** The action that was performed on a Binding. */
  action?: "ACTION_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** Role that is assigned to "members". For example, "roles/viewer", "roles/editor", or "roles/owner". */
  role?: string;
  /** A single identity requesting access for a Cloud Platform resource, for example, "foo@google.com". */
  member?: string;
}

export const IamBinding: Schema.Schema<IamBinding> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  member: Schema.optional(Schema.String),
})).annotate({ identifier: "IamBinding" }) as any as Schema.Schema<IamBinding>;

export interface Label {
  /** Name of the label. */
  name?: string;
  /** Value that corresponds to the label's name. */
  value?: string;
}

export const Label: Schema.Schema<Label> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface Container {
  /** Name of the container. */
  name?: string;
  /** Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags. */
  uri?: string;
  /** Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest. */
  imageId?: string;
  /** Container labels, as provided by the container runtime. */
  labels?: Array<Label>;
  /** The time that the container was created. */
  createTime?: string;
}

export const Container: Schema.Schema<Container> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  imageId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Label)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Container" }) as any as Schema.Schema<Container>;

export interface Pod {
  /** Kubernetes Pod namespace. */
  ns?: string;
  /** Kubernetes Pod name. */
  name?: string;
  /** Pod labels. For Kubernetes containers, these are applied to the container. */
  labels?: Array<Label>;
  /** Pod containers associated with this finding, if any. */
  containers?: Array<Container>;
}

export const Pod: Schema.Schema<Pod> = Schema.suspend(() => Schema.Struct({
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Label)),
  containers: Schema.optional(Schema.Array(Container)),
})).annotate({ identifier: "Pod" }) as any as Schema.Schema<Pod>;

export interface Node {
  /** [Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node. */
  name?: string;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface NodePool {
  /** Kubernetes node pool name. */
  name?: string;
  /** Nodes associated with the finding. */
  nodes?: Array<Node>;
}

export const NodePool: Schema.Schema<NodePool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  nodes: Schema.optional(Schema.Array(Node)),
})).annotate({ identifier: "NodePool" }) as any as Schema.Schema<NodePool>;

export interface Role {
  /** Role type. */
  kind?: "KIND_UNSPECIFIED" | "ROLE" | "CLUSTER_ROLE" | (string & {});
  /** Role namespace. */
  ns?: string;
  /** Role name. */
  name?: string;
}

export const Role: Schema.Schema<Role> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Role" }) as any as Schema.Schema<Role>;

export interface Subject {
  /** Authentication type for the subject. */
  kind?: "AUTH_TYPE_UNSPECIFIED" | "USER" | "SERVICEACCOUNT" | "GROUP" | (string & {});
  /** Namespace for the subject. */
  ns?: string;
  /** Name for the subject. */
  name?: string;
}

export const Subject: Schema.Schema<Subject> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface GoogleCloudSecuritycenterV1Binding {
  /** Namespace for the binding. */
  ns?: string;
  /** Name for the binding. */
  name?: string;
  /** The Role or ClusterRole referenced by the binding. */
  role?: Role;
  /** Represents one or more subjects that are bound to the role. Not always available for PATCH requests. */
  subjects?: Array<Subject>;
}

export const GoogleCloudSecuritycenterV1Binding: Schema.Schema<GoogleCloudSecuritycenterV1Binding> = Schema.suspend(() => Schema.Struct({
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  role: Schema.optional(Role),
  subjects: Schema.optional(Schema.Array(Subject)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1Binding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1Binding>;

export interface AccessReview {
  /** The API group of the resource. "*" means all. */
  group?: string;
  /** Namespace of the action being requested. Currently, there is no distinction between no namespace and all namespaces. Both are represented by "" (empty). */
  ns?: string;
  /** The name of the resource being requested. Empty means all. */
  name?: string;
  /** The optional resource type requested. "*" means all. */
  resource?: string;
  /** The optional subresource type. */
  subresource?: string;
  /** A Kubernetes resource API verb, like get, list, watch, create, update, delete, proxy. "*" means all. */
  verb?: string;
  /** The API version of the resource. "*" means all. */
  version?: string;
}

export const AccessReview: Schema.Schema<AccessReview> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  subresource: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessReview" }) as any as Schema.Schema<AccessReview>;

export interface Securitycenter_Object {
  /** Kubernetes object group, such as "policy.k8s.io/v1". */
  group?: string;
  /** Kubernetes object kind, such as "Namespace". */
  kind?: string;
  /** Kubernetes object namespace. Must be a valid DNS label. Named "ns" to avoid collision with C++ namespace keyword. For details see https://kubernetes.io/docs/tasks/administer-cluster/namespaces/. */
  ns?: string;
  /** Kubernetes object name. For details see https://kubernetes.io/docs/concepts/overview/working-with-objects/names/. */
  name?: string;
  /** Pod containers associated with this finding, if any. */
  containers?: Array<Container>;
}

export const Securitycenter_Object: Schema.Schema<Securitycenter_Object> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(Container)),
})).annotate({ identifier: "Securitycenter_Object" }) as any as Schema.Schema<Securitycenter_Object>;

export interface Kubernetes {
  /** Kubernetes [Pods](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) associated with the finding. This field contains Pod records for each container that is owned by a Pod. */
  pods?: Array<Pod>;
  /** Provides Kubernetes [node](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture#nodes) information. */
  nodes?: Array<Node>;
  /** GKE [node pools](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools) associated with the finding. This field contains node pool information for each node, when it is available. */
  nodePools?: Array<NodePool>;
  /** Provides Kubernetes role information for findings that involve [Roles or ClusterRoles](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control). */
  roles?: Array<Role>;
  /** Provides Kubernetes role binding information for findings that involve [RoleBindings or ClusterRoleBindings](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control). */
  bindings?: Array<GoogleCloudSecuritycenterV1Binding>;
  /** Provides information on any Kubernetes access reviews (privilege checks) relevant to the finding. */
  accessReviews?: Array<AccessReview>;
  /** Kubernetes objects related to the finding. */
  objects?: Array<Securitycenter_Object>;
}

export const Kubernetes: Schema.Schema<Kubernetes> = Schema.suspend(() => Schema.Struct({
  pods: Schema.optional(Schema.Array(Pod)),
  nodes: Schema.optional(Schema.Array(Node)),
  nodePools: Schema.optional(Schema.Array(NodePool)),
  roles: Schema.optional(Schema.Array(Role)),
  bindings: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1Binding)),
  accessReviews: Schema.optional(Schema.Array(AccessReview)),
  objects: Schema.optional(Schema.Array(Securitycenter_Object)),
})).annotate({ identifier: "Kubernetes" }) as any as Schema.Schema<Kubernetes>;

export interface Database {
  /** Some database resources may not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types are not yet supported by Cloud Asset Inventory (e.g. Cloud SQL databases). In these cases only the display name will be provided. The [full resource name](https://google.aip.dev/122#full-resource-names) of the database that the user connected to, if it is supported by Cloud Asset Inventory. */
  name?: string;
  /** The human-readable name of the database that the user connected to. */
  displayName?: string;
  /** The username used to connect to the database. The username might not be an IAM principal and does not have a set format. */
  userName?: string;
  /** The SQL statement that is associated with the database access. */
  query?: string;
  /** The target usernames, roles, or groups of an SQL privilege grant, which is not an IAM policy change. */
  grantees?: Array<string>;
  /** The version of the database, for example, POSTGRES_14. See [the complete list](https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/SqlDatabaseVersion). */
  version?: string;
}

export const Database: Schema.Schema<Database> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  userName: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  grantees: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "Database" }) as any as Schema.Schema<Database>;

export interface AttackExposure {
  /** A number between 0 (inclusive) and infinity that represents how important this finding is to remediate. The higher the score, the more important it is to remediate. */
  score?: number;
  /** The most recent time the attack exposure was updated on this finding. */
  latestCalculationTime?: string;
  /** The resource name of the attack path simulation result that contains the details regarding this attack exposure score. Example: `organizations/123/simulations/456/attackExposureResults/789` */
  attackExposureResult?: string;
  /** What state this AttackExposure is in. This captures whether or not an attack exposure has been calculated or not. */
  state?: "STATE_UNSPECIFIED" | "CALCULATED" | "NOT_CALCULATED" | (string & {});
  /** The number of high value resources that are exposed as a result of this finding. */
  exposedHighValueResourcesCount?: number;
  /** The number of medium value resources that are exposed as a result of this finding. */
  exposedMediumValueResourcesCount?: number;
  /** The number of high value resources that are exposed as a result of this finding. */
  exposedLowValueResourcesCount?: number;
}

export const AttackExposure: Schema.Schema<AttackExposure> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  latestCalculationTime: Schema.optional(Schema.String),
  attackExposureResult: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  exposedHighValueResourcesCount: Schema.optional(Schema.Number),
  exposedMediumValueResourcesCount: Schema.optional(Schema.Number),
  exposedLowValueResourcesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "AttackExposure" }) as any as Schema.Schema<AttackExposure>;

export interface CloudDlpInspection {
  /** Name of the inspection job, for example, `projects/123/locations/europe/dlpJobs/i-8383929`. */
  inspectJob?: string;
  /** The type of information (or *[infoType](https://cloud.google.com/dlp/docs/infotypes-reference)*) found, for example, `EMAIL_ADDRESS` or `STREET_ADDRESS`. */
  infoType?: string;
  /** The number of times Cloud DLP found this infoType within this job and resource. */
  infoTypeCount?: string;
  /** Whether Cloud DLP scanned the complete resource or a sampled subset. */
  fullScan?: boolean;
}

export const CloudDlpInspection: Schema.Schema<CloudDlpInspection> = Schema.suspend(() => Schema.Struct({
  inspectJob: Schema.optional(Schema.String),
  infoType: Schema.optional(Schema.String),
  infoTypeCount: Schema.optional(Schema.String),
  fullScan: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CloudDlpInspection" }) as any as Schema.Schema<CloudDlpInspection>;

export interface SensitivityScore {
  /** The sensitivity score applied to the resource. */
  score?: "SENSITIVITY_SCORE_LEVEL_UNSPECIFIED" | "SENSITIVITY_LOW" | "SENSITIVITY_UNKNOWN" | "SENSITIVITY_MODERATE" | "SENSITIVITY_HIGH" | (string & {});
}

export const SensitivityScore: Schema.Schema<SensitivityScore> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "SensitivityScore" }) as any as Schema.Schema<SensitivityScore>;

export interface InfoType {
  /** Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`. */
  name?: string;
  /** Optional version name for this InfoType. */
  version?: string;
  /** Optional custom sensitivity for this InfoType. This only applies to data profiling. */
  sensitivityScore?: SensitivityScore;
}

export const InfoType: Schema.Schema<InfoType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(SensitivityScore),
})).annotate({ identifier: "InfoType" }) as any as Schema.Schema<InfoType>;

export interface CloudDlpDataProfile {
  /** Name of the data profile, for example, `projects/123/locations/europe/tableProfiles/8383929`. */
  dataProfile?: string;
  /** The resource hierarchy level at which the data profile was generated. */
  parentType?: "PARENT_TYPE_UNSPECIFIED" | "ORGANIZATION" | "PROJECT" | (string & {});
  /** Type of information detected by SDP. Info type includes name, version and sensitivity of the detected information type. */
  infoTypes?: Array<InfoType>;
}

export const CloudDlpDataProfile: Schema.Schema<CloudDlpDataProfile> = Schema.suspend(() => Schema.Struct({
  dataProfile: Schema.optional(Schema.String),
  parentType: Schema.optional(Schema.String),
  infoTypes: Schema.optional(Schema.Array(InfoType)),
})).annotate({ identifier: "CloudDlpDataProfile" }) as any as Schema.Schema<CloudDlpDataProfile>;

export interface KernelRootkit {
  /** Rootkit name, when available. */
  name?: string;
  /** True if unexpected modifications of kernel code memory are present. */
  unexpectedCodeModification?: boolean;
  /** True if unexpected modifications of kernel read-only data memory are present. */
  unexpectedReadOnlyDataModification?: boolean;
  /** True if `ftrace` points are present with callbacks pointing to regions that are not in the expected kernel or module code range. */
  unexpectedFtraceHandler?: boolean;
  /** True if `kprobe` points are present with callbacks pointing to regions that are not in the expected kernel or module code range. */
  unexpectedKprobeHandler?: boolean;
  /** True if kernel code pages that are not in the expected kernel or module code regions are present. */
  unexpectedKernelCodePages?: boolean;
  /** True if system call handlers that are are not in the expected kernel or module code regions are present. */
  unexpectedSystemCallHandler?: boolean;
  /** True if interrupt handlers that are are not in the expected kernel or module code regions are present. */
  unexpectedInterruptHandler?: boolean;
  /** True if unexpected processes in the scheduler run queue are present. Such processes are in the run queue, but not in the process task list. */
  unexpectedProcessesInRunqueue?: boolean;
}

export const KernelRootkit: Schema.Schema<KernelRootkit> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  unexpectedCodeModification: Schema.optional(Schema.Boolean),
  unexpectedReadOnlyDataModification: Schema.optional(Schema.Boolean),
  unexpectedFtraceHandler: Schema.optional(Schema.Boolean),
  unexpectedKprobeHandler: Schema.optional(Schema.Boolean),
  unexpectedKernelCodePages: Schema.optional(Schema.Boolean),
  unexpectedSystemCallHandler: Schema.optional(Schema.Boolean),
  unexpectedInterruptHandler: Schema.optional(Schema.Boolean),
  unexpectedProcessesInRunqueue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KernelRootkit" }) as any as Schema.Schema<KernelRootkit>;

export interface OrgPolicy {
  /** The resource name of the org policy. Example: "organizations/{organization_id}/policies/{constraint_name}" */
  name?: string;
}

export const OrgPolicy: Schema.Schema<OrgPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OrgPolicy" }) as any as Schema.Schema<OrgPolicy>;

export interface Job {
  /** The fully-qualified name for a job. e.g. `projects//jobs/` */
  name?: string;
  /** Output only. State of the job, such as `RUNNING` or `PENDING`. */
  state?: "JOB_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Optional. If the job did not complete successfully, this field describes why. */
  errorCode?: number;
  /** Optional. Gives the location where the job ran, such as `US` or `europe-west1` */
  location?: string;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.Number),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface Application {
  /** The base URI that identifies the network location of the application in which the vulnerability was detected. For example, `http://example.com`. */
  baseUri?: string;
  /** The full URI with payload that can be used to reproduce the vulnerability. For example, `http://example.com?p=aMmYgI6H`. */
  fullUri?: string;
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  baseUri: Schema.optional(Schema.String),
  fullUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface PortRange {
  /** Minimum port value. */
  min?: string;
  /** Maximum port value. */
  max?: string;
}

export const PortRange: Schema.Schema<PortRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.String),
  max: Schema.optional(Schema.String),
})).annotate({ identifier: "PortRange" }) as any as Schema.Schema<PortRange>;

export interface IpRule {
  /** The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value. */
  protocol?: string;
  /** Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number. */
  portRanges?: Array<PortRange>;
}

export const IpRule: Schema.Schema<IpRule> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  portRanges: Schema.optional(Schema.Array(PortRange)),
})).annotate({ identifier: "IpRule" }) as any as Schema.Schema<IpRule>;

export interface Allowed {
  /** Optional. Optional list of allowed IP rules. */
  ipRules?: Array<IpRule>;
}

export const Allowed: Schema.Schema<Allowed> = Schema.suspend(() => Schema.Struct({
  ipRules: Schema.optional(Schema.Array(IpRule)),
})).annotate({ identifier: "Allowed" }) as any as Schema.Schema<Allowed>;

export interface Denied {
  /** Optional. Optional list of denied IP rules. */
  ipRules?: Array<IpRule>;
}

export const Denied: Schema.Schema<Denied> = Schema.suspend(() => Schema.Struct({
  ipRules: Schema.optional(Schema.Array(IpRule)),
})).annotate({ identifier: "Denied" }) as any as Schema.Schema<Denied>;

export interface IpRules {
  /** The direction that the rule is applicable to, one of ingress or egress. */
  direction?: "DIRECTION_UNSPECIFIED" | "INGRESS" | "EGRESS" | (string & {});
  /** Tuple with allowed rules. */
  allowed?: Allowed;
  /** Tuple with denied rules. */
  denied?: Denied;
  /** If source IP ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4. */
  sourceIpRanges?: Array<string>;
  /** If destination IP ranges are specified, the firewall rule applies only to traffic that has a destination IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4. */
  destinationIpRanges?: Array<string>;
  /** Name of the network protocol service, such as FTP, that is exposed by the open port. Follows the naming convention available at: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml. */
  exposedServices?: Array<string>;
}

export const IpRules: Schema.Schema<IpRules> = Schema.suspend(() => Schema.Struct({
  direction: Schema.optional(Schema.String),
  allowed: Schema.optional(Allowed),
  denied: Schema.optional(Denied),
  sourceIpRanges: Schema.optional(Schema.Array(Schema.String)),
  destinationIpRanges: Schema.optional(Schema.Array(Schema.String)),
  exposedServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IpRules" }) as any as Schema.Schema<IpRules>;

export interface BackupDisasterRecovery {
  /** The name of a Backup and DR template which comprises one or more backup policies. See the [Backup and DR documentation](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#temp) for more information. For example, `snap-ov`. */
  backupTemplate?: string;
  /** The names of Backup and DR policies that are associated with a template and that define when to run a backup, how frequently to run a backup, and how long to retain the backup image. For example, `onvaults`. */
  policies?: Array<string>;
  /** The name of a Backup and DR host, which is managed by the backup and recovery appliance and known to the management console. The host can be of type Generic (for example, Compute Engine, SQL Server, Oracle DB, SMB file system, etc.), vCenter, or an ESX server. See the [Backup and DR documentation on hosts](https://cloud.google.com/backup-disaster-recovery/docs/configuration/manage-hosts-and-their-applications) for more information. For example, `centos7-01`. */
  host?: string;
  /** The names of Backup and DR applications. An application is a VM, database, or file system on a managed host monitored by a backup and recovery appliance. For example, `centos7-01-vol00`, `centos7-01-vol01`, `centos7-01-vol02`. */
  applications?: Array<string>;
  /** The name of the Backup and DR storage pool that the backup and recovery appliance is storing data in. The storage pool could be of type Cloud, Primary, Snapshot, or OnVault. See the [Backup and DR documentation on storage pools](https://cloud.google.com/backup-disaster-recovery/docs/concepts/storage-pools). For example, `DiskPoolOne`. */
  storagePool?: string;
  /** The names of Backup and DR advanced policy options of a policy applying to an application. See the [Backup and DR documentation on policy options](https://cloud.google.com/backup-disaster-recovery/docs/create-plan/policy-settings). For example, `skipofflineappsincongrp, nounmap`. */
  policyOptions?: Array<string>;
  /** The name of the Backup and DR resource profile that specifies the storage media for backups of application and VM data. See the [Backup and DR documentation on profiles](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#profile). For example, `GCP`. */
  profile?: string;
  /** The name of the Backup and DR appliance that captures, moves, and manages the lifecycle of backup data. For example, `backup-server-57137`. */
  appliance?: string;
  /** The backup type of the Backup and DR image. For example, `Snapshot`, `Remote Snapshot`, `OnVault`. */
  backupType?: string;
  /** The timestamp at which the Backup and DR backup was created. */
  backupCreateTime?: string;
}

export const BackupDisasterRecovery: Schema.Schema<BackupDisasterRecovery> = Schema.suspend(() => Schema.Struct({
  backupTemplate: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  host: Schema.optional(Schema.String),
  applications: Schema.optional(Schema.Array(Schema.String)),
  storagePool: Schema.optional(Schema.String),
  policyOptions: Schema.optional(Schema.Array(Schema.String)),
  profile: Schema.optional(Schema.String),
  appliance: Schema.optional(Schema.String),
  backupType: Schema.optional(Schema.String),
  backupCreateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupDisasterRecovery" }) as any as Schema.Schema<BackupDisasterRecovery>;

export interface PolicyDriftDetails {
  /** The name of the updated field, for example constraint.implementation.policy_rules[0].enforce */
  field?: string;
  /** The value of this field that was configured in a posture, for example, `true` or `allowed_values={"projects/29831892"}`. */
  expectedValue?: string;
  /** The detected value that violates the deployed posture, for example, `false` or `allowed_values={"projects/22831892"}`. */
  detectedValue?: string;
}

export const PolicyDriftDetails: Schema.Schema<PolicyDriftDetails> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  expectedValue: Schema.optional(Schema.String),
  detectedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyDriftDetails" }) as any as Schema.Schema<PolicyDriftDetails>;

export interface SecurityPosture {
  /** Name of the posture, for example, `CIS-Posture`. */
  name?: string;
  /** The version of the posture, for example, `c7cfa2a8`. */
  revisionId?: string;
  /** The project, folder, or organization on which the posture is deployed, for example, `projects/{project_number}`. */
  postureDeploymentResource?: string;
  /** The name of the posture deployment, for example, `organizations/{org_id}/posturedeployments/{posture_deployment_id}`. */
  postureDeployment?: string;
  /** The name of the updated policy, for example, `projects/{project_id}/policies/{constraint_name}`. */
  changedPolicy?: string;
  /** The name of the updated policyset, for example, `cis-policyset`. */
  policySet?: string;
  /** The ID of the updated policy, for example, `compute-policy-1`. */
  policy?: string;
  /** The details about a change in an updated policy that violates the deployed posture. */
  policyDriftDetails?: Array<PolicyDriftDetails>;
}

export const SecurityPosture: Schema.Schema<SecurityPosture> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  postureDeploymentResource: Schema.optional(Schema.String),
  postureDeployment: Schema.optional(Schema.String),
  changedPolicy: Schema.optional(Schema.String),
  policySet: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  policyDriftDetails: Schema.optional(Schema.Array(PolicyDriftDetails)),
})).annotate({ identifier: "SecurityPosture" }) as any as Schema.Schema<SecurityPosture>;

export interface CloudLoggingEntry {
  /** A unique identifier for the log entry. */
  insertId?: string;
  /** The type of the log (part of `log_name`. `log_name` is the resource name of the log to which this log entry belongs). For example: `cloudresourcemanager.googleapis.com/activity`. Note that this field is not URL-encoded, unlike the `LOG_ID` field in `LogEntry`. */
  logId?: string;
  /** The organization, folder, or project of the monitored resource that produced this log entry. */
  resourceContainer?: string;
  /** The time the event described by the log entry occurred. */
  timestamp?: string;
}

export const CloudLoggingEntry: Schema.Schema<CloudLoggingEntry> = Schema.suspend(() => Schema.Struct({
  insertId: Schema.optional(Schema.String),
  logId: Schema.optional(Schema.String),
  resourceContainer: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudLoggingEntry" }) as any as Schema.Schema<CloudLoggingEntry>;

export interface LogEntry {
  /** An individual entry in a log stored in Cloud Logging. */
  cloudLoggingEntry?: CloudLoggingEntry;
}

export const LogEntry: Schema.Schema<LogEntry> = Schema.suspend(() => Schema.Struct({
  cloudLoggingEntry: Schema.optional(CloudLoggingEntry),
})).annotate({ identifier: "LogEntry" }) as any as Schema.Schema<LogEntry>;

export interface LoadBalancer {
  /** The name of the load balancer associated with the finding. */
  name?: string;
}

export const LoadBalancer: Schema.Schema<LoadBalancer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LoadBalancer" }) as any as Schema.Schema<LoadBalancer>;

export interface SecurityPolicy {
  /** The name of the Google Cloud Armor security policy, for example, "my-security-policy". */
  name?: string;
  /** The type of Google Cloud Armor security policy for example, 'backend security policy', 'edge security policy', 'network edge security policy', or 'always-on DDoS protection'. */
  type?: string;
  /** Whether or not the associated rule or policy is in preview mode. */
  preview?: boolean;
}

export const SecurityPolicy: Schema.Schema<SecurityPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  preview: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SecurityPolicy" }) as any as Schema.Schema<SecurityPolicy>;

export interface Requests {
  /** For 'Increasing deny ratio', the ratio is the denied traffic divided by the allowed traffic. For 'Allowed traffic spike', the ratio is the allowed traffic in the short term divided by allowed traffic in the long term. */
  ratio?: number;
  /** Allowed RPS (requests per second) in the short term. */
  shortTermAllowed?: number;
  /** Allowed RPS (requests per second) over the long term. */
  longTermAllowed?: number;
  /** Denied RPS (requests per second) over the long term. */
  longTermDenied?: number;
}

export const Requests: Schema.Schema<Requests> = Schema.suspend(() => Schema.Struct({
  ratio: Schema.optional(Schema.Number),
  shortTermAllowed: Schema.optional(Schema.Number),
  longTermAllowed: Schema.optional(Schema.Number),
  longTermDenied: Schema.optional(Schema.Number),
})).annotate({ identifier: "Requests" }) as any as Schema.Schema<Requests>;

export interface AdaptiveProtection {
  /** A score of 0 means that there is low confidence that the detected event is an actual attack. A score of 1 means that there is high confidence that the detected event is an attack. See the [Adaptive Protection documentation](https://cloud.google.com/armor/docs/adaptive-protection-overview#configure-alert-tuning) for further explanation. */
  confidence?: number;
}

export const AdaptiveProtection: Schema.Schema<AdaptiveProtection> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "AdaptiveProtection" }) as any as Schema.Schema<AdaptiveProtection>;

export interface Attack {
  /** Total PPS (packets per second) volume of attack. */
  volumePpsLong?: string;
  /** Total BPS (bytes per second) volume of attack. */
  volumeBpsLong?: string;
  /** Type of attack, for example, 'SYN-flood', 'NTP-udp', or 'CHARGEN-udp'. */
  classification?: string;
  /** Total PPS (packets per second) volume of attack. Deprecated - refer to volume_pps_long instead. */
  volumePps?: number;
  /** Total BPS (bytes per second) volume of attack. Deprecated - refer to volume_bps_long instead. */
  volumeBps?: number;
}

export const Attack: Schema.Schema<Attack> = Schema.suspend(() => Schema.Struct({
  volumePpsLong: Schema.optional(Schema.String),
  volumeBpsLong: Schema.optional(Schema.String),
  classification: Schema.optional(Schema.String),
  volumePps: Schema.optional(Schema.Number),
  volumeBps: Schema.optional(Schema.Number),
})).annotate({ identifier: "Attack" }) as any as Schema.Schema<Attack>;

export interface CloudArmor {
  /** Information about the [Google Cloud Armor security policy](https://cloud.google.com/armor/docs/security-policy-overview) relevant to the finding. */
  securityPolicy?: SecurityPolicy;
  /** Information about incoming requests evaluated by [Google Cloud Armor security policies](https://cloud.google.com/armor/docs/security-policy-overview). */
  requests?: Requests;
  /** Information about potential Layer 7 DDoS attacks identified by [Google Cloud Armor Adaptive Protection](https://cloud.google.com/armor/docs/adaptive-protection-overview). */
  adaptiveProtection?: AdaptiveProtection;
  /** Information about DDoS attack volume and classification. */
  attack?: Attack;
  /** Distinguish between volumetric & protocol DDoS attack and application layer attacks. For example, "L3_4" for Layer 3 and Layer 4 DDoS attacks, or "L_7" for Layer 7 DDoS attacks. */
  threatVector?: string;
  /** Duration of attack from the start until the current moment (updated every 5 minutes). */
  duration?: string;
}

export const CloudArmor: Schema.Schema<CloudArmor> = Schema.suspend(() => Schema.Struct({
  securityPolicy: Schema.optional(SecurityPolicy),
  requests: Schema.optional(Requests),
  adaptiveProtection: Schema.optional(AdaptiveProtection),
  attack: Schema.optional(Attack),
  threatVector: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudArmor" }) as any as Schema.Schema<CloudArmor>;

export interface Notebook {
  /** The name of the notebook. */
  name?: string;
  /** The source notebook service, for example, "Colab Enterprise". */
  service?: string;
  /** The user ID of the latest author to modify the notebook. */
  lastAuthor?: string;
  /** The most recent time the notebook was updated. */
  notebookUpdateTime?: string;
}

export const Notebook: Schema.Schema<Notebook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  lastAuthor: Schema.optional(Schema.String),
  notebookUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Notebook" }) as any as Schema.Schema<Notebook>;

export interface ToxicCombination {
  /** The [Attack exposure score](https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_exposure_scores) of this toxic combination. The score is a measure of how much this toxic combination exposes one or more high-value resources to potential attack. */
  attackExposureScore?: number;
  /** List of resource names of findings associated with this toxic combination. For example, `organizations/123/sources/456/findings/789`. */
  relatedFindings?: Array<string>;
}

export const ToxicCombination: Schema.Schema<ToxicCombination> = Schema.suspend(() => Schema.Struct({
  attackExposureScore: Schema.optional(Schema.Number),
  relatedFindings: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ToxicCombination" }) as any as Schema.Schema<ToxicCombination>;

export interface GroupMembership {
  /** Type of group. */
  groupType?: "GROUP_TYPE_UNSPECIFIED" | "GROUP_TYPE_TOXIC_COMBINATION" | "GROUP_TYPE_CHOKEPOINT" | (string & {});
  /** ID of the group. */
  groupId?: string;
}

export const GroupMembership: Schema.Schema<GroupMembership> = Schema.suspend(() => Schema.Struct({
  groupType: Schema.optional(Schema.String),
  groupId: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupMembership" }) as any as Schema.Schema<GroupMembership>;

export interface Disk {
  /** The name of the disk, for example, "https://www.googleapis.com/compute/v1/projects/{project-id}/zones/{zone-id}/disks/{disk-id}". */
  name?: string;
}

export const Disk: Schema.Schema<Disk> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Disk" }) as any as Schema.Schema<Disk>;

export interface DataAccessEvent {
  /** Unique identifier for data access event. */
  eventId?: string;
  /** The email address of the principal that accessed the data. The principal could be a user account, service account, Google group, or other. */
  principalEmail?: string;
  /** The operation performed by the principal to access the data. */
  operation?: "OPERATION_UNSPECIFIED" | "READ" | "MOVE" | "COPY" | (string & {});
  /** Timestamp of data access event. */
  eventTime?: string;
}

export const DataAccessEvent: Schema.Schema<DataAccessEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  principalEmail: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DataAccessEvent" }) as any as Schema.Schema<DataAccessEvent>;

export interface DataFlowEvent {
  /** Unique identifier for data flow event. */
  eventId?: string;
  /** The email address of the principal that initiated the data flow event. The principal could be a user account, service account, Google group, or other. */
  principalEmail?: string;
  /** The operation performed by the principal for the data flow event. */
  operation?: "OPERATION_UNSPECIFIED" | "READ" | "MOVE" | "COPY" | (string & {});
  /** Non-compliant location of the principal or the data destination. */
  violatedLocation?: string;
  /** Timestamp of data flow event. */
  eventTime?: string;
}

export const DataFlowEvent: Schema.Schema<DataFlowEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  principalEmail: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  violatedLocation: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DataFlowEvent" }) as any as Schema.Schema<DataFlowEvent>;

export interface Network {
  /** The name of the VPC network resource, for example, `//compute.googleapis.com/projects/my-project/global/networks/my-network`. */
  name?: string;
}

export const Network: Schema.Schema<Network> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Network" }) as any as Schema.Schema<Network>;

export interface DataRetentionDeletionEvent {
  /** Timestamp indicating when the event was detected. */
  eventDetectionTime?: string;
  /** Number of objects that violated the policy for this resource. If the number is less than 1,000, then the value of this field is the exact number. If the number of objects that violated the policy is greater than or equal to 1,000, then the value of this field is 1000. */
  dataObjectCount?: string;
  /** Maximum duration of retention allowed from the DRD control. This comes from the DRD control where users set a max TTL for their data. For example, suppose that a user sets the max TTL for a Cloud Storage bucket to 90 days. However, an object in that bucket is 100 days old. In this case, a DataRetentionDeletionEvent will be generated for that Cloud Storage bucket, and the max_retention_allowed is 90 days. */
  maxRetentionAllowed?: string;
  /** Min duration of retention allowed from the DSPM retention control. This field is only populated when event type is set to EVENT_TYPE_MIN_TTL_FROM_CREATION. */
  minRetentionAllowed?: string;
  /** Type of the DRD event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "EVENT_TYPE_MAX_TTL_EXCEEDED" | "EVENT_TYPE_MAX_TTL_FROM_CREATION" | "EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION" | "EVENT_TYPE_MIN_TTL_FROM_CREATION" | (string & {});
}

export const DataRetentionDeletionEvent: Schema.Schema<DataRetentionDeletionEvent> = Schema.suspend(() => Schema.Struct({
  eventDetectionTime: Schema.optional(Schema.String),
  dataObjectCount: Schema.optional(Schema.String),
  maxRetentionAllowed: Schema.optional(Schema.String),
  minRetentionAllowed: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "DataRetentionDeletionEvent" }) as any as Schema.Schema<DataRetentionDeletionEvent>;

export interface AffectedResources {
  /** The count of resources affected by the finding. */
  count?: string;
}

export const AffectedResources: Schema.Schema<AffectedResources> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "AffectedResources" }) as any as Schema.Schema<AffectedResources>;

export interface AiModel {
  /** The name of the AI model, for example, "gemini:1.0.0". */
  name?: string;
  /** The domain of the model, for example, “image-classification”. */
  domain?: string;
  /** The name of the model library, for example, “transformers”. */
  library?: string;
  /** The region in which the model is used, for example, “us-central1”. */
  location?: string;
  /** The publisher of the model, for example, “google” or “nvidia”. */
  publisher?: string;
  /** The platform on which the model is deployed. */
  deploymentPlatform?: "DEPLOYMENT_PLATFORM_UNSPECIFIED" | "VERTEX_AI" | "GKE" | "GCE" | "FINE_TUNED_MODEL" | (string & {});
  /** The user defined display name of model. Ex. baseline-classification-model */
  displayName?: string;
  /** The purpose of the model, for example, "Inteference" or "Training". */
  usageCategory?: string;
}

export const AiModel: Schema.Schema<AiModel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  library: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
  deploymentPlatform: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  usageCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "AiModel" }) as any as Schema.Schema<AiModel>;

export interface Chokepoint {
  /** List of resource names of findings associated with this chokepoint. For example, organizations/123/sources/456/findings/789. This list will have at most 100 findings. */
  relatedFindings?: Array<string>;
}

export const Chokepoint: Schema.Schema<Chokepoint> = Schema.suspend(() => Schema.Struct({
  relatedFindings: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Chokepoint" }) as any as Schema.Schema<Chokepoint>;

export interface Control {
  /** Name of the Control */
  controlName?: string;
  /** Display name of the control. For example, AU-02. */
  displayName?: string;
}

export const Control: Schema.Schema<Control> = Schema.suspend(() => Schema.Struct({
  controlName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Control" }) as any as Schema.Schema<Control>;

export interface Framework {
  /** Name of the framework associated with the finding */
  name?: string;
  /** Display name of the framework. For a standard framework, this will look like e.g. PCI DSS 3.2.1, whereas for a custom framework it can be a user defined string like MyFramework */
  displayName?: string;
  /** Category of the framework associated with the finding. E.g. Security Benchmark, or Assured Workloads */
  category?: Array<"FRAMEWORK_CATEGORY_UNSPECIFIED" | "SECURITY_BENCHMARKS" | "ASSURED_WORKLOADS" | "DATA_SECURITY" | "GOOGLE_BEST_PRACTICES" | "CUSTOM_FRAMEWORK" | (string & {})>;
  /** Type of the framework associated with the finding, to specify whether the framework is built-in (pre-defined and immutable) or a custom framework defined by the customer (equivalent to security posture) */
  type?: "FRAMEWORK_TYPE_UNSPECIFIED" | "FRAMEWORK_TYPE_BUILT_IN" | "FRAMEWORK_TYPE_CUSTOM" | (string & {});
  /** The controls associated with the framework. */
  controls?: Array<Control>;
}

export const Framework: Schema.Schema<Framework> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  category: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  controls: Schema.optional(Schema.Array(Control)),
})).annotate({ identifier: "Framework" }) as any as Schema.Schema<Framework>;

export interface CloudControl {
  /** Name of the CloudControl associated with the finding. */
  cloudControlName?: string;
  /** Type of cloud control. */
  type?: "CLOUD_CONTROL_TYPE_UNSPECIFIED" | "BUILT_IN" | "CUSTOM" | (string & {});
  /** Policy type of the CloudControl */
  policyType?: string;
  /** Version of the Cloud Control */
  version?: number;
}

export const CloudControl: Schema.Schema<CloudControl> = Schema.suspend(() => Schema.Struct({
  cloudControlName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  policyType: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudControl" }) as any as Schema.Schema<CloudControl>;

export interface ComplianceDetails {
  /** Details of Frameworks associated with the finding */
  frameworks?: Array<Framework>;
  /** CloudControl associated with the finding */
  cloudControl?: CloudControl;
  /** Cloud Control Deployments associated with the finding. For example, organizations/123/locations/global/cloudControlDeployments/deploymentIdentifier */
  cloudControlDeploymentNames?: Array<string>;
}

export const ComplianceDetails: Schema.Schema<ComplianceDetails> = Schema.suspend(() => Schema.Struct({
  frameworks: Schema.optional(Schema.Array(Framework)),
  cloudControl: Schema.optional(CloudControl),
  cloudControlDeploymentNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ComplianceDetails" }) as any as Schema.Schema<ComplianceDetails>;

export interface Dataset {
  /** Resource name of the dataset, e.g. projects/{project}/locations/{location}/datasets/2094040236064505856 */
  name?: string;
  /** The user defined display name of dataset, e.g. plants-dataset */
  displayName?: string;
  /** Data source, such as BigQuery source URI, e.g. bq://scc-nexus-test.AIPPtest.gsod */
  source?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface Pipeline {
  /** Resource name of the pipeline, e.g. projects/{project}/locations/{location}/trainingPipelines/5253428229225578496 */
  name?: string;
  /** The user defined display name of pipeline, e.g. plants-classification */
  displayName?: string;
}

export const Pipeline: Schema.Schema<Pipeline> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Pipeline" }) as any as Schema.Schema<Pipeline>;

export interface VertexAi {
  /** Datasets associated with the finding. */
  datasets?: Array<Dataset>;
  /** Pipelines associated with the finding. */
  pipelines?: Array<Pipeline>;
}

export const VertexAi: Schema.Schema<VertexAi> = Schema.suspend(() => Schema.Struct({
  datasets: Schema.optional(Schema.Array(Dataset)),
  pipelines: Schema.optional(Schema.Array(Pipeline)),
})).annotate({ identifier: "VertexAi" }) as any as Schema.Schema<VertexAi>;

export interface ArtifactGuardPolicy {
  /** The type of the policy evaluation. */
  type?: "ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED" | "VULNERABILITY" | (string & {});
  /** The ID of the failing policy, for example, "organizations/3392779/locations/global/policies/prod-policy". */
  policyId?: string;
  /** The reason for the policy failure, for example, "severity=HIGH AND max_vuln_count=2". */
  failureReason?: string;
}

export const ArtifactGuardPolicy: Schema.Schema<ArtifactGuardPolicy> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
})).annotate({ identifier: "ArtifactGuardPolicy" }) as any as Schema.Schema<ArtifactGuardPolicy>;

export interface ArtifactGuardPolicies {
  /** The ID of the resource that has policies configured for it. */
  resourceId?: string;
  /** A list of failing policies. */
  failingPolicies?: Array<ArtifactGuardPolicy>;
}

export const ArtifactGuardPolicies: Schema.Schema<ArtifactGuardPolicies> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(Schema.String),
  failingPolicies: Schema.optional(Schema.Array(ArtifactGuardPolicy)),
})).annotate({ identifier: "ArtifactGuardPolicies" }) as any as Schema.Schema<ArtifactGuardPolicies>;

export interface SecretStatus {
  /** Time that the secret was found. */
  lastUpdatedTime?: string;
  /** The validity of the secret. */
  validity?: "SECRET_VALIDITY_UNSPECIFIED" | "SECRET_VALIDITY_UNSUPPORTED" | "SECRET_VALIDITY_FAILED" | "SECRET_VALIDITY_INVALID" | "SECRET_VALIDITY_VALID" | (string & {});
}

export const SecretStatus: Schema.Schema<SecretStatus> = Schema.suspend(() => Schema.Struct({
  lastUpdatedTime: Schema.optional(Schema.String),
  validity: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretStatus" }) as any as Schema.Schema<SecretStatus>;

export interface SecretEnvironmentVariable {
  /** Environment variable name as a JSON encoded string. Note that value is not included since the value contains the secret data, which is sensitive core content. */
  key?: string;
}

export const SecretEnvironmentVariable: Schema.Schema<SecretEnvironmentVariable> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretEnvironmentVariable" }) as any as Schema.Schema<SecretEnvironmentVariable>;

export interface SecretFilePath {
  /** Path to the file. */
  path?: string;
}

export const SecretFilePath: Schema.Schema<SecretFilePath> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretFilePath" }) as any as Schema.Schema<SecretFilePath>;

export interface Secret {
  /** The type of secret, for example, GCP_API_KEY. */
  type?: string;
  /** The status of the secret. */
  status?: SecretStatus;
  /** The environment variable containing the secret. */
  environmentVariable?: SecretEnvironmentVariable;
  /** The file containing the secret. */
  filePath?: SecretFilePath;
}

export const Secret: Schema.Schema<Secret> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  status: Schema.optional(SecretStatus),
  environmentVariable: Schema.optional(SecretEnvironmentVariable),
  filePath: Schema.optional(SecretFilePath),
})).annotate({ identifier: "Secret" }) as any as Schema.Schema<Secret>;

export interface ExternalExposure {
  /** Private IP address of the exposed endpoint. */
  privateIpAddress?: string;
  /** Port number associated with private IP address. */
  privatePort?: string;
  /** The name and version of the service, for example, "Jupyter Notebook 6.14.0". */
  exposedService?: string;
  /** Public IP address of the exposed endpoint. */
  publicIpAddress?: string;
  /** Public port number of the exposed endpoint. */
  publicPort?: string;
  /** The resource which is running the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/zones/{zone}/instances/{instance}.” */
  exposedEndpoint?: string;
  /** The full resource name of the load balancer firewall policy, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}". */
  loadBalancerFirewallPolicy?: string;
  /** The full resource name of the firewall policy of the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}". */
  serviceFirewallPolicy?: string;
  /** The full resource name of the forwarding rule, for example, "//compute.googleapis.com/projects/{project-id}/global/forwardingRules/{forwarding-rule-name}". */
  forwardingRule?: string;
  /** The full resource name of load balancer backend service, for example, "//compute.googleapis.com/projects/{project-id}/global/backendServices/{name}". */
  backendService?: string;
  /** The full resource name of the instance group, for example, "//compute.googleapis.com/projects/{project-id}/global/instanceGroups/{name}". */
  instanceGroup?: string;
  /** The full resource name of the network endpoint group, for example, "//compute.googleapis.com/projects/{project-id}/global/networkEndpointGroups/{name}". */
  networkEndpointGroup?: string;
}

export const ExternalExposure: Schema.Schema<ExternalExposure> = Schema.suspend(() => Schema.Struct({
  privateIpAddress: Schema.optional(Schema.String),
  privatePort: Schema.optional(Schema.String),
  exposedService: Schema.optional(Schema.String),
  publicIpAddress: Schema.optional(Schema.String),
  publicPort: Schema.optional(Schema.String),
  exposedEndpoint: Schema.optional(Schema.String),
  loadBalancerFirewallPolicy: Schema.optional(Schema.String),
  serviceFirewallPolicy: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
  backendService: Schema.optional(Schema.String),
  instanceGroup: Schema.optional(Schema.String),
  networkEndpointGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalExposure" }) as any as Schema.Schema<ExternalExposure>;

export interface Finding {
  /** The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}". */
  name?: string;
  /** The relative resource name of the source the finding belongs to. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name This field is immutable after creation time. For example: "organizations/{organization_id}/sources/{source_id}" */
  parent?: string;
  /** For findings on Google Cloud resources, the full resource name of the Google Cloud resource this finding is for. See: https://cloud.google.com/apis/design/resource_names#full_resource_name When the finding is for a non-Google Cloud resource, the resourceName can be a customer or partner defined string. This field is immutable after creation time. */
  resourceName?: string;
  /** The state of the finding. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** The additional taxonomy group within findings from a given source. This field is immutable after creation time. Example: "XSS_FLASH_INJECTION" */
  category?: string;
  /** The URI that, if available, points to a web page outside of Security Command Center where additional information about the finding can be found. This field is guaranteed to be either empty or a well formed URL. */
  externalUri?: string;
  /** Source specific properties. These properties are managed by the source that writes the finding. The key names in the source_properties map must be between 1 and 255 characters, and must start with a letter and contain alphanumeric characters or underscores only. */
  sourceProperties?: Record<string, unknown>;
  /** Output only. User specified security marks. These marks are entirely managed by the user and come from the SecurityMarks resource that belongs to the finding. */
  securityMarks?: SecurityMarks;
  /** The time the finding was first detected. If an existing finding is updated, then this is the time the update occurred. For example, if the finding represents an open firewall, this property captures the time the detector believes the firewall became open. The accuracy is determined by the detector. If the finding is later resolved, then this time reflects when the finding was resolved. This must not be set to a value greater than the current timestamp. */
  eventTime?: string;
  /** The time at which the finding was created in Security Command Center. */
  createTime?: string;
  /** The severity of the finding. This field is managed by the source that writes the finding. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** The canonical name of the finding. It's either "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or "projects/{project_number}/sources/{source_id}/findings/{finding_id}", depending on the closest CRM ancestor of the resource associated with the finding. */
  canonicalName?: string;
  /** Indicates the mute state of a finding (either muted, unmuted or undefined). Unlike other attributes of a finding, a finding provider shouldn't set the value of mute. */
  mute?: "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED" | (string & {});
  /** The class of the finding. */
  findingClass?: "FINDING_CLASS_UNSPECIFIED" | "THREAT" | "VULNERABILITY" | "MISCONFIGURATION" | "OBSERVATION" | "SCC_ERROR" | "POSTURE_VIOLATION" | "TOXIC_COMBINATION" | "SENSITIVE_DATA_RISK" | "CHOKEPOINT" | "EXTERNAL_EXPOSURE" | (string & {});
  /** Represents what's commonly known as an *indicator of compromise* (IoC) in computer forensics. This is an artifact observed on a network or in an operating system that, with high confidence, indicates a computer intrusion. For more information, see [Indicator of compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise). */
  indicator?: Indicator;
  /** Represents vulnerability-specific fields like CVE and CVSS scores. CVE stands for Common Vulnerabilities and Exposures (https://cve.mitre.org/about/) */
  vulnerability?: Vulnerability;
  /** Output only. The most recent time this finding was muted or unmuted. */
  muteUpdateTime?: string;
  /** Output only. Third party SIEM/SOAR fields within SCC, contains external system information and external system finding fields. */
  externalSystems?: Record<string, GoogleCloudSecuritycenterV1ExternalSystem>;
  /** MITRE ATT&CK tactics and techniques related to this finding. See: https://attack.mitre.org */
  mitreAttack?: MitreAttack;
  /** Access details associated with the finding, such as more information on the caller, which method was accessed, and from where. */
  access?: Access;
  /** Contains information about the IP connection associated with the finding. */
  connections?: Array<Connection>;
  /** Records additional information about the mute operation, for example, the [mute configuration](/security-command-center/docs/how-to-mute-findings) that muted the finding and the user who muted the finding. */
  muteInitiator?: string;
  /** Output only. The mute information regarding this finding. */
  muteInfo?: MuteInfo;
  /** Represents operating system processes associated with the Finding. */
  processes?: Array<Process>;
  /** Output only. Map containing the points of contact for the given finding. The key represents the type of contact, while the value contains a list of all the contacts that pertain. Please refer to: https://cloud.google.com/resource-manager/docs/managing-notification-contacts#notification-categories { "security": { "contacts": [ { "email": "person1@company.com" }, { "email": "person2@company.com" } ] } } */
  contacts?: Record<string, ContactDetails>;
  /** Contains compliance information for security standards associated to the finding. */
  compliances?: Array<Compliance>;
  /** Output only. The human readable display name of the finding source such as "Event Threat Detection" or "Security Health Analytics". */
  parentDisplayName?: string;
  /** Contains more details about the finding. */
  description?: string;
  /** Represents exfiltrations associated with the finding. */
  exfiltration?: Exfiltration;
  /** Represents IAM bindings associated with the finding. */
  iamBindings?: Array<IamBinding>;
  /** Steps to address the finding. */
  nextSteps?: string;
  /** Unique identifier of the module which generated the finding. Example: folders/598186756061/securityHealthAnalyticsSettings/customModules/56799441161885 */
  moduleName?: string;
  /** Containers associated with the finding. This field provides information for both Kubernetes and non-Kubernetes containers. */
  containers?: Array<Container>;
  /** Kubernetes resources associated with the finding. */
  kubernetes?: Kubernetes;
  /** Database associated with the finding. */
  database?: Database;
  /** The results of an attack path simulation relevant to this finding. */
  attackExposure?: AttackExposure;
  /** File associated with the finding. */
  files?: Array<File>;
  /** Cloud Data Loss Prevention (Cloud DLP) inspection results that are associated with the finding. */
  cloudDlpInspection?: CloudDlpInspection;
  /** Cloud DLP data profile that is associated with the finding. */
  cloudDlpDataProfile?: CloudDlpDataProfile;
  /** Signature of the kernel rootkit. */
  kernelRootkit?: KernelRootkit;
  /** Contains information about the org policies associated with the finding. */
  orgPolicies?: Array<OrgPolicy>;
  /** Job associated with the finding. */
  job?: Job;
  /** Represents an application associated with the finding. */
  application?: Application;
  /** IP rules associated with the finding. */
  ipRules?: IpRules;
  /** Fields related to Backup and DR findings. */
  backupDisasterRecovery?: BackupDisasterRecovery;
  /** The security posture associated with the finding. */
  securityPosture?: SecurityPosture;
  /** Log entries that are relevant to the finding. */
  logEntries?: Array<LogEntry>;
  /** The load balancers associated with the finding. */
  loadBalancers?: Array<LoadBalancer>;
  /** Fields related to Cloud Armor findings. */
  cloudArmor?: CloudArmor;
  /** Notebook associated with the finding. */
  notebook?: Notebook;
  /** Contains details about a group of security issues that, when the issues occur together, represent a greater risk than when the issues occur independently. A group of such issues is referred to as a toxic combination. This field cannot be updated. Its value is ignored in all update requests. */
  toxicCombination?: ToxicCombination;
  /** Contains details about groups of which this finding is a member. A group is a collection of findings that are related in some way. This field cannot be updated. Its value is ignored in all update requests. */
  groupMemberships?: Array<GroupMembership>;
  /** Disk associated with the finding. */
  disk?: Disk;
  /** Data access events associated with the finding. */
  dataAccessEvents?: Array<DataAccessEvent>;
  /** Data flow events associated with the finding. */
  dataFlowEvents?: Array<DataFlowEvent>;
  /** Represents the VPC networks that the resource is attached to. */
  networks?: Array<Network>;
  /** Data retention deletion events associated with the finding. */
  dataRetentionDeletionEvents?: Array<DataRetentionDeletionEvent>;
  /** AffectedResources associated with the finding. */
  affectedResources?: AffectedResources;
  /** The AI model associated with the finding. */
  aiModel?: AiModel;
  /** Contains details about a chokepoint, which is a resource or resource group where high-risk attack paths converge, based on [attack path simulations] (https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_path_simulations). This field cannot be updated. Its value is ignored in all update requests. */
  chokepoint?: Chokepoint;
  /** Details about the compliance implications of the finding. */
  complianceDetails?: ComplianceDetails;
  /** VertexAi associated with the finding. */
  vertexAi?: VertexAi;
  /** ArtifactGuardPolicies associated with the finding. */
  artifactGuardPolicies?: ArtifactGuardPolicies;
  /** Secret associated with the finding. */
  secret?: Secret;
  /** External exposure associated with the finding. */
  externalExposure?: ExternalExposure;
}

export const Finding: Schema.Schema<Finding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  externalUri: Schema.optional(Schema.String),
  sourceProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  securityMarks: Schema.optional(SecurityMarks),
  eventTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  canonicalName: Schema.optional(Schema.String),
  mute: Schema.optional(Schema.String),
  findingClass: Schema.optional(Schema.String),
  indicator: Schema.optional(Indicator),
  vulnerability: Schema.optional(Vulnerability),
  muteUpdateTime: Schema.optional(Schema.String),
  externalSystems: Schema.optional(Schema.Record(Schema.String, GoogleCloudSecuritycenterV1ExternalSystem)),
  mitreAttack: Schema.optional(MitreAttack),
  access: Schema.optional(Access),
  connections: Schema.optional(Schema.Array(Connection)),
  muteInitiator: Schema.optional(Schema.String),
  muteInfo: Schema.optional(MuteInfo),
  processes: Schema.optional(Schema.Array(Process)),
  contacts: Schema.optional(Schema.Record(Schema.String, ContactDetails)),
  compliances: Schema.optional(Schema.Array(Compliance)),
  parentDisplayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  exfiltration: Schema.optional(Exfiltration),
  iamBindings: Schema.optional(Schema.Array(IamBinding)),
  nextSteps: Schema.optional(Schema.String),
  moduleName: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(Container)),
  kubernetes: Schema.optional(Kubernetes),
  database: Schema.optional(Database),
  attackExposure: Schema.optional(AttackExposure),
  files: Schema.optional(Schema.Array(File)),
  cloudDlpInspection: Schema.optional(CloudDlpInspection),
  cloudDlpDataProfile: Schema.optional(CloudDlpDataProfile),
  kernelRootkit: Schema.optional(KernelRootkit),
  orgPolicies: Schema.optional(Schema.Array(OrgPolicy)),
  job: Schema.optional(Job),
  application: Schema.optional(Application),
  ipRules: Schema.optional(IpRules),
  backupDisasterRecovery: Schema.optional(BackupDisasterRecovery),
  securityPosture: Schema.optional(SecurityPosture),
  logEntries: Schema.optional(Schema.Array(LogEntry)),
  loadBalancers: Schema.optional(Schema.Array(LoadBalancer)),
  cloudArmor: Schema.optional(CloudArmor),
  notebook: Schema.optional(Notebook),
  toxicCombination: Schema.optional(ToxicCombination),
  groupMemberships: Schema.optional(Schema.Array(GroupMembership)),
  disk: Schema.optional(Disk),
  dataAccessEvents: Schema.optional(Schema.Array(DataAccessEvent)),
  dataFlowEvents: Schema.optional(Schema.Array(DataFlowEvent)),
  networks: Schema.optional(Schema.Array(Network)),
  dataRetentionDeletionEvents: Schema.optional(Schema.Array(DataRetentionDeletionEvent)),
  affectedResources: Schema.optional(AffectedResources),
  aiModel: Schema.optional(AiModel),
  chokepoint: Schema.optional(Chokepoint),
  complianceDetails: Schema.optional(ComplianceDetails),
  vertexAi: Schema.optional(VertexAi),
  artifactGuardPolicies: Schema.optional(ArtifactGuardPolicies),
  secret: Schema.optional(Secret),
  externalExposure: Schema.optional(ExternalExposure),
})).annotate({ identifier: "Finding" }) as any as Schema.Schema<Finding>;

export interface GoogleCloudSecuritycenterV1MuteConfig {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name?: string;
  /** The human readable name to be displayed for the mute config. */
  displayName?: string;
  /** A description of the mute config. */
  description?: string;
  /** Required. An expression that defines the filter to apply across create/update events of findings. While creating a filter string, be mindful of the scope in which the mute configuration is being created. E.g., If a filter contains project = X but is created under the project = Y scope, it might not match any findings. The following field and operator combinations are supported: * severity: `=`, `:` * category: `=`, `:` * resource.name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.type: `=`, `:` * finding_class: `=`, `:` * indicator.ip_addresses: `=`, `:` * indicator.domains: `=`, `:` */
  filter?: string;
  /** Output only. The time at which the mute config was created. This field is set by the server and will be ignored if provided on config creation. */
  createTime?: string;
  /** Output only. The most recent time at which the mute config was updated. This field is set by the server and will be ignored if provided on config creation or update. */
  updateTime?: string;
  /** Output only. Email address of the user who last edited the mute config. This field is set by the server and will be ignored if provided on config creation or update. */
  mostRecentEditor?: string;
  /** Optional. The type of the mute config, which determines what type of mute state the config affects. The static mute state takes precedence over the dynamic mute state. Immutable after creation. STATIC by default if not set during creation. */
  type?: "MUTE_CONFIG_TYPE_UNSPECIFIED" | "STATIC" | "DYNAMIC" | (string & {});
  /** Optional. The expiry of the mute config. Only applicable for dynamic configs. If the expiry is set, when the config expires, it is removed from all findings. */
  expiryTime?: string;
}

export const GoogleCloudSecuritycenterV1MuteConfig: Schema.Schema<GoogleCloudSecuritycenterV1MuteConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  mostRecentEditor: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  expiryTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1MuteConfig" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1MuteConfig>;

export interface StreamingConfig {
  /** Expression that defines the filter to apply across create/update events of assets or findings as specified by the event type. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the corresponding resource. The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. */
  filter?: string;
}

export const StreamingConfig: Schema.Schema<StreamingConfig> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingConfig" }) as any as Schema.Schema<StreamingConfig>;

export interface NotificationConfig {
  /** The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket". */
  name?: string;
  /** The description of the notification config (max of 1024 characters). */
  description?: string;
  /** The Pub/Sub topic to send notifications to. Its format is "projects/[project_id]/topics/[topic]". */
  pubsubTopic?: string;
  /** Output only. The service account that needs "pubsub.topics.publish" permission to publish to the Pub/Sub topic. */
  serviceAccount?: string;
  /** The config for triggering streaming-based notifications. */
  streamingConfig?: StreamingConfig;
}

export const NotificationConfig: Schema.Schema<NotificationConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  pubsubTopic: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  streamingConfig: Schema.optional(StreamingConfig),
})).annotate({ identifier: "NotificationConfig" }) as any as Schema.Schema<NotificationConfig>;

export interface ResourceValueConfigMetadata {
  /** Resource value config name */
  name?: string;
}

export const ResourceValueConfigMetadata: Schema.Schema<ResourceValueConfigMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceValueConfigMetadata" }) as any as Schema.Schema<ResourceValueConfigMetadata>;

export interface Simulation {
  /** Full resource name of the Simulation: `organizations/123/simulations/456` */
  name?: string;
  /** Output only. Time simulation was created */
  createTime?: string;
  /** Resource value configurations' metadata used in this simulation. Maximum of 100. */
  resourceValueConfigsMetadata?: Array<ResourceValueConfigMetadata>;
  /** Indicates which cloud provider was used in this simulation. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
}

export const Simulation: Schema.Schema<Simulation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  resourceValueConfigsMetadata: Schema.optional(Schema.Array(ResourceValueConfigMetadata)),
  cloudProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "Simulation" }) as any as Schema.Schema<Simulation>;

export interface ValuedResource {
  /** Valued resource name, for example, e.g.: `organizations/123/simulations/456/valuedResources/789` */
  name?: string;
  /** The [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name) of the valued resource. */
  resource?: string;
  /** The [resource type](https://cloud.google.com/asset-inventory/docs/supported-asset-types) of the valued resource. */
  resourceType?: string;
  /** Human-readable name of the valued resource. */
  displayName?: string;
  /** How valuable this resource is. */
  resourceValue?: "RESOURCE_VALUE_UNSPECIFIED" | "RESOURCE_VALUE_LOW" | "RESOURCE_VALUE_MEDIUM" | "RESOURCE_VALUE_HIGH" | (string & {});
  /** Exposed score for this valued resource. A value of 0 means no exposure was detected exposure. */
  exposedScore?: number;
  /** List of resource value configurations' metadata used to determine the value of this resource. Maximum of 100. */
  resourceValueConfigsUsed?: Array<ResourceValueConfigMetadata>;
}

export const ValuedResource: Schema.Schema<ValuedResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  resourceValue: Schema.optional(Schema.String),
  exposedScore: Schema.optional(Schema.Number),
  resourceValueConfigsUsed: Schema.optional(Schema.Array(ResourceValueConfigMetadata)),
})).annotate({ identifier: "ValuedResource" }) as any as Schema.Schema<ValuedResource>;

export interface GoogleCloudSecuritycenterV1BigQueryExport {
  /** The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests. */
  name?: string;
  /** The description of the export (max of 1024 characters). */
  description?: string;
  /** Expression that defines the filter to apply across create/update events of findings. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the corresponding resource. The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. */
  filter?: string;
  /** The dataset to write findings' updates to. Its format is "projects/[project_id]/datasets/[bigquery_dataset_id]". BigQuery Dataset unique ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). */
  dataset?: string;
  /** Output only. The time at which the BigQuery export was created. This field is set by the server and will be ignored if provided on export on creation. */
  createTime?: string;
  /** Output only. The most recent time at which the BigQuery export was updated. This field is set by the server and will be ignored if provided on export creation or update. */
  updateTime?: string;
  /** Output only. Email address of the user who last edited the BigQuery export. This field is set by the server and will be ignored if provided on export creation or update. */
  mostRecentEditor?: string;
  /** Output only. The service account that needs permission to create table and upload data to the BigQuery dataset. */
  principal?: string;
}

export const GoogleCloudSecuritycenterV1BigQueryExport: Schema.Schema<GoogleCloudSecuritycenterV1BigQueryExport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  dataset: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  mostRecentEditor: Schema.optional(Schema.String),
  principal: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1BigQueryExport" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1BigQueryExport>;

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

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
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

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface AssetDiscoveryConfig {
  /** The project ids to use for filtering asset discovery. */
  projectIds?: Array<string>;
  /** The mode to use for filtering asset discovery. */
  inclusionMode?: "INCLUSION_MODE_UNSPECIFIED" | "INCLUDE_ONLY" | "EXCLUDE" | (string & {});
  /** The folder ids to use for filtering asset discovery. It consists of only digits, e.g., 756619654966. */
  folderIds?: Array<string>;
}

export const AssetDiscoveryConfig: Schema.Schema<AssetDiscoveryConfig> = Schema.suspend(() => Schema.Struct({
  projectIds: Schema.optional(Schema.Array(Schema.String)),
  inclusionMode: Schema.optional(Schema.String),
  folderIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AssetDiscoveryConfig" }) as any as Schema.Schema<AssetDiscoveryConfig>;

export interface OrganizationSettings {
  /** The relative resource name of the settings. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/organizationSettings". */
  name?: string;
  /** A flag that indicates if Asset Discovery should be enabled. If the flag is set to `true`, then discovery of assets will occur. If it is set to `false`, all historical assets will remain, but discovery of future assets will not occur. */
  enableAssetDiscovery?: boolean;
  /** The configuration used for Asset Discovery runs. */
  assetDiscoveryConfig?: AssetDiscoveryConfig;
}

export const OrganizationSettings: Schema.Schema<OrganizationSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enableAssetDiscovery: Schema.optional(Schema.Boolean),
  assetDiscoveryConfig: Schema.optional(AssetDiscoveryConfig),
})).annotate({ identifier: "OrganizationSettings" }) as any as Schema.Schema<OrganizationSettings>;

export interface GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule {
  /** Output only. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}" */
  name?: string;
  /** Output only. The user-specified configuration for the module. */
  customConfig?: GoogleCloudSecuritycenterV1CustomConfig;
  /** Output only. The effective state of enablement for the module at the given level of the hierarchy. */
  enablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. The display name for the custom module. The name must be between 1 and 128 characters, start with a lowercase letter, and contain alphanumeric characters or underscores only. */
  displayName?: string;
  /** The cloud provider of the custom module. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
}

export const GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule: Schema.Schema<GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customConfig: Schema.optional(GoogleCloudSecuritycenterV1CustomConfig),
  enablementState: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule>;

export interface GroupAssetsRequest {
  /** Expression that defines the filter to apply across assets. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the Asset resource. Examples include: * name * security_center_properties.resource_name * resource_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `create_time = "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`, `>=`, `<=` * security_marks.marks: `=`, `:` * security_center_properties.resource_name: `=`, `:` * security_center_properties.resource_display_name: `=`, `:` * security_center_properties.resource_type: `=`, `:` * security_center_properties.resource_parent: `=`, `:` * security_center_properties.resource_parent_display_name: `=`, `:` * security_center_properties.resource_project: `=`, `:` * security_center_properties.resource_project_display_name: `=`, `:` * security_center_properties.resource_owners: `=`, `:` For example, `resource_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `resource_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-resource_properties.my_property : ""` */
  filter?: string;
  /** Required. Expression that defines what assets fields to use for grouping. The string value should follow SQL syntax: comma separated list of fields. For example: "security_center_properties.resource_project,security_center_properties.project". The following fields are supported when compare_duration is not set: * security_center_properties.resource_project * security_center_properties.resource_project_display_name * security_center_properties.resource_type * security_center_properties.resource_parent * security_center_properties.resource_parent_display_name The following fields are supported when compare_duration is set: * security_center_properties.resource_type * security_center_properties.resource_project_display_name * security_center_properties.resource_parent_display_name */
  groupBy?: string;
  /** When compare_duration is set, the GroupResult's "state_change" property is updated to indicate whether the asset was added, removed, or remained present during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state change value is derived based on the presence of the asset at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the asset is removed and re-created again. Possible "state_change" values when compare_duration is specified: * "ADDED": indicates that the asset was not present at the start of compare_duration, but present at reference_time. * "REMOVED": indicates that the asset was present at the start of compare_duration, but not present at reference_time. * "ACTIVE": indicates that the asset was present at both the start and the end of the time period defined by compare_duration and reference_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all assets present at read_time. If this field is set then `state_change` must be a specified field in `group_by`. */
  compareDuration?: string;
  /** Time used as a reference point when filtering assets. The filter is limited to assets existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** The value returned by the last `GroupAssetsResponse`; indicates that this is a continuation of a prior `GroupAssets` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const GroupAssetsRequest: Schema.Schema<GroupAssetsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  groupBy: Schema.optional(Schema.String),
  compareDuration: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GroupAssetsRequest" }) as any as Schema.Schema<GroupAssetsRequest>;

export interface GroupResult {
  /** Properties matching the groupBy fields in the request. */
  properties?: Record<string, unknown>;
  /** Total count of resources for the given properties. */
  count?: string;
}

export const GroupResult: Schema.Schema<GroupResult> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupResult" }) as any as Schema.Schema<GroupResult>;

export interface GroupAssetsResponse {
  /** Group results. There exists an element for each existing unique combination of property/values. The element contains a count for the number of times those specific property/values appear. */
  groupByResults?: Array<GroupResult>;
  /** Time used for executing the groupBy request. */
  readTime?: string;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
  /** The total number of results matching the query. */
  totalSize?: number;
}

export const GroupAssetsResponse: Schema.Schema<GroupAssetsResponse> = Schema.suspend(() => Schema.Struct({
  groupByResults: Schema.optional(Schema.Array(GroupResult)),
  readTime: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GroupAssetsResponse" }) as any as Schema.Schema<GroupAssetsResponse>;

export interface GroupFindingsRequest {
  /** Expression that defines the filter to apply across findings. The expression is a list of one or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. Examples include: * name * source_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category: `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time = 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`, `>=`, `<=` For example, `source_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `source_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-source_properties.my_property : ""` * resource: * resource.name: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` */
  filter?: string;
  /** Required. Expression that defines what assets fields to use for grouping (including `state_change`). The string value should follow SQL syntax: comma separated list of fields. For example: "parent,resource_name". The following fields are supported when compare_duration is set: * state_change */
  groupBy?: string;
  /** Time used as a reference point when filtering findings. The filter is limited to findings existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the GroupResult's "state_change" attribute is updated to indicate whether the finding had its state changed, the finding's state remained unchanged, or if the finding was added during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence and state of the finding at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the finding is made inactive and then active again. Possible "state_change" values when compare_duration is specified: * "CHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration, but changed its state at read_time. * "UNCHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration and did not change state at read_time. * "ADDED": indicates that the finding did not match the given filter or was not present at the start of compare_duration, but was present at read_time. * "REMOVED": indicates that the finding was present and matched the filter at the start of compare_duration, but did not match the filter at read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all findings present at read_time. If this field is set then `state_change` must be a specified field in `group_by`. */
  compareDuration?: string;
  /** The value returned by the last `GroupFindingsResponse`; indicates that this is a continuation of a prior `GroupFindings` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const GroupFindingsRequest: Schema.Schema<GroupFindingsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  groupBy: Schema.optional(Schema.String),
  readTime: Schema.optional(Schema.String),
  compareDuration: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GroupFindingsRequest" }) as any as Schema.Schema<GroupFindingsRequest>;

export interface GroupFindingsResponse {
  /** Group results. There exists an element for each existing unique combination of property/values. The element contains a count for the number of times those specific property/values appear. */
  groupByResults?: Array<GroupResult>;
  /** Time used for executing the groupBy request. */
  readTime?: string;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
  /** The total number of results matching the query. */
  totalSize?: number;
}

export const GroupFindingsResponse: Schema.Schema<GroupFindingsResponse> = Schema.suspend(() => Schema.Struct({
  groupByResults: Schema.optional(Schema.Array(GroupResult)),
  readTime: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GroupFindingsResponse" }) as any as Schema.Schema<GroupFindingsResponse>;

export interface Folder {
  /** Full resource name of this folder. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceFolder?: string;
  /** The user defined display name for this folder. */
  resourceFolderDisplayName?: string;
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() => Schema.Struct({
  resourceFolder: Schema.optional(Schema.String),
  resourceFolderDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface SecurityCenterProperties {
  /** The full resource name of the Google Cloud resource this asset represents. This field is immutable after create time. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceName?: string;
  /** The type of the Google Cloud resource. Examples include: APPLICATION, PROJECT, and ORGANIZATION. This is a case insensitive field defined by Security Command Center and/or the producer of the resource and is immutable after create time. */
  resourceType?: string;
  /** The full resource name of the immediate parent of the resource. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceParent?: string;
  /** The full resource name of the project the resource belongs to. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceProject?: string;
  /** Owners of the Google Cloud resource. */
  resourceOwners?: Array<string>;
  /** The user defined display name for this resource. */
  resourceDisplayName?: string;
  /** The user defined display name for the parent of this resource. */
  resourceParentDisplayName?: string;
  /** The user defined display name for the project of this resource. */
  resourceProjectDisplayName?: string;
  /** Contains a Folder message for each folder in the assets ancestry. The first folder is the deepest nested folder, and the last folder is the folder directly under the Organization. */
  folders?: Array<Folder>;
}

export const SecurityCenterProperties: Schema.Schema<SecurityCenterProperties> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resourceParent: Schema.optional(Schema.String),
  resourceProject: Schema.optional(Schema.String),
  resourceOwners: Schema.optional(Schema.Array(Schema.String)),
  resourceDisplayName: Schema.optional(Schema.String),
  resourceParentDisplayName: Schema.optional(Schema.String),
  resourceProjectDisplayName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Folder)),
})).annotate({ identifier: "SecurityCenterProperties" }) as any as Schema.Schema<SecurityCenterProperties>;

export interface IamPolicy {
  /** The JSON representation of the Policy associated with the asset. See https://cloud.google.com/iam/reference/rest/v1/Policy for format details. */
  policyBlob?: string;
}

export const IamPolicy: Schema.Schema<IamPolicy> = Schema.suspend(() => Schema.Struct({
  policyBlob: Schema.optional(Schema.String),
})).annotate({ identifier: "IamPolicy" }) as any as Schema.Schema<IamPolicy>;

export interface Asset {
  /** The relative resource name of this asset. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/assets/{asset_id}". */
  name?: string;
  /** Security Command Center managed properties. These properties are managed by Security Command Center and cannot be modified by the user. */
  securityCenterProperties?: SecurityCenterProperties;
  /** Resource managed properties. These properties are managed and defined by the Google Cloud resource and cannot be modified by the user. */
  resourceProperties?: Record<string, unknown>;
  /** User specified security marks. These marks are entirely managed by the user and come from the SecurityMarks resource that belongs to the asset. */
  securityMarks?: SecurityMarks;
  /** The time at which the asset was created in Security Command Center. */
  createTime?: string;
  /** The time at which the asset was last updated or added in Cloud SCC. */
  updateTime?: string;
  /** Cloud IAM Policy information associated with the Google Cloud resource described by the Security Command Center asset. This information is managed and defined by the Google Cloud resource and cannot be modified by the user. */
  iamPolicy?: IamPolicy;
  /** The canonical name of the resource. It's either "organizations/{organization_id}/assets/{asset_id}", "folders/{folder_id}/assets/{asset_id}" or "projects/{project_number}/assets/{asset_id}", depending on the closest CRM ancestor of the resource. */
  canonicalName?: string;
}

export const Asset: Schema.Schema<Asset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  securityCenterProperties: Schema.optional(SecurityCenterProperties),
  resourceProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  securityMarks: Schema.optional(SecurityMarks),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  iamPolicy: Schema.optional(IamPolicy),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface ListAssetsResult {
  /** Asset matching the search request. */
  asset?: Asset;
  /** State change of the asset between the points in time. */
  stateChange?: "UNUSED" | "ADDED" | "REMOVED" | "ACTIVE" | (string & {});
}

export const ListAssetsResult: Schema.Schema<ListAssetsResult> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Asset),
  stateChange: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAssetsResult" }) as any as Schema.Schema<ListAssetsResult>;

export interface ListAssetsResponse {
  /** Assets matching the list request. */
  listAssetsResults?: Array<ListAssetsResult>;
  /** Time used for executing the list request. */
  readTime?: string;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
  /** The total number of assets matching the query. */
  totalSize?: number;
}

export const ListAssetsResponse: Schema.Schema<ListAssetsResponse> = Schema.suspend(() => Schema.Struct({
  listAssetsResults: Schema.optional(Schema.Array(ListAssetsResult)),
  readTime: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListAssetsResponse" }) as any as Schema.Schema<ListAssetsResponse>;

export interface ListDescendantSecurityHealthAnalyticsCustomModulesResponse {
  /** Custom modules belonging to the requested parent and its descendants. */
  securityHealthAnalyticsCustomModules?: Array<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule>;
  /** If not empty, indicates that there may be more custom modules to be returned. */
  nextPageToken?: string;
}

export const ListDescendantSecurityHealthAnalyticsCustomModulesResponse: Schema.Schema<ListDescendantSecurityHealthAnalyticsCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  securityHealthAnalyticsCustomModules: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDescendantSecurityHealthAnalyticsCustomModulesResponse" }) as any as Schema.Schema<ListDescendantSecurityHealthAnalyticsCustomModulesResponse>;

export interface AwsOrganization {
  /** The unique identifier (ID) for the organization. The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits. */
  id?: string;
}

export const AwsOrganization: Schema.Schema<AwsOrganization> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsOrganization" }) as any as Schema.Schema<AwsOrganization>;

export interface AwsOrganizationalUnit {
  /** The unique identifier (ID) associated with this OU. The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits. For example, "ou-ab12-cd34ef56". */
  id?: string;
  /** The friendly name of the OU. */
  name?: string;
}

export const AwsOrganizationalUnit: Schema.Schema<AwsOrganizationalUnit> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsOrganizationalUnit" }) as any as Schema.Schema<AwsOrganizationalUnit>;

export interface AwsAccount {
  /** The unique identifier (ID) of the account, containing exactly 12 digits. */
  id?: string;
  /** The friendly name of this account. */
  name?: string;
}

export const AwsAccount: Schema.Schema<AwsAccount> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsAccount" }) as any as Schema.Schema<AwsAccount>;

export interface AwsMetadata {
  /** The AWS organization associated with the resource. */
  organization?: AwsOrganization;
  /** A list of AWS organizational units associated with the resource, ordered from lowest level (closest to the account) to highest level. */
  organizationalUnits?: Array<AwsOrganizationalUnit>;
  /** The AWS account associated with the resource. */
  account?: AwsAccount;
}

export const AwsMetadata: Schema.Schema<AwsMetadata> = Schema.suspend(() => Schema.Struct({
  organization: Schema.optional(AwsOrganization),
  organizationalUnits: Schema.optional(Schema.Array(AwsOrganizationalUnit)),
  account: Schema.optional(AwsAccount),
})).annotate({ identifier: "AwsMetadata" }) as any as Schema.Schema<AwsMetadata>;

export interface AzureManagementGroup {
  /** The UUID of the Azure management group, for example, `20000000-0001-0000-0000-000000000000`. */
  id?: string;
  /** The display name of the Azure management group. */
  displayName?: string;
}

export const AzureManagementGroup: Schema.Schema<AzureManagementGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureManagementGroup" }) as any as Schema.Schema<AzureManagementGroup>;

export interface AzureSubscription {
  /** The UUID of the Azure subscription, for example, `291bba3f-e0a5-47bc-a099-3bdcb2a50a05`. */
  id?: string;
  /** The display name of the Azure subscription. */
  displayName?: string;
}

export const AzureSubscription: Schema.Schema<AzureSubscription> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureSubscription" }) as any as Schema.Schema<AzureSubscription>;

export interface AzureResourceGroup {
  /** The ID of the Azure resource group. */
  id?: string;
  /** The name of the Azure resource group. This is not a UUID. */
  name?: string;
}

export const AzureResourceGroup: Schema.Schema<AzureResourceGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureResourceGroup" }) as any as Schema.Schema<AzureResourceGroup>;

export interface AzureTenant {
  /** The ID of the Microsoft Entra tenant, for example, "a11aaa11-aa11-1aa1-11aa-1aaa11a". */
  id?: string;
  /** The display name of the Azure tenant. */
  displayName?: string;
}

export const AzureTenant: Schema.Schema<AzureTenant> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureTenant" }) as any as Schema.Schema<AzureTenant>;

export interface AzureMetadata {
  /** A list of Azure management groups associated with the resource, ordered from lowest level (closest to the subscription) to highest level. */
  managementGroups?: Array<AzureManagementGroup>;
  /** The Azure subscription associated with the resource. */
  subscription?: AzureSubscription;
  /** The Azure resource group associated with the resource. */
  resourceGroup?: AzureResourceGroup;
  /** The Azure Entra tenant associated with the resource. */
  tenant?: AzureTenant;
}

export const AzureMetadata: Schema.Schema<AzureMetadata> = Schema.suspend(() => Schema.Struct({
  managementGroups: Schema.optional(Schema.Array(AzureManagementGroup)),
  subscription: Schema.optional(AzureSubscription),
  resourceGroup: Schema.optional(AzureResourceGroup),
  tenant: Schema.optional(AzureTenant),
})).annotate({ identifier: "AzureMetadata" }) as any as Schema.Schema<AzureMetadata>;

export interface ResourcePathNode {
  /** The type of resource this node represents. */
  nodeType?: "RESOURCE_PATH_NODE_TYPE_UNSPECIFIED" | "GCP_ORGANIZATION" | "GCP_FOLDER" | "GCP_PROJECT" | "AWS_ORGANIZATION" | "AWS_ORGANIZATIONAL_UNIT" | "AWS_ACCOUNT" | "AZURE_MANAGEMENT_GROUP" | "AZURE_SUBSCRIPTION" | "AZURE_RESOURCE_GROUP" | (string & {});
  /** The ID of the resource this node represents. */
  id?: string;
  /** The display name of the resource this node represents. */
  displayName?: string;
}

export const ResourcePathNode: Schema.Schema<ResourcePathNode> = Schema.suspend(() => Schema.Struct({
  nodeType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourcePathNode" }) as any as Schema.Schema<ResourcePathNode>;

export interface ResourcePath {
  /** The list of nodes that make the up resource path, ordered from lowest level to highest level. */
  nodes?: Array<ResourcePathNode>;
}

export const ResourcePath: Schema.Schema<ResourcePath> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Array(ResourcePathNode)),
})).annotate({ identifier: "ResourcePath" }) as any as Schema.Schema<ResourcePath>;

export interface GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality {
  /** Criticality Type. */
  type?: "CRITICALITY_TYPE_UNSPECIFIED" | "MISSION_CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
}

export const GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality: Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality>;

export interface GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment {
  /** Environment Type. */
  type?: "ENVIRONMENT_TYPE_UNSPECIFIED" | "PRODUCTION" | "STAGING" | "TEST" | "DEVELOPMENT" | (string & {});
}

export const GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment: Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment>;

export interface GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo {
  /** Email address of the contacts. */
  email?: string;
}

export const GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo: Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo>;

export interface GoogleCloudSecuritycenterV1ResourceApplicationAttributes {
  /** User-defined criticality information. */
  criticality?: GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality;
  /** User-defined environment information. */
  environment?: GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment;
  /** Developer team that owns development and coding. */
  developerOwners?: Array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo>;
  /** Operator team that ensures runtime and operations. */
  operatorOwners?: Array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo>;
  /** Business team that ensures user needs are met and value is delivered */
  businessOwners?: Array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo>;
}

export const GoogleCloudSecuritycenterV1ResourceApplicationAttributes: Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributes> = Schema.suspend(() => Schema.Struct({
  criticality: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality),
  environment: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment),
  developerOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo)),
  operatorOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo)),
  businessOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceApplicationAttributes" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplicationAttributes>;

export interface GoogleCloudSecuritycenterV1ResourceApplication {
  /** The resource name of an Application. Format: `projects/{host-project-id}/locations/{location}/applications/{application-id}` */
  name?: string;
  /** Consumer provided attributes for the application */
  attributes?: GoogleCloudSecuritycenterV1ResourceApplicationAttributes;
}

export const GoogleCloudSecuritycenterV1ResourceApplication: Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplicationAttributes),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceApplication" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceApplication>;

export interface AdcApplication {
  /** The resource name of an ADC Application. Format: projects/{project}/locations/{location}/spaces/{space}/applications/{application} */
  name?: string;
  /** Consumer provided attributes for the AppHub application. */
  attributes?: GoogleCloudSecuritycenterV1ResourceApplicationAttributes;
}

export const AdcApplication: Schema.Schema<AdcApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplicationAttributes),
})).annotate({ identifier: "AdcApplication" }) as any as Schema.Schema<AdcApplication>;

export interface AdcApplicationTemplateRevision {
  /** The resource name of an ADC Application Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const AdcApplicationTemplateRevision: Schema.Schema<AdcApplicationTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AdcApplicationTemplateRevision" }) as any as Schema.Schema<AdcApplicationTemplateRevision>;

export interface AdcSharedTemplateRevision {
  /** The resource name of an ADC Shared Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const AdcSharedTemplateRevision: Schema.Schema<AdcSharedTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AdcSharedTemplateRevision" }) as any as Schema.Schema<AdcSharedTemplateRevision>;

export interface Resource {
  /** The full resource name of the resource. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  name?: string;
  /** The human readable name of the resource. */
  displayName?: string;
  /** The full resource type of the resource. */
  type?: string;
  /** The full resource name of project that the resource belongs to. */
  projectName?: string;
  /** The project ID that the resource belongs to. */
  projectDisplayName?: string;
  /** The full resource name of resource's parent. */
  parentName?: string;
  /** The human readable name of resource's parent. */
  parentDisplayName?: string;
  /** Contains a Folder message for each folder in the assets ancestry. The first folder is the deepest nested folder, and the last folder is the folder directly under the Organization. */
  folders?: Array<Folder>;
  /** Indicates which cloud provider the finding is from. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** Indicates which organization / tenant the finding is for. */
  organization?: string;
  /** The service or resource provider associated with the resource. */
  service?: string;
  /** The region or location of the service (if applicable). */
  location?: string;
  /** The AWS metadata associated with the finding. */
  awsMetadata?: AwsMetadata;
  /** The Azure metadata associated with the finding. */
  azureMetadata?: AzureMetadata;
  /** Provides the path to the resource within the resource hierarchy. */
  resourcePath?: ResourcePath;
  /** A string representation of the resource path. For Google Cloud, it has the format of `org/{organization_id}/folder/{folder_id}/folder/{folder_id}/project/{project_id}` where there can be any number of folders. For AWS, it has the format of `org/{organization_id}/ou/{organizational_unit_id}/ou/{organizational_unit_id}/account/{account_id}` where there can be any number of organizational units. For Azure, it has the format of `mg/{management_group_id}/mg/{management_group_id}/subscription/{subscription_id}/rg/{resource_group_name}` where there can be any number of management groups. */
  resourcePathString?: string;
  /** The App Hub application this resource belongs to. */
  application?: GoogleCloudSecuritycenterV1ResourceApplication;
  /** The ADC application associated with the finding. */
  adcApplication?: AdcApplication;
  /** The ADC template associated with the finding. */
  adcApplicationTemplate?: AdcApplicationTemplateRevision;
  /** The ADC shared template associated with the finding. */
  adcSharedTemplate?: AdcSharedTemplateRevision;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  projectName: Schema.optional(Schema.String),
  projectDisplayName: Schema.optional(Schema.String),
  parentName: Schema.optional(Schema.String),
  parentDisplayName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Folder)),
  cloudProvider: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  awsMetadata: Schema.optional(AwsMetadata),
  azureMetadata: Schema.optional(AzureMetadata),
  resourcePath: Schema.optional(ResourcePath),
  resourcePathString: Schema.optional(Schema.String),
  application: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplication),
  adcApplication: Schema.optional(AdcApplication),
  adcApplicationTemplate: Schema.optional(AdcApplicationTemplateRevision),
  adcSharedTemplate: Schema.optional(AdcSharedTemplateRevision),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface ListFindingsResult {
  /** Finding matching the search request. */
  finding?: Finding;
  /** State change of the finding between the points in time. */
  stateChange?: "UNUSED" | "CHANGED" | "UNCHANGED" | "ADDED" | "REMOVED" | (string & {});
  /** Output only. Resource that is associated with this finding. */
  resource?: Resource;
}

export const ListFindingsResult: Schema.Schema<ListFindingsResult> = Schema.suspend(() => Schema.Struct({
  finding: Schema.optional(Finding),
  stateChange: Schema.optional(Schema.String),
  resource: Schema.optional(Resource),
})).annotate({ identifier: "ListFindingsResult" }) as any as Schema.Schema<ListFindingsResult>;

export interface ListFindingsResponse {
  /** Findings matching the list request. */
  listFindingsResults?: Array<ListFindingsResult>;
  /** Time used for executing the list request. */
  readTime?: string;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
  /** The total number of findings matching the query. */
  totalSize?: number;
}

export const ListFindingsResponse: Schema.Schema<ListFindingsResponse> = Schema.suspend(() => Schema.Struct({
  listFindingsResults: Schema.optional(Schema.Array(ListFindingsResult)),
  readTime: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListFindingsResponse" }) as any as Schema.Schema<ListFindingsResponse>;

export interface ListMuteConfigsResponse {
  /** The mute configs from the specified parent. */
  muteConfigs?: Array<GoogleCloudSecuritycenterV1MuteConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMuteConfigsResponse: Schema.Schema<ListMuteConfigsResponse> = Schema.suspend(() => Schema.Struct({
  muteConfigs: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1MuteConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMuteConfigsResponse" }) as any as Schema.Schema<ListMuteConfigsResponse>;

export interface ListNotificationConfigsResponse {
  /** Notification configs belonging to the requested parent. */
  notificationConfigs?: Array<NotificationConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const ListNotificationConfigsResponse: Schema.Schema<ListNotificationConfigsResponse> = Schema.suspend(() => Schema.Struct({
  notificationConfigs: Schema.optional(Schema.Array(NotificationConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNotificationConfigsResponse" }) as any as Schema.Schema<ListNotificationConfigsResponse>;

export interface ListEffectiveSecurityHealthAnalyticsCustomModulesResponse {
  /** Effective custom modules belonging to the requested parent. */
  effectiveSecurityHealthAnalyticsCustomModules?: Array<GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule>;
  /** If not empty, indicates that there may be more effective custom modules to be returned. */
  nextPageToken?: string;
}

export const ListEffectiveSecurityHealthAnalyticsCustomModulesResponse: Schema.Schema<ListEffectiveSecurityHealthAnalyticsCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  effectiveSecurityHealthAnalyticsCustomModules: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEffectiveSecurityHealthAnalyticsCustomModulesResponse" }) as any as Schema.Schema<ListEffectiveSecurityHealthAnalyticsCustomModulesResponse>;

export interface ListSecurityHealthAnalyticsCustomModulesResponse {
  /** Custom modules belonging to the requested parent. */
  securityHealthAnalyticsCustomModules?: Array<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule>;
  /** If not empty, indicates that there may be more custom modules to be returned. */
  nextPageToken?: string;
}

export const ListSecurityHealthAnalyticsCustomModulesResponse: Schema.Schema<ListSecurityHealthAnalyticsCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  securityHealthAnalyticsCustomModules: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSecurityHealthAnalyticsCustomModulesResponse" }) as any as Schema.Schema<ListSecurityHealthAnalyticsCustomModulesResponse>;

export interface ListSourcesResponse {
  /** Sources belonging to the requested parent. */
  sources?: Array<Source>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const ListSourcesResponse: Schema.Schema<ListSourcesResponse> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(Source)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSourcesResponse" }) as any as Schema.Schema<ListSourcesResponse>;

export interface RunAssetDiscoveryRequest {
}

export const RunAssetDiscoveryRequest: Schema.Schema<RunAssetDiscoveryRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RunAssetDiscoveryRequest" }) as any as Schema.Schema<RunAssetDiscoveryRequest>;

export interface SetFindingStateRequest {
  /** Required. The desired State of the finding. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Optional. The time at which the updated state takes effect. If unset, defaults to the request time. */
  startTime?: string;
}

export const SetFindingStateRequest: Schema.Schema<SetFindingStateRequest> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SetFindingStateRequest" }) as any as Schema.Schema<SetFindingStateRequest>;

export interface SetMuteRequest {
  /** Required. The desired state of the Mute. */
  mute?: "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED" | (string & {});
}

export const SetMuteRequest: Schema.Schema<SetMuteRequest> = Schema.suspend(() => Schema.Struct({
  mute: Schema.optional(Schema.String),
})).annotate({ identifier: "SetMuteRequest" }) as any as Schema.Schema<SetMuteRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
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

export interface SimulatedResource {
  /** Required. The type of the resource, for example, `compute.googleapis.com/Disk`. */
  resourceType?: string;
  /** Optional. A representation of the Google Cloud resource. Should match the Google Cloud resource JSON format. */
  resourceData?: Record<string, unknown>;
  /** Optional. A representation of the IAM policy. */
  iamPolicyData?: Policy;
}

export const SimulatedResource: Schema.Schema<SimulatedResource> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resourceData: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  iamPolicyData: Schema.optional(Policy),
})).annotate({ identifier: "SimulatedResource" }) as any as Schema.Schema<SimulatedResource>;

export interface SimulateSecurityHealthAnalyticsCustomModuleRequest {
  /** Required. The custom configuration that you need to test. */
  customConfig?: GoogleCloudSecuritycenterV1CustomConfig;
  /** Required. Resource data to simulate custom module against. */
  resource?: SimulatedResource;
}

export const SimulateSecurityHealthAnalyticsCustomModuleRequest: Schema.Schema<SimulateSecurityHealthAnalyticsCustomModuleRequest> = Schema.suspend(() => Schema.Struct({
  customConfig: Schema.optional(GoogleCloudSecuritycenterV1CustomConfig),
  resource: Schema.optional(SimulatedResource),
})).annotate({ identifier: "SimulateSecurityHealthAnalyticsCustomModuleRequest" }) as any as Schema.Schema<SimulateSecurityHealthAnalyticsCustomModuleRequest>;

export interface SimulatedResult {
  /** Finding that would be published for the test case, if a violation is detected. */
  finding?: Finding;
  /** Indicates that the test case does not trigger any violation. */
  noViolation?: Empty;
  /** Error encountered during the test. */
  error?: Status;
}

export const SimulatedResult: Schema.Schema<SimulatedResult> = Schema.suspend(() => Schema.Struct({
  finding: Schema.optional(Finding),
  noViolation: Schema.optional(Empty),
  error: Schema.optional(Status),
})).annotate({ identifier: "SimulatedResult" }) as any as Schema.Schema<SimulatedResult>;

export interface SimulateSecurityHealthAnalyticsCustomModuleResponse {
  /** Result for test case in the corresponding request. */
  result?: SimulatedResult;
}

export const SimulateSecurityHealthAnalyticsCustomModuleResponse: Schema.Schema<SimulateSecurityHealthAnalyticsCustomModuleResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(SimulatedResult),
})).annotate({ identifier: "SimulateSecurityHealthAnalyticsCustomModuleResponse" }) as any as Schema.Schema<SimulateSecurityHealthAnalyticsCustomModuleResponse>;

export interface ListBigQueryExportsResponse {
  /** The BigQuery exports from the specified parent. */
  bigQueryExports?: Array<GoogleCloudSecuritycenterV1BigQueryExport>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListBigQueryExportsResponse: Schema.Schema<ListBigQueryExportsResponse> = Schema.suspend(() => Schema.Struct({
  bigQueryExports: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1BigQueryExport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBigQueryExportsResponse" }) as any as Schema.Schema<ListBigQueryExportsResponse>;

export interface EventThreatDetectionCustomModule {
  /** Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name?: string;
  /** Config for the module. For the resident module, its config value is defined at this level. For the inherited module, its config value is inherited from the ancestor module. */
  config?: Record<string, unknown>;
  /** Output only. The closest ancestor module that this module inherits the enablement state from. The format is the same as the EventThreatDetectionCustomModule resource name. */
  ancestorModule?: string;
  /** The state of enablement for the module at the given level of the hierarchy. */
  enablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "INHERITED" | (string & {});
  /** Type for the module. e.g. CONFIGURABLE_BAD_IP. */
  type?: string;
  /** The human readable name to be displayed for the module. */
  displayName?: string;
  /** The description for the module. */
  description?: string;
  /** Output only. The time the module was last updated. */
  updateTime?: string;
  /** Output only. The editor the module was last updated by. */
  lastEditor?: string;
  /** The cloud provider of the custom module. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
}

export const EventThreatDetectionCustomModule: Schema.Schema<EventThreatDetectionCustomModule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  config: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  ancestorModule: Schema.optional(Schema.String),
  enablementState: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastEditor: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "EventThreatDetectionCustomModule" }) as any as Schema.Schema<EventThreatDetectionCustomModule>;

export interface ListDescendantEventThreatDetectionCustomModulesResponse {
  /** Custom modules belonging to the requested parent. */
  eventThreatDetectionCustomModules?: Array<EventThreatDetectionCustomModule>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDescendantEventThreatDetectionCustomModulesResponse: Schema.Schema<ListDescendantEventThreatDetectionCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  eventThreatDetectionCustomModules: Schema.optional(Schema.Array(EventThreatDetectionCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDescendantEventThreatDetectionCustomModulesResponse" }) as any as Schema.Schema<ListDescendantEventThreatDetectionCustomModulesResponse>;

export interface ListEventThreatDetectionCustomModulesResponse {
  /** Custom modules belonging to the requested parent. */
  eventThreatDetectionCustomModules?: Array<EventThreatDetectionCustomModule>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListEventThreatDetectionCustomModulesResponse: Schema.Schema<ListEventThreatDetectionCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  eventThreatDetectionCustomModules: Schema.optional(Schema.Array(EventThreatDetectionCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEventThreatDetectionCustomModulesResponse" }) as any as Schema.Schema<ListEventThreatDetectionCustomModulesResponse>;

export interface ValidateEventThreatDetectionCustomModuleRequest {
  /** Required. The raw text of the module's contents. Used to generate error messages. */
  rawText?: string;
  /** Required. The type of the module (e.g. CONFIGURABLE_BAD_IP). */
  type?: string;
}

export const ValidateEventThreatDetectionCustomModuleRequest: Schema.Schema<ValidateEventThreatDetectionCustomModuleRequest> = Schema.suspend(() => Schema.Struct({
  rawText: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateEventThreatDetectionCustomModuleRequest" }) as any as Schema.Schema<ValidateEventThreatDetectionCustomModuleRequest>;

export interface Position {
  /** The line number. */
  lineNumber?: number;
  /** The column number. */
  columnNumber?: number;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() => Schema.Struct({
  lineNumber: Schema.optional(Schema.Number),
  columnNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface CustomModuleValidationError {
  /** A description of the error, suitable for human consumption. Required. */
  description?: string;
  /** The path, in RFC 8901 JSON Pointer format, to the field that failed validation. This may be left empty if no specific field is affected. */
  fieldPath?: string;
  /** The initial position of the error in the uploaded text version of the module. This field may be omitted if no specific position applies, or if one could not be computed. */
  start?: Position;
  /** The end position of the error in the uploaded text version of the module. This field may be omitted if no specific position applies, or if one could not be computed. */
  end?: Position;
}

export const CustomModuleValidationError: Schema.Schema<CustomModuleValidationError> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  fieldPath: Schema.optional(Schema.String),
  start: Schema.optional(Position),
  end: Schema.optional(Position),
})).annotate({ identifier: "CustomModuleValidationError" }) as any as Schema.Schema<CustomModuleValidationError>;

export interface CustomModuleValidationErrors {
  /** The list of errors. */
  errors?: Array<CustomModuleValidationError>;
}

export const CustomModuleValidationErrors: Schema.Schema<CustomModuleValidationErrors> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(CustomModuleValidationError)),
})).annotate({ identifier: "CustomModuleValidationErrors" }) as any as Schema.Schema<CustomModuleValidationErrors>;

export interface ValidateEventThreatDetectionCustomModuleResponse {
  /** A list of errors returned by the validator. If the list is empty, there were no errors. */
  errors?: CustomModuleValidationErrors;
}

export const ValidateEventThreatDetectionCustomModuleResponse: Schema.Schema<ValidateEventThreatDetectionCustomModuleResponse> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(CustomModuleValidationErrors),
})).annotate({ identifier: "ValidateEventThreatDetectionCustomModuleResponse" }) as any as Schema.Schema<ValidateEventThreatDetectionCustomModuleResponse>;

export interface EffectiveEventThreatDetectionCustomModule {
  /** Output only. The resource name of the effective ETD custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. */
  name?: string;
  /** Output only. Config for the effective module. */
  config?: Record<string, unknown>;
  /** Output only. The effective state of enablement for the module at the given level of the hierarchy. */
  enablementState?: "ENABLEMENT_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. Type for the module. e.g. CONFIGURABLE_BAD_IP. */
  type?: string;
  /** Output only. The human readable name to be displayed for the module. */
  displayName?: string;
  /** Output only. The description for the module. */
  description?: string;
  /** The cloud provider of the custom module. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
}

export const EffectiveEventThreatDetectionCustomModule: Schema.Schema<EffectiveEventThreatDetectionCustomModule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  config: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  enablementState: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
})).annotate({ identifier: "EffectiveEventThreatDetectionCustomModule" }) as any as Schema.Schema<EffectiveEventThreatDetectionCustomModule>;

export interface ListEffectiveEventThreatDetectionCustomModulesResponse {
  /** Effective custom modules belonging to the requested parent. */
  effectiveEventThreatDetectionCustomModules?: Array<EffectiveEventThreatDetectionCustomModule>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListEffectiveEventThreatDetectionCustomModulesResponse: Schema.Schema<ListEffectiveEventThreatDetectionCustomModulesResponse> = Schema.suspend(() => Schema.Struct({
  effectiveEventThreatDetectionCustomModules: Schema.optional(Schema.Array(EffectiveEventThreatDetectionCustomModule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEffectiveEventThreatDetectionCustomModulesResponse" }) as any as Schema.Schema<ListEffectiveEventThreatDetectionCustomModulesResponse>;

export interface GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping {
  /** Resource value mapping for high-sensitivity Sensitive Data Protection findings */
  highSensitivityMapping?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
  /** Resource value mapping for medium-sensitivity Sensitive Data Protection findings */
  mediumSensitivityMapping?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
}

export const GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping: Schema.Schema<GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping> = Schema.suspend(() => Schema.Struct({
  highSensitivityMapping: Schema.optional(Schema.String),
  mediumSensitivityMapping: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping>;

export interface GoogleCloudSecuritycenterV1ResourceValueConfig {
  /** Name for the resource value configuration */
  name?: string;
  /** Required. Resource value level this expression represents */
  resourceValue?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
  /** Required. Tag values combined with `AND` to check against. For Google Cloud resources, they are tag value IDs in the form of "tagValues/123". Example: `[ "tagValues/123", "tagValues/456", "tagValues/789" ]` https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing */
  tagValues?: Array<string>;
  /** Apply resource_value only to resources that match resource_type. resource_type will be checked with `AND` of other resources. For example, "storage.googleapis.com/Bucket" with resource_value "HIGH" will apply "HIGH" value only to "storage.googleapis.com/Bucket" resources. */
  resourceType?: string;
  /** Project or folder to scope this configuration to. For example, "project/456" would apply this configuration only to resources in "project/456" scope will be checked with `AND` of other resources. */
  scope?: string;
  /** List of resource labels to search for, evaluated with `AND`. For example, `"resource_labels_selector": {"key": "value", "env": "prod"}` will match resources with labels "key": "value" `AND` "env": "prod" https://cloud.google.com/resource-manager/docs/creating-managing-labels */
  resourceLabelsSelector?: Record<string, string>;
  /** Description of the resource value configuration. */
  description?: string;
  /** Output only. Timestamp this resource value configuration was created. */
  createTime?: string;
  /** Output only. Timestamp this resource value configuration was last updated. */
  updateTime?: string;
  /** Cloud provider this configuration applies to */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** A mapping of the sensitivity on Sensitive Data Protection finding to resource values. This mapping can only be used in combination with a resource_type that is related to BigQuery, e.g. "bigquery.googleapis.com/Dataset". */
  sensitiveDataProtectionMapping?: GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping;
}

export const GoogleCloudSecuritycenterV1ResourceValueConfig: Schema.Schema<GoogleCloudSecuritycenterV1ResourceValueConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceValue: Schema.optional(Schema.String),
  tagValues: Schema.optional(Schema.Array(Schema.String)),
  resourceType: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  resourceLabelsSelector: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  sensitiveDataProtectionMapping: Schema.optional(GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1ResourceValueConfig" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1ResourceValueConfig>;

export interface CreateResourceValueConfigRequest {
  /** Required. Resource name of the new ResourceValueConfig's parent. */
  parent?: string;
  /** Required. The resource value config being created. */
  resourceValueConfig?: GoogleCloudSecuritycenterV1ResourceValueConfig;
}

export const CreateResourceValueConfigRequest: Schema.Schema<CreateResourceValueConfigRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  resourceValueConfig: Schema.optional(GoogleCloudSecuritycenterV1ResourceValueConfig),
})).annotate({ identifier: "CreateResourceValueConfigRequest" }) as any as Schema.Schema<CreateResourceValueConfigRequest>;

export interface BatchCreateResourceValueConfigsRequest {
  /** Required. The resource value configs to be created. */
  requests?: Array<CreateResourceValueConfigRequest>;
}

export const BatchCreateResourceValueConfigsRequest: Schema.Schema<BatchCreateResourceValueConfigsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(CreateResourceValueConfigRequest)),
})).annotate({ identifier: "BatchCreateResourceValueConfigsRequest" }) as any as Schema.Schema<BatchCreateResourceValueConfigsRequest>;

export interface BatchCreateResourceValueConfigsResponse {
  /** The resource value configs created */
  resourceValueConfigs?: Array<GoogleCloudSecuritycenterV1ResourceValueConfig>;
}

export const BatchCreateResourceValueConfigsResponse: Schema.Schema<BatchCreateResourceValueConfigsResponse> = Schema.suspend(() => Schema.Struct({
  resourceValueConfigs: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1ResourceValueConfig)),
})).annotate({ identifier: "BatchCreateResourceValueConfigsResponse" }) as any as Schema.Schema<BatchCreateResourceValueConfigsResponse>;

export interface ListResourceValueConfigsResponse {
  /** The resource value configs from the specified parent. */
  resourceValueConfigs?: Array<GoogleCloudSecuritycenterV1ResourceValueConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListResourceValueConfigsResponse: Schema.Schema<ListResourceValueConfigsResponse> = Schema.suspend(() => Schema.Struct({
  resourceValueConfigs: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1ResourceValueConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListResourceValueConfigsResponse" }) as any as Schema.Schema<ListResourceValueConfigsResponse>;

export interface ListValuedResourcesResponse {
  /** The valued resources that the attack path simulation identified. */
  valuedResources?: Array<ValuedResource>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
  /** The estimated total number of results matching the query. */
  totalSize?: number;
}

export const ListValuedResourcesResponse: Schema.Schema<ListValuedResourcesResponse> = Schema.suspend(() => Schema.Struct({
  valuedResources: Schema.optional(Schema.Array(ValuedResource)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListValuedResourcesResponse" }) as any as Schema.Schema<ListValuedResourcesResponse>;

export interface PathNodeAssociatedFinding {
  /** Canonical name of the associated findings. Example: `organizations/123/sources/456/findings/789` */
  canonicalFinding?: string;
  /** The additional taxonomy group within findings from a given source. */
  findingCategory?: string;
  /** Full resource name of the finding. */
  name?: string;
}

export const PathNodeAssociatedFinding: Schema.Schema<PathNodeAssociatedFinding> = Schema.suspend(() => Schema.Struct({
  canonicalFinding: Schema.optional(Schema.String),
  findingCategory: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PathNodeAssociatedFinding" }) as any as Schema.Schema<PathNodeAssociatedFinding>;

export interface AttackStepNode {
  /** Unique ID for one Node */
  uuid?: string;
  /** Attack step type. Can be either AND, OR or DEFENSE */
  type?: "NODE_TYPE_UNSPECIFIED" | "NODE_TYPE_AND" | "NODE_TYPE_OR" | "NODE_TYPE_DEFENSE" | "NODE_TYPE_ATTACKER" | (string & {});
  /** User friendly name of the attack step */
  displayName?: string;
  /** Attack step labels for metadata */
  labels?: Record<string, string>;
  /** Attack step description */
  description?: string;
}

export const AttackStepNode: Schema.Schema<AttackStepNode> = Schema.suspend(() => Schema.Struct({
  uuid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "AttackStepNode" }) as any as Schema.Schema<AttackStepNode>;

export interface AttackPathNode {
  /** The name of the resource at this point in the attack path. The format of the name follows the Cloud Asset Inventory [resource name format](https://cloud.google.com/asset-inventory/docs/resource-name-format) */
  resource?: string;
  /** The [supported resource type](https://cloud.google.com/asset-inventory/docs/supported-asset-types) */
  resourceType?: string;
  /** Human-readable name of this resource. */
  displayName?: string;
  /** The findings associated with this node in the attack path. */
  associatedFindings?: Array<PathNodeAssociatedFinding>;
  /** Unique id of the attack path node. */
  uuid?: string;
  /** A list of attack step nodes that exist in this attack path node. */
  attackSteps?: Array<AttackStepNode>;
}

export const AttackPathNode: Schema.Schema<AttackPathNode> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  associatedFindings: Schema.optional(Schema.Array(PathNodeAssociatedFinding)),
  uuid: Schema.optional(Schema.String),
  attackSteps: Schema.optional(Schema.Array(AttackStepNode)),
})).annotate({ identifier: "AttackPathNode" }) as any as Schema.Schema<AttackPathNode>;

export interface AttackPathEdge {
  /** The attack node uuid of the source node. */
  source?: string;
  /** The attack node uuid of the destination node. */
  destination?: string;
}

export const AttackPathEdge: Schema.Schema<AttackPathEdge> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "AttackPathEdge" }) as any as Schema.Schema<AttackPathEdge>;

export interface AttackPath {
  /** The attack path name, for example, `organizations/12/simulation/34/valuedResources/56/attackPaths/78` */
  name?: string;
  /** A list of nodes that exist in this attack path. */
  pathNodes?: Array<AttackPathNode>;
  /** A list of the edges between nodes in this attack path. */
  edges?: Array<AttackPathEdge>;
}

export const AttackPath: Schema.Schema<AttackPath> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  pathNodes: Schema.optional(Schema.Array(AttackPathNode)),
  edges: Schema.optional(Schema.Array(AttackPathEdge)),
})).annotate({ identifier: "AttackPath" }) as any as Schema.Schema<AttackPath>;

export interface ListAttackPathsResponse {
  /** The attack paths that the attack path simulation identified. */
  attackPaths?: Array<AttackPath>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const ListAttackPathsResponse: Schema.Schema<ListAttackPathsResponse> = Schema.suspend(() => Schema.Struct({
  attackPaths: Schema.optional(Schema.Array(AttackPath)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAttackPathsResponse" }) as any as Schema.Schema<ListAttackPathsResponse>;

export interface GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse {
  /** The state of an asset discovery run. */
  state?: "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED" | (string & {});
  /** The duration between asset discovery run start and end */
  duration?: string;
}

export const GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse: Schema.Schema<GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse>;

export interface GoogleCloudSecuritycenterV1BulkMuteFindingsResponse {
}

export const GoogleCloudSecuritycenterV1BulkMuteFindingsResponse: Schema.Schema<GoogleCloudSecuritycenterV1BulkMuteFindingsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudSecuritycenterV1BulkMuteFindingsResponse" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1BulkMuteFindingsResponse>;

export interface GoogleCloudSecuritycenterV1Resource {
  /** The full resource name of the resource. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  name?: string;
  /** The human readable name of the resource. */
  displayName?: string;
  /** The full resource type of the resource. */
  type?: string;
  /** The full resource name of project that the resource belongs to. */
  project?: string;
  /** The project ID that the resource belongs to. */
  projectDisplayName?: string;
  /** The full resource name of resource's parent. */
  parent?: string;
  /** The human readable name of resource's parent. */
  parentDisplayName?: string;
  /** Output only. Contains a Folder message for each folder in the assets ancestry. The first folder is the deepest nested folder, and the last folder is the folder directly under the Organization. */
  folders?: Array<Folder>;
  /** Indicates which cloud provider the resource resides in. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** Indicates which organization or tenant in the cloud provider the finding applies to. */
  organization?: string;
  /** The parent service or product from which the resource is provided, for example, GKE or SNS. */
  service?: string;
  /** The region or location of the service (if applicable). */
  location?: string;
  /** The AWS metadata associated with the finding. */
  awsMetadata?: AwsMetadata;
  /** The Azure metadata associated with the finding. */
  azureMetadata?: AzureMetadata;
  /** Provides the path to the resource within the resource hierarchy. */
  resourcePath?: ResourcePath;
  /** A string representation of the resource path. For Google Cloud, it has the format of `organizations/{organization_id}/folders/{folder_id}/folders/{folder_id}/projects/{project_id}` where there can be any number of folders. For AWS, it has the format of `org/{organization_id}/ou/{organizational_unit_id}/ou/{organizational_unit_id}/account/{account_id}` where there can be any number of organizational units. For Azure, it has the format of `mg/{management_group_id}/mg/{management_group_id}/subscription/{subscription_id}/rg/{resource_group_name}` where there can be any number of management groups. */
  resourcePathString?: string;
  /** The App Hub application this resource belongs to. */
  application?: GoogleCloudSecuritycenterV1ResourceApplication;
  /** The ADC application associated with the finding. */
  adcApplication?: AdcApplication;
  /** The ADC template associated with the finding. */
  adcApplicationTemplate?: AdcApplicationTemplateRevision;
  /** The ADC shared template associated with the finding. */
  adcSharedTemplate?: AdcSharedTemplateRevision;
}

export const GoogleCloudSecuritycenterV1Resource: Schema.Schema<GoogleCloudSecuritycenterV1Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  projectDisplayName: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  parentDisplayName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(Folder)),
  cloudProvider: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  awsMetadata: Schema.optional(AwsMetadata),
  azureMetadata: Schema.optional(AzureMetadata),
  resourcePath: Schema.optional(ResourcePath),
  resourcePathString: Schema.optional(Schema.String),
  application: Schema.optional(GoogleCloudSecuritycenterV1ResourceApplication),
  adcApplication: Schema.optional(AdcApplication),
  adcApplicationTemplate: Schema.optional(AdcApplicationTemplateRevision),
  adcSharedTemplate: Schema.optional(AdcSharedTemplateRevision),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1Resource" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1Resource>;

export interface GoogleCloudSecuritycenterV1NotificationMessage {
  /** Name of the notification config that generated current notification. */
  notificationConfigName?: string;
  /** If it's a Finding based notification config, this field will be populated. */
  finding?: Finding;
  /** The Cloud resource tied to this notification's Finding. */
  resource?: GoogleCloudSecuritycenterV1Resource;
}

export const GoogleCloudSecuritycenterV1NotificationMessage: Schema.Schema<GoogleCloudSecuritycenterV1NotificationMessage> = Schema.suspend(() => Schema.Struct({
  notificationConfigName: Schema.optional(Schema.String),
  finding: Schema.optional(Finding),
  resource: Schema.optional(GoogleCloudSecuritycenterV1Resource),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1NotificationMessage" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1NotificationMessage>;

export interface GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse {
  /** The state of an asset discovery run. */
  state?: "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED" | (string & {});
  /** The duration between asset discovery run start and end */
  duration?: string;
}

export const GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse: Schema.Schema<GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse>;

export interface GoogleCloudSecuritycenterV2BulkMuteFindingsResponse {
}

export const GoogleCloudSecuritycenterV2BulkMuteFindingsResponse: Schema.Schema<GoogleCloudSecuritycenterV2BulkMuteFindingsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudSecuritycenterV2BulkMuteFindingsResponse" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2BulkMuteFindingsResponse>;

export interface GoogleCloudSecuritycenterV2TicketInfo {
  /** The identifier of the ticket in the ticket system. */
  id?: string;
  /** The assignee of the ticket in the ticket system. */
  assignee?: string;
  /** The description of the ticket in the ticket system. */
  description?: string;
  /** The link to the ticket in the ticket system. */
  uri?: string;
  /** The latest status of the ticket, as reported by the ticket system. */
  status?: string;
  /** The time when the ticket was last updated, as reported by the ticket system. */
  updateTime?: string;
}

export const GoogleCloudSecuritycenterV2TicketInfo: Schema.Schema<GoogleCloudSecuritycenterV2TicketInfo> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  assignee: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2TicketInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2TicketInfo>;

export interface GoogleCloudSecuritycenterV2ExternalSystem {
  /** Full resource name of the external system. The following list shows some examples: + `organizations/1234/sources/5678/findings/123456/externalSystems/jira` + `organizations/1234/sources/5678/locations/us/findings/123456/externalSystems/jira` + `folders/1234/sources/5678/findings/123456/externalSystems/jira` + `folders/1234/sources/5678/locations/us/findings/123456/externalSystems/jira` + `projects/1234/sources/5678/findings/123456/externalSystems/jira` + `projects/1234/sources/5678/locations/us/findings/123456/externalSystems/jira` */
  name?: string;
  /** References primary/secondary etc assignees in the external system. */
  assignees?: Array<string>;
  /** The identifier that's used to track the finding's corresponding case in the external system. */
  externalUid?: string;
  /** The most recent status of the finding's corresponding case, as reported by the external system. */
  status?: string;
  /** The time when the case was last updated, as reported by the external system. */
  externalSystemUpdateTime?: string;
  /** The link to the finding's corresponding case in the external system. */
  caseUri?: string;
  /** The priority of the finding's corresponding case in the external system. */
  casePriority?: string;
  /** The SLA of the finding's corresponding case in the external system. */
  caseSla?: string;
  /** The time when the case was created, as reported by the external system. */
  caseCreateTime?: string;
  /** The time when the case was closed, as reported by the external system. */
  caseCloseTime?: string;
  /** Information about the ticket, if any, that is being used to track the resolution of the issue that is identified by this finding. */
  ticketInfo?: GoogleCloudSecuritycenterV2TicketInfo;
}

export const GoogleCloudSecuritycenterV2ExternalSystem: Schema.Schema<GoogleCloudSecuritycenterV2ExternalSystem> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assignees: Schema.optional(Schema.Array(Schema.String)),
  externalUid: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  externalSystemUpdateTime: Schema.optional(Schema.String),
  caseUri: Schema.optional(Schema.String),
  casePriority: Schema.optional(Schema.String),
  caseSla: Schema.optional(Schema.String),
  caseCreateTime: Schema.optional(Schema.String),
  caseCloseTime: Schema.optional(Schema.String),
  ticketInfo: Schema.optional(GoogleCloudSecuritycenterV2TicketInfo),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ExternalSystem" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ExternalSystem>;

export interface GoogleCloudSecuritycenterV2MuteConfig {
  /** Identifier. This field will be ignored if provided on config creation. The following list shows some examples of the format: + `organizations/{organization}/muteConfigs/{mute_config}` + `organizations/{organization}locations/{location}//muteConfigs/{mute_config}` + `folders/{folder}/muteConfigs/{mute_config}` + `folders/{folder}/locations/{location}/muteConfigs/{mute_config}` + `projects/{project}/muteConfigs/{mute_config}` + `projects/{project}/locations/{location}/muteConfigs/{mute_config}` */
  name?: string;
  /** A description of the mute config. */
  description?: string;
  /** Required. An expression that defines the filter to apply across create/update events of findings. While creating a filter string, be mindful of the scope in which the mute configuration is being created. E.g., If a filter contains project = X but is created under the project = Y scope, it might not match any findings. The following field and operator combinations are supported: * severity: `=`, `:` * category: `=`, `:` * resource.name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.type: `=`, `:` * finding_class: `=`, `:` * indicator.ip_addresses: `=`, `:` * indicator.domains: `=`, `:` */
  filter?: string;
  /** Output only. The time at which the mute config was created. This field is set by the server and will be ignored if provided on config creation. */
  createTime?: string;
  /** Output only. The most recent time at which the mute config was updated. This field is set by the server and will be ignored if provided on config creation or update. */
  updateTime?: string;
  /** Output only. Email address of the user who last edited the mute config. This field is set by the server and will be ignored if provided on config creation or update. */
  mostRecentEditor?: string;
  /** Required. The type of the mute config, which determines what type of mute state the config affects. Immutable after creation. */
  type?: "MUTE_CONFIG_TYPE_UNSPECIFIED" | "STATIC" | "DYNAMIC" | (string & {});
  /** Optional. The expiry of the mute config. Only applicable for dynamic configs. If the expiry is set, when the config expires, it is removed from all findings. */
  expiryTime?: string;
  /** Output only. The resource name of the Cloud KMS `CryptoKey` used to encrypt this configuration data, if CMEK was enabled during Security Command Center activation. */
  cryptoKeyName?: string;
}

export const GoogleCloudSecuritycenterV2MuteConfig: Schema.Schema<GoogleCloudSecuritycenterV2MuteConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  mostRecentEditor: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  expiryTime: Schema.optional(Schema.String),
  cryptoKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2MuteConfig" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2MuteConfig>;

export interface GoogleCloudSecuritycenterV2BigQueryExport {
  /** Identifier. The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. The following list shows some examples: + `organizations/{organization_id}/locations/{location_id}/bigQueryExports/{export_id}` + `folders/{folder_id}/locations/{location_id}/bigQueryExports/{export_id}` + `projects/{project_id}/locations/{location_id}/bigQueryExports/{export_id}` This field is provided in responses, and is ignored when provided in create requests. */
  name?: string;
  /** The description of the export (max of 1024 characters). */
  description?: string;
  /** Expression that defines the filter to apply across create/update events of findings. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the corresponding resource. The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. */
  filter?: string;
  /** The dataset to write findings' updates to. Its format is "projects/[project_id]/datasets/[bigquery_dataset_id]". BigQuery dataset unique ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). */
  dataset?: string;
  /** Output only. The time at which the BigQuery export was created. This field is set by the server and will be ignored if provided on export on creation. */
  createTime?: string;
  /** Output only. The most recent time at which the BigQuery export was updated. This field is set by the server and will be ignored if provided on export creation or update. */
  updateTime?: string;
  /** Output only. Email address of the user who last edited the BigQuery export. This field is set by the server and will be ignored if provided on export creation or update. */
  mostRecentEditor?: string;
  /** Output only. The service account that needs permission to create table and upload data to the BigQuery dataset. */
  principal?: string;
  /** Output only. The resource name of the Cloud KMS `CryptoKey` used to protect this configuration's data, if configured during Security Command Center activation. */
  cryptoKeyName?: string;
}

export const GoogleCloudSecuritycenterV2BigQueryExport: Schema.Schema<GoogleCloudSecuritycenterV2BigQueryExport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  dataset: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  mostRecentEditor: Schema.optional(Schema.String),
  principal: Schema.optional(Schema.String),
  cryptoKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2BigQueryExport" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2BigQueryExport>;

export interface GoogleCloudSecuritycenterV2SecurityMarks {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name The following list shows some examples: + `organizations/{organization_id}/assets/{asset_id}/securityMarks` + `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks` + `organizations/{organization_id}/sources/{source_id}/locations/{location}/findings/{finding_id}/securityMarks` */
  name?: string;
  /** Mutable user specified security marks belonging to the parent resource. Constraints are as follows: * Keys and values are treated as case insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys must be letters, numbers, underscores, or dashes * Values have leading and trailing whitespace trimmed, remaining characters must be between 1 - 4096 characters (inclusive) */
  marks?: Record<string, string>;
  /** The canonical name of the marks. The following list shows some examples: + `organizations/{organization_id}/assets/{asset_id}/securityMarks` + `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks` + `organizations/{organization_id}/sources/{source_id}/locations/{location}/findings/{finding_id}/securityMarks` + `folders/{folder_id}/assets/{asset_id}/securityMarks` + `folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks` + `folders/{folder_id}/sources/{source_id}/locations/{location}/findings/{finding_id}/securityMarks` + `projects/{project_number}/assets/{asset_id}/securityMarks` + `projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks` + `projects/{project_number}/sources/{source_id}/locations/{location}/findings/{finding_id}/securityMarks` */
  canonicalName?: string;
}

export const GoogleCloudSecuritycenterV2SecurityMarks: Schema.Schema<GoogleCloudSecuritycenterV2SecurityMarks> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecurityMarks" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecurityMarks>;

export interface GoogleCloudSecuritycenterV2StaticMute {
  /** The static mute state. If the value is `MUTED` or `UNMUTED`, then the finding's overall mute state will have the same value. */
  state?: "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED" | (string & {});
  /** When the static mute was applied. */
  applyTime?: string;
}

export const GoogleCloudSecuritycenterV2StaticMute: Schema.Schema<GoogleCloudSecuritycenterV2StaticMute> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  applyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2StaticMute" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2StaticMute>;

export interface GoogleCloudSecuritycenterV2DynamicMuteRecord {
  /** The relative resource name of the mute rule, represented by a mute config, that created this record, for example `organizations/123/muteConfigs/mymuteconfig` or `organizations/123/locations/global/muteConfigs/mymuteconfig`. */
  muteConfig?: string;
  /** When the dynamic mute rule first matched the finding. */
  matchTime?: string;
}

export const GoogleCloudSecuritycenterV2DynamicMuteRecord: Schema.Schema<GoogleCloudSecuritycenterV2DynamicMuteRecord> = Schema.suspend(() => Schema.Struct({
  muteConfig: Schema.optional(Schema.String),
  matchTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2DynamicMuteRecord" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2DynamicMuteRecord>;

export interface GoogleCloudSecuritycenterV2MuteInfo {
  /** If set, the static mute applied to this finding. Static mutes override dynamic mutes. If unset, there is no static mute. */
  staticMute?: GoogleCloudSecuritycenterV2StaticMute;
  /** The list of dynamic mute rules that currently match the finding. */
  dynamicMuteRecords?: Array<GoogleCloudSecuritycenterV2DynamicMuteRecord>;
}

export const GoogleCloudSecuritycenterV2MuteInfo: Schema.Schema<GoogleCloudSecuritycenterV2MuteInfo> = Schema.suspend(() => Schema.Struct({
  staticMute: Schema.optional(GoogleCloudSecuritycenterV2StaticMute),
  dynamicMuteRecords: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2DynamicMuteRecord)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2MuteInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2MuteInfo>;

export interface GoogleCloudSecuritycenterV2Detection {
  /** The name of the binary associated with the memory hash signature detection. */
  binary?: string;
  /** The percentage of memory page hashes in the signature that were matched. */
  percentPagesMatched?: number;
}

export const GoogleCloudSecuritycenterV2Detection: Schema.Schema<GoogleCloudSecuritycenterV2Detection> = Schema.suspend(() => Schema.Struct({
  binary: Schema.optional(Schema.String),
  percentPagesMatched: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Detection" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Detection>;

export interface GoogleCloudSecuritycenterV2MemoryHashSignature {
  /** The binary family. */
  binaryFamily?: string;
  /** The list of memory hash detections contributing to the binary family match. */
  detections?: Array<GoogleCloudSecuritycenterV2Detection>;
}

export const GoogleCloudSecuritycenterV2MemoryHashSignature: Schema.Schema<GoogleCloudSecuritycenterV2MemoryHashSignature> = Schema.suspend(() => Schema.Struct({
  binaryFamily: Schema.optional(Schema.String),
  detections: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Detection)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2MemoryHashSignature" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2MemoryHashSignature>;

export interface GoogleCloudSecuritycenterV2YaraRuleSignature {
  /** The name of the YARA rule. */
  yaraRule?: string;
}

export const GoogleCloudSecuritycenterV2YaraRuleSignature: Schema.Schema<GoogleCloudSecuritycenterV2YaraRuleSignature> = Schema.suspend(() => Schema.Struct({
  yaraRule: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2YaraRuleSignature" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2YaraRuleSignature>;

export interface GoogleCloudSecuritycenterV2ProcessSignature {
  /** Signature indicating that a binary family was matched. */
  memoryHashSignature?: GoogleCloudSecuritycenterV2MemoryHashSignature;
  /** Signature indicating that a YARA rule was matched. */
  yaraRuleSignature?: GoogleCloudSecuritycenterV2YaraRuleSignature;
  /** Describes the type of resource associated with the signature. */
  signatureType?: "SIGNATURE_TYPE_UNSPECIFIED" | "SIGNATURE_TYPE_PROCESS" | "SIGNATURE_TYPE_FILE" | (string & {});
}

export const GoogleCloudSecuritycenterV2ProcessSignature: Schema.Schema<GoogleCloudSecuritycenterV2ProcessSignature> = Schema.suspend(() => Schema.Struct({
  memoryHashSignature: Schema.optional(GoogleCloudSecuritycenterV2MemoryHashSignature),
  yaraRuleSignature: Schema.optional(GoogleCloudSecuritycenterV2YaraRuleSignature),
  signatureType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ProcessSignature" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ProcessSignature>;

export interface GoogleCloudSecuritycenterV2Indicator {
  /** The list of IP addresses that are associated with the finding. */
  ipAddresses?: Array<string>;
  /** List of domains associated to the Finding. */
  domains?: Array<string>;
  /** The list of matched signatures indicating that the given process is present in the environment. */
  signatures?: Array<GoogleCloudSecuritycenterV2ProcessSignature>;
  /** The list of URIs associated to the Findings. */
  uris?: Array<string>;
}

export const GoogleCloudSecuritycenterV2Indicator: Schema.Schema<GoogleCloudSecuritycenterV2Indicator> = Schema.suspend(() => Schema.Struct({
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  domains: Schema.optional(Schema.Array(Schema.String)),
  signatures: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ProcessSignature)),
  uris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Indicator" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Indicator>;

export interface GoogleCloudSecuritycenterV2Reference {
  /** Source of the reference e.g. NVD */
  source?: string;
  /** Uri for the mentioned source e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527. */
  uri?: string;
}

export const GoogleCloudSecuritycenterV2Reference: Schema.Schema<GoogleCloudSecuritycenterV2Reference> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Reference" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Reference>;

export interface GoogleCloudSecuritycenterV2Cvssv3 {
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. This metric reflects the context by which vulnerability exploitation is possible. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  /** This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability. */
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | (string & {});
  /** This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. */
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  /** This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. */
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
  /** The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. */
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  /** This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. */
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** This metric measures the impact to integrity of a successfully exploited vulnerability. */
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  /** This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. */
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
}

export const GoogleCloudSecuritycenterV2Cvssv3: Schema.Schema<GoogleCloudSecuritycenterV2Cvssv3> = Schema.suspend(() => Schema.Struct({
  baseScore: Schema.optional(Schema.Number),
  attackVector: Schema.optional(Schema.String),
  attackComplexity: Schema.optional(Schema.String),
  privilegesRequired: Schema.optional(Schema.String),
  userInteraction: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  confidentialityImpact: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  availabilityImpact: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Cvssv3" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Cvssv3>;

export interface GoogleCloudSecuritycenterV2Cve {
  /** The unique identifier for the vulnerability. e.g. CVE-2021-34527 */
  id?: string;
  /** Additional information about the CVE. e.g. https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527 */
  references?: Array<GoogleCloudSecuritycenterV2Reference>;
  /** Describe Common Vulnerability Scoring System specified at https://www.first.org/cvss/v3.1/specification-document */
  cvssv3?: GoogleCloudSecuritycenterV2Cvssv3;
  /** Whether upstream fix is available for the CVE. */
  upstreamFixAvailable?: boolean;
  /** The potential impact of the vulnerability if it was to be exploited. */
  impact?: "RISK_RATING_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The exploitation activity of the vulnerability in the wild. */
  exploitationActivity?: "EXPLOITATION_ACTIVITY_UNSPECIFIED" | "WIDE" | "CONFIRMED" | "AVAILABLE" | "ANTICIPATED" | "NO_KNOWN" | (string & {});
  /** Whether or not the vulnerability has been observed in the wild. */
  observedInTheWild?: boolean;
  /** Whether or not the vulnerability was zero day when the finding was published. */
  zeroDay?: boolean;
  /** Date the first publicly available exploit or PoC was released. */
  exploitReleaseDate?: string;
  /** Date of the earliest known exploitation. */
  firstExploitationDate?: string;
}

export const GoogleCloudSecuritycenterV2Cve: Schema.Schema<GoogleCloudSecuritycenterV2Cve> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Reference)),
  cvssv3: Schema.optional(GoogleCloudSecuritycenterV2Cvssv3),
  upstreamFixAvailable: Schema.optional(Schema.Boolean),
  impact: Schema.optional(Schema.String),
  exploitationActivity: Schema.optional(Schema.String),
  observedInTheWild: Schema.optional(Schema.Boolean),
  zeroDay: Schema.optional(Schema.Boolean),
  exploitReleaseDate: Schema.optional(Schema.String),
  firstExploitationDate: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Cve" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Cve>;

export interface GoogleCloudSecuritycenterV2Package {
  /** The name of the package where the vulnerability was detected. */
  packageName?: string;
  /** The CPE URI where the vulnerability was detected. */
  cpeUri?: string;
  /** Type of package, for example, os, maven, or go. */
  packageType?: string;
  /** The version of the package. */
  packageVersion?: string;
}

export const GoogleCloudSecuritycenterV2Package: Schema.Schema<GoogleCloudSecuritycenterV2Package> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  packageVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Package" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Package>;

export interface GoogleCloudSecuritycenterV2SecurityBulletin {
  /** ID of the bulletin corresponding to the vulnerability. */
  bulletinId?: string;
  /** Submission time of this Security Bulletin. */
  submissionTime?: string;
  /** This represents a version that the cluster receiving this notification should be upgraded to, based on its current version. For example, 1.15.0 */
  suggestedUpgradeVersion?: string;
}

export const GoogleCloudSecuritycenterV2SecurityBulletin: Schema.Schema<GoogleCloudSecuritycenterV2SecurityBulletin> = Schema.suspend(() => Schema.Struct({
  bulletinId: Schema.optional(Schema.String),
  submissionTime: Schema.optional(Schema.String),
  suggestedUpgradeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecurityBulletin" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecurityBulletin>;

export interface GoogleCloudSecuritycenterV2Cwe {
  /** The CWE identifier, e.g. CWE-94 */
  id?: string;
  /** Any reference to the details on the CWE, for example, https://cwe.mitre.org/data/definitions/94.html */
  references?: Array<GoogleCloudSecuritycenterV2Reference>;
}

export const GoogleCloudSecuritycenterV2Cwe: Schema.Schema<GoogleCloudSecuritycenterV2Cwe> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Reference)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Cwe" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Cwe>;

export interface GoogleCloudSecuritycenterV2Vulnerability {
  /** CVE stands for Common Vulnerabilities and Exposures (https://cve.mitre.org/about/) */
  cve?: GoogleCloudSecuritycenterV2Cve;
  /** The offending package is relevant to the finding. */
  offendingPackage?: GoogleCloudSecuritycenterV2Package;
  /** The fixed package is relevant to the finding. */
  fixedPackage?: GoogleCloudSecuritycenterV2Package;
  /** The security bulletin is relevant to this finding. */
  securityBulletin?: GoogleCloudSecuritycenterV2SecurityBulletin;
  /** Provider provided risk_score based on multiple factors. The higher the risk score, the more risky the vulnerability is. */
  providerRiskScore?: string;
  /** Represents whether the vulnerability is reachable (detected via static analysis) */
  reachable?: boolean;
  /** Represents one or more Common Weakness Enumeration (CWE) information on this vulnerability. */
  cwes?: Array<GoogleCloudSecuritycenterV2Cwe>;
}

export const GoogleCloudSecuritycenterV2Vulnerability: Schema.Schema<GoogleCloudSecuritycenterV2Vulnerability> = Schema.suspend(() => Schema.Struct({
  cve: Schema.optional(GoogleCloudSecuritycenterV2Cve),
  offendingPackage: Schema.optional(GoogleCloudSecuritycenterV2Package),
  fixedPackage: Schema.optional(GoogleCloudSecuritycenterV2Package),
  securityBulletin: Schema.optional(GoogleCloudSecuritycenterV2SecurityBulletin),
  providerRiskScore: Schema.optional(Schema.String),
  reachable: Schema.optional(Schema.Boolean),
  cwes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Cwe)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Vulnerability" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Vulnerability>;

export interface GoogleCloudSecuritycenterV2MitreAttack {
  /** The MITRE ATT&CK tactic most closely represented by this finding, if any. */
  primaryTactic?: "TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT" | (string & {});
  /** The MITRE ATT&CK technique most closely represented by this finding, if any. primary_techniques is a repeated field because there are multiple levels of MITRE ATT&CK techniques. If the technique most closely represented by this finding is a sub-technique (e.g. `SCANNING_IP_BLOCKS`), both the sub-technique and its parent technique(s) will be listed (e.g. `SCANNING_IP_BLOCKS`, `ACTIVE_SCANNING`). */
  primaryTechniques?: Array<"TECHNIQUE_UNSPECIFIED" | "DATA_OBFUSCATION" | "DATA_OBFUSCATION_STEGANOGRAPHY" | "OS_CREDENTIAL_DUMPING" | "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM" | "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW" | "DATA_FROM_LOCAL_SYSTEM" | "AUTOMATED_EXFILTRATION" | "OBFUSCATED_FILES_OR_INFO" | "STEGANOGRAPHY" | "COMPILE_AFTER_DELIVERY" | "COMMAND_OBFUSCATION" | "SCHEDULED_TRANSFER" | "SYSTEM_OWNER_USER_DISCOVERY" | "MASQUERADING" | "MATCH_LEGITIMATE_NAME_OR_LOCATION" | "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS" | "STARTUP_ITEMS" | "NETWORK_SERVICE_DISCOVERY" | "SCHEDULED_TASK_JOB" | "SCHEDULED_TASK_JOB_CRON" | "CONTAINER_ORCHESTRATION_JOB" | "PROCESS_INJECTION" | "INPUT_CAPTURE" | "INPUT_CAPTURE_KEYLOGGING" | "PROCESS_DISCOVERY" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "PYTHON" | "EXPLOITATION_FOR_PRIVILEGE_ESCALATION" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "INDICATOR_REMOVAL" | "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS" | "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY" | "INDICATOR_REMOVAL_FILE_DELETION" | "INDICATOR_REMOVAL_TIMESTOMP" | "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA" | "APPLICATION_LAYER_PROTOCOL" | "DNS" | "SOFTWARE_DEPLOYMENT_TOOLS" | "VALID_ACCOUNTS" | "DEFAULT_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "FILE_AND_DIRECTORY_DISCOVERY" | "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "ACCOUNT_MANIPULATION" | "ADDITIONAL_CLOUD_CREDENTIALS" | "ADDITIONAL_CLOUD_ROLES" | "SSH_AUTHORIZED_KEYS" | "ADDITIONAL_CONTAINER_CLUSTER_ROLES" | "MULTI_STAGE_CHANNELS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "BRUTE_FORCE" | "AUTOMATED_COLLECTION" | "SHARED_MODULES" | "DATA_ENCODING" | "STANDARD_ENCODING" | "ACCESS_TOKEN_MANIPULATION" | "TOKEN_IMPERSONATION_OR_THEFT" | "CREATE_ACCOUNT" | "LOCAL_ACCOUNT" | "DEOBFUSCATE_DECODE_FILES_OR_INFO" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "SUPPLY_CHAIN_COMPROMISE" | "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS" | "EXPLOITATION_FOR_CLIENT_EXECUTION" | "USER_EXECUTION" | "EXPLOITATION_FOR_CREDENTIAL_ACCESS" | "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION" | "DOMAIN_POLICY_MODIFICATION" | "DATA_DESTRUCTION" | "DATA_ENCRYPTED_FOR_IMPACT" | "SERVICE_STOP" | "INHIBIT_SYSTEM_RECOVERY" | "FIRMWARE_CORRUPTION" | "RESOURCE_HIJACKING" | "NETWORK_DENIAL_OF_SERVICE" | "CLOUD_SERVICE_DISCOVERY" | "STEAL_APPLICATION_ACCESS_TOKEN" | "ACCOUNT_ACCESS_REMOVAL" | "TRANSFER_DATA_TO_CLOUD_ACCOUNT" | "STEAL_WEB_SESSION_COOKIE" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "EVENT_TRIGGERED_EXECUTION" | "BOOT_OR_LOGON_AUTOSTART_EXECUTION" | "KERNEL_MODULES_AND_EXTENSIONS" | "SHORTCUT_MODIFICATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING" | "UNSECURED_CREDENTIALS" | "CREDENTIALS_IN_FILES" | "BASH_HISTORY" | "PRIVATE_KEYS" | "SUBVERT_TRUST_CONTROL" | "INSTALL_ROOT_CERTIFICATE" | "COMPROMISE_HOST_SOFTWARE_BINARY" | "CREDENTIALS_FROM_PASSWORD_STORES" | "MODIFY_AUTHENTICATION_PROCESS" | "PLUGGABLE_AUTHENTICATION_MODULES" | "MULTI_FACTOR_AUTHENTICATION" | "IMPAIR_DEFENSES" | "DISABLE_OR_MODIFY_TOOLS" | "INDICATOR_BLOCKING" | "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM" | "HIDE_ARTIFACTS" | "HIDDEN_FILES_AND_DIRECTORIES" | "HIDDEN_USERS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "DYNAMIC_RESOLUTION" | "LATERAL_TOOL_TRANSFER" | "HIJACK_EXECUTION_FLOW" | "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "CREATE_SNAPSHOT" | "CLOUD_INFRASTRUCTURE_DISCOVERY" | "DEVELOP_CAPABILITIES" | "DEVELOP_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES" | "OBTAIN_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES_VULNERABILITIES" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "STAGE_CAPABILITIES" | "UPLOAD_MALWARE" | "CONTAINER_ADMINISTRATION_COMMAND" | "DEPLOY_CONTAINER" | "ESCAPE_TO_HOST" | "CONTAINER_AND_RESOURCE_DISCOVERY" | "REFLECTIVE_CODE_LOADING" | "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES" | "FINANCIAL_THEFT" | (string & {})>;
  /** Additional MITRE ATT&CK tactics related to this finding, if any. */
  additionalTactics?: Array<"TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT" | (string & {})>;
  /** Additional MITRE ATT&CK techniques related to this finding, if any, along with any of their respective parent techniques. */
  additionalTechniques?: Array<"TECHNIQUE_UNSPECIFIED" | "DATA_OBFUSCATION" | "DATA_OBFUSCATION_STEGANOGRAPHY" | "OS_CREDENTIAL_DUMPING" | "OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM" | "OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW" | "DATA_FROM_LOCAL_SYSTEM" | "AUTOMATED_EXFILTRATION" | "OBFUSCATED_FILES_OR_INFO" | "STEGANOGRAPHY" | "COMPILE_AFTER_DELIVERY" | "COMMAND_OBFUSCATION" | "SCHEDULED_TRANSFER" | "SYSTEM_OWNER_USER_DISCOVERY" | "MASQUERADING" | "MATCH_LEGITIMATE_NAME_OR_LOCATION" | "BOOT_OR_LOGON_INITIALIZATION_SCRIPTS" | "STARTUP_ITEMS" | "NETWORK_SERVICE_DISCOVERY" | "SCHEDULED_TASK_JOB" | "SCHEDULED_TASK_JOB_CRON" | "CONTAINER_ORCHESTRATION_JOB" | "PROCESS_INJECTION" | "INPUT_CAPTURE" | "INPUT_CAPTURE_KEYLOGGING" | "PROCESS_DISCOVERY" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "PYTHON" | "EXPLOITATION_FOR_PRIVILEGE_ESCALATION" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "INDICATOR_REMOVAL" | "INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS" | "INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY" | "INDICATOR_REMOVAL_FILE_DELETION" | "INDICATOR_REMOVAL_TIMESTOMP" | "INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA" | "APPLICATION_LAYER_PROTOCOL" | "DNS" | "SOFTWARE_DEPLOYMENT_TOOLS" | "VALID_ACCOUNTS" | "DEFAULT_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "FILE_AND_DIRECTORY_DISCOVERY" | "ACCOUNT_DISCOVERY_LOCAL_ACCOUNT" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "ACCOUNT_MANIPULATION" | "ADDITIONAL_CLOUD_CREDENTIALS" | "ADDITIONAL_CLOUD_ROLES" | "SSH_AUTHORIZED_KEYS" | "ADDITIONAL_CONTAINER_CLUSTER_ROLES" | "MULTI_STAGE_CHANNELS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "BRUTE_FORCE" | "AUTOMATED_COLLECTION" | "SHARED_MODULES" | "DATA_ENCODING" | "STANDARD_ENCODING" | "ACCESS_TOKEN_MANIPULATION" | "TOKEN_IMPERSONATION_OR_THEFT" | "CREATE_ACCOUNT" | "LOCAL_ACCOUNT" | "DEOBFUSCATE_DECODE_FILES_OR_INFO" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "SUPPLY_CHAIN_COMPROMISE" | "COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS" | "EXPLOITATION_FOR_CLIENT_EXECUTION" | "USER_EXECUTION" | "EXPLOITATION_FOR_CREDENTIAL_ACCESS" | "LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION" | "DOMAIN_POLICY_MODIFICATION" | "DATA_DESTRUCTION" | "DATA_ENCRYPTED_FOR_IMPACT" | "SERVICE_STOP" | "INHIBIT_SYSTEM_RECOVERY" | "FIRMWARE_CORRUPTION" | "RESOURCE_HIJACKING" | "NETWORK_DENIAL_OF_SERVICE" | "CLOUD_SERVICE_DISCOVERY" | "STEAL_APPLICATION_ACCESS_TOKEN" | "ACCOUNT_ACCESS_REMOVAL" | "TRANSFER_DATA_TO_CLOUD_ACCOUNT" | "STEAL_WEB_SESSION_COOKIE" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "EVENT_TRIGGERED_EXECUTION" | "BOOT_OR_LOGON_AUTOSTART_EXECUTION" | "KERNEL_MODULES_AND_EXTENSIONS" | "SHORTCUT_MODIFICATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID" | "ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING" | "UNSECURED_CREDENTIALS" | "CREDENTIALS_IN_FILES" | "BASH_HISTORY" | "PRIVATE_KEYS" | "SUBVERT_TRUST_CONTROL" | "INSTALL_ROOT_CERTIFICATE" | "COMPROMISE_HOST_SOFTWARE_BINARY" | "CREDENTIALS_FROM_PASSWORD_STORES" | "MODIFY_AUTHENTICATION_PROCESS" | "PLUGGABLE_AUTHENTICATION_MODULES" | "MULTI_FACTOR_AUTHENTICATION" | "IMPAIR_DEFENSES" | "DISABLE_OR_MODIFY_TOOLS" | "INDICATOR_BLOCKING" | "DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM" | "HIDE_ARTIFACTS" | "HIDDEN_FILES_AND_DIRECTORIES" | "HIDDEN_USERS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "DYNAMIC_RESOLUTION" | "LATERAL_TOOL_TRANSFER" | "HIJACK_EXECUTION_FLOW" | "HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "CREATE_SNAPSHOT" | "CLOUD_INFRASTRUCTURE_DISCOVERY" | "DEVELOP_CAPABILITIES" | "DEVELOP_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES" | "OBTAIN_CAPABILITIES_MALWARE" | "OBTAIN_CAPABILITIES_VULNERABILITIES" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "STAGE_CAPABILITIES" | "UPLOAD_MALWARE" | "CONTAINER_ADMINISTRATION_COMMAND" | "DEPLOY_CONTAINER" | "ESCAPE_TO_HOST" | "CONTAINER_AND_RESOURCE_DISCOVERY" | "REFLECTIVE_CODE_LOADING" | "STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES" | "FINANCIAL_THEFT" | (string & {})>;
  /** The MITRE ATT&CK version referenced by the above fields. E.g. "8". */
  version?: string;
}

export const GoogleCloudSecuritycenterV2MitreAttack: Schema.Schema<GoogleCloudSecuritycenterV2MitreAttack> = Schema.suspend(() => Schema.Struct({
  primaryTactic: Schema.optional(Schema.String),
  primaryTechniques: Schema.optional(Schema.Array(Schema.String)),
  additionalTactics: Schema.optional(Schema.Array(Schema.String)),
  additionalTechniques: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2MitreAttack" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2MitreAttack>;

export interface GoogleCloudSecuritycenterV2Geolocation {
  /** A CLDR. */
  regionCode?: string;
}

export const GoogleCloudSecuritycenterV2Geolocation: Schema.Schema<GoogleCloudSecuritycenterV2Geolocation> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Geolocation" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Geolocation>;

export interface GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo {
  /** The email address of a Google account. */
  principalEmail?: string;
  /** A string representing the principal_subject associated with the identity. As compared to `principal_email`, supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subjects/{subject}` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` */
  principalSubject?: string;
}

export const GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo: Schema.Schema<GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo> = Schema.suspend(() => Schema.Struct({
  principalEmail: Schema.optional(Schema.String),
  principalSubject: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo>;

export interface GoogleCloudSecuritycenterV2Access {
  /** Associated email, such as "foo@google.com". The email address of the authenticated user or a service account acting on behalf of a third party principal making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id). */
  principalEmail?: string;
  /** Caller's IP address, such as "1.1.1.1". */
  callerIp?: string;
  /** The caller IP's geolocation, which identifies where the call came from. */
  callerIpGeo?: GoogleCloudSecuritycenterV2Geolocation;
  /** Type of user agent associated with the finding. For example, an operating system shell or an embedded or standalone application. */
  userAgentFamily?: string;
  /** The caller's user agent string associated with the finding. */
  userAgent?: string;
  /** This is the API service that the service account made a call to, e.g. "iam.googleapis.com" */
  serviceName?: string;
  /** The method that the service account called, e.g. "SetIamPolicy". */
  methodName?: string;
  /** A string that represents the principal_subject that is associated with the identity. Unlike `principal_email`, `principal_subject` supports principals that aren't associated with email addresses, such as third party principals. For most identities, the format is `principal://iam.googleapis.com/{identity pool name}/subject/{subject}`. Some GKE identities, such as GKE_WORKLOAD, FREEFORM, and GKE_HUB_WORKLOAD, still use the legacy format `serviceAccount:{identity pool name}[{subject}]`. */
  principalSubject?: string;
  /** The name of the service account key that was used to create or exchange credentials when authenticating the service account that made the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}". */
  serviceAccountKeyName?: string;
  /** The identity delegation history of an authenticated service account that made the request. The `serviceAccountDelegationInfo[]` object contains information about the real authorities that try to access Google Cloud resources by delegating on a service account. When multiple authorities are present, they are guaranteed to be sorted based on the original ordering of the identity delegation events. */
  serviceAccountDelegationInfo?: Array<GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo>;
  /** A string that represents a username. The username provided depends on the type of the finding and is likely not an IAM principal. For example, this can be a system username if the finding is related to a virtual machine, or it can be an application login username. */
  userName?: string;
}

export const GoogleCloudSecuritycenterV2Access: Schema.Schema<GoogleCloudSecuritycenterV2Access> = Schema.suspend(() => Schema.Struct({
  principalEmail: Schema.optional(Schema.String),
  callerIp: Schema.optional(Schema.String),
  callerIpGeo: Schema.optional(GoogleCloudSecuritycenterV2Geolocation),
  userAgentFamily: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  methodName: Schema.optional(Schema.String),
  principalSubject: Schema.optional(Schema.String),
  serviceAccountKeyName: Schema.optional(Schema.String),
  serviceAccountDelegationInfo: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo)),
  userName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Access" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Access>;

export interface GoogleCloudSecuritycenterV2Connection {
  /** Destination IP address. Not present for sockets that are listening and not connected. */
  destinationIp?: string;
  /** Destination port. Not present for sockets that are listening and not connected. */
  destinationPort?: number;
  /** Source IP address. */
  sourceIp?: string;
  /** Source port. */
  sourcePort?: number;
  /** IANA Internet Protocol Number such as TCP(6) and UDP(17). */
  protocol?: "PROTOCOL_UNSPECIFIED" | "ICMP" | "TCP" | "UDP" | "GRE" | "ESP" | (string & {});
}

export const GoogleCloudSecuritycenterV2Connection: Schema.Schema<GoogleCloudSecuritycenterV2Connection> = Schema.suspend(() => Schema.Struct({
  destinationIp: Schema.optional(Schema.String),
  destinationPort: Schema.optional(Schema.Number),
  sourceIp: Schema.optional(Schema.String),
  sourcePort: Schema.optional(Schema.Number),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Connection" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Connection>;

export interface GoogleCloudSecuritycenterV2DiskPath {
  /** UUID of the partition (format https://wiki.archlinux.org/title/persistent_block_device_naming#by-uuid) */
  partitionUuid?: string;
  /** Relative path of the file in the partition as a JSON encoded string. Example: /home/user1/executable_file.sh */
  relativePath?: string;
}

export const GoogleCloudSecuritycenterV2DiskPath: Schema.Schema<GoogleCloudSecuritycenterV2DiskPath> = Schema.suspend(() => Schema.Struct({
  partitionUuid: Schema.optional(Schema.String),
  relativePath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2DiskPath" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2DiskPath>;

export interface GoogleCloudSecuritycenterV2FileOperation {
  /** The type of the operation */
  type?: "OPERATION_TYPE_UNSPECIFIED" | "OPEN" | "READ" | "RENAME" | "WRITE" | "EXECUTE" | (string & {});
}

export const GoogleCloudSecuritycenterV2FileOperation: Schema.Schema<GoogleCloudSecuritycenterV2FileOperation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2FileOperation" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2FileOperation>;

export interface GoogleCloudSecuritycenterV2File {
  /** Absolute path of the file as a JSON encoded string. */
  path?: string;
  /** Size of the file in bytes. */
  size?: string;
  /** SHA256 hash of the first hashed_size bytes of the file encoded as a hex string. If hashed_size == size, sha256 represents the SHA256 hash of the entire file. */
  sha256?: string;
  /** The length in bytes of the file prefix that was hashed. If hashed_size == size, any hashes reported represent the entire file. */
  hashedSize?: string;
  /** True when the hash covers only a prefix of the file. */
  partiallyHashed?: boolean;
  /** Prefix of the file contents as a JSON-encoded string. */
  contents?: string;
  /** Path of the file in terms of underlying disk/partition identifiers. */
  diskPath?: GoogleCloudSecuritycenterV2DiskPath;
  /** Operation(s) performed on a file. */
  operations?: Array<GoogleCloudSecuritycenterV2FileOperation>;
  /** The load state of the file. */
  fileLoadState?: "FILE_LOAD_STATE_UNSPECIFIED" | "LOADED_BY_PROCESS" | "NOT_LOADED_BY_PROCESS" | (string & {});
}

export const GoogleCloudSecuritycenterV2File: Schema.Schema<GoogleCloudSecuritycenterV2File> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  sha256: Schema.optional(Schema.String),
  hashedSize: Schema.optional(Schema.String),
  partiallyHashed: Schema.optional(Schema.Boolean),
  contents: Schema.optional(Schema.String),
  diskPath: Schema.optional(GoogleCloudSecuritycenterV2DiskPath),
  operations: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2FileOperation)),
  fileLoadState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2File" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2File>;

export interface GoogleCloudSecuritycenterV2EnvironmentVariable {
  /** Environment variable name as a JSON encoded string. */
  name?: string;
  /** Environment variable value as a JSON encoded string. */
  val?: string;
}

export const GoogleCloudSecuritycenterV2EnvironmentVariable: Schema.Schema<GoogleCloudSecuritycenterV2EnvironmentVariable> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  val: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2EnvironmentVariable" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2EnvironmentVariable>;

export interface GoogleCloudSecuritycenterV2Process {
  /** The process name, as displayed in utilities like `top` and `ps`. This name can be accessed through `/proc/[pid]/comm` and changed with `prctl(PR_SET_NAME)`. */
  name?: string;
  /** File information for the process executable. */
  binary?: GoogleCloudSecuritycenterV2File;
  /** File information for libraries loaded by the process. */
  libraries?: Array<GoogleCloudSecuritycenterV2File>;
  /** When the process represents the invocation of a script, `binary` provides information about the interpreter, while `script` provides information about the script file provided to the interpreter. */
  script?: GoogleCloudSecuritycenterV2File;
  /** Process arguments as JSON encoded strings. */
  args?: Array<string>;
  /** True if `args` is incomplete. */
  argumentsTruncated?: boolean;
  /** Process environment variables. */
  envVariables?: Array<GoogleCloudSecuritycenterV2EnvironmentVariable>;
  /** True if `env_variables` is incomplete. */
  envVariablesTruncated?: boolean;
  /** The process ID. */
  pid?: string;
  /** The parent process ID. */
  parentPid?: string;
  /** The ID of the user that executed the process. E.g. If this is the root user this will always be 0. */
  userId?: string;
}

export const GoogleCloudSecuritycenterV2Process: Schema.Schema<GoogleCloudSecuritycenterV2Process> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  binary: Schema.optional(GoogleCloudSecuritycenterV2File),
  libraries: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2File)),
  script: Schema.optional(GoogleCloudSecuritycenterV2File),
  args: Schema.optional(Schema.Array(Schema.String)),
  argumentsTruncated: Schema.optional(Schema.Boolean),
  envVariables: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2EnvironmentVariable)),
  envVariablesTruncated: Schema.optional(Schema.Boolean),
  pid: Schema.optional(Schema.String),
  parentPid: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Process" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Process>;

export interface GoogleCloudSecuritycenterV2Contact {
  /** An email address. For example, "`person123@company.com`". */
  email?: string;
}

export const GoogleCloudSecuritycenterV2Contact: Schema.Schema<GoogleCloudSecuritycenterV2Contact> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Contact" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Contact>;

export interface GoogleCloudSecuritycenterV2ContactDetails {
  /** A list of contacts */
  contacts?: Array<GoogleCloudSecuritycenterV2Contact>;
}

export const GoogleCloudSecuritycenterV2ContactDetails: Schema.Schema<GoogleCloudSecuritycenterV2ContactDetails> = Schema.suspend(() => Schema.Struct({
  contacts: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Contact)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ContactDetails" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ContactDetails>;

export interface GoogleCloudSecuritycenterV2Compliance {
  /** Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP. */
  standard?: string;
  /** Version of the standard or benchmark, for example, 1.1 */
  version?: string;
  /** Policies within the standard or benchmark, for example, A.12.4.1 */
  ids?: Array<string>;
}

export const GoogleCloudSecuritycenterV2Compliance: Schema.Schema<GoogleCloudSecuritycenterV2Compliance> = Schema.suspend(() => Schema.Struct({
  standard: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Compliance" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Compliance>;

export interface GoogleCloudSecuritycenterV2ExfilResource {
  /** The resource's [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name). */
  name?: string;
  /** Subcomponents of the asset that was exfiltrated, like URIs used during exfiltration, table names, databases, and filenames. For example, multiple tables might have been exfiltrated from the same Cloud SQL instance, or multiple files might have been exfiltrated from the same Cloud Storage bucket. */
  components?: Array<string>;
}

export const GoogleCloudSecuritycenterV2ExfilResource: Schema.Schema<GoogleCloudSecuritycenterV2ExfilResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  components: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ExfilResource" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ExfilResource>;

export interface GoogleCloudSecuritycenterV2Exfiltration {
  /** If there are multiple sources, then the data is considered "joined" between them. For instance, BigQuery can join multiple tables, and each table would be considered a source. */
  sources?: Array<GoogleCloudSecuritycenterV2ExfilResource>;
  /** If there are multiple targets, each target would get a complete copy of the "joined" source data. */
  targets?: Array<GoogleCloudSecuritycenterV2ExfilResource>;
  /** Total exfiltrated bytes processed for the entire job. */
  totalExfiltratedBytes?: string;
}

export const GoogleCloudSecuritycenterV2Exfiltration: Schema.Schema<GoogleCloudSecuritycenterV2Exfiltration> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ExfilResource)),
  targets: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ExfilResource)),
  totalExfiltratedBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Exfiltration" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Exfiltration>;

export interface GoogleCloudSecuritycenterV2IamBinding {
  /** The action that was performed on a Binding. */
  action?: "ACTION_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** Role that is assigned to "members". For example, "roles/viewer", "roles/editor", or "roles/owner". */
  role?: string;
  /** A single identity requesting access for a Cloud Platform resource, for example, "foo@google.com". */
  member?: string;
}

export const GoogleCloudSecuritycenterV2IamBinding: Schema.Schema<GoogleCloudSecuritycenterV2IamBinding> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  member: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IamBinding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IamBinding>;

export interface GoogleCloudSecuritycenterV2Label {
  /** Name of the label. */
  name?: string;
  /** Value that corresponds to the label's name. */
  value?: string;
}

export const GoogleCloudSecuritycenterV2Label: Schema.Schema<GoogleCloudSecuritycenterV2Label> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Label" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Label>;

export interface GoogleCloudSecuritycenterV2Container {
  /** Name of the container. */
  name?: string;
  /** Container image URI provided when configuring a pod or container. This string can identify a container image version using mutable tags. */
  uri?: string;
  /** Optional container image ID, if provided by the container runtime. Uniquely identifies the container image launched using a container image digest. */
  imageId?: string;
  /** Container labels, as provided by the container runtime. */
  labels?: Array<GoogleCloudSecuritycenterV2Label>;
  /** The time that the container was created. */
  createTime?: string;
}

export const GoogleCloudSecuritycenterV2Container: Schema.Schema<GoogleCloudSecuritycenterV2Container> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  imageId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Label)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Container" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Container>;

export interface GoogleCloudSecuritycenterV2Pod {
  /** Kubernetes Pod namespace. */
  ns?: string;
  /** Kubernetes Pod name. */
  name?: string;
  /** Pod labels. For Kubernetes containers, these are applied to the container. */
  labels?: Array<GoogleCloudSecuritycenterV2Label>;
  /** Pod containers associated with this finding, if any. */
  containers?: Array<GoogleCloudSecuritycenterV2Container>;
}

export const GoogleCloudSecuritycenterV2Pod: Schema.Schema<GoogleCloudSecuritycenterV2Pod> = Schema.suspend(() => Schema.Struct({
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Label)),
  containers: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Container)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Pod" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Pod>;

export interface GoogleCloudSecuritycenterV2Node {
  /** [Full resource name](https://google.aip.dev/122#full-resource-names) of the Compute Engine VM running the cluster node. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2Node: Schema.Schema<GoogleCloudSecuritycenterV2Node> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Node" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Node>;

export interface GoogleCloudSecuritycenterV2NodePool {
  /** Kubernetes node pool name. */
  name?: string;
  /** Nodes associated with the finding. */
  nodes?: Array<GoogleCloudSecuritycenterV2Node>;
}

export const GoogleCloudSecuritycenterV2NodePool: Schema.Schema<GoogleCloudSecuritycenterV2NodePool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  nodes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Node)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2NodePool" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2NodePool>;

export interface GoogleCloudSecuritycenterV2Role {
  /** Role type. */
  kind?: "KIND_UNSPECIFIED" | "ROLE" | "CLUSTER_ROLE" | (string & {});
  /** Role namespace. */
  ns?: string;
  /** Role name. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2Role: Schema.Schema<GoogleCloudSecuritycenterV2Role> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Role" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Role>;

export interface GoogleCloudSecuritycenterV2Subject {
  /** Authentication type for the subject. */
  kind?: "AUTH_TYPE_UNSPECIFIED" | "USER" | "SERVICEACCOUNT" | "GROUP" | (string & {});
  /** Namespace for the subject. */
  ns?: string;
  /** Name for the subject. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2Subject: Schema.Schema<GoogleCloudSecuritycenterV2Subject> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Subject" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Subject>;

export interface GoogleCloudSecuritycenterV2Binding {
  /** Namespace for the binding. */
  ns?: string;
  /** Name for the binding. */
  name?: string;
  /** The Role or ClusterRole referenced by the binding. */
  role?: GoogleCloudSecuritycenterV2Role;
  /** Represents one or more subjects that are bound to the role. Not always available for PATCH requests. */
  subjects?: Array<GoogleCloudSecuritycenterV2Subject>;
}

export const GoogleCloudSecuritycenterV2Binding: Schema.Schema<GoogleCloudSecuritycenterV2Binding> = Schema.suspend(() => Schema.Struct({
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  role: Schema.optional(GoogleCloudSecuritycenterV2Role),
  subjects: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Subject)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Binding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Binding>;

export interface GoogleCloudSecuritycenterV2AccessReview {
  /** The API group of the resource. "*" means all. */
  group?: string;
  /** Namespace of the action being requested. Currently, there is no distinction between no namespace and all namespaces. Both are represented by "" (empty). */
  ns?: string;
  /** The name of the resource being requested. Empty means all. */
  name?: string;
  /** The optional resource type requested. "*" means all. */
  resource?: string;
  /** The optional subresource type. */
  subresource?: string;
  /** A Kubernetes resource API verb, like get, list, watch, create, update, delete, proxy. "*" means all. */
  verb?: string;
  /** The API version of the resource. "*" means all. */
  version?: string;
}

export const GoogleCloudSecuritycenterV2AccessReview: Schema.Schema<GoogleCloudSecuritycenterV2AccessReview> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  subresource: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AccessReview" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AccessReview>;

export interface GoogleCloudSecuritycenterV2Object {
  /** Kubernetes object group, such as "policy.k8s.io/v1". */
  group?: string;
  /** Kubernetes object kind, such as "Namespace". */
  kind?: string;
  /** Kubernetes object namespace. Must be a valid DNS label. Named "ns" to avoid collision with C++ namespace keyword. For details see https://kubernetes.io/docs/tasks/administer-cluster/namespaces/. */
  ns?: string;
  /** Kubernetes object name. For details see https://kubernetes.io/docs/concepts/overview/working-with-objects/names/. */
  name?: string;
  /** Pod containers associated with this finding, if any. */
  containers?: Array<GoogleCloudSecuritycenterV2Container>;
}

export const GoogleCloudSecuritycenterV2Object: Schema.Schema<GoogleCloudSecuritycenterV2Object> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  ns: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Container)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Object" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Object>;

export interface GoogleCloudSecuritycenterV2Kubernetes {
  /** Kubernetes [Pods](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) associated with the finding. This field contains Pod records for each container that is owned by a Pod. */
  pods?: Array<GoogleCloudSecuritycenterV2Pod>;
  /** Provides Kubernetes [node](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture#nodes) information. */
  nodes?: Array<GoogleCloudSecuritycenterV2Node>;
  /** GKE [node pools](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools) associated with the finding. This field contains node pool information for each node, when it is available. */
  nodePools?: Array<GoogleCloudSecuritycenterV2NodePool>;
  /** Provides Kubernetes role information for findings that involve [Roles or ClusterRoles](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control). */
  roles?: Array<GoogleCloudSecuritycenterV2Role>;
  /** Provides Kubernetes role binding information for findings that involve [RoleBindings or ClusterRoleBindings](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control). */
  bindings?: Array<GoogleCloudSecuritycenterV2Binding>;
  /** Provides information on any Kubernetes access reviews (privilege checks) relevant to the finding. */
  accessReviews?: Array<GoogleCloudSecuritycenterV2AccessReview>;
  /** Kubernetes objects related to the finding. */
  objects?: Array<GoogleCloudSecuritycenterV2Object>;
}

export const GoogleCloudSecuritycenterV2Kubernetes: Schema.Schema<GoogleCloudSecuritycenterV2Kubernetes> = Schema.suspend(() => Schema.Struct({
  pods: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Pod)),
  nodes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Node)),
  nodePools: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2NodePool)),
  roles: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Role)),
  bindings: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Binding)),
  accessReviews: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2AccessReview)),
  objects: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Object)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Kubernetes" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Kubernetes>;

export interface GoogleCloudSecuritycenterV2Database {
  /** Some database resources may not have the [full resource name](https://google.aip.dev/122#full-resource-names) populated because these resource types are not yet supported by Cloud Asset Inventory (e.g. Cloud SQL databases). In these cases only the display name will be provided. The [full resource name](https://google.aip.dev/122#full-resource-names) of the database that the user connected to, if it is supported by Cloud Asset Inventory. */
  name?: string;
  /** The human-readable name of the database that the user connected to. */
  displayName?: string;
  /** The username used to connect to the database. The username might not be an IAM principal and does not have a set format. */
  userName?: string;
  /** The SQL statement that is associated with the database access. */
  query?: string;
  /** The target usernames, roles, or groups of an SQL privilege grant, which is not an IAM policy change. */
  grantees?: Array<string>;
  /** The version of the database, for example, POSTGRES_14. See [the complete list](https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/SqlDatabaseVersion). */
  version?: string;
}

export const GoogleCloudSecuritycenterV2Database: Schema.Schema<GoogleCloudSecuritycenterV2Database> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  userName: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  grantees: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Database" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Database>;

export interface GoogleCloudSecuritycenterV2AttackExposure {
  /** A number between 0 (inclusive) and infinity that represents how important this finding is to remediate. The higher the score, the more important it is to remediate. */
  score?: number;
  /** The most recent time the attack exposure was updated on this finding. */
  latestCalculationTime?: string;
  /** The resource name of the attack path simulation result that contains the details regarding this attack exposure score. Example: `organizations/123/simulations/456/attackExposureResults/789` */
  attackExposureResult?: string;
  /** Output only. What state this AttackExposure is in. This captures whether or not an attack exposure has been calculated or not. */
  state?: "STATE_UNSPECIFIED" | "CALCULATED" | "NOT_CALCULATED" | (string & {});
  /** The number of high value resources that are exposed as a result of this finding. */
  exposedHighValueResourcesCount?: number;
  /** The number of medium value resources that are exposed as a result of this finding. */
  exposedMediumValueResourcesCount?: number;
  /** The number of high value resources that are exposed as a result of this finding. */
  exposedLowValueResourcesCount?: number;
}

export const GoogleCloudSecuritycenterV2AttackExposure: Schema.Schema<GoogleCloudSecuritycenterV2AttackExposure> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  latestCalculationTime: Schema.optional(Schema.String),
  attackExposureResult: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  exposedHighValueResourcesCount: Schema.optional(Schema.Number),
  exposedMediumValueResourcesCount: Schema.optional(Schema.Number),
  exposedLowValueResourcesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AttackExposure" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AttackExposure>;

export interface GoogleCloudSecuritycenterV2CloudDlpInspection {
  /** Name of the inspection job, for example, `projects/123/locations/europe/dlpJobs/i-8383929`. */
  inspectJob?: string;
  /** The type of information (or *[infoType](https://cloud.google.com/dlp/docs/infotypes-reference)*) found, for example, `EMAIL_ADDRESS` or `STREET_ADDRESS`. */
  infoType?: string;
  /** The number of times Cloud DLP found this infoType within this job and resource. */
  infoTypeCount?: string;
  /** Whether Cloud DLP scanned the complete resource or a sampled subset. */
  fullScan?: boolean;
}

export const GoogleCloudSecuritycenterV2CloudDlpInspection: Schema.Schema<GoogleCloudSecuritycenterV2CloudDlpInspection> = Schema.suspend(() => Schema.Struct({
  inspectJob: Schema.optional(Schema.String),
  infoType: Schema.optional(Schema.String),
  infoTypeCount: Schema.optional(Schema.String),
  fullScan: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2CloudDlpInspection" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2CloudDlpInspection>;

export interface GoogleCloudSecuritycenterV2SensitivityScore {
  /** The sensitivity score applied to the resource. */
  score?: "SENSITIVITY_SCORE_LEVEL_UNSPECIFIED" | "SENSITIVITY_LOW" | "SENSITIVITY_UNKNOWN" | "SENSITIVITY_MODERATE" | "SENSITIVITY_HIGH" | (string & {});
}

export const GoogleCloudSecuritycenterV2SensitivityScore: Schema.Schema<GoogleCloudSecuritycenterV2SensitivityScore> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SensitivityScore" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SensitivityScore>;

export interface GoogleCloudSecuritycenterV2InfoType {
  /** Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`. */
  name?: string;
  /** Optional version name for this InfoType. */
  version?: string;
  /** Optional custom sensitivity for this InfoType. This only applies to data profiling. */
  sensitivityScore?: GoogleCloudSecuritycenterV2SensitivityScore;
}

export const GoogleCloudSecuritycenterV2InfoType: Schema.Schema<GoogleCloudSecuritycenterV2InfoType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GoogleCloudSecuritycenterV2SensitivityScore),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2InfoType" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2InfoType>;

export interface GoogleCloudSecuritycenterV2CloudDlpDataProfile {
  /** Name of the data profile, for example, `projects/123/locations/europe/tableProfiles/8383929`. */
  dataProfile?: string;
  /** The resource hierarchy level at which the data profile was generated. */
  parentType?: "PARENT_TYPE_UNSPECIFIED" | "ORGANIZATION" | "PROJECT" | (string & {});
  /** Type of information detected by SDP. Info type includes name, version and sensitivity of the detected information type. */
  infoTypes?: Array<GoogleCloudSecuritycenterV2InfoType>;
}

export const GoogleCloudSecuritycenterV2CloudDlpDataProfile: Schema.Schema<GoogleCloudSecuritycenterV2CloudDlpDataProfile> = Schema.suspend(() => Schema.Struct({
  dataProfile: Schema.optional(Schema.String),
  parentType: Schema.optional(Schema.String),
  infoTypes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2InfoType)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2CloudDlpDataProfile" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2CloudDlpDataProfile>;

export interface GoogleCloudSecuritycenterV2KernelRootkit {
  /** Rootkit name, when available. */
  name?: string;
  /** True if unexpected modifications of kernel code memory are present. */
  unexpectedCodeModification?: boolean;
  /** True if unexpected modifications of kernel read-only data memory are present. */
  unexpectedReadOnlyDataModification?: boolean;
  /** True if `ftrace` points are present with callbacks pointing to regions that are not in the expected kernel or module code range. */
  unexpectedFtraceHandler?: boolean;
  /** True if `kprobe` points are present with callbacks pointing to regions that are not in the expected kernel or module code range. */
  unexpectedKprobeHandler?: boolean;
  /** True if kernel code pages that are not in the expected kernel or module code regions are present. */
  unexpectedKernelCodePages?: boolean;
  /** True if system call handlers that are are not in the expected kernel or module code regions are present. */
  unexpectedSystemCallHandler?: boolean;
  /** True if interrupt handlers that are are not in the expected kernel or module code regions are present. */
  unexpectedInterruptHandler?: boolean;
  /** True if unexpected processes in the scheduler run queue are present. Such processes are in the run queue, but not in the process task list. */
  unexpectedProcessesInRunqueue?: boolean;
}

export const GoogleCloudSecuritycenterV2KernelRootkit: Schema.Schema<GoogleCloudSecuritycenterV2KernelRootkit> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  unexpectedCodeModification: Schema.optional(Schema.Boolean),
  unexpectedReadOnlyDataModification: Schema.optional(Schema.Boolean),
  unexpectedFtraceHandler: Schema.optional(Schema.Boolean),
  unexpectedKprobeHandler: Schema.optional(Schema.Boolean),
  unexpectedKernelCodePages: Schema.optional(Schema.Boolean),
  unexpectedSystemCallHandler: Schema.optional(Schema.Boolean),
  unexpectedInterruptHandler: Schema.optional(Schema.Boolean),
  unexpectedProcessesInRunqueue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2KernelRootkit" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2KernelRootkit>;

export interface GoogleCloudSecuritycenterV2OrgPolicy {
  /** Identifier. The resource name of the org policy. Example: "organizations/{organization_id}/policies/{constraint_name}" */
  name?: string;
}

export const GoogleCloudSecuritycenterV2OrgPolicy: Schema.Schema<GoogleCloudSecuritycenterV2OrgPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2OrgPolicy" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2OrgPolicy>;

export interface GoogleCloudSecuritycenterV2Job {
  /** The fully-qualified name for a job. e.g. `projects//jobs/` */
  name?: string;
  /** Output only. State of the job, such as `RUNNING` or `PENDING`. */
  state?: "JOB_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Optional. If the job did not complete successfully, this field describes why. */
  errorCode?: number;
  /** Optional. Gives the location where the job ran, such as `US` or `europe-west1` */
  location?: string;
}

export const GoogleCloudSecuritycenterV2Job: Schema.Schema<GoogleCloudSecuritycenterV2Job> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.Number),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Job" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Job>;

export interface GoogleCloudSecuritycenterV2Application {
  /** The base URI that identifies the network location of the application in which the vulnerability was detected. For example, `http://example.com`. */
  baseUri?: string;
  /** The full URI with payload that could be used to reproduce the vulnerability. For example, `http://example.com?p=aMmYgI6H`. */
  fullUri?: string;
}

export const GoogleCloudSecuritycenterV2Application: Schema.Schema<GoogleCloudSecuritycenterV2Application> = Schema.suspend(() => Schema.Struct({
  baseUri: Schema.optional(Schema.String),
  fullUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Application" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Application>;

export interface GoogleCloudSecuritycenterV2PortRange {
  /** Minimum port value. */
  min?: string;
  /** Maximum port value. */
  max?: string;
}

export const GoogleCloudSecuritycenterV2PortRange: Schema.Schema<GoogleCloudSecuritycenterV2PortRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.String),
  max: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2PortRange" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2PortRange>;

export interface GoogleCloudSecuritycenterV2IpRule {
  /** The IP protocol this rule applies to. This value can either be one of the following well known protocol strings (TCP, UDP, ICMP, ESP, AH, IPIP, SCTP) or a string representation of the integer value. */
  protocol?: string;
  /** Optional. An optional list of ports to which this rule applies. This field is only applicable for the UDP or (S)TCP protocols. Each entry must be either an integer or a range including a min and max port number. */
  portRanges?: Array<GoogleCloudSecuritycenterV2PortRange>;
}

export const GoogleCloudSecuritycenterV2IpRule: Schema.Schema<GoogleCloudSecuritycenterV2IpRule> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  portRanges: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2PortRange)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IpRule" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IpRule>;

export interface GoogleCloudSecuritycenterV2Allowed {
  /** Optional. Optional list of allowed IP rules. */
  ipRules?: Array<GoogleCloudSecuritycenterV2IpRule>;
}

export const GoogleCloudSecuritycenterV2Allowed: Schema.Schema<GoogleCloudSecuritycenterV2Allowed> = Schema.suspend(() => Schema.Struct({
  ipRules: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IpRule)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Allowed" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Allowed>;

export interface GoogleCloudSecuritycenterV2Denied {
  /** Optional. Optional list of denied IP rules. */
  ipRules?: Array<GoogleCloudSecuritycenterV2IpRule>;
}

export const GoogleCloudSecuritycenterV2Denied: Schema.Schema<GoogleCloudSecuritycenterV2Denied> = Schema.suspend(() => Schema.Struct({
  ipRules: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IpRule)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Denied" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Denied>;

export interface GoogleCloudSecuritycenterV2IpRules {
  /** The direction that the rule is applicable to, one of ingress or egress. */
  direction?: "DIRECTION_UNSPECIFIED" | "INGRESS" | "EGRESS" | (string & {});
  /** Tuple with allowed rules. */
  allowed?: GoogleCloudSecuritycenterV2Allowed;
  /** Tuple with denied rules. */
  denied?: GoogleCloudSecuritycenterV2Denied;
  /** If source IP ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4. */
  sourceIpRanges?: Array<string>;
  /** If destination IP ranges are specified, the firewall rule applies only to traffic that has a destination IP address in these ranges. These ranges must be expressed in CIDR format. Only supports IPv4. */
  destinationIpRanges?: Array<string>;
  /** Name of the network protocol service, such as FTP, that is exposed by the open port. Follows the naming convention available at: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml. */
  exposedServices?: Array<string>;
}

export const GoogleCloudSecuritycenterV2IpRules: Schema.Schema<GoogleCloudSecuritycenterV2IpRules> = Schema.suspend(() => Schema.Struct({
  direction: Schema.optional(Schema.String),
  allowed: Schema.optional(GoogleCloudSecuritycenterV2Allowed),
  denied: Schema.optional(GoogleCloudSecuritycenterV2Denied),
  sourceIpRanges: Schema.optional(Schema.Array(Schema.String)),
  destinationIpRanges: Schema.optional(Schema.Array(Schema.String)),
  exposedServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IpRules" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IpRules>;

export interface GoogleCloudSecuritycenterV2BackupDisasterRecovery {
  /** The name of a Backup and DR template which comprises one or more backup policies. See the [Backup and DR documentation](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#temp) for more information. For example, `snap-ov`. */
  backupTemplate?: string;
  /** The names of Backup and DR policies that are associated with a template and that define when to run a backup, how frequently to run a backup, and how long to retain the backup image. For example, `onvaults`. */
  policies?: Array<string>;
  /** The name of a Backup and DR host, which is managed by the backup and recovery appliance and known to the management console. The host can be of type Generic (for example, Compute Engine, SQL Server, Oracle DB, SMB file system, etc.), vCenter, or an ESX server. See the [Backup and DR documentation on hosts](https://cloud.google.com/backup-disaster-recovery/docs/configuration/manage-hosts-and-their-applications) for more information. For example, `centos7-01`. */
  host?: string;
  /** The names of Backup and DR applications. An application is a VM, database, or file system on a managed host monitored by a backup and recovery appliance. For example, `centos7-01-vol00`, `centos7-01-vol01`, `centos7-01-vol02`. */
  applications?: Array<string>;
  /** The name of the Backup and DR storage pool that the backup and recovery appliance is storing data in. The storage pool could be of type Cloud, Primary, Snapshot, or OnVault. See the [Backup and DR documentation on storage pools](https://cloud.google.com/backup-disaster-recovery/docs/concepts/storage-pools). For example, `DiskPoolOne`. */
  storagePool?: string;
  /** The names of Backup and DR advanced policy options of a policy applying to an application. See the [Backup and DR documentation on policy options](https://cloud.google.com/backup-disaster-recovery/docs/create-plan/policy-settings). For example, `skipofflineappsincongrp, nounmap`. */
  policyOptions?: Array<string>;
  /** The name of the Backup and DR resource profile that specifies the storage media for backups of application and VM data. See the [Backup and DR documentation on profiles](https://cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan#profile). For example, `GCP`. */
  profile?: string;
  /** The name of the Backup and DR appliance that captures, moves, and manages the lifecycle of backup data. For example, `backup-server-57137`. */
  appliance?: string;
  /** The backup type of the Backup and DR image. For example, `Snapshot`, `Remote Snapshot`, `OnVault`. */
  backupType?: string;
  /** The timestamp at which the Backup and DR backup was created. */
  backupCreateTime?: string;
}

export const GoogleCloudSecuritycenterV2BackupDisasterRecovery: Schema.Schema<GoogleCloudSecuritycenterV2BackupDisasterRecovery> = Schema.suspend(() => Schema.Struct({
  backupTemplate: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  host: Schema.optional(Schema.String),
  applications: Schema.optional(Schema.Array(Schema.String)),
  storagePool: Schema.optional(Schema.String),
  policyOptions: Schema.optional(Schema.Array(Schema.String)),
  profile: Schema.optional(Schema.String),
  appliance: Schema.optional(Schema.String),
  backupType: Schema.optional(Schema.String),
  backupCreateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2BackupDisasterRecovery" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2BackupDisasterRecovery>;

export interface GoogleCloudSecuritycenterV2PolicyDriftDetails {
  /** The name of the updated field, for example constraint.implementation.policy_rules[0].enforce */
  field?: string;
  /** The value of this field that was configured in a posture, for example, `true` or `allowed_values={"projects/29831892"}`. */
  expectedValue?: string;
  /** The detected value that violates the deployed posture, for example, `false` or `allowed_values={"projects/22831892"}`. */
  detectedValue?: string;
}

export const GoogleCloudSecuritycenterV2PolicyDriftDetails: Schema.Schema<GoogleCloudSecuritycenterV2PolicyDriftDetails> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  expectedValue: Schema.optional(Schema.String),
  detectedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2PolicyDriftDetails" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2PolicyDriftDetails>;

export interface GoogleCloudSecuritycenterV2SecurityPosture {
  /** Name of the posture, for example, `CIS-Posture`. */
  name?: string;
  /** The version of the posture, for example, `c7cfa2a8`. */
  revisionId?: string;
  /** The project, folder, or organization on which the posture is deployed, for example, `projects/{project_number}`. */
  postureDeploymentResource?: string;
  /** The name of the posture deployment, for example, `organizations/{org_id}/posturedeployments/{posture_deployment_id}`. */
  postureDeployment?: string;
  /** The name of the updated policy, for example, `projects/{project_id}/policies/{constraint_name}`. */
  changedPolicy?: string;
  /** The name of the updated policy set, for example, `cis-policyset`. */
  policySet?: string;
  /** The ID of the updated policy, for example, `compute-policy-1`. */
  policy?: string;
  /** The details about a change in an updated policy that violates the deployed posture. */
  policyDriftDetails?: Array<GoogleCloudSecuritycenterV2PolicyDriftDetails>;
}

export const GoogleCloudSecuritycenterV2SecurityPosture: Schema.Schema<GoogleCloudSecuritycenterV2SecurityPosture> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  postureDeploymentResource: Schema.optional(Schema.String),
  postureDeployment: Schema.optional(Schema.String),
  changedPolicy: Schema.optional(Schema.String),
  policySet: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  policyDriftDetails: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2PolicyDriftDetails)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecurityPosture" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecurityPosture>;

export interface GoogleCloudSecuritycenterV2CloudLoggingEntry {
  /** A unique identifier for the log entry. */
  insertId?: string;
  /** The type of the log (part of `log_name`. `log_name` is the resource name of the log to which this log entry belongs). For example: `cloudresourcemanager.googleapis.com/activity` Note that this field is not URL-encoded, unlike in `LogEntry`. */
  logId?: string;
  /** The organization, folder, or project of the monitored resource that produced this log entry. */
  resourceContainer?: string;
  /** The time the event described by the log entry occurred. */
  timestamp?: string;
}

export const GoogleCloudSecuritycenterV2CloudLoggingEntry: Schema.Schema<GoogleCloudSecuritycenterV2CloudLoggingEntry> = Schema.suspend(() => Schema.Struct({
  insertId: Schema.optional(Schema.String),
  logId: Schema.optional(Schema.String),
  resourceContainer: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2CloudLoggingEntry" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2CloudLoggingEntry>;

export interface GoogleCloudSecuritycenterV2LogEntry {
  /** An individual entry in a log stored in Cloud Logging. */
  cloudLoggingEntry?: GoogleCloudSecuritycenterV2CloudLoggingEntry;
}

export const GoogleCloudSecuritycenterV2LogEntry: Schema.Schema<GoogleCloudSecuritycenterV2LogEntry> = Schema.suspend(() => Schema.Struct({
  cloudLoggingEntry: Schema.optional(GoogleCloudSecuritycenterV2CloudLoggingEntry),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2LogEntry" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2LogEntry>;

export interface GoogleCloudSecuritycenterV2LoadBalancer {
  /** The name of the load balancer associated with the finding. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2LoadBalancer: Schema.Schema<GoogleCloudSecuritycenterV2LoadBalancer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2LoadBalancer" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2LoadBalancer>;

export interface GoogleCloudSecuritycenterV2SecurityPolicy {
  /** The name of the Google Cloud Armor security policy, for example, "my-security-policy". */
  name?: string;
  /** The type of Google Cloud Armor security policy for example, 'backend security policy', 'edge security policy', 'network edge security policy', or 'always-on DDoS protection'. */
  type?: string;
  /** Whether or not the associated rule or policy is in preview mode. */
  preview?: boolean;
}

export const GoogleCloudSecuritycenterV2SecurityPolicy: Schema.Schema<GoogleCloudSecuritycenterV2SecurityPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  preview: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecurityPolicy" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecurityPolicy>;

export interface GoogleCloudSecuritycenterV2Requests {
  /** For 'Increasing deny ratio', the ratio is the denied traffic divided by the allowed traffic. For 'Allowed traffic spike', the ratio is the allowed traffic in the short term divided by allowed traffic in the long term. */
  ratio?: number;
  /** Allowed RPS (requests per second) in the short term. */
  shortTermAllowed?: number;
  /** Allowed RPS (requests per second) over the long term. */
  longTermAllowed?: number;
  /** Denied RPS (requests per second) over the long term. */
  longTermDenied?: number;
}

export const GoogleCloudSecuritycenterV2Requests: Schema.Schema<GoogleCloudSecuritycenterV2Requests> = Schema.suspend(() => Schema.Struct({
  ratio: Schema.optional(Schema.Number),
  shortTermAllowed: Schema.optional(Schema.Number),
  longTermAllowed: Schema.optional(Schema.Number),
  longTermDenied: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Requests" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Requests>;

export interface GoogleCloudSecuritycenterV2AdaptiveProtection {
  /** A score of 0 means that there is low confidence that the detected event is an actual attack. A score of 1 means that there is high confidence that the detected event is an attack. See the [Adaptive Protection documentation](https://cloud.google.com/armor/docs/adaptive-protection-overview#configure-alert-tuning) for further explanation. */
  confidence?: number;
}

export const GoogleCloudSecuritycenterV2AdaptiveProtection: Schema.Schema<GoogleCloudSecuritycenterV2AdaptiveProtection> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AdaptiveProtection" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AdaptiveProtection>;

export interface GoogleCloudSecuritycenterV2Attack {
  /** Total PPS (packets per second) volume of attack. */
  volumePpsLong?: string;
  /** Total BPS (bytes per second) volume of attack. */
  volumeBpsLong?: string;
  /** Type of attack, for example, 'SYN-flood', 'NTP-udp', or 'CHARGEN-udp'. */
  classification?: string;
  /** Total PPS (packets per second) volume of attack. Deprecated - refer to volume_pps_long instead. */
  volumePps?: number;
  /** Total BPS (bytes per second) volume of attack. Deprecated - refer to volume_bps_long instead. */
  volumeBps?: number;
}

export const GoogleCloudSecuritycenterV2Attack: Schema.Schema<GoogleCloudSecuritycenterV2Attack> = Schema.suspend(() => Schema.Struct({
  volumePpsLong: Schema.optional(Schema.String),
  volumeBpsLong: Schema.optional(Schema.String),
  classification: Schema.optional(Schema.String),
  volumePps: Schema.optional(Schema.Number),
  volumeBps: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Attack" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Attack>;

export interface GoogleCloudSecuritycenterV2CloudArmor {
  /** Information about the [Google Cloud Armor security policy](https://cloud.google.com/armor/docs/security-policy-overview) relevant to the finding. */
  securityPolicy?: GoogleCloudSecuritycenterV2SecurityPolicy;
  /** Information about incoming requests evaluated by [Google Cloud Armor security policies](https://cloud.google.com/armor/docs/security-policy-overview). */
  requests?: GoogleCloudSecuritycenterV2Requests;
  /** Information about potential Layer 7 DDoS attacks identified by [Google Cloud Armor Adaptive Protection](https://cloud.google.com/armor/docs/adaptive-protection-overview). */
  adaptiveProtection?: GoogleCloudSecuritycenterV2AdaptiveProtection;
  /** Information about DDoS attack volume and classification. */
  attack?: GoogleCloudSecuritycenterV2Attack;
  /** Distinguish between volumetric & protocol DDoS attack and application layer attacks. For example, "L3_4" for Layer 3 and Layer 4 DDoS attacks, or "L_7" for Layer 7 DDoS attacks. */
  threatVector?: string;
  /** Duration of attack from the start until the current moment (updated every 5 minutes). */
  duration?: string;
}

export const GoogleCloudSecuritycenterV2CloudArmor: Schema.Schema<GoogleCloudSecuritycenterV2CloudArmor> = Schema.suspend(() => Schema.Struct({
  securityPolicy: Schema.optional(GoogleCloudSecuritycenterV2SecurityPolicy),
  requests: Schema.optional(GoogleCloudSecuritycenterV2Requests),
  adaptiveProtection: Schema.optional(GoogleCloudSecuritycenterV2AdaptiveProtection),
  attack: Schema.optional(GoogleCloudSecuritycenterV2Attack),
  threatVector: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2CloudArmor" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2CloudArmor>;

export interface GoogleCloudSecuritycenterV2Notebook {
  /** The name of the notebook. */
  name?: string;
  /** The source notebook service, for example, "Colab Enterprise". */
  service?: string;
  /** The user ID of the latest author to modify the notebook. */
  lastAuthor?: string;
  /** The most recent time the notebook was updated. */
  notebookUpdateTime?: string;
}

export const GoogleCloudSecuritycenterV2Notebook: Schema.Schema<GoogleCloudSecuritycenterV2Notebook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  lastAuthor: Schema.optional(Schema.String),
  notebookUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Notebook" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Notebook>;

export interface GoogleCloudSecuritycenterV2ToxicCombination {
  /** The [Attack exposure score](https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_exposure_scores) of this toxic combination. The score is a measure of how much this toxic combination exposes one or more high-value resources to potential attack. */
  attackExposureScore?: number;
  /** List of resource names of findings associated with this toxic combination. For example, `organizations/123/sources/456/findings/789`. */
  relatedFindings?: Array<string>;
}

export const GoogleCloudSecuritycenterV2ToxicCombination: Schema.Schema<GoogleCloudSecuritycenterV2ToxicCombination> = Schema.suspend(() => Schema.Struct({
  attackExposureScore: Schema.optional(Schema.Number),
  relatedFindings: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ToxicCombination" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ToxicCombination>;

export interface GoogleCloudSecuritycenterV2GroupMembership {
  /** Type of group. */
  groupType?: "GROUP_TYPE_UNSPECIFIED" | "GROUP_TYPE_TOXIC_COMBINATION" | "GROUP_TYPE_CHOKEPOINT" | (string & {});
  /** ID of the group. */
  groupId?: string;
}

export const GoogleCloudSecuritycenterV2GroupMembership: Schema.Schema<GoogleCloudSecuritycenterV2GroupMembership> = Schema.suspend(() => Schema.Struct({
  groupType: Schema.optional(Schema.String),
  groupId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2GroupMembership" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2GroupMembership>;

export interface GoogleCloudSecuritycenterV2Disk {
  /** The name of the disk, for example, "https://www.googleapis.com/compute/v1/projects/{project-id}/zones/{zone-id}/disks/{disk-id}". */
  name?: string;
}

export const GoogleCloudSecuritycenterV2Disk: Schema.Schema<GoogleCloudSecuritycenterV2Disk> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Disk" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Disk>;

export interface GoogleCloudSecuritycenterV2DataAccessEvent {
  /** Unique identifier for data access event. */
  eventId?: string;
  /** The email address of the principal that accessed the data. The principal could be a user account, service account, Google group, or other. */
  principalEmail?: string;
  /** The operation performed by the principal to access the data. */
  operation?: "OPERATION_UNSPECIFIED" | "READ" | "MOVE" | "COPY" | (string & {});
  /** Timestamp of data access event. */
  eventTime?: string;
}

export const GoogleCloudSecuritycenterV2DataAccessEvent: Schema.Schema<GoogleCloudSecuritycenterV2DataAccessEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  principalEmail: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2DataAccessEvent" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2DataAccessEvent>;

export interface GoogleCloudSecuritycenterV2DataFlowEvent {
  /** Unique identifier for data flow event. */
  eventId?: string;
  /** The email address of the principal that initiated the data flow event. The principal could be a user account, service account, Google group, or other. */
  principalEmail?: string;
  /** The operation performed by the principal for the data flow event. */
  operation?: "OPERATION_UNSPECIFIED" | "READ" | "MOVE" | "COPY" | (string & {});
  /** Non-compliant location of the principal or the data destination. */
  violatedLocation?: string;
  /** Timestamp of data flow event. */
  eventTime?: string;
}

export const GoogleCloudSecuritycenterV2DataFlowEvent: Schema.Schema<GoogleCloudSecuritycenterV2DataFlowEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  principalEmail: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  violatedLocation: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2DataFlowEvent" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2DataFlowEvent>;

export interface GoogleCloudSecuritycenterV2Network {
  /** The name of the VPC network resource, for example, `//compute.googleapis.com/projects/my-project/global/networks/my-network`. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2Network: Schema.Schema<GoogleCloudSecuritycenterV2Network> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Network" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Network>;

export interface GoogleCloudSecuritycenterV2DataRetentionDeletionEvent {
  /** Timestamp indicating when the event was detected. */
  eventDetectionTime?: string;
  /** Number of objects that violated the policy for this resource. If the number is less than 1,000, then the value of this field is the exact number. If the number of objects that violated the policy is greater than or equal to 1,000, then the value of this field is 1000. */
  dataObjectCount?: string;
  /** Maximum duration of retention allowed from the DRD control. This comes from the DRD control where users set a max TTL for their data. For example, suppose that a user sets the max TTL for a Cloud Storage bucket to 90 days. However, an object in that bucket is 100 days old. In this case, a DataRetentionDeletionEvent will be generated for that Cloud Storage bucket, and the max_retention_allowed is 90 days. */
  maxRetentionAllowed?: string;
  /** Min duration of retention allowed from the DSPM retention control. This field is only populated when event type is set to EVENT_TYPE_MIN_TTL_FROM_CREATION. */
  minRetentionAllowed?: string;
  /** Type of the DRD event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "EVENT_TYPE_MAX_TTL_EXCEEDED" | "EVENT_TYPE_MAX_TTL_FROM_CREATION" | "EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION" | "EVENT_TYPE_MIN_TTL_FROM_CREATION" | (string & {});
}

export const GoogleCloudSecuritycenterV2DataRetentionDeletionEvent: Schema.Schema<GoogleCloudSecuritycenterV2DataRetentionDeletionEvent> = Schema.suspend(() => Schema.Struct({
  eventDetectionTime: Schema.optional(Schema.String),
  dataObjectCount: Schema.optional(Schema.String),
  maxRetentionAllowed: Schema.optional(Schema.String),
  minRetentionAllowed: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2DataRetentionDeletionEvent" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2DataRetentionDeletionEvent>;

export interface GoogleCloudSecuritycenterV2AffectedResources {
  /** The count of resources affected by the finding. */
  count?: string;
}

export const GoogleCloudSecuritycenterV2AffectedResources: Schema.Schema<GoogleCloudSecuritycenterV2AffectedResources> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AffectedResources" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AffectedResources>;

export interface GoogleCloudSecuritycenterV2AiModel {
  /** The name of the AI model, for example, "gemini:1.0.0". */
  name?: string;
  /** The domain of the model, for example, “image-classification”. */
  domain?: string;
  /** The name of the model library, for example, “transformers”. */
  library?: string;
  /** The region in which the model is used, for example, “us-central1”. */
  location?: string;
  /** The publisher of the model, for example, “google” or “nvidia”. */
  publisher?: string;
  /** The platform on which the model is deployed. */
  deploymentPlatform?: "DEPLOYMENT_PLATFORM_UNSPECIFIED" | "VERTEX_AI" | "GKE" | "GCE" | "FINE_TUNED_MODEL" | (string & {});
  /** The user defined display name of model. Ex. baseline-classification-model */
  displayName?: string;
  /** The purpose of the model, for example, "Inteference" or "Training". */
  usageCategory?: string;
}

export const GoogleCloudSecuritycenterV2AiModel: Schema.Schema<GoogleCloudSecuritycenterV2AiModel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  library: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
  deploymentPlatform: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  usageCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AiModel" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AiModel>;

export interface GoogleCloudSecuritycenterV2Chokepoint {
  /** List of resource names of findings associated with this chokepoint. For example, organizations/123/sources/456/findings/789. This list will have at most 100 findings. */
  relatedFindings?: Array<string>;
}

export const GoogleCloudSecuritycenterV2Chokepoint: Schema.Schema<GoogleCloudSecuritycenterV2Chokepoint> = Schema.suspend(() => Schema.Struct({
  relatedFindings: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Chokepoint" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Chokepoint>;

export interface GoogleCloudSecuritycenterV2Control {
  /** Name of the Control */
  controlName?: string;
  /** Display name of the control. For example, AU-02. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2Control: Schema.Schema<GoogleCloudSecuritycenterV2Control> = Schema.suspend(() => Schema.Struct({
  controlName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Control" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Control>;

export interface GoogleCloudSecuritycenterV2Framework {
  /** Name of the framework associated with the finding */
  name?: string;
  /** Display name of the framework. For a standard framework, this will look like e.g. PCI DSS 3.2.1, whereas for a custom framework it can be a user defined string like MyFramework */
  displayName?: string;
  /** Category of the framework associated with the finding. E.g. Security Benchmark, or Assured Workloads */
  category?: Array<"FRAMEWORK_CATEGORY_UNSPECIFIED" | "SECURITY_BENCHMARKS" | "ASSURED_WORKLOADS" | "DATA_SECURITY" | "GOOGLE_BEST_PRACTICES" | "CUSTOM_FRAMEWORK" | (string & {})>;
  /** Type of the framework associated with the finding, to specify whether the framework is built-in (pre-defined and immutable) or a custom framework defined by the customer (equivalent to security posture) */
  type?: "FRAMEWORK_TYPE_UNSPECIFIED" | "FRAMEWORK_TYPE_BUILT_IN" | "FRAMEWORK_TYPE_CUSTOM" | (string & {});
  /** The controls associated with the framework. */
  controls?: Array<GoogleCloudSecuritycenterV2Control>;
}

export const GoogleCloudSecuritycenterV2Framework: Schema.Schema<GoogleCloudSecuritycenterV2Framework> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  category: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  controls: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Control)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Framework" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Framework>;

export interface GoogleCloudSecuritycenterV2CloudControl {
  /** Name of the CloudControl associated with the finding. */
  cloudControlName?: string;
  /** Type of cloud control. */
  type?: "CLOUD_CONTROL_TYPE_UNSPECIFIED" | "BUILT_IN" | "CUSTOM" | (string & {});
  /** Policy type of the CloudControl */
  policyType?: string;
  /** Version of the Cloud Control */
  version?: number;
}

export const GoogleCloudSecuritycenterV2CloudControl: Schema.Schema<GoogleCloudSecuritycenterV2CloudControl> = Schema.suspend(() => Schema.Struct({
  cloudControlName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  policyType: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2CloudControl" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2CloudControl>;

export interface GoogleCloudSecuritycenterV2ComplianceDetails {
  /** Details of Frameworks associated with the finding */
  frameworks?: Array<GoogleCloudSecuritycenterV2Framework>;
  /** CloudControl associated with the finding */
  cloudControl?: GoogleCloudSecuritycenterV2CloudControl;
  /** Cloud Control Deployments associated with the finding. For example, organizations/123/locations/global/cloudControlDeployments/deploymentIdentifier */
  cloudControlDeploymentNames?: Array<string>;
}

export const GoogleCloudSecuritycenterV2ComplianceDetails: Schema.Schema<GoogleCloudSecuritycenterV2ComplianceDetails> = Schema.suspend(() => Schema.Struct({
  frameworks: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Framework)),
  cloudControl: Schema.optional(GoogleCloudSecuritycenterV2CloudControl),
  cloudControlDeploymentNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ComplianceDetails" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ComplianceDetails>;

export interface GoogleCloudSecuritycenterV2Dataset {
  /** Resource name of the dataset, e.g. projects/{project}/locations/{location}/datasets/2094040236064505856 */
  name?: string;
  /** The user defined display name of dataset, e.g. plants-dataset */
  displayName?: string;
  /** Data source, such as a BigQuery source URI, e.g. bq://scc-nexus-test.AIPPtest.gsod */
  source?: string;
}

export const GoogleCloudSecuritycenterV2Dataset: Schema.Schema<GoogleCloudSecuritycenterV2Dataset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Dataset" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Dataset>;

export interface GoogleCloudSecuritycenterV2Pipeline {
  /** Resource name of the pipeline, e.g. projects/{project}/locations/{location}/trainingPipelines/5253428229225578496 */
  name?: string;
  /** The user-defined display name of pipeline, e.g. plants-classification */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2Pipeline: Schema.Schema<GoogleCloudSecuritycenterV2Pipeline> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Pipeline" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Pipeline>;

export interface GoogleCloudSecuritycenterV2VertexAi {
  /** Datasets associated with the finding. */
  datasets?: Array<GoogleCloudSecuritycenterV2Dataset>;
  /** Pipelines associated with the finding. */
  pipelines?: Array<GoogleCloudSecuritycenterV2Pipeline>;
}

export const GoogleCloudSecuritycenterV2VertexAi: Schema.Schema<GoogleCloudSecuritycenterV2VertexAi> = Schema.suspend(() => Schema.Struct({
  datasets: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Dataset)),
  pipelines: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Pipeline)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2VertexAi" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2VertexAi>;

export interface GoogleCloudSecuritycenterV2ArtifactGuardPolicy {
  /** The type of the policy evaluation. */
  type?: "ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED" | "VULNERABILITY" | (string & {});
  /** The ID of the failing policy, for example, "organizations/3392779/locations/global/policies/prod-policy". */
  policyId?: string;
  /** The reason for the policy failure, for example, "severity=HIGH AND max_vuln_count=2". */
  failureReason?: string;
}

export const GoogleCloudSecuritycenterV2ArtifactGuardPolicy: Schema.Schema<GoogleCloudSecuritycenterV2ArtifactGuardPolicy> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ArtifactGuardPolicy" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ArtifactGuardPolicy>;

export interface GoogleCloudSecuritycenterV2ArtifactGuardPolicies {
  /** The ID of the resource that has policies configured for it. */
  resourceId?: string;
  /** A list of failing policies. */
  failingPolicies?: Array<GoogleCloudSecuritycenterV2ArtifactGuardPolicy>;
}

export const GoogleCloudSecuritycenterV2ArtifactGuardPolicies: Schema.Schema<GoogleCloudSecuritycenterV2ArtifactGuardPolicies> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(Schema.String),
  failingPolicies: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ArtifactGuardPolicy)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ArtifactGuardPolicies" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ArtifactGuardPolicies>;

export interface GoogleCloudSecuritycenterV2SecretStatus {
  /** Time that the secret was found. */
  lastUpdatedTime?: string;
  /** The validity of the secret. */
  validity?: "SECRET_VALIDITY_UNSPECIFIED" | "SECRET_VALIDITY_UNSUPPORTED" | "SECRET_VALIDITY_FAILED" | "SECRET_VALIDITY_INVALID" | "SECRET_VALIDITY_VALID" | (string & {});
}

export const GoogleCloudSecuritycenterV2SecretStatus: Schema.Schema<GoogleCloudSecuritycenterV2SecretStatus> = Schema.suspend(() => Schema.Struct({
  lastUpdatedTime: Schema.optional(Schema.String),
  validity: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecretStatus" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecretStatus>;

export interface GoogleCloudSecuritycenterV2SecretEnvironmentVariable {
  /** Environment variable name as a JSON encoded string. Note that value is not included since the value contains the secret data, which is sensitive core content. */
  key?: string;
}

export const GoogleCloudSecuritycenterV2SecretEnvironmentVariable: Schema.Schema<GoogleCloudSecuritycenterV2SecretEnvironmentVariable> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecretEnvironmentVariable" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecretEnvironmentVariable>;

export interface GoogleCloudSecuritycenterV2SecretFilePath {
  /** Path to the file. */
  path?: string;
}

export const GoogleCloudSecuritycenterV2SecretFilePath: Schema.Schema<GoogleCloudSecuritycenterV2SecretFilePath> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SecretFilePath" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SecretFilePath>;

export interface GoogleCloudSecuritycenterV2Secret {
  /** The type of secret, for example, GCP_API_KEY. */
  type?: string;
  /** The status of the secret. */
  status?: GoogleCloudSecuritycenterV2SecretStatus;
  /** The environment variable containing the secret. */
  environmentVariable?: GoogleCloudSecuritycenterV2SecretEnvironmentVariable;
  /** The file containing the secret. */
  filePath?: GoogleCloudSecuritycenterV2SecretFilePath;
}

export const GoogleCloudSecuritycenterV2Secret: Schema.Schema<GoogleCloudSecuritycenterV2Secret> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  status: Schema.optional(GoogleCloudSecuritycenterV2SecretStatus),
  environmentVariable: Schema.optional(GoogleCloudSecuritycenterV2SecretEnvironmentVariable),
  filePath: Schema.optional(GoogleCloudSecuritycenterV2SecretFilePath),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Secret" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Secret>;

export interface GoogleCloudSecuritycenterV2ExternalExposure {
  /** Private IP address of the exposed endpoint. */
  privateIpAddress?: string;
  /** Port number associated with private IP address. */
  privatePort?: string;
  /** The name and version of the service, for example, "Jupyter Notebook 6.14.0". */
  exposedService?: string;
  /** Public IP address of the exposed endpoint. */
  publicIpAddress?: string;
  /** Public port number of the exposed endpoint. */
  publicPort?: string;
  /** The resource which is running the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/zones/{zone}/instances/{instance}.” */
  exposedEndpoint?: string;
  /** The full resource name of the load balancer firewall policy, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}". */
  loadBalancerFirewallPolicy?: string;
  /** The full resource name of the firewall policy of the exposed service, for example, "//compute.googleapis.com/projects/{project-id}/global/firewallPolicies/{policy-name}". */
  serviceFirewallPolicy?: string;
  /** The full resource name of the forwarding rule, for example, "//compute.googleapis.com/projects/{project-id}/global/forwardingRules/{forwarding-rule-name}". */
  forwardingRule?: string;
  /** The full resource name of load balancer backend service, for example, "//compute.googleapis.com/projects/{project-id}/global/backendServices/{name}". */
  backendService?: string;
  /** The full resource name of the instance group, for example, "//compute.googleapis.com/projects/{project-id}/global/instanceGroups/{name}". */
  instanceGroup?: string;
  /** The full resource name of the network endpoint group, for example, "//compute.googleapis.com/projects/{project-id}/global/networkEndpointGroups/{name}". */
  networkEndpointGroup?: string;
}

export const GoogleCloudSecuritycenterV2ExternalExposure: Schema.Schema<GoogleCloudSecuritycenterV2ExternalExposure> = Schema.suspend(() => Schema.Struct({
  privateIpAddress: Schema.optional(Schema.String),
  privatePort: Schema.optional(Schema.String),
  exposedService: Schema.optional(Schema.String),
  publicIpAddress: Schema.optional(Schema.String),
  publicPort: Schema.optional(Schema.String),
  exposedEndpoint: Schema.optional(Schema.String),
  loadBalancerFirewallPolicy: Schema.optional(Schema.String),
  serviceFirewallPolicy: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
  backendService: Schema.optional(Schema.String),
  instanceGroup: Schema.optional(Schema.String),
  networkEndpointGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ExternalExposure" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ExternalExposure>;

export interface GoogleCloudSecuritycenterV2Finding {
  /** Identifier. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. The following list shows some examples: + `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}` + `organizations/{organization_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` + `folders/{folder_id}/sources/{source_id}/findings/{finding_id}` + `folders/{folder_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` + `projects/{project_id}/sources/{source_id}/findings/{finding_id}` + `projects/{project_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` */
  name?: string;
  /** Output only. The canonical name of the finding. The following list shows some examples: + `organizations/{organization_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` + `folders/{folder_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` + `projects/{project_id}/sources/{source_id}/locations/{location_id}/findings/{finding_id}` The prefix is the closest CRM ancestor of the resource associated with the finding. */
  canonicalName?: string;
  /** The relative resource name of the source and location the finding belongs to. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name This field is immutable after creation time. The following list shows some examples: + `organizations/{organization_id}/sources/{source_id}` + `folders/{folders_id}/sources/{source_id}` + `projects/{projects_id}/sources/{source_id}` + `organizations/{organization_id}/sources/{source_id}/locations/{location_id}` + `folders/{folders_id}/sources/{source_id}/locations/{location_id}` + `projects/{projects_id}/sources/{source_id}/locations/{location_id}` */
  parent?: string;
  /** Immutable. For findings on Google Cloud resources, the full resource name of the Google Cloud resource this finding is for. See: https://cloud.google.com/apis/design/resource_names#full_resource_name When the finding is for a non-Google Cloud resource, the resourceName can be a customer or partner defined string. */
  resourceName?: string;
  /** Output only. The state of the finding. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Immutable. The additional taxonomy group within findings from a given source. Example: "XSS_FLASH_INJECTION" */
  category?: string;
  /** The URI that, if available, points to a web page outside of Security Command Center where additional information about the finding can be found. This field is guaranteed to be either empty or a well formed URL. */
  externalUri?: string;
  /** Source specific properties. These properties are managed by the source that writes the finding. The key names in the source_properties map must be between 1 and 255 characters, and must start with a letter and contain alphanumeric characters or underscores only. */
  sourceProperties?: Record<string, unknown>;
  /** Output only. User specified security marks. These marks are entirely managed by the user and come from the SecurityMarks resource that belongs to the finding. */
  securityMarks?: GoogleCloudSecuritycenterV2SecurityMarks;
  /** The time the finding was first detected. If an existing finding is updated, then this is the time the update occurred. For example, if the finding represents an open firewall, this property captures the time the detector believes the firewall became open. The accuracy is determined by the detector. If the finding is later resolved, then this time reflects when the finding was resolved. This must not be set to a value greater than the current timestamp. */
  eventTime?: string;
  /** Output only. The time at which the finding was created in Security Command Center. */
  createTime?: string;
  /** The severity of the finding. This field is managed by the source that writes the finding. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Indicates the mute state of a finding (either muted, unmuted or undefined). Unlike other attributes of a finding, a finding provider shouldn't set the value of mute. */
  mute?: "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED" | (string & {});
  /** Output only. The mute information regarding this finding. */
  muteInfo?: GoogleCloudSecuritycenterV2MuteInfo;
  /** The class of the finding. */
  findingClass?: "FINDING_CLASS_UNSPECIFIED" | "THREAT" | "VULNERABILITY" | "MISCONFIGURATION" | "OBSERVATION" | "SCC_ERROR" | "POSTURE_VIOLATION" | "TOXIC_COMBINATION" | "SENSITIVE_DATA_RISK" | "CHOKEPOINT" | "EXTERNAL_EXPOSURE" | (string & {});
  /** Represents what's commonly known as an *indicator of compromise* (IoC) in computer forensics. This is an artifact observed on a network or in an operating system that, with high confidence, indicates a computer intrusion. For more information, see [Indicator of compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise). */
  indicator?: GoogleCloudSecuritycenterV2Indicator;
  /** Represents vulnerability-specific fields like CVE and CVSS scores. CVE stands for Common Vulnerabilities and Exposures (https://cve.mitre.org/about/) */
  vulnerability?: GoogleCloudSecuritycenterV2Vulnerability;
  /** Output only. The most recent time this finding was muted or unmuted. */
  muteUpdateTime?: string;
  /** Output only. Third party SIEM/SOAR fields within SCC, contains external system information and external system finding fields. */
  externalSystems?: Record<string, GoogleCloudSecuritycenterV2ExternalSystem>;
  /** MITRE ATT&CK tactics and techniques related to this finding. See: https://attack.mitre.org */
  mitreAttack?: GoogleCloudSecuritycenterV2MitreAttack;
  /** Access details associated with the finding, such as more information on the caller, which method was accessed, and from where. */
  access?: GoogleCloudSecuritycenterV2Access;
  /** Contains information about the IP connection associated with the finding. */
  connections?: Array<GoogleCloudSecuritycenterV2Connection>;
  /** Records additional information about the mute operation, for example, the [mute configuration](https://cloud.google.com/security-command-center/docs/how-to-mute-findings) that muted the finding and the user who muted the finding. */
  muteInitiator?: string;
  /** Represents operating system processes associated with the Finding. */
  processes?: Array<GoogleCloudSecuritycenterV2Process>;
  /** Output only. Map containing the points of contact for the given finding. The key represents the type of contact, while the value contains a list of all the contacts that pertain. Please refer to: https://cloud.google.com/resource-manager/docs/managing-notification-contacts#notification-categories { "security": { "contacts": [ { "email": "person1@company.com" }, { "email": "person2@company.com" } ] } } */
  contacts?: Record<string, GoogleCloudSecuritycenterV2ContactDetails>;
  /** Contains compliance information for security standards associated to the finding. */
  compliances?: Array<GoogleCloudSecuritycenterV2Compliance>;
  /** Output only. The human readable display name of the finding source such as "Event Threat Detection" or "Security Health Analytics". */
  parentDisplayName?: string;
  /** Contains more details about the finding. */
  description?: string;
  /** Represents exfiltrations associated with the finding. */
  exfiltration?: GoogleCloudSecuritycenterV2Exfiltration;
  /** Represents IAM bindings associated with the finding. */
  iamBindings?: Array<GoogleCloudSecuritycenterV2IamBinding>;
  /** Steps to address the finding. */
  nextSteps?: string;
  /** Unique identifier of the module which generated the finding. Example: folders/598186756061/securityHealthAnalyticsSettings/customModules/56799441161885 */
  moduleName?: string;
  /** Containers associated with the finding. This field provides information for both Kubernetes and non-Kubernetes containers. */
  containers?: Array<GoogleCloudSecuritycenterV2Container>;
  /** Kubernetes resources associated with the finding. */
  kubernetes?: GoogleCloudSecuritycenterV2Kubernetes;
  /** Database associated with the finding. */
  database?: GoogleCloudSecuritycenterV2Database;
  /** The results of an attack path simulation relevant to this finding. */
  attackExposure?: GoogleCloudSecuritycenterV2AttackExposure;
  /** File associated with the finding. */
  files?: Array<GoogleCloudSecuritycenterV2File>;
  /** Cloud Data Loss Prevention (Cloud DLP) inspection results that are associated with the finding. */
  cloudDlpInspection?: GoogleCloudSecuritycenterV2CloudDlpInspection;
  /** Cloud DLP data profile that is associated with the finding. */
  cloudDlpDataProfile?: GoogleCloudSecuritycenterV2CloudDlpDataProfile;
  /** Signature of the kernel rootkit. */
  kernelRootkit?: GoogleCloudSecuritycenterV2KernelRootkit;
  /** Contains information about the org policies associated with the finding. */
  orgPolicies?: Array<GoogleCloudSecuritycenterV2OrgPolicy>;
  /** Job associated with the finding. */
  job?: GoogleCloudSecuritycenterV2Job;
  /** Represents an application associated with the finding. */
  application?: GoogleCloudSecuritycenterV2Application;
  /** IP rules associated with the finding. */
  ipRules?: GoogleCloudSecuritycenterV2IpRules;
  /** Fields related to Backup and DR findings. */
  backupDisasterRecovery?: GoogleCloudSecuritycenterV2BackupDisasterRecovery;
  /** The security posture associated with the finding. */
  securityPosture?: GoogleCloudSecuritycenterV2SecurityPosture;
  /** Log entries that are relevant to the finding. */
  logEntries?: Array<GoogleCloudSecuritycenterV2LogEntry>;
  /** The load balancers associated with the finding. */
  loadBalancers?: Array<GoogleCloudSecuritycenterV2LoadBalancer>;
  /** Fields related to Cloud Armor findings. */
  cloudArmor?: GoogleCloudSecuritycenterV2CloudArmor;
  /** Notebook associated with the finding. */
  notebook?: GoogleCloudSecuritycenterV2Notebook;
  /** Contains details about a group of security issues that, when the issues occur together, represent a greater risk than when the issues occur independently. A group of such issues is referred to as a toxic combination. This field cannot be updated. Its value is ignored in all update requests. */
  toxicCombination?: GoogleCloudSecuritycenterV2ToxicCombination;
  /** Contains details about groups of which this finding is a member. A group is a collection of findings that are related in some way. This field cannot be updated. Its value is ignored in all update requests. */
  groupMemberships?: Array<GoogleCloudSecuritycenterV2GroupMembership>;
  /** Disk associated with the finding. */
  disk?: GoogleCloudSecuritycenterV2Disk;
  /** Data access events associated with the finding. */
  dataAccessEvents?: Array<GoogleCloudSecuritycenterV2DataAccessEvent>;
  /** Data flow events associated with the finding. */
  dataFlowEvents?: Array<GoogleCloudSecuritycenterV2DataFlowEvent>;
  /** Represents the VPC networks that the resource is attached to. */
  networks?: Array<GoogleCloudSecuritycenterV2Network>;
  /** Data retention deletion events associated with the finding. */
  dataRetentionDeletionEvents?: Array<GoogleCloudSecuritycenterV2DataRetentionDeletionEvent>;
  /** AffectedResources associated with the finding. */
  affectedResources?: GoogleCloudSecuritycenterV2AffectedResources;
  /** The AI model associated with the finding. */
  aiModel?: GoogleCloudSecuritycenterV2AiModel;
  /** Contains details about a chokepoint, which is a resource or resource group where high-risk attack paths converge, based on [attack path simulations] (https://cloud.google.com/security-command-center/docs/attack-exposure-learn#attack_path_simulations). This field cannot be updated. Its value is ignored in all update requests. */
  chokepoint?: GoogleCloudSecuritycenterV2Chokepoint;
  /** Details about the compliance implications of the finding. */
  complianceDetails?: GoogleCloudSecuritycenterV2ComplianceDetails;
  /** VertexAi associated with the finding. */
  vertexAi?: GoogleCloudSecuritycenterV2VertexAi;
  /** Output only. The name of the Cloud KMS key used to encrypt this finding, if any. */
  cryptoKeyName?: string;
  /** ArtifactGuardPolicies associated with the finding. */
  artifactGuardPolicies?: GoogleCloudSecuritycenterV2ArtifactGuardPolicies;
  /** Secret associated with the finding. */
  secret?: GoogleCloudSecuritycenterV2Secret;
  /** External exposure associated with the finding. */
  externalExposure?: GoogleCloudSecuritycenterV2ExternalExposure;
}

export const GoogleCloudSecuritycenterV2Finding: Schema.Schema<GoogleCloudSecuritycenterV2Finding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  canonicalName: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  externalUri: Schema.optional(Schema.String),
  sourceProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  securityMarks: Schema.optional(GoogleCloudSecuritycenterV2SecurityMarks),
  eventTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  mute: Schema.optional(Schema.String),
  muteInfo: Schema.optional(GoogleCloudSecuritycenterV2MuteInfo),
  findingClass: Schema.optional(Schema.String),
  indicator: Schema.optional(GoogleCloudSecuritycenterV2Indicator),
  vulnerability: Schema.optional(GoogleCloudSecuritycenterV2Vulnerability),
  muteUpdateTime: Schema.optional(Schema.String),
  externalSystems: Schema.optional(Schema.Record(Schema.String, GoogleCloudSecuritycenterV2ExternalSystem)),
  mitreAttack: Schema.optional(GoogleCloudSecuritycenterV2MitreAttack),
  access: Schema.optional(GoogleCloudSecuritycenterV2Access),
  connections: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Connection)),
  muteInitiator: Schema.optional(Schema.String),
  processes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Process)),
  contacts: Schema.optional(Schema.Record(Schema.String, GoogleCloudSecuritycenterV2ContactDetails)),
  compliances: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Compliance)),
  parentDisplayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  exfiltration: Schema.optional(GoogleCloudSecuritycenterV2Exfiltration),
  iamBindings: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IamBinding)),
  nextSteps: Schema.optional(Schema.String),
  moduleName: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Container)),
  kubernetes: Schema.optional(GoogleCloudSecuritycenterV2Kubernetes),
  database: Schema.optional(GoogleCloudSecuritycenterV2Database),
  attackExposure: Schema.optional(GoogleCloudSecuritycenterV2AttackExposure),
  files: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2File)),
  cloudDlpInspection: Schema.optional(GoogleCloudSecuritycenterV2CloudDlpInspection),
  cloudDlpDataProfile: Schema.optional(GoogleCloudSecuritycenterV2CloudDlpDataProfile),
  kernelRootkit: Schema.optional(GoogleCloudSecuritycenterV2KernelRootkit),
  orgPolicies: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2OrgPolicy)),
  job: Schema.optional(GoogleCloudSecuritycenterV2Job),
  application: Schema.optional(GoogleCloudSecuritycenterV2Application),
  ipRules: Schema.optional(GoogleCloudSecuritycenterV2IpRules),
  backupDisasterRecovery: Schema.optional(GoogleCloudSecuritycenterV2BackupDisasterRecovery),
  securityPosture: Schema.optional(GoogleCloudSecuritycenterV2SecurityPosture),
  logEntries: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2LogEntry)),
  loadBalancers: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2LoadBalancer)),
  cloudArmor: Schema.optional(GoogleCloudSecuritycenterV2CloudArmor),
  notebook: Schema.optional(GoogleCloudSecuritycenterV2Notebook),
  toxicCombination: Schema.optional(GoogleCloudSecuritycenterV2ToxicCombination),
  groupMemberships: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2GroupMembership)),
  disk: Schema.optional(GoogleCloudSecuritycenterV2Disk),
  dataAccessEvents: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2DataAccessEvent)),
  dataFlowEvents: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2DataFlowEvent)),
  networks: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Network)),
  dataRetentionDeletionEvents: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2DataRetentionDeletionEvent)),
  affectedResources: Schema.optional(GoogleCloudSecuritycenterV2AffectedResources),
  aiModel: Schema.optional(GoogleCloudSecuritycenterV2AiModel),
  chokepoint: Schema.optional(GoogleCloudSecuritycenterV2Chokepoint),
  complianceDetails: Schema.optional(GoogleCloudSecuritycenterV2ComplianceDetails),
  vertexAi: Schema.optional(GoogleCloudSecuritycenterV2VertexAi),
  cryptoKeyName: Schema.optional(Schema.String),
  artifactGuardPolicies: Schema.optional(GoogleCloudSecuritycenterV2ArtifactGuardPolicies),
  secret: Schema.optional(GoogleCloudSecuritycenterV2Secret),
  externalExposure: Schema.optional(GoogleCloudSecuritycenterV2ExternalExposure),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Finding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Finding>;

export interface GoogleCloudSecuritycenterV2Folder {
  /** Full resource name of this folder. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceFolder?: string;
  /** The user defined display name for this folder. */
  resourceFolderDisplayName?: string;
}

export const GoogleCloudSecuritycenterV2Folder: Schema.Schema<GoogleCloudSecuritycenterV2Folder> = Schema.suspend(() => Schema.Struct({
  resourceFolder: Schema.optional(Schema.String),
  resourceFolderDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Folder" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Folder>;

export interface GcpMetadata {
  /** The full resource name of project that the resource belongs to. */
  project?: string;
  /** The project ID that the resource belongs to. */
  projectDisplayName?: string;
  /** The full resource name of resource's parent. */
  parent?: string;
  /** The human readable name of resource's parent. */
  parentDisplayName?: string;
  /** Output only. Contains a Folder message for each folder in the assets ancestry. The first folder is the deepest nested folder, and the last folder is the folder directly under the Organization. */
  folders?: Array<GoogleCloudSecuritycenterV2Folder>;
  /** The name of the organization that the resource belongs to. */
  organization?: string;
}

export const GcpMetadata: Schema.Schema<GcpMetadata> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  projectDisplayName: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  parentDisplayName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2Folder)),
  organization: Schema.optional(Schema.String),
})).annotate({ identifier: "GcpMetadata" }) as any as Schema.Schema<GcpMetadata>;

export interface GoogleCloudSecuritycenterV2AwsOrganization {
  /** The unique identifier (ID) for the organization. The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits. */
  id?: string;
}

export const GoogleCloudSecuritycenterV2AwsOrganization: Schema.Schema<GoogleCloudSecuritycenterV2AwsOrganization> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AwsOrganization" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AwsOrganization>;

export interface GoogleCloudSecuritycenterV2AwsOrganizationalUnit {
  /** The unique identifier (ID) associated with this OU. The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits. For example, "ou-ab12-cd34ef56". */
  id?: string;
  /** The friendly name of the OU. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2AwsOrganizationalUnit: Schema.Schema<GoogleCloudSecuritycenterV2AwsOrganizationalUnit> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AwsOrganizationalUnit" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AwsOrganizationalUnit>;

export interface GoogleCloudSecuritycenterV2AwsAccount {
  /** The unique identifier (ID) of the account, containing exactly 12 digits. */
  id?: string;
  /** The friendly name of this account. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2AwsAccount: Schema.Schema<GoogleCloudSecuritycenterV2AwsAccount> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AwsAccount" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AwsAccount>;

export interface GoogleCloudSecuritycenterV2AwsMetadata {
  /** The AWS organization associated with the resource. */
  organization?: GoogleCloudSecuritycenterV2AwsOrganization;
  /** A list of AWS organizational units associated with the resource, ordered from lowest level (closest to the account) to highest level. */
  organizationalUnits?: Array<GoogleCloudSecuritycenterV2AwsOrganizationalUnit>;
  /** The AWS account associated with the resource. */
  account?: GoogleCloudSecuritycenterV2AwsAccount;
}

export const GoogleCloudSecuritycenterV2AwsMetadata: Schema.Schema<GoogleCloudSecuritycenterV2AwsMetadata> = Schema.suspend(() => Schema.Struct({
  organization: Schema.optional(GoogleCloudSecuritycenterV2AwsOrganization),
  organizationalUnits: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2AwsOrganizationalUnit)),
  account: Schema.optional(GoogleCloudSecuritycenterV2AwsAccount),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AwsMetadata" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AwsMetadata>;

export interface GoogleCloudSecuritycenterV2AzureManagementGroup {
  /** The UUID of the Azure management group, for example, `20000000-0001-0000-0000-000000000000`. */
  id?: string;
  /** The display name of the Azure management group. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2AzureManagementGroup: Schema.Schema<GoogleCloudSecuritycenterV2AzureManagementGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AzureManagementGroup" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AzureManagementGroup>;

export interface GoogleCloudSecuritycenterV2AzureSubscription {
  /** The UUID of the Azure subscription, for example, `291bba3f-e0a5-47bc-a099-3bdcb2a50a05`. */
  id?: string;
  /** The display name of the Azure subscription. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2AzureSubscription: Schema.Schema<GoogleCloudSecuritycenterV2AzureSubscription> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AzureSubscription" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AzureSubscription>;

export interface GoogleCloudSecuritycenterV2AzureResourceGroup {
  /** The ID of the Azure resource group. */
  id?: string;
  /** The name of the Azure resource group. This is not a UUID. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2AzureResourceGroup: Schema.Schema<GoogleCloudSecuritycenterV2AzureResourceGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AzureResourceGroup" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AzureResourceGroup>;

export interface GoogleCloudSecuritycenterV2AzureTenant {
  /** The ID of the Microsoft Entra tenant, for example, "a11aaa11-aa11-1aa1-11aa-1aaa11a". */
  id?: string;
  /** The display name of the Azure tenant. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2AzureTenant: Schema.Schema<GoogleCloudSecuritycenterV2AzureTenant> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AzureTenant" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AzureTenant>;

export interface GoogleCloudSecuritycenterV2AzureMetadata {
  /** A list of Azure management groups associated with the resource, ordered from lowest level (closest to the subscription) to highest level. */
  managementGroups?: Array<GoogleCloudSecuritycenterV2AzureManagementGroup>;
  /** The Azure subscription associated with the resource. */
  subscription?: GoogleCloudSecuritycenterV2AzureSubscription;
  /** The Azure resource group associated with the resource. */
  resourceGroup?: GoogleCloudSecuritycenterV2AzureResourceGroup;
  /** The Azure Entra tenant associated with the resource. */
  tenant?: GoogleCloudSecuritycenterV2AzureTenant;
}

export const GoogleCloudSecuritycenterV2AzureMetadata: Schema.Schema<GoogleCloudSecuritycenterV2AzureMetadata> = Schema.suspend(() => Schema.Struct({
  managementGroups: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2AzureManagementGroup)),
  subscription: Schema.optional(GoogleCloudSecuritycenterV2AzureSubscription),
  resourceGroup: Schema.optional(GoogleCloudSecuritycenterV2AzureResourceGroup),
  tenant: Schema.optional(GoogleCloudSecuritycenterV2AzureTenant),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AzureMetadata" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AzureMetadata>;

export interface GoogleCloudSecuritycenterV2ResourcePathNode {
  /** The type of resource this node represents. */
  nodeType?: "RESOURCE_PATH_NODE_TYPE_UNSPECIFIED" | "GCP_ORGANIZATION" | "GCP_FOLDER" | "GCP_PROJECT" | "AWS_ORGANIZATION" | "AWS_ORGANIZATIONAL_UNIT" | "AWS_ACCOUNT" | "AZURE_MANAGEMENT_GROUP" | "AZURE_SUBSCRIPTION" | "AZURE_RESOURCE_GROUP" | (string & {});
  /** The ID of the resource this node represents. */
  id?: string;
  /** The display name of the resource this node represents. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2ResourcePathNode: Schema.Schema<GoogleCloudSecuritycenterV2ResourcePathNode> = Schema.suspend(() => Schema.Struct({
  nodeType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourcePathNode" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourcePathNode>;

export interface GoogleCloudSecuritycenterV2ResourcePath {
  /** The list of nodes that make the up resource path, ordered from lowest level to highest level. */
  nodes?: Array<GoogleCloudSecuritycenterV2ResourcePathNode>;
}

export const GoogleCloudSecuritycenterV2ResourcePath: Schema.Schema<GoogleCloudSecuritycenterV2ResourcePath> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ResourcePathNode)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourcePath" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourcePath>;

export interface GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality {
  /** Criticality Type. */
  type?: "CRITICALITY_TYPE_UNSPECIFIED" | "MISSION_CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
}

export const GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality: Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality>;

export interface GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment {
  /** Environment Type. */
  type?: "ENVIRONMENT_TYPE_UNSPECIFIED" | "PRODUCTION" | "STAGING" | "TEST" | "DEVELOPMENT" | (string & {});
}

export const GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment: Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment>;

export interface GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo {
  /** Email address of the contacts. */
  email?: string;
}

export const GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo: Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo>;

export interface GoogleCloudSecuritycenterV2ResourceApplicationAttributes {
  /** User-defined criticality information. */
  criticality?: GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality;
  /** User-defined environment information. */
  environment?: GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment;
  /** Developer team that owns development and coding. */
  developerOwners?: Array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo>;
  /** Operator team that ensures runtime and operations. */
  operatorOwners?: Array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo>;
  /** Business team that ensures user needs are met and value is delivered */
  businessOwners?: Array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo>;
}

export const GoogleCloudSecuritycenterV2ResourceApplicationAttributes: Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributes> = Schema.suspend(() => Schema.Struct({
  criticality: Schema.optional(GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality),
  environment: Schema.optional(GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment),
  developerOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo)),
  operatorOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo)),
  businessOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceApplicationAttributes" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplicationAttributes>;

export interface GoogleCloudSecuritycenterV2ResourceApplication {
  /** The resource name of an Application. Format: `projects/{host-project-id}/locations/{location}/applications/{application-id}` */
  name?: string;
  /** Consumer provided attributes for the application */
  attributes?: GoogleCloudSecuritycenterV2ResourceApplicationAttributes;
}

export const GoogleCloudSecuritycenterV2ResourceApplication: Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV2ResourceApplicationAttributes),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceApplication" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceApplication>;

export interface GoogleCloudSecuritycenterV2AdcApplication {
  /** The resource name of an ADC Application. Format: projects/{project}/locations/{location}/spaces/{space}/applications/{application} */
  name?: string;
  /** Consumer provided attributes for the AppHub application. */
  attributes?: GoogleCloudSecuritycenterV2ResourceApplicationAttributes;
}

export const GoogleCloudSecuritycenterV2AdcApplication: Schema.Schema<GoogleCloudSecuritycenterV2AdcApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV2ResourceApplicationAttributes),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AdcApplication" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AdcApplication>;

export interface GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision {
  /** The resource name of an ADC Application Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision: Schema.Schema<GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision>;

export interface GoogleCloudSecuritycenterV2AdcSharedTemplateRevision {
  /** The resource name of an ADC Shared Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const GoogleCloudSecuritycenterV2AdcSharedTemplateRevision: Schema.Schema<GoogleCloudSecuritycenterV2AdcSharedTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2AdcSharedTemplateRevision" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2AdcSharedTemplateRevision>;

export interface GoogleCloudSecuritycenterV2Resource {
  /** The full resource name of the resource. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  name?: string;
  /** The human readable name of the resource. */
  displayName?: string;
  /** The full resource type of the resource. */
  type?: string;
  /** Indicates which cloud provider the finding is from. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** The service or resource provider associated with the resource. */
  service?: string;
  /** The region or location of the service (if applicable). */
  location?: string;
  /** The Google Cloud metadata associated with the finding. */
  gcpMetadata?: GcpMetadata;
  /** The AWS metadata associated with the finding. */
  awsMetadata?: GoogleCloudSecuritycenterV2AwsMetadata;
  /** The Azure metadata associated with the finding. */
  azureMetadata?: GoogleCloudSecuritycenterV2AzureMetadata;
  /** Provides the path to the resource within the resource hierarchy. */
  resourcePath?: GoogleCloudSecuritycenterV2ResourcePath;
  /** A string representation of the resource path. For Google Cloud, it has the format of `organizations/{organization_id}/folders/{folder_id}/folders/{folder_id}/projects/{project_id}` where there can be any number of folders. For AWS, it has the format of `org/{organization_id}/ou/{organizational_unit_id}/ou/{organizational_unit_id}/account/{account_id}` where there can be any number of organizational units. For Azure, it has the format of `mg/{management_group_id}/mg/{management_group_id}/subscription/{subscription_id}/rg/{resource_group_name}` where there can be any number of management groups. */
  resourcePathString?: string;
  /** The App Hub application this resource belongs to. */
  application?: GoogleCloudSecuritycenterV2ResourceApplication;
  /** The ADC application associated with the finding. */
  adcApplication?: GoogleCloudSecuritycenterV2AdcApplication;
  /** The ADC template associated with the finding. */
  adcApplicationTemplate?: GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision;
  /** The ADC shared template associated with the finding. */
  adcSharedTemplate?: GoogleCloudSecuritycenterV2AdcSharedTemplateRevision;
}

export const GoogleCloudSecuritycenterV2Resource: Schema.Schema<GoogleCloudSecuritycenterV2Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  gcpMetadata: Schema.optional(GcpMetadata),
  awsMetadata: Schema.optional(GoogleCloudSecuritycenterV2AwsMetadata),
  azureMetadata: Schema.optional(GoogleCloudSecuritycenterV2AzureMetadata),
  resourcePath: Schema.optional(GoogleCloudSecuritycenterV2ResourcePath),
  resourcePathString: Schema.optional(Schema.String),
  application: Schema.optional(GoogleCloudSecuritycenterV2ResourceApplication),
  adcApplication: Schema.optional(GoogleCloudSecuritycenterV2AdcApplication),
  adcApplicationTemplate: Schema.optional(GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision),
  adcSharedTemplate: Schema.optional(GoogleCloudSecuritycenterV2AdcSharedTemplateRevision),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Resource" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Resource>;

export interface GoogleCloudSecuritycenterV2NotificationMessage {
  /** Name of the notification config that generated current notification. */
  notificationConfigName?: string;
  /** If it's a Finding based notification config, this field will be populated. */
  finding?: GoogleCloudSecuritycenterV2Finding;
  /** The Cloud resource tied to this notification's Finding. */
  resource?: GoogleCloudSecuritycenterV2Resource;
}

export const GoogleCloudSecuritycenterV2NotificationMessage: Schema.Schema<GoogleCloudSecuritycenterV2NotificationMessage> = Schema.suspend(() => Schema.Struct({
  notificationConfigName: Schema.optional(Schema.String),
  finding: Schema.optional(GoogleCloudSecuritycenterV2Finding),
  resource: Schema.optional(GoogleCloudSecuritycenterV2Resource),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2NotificationMessage" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2NotificationMessage>;

export interface GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping {
  /** Resource value mapping for high-sensitivity Sensitive Data Protection findings */
  highSensitivityMapping?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
  /** Resource value mapping for medium-sensitivity Sensitive Data Protection findings */
  mediumSensitivityMapping?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
}

export const GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping: Schema.Schema<GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping> = Schema.suspend(() => Schema.Struct({
  highSensitivityMapping: Schema.optional(Schema.String),
  mediumSensitivityMapping: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping>;

export interface GoogleCloudSecuritycenterV2ResourceValueConfig {
  /** Identifier. Name for the resource value configuration */
  name?: string;
  /** Resource value level this expression represents Only required when there is no Sensitive Data Protection mapping in the request */
  resourceValue?: "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
  /** Tag values combined with `AND` to check against. For Google Cloud resources, they are tag value IDs in the form of "tagValues/123". Example: `[ "tagValues/123", "tagValues/456", "tagValues/789" ]` https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing */
  tagValues?: Array<string>;
  /** Apply resource_value only to resources that match resource_type. resource_type will be checked with `AND` of other resources. For example, "storage.googleapis.com/Bucket" with resource_value "HIGH" will apply "HIGH" value only to "storage.googleapis.com/Bucket" resources. */
  resourceType?: string;
  /** Project or folder to scope this configuration to. For example, "project/456" would apply this configuration only to resources in "project/456" scope and will be checked with `AND` of other resources. */
  scope?: string;
  /** List of resource labels to search for, evaluated with `AND`. For example, "resource_labels_selector": {"key": "value", "env": "prod"} will match resources with labels "key": "value" `AND` "env": "prod" https://cloud.google.com/resource-manager/docs/creating-managing-labels */
  resourceLabelsSelector?: Record<string, string>;
  /** Description of the resource value configuration. */
  description?: string;
  /** Output only. Timestamp this resource value configuration was created. */
  createTime?: string;
  /** Output only. Timestamp this resource value configuration was last updated. */
  updateTime?: string;
  /** Cloud provider this configuration applies to */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** A mapping of the sensitivity on Sensitive Data Protection finding to resource values. This mapping can only be used in combination with a resource_type that is related to BigQuery, e.g. "bigquery.googleapis.com/Dataset". */
  sensitiveDataProtectionMapping?: GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping;
}

export const GoogleCloudSecuritycenterV2ResourceValueConfig: Schema.Schema<GoogleCloudSecuritycenterV2ResourceValueConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceValue: Schema.optional(Schema.String),
  tagValues: Schema.optional(Schema.Array(Schema.String)),
  resourceType: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  resourceLabelsSelector: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  sensitiveDataProtectionMapping: Schema.optional(GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2ResourceValueConfig" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2ResourceValueConfig>;

export interface VulnerabilityCountBySeverity {
  /** Key is the Severity enum. */
  severityToFindingCount?: Record<string, string>;
}

export const VulnerabilityCountBySeverity: Schema.Schema<VulnerabilityCountBySeverity> = Schema.suspend(() => Schema.Struct({
  severityToFindingCount: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "VulnerabilityCountBySeverity" }) as any as Schema.Schema<VulnerabilityCountBySeverity>;

export interface VulnerabilitySnapshot {
  /** Identifier. The vulnerability snapshot name. Format: //locations//vulnerabilitySnapshots/ */
  name?: string;
  /** The cloud provider for the vulnerability snapshot. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD_PLATFORM" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** The time that the snapshot was taken. */
  snapshotTime?: string;
  /** The vulnerability count by severity. */
  findingCount?: VulnerabilityCountBySeverity;
}

export const VulnerabilitySnapshot: Schema.Schema<VulnerabilitySnapshot> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  snapshotTime: Schema.optional(Schema.String),
  findingCount: Schema.optional(VulnerabilityCountBySeverity),
})).annotate({ identifier: "VulnerabilitySnapshot" }) as any as Schema.Schema<VulnerabilitySnapshot>;

export interface GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata {
  /** The project ID that the resource associated with the issue belongs to. */
  projectId?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata>;

export interface GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount {
  /** The AWS account ID of the resource associated with the issue. */
  id?: string;
  /** The AWS account name of the resource associated with the issue. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount>;

export interface GoogleCloudSecuritycenterV2IssueResourceAwsMetadata {
  /** The AWS account of the resource associated with the issue. */
  account?: GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount;
}

export const GoogleCloudSecuritycenterV2IssueResourceAwsMetadata: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAwsMetadata> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAwsMetadata" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAwsMetadata>;

export interface GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription {
  /** The Azure subscription ID of the resource associated with the issue. */
  id?: string;
  /** The Azure subscription display name of the resource associated with the issue. */
  displayName?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription>;

export interface GoogleCloudSecuritycenterV2IssueResourceAzureMetadata {
  /** The Azure subscription of the resource associated with the issue. */
  subscription?: GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription;
}

export const GoogleCloudSecuritycenterV2IssueResourceAzureMetadata: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAzureMetadata> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAzureMetadata" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAzureMetadata>;

export interface GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality {
  /** Criticality Type. */
  type?: "CRITICALITY_TYPE_UNSPECIFIED" | "MISSION_CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
}

export const GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality>;

export interface GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment {
  /** Environment Type. */
  type?: "ENVIRONMENT_TYPE_UNSPECIFIED" | "PRODUCTION" | "STAGING" | "TEST" | "DEVELOPMENT" | (string & {});
}

export const GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment>;

export interface GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo {
  /** Email address of the contacts. */
  email?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo>;

export interface GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes {
  /** User-defined criticality information. */
  criticality?: GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality;
  /** User-defined environment information. */
  environment?: GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment;
  /** Developer team that owns development and coding. */
  developerOwners?: Array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo>;
  /** Operator team that ensures runtime and operations. */
  operatorOwners?: Array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo>;
  /** Business team that ensures user needs are met and value is delivered */
  businessOwners?: Array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo>;
}

export const GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes> = Schema.suspend(() => Schema.Struct({
  criticality: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality),
  environment: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment),
  developerOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo)),
  operatorOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo)),
  businessOwners: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes>;

export interface GoogleCloudSecuritycenterV2IssueResourceApplication {
  /** The resource name of an Application. Format: `projects/{host-project-id}/locations/{location}/applications/{application-id}` */
  name?: string;
  /** Consumer provided attributes for the application */
  attributes?: GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes;
}

export const GoogleCloudSecuritycenterV2IssueResourceApplication: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceApplication" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceApplication>;

export interface GoogleCloudSecuritycenterV2IssueResourceAdcApplication {
  /** The resource name of an ADC Application. Format: projects/{project}/locations/{location}/spaces/{space}/applications/{application} */
  name?: string;
  /** Consumer provided attributes for the AppHub application. */
  attributes?: GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes;
}

export const GoogleCloudSecuritycenterV2IssueResourceAdcApplication: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAdcApplication" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcApplication>;

export interface GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision {
  /** The resource name of an ADC Application Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision>;

export interface GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision {
  /** The resource name of an ADC Shared Template Revision. Format: projects/{project}/locations/{location}/spaces/{space}/applicationTemplates/{application_template}/revisions/{revision} */
  name?: string;
}

export const GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision: Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision>;

export interface GoogleCloudSecuritycenterV2IssueResource {
  /** The full resource name of the resource associated with the issue. */
  name?: string;
  /** The resource-type specific display name of the resource associated with the issue. */
  displayName?: string;
  /** The type of the resource associated with the issue. */
  type?: string;
  /** The cloud provider of the resource associated with the issue. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "GOOGLE_CLOUD" | "AMAZON_WEB_SERVICES" | "MICROSOFT_AZURE" | (string & {});
  /** The Google Cloud metadata of the resource associated with the issue. Only populated for Google Cloud resources. */
  googleCloudMetadata?: GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata;
  /** The AWS metadata of the resource associated with the issue. Only populated for AWS resources. */
  awsMetadata?: GoogleCloudSecuritycenterV2IssueResourceAwsMetadata;
  /** The Azure metadata of the resource associated with the issue. Only populated for Azure resources. */
  azureMetadata?: GoogleCloudSecuritycenterV2IssueResourceAzureMetadata;
  /** The AppHub application associated with the resource, if any. Only populated for the primary resource. */
  application?: GoogleCloudSecuritycenterV2IssueResourceApplication;
  /** The ADC application associated with the finding. */
  adcApplication?: GoogleCloudSecuritycenterV2IssueResourceAdcApplication;
  /** The ADC template associated with the finding. */
  adcApplicationTemplate?: GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision;
  /** The ADC shared template associated with the finding. */
  adcSharedTemplate?: GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision;
}

export const GoogleCloudSecuritycenterV2IssueResource: Schema.Schema<GoogleCloudSecuritycenterV2IssueResource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  googleCloudMetadata: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata),
  awsMetadata: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAwsMetadata),
  azureMetadata: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAzureMetadata),
  application: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceApplication),
  adcApplication: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAdcApplication),
  adcApplicationTemplate: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision),
  adcSharedTemplate: Schema.optional(GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueResource" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueResource>;

export interface GoogleCloudSecuritycenterV2IssueMute {
  /** Output only. The mute state of the issue. */
  muteState?: "MUTE_STATE_UNSPECIFIED" | "NOT_MUTED" | "MUTED" | (string & {});
  /** The email address of the user who last changed the mute state of the issue. */
  muteInitiator?: string;
  /** The user-provided reason for muting the issue. */
  muteReason?: string;
  /** The time the issue was muted. */
  muteUpdateTime?: string;
}

export const GoogleCloudSecuritycenterV2IssueMute: Schema.Schema<GoogleCloudSecuritycenterV2IssueMute> = Schema.suspend(() => Schema.Struct({
  muteState: Schema.optional(Schema.String),
  muteInitiator: Schema.optional(Schema.String),
  muteReason: Schema.optional(Schema.String),
  muteUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueMute" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueMute>;

export interface GoogleCloudSecuritycenterV2IssueDomain {
  /** The domain category of the issue. */
  domainCategory?: "DOMAIN_CATEGORY_UNSPECIFIED" | "AI" | "CODE" | "CONTAINER" | "DATA" | "IDENTITY_AND_ACCESS" | "VULNERABILITY" | "THREAT" | (string & {});
}

export const GoogleCloudSecuritycenterV2IssueDomain: Schema.Schema<GoogleCloudSecuritycenterV2IssueDomain> = Schema.suspend(() => Schema.Struct({
  domainCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueDomain" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueDomain>;

export interface GoogleCloudSecuritycenterV2IssueSecurityContextContext {
  /** Context type. */
  type?: string;
  /** Context values. */
  values?: Array<string>;
}

export const GoogleCloudSecuritycenterV2IssueSecurityContextContext: Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContextContext> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueSecurityContextContext" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContextContext>;

export interface GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount {
  /** Aggregation key. */
  key?: string;
  /** Aggregation value. */
  value?: number;
}

export const GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount: Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount>;

export interface GoogleCloudSecuritycenterV2IssueSecurityContext {
  /** The context of the security context. */
  context?: GoogleCloudSecuritycenterV2IssueSecurityContextContext;
  /** The aggregated count of the security context. */
  aggregatedCount?: GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount;
}

export const GoogleCloudSecuritycenterV2IssueSecurityContext: Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContext> = Schema.suspend(() => Schema.Struct({
  context: Schema.optional(GoogleCloudSecuritycenterV2IssueSecurityContextContext),
  aggregatedCount: Schema.optional(GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueSecurityContext" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueSecurityContext>;

export interface GoogleCloudSecuritycenterV2IssueFindingCve {
  /** The CVE name. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2IssueFindingCve: Schema.Schema<GoogleCloudSecuritycenterV2IssueFindingCve> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueFindingCve" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueFindingCve>;

export interface GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin {
  /** The security bulletin name. */
  name?: string;
}

export const GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin: Schema.Schema<GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin>;

export interface GoogleCloudSecuritycenterV2IssueFinding {
  /** The name of the finding. */
  name?: string;
  /** The CVE of the finding. */
  cve?: GoogleCloudSecuritycenterV2IssueFindingCve;
  /** The security bulletin of the finding. */
  securityBulletin?: GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin;
}

export const GoogleCloudSecuritycenterV2IssueFinding: Schema.Schema<GoogleCloudSecuritycenterV2IssueFinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cve: Schema.optional(GoogleCloudSecuritycenterV2IssueFindingCve),
  securityBulletin: Schema.optional(GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2IssueFinding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2IssueFinding>;

export interface GoogleCloudSecuritycenterV2Issue {
  /** Identifier. The name of the issue. Format: organizations/{organization}/locations/{location}/issues/{issue} */
  name?: string;
  /** The finding category or rule name that generated the issue. */
  detection?: string;
  /** The description of the issue in Markdown format. */
  description?: string;
  /** Approaches to remediate the issue in Markdown format. */
  remediations?: Array<string>;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Output only. The state of the issue. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Output only. The time the issue was created. */
  createTime?: string;
  /** The time the issue was last observed. */
  lastObservationTime?: string;
  /** Output only. The time the issue was last updated. */
  updateTime?: string;
  /** The primary resource associated with the issue. */
  primaryResource?: GoogleCloudSecuritycenterV2IssueResource;
  /** Additional resources associated with the issue. */
  secondaryResources?: Array<GoogleCloudSecuritycenterV2IssueResource>;
  /** The type of the issue. */
  issueType?: "ISSUE_TYPE_UNSPECIFIED" | "CHOKEPOINT" | "TOXIC_COMBINATION" | "INSIGHT" | (string & {});
  /** The mute information of the issue. */
  mute?: GoogleCloudSecuritycenterV2IssueMute;
  /** The exposure score of the issue. */
  exposureScore?: number;
  /** The domains of the issue. */
  domains?: Array<GoogleCloudSecuritycenterV2IssueDomain>;
  /** The security context of the issue. */
  securityContexts?: Array<GoogleCloudSecuritycenterV2IssueSecurityContext>;
  /** The findings related to the issue. */
  relatedFindings?: Array<GoogleCloudSecuritycenterV2IssueFinding>;
}

export const GoogleCloudSecuritycenterV2Issue: Schema.Schema<GoogleCloudSecuritycenterV2Issue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  detection: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  remediations: Schema.optional(Schema.Array(Schema.String)),
  severity: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastObservationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  primaryResource: Schema.optional(GoogleCloudSecuritycenterV2IssueResource),
  secondaryResources: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueResource)),
  issueType: Schema.optional(Schema.String),
  mute: Schema.optional(GoogleCloudSecuritycenterV2IssueMute),
  exposureScore: Schema.optional(Schema.Number),
  domains: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueDomain)),
  securityContexts: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueSecurityContext)),
  relatedFindings: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV2IssueFinding)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV2Issue" }) as any as Schema.Schema<GoogleCloudSecuritycenterV2Issue>;

export interface GoogleCloudSecuritycenterV1p1beta1SecurityMarks {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name?: string;
  /** Mutable user specified security marks belonging to the parent resource. Constraints are as follows: * Keys and values are treated as case insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys must be letters, numbers, underscores, or dashes * Values have leading and trailing whitespace trimmed, remaining characters must be between 1 - 4096 characters (inclusive) */
  marks?: Record<string, string>;
  /** The canonical name of the marks. Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "folders/{folder_id}/assets/{asset_id}/securityMarks" "projects/{project_number}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks" "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks" */
  canonicalName?: string;
}

export const GoogleCloudSecuritycenterV1p1beta1SecurityMarks: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1SecurityMarks> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1SecurityMarks" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1SecurityMarks>;

export interface GoogleCloudSecuritycenterV1p1beta1Finding {
  /** The relative resource name of this finding. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}" */
  name?: string;
  /** The relative resource name of the source the finding belongs to. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name This field is immutable after creation time. For example: "organizations/{organization_id}/sources/{source_id}" */
  parent?: string;
  /** For findings on Google Cloud resources, the full resource name of the Google Cloud resource this finding is for. See: https://cloud.google.com/apis/design/resource_names#full_resource_name When the finding is for a non-Google Cloud resource, the resourceName can be a customer or partner defined string. This field is immutable after creation time. */
  resourceName?: string;
  /** The state of the finding. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** The additional taxonomy group within findings from a given source. This field is immutable after creation time. Example: "XSS_FLASH_INJECTION" */
  category?: string;
  /** The URI that, if available, points to a web page outside of Security Command Center where additional information about the finding can be found. This field is guaranteed to be either empty or a well formed URL. */
  externalUri?: string;
  /** Source specific properties. These properties are managed by the source that writes the finding. The key names in the source_properties map must be between 1 and 255 characters, and must start with a letter and contain alphanumeric characters or underscores only. */
  sourceProperties?: Record<string, unknown>;
  /** Output only. User specified security marks. These marks are entirely managed by the user and come from the SecurityMarks resource that belongs to the finding. */
  securityMarks?: GoogleCloudSecuritycenterV1p1beta1SecurityMarks;
  /** The time at which the event took place, or when an update to the finding occurred. For example, if the finding represents an open firewall it would capture the time the detector believes the firewall became open. The accuracy is determined by the detector. If the finding were to be resolved afterward, this time would reflect when the finding was resolved. Must not be set to a value greater than the current timestamp. */
  eventTime?: string;
  /** The time at which the finding was created in Security Command Center. */
  createTime?: string;
  /** The severity of the finding. This field is managed by the source that writes the finding. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** The canonical name of the finding. It's either "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or "projects/{project_number}/sources/{source_id}/findings/{finding_id}", depending on the closest CRM ancestor of the resource associated with the finding. */
  canonicalName?: string;
}

export const GoogleCloudSecuritycenterV1p1beta1Finding: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Finding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  externalUri: Schema.optional(Schema.String),
  sourceProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  securityMarks: Schema.optional(GoogleCloudSecuritycenterV1p1beta1SecurityMarks),
  eventTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  canonicalName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1Finding" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Finding>;

export interface GoogleCloudSecuritycenterV1p1beta1Folder {
  /** Full resource name of this folder. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  resourceFolder?: string;
  /** The user defined display name for this folder. */
  resourceFolderDisplayName?: string;
}

export const GoogleCloudSecuritycenterV1p1beta1Folder: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Folder> = Schema.suspend(() => Schema.Struct({
  resourceFolder: Schema.optional(Schema.String),
  resourceFolderDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1Folder" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Folder>;

export interface GoogleCloudSecuritycenterV1p1beta1Resource {
  /** The full resource name of the resource. See: https://cloud.google.com/apis/design/resource_names#full_resource_name */
  name?: string;
  /** The full resource name of project that the resource belongs to. */
  project?: string;
  /** The project id that the resource belongs to. */
  projectDisplayName?: string;
  /** The full resource name of resource's parent. */
  parent?: string;
  /** The human readable name of resource's parent. */
  parentDisplayName?: string;
  /** Output only. Contains a Folder message for each folder in the assets ancestry. The first folder is the deepest nested folder, and the last folder is the folder directly under the Organization. */
  folders?: Array<GoogleCloudSecuritycenterV1p1beta1Folder>;
}

export const GoogleCloudSecuritycenterV1p1beta1Resource: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  projectDisplayName: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  parentDisplayName: Schema.optional(Schema.String),
  folders: Schema.optional(Schema.Array(GoogleCloudSecuritycenterV1p1beta1Folder)),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1Resource" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1Resource>;

export interface GoogleCloudSecuritycenterV1p1beta1NotificationMessage {
  /** Name of the notification config that generated current notification. */
  notificationConfigName?: string;
  /** If it's a Finding based notification config, this field will be populated. */
  finding?: GoogleCloudSecuritycenterV1p1beta1Finding;
  /** The Cloud resource tied to the notification. */
  resource?: GoogleCloudSecuritycenterV1p1beta1Resource;
}

export const GoogleCloudSecuritycenterV1p1beta1NotificationMessage: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1NotificationMessage> = Schema.suspend(() => Schema.Struct({
  notificationConfigName: Schema.optional(Schema.String),
  finding: Schema.optional(GoogleCloudSecuritycenterV1p1beta1Finding),
  resource: Schema.optional(GoogleCloudSecuritycenterV1p1beta1Resource),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1NotificationMessage" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1NotificationMessage>;

export interface GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse {
  /** The state of an asset discovery run. */
  state?: "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED" | (string & {});
  /** The duration between asset discovery run start and end */
  duration?: string;
}

export const GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse: Schema.Schema<GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse" }) as any as Schema.Schema<GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse>;

export interface ExportFindingsResponse {
}

export const ExportFindingsResponse: Schema.Schema<ExportFindingsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportFindingsResponse" }) as any as Schema.Schema<ExportFindingsResponse>;

export interface BigQueryDestination {
  /** Required. The relative resource name of the destination dataset, in the form projects/{projectId}/datasets/{datasetId}. */
  dataset?: string;
}

export const BigQueryDestination: Schema.Schema<BigQueryDestination> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDestination" }) as any as Schema.Schema<BigQueryDestination>;

export interface ExportFindingsMetadata {
  /** Optional. Timestamp at which export was started */
  exportStartTime?: string;
  /** Required. The destination BigQuery dataset to export findings to. */
  bigQueryDestination?: BigQueryDestination;
}

export const ExportFindingsMetadata: Schema.Schema<ExportFindingsMetadata> = Schema.suspend(() => Schema.Struct({
  exportStartTime: Schema.optional(Schema.String),
  bigQueryDestination: Schema.optional(BigQueryDestination),
})).annotate({ identifier: "ExportFindingsMetadata" }) as any as Schema.Schema<ExportFindingsMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Kicks off an LRO to bulk mute findings for a parent based on a filter. The parent can be either an organization, folder or project. The findings matched by the filter will be muted after the LRO is done. */
export interface BulkMuteFoldersFindingsRequest {
  /** Required. The parent, at which bulk action needs to be applied. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: BulkMuteFindingsRequest;
}

export const BulkMuteFoldersFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BulkMuteFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/findings:bulkMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkMuteFoldersFindingsRequest>;

export type BulkMuteFoldersFindingsResponse = Operation;
export const BulkMuteFoldersFindingsResponse = Operation;

export type BulkMuteFoldersFindingsError = CommonErrors;

export const bulkMuteFoldersFindings: API.OperationMethod<BulkMuteFoldersFindingsRequest, BulkMuteFoldersFindingsResponse, BulkMuteFoldersFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkMuteFoldersFindingsRequest,
  output: BulkMuteFoldersFindingsResponse,
  errors: [],
}));

/** Creates a resident SecurityHealthAnalyticsCustomModule at the scope of the given CRM parent, and also creates inherited SecurityHealthAnalyticsCustomModules for all CRM descendants of the given parent. These modules are enabled by default. */
export interface CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Resource name of the new custom module's parent. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const createFoldersSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest, CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse, CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: CreateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified SecurityHealthAnalyticsCustomModule and all of its descendants in the CRM hierarchy. This method is only supported for resident custom modules. */
export interface DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;
export const DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;

export type DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const deleteFoldersSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest, DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse, DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: DeleteFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves a SecurityHealthAnalyticsCustomModule. */
export interface GetFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const GetFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type GetFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const GetFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type GetFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const getFoldersSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<GetFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest, GetFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse, GetFoldersSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: GetFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all resident SecurityHealthAnalyticsCustomModules under the given CRM parent and all of the parent’s CRM descendants. */
export interface ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list descendant custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;
export const ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;

export type ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listDescendantFoldersSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListDescendantFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a list of all SecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;
export const ListFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;

export type ListFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listFoldersSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Simulates a given SecurityHealthAnalyticsCustomModule and Resource. */
export interface SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. The relative resource name of the organization, project, or folder. For more information about relative resource names, see [Relative Resource Name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) Example: `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: SimulateSecurityHealthAnalyticsCustomModuleRequest;
}

export const SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SimulateSecurityHealthAnalyticsCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules:simulate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;
export const SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;

export type SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const simulateFoldersSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest, SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse, SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: SimulateFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Updates the SecurityHealthAnalyticsCustomModule under the given name based on the given update mask. Updating the enablement state is supported on both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name and custom config of a module is supported on resident modules only. */
export interface PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits. */
  name: string;
  /** The list of fields to be updated. The only fields that can be updated are `enablement_state` and `custom_config`. If empty or set to the wildcard value `*`, both `enablement_state` and `custom_config` are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const patchFoldersSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest, PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse, PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: PatchFoldersSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves an EffectiveSecurityHealthAnalyticsCustomModule. */
export interface GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the effective custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}` */
  name: string;
}

export const GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;
export const GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;

export type GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const getFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModules: API.OperationMethod<GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest, GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse, GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: GetFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all EffectiveSecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of parent to list effective custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/securityHealthAnalyticsSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;
export const ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;

export type ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const listFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: ListFoldersSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a mute config. */
export interface CreateFoldersMuteConfigsRequest {
  /** Required. Resource name of the new mute configs's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  muteConfigId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const CreateFoldersMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  muteConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("muteConfigId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/muteConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersMuteConfigsRequest>;

export type CreateFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const CreateFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type CreateFoldersMuteConfigsError = CommonErrors;

export const createFoldersMuteConfigs: API.OperationMethod<CreateFoldersMuteConfigsRequest, CreateFoldersMuteConfigsResponse, CreateFoldersMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersMuteConfigsRequest,
  output: CreateFoldersMuteConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteFoldersMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteFoldersMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersMuteConfigsRequest>;

export type DeleteFoldersMuteConfigsResponse = Empty;
export const DeleteFoldersMuteConfigsResponse = Empty;

export type DeleteFoldersMuteConfigsError = CommonErrors;

export const deleteFoldersMuteConfigs: API.OperationMethod<DeleteFoldersMuteConfigsRequest, DeleteFoldersMuteConfigsResponse, DeleteFoldersMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersMuteConfigsRequest,
  output: DeleteFoldersMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetFoldersMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetFoldersMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersMuteConfigsRequest>;

export type GetFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetFoldersMuteConfigsError = CommonErrors;

export const getFoldersMuteConfigs: API.OperationMethod<GetFoldersMuteConfigsRequest, GetFoldersMuteConfigsResponse, GetFoldersMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersMuteConfigsRequest,
  output: GetFoldersMuteConfigsResponse,
  errors: [],
}));

/** Lists mute configs. */
export interface ListFoldersMuteConfigsRequest {
  /** Required. The parent, which owns the collection of mute configs. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListMuteConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMuteConfigs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListFoldersMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/muteConfigs" }),
  svc,
) as unknown as Schema.Schema<ListFoldersMuteConfigsRequest>;

export type ListFoldersMuteConfigsResponse = ListMuteConfigsResponse;
export const ListFoldersMuteConfigsResponse = ListMuteConfigsResponse;

export type ListFoldersMuteConfigsError = CommonErrors;

export const listFoldersMuteConfigs = API.makePaginated(() => ({
  input: ListFoldersMuteConfigsRequest,
  output: ListFoldersMuteConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a mute config. */
export interface PatchFoldersMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchFoldersMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersMuteConfigsRequest>;

export type PatchFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchFoldersMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchFoldersMuteConfigsError = CommonErrors;

export const patchFoldersMuteConfigs: API.OperationMethod<PatchFoldersMuteConfigsRequest, PatchFoldersMuteConfigsResponse, PatchFoldersMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersMuteConfigsRequest,
  output: PatchFoldersMuteConfigsResponse,
  errors: [],
}));

/** Creates a notification config. */
export interface CreateFoldersNotificationConfigsRequest {
  /** Required. Resource name of the new notification config's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must be between 1 and 128 characters and contain alphanumeric characters, underscores, or hyphens only. */
  configId?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const CreateFoldersNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/notificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersNotificationConfigsRequest>;

export type CreateFoldersNotificationConfigsResponse = NotificationConfig;
export const CreateFoldersNotificationConfigsResponse = NotificationConfig;

export type CreateFoldersNotificationConfigsError = CommonErrors;

export const createFoldersNotificationConfigs: API.OperationMethod<CreateFoldersNotificationConfigsRequest, CreateFoldersNotificationConfigsResponse, CreateFoldersNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersNotificationConfigsRequest,
  output: CreateFoldersNotificationConfigsResponse,
  errors: [],
}));

/** Deletes a notification config. */
export interface DeleteFoldersNotificationConfigsRequest {
  /** Required. Name of the notification config to delete. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const DeleteFoldersNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersNotificationConfigsRequest>;

export type DeleteFoldersNotificationConfigsResponse = Empty;
export const DeleteFoldersNotificationConfigsResponse = Empty;

export type DeleteFoldersNotificationConfigsError = CommonErrors;

export const deleteFoldersNotificationConfigs: API.OperationMethod<DeleteFoldersNotificationConfigsRequest, DeleteFoldersNotificationConfigsResponse, DeleteFoldersNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersNotificationConfigsRequest,
  output: DeleteFoldersNotificationConfigsResponse,
  errors: [],
}));

/** Gets a notification config. */
export interface GetFoldersNotificationConfigsRequest {
  /** Required. Name of the notification config to get. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const GetFoldersNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersNotificationConfigsRequest>;

export type GetFoldersNotificationConfigsResponse = NotificationConfig;
export const GetFoldersNotificationConfigsResponse = NotificationConfig;

export type GetFoldersNotificationConfigsError = CommonErrors;

export const getFoldersNotificationConfigs: API.OperationMethod<GetFoldersNotificationConfigsRequest, GetFoldersNotificationConfigsResponse, GetFoldersNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersNotificationConfigsRequest,
  output: GetFoldersNotificationConfigsResponse,
  errors: [],
}));

/** Lists notification configs. */
export interface ListFoldersNotificationConfigsRequest {
  /** Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]". */
  parent: string;
  /** The value returned by the last `ListNotificationConfigsResponse`; indicates that this is a continuation of a prior `ListNotificationConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListFoldersNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/notificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListFoldersNotificationConfigsRequest>;

export type ListFoldersNotificationConfigsResponse = ListNotificationConfigsResponse;
export const ListFoldersNotificationConfigsResponse = ListNotificationConfigsResponse;

export type ListFoldersNotificationConfigsError = CommonErrors;

export const listFoldersNotificationConfigs = API.makePaginated(() => ({
  input: ListFoldersNotificationConfigsRequest,
  output: ListFoldersNotificationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a notification config. The following update fields are allowed: description, pubsub_topic, streaming_config.filter */
export interface PatchFoldersNotificationConfigsRequest {
  /** The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket". */
  name: string;
  /** The FieldMask to use when updating the notification config. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const PatchFoldersNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/notificationConfigs/{notificationConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersNotificationConfigsRequest>;

export type PatchFoldersNotificationConfigsResponse = NotificationConfig;
export const PatchFoldersNotificationConfigsResponse = NotificationConfig;

export type PatchFoldersNotificationConfigsError = CommonErrors;

export const patchFoldersNotificationConfigs: API.OperationMethod<PatchFoldersNotificationConfigsRequest, PatchFoldersNotificationConfigsResponse, PatchFoldersNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersNotificationConfigsRequest,
  output: PatchFoldersNotificationConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteFoldersLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteFoldersLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsMuteConfigsRequest>;

export type DeleteFoldersLocationsMuteConfigsResponse = Empty;
export const DeleteFoldersLocationsMuteConfigsResponse = Empty;

export type DeleteFoldersLocationsMuteConfigsError = CommonErrors;

export const deleteFoldersLocationsMuteConfigs: API.OperationMethod<DeleteFoldersLocationsMuteConfigsRequest, DeleteFoldersLocationsMuteConfigsResponse, DeleteFoldersLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsMuteConfigsRequest,
  output: DeleteFoldersLocationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetFoldersLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetFoldersLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsMuteConfigsRequest>;

export type GetFoldersLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetFoldersLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetFoldersLocationsMuteConfigsError = CommonErrors;

export const getFoldersLocationsMuteConfigs: API.OperationMethod<GetFoldersLocationsMuteConfigsRequest, GetFoldersLocationsMuteConfigsResponse, GetFoldersLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsMuteConfigsRequest,
  output: GetFoldersLocationsMuteConfigsResponse,
  errors: [],
}));

/** Updates a mute config. */
export interface PatchFoldersLocationsMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchFoldersLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/locations/{locationsId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsMuteConfigsRequest>;

export type PatchFoldersLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchFoldersLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchFoldersLocationsMuteConfigsError = CommonErrors;

export const patchFoldersLocationsMuteConfigs: API.OperationMethod<PatchFoldersLocationsMuteConfigsRequest, PatchFoldersLocationsMuteConfigsResponse, PatchFoldersLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsMuteConfigsRequest,
  output: PatchFoldersLocationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a BigQuery export. */
export interface GetFoldersBigQueryExportsRequest {
  /** Required. Name of the BigQuery export to retrieve. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const GetFoldersBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersBigQueryExportsRequest>;

export type GetFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const GetFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type GetFoldersBigQueryExportsError = CommonErrors;

export const getFoldersBigQueryExports: API.OperationMethod<GetFoldersBigQueryExportsRequest, GetFoldersBigQueryExportsResponse, GetFoldersBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersBigQueryExportsRequest,
  output: GetFoldersBigQueryExportsResponse,
  errors: [],
}));

/** Creates a BigQuery export. */
export interface CreateFoldersBigQueryExportsRequest {
  /** Required. The name of the parent resource of the new BigQuery export. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  bigQueryExportId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const CreateFoldersBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bigQueryExportId: Schema.optional(Schema.String).pipe(T.HttpQuery("bigQueryExportId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/bigQueryExports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersBigQueryExportsRequest>;

export type CreateFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const CreateFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type CreateFoldersBigQueryExportsError = CommonErrors;

export const createFoldersBigQueryExports: API.OperationMethod<CreateFoldersBigQueryExportsRequest, CreateFoldersBigQueryExportsResponse, CreateFoldersBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersBigQueryExportsRequest,
  output: CreateFoldersBigQueryExportsResponse,
  errors: [],
}));

/** Deletes an existing BigQuery export. */
export interface DeleteFoldersBigQueryExportsRequest {
  /** Required. The name of the BigQuery export to delete. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const DeleteFoldersBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersBigQueryExportsRequest>;

export type DeleteFoldersBigQueryExportsResponse = Empty;
export const DeleteFoldersBigQueryExportsResponse = Empty;

export type DeleteFoldersBigQueryExportsError = CommonErrors;

export const deleteFoldersBigQueryExports: API.OperationMethod<DeleteFoldersBigQueryExportsRequest, DeleteFoldersBigQueryExportsResponse, DeleteFoldersBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersBigQueryExportsRequest,
  output: DeleteFoldersBigQueryExportsResponse,
  errors: [],
}));

/** Updates a BigQuery export. */
export interface PatchFoldersBigQueryExportsRequest {
  /** The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const PatchFoldersBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/bigQueryExports/{bigQueryExportsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersBigQueryExportsRequest>;

export type PatchFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const PatchFoldersBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type PatchFoldersBigQueryExportsError = CommonErrors;

export const patchFoldersBigQueryExports: API.OperationMethod<PatchFoldersBigQueryExportsRequest, PatchFoldersBigQueryExportsResponse, PatchFoldersBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersBigQueryExportsRequest,
  output: PatchFoldersBigQueryExportsResponse,
  errors: [],
}));

/** Lists BigQuery exports. Note that when requesting BigQuery exports at a given level all exports under that level are also returned e.g. if requesting BigQuery exports under a folder, then all BigQuery exports immediately under the folder plus the ones created under the projects within the folder are returned. */
export interface ListFoldersBigQueryExportsRequest {
  /** Required. The parent, which owns the collection of BigQuery exports. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBigQueryExports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBigQueryExports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListFoldersBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/bigQueryExports" }),
  svc,
) as unknown as Schema.Schema<ListFoldersBigQueryExportsRequest>;

export type ListFoldersBigQueryExportsResponse = ListBigQueryExportsResponse;
export const ListFoldersBigQueryExportsResponse = ListBigQueryExportsResponse;

export type ListFoldersBigQueryExportsError = CommonErrors;

export const listFoldersBigQueryExports = API.makePaginated(() => ({
  input: ListFoldersBigQueryExportsRequest,
  output: ListFoldersBigQueryExportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Filters an organization's assets and groups them by their specified properties. */
export interface GroupFoldersAssetsRequest {
  /** Required. The name of the parent to group the assets by. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: GroupAssetsRequest;
}

export const GroupFoldersAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/assets:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupFoldersAssetsRequest>;

export type GroupFoldersAssetsResponse = GroupAssetsResponse;
export const GroupFoldersAssetsResponse = GroupAssetsResponse;

export type GroupFoldersAssetsError = CommonErrors;

export const groupFoldersAssets: API.OperationMethod<GroupFoldersAssetsRequest, GroupFoldersAssetsResponse, GroupFoldersAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupFoldersAssetsRequest,
  output: GroupFoldersAssetsResponse,
  errors: [],
}));

/** Lists an organization's assets. */
export interface ListFoldersAssetsRequest {
  /** Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Expression that defines the filter to apply across assets. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the Asset resource. Examples include: * name * security_center_properties.resource_name * resource_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following are the allowed field and operator combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `create_time = "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`, `>=`, `<=` * security_marks.marks: `=`, `:` * security_center_properties.resource_name: `=`, `:` * security_center_properties.resource_display_name: `=`, `:` * security_center_properties.resource_type: `=`, `:` * security_center_properties.resource_parent: `=`, `:` * security_center_properties.resource_parent_display_name: `=`, `:` * security_center_properties.resource_project: `=`, `:` * security_center_properties.resource_project_display_name: `=`, `:` * security_center_properties.resource_owners: `=`, `:` For example, `resource_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `resource_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-resource_properties.my_property : ""` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,resource_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,resource_properties.a_property" and " name desc , resource_properties.a_property " are equivalent. The following fields are supported: name update_time resource_properties security_marks.marks security_center_properties.resource_name security_center_properties.resource_display_name security_center_properties.resource_parent security_center_properties.resource_parent_display_name security_center_properties.resource_project security_center_properties.resource_project_display_name security_center_properties.resource_type */
  orderBy?: string;
  /** Time used as a reference point when filtering assets. The filter is limited to assets existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListAssetsResult's "state_change" attribute is updated to indicate whether the asset was added, removed, or remained present during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence of the asset at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the asset is removed and re-created again. Possible "state_change" values when compare_duration is specified: * "ADDED": indicates that the asset was not present at the start of compare_duration, but present at read_time. * "REMOVED": indicates that the asset was present at the start of compare_duration, but not present at read_time. * "ACTIVE": indicates that the asset was present at both the start and the end of the time period defined by compare_duration and read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all assets present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the ListAssetsResult fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListAssetsResponse`; indicates that this is a continuation of a prior `ListAssets` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListFoldersAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/assets" }),
  svc,
) as unknown as Schema.Schema<ListFoldersAssetsRequest>;

export type ListFoldersAssetsResponse = ListAssetsResponse;
export const ListFoldersAssetsResponse = ListAssetsResponse;

export type ListFoldersAssetsError = CommonErrors;

export const listFoldersAssets = API.makePaginated(() => ({
  input: ListFoldersAssetsRequest,
  output: ListFoldersAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates security marks. */
export interface UpdateSecurityMarksFoldersAssetsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksFoldersAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/assets/{assetsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksFoldersAssetsRequest>;

export type UpdateSecurityMarksFoldersAssetsResponse = SecurityMarks;
export const UpdateSecurityMarksFoldersAssetsResponse = SecurityMarks;

export type UpdateSecurityMarksFoldersAssetsError = CommonErrors;

export const updateSecurityMarksFoldersAssets: API.OperationMethod<UpdateSecurityMarksFoldersAssetsRequest, UpdateSecurityMarksFoldersAssetsResponse, UpdateSecurityMarksFoldersAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksFoldersAssetsRequest,
  output: UpdateSecurityMarksFoldersAssetsResponse,
  errors: [],
}));

/** Lists all sources belonging to an organization. */
export interface ListFoldersSourcesRequest {
  /** Required. Resource name of the parent of sources to list. Its format should be `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** The value returned by the last `ListSourcesResponse`; indicates that this is a continuation of a prior `ListSources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListFoldersSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/sources" }),
  svc,
) as unknown as Schema.Schema<ListFoldersSourcesRequest>;

export type ListFoldersSourcesResponse = ListSourcesResponse;
export const ListFoldersSourcesResponse = ListSourcesResponse;

export type ListFoldersSourcesError = CommonErrors;

export const listFoldersSources = API.makePaginated(() => ({
  input: ListFoldersSourcesRequest,
  output: ListFoldersSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Filters an organization or source's findings and groups them by their specified properties. To group across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings, /v1/folders/{folder_id}/sources/-/findings, /v1/projects/{project_id}/sources/-/findings */
export interface GroupFoldersSourcesFindingsRequest {
  /** Required. Name of the source to groupBy. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To groupBy across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-`, or `projects/{project_id}/sources/-` */
  parent: string;
  /** Request body */
  body?: GroupFindingsRequest;
}

export const GroupFoldersSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupFoldersSourcesFindingsRequest>;

export type GroupFoldersSourcesFindingsResponse = GroupFindingsResponse;
export const GroupFoldersSourcesFindingsResponse = GroupFindingsResponse;

export type GroupFoldersSourcesFindingsError = CommonErrors;

export const groupFoldersSourcesFindings: API.OperationMethod<GroupFoldersSourcesFindingsRequest, GroupFoldersSourcesFindingsResponse, GroupFoldersSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupFoldersSourcesFindingsRequest,
  output: GroupFoldersSourcesFindingsResponse,
  errors: [],
}));

/** Lists an organization or source's findings. To list across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings */
export interface ListFoldersSourcesFindingsRequest {
  /** Required. Name of the source the findings belong to. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To list across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-`, `folders/{folder_id}/sources/-` or `projects/{projects_id}/sources/-` */
  parent: string;
  /** Expression that defines the filter to apply across findings. The expression is a list of one or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. Examples include: * name * source_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category: `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time = 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`, `>=`, `<=` For example, `source_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `source_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-source_properties.my_property : ""` * resource: * resource.name: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`, `:` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,source_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,source_properties.a_property" and " name desc , source_properties.a_property " are equivalent. The following fields are supported: name parent state category resource_name event_time source_properties security_marks.marks */
  orderBy?: string;
  /** Time used as a reference point when filtering findings. The filter is limited to findings existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListFindingsResult's "state_change" attribute is updated to indicate whether the finding had its state changed, the finding's state remained unchanged, or if the finding was added in any state during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence and state of the finding at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the finding is made inactive and then active again. Possible "state_change" values when compare_duration is specified: * "CHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration, but changed its state at read_time. * "UNCHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration and did not change state at read_time. * "ADDED": indicates that the finding did not match the given filter or was not present at the start of compare_duration, but was present at read_time. * "REMOVED": indicates that the finding was present and matched the filter at the start of compare_duration, but did not match the filter at read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all findings present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the Finding fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListFindingsResponse`; indicates that this is a continuation of a prior `ListFindings` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListFoldersSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings" }),
  svc,
) as unknown as Schema.Schema<ListFoldersSourcesFindingsRequest>;

export type ListFoldersSourcesFindingsResponse = ListFindingsResponse;
export const ListFoldersSourcesFindingsResponse = ListFindingsResponse;

export type ListFoldersSourcesFindingsError = CommonErrors;

export const listFoldersSourcesFindings = API.makePaginated(() => ({
  input: ListFoldersSourcesFindingsRequest,
  output: ListFoldersSourcesFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the state of a finding. */
export interface SetStateFoldersSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetFindingStateRequest;
}

export const SetStateFoldersSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetFindingStateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings/{findingsId}:setState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetStateFoldersSourcesFindingsRequest>;

export type SetStateFoldersSourcesFindingsResponse = Finding;
export const SetStateFoldersSourcesFindingsResponse = Finding;

export type SetStateFoldersSourcesFindingsError = CommonErrors;

export const setStateFoldersSourcesFindings: API.OperationMethod<SetStateFoldersSourcesFindingsRequest, SetStateFoldersSourcesFindingsResponse, SetStateFoldersSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetStateFoldersSourcesFindingsRequest,
  output: SetStateFoldersSourcesFindingsResponse,
  errors: [],
}));

/** Updates the mute state of a finding. */
export interface SetMuteFoldersSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetMuteRequest;
}

export const SetMuteFoldersSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMuteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings/{findingsId}:setMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMuteFoldersSourcesFindingsRequest>;

export type SetMuteFoldersSourcesFindingsResponse = Finding;
export const SetMuteFoldersSourcesFindingsResponse = Finding;

export type SetMuteFoldersSourcesFindingsError = CommonErrors;

export const setMuteFoldersSourcesFindings: API.OperationMethod<SetMuteFoldersSourcesFindingsRequest, SetMuteFoldersSourcesFindingsResponse, SetMuteFoldersSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMuteFoldersSourcesFindingsRequest,
  output: SetMuteFoldersSourcesFindingsResponse,
  errors: [],
}));

/** Creates or updates a finding. The corresponding source must exist for a finding creation to succeed. */
export interface PatchFoldersSourcesFindingsRequest {
  /** The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}". */
  name: string;
  /** The FieldMask to use when updating the finding resource. This field should not be specified when creating a finding. When updating a finding, an empty mask is treated as updating all mutable fields and replacing source_properties. Individual source_properties can be added/updated by using "source_properties." in the field mask. */
  updateMask?: string;
  /** Request body */
  body?: Finding;
}

export const PatchFoldersSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Finding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings/{findingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersSourcesFindingsRequest>;

export type PatchFoldersSourcesFindingsResponse = Finding;
export const PatchFoldersSourcesFindingsResponse = Finding;

export type PatchFoldersSourcesFindingsError = CommonErrors;

export const patchFoldersSourcesFindings: API.OperationMethod<PatchFoldersSourcesFindingsRequest, PatchFoldersSourcesFindingsResponse, PatchFoldersSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersSourcesFindingsRequest,
  output: PatchFoldersSourcesFindingsResponse,
  errors: [],
}));

/** Updates security marks. */
export interface UpdateSecurityMarksFoldersSourcesFindingsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksFoldersSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings/{findingsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksFoldersSourcesFindingsRequest>;

export type UpdateSecurityMarksFoldersSourcesFindingsResponse = SecurityMarks;
export const UpdateSecurityMarksFoldersSourcesFindingsResponse = SecurityMarks;

export type UpdateSecurityMarksFoldersSourcesFindingsError = CommonErrors;

export const updateSecurityMarksFoldersSourcesFindings: API.OperationMethod<UpdateSecurityMarksFoldersSourcesFindingsRequest, UpdateSecurityMarksFoldersSourcesFindingsResponse, UpdateSecurityMarksFoldersSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksFoldersSourcesFindingsRequest,
  output: UpdateSecurityMarksFoldersSourcesFindingsResponse,
  errors: [],
}));

/** Updates external system. This is for a given finding. */
export interface PatchFoldersSourcesFindingsExternalSystemsRequest {
  /** Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira" */
  name: string;
  /** The FieldMask to use when updating the external system resource. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1ExternalSystem;
}

export const PatchFoldersSourcesFindingsExternalSystemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1ExternalSystem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/sources/{sourcesId}/findings/{findingsId}/externalSystems/{externalSystemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersSourcesFindingsExternalSystemsRequest>;

export type PatchFoldersSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;
export const PatchFoldersSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;

export type PatchFoldersSourcesFindingsExternalSystemsError = CommonErrors;

export const patchFoldersSourcesFindingsExternalSystems: API.OperationMethod<PatchFoldersSourcesFindingsExternalSystemsRequest, PatchFoldersSourcesFindingsExternalSystemsResponse, PatchFoldersSourcesFindingsExternalSystemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersSourcesFindingsExternalSystemsRequest,
  output: PatchFoldersSourcesFindingsExternalSystemsResponse,
  errors: [],
}));

/** Validates the given Event Threat Detection custom module. */
export interface ValidateCustomModuleFoldersEventThreatDetectionSettingsRequest {
  /** Required. Resource name of the parent to validate the Custom Module under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: ValidateEventThreatDetectionCustomModuleRequest;
}

export const ValidateCustomModuleFoldersEventThreatDetectionSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateEventThreatDetectionCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/eventThreatDetectionSettings:validateCustomModule", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateCustomModuleFoldersEventThreatDetectionSettingsRequest>;

export type ValidateCustomModuleFoldersEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;
export const ValidateCustomModuleFoldersEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;

export type ValidateCustomModuleFoldersEventThreatDetectionSettingsError = CommonErrors;

export const validateCustomModuleFoldersEventThreatDetectionSettings: API.OperationMethod<ValidateCustomModuleFoldersEventThreatDetectionSettingsRequest, ValidateCustomModuleFoldersEventThreatDetectionSettingsResponse, ValidateCustomModuleFoldersEventThreatDetectionSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateCustomModuleFoldersEventThreatDetectionSettingsRequest,
  output: ValidateCustomModuleFoldersEventThreatDetectionSettingsResponse,
  errors: [],
}));

/** Creates a resident Event Threat Detection custom module at the scope of the given Resource Manager parent, and also creates inherited custom modules for all descendants of the given parent. These modules are enabled by default. */
export interface CreateFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. The new custom module's parent. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const CreateFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type CreateFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const CreateFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type CreateFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const createFoldersEventThreatDetectionSettingsCustomModules: API.OperationMethod<CreateFoldersEventThreatDetectionSettingsCustomModulesRequest, CreateFoldersEventThreatDetectionSettingsCustomModulesResponse, CreateFoldersEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: CreateFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified Event Threat Detection custom module and all of its descendants in the Resource Manager hierarchy. This method is only supported for resident custom modules. */
export interface DeleteFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const DeleteFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type DeleteFoldersEventThreatDetectionSettingsCustomModulesResponse = Empty;
export const DeleteFoldersEventThreatDetectionSettingsCustomModulesResponse = Empty;

export type DeleteFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const deleteFoldersEventThreatDetectionSettingsCustomModules: API.OperationMethod<DeleteFoldersEventThreatDetectionSettingsCustomModulesRequest, DeleteFoldersEventThreatDetectionSettingsCustomModulesResponse, DeleteFoldersEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: DeleteFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an Event Threat Detection custom module. */
export interface GetFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const GetFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type GetFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const GetFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type GetFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const getFoldersEventThreatDetectionSettingsCustomModules: API.OperationMethod<GetFoldersEventThreatDetectionSettingsCustomModulesRequest, GetFoldersEventThreatDetectionSettingsCustomModulesResponse, GetFoldersEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: GetFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Lists all resident Event Threat Detection custom modules under the given Resource Manager parent and its descendants. */
export interface ListDescendantFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListDescendantEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDescendantEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListDescendantFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type ListDescendantFoldersEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;
export const ListDescendantFoldersEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;

export type ListDescendantFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listDescendantFoldersEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: ListDescendantFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all Event Threat Detection custom modules for the given Resource Manager parent. This includes resident modules defined at the scope of the parent along with modules inherited from ancestors. */
export interface ListFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type ListFoldersEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;
export const ListFoldersEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;

export type ListFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listFoldersEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: ListFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the Event Threat Detection custom module with the given name based on the given update mask. Updating the enablement state is supported for both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name or configuration of a module is supported for resident modules only. The type of a module cannot be changed. */
export interface PatchFoldersEventThreatDetectionSettingsCustomModulesRequest {
  /** Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const PatchFoldersEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersEventThreatDetectionSettingsCustomModulesRequest>;

export type PatchFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const PatchFoldersEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type PatchFoldersEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const patchFoldersEventThreatDetectionSettingsCustomModules: API.OperationMethod<PatchFoldersEventThreatDetectionSettingsCustomModulesRequest, PatchFoldersEventThreatDetectionSettingsCustomModulesResponse, PatchFoldersEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersEventThreatDetectionSettingsCustomModulesRequest,
  output: PatchFoldersEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an effective Event Threat Detection custom module at the given level. */
export interface GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. The resource name of the effective Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. */
  name: string;
}

export const GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;
export const GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;

export type GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const getFoldersEventThreatDetectionSettingsEffectiveCustomModules: API.OperationMethod<GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest, GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse, GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: GetFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Lists all effective Event Threat Detection custom modules for the given parent. This includes resident modules defined at the scope of the parent along with modules inherited from its ancestors. */
export interface ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the parent to list custom modules for. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEffectiveEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEffectiveEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/eventThreatDetectionSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;
export const ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;

export type ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const listFoldersEventThreatDetectionSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: ListFoldersEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Kicks off an LRO to bulk mute findings for a parent based on a filter. The parent can be either an organization, folder or project. The findings matched by the filter will be muted after the LRO is done. */
export interface BulkMuteProjectsFindingsRequest {
  /** Required. The parent, at which bulk action needs to be applied. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: BulkMuteFindingsRequest;
}

export const BulkMuteProjectsFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BulkMuteFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/findings:bulkMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkMuteProjectsFindingsRequest>;

export type BulkMuteProjectsFindingsResponse = Operation;
export const BulkMuteProjectsFindingsResponse = Operation;

export type BulkMuteProjectsFindingsError = CommonErrors;

export const bulkMuteProjectsFindings: API.OperationMethod<BulkMuteProjectsFindingsRequest, BulkMuteProjectsFindingsResponse, BulkMuteProjectsFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkMuteProjectsFindingsRequest,
  output: BulkMuteProjectsFindingsResponse,
  errors: [],
}));

/** Creates a resident SecurityHealthAnalyticsCustomModule at the scope of the given CRM parent, and also creates inherited SecurityHealthAnalyticsCustomModules for all CRM descendants of the given parent. These modules are enabled by default. */
export interface CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Resource name of the new custom module's parent. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const createProjectsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest, CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse, CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: CreateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified SecurityHealthAnalyticsCustomModule and all of its descendants in the CRM hierarchy. This method is only supported for resident custom modules. */
export interface DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;
export const DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;

export type DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const deleteProjectsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest, DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse, DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: DeleteProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves a SecurityHealthAnalyticsCustomModule. */
export interface GetProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const GetProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type GetProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const GetProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type GetProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const getProjectsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<GetProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest, GetProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse, GetProjectsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: GetProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all resident SecurityHealthAnalyticsCustomModules under the given CRM parent and all of the parent’s CRM descendants. */
export interface ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list descendant custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;
export const ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;

export type ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listDescendantProjectsSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListDescendantProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a list of all SecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;
export const ListProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;

export type ListProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listProjectsSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Simulates a given SecurityHealthAnalyticsCustomModule and Resource. */
export interface SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. The relative resource name of the organization, project, or folder. For more information about relative resource names, see [Relative Resource Name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) Example: `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: SimulateSecurityHealthAnalyticsCustomModuleRequest;
}

export const SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SimulateSecurityHealthAnalyticsCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules:simulate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;
export const SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;

export type SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const simulateProjectsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest, SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse, SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: SimulateProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Updates the SecurityHealthAnalyticsCustomModule under the given name based on the given update mask. Updating the enablement state is supported on both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name and custom config of a module is supported on resident modules only. */
export interface PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits. */
  name: string;
  /** The list of fields to be updated. The only fields that can be updated are `enablement_state` and `custom_config`. If empty or set to the wildcard value `*`, both `enablement_state` and `custom_config` are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const patchProjectsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest, PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse, PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: PatchProjectsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves an EffectiveSecurityHealthAnalyticsCustomModule. */
export interface GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the effective custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}` */
  name: string;
}

export const GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;
export const GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;

export type GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const getProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModules: API.OperationMethod<GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest, GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse, GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: GetProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all EffectiveSecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of parent to list effective custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/securityHealthAnalyticsSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;
export const ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;

export type ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const listProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: ListProjectsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a mute config. */
export interface CreateProjectsMuteConfigsRequest {
  /** Required. Resource name of the new mute configs's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  muteConfigId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const CreateProjectsMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  muteConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("muteConfigId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/muteConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsMuteConfigsRequest>;

export type CreateProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const CreateProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type CreateProjectsMuteConfigsError = CommonErrors;

export const createProjectsMuteConfigs: API.OperationMethod<CreateProjectsMuteConfigsRequest, CreateProjectsMuteConfigsResponse, CreateProjectsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsMuteConfigsRequest,
  output: CreateProjectsMuteConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteProjectsMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteProjectsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsMuteConfigsRequest>;

export type DeleteProjectsMuteConfigsResponse = Empty;
export const DeleteProjectsMuteConfigsResponse = Empty;

export type DeleteProjectsMuteConfigsError = CommonErrors;

export const deleteProjectsMuteConfigs: API.OperationMethod<DeleteProjectsMuteConfigsRequest, DeleteProjectsMuteConfigsResponse, DeleteProjectsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsMuteConfigsRequest,
  output: DeleteProjectsMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetProjectsMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetProjectsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsMuteConfigsRequest>;

export type GetProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetProjectsMuteConfigsError = CommonErrors;

export const getProjectsMuteConfigs: API.OperationMethod<GetProjectsMuteConfigsRequest, GetProjectsMuteConfigsResponse, GetProjectsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsMuteConfigsRequest,
  output: GetProjectsMuteConfigsResponse,
  errors: [],
}));

/** Lists mute configs. */
export interface ListProjectsMuteConfigsRequest {
  /** Required. The parent, which owns the collection of mute configs. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListMuteConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMuteConfigs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/muteConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsMuteConfigsRequest>;

export type ListProjectsMuteConfigsResponse = ListMuteConfigsResponse;
export const ListProjectsMuteConfigsResponse = ListMuteConfigsResponse;

export type ListProjectsMuteConfigsError = CommonErrors;

export const listProjectsMuteConfigs = API.makePaginated(() => ({
  input: ListProjectsMuteConfigsRequest,
  output: ListProjectsMuteConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a mute config. */
export interface PatchProjectsMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchProjectsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsMuteConfigsRequest>;

export type PatchProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchProjectsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchProjectsMuteConfigsError = CommonErrors;

export const patchProjectsMuteConfigs: API.OperationMethod<PatchProjectsMuteConfigsRequest, PatchProjectsMuteConfigsResponse, PatchProjectsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsMuteConfigsRequest,
  output: PatchProjectsMuteConfigsResponse,
  errors: [],
}));

/** Creates a notification config. */
export interface CreateProjectsNotificationConfigsRequest {
  /** Required. Resource name of the new notification config's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must be between 1 and 128 characters and contain alphanumeric characters, underscores, or hyphens only. */
  configId?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const CreateProjectsNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsNotificationConfigsRequest>;

export type CreateProjectsNotificationConfigsResponse = NotificationConfig;
export const CreateProjectsNotificationConfigsResponse = NotificationConfig;

export type CreateProjectsNotificationConfigsError = CommonErrors;

export const createProjectsNotificationConfigs: API.OperationMethod<CreateProjectsNotificationConfigsRequest, CreateProjectsNotificationConfigsResponse, CreateProjectsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsNotificationConfigsRequest,
  output: CreateProjectsNotificationConfigsResponse,
  errors: [],
}));

/** Deletes a notification config. */
export interface DeleteProjectsNotificationConfigsRequest {
  /** Required. Name of the notification config to delete. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const DeleteProjectsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsNotificationConfigsRequest>;

export type DeleteProjectsNotificationConfigsResponse = Empty;
export const DeleteProjectsNotificationConfigsResponse = Empty;

export type DeleteProjectsNotificationConfigsError = CommonErrors;

export const deleteProjectsNotificationConfigs: API.OperationMethod<DeleteProjectsNotificationConfigsRequest, DeleteProjectsNotificationConfigsResponse, DeleteProjectsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsNotificationConfigsRequest,
  output: DeleteProjectsNotificationConfigsResponse,
  errors: [],
}));

/** Gets a notification config. */
export interface GetProjectsNotificationConfigsRequest {
  /** Required. Name of the notification config to get. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const GetProjectsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsNotificationConfigsRequest>;

export type GetProjectsNotificationConfigsResponse = NotificationConfig;
export const GetProjectsNotificationConfigsResponse = NotificationConfig;

export type GetProjectsNotificationConfigsError = CommonErrors;

export const getProjectsNotificationConfigs: API.OperationMethod<GetProjectsNotificationConfigsRequest, GetProjectsNotificationConfigsResponse, GetProjectsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsNotificationConfigsRequest,
  output: GetProjectsNotificationConfigsResponse,
  errors: [],
}));

/** Lists notification configs. */
export interface ListProjectsNotificationConfigsRequest {
  /** Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]". */
  parent: string;
  /** The value returned by the last `ListNotificationConfigsResponse`; indicates that this is a continuation of a prior `ListNotificationConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListProjectsNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/notificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotificationConfigsRequest>;

export type ListProjectsNotificationConfigsResponse = ListNotificationConfigsResponse;
export const ListProjectsNotificationConfigsResponse = ListNotificationConfigsResponse;

export type ListProjectsNotificationConfigsError = CommonErrors;

export const listProjectsNotificationConfigs = API.makePaginated(() => ({
  input: ListProjectsNotificationConfigsRequest,
  output: ListProjectsNotificationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a notification config. The following update fields are allowed: description, pubsub_topic, streaming_config.filter */
export interface PatchProjectsNotificationConfigsRequest {
  /** The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket". */
  name: string;
  /** The FieldMask to use when updating the notification config. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const PatchProjectsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/notificationConfigs/{notificationConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsNotificationConfigsRequest>;

export type PatchProjectsNotificationConfigsResponse = NotificationConfig;
export const PatchProjectsNotificationConfigsResponse = NotificationConfig;

export type PatchProjectsNotificationConfigsError = CommonErrors;

export const patchProjectsNotificationConfigs: API.OperationMethod<PatchProjectsNotificationConfigsRequest, PatchProjectsNotificationConfigsResponse, PatchProjectsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsNotificationConfigsRequest,
  output: PatchProjectsNotificationConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteProjectsLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteProjectsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMuteConfigsRequest>;

export type DeleteProjectsLocationsMuteConfigsResponse = Empty;
export const DeleteProjectsLocationsMuteConfigsResponse = Empty;

export type DeleteProjectsLocationsMuteConfigsError = CommonErrors;

export const deleteProjectsLocationsMuteConfigs: API.OperationMethod<DeleteProjectsLocationsMuteConfigsRequest, DeleteProjectsLocationsMuteConfigsResponse, DeleteProjectsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMuteConfigsRequest,
  output: DeleteProjectsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetProjectsLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetProjectsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMuteConfigsRequest>;

export type GetProjectsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetProjectsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetProjectsLocationsMuteConfigsError = CommonErrors;

export const getProjectsLocationsMuteConfigs: API.OperationMethod<GetProjectsLocationsMuteConfigsRequest, GetProjectsLocationsMuteConfigsResponse, GetProjectsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMuteConfigsRequest,
  output: GetProjectsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Updates a mute config. */
export interface PatchProjectsLocationsMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchProjectsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMuteConfigsRequest>;

export type PatchProjectsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchProjectsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchProjectsLocationsMuteConfigsError = CommonErrors;

export const patchProjectsLocationsMuteConfigs: API.OperationMethod<PatchProjectsLocationsMuteConfigsRequest, PatchProjectsLocationsMuteConfigsResponse, PatchProjectsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMuteConfigsRequest,
  output: PatchProjectsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a BigQuery export. */
export interface GetProjectsBigQueryExportsRequest {
  /** Required. Name of the BigQuery export to retrieve. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const GetProjectsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsBigQueryExportsRequest>;

export type GetProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const GetProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type GetProjectsBigQueryExportsError = CommonErrors;

export const getProjectsBigQueryExports: API.OperationMethod<GetProjectsBigQueryExportsRequest, GetProjectsBigQueryExportsResponse, GetProjectsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsBigQueryExportsRequest,
  output: GetProjectsBigQueryExportsResponse,
  errors: [],
}));

/** Creates a BigQuery export. */
export interface CreateProjectsBigQueryExportsRequest {
  /** Required. The name of the parent resource of the new BigQuery export. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  bigQueryExportId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const CreateProjectsBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bigQueryExportId: Schema.optional(Schema.String).pipe(T.HttpQuery("bigQueryExportId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/bigQueryExports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsBigQueryExportsRequest>;

export type CreateProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const CreateProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type CreateProjectsBigQueryExportsError = CommonErrors;

export const createProjectsBigQueryExports: API.OperationMethod<CreateProjectsBigQueryExportsRequest, CreateProjectsBigQueryExportsResponse, CreateProjectsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsBigQueryExportsRequest,
  output: CreateProjectsBigQueryExportsResponse,
  errors: [],
}));

/** Deletes an existing BigQuery export. */
export interface DeleteProjectsBigQueryExportsRequest {
  /** Required. The name of the BigQuery export to delete. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const DeleteProjectsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsBigQueryExportsRequest>;

export type DeleteProjectsBigQueryExportsResponse = Empty;
export const DeleteProjectsBigQueryExportsResponse = Empty;

export type DeleteProjectsBigQueryExportsError = CommonErrors;

export const deleteProjectsBigQueryExports: API.OperationMethod<DeleteProjectsBigQueryExportsRequest, DeleteProjectsBigQueryExportsResponse, DeleteProjectsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsBigQueryExportsRequest,
  output: DeleteProjectsBigQueryExportsResponse,
  errors: [],
}));

/** Updates a BigQuery export. */
export interface PatchProjectsBigQueryExportsRequest {
  /** The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const PatchProjectsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/bigQueryExports/{bigQueryExportsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsBigQueryExportsRequest>;

export type PatchProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const PatchProjectsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type PatchProjectsBigQueryExportsError = CommonErrors;

export const patchProjectsBigQueryExports: API.OperationMethod<PatchProjectsBigQueryExportsRequest, PatchProjectsBigQueryExportsResponse, PatchProjectsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsBigQueryExportsRequest,
  output: PatchProjectsBigQueryExportsResponse,
  errors: [],
}));

/** Lists BigQuery exports. Note that when requesting BigQuery exports at a given level all exports under that level are also returned e.g. if requesting BigQuery exports under a folder, then all BigQuery exports immediately under the folder plus the ones created under the projects within the folder are returned. */
export interface ListProjectsBigQueryExportsRequest {
  /** Required. The parent, which owns the collection of BigQuery exports. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBigQueryExports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBigQueryExports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/bigQueryExports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsBigQueryExportsRequest>;

export type ListProjectsBigQueryExportsResponse = ListBigQueryExportsResponse;
export const ListProjectsBigQueryExportsResponse = ListBigQueryExportsResponse;

export type ListProjectsBigQueryExportsError = CommonErrors;

export const listProjectsBigQueryExports = API.makePaginated(() => ({
  input: ListProjectsBigQueryExportsRequest,
  output: ListProjectsBigQueryExportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Filters an organization's assets and groups them by their specified properties. */
export interface GroupProjectsAssetsRequest {
  /** Required. The name of the parent to group the assets by. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: GroupAssetsRequest;
}

export const GroupProjectsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/assets:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupProjectsAssetsRequest>;

export type GroupProjectsAssetsResponse = GroupAssetsResponse;
export const GroupProjectsAssetsResponse = GroupAssetsResponse;

export type GroupProjectsAssetsError = CommonErrors;

export const groupProjectsAssets: API.OperationMethod<GroupProjectsAssetsRequest, GroupProjectsAssetsResponse, GroupProjectsAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupProjectsAssetsRequest,
  output: GroupProjectsAssetsResponse,
  errors: [],
}));

/** Lists an organization's assets. */
export interface ListProjectsAssetsRequest {
  /** Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Expression that defines the filter to apply across assets. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the Asset resource. Examples include: * name * security_center_properties.resource_name * resource_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following are the allowed field and operator combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `create_time = "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`, `>=`, `<=` * security_marks.marks: `=`, `:` * security_center_properties.resource_name: `=`, `:` * security_center_properties.resource_display_name: `=`, `:` * security_center_properties.resource_type: `=`, `:` * security_center_properties.resource_parent: `=`, `:` * security_center_properties.resource_parent_display_name: `=`, `:` * security_center_properties.resource_project: `=`, `:` * security_center_properties.resource_project_display_name: `=`, `:` * security_center_properties.resource_owners: `=`, `:` For example, `resource_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `resource_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-resource_properties.my_property : ""` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,resource_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,resource_properties.a_property" and " name desc , resource_properties.a_property " are equivalent. The following fields are supported: name update_time resource_properties security_marks.marks security_center_properties.resource_name security_center_properties.resource_display_name security_center_properties.resource_parent security_center_properties.resource_parent_display_name security_center_properties.resource_project security_center_properties.resource_project_display_name security_center_properties.resource_type */
  orderBy?: string;
  /** Time used as a reference point when filtering assets. The filter is limited to assets existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListAssetsResult's "state_change" attribute is updated to indicate whether the asset was added, removed, or remained present during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence of the asset at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the asset is removed and re-created again. Possible "state_change" values when compare_duration is specified: * "ADDED": indicates that the asset was not present at the start of compare_duration, but present at read_time. * "REMOVED": indicates that the asset was present at the start of compare_duration, but not present at read_time. * "ACTIVE": indicates that the asset was present at both the start and the end of the time period defined by compare_duration and read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all assets present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the ListAssetsResult fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListAssetsResponse`; indicates that this is a continuation of a prior `ListAssets` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListProjectsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/assets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAssetsRequest>;

export type ListProjectsAssetsResponse = ListAssetsResponse;
export const ListProjectsAssetsResponse = ListAssetsResponse;

export type ListProjectsAssetsError = CommonErrors;

export const listProjectsAssets = API.makePaginated(() => ({
  input: ListProjectsAssetsRequest,
  output: ListProjectsAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates security marks. */
export interface UpdateSecurityMarksProjectsAssetsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksProjectsAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/assets/{assetsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksProjectsAssetsRequest>;

export type UpdateSecurityMarksProjectsAssetsResponse = SecurityMarks;
export const UpdateSecurityMarksProjectsAssetsResponse = SecurityMarks;

export type UpdateSecurityMarksProjectsAssetsError = CommonErrors;

export const updateSecurityMarksProjectsAssets: API.OperationMethod<UpdateSecurityMarksProjectsAssetsRequest, UpdateSecurityMarksProjectsAssetsResponse, UpdateSecurityMarksProjectsAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksProjectsAssetsRequest,
  output: UpdateSecurityMarksProjectsAssetsResponse,
  errors: [],
}));

/** Lists all sources belonging to an organization. */
export interface ListProjectsSourcesRequest {
  /** Required. Resource name of the parent of sources to list. Its format should be `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** The value returned by the last `ListSourcesResponse`; indicates that this is a continuation of a prior `ListSources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListProjectsSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/sources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSourcesRequest>;

export type ListProjectsSourcesResponse = ListSourcesResponse;
export const ListProjectsSourcesResponse = ListSourcesResponse;

export type ListProjectsSourcesError = CommonErrors;

export const listProjectsSources = API.makePaginated(() => ({
  input: ListProjectsSourcesRequest,
  output: ListProjectsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Filters an organization or source's findings and groups them by their specified properties. To group across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings, /v1/folders/{folder_id}/sources/-/findings, /v1/projects/{project_id}/sources/-/findings */
export interface GroupProjectsSourcesFindingsRequest {
  /** Required. Name of the source to groupBy. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To groupBy across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-`, or `projects/{project_id}/sources/-` */
  parent: string;
  /** Request body */
  body?: GroupFindingsRequest;
}

export const GroupProjectsSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupProjectsSourcesFindingsRequest>;

export type GroupProjectsSourcesFindingsResponse = GroupFindingsResponse;
export const GroupProjectsSourcesFindingsResponse = GroupFindingsResponse;

export type GroupProjectsSourcesFindingsError = CommonErrors;

export const groupProjectsSourcesFindings: API.OperationMethod<GroupProjectsSourcesFindingsRequest, GroupProjectsSourcesFindingsResponse, GroupProjectsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupProjectsSourcesFindingsRequest,
  output: GroupProjectsSourcesFindingsResponse,
  errors: [],
}));

/** Lists an organization or source's findings. To list across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings */
export interface ListProjectsSourcesFindingsRequest {
  /** Required. Name of the source the findings belong to. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To list across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-`, `folders/{folder_id}/sources/-` or `projects/{projects_id}/sources/-` */
  parent: string;
  /** Expression that defines the filter to apply across findings. The expression is a list of one or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. Examples include: * name * source_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category: `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time = 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`, `>=`, `<=` For example, `source_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `source_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-source_properties.my_property : ""` * resource: * resource.name: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`, `:` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,source_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,source_properties.a_property" and " name desc , source_properties.a_property " are equivalent. The following fields are supported: name parent state category resource_name event_time source_properties security_marks.marks */
  orderBy?: string;
  /** Time used as a reference point when filtering findings. The filter is limited to findings existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListFindingsResult's "state_change" attribute is updated to indicate whether the finding had its state changed, the finding's state remained unchanged, or if the finding was added in any state during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence and state of the finding at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the finding is made inactive and then active again. Possible "state_change" values when compare_duration is specified: * "CHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration, but changed its state at read_time. * "UNCHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration and did not change state at read_time. * "ADDED": indicates that the finding did not match the given filter or was not present at the start of compare_duration, but was present at read_time. * "REMOVED": indicates that the finding was present and matched the filter at the start of compare_duration, but did not match the filter at read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all findings present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the Finding fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListFindingsResponse`; indicates that this is a continuation of a prior `ListFindings` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListProjectsSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSourcesFindingsRequest>;

export type ListProjectsSourcesFindingsResponse = ListFindingsResponse;
export const ListProjectsSourcesFindingsResponse = ListFindingsResponse;

export type ListProjectsSourcesFindingsError = CommonErrors;

export const listProjectsSourcesFindings = API.makePaginated(() => ({
  input: ListProjectsSourcesFindingsRequest,
  output: ListProjectsSourcesFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the state of a finding. */
export interface SetStateProjectsSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetFindingStateRequest;
}

export const SetStateProjectsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetFindingStateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings/{findingsId}:setState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetStateProjectsSourcesFindingsRequest>;

export type SetStateProjectsSourcesFindingsResponse = Finding;
export const SetStateProjectsSourcesFindingsResponse = Finding;

export type SetStateProjectsSourcesFindingsError = CommonErrors;

export const setStateProjectsSourcesFindings: API.OperationMethod<SetStateProjectsSourcesFindingsRequest, SetStateProjectsSourcesFindingsResponse, SetStateProjectsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetStateProjectsSourcesFindingsRequest,
  output: SetStateProjectsSourcesFindingsResponse,
  errors: [],
}));

/** Updates the mute state of a finding. */
export interface SetMuteProjectsSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetMuteRequest;
}

export const SetMuteProjectsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMuteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings/{findingsId}:setMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMuteProjectsSourcesFindingsRequest>;

export type SetMuteProjectsSourcesFindingsResponse = Finding;
export const SetMuteProjectsSourcesFindingsResponse = Finding;

export type SetMuteProjectsSourcesFindingsError = CommonErrors;

export const setMuteProjectsSourcesFindings: API.OperationMethod<SetMuteProjectsSourcesFindingsRequest, SetMuteProjectsSourcesFindingsResponse, SetMuteProjectsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMuteProjectsSourcesFindingsRequest,
  output: SetMuteProjectsSourcesFindingsResponse,
  errors: [],
}));

/** Creates or updates a finding. The corresponding source must exist for a finding creation to succeed. */
export interface PatchProjectsSourcesFindingsRequest {
  /** The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}". */
  name: string;
  /** The FieldMask to use when updating the finding resource. This field should not be specified when creating a finding. When updating a finding, an empty mask is treated as updating all mutable fields and replacing source_properties. Individual source_properties can be added/updated by using "source_properties." in the field mask. */
  updateMask?: string;
  /** Request body */
  body?: Finding;
}

export const PatchProjectsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Finding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings/{findingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSourcesFindingsRequest>;

export type PatchProjectsSourcesFindingsResponse = Finding;
export const PatchProjectsSourcesFindingsResponse = Finding;

export type PatchProjectsSourcesFindingsError = CommonErrors;

export const patchProjectsSourcesFindings: API.OperationMethod<PatchProjectsSourcesFindingsRequest, PatchProjectsSourcesFindingsResponse, PatchProjectsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSourcesFindingsRequest,
  output: PatchProjectsSourcesFindingsResponse,
  errors: [],
}));

/** Updates security marks. */
export interface UpdateSecurityMarksProjectsSourcesFindingsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksProjectsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings/{findingsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksProjectsSourcesFindingsRequest>;

export type UpdateSecurityMarksProjectsSourcesFindingsResponse = SecurityMarks;
export const UpdateSecurityMarksProjectsSourcesFindingsResponse = SecurityMarks;

export type UpdateSecurityMarksProjectsSourcesFindingsError = CommonErrors;

export const updateSecurityMarksProjectsSourcesFindings: API.OperationMethod<UpdateSecurityMarksProjectsSourcesFindingsRequest, UpdateSecurityMarksProjectsSourcesFindingsResponse, UpdateSecurityMarksProjectsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksProjectsSourcesFindingsRequest,
  output: UpdateSecurityMarksProjectsSourcesFindingsResponse,
  errors: [],
}));

/** Updates external system. This is for a given finding. */
export interface PatchProjectsSourcesFindingsExternalSystemsRequest {
  /** Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira" */
  name: string;
  /** The FieldMask to use when updating the external system resource. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1ExternalSystem;
}

export const PatchProjectsSourcesFindingsExternalSystemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1ExternalSystem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/sources/{sourcesId}/findings/{findingsId}/externalSystems/{externalSystemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSourcesFindingsExternalSystemsRequest>;

export type PatchProjectsSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;
export const PatchProjectsSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;

export type PatchProjectsSourcesFindingsExternalSystemsError = CommonErrors;

export const patchProjectsSourcesFindingsExternalSystems: API.OperationMethod<PatchProjectsSourcesFindingsExternalSystemsRequest, PatchProjectsSourcesFindingsExternalSystemsResponse, PatchProjectsSourcesFindingsExternalSystemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSourcesFindingsExternalSystemsRequest,
  output: PatchProjectsSourcesFindingsExternalSystemsResponse,
  errors: [],
}));

/** Validates the given Event Threat Detection custom module. */
export interface ValidateCustomModuleProjectsEventThreatDetectionSettingsRequest {
  /** Required. Resource name of the parent to validate the Custom Module under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: ValidateEventThreatDetectionCustomModuleRequest;
}

export const ValidateCustomModuleProjectsEventThreatDetectionSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateEventThreatDetectionCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/eventThreatDetectionSettings:validateCustomModule", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateCustomModuleProjectsEventThreatDetectionSettingsRequest>;

export type ValidateCustomModuleProjectsEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;
export const ValidateCustomModuleProjectsEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;

export type ValidateCustomModuleProjectsEventThreatDetectionSettingsError = CommonErrors;

export const validateCustomModuleProjectsEventThreatDetectionSettings: API.OperationMethod<ValidateCustomModuleProjectsEventThreatDetectionSettingsRequest, ValidateCustomModuleProjectsEventThreatDetectionSettingsResponse, ValidateCustomModuleProjectsEventThreatDetectionSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateCustomModuleProjectsEventThreatDetectionSettingsRequest,
  output: ValidateCustomModuleProjectsEventThreatDetectionSettingsResponse,
  errors: [],
}));

/** Creates a resident Event Threat Detection custom module at the scope of the given Resource Manager parent, and also creates inherited custom modules for all descendants of the given parent. These modules are enabled by default. */
export interface CreateProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. The new custom module's parent. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const CreateProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type CreateProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const CreateProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type CreateProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const createProjectsEventThreatDetectionSettingsCustomModules: API.OperationMethod<CreateProjectsEventThreatDetectionSettingsCustomModulesRequest, CreateProjectsEventThreatDetectionSettingsCustomModulesResponse, CreateProjectsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: CreateProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified Event Threat Detection custom module and all of its descendants in the Resource Manager hierarchy. This method is only supported for resident custom modules. */
export interface DeleteProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const DeleteProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type DeleteProjectsEventThreatDetectionSettingsCustomModulesResponse = Empty;
export const DeleteProjectsEventThreatDetectionSettingsCustomModulesResponse = Empty;

export type DeleteProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const deleteProjectsEventThreatDetectionSettingsCustomModules: API.OperationMethod<DeleteProjectsEventThreatDetectionSettingsCustomModulesRequest, DeleteProjectsEventThreatDetectionSettingsCustomModulesResponse, DeleteProjectsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: DeleteProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an Event Threat Detection custom module. */
export interface GetProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const GetProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type GetProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const GetProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type GetProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const getProjectsEventThreatDetectionSettingsCustomModules: API.OperationMethod<GetProjectsEventThreatDetectionSettingsCustomModulesRequest, GetProjectsEventThreatDetectionSettingsCustomModulesResponse, GetProjectsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: GetProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Lists all resident Event Threat Detection custom modules under the given Resource Manager parent and its descendants. */
export interface ListDescendantProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListDescendantEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDescendantEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListDescendantProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type ListDescendantProjectsEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;
export const ListDescendantProjectsEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;

export type ListDescendantProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listDescendantProjectsEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: ListDescendantProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all Event Threat Detection custom modules for the given Resource Manager parent. This includes resident modules defined at the scope of the parent along with modules inherited from ancestors. */
export interface ListProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type ListProjectsEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;
export const ListProjectsEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;

export type ListProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listProjectsEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: ListProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the Event Threat Detection custom module with the given name based on the given update mask. Updating the enablement state is supported for both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name or configuration of a module is supported for resident modules only. The type of a module cannot be changed. */
export interface PatchProjectsEventThreatDetectionSettingsCustomModulesRequest {
  /** Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const PatchProjectsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsEventThreatDetectionSettingsCustomModulesRequest>;

export type PatchProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const PatchProjectsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type PatchProjectsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const patchProjectsEventThreatDetectionSettingsCustomModules: API.OperationMethod<PatchProjectsEventThreatDetectionSettingsCustomModulesRequest, PatchProjectsEventThreatDetectionSettingsCustomModulesResponse, PatchProjectsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsEventThreatDetectionSettingsCustomModulesRequest,
  output: PatchProjectsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an effective Event Threat Detection custom module at the given level. */
export interface GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. The resource name of the effective Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. */
  name: string;
}

export const GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;
export const GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;

export type GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const getProjectsEventThreatDetectionSettingsEffectiveCustomModules: API.OperationMethod<GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest, GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse, GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: GetProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Lists all effective Event Threat Detection custom modules for the given parent. This includes resident modules defined at the scope of the parent along with modules inherited from its ancestors. */
export interface ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the parent to list custom modules for. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEffectiveEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEffectiveEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/eventThreatDetectionSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;
export const ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;

export type ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const listProjectsEventThreatDetectionSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: ListProjectsEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the settings for an organization. */
export interface GetOrganizationSettingsOrganizationsRequest {
  /** Required. Name of the organization to get organization settings for. Its format is `organizations/[organization_id]/organizationSettings`. */
  name: string;
}

export const GetOrganizationSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/organizationSettings" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationSettingsOrganizationsRequest>;

export type GetOrganizationSettingsOrganizationsResponse = OrganizationSettings;
export const GetOrganizationSettingsOrganizationsResponse = OrganizationSettings;

export type GetOrganizationSettingsOrganizationsError = CommonErrors;

export const getOrganizationSettingsOrganizations: API.OperationMethod<GetOrganizationSettingsOrganizationsRequest, GetOrganizationSettingsOrganizationsResponse, GetOrganizationSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationSettingsOrganizationsRequest,
  output: GetOrganizationSettingsOrganizationsResponse,
  errors: [],
}));

/** Updates an organization's settings. */
export interface UpdateOrganizationSettingsOrganizationsRequest {
  /** The relative resource name of the settings. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/organizationSettings". */
  name: string;
  /** The FieldMask to use when updating the settings resource. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: OrganizationSettings;
}

export const UpdateOrganizationSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OrganizationSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/organizationSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateOrganizationSettingsOrganizationsRequest>;

export type UpdateOrganizationSettingsOrganizationsResponse = OrganizationSettings;
export const UpdateOrganizationSettingsOrganizationsResponse = OrganizationSettings;

export type UpdateOrganizationSettingsOrganizationsError = CommonErrors;

export const updateOrganizationSettingsOrganizations: API.OperationMethod<UpdateOrganizationSettingsOrganizationsRequest, UpdateOrganizationSettingsOrganizationsResponse, UpdateOrganizationSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateOrganizationSettingsOrganizationsRequest,
  output: UpdateOrganizationSettingsOrganizationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsOperationsRequest {
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

export const ListOrganizationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsOperationsRequest>;

export type ListOrganizationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsOperationsError = CommonErrors;

export const listOrganizationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsOperationsRequest,
  output: ListOrganizationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsOperationsRequest>;

export type GetOrganizationsOperationsResponse = Operation;
export const GetOrganizationsOperationsResponse = Operation;

export type GetOrganizationsOperationsError = CommonErrors;

export const getOrganizationsOperations: API.OperationMethod<GetOrganizationsOperationsRequest, GetOrganizationsOperationsResponse, GetOrganizationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsOperationsRequest,
  output: GetOrganizationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsOperationsRequest>;

export type DeleteOrganizationsOperationsResponse = Empty;
export const DeleteOrganizationsOperationsResponse = Empty;

export type DeleteOrganizationsOperationsError = CommonErrors;

export const deleteOrganizationsOperations: API.OperationMethod<DeleteOrganizationsOperationsRequest, DeleteOrganizationsOperationsResponse, DeleteOrganizationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsOperationsRequest,
  output: DeleteOrganizationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelOrganizationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsOperationsRequest>;

export type CancelOrganizationsOperationsResponse = Empty;
export const CancelOrganizationsOperationsResponse = Empty;

export type CancelOrganizationsOperationsError = CommonErrors;

export const cancelOrganizationsOperations: API.OperationMethod<CancelOrganizationsOperationsRequest, CancelOrganizationsOperationsResponse, CancelOrganizationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsOperationsRequest,
  output: CancelOrganizationsOperationsResponse,
  errors: [],
}));

/** Kicks off an LRO to bulk mute findings for a parent based on a filter. The parent can be either an organization, folder or project. The findings matched by the filter will be muted after the LRO is done. */
export interface BulkMuteOrganizationsFindingsRequest {
  /** Required. The parent, at which bulk action needs to be applied. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: BulkMuteFindingsRequest;
}

export const BulkMuteOrganizationsFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BulkMuteFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/findings:bulkMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkMuteOrganizationsFindingsRequest>;

export type BulkMuteOrganizationsFindingsResponse = Operation;
export const BulkMuteOrganizationsFindingsResponse = Operation;

export type BulkMuteOrganizationsFindingsError = CommonErrors;

export const bulkMuteOrganizationsFindings: API.OperationMethod<BulkMuteOrganizationsFindingsRequest, BulkMuteOrganizationsFindingsResponse, BulkMuteOrganizationsFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkMuteOrganizationsFindingsRequest,
  output: BulkMuteOrganizationsFindingsResponse,
  errors: [],
}));

/** Creates a resident SecurityHealthAnalyticsCustomModule at the scope of the given CRM parent, and also creates inherited SecurityHealthAnalyticsCustomModules for all CRM descendants of the given parent. These modules are enabled by default. */
export interface CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Resource name of the new custom module's parent. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const createOrganizationsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest, CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse, CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: CreateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified SecurityHealthAnalyticsCustomModule and all of its descendants in the CRM hierarchy. This method is only supported for resident custom modules. */
export interface DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;
export const DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = Empty;

export type DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const deleteOrganizationsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest, DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse, DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: DeleteOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves a SecurityHealthAnalyticsCustomModule. */
export interface GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}` */
  name: string;
}

export const GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const getOrganizationsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest, GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse, GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: GetOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all resident SecurityHealthAnalyticsCustomModules under the given CRM parent and all of the parent’s CRM descendants. */
export interface ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list descendant custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;
export const ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListDescendantSecurityHealthAnalyticsCustomModulesResponse;

export type ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListDescendantOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a list of all SecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. Name of parent to list custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;
export const ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = ListSecurityHealthAnalyticsCustomModulesResponse;

export type ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const listOrganizationsSecurityHealthAnalyticsSettingsCustomModules = API.makePaginated(() => ({
  input: ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: ListOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Simulates a given SecurityHealthAnalyticsCustomModule and Resource. */
export interface SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Required. The relative resource name of the organization, project, or folder. For more information about relative resource names, see [Relative Resource Name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) Example: `organizations/{organization_id}` */
  parent: string;
  /** Request body */
  body?: SimulateSecurityHealthAnalyticsCustomModuleRequest;
}

export const SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SimulateSecurityHealthAnalyticsCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules:simulate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;
export const SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = SimulateSecurityHealthAnalyticsCustomModuleResponse;

export type SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const simulateOrganizationsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest, SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse, SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: SimulateOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Updates the SecurityHealthAnalyticsCustomModule under the given name based on the given update mask. Updating the enablement state is supported on both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name and custom config of a module is supported on resident modules only. */
export interface PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest {
  /** Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits. */
  name: string;
  /** The list of fields to be updated. The only fields that can be updated are `enablement_state` and `custom_config`. If empty or set to the wildcard value `*`, both `enablement_state` and `custom_config` are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
}

export const PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest>;

export type PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;
export const PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse = GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule;

export type PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError = CommonErrors;

export const patchOrganizationsSecurityHealthAnalyticsSettingsCustomModules: API.OperationMethod<PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest, PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse, PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesRequest,
  output: PatchOrganizationsSecurityHealthAnalyticsSettingsCustomModulesResponse,
  errors: [],
}));

/** Retrieves an EffectiveSecurityHealthAnalyticsCustomModule. */
export interface GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the effective custom module to get. Its format is `organizations/{organization}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, `folders/{folder}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}`, or `projects/{project}/securityHealthAnalyticsSettings/effectiveCustomModules/{customModule}` */
  name: string;
}

export const GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;
export const GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule;

export type GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const getOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModules: API.OperationMethod<GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest, GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse, GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: GetOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Returns a list of all EffectiveSecurityHealthAnalyticsCustomModules for the given parent. This includes resident modules defined at the scope of the parent, and inherited modules, inherited from CRM ancestors. */
export interface ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest {
  /** Required. Name of parent to list effective custom modules. Its format is `organizations/{organization}/securityHealthAnalyticsSettings`, `folders/{folder}/securityHealthAnalyticsSettings`, or `projects/{project}/securityHealthAnalyticsSettings` */
  parent: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** The value returned by the last call indicating a continuation */
  pageToken?: string;
}

export const ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/securityHealthAnalyticsSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest>;

export type ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;
export const ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse = ListEffectiveSecurityHealthAnalyticsCustomModulesResponse;

export type ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesError = CommonErrors;

export const listOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesRequest,
  output: ListOrganizationsSecurityHealthAnalyticsSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a source. */
export interface CreateOrganizationsSourcesRequest {
  /** Required. Resource name of the new source's parent. Its format should be `organizations/[organization_id]`. */
  parent: string;
  /** Request body */
  body?: Source;
}

export const CreateOrganizationsSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Source).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsSourcesRequest>;

export type CreateOrganizationsSourcesResponse = Source;
export const CreateOrganizationsSourcesResponse = Source;

export type CreateOrganizationsSourcesError = CommonErrors;

export const createOrganizationsSources: API.OperationMethod<CreateOrganizationsSourcesRequest, CreateOrganizationsSourcesResponse, CreateOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsSourcesRequest,
  output: CreateOrganizationsSourcesResponse,
  errors: [],
}));

/** Gets the access control policy on the specified Source. */
export interface GetIamPolicyOrganizationsSourcesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyOrganizationsSourcesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsSourcesRequest>;

export type GetIamPolicyOrganizationsSourcesResponse = Policy;
export const GetIamPolicyOrganizationsSourcesResponse = Policy;

export type GetIamPolicyOrganizationsSourcesError = CommonErrors;

export const getIamPolicyOrganizationsSources: API.OperationMethod<GetIamPolicyOrganizationsSourcesRequest, GetIamPolicyOrganizationsSourcesResponse, GetIamPolicyOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyOrganizationsSourcesRequest,
  output: GetIamPolicyOrganizationsSourcesResponse,
  errors: [],
}));

/** Gets a source. */
export interface GetOrganizationsSourcesRequest {
  /** Required. Relative resource name of the source. Its format is `organizations/[organization_id]/source/[source_id]`. */
  name: string;
}

export const GetOrganizationsSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/sources/{sourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSourcesRequest>;

export type GetOrganizationsSourcesResponse = Source;
export const GetOrganizationsSourcesResponse = Source;

export type GetOrganizationsSourcesError = CommonErrors;

export const getOrganizationsSources: API.OperationMethod<GetOrganizationsSourcesRequest, GetOrganizationsSourcesResponse, GetOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSourcesRequest,
  output: GetOrganizationsSourcesResponse,
  errors: [],
}));

/** Lists all sources belonging to an organization. */
export interface ListOrganizationsSourcesRequest {
  /** Required. Resource name of the parent of sources to list. Its format should be `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** The value returned by the last `ListSourcesResponse`; indicates that this is a continuation of a prior `ListSources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/sources" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSourcesRequest>;

export type ListOrganizationsSourcesResponse = ListSourcesResponse;
export const ListOrganizationsSourcesResponse = ListSourcesResponse;

export type ListOrganizationsSourcesError = CommonErrors;

export const listOrganizationsSources = API.makePaginated(() => ({
  input: ListOrganizationsSourcesRequest,
  output: ListOrganizationsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified Source. */
export interface SetIamPolicyOrganizationsSourcesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyOrganizationsSourcesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsSourcesRequest>;

export type SetIamPolicyOrganizationsSourcesResponse = Policy;
export const SetIamPolicyOrganizationsSourcesResponse = Policy;

export type SetIamPolicyOrganizationsSourcesError = CommonErrors;

export const setIamPolicyOrganizationsSources: API.OperationMethod<SetIamPolicyOrganizationsSourcesRequest, SetIamPolicyOrganizationsSourcesResponse, SetIamPolicyOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyOrganizationsSourcesRequest,
  output: SetIamPolicyOrganizationsSourcesResponse,
  errors: [],
}));

/** Returns the permissions that a caller has on the specified source. */
export interface TestIamPermissionsOrganizationsSourcesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsOrganizationsSourcesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsSourcesRequest>;

export type TestIamPermissionsOrganizationsSourcesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsSourcesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsSourcesError = CommonErrors;

export const testIamPermissionsOrganizationsSources: API.OperationMethod<TestIamPermissionsOrganizationsSourcesRequest, TestIamPermissionsOrganizationsSourcesResponse, TestIamPermissionsOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsOrganizationsSourcesRequest,
  output: TestIamPermissionsOrganizationsSourcesResponse,
  errors: [],
}));

/** Updates a source. */
export interface PatchOrganizationsSourcesRequest {
  /** The relative resource name of this source. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}" */
  name: string;
  /** The FieldMask to use when updating the source resource. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Source;
}

export const PatchOrganizationsSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Source).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/sources/{sourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsSourcesRequest>;

export type PatchOrganizationsSourcesResponse = Source;
export const PatchOrganizationsSourcesResponse = Source;

export type PatchOrganizationsSourcesError = CommonErrors;

export const patchOrganizationsSources: API.OperationMethod<PatchOrganizationsSourcesRequest, PatchOrganizationsSourcesResponse, PatchOrganizationsSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsSourcesRequest,
  output: PatchOrganizationsSourcesResponse,
  errors: [],
}));

/** Creates a finding. The corresponding source must exist for finding creation to succeed. */
export interface CreateOrganizationsSourcesFindingsRequest {
  /** Required. Resource name of the new finding's parent. Its format should be `organizations/[organization_id]/sources/[source_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must be alphanumeric and less than or equal to 32 characters and greater than 0 characters in length. */
  findingId?: string;
  /** Request body */
  body?: Finding;
}

export const CreateOrganizationsSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  findingId: Schema.optional(Schema.String).pipe(T.HttpQuery("findingId")),
  body: Schema.optional(Finding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsSourcesFindingsRequest>;

export type CreateOrganizationsSourcesFindingsResponse = Finding;
export const CreateOrganizationsSourcesFindingsResponse = Finding;

export type CreateOrganizationsSourcesFindingsError = CommonErrors;

export const createOrganizationsSourcesFindings: API.OperationMethod<CreateOrganizationsSourcesFindingsRequest, CreateOrganizationsSourcesFindingsResponse, CreateOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsSourcesFindingsRequest,
  output: CreateOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Filters an organization or source's findings and groups them by their specified properties. To group across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings, /v1/folders/{folder_id}/sources/-/findings, /v1/projects/{project_id}/sources/-/findings */
export interface GroupOrganizationsSourcesFindingsRequest {
  /** Required. Name of the source to groupBy. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To groupBy across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-`, or `projects/{project_id}/sources/-` */
  parent: string;
  /** Request body */
  body?: GroupFindingsRequest;
}

export const GroupOrganizationsSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupFindingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupOrganizationsSourcesFindingsRequest>;

export type GroupOrganizationsSourcesFindingsResponse = GroupFindingsResponse;
export const GroupOrganizationsSourcesFindingsResponse = GroupFindingsResponse;

export type GroupOrganizationsSourcesFindingsError = CommonErrors;

export const groupOrganizationsSourcesFindings: API.OperationMethod<GroupOrganizationsSourcesFindingsRequest, GroupOrganizationsSourcesFindingsResponse, GroupOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupOrganizationsSourcesFindingsRequest,
  output: GroupOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Lists an organization or source's findings. To list across all sources provide a `-` as the source id. Example: /v1/organizations/{organization_id}/sources/-/findings */
export interface ListOrganizationsSourcesFindingsRequest {
  /** Required. Name of the source the findings belong to. Its format is `organizations/[organization_id]/sources/[source_id]`, `folders/[folder_id]/sources/[source_id]`, or `projects/[project_id]/sources/[source_id]`. To list across all sources provide a source_id of `-`. For example: `organizations/{organization_id}/sources/-`, `folders/{folder_id}/sources/-` or `projects/{projects_id}/sources/-` */
  parent: string;
  /** Expression that defines the filter to apply across findings. The expression is a list of one or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. Examples include: * name * source_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following field and operator combinations are supported: * name: `=` * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category: `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time = 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`, `>=`, `<=` For example, `source_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `source_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-source_properties.my_property : ""` * resource: * resource.name: `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`, `:` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,source_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,source_properties.a_property" and " name desc , source_properties.a_property " are equivalent. The following fields are supported: name parent state category resource_name event_time source_properties security_marks.marks */
  orderBy?: string;
  /** Time used as a reference point when filtering findings. The filter is limited to findings existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListFindingsResult's "state_change" attribute is updated to indicate whether the finding had its state changed, the finding's state remained unchanged, or if the finding was added in any state during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence and state of the finding at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the finding is made inactive and then active again. Possible "state_change" values when compare_duration is specified: * "CHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration, but changed its state at read_time. * "UNCHANGED": indicates that the finding was present and matched the given filter at the start of compare_duration and did not change state at read_time. * "ADDED": indicates that the finding did not match the given filter or was not present at the start of compare_duration, but was present at read_time. * "REMOVED": indicates that the finding was present and matched the filter at the start of compare_duration, but did not match the filter at read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all findings present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the Finding fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListFindingsResponse`; indicates that this is a continuation of a prior `ListFindings` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsSourcesFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSourcesFindingsRequest>;

export type ListOrganizationsSourcesFindingsResponse = ListFindingsResponse;
export const ListOrganizationsSourcesFindingsResponse = ListFindingsResponse;

export type ListOrganizationsSourcesFindingsError = CommonErrors;

export const listOrganizationsSourcesFindings = API.makePaginated(() => ({
  input: ListOrganizationsSourcesFindingsRequest,
  output: ListOrganizationsSourcesFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the state of a finding. */
export interface SetStateOrganizationsSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetFindingStateRequest;
}

export const SetStateOrganizationsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetFindingStateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings/{findingsId}:setState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetStateOrganizationsSourcesFindingsRequest>;

export type SetStateOrganizationsSourcesFindingsResponse = Finding;
export const SetStateOrganizationsSourcesFindingsResponse = Finding;

export type SetStateOrganizationsSourcesFindingsError = CommonErrors;

export const setStateOrganizationsSourcesFindings: API.OperationMethod<SetStateOrganizationsSourcesFindingsRequest, SetStateOrganizationsSourcesFindingsResponse, SetStateOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetStateOrganizationsSourcesFindingsRequest,
  output: SetStateOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Updates the mute state of a finding. */
export interface SetMuteOrganizationsSourcesFindingsRequest {
  /** Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: `organizations/{organization_id}/sources/{source_id}/findings/{finding_id}`, `folders/{folder_id}/sources/{source_id}/findings/{finding_id}`, `projects/{project_id}/sources/{source_id}/findings/{finding_id}`. */
  name: string;
  /** Request body */
  body?: SetMuteRequest;
}

export const SetMuteOrganizationsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMuteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings/{findingsId}:setMute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMuteOrganizationsSourcesFindingsRequest>;

export type SetMuteOrganizationsSourcesFindingsResponse = Finding;
export const SetMuteOrganizationsSourcesFindingsResponse = Finding;

export type SetMuteOrganizationsSourcesFindingsError = CommonErrors;

export const setMuteOrganizationsSourcesFindings: API.OperationMethod<SetMuteOrganizationsSourcesFindingsRequest, SetMuteOrganizationsSourcesFindingsResponse, SetMuteOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMuteOrganizationsSourcesFindingsRequest,
  output: SetMuteOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Creates or updates a finding. The corresponding source must exist for a finding creation to succeed. */
export interface PatchOrganizationsSourcesFindingsRequest {
  /** The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}". */
  name: string;
  /** The FieldMask to use when updating the finding resource. This field should not be specified when creating a finding. When updating a finding, an empty mask is treated as updating all mutable fields and replacing source_properties. Individual source_properties can be added/updated by using "source_properties." in the field mask. */
  updateMask?: string;
  /** Request body */
  body?: Finding;
}

export const PatchOrganizationsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Finding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings/{findingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsSourcesFindingsRequest>;

export type PatchOrganizationsSourcesFindingsResponse = Finding;
export const PatchOrganizationsSourcesFindingsResponse = Finding;

export type PatchOrganizationsSourcesFindingsError = CommonErrors;

export const patchOrganizationsSourcesFindings: API.OperationMethod<PatchOrganizationsSourcesFindingsRequest, PatchOrganizationsSourcesFindingsResponse, PatchOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsSourcesFindingsRequest,
  output: PatchOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Updates security marks. */
export interface UpdateSecurityMarksOrganizationsSourcesFindingsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksOrganizationsSourcesFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings/{findingsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksOrganizationsSourcesFindingsRequest>;

export type UpdateSecurityMarksOrganizationsSourcesFindingsResponse = SecurityMarks;
export const UpdateSecurityMarksOrganizationsSourcesFindingsResponse = SecurityMarks;

export type UpdateSecurityMarksOrganizationsSourcesFindingsError = CommonErrors;

export const updateSecurityMarksOrganizationsSourcesFindings: API.OperationMethod<UpdateSecurityMarksOrganizationsSourcesFindingsRequest, UpdateSecurityMarksOrganizationsSourcesFindingsResponse, UpdateSecurityMarksOrganizationsSourcesFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksOrganizationsSourcesFindingsRequest,
  output: UpdateSecurityMarksOrganizationsSourcesFindingsResponse,
  errors: [],
}));

/** Updates external system. This is for a given finding. */
export interface PatchOrganizationsSourcesFindingsExternalSystemsRequest {
  /** Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira" */
  name: string;
  /** The FieldMask to use when updating the external system resource. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1ExternalSystem;
}

export const PatchOrganizationsSourcesFindingsExternalSystemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1ExternalSystem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/sources/{sourcesId}/findings/{findingsId}/externalSystems/{externalSystemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsSourcesFindingsExternalSystemsRequest>;

export type PatchOrganizationsSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;
export const PatchOrganizationsSourcesFindingsExternalSystemsResponse = GoogleCloudSecuritycenterV1ExternalSystem;

export type PatchOrganizationsSourcesFindingsExternalSystemsError = CommonErrors;

export const patchOrganizationsSourcesFindingsExternalSystems: API.OperationMethod<PatchOrganizationsSourcesFindingsExternalSystemsRequest, PatchOrganizationsSourcesFindingsExternalSystemsResponse, PatchOrganizationsSourcesFindingsExternalSystemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsSourcesFindingsExternalSystemsRequest,
  output: PatchOrganizationsSourcesFindingsExternalSystemsResponse,
  errors: [],
}));

/** Creates a mute config. */
export interface CreateOrganizationsMuteConfigsRequest {
  /** Required. Resource name of the new mute configs's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  muteConfigId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const CreateOrganizationsMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  muteConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("muteConfigId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/muteConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsMuteConfigsRequest>;

export type CreateOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const CreateOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type CreateOrganizationsMuteConfigsError = CommonErrors;

export const createOrganizationsMuteConfigs: API.OperationMethod<CreateOrganizationsMuteConfigsRequest, CreateOrganizationsMuteConfigsResponse, CreateOrganizationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsMuteConfigsRequest,
  output: CreateOrganizationsMuteConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteOrganizationsMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteOrganizationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsMuteConfigsRequest>;

export type DeleteOrganizationsMuteConfigsResponse = Empty;
export const DeleteOrganizationsMuteConfigsResponse = Empty;

export type DeleteOrganizationsMuteConfigsError = CommonErrors;

export const deleteOrganizationsMuteConfigs: API.OperationMethod<DeleteOrganizationsMuteConfigsRequest, DeleteOrganizationsMuteConfigsResponse, DeleteOrganizationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsMuteConfigsRequest,
  output: DeleteOrganizationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetOrganizationsMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetOrganizationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsMuteConfigsRequest>;

export type GetOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetOrganizationsMuteConfigsError = CommonErrors;

export const getOrganizationsMuteConfigs: API.OperationMethod<GetOrganizationsMuteConfigsRequest, GetOrganizationsMuteConfigsResponse, GetOrganizationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsMuteConfigsRequest,
  output: GetOrganizationsMuteConfigsResponse,
  errors: [],
}));

/** Lists mute configs. */
export interface ListOrganizationsMuteConfigsRequest {
  /** Required. The parent, which owns the collection of mute configs. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListMuteConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMuteConfigs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsMuteConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/muteConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsMuteConfigsRequest>;

export type ListOrganizationsMuteConfigsResponse = ListMuteConfigsResponse;
export const ListOrganizationsMuteConfigsResponse = ListMuteConfigsResponse;

export type ListOrganizationsMuteConfigsError = CommonErrors;

export const listOrganizationsMuteConfigs = API.makePaginated(() => ({
  input: ListOrganizationsMuteConfigsRequest,
  output: ListOrganizationsMuteConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a mute config. */
export interface PatchOrganizationsMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchOrganizationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsMuteConfigsRequest>;

export type PatchOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchOrganizationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchOrganizationsMuteConfigsError = CommonErrors;

export const patchOrganizationsMuteConfigs: API.OperationMethod<PatchOrganizationsMuteConfigsRequest, PatchOrganizationsMuteConfigsResponse, PatchOrganizationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsMuteConfigsRequest,
  output: PatchOrganizationsMuteConfigsResponse,
  errors: [],
}));

/** Creates a notification config. */
export interface CreateOrganizationsNotificationConfigsRequest {
  /** Required. Resource name of the new notification config's parent. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must be between 1 and 128 characters and contain alphanumeric characters, underscores, or hyphens only. */
  configId?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const CreateOrganizationsNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/notificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsNotificationConfigsRequest>;

export type CreateOrganizationsNotificationConfigsResponse = NotificationConfig;
export const CreateOrganizationsNotificationConfigsResponse = NotificationConfig;

export type CreateOrganizationsNotificationConfigsError = CommonErrors;

export const createOrganizationsNotificationConfigs: API.OperationMethod<CreateOrganizationsNotificationConfigsRequest, CreateOrganizationsNotificationConfigsResponse, CreateOrganizationsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsNotificationConfigsRequest,
  output: CreateOrganizationsNotificationConfigsResponse,
  errors: [],
}));

/** Deletes a notification config. */
export interface DeleteOrganizationsNotificationConfigsRequest {
  /** Required. Name of the notification config to delete. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const DeleteOrganizationsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsNotificationConfigsRequest>;

export type DeleteOrganizationsNotificationConfigsResponse = Empty;
export const DeleteOrganizationsNotificationConfigsResponse = Empty;

export type DeleteOrganizationsNotificationConfigsError = CommonErrors;

export const deleteOrganizationsNotificationConfigs: API.OperationMethod<DeleteOrganizationsNotificationConfigsRequest, DeleteOrganizationsNotificationConfigsResponse, DeleteOrganizationsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsNotificationConfigsRequest,
  output: DeleteOrganizationsNotificationConfigsResponse,
  errors: [],
}));

/** Gets a notification config. */
export interface GetOrganizationsNotificationConfigsRequest {
  /** Required. Name of the notification config to get. Its format is `organizations/[organization_id]/notificationConfigs/[config_id]`, `folders/[folder_id]/notificationConfigs/[config_id]`, or `projects/[project_id]/notificationConfigs/[config_id]`. */
  name: string;
}

export const GetOrganizationsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsNotificationConfigsRequest>;

export type GetOrganizationsNotificationConfigsResponse = NotificationConfig;
export const GetOrganizationsNotificationConfigsResponse = NotificationConfig;

export type GetOrganizationsNotificationConfigsError = CommonErrors;

export const getOrganizationsNotificationConfigs: API.OperationMethod<GetOrganizationsNotificationConfigsRequest, GetOrganizationsNotificationConfigsResponse, GetOrganizationsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsNotificationConfigsRequest,
  output: GetOrganizationsNotificationConfigsResponse,
  errors: [],
}));

/** Lists notification configs. */
export interface ListOrganizationsNotificationConfigsRequest {
  /** Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]". */
  parent: string;
  /** The value returned by the last `ListNotificationConfigsResponse`; indicates that this is a continuation of a prior `ListNotificationConfigs` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/notificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsNotificationConfigsRequest>;

export type ListOrganizationsNotificationConfigsResponse = ListNotificationConfigsResponse;
export const ListOrganizationsNotificationConfigsResponse = ListNotificationConfigsResponse;

export type ListOrganizationsNotificationConfigsError = CommonErrors;

export const listOrganizationsNotificationConfigs = API.makePaginated(() => ({
  input: ListOrganizationsNotificationConfigsRequest,
  output: ListOrganizationsNotificationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a notification config. The following update fields are allowed: description, pubsub_topic, streaming_config.filter */
export interface PatchOrganizationsNotificationConfigsRequest {
  /** The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket". */
  name: string;
  /** The FieldMask to use when updating the notification config. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: NotificationConfig;
}

export const PatchOrganizationsNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/notificationConfigs/{notificationConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsNotificationConfigsRequest>;

export type PatchOrganizationsNotificationConfigsResponse = NotificationConfig;
export const PatchOrganizationsNotificationConfigsResponse = NotificationConfig;

export type PatchOrganizationsNotificationConfigsError = CommonErrors;

export const patchOrganizationsNotificationConfigs: API.OperationMethod<PatchOrganizationsNotificationConfigsRequest, PatchOrganizationsNotificationConfigsResponse, PatchOrganizationsNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsNotificationConfigsRequest,
  output: PatchOrganizationsNotificationConfigsResponse,
  errors: [],
}));

/** Deletes an existing mute config. */
export interface DeleteOrganizationsLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to delete. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const DeleteOrganizationsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsMuteConfigsRequest>;

export type DeleteOrganizationsLocationsMuteConfigsResponse = Empty;
export const DeleteOrganizationsLocationsMuteConfigsResponse = Empty;

export type DeleteOrganizationsLocationsMuteConfigsError = CommonErrors;

export const deleteOrganizationsLocationsMuteConfigs: API.OperationMethod<DeleteOrganizationsLocationsMuteConfigsRequest, DeleteOrganizationsLocationsMuteConfigsResponse, DeleteOrganizationsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsMuteConfigsRequest,
  output: DeleteOrganizationsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Gets a mute config. */
export interface GetOrganizationsLocationsMuteConfigsRequest {
  /** Required. Name of the mute config to retrieve. Its format is `organizations/{organization}/muteConfigs/{config_id}`, `folders/{folder}/muteConfigs/{config_id}`, `projects/{project}/muteConfigs/{config_id}`, `organizations/{organization}/locations/global/muteConfigs/{config_id}`, `folders/{folder}/locations/global/muteConfigs/{config_id}`, or `projects/{project}/locations/global/muteConfigs/{config_id}`. */
  name: string;
}

export const GetOrganizationsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsMuteConfigsRequest>;

export type GetOrganizationsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const GetOrganizationsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type GetOrganizationsLocationsMuteConfigsError = CommonErrors;

export const getOrganizationsLocationsMuteConfigs: API.OperationMethod<GetOrganizationsLocationsMuteConfigsRequest, GetOrganizationsLocationsMuteConfigsResponse, GetOrganizationsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsMuteConfigsRequest,
  output: GetOrganizationsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Updates a mute config. */
export interface PatchOrganizationsLocationsMuteConfigsRequest {
  /** This field will be ignored if provided on config creation. Format `organizations/{organization}/muteConfigs/{mute_config}` `folders/{folder}/muteConfigs/{mute_config}` `projects/{project}/muteConfigs/{mute_config}` `organizations/{organization}/locations/global/muteConfigs/{mute_config}` `folders/{folder}/locations/global/muteConfigs/{mute_config}` `projects/{project}/locations/global/muteConfigs/{mute_config}` */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1MuteConfig;
}

export const PatchOrganizationsLocationsMuteConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1MuteConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/muteConfigs/{muteConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsMuteConfigsRequest>;

export type PatchOrganizationsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;
export const PatchOrganizationsLocationsMuteConfigsResponse = GoogleCloudSecuritycenterV1MuteConfig;

export type PatchOrganizationsLocationsMuteConfigsError = CommonErrors;

export const patchOrganizationsLocationsMuteConfigs: API.OperationMethod<PatchOrganizationsLocationsMuteConfigsRequest, PatchOrganizationsLocationsMuteConfigsResponse, PatchOrganizationsLocationsMuteConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsMuteConfigsRequest,
  output: PatchOrganizationsLocationsMuteConfigsResponse,
  errors: [],
}));

/** Get the simulation by name or the latest simulation for the given organization. */
export interface GetOrganizationsSimulationsRequest {
  /** Required. The organization name or simulation name of this simulation Valid format: `organizations/{organization}/simulations/latest` `organizations/{organization}/simulations/{simulation}` */
  name: string;
}

export const GetOrganizationsSimulationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSimulationsRequest>;

export type GetOrganizationsSimulationsResponse = Simulation;
export const GetOrganizationsSimulationsResponse = Simulation;

export type GetOrganizationsSimulationsError = CommonErrors;

export const getOrganizationsSimulations: API.OperationMethod<GetOrganizationsSimulationsRequest, GetOrganizationsSimulationsResponse, GetOrganizationsSimulationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSimulationsRequest,
  output: GetOrganizationsSimulationsResponse,
  errors: [],
}));

/** Get the valued resource by name */
export interface GetOrganizationsSimulationsValuedResourcesRequest {
  /** Required. The name of this valued resource Valid format: `organizations/{organization}/simulations/{simulation}/valuedResources/{valued_resource}` */
  name: string;
}

export const GetOrganizationsSimulationsValuedResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/valuedResources/{valuedResourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsSimulationsValuedResourcesRequest>;

export type GetOrganizationsSimulationsValuedResourcesResponse = ValuedResource;
export const GetOrganizationsSimulationsValuedResourcesResponse = ValuedResource;

export type GetOrganizationsSimulationsValuedResourcesError = CommonErrors;

export const getOrganizationsSimulationsValuedResources: API.OperationMethod<GetOrganizationsSimulationsValuedResourcesRequest, GetOrganizationsSimulationsValuedResourcesResponse, GetOrganizationsSimulationsValuedResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsSimulationsValuedResourcesRequest,
  output: GetOrganizationsSimulationsValuedResourcesResponse,
  errors: [],
}));

/** Lists the valued resources for a set of simulation results and filter. */
export interface ListOrganizationsSimulationsValuedResourcesRequest {
  /** Required. Name of parent to list valued resources. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` */
  parent: string;
  /** The filter expression that filters the valued resources in the response. Supported fields: * `resource_value` supports = * `resource_type` supports = */
  filter?: string;
  /** The value returned by the last `ListValuedResourcesResponse`; indicates that this is a continuation of a prior `ListValuedResources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** Optional. The fields by which to order the valued resources response. Supported fields: * `exposed_score` * `resource_value` * `resource_type` * `resource` * `display_name` Values should be a comma separated list of fields. For example: `exposed_score,resource_value`. The default sorting order is descending. To specify ascending or descending order for a field, append a ` ASC` or a ` DESC` suffix, respectively; for example: `exposed_score DESC`. */
  orderBy?: string;
}

export const ListOrganizationsSimulationsValuedResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/valuedResources" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSimulationsValuedResourcesRequest>;

export type ListOrganizationsSimulationsValuedResourcesResponse = ListValuedResourcesResponse;
export const ListOrganizationsSimulationsValuedResourcesResponse = ListValuedResourcesResponse;

export type ListOrganizationsSimulationsValuedResourcesError = CommonErrors;

export const listOrganizationsSimulationsValuedResources = API.makePaginated(() => ({
  input: ListOrganizationsSimulationsValuedResourcesRequest,
  output: ListOrganizationsSimulationsValuedResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the attack paths for a set of simulation results or valued resources and filter. */
export interface ListOrganizationsSimulationsValuedResourcesAttackPathsRequest {
  /** Required. Name of parent to list attack paths. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` `organizations/{organization}/simulations/{simulation}/valuedResources/{valued_resource}` */
  parent: string;
  /** The filter expression that filters the attack path in the response. Supported fields: * `valued_resources` supports = */
  filter?: string;
  /** The value returned by the last `ListAttackPathsResponse`; indicates that this is a continuation of a prior `ListAttackPaths` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsSimulationsValuedResourcesAttackPathsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/valuedResources/{valuedResourcesId}/attackPaths" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSimulationsValuedResourcesAttackPathsRequest>;

export type ListOrganizationsSimulationsValuedResourcesAttackPathsResponse = ListAttackPathsResponse;
export const ListOrganizationsSimulationsValuedResourcesAttackPathsResponse = ListAttackPathsResponse;

export type ListOrganizationsSimulationsValuedResourcesAttackPathsError = CommonErrors;

export const listOrganizationsSimulationsValuedResourcesAttackPaths = API.makePaginated(() => ({
  input: ListOrganizationsSimulationsValuedResourcesAttackPathsRequest,
  output: ListOrganizationsSimulationsValuedResourcesAttackPathsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the valued resources for a set of simulation results and filter. */
export interface ListOrganizationsSimulationsAttackExposureResultsValuedResourcesRequest {
  /** Required. Name of parent to list valued resources. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` */
  parent: string;
  /** The filter expression that filters the valued resources in the response. Supported fields: * `resource_value` supports = * `resource_type` supports = */
  filter?: string;
  /** The value returned by the last `ListValuedResourcesResponse`; indicates that this is a continuation of a prior `ListValuedResources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** Optional. The fields by which to order the valued resources response. Supported fields: * `exposed_score` * `resource_value` * `resource_type` * `resource` * `display_name` Values should be a comma separated list of fields. For example: `exposed_score,resource_value`. The default sorting order is descending. To specify ascending or descending order for a field, append a ` ASC` or a ` DESC` suffix, respectively; for example: `exposed_score DESC`. */
  orderBy?: string;
}

export const ListOrganizationsSimulationsAttackExposureResultsValuedResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/attackExposureResults/{attackExposureResultsId}/valuedResources" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSimulationsAttackExposureResultsValuedResourcesRequest>;

export type ListOrganizationsSimulationsAttackExposureResultsValuedResourcesResponse = ListValuedResourcesResponse;
export const ListOrganizationsSimulationsAttackExposureResultsValuedResourcesResponse = ListValuedResourcesResponse;

export type ListOrganizationsSimulationsAttackExposureResultsValuedResourcesError = CommonErrors;

export const listOrganizationsSimulationsAttackExposureResultsValuedResources = API.makePaginated(() => ({
  input: ListOrganizationsSimulationsAttackExposureResultsValuedResourcesRequest,
  output: ListOrganizationsSimulationsAttackExposureResultsValuedResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the attack paths for a set of simulation results or valued resources and filter. */
export interface ListOrganizationsSimulationsAttackExposureResultsAttackPathsRequest {
  /** Required. Name of parent to list attack paths. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` `organizations/{organization}/simulations/{simulation}/valuedResources/{valued_resource}` */
  parent: string;
  /** The filter expression that filters the attack path in the response. Supported fields: * `valued_resources` supports = */
  filter?: string;
  /** The value returned by the last `ListAttackPathsResponse`; indicates that this is a continuation of a prior `ListAttackPaths` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsSimulationsAttackExposureResultsAttackPathsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/attackExposureResults/{attackExposureResultsId}/attackPaths" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSimulationsAttackExposureResultsAttackPathsRequest>;

export type ListOrganizationsSimulationsAttackExposureResultsAttackPathsResponse = ListAttackPathsResponse;
export const ListOrganizationsSimulationsAttackExposureResultsAttackPathsResponse = ListAttackPathsResponse;

export type ListOrganizationsSimulationsAttackExposureResultsAttackPathsError = CommonErrors;

export const listOrganizationsSimulationsAttackExposureResultsAttackPaths = API.makePaginated(() => ({
  input: ListOrganizationsSimulationsAttackExposureResultsAttackPathsRequest,
  output: ListOrganizationsSimulationsAttackExposureResultsAttackPathsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the attack paths for a set of simulation results or valued resources and filter. */
export interface ListOrganizationsSimulationsAttackPathsRequest {
  /** Required. Name of parent to list attack paths. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` `organizations/{organization}/simulations/{simulation}/valuedResources/{valued_resource}` */
  parent: string;
  /** The filter expression that filters the attack path in the response. Supported fields: * `valued_resources` supports = */
  filter?: string;
  /** The value returned by the last `ListAttackPathsResponse`; indicates that this is a continuation of a prior `ListAttackPaths` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsSimulationsAttackPathsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/simulations/{simulationsId}/attackPaths" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsSimulationsAttackPathsRequest>;

export type ListOrganizationsSimulationsAttackPathsResponse = ListAttackPathsResponse;
export const ListOrganizationsSimulationsAttackPathsResponse = ListAttackPathsResponse;

export type ListOrganizationsSimulationsAttackPathsError = CommonErrors;

export const listOrganizationsSimulationsAttackPaths = API.makePaginated(() => ({
  input: ListOrganizationsSimulationsAttackPathsRequest,
  output: ListOrganizationsSimulationsAttackPathsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a BigQuery export. */
export interface GetOrganizationsBigQueryExportsRequest {
  /** Required. Name of the BigQuery export to retrieve. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const GetOrganizationsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsBigQueryExportsRequest>;

export type GetOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const GetOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type GetOrganizationsBigQueryExportsError = CommonErrors;

export const getOrganizationsBigQueryExports: API.OperationMethod<GetOrganizationsBigQueryExportsRequest, GetOrganizationsBigQueryExportsResponse, GetOrganizationsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsBigQueryExportsRequest,
  output: GetOrganizationsBigQueryExportsResponse,
  errors: [],
}));

/** Creates a BigQuery export. */
export interface CreateOrganizationsBigQueryExportsRequest {
  /** Required. The name of the parent resource of the new BigQuery export. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Required. Unique identifier provided by the client within the parent scope. It must consist of only lowercase letters, numbers, and hyphens, must start with a letter, must end with either a letter or a number, and must be 63 characters or less. */
  bigQueryExportId?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const CreateOrganizationsBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bigQueryExportId: Schema.optional(Schema.String).pipe(T.HttpQuery("bigQueryExportId")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/bigQueryExports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsBigQueryExportsRequest>;

export type CreateOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const CreateOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type CreateOrganizationsBigQueryExportsError = CommonErrors;

export const createOrganizationsBigQueryExports: API.OperationMethod<CreateOrganizationsBigQueryExportsRequest, CreateOrganizationsBigQueryExportsResponse, CreateOrganizationsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsBigQueryExportsRequest,
  output: CreateOrganizationsBigQueryExportsResponse,
  errors: [],
}));

/** Deletes an existing BigQuery export. */
export interface DeleteOrganizationsBigQueryExportsRequest {
  /** Required. The name of the BigQuery export to delete. Its format is `organizations/{organization}/bigQueryExports/{export_id}`, `folders/{folder}/bigQueryExports/{export_id}`, or `projects/{project}/bigQueryExports/{export_id}` */
  name: string;
}

export const DeleteOrganizationsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/bigQueryExports/{bigQueryExportsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsBigQueryExportsRequest>;

export type DeleteOrganizationsBigQueryExportsResponse = Empty;
export const DeleteOrganizationsBigQueryExportsResponse = Empty;

export type DeleteOrganizationsBigQueryExportsError = CommonErrors;

export const deleteOrganizationsBigQueryExports: API.OperationMethod<DeleteOrganizationsBigQueryExportsRequest, DeleteOrganizationsBigQueryExportsResponse, DeleteOrganizationsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsBigQueryExportsRequest,
  output: DeleteOrganizationsBigQueryExportsResponse,
  errors: [],
}));

/** Updates a BigQuery export. */
export interface PatchOrganizationsBigQueryExportsRequest {
  /** The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1BigQueryExport;
}

export const PatchOrganizationsBigQueryExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1BigQueryExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/bigQueryExports/{bigQueryExportsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsBigQueryExportsRequest>;

export type PatchOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;
export const PatchOrganizationsBigQueryExportsResponse = GoogleCloudSecuritycenterV1BigQueryExport;

export type PatchOrganizationsBigQueryExportsError = CommonErrors;

export const patchOrganizationsBigQueryExports: API.OperationMethod<PatchOrganizationsBigQueryExportsRequest, PatchOrganizationsBigQueryExportsResponse, PatchOrganizationsBigQueryExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsBigQueryExportsRequest,
  output: PatchOrganizationsBigQueryExportsResponse,
  errors: [],
}));

/** Lists BigQuery exports. Note that when requesting BigQuery exports at a given level all exports under that level are also returned e.g. if requesting BigQuery exports under a folder, then all BigQuery exports immediately under the folder plus the ones created under the projects within the folder are returned. */
export interface ListOrganizationsBigQueryExportsRequest {
  /** Required. The parent, which owns the collection of BigQuery exports. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, `projects/[project_id]`. */
  parent: string;
  /** The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBigQueryExports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBigQueryExports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsBigQueryExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/bigQueryExports" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsBigQueryExportsRequest>;

export type ListOrganizationsBigQueryExportsResponse = ListBigQueryExportsResponse;
export const ListOrganizationsBigQueryExportsResponse = ListBigQueryExportsResponse;

export type ListOrganizationsBigQueryExportsError = CommonErrors;

export const listOrganizationsBigQueryExports = API.makePaginated(() => ({
  input: ListOrganizationsBigQueryExportsRequest,
  output: ListOrganizationsBigQueryExportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Filters an organization's assets and groups them by their specified properties. */
export interface GroupOrganizationsAssetsRequest {
  /** Required. The name of the parent to group the assets by. Its format is `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Request body */
  body?: GroupAssetsRequest;
}

export const GroupOrganizationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GroupAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/assets:group", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GroupOrganizationsAssetsRequest>;

export type GroupOrganizationsAssetsResponse = GroupAssetsResponse;
export const GroupOrganizationsAssetsResponse = GroupAssetsResponse;

export type GroupOrganizationsAssetsError = CommonErrors;

export const groupOrganizationsAssets: API.OperationMethod<GroupOrganizationsAssetsRequest, GroupOrganizationsAssetsResponse, GroupOrganizationsAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GroupOrganizationsAssetsRequest,
  output: GroupOrganizationsAssetsResponse,
  errors: [],
}));

/** Lists an organization's assets. */
export interface ListOrganizationsAssetsRequest {
  /** Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: `organizations/[organization_id]`, `folders/[folder_id]`, or `projects/[project_id]`. */
  parent: string;
  /** Expression that defines the filter to apply across assets. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. Parentheses are supported, and `OR` has higher precedence than `AND`. Restrictions have the form ` ` and may have a `-` character in front of them to indicate negation. The fields map to those defined in the Asset resource. Examples include: * name * security_center_properties.resource_name * resource_properties.a_property * security_marks.marks.marka The supported operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring matching, for strings. The supported value types are: * string literals in quotes. * integer literals without quotes. * boolean literals `true` and `false` without quotes. The following are the allowed field and operator combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds since epoch or an RFC3339 string. Examples: `create_time = "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`, `>=`, `<=` * security_marks.marks: `=`, `:` * security_center_properties.resource_name: `=`, `:` * security_center_properties.resource_display_name: `=`, `:` * security_center_properties.resource_type: `=`, `:` * security_center_properties.resource_parent: `=`, `:` * security_center_properties.resource_parent_display_name: `=`, `:` * security_center_properties.resource_project: `=`, `:` * security_center_properties.resource_project_display_name: `=`, `:` * security_center_properties.resource_owners: `=`, `:` For example, `resource_properties.size = 100` is a valid filter string. Use a partial match on the empty string to filter based on a property existing: `resource_properties.my_property : ""` Use a negated partial match on the empty string to filter based on a property not existing: `-resource_properties.my_property : ""` */
  filter?: string;
  /** Expression that defines what fields and order to use for sorting. The string value should follow SQL syntax: comma separated list of fields. For example: "name,resource_properties.a_property". The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be appended to the field name. For example: "name desc,resource_properties.a_property". Redundant space characters in the syntax are insignificant. "name desc,resource_properties.a_property" and " name desc , resource_properties.a_property " are equivalent. The following fields are supported: name update_time resource_properties security_marks.marks security_center_properties.resource_name security_center_properties.resource_display_name security_center_properties.resource_parent security_center_properties.resource_parent_display_name security_center_properties.resource_project security_center_properties.resource_project_display_name security_center_properties.resource_type */
  orderBy?: string;
  /** Time used as a reference point when filtering assets. The filter is limited to assets existing at the supplied time and their values are those at that specific time. Absence of this field will default to the API's version of NOW. */
  readTime?: string;
  /** When compare_duration is set, the ListAssetsResult's "state_change" attribute is updated to indicate whether the asset was added, removed, or remained present during the compare_duration period of time that precedes the read_time. This is the time between (read_time - compare_duration) and read_time. The state_change value is derived based on the presence of the asset at the two points in time. Intermediate state changes between the two times don't affect the result. For example, the results aren't affected if the asset is removed and re-created again. Possible "state_change" values when compare_duration is specified: * "ADDED": indicates that the asset was not present at the start of compare_duration, but present at read_time. * "REMOVED": indicates that the asset was present at the start of compare_duration, but not present at read_time. * "ACTIVE": indicates that the asset was present at both the start and the end of the time period defined by compare_duration and read_time. If compare_duration is not specified, then the only possible state_change is "UNUSED", which will be the state_change set for all assets present at read_time. */
  compareDuration?: string;
  /** A field mask to specify the ListAssetsResult fields to be listed in the response. An empty field mask will list all fields. */
  fieldMask?: string;
  /** The value returned by the last `ListAssetsResponse`; indicates that this is a continuation of a prior `ListAssets` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  compareDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("compareDuration")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/assets" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsAssetsRequest>;

export type ListOrganizationsAssetsResponse = ListAssetsResponse;
export const ListOrganizationsAssetsResponse = ListAssetsResponse;

export type ListOrganizationsAssetsError = CommonErrors;

export const listOrganizationsAssets = API.makePaginated(() => ({
  input: ListOrganizationsAssetsRequest,
  output: ListOrganizationsAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Runs asset discovery. The discovery is tracked with a long-running operation. This API can only be called with limited frequency for an organization. If it is called too frequently the caller will receive a TOO_MANY_REQUESTS error. */
export interface RunDiscoveryOrganizationsAssetsRequest {
  /** Required. Name of the organization to run asset discovery for. Its format is `organizations/[organization_id]`. */
  parent: string;
  /** Request body */
  body?: RunAssetDiscoveryRequest;
}

export const RunDiscoveryOrganizationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RunAssetDiscoveryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/assets:runDiscovery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunDiscoveryOrganizationsAssetsRequest>;

export type RunDiscoveryOrganizationsAssetsResponse = Operation;
export const RunDiscoveryOrganizationsAssetsResponse = Operation;

export type RunDiscoveryOrganizationsAssetsError = CommonErrors;

export const runDiscoveryOrganizationsAssets: API.OperationMethod<RunDiscoveryOrganizationsAssetsRequest, RunDiscoveryOrganizationsAssetsResponse, RunDiscoveryOrganizationsAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunDiscoveryOrganizationsAssetsRequest,
  output: RunDiscoveryOrganizationsAssetsResponse,
  errors: [],
}));

/** Updates security marks. */
export interface UpdateSecurityMarksOrganizationsAssetsRequest {
  /** The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks". */
  name: string;
  /** The FieldMask to use when updating the security marks resource. The field mask must not contain duplicate fields. If empty or set to "marks", all marks will be replaced. Individual marks can be updated using "marks.". */
  updateMask?: string;
  /** The time at which the updated SecurityMarks take effect. If not set uses current server time. Updates will be applied to the SecurityMarks that are active immediately preceding this time. Must be earlier or equal to the server time. */
  startTime?: string;
  /** Request body */
  body?: SecurityMarks;
}

export const UpdateSecurityMarksOrganizationsAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  body: Schema.optional(SecurityMarks).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/assets/{assetsId}/securityMarks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecurityMarksOrganizationsAssetsRequest>;

export type UpdateSecurityMarksOrganizationsAssetsResponse = SecurityMarks;
export const UpdateSecurityMarksOrganizationsAssetsResponse = SecurityMarks;

export type UpdateSecurityMarksOrganizationsAssetsError = CommonErrors;

export const updateSecurityMarksOrganizationsAssets: API.OperationMethod<UpdateSecurityMarksOrganizationsAssetsRequest, UpdateSecurityMarksOrganizationsAssetsResponse, UpdateSecurityMarksOrganizationsAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecurityMarksOrganizationsAssetsRequest,
  output: UpdateSecurityMarksOrganizationsAssetsResponse,
  errors: [],
}));

/** Validates the given Event Threat Detection custom module. */
export interface ValidateCustomModuleOrganizationsEventThreatDetectionSettingsRequest {
  /** Required. Resource name of the parent to validate the Custom Module under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: ValidateEventThreatDetectionCustomModuleRequest;
}

export const ValidateCustomModuleOrganizationsEventThreatDetectionSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateEventThreatDetectionCustomModuleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings:validateCustomModule", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateCustomModuleOrganizationsEventThreatDetectionSettingsRequest>;

export type ValidateCustomModuleOrganizationsEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;
export const ValidateCustomModuleOrganizationsEventThreatDetectionSettingsResponse = ValidateEventThreatDetectionCustomModuleResponse;

export type ValidateCustomModuleOrganizationsEventThreatDetectionSettingsError = CommonErrors;

export const validateCustomModuleOrganizationsEventThreatDetectionSettings: API.OperationMethod<ValidateCustomModuleOrganizationsEventThreatDetectionSettingsRequest, ValidateCustomModuleOrganizationsEventThreatDetectionSettingsResponse, ValidateCustomModuleOrganizationsEventThreatDetectionSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateCustomModuleOrganizationsEventThreatDetectionSettingsRequest,
  output: ValidateCustomModuleOrganizationsEventThreatDetectionSettingsResponse,
  errors: [],
}));

/** Creates a resident Event Threat Detection custom module at the scope of the given Resource Manager parent, and also creates inherited custom modules for all descendants of the given parent. These modules are enabled by default. */
export interface CreateOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. The new custom module's parent. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const CreateOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type CreateOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const CreateOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type CreateOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const createOrganizationsEventThreatDetectionSettingsCustomModules: API.OperationMethod<CreateOrganizationsEventThreatDetectionSettingsCustomModulesRequest, CreateOrganizationsEventThreatDetectionSettingsCustomModulesResponse, CreateOrganizationsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: CreateOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Deletes the specified Event Threat Detection custom module and all of its descendants in the Resource Manager hierarchy. This method is only supported for resident custom modules. */
export interface DeleteOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to delete. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const DeleteOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type DeleteOrganizationsEventThreatDetectionSettingsCustomModulesResponse = Empty;
export const DeleteOrganizationsEventThreatDetectionSettingsCustomModulesResponse = Empty;

export type DeleteOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const deleteOrganizationsEventThreatDetectionSettingsCustomModules: API.OperationMethod<DeleteOrganizationsEventThreatDetectionSettingsCustomModulesRequest, DeleteOrganizationsEventThreatDetectionSettingsCustomModulesResponse, DeleteOrganizationsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: DeleteOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an Event Threat Detection custom module. */
export interface GetOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the custom module to get. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
}

export const GetOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules/{customModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type GetOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const GetOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type GetOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const getOrganizationsEventThreatDetectionSettingsCustomModules: API.OperationMethod<GetOrganizationsEventThreatDetectionSettingsCustomModulesRequest, GetOrganizationsEventThreatDetectionSettingsCustomModulesResponse, GetOrganizationsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: GetOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Lists all resident Event Threat Detection custom modules under the given Resource Manager parent and its descendants. */
export interface ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListDescendantEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDescendantEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules:listDescendant" }),
  svc,
) as unknown as Schema.Schema<ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;
export const ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesResponse = ListDescendantEventThreatDetectionCustomModulesResponse;

export type ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listDescendantOrganizationsEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: ListDescendantOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all Event Threat Detection custom modules for the given Resource Manager parent. This includes resident modules defined at the scope of the parent along with modules inherited from ancestors. */
export interface ListOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Required. Name of the parent to list custom modules under. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type ListOrganizationsEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;
export const ListOrganizationsEventThreatDetectionSettingsCustomModulesResponse = ListEventThreatDetectionCustomModulesResponse;

export type ListOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const listOrganizationsEventThreatDetectionSettingsCustomModules = API.makePaginated(() => ({
  input: ListOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: ListOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the Event Threat Detection custom module with the given name based on the given update mask. Updating the enablement state is supported for both resident and inherited modules (though resident modules cannot have an enablement state of "inherited"). Updating the display name or configuration of a module is supported for resident modules only. The type of a module cannot be changed. */
export interface PatchOrganizationsEventThreatDetectionSettingsCustomModulesRequest {
  /** Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`. */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: EventThreatDetectionCustomModule;
}

export const PatchOrganizationsEventThreatDetectionSettingsCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(EventThreatDetectionCustomModule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/customModules/{customModulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsEventThreatDetectionSettingsCustomModulesRequest>;

export type PatchOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;
export const PatchOrganizationsEventThreatDetectionSettingsCustomModulesResponse = EventThreatDetectionCustomModule;

export type PatchOrganizationsEventThreatDetectionSettingsCustomModulesError = CommonErrors;

export const patchOrganizationsEventThreatDetectionSettingsCustomModules: API.OperationMethod<PatchOrganizationsEventThreatDetectionSettingsCustomModulesRequest, PatchOrganizationsEventThreatDetectionSettingsCustomModulesResponse, PatchOrganizationsEventThreatDetectionSettingsCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsEventThreatDetectionSettingsCustomModulesRequest,
  output: PatchOrganizationsEventThreatDetectionSettingsCustomModulesResponse,
  errors: [],
}));

/** Gets an effective Event Threat Detection custom module at the given level. */
export interface GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. The resource name of the effective Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/effectiveCustomModules/{module}`. */
  name: string;
}

export const GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/effectiveCustomModules/{effectiveCustomModulesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;
export const GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse = EffectiveEventThreatDetectionCustomModule;

export type GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const getOrganizationsEventThreatDetectionSettingsEffectiveCustomModules: API.OperationMethod<GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest, GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse, GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: GetOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
}));

/** Lists all effective Event Threat Detection custom modules for the given parent. This includes resident modules defined at the scope of the parent along with modules inherited from its ancestors. */
export interface ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest {
  /** Required. Name of the parent to list custom modules for. Its format is: * `organizations/{organization}/eventThreatDetectionSettings`. * `folders/{folder}/eventThreatDetectionSettings`. * `projects/{project}/eventThreatDetectionSettings`. */
  parent: string;
  /** A page token, received from a previous `ListEffectiveEventThreatDetectionCustomModules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEffectiveEventThreatDetectionCustomModules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of modules to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/eventThreatDetectionSettings/effectiveCustomModules" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest>;

export type ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;
export const ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse = ListEffectiveEventThreatDetectionCustomModulesResponse;

export type ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesError = CommonErrors;

export const listOrganizationsEventThreatDetectionSettingsEffectiveCustomModules = API.makePaginated(() => ({
  input: ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesRequest,
  output: ListOrganizationsEventThreatDetectionSettingsEffectiveCustomModulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a ResourceValueConfig for an organization. Maps user's tags to difference resource values for use by the attack path simulation. */
export interface BatchCreateOrganizationsResourceValueConfigsRequest {
  /** Required. Resource name of the new ResourceValueConfig's parent. The parent field in the CreateResourceValueConfigRequest messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: BatchCreateResourceValueConfigsRequest;
}

export const BatchCreateOrganizationsResourceValueConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateResourceValueConfigsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/resourceValueConfigs:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateOrganizationsResourceValueConfigsRequest>;

export type BatchCreateOrganizationsResourceValueConfigsResponse = BatchCreateResourceValueConfigsResponse;
export const BatchCreateOrganizationsResourceValueConfigsResponse = BatchCreateResourceValueConfigsResponse;

export type BatchCreateOrganizationsResourceValueConfigsError = CommonErrors;

export const batchCreateOrganizationsResourceValueConfigs: API.OperationMethod<BatchCreateOrganizationsResourceValueConfigsRequest, BatchCreateOrganizationsResourceValueConfigsResponse, BatchCreateOrganizationsResourceValueConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateOrganizationsResourceValueConfigsRequest,
  output: BatchCreateOrganizationsResourceValueConfigsResponse,
  errors: [],
}));

/** Deletes a ResourceValueConfig. */
export interface DeleteOrganizationsResourceValueConfigsRequest {
  /** Required. Name of the ResourceValueConfig to delete */
  name: string;
}

export const DeleteOrganizationsResourceValueConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/resourceValueConfigs/{resourceValueConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsResourceValueConfigsRequest>;

export type DeleteOrganizationsResourceValueConfigsResponse = Empty;
export const DeleteOrganizationsResourceValueConfigsResponse = Empty;

export type DeleteOrganizationsResourceValueConfigsError = CommonErrors;

export const deleteOrganizationsResourceValueConfigs: API.OperationMethod<DeleteOrganizationsResourceValueConfigsRequest, DeleteOrganizationsResourceValueConfigsResponse, DeleteOrganizationsResourceValueConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsResourceValueConfigsRequest,
  output: DeleteOrganizationsResourceValueConfigsResponse,
  errors: [],
}));

/** Gets a ResourceValueConfig. */
export interface GetOrganizationsResourceValueConfigsRequest {
  /** Required. Name of the resource value config to retrieve. Its format is `organizations/{organization}/resourceValueConfigs/{config_id}`. */
  name: string;
}

export const GetOrganizationsResourceValueConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/resourceValueConfigs/{resourceValueConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsResourceValueConfigsRequest>;

export type GetOrganizationsResourceValueConfigsResponse = GoogleCloudSecuritycenterV1ResourceValueConfig;
export const GetOrganizationsResourceValueConfigsResponse = GoogleCloudSecuritycenterV1ResourceValueConfig;

export type GetOrganizationsResourceValueConfigsError = CommonErrors;

export const getOrganizationsResourceValueConfigs: API.OperationMethod<GetOrganizationsResourceValueConfigsRequest, GetOrganizationsResourceValueConfigsResponse, GetOrganizationsResourceValueConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsResourceValueConfigsRequest,
  output: GetOrganizationsResourceValueConfigsResponse,
  errors: [],
}));

/** Lists all ResourceValueConfigs. */
export interface ListOrganizationsResourceValueConfigsRequest {
  /** Required. The parent, which owns the collection of resource value configs. Its format is `organizations/[organization_id]` */
  parent: string;
  /** The number of results to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListResourceValueConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListResourceValueConfigs` must match the call that provided the page token. page_size can be specified, and the new page_size will be used. */
  pageToken?: string;
}

export const ListOrganizationsResourceValueConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/resourceValueConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsResourceValueConfigsRequest>;

export type ListOrganizationsResourceValueConfigsResponse = ListResourceValueConfigsResponse;
export const ListOrganizationsResourceValueConfigsResponse = ListResourceValueConfigsResponse;

export type ListOrganizationsResourceValueConfigsError = CommonErrors;

export const listOrganizationsResourceValueConfigs = API.makePaginated(() => ({
  input: ListOrganizationsResourceValueConfigsRequest,
  output: ListOrganizationsResourceValueConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing ResourceValueConfigs with new rules. */
export interface PatchOrganizationsResourceValueConfigsRequest {
  /** Name for the resource value configuration */
  name: string;
  /** The list of fields to be updated. If empty all mutable fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudSecuritycenterV1ResourceValueConfig;
}

export const PatchOrganizationsResourceValueConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudSecuritycenterV1ResourceValueConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/resourceValueConfigs/{resourceValueConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsResourceValueConfigsRequest>;

export type PatchOrganizationsResourceValueConfigsResponse = GoogleCloudSecuritycenterV1ResourceValueConfig;
export const PatchOrganizationsResourceValueConfigsResponse = GoogleCloudSecuritycenterV1ResourceValueConfig;

export type PatchOrganizationsResourceValueConfigsError = CommonErrors;

export const patchOrganizationsResourceValueConfigs: API.OperationMethod<PatchOrganizationsResourceValueConfigsRequest, PatchOrganizationsResourceValueConfigsResponse, PatchOrganizationsResourceValueConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsResourceValueConfigsRequest,
  output: PatchOrganizationsResourceValueConfigsResponse,
  errors: [],
}));

/** Lists the valued resources for a set of simulation results and filter. */
export interface ListOrganizationsValuedResourcesRequest {
  /** Required. Name of parent to list valued resources. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` */
  parent: string;
  /** The filter expression that filters the valued resources in the response. Supported fields: * `resource_value` supports = * `resource_type` supports = */
  filter?: string;
  /** The value returned by the last `ListValuedResourcesResponse`; indicates that this is a continuation of a prior `ListValuedResources` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
  /** Optional. The fields by which to order the valued resources response. Supported fields: * `exposed_score` * `resource_value` * `resource_type` * `resource` * `display_name` Values should be a comma separated list of fields. For example: `exposed_score,resource_value`. The default sorting order is descending. To specify ascending or descending order for a field, append a ` ASC` or a ` DESC` suffix, respectively; for example: `exposed_score DESC`. */
  orderBy?: string;
}

export const ListOrganizationsValuedResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/valuedResources" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsValuedResourcesRequest>;

export type ListOrganizationsValuedResourcesResponse = ListValuedResourcesResponse;
export const ListOrganizationsValuedResourcesResponse = ListValuedResourcesResponse;

export type ListOrganizationsValuedResourcesError = CommonErrors;

export const listOrganizationsValuedResources = API.makePaginated(() => ({
  input: ListOrganizationsValuedResourcesRequest,
  output: ListOrganizationsValuedResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the attack paths for a set of simulation results or valued resources and filter. */
export interface ListOrganizationsAttackPathsRequest {
  /** Required. Name of parent to list attack paths. Valid formats: `organizations/{organization}`, `organizations/{organization}/simulations/{simulation}` `organizations/{organization}/simulations/{simulation}/attackExposureResults/{attack_exposure_result_v2}` `organizations/{organization}/simulations/{simulation}/valuedResources/{valued_resource}` */
  parent: string;
  /** The filter expression that filters the attack path in the response. Supported fields: * `valued_resources` supports = */
  filter?: string;
  /** The value returned by the last `ListAttackPathsResponse`; indicates that this is a continuation of a prior `ListAttackPaths` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The maximum number of results to return in a single response. Default is 10, minimum is 1, maximum is 1000. */
  pageSize?: number;
}

export const ListOrganizationsAttackPathsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/attackPaths" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsAttackPathsRequest>;

export type ListOrganizationsAttackPathsResponse = ListAttackPathsResponse;
export const ListOrganizationsAttackPathsResponse = ListAttackPathsResponse;

export type ListOrganizationsAttackPathsError = CommonErrors;

export const listOrganizationsAttackPaths = API.makePaginated(() => ({
  input: ListOrganizationsAttackPathsRequest,
  output: ListOrganizationsAttackPathsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

