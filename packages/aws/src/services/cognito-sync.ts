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
const ns = /*@__PURE__*/ T.XmlNamespace("http://cognito-sync.amazonaws.com/doc/2014-06-30/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Cognito Sync",
  serviceShapeName: "AWSCognitoSyncService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cognito-sync" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-06-30");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://cognito-sync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cognito-sync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cognito-sync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cognito-sync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cognito-sync.{R}.{D}","properties":{},"headers":{}}');

export class AlreadyStreamedException
  extends /*@__PURE__*/ S.TaggedError<AlreadyStreamedException>()(
    "AlreadyStreamedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AlreadyStreamed", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConcurrentModification", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateRequestException
  extends /*@__PURE__*/ S.TaggedError<DuplicateRequestException>()(
    "DuplicateRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateRequest", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationException>()(
    "InvalidConfigurationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidConfiguration", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaFunctionOutputException
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaFunctionOutputException>()(
    "InvalidLambdaFunctionOutputException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidLambdaFunctionOutput", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LambdaThrottledException
  extends /*@__PURE__*/ S.TaggedError<LambdaThrottledException>()(
    "LambdaThrottledException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LambdaThrottled", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NotAuthorizedError", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceConflict", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TooManyRequests", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export type IdentityPoolId = string;
export interface BulkPublishRequest {
  IdentityPoolId: string;
}
export interface BulkPublishResponse {
  IdentityPoolId?: string;
}
export type IdentityId = string;
export type DatasetName = string;
export interface DeleteDatasetRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
}
export interface Dataset {
  IdentityId?: string;
  DatasetName?: string;
  CreationDate?: Date;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  DataStorage?: number;
  NumRecords?: number;
}
export interface DeleteDatasetResponse {
  Dataset?: Dataset;
}
export interface DescribeDatasetRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
}
export interface DescribeDatasetResponse {
  Dataset?: Dataset;
}
export interface DescribeIdentityPoolUsageRequest {
  IdentityPoolId: string;
}
export interface IdentityPoolUsage {
  IdentityPoolId?: string;
  SyncSessionsCount?: number;
  DataStorage?: number;
  LastModifiedDate?: Date;
}
export interface DescribeIdentityPoolUsageResponse {
  IdentityPoolUsage?: IdentityPoolUsage;
}
export interface DescribeIdentityUsageRequest {
  IdentityPoolId: string;
  IdentityId: string;
}
export interface IdentityUsage {
  IdentityId?: string;
  IdentityPoolId?: string;
  LastModifiedDate?: Date;
  DatasetCount?: number;
  DataStorage?: number;
}
export interface DescribeIdentityUsageResponse {
  IdentityUsage?: IdentityUsage;
}
export interface GetBulkPublishDetailsRequest {
  IdentityPoolId: string;
}
export type BulkPublishStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export interface GetBulkPublishDetailsResponse {
  IdentityPoolId?: string;
  BulkPublishStartTime?: Date;
  BulkPublishCompleteTime?: Date;
  BulkPublishStatus?: BulkPublishStatus;
  FailureMessage?: string;
}
export interface GetCognitoEventsRequest {
  IdentityPoolId: string;
}
export type CognitoEventType = string;
export type LambdaFunctionArn = string;
export type Events = { [key: string]: string | undefined };
export interface GetCognitoEventsResponse {
  Events?: { [key: string]: string | undefined };
}
export interface GetIdentityPoolConfigurationRequest {
  IdentityPoolId: string;
}
export type ApplicationArn = string;
export type ApplicationArnList = string[];
export type AssumeRoleArn = string;
export interface PushSync {
  ApplicationArns?: string[];
  RoleArn?: string;
}
export type StreamName = string;
export type StreamingStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CognitoStreams {
  StreamName?: string;
  RoleArn?: string;
  StreamingStatus?: StreamingStatus;
}
export interface GetIdentityPoolConfigurationResponse {
  IdentityPoolId?: string;
  PushSync?: PushSync;
  CognitoStreams?: CognitoStreams;
}
export type IntegerString = number;
export interface ListDatasetsRequest {
  IdentityPoolId: string;
  IdentityId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type DatasetList = Dataset[];
export interface ListDatasetsResponse {
  Datasets?: Dataset[];
  Count?: number;
  NextToken?: string;
}
export interface ListIdentityPoolUsageRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type IdentityPoolUsageList = IdentityPoolUsage[];
export interface ListIdentityPoolUsageResponse {
  IdentityPoolUsages?: IdentityPoolUsage[];
  MaxResults?: number;
  Count?: number;
  NextToken?: string;
}
export type SyncSessionToken = string;
export interface ListRecordsRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
  LastSyncCount?: number;
  NextToken?: string;
  MaxResults?: number;
  SyncSessionToken?: string;
}
export type RecordKey = string;
export type RecordValue = string;
export interface Record {
  Key?: string;
  Value?: string;
  SyncCount?: number;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  DeviceLastModifiedDate?: Date;
}
export type RecordList = Record[];
export type MergedDatasetNameList = string[];
export interface ListRecordsResponse {
  Records?: Record[];
  NextToken?: string;
  Count?: number;
  DatasetSyncCount?: number;
  LastModifiedBy?: string;
  MergedDatasetNames?: string[];
  DatasetExists?: boolean;
  DatasetDeletedAfterRequestedSyncCount?: boolean;
  SyncSessionToken?: string;
}
export type Platform = "APNS" | "APNS_SANDBOX" | "GCM" | "ADM" | (string & {});
export type PushToken = string;
export interface RegisterDeviceRequest {
  IdentityPoolId: string;
  IdentityId: string;
  Platform: Platform;
  Token: string;
}
export type DeviceId = string;
export interface RegisterDeviceResponse {
  DeviceId?: string;
}
export interface SetCognitoEventsRequest {
  IdentityPoolId: string;
  Events: { [key: string]: string | undefined };
}
export interface SetCognitoEventsResponse {}
export interface SetIdentityPoolConfigurationRequest {
  IdentityPoolId: string;
  PushSync?: PushSync;
  CognitoStreams?: CognitoStreams;
}
export interface SetIdentityPoolConfigurationResponse {
  IdentityPoolId?: string;
  PushSync?: PushSync;
  CognitoStreams?: CognitoStreams;
}
export interface SubscribeToDatasetRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
  DeviceId: string;
}
export interface SubscribeToDatasetResponse {}
export interface UnsubscribeFromDatasetRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
  DeviceId: string;
}
export interface UnsubscribeFromDatasetResponse {}
export type Operation = "replace" | "remove" | (string & {});
export interface RecordPatch {
  Op: Operation;
  Key: string;
  Value?: string;
  SyncCount: number;
  DeviceLastModifiedDate?: Date;
}
export type RecordPatchList = RecordPatch[];
export type ClientContext = string;
export interface UpdateRecordsRequest {
  IdentityPoolId: string;
  IdentityId: string;
  DatasetName: string;
  DeviceId?: string;
  RecordPatches?: RecordPatch[];
  SyncSessionToken: string;
  ClientContext?: string;
}
export interface UpdateRecordsResponse {
  Records?: Record[];
}
export type ExceptionMessage = string;
export type BulkPublishError =
  | AlreadyStreamedException
  | DuplicateRequestException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates a bulk publish of all existing datasets for an Identity Pool to the configured stream. Customers are limited to one successful bulk publish per 24 hours. Bulk publish is an asynchronous request, customers can see the status of the request via the GetBulkPublishDetails operation.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 */
export const bulkPublish: API.OperationMethod<
  BulkPublishRequest,
  BulkPublishResponse,
  BulkPublishError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BulkPublishRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<BulkPublishResponse>,
  errors: [
    AlreadyStreamedException,
    DuplicateRequestException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BulkPublish",
}));

