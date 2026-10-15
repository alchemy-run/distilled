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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "AppIntegrations",
  serviceShapeName: "AmazonAppIntegrationService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "app-integrations" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-29");
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
              `https://app-integrations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://app-integrations-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://app-integrations.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicateResourceException
  extends /*@__PURE__*/ S.TaggedError<DuplicateResourceException>()(
    "DuplicateResourceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceQuotaExceededException>()(
    "ResourceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()("TooManyRequestsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationName = string;
export type ApplicationNamespace = string;
export type Description = string;
export type URL = string;
export type ApplicationTrustedSource = string;
export type ApplicationApprovedOrigins = string[];
export interface ExternalUrlConfig {
  AccessUrl: string;
  ApprovedOrigins?: string[];
}
export interface ApplicationSourceConfig {
  ExternalUrlConfig?: ExternalUrlConfig;
}
export type EventName = string;
export interface Subscription {
  Event: string;
  Description?: string;
}
export type SubscriptionList = Subscription[];
export type EventDefinitionSchema = string;
export interface Publication {
  Event: string;
  Schema: string;
  Description?: string;
}
export type PublicationList = Publication[];
export type IdempotencyToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type Permission = string;
export type PermissionList = string[];
export type InitializationTimeout = number;
export type ContactHandlingScope = "CROSS_CONTACTS" | "PER_CONTACT" | (string & {});
export interface ContactHandling {
  Scope?: ContactHandlingScope;
}
export interface ApplicationConfig {
  ContactHandling?: ContactHandling;
}
export type IframePermission = string;
export type IframePermissionList = string[];
export interface IframeConfig {
  Allow?: string[];
  Sandbox?: string[];
}
export type ApplicationType = "STANDARD" | "SERVICE" | "MCP_SERVER" | "A2A_SERVER" | (string & {});
export type AuthType = "API_KEY" | (string & {});
export type Arn = string;
export interface AuthConfig {
  AuthType?: AuthType;
  CredentialProviderIdentifier?: string;
}
export interface CreateApplicationRequest {
  Name: string;
  Namespace: string;
  Description?: string;
  ApplicationSourceConfig: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
  AuthConfig?: AuthConfig;
}
export type UUID = string;
export interface CreateApplicationResponse {
  Arn?: string;
  Id?: string;
}
export type Name = string;
export type NonBlankString = string;
export type SourceURI = string;
export interface ScheduleConfiguration {
  FirstExecutionFrom?: string;
  Object?: string;
  ScheduleExpression: string;
}
export type NonBlankLongString = string;
export type FolderList = string[];
export type Fields = string;
export type FieldsList = string[];
export type FieldsMap = { [key: string]: string[] | undefined };
export interface FileConfiguration {
  Folders: string[];
  Filters?: { [key: string]: string[] | undefined };
}
export type ObjectConfiguration = {
  [key: string]: { [key: string]: string[] | undefined } | undefined;
};
export interface CreateDataIntegrationRequest {
  Name: string;
  Description?: string;
  KmsKey: string;
  SourceURI?: string;
  ScheduleConfig?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: { [key: string]: { [key: string]: string[] | undefined } | undefined };
}
export interface CreateDataIntegrationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  KmsKey?: string;
  SourceURI?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: { [key: string]: { [key: string]: string[] | undefined } | undefined };
}
export type Identifier = string;
export type ClientId = string;
export type DestinationURI = string;
export type ClientAssociationMetadata = { [key: string]: string | undefined };
export type ExecutionMode = "ON_DEMAND" | "SCHEDULED" | (string & {});
export interface OnDemandConfiguration {
  StartTime: string;
  EndTime?: string;
}
export interface ExecutionConfiguration {
  ExecutionMode: ExecutionMode;
  OnDemandConfiguration?: OnDemandConfiguration;
  ScheduleConfiguration?: ScheduleConfiguration;
}
export interface CreateDataIntegrationAssociationRequest {
  DataIntegrationIdentifier: string;
  ClientId?: string;
  ObjectConfiguration?: { [key: string]: { [key: string]: string[] | undefined } | undefined };
  DestinationURI?: string;
  ClientAssociationMetadata?: { [key: string]: string | undefined };
  ClientToken?: string;
  ExecutionConfiguration?: ExecutionConfiguration;
}
export interface CreateDataIntegrationAssociationResponse {
  DataIntegrationAssociationId?: string;
  DataIntegrationArn?: string;
}
export type Source = string;
export interface EventFilter {
  Source: string;
}
export type EventBridgeBus = string;
export interface CreateEventIntegrationRequest {
  Name: string;
  Description?: string;
  EventFilter: EventFilter;
  EventBridgeBus: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateEventIntegrationResponse {
  EventIntegrationArn?: string;
}
export type ArnOrUUID = string;
export interface DeleteApplicationRequest {
  Arn: string;
  Force?: boolean;
}
export interface DeleteApplicationResponse {}
export interface DeleteDataIntegrationRequest {
  DataIntegrationIdentifier: string;
}
export interface DeleteDataIntegrationResponse {}
export interface DeleteEventIntegrationRequest {
  Name: string;
}
export interface DeleteEventIntegrationResponse {}
export interface GetApplicationRequest {
  Arn: string;
}
export interface GetApplicationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Namespace?: string;
  Description?: string;
  ApplicationSourceConfig?: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  Tags?: { [key: string]: string | undefined };
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
  AuthConfig?: AuthConfig;
}
export interface GetDataIntegrationRequest {
  Identifier: string;
}
export interface GetDataIntegrationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  KmsKey?: string;
  SourceURI?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: { [key: string]: { [key: string]: string[] | undefined } | undefined };
}
export interface GetEventIntegrationRequest {
  Name: string;
}
export interface GetEventIntegrationResponse {
  Name?: string;
  Description?: string;
  EventIntegrationArn?: string;
  EventBridgeBus?: string;
  EventFilter?: EventFilter;
  Tags?: { [key: string]: string | undefined };
}
export type NextToken = string;
export type MaxResults = number;
export interface ListApplicationAssociationsRequest {
  ApplicationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ApplicationAssociationSummary {
  ApplicationAssociationArn?: string;
  ApplicationArn?: string;
  ClientId?: string;
}
export type ApplicationAssociationsList = ApplicationAssociationSummary[];
export interface ListApplicationAssociationsResponse {
  ApplicationAssociations?: ApplicationAssociationSummary[];
  NextToken?: string;
}
export interface ListApplicationsRequest {
  NextToken?: string;
  MaxResults?: number;
  ApplicationType?: ApplicationType;
}
export interface ApplicationSummary {
  Arn?: string;
  Id?: string;
  Name?: string;
  Namespace?: string;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  IsService?: boolean;
  ApplicationType?: ApplicationType;
}
export type ApplicationsList = ApplicationSummary[];
export interface ListApplicationsResponse {
  Applications?: ApplicationSummary[];
  NextToken?: string;
}
export interface ListDataIntegrationAssociationsRequest {
  DataIntegrationIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ExecutionStatus = "COMPLETED" | "IN_PROGRESS" | "FAILED" | (string & {});
export interface LastExecutionStatus {
  ExecutionStatus?: ExecutionStatus;
  StatusMessage?: string;
}
export interface DataIntegrationAssociationSummary {
  DataIntegrationAssociationArn?: string;
  DataIntegrationArn?: string;
  ClientId?: string;
  DestinationURI?: string;
  LastExecutionStatus?: LastExecutionStatus;
  ExecutionConfiguration?: ExecutionConfiguration;
}
export type DataIntegrationAssociationsList = DataIntegrationAssociationSummary[];
export interface ListDataIntegrationAssociationsResponse {
  DataIntegrationAssociations?: DataIntegrationAssociationSummary[];
  NextToken?: string;
}
export interface ListDataIntegrationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DataIntegrationSummary {
  Arn?: string;
  Name?: string;
  SourceURI?: string;
}
export type DataIntegrationsList = DataIntegrationSummary[];
export interface ListDataIntegrationsResponse {
  DataIntegrations?: DataIntegrationSummary[];
  NextToken?: string;
}
export interface ListEventIntegrationAssociationsRequest {
  EventIntegrationName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type EventBridgeRuleName = string;
export interface EventIntegrationAssociation {
  EventIntegrationAssociationArn?: string;
  EventIntegrationAssociationId?: string;
  EventIntegrationName?: string;
  ClientId?: string;
  EventBridgeRuleName?: string;
  ClientAssociationMetadata?: { [key: string]: string | undefined };
}
export type EventIntegrationAssociationsList = EventIntegrationAssociation[];
export interface ListEventIntegrationAssociationsResponse {
  EventIntegrationAssociations?: EventIntegrationAssociation[];
  NextToken?: string;
}
export interface ListEventIntegrationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EventIntegration {
  EventIntegrationArn?: string;
  Name?: string;
  Description?: string;
  EventFilter?: EventFilter;
  EventBridgeBus?: string;
  Tags?: { [key: string]: string | undefined };
}
export type EventIntegrationsList = EventIntegration[];
export interface ListEventIntegrationsResponse {
  EventIntegrations?: EventIntegration[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationRequest {
  Arn: string;
  Name?: string;
  Description?: string;
  ApplicationSourceConfig?: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
  AuthConfig?: AuthConfig;
}
export interface UpdateApplicationResponse {}
export interface UpdateDataIntegrationRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
}
export interface UpdateDataIntegrationResponse {}
export interface UpdateDataIntegrationAssociationRequest {
  DataIntegrationIdentifier: string;
  DataIntegrationAssociationIdentifier: string;
  ExecutionConfiguration: ExecutionConfiguration;
}
export interface UpdateDataIntegrationAssociationResponse {}
export interface UpdateEventIntegrationRequest {
  Name: string;
  Description?: string;
}
export interface UpdateEventIntegrationResponse {}
export type Message = string;
export type CreateApplicationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | UnsupportedOperationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists an Application resource.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateApplicationResponse>,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    UnsupportedOperationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateDataIntegrationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists a DataIntegration resource.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been
 * previously associated. Use a different DataIntegration, or recreate the DataIntegration
 * using the `CreateDataIntegration` API.
 */
export const createDataIntegration: API.OperationMethod<
  CreateDataIntegrationRequest,
  CreateDataIntegrationResponse,
  CreateDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateDataIntegrationRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<CreateDataIntegrationResponse>,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataIntegration",
}));

export type CreateDataIntegrationAssociationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists a DataIntegrationAssociation resource.
 */
export const createDataIntegrationAssociation: API.OperationMethod<
  CreateDataIntegrationAssociationRequest,
  CreateDataIntegrationAssociationResponse,
  CreateDataIntegrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateDataIntegrationAssociationRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateDataIntegrationAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataIntegrationAssociation",
}));

export type CreateEventIntegrationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an EventIntegration, given a specified name, description, and a reference to an
 * Amazon EventBridge bus in your account and a partner event source that pushes events to
 * that bus. No objects are created in the your account, only metadata that is persisted on the
 * EventIntegration control plane.
 */
export const createEventIntegration: API.OperationMethod<
  CreateEventIntegrationRequest,
  CreateEventIntegrationResponse,
  CreateEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateEventIntegrationRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateEventIntegrationResponse>,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventIntegration",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an application. If the application has associations, you must delete them first.
 * Alternatively, use the `force` option to delete the application and remove its
 * associations.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the DataIntegration. Only DataIntegrations that don't have any
 * DataIntegrationAssociations can be deleted. Deleting a DataIntegration also deletes the
 * underlying Amazon AppFlow flow and service linked role.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const deleteDataIntegration: API.OperationMethod<
  DeleteDataIntegrationRequest,
  DeleteDataIntegrationResponse,
  DeleteDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteDataIntegrationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteDataIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataIntegration",
}));

export type DeleteEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified existing event integration. If the event integration is associated
 * with clients, the request is rejected.
 */
export const deleteEventIntegration: API.OperationMethod<
  DeleteEventIntegrationRequest,
  DeleteEventIntegrationResponse,
  DeleteEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteEventIntegrationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteEventIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventIntegration",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get an Application resource.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetApplicationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the DataIntegration.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const getDataIntegration: API.OperationMethod<
  GetDataIntegrationRequest,
  GetDataIntegrationResponse,
  GetDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetDataIntegrationRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetDataIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataIntegration",
}));

export type GetEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the event integration.
 */
export const getEventIntegration: API.OperationMethod<
  GetEventIntegrationRequest,
  GetEventIntegrationResponse,
  GetEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetEventIntegrationRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetEventIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventIntegration",
}));

export type ListApplicationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of application associations for an application.
 */
export const listApplicationAssociations: API.PaginatedOperationMethod<
  ListApplicationAssociationsRequest,
  ListApplicationAssociationsResponse,
  ListApplicationAssociationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListApplicationAssociationsRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListApplicationAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists applications in the account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(323, __c20, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataIntegrationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of DataIntegration associations in the account.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const listDataIntegrationAssociations: API.PaginatedOperationMethod<
  ListDataIntegrationAssociationsRequest,
  ListDataIntegrationAssociationsResponse,
  ListDataIntegrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListDataIntegrationAssociationsRequest>,
  output: __S(340, __c21, 4) as any as S.Schema<ListDataIntegrationAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataIntegrationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataIntegrationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of DataIntegrations in the account.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const listDataIntegrations: API.PaginatedOperationMethod<
  ListDataIntegrationsRequest,
  ListDataIntegrationsResponse,
  ListDataIntegrationsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ListDataIntegrationsRequest>,
  output: __S(355, __c22, 3) as any as S.Schema<ListDataIntegrationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataIntegrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventIntegrationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of event integration associations in the account.
 */
export const listEventIntegrationAssociations: API.PaginatedOperationMethod<
  ListEventIntegrationAssociationsRequest,
  ListEventIntegrationAssociationsResponse,
  ListEventIntegrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  EventIntegrationAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListEventIntegrationAssociationsRequest>,
  output: __S(371, __c23, 3) as any as S.Schema<ListEventIntegrationAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventIntegrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventIntegrationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventIntegrationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of event integrations in the account.
 */
export const listEventIntegrations: API.PaginatedOperationMethod<
  ListEventIntegrationsRequest,
  ListEventIntegrationsResponse,
  ListEventIntegrationsError,
  Credentials | HttpClient.HttpClient,
  EventIntegration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListEventIntegrationsRequest>,
  output: __S(387, __c24, 3) as any as S.Schema<ListEventIntegrationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventIntegrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates and persists an Application resource.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateApplicationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description of a DataIntegration.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const updateDataIntegration: API.OperationMethod<
  UpdateDataIntegrationRequest,
  UpdateDataIntegrationResponse,
  UpdateDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<UpdateDataIntegrationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateDataIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataIntegration",
}));

export type UpdateDataIntegrationAssociationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates and persists a DataIntegrationAssociation resource.
 *
 * Updating a DataIntegrationAssociation with ExecutionConfiguration will rerun the on-demand job.
 */
export const updateDataIntegrationAssociation: API.OperationMethod<
  UpdateDataIntegrationAssociationRequest,
  UpdateDataIntegrationAssociationResponse,
  UpdateDataIntegrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<UpdateDataIntegrationAssociationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateDataIntegrationAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataIntegrationAssociation",
}));

export type UpdateEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description of an event integration.
 */
export const updateEventIntegration: API.OperationMethod<
  UpdateEventIntegrationRequest,
  UpdateEventIntegrationResponse,
  UpdateEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<UpdateEventIntegrationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateEventIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventIntegration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Namespace: S.String,
          Description: S.optional(S.String),
          ApplicationSourceConfig: __S(49, __c3, 1),
          Subscriptions: S.optional(__S(51, __c3, 3)),
          Publications: S.optional(__S(53, __c3, 5)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(16, __c1, 0)),
          Permissions: S.optional(__S(32, __c2, 0)),
          IsService: S.optional(S.Boolean),
          InitializationTimeout: S.optional(S.Number),
          ApplicationConfig: S.optional(__S(55, __c3, 7)),
          IframeConfig: S.optional(__S(56, __c3, 8)),
          ApplicationType: S.optional(S.String),
          AuthConfig: S.optional(__S(57, __c3, 9)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Id: S.optional(S.String) }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessUrl: S.String, ApprovedOrigins: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "ExternalUrlConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExternalUrlConfig: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "ApplicationSourceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Event: S.String, Description: S.optional(S.String) }),
      ).annotate({ identifier: "Subscription" });
    case 3:
      return S.Array(__S(50, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Event: S.String, Schema: S.String, Description: S.optional(S.String) }),
      ).annotate({ identifier: "Publication" });
    case 5:
      return S.Array(__S(52, __c3, 4));
    case 6:
      return S.suspend(() => S.Struct({ Scope: S.optional(S.String) })).annotate({
        identifier: "ContactHandling",
      });
    case 7:
      return S.suspend(() => S.Struct({ ContactHandling: S.optional(__S(54, __c3, 6)) })).annotate({
        identifier: "ApplicationConfig",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ Allow: S.optional(__S(32, __c2, 0)), Sandbox: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "IframeConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          AuthType: S.optional(S.String),
          CredentialProviderIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuthConfig" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          KmsKey: S.String,
          SourceURI: S.optional(S.String),
          ScheduleConfig: S.optional(__S(96, __c6, 0)),
          Tags: S.optional(__S(16, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileConfiguration: S.optional(__S(112, __c7, 0)),
          ObjectConfiguration: S.optional(__S(81, __c5, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/dataIntegrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDataIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          KmsKey: S.optional(S.String),
          SourceURI: S.optional(S.String),
          ScheduleConfiguration: S.optional(__S(96, __c6, 0)),
          Tags: S.optional(__S(16, __c1, 0)),
          ClientToken: S.optional(S.String),
          FileConfiguration: S.optional(__S(112, __c7, 0)),
          ObjectConfiguration: S.optional(__S(81, __c5, 1)),
        }),
      ).annotate({ identifier: "CreateDataIntegrationResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(32, __c2, 0).pipe(S.optional));
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(80, __c5, 0).pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirstExecutionFrom: S.optional(S.String),
          Object: S.optional(S.String),
          ScheduleExpression: S.String,
        }),
      ).annotate({ identifier: "ScheduleConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Folders: __S(32, __c2, 0), Filters: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "FileConfiguration" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationIdentifier: S.String.pipe(T.HttpLabel("DataIntegrationIdentifier")),
          ClientId: S.optional(S.String),
          ObjectConfiguration: S.optional(__S(81, __c5, 1)),
          DestinationURI: S.optional(S.String),
          ClientAssociationMetadata: S.optional(__S(16, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ExecutionConfiguration: S.optional(__S(145, __c9, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataIntegrationAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationAssociationId: S.optional(S.String),
          DataIntegrationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDataIntegrationAssociationResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StartTime: S.String, EndTime: S.optional(S.String) }),
      ).annotate({ identifier: "OnDemandConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionMode: S.String,
          OnDemandConfiguration: S.optional(__S(144, __c9, 0)),
          ScheduleConfiguration: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "ExecutionConfiguration" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          EventFilter: __S(176, __c11, 0),
          EventBridgeBus: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/eventIntegrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventIntegrationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ EventIntegrationArn: S.optional(S.String) })).annotate({
        identifier: "CreateEventIntegrationResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Source: S.String })).annotate({
        identifier: "EventFilter",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteApplicationResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationIdentifier: S.String.pipe(T.HttpLabel("DataIntegrationIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/dataIntegrations/{DataIntegrationIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataIntegrationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/eventIntegrations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventIntegrationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Namespace: S.optional(S.String),
          Description: S.optional(S.String),
          ApplicationSourceConfig: S.optional(__S(49, __c3, 1)),
          Subscriptions: S.optional(__S(51, __c3, 3)),
          Publications: S.optional(__S(53, __c3, 5)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(16, __c1, 0)),
          Permissions: S.optional(__S(32, __c2, 0)),
          IsService: S.optional(S.Boolean),
          InitializationTimeout: S.optional(S.Number),
          ApplicationConfig: S.optional(__S(55, __c3, 7)),
          IframeConfig: S.optional(__S(56, __c3, 8)),
          ApplicationType: S.optional(S.String),
          AuthConfig: S.optional(__S(57, __c3, 9)),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dataIntegrations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          KmsKey: S.optional(S.String),
          SourceURI: S.optional(S.String),
          ScheduleConfiguration: S.optional(__S(96, __c6, 0)),
          Tags: S.optional(__S(16, __c1, 0)),
          FileConfiguration: S.optional(__S(112, __c7, 0)),
          ObjectConfiguration: S.optional(__S(81, __c5, 1)),
        }),
      ).annotate({ identifier: "GetDataIntegrationResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/eventIntegrations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EventIntegrationArn: S.optional(S.String),
          EventBridgeBus: S.optional(S.String),
          EventFilter: S.optional(__S(176, __c11, 0)),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetEventIntegrationResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationAssociationArn: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
          ClientId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationAssociationSummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationAssociations: S.optional(__S(306, __c19, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationAssociationsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ApplicationType: S.optional(S.String).pipe(T.HttpQuery("applicationType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Namespace: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsService: S.optional(S.Boolean),
          ApplicationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Applications: S.optional(__S(322, __c20, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationIdentifier: S.String.pipe(T.HttpLabel("DataIntegrationIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataIntegrationAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExecutionStatus: S.optional(S.String), StatusMessage: S.optional(S.String) }),
      ).annotate({ identifier: "LastExecutionStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationAssociationArn: S.optional(S.String),
          DataIntegrationArn: S.optional(S.String),
          ClientId: S.optional(S.String),
          DestinationURI: S.optional(S.String),
          LastExecutionStatus: S.optional(__S(337, __c21, 1)),
          ExecutionConfiguration: S.optional(__S(145, __c9, 1)),
        }),
      ).annotate({ identifier: "DataIntegrationAssociationSummary" });
    case 3:
      return S.Array(__S(338, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationAssociations: S.optional(__S(339, __c21, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataIntegrationAssociationsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/dataIntegrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDataIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          SourceURI: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataIntegrationSummary" });
    case 2:
      return S.Array(__S(353, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataIntegrations: S.optional(__S(354, __c22, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataIntegrationsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventIntegrationName: S.String.pipe(T.HttpLabel("EventIntegrationName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/eventIntegrations/{EventIntegrationName}/associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventIntegrationAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventIntegrationAssociationArn: S.optional(S.String),
          EventIntegrationAssociationId: S.optional(S.String),
          EventIntegrationName: S.optional(S.String),
          ClientId: S.optional(S.String),
          EventBridgeRuleName: S.optional(S.String),
          ClientAssociationMetadata: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "EventIntegrationAssociation" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventIntegrationAssociations: S.optional(__S(370, __c23, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEventIntegrationAssociationsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/eventIntegrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEventIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventIntegrationArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EventFilter: S.optional(__S(176, __c11, 0)),
          EventBridgeBus: S.optional(S.String),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "EventIntegration" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventIntegrations: S.optional(__S(386, __c24, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEventIntegrationsResponse" });
  }
}
function __c25(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(16, __c1, 0),
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
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(32, __c2, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ApplicationSourceConfig: S.optional(__S(49, __c3, 1)),
          Subscriptions: S.optional(__S(51, __c3, 3)),
          Publications: S.optional(__S(53, __c3, 5)),
          Permissions: S.optional(__S(32, __c2, 0)),
          IsService: S.optional(S.Boolean),
          InitializationTimeout: S.optional(S.Number),
          ApplicationConfig: S.optional(__S(55, __c3, 7)),
          IframeConfig: S.optional(__S(56, __c3, 8)),
          ApplicationType: S.optional(S.String),
          AuthConfig: S.optional(__S(57, __c3, 9)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dataIntegrations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataIntegrationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataIntegrationIdentifier: S.String.pipe(T.HttpLabel("DataIntegrationIdentifier")),
          DataIntegrationAssociationIdentifier: S.String.pipe(
            T.HttpLabel("DataIntegrationAssociationIdentifier"),
          ),
          ExecutionConfiguration: __S(145, __c9, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations/{DataIntegrationAssociationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataIntegrationAssociationRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/eventIntegrations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventIntegrationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
