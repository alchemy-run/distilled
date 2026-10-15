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
  sdkId: "kendra",
  serviceShapeName: "AWSKendraFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kendra" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-02-03");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://kendra-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://kendra-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kendra.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kendra.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kendra.{R}.{D}","properties":{},"headers":{}}');

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
export class FeaturedResultsConflictException
  extends /*@__PURE__*/ S.TaggedError<FeaturedResultsConflictException>()(
    "FeaturedResultsConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ConflictingItems: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(481, __c15, 1)).annotate({
          identifier: "ConflictingItems",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KendraClosedToNewCustomers
  extends /*@__PURE__*/ S.TaggedError<KendraClosedToNewCustomers>()(
    "KendraClosedToNewCustomers",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "NotAuthorizedException",
      message: { includes: "no longer accepting new customers" },
    }),
  ).pipe(C.withAuthError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()("NotAuthorizedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ResourceAlreadyExistException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistException>()(
    "ResourceAlreadyExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ExperienceId = string;
export type IndexId = string;
export type EntityId = string;
export type EntityType = "USER" | "GROUP" | (string & {});
export interface EntityConfiguration {
  EntityId: string;
  EntityType: EntityType;
}
export type AssociateEntityList = EntityConfiguration[];
export interface AssociateEntitiesToExperienceRequest {
  Id: string;
  IndexId: string;
  EntityList: EntityConfiguration[];
}
export type ErrorMessage = string;
export interface FailedEntity {
  EntityId?: string;
  ErrorMessage?: string;
}
export type AssociateEntitiesToExperienceFailedEntityList = FailedEntity[];
export interface AssociateEntitiesToExperienceResponse {
  FailedEntityList?: FailedEntity[];
}
export type Persona = "OWNER" | "VIEWER" | (string & {});
export interface EntityPersonaConfiguration {
  EntityId: string;
  Persona: Persona;
}
export type EntityPersonaConfigurationList = EntityPersonaConfiguration[];
export interface AssociatePersonasToEntitiesRequest {
  Id: string;
  IndexId: string;
  Personas: EntityPersonaConfiguration[];
}
export type FailedEntityList = FailedEntity[];
export interface AssociatePersonasToEntitiesResponse {
  FailedEntityList?: FailedEntity[];
}
export type DocumentId = string;
export type DocumentIdList = string[];
export type DataSourceId = string;
export type DataSourceSyncJobId = string;
export interface DataSourceSyncJobMetricTarget {
  DataSourceId: string;
  DataSourceSyncJobId?: string;
}
export interface BatchDeleteDocumentRequest {
  IndexId: string;
  DocumentIdList: string[];
  DataSourceSyncJobMetricTarget?: DataSourceSyncJobMetricTarget;
}
export type ErrorCode = "InternalError" | "InvalidRequest" | (string & {});
export interface BatchDeleteDocumentResponseFailedDocument {
  Id?: string;
  DataSourceId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type BatchDeleteDocumentResponseFailedDocuments =
  BatchDeleteDocumentResponseFailedDocument[];
export interface BatchDeleteDocumentResponse {
  FailedDocuments?: BatchDeleteDocumentResponseFailedDocument[];
}
export type FeaturedResultsSetId = string;
export type FeaturedResultsSetIdList = string[];
export interface BatchDeleteFeaturedResultsSetRequest {
  IndexId: string;
  FeaturedResultsSetIds: string[];
}
export interface BatchDeleteFeaturedResultsSetError_ {
  Id: string;
  ErrorCode: ErrorCode;
  ErrorMessage: string;
}
export type BatchDeleteFeaturedResultsSetErrors = BatchDeleteFeaturedResultsSetError_[];
export interface BatchDeleteFeaturedResultsSetResponse {
  Errors: BatchDeleteFeaturedResultsSetError_[];
}
export type DocumentAttributeKey = string;
export type DocumentAttributeStringValue = string;
export type DocumentAttributeStringListValue = string[];
export interface DocumentAttributeValue {
  StringValue?: string;
  StringListValue?: string[];
  LongValue?: number;
  DateValue?: Date;
}
export interface DocumentAttribute {
  Key: string;
  Value: DocumentAttributeValue;
}
export type DocumentAttributeList = DocumentAttribute[];
export interface DocumentInfo {
  DocumentId: string;
  Attributes?: DocumentAttribute[];
}
export type DocumentInfoList = DocumentInfo[];
export interface BatchGetDocumentStatusRequest {
  IndexId: string;
  DocumentInfoList: DocumentInfo[];
}
export interface BatchGetDocumentStatusResponseError {
  DocumentId?: string;
  DataSourceId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type BatchGetDocumentStatusResponseErrors = BatchGetDocumentStatusResponseError[];
export type DocumentStatus =
  | "NOT_FOUND"
  | "PROCESSING"
  | "INDEXED"
  | "UPDATED"
  | "FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export interface Status {
  DocumentId?: string;
  DocumentStatus?: DocumentStatus;
  FailureCode?: string;
  FailureReason?: string;
}
export type DocumentStatusList = Status[];
export interface BatchGetDocumentStatusResponse {
  Errors?: BatchGetDocumentStatusResponseError[];
  DocumentStatusList?: Status[];
}
export type RoleArn = string;
export type Title = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3Path {
  Bucket: string;
  Key: string;
}
export type PrincipalName = string;
export type PrincipalType = "USER" | "GROUP" | (string & {});
export type ReadAccessType = "ALLOW" | "DENY" | (string & {});
export interface Principal {
  Name: string;
  Type: PrincipalType;
  Access: ReadAccessType;
  DataSourceId?: string;
}
export type PrincipalList = Principal[];
export interface HierarchicalPrincipal {
  PrincipalList: Principal[];
}
export type HierarchicalPrincipalList = HierarchicalPrincipal[];
export type ContentType =
  | "PDF"
  | "HTML"
  | "MS_WORD"
  | "PLAIN_TEXT"
  | "PPT"
  | "RTF"
  | "XML"
  | "XSLT"
  | "MS_EXCEL"
  | "CSV"
  | "JSON"
  | "MD"
  | (string & {});
export type AccessControlConfigurationId = string;
export interface Document {
  Id: string;
  Title?: string;
  Blob?: Uint8Array;
  S3Path?: S3Path;
  Attributes?: DocumentAttribute[];
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
  ContentType?: ContentType;
  AccessControlConfigurationId?: string;
}
export type DocumentList = Document[];
export type ConditionOperator =
  | "GreaterThan"
  | "GreaterThanOrEquals"
  | "LessThan"
  | "LessThanOrEquals"
  | "Equals"
  | "NotEquals"
  | "Contains"
  | "NotContains"
  | "Exists"
  | "NotExists"
  | "BeginsWith"
  | (string & {});
export interface DocumentAttributeCondition {
  ConditionDocumentAttributeKey: string;
  Operator: ConditionOperator;
  ConditionOnValue?: DocumentAttributeValue;
}
export interface DocumentAttributeTarget {
  TargetDocumentAttributeKey?: string;
  TargetDocumentAttributeValueDeletion?: boolean;
  TargetDocumentAttributeValue?: DocumentAttributeValue;
}
export interface InlineCustomDocumentEnrichmentConfiguration {
  Condition?: DocumentAttributeCondition;
  Target?: DocumentAttributeTarget;
  DocumentContentDeletion?: boolean;
}
export type InlineCustomDocumentEnrichmentConfigurationList =
  InlineCustomDocumentEnrichmentConfiguration[];
export type LambdaArn = string;
export interface HookConfiguration {
  InvocationCondition?: DocumentAttributeCondition;
  LambdaArn: string;
  S3Bucket: string;
}
export interface CustomDocumentEnrichmentConfiguration {
  InlineConfigurations?: InlineCustomDocumentEnrichmentConfiguration[];
  PreExtractionHookConfiguration?: HookConfiguration;
  PostExtractionHookConfiguration?: HookConfiguration;
  RoleArn?: string;
}
export interface BatchPutDocumentRequest {
  IndexId: string;
  RoleArn?: string;
  Documents: Document[];
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface BatchPutDocumentResponseFailedDocument {
  Id?: string;
  DataSourceId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type BatchPutDocumentResponseFailedDocuments = BatchPutDocumentResponseFailedDocument[];
export interface BatchPutDocumentResponse {
  FailedDocuments?: BatchPutDocumentResponseFailedDocument[];
}
export interface ClearQuerySuggestionsRequest {
  IndexId: string;
}
export interface ClearQuerySuggestionsResponse {}
export type AccessControlConfigurationName = string;
export type Description = string;
export type ClientTokenName = string;
export interface CreateAccessControlConfigurationRequest {
  IndexId: string;
  Name: string;
  Description?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
  ClientToken?: string;
}
export interface CreateAccessControlConfigurationResponse {
  Id: string;
}
export type DataSourceName = string;
export type DataSourceType =
  | "S3"
  | "SHAREPOINT"
  | "DATABASE"
  | "SALESFORCE"
  | "ONEDRIVE"
  | "SERVICENOW"
  | "CUSTOM"
  | "CONFLUENCE"
  | "GOOGLEDRIVE"
  | "WEBCRAWLER"
  | "WORKDOCS"
  | "FSX"
  | "SLACK"
  | "BOX"
  | "QUIP"
  | "JIRA"
  | "GITHUB"
  | "ALFRESCO"
  | "TEMPLATE"
  | (string & {});
export type DataSourceInclusionsExclusionsStringsMember = string;
export type DataSourceInclusionsExclusionsStrings = string[];
export interface DocumentsMetadataConfiguration {
  S3Prefix?: string;
}
export interface AccessControlListConfiguration {
  KeyPath?: string;
}
export interface S3DataSourceConfiguration {
  BucketName: string;
  InclusionPrefixes?: string[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  DocumentsMetadataConfiguration?: DocumentsMetadataConfiguration;
  AccessControlListConfiguration?: AccessControlListConfiguration;
}
export type SharePointVersion =
  | "SHAREPOINT_2013"
  | "SHAREPOINT_2016"
  | "SHAREPOINT_ONLINE"
  | "SHAREPOINT_2019"
  | (string & {});
export type Url = string;
export type SharePointUrlList = string[];
export type SecretArn = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type VpcSecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface DataSourceVpcConfiguration {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export type DataSourceFieldName = string;
export type DataSourceDateFieldFormat = string;
export type IndexFieldName = string;
export interface DataSourceToIndexFieldMapping {
  DataSourceFieldName: string;
  DateFieldFormat?: string;
  IndexFieldName: string;
}
export type DataSourceToIndexFieldMappingList = DataSourceToIndexFieldMapping[];
export type SharePointOnlineAuthenticationType = "HTTP_BASIC" | "OAUTH2" | (string & {});
export type Host = string;
export type Port = number;
export interface ProxyConfiguration {
  Host: string;
  Port: number;
  Credentials?: string;
}
export interface SharePointConfiguration {
  SharePointVersion: SharePointVersion;
  Urls: string[];
  SecretArn: string;
  CrawlAttachments?: boolean;
  UseChangeLog?: boolean;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  DocumentTitleFieldName?: string;
  DisableLocalGroups?: boolean;
  SslCertificateS3Path?: S3Path;
  AuthenticationType?: SharePointOnlineAuthenticationType;
  ProxyConfiguration?: ProxyConfiguration;
}
export type DatabaseEngineType =
  | "RDS_AURORA_MYSQL"
  | "RDS_AURORA_POSTGRESQL"
  | "RDS_MYSQL"
  | "RDS_POSTGRESQL"
  | (string & {});
export type DatabaseHost = string;
export type DatabasePort = number;
export type DatabaseName = string;
export type TableName = string;
export interface ConnectionConfiguration {
  DatabaseHost: string;
  DatabasePort: number;
  DatabaseName: string;
  TableName: string;
  SecretArn: string;
}
export type ColumnName = string;
export type ChangeDetectingColumns = string[];
export interface ColumnConfiguration {
  DocumentIdColumnName: string;
  DocumentDataColumnName: string;
  DocumentTitleColumnName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  ChangeDetectingColumns: string[];
}
export interface AclConfiguration {
  AllowedGroupsColumnName: string;
}
export type QueryIdentifiersEnclosingOption = "DOUBLE_QUOTES" | "NONE" | (string & {});
export interface SqlConfiguration {
  QueryIdentifiersEnclosingOption?: QueryIdentifiersEnclosingOption;
}
export interface DatabaseConfiguration {
  DatabaseEngineType: DatabaseEngineType;
  ConnectionConfiguration: ConnectionConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  ColumnConfiguration: ColumnConfiguration;
  AclConfiguration?: AclConfiguration;
  SqlConfiguration?: SqlConfiguration;
}
export type SalesforceStandardObjectName =
  | "ACCOUNT"
  | "CAMPAIGN"
  | "CASE"
  | "CONTACT"
  | "CONTRACT"
  | "DOCUMENT"
  | "GROUP"
  | "IDEA"
  | "LEAD"
  | "OPPORTUNITY"
  | "PARTNER"
  | "PRICEBOOK"
  | "PRODUCT"
  | "PROFILE"
  | "SOLUTION"
  | "TASK"
  | "USER"
  | (string & {});
export interface SalesforceStandardObjectConfiguration {
  Name: SalesforceStandardObjectName;
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type SalesforceStandardObjectConfigurationList = SalesforceStandardObjectConfiguration[];
export type SalesforceKnowledgeArticleState = "DRAFT" | "PUBLISHED" | "ARCHIVED" | (string & {});
export type SalesforceKnowledgeArticleStateList = SalesforceKnowledgeArticleState[];
export interface SalesforceStandardKnowledgeArticleTypeConfiguration {
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type SalesforceCustomKnowledgeArticleTypeName = string;
export interface SalesforceCustomKnowledgeArticleTypeConfiguration {
  Name: string;
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type SalesforceCustomKnowledgeArticleTypeConfigurationList =
  SalesforceCustomKnowledgeArticleTypeConfiguration[];
export interface SalesforceKnowledgeArticleConfiguration {
  IncludedStates: SalesforceKnowledgeArticleState[];
  StandardKnowledgeArticleTypeConfiguration?: SalesforceStandardKnowledgeArticleTypeConfiguration;
  CustomKnowledgeArticleTypeConfigurations?: SalesforceCustomKnowledgeArticleTypeConfiguration[];
}
export type SalesforceChatterFeedIncludeFilterType =
  | "ACTIVE_USER"
  | "STANDARD_USER"
  | (string & {});
export type SalesforceChatterFeedIncludeFilterTypes = SalesforceChatterFeedIncludeFilterType[];
export interface SalesforceChatterFeedConfiguration {
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  IncludeFilterTypes?: SalesforceChatterFeedIncludeFilterType[];
}
export interface SalesforceStandardObjectAttachmentConfiguration {
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export interface SalesforceConfiguration {
  ServerUrl: string;
  SecretArn: string;
  StandardObjectConfigurations?: SalesforceStandardObjectConfiguration[];
  KnowledgeArticleConfiguration?: SalesforceKnowledgeArticleConfiguration;
  ChatterFeedConfiguration?: SalesforceChatterFeedConfiguration;
  CrawlAttachments?: boolean;
  StandardObjectAttachmentConfiguration?: SalesforceStandardObjectAttachmentConfiguration;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
}
export type TenantDomain = string;
export type OneDriveUser = string;
export type OneDriveUserList = string[];
export interface OneDriveUsers {
  OneDriveUserList?: string[];
  OneDriveUserS3Path?: S3Path;
}
export interface OneDriveConfiguration {
  TenantDomain: string;
  SecretArn: string;
  OneDriveUsers: OneDriveUsers;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
  DisableLocalGroups?: boolean;
}
export type ServiceNowHostUrl = string;
export type ServiceNowBuildVersionType = "LONDON" | "OTHERS" | (string & {});
export type ServiceNowKnowledgeArticleFilterQuery = string;
export interface ServiceNowKnowledgeArticleConfiguration {
  CrawlAttachments?: boolean;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
  FilterQuery?: string;
}
export interface ServiceNowServiceCatalogConfiguration {
  CrawlAttachments?: boolean;
  IncludeAttachmentFilePatterns?: string[];
  ExcludeAttachmentFilePatterns?: string[];
  DocumentDataFieldName: string;
  DocumentTitleFieldName?: string;
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type ServiceNowAuthenticationType = "HTTP_BASIC" | "OAUTH2" | (string & {});
export interface ServiceNowConfiguration {
  HostUrl: string;
  SecretArn: string;
  ServiceNowBuildVersion: ServiceNowBuildVersionType;
  KnowledgeArticleConfiguration?: ServiceNowKnowledgeArticleConfiguration;
  ServiceCatalogConfiguration?: ServiceNowServiceCatalogConfiguration;
  AuthenticationType?: ServiceNowAuthenticationType;
}
export type ConfluenceVersion = "CLOUD" | "SERVER" | (string & {});
export type ConfluenceSpaceIdentifier = string;
export type ConfluenceSpaceList = string[];
export type ConfluenceSpaceFieldName =
  | "DISPLAY_URL"
  | "ITEM_TYPE"
  | "SPACE_KEY"
  | "URL"
  | (string & {});
export interface ConfluenceSpaceToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceSpaceFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export type ConfluenceSpaceFieldMappingsList = ConfluenceSpaceToIndexFieldMapping[];
export interface ConfluenceSpaceConfiguration {
  CrawlPersonalSpaces?: boolean;
  CrawlArchivedSpaces?: boolean;
  IncludeSpaces?: string[];
  ExcludeSpaces?: string[];
  SpaceFieldMappings?: ConfluenceSpaceToIndexFieldMapping[];
}
export type ConfluencePageFieldName =
  | "AUTHOR"
  | "CONTENT_STATUS"
  | "CREATED_DATE"
  | "DISPLAY_URL"
  | "ITEM_TYPE"
  | "LABELS"
  | "MODIFIED_DATE"
  | "PARENT_ID"
  | "SPACE_KEY"
  | "SPACE_NAME"
  | "URL"
  | "VERSION"
  | (string & {});
export interface ConfluencePageToIndexFieldMapping {
  DataSourceFieldName?: ConfluencePageFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export type ConfluencePageFieldMappingsList = ConfluencePageToIndexFieldMapping[];
export interface ConfluencePageConfiguration {
  PageFieldMappings?: ConfluencePageToIndexFieldMapping[];
}
export type ConfluenceBlogFieldName =
  | "AUTHOR"
  | "DISPLAY_URL"
  | "ITEM_TYPE"
  | "LABELS"
  | "PUBLISH_DATE"
  | "SPACE_KEY"
  | "SPACE_NAME"
  | "URL"
  | "VERSION"
  | (string & {});
export interface ConfluenceBlogToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceBlogFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export type ConfluenceBlogFieldMappingsList = ConfluenceBlogToIndexFieldMapping[];
export interface ConfluenceBlogConfiguration {
  BlogFieldMappings?: ConfluenceBlogToIndexFieldMapping[];
}
export type ConfluenceAttachmentFieldName =
  | "AUTHOR"
  | "CONTENT_TYPE"
  | "CREATED_DATE"
  | "DISPLAY_URL"
  | "FILE_SIZE"
  | "ITEM_TYPE"
  | "PARENT_ID"
  | "SPACE_KEY"
  | "SPACE_NAME"
  | "URL"
  | "VERSION"
  | (string & {});
export interface ConfluenceAttachmentToIndexFieldMapping {
  DataSourceFieldName?: ConfluenceAttachmentFieldName;
  DateFieldFormat?: string;
  IndexFieldName?: string;
}
export type ConfluenceAttachmentFieldMappingsList = ConfluenceAttachmentToIndexFieldMapping[];
export interface ConfluenceAttachmentConfiguration {
  CrawlAttachments?: boolean;
  AttachmentFieldMappings?: ConfluenceAttachmentToIndexFieldMapping[];
}
export type ConfluenceAuthenticationType = "HTTP_BASIC" | "PAT" | (string & {});
export interface ConfluenceConfiguration {
  ServerUrl: string;
  SecretArn: string;
  Version: ConfluenceVersion;
  SpaceConfiguration?: ConfluenceSpaceConfiguration;
  PageConfiguration?: ConfluencePageConfiguration;
  BlogConfiguration?: ConfluenceBlogConfiguration;
  AttachmentConfiguration?: ConfluenceAttachmentConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  ProxyConfiguration?: ProxyConfiguration;
  AuthenticationType?: ConfluenceAuthenticationType;
}
export type MimeType = string;
export type ExcludeMimeTypesList = string[];
export type UserAccount = string;
export type ExcludeUserAccountsList = string[];
export type SharedDriveId = string;
export type ExcludeSharedDrivesList = string[];
export interface GoogleDriveConfiguration {
  SecretArn: string;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
  ExcludeMimeTypes?: string[];
  ExcludeUserAccounts?: string[];
  ExcludeSharedDrives?: string[];
}
export type SeedUrl = string;
export type SeedUrlList = string[];
export type WebCrawlerMode = "HOST_ONLY" | "SUBDOMAINS" | "EVERYTHING" | (string & {});
export interface SeedUrlConfiguration {
  SeedUrls: string[];
  WebCrawlerMode?: WebCrawlerMode;
}
export type SiteMap = string;
export type SiteMapsList = string[];
export interface SiteMapsConfiguration {
  SiteMaps: string[];
}
export interface Urls {
  SeedUrlConfiguration?: SeedUrlConfiguration;
  SiteMapsConfiguration?: SiteMapsConfiguration;
}
export type CrawlDepth = number;
export type MaxLinksPerPage = number;
export type MaxContentSizePerPageInMegaBytes = number;
export type MaxUrlsPerMinuteCrawlRate = number;
export interface BasicAuthenticationConfiguration {
  Host: string;
  Port: number;
  Credentials: string;
}
export type BasicAuthenticationConfigurationList = BasicAuthenticationConfiguration[];
export interface AuthenticationConfiguration {
  BasicAuthentication?: BasicAuthenticationConfiguration[];
}
export interface WebCrawlerConfiguration {
  Urls: Urls;
  CrawlDepth?: number;
  MaxLinksPerPage?: number;
  MaxContentSizePerPageInMegaBytes?: number;
  MaxUrlsPerMinuteCrawlRate?: number;
  UrlInclusionPatterns?: string[];
  UrlExclusionPatterns?: string[];
  ProxyConfiguration?: ProxyConfiguration;
  AuthenticationConfiguration?: AuthenticationConfiguration;
}
export type OrganizationId = string;
export interface WorkDocsConfiguration {
  OrganizationId: string;
  CrawlComments?: boolean;
  UseChangeLog?: boolean;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type FileSystemId = string;
export type FsxFileSystemType = "WINDOWS" | (string & {});
export interface FsxConfiguration {
  FileSystemId: string;
  FileSystemType: FsxFileSystemType;
  VpcConfiguration: DataSourceVpcConfiguration;
  SecretArn?: string;
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type TeamId = string;
export type SlackEntity =
  | "PUBLIC_CHANNEL"
  | "PRIVATE_CHANNEL"
  | "GROUP_MESSAGE"
  | "DIRECT_MESSAGE"
  | (string & {});
export type SlackEntityList = SlackEntity[];
export type SinceCrawlDate = string;
export type LookBackPeriod = number;
export type PrivateChannelFilter = string[];
export type PublicChannelFilter = string[];
export interface SlackConfiguration {
  TeamId: string;
  SecretArn: string;
  VpcConfiguration?: DataSourceVpcConfiguration;
  SlackEntityList: SlackEntity[];
  UseChangeLog?: boolean;
  CrawlBotMessage?: boolean;
  ExcludeArchived?: boolean;
  SinceCrawlDate: string;
  LookBackPeriod?: number;
  PrivateChannelFilter?: string[];
  PublicChannelFilter?: string[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  FieldMappings?: DataSourceToIndexFieldMapping[];
}
export type EnterpriseId = string;
export interface BoxConfiguration {
  EnterpriseId: string;
  SecretArn: string;
  UseChangeLog?: boolean;
  CrawlComments?: boolean;
  CrawlTasks?: boolean;
  CrawlWebLinks?: boolean;
  FileFieldMappings?: DataSourceToIndexFieldMapping[];
  TaskFieldMappings?: DataSourceToIndexFieldMapping[];
  CommentFieldMappings?: DataSourceToIndexFieldMapping[];
  WebLinkFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export type Domain = string;
export type FolderId = string;
export type FolderIdList = string[];
export interface QuipConfiguration {
  Domain: string;
  SecretArn: string;
  CrawlFileComments?: boolean;
  CrawlChatRooms?: boolean;
  CrawlAttachments?: boolean;
  FolderIds?: string[];
  ThreadFieldMappings?: DataSourceToIndexFieldMapping[];
  MessageFieldMappings?: DataSourceToIndexFieldMapping[];
  AttachmentFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export type JiraAccountUrl = string;
export type Project = string[];
export type IssueType = string[];
export type JiraStatus = string[];
export type IssueSubEntity = "COMMENTS" | "ATTACHMENTS" | "WORKLOGS" | (string & {});
export type IssueSubEntityFilter = IssueSubEntity[];
export interface JiraConfiguration {
  JiraAccountUrl: string;
  SecretArn: string;
  UseChangeLog?: boolean;
  Project?: string[];
  IssueType?: string[];
  Status?: string[];
  IssueSubEntityFilter?: IssueSubEntity[];
  AttachmentFieldMappings?: DataSourceToIndexFieldMapping[];
  CommentFieldMappings?: DataSourceToIndexFieldMapping[];
  IssueFieldMappings?: DataSourceToIndexFieldMapping[];
  ProjectFieldMappings?: DataSourceToIndexFieldMapping[];
  WorkLogFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export type OrganizationName = string;
export interface SaaSConfiguration {
  OrganizationName: string;
  HostUrl: string;
}
export interface OnPremiseConfiguration {
  HostUrl: string;
  OrganizationName: string;
  SslCertificateS3Path: S3Path;
}
export type Type = "SAAS" | "ON_PREMISE" | (string & {});
export interface GitHubDocumentCrawlProperties {
  CrawlRepositoryDocuments?: boolean;
  CrawlIssue?: boolean;
  CrawlIssueComment?: boolean;
  CrawlIssueCommentAttachment?: boolean;
  CrawlPullRequest?: boolean;
  CrawlPullRequestComment?: boolean;
  CrawlPullRequestCommentAttachment?: boolean;
}
export type RepositoryName = string;
export type RepositoryNames = string[];
export type StringList = string[];
export interface GitHubConfiguration {
  SaaSConfiguration?: SaaSConfiguration;
  OnPremiseConfiguration?: OnPremiseConfiguration;
  Type?: Type;
  SecretArn: string;
  UseChangeLog?: boolean;
  GitHubDocumentCrawlProperties?: GitHubDocumentCrawlProperties;
  RepositoryFilter?: string[];
  InclusionFolderNamePatterns?: string[];
  InclusionFileTypePatterns?: string[];
  InclusionFileNamePatterns?: string[];
  ExclusionFolderNamePatterns?: string[];
  ExclusionFileTypePatterns?: string[];
  ExclusionFileNamePatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
  GitHubRepositoryConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubCommitConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueDocumentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueCommentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubIssueAttachmentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestCommentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestDocumentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
  GitHubPullRequestDocumentAttachmentConfigurationFieldMappings?: DataSourceToIndexFieldMapping[];
}
export type SiteUrl = string;
export type SiteId = string;
export type AlfrescoEntity = "wiki" | "blog" | "documentLibrary" | (string & {});
export type EntityFilter = AlfrescoEntity[];
export interface AlfrescoConfiguration {
  SiteUrl: string;
  SiteId: string;
  SecretArn: string;
  SslCertificateS3Path: S3Path;
  CrawlSystemFolders?: boolean;
  CrawlComments?: boolean;
  EntityFilter?: AlfrescoEntity[];
  DocumentLibraryFieldMappings?: DataSourceToIndexFieldMapping[];
  BlogFieldMappings?: DataSourceToIndexFieldMapping[];
  WikiFieldMappings?: DataSourceToIndexFieldMapping[];
  InclusionPatterns?: string[];
  ExclusionPatterns?: string[];
  VpcConfiguration?: DataSourceVpcConfiguration;
}
export type Template = unknown;
export interface TemplateConfiguration {
  Template?: any;
}
export interface DataSourceConfiguration {
  S3Configuration?: S3DataSourceConfiguration;
  SharePointConfiguration?: SharePointConfiguration;
  DatabaseConfiguration?: DatabaseConfiguration;
  SalesforceConfiguration?: SalesforceConfiguration;
  OneDriveConfiguration?: OneDriveConfiguration;
  ServiceNowConfiguration?: ServiceNowConfiguration;
  ConfluenceConfiguration?: ConfluenceConfiguration;
  GoogleDriveConfiguration?: GoogleDriveConfiguration;
  WebCrawlerConfiguration?: WebCrawlerConfiguration;
  WorkDocsConfiguration?: WorkDocsConfiguration;
  FsxConfiguration?: FsxConfiguration;
  SlackConfiguration?: SlackConfiguration;
  BoxConfiguration?: BoxConfiguration;
  QuipConfiguration?: QuipConfiguration;
  JiraConfiguration?: JiraConfiguration;
  GitHubConfiguration?: GitHubConfiguration;
  AlfrescoConfiguration?: AlfrescoConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
}
export type ScanSchedule = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type LanguageCode = string;
export interface CreateDataSourceRequest {
  Name: string;
  IndexId: string;
  Type: DataSourceType;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  Description?: string;
  Schedule?: string;
  RoleArn?: string;
  Tags?: Tag[];
  ClientToken?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface CreateDataSourceResponse {
  Id: string;
}
export type ExperienceName = string;
export type DataSourceIdList = string[];
export type FaqId = string;
export type FaqIdsList = string[];
export interface ContentSourceConfiguration {
  DataSourceIds?: string[];
  FaqIds?: string[];
  DirectPutContent?: boolean;
}
export type IdentityAttributeName = string;
export interface UserIdentityConfiguration {
  IdentityAttributeName?: string;
}
export interface ExperienceConfiguration {
  ContentSourceConfiguration?: ContentSourceConfiguration;
  UserIdentityConfiguration?: UserIdentityConfiguration;
}
export interface CreateExperienceRequest {
  Name: string;
  IndexId: string;
  RoleArn?: string;
  Configuration?: ExperienceConfiguration;
  Description?: string;
  ClientToken?: string;
}
export interface CreateExperienceResponse {
  Id: string;
}
export type FaqName = string;
export type FaqFileFormat = "CSV" | "CSV_WITH_HEADER" | "JSON" | (string & {});
export interface CreateFaqRequest {
  IndexId: string;
  Name: string;
  Description?: string;
  S3Path: S3Path;
  RoleArn: string;
  Tags?: Tag[];
  FileFormat?: FaqFileFormat;
  ClientToken?: string;
  LanguageCode?: string;
}
export interface CreateFaqResponse {
  Id?: string;
}
export type FeaturedResultsSetName = string;
export type FeaturedResultsSetDescription = string;
export type FeaturedResultsSetStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type QueryText = string;
export type QueryTextList = string[];
export interface FeaturedDocument {
  Id?: string;
}
export type FeaturedDocumentList = FeaturedDocument[];
export interface CreateFeaturedResultsSetRequest {
  IndexId: string;
  FeaturedResultsSetName: string;
  Description?: string;
  ClientToken?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
  Tags?: Tag[];
}
export interface FeaturedResultsSet {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export interface CreateFeaturedResultsSetResponse {
  FeaturedResultsSet?: FeaturedResultsSet;
}
export type IndexName = string;
export type IndexEdition =
  | "DEVELOPER_EDITION"
  | "ENTERPRISE_EDITION"
  | "GEN_AI_ENTERPRISE_EDITION"
  | (string & {});
export type KmsKeyId = string | redacted.Redacted<string>;
export interface ServerSideEncryptionConfiguration {
  KmsKeyId?: string | redacted.Redacted<string>;
}
export type KeyLocation = "URL" | "SECRET_MANAGER" | (string & {});
export type UserNameAttributeField = string;
export type GroupAttributeField = string;
export type Issuer = string;
export type ClaimRegex = string;
export interface JwtTokenTypeConfiguration {
  KeyLocation: KeyLocation;
  URL?: string;
  SecretManagerArn?: string;
  UserNameAttributeField?: string;
  GroupAttributeField?: string;
  Issuer?: string;
  ClaimRegex?: string;
}
export interface JsonTokenTypeConfiguration {
  UserNameAttributeField: string;
  GroupAttributeField: string;
}
export interface UserTokenConfiguration {
  JwtTokenTypeConfiguration?: JwtTokenTypeConfiguration;
  JsonTokenTypeConfiguration?: JsonTokenTypeConfiguration;
}
export type UserTokenConfigurationList = UserTokenConfiguration[];
export type UserContextPolicy = "ATTRIBUTE_FILTER" | "USER_TOKEN" | (string & {});
export type UserGroupResolutionMode = "AWS_SSO" | "NONE" | (string & {});
export interface UserGroupResolutionConfiguration {
  UserGroupResolutionMode: UserGroupResolutionMode;
}
export interface CreateIndexRequest {
  Name: string;
  Edition?: IndexEdition;
  RoleArn: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  Description?: string;
  ClientToken?: string;
  Tags?: Tag[];
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface CreateIndexResponse {
  Id?: string;
}
export type QuerySuggestionsBlockListName = string;
export interface CreateQuerySuggestionsBlockListRequest {
  IndexId: string;
  Name: string;
  Description?: string;
  SourceS3Path: S3Path;
  ClientToken?: string;
  RoleArn: string;
  Tags?: Tag[];
}
export type QuerySuggestionsBlockListId = string;
export interface CreateQuerySuggestionsBlockListResponse {
  Id?: string;
}
export type ThesaurusName = string;
export interface CreateThesaurusRequest {
  IndexId: string;
  Name: string;
  Description?: string;
  RoleArn: string;
  Tags?: Tag[];
  SourceS3Path: S3Path;
  ClientToken?: string;
}
export type ThesaurusId = string;
export interface CreateThesaurusResponse {
  Id?: string;
}
export interface DeleteAccessControlConfigurationRequest {
  IndexId: string;
  Id: string;
}
export interface DeleteAccessControlConfigurationResponse {}
export interface DeleteDataSourceRequest {
  Id: string;
  IndexId: string;
}
export interface DeleteDataSourceResponse {}
export interface DeleteExperienceRequest {
  Id: string;
  IndexId: string;
}
export interface DeleteExperienceResponse {}
export interface DeleteFaqRequest {
  Id: string;
  IndexId: string;
}
export interface DeleteFaqResponse {}
export interface DeleteIndexRequest {
  Id: string;
}
export interface DeleteIndexResponse {}
export type GroupId = string;
export type PrincipalOrderingId = number;
export interface DeletePrincipalMappingRequest {
  IndexId: string;
  DataSourceId?: string;
  GroupId: string;
  OrderingId?: number;
}
export interface DeletePrincipalMappingResponse {}
export interface DeleteQuerySuggestionsBlockListRequest {
  IndexId: string;
  Id: string;
}
export interface DeleteQuerySuggestionsBlockListResponse {}
export interface DeleteThesaurusRequest {
  Id: string;
  IndexId: string;
}
export interface DeleteThesaurusResponse {}
export interface DescribeAccessControlConfigurationRequest {
  IndexId: string;
  Id: string;
}
export interface DescribeAccessControlConfigurationResponse {
  Name: string;
  Description?: string;
  ErrorMessage?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
}
export interface DescribeDataSourceRequest {
  Id: string;
  IndexId: string;
}
export type DataSourceStatus =
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "ACTIVE"
  | (string & {});
export interface DescribeDataSourceResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Type?: DataSourceType;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Description?: string;
  Status?: DataSourceStatus;
  Schedule?: string;
  RoleArn?: string;
  ErrorMessage?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface DescribeExperienceRequest {
  Id: string;
  IndexId: string;
}
export type EndpointType = "HOME" | (string & {});
export type Endpoint = string;
export interface ExperienceEndpoint {
  EndpointType?: EndpointType;
  Endpoint?: string;
}
export type ExperienceEndpoints = ExperienceEndpoint[];
export type ExperienceStatus = "CREATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
export interface DescribeExperienceResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Endpoints?: ExperienceEndpoint[];
  Configuration?: ExperienceConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Description?: string;
  Status?: ExperienceStatus;
  RoleArn?: string;
  ErrorMessage?: string;
}
export interface DescribeFaqRequest {
  Id: string;
  IndexId: string;
}
export type FaqStatus = "CREATING" | "UPDATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
export interface DescribeFaqResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  S3Path?: S3Path;
  Status?: FaqStatus;
  RoleArn?: string;
  ErrorMessage?: string;
  FileFormat?: FaqFileFormat;
  LanguageCode?: string;
}
export interface DescribeFeaturedResultsSetRequest {
  IndexId: string;
  FeaturedResultsSetId: string;
}
export interface FeaturedDocumentWithMetadata {
  Id?: string;
  Title?: string;
  URI?: string;
}
export type FeaturedDocumentWithMetadataList = FeaturedDocumentWithMetadata[];
export interface FeaturedDocumentMissing {
  Id?: string;
}
export type FeaturedDocumentMissingList = FeaturedDocumentMissing[];
export interface DescribeFeaturedResultsSetResponse {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocumentsWithMetadata?: FeaturedDocumentWithMetadata[];
  FeaturedDocumentsMissing?: FeaturedDocumentMissing[];
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export interface DescribeIndexRequest {
  Id: string;
}
export type IndexStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "SYSTEM_UPDATING"
  | (string & {});
export type DocumentMetadataConfigurationName = string;
export type DocumentAttributeValueType =
  | "STRING_VALUE"
  | "STRING_LIST_VALUE"
  | "LONG_VALUE"
  | "DATE_VALUE"
  | (string & {});
export type DocumentMetadataBoolean = boolean;
export type Importance = number;
export type Duration = string;
export type Order = "ASCENDING" | "DESCENDING" | (string & {});
export type ValueImportanceMapKey = string;
export type ValueImportanceMap = { [key: string]: number | undefined };
export interface Relevance {
  Freshness?: boolean;
  Importance?: number;
  Duration?: string;
  RankOrder?: Order;
  ValueImportanceMap?: { [key: string]: number | undefined };
}
export interface Search {
  Facetable?: boolean;
  Searchable?: boolean;
  Displayable?: boolean;
  Sortable?: boolean;
}
export interface DocumentMetadataConfiguration {
  Name: string;
  Type: DocumentAttributeValueType;
  Relevance?: Relevance;
  Search?: Search;
}
export type DocumentMetadataConfigurationList = DocumentMetadataConfiguration[];
export type IndexedQuestionAnswersCount = number;
export interface FaqStatistics {
  IndexedQuestionAnswersCount: number;
}
export type IndexedTextDocumentsCount = number;
export type IndexedTextBytes = number;
export interface TextDocumentStatistics {
  IndexedTextDocumentsCount: number;
  IndexedTextBytes: number;
}
export interface IndexStatistics {
  FaqStatistics: FaqStatistics;
  TextDocumentStatistics: TextDocumentStatistics;
}
export type StorageCapacityUnit = number;
export type QueryCapacityUnit = number;
export interface CapacityUnitsConfiguration {
  StorageCapacityUnits: number;
  QueryCapacityUnits: number;
}
export interface DescribeIndexResponse {
  Name?: string;
  Id?: string;
  Edition?: IndexEdition;
  RoleArn?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  Status?: IndexStatus;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DocumentMetadataConfigurations?: DocumentMetadataConfiguration[];
  IndexStatistics?: IndexStatistics;
  ErrorMessage?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface DescribePrincipalMappingRequest {
  IndexId: string;
  DataSourceId?: string;
  GroupId: string;
}
export type PrincipalMappingStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "PROCESSING"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type FailureReason = string;
export interface GroupOrderingIdSummary {
  Status?: PrincipalMappingStatus;
  LastUpdatedAt?: Date;
  ReceivedAt?: Date;
  OrderingId?: number;
  FailureReason?: string;
}
export type GroupOrderingIdSummaries = GroupOrderingIdSummary[];
export interface DescribePrincipalMappingResponse {
  IndexId?: string;
  DataSourceId?: string;
  GroupId?: string;
  GroupOrderingIdSummaries?: GroupOrderingIdSummary[];
}
export interface DescribeQuerySuggestionsBlockListRequest {
  IndexId: string;
  Id: string;
}
export type QuerySuggestionsBlockListStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "ACTIVE_BUT_UPDATE_FAILED"
  | "FAILED"
  | (string & {});
export interface DescribeQuerySuggestionsBlockListResponse {
  IndexId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: QuerySuggestionsBlockListStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  SourceS3Path?: S3Path;
  ItemCount?: number;
  FileSizeBytes?: number;
  RoleArn?: string;
}
export interface DescribeQuerySuggestionsConfigRequest {
  IndexId: string;
}
export type Mode = "ENABLED" | "LEARN_ONLY" | (string & {});
export type QuerySuggestionsStatus = "ACTIVE" | "UPDATING" | (string & {});
export type ObjectBoolean = boolean;
export type MinimumNumberOfQueryingUsers = number;
export type MinimumQueryCount = number;
export interface SuggestableConfig {
  AttributeName?: string;
  Suggestable?: boolean;
}
export type SuggestableConfigList = SuggestableConfig[];
export type AttributeSuggestionsMode = "ACTIVE" | "INACTIVE" | (string & {});
export interface AttributeSuggestionsDescribeConfig {
  SuggestableConfigList?: SuggestableConfig[];
  AttributeSuggestionsMode?: AttributeSuggestionsMode;
}
export interface DescribeQuerySuggestionsConfigResponse {
  Mode?: Mode;
  Status?: QuerySuggestionsStatus;
  QueryLogLookBackWindowInDays?: number;
  IncludeQueriesWithoutUserInformation?: boolean;
  MinimumNumberOfQueryingUsers?: number;
  MinimumQueryCount?: number;
  LastSuggestionsBuildTime?: Date;
  LastClearTime?: Date;
  TotalSuggestionsCount?: number;
  AttributeSuggestionsConfig?: AttributeSuggestionsDescribeConfig;
}
export interface DescribeThesaurusRequest {
  Id: string;
  IndexId: string;
}
export type ThesaurusStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "UPDATING"
  | "ACTIVE_BUT_UPDATE_FAILED"
  | "FAILED"
  | (string & {});
export interface DescribeThesaurusResponse {
  Id?: string;
  IndexId?: string;
  Name?: string;
  Description?: string;
  Status?: ThesaurusStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  RoleArn?: string;
  SourceS3Path?: S3Path;
  FileSizeBytes?: number;
  TermCount?: number;
  SynonymRuleCount?: number;
}
export type DisassociateEntityList = EntityConfiguration[];
export interface DisassociateEntitiesFromExperienceRequest {
  Id: string;
  IndexId: string;
  EntityList: EntityConfiguration[];
}
export interface DisassociateEntitiesFromExperienceResponse {
  FailedEntityList?: FailedEntity[];
}
export type EntityIdsList = string[];
export interface DisassociatePersonasFromEntitiesRequest {
  Id: string;
  IndexId: string;
  EntityIds: string[];
}
export interface DisassociatePersonasFromEntitiesResponse {
  FailedEntityList?: FailedEntity[];
}
export type SuggestionQueryText = string;
export type SuggestionType = "QUERY" | "DOCUMENT_ATTRIBUTES" | (string & {});
export type SuggestionTypes = SuggestionType[];
export type DocumentAttributeKeyList = string[];
export type AttributeFilterList = AttributeFilter[];
export interface AttributeFilter {
  AndAllFilters?: AttributeFilter[];
  OrAllFilters?: AttributeFilter[];
  NotFilter?: AttributeFilter;
  EqualsTo?: DocumentAttribute;
  ContainsAll?: DocumentAttribute;
  ContainsAny?: DocumentAttribute;
  GreaterThan?: DocumentAttribute;
  GreaterThanOrEquals?: DocumentAttribute;
  LessThan?: DocumentAttribute;
  LessThanOrEquals?: DocumentAttribute;
}
export type Token = string;
export type Groups = string[];
export interface DataSourceGroup {
  GroupId: string;
  DataSourceId: string;
}
export type DataSourceGroups = DataSourceGroup[];
export interface UserContext {
  Token?: string | redacted.Redacted<string>;
  UserId?: string;
  Groups?: string[];
  DataSourceGroups?: DataSourceGroup[];
}
export interface AttributeSuggestionsGetConfig {
  SuggestionAttributes?: string[];
  AdditionalResponseAttributes?: string[];
  AttributeFilter?: AttributeFilter;
  UserContext?: UserContext;
}
export interface GetQuerySuggestionsRequest {
  IndexId: string;
  QueryText: string;
  MaxSuggestionsCount?: number;
  SuggestionTypes?: SuggestionType[];
  AttributeSuggestionsConfig?: AttributeSuggestionsGetConfig;
}
export type QuerySuggestionsId = string;
export type ResultId = string;
export interface SuggestionHighlight {
  BeginOffset?: number;
  EndOffset?: number;
}
export type SuggestionHighlightList = SuggestionHighlight[];
export interface SuggestionTextWithHighlights {
  Text?: string;
  Highlights?: SuggestionHighlight[];
}
export interface SuggestionValue {
  Text?: SuggestionTextWithHighlights;
}
export interface SourceDocument {
  DocumentId?: string;
  SuggestionAttributes?: string[];
  AdditionalAttributes?: DocumentAttribute[];
}
export type SourceDocuments = SourceDocument[];
export interface Suggestion {
  Id?: string;
  Value?: SuggestionValue;
  SourceDocuments?: SourceDocument[];
}
export type SuggestionList = Suggestion[];
export interface GetQuerySuggestionsResponse {
  QuerySuggestionsId?: string;
  Suggestions?: Suggestion[];
}
export type Interval =
  | "THIS_MONTH"
  | "THIS_WEEK"
  | "ONE_WEEK_AGO"
  | "TWO_WEEKS_AGO"
  | "ONE_MONTH_AGO"
  | "TWO_MONTHS_AGO"
  | (string & {});
export type MetricType =
  | "QUERIES_BY_COUNT"
  | "QUERIES_BY_ZERO_CLICK_RATE"
  | "QUERIES_BY_ZERO_RESULT_RATE"
  | "DOCS_BY_CLICK_COUNT"
  | "AGG_QUERY_DOC_METRICS"
  | "TREND_QUERY_DOC_METRICS"
  | (string & {});
export type NextToken = string;
export interface GetSnapshotsRequest {
  IndexId: string;
  Interval: Interval;
  MetricType: MetricType;
  NextToken?: string;
  MaxResults?: number;
}
export interface TimeRange {
  StartTime?: Date;
  EndTime?: Date;
}
export type SnapshotsDataHeaderFields = string[];
export type SnapshotsDataRecord = string[];
export type SnapshotsDataRecords = string[][];
export interface GetSnapshotsResponse {
  SnapShotTimeFilter?: TimeRange;
  SnapshotsDataHeader?: string[];
  SnapshotsData?: string[][];
  NextToken?: string;
}
export type MaxResultsIntegerForListAccessControlConfigurationsRequest = number;
export interface ListAccessControlConfigurationsRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AccessControlConfigurationSummary {
  Id: string;
}
export type AccessControlConfigurationSummaryList = AccessControlConfigurationSummary[];
export interface ListAccessControlConfigurationsResponse {
  NextToken?: string;
  AccessControlConfigurations: AccessControlConfigurationSummary[];
}
export type MaxResultsIntegerForListDataSourcesRequest = number;
export interface ListDataSourcesRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataSourceSummary {
  Name?: string;
  Id?: string;
  Type?: DataSourceType;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: DataSourceStatus;
  LanguageCode?: string;
}
export type DataSourceSummaryList = DataSourceSummary[];
export interface ListDataSourcesResponse {
  SummaryItems?: DataSourceSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListDataSourceSyncJobsRequest = number;
export type DataSourceSyncJobStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "SYNCING"
  | "INCOMPLETE"
  | "STOPPING"
  | "ABORTED"
  | "SYNCING_INDEXING"
  | (string & {});
export interface ListDataSourceSyncJobsRequest {
  Id: string;
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
  StartTimeFilter?: TimeRange;
  StatusFilter?: DataSourceSyncJobStatus;
}
export type MetricValue = string;
export interface DataSourceSyncJobMetrics {
  DocumentsAdded?: string;
  DocumentsModified?: string;
  DocumentsDeleted?: string;
  DocumentsFailed?: string;
  DocumentsScanned?: string;
}
export interface DataSourceSyncJob {
  ExecutionId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Status?: DataSourceSyncJobStatus;
  ErrorMessage?: string;
  ErrorCode?: ErrorCode;
  DataSourceErrorCode?: string;
  Metrics?: DataSourceSyncJobMetrics;
}
export type DataSourceSyncJobHistoryList = DataSourceSyncJob[];
export interface ListDataSourceSyncJobsResponse {
  History?: DataSourceSyncJob[];
  NextToken?: string;
}
export type MaxResultsIntegerForListEntityPersonasRequest = number;
export interface ListEntityPersonasRequest {
  Id: string;
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface PersonasSummary {
  EntityId?: string;
  Persona?: Persona;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type PersonasSummaryList = PersonasSummary[];
export interface ListEntityPersonasResponse {
  SummaryItems?: PersonasSummary[];
  NextToken?: string;
}
export interface ListExperienceEntitiesRequest {
  Id: string;
  IndexId: string;
  NextToken?: string;
}
export type NameType = string | redacted.Redacted<string>;
export interface EntityDisplayData {
  UserName?: string | redacted.Redacted<string>;
  GroupName?: string | redacted.Redacted<string>;
  IdentifiedUserName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
}
export interface ExperienceEntitiesSummary {
  EntityId?: string;
  EntityType?: EntityType;
  DisplayData?: EntityDisplayData;
}
export type ExperienceEntitiesSummaryList = ExperienceEntitiesSummary[];
export interface ListExperienceEntitiesResponse {
  SummaryItems?: ExperienceEntitiesSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListExperiencesRequest = number;
export interface ListExperiencesRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ExperiencesSummary {
  Name?: string;
  Id?: string;
  CreatedAt?: Date;
  Status?: ExperienceStatus;
  Endpoints?: ExperienceEndpoint[];
}
export type ExperiencesSummaryList = ExperiencesSummary[];
export interface ListExperiencesResponse {
  SummaryItems?: ExperiencesSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListFaqsRequest = number;
export interface ListFaqsRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface FaqSummary {
  Id?: string;
  Name?: string;
  Status?: FaqStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  FileFormat?: FaqFileFormat;
  LanguageCode?: string;
}
export type FaqSummaryItems = FaqSummary[];
export interface ListFaqsResponse {
  NextToken?: string;
  FaqSummaryItems?: FaqSummary[];
}
export type MaxResultsIntegerForListFeaturedResultsSetsRequest = number;
export interface ListFeaturedResultsSetsRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface FeaturedResultsSetSummary {
  FeaturedResultsSetId?: string;
  FeaturedResultsSetName?: string;
  Status?: FeaturedResultsSetStatus;
  LastUpdatedTimestamp?: number;
  CreationTimestamp?: number;
}
export type FeaturedResultsSetSummaryItems = FeaturedResultsSetSummary[];
export interface ListFeaturedResultsSetsResponse {
  FeaturedResultsSetSummaryItems?: FeaturedResultsSetSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListPrincipalsRequest = number;
export interface ListGroupsOlderThanOrderingIdRequest {
  IndexId: string;
  DataSourceId?: string;
  OrderingId: number;
  NextToken?: string;
  MaxResults?: number;
}
export interface GroupSummary {
  GroupId?: string;
  OrderingId?: number;
}
export type ListOfGroupSummaries = GroupSummary[];
export interface ListGroupsOlderThanOrderingIdResponse {
  GroupsSummaries?: GroupSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListIndicesRequest = number;
export interface ListIndicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface IndexConfigurationSummary {
  Name?: string;
  Id?: string;
  Edition?: IndexEdition;
  CreatedAt: Date;
  UpdatedAt: Date;
  Status: IndexStatus;
}
export type IndexConfigurationSummaryList = IndexConfigurationSummary[];
export interface ListIndicesResponse {
  IndexConfigurationSummaryItems?: IndexConfigurationSummary[];
  NextToken?: string;
}
export type MaxResultsIntegerForListQuerySuggestionsBlockLists = number;
export interface ListQuerySuggestionsBlockListsRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface QuerySuggestionsBlockListSummary {
  Id?: string;
  Name?: string;
  Status?: QuerySuggestionsBlockListStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ItemCount?: number;
}
export type QuerySuggestionsBlockListSummaryItems = QuerySuggestionsBlockListSummary[];
export interface ListQuerySuggestionsBlockListsResponse {
  BlockListSummaryItems?: QuerySuggestionsBlockListSummary[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type MaxResultsIntegerForListThesauriRequest = number;
export interface ListThesauriRequest {
  IndexId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ThesaurusSummary {
  Id?: string;
  Name?: string;
  Status?: ThesaurusStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ThesaurusSummaryItems = ThesaurusSummary[];
export interface ListThesauriResponse {
  NextToken?: string;
  ThesaurusSummaryItems?: ThesaurusSummary[];
}
export interface MemberGroup {
  GroupId: string;
  DataSourceId?: string;
}
export type MemberGroups = MemberGroup[];
export type UserId = string;
export interface MemberUser {
  UserId: string;
}
export type MemberUsers = MemberUser[];
export interface GroupMembers {
  MemberGroups?: MemberGroup[];
  MemberUsers?: MemberUser[];
  S3PathforGroupMembers?: S3Path;
}
export interface PutPrincipalMappingRequest {
  IndexId: string;
  DataSourceId?: string;
  GroupId: string;
  GroupMembers: GroupMembers;
  OrderingId?: number;
  RoleArn?: string;
}
export interface PutPrincipalMappingResponse {}
export type TopDocumentAttributeValueCountPairsSize = number;
export interface Facet {
  DocumentAttributeKey?: string;
  Facets?: Facet[];
  MaxResults?: number;
}
export type FacetList = Facet[];
export type QueryResultType = "DOCUMENT" | "QUESTION_ANSWER" | "ANSWER" | (string & {});
export interface DocumentRelevanceConfiguration {
  Name: string;
  Relevance: Relevance;
}
export type DocumentRelevanceOverrideConfigurationList = DocumentRelevanceConfiguration[];
export type SortOrder = "DESC" | "ASC" | (string & {});
export interface SortingConfiguration {
  DocumentAttributeKey: string;
  SortOrder: SortOrder;
}
export type SortingConfigurationList = SortingConfiguration[];
export type VisitorId = string;
export interface SpellCorrectionConfiguration {
  IncludeQuerySpellCheckSuggestions: boolean;
}
export type MissingAttributeKeyStrategy = "IGNORE" | "COLLAPSE" | "EXPAND" | (string & {});
export interface ExpandConfiguration {
  MaxResultItemsToExpand?: number;
  MaxExpandedResultsPerItem?: number;
}
export interface CollapseConfiguration {
  DocumentAttributeKey: string;
  SortingConfigurations?: SortingConfiguration[];
  MissingAttributeKeyStrategy?: MissingAttributeKeyStrategy;
  Expand?: boolean;
  ExpandConfiguration?: ExpandConfiguration;
}
export interface QueryRequest {
  IndexId: string;
  QueryText?: string;
  AttributeFilter?: AttributeFilter;
  Facets?: Facet[];
  RequestedDocumentAttributes?: string[];
  QueryResultTypeFilter?: QueryResultType;
  DocumentRelevanceOverrideConfigurations?: DocumentRelevanceConfiguration[];
  PageNumber?: number;
  PageSize?: number;
  SortingConfiguration?: SortingConfiguration;
  SortingConfigurations?: SortingConfiguration[];
  UserContext?: UserContext;
  VisitorId?: string;
  SpellCorrectionConfiguration?: SpellCorrectionConfiguration;
  CollapseConfiguration?: CollapseConfiguration;
}
export type QueryId = string;
export type QueryResultFormat = "TABLE" | "TEXT" | (string & {});
export type AdditionalResultAttributeValueType = "TEXT_WITH_HIGHLIGHTS_VALUE" | (string & {});
export type HighlightType = "STANDARD" | "THESAURUS_SYNONYM" | (string & {});
export interface Highlight {
  BeginOffset: number;
  EndOffset: number;
  TopAnswer?: boolean;
  Type?: HighlightType;
}
export type HighlightList = Highlight[];
export interface TextWithHighlights {
  Text?: string;
  Highlights?: Highlight[];
}
export interface AdditionalResultAttributeValue {
  TextWithHighlightsValue?: TextWithHighlights;
}
export interface AdditionalResultAttribute {
  Key: string;
  ValueType: AdditionalResultAttributeValueType;
  Value: AdditionalResultAttributeValue;
}
export type AdditionalResultAttributeList = AdditionalResultAttribute[];
export type ScoreConfidence =
  | "VERY_HIGH"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NOT_AVAILABLE"
  | (string & {});
export interface ScoreAttributes {
  ScoreConfidence?: ScoreConfidence;
}
export type FeedbackToken = string;
export interface TableCell {
  Value?: string;
  TopAnswer?: boolean;
  Highlighted?: boolean;
  Header?: boolean;
}
export type TableCellList = TableCell[];
export interface TableRow {
  Cells?: TableCell[];
}
export type TableRowList = TableRow[];
export interface TableExcerpt {
  Rows?: TableRow[];
  TotalNumberOfRows?: number;
}
export interface ExpandedResultItem {
  Id?: string;
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
}
export type ExpandedResultList = ExpandedResultItem[];
export interface CollapsedResultDetail {
  DocumentAttribute: DocumentAttribute;
  ExpandedResults?: ExpandedResultItem[];
}
export interface QueryResultItem {
  Id?: string;
  Type?: QueryResultType;
  Format?: QueryResultFormat;
  AdditionalAttributes?: AdditionalResultAttribute[];
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  ScoreAttributes?: ScoreAttributes;
  FeedbackToken?: string;
  TableExcerpt?: TableExcerpt;
  CollapsedResultDetail?: CollapsedResultDetail;
}
export type QueryResultItemList = QueryResultItem[];
export interface DocumentAttributeValueCountPair {
  DocumentAttributeValue?: DocumentAttributeValue;
  Count?: number;
  FacetResults?: FacetResult[];
}
export type DocumentAttributeValueCountPairList = DocumentAttributeValueCountPair[];
export interface FacetResult {
  DocumentAttributeKey?: string;
  DocumentAttributeValueType?: DocumentAttributeValueType;
  DocumentAttributeValueCountPairs?: DocumentAttributeValueCountPair[];
}
export type FacetResultList = FacetResult[];
export type WarningMessage = string;
export type WarningCode = "QUERY_LANGUAGE_INVALID_SYNTAX" | (string & {});
export interface Warning {
  Message?: string;
  Code?: WarningCode;
}
export type WarningList = Warning[];
export type SuggestedQueryText = string;
export interface Correction {
  BeginOffset?: number;
  EndOffset?: number;
  Term?: string;
  CorrectedTerm?: string;
}
export type CorrectionList = Correction[];
export interface SpellCorrectedQuery {
  SuggestedQueryText?: string;
  Corrections?: Correction[];
}
export type SpellCorrectedQueryList = SpellCorrectedQuery[];
export interface FeaturedResultsItem {
  Id?: string;
  Type?: QueryResultType;
  AdditionalAttributes?: AdditionalResultAttribute[];
  DocumentId?: string;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  FeedbackToken?: string;
}
export type FeaturedResultsItemList = FeaturedResultsItem[];
export interface QueryResult {
  QueryId?: string;
  ResultItems?: QueryResultItem[];
  FacetResults?: FacetResult[];
  TotalNumberOfResults?: number;
  Warnings?: Warning[];
  SpellCorrectedQueries?: SpellCorrectedQuery[];
  FeaturedResultsItems?: FeaturedResultsItem[];
}
export interface RetrieveRequest {
  IndexId: string;
  QueryText: string;
  AttributeFilter?: AttributeFilter;
  RequestedDocumentAttributes?: string[];
  DocumentRelevanceOverrideConfigurations?: DocumentRelevanceConfiguration[];
  PageNumber?: number;
  PageSize?: number;
  UserContext?: UserContext;
}
export type DocumentTitle = string;
export type Content = string;
export interface RetrieveResultItem {
  Id?: string;
  DocumentId?: string;
  DocumentTitle?: string;
  Content?: string;
  DocumentURI?: string;
  DocumentAttributes?: DocumentAttribute[];
  ScoreAttributes?: ScoreAttributes;
}
export type RetrieveResultItemList = RetrieveResultItem[];
export interface RetrieveResult {
  QueryId?: string;
  ResultItems?: RetrieveResultItem[];
}
export interface StartDataSourceSyncJobRequest {
  Id: string;
  IndexId: string;
}
export interface StartDataSourceSyncJobResponse {
  ExecutionId?: string;
}
export interface StopDataSourceSyncJobRequest {
  Id: string;
  IndexId: string;
}
export interface StopDataSourceSyncJobResponse {}
export interface ClickFeedback {
  ResultId: string;
  ClickTime: Date;
}
export type ClickFeedbackList = ClickFeedback[];
export type RelevanceType = "RELEVANT" | "NOT_RELEVANT" | (string & {});
export interface RelevanceFeedback {
  ResultId: string;
  RelevanceValue: RelevanceType;
}
export type RelevanceFeedbackList = RelevanceFeedback[];
export interface SubmitFeedbackRequest {
  IndexId: string;
  QueryId: string;
  ClickFeedbackItems?: ClickFeedback[];
  RelevanceFeedbackItems?: RelevanceFeedback[];
}
export interface SubmitFeedbackResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessControlConfigurationRequest {
  IndexId: string;
  Id: string;
  Name?: string;
  Description?: string;
  AccessControlList?: Principal[];
  HierarchicalAccessControlList?: HierarchicalPrincipal[];
}
export interface UpdateAccessControlConfigurationResponse {}
export interface UpdateDataSourceRequest {
  Id: string;
  Name?: string;
  IndexId: string;
  Configuration?: DataSourceConfiguration;
  VpcConfiguration?: DataSourceVpcConfiguration;
  Description?: string;
  Schedule?: string;
  RoleArn?: string;
  LanguageCode?: string;
  CustomDocumentEnrichmentConfiguration?: CustomDocumentEnrichmentConfiguration;
}
export interface UpdateDataSourceResponse {}
export interface UpdateExperienceRequest {
  Id: string;
  Name?: string;
  IndexId: string;
  RoleArn?: string;
  Configuration?: ExperienceConfiguration;
  Description?: string;
}
export interface UpdateExperienceResponse {}
export interface UpdateFeaturedResultsSetRequest {
  IndexId: string;
  FeaturedResultsSetId: string;
  FeaturedResultsSetName?: string;
  Description?: string;
  Status?: FeaturedResultsSetStatus;
  QueryTexts?: string[];
  FeaturedDocuments?: FeaturedDocument[];
}
export interface UpdateFeaturedResultsSetResponse {
  FeaturedResultsSet?: FeaturedResultsSet;
}
export interface UpdateIndexRequest {
  Id: string;
  Name?: string;
  RoleArn?: string;
  Description?: string;
  DocumentMetadataConfigurationUpdates?: DocumentMetadataConfiguration[];
  CapacityUnits?: CapacityUnitsConfiguration;
  UserTokenConfigurations?: UserTokenConfiguration[];
  UserContextPolicy?: UserContextPolicy;
  UserGroupResolutionConfiguration?: UserGroupResolutionConfiguration;
}
export interface UpdateIndexResponse {}
export interface UpdateQuerySuggestionsBlockListRequest {
  IndexId: string;
  Id: string;
  Name?: string;
  Description?: string;
  SourceS3Path?: S3Path;
  RoleArn?: string;
}
export interface UpdateQuerySuggestionsBlockListResponse {}
export interface AttributeSuggestionsUpdateConfig {
  SuggestableConfigList?: SuggestableConfig[];
  AttributeSuggestionsMode?: AttributeSuggestionsMode;
}
export interface UpdateQuerySuggestionsConfigRequest {
  IndexId: string;
  Mode?: Mode;
  QueryLogLookBackWindowInDays?: number;
  IncludeQueriesWithoutUserInformation?: boolean;
  MinimumNumberOfQueryingUsers?: number;
  MinimumQueryCount?: number;
  AttributeSuggestionsConfig?: AttributeSuggestionsUpdateConfig;
}
export interface UpdateQuerySuggestionsConfigResponse {}
export interface UpdateThesaurusRequest {
  Id: string;
  Name?: string;
  IndexId: string;
  Description?: string;
  RoleArn?: string;
  SourceS3Path?: S3Path;
}
export interface UpdateThesaurusResponse {}
export interface ConflictingItem {
  QueryText?: string;
  SetName?: string;
  SetId?: string;
}
export type ConflictingItems = ConflictingItem[];
export type AssociateEntitiesToExperienceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceAlreadyExistException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants users or groups in your IAM Identity Center identity source access
 * to your Amazon Kendra experience. You can create an Amazon Kendra experience such as a
 * search application. For more information on creating a search application
 * experience, see Building
 * a search experience with no code.
 */
export const associateEntitiesToExperience: API.OperationMethod<
  AssociateEntitiesToExperienceRequest,
  AssociateEntitiesToExperienceResponse,
  AssociateEntitiesToExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateEntitiesToExperienceRequest>,
  output: __S(34, __c1, 2) as any as S.Schema<AssociateEntitiesToExperienceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceAlreadyExistException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEntitiesToExperience",
}));

export type AssociatePersonasToEntitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceAlreadyExistException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the specific permissions of users or groups in your IAM Identity Center
 * identity source with access to your Amazon Kendra experience. You can create an Amazon Kendra
 * experience such as a search application. For more information on creating a
 * search application experience, see Building
 * a search experience with no code.
 */
export const associatePersonasToEntities: API.OperationMethod<
  AssociatePersonasToEntitiesRequest,
  AssociatePersonasToEntitiesResponse,
  AssociatePersonasToEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(98, __c3, 2) as any as S.Schema<AssociatePersonasToEntitiesRequest>,
  output: __S(34, __c1, 2) as any as S.Schema<AssociatePersonasToEntitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceAlreadyExistException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePersonasToEntities",
}));

export type BatchDeleteDocumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more documents from an index. The documents must have been added with
 * the `BatchPutDocument` API.
 *
 * The documents are deleted asynchronously. You can see the progress of the deletion by
 * using Amazon Web Services
 * CloudWatch. Any error messages related to the processing of the batch are sent to
 * your Amazon Web Services
 * CloudWatch log. You can also use the `BatchGetDocumentStatus` API to
 * monitor the progress of deleting your documents.
 *
 * Deleting documents from an index using `BatchDeleteDocument` could take up
 * to an hour or more, depending on the number of documents you want to delete.
 */
export const batchDeleteDocument: API.OperationMethod<
  BatchDeleteDocumentRequest,
  BatchDeleteDocumentResponse,
  BatchDeleteDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(129, __c4, 1) as any as S.Schema<BatchDeleteDocumentRequest>,
  output: __S(194, __c6, 2) as any as S.Schema<BatchDeleteDocumentResponse>,
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
  operationName: "BatchDeleteDocument",
}));

export type BatchDeleteFeaturedResultsSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more sets of featured results. Features results are placed
 * above all other results for certain queries. If there's an exact match of a
 * query, then one or more specific documents are featured in the search results.
 */
export const batchDeleteFeaturedResultsSet: API.OperationMethod<
  BatchDeleteFeaturedResultsSetRequest,
  BatchDeleteFeaturedResultsSetResponse,
  BatchDeleteFeaturedResultsSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<BatchDeleteFeaturedResultsSetRequest>,
  output: __S(227, __c7, 3) as any as S.Schema<BatchDeleteFeaturedResultsSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteFeaturedResultsSet",
}));

export type BatchGetDocumentStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the indexing status for one or more documents submitted with the
 * BatchPutDocument API.
 *
 * When you use the `BatchPutDocument` API, documents are indexed
 * asynchronously. You can use the `BatchGetDocumentStatus` API to get the
 * current status of a list of documents so that you can determine if they have been
 * successfully indexed.
 *
 * You can also use the `BatchGetDocumentStatus` API to check the status of
 * the
 * BatchDeleteDocument API. When a document is deleted from the index, Amazon Kendra returns `NOT_FOUND` as the status.
 */
export const batchGetDocumentStatus: API.OperationMethod<
  BatchGetDocumentStatusRequest,
  BatchGetDocumentStatusResponse,
  BatchGetDocumentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(258, __c8, 2) as any as S.Schema<BatchGetDocumentStatusRequest>,
  output: __S(263, __c8, 7) as any as S.Schema<BatchGetDocumentStatusResponse>,
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
  operationName: "BatchGetDocumentStatus",
}));

export type BatchPutDocumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more documents to an index.
 *
 * The `BatchPutDocument` API enables you to ingest inline documents or a set
 * of documents stored in an Amazon S3 bucket. Use this API to ingest your text and
 * unstructured text into an index, add custom attributes to the documents, and to attach
 * an access control list to the documents added to the index.
 *
 * The documents are indexed asynchronously. You can see the progress of the batch using
 * Amazon Web Services
 * CloudWatch. Any error messages related to processing the batch are sent to your
 * Amazon Web Services
 * CloudWatch log. You can also use the `BatchGetDocumentStatus` API to
 * monitor the progress of indexing your documents.
 *
 * For an example of ingesting inline documents using Python and Java SDKs, see Adding files
 * directly to an index.
 */
export const batchPutDocument: API.OperationMethod<
  BatchPutDocumentRequest,
  BatchPutDocumentResponse,
  BatchPutDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(354, __c11, 2) as any as S.Schema<BatchPutDocumentRequest>,
  output: __S(194, __c6, 2) as any as S.Schema<BatchPutDocumentResponse>,
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
  operationName: "BatchPutDocument",
}));

export type ClearQuerySuggestionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Clears existing query suggestions from an index.
 *
 * This deletes existing suggestions only, not the queries
 * in the query log. After you clear suggestions, Amazon Kendra learns
 * new suggestions based on new queries added to the query log
 * from the time you cleared suggestions. If you do not see any
 * new suggestions, then please allow Amazon Kendra to collect
 * enough queries to learn new suggestions.
 *
 * `ClearQuerySuggestions` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const clearQuerySuggestions: API.OperationMethod<
  ClearQuerySuggestionsRequest,
  ClearQuerySuggestionsResponse,
  ClearQuerySuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<ClearQuerySuggestionsRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<ClearQuerySuggestionsResponse>,
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
  operationName: "ClearQuerySuggestions",
}));

export type CreateAccessControlConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access configuration for your documents. This includes user and group
 * access information for your documents. This is useful for user context filtering, where
 * search results are filtered based on the user or their group access to documents.
 *
 * You can use this to re-configure your existing document level access control without
 * indexing all of your documents again. For example, your index contains top-secret
 * company documents that only certain employees or users should access. One of these users
 * leaves the company or switches to a team that should be blocked from accessing
 * top-secret documents. The user still has access to top-secret documents because the user
 * had access when your documents were previously indexed. You can create a specific access
 * control configuration for the user with deny access. You can later update the access
 * control configuration to allow access if the user returns to the company and re-joins
 * the 'top-secret' team. You can re-configure access control for your documents as
 * circumstances change.
 *
 * To apply your access control configuration to certain documents, you call the BatchPutDocument API with the `AccessControlConfigurationId`
 * included in the Document object. If you use an S3 bucket as a data source, you update the
 * `.metadata.json` with the `AccessControlConfigurationId` and
 * synchronize your data source. Amazon Kendra currently only supports access control
 * configuration for S3 data sources and documents indexed using the
 * `BatchPutDocument` API.
 *
 * You can't configure access control using
 * `CreateAccessControlConfiguration` for an Amazon Kendra Gen AI Enterprise
 * Edition index. Amazon Kendra will return a `ValidationException` error for a
 * `Gen_AI_ENTERPRISE_EDITION` index.
 */
export const createAccessControlConfiguration: API.OperationMethod<
  CreateAccessControlConfigurationRequest,
  CreateAccessControlConfigurationResponse,
  CreateAccessControlConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreateAccessControlConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateAccessControlConfigurationResponse>,
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
  operationName: "CreateAccessControlConfiguration",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceAlreadyExistException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data source connector that you want to use with an Amazon Kendra
 * index.
 *
 * You specify a name, data source connector type and description for your data source. You
 * also specify configuration information for the data source connector.
 *
 * `CreateDataSource` is a synchronous operation. The operation returns 200 if the
 * data source was successfully created. Otherwise, an exception is raised.
 *
 * For an example of creating an index and data source using the Python SDK, see Getting started with Python
 * SDK. For an example of creating an index and data source using the Java SDK, see
 * Getting started with Java
 * SDK.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<CreateDataSourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateDataSourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceAlreadyExistException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
}));

export type CreateExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Kendra experience such as a search application. For more information
 * on creating a search application experience, including using the Python and Java SDKs,
 * see Building a
 * search experience with no code.
 */
export const createExperience: API.OperationMethod<
  CreateExperienceRequest,
  CreateExperienceResponse,
  CreateExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreateExperienceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateExperienceResponse>,
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
  operationName: "CreateExperience",
}));

export type CreateFaqError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a set of frequently ask questions (FAQs) using a specified FAQ file stored
 * in an Amazon S3 bucket.
 *
 * Adding FAQs to an index is an asynchronous operation.
 *
 * For an example of adding an FAQ to an index using Python and Java SDKs, see Using your FAQ file.
 */
export const createFaq: API.OperationMethod<
  CreateFaqRequest,
  CreateFaqResponse,
  CreateFaqError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreateFaqRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreateFaqResponse>,
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
  operationName: "CreateFaq",
}));

export type CreateFeaturedResultsSetError =
  | AccessDeniedException
  | ConflictException
  | FeaturedResultsConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a set of featured results to display at the top of the search results page.
 * Featured results are placed above all other results for certain queries. You map
 * specific queries to specific documents for featuring in the results. If a query
 * contains an exact match, then one or more specific documents are featured in the
 * search results.
 *
 * You can create up to 50 sets of featured results per index. You can request to
 * increase this limit by contacting Support.
 */
export const createFeaturedResultsSet: API.OperationMethod<
  CreateFeaturedResultsSetRequest,
  CreateFeaturedResultsSetResponse,
  CreateFeaturedResultsSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<CreateFeaturedResultsSetRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<CreateFeaturedResultsSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    FeaturedResultsConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFeaturedResultsSet",
}));

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceAlreadyExistException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | NotAuthorizedException
  | KendraClosedToNewCustomers
  | CommonErrors;
