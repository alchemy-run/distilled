import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Pricing",
  target: "AWSPriceListService",
  version: "2017-10-15",
  sigv4: "pricing",
  protocol: awsJson1_1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://api.pricing.${Region}.amazonaws.com`);
          }
          return e(
            `https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalErrorException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, FormatVersion: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, AttributeName: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: { service: svc, input: { PriceListArn: 0, FileFormat: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      Filters: D.list({ Type: 0, Field: 0, Value: 0 }),
      FormatVersion: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      EffectiveDate: 0,
      RegionCode: 0,
      CurrencyCode: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
