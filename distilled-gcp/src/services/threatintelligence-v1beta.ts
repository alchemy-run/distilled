// ==========================================================================
// Threat Intelligence API (threatintelligence v1beta)
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
  name: "threatintelligence",
  version: "v1beta",
  rootUrl: "https://threatintelligence.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Audit {
  /** Output only. Time of creation or last update. */
  updateTime?: string;
  /** Output only. Time of creation. */
  createTime?: string;
  /** Output only. Agent that created or updated the record, could be a UserId or a JobId. */
  creator?: string;
  /** Output only. Agent that last updated the record, could be a UserId or a JobId. */
  updater?: string;
}

export const Audit: Schema.Schema<Audit> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  updater: Schema.optional(Schema.String),
})).annotate({ identifier: "Audit" }) as any as Schema.Schema<Audit>;

export interface CustomerProfileIndustry {
  /** Required. The name of the industry. */
  industry?: string;
  /** Optional. The citation ids for the industry. */
  citationIds?: Array<string>;
}

export const CustomerProfileIndustry: Schema.Schema<CustomerProfileIndustry> = Schema.suspend(() => Schema.Struct({
  industry: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileIndustry" }) as any as Schema.Schema<CustomerProfileIndustry>;

export interface CustomerProfileCompany {
  /** Required. The name of the company. */
  company?: string;
  /** Optional. The citation ids for the company. */
  citationIds?: Array<string>;
}

export const CustomerProfileCompany: Schema.Schema<CustomerProfileCompany> = Schema.suspend(() => Schema.Struct({
  company: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileCompany" }) as any as Schema.Schema<CustomerProfileCompany>;

export interface CustomerProfileProduct {
  /** Required. The name of the product. */
  product?: string;
  /** Required. The brand of the product. */
  brand?: string;
  /** Optional. The citation ids for the product. */
  citationIds?: Array<string>;
}

export const CustomerProfileProduct: Schema.Schema<CustomerProfileProduct> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileProduct" }) as any as Schema.Schema<CustomerProfileProduct>;

export interface CustomerProfileLocation {
  /** Optional. The type of location. */
  facilityType?: string;
  /** Required. The brand of the location. */
  brand?: string;
  /** Required. The address of the location. */
  address?: string;
  /** Optional. The citation ids for the location. */
  citationIds?: Array<string>;
}

export const CustomerProfileLocation: Schema.Schema<CustomerProfileLocation> = Schema.suspend(() => Schema.Struct({
  facilityType: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileLocation" }) as any as Schema.Schema<CustomerProfileLocation>;

export interface CustomerProfilePerson {
  /** Required. The name of the person. */
  name?: string;
  /** Optional. The title of the person. */
  title?: string;
  /** Optional. The citation ids for the person. */
  citationIds?: Array<string>;
}

export const CustomerProfilePerson: Schema.Schema<CustomerProfilePerson> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfilePerson" }) as any as Schema.Schema<CustomerProfilePerson>;

export interface CustomerProfileWebPresence {
  /** Required. The domain name of the web presence. */
  domain?: string;
  /** Optional. The citation ids for the web presence. */
  citationIds?: Array<string>;
}

export const CustomerProfileWebPresence: Schema.Schema<CustomerProfileWebPresence> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileWebPresence" }) as any as Schema.Schema<CustomerProfileWebPresence>;

export interface CustomerProfileSecurityConsiderations {
  /** Optional. A note about the security considerations. */
  note?: string;
  /** Optional. A series of considerations for the security of the organization, such as "high risk of compromise" or "vulnerable to cyberbullying". */
  considerations?: Array<string>;
}

export const CustomerProfileSecurityConsiderations: Schema.Schema<CustomerProfileSecurityConsiderations> = Schema.suspend(() => Schema.Struct({
  note: Schema.optional(Schema.String),
  considerations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileSecurityConsiderations" }) as any as Schema.Schema<CustomerProfileSecurityConsiderations>;

export interface CustomerProfileContactInfo {
  /** The email address of the contact. */
  email?: string;
  /** The phone number of the contact. */
  phone?: string;
  /** The address of the contact. */
  address?: string;
  /** The other contact information. */
  other?: string;
  /** Optional. The name of the contact. */
  label?: string;
  /** Optional. The citation ids for the contact information. */
  citationIds?: Array<string>;
}

export const CustomerProfileContactInfo: Schema.Schema<CustomerProfileContactInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  phone: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  other: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileContactInfo" }) as any as Schema.Schema<CustomerProfileContactInfo>;

export interface CustomerProfileCitation {
  /** Required. The citation id for the citation. Should be unique within the profile. */
  citationId?: string;
  /** Optional. The url of the citation. */
  uri?: string;
  /** The time the citation was retrieved. */
  retrievalTime?: string;
  /** Required. The source of the citation. */
  source?: string;
  /** Required. The name of the document the citation is from. */
  document?: string;
}

export const CustomerProfileCitation: Schema.Schema<CustomerProfileCitation> = Schema.suspend(() => Schema.Struct({
  citationId: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  retrievalTime: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  document: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerProfileCitation" }) as any as Schema.Schema<CustomerProfileCitation>;

export interface CustomerProfileCitedString {
  /** Required. The value of the string. */
  value?: string;
  /** Optional. The citation ids for the string. */
  citationIds?: Array<string>;
}

export const CustomerProfileCitedString: Schema.Schema<CustomerProfileCitedString> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  citationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomerProfileCitedString" }) as any as Schema.Schema<CustomerProfileCitedString>;

export interface CustomerProfileSummary {
  /** Optional. The official name of the customer. */
  title?: CustomerProfileCitedString;
  /** Optional. The entity type of the customer. */
  entityType?: CustomerProfileCitedString;
  /** Optional. The industry the customer is in. */
  industry?: CustomerProfileCitedString;
  /** Optional. The date the customer was founded. */
  founded?: CustomerProfileCitedString;
  /** Optional. The headquarters of the customer. */
  headquarters?: CustomerProfileCitedString;
  /** Optional. The area the customer serves. */
  areaServed?: CustomerProfileCitedString;
  /** Optional. A narrative summary of key people. */
  keyPeopleSummary?: CustomerProfileCitedString;
  /** Optional. A narrative summary of products. */
  productsSummary?: CustomerProfileCitedString;
  /** Optional. A narrative summary of services. */
  servicesSummary?: CustomerProfileCitedString;
  /** Optional. A narrative summary of brands. */
  brands?: CustomerProfileCitedString;
  /** Optional. The parent company of the customer. */
  parentCompany?: CustomerProfileCitedString;
  /** Optional. The primary website of the customer. */
  primaryWebsite?: CustomerProfileCitedString;
}

export const CustomerProfileSummary: Schema.Schema<CustomerProfileSummary> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(CustomerProfileCitedString),
  entityType: Schema.optional(CustomerProfileCitedString),
  industry: Schema.optional(CustomerProfileCitedString),
  founded: Schema.optional(CustomerProfileCitedString),
  headquarters: Schema.optional(CustomerProfileCitedString),
  areaServed: Schema.optional(CustomerProfileCitedString),
  keyPeopleSummary: Schema.optional(CustomerProfileCitedString),
  productsSummary: Schema.optional(CustomerProfileCitedString),
  servicesSummary: Schema.optional(CustomerProfileCitedString),
  brands: Schema.optional(CustomerProfileCitedString),
  parentCompany: Schema.optional(CustomerProfileCitedString),
  primaryWebsite: Schema.optional(CustomerProfileCitedString),
})).annotate({ identifier: "CustomerProfileSummary" }) as any as Schema.Schema<CustomerProfileSummary>;

export interface CustomerProfileConfig {
  /** Required. The name of the organization. */
  org?: string;
  /** Optional. A summary of the organization. */
  orgSummary?: string;
  /** Optional. The industries the organization is involved in. */
  industries?: Array<CustomerProfileIndustry>;
  /** Optional. The parent companies of the organization. */
  parentCompanies?: Array<CustomerProfileCompany>;
  /** Optional. Product information for the organization. */
  products?: Array<CustomerProfileProduct>;
  /** Optional. Locations the organization is present or conducts business in. */
  locations?: Array<CustomerProfileLocation>;
  /** Optional. Executives of the organization. */
  executives?: Array<CustomerProfilePerson>;
  /** Optional. Web presence of the organization. */
  webPresences?: Array<CustomerProfileWebPresence>;
  /** Optional. Technology presence of the organization. */
  technologyPresence?: string;
  /** Optional. Security considerations for the organization. */
  securityConsiderations?: CustomerProfileSecurityConsiderations;
  /** Optional. Contact information for the organization. */
  contactInfo?: Array<CustomerProfileContactInfo>;
  /** Optional. Citations for the organization profile. */
  citations?: Array<CustomerProfileCitation>;
  /** Optional. A summarized version of the customer profile. */
  summary?: CustomerProfileSummary;
}

export const CustomerProfileConfig: Schema.Schema<CustomerProfileConfig> = Schema.suspend(() => Schema.Struct({
  org: Schema.optional(Schema.String),
  orgSummary: Schema.optional(Schema.String),
  industries: Schema.optional(Schema.Array(CustomerProfileIndustry)),
  parentCompanies: Schema.optional(Schema.Array(CustomerProfileCompany)),
  products: Schema.optional(Schema.Array(CustomerProfileProduct)),
  locations: Schema.optional(Schema.Array(CustomerProfileLocation)),
  executives: Schema.optional(Schema.Array(CustomerProfilePerson)),
  webPresences: Schema.optional(Schema.Array(CustomerProfileWebPresence)),
  technologyPresence: Schema.optional(Schema.String),
  securityConsiderations: Schema.optional(CustomerProfileSecurityConsiderations),
  contactInfo: Schema.optional(Schema.Array(CustomerProfileContactInfo)),
  citations: Schema.optional(Schema.Array(CustomerProfileCitation)),
  summary: Schema.optional(CustomerProfileSummary),
})).annotate({ identifier: "CustomerProfileConfig" }) as any as Schema.Schema<CustomerProfileConfig>;

export interface ConfigurationDetail {
  /** Customer Profile detail config. */
  customerProfile?: CustomerProfileConfig;
  /** Output only. Name of the detail type. Will be set by the server during creation to the name of the field that is set in the detail union. */
  detailType?: string;
}

export const ConfigurationDetail: Schema.Schema<ConfigurationDetail> = Schema.suspend(() => Schema.Struct({
  customerProfile: Schema.optional(CustomerProfileConfig),
  detailType: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigurationDetail" }) as any as Schema.Schema<ConfigurationDetail>;

export interface Configuration {
  /** Identifier. Server generated name for the configuration. format is projects/{project}/configurations/{configuration} */
  name?: string;
  /** Output only. Human readable name for the configuration. */
  displayName?: string;
  /** Output only. Audit information for the configuration. */
  audit?: Audit;
  /** Required. Name of the service that provides the configuration. */
  provider?: string;
  /** Optional. State of the configuration. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "DEPRECATED" | (string & {});
  /** Required. Domain specific details for the configuration. */
  detail?: ConfigurationDetail;
  /** Optional. A user-manipulatable version. Does not adhere to a specific format */
  version?: string;
  /** Optional. A description of the configuration. */
  description?: string;
}

export const Configuration: Schema.Schema<Configuration> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  audit: Schema.optional(Audit),
  provider: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  detail: Schema.optional(ConfigurationDetail),
  version: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Configuration" }) as any as Schema.Schema<Configuration>;

export interface ListConfigurationsResponse {
  /** List of configurations. */
  configurations?: Array<Configuration>;
  /** Page token. */
  nextPageToken?: string;
}

export const ListConfigurationsResponse: Schema.Schema<ListConfigurationsResponse> = Schema.suspend(() => Schema.Struct({
  configurations: Schema.optional(Schema.Array(Configuration)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConfigurationsResponse" }) as any as Schema.Schema<ListConfigurationsResponse>;

export interface ConfigurationRevision {
  /** Identifier. The name of the ConfigurationRevision Format: projects//configurations//revisions/ */
  name?: string;
  /** The snapshot of the configuration */
  snapshot?: Configuration;
  /** Output only. The time the Revision was created */
  createTime?: string;
}

export const ConfigurationRevision: Schema.Schema<ConfigurationRevision> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  snapshot: Schema.optional(Configuration),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigurationRevision" }) as any as Schema.Schema<ConfigurationRevision>;

export interface ListConfigurationRevisionsResponse {
  /** The Configuration Revisions associated with the specified Configuration */
  revisions?: Array<ConfigurationRevision>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListConfigurationRevisionsResponse: Schema.Schema<ListConfigurationRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  revisions: Schema.optional(Schema.Array(ConfigurationRevision)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConfigurationRevisionsResponse" }) as any as Schema.Schema<ListConfigurationRevisionsResponse>;

export interface UpsertConfigurationResponse {
  /** Output only. Created configuration ID with server assigned id. */
  configuration?: string;
}

export const UpsertConfigurationResponse: Schema.Schema<UpsertConfigurationResponse> = Schema.suspend(() => Schema.Struct({
  configuration: Schema.optional(Schema.String),
})).annotate({ identifier: "UpsertConfigurationResponse" }) as any as Schema.Schema<UpsertConfigurationResponse>;

export interface GenerateOrgProfileConfigurationRequest {
  /** Required. The domain of the organization to generate the profile for. */
  domain?: string;
  /** Required. The display name of the organization to generate the profile for. */
  displayName?: string;
}

export const GenerateOrgProfileConfigurationRequest: Schema.Schema<GenerateOrgProfileConfigurationRequest> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateOrgProfileConfigurationRequest" }) as any as Schema.Schema<GenerateOrgProfileConfigurationRequest>;

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

export interface InitialAccessBrokerFindingDetail {
  /** Required. Reference to the match score of the IAB finding. This is a float value between 0 and 1 calculated by the matching engine based on the similarity of the document and the user provided configurations. */
  matchScore?: number;
  /** Required. The severity of the IAB finding. This indicates the potential impact of the threat. */
  severity?: "SEVERITY_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Required. The unique identifier of the document that triggered the IAB finding. This ID can be used to retrieve the content of the document for further analysis. */
  documentId?: string;
}

export const InitialAccessBrokerFindingDetail: Schema.Schema<InitialAccessBrokerFindingDetail> = Schema.suspend(() => Schema.Struct({
  matchScore: Schema.optional(Schema.Number),
  severity: Schema.optional(Schema.String),
  documentId: Schema.optional(Schema.String),
})).annotate({ identifier: "InitialAccessBrokerFindingDetail" }) as any as Schema.Schema<InitialAccessBrokerFindingDetail>;

export interface DataLeakFindingDetail {
  /** Required. Reference to the match score of the Data Leak finding. This is a float value greater than 0 and less than or equal to 1 calculated by the matching engine based on the similarity of the document and the user provided configurations. */
  matchScore?: number;
  /** Required. The severity of the Data Leak finding. This indicates the potential impact of the threat. */
  severity?: "SEVERITY_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Required. The unique identifier of the document that triggered the Data Leak finding. This ID can be used to retrieve the content of the document for further analysis. */
  documentId?: string;
}

export const DataLeakFindingDetail: Schema.Schema<DataLeakFindingDetail> = Schema.suspend(() => Schema.Struct({
  matchScore: Schema.optional(Schema.Number),
  severity: Schema.optional(Schema.String),
  documentId: Schema.optional(Schema.String),
})).annotate({ identifier: "DataLeakFindingDetail" }) as any as Schema.Schema<DataLeakFindingDetail>;

export interface InsiderThreatFindingDetail {
  /** Required. Reference to the match score of the InsiderThreat finding. This is a float value greater than 0 and less than or equal to 1 calculated by the matching engine based on the similarity of the document and the user provided configurations. */
  matchScore?: number;
  /** Required. The severity of the InsiderThreat finding. This indicates the potential impact of the threat. */
  severity?: "SEVERITY_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Required. The unique identifier of the document that triggered the InsiderThreat finding. This ID can be used to retrieve the content of the document for further analysis. */
  documentId?: string;
}

export const InsiderThreatFindingDetail: Schema.Schema<InsiderThreatFindingDetail> = Schema.suspend(() => Schema.Struct({
  matchScore: Schema.optional(Schema.Number),
  severity: Schema.optional(Schema.String),
  documentId: Schema.optional(Schema.String),
})).annotate({ identifier: "InsiderThreatFindingDetail" }) as any as Schema.Schema<InsiderThreatFindingDetail>;

export interface FindingDetail {
  /** Initial Access Broker finding detail type. */
  initialAccessBroker?: InitialAccessBrokerFindingDetail;
  /** Data Leak finding detail type. */
  dataLeak?: DataLeakFindingDetail;
  /** Insider Threat finding detail type. */
  insiderThreat?: InsiderThreatFindingDetail;
  /** Output only. Name of the detail type. Will be set by the server during creation to the name of the field that is set in the detail union. */
  detailType?: string;
}

export const FindingDetail: Schema.Schema<FindingDetail> = Schema.suspend(() => Schema.Struct({
  initialAccessBroker: Schema.optional(InitialAccessBrokerFindingDetail),
  dataLeak: Schema.optional(DataLeakFindingDetail),
  insiderThreat: Schema.optional(InsiderThreatFindingDetail),
  detailType: Schema.optional(Schema.String),
})).annotate({ identifier: "FindingDetail" }) as any as Schema.Schema<FindingDetail>;

export interface Evidence {
  /** A list of semantic themes or concepts found to be common, related, or aligned between the sources, supporting the verdict. */
  commonThemes?: Array<string>;
  /** A list of semantic themes or descriptions unique to one source or semantically distant. */
  distinctThemes?: Array<string>;
}

export const Evidence: Schema.Schema<Evidence> = Schema.suspend(() => Schema.Struct({
  commonThemes: Schema.optional(Schema.Array(Schema.String)),
  distinctThemes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Evidence" }) as any as Schema.Schema<Evidence>;

export interface RelevanceAnalysis {
  /** Indicates whether the threat is considered relevant. */
  relevant?: boolean;
  /** The level of confidence in the given verdict. */
  confidence?: "CONFIDENCE_LEVEL_UNSPECIFIED" | "CONFIDENCE_LEVEL_LOW" | "CONFIDENCE_LEVEL_MEDIUM" | "CONFIDENCE_LEVEL_HIGH" | (string & {});
  /** Human-readable explanation from the matcher, detailing why a particular result is considered relevant or not relevant. */
  reasoning?: string;
  /** Evidence supporting the verdict, including matched and unmatched items. */
  evidence?: Evidence;
  /** The level of relevance. */
  relevanceLevel?: "RELEVANCE_LEVEL_UNSPECIFIED" | "RELEVANCE_LEVEL_LOW" | "RELEVANCE_LEVEL_MEDIUM" | "RELEVANCE_LEVEL_HIGH" | (string & {});
}

export const RelevanceAnalysis: Schema.Schema<RelevanceAnalysis> = Schema.suspend(() => Schema.Struct({
  relevant: Schema.optional(Schema.Boolean),
  confidence: Schema.optional(Schema.String),
  reasoning: Schema.optional(Schema.String),
  evidence: Schema.optional(Evidence),
  relevanceLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "RelevanceAnalysis" }) as any as Schema.Schema<RelevanceAnalysis>;

export interface SeverityAnalysis {
  /** The level of severity. */
  severityLevel?: "SEVERITY_LEVEL_UNSPECIFIED" | "SEVERITY_LEVEL_LOW" | "SEVERITY_LEVEL_MEDIUM" | "SEVERITY_LEVEL_HIGH" | (string & {});
  /** The level of confidence in the given verdict. */
  confidence?: "CONFIDENCE_LEVEL_UNSPECIFIED" | "CONFIDENCE_LEVEL_LOW" | "CONFIDENCE_LEVEL_MEDIUM" | "CONFIDENCE_LEVEL_HIGH" | (string & {});
  /** Human-readable explanation from the model, detailing why a particular result is considered to have a certain severity. */
  reasoning?: string;
}

export const SeverityAnalysis: Schema.Schema<SeverityAnalysis> = Schema.suspend(() => Schema.Struct({
  severityLevel: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.String),
  reasoning: Schema.optional(Schema.String),
})).annotate({ identifier: "SeverityAnalysis" }) as any as Schema.Schema<SeverityAnalysis>;

export interface Finding {
  /** Identifier. Server generated name for the finding (leave clear during creation). Format: projects/{project}/findings/{finding} */
  name?: string;
  /** Required. Logical source of this finding (name of the sub-engine). */
  provider?: string;
  /** Required. A short descriptive title for the finding <= 250 chars. EX: "Actor 'baddy' offering $1000 for credentials of 'goodguy'". */
  displayName?: string;
  /** Required. Holder of the domain specific details of the finding. */
  detail?: FindingDetail;
  /** Optional. Deprecated: Use the `severity_analysis` field instead. Base severity score from the finding source. */
  severity?: number;
  /** Output only. When identical finding (same labels and same details) has re-occurred. */
  reoccurrenceTimes?: Array<string>;
  /** Output only. High-Precision Relevance Analysis verdict for the finding. */
  relevanceAnalysis?: RelevanceAnalysis;
  /** Output only. High-Precision Severity Analysis verdict for the finding. */
  severityAnalysis?: SeverityAnalysis;
  /** Optional. AI summary of the finding. */
  aiSummary?: string;
  /** Output only. Audit data about the finding. */
  audit?: Audit;
  /** Optional. Name of the alert that this finding is bound to. */
  alert?: string;
  /** Optional. Configuration names that are bound to this finding. */
  configurations?: Array<string>;
}

export const Finding: Schema.Schema<Finding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  detail: Schema.optional(FindingDetail),
  severity: Schema.optional(Schema.Number),
  reoccurrenceTimes: Schema.optional(Schema.Array(Schema.String)),
  relevanceAnalysis: Schema.optional(RelevanceAnalysis),
  severityAnalysis: Schema.optional(SeverityAnalysis),
  aiSummary: Schema.optional(Schema.String),
  audit: Schema.optional(Audit),
  alert: Schema.optional(Schema.String),
  configurations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Finding" }) as any as Schema.Schema<Finding>;

export interface ListFindingsResponse {
  /** List of findings. */
  findings?: Array<Finding>;
  /** Page token. */
  nextPageToken?: string;
}

export const ListFindingsResponse: Schema.Schema<ListFindingsResponse> = Schema.suspend(() => Schema.Struct({
  findings: Schema.optional(Schema.Array(Finding)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFindingsResponse" }) as any as Schema.Schema<ListFindingsResponse>;

export interface SearchFindingsResponse {
  /** List of findings. */
  findings?: Array<Finding>;
  /** Page token. */
  nextPageToken?: string;
}

export const SearchFindingsResponse: Schema.Schema<SearchFindingsResponse> = Schema.suspend(() => Schema.Struct({
  findings: Schema.optional(Schema.Array(Finding)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchFindingsResponse" }) as any as Schema.Schema<SearchFindingsResponse>;

export interface InitialAccessBrokerAlertDetail {
  /** Required. IAB specific severity */
  severity?: string;
  /** Required. Array of ids to accommodate multiple discovery documents */
  discoveryDocumentIds?: Array<string>;
}

export const InitialAccessBrokerAlertDetail: Schema.Schema<InitialAccessBrokerAlertDetail> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  discoveryDocumentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InitialAccessBrokerAlertDetail" }) as any as Schema.Schema<InitialAccessBrokerAlertDetail>;

export interface DataLeakAlertDetail {
  /** Required. Data Leak specific severity This will be the string representation of the DataLeakFindingDetail.Severityenum. (e.g., "LOW", "MEDIUM", "HIGH", "CRITICAL") */
  severity?: string;
  /** Required. Array of ids to accommodate multiple discovery documents */
  discoveryDocumentIds?: Array<string>;
}

export const DataLeakAlertDetail: Schema.Schema<DataLeakAlertDetail> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  discoveryDocumentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataLeakAlertDetail" }) as any as Schema.Schema<DataLeakAlertDetail>;

export interface InsiderThreatAlertDetail {
  /** Required. InsiderThreat specific severity This will be the string representation of the InsiderThreatFindingDetail.Severityenum. (e.g., "LOW", "MEDIUM", "HIGH", "CRITICAL") */
  severity?: string;
  /** Required. Array of ids to accommodate multiple discovery documents */
  discoveryDocumentIds?: Array<string>;
}

export const InsiderThreatAlertDetail: Schema.Schema<InsiderThreatAlertDetail> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  discoveryDocumentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InsiderThreatAlertDetail" }) as any as Schema.Schema<InsiderThreatAlertDetail>;

export interface AlertDetail {
  /** Initial Access Broker alert detail type. */
  initialAccessBroker?: InitialAccessBrokerAlertDetail;
  /** Data Leak alert detail type. */
  dataLeak?: DataLeakAlertDetail;
  /** Insider Threat alert detail type. */
  insiderThreat?: InsiderThreatAlertDetail;
  /** Output only. Name of the detail type. Will be set by the server during creation to the name of the field that is set in the detail union. */
  detailType?: string;
}

export const AlertDetail: Schema.Schema<AlertDetail> = Schema.suspend(() => Schema.Struct({
  initialAccessBroker: Schema.optional(InitialAccessBrokerAlertDetail),
  dataLeak: Schema.optional(DataLeakAlertDetail),
  insiderThreat: Schema.optional(InsiderThreatAlertDetail),
  detailType: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertDetail" }) as any as Schema.Schema<AlertDetail>;

export interface PriorityAnalysis {
  /** The level of Priority. */
  priorityLevel?: "PRIORITY_LEVEL_UNSPECIFIED" | "PRIORITY_LEVEL_LOW" | "PRIORITY_LEVEL_MEDIUM" | "PRIORITY_LEVEL_HIGH" | "PRIORITY_LEVEL_CRITICAL" | (string & {});
  /** The level of confidence in the given verdict. */
  confidence?: "CONFIDENCE_LEVEL_UNSPECIFIED" | "CONFIDENCE_LEVEL_LOW" | "CONFIDENCE_LEVEL_MEDIUM" | "CONFIDENCE_LEVEL_HIGH" | (string & {});
  /** Human-readable explanation from the model, detailing why a particular result is considered to have a certain priority. */
  reasoning?: string;
}

export const PriorityAnalysis: Schema.Schema<PriorityAnalysis> = Schema.suspend(() => Schema.Struct({
  priorityLevel: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.String),
  reasoning: Schema.optional(Schema.String),
})).annotate({ identifier: "PriorityAnalysis" }) as any as Schema.Schema<PriorityAnalysis>;

export interface Alert {
  /** Identifier. Server generated name for the alert. format is projects/{project}/alerts/{alert} */
  name?: string;
  /** Output only. Findings that are covered by this alert. */
  findings?: Array<string>;
  /** Output only. State of the alert. */
  state?: "STATE_UNSPECIFIED" | "NEW" | "READ" | "TRIAGED" | "ESCALATED" | "RESOLVED" | "DUPLICATE" | "FALSE_POSITIVE" | "NOT_ACTIONABLE" | "BENIGN" | "TRACKED_EXTERNALLY" | (string & {});
  /** Output only. Audit information for the alert. */
  audit?: Audit;
  /** Output only. A short title for the alert. */
  displayName?: string;
  /** Output only. Details object for the alert, not all alerts will have a details object. */
  detail?: AlertDetail;
  /** Output only. alert name of the alert this alert is a duplicate of. Format: projects/{project}/alerts/{alert} */
  duplicateOf?: string;
  /** Output only. alert names of the alerts that are duplicates of this alert. Format: projects/{project}/alerts/{alert} */
  duplicatedBy?: Array<string>;
  /** Optional. If included when updating an alert, this should be set to the current etag of the alert. If the etags do not match, the update will be rejected and an ABORTED error will be returned. */
  etag?: string;
  /** Output only. External ID for the alert. This is used internally to provide protection against out of order updates. */
  externalId?: string;
  /** Optional. AI summary of the finding. */
  aiSummary?: string;
  /** Output only. High-Precision Relevance Analysis verdict for the alert. */
  relevanceAnalysis?: RelevanceAnalysis;
  /** Output only. High-Precision Severity Analysis for the alert. */
  severityAnalysis?: SeverityAnalysis;
  /** Output only. High-Precision Priority Analysis for the alert. */
  priorityAnalysis?: PriorityAnalysis;
  /** Output only. The number of findings associated with this alert. */
  findingCount?: string;
  /** Output only. The resource names of the Configurations bound to this alert. Format: projects/{project}/configurations/{configuration} */
  configurations?: Array<string>;
}

export const Alert: Schema.Schema<Alert> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  findings: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  audit: Schema.optional(Audit),
  displayName: Schema.optional(Schema.String),
  detail: Schema.optional(AlertDetail),
  duplicateOf: Schema.optional(Schema.String),
  duplicatedBy: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  externalId: Schema.optional(Schema.String),
  aiSummary: Schema.optional(Schema.String),
  relevanceAnalysis: Schema.optional(RelevanceAnalysis),
  severityAnalysis: Schema.optional(SeverityAnalysis),
  priorityAnalysis: Schema.optional(PriorityAnalysis),
  findingCount: Schema.optional(Schema.String),
  configurations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Alert" }) as any as Schema.Schema<Alert>;

export interface ListAlertsResponse {
  /** List of alerts. */
  alerts?: Array<Alert>;
  /** Page token. */
  nextPageToken?: string;
}

export const ListAlertsResponse: Schema.Schema<ListAlertsResponse> = Schema.suspend(() => Schema.Struct({
  alerts: Schema.optional(Schema.Array(Alert)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAlertsResponse" }) as any as Schema.Schema<ListAlertsResponse>;

export interface FacetCount {
  /** Value of the facet stringified. Timestamps will be formatted using RFC3339. */
  value?: string;
  /** Count of records with the value. */
  count?: number;
}

export const FacetCount: Schema.Schema<FacetCount> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  count: Schema.optional(Schema.Number),
})).annotate({ identifier: "FacetCount" }) as any as Schema.Schema<FacetCount>;

export interface Facet {
  /** Name of the facet. This is also the string that needs to be used in the filtering expression. */
  facet?: string;
  /** List of counts for the facet (if categorical). */
  facetCounts?: Array<FacetCount>;
  /** The type of the facet. Options include "string", "int", "float", "bool", "enum", "timestamp", "user" and are useful to show the right sort of UI controls when building a AIP-160 style filtering string. */
  facetType?: string;
  /** Min value of the facet stringified based on type. This is only populated for facets that have a clear ordering, for types like enum it will be left empty. Timestamps will be formatted using RFC3339. */
  minValue?: string;
  /** Max value of the facet stringified based on type. Will be populated and formatted the same as min_value. */
  maxValue?: string;
  /** Total number of records that contain this facet with ANY value. */
  totalCount?: string;
}

export const Facet: Schema.Schema<Facet> = Schema.suspend(() => Schema.Struct({
  facet: Schema.optional(Schema.String),
  facetCounts: Schema.optional(Schema.Array(FacetCount)),
  facetType: Schema.optional(Schema.String),
  minValue: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.String),
  totalCount: Schema.optional(Schema.String),
})).annotate({ identifier: "Facet" }) as any as Schema.Schema<Facet>;

export interface EnumerateAlertFacetsResponse {
  /** List of facets and the counts. */
  facets?: Array<Facet>;
}

export const EnumerateAlertFacetsResponse: Schema.Schema<EnumerateAlertFacetsResponse> = Schema.suspend(() => Schema.Struct({
  facets: Schema.optional(Schema.Array(Facet)),
})).annotate({ identifier: "EnumerateAlertFacetsResponse" }) as any as Schema.Schema<EnumerateAlertFacetsResponse>;

export interface MarkAlertAsReadRequest {
}

export const MarkAlertAsReadRequest: Schema.Schema<MarkAlertAsReadRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsReadRequest" }) as any as Schema.Schema<MarkAlertAsReadRequest>;

export interface MarkAlertAsTriagedRequest {
}

export const MarkAlertAsTriagedRequest: Schema.Schema<MarkAlertAsTriagedRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsTriagedRequest" }) as any as Schema.Schema<MarkAlertAsTriagedRequest>;

export interface MarkAlertAsEscalatedRequest {
}

export const MarkAlertAsEscalatedRequest: Schema.Schema<MarkAlertAsEscalatedRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsEscalatedRequest" }) as any as Schema.Schema<MarkAlertAsEscalatedRequest>;

export interface MarkAlertAsResolvedRequest {
}

export const MarkAlertAsResolvedRequest: Schema.Schema<MarkAlertAsResolvedRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsResolvedRequest" }) as any as Schema.Schema<MarkAlertAsResolvedRequest>;

export interface MarkAlertAsFalsePositiveRequest {
}

export const MarkAlertAsFalsePositiveRequest: Schema.Schema<MarkAlertAsFalsePositiveRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsFalsePositiveRequest" }) as any as Schema.Schema<MarkAlertAsFalsePositiveRequest>;

export interface MarkAlertAsNotActionableRequest {
}

export const MarkAlertAsNotActionableRequest: Schema.Schema<MarkAlertAsNotActionableRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsNotActionableRequest" }) as any as Schema.Schema<MarkAlertAsNotActionableRequest>;

export interface MarkAlertAsBenignRequest {
}

export const MarkAlertAsBenignRequest: Schema.Schema<MarkAlertAsBenignRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsBenignRequest" }) as any as Schema.Schema<MarkAlertAsBenignRequest>;

export interface MarkAlertAsTrackedExternallyRequest {
}

export const MarkAlertAsTrackedExternallyRequest: Schema.Schema<MarkAlertAsTrackedExternallyRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MarkAlertAsTrackedExternallyRequest" }) as any as Schema.Schema<MarkAlertAsTrackedExternallyRequest>;

export interface MarkAlertAsDuplicateRequest {
  /** Optional. Name of the alert to mark as a duplicate of. Format: projects/{project}/alerts/{alert} */
  duplicateOf?: string;
}

export const MarkAlertAsDuplicateRequest: Schema.Schema<MarkAlertAsDuplicateRequest> = Schema.suspend(() => Schema.Struct({
  duplicateOf: Schema.optional(Schema.String),
})).annotate({ identifier: "MarkAlertAsDuplicateRequest" }) as any as Schema.Schema<MarkAlertAsDuplicateRequest>;

export interface AlertDocumentTranslation {
  /** Output only. The translated title of the document. */
  translatedTitle?: string;
  /** Output only. The translated content of the document. */
  translatedContent?: string;
}

export const AlertDocumentTranslation: Schema.Schema<AlertDocumentTranslation> = Schema.suspend(() => Schema.Struct({
  translatedTitle: Schema.optional(Schema.String),
  translatedContent: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertDocumentTranslation" }) as any as Schema.Schema<AlertDocumentTranslation>;

export interface AlertDocument {
  /** Identifier. Server generated name for the alert document. format is projects/{project}/alerts/{alert}/documents/{document} */
  name?: string;
  /** Output only. The content of the document. */
  content?: string;
  /** Output only. The author of the document. */
  author?: string;
  /** Output only. The time the document was created. */
  createTime?: string;
  /** Output only. The language code of the document. */
  languageCode?: string;
  /** Output only. The title of the document, if available. */
  title?: string;
  /** Output only. AI summary of the finding. */
  aiSummary?: string;
  /** Output only. The translation of the document, if available. */
  translation?: AlertDocumentTranslation;
  /** Output only. Source of the intel item, e.g. DarkMarket. */
  source?: string;
  /** Output only. URI of the intel item from the source. */
  sourceUri?: string;
  /** Output only. Time when GTI received the intel. */
  ingestTime?: string;
  /** Output only. Time when the origin source collected the intel. */
  collectionTime?: string;
  /** Output only. Time when the intel was last updated by the source. */
  sourceUpdateTime?: string;
}

export const AlertDocument: Schema.Schema<AlertDocument> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  author: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  aiSummary: Schema.optional(Schema.String),
  translation: Schema.optional(AlertDocumentTranslation),
  source: Schema.optional(Schema.String),
  sourceUri: Schema.optional(Schema.String),
  ingestTime: Schema.optional(Schema.String),
  collectionTime: Schema.optional(Schema.String),
  sourceUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertDocument" }) as any as Schema.Schema<AlertDocument>;

// ==========================================================================
// Operations
// ==========================================================================

/** Triggers the generation of a Customer Profile for a project. */
export interface GenerateOrgProfileProjectsRequest {
  /** Required. The name of the project to generate the profile for. Format: projects/{project} */
  name: string;
  /** Request body */
  body?: GenerateOrgProfileConfigurationRequest;
}

export const GenerateOrgProfileProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateOrgProfileConfigurationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}:generateOrgProfile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateOrgProfileProjectsRequest>;

export type GenerateOrgProfileProjectsResponse = Operation;
export const GenerateOrgProfileProjectsResponse = Operation;

export type GenerateOrgProfileProjectsError = CommonErrors;

export const generateOrgProfileProjects: API.OperationMethod<GenerateOrgProfileProjectsRequest, GenerateOrgProfileProjectsResponse, GenerateOrgProfileProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateOrgProfileProjectsRequest,
  output: GenerateOrgProfileProjectsResponse,
  errors: [],
}));

/** Get a configuration by name. */
export interface GetProjectsConfigurationsRequest {
  /** Required. Name of the configuration to get. Format: vaults/{vault}/configurations/{configuration} */
  name: string;
}

export const GetProjectsConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/configurations/{configurationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConfigurationsRequest>;

export type GetProjectsConfigurationsResponse = Configuration;
export const GetProjectsConfigurationsResponse = Configuration;

export type GetProjectsConfigurationsError = CommonErrors;

export const getProjectsConfigurations: API.OperationMethod<GetProjectsConfigurationsRequest, GetProjectsConfigurationsResponse, GetProjectsConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConfigurationsRequest,
  output: GetProjectsConfigurationsResponse,
  errors: [],
}));

/** Get a list of configurations that meet the filter criteria. */
export interface ListProjectsConfigurationsRequest {
  /** Required. Parent of the configuration. Format: vaults/{vault} */
  parent: string;
  /** Optional. Filter criteria. */
  filter?: string;
  /** Optional. Order by criteria in the csv format: "field1,field2 desc" or "field1,field2" or "field1 asc, field2". */
  orderBy?: string;
  /** Optional. Page token. */
  pageToken?: string;
  /** Optional. Page size. */
  pageSize?: number;
}

export const ListProjectsConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/configurations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConfigurationsRequest>;

export type ListProjectsConfigurationsResponse = ListConfigurationsResponse;
export const ListProjectsConfigurationsResponse = ListConfigurationsResponse;

export type ListProjectsConfigurationsError = CommonErrors;

export const listProjectsConfigurations = API.makePaginated(() => ({
  input: ListProjectsConfigurationsRequest,
  output: ListProjectsConfigurationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates or updates a configuration. */
export interface UpsertProjectsConfigurationsRequest {
  /** Required. Parent of the configuration. */
  parent: string;
  /** Optional. Time that the configuration should be considered to have been published. This is an advanced feature used when onboarding and bulk loading data from other systems. Do not set this field without consulting with the API team. */
  publishTime?: string;
  /** Request body */
  body?: Configuration;
}

export const UpsertProjectsConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  publishTime: Schema.optional(Schema.String).pipe(T.HttpQuery("publishTime")),
  body: Schema.optional(Configuration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/configurations:upsert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpsertProjectsConfigurationsRequest>;

export type UpsertProjectsConfigurationsResponse = UpsertConfigurationResponse;
export const UpsertProjectsConfigurationsResponse = UpsertConfigurationResponse;

export type UpsertProjectsConfigurationsError = CommonErrors;

export const upsertProjectsConfigurations: API.OperationMethod<UpsertProjectsConfigurationsRequest, UpsertProjectsConfigurationsResponse, UpsertProjectsConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpsertProjectsConfigurationsRequest,
  output: UpsertProjectsConfigurationsResponse,
  errors: [],
}));

/** List configuration revisions that meet the filter criteria. */
export interface ListProjectsConfigurationsRevisionsRequest {
  /** Required. The name of the Configuration to retrieve Revisions for */
  parent: string;
  /** Optional. An AIP-160 filter string */
  filter?: string;
  /** Optional. Specify ordering of response */
  orderBy?: string;
  /** Optional. Page Size */
  pageSize?: number;
  /** Optional. A page token provided by the API */
  pageToken?: string;
}

export const ListProjectsConfigurationsRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/configurations/{configurationsId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConfigurationsRevisionsRequest>;

export type ListProjectsConfigurationsRevisionsResponse = ListConfigurationRevisionsResponse;
export const ListProjectsConfigurationsRevisionsResponse = ListConfigurationRevisionsResponse;

export type ListProjectsConfigurationsRevisionsError = CommonErrors;

export const listProjectsConfigurationsRevisions = API.makePaginated(() => ({
  input: ListProjectsConfigurationsRevisionsRequest,
  output: ListProjectsConfigurationsRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a finding by name. The `name` field should have the format: `projects/{project}/findings/{finding}` */
export interface GetProjectsFindingsRequest {
  /** Required. Name of the finding to get. */
  name: string;
}

export const GetProjectsFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/findings/{findingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsFindingsRequest>;

export type GetProjectsFindingsResponse = Finding;
export const GetProjectsFindingsResponse = Finding;

export type GetProjectsFindingsError = CommonErrors;

export const getProjectsFindings: API.OperationMethod<GetProjectsFindingsRequest, GetProjectsFindingsResponse, GetProjectsFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsFindingsRequest,
  output: GetProjectsFindingsResponse,
  errors: [],
}));

/** Get a list of findings that meet the filter criteria. The `parent` field in ListFindingsRequest should have the format: projects/{project} */
export interface ListProjectsFindingsRequest {
  /** Required. Parent of the findings. */
  parent: string;
  /** Optional. Filter criteria. */
  filter?: string;
  /** Optional. Order by criteria in the csv format: "field1,field2 desc" or "field1,field2" or "field1 asc, field2". */
  orderBy?: string;
  /** Optional. Page token. */
  pageToken?: string;
  /** Optional. Page size. */
  pageSize?: number;
}

export const ListProjectsFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/findings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsFindingsRequest>;

export type ListProjectsFindingsResponse = ListFindingsResponse;
export const ListProjectsFindingsResponse = ListFindingsResponse;

export type ListProjectsFindingsError = CommonErrors;

export const listProjectsFindings = API.makePaginated(() => ({
  input: ListProjectsFindingsRequest,
  output: ListProjectsFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** SearchFindings is a more powerful version of ListFindings that supports complex queries like "findings for alerts" using functions such as `has_alert` in the query string. The `parent` field in SearchFindingsRequest should have the format: projects/{project} Example to search for findings for a specific issue: `has_alert("name=\"projects/gti-12345/alerts/alert-12345\"")` */
export interface SearchProjectsFindingsRequest {
  /** Required. Parent of the findings. Format: vaults/{vault} */
  parent: string;
  /** Optional. Query on what findings will be returned. This supports the same filter criteria as FindingService.ListFindings as well as the following relationship query `has_alert`. Example: - `has_alert("name=\"projects/gti-12345/alerts/alert-12345\"")` */
  query?: string;
  /** Optional. Order by criteria in the csv format: "field1,field2 desc" or "field1,field2" or "field1 asc, field2". */
  orderBy?: string;
  /** Optional. Page token. */
  pageToken?: string;
  /** Optional. Page size. */
  pageSize?: number;
}

export const SearchProjectsFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/findings:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsFindingsRequest>;

export type SearchProjectsFindingsResponse = SearchFindingsResponse;
export const SearchProjectsFindingsResponse = SearchFindingsResponse;

export type SearchProjectsFindingsError = CommonErrors;

export const searchProjectsFindings = API.makePaginated(() => ({
  input: SearchProjectsFindingsRequest,
  output: SearchProjectsFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get an alert by name. */
export interface GetProjectsAlertsRequest {
  /** Required. Name of the alert to get. Format: projects/{project}/alerts/{alert} */
  name: string;
}

export const GetProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/alerts/{alertsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAlertsRequest>;

export type GetProjectsAlertsResponse = Alert;
export const GetProjectsAlertsResponse = Alert;

export type GetProjectsAlertsError = CommonErrors;

export const getProjectsAlerts: API.OperationMethod<GetProjectsAlertsRequest, GetProjectsAlertsResponse, GetProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAlertsRequest,
  output: GetProjectsAlertsResponse,
  errors: [],
}));

/** Get a list of alerts that meet the filter criteria. */
export interface ListProjectsAlertsRequest {
  /** Required. Parent of the alerts. Format: projects/{project} */
  parent: string;
  /** Optional. Filter criteria. */
  filter?: string;
  /** Optional. Order by criteria in the csv format: "field1,field2 desc" or "field1,field2" or "field1 asc, field2". */
  orderBy?: string;
  /** Optional. Page token. */
  pageToken?: string;
  /** Optional. Page size. */
  pageSize?: number;
}

export const ListProjectsAlertsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/alerts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAlertsRequest>;

export type ListProjectsAlertsResponse = ListAlertsResponse;
export const ListProjectsAlertsResponse = ListAlertsResponse;

export type ListProjectsAlertsError = CommonErrors;

export const listProjectsAlerts = API.makePaginated(() => ({
  input: ListProjectsAlertsRequest,
  output: ListProjectsAlertsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** EnumerateAlertFacets returns the facets and the number of alerts that meet the filter criteria and have that value for each facet. */
export interface EnumerateFacetsProjectsAlertsRequest {
  /** Required. Parent of the alerts. */
  parent: string;
  /** Optional. Filter on what alerts will be enumerated. */
  filter?: string;
}

export const EnumerateFacetsProjectsAlertsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/alerts:enumerateFacets" }),
  svc,
) as unknown as Schema.Schema<EnumerateFacetsProjectsAlertsRequest>;

export type EnumerateFacetsProjectsAlertsResponse = EnumerateAlertFacetsResponse;
export const EnumerateFacetsProjectsAlertsResponse = EnumerateAlertFacetsResponse;

export type EnumerateFacetsProjectsAlertsError = CommonErrors;

export const enumerateFacetsProjectsAlerts: API.OperationMethod<EnumerateFacetsProjectsAlertsRequest, EnumerateFacetsProjectsAlertsResponse, EnumerateFacetsProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnumerateFacetsProjectsAlertsRequest,
  output: EnumerateFacetsProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as read - READ. */
export interface ReadProjectsAlertsRequest {
  /** Required. Name of the alert to mark as read. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsReadRequest;
}

export const ReadProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsReadRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:read", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReadProjectsAlertsRequest>;

export type ReadProjectsAlertsResponse = Alert;
export const ReadProjectsAlertsResponse = Alert;

export type ReadProjectsAlertsError = CommonErrors;

export const readProjectsAlerts: API.OperationMethod<ReadProjectsAlertsRequest, ReadProjectsAlertsResponse, ReadProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReadProjectsAlertsRequest,
  output: ReadProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as triaged - TRIAGED. */
export interface TriageProjectsAlertsRequest {
  /** Required. Name of the alert to mark as a triaged. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsTriagedRequest;
}

export const TriageProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsTriagedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:triage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TriageProjectsAlertsRequest>;

export type TriageProjectsAlertsResponse = Alert;
export const TriageProjectsAlertsResponse = Alert;

export type TriageProjectsAlertsError = CommonErrors;

export const triageProjectsAlerts: API.OperationMethod<TriageProjectsAlertsRequest, TriageProjectsAlertsResponse, TriageProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TriageProjectsAlertsRequest,
  output: TriageProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as escalated - ESCALATED. */
export interface EscalateProjectsAlertsRequest {
  /** Required. Name of the alert to mark as escalated. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsEscalatedRequest;
}

export const EscalateProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsEscalatedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:escalate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EscalateProjectsAlertsRequest>;

export type EscalateProjectsAlertsResponse = Alert;
export const EscalateProjectsAlertsResponse = Alert;

export type EscalateProjectsAlertsError = CommonErrors;

export const escalateProjectsAlerts: API.OperationMethod<EscalateProjectsAlertsRequest, EscalateProjectsAlertsResponse, EscalateProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EscalateProjectsAlertsRequest,
  output: EscalateProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert to closed state - RESOLVED. */
export interface ResolveProjectsAlertsRequest {
  /** Required. Name of the alert to mark as resolved. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsResolvedRequest;
}

export const ResolveProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsResolvedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsAlertsRequest>;

export type ResolveProjectsAlertsResponse = Alert;
export const ResolveProjectsAlertsResponse = Alert;

export type ResolveProjectsAlertsError = CommonErrors;

export const resolveProjectsAlerts: API.OperationMethod<ResolveProjectsAlertsRequest, ResolveProjectsAlertsResponse, ResolveProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveProjectsAlertsRequest,
  output: ResolveProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as a false positive - FALSE_POSITIVE. */
export interface FalsePositiveProjectsAlertsRequest {
  /** Required. Name of the alert to mark as a false positive. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsFalsePositiveRequest;
}

export const FalsePositiveProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsFalsePositiveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:falsePositive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FalsePositiveProjectsAlertsRequest>;

export type FalsePositiveProjectsAlertsResponse = Alert;
export const FalsePositiveProjectsAlertsResponse = Alert;

export type FalsePositiveProjectsAlertsError = CommonErrors;

export const falsePositiveProjectsAlerts: API.OperationMethod<FalsePositiveProjectsAlertsRequest, FalsePositiveProjectsAlertsResponse, FalsePositiveProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FalsePositiveProjectsAlertsRequest,
  output: FalsePositiveProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as not actionable - NOT_ACTIONABLE. */
export interface NotActionableProjectsAlertsRequest {
  /** Required. Name of the alert to mark as a not actionable. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsNotActionableRequest;
}

export const NotActionableProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsNotActionableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:notActionable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<NotActionableProjectsAlertsRequest>;

export type NotActionableProjectsAlertsResponse = Alert;
export const NotActionableProjectsAlertsResponse = Alert;

export type NotActionableProjectsAlertsError = CommonErrors;

export const notActionableProjectsAlerts: API.OperationMethod<NotActionableProjectsAlertsRequest, NotActionableProjectsAlertsResponse, NotActionableProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: NotActionableProjectsAlertsRequest,
  output: NotActionableProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as benign - BENIGN. */
export interface BenignProjectsAlertsRequest {
  /** Required. Name of the alert to mark as a benign. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsBenignRequest;
}

export const BenignProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsBenignRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:benign", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BenignProjectsAlertsRequest>;

export type BenignProjectsAlertsResponse = Alert;
export const BenignProjectsAlertsResponse = Alert;

export type BenignProjectsAlertsError = CommonErrors;

export const benignProjectsAlerts: API.OperationMethod<BenignProjectsAlertsRequest, BenignProjectsAlertsResponse, BenignProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BenignProjectsAlertsRequest,
  output: BenignProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as tracked externally - TRACKED_EXTERNALLY. */
export interface TrackExternallyProjectsAlertsRequest {
  /** Required. Name of the alert to mark as tracked externally. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsTrackedExternallyRequest;
}

export const TrackExternallyProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsTrackedExternallyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:trackExternally", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrackExternallyProjectsAlertsRequest>;

export type TrackExternallyProjectsAlertsResponse = Alert;
export const TrackExternallyProjectsAlertsResponse = Alert;

export type TrackExternallyProjectsAlertsError = CommonErrors;

export const trackExternallyProjectsAlerts: API.OperationMethod<TrackExternallyProjectsAlertsRequest, TrackExternallyProjectsAlertsResponse, TrackExternallyProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TrackExternallyProjectsAlertsRequest,
  output: TrackExternallyProjectsAlertsResponse,
  errors: [],
}));

/** Marks an alert as a duplicate of another alert. - DUPLICATE. */
export interface DuplicateProjectsAlertsRequest {
  /** Required. Name of the alert to mark as a duplicate. Format: projects/{project}/alerts/{alert} */
  name: string;
  /** Request body */
  body?: MarkAlertAsDuplicateRequest;
}

export const DuplicateProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MarkAlertAsDuplicateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/projects/{projectsId}/alerts/{alertsId}:duplicate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DuplicateProjectsAlertsRequest>;

export type DuplicateProjectsAlertsResponse = Alert;
export const DuplicateProjectsAlertsResponse = Alert;

export type DuplicateProjectsAlertsError = CommonErrors;

export const duplicateProjectsAlerts: API.OperationMethod<DuplicateProjectsAlertsRequest, DuplicateProjectsAlertsResponse, DuplicateProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DuplicateProjectsAlertsRequest,
  output: DuplicateProjectsAlertsResponse,
  errors: [],
}));

/** Gets a specific document associated with an alert. */
export interface GetProjectsAlertsDocumentsRequest {
  /** Required. Name of the alert document to get. Format: projects/{project}/alerts/{alert}/documents/{document} */
  name: string;
}

export const GetProjectsAlertsDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/alerts/{alertsId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAlertsDocumentsRequest>;

export type GetProjectsAlertsDocumentsResponse = AlertDocument;
export const GetProjectsAlertsDocumentsResponse = AlertDocument;

export type GetProjectsAlertsDocumentsError = CommonErrors;

export const getProjectsAlertsDocuments: API.OperationMethod<GetProjectsAlertsDocumentsRequest, GetProjectsAlertsDocumentsResponse, GetProjectsAlertsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAlertsDocumentsRequest,
  output: GetProjectsAlertsDocumentsResponse,
  errors: [],
}));

