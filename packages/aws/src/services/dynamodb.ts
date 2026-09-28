import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "DynamoDB",
  target: "DynamoDB_20120810",
  version: "2012-08-10",
  sigv4: "dynamodb",
  protocol: awsJson1_0Protocol,
  xmlns: "http://dynamodb.amazonaws.com/doc/2012-08-10/",
  rules: (p, _) => {
    const {
      Region,
      UseDualStack = false,
      UseFIPS = false,
      Endpoint,
      AccountId,
      AccountIdEndpointMode,
      ResourceArn,
      ResourceArnList,
      IsSearchOperation,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ metricValues: ["O"] });
    {
      const PartitionResult = _.partition(Region);
      const parsedEndpoint = _.parseURL(Endpoint);
      if (
        Endpoint != null &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        parsedEndpoint != null &&
        parsedEndpoint !== false
      ) {
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
        if (
          _.getAttr(parsedEndpoint, "authority") ===
          `dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`
        ) {
          return err(
            "Endpoint override is not supported for dual-stack endpoints. Please enable dual-stack functionality by enabling the configuration. For more details, see: https://docs.aws.amazon.com/sdkref/latest/guide/feature-endpoints.html",
          );
        }
        if (
          _.getAttr(parsedEndpoint, "authority") ===
          `search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`
        ) {
          return err(
            "Endpoint override is not supported for dual-stack endpoints. Please enable dual-stack functionality by enabling the configuration. For more details, see: https://docs.aws.amazon.com/sdkref/latest/guide/feature-endpoints.html",
          );
        }
        return e(`${Endpoint}`);
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
      return e(`${Endpoint}`);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (Region === "local") {
            if (UseFIPS === true) {
              return err(
                "Invalid Configuration: FIPS and local endpoint are not supported",
              );
            }
            if (UseDualStack === true) {
              return err(
                "Invalid Configuration: Dualstack and local endpoint are not supported",
              );
            }
            return e(
              "http://localhost:8000",
              {
                authSchemes: [
                  {
                    signingRegion: "us-east-1",
                    name: "sigv4",
                    signingName: "dynamodb",
                  },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              _.getAttr(PartitionResult, "supportsFIPS") === true &&
              _.getAttr(PartitionResult, "supportsDualStack") === true
            ) {
              if (
                AccountIdEndpointMode != null &&
                AccountIdEndpointMode === "required"
              ) {
                return err(
                  "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
                );
              }
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://search-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return e(
                `https://dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                if (
                  AccountIdEndpointMode != null &&
                  AccountIdEndpointMode === "required"
                ) {
                  return err(
                    "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
                  );
                }
                if (IsSearchOperation != null && IsSearchOperation === true) {
                  return e(
                    `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  );
                }
                return e(
                  `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              if (
                AccountIdEndpointMode != null &&
                AccountIdEndpointMode === "required"
              ) {
                return err(
                  "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
                );
              }
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://search-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              return e(
                `https://dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
              {
                const ParsedArn = _.parseArn(ResourceArn);
                if (
                  AccountIdEndpointMode != null &&
                  !(AccountIdEndpointMode === "disabled") &&
                  _.getAttr(PartitionResult, "name") === "aws" &&
                  !(UseFIPS === true) &&
                  ResourceArn != null &&
                  ParsedArn != null &&
                  ParsedArn !== false &&
                  _.getAttr(ParsedArn, "service") === "dynamodb" &&
                  _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
                  _.getAttr(ParsedArn, "region") === `${Region}` &&
                  _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
                ) {
                  if (IsSearchOperation != null && IsSearchOperation === true) {
                    return e(
                      `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                      _p0(),
                      {},
                    );
                  }
                  return e(
                    `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
              }
              {
                const FirstArn = _.getAttr(ResourceArnList, "[0]");
                const ParsedArn = _.parseArn(FirstArn);
                if (
                  AccountIdEndpointMode != null &&
                  !(AccountIdEndpointMode === "disabled") &&
                  _.getAttr(PartitionResult, "name") === "aws" &&
                  !(UseFIPS === true) &&
                  ResourceArnList != null &&
                  FirstArn != null &&
                  FirstArn !== false &&
                  ParsedArn != null &&
                  ParsedArn !== false &&
                  _.getAttr(ParsedArn, "service") === "dynamodb" &&
                  _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
                  _.getAttr(ParsedArn, "region") === `${Region}` &&
                  _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
                ) {
                  if (IsSearchOperation != null && IsSearchOperation === true) {
                    return e(
                      `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                      _p0(),
                      {},
                    );
                  }
                  return e(
                    `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
              }
              if (
                AccountIdEndpointMode != null &&
                !(AccountIdEndpointMode === "disabled") &&
                _.getAttr(PartitionResult, "name") === "aws" &&
                !(UseFIPS === true) &&
                AccountId != null
              ) {
                if (_.isValidHostLabel(AccountId, false)) {
                  if (IsSearchOperation != null && IsSearchOperation === true) {
                    return e(
                      `https://${AccountId}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                      _p0(),
                      {},
                    );
                  }
                  return e(
                    `https://${AccountId}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
                return err(
                  "Credentials-sourced account ID parameter is invalid",
                );
              }
              if (
                AccountIdEndpointMode != null &&
                AccountIdEndpointMode === "required"
              ) {
                if (!(UseFIPS === true)) {
                  if (_.getAttr(PartitionResult, "name") === "aws") {
                    return err(
                      "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
                    );
                  }
                  return err(
                    "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition",
                  );
                }
                return err(
                  "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
                );
              }
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return e(
                `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          {
            const ParsedArn = _.parseArn(ResourceArn);
            if (
              AccountIdEndpointMode != null &&
              !(AccountIdEndpointMode === "disabled") &&
              _.getAttr(PartitionResult, "name") === "aws" &&
              !(UseFIPS === true) &&
              ResourceArn != null &&
              ParsedArn != null &&
              ParsedArn !== false &&
              _.getAttr(ParsedArn, "service") === "dynamodb" &&
              _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
              _.getAttr(ParsedArn, "region") === `${Region}` &&
              _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
            ) {
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return e(
                `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
          }
          {
            const FirstArn = _.getAttr(ResourceArnList, "[0]");
            const ParsedArn = _.parseArn(FirstArn);
            if (
              AccountIdEndpointMode != null &&
              !(AccountIdEndpointMode === "disabled") &&
              _.getAttr(PartitionResult, "name") === "aws" &&
              !(UseFIPS === true) &&
              ResourceArnList != null &&
              FirstArn != null &&
              FirstArn !== false &&
              ParsedArn != null &&
              ParsedArn !== false &&
              _.getAttr(ParsedArn, "service") === "dynamodb" &&
              _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
              _.getAttr(ParsedArn, "region") === `${Region}` &&
              _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
            ) {
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return e(
                `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
          }
          if (
            AccountIdEndpointMode != null &&
            !(AccountIdEndpointMode === "disabled") &&
            _.getAttr(PartitionResult, "name") === "aws" &&
            !(UseFIPS === true) &&
            AccountId != null
          ) {
            if (_.isValidHostLabel(AccountId, false)) {
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://${AccountId}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return e(
                `https://${AccountId}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("Credentials-sourced account ID parameter is invalid");
          }
          if (
            AccountIdEndpointMode != null &&
            AccountIdEndpointMode === "required"
          ) {
            if (!(UseFIPS === true)) {
              if (_.getAttr(PartitionResult, "name") === "aws") {
                return err(
                  "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
                );
              }
              return err(
                "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition",
              );
            }
            return err(
              "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
            );
          }
          if (IsSearchOperation != null && IsSearchOperation === true) {
            return e(
              `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return e(
            `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BackupInUseException
  extends /*@__PURE__*/ TE.TaggedError("BackupInUseException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class BackupNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("BackupNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ConditionalCheckFailedException
  extends /*@__PURE__*/ TE.TaggedError("ConditionalCheckFailedException", [
    "ConflictError",
  ])<{
    readonly message?: string;
    readonly Item?: { [key: string]: AttributeValue | undefined };
  }> {}
export class ContinuousBackupsUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContinuousBackupsUnavailableException",
    ["ConflictError", "RetryableError"],
  )<{ readonly message?: string }> {}
export class DuplicateItemException
  extends /*@__PURE__*/ TE.TaggedError("DuplicateItemException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class ExportConflictException
  extends /*@__PURE__*/ TE.TaggedError("ExportConflictException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class ExportNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ExportNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class GlobalTableAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("GlobalTableAlreadyExistsException", [
    "ConflictError",
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class GlobalTableNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("GlobalTableNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatchException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ImportConflictException
  extends /*@__PURE__*/ TE.TaggedError("ImportConflictException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class ImportNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ImportNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class IndexNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("IndexNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class InvalidEndpointException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEndpointException",
    ["BadRequestError"],
    { status: 421 },
  )<{ readonly message?: string }> {}
export class InvalidExportTimeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidExportTimeException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidRestoreTimeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRestoreTimeException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ItemCollectionSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ItemCollectionSizeLimitExceededException",
    ["QuotaError"],
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class PointInTimeRecoveryUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "PointInTimeRecoveryUnavailableException",
    ["BadRequestError"],
  )<{ readonly message?: string }> {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("PolicyNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedThroughputExceededException",
    ["ThrottlingError", "RetryableError"],
  )<{
    readonly message?: string;
    readonly ThrottlingReasons?: ThrottlingReason[];
  }> {}
export class ReplicaAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ReplicaAlreadyExistsException", [
    "ConflictError",
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ReplicaNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ReplicaNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ReplicatedWriteConflictException
  extends /*@__PURE__*/ TE.TaggedError("ReplicatedWriteConflictException", [
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("RequestLimitExceeded", [
    "ThrottlingError",
    "RetryableError",
  ])<{
    readonly message?: string;
    readonly ThrottlingReasons?: ThrottlingReason[];
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class TableAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("TableAlreadyExistsException", [
    "ConflictError",
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class TableInUseException
  extends /*@__PURE__*/ TE.TaggedError("TableInUseException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class TableNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("TableNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError", "ThrottlingError", "RetryableError"],
    { code: "Throttling", status: 400 },
  )<{
    readonly message?: string;
    readonly throttlingReasons?: ThrottlingReason[];
  }> {}
export class TransactionCanceledException
  extends /*@__PURE__*/ TE.TaggedError("TransactionCanceledException")<{
    readonly message?: string;
    readonly CancellationReasons?: CancellationReason[];
  }> {}
export class TransactionConflictException
  extends /*@__PURE__*/ TE.TaggedError("TransactionConflictException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class TransactionInProgressException
  extends /*@__PURE__*/ TE.TaggedError("TransactionInProgressException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export type PartiQLStatement = string;
export type StringAttributeValue = string;
export type NumberAttributeValue = string;
export type BinaryAttributeValue = Uint8Array;
export type StringSetAttributeValue = string[];
export type NumberSetAttributeValue = string[];
export type BinarySetAttributeValue = Uint8Array[];
export type AttributeName = string;
export type MapAttributeValue = { [key: string]: AttributeValue | undefined };
export type ListAttributeValue = AttributeValue[];
export type NullAttributeValue = boolean;
export type BooleanAttributeValue = boolean;
export type AttributeValue =
  | {
      S: string;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N: string;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B: Uint8Array;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS: string[];
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS: string[];
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS: Uint8Array[];
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M: { [key: string]: AttributeValue | undefined };
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L: AttributeValue[];
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL: boolean;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL: boolean;
    };
export type PreparedStatementParameters = AttributeValue[];
export type ConsistentRead = boolean;
export type ReturnValuesOnConditionCheckFailure =
  | "ALL_OLD"
  | "NONE"
  | (string & {});
export interface BatchStatementRequest {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export type PartiQLBatchRequest = BatchStatementRequest[];
export type ReturnConsumedCapacity =
  | "INDEXES"
  | "TOTAL"
  | "NONE"
  | (string & {});
export interface BatchExecuteStatementInput {
  Statements: BatchStatementRequest[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export type BatchStatementErrorCodeEnum =
  | "ConditionalCheckFailed"
  | "ItemCollectionSizeLimitExceeded"
  | "RequestLimitExceeded"
  | "ValidationError"
  | "ProvisionedThroughputExceeded"
  | "TransactionConflict"
  | "ThrottlingError"
  | "InternalServerError"
  | "ResourceNotFound"
  | "AccessDenied"
  | "DuplicateItem"
  | (string & {});
export type AttributeMap = { [key: string]: AttributeValue | undefined };
export interface BatchStatementError {
  Code?: BatchStatementErrorCodeEnum;
  Message?: string;
  Item?: { [key: string]: AttributeValue | undefined };
}
export type TableName = string;
export interface BatchStatementResponse {
  Error?: BatchStatementError;
  TableName?: string;
  Item?: { [key: string]: AttributeValue | undefined };
}
export type PartiQLBatchResponse = BatchStatementResponse[];
export type TableArn = string;
export type ConsumedCapacityUnits = number;
export interface Capacity {
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
  CapacityUnits?: number;
}
export type IndexName = string;
export type SecondaryIndexesCapacityMap = {
  [key: string]: Capacity | undefined;
};
export interface VectorCapacity {
  VectorSearchRequestBytes?: number;
  VectorWriteRequestBytes?: number;
}
export type VectorIndexesCapacityMap = {
  [key: string]: VectorCapacity | undefined;
};
export interface ConsumedCapacity {
  TableName?: string;
  CapacityUnits?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
  Table?: Capacity;
  LocalSecondaryIndexes?: { [key: string]: Capacity | undefined };
  GlobalSecondaryIndexes?: { [key: string]: Capacity | undefined };
  VectorIndexes?: { [key: string]: VectorCapacity | undefined };
}
export type ConsumedCapacityMultiple = ConsumedCapacity[];
export interface BatchExecuteStatementOutput {
  Responses?: BatchStatementResponse[];
  ConsumedCapacity?: ConsumedCapacity[];
}
export type Key = { [key: string]: AttributeValue | undefined };
export type KeyList = { [key: string]: AttributeValue | undefined }[];
export type AttributeNameList = string[];
export type ProjectionExpression = string;
export type ExpressionAttributeNameVariable = string;
export type ExpressionAttributeNameMap = { [key: string]: string | undefined };
export interface KeysAndAttributes {
  Keys: { [key: string]: AttributeValue | undefined }[];
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export type BatchGetRequestMap = {
  [key: string]: KeysAndAttributes | undefined;
};
export interface BatchGetItemInput {
  RequestItems: { [key: string]: KeysAndAttributes | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export type ItemList = { [key: string]: AttributeValue | undefined }[];
export type BatchGetResponseMap = {
  [key: string]: { [key: string]: AttributeValue | undefined }[] | undefined;
};
export interface BatchGetItemOutput {
  Responses?: {
    [key: string]: { [key: string]: AttributeValue | undefined }[] | undefined;
  };
  UnprocessedKeys?: { [key: string]: KeysAndAttributes | undefined };
  ConsumedCapacity?: ConsumedCapacity[];
}
export type PutItemInputAttributeMap = {
  [key: string]: AttributeValue | undefined;
};
export interface PutRequest {
  Item: { [key: string]: AttributeValue | undefined };
}
export interface DeleteRequest {
  Key: { [key: string]: AttributeValue | undefined };
}
export interface WriteRequest {
  PutRequest?: PutRequest;
  DeleteRequest?: DeleteRequest;
}
export type WriteRequests = WriteRequest[];
export type BatchWriteItemRequestMap = {
  [key: string]: WriteRequest[] | undefined;
};
export type ReturnItemCollectionMetrics = "SIZE" | "NONE" | (string & {});
export interface BatchWriteItemInput {
  RequestItems: { [key: string]: WriteRequest[] | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
}
export type ItemCollectionKeyAttributeMap = {
  [key: string]: AttributeValue | undefined;
};
export type ItemCollectionSizeEstimateBound = number;
export type ItemCollectionSizeEstimateRange = number[];
export interface ItemCollectionMetrics {
  ItemCollectionKey?: { [key: string]: AttributeValue | undefined };
  SizeEstimateRangeGB?: number[];
}
export type ItemCollectionMetricsMultiple = ItemCollectionMetrics[];
export type ItemCollectionMetricsPerTable = {
  [key: string]: ItemCollectionMetrics[] | undefined;
};
export interface BatchWriteItemOutput {
  UnprocessedItems?: { [key: string]: WriteRequest[] | undefined };
  ItemCollectionMetrics?: {
    [key: string]: ItemCollectionMetrics[] | undefined;
  };
  ConsumedCapacity?: ConsumedCapacity[];
}
export type BackupName = string;
export interface CreateBackupInput {
  TableName: string;
  BackupName: string;
}
export type BackupArn = string;
export type BackupSizeBytes = number;
export type BackupStatus = "CREATING" | "DELETED" | "AVAILABLE" | (string & {});
export type BackupType = "USER" | "SYSTEM" | "AWS_BACKUP" | (string & {});
export type BackupCreationDateTime = Date;
export interface BackupDetails {
  BackupArn: string;
  BackupName: string;
  BackupSizeBytes?: number;
  BackupStatus: BackupStatus;
  BackupType: BackupType;
  BackupCreationDateTime: Date;
  BackupExpiryDateTime?: Date;
}
export interface CreateBackupOutput {
  BackupDetails?: BackupDetails;
}
export type RegionName = string;
export interface Replica {
  RegionName?: string;
}
export type ReplicaList = Replica[];
export interface CreateGlobalTableInput {
  GlobalTableName: string;
  ReplicationGroup: Replica[];
}
export type ReplicaStatus =
  | "CREATING"
  | "CREATION_FAILED"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "REGION_DISABLED"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS"
  | "ARCHIVING"
  | "ARCHIVED"
  | "REPLICATION_NOT_AUTHORIZED"
  | (string & {});
export type ReplicaStatusDescription = string;
export type ReplicaStatusPercentProgress = string;
export type KMSMasterKeyId = string;
export type PositiveLongObject = number;
export interface ProvisionedThroughputOverride {
  ReadCapacityUnits?: number;
}
export type LongObject = number;
export interface OnDemandThroughputOverride {
  MaxReadRequestUnits?: number;
}
export type TableStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS"
  | "ARCHIVING"
  | "ARCHIVED"
  | "REPLICATION_NOT_AUTHORIZED"
  | (string & {});
export interface TableWarmThroughputDescription {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
  Status?: TableStatus;
}
export type IndexStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | (string & {});
export interface GlobalSecondaryIndexWarmThroughputDescription {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
  Status?: IndexStatus;
}
export interface ReplicaGlobalSecondaryIndexDescription {
  IndexName?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  WarmThroughput?: GlobalSecondaryIndexWarmThroughputDescription;
}
export type ReplicaGlobalSecondaryIndexDescriptionList =
  ReplicaGlobalSecondaryIndexDescription[];
export type TableClass =
  | "STANDARD"
  | "STANDARD_INFREQUENT_ACCESS"
  | (string & {});
export interface TableClassSummary {
  TableClass?: TableClass;
  LastUpdateDateTime?: Date;
}
export type GlobalTableSettingsReplicationMode =
  | "ENABLED"
  | "DISABLED"
  | "ENABLED_WITH_OVERRIDES"
  | (string & {});
export interface ReplicaDescription {
  RegionName?: string;
  ReplicaStatus?: ReplicaStatus;
  ReplicaArn?: string;
  ReplicaStatusDescription?: string;
  ReplicaStatusPercentProgress?: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  WarmThroughput?: TableWarmThroughputDescription;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexDescription[];
  ReplicaInaccessibleDateTime?: Date;
  ReplicaTableClassSummary?: TableClassSummary;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
}
export type ReplicaDescriptionList = ReplicaDescription[];
export type GlobalTableArnString = string;
export type GlobalTableStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface GlobalTableDescription {
  ReplicationGroup?: ReplicaDescription[];
  GlobalTableArn?: string;
  CreationDateTime?: Date;
  GlobalTableStatus?: GlobalTableStatus;
  GlobalTableName?: string;
}
export interface CreateGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export type KeySchemaAttributeName = string;
export type ScalarAttributeType = "S" | "N" | "B" | (string & {});
export interface AttributeDefinition {
  AttributeName: string;
  AttributeType: ScalarAttributeType;
}
export type AttributeDefinitions = AttributeDefinition[];
export type KeyType = "HASH" | "RANGE" | (string & {});
export interface KeySchemaElement {
  AttributeName: string;
  KeyType: KeyType;
}
export type KeySchema = KeySchemaElement[];
export type ProjectionType = "ALL" | "KEYS_ONLY" | "INCLUDE" | (string & {});
export type NonKeyAttributeName = string;
export type NonKeyAttributeNameList = string[];
export interface Projection {
  ProjectionType?: ProjectionType;
  NonKeyAttributes?: string[];
}
export interface LocalSecondaryIndex {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
}
export type LocalSecondaryIndexList = LocalSecondaryIndex[];
export interface ProvisionedThroughput {
  ReadCapacityUnits: number;
  WriteCapacityUnits: number;
}
export interface OnDemandThroughput {
  MaxReadRequestUnits?: number;
  MaxWriteRequestUnits?: number;
}
export interface WarmThroughput {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
}
export interface GlobalSecondaryIndex {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export type GlobalSecondaryIndexList = GlobalSecondaryIndex[];
export type BillingMode = "PROVISIONED" | "PAY_PER_REQUEST" | (string & {});
export type StreamEnabled = boolean;
export type StreamViewType =
  | "NEW_IMAGE"
  | "OLD_IMAGE"
  | "NEW_AND_OLD_IMAGES"
  | "KEYS_ONLY"
  | (string & {});
export interface StreamSpecification {
  StreamEnabled: boolean;
  StreamViewType?: StreamViewType;
}
export type SSEEnabled = boolean;
export type SSEType = "AES256" | "KMS" | (string & {});
export interface SSESpecification {
  Enabled?: boolean;
  SSEType?: SSEType;
  KMSMasterKeyId?: string;
}
export type TagKeyString = string;
export type TagValueString = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type DeletionProtectionEnabled = boolean;
export type ResourcePolicy = string;
export type VectorAttributeName = string;
export interface VectorAttributeDefinition {
  AttributeName: string;
}
export type SearchSchemaElementType = "HASH" | "INLINE_FILTER" | (string & {});
export interface SearchSchemaElement {
  AttributeName: string;
  SearchSchemaElementType: SearchSchemaElementType;
}
export type SearchSchema = SearchSchemaElement[];
export type VectorDistanceFunction =
  | "COSINE"
  | "DOT_PRODUCT"
  | "EUCLIDEAN"
  | (string & {});
export interface VectorIndex {
  IndexName: string;
  VectorAttribute: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection: Projection;
  Dimensions: number;
  DistanceFunction: VectorDistanceFunction;
}
export type VectorIndexList = VectorIndex[];
export interface CreateTableInput {
  AttributeDefinitions?: AttributeDefinition[];
  TableName: string;
  KeySchema?: KeySchemaElement[];
  LocalSecondaryIndexes?: LocalSecondaryIndex[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  Tags?: Tag[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
  WarmThroughput?: WarmThroughput;
  ResourcePolicy?: string;
  OnDemandThroughput?: OnDemandThroughput;
  GlobalTableSourceArn?: string;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  VectorIndexes?: VectorIndex[];
}
export type NonNegativeLongObject = number;
export interface ProvisionedThroughputDescription {
  LastIncreaseDateTime?: Date;
  LastDecreaseDateTime?: Date;
  NumberOfDecreasesToday?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
}
export type TableId = string;
export interface BillingModeSummary {
  BillingMode?: BillingMode;
  LastUpdateToPayPerRequestDateTime?: Date;
}
export interface LocalSecondaryIndexDescription {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
}
export type LocalSecondaryIndexDescriptionList =
  LocalSecondaryIndexDescription[];
export type Backfilling = boolean;
export interface GlobalSecondaryIndexDescription {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexStatus?: IndexStatus;
  Backfilling?: boolean;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: GlobalSecondaryIndexWarmThroughputDescription;
}
export type GlobalSecondaryIndexDescriptionList =
  GlobalSecondaryIndexDescription[];
export type StreamArn = string;
export type WitnessStatus = "CREATING" | "DELETING" | "ACTIVE" | (string & {});
export interface GlobalTableWitnessDescription {
  RegionName?: string;
  WitnessStatus?: WitnessStatus;
}
export type GlobalTableWitnessDescriptionList = GlobalTableWitnessDescription[];
export type RestoreInProgress = boolean;
export interface RestoreSummary {
  SourceBackupArn?: string;
  SourceTableArn?: string;
  RestoreDateTime: Date;
  RestoreInProgress: boolean;
}
export type SSEStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING"
  | (string & {});
export type KMSMasterKeyArn = string;
export interface SSEDescription {
  Status?: SSEStatus;
  SSEType?: SSEType;
  KMSMasterKeyArn?: string;
  InaccessibleEncryptionDateTime?: Date;
}
export type ArchivalReason = string;
export interface ArchivalSummary {
  ArchivalDateTime?: Date;
  ArchivalReason?: string;
  ArchivalBackupArn?: string;
}
export type MultiRegionConsistency = "EVENTUAL" | "STRONG" | (string & {});
export interface VectorIndexDescription {
  IndexName?: string;
  SearchSchema?: SearchSchemaElement[];
  Projection?: Projection;
  VectorAttribute?: VectorAttributeDefinition;
  Dimensions?: number;
  DistanceFunction?: VectorDistanceFunction;
  IndexStatus?: IndexStatus;
  Backfilling?: boolean;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
}
export type VectorIndexDescriptionList = VectorIndexDescription[];
export interface TableDescription {
  AttributeDefinitions?: AttributeDefinition[];
  TableName?: string;
  KeySchema?: KeySchemaElement[];
  TableStatus?: TableStatus;
  CreationDateTime?: Date;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  TableSizeBytes?: number;
  ItemCount?: number;
  TableArn?: string;
  TableId?: string;
  BillingModeSummary?: BillingModeSummary;
  LocalSecondaryIndexes?: LocalSecondaryIndexDescription[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndexDescription[];
  StreamSpecification?: StreamSpecification;
  LatestStreamLabel?: string;
  LatestStreamArn?: string;
  GlobalTableVersion?: string;
  Replicas?: ReplicaDescription[];
  GlobalTableWitnesses?: GlobalTableWitnessDescription[];
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  RestoreSummary?: RestoreSummary;
  SSEDescription?: SSEDescription;
  ArchivalSummary?: ArchivalSummary;
  TableClassSummary?: TableClassSummary;
  DeletionProtectionEnabled?: boolean;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: TableWarmThroughputDescription;
  MultiRegionConsistency?: MultiRegionConsistency;
  VectorIndexes?: VectorIndexDescription[];
}
export interface CreateTableOutput {
  TableDescription?: TableDescription;
}
export interface DeleteBackupInput {
  BackupArn: string;
}
export type TableCreationDateTime = Date;
export type ItemCount = number;
export interface SourceTableDetails {
  TableName: string;
  TableId: string;
  TableArn?: string;
  TableSizeBytes?: number;
  KeySchema: KeySchemaElement[];
  TableCreationDateTime: Date;
  ProvisionedThroughput: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  ItemCount?: number;
  BillingMode?: BillingMode;
}
export interface LocalSecondaryIndexInfo {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
}
export type LocalSecondaryIndexes = LocalSecondaryIndexInfo[];
export interface GlobalSecondaryIndexInfo {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
}
export type GlobalSecondaryIndexes = GlobalSecondaryIndexInfo[];
export type TimeToLiveStatus =
  | "ENABLING"
  | "DISABLING"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type TimeToLiveAttributeName = string;
export interface TimeToLiveDescription {
  TimeToLiveStatus?: TimeToLiveStatus;
  AttributeName?: string;
}
export interface VectorIndexInfo {
  IndexName?: string;
  VectorAttribute?: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection?: Projection;
  Dimensions?: number;
  DistanceFunction?: VectorDistanceFunction;
}
export type VectorIndexes = VectorIndexInfo[];
export interface SourceTableFeatureDetails {
  LocalSecondaryIndexes?: LocalSecondaryIndexInfo[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndexInfo[];
  StreamDescription?: StreamSpecification;
  TimeToLiveDescription?: TimeToLiveDescription;
  SSEDescription?: SSEDescription;
  VectorIndexes?: VectorIndexInfo[];
}
export interface BackupDescription {
  BackupDetails?: BackupDetails;
  SourceTableDetails?: SourceTableDetails;
  SourceTableFeatureDetails?: SourceTableFeatureDetails;
}
export interface DeleteBackupOutput {
  BackupDescription?: BackupDescription;
}
export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "IN"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "BETWEEN"
  | "NOT_NULL"
  | "NULL"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BEGINS_WITH"
  | (string & {});
export type AttributeValueList = AttributeValue[];
export interface ExpectedAttributeValue {
  Value?: AttributeValue;
  Exists?: boolean;
  ComparisonOperator?: ComparisonOperator;
  AttributeValueList?: AttributeValue[];
}
export type ExpectedAttributeMap = {
  [key: string]: ExpectedAttributeValue | undefined;
};
export type ConditionalOperator = "AND" | "OR" | (string & {});
export type ReturnValue =
  | "NONE"
  | "ALL_OLD"
  | "UPDATED_OLD"
  | "ALL_NEW"
  | "UPDATED_NEW"
  | (string & {});
export type ConditionExpression = string;
export type ExpressionAttributeValueVariable = string;
export type ExpressionAttributeValueMap = {
  [key: string]: AttributeValue | undefined;
};
export interface DeleteItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ConditionalOperator?: ConditionalOperator;
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface DeleteItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export type ResourceArnString = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyInput {
  ResourceArn: string;
  ExpectedRevisionId?: string;
}
export interface DeleteResourcePolicyOutput {
  RevisionId?: string;
}
export interface DeleteTableInput {
  TableName: string;
}
export interface DeleteTableOutput {
  TableDescription?: TableDescription;
}
export interface DescribeBackupInput {
  BackupArn: string;
}
export interface DescribeBackupOutput {
  BackupDescription?: BackupDescription;
}
export interface DescribeContinuousBackupsInput {
  TableName: string;
}
export type ContinuousBackupsStatus = "ENABLED" | "DISABLED" | (string & {});
export type PointInTimeRecoveryStatus = "ENABLED" | "DISABLED" | (string & {});
export type RecoveryPeriodInDays = number;
export interface PointInTimeRecoveryDescription {
  PointInTimeRecoveryStatus?: PointInTimeRecoveryStatus;
  RecoveryPeriodInDays?: number;
  EarliestRestorableDateTime?: Date;
  LatestRestorableDateTime?: Date;
}
export interface ContinuousBackupsDescription {
  ContinuousBackupsStatus: ContinuousBackupsStatus;
  PointInTimeRecoveryDescription?: PointInTimeRecoveryDescription;
}
export interface DescribeContinuousBackupsOutput {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
}
export interface DescribeContributorInsightsInput {
  TableName: string;
  IndexName?: string;
}
export type ContributorInsightsRule = string;
export type ContributorInsightsRuleList = string[];
export type ContributorInsightsStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "FAILED"
  | (string & {});
export type LastUpdateDateTime = Date;
export type ExceptionName = string;
export type ExceptionDescription = string;
export interface FailureException {
  ExceptionName?: string;
  ExceptionDescription?: string;
}
export type ContributorInsightsMode =
  | "ACCESSED_AND_THROTTLED_KEYS"
  | "THROTTLED_KEYS"
  | (string & {});
export interface DescribeContributorInsightsOutput {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsRuleList?: string[];
  ContributorInsightsStatus?: ContributorInsightsStatus;
  LastUpdateDateTime?: Date;
  FailureException?: FailureException;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export interface DescribeEndpointsRequest {}
export interface Endpoint {
  Address: string;
  CachePeriodInMinutes: number;
}
export type Endpoints = Endpoint[];
export interface DescribeEndpointsResponse {
  Endpoints: Endpoint[];
}
export type ExportArn = string;
export interface DescribeExportInput {
  ExportArn: string;
}
export type ExportStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type ExportStartTime = Date;
export type ExportEndTime = Date;
export type ExportManifest = string;
export type ExportTime = Date;
export type ClientToken = string;
export type S3Bucket = string;
export type S3BucketOwner = string;
export type S3Prefix = string;
export type S3SseAlgorithm = "AES256" | "KMS" | (string & {});
export type S3SseKmsKeyId = string;
export type FailureCode = string;
export type FailureMessage = string;
export type ExportFormat = "DYNAMODB_JSON" | "ION" | (string & {});
export type BilledSizeBytes = number;
export type ExportType = "FULL_EXPORT" | "INCREMENTAL_EXPORT" | (string & {});
export type ExportFromTime = Date;
export type ExportToTime = Date;
export type ExportViewType = "NEW_IMAGE" | "NEW_AND_OLD_IMAGES" | (string & {});
export interface IncrementalExportSpecification {
  ExportFromTime?: Date;
  ExportToTime?: Date;
  ExportViewType?: ExportViewType;
}
export interface ExportDescription {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
  StartTime?: Date;
  EndTime?: Date;
  ExportManifest?: string;
  TableArn?: string;
  TableId?: string;
  ExportTime?: Date;
  ClientToken?: string;
  S3Bucket?: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  FailureCode?: string;
  FailureMessage?: string;
  ExportFormat?: ExportFormat;
  BilledSizeBytes?: number;
  ItemCount?: number;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
}
export interface DescribeExportOutput {
  ExportDescription?: ExportDescription;
}
export interface DescribeGlobalTableInput {
  GlobalTableName: string;
}
export interface DescribeGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export interface DescribeGlobalTableSettingsInput {
  GlobalTableName: string;
}
export type AutoScalingPolicyName = string;
export type IntegerObject = number;
export type DoubleObject = number;
export interface AutoScalingTargetTrackingScalingPolicyConfigurationDescription {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
}
export interface AutoScalingPolicyDescription {
  PolicyName?: string;
  TargetTrackingScalingPolicyConfiguration?: AutoScalingTargetTrackingScalingPolicyConfigurationDescription;
}
export type AutoScalingPolicyDescriptionList = AutoScalingPolicyDescription[];
export interface AutoScalingSettingsDescription {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicies?: AutoScalingPolicyDescription[];
}
export interface ReplicaGlobalSecondaryIndexSettingsDescription {
  IndexName: string;
  IndexStatus?: IndexStatus;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
}
export type ReplicaGlobalSecondaryIndexSettingsDescriptionList =
  ReplicaGlobalSecondaryIndexSettingsDescription[];
export interface ReplicaSettingsDescription {
  RegionName: string;
  ReplicaStatus?: ReplicaStatus;
  ReplicaBillingModeSummary?: BillingModeSummary;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityUnits?: number;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaGlobalSecondaryIndexSettings?: ReplicaGlobalSecondaryIndexSettingsDescription[];
  ReplicaTableClassSummary?: TableClassSummary;
}
export type ReplicaSettingsDescriptionList = ReplicaSettingsDescription[];
export interface DescribeGlobalTableSettingsOutput {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
}
export type ImportArn = string;
export interface DescribeImportInput {
  ImportArn: string;
}
export type ImportStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLING"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export interface S3BucketSource {
  S3BucketOwner?: string;
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export type ErrorCount = number;
export type CloudWatchLogGroupArn = string;
export type InputFormat = "DYNAMODB_JSON" | "ION" | "CSV" | (string & {});
export type CsvDelimiter = string;
export type CsvHeader = string;
export type CsvHeaderList = string[];
export interface CsvOptions {
  Delimiter?: string;
  HeaderList?: string[];
}
export interface InputFormatOptions {
  Csv?: CsvOptions;
}
export type InputCompressionType = "GZIP" | "ZSTD" | "NONE" | (string & {});
export interface TableCreationParameters {
  TableName: string;
  AttributeDefinitions: AttributeDefinition[];
  KeySchema: KeySchemaElement[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  SSESpecification?: SSESpecification;
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  VectorIndexes?: VectorIndex[];
}
export type ImportStartTime = Date;
export type ImportEndTime = Date;
export type ProcessedItemCount = number;
export type ImportedItemCount = number;
export interface ImportTableDescription {
  ImportArn?: string;
  ImportStatus?: ImportStatus;
  TableArn?: string;
  TableId?: string;
  ClientToken?: string;
  S3BucketSource?: S3BucketSource;
  ErrorCount?: number;
  CloudWatchLogGroupArn?: string;
  InputFormat?: InputFormat;
  InputFormatOptions?: InputFormatOptions;
  InputCompressionType?: InputCompressionType;
  TableCreationParameters?: TableCreationParameters;
  StartTime?: Date;
  EndTime?: Date;
  ProcessedSizeBytes?: number;
  ProcessedItemCount?: number;
  ImportedItemCount?: number;
  FailureCode?: string;
  FailureMessage?: string;
}
export interface DescribeImportOutput {
  ImportTableDescription: ImportTableDescription;
}
export interface DescribeKinesisStreamingDestinationInput {
  TableName: string;
}
export type DestinationStatus =
  | "ENABLING"
  | "ACTIVE"
  | "DISABLING"
  | "DISABLED"
  | "ENABLE_FAILED"
  | "UPDATING"
  | (string & {});
export type ApproximateCreationDateTimePrecision =
  | "MILLISECOND"
  | "MICROSECOND"
  | (string & {});
export interface KinesisDataStreamDestination {
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  DestinationStatusDescription?: string;
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export type KinesisDataStreamDestinations = KinesisDataStreamDestination[];
export interface DescribeKinesisStreamingDestinationOutput {
  TableName?: string;
  KinesisDataStreamDestinations?: KinesisDataStreamDestination[];
}
export interface DescribeLimitsInput {}
export interface DescribeLimitsOutput {
  AccountMaxReadCapacityUnits?: number;
  AccountMaxWriteCapacityUnits?: number;
  TableMaxReadCapacityUnits?: number;
  TableMaxWriteCapacityUnits?: number;
}
export interface DescribeTableInput {
  TableName: string;
}
export interface DescribeTableOutput {
  Table?: TableDescription;
}
export interface DescribeTableReplicaAutoScalingInput {
  TableName: string;
}
export interface ReplicaGlobalSecondaryIndexAutoScalingDescription {
  IndexName?: string;
  IndexStatus?: IndexStatus;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
}
export type ReplicaGlobalSecondaryIndexAutoScalingDescriptionList =
  ReplicaGlobalSecondaryIndexAutoScalingDescription[];
export interface ReplicaAutoScalingDescription {
  RegionName?: string;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexAutoScalingDescription[];
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaStatus?: ReplicaStatus;
}
export type ReplicaAutoScalingDescriptionList = ReplicaAutoScalingDescription[];
export interface TableAutoScalingDescription {
  TableName?: string;
  TableStatus?: TableStatus;
  Replicas?: ReplicaAutoScalingDescription[];
}
export interface DescribeTableReplicaAutoScalingOutput {
  TableAutoScalingDescription?: TableAutoScalingDescription;
}
export interface DescribeTimeToLiveInput {
  TableName: string;
}
export interface DescribeTimeToLiveOutput {
  TimeToLiveDescription?: TimeToLiveDescription;
}
export interface EnableKinesisStreamingConfiguration {
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export interface KinesisStreamingDestinationInput {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
}
export interface KinesisStreamingDestinationOutput {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
}
export type PartiQLNextToken = string;
export type PositiveIntegerObject = number;
export interface ExecuteStatementInput {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  NextToken?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  Limit?: number;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface ExecuteStatementOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  NextToken?: string;
  ConsumedCapacity?: ConsumedCapacity;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
}
export interface ParameterizedStatement {
  Statement: string;
  Parameters?: AttributeValue[];
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export type ParameterizedStatements = ParameterizedStatement[];
export type ClientRequestToken = string;
export interface ExecuteTransactionInput {
  TransactStatements: ParameterizedStatement[];
  ClientRequestToken?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export interface ItemResponse {
  Item?: { [key: string]: AttributeValue | undefined };
}
export type ItemResponseList = ItemResponse[];
export interface ExecuteTransactionOutput {
  Responses?: ItemResponse[];
  ConsumedCapacity?: ConsumedCapacity[];
}
export interface ExportTableToPointInTimeInput {
  TableArn: string;
  ExportTime?: Date;
  ClientToken?: string;
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  ExportFormat?: ExportFormat;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
}
export interface ExportTableToPointInTimeOutput {
  ExportDescription?: ExportDescription;
}
export interface GetItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export interface GetItemOutput {
  Item?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export interface GetResourcePolicyInput {
  ResourceArn: string;
}
export interface GetResourcePolicyOutput {
  Policy?: string;
  RevisionId?: string;
}
export interface ImportTableInput {
  ClientToken?: string;
  S3BucketSource: S3BucketSource;
  InputFormat: InputFormat;
  InputFormatOptions?: InputFormatOptions;
  InputCompressionType?: InputCompressionType;
  TableCreationParameters: TableCreationParameters;
}
export interface ImportTableOutput {
  ImportTableDescription: ImportTableDescription;
}
export type BackupsInputLimit = number;
export type TimeRangeLowerBound = Date;
export type TimeRangeUpperBound = Date;
export type BackupTypeFilter =
  | "USER"
  | "SYSTEM"
  | "AWS_BACKUP"
  | "ALL"
  | (string & {});
export interface ListBackupsInput {
  TableName?: string;
  Limit?: number;
  TimeRangeLowerBound?: Date;
  TimeRangeUpperBound?: Date;
  ExclusiveStartBackupArn?: string;
  BackupType?: BackupTypeFilter;
}
export interface BackupSummary {
  TableName?: string;
  TableId?: string;
  TableArn?: string;
  BackupArn?: string;
  BackupName?: string;
  BackupCreationDateTime?: Date;
  BackupExpiryDateTime?: Date;
  BackupStatus?: BackupStatus;
  BackupType?: BackupType;
  BackupSizeBytes?: number;
}
export type BackupSummaries = BackupSummary[];
export interface ListBackupsOutput {
  BackupSummaries?: BackupSummary[];
  LastEvaluatedBackupArn?: string;
}
export type NextTokenString = string;
export type ListContributorInsightsLimit = number;
export interface ListContributorInsightsInput {
  TableName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContributorInsightsSummary {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export type ContributorInsightsSummaries = ContributorInsightsSummary[];
export interface ListContributorInsightsOutput {
  ContributorInsightsSummaries?: ContributorInsightsSummary[];
  NextToken?: string;
}
export type ListExportsMaxLimit = number;
export type ExportNextToken = string;
export interface ListExportsInput {
  TableArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ExportSummary {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
  ExportType?: ExportType;
}
export type ExportSummaries = ExportSummary[];
export interface ListExportsOutput {
  ExportSummaries?: ExportSummary[];
  NextToken?: string;
}
export interface ListGlobalTablesInput {
  ExclusiveStartGlobalTableName?: string;
  Limit?: number;
  RegionName?: string;
}
export interface GlobalTable {
  GlobalTableName?: string;
  ReplicationGroup?: Replica[];
}
export type GlobalTableList = GlobalTable[];
export interface ListGlobalTablesOutput {
  GlobalTables?: GlobalTable[];
  LastEvaluatedGlobalTableName?: string;
}
export type ListImportsMaxLimit = number;
export type ImportNextToken = string;
export interface ListImportsInput {
  TableArn?: string;
  PageSize?: number;
  NextToken?: string;
}
export interface ImportSummary {
  ImportArn?: string;
  ImportStatus?: ImportStatus;
  TableArn?: string;
  S3BucketSource?: S3BucketSource;
  CloudWatchLogGroupArn?: string;
  InputFormat?: InputFormat;
  StartTime?: Date;
  EndTime?: Date;
}
export type ImportSummaryList = ImportSummary[];
export interface ListImportsOutput {
  ImportSummaryList?: ImportSummary[];
  NextToken?: string;
}
export type ListTablesInputLimit = number;
export interface ListTablesInput {
  ExclusiveStartTableName?: string;
  Limit?: number;
}
export type TableNameList = string[];
export interface ListTablesOutput {
  TableNames?: string[];
  LastEvaluatedTableName?: string;
}
export interface ListTagsOfResourceInput {
  ResourceArn: string;
  NextToken?: string;
}
export interface ListTagsOfResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export interface PutItemInput {
  TableName: string;
  Item: { [key: string]: AttributeValue | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ConditionalOperator?: ConditionalOperator;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface PutItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export type ConfirmRemoveSelfResourceAccess = boolean;
export interface PutResourcePolicyInput {
  ResourceArn: string;
  Policy: string;
  ExpectedRevisionId?: string;
  ConfirmRemoveSelfResourceAccess?: boolean;
}
export interface PutResourcePolicyOutput {
  RevisionId?: string;
}
export type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT"
  | (string & {});
export interface Condition {
  AttributeValueList?: AttributeValue[];
  ComparisonOperator: ComparisonOperator;
}
export type KeyConditions = { [key: string]: Condition | undefined };
export type FilterConditionMap = { [key: string]: Condition | undefined };
export type KeyExpression = string;
export interface QueryInput {
  TableName: string;
  IndexName?: string;
  Select?: Select;
  AttributesToGet?: string[];
  Limit?: number;
  ConsistentRead?: boolean;
  KeyConditions?: { [key: string]: Condition | undefined };
  QueryFilter?: { [key: string]: Condition | undefined };
  ConditionalOperator?: ConditionalOperator;
  ScanIndexForward?: boolean;
  ExclusiveStartKey?: { [key: string]: AttributeValue | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ProjectionExpression?: string;
  FilterExpression?: string;
  KeyConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
}
export interface QueryOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export interface RestoreTableFromBackupInput {
  TargetTableName: string;
  BackupArn: string;
  BillingModeOverride?: BillingMode;
  GlobalSecondaryIndexOverride?: GlobalSecondaryIndex[];
  LocalSecondaryIndexOverride?: LocalSecondaryIndex[];
  ProvisionedThroughputOverride?: ProvisionedThroughput;
  OnDemandThroughputOverride?: OnDemandThroughput;
  SSESpecificationOverride?: SSESpecification;
  VectorIndexOverride?: VectorIndex[];
}
export interface RestoreTableFromBackupOutput {
  TableDescription?: TableDescription;
}
export interface RestoreTableToPointInTimeInput {
  SourceTableArn?: string;
  SourceTableName?: string;
  TargetTableName: string;
  UseLatestRestorableTime?: boolean;
  RestoreDateTime?: Date;
  BillingModeOverride?: BillingMode;
  GlobalSecondaryIndexOverride?: GlobalSecondaryIndex[];
  LocalSecondaryIndexOverride?: LocalSecondaryIndex[];
  ProvisionedThroughputOverride?: ProvisionedThroughput;
  OnDemandThroughputOverride?: OnDemandThroughput;
  SSESpecificationOverride?: SSESpecification;
  VectorIndexOverride?: VectorIndex[];
}
export interface RestoreTableToPointInTimeOutput {
  TableDescription?: TableDescription;
}
export type ScanTotalSegments = number;
export type ScanSegment = number;
export interface ScanInput {
  TableName: string;
  IndexName?: string;
  AttributesToGet?: string[];
  Limit?: number;
  Select?: Select;
  ScanFilter?: { [key: string]: Condition | undefined };
  ConditionalOperator?: ConditionalOperator;
  ExclusiveStartKey?: { [key: string]: AttributeValue | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  TotalSegments?: number;
  Segment?: number;
  ProjectionExpression?: string;
  FilterExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ConsistentRead?: boolean;
}
export interface ScanOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export type SearchVectorList = AttributeValue[];
export type TopKInteger = number;
export interface SearchVectorsInput {
  TableName: string;
  IndexName: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ProjectionExpression?: string;
  SearchVector: AttributeValue[];
  SearchConditionExpression?: string;
  TopK: number;
}
export type ScoreNumber = number;
export interface SearchResultItem {
  Item?: { [key: string]: AttributeValue | undefined };
  Score?: number;
}
export type SearchResultList = SearchResultItem[];
export interface SearchVectorsOutput {
  ConsumedCapacity?: VectorCapacity;
  SearchResults?: SearchResultItem[];
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface Get {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export interface TransactGetItem {
  Get: Get;
}
export type TransactGetItemList = TransactGetItem[];
export interface TransactGetItemsInput {
  TransactItems: TransactGetItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export interface TransactGetItemsOutput {
  ConsumedCapacity?: ConsumedCapacity[];
  Responses?: ItemResponse[];
}
export interface ConditionCheck {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface Put {
  Item: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface Delete {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export type UpdateExpression = string;
export interface Update {
  Key: { [key: string]: AttributeValue | undefined };
  UpdateExpression: string;
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface TransactWriteItem {
  ConditionCheck?: ConditionCheck;
  Put?: Put;
  Delete?: Delete;
  Update?: Update;
}
export type TransactWriteItemList = TransactWriteItem[];
export interface TransactWriteItemsInput {
  TransactItems: TransactWriteItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ClientRequestToken?: string;
}
export interface TransactWriteItemsOutput {
  ConsumedCapacity?: ConsumedCapacity[];
  ItemCollectionMetrics?: {
    [key: string]: ItemCollectionMetrics[] | undefined;
  };
}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface PointInTimeRecoverySpecification {
  PointInTimeRecoveryEnabled: boolean;
  RecoveryPeriodInDays?: number;
}
export interface UpdateContinuousBackupsInput {
  TableName: string;
  PointInTimeRecoverySpecification: PointInTimeRecoverySpecification;
}
export interface UpdateContinuousBackupsOutput {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
}
export type ContributorInsightsAction = "ENABLE" | "DISABLE" | (string & {});
export interface UpdateContributorInsightsInput {
  TableName: string;
  IndexName?: string;
  ContributorInsightsAction: ContributorInsightsAction;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export interface UpdateContributorInsightsOutput {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export interface CreateReplicaAction {
  RegionName: string;
}
export interface DeleteReplicaAction {
  RegionName: string;
}
export interface ReplicaUpdate {
  Create?: CreateReplicaAction;
  Delete?: DeleteReplicaAction;
}
export type ReplicaUpdateList = ReplicaUpdate[];
export interface UpdateGlobalTableInput {
  GlobalTableName: string;
  ReplicaUpdates: ReplicaUpdate[];
}
export interface UpdateGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export type AutoScalingRoleArn = string;
export interface AutoScalingTargetTrackingScalingPolicyConfigurationUpdate {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
}
export interface AutoScalingPolicyUpdate {
  PolicyName?: string;
  TargetTrackingScalingPolicyConfiguration: AutoScalingTargetTrackingScalingPolicyConfigurationUpdate;
}
export interface AutoScalingSettingsUpdate {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicyUpdate?: AutoScalingPolicyUpdate;
}
export interface GlobalTableGlobalSecondaryIndexSettingsUpdate {
  IndexName: string;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
}
export type GlobalTableGlobalSecondaryIndexSettingsUpdateList =
  GlobalTableGlobalSecondaryIndexSettingsUpdate[];
export interface ReplicaGlobalSecondaryIndexSettingsUpdate {
  IndexName: string;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
}
export type ReplicaGlobalSecondaryIndexSettingsUpdateList =
  ReplicaGlobalSecondaryIndexSettingsUpdate[];
export interface ReplicaSettingsUpdate {
  RegionName: string;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  ReplicaGlobalSecondaryIndexSettingsUpdate?: ReplicaGlobalSecondaryIndexSettingsUpdate[];
  ReplicaTableClass?: TableClass;
}
export type ReplicaSettingsUpdateList = ReplicaSettingsUpdate[];
export interface UpdateGlobalTableSettingsInput {
  GlobalTableName: string;
  GlobalTableBillingMode?: BillingMode;
  GlobalTableProvisionedWriteCapacityUnits?: number;
  GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  GlobalTableGlobalSecondaryIndexSettingsUpdate?: GlobalTableGlobalSecondaryIndexSettingsUpdate[];
  ReplicaSettingsUpdate?: ReplicaSettingsUpdate[];
}
export interface UpdateGlobalTableSettingsOutput {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
}
export type AttributeAction = "ADD" | "PUT" | "DELETE" | (string & {});
export interface AttributeValueUpdate {
  Value?: AttributeValue;
  Action?: AttributeAction;
}
export type AttributeUpdates = {
  [key: string]: AttributeValueUpdate | undefined;
};
export interface UpdateItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  AttributeUpdates?: { [key: string]: AttributeValueUpdate | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ConditionalOperator?: ConditionalOperator;
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  UpdateExpression?: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export interface UpdateItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export interface UpdateKinesisStreamingConfiguration {
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export interface UpdateKinesisStreamingDestinationInput {
  TableName: string;
  StreamArn: string;
  UpdateKinesisStreamingConfiguration?: UpdateKinesisStreamingConfiguration;
}
export interface UpdateKinesisStreamingDestinationOutput {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  UpdateKinesisStreamingConfiguration?: UpdateKinesisStreamingConfiguration;
}
export interface UpdateGlobalSecondaryIndexAction {
  IndexName: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export interface CreateGlobalSecondaryIndexAction {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export interface DeleteGlobalSecondaryIndexAction {
  IndexName: string;
}
export interface GlobalSecondaryIndexUpdate {
  Update?: UpdateGlobalSecondaryIndexAction;
  Create?: CreateGlobalSecondaryIndexAction;
  Delete?: DeleteGlobalSecondaryIndexAction;
}
export type GlobalSecondaryIndexUpdateList = GlobalSecondaryIndexUpdate[];
export interface ReplicaGlobalSecondaryIndex {
  IndexName: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
}
export type ReplicaGlobalSecondaryIndexList = ReplicaGlobalSecondaryIndex[];
export interface CreateReplicationGroupMemberAction {
  RegionName: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndex[];
  TableClassOverride?: TableClass;
}
export interface UpdateReplicationGroupMemberAction {
  RegionName: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndex[];
  TableClassOverride?: TableClass;
}
export interface DeleteReplicationGroupMemberAction {
  RegionName: string;
}
export interface ReplicationGroupUpdate {
  Create?: CreateReplicationGroupMemberAction;
  Update?: UpdateReplicationGroupMemberAction;
  Delete?: DeleteReplicationGroupMemberAction;
}
export type ReplicationGroupUpdateList = ReplicationGroupUpdate[];
export interface CreateGlobalTableWitnessGroupMemberAction {
  RegionName: string;
}
export interface DeleteGlobalTableWitnessGroupMemberAction {
  RegionName: string;
}
export interface GlobalTableWitnessGroupUpdate {
  Create?: CreateGlobalTableWitnessGroupMemberAction;
  Delete?: DeleteGlobalTableWitnessGroupMemberAction;
}
export type GlobalTableWitnessGroupUpdateList = GlobalTableWitnessGroupUpdate[];
export interface CreateVectorIndexAction {
  IndexName: string;
  VectorAttribute: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection: Projection;
  Dimensions: number;
  DistanceFunction: VectorDistanceFunction;
}
export interface DeleteVectorIndexAction {
  IndexName: string;
}
export interface VectorIndexUpdate {
  Create?: CreateVectorIndexAction;
  Delete?: DeleteVectorIndexAction;
}
export type VectorIndexUpdateList = VectorIndexUpdate[];
export interface UpdateTableInput {
  AttributeDefinitions?: AttributeDefinition[];
  TableName: string;
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexUpdate[];
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  ReplicaUpdates?: ReplicationGroupUpdate[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
  MultiRegionConsistency?: MultiRegionConsistency;
  GlobalTableWitnessUpdates?: GlobalTableWitnessGroupUpdate[];
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  VectorIndexUpdates?: VectorIndexUpdate[];
}
export interface UpdateTableOutput {
  TableDescription?: TableDescription;
}
export interface GlobalSecondaryIndexAutoScalingUpdate {
  IndexName?: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export type GlobalSecondaryIndexAutoScalingUpdateList =
  GlobalSecondaryIndexAutoScalingUpdate[];
export interface ReplicaGlobalSecondaryIndexAutoScalingUpdate {
  IndexName?: string;
  ProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export type ReplicaGlobalSecondaryIndexAutoScalingUpdateList =
  ReplicaGlobalSecondaryIndexAutoScalingUpdate[];
export interface ReplicaAutoScalingUpdate {
  RegionName: string;
  ReplicaGlobalSecondaryIndexUpdates?: ReplicaGlobalSecondaryIndexAutoScalingUpdate[];
  ReplicaProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export type ReplicaAutoScalingUpdateList = ReplicaAutoScalingUpdate[];
export interface UpdateTableReplicaAutoScalingInput {
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexAutoScalingUpdate[];
  TableName: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
  ReplicaUpdates?: ReplicaAutoScalingUpdate[];
}
export interface UpdateTableReplicaAutoScalingOutput {
  TableAutoScalingDescription?: TableAutoScalingDescription;
}
export type TimeToLiveEnabled = boolean;
export interface TimeToLiveSpecification {
  Enabled: boolean;
  AttributeName: string;
}
export interface UpdateTimeToLiveInput {
  TableName: string;
  TimeToLiveSpecification: TimeToLiveSpecification;
}
export interface UpdateTimeToLiveOutput {
  TimeToLiveSpecification?: TimeToLiveSpecification;
}
export type ErrorMessage = string;
export type Reason = string;
export type Resource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export type ThrottlingReasonList = ThrottlingReason[];
export type AvailabilityErrorMessage = string;
export type Code = string;
export interface CancellationReason {
  Item?: { [key: string]: AttributeValue | undefined };
  Code?: string;
  Message?: string;
}
export type CancellationReasonList = CancellationReason[];
export type BatchExecuteStatementError =
  | InternalServerError
  | RequestLimitExceeded
  | ThrottlingException
  | CommonErrors;
/**
 * This operation allows you to perform batch reads or writes on data stored in DynamoDB,
 * using PartiQL. Each read statement in a `BatchExecuteStatement` must specify
 * an equality condition on all key attributes. This enforces that each `SELECT`
 * statement in a batch returns at most a single item. For more information, see Running batch operations with PartiQL for DynamoDB .
 *
 * The entire batch must consist of either read statements or write statements, you
 * cannot mix both in one batch.
 *
 * A HTTP 200 response does not mean that all statements in the BatchExecuteStatement
 * succeeded. Error details for individual statements can be found under the Error field of the `BatchStatementResponse` for each
 * statement.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Statements: D.list({
        Statement: 0,
        Parameters: D.list(i_AttributeValue),
        ConsistentRead: 0,
        ReturnValuesOnConditionCheckFailure: 0,
      }),
      ReturnConsumedCapacity: 0,
    },
    output: {
      Responses: D.list({
        Error: { Item: D.map(o_AttributeValue) },
        Item: D.map(o_AttributeValue),
      }),
    },
  },
  errors: [InternalServerError, RequestLimitExceeded, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
})) as any;

export type BatchGetItemError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `BatchGetItem` operation returns the attributes of one or more items
 * from one or more tables. You identify requested items by primary key.
 *
 * A single operation can retrieve up to 16 MB of data, which can contain as many as 100
 * items. `BatchGetItem` returns a partial result if the response size limit is
 * exceeded, the table's provisioned throughput is exceeded, more than 1MB per partition is
 * requested, or an internal processing failure occurs. If a partial result is returned,
 * the operation returns a value for `UnprocessedKeys`. You can use this value
 * to retry the operation starting with the next item to get.
 *
 * If you request more than 100 items, `BatchGetItem` returns a
 * `ValidationException` with the message "Too many items requested for
 * the BatchGetItem call."
 *
 * For example, if you ask to retrieve 100 items, but each individual item is 300 KB in
 * size, the system returns 52 items (so as not to exceed the 16 MB limit). It also returns
 * an appropriate `UnprocessedKeys` value so you can get the next page of
 * results. If desired, your application can include its own logic to assemble the pages of
 * results into one dataset.
 *
 * If *none* of the items can be processed due to insufficient
 * provisioned throughput on all of the tables in the request, then
 * `BatchGetItem` returns a
 * `ProvisionedThroughputExceededException`. If at least
 * one of the items is successfully processed, then
 * `BatchGetItem` completes successfully, while returning the keys of the
 * unread items in `UnprocessedKeys`.
 *
 * If DynamoDB returns any unprocessed items, you should retry the batch operation on
 * those items. However, we strongly recommend that you use an exponential
 * backoff algorithm. If you retry the batch operation immediately, the
 * underlying read or write requests can still fail due to throttling on the individual
 * tables. If you delay the batch operation using exponential backoff, the individual
 * requests in the batch are much more likely to succeed.
 *
 * For more information, see Batch Operations and Error Handling in the Amazon DynamoDB
 * Developer Guide.
 *
 * By default, `BatchGetItem` performs eventually consistent reads on every
 * table in the request. If you want strongly consistent reads instead, you can set
 * `ConsistentRead` to `true` for any or all tables.
 *
 * In order to minimize response latency, `BatchGetItem` may retrieve items in
 * parallel.
 *
 * When designing your application, keep in mind that DynamoDB does not return items in
 * any particular order. To help parse the response by item, include the primary key values
 * for the items in your request in the `ProjectionExpression` parameter.
 *
 * If a requested item does not exist, it is not returned in the result. Requests for
 * nonexistent items consume the minimum read capacity units according to the type of read.
 * For more information, see Working with Tables in the Amazon DynamoDB Developer
 * Guide.
 *
 * `BatchGetItem` will result in a `ValidationException` if the
 * same key is specified multiple times.
 */
export const batchGetItem: API.OperationMethod<
  BatchGetItemInput,
  BatchGetItemOutput,
  BatchGetItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RequestItems: D.map({
        Keys: D.list(D.map(i_AttributeValue)),
        AttributesToGet: 0,
        ConsistentRead: 0,
        ProjectionExpression: 0,
        ExpressionAttributeNames: 0,
      }),
      ReturnConsumedCapacity: 0,
    },
    output: {
      Responses: D.map(D.list(D.map(o_AttributeValue))),
      UnprocessedKeys: D.map({ Keys: D.list(D.map(o_AttributeValue)) }),
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetItem",
})) as any;

export type BatchWriteItemError =
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `BatchWriteItem` operation puts or deletes multiple items in one or
 * more tables. A single call to `BatchWriteItem` can transmit up to 16MB of
 * data over the network, consisting of up to 25 item put or delete operations. While
 * individual items can be up to 400 KB once stored, it's important to note that an item's
 * representation might be greater than 400KB while being sent in DynamoDB's JSON format
 * for the API call. For more details on this distinction, see Naming Rules and Data Types.
 *
 * `BatchWriteItem` cannot update items. If you perform a
 * `BatchWriteItem` operation on an existing item, that item's values
 * will be overwritten by the operation and it will appear like it was updated. To
 * update items, we recommend you use the `UpdateItem` action.
 *
 * The individual `PutItem` and `DeleteItem` operations specified
 * in `BatchWriteItem` are atomic; however `BatchWriteItem` as a
 * whole is not. If any requested operations fail because the table's provisioned
 * throughput is exceeded or an internal processing failure occurs, the failed operations
 * are returned in the `UnprocessedItems` response parameter. You can
 * investigate and optionally resend the requests. Typically, you would call
 * `BatchWriteItem` in a loop. Each iteration would check for unprocessed
 * items and submit a new `BatchWriteItem` request with those unprocessed items
 * until all items have been processed.
 *
 * If `BatchWriteItem` cannot process any items due to throttling (for
 * example, insufficient provisioned throughput on the tables in the request, or
 * partition-level or account-level limits), it returns a
 * `ProvisionedThroughputExceededException` or a
 * `ThrottlingException`. Both indicate that the request was throttled;
 * check the `ThrottlingReason` field in the returned exception for details.
 *
 * If DynamoDB returns any unprocessed items, you should retry the batch operation on
 * those items. However, we strongly recommend that you use an exponential
 * backoff algorithm. If you retry the batch operation immediately, the
 * underlying read or write requests can still fail due to throttling on the individual
 * tables. If you delay the batch operation using exponential backoff, the individual
 * requests in the batch are much more likely to succeed.
 *
 * For more information, see Batch Operations and Error Handling in the Amazon DynamoDB
 * Developer Guide.
 *
 * With `BatchWriteItem`, you can efficiently write or delete large amounts of
 * data, such as from Amazon EMR, or copy data from another database into DynamoDB. In
 * order to improve performance with these large-scale operations,
 * `BatchWriteItem` does not behave in the same way as individual
 * `PutItem` and `DeleteItem` calls would. For example, you
 * cannot specify conditions on individual put and delete requests, and
 * `BatchWriteItem` does not return deleted items in the response.
 *
 * If you use a programming language that supports concurrency, you can use threads to
 * write items in parallel. Your application must include the necessary logic to manage the
 * threads. With languages that don't support threading, you must update or delete the
 * specified items one at a time. In both situations, `BatchWriteItem` performs
 * the specified put and delete operations in parallel, giving you the power of the thread
 * pool approach without having to introduce complexity into your application.
 *
 * Parallel processing reduces latency, but each specified put and delete request
 * consumes the same number of write capacity units whether it is processed in parallel or
 * not. Delete operations on nonexistent items consume one write capacity unit.
 *
 * If one or more of the following is true, DynamoDB rejects the entire batch write
 * operation:
 *
 * - One or more tables specified in the `BatchWriteItem` request does
 * not exist.
 *
 * - Primary key attributes specified on an item in the request do not match those
 * in the corresponding table's primary key schema.
 *
 * - You try to perform multiple operations on the same item in the same
 * `BatchWriteItem` request. For example, you cannot put and delete
 * the same item in the same `BatchWriteItem` request.
 *
 * - Your request contains at least two items with identical hash and range keys
 * (which essentially is two put operations).
 *
 * - There are more than 25 requests in the batch.
 *
 * - Any individual item in a batch exceeds 400 KB.
 *
 * - The total request size exceeds 16 MB.
 *
 * - Any individual items with keys exceeding the key length limits. For a
 * partition key, the limit is 2048 bytes and for a sort key, the limit is 1024
 * bytes.
 */
export const batchWriteItem: API.OperationMethod<
  BatchWriteItemInput,
  BatchWriteItemOutput,
  BatchWriteItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RequestItems: D.map(
        D.list({
          PutRequest: { Item: D.map(i_AttributeValue) },
          DeleteRequest: { Key: D.map(i_AttributeValue) },
        }),
      ),
      ReturnConsumedCapacity: 0,
      ReturnItemCollectionMetrics: 0,
    },
    output: {
      UnprocessedItems: D.map(
        D.list({
          PutRequest: { Item: D.map(o_AttributeValue) },
          DeleteRequest: { Key: D.map(o_AttributeValue) },
        }),
      ),
      ItemCollectionMetrics: D.map(D.list(o_ItemCollectionMetrics)),
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchWriteItem",
})) as any;

export type CreateBackupError =
  | BackupInUseException
  | ContinuousBackupsUnavailableException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableInUseException
  | TableNotFoundException
  | CommonErrors;
/**
 * Creates a backup for an existing table.
 *
 * Each time you create an on-demand backup, the entire table data is backed up. There
 * is no limit to the number of on-demand backups that can be taken.
 *
 * When you create an on-demand backup, a time marker of the request is cataloged, and
 * the backup is created asynchronously, by applying all changes until the time of the
 * request to the last full table snapshot. Backup requests are processed instantaneously
 * and become available for restore within minutes.
 *
 * You can call `CreateBackup` at a maximum rate of 50 times per
 * second.
 *
 * All backups in DynamoDB work without consuming any provisioned throughput on the
 * table.
 *
 * If you submit a backup request on 2018-12-14 at 14:25:00, the backup is guaranteed to
 * contain all data committed to the table up to 14:24:00, and data committed after
 * 14:26:00 will not be. The backup might contain data modifications made between 14:24:00
 * and 14:26:00. On-demand backup does not support causal consistency.
 *
 * Along with data, the following are also included on the backups:
 *
 * - Global secondary indexes (GSIs)
 *
 * - Local secondary indexes (LSIs)
 *
 * - Streams
 *
 * - Provisioned read and write capacity
 */
export const createBackup: API.OperationMethod<
  CreateBackupInput,
  CreateBackupOutput,
  CreateBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }), BackupName: 0 },
    output: { BackupDetails: o_BackupDetails },
  },
  errors: [
    BackupInUseException,
    ContinuousBackupsUnavailableException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableInUseException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackup",
})) as any;

export type CreateGlobalTableError =
  | GlobalTableAlreadyExistsException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableNotFoundException
  | CommonErrors;
/**
 * Creates a global table from an existing table. A global table creates a replication
 * relationship between two or more DynamoDB tables with the same table name in the
 * provided Regions.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 *
 * If you want to add a new replica table to a global table, each of the following
 * conditions must be true:
 *
 * - The table must have the same primary key as all of the other replicas.
 *
 * - The table must have the same name as all of the other replicas.
 *
 * - The table must have DynamoDB Streams enabled, with the stream containing both
 * the new and the old images of the item.
 *
 * - None of the replica tables in the global table can contain any data.
 *
 * If global secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The global secondary indexes must have the same name.
 *
 * - The global secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * If local secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The local secondary indexes must have the same name.
 *
 * - The local secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * Write capacity settings should be set consistently across your replica tables and
 * secondary indexes. DynamoDB strongly recommends enabling auto scaling to manage the
 * write capacity settings for all of your global tables replicas and indexes.
 *
 * If you prefer to manage write capacity settings manually, you should provision
 * equal replicated write capacity units to your replica tables. You should also
 * provision equal replicated write capacity units to matching secondary indexes across
 * your global table.
 */
export const createGlobalTable: API.OperationMethod<
  CreateGlobalTableInput,
  CreateGlobalTableOutput,
  CreateGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalTableName: D.m({ context: "ResourceArn" }),
      ReplicationGroup: D.list({ RegionName: 0 }),
    },
    output: { GlobalTableDescription: o_GlobalTableDescription },
  },
  errors: [
    GlobalTableAlreadyExistsException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalTable",
})) as any;

export type CreateTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * The `CreateTable` operation adds a new table to your account. In an Amazon Web Services account, table names must be unique within each Region. That is, you can
 * have two tables with same name if you create the tables in different Regions.
 *
 * `CreateTable` is an asynchronous operation. Upon receiving a
 * `CreateTable` request, DynamoDB immediately returns a response with a
 * `TableStatus` of `CREATING`. After the table is created,
 * DynamoDB sets the `TableStatus` to `ACTIVE`. You can perform read
 * and write operations only on an `ACTIVE` table.
 *
 * You can optionally define secondary indexes on the new table, as part of the
 * `CreateTable` operation. If you want to create multiple tables with
 * secondary indexes on them, you must create the tables sequentially. Only one table with
 * secondary indexes can be in the `CREATING` state at any given time.
 *
 * You can use the `DescribeTable` action to check the table status.
 */
export const createTable: API.OperationMethod<
  CreateTableInput,
  CreateTableOutput,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AttributeDefinitions: D.list(i_AttributeDefinition),
      TableName: D.m({ context: "ResourceArn" }),
      KeySchema: D.list(i_KeySchemaElement),
      LocalSecondaryIndexes: D.list(i_LocalSecondaryIndex),
      GlobalSecondaryIndexes: D.list(i_GlobalSecondaryIndex),
      BillingMode: 0,
      ProvisionedThroughput: i_ProvisionedThroughput,
      StreamSpecification: i_StreamSpecification,
      SSESpecification: i_SSESpecification,
      Tags: D.list(i_Tag),
      TableClass: 0,
      DeletionProtectionEnabled: 0,
      WarmThroughput: i_WarmThroughput,
      ResourcePolicy: 0,
      OnDemandThroughput: i_OnDemandThroughput,
      GlobalTableSourceArn: 0,
      GlobalTableSettingsReplicationMode: 0,
      VectorIndexes: D.list(i_VectorIndex),
    },
    output: { TableDescription: o_TableDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
})) as any;

export type DeleteBackupError =
  | BackupInUseException
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes an existing backup of a table.
 *
 * You can call `DeleteBackup` at a maximum rate of 10 times per
 * second.
 */
export const deleteBackup: API.OperationMethod<
  DeleteBackupInput,
  DeleteBackupOutput,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BackupArn: D.m({ context: "ResourceArn" }) },
    output: { BackupDescription: o_BackupDescription },
  },
  errors: [
    BackupInUseException,
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
})) as any;

export type DeleteItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Deletes a single item in a table by primary key. You can perform a conditional delete
 * operation that deletes the item if it exists, or if it has an expected attribute
 * value.
 *
 * In addition to deleting an item, you can also return the item's attribute values in
 * the same operation, using the `ReturnValues` parameter.
 *
 * Unless you specify conditions, the `DeleteItem` is an idempotent operation;
 * running it multiple times on the same item or attribute does *not*
 * result in an error response.
 *
 * Conditional deletes are useful for deleting items only if specific conditions are met.
 * If those conditions are met, DynamoDB performs the delete. Otherwise, the item is not
 * deleted.
 */
export const deleteItem: API.OperationMethod<
  DeleteItemInput,
  DeleteItemOutput,
  DeleteItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      Key: D.map(i_AttributeValue),
      Expected: D.map(i_ExpectedAttributeValue),
      ConditionalOperator: 0,
      ReturnValues: 0,
      ReturnConsumedCapacity: 0,
      ReturnItemCollectionMetrics: 0,
      ConditionExpression: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
      ReturnValuesOnConditionCheckFailure: 0,
    },
    output: {
      Attributes: D.map(o_AttributeValue),
      ItemCollectionMetrics: o_ItemCollectionMetrics,
    },
  },
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteItem",
})) as any;

export type DeleteResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | PolicyNotFoundException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to the resource, which can be a table or
 * stream.
 *
 * `DeleteResourcePolicy` is an idempotent operation; running it multiple
 * times on the same resource *doesn't* result in an error response,
 * unless you specify an `ExpectedRevisionId`, which will then return a
 * `PolicyNotFoundException`.
 *
 * To make sure that you don't inadvertently lock yourself out of your own resources,
 * the root principal in your Amazon Web Services account can perform
 * `DeleteResourcePolicy` requests, even if your resource-based policy
 * explicitly denies the root principal's access.
 *
 * `DeleteResourcePolicy` is an asynchronous operation. If you issue a
 * `GetResourcePolicy` request immediately after running the
 * `DeleteResourcePolicy` request, DynamoDB might still return
 * the deleted policy. This is because the policy for your resource might not have been
 * deleted yet. Wait for a few seconds, and then try the `GetResourcePolicy`
 * request again.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: D.m({ context: "ResourceArn" }),
      ExpectedRevisionId: 0,
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    PolicyNotFoundException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The `DeleteTable` operation deletes a table and all of its items. After a
 * `DeleteTable` request, the specified table is in the
 * `DELETING` state until DynamoDB completes the deletion. If the table is
 * in the `ACTIVE` state, you can delete it. If a table is in
 * `CREATING` or `UPDATING` states, then DynamoDB returns a
 * `ResourceInUseException`. If the specified table does not exist, DynamoDB
 * returns a `ResourceNotFoundException`. If table is already in the
 * `DELETING` state, no error is returned.
 *
 * DynamoDB might continue to accept data read and write operations, such as
 * `GetItem` and `PutItem`, on a table in the
 * `DELETING` state until the table deletion is complete. For the full
 * list of table states, see TableStatus.
 *
 * When you delete a table, any indexes on that table are also deleted.
 *
 * If you have DynamoDB Streams enabled on the table, then the corresponding stream on
 * that table goes into the `DISABLED` state, and the stream is automatically
 * deleted after 24 hours.
 *
 * Use the `DescribeTable` action to check the status of the table.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableInput,
  DeleteTableOutput,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
    output: { TableDescription: o_TableDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
})) as any;

export type DescribeBackupError =
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Describes an existing backup of a table.
 *
 * You can call `DescribeBackup` at a maximum rate of 10 times per
 * second.
 */
export const describeBackup: API.OperationMethod<
  DescribeBackupInput,
  DescribeBackupOutput,
  DescribeBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BackupArn: D.m({ context: "ResourceArn" }) },
    output: { BackupDescription: o_BackupDescription },
  },
  errors: [
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackup",
})) as any;

export type DescribeContinuousBackupsError =
  | InternalServerError
  | InvalidEndpointException
  | TableNotFoundException
  | CommonErrors;
/**
 * Checks the status of continuous backups and point in time recovery on the specified
 * table. Continuous backups are `ENABLED` on all tables at table creation. If
 * point in time recovery is enabled, `PointInTimeRecoveryStatus` will be set to
 * ENABLED.
 *
 * After continuous backups and point in time recovery are enabled, you can restore to
 * any point in time within `EarliestRestorableDateTime` and
 * `LatestRestorableDateTime`.
 *
 * `LatestRestorableDateTime` is typically 5 minutes before the current time.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * recovery period to any value between 1 and 35 days.
 *
 * You can call `DescribeContinuousBackups` at a maximum rate of 10 times per
 * second.
 */
export const describeContinuousBackups: API.OperationMethod<
  DescribeContinuousBackupsInput,
  DescribeContinuousBackupsOutput,
  DescribeContinuousBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
    output: { ContinuousBackupsDescription: o_ContinuousBackupsDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContinuousBackups",
})) as any;

export type DescribeContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about contributor insights for a given table or global secondary
 * index.
 */
export const describeContributorInsights: API.OperationMethod<
  DescribeContributorInsightsInput,
  DescribeContributorInsightsOutput,
  DescribeContributorInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }), IndexName: 0 },
    output: { LastUpdateDateTime: D.ts },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContributorInsights",
})) as any;

export type DescribeEndpointsError = CommonErrors;
/**
 * Returns the regional endpoint information. For more information on policy permissions,
 * please see Internetwork traffic privacy.
 */
export const describeEndpoints: API.OperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
})) as any;

export type DescribeExportError =
  | ExportNotFoundException
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Describes an existing table export.
 */
export const describeExport: API.OperationMethod<
  DescribeExportInput,
  DescribeExportOutput,
  DescribeExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExportArn: D.m({ context: "ResourceArn" }) },
    output: { ExportDescription: o_ExportDescription },
  },
  errors: [
    ExportNotFoundException,
    InternalServerError,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExport",
})) as any;

export type DescribeGlobalTableError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns information about the specified global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const describeGlobalTable: API.OperationMethod<
  DescribeGlobalTableInput,
  DescribeGlobalTableOutput,
  DescribeGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GlobalTableName: D.m({ context: "ResourceArn" }) },
    output: { GlobalTableDescription: o_GlobalTableDescription },
  },
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalTable",
})) as any;

export type DescribeGlobalTableSettingsError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Describes Region-specific settings for a global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const describeGlobalTableSettings: API.OperationMethod<
  DescribeGlobalTableSettingsInput,
  DescribeGlobalTableSettingsOutput,
  DescribeGlobalTableSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GlobalTableName: D.m({ context: "ResourceArn" }) },
    output: { ReplicaSettings: D.list(o_ReplicaSettingsDescription) },
  },
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalTableSettings",
})) as any;

export type DescribeImportError = ImportNotFoundException | CommonErrors;
/**
 * Represents the properties of the import.
 */
export const describeImport: API.OperationMethod<
  DescribeImportInput,
  DescribeImportOutput,
  DescribeImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImportArn: D.m({ context: "ResourceArn" }) },
    output: { ImportTableDescription: o_ImportTableDescription },
  },
  errors: [ImportNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImport",
})) as any;

export type DescribeKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the status of Kinesis streaming.
 */
export const describeKinesisStreamingDestination: API.OperationMethod<
  DescribeKinesisStreamingDestinationInput,
  DescribeKinesisStreamingDestinationOutput,
  DescribeKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKinesisStreamingDestination",
})) as any;

export type DescribeLimitsError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns the current provisioned-capacity quotas for your Amazon Web Services account in
 * a Region, both for the Region as a whole and for any one DynamoDB table that you create
 * there.
 *
 * When you establish an Amazon Web Services account, the account has initial quotas on
 * the maximum read capacity units and write capacity units that you can provision across
 * all of your DynamoDB tables in a given Region. Also, there are per-table
 * quotas that apply when you create a table there. For more information, see Service,
 * Account, and Table Quotas page in the Amazon DynamoDB
 * Developer Guide.
 *
 * Although you can increase these quotas by filing a case at Amazon Web Services Support Center, obtaining the
 * increase is not instantaneous. The `DescribeLimits` action lets you write
 * code to compare the capacity you are currently using to those quotas imposed by your
 * account so that you have enough time to apply for an increase before you hit a
 * quota.
 *
 * For example, you could use one of the Amazon Web Services SDKs to do the
 * following:
 *
 * - Call `DescribeLimits` for a particular Region to obtain your
 * current account quotas on provisioned capacity there.
 *
 * - Create a variable to hold the aggregate read capacity units provisioned for
 * all your tables in that Region, and one to hold the aggregate write capacity
 * units. Zero them both.
 *
 * - Call `ListTables` to obtain a list of all your DynamoDB
 * tables.
 *
 * - For each table name listed by `ListTables`, do the
 * following:
 *
 * - Call `DescribeTable` with the table name.
 *
 * - Use the data returned by `DescribeTable` to add the read
 * capacity units and write capacity units provisioned for the table itself
 * to your variables.
 *
 * - If the table has one or more global secondary indexes (GSIs), loop
 * over these GSIs and add their provisioned capacity values to your
 * variables as well.
 *
 * - Report the account quotas for that Region returned by
 * `DescribeLimits`, along with the total current provisioned
 * capacity levels you have calculated.
 *
 * This will let you see whether you are getting close to your account-level
 * quotas.
 *
 * The per-table quotas apply only when you are creating a new table. They restrict the
 * sum of the provisioned capacity of the new table itself and all its global secondary
 * indexes.
 *
 * For existing tables and their GSIs, DynamoDB doesn't let you increase provisioned
 * capacity extremely rapidly, but the only quota that applies is that the aggregate
 * provisioned capacity over all your tables and GSIs cannot exceed either of the
 * per-account quotas.
 *
 * `DescribeLimits` should only be called periodically. You can expect
 * throttling errors if you call it more than once in a minute.
 *
 * The `DescribeLimits` Request element has no content.
 */
export const describeLimits: API.OperationMethod<
  DescribeLimitsInput,
  DescribeLimitsOutput,
  DescribeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLimits",
})) as any;

export type DescribeTableError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the table, including the current status of the table, when
 * it was created, the primary key schema, and any indexes on the table.
 *
 * If you issue a `DescribeTable` request immediately after a
 * `CreateTable` request, DynamoDB might return a
 * `ResourceNotFoundException`. This is because
 * `DescribeTable` uses an eventually consistent query, and the metadata
 * for your table might not be available at that moment. Wait for a few seconds, and
 * then try the `DescribeTable` request again.
 */
export const describeTable: API.OperationMethod<
  DescribeTableInput,
  DescribeTableOutput,
  DescribeTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
    output: { Table: o_TableDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTable",
})) as any;

