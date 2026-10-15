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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Pricing",
  serviceShapeName: "AWSPriceListService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "pricing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
              `https://api.pricing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.pricing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://api.pricing.${Region}.amazonaws.com`);
        }
        return e(`https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.pricing.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredNextTokenException>()(
    "ExpiredNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type FormatVersion = string;
export type DescribeServicesMaxResults = number;
export interface DescribeServicesRequest {
  ServiceCode?: string;
  FormatVersion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type AttributeNameList = string[];
export interface Service {
  ServiceCode: string;
  AttributeNames?: string[];
}
export type ServiceList = Service[];
export interface DescribeServicesResponse {
  Services?: Service[];
  FormatVersion?: string;
  NextToken?: string;
}
export type GetAttributeValuesMaxResults = number;
export interface GetAttributeValuesRequest {
  ServiceCode: string;
  AttributeName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AttributeValue {
  Value?: string;
}
export type AttributeValueList = AttributeValue[];
export interface GetAttributeValuesResponse {
  AttributeValues?: AttributeValue[];
  NextToken?: string;
}
export type PriceListArn = string;
export type FileFormat = string;
export interface GetPriceListFileUrlRequest {
  PriceListArn: string;
  FileFormat: string;
}
export interface GetPriceListFileUrlResponse {
  Url?: string;
}
export type FilterType =
  | "TERM_MATCH"
  | "EQUALS"
  | "CONTAINS"
  | "ANY_OF"
  | "NONE_OF"
  | (string & {});
export type Field = string;
export type Value = string;
export interface Filter {
  Type: FilterType;
  Field: string;
  Value: string;
}
export type Filters = Filter[];
export type GetProductsMaxResults = number;
export interface GetProductsRequest {
  ServiceCode: string;
  Filters?: Filter[];
  FormatVersion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SynthesizedJsonPriceListJsonItem = string;
export type PriceListJsonItems = string[];
export interface GetProductsResponse {
  FormatVersion?: string;
  PriceList?: string[];
  NextToken?: string;
}
export type ServiceCode = string;
export type EffectiveDate = Date;
export type RegionCode = string;
export type CurrencyCode = string;
export type MaxResults = number;
export interface ListPriceListsRequest {
  ServiceCode: string;
  EffectiveDate: Date;
  RegionCode?: string;
  CurrencyCode: string;
  NextToken?: string;
  MaxResults?: number;
}
export type FileFormats = string[];
export interface PriceList {
  PriceListArn?: string;
  RegionCode?: string;
  CurrencyCode?: string;
  FileFormats?: string[];
}
export type PriceLists = PriceList[];
export interface ListPriceListsResponse {
  PriceLists?: PriceList[];
  NextToken?: string;
}
export type ErrorMessage = string;
export type DescribeServicesError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the metadata for one service or a list of the metadata for all services. Use this without a service code to get the service codes for all services. Use it with a service code, such as `AmazonEC2`, to get information specific to that service, such as the attribute names available for that service. For example, some of the attribute names available for EC2 are `volumeType`, `maxIopsVolume`, `operation`, `locationType`, and `instanceCapacity10xlarge`.
 */
export const describeServices: API.PaginatedOperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<DescribeServicesRequest>,
  output: __S(15, __c3, 3) as any as S.Schema<DescribeServicesResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAttributeValuesError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of attribute values. Attributes are similar to the details in a Price List API offer file. For a list of available attributes, see Offer File Definitions in the Billing and Cost Management User Guide.
 */
export const getAttributeValues: API.PaginatedOperationMethod<
  GetAttributeValuesRequest,
  GetAttributeValuesResponse,
  GetAttributeValuesError,
  Credentials | HttpClient.HttpClient,
  AttributeValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<GetAttributeValuesRequest>,
  output: __S(23, __c5, 3) as any as S.Schema<GetAttributeValuesResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributeValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttributeValues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPriceListFileUrlError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * * **This feature is in preview release and is subject to change. Your use of Amazon Web Services Price List API is subject to the Beta Service Participation terms of the Amazon Web Services Service Terms (Section 1.10).** *
 *
 * This returns the URL that you can retrieve your Price List file from. This URL is based on the `PriceListArn` and `FileFormat` that you retrieve from the ListPriceLists response.
 */
export const getPriceListFileUrl: API.OperationMethod<
  GetPriceListFileUrlRequest,
  GetPriceListFileUrlResponse,
  GetPriceListFileUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetPriceListFileUrlRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetPriceListFileUrlResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPriceListFileUrl",
}));

export type GetProductsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all products that match the filter criteria.
 */
export const getProducts: API.PaginatedOperationMethod<
  GetProductsRequest,
  GetProductsResponse,
  GetProductsError,
  Credentials | HttpClient.HttpClient,
  SynthesizedJsonPriceListJsonItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6, __c1, 2) as any as S.Schema<GetProductsRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<GetProductsResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProducts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PriceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPriceListsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * * **This feature is in preview release and is subject to change. Your use of Amazon Web Services Price List API is subject to the Beta Service Participation terms of the Amazon Web Services Service Terms (Section 1.10).** *
 *
 * This returns a list of Price List references that the requester if authorized to view, given a `ServiceCode`, `CurrencyCode`, and an `EffectiveDate`. Use without a `RegionCode` filter to list Price List references from all available Amazon Web Services Regions. Use with a `RegionCode` filter to get the Price List reference that's specific to a specific Amazon Web Services Region. You can use the `PriceListArn` from the response to get your preferred Price List files through the GetPriceListFileUrl API.
 */
export const listPriceLists: API.PaginatedOperationMethod<
  ListPriceListsRequest,
  ListPriceListsResponse,
  ListPriceListsError,
  Credentials | HttpClient.HttpClient,
  PriceList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<ListPriceListsRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<ListPriceListsResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPriceLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PriceLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PriceListArn: S.String, FileFormat: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPriceListFileUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Url: S.optional(S.String) })).annotate({
        identifier: "GetPriceListFileUrlResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.String, Field: S.String, Value: S.String }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(4, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          Filters: S.optional(__S(5, __c1, 1)),
          FormatVersion: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetProductsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FormatVersion: S.optional(S.String),
          PriceList: S.optional(__S(16, __c4, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetProductsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          EffectiveDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RegionCode: S.optional(S.String),
          CurrencyCode: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPriceListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PriceListArn: S.optional(S.String),
          RegionCode: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          FileFormats: S.optional(__S(16, __c4, 0)),
        }),
      ).annotate({ identifier: "PriceList" });
    case 2:
      return S.Array(__S(9, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PriceLists: S.optional(__S(10, __c2, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPriceListsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.optional(S.String),
          FormatVersion: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceCode: S.String, AttributeNames: S.optional(__S(16, __c4, 0)) }),
      ).annotate({ identifier: "Service" });
    case 2:
      return S.Array(__S(13, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Services: S.optional(__S(14, __c3, 2)),
          FormatVersion: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeServicesResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          AttributeName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAttributeValuesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Value: S.optional(S.String) })).annotate({
        identifier: "AttributeValue",
      });
    case 2:
      return S.Array(__S(21, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttributeValues: S.optional(__S(22, __c5, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAttributeValuesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
