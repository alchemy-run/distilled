import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "CloudDirectory",
  serviceShapeName: "AmazonCloudDirectory_20170111",
});
const auth = T.AwsAuthSigv4({ name: "clouddirectory" });
const ver = T.ServiceVersion("2017-01-11");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type Arn = string;
export type FacetName = string;
export type AttributeName = string;
export type StringAttributeValue = string;
export type BinaryAttributeValue = Uint8Array;
export type BooleanAttributeValue = boolean;
export type NumberAttributeValue = string;
export type DatetimeAttributeValue = Date;
export type SelectorObjectReference = string;
export type ExceptionMessage = string;
export type LinkName = string;
export type ObjectIdentifier = string;
export type TypedLinkName = string;
export type NextToken = string;
export type NumberResults = number;
export type PathString = string;
export type PolicyType = string;
export type BatchReferenceName = string;
export type BatchOperationIndex = number;
export type DirectoryName = string;
export type DirectoryArn = string;
export type RuleKey = string;
export type RuleParameterKey = string;
export type RuleParameterValue = string;
export type SchemaName = string;
export type SchemaJsonDocument = string;
export type TagsNumberResults = number;
export type TagKey = string;
export type TagValue = string;
export type Version = string;

//# Schemas
export interface SchemaFacet {
  SchemaArn?: string;
  FacetName?: string;
}
export const SchemaFacet = S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    FacetName: S.optional(S.String),
  }),
).annotate({ identifier: "SchemaFacet" }) as any as S.Schema<SchemaFacet>;
export interface AttributeKey {
  SchemaArn: string;
  FacetName: string;
  Name: string;
}
export const AttributeKey = S.suspend(() =>
  S.Struct({ SchemaArn: S.String, FacetName: S.String, Name: S.String }),
).annotate({ identifier: "AttributeKey" }) as any as S.Schema<AttributeKey>;
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
export const TypedAttributeValue = S.Union([
  S.Struct({ StringValue: S.String }),
  S.Struct({ BinaryValue: T.Blob }),
  S.Struct({ BooleanValue: S.Boolean }),
  S.Struct({ NumberValue: S.String }),
  S.Struct({ DatetimeValue: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
]);
export interface AttributeKeyAndValue {
  Key: AttributeKey;
  Value: TypedAttributeValue;
}
export const AttributeKeyAndValue = S.suspend(() =>
  S.Struct({ Key: AttributeKey, Value: TypedAttributeValue }),
).annotate({
  identifier: "AttributeKeyAndValue",
}) as any as S.Schema<AttributeKeyAndValue>;
export type AttributeKeyAndValueList = AttributeKeyAndValue[];
export const AttributeKeyAndValueList = S.Array(AttributeKeyAndValue);
export interface ObjectReference {
  Selector?: string;
}
export const ObjectReference = S.suspend(() =>
  S.Struct({ Selector: S.optional(S.String) }),
).annotate({
  identifier: "ObjectReference",
}) as any as S.Schema<ObjectReference>;
export interface AddFacetToObjectRequest {
  DirectoryArn: string;
  SchemaFacet: SchemaFacet;
  ObjectAttributeList?: AttributeKeyAndValue[];
  ObjectReference: ObjectReference;
}
export const AddFacetToObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    SchemaFacet: SchemaFacet,
    ObjectAttributeList: S.optional(AttributeKeyAndValueList),
    ObjectReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/facets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddFacetToObjectRequest",
}) as any as S.Schema<AddFacetToObjectRequest>;
export interface AddFacetToObjectResponse {}
export const AddFacetToObjectResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "AddFacetToObjectResponse",
}) as any as S.Schema<AddFacetToObjectResponse>;
export interface ApplySchemaRequest {
  PublishedSchemaArn: string;
  DirectoryArn: string;
}
export const ApplySchemaRequest = S.suspend(() =>
  S.Struct({
    PublishedSchemaArn: S.String,
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/apply",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ApplySchemaRequest",
}) as any as S.Schema<ApplySchemaRequest>;
export interface ApplySchemaResponse {
  AppliedSchemaArn?: string;
  DirectoryArn?: string;
}
export const ApplySchemaResponse = S.suspend(() =>
  S.Struct({
    AppliedSchemaArn: S.optional(S.String),
    DirectoryArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplySchemaResponse",
}) as any as S.Schema<ApplySchemaResponse>;
export interface AttachObjectRequest {
  DirectoryArn: string;
  ParentReference: ObjectReference;
  ChildReference: ObjectReference;
  LinkName: string;
}
export const AttachObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ParentReference: ObjectReference,
    ChildReference: ObjectReference,
    LinkName: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/attach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachObjectRequest",
}) as any as S.Schema<AttachObjectRequest>;
export interface AttachObjectResponse {
  AttachedObjectIdentifier?: string;
}
export const AttachObjectResponse = S.suspend(() =>
  S.Struct({ AttachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "AttachObjectResponse",
}) as any as S.Schema<AttachObjectResponse>;
export interface AttachPolicyRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export const AttachPolicyRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    PolicyReference: ObjectReference,
    ObjectReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/policy/attach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachPolicyRequest",
}) as any as S.Schema<AttachPolicyRequest>;
export interface AttachPolicyResponse {}
export const AttachPolicyResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "AttachPolicyResponse",
}) as any as S.Schema<AttachPolicyResponse>;
export interface AttachToIndexRequest {
  DirectoryArn: string;
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export const AttachToIndexRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    IndexReference: ObjectReference,
    TargetReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/index/attach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachToIndexRequest",
}) as any as S.Schema<AttachToIndexRequest>;
export interface AttachToIndexResponse {
  AttachedObjectIdentifier?: string;
}
export const AttachToIndexResponse = S.suspend(() =>
  S.Struct({ AttachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "AttachToIndexResponse",
}) as any as S.Schema<AttachToIndexResponse>;
export interface TypedLinkSchemaAndFacetName {
  SchemaArn: string;
  TypedLinkName: string;
}
export const TypedLinkSchemaAndFacetName = S.suspend(() =>
  S.Struct({ SchemaArn: S.String, TypedLinkName: S.String }),
).annotate({
  identifier: "TypedLinkSchemaAndFacetName",
}) as any as S.Schema<TypedLinkSchemaAndFacetName>;
export interface AttributeNameAndValue {
  AttributeName: string;
  Value: TypedAttributeValue;
}
export const AttributeNameAndValue = S.suspend(() =>
  S.Struct({ AttributeName: S.String, Value: TypedAttributeValue }),
).annotate({
  identifier: "AttributeNameAndValue",
}) as any as S.Schema<AttributeNameAndValue>;
export type AttributeNameAndValueList = AttributeNameAndValue[];
export const AttributeNameAndValueList = S.Array(AttributeNameAndValue);
export interface AttachTypedLinkRequest {
  DirectoryArn: string;
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  Attributes: AttributeNameAndValue[];
}
export const AttachTypedLinkRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    SourceObjectReference: ObjectReference,
    TargetObjectReference: ObjectReference,
    TypedLinkFacet: TypedLinkSchemaAndFacetName,
    Attributes: AttributeNameAndValueList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/attach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachTypedLinkRequest",
}) as any as S.Schema<AttachTypedLinkRequest>;
export interface TypedLinkSpecifier {
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  IdentityAttributeValues: AttributeNameAndValue[];
}
export const TypedLinkSpecifier = S.suspend(() =>
  S.Struct({
    TypedLinkFacet: TypedLinkSchemaAndFacetName,
    SourceObjectReference: ObjectReference,
    TargetObjectReference: ObjectReference,
    IdentityAttributeValues: AttributeNameAndValueList,
  }),
).annotate({
  identifier: "TypedLinkSpecifier",
}) as any as S.Schema<TypedLinkSpecifier>;
export interface AttachTypedLinkResponse {
  TypedLinkSpecifier?: TypedLinkSpecifier;
}
export const AttachTypedLinkResponse = S.suspend(() =>
  S.Struct({ TypedLinkSpecifier: S.optional(TypedLinkSpecifier) }),
).annotate({
  identifier: "AttachTypedLinkResponse",
}) as any as S.Schema<AttachTypedLinkResponse>;
export interface BatchListObjectAttributes {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  FacetFilter?: SchemaFacet;
}
export const BatchListObjectAttributes = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    FacetFilter: S.optional(SchemaFacet),
  }),
).annotate({
  identifier: "BatchListObjectAttributes",
}) as any as S.Schema<BatchListObjectAttributes>;
export interface BatchListObjectChildren {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListObjectChildren = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListObjectChildren",
}) as any as S.Schema<BatchListObjectChildren>;
export interface BatchListAttachedIndices {
  TargetReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListAttachedIndices = S.suspend(() =>
  S.Struct({
    TargetReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListAttachedIndices",
}) as any as S.Schema<BatchListAttachedIndices>;
export interface BatchListObjectParentPaths {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListObjectParentPaths = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListObjectParentPaths",
}) as any as S.Schema<BatchListObjectParentPaths>;
export interface BatchGetObjectInformation {
  ObjectReference: ObjectReference;
}
export const BatchGetObjectInformation = S.suspend(() =>
  S.Struct({ ObjectReference: ObjectReference }),
).annotate({
  identifier: "BatchGetObjectInformation",
}) as any as S.Schema<BatchGetObjectInformation>;
export type AttributeNameList = string[];
export const AttributeNameList = S.Array(S.String);
export interface BatchGetObjectAttributes {
  ObjectReference: ObjectReference;
  SchemaFacet: SchemaFacet;
  AttributeNames: string[];
}
export const BatchGetObjectAttributes = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    SchemaFacet: SchemaFacet,
    AttributeNames: AttributeNameList,
  }),
).annotate({
  identifier: "BatchGetObjectAttributes",
}) as any as S.Schema<BatchGetObjectAttributes>;
export interface BatchListObjectParents {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListObjectParents = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListObjectParents",
}) as any as S.Schema<BatchListObjectParents>;
export interface BatchListObjectPolicies {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListObjectPolicies = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListObjectPolicies",
}) as any as S.Schema<BatchListObjectPolicies>;
export interface BatchListPolicyAttachments {
  PolicyReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListPolicyAttachments = S.suspend(() =>
  S.Struct({
    PolicyReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListPolicyAttachments",
}) as any as S.Schema<BatchListPolicyAttachments>;
export interface BatchLookupPolicy {
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchLookupPolicy = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchLookupPolicy",
}) as any as S.Schema<BatchLookupPolicy>;
export type RangeMode =
  | "FIRST"
  | "LAST"
  | "LAST_BEFORE_MISSING_VALUES"
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | (string & {});
export const RangeMode = S.String;
export interface TypedAttributeValueRange {
  StartMode: RangeMode;
  StartValue?: TypedAttributeValue;
  EndMode: RangeMode;
  EndValue?: TypedAttributeValue;
}
export const TypedAttributeValueRange = S.suspend(() =>
  S.Struct({
    StartMode: RangeMode,
    StartValue: S.optional(TypedAttributeValue),
    EndMode: RangeMode,
    EndValue: S.optional(TypedAttributeValue),
  }),
).annotate({
  identifier: "TypedAttributeValueRange",
}) as any as S.Schema<TypedAttributeValueRange>;
export interface ObjectAttributeRange {
  AttributeKey?: AttributeKey;
  Range?: TypedAttributeValueRange;
}
export const ObjectAttributeRange = S.suspend(() =>
  S.Struct({
    AttributeKey: S.optional(AttributeKey),
    Range: S.optional(TypedAttributeValueRange),
  }),
).annotate({
  identifier: "ObjectAttributeRange",
}) as any as S.Schema<ObjectAttributeRange>;
export type ObjectAttributeRangeList = ObjectAttributeRange[];
export const ObjectAttributeRangeList = S.Array(ObjectAttributeRange);
export interface BatchListIndex {
  RangesOnIndexedValues?: ObjectAttributeRange[];
  IndexReference: ObjectReference;
  MaxResults?: number;
  NextToken?: string;
}
export const BatchListIndex = S.suspend(() =>
  S.Struct({
    RangesOnIndexedValues: S.optional(ObjectAttributeRangeList),
    IndexReference: ObjectReference,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "BatchListIndex" }) as any as S.Schema<BatchListIndex>;
export interface TypedLinkAttributeRange {
  AttributeName?: string;
  Range: TypedAttributeValueRange;
}
export const TypedLinkAttributeRange = S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    Range: TypedAttributeValueRange,
  }),
).annotate({
  identifier: "TypedLinkAttributeRange",
}) as any as S.Schema<TypedLinkAttributeRange>;
export type TypedLinkAttributeRangeList = TypedLinkAttributeRange[];
export const TypedLinkAttributeRangeList = S.Array(TypedLinkAttributeRange);
export interface BatchListOutgoingTypedLinks {
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListOutgoingTypedLinks = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    FilterAttributeRanges: S.optional(TypedLinkAttributeRangeList),
    FilterTypedLink: S.optional(TypedLinkSchemaAndFacetName),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListOutgoingTypedLinks",
}) as any as S.Schema<BatchListOutgoingTypedLinks>;
export interface BatchListIncomingTypedLinks {
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
}
export const BatchListIncomingTypedLinks = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    FilterAttributeRanges: S.optional(TypedLinkAttributeRangeList),
    FilterTypedLink: S.optional(TypedLinkSchemaAndFacetName),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchListIncomingTypedLinks",
}) as any as S.Schema<BatchListIncomingTypedLinks>;
export interface BatchGetLinkAttributes {
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeNames: string[];
}
export const BatchGetLinkAttributes = S.suspend(() =>
  S.Struct({
    TypedLinkSpecifier: TypedLinkSpecifier,
    AttributeNames: AttributeNameList,
  }),
).annotate({
  identifier: "BatchGetLinkAttributes",
}) as any as S.Schema<BatchGetLinkAttributes>;
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
export const BatchReadOperation = S.suspend(() =>
  S.Struct({
    ListObjectAttributes: S.optional(BatchListObjectAttributes),
    ListObjectChildren: S.optional(BatchListObjectChildren),
    ListAttachedIndices: S.optional(BatchListAttachedIndices),
    ListObjectParentPaths: S.optional(BatchListObjectParentPaths),
    GetObjectInformation: S.optional(BatchGetObjectInformation),
    GetObjectAttributes: S.optional(BatchGetObjectAttributes),
    ListObjectParents: S.optional(BatchListObjectParents),
    ListObjectPolicies: S.optional(BatchListObjectPolicies),
    ListPolicyAttachments: S.optional(BatchListPolicyAttachments),
    LookupPolicy: S.optional(BatchLookupPolicy),
    ListIndex: S.optional(BatchListIndex),
    ListOutgoingTypedLinks: S.optional(BatchListOutgoingTypedLinks),
    ListIncomingTypedLinks: S.optional(BatchListIncomingTypedLinks),
    GetLinkAttributes: S.optional(BatchGetLinkAttributes),
  }),
).annotate({
  identifier: "BatchReadOperation",
}) as any as S.Schema<BatchReadOperation>;
export type BatchReadOperationList = BatchReadOperation[];
export const BatchReadOperationList = S.Array(BatchReadOperation);
export type ConsistencyLevel = "SERIALIZABLE" | "EVENTUAL" | (string & {});
export const ConsistencyLevel = S.String;
export interface BatchReadRequest {
  DirectoryArn: string;
  Operations: BatchReadOperation[];
  ConsistencyLevel?: ConsistencyLevel;
}
export const BatchReadRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Operations: BatchReadOperationList,
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/batchread",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchReadRequest",
}) as any as S.Schema<BatchReadRequest>;
export interface BatchListObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
  NextToken?: string;
}
export const BatchListObjectAttributesResponse = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeKeyAndValueList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListObjectAttributesResponse",
}) as any as S.Schema<BatchListObjectAttributesResponse>;
export type LinkNameToObjectIdentifierMap = {
  [key: string]: string | undefined;
};
export const LinkNameToObjectIdentifierMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface BatchListObjectChildrenResponse {
  Children?: { [key: string]: string | undefined };
  NextToken?: string;
}
export const BatchListObjectChildrenResponse = S.suspend(() =>
  S.Struct({
    Children: S.optional(LinkNameToObjectIdentifierMap),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListObjectChildrenResponse",
}) as any as S.Schema<BatchListObjectChildrenResponse>;
export type SchemaFacetList = SchemaFacet[];
export const SchemaFacetList = S.Array(SchemaFacet);
export interface BatchGetObjectInformationResponse {
  SchemaFacets?: SchemaFacet[];
  ObjectIdentifier?: string;
}
export const BatchGetObjectInformationResponse = S.suspend(() =>
  S.Struct({
    SchemaFacets: S.optional(SchemaFacetList),
    ObjectIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetObjectInformationResponse",
}) as any as S.Schema<BatchGetObjectInformationResponse>;
export interface BatchGetObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export const BatchGetObjectAttributesResponse = S.suspend(() =>
  S.Struct({ Attributes: S.optional(AttributeKeyAndValueList) }),
).annotate({
  identifier: "BatchGetObjectAttributesResponse",
}) as any as S.Schema<BatchGetObjectAttributesResponse>;
export interface IndexAttachment {
  IndexedAttributes?: AttributeKeyAndValue[];
  ObjectIdentifier?: string;
}
export const IndexAttachment = S.suspend(() =>
  S.Struct({
    IndexedAttributes: S.optional(AttributeKeyAndValueList),
    ObjectIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "IndexAttachment",
}) as any as S.Schema<IndexAttachment>;
export type IndexAttachmentList = IndexAttachment[];
export const IndexAttachmentList = S.Array(IndexAttachment);
export interface BatchListAttachedIndicesResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export const BatchListAttachedIndicesResponse = S.suspend(() =>
  S.Struct({
    IndexAttachments: S.optional(IndexAttachmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListAttachedIndicesResponse",
}) as any as S.Schema<BatchListAttachedIndicesResponse>;
export type ObjectIdentifierList = string[];
export const ObjectIdentifierList = S.Array(S.String);
export interface PathToObjectIdentifiers {
  Path?: string;
  ObjectIdentifiers?: string[];
}
export const PathToObjectIdentifiers = S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    ObjectIdentifiers: S.optional(ObjectIdentifierList),
  }),
).annotate({
  identifier: "PathToObjectIdentifiers",
}) as any as S.Schema<PathToObjectIdentifiers>;
export type PathToObjectIdentifiersList = PathToObjectIdentifiers[];
export const PathToObjectIdentifiersList = S.Array(PathToObjectIdentifiers);
export interface BatchListObjectParentPathsResponse {
  PathToObjectIdentifiersList?: PathToObjectIdentifiers[];
  NextToken?: string;
}
export const BatchListObjectParentPathsResponse = S.suspend(() =>
  S.Struct({
    PathToObjectIdentifiersList: S.optional(PathToObjectIdentifiersList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListObjectParentPathsResponse",
}) as any as S.Schema<BatchListObjectParentPathsResponse>;
export interface BatchListObjectPoliciesResponse {
  AttachedPolicyIds?: string[];
  NextToken?: string;
}
export const BatchListObjectPoliciesResponse = S.suspend(() =>
  S.Struct({
    AttachedPolicyIds: S.optional(ObjectIdentifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListObjectPoliciesResponse",
}) as any as S.Schema<BatchListObjectPoliciesResponse>;
export interface BatchListPolicyAttachmentsResponse {
  ObjectIdentifiers?: string[];
  NextToken?: string;
}
export const BatchListPolicyAttachmentsResponse = S.suspend(() =>
  S.Struct({
    ObjectIdentifiers: S.optional(ObjectIdentifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListPolicyAttachmentsResponse",
}) as any as S.Schema<BatchListPolicyAttachmentsResponse>;
export interface PolicyAttachment {
  PolicyId?: string;
  ObjectIdentifier?: string;
  PolicyType?: string;
}
export const PolicyAttachment = S.suspend(() =>
  S.Struct({
    PolicyId: S.optional(S.String),
    ObjectIdentifier: S.optional(S.String),
    PolicyType: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyAttachment",
}) as any as S.Schema<PolicyAttachment>;
export type PolicyAttachmentList = PolicyAttachment[];
export const PolicyAttachmentList = S.Array(PolicyAttachment);
export interface PolicyToPath {
  Path?: string;
  Policies?: PolicyAttachment[];
}
export const PolicyToPath = S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    Policies: S.optional(PolicyAttachmentList),
  }),
).annotate({ identifier: "PolicyToPath" }) as any as S.Schema<PolicyToPath>;
export type PolicyToPathList = PolicyToPath[];
export const PolicyToPathList = S.Array(PolicyToPath);
export interface BatchLookupPolicyResponse {
  PolicyToPathList?: PolicyToPath[];
  NextToken?: string;
}
export const BatchLookupPolicyResponse = S.suspend(() =>
  S.Struct({
    PolicyToPathList: S.optional(PolicyToPathList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchLookupPolicyResponse",
}) as any as S.Schema<BatchLookupPolicyResponse>;
export interface BatchListIndexResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export const BatchListIndexResponse = S.suspend(() =>
  S.Struct({
    IndexAttachments: S.optional(IndexAttachmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListIndexResponse",
}) as any as S.Schema<BatchListIndexResponse>;
export type TypedLinkSpecifierList = TypedLinkSpecifier[];
export const TypedLinkSpecifierList = S.Array(TypedLinkSpecifier);
export interface BatchListOutgoingTypedLinksResponse {
  TypedLinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export const BatchListOutgoingTypedLinksResponse = S.suspend(() =>
  S.Struct({
    TypedLinkSpecifiers: S.optional(TypedLinkSpecifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListOutgoingTypedLinksResponse",
}) as any as S.Schema<BatchListOutgoingTypedLinksResponse>;
export interface BatchListIncomingTypedLinksResponse {
  LinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export const BatchListIncomingTypedLinksResponse = S.suspend(() =>
  S.Struct({
    LinkSpecifiers: S.optional(TypedLinkSpecifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListIncomingTypedLinksResponse",
}) as any as S.Schema<BatchListIncomingTypedLinksResponse>;
export interface BatchGetLinkAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export const BatchGetLinkAttributesResponse = S.suspend(() =>
  S.Struct({ Attributes: S.optional(AttributeKeyAndValueList) }),
).annotate({
  identifier: "BatchGetLinkAttributesResponse",
}) as any as S.Schema<BatchGetLinkAttributesResponse>;
export interface ObjectIdentifierAndLinkNameTuple {
  ObjectIdentifier?: string;
  LinkName?: string;
}
export const ObjectIdentifierAndLinkNameTuple = S.suspend(() =>
  S.Struct({
    ObjectIdentifier: S.optional(S.String),
    LinkName: S.optional(S.String),
  }),
).annotate({
  identifier: "ObjectIdentifierAndLinkNameTuple",
}) as any as S.Schema<ObjectIdentifierAndLinkNameTuple>;
export type ObjectIdentifierAndLinkNameList =
  ObjectIdentifierAndLinkNameTuple[];
export const ObjectIdentifierAndLinkNameList = S.Array(
  ObjectIdentifierAndLinkNameTuple,
);
export interface BatchListObjectParentsResponse {
  ParentLinks?: ObjectIdentifierAndLinkNameTuple[];
  NextToken?: string;
}
export const BatchListObjectParentsResponse = S.suspend(() =>
  S.Struct({
    ParentLinks: S.optional(ObjectIdentifierAndLinkNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchListObjectParentsResponse",
}) as any as S.Schema<BatchListObjectParentsResponse>;
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
export const BatchReadSuccessfulResponse = S.suspend(() =>
  S.Struct({
    ListObjectAttributes: S.optional(BatchListObjectAttributesResponse),
    ListObjectChildren: S.optional(BatchListObjectChildrenResponse),
    GetObjectInformation: S.optional(BatchGetObjectInformationResponse),
    GetObjectAttributes: S.optional(BatchGetObjectAttributesResponse),
    ListAttachedIndices: S.optional(BatchListAttachedIndicesResponse),
    ListObjectParentPaths: S.optional(BatchListObjectParentPathsResponse),
    ListObjectPolicies: S.optional(BatchListObjectPoliciesResponse),
    ListPolicyAttachments: S.optional(BatchListPolicyAttachmentsResponse),
    LookupPolicy: S.optional(BatchLookupPolicyResponse),
    ListIndex: S.optional(BatchListIndexResponse),
    ListOutgoingTypedLinks: S.optional(BatchListOutgoingTypedLinksResponse),
    ListIncomingTypedLinks: S.optional(BatchListIncomingTypedLinksResponse),
    GetLinkAttributes: S.optional(BatchGetLinkAttributesResponse),
    ListObjectParents: S.optional(BatchListObjectParentsResponse),
  }),
).annotate({
  identifier: "BatchReadSuccessfulResponse",
}) as any as S.Schema<BatchReadSuccessfulResponse>;
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
export const BatchReadExceptionType = S.String;
export interface BatchReadException {
  Type?: BatchReadExceptionType;
  Message?: string;
}
export const BatchReadException = S.suspend(() =>
  S.Struct({
    Type: S.optional(BatchReadExceptionType),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchReadException",
}) as any as S.Schema<BatchReadException>;
export interface BatchReadOperationResponse {
  SuccessfulResponse?: BatchReadSuccessfulResponse;
  ExceptionResponse?: BatchReadException;
}
export const BatchReadOperationResponse = S.suspend(() =>
  S.Struct({
    SuccessfulResponse: S.optional(BatchReadSuccessfulResponse),
    ExceptionResponse: S.optional(BatchReadException),
  }),
).annotate({
  identifier: "BatchReadOperationResponse",
}) as any as S.Schema<BatchReadOperationResponse>;
export type BatchReadOperationResponseList = BatchReadOperationResponse[];
export const BatchReadOperationResponseList = S.Array(
  BatchReadOperationResponse,
);
export interface BatchReadResponse {
  Responses?: BatchReadOperationResponse[];
}
export const BatchReadResponse = S.suspend(() =>
  S.Struct({ Responses: S.optional(BatchReadOperationResponseList) }),
).annotate({
  identifier: "BatchReadResponse",
}) as any as S.Schema<BatchReadResponse>;
export interface BatchCreateObject {
  SchemaFacet: SchemaFacet[];
  ObjectAttributeList: AttributeKeyAndValue[];
  ParentReference?: ObjectReference;
  LinkName?: string;
  BatchReferenceName?: string;
}
export const BatchCreateObject = S.suspend(() =>
  S.Struct({
    SchemaFacet: SchemaFacetList,
    ObjectAttributeList: AttributeKeyAndValueList,
    ParentReference: S.optional(ObjectReference),
    LinkName: S.optional(S.String),
    BatchReferenceName: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateObject",
}) as any as S.Schema<BatchCreateObject>;
export interface BatchAttachObject {
  ParentReference: ObjectReference;
  ChildReference: ObjectReference;
  LinkName: string;
}
export const BatchAttachObject = S.suspend(() =>
  S.Struct({
    ParentReference: ObjectReference,
    ChildReference: ObjectReference,
    LinkName: S.String,
  }),
).annotate({
  identifier: "BatchAttachObject",
}) as any as S.Schema<BatchAttachObject>;
export interface BatchDetachObject {
  ParentReference: ObjectReference;
  LinkName: string;
  BatchReferenceName?: string;
}
export const BatchDetachObject = S.suspend(() =>
  S.Struct({
    ParentReference: ObjectReference,
    LinkName: S.String,
    BatchReferenceName: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDetachObject",
}) as any as S.Schema<BatchDetachObject>;
export type UpdateActionType = "CREATE_OR_UPDATE" | "DELETE" | (string & {});
export const UpdateActionType = S.String;
export interface ObjectAttributeAction {
  ObjectAttributeActionType?: UpdateActionType;
  ObjectAttributeUpdateValue?: TypedAttributeValue;
}
export const ObjectAttributeAction = S.suspend(() =>
  S.Struct({
    ObjectAttributeActionType: S.optional(UpdateActionType),
    ObjectAttributeUpdateValue: S.optional(TypedAttributeValue),
  }),
).annotate({
  identifier: "ObjectAttributeAction",
}) as any as S.Schema<ObjectAttributeAction>;
export interface ObjectAttributeUpdate {
  ObjectAttributeKey?: AttributeKey;
  ObjectAttributeAction?: ObjectAttributeAction;
}
export const ObjectAttributeUpdate = S.suspend(() =>
  S.Struct({
    ObjectAttributeKey: S.optional(AttributeKey),
    ObjectAttributeAction: S.optional(ObjectAttributeAction),
  }),
).annotate({
  identifier: "ObjectAttributeUpdate",
}) as any as S.Schema<ObjectAttributeUpdate>;
export type ObjectAttributeUpdateList = ObjectAttributeUpdate[];
export const ObjectAttributeUpdateList = S.Array(ObjectAttributeUpdate);
export interface BatchUpdateObjectAttributes {
  ObjectReference: ObjectReference;
  AttributeUpdates: ObjectAttributeUpdate[];
}
export const BatchUpdateObjectAttributes = S.suspend(() =>
  S.Struct({
    ObjectReference: ObjectReference,
    AttributeUpdates: ObjectAttributeUpdateList,
  }),
).annotate({
  identifier: "BatchUpdateObjectAttributes",
}) as any as S.Schema<BatchUpdateObjectAttributes>;
export interface BatchDeleteObject {
  ObjectReference: ObjectReference;
}
export const BatchDeleteObject = S.suspend(() =>
  S.Struct({ ObjectReference: ObjectReference }),
).annotate({
  identifier: "BatchDeleteObject",
}) as any as S.Schema<BatchDeleteObject>;
export interface BatchAddFacetToObject {
  SchemaFacet: SchemaFacet;
  ObjectAttributeList: AttributeKeyAndValue[];
  ObjectReference: ObjectReference;
}
export const BatchAddFacetToObject = S.suspend(() =>
  S.Struct({
    SchemaFacet: SchemaFacet,
    ObjectAttributeList: AttributeKeyAndValueList,
    ObjectReference: ObjectReference,
  }),
).annotate({
  identifier: "BatchAddFacetToObject",
}) as any as S.Schema<BatchAddFacetToObject>;
export interface BatchRemoveFacetFromObject {
  SchemaFacet: SchemaFacet;
  ObjectReference: ObjectReference;
}
export const BatchRemoveFacetFromObject = S.suspend(() =>
  S.Struct({ SchemaFacet: SchemaFacet, ObjectReference: ObjectReference }),
).annotate({
  identifier: "BatchRemoveFacetFromObject",
}) as any as S.Schema<BatchRemoveFacetFromObject>;
export interface BatchAttachPolicy {
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export const BatchAttachPolicy = S.suspend(() =>
  S.Struct({
    PolicyReference: ObjectReference,
    ObjectReference: ObjectReference,
  }),
).annotate({
  identifier: "BatchAttachPolicy",
}) as any as S.Schema<BatchAttachPolicy>;
export interface BatchDetachPolicy {
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export const BatchDetachPolicy = S.suspend(() =>
  S.Struct({
    PolicyReference: ObjectReference,
    ObjectReference: ObjectReference,
  }),
).annotate({
  identifier: "BatchDetachPolicy",
}) as any as S.Schema<BatchDetachPolicy>;
export type AttributeKeyList = AttributeKey[];
export const AttributeKeyList = S.Array(AttributeKey);
export interface BatchCreateIndex {
  OrderedIndexedAttributeList: AttributeKey[];
  IsUnique: boolean;
  ParentReference?: ObjectReference;
  LinkName?: string;
  BatchReferenceName?: string;
}
export const BatchCreateIndex = S.suspend(() =>
  S.Struct({
    OrderedIndexedAttributeList: AttributeKeyList,
    IsUnique: S.Boolean,
    ParentReference: S.optional(ObjectReference),
    LinkName: S.optional(S.String),
    BatchReferenceName: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateIndex",
}) as any as S.Schema<BatchCreateIndex>;
export interface BatchAttachToIndex {
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export const BatchAttachToIndex = S.suspend(() =>
  S.Struct({
    IndexReference: ObjectReference,
    TargetReference: ObjectReference,
  }),
).annotate({
  identifier: "BatchAttachToIndex",
}) as any as S.Schema<BatchAttachToIndex>;
export interface BatchDetachFromIndex {
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export const BatchDetachFromIndex = S.suspend(() =>
  S.Struct({
    IndexReference: ObjectReference,
    TargetReference: ObjectReference,
  }),
).annotate({
  identifier: "BatchDetachFromIndex",
}) as any as S.Schema<BatchDetachFromIndex>;
export interface BatchAttachTypedLink {
  SourceObjectReference: ObjectReference;
  TargetObjectReference: ObjectReference;
  TypedLinkFacet: TypedLinkSchemaAndFacetName;
  Attributes: AttributeNameAndValue[];
}
export const BatchAttachTypedLink = S.suspend(() =>
  S.Struct({
    SourceObjectReference: ObjectReference,
    TargetObjectReference: ObjectReference,
    TypedLinkFacet: TypedLinkSchemaAndFacetName,
    Attributes: AttributeNameAndValueList,
  }),
).annotate({
  identifier: "BatchAttachTypedLink",
}) as any as S.Schema<BatchAttachTypedLink>;
export interface BatchDetachTypedLink {
  TypedLinkSpecifier: TypedLinkSpecifier;
}
export const BatchDetachTypedLink = S.suspend(() =>
  S.Struct({ TypedLinkSpecifier: TypedLinkSpecifier }),
).annotate({
  identifier: "BatchDetachTypedLink",
}) as any as S.Schema<BatchDetachTypedLink>;
export interface LinkAttributeAction {
  AttributeActionType?: UpdateActionType;
  AttributeUpdateValue?: TypedAttributeValue;
}
export const LinkAttributeAction = S.suspend(() =>
  S.Struct({
    AttributeActionType: S.optional(UpdateActionType),
    AttributeUpdateValue: S.optional(TypedAttributeValue),
  }),
).annotate({
  identifier: "LinkAttributeAction",
}) as any as S.Schema<LinkAttributeAction>;
export interface LinkAttributeUpdate {
  AttributeKey?: AttributeKey;
  AttributeAction?: LinkAttributeAction;
}
export const LinkAttributeUpdate = S.suspend(() =>
  S.Struct({
    AttributeKey: S.optional(AttributeKey),
    AttributeAction: S.optional(LinkAttributeAction),
  }),
).annotate({
  identifier: "LinkAttributeUpdate",
}) as any as S.Schema<LinkAttributeUpdate>;
export type LinkAttributeUpdateList = LinkAttributeUpdate[];
export const LinkAttributeUpdateList = S.Array(LinkAttributeUpdate);
export interface BatchUpdateLinkAttributes {
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeUpdates: LinkAttributeUpdate[];
}
export const BatchUpdateLinkAttributes = S.suspend(() =>
  S.Struct({
    TypedLinkSpecifier: TypedLinkSpecifier,
    AttributeUpdates: LinkAttributeUpdateList,
  }),
).annotate({
  identifier: "BatchUpdateLinkAttributes",
}) as any as S.Schema<BatchUpdateLinkAttributes>;
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
export const BatchWriteOperation = S.suspend(() =>
  S.Struct({
    CreateObject: S.optional(BatchCreateObject),
    AttachObject: S.optional(BatchAttachObject),
    DetachObject: S.optional(BatchDetachObject),
    UpdateObjectAttributes: S.optional(BatchUpdateObjectAttributes),
    DeleteObject: S.optional(BatchDeleteObject),
    AddFacetToObject: S.optional(BatchAddFacetToObject),
    RemoveFacetFromObject: S.optional(BatchRemoveFacetFromObject),
    AttachPolicy: S.optional(BatchAttachPolicy),
    DetachPolicy: S.optional(BatchDetachPolicy),
    CreateIndex: S.optional(BatchCreateIndex),
    AttachToIndex: S.optional(BatchAttachToIndex),
    DetachFromIndex: S.optional(BatchDetachFromIndex),
    AttachTypedLink: S.optional(BatchAttachTypedLink),
    DetachTypedLink: S.optional(BatchDetachTypedLink),
    UpdateLinkAttributes: S.optional(BatchUpdateLinkAttributes),
  }),
).annotate({
  identifier: "BatchWriteOperation",
}) as any as S.Schema<BatchWriteOperation>;
export type BatchWriteOperationList = BatchWriteOperation[];
export const BatchWriteOperationList = S.Array(BatchWriteOperation);
export interface BatchWriteRequest {
  DirectoryArn: string;
  Operations: BatchWriteOperation[];
}
export const BatchWriteRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Operations: BatchWriteOperationList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/batchwrite",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchWriteRequest",
}) as any as S.Schema<BatchWriteRequest>;
export interface BatchCreateObjectResponse {
  ObjectIdentifier?: string;
}
export const BatchCreateObjectResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchCreateObjectResponse",
}) as any as S.Schema<BatchCreateObjectResponse>;
export interface BatchAttachObjectResponse {
  attachedObjectIdentifier?: string;
}
export const BatchAttachObjectResponse = S.suspend(() =>
  S.Struct({ attachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchAttachObjectResponse",
}) as any as S.Schema<BatchAttachObjectResponse>;
export interface BatchDetachObjectResponse {
  detachedObjectIdentifier?: string;
}
export const BatchDetachObjectResponse = S.suspend(() =>
  S.Struct({ detachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchDetachObjectResponse",
}) as any as S.Schema<BatchDetachObjectResponse>;
export interface BatchUpdateObjectAttributesResponse {
  ObjectIdentifier?: string;
}
export const BatchUpdateObjectAttributesResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchUpdateObjectAttributesResponse",
}) as any as S.Schema<BatchUpdateObjectAttributesResponse>;
export interface BatchDeleteObjectResponse {}
export const BatchDeleteObjectResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "BatchDeleteObjectResponse" },
) as any as S.Schema<BatchDeleteObjectResponse>;
export interface BatchAddFacetToObjectResponse {}
export const BatchAddFacetToObjectResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchAddFacetToObjectResponse",
}) as any as S.Schema<BatchAddFacetToObjectResponse>;
export interface BatchRemoveFacetFromObjectResponse {}
export const BatchRemoveFacetFromObjectResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchRemoveFacetFromObjectResponse",
}) as any as S.Schema<BatchRemoveFacetFromObjectResponse>;
export interface BatchAttachPolicyResponse {}
export const BatchAttachPolicyResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "BatchAttachPolicyResponse" },
) as any as S.Schema<BatchAttachPolicyResponse>;
export interface BatchDetachPolicyResponse {}
export const BatchDetachPolicyResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "BatchDetachPolicyResponse" },
) as any as S.Schema<BatchDetachPolicyResponse>;
export interface BatchCreateIndexResponse {
  ObjectIdentifier?: string;
}
export const BatchCreateIndexResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchCreateIndexResponse",
}) as any as S.Schema<BatchCreateIndexResponse>;
export interface BatchAttachToIndexResponse {
  AttachedObjectIdentifier?: string;
}
export const BatchAttachToIndexResponse = S.suspend(() =>
  S.Struct({ AttachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchAttachToIndexResponse",
}) as any as S.Schema<BatchAttachToIndexResponse>;
export interface BatchDetachFromIndexResponse {
  DetachedObjectIdentifier?: string;
}
export const BatchDetachFromIndexResponse = S.suspend(() =>
  S.Struct({ DetachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "BatchDetachFromIndexResponse",
}) as any as S.Schema<BatchDetachFromIndexResponse>;
export interface BatchAttachTypedLinkResponse {
  TypedLinkSpecifier?: TypedLinkSpecifier;
}
export const BatchAttachTypedLinkResponse = S.suspend(() =>
  S.Struct({ TypedLinkSpecifier: S.optional(TypedLinkSpecifier) }),
).annotate({
  identifier: "BatchAttachTypedLinkResponse",
}) as any as S.Schema<BatchAttachTypedLinkResponse>;
export interface BatchDetachTypedLinkResponse {}
export const BatchDetachTypedLinkResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchDetachTypedLinkResponse",
}) as any as S.Schema<BatchDetachTypedLinkResponse>;
export interface BatchUpdateLinkAttributesResponse {}
export const BatchUpdateLinkAttributesResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchUpdateLinkAttributesResponse",
}) as any as S.Schema<BatchUpdateLinkAttributesResponse>;
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
export const BatchWriteOperationResponse = S.suspend(() =>
  S.Struct({
    CreateObject: S.optional(BatchCreateObjectResponse),
    AttachObject: S.optional(BatchAttachObjectResponse),
    DetachObject: S.optional(BatchDetachObjectResponse),
    UpdateObjectAttributes: S.optional(BatchUpdateObjectAttributesResponse),
    DeleteObject: S.optional(BatchDeleteObjectResponse),
    AddFacetToObject: S.optional(BatchAddFacetToObjectResponse),
    RemoveFacetFromObject: S.optional(BatchRemoveFacetFromObjectResponse),
    AttachPolicy: S.optional(BatchAttachPolicyResponse),
    DetachPolicy: S.optional(BatchDetachPolicyResponse),
    CreateIndex: S.optional(BatchCreateIndexResponse),
    AttachToIndex: S.optional(BatchAttachToIndexResponse),
    DetachFromIndex: S.optional(BatchDetachFromIndexResponse),
    AttachTypedLink: S.optional(BatchAttachTypedLinkResponse),
    DetachTypedLink: S.optional(BatchDetachTypedLinkResponse),
    UpdateLinkAttributes: S.optional(BatchUpdateLinkAttributesResponse),
  }),
).annotate({
  identifier: "BatchWriteOperationResponse",
}) as any as S.Schema<BatchWriteOperationResponse>;
export type BatchWriteOperationResponseList = BatchWriteOperationResponse[];
export const BatchWriteOperationResponseList = S.Array(
  BatchWriteOperationResponse,
);
export interface BatchWriteResponse {
  Responses?: BatchWriteOperationResponse[];
}
export const BatchWriteResponse = S.suspend(() =>
  S.Struct({ Responses: S.optional(BatchWriteOperationResponseList) }),
).annotate({
  identifier: "BatchWriteResponse",
}) as any as S.Schema<BatchWriteResponse>;
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
export const BatchWriteExceptionType = S.String;
export interface CreateDirectoryRequest {
  Name: string;
  SchemaArn: string;
}
export const CreateDirectoryRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/directory/create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDirectoryRequest",
}) as any as S.Schema<CreateDirectoryRequest>;
export interface CreateDirectoryResponse {
  DirectoryArn: string;
  Name: string;
  ObjectIdentifier: string;
  AppliedSchemaArn: string;
}
export const CreateDirectoryResponse = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String,
    Name: S.String,
    ObjectIdentifier: S.String,
    AppliedSchemaArn: S.String,
  }),
).annotate({
  identifier: "CreateDirectoryResponse",
}) as any as S.Schema<CreateDirectoryResponse>;
export type FacetAttributeType =
  | "STRING"
  | "BINARY"
  | "BOOLEAN"
  | "NUMBER"
  | "DATETIME"
  | "VARIANT"
  | (string & {});
export const FacetAttributeType = S.String;
export type RuleType =
  | "BINARY_LENGTH"
  | "NUMBER_COMPARISON"
  | "STRING_FROM_SET"
  | "STRING_LENGTH"
  | (string & {});
export const RuleType = S.String;
export type RuleParameterMap = { [key: string]: string | undefined };
export const RuleParameterMap = S.Record(S.String, S.String.pipe(S.optional));
export interface Rule {
  Type?: RuleType;
  Parameters?: { [key: string]: string | undefined };
}
export const Rule = S.suspend(() =>
  S.Struct({
    Type: S.optional(RuleType),
    Parameters: S.optional(RuleParameterMap),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type RuleMap = { [key: string]: Rule | undefined };
export const RuleMap = S.Record(S.String, Rule.pipe(S.optional));
export interface FacetAttributeDefinition {
  Type: FacetAttributeType;
  DefaultValue?: TypedAttributeValue;
  IsImmutable?: boolean;
  Rules?: { [key: string]: Rule | undefined };
}
export const FacetAttributeDefinition = S.suspend(() =>
  S.Struct({
    Type: FacetAttributeType,
    DefaultValue: S.optional(TypedAttributeValue),
    IsImmutable: S.optional(S.Boolean),
    Rules: S.optional(RuleMap),
  }),
).annotate({
  identifier: "FacetAttributeDefinition",
}) as any as S.Schema<FacetAttributeDefinition>;
export interface FacetAttributeReference {
  TargetFacetName: string;
  TargetAttributeName: string;
}
export const FacetAttributeReference = S.suspend(() =>
  S.Struct({ TargetFacetName: S.String, TargetAttributeName: S.String }),
).annotate({
  identifier: "FacetAttributeReference",
}) as any as S.Schema<FacetAttributeReference>;
export type RequiredAttributeBehavior =
  | "REQUIRED_ALWAYS"
  | "NOT_REQUIRED"
  | (string & {});
export const RequiredAttributeBehavior = S.String;
export interface FacetAttribute {
  Name: string;
  AttributeDefinition?: FacetAttributeDefinition;
  AttributeReference?: FacetAttributeReference;
  RequiredBehavior?: RequiredAttributeBehavior;
}
export const FacetAttribute = S.suspend(() =>
  S.Struct({
    Name: S.String,
    AttributeDefinition: S.optional(FacetAttributeDefinition),
    AttributeReference: S.optional(FacetAttributeReference),
    RequiredBehavior: S.optional(RequiredAttributeBehavior),
  }),
).annotate({ identifier: "FacetAttribute" }) as any as S.Schema<FacetAttribute>;
export type FacetAttributeList = FacetAttribute[];
export const FacetAttributeList = S.Array(FacetAttribute);
export type ObjectType =
  | "NODE"
  | "LEAF_NODE"
  | "POLICY"
  | "INDEX"
  | (string & {});
export const ObjectType = S.String;
export type FacetStyle = "STATIC" | "DYNAMIC" | (string & {});
export const FacetStyle = S.String;
export interface CreateFacetRequest {
  SchemaArn: string;
  Name: string;
  Attributes?: FacetAttribute[];
  ObjectType?: ObjectType;
  FacetStyle?: FacetStyle;
}
export const CreateFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
    Attributes: S.optional(FacetAttributeList),
    ObjectType: S.optional(ObjectType),
    FacetStyle: S.optional(FacetStyle),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/facet/create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFacetRequest",
}) as any as S.Schema<CreateFacetRequest>;
export interface CreateFacetResponse {}
export const CreateFacetResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "CreateFacetResponse",
}) as any as S.Schema<CreateFacetResponse>;
export interface CreateIndexRequest {
  DirectoryArn: string;
  OrderedIndexedAttributeList: AttributeKey[];
  IsUnique: boolean;
  ParentReference?: ObjectReference;
  LinkName?: string;
}
export const CreateIndexRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    OrderedIndexedAttributeList: AttributeKeyList,
    IsUnique: S.Boolean,
    ParentReference: S.optional(ObjectReference),
    LinkName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/amazonclouddirectory/2017-01-11/index" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIndexRequest",
}) as any as S.Schema<CreateIndexRequest>;
export interface CreateIndexResponse {
  ObjectIdentifier?: string;
}
export const CreateIndexResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "CreateIndexResponse",
}) as any as S.Schema<CreateIndexResponse>;
export interface CreateObjectRequest {
  DirectoryArn: string;
  SchemaFacets: SchemaFacet[];
  ObjectAttributeList?: AttributeKeyAndValue[];
  ParentReference?: ObjectReference;
  LinkName?: string;
}
export const CreateObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    SchemaFacets: SchemaFacetList,
    ObjectAttributeList: S.optional(AttributeKeyAndValueList),
    ParentReference: S.optional(ObjectReference),
    LinkName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/amazonclouddirectory/2017-01-11/object" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateObjectRequest",
}) as any as S.Schema<CreateObjectRequest>;
export interface CreateObjectResponse {
  ObjectIdentifier?: string;
}
export const CreateObjectResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "CreateObjectResponse",
}) as any as S.Schema<CreateObjectResponse>;
export interface CreateSchemaRequest {
  Name: string;
}
export const CreateSchemaRequest = S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSchemaRequest",
}) as any as S.Schema<CreateSchemaRequest>;
export interface CreateSchemaResponse {
  SchemaArn?: string;
}
export const CreateSchemaResponse = S.suspend(() =>
  S.Struct({ SchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateSchemaResponse",
}) as any as S.Schema<CreateSchemaResponse>;
export interface TypedLinkAttributeDefinition {
  Name: string;
  Type: FacetAttributeType;
  DefaultValue?: TypedAttributeValue;
  IsImmutable?: boolean;
  Rules?: { [key: string]: Rule | undefined };
  RequiredBehavior: RequiredAttributeBehavior;
}
export const TypedLinkAttributeDefinition = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: FacetAttributeType,
    DefaultValue: S.optional(TypedAttributeValue),
    IsImmutable: S.optional(S.Boolean),
    Rules: S.optional(RuleMap),
    RequiredBehavior: RequiredAttributeBehavior,
  }),
).annotate({
  identifier: "TypedLinkAttributeDefinition",
}) as any as S.Schema<TypedLinkAttributeDefinition>;
export type TypedLinkAttributeDefinitionList = TypedLinkAttributeDefinition[];
export const TypedLinkAttributeDefinitionList = S.Array(
  TypedLinkAttributeDefinition,
);
export interface TypedLinkFacet {
  Name: string;
  Attributes: TypedLinkAttributeDefinition[];
  IdentityAttributeOrder: string[];
}
export const TypedLinkFacet = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Attributes: TypedLinkAttributeDefinitionList,
    IdentityAttributeOrder: AttributeNameList,
  }),
).annotate({ identifier: "TypedLinkFacet" }) as any as S.Schema<TypedLinkFacet>;
export interface CreateTypedLinkFacetRequest {
  SchemaArn: string;
  Facet: TypedLinkFacet;
}
export const CreateTypedLinkFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Facet: TypedLinkFacet,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet/create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTypedLinkFacetRequest",
}) as any as S.Schema<CreateTypedLinkFacetRequest>;
export interface CreateTypedLinkFacetResponse {}
export const CreateTypedLinkFacetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTypedLinkFacetResponse",
}) as any as S.Schema<CreateTypedLinkFacetResponse>;
export interface DeleteDirectoryRequest {
  DirectoryArn: string;
}
export const DeleteDirectoryRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/directory",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDirectoryRequest",
}) as any as S.Schema<DeleteDirectoryRequest>;
export interface DeleteDirectoryResponse {
  DirectoryArn: string;
}
export const DeleteDirectoryResponse = S.suspend(() =>
  S.Struct({ DirectoryArn: S.String }),
).annotate({
  identifier: "DeleteDirectoryResponse",
}) as any as S.Schema<DeleteDirectoryResponse>;
export interface DeleteFacetRequest {
  SchemaArn: string;
  Name: string;
}
export const DeleteFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/facet/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFacetRequest",
}) as any as S.Schema<DeleteFacetRequest>;
export interface DeleteFacetResponse {}
export const DeleteFacetResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteFacetResponse",
}) as any as S.Schema<DeleteFacetResponse>;
export interface DeleteObjectRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
}
export const DeleteObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteObjectRequest",
}) as any as S.Schema<DeleteObjectRequest>;
export interface DeleteObjectResponse {}
export const DeleteObjectResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteObjectResponse",
}) as any as S.Schema<DeleteObjectResponse>;
export interface DeleteSchemaRequest {
  SchemaArn: string;
}
export const DeleteSchemaRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/amazonclouddirectory/2017-01-11/schema" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSchemaRequest",
}) as any as S.Schema<DeleteSchemaRequest>;
export interface DeleteSchemaResponse {
  SchemaArn?: string;
}
export const DeleteSchemaResponse = S.suspend(() =>
  S.Struct({ SchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteSchemaResponse",
}) as any as S.Schema<DeleteSchemaResponse>;
export interface DeleteTypedLinkFacetRequest {
  SchemaArn: string;
  Name: string;
}
export const DeleteTypedLinkFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTypedLinkFacetRequest",
}) as any as S.Schema<DeleteTypedLinkFacetRequest>;
export interface DeleteTypedLinkFacetResponse {}
export const DeleteTypedLinkFacetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTypedLinkFacetResponse",
}) as any as S.Schema<DeleteTypedLinkFacetResponse>;
export interface DetachFromIndexRequest {
  DirectoryArn: string;
  IndexReference: ObjectReference;
  TargetReference: ObjectReference;
}
export const DetachFromIndexRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    IndexReference: ObjectReference,
    TargetReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/index/detach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachFromIndexRequest",
}) as any as S.Schema<DetachFromIndexRequest>;
export interface DetachFromIndexResponse {
  DetachedObjectIdentifier?: string;
}
export const DetachFromIndexResponse = S.suspend(() =>
  S.Struct({ DetachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "DetachFromIndexResponse",
}) as any as S.Schema<DetachFromIndexResponse>;
export interface DetachObjectRequest {
  DirectoryArn: string;
  ParentReference: ObjectReference;
  LinkName: string;
}
export const DetachObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ParentReference: ObjectReference,
    LinkName: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/detach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachObjectRequest",
}) as any as S.Schema<DetachObjectRequest>;
export interface DetachObjectResponse {
  DetachedObjectIdentifier?: string;
}
export const DetachObjectResponse = S.suspend(() =>
  S.Struct({ DetachedObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "DetachObjectResponse",
}) as any as S.Schema<DetachObjectResponse>;
export interface DetachPolicyRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  ObjectReference: ObjectReference;
}
export const DetachPolicyRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    PolicyReference: ObjectReference,
    ObjectReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/policy/detach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachPolicyRequest",
}) as any as S.Schema<DetachPolicyRequest>;
export interface DetachPolicyResponse {}
export const DetachPolicyResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DetachPolicyResponse",
}) as any as S.Schema<DetachPolicyResponse>;
export interface DetachTypedLinkRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
}
export const DetachTypedLinkRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    TypedLinkSpecifier: TypedLinkSpecifier,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/detach",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachTypedLinkRequest",
}) as any as S.Schema<DetachTypedLinkRequest>;
export interface DetachTypedLinkResponse {}
export const DetachTypedLinkResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DetachTypedLinkResponse",
}) as any as S.Schema<DetachTypedLinkResponse>;
export interface DisableDirectoryRequest {
  DirectoryArn: string;
}
export const DisableDirectoryRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/directory/disable",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableDirectoryRequest",
}) as any as S.Schema<DisableDirectoryRequest>;
export interface DisableDirectoryResponse {
  DirectoryArn: string;
}
export const DisableDirectoryResponse = S.suspend(() =>
  S.Struct({ DirectoryArn: S.String }),
).annotate({
  identifier: "DisableDirectoryResponse",
}) as any as S.Schema<DisableDirectoryResponse>;
export interface EnableDirectoryRequest {
  DirectoryArn: string;
}
export const EnableDirectoryRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/directory/enable",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableDirectoryRequest",
}) as any as S.Schema<EnableDirectoryRequest>;
export interface EnableDirectoryResponse {
  DirectoryArn: string;
}
export const EnableDirectoryResponse = S.suspend(() =>
  S.Struct({ DirectoryArn: S.String }),
).annotate({
  identifier: "EnableDirectoryResponse",
}) as any as S.Schema<EnableDirectoryResponse>;
export interface GetAppliedSchemaVersionRequest {
  SchemaArn: string;
}
export const GetAppliedSchemaVersionRequest = S.suspend(() =>
  S.Struct({ SchemaArn: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/getappliedschema",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAppliedSchemaVersionRequest",
}) as any as S.Schema<GetAppliedSchemaVersionRequest>;
export interface GetAppliedSchemaVersionResponse {
  AppliedSchemaArn?: string;
}
export const GetAppliedSchemaVersionResponse = S.suspend(() =>
  S.Struct({ AppliedSchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "GetAppliedSchemaVersionResponse",
}) as any as S.Schema<GetAppliedSchemaVersionResponse>;
export interface GetDirectoryRequest {
  DirectoryArn: string;
}
export const GetDirectoryRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/directory/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDirectoryRequest",
}) as any as S.Schema<GetDirectoryRequest>;
export type DirectoryState = "ENABLED" | "DISABLED" | "DELETED" | (string & {});
export const DirectoryState = S.String;
export interface Directory {
  Name?: string;
  DirectoryArn?: string;
  State?: DirectoryState;
  CreationDateTime?: Date;
}
export const Directory = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DirectoryArn: S.optional(S.String),
    State: S.optional(DirectoryState),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Directory" }) as any as S.Schema<Directory>;
