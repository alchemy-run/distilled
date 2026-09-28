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
  sdkId: "Marketplace Metering",
  target: "AWSMPMeteringService",
  version: "2016-01-14",
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
              `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(`https://metering-marketplace.${Region}.amazonaws.eu`);
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://metering.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://metering.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://metering.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://metering.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CustomerNotEntitledException
  extends /*@__PURE__*/ TE.TaggedError("CustomerNotEntitledException")<{
    readonly message?: string;
  }> {}
export class DisabledApiException
  extends /*@__PURE__*/ TE.TaggedError("DisabledApiException")<{
    readonly message?: string;
  }> {}
export class DuplicateRequestException
  extends /*@__PURE__*/ TE.TaggedError("DuplicateRequestException")<{
    readonly message?: string;
  }> {}
export class ExpiredTokenException
  extends /*@__PURE__*/ TE.TaggedError("ExpiredTokenException")<{
    readonly message?: string;
  }> {}
export class IdempotencyConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotencyConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceErrorException")<{
    readonly message?: string;
  }> {}
export class InvalidCustomerIdentifierException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCustomerIdentifierException")<{
    readonly message?: string;
  }> {}
export class InvalidEndpointRegionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEndpointRegionException")<{
    readonly message?: string;
  }> {}
export class InvalidLicenseException
  extends /*@__PURE__*/ TE.TaggedError("InvalidLicenseException")<{
    readonly message?: string;
  }> {}
export class InvalidProductCodeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidProductCodeException")<{
    readonly message?: string;
  }> {}
export class InvalidPublicKeyVersionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPublicKeyVersionException")<{
    readonly message?: string;
  }> {}
export class InvalidRegionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRegionException")<{
    readonly message?: string;
  }> {}
export class InvalidTagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagException")<{
    readonly message?: string;
  }> {}
export class InvalidTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidUsageAllocationsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidUsageAllocationsException")<{
    readonly message?: string;
  }> {}
export class InvalidUsageDimensionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidUsageDimensionException")<{
    readonly message?: string;
  }> {}
