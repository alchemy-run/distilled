import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "finspace data",
  target: "AWSHabaneroPublicAPI",
  version: "2020-07-13",
  sigv4: "finspace-api",
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
                `https://finspace-api-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://finspace-api-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly reason?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly reason?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly reason?: string }> {}
export type PermissionGroupId = string;
export type UserId = string;
export type ClientToken = string;
export interface AssociateUserToPermissionGroupRequest {
  permissionGroupId: string;
  userId: string;
  clientToken?: string;
}
export type StatusCode = number;
export interface AssociateUserToPermissionGroupResponse {
  statusCode?: number;
}
export type DatasetId = string;
export type ChangeType = "REPLACE" | "APPEND" | "MODIFY" | (string & {});
export type StringMapKey = string;
export type StringMapValue = string;
export type SourceParams = { [key: string]: string | undefined };
export type FormatParams = { [key: string]: string | undefined };
export interface CreateChangesetRequest {
  clientToken?: string;
  datasetId: string;
  changeType: ChangeType;
  sourceParams: { [key: string]: string | undefined };
  formatParams: { [key: string]: string | undefined };
}
export type ChangesetId = string;
export interface CreateChangesetResponse {
  datasetId?: string;
  changesetId?: string;
}
export type DatasetTitle = string;
export type DatasetKind = "TABULAR" | "NON_TABULAR" | (string & {});
export type DatasetDescription = string;
export type OwnerName = string;
export type PhoneNumber = string;
export type Email = string | redacted.Redacted<string>;
export interface DatasetOwnerInfo {
  name?: string;
  phoneNumber?: string;
  email?: string | redacted.Redacted<string>;
}
export type StringValueLength1to250 = string;
export interface ResourcePermission {
  permission?: string;
}
export type ResourcePermissionsList = ResourcePermission[];
export interface PermissionGroupParams {
  permissionGroupId?: string;
  datasetPermissions?: ResourcePermission[];
}
export type AliasString = string;
export type ColumnDataType =
  | "STRING"
  | "CHAR"
  | "INTEGER"
  | "TINYINT"
  | "SMALLINT"
  | "BIGINT"
  | "FLOAT"
  | "DOUBLE"
  | "DATE"
  | "DATETIME"
  | "BOOLEAN"
  | "BINARY"
  | (string & {});
export type ColumnName = string;
export type ColumnDescription = string;
export interface ColumnDefinition {
  dataType?: ColumnDataType;
  columnName?: string;
  columnDescription?: string;
}
export type ColumnList = ColumnDefinition[];
export type ColumnNameList = string[];
export interface SchemaDefinition {
  columns?: ColumnDefinition[];
  primaryKeyColumns?: string[];
}
export interface SchemaUnion {
  tabularSchemaConfig?: SchemaDefinition;
}
export interface CreateDatasetRequest {
  clientToken?: string;
  datasetTitle: string;
  kind: DatasetKind;
  datasetDescription?: string;
  ownerInfo?: DatasetOwnerInfo;
  permissionGroupParams: PermissionGroupParams;
  alias?: string;
  schemaDefinition?: SchemaUnion;
}
export interface CreateDatasetResponse {
  datasetId?: string;
}
export type StringValueLength1to255 = string;
export type SortColumnList = string[];
export type PartitionColumnList = string[];
export type TimestampEpoch = number;
export type DataViewDestinationType = string;
export type ExportFileFormat = "PARQUET" | "DELIMITED_TEXT" | (string & {});
export type S3DestinationFormatOptions = { [key: string]: string | undefined };
export interface DataViewDestinationTypeParams {
  destinationType: string;
  s3DestinationExportFileFormat?: ExportFileFormat;
  s3DestinationExportFileFormatOptions?: { [key: string]: string | undefined };
}
export interface CreateDataViewRequest {
  clientToken?: string;
  datasetId: string;
  autoUpdate?: boolean;
  sortColumns?: string[];
  partitionColumns?: string[];
  asOfTimestamp?: number;
  destinationTypeParams: DataViewDestinationTypeParams;
}
export type DataViewId = string;
export interface CreateDataViewResponse {
  datasetId?: string;
  dataViewId?: string;
}
export type PermissionGroupName = string | redacted.Redacted<string>;
export type PermissionGroupDescription = string | redacted.Redacted<string>;
export type ApplicationPermission =
  | "CreateDataset"
  | "ManageClusters"
  | "ManageUsersAndGroups"
  | "ManageAttributeSets"
  | "ViewAuditData"
  | "AccessNotebooks"
  | "GetTemporaryCredentials"
  | (string & {});
export type ApplicationPermissionList = ApplicationPermission[];
export interface CreatePermissionGroupRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions: ApplicationPermission[];
  clientToken?: string;
}
export interface CreatePermissionGroupResponse {
  permissionGroupId?: string;
}
export type UserType = "SUPER_USER" | "APP_USER" | (string & {});
export type FirstName = string | redacted.Redacted<string>;
export type LastName = string | redacted.Redacted<string>;
export type ApiAccess = "ENABLED" | "DISABLED" | (string & {});
export type RoleArn = string;
export interface CreateUserRequest {
  emailAddress: string | redacted.Redacted<string>;
  type: UserType;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  clientToken?: string;
}
export interface CreateUserResponse {
  userId?: string;
}
export interface DeleteDatasetRequest {
  clientToken?: string;
  datasetId: string;
}
export interface DeleteDatasetResponse {
  datasetId?: string;
}
export interface DeletePermissionGroupRequest {
  permissionGroupId: string;
  clientToken?: string;
}
export interface DeletePermissionGroupResponse {
  permissionGroupId?: string;
}
export interface DisableUserRequest {
  userId: string;
  clientToken?: string;
}
export interface DisableUserResponse {
  userId?: string;
}
export interface DisassociateUserFromPermissionGroupRequest {
  permissionGroupId: string;
  userId: string;
  clientToken?: string;
}
export interface DisassociateUserFromPermissionGroupResponse {
  statusCode?: number;
}
export interface EnableUserRequest {
  userId: string;
  clientToken?: string;
}
export interface EnableUserResponse {
  userId?: string;
}
export interface GetChangesetRequest {
  datasetId: string;
  changesetId: string;
}
export type ChangesetArn = string;
export type IngestionStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCESS"
  | "RUNNING"
  | "STOP_REQUESTED"
  | (string & {});
export type ErrorMessage = string;
export type ErrorCategory =
  | "VALIDATION"
  | "SERVICE_QUOTA_EXCEEDED"
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "THROTTLING"
  | "INTERNAL_SERVICE_EXCEPTION"
  | "CANCELLED"
  | "USER_RECOVERABLE"
  | (string & {});
export interface ChangesetErrorInfo {
  errorMessage?: string;
  errorCategory?: ErrorCategory;
}
export interface GetChangesetResponse {
  changesetId?: string;
  changesetArn?: string;
  datasetId?: string;
  changeType?: ChangeType;
  sourceParams?: { [key: string]: string | undefined };
  formatParams?: { [key: string]: string | undefined };
  createTime?: number;
  status?: IngestionStatus;
  errorInfo?: ChangesetErrorInfo;
  activeUntilTimestamp?: number;
  activeFromTimestamp?: number;
  updatesChangesetId?: string;
  updatedByChangesetId?: string;
}
export interface GetDatasetRequest {
  datasetId: string;
}
export type DatasetArn = string;
export type DatasetStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCESS"
  | "RUNNING"
  | (string & {});
export interface GetDatasetResponse {
  datasetId?: string;
  datasetArn?: string;
  datasetTitle?: string;
  kind?: DatasetKind;
  datasetDescription?: string;
  createTime?: number;
  lastModifiedTime?: number;
  schemaDefinition?: SchemaUnion;
  alias?: string;
  status?: DatasetStatus;
}
export interface GetDataViewRequest {
  dataViewId: string;
  datasetId: string;
}
export interface DataViewErrorInfo {
  errorMessage?: string;
  errorCategory?: ErrorCategory;
}
export type DataViewArn = string;
export type DataViewStatus =
  | "RUNNING"
  | "STARTING"
  | "FAILED"
  | "CANCELLED"
  | "TIMEOUT"
  | "SUCCESS"
  | "PENDING"
  | "FAILED_CLEANUP_FAILED"
  | (string & {});
export interface GetDataViewResponse {
  autoUpdate?: boolean;
  partitionColumns?: string[];
  datasetId?: string;
  asOfTimestamp?: number;
  errorInfo?: DataViewErrorInfo;
  lastModifiedTime?: number;
  createTime?: number;
  sortColumns?: string[];
  dataViewId?: string;
  dataViewArn?: string;
  destinationTypeParams?: DataViewDestinationTypeParams;
  status?: DataViewStatus;
}
export interface GetExternalDataViewAccessDetailsRequest {
  dataViewId: string;
  datasetId: string;
}
export type AccessKeyId = string;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AwsCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: number;
}
export type S3BucketName = string;
export type S3Key = string;
export interface S3Location {
  bucket: string;
  key: string;
}
export interface GetExternalDataViewAccessDetailsResponse {
  credentials?: AwsCredentials;
  s3Location?: S3Location;
}
export interface GetPermissionGroupRequest {
  permissionGroupId: string;
}
export type PermissionGroupMembershipStatus =
  | "ADDITION_IN_PROGRESS"
  | "ADDITION_SUCCESS"
  | "REMOVAL_IN_PROGRESS"
  | (string & {});
export interface PermissionGroup {
  permissionGroupId?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions?: ApplicationPermission[];
  createTime?: number;
  lastModifiedTime?: number;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export interface GetPermissionGroupResponse {
  permissionGroup?: PermissionGroup;
}
export type SessionDuration = number;
export type IdType = string;
export interface GetProgrammaticAccessCredentialsRequest {
  durationInMinutes?: number;
  environmentId: string;
}
export type StringValueLength1to2552 = string;
export type StringValueMaxLength1000 = string;
export interface Credentials {
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}
export interface GetProgrammaticAccessCredentialsResponse {
  credentials?: Credentials;
  durationInMinutes?: number;
}
export interface GetUserRequest {
  userId: string;
}
export type UserStatus = "CREATING" | "ENABLED" | "DISABLED" | (string & {});
export interface GetUserResponse {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  createTime?: number;
  lastEnabledTime?: number;
  lastDisabledTime?: number;
  lastModifiedTime?: number;
  lastLoginTime?: number;
}
export type LocationType = "INGESTION" | "SAGEMAKER" | (string & {});
export interface GetWorkingLocationRequest {
  locationType?: LocationType;
}
export type StringValueLength1to1024 = string;
export type StringValueLength1to63 = string;
export interface GetWorkingLocationResponse {
  s3Uri?: string;
  s3Path?: string;
  s3Bucket?: string;
}
export type ResultLimit = number;
export type PaginationToken = string;
export interface ListChangesetsRequest {
  datasetId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ChangesetSummary {
  changesetId?: string;
  changesetArn?: string;
  datasetId?: string;
  changeType?: ChangeType;
  sourceParams?: { [key: string]: string | undefined };
  formatParams?: { [key: string]: string | undefined };
  createTime?: number;
  status?: IngestionStatus;
  errorInfo?: ChangesetErrorInfo;
  activeUntilTimestamp?: number;
  activeFromTimestamp?: number;
  updatesChangesetId?: string;
  updatedByChangesetId?: string;
}
export type ChangesetList = ChangesetSummary[];
export interface ListChangesetsResponse {
  changesets?: ChangesetSummary[];
  nextToken?: string;
}
export interface ListDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface Dataset {
  datasetId?: string;
  datasetArn?: string;
  datasetTitle?: string;
  kind?: DatasetKind;
  datasetDescription?: string;
  ownerInfo?: DatasetOwnerInfo;
  createTime?: number;
  lastModifiedTime?: number;
  schemaDefinition?: SchemaUnion;
  alias?: string;
}
export type DatasetList = Dataset[];
export interface ListDatasetsResponse {
  datasets?: Dataset[];
  nextToken?: string;
}
export interface ListDataViewsRequest {
  datasetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DataViewSummary {
  dataViewId?: string;
  dataViewArn?: string;
  datasetId?: string;
  asOfTimestamp?: number;
  partitionColumns?: string[];
  sortColumns?: string[];
  status?: DataViewStatus;
  errorInfo?: DataViewErrorInfo;
  destinationTypeProperties?: DataViewDestinationTypeParams;
  autoUpdate?: boolean;
  createTime?: number;
  lastModifiedTime?: number;
}
export type DataViewList = DataViewSummary[];
export interface ListDataViewsResponse {
  nextToken?: string;
  dataViews?: DataViewSummary[];
}
export interface ListPermissionGroupsRequest {
  nextToken?: string;
  maxResults: number;
}
export type PermissionGroupList = PermissionGroup[];
export interface ListPermissionGroupsResponse {
  permissionGroups?: PermissionGroup[];
  nextToken?: string;
}
export interface ListPermissionGroupsByUserRequest {
  userId: string;
  nextToken?: string;
  maxResults: number;
}
export interface PermissionGroupByUser {
  permissionGroupId?: string;
  name?: string | redacted.Redacted<string>;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export type PermissionGroupByUserList = PermissionGroupByUser[];
export interface ListPermissionGroupsByUserResponse {
  permissionGroups?: PermissionGroupByUser[];
  nextToken?: string;
}
export interface ListUsersRequest {
  nextToken?: string;
  maxResults: number;
}
export interface User {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  createTime?: number;
  lastEnabledTime?: number;
  lastDisabledTime?: number;
  lastModifiedTime?: number;
  lastLoginTime?: number;
}
export type UserList = User[];
export interface ListUsersResponse {
  users?: User[];
  nextToken?: string;
}
export interface ListUsersByPermissionGroupRequest {
  permissionGroupId: string;
  nextToken?: string;
  maxResults: number;
}
export interface UserByPermissionGroup {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export type UserByPermissionGroupList = UserByPermissionGroup[];
export interface ListUsersByPermissionGroupResponse {
  users?: UserByPermissionGroup[];
  nextToken?: string;
}
export interface ResetUserPasswordRequest {
  userId: string;
  clientToken?: string;
}
export type Password = string | redacted.Redacted<string>;
export interface ResetUserPasswordResponse {
  userId?: string;
  temporaryPassword?: string | redacted.Redacted<string>;
}
export interface UpdateChangesetRequest {
  clientToken?: string;
  datasetId: string;
  changesetId: string;
  sourceParams: { [key: string]: string | undefined };
  formatParams: { [key: string]: string | undefined };
}
export interface UpdateChangesetResponse {
  changesetId?: string;
  datasetId?: string;
}
export interface UpdateDatasetRequest {
  clientToken?: string;
  datasetId: string;
  datasetTitle: string;
  kind: DatasetKind;
  datasetDescription?: string;
  alias?: string;
  schemaDefinition?: SchemaUnion;
}
export interface UpdateDatasetResponse {
  datasetId?: string;
}
export interface UpdatePermissionGroupRequest {
  permissionGroupId: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions?: ApplicationPermission[];
  clientToken?: string;
}
export interface UpdatePermissionGroupResponse {
  permissionGroupId?: string;
}
export interface UpdateUserRequest {
  userId: string;
  type?: UserType;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  clientToken?: string;
}
export interface UpdateUserResponse {
  userId?: string;
}
export type ErrorMessage2 = string;
export type AssociateUserToPermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a user to a permission group to grant permissions for actions a user can perform in FinSpace.
 */
export const associateUserToPermissionGroup: API.OperationMethod<
  AssociateUserToPermissionGroupRequest,
  AssociateUserToPermissionGroupResponse,
  AssociateUserToPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /permission-group/{permissionGroupId}/users/{userId}",
    input: {
      permissionGroupId: 0,
      userId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { statusCode: D.m({ status: true }) },
    body: true,
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
  operationName: "AssociateUserToPermissionGroup",
})) as any;

export type CreateChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Changeset in a FinSpace Dataset.
 */
export const createChangeset: API.OperationMethod<
  CreateChangesetRequest,
  CreateChangesetResponse,
  CreateChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/changesetsv2",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetId: 0,
      changeType: 0,
      sourceParams: 0,
      formatParams: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChangeset",
})) as any;

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new FinSpace Dataset.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasetsv2",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetTitle: 0,
      kind: 0,
      datasetDescription: 0,
      ownerInfo: { name: 0, phoneNumber: 0, email: 0 },
      permissionGroupParams: {
        permissionGroupId: 0,
        datasetPermissions: D.list({ permission: 0 }),
      },
      alias: 0,
      schemaDefinition: i_SchemaUnion,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateDataViewError =
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Dataview for a Dataset.
 */
export const createDataView: API.OperationMethod<
  CreateDataViewRequest,
  CreateDataViewResponse,
  CreateDataViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/dataviewsv2",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetId: 0,
      autoUpdate: 0,
      sortColumns: 0,
      partitionColumns: 0,
      asOfTimestamp: 0,
      destinationTypeParams: {
        destinationType: 0,
        s3DestinationExportFileFormat: 0,
        s3DestinationExportFileFormatOptions: 0,
      },
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataView",
})) as any;

export type CreatePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group of permissions for various actions that a user can perform in FinSpace.
 */
export const createPermissionGroup: API.OperationMethod<
  CreatePermissionGroupRequest,
  CreatePermissionGroupResponse,
  CreatePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /permission-group",
    input: {
      name: 0,
      description: 0,
      applicationPermissions: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermissionGroup",
})) as any;

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new user in FinSpace.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user",
    input: {
      emailAddress: 0,
      type: 0,
      firstName: 0,
      lastName: 0,
      apiAccess: 0,
      apiAccessPrincipalArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a FinSpace Dataset.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /datasetsv2/{datasetId}",
    input: {
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      datasetId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
})) as any;

export type DeletePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a permission group. This action is irreversible.
 */
export const deletePermissionGroup: API.OperationMethod<
  DeletePermissionGroupRequest,
  DeletePermissionGroupResponse,
  DeletePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /permission-group/{permissionGroupId}",
    input: {
      permissionGroupId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionGroup",
})) as any;

export type DisableUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Denies access to the FinSpace web application and API for the specified user.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResponse,
  DisableUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user/{userId}/disable",
    input: { userId: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
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
  operationName: "DisableUser",
})) as any;

export type DisassociateUserFromPermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a user from a permission group.
 */
export const disassociateUserFromPermissionGroup: API.OperationMethod<
  DisassociateUserFromPermissionGroupRequest,
  DisassociateUserFromPermissionGroupResponse,
  DisassociateUserFromPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /permission-group/{permissionGroupId}/users/{userId}",
    input: {
      permissionGroupId: 0,
      userId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { statusCode: D.m({ status: true }) },
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
  operationName: "DisassociateUserFromPermissionGroup",
})) as any;

export type EnableUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows the specified user to access the FinSpace web application and API.
 */
export const enableUser: API.OperationMethod<
  EnableUserRequest,
  EnableUserResponse,
  EnableUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user/{userId}/enable",
    input: { userId: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableUser",
})) as any;

export type GetChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a Changeset.
 */
export const getChangeset: API.OperationMethod<
  GetChangesetRequest,
  GetChangesetResponse,
  GetChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/changesetsv2/{changesetId}",
    input: { datasetId: 0, changesetId: 0 },
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
  operationName: "GetChangeset",
})) as any;

export type GetDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a Dataset.
 */
export const getDataset: API.OperationMethod<
  GetDatasetRequest,
  GetDatasetResponse,
  GetDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasetsv2/{datasetId}",
    input: { datasetId: 0 },
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
  operationName: "GetDataset",
})) as any;

export type GetDataViewError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Dataview.
 */
export const getDataView: API.OperationMethod<
  GetDataViewRequest,
  GetDataViewResponse,
  GetDataViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/dataviewsv2/{dataViewId}",
    input: { dataViewId: 0, datasetId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataView",
})) as any;

export type GetExternalDataViewAccessDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the credentials to access the external Dataview from an S3 location. To call this API:
 *
 * - You must retrieve the programmatic credentials.
 *
 * - You must be a member of a FinSpace user group, where the dataset that you want to access has `Read Dataset Data` permissions.
 */
export const getExternalDataViewAccessDetails: API.OperationMethod<
  GetExternalDataViewAccessDetailsRequest,
  GetExternalDataViewAccessDetailsResponse,
  GetExternalDataViewAccessDetailsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/dataviewsv2/{dataViewId}/external-access-details",
    input: { dataViewId: 0, datasetId: 0 },
    output: {
      credentials: { secretAccessKey: D.secret, sessionToken: D.secret },
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
  operationName: "GetExternalDataViewAccessDetails",
})) as any;

export type GetPermissionGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific permission group.
 */
export const getPermissionGroup: API.OperationMethod<
  GetPermissionGroupRequest,
  GetPermissionGroupResponse,
  GetPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /permission-group/{permissionGroupId}",
    input: { permissionGroupId: 0 },
    output: { permissionGroup: o_PermissionGroup },
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
  operationName: "GetPermissionGroup",
})) as any;

export type GetProgrammaticAccessCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request programmatic credentials to use with FinSpace SDK. For more information, see Step 2. Access credentials programmatically using IAM access key id and secret access key.
 */
export const getProgrammaticAccessCredentials: API.OperationMethod<
  GetProgrammaticAccessCredentialsRequest,
  GetProgrammaticAccessCredentialsResponse,
  GetProgrammaticAccessCredentialsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /credentials/programmatic",
    input: {
      durationInMinutes: D.m({ query: "durationInMinutes" }),
      environmentId: D.m({ query: "environmentId" }),
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
  operationName: "GetProgrammaticAccessCredentials",
})) as any;

export type GetUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details for a specific user.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /user/{userId}",
    input: { userId: 0 },
    output: { firstName: D.secret, lastName: D.secret, emailAddress: D.secret },
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
  operationName: "GetUser",
})) as any;

export type GetWorkingLocationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A temporary Amazon S3 location, where you can copy your files from a source location to stage or use
 * as a scratch space in FinSpace notebook.
 */
export const getWorkingLocation: API.OperationMethod<
  GetWorkingLocationRequest,
  GetWorkingLocationResponse,
  GetWorkingLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workingLocationV1",
    input: { locationType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkingLocation",
})) as any;

export type ListChangesetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the FinSpace Changesets for a Dataset.
 */
export const listChangesets: API.PaginatedOperationMethod<
  ListChangesetsRequest,
  ListChangesetsResponse,
  ListChangesetsError,
  Creds | HttpClient.HttpClient,
  ChangesetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/changesetsv2",
    input: {
      datasetId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
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
  operationName: "ListChangesets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "changesets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the active Datasets that a user has access to.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Creds | HttpClient.HttpClient,
  Dataset
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasetsv2",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { datasets: D.list({ ownerInfo: { email: D.secret } }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataViewsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available Dataviews for a Dataset.
 */
export const listDataViews: API.PaginatedOperationMethod<
  ListDataViewsRequest,
  ListDataViewsResponse,
  ListDataViewsError,
  Creds | HttpClient.HttpClient,
  DataViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/dataviewsv2",
    input: {
      datasetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available permission groups in FinSpace.
 */
export const listPermissionGroups: API.PaginatedOperationMethod<
  ListPermissionGroupsRequest,
  ListPermissionGroupsResponse,
  ListPermissionGroupsError,
  Creds | HttpClient.HttpClient,
  PermissionGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /permission-group",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { permissionGroups: D.list(o_PermissionGroup) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissionGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionGroupsByUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the permission groups that are associated with a specific user.
 */
export const listPermissionGroupsByUser: API.OperationMethod<
  ListPermissionGroupsByUserRequest,
  ListPermissionGroupsByUserResponse,
  ListPermissionGroupsByUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /user/{userId}/permission-groups",
    input: {
      userId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { permissionGroups: D.list({ name: D.secret }) },
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
  operationName: "ListPermissionGroupsByUser",
})) as any;

export type ListUsersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available users in FinSpace.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Creds | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /user",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      users: D.list({
        firstName: D.secret,
        lastName: D.secret,
        emailAddress: D.secret,
      }),
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
  operationName: "ListUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsersByPermissionGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details of all the users in a specific permission group.
 */
export const listUsersByPermissionGroup: API.OperationMethod<
  ListUsersByPermissionGroupRequest,
  ListUsersByPermissionGroupResponse,
  ListUsersByPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /permission-group/{permissionGroupId}/users",
    input: {
      permissionGroupId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      users: D.list({
        firstName: D.secret,
        lastName: D.secret,
        emailAddress: D.secret,
      }),
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
  operationName: "ListUsersByPermissionGroup",
})) as any;

export type ResetUserPasswordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resets the password for a specified user ID and generates a temporary one. Only a superuser can reset password for other users. Resetting the password immediately invalidates the previous password associated with the user.
 */
export const resetUserPassword: API.OperationMethod<
  ResetUserPasswordRequest,
  ResetUserPasswordResponse,
  ResetUserPasswordError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user/{userId}/password",
    input: { userId: 0, clientToken: D.m({ idempotency: true }) },
    output: { temporaryPassword: D.secret },
    body: true,
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
  operationName: "ResetUserPassword",
})) as any;

export type UpdateChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a FinSpace Changeset.
 */
export const updateChangeset: API.OperationMethod<
  UpdateChangesetRequest,
  UpdateChangesetResponse,
  UpdateChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /datasets/{datasetId}/changesetsv2/{changesetId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetId: 0,
      changesetId: 0,
      sourceParams: 0,
      formatParams: 0,
    },
    body: true,
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
  operationName: "UpdateChangeset",
})) as any;

export type UpdateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a FinSpace Dataset.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /datasetsv2/{datasetId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetId: 0,
      datasetTitle: 0,
      kind: 0,
      datasetDescription: 0,
      alias: 0,
      schemaDefinition: i_SchemaUnion,
    },
    body: true,
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
  operationName: "UpdateDataset",
})) as any;

export type UpdatePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the details of a permission group. You cannot modify a `permissionGroupID`.
 */
export const updatePermissionGroup: API.OperationMethod<
  UpdatePermissionGroupRequest,
  UpdatePermissionGroupResponse,
  UpdatePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /permission-group/{permissionGroupId}",
    input: {
      permissionGroupId: 0,
      name: 0,
      description: 0,
      applicationPermissions: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "UpdatePermissionGroup",
})) as any;

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the details of the specified user. You cannot update the `userId` for a user.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /user/{userId}",
    input: {
      userId: 0,
      type: 0,
      firstName: 0,
      lastName: 0,
      apiAccess: 0,
      apiAccessPrincipalArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "UpdateUser",
})) as any;

const i_SchemaUnion: D.LazyStruct = () => ({
  tabularSchemaConfig: {
    columns: D.list({ dataType: 0, columnName: 0, columnDescription: 0 }),
    primaryKeyColumns: 0,
  },
});
const o_PermissionGroup: D.LazyStruct = () => ({
  name: D.secret,
  description: D.secret,
});