export type DescribeTableReplicaAutoScalingError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes auto scaling settings across replicas of the global table at once.
 */
export const describeTableReplicaAutoScaling: API.OperationMethod<
  DescribeTableReplicaAutoScalingInput,
  DescribeTableReplicaAutoScalingOutput,
  DescribeTableReplicaAutoScalingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableReplicaAutoScaling",
})) as any;

export type DescribeTimeToLiveError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gives a description of the Time to Live (TTL) status on the specified table.
 */
export const describeTimeToLive: API.OperationMethod<
  DescribeTimeToLiveInput,
  DescribeTimeToLiveOutput,
  DescribeTimeToLiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: D.m({ context: "ResourceArn" }) },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTimeToLive",
})) as any;

export type DisableKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops replication from the DynamoDB table to the Kinesis data stream. This
 * is done without deleting either of the resources.
 */
export const disableKinesisStreamingDestination: API.OperationMethod<
  KinesisStreamingDestinationInput,
  KinesisStreamingDestinationOutput,
  DisableKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      StreamArn: 0,
      EnableKinesisStreamingConfiguration:
        i_EnableKinesisStreamingConfiguration,
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableKinesisStreamingDestination",
})) as any;

export type EnableKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts table data replication to the specified Kinesis data stream at a timestamp
 * chosen during the enable workflow. If this operation doesn't return results immediately,
 * use DescribeKinesisStreamingDestination to check if streaming to the Kinesis data stream
 * is ACTIVE.
 */