export class PlatformNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("PlatformNotSupportedException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class TimestampOutOfBoundsException
  extends /*@__PURE__*/ TE.TaggedError("TimestampOutOfBoundsException")<{
    readonly message?: string;
  }> {}
export type CustomerIdentifier = string;
export type UsageDimension = string;
export type UsageQuantity = number;
export type AllocatedUsageQuantity = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface UsageAllocation {
  AllocatedUsageQuantity: number;
  Tags?: Tag[];
}
export type UsageAllocations = UsageAllocation[];
export type CustomerAWSAccountId = string;
export type LicenseArn = string;
export interface UsageRecord {
  Timestamp: Date;
  CustomerIdentifier?: string;
  Dimension: string;
  Quantity?: number;
  UsageAllocations?: UsageAllocation[];
  CustomerAWSAccountId?: string;
  LicenseArn?: string;
}
export type UsageRecordList = UsageRecord[];
export type ProductCode = string;
export interface BatchMeterUsageRequest {
  UsageRecords: UsageRecord[];
  ProductCode?: string;
}
export type UsageRecordResultStatus =
  | "Success"
  | "CustomerNotSubscribed"
  | "DuplicateRecord"
  | (string & {});
export interface UsageRecordResult {
  UsageRecord?: UsageRecord;
  MeteringRecordId?: string;
  Status?: UsageRecordResultStatus;
}
export type UsageRecordResultList = UsageRecordResult[];
export interface BatchMeterUsageResult {
  Results?: UsageRecordResult[];
  UnprocessedRecords?: UsageRecord[];
}
export type ClientToken = string;
export interface MeterUsageRequest {
  ProductCode: string;
  Timestamp: Date;
  UsageDimension: string;
  UsageQuantity?: number;
  DryRun?: boolean;
  UsageAllocations?: UsageAllocation[];
  ClientToken?: string;
}
export interface MeterUsageResult {
  MeteringRecordId?: string;
}
export type VersionInteger = number;
export type Nonce = string;
export interface RegisterUsageRequest {
  ProductCode: string;
  PublicKeyVersion: number;
  Nonce?: string;
}
export type NonEmptyString = string;
export interface RegisterUsageResult {
  PublicKeyRotationTimestamp?: Date;
  Signature?: string;
}
export interface ResolveCustomerRequest {
  RegistrationToken: string;
}
export interface ResolveCustomerResult {
  CustomerIdentifier?: string;
  ProductCode?: string;
  CustomerAWSAccountId?: string;
  LicenseArn?: string;
}
export type ErrorMessage = string;
export type BatchMeterUsageError =
  | DisabledApiException
  | InternalServiceErrorException
  | InvalidCustomerIdentifierException
  | InvalidLicenseException
  | InvalidProductCodeException
  | InvalidTagException
  | InvalidUsageAllocationsException
  | InvalidUsageDimensionException
  | ThrottlingException
  | TimestampOutOfBoundsException
  | CommonErrors;
/**
 * Amazon Web Services Marketplace is introducing Concurrent Agreements, enabling buyers to make multiple purchases per Amazon Web Services account. Starting June 1, 2026, new SaaS products must use `CustomerAWSAccountId` (instead of `CustomerIdentifier`), `LicenseArn` (instead of `ProductCode`) to support this feature. `BatchMeterUsage` does not support `CustomerIdentifier` for new integrations. Existing integrations continue to work. Review the new integration for Concurrent Agreements here. For additional implementation details, see BatchMeterUsage code example with LicenseArn in the *Amazon Web Services Marketplace Seller Guide*.
 *
 * To post metering records for customers, SaaS applications call
 * `BatchMeterUsage`, which is used for metering SaaS flexible
 * consumption pricing (FCP). Identical requests are idempotent and can be
 * retried with the same records or a subset of records. Each
 * `BatchMeterUsage` request is for only one product. If you
 * want to meter usage for multiple products, you must make multiple
 * `BatchMeterUsage` calls.
 *
 * Usage records should be submitted in quick succession following a
 * recorded event. Usage records aren't accepted 24 hours or more after an
 * event. At the end of each billing cycle, a 6-hour grace period applies. We accept
 * usage records for the previous billing month until 06:00 UTC on the first day of the
 * next month. For example, you must submit March usage records before 06:00 UTC on
 * April 1. On April 1 at 05:00 UTC, you can still submit records for March 31 (within the 6-hour grace period). After 06:00 UTC on April 1, March records are rejected regardless of the normal 24-hour submission window. After this grace period, we return a
 * `TimestampOutOfBoundsException` error.
 *
 * `BatchMeterUsage` can process up to 25
 * `UsageRecords` at a time, and each request must be less than
 * 1 MB in size. Optionally, you can have multiple usage allocations for
 * usage data that's split into buckets according to predefined tags.
 *
 * `BatchMeterUsage` returns a list of
 * `UsageRecordResult` objects, which have each
 * `UsageRecord`. It also returns a list of
 * `UnprocessedRecords`, which indicate errors on the service
 * side that should be retried.
 *
 * For Amazon Web Services Regions that support `BatchMeterUsage`, see BatchMeterUsage Region support.
 *
 * For an example of `BatchMeterUsage`, see BatchMeterUsage code example in the Amazon Web Services Marketplace Seller
 * Guide.
 */
export const batchMeterUsage: API.OperationMethod<
  BatchMeterUsageRequest,
  BatchMeterUsageResult,
  BatchMeterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UsageRecords: D.list({
        Timestamp: 0,
        CustomerIdentifier: 0,
        Dimension: 0,
        Quantity: 0,
        UsageAllocations: D.list(i_UsageAllocation),
        CustomerAWSAccountId: 0,
        LicenseArn: 0,
      }),
      ProductCode: 0,
    },
    output: {
      Results: D.list({ UsageRecord: o_UsageRecord }),
      UnprocessedRecords: D.list(o_UsageRecord),
    },
  },
  errors: [
    DisabledApiException,
    InternalServiceErrorException,
    InvalidCustomerIdentifierException,
    InvalidLicenseException,
    InvalidProductCodeException,
    InvalidTagException,
    InvalidUsageAllocationsException,
    InvalidUsageDimensionException,
    ThrottlingException,
    TimestampOutOfBoundsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchMeterUsage",
})) as any;

export type MeterUsageError =
  | CustomerNotEntitledException
  | DuplicateRequestException
  | IdempotencyConflictException
  | InternalServiceErrorException
  | InvalidEndpointRegionException
  | InvalidProductCodeException
  | InvalidTagException
  | InvalidUsageAllocationsException
  | InvalidUsageDimensionException
  | ThrottlingException
  | TimestampOutOfBoundsException
  | CommonErrors;
