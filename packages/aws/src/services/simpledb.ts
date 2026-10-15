import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://sdb.amazonaws.com/doc/2009-04-15/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SimpleDB",
  serviceShapeName: "AmazonSimpleDB",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv2({ name: "sdb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2009-04-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsQuery();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      if (UseDualStack === true) {
        return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
      }
      return e(Endpoint);
    }
    if (Region != null) {
      if (Region === "us-east-1") {
        return e("https://sdb.amazonaws.com");
      }
      return e(`https://sdb.${Region}.amazonaws.com`);
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://sdb.{R}.{D}","properties":{},"headers":{}}',
  [
    "us-east-1",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AttributeDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AttributeDoesNotExist>()("AttributeDoesNotExist", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    BoxUsage: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withNotFoundError) {}
export class DuplicateItemName
  extends /*@__PURE__*/ S.TaggedError<DuplicateItemName>()(
    "DuplicateItemName",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumberPredicates
  extends /*@__PURE__*/ S.TaggedError<InvalidNumberPredicates>()(
    "InvalidNumberPredicates",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumberValueTests
  extends /*@__PURE__*/ S.TaggedError<InvalidNumberValueTests>()(
    "InvalidNumberValueTests",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValue>()(
    "InvalidParameterValue",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryExpression
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryExpression>()(
    "InvalidQueryExpression",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MissingParameter
  extends /*@__PURE__*/ S.TaggedError<MissingParameter>()(
    "MissingParameter",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoSuchDomain
  extends /*@__PURE__*/ S.TaggedError<NoSuchDomain>()(
    "NoSuchDomain",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class NumberDomainAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainAttributesExceeded>()(
    "NumberDomainAttributesExceeded",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberDomainBytesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainBytesExceeded>()("NumberDomainBytesExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    BoxUsage: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withQuotaError) {}
export class NumberDomainsExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainsExceeded>()("NumberDomainsExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    BoxUsage: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withQuotaError) {}
export class NumberItemAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberItemAttributesExceeded>()(
    "NumberItemAttributesExceeded",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberSubmittedAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberSubmittedAttributesExceeded>()(
    "NumberSubmittedAttributesExceeded",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberSubmittedItemsExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberSubmittedItemsExceeded>()(
    "NumberSubmittedItemsExceeded",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class RequestTimeout
  extends /*@__PURE__*/ S.TaggedError<RequestTimeout>()(
    "RequestTimeout",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class TooManyRequestedAttributes
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestedAttributes>()(
    "TooManyRequestedAttributes",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BoxUsage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainName = string;
export interface DeletableAttribute {
  Name: string;
  Value?: string;
}
export type DeletableAttributeList = DeletableAttribute[];
export interface DeletableItem {
  ItemName: string;
  Attributes?: DeletableAttribute[];
}
export type DeletableItemList = DeletableItem[];
export interface BatchDeleteAttributesRequest {
  DomainName: string;
  Items: DeletableItem[];
}
export interface BatchDeleteAttributesResponse {}
export interface ReplaceableAttribute {
  Name: string;
  Value: string;
  Replace?: boolean;
}
export type ReplaceableAttributeList = ReplaceableAttribute[];
export interface ReplaceableItem {
  ItemName: string;
  Attributes: ReplaceableAttribute[];
}
export type ReplaceableItemList = ReplaceableItem[];
export interface BatchPutAttributesRequest {
  DomainName: string;
  Items: ReplaceableItem[];
}
export interface BatchPutAttributesResponse {}
export interface CreateDomainRequest {
  DomainName: string;
}
export interface CreateDomainResponse {}
export interface UpdateCondition {
  Name?: string;
  Value?: string;
  Exists?: boolean;
}
export interface DeleteAttributesRequest {
  DomainName: string;
  ItemName: string;
  Attributes?: DeletableAttribute[];
  Expected?: UpdateCondition;
}
export interface DeleteAttributesResponse {}
export interface DeleteDomainRequest {
  DomainName: string;
}
export interface DeleteDomainResponse {}
export interface DomainMetadataRequest {
  DomainName: string;
}
export interface DomainMetadataResponse {
  ItemCount?: number;
  ItemNamesSizeBytes?: number;
  AttributeNameCount?: number;
  AttributeNamesSizeBytes?: number;
  AttributeValueCount?: number;
  AttributeValuesSizeBytes?: number;
  Timestamp?: number;
}
export type AttributeNameList = string[];
export interface GetAttributesRequest {
  DomainName: string;
  ItemName: string;
  AttributeNames?: string[];
  ConsistentRead?: boolean;
}
export interface Attribute {
  Name: string;
  AlternateNameEncoding?: string;
  Value: string;
  AlternateValueEncoding?: string;
}
export type AttributeList = Attribute[];
export interface GetAttributesResponse {
  Attributes?: Attribute[];
}
export interface ListDomainsRequest {
  MaxNumberOfDomains?: number;
  NextToken?: string;
}
export type DomainNameList = string[];
export interface ListDomainsResponse {
  DomainNames?: string[];
  NextToken?: string;
}
export interface PutAttributesRequest {
  DomainName: string;
  ItemName: string;
  Attributes: ReplaceableAttribute[];
  Expected?: UpdateCondition;
}
export interface PutAttributesResponse {}
export interface SelectRequest {
  SelectExpression: string;
  NextToken?: string;
  ConsistentRead?: boolean;
}
export interface Item {
  Name: string;
  AlternateNameEncoding?: string;
  Attributes?: Attribute[];
}
export type ItemList = Item[];
export interface SelectResponse {
  Items?: Item[];
  NextToken?: string;
}
export type BatchDeleteAttributesError = CommonErrors;
/**
 * Deletes attributes (or whole items) on up to 25 items in a single call. Idempotent -- missing items/attributes are not an error.
 */
export const batchDeleteAttributes: API.OperationMethod<
  BatchDeleteAttributesRequest,
  BatchDeleteAttributesResponse,
  BatchDeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<BatchDeleteAttributesRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<BatchDeleteAttributesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAttributes",
}));

export type BatchPutAttributesError =
  | DuplicateItemName
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | NumberDomainAttributesExceeded
  | NumberDomainBytesExceeded
  | NumberItemAttributesExceeded
  | NumberSubmittedAttributesExceeded
  | NumberSubmittedItemsExceeded
  | CommonErrors;
/**
 * Puts attributes on up to 25 items in a single call.
 */
export const batchPutAttributes: API.OperationMethod<
  BatchPutAttributesRequest,
  BatchPutAttributesResponse,
  BatchPutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(10, __c2, 2) as any as S.Schema<BatchPutAttributesRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<BatchPutAttributesResponse>,
  errors: [
    DuplicateItemName,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
    NumberDomainAttributesExceeded,
    NumberDomainBytesExceeded,
    NumberItemAttributesExceeded,
    NumberSubmittedAttributesExceeded,
    NumberSubmittedItemsExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutAttributes",
}));

export type CreateDomainError =
  | InvalidParameterValue
  | MissingParameter
  | NumberDomainsExceeded
  | CommonErrors;
/**
 * Creates a new SimpleDB domain. Idempotent -- creating an existing domain succeeds without error.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<CreateDomainRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<CreateDomainResponse>,
  errors: [InvalidParameterValue, MissingParameter, NumberDomainsExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type DeleteAttributesError =
  | AttributeDoesNotExist
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Deletes one or more attributes of a SimpleDB item -- or the whole item when no attributes are named. Idempotent: deleting a missing attribute/item succeeds.
 */
export const deleteAttributes: API.OperationMethod<
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  DeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<DeleteAttributesRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<DeleteAttributesResponse>,
  errors: [AttributeDoesNotExist, InvalidParameterValue, MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributes",
}));

export type DeleteDomainError = MissingParameter | CommonErrors;
/**
 * Deletes a SimpleDB domain and all of its items. Idempotent -- deleting a missing domain succeeds without error.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<DeleteDomainResponse>,
  errors: [MissingParameter],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DomainMetadataError = MissingParameter | NoSuchDomain | CommonErrors;
/**
 * Returns information about a SimpleDB domain (item count, sizes, timestamp).
 */
export const domainMetadata: API.OperationMethod<
  DomainMetadataRequest,
  DomainMetadataResponse,
  DomainMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<DomainMetadataRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<DomainMetadataResponse>,
  errors: [MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DomainMetadata",
}));

export type GetAttributesError =
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Returns all (or the requested subset of) attributes of a SimpleDB item. Reads are eventually consistent unless `ConsistentRead` is set.
 */
export const getAttributes: API.OperationMethod<
  GetAttributesRequest,
  GetAttributesResponse,
  GetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(37, __c9, 1) as any as S.Schema<GetAttributesRequest>,
  output: __S(38, __c9, 2) as any as S.Schema<GetAttributesResponse>,
  errors: [InvalidParameterValue, MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributes",
}));

export type ListDomainsError = InvalidNextToken | InvalidParameterValue | CommonErrors;
/**
 * Lists all SimpleDB domains in the account/region. Paginated.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<ListDomainsRequest>,
  output: __S(46, __c11, 2) as any as S.Schema<ListDomainsResponse>,
  errors: [InvalidNextToken, InvalidParameterValue],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainNames",
    pageSize: "MaxNumberOfDomains",
  } as const,
})) as any;

export type PutAttributesError =
  | AttributeDoesNotExist
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | NumberDomainAttributesExceeded
  | NumberDomainBytesExceeded
  | NumberItemAttributesExceeded
  | CommonErrors;
/**
 * Creates or replaces attributes of a SimpleDB item. With `Replace: true` an attribute's existing values are overwritten; otherwise values accumulate.
 */
export const putAttributes: API.OperationMethod<
  PutAttributesRequest,
  PutAttributesResponse,
  PutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<PutAttributesRequest>,
  output: __S(49, __c12, 1) as any as S.Schema<PutAttributesResponse>,
  errors: [
    AttributeDoesNotExist,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
    NumberDomainAttributesExceeded,
    NumberDomainBytesExceeded,
    NumberItemAttributesExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributes",
}));

export type SelectError =
  | InvalidNextToken
  | InvalidNumberPredicates
  | InvalidNumberValueTests
  | InvalidParameterValue
  | InvalidQueryExpression
  | MissingParameter
  | NoSuchDomain
  | RequestTimeout
  | TooManyRequestedAttributes
  | CommonErrors;
/**
 * Runs a SimpleDB select expression (`select output_list from domain [where ...]`). Paginated via `NextToken`.
 */
export const select: API.PaginatedOperationMethod<
  SelectRequest,
  SelectResponse,
  SelectError,
  Credentials | HttpClient.HttpClient,
  Item
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<SelectRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<SelectResponse>,
  errors: [
    InvalidNextToken,
    InvalidNumberPredicates,
    InvalidNumberValueTests,
    InvalidParameterValue,
    InvalidQueryExpression,
    MissingParameter,
    NoSuchDomain,
    RequestTimeout,
    TooManyRequestedAttributes,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Select",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Items" } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ItemName: S.String,
          Attributes: S.optional(__S(5, __c1, 1)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "DeletableItem" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          Items: __S(1, __c0, 1).pipe(T.XmlName("Item"), T.XmlFlattened()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteAttributesRequest" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "BatchDeleteAttributesResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "DeletableAttribute",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ItemName: S.String,
          Attributes: __S(13, __c3, 1).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "ReplaceableItem" });
    case 1:
      return S.Array(__S(8, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          Items: __S(9, __c2, 1).pipe(T.XmlName("Item"), T.XmlFlattened()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchPutAttributesRequest" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "BatchPutAttributesResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.String, Replace: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ReplaceableAttribute" });
    case 1:
      return S.Array(__S(12, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDomainRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateDomainResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ItemName: S.String,
          Attributes: S.optional(__S(5, __c1, 1)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
          Expected: S.optional(__S(24, __c6, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAttributesRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAttributesResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Value: S.optional(S.String),
          Exists: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateCondition" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDomainResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DomainMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ItemCount: S.optional(S.Number),
          ItemNamesSizeBytes: S.optional(S.Number),
          AttributeNameCount: S.optional(S.Number),
          AttributeNamesSizeBytes: S.optional(S.Number),
          AttributeValueCount: S.optional(S.Number),
          AttributeValuesSizeBytes: S.optional(S.Number),
          Timestamp: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DomainMetadataResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ItemName: S.String,
          AttributeNames: S.optional(__S(36, __c9, 0)).pipe(
            T.XmlName("AttributeName"),
            T.XmlFlattened(),
          ),
          ConsistentRead: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAttributesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(41, __c10, 1)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }).pipe(ns),
      ).annotate({ identifier: "GetAttributesResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          AlternateNameEncoding: S.optional(S.String),
          Value: S.String,
          AlternateValueEncoding: S.optional(S.String),
        }),
      ).annotate({ identifier: "Attribute" });
    case 1:
      return S.Array(__S(40, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxNumberOfDomains: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainNames: S.optional(__S(45, __c11, 1)).pipe(
            T.XmlName("DomainName"),
            T.XmlFlattened(),
          ),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDomainsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ItemName: S.String,
          Attributes: __S(13, __c3, 1).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
          Expected: S.optional(__S(24, __c6, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAttributesRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutAttributesResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SelectExpression: S.String,
          NextToken: S.optional(S.String),
          ConsistentRead: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SelectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          AlternateNameEncoding: S.optional(S.String),
          Attributes: S.optional(__S(41, __c10, 1)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "Item" });
    case 2:
      return S.Array(__S(53, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__S(54, __c13, 2)).pipe(T.XmlName("Item"), T.XmlFlattened()),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "SelectResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
