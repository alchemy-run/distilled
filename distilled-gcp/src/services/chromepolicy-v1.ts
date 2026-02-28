// ==========================================================================
// Chrome Policy API (chromepolicy v1)
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
  name: "chromepolicy",
  version: "v1",
  rootUrl: "https://chromepolicy.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleChromePolicyVersionsV1UploadPolicyFileRequest {
  /** Required. The fully qualified policy schema and field name this file is uploaded for. This information will be used to validate the content type of the file. */
  policyField?: string;
}

export const GoogleChromePolicyVersionsV1UploadPolicyFileRequest: Schema.Schema<GoogleChromePolicyVersionsV1UploadPolicyFileRequest> = Schema.suspend(() => Schema.Struct({
  policyField: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1UploadPolicyFileRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1UploadPolicyFileRequest>;

export interface GoogleChromePolicyVersionsV1UploadPolicyFileResponse {
  /** The uri for end user to download the file. */
  downloadUri?: string;
}

export const GoogleChromePolicyVersionsV1UploadPolicyFileResponse: Schema.Schema<GoogleChromePolicyVersionsV1UploadPolicyFileResponse> = Schema.suspend(() => Schema.Struct({
  downloadUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1UploadPolicyFileResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1UploadPolicyFileResponse>;

export interface GoogleChromePolicyVersionsV1PolicyTargetKey {
  /** The target resource on which this policy is applied. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") * Group ("groups/{group_id}") */
  targetResource?: string;
  /** Map containing the additional target key name and value pairs used to further identify the target of the policy. */
  additionalTargetKeys?: Record<string, string>;
}

export const GoogleChromePolicyVersionsV1PolicyTargetKey: Schema.Schema<GoogleChromePolicyVersionsV1PolicyTargetKey> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(Schema.String),
  additionalTargetKeys: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyTargetKey" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyTargetKey>;

export interface GoogleChromePolicyVersionsV1ResolveRequest {
  /** Required. The schema filter to apply to the resolve request. Specify a schema name to view a particular schema, for example: chrome.users.ShowLogoutButton Wildcards are supported, but only in the leaf portion of the schema name. Wildcards cannot be used in namespace directly. Please read https://developers.google.com/chrome/policy/guides/policy-schemas for details on schema namespaces. For example: Valid: "chrome.users.*", "chrome.users.apps.*", "chrome.printers.*" Invalid: "*", "*.users", "chrome.*", "chrome.*.apps.*" */
  policySchemaFilter?: string;
  /** Required. The key of the target resource on which the policies should be resolved. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The maximum number of policies to return, defaults to 100 and has a maximum of 1000. */
  pageSize?: number;
  /** The page token used to retrieve a specific page of the request. */
  pageToken?: string;
}

export const GoogleChromePolicyVersionsV1ResolveRequest: Schema.Schema<GoogleChromePolicyVersionsV1ResolveRequest> = Schema.suspend(() => Schema.Struct({
  policySchemaFilter: Schema.optional(Schema.String),
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ResolveRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ResolveRequest>;

export interface GoogleChromePolicyVersionsV1PolicyValue {
  /** The fully qualified name of the policy schema associated with this policy. */
  policySchema?: string;
  /** The value of the policy that is compatible with the schema that it is associated with. */
  value?: Record<string, unknown>;
}

export const GoogleChromePolicyVersionsV1PolicyValue: Schema.Schema<GoogleChromePolicyVersionsV1PolicyValue> = Schema.suspend(() => Schema.Struct({
  policySchema: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyValue" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyValue>;

export interface GoogleChromePolicyVersionsV1ResolvedPolicy {
  /** Output only. The target resource for which the resolved policy value applies. */
  targetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** Output only. The resolved value of the policy. */
  value?: GoogleChromePolicyVersionsV1PolicyValue;
  /** Output only. The source resource from which this policy value is obtained. May be the same as `targetKey` if the policy is directly modified on the target, otherwise it would be another resource from which the policy gets its value (if applicable). If not present, the source is the default value for the customer. */
  sourceKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** Output only. The added source key establishes at which level an entity was explicitly added for management. This is useful for certain type of policies that are only applied if they are explicitly added for management. For example: apps and networks. An entity can only be deleted from management in an Organizational Unit that it was explicitly added to. If this is not present it means that the policy is managed without the need to explicitly add an entity, for example: standard user or device policies. */
  addedSourceKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

export const GoogleChromePolicyVersionsV1ResolvedPolicy: Schema.Schema<GoogleChromePolicyVersionsV1ResolvedPolicy> = Schema.suspend(() => Schema.Struct({
  targetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  value: Schema.optional(GoogleChromePolicyVersionsV1PolicyValue),
  sourceKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  addedSourceKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ResolvedPolicy" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ResolvedPolicy>;

export interface GoogleChromePolicyVersionsV1ResolveResponse {
  /** The list of resolved policies found by the resolve request. */
  resolvedPolicies?: Array<GoogleChromePolicyVersionsV1ResolvedPolicy>;
  /** The page token used to get the next set of resolved policies found by the request. */
  nextPageToken?: string;
}

export const GoogleChromePolicyVersionsV1ResolveResponse: Schema.Schema<GoogleChromePolicyVersionsV1ResolveResponse> = Schema.suspend(() => Schema.Struct({
  resolvedPolicies: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1ResolvedPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ResolveResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ResolveResponse>;

export interface GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest {
  /** Required. The key of the target for which we want to modify a policy. The target resource must point to an Org Unit. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The new value for the policy. */
  policyValue?: GoogleChromePolicyVersionsV1PolicyValue;
  /** Required. Policy fields to update. Only fields in this mask will be updated; other fields in `policy_value` will be ignored (even if they have values). If a field is in this list it must have a value in 'policy_value'. */
  updateMask?: string;
}

export const GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest: Schema.Schema<GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policyValue: Schema.optional(GoogleChromePolicyVersionsV1PolicyValue),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest>;

export interface GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest {
  /** List of policies to modify as defined by the `requests`. All requests in the list must follow these restrictions: 1. All schemas in the list must have the same root namespace. 2. All `policyTargetKey.targetResource` values must point to an org unit resource. 3. All `policyTargetKey` values must have the same key names in the ` additionalTargetKeys`. This also means if one of the targets has an empty `additionalTargetKeys` map, all of the targets must have an empty `additionalTargetKeys` map. 4. No two modification requests can reference the same `policySchema` + ` policyTargetKey` pair. */
  requests?: Array<GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest>;
}

export const GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest: Schema.Schema<GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest {
  /** Required. The key of the target for which we want to modify a policy. The target resource must point to an Org Unit. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The fully qualified name of the policy schema that is being inherited. */
  policySchema?: string;
}

export const GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest: Schema.Schema<GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policySchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest>;

export interface GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest {
  /** List of policies that have to inherit their values as defined by the `requests`. All requests in the list must follow these restrictions: 1. All schemas in the list must have the same root namespace. 2. All `policyTargetKey.targetResource` values must point to an org unit resource. 3. All `policyTargetKey` values must have the same key names in the ` additionalTargetKeys`. This also means if one of the targets has an empty `additionalTargetKeys` map, all of the targets must have an empty `additionalTargetKeys` map. 4. No two modification requests can reference the same `policySchema` + ` policyTargetKey` pair. */
  requests?: Array<GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest>;
}

export const GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest: Schema.Schema<GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest>;

export interface GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest {
  /** Required. The key of the target for which we want to modify a policy. The target resource must point to a Group. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The new value for the policy. */
  policyValue?: GoogleChromePolicyVersionsV1PolicyValue;
  /** Required. Policy fields to update. Only fields in this mask will be updated; other fields in `policy_value` will be ignored (even if they have values). If a field is in this list it must have a value in 'policy_value'. */
  updateMask?: string;
}

export const GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest: Schema.Schema<GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policyValue: Schema.optional(GoogleChromePolicyVersionsV1PolicyValue),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest>;

export interface GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest {
  /** List of policies to modify as defined by the `requests`. All requests in the list must follow these restrictions: 1. All schemas in the list must have the same root namespace. 2. All `policyTargetKey.targetResource` values must point to a group resource. 3. All `policyTargetKey` values must have the same `app_id` key name in the `additionalTargetKeys`. 4. No two modification requests can reference the same `policySchema` + ` policyTargetKey` pair. */
  requests?: Array<GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest>;
}

export const GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest: Schema.Schema<GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest>;

export interface GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest {
  /** Required. The key of the target for which we want to modify a policy. The target resource must point to a Group. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The fully qualified name of the policy schema that is being inherited. */
  policySchema?: string;
}

export const GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest: Schema.Schema<GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policySchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest>;

export interface GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest {
  /** List of policies that will be deleted as defined by the `requests`. All requests in the list must follow these restrictions: 1. All schemas in the list must have the same root namespace. 2. All `policyTargetKey.targetResource` values must point to a group resource. 3. All `policyTargetKey` values must have the same `app_id` key name in the `additionalTargetKeys`. 4. No two modification requests can reference the same `policySchema` + ` policyTargetKey` pair. */
  requests?: Array<GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest>;
}

export const GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest: Schema.Schema<GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest>;

export interface GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest {
  /** Required. The key of the target for which we want to retrieve the group priority ordering. The target resource must point to an app. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The namespace of the policy type for the request. */
  policyNamespace?: string;
  /** The schema name of the policy for the request. */
  policySchema?: string;
}

export const GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest: Schema.Schema<GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policyNamespace: Schema.optional(Schema.String),
  policySchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest>;

export interface GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse {
  /** Output only. The target resource for which the group priority ordering has been retrieved. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** Output only. The namespace of the policy type of the group IDs. */
  policyNamespace?: string;
  /** Output only. The schema name of the policy for the group IDs. */
  policySchema?: string;
  /** Output only. The group IDs, in priority ordering. */
  groupIds?: Array<string>;
}

export const GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse: Schema.Schema<GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policyNamespace: Schema.optional(Schema.String),
  policySchema: Schema.optional(Schema.String),
  groupIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse>;

export interface GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest {
  /** Required. The key of the target for which we want to update the group priority ordering. The target resource must point to an app. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** The namespace of the policy type for the request. */
  policyNamespace?: string;
  /** The schema name of the policy for the request. */
  policySchema?: string;
  /** Required. The group IDs, in desired priority ordering. */
  groupIds?: Array<string>;
}

export const GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest: Schema.Schema<GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policyNamespace: Schema.optional(Schema.String),
  policySchema: Schema.optional(Schema.String),
  groupIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest>;

export interface GoogleChromePolicyVersionsV1AdditionalTargetKeyName {
  /** Key name. */
  key?: string;
  /** Key description. */
  keyDescription?: string;
}

export const GoogleChromePolicyVersionsV1AdditionalTargetKeyName: Schema.Schema<GoogleChromePolicyVersionsV1AdditionalTargetKeyName> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  keyDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1AdditionalTargetKeyName" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1AdditionalTargetKeyName>;

export interface Proto2FieldDescriptorProto {
  name?: string;
  number?: number;
  label?: "LABEL_OPTIONAL" | "LABEL_REPEATED" | "LABEL_REQUIRED" | (string & {});
  /** If type_name is set, this need not be set. If both this and type_name are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP. */
  type?: "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** For message and enum types, this is the name of the type. If the name starts with a '.', it is fully-qualified. Otherwise, C++-like scoping rules are used to find the type (i.e. first the nested types within this message are searched, then within the parent, on up to the root namespace). */
  typeName?: string;
  /** For numeric types, contains the original text representation of the value. For booleans, "true" or "false". For strings, contains the default text contents (not escaped in any way). For bytes, contains the C escaped value. All bytes >= 128 are escaped. */
  defaultValue?: string;
  /** If set, gives the index of a oneof in the containing type's oneof_decl list. This field is a member of that oneof. */
  oneofIndex?: number;
  /** JSON name of this field. The value is set by protocol compiler. If the user has set a "json_name" option on this field, that option's value will be used. Otherwise, it's deduced from the field's name by converting it to camelCase. */
  jsonName?: string;
  /** If true, this is a proto3 "optional". When a proto3 field is optional, it tracks presence regardless of field type. When proto3_optional is true, this field must belong to a oneof to signal to old proto3 clients that presence is tracked for this field. This oneof is known as a "synthetic" oneof, and this field must be its sole member (each proto3 optional field gets its own synthetic oneof). Synthetic oneofs exist in the descriptor only, and do not generate any API. Synthetic oneofs must be ordered after all "real" oneofs. For message fields, proto3_optional doesn't create any semantic change, since non-repeated message fields always track presence. However it still indicates the semantic detail of whether the user wrote "optional" or not. This can be useful for round-tripping the .proto file. For consistency we give message fields a synthetic oneof also, even though it is not required to track presence. This is especially important because the parser can't tell if a field is a message or an enum, so it must always create a synthetic oneof. Proto2 optional fields do not set this flag, because they already indicate optional with `LABEL_OPTIONAL`. */
  proto3Optional?: boolean;
}

export const Proto2FieldDescriptorProto: Schema.Schema<Proto2FieldDescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
  label: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  typeName: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  oneofIndex: Schema.optional(Schema.Number),
  jsonName: Schema.optional(Schema.String),
  proto3Optional: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Proto2FieldDescriptorProto" }) as any as Schema.Schema<Proto2FieldDescriptorProto>;

export interface Proto2EnumValueDescriptorProto {
  name?: string;
  number?: number;
}

export const Proto2EnumValueDescriptorProto: Schema.Schema<Proto2EnumValueDescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
})).annotate({ identifier: "Proto2EnumValueDescriptorProto" }) as any as Schema.Schema<Proto2EnumValueDescriptorProto>;

export interface Proto2EnumDescriptorProto {
  name?: string;
  value?: Array<Proto2EnumValueDescriptorProto>;
  /** Support for `export` and `local` keywords on enums. */
  visibility?: "VISIBILITY_UNSET" | "VISIBILITY_LOCAL" | "VISIBILITY_EXPORT" | (string & {});
}

export const Proto2EnumDescriptorProto: Schema.Schema<Proto2EnumDescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Proto2EnumValueDescriptorProto)),
  visibility: Schema.optional(Schema.String),
})).annotate({ identifier: "Proto2EnumDescriptorProto" }) as any as Schema.Schema<Proto2EnumDescriptorProto>;

export interface Proto2OneofDescriptorProto {
  name?: string;
}

export const Proto2OneofDescriptorProto: Schema.Schema<Proto2OneofDescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Proto2OneofDescriptorProto" }) as any as Schema.Schema<Proto2OneofDescriptorProto>;

export interface Proto2DescriptorProto {
  name?: string;
  field?: Array<Proto2FieldDescriptorProto>;
  nestedType?: Array<Proto2DescriptorProto>;
  enumType?: Array<Proto2EnumDescriptorProto>;
  oneofDecl?: Array<Proto2OneofDescriptorProto>;
  /** Support for `export` and `local` keywords on enums. */
  visibility?: "VISIBILITY_UNSET" | "VISIBILITY_LOCAL" | "VISIBILITY_EXPORT" | (string & {});
}

export const Proto2DescriptorProto: Schema.Schema<Proto2DescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  field: Schema.optional(Schema.Array(Proto2FieldDescriptorProto)),
  nestedType: Schema.optional(Schema.Array(Proto2DescriptorProto)),
  enumType: Schema.optional(Schema.Array(Proto2EnumDescriptorProto)),
  oneofDecl: Schema.optional(Schema.Array(Proto2OneofDescriptorProto)),
  visibility: Schema.optional(Schema.String),
})).annotate({ identifier: "Proto2DescriptorProto" }) as any as Schema.Schema<Proto2DescriptorProto>;

export interface Proto2FileDescriptorProto {
  /** file name, relative to root of source tree */
  name?: string;
  /** e.g. "foo", "foo.bar", etc. */
  package?: string;
  /** Names of files imported by this file purely for the purpose of providing option extensions. These are excluded from the dependency list above. */
  optionDependency?: Array<string>;
  /** All top-level definitions in this file. */
  messageType?: Array<Proto2DescriptorProto>;
  enumType?: Array<Proto2EnumDescriptorProto>;
  /** The syntax of the proto file. The supported values are "proto2", "proto3", and "editions". If `edition` is present, this value must be "editions". WARNING: This field should only be used by protobuf plugins or special cases like the proto compiler. Other uses are discouraged and developers should rely on the protoreflect APIs for their client language. */
  syntax?: string;
  /** copybara:strip_begin TODO(b/297898292) Deprecate and remove this field in favor of enums. copybara:strip_end */
  editionDeprecated?: string;
}

export const Proto2FileDescriptorProto: Schema.Schema<Proto2FileDescriptorProto> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  package: Schema.optional(Schema.String),
  optionDependency: Schema.optional(Schema.Array(Schema.String)),
  messageType: Schema.optional(Schema.Array(Proto2DescriptorProto)),
  enumType: Schema.optional(Schema.Array(Proto2EnumDescriptorProto)),
  syntax: Schema.optional(Schema.String),
  editionDeprecated: Schema.optional(Schema.String),
})).annotate({ identifier: "Proto2FileDescriptorProto" }) as any as Schema.Schema<Proto2FileDescriptorProto>;

export interface GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies {
  /** The source field which this field depends on. */
  sourceField?: string;
  /** The value which the source field must have for this field to be allowed to be set. */
  sourceFieldValue?: string;
}

export const GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies> = Schema.suspend(() => Schema.Struct({
  sourceField: Schema.optional(Schema.String),
  sourceFieldValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies>;

export interface GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription {
  /** Output only. The string represenstation of the value that can be set for the field. */
  value?: string;
  /** Output only. Additional description for this value. */
  description?: string;
  /** Output only. Field conditions required for this value to be valid. */
  fieldDependencies?: Array<GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies>;
}

export const GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  fieldDependencies: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription>;

export interface GoogleChromePolicyVersionsV1PolicySchemaRequiredItems {
  /** The value(s) of the field that provoke required field enforcement. An empty field_conditions implies that any value assigned to this field will provoke required field enforcement. */
  fieldConditions?: Array<string>;
  /** The fields that are required as a consequence of the field conditions. */
  requiredFields?: Array<string>;
}

export const GoogleChromePolicyVersionsV1PolicySchemaRequiredItems: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaRequiredItems> = Schema.suspend(() => Schema.Struct({
  fieldConditions: Schema.optional(Schema.Array(Schema.String)),
  requiredFields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchemaRequiredItems" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaRequiredItems>;

export interface GoogleChromePolicyVersionsV1NumericRangeConstraint {
  /** Minimum value. */
  minimum?: string;
  /** Maximum value. */
  maximum?: string;
}

export const GoogleChromePolicyVersionsV1NumericRangeConstraint: Schema.Schema<GoogleChromePolicyVersionsV1NumericRangeConstraint> = Schema.suspend(() => Schema.Struct({
  minimum: Schema.optional(Schema.String),
  maximum: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1NumericRangeConstraint" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1NumericRangeConstraint>;

export interface GoogleChromePolicyVersionsV1UploadedFileConstraints {
  /** File types that can be uploaded for a setting. */
  supportedContentTypes?: Array<"CONTENT_TYPE_UNSPECIFIED" | "CONTENT_TYPE_PLAIN_TEXT" | "CONTENT_TYPE_HTML" | "CONTENT_TYPE_IMAGE_JPEG" | "CONTENT_TYPE_IMAGE_GIF" | "CONTENT_TYPE_IMAGE_PNG" | "CONTENT_TYPE_JSON" | "CONTENT_TYPE_ZIP" | "CONTENT_TYPE_GZIP" | "CONTENT_TYPE_CSV" | "CONTENT_TYPE_YAML" | "CONTENT_TYPE_IMAGE_WEBP" | (string & {})>;
  /** The size limit of uploaded files for a setting, in bytes. */
  sizeLimitBytes?: string;
}

export const GoogleChromePolicyVersionsV1UploadedFileConstraints: Schema.Schema<GoogleChromePolicyVersionsV1UploadedFileConstraints> = Schema.suspend(() => Schema.Struct({
  supportedContentTypes: Schema.optional(Schema.Array(Schema.String)),
  sizeLimitBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1UploadedFileConstraints" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1UploadedFileConstraints>;

export interface GoogleChromePolicyVersionsV1FieldConstraints {
  /** The allowed range for numeric fields. */
  numericRangeConstraint?: GoogleChromePolicyVersionsV1NumericRangeConstraint;
  /** Constraints on the uploaded file of a file policy. If present, this policy requires a URL that can be fetched by uploading a file with the constraints specified in this proto. */
  uploadedFileConstraints?: GoogleChromePolicyVersionsV1UploadedFileConstraints;
}

export const GoogleChromePolicyVersionsV1FieldConstraints: Schema.Schema<GoogleChromePolicyVersionsV1FieldConstraints> = Schema.suspend(() => Schema.Struct({
  numericRangeConstraint: Schema.optional(GoogleChromePolicyVersionsV1NumericRangeConstraint),
  uploadedFileConstraints: Schema.optional(GoogleChromePolicyVersionsV1UploadedFileConstraints),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1FieldConstraints" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1FieldConstraints>;

export interface GoogleChromePolicyVersionsV1PolicySchemaFieldDescription {
  /** Output only. The name of the field for associated with this description. */
  field?: string;
  /** Deprecated. Use name and field_description instead. The description for the field. */
  description?: string;
  /** Output only. Any input constraints associated on the values for the field. */
  inputConstraint?: string;
  /** Output only. If the field has a set of known values, this field will provide a description for these values. */
  knownValueDescriptions?: Array<GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription>;
  /** Output only. Provides the description of the fields nested in this field, if the field is a message type that defines multiple fields. Fields are suggested to be displayed by the ordering in this list, not by field number. */
  nestedFieldDescriptions?: Array<GoogleChromePolicyVersionsV1PolicySchemaFieldDescription>;
  /** Output only. Provides a list of fields and values. At least one of the fields must have the corresponding value in order for this field to be allowed to be set. */
  fieldDependencies?: Array<GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies>;
  /** Output only. Provides a list of fields that are required to be set if this field has a certain value. */
  requiredItems?: Array<GoogleChromePolicyVersionsV1PolicySchemaRequiredItems>;
  /** Output only. Client default if the policy is unset. */
  defaultValue?: unknown;
  /** Output only. The name of the field. */
  name?: string;
  /** Output only. The description of the field. */
  fieldDescription?: string;
  /** Output only. Information on any input constraints associated on the values for the field. */
  fieldConstraints?: GoogleChromePolicyVersionsV1FieldConstraints;
}

export const GoogleChromePolicyVersionsV1PolicySchemaFieldDescription: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldDescription> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  inputConstraint: Schema.optional(Schema.String),
  knownValueDescriptions: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription)),
  nestedFieldDescriptions: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaFieldDescription)),
  fieldDependencies: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies)),
  requiredItems: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaRequiredItems)),
  defaultValue: Schema.optional(Schema.Unknown),
  name: Schema.optional(Schema.String),
  fieldDescription: Schema.optional(Schema.String),
  fieldConstraints: Schema.optional(GoogleChromePolicyVersionsV1FieldConstraints),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchemaFieldDescription" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaFieldDescription>;

export interface GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription {
  /** Output only. The field name associated with the notice. */
  field?: string;
  /** Output only. The value of the field that has a notice. When setting the field to this value, the user may be required to acknowledge the notice message in order for the value to be set. */
  noticeValue?: string;
  /** Output only. The notice message associate with the value of the field. */
  noticeMessage?: string;
  /** Output only. Whether the user needs to acknowledge the notice message before the value can be set. */
  acknowledgementRequired?: boolean;
}

export const GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  noticeValue: Schema.optional(Schema.String),
  noticeMessage: Schema.optional(Schema.String),
  acknowledgementRequired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleChromePolicyVersionsV1PolicyApiLifecycle {
  /** Indicates current life cycle stage of the policy API. */
  policyApiLifecycleStage?: "API_UNSPECIFIED" | "API_PREVIEW" | "API_DEVELOPMENT" | "API_CURRENT" | "API_DEPRECATED" | (string & {});
  /** Description about current life cycle. */
  description?: string;
  /** End supporting date for current policy. Attempting to modify a policy after its end support date will result in a Bad Request (400 error). Could only be set if policy_api_lifecycle_stage is API_DEPRECATED. */
  endSupport?: GoogleTypeDate;
  /** In the event that this policy was deprecated in favor of another policy, the fully qualified namespace(s) of the new policies as they will show in PolicyAPI. Could only be set if policy_api_lifecycle_stage is API_DEPRECATED. */
  deprecatedInFavorOf?: Array<string>;
  /** Corresponding to deprecated_in_favor_of, the fully qualified namespace(s) of the old policies that will be deprecated because of introduction of this policy. */
  scheduledToDeprecatePolicies?: Array<string>;
}

export const GoogleChromePolicyVersionsV1PolicyApiLifecycle: Schema.Schema<GoogleChromePolicyVersionsV1PolicyApiLifecycle> = Schema.suspend(() => Schema.Struct({
  policyApiLifecycleStage: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  endSupport: Schema.optional(GoogleTypeDate),
  deprecatedInFavorOf: Schema.optional(Schema.Array(Schema.String)),
  scheduledToDeprecatePolicies: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyApiLifecycle" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyApiLifecycle>;

export interface GoogleChromePolicyVersionsV1PolicySchema {
  /** Format: name=customers/{customer}/policySchemas/{schema_namespace} */
  name?: string;
  /** Output only. Description about the policy schema for user consumption. */
  policyDescription?: string;
  /** Output only. Additional key names that will be used to identify the target of the policy value. When specifying a `policyTargetKey`, each of the additional keys specified here will have to be included in the `additionalTargetKeys` map. */
  additionalTargetKeyNames?: Array<GoogleChromePolicyVersionsV1AdditionalTargetKeyName>;
  /** Schema definition using proto descriptor. */
  definition?: Proto2FileDescriptorProto;
  /** Output only. Detailed description of each field that is part of the schema. Fields are suggested to be displayed by the ordering in this list, not by field number. */
  fieldDescriptions?: Array<GoogleChromePolicyVersionsV1PolicySchemaFieldDescription>;
  /** Output only. Specific access restrictions related to this policy. */
  accessRestrictions?: Array<string>;
  /** Output only. Special notice messages related to setting certain values in certain fields in the schema. */
  notices?: Array<GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription>;
  /** Output only. URI to related support article for this schema. */
  supportUri?: string;
  /** Output only. The fully qualified name of the policy schema. This value is used to fill the field `policy_schema` in PolicyValue when calling BatchInheritOrgUnitPolicies BatchModifyOrgUnitPolicies BatchModifyGroupPolicies or BatchDeleteGroupPolicies. */
  schemaName?: string;
  /** Output only. Information about applicable target resources for the policy. */
  validTargetResources?: Array<"TARGET_RESOURCE_UNSPECIFIED" | "ORG_UNIT" | "GROUP" | (string & {})>;
  /** Output only. Current lifecycle information. */
  policyApiLifecycle?: GoogleChromePolicyVersionsV1PolicyApiLifecycle;
  /** Title of the category in which a setting belongs. */
  categoryTitle?: string;
  /** Output only. List indicates that the policy will only apply to devices/users on these platforms. */
  supportedPlatforms?: Array<"PLATFORM_UNSPECIFIED" | "CHROME_OS" | "CHROME_BROWSER" | "CHROME_BROWSER_FOR_ANDROID" | "CHROME_BROWSER_FOR_IOS" | (string & {})>;
}

export const GoogleChromePolicyVersionsV1PolicySchema: Schema.Schema<GoogleChromePolicyVersionsV1PolicySchema> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  policyDescription: Schema.optional(Schema.String),
  additionalTargetKeyNames: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1AdditionalTargetKeyName)),
  definition: Schema.optional(Proto2FileDescriptorProto),
  fieldDescriptions: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaFieldDescription)),
  accessRestrictions: Schema.optional(Schema.Array(Schema.String)),
  notices: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription)),
  supportUri: Schema.optional(Schema.String),
  schemaName: Schema.optional(Schema.String),
  validTargetResources: Schema.optional(Schema.Array(Schema.String)),
  policyApiLifecycle: Schema.optional(GoogleChromePolicyVersionsV1PolicyApiLifecycle),
  categoryTitle: Schema.optional(Schema.String),
  supportedPlatforms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicySchema" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicySchema>;

export interface GoogleChromePolicyVersionsV1ListPolicySchemasResponse {
  /** The list of policy schemas that match the query. */
  policySchemas?: Array<GoogleChromePolicyVersionsV1PolicySchema>;
  /** The page token used to get the next page of policy schemas. */
  nextPageToken?: string;
}

export const GoogleChromePolicyVersionsV1ListPolicySchemasResponse: Schema.Schema<GoogleChromePolicyVersionsV1ListPolicySchemasResponse> = Schema.suspend(() => Schema.Struct({
  policySchemas: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicySchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1ListPolicySchemasResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1ListPolicySchemasResponse>;

export interface GoogleChromePolicyVersionsV1NetworkSetting {
  /** The fully qualified name of the network setting. */
  policySchema?: string;
  /** The value of the network setting. */
  value?: Record<string, unknown>;
}

export const GoogleChromePolicyVersionsV1NetworkSetting: Schema.Schema<GoogleChromePolicyVersionsV1NetworkSetting> = Schema.suspend(() => Schema.Struct({
  policySchema: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1NetworkSetting" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1NetworkSetting>;

export interface GoogleChromePolicyVersionsV1DefineCertificateRequest {
  /** Required. The target resource on which this certificate is applied. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") */
  targetResource?: string;
  /** Optional. The optional name of the certificate. If not specified, the certificate issuer will be used as the name. */
  ceritificateName?: string;
  /** Required. The raw contents of the .PEM, .CRT, or .CER file. */
  certificate?: string;
  /** Optional. Certificate settings within the chrome.networks.certificates namespace. */
  settings?: Array<GoogleChromePolicyVersionsV1NetworkSetting>;
}

export const GoogleChromePolicyVersionsV1DefineCertificateRequest: Schema.Schema<GoogleChromePolicyVersionsV1DefineCertificateRequest> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(Schema.String),
  ceritificateName: Schema.optional(Schema.String),
  certificate: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1NetworkSetting)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1DefineCertificateRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1DefineCertificateRequest>;

export interface GoogleChromePolicyVersionsV1DefineCertificateResponse {
  /** The guid of the certificate created by the action. */
  networkId?: string;
  /** the resource at which the certificate is defined. */
  targetResource?: string;
  /** the affiliated settings of the certificate (NOT IMPLEMENTED) */
  settings?: Array<GoogleChromePolicyVersionsV1NetworkSetting>;
}

export const GoogleChromePolicyVersionsV1DefineCertificateResponse: Schema.Schema<GoogleChromePolicyVersionsV1DefineCertificateResponse> = Schema.suspend(() => Schema.Struct({
  networkId: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1NetworkSetting)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1DefineCertificateResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1DefineCertificateResponse>;

export interface GoogleChromePolicyVersionsV1RemoveCertificateRequest {
  /** Required. The target resource on which this certificate will be removed. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") */
  targetResource?: string;
  /** Required. The GUID of the certificate to remove. */
  networkId?: string;
}

export const GoogleChromePolicyVersionsV1RemoveCertificateRequest: Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateRequest> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(Schema.String),
  networkId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1RemoveCertificateRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateRequest>;

export interface GoogleChromePolicyVersionsV1RemoveCertificateResponse {
}

export const GoogleChromePolicyVersionsV1RemoveCertificateResponse: Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromePolicyVersionsV1RemoveCertificateResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateResponse>;

export interface GoogleChromePolicyVersionsV1RemoveNetworkRequest {
  /** Required. The target resource on which this network will be removed. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") */
  targetResource?: string;
  /** Required. The GUID of the network to remove. */
  networkId?: string;
}

export const GoogleChromePolicyVersionsV1RemoveNetworkRequest: Schema.Schema<GoogleChromePolicyVersionsV1RemoveNetworkRequest> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(Schema.String),
  networkId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1RemoveNetworkRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1RemoveNetworkRequest>;

export interface GoogleChromePolicyVersionsV1RemoveNetworkResponse {
}

export const GoogleChromePolicyVersionsV1RemoveNetworkResponse: Schema.Schema<GoogleChromePolicyVersionsV1RemoveNetworkResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromePolicyVersionsV1RemoveNetworkResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1RemoveNetworkResponse>;

export interface GoogleChromePolicyVersionsV1DefineNetworkRequest {
  /** Required. The target resource on which this new network will be defined. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") */
  targetResource?: string;
  /** Required. Name of the new created network. */
  name?: string;
  /** Required. Detailed network settings. */
  settings?: Array<GoogleChromePolicyVersionsV1NetworkSetting>;
}

export const GoogleChromePolicyVersionsV1DefineNetworkRequest: Schema.Schema<GoogleChromePolicyVersionsV1DefineNetworkRequest> = Schema.suspend(() => Schema.Struct({
  targetResource: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1NetworkSetting)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1DefineNetworkRequest" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1DefineNetworkRequest>;

export interface GoogleChromePolicyVersionsV1DefineNetworkResponse {
  /** Network ID of the new created network. */
  networkId?: string;
  /** The target resource on which this new network will be defined. The following resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") */
  targetResource?: string;
  /** Detailed network settings of the new created network */
  settings?: Array<GoogleChromePolicyVersionsV1NetworkSetting>;
}

export const GoogleChromePolicyVersionsV1DefineNetworkResponse: Schema.Schema<GoogleChromePolicyVersionsV1DefineNetworkResponse> = Schema.suspend(() => Schema.Struct({
  networkId: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1NetworkSetting)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1DefineNetworkResponse" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1DefineNetworkResponse>;

export interface GoogleChromePolicyVersionsV1PolicyModificationFieldError {
  /** Output only. The name of the field with the error. */
  field?: string;
  /** Output only. The error message related to the field. */
  error?: string;
}

export const GoogleChromePolicyVersionsV1PolicyModificationFieldError: Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationFieldError> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyModificationFieldError" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationFieldError>;

export interface GoogleChromePolicyVersionsV1PolicyModificationError {
  /** Output only. The specific policy target modification that had error. */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /** Output only. The specific policy schema modification that had an error. */
  policySchema?: string;
  /** Output only. The error messages related to the modification. */
  fieldErrors?: Array<GoogleChromePolicyVersionsV1PolicyModificationFieldError>;
  /** Output only. The non-field errors related to the modification. */
  errors?: Array<string>;
}

export const GoogleChromePolicyVersionsV1PolicyModificationError: Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationError> = Schema.suspend(() => Schema.Struct({
  policyTargetKey: Schema.optional(GoogleChromePolicyVersionsV1PolicyTargetKey),
  policySchema: Schema.optional(Schema.String),
  fieldErrors: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicyModificationFieldError)),
  errors: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyModificationError" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationError>;

export interface GoogleChromePolicyVersionsV1PolicyModificationErrorDetails {
  /** Output only. List of specific policy modifications errors that may have occurred during a modifying request. */
  modificationErrors?: Array<GoogleChromePolicyVersionsV1PolicyModificationError>;
}

export const GoogleChromePolicyVersionsV1PolicyModificationErrorDetails: Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationErrorDetails> = Schema.suspend(() => Schema.Struct({
  modificationErrors: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1PolicyModificationError)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1PolicyModificationErrorDetails" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1PolicyModificationErrorDetails>;

export interface GoogleChromePolicyVersionsV1CertificateReference {
  /** Output only. The obfuscated id of the org unit the referencing network is in. */
  orgUnitId?: string;
  /** Output only. The name of the referencing network. */
  network?: string;
}

export const GoogleChromePolicyVersionsV1CertificateReference: Schema.Schema<GoogleChromePolicyVersionsV1CertificateReference> = Schema.suspend(() => Schema.Struct({
  orgUnitId: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1CertificateReference" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1CertificateReference>;

export interface GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails {
  /** Output only. If the certificate was not removed, a list of references to the certificate that prevented it from being removed. Only unreferenced certificates can be removed. */
  certificateReferences?: Array<GoogleChromePolicyVersionsV1CertificateReference>;
}

export const GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails: Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails> = Schema.suspend(() => Schema.Struct({
  certificateReferences: Schema.optional(Schema.Array(GoogleChromePolicyVersionsV1CertificateReference)),
})).annotate({ identifier: "GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails" }) as any as Schema.Schema<GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an enterprise file from the content provided by user. Returns a public download url for end user. */
export interface UploadMediaRequest {
  /** Required. The customer for which the file upload will apply. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1UploadPolicyFileRequest;
}

export const UploadMediaRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1UploadPolicyFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/files:uploadPolicyFile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = GoogleChromePolicyVersionsV1UploadPolicyFileResponse;
export const UploadMediaResponse = GoogleChromePolicyVersionsV1UploadPolicyFileResponse;

export type UploadMediaError = CommonErrors;

export const uploadMedia: API.OperationMethod<UploadMediaRequest, UploadMediaResponse, UploadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

/** Gets the resolved policy values for a list of policies that match a search query. */
export interface ResolveCustomersPoliciesRequest {
  /** ID of the G Suite account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1ResolveRequest;
}

export const ResolveCustomersPoliciesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1ResolveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveCustomersPoliciesRequest>;

export type ResolveCustomersPoliciesResponse = GoogleChromePolicyVersionsV1ResolveResponse;
export const ResolveCustomersPoliciesResponse = GoogleChromePolicyVersionsV1ResolveResponse;

export type ResolveCustomersPoliciesError = CommonErrors;

export const resolveCustomersPolicies: API.OperationMethod<ResolveCustomersPoliciesRequest, ResolveCustomersPoliciesResponse, ResolveCustomersPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveCustomersPoliciesRequest,
  output: ResolveCustomersPoliciesResponse,
  errors: [],
}));

/** Modify multiple policy values that are applied to a specific org unit. All targets must have the same target format. That is to say that they must point to the same target resource and must have the same keys specified in `additionalTargetKeyNames`, though the values for those keys may be different. On failure the request will return the error details as part of the google.rpc.Status. */
export interface BatchModifyCustomersPoliciesOrgunitsRequest {
  /** ID of the G Suite account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest;
}

export const BatchModifyCustomersPoliciesOrgunitsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/orgunits:batchModify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchModifyCustomersPoliciesOrgunitsRequest>;

export type BatchModifyCustomersPoliciesOrgunitsResponse = GoogleProtobufEmpty;
export const BatchModifyCustomersPoliciesOrgunitsResponse = GoogleProtobufEmpty;

export type BatchModifyCustomersPoliciesOrgunitsError = CommonErrors;

export const batchModifyCustomersPoliciesOrgunits: API.OperationMethod<BatchModifyCustomersPoliciesOrgunitsRequest, BatchModifyCustomersPoliciesOrgunitsResponse, BatchModifyCustomersPoliciesOrgunitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchModifyCustomersPoliciesOrgunitsRequest,
  output: BatchModifyCustomersPoliciesOrgunitsResponse,
  errors: [],
}));

/** Modify multiple policy values that are applied to a specific org unit so that they now inherit the value from a parent (if applicable). All targets must have the same target format. That is to say that they must point to the same target resource and must have the same keys specified in `additionalTargetKeyNames`, though the values for those keys may be different. On failure the request will return the error details as part of the google.rpc.Status. */
export interface BatchInheritCustomersPoliciesOrgunitsRequest {
  /** ID of the G Suite account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest;
}

export const BatchInheritCustomersPoliciesOrgunitsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/orgunits:batchInherit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchInheritCustomersPoliciesOrgunitsRequest>;

export type BatchInheritCustomersPoliciesOrgunitsResponse = GoogleProtobufEmpty;
export const BatchInheritCustomersPoliciesOrgunitsResponse = GoogleProtobufEmpty;

export type BatchInheritCustomersPoliciesOrgunitsError = CommonErrors;

export const batchInheritCustomersPoliciesOrgunits: API.OperationMethod<BatchInheritCustomersPoliciesOrgunitsRequest, BatchInheritCustomersPoliciesOrgunitsResponse, BatchInheritCustomersPoliciesOrgunitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchInheritCustomersPoliciesOrgunitsRequest,
  output: BatchInheritCustomersPoliciesOrgunitsResponse,
  errors: [],
}));

/** Modify multiple policy values that are applied to a specific group. All targets must have the same target format. That is to say that they must point to the same target resource and must have the same keys specified in `additionalTargetKeyNames`, though the values for those keys may be different. On failure the request will return the error details as part of the google.rpc.Status. */
export interface BatchModifyCustomersPoliciesGroupsRequest {
  /** ID of the Google Workspace account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest;
}

export const BatchModifyCustomersPoliciesGroupsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/groups:batchModify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchModifyCustomersPoliciesGroupsRequest>;

export type BatchModifyCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;
export const BatchModifyCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;

export type BatchModifyCustomersPoliciesGroupsError = CommonErrors;

export const batchModifyCustomersPoliciesGroups: API.OperationMethod<BatchModifyCustomersPoliciesGroupsRequest, BatchModifyCustomersPoliciesGroupsResponse, BatchModifyCustomersPoliciesGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchModifyCustomersPoliciesGroupsRequest,
  output: BatchModifyCustomersPoliciesGroupsResponse,
  errors: [],
}));

/** Delete multiple policy values that are applied to a specific group. All targets must have the same target format. That is to say that they must point to the same target resource and must have the same keys specified in `additionalTargetKeyNames`, though the values for those keys may be different. On failure the request will return the error details as part of the google.rpc.Status. */
export interface BatchDeleteCustomersPoliciesGroupsRequest {
  /** ID of the Google Workspace account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest;
}

export const BatchDeleteCustomersPoliciesGroupsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/groups:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteCustomersPoliciesGroupsRequest>;

export type BatchDeleteCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;
export const BatchDeleteCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;

export type BatchDeleteCustomersPoliciesGroupsError = CommonErrors;

export const batchDeleteCustomersPoliciesGroups: API.OperationMethod<BatchDeleteCustomersPoliciesGroupsRequest, BatchDeleteCustomersPoliciesGroupsResponse, BatchDeleteCustomersPoliciesGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteCustomersPoliciesGroupsRequest,
  output: BatchDeleteCustomersPoliciesGroupsResponse,
  errors: [],
}));

/** Retrieve a group priority ordering for an app. The target app must be supplied in `additionalTargetKeyNames` in the PolicyTargetKey. On failure the request will return the error details as part of the google.rpc.Status. */
export interface ListGroupPriorityOrderingCustomersPoliciesGroupsRequest {
  /** Required. ID of the Google Workspace account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest;
}

export const ListGroupPriorityOrderingCustomersPoliciesGroupsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/groups:listGroupPriorityOrdering", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListGroupPriorityOrderingCustomersPoliciesGroupsRequest>;

export type ListGroupPriorityOrderingCustomersPoliciesGroupsResponse = GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse;
export const ListGroupPriorityOrderingCustomersPoliciesGroupsResponse = GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse;

export type ListGroupPriorityOrderingCustomersPoliciesGroupsError = CommonErrors;

export const listGroupPriorityOrderingCustomersPoliciesGroups: API.OperationMethod<ListGroupPriorityOrderingCustomersPoliciesGroupsRequest, ListGroupPriorityOrderingCustomersPoliciesGroupsResponse, ListGroupPriorityOrderingCustomersPoliciesGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListGroupPriorityOrderingCustomersPoliciesGroupsRequest,
  output: ListGroupPriorityOrderingCustomersPoliciesGroupsResponse,
  errors: [],
}));

/** Update a group priority ordering for an app. The target app must be supplied in `additionalTargetKeyNames` in the PolicyTargetKey. On failure the request will return the error details as part of the google.rpc.Status. */
export interface UpdateGroupPriorityOrderingCustomersPoliciesGroupsRequest {
  /** Required. ID of the Google Workspace account or literal "my_customer" for the customer associated to the request. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest;
}

export const UpdateGroupPriorityOrderingCustomersPoliciesGroupsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/groups:updateGroupPriorityOrdering", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGroupPriorityOrderingCustomersPoliciesGroupsRequest>;

export type UpdateGroupPriorityOrderingCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;
export const UpdateGroupPriorityOrderingCustomersPoliciesGroupsResponse = GoogleProtobufEmpty;

export type UpdateGroupPriorityOrderingCustomersPoliciesGroupsError = CommonErrors;

export const updateGroupPriorityOrderingCustomersPoliciesGroups: API.OperationMethod<UpdateGroupPriorityOrderingCustomersPoliciesGroupsRequest, UpdateGroupPriorityOrderingCustomersPoliciesGroupsResponse, UpdateGroupPriorityOrderingCustomersPoliciesGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGroupPriorityOrderingCustomersPoliciesGroupsRequest,
  output: UpdateGroupPriorityOrderingCustomersPoliciesGroupsResponse,
  errors: [],
}));

/** Creates a certificate at a specified OU for a customer. */
export interface DefineCertificateCustomersPoliciesNetworksRequest {
  /** Required. The customer for which the certificate will apply. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1DefineCertificateRequest;
}

export const DefineCertificateCustomersPoliciesNetworksRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1DefineCertificateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/networks:defineCertificate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DefineCertificateCustomersPoliciesNetworksRequest>;

export type DefineCertificateCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1DefineCertificateResponse;
export const DefineCertificateCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1DefineCertificateResponse;

export type DefineCertificateCustomersPoliciesNetworksError = CommonErrors;

export const defineCertificateCustomersPoliciesNetworks: API.OperationMethod<DefineCertificateCustomersPoliciesNetworksRequest, DefineCertificateCustomersPoliciesNetworksResponse, DefineCertificateCustomersPoliciesNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DefineCertificateCustomersPoliciesNetworksRequest,
  output: DefineCertificateCustomersPoliciesNetworksResponse,
  errors: [],
}));

/** Remove an existing certificate by guid. */
export interface RemoveCertificateCustomersPoliciesNetworksRequest {
  /** Required. The customer whose certificate will be removed. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1RemoveCertificateRequest;
}

export const RemoveCertificateCustomersPoliciesNetworksRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1RemoveCertificateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/networks:removeCertificate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveCertificateCustomersPoliciesNetworksRequest>;

export type RemoveCertificateCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1RemoveCertificateResponse;
export const RemoveCertificateCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1RemoveCertificateResponse;

export type RemoveCertificateCustomersPoliciesNetworksError = CommonErrors;

export const removeCertificateCustomersPoliciesNetworks: API.OperationMethod<RemoveCertificateCustomersPoliciesNetworksRequest, RemoveCertificateCustomersPoliciesNetworksResponse, RemoveCertificateCustomersPoliciesNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveCertificateCustomersPoliciesNetworksRequest,
  output: RemoveCertificateCustomersPoliciesNetworksResponse,
  errors: [],
}));

/** Remove an existing network by guid. */
export interface RemoveNetworkCustomersPoliciesNetworksRequest {
  /** Required. The customer whose network will be removed. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1RemoveNetworkRequest;
}

export const RemoveNetworkCustomersPoliciesNetworksRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1RemoveNetworkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/networks:removeNetwork", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveNetworkCustomersPoliciesNetworksRequest>;

export type RemoveNetworkCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1RemoveNetworkResponse;
export const RemoveNetworkCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1RemoveNetworkResponse;

export type RemoveNetworkCustomersPoliciesNetworksError = CommonErrors;

export const removeNetworkCustomersPoliciesNetworks: API.OperationMethod<RemoveNetworkCustomersPoliciesNetworksRequest, RemoveNetworkCustomersPoliciesNetworksResponse, RemoveNetworkCustomersPoliciesNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveNetworkCustomersPoliciesNetworksRequest,
  output: RemoveNetworkCustomersPoliciesNetworksResponse,
  errors: [],
}));

/** Define a new network. */
export interface DefineNetworkCustomersPoliciesNetworksRequest {
  /** Required. The customer who will own this new network. */
  customer: string;
  /** Request body */
  body?: GoogleChromePolicyVersionsV1DefineNetworkRequest;
}

export const DefineNetworkCustomersPoliciesNetworksRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleChromePolicyVersionsV1DefineNetworkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/policies/networks:defineNetwork", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DefineNetworkCustomersPoliciesNetworksRequest>;

export type DefineNetworkCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1DefineNetworkResponse;
export const DefineNetworkCustomersPoliciesNetworksResponse = GoogleChromePolicyVersionsV1DefineNetworkResponse;

export type DefineNetworkCustomersPoliciesNetworksError = CommonErrors;

export const defineNetworkCustomersPoliciesNetworks: API.OperationMethod<DefineNetworkCustomersPoliciesNetworksRequest, DefineNetworkCustomersPoliciesNetworksResponse, DefineNetworkCustomersPoliciesNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DefineNetworkCustomersPoliciesNetworksRequest,
  output: DefineNetworkCustomersPoliciesNetworksResponse,
  errors: [],
}));

/** Get a specific policy schema for a customer by its resource name. */
export interface GetCustomersPolicySchemasRequest {
  /** Required. The policy schema resource name to query. */
  name: string;
}

export const GetCustomersPolicySchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/policySchemas/{policySchemasId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersPolicySchemasRequest>;

export type GetCustomersPolicySchemasResponse = GoogleChromePolicyVersionsV1PolicySchema;
export const GetCustomersPolicySchemasResponse = GoogleChromePolicyVersionsV1PolicySchema;

export type GetCustomersPolicySchemasError = CommonErrors;

export const getCustomersPolicySchemas: API.OperationMethod<GetCustomersPolicySchemasRequest, GetCustomersPolicySchemasResponse, GetCustomersPolicySchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersPolicySchemasRequest,
  output: GetCustomersPolicySchemasResponse,
  errors: [],
}));

/** Gets a list of policy schemas that match a specified filter value for a given customer. */
export interface ListCustomersPolicySchemasRequest {
  /** Required. The customer for which the listing request will apply. */
  parent: string;
  /** The schema filter used to find a particular schema based on fields like its resource name, description and `additionalTargetKeyNames`. */
  filter?: string;
  /** The maximum number of policy schemas to return, defaults to 100 and has a maximum of 1000. */
  pageSize?: number;
  /** The page token used to retrieve a specific page of the listing request. */
  pageToken?: string;
}

export const ListCustomersPolicySchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/policySchemas" }),
  svc,
) as unknown as Schema.Schema<ListCustomersPolicySchemasRequest>;

export type ListCustomersPolicySchemasResponse = GoogleChromePolicyVersionsV1ListPolicySchemasResponse;
export const ListCustomersPolicySchemasResponse = GoogleChromePolicyVersionsV1ListPolicySchemasResponse;

export type ListCustomersPolicySchemasError = CommonErrors;

export const listCustomersPolicySchemas = API.makePaginated(() => ({
  input: ListCustomersPolicySchemasRequest,
  output: ListCustomersPolicySchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