/**
 * As a seller, your software hosted in the buyer's Amazon Web Services account uses this API action to emit metering records directly to Amazon Web Services Marketplace.
 * You must use the following buyer Amazon Web Services account credentials to sign the API request.
 *
 * - For **Amazon EC2** deployments, your software must use the
 * IAM role for Amazon EC2
 * to sign the API call for `MeterUsage` API operation.
 *
 * - For **Amazon EKS** deployments, your software must use
 * IAM roles for service accounts (IRSA)
 * to sign the API call for the `MeterUsage` API operation. Using
 * EKS Pod Identity, the node role, or long-term access keys is not supported.
 *
 * - For **Amazon ECS** deployments, your software must use
 * Amazon ECS task IAM
 * role to sign the API call for the `MeterUsage` API operation. Using the node role or long-term access keys are not supported.
 *
 * - For **Amazon Bedrock AgentCore Runtime** deployments, your software must use the
 * AgentCore Runtime execution role
 * to sign the API call for the `MeterUsage` API operation. Long-term access keys are not supported.
 *
 * The handling of `MeterUsage` requests varies between Amazon Bedrock AgentCore Runtime and non-Amazon Bedrock AgentCore deployments.
 *
 * - For **non-Amazon Bedrock AgentCore Runtime** deployments, you can only report usage once per hour for each dimension.
 * For AMI-based products, this is per dimension and per EC2 instance. For container products, this is per dimension and per ECS task or EKS pod. You can't modify values
 * after they're recorded. If you report usage before a current hour ends, you will be unable to report additional usage until the next hour begins.
 * The `Timestamp` request parameter is rounded down to the hour and used to enforce this once-per-hour rule for idempotency.
 * For requests that are identical after the `Timestamp` is rounded down, the API is idempotent and returns the metering record ID.
 *
 * - For **Amazon Bedrock AgentCore Runtime** deployments, you can report usage multiple times per hour for the same dimension.
 * You do not need to aggregate metering records by the hour. You must include an idempotency token in the `ClientToken` request parameter. If using an Amazon
 * SDK or the Amazon Web Services CLI, you must use the latest version which automatically includes an idempotency token in the `ClientToken` request parameter so that the request is processed successfully.
 * The `Timestamp` request parameter is not rounded down to the hour and is not used for duplicate validation. Requests with duplicate `Timestamps` are aggregated as long as the
 * `ClientToken` is unique.
 *
 * If you submit records more than six hours after events occur, the records won't be accepted. The timestamp in your request determines when an event is recorded.
 *
 * You can optionally include multiple usage allocations, to provide customers with usage data split into buckets by tags that you define or allow the customer to define.
 *
 * For Amazon Web Services Regions that support `MeterUsage`, see MeterUsage Region support for Amazon EC2 and MeterUsage Region support for Amazon ECS and Amazon EKS.
 */
export const meterUsage: API.OperationMethod<
  MeterUsageRequest,
  MeterUsageResult,
  MeterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProductCode: 0,
      Timestamp: 0,
      UsageDimension: 0,
      UsageQuantity: 0,
      DryRun: 0,
      UsageAllocations: D.list(i_UsageAllocation),
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    CustomerNotEntitledException,
    DuplicateRequestException,
    IdempotencyConflictException,
    InternalServiceErrorException,
    InvalidEndpointRegionException,
    InvalidProductCodeException,
    InvalidTagException,
    InvalidUsageAllocationsException,
    InvalidUsageDimensionException,
    ThrottlingException,
    TimestampOutOfBoundsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MeterUsage",
})) as any;

export type RegisterUsageError =
  | CustomerNotEntitledException
  | DisabledApiException
  | InternalServiceErrorException
  | InvalidProductCodeException
  | InvalidPublicKeyVersionException
  | InvalidRegionException
  | PlatformNotSupportedException
  | ThrottlingException
  | CommonErrors;