export type DeleteDatasetError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specific dataset. The dataset will be deleted permanently, and the action can't
 * be undone. Datasets that this dataset was merged with will no longer report the merge. Any
 * subsequent operation on this dataset will result in a
 * ResourceNotFoundException.
 *
 * This API can be called with temporary user credentials provided by Cognito Identity or with developer credentials.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<DeleteDatasetRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteDatasetResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DescribeDatasetError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets meta data about a dataset by identity and dataset name. With Amazon Cognito Sync, each
 * identity has access only to its own data. Thus, the credentials used to make this API call
 * need to have access to the identity data.
 *
 * This API can be called with temporary user credentials provided by Cognito Identity or with developer credentials. You should use Cognito Identity credentials to make this API call.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<DescribeDatasetRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DescribeDatasetResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeIdentityPoolUsageError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets usage details (for example, data storage) about a particular identity pool.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 *
 * DescribeIdentityPoolUsage
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 8dc0e749-c8cd-48bd-8520-da6be00d528b
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.DescribeIdentityPoolUsage
 * HOST: cognito-sync.us-east-1.amazonaws.com:443
 * X-AMZ-DATE: 20141111T205737Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;host;x-amz-date;x-amz-target;x-amzn-requestid, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#DescribeIdentityPoolUsage",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "IDENTITY_POOL_ID"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 8dc0e749-c8cd-48bd-8520-da6be00d528b
 * content-type: application/json
 * content-length: 271
 * date: Tue, 11 Nov 2014 20:57:37 GMT
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#DescribeIdentityPoolUsageResponse",
 * "IdentityPoolUsage":
 * {
 * "DataStorage": 0,
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "LastModifiedDate": 1.413231134115E9,
 * "SyncSessionsCount": null
 * }
 * },
 * "Version": "1.0"
 * }
 */
