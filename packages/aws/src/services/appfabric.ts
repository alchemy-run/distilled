import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "AppFabric",
  target: "FabricFrontEndService",
  version: "2023-05-19",
  sigv4: "appfabric",
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
                `https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type ResultStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED"
  | (string & {});
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
export type ProcessingConfiguration = {
  auditLog: AuditLogProcessingConfiguration;
};
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
export type DestinationConfiguration = {
  auditLog: AuditLogDestinationConfiguration;
};
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
  descriptor: {
    service: svc,
    http: "POST /useraccess/batchget",
    input: { appBundleIdentifier: 0, taskIdList: 0 },
    output: {
      userAccessResultsList: D.list({
        email: D.secret,
        userId: D.secret,
        userFullName: D.secret,
        userFirstName: D.secret,
        userLastName: D.secret,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}/connect",
    input: {
      appBundleIdentifier: 0,
      appAuthorizationIdentifier: 0,
      authRequest: { redirectUri: 0, code: 0 },
    },
    output: { appAuthorizationSummary: o_AppAuthorizationSummary },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/appauthorizations",
    input: {
      appBundleIdentifier: 0,
      app: 0,
      credential: i_Credential,
      tenant: i_Tenant,
      authType: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { appAuthorization: o_AppAuthorization },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles",
    input: {
      clientToken: D.m({ idempotency: true }),
      customerManagedKeyIdentifier: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/ingestions",
    input: {
      appBundleIdentifier: 0,
      app: 0,
      tenantId: 0,
      ingestionType: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { ingestion: o_Ingestion },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
    input: {
      appBundleIdentifier: 0,
      ingestionIdentifier: 0,
      processingConfiguration: { auditLog: { schema: 0, format: 0 } },
      destinationConfiguration: i_DestinationConfiguration,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { ingestionDestination: o_IngestionDestination },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
    input: { appBundleIdentifier: 0, appAuthorizationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appbundles/{appBundleIdentifier}",
    input: { appBundleIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
    input: { appBundleIdentifier: 0, ingestionIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
    input: {
      appBundleIdentifier: 0,
      ingestionIdentifier: 0,
      ingestionDestinationIdentifier: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
    input: { appBundleIdentifier: 0, appAuthorizationIdentifier: 0 },
    output: { appAuthorization: o_AppAuthorization },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}",
    input: { appBundleIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
    input: { appBundleIdentifier: 0, ingestionIdentifier: 0 },
    output: { ingestion: o_Ingestion },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
    input: {
      appBundleIdentifier: 0,
      ingestionIdentifier: 0,
      ingestionDestinationIdentifier: 0,
    },
    output: { ingestionDestination: o_IngestionDestination },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/appauthorizations",
    input: {
      appBundleIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { appAuthorizationSummaryList: D.list(o_AppAuthorizationSummary) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /appbundles",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
    input: {
      appBundleIdentifier: 0,
      ingestionIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /appbundles/{appBundleIdentifier}/ingestions",
    input: {
      appBundleIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/start",
    input: { ingestionIdentifier: 0, appBundleIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /useraccess/start",
    input: { appBundleIdentifier: 0, email: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/stop",
    input: { ingestionIdentifier: 0, appBundleIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
    input: {
      appBundleIdentifier: 0,
      appAuthorizationIdentifier: 0,
      credential: i_Credential,
      tenant: i_Tenant,
    },
    output: { appAuthorization: o_AppAuthorization },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
    input: {
      appBundleIdentifier: 0,
      ingestionIdentifier: 0,
      ingestionDestinationIdentifier: 0,
      destinationConfiguration: i_DestinationConfiguration,
    },
    output: { ingestionDestination: o_IngestionDestination },
    body: true,
  },
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
})) as any;

const i_Credential: D.LazyStruct = () => ({
  oauth2Credential: { clientId: 0, clientSecret: 0 },
  apiKeyCredential: { apiKey: 0 },
});
const i_DestinationConfiguration: D.LazyStruct = () => ({
  auditLog: {
    destination: {
      s3Bucket: { bucketName: 0, prefix: 0 },
      firehoseStream: { streamName: 0 },
    },
  },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_Tenant: D.LazyStruct = () => ({
  tenantIdentifier: 0,
  tenantDisplayName: 0,
});
const o_AppAuthorization: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_AppAuthorizationSummary: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_Ingestion: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_IngestionDestination: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