/**
 * Paid container software products sold through Amazon Web Services Marketplace must integrate with the Amazon Web Services Marketplace
 * Metering Service and call the `RegisterUsage` operation for software
 * entitlement and metering. Free and BYOL products for Amazon ECS or Amazon EKS aren't required to call `RegisterUsage`, but you may choose to
 * do so if you would like to receive usage data in your seller reports. The sections below
 * explain the behavior of `RegisterUsage`. `RegisterUsage` performs
 * two primary functions: metering and entitlement.
 *
 * - *Entitlement*: `RegisterUsage` allows you to
 * verify that the customer running your paid software is subscribed to your
 * product on Amazon Web Services Marketplace, enabling you to guard against unauthorized use. Your container
 * image that integrates with `RegisterUsage` is only required to guard
 * against unauthorized use at container startup, as such a
 * `CustomerNotSubscribedException` or
 * `PlatformNotSupportedException` will only be thrown on the
 * initial call to `RegisterUsage`. Subsequent calls from the same
 * Amazon ECS task instance (e.g. task-id) or Amazon EKS pod
 * will not throw a `CustomerNotSubscribedException`, even if the
 * customer unsubscribes while the Amazon ECS task or Amazon EKS
 * pod is still running.
 *
 * - *Metering*: `RegisterUsage` meters software use
 * per ECS task, per hour, or per pod for Amazon EKS with usage prorated to
 * the second. A minimum of 1 minute of usage applies to tasks that are short
 * lived. For example, if a customer has a 10 node Amazon ECS or Amazon EKS cluster and a service configured as a Daemon Set, then Amazon ECS or Amazon EKS will launch a task on all 10 cluster nodes
 * and the customer will be charged for 10 tasks. Software metering
 * is handled by the Amazon Web Services Marketplace metering control plane—your software is
 * not required to perform metering-specific actions other than to call
 * `RegisterUsage` to commence metering.
 * The Amazon Web Services Marketplace metering control plane will also bill customers for
 * running ECS tasks and Amazon EKS pods, regardless of the customer's
 * subscription state, which removes the need for your software to run entitlement
 * checks at runtime. For containers, `RegisterUsage` should be called
 * immediately at launch. If you don’t register the container within the first 6 hours
 * of the launch, Amazon Web Services Marketplace Metering Service doesn’t provide any metering
 * guarantees for previous months. Metering will continue, however, for the
 * current month forward until the container ends. `RegisterUsage` is
 * for metering paid hourly container products.
 *
 * For Amazon Web Services Regions that support `RegisterUsage`, see RegisterUsage Region support.
 */
export const registerUsage: API.OperationMethod<
  RegisterUsageRequest,
  RegisterUsageResult,
  RegisterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProductCode: 0, PublicKeyVersion: 0, Nonce: 0 },
    output: { PublicKeyRotationTimestamp: D.ts },
  },
  errors: [
    CustomerNotEntitledException,
    DisabledApiException,
    InternalServiceErrorException,
    InvalidProductCodeException,
    InvalidPublicKeyVersionException,
    InvalidRegionException,
    PlatformNotSupportedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterUsage",
})) as any;

export type ResolveCustomerError =
  | DisabledApiException
  | ExpiredTokenException
  | InternalServiceErrorException
  | InvalidTokenException
  | ThrottlingException
  | CommonErrors;
/**
 * `ResolveCustomer` is called by a SaaS application during the registration
 * process. When a buyer visits your website during the registration process, the buyer
 * submits a registration token through their browser. The registration token is resolved
 * through this API to obtain a `CustomerIdentifier` along with the
 * `CustomerAWSAccountId`, `ProductCode`, and `LicenseArn`.
 *
 * For new SaaS product integrations, the `CustomerIdentifier` field is not populated in the `ResolveCustomer` API response. New integrations must use `CustomerAWSAccountId` and `LicenseArn` to identify customers. Existing integrations continue to work unchanged.
 *
 * To successfully resolve the token, the API must be called from the account that was used to publish the SaaS
 * application. For an example of using `ResolveCustomer`, see ResolveCustomer code example in the Amazon Web Services Marketplace Seller
 * Guide.
 *
 * Permission is required for this operation. Your IAM role or user performing this
 * operation requires a policy to allow the `aws-marketplace:ResolveCustomer`
 * action. For more information, see Actions, resources, and condition keys for Amazon Web Services Marketplace Metering Service in
 * the *Service Authorization Reference*.
 *
 * For Amazon Web Services Regions that support `ResolveCustomer`, see ResolveCustomer Region support.
 */
export const resolveCustomer: API.OperationMethod<
  ResolveCustomerRequest,
  ResolveCustomerResult,
  ResolveCustomerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegistrationToken: 0 } },
  errors: [
    DisabledApiException,
    ExpiredTokenException,
    InternalServiceErrorException,
    InvalidTokenException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveCustomer",
})) as any;

const i_UsageAllocation: D.LazyStruct = () => ({
  AllocatedUsageQuantity: 0,
  Tags: D.list({ Key: 0, Value: 0 }),
});
const o_UsageRecord: D.LazyStruct = () => ({ Timestamp: D.ts });
