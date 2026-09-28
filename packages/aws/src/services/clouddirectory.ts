import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudDirectory",
  target: "AmazonCloudDirectory_20170111",
  version: "2017-01-11",
  sigv4: "clouddirectory",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://clouddirectory-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://clouddirectory.${Region}.amazonaws.com`);
              }
              return e(
                `https://clouddirectory-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://clouddirectory.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://clouddirectory.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class BatchWriteException
  extends /*@__PURE__*/ TE.TaggedError("BatchWriteException")<{
    readonly Index?: number;
    readonly Type?: BatchWriteExceptionType;
    readonly message?: string;
  }> {}
export class CannotListParentOfRootException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotListParentOfRootException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DirectoryAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DirectoryDeletedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryDeletedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DirectoryNotDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryNotDisabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DirectoryNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FacetAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "FacetAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FacetInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "FacetInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FacetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "FacetNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FacetValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "FacetValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IncompatibleSchemaException
  extends /*@__PURE__*/ TE.TaggedError(
    "IncompatibleSchemaException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IndexedAttributeMissingException
  extends /*@__PURE__*/ TE.TaggedError(
    "IndexedAttributeMissingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArnException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidAttachmentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAttachmentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidFacetUpdateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidFacetUpdateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRuleException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRuleException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSchemaDocException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSchemaDocException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTaggingRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTaggingRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LinkNameAlreadyInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "LinkNameAlreadyInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotIndexException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotIndexException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotNodeException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotNodeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ObjectAlreadyDetachedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ObjectAlreadyDetachedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ObjectNotDetachedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ObjectNotDetachedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RetryableConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "RetryableConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class SchemaAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "SchemaAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SchemaAlreadyPublishedException
  extends /*@__PURE__*/ TE.TaggedError(
    "SchemaAlreadyPublishedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class StillContainsLinksException
  extends /*@__PURE__*/ TE.TaggedError(
    "StillContainsLinksException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedIndexTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedIndexTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type FacetName = string;
export interface SchemaFacet {
  SchemaArn?: string;
  FacetName?: string;
}
export type AttributeName = string;
export interface AttributeKey {
  SchemaArn: string;
  FacetName: string;
  Name: string;
}
export type StringAttributeValue = string;
export type BinaryAttributeValue = Uint8Array;
export type BooleanAttributeValue = boolean;
export type NumberAttributeValue = string;
export type DatetimeAttributeValue = Date;
export type TypedAttributeValue =
  | {
      StringValue: string;
      BinaryValue?: never;
      BooleanValue?: never;
      NumberValue?: never;
      DatetimeValue?: never;
    }
  | {
      StringValue?: never;
      BinaryValue: Uint8Array;
      BooleanValue?: never;
      NumberValue?: never;
      DatetimeValue?: never;
    }
  | {
      StringValue?: never;
      BinaryValue?: never;
      BooleanValue: boolean;
      NumberValue?: never;
      DatetimeValue?: never;
    }
  | {
      StringValue?: never;
      BinaryValue?: never;
      BooleanValue?: never;
      NumberValue: string;
      DatetimeValue?: never;
    }
  | {
      StringValue?: never;
      BinaryValue?: never;
      BooleanValue?: never;
      NumberValue?: never;
      DatetimeValue: Date;
    };
export interface AttributeKeyAndValue {
  Key: AttributeKey;
  Value: TypedAttributeValue;
}
export type AttributeKeyAndValueList = AttributeKeyAndValue[];
export type SelectorObjectReference = string;
export interface ObjectReference {
  Selector?: string;
}
export interface AddFacetToObjectRequest {
  DirectoryArn: string;
  SchemaFacet: SchemaFacet;
  ObjectAttributeList?: AttributeKeyAndValue[];
  ObjectReference: ObjectReference;
}
export interface AddFacetToObjectResponse {}
export interface ApplySchemaRequest {
  PublishedSchemaArn: string;
  DirectoryArn: string;
}
export interface ApplySchemaResponse {
  AppliedSchemaArn?: string;
  DirectoryArn?: string;
}
export type LinkName = string;
export interface AttachObjectRequest {
  DirectoryArn: string;
  ParentReference: ObjectReference;
  ChildReference: ObjectReference;
  LinkName: string;
}
export type ObjectIdentifier = string;
export interface AttachObjectResponse {
  AttachedObjectIdentifier?: string;
}
export interface AttachPolicyRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export interface AttachPolicyResponse {}
export interface AttachToIndexRequest {
  DirectoryArn: string;
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export interface AttachToIndexResponse {
  AttachedObjectIdentifier?: string;
}
export type TypedLinkName = string;
export interface TypedLinkSchemaAndFacetName {
  SchemaArn: string;
  TypedLinkName: string;
}
export interface AttributeNameAndValue {
  AttributeName: string;
  Value: TypedAttributeValue;
}
export type AttributeNameAndValueList = AttributeNameAndValue[];
export interface AttachTypedLinkRequest {
  DirectoryArn: string;
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  Attributes: AttributeNameAndValue[];
}
export interface TypedLinkSpecifier {
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  IdentityAttributeValues: AttributeNameAndValue[];
}
export interface AttachTypedLinkResponse {
  TypedLinkSpecifier?: TypedLinkSpecifier;
}
export type NextToken = string;
export type NumberResults = number;
export interface BatchListObjectAttributes {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  FacetFilter?: SchemaFacet;
}
export interface BatchListObjectChildren {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchListAttachedIndices {
  TargetReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchListObjectParentPaths {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchGetObjectInformation {
  ObjectReference: ObjectReference;
}
export type AttributeNameList = string[];
export interface BatchGetObjectAttributes {
  ObjectReference: ObjectReference;
  SchemaFacet: SchemaFacet;
  AttributeNames: string[];
}
export interface BatchListObjectParents {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchListObjectPolicies {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchListPolicyAttachments {
  PolicyReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchLookupPolicy {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export type RangeMode =
  | "FIRST"
  | "LAST"
  | "LAST_BEFORE_MISSING_VALUES"
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | (string & {});
export interface TypedAttributeValueRange {
  StartMode: RangeMode;
  StartValue?: TypedAttributeValue;
  EndMode: RangeMode;
  EndValue?: TypedAttributeValue;
}
export interface ObjectAttributeRange {
  AttributeKey?: AttributeKey;
  Range?: TypedAttributeValueRange;
}
export type ObjectAttributeRangeList = ObjectAttributeRange[];
export interface BatchListIndex {
  RangesOnIndexedValues?: ObjectAttributeRange[];
  IndexReference: ObjectReference;
  MaxResults?: number;
  NextToken?: string;
}
export interface TypedLinkAttributeRange {
  AttributeName?: string;
  Range: TypedAttributeValueRange;
}
export type TypedLinkAttributeRangeList = TypedLinkAttributeRange[];
export interface BatchListOutgoingTypedLinks {
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchListIncomingTypedLinks {
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
}
export interface BatchGetLinkAttributes {
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeNames: string[];
}
export interface BatchReadOperation {
  ListObjectAttributes?: BatchListObjectAttributes;
  ListObjectChildren?: BatchListObjectChildren;
  ListAttachedIndices?: BatchListAttachedIndices;
  ListObjectParentPaths?: BatchListObjectParentPaths;
  GetObjectInformation?: BatchGetObjectInformation;
  GetObjectAttributes?: BatchGetObjectAttributes;
  ListObjectParents?: BatchListObjectParents;
  ListObjectPolicies?: BatchListObjectPolicies;
  ListPolicyAttachments?: BatchListPolicyAttachments;
  LookupPolicy?: BatchLookupPolicy;
  ListIndex?: BatchListIndex;
  ListOutgoingTypedLinks?: BatchListOutgoingTypedLinks;
  ListIncomingTypedLinks?: BatchListIncomingTypedLinks;
  GetLinkAttributes?: BatchGetLinkAttributes;
}
export type BatchReadOperationList = BatchReadOperation[];
export type ConsistencyLevel = "SERIALIZABLE" | "EVENTUAL" | (string & {});
export interface BatchReadRequest {
  DirectoryArn: string;
  Operations: BatchReadOperation[];
  ConsistencyLevel?: ConsistencyLevel;
}
export interface BatchListObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
  NextToken?: string;
}
export type LinkNameToObjectIdentifierMap = {
  [key: string]: string | undefined;
};
export interface BatchListObjectChildrenResponse {
  Children?: { [key: string]: string | undefined };
  NextToken?: string;
}
export type SchemaFacetList = SchemaFacet[];
export interface BatchGetObjectInformationResponse {
  SchemaFacets?: SchemaFacet[];
  ObjectIdentifier?: string;
}
export interface BatchGetObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export interface IndexAttachment {
  IndexedAttributes?: AttributeKeyAndValue[];
  ObjectIdentifier?: string;
}
export type IndexAttachmentList = IndexAttachment[];
export interface BatchListAttachedIndicesResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export type PathString = string;
export type ObjectIdentifierList = string[];
export interface PathToObjectIdentifiers {
  Path?: string;
  ObjectIdentifiers?: string[];
}
export type PathToObjectIdentifiersList = PathToObjectIdentifiers[];
export interface BatchListObjectParentPathsResponse {
  PathToObjectIdentifiersList?: PathToObjectIdentifiers[];
  NextToken?: string;
}
export interface BatchListObjectPoliciesResponse {
  AttachedPolicyIds?: string[];
  NextToken?: string;
}
export interface BatchListPolicyAttachmentsResponse {
  ObjectIdentifiers?: string[];
  NextToken?: string;
}
export type PolicyType = string;
export interface PolicyAttachment {
  PolicyId?: string;
  ObjectIdentifier?: string;
  PolicyType?: string;
}
export type PolicyAttachmentList = PolicyAttachment[];
export interface PolicyToPath {
  Path?: string;
  Policies?: PolicyAttachment[];
}
export type PolicyToPathList = PolicyToPath[];
export interface BatchLookupPolicyResponse {
  PolicyToPathList?: PolicyToPath[];
  NextToken?: string;
}
export interface BatchListIndexResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export type TypedLinkSpecifierList = TypedLinkSpecifier[];
export interface BatchListOutgoingTypedLinksResponse {
  TypedLinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export interface BatchListIncomingTypedLinksResponse {
  LinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export interface BatchGetLinkAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export interface ObjectIdentifierAndLinkNameTuple {
  ObjectIdentifier?: string;
  LinkName?: string;
}
export type ObjectIdentifierAndLinkNameList =
  ObjectIdentifierAndLinkNameTuple[];
export interface BatchListObjectParentsResponse {
  ParentLinks?: ObjectIdentifierAndLinkNameTuple[];
  NextToken?: string;
}
export interface BatchReadSuccessfulResponse {
  ListObjectAttributes?: BatchListObjectAttributesResponse;
  ListObjectChildren?: BatchListObjectChildrenResponse;
  GetObjectInformation?: BatchGetObjectInformationResponse;
  GetObjectAttributes?: BatchGetObjectAttributesResponse;
  ListAttachedIndices?: BatchListAttachedIndicesResponse;
  ListObjectParentPaths?: BatchListObjectParentPathsResponse;
  ListObjectPolicies?: BatchListObjectPoliciesResponse;
  ListPolicyAttachments?: BatchListPolicyAttachmentsResponse;
  LookupPolicy?: BatchLookupPolicyResponse;
  ListIndex?: BatchListIndexResponse;
  ListOutgoingTypedLinks?: BatchListOutgoingTypedLinksResponse;
  ListIncomingTypedLinks?: BatchListIncomingTypedLinksResponse;
  GetLinkAttributes?: BatchGetLinkAttributesResponse;
  ListObjectParents?: BatchListObjectParentsResponse;
}
export type BatchReadExceptionType =
  | "ValidationException"
  | "InvalidArnException"
  | "ResourceNotFoundException"
  | "InvalidNextTokenException"
  | "AccessDeniedException"
  | "NotNodeException"
  | "FacetValidationException"
  | "CannotListParentOfRootException"
  | "NotIndexException"
  | "NotPolicyException"
  | "DirectoryNotEnabledException"
  | "LimitExceededException"
  | "InternalServiceException"
  | (string & {});
export type ExceptionMessage = string;
export interface BatchReadException {
  Type?: BatchReadExceptionType;
  Message?: string;
}
export interface BatchReadOperationResponse {
  SuccessfulResponse?: BatchReadSuccessfulResponse;
  ExceptionResponse?: BatchReadException;
}
export type BatchReadOperationResponseList = BatchReadOperationResponse[];
export interface BatchReadResponse {
  Responses?: BatchReadOperationResponse[];
}
export type BatchReferenceName = string;
export interface BatchCreateObject {
  SchemaFacet: SchemaFacet[];
  ObjectAttributeList: AttributeKeyAndValue[];
  ParentReference?: ObjectReference;
  LinkName?: string;
  BatchReferenceName?: string;
}
export interface BatchAttachObject {
  ParentReference: ObjectReference;
  ChildReference: ObjectReference;
  LinkName: string;
}
export interface BatchDetachObject {
  ParentReference: ObjectReference;
  LinkName: string;
  BatchReferenceName?: string;
}
export type UpdateActionType = "CREATE_OR_UPDATE" | "DELETE" | (string & {});
export interface ObjectAttributeAction {
  ObjectAttributeActionType?: UpdateActionType;
  ObjectAttributeUpdateValue?: TypedAttributeValue;
}
export interface ObjectAttributeUpdate {
  ObjectAttributeKey?: AttributeKey;
  ObjectAttributeAction?: ObjectAttributeAction;
}
export type ObjectAttributeUpdateList = ObjectAttributeUpdate[];
export interface BatchUpdateObjectAttributes {
  ObjectReference: ObjectReference;
  AttributeUpdates: ObjectAttributeUpdate[];
}
export interface BatchDeleteObject {
  ObjectReference: ObjectReference;
}
export interface BatchAddFacetToObject {
  SchemaFacet: SchemaFacet;
  ObjectAttributeList: AttributeKeyAndValue[];
  ObjectReference: ObjectReference;
}
export interface BatchRemoveFacetFromObject {
  SchemaFacet: SchemaFacet;
  ObjectReference: ObjectReference;
}
export interface BatchAttachPolicy {
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export interface BatchDetachPolicy {
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export type AttributeKeyList = AttributeKey[];
export interface BatchCreateIndex {
  OrderedIndexedAttributeList: AttributeKey[];
  IsUnique: boolean;
  ParentReference?: ObjectReference;
  LinkName?: string;
  BatchReferenceName?: string;
}
export interface BatchAttachToIndex {
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export interface BatchDetachFromIndex {
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export interface BatchAttachTypedLink {
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  Attributes: AttributeNameAndValue[];
}
export interface BatchDetachTypedLink {
  TypedLinkSpecifier: TypedLinkSpecifier;
}
export interface LinkAttributeAction {
  AttributeActionType?: UpdateActionType;
  AttributeUpdateValue?: TypedAttributeValue;
}
export interface LinkAttributeUpdate {
  AttributeKey?: AttributeKey;
  AttributeAction?: LinkAttributeAction;
}
export type LinkAttributeUpdateList = LinkAttributeUpdate[];
export interface BatchUpdateLinkAttributes {
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeUpdates: LinkAttributeUpdate[];
}
export interface BatchWriteOperation {
  CreateObject?: BatchCreateObject;
  AttachObject?: BatchAttachObject;
  DetachObject?: BatchDetachObject;
  UpdateObjectAttributes?: BatchUpdateObjectAttributes;
  DeleteObject?: BatchDeleteObject;
  AddFacetToObject?: BatchAddFacetToObject;
  RemoveFacetFromObject?: BatchRemoveFacetFromObject;
  AttachPolicy?: BatchAttachPolicy;
  DetachPolicy?: BatchDetachPolicy;
  CreateIndex?: BatchCreateIndex;
  AttachToIndex?: BatchAttachToIndex;
  DetachFromIndex?: BatchDetachFromIndex;
  AttachTypedLink?: BatchAttachTypedLink;
  DetachTypedLink?: BatchDetachTypedLink;
  UpdateLinkAttributes?: BatchUpdateLinkAttributes;
}
export type BatchWriteOperationList = BatchWriteOperation[];
export interface BatchWriteRequest {
  DirectoryArn: string;
  Operations: BatchWriteOperation[];
}
export interface BatchCreateObjectResponse {
  ObjectIdentifier?: string;
}
export interface BatchAttachObjectResponse {
  attachedObjectIdentifier?: string;
}
export interface BatchDetachObjectResponse {
  detachedObjectIdentifier?: string;
}
export interface BatchUpdateObjectAttributesResponse {
  ObjectIdentifier?: string;
}
export interface BatchDeleteObjectResponse {}
export interface BatchAddFacetToObjectResponse {}
export interface BatchRemoveFacetFromObjectResponse {}
export interface BatchAttachPolicyResponse {}
export interface BatchDetachPolicyResponse {}
export interface BatchCreateIndexResponse {
  ObjectIdentifier?: string;
}
export interface BatchAttachToIndexResponse {
  AttachedObjectIdentifier?: string;
}
export interface BatchDetachFromIndexResponse {
  DetachedObjectIdentifier?: string;
}
export interface BatchAttachTypedLinkResponse {
  TypedLinkSpecifier?: TypedLinkSpecifier;
}
export interface BatchDetachTypedLinkResponse {}
export interface BatchUpdateLinkAttributesResponse {}
export interface BatchWriteOperationResponse {
  CreateObject?: BatchCreateObjectResponse;
  AttachObject?: BatchAttachObjectResponse;
  DetachObject?: BatchDetachObjectResponse;
  UpdateObjectAttributes?: BatchUpdateObjectAttributesResponse;
  DeleteObject?: BatchDeleteObjectResponse;
  AddFacetToObject?: BatchAddFacetToObjectResponse;
  RemoveFacetFromObject?: BatchRemoveFacetFromObjectResponse;
  AttachPolicy?: BatchAttachPolicyResponse;
  DetachPolicy?: BatchDetachPolicyResponse;
  CreateIndex?: BatchCreateIndexResponse;
  AttachToIndex?: BatchAttachToIndexResponse;
  DetachFromIndex?: BatchDetachFromIndexResponse;
  AttachTypedLink?: BatchAttachTypedLinkResponse;
  DetachTypedLink?: BatchDetachTypedLinkResponse;
  UpdateLinkAttributes?: BatchUpdateLinkAttributesResponse;
}
export type BatchWriteOperationResponseList = BatchWriteOperationResponse[];
export interface BatchWriteResponse {
  Responses?: BatchWriteOperationResponse[];
}
export type DirectoryName = string;
export interface CreateDirectoryRequest {
  Name: string;
  SchemaArn: string;
}
export type DirectoryArn = string;
export interface CreateDirectoryResponse {
  DirectoryArn: string;
  Name: string;
  ObjectIdentifier: string;
  AppliedSchemaArn: string;
}
export type FacetAttributeType =
  | "STRING"
  | "BINARY"
  | "BOOLEAN"
  | "NUMBER"
  | "DATETIME"
  | "VARIANT"
  | (string & {});
export type RuleKey = string;
export type RuleType =
  | "BINARY_LENGTH"
  | "NUMBER_COMPARISON"
  | "STRING_FROM_SET"
  | "STRING_LENGTH"
  | (string & {});
export type RuleParameterKey = string;
export type RuleParameterValue = string;
export type RuleParameterMap = { [key: string]: string | undefined };
export interface Rule {
  Type?: RuleType;
  Parameters?: { [key: string]: string | undefined };
}
export type RuleMap = { [key: string]: Rule | undefined };
export interface FacetAttributeDefinition {
  Type: FacetAttributeType;
  DefaultValue?: TypedAttributeValue;
  IsImmutable?: boolean;
  Rules?: { [key: string]: Rule | undefined };
}
export interface FacetAttributeReference {
  TargetFacetName: string;
  TargetAttributeName: string;
}
export type RequiredAttributeBehavior =
  | "REQUIRED_ALWAYS"
  | "NOT_REQUIRED"
  | (string & {});
export interface FacetAttribute {
  Name: string;
  AttributeDefinition?: FacetAttributeDefinition;
  AttributeReference?: FacetAttributeReference;
  RequiredBehavior?: RequiredAttributeBehavior;
}
export type FacetAttributeList = FacetAttribute[];
export type ObjectType =
  | "NODE"
  | "LEAF_NODE"
  | "POLICY"
  | "INDEX"
  | (string & {});
export type FacetStyle = "STATIC" | "DYNAMIC" | (string & {});
export interface CreateFacetRequest {
  SchemaArn: string;
  Name: string;
  Attributes?: FacetAttribute[];
  ObjectType?: ObjectType;
  FacetStyle?: FacetStyle;
}
export interface CreateFacetResponse {}
export interface CreateIndexRequest {
  DirectoryArn: string;
  OrderedIndexedAttributeList: AttributeKey[];
  IsUnique: boolean;
  ParentReference?: ObjectReference;
  LinkName?: string;
}
export interface CreateIndexResponse {
  ObjectIdentifier?: string;
}
export interface CreateObjectRequest {
  DirectoryArn: string;
  SchemaFacets: SchemaFacet[];
  ObjectAttributeList?: AttributeKeyAndValue[];
  ParentReference?: ObjectReference;
  LinkName?: string;
}
export interface CreateObjectResponse {
  ObjectIdentifier?: string;
}
export type SchemaName = string;
export interface CreateSchemaRequest {
  Name: string;
}
export interface CreateSchemaResponse {
  SchemaArn?: string;
}
export interface TypedLinkAttributeDefinition {
  Name: string;
  Type: FacetAttributeType;
  DefaultValue?: TypedAttributeValue;
  IsImmutable?: boolean;
  Rules?: { [key: string]: Rule | undefined };
  RequiredBehavior: RequiredAttributeBehavior;
}
export type TypedLinkAttributeDefinitionList = TypedLinkAttributeDefinition[];
export interface TypedLinkFacet {
  Name: string;
  Attributes: TypedLinkAttributeDefinition[];
  IdentityAttributeOrder: string[];
}
export interface CreateTypedLinkFacetRequest {
  SchemaArn: string;
  Facet: TypedLinkFacet;
}
export interface CreateTypedLinkFacetResponse {}
export interface DeleteDirectoryRequest {
  DirectoryArn: string;
}
export interface DeleteDirectoryResponse {
  DirectoryArn: string;
}
export interface DeleteFacetRequest {
  SchemaArn: string;
  Name: string;
}
export interface DeleteFacetResponse {}
export interface DeleteObjectRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
}
export interface DeleteObjectResponse {}
export interface DeleteSchemaRequest {
  SchemaArn: string;
}
export interface DeleteSchemaResponse {
  SchemaArn?: string;
}
export interface DeleteTypedLinkFacetRequest {
  SchemaArn: string;
  Name: string;
}
export interface DeleteTypedLinkFacetResponse {}
export interface DetachFromIndexRequest {
  DirectoryArn: string;
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export interface DetachFromIndexResponse {
  DetachedObjectIdentifier?: string;
}
export interface DetachObjectRequest {
  DirectoryArn: string;
  ParentReference: ObjectReference;
  LinkName: string;
}
export interface DetachObjectResponse {
  DetachedObjectIdentifier?: string;
}
export interface DetachPolicyRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export interface DetachPolicyResponse {}
export interface DetachTypedLinkRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
}
export interface DetachTypedLinkResponse {}
export interface DisableDirectoryRequest {
  DirectoryArn: string;
}
export interface DisableDirectoryResponse {
  DirectoryArn: string;
}
export interface EnableDirectoryRequest {
  DirectoryArn: string;
}
export interface EnableDirectoryResponse {
  DirectoryArn: string;
}
export interface GetAppliedSchemaVersionRequest {
  SchemaArn: string;
}
export interface GetAppliedSchemaVersionResponse {
  AppliedSchemaArn?: string;
}
export interface GetDirectoryRequest {
  DirectoryArn: string;
}
export type DirectoryState = "ENABLED" | "DISABLED" | "DELETED" | (string & {});
export interface Directory {
  Name?: string;
  DirectoryArn?: string;
  State?: DirectoryState;
  CreationDateTime?: Date;
}
export interface GetDirectoryResponse {
  Directory: Directory;
}
export interface GetFacetRequest {
  SchemaArn: string;
  Name: string;
}
export interface Facet {
  Name?: string;
  ObjectType?: ObjectType;
  FacetStyle?: FacetStyle;
}
export interface GetFacetResponse {
  Facet?: Facet;
}
export interface GetLinkAttributesRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeNames: string[];
  ConsistencyLevel?: ConsistencyLevel;
}
export interface GetLinkAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export interface GetObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  ConsistencyLevel?: ConsistencyLevel;
  SchemaFacet: SchemaFacet;
  AttributeNames: string[];
}
export interface GetObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export interface GetObjectInformationRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface GetObjectInformationResponse {
  SchemaFacets?: SchemaFacet[];
  ObjectIdentifier?: string;
}
export interface GetSchemaAsJsonRequest {
  SchemaArn: string;
}
export type SchemaJsonDocument = string;
export interface GetSchemaAsJsonResponse {
  Name?: string;
  Document?: string;
}
export interface GetTypedLinkFacetInformationRequest {
  SchemaArn: string;
  Name: string;
}
export interface GetTypedLinkFacetInformationResponse {
  IdentityAttributeOrder?: string[];
}
export interface ListAppliedSchemaArnsRequest {
  DirectoryArn: string;
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Arns = string[];
export interface ListAppliedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export interface ListAttachedIndicesRequest {
  DirectoryArn: string;
  TargetReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListAttachedIndicesResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export interface ListDevelopmentSchemaArnsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListDevelopmentSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export interface ListDirectoriesRequest {
  NextToken?: string;
  MaxResults?: number;
  state?: DirectoryState;
}
export type DirectoryList = Directory[];
export interface ListDirectoriesResponse {
  Directories: Directory[];
  NextToken?: string;
}
export interface ListFacetAttributesRequest {
  SchemaArn: string;
  Name: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListFacetAttributesResponse {
  Attributes?: FacetAttribute[];
  NextToken?: string;
}
export interface ListFacetNamesRequest {
  SchemaArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type FacetNameList = string[];
export interface ListFacetNamesResponse {
  FacetNames?: string[];
  NextToken?: string;
}
export interface ListIncomingTypedLinksRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListIncomingTypedLinksResponse {
  LinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export interface ListIndexRequest {
  DirectoryArn: string;
  RangesOnIndexedValues?: ObjectAttributeRange[];
  IndexReference: ObjectReference;
  MaxResults?: number;
  NextToken?: string;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListIndexResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export interface ListManagedSchemaArnsRequest {
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListManagedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export interface ListObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
  FacetFilter?: SchemaFacet;
}
export interface ListObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
  NextToken?: string;
}
export interface ListObjectChildrenRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListObjectChildrenResponse {
  Children?: { [key: string]: string | undefined };
  NextToken?: string;
}
export interface ListObjectParentPathsRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListObjectParentPathsResponse {
  PathToObjectIdentifiersList?: PathToObjectIdentifiers[];
  NextToken?: string;
}
export interface ListObjectParentsRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
  IncludeAllLinksToEachParent?: boolean;
}
export type ObjectIdentifierToLinkNameMap = {
  [key: string]: string | undefined;
};
export interface ListObjectParentsResponse {
  Parents?: { [key: string]: string | undefined };
  NextToken?: string;
  ParentLinks?: ObjectIdentifierAndLinkNameTuple[];
}
export interface ListObjectPoliciesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListObjectPoliciesResponse {
  AttachedPolicyIds?: string[];
  NextToken?: string;
}
export interface ListOutgoingTypedLinksRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListOutgoingTypedLinksResponse {
  TypedLinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export interface ListPolicyAttachmentsRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export interface ListPolicyAttachmentsResponse {
  ObjectIdentifiers?: string[];
  NextToken?: string;
}
export interface ListPublishedSchemaArnsRequest {
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListPublishedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export type TagsNumberResults = number;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface ListTypedLinkFacetAttributesRequest {
  SchemaArn: string;
  Name: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTypedLinkFacetAttributesResponse {
  Attributes?: TypedLinkAttributeDefinition[];
  NextToken?: string;
}
export interface ListTypedLinkFacetNamesRequest {
  SchemaArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TypedLinkNameList = string[];
export interface ListTypedLinkFacetNamesResponse {
  FacetNames?: string[];
  NextToken?: string;
}
export interface LookupPolicyRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export interface LookupPolicyResponse {
  PolicyToPathList?: PolicyToPath[];
  NextToken?: string;
}
export type Version = string;
export interface PublishSchemaRequest {
  DevelopmentSchemaArn: string;
  Version: string;
  MinorVersion?: string;
  Name?: string;
}
export interface PublishSchemaResponse {
  PublishedSchemaArn?: string;
}
export interface PutSchemaFromJsonRequest {
  SchemaArn: string;
  Document: string;
}
export interface PutSchemaFromJsonResponse {
  Arn?: string;
}
export interface RemoveFacetFromObjectRequest {
  DirectoryArn: string;
  SchemaFacet: SchemaFacet;
  ObjectReference: ObjectReference;
}
export interface RemoveFacetFromObjectResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface FacetAttributeUpdate {
  Attribute?: FacetAttribute;
  Action?: UpdateActionType;
}
export type FacetAttributeUpdateList = FacetAttributeUpdate[];
export interface UpdateFacetRequest {
  SchemaArn: string;
  Name: string;
  AttributeUpdates?: FacetAttributeUpdate[];
  ObjectType?: ObjectType;
}
export interface UpdateFacetResponse {}
export interface UpdateLinkAttributesRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeUpdates: LinkAttributeUpdate[];
}
export interface UpdateLinkAttributesResponse {}
export interface UpdateObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  AttributeUpdates: ObjectAttributeUpdate[];
}
export interface UpdateObjectAttributesResponse {
  ObjectIdentifier?: string;
}
export interface UpdateSchemaRequest {
  SchemaArn: string;
  Name: string;
}
export interface UpdateSchemaResponse {
  SchemaArn?: string;
}
export interface TypedLinkFacetAttributeUpdate {
  Attribute: TypedLinkAttributeDefinition;
  Action: UpdateActionType;
}
export type TypedLinkFacetAttributeUpdateList = TypedLinkFacetAttributeUpdate[];
export interface UpdateTypedLinkFacetRequest {
  SchemaArn: string;
  Name: string;
  AttributeUpdates: TypedLinkFacetAttributeUpdate[];
  IdentityAttributeOrder: string[];
}
export interface UpdateTypedLinkFacetResponse {}
export interface UpgradeAppliedSchemaRequest {
  PublishedSchemaArn: string;
  DirectoryArn: string;
  DryRun?: boolean;
}
export interface UpgradeAppliedSchemaResponse {
  UpgradedSchemaArn?: string;
  DirectoryArn?: string;
}
export interface UpgradePublishedSchemaRequest {
  DevelopmentSchemaArn: string;
  PublishedSchemaArn: string;
  MinorVersion: string;
  DryRun?: boolean;
}
export interface UpgradePublishedSchemaResponse {
  UpgradedSchemaArn?: string;
}
export type BatchOperationIndex = number;
export type BatchWriteExceptionType =
  | "InternalServiceException"
  | "ValidationException"
  | "InvalidArnException"
  | "LinkNameAlreadyInUseException"
  | "StillContainsLinksException"
  | "FacetValidationException"
  | "ObjectNotDetachedException"
  | "ResourceNotFoundException"
  | "AccessDeniedException"
  | "InvalidAttachmentException"
  | "NotIndexException"
  | "NotNodeException"
  | "IndexedAttributeMissingException"
  | "ObjectAlreadyDetachedException"
  | "NotPolicyException"
  | "DirectoryNotEnabledException"
  | "LimitExceededException"
  | "UnsupportedIndexTypeException"
  | (string & {});
export type AddFacetToObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new Facet to an object. An object can have more than one facet applied on it.
 */
export const addFacetToObject: API.OperationMethod<
  AddFacetToObjectRequest,
  AddFacetToObjectResponse,
  AddFacetToObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/facets",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      SchemaFacet: i_SchemaFacet,
      ObjectAttributeList: D.list(i_AttributeKeyAndValue),
      ObjectReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFacetToObject",
})) as any;

export type ApplySchemaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | SchemaAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Copies the input published schema, at the specified version, into the Directory with the same
 * name and version as that of the published schema.
 */
export const applySchema: API.OperationMethod<
  ApplySchemaRequest,
  ApplySchemaResponse,
  ApplySchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/apply",
    input: {
      PublishedSchemaArn: 0,
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    SchemaAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplySchema",
})) as any;

export type AttachObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | LimitExceededException
  | LinkNameAlreadyInUseException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an existing object to another object. An object can be accessed in two
 * ways:
 *
 * - Using the path
 *
 * - Using `ObjectIdentifier`
 */
export const attachObject: API.OperationMethod<
  AttachObjectRequest,
  AttachObjectResponse,
  AttachObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/attach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ParentReference: i_ObjectReference,
      ChildReference: i_ObjectReference,
      LinkName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    LimitExceededException,
    LinkNameAlreadyInUseException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachObject",
})) as any;

export type AttachPolicyError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | NotPolicyException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a policy object to a regular object. An object can have a limited number of attached
 * policies.
 */
export const attachPolicy: API.OperationMethod<
  AttachPolicyRequest,
  AttachPolicyResponse,
  AttachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/policy/attach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      PolicyReference: i_ObjectReference,
      ObjectReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    NotPolicyException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPolicy",
})) as any;

export type AttachToIndexError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | IndexedAttributeMissingException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | LimitExceededException
  | LinkNameAlreadyInUseException
  | NotIndexException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Attaches the specified object to the specified index.
 */
export const attachToIndex: API.OperationMethod<
  AttachToIndexRequest,
  AttachToIndexResponse,
  AttachToIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/index/attach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      IndexReference: i_ObjectReference,
      TargetReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    IndexedAttributeMissingException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    LimitExceededException,
    LinkNameAlreadyInUseException,
    NotIndexException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachToIndex",
})) as any;

export type AttachTypedLinkError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a typed link to a specified source and target object. For more information, see Typed Links.
 */
export const attachTypedLink: API.OperationMethod<
  AttachTypedLinkRequest,
  AttachTypedLinkResponse,
  AttachTypedLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/typedlink/attach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      SourceObjectReference: i_ObjectReference,
      TargetObjectReference: i_ObjectReference,
      TypedLinkFacet: i_TypedLinkSchemaAndFacetName,
      Attributes: D.list(i_AttributeNameAndValue),
    },
    output: { TypedLinkSpecifier: o_TypedLinkSpecifier },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachTypedLink",
})) as any;

export type BatchReadError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Performs all the read operations in a batch.
 */
export const batchRead: API.OperationMethod<
  BatchReadRequest,
  BatchReadResponse,
  BatchReadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/batchread",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      Operations: D.list({
        ListObjectAttributes: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
          FacetFilter: i_SchemaFacet,
        },
        ListObjectChildren: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        ListAttachedIndices: {
          TargetReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        ListObjectParentPaths: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        GetObjectInformation: { ObjectReference: i_ObjectReference },
        GetObjectAttributes: {
          ObjectReference: i_ObjectReference,
          SchemaFacet: i_SchemaFacet,
          AttributeNames: 0,
        },
        ListObjectParents: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        ListObjectPolicies: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        ListPolicyAttachments: {
          PolicyReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        LookupPolicy: {
          ObjectReference: i_ObjectReference,
          NextToken: 0,
          MaxResults: 0,
        },
        ListIndex: {
          RangesOnIndexedValues: D.list(i_ObjectAttributeRange),
          IndexReference: i_ObjectReference,
          MaxResults: 0,
          NextToken: 0,
        },
        ListOutgoingTypedLinks: {
          ObjectReference: i_ObjectReference,
          FilterAttributeRanges: D.list(i_TypedLinkAttributeRange),
          FilterTypedLink: i_TypedLinkSchemaAndFacetName,
          NextToken: 0,
          MaxResults: 0,
        },
        ListIncomingTypedLinks: {
          ObjectReference: i_ObjectReference,
          FilterAttributeRanges: D.list(i_TypedLinkAttributeRange),
          FilterTypedLink: i_TypedLinkSchemaAndFacetName,
          NextToken: 0,
          MaxResults: 0,
        },
        GetLinkAttributes: {
          TypedLinkSpecifier: i_TypedLinkSpecifier,
          AttributeNames: 0,
        },
      }),
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    output: {
      Responses: D.list({
        SuccessfulResponse: {
          ListObjectAttributes: { Attributes: D.list(o_AttributeKeyAndValue) },
          GetObjectAttributes: { Attributes: D.list(o_AttributeKeyAndValue) },
          ListAttachedIndices: { IndexAttachments: D.list(o_IndexAttachment) },
          ListIndex: { IndexAttachments: D.list(o_IndexAttachment) },
          ListOutgoingTypedLinks: {
            TypedLinkSpecifiers: D.list(o_TypedLinkSpecifier),
          },
          ListIncomingTypedLinks: {
            LinkSpecifiers: D.list(o_TypedLinkSpecifier),
          },
          GetLinkAttributes: { Attributes: D.list(o_AttributeKeyAndValue) },
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRead",
})) as any;

export type BatchWriteError =
  | AccessDeniedException
  | BatchWriteException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Performs all the write operations in a batch. Either all the operations succeed or
 * none.
 */
export const batchWrite: API.OperationMethod<
  BatchWriteRequest,
  BatchWriteResponse,
  BatchWriteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/batchwrite",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      Operations: D.list({
        CreateObject: {
          SchemaFacet: D.list(i_SchemaFacet),
          ObjectAttributeList: D.list(i_AttributeKeyAndValue),
          ParentReference: i_ObjectReference,
          LinkName: 0,
          BatchReferenceName: 0,
        },
        AttachObject: {
          ParentReference: i_ObjectReference,
          ChildReference: i_ObjectReference,
          LinkName: 0,
        },
        DetachObject: {
          ParentReference: i_ObjectReference,
          LinkName: 0,
          BatchReferenceName: 0,
        },
        UpdateObjectAttributes: {
          ObjectReference: i_ObjectReference,
          AttributeUpdates: D.list(i_ObjectAttributeUpdate),
        },
        DeleteObject: { ObjectReference: i_ObjectReference },
        AddFacetToObject: {
          SchemaFacet: i_SchemaFacet,
          ObjectAttributeList: D.list(i_AttributeKeyAndValue),
          ObjectReference: i_ObjectReference,
        },
        RemoveFacetFromObject: {
          SchemaFacet: i_SchemaFacet,
          ObjectReference: i_ObjectReference,
        },
        AttachPolicy: {
          PolicyReference: i_ObjectReference,
          ObjectReference: i_ObjectReference,
        },
        DetachPolicy: {
          PolicyReference: i_ObjectReference,
          ObjectReference: i_ObjectReference,
        },
        CreateIndex: {
          OrderedIndexedAttributeList: D.list(i_AttributeKey),
          IsUnique: 0,
          ParentReference: i_ObjectReference,
          LinkName: 0,
          BatchReferenceName: 0,
        },
        AttachToIndex: {
          IndexReference: i_ObjectReference,
          TargetReference: i_ObjectReference,
        },
        DetachFromIndex: {
          IndexReference: i_ObjectReference,
          TargetReference: i_ObjectReference,
        },
        AttachTypedLink: {
          SourceObjectReference: i_ObjectReference,
          TargetObjectReference: i_ObjectReference,
          TypedLinkFacet: i_TypedLinkSchemaAndFacetName,
          Attributes: D.list(i_AttributeNameAndValue),
        },
        DetachTypedLink: { TypedLinkSpecifier: i_TypedLinkSpecifier },
        UpdateLinkAttributes: {
          TypedLinkSpecifier: i_TypedLinkSpecifier,
          AttributeUpdates: D.list(i_LinkAttributeUpdate),
        },
      }),
    },
    output: {
      Responses: D.list({
        AttachTypedLink: { TypedLinkSpecifier: o_TypedLinkSpecifier },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BatchWriteException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchWrite",
})) as any;

export type CreateDirectoryError =
  | AccessDeniedException
  | DirectoryAlreadyExistsException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Directory by copying the published schema into the
 * directory. A directory cannot be created without a schema.
 *
 * You can also quickly create a directory using a managed schema, called the
 * `QuickStartSchema`. For more information, see Managed Schema in the *Amazon Cloud Directory Developer Guide*.
 */
export const createDirectory: API.OperationMethod<
  CreateDirectoryRequest,
  CreateDirectoryResponse,
  CreateDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/directory/create",
    input: { Name: 0, SchemaArn: D.m({ header: "x-amz-data-partition" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryAlreadyExistsException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectory",
})) as any;

export type CreateFacetError =
  | AccessDeniedException
  | FacetAlreadyExistsException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidRuleException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Facet in a schema. Facet creation is allowed only
 * in development or applied schemas.
 */
export const createFacet: API.OperationMethod<
  CreateFacetRequest,
  CreateFacetResponse,
  CreateFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/facet/create",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Name: 0,
      Attributes: D.list(i_FacetAttribute),
      ObjectType: 0,
      FacetStyle: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetAlreadyExistsException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidRuleException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFacet",
})) as any;

export type CreateIndexError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | LinkNameAlreadyInUseException
  | ResourceNotFoundException
  | RetryableConflictException
  | UnsupportedIndexTypeException
  | ValidationException
  | CommonErrors;
/**
 * Creates an index object. See Indexing and search for more information.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/index",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      OrderedIndexedAttributeList: D.list(i_AttributeKey),
      IsUnique: 0,
      ParentReference: i_ObjectReference,
      LinkName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    LinkNameAlreadyInUseException,
    ResourceNotFoundException,
    RetryableConflictException,
    UnsupportedIndexTypeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
})) as any;

export type CreateObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | LinkNameAlreadyInUseException
  | ResourceNotFoundException
  | RetryableConflictException
  | UnsupportedIndexTypeException
  | ValidationException
  | CommonErrors;
/**
 * Creates an object in a Directory. Additionally attaches the object to
 * a parent, if a parent reference and `LinkName` is specified. An object is simply a
 * collection of Facet attributes. You can also use this API call to create a
 * policy object, if the facet from which you create the object is a policy facet.
 */
export const createObject: API.OperationMethod<
  CreateObjectRequest,
  CreateObjectResponse,
  CreateObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      SchemaFacets: D.list(i_SchemaFacet),
      ObjectAttributeList: D.list(i_AttributeKeyAndValue),
      ParentReference: i_ObjectReference,
      LinkName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    LinkNameAlreadyInUseException,
    ResourceNotFoundException,
    RetryableConflictException,
    UnsupportedIndexTypeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateObject",
})) as any;

export type CreateSchemaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | RetryableConflictException
  | SchemaAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new schema in a development state. A schema can exist in three
 * phases:
 *
 * - *Development:* This is a mutable phase of the schema. All new
 * schemas are in the development phase. Once the schema is finalized, it can be
 * published.
 *
 * - *Published:* Published schemas are immutable and have a version
 * associated with them.
 *
 * - *Applied:* Applied schemas are mutable in a way that allows you
 * to add new schema facets. You can also add new, nonrequired attributes to existing schema
 * facets. You can apply only published schemas to directories.
 */
export const createSchema: API.OperationMethod<
  CreateSchemaRequest,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/create",
    input: { Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    SchemaAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
})) as any;

export type CreateTypedLinkFacetError =
  | AccessDeniedException
  | FacetAlreadyExistsException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidRuleException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Creates a TypedLinkFacet. For more information, see Typed Links.
 */
export const createTypedLinkFacet: API.OperationMethod<
  CreateTypedLinkFacetRequest,
  CreateTypedLinkFacetResponse,
  CreateTypedLinkFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/typedlink/facet/create",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Facet: {
        Name: 0,
        Attributes: D.list(i_TypedLinkAttributeDefinition),
        IdentityAttributeOrder: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetAlreadyExistsException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidRuleException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTypedLinkFacet",
})) as any;

export type DeleteDirectoryError =
  | AccessDeniedException
  | DirectoryDeletedException
  | DirectoryNotDisabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a directory. Only disabled directories can be deleted. A deleted directory cannot be undone. Exercise extreme
 * caution
 * when deleting directories.
 */
export const deleteDirectory: API.OperationMethod<
  DeleteDirectoryRequest,
  DeleteDirectoryResponse,
  DeleteDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/directory",
    input: { DirectoryArn: D.m({ header: "x-amz-data-partition" }) },
  },
  errors: [
    AccessDeniedException,
    DirectoryDeletedException,
    DirectoryNotDisabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectory",
})) as any;

export type DeleteFacetError =
  | AccessDeniedException
  | FacetInUseException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given Facet. All attributes and Rules
 * that are associated with the facet will be deleted. Only development schema facets are allowed
 * deletion.
 */
export const deleteFacet: API.OperationMethod<
  DeleteFacetRequest,
  DeleteFacetResponse,
  DeleteFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/facet/delete",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetInUseException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFacet",
})) as any;

export type DeleteObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ObjectNotDetachedException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an object and its associated attributes. Only objects with no children and no
 * parents can be deleted. The maximum number of attributes that can be deleted during an object deletion is 30. For more information, see Amazon Cloud Directory Limits.
 */
export const deleteObject: API.OperationMethod<
  DeleteObjectRequest,
  DeleteObjectResponse,
  DeleteObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/delete",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ObjectNotDetachedException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObject",
})) as any;

export type DeleteSchemaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | StillContainsLinksException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given schema. Schemas in a development and published state can only be deleted.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaRequest,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    StillContainsLinksException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
})) as any;

export type DeleteTypedLinkFacetError =
  | AccessDeniedException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a TypedLinkFacet. For more information, see Typed Links.
 */
export const deleteTypedLinkFacet: API.OperationMethod<
  DeleteTypedLinkFacetRequest,
  DeleteTypedLinkFacetResponse,
  DeleteTypedLinkFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/typedlink/facet/delete",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTypedLinkFacet",
})) as any;

export type DetachFromIndexError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | NotIndexException
  | ObjectAlreadyDetachedException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Detaches the specified object from the specified index.
 */
export const detachFromIndex: API.OperationMethod<
  DetachFromIndexRequest,
  DetachFromIndexResponse,
  DetachFromIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/index/detach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      IndexReference: i_ObjectReference,
      TargetReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    NotIndexException,
    ObjectAlreadyDetachedException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachFromIndex",
})) as any;

export type DetachObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | NotNodeException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Detaches a given object from the parent object. The object that is to be detached from the
 * parent is specified by the link name.
 */
export const detachObject: API.OperationMethod<
  DetachObjectRequest,
  DetachObjectResponse,
  DetachObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/detach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ParentReference: i_ObjectReference,
      LinkName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    NotNodeException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachObject",
})) as any;

export type DetachPolicyError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | NotPolicyException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Detaches a policy from an object.
 */
export const detachPolicy: API.OperationMethod<
  DetachPolicyRequest,
  DetachPolicyResponse,
  DetachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/policy/detach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      PolicyReference: i_ObjectReference,
      ObjectReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    NotPolicyException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPolicy",
})) as any;

export type DetachTypedLinkError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Detaches a typed link from a specified source and target object. For more information, see Typed Links.
 */
export const detachTypedLink: API.OperationMethod<
  DetachTypedLinkRequest,
  DetachTypedLinkResponse,
  DetachTypedLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/typedlink/detach",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      TypedLinkSpecifier: i_TypedLinkSpecifier,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachTypedLink",
})) as any;

export type DisableDirectoryError =
  | AccessDeniedException
  | DirectoryDeletedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Disables the specified directory. Disabled directories cannot be read or written to.
 * Only enabled directories can be disabled. Disabled directories may be reenabled.
 */
export const disableDirectory: API.OperationMethod<
  DisableDirectoryRequest,
  DisableDirectoryResponse,
  DisableDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/directory/disable",
    input: { DirectoryArn: D.m({ header: "x-amz-data-partition" }) },
  },
  errors: [
    AccessDeniedException,
    DirectoryDeletedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableDirectory",
})) as any;

export type EnableDirectoryError =
  | AccessDeniedException
  | DirectoryDeletedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Enables the specified directory. Only disabled directories can be enabled. Once
 * enabled, the directory can then be read and written to.
 */
export const enableDirectory: API.OperationMethod<
  EnableDirectoryRequest,
  EnableDirectoryResponse,
  EnableDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/directory/enable",
    input: { DirectoryArn: D.m({ header: "x-amz-data-partition" }) },
  },
  errors: [
    AccessDeniedException,
    DirectoryDeletedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableDirectory",
})) as any;

export type GetAppliedSchemaVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns current applied schema version ARN, including the minor version in use.
 */
export const getAppliedSchemaVersion: API.OperationMethod<
  GetAppliedSchemaVersionRequest,
  GetAppliedSchemaVersionResponse,
  GetAppliedSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/getappliedschema",
    input: { SchemaArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppliedSchemaVersion",
})) as any;

export type GetDirectoryError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata about a directory.
 */
export const getDirectory: API.OperationMethod<
  GetDirectoryRequest,
  GetDirectoryResponse,
  GetDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/directory/get",
    input: { DirectoryArn: D.m({ header: "x-amz-data-partition" }) },
    output: { Directory: o_Directory },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectory",
})) as any;

export type GetFacetError =
  | AccessDeniedException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of the Facet, such as facet name, attributes, Rules, or `ObjectType`. You can call this on all kinds of schema
 * facets -- published, development, or applied.
 */
export const getFacet: API.OperationMethod<
  GetFacetRequest,
  GetFacetResponse,
  GetFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/facet",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFacet",
})) as any;

export type GetLinkAttributesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves attributes that are associated with a typed link.
 */
export const getLinkAttributes: API.OperationMethod<
  GetLinkAttributesRequest,
  GetLinkAttributesResponse,
  GetLinkAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/attributes/get",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      TypedLinkSpecifier: i_TypedLinkSpecifier,
      AttributeNames: 0,
      ConsistencyLevel: 0,
    },
    output: { Attributes: D.list(o_AttributeKeyAndValue) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkAttributes",
})) as any;

export type GetObjectAttributesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves attributes within a facet that are associated with an object.
 */
export const getObjectAttributes: API.OperationMethod<
  GetObjectAttributesRequest,
  GetObjectAttributesResponse,
  GetObjectAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/attributes/get",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
      SchemaFacet: i_SchemaFacet,
      AttributeNames: 0,
    },
    output: { Attributes: D.list(o_AttributeKeyAndValue) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectAttributes",
})) as any;

export type GetObjectInformationError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata about an object.
 */
export const getObjectInformation: API.OperationMethod<
  GetObjectInformationRequest,
  GetObjectInformationResponse,
  GetObjectInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/information",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectInformation",
})) as any;

export type GetSchemaAsJsonError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a JSON representation of the schema. See JSON Schema Format for more information.
 */
export const getSchemaAsJson: API.OperationMethod<
  GetSchemaAsJsonRequest,
  GetSchemaAsJsonResponse,
  GetSchemaAsJsonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/json",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaAsJson",
})) as any;

export type GetTypedLinkFacetInformationError =
  | AccessDeniedException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns the identity attribute order for a specific TypedLinkFacet. For more information, see Typed Links.
 */
export const getTypedLinkFacetInformation: API.OperationMethod<
  GetTypedLinkFacetInformationRequest,
  GetTypedLinkFacetInformationResponse,
  GetTypedLinkFacetInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/facet/get",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTypedLinkFacetInformation",
})) as any;

export type ListAppliedSchemaArnsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists schema major versions applied to a directory. If `SchemaArn` is provided, lists the minor version.
 */
export const listAppliedSchemaArns: API.PaginatedOperationMethod<
  ListAppliedSchemaArnsRequest,
  ListAppliedSchemaArnsResponse,
  ListAppliedSchemaArnsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/applied",
    input: { DirectoryArn: 0, SchemaArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppliedSchemaArns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAttachedIndicesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists indices attached to the specified object.
 */
export const listAttachedIndices: API.PaginatedOperationMethod<
  ListAttachedIndicesRequest,
  ListAttachedIndicesResponse,
  ListAttachedIndicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/indices",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      TargetReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    output: { IndexAttachments: D.list(o_IndexAttachment) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedIndices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDevelopmentSchemaArnsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves each Amazon Resource Name (ARN) of schemas in the development
 * state.
 */
export const listDevelopmentSchemaArns: API.PaginatedOperationMethod<
  ListDevelopmentSchemaArnsRequest,
  ListDevelopmentSchemaArnsResponse,
  ListDevelopmentSchemaArnsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/development",
    input: { NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevelopmentSchemaArns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDirectoriesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists directories created within an account.
 */
export const listDirectories: API.PaginatedOperationMethod<
  ListDirectoriesRequest,
  ListDirectoriesResponse,
  ListDirectoriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/directory/list",
    input: { NextToken: 0, MaxResults: 0, state: 0 },
    output: { Directories: D.list(o_Directory) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDirectories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFacetAttributesError =
  | AccessDeniedException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves attributes attached to the facet.
 */
export const listFacetAttributes: API.PaginatedOperationMethod<
  ListFacetAttributesRequest,
  ListFacetAttributesResponse,
  ListFacetAttributesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/facet/attributes",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Name: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Attributes: D.list({
        AttributeDefinition: { DefaultValue: o_TypedAttributeValue },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFacetAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFacetNamesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the names of facets that exist in a schema.
 */
export const listFacetNames: API.PaginatedOperationMethod<
  ListFacetNamesRequest,
  ListFacetNamesResponse,
  ListFacetNamesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/facet/list",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFacetNames",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIncomingTypedLinksError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all the incoming TypedLinkSpecifier
 * information for an object. It also supports filtering by typed link facet and identity
 * attributes. For more information, see Typed Links.
 */
export const listIncomingTypedLinks: API.OperationMethod<
  ListIncomingTypedLinksRequest,
  ListIncomingTypedLinksResponse,
  ListIncomingTypedLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/incoming",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      FilterAttributeRanges: D.list(i_TypedLinkAttributeRange),
      FilterTypedLink: i_TypedLinkSchemaAndFacetName,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: 0,
    },
    output: { LinkSpecifiers: D.list(o_TypedLinkSpecifier) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIncomingTypedLinks",
})) as any;

export type ListIndexError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | NotIndexException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists objects attached to the specified index.
 */
export const listIndex: API.PaginatedOperationMethod<
  ListIndexRequest,
  ListIndexResponse,
  ListIndexError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/index/targets",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      RangesOnIndexedValues: D.list(i_ObjectAttributeRange),
      IndexReference: i_ObjectReference,
      MaxResults: 0,
      NextToken: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    output: { IndexAttachments: D.list(o_IndexAttachment) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    NotIndexException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndex",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedSchemaArnsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the major version families of each managed schema. If a major version ARN is provided as SchemaArn, the minor version revisions in that family are listed instead.
 */
export const listManagedSchemaArns: API.PaginatedOperationMethod<
  ListManagedSchemaArnsRequest,
  ListManagedSchemaArnsResponse,
  ListManagedSchemaArnsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/managed",
    input: { SchemaArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedSchemaArns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectAttributesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attributes that are associated with an object.
 */
export const listObjectAttributes: API.PaginatedOperationMethod<
  ListObjectAttributesRequest,
  ListObjectAttributesResponse,
  ListObjectAttributesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/attributes",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
      FacetFilter: i_SchemaFacet,
    },
    output: { Attributes: D.list(o_AttributeKeyAndValue) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectChildrenError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | NotNodeException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of child objects that are associated with a given
 * object.
 */
export const listObjectChildren: API.PaginatedOperationMethod<
  ListObjectChildrenRequest,
  ListObjectChildrenResponse,
  ListObjectChildrenError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/children",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    NotNodeException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectChildren",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectParentPathsError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all available parent paths for any object type such as node, leaf node,
 * policy node, and index node objects. For more information about objects, see Directory Structure.
 *
 * Use this API to evaluate all parents for an object. The call returns all objects from
 * the root of the directory up to the requested object. The API returns the number of paths
 * based on user-defined `MaxResults`, in case there are multiple paths to the parent.
 * The order of the paths and nodes returned is consistent among multiple API calls unless the
 * objects are deleted or moved. Paths not leading to the directory root are ignored from the
 * target object.
 */
export const listObjectParentPaths: API.PaginatedOperationMethod<
  ListObjectParentPathsRequest,
  ListObjectParentPathsResponse,
  ListObjectParentPathsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/parentpaths",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectParentPaths",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectParentsError =
  | AccessDeniedException
  | CannotListParentOfRootException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists parent objects that are associated with a given object in pagination
 * fashion.
 */
export const listObjectParents: API.PaginatedOperationMethod<
  ListObjectParentsRequest,
  ListObjectParentsResponse,
  ListObjectParentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/parent",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
      IncludeAllLinksToEachParent: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    CannotListParentOfRootException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectParents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectPoliciesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns policies attached to an object in pagination fashion.
 */
export const listObjectPolicies: API.PaginatedOperationMethod<
  ListObjectPoliciesRequest,
  ListObjectPoliciesResponse,
  ListObjectPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/object/policy",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutgoingTypedLinksError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all the outgoing TypedLinkSpecifier
 * information for an object. It also supports filtering by typed link facet and identity
 * attributes. For more information, see Typed Links.
 */
export const listOutgoingTypedLinks: API.OperationMethod<
  ListOutgoingTypedLinksRequest,
  ListOutgoingTypedLinksResponse,
  ListOutgoingTypedLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/outgoing",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      FilterAttributeRanges: D.list(i_TypedLinkAttributeRange),
      FilterTypedLink: i_TypedLinkSchemaAndFacetName,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: 0,
    },
    output: { TypedLinkSpecifiers: D.list(o_TypedLinkSpecifier) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutgoingTypedLinks",
})) as any;

export type ListPolicyAttachmentsError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | NotPolicyException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns all of the `ObjectIdentifiers` to which a given policy is attached.
 */
export const listPolicyAttachments: API.PaginatedOperationMethod<
  ListPolicyAttachmentsRequest,
  ListPolicyAttachmentsResponse,
  ListPolicyAttachmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/policy/attachment",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      PolicyReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
      ConsistencyLevel: D.m({ header: "x-amz-consistency-level" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    NotPolicyException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPublishedSchemaArnsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists the major version families of each published schema. If a major version ARN is provided as `SchemaArn`, the minor version revisions in that family are listed instead.
 */
export const listPublishedSchemaArns: API.PaginatedOperationMethod<
  ListPublishedSchemaArnsRequest,
  ListPublishedSchemaArnsResponse,
  ListPublishedSchemaArnsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/schema/published",
    input: { SchemaArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublishedSchemaArns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidTaggingRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns tags for a resource. Tagging is currently supported only for directories with a
 * limit of 50 tags per directory. All 50 tags are returned for a given directory with this API
 * call.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/tags",
    input: { ResourceArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidTaggingRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypedLinkFacetAttributesError =
  | AccessDeniedException
  | FacetNotFoundException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all attribute definitions for a particular TypedLinkFacet. For more information, see Typed Links.
 */
export const listTypedLinkFacetAttributes: API.PaginatedOperationMethod<
  ListTypedLinkFacetAttributesRequest,
  ListTypedLinkFacetAttributesResponse,
  ListTypedLinkFacetAttributesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/facet/attributes",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Name: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Attributes: D.list({ DefaultValue: o_TypedAttributeValue }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypedLinkFacetAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypedLinkFacetNamesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of `TypedLink` facet names for a particular schema.
 * For more information, see Typed Links.
 */
export const listTypedLinkFacetNames: API.PaginatedOperationMethod<
  ListTypedLinkFacetNamesRequest,
  ListTypedLinkFacetNamesResponse,
  ListTypedLinkFacetNamesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/facet/list",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypedLinkFacetNames",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type LookupPolicyError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | InternalServiceException
  | InvalidArnException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Lists all policies from the root of the Directory to the object
 * specified. If there are no policies present, an empty list is returned. If policies are
 * present, and if some objects don't have the policies attached, it returns the `ObjectIdentifier`
 * for such objects. If policies are present, it returns `ObjectIdentifier`, `policyId`, and
 * `policyType`. Paths that don't lead to the root from the target object are ignored. For more
 * information, see Policies.
 */
export const lookupPolicy: API.PaginatedOperationMethod<
  LookupPolicyRequest,
  LookupPolicyResponse,
  LookupPolicyError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/policy/lookup",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LookupPolicy",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PublishSchemaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | SchemaAlreadyPublishedException
  | ValidationException
  | CommonErrors;
/**
 * Publishes a development schema with a major version and a recommended minor version.
 */
export const publishSchema: API.OperationMethod<
  PublishSchemaRequest,
  PublishSchemaResponse,
  PublishSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/publish",
    input: {
      DevelopmentSchemaArn: D.m({ header: "x-amz-data-partition" }),
      Version: 0,
      MinorVersion: 0,
      Name: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    SchemaAlreadyPublishedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishSchema",
})) as any;

export type PutSchemaFromJsonError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidRuleException
  | InvalidSchemaDocException
  | LimitExceededException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Allows a schema to be updated using JSON upload. Only available for development schemas. See JSON Schema Format for more information.
 */
export const putSchemaFromJson: API.OperationMethod<
  PutSchemaFromJsonRequest,
  PutSchemaFromJsonResponse,
  PutSchemaFromJsonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/json",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Document: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidRuleException,
    InvalidSchemaDocException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchemaFromJson",
})) as any;

export type RemoveFacetFromObjectError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified facet from the specified object.
 */
export const removeFacetFromObject: API.OperationMethod<
  RemoveFacetFromObjectRequest,
  RemoveFacetFromObjectResponse,
  RemoveFacetFromObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/facets/delete",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      SchemaFacet: i_SchemaFacet,
      ObjectReference: i_ObjectReference,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFacetFromObject",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidTaggingRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * An API operation for adding tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/tags/add",
    input: { ResourceArn: 0, Tags: D.list({ Key: 0, Value: 0 }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidTaggingRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | InvalidTaggingRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * An API operation for removing tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/tags/remove",
    input: { ResourceArn: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidTaggingRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateFacetError =
  | AccessDeniedException
  | FacetNotFoundException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidFacetUpdateException
  | InvalidRuleException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Does the following:
 *
 * - Adds new `Attributes`, `Rules`, or `ObjectTypes`.
 *
 * - Updates existing `Attributes`, `Rules`, or `ObjectTypes`.
 *
 * - Deletes existing `Attributes`, `Rules`, or `ObjectTypes`.
 */
export const updateFacet: API.OperationMethod<
  UpdateFacetRequest,
  UpdateFacetResponse,
  UpdateFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/facet",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Name: 0,
      AttributeUpdates: D.list({ Attribute: i_FacetAttribute, Action: 0 }),
      ObjectType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidFacetUpdateException,
    InvalidRuleException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFacet",
})) as any;

export type UpdateLinkAttributesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Updates a given typed link’s attributes. Attributes to be updated must not contribute to the typed link’s identity, as defined by its `IdentityAttributeOrder`.
 */
export const updateLinkAttributes: API.OperationMethod<
  UpdateLinkAttributesRequest,
  UpdateLinkAttributesResponse,
  UpdateLinkAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /amazonclouddirectory/2017-01-11/typedlink/attributes/update",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      TypedLinkSpecifier: i_TypedLinkSpecifier,
      AttributeUpdates: D.list(i_LinkAttributeUpdate),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLinkAttributes",
})) as any;

export type UpdateObjectAttributesError =
  | AccessDeniedException
  | DirectoryNotEnabledException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | LinkNameAlreadyInUseException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Updates a given object's attributes.
 */
export const updateObjectAttributes: API.OperationMethod<
  UpdateObjectAttributesRequest,
  UpdateObjectAttributesResponse,
  UpdateObjectAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/object/update",
    input: {
      DirectoryArn: D.m({ header: "x-amz-data-partition" }),
      ObjectReference: i_ObjectReference,
      AttributeUpdates: D.list(i_ObjectAttributeUpdate),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    LinkNameAlreadyInUseException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateObjectAttributes",
})) as any;

export type UpdateSchemaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidArnException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Updates the schema name with a new name. Only development schema names can be
 * updated.
 */
export const updateSchema: API.OperationMethod<
  UpdateSchemaRequest,
  UpdateSchemaResponse,
  UpdateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/update",
    input: { SchemaArn: D.m({ header: "x-amz-data-partition" }), Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchema",
})) as any;

export type UpdateTypedLinkFacetError =
  | AccessDeniedException
  | FacetNotFoundException
  | FacetValidationException
  | InternalServiceException
  | InvalidArnException
  | InvalidFacetUpdateException
  | InvalidRuleException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Updates a TypedLinkFacet. For more information, see Typed Links.
 */
export const updateTypedLinkFacet: API.OperationMethod<
  UpdateTypedLinkFacetRequest,
  UpdateTypedLinkFacetResponse,
  UpdateTypedLinkFacetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/typedlink/facet",
    input: {
      SchemaArn: D.m({ header: "x-amz-data-partition" }),
      Name: 0,
      AttributeUpdates: D.list({
        Attribute: i_TypedLinkAttributeDefinition,
        Action: 0,
      }),
      IdentityAttributeOrder: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    FacetNotFoundException,
    FacetValidationException,
    InternalServiceException,
    InvalidArnException,
    InvalidFacetUpdateException,
    InvalidRuleException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTypedLinkFacet",
})) as any;

export type UpgradeAppliedSchemaError =
  | AccessDeniedException
  | IncompatibleSchemaException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | ResourceNotFoundException
  | RetryableConflictException
  | SchemaAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Upgrades a single directory in-place using the `PublishedSchemaArn` with schema updates found in `MinorVersion`. Backwards-compatible minor version upgrades are instantaneously available for readers on all objects in the directory. Note: This is a synchronous API call and upgrades only one schema on a given directory per call. To upgrade multiple directories from one schema, you would need to call this API on each directory.
 */
export const upgradeAppliedSchema: API.OperationMethod<
  UpgradeAppliedSchemaRequest,
  UpgradeAppliedSchemaResponse,
  UpgradeAppliedSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/upgradeapplied",
    input: { PublishedSchemaArn: 0, DirectoryArn: 0, DryRun: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IncompatibleSchemaException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    ResourceNotFoundException,
    RetryableConflictException,
    SchemaAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpgradeAppliedSchema",
})) as any;

export type UpgradePublishedSchemaError =
  | AccessDeniedException
  | IncompatibleSchemaException
  | InternalServiceException
  | InvalidArnException
  | InvalidAttachmentException
  | LimitExceededException
  | ResourceNotFoundException
  | RetryableConflictException
  | ValidationException
  | CommonErrors;
/**
 * Upgrades a published schema under a new minor version revision using the current contents of `DevelopmentSchemaArn`.
 */
export const upgradePublishedSchema: API.OperationMethod<
  UpgradePublishedSchemaRequest,
  UpgradePublishedSchemaResponse,
  UpgradePublishedSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /amazonclouddirectory/2017-01-11/schema/upgradepublished",
    input: {
      DevelopmentSchemaArn: 0,
      PublishedSchemaArn: 0,
      MinorVersion: 0,
      DryRun: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IncompatibleSchemaException,
    InternalServiceException,
    InvalidArnException,
    InvalidAttachmentException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpgradePublishedSchema",
})) as any;

const i_AttributeKey: D.LazyStruct = () => ({
  SchemaArn: 0,
  FacetName: 0,
  Name: 0,
});
const i_AttributeKeyAndValue: D.LazyStruct = () => ({
  Key: i_AttributeKey,
  Value: i_TypedAttributeValue,
});
const i_AttributeNameAndValue: D.LazyStruct = () => ({
  AttributeName: 0,
  Value: i_TypedAttributeValue,
});
const i_FacetAttribute: D.LazyStruct = () => ({
  Name: 0,
  AttributeDefinition: {
    Type: 0,
    DefaultValue: i_TypedAttributeValue,
    IsImmutable: 0,
    Rules: D.map(i_Rule),
  },
  AttributeReference: { TargetFacetName: 0, TargetAttributeName: 0 },
  RequiredBehavior: 0,
});
const i_LinkAttributeUpdate: D.LazyStruct = () => ({
  AttributeKey: i_AttributeKey,
  AttributeAction: {
    AttributeActionType: 0,
    AttributeUpdateValue: i_TypedAttributeValue,
  },
});
const i_ObjectAttributeRange: D.LazyStruct = () => ({
  AttributeKey: i_AttributeKey,
  Range: i_TypedAttributeValueRange,
});
const i_ObjectAttributeUpdate: D.LazyStruct = () => ({
  ObjectAttributeKey: i_AttributeKey,
  ObjectAttributeAction: {
    ObjectAttributeActionType: 0,
    ObjectAttributeUpdateValue: i_TypedAttributeValue,
  },
});
const i_ObjectReference: D.LazyStruct = () => ({ Selector: 0 });
const i_SchemaFacet: D.LazyStruct = () => ({ SchemaArn: 0, FacetName: 0 });
const i_TypedLinkAttributeDefinition: D.LazyStruct = () => ({
  Name: 0,
  Type: 0,
  DefaultValue: i_TypedAttributeValue,
  IsImmutable: 0,
  Rules: D.map(i_Rule),
  RequiredBehavior: 0,
});
const i_TypedLinkAttributeRange: D.LazyStruct = () => ({
  AttributeName: 0,
  Range: i_TypedAttributeValueRange,
});
const i_TypedLinkSchemaAndFacetName: D.LazyStruct = () => ({
  SchemaArn: 0,
  TypedLinkName: 0,
});
const i_TypedLinkSpecifier: D.LazyStruct = () => ({
  TypedLinkFacet: i_TypedLinkSchemaAndFacetName,
  SourceObjectReference: i_ObjectReference,
  TargetObjectReference: i_ObjectReference,
  IdentityAttributeValues: D.list(i_AttributeNameAndValue),
});
const o_AttributeKeyAndValue: D.LazyStruct = () => ({
  Value: o_TypedAttributeValue,
});
const o_Directory: D.LazyStruct = () => ({ CreationDateTime: D.ts });
const o_IndexAttachment: D.LazyStruct = () => ({
  IndexedAttributes: D.list(o_AttributeKeyAndValue),
});
const o_TypedAttributeValue: D.LazyStruct = () => ({
  BinaryValue: D.blob,
  DatetimeValue: D.ts,
});
const o_TypedLinkSpecifier: D.LazyStruct = () => ({
  IdentityAttributeValues: D.list({ Value: o_TypedAttributeValue }),
});
const i_Rule: D.LazyStruct = () => ({ Type: 0, Parameters: 0 });
const i_TypedAttributeValue: D.LazyStruct = () => ({
  StringValue: 0,
  BinaryValue: 0,
  BooleanValue: 0,
  NumberValue: 0,
  DatetimeValue: 0,
});
const i_TypedAttributeValueRange: D.LazyStruct = () => ({
  StartMode: 0,
  StartValue: i_TypedAttributeValue,
  EndMode: 0,
  EndValue: i_TypedAttributeValue,
});
