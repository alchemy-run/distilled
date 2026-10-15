import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "finspace data",
  serviceShapeName: "AWSHabaneroPublicAPI",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "finspace-api" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-13");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://finspace-api.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DatasetStatus = "PENDING" | "FAILED" | "SUCCESS" | "RUNNING" | (string & {});
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
  input: __S(144, __c36, 0) as any as S.Schema<AssociateUserToPermissionGroupRequest>,
  output: __S(148, __c37, 0) as any as S.Schema<AssociateUserToPermissionGroupResponse>,
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
}));

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
  input: __S(152, __c38, 0) as any as S.Schema<CreateChangesetRequest>,
  output: __S(153, __c38, 1) as any as S.Schema<CreateChangesetResponse>,
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
}));

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
  input: __S(163, __c40, 3) as any as S.Schema<CreateDatasetRequest>,
  output: __S(168, __c42, 0) as any as S.Schema<CreateDatasetResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateDataViewRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateDataViewResponse>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<CreatePermissionGroupRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<CreatePermissionGroupResponse>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<CreateUserResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<DeleteDatasetRequest>,
  output: __S(168, __c42, 0) as any as S.Schema<DeleteDatasetResponse>,
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
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<DeletePermissionGroupRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<DeletePermissionGroupResponse>,
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
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<DisableUserRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<DisableUserResponse>,
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
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<DisassociateUserFromPermissionGroupRequest>,
  output: __S(148, __c37, 0) as any as S.Schema<DisassociateUserFromPermissionGroupResponse>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<EnableUserRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<EnableUserResponse>,
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
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<GetChangesetRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<GetChangesetResponse>,
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
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<GetDatasetRequest>,
  output: __S(61, __c15, 1) as any as S.Schema<GetDatasetResponse>,
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
}));

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
  input: __S(64, __c16, 0) as any as S.Schema<GetDataViewRequest>,
  output: __S(65, __c16, 1) as any as S.Schema<GetDataViewResponse>,
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
}));

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
  input: __S(68, __c17, 0) as any as S.Schema<GetExternalDataViewAccessDetailsRequest>,
  output: __S(71, __c17, 3) as any as S.Schema<GetExternalDataViewAccessDetailsResponse>,
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
}));

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
  input: __S(72, __c18, 0) as any as S.Schema<GetPermissionGroupRequest>,
  output: __S(73, __c18, 1) as any as S.Schema<GetPermissionGroupResponse>,
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
}));

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
  input: __S(80, __c20, 0) as any as S.Schema<GetProgrammaticAccessCredentialsRequest>,
  output: __S(82, __c20, 2) as any as S.Schema<GetProgrammaticAccessCredentialsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProgrammaticAccessCredentials",
}));

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
  input: __S(84, __c21, 0) as any as S.Schema<GetUserRequest>,
  output: __S(88, __c22, 0) as any as S.Schema<GetUserResponse>,
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
}));

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
  input: __S(92, __c23, 0) as any as S.Schema<GetWorkingLocationRequest>,
  output: __S(93, __c23, 1) as any as S.Schema<GetWorkingLocationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkingLocation",
}));

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
  input: __S(96, __c24, 0) as any as S.Schema<ListChangesetsRequest>,
  output: __S(98, __c24, 2) as any as S.Schema<ListChangesetsResponse>,
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
  input: __S(100, __c25, 0) as any as S.Schema<ListDatasetsRequest>,
  output: __S(103, __c25, 3) as any as S.Schema<ListDatasetsResponse>,
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
  input: __S(104, __c26, 0) as any as S.Schema<ListDataViewsRequest>,
  output: __S(107, __c26, 3) as any as S.Schema<ListDataViewsResponse>,
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
  input: __S(108, __c27, 0) as any as S.Schema<ListPermissionGroupsRequest>,
  output: __S(110, __c27, 2) as any as S.Schema<ListPermissionGroupsResponse>,
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
  input: __S(112, __c28, 0) as any as S.Schema<ListPermissionGroupsByUserRequest>,
  output: __S(115, __c28, 3) as any as S.Schema<ListPermissionGroupsByUserResponse>,
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
}));

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
  input: __S(116, __c29, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(118, __c29, 2) as any as S.Schema<ListUsersResponse>,
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
  input: __S(120, __c30, 0) as any as S.Schema<ListUsersByPermissionGroupRequest>,
  output: __S(123, __c30, 3) as any as S.Schema<ListUsersByPermissionGroupResponse>,
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
}));

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
  input: __S(124, __c31, 0) as any as S.Schema<ResetUserPasswordRequest>,
  output: __S(125, __c31, 1) as any as S.Schema<ResetUserPasswordResponse>,
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
}));

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
  input: __S(128, __c32, 0) as any as S.Schema<UpdateChangesetRequest>,
  output: __S(129, __c32, 1) as any as S.Schema<UpdateChangesetResponse>,
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
}));

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
  input: __S(132, __c33, 0) as any as S.Schema<UpdateDatasetRequest>,
  output: __S(168, __c42, 0) as any as S.Schema<UpdateDatasetResponse>,
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
}));

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
  input: __S(136, __c34, 0) as any as S.Schema<UpdatePermissionGroupRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<UpdatePermissionGroupResponse>,
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
}));

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
  input: __S(140, __c35, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<UpdateUserResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          autoUpdate: S.optional(S.Boolean),
          sortColumns: S.optional(__S(164, __c41, 0)),
          partitionColumns: S.optional(__S(164, __c41, 0)),
          asOfTimestamp: S.optional(S.Number),
          destinationTypeParams: __S(4, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/datasets/{datasetId}/dataviewsv2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ datasetId: S.optional(S.String), dataViewId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDataViewResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationType: S.String,
          s3DestinationExportFileFormat: S.optional(S.String),
          s3DestinationExportFileFormatOptions: S.optional(__S(156, __c39, 0)),
        }),
      ).annotate({ identifier: "DataViewDestinationTypeParams" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          applicationPermissions: __S(16, __c4, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/permission-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePermissionGroupRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ permissionGroupId: S.optional(S.String) })).annotate({
        identifier: "CreatePermissionGroupResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          emailAddress: SensitiveString,
          type: S.String,
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          apiAccess: S.optional(S.String),
          apiAccessPrincipalArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/user" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ userId: S.optional(S.String) })).annotate({
        identifier: "CreateUserResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/datasetsv2/{datasetId}" }),
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
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/permission-group/{permissionGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePermissionGroupRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.String.pipe(T.HttpLabel("userId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/{userId}/disable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableUserRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/permission-group/{permissionGroupId}/users/{userId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateUserFromPermissionGroupRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.String.pipe(T.HttpLabel("userId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/{userId}/enable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableUserRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          changesetId: S.String.pipe(T.HttpLabel("changesetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datasets/{datasetId}/changesetsv2/{changesetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChangesetRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ errorMessage: S.optional(S.String), errorCategory: S.optional(S.String) }),
      ).annotate({ identifier: "ChangesetErrorInfo" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          changesetId: S.optional(S.String),
          changesetArn: S.optional(S.String),
          datasetId: S.optional(S.String),
          changeType: S.optional(S.String),
          sourceParams: S.optional(__S(156, __c39, 0)),
          formatParams: S.optional(__S(156, __c39, 0)),
          createTime: S.optional(S.Number),
          status: S.optional(S.String),
          errorInfo: S.optional(__S(52, __c13, 0)),
          activeUntilTimestamp: S.optional(S.Number),
          activeFromTimestamp: S.optional(S.Number),
          updatesChangesetId: S.optional(S.String),
          updatedByChangesetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetChangesetResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetId: S.String.pipe(T.HttpLabel("datasetId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datasetsv2/{datasetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datasetId: S.optional(S.String),
          datasetArn: S.optional(S.String),
          datasetTitle: S.optional(S.String),
          kind: S.optional(S.String),
          datasetDescription: S.optional(S.String),
          createTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
          schemaDefinition: S.optional(__S(175, __c43, 3)),
          alias: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDatasetResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataViewId: S.String.pipe(T.HttpLabel("dataViewId")),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datasets/{datasetId}/dataviewsv2/{dataViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoUpdate: S.optional(S.Boolean),
          partitionColumns: S.optional(__S(164, __c41, 0)),
          datasetId: S.optional(S.String),
          asOfTimestamp: S.optional(S.Number),
          errorInfo: S.optional(__S(52, __c13, 0)),
          lastModifiedTime: S.optional(S.Number),
          createTime: S.optional(S.Number),
          sortColumns: S.optional(__S(164, __c41, 0)),
          dataViewId: S.optional(S.String),
          dataViewArn: S.optional(S.String),
          destinationTypeParams: S.optional(__S(4, __c1, 0)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataViewResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataViewId: S.String.pipe(T.HttpLabel("dataViewId")),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/datasets/{datasetId}/dataviewsv2/{dataViewId}/external-access-details",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExternalDataViewAccessDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.optional(S.String),
          secretAccessKey: S.optional(SensitiveString),
          sessionToken: S.optional(SensitiveString),
          expiration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsCredentials" });
    case 2:
      return S.suspend(() => S.Struct({ bucket: S.String, key: S.String })).annotate({
        identifier: "S3Location",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          credentials: S.optional(__S(69, __c17, 1)),
          s3Location: S.optional(__S(70, __c17, 2)),
        }),
      ).annotate({ identifier: "GetExternalDataViewAccessDetailsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/permission-group/{permissionGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPermissionGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ permissionGroup: S.optional(__S(76, __c19, 0)) })).annotate(
        { identifier: "GetPermissionGroupResponse" },
      );
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.optional(S.String),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          applicationPermissions: S.optional(__S(16, __c4, 0)),
          createTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
          membershipStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "PermissionGroup" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          durationInMinutes: S.optional(S.Number).pipe(T.HttpQuery("durationInMinutes")),
          environmentId: S.String.pipe(T.HttpQuery("environmentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/credentials/programmatic" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProgrammaticAccessCredentialsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.optional(S.String),
          secretAccessKey: S.optional(S.String),
          sessionToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "Credentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          credentials: S.optional(__S(81, __c20, 1)),
          durationInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetProgrammaticAccessCredentialsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userId: S.String.pipe(T.HttpLabel("userId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/user/{userId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String),
          status: S.optional(S.String),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          emailAddress: S.optional(SensitiveString),
          type: S.optional(S.String),
          apiAccess: S.optional(S.String),
          apiAccessPrincipalArn: S.optional(S.String),
          createTime: S.optional(S.Number),
          lastEnabledTime: S.optional(S.Number),
          lastDisabledTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
          lastLoginTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetUserResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ locationType: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workingLocationV1" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkingLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.optional(S.String),
          s3Path: S.optional(S.String),
          s3Bucket: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWorkingLocationResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datasets/{datasetId}/changesetsv2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChangesetsRequest" });
    case 1:
      return S.Array(__S(56, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ changesets: S.optional(__S(97, __c24, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChangesetsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/datasetsv2" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datasetId: S.optional(S.String),
          datasetArn: S.optional(S.String),
          datasetTitle: S.optional(S.String),
          kind: S.optional(S.String),
          datasetDescription: S.optional(S.String),
          ownerInfo: S.optional(__S(176, __c44, 0)),
          createTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
          schemaDefinition: S.optional(__S(175, __c43, 3)),
          alias: S.optional(S.String),
        }),
      ).annotate({ identifier: "Dataset" });
    case 2:
      return S.Array(__S(101, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ datasets: S.optional(__S(102, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatasetsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/datasets/{datasetId}/dataviewsv2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataViewsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataViewId: S.optional(S.String),
          dataViewArn: S.optional(S.String),
          datasetId: S.optional(S.String),
          asOfTimestamp: S.optional(S.Number),
          partitionColumns: S.optional(__S(164, __c41, 0)),
          sortColumns: S.optional(__S(164, __c41, 0)),
          status: S.optional(S.String),
          errorInfo: S.optional(__S(52, __c13, 0)),
          destinationTypeProperties: S.optional(__S(4, __c1, 0)),
          autoUpdate: S.optional(S.Boolean),
          createTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataViewSummary" });
    case 2:
      return S.Array(__S(105, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dataViews: S.optional(__S(106, __c26, 2)) }),
      ).annotate({ identifier: "ListDataViewsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/permission-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPermissionGroupsRequest" });
    case 1:
      return S.Array(__S(76, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          permissionGroups: S.optional(__S(109, __c27, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPermissionGroupsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.String.pipe(T.HttpLabel("userId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/user/{userId}/permission-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPermissionGroupsByUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.optional(S.String),
          name: S.optional(SensitiveString),
          membershipStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "PermissionGroupByUser" });
    case 2:
      return S.Array(__S(113, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          permissionGroups: S.optional(__S(114, __c28, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPermissionGroupsByUserResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/user" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.Array(__S(88, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ users: S.optional(__S(117, __c29, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/permission-group/{permissionGroupId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUsersByPermissionGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String),
          status: S.optional(S.String),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          emailAddress: S.optional(SensitiveString),
          type: S.optional(S.String),
          apiAccess: S.optional(S.String),
          apiAccessPrincipalArn: S.optional(S.String),
          membershipStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserByPermissionGroup" });
    case 2:
      return S.Array(__S(121, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ users: S.optional(__S(122, __c30, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsersByPermissionGroupResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.String.pipe(T.HttpLabel("userId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/user/{userId}/password" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetUserPasswordRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ userId: S.optional(S.String), temporaryPassword: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ResetUserPasswordResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          changesetId: S.String.pipe(T.HttpLabel("changesetId")),
          sourceParams: __S(156, __c39, 0),
          formatParams: __S(156, __c39, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/datasets/{datasetId}/changesetsv2/{changesetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChangesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ changesetId: S.optional(S.String), datasetId: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateChangesetResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          datasetTitle: S.String,
          kind: S.String,
          datasetDescription: S.optional(S.String),
          alias: S.optional(S.String),
          schemaDefinition: S.optional(__S(175, __c43, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/datasetsv2/{datasetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDatasetRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          applicationPermissions: S.optional(__S(16, __c4, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/permission-group/{permissionGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePermissionGroupRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.String.pipe(T.HttpLabel("userId")),
          type: S.optional(S.String),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          apiAccess: S.optional(S.String),
          apiAccessPrincipalArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/user/{userId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/permission-group/{permissionGroupId}/users/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateUserToPermissionGroupRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
      ).annotate({ identifier: "AssociateUserToPermissionGroupResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetId: S.String.pipe(T.HttpLabel("datasetId")),
          changeType: S.String,
          sourceParams: __S(156, __c39, 0),
          formatParams: __S(156, __c39, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/datasets/{datasetId}/changesetsv2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChangesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ datasetId: S.optional(S.String), changesetId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateChangesetResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ permission: S.optional(S.String) })).annotate({
        identifier: "ResourcePermission",
      });
    case 1:
      return S.Array(__S(160, __c40, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          permissionGroupId: S.optional(S.String),
          datasetPermissions: S.optional(__S(161, __c40, 1)),
        }),
      ).annotate({ identifier: "PermissionGroupParams" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetTitle: S.String,
          kind: S.String,
          datasetDescription: S.optional(S.String),
          ownerInfo: S.optional(__S(176, __c44, 0)),
          permissionGroupParams: __S(162, __c40, 2),
          alias: S.optional(S.String),
          schemaDefinition: S.optional(__S(175, __c43, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/datasetsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDatasetRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ datasetId: S.optional(S.String) })).annotate({
        identifier: "CreateDatasetResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataType: S.optional(S.String),
          columnName: S.optional(S.String),
          columnDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "ColumnDefinition" });
    case 1:
      return S.Array(__S(172, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          columns: S.optional(__S(173, __c43, 1)),
          primaryKeyColumns: S.optional(__S(164, __c41, 0)),
        }),
      ).annotate({ identifier: "SchemaDefinition" });
    case 3:
      return S.suspend(() =>
        S.Struct({ tabularSchemaConfig: S.optional(__S(174, __c43, 2)) }),
      ).annotate({ identifier: "SchemaUnion" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          phoneNumber: S.optional(S.String),
          email: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DatasetOwnerInfo" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