export const describeIdentityPoolUsage: API.OperationMethod<
  DescribeIdentityPoolUsageRequest,
  DescribeIdentityPoolUsageResponse,
  DescribeIdentityPoolUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<DescribeIdentityPoolUsageRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<DescribeIdentityPoolUsageResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityPoolUsage",
}));

export type DescribeIdentityUsageError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets usage information for an identity, including number of datasets and data usage.
 *
 * This API can be called with temporary user credentials provided by Cognito Identity or with developer credentials.
 *
 * DescribeIdentityUsage
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 33f9b4e4-a177-4aad-a3bb-6edb7980b283
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.DescribeIdentityUsage
 * HOST: cognito-sync.us-east-1.amazonaws.com:443
 * X-AMZ-DATE: 20141111T215129Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;host;x-amz-date;x-amz-target;x-amzn-requestid, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#DescribeIdentityUsage",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "IdentityId": "IDENTITY_ID"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 33f9b4e4-a177-4aad-a3bb-6edb7980b283
 * content-type: application/json
 * content-length: 318
 * date: Tue, 11 Nov 2014 21:51:29 GMT
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#DescribeIdentityUsageResponse",
 * "IdentityUsage":
 * {
 * "DataStorage": 16,
 * "DatasetCount": 1,
 * "IdentityId": "IDENTITY_ID",
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "LastModifiedDate": 1.412974081336E9
 * }
 * },
 * "Version": "1.0"
 * }
 */
export const describeIdentityUsage: API.OperationMethod<
  DescribeIdentityUsageRequest,
  DescribeIdentityUsageResponse,
  DescribeIdentityUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<DescribeIdentityUsageRequest>,
  output: __S(30, __c7, 2) as any as S.Schema<DescribeIdentityUsageResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityUsage",
}));

export type GetBulkPublishDetailsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get the status of the last BulkPublish operation for an identity pool.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 */
export const getBulkPublishDetails: API.OperationMethod<
  GetBulkPublishDetailsRequest,
  GetBulkPublishDetailsResponse,
  GetBulkPublishDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<GetBulkPublishDetailsRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<GetBulkPublishDetailsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBulkPublishDetails",
}));

export type GetCognitoEventsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the events and the corresponding Lambda functions associated with an identity pool.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 */
export const getCognitoEvents: API.OperationMethod<
  GetCognitoEventsRequest,
  GetCognitoEventsResponse,
  GetCognitoEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<GetCognitoEventsRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<GetCognitoEventsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCognitoEvents",
}));

export type GetIdentityPoolConfigurationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the configuration settings of an identity pool.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 *
 * GetIdentityPoolConfiguration
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: b1cfdd4b-f620-4fe4-be0f-02024a1d33da
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.GetIdentityPoolConfiguration
 * HOST: cognito-sync.us-east-1.amazonaws.com
 * X-AMZ-DATE: 20141004T195722Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;content-length;host;x-amz-date;x-amz-target, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#GetIdentityPoolConfiguration",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "ID_POOL_ID"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: b1cfdd4b-f620-4fe4-be0f-02024a1d33da
 * date: Sat, 04 Oct 2014 19:57:22 GMT
 * content-type: application/json
 * content-length: 332
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#GetIdentityPoolConfigurationResponse",
 * "IdentityPoolId": "ID_POOL_ID",
 * "PushSync":
 * {
 * "ApplicationArns": ["PLATFORMARN1", "PLATFORMARN2"],
 * "RoleArn": "ROLEARN"
 * }
 * },
 * "Version": "1.0"
 * }
 */
export const getIdentityPoolConfiguration: API.OperationMethod<
  GetIdentityPoolConfigurationRequest,
  GetIdentityPoolConfigurationResponse,
  GetIdentityPoolConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<GetIdentityPoolConfigurationRequest>,
  output: __S(54, __c13, 2) as any as S.Schema<GetIdentityPoolConfigurationResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityPoolConfiguration",
}));

export type ListDatasetsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists datasets for an identity. With Amazon Cognito Sync, each identity has access only to
 * its own data. Thus, the credentials used to make this API call need to have access to the
 * identity data.
 *
 * ListDatasets can be called with temporary user credentials provided by Cognito
 * Identity or with developer credentials. You should use the Cognito Identity credentials to
 * make this API call.
 *
 * ListDatasets
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 15225768-209f-4078-aaed-7494ace9f2db
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.ListDatasets
 * HOST: cognito-sync.us-east-1.amazonaws.com:443
 * X-AMZ-DATE: 20141111T215640Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;host;x-amz-date;x-amz-target;x-amzn-requestid, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#ListDatasets",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "IdentityId": "IDENTITY_ID",
 * "MaxResults": "3"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 15225768-209f-4078-aaed-7494ace9f2db, 15225768-209f-4078-aaed-7494ace9f2db
 * content-type: application/json
 * content-length: 355
 * date: Tue, 11 Nov 2014 21:56:40 GMT
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#ListDatasetsResponse",
 * "Count": 1,
 * "Datasets": [
 * {
 * "CreationDate": 1.412974057151E9,
 * "DataStorage": 16,
 * "DatasetName": "my_list",
 * "IdentityId": "IDENTITY_ID",
 * "LastModifiedBy": "123456789012",
 * "LastModifiedDate": 1.412974057244E9,
 * "NumRecords": 1
 * }],
 * "NextToken": null
 * },
 * "Version": "1.0"
 * }
 */
export const listDatasets: API.OperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<ListDatasetsRequest>,
  output: __S(58, __c14, 2) as any as S.Schema<ListDatasetsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
}));

export type ListIdentityPoolUsageError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of identity pools registered with Cognito.
 *
 * ListIdentityPoolUsage can only be called with developer credentials. You
 * cannot make this API call with the temporary user credentials provided by Cognito
 * Identity.
 *
 * ListIdentityPoolUsage
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 9be7c425-ef05-48c0-aef3-9f0ff2fe17d3
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.ListIdentityPoolUsage
 * HOST: cognito-sync.us-east-1.amazonaws.com:443
 * X-AMZ-DATE: 20141111T211414Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;host;x-amz-date;x-amz-target;x-amzn-requestid, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#ListIdentityPoolUsage",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "MaxResults": "2"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 9be7c425-ef05-48c0-aef3-9f0ff2fe17d3
 * content-type: application/json
 * content-length: 519
 * date: Tue, 11 Nov 2014 21:14:14 GMT
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#ListIdentityPoolUsageResponse",
 * "Count": 2,
 * "IdentityPoolUsages": [
 * {
 * "DataStorage": 0,
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "LastModifiedDate": 1.413836234607E9,
 * "SyncSessionsCount": null
 * },
 * {
 * "DataStorage": 0,
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "LastModifiedDate": 1.410892165601E9,
 * "SyncSessionsCount": null
 * }],
 * "MaxResults": 2,
 * "NextToken": "dXMtZWFzdC0xOjBjMWJhMDUyLWUwOTgtNDFmYS1hNzZlLWVhYTJjMTI1Zjg2MQ=="
 * },
 * "Version": "1.0"
 * }
 */