export const enableKinesisStreamingDestination: API.OperationMethod<
  KinesisStreamingDestinationInput,
  KinesisStreamingDestinationOutput,
  EnableKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      StreamArn: 0,
      EnableKinesisStreamingConfiguration:
        i_EnableKinesisStreamingConfiguration,
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableKinesisStreamingDestination",
})) as any;

export type ExecuteStatementError =
  | ConditionalCheckFailedException
  | DuplicateItemException
  | InternalServerError
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * This operation allows you to perform reads and singleton writes on data stored in
 * DynamoDB, using PartiQL.
 *
 * For PartiQL reads (`SELECT` statement), if the total number of processed
 * items exceeds the maximum dataset size limit of 1 MB, the read stops and results are
 * returned to the user as a `LastEvaluatedKey` value to continue the read in a
 * subsequent operation. If the filter criteria in `WHERE` clause does not match
 * any data, the read will return an empty result set.
 *
 * A single `SELECT` statement response can return up to the maximum number of
 * items (if using the Limit parameter) or a maximum of 1 MB of data (and then apply any
 * filtering to the results using `WHERE` clause). If
 * `LastEvaluatedKey` is present in the response, you need to paginate the
 * result set. If `NextToken` is present, you need to paginate the result set
 * and include `NextToken`.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementInput,
  ExecuteStatementOutput,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Statement: 0,
      Parameters: D.list(i_AttributeValue),
      ConsistentRead: 0,
      NextToken: 0,
      ReturnConsumedCapacity: 0,
      Limit: 0,
      ReturnValuesOnConditionCheckFailure: 0,
    },
    output: {
      Items: D.list(D.map(o_AttributeValue)),
      LastEvaluatedKey: D.map(o_AttributeValue),
    },
  },
  errors: [
    ConditionalCheckFailedException,
    DuplicateItemException,
    InternalServerError,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
})) as any;