/**
 * Creates an Amazon Kendra index. Index creation is an asynchronous API. To determine
 * if index creation has completed, check the `Status` field returned from a call to
 * `DescribeIndex`. The `Status` field is set to `ACTIVE` when
 * the index is ready to use.
 *
 * Once the index is active, you can index your documents using the
 * `BatchPutDocument` API or using one of the supported data sources.
 *
 * For an example of creating an index and data source using the Python SDK, see Getting started with Python
 * SDK. For an example of creating an index and data source using the Java SDK, see
 * Getting started with Java
 * SDK.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<CreateIndexRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreateIndexResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceAlreadyExistException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    NotAuthorizedException,
    KendraClosedToNewCustomers,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
}));

export type CreateQuerySuggestionsBlockListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a block list to exlcude certain queries from suggestions.
 *
 * Any query that contains words or phrases specified in the block
 * list is blocked or filtered out from being shown as a suggestion.
 *
 * You need to provide the file location of your block list text file
 * in your S3 bucket. In your text file, enter each block word or phrase
 * on a separate line.
 *
 * For information on the current quota limits for block lists, see
 * Quotas
 * for Amazon Kendra.
 *
 * `CreateQuerySuggestionsBlockList` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 *
 * For an example of creating a block list for query suggestions using the
 * Python SDK, see Query
 * suggestions block list.
 */
