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
  sdkId: "Cognito Sync",
  target: "AWSCognitoSyncService",
  version: "2014-06-30",
  sigv4: "cognito-sync",
  protocol: restJson1Protocol,
  xmlns: "http://cognito-sync.amazonaws.com/doc/2014-06-30/",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cognito-sync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cognito-sync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlreadyStreamedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyStreamedException",
    ["BadRequestError"],
    { code: "AlreadyStreamed", status: 400 },
  )<{ readonly message: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { code: "ConcurrentModification", status: 400 },
  )<{ readonly message: string }> {}
export class DuplicateRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateRequestException",
    ["BadRequestError"],
    { code: "DuplicateRequest", status: 400 },
  )<{ readonly message: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalErrorException",
    ["ServerError"],
    { code: "InternalError", status: 500 },
  )<{ readonly message: string }> {}
export class InvalidConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidConfigurationException",
    ["BadRequestError"],
    { code: "InvalidConfiguration", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidLambdaFunctionOutputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLambdaFunctionOutputException",
    ["BadRequestError"],
    { code: "InvalidLambdaFunctionOutput", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { code: "InvalidParameter", status: 400 },
  )<{ readonly message: string }> {}
export class LambdaThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "LambdaThrottledException",
    ["ThrottlingError"],
    { code: "LambdaThrottled", status: 429 },
  )<{ readonly message: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { code: "LimitExceeded", status: 400 },
  )<{ readonly message: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { code: "NotAuthorizedError", status: 403 },
  )<{ readonly message: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { code: "ResourceConflict", status: 409 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotFound", status: 404 },
  )<{ readonly message: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { code: "TooManyRequests", status: 429 },
  )<{ readonly message: string }> {}
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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/bulkpublish",
    input: { IdentityPoolId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
    input: { IdentityPoolId: 0, IdentityId: 0, DatasetName: 0 },
    output: { Dataset: o_Dataset },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
    input: { IdentityPoolId: 0, IdentityId: 0, DatasetName: 0 },
    output: { Dataset: o_Dataset },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}",
    input: { IdentityPoolId: 0 },
    output: { IdentityPoolUsage: o_IdentityPoolUsage },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/identities/{IdentityId}",
    input: { IdentityPoolId: 0, IdentityId: 0 },
    output: { IdentityUsage: { LastModifiedDate: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/getBulkPublishDetails",
    input: { IdentityPoolId: 0 },
    output: { BulkPublishStartTime: D.ts, BulkPublishCompleteTime: D.ts },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBulkPublishDetails",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/events",
    input: { IdentityPoolId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/configuration",
    input: { IdentityPoolId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets",
    input: {
      IdentityPoolId: 0,
      IdentityId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Datasets: D.list(o_Dataset) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { IdentityPoolUsages: D.list(o_IdentityPoolUsage) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPoolUsage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/records",
    input: {
      IdentityPoolId: 0,
      IdentityId: 0,
      DatasetName: 0,
      LastSyncCount: D.m({ query: "lastSyncCount" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      SyncSessionToken: D.m({ query: "syncSessionToken" }),
    },
    output: { Records: D.list(o_Record) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecords",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/identity/{IdentityId}/device",
    input: { IdentityPoolId: 0, IdentityId: 0, Platform: 0, Token: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/events",
    input: { IdentityPoolId: 0, Events: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/configuration",
    input: {
      IdentityPoolId: 0,
      PushSync: { ApplicationArns: 0, RoleArn: 0 },
      CognitoStreams: { StreamName: 0, RoleArn: 0, StreamingStatus: 0 },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",
    input: { IdentityPoolId: 0, IdentityId: 0, DatasetName: 0, DeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",
    input: { IdentityPoolId: 0, IdentityId: 0, DatasetName: 0, DeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",
    input: {
      IdentityPoolId: 0,
      IdentityId: 0,
      DatasetName: 0,
      DeviceId: 0,
      RecordPatches: D.list({
        Op: 0,
        Key: 0,
        Value: 0,
        SyncCount: 0,
        DeviceLastModifiedDate: 0,
      }),
      SyncSessionToken: 0,
      ClientContext: D.m({ header: "x-amz-Client-Context" }),
    },
    output: { Records: D.list(o_Record) },
    body: true,
  },
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
})) as any;

const o_Dataset: D.LazyStruct = () => ({
  CreationDate: D.ts,
  LastModifiedDate: D.ts,
});
const o_IdentityPoolUsage: D.LazyStruct = () => ({ LastModifiedDate: D.ts });
const o_Record: D.LazyStruct = () => ({
  LastModifiedDate: D.ts,
  DeviceLastModifiedDate: D.ts,
});