export type ExecuteTransactionError =
  | IdempotentParameterMismatchException
  | InternalServerError
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | TransactionInProgressException
  | CommonErrors;
/**
 * This operation allows you to perform transactional reads or writes on data stored in
 * DynamoDB, using PartiQL.
 *
 * The entire transaction must consist of either read statements or write statements,
 * you cannot mix both in one transaction. The EXISTS function is an exception and can
 * be used to check the condition of specific attributes of the item in a similar
 * manner to `ConditionCheck` in the TransactWriteItems API.
 */
export const executeTransaction: API.OperationMethod<
  ExecuteTransactionInput,
  ExecuteTransactionOutput,
  ExecuteTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TransactStatements: D.list({
        Statement: 0,
        Parameters: D.list(i_AttributeValue),
        ReturnValuesOnConditionCheckFailure: 0,
      }),
      ClientRequestToken: D.m({ idempotency: true }),
      ReturnConsumedCapacity: 0,
    },
    output: { Responses: D.list(o_ItemResponse) },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerError,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteTransaction",
})) as any;

export type ExportTableToPointInTimeError =
  | ExportConflictException
  | InternalServerError
  | InvalidExportTimeException
  | LimitExceededException
  | PointInTimeRecoveryUnavailableException
  | TableNotFoundException
  | CommonErrors;
