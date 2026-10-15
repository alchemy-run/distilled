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
  sdkId: "Marketplace Commerce Analytics",
  serviceShapeName: "MarketplaceCommerceAnalytics20150701",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "marketplacecommerceanalytics" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-07-01");
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
              `https://marketplacecommerceanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://marketplacecommerceanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://marketplacecommerceanalytics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://marketplacecommerceanalytics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://marketplacecommerceanalytics.{R}.{D}","properties":{},"headers":{}}');

export class MarketplaceCommerceAnalyticsException
  extends /*@__PURE__*/ S.TaggedError<MarketplaceCommerceAnalyticsException>()(
    "MarketplaceCommerceAnalyticsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type DataSetType =
  | "customer_subscriber_hourly_monthly_subscriptions"
  | "customer_subscriber_annual_subscriptions"
  | "daily_business_usage_by_instance_type"
  | "daily_business_fees"
  | "daily_business_free_trial_conversions"
  | "daily_business_new_instances"
  | "daily_business_new_product_subscribers"
  | "daily_business_canceled_product_subscribers"
  | "monthly_revenue_billing_and_revenue_data"
  | "monthly_revenue_annual_subscriptions"
  | "monthly_revenue_field_demonstration_usage"
  | "monthly_revenue_flexible_payment_schedule"
  | "disbursed_amount_by_product"
  | "disbursed_amount_by_product_with_uncollected_funds"
  | "disbursed_amount_by_instance_hours"
  | "disbursed_amount_by_customer_geo"
  | "disbursed_amount_by_age_of_uncollected_funds"
  | "disbursed_amount_by_age_of_disbursed_funds"
  | "disbursed_amount_by_age_of_past_due_funds"
  | "disbursed_amount_by_uncollected_funds_breakdown"
  | "customer_profile_by_industry"
  | "customer_profile_by_revenue"
  | "customer_profile_by_geography"
  | "sales_compensation_billed_revenue"
  | "us_sales_and_use_tax_records"
  | (string & {});
export type DataSetPublicationDate = Date;
export type RoleNameArn = string;
export type DestinationS3BucketName = string;
export type DestinationS3Prefix = string;
export type SnsTopicArn = string;
export type OptionalKey = string;
export type OptionalValue = string;
export type CustomerDefinedValues = { [key: string]: string | undefined };
export interface GenerateDataSetRequest {
  dataSetType: DataSetType;
  dataSetPublicationDate: Date;
  roleNameArn: string;
  destinationS3BucketName: string;
  destinationS3Prefix?: string;
  snsTopicArn: string;
  customerDefinedValues?: { [key: string]: string | undefined };
}
export type DataSetRequestId = string;
export interface GenerateDataSetResult {
  dataSetRequestId?: string;
}
export type SupportDataSetType =
  | "customer_support_contacts_data"
  | "test_customer_support_contacts_data"
  | (string & {});
export type FromDate = Date;
export interface StartSupportDataExportRequest {
  dataSetType: SupportDataSetType;
  fromDate: Date;
  roleNameArn: string;
  destinationS3BucketName: string;
  destinationS3Prefix?: string;
  snsTopicArn: string;
  customerDefinedValues?: { [key: string]: string | undefined };
}
export interface StartSupportDataExportResult {
  dataSetRequestId?: string;
}
export type ExceptionMessage = string;
export type GenerateDataSetError = MarketplaceCommerceAnalyticsException | CommonErrors;
/**
 * Given a data set type and data set publication date, asynchronously publishes the requested data set to the specified
 * S3 bucket and notifies the specified SNS topic once the data is available. Returns a unique request identifier that
 * can be used to correlate requests with notifications from the SNS topic.
 * Data sets will be published in comma-separated values (CSV) format with the file name {data_set_type}_YYYY-MM-DD.csv.
 * If a file with the same name already exists (e.g. if the same data set is requested twice), the original file will
 * be overwritten by the new file.
 * Requires a Role with an attached permissions policy providing Allow permissions for the following actions:
 * s3:PutObject, s3:GetBucketLocation, sns:GetTopicAttributes, sns:Publish, iam:GetRolePolicy.
 */
export const generateDataSet: API.OperationMethod<
  GenerateDataSetRequest,
  GenerateDataSetResult,
  GenerateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GenerateDataSetRequest>,
  output: __S(3, __c1, 1) as any as S.Schema<GenerateDataSetResult>,
  errors: [MarketplaceCommerceAnalyticsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateDataSet",
}));

export type StartSupportDataExportError = MarketplaceCommerceAnalyticsException | CommonErrors;
/**
 * *This target has been deprecated.* Given a data set type and a from date, asynchronously publishes the requested customer support data
 * to the specified S3 bucket and notifies the specified SNS topic once the data is available. Returns a unique request
 * identifier that can be used to correlate requests with notifications from the SNS topic.
 * Data sets will be published in comma-separated values (CSV) format with the file name {data_set_type}_YYYY-MM-DD'T'HH-mm-ss'Z'.csv.
 * If a file with the same name already exists (e.g. if the same data set is requested twice), the original file will
 * be overwritten by the new file.
 * Requires a Role with an attached permissions policy providing Allow permissions for the following actions:
 * s3:PutObject, s3:GetBucketLocation, sns:GetTopicAttributes, sns:Publish, iam:GetRolePolicy.
 */
export const startSupportDataExport: API.OperationMethod<
  StartSupportDataExportRequest,
  StartSupportDataExportResult,
  StartSupportDataExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c2, 0) as any as S.Schema<StartSupportDataExportRequest>,
  output: __S(3, __c1, 1) as any as S.Schema<StartSupportDataExportResult>,
  errors: [MarketplaceCommerceAnalyticsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSupportDataExport",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSetType: S.String,
          dataSetPublicationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          roleNameArn: S.String,
          destinationS3BucketName: S.String,
          destinationS3Prefix: S.optional(S.String),
          snsTopicArn: S.String,
          customerDefinedValues: S.optional(__S(2, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GenerateDataSetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() => S.Struct({ dataSetRequestId: S.optional(S.String) })).annotate({
        identifier: "GenerateDataSetResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSetType: S.String,
          fromDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          roleNameArn: S.String,
          destinationS3BucketName: S.String,
          destinationS3Prefix: S.optional(S.String),
          snsTopicArn: S.String,
          customerDefinedValues: S.optional(__S(2, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSupportDataExportRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
