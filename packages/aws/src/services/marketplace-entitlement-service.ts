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
  sdkId: "Marketplace Entitlement Service",
  target: "AWSMPEntitlementService",
  version: "2017-01-11",
  sigv4: "aws-marketplace",
  protocol: awsJson1_1Protocol,
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
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://entitlement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://entitlement-marketplace.${Region}.amazonaws.com.cn`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://entitlement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(`https://entitlement-marketplace.${Region}.amazonaws.eu`);
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://entitlement.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://entitlement.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceErrorException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export type ProductCode = string;
export type GetEntitlementFilterName =
  | "CUSTOMER_IDENTIFIER"
  | "DIMENSION"
  | "CUSTOMER_AWS_ACCOUNT_ID"
  | "LICENSE_ARN"
  | (string & {});
export type FilterValue = string;
export type FilterValueList = string[];
export type GetEntitlementFilters = {
  [key in GetEntitlementFilterName]?: string[];
};
export type NonEmptyString = string;
export type PageSizeInteger = number;
export interface GetEntitlementsRequest {
  ProductCode: string;
  Filter?: { [key: string]: string[] | undefined };
  NextToken?: string;
  MaxResults?: number;
}
export interface EntitlementValue {
  IntegerValue?: number;
  DoubleValue?: number;
  BooleanValue?: boolean;
  StringValue?: string;
}
export interface Entitlement {
  ProductCode?: string;
  Dimension?: string;
  CustomerIdentifier?: string;
  CustomerAWSAccountId?: string;
  Value?: EntitlementValue;
  ExpirationDate?: Date;
  LicenseArn?: string;
}
export type EntitlementList = Entitlement[];
export interface GetEntitlementsResult {
  Entitlements?: Entitlement[];
  NextToken?: string;
}
export type ErrorMessage = string;
export type GetEntitlementsError =
  | InternalServiceErrorException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * GetEntitlements retrieves entitlement values for a given product. The results can be
 * filtered based on customer identifier, AWS account ID, license ARN, or product dimensions.
 */
export const getEntitlements: API.PaginatedOperationMethod<
  GetEntitlementsRequest,
  GetEntitlementsResult,
  GetEntitlementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ProductCode: 0, Filter: 0, NextToken: 0, MaxResults: 0 },
    output: { Entitlements: D.list({ ExpirationDate: D.ts }) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntitlements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;
