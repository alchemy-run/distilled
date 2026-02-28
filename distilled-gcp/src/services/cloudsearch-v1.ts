// ==========================================================================
// Cloud Search API (cloudsearch v1)
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
  name: "cloudsearch",
  version: "v1",
  rootUrl: "https://cloudsearch.googleapis.com/",
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

export interface GSuitePrincipal {
  /** This principal references a Google Workspace user account. */
  gsuiteUserEmail?: string;
  /** This principal references a Google Workspace group name. */
  gsuiteGroupEmail?: string;
  /** This principal represents all users of the Google Workspace domain of the customer. */
  gsuiteDomain?: boolean;
}

export const GSuitePrincipal: Schema.Schema<GSuitePrincipal> = Schema.suspend(() => Schema.Struct({
  gsuiteUserEmail: Schema.optional(Schema.String),
  gsuiteGroupEmail: Schema.optional(Schema.String),
  gsuiteDomain: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GSuitePrincipal" }) as any as Schema.Schema<GSuitePrincipal>;

export interface Principal {
  /** This principal is a Google Workspace user, group or domain. */
  gsuitePrincipal?: GSuitePrincipal;
  /** This principal is a user identified using an external identity. The name field must specify the user resource name with this format: identitysources/{source_id}/users/{ID} */
  userResourceName?: string;
  /** This principal is a group identified using an external identity. The name field must specify the group resource name with this format: identitysources/{source_id}/groups/{ID} */
  groupResourceName?: string;
}

export const Principal: Schema.Schema<Principal> = Schema.suspend(() => Schema.Struct({
  gsuitePrincipal: Schema.optional(GSuitePrincipal),
  userResourceName: Schema.optional(Schema.String),
  groupResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "Principal" }) as any as Schema.Schema<Principal>;

export interface CheckAccessResponse {
  /** Returns true if principal has access. Returns false otherwise. */
  hasAccess?: boolean;
}

export const CheckAccessResponse: Schema.Schema<CheckAccessResponse> = Schema.suspend(() => Schema.Struct({
  hasAccess: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckAccessResponse" }) as any as Schema.Schema<CheckAccessResponse>;

export interface DebugOptions {
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  enableDebugging?: boolean;
}

export const DebugOptions: Schema.Schema<DebugOptions> = Schema.suspend(() => Schema.Struct({
  enableDebugging: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DebugOptions" }) as any as Schema.Schema<DebugOptions>;

export interface SearchItemsByViewUrlRequest {
  /** Specify the full view URL to find the corresponding item. The maximum length is 2048 characters. */
  viewUrl?: string;
  /** The next_page_token value returned from a previous request, if any. */
  pageToken?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const SearchItemsByViewUrlRequest: Schema.Schema<SearchItemsByViewUrlRequest> = Schema.suspend(() => Schema.Struct({
  viewUrl: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "SearchItemsByViewUrlRequest" }) as any as Schema.Schema<SearchItemsByViewUrlRequest>;

export interface ItemAcl {
  /** The name of the item to inherit the Access Permission List (ACL) from. Note: ACL inheritance *only* provides access permissions to child items and does not define structural relationships, nor does it provide convenient ways to delete large groups of items. Deleting an ACL parent from the index only alters the access permissions of child items that reference the parent in the inheritAclFrom field. The item is still in the index, but may not visible in search results. By contrast, deletion of a container item also deletes all items that reference the container via the containerName field. The maximum length for this field is 1536 characters. */
  inheritAclFrom?: string;
  /** Sets the type of access rules to apply when an item inherits its ACL from a parent. This should always be set in tandem with the inheritAclFrom field. Also, when the inheritAclFrom field is set, this field should be set to a valid AclInheritanceType. */
  aclInheritanceType?: "NOT_APPLICABLE" | "CHILD_OVERRIDE" | "PARENT_OVERRIDE" | "BOTH_PERMIT" | (string & {});
  /** List of principals who are allowed to see the item in search results. Optional if inheriting permissions from another item or if the item is not intended to be visible, such as virtual containers. The maximum number of elements is 1000. */
  readers?: Array<Principal>;
  /** List of principals who are explicitly denied access to the item in search results. While principals are denied access by default, use denied readers to handle exceptions and override the list allowed readers. The maximum number of elements is 100. */
  deniedReaders?: Array<Principal>;
  /** Optional. List of owners for the item. This field has no bearing on document access permissions. It does, however, offer a slight ranking boosts items where the querying user is an owner. The maximum number of elements is 5. */
  owners?: Array<Principal>;
}

export const ItemAcl: Schema.Schema<ItemAcl> = Schema.suspend(() => Schema.Struct({
  inheritAclFrom: Schema.optional(Schema.String),
  aclInheritanceType: Schema.optional(Schema.String),
  readers: Schema.optional(Schema.Array(Principal)),
  deniedReaders: Schema.optional(Schema.Array(Principal)),
  owners: Schema.optional(Schema.Array(Principal)),
})).annotate({ identifier: "ItemAcl" }) as any as Schema.Schema<ItemAcl>;

export interface Interaction {
  type?: "UNSPECIFIED" | "VIEW" | "EDIT" | (string & {});
  /** The user that acted on the item. */
  principal?: Principal;
  /** The time when the user acted on the item. If multiple actions of the same type exist for a single user, only the most recent action is recorded. */
  interactionTime?: string;
}

export const Interaction: Schema.Schema<Interaction> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  principal: Schema.optional(Principal),
  interactionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interaction" }) as any as Schema.Schema<Interaction>;

export interface SearchQualityMetadata {
  /** An indication of the quality of the item, used to influence search quality. Value should be between 0.0 (lowest quality) and 1.0 (highest quality). The default value is 0.0. */
  quality?: number;
}

export const SearchQualityMetadata: Schema.Schema<SearchQualityMetadata> = Schema.suspend(() => Schema.Struct({
  quality: Schema.optional(Schema.Number),
})).annotate({ identifier: "SearchQualityMetadata" }) as any as Schema.Schema<SearchQualityMetadata>;

export interface ContextAttribute {
  /** The name of the attribute. It should not be empty. The maximum length is 32 characters. The name must start with a letter and can only contain letters (A-Z, a-z) or numbers (0-9). The name will be normalized (lower-cased) before being matched. */
  name?: string;
  /** Text values of the attribute. The maximum number of elements is 10. The maximum length of an element in the array is 32 characters. The value will be normalized (lower-cased) before being matched. */
  values?: Array<string>;
}

export const ContextAttribute: Schema.Schema<ContextAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContextAttribute" }) as any as Schema.Schema<ContextAttribute>;

export interface ItemMetadata {
  /** The title of the item. If given, this will be the displayed title of the Search result. The maximum length is 2048 characters. */
  title?: string;
  /** Link to the source repository serving the data. Seach results apply this link to the title. Whitespace or special characters may cause Cloud Seach result links to trigger a redirect notice; to avoid this, encode the URL. The maximum length is 2048 characters. */
  sourceRepositoryUrl?: string;
  /** The name of the container for this item. Deletion of the container item leads to automatic deletion of this item. Note: ACLs are not inherited from a container item. To provide ACL inheritance for an item, use the inheritAclFrom field. The maximum length is 1536 characters. */
  containerName?: string;
  /** The type of the item. This should correspond to the name of an object definition in the schema registered for the data source. For example, if the schema for the data source contains an object definition with name 'document', then item indexing requests for objects of that type should set objectType to 'document'. The maximum length is 256 characters. */
  objectType?: string;
  /** The time when the item was created in the source repository. */
  createTime?: string;
  /** The time when the item was last modified in the source repository. */
  updateTime?: string;
  /** A list of interactions for the item. Interactions are used to improve Search quality, but are not exposed to end users. The maximum number of elements is 1000. */
  interactions?: Array<Interaction>;
  /** The BCP-47 language code for the item, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. The maximum length is 32 characters. */
  contentLanguage?: string;
  /** The original mime-type of ItemContent.content in the source repository. The maximum length is 256 characters. */
  mimeType?: string;
  /** Additional search quality metadata of the item */
  searchQualityMetadata?: SearchQualityMetadata;
  /** Additional keywords or phrases that should match the item. Used internally for user generated content. The maximum number of elements is 100. The maximum length is 8192 characters. */
  keywords?: Array<string>;
  /** Hashing value provided by the API caller. This can be used with the items.push method to calculate modified state. The maximum length is 2048 characters. */
  hash?: string;
  /** A set of named attributes associated with the item. This can be used for influencing the ranking of the item based on the context in the request. The maximum number of elements is 10. */
  contextAttributes?: Array<ContextAttribute>;
}

export const ItemMetadata: Schema.Schema<ItemMetadata> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  sourceRepositoryUrl: Schema.optional(Schema.String),
  containerName: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  interactions: Schema.optional(Schema.Array(Interaction)),
  contentLanguage: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  searchQualityMetadata: Schema.optional(SearchQualityMetadata),
  keywords: Schema.optional(Schema.Array(Schema.String)),
  hash: Schema.optional(Schema.String),
  contextAttributes: Schema.optional(Schema.Array(ContextAttribute)),
})).annotate({ identifier: "ItemMetadata" }) as any as Schema.Schema<ItemMetadata>;

export interface IntegerValues {
  values?: Array<string>;
}

export const IntegerValues: Schema.Schema<IntegerValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IntegerValues" }) as any as Schema.Schema<IntegerValues>;

export interface DoubleValues {
  values?: Array<number>;
}

export const DoubleValues: Schema.Schema<DoubleValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "DoubleValues" }) as any as Schema.Schema<DoubleValues>;

export interface TimestampValues {
  values?: Array<string>;
}

export const TimestampValues: Schema.Schema<TimestampValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TimestampValues" }) as any as Schema.Schema<TimestampValues>;

export interface ObjectValues {
  values?: Array<StructuredDataObject>;
}

export const ObjectValues: Schema.Schema<ObjectValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(StructuredDataObject)),
})).annotate({ identifier: "ObjectValues" }) as any as Schema.Schema<ObjectValues>;

export interface EnumValues {
  /** The maximum allowable length for string values is 32 characters. */
  values?: Array<string>;
}

export const EnumValues: Schema.Schema<EnumValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnumValues" }) as any as Schema.Schema<EnumValues>;

export interface Cloudsearch_Date {
  /** Year of date. Must be from 1 to 9999. */
  year?: number;
  /** Month of date. Must be from 1 to 12. */
  month?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  day?: number;
}

export const Cloudsearch_Date: Schema.Schema<Cloudsearch_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Cloudsearch_Date" }) as any as Schema.Schema<Cloudsearch_Date>;

export interface DateValues {
  values?: Array<Cloudsearch_Date>;
}

export const DateValues: Schema.Schema<DateValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Cloudsearch_Date)),
})).annotate({ identifier: "DateValues" }) as any as Schema.Schema<DateValues>;

export interface TextValues {
  /** The maximum allowable length for text values is 2048 characters. */
  values?: Array<string>;
}

export const TextValues: Schema.Schema<TextValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TextValues" }) as any as Schema.Schema<TextValues>;

export interface HtmlValues {
  /** The maximum allowable length for html values is 2048 characters. */
  values?: Array<string>;
}

export const HtmlValues: Schema.Schema<HtmlValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HtmlValues" }) as any as Schema.Schema<HtmlValues>;

export interface NamedProperty {
  /** The name of the property. This name should correspond to the name of the property that was registered for object definition in the schema. The maximum allowable length for this property is 256 characters. */
  name?: string;
  integerValues?: IntegerValues;
  doubleValues?: DoubleValues;
  timestampValues?: TimestampValues;
  booleanValue?: boolean;
  objectValues?: ObjectValues;
  enumValues?: EnumValues;
  dateValues?: DateValues;
  textValues?: TextValues;
  htmlValues?: HtmlValues;
}

export const NamedProperty: Schema.Schema<NamedProperty> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  integerValues: Schema.optional(IntegerValues),
  doubleValues: Schema.optional(DoubleValues),
  timestampValues: Schema.optional(TimestampValues),
  booleanValue: Schema.optional(Schema.Boolean),
  objectValues: Schema.optional(ObjectValues),
  enumValues: Schema.optional(EnumValues),
  dateValues: Schema.optional(DateValues),
  textValues: Schema.optional(TextValues),
  htmlValues: Schema.optional(HtmlValues),
})).annotate({ identifier: "NamedProperty" }) as any as Schema.Schema<NamedProperty>;

export interface StructuredDataObject {
  /** The properties for the object. The maximum number of elements is 1000. */
  properties?: Array<NamedProperty>;
}

export const StructuredDataObject: Schema.Schema<StructuredDataObject> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(NamedProperty)),
})).annotate({ identifier: "StructuredDataObject" }) as any as Schema.Schema<StructuredDataObject>;

export interface ItemStructuredData {
  /** The structured data object that should conform to a registered object definition in the schema for the data source. */
  object?: StructuredDataObject;
  /** Hashing value provided by the API caller. This can be used with the items.push method to calculate modified state. The maximum length is 2048 characters. */
  hash?: string;
}

export const ItemStructuredData: Schema.Schema<ItemStructuredData> = Schema.suspend(() => Schema.Struct({
  object: Schema.optional(StructuredDataObject),
  hash: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemStructuredData" }) as any as Schema.Schema<ItemStructuredData>;

export interface UploadItemRef {
  /** The name of the content reference. The maximum length is 2048 characters. */
  name?: string;
}

export const UploadItemRef: Schema.Schema<UploadItemRef> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadItemRef" }) as any as Schema.Schema<UploadItemRef>;

export interface ItemContent {
  contentFormat?: "UNSPECIFIED" | "HTML" | "TEXT" | "RAW" | (string & {});
  /** Content that is supplied inlined within the update method. The maximum length is 102400 bytes (100 KiB). */
  inlineContent?: string;
  /** Upload reference ID of a previously uploaded content via write method. */
  contentDataRef?: UploadItemRef;
  /** Hashing info calculated and provided by the API client for content. Can be used with the items.push method to calculate modified state. The maximum length is 2048 characters. */
  hash?: string;
}

export const ItemContent: Schema.Schema<ItemContent> = Schema.suspend(() => Schema.Struct({
  contentFormat: Schema.optional(Schema.String),
  inlineContent: Schema.optional(Schema.String),
  contentDataRef: Schema.optional(UploadItemRef),
  hash: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemContent" }) as any as Schema.Schema<ItemContent>;

export interface FieldViolation {
  /** Path of field with violation. */
  field?: string;
  /** The description of the error. */
  description?: string;
}

export const FieldViolation: Schema.Schema<FieldViolation> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldViolation" }) as any as Schema.Schema<FieldViolation>;

export interface ProcessingError {
  /** Error code indicating the nature of the error. */
  code?: "PROCESSING_ERROR_CODE_UNSPECIFIED" | "MALFORMED_REQUEST" | "UNSUPPORTED_CONTENT_FORMAT" | "INDIRECT_BROKEN_ACL" | "ACL_CYCLE" | (string & {});
  /** The description of the error. */
  errorMessage?: string;
  /** In case the item fields are invalid, this field contains the details about the validation errors. */
  fieldViolations?: Array<FieldViolation>;
}

export const ProcessingError: Schema.Schema<ProcessingError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  fieldViolations: Schema.optional(Schema.Array(FieldViolation)),
})).annotate({ identifier: "ProcessingError" }) as any as Schema.Schema<ProcessingError>;

export interface RepositoryError {
  /** The type of error. */
  type?: "UNKNOWN" | "NETWORK_ERROR" | "DNS_ERROR" | "CONNECTION_ERROR" | "AUTHENTICATION_ERROR" | "AUTHORIZATION_ERROR" | "SERVER_ERROR" | "QUOTA_EXCEEDED" | "SERVICE_UNAVAILABLE" | "CLIENT_ERROR" | (string & {});
  /** Error codes. Matches the definition of HTTP status codes. */
  httpStatusCode?: number;
  /** Message that describes the error. The maximum allowable length of the message is 8192 characters. */
  errorMessage?: string;
}

export const RepositoryError: Schema.Schema<RepositoryError> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  httpStatusCode: Schema.optional(Schema.Number),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "RepositoryError" }) as any as Schema.Schema<RepositoryError>;

export interface ItemStatus {
  /** Status code. */
  code?: "CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED" | (string & {});
  /** Error details in case the item is in ERROR state. */
  processingErrors?: Array<ProcessingError>;
  /** Repository error reported by connector. */
  repositoryErrors?: Array<RepositoryError>;
}

export const ItemStatus: Schema.Schema<ItemStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  processingErrors: Schema.optional(Schema.Array(ProcessingError)),
  repositoryErrors: Schema.optional(Schema.Array(RepositoryError)),
})).annotate({ identifier: "ItemStatus" }) as any as Schema.Schema<ItemStatus>;

export interface Item {
  /** The name of the Item. Format: datasources/{source_id}/items/{item_id} This is a required field. The maximum length is 1536 characters. */
  name?: string;
  /** Access control list for this item. */
  acl?: ItemAcl;
  /** The metadata information. */
  metadata?: ItemMetadata;
  /** The structured data for the item that should conform to a registered object definition in the schema for the data source. */
  structuredData?: ItemStructuredData;
  /** Item content to be indexed and made text searchable. */
  content?: ItemContent;
  /** Required. The indexing system stores the version from the datasource as a byte string and compares the Item version in the index to the version of the queued Item using lexical ordering. Cloud Search Indexing won't index or delete any queued item with a version value that is less than or equal to the version of the currently indexed item. The maximum length for this field is 1024 bytes. For information on how item version affects the deletion process, refer to [Handle revisions after manual deletes](https://developers.google.com/workspace/cloud-search/docs/guides/operations). */
  version?: string;
  /** Status of the item. Output only field. */
  status?: ItemStatus;
  /** Queue this item belongs to. The maximum length is 100 characters. */
  queue?: string;
  /** Additional state connector can store for this item. The maximum length is 10000 bytes. */
  payload?: string;
  /** The type for this item. */
  itemType?: "UNSPECIFIED" | "CONTENT_ITEM" | "CONTAINER_ITEM" | "VIRTUAL_CONTAINER_ITEM" | (string & {});
}

export const Item: Schema.Schema<Item> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  acl: Schema.optional(ItemAcl),
  metadata: Schema.optional(ItemMetadata),
  structuredData: Schema.optional(ItemStructuredData),
  content: Schema.optional(ItemContent),
  version: Schema.optional(Schema.String),
  status: Schema.optional(ItemStatus),
  queue: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.String),
  itemType: Schema.optional(Schema.String),
})).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface SearchItemsByViewUrlResponse {
  items?: Array<Item>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const SearchItemsByViewUrlResponse: Schema.Schema<SearchItemsByViewUrlResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Item)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchItemsByViewUrlResponse" }) as any as Schema.Schema<SearchItemsByViewUrlResponse>;

export interface VPCSettings {
  /** The resource name of the GCP Project to be used for VPC SC policy check. VPC security settings on this project will be honored for Cloud Search APIs after project_name has been updated through CustomerService. Format: projects/{project_id} */
  project?: string;
}

export const VPCSettings: Schema.Schema<VPCSettings> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
})).annotate({ identifier: "VPCSettings" }) as any as Schema.Schema<VPCSettings>;

export interface AuditLoggingSettings {
  /** The resource name of the GCP Project to store audit logs. Cloud audit logging will be enabled after project_name has been updated through CustomerService. Format: projects/{project_id} */
  project?: string;
  /** Indicates whether audit logging is on/off for admin activity read APIs i.e. Get/List DataSources, Get/List SearchApplications etc. */
  logAdminReadActions?: boolean;
  /** Indicates whether audit logging is on/off for data access write APIs i.e. IndexItem etc. */
  logDataWriteActions?: boolean;
  /** Indicates whether audit logging is on/off for data access read APIs i.e. ListItems, GetItem etc. */
  logDataReadActions?: boolean;
}

export const AuditLoggingSettings: Schema.Schema<AuditLoggingSettings> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  logAdminReadActions: Schema.optional(Schema.Boolean),
  logDataWriteActions: Schema.optional(Schema.Boolean),
  logDataReadActions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AuditLoggingSettings" }) as any as Schema.Schema<AuditLoggingSettings>;

export interface CustomerSettings {
  /** VPC SC settings for the customer. If update_mask is empty then this field will be updated based on UpdateCustomerSettings request. */
  vpcSettings?: VPCSettings;
  /** Audit Logging settings for the customer. If update_mask is empty then this field will be updated based on UpdateCustomerSettings request. */
  auditLoggingSettings?: AuditLoggingSettings;
}

export const CustomerSettings: Schema.Schema<CustomerSettings> = Schema.suspend(() => Schema.Struct({
  vpcSettings: Schema.optional(VPCSettings),
  auditLoggingSettings: Schema.optional(AuditLoggingSettings),
})).annotate({ identifier: "CustomerSettings" }) as any as Schema.Schema<CustomerSettings>;

export interface InitializeCustomerRequest {
}

export const InitializeCustomerRequest: Schema.Schema<InitializeCustomerRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InitializeCustomerRequest" }) as any as Schema.Schema<InitializeCustomerRequest>;

export interface ListItemsResponse {
  items?: Array<Item>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListItemsResponse: Schema.Schema<ListItemsResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Item)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListItemsResponse" }) as any as Schema.Schema<ListItemsResponse>;

export interface IndexItemOptions {
  /** Specifies if the index request should allow Google Workspace principals that do not exist or are deleted. */
  allowUnknownGsuitePrincipals?: boolean;
}

export const IndexItemOptions: Schema.Schema<IndexItemOptions> = Schema.suspend(() => Schema.Struct({
  allowUnknownGsuitePrincipals: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IndexItemOptions" }) as any as Schema.Schema<IndexItemOptions>;

export interface IndexItemRequest {
  /** The name of the item. Format: datasources/{source_id}/items/{item_id} */
  item?: Item;
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** Required. The RequestMode for this request. */
  mode?: "UNSPECIFIED" | "SYNCHRONOUS" | "ASYNCHRONOUS" | (string & {});
  /** Common debug options. */
  debugOptions?: DebugOptions;
  indexItemOptions?: IndexItemOptions;
}

export const IndexItemRequest: Schema.Schema<IndexItemRequest> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(Item),
  connectorName: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
  indexItemOptions: Schema.optional(IndexItemOptions),
})).annotate({ identifier: "IndexItemRequest" }) as any as Schema.Schema<IndexItemRequest>;

export interface StartUploadItemRequest {
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const StartUploadItemRequest: Schema.Schema<StartUploadItemRequest> = Schema.suspend(() => Schema.Struct({
  connectorName: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "StartUploadItemRequest" }) as any as Schema.Schema<StartUploadItemRequest>;

export interface PollItemsRequest {
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** Limit the items polled to the ones with these statuses. */
  statusCodes?: Array<"CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED" | (string & {})>;
  /** Maximum number of items to return. The maximum value is 100 and the default value is 20. */
  limit?: number;
  /** Queue name to fetch items from. If unspecified, PollItems will fetch from 'default' queue. The maximum length is 100 characters. */
  queue?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const PollItemsRequest: Schema.Schema<PollItemsRequest> = Schema.suspend(() => Schema.Struct({
  connectorName: Schema.optional(Schema.String),
  statusCodes: Schema.optional(Schema.Array(Schema.String)),
  limit: Schema.optional(Schema.Number),
  queue: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "PollItemsRequest" }) as any as Schema.Schema<PollItemsRequest>;

export interface PollItemsResponse {
  /** Set of items from the queue available for connector to process. These items have the following subset of fields populated: version metadata.hash structured_data.hash content.hash payload status queue */
  items?: Array<Item>;
}

export const PollItemsResponse: Schema.Schema<PollItemsResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Item)),
})).annotate({ identifier: "PollItemsResponse" }) as any as Schema.Schema<PollItemsResponse>;

export interface PushItem {
  /** The type of the push operation that defines the push behavior. */
  type?: "UNSPECIFIED" | "MODIFIED" | "NOT_MODIFIED" | "REPOSITORY_ERROR" | "REQUEUE" | (string & {});
  /** The metadata hash of the item according to the repository. If specified, this is used to determine how to modify this item's status. Setting this field and the type field results in argument error. The maximum length is 2048 characters. */
  metadataHash?: string;
  /** Structured data hash of the item according to the repository. If specified, this is used to determine how to modify this item's status. Setting this field and the type field results in argument error. The maximum length is 2048 characters. */
  structuredDataHash?: string;
  /** Content hash of the item according to the repository. If specified, this is used to determine how to modify this item's status. Setting this field and the type field results in argument error. The maximum length is 2048 characters. */
  contentHash?: string;
  /** Provides additional document state information for the connector, such as an alternate repository ID and other metadata. The maximum length is 8192 bytes. */
  payload?: string;
  /** Queue to which this item belongs. The `default` queue is chosen if this field is not specified. The maximum length is 512 characters. */
  queue?: string;
  /** Populate this field to store Connector or repository error details. This information is displayed in the Admin Console. This field may only be populated when the Type is REPOSITORY_ERROR. */
  repositoryError?: RepositoryError;
}

export const PushItem: Schema.Schema<PushItem> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  metadataHash: Schema.optional(Schema.String),
  structuredDataHash: Schema.optional(Schema.String),
  contentHash: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.String),
  queue: Schema.optional(Schema.String),
  repositoryError: Schema.optional(RepositoryError),
})).annotate({ identifier: "PushItem" }) as any as Schema.Schema<PushItem>;

export interface PushItemRequest {
  /** Item to push onto the queue. */
  item?: PushItem;
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const PushItemRequest: Schema.Schema<PushItemRequest> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(PushItem),
  connectorName: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "PushItemRequest" }) as any as Schema.Schema<PushItemRequest>;