/**
 * Exports table data to an S3 bucket. The table must have point in time recovery
 * enabled, and you can export data from any time within the point in time recovery
 * window.
 */
export const exportTableToPointInTime: API.OperationMethod<
  ExportTableToPointInTimeInput,
  ExportTableToPointInTimeOutput,
  ExportTableToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableArn: D.m({ context: "ResourceArn" }),
      ExportTime: 0,
      ClientToken: D.m({ idempotency: true }),
      S3Bucket: 0,
      S3BucketOwner: 0,
      S3Prefix: 0,
      S3SseAlgorithm: 0,
      S3SseKmsKeyId: 0,
      ExportFormat: 0,
      ExportType: 0,
      IncrementalExportSpecification: {
        ExportFromTime: 0,
        ExportToTime: 0,
        ExportViewType: 0,
      },
    },
    output: { ExportDescription: o_ExportDescription },
  },
  errors: [
    ExportConflictException,
    InternalServerError,
    InvalidExportTimeException,
    LimitExceededException,
    PointInTimeRecoveryUnavailableException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportTableToPointInTime",
})) as any;

export type GetItemError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `GetItem` operation returns a set of attributes for the item with the
 * given primary key. If there is no matching item, `GetItem` does not return
 * any data and there will be no `Item` element in the response.
 *
 * `GetItem` provides an eventually consistent read by default. If your
 * application requires a strongly consistent read, set `ConsistentRead` to
 * `true`. Although a strongly consistent read might take more time than an
 * eventually consistent read, it always returns the last updated value.
 */
