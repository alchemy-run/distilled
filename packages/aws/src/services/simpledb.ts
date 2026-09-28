import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SimpleDB",
  target: "AmazonSimpleDB",
  version: "2009-04-15",
  sigv2: "sdb",
  protocol: awsQueryProtocol,
  xmlns: "http://sdb.amazonaws.com/doc/2009-04-15/",
  rules: (p, _) => {
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
      if (Region === "us-east-1") {
        return e("https://sdb.amazonaws.com");
      }
      return e(`https://sdb.${Region}.amazonaws.com`);
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AttributeDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError("AttributeDoesNotExist", [
    "NotFoundError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class DuplicateItemName
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateItemName",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class InvalidNextToken
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextToken",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class InvalidNumberPredicates
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNumberPredicates",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class InvalidNumberValueTests
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNumberValueTests",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class InvalidParameterValue
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValue",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class InvalidQueryExpression
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidQueryExpression",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class MissingParameter
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingParameter",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NoSuchDomain
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchDomain",
    ["BadRequestError", "NotFoundError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberDomainAttributesExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberDomainAttributesExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberDomainBytesExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberDomainBytesExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberDomainsExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberDomainsExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberItemAttributesExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberItemAttributesExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberSubmittedAttributesExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberSubmittedAttributesExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class NumberSubmittedItemsExceeded
  extends /*@__PURE__*/ TE.TaggedError("NumberSubmittedItemsExceeded", [
    "QuotaError",
  ])<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class RequestTimeout
  extends /*@__PURE__*/ TE.TaggedError("RequestTimeout", ["TimeoutError"], {
    status: 408,
  })<{ readonly message?: string; readonly BoxUsage?: string }> {}
export class TooManyRequestedAttributes
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestedAttributes",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly BoxUsage?: string }> {}
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
 * Deletes attributes (or whole items) on up to 25 items in a single call. Idempotent — missing items/attributes are not an error.
 */
export const batchDeleteAttributes: API.OperationMethod<
  BatchDeleteAttributesRequest,
  BatchDeleteAttributesResponse,
  BatchDeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      Items: D.m({
        wire: "Item",
        shape: D.list(
          {
            ItemName: 0,
            Attributes: D.m({
              wire: "Attribute",
              shape: D.list(i_DeletableAttribute, { flat: true }),
            }),
          },
          { flat: true },
        ),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAttributes",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      Items: D.m({
        wire: "Item",
        shape: D.list(
          {
            ItemName: 0,
            Attributes: D.m({
              wire: "Attribute",
              shape: D.list(i_ReplaceableAttribute, { flat: true }),
            }),
          },
          { flat: true },
        ),
      }),
    },
  },
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
})) as any;

export type CreateDomainError =
  | InvalidParameterValue
  | MissingParameter
  | NumberDomainsExceeded
  | CommonErrors;
/**
 * Creates a new SimpleDB domain. Idempotent — creating an existing domain succeeds without error.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainName: 0 } },
  errors: [InvalidParameterValue, MissingParameter, NumberDomainsExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type DeleteAttributesError =
  | AttributeDoesNotExist
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Deletes one or more attributes of a SimpleDB item — or the whole item when no attributes are named. Idempotent: deleting a missing attribute/item succeeds.
 */
export const deleteAttributes: API.OperationMethod<
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  DeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      ItemName: 0,
      Attributes: D.m({
        wire: "Attribute",
        shape: D.list(i_DeletableAttribute, { flat: true }),
      }),
      Expected: i_UpdateCondition,
    },
  },
  errors: [
    AttributeDoesNotExist,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributes",
})) as any;

export type DeleteDomainError = MissingParameter | CommonErrors;
/**
 * Deletes a SimpleDB domain and all of its items. Idempotent — deleting a missing domain succeeds without error.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainName: 0 } },
  errors: [MissingParameter],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DomainMetadataError =
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Returns information about a SimpleDB domain (item count, sizes, timestamp).
 */
export const domainMetadata: API.OperationMethod<
  DomainMetadataRequest,
  DomainMetadataResponse,
  DomainMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: {
      ItemCount: D.num,
      ItemNamesSizeBytes: D.num,
      AttributeNameCount: D.num,
      AttributeNamesSizeBytes: D.num,
      AttributeValueCount: D.num,
      AttributeValuesSizeBytes: D.num,
      Timestamp: D.num,
    },
  },
  errors: [MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DomainMetadata",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      ItemName: 0,
      AttributeNames: D.m({
        wire: "AttributeName",
        shape: D.list(0, { flat: true }),
      }),
      ConsistentRead: 0,
    },
    output: {
      Attributes: D.m({ wire: "Attribute", shape: D.list({}, { flat: true }) }),
    },
  },
  errors: [InvalidParameterValue, MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributes",
})) as any;

export type ListDomainsError =
  | InvalidNextToken
  | InvalidParameterValue
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { MaxNumberOfDomains: 0, NextToken: 0 },
    output: {
      DomainNames: D.m({
        wire: "DomainName",
        shape: D.list(0, { flat: true }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      ItemName: 0,
      Attributes: D.m({
        wire: "Attribute",
        shape: D.list(i_ReplaceableAttribute, { flat: true }),
      }),
      Expected: i_UpdateCondition,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { SelectExpression: 0, NextToken: 0, ConsistentRead: 0 },
    output: {
      Items: D.m({
        wire: "Item",
        shape: D.list(
          {
            Attributes: D.m({
              wire: "Attribute",
              shape: D.list({}, { flat: true }),
            }),
          },
          { flat: true },
        ),
      }),
    },
  },
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
  } as const,
})) as any;

const i_DeletableAttribute: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_ReplaceableAttribute: D.LazyStruct = () => ({
  Name: 0,
  Value: 0,
  Replace: 0,
});
const i_UpdateCondition: D.LazyStruct = () => ({
  Name: 0,
  Value: 0,
  Exists: 0,
});