export interface UnreserveItemsRequest {
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** The name of a queue to unreserve items from. */
  queue?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const UnreserveItemsRequest: Schema.Schema<UnreserveItemsRequest> = Schema.suspend(() => Schema.Struct({
  connectorName: Schema.optional(Schema.String),
  queue: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "UnreserveItemsRequest" }) as any as Schema.Schema<UnreserveItemsRequest>;

export interface DeleteQueueItemsRequest {
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** The name of a queue to delete items from. */
  queue?: string;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const DeleteQueueItemsRequest: Schema.Schema<DeleteQueueItemsRequest> = Schema.suspend(() => Schema.Struct({
  connectorName: Schema.optional(Schema.String),
  queue: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "DeleteQueueItemsRequest" }) as any as Schema.Schema<DeleteQueueItemsRequest>;

export interface RequestOptions {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. For translations. Set this field using the language set in browser or for the page. In the event that the user's language preference is known, set this field to the known user language. When specified, the documents in search results are biased towards the specified language. The Suggest API uses this field as a hint to make better third-party autocomplete predictions. */
  languageCode?: string;
  /** Debug options of the request */
  debugOptions?: DebugOptions;
  /** Current user's time zone id, such as "America/Los_Angeles" or "Australia/Sydney". These IDs are defined by [Unicode Common Locale Data Repository (CLDR)](http://cldr.unicode.org/) project, and currently available in the file [timezone.xml](http://unicode.org/repos/cldr/trunk/common/bcp47/timezone.xml). This field is used to correctly interpret date and time queries. If this field is not specified, the default time zone (UTC) is used. */
  timeZone?: string;
  /** The ID generated when you create a search application using the [admin console](https://support.google.com/a/answer/9043922). */
  searchApplicationId?: string;
}

export const RequestOptions: Schema.Schema<RequestOptions> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
  timeZone: Schema.optional(Schema.String),
  searchApplicationId: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestOptions" }) as any as Schema.Schema<RequestOptions>;

export interface Source {
  /** Source name for content indexed by the Indexing API. */
  name?: string;
  /** Predefined content source for Google Apps. */
  predefinedSource?: "NONE" | "QUERY_HISTORY" | "PERSON" | "GOOGLE_DRIVE" | "GOOGLE_GMAIL" | "GOOGLE_SITES" | "GOOGLE_GROUPS" | "GOOGLE_CALENDAR" | "GOOGLE_KEEP" | (string & {});
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  predefinedSource: Schema.optional(Schema.String),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface Value {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  timestampValue?: string;
  booleanValue?: boolean;
  dateValue?: Cloudsearch_Date;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  integerValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  timestampValue: Schema.optional(Schema.String),
  booleanValue: Schema.optional(Schema.Boolean),
  dateValue: Schema.optional(Cloudsearch_Date),
})).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface ValueFilter {
  /** The `operator_name` applied to the query, such as *price_greater_than*. The filter can work against both types of filters defined in the schema for your data source: 1. `operator_name`, where the query filters results by the property that matches the value. 2. `greater_than_operator_name` or `less_than_operator_name` in your schema. The query filters the results for the property values that are greater than or less than the supplied value in the query. */
  operatorName?: string;
  /** The value to be compared with. */
  value?: Value;
}

export const ValueFilter: Schema.Schema<ValueFilter> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  value: Schema.optional(Value),
})).annotate({ identifier: "ValueFilter" }) as any as Schema.Schema<ValueFilter>;

export interface CompositeFilter {
  /** The logic operator of the sub filter. */
  logicOperator?: "AND" | "OR" | "NOT" | (string & {});
  /** Sub filters. */
  subFilters?: Array<Filter>;
}

export const CompositeFilter: Schema.Schema<CompositeFilter> = Schema.suspend(() => Schema.Struct({
  logicOperator: Schema.optional(Schema.String),
  subFilters: Schema.optional(Schema.Array(Filter)),
})).annotate({ identifier: "CompositeFilter" }) as any as Schema.Schema<CompositeFilter>;

export interface Filter {
  valueFilter?: ValueFilter;
  compositeFilter?: CompositeFilter;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  valueFilter: Schema.optional(ValueFilter),
  compositeFilter: Schema.optional(CompositeFilter),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface FilterOptions {
  /** If object_type is set, only objects of that type are returned. This should correspond to the name of the object that was registered within the definition of schema. The maximum length is 256 characters. */
  objectType?: string;
  /** Generic filter to restrict the search, such as `lang:en`, `site:xyz`. */
  filter?: Filter;
}

export const FilterOptions: Schema.Schema<FilterOptions> = Schema.suspend(() => Schema.Struct({
  objectType: Schema.optional(Schema.String),
  filter: Schema.optional(Filter),
})).annotate({ identifier: "FilterOptions" }) as any as Schema.Schema<FilterOptions>;

export interface DataSourceRestriction {
  /** The source of restriction. */
  source?: Source;
  /** Filter options restricting the results. If multiple filters are present, they are grouped by object type before joining. Filters with the same object type are joined conjunctively, then the resulting expressions are joined disjunctively. The maximum number of elements is 20. NOTE: Suggest API supports only few filters at the moment: "objecttype", "type" and "mimetype". For now, schema specific filters cannot be used to filter suggestions. */
  filterOptions?: Array<FilterOptions>;
}

export const DataSourceRestriction: Schema.Schema<DataSourceRestriction> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  filterOptions: Schema.optional(Schema.Array(FilterOptions)),
})).annotate({ identifier: "DataSourceRestriction" }) as any as Schema.Schema<DataSourceRestriction>;

export interface SuggestRequest {
  /** Request options, such as the search application and user timezone. */
  requestOptions?: RequestOptions;
  /** Partial query for which autocomplete suggestions will be shown. For example, if the query is "sea", then the server might return "season", "search", "seagull" and so on. */
  query?: string;
  /** The sources to use for suggestions. If not specified, the data sources are taken from the current search application. NOTE: Suggestions are only supported for the following sources: * Third-party data sources * PredefinedSource.PERSON * PredefinedSource.GOOGLE_DRIVE */
  dataSourceRestrictions?: Array<DataSourceRestriction>;
}

export const SuggestRequest: Schema.Schema<SuggestRequest> = Schema.suspend(() => Schema.Struct({
  requestOptions: Schema.optional(RequestOptions),
  query: Schema.optional(Schema.String),
  dataSourceRestrictions: Schema.optional(Schema.Array(DataSourceRestriction)),
})).annotate({ identifier: "SuggestRequest" }) as any as Schema.Schema<SuggestRequest>;

export interface QuerySuggestion {
}

export const QuerySuggestion: Schema.Schema<QuerySuggestion> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "QuerySuggestion" }) as any as Schema.Schema<QuerySuggestion>;

export interface Name {
  /** The read-only display name formatted according to the locale specified by the viewer's account or the `Accept-Language` HTTP header. */
  displayName?: string;
}

export const Name: Schema.Schema<Name> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Name" }) as any as Schema.Schema<Name>;

export interface EmailAddress {
  /** The email address. */
  emailAddress?: string;
  /** Indicates if this is the user's primary email. Only one entry can be marked as primary. */
  primary?: boolean;
  /** The type of the email account. Acceptable values are: "custom", "home", "other", "work". */
  type?: string;
  /** If the value of type is custom, this property contains the custom type string. */
  customType?: string;
  /** The URL to send email. */
  emailUrl?: string;
}

export const EmailAddress: Schema.Schema<EmailAddress> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  emailUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "EmailAddress" }) as any as Schema.Schema<EmailAddress>;

export interface PhoneNumber {
  /** The phone number of the person. */
  phoneNumber?: string;
  type?: "OTHER" | "MOBILE" | "OFFICE" | (string & {});
}

export const PhoneNumber: Schema.Schema<PhoneNumber> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "PhoneNumber" }) as any as Schema.Schema<PhoneNumber>;

export interface Photo {
  /** The URL of the photo. */
  url?: string;
}

export const Photo: Schema.Schema<Photo> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Photo" }) as any as Schema.Schema<Photo>;

export interface Person {
  /** The resource name of the person to provide information about. See [`People.get`](https://developers.google.com/people/api/rest/v1/people/get) from the Google People API. */
  name?: string;
  /** Obfuscated ID of a person. */
  obfuscatedId?: string;
  /** The person's name */
  personNames?: Array<Name>;
  /** The person's email addresses */
  emailAddresses?: Array<EmailAddress>;
  /** The person's phone numbers */
  phoneNumbers?: Array<PhoneNumber>;
  /** A person's read-only photo. A picture shown next to the person's name to help others recognize the person in search results. */
  photos?: Array<Photo>;
}

export const Person: Schema.Schema<Person> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  obfuscatedId: Schema.optional(Schema.String),
  personNames: Schema.optional(Schema.Array(Name)),
  emailAddresses: Schema.optional(Schema.Array(EmailAddress)),
  phoneNumbers: Schema.optional(Schema.Array(PhoneNumber)),
  photos: Schema.optional(Schema.Array(Photo)),
})).annotate({ identifier: "Person" }) as any as Schema.Schema<Person>;

export interface PeopleSuggestion {
  /** Suggested person. All fields of the person object might not be populated. */
  person?: Person;
}

export const PeopleSuggestion: Schema.Schema<PeopleSuggestion> = Schema.suspend(() => Schema.Struct({
  person: Schema.optional(Person),
})).annotate({ identifier: "PeopleSuggestion" }) as any as Schema.Schema<PeopleSuggestion>;

export interface SuggestResult {
  /** The suggested query that will be used for search, when the user clicks on the suggestion */
  suggestedQuery?: string;
  /** The source of the suggestion. */
  source?: Source;
  /** This field will be present if the suggested query is a word/phrase completion. */
  querySuggestion?: QuerySuggestion;
  /** This is present when the suggestion indicates a person. It contains more information about the person - like their email ID, name etc. */
  peopleSuggestion?: PeopleSuggestion;
}

export const SuggestResult: Schema.Schema<SuggestResult> = Schema.suspend(() => Schema.Struct({
  suggestedQuery: Schema.optional(Schema.String),
  source: Schema.optional(Source),
  querySuggestion: Schema.optional(QuerySuggestion),
  peopleSuggestion: Schema.optional(PeopleSuggestion),
})).annotate({ identifier: "SuggestResult" }) as any as Schema.Schema<SuggestResult>;

export interface SuggestResponse {
  /** List of suggestions. */
  suggestResults?: Array<SuggestResult>;
}

export const SuggestResponse: Schema.Schema<SuggestResponse> = Schema.suspend(() => Schema.Struct({
  suggestResults: Schema.optional(Schema.Array(SuggestResult)),
})).annotate({ identifier: "SuggestResponse" }) as any as Schema.Schema<SuggestResponse>;

export interface IntegerFacetingOptions {
  /** Buckets for given integer values should be in strictly ascending order. For example, if values supplied are (1,5,10,100), the following facet buckets will be formed {<1, [1,5), [5-10), [10-100), >=100}. */
  integerBuckets?: Array<string>;
}

export const IntegerFacetingOptions: Schema.Schema<IntegerFacetingOptions> = Schema.suspend(() => Schema.Struct({
  integerBuckets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IntegerFacetingOptions" }) as any as Schema.Schema<IntegerFacetingOptions>;

export interface FacetOptions {
  /** Source name to facet on. Format: datasources/{source_id} If empty, all data sources will be used. */
  sourceName?: string;
  /** If object_type is set, only those objects of that type will be used to compute facets. If empty, then all objects will be used to compute facets. */
  objectType?: string;
  /** The name of the operator chosen for faceting. @see cloudsearch.SchemaPropertyOptions */
  operatorName?: string;
  /** Maximum number of facet buckets that should be returned for this facet. Defaults to 10. Maximum value is 100. */
  numFacetBuckets?: number;
  /** If set, describes integer faceting options for the given integer property. The corresponding integer property in the schema should be marked isFacetable. The number of buckets returned would be minimum of this and num_facet_buckets. */
  integerFacetingOptions?: IntegerFacetingOptions;
}

export const FacetOptions: Schema.Schema<FacetOptions> = Schema.suspend(() => Schema.Struct({
  sourceName: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  operatorName: Schema.optional(Schema.String),
  numFacetBuckets: Schema.optional(Schema.Number),
  integerFacetingOptions: Schema.optional(IntegerFacetingOptions),
})).annotate({ identifier: "FacetOptions" }) as any as Schema.Schema<FacetOptions>;

export interface SortOptions {
  /** The name of the operator corresponding to the field to sort on. The corresponding property must be marked as sortable. */
  operatorName?: string;
  /** Ascending is the default sort order */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const SortOptions: Schema.Schema<SortOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  sortOrder: Schema.optional(Schema.String),
})).annotate({ identifier: "SortOptions" }) as any as Schema.Schema<SortOptions>;

export interface QueryInterpretationOptions {
  /** Flag to disable natural language (NL) interpretation of queries. Default is false, Set to true to disable natural language interpretation. NL interpretation only applies to predefined datasources. */
  disableNlInterpretation?: boolean;
  /** Enable this flag to turn off all internal optimizations like natural language (NL) interpretation of queries, supplemental result retrieval, and usage of synonyms including custom ones. Nl interpretation will be disabled if either one of the two flags is true. */
  enableVerbatimMode?: boolean;
  /** Use this flag to disable supplemental results for a query. Supplemental results setting chosen at SearchApplication level will take precedence if set to True. */
  disableSupplementalResults?: boolean;
}

export const QueryInterpretationOptions: Schema.Schema<QueryInterpretationOptions> = Schema.suspend(() => Schema.Struct({
  disableNlInterpretation: Schema.optional(Schema.Boolean),
  enableVerbatimMode: Schema.optional(Schema.Boolean),
  disableSupplementalResults: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QueryInterpretationOptions" }) as any as Schema.Schema<QueryInterpretationOptions>;

export interface SearchRequest {
  /** Request options, such as the search application and user timezone. */
  requestOptions?: RequestOptions;
  /** The raw query string. See supported search operators in the [Narrow your search with operators](https://support.google.com/cloudsearch/answer/6172299) */
  query?: string;
  /** Maximum number of search results to return in one page. Valid values are between 1 and 100, inclusive. Default value is 10. Minimum value is 50 when results beyond 2000 are requested. */
  pageSize?: number;
  /** Starting index of the results. */
  start?: number;
  /** The sources to use for querying. If not specified, all data sources from the current search application are used. */
  dataSourceRestrictions?: Array<DataSourceRestriction>;
  facetOptions?: Array<FacetOptions>;
  /** The options for sorting the search results */
  sortOptions?: SortOptions;
  /** Options to interpret the user query. */
  queryInterpretationOptions?: QueryInterpretationOptions;
  /** Context attributes for the request which will be used to adjust ranking of search results. The maximum number of elements is 10. */
  contextAttributes?: Array<ContextAttribute>;
}

export const SearchRequest: Schema.Schema<SearchRequest> = Schema.suspend(() => Schema.Struct({
  requestOptions: Schema.optional(RequestOptions),
  query: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  start: Schema.optional(Schema.Number),
  dataSourceRestrictions: Schema.optional(Schema.Array(DataSourceRestriction)),
  facetOptions: Schema.optional(Schema.Array(FacetOptions)),
  sortOptions: Schema.optional(SortOptions),
  queryInterpretationOptions: Schema.optional(QueryInterpretationOptions),
  contextAttributes: Schema.optional(Schema.Array(ContextAttribute)),
})).annotate({ identifier: "SearchRequest" }) as any as Schema.Schema<SearchRequest>;

export interface QueryInterpretation {
  /** The interpretation of the query used in search. For example, queries with natural language intent like "email from john" will be interpreted as "from:john source:mail". This field will not be filled when the reason is NOT_ENOUGH_RESULTS_FOUND_FOR_USER_QUERY. */
  interpretedQuery?: string;
  interpretationType?: "NONE" | "BLEND" | "REPLACE" | (string & {});
  /** The reason for interpretation of the query. This field will not be UNSPECIFIED if the interpretation type is not NONE. */
  reason?: "UNSPECIFIED" | "QUERY_HAS_NATURAL_LANGUAGE_INTENT" | "NOT_ENOUGH_RESULTS_FOUND_FOR_USER_QUERY" | (string & {});
  /** The actual number of results returned by the interpreted query. */
  interpretedQueryActualResultCount?: number;
  /** The estimated number of results returned by the interpreted query. */
  interpretedQueryEstimatedResultCount?: string;
}

export const QueryInterpretation: Schema.Schema<QueryInterpretation> = Schema.suspend(() => Schema.Struct({
  interpretedQuery: Schema.optional(Schema.String),
  interpretationType: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  interpretedQueryActualResultCount: Schema.optional(Schema.Number),
  interpretedQueryEstimatedResultCount: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryInterpretation" }) as any as Schema.Schema<QueryInterpretation>;

export interface MatchRange {
  /** Starting position of the match in the snippet. */
  start?: number;
  /** End of the match in the snippet. */
  end?: number;
}

export const MatchRange: Schema.Schema<MatchRange> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.Number),
  end: Schema.optional(Schema.Number),
})).annotate({ identifier: "MatchRange" }) as any as Schema.Schema<MatchRange>;

export interface Snippet {
  /** The snippet of the document. May contain escaped HTML character that should be unescaped prior to rendering. */
  snippet?: string;
  /** The matched ranges in the snippet. */
  matchRanges?: Array<MatchRange>;
}

export const Snippet: Schema.Schema<Snippet> = Schema.suspend(() => Schema.Struct({
  snippet: Schema.optional(Schema.String),
  matchRanges: Schema.optional(Schema.Array(MatchRange)),
})).annotate({ identifier: "Snippet" }) as any as Schema.Schema<Snippet>;

export interface ResultDisplayField {
  /** The display label for the property. */
  label?: string;
  /** The operator name of the property. */
  operatorName?: string;
  /** The name value pair for the property. */
  property?: NamedProperty;
}

export const ResultDisplayField: Schema.Schema<ResultDisplayField> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  operatorName: Schema.optional(Schema.String),
  property: Schema.optional(NamedProperty),
})).annotate({ identifier: "ResultDisplayField" }) as any as Schema.Schema<ResultDisplayField>;

export interface ResultDisplayLine {
  fields?: Array<ResultDisplayField>;
}

export const ResultDisplayLine: Schema.Schema<ResultDisplayLine> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(ResultDisplayField)),
})).annotate({ identifier: "ResultDisplayLine" }) as any as Schema.Schema<ResultDisplayLine>;

export interface ResultDisplayMetadata {
  /** The display label for the object. */
  objectTypeLabel?: string;
  /** The metalines content to be displayed with the result. */
  metalines?: Array<ResultDisplayLine>;
}

export const ResultDisplayMetadata: Schema.Schema<ResultDisplayMetadata> = Schema.suspend(() => Schema.Struct({
  objectTypeLabel: Schema.optional(Schema.String),
  metalines: Schema.optional(Schema.Array(ResultDisplayLine)),
})).annotate({ identifier: "ResultDisplayMetadata" }) as any as Schema.Schema<ResultDisplayMetadata>;

export interface Metadata {
  /** The named source for the result, such as Gmail. */
  source?: Source;
  /** Mime type of the search result. */
  mimeType?: string;
  /** The thumbnail URL of the result. */
  thumbnailUrl?: string;
  /** Owner (usually creator) of the document or object of the search result. */
  owner?: Person;
  /** The creation time for this document or object in the search result. */
  createTime?: string;
  /** The last modified date for the object in the search result. If not set in the item, the value returned here is empty. When `updateTime` is used for calculating freshness and is not set, this value defaults to 2 years from the current time. */
  updateTime?: string;
  /** Indexed fields in structured data, returned as a generic named property. */
  fields?: Array<NamedProperty>;
  /** Options that specify how to display a structured data search result. */
  displayOptions?: ResultDisplayMetadata;
  /** Object type of the search result. */
  objectType?: string;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  mimeType: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
  owner: Schema.optional(Person),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(NamedProperty)),
  displayOptions: Schema.optional(ResultDisplayMetadata),
  objectType: Schema.optional(Schema.String),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface ResultDebugInfo {
  /** General debug info formatted for display. */
  formattedDebugInfo?: string;
}

export const ResultDebugInfo: Schema.Schema<ResultDebugInfo> = Schema.suspend(() => Schema.Struct({
  formattedDebugInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "ResultDebugInfo" }) as any as Schema.Schema<ResultDebugInfo>;

export interface SearchResult {
  /** Title of the search result. */
  title?: string;
  /** The URL of the search result. The URL contains a Google redirect to the actual item. This URL is signed and shouldn't be changed. */
  url?: string;
  /** The concatenation of all snippets (summaries) available for this result. */
  snippet?: Snippet;
  /** Metadata of the search result. */
  metadata?: Metadata;
  /** If source is clustered, provide list of clustered results. There will only be one level of clustered results. If current source is not enabled for clustering, this field will be empty. */
  clusteredResults?: Array<SearchResult>;
  /** Debugging information about this search result. */
  debugInfo?: ResultDebugInfo;
}

export const SearchResult: Schema.Schema<SearchResult> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  snippet: Schema.optional(Snippet),
  metadata: Schema.optional(Metadata),
  clusteredResults: Schema.optional(Schema.Array(SearchResult)),
  debugInfo: Schema.optional(ResultDebugInfo),
})).annotate({ identifier: "SearchResult" }) as any as Schema.Schema<SearchResult>;

export interface StructuredResult {
  /** Representation of a person */
  person?: Person;
}

export const StructuredResult: Schema.Schema<StructuredResult> = Schema.suspend(() => Schema.Struct({
  person: Schema.optional(Person),
})).annotate({ identifier: "StructuredResult" }) as any as Schema.Schema<StructuredResult>;

export interface SafeHtmlProto {
  /** IMPORTANT: Never set or read this field, even from tests, it is private. See documentation at the top of .proto file for programming language packages with which to create or read this message. */
  privateDoNotAccessOrElseSafeHtmlWrappedValue?: string;
}

export const SafeHtmlProto: Schema.Schema<SafeHtmlProto> = Schema.suspend(() => Schema.Struct({
  privateDoNotAccessOrElseSafeHtmlWrappedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "SafeHtmlProto" }) as any as Schema.Schema<SafeHtmlProto>;

export interface SpellResult {
  /** The suggested spelling of the query. */
  suggestedQuery?: string;
  /** Suggestion triggered for the current query. */
  suggestionType?: "SUGGESTION_TYPE_UNSPECIFIED" | "NON_EMPTY_RESULTS_SPELL_SUGGESTION" | "ZERO_RESULTS_FULL_PAGE_REPLACEMENT" | (string & {});
  /** The sanitized HTML representing the spell corrected query that can be used in the UI. This usually has language-specific tags to mark up parts of the query that are spell checked. */
  suggestedQueryHtml?: SafeHtmlProto;
}

export const SpellResult: Schema.Schema<SpellResult> = Schema.suspend(() => Schema.Struct({
  suggestedQuery: Schema.optional(Schema.String),
  suggestionType: Schema.optional(Schema.String),
  suggestedQueryHtml: Schema.optional(SafeHtmlProto),
})).annotate({ identifier: "SpellResult" }) as any as Schema.Schema<SpellResult>;

export interface FacetBucket {
  value?: Value;
  /** Number of results that match the bucket value. Counts are only returned for searches when count accuracy is ensured. Cloud Search does not guarantee facet counts for any query and facet counts might be present only intermittently, even for identical queries. Do not build dependencies on facet count existence; instead use facet ount percentages which are always returned. */
  count?: number;
  /** Percent of results that match the bucket value. The returned value is between (0-100], and is rounded down to an integer if fractional. If the value is not explicitly returned, it represents a percentage value that rounds to 0. Percentages are returned for all searches, but are an estimate. Because percentages are always returned, you should render percentages instead of counts. */
  percentage?: number;
  /** Filter to be passed in the search request if the corresponding bucket is selected. */
  filter?: Filter;
}

export const FacetBucket: Schema.Schema<FacetBucket> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Value),
  count: Schema.optional(Schema.Number),
  percentage: Schema.optional(Schema.Number),
  filter: Schema.optional(Filter),
})).annotate({ identifier: "FacetBucket" }) as any as Schema.Schema<FacetBucket>;

export interface FacetResult {
  /** Source name for which facet results are returned. Will not be empty. */
  sourceName?: string;
  /** Object type for which facet results are returned. Can be empty. */
  objectType?: string;
  /** The name of the operator chosen for faceting. @see cloudsearch.SchemaPropertyOptions */
  operatorName?: string;
  /** FacetBuckets for values in response containing at least a single result with the corresponding filter. */
  buckets?: Array<FacetBucket>;
}

export const FacetResult: Schema.Schema<FacetResult> = Schema.suspend(() => Schema.Struct({
  sourceName: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  operatorName: Schema.optional(Schema.String),
  buckets: Schema.optional(Schema.Array(FacetBucket)),
})).annotate({ identifier: "FacetResult" }) as any as Schema.Schema<FacetResult>;

export interface ResponseDebugInfo {
  /** General debug info formatted for display. */
  formattedDebugInfo?: string;
}

export const ResponseDebugInfo: Schema.Schema<ResponseDebugInfo> = Schema.suspend(() => Schema.Struct({
  formattedDebugInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponseDebugInfo" }) as any as Schema.Schema<ResponseDebugInfo>;

export interface ErrorMessage {
  source?: Source;
  errorMessage?: string;
}

export const ErrorMessage: Schema.Schema<ErrorMessage> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorMessage" }) as any as Schema.Schema<ErrorMessage>;

export interface ErrorInfo {
  errorMessages?: Array<ErrorMessage>;
}

export const ErrorInfo: Schema.Schema<ErrorInfo> = Schema.suspend(() => Schema.Struct({
  errorMessages: Schema.optional(Schema.Array(ErrorMessage)),
})).annotate({ identifier: "ErrorInfo" }) as any as Schema.Schema<ErrorInfo>;

export interface SourceResultCount {
  /** The source the result count information is associated with. */
  source?: Source;
  /** Whether there are more search results for this source. */
  hasMoreResults?: boolean;
  /** The estimated result count for this source. */
  resultCountEstimate?: string;
  /** The exact result count for this source. */
  resultCountExact?: string;
}

export const SourceResultCount: Schema.Schema<SourceResultCount> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  hasMoreResults: Schema.optional(Schema.Boolean),
  resultCountEstimate: Schema.optional(Schema.String),
  resultCountExact: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceResultCount" }) as any as Schema.Schema<SourceResultCount>;

export interface ResultCounts {
  /** Result count information for each source with results. */
  sourceResultCounts?: Array<SourceResultCount>;
}

export const ResultCounts: Schema.Schema<ResultCounts> = Schema.suspend(() => Schema.Struct({
  sourceResultCounts: Schema.optional(Schema.Array(SourceResultCount)),
})).annotate({ identifier: "ResultCounts" }) as any as Schema.Schema<ResultCounts>;

export interface SearchResponse {
  /** Query interpretation result for user query. Empty if query interpretation is disabled. */
  queryInterpretation?: QueryInterpretation;
  /** Results from a search query. */
  results?: Array<SearchResult>;
  /** Structured results for the user query. These results are not counted against the page_size. */
  structuredResults?: Array<StructuredResult>;
  /** Suggested spelling for the query. */
  spellResults?: Array<SpellResult>;
  /** Repeated facet results. */
  facetResults?: Array<FacetResult>;
  /** Whether there are more search results matching the query. */
  hasMoreResults?: boolean;
  /** The estimated result count for this query. */
  resultCountEstimate?: string;
  /** The exact result count for this query. */
  resultCountExact?: string;
  /** Debugging information about the response. */
  debugInfo?: ResponseDebugInfo;
  /** Error information about the response. */
  errorInfo?: ErrorInfo;
  /** Expanded result count information. */
  resultCounts?: ResultCounts;
}

export const SearchResponse: Schema.Schema<SearchResponse> = Schema.suspend(() => Schema.Struct({
  queryInterpretation: Schema.optional(QueryInterpretation),
  results: Schema.optional(Schema.Array(SearchResult)),
  structuredResults: Schema.optional(Schema.Array(StructuredResult)),
  spellResults: Schema.optional(Schema.Array(SpellResult)),
  facetResults: Schema.optional(Schema.Array(FacetResult)),
  hasMoreResults: Schema.optional(Schema.Boolean),
  resultCountEstimate: Schema.optional(Schema.String),
  resultCountExact: Schema.optional(Schema.String),
  debugInfo: Schema.optional(ResponseDebugInfo),
  errorInfo: Schema.optional(ErrorInfo),
  resultCounts: Schema.optional(ResultCounts),
})).annotate({ identifier: "SearchResponse" }) as any as Schema.Schema<SearchResponse>;

export interface QueryOperator {
  /** The name of the operator. */
  operatorName?: string;
  /** Indicates the operator name that can be used to isolate the property using the less-than operator. */
  lessThanOperatorName?: string;
  /** Indicates the operator name that can be used to isolate the property using the greater-than operator. */
  greaterThanOperatorName?: string;
  /** The type of the operator. */
  type?: "UNKNOWN" | "INTEGER" | "DOUBLE" | "TIMESTAMP" | "BOOLEAN" | "ENUM" | "DATE" | "TEXT" | "HTML" | (string & {});
  /** Display name of the operator */
  displayName?: string;
  /** Can this operator be used to sort results. */
  isSortable?: boolean;
  /** Can this operator be used to get facets. */
  isFacetable?: boolean;
  /** Will the property associated with this facet be returned as part of search results. */
  isReturnable?: boolean;
  /** Indicates if multiple values can be set for this property. */
  isRepeatable?: boolean;
  /** Can get suggestions for this field. */
  isSuggestable?: boolean;
  /** Potential list of values for the opeatror field. This field is only filled when we can safely enumerate all the possible values of this operator. */
  enumValues?: Array<string>;
  /** The name of the object corresponding to the operator. This field is only filled for schema-specific operators, and is unset for common operators. */
  objectType?: string;
}

export const QueryOperator: Schema.Schema<QueryOperator> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  lessThanOperatorName: Schema.optional(Schema.String),
  greaterThanOperatorName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  isSortable: Schema.optional(Schema.Boolean),
  isFacetable: Schema.optional(Schema.Boolean),
  isReturnable: Schema.optional(Schema.Boolean),
  isRepeatable: Schema.optional(Schema.Boolean),
  isSuggestable: Schema.optional(Schema.Boolean),
  enumValues: Schema.optional(Schema.Array(Schema.String)),
  objectType: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryOperator" }) as any as Schema.Schema<QueryOperator>;

export interface QuerySource {
  /** The name of the source */
  source?: Source;
  /** A short name or alias for the source. This value can be used with the 'source' operator. */
  shortName?: string;
  /** Display name of the data source. */
  displayName?: string;
  /** List of all operators applicable for this source. */
  operators?: Array<QueryOperator>;
}

export const QuerySource: Schema.Schema<QuerySource> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  shortName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  operators: Schema.optional(Schema.Array(QueryOperator)),
})).annotate({ identifier: "QuerySource" }) as any as Schema.Schema<QuerySource>;

