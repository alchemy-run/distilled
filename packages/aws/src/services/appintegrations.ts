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
  sdkId: "AppIntegrations",
  target: "AmazonAppIntegrationService",
  version: "2020-07-29",
  sigv4: "app-integrations",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class DuplicateResourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateResourceException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceError",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceQuotaExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ContactHandlingScope =
  | "CROSS_CONTACTS"
  | "PER_CONTACT"
  | (string & {});
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
export type ApplicationType =
  | "STANDARD"
  | "SERVICE"
  | "MCP_SERVER"
  | (string & {});
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
}
export type Arn = string;
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
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
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
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
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
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
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
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
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
export type ExecutionStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
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
export type DataIntegrationAssociationsList =
  DataIntegrationAssociationSummary[];
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
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      Name: 0,
      Namespace: 0,
      Description: 0,
      ApplicationSourceConfig: i_ApplicationSourceConfig,
      Subscriptions: D.list(i_Subscription),
      Publications: D.list(i_Publication),
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
      Permissions: 0,
      IsService: 0,
      InitializationTimeout: 0,
      ApplicationConfig: i_ApplicationConfig,
      IframeConfig: i_IframeConfig,
      ApplicationType: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /dataIntegrations",
    input: {
      Name: 0,
      Description: 0,
      KmsKey: 0,
      SourceURI: 0,
      ScheduleConfig: i_ScheduleConfiguration,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
      FileConfiguration: { Folders: 0, Filters: 0 },
      ObjectConfiguration: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /dataIntegrations/{DataIntegrationIdentifier}/associations",
    input: {
      DataIntegrationIdentifier: 0,
      ClientId: 0,
      ObjectConfiguration: 0,
      DestinationURI: 0,
      ClientAssociationMetadata: 0,
      ClientToken: D.m({ idempotency: true }),
      ExecutionConfiguration: i_ExecutionConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /eventIntegrations",
    input: {
      Name: 0,
      Description: 0,
      EventFilter: { Source: 0 },
      EventBridgeBus: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the Application. Only Applications that don't have any Application Associations
 * can be deleted.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{Arn}",
    input: { Arn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /dataIntegrations/{DataIntegrationIdentifier}",
    input: { DataIntegrationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /eventIntegrations/{Name}",
    input: { Name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{Arn}",
    input: { Arn: 0 },
    output: { CreatedTime: D.ts, LastModifiedTime: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /dataIntegrations/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /eventIntegrations/{Name}",
    input: { Name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/associations",
    input: {
      ApplicationId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ApplicationType: D.m({ query: "applicationType" }),
    },
    output: {
      Applications: D.list({ CreatedTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /dataIntegrations/{DataIntegrationIdentifier}/associations",
    input: {
      DataIntegrationIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /dataIntegrations",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /eventIntegrations/{EventIntegrationName}/associations",
    input: {
      EventIntegrationName: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /eventIntegrations",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

export type UpdateApplicationError =
  | AccessDeniedException
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
  descriptor: {
    service: svc,
    http: "PATCH /applications/{Arn}",
    input: {
      Arn: 0,
      Name: 0,
      Description: 0,
      ApplicationSourceConfig: i_ApplicationSourceConfig,
      Subscriptions: D.list(i_Subscription),
      Publications: D.list(i_Publication),
      Permissions: 0,
      IsService: 0,
      InitializationTimeout: 0,
      ApplicationConfig: i_ApplicationConfig,
      IframeConfig: i_IframeConfig,
      ApplicationType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /dataIntegrations/{Identifier}",
    input: { Identifier: 0, Name: 0, Description: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /dataIntegrations/{DataIntegrationIdentifier}/associations/{DataIntegrationAssociationIdentifier}",
    input: {
      DataIntegrationIdentifier: 0,
      DataIntegrationAssociationIdentifier: 0,
      ExecutionConfiguration: i_ExecutionConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /eventIntegrations/{Name}",
    input: { Name: 0, Description: 0 },
    body: true,
  },
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
})) as any;

const i_ApplicationConfig: D.LazyStruct = () => ({
  ContactHandling: { Scope: 0 },
});
const i_ApplicationSourceConfig: D.LazyStruct = () => ({
  ExternalUrlConfig: { AccessUrl: 0, ApprovedOrigins: 0 },
});
const i_ExecutionConfiguration: D.LazyStruct = () => ({
  ExecutionMode: 0,
  OnDemandConfiguration: { StartTime: 0, EndTime: 0 },
  ScheduleConfiguration: i_ScheduleConfiguration,
});
const i_IframeConfig: D.LazyStruct = () => ({ Allow: 0, Sandbox: 0 });
const i_Publication: D.LazyStruct = () => ({
  Event: 0,
  Schema: 0,
  Description: 0,
});
const i_ScheduleConfiguration: D.LazyStruct = () => ({
  FirstExecutionFrom: 0,
  Object: 0,
  ScheduleExpression: 0,
});
const i_Subscription: D.LazyStruct = () => ({ Event: 0, Description: 0 });