export const listIdentityPoolUsage: API.OperationMethod<
  ListIdentityPoolUsageRequest,
  ListIdentityPoolUsageResponse,
  ListIdentityPoolUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<ListIdentityPoolUsageRequest>,
  output: __S(62, __c15, 2) as any as S.Schema<ListIdentityPoolUsageResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPoolUsage",
}));

export type ListRecordsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets paginated records, optionally changed after a particular sync count for a dataset and
 * identity. With Amazon Cognito Sync, each identity has access only to its own data. Thus,
 * the credentials used to make this API call need to have access to the identity data.
 *
 * ListRecords can be called with temporary user credentials provided by Cognito
 * Identity or with developer credentials. You should use Cognito Identity credentials to make
 * this API call.
 *
 * ListRecords
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: b3d2e31e-d6b7-4612-8e84-c9ba288dab5d
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.ListRecords
 * HOST: cognito-sync.us-east-1.amazonaws.com:443
 * X-AMZ-DATE: 20141111T183230Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;host;x-amz-date;x-amz-target;x-amzn-requestid, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#ListRecords",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "IDENTITY_POOL_ID",
 * "IdentityId": "IDENTITY_ID",
 * "DatasetName": "newDataSet"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: b3d2e31e-d6b7-4612-8e84-c9ba288dab5d
 * content-type: application/json
 * content-length: 623
 * date: Tue, 11 Nov 2014 18:32:30 GMT
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#ListRecordsResponse",
 * "Count": 0,
 * "DatasetDeletedAfterRequestedSyncCount": false,
 * "DatasetExists": false,
 * "DatasetSyncCount": 0,
 * "LastModifiedBy": null,
 * "MergedDatasetNames": null,
 * "NextToken": null,
 * "Records": [],
 * "SyncSessionToken": "SYNC_SESSION_TOKEN"
 * },
 * "Version": "1.0"
 * }
 */
export const listRecords: API.OperationMethod<
  ListRecordsRequest,
  ListRecordsResponse,
  ListRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<ListRecordsRequest>,
  output: __S(65, __c16, 1) as any as S.Schema<ListRecordsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecords",
}));

export type RegisterDeviceError =
  | InternalErrorException
  | InvalidConfigurationException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Registers a device to receive push sync notifications.
 *
 * This API can only be called with temporary credentials provided by Cognito Identity. You cannot call this API with developer credentials.
 *
 * RegisterDevice
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 368f9200-3eca-449e-93b3-7b9c08d8e185
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.RegisterDevice
 * HOST: cognito-sync.us-east-1.amazonaws.com
 * X-AMZ-DATE: 20141004T194643Z
 * X-AMZ-SECURITY-TOKEN:
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;content-length;host;x-amz-date;x-amz-target, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#RegisterDevice",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "ID_POOL_ID",
 * "IdentityId": "IDENTITY_ID",
 * "Platform": "GCM",
 * "Token": "PUSH_TOKEN"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 368f9200-3eca-449e-93b3-7b9c08d8e185
 * date: Sat, 04 Oct 2014 19:46:44 GMT
 * content-type: application/json
 * content-length: 145
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#RegisterDeviceResponse",
 * "DeviceId": "5cd28fbe-dd83-47ab-9f83-19093a5fb014"
 * },
 * "Version": "1.0"
 * }
 */
export const registerDevice: API.OperationMethod<
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  RegisterDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c18, 0) as any as S.Schema<RegisterDeviceRequest>,
  output: __S(73, __c18, 1) as any as S.Schema<RegisterDeviceResponse>,
  errors: [
    InternalErrorException,
    InvalidConfigurationException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDevice",
}));

