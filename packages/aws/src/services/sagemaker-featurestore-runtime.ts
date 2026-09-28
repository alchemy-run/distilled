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
  sdkId: "SageMaker FeatureStore Runtime",
  target: "AmazonSageMakerFeatureStoreRuntime",
  version: "2020-07-01",
  sigv4: "sagemaker",
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
                `https://featurestore-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://featurestore-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://featurestore-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://featurestore-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessForbidden
  extends /*@__PURE__*/ TE.TaggedError("AccessForbidden", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class FeatureGroupNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "FeatureGroupNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "ValidationError",
        message: { includes: "Resource Not Found" },
      },
    },
  )<{ readonly message?: string }> {}
export class InternalFailure
  extends /*@__PURE__*/ TE.TaggedError("InternalFailure", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class ResourceNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailable
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailable", ["ServerError"], {
    status: 503,
  })<{ readonly message?: string }> {}
export class ValidationError
  extends /*@__PURE__*/ TE.TaggedError("ValidationError", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export type FeatureGroupNameOrArn = string;
export type ValueAsString = string;
export type RecordIdentifiers = string[];
export type FeatureName = string;
export type FeatureNames = string[];
export interface BatchGetRecordIdentifier {
  FeatureGroupName?: string;
  RecordIdentifiersValueAsString?: string[];
  FeatureNames?: string[];
}
export type BatchGetRecordIdentifiers = BatchGetRecordIdentifier[];
export type ExpirationTimeResponse = "Enabled" | "Disabled" | (string & {});
export interface BatchGetRecordRequest {
  Identifiers?: BatchGetRecordIdentifier[];
  ExpirationTimeResponse?: ExpirationTimeResponse;
}
export type ValueAsStringList = string[];
export interface FeatureValue {
  FeatureName?: string;
  ValueAsString?: string;
  ValueAsStringList?: string[];
}
export type Record = FeatureValue[];
export type ExpiresAt = string;
export interface BatchGetRecordResultDetail {
  FeatureGroupName?: string;
  RecordIdentifierValueAsString?: string;
  Record?: FeatureValue[];
  ExpiresAt?: string;
}
export type BatchGetRecordResultDetails = BatchGetRecordResultDetail[];
export type Message = string;
export interface BatchGetRecordError_ {
  FeatureGroupName?: string;
  RecordIdentifierValueAsString?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type BatchGetRecordErrors = BatchGetRecordError_[];
export type UnprocessedIdentifiers = BatchGetRecordIdentifier[];
export interface BatchGetRecordResponse {
  Records: (BatchGetRecordResultDetail & {
    FeatureGroupName: ValueAsString;
    RecordIdentifierValueAsString: ValueAsString;
    Record: (FeatureValue & { FeatureName: FeatureName })[];
  })[];
  Errors: (BatchGetRecordError & {
    FeatureGroupName: ValueAsString;
    RecordIdentifierValueAsString: ValueAsString;
    ErrorCode: ValueAsString;
    ErrorMessage: Message;
  })[];
  UnprocessedIdentifiers: (BatchGetRecordIdentifier & {
    FeatureGroupName: FeatureGroupNameOrArn;
    RecordIdentifiersValueAsString: RecordIdentifiers;
  })[];
}
export type TargetStore = "OnlineStore" | "OfflineStore" | (string & {});
export type TargetStores = TargetStore[];
export type TtlDurationUnit =
  | "Seconds"
  | "Minutes"
  | "Hours"
  | "Days"
  | "Weeks"
  | (string & {});
export type TtlDurationValue = number;
export interface TtlDuration {
  Unit?: TtlDurationUnit;
  Value?: number;
}
export interface BatchWriteRecordEntry {
  FeatureGroupName?: string;
  Record?: FeatureValue[];
  TargetStores?: TargetStore[];
  TtlDuration?: TtlDuration;
}
export type BatchWriteRecordEntries = BatchWriteRecordEntry[];
export interface BatchWriteRecordRequest {
  Entries?: BatchWriteRecordEntry[];
  TtlDuration?: TtlDuration;
}
export interface BatchWriteRecordError_ {
  Entry?: BatchWriteRecordEntry;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type BatchWriteRecordErrors = BatchWriteRecordError_[];
export type UnprocessedBatchWriteRecordEntries = BatchWriteRecordEntry[];
export interface BatchWriteRecordResponse {
  Errors: (BatchWriteRecordError & {
    Entry: BatchWriteRecordEntry & {
      FeatureGroupName: FeatureGroupNameOrArn;
      Record: (FeatureValue & { FeatureName: FeatureName })[];
      TtlDuration: TtlDuration & {
        Unit: TtlDurationUnit;
        Value: TtlDurationValue;
      };
    };
    ErrorCode: ValueAsString;
    ErrorMessage: Message;
  })[];
  UnprocessedEntries: (BatchWriteRecordEntry & {
    FeatureGroupName: FeatureGroupNameOrArn;
    Record: (FeatureValue & { FeatureName: FeatureName })[];
    TtlDuration: TtlDuration & {
      Unit: TtlDurationUnit;
      Value: TtlDurationValue;
    };
  })[];
}
export type DeletionMode = "SoftDelete" | "HardDelete" | (string & {});
export interface DeleteRecordRequest {
  FeatureGroupName: string;
  RecordIdentifierValueAsString?: string;
  EventTime?: string;
  TargetStores?: TargetStore[];
  DeletionMode?: DeletionMode;
}
export interface DeleteRecordResponse {}
export interface GetRecordRequest {
  FeatureGroupName: string;
  RecordIdentifierValueAsString?: string;
  FeatureNames?: string[];
  ExpirationTimeResponse?: ExpirationTimeResponse;
}
export interface GetRecordResponse {
  Record?: (FeatureValue & { FeatureName: FeatureName })[];
  ExpiresAt?: string;
}
export type ListRecordsMaxResults = number;
export type ListRecordsNextToken = string;
export interface ListRecordsRequest {
  FeatureGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  IncludeSoftDeletedRecords?: boolean;
}
export type RecordIdentifierList = string[];
export interface ListRecordsResponse {
  RecordIdentifiers: string[];
  NextToken?: string;
}
export interface PutRecordRequest {
  FeatureGroupName: string;
  Record?: FeatureValue[];
  TargetStores?: TargetStore[];
  TtlDuration?: TtlDuration;
}
export interface PutRecordResponse {}
export type BatchGetRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a batch of `Records` from a `FeatureGroup`.
 */
export const batchGetRecord: API.OperationMethod<
  BatchGetRecordRequest,
  BatchGetRecordResponse,
  BatchGetRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGetRecord",
    input: {
      Identifiers: D.list({
        FeatureGroupName: 0,
        RecordIdentifiersValueAsString: 0,
        FeatureNames: 0,
      }),
      ExpirationTimeResponse: 0,
    },
    body: true,
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRecord",
})) as any;

export type BatchWriteRecordError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Writes a batch of `Records` to one or more `FeatureGroup`s. Use
 * this API for bulk ingestion of records into the `OnlineStore` and
 * `OfflineStore`.
 *
 * You can set the ingested records to expire at a given time to live (TTL) duration after
 * the record's event time by specifying the `TtlDuration` parameter. A request
 * level `TtlDuration` applies to all entries that do not specify their own
 * `TtlDuration`.
 */
export const batchWriteRecord: API.OperationMethod<
  BatchWriteRecordRequest,
  BatchWriteRecordResponse,
  BatchWriteRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchWriteRecord",
    input: {
      Entries: D.list({
        FeatureGroupName: 0,
        Record: D.list(i_FeatureValue),
        TargetStores: 0,
        TtlDuration: i_TtlDuration,
      }),
      TtlDuration: i_TtlDuration,
    },
    body: true,
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchWriteRecord",
})) as any;

export type DeleteRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * Deletes a `Record` from a `FeatureGroup` in the
 * `OnlineStore`. Feature Store supports both `SoftDelete` and
 * `HardDelete`. For `SoftDelete` (default), feature columns are set
 * to `null` and the record is no longer retrievable by `GetRecord` or
 * `BatchGetRecord`. For `HardDelete`, the complete
 * `Record` is removed from the `OnlineStore`. In both cases, Feature
 * Store appends the deleted record marker to the `OfflineStore`. The deleted
 * record marker is a record with the same `RecordIdentifer` as the original, but
 * with `is_deleted` value set to `True`, `EventTime` set to
 * the delete input `EventTime`, and other feature values set to
 * `null`.
 *
 * Note that the `EventTime` specified in `DeleteRecord` should be
 * set later than the `EventTime` of the existing record in the
 * `OnlineStore` for that `RecordIdentifer`. If it is not, the
 * deletion does not occur:
 *
 * - For `SoftDelete`, the existing (not deleted) record remains in the
 * `OnlineStore`, though the delete record marker is still written to the
 * `OfflineStore`.
 *
 * - `HardDelete` returns `EventTime`: 400
 * ValidationException to indicate that the delete operation failed. No delete
 * record marker is written to the `OfflineStore`.
 *
 * When a record is deleted from the `OnlineStore`, the deleted record marker is
 * appended to the `OfflineStore`. If you have the Iceberg table format enabled for
 * your `OfflineStore`, you can remove all history of a record from the
 * `OfflineStore` using Amazon Athena or Apache Spark. For information on how to
 * hard delete a record from the `OfflineStore` with the Iceberg table format
 * enabled, see Delete records from the offline store.
 */
export const deleteRecord: API.OperationMethod<
  DeleteRecordRequest,
  DeleteRecordResponse,
  DeleteRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /FeatureGroup/{FeatureGroupName}",
    input: {
      FeatureGroupName: 0,
      RecordIdentifierValueAsString: D.m({
        query: "RecordIdentifierValueAsString",
      }),
      EventTime: D.m({ query: "EventTime" }),
      TargetStores: D.m({ query: "TargetStores" }),
      DeletionMode: D.m({ query: "DeletionMode" }),
    },
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecord",
})) as any;

export type GetRecordError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * Use for `OnlineStore` serving from a `FeatureStore`. Only the
 * latest records stored in the `OnlineStore` can be retrieved. If no Record with
 * `RecordIdentifierValue` is found, then an empty result is returned.
 */
export const getRecord: API.OperationMethod<
  GetRecordRequest,
  GetRecordResponse,
  GetRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /FeatureGroup/{FeatureGroupName}",
    input: {
      FeatureGroupName: 0,
      RecordIdentifierValueAsString: D.m({
        query: "RecordIdentifierValueAsString",
      }),
      FeatureNames: D.m({ query: "FeatureName" }),
      ExpirationTimeResponse: D.m({ query: "ExpirationTimeResponse" }),
    },
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecord",
})) as any;

export type ListRecordsError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Lists the `RecordIdentifier` values of all records stored in a
 * `FeatureGroup`'s `OnlineStore`. This enables you to discover which
 * records exist without retrieving the full record data.
 */
export const listRecords: API.PaginatedOperationMethod<
  ListRecordsRequest,
  ListRecordsResponse,
  ListRecordsError,
  Credentials | HttpClient.HttpClient,
  ValueAsString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /FeatureGroup/{FeatureGroupName}/ListRecords",
    input: {
      FeatureGroupName: 0,
      MaxResults: 0,
      NextToken: 0,
      IncludeSoftDeletedRecords: 0,
    },
    body: true,
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecords",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecordIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * The `PutRecord` API is used to ingest a list of `Records` into
 * your feature group.
 *
 * If a new record’s `EventTime` is greater, the new record is written to both
 * the `OnlineStore` and `OfflineStore`. Otherwise, the record is a
 * historic record and it is written only to the `OfflineStore`.
 *
 * You can specify the ingestion to be applied to the `OnlineStore`,
 * `OfflineStore`, or both by using the `TargetStores` request
 * parameter.
 *
 * You can set the ingested record to expire at a given time to live (TTL) duration after
 * the record’s event time, `ExpiresAt` = `EventTime` +
 * `TtlDuration`, by specifying the `TtlDuration` parameter. A record
 * level `TtlDuration` is set when specifying the `TtlDuration`
 * parameter using the `PutRecord` API call. If the input `TtlDuration`
 * is `null` or unspecified, `TtlDuration` is set to the default feature
 * group level `TtlDuration`. A record level `TtlDuration` supersedes
 * the group level `TtlDuration`.
 */
export const putRecord: API.OperationMethod<
  PutRecordRequest,
  PutRecordResponse,
  PutRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /FeatureGroup/{FeatureGroupName}",
    input: {
      FeatureGroupName: 0,
      Record: D.list(i_FeatureValue),
      TargetStores: 0,
      TtlDuration: i_TtlDuration,
    },
    body: true,
  },
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecord",
})) as any;

const i_FeatureValue: D.LazyStruct = () => ({
  FeatureName: 0,
  ValueAsString: 0,
  ValueAsStringList: 0,
});
const i_TtlDuration: D.LazyStruct = () => ({ Unit: 0, Value: 0 });
