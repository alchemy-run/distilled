import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "AppFabric",
  serviceShapeName: "FabricFrontEndService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "appfabric" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-05-19");
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
              `https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://appfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://appfabric.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(449, __c28, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Identifier = string;
export type UUID = string;
export type TaskIdList = string[];
export interface BatchGetUserAccessTasksRequest {
  appBundleIdentifier: string;
  taskIdList: string[];
}
export type String255 = string;
export type TenantIdentifier = string;
export type String2048 = string;
export type ResultStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | "EXPIRED" | (string & {});
export type Email = string | redacted.Redacted<string>;
export type SensitiveString2048 = string | redacted.Redacted<string>;
export interface TaskError {
  errorCode?: string;
  errorMessage?: string;
}
export interface UserAccessResultItem {
  app?: string;
  tenantId?: string;
  tenantDisplayName?: string;
  taskId?: string;
  resultStatus?: ResultStatus;
  email?: string | redacted.Redacted<string>;
  userId?: string | redacted.Redacted<string>;
  userFullName?: string | redacted.Redacted<string>;
  userFirstName?: string | redacted.Redacted<string>;
  userLastName?: string | redacted.Redacted<string>;
  userStatus?: string;
  taskError?: TaskError;
}
export type UserAccessResultsList = UserAccessResultItem[];
export interface BatchGetUserAccessTasksResponse {
  userAccessResultsList?: UserAccessResultItem[];
}
export type RedirectUri = string;
export interface AuthRequest {
  redirectUri: string;
  code: string | redacted.Redacted<string>;
}
export interface ConnectAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
  authRequest?: AuthRequest;
}
export type Arn = string;
export interface Tenant {
  tenantIdentifier: string;
  tenantDisplayName: string;
}
export type AppAuthorizationStatus =
  | "PendingConnect"
  | "Connected"
  | "ConnectionValidationFailed"
  | "TokenAutoRotationFailed"
  | (string & {});
export interface AppAuthorizationSummary {
  appAuthorizationArn: string;
  appBundleArn: string;
  app: string;
  tenant: Tenant;
  status: AppAuthorizationStatus;
  updatedAt: Date;
}
export interface ConnectAppAuthorizationResponse {
  appAuthorizationSummary: AppAuthorizationSummary;
}
export interface Oauth2Credential {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
}
export interface ApiKeyCredential {
  apiKey: string | redacted.Redacted<string>;
}
export type Credential =
  | { oauth2Credential: Oauth2Credential; apiKeyCredential?: never }
  | { oauth2Credential?: never; apiKeyCredential: ApiKeyCredential };
export type AuthType = "oauth2" | "apiKey" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateAppAuthorizationRequest {
  appBundleIdentifier: string;
  app: string;
  credential: Credential;
  tenant: Tenant;
  authType: AuthType;
  clientToken?: string;
  tags?: Tag[];
}
export type Persona = "admin" | "endUser" | (string & {});
export interface AppAuthorization {
  appAuthorizationArn: string;
  appBundleArn: string;
  app: string;
  tenant: Tenant;
  authType: AuthType;
  status: AppAuthorizationStatus;
  createdAt: Date;
  updatedAt: Date;
  persona?: Persona;
  authUrl?: string;
}
export interface CreateAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export interface CreateAppBundleRequest {
  clientToken?: string;
  customerManagedKeyIdentifier?: string;
  tags?: Tag[];
}
export interface AppBundle {
  arn: string;
  customerManagedKeyArn?: string;
}
export interface CreateAppBundleResponse {
  appBundle: AppBundle;
}
export type IngestionType = "auditLog" | (string & {});
export interface CreateIngestionRequest {
  appBundleIdentifier: string;
  app: string;
  tenantId: string;
  ingestionType: IngestionType;
  clientToken?: string;
  tags?: Tag[];
}
export type IngestionState = "enabled" | "disabled" | (string & {});
export interface Ingestion {
  arn: string;
  appBundleArn: string;
  app: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  state: IngestionState;
  ingestionType: IngestionType;
}
export interface CreateIngestionResponse {
  ingestion: Ingestion;
}
export type Schema = "ocsf" | "raw" | (string & {});
export type Format = "json" | "parquet" | (string & {});
export interface AuditLogProcessingConfiguration {
  schema: Schema;
  format: Format;
}
export type ProcessingConfiguration = { auditLog: AuditLogProcessingConfiguration };
export type String63 = string;
export type String120 = string;
export interface S3Bucket {
  bucketName: string;
  prefix?: string;
}
export type String64 = string;
export interface FirehoseStream {
  streamName: string;
}
export type Destination =
  | { s3Bucket: S3Bucket; firehoseStream?: never }
  | { s3Bucket?: never; firehoseStream: FirehoseStream };
export interface AuditLogDestinationConfiguration {
  destination: Destination;
}
export type DestinationConfiguration = { auditLog: AuditLogDestinationConfiguration };
export interface CreateIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  processingConfiguration: ProcessingConfiguration;
  destinationConfiguration: DestinationConfiguration;
  clientToken?: string;
  tags?: Tag[];
}
export type IngestionDestinationStatus = "Active" | "Failed" | (string & {});
export interface IngestionDestination {
  arn: string;
  ingestionArn: string;
  processingConfiguration: ProcessingConfiguration;
  destinationConfiguration: DestinationConfiguration;
  status?: IngestionDestinationStatus;
  statusReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export interface DeleteAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
}
export interface DeleteAppAuthorizationResponse {}
export interface DeleteAppBundleRequest {
  appBundleIdentifier: string;
}
export interface DeleteAppBundleResponse {}
export interface DeleteIngestionRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
}
export interface DeleteIngestionResponse {}
export interface DeleteIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
}
export interface DeleteIngestionDestinationResponse {}
export interface GetAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
}
export interface GetAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export interface GetAppBundleRequest {
  appBundleIdentifier: string;
}
export interface GetAppBundleResponse {
  appBundle: AppBundle;
}
export interface GetIngestionRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
}
export interface GetIngestionResponse {
  ingestion: Ingestion;
}
export interface GetIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
}
export interface GetIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export type MaxResults = number;
export interface ListAppAuthorizationsRequest {
  appBundleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export type AppAuthorizationSummaryList = AppAuthorizationSummary[];
export interface ListAppAuthorizationsResponse {
  appAuthorizationSummaryList: AppAuthorizationSummary[];
  nextToken?: string;
}
export interface ListAppBundlesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AppBundleSummary {
  arn: string;
}
export type AppBundleSummaryList = AppBundleSummary[];
export interface ListAppBundlesResponse {
  appBundleSummaryList: AppBundleSummary[];
  nextToken?: string;
}
export interface ListIngestionDestinationsRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface IngestionDestinationSummary {
  arn: string;
}
export type IngestionDestinationList = IngestionDestinationSummary[];
export interface ListIngestionDestinationsResponse {
  ingestionDestinations: IngestionDestinationSummary[];
  nextToken?: string;
}
export interface ListIngestionsRequest {
  appBundleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface IngestionSummary {
  arn: string;
  app: string;
  tenantId: string;
  state: IngestionState;
}
export type IngestionList = IngestionSummary[];
export interface ListIngestionsResponse {
  ingestions: IngestionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface StartIngestionRequest {
  ingestionIdentifier: string;
  appBundleIdentifier: string;
}
export interface StartIngestionResponse {}
export interface StartUserAccessTasksRequest {
  appBundleIdentifier: string;
  email: string | redacted.Redacted<string>;
}
export interface UserAccessTaskItem {
  app: string;
  tenantId: string;
  taskId?: string;
  error?: TaskError;
}
export type UserAccessTasksList = UserAccessTaskItem[];
export interface StartUserAccessTasksResponse {
  userAccessTasksList?: UserAccessTaskItem[];
}
export interface StopIngestionRequest {
  ingestionIdentifier: string;
  appBundleIdentifier: string;
}
export interface StopIngestionResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
  credential?: Credential;
  tenant?: Tenant;
}
export interface UpdateAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export interface UpdateIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
  destinationConfiguration: DestinationConfiguration;
}
export interface UpdateIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetUserAccessTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user access details in a batch request.
 *
 * This action polls data from the tasks that are kicked off by the
 * `StartUserAccessTasks` action.
 */
export const batchGetUserAccessTasks: API.OperationMethod<
  BatchGetUserAccessTasksRequest,
  BatchGetUserAccessTasksResponse,
  BatchGetUserAccessTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<BatchGetUserAccessTasksRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<BatchGetUserAccessTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetUserAccessTasks",
}));

export type ConnectAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Establishes a connection between Amazon Web Services AppFabric and an application, which allows AppFabric to
 * call the APIs of the application.
 */
export const connectAppAuthorization: API.OperationMethod<
  ConnectAppAuthorizationRequest,
  ConnectAppAuthorizationResponse,
  ConnectAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(513, __c32, 1) as any as S.Schema<ConnectAppAuthorizationRequest>,
  output: __S(514, __c32, 2) as any as S.Schema<ConnectAppAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConnectAppAuthorization",
}));

export type CreateAppAuthorizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an app authorization within an app bundle, which allows AppFabric to connect to an
 * application.
 */
export const createAppAuthorization: API.OperationMethod<
  CreateAppAuthorizationRequest,
  CreateAppAuthorizationResponse,
  CreateAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CreateAppAuthorizationRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<CreateAppAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppAuthorization",
}));

export type CreateAppBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an app bundle to collect data from an application using AppFabric.
 */
export const createAppBundle: API.OperationMethod<
  CreateAppBundleRequest,
  CreateAppBundleResponse,
  CreateAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAppBundleRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<CreateAppBundleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBundle",
}));

export type CreateIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data ingestion for an application.
 */
export const createIngestion: API.OperationMethod<
  CreateIngestionRequest,
  CreateIngestionResponse,
  CreateIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateIngestionRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateIngestionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestion",
}));

export type CreateIngestionDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ingestion destination, which specifies how an application's ingested data is
 * processed by Amazon Web Services AppFabric and where it's delivered.
 */
export const createIngestionDestination: API.OperationMethod<
  CreateIngestionDestinationRequest,
  CreateIngestionDestinationResponse,
  CreateIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateIngestionDestinationRequest>,
  output: __S(88, __c5, 8) as any as S.Schema<CreateIngestionDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestionDestination",
}));

export type DeleteAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an app authorization. You must delete the associated ingestion before you can
 * delete an app authorization.
 */
export const deleteAppAuthorization: API.OperationMethod<
  DeleteAppAuthorizationRequest,
  DeleteAppAuthorizationResponse,
  DeleteAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteAppAuthorizationRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteAppAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppAuthorization",
}));

export type DeleteAppBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an app bundle. You must delete all associated app authorizations before you can
 * delete an app bundle.
 */
export const deleteAppBundle: API.OperationMethod<
  DeleteAppBundleRequest,
  DeleteAppBundleResponse,
  DeleteAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteAppBundleRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteAppBundleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBundle",
}));

export type DeleteIngestionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ingestion. You must stop (disable) the ingestion and you must delete all
 * associated ingestion destinations before you can delete an app ingestion.
 */
export const deleteIngestion: API.OperationMethod<
  DeleteIngestionRequest,
  DeleteIngestionResponse,
  DeleteIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteIngestionRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteIngestionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngestion",
}));

export type DeleteIngestionDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ingestion destination.
 *
 * This deletes the association between an ingestion and it's destination. It doesn't
 * delete previously ingested data or the storage destination, such as the Amazon S3
 * bucket where the data is delivered. If the ingestion destination is deleted while the
 * associated ingestion is enabled, the ingestion will fail and is eventually disabled.
 */
export const deleteIngestionDestination: API.OperationMethod<
  DeleteIngestionDestinationRequest,
  DeleteIngestionDestinationResponse,
  DeleteIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteIngestionDestinationRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteIngestionDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngestionDestination",
}));

export type GetAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an app authorization.
 */
export const getAppAuthorization: API.OperationMethod<
  GetAppAuthorizationRequest,
  GetAppAuthorizationResponse,
  GetAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetAppAuthorizationRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<GetAppAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppAuthorization",
}));

export type GetAppBundleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an app bundle.
 */
export const getAppBundle: API.OperationMethod<
  GetAppBundleRequest,
  GetAppBundleResponse,
  GetAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetAppBundleRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetAppBundleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppBundle",
}));

export type GetIngestionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ingestion.
 */
export const getIngestion: API.OperationMethod<
  GetIngestionRequest,
  GetIngestionResponse,
  GetIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetIngestionRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<GetIngestionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestion",
}));

export type GetIngestionDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ingestion destination.
 */
export const getIngestionDestination: API.OperationMethod<
  GetIngestionDestinationRequest,
  GetIngestionDestinationResponse,
  GetIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetIngestionDestinationRequest>,
  output: __S(88, __c5, 8) as any as S.Schema<GetIngestionDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestionDestination",
}));

export type ListAppAuthorizationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all app authorizations configured for an app bundle.
 */
export const listAppAuthorizations: API.PaginatedOperationMethod<
  ListAppAuthorizationsRequest,
  ListAppAuthorizationsResponse,
  ListAppAuthorizationsError,
  Credentials | HttpClient.HttpClient,
  AppAuthorizationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListAppAuthorizationsRequest>,
  output: __S(242, __c15, 2) as any as S.Schema<ListAppAuthorizationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppAuthorizations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "appAuthorizationSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppBundlesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of app bundles.
 */
export const listAppBundles: API.PaginatedOperationMethod<
  ListAppBundlesRequest,
  ListAppBundlesResponse,
  ListAppBundlesError,
  Credentials | HttpClient.HttpClient,
  AppBundleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListAppBundlesRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<ListAppBundlesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppBundles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "appBundleSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestionDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ingestion destinations configured for an ingestion.
 */
export const listIngestionDestinations: API.PaginatedOperationMethod<
  ListIngestionDestinationsRequest,
  ListIngestionDestinationsResponse,
  ListIngestionDestinationsError,
  Credentials | HttpClient.HttpClient,
  IngestionDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListIngestionDestinationsRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<ListIngestionDestinationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestionDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestionDestinations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ingestions configured for an app bundle.
 */
export const listIngestions: API.PaginatedOperationMethod<
  ListIngestionsRequest,
  ListIngestionsResponse,
  ListIngestionsError,
  Credentials | HttpClient.HttpClient,
  IngestionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListIngestionsRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListIngestionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts (enables) an ingestion, which collects data from an application.
 */
export const startIngestion: API.OperationMethod<
  StartIngestionRequest,
  StartIngestionResponse,
  StartIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<StartIngestionRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<StartIngestionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartIngestion",
}));

export type StartUserAccessTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the tasks to search user access status for a specific email address.
 *
 * The tasks are stopped when the user access status data is found. The tasks are
 * terminated when the API calls to the application time out.
 */
export const startUserAccessTasks: API.OperationMethod<
  StartUserAccessTasksRequest,
  StartUserAccessTasksResponse,
  StartUserAccessTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<StartUserAccessTasksRequest>,
  output: __S(355, __c22, 3) as any as S.Schema<StartUserAccessTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUserAccessTasks",
}));

export type StopIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops (disables) an ingestion.
 */
export const stopIngestion: API.OperationMethod<
  StopIngestionRequest,
  StopIngestionResponse,
  StopIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<StopIngestionRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<StopIngestionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopIngestion",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an app authorization within an app bundle, which allows AppFabric to connect to an
 * application.
 *
 * If the app authorization was in a `connected` state, updating the app
 * authorization will set it back to a `PendingConnect` state.
 */
export const updateAppAuthorization: API.OperationMethod<
  UpdateAppAuthorizationRequest,
  UpdateAppAuthorizationResponse,
  UpdateAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UpdateAppAuthorizationRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<UpdateAppAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppAuthorization",
}));

export type UpdateIngestionDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an ingestion destination, which specifies how an application's ingested data is
 * processed by Amazon Web Services AppFabric and where it's delivered.
 */
export const updateIngestionDestination: API.OperationMethod<
  UpdateIngestionDestinationRequest,
  UpdateIngestionDestinationResponse,
  UpdateIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<UpdateIngestionDestinationRequest>,
  output: __S(88, __c5, 8) as any as S.Schema<UpdateIngestionDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIngestionDestination",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          customerManagedKeyIdentifier: S.optional(S.String),
          tags: S.optional(__S(577, __c36, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/appbundles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAppBundleRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, customerManagedKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "AppBundle" });
    case 1:
      return S.suspend(() => S.Struct({ appBundle: __S(16, __c1, 0) })).annotate({
        identifier: "CreateAppBundleResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          app: S.String,
          tenantId: S.String,
          ingestionType: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(577, __c36, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/appbundles/{appBundleIdentifier}/ingestions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIngestionRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          appBundleArn: S.String,
          app: S.String,
          tenantId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          state: S.String,
          ingestionType: S.String,
        }),
      ).annotate({ identifier: "Ingestion" });
    case 1:
      return S.suspend(() => S.Struct({ ingestion: __S(48, __c3, 0) })).annotate({
        identifier: "CreateIngestionResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          processingConfiguration: __S(81, __c5, 1),
          destinationConfiguration: __S(86, __c5, 6),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(577, __c36, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIngestionDestinationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ schema: S.String, format: S.String })).annotate({
        identifier: "AuditLogProcessingConfiguration",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ auditLog: __S(80, __c5, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, prefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Bucket" });
    case 3:
      return S.suspend(() => S.Struct({ streamName: S.String })).annotate({
        identifier: "FirehoseStream",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Bucket: __S(82, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ firehoseStream: __S(83, __c5, 3) }),
      ]);
    case 5:
      return S.suspend(() => S.Struct({ destination: __S(84, __c5, 4) })).annotate({
        identifier: "AuditLogDestinationConfiguration",
      });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ auditLog: __S(85, __c5, 5) })]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          ingestionArn: S.String,
          processingConfiguration: __S(81, __c5, 1),
          destinationConfiguration: __S(86, __c5, 6),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IngestionDestination" });
    case 8:
      return S.suspend(() => S.Struct({ ingestionDestination: __S(87, __c5, 7) })).annotate({
        identifier: "CreateIngestionDestinationResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          appAuthorizationIdentifier: S.String.pipe(T.HttpLabel("appAuthorizationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppAuthorizationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAppAuthorizationResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/appbundles/{appBundleIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppBundleRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIngestionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          ingestionDestinationIdentifier: S.String.pipe(
            T.HttpLabel("ingestionDestinationIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIngestionDestinationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          appAuthorizationIdentifier: S.String.pipe(T.HttpLabel("appAuthorizationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAppAuthorizationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/appbundles/{appBundleIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAppBundleRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIngestionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          ingestionDestinationIdentifier: S.String.pipe(
            T.HttpLabel("ingestionDestinationIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIngestionDestinationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/appbundles/{appBundleIdentifier}/appauthorizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppAuthorizationsRequest" });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          appAuthorizationSummaryList: __S(241, __c15, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAppAuthorizationsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/appbundles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAppBundlesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appBundleSummaryList: __S(273, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppBundlesResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "AppBundleSummary",
      });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIngestionDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ingestionDestinations: __S(273, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIngestionDestinationsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/appbundles/{appBundleIdentifier}/ingestions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIngestionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, app: S.String, tenantId: S.String, state: S.String }),
      ).annotate({ identifier: "IngestionSummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ingestions: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIngestionsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(577, __c36, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartIngestionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appBundleIdentifier: S.String, email: SensitiveString }).pipe(
          T.all(T.Http({ method: "POST", uri: "/useraccess/start" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartUserAccessTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          app: S.String,
          tenantId: S.String,
          taskId: S.optional(S.String),
          error: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "UserAccessTaskItem" });
    case 2:
      return S.Array(__S(353, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ userAccessTasksList: S.optional(__S(354, __c22, 2)) }),
      ).annotate({ identifier: "StartUserAccessTasksResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopIngestionRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(577, __c36, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(496, __c31, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          appAuthorizationIdentifier: S.String.pipe(T.HttpLabel("appAuthorizationIdentifier")),
          credential: S.optional(__S(610, __c38, 2)),
          tenant: S.optional(__S(544, __c34, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppAuthorizationRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
          ingestionDestinationIdentifier: S.String.pipe(
            T.HttpLabel("ingestionDestinationIdentifier"),
          ),
          destinationConfiguration: __S(86, __c5, 6),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIngestionDestinationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(448, __c28, 0));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appBundleIdentifier: S.String, taskIdList: __S(496, __c31, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/useraccess/batchget" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetUserAccessTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          app: S.optional(S.String),
          tenantId: S.optional(S.String),
          tenantDisplayName: S.optional(S.String),
          taskId: S.optional(S.String),
          resultStatus: S.optional(S.String),
          email: S.optional(SensitiveString),
          userId: S.optional(SensitiveString),
          userFullName: S.optional(SensitiveString),
          userFirstName: S.optional(SensitiveString),
          userLastName: S.optional(SensitiveString),
          userStatus: S.optional(S.String),
          taskError: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "UserAccessResultItem" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ userAccessResultsList: S.optional(__S(466, __c29, 2)) }),
      ).annotate({ identifier: "BatchGetUserAccessTasksResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ errorCode: S.optional(S.String), errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "TaskError" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ redirectUri: S.String, code: SensitiveString })).annotate({
        identifier: "AuthRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          appAuthorizationIdentifier: S.String.pipe(T.HttpLabel("appAuthorizationIdentifier")),
          authRequest: S.optional(__S(512, __c32, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}/connect",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConnectAppAuthorizationRequest" });
    case 2:
      return S.suspend(() => S.Struct({ appAuthorizationSummary: __S(528, __c33, 0) })).annotate({
        identifier: "ConnectAppAuthorizationResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appAuthorizationArn: S.String,
          appBundleArn: S.String,
          app: S.String,
          tenant: __S(544, __c34, 0),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AppAuthorizationSummary" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tenantIdentifier: S.String, tenantDisplayName: S.String }),
      ).annotate({ identifier: "Tenant" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
          app: S.String,
          credential: __S(610, __c38, 2),
          tenant: __S(544, __c34, 0),
          authType: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(577, __c36, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/appbundles/{appBundleIdentifier}/appauthorizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppAuthorizationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(576, __c36, 0));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appAuthorizationArn: S.String,
          appBundleArn: S.String,
          app: S.String,
          tenant: __S(544, __c34, 0),
          authType: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          persona: S.optional(S.String),
          authUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppAuthorization" });
    case 1:
      return S.suspend(() => S.Struct({ appAuthorization: __S(592, __c37, 0) })).annotate({
        identifier: "CreateAppAuthorizationResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientId: S.String, clientSecret: SensitiveString }),
      ).annotate({ identifier: "Oauth2Credential" });
    case 1:
      return S.suspend(() => S.Struct({ apiKey: SensitiveString })).annotate({
        identifier: "ApiKeyCredential",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ oauth2Credential: __S(608, __c38, 0) }),
        /*@__PURE__*/ S.Struct({ apiKeyCredential: __S(609, __c38, 1) }),
      ]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