export const createQuerySuggestionsBlockList: API.OperationMethod<
  CreateQuerySuggestionsBlockListRequest,
  CreateQuerySuggestionsBlockListResponse,
  CreateQuerySuggestionsBlockListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CreateQuerySuggestionsBlockListRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreateQuerySuggestionsBlockListResponse>,
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
  operationName: "CreateQuerySuggestionsBlockList",
}));

export type CreateThesaurusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a thesaurus for an index. The thesaurus
 * contains a list of synonyms in Solr format.
 *
 * For an example of adding a thesaurus file to an index, see
 * Adding
 * custom synonyms to an index.
 */
export const createThesaurus: API.OperationMethod<
  CreateThesaurusRequest,
  CreateThesaurusResponse,
  CreateThesaurusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<CreateThesaurusRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreateThesaurusResponse>,
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
  operationName: "CreateThesaurus",
}));

export type DeleteAccessControlConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access control configuration that you created for your documents in an
 * index. This includes user and group access information for your documents. This is
 * useful for user context filtering, where search results are filtered based on the user
 * or their group access to documents.
 */
export const deleteAccessControlConfiguration: API.OperationMethod<
  DeleteAccessControlConfigurationRequest,
  DeleteAccessControlConfigurationResponse,
  DeleteAccessControlConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteAccessControlConfigurationRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteAccessControlConfigurationResponse>,
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
  operationName: "DeleteAccessControlConfiguration",
}));

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Kendra data source connector. An exception is not thrown if the
 * data source is already being deleted. While the data source is being deleted, the
 * `Status` field returned by a call to the `DescribeDataSource` API is
 * set to `DELETING`. For more information, see Deleting Data Sources.
 *
 * Deleting an entire data source or re-syncing your index after deleting specific documents
 * from a data source could take up to an hour or more, depending on the number of documents you
 * want to delete.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteDataSourceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteDataSourceResponse>,
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
  operationName: "DeleteDataSource",
}));

