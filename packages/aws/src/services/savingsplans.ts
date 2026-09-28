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
  sdkId: "savingsplans",
  target: "AWSSavingsPlan",
  version: "2019-06-28",
  sigv4: "savingsplans",
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
    const _p0 = () => ({
      authSchemes: [
        {
          name: "sigv4",
          signingName: "savingsplans",
          signingRegion: "us-east-1",
        },
      ],
    });
    if (!(Endpoint != null) && UseFIPS === false && UseDualStack === true) {
      {
        const PartitionResult = _.partition(Region);
        if (
          Region != null &&
          PartitionResult != null &&
          PartitionResult !== false
        ) {
          if (_.getAttr(PartitionResult, "name") === "aws") {
            return e("https://savingsplans.global.api.aws", _p0(), {});
          }
          if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
            return e(
              `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
      }
      if (!(Region != null)) {
        return e("https://savingsplans.global.api.aws", _p0(), {});
      }
    }
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://savingsplans.amazonaws.com", _p0(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://savingsplans-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://savingsplans-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type SavingsPlanOfferingId = string;
export type Amount = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateSavingsPlanRequest {
  savingsPlanOfferingId: string;
  commitment: string;
  upfrontPaymentAmount?: string;
  purchaseTime?: Date;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type SavingsPlanId = string;
export interface CreateSavingsPlanResponse {
  savingsPlanId?: string;
}
export interface DeleteQueuedSavingsPlanRequest {
  savingsPlanId: string;
}
export interface DeleteQueuedSavingsPlanResponse {}
export type SavingsPlanRateFilterName =
  | "region"
  | "instanceType"
  | "productDescription"
  | "tenancy"
  | "productType"
  | "serviceCode"
  | "usageType"
  | "operation"
  | (string & {});
export type ListOfStrings = string[];
export interface SavingsPlanRateFilter {
  name?: SavingsPlanRateFilterName;
  values?: string[];
}
export type SavingsPlanRateFilterList = SavingsPlanRateFilter[];
export type PaginationToken = string;
export type MaxResults = number;
export interface DescribeSavingsPlanRatesRequest {
  savingsPlanId: string;
  filters?: SavingsPlanRateFilter[];
  nextToken?: string;
  maxResults?: number;
}
export type CurrencyCode = "CNY" | "USD" | "EUR" | (string & {});
export type SavingsPlanRateUnit =
  | "Hrs"
  | "Lambda-GB-Second"
  | "Request"
  | "ACU-Hr"
  | "ReadRequestUnits"
  | "WriteRequestUnits"
  | "ReadCapacityUnit-Hrs"
  | "WriteCapacityUnit-Hrs"
  | "ReplicatedWriteRequestUnits"
  | "ReplicatedWriteCapacityUnit-Hrs"
  | "GB-Hours"
  | "DPU"
  | "ElastiCacheProcessingUnit"
  | "DCU-Hr"
  | "NCU-hr"
  | "OCU-hours"
  | "Jobs"
  | (string & {});
export type SavingsPlanProductType =
  | "EC2"
  | "Fargate"
  | "Lambda"
  | "SageMaker"
  | "RDS"
  | "DSQL"
  | "DynamoDB"
  | "ElastiCache"
  | "DocDB"
  | "Neptune"
  | "Timestream"
  | "Keyspaces"
  | "DMS"
  | "OpenSearch"
  | (string & {});
export type SavingsPlanRateServiceCode =
  | "AmazonEC2"
  | "AmazonECS"
  | "AmazonEKS"
  | "AWSLambda"
  | "AmazonSageMaker"
  | "AmazonRDS"
  | "AuroraDSQL"
  | "AmazonDynamoDB"
  | "AmazonElastiCache"
  | "AmazonDocDB"
  | "AmazonNeptune"
  | "AmazonTimestream"
  | "AmazonMCS"
  | "AWSDatabaseMigrationSvc"
  | "AmazonES"
  | (string & {});
export type SavingsPlanRateUsageType = string;
export type SavingsPlanRateOperation = string;
export type SavingsPlanRatePropertyKey =
  | "region"
  | "instanceType"
  | "instanceFamily"
  | "productDescription"
  | "tenancy"
  | (string & {});
export type JsonSafeFilterValueString = string;
export interface SavingsPlanRateProperty {
  name?: SavingsPlanRatePropertyKey;
  value?: string;
}
export type SavingsPlanRatePropertyList = SavingsPlanRateProperty[];
export interface SavingsPlanRate {
  rate?: string;
  currency?: CurrencyCode;
  unit?: SavingsPlanRateUnit;
  productType?: SavingsPlanProductType;
  serviceCode?: SavingsPlanRateServiceCode;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanRateProperty[];
}
export type SavingsPlanRateList = SavingsPlanRate[];
export interface DescribeSavingsPlanRatesResponse {
  savingsPlanId?: string;
  searchResults?: SavingsPlanRate[];
  nextToken?: string;
}
export type SavingsPlanArn = string;
export type SavingsPlanArnList = string[];
export type SavingsPlanIdList = string[];
export type SavingsPlanState =
  | "payment-pending"
  | "payment-failed"
  | "active"
  | "retired"
  | "queued"
  | "queued-deleted"
  | "pending-return"
  | "returned"
  | (string & {});
export type SavingsPlanStateList = SavingsPlanState[];
export type SavingsPlansFilterName =
  | "region"
  | "ec2-instance-family"
  | "commitment"
  | "upfront"
  | "term"
  | "savings-plan-type"
  | "payment-option"
  | "start"
  | "end"
  | "instance-family"
  | (string & {});
export interface SavingsPlanFilter {
  name?: SavingsPlansFilterName;
  values?: string[];
}
export type SavingsPlanFilterList = SavingsPlanFilter[];
export interface DescribeSavingsPlansRequest {
  savingsPlanArns?: string[];
  savingsPlanIds?: string[];
  nextToken?: string;
  maxResults?: number;
  states?: SavingsPlanState[];
  filters?: SavingsPlanFilter[];
}
export type Region = string;
export type EC2InstanceFamily = string;
export type SavingsPlanType =
  | "Compute"
  | "EC2Instance"
  | "SageMaker"
  | "Database"
  | (string & {});
export type SavingsPlanPaymentOption =
  | "All Upfront"
  | "Partial Upfront"
  | "No Upfront"
  | (string & {});
export type SavingsPlanProductTypeList = SavingsPlanProductType[];
export type TermDurationInSeconds = number;
export interface SavingsPlan {
  offeringId?: string;
  savingsPlanId?: string;
  savingsPlanArn?: string;
  description?: string;
  start?: string;
  end?: string;
  state?: SavingsPlanState;
  region?: string;
  ec2InstanceFamily?: string;
  savingsPlanType?: SavingsPlanType;
  paymentOption?: SavingsPlanPaymentOption;
  productTypes?: SavingsPlanProductType[];
  currency?: CurrencyCode;
  commitment?: string;
  upfrontPaymentAmount?: string;
  recurringPaymentAmount?: string;
  termDurationInSeconds?: number;
  tags?: { [key: string]: string | undefined };
  returnableUntil?: string;
}
export type SavingsPlanList = SavingsPlan[];
export interface DescribeSavingsPlansResponse {
  savingsPlans?: SavingsPlan[];
  nextToken?: string;
}
export type UUID = string;
export type UUIDs = string[];
export type SavingsPlanPaymentOptionList = SavingsPlanPaymentOption[];
export type SavingsPlanTypeList = SavingsPlanType[];
export type SavingsPlanRateServiceCodeList = SavingsPlanRateServiceCode[];
export type SavingsPlanRateUsageTypeList = string[];
export type SavingsPlanRateOperationList = string[];
export type SavingsPlanRateFilterAttribute =
  | "region"
  | "instanceFamily"
  | "instanceType"
  | "productDescription"
  | "tenancy"
  | "productId"
  | (string & {});
export type FilterValuesList = string[];
export interface SavingsPlanOfferingRateFilterElement {
  name?: SavingsPlanRateFilterAttribute;
  values?: string[];
}
export type SavingsPlanOfferingRateFiltersList =
  SavingsPlanOfferingRateFilterElement[];
export type PageSize = number;
export interface DescribeSavingsPlansOfferingRatesRequest {
  savingsPlanOfferingIds?: string[];
  savingsPlanPaymentOptions?: SavingsPlanPaymentOption[];
  savingsPlanTypes?: SavingsPlanType[];
  products?: SavingsPlanProductType[];
  serviceCodes?: SavingsPlanRateServiceCode[];
  usageTypes?: string[];
  operations?: string[];
  filters?: SavingsPlanOfferingRateFilterElement[];
  nextToken?: string;
  maxResults?: number;
}
export type SavingsPlansDuration = number;
export type SavingsPlanDescription = string;
export interface ParentSavingsPlanOffering {
  offeringId?: string;
  paymentOption?: SavingsPlanPaymentOption;
  planType?: SavingsPlanType;
  durationSeconds?: number;
  currency?: CurrencyCode;
  planDescription?: string;
}
export type SavingsPlanRatePricePerUnit = string;
export interface SavingsPlanOfferingRateProperty {
  name?: string;
  value?: string;
}
export type SavingsPlanOfferingRatePropertyList =
  SavingsPlanOfferingRateProperty[];
export interface SavingsPlanOfferingRate {
  savingsPlanOffering?: ParentSavingsPlanOffering;
  rate?: string;
  unit?: SavingsPlanRateUnit;
  productType?: SavingsPlanProductType;
  serviceCode?: SavingsPlanRateServiceCode;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanOfferingRateProperty[];
}
export type SavingsPlanOfferingRatesList = SavingsPlanOfferingRate[];
export interface DescribeSavingsPlansOfferingRatesResponse {
  searchResults?: SavingsPlanOfferingRate[];
  nextToken?: string;
}
export type DurationsList = number[];
export type CurrencyList = CurrencyCode[];
export type SavingsPlanDescriptionsList = string[];
export type SavingsPlanServiceCode = string;
export type SavingsPlanServiceCodeList = string[];
export type SavingsPlanUsageType = string;
export type SavingsPlanUsageTypeList = string[];
export type SavingsPlanOperation = string;
export type SavingsPlanOperationList = string[];
export type SavingsPlanOfferingFilterAttribute =
  | "region"
  | "instanceFamily"
  | (string & {});
export interface SavingsPlanOfferingFilterElement {
  name?: SavingsPlanOfferingFilterAttribute;
  values?: string[];
}
export type SavingsPlanOfferingFiltersList = SavingsPlanOfferingFilterElement[];
export interface DescribeSavingsPlansOfferingsRequest {
  offeringIds?: string[];
  paymentOptions?: SavingsPlanPaymentOption[];
  productType?: SavingsPlanProductType;
  planTypes?: SavingsPlanType[];
  durations?: number[];
  currencies?: CurrencyCode[];
  descriptions?: string[];
  serviceCodes?: string[];
  usageTypes?: string[];
  operations?: string[];
  filters?: SavingsPlanOfferingFilterElement[];
  nextToken?: string;
  maxResults?: number;
}
export type SavingsPlanOfferingPropertyKey =
  | "region"
  | "instanceFamily"
  | (string & {});
export interface SavingsPlanOfferingProperty {
  name?: SavingsPlanOfferingPropertyKey;
  value?: string;
}
export type SavingsPlanOfferingPropertyList = SavingsPlanOfferingProperty[];
export interface SavingsPlanOffering {
  offeringId?: string;
  productTypes?: SavingsPlanProductType[];
  planType?: SavingsPlanType;
  description?: string;
  paymentOption?: SavingsPlanPaymentOption;
  durationSeconds?: number;
  currency?: CurrencyCode;
  serviceCode?: string;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanOfferingProperty[];
}
export type SavingsPlanOfferingsList = SavingsPlanOffering[];
export interface DescribeSavingsPlansOfferingsResponse {
  searchResults?: SavingsPlanOffering[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ReturnSavingsPlanRequest {
  savingsPlanId: string;
  clientToken?: string;
}
export interface ReturnSavingsPlanResponse {
  savingsPlanId?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type CreateSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Savings Plan.
 */
export const createSavingsPlan: API.OperationMethod<
  CreateSavingsPlanRequest,
  CreateSavingsPlanResponse,
  CreateSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateSavingsPlan",
    input: {
      savingsPlanOfferingId: 0,
      commitment: 0,
      upfrontPaymentAmount: 0,
      purchaseTime: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSavingsPlan",
})) as any;

export type DeleteQueuedSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the queued purchase for the specified Savings Plan.
 */
export const deleteQueuedSavingsPlan: API.OperationMethod<
  DeleteQueuedSavingsPlanRequest,
  DeleteQueuedSavingsPlanResponse,
  DeleteQueuedSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteQueuedSavingsPlan",
    input: { savingsPlanId: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueuedSavingsPlan",
})) as any;

export type DescribeSavingsPlanRatesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the rates for a specific, existing Savings Plan.
 */
export const describeSavingsPlanRates: API.OperationMethod<
  DescribeSavingsPlanRatesRequest,
  DescribeSavingsPlanRatesResponse,
  DescribeSavingsPlanRatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSavingsPlanRates",
    input: {
      savingsPlanId: 0,
      filters: D.list({ name: 0, values: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlanRates",
})) as any;

export type DescribeSavingsPlansError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified Savings Plans.
 */
export const describeSavingsPlans: API.OperationMethod<
  DescribeSavingsPlansRequest,
  DescribeSavingsPlansResponse,
  DescribeSavingsPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSavingsPlans",
    input: {
      savingsPlanArns: 0,
      savingsPlanIds: 0,
      nextToken: 0,
      maxResults: 0,
      states: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlans",
})) as any;

export type DescribeSavingsPlansOfferingRatesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the offering rates for Savings Plans you might want to purchase.
 */
export const describeSavingsPlansOfferingRates: API.OperationMethod<
  DescribeSavingsPlansOfferingRatesRequest,
  DescribeSavingsPlansOfferingRatesResponse,
  DescribeSavingsPlansOfferingRatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSavingsPlansOfferingRates",
    input: {
      savingsPlanOfferingIds: 0,
      savingsPlanPaymentOptions: 0,
      savingsPlanTypes: 0,
      products: 0,
      serviceCodes: 0,
      usageTypes: 0,
      operations: 0,
      filters: D.list({ name: 0, values: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlansOfferingRates",
})) as any;

export type DescribeSavingsPlansOfferingsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the offerings for the specified Savings Plans.
 */
export const describeSavingsPlansOfferings: API.OperationMethod<
  DescribeSavingsPlansOfferingsRequest,
  DescribeSavingsPlansOfferingsResponse,
  DescribeSavingsPlansOfferingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSavingsPlansOfferings",
    input: {
      offeringIds: 0,
      paymentOptions: 0,
      productType: 0,
      planTypes: 0,
      durations: 0,
      currencies: 0,
      descriptions: 0,
      serviceCodes: 0,
      usageTypes: 0,
      operations: 0,
      filters: D.list({ name: 0, values: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlansOfferings",
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTagsForResource",
    input: { resourceArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ReturnSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the specified Savings Plan.
 */
export const returnSavingsPlan: API.OperationMethod<
  ReturnSavingsPlanRequest,
  ReturnSavingsPlanResponse,
  ReturnSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ReturnSavingsPlan",
    input: { savingsPlanId: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReturnSavingsPlan",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { resourceArn: 0, tagKeys: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;