export interface ListQuerySourcesResponse {
  sources?: Array<QuerySource>;
  nextPageToken?: string;
}

export const ListQuerySourcesResponse: Schema.Schema<ListQuerySourcesResponse> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(QuerySource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListQuerySourcesResponse" }) as any as Schema.Schema<ListQuerySourcesResponse>;

export interface QueryActivity {
  /** User input query to be logged/removed. */
  query?: string;
}

export const QueryActivity: Schema.Schema<QueryActivity> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryActivity" }) as any as Schema.Schema<QueryActivity>;

export interface UserActivity {
  /** Contains data which needs to be logged/removed. */
  queryActivity?: QueryActivity;
}

export const UserActivity: Schema.Schema<UserActivity> = Schema.suspend(() => Schema.Struct({
  queryActivity: Schema.optional(QueryActivity),
})).annotate({ identifier: "UserActivity" }) as any as Schema.Schema<UserActivity>;

export interface RemoveActivityRequest {
  /** User Activity containing the data to be deleted. */
  userActivity?: UserActivity;
  /** Request options, such as the search application and clientId. */
  requestOptions?: RequestOptions;
}

export const RemoveActivityRequest: Schema.Schema<RemoveActivityRequest> = Schema.suspend(() => Schema.Struct({
  userActivity: Schema.optional(UserActivity),
  requestOptions: Schema.optional(RequestOptions),
})).annotate({ identifier: "RemoveActivityRequest" }) as any as Schema.Schema<RemoveActivityRequest>;

export interface RemoveActivityResponse {
}

export const RemoveActivityResponse: Schema.Schema<RemoveActivityResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveActivityResponse" }) as any as Schema.Schema<RemoveActivityResponse>;

export interface SourceScoringConfig {
  /** Importance of the source. */
  sourceImportance?: "DEFAULT" | "LOW" | "HIGH" | (string & {});
}

export const SourceScoringConfig: Schema.Schema<SourceScoringConfig> = Schema.suspend(() => Schema.Struct({
  sourceImportance: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceScoringConfig" }) as any as Schema.Schema<SourceScoringConfig>;

export interface SourceCrowdingConfig {
  /** Maximum number of results allowed from a datasource in a result page as long as results from other sources are not exhausted. Value specified must not be negative. A default value is used if this value is equal to 0. To disable crowding, set the value greater than 100. */
  numResults?: number;
  /** Maximum number of suggestions allowed from a source. No limits will be set on results if this value is less than or equal to 0. */
  numSuggestions?: number;
}

export const SourceCrowdingConfig: Schema.Schema<SourceCrowdingConfig> = Schema.suspend(() => Schema.Struct({
  numResults: Schema.optional(Schema.Number),
  numSuggestions: Schema.optional(Schema.Number),
})).annotate({ identifier: "SourceCrowdingConfig" }) as any as Schema.Schema<SourceCrowdingConfig>;

export interface SourceConfig {
  /** The source for which this configuration is to be used. */
  source?: Source;
  /** The scoring configuration for the source. */
  scoringConfig?: SourceScoringConfig;
  /** The crowding configuration for the source. */
  crowdingConfig?: SourceCrowdingConfig;
}

export const SourceConfig: Schema.Schema<SourceConfig> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  scoringConfig: Schema.optional(SourceScoringConfig),
  crowdingConfig: Schema.optional(SourceCrowdingConfig),
})).annotate({ identifier: "SourceConfig" }) as any as Schema.Schema<SourceConfig>;

export interface ScoringConfig {
  /** Whether to use freshness as a ranking signal. By default, freshness is used as a ranking signal. Note that this setting is not available in the Admin UI. */
  disableFreshness?: boolean;
  /** Whether to personalize the results. By default, personal signals will be used to boost results. */
  disablePersonalization?: boolean;
}

export const ScoringConfig: Schema.Schema<ScoringConfig> = Schema.suspend(() => Schema.Struct({
  disableFreshness: Schema.optional(Schema.Boolean),
  disablePersonalization: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ScoringConfig" }) as any as Schema.Schema<ScoringConfig>;

export interface QueryInterpretationConfig {
  /** Enable this flag to turn off all internal optimizations like natural language (NL) interpretation of queries, supplemental results retrieval, and usage of synonyms including custom ones. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for verbatim mode. */
  forceVerbatimMode?: boolean;
  /** Set this flag to disable supplemental results retrieval, setting a flag here will not retrieve supplemental results for queries associated with a given search application. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for supplemental results. */
  forceDisableSupplementalResults?: boolean;
}

export const QueryInterpretationConfig: Schema.Schema<QueryInterpretationConfig> = Schema.suspend(() => Schema.Struct({
  forceVerbatimMode: Schema.optional(Schema.Boolean),
  forceDisableSupplementalResults: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QueryInterpretationConfig" }) as any as Schema.Schema<QueryInterpretationConfig>;

export interface SearchApplication {
  /** The name of the Search Application. Format: searchapplications/{application_id}. */
  name?: string;
  /** Display name of the Search Application. The maximum length is 300 characters. */
  displayName?: string;
  /** Retrictions applied to the configurations. The maximum number of elements is 10. */
  dataSourceRestrictions?: Array<DataSourceRestriction>;
  /** Configuration for a sources specified in data_source_restrictions. */
  sourceConfig?: Array<SourceConfig>;
  /** Configuration for ranking results. */
  scoringConfig?: ScoringConfig;
  /** The default options for sorting the search results */
  defaultSortOptions?: SortOptions;
  /** The default fields for returning facet results. The sources specified here also have been included in data_source_restrictions above. */
  defaultFacetOptions?: Array<FacetOptions>;
  /** With each result we should return the URI for its thumbnail (when applicable) */
  returnResultThumbnailUrls?: boolean;
  /** Output only. IDs of the Long Running Operations (LROs) currently running for this schema. Output only field. */
  operationIds?: Array<string>;
  /** Indicates whether audit logging is on/off for requests made for the search application in query APIs. */
  enableAuditLog?: boolean;
  /** The default options for query interpretation */
  queryInterpretationConfig?: QueryInterpretationConfig;
}

export const SearchApplication: Schema.Schema<SearchApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  dataSourceRestrictions: Schema.optional(Schema.Array(DataSourceRestriction)),
  sourceConfig: Schema.optional(Schema.Array(SourceConfig)),
  scoringConfig: Schema.optional(ScoringConfig),
  defaultSortOptions: Schema.optional(SortOptions),
  defaultFacetOptions: Schema.optional(Schema.Array(FacetOptions)),
  returnResultThumbnailUrls: Schema.optional(Schema.Boolean),
  operationIds: Schema.optional(Schema.Array(Schema.String)),
  enableAuditLog: Schema.optional(Schema.Boolean),
  queryInterpretationConfig: Schema.optional(QueryInterpretationConfig),
})).annotate({ identifier: "SearchApplication" }) as any as Schema.Schema<SearchApplication>;

export interface ListSearchApplicationsResponse {
  searchApplications?: Array<SearchApplication>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListSearchApplicationsResponse: Schema.Schema<ListSearchApplicationsResponse> = Schema.suspend(() => Schema.Struct({
  searchApplications: Schema.optional(Schema.Array(SearchApplication)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSearchApplicationsResponse" }) as any as Schema.Schema<ListSearchApplicationsResponse>;

export interface ResetSearchApplicationRequest {
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const ResetSearchApplicationRequest: Schema.Schema<ResetSearchApplicationRequest> = Schema.suspend(() => Schema.Struct({
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "ResetSearchApplicationRequest" }) as any as Schema.Schema<ResetSearchApplicationRequest>;

export interface FreshnessOptions {
  /** This property indicates the freshness level of the object in the index. If set, this property must be a top-level property within the property definitions and it must be a timestamp type or date type. Otherwise, the Indexing API uses updateTime as the freshness indicator. The maximum length is 256 characters. When a property is used to calculate freshness, the value defaults to 2 years from the current time. */
  freshnessProperty?: string;
  /** The duration after which an object should be considered stale. The default value is 180 days (in seconds). */
  freshnessDuration?: string;
}

export const FreshnessOptions: Schema.Schema<FreshnessOptions> = Schema.suspend(() => Schema.Struct({
  freshnessProperty: Schema.optional(Schema.String),
  freshnessDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "FreshnessOptions" }) as any as Schema.Schema<FreshnessOptions>;

export interface DisplayedProperty {
  /** The name of the top-level property as defined in a property definition for the object. If the name is not a defined property in the schema, an error is given when attempting to update the schema. */
  propertyName?: string;
}

export const DisplayedProperty: Schema.Schema<DisplayedProperty> = Schema.suspend(() => Schema.Struct({
  propertyName: Schema.optional(Schema.String),
})).annotate({ identifier: "DisplayedProperty" }) as any as Schema.Schema<DisplayedProperty>;

export interface Metaline {
  /** The list of displayed properties for the metaline. The maximum number of properties is 5. */
  properties?: Array<DisplayedProperty>;
}

export const Metaline: Schema.Schema<Metaline> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(DisplayedProperty)),
})).annotate({ identifier: "Metaline" }) as any as Schema.Schema<Metaline>;

export interface ObjectDisplayOptions {
  /** The user friendly label to display in the search result to indicate the type of the item. This is OPTIONAL; if not provided, an object label isn't displayed on the context line of the search results. The maximum length is 64 characters. */
  objectDisplayLabel?: string;
  /** Defines the properties that are displayed in the metalines of the search results. The property values are displayed in the order given here. If a property holds multiple values, all of the values are displayed before the next properties. For this reason, it is a good practice to specify singular properties before repeated properties in this list. All of the properties must set is_returnable to true. The maximum number of metalines is 3. */
  metalines?: Array<Metaline>;
}

export const ObjectDisplayOptions: Schema.Schema<ObjectDisplayOptions> = Schema.suspend(() => Schema.Struct({
  objectDisplayLabel: Schema.optional(Schema.String),
  metalines: Schema.optional(Schema.Array(Metaline)),
})).annotate({ identifier: "ObjectDisplayOptions" }) as any as Schema.Schema<ObjectDisplayOptions>;

export interface ObjectOptions {
  /** The freshness options for an object. */
  freshnessOptions?: FreshnessOptions;
  /** The options that determine how the object is displayed in the Cloud Search results page. */
  displayOptions?: ObjectDisplayOptions;
  /** Operators that can be used to filter suggestions. For Suggest API, only operators mentioned here will be honored in the FilterOptions. Only TEXT and ENUM operators are supported. NOTE: "objecttype", "type" and "mimetype" are already supported. This property is to configure schema specific operators. Even though this is an array, only one operator can be specified. This is an array for future extensibility. Operators mapping to multiple properties within the same object are not supported. If the operator spans across different object types, this option has to be set once for each object definition. */
  suggestionFilteringOperators?: Array<string>;
}

export const ObjectOptions: Schema.Schema<ObjectOptions> = Schema.suspend(() => Schema.Struct({
  freshnessOptions: Schema.optional(FreshnessOptions),
  displayOptions: Schema.optional(ObjectDisplayOptions),
  suggestionFilteringOperators: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ObjectOptions" }) as any as Schema.Schema<ObjectOptions>;

export interface IntegerOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the integer property. For example, if operatorName is *priority* and the property's name is *priorityVal*, then queries like *priority:<value>* show results only where the value of the property named *priorityVal* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any String properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the integer property using the less-than operator. For example, if lessThanOperatorName is *prioritybelow* and the property's name is *priorityVal*, then queries like *prioritybelow:<value>* show results only where the value of the property named *priorityVal* is less than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  lessThanOperatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the integer property using the greater-than operator. For example, if greaterThanOperatorName is *priorityabove* and the property's name is *priorityVal*, then queries like *priorityabove:<value>* show results only where the value of the property named *priorityVal* is greater than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  greaterThanOperatorName?: string;
}

export const IntegerOperatorOptions: Schema.Schema<IntegerOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  lessThanOperatorName: Schema.optional(Schema.String),
  greaterThanOperatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "IntegerOperatorOptions" }) as any as Schema.Schema<IntegerOperatorOptions>;

export interface IntegerPropertyOptions {
  /** Used to specify the ordered ranking for the integer. Can only be used if isRepeatable is false. */
  orderedRanking?: "NO_ORDER" | "ASCENDING" | "DESCENDING" | (string & {});
  /** The minimum value of the property. The minimum and maximum values for the property are used to rank results according to the ordered ranking. Indexing requests with values less than the minimum are accepted and ranked with the same weight as items indexed with the minimum value. */
  minimumValue?: string;
  /** The maximum value of the property. The minimum and maximum values for the property are used to rank results according to the ordered ranking. Indexing requests with values greater than the maximum are accepted and ranked with the same weight as items indexed with the maximum value. */
  maximumValue?: string;
  /** If set, describes how the integer should be used as a search operator. */
  operatorOptions?: IntegerOperatorOptions;
  /** If set, describes integer faceting options for the given integer property. The corresponding integer property should be marked isFacetable. */
  integerFacetingOptions?: IntegerFacetingOptions;
}

export const IntegerPropertyOptions: Schema.Schema<IntegerPropertyOptions> = Schema.suspend(() => Schema.Struct({
  orderedRanking: Schema.optional(Schema.String),
  minimumValue: Schema.optional(Schema.String),
  maximumValue: Schema.optional(Schema.String),
  operatorOptions: Schema.optional(IntegerOperatorOptions),
  integerFacetingOptions: Schema.optional(IntegerFacetingOptions),
})).annotate({ identifier: "IntegerPropertyOptions" }) as any as Schema.Schema<IntegerPropertyOptions>;

export interface DoubleOperatorOptions {
  /** Indicates the operator name required in the query in order to use the double property in sorting or as a facet. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
}

export const DoubleOperatorOptions: Schema.Schema<DoubleOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "DoubleOperatorOptions" }) as any as Schema.Schema<DoubleOperatorOptions>;

export interface DoublePropertyOptions {
  /** If set, describes how the double should be used as a search operator. */
  operatorOptions?: DoubleOperatorOptions;
}

export const DoublePropertyOptions: Schema.Schema<DoublePropertyOptions> = Schema.suspend(() => Schema.Struct({
  operatorOptions: Schema.optional(DoubleOperatorOptions),
})).annotate({ identifier: "DoublePropertyOptions" }) as any as Schema.Schema<DoublePropertyOptions>;

export interface TimestampOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the timestamp property. For example, if operatorName is *closedon* and the property's name is *closeDate*, then queries like *closedon:<value>* show results only where the value of the property named *closeDate* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any String properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the timestamp property using the less-than operator. For example, if lessThanOperatorName is *closedbefore* and the property's name is *closeDate*, then queries like *closedbefore:<value>* show results only where the value of the property named *closeDate* is earlier than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  lessThanOperatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the timestamp property using the greater-than operator. For example, if greaterThanOperatorName is *closedafter* and the property's name is *closeDate*, then queries like *closedafter:<value>* show results only where the value of the property named *closeDate* is later than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  greaterThanOperatorName?: string;
}

export const TimestampOperatorOptions: Schema.Schema<TimestampOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  lessThanOperatorName: Schema.optional(Schema.String),
  greaterThanOperatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "TimestampOperatorOptions" }) as any as Schema.Schema<TimestampOperatorOptions>;

export interface TimestampPropertyOptions {
  /** If set, describes how the timestamp should be used as a search operator. */
  operatorOptions?: TimestampOperatorOptions;
}

export const TimestampPropertyOptions: Schema.Schema<TimestampPropertyOptions> = Schema.suspend(() => Schema.Struct({
  operatorOptions: Schema.optional(TimestampOperatorOptions),
})).annotate({ identifier: "TimestampPropertyOptions" }) as any as Schema.Schema<TimestampPropertyOptions>;

export interface BooleanOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the boolean property. For example, if operatorName is *closed* and the property's name is *isClosed*, then queries like *closed:<value>* show results only where the value of the property named *isClosed* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any String properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
}

export const BooleanOperatorOptions: Schema.Schema<BooleanOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "BooleanOperatorOptions" }) as any as Schema.Schema<BooleanOperatorOptions>;

export interface BooleanPropertyOptions {
  /** If set, describes how the boolean should be used as a search operator. */
  operatorOptions?: BooleanOperatorOptions;
}

export const BooleanPropertyOptions: Schema.Schema<BooleanPropertyOptions> = Schema.suspend(() => Schema.Struct({
  operatorOptions: Schema.optional(BooleanOperatorOptions),
})).annotate({ identifier: "BooleanPropertyOptions" }) as any as Schema.Schema<BooleanPropertyOptions>;

export interface ObjectPropertyOptions {
  /** The properties of the sub-object. These properties represent a nested object. For example, if this property represents a postal address, the subobjectProperties might be named *street*, *city*, and *state*. The maximum number of elements is 1000. */
  subobjectProperties?: Array<PropertyDefinition>;
}

export const ObjectPropertyOptions: Schema.Schema<ObjectPropertyOptions> = Schema.suspend(() => Schema.Struct({
  subobjectProperties: Schema.optional(Schema.Array(PropertyDefinition)),
})).annotate({ identifier: "ObjectPropertyOptions" }) as any as Schema.Schema<ObjectPropertyOptions>;

export interface EnumValuePair {
  /** The string value of the EnumValuePair. The maximum length is 32 characters. */
  stringValue?: string;
  /** The integer value of the EnumValuePair which must be non-negative. Optional. */
  integerValue?: number;
}

export const EnumValuePair: Schema.Schema<EnumValuePair> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  integerValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnumValuePair" }) as any as Schema.Schema<EnumValuePair>;

export interface EnumOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the enum property. For example, if operatorName is *priority* and the property's name is *priorityVal*, then queries like *priority:<value>* show results only where the value of the property named *priorityVal* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any String properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
}

export const EnumOperatorOptions: Schema.Schema<EnumOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnumOperatorOptions" }) as any as Schema.Schema<EnumOperatorOptions>;

export interface EnumPropertyOptions {
  /** The list of possible values for the enumeration property. All EnumValuePairs must provide a string value. If you specify an integer value for one EnumValuePair, then all possible EnumValuePairs must provide an integer value. Both the string value and integer value must be unique over all possible values. Once set, possible values cannot be removed or modified. If you supply an ordered ranking and think you might insert additional enum values in the future, leave gaps in the initial integer values to allow adding a value in between previously registered values. The maximum number of elements is 100. */
  possibleValues?: Array<EnumValuePair>;
  /** Used to specify the ordered ranking for the enumeration that determines how the integer values provided in the possible EnumValuePairs are used to rank results. If specified, integer values must be provided for all possible EnumValuePair values given for this property. Can only be used if isRepeatable is false. */
  orderedRanking?: "NO_ORDER" | "ASCENDING" | "DESCENDING" | (string & {});
  /** If set, describes how the enum should be used as a search operator. */
  operatorOptions?: EnumOperatorOptions;
}

export const EnumPropertyOptions: Schema.Schema<EnumPropertyOptions> = Schema.suspend(() => Schema.Struct({
  possibleValues: Schema.optional(Schema.Array(EnumValuePair)),
  orderedRanking: Schema.optional(Schema.String),
  operatorOptions: Schema.optional(EnumOperatorOptions),
})).annotate({ identifier: "EnumPropertyOptions" }) as any as Schema.Schema<EnumPropertyOptions>;

export interface DateOperatorOptions {
  /** Indicates the actual string required in the query in order to isolate the date property. For example, suppose an issue tracking schema object has a property named *closeDate* that specifies an operator with an operatorName of *closedon*. For searches on that data, queries like *closedon:<value>* show results only where the value of the *closeDate* property matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any String properties or text within the content field for the indexed datasource. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the date property using the less-than operator. For example, if lessThanOperatorName is *closedbefore* and the property's name is *closeDate*, then queries like *closedbefore:<value>* show results only where the value of the property named *closeDate* is earlier than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  lessThanOperatorName?: string;
  /** Indicates the operator name required in the query in order to isolate the date property using the greater-than operator. For example, if greaterThanOperatorName is *closedafter* and the property's name is *closeDate*, then queries like *closedafter:<value>* show results only where the value of the property named *closeDate* is later than *<value>*. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  greaterThanOperatorName?: string;
}

export const DateOperatorOptions: Schema.Schema<DateOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  lessThanOperatorName: Schema.optional(Schema.String),
  greaterThanOperatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "DateOperatorOptions" }) as any as Schema.Schema<DateOperatorOptions>;

export interface DatePropertyOptions {
  /** If set, describes how the date should be used as a search operator. */
  operatorOptions?: DateOperatorOptions;
}

export const DatePropertyOptions: Schema.Schema<DatePropertyOptions> = Schema.suspend(() => Schema.Struct({
  operatorOptions: Schema.optional(DateOperatorOptions),
})).annotate({ identifier: "DatePropertyOptions" }) as any as Schema.Schema<DatePropertyOptions>;

export interface RetrievalImportance {
  /** Indicates the ranking importance given to property when it is matched during retrieval. Once set, the token importance of a property cannot be changed. */
  importance?: "DEFAULT" | "HIGHEST" | "HIGH" | "LOW" | "NONE" | (string & {});
}

export const RetrievalImportance: Schema.Schema<RetrievalImportance> = Schema.suspend(() => Schema.Struct({
  importance: Schema.optional(Schema.String),
})).annotate({ identifier: "RetrievalImportance" }) as any as Schema.Schema<RetrievalImportance>;

export interface TextOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the text property. For example, if operatorName is *subject* and the property's name is *subjectLine*, then queries like *subject:<value>* show results only where the value of the property named *subjectLine* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator returns all items where *<value>* matches the value of any text properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
  /** If true, the text value is tokenized as one atomic value in operator searches and facet matches. For example, if the operator name is "genre" and the value is "science-fiction" the query restrictions "genre:science" and "genre:fiction" doesn't match the item; "genre:science-fiction" does. Text value matching is case-sensitive and does not remove special characters. If false, the text is tokenized. For example, if the value is "science-fiction" the queries "genre:science" and "genre:fiction" matches the item. */
  exactMatchWithOperator?: boolean;
}

export const TextOperatorOptions: Schema.Schema<TextOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
  exactMatchWithOperator: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TextOperatorOptions" }) as any as Schema.Schema<TextOperatorOptions>;

export interface TextPropertyOptions {
  /** Indicates the search quality importance of the tokens within the field when used for retrieval. */
  retrievalImportance?: RetrievalImportance;
  /** If set, describes how the property should be used as a search operator. */
  operatorOptions?: TextOperatorOptions;
}

export const TextPropertyOptions: Schema.Schema<TextPropertyOptions> = Schema.suspend(() => Schema.Struct({
  retrievalImportance: Schema.optional(RetrievalImportance),
  operatorOptions: Schema.optional(TextOperatorOptions),
})).annotate({ identifier: "TextPropertyOptions" }) as any as Schema.Schema<TextPropertyOptions>;

export interface HtmlOperatorOptions {
  /** Indicates the operator name required in the query in order to isolate the html property. For example, if operatorName is *subject* and the property's name is *subjectLine*, then queries like *subject:<value>* show results only where the value of the property named *subjectLine* matches *<value>*. By contrast, a search that uses the same *<value>* without an operator return all items where *<value>* matches the value of any html properties or text within the content field for the item. The operator name can only contain lowercase letters (a-z). The maximum length is 32 characters. */
  operatorName?: string;
}

export const HtmlOperatorOptions: Schema.Schema<HtmlOperatorOptions> = Schema.suspend(() => Schema.Struct({
  operatorName: Schema.optional(Schema.String),
})).annotate({ identifier: "HtmlOperatorOptions" }) as any as Schema.Schema<HtmlOperatorOptions>;

export interface HtmlPropertyOptions {
  /** Indicates the search quality importance of the tokens within the field when used for retrieval. Can only be set to DEFAULT or NONE. */
  retrievalImportance?: RetrievalImportance;
  /** If set, describes how the property should be used as a search operator. */
  operatorOptions?: HtmlOperatorOptions;
}

export const HtmlPropertyOptions: Schema.Schema<HtmlPropertyOptions> = Schema.suspend(() => Schema.Struct({
  retrievalImportance: Schema.optional(RetrievalImportance),
  operatorOptions: Schema.optional(HtmlOperatorOptions),
})).annotate({ identifier: "HtmlPropertyOptions" }) as any as Schema.Schema<HtmlPropertyOptions>;

