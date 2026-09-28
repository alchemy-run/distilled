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
  sdkId: "LakeFormation",
  target: "AWSLakeFormation",
  version: "2017-03-31",
  sigv4: "lakeformation",
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
                `https://lakeformation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://lakeformation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://lakeformation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://lakeformation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("AlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class EntityNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("EntityNotFoundException")<{
    readonly message?: string;
  }> {}
export class ExpiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class GlueEncryptionException
  extends /*@__PURE__*/ TE.TaggedError("GlueEncryptionException")<{
    readonly message?: string;
  }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLakeFormationPrincipal
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLakeFormationPrincipal",
    ["BadRequestError", "RetryableError"],
    {
      synthetic: {
        from: "InvalidInputException",
        message: { includes: "Invalid principal" },
      },
    },
  )<{ readonly message?: string }> {}
export class LastServiceLinkedRoleRegistration
  extends /*@__PURE__*/ TE.TaggedError(
    "LastServiceLinkedRoleRegistration",
    ["ConflictError"],
    {
      synthetic: {
        from: "InvalidInputException",
        message: { includes: "Must manually delete service-linked role" },
      },
    },
  )<{ readonly message?: string }> {}
export class OperationTimeoutException
  extends /*@__PURE__*/ TE.TaggedError("OperationTimeoutException")<{
    readonly message?: string;
  }> {}
export class PermissionTypeMismatchException
  extends /*@__PURE__*/ TE.TaggedError("PermissionTypeMismatchException")<{
    readonly message?: string;
  }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotReadyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNumberLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNumberLimitExceededException")<{
    readonly message?: string;
  }> {}
export class StatisticsNotReadyYetException
  extends /*@__PURE__*/ TE.TaggedError("StatisticsNotReadyYetException", [], {
    status: 420,
  })<{ readonly message?: string }> {}
export class ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TransactionCanceledException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransactionCanceledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TransactionCommitInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransactionCommitInProgressException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TransactionCommittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransactionCommittedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WorkUnitsNotReadyYetException
  extends /*@__PURE__*/ TE.TaggedError("WorkUnitsNotReadyYetException", [], {
    status: 420,
  })<{ readonly message?: string }> {}
export type CatalogIdString = string;
export interface CatalogResource {
  Id?: string;
}
export type NameString = string;
export interface DatabaseResource {
  CatalogId?: string;
  Name: string;
}
export interface TableWildcard {}
export interface TableResource {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableWildcard?: TableWildcard;
}
export type ColumnNames = string[];
export interface ColumnWildcard {
  ExcludedColumnNames?: string[];
}
export interface TableWithColumnsResource {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  ColumnNames?: string[];
  ColumnWildcard?: ColumnWildcard;
}
export type ResourceArnString = string;
export interface DataLocationResource {
  CatalogId?: string;
  ResourceArn: string;
}
export interface DataCellsFilterResource {
  TableCatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  Name?: string;
}
export type LFTagValue = string;
export type TagValueList = string[];
export interface LFTagKeyResource {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export type ResourceType = "DATABASE" | "TABLE" | (string & {});
export type LFTagKey = string;
export interface LFTag {
  TagKey: string;
  TagValues: string[];
}
export type Expression = LFTag[];
export interface LFTagPolicyResource {
  CatalogId?: string;
  ResourceType: ResourceType;
  Expression?: LFTag[];
  ExpressionName?: string;
}
export interface LFTagExpressionResource {
  CatalogId?: string;
  Name: string;
}
export interface Resource {
  Catalog?: CatalogResource;
  Database?: DatabaseResource;
  Table?: TableResource;
  TableWithColumns?: TableWithColumnsResource;
  DataLocation?: DataLocationResource;
  DataCellsFilter?: DataCellsFilterResource;
  LFTag?: LFTagKeyResource;
  LFTagPolicy?: LFTagPolicyResource;
  LFTagExpression?: LFTagExpressionResource;
}
export interface LFTagPair {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export type LFTagsList = LFTagPair[];
export interface AddLFTagsToResourceRequest {
  CatalogId?: string;
  Resource: Resource;
  LFTags: LFTagPair[];
}
export type DescriptionString = string;
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export interface LFTagError {
  LFTag?: LFTagPair;
  Error?: ErrorDetail;
}
export type LFTagErrors = LFTagError[];
export interface AddLFTagsToResourceResponse {
  Failures?: LFTagError[];
}
export type SAMLAssertionString = string;
export type IAMRoleArn = string;
export type IAMSAMLProviderArn = string;
export type CredentialTimeoutDurationSecondInteger = number;
export interface AssumeDecoratedRoleWithSAMLRequest {
  SAMLAssertion: string;
  RoleArn: string;
  PrincipalArn: string;
  DurationSeconds?: number;
}
export type AccessKeyIdString = string;
export type SecretAccessKeyString = string;
export type SessionTokenString = string;
export type ExpirationTimestamp = Date;
export interface AssumeDecoratedRoleWithSAMLResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export type Identifier = string;
export type DataLakePrincipalString = string;
export interface DataLakePrincipal {
  DataLakePrincipalIdentifier?: string;
}
export type Permission =
  | "ALL"
  | "SELECT"
  | "ALTER"
  | "DROP"
  | "DELETE"
  | "INSERT"
  | "DESCRIBE"
  | "CREATE_DATABASE"
  | "CREATE_TABLE"
  | "DATA_LOCATION_ACCESS"
  | "CREATE_LF_TAG"
  | "ASSOCIATE"
  | "GRANT_WITH_LF_TAG_EXPRESSION"
  | "CREATE_LF_TAG_EXPRESSION"
  | "CREATE_CATALOG"
  | "SUPER_USER"
  | (string & {});
export type PermissionList = Permission[];
export type ExpressionString = string;
export interface Condition {
  Expression?: string;
}
export interface BatchPermissionsRequestEntry {
  Id: string;
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  Permissions?: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export type BatchPermissionsRequestEntryList = BatchPermissionsRequestEntry[];
export interface BatchGrantPermissionsRequest {
  CatalogId?: string;
  Entries: BatchPermissionsRequestEntry[];
}
export interface BatchPermissionsFailureEntry {
  RequestEntry?: BatchPermissionsRequestEntry;
  Error?: ErrorDetail;
}
export type BatchPermissionsFailureList = BatchPermissionsFailureEntry[];
export interface BatchGrantPermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[];
}
export interface BatchRevokePermissionsRequest {
  CatalogId?: string;
  Entries: BatchPermissionsRequestEntry[];
}
export interface BatchRevokePermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[];
}
export type TransactionIdString = string;
export interface CancelTransactionRequest {
  TransactionId: string;
}
export interface CancelTransactionResponse {}
export interface CommitTransactionRequest {
  TransactionId: string;
}
export type TransactionStatus =
  | "ACTIVE"
  | "COMMITTED"
  | "ABORTED"
  | "COMMIT_IN_PROGRESS"
  | (string & {});
export interface CommitTransactionResponse {
  TransactionStatus?: TransactionStatus;
}
export type PredicateString = string;
export interface AllRowsWildcard {}
export interface RowFilter {
  FilterExpression?: string;
  AllRowsWildcard?: AllRowsWildcard;
}
export type VersionString = string;
export interface DataCellsFilter {
  TableCatalogId: string;
  DatabaseName: string;
  TableName: string;
  Name: string;
  RowFilter?: RowFilter;
  ColumnNames?: string[];
  ColumnWildcard?: ColumnWildcard;
  VersionId?: string;
}
export interface CreateDataCellsFilterRequest {
  TableData: DataCellsFilter;
}
export interface CreateDataCellsFilterResponse {}
export type IdentityCenterInstanceArn = string;
export type EnableStatus = "ENABLED" | "DISABLED" | (string & {});
export type ScopeTarget = string;
export type ScopeTargets = string[];
export interface ExternalFilteringConfiguration {
  Status: EnableStatus;
  AuthorizedTargets: string[];
}
export type DataLakePrincipalList = DataLakePrincipal[];
export type ServiceAuthorization = "ENABLED" | "DISABLED" | (string & {});
export interface RedshiftConnect {
  Authorization: ServiceAuthorization;
}
export type RedshiftScopeUnion = { RedshiftConnect: RedshiftConnect };
export type RedshiftServiceIntegrations = RedshiftScopeUnion[];
export type ServiceIntegrationUnion = { Redshift: RedshiftScopeUnion[] };
export type ServiceIntegrationList = ServiceIntegrationUnion[];
export interface CreateLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
  InstanceArn?: string;
  ExternalFiltering?: ExternalFilteringConfiguration;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
}
export type ApplicationArn = string;
export interface CreateLakeFormationIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
}
export interface CreateLakeFormationOptInRequest {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}
export interface CreateLakeFormationOptInResponse {}
export interface CreateLFTagRequest {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export interface CreateLFTagResponse {}
export interface CreateLFTagExpressionRequest {
  Name: string;
  Description?: string;
  CatalogId?: string;
  Expression: LFTag[];
}
export interface CreateLFTagExpressionResponse {}
export interface DeleteDataCellsFilterRequest {
  TableCatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  Name?: string;
}
export interface DeleteDataCellsFilterResponse {}
export interface DeleteLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
}
export interface DeleteLakeFormationIdentityCenterConfigurationResponse {}
export interface DeleteLakeFormationOptInRequest {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}
export interface DeleteLakeFormationOptInResponse {}
export interface DeleteLFTagRequest {
  CatalogId?: string;
  TagKey: string;
}
export interface DeleteLFTagResponse {}
export interface DeleteLFTagExpressionRequest {
  Name: string;
  CatalogId?: string;
}
export interface DeleteLFTagExpressionResponse {}
export type URI = string;
export type ETagString = string;
export interface VirtualObject {
  Uri: string;
  ETag?: string;
}
export type VirtualObjectList = VirtualObject[];
export interface DeleteObjectsOnCancelRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId: string;
  Objects: VirtualObject[];
}
export interface DeleteObjectsOnCancelResponse {}
export interface DeregisterResourceRequest {
  ResourceArn: string;
}
export interface DeregisterResourceResponse {}
export interface DescribeLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
}
export type RAMResourceShareArn = string;
export interface DescribeLakeFormationIdentityCenterConfigurationResponse {
  CatalogId?: string;
  InstanceArn?: string;
  ApplicationArn?: string;
  ExternalFiltering?: ExternalFilteringConfiguration;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
  ResourceShare?: string;
}
export interface DescribeResourceRequest {
  ResourceArn: string;
}
export type LastModifiedTimestamp = Date;
export type VerificationStatus =
  | "VERIFIED"
  | "VERIFICATION_FAILED"
  | "NOT_VERIFIED"
  | (string & {});
export type AccountIdString = string;
export interface ResourceInfo {
  ResourceArn?: string;
  RoleArn?: string;
  LastModified?: Date;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  WithPrivilegedAccess?: boolean;
  VerificationStatus?: VerificationStatus;
  ExpectedResourceOwnerAccount?: string;
}
export interface DescribeResourceResponse {
  ResourceInfo?: ResourceInfo;
}
export interface DescribeTransactionRequest {
  TransactionId: string;
}
export interface TransactionDescription {
  TransactionId?: string;
  TransactionStatus?: TransactionStatus;
  TransactionStartTime?: Date;
  TransactionEndTime?: Date;
}
export interface DescribeTransactionResponse {
  TransactionDescription?: TransactionDescription;
}
export interface ExtendTransactionRequest {
  TransactionId?: string;
}
export interface ExtendTransactionResponse {}
export interface GetDataCellsFilterRequest {
  TableCatalogId: string;
  DatabaseName: string;
  TableName: string;
  Name: string;
}
export interface GetDataCellsFilterResponse {
  DataCellsFilter?: DataCellsFilter;
}
export interface GetDataLakePrincipalRequest {}
export type IdentityString = string;
export interface GetDataLakePrincipalResponse {
  Identity?: string;
}
export interface GetDataLakeSettingsRequest {
  CatalogId?: string;
}
export interface PrincipalPermissions {
  Principal?: DataLakePrincipal;
  Permissions?: Permission[];
}
export type PrincipalPermissionsList = PrincipalPermissions[];
export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export type TrustedResourceOwners = string[];
export type AuthorizedSessionTagValueList = string[];
export interface DataLakeSettings {
  DataLakeAdmins?: DataLakePrincipal[];
  ReadOnlyAdmins?: DataLakePrincipal[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  Parameters?: { [key: string]: string | undefined };
  TrustedResourceOwners?: string[];
  AllowExternalDataFiltering?: boolean;
  AllowFullTableExternalDataAccess?: boolean;
  ExternalDataFilteringAllowList?: DataLakePrincipal[];
  AuthorizedSessionTagValueList?: string[];
}
export interface GetDataLakeSettingsResponse {
  DataLakeSettings?: DataLakeSettings;
}
export type Token = string;
export type PageSize = number;
export interface GetEffectivePermissionsForPathRequest {
  CatalogId?: string;
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ResourceShareList = string[];
export interface DetailsMap {
  ResourceShare?: string[];
}
export interface PrincipalResourcePermissions {
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  Condition?: Condition;
  Permissions?: Permission[];
  PermissionsWithGrantOption?: Permission[];
  AdditionalDetails?: DetailsMap;
  LastUpdated?: Date;
  LastUpdatedBy?: string;
}
export type PrincipalResourcePermissionsList = PrincipalResourcePermissions[];
export interface GetEffectivePermissionsForPathResponse {
  Permissions?: PrincipalResourcePermissions[];
  NextToken?: string;
}
export interface GetLFTagRequest {
  CatalogId?: string;
  TagKey: string;
}
export interface GetLFTagResponse {
  CatalogId?: string;
  TagKey?: string;
  TagValues?: string[];
}
export interface GetLFTagExpressionRequest {
  Name: string;
  CatalogId?: string;
}
export interface GetLFTagExpressionResponse {
  Name?: string;
  Description?: string;
  CatalogId?: string;
  Expression?: LFTag[];
}
export type GetQueryStateRequestQueryIdString = string;
export interface GetQueryStateRequest {
  QueryId: string;
}
export type ErrorMessageString = string;
export type QueryStateString =
  | "PENDING"
  | "WORKUNITS_AVAILABLE"
  | "ERROR"
  | "FINISHED"
  | "EXPIRED"
  | (string & {});
export interface GetQueryStateResponse {
  Error?: string;
  State: QueryStateString;
}
export type GetQueryStatisticsRequestQueryIdString = string;
export interface GetQueryStatisticsRequest {
  QueryId: string;
}
export type NumberOfMilliseconds = number;
export type NumberOfBytes = number;
export type NumberOfItems = number;
export interface ExecutionStatistics {
  AverageExecutionTimeMillis?: number;
  DataScannedBytes?: number;
  WorkUnitsExecutedCount?: number;
}
export interface PlanningStatistics {
  EstimatedDataToScanBytes?: number;
  PlanningTimeMillis?: number;
  QueueTimeMillis?: number;
  WorkUnitsGeneratedCount?: number;
}
export interface GetQueryStatisticsResponse {
  ExecutionStatistics?: ExecutionStatistics;
  PlanningStatistics?: PlanningStatistics;
  QuerySubmissionTime?: Date;
}
export type BooleanNullable = boolean;
export interface GetResourceLFTagsRequest {
  CatalogId?: string;
  Resource: Resource;
  ShowAssignedLFTags?: boolean;
}
export interface ColumnLFTag {
  Name?: string;
  LFTags?: LFTagPair[];
}
export type ColumnLFTagsList = ColumnLFTag[];
export interface GetResourceLFTagsResponse {
  LFTagOnDatabase?: LFTagPair[];
  LFTagsOnTable?: LFTagPair[];
  LFTagsOnColumns?: ColumnLFTag[];
}
export type TokenString = string;
export interface GetTableObjectsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  PartitionPredicate?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type PartitionValueString = string;
export type PartitionValuesList = string[];
export type ObjectSize = number;
export interface TableObject {
  Uri?: string;
  ETag?: string;
  Size?: number;
}
export type TableObjectList = TableObject[];
export interface PartitionObjects {
  PartitionValues?: string[];
  Objects?: TableObject[];
}
export type PartitionedTableObjectsList = PartitionObjects[];
export interface GetTableObjectsResponse {
  Objects?: PartitionObjects[];
  NextToken?: string;
}
export type AuditContextString = string;
export interface AuditContext {
  AdditionalAuditContext?: string;
}
export type PathString = string;
export type PathStringList = string[];
export type CredentialsScope = "READ" | "READWRITE" | (string & {});
export interface GetTemporaryDataLocationCredentialsRequest {
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  DataLocations?: string[];
  CredentialsScope?: CredentialsScope;
}
export interface TemporaryCredentials {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export interface GetTemporaryDataLocationCredentialsResponse {
  Credentials?: TemporaryCredentials;
  AccessibleDataLocations?: string[];
  CredentialsScope?: CredentialsScope;
}
export type ValueString = string;
export type ValueStringList = string[];
export interface PartitionValueList {
  Values: string[];
}
export type PermissionType =
  | "COLUMN_PERMISSION"
  | "CELL_FILTER_PERMISSION"
  | "NESTED_PERMISSION"
  | "NESTED_CELL_PERMISSION"
  | (string & {});
export type PermissionTypeList = PermissionType[];
export interface GetTemporaryGluePartitionCredentialsRequest {
  TableArn: string;
  Partition: PartitionValueList;
  Permissions?: Permission[];
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  SupportedPermissionTypes?: PermissionType[];
}
export interface GetTemporaryGluePartitionCredentialsResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export type HashString = string;
export type NullableString = string;
export type ContextKey = string;
export type ContextValue = string;
export type AdditionalContextMap = { [key: string]: string | undefined };
export interface QuerySessionContext {
  QueryId?: string;
  QueryStartTime?: Date;
  ClusterId?: string;
  QueryAuthorizationId?: string;
  AdditionalContext?: { [key: string]: string | undefined };
}
export interface GetTemporaryGlueTableCredentialsRequest {
  TableArn: string;
  Permissions?: Permission[];
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  SupportedPermissionTypes?: PermissionType[];
  S3Path?: string;
  QuerySessionContext?: QuerySessionContext;
}
export interface GetTemporaryGlueTableCredentialsResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
  VendedS3Path?: string[];
}
export type GetWorkUnitResultsRequestQueryIdString = string;
export type GetWorkUnitResultsRequestWorkUnitIdLong = number;
export type SyntheticGetWorkUnitResultsRequestWorkUnitTokenString =
  | string
  | redacted.Redacted<string>;
export interface GetWorkUnitResultsRequest {
  QueryId: string;
  WorkUnitId: number;
  WorkUnitToken: string | redacted.Redacted<string>;
}
export interface GetWorkUnitResultsResponse {
  ResultStream?: T.StreamingOutputBody;
}
export type GetWorkUnitsRequestQueryIdString = string;
export interface GetWorkUnitsRequest {
  NextToken?: string;
  PageSize?: number;
  QueryId: string;
}
export type QueryIdString = string;
export type WorkUnitIdLong = number;
export type WorkUnitTokenString = string;
export interface WorkUnitRange {
  WorkUnitIdMax: number;
  WorkUnitIdMin: number;
  WorkUnitToken: string;
}
export type WorkUnitRangeList = WorkUnitRange[];
export interface GetWorkUnitsResponse {
  NextToken?: string;
  QueryId: string;
  WorkUnitRanges: WorkUnitRange[];
}
export interface GrantPermissionsRequest {
  CatalogId?: string;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export interface GrantPermissionsResponse {}
export interface ListDataCellsFilterRequest {
  Table?: TableResource;
  NextToken?: string;
  MaxResults?: number;
}
export type DataCellsFilterList = DataCellsFilter[];
export interface ListDataCellsFilterResponse {
  DataCellsFilters?: DataCellsFilter[];
  NextToken?: string;
}
export interface ListLakeFormationOptInsRequest {
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  MaxResults?: number;
  NextToken?: string;
}
export interface LakeFormationOptInsInfo {
  Resource?: Resource;
  Principal?: DataLakePrincipal;
  Condition?: Condition;
  LastModified?: Date;
  LastUpdatedBy?: string;
}
export type LakeFormationOptInsInfoList = LakeFormationOptInsInfo[];
export interface ListLakeFormationOptInsResponse {
  LakeFormationOptInsInfoList?: LakeFormationOptInsInfo[];
  NextToken?: string;
}
export interface ListLFTagExpressionsRequest {
  CatalogId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface LFTagExpression {
  Name?: string;
  Description?: string;
  CatalogId?: string;
  Expression?: LFTag[];
}
export type LFTagExpressionsList = LFTagExpression[];
export interface ListLFTagExpressionsResponse {
  LFTagExpressions?: LFTagExpression[];
  NextToken?: string;
}
export type ResourceShareType = "FOREIGN" | "ALL" | (string & {});
export interface ListLFTagsRequest {
  CatalogId?: string;
  ResourceShareType?: ResourceShareType;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListLFTagsResponse {
  LFTags?: LFTagPair[];
  NextToken?: string;
}
export type DataLakeResourceType =
  | "CATALOG"
  | "DATABASE"
  | "TABLE"
  | "DATA_LOCATION"
  | "LF_TAG"
  | "LF_TAG_POLICY"
  | "LF_TAG_POLICY_DATABASE"
  | "LF_TAG_POLICY_TABLE"
  | "LF_NAMED_TAG_EXPRESSION"
  | (string & {});
export type TrueFalseString = string;
export interface ListPermissionsRequest {
  CatalogId?: string;
  Principal?: DataLakePrincipal;
  ResourceType?: DataLakeResourceType;
  Resource?: Resource;
  NextToken?: string;
  MaxResults?: number;
  IncludeRelated?: string;
}
export interface ListPermissionsResponse {
  PrincipalResourcePermissions?: PrincipalResourcePermissions[];
  NextToken?: string;
}
export type FieldNameString =
  | "RESOURCE_ARN"
  | "ROLE_ARN"
  | "LAST_MODIFIED"
  | (string & {});
export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BEGINS_WITH"
  | "IN"
  | "BETWEEN"
  | (string & {});
export type StringValue = string;
export type StringValueList = string[];
export interface FilterCondition {
  Field?: FieldNameString;
  ComparisonOperator?: ComparisonOperator;
  StringValueList?: string[];
}
export type FilterConditionList = FilterCondition[];
export interface ListResourcesRequest {
  FilterConditionList?: FilterCondition[];
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceInfoList = ResourceInfo[];
export interface ListResourcesResponse {
  ResourceInfoList?: ResourceInfo[];
  NextToken?: string;
}
export type OptimizerType =
  | "COMPACTION"
  | "GARBAGE_COLLECTION"
  | "ALL"
  | (string & {});
export interface ListTableStorageOptimizersRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  StorageOptimizerType?: OptimizerType;
  MaxResults?: number;
  NextToken?: string;
}
export type StorageOptimizerConfigKey = string;
export type StorageOptimizerConfigValue = string;
export type StorageOptimizerConfig = { [key: string]: string | undefined };
export type MessageString = string;
export interface StorageOptimizer {
  StorageOptimizerType?: OptimizerType;
  Config?: { [key: string]: string | undefined };
  ErrorMessage?: string;
  Warnings?: string;
  LastRunDetails?: string;
}
export type StorageOptimizerList = StorageOptimizer[];
export interface ListTableStorageOptimizersResponse {
  StorageOptimizerList?: StorageOptimizer[];
  NextToken?: string;
}
export type TransactionStatusFilter =
  | "ALL"
  | "COMPLETED"
  | "ACTIVE"
  | "COMMITTED"
  | "ABORTED"
  | (string & {});
export interface ListTransactionsRequest {
  CatalogId?: string;
  StatusFilter?: TransactionStatusFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type TransactionDescriptionList = TransactionDescription[];
export interface ListTransactionsResponse {
  Transactions?: TransactionDescription[];
  NextToken?: string;
}
export interface PutDataLakeSettingsRequest {
  CatalogId?: string;
  DataLakeSettings: DataLakeSettings;
}
export interface PutDataLakeSettingsResponse {}
export interface RegisterResourceRequest {
  ResourceArn: string;
  UseServiceLinkedRole?: boolean;
  RoleArn?: string;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  WithPrivilegedAccess?: boolean;
  ExpectedResourceOwnerAccount?: string;
}
export interface RegisterResourceResponse {}
export interface RemoveLFTagsFromResourceRequest {
  CatalogId?: string;
  Resource: Resource;
  LFTags: LFTagPair[];
}
export interface RemoveLFTagsFromResourceResponse {
  Failures?: LFTagError[];
}
export interface RevokePermissionsRequest {
  CatalogId?: string;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export interface RevokePermissionsResponse {}
export type SearchPageSize = number;
export interface SearchDatabasesByLFTagsRequest {
  NextToken?: string;
  MaxResults?: number;
  CatalogId?: string;
  Expression: LFTag[];
}
export interface TaggedDatabase {
  Database?: DatabaseResource;
  LFTags?: LFTagPair[];
}
export type DatabaseLFTagsList = TaggedDatabase[];
export interface SearchDatabasesByLFTagsResponse {
  NextToken?: string;
  DatabaseList?: TaggedDatabase[];
}
export interface SearchTablesByLFTagsRequest {
  NextToken?: string;
  MaxResults?: number;
  CatalogId?: string;
  Expression: LFTag[];
}
export interface TaggedTable {
  Table?: TableResource;
  LFTagOnDatabase?: LFTagPair[];
  LFTagsOnTable?: LFTagPair[];
  LFTagsOnColumns?: ColumnLFTag[];
}
export type TableLFTagsList = TaggedTable[];
export interface SearchTablesByLFTagsResponse {
  NextToken?: string;
  TableList?: TaggedTable[];
}
export type QueryPlanningContextDatabaseNameString = string;
export type QueryParameterMap = { [key: string]: string | undefined };
export interface QueryPlanningContext {
  CatalogId?: string;
  DatabaseName: string;
  QueryAsOfTime?: Date;
  QueryParameters?: { [key: string]: string | undefined };
  TransactionId?: string;
}
export type SyntheticStartQueryPlanningRequestQueryString =
  | string
  | redacted.Redacted<string>;
export interface StartQueryPlanningRequest {
  QueryPlanningContext: QueryPlanningContext;
  QueryString: string | redacted.Redacted<string>;
}
export interface StartQueryPlanningResponse {
  QueryId: string;
}
export type TransactionType = "READ_AND_WRITE" | "READ_ONLY" | (string & {});
export interface StartTransactionRequest {
  TransactionType?: TransactionType;
}
export interface StartTransactionResponse {
  TransactionId?: string;
}
export interface UpdateDataCellsFilterRequest {
  TableData: DataCellsFilter;
}
export interface UpdateDataCellsFilterResponse {}
export type ApplicationStatus = "ENABLED" | "DISABLED" | (string & {});
export interface UpdateLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
  ApplicationStatus?: ApplicationStatus;
  ExternalFiltering?: ExternalFilteringConfiguration;
}
export interface UpdateLakeFormationIdentityCenterConfigurationResponse {}
export interface UpdateLFTagRequest {
  CatalogId?: string;
  TagKey: string;
  TagValuesToDelete?: string[];
  TagValuesToAdd?: string[];
}
export interface UpdateLFTagResponse {}
export interface UpdateLFTagExpressionRequest {
  Name: string;
  Description?: string;
  CatalogId?: string;
  Expression: LFTag[];
}
export interface UpdateLFTagExpressionResponse {}
export interface UpdateResourceRequest {
  RoleArn: string;
  ResourceArn: string;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  ExpectedResourceOwnerAccount?: string;
}
export interface UpdateResourceResponse {}
export interface AddObjectInput {
  Uri: string;
  ETag: string;
  Size: number;
  PartitionValues?: string[];
}
export interface DeleteObjectInput {
  Uri: string;
  ETag?: string;
  PartitionValues?: string[];
}
export interface WriteOperation {
  AddObject?: AddObjectInput;
  DeleteObject?: DeleteObjectInput;
}
export type WriteOperationList = WriteOperation[];
export interface UpdateTableObjectsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId?: string;
  WriteOperations: WriteOperation[];
}
export interface UpdateTableObjectsResponse {}
export type StorageOptimizerConfigMap = {
  [key in OptimizerType]?: { [key: string]: string | undefined };
};
export interface UpdateTableStorageOptimizerRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  StorageOptimizerConfig: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export type Result = string;
export interface UpdateTableStorageOptimizerResponse {
  Result?: string;
}
export type AddLFTagsToResourceError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Attaches one or more LF-tags to an existing resource.
 */
export const addLFTagsToResource: API.OperationMethod<
  AddLFTagsToResourceRequest,
  AddLFTagsToResourceResponse,
  AddLFTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AddLFTagsToResource",
    input: { CatalogId: 0, Resource: i_Resource, LFTags: D.list(i_LFTagPair) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddLFTagsToResource",
})) as any;

export type AssumeDecoratedRoleWithSAMLError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Allows a caller to assume an IAM role decorated as the SAML user specified in the SAML assertion included in the request. This decoration allows Lake Formation to enforce access policies against the SAML users and groups. This API operation requires SAML federation setup in the caller’s account as it can only be called with valid SAML assertions.
 * Lake Formation does not scope down the permission of the assumed role. All permissions attached to the role via the SAML federation setup will be included in the role session.
 *
 * This decorated role is expected to access data in Amazon S3 by getting temporary access from Lake Formation which is authorized via the virtual API `GetDataAccess`.
 * Therefore, all SAML roles that can be assumed via `AssumeDecoratedRoleWithSAML` must at a minimum include `lakeformation:GetDataAccess` in their role policies.
 * A typical IAM policy attached to such a role would include the following actions:
 *
 * - glue:*Database*
 *
 * - glue:*Table*
 *
 * - glue:*Partition*
 *
 * - glue:*UserDefinedFunction*
 *
 * - lakeformation:GetDataAccess
 */
export const assumeDecoratedRoleWithSAML: API.OperationMethod<
  AssumeDecoratedRoleWithSAMLRequest,
  AssumeDecoratedRoleWithSAMLResponse,
  AssumeDecoratedRoleWithSAMLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AssumeDecoratedRoleWithSAML",
    input: {
      SAMLAssertion: 0,
      RoleArn: 0,
      PrincipalArn: 0,
      DurationSeconds: 0,
    },
    output: {
      SecretAccessKey: D.secret,
      SessionToken: D.secret,
      Expiration: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeDecoratedRoleWithSAML",
})) as any;

export type BatchGrantPermissionsError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Batch operation to grant permissions to the principal.
 */
export const batchGrantPermissions: API.OperationMethod<
  BatchGrantPermissionsRequest,
  BatchGrantPermissionsResponse,
  BatchGrantPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGrantPermissions",
    input: { CatalogId: 0, Entries: D.list(i_BatchPermissionsRequestEntry) },
    body: true,
  },
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGrantPermissions",
})) as any;

export type BatchRevokePermissionsError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Batch operation to revoke permissions from the principal.
 */
export const batchRevokePermissions: API.OperationMethod<
  BatchRevokePermissionsRequest,
  BatchRevokePermissionsResponse,
  BatchRevokePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchRevokePermissions",
    input: { CatalogId: 0, Entries: D.list(i_BatchPermissionsRequestEntry) },
    body: true,
  },
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRevokePermissions",
})) as any;

export type CancelTransactionError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Attempts to cancel the specified transaction. Returns an exception if the transaction was previously committed.
 */
export const cancelTransaction: API.OperationMethod<
  CancelTransactionRequest,
  CancelTransactionResponse,
  CancelTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CancelTransaction",
    input: { TransactionId: 0 },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTransaction",
})) as any;

export type CommitTransactionError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCanceledException
  | CommonErrors;
/**
 * Attempts to commit the specified transaction. Returns an exception if the transaction was previously aborted. This API action is idempotent if called multiple times for the same transaction.
 */
export const commitTransaction: API.OperationMethod<
  CommitTransactionRequest,
  CommitTransactionResponse,
  CommitTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CommitTransaction",
    input: { TransactionId: 0 },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCanceledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CommitTransaction",
})) as any;

export type CreateDataCellsFilterError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a data cell filter to allow one to grant access to certain columns on certain rows.
 */
export const createDataCellsFilter: API.OperationMethod<
  CreateDataCellsFilterRequest,
  CreateDataCellsFilterResponse,
  CreateDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateDataCellsFilter",
    input: { TableData: i_DataCellsFilter },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataCellsFilter",
})) as any;

export type CreateLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates an IAM Identity Center connection with Lake Formation to allow IAM Identity Center users and groups to access Data Catalog resources.
 */
export const createLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  CreateLakeFormationIdentityCenterConfigurationRequest,
  CreateLakeFormationIdentityCenterConfigurationResponse,
  CreateLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLakeFormationIdentityCenterConfiguration",
    input: {
      CatalogId: 0,
      InstanceArn: 0,
      ExternalFiltering: i_ExternalFilteringConfiguration,
      ShareRecipients: D.list(i_DataLakePrincipal),
      ServiceIntegrations: D.list(i_ServiceIntegrationUnion),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLakeFormationIdentityCenterConfiguration",
})) as any;

export type CreateLakeFormationOptInError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Enforce Lake Formation permissions for the given databases, tables, and principals.
 */
export const createLakeFormationOptIn: API.OperationMethod<
  CreateLakeFormationOptInRequest,
  CreateLakeFormationOptInResponse,
  CreateLakeFormationOptInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLakeFormationOptIn",
    input: {
      Principal: i_DataLakePrincipal,
      Resource: i_Resource,
      Condition: i_Condition,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLakeFormationOptIn",
})) as any;

export type CreateLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an LF-tag with the specified name and values.
 */
export const createLFTag: API.OperationMethod<
  CreateLFTagRequest,
  CreateLFTagResponse,
  CreateLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLFTag",
    input: { CatalogId: 0, TagKey: 0, TagValues: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLFTag",
})) as any;

export type CreateLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new LF-Tag expression with the provided name, description, catalog ID, and
 * expression body. This call fails if a LF-Tag expression with the same name already exists in
 * the caller’s account or if the underlying LF-Tags don't exist. To call this API operation,
 * caller needs the following Lake Formation permissions:
 *
 * `CREATE_LF_TAG_EXPRESSION` on the root catalog resource.
 *
 * `GRANT_WITH_LF_TAG_EXPRESSION` on all underlying LF-Tag key:value pairs
 * included in the expression.
 */
export const createLFTagExpression: API.OperationMethod<
  CreateLFTagExpressionRequest,
  CreateLFTagExpressionResponse,
  CreateLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLFTagExpression",
    input: {
      Name: 0,
      Description: 0,
      CatalogId: 0,
      Expression: D.list(i_LFTag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLFTagExpression",
})) as any;

export type DeleteDataCellsFilterError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a data cell filter.
 */
export const deleteDataCellsFilter: API.OperationMethod<
  DeleteDataCellsFilterRequest,
  DeleteDataCellsFilterResponse,
  DeleteDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteDataCellsFilter",
    input: { TableCatalogId: 0, DatabaseName: 0, TableName: 0, Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataCellsFilter",
})) as any;

export type DeleteLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an IAM Identity Center connection with Lake Formation.
 */
export const deleteLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  DeleteLakeFormationIdentityCenterConfigurationRequest,
  DeleteLakeFormationIdentityCenterConfigurationResponse,
  DeleteLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLakeFormationIdentityCenterConfiguration",
    input: { CatalogId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLakeFormationIdentityCenterConfiguration",
})) as any;

export type DeleteLakeFormationOptInError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Remove the Lake Formation permissions enforcement of the given databases, tables, and principals.
 */
export const deleteLakeFormationOptIn: API.OperationMethod<
  DeleteLakeFormationOptInRequest,
  DeleteLakeFormationOptInResponse,
  DeleteLakeFormationOptInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLakeFormationOptIn",
    input: {
      Principal: i_DataLakePrincipal,
      Resource: i_Resource,
      Condition: i_Condition,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLakeFormationOptIn",
})) as any;

export type DeleteLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an LF-tag by its key name. The operation fails if the specified tag key doesn't
 * exist. When you delete an LF-Tag:
 *
 * - The associated LF-Tag policy becomes invalid.
 *
 * - Resources that had this tag assigned will no longer have the tag policy applied to
 * them.
 */
export const deleteLFTag: API.OperationMethod<
  DeleteLFTagRequest,
  DeleteLFTagResponse,
  DeleteLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLFTag",
    input: { CatalogId: 0, TagKey: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLFTag",
})) as any;

export type DeleteLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the LF-Tag expression. The caller must be a data lake admin or have `DROP` permissions on the LF-Tag expression.
 * Deleting a LF-Tag expression will also delete all `LFTagPolicy` permissions referencing the LF-Tag expression.
 */
export const deleteLFTagExpression: API.OperationMethod<
  DeleteLFTagExpressionRequest,
  DeleteLFTagExpressionResponse,
  DeleteLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLFTagExpression",
    input: { Name: 0, CatalogId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLFTagExpression",
})) as any;

export type DeleteObjectsOnCancelError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommittedException
  | CommonErrors;
/**
 * For a specific governed table, provides a list of Amazon S3 objects that will be written during the current transaction and that can be automatically deleted
 * if the transaction is canceled. Without this call, no Amazon S3 objects are automatically deleted when a transaction cancels.
 *
 * The Glue ETL library function `write_dynamic_frame.from_catalog()` includes an option to automatically
 * call `DeleteObjectsOnCancel` before writes. For more information, see
 * Rolling Back Amazon S3 Writes.
 */
export const deleteObjectsOnCancel: API.OperationMethod<
  DeleteObjectsOnCancelRequest,
  DeleteObjectsOnCancelResponse,
  DeleteObjectsOnCancelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteObjectsOnCancel",
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      TransactionId: 0,
      Objects: D.list({ Uri: 0, ETag: 0 }),
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObjectsOnCancel",
})) as any;

export type DeregisterResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | LastServiceLinkedRoleRegistration
  | CommonErrors;
/**
 * Deregisters the resource as managed by the Data Catalog.
 *
 * When you deregister a path, Lake Formation removes the path from the inline policy attached to your service-linked role.
 */
export const deregisterResource: API.OperationMethod<
  DeregisterResourceRequest,
  DeregisterResourceResponse,
  DeregisterResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeregisterResource",
    input: { ResourceArn: 0 },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    LastServiceLinkedRoleRegistration,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterResource",
})) as any;

export type DescribeLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the instance ARN and application ARN for the connection.
 */
export const describeLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  DescribeLakeFormationIdentityCenterConfigurationRequest,
  DescribeLakeFormationIdentityCenterConfigurationResponse,
  DescribeLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeLakeFormationIdentityCenterConfiguration",
    input: { CatalogId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLakeFormationIdentityCenterConfiguration",
})) as any;

export type DescribeResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the current data access role for the given resource registered in Lake Formation.
 */
export const describeResource: API.OperationMethod<
  DescribeResourceRequest,
  DescribeResourceResponse,
  DescribeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeResource",
    input: { ResourceArn: 0 },
    output: { ResourceInfo: o_ResourceInfo },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResource",
})) as any;

export type DescribeTransactionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the details of a single transaction.
 */
export const describeTransaction: API.OperationMethod<
  DescribeTransactionRequest,
  DescribeTransactionResponse,
  DescribeTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeTransaction",
    input: { TransactionId: 0 },
    output: { TransactionDescription: o_TransactionDescription },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTransaction",
})) as any;

export type ExtendTransactionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCanceledException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Indicates to the service that the specified transaction is still active and should not be treated as idle and aborted.
 *
 * Write transactions that remain idle for a long period are automatically aborted unless explicitly extended.
 */
export const extendTransaction: API.OperationMethod<
  ExtendTransactionRequest,
  ExtendTransactionResponse,
  ExtendTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ExtendTransaction",
    input: { TransactionId: 0 },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCanceledException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExtendTransaction",
})) as any;

export type GetDataCellsFilterError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a data cells filter.
 */
export const getDataCellsFilter: API.OperationMethod<
  GetDataCellsFilterRequest,
  GetDataCellsFilterResponse,
  GetDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetDataCellsFilter",
    input: { TableCatalogId: 0, DatabaseName: 0, TableName: 0, Name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCellsFilter",
})) as any;

export type GetDataLakePrincipalError =
  | AccessDeniedException
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the identity of the invoking principal.
 */
export const getDataLakePrincipal: API.OperationMethod<
  GetDataLakePrincipalRequest,
  GetDataLakePrincipalResponse,
  GetDataLakePrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetDataLakePrincipal", input: {} },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakePrincipal",
})) as any;

export type GetDataLakeSettingsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves the list of the data lake administrators of a Lake Formation-managed data lake.
 */
export const getDataLakeSettings: API.OperationMethod<
  GetDataLakeSettingsRequest,
  GetDataLakeSettingsResponse,
  GetDataLakeSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetDataLakeSettings",
    input: { CatalogId: 0 },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeSettings",
})) as any;

export type GetEffectivePermissionsForPathError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the Lake Formation permissions for a specified table or database resource located
 * at a path in Amazon S3. `GetEffectivePermissionsForPath` will not return databases and tables if the catalog is encrypted.
 */
export const getEffectivePermissionsForPath: API.PaginatedOperationMethod<
  GetEffectivePermissionsForPathRequest,
  GetEffectivePermissionsForPathResponse,
  GetEffectivePermissionsForPathError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetEffectivePermissionsForPath",
    input: { CatalogId: 0, ResourceArn: 0, NextToken: 0, MaxResults: 0 },
    output: { Permissions: D.list(o_PrincipalResourcePermissions) },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectivePermissionsForPath",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns an LF-tag definition.
 */
export const getLFTag: API.OperationMethod<
  GetLFTagRequest,
  GetLFTagResponse,
  GetLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetLFTag",
    input: { CatalogId: 0, TagKey: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLFTag",
})) as any;

export type GetLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the details about the LF-Tag expression. The caller must be a data lake admin or must have `DESCRIBE` permission on the LF-Tag expression resource.
 */
export const getLFTagExpression: API.OperationMethod<
  GetLFTagExpressionRequest,
  GetLFTagExpressionResponse,
  GetLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetLFTagExpression",
    input: { Name: 0, CatalogId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLFTagExpression",
})) as any;

export type GetQueryStateError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns the state of a query previously submitted. Clients are expected to poll `GetQueryState` to monitor the current state of the planning before retrieving the work units. A query state is only visible to the principal that made the initial call to `StartQueryPlanning`.
 */
export const getQueryState: API.OperationMethod<
  GetQueryStateRequest,
  GetQueryStateResponse,
  GetQueryStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetQueryState",
    input: { QueryId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryState",
  endpointHostPrefix: "query-",
})) as any;

export type GetQueryStatisticsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | StatisticsNotReadyYetException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves statistics on the planning and execution of a query.
 */
export const getQueryStatistics: API.OperationMethod<
  GetQueryStatisticsRequest,
  GetQueryStatisticsResponse,
  GetQueryStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetQueryStatistics",
    input: { QueryId: 0 },
    output: { QuerySubmissionTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    StatisticsNotReadyYetException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryStatistics",
  endpointHostPrefix: "query-",
})) as any;

export type GetResourceLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the LF-tags applied to a resource.
 */
export const getResourceLFTags: API.OperationMethod<
  GetResourceLFTagsRequest,
  GetResourceLFTagsResponse,
  GetResourceLFTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetResourceLFTags",
    input: { CatalogId: 0, Resource: i_Resource, ShowAssignedLFTags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceLFTags",
})) as any;

export type GetTableObjectsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Returns the set of Amazon S3 objects that make up the specified governed table. A transaction ID or timestamp can be specified for time-travel queries.
 */
export const getTableObjects: API.PaginatedOperationMethod<
  GetTableObjectsRequest,
  GetTableObjectsResponse,
  GetTableObjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTableObjects",
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      TransactionId: 0,
      QueryAsOfTime: 0,
      PartitionPredicate: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableObjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTemporaryDataLocationCredentialsError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Allows a user or application in a secure environment to access data in a specific Amazon S3 location registered with Lake Formation by providing temporary scoped credentials that are limited to the requested data location and
 * the caller's authorized access level.
 *
 * `GetDataAccess` is logged in CloudTrail whenever a principal requests temporary data location credentials to access data in a data lake location that is registered with Lake Formation.
 *
 * The API operation returns an error in the following scenarios:
 *
 * - The data location is not registered with Lake Formation.
 *
 * - No Glue table is associated with the data location.
 *
 * - The caller doesn't have required permissions on the associated table. The caller must have
 * `SELECT` or `SUPER` permissions on the associated table, and
 * credential vending for full table access must be enabled in the data lake settings.
 *
 * For more information, see Application integration for full table access.
 *
 * - The data location is in a different Amazon Web Services Region. Lake Formation doesn't
 * support cross-Region access when vending credentials for a data location. Lake Formation only supports Amazon S3 paths registered within the same Region as the API
 * call.
 */
export const getTemporaryDataLocationCredentials: API.OperationMethod<
  GetTemporaryDataLocationCredentialsRequest,
  GetTemporaryDataLocationCredentialsResponse,
  GetTemporaryDataLocationCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTemporaryDataLocationCredentials",
    input: {
      DurationSeconds: 0,
      AuditContext: i_AuditContext,
      DataLocations: 0,
      CredentialsScope: 0,
    },
    output: {
      Credentials: {
        SecretAccessKey: D.secret,
        SessionToken: D.secret,
        Expiration: D.ts,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryDataLocationCredentials",
})) as any;

export type GetTemporaryGluePartitionCredentialsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * This API is identical to `GetTemporaryTableCredentials` except that this is used when the target Data Catalog resource is of type Partition. Lake Formation restricts the permission of the vended credentials with the same scope down policy which restricts access to a single Amazon S3 prefix.
 */
export const getTemporaryGluePartitionCredentials: API.OperationMethod<
  GetTemporaryGluePartitionCredentialsRequest,
  GetTemporaryGluePartitionCredentialsResponse,
  GetTemporaryGluePartitionCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTemporaryGluePartitionCredentials",
    input: {
      TableArn: 0,
      Partition: { Values: 0 },
      Permissions: 0,
      DurationSeconds: 0,
      AuditContext: i_AuditContext,
      SupportedPermissionTypes: 0,
    },
    output: {
      SecretAccessKey: D.secret,
      SessionToken: D.secret,
      Expiration: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryGluePartitionCredentials",
})) as any;

export type GetTemporaryGlueTableCredentialsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Allows a caller in a secure environment to assume a role with permission to access Amazon S3. In order to vend such credentials, Lake Formation assumes the role associated with a registered location, for example an Amazon S3 bucket, with a scope down policy which restricts the access to a single prefix.
 *
 * To call this API, the role that the service assumes must have `lakeformation:GetDataAccess` permission on the resource.
 */
export const getTemporaryGlueTableCredentials: API.OperationMethod<
  GetTemporaryGlueTableCredentialsRequest,
  GetTemporaryGlueTableCredentialsResponse,
  GetTemporaryGlueTableCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTemporaryGlueTableCredentials",
    input: {
      TableArn: 0,
      Permissions: 0,
      DurationSeconds: 0,
      AuditContext: i_AuditContext,
      SupportedPermissionTypes: 0,
      S3Path: 0,
      QuerySessionContext: {
        QueryId: 0,
        QueryStartTime: 0,
        ClusterId: 0,
        QueryAuthorizationId: 0,
        AdditionalContext: 0,
      },
    },
    output: {
      SecretAccessKey: D.secret,
      SessionToken: D.secret,
      Expiration: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryGlueTableCredentials",
})) as any;

export type GetWorkUnitResultsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | ThrottledException
  | CommonErrors;
/**
 * Returns the work units resulting from the query. Work units can be executed in any order and in parallel.
 */
export const getWorkUnitResults: API.OperationMethod<
  GetWorkUnitResultsRequest,
  GetWorkUnitResultsResponse,
  GetWorkUnitResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetWorkUnitResults",
    input: { QueryId: 0, WorkUnitId: 0, WorkUnitToken: 0 },
    output: { ResultStream: D.m({ payload: true, shape: D.stream }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkUnitResults",
  endpointHostPrefix: "data-",
})) as any;

export type GetWorkUnitsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | WorkUnitsNotReadyYetException
  | CommonErrors;
/**
 * Retrieves the work units generated by the `StartQueryPlanning` operation.
 */
export const getWorkUnits: API.PaginatedOperationMethod<
  GetWorkUnitsRequest,
  GetWorkUnitsResponse,
  GetWorkUnitsError,
  Credentials | HttpClient.HttpClient,
  WorkUnitRange
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetWorkUnits",
    input: { NextToken: 0, PageSize: 0, QueryId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    WorkUnitsNotReadyYetException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkUnits",
  endpointHostPrefix: "query-",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkUnitRanges",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GrantPermissionsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Grants permissions to the principal to access metadata in the Data Catalog and data organized in underlying data storage such as Amazon S3.
 *
 * For information about permissions, see Security and Access Control to Metadata and Data.
 */
export const grantPermissions: API.OperationMethod<
  GrantPermissionsRequest,
  GrantPermissionsResponse,
  GrantPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GrantPermissions",
    input: {
      CatalogId: 0,
      Principal: i_DataLakePrincipal,
      Resource: i_Resource,
      Permissions: 0,
      Condition: i_Condition,
      PermissionsWithGrantOption: 0,
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GrantPermissions",
})) as any;

export type ListDataCellsFilterError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the data cell filters on a table.
 */
export const listDataCellsFilter: API.PaginatedOperationMethod<
  ListDataCellsFilterRequest,
  ListDataCellsFilterResponse,
  ListDataCellsFilterError,
  Credentials | HttpClient.HttpClient,
  DataCellsFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListDataCellsFilter",
    input: { Table: i_TableResource, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataCellsFilter",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataCellsFilters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLakeFormationOptInsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | EntityNotFoundException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Retrieve the current list of resources and principals that are opt in to enforce Lake Formation permissions.
 */
export const listLakeFormationOptIns: API.PaginatedOperationMethod<
  ListLakeFormationOptInsRequest,
  ListLakeFormationOptInsResponse,
  ListLakeFormationOptInsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLakeFormationOptIns",
    input: {
      Principal: i_DataLakePrincipal,
      Resource: i_Resource,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { LakeFormationOptInsInfoList: D.list({ LastModified: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    EntityNotFoundException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLakeFormationOptIns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLFTagExpressionsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the LF-Tag expressions in caller’s account filtered based on caller's permissions. Data Lake and read only admins implicitly can see all tag expressions in their account, else caller needs DESCRIBE permissions on tag expression.
 */
export const listLFTagExpressions: API.PaginatedOperationMethod<
  ListLFTagExpressionsRequest,
  ListLFTagExpressionsResponse,
  ListLFTagExpressionsError,
  Credentials | HttpClient.HttpClient,
  LFTagExpression
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLFTagExpressions",
    input: { CatalogId: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLFTagExpressions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LFTagExpressions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists LF-tags that the requester has permission to view.
 */
export const listLFTags: API.PaginatedOperationMethod<
  ListLFTagsRequest,
  ListLFTagsResponse,
  ListLFTagsError,
  Credentials | HttpClient.HttpClient,
  LFTagPair
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLFTags",
    input: { CatalogId: 0, ResourceShareType: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LFTags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Returns a list of the principal permissions on the resource, filtered by the permissions of the caller. For example, if you are granted an ALTER permission, you are able to see only the principal permissions for ALTER.
 *
 * This operation returns only those permissions that have been explicitly granted. If both
 * `Principal` and `Resource` parameters are provided, the response
 * returns effective permissions rather than the explicitly granted permissions.
 *
 * For information about permissions, see Security and Access Control to Metadata and Data.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListPermissions",
    input: {
      CatalogId: 0,
      Principal: i_DataLakePrincipal,
      ResourceType: 0,
      Resource: i_Resource,
      NextToken: 0,
      MaxResults: 0,
      IncludeRelated: 0,
    },
    output: {
      PrincipalResourcePermissions: D.list(o_PrincipalResourcePermissions),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists the resources registered to be managed by the Data Catalog.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListResources",
    input: {
      FilterConditionList: D.list({
        Field: 0,
        ComparisonOperator: 0,
        StringValueList: 0,
      }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ResourceInfoList: D.list(o_ResourceInfo) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTableStorageOptimizersError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns the configuration of all storage optimizers associated with a specified table.
 */
export const listTableStorageOptimizers: API.PaginatedOperationMethod<
  ListTableStorageOptimizersRequest,
  ListTableStorageOptimizersResponse,
  ListTableStorageOptimizersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTableStorageOptimizers",
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      StorageOptimizerType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableStorageOptimizers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTransactionsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns metadata about transactions and their status. To prevent the response from growing indefinitely, only uncommitted transactions and those available for time-travel queries are returned.
 *
 * This operation can help you identify uncommitted transactions or to get information about transactions.
 */
export const listTransactions: API.PaginatedOperationMethod<
  ListTransactionsRequest,
  ListTransactionsResponse,
  ListTransactionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTransactions",
    input: { CatalogId: 0, StatusFilter: 0, MaxResults: 0, NextToken: 0 },
    output: { Transactions: D.list(o_TransactionDescription) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutDataLakeSettingsError =
  | InternalServiceException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Sets the list of data lake administrators who have admin privileges on all resources managed by Lake Formation. For more information on admin privileges, see Granting Lake Formation Permissions.
 *
 * This API replaces the current list of data lake admins with the new list being passed. To add an admin, fetch the current list and add the new admin to that list and pass that list in this API.
 */
export const putDataLakeSettings: API.OperationMethod<
  PutDataLakeSettingsRequest,
  PutDataLakeSettingsResponse,
  PutDataLakeSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutDataLakeSettings",
    input: {
      CatalogId: 0,
      DataLakeSettings: {
        DataLakeAdmins: D.list(i_DataLakePrincipal),
        ReadOnlyAdmins: D.list(i_DataLakePrincipal),
        CreateDatabaseDefaultPermissions: D.list(i_PrincipalPermissions),
        CreateTableDefaultPermissions: D.list(i_PrincipalPermissions),
        Parameters: 0,
        TrustedResourceOwners: 0,
        AllowExternalDataFiltering: 0,
        AllowFullTableExternalDataAccess: 0,
        ExternalDataFilteringAllowList: D.list(i_DataLakePrincipal),
        AuthorizedSessionTagValueList: 0,
      },
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataLakeSettings",
})) as any;

export type RegisterResourceError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Registers the resource as managed by the Data Catalog.
 *
 * To add or update data, Lake Formation needs read/write access to the chosen data location. Choose a role that you know has permission to do this, or choose the AWSServiceRoleForLakeFormationDataAccess service-linked role. When you register the first Amazon S3 path, the service-linked role and a new inline policy are created on your behalf. Lake Formation adds the first path to the inline policy and attaches it to the service-linked role. When you register subsequent paths, Lake Formation adds the path to the existing policy.
 *
 * The following request registers a new location and gives Lake Formation permission to use the service-linked role to access that location.
 *
 * ResourceArn = arn:aws:s3:::my-bucket/
 * UseServiceLinkedRole = true
 *
 * If `UseServiceLinkedRole` is not set to true, you must provide or set the `RoleArn`:
 *
 * `arn:aws:iam::12345:role/my-data-access-role`
 */
export const registerResource: API.OperationMethod<
  RegisterResourceRequest,
  RegisterResourceResponse,
  RegisterResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RegisterResource",
    input: {
      ResourceArn: 0,
      UseServiceLinkedRole: 0,
      RoleArn: 0,
      WithFederation: 0,
      HybridAccessEnabled: 0,
      WithPrivilegedAccess: 0,
      ExpectedResourceOwnerAccount: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterResource",
})) as any;

export type RemoveLFTagsFromResourceError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes an LF-tag from the resource. Only database, table, or tableWithColumns resource are allowed. To tag columns, use the column inclusion list in `tableWithColumns` to specify column input.
 */
export const removeLFTagsFromResource: API.OperationMethod<
  RemoveLFTagsFromResourceRequest,
  RemoveLFTagsFromResourceResponse,
  RemoveLFTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RemoveLFTagsFromResource",
    input: { CatalogId: 0, Resource: i_Resource, LFTags: D.list(i_LFTagPair) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveLFTagsFromResource",
})) as any;

export type RevokePermissionsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Revokes permissions to the principal to access metadata in the Data Catalog and data organized in underlying data storage such as Amazon S3.
 */
export const revokePermissions: API.OperationMethod<
  RevokePermissionsRequest,
  RevokePermissionsResponse,
  RevokePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RevokePermissions",
    input: {
      CatalogId: 0,
      Principal: i_DataLakePrincipal,
      Resource: i_Resource,
      Permissions: 0,
      Condition: i_Condition,
      PermissionsWithGrantOption: 0,
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokePermissions",
})) as any;

export type SearchDatabasesByLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * This operation allows a search on `DATABASE` resources by `TagCondition`. This operation is used by admins who want to grant user permissions on certain `TagConditions`. Before making a grant, the admin can use `SearchDatabasesByTags` to find all resources where the given `TagConditions` are valid to verify whether the returned resources can be shared.
 */
export const searchDatabasesByLFTags: API.PaginatedOperationMethod<
  SearchDatabasesByLFTagsRequest,
  SearchDatabasesByLFTagsResponse,
  SearchDatabasesByLFTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedDatabase
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /SearchDatabasesByLFTags",
    input: {
      NextToken: 0,
      MaxResults: 0,
      CatalogId: 0,
      Expression: D.list(i_LFTag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDatabasesByLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatabaseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTablesByLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * This operation allows a search on `TABLE` resources by `LFTag`s. This will be used by admins who want to grant user permissions on certain LF-tags. Before making a grant, the admin can use `SearchTablesByLFTags` to find all resources where the given `LFTag`s are valid to verify whether the returned resources can be shared.
 */
export const searchTablesByLFTags: API.PaginatedOperationMethod<
  SearchTablesByLFTagsRequest,
  SearchTablesByLFTagsResponse,
  SearchTablesByLFTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedTable
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /SearchTablesByLFTags",
    input: {
      NextToken: 0,
      MaxResults: 0,
      CatalogId: 0,
      Expression: D.list(i_LFTag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTablesByLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartQueryPlanningError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottledException
  | CommonErrors;
/**
 * Submits a request to process a query statement.
 *
 * This operation generates work units that can be retrieved with the `GetWorkUnits` operation as soon as the query state is WORKUNITS_AVAILABLE or FINISHED.
 */
export const startQueryPlanning: API.OperationMethod<
  StartQueryPlanningRequest,
  StartQueryPlanningResponse,
  StartQueryPlanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartQueryPlanning",
    input: {
      QueryPlanningContext: {
        CatalogId: 0,
        DatabaseName: 0,
        QueryAsOfTime: 0,
        QueryParameters: 0,
        TransactionId: 0,
      },
      QueryString: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQueryPlanning",
  endpointHostPrefix: "query-",
})) as any;

export type StartTransactionError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a new transaction and returns its transaction ID. Transaction IDs are opaque objects that you can use to identify a transaction.
 */
export const startTransaction: API.OperationMethod<
  StartTransactionRequest,
  StartTransactionResponse,
  StartTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartTransaction",
    input: { TransactionType: 0 },
    body: true,
  },
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTransaction",
})) as any;

export type UpdateDataCellsFilterError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a data cell filter.
 */
export const updateDataCellsFilter: API.OperationMethod<
  UpdateDataCellsFilterRequest,
  UpdateDataCellsFilterResponse,
  UpdateDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateDataCellsFilter",
    input: { TableData: i_DataCellsFilter },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataCellsFilter",
})) as any;

export type UpdateLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the IAM Identity Center connection parameters.
 */
export const updateLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  UpdateLakeFormationIdentityCenterConfigurationRequest,
  UpdateLakeFormationIdentityCenterConfigurationResponse,
  UpdateLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLakeFormationIdentityCenterConfiguration",
    input: {
      CatalogId: 0,
      ShareRecipients: D.list(i_DataLakePrincipal),
      ServiceIntegrations: D.list(i_ServiceIntegrationUnion),
      ApplicationStatus: 0,
      ExternalFiltering: i_ExternalFilteringConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLakeFormationIdentityCenterConfiguration",
})) as any;

export type UpdateLFTagError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the list of possible values for the specified LF-tag key. If the LF-tag does not exist, the operation throws an EntityNotFoundException. The values in the delete key values will be deleted from list of possible values. If any value in the delete key values is attached to a resource, then API errors out with a 400 Exception - "Update not allowed". Untag the attribute before deleting the LF-tag key's value.
 */
export const updateLFTag: API.OperationMethod<
  UpdateLFTagRequest,
  UpdateLFTagResponse,
  UpdateLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLFTag",
    input: { CatalogId: 0, TagKey: 0, TagValuesToDelete: 0, TagValuesToAdd: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLFTag",
})) as any;

export type UpdateLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates the name of the LF-Tag expression to the new description and expression body provided.
 * Updating a LF-Tag expression immediately changes the permission boundaries of all existing `LFTagPolicy` permission grants that reference the given LF-Tag expression.
 */
export const updateLFTagExpression: API.OperationMethod<
  UpdateLFTagExpressionRequest,
  UpdateLFTagExpressionResponse,
  UpdateLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLFTagExpression",
    input: {
      Name: 0,
      Description: 0,
      CatalogId: 0,
      Expression: D.list(i_LFTag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLFTagExpression",
})) as any;

export type UpdateResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the data access role used for vending access to the given (registered) resource in Lake Formation.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  UpdateResourceResponse,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateResource",
    input: {
      RoleArn: 0,
      ResourceArn: 0,
      WithFederation: 0,
      HybridAccessEnabled: 0,
      ExpectedResourceOwnerAccount: 0,
    },
    body: true,
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
})) as any;

export type UpdateTableObjectsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Updates the manifest of Amazon S3 objects that make up the specified governed table.
 */
export const updateTableObjects: API.OperationMethod<
  UpdateTableObjectsRequest,
  UpdateTableObjectsResponse,
  UpdateTableObjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTableObjects",
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      TransactionId: 0,
      WriteOperations: D.list({
        AddObject: { Uri: 0, ETag: 0, Size: 0, PartitionValues: 0 },
        DeleteObject: { Uri: 0, ETag: 0, PartitionValues: 0 },
      }),
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableObjects",
})) as any;

export type UpdateTableStorageOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates the configuration of the storage optimizers for a table.
 */
export const updateTableStorageOptimizer: API.OperationMethod<
  UpdateTableStorageOptimizerRequest,
  UpdateTableStorageOptimizerResponse,
  UpdateTableStorageOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTableStorageOptimizer",
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      StorageOptimizerConfig: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableStorageOptimizer",
})) as any;

const i_AuditContext: D.LazyStruct = () => ({ AdditionalAuditContext: 0 });
const i_BatchPermissionsRequestEntry: D.LazyStruct = () => ({
  Id: 0,
  Principal: i_DataLakePrincipal,
  Resource: i_Resource,
  Permissions: 0,
  Condition: i_Condition,
  PermissionsWithGrantOption: 0,
});
const i_Condition: D.LazyStruct = () => ({ Expression: 0 });
const i_DataCellsFilter: D.LazyStruct = () => ({
  TableCatalogId: 0,
  DatabaseName: 0,
  TableName: 0,
  Name: 0,
  RowFilter: { FilterExpression: 0, AllRowsWildcard: {} },
  ColumnNames: 0,
  ColumnWildcard: i_ColumnWildcard,
  VersionId: 0,
});
const i_DataLakePrincipal: D.LazyStruct = () => ({
  DataLakePrincipalIdentifier: 0,
});
const i_ExternalFilteringConfiguration: D.LazyStruct = () => ({
  Status: 0,
  AuthorizedTargets: 0,
});
const i_LFTag: D.LazyStruct = () => ({ TagKey: 0, TagValues: 0 });
const i_LFTagPair: D.LazyStruct = () => ({
  CatalogId: 0,
  TagKey: 0,
  TagValues: 0,
});
const i_PrincipalPermissions: D.LazyStruct = () => ({
  Principal: i_DataLakePrincipal,
  Permissions: 0,
});
const i_Resource: D.LazyStruct = () => ({
  Catalog: { Id: 0 },
  Database: { CatalogId: 0, Name: 0 },
  Table: i_TableResource,
  TableWithColumns: {
    CatalogId: 0,
    DatabaseName: 0,
    Name: 0,
    ColumnNames: 0,
    ColumnWildcard: i_ColumnWildcard,
  },
  DataLocation: { CatalogId: 0, ResourceArn: 0 },
  DataCellsFilter: {
    TableCatalogId: 0,
    DatabaseName: 0,
    TableName: 0,
    Name: 0,
  },
  LFTag: { CatalogId: 0, TagKey: 0, TagValues: 0 },
  LFTagPolicy: {
    CatalogId: 0,
    ResourceType: 0,
    Expression: D.list(i_LFTag),
    ExpressionName: 0,
  },
  LFTagExpression: { CatalogId: 0, Name: 0 },
});
const i_ServiceIntegrationUnion: D.LazyStruct = () => ({
  Redshift: D.list({ RedshiftConnect: { Authorization: 0 } }),
});
const i_TableResource: D.LazyStruct = () => ({
  CatalogId: 0,
  DatabaseName: 0,
  Name: 0,
  TableWildcard: {},
});
const o_PrincipalResourcePermissions: D.LazyStruct = () => ({
  LastUpdated: D.ts,
});
const o_ResourceInfo: D.LazyStruct = () => ({ LastModified: D.ts });
const o_TransactionDescription: D.LazyStruct = () => ({
  TransactionStartTime: D.ts,
  TransactionEndTime: D.ts,
});
const i_ColumnWildcard: D.LazyStruct = () => ({ ExcludedColumnNames: 0 });