export type SetCognitoEventsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the AWS Lambda function for a given event type for an identity pool. This request only updates the key/value pair specified. Other key/values pairs are not updated. To remove a key value pair, pass a empty value for the particular key.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 */
export const setCognitoEvents: API.OperationMethod<
  SetCognitoEventsRequest,
  SetCognitoEventsResponse,
  SetCognitoEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(76, __c19, 0) as any as S.Schema<SetCognitoEventsRequest>,
  output: __S(80, __c20, 0) as any as S.Schema<SetCognitoEventsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetCognitoEvents",
}));

export type SetIdentityPoolConfigurationError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the necessary configuration for push sync.
 *
 * This API can only be called with developer credentials. You cannot call this API with the temporary user credentials provided by Cognito Identity.
 *
 * SetIdentityPoolConfiguration
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: a46db021-f5dd-45d6-af5b-7069fa4a211b
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.SetIdentityPoolConfiguration
 * HOST: cognito-sync.us-east-1.amazonaws.com
 * X-AMZ-DATE: 20141004T200006Z
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;content-length;host;x-amz-date;x-amz-target, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#SetIdentityPoolConfiguration",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "ID_POOL_ID",
 * "PushSync":
 * {
 * "ApplicationArns": ["PLATFORMARN1", "PLATFORMARN2"],
 * "RoleArn": "ROLEARN"
 * }
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: a46db021-f5dd-45d6-af5b-7069fa4a211b
 * date: Sat, 04 Oct 2014 20:00:06 GMT
 * content-type: application/json
 * content-length: 332
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#SetIdentityPoolConfigurationResponse",
 * "IdentityPoolId": "ID_POOL_ID",
 * "PushSync":
 * {
 * "ApplicationArns": ["PLATFORMARN1", "PLATFORMARN2"],
 * "RoleArn": "ROLEARN"
 * }
 * },
 * "Version": "1.0"
 * }
 */
export const setIdentityPoolConfiguration: API.OperationMethod<
  SetIdentityPoolConfigurationRequest,
  SetIdentityPoolConfigurationResponse,
  SetIdentityPoolConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(84, __c21, 0) as any as S.Schema<SetIdentityPoolConfigurationRequest>,
  output: __S(54, __c13, 2) as any as S.Schema<SetIdentityPoolConfigurationResponse>,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityPoolConfiguration",
}));

export type SubscribeToDatasetError =
  | InternalErrorException
  | InvalidConfigurationException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Subscribes to receive notifications when a dataset is modified by another device.
 *
 * This API can only be called with temporary credentials provided by Cognito Identity. You cannot call this API with developer credentials.
 *
 * SubscribeToDataset
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZN-REQUESTID: 8b9932b7-201d-4418-a960-0a470e11de9f
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.SubscribeToDataset
 * HOST: cognito-sync.us-east-1.amazonaws.com
 * X-AMZ-DATE: 20141004T195350Z
 * X-AMZ-SECURITY-TOKEN:
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;content-length;host;x-amz-date;x-amz-target, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#SubscribeToDataset",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "ID_POOL_ID",
 * "IdentityId": "IDENTITY_ID",
 * "DatasetName": "Rufus",
 * "DeviceId": "5cd28fbe-dd83-47ab-9f83-19093a5fb014"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 8b9932b7-201d-4418-a960-0a470e11de9f
 * date: Sat, 04 Oct 2014 19:53:50 GMT
 * content-type: application/json
 * content-length: 99
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#SubscribeToDatasetResponse"
 * },
 * "Version": "1.0"
 * }
 */
export const subscribeToDataset: API.OperationMethod<
  SubscribeToDatasetRequest,
  SubscribeToDatasetResponse,
  SubscribeToDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<SubscribeToDatasetRequest>,
  output: __S(80, __c20, 0) as any as S.Schema<SubscribeToDatasetResponse>,
  errors: [
    InternalErrorException,
    InvalidConfigurationException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubscribeToDataset",
}));