export interface PropertyDisplayOptions {
  /** The user friendly label for the property that is used if the property is specified to be displayed in ObjectDisplayOptions. If provided, the display label is shown in front of the property values when the property is part of the object display options. For example, if the property value is '1', the value by itself may not be useful context for the user. If the display name given was 'priority', then the user sees 'priority : 1' in the search results which provides clear context to search users. This is OPTIONAL; if not given, only the property values are displayed. The maximum length is 64 characters. */
  displayLabel?: string;
}

export const PropertyDisplayOptions: Schema.Schema<PropertyDisplayOptions> = Schema.suspend(() => Schema.Struct({
  displayLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "PropertyDisplayOptions" }) as any as Schema.Schema<PropertyDisplayOptions>;

export interface PropertyDefinition {
  /** The name of the property. Item indexing requests sent to the Indexing API should set the property name equal to this value. For example, if name is *subject_line*, then indexing requests for document items with subject fields should set the name for that field equal to *subject_line*. Use the name as the identifier for the object property. Once registered as a property for an object, you cannot re-use this name for another property within that object. The name must start with a letter and can only contain letters (A-Z, a-z) or numbers (0-9). The maximum length is 256 characters. */
  name?: string;
  /** Indicates that the property identifies data that should be returned in search results via the Query API. If set to *true*, indicates that Query API users can use matching property fields in results. However, storing fields requires more space allocation and uses more bandwidth for search queries, which impacts performance over large datasets. Set to *true* here only if the field is needed for search results. Cannot be true for properties whose type is an object. */
  isReturnable?: boolean;
  /** Indicates that multiple values are allowed for the property. For example, a document only has one description but can have multiple comments. Cannot be true for properties whose type is a boolean. If set to false, properties that contain more than one value cause the indexing request for that item to be rejected. */
  isRepeatable?: boolean;
  /** Indicates that the property can be used for sorting. Cannot be true for properties that are repeatable. Cannot be true for properties whose type is object. IsReturnable must be true to set this option. Only supported for boolean, date, double, integer, and timestamp properties. */
  isSortable?: boolean;
  /** Indicates that the property can be used for generating facets. Cannot be true for properties whose type is object. IsReturnable must be true to set this option. Only supported for boolean, enum, integer, and text properties. */
  isFacetable?: boolean;
  /** Indicates that the property can be used for generating query suggestions. */
  isSuggestable?: boolean;
  /** Indicates that users can perform wildcard search for this property. Only supported for Text properties. IsReturnable must be true to set this option. In a given datasource maximum of 5 properties can be marked as is_wildcard_searchable. For more details, see [Define object properties](https://developers.google.com/workspace/cloud-search/docs/guides/schema-guide#properties) */
  isWildcardSearchable?: boolean;
  integerPropertyOptions?: IntegerPropertyOptions;
  doublePropertyOptions?: DoublePropertyOptions;
  timestampPropertyOptions?: TimestampPropertyOptions;
  booleanPropertyOptions?: BooleanPropertyOptions;
  objectPropertyOptions?: ObjectPropertyOptions;
  enumPropertyOptions?: EnumPropertyOptions;
  datePropertyOptions?: DatePropertyOptions;
  textPropertyOptions?: TextPropertyOptions;
  htmlPropertyOptions?: HtmlPropertyOptions;
  /** The options that determine how the property is displayed in the Cloud Search results page if it's specified to be displayed in the object's display options. */
  displayOptions?: PropertyDisplayOptions;
}

export const PropertyDefinition: Schema.Schema<PropertyDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  isReturnable: Schema.optional(Schema.Boolean),
  isRepeatable: Schema.optional(Schema.Boolean),
  isSortable: Schema.optional(Schema.Boolean),
  isFacetable: Schema.optional(Schema.Boolean),
  isSuggestable: Schema.optional(Schema.Boolean),
  isWildcardSearchable: Schema.optional(Schema.Boolean),
  integerPropertyOptions: Schema.optional(IntegerPropertyOptions),
  doublePropertyOptions: Schema.optional(DoublePropertyOptions),
  timestampPropertyOptions: Schema.optional(TimestampPropertyOptions),
  booleanPropertyOptions: Schema.optional(BooleanPropertyOptions),
  objectPropertyOptions: Schema.optional(ObjectPropertyOptions),
  enumPropertyOptions: Schema.optional(EnumPropertyOptions),
  datePropertyOptions: Schema.optional(DatePropertyOptions),
  textPropertyOptions: Schema.optional(TextPropertyOptions),
  htmlPropertyOptions: Schema.optional(HtmlPropertyOptions),
  displayOptions: Schema.optional(PropertyDisplayOptions),
})).annotate({ identifier: "PropertyDefinition" }) as any as Schema.Schema<PropertyDefinition>;

export interface ObjectDefinition {
  /** The name for the object, which then defines its type. Item indexing requests should set the objectType field equal to this value. For example, if *name* is *Document*, then indexing requests for items of type Document should set objectType equal to *Document*. Each object definition must be uniquely named within a schema. The name must start with a letter and can only contain letters (A-Z, a-z) or numbers (0-9). The maximum length is 256 characters. */
  name?: string;
  /** The optional object-specific options. */
  options?: ObjectOptions;
  /** The property definitions for the object. The maximum number of elements is 1000. */
  propertyDefinitions?: Array<PropertyDefinition>;
}

export const ObjectDefinition: Schema.Schema<ObjectDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  options: Schema.optional(ObjectOptions),
  propertyDefinitions: Schema.optional(Schema.Array(PropertyDefinition)),
})).annotate({ identifier: "ObjectDefinition" }) as any as Schema.Schema<ObjectDefinition>;

export interface Cloudsearch_Schema {
  /** The list of top-level objects for the data source. The maximum number of elements is 10. */
  objectDefinitions?: Array<ObjectDefinition>;
  /** IDs of the Long Running Operations (LROs) currently running for this schema. After modifying the schema, wait for operations to complete before indexing additional content. */
  operationIds?: Array<string>;
}

export const Cloudsearch_Schema: Schema.Schema<Cloudsearch_Schema> = Schema.suspend(() => Schema.Struct({
  objectDefinitions: Schema.optional(Schema.Array(ObjectDefinition)),
  operationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Cloudsearch_Schema" }) as any as Schema.Schema<Cloudsearch_Schema>;

export interface UpdateSchemaRequest {
  /** If true, the schema will be checked for validity, but will not be registered with the data source, even if valid. */
  validateOnly?: boolean;
  /** The new schema for the source. */
  schema?: Cloudsearch_Schema;
  /** Common debug options. */
  debugOptions?: DebugOptions;
}

export const UpdateSchemaRequest: Schema.Schema<UpdateSchemaRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  schema: Schema.optional(Cloudsearch_Schema),
  debugOptions: Schema.optional(DebugOptions),
})).annotate({ identifier: "UpdateSchemaRequest" }) as any as Schema.Schema<UpdateSchemaRequest>;

export interface DataSource {
  /** The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource. */
  name?: string;
  /** Required. Display name of the datasource The maximum length is 300 characters. */
  displayName?: string;
  /** A short name or alias for the source. This value will be used to match the 'source' operator. For example, if the short name is *<value>* then queries like *source:<value>* will only return results for this source. The value must be unique across all datasources. The value must only contain alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google' and cannot be one of the following: mail, gmail, docs, drive, groups, sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length is 32 characters. */
  shortName?: string;
  /** List of service accounts that have indexing access. */
  indexingServiceAccounts?: Array<string>;
  /** Disable serving any search or assist results. */
  disableServing?: boolean;
  /** If true, sets the datasource to read-only mode. In read-only mode, the Indexing API rejects any requests to index or delete items in this source. Enabling read-only mode does not stop the processing of previously accepted data. */
  disableModifications?: boolean;
  /** This field restricts visibility to items at the datasource level. Items within the datasource are restricted to the union of users and groups included in this field. Note that, this does not ensure access to a specific item, as users need to have ACL permissions on the contained items. This ensures a high level access on the entire datasource, and that the individual items are not shared outside this visibility. */
  itemsVisibility?: Array<GSuitePrincipal>;
  /** Can a user request to get thumbnail URI for Items indexed in this data source. */
  returnThumbnailUrls?: boolean;
  /** IDs of the Long Running Operations (LROs) currently running for this schema. */
  operationIds?: Array<string>;
}

export const DataSource: Schema.Schema<DataSource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  shortName: Schema.optional(Schema.String),
  indexingServiceAccounts: Schema.optional(Schema.Array(Schema.String)),
  disableServing: Schema.optional(Schema.Boolean),
  disableModifications: Schema.optional(Schema.Boolean),
  itemsVisibility: Schema.optional(Schema.Array(GSuitePrincipal)),
  returnThumbnailUrls: Schema.optional(Schema.Boolean),
  operationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataSource" }) as any as Schema.Schema<DataSource>;

export interface UpdateDataSourceRequest {
  source?: DataSource;
  /** Common debug options. */
  debugOptions?: DebugOptions;
  /** Only applies to [`settings.datasources.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.datasources/patch). Update mask to control which fields to update. Example field paths: `name`, `displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the source, that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated. */
  updateMask?: string;
}

export const UpdateDataSourceRequest: Schema.Schema<UpdateDataSourceRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(DataSource),
  debugOptions: Schema.optional(DebugOptions),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateDataSourceRequest" }) as any as Schema.Schema<UpdateDataSourceRequest>;

export interface ListDataSourceResponse {
  sources?: Array<DataSource>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListDataSourceResponse: Schema.Schema<ListDataSourceResponse> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(DataSource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDataSourceResponse" }) as any as Schema.Schema<ListDataSourceResponse>;

export interface ItemCountByStatus {
  /** Status of the items. */
  statusCode?: "CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED" | (string & {});
  /** Number of items matching the status code. */
  count?: string;
  /** Number of items matching the status code for which billing is done. This excludes virtual container items from the total count. This count would not be applicable for items with ERROR or NEW_ITEM status code. */
  indexedItemsCount?: string;
}

export const ItemCountByStatus: Schema.Schema<ItemCountByStatus> = Schema.suspend(() => Schema.Struct({
  statusCode: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  indexedItemsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemCountByStatus" }) as any as Schema.Schema<ItemCountByStatus>;

export interface DataSourceIndexStats {
  /** The date for which index stats were calculated. If the date of request is not the current date then stats calculated on the next day are returned. Stats are calculated close to mid night in this case. If date of request is current date, then real time stats are returned. */
  date?: Cloudsearch_Date;
  /** Number of items aggregrated by status code. */
  itemCountByStatus?: Array<ItemCountByStatus>;
}

export const DataSourceIndexStats: Schema.Schema<DataSourceIndexStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  itemCountByStatus: Schema.optional(Schema.Array(ItemCountByStatus)),
})).annotate({ identifier: "DataSourceIndexStats" }) as any as Schema.Schema<DataSourceIndexStats>;

export interface GetDataSourceIndexStatsResponse {
  /** Summary of indexed item counts, one for each day in the requested range. */
  stats?: Array<DataSourceIndexStats>;
  /** Average item count for the given date range for which billing is done. */
  averageIndexedItemCount?: string;
}

export const GetDataSourceIndexStatsResponse: Schema.Schema<GetDataSourceIndexStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(DataSourceIndexStats)),
  averageIndexedItemCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GetDataSourceIndexStatsResponse" }) as any as Schema.Schema<GetDataSourceIndexStatsResponse>;

export interface CustomerIndexStats {
  /** The date for which statistics were calculated. */
  date?: Cloudsearch_Date;
  /** Number of items aggregrated by status code. */
  itemCountByStatus?: Array<ItemCountByStatus>;
}

export const CustomerIndexStats: Schema.Schema<CustomerIndexStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  itemCountByStatus: Schema.optional(Schema.Array(ItemCountByStatus)),
})).annotate({ identifier: "CustomerIndexStats" }) as any as Schema.Schema<CustomerIndexStats>;

export interface GetCustomerIndexStatsResponse {
  /** Summary of indexed item counts, one for each day in the requested range. */
  stats?: Array<CustomerIndexStats>;
  /** Average item count for the given date range for which billing is done. */
  averageIndexedItemCount?: string;
}

export const GetCustomerIndexStatsResponse: Schema.Schema<GetCustomerIndexStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(CustomerIndexStats)),
  averageIndexedItemCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GetCustomerIndexStatsResponse" }) as any as Schema.Schema<GetCustomerIndexStatsResponse>;

export interface QueryCountByStatus {
  /** This represents the http status code. */
  statusCode?: number;
  count?: string;
}

export const QueryCountByStatus: Schema.Schema<QueryCountByStatus> = Schema.suspend(() => Schema.Struct({
  statusCode: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryCountByStatus" }) as any as Schema.Schema<QueryCountByStatus>;

export interface SearchApplicationQueryStats {
  /** The date for which query stats were calculated. Stats calculated on the next day close to midnight are returned. */
  date?: Cloudsearch_Date;
  queryCountByStatus?: Array<QueryCountByStatus>;
}

export const SearchApplicationQueryStats: Schema.Schema<SearchApplicationQueryStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  queryCountByStatus: Schema.optional(Schema.Array(QueryCountByStatus)),
})).annotate({ identifier: "SearchApplicationQueryStats" }) as any as Schema.Schema<SearchApplicationQueryStats>;

export interface GetSearchApplicationQueryStatsResponse {
  /** Query stats per date for a search application. */
  stats?: Array<SearchApplicationQueryStats>;
  /** Total successful query count (status code 200) for the given date range. */
  totalQueryCount?: string;
}

export const GetSearchApplicationQueryStatsResponse: Schema.Schema<GetSearchApplicationQueryStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(SearchApplicationQueryStats)),
  totalQueryCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GetSearchApplicationQueryStatsResponse" }) as any as Schema.Schema<GetSearchApplicationQueryStatsResponse>;

export interface CustomerQueryStats {
  /** The date for which query stats were calculated. Stats calculated on the next day close to midnight are returned. */
  date?: Cloudsearch_Date;
  queryCountByStatus?: Array<QueryCountByStatus>;
}

export const CustomerQueryStats: Schema.Schema<CustomerQueryStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  queryCountByStatus: Schema.optional(Schema.Array(QueryCountByStatus)),
})).annotate({ identifier: "CustomerQueryStats" }) as any as Schema.Schema<CustomerQueryStats>;

export interface GetCustomerQueryStatsResponse {
  stats?: Array<CustomerQueryStats>;
  /** Total successful query count (status code 200) for the given date range. */
  totalQueryCount?: string;
}

export const GetCustomerQueryStatsResponse: Schema.Schema<GetCustomerQueryStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(CustomerQueryStats)),
  totalQueryCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GetCustomerQueryStatsResponse" }) as any as Schema.Schema<GetCustomerQueryStatsResponse>;

export interface SearchApplicationUserStats {
  /** The date for which session stats were calculated. Stats calculated on the next day close to midnight are returned. */
  date?: Cloudsearch_Date;
  /** The count of unique active users in the past one day */
  oneDayActiveUsersCount?: string;
  /** The count of unique active users in the past seven days */
  sevenDaysActiveUsersCount?: string;
  /** The count of unique active users in the past thirty days */
  thirtyDaysActiveUsersCount?: string;
}

export const SearchApplicationUserStats: Schema.Schema<SearchApplicationUserStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  oneDayActiveUsersCount: Schema.optional(Schema.String),
  sevenDaysActiveUsersCount: Schema.optional(Schema.String),
  thirtyDaysActiveUsersCount: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchApplicationUserStats" }) as any as Schema.Schema<SearchApplicationUserStats>;

export interface GetSearchApplicationUserStatsResponse {
  stats?: Array<SearchApplicationUserStats>;
}

export const GetSearchApplicationUserStatsResponse: Schema.Schema<GetSearchApplicationUserStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(SearchApplicationUserStats)),
})).annotate({ identifier: "GetSearchApplicationUserStatsResponse" }) as any as Schema.Schema<GetSearchApplicationUserStatsResponse>;

export interface CustomerUserStats {
  /** The date for which session stats were calculated. Stats calculated on the next day close to midnight are returned. */
  date?: Cloudsearch_Date;
  /** The count of unique active users in the past one day */
  oneDayActiveUsersCount?: string;
  /** The count of unique active users in the past seven days */
  sevenDaysActiveUsersCount?: string;
  /** The count of unique active users in the past thirty days */
  thirtyDaysActiveUsersCount?: string;
}

export const CustomerUserStats: Schema.Schema<CustomerUserStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  oneDayActiveUsersCount: Schema.optional(Schema.String),
  sevenDaysActiveUsersCount: Schema.optional(Schema.String),
  thirtyDaysActiveUsersCount: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerUserStats" }) as any as Schema.Schema<CustomerUserStats>;

export interface GetCustomerUserStatsResponse {
  stats?: Array<CustomerUserStats>;
}

export const GetCustomerUserStatsResponse: Schema.Schema<GetCustomerUserStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(CustomerUserStats)),
})).annotate({ identifier: "GetCustomerUserStatsResponse" }) as any as Schema.Schema<GetCustomerUserStatsResponse>;

export interface SearchApplicationSessionStats {
  /** The date for which session stats were calculated. Stats are calculated on the following day, close to midnight PST, and then returned. */
  date?: Cloudsearch_Date;
  /** The count of search sessions on the day */
  searchSessionsCount?: string;
}

export const SearchApplicationSessionStats: Schema.Schema<SearchApplicationSessionStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  searchSessionsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchApplicationSessionStats" }) as any as Schema.Schema<SearchApplicationSessionStats>;

export interface GetSearchApplicationSessionStatsResponse {
  stats?: Array<SearchApplicationSessionStats>;
}

export const GetSearchApplicationSessionStatsResponse: Schema.Schema<GetSearchApplicationSessionStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(SearchApplicationSessionStats)),
})).annotate({ identifier: "GetSearchApplicationSessionStatsResponse" }) as any as Schema.Schema<GetSearchApplicationSessionStatsResponse>;

export interface CustomerSessionStats {
  /** The date for which session stats were calculated. Stats are calculated on the following day, close to midnight PST, and then returned. */
  date?: Cloudsearch_Date;
  /** The count of search sessions on the day */
  searchSessionsCount?: string;
}

export const CustomerSessionStats: Schema.Schema<CustomerSessionStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  searchSessionsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerSessionStats" }) as any as Schema.Schema<CustomerSessionStats>;

export interface GetCustomerSessionStatsResponse {
  stats?: Array<CustomerSessionStats>;
}

export const GetCustomerSessionStatsResponse: Schema.Schema<GetCustomerSessionStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(CustomerSessionStats)),
})).annotate({ identifier: "GetCustomerSessionStatsResponse" }) as any as Schema.Schema<GetCustomerSessionStatsResponse>;

export interface CustomerSearchApplicationStats {
  /** The date for which search application stats were calculated. */
  date?: Cloudsearch_Date;
  /** The count of search applications for the date. */
  count?: string;
}

export const CustomerSearchApplicationStats: Schema.Schema<CustomerSearchApplicationStats> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Cloudsearch_Date),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerSearchApplicationStats" }) as any as Schema.Schema<CustomerSearchApplicationStats>;

export interface GetCustomerSearchApplicationStatsResponse {
  /** Search application stats by date. */
  stats?: Array<CustomerSearchApplicationStats>;
  /** Average search application count for the given date range. */
  averageSearchApplicationCount?: string;
}

export const GetCustomerSearchApplicationStatsResponse: Schema.Schema<GetCustomerSearchApplicationStatsResponse> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(Schema.Array(CustomerSearchApplicationStats)),
  averageSearchApplicationCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GetCustomerSearchApplicationStatsResponse" }) as any as Schema.Schema<GetCustomerSearchApplicationStatsResponse>;

export interface UnmappedIdentity {
  /** The resource name for an external user. */
  externalIdentity?: Principal;
  /** The resolution status for the external identity. */
  resolutionStatusCode?: "CODE_UNSPECIFIED" | "NOT_FOUND" | "IDENTITY_SOURCE_NOT_FOUND" | "IDENTITY_SOURCE_MISCONFIGURED" | "TOO_MANY_MAPPINGS_FOUND" | "INTERNAL_ERROR" | (string & {});
}

export const UnmappedIdentity: Schema.Schema<UnmappedIdentity> = Schema.suspend(() => Schema.Struct({
  externalIdentity: Schema.optional(Principal),
  resolutionStatusCode: Schema.optional(Schema.String),
})).annotate({ identifier: "UnmappedIdentity" }) as any as Schema.Schema<UnmappedIdentity>;