export const getItem: API.OperationMethod<
  GetItemInput,
  GetItemOutput,
  GetItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      Key: D.map(i_AttributeValue),
      AttributesToGet: 0,
      ConsistentRead: 0,
      ReturnConsumedCapacity: 0,
      ProjectionExpression: 0,
      ExpressionAttributeNames: 0,
    },
    output: { Item: D.map(o_AttributeValue) },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetItem",
})) as any;

export type GetResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | PolicyNotFoundException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the resource-based policy document attached to the resource, which can be a
 * table or stream, in JSON format.
 *
 * `GetResourcePolicy` follows an
 * *eventually consistent*
 * model. The following list
 * describes the outcomes when you issue the `GetResourcePolicy` request
 * immediately after issuing another request:
 *
 * - If you issue a `GetResourcePolicy` request immediately after a
 * `PutResourcePolicy` request, DynamoDB might return a
 * `PolicyNotFoundException`.
 *
 * - If you issue a `GetResourcePolicy`request immediately after a
 * `DeleteResourcePolicy` request, DynamoDB might return
 * the policy that was present before the deletion request.
 *
 * - If you issue a `GetResourcePolicy` request immediately after a
 * `CreateTable` request, which includes a resource-based policy,
 * DynamoDB might return a `ResourceNotFoundException` or
 * a `PolicyNotFoundException`.
 *
 * Because `GetResourcePolicy` uses an eventually
 * consistent query, the metadata for your policy or table might not be
 * available at that moment. Wait for a few seconds, and then retry the
 * `GetResourcePolicy` request.
 *
 * After a `GetResourcePolicy` request returns a policy created using the
 * `PutResourcePolicy` request, the policy will be applied in the
 * authorization of requests to the resource. Because this process is eventually
 * consistent, it will take some time to apply the policy to all requests to a resource.
 * Policies that you attach while creating a table using the `CreateTable`
 * request will always be applied to all requests for that table.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: D.m({ context: "ResourceArn" }) },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    PolicyNotFoundException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type ImportTableError =
  | ImportConflictException
  | LimitExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * Imports table data from an S3 bucket.
 */
export const importTable: API.OperationMethod<
  ImportTableInput,
  ImportTableOutput,
  ImportTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      S3BucketSource: { S3BucketOwner: 0, S3Bucket: 0, S3KeyPrefix: 0 },
      InputFormat: 0,
      InputFormatOptions: { Csv: { Delimiter: 0, HeaderList: 0 } },
      InputCompressionType: 0,
      TableCreationParameters: {
        TableName: 0,
        AttributeDefinitions: D.list(i_AttributeDefinition),
        KeySchema: D.list(i_KeySchemaElement),
        BillingMode: 0,
        ProvisionedThroughput: i_ProvisionedThroughput,
        OnDemandThroughput: i_OnDemandThroughput,
        SSESpecification: i_SSESpecification,
        GlobalSecondaryIndexes: D.list(i_GlobalSecondaryIndex),
        VectorIndexes: D.list(i_VectorIndex),
      },
    },
    output: { ImportTableDescription: o_ImportTableDescription },
  },
  errors: [
    ImportConflictException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportTable",
})) as any;

export type ListBackupsError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * List DynamoDB backups that are associated with an Amazon Web Services account and
 * weren't made with Amazon Web Services Backup. To list these backups for a given table,
 * specify `TableName`. `ListBackups` returns a paginated list of
 * results with at most 1 MB worth of items in a page. You can also specify a maximum
 * number of entries to be returned in a page.
 *
 * In the request, start time is inclusive, but end time is exclusive. Note that these
 * boundaries are for the time at which the original backup was requested.
 *
 * You can call `ListBackups` a maximum of five times per second.
 *
 * If you want to retrieve the complete list of backups made with Amazon Web Services
 * Backup, use the Amazon Web Services Backup
 * list API.
 */
export const listBackups: API.OperationMethod<
  ListBackupsInput,
  ListBackupsOutput,
  ListBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      Limit: 0,
      TimeRangeLowerBound: 0,
      TimeRangeUpperBound: 0,
      ExclusiveStartBackupArn: 0,
      BackupType: 0,
    },
    output: {
      BackupSummaries: D.list({
        BackupCreationDateTime: D.ts,
        BackupExpiryDateTime: D.ts,
      }),
    },
  },
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackups",
})) as any;

export type ListContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ContributorInsightsSummary for a table and all its global secondary
 * indexes.
 */
export const listContributorInsights: API.PaginatedOperationMethod<
  ListContributorInsightsInput,
  ListContributorInsightsOutput,
  ListContributorInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContributorInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Lists completed exports within the past 90 days, in reverse alphanumeric order of `ExportArn`.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsInput,
  ListExportsOutput,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TableArn: D.m({ context: "ResourceArn" }),
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [InternalServerError, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlobalTablesError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Lists all global tables that have a replica in the specified Region.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const listGlobalTables: API.OperationMethod<
  ListGlobalTablesInput,
  ListGlobalTablesOutput,
  ListGlobalTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExclusiveStartGlobalTableName: 0, Limit: 0, RegionName: 0 },
  },
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlobalTables",
})) as any;

export type ListImportsError = LimitExceededException | CommonErrors;
/**
 * Lists completed imports within the past 90 days.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsInput,
  ListImportsOutput,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TableArn: D.m({ context: "ResourceArn" }),
      PageSize: 0,
      NextToken: 0,
    },
    output: { ImportSummaryList: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTablesError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns an array of table names associated with the current account and endpoint. The
 * output from `ListTables` is paginated, with each page returning a maximum of
 * 100 table names.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesInput,
  ListTablesOutput,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ExclusiveStartTableName: 0, Limit: 0 } },
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "ExclusiveStartTableName",
    outputToken: "LastEvaluatedTableName",
    items: "TableNames",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsOfResourceError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List all tags on an Amazon DynamoDB resource. You can call ListTagsOfResource up to 10
 * times per second, per account.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const listTagsOfResource: API.OperationMethod<
  ListTagsOfResourceInput,
  ListTagsOfResourceOutput,
  ListTagsOfResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: D.m({ context: "ResourceArn" }), NextToken: 0 },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsOfResource",
})) as any;

export type PutItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Creates a new item, or replaces an old item with a new item. If an item that has the
 * same primary key as the new item already exists in the specified table, the new item
 * completely replaces the existing item. You can perform a conditional put operation (add
 * a new item if one with the specified primary key doesn't exist), or replace an existing
 * item if it has certain attribute values. You can return the item's attribute values in
 * the same operation, using the `ReturnValues` parameter.
 *
 * When you add an item, the primary key attributes are the only required attributes.
 *
 * Empty String and Binary attribute values are allowed. Attribute values of type String
 * and Binary must have a length greater than zero if the attribute is used as a key
 * attribute for a table or index. Set type attributes cannot be empty.
 *
 * Invalid Requests with empty values will be rejected with a
 * `ValidationException` exception.
 *
 * To prevent a new item from replacing an existing item, use a conditional
 * expression that contains the `attribute_not_exists` function with the
 * name of the attribute being used as the partition key for the table. Since every
 * record must contain that attribute, the `attribute_not_exists` function
 * will only succeed if no matching item exists.
 *
 * To determine whether `PutItem` overwrote an existing item, use
 * `ReturnValues` set to `ALL_OLD`. If the response includes
 * the `Attributes` element, an existing item was overwritten.
 *
 * For more information about `PutItem`, see Working with
 * Items in the *Amazon DynamoDB Developer Guide*.
 */
export const putItem: API.OperationMethod<
  PutItemInput,
  PutItemOutput,
  PutItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      Item: D.map(i_AttributeValue),
      Expected: D.map(i_ExpectedAttributeValue),
      ReturnValues: 0,
      ReturnConsumedCapacity: 0,
      ReturnItemCollectionMetrics: 0,
      ConditionalOperator: 0,
      ConditionExpression: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
      ReturnValuesOnConditionCheckFailure: 0,
    },
    output: {
      Attributes: D.map(o_AttributeValue),
      ItemCollectionMetrics: o_ItemCollectionMetrics,
    },
  },
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutItem",
})) as any;

export type PutResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | PolicyNotFoundException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy document to the resource, which can be a table or
 * stream. When you attach a resource-based policy using this API, the policy application
 * is
 * *eventually consistent*
 * .
 *
 * `PutResourcePolicy` is an idempotent operation; running it multiple times
 * on the same resource using the same policy document will return the same revision ID. If
 * you specify an `ExpectedRevisionId` that doesn't match the current policy's
 * `RevisionId`, the `PolicyNotFoundException` will be
 * returned.
 *
 * `PutResourcePolicy` is an asynchronous operation. If you issue a
 * `GetResourcePolicy` request immediately after a
 * `PutResourcePolicy` request, DynamoDB might return your
 * previous policy, if there was one, or return the
 * `PolicyNotFoundException`. This is because
 * `GetResourcePolicy` uses an eventually consistent query, and the
 * metadata for your policy or table might not be available at that moment. Wait for a
 * few seconds, and then try the `GetResourcePolicy` request again.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: D.m({ context: "ResourceArn" }),
      Policy: 0,
      ExpectedRevisionId: 0,
      ConfirmRemoveSelfResourceAccess: 0,
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    PolicyNotFoundException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type QueryError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * You must provide the name of the partition key attribute and a single value for that
 * attribute. `Query` returns all items with that partition key value.
 * Optionally, you can provide a sort key attribute and use a comparison operator to refine
 * the search results.
 *
 * Use the `KeyConditionExpression` parameter to provide a specific value for
 * the partition key. The `Query` operation will return all of the items from
 * the table or index with that partition key value. You can optionally narrow the scope of
 * the `Query` operation by specifying a sort key value and a comparison
 * operator in `KeyConditionExpression`. To further refine the
 * `Query` results, you can optionally provide a
 * `FilterExpression`. A `FilterExpression` determines which
 * items within the results should be returned to you. All of the other results are
 * discarded.
 *
 * A `Query` operation always returns a result set. If no matching items are
 * found, the result set will be empty. Queries that do not return results consume the
 * minimum number of read capacity units for that type of read operation.
 *
 * DynamoDB calculates the number of read capacity units consumed based on item
 * size, not on the amount of data that is returned to an application. The number of
 * capacity units consumed will be the same whether you request all of the attributes
 * (the default behavior) or just some of them (using a projection expression). The
 * number will also be the same whether or not you use a `FilterExpression`.
 *
 * `Query` results are always sorted by the sort key value. If the data type of
 * the sort key is Number, the results are returned in numeric order; otherwise, the
 * results are returned in order of UTF-8 bytes. By default, the sort order is ascending.
 * To reverse the order, set the `ScanIndexForward` parameter to false.
 *
 * A single `Query` operation will read up to the maximum number of items set
 * (if using the `Limit` parameter) or a maximum of 1 MB of data and then apply
 * any filtering to the results using `FilterExpression`. If
 * `LastEvaluatedKey` is present in the response, you will need to paginate
 * the result set. For more information, see Paginating
 * the Results in the *Amazon DynamoDB Developer Guide*.
 *
 * `FilterExpression` is applied after a `Query` finishes, but before
 * the results are returned. A `FilterExpression` cannot contain partition key
 * or sort key attributes. You need to specify those attributes in the
 * `KeyConditionExpression`.
 *
 * A `Query` operation can return an empty result set and a
 * `LastEvaluatedKey` if all the items read for the page of results are
 * filtered out.
 *
 * You can query a table, a local secondary index, or a global secondary index. For a
 * query on a table or on a local secondary index, you can set the
 * `ConsistentRead` parameter to `true` and obtain a strongly
 * consistent result. Global secondary indexes support eventually consistent reads only, so
 * do not specify `ConsistentRead` when querying a global secondary
 * index.
 */
export const query: API.PaginatedOperationMethod<
  QueryInput,
  QueryOutput,
  QueryError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: AttributeValue | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      IndexName: 0,
      Select: 0,
      AttributesToGet: 0,
      Limit: 0,
      ConsistentRead: 0,
      KeyConditions: D.map(i_Condition),
      QueryFilter: D.map(i_Condition),
      ConditionalOperator: 0,
      ScanIndexForward: 0,
      ExclusiveStartKey: D.map(i_AttributeValue),
      ReturnConsumedCapacity: 0,
      ProjectionExpression: 0,
      FilterExpression: 0,
      KeyConditionExpression: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
    },
    output: {
      Items: D.list(D.map(o_AttributeValue)),
      LastEvaluatedKey: D.map(o_AttributeValue),
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Query",
  pagination: {
    inputToken: "ExclusiveStartKey",
    outputToken: "LastEvaluatedKey",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type RestoreTableFromBackupError =
  | BackupInUseException
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableAlreadyExistsException
  | TableInUseException
  | CommonErrors;
/**
 * Creates a new table from an existing backup. Any number of users can execute up to 50
 * concurrent restores (any type of restore) in a given account.
 *
 * You can call `RestoreTableFromBackup` at a maximum rate of 10 times per
 * second.
 *
 * You must manually set up the following on the restored table:
 *
 * - Auto scaling policies
 *
 * - IAM policies
 *
 * - Amazon CloudWatch metrics and alarms
 *
 * - Tags
 *
 * - Stream settings
 *
 * - Time to Live (TTL) settings
 */
export const restoreTableFromBackup: API.OperationMethod<
  RestoreTableFromBackupInput,
  RestoreTableFromBackupOutput,
  RestoreTableFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TargetTableName: D.m({ context: "ResourceArn" }),
      BackupArn: 0,
      BillingModeOverride: 0,
      GlobalSecondaryIndexOverride: D.list(i_GlobalSecondaryIndex),
      LocalSecondaryIndexOverride: D.list(i_LocalSecondaryIndex),
      ProvisionedThroughputOverride: i_ProvisionedThroughput,
      OnDemandThroughputOverride: i_OnDemandThroughput,
      SSESpecificationOverride: i_SSESpecification,
      VectorIndexOverride: D.list(i_VectorIndex),
    },
    output: { TableDescription: o_TableDescription },
  },
  errors: [
    BackupInUseException,
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableAlreadyExistsException,
    TableInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromBackup",
})) as any;