export type DeleteExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes your Amazon Kendra experience such as a search application. For more information on
 * creating a search application experience, see Building a search
 * experience with no code.
 */
export const deleteExperience: API.OperationMethod<
  DeleteExperienceRequest,
  DeleteExperienceResponse,
  DeleteExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteExperienceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteExperienceResponse>,
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
  operationName: "DeleteExperience",
}));

export type DeleteFaqError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a FAQ from an index.
 */
export const deleteFaq: API.OperationMethod<
  DeleteFaqRequest,
  DeleteFaqResponse,
  DeleteFaqError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<DeleteFaqRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteFaqResponse>,
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
  operationName: "DeleteFaq",
}));

export type DeleteIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Kendra index. An exception is not thrown if the index is already
 * being deleted. While the index is being deleted, the `Status` field returned by a
 * call to the `DescribeIndex` API is set to `DELETING`.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteIndexRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteIndexResponse>,
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
  operationName: "DeleteIndex",
}));

export type DeletePrincipalMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group so that all users that belong to the group can no
 * longer access documents only available to that group.
 *
 * For example, after deleting the group "Summer Interns", all interns who belonged to
 * that group no longer see intern-only documents in their search results.
 *
 * If you want to delete or replace users or sub groups of a group, you need to use the
 * `PutPrincipalMapping` operation. For example, if a user in the group
 * "Engineering" leaves the engineering team and another user takes their place, you
 * provide an updated list of users or sub groups that belong to the "Engineering" group
 * when calling `PutPrincipalMapping`. You can update your internal list of
 * users or sub groups and input this list when calling
 * `PutPrincipalMapping`.
 *
 * `DeletePrincipalMapping` is currently not supported in the Amazon Web Services GovCloud (US-West) region.
 */
