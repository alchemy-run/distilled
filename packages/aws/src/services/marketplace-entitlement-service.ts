import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Marketplace Entitlement Service",
  serviceShapeName: "AWSMPEntitlementService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-01-11");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
            return e(`https://entitlement-marketplace.${Region}.amazonaws.com.cn`);
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://entitlement.marketplace.{R}.{D}","properties":{},"headers":{}}',
  ["cn-north-1", "cn-northwest-1", "aws-cn-global", "eusc-de-east-1"],
);

export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type ProductCode = string;
export type GetEntitlementFilterName =
  | "CUSTOMER_IDENTIFIER"
  | "DIMENSION"
  | "CUSTOMER_AWS_ACCOUNT_ID"
  | "LICENSE_ARN"
  | (string & {});
export type FilterValue = string;
export type FilterValueList = string[];
export type GetEntitlementFilters = { [key in GetEntitlementFilterName]?: string[] };
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
  input: __S(2, __c0, 2) as any as S.Schema<GetEntitlementsRequest>,
  output: __S(6, __c0, 6) as any as S.Schema<GetEntitlementsResult>,
  errors: [InternalServiceErrorException, InvalidParameterException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntitlements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(0, __c0, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProductCode: S.String,
          Filter: S.optional(__S(1, __c0, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEntitlementsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          IntegerValue: S.optional(S.Number),
          DoubleValue: S.optional(S.Number),
          BooleanValue: S.optional(S.Boolean),
          StringValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "EntitlementValue" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProductCode: S.optional(S.String),
          Dimension: S.optional(S.String),
          CustomerIdentifier: S.optional(S.String),
          CustomerAWSAccountId: S.optional(S.String),
          Value: S.optional(__S(3, __c0, 3)),
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LicenseArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Entitlement" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Entitlements: S.optional(__S(5, __c0, 5)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEntitlementsResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