export type RestoreTableToPointInTimeError =
  | InternalServerError
  | InvalidEndpointException
  | InvalidRestoreTimeException
  | LimitExceededException
  | PointInTimeRecoveryUnavailableException
  | TableAlreadyExistsException
  | TableInUseException
  | TableNotFoundException
  | CommonErrors;
/**
 * Restores the specified table to the specified point in time within
 * `EarliestRestorableDateTime` and `LatestRestorableDateTime`.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * recovery period to any value between 1 and 35 days. Any number of users can execute up
 * to 50 concurrent restores (any type of restore) in a given account.
 *
 * When you restore using point in time recovery, DynamoDB restores your table data to
 * the state based on the selected date and time (day:hour:minute:second) to a new table.
 *
 * Along with data, the following are also included on the new restored table using point
 * in time recovery:
 *
 * - Global secondary indexes (GSIs)
 *
 * - Local secondary indexes (LSIs)
 *
 * - Provisioned read and write capacity
 *
 * - Encryption settings
 *
 * All these settings come from the current settings of the source table at
 * the time of restore.
 *
 * You must manually set up the following on the restored table:
 *
 * - Auto scaling policies
 *
 * - IAM policies
 *
 * - Amazon CloudWatch metrics and alarms
 *
 * - Tags
 *
 * - Stream settings
 *
 * - Time to Live (TTL) settings
 *
 * - Point in time recovery settings
 */
export const restoreTableToPointInTime: API.OperationMethod<
  RestoreTableToPointInTimeInput,
  RestoreTableToPointInTimeOutput,
  RestoreTableToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceTableArn: 0,
      SourceTableName: 0,
      TargetTableName: D.m({ context: "ResourceArn" }),
      UseLatestRestorableTime: 0,
      RestoreDateTime: 0,
      BillingModeOverride: 0,
      GlobalSecondaryIndexOverride: D.list(i_GlobalSecondaryIndex),
      LocalSecondaryIndexOverride: D.list(i_LocalSecondaryIndex),
      ProvisionedThroughputOverride: i_ProvisionedThroughput,
      OnDemandThroughputOverride: i_OnDemandThroughput,
      SSESpecificationOverride: i_SSESpecification,
      VectorIndexOverride: D.list(i_VectorIndex),
    },
    output: { TableDescription: o_TableDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    InvalidRestoreTimeException,
    LimitExceededException,
    PointInTimeRecoveryUnavailableException,
    TableAlreadyExistsException,
    TableInUseException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableToPointInTime",
})) as any;

export type ScanError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `Scan` operation returns one or more items and item attributes by
 * accessing every item in a table or a secondary index. To have DynamoDB return fewer
 * items, you can provide a `FilterExpression` operation.
 *
 * If the total size of scanned items exceeds the maximum dataset size limit of 1 MB, the
 * scan completes and results are returned to the user. The `LastEvaluatedKey`
 * value is also returned and the requestor can use the `LastEvaluatedKey` to
 * continue the scan in a subsequent operation. Each scan response also includes number of
 * items that were scanned (ScannedCount) as part of the request. If using a
 * `FilterExpression`, a scan result can result in no items meeting the
 * criteria and the `Count` will result in zero. If you did not use a
 * `FilterExpression` in the scan request, then `Count` is the
 * same as `ScannedCount`.
 *
 * `Count` and `ScannedCount` only return the count of items
 * specific to a single scan request and, unless the table is less than 1MB, do not
 * represent the total number of items in the table.
 *
 * A single `Scan` operation first reads up to the maximum number of items set
 * (if using the `Limit` parameter) or a maximum of 1 MB of data and then
 * applies any filtering to the results if a `FilterExpression` is provided. If
 * `LastEvaluatedKey` is present in the response, pagination is required to
 * complete the full table scan. For more information, see Paginating the
 * Results in the *Amazon DynamoDB Developer Guide*.
 *
 * `Scan` operations proceed sequentially; however, for faster performance on
 * a large table or secondary index, applications can request a parallel `Scan`
 * operation by providing the `Segment` and `TotalSegments`
 * parameters. For more information, see Parallel
 * Scan in the *Amazon DynamoDB Developer Guide*.
 *
 * By default, a `Scan` uses eventually consistent reads when accessing the
 * items in a table. Therefore, the results from an eventually consistent `Scan`
 * may not include the latest item changes at the time the scan iterates through each item
 * in the table. If you require a strongly consistent read of each item as the scan
 * iterates through the items in the table, you can set the `ConsistentRead`
 * parameter to true. Strong consistency only relates to the consistency of the read at the
 * item level.
 *
 * DynamoDB does not provide snapshot isolation for a scan operation when the
 * `ConsistentRead` parameter is set to true. Thus, a DynamoDB scan
 * operation does not guarantee that all reads in a scan see a consistent snapshot of
 * the table when the scan operation was requested.
 */
export const scan: API.PaginatedOperationMethod<
  ScanInput,
  ScanOutput,
  ScanError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: AttributeValue | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      IndexName: 0,
      AttributesToGet: 0,
      Limit: 0,
      Select: 0,
      ScanFilter: D.map(i_Condition),
      ConditionalOperator: 0,
      ExclusiveStartKey: D.map(i_AttributeValue),
      ReturnConsumedCapacity: 0,
      TotalSegments: 0,
      Segment: 0,
      ProjectionExpression: 0,
      FilterExpression: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
      ConsistentRead: 0,
    },
    output: {
      Items: D.list(D.map(o_AttributeValue)),
      LastEvaluatedKey: D.map(o_AttributeValue),
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Scan",
  pagination: {
    inputToken: "ExclusiveStartKey",
    outputToken: "LastEvaluatedKey",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type SearchVectorsError =
  | InternalServerError
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Performs a vector similarity search on a vector index associated with an Amazon
 * DynamoDB table, and returns the most similar items sorted by similarity score
 * based on the distance function configured for the index.
 *
 * Score interpretation depends on the distance function:
 *
 * - `COSINE` - Returns the items with the k
 * smallest scores. Scores range from 0 (identical) to 2 (opposite).
 * Lower scores indicate higher similarity.
 *
 * - `EUCLIDEAN` - Returns the items with the k
 * smallest scores. Scores represent the Euclidean distance between
 * vectors. Lower scores indicate higher similarity.
 *
 * - `DOT_PRODUCT` - Returns the items with the k
 * highest scores. Higher scores indicate higher similarity.
 */
export const searchVectors: API.OperationMethod<
  SearchVectorsInput,
  SearchVectorsOutput,
  SearchVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      IndexName: 0,
      ReturnConsumedCapacity: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
      ProjectionExpression: 0,
      SearchVector: D.list(i_AttributeValue),
      SearchConditionExpression: 0,
      TopK: 0,
    },
    output: { SearchResults: D.list({ Item: D.map(o_AttributeValue) }) },
    staticContext: { IsSearchOperation: { value: true } },
  },
  errors: [
    InternalServerError,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchVectors",
})) as any;

export type TagResourceError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate a set of tags with an Amazon DynamoDB resource. You can then activate these
 * user-defined tags so that they appear on the Billing and Cost Management console for
 * cost allocation tracking. You can call TagResource up to five times per second, per
 * account.
 *
 * - `TagResource` is an asynchronous operation. If you issue a ListTagsOfResource request immediately after a
 * `TagResource` request, DynamoDB might return your
 * previous tag set, if there was one, or an empty tag set. This is because
 * `ListTagsOfResource` uses an eventually consistent query, and the
 * metadata for your tags or table might not be available at that moment. Wait for
 * a few seconds, and then try the `ListTagsOfResource` request
 * again.
 *
 * - The application or removal of tags using `TagResource` and
 * `UntagResource` APIs is eventually consistent.
 * `ListTagsOfResource` API will only reflect the changes after a
 * few seconds.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: D.m({ context: "ResourceArn" }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TransactGetItemsError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | CommonErrors;
/**
 * `TransactGetItems` is a synchronous operation that atomically retrieves
 * multiple items from one or more tables (but not from indexes) in a single account and
 * Region. A `TransactGetItems` call can contain up to 100
 * `TransactGetItem` objects, each of which contains a `Get`
 * structure that specifies an item to retrieve from a table in the account and Region. A
 * call to `TransactGetItems` cannot retrieve items from tables in more than one
 * Amazon Web Services account or Region. The aggregate size of the items in the
 * transaction cannot exceed 4 MB.
 *
 * DynamoDB rejects the entire `TransactGetItems` request if any of
 * the following is true:
 *
 * - A conflicting operation is in the process of updating an item to be
 * read.
 *
 * - There is insufficient provisioned capacity for the transaction to be
 * completed.
 *
 * - There is a user error, such as an invalid data format.
 *
 * - The aggregate size of the items in the transaction exceeded 4 MB.
 */
export const transactGetItems: API.OperationMethod<
  TransactGetItemsInput,
  TransactGetItemsOutput,
  TransactGetItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TransactItems: D.list({
        Get: {
          Key: D.map(i_AttributeValue),
          TableName: 0,
          ProjectionExpression: 0,
          ExpressionAttributeNames: 0,
        },
      }),
      ReturnConsumedCapacity: 0,
    },
    output: { Responses: D.list(o_ItemResponse) },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransactGetItems",
})) as any;

export type TransactWriteItemsError =
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | TransactionInProgressException
  | CommonErrors;
/**
 * `TransactWriteItems` is a synchronous write operation that groups up to 100
 * action requests. These actions can target items in different tables, but not in
 * different Amazon Web Services accounts or Regions, and no two actions can target the same
 * item. For example, you cannot both `ConditionCheck` and `Update`
 * the same item. The aggregate size of the items in the transaction cannot exceed 4
 * MB.
 *
 * The actions are completed atomically so that either all of them succeed, or all of
 * them fail. They are defined by the following objects:
 *
 * - `Put`  —   Initiates a `PutItem`
 * operation to write a new item. This structure specifies the primary key of the
 * item to be written, the name of the table to write it in, an optional condition
 * expression that must be satisfied for the write to succeed, a list of the item's
 * attributes, and a field indicating whether to retrieve the item's attributes if
 * the condition is not met.
 *
 * - `Update`  —   Initiates an `UpdateItem`
 * operation to update an existing item. This structure specifies the primary key
 * of the item to be updated, the name of the table where it resides, an optional
 * condition expression that must be satisfied for the update to succeed, an
 * expression that defines one or more attributes to be updated, and a field
 * indicating whether to retrieve the item's attributes if the condition is not
 * met.
 *
 * - `Delete`  —   Initiates a `DeleteItem`
 * operation to delete an existing item. This structure specifies the primary key
 * of the item to be deleted, the name of the table where it resides, an optional
 * condition expression that must be satisfied for the deletion to succeed, and a
 * field indicating whether to retrieve the item's attributes if the condition is
 * not met.
 *
 * - `ConditionCheck`  —   Applies a condition to an item
 * that is not being modified by the transaction. This structure specifies the
 * primary key of the item to be checked, the name of the table where it resides, a
 * condition expression that must be satisfied for the transaction to succeed, and
 * a field indicating whether to retrieve the item's attributes if the condition is
 * not met.
 *
 * DynamoDB rejects the entire `TransactWriteItems` request if any of the
 * following is true:
 *
 * - A condition in one of the condition expressions is not met.
 *
 * - An ongoing operation is in the process of updating the same item.
 *
 * - There is insufficient provisioned capacity for the transaction to be
 * completed.
 *
 * - An item size becomes too large (bigger than 400 KB), a local secondary index
 * (LSI) becomes too large, or a similar validation error occurs because of changes
 * made by the transaction.
 *
 * - The aggregate size of the items in the transaction exceeds 4 MB.
 *
 * - There is a user error, such as an invalid data format.
 */
export const transactWriteItems: API.OperationMethod<
  TransactWriteItemsInput,
  TransactWriteItemsOutput,
  TransactWriteItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TransactItems: D.list({
        ConditionCheck: {
          Key: D.map(i_AttributeValue),
          TableName: 0,
          ConditionExpression: 0,
          ExpressionAttributeNames: 0,
          ExpressionAttributeValues: D.map(i_AttributeValue),
          ReturnValuesOnConditionCheckFailure: 0,
        },
        Put: {
          Item: D.map(i_AttributeValue),
          TableName: 0,
          ConditionExpression: 0,
          ExpressionAttributeNames: 0,
          ExpressionAttributeValues: D.map(i_AttributeValue),
          ReturnValuesOnConditionCheckFailure: 0,
        },
        Delete: {
          Key: D.map(i_AttributeValue),
          TableName: 0,
          ConditionExpression: 0,
          ExpressionAttributeNames: 0,
          ExpressionAttributeValues: D.map(i_AttributeValue),
          ReturnValuesOnConditionCheckFailure: 0,
        },
        Update: {
          Key: D.map(i_AttributeValue),
          UpdateExpression: 0,
          TableName: 0,
          ConditionExpression: 0,
          ExpressionAttributeNames: 0,
          ExpressionAttributeValues: D.map(i_AttributeValue),
          ReturnValuesOnConditionCheckFailure: 0,
        },
      }),
      ReturnConsumedCapacity: 0,
      ReturnItemCollectionMetrics: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { ItemCollectionMetrics: D.map(D.list(o_ItemCollectionMetrics)) },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransactWriteItems",
})) as any;

export type UntagResourceError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the association of tags from an Amazon DynamoDB resource. You can call
 * `UntagResource` up to five times per second, per account.
 *
 * - `UntagResource` is an asynchronous operation. If you issue a ListTagsOfResource request immediately after an
 * `UntagResource` request, DynamoDB might return your
 * previous tag set, if there was one, or an empty tag set. This is because
 * `ListTagsOfResource` uses an eventually consistent query, and the
 * metadata for your tags or table might not be available at that moment. Wait for
 * a few seconds, and then try the `ListTagsOfResource` request
 * again.
 *
 * - The application or removal of tags using `TagResource` and
 * `UntagResource` APIs is eventually consistent.
 * `ListTagsOfResource` API will only reflect the changes after a
 * few seconds.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: D.m({ context: "ResourceArn" }), TagKeys: 0 },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateContinuousBackupsError =
  | ContinuousBackupsUnavailableException
  | InternalServerError
  | InvalidEndpointException
  | TableNotFoundException
  | CommonErrors;
/**
 * `UpdateContinuousBackups` enables or disables point in time recovery for
 * the specified table. A successful `UpdateContinuousBackups` call returns the
 * current `ContinuousBackupsDescription`. Continuous backups are
 * `ENABLED` on all tables at table creation. If point in time recovery is
 * enabled, `PointInTimeRecoveryStatus` will be set to ENABLED.
 *
 * Once continuous backups and point in time recovery are enabled, you can restore to
 * any point in time within `EarliestRestorableDateTime` and
 * `LatestRestorableDateTime`.
 *
 * `LatestRestorableDateTime` is typically 5 minutes before the current time.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * `RecoveryPeriodInDays` to any value between 1 and 35 days.
 */
export const updateContinuousBackups: API.OperationMethod<
  UpdateContinuousBackupsInput,
  UpdateContinuousBackupsOutput,
  UpdateContinuousBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      PointInTimeRecoverySpecification: {
        PointInTimeRecoveryEnabled: 0,
        RecoveryPeriodInDays: 0,
      },
    },
    output: { ContinuousBackupsDescription: o_ContinuousBackupsDescription },
  },
  errors: [
    ContinuousBackupsUnavailableException,
    InternalServerError,
    InvalidEndpointException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContinuousBackups",
})) as any;

export type UpdateContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the status for contributor insights for a specific table or index. CloudWatch
 * Contributor Insights for DynamoDB graphs display the partition key and (if applicable)
 * sort key of frequently accessed items and frequently throttled items in plaintext. If
 * you require the use of Amazon Web Services Key Management Service (KMS) to encrypt this
 * table’s partition key and sort key data with an Amazon Web Services managed key or
 * customer managed key, you should not enable CloudWatch Contributor Insights for DynamoDB
 * for this table.
 */
export const updateContributorInsights: API.OperationMethod<
  UpdateContributorInsightsInput,
  UpdateContributorInsightsOutput,
  UpdateContributorInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      IndexName: 0,
      ContributorInsightsAction: 0,
      ContributorInsightsMode: 0,
    },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContributorInsights",
})) as any;

export type UpdateGlobalTableError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | ReplicaAlreadyExistsException
  | ReplicaNotFoundException
  | TableNotFoundException
  | CommonErrors;
/**
 * Adds or removes replicas in the specified global table. The global table must already
 * exist to be able to use this operation. Any replica to be added must be empty, have the
 * same name as the global table, have the same key schema, have DynamoDB Streams enabled,
 * and have the same provisioned and maximum write capacity units.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 *
 * If you are using global tables Version
 * 2019.11.21 (Current) you can use UpdateTable instead.
 *
 * Although you can use `UpdateGlobalTable` to add replicas and remove
 * replicas in a single request, for simplicity we recommend that you issue separate
 * requests for adding or removing replicas.
 *
 * If global secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The global secondary indexes must have the same name.
 *
 * - The global secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * - The global secondary indexes must have the same provisioned and maximum write
 * capacity units.
 */