export type UnsubscribeFromDatasetError =
  | InternalErrorException
  | InvalidConfigurationException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Unsubscribes from receiving notifications when a dataset is modified by another device.
 *
 * This API can only be called with temporary credentials provided by Cognito Identity. You cannot call this API with developer credentials.
 *
 * UnsubscribeFromDataset
 * The following examples have been edited for readability.
 *
 * POST / HTTP/1.1
 * CONTENT-TYPE: application/json
 * X-AMZ-REQUESTSUPERTRACE: true
 * X-AMZN-REQUESTID: 676896d6-14ca-45b1-8029-6d36b10a077e
 * X-AMZ-TARGET: com.amazonaws.cognito.sync.model.AWSCognitoSyncService.UnsubscribeFromDataset
 * HOST: cognito-sync.us-east-1.amazonaws.com
 * X-AMZ-DATE: 20141004T195446Z
 * X-AMZ-SECURITY-TOKEN:
 * AUTHORIZATION: AWS4-HMAC-SHA256 Credential=, SignedHeaders=content-type;content-length;host;x-amz-date;x-amz-target, Signature=
 *
 * {
 * "Operation": "com.amazonaws.cognito.sync.model#UnsubscribeFromDataset",
 * "Service": "com.amazonaws.cognito.sync.model#AWSCognitoSyncService",
 * "Input":
 * {
 * "IdentityPoolId": "ID_POOL_ID",
 * "IdentityId": "IDENTITY_ID",
 * "DatasetName": "Rufus",
 * "DeviceId": "5cd28fbe-dd83-47ab-9f83-19093a5fb014"
 * }
 * }
 *
 * 1.1 200 OK
 * x-amzn-requestid: 676896d6-14ca-45b1-8029-6d36b10a077e
 * date: Sat, 04 Oct 2014 19:54:46 GMT
 * content-type: application/json
 * content-length: 103
 *
 * {
 * "Output":
 * {
 * "__type": "com.amazonaws.cognito.sync.model#UnsubscribeFromDatasetResponse"
 * },
 * "Version": "1.0"
 * }
 */
export const unsubscribeFromDataset: API.OperationMethod<
  UnsubscribeFromDatasetRequest,
  UnsubscribeFromDatasetResponse,
  UnsubscribeFromDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<UnsubscribeFromDatasetRequest>,
  output: __S(80, __c20, 0) as any as S.Schema<UnsubscribeFromDatasetResponse>,
  errors: [
    InternalErrorException,
    InvalidConfigurationException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnsubscribeFromDataset",
}));

export type UpdateRecordsError =
  | InternalErrorException
  | InvalidLambdaFunctionOutputException
  | InvalidParameterException
  | LambdaThrottledException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Posts updates to records and adds and deletes records for a dataset and user.
 *
 * The sync count in the record patch is your last known sync count for that record. The server will reject an UpdateRecords request with a ResourceConflictException if you try to patch a record with a new value but a stale sync count.
 *
 * For example, if the sync count on the server is 5 for a key called highScore and you try and submit a new highScore with sync count of 4, the request will be rejected. To obtain the current sync count for a record, call ListRecords. On a successful update of the record, the response returns the new sync count for that record. You should present that sync count the next time you try to update that same record. When the record does not exist, specify the sync count as 0.
 *
 * This API can be called with temporary user credentials provided by Cognito Identity or with developer credentials.
 */