export const deletePrincipalMapping: API.OperationMethod<
  DeletePrincipalMappingRequest,
  DeletePrincipalMappingResponse,
  DeletePrincipalMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<DeletePrincipalMappingRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeletePrincipalMappingResponse>,
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
  operationName: "DeletePrincipalMapping",
}));

export type DeleteQuerySuggestionsBlockListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a block list used for query suggestions for an index.
 *
 * A deleted block list might not take effect right away. Amazon Kendra
 * needs to refresh the entire suggestions list to add back the
 * queries that were previously blocked.
 *
 * `DeleteQuerySuggestionsBlockList` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const deleteQuerySuggestionsBlockList: API.OperationMethod<
  DeleteQuerySuggestionsBlockListRequest,
  DeleteQuerySuggestionsBlockListResponse,
  DeleteQuerySuggestionsBlockListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DeleteQuerySuggestionsBlockListRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteQuerySuggestionsBlockListResponse>,
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
  operationName: "DeleteQuerySuggestionsBlockList",
}));

export type DeleteThesaurusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Kendra thesaurus.
 */
export const deleteThesaurus: API.OperationMethod<
  DeleteThesaurusRequest,
  DeleteThesaurusResponse,
  DeleteThesaurusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteThesaurusRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteThesaurusResponse>,
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
  operationName: "DeleteThesaurus",
}));

export type DescribeAccessControlConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an access control configuration that you created for your
 * documents in an index. This includes user and group access information for your
 * documents. This is useful for user context filtering, where search results are filtered
 * based on the user or their group access to documents.
 */
export const describeAccessControlConfiguration: API.OperationMethod<
  DescribeAccessControlConfigurationRequest,
  DescribeAccessControlConfigurationResponse,
  DescribeAccessControlConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<DescribeAccessControlConfigurationRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DescribeAccessControlConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessControlConfiguration",
}));

export type DescribeDataSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Amazon Kendra data source connector.
 */
export const describeDataSource: API.OperationMethod<
  DescribeDataSourceRequest,
  DescribeDataSourceResponse,
  DescribeDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DescribeDataSourceRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<DescribeDataSourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSource",
}));

export type DescribeExperienceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about your Amazon Kendra experience such as a search application.
 * For more information on creating a search application experience,
 * see Building
 * a search experience with no code.
 */
export const describeExperience: API.OperationMethod<
  DescribeExperienceRequest,
  DescribeExperienceResponse,
  DescribeExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<DescribeExperienceRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<DescribeExperienceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExperience",
}));

export type DescribeFaqError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a FAQ.
 */
export const describeFaq: API.OperationMethod<
  DescribeFaqRequest,
  DescribeFaqResponse,
  DescribeFaqError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<DescribeFaqRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<DescribeFaqResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFaq",
}));

export type DescribeFeaturedResultsSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a set of featured results. Features results are placed
 * above all other results for certain queries. If there's an exact match of a query,
 * then one or more specific documents are featured in the search results.
 */
export const describeFeaturedResultsSet: API.OperationMethod<
  DescribeFeaturedResultsSetRequest,
  DescribeFeaturedResultsSetResponse,
  DescribeFeaturedResultsSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DescribeFeaturedResultsSetRequest>,
  output: __S(1603, __c50, 3) as any as S.Schema<DescribeFeaturedResultsSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeaturedResultsSet",
}));

export type DescribeIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Amazon Kendra index.
 */
export const describeIndex: API.OperationMethod<
  DescribeIndexRequest,
  DescribeIndexResponse,
  DescribeIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<DescribeIndexRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<DescribeIndexResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndex",
}));

export type DescribePrincipalMappingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the processing of `PUT` and `DELETE` actions for
 * mapping users to their groups. This includes information on the status of actions
 * currently processing or yet to be processed, when actions were last updated, when
 * actions were received by Amazon Kendra, the latest action that should process and
 * apply after other actions, and useful error messages if an action could not be
 * processed.
 *
 * `DescribePrincipalMapping` is currently not supported in the Amazon Web Services GovCloud (US-West) region.
 */
export const describePrincipalMapping: API.OperationMethod<
  DescribePrincipalMappingRequest,
  DescribePrincipalMappingResponse,
  DescribePrincipalMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<DescribePrincipalMappingRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<DescribePrincipalMappingResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePrincipalMapping",
}));

export type DescribeQuerySuggestionsBlockListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a block list used for query suggestions for
 * an index.
 *
 * This is used to check the current settings that are applied to a
 * block list.
 *
 * `DescribeQuerySuggestionsBlockList` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const describeQuerySuggestionsBlockList: API.OperationMethod<
  DescribeQuerySuggestionsBlockListRequest,
  DescribeQuerySuggestionsBlockListResponse,
  DescribeQuerySuggestionsBlockListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<DescribeQuerySuggestionsBlockListRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<DescribeQuerySuggestionsBlockListResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuerySuggestionsBlockList",
}));

export type DescribeQuerySuggestionsConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information on the settings of query suggestions for an index.
 *
 * This is used to check the current settings applied
 * to query suggestions.
 *
 * `DescribeQuerySuggestionsConfig` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const describeQuerySuggestionsConfig: API.OperationMethod<
  DescribeQuerySuggestionsConfigRequest,
  DescribeQuerySuggestionsConfigResponse,
  DescribeQuerySuggestionsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DescribeQuerySuggestionsConfigRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<DescribeQuerySuggestionsConfigResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuerySuggestionsConfig",
}));

export type DescribeThesaurusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Amazon Kendra thesaurus.
 */
export const describeThesaurus: API.OperationMethod<
  DescribeThesaurusRequest,
  DescribeThesaurusResponse,
  DescribeThesaurusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<DescribeThesaurusRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<DescribeThesaurusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThesaurus",
}));

export type DisassociateEntitiesFromExperienceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Prevents users or groups in your IAM Identity Center identity source
 * from accessing your Amazon Kendra experience. You can create an Amazon Kendra experience
 * such as a search application. For more information on creating a search
 * application experience, see Building
 * a search experience with no code.
 */
export const disassociateEntitiesFromExperience: API.OperationMethod<
  DisassociateEntitiesFromExperienceRequest,
  DisassociateEntitiesFromExperienceResponse,
  DisassociateEntitiesFromExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<DisassociateEntitiesFromExperienceRequest>,
  output: __S(34, __c1, 2) as any as S.Schema<DisassociateEntitiesFromExperienceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEntitiesFromExperience",
}));

export type DisassociatePersonasFromEntitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specific permissions of users or groups in your IAM Identity Center
 * identity source with access to your Amazon Kendra experience. You can create an Amazon Kendra
 * experience such as a search application. For more information on creating a
 * search application experience, see Building a
 * search experience with no code.
 */
export const disassociatePersonasFromEntities: API.OperationMethod<
  DisassociatePersonasFromEntitiesRequest,
  DisassociatePersonasFromEntitiesResponse,
  DisassociatePersonasFromEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<DisassociatePersonasFromEntitiesRequest>,
  output: __S(34, __c1, 2) as any as S.Schema<DisassociatePersonasFromEntitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePersonasFromEntities",
}));

export type GetQuerySuggestionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the queries that are suggested to your users.
 *
 * `GetQuerySuggestions` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const getQuerySuggestions: API.OperationMethod<
  GetQuerySuggestionsRequest,
  GetQuerySuggestionsResponse,
  GetQuerySuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1953, __c61, 1) as any as S.Schema<GetQuerySuggestionsRequest>,
  output: __S(1962, __c61, 10) as any as S.Schema<GetQuerySuggestionsResponse>,
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
  operationName: "GetQuerySuggestions",
}));

export type GetSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves search metrics data. The data provides a snapshot of how your users interact
 * with your search application and how effective the application is.
 */
export const getSnapshots: API.PaginatedOperationMethod<
  GetSnapshotsRequest,
  GetSnapshotsResponse,
  GetSnapshotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<GetSnapshotsRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<GetSnapshotsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessControlConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more access control configurations for an index. This includes user and
 * group access information for your documents. This is useful for user context filtering,
 * where search results are filtered based on the user or their group access to
 * documents.
 */
export const listAccessControlConfigurations: API.PaginatedOperationMethod<
  ListAccessControlConfigurationsRequest,
  ListAccessControlConfigurationsResponse,
  ListAccessControlConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<ListAccessControlConfigurationsRequest>,
  output: __S(2082, __c65, 2) as any as S.Schema<ListAccessControlConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessControlConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data source connectors that you have created.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<ListDataSourcesRequest>,
  output: __S(2115, __c66, 3) as any as S.Schema<ListDataSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSourceSyncJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets statistics about synchronizing a data source connector.
 */
export const listDataSourceSyncJobs: API.PaginatedOperationMethod<
  ListDataSourceSyncJobsRequest,
  ListDataSourceSyncJobsResponse,
  ListDataSourceSyncJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<ListDataSourceSyncJobsRequest>,
  output: __S(2148, __c67, 4) as any as S.Schema<ListDataSourceSyncJobsResponse>,
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
  operationName: "ListDataSourceSyncJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntityPersonasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists specific permissions of users and groups with access to your
 * Amazon Kendra experience.
 */
export const listEntityPersonas: API.PaginatedOperationMethod<
  ListEntityPersonasRequest,
  ListEntityPersonasResponse,
  ListEntityPersonasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<ListEntityPersonasRequest>,
  output: __S(2179, __c68, 3) as any as S.Schema<ListEntityPersonasResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityPersonas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperienceEntitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists users or groups in your IAM Identity Center identity source that are
 * granted access to your Amazon Kendra experience. You can create an Amazon Kendra experience
 * such as a search application. For more information on creating a search
 * application experience, see Building
 * a search experience with no code.
 */
export const listExperienceEntities: API.PaginatedOperationMethod<
  ListExperienceEntitiesRequest,
  ListExperienceEntitiesResponse,
  ListExperienceEntitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<ListExperienceEntitiesRequest>,
  output: __S(2212, __c69, 4) as any as S.Schema<ListExperienceEntitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperienceEntities",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListExperiencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more Amazon Kendra experiences. You can create an Amazon Kendra experience such
 * as a search application. For more information on creating a search application
 * experience, see Building a
 * search experience with no code.
 */
export const listExperiences: API.PaginatedOperationMethod<
  ListExperiencesRequest,
  ListExperiencesResponse,
  ListExperiencesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListExperiencesRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListExperiencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperiences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFaqsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of FAQs associated with an index.
 */
export const listFaqs: API.PaginatedOperationMethod<
  ListFaqsRequest,
  ListFaqsResponse,
  ListFaqsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListFaqsRequest>,
  output: __S(2275, __c71, 3) as any as S.Schema<ListFaqsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFaqs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFeaturedResultsSetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all your sets of featured results for a given index. Features results
 * are placed above all other results for certain queries. If there's an exact match
 * of a query, then one or more specific documents are featured in the search results.
 */
export const listFeaturedResultsSets: API.OperationMethod<
  ListFeaturedResultsSetsRequest,
  ListFeaturedResultsSetsResponse,
  ListFeaturedResultsSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<ListFeaturedResultsSetsRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListFeaturedResultsSetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFeaturedResultsSets",
}));

export type ListGroupsOlderThanOrderingIdError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of groups that are mapped to users before a given ordering or
 * timestamp identifier.
 *
 * `ListGroupsOlderThanOrderingId` is currently not supported in the Amazon Web Services GovCloud (US-West) region.
 */
export const listGroupsOlderThanOrderingId: API.PaginatedOperationMethod<
  ListGroupsOlderThanOrderingIdRequest,
  ListGroupsOlderThanOrderingIdResponse,
  ListGroupsOlderThanOrderingIdError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<ListGroupsOlderThanOrderingIdRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListGroupsOlderThanOrderingIdResponse>,
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
  operationName: "ListGroupsOlderThanOrderingId",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIndicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Kendra indexes that you created.
 */
export const listIndices: API.PaginatedOperationMethod<
  ListIndicesRequest,
  ListIndicesResponse,
  ListIndicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<ListIndicesRequest>,
  output: __S(2371, __c74, 3) as any as S.Schema<ListIndicesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQuerySuggestionsBlockListsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the block lists used for query suggestions for an index.
 *
 * For information on the current quota limits for block lists, see
 * Quotas
 * for Amazon Kendra.
 *
 * `ListQuerySuggestionsBlockLists` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const listQuerySuggestionsBlockLists: API.PaginatedOperationMethod<
  ListQuerySuggestionsBlockListsRequest,
  ListQuerySuggestionsBlockListsResponse,
  ListQuerySuggestionsBlockListsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<ListQuerySuggestionsBlockListsRequest>,
  output: __S(2403, __c75, 3) as any as S.Schema<ListQuerySuggestionsBlockListsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuerySuggestionsBlockLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of tags associated with a resource. Indexes, FAQs, data sources, and
 * other resources can have tags associated with them.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListThesauriError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the thesauri for an index.
 */
export const listThesauri: API.PaginatedOperationMethod<
  ListThesauriRequest,
  ListThesauriResponse,
  ListThesauriError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<ListThesauriRequest>,
  output: __S(2467, __c77, 3) as any as S.Schema<ListThesauriResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThesauri",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutPrincipalMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Maps users to their groups so that you only need to provide the user ID when you issue
 * the query.
 *
 * You can also map sub groups to groups. For example, the group "Company Intellectual
 * Property Teams" includes sub groups "Research" and "Engineering". These sub groups
 * include their own list of users or people who work in these teams. Only users who work
 * in research and engineering, and therefore belong in the intellectual property group,
 * can see top-secret company documents in their search results.
 *
 * This is useful for user context filtering, where search results are filtered based on
 * the user or their group access to documents. For more information, see Filtering on
 * user context.
 *
 * If more than five `PUT` actions for a group are currently processing, a
 * validation exception is thrown.
 */
export const putPrincipalMapping: API.OperationMethod<
  PutPrincipalMappingRequest,
  PutPrincipalMappingResponse,
  PutPrincipalMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2501, __c78, 5) as any as S.Schema<PutPrincipalMappingRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<PutPrincipalMappingResponse>,
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
  operationName: "PutPrincipalMapping",
}));

export type QueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches an index given an input query.
 *
 * If you are working with large language models (LLMs) or implementing retrieval
 * augmented generation (RAG) systems, you can use Amazon Kendra's Retrieve API, which can return longer semantically relevant passages. We
 * recommend using the `Retrieve` API instead of filing a service limit increase
 * to increase the `Query` API document excerpt length.
 *
 * You can configure boosting or relevance tuning at the query level to override boosting
 * at the index level, filter based on document fields/attributes and faceted search, and
 * filter based on the user or their group access to documents. You can also include certain
 * fields in the response that might provide useful additional information.
 *
 * A query response contains three types of results.
 *
 * - Relevant suggested answers. The answers can be either a text excerpt or table
 * excerpt. The answer can be highlighted in the excerpt.
 *
 * - Matching FAQs or questions-answer from your FAQ file.
 *
 * - Relevant documents. This result type includes an excerpt of the document with the
 * document title. The searched terms can be highlighted in the excerpt.
 *
 * You can specify that the query return only one type of result using the
 * `QueryResultTypeFilter` parameter. Each query returns the 100 most relevant
 * results. If you filter result type to only question-answers, a maximum of four results are
 * returned. If you filter result type to only answers, a maximum of three results are
 * returned.
 *
 * If you're using an Amazon Kendra Gen AI Enterprise Edition index, you can only use
 * `ATTRIBUTE_FILTER` to filter search results by user context. If you're
 * using an Amazon Kendra Gen AI Enterprise Edition index and you try to use
 * `USER_TOKEN` to configure user context policy, Amazon Kendra returns a
 * `ValidationException` error.
 */
export const query: API.OperationMethod<
  QueryRequest,
  QueryResult,
  QueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2535, __c79, 7) as any as S.Schema<QueryRequest>,
  output: __S(2564, __c80, 4) as any as S.Schema<QueryResult>,
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
  operationName: "Query",
}));