export const updateGlobalTable: API.OperationMethod<
  UpdateGlobalTableInput,
  UpdateGlobalTableOutput,
  UpdateGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalTableName: D.m({ context: "ResourceArn" }),
      ReplicaUpdates: D.list({
        Create: { RegionName: 0 },
        Delete: { RegionName: 0 },
      }),
    },
    output: { GlobalTableDescription: o_GlobalTableDescription },
  },
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    ReplicaAlreadyExistsException,
    ReplicaNotFoundException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalTable",
})) as any;

export type UpdateGlobalTableSettingsError =
  | GlobalTableNotFoundException
  | IndexNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ReplicaNotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Updates settings for a global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const updateGlobalTableSettings: API.OperationMethod<
  UpdateGlobalTableSettingsInput,
  UpdateGlobalTableSettingsOutput,
  UpdateGlobalTableSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalTableName: D.m({ context: "ResourceArn" }),
      GlobalTableBillingMode: 0,
      GlobalTableProvisionedWriteCapacityUnits: 0,
      GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate:
        i_AutoScalingSettingsUpdate,
      GlobalTableGlobalSecondaryIndexSettingsUpdate: D.list({
        IndexName: 0,
        ProvisionedWriteCapacityUnits: 0,
        ProvisionedWriteCapacityAutoScalingSettingsUpdate:
          i_AutoScalingSettingsUpdate,
      }),
      ReplicaSettingsUpdate: D.list({
        RegionName: 0,
        ReplicaProvisionedReadCapacityUnits: 0,
        ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate:
          i_AutoScalingSettingsUpdate,
        ReplicaGlobalSecondaryIndexSettingsUpdate: D.list({
          IndexName: 0,
          ProvisionedReadCapacityUnits: 0,
          ProvisionedReadCapacityAutoScalingSettingsUpdate:
            i_AutoScalingSettingsUpdate,
        }),
        ReplicaTableClass: 0,
      }),
    },
    output: { ReplicaSettings: D.list(o_ReplicaSettingsDescription) },
  },
  errors: [
    GlobalTableNotFoundException,
    IndexNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ReplicaNotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalTableSettings",
})) as any;

export type UpdateItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Edits an existing item's attributes, or adds a new item to the table if it does not
 * already exist. You can put, delete, or add attribute values. You can also perform a
 * conditional update on an existing item (insert a new attribute name-value pair if it
 * doesn't exist, or replace an existing name-value pair if it has certain expected
 * attribute values).
 *
 * You can also return the item's attribute values in the same `UpdateItem`
 * operation using the `ReturnValues` parameter.
 */
export const updateItem: API.OperationMethod<
  UpdateItemInput,
  UpdateItemOutput,
  UpdateItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      Key: D.map(i_AttributeValue),
      AttributeUpdates: D.map({ Value: i_AttributeValue, Action: 0 }),
      Expected: D.map(i_ExpectedAttributeValue),
      ConditionalOperator: 0,
      ReturnValues: 0,
      ReturnConsumedCapacity: 0,
      ReturnItemCollectionMetrics: 0,
      UpdateExpression: 0,
      ConditionExpression: 0,
      ExpressionAttributeNames: 0,
      ExpressionAttributeValues: D.map(i_AttributeValue),
      ReturnValuesOnConditionCheckFailure: 0,
    },
    output: {
      Attributes: D.map(o_AttributeValue),
      ItemCollectionMetrics: o_ItemCollectionMetrics,
    },
  },
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateItem",
})) as any;

export type UpdateKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The command to update the Kinesis stream destination.
 */
export const updateKinesisStreamingDestination: API.OperationMethod<
  UpdateKinesisStreamingDestinationInput,
  UpdateKinesisStreamingDestinationOutput,
  UpdateKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      StreamArn: 0,
      UpdateKinesisStreamingConfiguration: {
        ApproximateCreationDateTimePrecision: 0,
      },
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKinesisStreamingDestination",
})) as any;

export type UpdateTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the provisioned throughput settings, global secondary indexes, or DynamoDB
 * Streams settings for a given table.
 *
 * You can only perform one of the following operations at once:
 *
 * - Modify the provisioned throughput settings of the table.
 *
 * - Remove a global secondary index from the table.
 *
 * - Create a new global secondary index on the table. After the index begins
 * backfilling, you can use `UpdateTable` to perform other
 * operations.
 *
 * `UpdateTable` is an asynchronous operation; while it's executing, the table
 * status changes from `ACTIVE` to `UPDATING`. While it's
 * `UPDATING`, you can't issue another `UpdateTable` request.
 * When the table returns to the `ACTIVE` state, the `UpdateTable`
 * operation is complete.
 */
export const updateTable: API.OperationMethod<
  UpdateTableInput,
  UpdateTableOutput,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AttributeDefinitions: D.list(i_AttributeDefinition),
      TableName: D.m({ context: "ResourceArn" }),
      BillingMode: 0,
      ProvisionedThroughput: i_ProvisionedThroughput,
      GlobalSecondaryIndexUpdates: D.list({
        Update: {
          IndexName: 0,
          ProvisionedThroughput: i_ProvisionedThroughput,
          OnDemandThroughput: i_OnDemandThroughput,
          WarmThroughput: i_WarmThroughput,
        },
        Create: {
          IndexName: 0,
          KeySchema: D.list(i_KeySchemaElement),
          Projection: i_Projection,
          ProvisionedThroughput: i_ProvisionedThroughput,
          OnDemandThroughput: i_OnDemandThroughput,
          WarmThroughput: i_WarmThroughput,
        },
        Delete: { IndexName: 0 },
      }),
      StreamSpecification: i_StreamSpecification,
      SSESpecification: i_SSESpecification,
      ReplicaUpdates: D.list({
        Create: {
          RegionName: 0,
          KMSMasterKeyId: 0,
          ProvisionedThroughputOverride: i_ProvisionedThroughputOverride,
          OnDemandThroughputOverride: i_OnDemandThroughputOverride,
          GlobalSecondaryIndexes: D.list(i_ReplicaGlobalSecondaryIndex),
          TableClassOverride: 0,
        },
        Update: {
          RegionName: 0,
          KMSMasterKeyId: 0,
          ProvisionedThroughputOverride: i_ProvisionedThroughputOverride,
          OnDemandThroughputOverride: i_OnDemandThroughputOverride,
          GlobalSecondaryIndexes: D.list(i_ReplicaGlobalSecondaryIndex),
          TableClassOverride: 0,
        },
        Delete: { RegionName: 0 },
      }),
      TableClass: 0,
      DeletionProtectionEnabled: 0,
      MultiRegionConsistency: 0,
      GlobalTableWitnessUpdates: D.list({
        Create: { RegionName: 0 },
        Delete: { RegionName: 0 },
      }),
      OnDemandThroughput: i_OnDemandThroughput,
      WarmThroughput: i_WarmThroughput,
      GlobalTableSettingsReplicationMode: 0,
      VectorIndexUpdates: D.list({
        Create: {
          IndexName: 0,
          VectorAttribute: i_VectorAttributeDefinition,
          SearchSchema: D.list(i_SearchSchemaElement),
          Projection: i_Projection,
          Dimensions: 0,
          DistanceFunction: 0,
        },
        Delete: { IndexName: 0 },
      }),
    },
    output: { TableDescription: o_TableDescription },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
})) as any;

export type UpdateTableReplicaAutoScalingError =
  | InternalServerError
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates auto scaling settings on your global tables at once.
 */
export const updateTableReplicaAutoScaling: API.OperationMethod<
  UpdateTableReplicaAutoScalingInput,
  UpdateTableReplicaAutoScalingOutput,
  UpdateTableReplicaAutoScalingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalSecondaryIndexUpdates: D.list({
        IndexName: 0,
        ProvisionedWriteCapacityAutoScalingUpdate: i_AutoScalingSettingsUpdate,
      }),
      TableName: D.m({ context: "ResourceArn" }),
      ProvisionedWriteCapacityAutoScalingUpdate: i_AutoScalingSettingsUpdate,
      ReplicaUpdates: D.list({
        RegionName: 0,
        ReplicaGlobalSecondaryIndexUpdates: D.list({
          IndexName: 0,
          ProvisionedReadCapacityAutoScalingUpdate: i_AutoScalingSettingsUpdate,
        }),
        ReplicaProvisionedReadCapacityAutoScalingUpdate:
          i_AutoScalingSettingsUpdate,
      }),
    },
  },
  errors: [
    InternalServerError,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableReplicaAutoScaling",
})) as any;

export type UpdateTimeToLiveError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The `UpdateTimeToLive` method enables or disables Time to Live (TTL) for
 * the specified table. A successful `UpdateTimeToLive` call returns the current
 * `TimeToLiveSpecification`. It can take up to one hour for the change to
 * fully process. Any additional `UpdateTimeToLive` calls for the same table
 * during this one hour duration result in a `ValidationException`.
 *
 * TTL compares the current time in epoch time format to the time stored in the TTL
 * attribute of an item. If the epoch time value stored in the attribute is less than the
 * current time, the item is marked as expired and subsequently deleted.
 *
 * The epoch time format is the number of seconds elapsed since 12:00:00 AM January
 * 1, 1970 UTC.
 *
 * DynamoDB deletes expired items on a best-effort basis to ensure availability of
 * throughput for other data operations.
 *
 * DynamoDB typically deletes expired items within two days of expiration. The exact
 * duration within which an item gets deleted after expiration is specific to the
 * nature of the workload. Items that have expired and not been deleted will still show
 * up in reads, queries, and scans.
 *
 * As items are deleted, they are removed from any local secondary index and global
 * secondary index immediately in the same eventually consistent way as a standard delete
 * operation.
 *
 * For more information, see Time To Live in the
 * Amazon DynamoDB Developer Guide.
 */
export const updateTimeToLive: API.OperationMethod<
  UpdateTimeToLiveInput,
  UpdateTimeToLiveOutput,
  UpdateTimeToLiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TableName: D.m({ context: "ResourceArn" }),
      TimeToLiveSpecification: { Enabled: 0, AttributeName: 0 },
    },
  },
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTimeToLive",
})) as any;

const i_AttributeDefinition: D.LazyStruct = () => ({
  AttributeName: 0,
  AttributeType: 0,
});
const i_AttributeValue: D.LazyStruct = () => ({
  S: 0,
  N: 0,
  B: 0,
  SS: 0,
  NS: 0,
  BS: 0,
  M: D.map(i_AttributeValue),
  L: D.list(i_AttributeValue),
  NULL: 0,
  BOOL: 0,
});
const i_AutoScalingSettingsUpdate: D.LazyStruct = () => ({
  MinimumUnits: 0,
  MaximumUnits: 0,
  AutoScalingDisabled: 0,
  AutoScalingRoleArn: 0,
  ScalingPolicyUpdate: {
    PolicyName: 0,
    TargetTrackingScalingPolicyConfiguration: {
      DisableScaleIn: 0,
      ScaleInCooldown: 0,
      ScaleOutCooldown: 0,
      TargetValue: 0,
    },
  },
});
const i_Condition: D.LazyStruct = () => ({
  AttributeValueList: D.list(i_AttributeValue),
  ComparisonOperator: 0,
});
const i_EnableKinesisStreamingConfiguration: D.LazyStruct = () => ({
  ApproximateCreationDateTimePrecision: 0,
});
const i_ExpectedAttributeValue: D.LazyStruct = () => ({
  Value: i_AttributeValue,
  Exists: 0,
  ComparisonOperator: 0,
  AttributeValueList: D.list(i_AttributeValue),
});
const i_GlobalSecondaryIndex: D.LazyStruct = () => ({
  IndexName: 0,
  KeySchema: D.list(i_KeySchemaElement),
  Projection: i_Projection,
  ProvisionedThroughput: i_ProvisionedThroughput,
  OnDemandThroughput: i_OnDemandThroughput,
  WarmThroughput: i_WarmThroughput,
});
const i_KeySchemaElement: D.LazyStruct = () => ({
  AttributeName: 0,
  KeyType: 0,
});
const i_LocalSecondaryIndex: D.LazyStruct = () => ({
  IndexName: 0,
  KeySchema: D.list(i_KeySchemaElement),
  Projection: i_Projection,
});
const i_OnDemandThroughput: D.LazyStruct = () => ({
  MaxReadRequestUnits: 0,
  MaxWriteRequestUnits: 0,
});
const i_OnDemandThroughputOverride: D.LazyStruct = () => ({
  MaxReadRequestUnits: 0,
});
const i_Projection: D.LazyStruct = () => ({
  ProjectionType: 0,
  NonKeyAttributes: 0,
});
const i_ProvisionedThroughput: D.LazyStruct = () => ({
  ReadCapacityUnits: 0,
  WriteCapacityUnits: 0,
});
const i_ProvisionedThroughputOverride: D.LazyStruct = () => ({
  ReadCapacityUnits: 0,
});
const i_ReplicaGlobalSecondaryIndex: D.LazyStruct = () => ({
  IndexName: 0,
  ProvisionedThroughputOverride: i_ProvisionedThroughputOverride,
  OnDemandThroughputOverride: i_OnDemandThroughputOverride,
});
const i_SSESpecification: D.LazyStruct = () => ({
  Enabled: 0,
  SSEType: 0,
  KMSMasterKeyId: 0,
});
const i_SearchSchemaElement: D.LazyStruct = () => ({
  AttributeName: 0,
  SearchSchemaElementType: 0,
});
const i_StreamSpecification: D.LazyStruct = () => ({
  StreamEnabled: 0,
  StreamViewType: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VectorAttributeDefinition: D.LazyStruct = () => ({ AttributeName: 0 });
const i_VectorIndex: D.LazyStruct = () => ({
  IndexName: 0,
  VectorAttribute: i_VectorAttributeDefinition,
  SearchSchema: D.list(i_SearchSchemaElement),
  Projection: i_Projection,
  Dimensions: 0,
  DistanceFunction: 0,
});
const i_WarmThroughput: D.LazyStruct = () => ({
  ReadUnitsPerSecond: 0,
  WriteUnitsPerSecond: 0,
});
const o_AttributeValue: D.LazyStruct = () => ({
  B: D.blob,
  BS: D.list(D.blob),
  M: D.map(o_AttributeValue),
  L: D.list(o_AttributeValue),
});
const o_BackupDescription: D.LazyStruct = () => ({
  BackupDetails: o_BackupDetails,
  SourceTableDetails: { TableCreationDateTime: D.ts },
  SourceTableFeatureDetails: { SSEDescription: o_SSEDescription },
});
const o_BackupDetails: D.LazyStruct = () => ({
  BackupCreationDateTime: D.ts,
  BackupExpiryDateTime: D.ts,
});
const o_ContinuousBackupsDescription: D.LazyStruct = () => ({
  PointInTimeRecoveryDescription: {
    EarliestRestorableDateTime: D.ts,
    LatestRestorableDateTime: D.ts,
  },
});
const o_ExportDescription: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  ExportTime: D.ts,
  IncrementalExportSpecification: { ExportFromTime: D.ts, ExportToTime: D.ts },
});
const o_GlobalTableDescription: D.LazyStruct = () => ({
  ReplicationGroup: D.list(o_ReplicaDescription),
  CreationDateTime: D.ts,
});
const o_ImportTableDescription: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_ItemCollectionMetrics: D.LazyStruct = () => ({
  ItemCollectionKey: D.map(o_AttributeValue),
});
const o_ItemResponse: D.LazyStruct = () => ({ Item: D.map(o_AttributeValue) });
const o_ReplicaSettingsDescription: D.LazyStruct = () => ({
  ReplicaBillingModeSummary: o_BillingModeSummary,
  ReplicaTableClassSummary: o_TableClassSummary,
});
const o_TableDescription: D.LazyStruct = () => ({
  CreationDateTime: D.ts,
  ProvisionedThroughput: o_ProvisionedThroughputDescription,
  BillingModeSummary: o_BillingModeSummary,
  GlobalSecondaryIndexes: D.list({
    ProvisionedThroughput: o_ProvisionedThroughputDescription,
  }),
  Replicas: D.list(o_ReplicaDescription),
  RestoreSummary: { RestoreDateTime: D.ts },
  SSEDescription: o_SSEDescription,
  ArchivalSummary: { ArchivalDateTime: D.ts },
  TableClassSummary: o_TableClassSummary,
});
const o_BillingModeSummary: D.LazyStruct = () => ({
  LastUpdateToPayPerRequestDateTime: D.ts,
});
const o_ProvisionedThroughputDescription: D.LazyStruct = () => ({
  LastIncreaseDateTime: D.ts,
  LastDecreaseDateTime: D.ts,
});
const o_ReplicaDescription: D.LazyStruct = () => ({
  ReplicaInaccessibleDateTime: D.ts,
  ReplicaTableClassSummary: o_TableClassSummary,
});
const o_SSEDescription: D.LazyStruct = () => ({
  InaccessibleEncryptionDateTime: D.ts,
});
const o_TableClassSummary: D.LazyStruct = () => ({ LastUpdateDateTime: D.ts });