export interface GetDirectoryResponse {
  Directory: Directory;
}
export const GetDirectoryResponse = S.suspend(() =>
  S.Struct({ Directory: Directory }),
).annotate({
  identifier: "GetDirectoryResponse",
}) as any as S.Schema<GetDirectoryResponse>;
export interface GetFacetRequest {
  SchemaArn: string;
  Name: string;
}
export const GetFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/amazonclouddirectory/2017-01-11/facet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFacetRequest",
}) as any as S.Schema<GetFacetRequest>;
export interface Facet {
  Name?: string;
  ObjectType?: ObjectType;
  FacetStyle?: FacetStyle;
}
export const Facet = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ObjectType: S.optional(ObjectType),
    FacetStyle: S.optional(FacetStyle),
  }),
).annotate({ identifier: "Facet" }) as any as S.Schema<Facet>;
export interface GetFacetResponse {
  Facet?: Facet;
}
export const GetFacetResponse = S.suspend(() =>
  S.Struct({ Facet: S.optional(Facet) }),
).annotate({
  identifier: "GetFacetResponse",
}) as any as S.Schema<GetFacetResponse>;
export interface GetLinkAttributesRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeNames: string[];
  ConsistencyLevel?: ConsistencyLevel;
}
export const GetLinkAttributesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    TypedLinkSpecifier: TypedLinkSpecifier,
    AttributeNames: AttributeNameList,
    ConsistencyLevel: S.optional(ConsistencyLevel),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/attributes/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLinkAttributesRequest",
}) as any as S.Schema<GetLinkAttributesRequest>;
export interface GetLinkAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export const GetLinkAttributesResponse = S.suspend(() =>
  S.Struct({ Attributes: S.optional(AttributeKeyAndValueList) }),
).annotate({
  identifier: "GetLinkAttributesResponse",
}) as any as S.Schema<GetLinkAttributesResponse>;
export interface GetObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  ConsistencyLevel?: ConsistencyLevel;
  SchemaFacet: SchemaFacet;
  AttributeNames: string[];
}
export const GetObjectAttributesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
    SchemaFacet: SchemaFacet,
    AttributeNames: AttributeNameList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/attributes/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetObjectAttributesRequest",
}) as any as S.Schema<GetObjectAttributesRequest>;
export interface GetObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
}
export const GetObjectAttributesResponse = S.suspend(() =>
  S.Struct({ Attributes: S.optional(AttributeKeyAndValueList) }),
).annotate({
  identifier: "GetObjectAttributesResponse",
}) as any as S.Schema<GetObjectAttributesResponse>;
export interface GetObjectInformationRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  ConsistencyLevel?: ConsistencyLevel;
}
export const GetObjectInformationRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/information",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetObjectInformationRequest",
}) as any as S.Schema<GetObjectInformationRequest>;
export interface GetObjectInformationResponse {
  SchemaFacets?: SchemaFacet[];
  ObjectIdentifier?: string;
}
export const GetObjectInformationResponse = S.suspend(() =>
  S.Struct({
    SchemaFacets: S.optional(SchemaFacetList),
    ObjectIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "GetObjectInformationResponse",
}) as any as S.Schema<GetObjectInformationResponse>;
export interface GetSchemaAsJsonRequest {
  SchemaArn: string;
}
export const GetSchemaAsJsonRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/json",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSchemaAsJsonRequest",
}) as any as S.Schema<GetSchemaAsJsonRequest>;
export interface GetSchemaAsJsonResponse {
  Name?: string;
  Document?: string;
}
export const GetSchemaAsJsonResponse = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Document: S.optional(S.String) }),
).annotate({
  identifier: "GetSchemaAsJsonResponse",
}) as any as S.Schema<GetSchemaAsJsonResponse>;
export interface GetTypedLinkFacetInformationRequest {
  SchemaArn: string;
  Name: string;
}
export const GetTypedLinkFacetInformationRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTypedLinkFacetInformationRequest",
}) as any as S.Schema<GetTypedLinkFacetInformationRequest>;
export interface GetTypedLinkFacetInformationResponse {
  IdentityAttributeOrder?: string[];
}
export const GetTypedLinkFacetInformationResponse = S.suspend(() =>
  S.Struct({ IdentityAttributeOrder: S.optional(AttributeNameList) }),
).annotate({
  identifier: "GetTypedLinkFacetInformationResponse",
}) as any as S.Schema<GetTypedLinkFacetInformationResponse>;
export interface ListAppliedSchemaArnsRequest {
  DirectoryArn: string;
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAppliedSchemaArnsRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String,
    SchemaArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/applied",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAppliedSchemaArnsRequest",
}) as any as S.Schema<ListAppliedSchemaArnsRequest>;
export type Arns = string[];
export const Arns = S.Array(S.String);
export interface ListAppliedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export const ListAppliedSchemaArnsResponse = S.suspend(() =>
  S.Struct({ SchemaArns: S.optional(Arns), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAppliedSchemaArnsResponse",
}) as any as S.Schema<ListAppliedSchemaArnsResponse>;
export interface ListAttachedIndicesRequest {
  DirectoryArn: string;
  TargetReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListAttachedIndicesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    TargetReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/indices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttachedIndicesRequest",
}) as any as S.Schema<ListAttachedIndicesRequest>;
export interface ListAttachedIndicesResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export const ListAttachedIndicesResponse = S.suspend(() =>
  S.Struct({
    IndexAttachments: S.optional(IndexAttachmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttachedIndicesResponse",
}) as any as S.Schema<ListAttachedIndicesResponse>;
export interface ListDevelopmentSchemaArnsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDevelopmentSchemaArnsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/development",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevelopmentSchemaArnsRequest",
}) as any as S.Schema<ListDevelopmentSchemaArnsRequest>;
export interface ListDevelopmentSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export const ListDevelopmentSchemaArnsResponse = S.suspend(() =>
  S.Struct({ SchemaArns: S.optional(Arns), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDevelopmentSchemaArnsResponse",
}) as any as S.Schema<ListDevelopmentSchemaArnsResponse>;
export interface ListDirectoriesRequest {
  NextToken?: string;
  MaxResults?: number;
  state?: DirectoryState;
}
export const ListDirectoriesRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    state: S.optional(DirectoryState),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/directory/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDirectoriesRequest",
}) as any as S.Schema<ListDirectoriesRequest>;
export type DirectoryList = Directory[];
export const DirectoryList = S.Array(Directory);
export interface ListDirectoriesResponse {
  Directories: Directory[];
  NextToken?: string;
}
export const ListDirectoriesResponse = S.suspend(() =>
  S.Struct({ Directories: DirectoryList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDirectoriesResponse",
}) as any as S.Schema<ListDirectoriesResponse>;
export interface ListFacetAttributesRequest {
  SchemaArn: string;
  Name: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFacetAttributesRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/facet/attributes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFacetAttributesRequest",
}) as any as S.Schema<ListFacetAttributesRequest>;
export interface ListFacetAttributesResponse {
  Attributes?: FacetAttribute[];
  NextToken?: string;
}
export const ListFacetAttributesResponse = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(FacetAttributeList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFacetAttributesResponse",
}) as any as S.Schema<ListFacetAttributesResponse>;
export interface ListFacetNamesRequest {
  SchemaArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFacetNamesRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/facet/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFacetNamesRequest",
}) as any as S.Schema<ListFacetNamesRequest>;
export type FacetNameList = string[];
export const FacetNameList = S.Array(S.String);
export interface ListFacetNamesResponse {
  FacetNames?: string[];
  NextToken?: string;
}
export const ListFacetNamesResponse = S.suspend(() =>
  S.Struct({
    FacetNames: S.optional(FacetNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFacetNamesResponse",
}) as any as S.Schema<ListFacetNamesResponse>;
export interface ListIncomingTypedLinksRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListIncomingTypedLinksRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    FilterAttributeRanges: S.optional(TypedLinkAttributeRangeList),
    FilterTypedLink: S.optional(TypedLinkSchemaAndFacetName),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/incoming",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIncomingTypedLinksRequest",
}) as any as S.Schema<ListIncomingTypedLinksRequest>;
export interface ListIncomingTypedLinksResponse {
  LinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export const ListIncomingTypedLinksResponse = S.suspend(() =>
  S.Struct({
    LinkSpecifiers: S.optional(TypedLinkSpecifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIncomingTypedLinksResponse",
}) as any as S.Schema<ListIncomingTypedLinksResponse>;
export interface ListIndexRequest {
  DirectoryArn: string;
  RangesOnIndexedValues?: ObjectAttributeRange[];
  IndexReference: ObjectReference;
  MaxResults?: number;
  NextToken?: string;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListIndexRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    RangesOnIndexedValues: S.optional(ObjectAttributeRangeList),
    IndexReference: ObjectReference,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/index/targets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIndexRequest",
}) as any as S.Schema<ListIndexRequest>;
export interface ListIndexResponse {
  IndexAttachments?: IndexAttachment[];
  NextToken?: string;
}
export const ListIndexResponse = S.suspend(() =>
  S.Struct({
    IndexAttachments: S.optional(IndexAttachmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIndexResponse",
}) as any as S.Schema<ListIndexResponse>;
export interface ListManagedSchemaArnsRequest {
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListManagedSchemaArnsRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/managed",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedSchemaArnsRequest",
}) as any as S.Schema<ListManagedSchemaArnsRequest>;
export interface ListManagedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export const ListManagedSchemaArnsResponse = S.suspend(() =>
  S.Struct({ SchemaArns: S.optional(Arns), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListManagedSchemaArnsResponse",
}) as any as S.Schema<ListManagedSchemaArnsResponse>;
export interface ListObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
  FacetFilter?: SchemaFacet;
}
export const ListObjectAttributesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
    FacetFilter: S.optional(SchemaFacet),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/attributes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectAttributesRequest",
}) as any as S.Schema<ListObjectAttributesRequest>;
export interface ListObjectAttributesResponse {
  Attributes?: AttributeKeyAndValue[];
  NextToken?: string;
}
export const ListObjectAttributesResponse = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeKeyAndValueList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListObjectAttributesResponse",
}) as any as S.Schema<ListObjectAttributesResponse>;
export interface ListObjectChildrenRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListObjectChildrenRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/children",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectChildrenRequest",
}) as any as S.Schema<ListObjectChildrenRequest>;
export interface ListObjectChildrenResponse {
  Children?: { [key: string]: string | undefined };
  NextToken?: string;
}
export const ListObjectChildrenResponse = S.suspend(() =>
  S.Struct({
    Children: S.optional(LinkNameToObjectIdentifierMap),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListObjectChildrenResponse",
}) as any as S.Schema<ListObjectChildrenResponse>;
export interface ListObjectParentPathsRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const ListObjectParentPathsRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/parentpaths",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectParentPathsRequest",
}) as any as S.Schema<ListObjectParentPathsRequest>;
export interface ListObjectParentPathsResponse {
  PathToObjectIdentifiersList?: PathToObjectIdentifiers[];
  NextToken?: string;
}
export const ListObjectParentPathsResponse = S.suspend(() =>
  S.Struct({
    PathToObjectIdentifiersList: S.optional(PathToObjectIdentifiersList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListObjectParentPathsResponse",
}) as any as S.Schema<ListObjectParentPathsResponse>;
export interface ListObjectParentsRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
  IncludeAllLinksToEachParent?: boolean;
}
export const ListObjectParentsRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
    IncludeAllLinksToEachParent: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/parent",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectParentsRequest",
}) as any as S.Schema<ListObjectParentsRequest>;
export type ObjectIdentifierToLinkNameMap = {
  [key: string]: string | undefined;
};
export const ObjectIdentifierToLinkNameMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListObjectParentsResponse {
  Parents?: { [key: string]: string | undefined };
  NextToken?: string;
  ParentLinks?: ObjectIdentifierAndLinkNameTuple[];
}
export const ListObjectParentsResponse = S.suspend(() =>
  S.Struct({
    Parents: S.optional(ObjectIdentifierToLinkNameMap),
    NextToken: S.optional(S.String),
    ParentLinks: S.optional(ObjectIdentifierAndLinkNameList),
  }),
).annotate({
  identifier: "ListObjectParentsResponse",
}) as any as S.Schema<ListObjectParentsResponse>;
export interface ListObjectPoliciesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListObjectPoliciesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/object/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectPoliciesRequest",
}) as any as S.Schema<ListObjectPoliciesRequest>;
export interface ListObjectPoliciesResponse {
  AttachedPolicyIds?: string[];
  NextToken?: string;
}
export const ListObjectPoliciesResponse = S.suspend(() =>
  S.Struct({
    AttachedPolicyIds: S.optional(ObjectIdentifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListObjectPoliciesResponse",
}) as any as S.Schema<ListObjectPoliciesResponse>;
export interface ListOutgoingTypedLinksRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  FilterAttributeRanges?: TypedLinkAttributeRange[];
  FilterTypedLink?: TypedLinkSchemaAndFacetName;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListOutgoingTypedLinksRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    FilterAttributeRanges: S.optional(TypedLinkAttributeRangeList),
    FilterTypedLink: S.optional(TypedLinkSchemaAndFacetName),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/outgoing",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOutgoingTypedLinksRequest",
}) as any as S.Schema<ListOutgoingTypedLinksRequest>;
export interface ListOutgoingTypedLinksResponse {
  TypedLinkSpecifiers?: TypedLinkSpecifier[];
  NextToken?: string;
}
export const ListOutgoingTypedLinksResponse = S.suspend(() =>
  S.Struct({
    TypedLinkSpecifiers: S.optional(TypedLinkSpecifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOutgoingTypedLinksResponse",
}) as any as S.Schema<ListOutgoingTypedLinksResponse>;
export interface ListPolicyAttachmentsRequest {
  DirectoryArn: string;
  PolicyReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
  ConsistencyLevel?: ConsistencyLevel;
}
export const ListPolicyAttachmentsRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    PolicyReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ConsistencyLevel: S.optional(ConsistencyLevel).pipe(
      T.HttpHeader("x-amz-consistency-level"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/policy/attachment",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyAttachmentsRequest",
}) as any as S.Schema<ListPolicyAttachmentsRequest>;
export interface ListPolicyAttachmentsResponse {
  ObjectIdentifiers?: string[];
  NextToken?: string;
}
export const ListPolicyAttachmentsResponse = S.suspend(() =>
  S.Struct({
    ObjectIdentifiers: S.optional(ObjectIdentifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPolicyAttachmentsResponse",
}) as any as S.Schema<ListPolicyAttachmentsResponse>;
export interface ListPublishedSchemaArnsRequest {
  SchemaArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPublishedSchemaArnsRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/schema/published",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPublishedSchemaArnsRequest",
}) as any as S.Schema<ListPublishedSchemaArnsRequest>;
export interface ListPublishedSchemaArnsResponse {
  SchemaArns?: string[];
  NextToken?: string;
}
export const ListPublishedSchemaArnsResponse = S.suspend(() =>
  S.Struct({ SchemaArns: S.optional(Arns), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPublishedSchemaArnsResponse",
}) as any as S.Schema<ListPublishedSchemaArnsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/amazonclouddirectory/2017-01-11/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTypedLinkFacetAttributesRequest {
  SchemaArn: string;
  Name: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTypedLinkFacetAttributesRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet/attributes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTypedLinkFacetAttributesRequest",
}) as any as S.Schema<ListTypedLinkFacetAttributesRequest>;
export interface ListTypedLinkFacetAttributesResponse {
  Attributes?: TypedLinkAttributeDefinition[];
  NextToken?: string;
}
export const ListTypedLinkFacetAttributesResponse = S.suspend(() =>
  S.Struct({
    Attributes: S.optional(TypedLinkAttributeDefinitionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTypedLinkFacetAttributesResponse",
}) as any as S.Schema<ListTypedLinkFacetAttributesResponse>;
export interface ListTypedLinkFacetNamesRequest {
  SchemaArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTypedLinkFacetNamesRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTypedLinkFacetNamesRequest",
}) as any as S.Schema<ListTypedLinkFacetNamesRequest>;
export type TypedLinkNameList = string[];
export const TypedLinkNameList = S.Array(S.String);
export interface ListTypedLinkFacetNamesResponse {
  FacetNames?: string[];
  NextToken?: string;
}
export const ListTypedLinkFacetNamesResponse = S.suspend(() =>
  S.Struct({
    FacetNames: S.optional(TypedLinkNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTypedLinkFacetNamesResponse",
}) as any as S.Schema<ListTypedLinkFacetNamesResponse>;
export interface LookupPolicyRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  NextToken?: string;
  MaxResults?: number;
}
export const LookupPolicyRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/policy/lookup",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "LookupPolicyRequest",
}) as any as S.Schema<LookupPolicyRequest>;
export interface LookupPolicyResponse {
  PolicyToPathList?: PolicyToPath[];
  NextToken?: string;
}
export const LookupPolicyResponse = S.suspend(() =>
  S.Struct({
    PolicyToPathList: S.optional(PolicyToPathList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "LookupPolicyResponse",
}) as any as S.Schema<LookupPolicyResponse>;
export interface PublishSchemaRequest {
  DevelopmentSchemaArn: string;
  Version: string;
  MinorVersion?: string;
  Name?: string;
}
export const PublishSchemaRequest = S.suspend(() =>
  S.Struct({
    DevelopmentSchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Version: S.String,
    MinorVersion: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/publish",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishSchemaRequest",
}) as any as S.Schema<PublishSchemaRequest>;
export interface PublishSchemaResponse {
  PublishedSchemaArn?: string;
}
export const PublishSchemaResponse = S.suspend(() =>
  S.Struct({ PublishedSchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "PublishSchemaResponse",
}) as any as S.Schema<PublishSchemaResponse>;
export interface PutSchemaFromJsonRequest {
  SchemaArn: string;
  Document: string;
}
export const PutSchemaFromJsonRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Document: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/json",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSchemaFromJsonRequest",
}) as any as S.Schema<PutSchemaFromJsonRequest>;
export interface PutSchemaFromJsonResponse {
  Arn?: string;
}
export const PutSchemaFromJsonResponse = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "PutSchemaFromJsonResponse",
}) as any as S.Schema<PutSchemaFromJsonResponse>;
export interface RemoveFacetFromObjectRequest {
  DirectoryArn: string;
  SchemaFacet: SchemaFacet;
  ObjectReference: ObjectReference;
}
export const RemoveFacetFromObjectRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    SchemaFacet: SchemaFacet,
    ObjectReference: ObjectReference,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/facets/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFacetFromObjectRequest",
}) as any as S.Schema<RemoveFacetFromObjectRequest>;
export interface RemoveFacetFromObjectResponse {}
export const RemoveFacetFromObjectResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveFacetFromObjectResponse",
}) as any as S.Schema<RemoveFacetFromObjectResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/tags/add",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/tags/remove",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface FacetAttributeUpdate {
  Attribute?: FacetAttribute;
  Action?: UpdateActionType;
}
export const FacetAttributeUpdate = S.suspend(() =>
  S.Struct({
    Attribute: S.optional(FacetAttribute),
    Action: S.optional(UpdateActionType),
  }),
).annotate({
  identifier: "FacetAttributeUpdate",
}) as any as S.Schema<FacetAttributeUpdate>;
export type FacetAttributeUpdateList = FacetAttributeUpdate[];
export const FacetAttributeUpdateList = S.Array(FacetAttributeUpdate);
export interface UpdateFacetRequest {
  SchemaArn: string;
  Name: string;
  AttributeUpdates?: FacetAttributeUpdate[];
  ObjectType?: ObjectType;
}
export const UpdateFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
    AttributeUpdates: S.optional(FacetAttributeUpdateList),
    ObjectType: S.optional(ObjectType),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/amazonclouddirectory/2017-01-11/facet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFacetRequest",
}) as any as S.Schema<UpdateFacetRequest>;
export interface UpdateFacetResponse {}
export const UpdateFacetResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateFacetResponse",
}) as any as S.Schema<UpdateFacetResponse>;
export interface UpdateLinkAttributesRequest {
  DirectoryArn: string;
  TypedLinkSpecifier: TypedLinkSpecifier;
  AttributeUpdates: LinkAttributeUpdate[];
}
export const UpdateLinkAttributesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    TypedLinkSpecifier: TypedLinkSpecifier,
    AttributeUpdates: LinkAttributeUpdateList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/attributes/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLinkAttributesRequest",
}) as any as S.Schema<UpdateLinkAttributesRequest>;
export interface UpdateLinkAttributesResponse {}
export const UpdateLinkAttributesResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLinkAttributesResponse",
}) as any as S.Schema<UpdateLinkAttributesResponse>;
export interface UpdateObjectAttributesRequest {
  DirectoryArn: string;
  ObjectReference: ObjectReference;
  AttributeUpdates: ObjectAttributeUpdate[];
}
export const UpdateObjectAttributesRequest = S.suspend(() =>
  S.Struct({
    DirectoryArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    ObjectReference: ObjectReference,
    AttributeUpdates: ObjectAttributeUpdateList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/object/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateObjectAttributesRequest",
}) as any as S.Schema<UpdateObjectAttributesRequest>;
export interface UpdateObjectAttributesResponse {
  ObjectIdentifier?: string;
}
export const UpdateObjectAttributesResponse = S.suspend(() =>
  S.Struct({ ObjectIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "UpdateObjectAttributesResponse",
}) as any as S.Schema<UpdateObjectAttributesResponse>;
export interface UpdateSchemaRequest {
  SchemaArn: string;
  Name: string;
}
export const UpdateSchemaRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSchemaRequest",
}) as any as S.Schema<UpdateSchemaRequest>;
export interface UpdateSchemaResponse {
  SchemaArn?: string;
}
export const UpdateSchemaResponse = S.suspend(() =>
  S.Struct({ SchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateSchemaResponse",
}) as any as S.Schema<UpdateSchemaResponse>;
export interface TypedLinkFacetAttributeUpdate {
  Attribute: TypedLinkAttributeDefinition;
  Action: UpdateActionType;
}
export const TypedLinkFacetAttributeUpdate = S.suspend(() =>
  S.Struct({
    Attribute: TypedLinkAttributeDefinition,
    Action: UpdateActionType,
  }),
).annotate({
  identifier: "TypedLinkFacetAttributeUpdate",
}) as any as S.Schema<TypedLinkFacetAttributeUpdate>;
export type TypedLinkFacetAttributeUpdateList = TypedLinkFacetAttributeUpdate[];
export const TypedLinkFacetAttributeUpdateList = S.Array(
  TypedLinkFacetAttributeUpdate,
);
export interface UpdateTypedLinkFacetRequest {
  SchemaArn: string;
  Name: string;
  AttributeUpdates: TypedLinkFacetAttributeUpdate[];
  IdentityAttributeOrder: string[];
}
export const UpdateTypedLinkFacetRequest = S.suspend(() =>
  S.Struct({
    SchemaArn: S.String.pipe(T.HttpHeader("x-amz-data-partition")),
    Name: S.String,
    AttributeUpdates: TypedLinkFacetAttributeUpdateList,
    IdentityAttributeOrder: AttributeNameList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/typedlink/facet",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTypedLinkFacetRequest",
}) as any as S.Schema<UpdateTypedLinkFacetRequest>;
export interface UpdateTypedLinkFacetResponse {}
export const UpdateTypedLinkFacetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTypedLinkFacetResponse",
}) as any as S.Schema<UpdateTypedLinkFacetResponse>;
export interface UpgradeAppliedSchemaRequest {
  PublishedSchemaArn: string;
  DirectoryArn: string;
  DryRun?: boolean;
}
export const UpgradeAppliedSchemaRequest = S.suspend(() =>
  S.Struct({
    PublishedSchemaArn: S.String,
    DirectoryArn: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/upgradeapplied",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradeAppliedSchemaRequest",
}) as any as S.Schema<UpgradeAppliedSchemaRequest>;
export interface UpgradeAppliedSchemaResponse {
  UpgradedSchemaArn?: string;
  DirectoryArn?: string;
}
export const UpgradeAppliedSchemaResponse = S.suspend(() =>
  S.Struct({
    UpgradedSchemaArn: S.optional(S.String),
    DirectoryArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpgradeAppliedSchemaResponse",
}) as any as S.Schema<UpgradeAppliedSchemaResponse>;
export interface UpgradePublishedSchemaRequest {
  DevelopmentSchemaArn: string;
  PublishedSchemaArn: string;
  MinorVersion: string;
  DryRun?: boolean;
}
export const UpgradePublishedSchemaRequest = S.suspend(() =>
  S.Struct({
    DevelopmentSchemaArn: S.String,
    PublishedSchemaArn: S.String,
    MinorVersion: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/amazonclouddirectory/2017-01-11/schema/upgradepublished",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradePublishedSchemaRequest",
}) as any as S.Schema<UpgradePublishedSchemaRequest>;
export interface UpgradePublishedSchemaResponse {
  UpgradedSchemaArn?: string;
}
export const UpgradePublishedSchemaResponse = S.suspend(() =>
  S.Struct({ UpgradedSchemaArn: S.optional(S.String) }),
).annotate({
  identifier: "UpgradePublishedSchemaResponse",
}) as any as S.Schema<UpgradePublishedSchemaResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class DirectoryNotEnabledException extends S.TaggedErrorClass<DirectoryNotEnabledException>()(
  "DirectoryNotEnabledException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class FacetValidationException extends S.TaggedErrorClass<FacetValidationException>()(
  "FacetValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InternalServiceException extends S.TaggedErrorClass<InternalServiceException>()(
  "InternalServiceException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class InvalidArnException extends S.TaggedErrorClass<InvalidArnException>()(
  "InvalidArnException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class RetryableConflictException extends S.TaggedErrorClass<RetryableConflictException>()(
  "RetryableConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidAttachmentException extends S.TaggedErrorClass<InvalidAttachmentException>()(
  "InvalidAttachmentException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class SchemaAlreadyExistsException extends S.TaggedErrorClass<SchemaAlreadyExistsException>()(
  "SchemaAlreadyExistsException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class LinkNameAlreadyInUseException extends S.TaggedErrorClass<LinkNameAlreadyInUseException>()(
  "LinkNameAlreadyInUseException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class NotPolicyException extends S.TaggedErrorClass<NotPolicyException>()(
  "NotPolicyException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class IndexedAttributeMissingException extends S.TaggedErrorClass<IndexedAttributeMissingException>()(
  "IndexedAttributeMissingException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class NotIndexException extends S.TaggedErrorClass<NotIndexException>()(
  "NotIndexException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class BatchWriteException extends S.TaggedErrorClass<BatchWriteException>()(
  "BatchWriteException",
  {
    Index: S.optional(S.Number),
    Type: S.optional(BatchWriteExceptionType),
    Message: S.optional(S.String),
  },
) {}
export class DirectoryAlreadyExistsException extends S.TaggedErrorClass<DirectoryAlreadyExistsException>()(
  "DirectoryAlreadyExistsException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class FacetAlreadyExistsException extends S.TaggedErrorClass<FacetAlreadyExistsException>()(
  "FacetAlreadyExistsException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class InvalidRuleException extends S.TaggedErrorClass<InvalidRuleException>()(
  "InvalidRuleException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnsupportedIndexTypeException extends S.TaggedErrorClass<UnsupportedIndexTypeException>()(
  "UnsupportedIndexTypeException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class DirectoryDeletedException extends S.TaggedErrorClass<DirectoryDeletedException>()(
  "DirectoryDeletedException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class DirectoryNotDisabledException extends S.TaggedErrorClass<DirectoryNotDisabledException>()(
  "DirectoryNotDisabledException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class FacetInUseException extends S.TaggedErrorClass<FacetInUseException>()(
  "FacetInUseException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class FacetNotFoundException extends S.TaggedErrorClass<FacetNotFoundException>()(
  "FacetNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ObjectNotDetachedException extends S.TaggedErrorClass<ObjectNotDetachedException>()(
  "ObjectNotDetachedException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class StillContainsLinksException extends S.TaggedErrorClass<StillContainsLinksException>()(
  "StillContainsLinksException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ObjectAlreadyDetachedException extends S.TaggedErrorClass<ObjectAlreadyDetachedException>()(
  "ObjectAlreadyDetachedException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class NotNodeException extends S.TaggedErrorClass<NotNodeException>()(
  "NotNodeException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException extends S.TaggedErrorClass<InvalidNextTokenException>()(
  "InvalidNextTokenException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class CannotListParentOfRootException extends S.TaggedErrorClass<CannotListParentOfRootException>()(
  "CannotListParentOfRootException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidTaggingRequestException extends S.TaggedErrorClass<InvalidTaggingRequestException>()(
  "InvalidTaggingRequestException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class SchemaAlreadyPublishedException extends S.TaggedErrorClass<SchemaAlreadyPublishedException>()(
  "SchemaAlreadyPublishedException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidSchemaDocException extends S.TaggedErrorClass<InvalidSchemaDocException>()(
  "InvalidSchemaDocException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidFacetUpdateException extends S.TaggedErrorClass<InvalidFacetUpdateException>()(
  "InvalidFacetUpdateException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class IncompatibleSchemaException extends S.TaggedErrorClass<IncompatibleSchemaException>()(
  "IncompatibleSchemaException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddFacetToObjectRequest,
  output: AddFacetToObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApplySchemaRequest,
  output: ApplySchemaResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachObjectRequest,
  output: AttachObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachPolicyRequest,
  output: AttachPolicyResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachToIndexRequest,
  output: AttachToIndexResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachTypedLinkRequest,
  output: AttachTypedLinkResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchReadRequest,
  output: BatchReadResponse,
  errors: [
    AccessDeniedException,
    DirectoryNotEnabledException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchWriteRequest,
  output: BatchWriteResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDirectoryRequest,
  output: CreateDirectoryResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFacetRequest,
  output: CreateFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIndexRequest,
  output: CreateIndexResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateObjectRequest,
  output: CreateObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSchemaRequest,
  output: CreateSchemaResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    SchemaAlreadyExistsException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTypedLinkFacetRequest,
  output: CreateTypedLinkFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDirectoryRequest,
  output: DeleteDirectoryResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFacetRequest,
  output: DeleteFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteObjectRequest,
  output: DeleteObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSchemaRequest,
  output: DeleteSchemaResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTypedLinkFacetRequest,
  output: DeleteTypedLinkFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachFromIndexRequest,
  output: DetachFromIndexResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachObjectRequest,
  output: DetachObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachPolicyRequest,
  output: DetachPolicyResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachTypedLinkRequest,
  output: DetachTypedLinkResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableDirectoryRequest,
  output: DisableDirectoryResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableDirectoryRequest,
  output: EnableDirectoryResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppliedSchemaVersionRequest,
  output: GetAppliedSchemaVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDirectoryRequest,
  output: GetDirectoryResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFacetRequest,
  output: GetFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLinkAttributesRequest,
  output: GetLinkAttributesResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetObjectAttributesRequest,
  output: GetObjectAttributesResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetObjectInformationRequest,
  output: GetObjectInformationResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSchemaAsJsonRequest,
  output: GetSchemaAsJsonResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTypedLinkFacetInformationRequest,
  output: GetTypedLinkFacetInformationResponse,
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
}));
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
export const listAppliedSchemaArns: API.OperationMethod<
  ListAppliedSchemaArnsRequest,
  ListAppliedSchemaArnsResponse,
  ListAppliedSchemaArnsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAppliedSchemaArnsRequest,
  ) => stream.Stream<
    ListAppliedSchemaArnsResponse,
    ListAppliedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAppliedSchemaArnsRequest,
  ) => stream.Stream<
    unknown,
    ListAppliedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppliedSchemaArnsRequest,
  output: ListAppliedSchemaArnsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listAttachedIndices: API.OperationMethod<
  ListAttachedIndicesRequest,
  ListAttachedIndicesResponse,
  ListAttachedIndicesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAttachedIndicesRequest,
  ) => stream.Stream<
    ListAttachedIndicesResponse,
    ListAttachedIndicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAttachedIndicesRequest,
  ) => stream.Stream<
    unknown,
    ListAttachedIndicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAttachedIndicesRequest,
  output: ListAttachedIndicesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listDevelopmentSchemaArns: API.OperationMethod<
  ListDevelopmentSchemaArnsRequest,
  ListDevelopmentSchemaArnsResponse,
  ListDevelopmentSchemaArnsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDevelopmentSchemaArnsRequest,
  ) => stream.Stream<
    ListDevelopmentSchemaArnsResponse,
    ListDevelopmentSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDevelopmentSchemaArnsRequest,
  ) => stream.Stream<
    unknown,
    ListDevelopmentSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDevelopmentSchemaArnsRequest,
  output: ListDevelopmentSchemaArnsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listDirectories: API.OperationMethod<
  ListDirectoriesRequest,
  ListDirectoriesResponse,
  ListDirectoriesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDirectoriesRequest,
  ) => stream.Stream<
    ListDirectoriesResponse,
    ListDirectoriesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDirectoriesRequest,
  ) => stream.Stream<
    unknown,
    ListDirectoriesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDirectoriesRequest,
  output: ListDirectoriesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    LimitExceededException,
    RetryableConflictException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFacetAttributes: API.OperationMethod<
  ListFacetAttributesRequest,
  ListFacetAttributesResponse,
  ListFacetAttributesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFacetAttributesRequest,
  ) => stream.Stream<
    ListFacetAttributesResponse,
    ListFacetAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFacetAttributesRequest,
  ) => stream.Stream<
    unknown,
    ListFacetAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFacetAttributesRequest,
  output: ListFacetAttributesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFacetNames: API.OperationMethod<
  ListFacetNamesRequest,
  ListFacetNamesResponse,
  ListFacetNamesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFacetNamesRequest,
  ) => stream.Stream<
    ListFacetNamesResponse,
    ListFacetNamesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFacetNamesRequest,
  ) => stream.Stream<
    unknown,
    ListFacetNamesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFacetNamesRequest,
  output: ListFacetNamesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIncomingTypedLinksRequest,
  output: ListIncomingTypedLinksResponse,
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
}));
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
export const listIndex: API.OperationMethod<
  ListIndexRequest,
  ListIndexResponse,
  ListIndexError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListIndexRequest,
  ) => stream.Stream<
    ListIndexResponse,
    ListIndexError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListIndexRequest,
  ) => stream.Stream<
    unknown,
    ListIndexError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListIndexRequest,
  output: ListIndexResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listManagedSchemaArns: API.OperationMethod<
  ListManagedSchemaArnsRequest,
  ListManagedSchemaArnsResponse,
  ListManagedSchemaArnsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListManagedSchemaArnsRequest,
  ) => stream.Stream<
    ListManagedSchemaArnsResponse,
    ListManagedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedSchemaArnsRequest,
  ) => stream.Stream<
    unknown,
    ListManagedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedSchemaArnsRequest,
  output: ListManagedSchemaArnsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listObjectAttributes: API.OperationMethod<
  ListObjectAttributesRequest,
  ListObjectAttributesResponse,
  ListObjectAttributesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListObjectAttributesRequest,
  ) => stream.Stream<
    ListObjectAttributesResponse,
    ListObjectAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListObjectAttributesRequest,
  ) => stream.Stream<
    unknown,
    ListObjectAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListObjectAttributesRequest,
  output: ListObjectAttributesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listObjectChildren: API.OperationMethod<
  ListObjectChildrenRequest,
  ListObjectChildrenResponse,
  ListObjectChildrenError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListObjectChildrenRequest,
  ) => stream.Stream<
    ListObjectChildrenResponse,
    ListObjectChildrenError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListObjectChildrenRequest,
  ) => stream.Stream<
    unknown,
    ListObjectChildrenError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListObjectChildrenRequest,
  output: ListObjectChildrenResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listObjectParentPaths: API.OperationMethod<
  ListObjectParentPathsRequest,
  ListObjectParentPathsResponse,
  ListObjectParentPathsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListObjectParentPathsRequest,
  ) => stream.Stream<
    ListObjectParentPathsResponse,
    ListObjectParentPathsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListObjectParentPathsRequest,
  ) => stream.Stream<
    unknown,
    ListObjectParentPathsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListObjectParentPathsRequest,
  output: ListObjectParentPathsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listObjectParents: API.OperationMethod<
  ListObjectParentsRequest,
  ListObjectParentsResponse,
  ListObjectParentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListObjectParentsRequest,
  ) => stream.Stream<
    ListObjectParentsResponse,
    ListObjectParentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListObjectParentsRequest,
  ) => stream.Stream<
    unknown,
    ListObjectParentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListObjectParentsRequest,
  output: ListObjectParentsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listObjectPolicies: API.OperationMethod<
  ListObjectPoliciesRequest,
  ListObjectPoliciesResponse,
  ListObjectPoliciesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListObjectPoliciesRequest,
  ) => stream.Stream<
    ListObjectPoliciesResponse,
    ListObjectPoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListObjectPoliciesRequest,
  ) => stream.Stream<
    unknown,
    ListObjectPoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListObjectPoliciesRequest,
  output: ListObjectPoliciesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListOutgoingTypedLinksRequest,
  output: ListOutgoingTypedLinksResponse,
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
}));
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
export const listPolicyAttachments: API.OperationMethod<
  ListPolicyAttachmentsRequest,
  ListPolicyAttachmentsResponse,
  ListPolicyAttachmentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPolicyAttachmentsRequest,
  ) => stream.Stream<
    ListPolicyAttachmentsResponse,
    ListPolicyAttachmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPolicyAttachmentsRequest,
  ) => stream.Stream<
    unknown,
    ListPolicyAttachmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyAttachmentsRequest,
  output: ListPolicyAttachmentsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listPublishedSchemaArns: API.OperationMethod<
  ListPublishedSchemaArnsRequest,
  ListPublishedSchemaArnsResponse,
  ListPublishedSchemaArnsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPublishedSchemaArnsRequest,
  ) => stream.Stream<
    ListPublishedSchemaArnsResponse,
    ListPublishedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPublishedSchemaArnsRequest,
  ) => stream.Stream<
    unknown,
    ListPublishedSchemaArnsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPublishedSchemaArnsRequest,
  output: ListPublishedSchemaArnsResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    ListTagsForResourceResponse,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    unknown,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listTypedLinkFacetAttributes: API.OperationMethod<
  ListTypedLinkFacetAttributesRequest,
  ListTypedLinkFacetAttributesResponse,
  ListTypedLinkFacetAttributesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTypedLinkFacetAttributesRequest,
  ) => stream.Stream<
    ListTypedLinkFacetAttributesResponse,
    ListTypedLinkFacetAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTypedLinkFacetAttributesRequest,
  ) => stream.Stream<
    unknown,
    ListTypedLinkFacetAttributesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTypedLinkFacetAttributesRequest,
  output: ListTypedLinkFacetAttributesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listTypedLinkFacetNames: API.OperationMethod<
  ListTypedLinkFacetNamesRequest,
  ListTypedLinkFacetNamesResponse,
  ListTypedLinkFacetNamesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTypedLinkFacetNamesRequest,
  ) => stream.Stream<
    ListTypedLinkFacetNamesResponse,
    ListTypedLinkFacetNamesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTypedLinkFacetNamesRequest,
  ) => stream.Stream<
    unknown,
    ListTypedLinkFacetNamesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTypedLinkFacetNamesRequest,
  output: ListTypedLinkFacetNamesResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const lookupPolicy: API.OperationMethod<
  LookupPolicyRequest,
  LookupPolicyResponse,
  LookupPolicyError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: LookupPolicyRequest,
  ) => stream.Stream<
    LookupPolicyResponse,
    LookupPolicyError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: LookupPolicyRequest,
  ) => stream.Stream<
    unknown,
    LookupPolicyError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: LookupPolicyRequest,
  output: LookupPolicyResponse,
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishSchemaRequest,
  output: PublishSchemaResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSchemaFromJsonRequest,
  output: PutSchemaFromJsonResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveFacetFromObjectRequest,
  output: RemoveFacetFromObjectResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFacetRequest,
  output: UpdateFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLinkAttributesRequest,
  output: UpdateLinkAttributesResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateObjectAttributesRequest,
  output: UpdateObjectAttributesResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSchemaRequest,
  output: UpdateSchemaResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidArnException,
    LimitExceededException,
    ResourceNotFoundException,
    RetryableConflictException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTypedLinkFacetRequest,
  output: UpdateTypedLinkFacetResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradeAppliedSchemaRequest,
  output: UpgradeAppliedSchemaResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradePublishedSchemaRequest,
  output: UpgradePublishedSchemaResponse,
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
}));