export const updateRecords: API.OperationMethod<
  UpdateRecordsRequest,
  UpdateRecordsResponse,
  UpdateRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(98, __c24, 2) as any as S.Schema<UpdateRecordsRequest>,
  output: __S(99, __c24, 3) as any as S.Schema<UpdateRecordsResponse>,
  errors: [
    InternalErrorException,
    InvalidLambdaFunctionOutputException,
    InvalidParameterException,
    LambdaThrottledException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecords",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/identitypools/{IdentityPoolId}/bulkpublish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BulkPublishRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IdentityPoolId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "BulkPublishResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDatasetRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Dataset: S.optional(__S(12, __c3, 0)) }).pipe(ns)).annotate(
        { identifier: "DeleteDatasetResponse" },
      );
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.optional(S.String),
          DatasetName: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          DataStorage: S.optional(S.Number),
          NumRecords: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Dataset" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDatasetRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/identitypools/{IdentityPoolId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeIdentityPoolUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityPoolUsage: S.optional(__S(24, __c6, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeIdentityPoolUsageResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          SyncSessionsCount: S.optional(S.Number),
          DataStorage: S.optional(S.Number),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "IdentityPoolUsage" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeIdentityUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.optional(S.String),
          IdentityPoolId: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatasetCount: S.optional(S.Number),
          DataStorage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IdentityUsage" });
    case 2:
      return S.suspend(() =>
        S.Struct({ IdentityUsage: S.optional(__S(29, __c7, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeIdentityUsageResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/identitypools/{IdentityPoolId}/getBulkPublishDetails",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBulkPublishDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          BulkPublishStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BulkPublishCompleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BulkPublishStatus: S.optional(S.String),
          FailureMessage: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetBulkPublishDetailsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/identitypools/{IdentityPoolId}/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCognitoEventsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Events: S.optional(__S(40, __c10, 0)) }).pipe(ns)).annotate(
        { identifier: "GetCognitoEventsResponse" },
      );
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/identitypools/{IdentityPoolId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdentityPoolConfigurationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArns: S.optional(__S(48, __c12, 0)), RoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "PushSync" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          RoleArn: S.optional(S.String),
          StreamingStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CognitoStreams" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          PushSync: S.optional(__S(52, __c13, 0)),
          CognitoStreams: S.optional(__S(53, __c13, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetIdentityPoolConfigurationResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDatasetsRequest" });
    case 1:
      return S.Array(__S(12, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Datasets: S.optional(__S(57, __c14, 1)),
          Count: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDatasetsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/identitypools" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIdentityPoolUsageRequest" });
    case 1:
      return S.Array(__S(24, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolUsages: S.optional(__S(61, __c15, 1)),
          MaxResults: S.optional(S.Number),
          Count: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListIdentityPoolUsageResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
          LastSyncCount: S.optional(S.Number).pipe(T.HttpQuery("lastSyncCount")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          SyncSessionToken: S.optional(S.String).pipe(T.HttpQuery("syncSessionToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/records",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Records: S.optional(__S(69, __c17, 1)),
          NextToken: S.optional(S.String),
          Count: S.optional(S.Number),
          DatasetSyncCount: S.optional(S.Number),
          LastModifiedBy: S.optional(S.String),
          MergedDatasetNames: S.optional(__S(48, __c12, 0)),
          DatasetExists: S.optional(S.Boolean),
          DatasetDeletedAfterRequestedSyncCount: S.optional(S.Boolean),
          SyncSessionToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRecordsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          SyncCount: S.optional(S.Number),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          DeviceLastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Record" });
    case 1:
      return S.Array(__S(68, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          Platform: S.String,
          Token: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/identitypools/{IdentityPoolId}/identity/{IdentityId}/device",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterDeviceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DeviceId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterDeviceResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          Events: __S(40, __c10, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/identitypools/{IdentityPoolId}/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetCognitoEventsRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetCognitoEventsResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          PushSync: S.optional(__S(52, __c13, 0)),
          CognitoStreams: S.optional(__S(53, __c13, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/identitypools/{IdentityPoolId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetIdentityPoolConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubscribeToDatasetRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UnsubscribeFromDatasetRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Op: S.String,
          Key: S.String,
          Value: S.optional(S.String),
          SyncCount: S.Number,
          DeviceLastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RecordPatch" });
    case 1:
      return S.Array(__S(96, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String.pipe(T.HttpLabel("IdentityPoolId")),
          IdentityId: S.String.pipe(T.HttpLabel("IdentityId")),
          DatasetName: S.String.pipe(T.HttpLabel("DatasetName")),
          DeviceId: S.optional(S.String),
          RecordPatches: S.optional(__S(97, __c24, 1)),
          SyncSessionToken: S.String,
          ClientContext: S.optional(S.String).pipe(T.HttpHeader("x-amz-Client-Context")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecordsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Records: S.optional(__S(69, __c17, 1)) }).pipe(ns),
      ).annotate({ identifier: "UpdateRecordsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