export type RetrieveError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves relevant passages or text excerpts given an input query.
 *
 * This API is similar to the Query API. However, by
 * default, the `Query` API only returns excerpt passages of up to 100 token
 * words. With the `Retrieve` API, you can retrieve longer passages of up to 200
 * token words and up to 100 semantically relevant passages. This doesn't include
 * question-answer or FAQ type responses from your index. The passages are text excerpts
 * that can be semantically extracted from multiple documents and multiple parts of the
 * same document. If in extreme cases your documents produce zero passages using the
 * `Retrieve` API, you can alternatively use the `Query` API and
 * its types of responses.
 *
 * You can also do the following:
 *
 * - Override boosting at the index level
 *
 * - Filter based on document fields or attributes
 *
 * - Filter based on the user or their group access to documents
 *
 * - View the confidence score bucket for a retrieved passage result. The
 * confidence bucket provides a relative ranking that indicates how confident
 * Amazon Kendra is that the response is relevant to the query.
 *
 * Confidence score buckets are currently available only for English.
 *
 * You can also include certain fields in the response that might provide useful
 * additional information.
 *
 * The `Retrieve` API shares the number of query capacity
 * units that you set for your index. For more information on what's included
 * in a single capacity unit and the default base capacity for an index, see Adjusting
 * capacity.
 *
 * If you're using an Amazon Kendra Gen AI Enterprise Edition index, you can only use
 * `ATTRIBUTE_FILTER` to filter search results by user context. If
 * you're using an Amazon Kendra Gen AI Enterprise Edition index and you try to use
 * `USER_TOKEN` to configure user context policy, Amazon Kendra returns a
 * `ValidationException` error.
 */
export const retrieve: API.OperationMethod<
  RetrieveRequest,
  RetrieveResult,
  RetrieveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<RetrieveRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<RetrieveResult>,
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
  operationName: "Retrieve",
}));

export type StartDataSourceSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a synchronization job for a data source connector. If a synchronization job is
 * already in progress, Amazon Kendra returns a `ResourceInUseException`
 * exception.
 *
 * Re-syncing your data source with your index after modifying, adding, or deleting
 * documents from your data source respository could take up to an hour or more, depending on
 * the number of documents to sync.
 */
export const startDataSourceSyncJob: API.OperationMethod<
  StartDataSourceSyncJobRequest,
  StartDataSourceSyncJobResponse,
  StartDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<StartDataSourceSyncJobRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<StartDataSourceSyncJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataSourceSyncJob",
}));

export type StopDataSourceSyncJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a synchronization job that is currently running. You can't stop a scheduled
 * synchronization job.
 */
export const stopDataSourceSyncJob: API.OperationMethod<
  StopDataSourceSyncJobRequest,
  StopDataSourceSyncJobResponse,
  StopDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<StopDataSourceSyncJobRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<StopDataSourceSyncJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDataSourceSyncJob",
}));

export type SubmitFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to provide feedback to Amazon Kendra to improve the
 * performance of your index.
 *
 * `SubmitFeedback` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const submitFeedback: API.OperationMethod<
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
  SubmitFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2724, __c85, 4) as any as S.Schema<SubmitFeedbackRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<SubmitFeedbackResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitFeedback",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tag to the specified index, FAQ, data source, or other resource. If
 * the tag already exists, the existing value is replaced with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
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
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from an index, FAQ, data source, or other resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccessControlConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an access control configuration for your documents in an index. This includes
 * user and group access information for your documents. This is useful for user context
 * filtering, where search results are filtered based on the user or their group access to
 * documents.
 *
 * You can update an access control configuration you created without indexing all of
 * your documents again. For example, your index contains top-secret company documents that
 * only certain employees or users should access. You created an 'allow' access control
 * configuration for one user who recently joined the 'top-secret' team, switching from a
 * team with 'deny' access to top-secret documents. However, the user suddenly returns to
 * their previous team and should no longer have access to top secret documents. You can
 * update the access control configuration to re-configure access control for your
 * documents as circumstances change.
 *
 * You call the BatchPutDocument API to
 * apply the updated access control configuration, with the
 * `AccessControlConfigurationId` included in the Document
 * object. If you use an S3 bucket as a data source, you synchronize your data source to
 * apply the `AccessControlConfigurationId` in the `.metadata.json`
 * file. Amazon Kendra currently only supports access control configuration for S3
 * data sources and documents indexed using the `BatchPutDocument` API.
 *
 * You can't configure access control using
 * `CreateAccessControlConfiguration` for an Amazon Kendra Gen AI Enterprise
 * Edition index. Amazon Kendra will return a `ValidationException` error for a
 * `Gen_AI_ENTERPRISE_EDITION` index.
 */
export const updateAccessControlConfiguration: API.OperationMethod<
  UpdateAccessControlConfigurationRequest,
  UpdateAccessControlConfigurationResponse,
  UpdateAccessControlConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<UpdateAccessControlConfigurationRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateAccessControlConfigurationResponse>,
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
  operationName: "UpdateAccessControlConfiguration",
}));

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Kendra data source connector.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<UpdateDataSourceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateDataSourceResponse>,
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
  operationName: "UpdateDataSource",
}));

export type UpdateExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates your Amazon Kendra experience such as a search application. For more information on
 * creating a search application experience, see Building a
 * search experience with no code.
 */
export const updateExperience: API.OperationMethod<
  UpdateExperienceRequest,
  UpdateExperienceResponse,
  UpdateExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<UpdateExperienceRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateExperienceResponse>,
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
  operationName: "UpdateExperience",
}));

export type UpdateFeaturedResultsSetError =
  | AccessDeniedException
  | FeaturedResultsConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a set of featured results. Features results are placed
 * above
 * all other results for certain queries. You map specific queries to specific documents
 * for featuring in the results. If a query contains an exact match of a query, then one
 * or more specific documents are featured in the search results.
 */
export const updateFeaturedResultsSet: API.OperationMethod<
  UpdateFeaturedResultsSetRequest,
  UpdateFeaturedResultsSetResponse,
  UpdateFeaturedResultsSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<UpdateFeaturedResultsSetRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<UpdateFeaturedResultsSetResponse>,
  errors: [
    AccessDeniedException,
    FeaturedResultsConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeaturedResultsSet",
}));

export type UpdateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Kendra index.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<UpdateIndexRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateIndexResponse>,
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
  operationName: "UpdateIndex",
}));

export type UpdateQuerySuggestionsBlockListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a block list used for query suggestions for an index.
 *
 * Updates to a block list might not take effect right away. Amazon Kendra
 * needs to refresh the entire suggestions list to apply any updates to the
 * block list. Other changes not related to the block list apply immediately.
 *
 * If a block list is updating, then you need to wait for the first update to
 * finish before submitting another update.
 *
 * Amazon Kendra supports partial updates, so you only need to provide the fields
 * you want to update.
 *
 * `UpdateQuerySuggestionsBlockList` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const updateQuerySuggestionsBlockList: API.OperationMethod<
  UpdateQuerySuggestionsBlockListRequest,
  UpdateQuerySuggestionsBlockListResponse,
  UpdateQuerySuggestionsBlockListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<UpdateQuerySuggestionsBlockListRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateQuerySuggestionsBlockListResponse>,
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
  operationName: "UpdateQuerySuggestionsBlockList",
}));

export type UpdateQuerySuggestionsConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings of query suggestions for an index.
 *
 * Amazon Kendra supports partial updates, so you only need to provide
 * the fields you want to update.
 *
 * If an update is currently processing, you
 * need to wait for the update to finish before making another update.
 *
 * Updates to query suggestions settings might not take effect right away.
 * The time for your updated settings to take effect depends on the updates
 * made and the number of search queries in your index.
 *
 * You can still enable/disable query suggestions at any time.
 *
 * `UpdateQuerySuggestionsConfig` is currently not supported in the
 * Amazon Web Services GovCloud (US-West) region.
 */
export const updateQuerySuggestionsConfig: API.OperationMethod<
  UpdateQuerySuggestionsConfigRequest,
  UpdateQuerySuggestionsConfigResponse,
  UpdateQuerySuggestionsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<UpdateQuerySuggestionsConfigRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateQuerySuggestionsConfigResponse>,
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
  operationName: "UpdateQuerySuggestionsConfig",
}));

export type UpdateThesaurusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a thesaurus for an index.
 */