export interface ListUnmappedIdentitiesResponse {
  unmappedIdentities?: Array<UnmappedIdentity>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListUnmappedIdentitiesResponse: Schema.Schema<ListUnmappedIdentitiesResponse> = Schema.suspend(() => Schema.Struct({
  unmappedIdentities: Schema.optional(Schema.Array(UnmappedIdentity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUnmappedIdentitiesResponse" }) as any as Schema.Schema<ListUnmappedIdentitiesResponse>;

export interface ListItemNamesForUnmappedIdentityResponse {
  itemNames?: Array<string>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListItemNamesForUnmappedIdentityResponse: Schema.Schema<ListItemNamesForUnmappedIdentityResponse> = Schema.suspend(() => Schema.Struct({
  itemNames: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListItemNamesForUnmappedIdentityResponse" }) as any as Schema.Schema<ListItemNamesForUnmappedIdentityResponse>;

export interface Media {
  /** Name of the media resource. */
  resourceName?: string;
}

export const Media: Schema.Schema<Media> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "Media" }) as any as Schema.Schema<Media>;

export interface DriveMimeTypeRestrict {
  type?: "UNSPECIFIED" | "PDF" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "FORM" | "DRAWING" | "SCRIPT" | "MAP" | "IMAGE" | "AUDIO" | "VIDEO" | "FOLDER" | "ARCHIVE" | "SITE" | (string & {});
}

export const DriveMimeTypeRestrict: Schema.Schema<DriveMimeTypeRestrict> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveMimeTypeRestrict" }) as any as Schema.Schema<DriveMimeTypeRestrict>;

export interface DriveLocationRestrict {
  type?: "UNSPECIFIED" | "TRASHED" | "STARRED" | (string & {});
}

export const DriveLocationRestrict: Schema.Schema<DriveLocationRestrict> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveLocationRestrict" }) as any as Schema.Schema<DriveLocationRestrict>;

export interface DriveTimeSpanRestrict {
  type?: "UNSPECIFIED" | "TODAY" | "YESTERDAY" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS" | (string & {});
}

export const DriveTimeSpanRestrict: Schema.Schema<DriveTimeSpanRestrict> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveTimeSpanRestrict" }) as any as Schema.Schema<DriveTimeSpanRestrict>;

export interface DriveFollowUpRestrict {
  type?: "UNSPECIFIED" | "FOLLOWUP_SUGGESTIONS" | "FOLLOWUP_ACTION_ITEMS" | (string & {});
}

export const DriveFollowUpRestrict: Schema.Schema<DriveFollowUpRestrict> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveFollowUpRestrict" }) as any as Schema.Schema<DriveFollowUpRestrict>;

export interface RestrictItem {
  /** The search restrict (e.g. "after:2017-09-11 before:2017-09-12"). */
  searchOperator?: string;
  /** Drive Types. */
  driveMimeTypeRestrict?: DriveMimeTypeRestrict;
  driveLocationRestrict?: DriveLocationRestrict;
  driveTimeSpanRestrict?: DriveTimeSpanRestrict;
  driveFollowUpRestrict?: DriveFollowUpRestrict;
}

export const RestrictItem: Schema.Schema<RestrictItem> = Schema.suspend(() => Schema.Struct({
  searchOperator: Schema.optional(Schema.String),
  driveMimeTypeRestrict: Schema.optional(DriveMimeTypeRestrict),
  driveLocationRestrict: Schema.optional(DriveLocationRestrict),
  driveTimeSpanRestrict: Schema.optional(DriveTimeSpanRestrict),
  driveFollowUpRestrict: Schema.optional(DriveFollowUpRestrict),
})).annotate({ identifier: "RestrictItem" }) as any as Schema.Schema<RestrictItem>;

export interface QueryItem {
  /** True if the text was generated by means other than a previous user search. */
  isSynthetic?: boolean;
}

export const QueryItem: Schema.Schema<QueryItem> = Schema.suspend(() => Schema.Struct({
  isSynthetic: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QueryItem" }) as any as Schema.Schema<QueryItem>;

export interface EnterpriseTopazSidekickRankingParams {
  /** The start-time that this object will bid-for If the type is marked as FIXED, then this start-time will persist after bidding. If the type is marked as FLEXIBLE, then it will occur at the given time or sometime after the requested time. Expected to be set for all types. */
  startTimeMs?: string;
  /** The end-time that this object will expect to occur. If the type is marked as FIXED, then this end-time will persist after bidding. If the type is marked as FLEXIBLE, this field is NOT expected to be filled and will be filled in after it has won a bid. Expected to be set when type is set to FIXED. */
  endTimeMs?: string;
  /** The packing type of this object. */
  type?: "FIXED" | "FLEXIBLE" | (string & {});
  /** The priority to determine between objects that have the same start_time_ms The lower-value of priority == ranked higher. Max-priority = 0. Expected to be set for all types. */
  priority?: "UNKNOWN" | "CRITICAL" | "IMPORTANT" | "HIGH" | "NORMAL" | "BEST_EFFORT" | (string & {});
  /** The span that this card will take in the stream Expected to be set when type is set to FLEXIBLE. */
  spanMs?: string;
  /** The score of the card to be used to break priority-ties */
  score?: number;
}

export const EnterpriseTopazSidekickRankingParams: Schema.Schema<EnterpriseTopazSidekickRankingParams> = Schema.suspend(() => Schema.Struct({
  startTimeMs: Schema.optional(Schema.String),
  endTimeMs: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  spanMs: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseTopazSidekickRankingParams" }) as any as Schema.Schema<EnterpriseTopazSidekickRankingParams>;

export interface EnterpriseTopazSidekickNlpMetadata {
  /** Confidence of the interpretation that generated this card. */
  confidence?: number;
}

export const EnterpriseTopazSidekickNlpMetadata: Schema.Schema<EnterpriseTopazSidekickNlpMetadata> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseTopazSidekickNlpMetadata" }) as any as Schema.Schema<EnterpriseTopazSidekickNlpMetadata>;

export interface EnterpriseTopazSidekickCardMetadata {
  /** Chronology. */
  chronology?: "UNKNOWN" | "PAST" | "RECENTLY_PAST" | "PRESENT" | "NEAR_FUTURE" | "FUTURE" | (string & {});
  /** Render mode. */
  renderMode?: "UNKNOWN_RENDER" | "COLLAPSED" | "EXPANDED" | (string & {});
  /** An ID to identify the card and match actions to it. Be thoughtful of new card IDs since actions will be associated to that ID. E.g., if two card IDs collide, the system will think that the actions have been applied to the same card. Similarly, if EAS can return multiple cards of the same type (e.g., Meetings), ensure that the card_id identifies a given instance of the card so that, e.g., dismissals only affect the dismissed card as opposed to affecting all meeting cards. */
  cardId?: string;
  /** Ranking params. */
  rankingParams?: EnterpriseTopazSidekickRankingParams;
  /** Debug info (only reported if request's debug_level > 0). */
  debugInfo?: string;
  /** Declares a preference for how this card should be packed in MSCR. All cards in a response must correspond to a single category. As a result, cards may be dropped from the response if this field is set. Any card that does not match the category of the card with the highest priority in the response will be dropped. */
  cardCategory?: "DEFAULT" | "ANSWER" | "KNOWLEDGE" | "HOMEPAGE" | (string & {});
  /** Information about the NLP done to get the card. */
  nlpMetadata?: EnterpriseTopazSidekickNlpMetadata;
}

export const EnterpriseTopazSidekickCardMetadata: Schema.Schema<EnterpriseTopazSidekickCardMetadata> = Schema.suspend(() => Schema.Struct({
  chronology: Schema.optional(Schema.String),
  renderMode: Schema.optional(Schema.String),
  cardId: Schema.optional(Schema.String),
  rankingParams: Schema.optional(EnterpriseTopazSidekickRankingParams),
  debugInfo: Schema.optional(Schema.String),
  cardCategory: Schema.optional(Schema.String),
  nlpMetadata: Schema.optional(EnterpriseTopazSidekickNlpMetadata),
})).annotate({ identifier: "EnterpriseTopazSidekickCardMetadata" }) as any as Schema.Schema<EnterpriseTopazSidekickCardMetadata>;

export interface EnterpriseTopazSidekickPerson {
  /** Gaia id. */
  gaiaId?: string;
  /** Name. */
  name?: string;
  /** Email. */
  email?: string;
  /** Attendance status of the person when included in a meeting event. */
  attendingStatus?: "AWAITING" | "YES" | "NO" | "MAYBE" | (string & {});
  /** Absolute URL to the profile photo of the person. */
  photoUrl?: string;
  /** Whether the invitee is a group. */
  isGroup?: boolean;
  /** The level of affinity this person has with the requesting user. */
  affinityLevel?: "UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Obfuscated Gaia id. */
  obfuscatedGaiaId?: string;
}

export const EnterpriseTopazSidekickPerson: Schema.Schema<EnterpriseTopazSidekickPerson> = Schema.suspend(() => Schema.Struct({
  gaiaId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  attendingStatus: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  isGroup: Schema.optional(Schema.Boolean),
  affinityLevel: Schema.optional(Schema.String),
  obfuscatedGaiaId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPerson" }) as any as Schema.Schema<EnterpriseTopazSidekickPerson>;

export interface EnterpriseTopazSidekickCommonPersonBirthday {
  /** Unstructured birthday. */
  value?: string;
}

export const EnterpriseTopazSidekickCommonPersonBirthday: Schema.Schema<EnterpriseTopazSidekickCommonPersonBirthday> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonPersonBirthday" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonPersonBirthday>;

export interface EnterpriseTopazSidekickCommonPerson {
  /** Email. */
  email?: string;
  /** The full name. */
  displayName?: string;
  /** This field is deprecated. The obfuscated_id should be used instead. */
  gaiaId?: string;
  /** The street address (e.g. 1255 Pear Avenue). */
  streetAddress?: string;
  /** Work desk phone number. */
  deskPhone?: string;
  /** Cell phone number. */
  cellPhone?: string;
  /** Desk location (e.g. US-MTV-PR55-5-5B1I). */
  deskLocation?: string;
  /** The person's job title (e.g. Software Engineer). */
  jobTitle?: string;
  /** The URL for the Focus profile picture. */
  photoUrl?: string;
  /** The department the person works in (e.g. Engineering). */
  department?: string;
  /** The first name. */
  givenName?: string;
  /** The last name. */
  familyName?: string;
  /** The manager. */
  manager?: EnterpriseTopazSidekickCommonPerson;
  /** The fully formatted address (e.g. 1255 Pear Avenue, Mountain View 94043, United States). */
  fullAddress?: string;
  /** The obfuscated GAIA ID. */
  obfuscatedId?: string;
  /** The birthday. */
  birthday?: EnterpriseTopazSidekickCommonPersonBirthday;
}

export const EnterpriseTopazSidekickCommonPerson: Schema.Schema<EnterpriseTopazSidekickCommonPerson> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  gaiaId: Schema.optional(Schema.String),
  streetAddress: Schema.optional(Schema.String),
  deskPhone: Schema.optional(Schema.String),
  cellPhone: Schema.optional(Schema.String),
  deskLocation: Schema.optional(Schema.String),
  jobTitle: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  department: Schema.optional(Schema.String),
  givenName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
  manager: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  fullAddress: Schema.optional(Schema.String),
  obfuscatedId: Schema.optional(Schema.String),
  birthday: Schema.optional(EnterpriseTopazSidekickCommonPersonBirthday),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonPerson" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonPerson>;

export interface EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata {
  /** The owner of the document. */
  owner?: EnterpriseTopazSidekickCommonPerson;
  /** Timestamp of the most recent view from the current user in milliseconds since epoch. */
  lastViewTimeMs?: string;
  /** Timestamp of the most recent edit from the current user in milliseconds since epoch. */
  lastEditTimeMs?: string;
  /** Timestamp of the last updated time of the document in milliseconds since epoch. */
  lastUpdatedTimeMs?: string;
  /** Timestamp of the most recent comment added to the document in milliseconds since epoch. */
  lastCommentTimeMs?: string;
  /** The drive document cosmo id. Client could use the id to build a URL to open a document. Please use Document.document_id. */
  documentId?: string;
  /** Last modification time of the document (independent of the user that modified it). */
  lastModificationTimeMillis?: string;
  /** ACL scope of the document which identifies the sharing status of the doc (e.g., limited, shared with link, team drive, ...). */
  scope?: "UNKNOWN_DOCUMENT_SCOPE" | "LIMITED" | "DASHER_DOMAIN_WITH_LINK" | "DASHER_DOMAIN" | "PUBLIC_WITH_LINK" | "PUBLIC" | "TEAM_DRIVE" | (string & {});
  /** Additional field to identify whether a document is private since scope set to LIMITED can mean both that the doc is private or that it's shared with others. is_private indicates whether the doc is not shared with anyone except for the owner. */
  isPrivate?: boolean;
}

export const EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata: Schema.Schema<EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata> = Schema.suspend(() => Schema.Struct({
  owner: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  lastViewTimeMs: Schema.optional(Schema.String),
  lastEditTimeMs: Schema.optional(Schema.String),
  lastUpdatedTimeMs: Schema.optional(Schema.String),
  lastCommentTimeMs: Schema.optional(Schema.String),
  documentId: Schema.optional(Schema.String),
  lastModificationTimeMillis: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  isPrivate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata>;

export interface EnterpriseTopazSidekickCommonDocumentJustification {
  /** A locale aware message that explains why this document was selected. */
  justification?: string;
  /** Reason on why the document is selected. Populate for trending documents. */
  reason?: "UNKNOWN" | "TRENDING_IN_COLLABORATORS" | "TRENDING_IN_DOMAIN" | "FREQUENTLY_VIEWED" | "FREQUENTLY_EDITED" | "NEW_UPDATES" | "NEW_COMMENTS" | "EVENT_DESCRIPTION" | "EVENT_ATTACHMENT" | "EVENT_METADATA_ATTACHMENT" | "MINED_DOCUMENT" | "NEW_MENTIONS" | "NEW_SHARES" | (string & {});
}

export const EnterpriseTopazSidekickCommonDocumentJustification: Schema.Schema<EnterpriseTopazSidekickCommonDocumentJustification> = Schema.suspend(() => Schema.Struct({
  justification: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonDocumentJustification" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonDocumentJustification>;

export interface EnterpriseTopazSidekickCommonDebugInfo {
  /** Debug message. */
  message?: string;
}

export const EnterpriseTopazSidekickCommonDebugInfo: Schema.Schema<EnterpriseTopazSidekickCommonDebugInfo> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonDebugInfo" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonDebugInfo>;

export interface EnterpriseTopazSidekickCommonDocument {
  /** Title of the document. */
  title?: string;
  /** Absolute URL of the document. */
  url?: string;
  /** A sampling of the text from the document. */
  snippet?: string;
  /** Drive document metadata. */
  driveDocumentMetadata?: EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata;
  /** Justification on why the document is selected. */
  justification?: EnterpriseTopazSidekickCommonDocumentJustification;
  /** Information for debugging. */
  debugInfo?: EnterpriseTopazSidekickCommonDebugInfo;
  /** Justification of why this document is being returned. */
  reason?: "UNKNOWN" | "TRENDING_IN_COLLABORATORS" | "TRENDING_IN_DOMAIN" | "FREQUENTLY_VIEWED" | "FREQUENTLY_EDITED" | "NEW_UPDATES" | "NEW_COMMENTS" | "EVENT_DESCRIPTION" | "EVENT_ATTACHMENT" | "EVENT_METADATA_ATTACHMENT" | "MINED_DOCUMENT" | "NEW_MENTIONS" | "NEW_SHARES" | (string & {});
  /** Type of the document. */
  type?: "UNKNOWN" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "PDF" | "IMAGE" | "BINARY_BLOB" | "FUSION_TABLE" | "FOLDER" | "DRAWING" | "VIDEO" | "FORM" | "LINK_URL" | "LINK_GO" | "LINK_GOO_GL" | "LINK_BIT_LY" | "LINK_GMAIL" | "LINK_MAILTO" | "VIDEO_YOUTUBE" | "VIDEO_LIVE" | "GROUPS" | "NEWS" | "SITES" | "HANGOUT" | "AUDIO" | "MS_WORD" | "MS_POWERPOINT" | "MS_EXCEL" | "MS_OUTLOOK" | (string & {});
  /** MIME type */
  mimeType?: string;
  /** Document provenance. */
  provenance?: "UNKNOWN_PROVENANCE" | "CALENDAR_DESCRIPTION" | "CALENDAR_ATTACHMENT" | "MINED" | "CALENDAR_ASSIST_ATTACHMENT" | (string & {});
  /** Thumbnail URL. */
  thumbnailUrl?: string;
  /** Access type, i.e., whether the user has access to the document or not. */
  accessType?: "UNKNOWN_ACCESS" | "ALLOWED" | "NOT_ALLOWED" | (string & {});
  /** Document id. */
  documentId?: string;
  /** Generic Drive-based url in the format of drive.google.com/open to be used for deeplink */
  genericUrl?: string;
}

export const EnterpriseTopazSidekickCommonDocument: Schema.Schema<EnterpriseTopazSidekickCommonDocument> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  snippet: Schema.optional(Schema.String),
  driveDocumentMetadata: Schema.optional(EnterpriseTopazSidekickCommonDocumentDriveDocumentMetadata),
  justification: Schema.optional(EnterpriseTopazSidekickCommonDocumentJustification),
  debugInfo: Schema.optional(EnterpriseTopazSidekickCommonDebugInfo),
  reason: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  provenance: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
  accessType: Schema.optional(Schema.String),
  documentId: Schema.optional(Schema.String),
  genericUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickCommonDocument" }) as any as Schema.Schema<EnterpriseTopazSidekickCommonDocument>;

export interface EnterpriseTopazSidekickAgendaEntry {
  /** Title of the agenda item. */
  title?: string;
  /** Description of the agenda item (i.e., typically, summary in calendar event). */
  description?: string;
  /** Start time in milliseconds. */
  startTimeMs?: string;
  /** Start time (HH:mm) in the user's timezone. */
  startTime?: string;
  /** End time in milliseconds */
  endTimeMs?: string;
  /** End time (HH:mm) in the user's timezone. */
  endTime?: string;
  /** Whether the entry lasts all day. */
  isAllDay?: boolean;
  /** Agenda item location. */
  location?: string;
  /** Absolute URL for the Hangout meeting. */
  hangoutUrl?: string;
  /** People attending the meeting. */
  invitee?: Array<EnterpriseTopazSidekickPerson>;
  /** URL of the agenda item. */
  agendaItemUrl?: string;
  /** Whether this should be notified to the user. */
  notifyToUser?: boolean;
  /** Attendance status for the current user making the request. This is a convenience data member in order to avoid figuring out the same by iterating the invitee list above on the caller side. */
  currentUserAttendingStatus?: "AWAITING" | "YES" | "NO" | "MAYBE" | (string & {});
  /** Whether the details of this entry should be displayed to the user. */
  showFullEventDetailsToUse?: boolean;
  /** Hangout meeting identifier. */
  hangoutId?: string;
  /** Event id provided by Calendar API. */
  eventId?: string;
  /** User's calendar timezone; */
  timeZone?: string;
  /** The chronology from the present. */
  chronology?: "STALE" | "ALL_DAY" | "PAST" | "RECENTLY_PAST" | "PRESENT" | "NEAR_FUTURE" | "FUTURE" | (string & {});
  /** Whether the guests of the event can be seen. If false, the user is going to be reported as the only attendee to the meeting, even though there may be more attendees. */
  guestsCanSeeGuests?: boolean;
  /** Whether the guests can invite other guests. */
  guestsCanInviteOthers?: boolean;
  /** Whether the guests can modify the event. */
  guestsCanModify?: boolean;
  /** Whether the requester is the owner of the agenda entry. */
  requesterIsOwner?: boolean;
  /** Items related to the current AgendaEntry. E.g., related drive/mail/groups documents. */
  document?: Array<EnterpriseTopazSidekickCommonDocument>;
  /** Person who created the event. */
  creator?: EnterpriseTopazSidekickPerson;
  /** Last time the event was modified. */
  lastModificationTimeMs?: string;
  /** Whether guest list is not returned because number of attendees is too large. */
  otherAttendeesExcluded?: boolean;
  /** Start date "Friday, August 26" in the user's timezone. */
  startDate?: string;
  /** End date "Friday, August 26" in the user's timezone. */
  endDate?: string;
}

export const EnterpriseTopazSidekickAgendaEntry: Schema.Schema<EnterpriseTopazSidekickAgendaEntry> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  startTimeMs: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTimeMs: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  isAllDay: Schema.optional(Schema.Boolean),
  location: Schema.optional(Schema.String),
  hangoutUrl: Schema.optional(Schema.String),
  invitee: Schema.optional(Schema.Array(EnterpriseTopazSidekickPerson)),
  agendaItemUrl: Schema.optional(Schema.String),
  notifyToUser: Schema.optional(Schema.Boolean),
  currentUserAttendingStatus: Schema.optional(Schema.String),
  showFullEventDetailsToUse: Schema.optional(Schema.Boolean),
  hangoutId: Schema.optional(Schema.String),
  eventId: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  chronology: Schema.optional(Schema.String),
  guestsCanSeeGuests: Schema.optional(Schema.Boolean),
  guestsCanInviteOthers: Schema.optional(Schema.Boolean),
  guestsCanModify: Schema.optional(Schema.Boolean),
  requesterIsOwner: Schema.optional(Schema.Boolean),
  document: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonDocument)),
  creator: Schema.optional(EnterpriseTopazSidekickPerson),
  lastModificationTimeMs: Schema.optional(Schema.String),
  otherAttendeesExcluded: Schema.optional(Schema.Boolean),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickAgendaEntry" }) as any as Schema.Schema<EnterpriseTopazSidekickAgendaEntry>;

export interface EnterpriseTopazSidekickConflictingEventsCardProto {
  /** The event identified as being the most important. */
  mainEvent?: EnterpriseTopazSidekickAgendaEntry;
  /** All the events that conflict with main_event. */
  conflictingEvent?: Array<EnterpriseTopazSidekickAgendaEntry>;
}

export const EnterpriseTopazSidekickConflictingEventsCardProto: Schema.Schema<EnterpriseTopazSidekickConflictingEventsCardProto> = Schema.suspend(() => Schema.Struct({
  mainEvent: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  conflictingEvent: Schema.optional(Schema.Array(EnterpriseTopazSidekickAgendaEntry)),
})).annotate({ identifier: "EnterpriseTopazSidekickConflictingEventsCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickConflictingEventsCardProto>;

export interface EnterpriseTopazSidekickTimeSlot {
  /** Start time in milliseconds. */
  startTimeInMillis?: string;
  /** End time in milliseconds. */
  endTimeInMillis?: string;
  /** Day start time at user's timezone. */
  startTimeDay?: string;
  /** Hour and minute of the start time at the user's timezone. */
  startTimeHourAndMinute?: string;
  /** Day end time at the user's timezone. */
  endTimeDay?: string;
  /** Hour and minute of the end time at the user's timezone. */
  endTimeHourAndMinute?: string;
}

export const EnterpriseTopazSidekickTimeSlot: Schema.Schema<EnterpriseTopazSidekickTimeSlot> = Schema.suspend(() => Schema.Struct({
  startTimeInMillis: Schema.optional(Schema.String),
  endTimeInMillis: Schema.optional(Schema.String),
  startTimeDay: Schema.optional(Schema.String),
  startTimeHourAndMinute: Schema.optional(Schema.String),
  endTimeDay: Schema.optional(Schema.String),
  endTimeHourAndMinute: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickTimeSlot" }) as any as Schema.Schema<EnterpriseTopazSidekickTimeSlot>;

export interface EnterpriseTopazSidekickScheduledMeeting {
  /** The meeting time slot. */
  meetingTime?: EnterpriseTopazSidekickTimeSlot;
  /** The meeting title. */
  meetingTitle?: string;
  /** The meeting location. */
  meetingLocation?: string;
}

export const EnterpriseTopazSidekickScheduledMeeting: Schema.Schema<EnterpriseTopazSidekickScheduledMeeting> = Schema.suspend(() => Schema.Struct({
  meetingTime: Schema.optional(EnterpriseTopazSidekickTimeSlot),
  meetingTitle: Schema.optional(Schema.String),
  meetingLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickScheduledMeeting" }) as any as Schema.Schema<EnterpriseTopazSidekickScheduledMeeting>;

export interface EnterpriseTopazSidekickFindMeetingTimeCardProto {
  /** Requester. */
  requester?: EnterpriseTopazSidekickPerson;
  /** Invitees to the event. */
  invitees?: Array<EnterpriseTopazSidekickPerson>;
  /** Min and max timestamp used to find a common available timeslot. */
  timeBoundaries?: EnterpriseTopazSidekickTimeSlot;
  /** Slots when all attendees have availability. */
  commonAvailableTimeSlots?: Array<EnterpriseTopazSidekickTimeSlot>;
  /** Timezone ID. */
  timezoneId?: string;
  /** Invitees that have been skipped in the computation, most likely because they are groups. */
  skippedInvitees?: Array<EnterpriseTopazSidekickPerson>;
  /** Details about the scheduled meeting, if one exists. */
  scheduledMeeting?: EnterpriseTopazSidekickScheduledMeeting;
}

export const EnterpriseTopazSidekickFindMeetingTimeCardProto: Schema.Schema<EnterpriseTopazSidekickFindMeetingTimeCardProto> = Schema.suspend(() => Schema.Struct({
  requester: Schema.optional(EnterpriseTopazSidekickPerson),
  invitees: Schema.optional(Schema.Array(EnterpriseTopazSidekickPerson)),
  timeBoundaries: Schema.optional(EnterpriseTopazSidekickTimeSlot),
  commonAvailableTimeSlots: Schema.optional(Schema.Array(EnterpriseTopazSidekickTimeSlot)),
  timezoneId: Schema.optional(Schema.String),
  skippedInvitees: Schema.optional(Schema.Array(EnterpriseTopazSidekickPerson)),
  scheduledMeeting: Schema.optional(EnterpriseTopazSidekickScheduledMeeting),
})).annotate({ identifier: "EnterpriseTopazSidekickFindMeetingTimeCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickFindMeetingTimeCardProto>;

export interface EnterpriseTopazSidekickMeetingNotesCardError {
  /** The description of the reason why create-meeting-notes failed. */
  description?: string;
  /** The reason why create-meeting-notes failed. */
  reason?: "NONE" | "NOT_OWNER" | "UNKNOWN" | (string & {});
  /** The event to request meeting notes creation */
  event?: EnterpriseTopazSidekickAgendaEntry;
}

export const EnterpriseTopazSidekickMeetingNotesCardError: Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardError> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  event: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
})).annotate({ identifier: "EnterpriseTopazSidekickMeetingNotesCardError" }) as any as Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardError>;

export interface EnterpriseTopazSidekickMeetingNotesCardRequest {
  /** The event to request meeting notes creation */
  event?: EnterpriseTopazSidekickAgendaEntry;
  /** The error and reason if known error occured. */
  error?: EnterpriseTopazSidekickMeetingNotesCardError;
  /** Who are the meeting notes created for. */
  canCreateFor?: Array<"UNKNOWN" | "MYSELF" | "ALL_ATTENDEES" | (string & {})>;
}

export const EnterpriseTopazSidekickMeetingNotesCardRequest: Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardRequest> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  error: Schema.optional(EnterpriseTopazSidekickMeetingNotesCardError),
  canCreateFor: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseTopazSidekickMeetingNotesCardRequest" }) as any as Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardRequest>;

export interface EnterpriseTopazSidekickMeetingNotesCardProto {
  /** Title we want to show for meeting notes in the answer card */
  title?: string;
  /** New URL. */
  url?: string;
  /** The event to request meeting notes creation. */
  event?: EnterpriseTopazSidekickAgendaEntry;
  /** Google Drive ID (a.k.a. resource ID) of the file. */
  fileId?: string;
}

export const EnterpriseTopazSidekickMeetingNotesCardProto: Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardProto> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  event: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  fileId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickMeetingNotesCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickMeetingNotesCardProto>;

export interface EnterpriseTopazSidekickDocumentGroup {
  /** Document group type */
  groupType?: "UNKNOWN_TYPE" | "ALL" | (string & {});
  /** The list of corresponding documents. */
  personalizedDocument?: Array<EnterpriseTopazSidekickCommonDocument>;
}

export const EnterpriseTopazSidekickDocumentGroup: Schema.Schema<EnterpriseTopazSidekickDocumentGroup> = Schema.suspend(() => Schema.Struct({
  groupType: Schema.optional(Schema.String),
  personalizedDocument: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonDocument)),
})).annotate({ identifier: "EnterpriseTopazSidekickDocumentGroup" }) as any as Schema.Schema<EnterpriseTopazSidekickDocumentGroup>;

export interface EnterpriseTopazSidekickPersonalizedDocsCardProto {
  /** Document group. */
  documentGroup?: Array<EnterpriseTopazSidekickDocumentGroup>;
}

export const EnterpriseTopazSidekickPersonalizedDocsCardProto: Schema.Schema<EnterpriseTopazSidekickPersonalizedDocsCardProto> = Schema.suspend(() => Schema.Struct({
  documentGroup: Schema.optional(Schema.Array(EnterpriseTopazSidekickDocumentGroup)),
})).annotate({ identifier: "EnterpriseTopazSidekickPersonalizedDocsCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickPersonalizedDocsCardProto>;

export interface EnterpriseTopazSidekickShareMeetingDocsCardProto {
  /** Event. */
  event?: EnterpriseTopazSidekickAgendaEntry;
  /** Documents to share for the given meeting. */
  document?: Array<EnterpriseTopazSidekickCommonDocument>;
}

export const EnterpriseTopazSidekickShareMeetingDocsCardProto: Schema.Schema<EnterpriseTopazSidekickShareMeetingDocsCardProto> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  document: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonDocument)),
})).annotate({ identifier: "EnterpriseTopazSidekickShareMeetingDocsCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickShareMeetingDocsCardProto>;

export interface EnterpriseTopazSidekickGap {
  startTimeMs?: string;
  /** Localized time string in the format:(Locale CZ) 8:30 odp. */
  startTime?: string;
  endTimeMs?: string;
  /** Localized time string in the format:(Locale CZ) 8:30 odp. */
  endTime?: string;
  remainingTime?: string;
  /** Localized time string in the format: 1 hour 15 minutes */
  displayRemainingTime?: string;
}

export const EnterpriseTopazSidekickGap: Schema.Schema<EnterpriseTopazSidekickGap> = Schema.suspend(() => Schema.Struct({
  startTimeMs: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTimeMs: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  remainingTime: Schema.optional(Schema.String),
  displayRemainingTime: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickGap" }) as any as Schema.Schema<EnterpriseTopazSidekickGap>;

export interface EnterpriseTopazSidekickAgendaItem {
  meeting?: EnterpriseTopazSidekickAgendaEntry;
  conflictedGroup?: EnterpriseTopazSidekickConflictingEventsCardProto;
  gapBefore?: EnterpriseTopazSidekickGap;
}

export const EnterpriseTopazSidekickAgendaItem: Schema.Schema<EnterpriseTopazSidekickAgendaItem> = Schema.suspend(() => Schema.Struct({
  meeting: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  conflictedGroup: Schema.optional(EnterpriseTopazSidekickConflictingEventsCardProto),
  gapBefore: Schema.optional(EnterpriseTopazSidekickGap),
})).annotate({ identifier: "EnterpriseTopazSidekickAgendaItem" }) as any as Schema.Schema<EnterpriseTopazSidekickAgendaItem>;

export interface EnterpriseTopazSidekickAgendaGroupCardProtoContext {
  /** User friendly free text that describes the context of the card (e.g. "Next meeting with Bob"). This is largely only applicable when the card is generated from a query. */
  context?: string;
  /** Localized free text that describes the dates represented by the card. Currently, the card will only represent a single day. */
  date?: string;
  /** Represents restrictions applied to the events requested in the user's query. */
  eventsRestrict?: "NONE" | "NEXT_MEETING" | (string & {});
}

export const EnterpriseTopazSidekickAgendaGroupCardProtoContext: Schema.Schema<EnterpriseTopazSidekickAgendaGroupCardProtoContext> = Schema.suspend(() => Schema.Struct({
  context: Schema.optional(Schema.String),
  date: Schema.optional(Schema.String),
  eventsRestrict: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickAgendaGroupCardProtoContext" }) as any as Schema.Schema<EnterpriseTopazSidekickAgendaGroupCardProtoContext>;

export interface EnterpriseTopazSidekickAgendaGroupCardProto {
  currentAgendaItem?: EnterpriseTopazSidekickAgendaItem;
  agendaItem?: Array<EnterpriseTopazSidekickAgendaItem>;
  context?: EnterpriseTopazSidekickAgendaGroupCardProtoContext;
}

export const EnterpriseTopazSidekickAgendaGroupCardProto: Schema.Schema<EnterpriseTopazSidekickAgendaGroupCardProto> = Schema.suspend(() => Schema.Struct({
  currentAgendaItem: Schema.optional(EnterpriseTopazSidekickAgendaItem),
  agendaItem: Schema.optional(Schema.Array(EnterpriseTopazSidekickAgendaItem)),
  context: Schema.optional(EnterpriseTopazSidekickAgendaGroupCardProtoContext),
})).annotate({ identifier: "EnterpriseTopazSidekickAgendaGroupCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickAgendaGroupCardProto>;

export interface EnterpriseTopazSidekickRecentDocumentsCardProto {
  document?: Array<EnterpriseTopazSidekickCommonDocument>;
}

export const EnterpriseTopazSidekickRecentDocumentsCardProto: Schema.Schema<EnterpriseTopazSidekickRecentDocumentsCardProto> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonDocument)),
})).annotate({ identifier: "EnterpriseTopazSidekickRecentDocumentsCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickRecentDocumentsCardProto>;

export interface EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents {
  events?: Array<EnterpriseTopazSidekickAgendaEntry>;
}

export const EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents: Schema.Schema<EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents> = Schema.suspend(() => Schema.Struct({
  events: Schema.optional(Schema.Array(EnterpriseTopazSidekickAgendaEntry)),
})).annotate({ identifier: "EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents" }) as any as Schema.Schema<EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents>;

export interface EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry {
  category?: "UNKNOWN_DOCUMENT" | "ACTIONABLE" | "VIEWED" | "REPLIED" | "MENTION_VIEWED" | "MENTION_REPLIED" | "MENTION_NOT_VIEWED" | "SHARED_AND_VIEWED" | "SHARED_NOT_VIEWED" | "EDITED" | (string & {});
  document?: EnterpriseTopazSidekickCommonDocument;
  /** Reason this document was selected. */
  rationale?: string;
}

export const EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry: Schema.Schema<EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  document: Schema.optional(EnterpriseTopazSidekickCommonDocument),
  rationale: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry" }) as any as Schema.Schema<EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry>;

export interface EnterpriseTopazSidekickDocumentPerCategoryList {
  documents?: Array<EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry>;
  listType?: "UNKNOWN_LIST_TYPE" | "MENTIONS" | "SHARES" | "NEEDS_ATTENTION" | "VIEWS" | "EDITS" | (string & {});
  /** Description of the types of documents present in the list. */
  listTypeDescription?: string;
  /** Response message in case no documents are present in the card. */
  responseMessage?: string;
  /** Localized message explaining how the documents were derived (e.g. from the last 30 days activity). This field is optional. */
  helpMessage?: string;
}

export const EnterpriseTopazSidekickDocumentPerCategoryList: Schema.Schema<EnterpriseTopazSidekickDocumentPerCategoryList> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(EnterpriseTopazSidekickDocumentPerCategoryListDocumentPerCategoryListEntry)),
  listType: Schema.optional(Schema.String),
  listTypeDescription: Schema.optional(Schema.String),
  responseMessage: Schema.optional(Schema.String),
  helpMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickDocumentPerCategoryList" }) as any as Schema.Schema<EnterpriseTopazSidekickDocumentPerCategoryList>;

export interface EnterpriseTopazSidekickGetAndKeepAheadCardProto {
  declinedEvents?: EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents;
  mentionedDocuments?: EnterpriseTopazSidekickDocumentPerCategoryList;
  sharedDocuments?: EnterpriseTopazSidekickDocumentPerCategoryList;
}

export const EnterpriseTopazSidekickGetAndKeepAheadCardProto: Schema.Schema<EnterpriseTopazSidekickGetAndKeepAheadCardProto> = Schema.suspend(() => Schema.Struct({
  declinedEvents: Schema.optional(EnterpriseTopazSidekickGetAndKeepAheadCardProtoDeclinedEvents),
  mentionedDocuments: Schema.optional(EnterpriseTopazSidekickDocumentPerCategoryList),
  sharedDocuments: Schema.optional(EnterpriseTopazSidekickDocumentPerCategoryList),
})).annotate({ identifier: "EnterpriseTopazSidekickGetAndKeepAheadCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickGetAndKeepAheadCardProto>;

export interface EnterpriseTopazSidekickGenericAnswerCard {
  /** Title or header of the card. */
  title?: string;
  /** The answer. */
  answer?: string;
}

export const EnterpriseTopazSidekickGenericAnswerCard: Schema.Schema<EnterpriseTopazSidekickGenericAnswerCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  answer: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickGenericAnswerCard" }) as any as Schema.Schema<EnterpriseTopazSidekickGenericAnswerCard>;

export interface EnterpriseTopazSidekickPeopleDisambiguationCard {
  /** Candidate persons for the query. */
  person?: Array<EnterpriseTopazSidekickCommonPerson>;
}

export const EnterpriseTopazSidekickPeopleDisambiguationCard: Schema.Schema<EnterpriseTopazSidekickPeopleDisambiguationCard> = Schema.suspend(() => Schema.Struct({
  person: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonPerson)),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleDisambiguationCard" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleDisambiguationCard>;

export interface EnterpriseTopazSidekickPersonProfileCardRelatedPeople {
  /** Related people. */
  relatedPerson?: Array<EnterpriseTopazSidekickCommonPerson>;
  /** Relation type. */
  relation?: "UNKNOWN" | "MANAGER" | "DIRECT_REPORT" | (string & {});
}

export const EnterpriseTopazSidekickPersonProfileCardRelatedPeople: Schema.Schema<EnterpriseTopazSidekickPersonProfileCardRelatedPeople> = Schema.suspend(() => Schema.Struct({
  relatedPerson: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonPerson)),
  relation: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPersonProfileCardRelatedPeople" }) as any as Schema.Schema<EnterpriseTopazSidekickPersonProfileCardRelatedPeople>;

export interface EnterpriseTopazSidekickPersonProfileCard {
  /** The subject of the card. */
  subject?: EnterpriseTopazSidekickCommonPerson;
  relatedPeople?: Array<EnterpriseTopazSidekickPersonProfileCardRelatedPeople>;
}

export const EnterpriseTopazSidekickPersonProfileCard: Schema.Schema<EnterpriseTopazSidekickPersonProfileCard> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  relatedPeople: Schema.optional(Schema.Array(EnterpriseTopazSidekickPersonProfileCardRelatedPeople)),
})).annotate({ identifier: "EnterpriseTopazSidekickPersonProfileCard" }) as any as Schema.Schema<EnterpriseTopazSidekickPersonProfileCard>;

export interface EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader {
  /** The suggested title to display. This defaults to the user's query. */
  title?: string;
}

export const EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader: Schema.Schema<EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader>;

export interface EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson {
  /** The profile of this person. */
  person?: EnterpriseTopazSidekickCommonPerson;
  /** The query that can be used to produce an answer card with the same attribute, but for this person. */
  query?: string;
}

export const EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson: Schema.Schema<EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson> = Schema.suspend(() => Schema.Struct({
  person: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson>;

export interface EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo {
  /** The name that was extracted from the query. This may be in the form of the given name, last name, full name, LDAP, or email address. This name can be considered suitable for displaying to the user and can largely be considered to be normalized (e.g. "Bob's" -> "Bob"). */
  name?: string;
  /** A list of people that also matched the query. This list is not complete. */
  disambiguation?: Array<EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson>;
}

export const EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo: Schema.Schema<EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  disambiguation: Schema.optional(Schema.Array(EnterpriseTopazSidekickPeopleAnswerDisambiguationInfoDisambiguationPerson)),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo>;

export interface EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer {
  /** A localized label for the answer (e.g. "Cell phone" vs "Desk phone"). */
  label?: string;
  /** The free text answer. */
  answer?: string;
}

export const EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer: Schema.Schema<EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  answer: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer" }) as any as Schema.Schema<EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer>;

export interface EnterpriseTopazSidekickAnswerAnswerList {
  /** Answer type. */
  type?: "UNKNOWN" | "PERSON_ADDRESS" | "PERSON_BIRTHDAY" | "PERSON_DEPARTMENT" | "PERSON_DESK_LOCATION" | "PERSON_EMAIL" | "PERSON_JOB_TITLE" | "PERSON_PHONE" | (string & {});
  /** Answers that have a corresponding label. */
  labeledAnswer?: Array<EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer>;
}

export const EnterpriseTopazSidekickAnswerAnswerList: Schema.Schema<EnterpriseTopazSidekickAnswerAnswerList> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  labeledAnswer: Schema.optional(Schema.Array(EnterpriseTopazSidekickAnswerAnswerListLabeledAnswer)),
})).annotate({ identifier: "EnterpriseTopazSidekickAnswerAnswerList" }) as any as Schema.Schema<EnterpriseTopazSidekickAnswerAnswerList>;

export interface EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard {
  /** The response status. */
  responseStatus?: "UNKNOWN" | "SUCCESS" | "MISSING_PERSON" | "MISSING_DATA" | (string & {});
  /** The header to display for the card. */
  header?: EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader;
  /** The profile of the person that was the subject of the query. */
  subject?: EnterpriseTopazSidekickCommonPerson;
  /** List of answers. */
  answer?: Array<SafeHtmlProto>;
  /** Disambiguation information. */
  disambiguationInfo?: EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo;
  /** List of answers. */
  answerText?: EnterpriseTopazSidekickAnswerAnswerList;
  /** Localized user friendly message to display to the user in the case of missing data or an error. */
  statusMessage?: string;
}

export const EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard: Schema.Schema<EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard> = Schema.suspend(() => Schema.Struct({
  responseStatus: Schema.optional(Schema.String),
  header: Schema.optional(EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader),
  subject: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  answer: Schema.optional(Schema.Array(SafeHtmlProto)),
  disambiguationInfo: Schema.optional(EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo),
  answerText: Schema.optional(EnterpriseTopazSidekickAnswerAnswerList),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard>;

export interface EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard {
  /** The response status. */
  responseStatus?: "UNKNOWN" | "SUCCESS" | "MISSING_PERSON" | "MISSING_DATA" | (string & {});
  /** The header to display for the card. */
  header?: EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader;
  /** The profile of the person that was the subject of the query. */
  subject?: EnterpriseTopazSidekickCommonPerson;
  /** A list of people that are related to the query subject. */
  relatedPeople?: Array<EnterpriseTopazSidekickCommonPerson>;
  /** Defines the type of relation the list of people have with the subject of the card. */
  relationType?: "UNKNOWN" | "DIRECT_REPORTS" | "MANAGER" | "PEERS" | (string & {});
  /** Disambiguation information. */
  disambiguationInfo?: EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo;
  /** Localized user friendly message to display to the user in the case of missing data or an error. */
  statusMessage?: string;
}

export const EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard: Schema.Schema<EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard> = Schema.suspend(() => Schema.Struct({
  responseStatus: Schema.optional(Schema.String),
  header: Schema.optional(EnterpriseTopazSidekickPeopleAnswerPeopleAnswerCardHeader),
  subject: Schema.optional(EnterpriseTopazSidekickCommonPerson),
  relatedPeople: Schema.optional(Schema.Array(EnterpriseTopazSidekickCommonPerson)),
  relationType: Schema.optional(Schema.String),
  disambiguationInfo: Schema.optional(EnterpriseTopazSidekickPeopleAnswerDisambiguationInfo),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard" }) as any as Schema.Schema<EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard>;

export interface EnterpriseTopazSidekickAnswerSuggestedQueryCategory {
  /** The query list category. */
  category?: "UNKNOWN" | "CALENDAR" | "DOCUMENT" | "PEOPLE" | (string & {});
  /** List of suggested queries to show the user. */
  query?: Array<string>;
  /** Whether this category is enabled. */
  isEnabled?: boolean;
}

export const EnterpriseTopazSidekickAnswerSuggestedQueryCategory: Schema.Schema<EnterpriseTopazSidekickAnswerSuggestedQueryCategory> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  query: Schema.optional(Schema.Array(Schema.String)),
  isEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseTopazSidekickAnswerSuggestedQueryCategory" }) as any as Schema.Schema<EnterpriseTopazSidekickAnswerSuggestedQueryCategory>;

export interface EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard {
  /** A list of queries to suggest. */
  suggestedQueryCategory?: Array<EnterpriseTopazSidekickAnswerSuggestedQueryCategory>;
}

export const EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard: Schema.Schema<EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard> = Schema.suspend(() => Schema.Struct({
  suggestedQueryCategory: Schema.optional(Schema.Array(EnterpriseTopazSidekickAnswerSuggestedQueryCategory)),
})).annotate({ identifier: "EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard" }) as any as Schema.Schema<EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard>;

export interface Context {
  /** [Required] Type of the card (homepage, Answer or RHS). */
  type?: Array<"UNKNOWN_CARD_TYPE" | "HOMEPAGE_CARD" | "ANSWER_CARD" | "RHS_CARD" | (string & {})>;
  /** [Required only for Answer and RHS cards - will be ignored for Homepage] cards. It's the exact case-insensitive queries that will trigger the Answer or RHS card. */
  query?: Array<string>;
  /** [Optional] Date (in seconds since epoch) when the card should start being shown. If missing, start_date_sec will be Jan 1st, 1970 UTC. */
  startDateSec?: string;
  /** [Optional] Date (in seconds since epoch) when the card should stop being shown. If missing, end_date_sec will be set to Jan 1st, 2100. */
  endDateSec?: string;
  /** [Optional] Start time in seconds, within a day, when the card should be shown if it's within [start_date_sec, end_date_sec]. If 0, the card will be shown from 12:00am on. */
  startDayOffsetSec?: string;
  /** [Optional] End time in seconds, within a day, when the card should stop being shown if it's within [start_date_sec, end_date_sec]. If missing, this is set to 86400 (24 hours x 3600 sec/hour), i.e., midnight next day. */
  endDayOffsetSec?: string;
  /** [Optional] Day of week when the card should be shown, where 0 is Monday. */
  dayOfWeek?: Array<number>;
  /** [Optional] The locales for which the card should be triggered (e.g., en_US and en_CA). If missing, the card is going to show to clients regardless of their locale. */
  locale?: Array<string>;
  /** [Optional] Text-free locations where the card should be shown. This is expected to match the user's location in focus. If no location is specified, the card will be shown for any location. */
  location?: Array<string>;
  /** [Optional] Surface where the card should be shown in. If missing, the card will be shown in any surface. */
  surface?: Array<"UNKNOWN_SURFACE" | "DESKTOP" | "ANDROID" | "IOS" | "MOBILE" | "ANY" | (string & {})>;
  /** [Optional] App where the card should be shown. If missing, the card will be shown in TOPAZ. */
  app?: Array<"UNKNOWN_APP" | "TOPAZ" | "MOMA" | (string & {})>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.Array(Schema.String)),
  query: Schema.optional(Schema.Array(Schema.String)),
  startDateSec: Schema.optional(Schema.String),
  endDateSec: Schema.optional(Schema.String),
  startDayOffsetSec: Schema.optional(Schema.String),
  endDayOffsetSec: Schema.optional(Schema.String),
  dayOfWeek: Schema.optional(Schema.Array(Schema.Number)),
  locale: Schema.optional(Schema.Array(Schema.String)),
  location: Schema.optional(Schema.Array(Schema.String)),
  surface: Schema.optional(Schema.Array(Schema.String)),
  app: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

export interface BackgroundColoredText {
  /** [Required] The text to display. */
  text?: string;
  /** [Optional] Color of the background. The text color can change depending on the selected background color, and the client does not have control over this. If missing, the background will be WHITE. */
  backgroundColor?: "UNKNOWN_COLOR" | "WHITE" | "YELLOW" | "ORANGE" | "GREEN" | "BLUE" | "GREY" | (string & {});
}

export const BackgroundColoredText: Schema.Schema<BackgroundColoredText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  backgroundColor: Schema.optional(Schema.String),
})).annotate({ identifier: "BackgroundColoredText" }) as any as Schema.Schema<BackgroundColoredText>;

export interface Action {
  /** [Required] Title of the action. */
  title?: string;
  /** [Optional] Url of the action. */
  url?: string;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface Content {
  /** [Optional] Title of the card. */
  title?: BackgroundColoredText;
  /** [Optional] Subtitle of the card. */
  subtitle?: BackgroundColoredText;
  /** [Optional] Description of the card. */
  description?: SafeHtmlProto;
  /** [Optional] Actions for this card. */
  actions?: Array<Action>;
}

export const Content: Schema.Schema<Content> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(BackgroundColoredText),
  subtitle: Schema.optional(BackgroundColoredText),
  description: Schema.optional(SafeHtmlProto),
  actions: Schema.optional(Schema.Array(Action)),
})).annotate({ identifier: "Content" }) as any as Schema.Schema<Content>;

export interface ThirdPartyGenericCard {
  /** Unique identifier for the card. */
  cardId?: string;
  /** Category that the card belongs to. */
  category?: string;
  /** Priority of the card, where 0 is the highest priority. */
  priority?: number;
  /** Whether the card can be dismissed. */
  isDismissible?: boolean;
  /** [Required] Context where the card should be triggered. */
  context?: Context;
  /** [Required] Card content. */
  content?: Content;
}

export const ThirdPartyGenericCard: Schema.Schema<ThirdPartyGenericCard> = Schema.suspend(() => Schema.Struct({
  cardId: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  isDismissible: Schema.optional(Schema.Boolean),
  context: Schema.optional(Context),
  content: Schema.optional(Content),
})).annotate({ identifier: "ThirdPartyGenericCard" }) as any as Schema.Schema<ThirdPartyGenericCard>;

export interface SafeUrlProto {
  /** IMPORTANT: Never set or read this field, even from tests, it is private. See documentation at the top of .proto file for programming language packages with which to create or read this message. */
  privateDoNotAccessOrElseSafeUrlWrappedValue?: string;
}

export const SafeUrlProto: Schema.Schema<SafeUrlProto> = Schema.suspend(() => Schema.Struct({
  privateDoNotAccessOrElseSafeUrlWrappedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "SafeUrlProto" }) as any as Schema.Schema<SafeUrlProto>;

export interface EnterpriseTopazFrontendTeamsPersonCorePhoneNumber {
  /** Phone number in no particular format (as comes from the Focus profile). */
  phoneNumber?: string;
  /** Phone number URL */
  phoneUrl?: SafeUrlProto;
  type?: "UNKNOWN" | "MOBILE" | "OFFICE" | "OTHER" | (string & {});
}

export const EnterpriseTopazFrontendTeamsPersonCorePhoneNumber: Schema.Schema<EnterpriseTopazFrontendTeamsPersonCorePhoneNumber> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  phoneUrl: Schema.optional(SafeUrlProto),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseTopazFrontendTeamsPersonCorePhoneNumber" }) as any as Schema.Schema<EnterpriseTopazFrontendTeamsPersonCorePhoneNumber>;

export interface EnterpriseTopazFrontendTeamsLink {
  /** The identifying link type */
  type?: string;
  url?: SafeUrlProto;
}

export const EnterpriseTopazFrontendTeamsLink: Schema.Schema<EnterpriseTopazFrontendTeamsLink> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  url: Schema.optional(SafeUrlProto),
})).annotate({ identifier: "EnterpriseTopazFrontendTeamsLink" }) as any as Schema.Schema<EnterpriseTopazFrontendTeamsLink>;

export interface MapTile {
  /** Map tile x coordinate */
  tileX?: number;
  /** Map tile y coordinate */
  tileY?: number;
  /** URL to an image file containing an office layout of the user's location for their organization, if one is available. For google.com, this image is from Corp Campus Maps. */
  imageUrl?: SafeUrlProto;
}

export const MapTile: Schema.Schema<MapTile> = Schema.suspend(() => Schema.Struct({
  tileX: Schema.optional(Schema.Number),
  tileY: Schema.optional(Schema.Number),
  imageUrl: Schema.optional(SafeUrlProto),
})).annotate({ identifier: "MapTile" }) as any as Schema.Schema<MapTile>;

export interface MapInfo {
  /** Latitude in degrees */
  lat?: number;
  /** Longitude in degrees */
  long?: number;
  /** URL to a view of a map centered on the user's work location in Campus Maps (for google.com) or Google Maps (external). */
  locationUrl?: SafeUrlProto;
  /** MapTiles for the area around a user's work location */
  mapTile?: Array<MapTile>;
  /** The zoom level of the map. A constant zoom value of 18 is used for now to match the zoom of the map shown on a Moma Teams Profile page */
  zoom?: number;
}

export const MapInfo: Schema.Schema<MapInfo> = Schema.suspend(() => Schema.Struct({
  lat: Schema.optional(Schema.Number),
  long: Schema.optional(Schema.Number),
  locationUrl: Schema.optional(SafeUrlProto),
  mapTile: Schema.optional(Schema.Array(MapTile)),
  zoom: Schema.optional(Schema.Number),
})).annotate({ identifier: "MapInfo" }) as any as Schema.Schema<MapInfo>;

export interface PersonCore {
  /** The person's obfuscated Gaia ID. */
  personId?: string;
  /** Human-readable Unicode display name. */
  name?: string;
  /** External ID of type "login_id" for the profile. For google.com this is the username/LDAP. */
  username?: string;
  /** Person's employee number (external ID of type "organization") For google.com this is the badge number (e.g. 2 for Larry Page). */
  employeeId?: string;
  /** Profile owner's job title (e.g. "Software Engineer"). For google.com this is the Workday preferred job title. */
  jobTitle?: string;
  /** The person's Organization department, e.g. "People Operations". For google.com this is usually called "area". */
  department?: string;
  /** Person's cost center as a string, e.g. "926: Googler Apps". */
  costCenter?: string;
  /** E-mail addresses of the person. The primary or preferred email should be first. */
  emails?: Array<string>;
  phoneNumbers?: Array<EnterpriseTopazFrontendTeamsPersonCorePhoneNumber>;
  /** Detailed desk location within the company. For google.com this is the desk location code (e.g. "DE-MUC-ARP-6T2-6T2C0C") if the person has a desk. */
  location?: string;
  /** Office/building identifier within the company. For google.com this is the office code (e.g. "DE-MUC-ARP"). */
  officeLocation?: string;
  /** Postal address of office/building. */
  postalAddress?: string;
  /** Person photo. */
  photoUrl?: SafeUrlProto;
  /** Person birthday. */
  birthday?: Cloudsearch_Date;
  /** Instructions for how to address this person (e.g. custom pronouns). For google.com this is a set of pronouns from a defined list of options. */
  addressMeAs?: string;
  /** Full-time equivalent (in ‰) (e.g. 800 for a person who's working 80%). */
  ftePermille?: string;
  /** The URL to open the profile owner's primary calendar. */
  calendarUrl?: SafeUrlProto;
  /** The URL to start a chat conversation with the profile owner. For google.com this is a Hangouts URL. */
  chatUrl?: SafeUrlProto;
  /** The profile owner's management chain from top to bottom, where managers[0] is the CEO, manager[N-2] is the person's manager's manager and managers[N-1] is the person's direct manager. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  managers?: Array<PersonCore>;
  /** The profile owner's direct dotted line managers in no particular order. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  dottedLineManagers?: Array<PersonCore>;
  /** The sum of all profile owner's reports and their own full-time-equivalents in ‰ (e.g. 1800 if one report is working 80% and profile owner 100%). */
  totalFteCount?: string;
  /** Total count of the profile owner's direct reports. */
  totalDirectReportsCount?: number;
  /** A subset of the profile owner's direct reports. The number of entities here may be less than total_direct_reports_count, because typically ProfileResponse does not include all the person's reports, if there are too many to retrieve efficiently. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  directReports?: Array<PersonCore>;
  /** Total count of the profile owner's dotted-line reports. */
  totalDlrCount?: number;
  /** A subset of the profile owner's dotted-line reports. The number of entities here may be less than total_dlr_count. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  dottedLineReports?: Array<PersonCore>;
  /** The profile owner's admins in no particular order. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  admins?: Array<PersonCore>;
  /** People the profile owner is an admin to. Note that not all fields of these PersonCores will be set, in particular, relationships will be empty. */
  adminTo?: Array<PersonCore>;
  gmailUrl?: string;
  /** Custom links the profile owner has added. */
  links?: Array<EnterpriseTopazFrontendTeamsLink>;
  /** Custom mission statement the profile owner has added. */
  mission?: string;
  /** Custom keywords the domain admin has added. */
  keywords?: Record<string, string>;
  /** A fingerprint used by PAPI to reliably determine if a resource has changed Externally it is used as part of the etag. */
  fingerprint?: string;
  geoLocation?: MapInfo;
  availabilityStatus?: "UNKNOWN" | "OUT_OF_OFFICE" | "OUTSIDE_WORKING_HOURS" | "AVAILABLE" | (string & {});
  waldoComeBackTime?: string;
  /** List of keys to use from the map 'keywords'. */
  keywordTypes?: Array<string>;
}

export const PersonCore: Schema.Schema<PersonCore> = Schema.suspend(() => Schema.Struct({
  personId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  employeeId: Schema.optional(Schema.String),
  jobTitle: Schema.optional(Schema.String),
  department: Schema.optional(Schema.String),
  costCenter: Schema.optional(Schema.String),
  emails: Schema.optional(Schema.Array(Schema.String)),
  phoneNumbers: Schema.optional(Schema.Array(EnterpriseTopazFrontendTeamsPersonCorePhoneNumber)),
  location: Schema.optional(Schema.String),
  officeLocation: Schema.optional(Schema.String),
  postalAddress: Schema.optional(Schema.String),
  photoUrl: Schema.optional(SafeUrlProto),
  birthday: Schema.optional(Cloudsearch_Date),
  addressMeAs: Schema.optional(Schema.String),
  ftePermille: Schema.optional(Schema.String),
  calendarUrl: Schema.optional(SafeUrlProto),
  chatUrl: Schema.optional(SafeUrlProto),
  managers: Schema.optional(Schema.Array(PersonCore)),
  dottedLineManagers: Schema.optional(Schema.Array(PersonCore)),
  totalFteCount: Schema.optional(Schema.String),
  totalDirectReportsCount: Schema.optional(Schema.Number),
  directReports: Schema.optional(Schema.Array(PersonCore)),
  totalDlrCount: Schema.optional(Schema.Number),
  dottedLineReports: Schema.optional(Schema.Array(PersonCore)),
  admins: Schema.optional(Schema.Array(PersonCore)),
  adminTo: Schema.optional(Schema.Array(PersonCore)),
  gmailUrl: Schema.optional(Schema.String),
  links: Schema.optional(Schema.Array(EnterpriseTopazFrontendTeamsLink)),
  mission: Schema.optional(Schema.String),
  keywords: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  fingerprint: Schema.optional(Schema.String),
  geoLocation: Schema.optional(MapInfo),
  availabilityStatus: Schema.optional(Schema.String),
  waldoComeBackTime: Schema.optional(Schema.String),
  keywordTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PersonCore" }) as any as Schema.Schema<PersonCore>;

export interface PeoplePromotionCard {
  people?: Array<PersonCore>;
}

export const PeoplePromotionCard: Schema.Schema<PeoplePromotionCard> = Schema.suspend(() => Schema.Struct({
  people: Schema.optional(Schema.Array(PersonCore)),
})).annotate({ identifier: "PeoplePromotionCard" }) as any as Schema.Schema<PeoplePromotionCard>;

export interface EnterpriseTopazSidekickAssistCardProto {
  /** Card metadata such as chronology and render mode of the card. */
  cardMetadata?: EnterpriseTopazSidekickCardMetadata;
  /** Card type. */
  cardType?: "UNKNOWN_TYPE" | "AGENDA" | "CHANGELISTS" | "CONFLICTING_MEETINGS" | "CREATE_NOTES_FOR_MEETING" | "CREATE_NOTES_FOR_MEETING_REQUEST" | "CUSTOMER_NEWS" | "FIND_MEETING_TIME" | "NEXT_MEETING" | "PERSONALIZED_DOCS" | "TRENDING_DOCS" | "UPCOMING_TRIP" | "SUMMARY" | "MEETINGS" | "HOMEPAGE" | "SHARE_MEETING_DOCS" | "DISCOVER_PEOPLE" | "HOMEPAGE_V3" | "AGENDA_GROUP" | "WORK_IN_PROGRESS" | "GET_AND_KEEP_AHEAD" | "GENERIC_ANSWER_CARD" | "THIRD_PARTY_ANSWER_CARD" | "DOMAIN_TRENDING_DOCS" | "TEAM_TRENDING_DOCS" | "DOCUMENT_LIST_ANSWER_CARD" | "SUGGESTED_QUERY_ANSWER_CARD" | "PERSON_ANSWER_CARD" | "RELATED_PEOPLE_ANSWER_CARD" | "PERSON_KNOWLEDGE_CARD" | "PEOPLE_SEARCH_PROMOTION_CARD" | (string & {});
  /** Conflicting events card. */
  conflictingMeetingsCard?: EnterpriseTopazSidekickConflictingEventsCardProto;
  /** Find meeting time card. */
  findMeetingTimeCard?: EnterpriseTopazSidekickFindMeetingTimeCardProto;
  /** Request for meeting notes card. */
  meetingNotesCardRequest?: EnterpriseTopazSidekickMeetingNotesCardRequest;
  /** Meeting notes card. */
  meetingNotesCard?: EnterpriseTopazSidekickMeetingNotesCardProto;
  /** Card with recommended documents for the user. */
  personalizedDocsCard?: EnterpriseTopazSidekickPersonalizedDocsCardProto;
  /** Meeting card. */
  meeting?: EnterpriseTopazSidekickAgendaEntry;
  /** Sahre meeting docs card. */
  shareMeetingDocsCard?: EnterpriseTopazSidekickShareMeetingDocsCardProto;
  /** Agenda group card. */
  agendaGroupCardProto?: EnterpriseTopazSidekickAgendaGroupCardProto;
  /** Work In Progress card. */
  workInProgressCardProto?: EnterpriseTopazSidekickRecentDocumentsCardProto;
  /** Get and keep ahead card. */
  getAndKeepAheadCard?: EnterpriseTopazSidekickGetAndKeepAheadCardProto;
  /** Generic answer card. */
  genericAnswerCard?: EnterpriseTopazSidekickGenericAnswerCard;
  /** The people disambiguation card. */
  peopleDisambiguationCard?: EnterpriseTopazSidekickPeopleDisambiguationCard;
  /** Full profile card. */
  personProfileCard?: EnterpriseTopazSidekickPersonProfileCard;
  /** Documents with mentions. */
  documentsWithMentions?: EnterpriseTopazSidekickDocumentPerCategoryList;
  /** Shared documents. */
  sharedDocuments?: EnterpriseTopazSidekickDocumentPerCategoryList;
  /** Answer card for documents that are applicable to the current query. */
  documentListCard?: EnterpriseTopazSidekickDocumentPerCategoryList;
  /** Answer card that represents a single person. */
  personAnswerCard?: EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard;
  /** Answer card that represents a list of people related to a person. */
  relatedPeopleAnswerCard?: EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard;
  /** Answer card for what natural language queries the user can ask. */
  suggestedQueryAnswerCard?: EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard;
  /** Third party answer cards. */
  thirdPartyAnswerCard?: ThirdPartyGenericCard;
  /** People Search promotion card. */
  peoplePromotionCard?: PeoplePromotionCard;
}

export const EnterpriseTopazSidekickAssistCardProto: Schema.Schema<EnterpriseTopazSidekickAssistCardProto> = Schema.suspend(() => Schema.Struct({
  cardMetadata: Schema.optional(EnterpriseTopazSidekickCardMetadata),
  cardType: Schema.optional(Schema.String),
  conflictingMeetingsCard: Schema.optional(EnterpriseTopazSidekickConflictingEventsCardProto),
  findMeetingTimeCard: Schema.optional(EnterpriseTopazSidekickFindMeetingTimeCardProto),
  meetingNotesCardRequest: Schema.optional(EnterpriseTopazSidekickMeetingNotesCardRequest),
  meetingNotesCard: Schema.optional(EnterpriseTopazSidekickMeetingNotesCardProto),
  personalizedDocsCard: Schema.optional(EnterpriseTopazSidekickPersonalizedDocsCardProto),
  meeting: Schema.optional(EnterpriseTopazSidekickAgendaEntry),
  shareMeetingDocsCard: Schema.optional(EnterpriseTopazSidekickShareMeetingDocsCardProto),
  agendaGroupCardProto: Schema.optional(EnterpriseTopazSidekickAgendaGroupCardProto),
  workInProgressCardProto: Schema.optional(EnterpriseTopazSidekickRecentDocumentsCardProto),
  getAndKeepAheadCard: Schema.optional(EnterpriseTopazSidekickGetAndKeepAheadCardProto),
  genericAnswerCard: Schema.optional(EnterpriseTopazSidekickGenericAnswerCard),
  peopleDisambiguationCard: Schema.optional(EnterpriseTopazSidekickPeopleDisambiguationCard),
  personProfileCard: Schema.optional(EnterpriseTopazSidekickPersonProfileCard),
  documentsWithMentions: Schema.optional(EnterpriseTopazSidekickDocumentPerCategoryList),
  sharedDocuments: Schema.optional(EnterpriseTopazSidekickDocumentPerCategoryList),
  documentListCard: Schema.optional(EnterpriseTopazSidekickDocumentPerCategoryList),
  personAnswerCard: Schema.optional(EnterpriseTopazSidekickPeopleAnswerPersonAnswerCard),
  relatedPeopleAnswerCard: Schema.optional(EnterpriseTopazSidekickPeopleAnswerRelatedPeopleAnswerCard),
  suggestedQueryAnswerCard: Schema.optional(EnterpriseTopazSidekickAnswerSuggestedQueryAnswerCard),
  thirdPartyAnswerCard: Schema.optional(ThirdPartyGenericCard),
  peoplePromotionCard: Schema.optional(PeoplePromotionCard),
})).annotate({ identifier: "EnterpriseTopazSidekickAssistCardProto" }) as any as Schema.Schema<EnterpriseTopazSidekickAssistCardProto>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsLroRequest {
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

export const ListOperationsLroRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}/lro" }),
  svc,
) as unknown as Schema.Schema<ListOperationsLroRequest>;

export type ListOperationsLroResponse = ListOperationsResponse;
export const ListOperationsLroResponse = ListOperationsResponse;

export type ListOperationsLroError = CommonErrors;

export const listOperationsLro = API.makePaginated(() => ({
  input: ListOperationsLroRequest,
  output: ListOperationsLroResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Checks whether an item is accessible by specified principal. Principal must be a user; groups and domain values aren't supported. **Note:** This API requires an admin account to execute. */
export interface CheckAccessDebugDatasourcesItemsRequest {
  /** Item name, format: datasources/{source_id}/items/{item_id} */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
  /** Request body */
  body?: Principal;
}

export const CheckAccessDebugDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
  body: Schema.optional(Principal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/debug/datasources/{datasourcesId}/items/{itemsId}:checkAccess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckAccessDebugDatasourcesItemsRequest>;

export type CheckAccessDebugDatasourcesItemsResponse = CheckAccessResponse;
export const CheckAccessDebugDatasourcesItemsResponse = CheckAccessResponse;

export type CheckAccessDebugDatasourcesItemsError = CommonErrors;

export const checkAccessDebugDatasourcesItems: API.OperationMethod<CheckAccessDebugDatasourcesItemsRequest, CheckAccessDebugDatasourcesItemsResponse, CheckAccessDebugDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckAccessDebugDatasourcesItemsRequest,
  output: CheckAccessDebugDatasourcesItemsResponse,
  errors: [],
}));

/** Fetches the item whose viewUrl exactly matches that of the URL provided in the request. **Note:** This API requires an admin account to execute. */
export interface SearchByViewUrlDebugDatasourcesItemsRequest {
  /** Source name, format: datasources/{source_id} */
  name: string;
  /** Request body */
  body?: SearchItemsByViewUrlRequest;
}

export const SearchByViewUrlDebugDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SearchItemsByViewUrlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/debug/datasources/{datasourcesId}/items:searchByViewUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchByViewUrlDebugDatasourcesItemsRequest>;

export type SearchByViewUrlDebugDatasourcesItemsResponse = SearchItemsByViewUrlResponse;
export const SearchByViewUrlDebugDatasourcesItemsResponse = SearchItemsByViewUrlResponse;

export type SearchByViewUrlDebugDatasourcesItemsError = CommonErrors;

export const searchByViewUrlDebugDatasourcesItems: API.OperationMethod<SearchByViewUrlDebugDatasourcesItemsRequest, SearchByViewUrlDebugDatasourcesItemsResponse, SearchByViewUrlDebugDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchByViewUrlDebugDatasourcesItemsRequest,
  output: SearchByViewUrlDebugDatasourcesItemsResponse,
  errors: [],
}));

/** List all unmapped identities for a specific item. **Note:** This API requires an admin account to execute. */
export interface ListDebugDatasourcesItemsUnmappedidsRequest {
  /** The name of the item, in the following format: datasources/{source_id}/items/{ID} */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Maximum number of items to fetch in a request. Defaults to 100. */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListDebugDatasourcesItemsUnmappedidsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/debug/datasources/{datasourcesId}/items/{itemsId}/unmappedids" }),
  svc,
) as unknown as Schema.Schema<ListDebugDatasourcesItemsUnmappedidsRequest>;

export type ListDebugDatasourcesItemsUnmappedidsResponse = ListUnmappedIdentitiesResponse;
export const ListDebugDatasourcesItemsUnmappedidsResponse = ListUnmappedIdentitiesResponse;

export type ListDebugDatasourcesItemsUnmappedidsError = CommonErrors;

export const listDebugDatasourcesItemsUnmappedids = API.makePaginated(() => ({
  input: ListDebugDatasourcesItemsUnmappedidsRequest,
  output: ListDebugDatasourcesItemsUnmappedidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists unmapped user identities for an identity source. **Note:** This API requires an admin account to execute. */
export interface ListDebugIdentitysourcesUnmappedidsRequest {
  /** The name of the identity source, in the following format: identitysources/{source_id} */
  parent: string;
  /** Limit users selection to this status. */
  resolutionStatusCode?: "CODE_UNSPECIFIED" | "NOT_FOUND" | "IDENTITY_SOURCE_NOT_FOUND" | "IDENTITY_SOURCE_MISCONFIGURED" | "TOO_MANY_MAPPINGS_FOUND" | "INTERNAL_ERROR" | (string & {});
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Maximum number of items to fetch in a request. Defaults to 100. */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListDebugIdentitysourcesUnmappedidsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resolutionStatusCode: Schema.optional(Schema.String).pipe(T.HttpQuery("resolutionStatusCode")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/debug/identitysources/{identitysourcesId}/unmappedids" }),
  svc,
) as unknown as Schema.Schema<ListDebugIdentitysourcesUnmappedidsRequest>;

export type ListDebugIdentitysourcesUnmappedidsResponse = ListUnmappedIdentitiesResponse;
export const ListDebugIdentitysourcesUnmappedidsResponse = ListUnmappedIdentitiesResponse;

export type ListDebugIdentitysourcesUnmappedidsError = CommonErrors;

export const listDebugIdentitysourcesUnmappedids = API.makePaginated(() => ({
  input: ListDebugIdentitysourcesUnmappedidsRequest,
  output: ListDebugIdentitysourcesUnmappedidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists names of items associated with an unmapped identity. **Note:** This API requires an admin account to execute. */
export interface ListForunmappedidentityDebugIdentitysourcesItemsRequest {
  /** The name of the identity source, in the following format: identitysources/{source_id}} */
  parent: string;
  userResourceName?: string;
  groupResourceName?: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Maximum number of items to fetch in a request. Defaults to 100. */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListForunmappedidentityDebugIdentitysourcesItemsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  userResourceName: Schema.optional(Schema.String).pipe(T.HttpQuery("userResourceName")),
  groupResourceName: Schema.optional(Schema.String).pipe(T.HttpQuery("groupResourceName")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/debug/identitysources/{identitysourcesId}/items:forunmappedidentity" }),
  svc,
) as unknown as Schema.Schema<ListForunmappedidentityDebugIdentitysourcesItemsRequest>;

export type ListForunmappedidentityDebugIdentitysourcesItemsResponse = ListItemNamesForUnmappedIdentityResponse;
export const ListForunmappedidentityDebugIdentitysourcesItemsResponse = ListItemNamesForUnmappedIdentityResponse;

export type ListForunmappedidentityDebugIdentitysourcesItemsError = CommonErrors;

export const listForunmappedidentityDebugIdentitysourcesItems = API.makePaginated(() => ({
  input: ListForunmappedidentityDebugIdentitysourcesItemsRequest,
  output: ListForunmappedidentityDebugIdentitysourcesItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get customer settings. **Note:** This API requires an admin account to execute. */
export interface GetCustomerSettingsRequest {
}

export const GetCustomerSettingsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/settings/customer" }),
  svc,
) as unknown as Schema.Schema<GetCustomerSettingsRequest>;

export type GetCustomerSettingsResponse = CustomerSettings;
export const GetCustomerSettingsResponse = CustomerSettings;

export type GetCustomerSettingsError = CommonErrors;

export const getCustomerSettings: API.OperationMethod<GetCustomerSettingsRequest, GetCustomerSettingsResponse, GetCustomerSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomerSettingsRequest,
  output: GetCustomerSettingsResponse,
  errors: [],
}));

/** Update customer settings. **Note:** This API requires an admin account to execute. */
export interface UpdateCustomerSettingsRequest {
  /** Update mask to control which fields get updated. If you specify a field in the update_mask but don't specify its value here, that field will be cleared. If the mask is not present or empty, all fields will be updated. Currently supported field paths: vpc_settings and audit_logging_settings */
  updateMask?: string;
  /** Request body */
  body?: CustomerSettings;
}

export const UpdateCustomerSettingsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CustomerSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/settings/customer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCustomerSettingsRequest>;

export type UpdateCustomerSettingsResponse = Operation;
export const UpdateCustomerSettingsResponse = Operation;

export type UpdateCustomerSettingsError = CommonErrors;

export const updateCustomerSettings: API.OperationMethod<UpdateCustomerSettingsRequest, UpdateCustomerSettingsResponse, UpdateCustomerSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCustomerSettingsRequest,
  output: UpdateCustomerSettingsResponse,
  errors: [],
}));

/** Lists all search applications. **Note:** This API requires an admin account to execute. */
export interface ListSettingsSearchapplicationsRequest {
  /** The next_page_token value returned from a previous List request, if any. The default value is 10 */
  pageToken?: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListSettingsSearchapplicationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/settings/searchapplications" }),
  svc,
) as unknown as Schema.Schema<ListSettingsSearchapplicationsRequest>;

export type ListSettingsSearchapplicationsResponse = ListSearchApplicationsResponse;
export const ListSettingsSearchapplicationsResponse = ListSearchApplicationsResponse;

export type ListSettingsSearchapplicationsError = CommonErrors;

export const listSettingsSearchapplications = API.makePaginated(() => ({
  input: ListSettingsSearchapplicationsRequest,
  output: ListSettingsSearchapplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified search application. **Note:** This API requires an admin account to execute. */
export interface GetSettingsSearchapplicationsRequest {
  /** The name of the search application. Format: searchapplications/{application_id}. */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const GetSettingsSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/settings/searchapplications/{searchapplicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetSettingsSearchapplicationsRequest>;

export type GetSettingsSearchapplicationsResponse = SearchApplication;
export const GetSettingsSearchapplicationsResponse = SearchApplication;

export type GetSettingsSearchapplicationsError = CommonErrors;

export const getSettingsSearchapplications: API.OperationMethod<GetSettingsSearchapplicationsRequest, GetSettingsSearchapplicationsResponse, GetSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsSearchapplicationsRequest,
  output: GetSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Creates a search application. **Note:** This API requires an admin account to execute. */
export interface CreateSettingsSearchapplicationsRequest {
  /** Request body */
  body?: SearchApplication;
}

export const CreateSettingsSearchapplicationsRequest = Schema.Struct({
  body: Schema.optional(SearchApplication).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/settings/searchapplications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSettingsSearchapplicationsRequest>;

export type CreateSettingsSearchapplicationsResponse = Operation;
export const CreateSettingsSearchapplicationsResponse = Operation;

export type CreateSettingsSearchapplicationsError = CommonErrors;

export const createSettingsSearchapplications: API.OperationMethod<CreateSettingsSearchapplicationsRequest, CreateSettingsSearchapplicationsResponse, CreateSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSettingsSearchapplicationsRequest,
  output: CreateSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Updates a search application. **Note:** This API requires an admin account to execute. */
export interface UpdateSettingsSearchapplicationsRequest {
  /** The name of the Search Application. Format: searchapplications/{application_id}. */
  name: string;
  /** Only applies to [`settings.searchapplications.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.searchapplications/patch). Update mask to control which fields to update. Example field paths: `search_application.name`, `search_application.displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the `search_application`, then that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: SearchApplication;
}

export const UpdateSettingsSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SearchApplication).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/settings/searchapplications/{searchapplicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsSearchapplicationsRequest>;

export type UpdateSettingsSearchapplicationsResponse = Operation;
export const UpdateSettingsSearchapplicationsResponse = Operation;

export type UpdateSettingsSearchapplicationsError = CommonErrors;

export const updateSettingsSearchapplications: API.OperationMethod<UpdateSettingsSearchapplicationsRequest, UpdateSettingsSearchapplicationsResponse, UpdateSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsSearchapplicationsRequest,
  output: UpdateSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Updates a search application. **Note:** This API requires an admin account to execute. */
export interface PatchSettingsSearchapplicationsRequest {
  /** The name of the Search Application. Format: searchapplications/{application_id}. */
  name: string;
  /** Only applies to [`settings.searchapplications.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.searchapplications/patch). Update mask to control which fields to update. Example field paths: `search_application.name`, `search_application.displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the `search_application`, then that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: SearchApplication;
}

export const PatchSettingsSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SearchApplication).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/settings/searchapplications/{searchapplicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSettingsSearchapplicationsRequest>;

export type PatchSettingsSearchapplicationsResponse = Operation;
export const PatchSettingsSearchapplicationsResponse = Operation;

export type PatchSettingsSearchapplicationsError = CommonErrors;

export const patchSettingsSearchapplications: API.OperationMethod<PatchSettingsSearchapplicationsRequest, PatchSettingsSearchapplicationsResponse, PatchSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSettingsSearchapplicationsRequest,
  output: PatchSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Deletes a search application. **Note:** This API requires an admin account to execute. */
export interface DeleteSettingsSearchapplicationsRequest {
  /** The name of the search application to be deleted. Format: applications/{application_id}. */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const DeleteSettingsSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/settings/searchapplications/{searchapplicationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSettingsSearchapplicationsRequest>;

export type DeleteSettingsSearchapplicationsResponse = Operation;
export const DeleteSettingsSearchapplicationsResponse = Operation;

export type DeleteSettingsSearchapplicationsError = CommonErrors;

export const deleteSettingsSearchapplications: API.OperationMethod<DeleteSettingsSearchapplicationsRequest, DeleteSettingsSearchapplicationsResponse, DeleteSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSettingsSearchapplicationsRequest,
  output: DeleteSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Resets a search application to default settings. This will return an empty response. **Note:** This API requires an admin account to execute. */
export interface ResetSettingsSearchapplicationsRequest {
  /** The name of the search application to be reset. Format: applications/{application_id}. */
  name: string;
  /** Request body */
  body?: ResetSearchApplicationRequest;
}

export const ResetSettingsSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetSearchApplicationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/settings/searchapplications/{searchapplicationsId}:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetSettingsSearchapplicationsRequest>;

export type ResetSettingsSearchapplicationsResponse = Operation;
export const ResetSettingsSearchapplicationsResponse = Operation;

export type ResetSettingsSearchapplicationsError = CommonErrors;

export const resetSettingsSearchapplications: API.OperationMethod<ResetSettingsSearchapplicationsRequest, ResetSettingsSearchapplicationsResponse, ResetSettingsSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetSettingsSearchapplicationsRequest,
  output: ResetSettingsSearchapplicationsResponse,
  errors: [],
}));

/** Creates a datasource. **Note:** This API requires an admin account to execute. */
export interface CreateSettingsDatasourcesRequest {
  /** Request body */
  body?: DataSource;
}

export const CreateSettingsDatasourcesRequest = Schema.Struct({
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/settings/datasources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSettingsDatasourcesRequest>;

export type CreateSettingsDatasourcesResponse = Operation;
export const CreateSettingsDatasourcesResponse = Operation;

export type CreateSettingsDatasourcesError = CommonErrors;

export const createSettingsDatasources: API.OperationMethod<CreateSettingsDatasourcesRequest, CreateSettingsDatasourcesResponse, CreateSettingsDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSettingsDatasourcesRequest,
  output: CreateSettingsDatasourcesResponse,
  errors: [],
}));

/** Deletes a datasource. **Note:** This API requires an admin account to execute. */
export interface DeleteSettingsDatasourcesRequest {
  /** The name of the datasource. Format: datasources/{source_id}. */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const DeleteSettingsDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/settings/datasources/{datasourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSettingsDatasourcesRequest>;

export type DeleteSettingsDatasourcesResponse = Operation;
export const DeleteSettingsDatasourcesResponse = Operation;

export type DeleteSettingsDatasourcesError = CommonErrors;

export const deleteSettingsDatasources: API.OperationMethod<DeleteSettingsDatasourcesRequest, DeleteSettingsDatasourcesResponse, DeleteSettingsDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSettingsDatasourcesRequest,
  output: DeleteSettingsDatasourcesResponse,
  errors: [],
}));

/** Gets a datasource. **Note:** This API requires an admin account to execute. */
export interface GetSettingsDatasourcesRequest {
  /** The name of the datasource resource. Format: datasources/{source_id}. */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const GetSettingsDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/settings/datasources/{datasourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetSettingsDatasourcesRequest>;

export type GetSettingsDatasourcesResponse = DataSource;
export const GetSettingsDatasourcesResponse = DataSource;

export type GetSettingsDatasourcesError = CommonErrors;

export const getSettingsDatasources: API.OperationMethod<GetSettingsDatasourcesRequest, GetSettingsDatasourcesResponse, GetSettingsDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsDatasourcesRequest,
  output: GetSettingsDatasourcesResponse,
  errors: [],
}));

/** Updates a datasource. **Note:** This API requires an admin account to execute. */
export interface UpdateSettingsDatasourcesRequest {
  /** The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource. */
  name: string;
  /** Request body */
  body?: UpdateDataSourceRequest;
}

export const UpdateSettingsDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateDataSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/settings/datasources/{datasourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsDatasourcesRequest>;

export type UpdateSettingsDatasourcesResponse = Operation;
export const UpdateSettingsDatasourcesResponse = Operation;

export type UpdateSettingsDatasourcesError = CommonErrors;

export const updateSettingsDatasources: API.OperationMethod<UpdateSettingsDatasourcesRequest, UpdateSettingsDatasourcesResponse, UpdateSettingsDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsDatasourcesRequest,
  output: UpdateSettingsDatasourcesResponse,
  errors: [],
}));

/** Updates a datasource. **Note:** This API requires an admin account to execute. */
export interface PatchSettingsDatasourcesRequest {
  /** The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource. */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
  /** Only applies to [`settings.datasources.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.datasources/patch). Update mask to control which fields to update. Example field paths: `name`, `displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the source, that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: DataSource;
}

export const PatchSettingsDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/settings/datasources/{datasourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSettingsDatasourcesRequest>;

export type PatchSettingsDatasourcesResponse = Operation;
export const PatchSettingsDatasourcesResponse = Operation;

export type PatchSettingsDatasourcesError = CommonErrors;

export const patchSettingsDatasources: API.OperationMethod<PatchSettingsDatasourcesRequest, PatchSettingsDatasourcesResponse, PatchSettingsDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSettingsDatasourcesRequest,
  output: PatchSettingsDatasourcesResponse,
  errors: [],
}));

/** Lists datasources. **Note:** This API requires an admin account to execute. */
export interface ListSettingsDatasourcesRequest {
  /** Starting index of the results. */
  pageToken?: string;
  /** Maximum number of datasources to fetch in a request. The max value is 1000. The default value is 1000. */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListSettingsDatasourcesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/settings/datasources" }),
  svc,
) as unknown as Schema.Schema<ListSettingsDatasourcesRequest>;

export type ListSettingsDatasourcesResponse = ListDataSourceResponse;
export const ListSettingsDatasourcesResponse = ListDataSourceResponse;

export type ListSettingsDatasourcesError = CommonErrors;

export const listSettingsDatasources = API.makePaginated(() => ({
  input: ListSettingsDatasourcesRequest,
  output: ListSettingsDatasourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Enables `third party` support in Google Cloud Search. **Note:** This API requires an admin account to execute. */
export interface InitializeCustomerV1Request {
  /** Request body */
  body?: InitializeCustomerRequest;
}

export const InitializeCustomerV1Request = Schema.Struct({
  body: Schema.optional(InitializeCustomerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1:initializeCustomer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitializeCustomerV1Request>;

export type InitializeCustomerV1Response = Operation;
export const InitializeCustomerV1Response = Operation;

export type InitializeCustomerV1Error = CommonErrors;

export const initializeCustomerV1: API.OperationMethod<InitializeCustomerV1Request, InitializeCustomerV1Response, InitializeCustomerV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitializeCustomerV1Request,
  output: InitializeCustomerV1Response,
  errors: [],
}));

/** Updates the schema of a data source. This method does not perform incremental updates to the schema. Instead, this method updates the schema by overwriting the entire schema. **Note:** This API requires an admin or service account to execute. */
export interface UpdateSchemaIndexingDatasourcesRequest {
  /** The name of the data source to update Schema. Format: datasources/{source_id} */
  name: string;
  /** Request body */
  body?: UpdateSchemaRequest;
}

export const UpdateSchemaIndexingDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/indexing/datasources/{datasourcesId}/schema", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSchemaIndexingDatasourcesRequest>;

export type UpdateSchemaIndexingDatasourcesResponse = Operation;
export const UpdateSchemaIndexingDatasourcesResponse = Operation;

export type UpdateSchemaIndexingDatasourcesError = CommonErrors;

export const updateSchemaIndexingDatasources: API.OperationMethod<UpdateSchemaIndexingDatasourcesRequest, UpdateSchemaIndexingDatasourcesResponse, UpdateSchemaIndexingDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSchemaIndexingDatasourcesRequest,
  output: UpdateSchemaIndexingDatasourcesResponse,
  errors: [],
}));

/** Gets the schema of a data source. **Note:** This API requires an admin or service account to execute. */
export interface GetSchemaIndexingDatasourcesRequest {
  /** The name of the data source to get Schema. Format: datasources/{source_id} */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const GetSchemaIndexingDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/indexing/datasources/{datasourcesId}/schema" }),
  svc,
) as unknown as Schema.Schema<GetSchemaIndexingDatasourcesRequest>;

export type GetSchemaIndexingDatasourcesResponse = Cloudsearch_Schema;
export const GetSchemaIndexingDatasourcesResponse = Cloudsearch_Schema;

export type GetSchemaIndexingDatasourcesError = CommonErrors;

export const getSchemaIndexingDatasources: API.OperationMethod<GetSchemaIndexingDatasourcesRequest, GetSchemaIndexingDatasourcesResponse, GetSchemaIndexingDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemaIndexingDatasourcesRequest,
  output: GetSchemaIndexingDatasourcesResponse,
  errors: [],
}));

/** Deletes the schema of a data source. **Note:** This API requires an admin or service account to execute. */
export interface DeleteSchemaIndexingDatasourcesRequest {
  /** The name of the data source to delete Schema. Format: datasources/{source_id} */
  name: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const DeleteSchemaIndexingDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/indexing/datasources/{datasourcesId}/schema" }),
  svc,
) as unknown as Schema.Schema<DeleteSchemaIndexingDatasourcesRequest>;

export type DeleteSchemaIndexingDatasourcesResponse = Operation;
export const DeleteSchemaIndexingDatasourcesResponse = Operation;

export type DeleteSchemaIndexingDatasourcesError = CommonErrors;

export const deleteSchemaIndexingDatasources: API.OperationMethod<DeleteSchemaIndexingDatasourcesRequest, DeleteSchemaIndexingDatasourcesResponse, DeleteSchemaIndexingDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSchemaIndexingDatasourcesRequest,
  output: DeleteSchemaIndexingDatasourcesResponse,
  errors: [],
}));

/** Deletes Item resource for the specified resource name. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface DeleteIndexingDatasourcesItemsRequest {
  /** Required. The name of the item to delete. Format: datasources/{source_id}/items/{item_id} */
  name: string;
  /** Required. The incremented version of the item to delete from the index. The indexing system stores the version from the datasource as a byte string and compares the Item version in the index to the version of the queued Item using lexical ordering. Cloud Search Indexing won't delete any queued item with a version value that is less than or equal to the version of the currently indexed item. The maximum length for this field is 1024 bytes. For information on how item version affects the deletion process, refer to [Handle revisions after manual deletes](https://developers.google.com/workspace/cloud-search/docs/guides/operations). */
  version?: string;
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** Required. The RequestMode for this request. */
  mode?: "UNSPECIFIED" | "SYNCHRONOUS" | "ASYNCHRONOUS" | (string & {});
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const DeleteIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
  connectorName: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorName")),
  mode: Schema.optional(Schema.String).pipe(T.HttpQuery("mode")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/indexing/datasources/{datasourcesId}/items/{itemsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteIndexingDatasourcesItemsRequest>;

export type DeleteIndexingDatasourcesItemsResponse = Operation;
export const DeleteIndexingDatasourcesItemsResponse = Operation;

export type DeleteIndexingDatasourcesItemsError = CommonErrors;

export const deleteIndexingDatasourcesItems: API.OperationMethod<DeleteIndexingDatasourcesItemsRequest, DeleteIndexingDatasourcesItemsResponse, DeleteIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteIndexingDatasourcesItemsRequest,
  output: DeleteIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Gets Item resource by item name. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface GetIndexingDatasourcesItemsRequest {
  /** The name of the item to get info. Format: datasources/{source_id}/items/{item_id} */
  name: string;
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const GetIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  connectorName: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorName")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/indexing/datasources/{datasourcesId}/items/{itemsId}" }),
  svc,
) as unknown as Schema.Schema<GetIndexingDatasourcesItemsRequest>;

export type GetIndexingDatasourcesItemsResponse = Item;
export const GetIndexingDatasourcesItemsResponse = Item;

export type GetIndexingDatasourcesItemsError = CommonErrors;

export const getIndexingDatasourcesItems: API.OperationMethod<GetIndexingDatasourcesItemsRequest, GetIndexingDatasourcesItemsResponse, GetIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIndexingDatasourcesItemsRequest,
  output: GetIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Lists all or a subset of Item resources. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface ListIndexingDatasourcesItemsRequest {
  /** The name of the Data Source to list Items. Format: datasources/{source_id} */
  name: string;
  /** The name of connector making this call. Format: datasources/{source_id}/connectors/{ID} */
  connectorName?: string;
  /** When set to true, the indexing system only populates the following fields: name, version, queue. metadata.hash, metadata.title, metadata.sourceRepositoryURL, metadata.objectType, metadata.createTime, metadata.updateTime, metadata.contentLanguage, metadata.mimeType, structured_data.hash, content.hash, itemType, itemStatus.code, itemStatus.processingError.code, itemStatus.repositoryError.type, If this value is false, then all the fields are populated in Item. */
  brief?: boolean;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Maximum number of items to fetch in a request. The max value is 1000 when brief is true. The max value is 10 if brief is false. The default value is 10 */
  pageSize?: number;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "debugOptions.enableDebugging"?: boolean;
}

export const ListIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  connectorName: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorName")),
  brief: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("brief")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("debugOptions.enableDebugging")),
}).pipe(
  T.Http({ method: "GET", path: "v1/indexing/datasources/{datasourcesId}/items" }),
  svc,
) as unknown as Schema.Schema<ListIndexingDatasourcesItemsRequest>;

export type ListIndexingDatasourcesItemsResponse = ListItemsResponse;
export const ListIndexingDatasourcesItemsResponse = ListItemsResponse;

export type ListIndexingDatasourcesItemsError = CommonErrors;

export const listIndexingDatasourcesItems = API.makePaginated(() => ({
  input: ListIndexingDatasourcesItemsRequest,
  output: ListIndexingDatasourcesItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates Item ACL, metadata, and content. It will insert the Item if it does not exist. This method does not support partial updates. Fields with no provided values are cleared out in the Cloud Search index. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface IndexIndexingDatasourcesItemsRequest {
  /** The name of the Item. Format: datasources/{source_id}/items/{item_id} This is a required field. The maximum length is 1536 characters. */
  name: string;
  /** Request body */
  body?: IndexItemRequest;
}

export const IndexIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(IndexItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items/{itemsId}:index", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IndexIndexingDatasourcesItemsRequest>;

export type IndexIndexingDatasourcesItemsResponse = Operation;
export const IndexIndexingDatasourcesItemsResponse = Operation;

export type IndexIndexingDatasourcesItemsError = CommonErrors;

export const indexIndexingDatasourcesItems: API.OperationMethod<IndexIndexingDatasourcesItemsRequest, IndexIndexingDatasourcesItemsResponse, IndexIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IndexIndexingDatasourcesItemsRequest,
  output: IndexIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Creates an upload session for uploading item content. For items smaller than 100 KB, it's easier to embed the content inline within an index request. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface UploadIndexingDatasourcesItemsRequest {
  /** The name of the Item to start a resumable upload. Format: datasources/{source_id}/items/{item_id}. The maximum length is 1536 bytes. */
  name: string;
  /** Request body */
  body?: StartUploadItemRequest;
}

export const UploadIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartUploadItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items/{itemsId}:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadIndexingDatasourcesItemsRequest>;

export type UploadIndexingDatasourcesItemsResponse = UploadItemRef;
export const UploadIndexingDatasourcesItemsResponse = UploadItemRef;

export type UploadIndexingDatasourcesItemsError = CommonErrors;

export const uploadIndexingDatasourcesItems: API.OperationMethod<UploadIndexingDatasourcesItemsRequest, UploadIndexingDatasourcesItemsResponse, UploadIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadIndexingDatasourcesItemsRequest,
  output: UploadIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Polls for unreserved items from the indexing queue and marks a set as reserved, starting with items that have the oldest timestamp from the highest priority ItemStatus. The priority order is as follows: ERROR MODIFIED NEW_ITEM ACCEPTED Reserving items ensures that polling from other threads cannot create overlapping sets. After handling the reserved items, the client should put items back into the unreserved state, either by calling index, or by calling push with the type REQUEUE. Items automatically become available (unreserved) after 4 hours even if no update or push method is called. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface PollIndexingDatasourcesItemsRequest {
  /** The name of the Data Source to poll items. Format: datasources/{source_id} */
  name: string;
  /** Request body */
  body?: PollItemsRequest;
}

export const PollIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PollItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items:poll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PollIndexingDatasourcesItemsRequest>;

export type PollIndexingDatasourcesItemsResponse = PollItemsResponse;
export const PollIndexingDatasourcesItemsResponse = PollItemsResponse;

export type PollIndexingDatasourcesItemsError = CommonErrors;

export const pollIndexingDatasourcesItems: API.OperationMethod<PollIndexingDatasourcesItemsRequest, PollIndexingDatasourcesItemsResponse, PollIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PollIndexingDatasourcesItemsRequest,
  output: PollIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Pushes an item onto a queue for later polling and updating. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface PushIndexingDatasourcesItemsRequest {
  /** The name of the item to push into the indexing queue. Format: datasources/{source_id}/items/{ID} This is a required field. The maximum length is 1536 characters. */
  name: string;
  /** Request body */
  body?: PushItemRequest;
}

export const PushIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PushItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items/{itemsId}:push", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PushIndexingDatasourcesItemsRequest>;

export type PushIndexingDatasourcesItemsResponse = Item;
export const PushIndexingDatasourcesItemsResponse = Item;

export type PushIndexingDatasourcesItemsError = CommonErrors;

export const pushIndexingDatasourcesItems: API.OperationMethod<PushIndexingDatasourcesItemsRequest, PushIndexingDatasourcesItemsResponse, PushIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PushIndexingDatasourcesItemsRequest,
  output: PushIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Unreserves all items from a queue, making them all eligible to be polled. This method is useful for resetting the indexing queue after a connector has been restarted. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface UnreserveIndexingDatasourcesItemsRequest {
  /** The name of the Data Source to unreserve all items. Format: datasources/{source_id} */
  name: string;
  /** Request body */
  body?: UnreserveItemsRequest;
}

export const UnreserveIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnreserveItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items:unreserve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnreserveIndexingDatasourcesItemsRequest>;

export type UnreserveIndexingDatasourcesItemsResponse = Operation;
export const UnreserveIndexingDatasourcesItemsResponse = Operation;

export type UnreserveIndexingDatasourcesItemsError = CommonErrors;

export const unreserveIndexingDatasourcesItems: API.OperationMethod<UnreserveIndexingDatasourcesItemsRequest, UnreserveIndexingDatasourcesItemsResponse, UnreserveIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnreserveIndexingDatasourcesItemsRequest,
  output: UnreserveIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Deletes all items in a queue. This method is useful for deleting stale items. This API requires an admin or service account to execute. The service account used is the one whitelisted in the corresponding data source. */
export interface DeleteQueueItemsIndexingDatasourcesItemsRequest {
  /** The name of the Data Source to delete items in a queue. Format: datasources/{source_id} */
  name: string;
  /** Request body */
  body?: DeleteQueueItemsRequest;
}

export const DeleteQueueItemsIndexingDatasourcesItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeleteQueueItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/indexing/datasources/{datasourcesId}/items:deleteQueueItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteQueueItemsIndexingDatasourcesItemsRequest>;

export type DeleteQueueItemsIndexingDatasourcesItemsResponse = Operation;
export const DeleteQueueItemsIndexingDatasourcesItemsResponse = Operation;

export type DeleteQueueItemsIndexingDatasourcesItemsError = CommonErrors;

export const deleteQueueItemsIndexingDatasourcesItems: API.OperationMethod<DeleteQueueItemsIndexingDatasourcesItemsRequest, DeleteQueueItemsIndexingDatasourcesItemsResponse, DeleteQueueItemsIndexingDatasourcesItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteQueueItemsIndexingDatasourcesItemsRequest,
  output: DeleteQueueItemsIndexingDatasourcesItemsResponse,
  errors: [],
}));

/** Provides suggestions for autocompleting the query. **Note:** This API requires a standard end user account to execute. A service account can't perform Query API requests directly; to use a service account to perform queries, set up [Google Workspace domain-wide delegation of authority](https://developers.google.com/workspace/cloud-search/docs/guides/delegation/). */
export interface SuggestQueryRequest {
  /** Request body */
  body?: SuggestRequest;
}

export const SuggestQueryRequest = Schema.Struct({
  body: Schema.optional(SuggestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/query/suggest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestQueryRequest>;

export type SuggestQueryResponse = SuggestResponse;
export const SuggestQueryResponse = SuggestResponse;

export type SuggestQueryError = CommonErrors;

export const suggestQuery: API.OperationMethod<SuggestQueryRequest, SuggestQueryResponse, SuggestQueryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestQueryRequest,
  output: SuggestQueryResponse,
  errors: [],
}));

/** The Cloud Search Query API provides the search method, which returns the most relevant results from a user query. The results can come from Google Workspace apps, such as Gmail or Google Drive, or they can come from data that you have indexed from a third party. **Note:** This API requires a standard end user account to execute. A service account can't perform Query API requests directly; to use a service account to perform queries, set up [Google Workspace domain-wide delegation of authority](https://developers.google.com/workspace/cloud-search/docs/guides/delegation/). */
export interface SearchQueryRequest {
  /** Request body */
  body?: SearchRequest;
}

export const SearchQueryRequest = Schema.Struct({
  body: Schema.optional(SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/query/search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchQueryRequest>;

export type SearchQueryResponse = SearchResponse;
export const SearchQueryResponse = SearchResponse;

export type SearchQueryError = CommonErrors;

export const searchQuery: API.OperationMethod<SearchQueryRequest, SearchQueryResponse, SearchQueryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchQueryRequest,
  output: SearchQueryResponse,
  errors: [],
}));

/** Provides functionality to remove logged activity for a user. Currently to be used only for Chat 1p clients **Note:** This API requires a standard end user account to execute. A service account can't perform Remove Activity requests directly; to use a service account to perform queries, set up [Google Workspace domain-wide delegation of authority](https://developers.google.com/workspace/cloud-search/docs/guides/delegation/). */
export interface RemoveActivityQueryRequest {
  /** Request body */
  body?: RemoveActivityRequest;
}

export const RemoveActivityQueryRequest = Schema.Struct({
  body: Schema.optional(RemoveActivityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/query:removeActivity", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveActivityQueryRequest>;

export type RemoveActivityQueryResponse = RemoveActivityResponse;
export const RemoveActivityQueryResponse = RemoveActivityResponse;

export type RemoveActivityQueryError = CommonErrors;

export const removeActivityQuery: API.OperationMethod<RemoveActivityQueryRequest, RemoveActivityQueryResponse, RemoveActivityQueryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveActivityQueryRequest,
  output: RemoveActivityQueryResponse,
  errors: [],
}));

/** Returns list of sources that user can use for Search and Suggest APIs. **Note:** This API requires a standard end user account to execute. A service account can't perform Query API requests directly; to use a service account to perform queries, set up [Google Workspace domain-wide delegation of authority](https://developers.google.com/workspace/cloud-search/docs/guides/delegation/). */
export interface ListQuerySourcesRequest {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. For translations. Set this field using the language set in browser or for the page. In the event that the user's language preference is known, set this field to the known user language. When specified, the documents in search results are biased towards the specified language. The Suggest API uses this field as a hint to make better third-party autocomplete predictions. */
  "requestOptions.languageCode"?: string;
  /** If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field. */
  "requestOptions.debugOptions.enableDebugging"?: boolean;
  /** Current user's time zone id, such as "America/Los_Angeles" or "Australia/Sydney". These IDs are defined by [Unicode Common Locale Data Repository (CLDR)](http://cldr.unicode.org/) project, and currently available in the file [timezone.xml](http://unicode.org/repos/cldr/trunk/common/bcp47/timezone.xml). This field is used to correctly interpret date and time queries. If this field is not specified, the default time zone (UTC) is used. */
  "requestOptions.timeZone"?: string;
  /** The ID generated when you create a search application using the [admin console](https://support.google.com/a/answer/9043922). */
  "requestOptions.searchApplicationId"?: string;
  /** Number of sources to return in the response. */
  pageToken?: string;
}

export const ListQuerySourcesRequest = Schema.Struct({
  "requestOptions.languageCode": Schema.optional(Schema.String).pipe(T.HttpQuery("requestOptions.languageCode")),
  "requestOptions.debugOptions.enableDebugging": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("requestOptions.debugOptions.enableDebugging")),
  "requestOptions.timeZone": Schema.optional(Schema.String).pipe(T.HttpQuery("requestOptions.timeZone")),
  "requestOptions.searchApplicationId": Schema.optional(Schema.String).pipe(T.HttpQuery("requestOptions.searchApplicationId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/query/sources" }),
  svc,
) as unknown as Schema.Schema<ListQuerySourcesRequest>;

export type ListQuerySourcesResponse_Op = ListQuerySourcesResponse;
export const ListQuerySourcesResponse_Op = ListQuerySourcesResponse;

export type ListQuerySourcesError = CommonErrors;

export const listQuerySources = API.makePaginated(() => ({
  input: ListQuerySourcesRequest,
  output: ListQuerySourcesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets indexed item statistics aggreggated across all data sources. This API only returns statistics for previous dates; it doesn't return statistics for the current day. **Note:** This API requires a standard end user account to execute. */
export interface GetIndexStatsRequest {
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetIndexStatsRequest = Schema.Struct({
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/index" }),
  svc,
) as unknown as Schema.Schema<GetIndexStatsRequest>;

export type GetIndexStatsResponse = GetCustomerIndexStatsResponse;
export const GetIndexStatsResponse = GetCustomerIndexStatsResponse;

export type GetIndexStatsError = CommonErrors;

export const getIndexStats: API.OperationMethod<GetIndexStatsRequest, GetIndexStatsResponse, GetIndexStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIndexStatsRequest,
  output: GetIndexStatsResponse,
  errors: [],
}));

/** Get the query statistics for customer. **Note:** This API requires a standard end user account to execute. */
export interface GetQueryStatsRequest {
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetQueryStatsRequest = Schema.Struct({
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/query" }),
  svc,
) as unknown as Schema.Schema<GetQueryStatsRequest>;

export type GetQueryStatsResponse = GetCustomerQueryStatsResponse;
export const GetQueryStatsResponse = GetCustomerQueryStatsResponse;

export type GetQueryStatsError = CommonErrors;

export const getQueryStats: API.OperationMethod<GetQueryStatsRequest, GetQueryStatsResponse, GetQueryStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetQueryStatsRequest,
  output: GetQueryStatsResponse,
  errors: [],
}));

/** Get the users statistics for customer. **Note:** This API requires a standard end user account to execute. */
export interface GetUserStatsRequest {
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetUserStatsRequest = Schema.Struct({
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/user" }),
  svc,
) as unknown as Schema.Schema<GetUserStatsRequest>;

export type GetUserStatsResponse = GetCustomerUserStatsResponse;
export const GetUserStatsResponse = GetCustomerUserStatsResponse;

export type GetUserStatsError = CommonErrors;

export const getUserStats: API.OperationMethod<GetUserStatsRequest, GetUserStatsResponse, GetUserStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserStatsRequest,
  output: GetUserStatsResponse,
  errors: [],
}));

/** Get the # of search sessions, % of successful sessions with a click query statistics for customer. **Note:** This API requires a standard end user account to execute. */
export interface GetSessionStatsRequest {
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetSessionStatsRequest = Schema.Struct({
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/session" }),
  svc,
) as unknown as Schema.Schema<GetSessionStatsRequest>;

export type GetSessionStatsResponse = GetCustomerSessionStatsResponse;
export const GetSessionStatsResponse = GetCustomerSessionStatsResponse;

export type GetSessionStatsError = CommonErrors;

export const getSessionStats: API.OperationMethod<GetSessionStatsRequest, GetSessionStatsResponse, GetSessionStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSessionStatsRequest,
  output: GetSessionStatsResponse,
  errors: [],
}));

/** Get search application stats for customer. **Note:** This API requires a standard end user account to execute. */
export interface GetSearchapplicationStatsRequest {
  /** Year of date. Must be from 1 to 9999. */
  "startDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "startDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "startDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "endDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "endDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "endDate.day"?: number;
}

export const GetSearchapplicationStatsRequest = Schema.Struct({
  "startDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.year")),
  "startDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.month")),
  "startDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.day")),
  "endDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.year")),
  "endDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.month")),
  "endDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/searchapplication" }),
  svc,
) as unknown as Schema.Schema<GetSearchapplicationStatsRequest>;

export type GetSearchapplicationStatsResponse = GetCustomerSearchApplicationStatsResponse;
export const GetSearchapplicationStatsResponse = GetCustomerSearchApplicationStatsResponse;

export type GetSearchapplicationStatsError = CommonErrors;

export const getSearchapplicationStats: API.OperationMethod<GetSearchapplicationStatsRequest, GetSearchapplicationStatsResponse, GetSearchapplicationStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSearchapplicationStatsRequest,
  output: GetSearchapplicationStatsResponse,
  errors: [],
}));

/** Gets indexed item statistics for a single data source. **Note:** This API requires a standard end user account to execute. */
export interface GetStatsIndexDatasourcesRequest {
  /** The resource id of the data source to retrieve statistics for, in the following format: "datasources/{source_id}" */
  name: string;
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetStatsIndexDatasourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/index/datasources/{datasourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetStatsIndexDatasourcesRequest>;

export type GetStatsIndexDatasourcesResponse = GetDataSourceIndexStatsResponse;
export const GetStatsIndexDatasourcesResponse = GetDataSourceIndexStatsResponse;

export type GetStatsIndexDatasourcesError = CommonErrors;

export const getStatsIndexDatasources: API.OperationMethod<GetStatsIndexDatasourcesRequest, GetStatsIndexDatasourcesResponse, GetStatsIndexDatasourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatsIndexDatasourcesRequest,
  output: GetStatsIndexDatasourcesResponse,
  errors: [],
}));

/** Get the query statistics for search application. **Note:** This API requires a standard end user account to execute. */
export interface GetStatsQuerySearchapplicationsRequest {
  /** The resource id of the search application query stats, in the following format: searchapplications/{application_id} */
  name: string;
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetStatsQuerySearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/query/searchapplications/{searchapplicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetStatsQuerySearchapplicationsRequest>;

export type GetStatsQuerySearchapplicationsResponse = GetSearchApplicationQueryStatsResponse;
export const GetStatsQuerySearchapplicationsResponse = GetSearchApplicationQueryStatsResponse;

export type GetStatsQuerySearchapplicationsError = CommonErrors;

export const getStatsQuerySearchapplications: API.OperationMethod<GetStatsQuerySearchapplicationsRequest, GetStatsQuerySearchapplicationsResponse, GetStatsQuerySearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatsQuerySearchapplicationsRequest,
  output: GetStatsQuerySearchapplicationsResponse,
  errors: [],
}));

/** Get the users statistics for search application. **Note:** This API requires a standard end user account to execute. */
export interface GetStatsUserSearchapplicationsRequest {
  /** The resource id of the search application session stats, in the following format: searchapplications/{application_id} */
  name: string;
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetStatsUserSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/user/searchapplications/{searchapplicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetStatsUserSearchapplicationsRequest>;

export type GetStatsUserSearchapplicationsResponse = GetSearchApplicationUserStatsResponse;
export const GetStatsUserSearchapplicationsResponse = GetSearchApplicationUserStatsResponse;

export type GetStatsUserSearchapplicationsError = CommonErrors;

export const getStatsUserSearchapplications: API.OperationMethod<GetStatsUserSearchapplicationsRequest, GetStatsUserSearchapplicationsResponse, GetStatsUserSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatsUserSearchapplicationsRequest,
  output: GetStatsUserSearchapplicationsResponse,
  errors: [],
}));

/** Get the # of search sessions, % of successful sessions with a click query statistics for search application. **Note:** This API requires a standard end user account to execute. */
export interface GetStatsSessionSearchapplicationsRequest {
  /** The resource id of the search application session stats, in the following format: searchapplications/{application_id} */
  name: string;
  /** Year of date. Must be from 1 to 9999. */
  "fromDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "fromDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "fromDate.day"?: number;
  /** Year of date. Must be from 1 to 9999. */
  "toDate.year"?: number;
  /** Month of date. Must be from 1 to 12. */
  "toDate.month"?: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month. */
  "toDate.day"?: number;
}

export const GetStatsSessionSearchapplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "fromDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.year")),
  "fromDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.month")),
  "fromDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("fromDate.day")),
  "toDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.year")),
  "toDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.month")),
  "toDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("toDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/stats/session/searchapplications/{searchapplicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetStatsSessionSearchapplicationsRequest>;

export type GetStatsSessionSearchapplicationsResponse = GetSearchApplicationSessionStatsResponse;
export const GetStatsSessionSearchapplicationsResponse = GetSearchApplicationSessionStatsResponse;

export type GetStatsSessionSearchapplicationsError = CommonErrors;

export const getStatsSessionSearchapplications: API.OperationMethod<GetStatsSessionSearchapplicationsRequest, GetStatsSessionSearchapplicationsResponse, GetStatsSessionSearchapplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatsSessionSearchapplicationsRequest,
  output: GetStatsSessionSearchapplicationsResponse,
  errors: [],
}));

/** Uploads media for indexing. The upload endpoint supports direct and resumable upload protocols and is intended for large items that can not be [inlined during index requests](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/indexing.datasources.items#itemcontent). To index large content: 1. Call indexing.datasources.items.upload with the item name to begin an upload session and retrieve the UploadItemRef. 1. Call media.upload to upload the content, as a streaming request, using the same resource name from the UploadItemRef from step 1. 1. Call indexing.datasources.items.index to index the item. Populate the [ItemContent](/cloud-search/docs/reference/rest/v1/indexing.datasources.items#ItemContent) with the UploadItemRef from step 1. For additional information, see [Create a content connector using the REST API](https://developers.google.com/workspace/cloud-search/docs/guides/content-connector#rest). **Note:** This API requires a service account to execute. */
export interface UploadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
  /** Request body */
  body?: Media;
}

export const UploadMediaRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
  body: Schema.optional(Media).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/media/{mediaId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = Media;
export const UploadMediaResponse = Media;

export type UploadMediaError = CommonErrors;

export const uploadMedia: API.OperationMethod<UploadMediaRequest, UploadMediaResponse, UploadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