export const updateThesaurus: API.OperationMethod<
  UpdateThesaurusRequest,
  UpdateThesaurusResponse,
  UpdateThesaurusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<UpdateThesaurusRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateThesaurusResponse>,
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
  operationName: "UpdateThesaurus",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String, EntityList: __S(65, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateEntitiesToExperienceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EntityId: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "FailedEntity" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() => S.Struct({ FailedEntityList: S.optional(__S(33, __c1, 1)) })).annotate(
        { identifier: "AssociateEntitiesToExperienceResponse" },
      );
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EntityId: S.String, EntityType: S.String })).annotate({
        identifier: "EntityConfiguration",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EntityId: S.String, Persona: S.String })).annotate({
        identifier: "EntityPersonaConfiguration",
      });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String, Personas: __S(97, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociatePersonasToEntitiesRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSourceId: S.String, DataSourceSyncJobId: S.optional(S.String) }),
      ).annotate({ identifier: "DataSourceSyncJobMetricTarget" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          DocumentIdList: __S(160, __c5, 0),
          DataSourceSyncJobMetricTarget: S.optional(__S(128, __c4, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteDocumentRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DataSourceId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchDeleteDocumentResponseFailedDocument" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() => S.Struct({ FailedDocuments: S.optional(__S(193, __c6, 1)) })).annotate(
        { identifier: "BatchDeleteDocumentResponse" },
      );
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, FeaturedResultsSetIds: __S(160, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDeleteFeaturedResultsSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.String, ErrorCode: S.String, ErrorMessage: S.String }),
      ).annotate({ identifier: "BatchDeleteFeaturedResultsSetError" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: __S(226, __c7, 2) })).annotate({
        identifier: "BatchDeleteFeaturedResultsSetResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DocumentId: S.String, Attributes: S.optional(__S(321, __c10, 1)) }),
      ).annotate({ identifier: "DocumentInfo" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, DocumentInfoList: __S(257, __c8, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDocumentStatusRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DocumentId: S.optional(S.String),
          DataSourceId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetDocumentStatusResponseError" });
    case 4:
      return S.Array(__S(259, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DocumentId: S.optional(S.String),
          DocumentStatus: S.optional(S.String),
          FailureCode: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "Status" });
    case 6:
      return S.Array(__S(261, __c8, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Errors: S.optional(__S(260, __c8, 4)),
          DocumentStatusList: S.optional(__S(262, __c8, 6)),
        }),
      ).annotate({ identifier: "BatchGetDocumentStatusResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StringValue: S.optional(S.String),
          StringListValue: S.optional(__S(160, __c5, 0)),
          LongValue: S.optional(S.Number),
          DateValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DocumentAttributeValue" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: __S(288, __c9, 0) })).annotate({
        identifier: "DocumentAttribute",
      });
    case 1:
      return S.Array(__S(320, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Title: S.optional(S.String),
          Blob: S.optional(T.Blob),
          S3Path: S.optional(__S(416, __c13, 0)),
          Attributes: S.optional(__S(321, __c10, 1)),
          AccessControlList: S.optional(__S(385, __c12, 1)),
          HierarchicalAccessControlList: S.optional(__S(387, __c12, 3)),
          ContentType: S.optional(S.String),
          AccessControlConfigurationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Document" });
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          RoleArn: S.optional(S.String),
          Documents: __S(353, __c11, 1),
          CustomDocumentEnrichmentConfiguration: S.optional(__S(453, __c14, 5)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchPutDocumentRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          Access: S.String,
          DataSourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Principal" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() => S.Struct({ PrincipalList: __S(385, __c12, 1) })).annotate({
        identifier: "HierarchicalPrincipal",
      });
    case 3:
      return S.Array(__S(386, __c12, 2));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Bucket: S.String, Key: S.String })).annotate({
        identifier: "S3Path",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConditionDocumentAttributeKey: S.String,
          Operator: S.String,
          ConditionOnValue: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "DocumentAttributeCondition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetDocumentAttributeKey: S.optional(S.String),
          TargetDocumentAttributeValueDeletion: S.optional(S.Boolean),
          TargetDocumentAttributeValue: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "DocumentAttributeTarget" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Condition: S.optional(__S(448, __c14, 0)),
          Target: S.optional(__S(449, __c14, 1)),
          DocumentContentDeletion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InlineCustomDocumentEnrichmentConfiguration" });
    case 3:
      return S.Array(__S(450, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          InvocationCondition: S.optional(__S(448, __c14, 0)),
          LambdaArn: S.String,
          S3Bucket: S.String,
        }),
      ).annotate({ identifier: "HookConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          InlineConfigurations: S.optional(__S(451, __c14, 3)),
          PreExtractionHookConfiguration: S.optional(__S(452, __c14, 4)),
          PostExtractionHookConfiguration: S.optional(__S(452, __c14, 4)),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomDocumentEnrichmentConfiguration" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryText: S.optional(S.String),
          SetName: S.optional(S.String),
          SetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConflictingItem" });
    case 1:
      return S.Array(__S(480, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ClearQuerySuggestionsRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "ClearQuerySuggestionsResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          AccessControlList: S.optional(__S(385, __c12, 1)),
          HierarchicalAccessControlList: S.optional(__S(387, __c12, 3)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccessControlConfigurationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String })).annotate({
        identifier: "CreateAccessControlConfigurationResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          IndexId: S.String,
          Type: S.String,
          Configuration: S.optional(__S(790, __c24, 22)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          Description: S.optional(S.String),
          Schedule: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Tags: S.optional(__S(673, __c21, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LanguageCode: S.optional(S.String),
          CustomDocumentEnrichmentConfiguration: S.optional(__S(453, __c14, 5)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataSourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(672, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Prefix: S.optional(S.String) })).annotate({
        identifier: "DocumentsMetadataConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ KeyPath: S.optional(S.String) })).annotate({
        identifier: "AccessControlListConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.String,
          InclusionPrefixes: S.optional(__S(160, __c5, 0)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          DocumentsMetadataConfiguration: S.optional(__S(736, __c23, 0)),
          AccessControlListConfiguration: S.optional(__S(737, __c23, 1)),
        }),
      ).annotate({ identifier: "S3DataSourceConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SubnetIds: __S(160, __c5, 0), SecurityGroupIds: __S(160, __c5, 0) }),
      ).annotate({ identifier: "DataSourceVpcConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DataSourceFieldName: S.String,
          DateFieldFormat: S.optional(S.String),
          IndexFieldName: S.String,
        }),
      ).annotate({ identifier: "DataSourceToIndexFieldMapping" });
    case 5:
      return S.Array(__S(740, __c23, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Host: S.String, Port: S.Number, Credentials: S.optional(S.String) }),
      ).annotate({ identifier: "ProxyConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          SharePointVersion: S.String,
          Urls: __S(160, __c5, 0),
          SecretArn: S.String,
          CrawlAttachments: S.optional(S.Boolean),
          UseChangeLog: S.optional(S.Boolean),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          DocumentTitleFieldName: S.optional(S.String),
          DisableLocalGroups: S.optional(S.Boolean),
          SslCertificateS3Path: S.optional(__S(416, __c13, 0)),
          AuthenticationType: S.optional(S.String),
          ProxyConfiguration: S.optional(__S(742, __c23, 6)),
        }),
      ).annotate({ identifier: "SharePointConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DatabaseHost: S.String,
          DatabasePort: S.Number,
          DatabaseName: S.String,
          TableName: S.String,
          SecretArn: S.String,
        }),
      ).annotate({ identifier: "ConnectionConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          DocumentIdColumnName: S.String,
          DocumentDataColumnName: S.String,
          DocumentTitleColumnName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          ChangeDetectingColumns: __S(160, __c5, 0),
        }),
      ).annotate({ identifier: "ColumnConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ AllowedGroupsColumnName: S.String })).annotate({
        identifier: "AclConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({ QueryIdentifiersEnclosingOption: S.optional(S.String) }),
      ).annotate({ identifier: "SqlConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          DatabaseEngineType: S.String,
          ConnectionConfiguration: __S(744, __c23, 8),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          ColumnConfiguration: __S(745, __c23, 9),
          AclConfiguration: S.optional(__S(746, __c23, 10)),
          SqlConfiguration: S.optional(__S(747, __c23, 11)),
        }),
      ).annotate({ identifier: "DatabaseConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "SalesforceStandardObjectConfiguration" });
    case 14:
      return S.Array(__S(749, __c23, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "SalesforceStandardKnowledgeArticleTypeConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "SalesforceCustomKnowledgeArticleTypeConfiguration" });
    case 17:
      return S.Array(__S(752, __c23, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          IncludedStates: __S(704, __c22, 0),
          StandardKnowledgeArticleTypeConfiguration: S.optional(__S(751, __c23, 15)),
          CustomKnowledgeArticleTypeConfigurations: S.optional(__S(753, __c23, 17)),
        }),
      ).annotate({ identifier: "SalesforceKnowledgeArticleConfiguration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          IncludeFilterTypes: S.optional(__S(704, __c22, 0)),
        }),
      ).annotate({ identifier: "SalesforceChatterFeedConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "SalesforceStandardObjectAttachmentConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          ServerUrl: S.String,
          SecretArn: S.String,
          StandardObjectConfigurations: S.optional(__S(750, __c23, 14)),
          KnowledgeArticleConfiguration: S.optional(__S(754, __c23, 18)),
          ChatterFeedConfiguration: S.optional(__S(755, __c23, 19)),
          CrawlAttachments: S.optional(S.Boolean),
          StandardObjectAttachmentConfiguration: S.optional(__S(756, __c23, 20)),
          IncludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
          ExcludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "SalesforceConfiguration" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          OneDriveUserList: S.optional(__S(160, __c5, 0)),
          OneDriveUserS3Path: S.optional(__S(416, __c13, 0)),
        }),
      ).annotate({ identifier: "OneDriveUsers" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          TenantDomain: S.String,
          SecretArn: S.String,
          OneDriveUsers: __S(758, __c23, 22),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          DisableLocalGroups: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OneDriveConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          CrawlAttachments: S.optional(S.Boolean),
          IncludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
          ExcludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          FilterQuery: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceNowKnowledgeArticleConfiguration" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          CrawlAttachments: S.optional(S.Boolean),
          IncludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
          ExcludeAttachmentFilePatterns: S.optional(__S(160, __c5, 0)),
          DocumentDataFieldName: S.String,
          DocumentTitleFieldName: S.optional(S.String),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "ServiceNowServiceCatalogConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          HostUrl: S.String,
          SecretArn: S.String,
          ServiceNowBuildVersion: S.String,
          KnowledgeArticleConfiguration: S.optional(__S(760, __c23, 24)),
          ServiceCatalogConfiguration: S.optional(__S(761, __c23, 25)),
          AuthenticationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceNowConfiguration" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          DataSourceFieldName: S.optional(S.String),
          DateFieldFormat: S.optional(S.String),
          IndexFieldName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfluenceSpaceToIndexFieldMapping" });
    case 28:
      return S.Array(__S(763, __c23, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          CrawlPersonalSpaces: S.optional(S.Boolean),
          CrawlArchivedSpaces: S.optional(S.Boolean),
          IncludeSpaces: S.optional(__S(160, __c5, 0)),
          ExcludeSpaces: S.optional(__S(160, __c5, 0)),
          SpaceFieldMappings: S.optional(__S(764, __c23, 28)),
        }),
      ).annotate({ identifier: "ConfluenceSpaceConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({ PageFieldMappings: S.optional(__S(764, __c23, 28)) }),
      ).annotate({ identifier: "ConfluencePageConfiguration" });
    case 31:
      return S.suspend(() =>
        S.Struct({ BlogFieldMappings: S.optional(__S(764, __c23, 28)) }),
      ).annotate({ identifier: "ConfluenceBlogConfiguration" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrawlAttachments: S.optional(S.Boolean),
          AttachmentFieldMappings: S.optional(__S(764, __c23, 28)),
        }),
      ).annotate({ identifier: "ConfluenceAttachmentConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServerUrl: S.String,
          SecretArn: S.String,
          Version: S.String,
          SpaceConfiguration: S.optional(__S(765, __c23, 29)),
          PageConfiguration: S.optional(__S(766, __c23, 30)),
          BlogConfiguration: S.optional(__S(767, __c23, 31)),
          AttachmentConfiguration: S.optional(__S(768, __c24, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          ProxyConfiguration: S.optional(__S(742, __c23, 6)),
          AuthenticationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfluenceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SecretArn: S.String,
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
          ExcludeMimeTypes: S.optional(__S(160, __c5, 0)),
          ExcludeUserAccounts: S.optional(__S(160, __c5, 0)),
          ExcludeSharedDrives: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "GoogleDriveConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SeedUrls: __S(160, __c5, 0), WebCrawlerMode: S.optional(S.String) }),
      ).annotate({ identifier: "SeedUrlConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ SiteMaps: __S(160, __c5, 0) })).annotate({
        identifier: "SiteMapsConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SeedUrlConfiguration: S.optional(__S(771, __c24, 3)),
          SiteMapsConfiguration: S.optional(__S(772, __c24, 4)),
        }),
      ).annotate({ identifier: "Urls" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Host: S.String, Port: S.Number, Credentials: S.String }),
      ).annotate({ identifier: "BasicAuthenticationConfiguration" });
    case 7:
      return S.Array(__S(774, __c24, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ BasicAuthentication: S.optional(__S(775, __c24, 7)) }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Urls: __S(773, __c24, 5),
          CrawlDepth: S.optional(S.Number),
          MaxLinksPerPage: S.optional(S.Number),
          MaxContentSizePerPageInMegaBytes: S.optional(S.Number),
          MaxUrlsPerMinuteCrawlRate: S.optional(S.Number),
          UrlInclusionPatterns: S.optional(__S(160, __c5, 0)),
          UrlExclusionPatterns: S.optional(__S(160, __c5, 0)),
          ProxyConfiguration: S.optional(__S(742, __c23, 6)),
          AuthenticationConfiguration: S.optional(__S(776, __c24, 8)),
        }),
      ).annotate({ identifier: "WebCrawlerConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          CrawlComments: S.optional(S.Boolean),
          UseChangeLog: S.optional(S.Boolean),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "WorkDocsConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.String,
          FileSystemType: S.String,
          VpcConfiguration: __S(739, __c23, 3),
          SecretArn: S.optional(S.String),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "FsxConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          TeamId: S.String,
          SecretArn: S.String,
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          SlackEntityList: __S(704, __c22, 0),
          UseChangeLog: S.optional(S.Boolean),
          CrawlBotMessage: S.optional(S.Boolean),
          ExcludeArchived: S.optional(S.Boolean),
          SinceCrawlDate: S.String,
          LookBackPeriod: S.optional(S.Number),
          PrivateChannelFilter: S.optional(__S(160, __c5, 0)),
          PublicChannelFilter: S.optional(__S(160, __c5, 0)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          FieldMappings: S.optional(__S(741, __c23, 5)),
        }),
      ).annotate({ identifier: "SlackConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          EnterpriseId: S.String,
          SecretArn: S.String,
          UseChangeLog: S.optional(S.Boolean),
          CrawlComments: S.optional(S.Boolean),
          CrawlTasks: S.optional(S.Boolean),
          CrawlWebLinks: S.optional(S.Boolean),
          FileFieldMappings: S.optional(__S(741, __c23, 5)),
          TaskFieldMappings: S.optional(__S(741, __c23, 5)),
          CommentFieldMappings: S.optional(__S(741, __c23, 5)),
          WebLinkFieldMappings: S.optional(__S(741, __c23, 5)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
        }),
      ).annotate({ identifier: "BoxConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          SecretArn: S.String,
          CrawlFileComments: S.optional(S.Boolean),
          CrawlChatRooms: S.optional(S.Boolean),
          CrawlAttachments: S.optional(S.Boolean),
          FolderIds: S.optional(__S(160, __c5, 0)),
          ThreadFieldMappings: S.optional(__S(741, __c23, 5)),
          MessageFieldMappings: S.optional(__S(741, __c23, 5)),
          AttachmentFieldMappings: S.optional(__S(741, __c23, 5)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
        }),
      ).annotate({ identifier: "QuipConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          JiraAccountUrl: S.String,
          SecretArn: S.String,
          UseChangeLog: S.optional(S.Boolean),
          Project: S.optional(__S(160, __c5, 0)),
          IssueType: S.optional(__S(160, __c5, 0)),
          Status: S.optional(__S(160, __c5, 0)),
          IssueSubEntityFilter: S.optional(__S(704, __c22, 0)),
          AttachmentFieldMappings: S.optional(__S(741, __c23, 5)),
          CommentFieldMappings: S.optional(__S(741, __c23, 5)),
          IssueFieldMappings: S.optional(__S(741, __c23, 5)),
          ProjectFieldMappings: S.optional(__S(741, __c23, 5)),
          WorkLogFieldMappings: S.optional(__S(741, __c23, 5)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
        }),
      ).annotate({ identifier: "JiraConfiguration" });
    case 16:
      return S.suspend(() => S.Struct({ OrganizationName: S.String, HostUrl: S.String })).annotate({
        identifier: "SaaSConfiguration",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          HostUrl: S.String,
          OrganizationName: S.String,
          SslCertificateS3Path: __S(416, __c13, 0),
        }),
      ).annotate({ identifier: "OnPremiseConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          CrawlRepositoryDocuments: S.optional(S.Boolean),
          CrawlIssue: S.optional(S.Boolean),
          CrawlIssueComment: S.optional(S.Boolean),
          CrawlIssueCommentAttachment: S.optional(S.Boolean),
          CrawlPullRequest: S.optional(S.Boolean),
          CrawlPullRequestComment: S.optional(S.Boolean),
          CrawlPullRequestCommentAttachment: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GitHubDocumentCrawlProperties" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          SaaSConfiguration: S.optional(__S(784, __c24, 16)),
          OnPremiseConfiguration: S.optional(__S(785, __c24, 17)),
          Type: S.optional(S.String),
          SecretArn: S.String,
          UseChangeLog: S.optional(S.Boolean),
          GitHubDocumentCrawlProperties: S.optional(__S(786, __c24, 18)),
          RepositoryFilter: S.optional(__S(160, __c5, 0)),
          InclusionFolderNamePatterns: S.optional(__S(160, __c5, 0)),
          InclusionFileTypePatterns: S.optional(__S(160, __c5, 0)),
          InclusionFileNamePatterns: S.optional(__S(160, __c5, 0)),
          ExclusionFolderNamePatterns: S.optional(__S(160, __c5, 0)),
          ExclusionFileTypePatterns: S.optional(__S(160, __c5, 0)),
          ExclusionFileNamePatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          GitHubRepositoryConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubCommitConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubIssueDocumentConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubIssueCommentConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubIssueAttachmentConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubPullRequestCommentConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubPullRequestDocumentConfigurationFieldMappings: S.optional(__S(741, __c23, 5)),
          GitHubPullRequestDocumentAttachmentConfigurationFieldMappings: S.optional(
            __S(741, __c23, 5),
          ),
        }),
      ).annotate({ identifier: "GitHubConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          SiteUrl: S.String,
          SiteId: S.String,
          SecretArn: S.String,
          SslCertificateS3Path: __S(416, __c13, 0),
          CrawlSystemFolders: S.optional(S.Boolean),
          CrawlComments: S.optional(S.Boolean),
          EntityFilter: S.optional(__S(704, __c22, 0)),
          DocumentLibraryFieldMappings: S.optional(__S(741, __c23, 5)),
          BlogFieldMappings: S.optional(__S(741, __c23, 5)),
          WikiFieldMappings: S.optional(__S(741, __c23, 5)),
          InclusionPatterns: S.optional(__S(160, __c5, 0)),
          ExclusionPatterns: S.optional(__S(160, __c5, 0)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
        }),
      ).annotate({ identifier: "AlfrescoConfiguration" });
    case 21:
      return S.suspend(() => S.Struct({ Template: S.optional(S.Any) })).annotate({
        identifier: "TemplateConfiguration",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          S3Configuration: S.optional(__S(738, __c23, 2)),
          SharePointConfiguration: S.optional(__S(743, __c23, 7)),
          DatabaseConfiguration: S.optional(__S(748, __c23, 12)),
          SalesforceConfiguration: S.optional(__S(757, __c23, 21)),
          OneDriveConfiguration: S.optional(__S(759, __c23, 23)),
          ServiceNowConfiguration: S.optional(__S(762, __c23, 26)),
          ConfluenceConfiguration: S.optional(__S(769, __c24, 1)),
          GoogleDriveConfiguration: S.optional(__S(770, __c24, 2)),
          WebCrawlerConfiguration: S.optional(__S(777, __c24, 9)),
          WorkDocsConfiguration: S.optional(__S(778, __c24, 10)),
          FsxConfiguration: S.optional(__S(779, __c24, 11)),
          SlackConfiguration: S.optional(__S(780, __c24, 12)),
          BoxConfiguration: S.optional(__S(781, __c24, 13)),
          QuipConfiguration: S.optional(__S(782, __c24, 14)),
          JiraConfiguration: S.optional(__S(783, __c24, 15)),
          GitHubConfiguration: S.optional(__S(787, __c24, 19)),
          AlfrescoConfiguration: S.optional(__S(788, __c24, 20)),
          TemplateConfiguration: S.optional(__S(789, __c24, 21)),
        }),
      ).annotate({ identifier: "DataSourceConfiguration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          IndexId: S.String,
          RoleArn: S.optional(S.String),
          Configuration: S.optional(__S(834, __c26, 2)),
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExperienceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSourceIds: S.optional(__S(160, __c5, 0)),
          FaqIds: S.optional(__S(160, __c5, 0)),
          DirectPutContent: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ContentSourceConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ IdentityAttributeName: S.optional(S.String) })).annotate({
        identifier: "UserIdentityConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContentSourceConfiguration: S.optional(__S(832, __c26, 0)),
          UserIdentityConfiguration: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "ExperienceConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          S3Path: __S(416, __c13, 0),
          RoleArn: S.String,
          Tags: S.optional(__S(673, __c21, 1)),
          FileFormat: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LanguageCode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFaqRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "CreateFaqResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          FeaturedResultsSetName: S.String,
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String),
          Status: S.optional(S.String),
          QueryTexts: S.optional(__S(160, __c5, 0)),
          FeaturedDocuments: S.optional(__S(960, __c30, 0)),
          Tags: S.optional(__S(673, __c21, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFeaturedResultsSetRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(896, __c28, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FeaturedResultsSetId: S.optional(S.String),
          FeaturedResultsSetName: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          QueryTexts: S.optional(__S(160, __c5, 0)),
          FeaturedDocuments: S.optional(__S(960, __c30, 0)),
          LastUpdatedTimestamp: S.optional(S.Number),
          CreationTimestamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FeaturedResultsSet" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FeaturedResultsSet: S.optional(__S(992, __c31, 0)) }),
      ).annotate({ identifier: "CreateFeaturedResultsSetResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Edition: S.optional(S.String),
          RoleArn: S.String,
          ServerSideEncryptionConfiguration: S.optional(__S(1056, __c33, 0)),
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(673, __c21, 1)),
          UserTokenConfigurations: S.optional(__S(1091, __c34, 3)),
          UserContextPolicy: S.optional(S.String),
          UserGroupResolutionConfiguration: S.optional(__S(1092, __c34, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIndexRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KmsKeyId: S.optional(SensitiveString) })).annotate({
        identifier: "ServerSideEncryptionConfiguration",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyLocation: S.String,
          URL: S.optional(S.String),
          SecretManagerArn: S.optional(S.String),
          UserNameAttributeField: S.optional(S.String),
          GroupAttributeField: S.optional(S.String),
          Issuer: S.optional(S.String),
          ClaimRegex: S.optional(S.String),
        }),
      ).annotate({ identifier: "JwtTokenTypeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ UserNameAttributeField: S.String, GroupAttributeField: S.String }),
      ).annotate({ identifier: "JsonTokenTypeConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JwtTokenTypeConfiguration: S.optional(__S(1088, __c34, 0)),
          JsonTokenTypeConfiguration: S.optional(__S(1089, __c34, 1)),
        }),
      ).annotate({ identifier: "UserTokenConfiguration" });
    case 3:
      return S.Array(__S(1090, __c34, 2));
    case 4:
      return S.suspend(() => S.Struct({ UserGroupResolutionMode: S.String })).annotate({
        identifier: "UserGroupResolutionConfiguration",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          SourceS3Path: __S(416, __c13, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          RoleArn: S.String,
          Tags: S.optional(__S(673, __c21, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateQuerySuggestionsBlockListRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          RoleArn: S.String,
          Tags: S.optional(__S(673, __c21, 1)),
          SourceS3Path: __S(416, __c13, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateThesaurusRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessControlConfigurationRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDataSourceRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExperienceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFaqRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIndexRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          DataSourceId: S.optional(S.String),
          GroupId: S.String,
          OrderingId: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeletePrincipalMappingRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteQuerySuggestionsBlockListRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteThesaurusRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccessControlConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          AccessControlList: S.optional(__S(385, __c12, 1)),
          HierarchicalAccessControlList: S.optional(__S(387, __c12, 3)),
        }),
      ).annotate({ identifier: "DescribeAccessControlConfigurationResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDataSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          IndexId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Configuration: S.optional(__S(790, __c24, 22)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          Schedule: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          CustomDocumentEnrichmentConfiguration: S.optional(__S(453, __c14, 5)),
        }),
      ).annotate({ identifier: "DescribeDataSourceResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeExperienceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          IndexId: S.optional(S.String),
          Name: S.optional(S.String),
          Endpoints: S.optional(__S(1537, __c48, 1)),
          Configuration: S.optional(__S(834, __c26, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeExperienceResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointType: S.optional(S.String), Endpoint: S.optional(S.String) }),
      ).annotate({ identifier: "ExperienceEndpoint" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFaqRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          IndexId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          S3Path: S.optional(__S(416, __c13, 0)),
          Status: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          FileFormat: S.optional(S.String),
          LanguageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeFaqResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, FeaturedResultsSetId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFeaturedResultsSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Title: S.optional(S.String),
          URI: S.optional(S.String),
        }),
      ).annotate({ identifier: "FeaturedDocumentWithMetadata" });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FeaturedResultsSetId: S.optional(S.String),
          FeaturedResultsSetName: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          QueryTexts: S.optional(__S(160, __c5, 0)),
          FeaturedDocumentsWithMetadata: S.optional(__S(1602, __c50, 2)),
          FeaturedDocumentsMissing: S.optional(__S(960, __c30, 0)),
          LastUpdatedTimestamp: S.optional(S.Number),
          CreationTimestamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DescribeFeaturedResultsSetResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIndexRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IndexedQuestionAnswersCount: S.Number })).annotate({
        identifier: "FaqStatistics",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ IndexedTextDocumentsCount: S.Number, IndexedTextBytes: S.Number }),
      ).annotate({ identifier: "TextDocumentStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FaqStatistics: __S(1633, __c51, 1),
          TextDocumentStatistics: __S(1634, __c51, 2),
        }),
      ).annotate({ identifier: "IndexStatistics" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Edition: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ServerSideEncryptionConfiguration: S.optional(__S(1056, __c33, 0)),
          Status: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DocumentMetadataConfigurations: S.optional(__S(1698, __c53, 2)),
          IndexStatistics: S.optional(__S(1635, __c51, 3)),
          ErrorMessage: S.optional(S.String),
          CapacityUnits: S.optional(__S(1699, __c53, 3)),
          UserTokenConfigurations: S.optional(__S(1091, __c34, 3)),
          UserContextPolicy: S.optional(S.String),
          UserGroupResolutionConfiguration: S.optional(__S(1092, __c34, 4)),
        }),
      ).annotate({ identifier: "DescribeIndexResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Freshness: S.optional(S.Boolean),
          Importance: S.optional(S.Number),
          Duration: S.optional(S.String),
          RankOrder: S.optional(S.String),
          ValueImportanceMap: S.optional(__S(1664, __c52, 0)),
        }),
      ).annotate({ identifier: "Relevance" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Facetable: S.optional(S.Boolean),
          Searchable: S.optional(S.Boolean),
          Displayable: S.optional(S.Boolean),
          Sortable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Search" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          Relevance: S.optional(__S(1665, __c52, 1)),
          Search: S.optional(__S(1696, __c53, 0)),
        }),
      ).annotate({ identifier: "DocumentMetadataConfiguration" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ StorageCapacityUnits: S.Number, QueryCapacityUnits: S.Number }),
      ).annotate({ identifier: "CapacityUnitsConfiguration" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, DataSourceId: S.optional(S.String), GroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePrincipalMappingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReceivedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OrderingId: S.optional(S.Number),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupOrderingIdSummary" });
    case 2:
      return S.Array(__S(1729, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.optional(S.String),
          DataSourceId: S.optional(S.String),
          GroupId: S.optional(S.String),
          GroupOrderingIdSummaries: S.optional(__S(1730, __c54, 2)),
        }),
      ).annotate({ identifier: "DescribePrincipalMappingResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String, Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeQuerySuggestionsBlockListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceS3Path: S.optional(__S(416, __c13, 0)),
          ItemCount: S.optional(S.Number),
          FileSizeBytes: S.optional(S.Number),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeQuerySuggestionsBlockListResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeQuerySuggestionsConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          Status: S.optional(S.String),
          QueryLogLookBackWindowInDays: S.optional(S.Number),
          IncludeQueriesWithoutUserInformation: S.optional(S.Boolean),
          MinimumNumberOfQueryingUsers: S.optional(S.Number),
          MinimumQueryCount: S.optional(S.Number),
          LastSuggestionsBuildTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastClearTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalSuggestionsCount: S.optional(S.Number),
          AttributeSuggestionsConfig: S.optional(__S(1826, __c57, 2)),
        }),
      ).annotate({ identifier: "DescribeQuerySuggestionsConfigResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), Suggestable: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SuggestableConfig" });
    case 1:
      return S.Array(__S(1824, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SuggestableConfigList: S.optional(__S(1825, __c57, 1)),
          AttributeSuggestionsMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttributeSuggestionsDescribeConfig" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeThesaurusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          IndexId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RoleArn: S.optional(S.String),
          SourceS3Path: S.optional(__S(416, __c13, 0)),
          FileSizeBytes: S.optional(S.Number),
          TermCount: S.optional(S.Number),
          SynonymRuleCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DescribeThesaurusResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String, EntityList: __S(65, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateEntitiesFromExperienceRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String, EntityIds: __S(160, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociatePersonasFromEntitiesRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SuggestionAttributes: S.optional(__S(160, __c5, 0)),
          AdditionalResponseAttributes: S.optional(__S(160, __c5, 0)),
          AttributeFilter: S.optional(__S(1985, __c62, 1)),
          UserContext: S.optional(__S(1988, __c62, 4)),
        }),
      ).annotate({ identifier: "AttributeSuggestionsGetConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          QueryText: S.String,
          MaxSuggestionsCount: S.optional(S.Number),
          SuggestionTypes: S.optional(__S(704, __c22, 0)),
          AttributeSuggestionsConfig: S.optional(__S(1952, __c61, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQuerySuggestionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ BeginOffset: S.optional(S.Number), EndOffset: S.optional(S.Number) }),
      ).annotate({ identifier: "SuggestionHighlight" });
    case 3:
      return S.Array(__S(1954, __c61, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Highlights: S.optional(__S(1955, __c61, 3)) }),
      ).annotate({ identifier: "SuggestionTextWithHighlights" });
    case 5:
      return S.suspend(() => S.Struct({ Text: S.optional(__S(1956, __c61, 4)) })).annotate({
        identifier: "SuggestionValue",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DocumentId: S.optional(S.String),
          SuggestionAttributes: S.optional(__S(160, __c5, 0)),
          AdditionalAttributes: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "SourceDocument" });
    case 7:
      return S.Array(__S(1958, __c61, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Value: S.optional(__S(1957, __c61, 5)),
          SourceDocuments: S.optional(__S(1959, __c61, 7)),
        }),
      ).annotate({ identifier: "Suggestion" });
    case 9:
      return S.Array(__S(1960, __c61, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          QuerySuggestionsId: S.optional(S.String),
          Suggestions: S.optional(__S(1961, __c61, 9)),
        }),
      ).annotate({ identifier: "GetQuerySuggestionsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<AttributeFilter> => __S(1985, __c62, 1)).annotate({
          identifier: "AttributeFilter",
        }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          AndAllFilters: S.optional(
            S.suspend(() => __S(1984, __c62, 0)).annotate({ identifier: "AttributeFilterList" }),
          ),
          OrAllFilters: S.optional(
            S.suspend(() => __S(1984, __c62, 0)).annotate({ identifier: "AttributeFilterList" }),
          ),
          NotFilter: S.optional(
            S.suspend((): S.Schema<AttributeFilter> => __S(1985, __c62, 1)).annotate({
              identifier: "AttributeFilter",
            }),
          ),
          EqualsTo: S.optional(__S(320, __c10, 0)),
          ContainsAll: S.optional(__S(320, __c10, 0)),
          ContainsAny: S.optional(__S(320, __c10, 0)),
          GreaterThan: S.optional(__S(320, __c10, 0)),
          GreaterThanOrEquals: S.optional(__S(320, __c10, 0)),
          LessThan: S.optional(__S(320, __c10, 0)),
          LessThanOrEquals: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "AttributeFilter" });
    case 2:
      return S.suspend(() => S.Struct({ GroupId: S.String, DataSourceId: S.String })).annotate({
        identifier: "DataSourceGroup",
      });
    case 3:
      return S.Array(__S(1986, __c62, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Token: S.optional(SensitiveString),
          UserId: S.optional(S.String),
          Groups: S.optional(__S(160, __c5, 0)),
          DataSourceGroups: S.optional(__S(1987, __c62, 3)),
        }),
      ).annotate({ identifier: "UserContext" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Interval: S.String,
          MetricType: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSnapshotsRequest" });
    case 1:
      return S.Array(__S(160, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapShotTimeFilter: S.optional(__S(2048, __c64, 0)),
          SnapshotsDataHeader: S.optional(__S(160, __c5, 0)),
          SnapshotsData: S.optional(__S(2017, __c63, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSnapshotsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimeRange" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccessControlConfigurationsRequest" });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          AccessControlConfigurations: __S(2081, __c65, 1),
        }),
      ).annotate({ identifier: "ListAccessControlConfigurationsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          LanguageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataSourceSummary" });
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SummaryItems: S.optional(__S(2114, __c66, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataSourcesResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          StartTimeFilter: S.optional(__S(2048, __c64, 0)),
          StatusFilter: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataSourceSyncJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentsAdded: S.optional(S.String),
          DocumentsModified: S.optional(S.String),
          DocumentsDeleted: S.optional(S.String),
          DocumentsFailed: S.optional(S.String),
          DocumentsScanned: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataSourceSyncJobMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ExecutionId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          DataSourceErrorCode: S.optional(S.String),
          Metrics: S.optional(__S(2145, __c67, 1)),
        }),
      ).annotate({ identifier: "DataSourceSyncJob" });
    case 3:
      return S.Array(__S(2146, __c67, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ History: S.optional(__S(2147, __c67, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceSyncJobsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEntityPersonasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EntityId: S.optional(S.String),
          Persona: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PersonasSummary" });
    case 2:
      return S.Array(__S(2177, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SummaryItems: S.optional(__S(2178, __c68, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEntityPersonasResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListExperienceEntitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(SensitiveString),
          GroupName: S.optional(SensitiveString),
          IdentifiedUserName: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EntityDisplayData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EntityId: S.optional(S.String),
          EntityType: S.optional(S.String),
          DisplayData: S.optional(__S(2209, __c69, 1)),
        }),
      ).annotate({ identifier: "ExperienceEntitiesSummary" });
    case 3:
      return S.Array(__S(2210, __c69, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          SummaryItems: S.optional(__S(2211, __c69, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListExperienceEntitiesResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExperiencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Endpoints: S.optional(__S(1537, __c48, 1)),
        }),
      ).annotate({ identifier: "ExperiencesSummary" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SummaryItems: S.optional(__S(2242, __c70, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListExperiencesResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFaqsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileFormat: S.optional(S.String),
          LanguageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FaqSummary" });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FaqSummaryItems: S.optional(__S(2274, __c71, 2)),
        }),
      ).annotate({ identifier: "ListFaqsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFeaturedResultsSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FeaturedResultsSetId: S.optional(S.String),
          FeaturedResultsSetName: S.optional(S.String),
          Status: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Number),
          CreationTimestamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FeaturedResultsSetSummary" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FeaturedResultsSetSummaryItems: S.optional(__S(2306, __c72, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFeaturedResultsSetsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          DataSourceId: S.optional(S.String),
          OrderingId: S.Number,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupsOlderThanOrderingIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GroupId: S.optional(S.String), OrderingId: S.optional(S.Number) }),
      ).annotate({ identifier: "GroupSummary" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GroupsSummaries: S.optional(__S(2338, __c73, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListGroupsOlderThanOrderingIdResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIndicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Edition: S.optional(S.String),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
        }),
      ).annotate({ identifier: "IndexConfigurationSummary" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IndexConfigurationSummaryItems: S.optional(__S(2370, __c74, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIndicesResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQuerySuggestionsBlockListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ItemCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QuerySuggestionsBlockListSummary" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BlockListSummaryItems: S.optional(__S(2402, __c75, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListQuerySuggestionsBlockListsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(673, __c21, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListThesauriRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ThesaurusSummary" });
    case 2:
      return S.Array(__S(2465, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ThesaurusSummaryItems: S.optional(__S(2466, __c77, 2)),
        }),
      ).annotate({ identifier: "ListThesauriResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String, DataSourceId: S.optional(S.String) }),
      ).annotate({ identifier: "MemberGroup" });
    case 1:
      return S.Array(__S(2496, __c78, 0));
    case 2:
      return S.suspend(() => S.Struct({ UserId: S.String })).annotate({ identifier: "MemberUser" });
    case 3:
      return S.Array(__S(2498, __c78, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MemberGroups: S.optional(__S(2497, __c78, 1)),
          MemberUsers: S.optional(__S(2499, __c78, 3)),
          S3PathforGroupMembers: S.optional(__S(416, __c13, 0)),
        }),
      ).annotate({ identifier: "GroupMembers" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          DataSourceId: S.optional(S.String),
          GroupId: S.String,
          GroupMembers: __S(2500, __c78, 4),
          OrderingId: S.optional(S.Number),
          RoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutPrincipalMappingRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentAttributeKey: S.optional(S.String),
          Facets: S.optional(
            S.suspend(() => __S(2529, __c79, 1)).annotate({ identifier: "FacetList" }),
          ),
          MaxResults: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Facet" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Facet> => __S(2528, __c79, 0)).annotate({
          identifier: "Facet",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ DocumentAttributeKey: S.String, SortOrder: S.String }),
      ).annotate({ identifier: "SortingConfiguration" });
    case 3:
      return S.Array(__S(2530, __c79, 2));
    case 4:
      return S.suspend(() => S.Struct({ IncludeQuerySpellCheckSuggestions: S.Boolean })).annotate({
        identifier: "SpellCorrectionConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaxResultItemsToExpand: S.optional(S.Number),
          MaxExpandedResultsPerItem: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExpandConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DocumentAttributeKey: S.String,
          SortingConfigurations: S.optional(__S(2531, __c79, 3)),
          MissingAttributeKeyStrategy: S.optional(S.String),
          Expand: S.optional(S.Boolean),
          ExpandConfiguration: S.optional(__S(2533, __c79, 5)),
        }),
      ).annotate({ identifier: "CollapseConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          QueryText: S.optional(S.String),
          AttributeFilter: S.optional(__S(1985, __c62, 1)),
          Facets: S.optional(__S(2529, __c79, 1)),
          RequestedDocumentAttributes: S.optional(__S(160, __c5, 0)),
          QueryResultTypeFilter: S.optional(S.String),
          DocumentRelevanceOverrideConfigurations: S.optional(__S(2593, __c81, 1)),
          PageNumber: S.optional(S.Number),
          PageSize: S.optional(S.Number),
          SortingConfiguration: S.optional(__S(2530, __c79, 2)),
          SortingConfigurations: S.optional(__S(2531, __c79, 3)),
          UserContext: S.optional(__S(1988, __c62, 4)),
          VisitorId: S.optional(S.String),
          SpellCorrectionConfiguration: S.optional(__S(2532, __c79, 4)),
          CollapseConfiguration: S.optional(__S(2534, __c79, 6)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "QueryRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          BeginOffset: S.Number,
          EndOffset: S.Number,
          TopAnswer: S.optional(S.Boolean),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Highlight" });
    case 9:
      return S.Array(__S(2536, __c79, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Highlights: S.optional(__S(2537, __c79, 9)) }),
      ).annotate({ identifier: "TextWithHighlights" });
    case 11:
      return S.suspend(() =>
        S.Struct({ TextWithHighlightsValue: S.optional(__S(2538, __c79, 10)) }),
      ).annotate({ identifier: "AdditionalResultAttributeValue" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Key: S.String, ValueType: S.String, Value: __S(2539, __c79, 11) }),
      ).annotate({ identifier: "AdditionalResultAttribute" });
    case 13:
      return S.Array(__S(2540, __c79, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          TopAnswer: S.optional(S.Boolean),
          Highlighted: S.optional(S.Boolean),
          Header: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TableCell" });
    case 15:
      return S.Array(__S(2542, __c79, 14));
    case 16:
      return S.suspend(() => S.Struct({ Cells: S.optional(__S(2543, __c79, 15)) })).annotate({
        identifier: "TableRow",
      });
    case 17:
      return S.Array(__S(2544, __c79, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Rows: S.optional(__S(2545, __c79, 17)),
          TotalNumberOfRows: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TableExcerpt" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DocumentId: S.optional(S.String),
          DocumentTitle: S.optional(__S(2538, __c79, 10)),
          DocumentExcerpt: S.optional(__S(2538, __c79, 10)),
          DocumentURI: S.optional(S.String),
          DocumentAttributes: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "ExpandedResultItem" });
    case 20:
      return S.Array(__S(2547, __c79, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          DocumentAttribute: __S(320, __c10, 0),
          ExpandedResults: S.optional(__S(2548, __c79, 20)),
        }),
      ).annotate({ identifier: "CollapsedResultDetail" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Format: S.optional(S.String),
          AdditionalAttributes: S.optional(__S(2541, __c79, 13)),
          DocumentId: S.optional(S.String),
          DocumentTitle: S.optional(__S(2538, __c79, 10)),
          DocumentExcerpt: S.optional(__S(2538, __c79, 10)),
          DocumentURI: S.optional(S.String),
          DocumentAttributes: S.optional(__S(321, __c10, 1)),
          ScoreAttributes: S.optional(__S(2594, __c81, 2)),
          FeedbackToken: S.optional(S.String),
          TableExcerpt: S.optional(__S(2546, __c79, 18)),
          CollapsedResultDetail: S.optional(__S(2549, __c79, 21)),
        }),
      ).annotate({ identifier: "QueryResultItem" });
    case 23:
      return S.Array(__S(2550, __c79, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          DocumentAttributeValue: S.optional(__S(288, __c9, 0)),
          Count: S.optional(S.Number),
          FacetResults: S.optional(
            S.suspend(() => __S(2555, __c79, 27)).annotate({ identifier: "FacetResultList" }),
          ),
        }),
      ).annotate({ identifier: "DocumentAttributeValueCountPair" });
    case 25:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<DocumentAttributeValueCountPair> =>
          __S(2552, __c79, 24),
        ).annotate({ identifier: "DocumentAttributeValueCountPair" }),
      );
    case 26:
      return S.suspend(() =>
        S.Struct({
          DocumentAttributeKey: S.optional(S.String),
          DocumentAttributeValueType: S.optional(S.String),
          DocumentAttributeValueCountPairs: S.optional(
            S.suspend(() => __S(2553, __c79, 25)).annotate({
              identifier: "DocumentAttributeValueCountPairList",
            }),
          ),
        }),
      ).annotate({ identifier: "FacetResult" });
    case 27:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<FacetResult> => __S(2554, __c79, 26)).annotate({
          identifier: "FacetResult",
        }),
      );
    case 28:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), Code: S.optional(S.String) }),
      ).annotate({ identifier: "Warning" });
    case 29:
      return S.Array(__S(2556, __c79, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Term: S.optional(S.String),
          CorrectedTerm: S.optional(S.String),
        }),
      ).annotate({ identifier: "Correction" });
    case 31:
      return S.Array(__S(2558, __c79, 30));
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SuggestedQueryText: S.optional(S.String),
          Corrections: S.optional(__S(2559, __c79, 31)),
        }),
      ).annotate({ identifier: "SpellCorrectedQuery" });
    case 1:
      return S.Array(__S(2560, __c80, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          AdditionalAttributes: S.optional(__S(2541, __c79, 13)),
          DocumentId: S.optional(S.String),
          DocumentTitle: S.optional(__S(2538, __c79, 10)),
          DocumentExcerpt: S.optional(__S(2538, __c79, 10)),
          DocumentURI: S.optional(S.String),
          DocumentAttributes: S.optional(__S(321, __c10, 1)),
          FeedbackToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "FeaturedResultsItem" });
    case 3:
      return S.Array(__S(2562, __c80, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          ResultItems: S.optional(__S(2551, __c79, 23)),
          FacetResults: S.optional(__S(2555, __c79, 27)),
          TotalNumberOfResults: S.optional(S.Number),
          Warnings: S.optional(__S(2557, __c79, 29)),
          SpellCorrectedQueries: S.optional(__S(2561, __c80, 1)),
          FeaturedResultsItems: S.optional(__S(2563, __c80, 3)),
        }),
      ).annotate({ identifier: "QueryResult" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Relevance: __S(1665, __c52, 1) })).annotate(
        { identifier: "DocumentRelevanceConfiguration" },
      );
    case 1:
      return S.Array(__S(2592, __c81, 0));
    case 2:
      return S.suspend(() => S.Struct({ ScoreConfidence: S.optional(S.String) })).annotate({
        identifier: "ScoreAttributes",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          QueryText: S.String,
          AttributeFilter: S.optional(__S(1985, __c62, 1)),
          RequestedDocumentAttributes: S.optional(__S(160, __c5, 0)),
          DocumentRelevanceOverrideConfigurations: S.optional(__S(2593, __c81, 1)),
          PageNumber: S.optional(S.Number),
          PageSize: S.optional(S.Number),
          UserContext: S.optional(__S(1988, __c62, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RetrieveRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DocumentId: S.optional(S.String),
          DocumentTitle: S.optional(S.String),
          Content: S.optional(S.String),
          DocumentURI: S.optional(S.String),
          DocumentAttributes: S.optional(__S(321, __c10, 1)),
          ScoreAttributes: S.optional(__S(2594, __c81, 2)),
        }),
      ).annotate({ identifier: "RetrieveResultItem" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ QueryId: S.optional(S.String), ResultItems: S.optional(__S(2626, __c82, 2)) }),
      ).annotate({ identifier: "RetrieveResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDataSourceSyncJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ExecutionId: S.optional(S.String) })).annotate({
        identifier: "StartDataSourceSyncJobResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, IndexId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDataSourceSyncJobRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResultId: S.String,
          ClickTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ClickFeedback" });
    case 1:
      return S.Array(__S(2720, __c85, 0));
    case 2:
      return S.suspend(() => S.Struct({ ResultId: S.String, RelevanceValue: S.String })).annotate({
        identifier: "RelevanceFeedback",
      });
    case 3:
      return S.Array(__S(2722, __c85, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          QueryId: S.String,
          ClickFeedbackItems: S.optional(__S(2721, __c85, 1)),
          RelevanceFeedbackItems: S.optional(__S(2723, __c85, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SubmitFeedbackRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(673, __c21, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(160, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Id: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          AccessControlList: S.optional(__S(385, __c12, 1)),
          HierarchicalAccessControlList: S.optional(__S(387, __c12, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccessControlConfigurationRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          IndexId: S.String,
          Configuration: S.optional(__S(790, __c24, 22)),
          VpcConfiguration: S.optional(__S(739, __c23, 3)),
          Description: S.optional(S.String),
          Schedule: S.optional(S.String),
          RoleArn: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          CustomDocumentEnrichmentConfiguration: S.optional(__S(453, __c14, 5)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDataSourceRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          IndexId: S.String,
          RoleArn: S.optional(S.String),
          Configuration: S.optional(__S(834, __c26, 2)),
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateExperienceRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          FeaturedResultsSetId: S.String,
          FeaturedResultsSetName: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          QueryTexts: S.optional(__S(160, __c5, 0)),
          FeaturedDocuments: S.optional(__S(960, __c30, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFeaturedResultsSetRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Description: S.optional(S.String),
          DocumentMetadataConfigurationUpdates: S.optional(__S(1698, __c53, 2)),
          CapacityUnits: S.optional(__S(1699, __c53, 3)),
          UserTokenConfigurations: S.optional(__S(1091, __c34, 3)),
          UserContextPolicy: S.optional(S.String),
          UserGroupResolutionConfiguration: S.optional(__S(1092, __c34, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIndexRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Id: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          SourceS3Path: S.optional(__S(416, __c13, 0)),
          RoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateQuerySuggestionsBlockListRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexId: S.String,
          Mode: S.optional(S.String),
          QueryLogLookBackWindowInDays: S.optional(S.Number),
          IncludeQueriesWithoutUserInformation: S.optional(S.Boolean),
          MinimumNumberOfQueryingUsers: S.optional(S.Number),
          MinimumQueryCount: S.optional(S.Number),
          AttributeSuggestionsConfig: S.optional(__S(1826, __c57, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateQuerySuggestionsConfigRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          IndexId: S.String,
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SourceS3Path: S.optional(__S(416, __c13, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateThesaurusRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
