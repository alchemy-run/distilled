import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "kendra",
  target: "AWSKendraFrontendService",
  version: "2019-02-03",
  sigv4: "kendra",
  protocol: awsJson1_1Protocol,
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
                `https://kendra-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kendra-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kendra.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kendra.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class FeaturedResultsConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "FeaturedResultsConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message?: string;
    readonly ConflictingItems?: ConflictingItem[];
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
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
export type BatchDeleteFeaturedResultsSetErrors =
  BatchDeleteFeaturedResultsSetError_[];
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
export type BatchGetDocumentStatusResponseErrors =
  BatchGetDocumentStatusResponseError[];
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
export type BatchPutDocumentResponseFailedDocuments =
  BatchPutDocumentResponseFailedDocument[];
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
export type SharePointOnlineAuthenticationType =
  | "HTTP_BASIC"
  | "OAUTH2"
  | (string & {});
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
export type QueryIdentifiersEnclosingOption =
  | "DOUBLE_QUOTES"
  | "NONE"
  | (string & {});
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
export type SalesforceStandardObjectConfigurationList =
  SalesforceStandardObjectConfiguration[];
export type SalesforceKnowledgeArticleState =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | (string & {});
export type SalesforceKnowledgeArticleStateList =
  SalesforceKnowledgeArticleState[];
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
export type SalesforceChatterFeedIncludeFilterTypes =
  SalesforceChatterFeedIncludeFilterType[];
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
export type ServiceNowAuthenticationType =
  | "HTTP_BASIC"
  | "OAUTH2"
  | (string & {});
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
export type ConfluenceSpaceFieldMappingsList =
  ConfluenceSpaceToIndexFieldMapping[];
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
export type ConfluencePageFieldMappingsList =
  ConfluencePageToIndexFieldMapping[];
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
export type ConfluenceBlogFieldMappingsList =
  ConfluenceBlogToIndexFieldMapping[];
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
export type ConfluenceAttachmentFieldMappingsList =
  ConfluenceAttachmentToIndexFieldMapping[];
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
export type WebCrawlerMode =
  | "HOST_ONLY"
  | "SUBDOMAINS"
  | "EVERYTHING"
  | (string & {});
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
export type BasicAuthenticationConfigurationList =
  BasicAuthenticationConfiguration[];
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
export type IssueSubEntity =
  | "COMMENTS"
  | "ATTACHMENTS"
  | "WORKLOGS"
  | (string & {});
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
export type AlfrescoEntity =
  | "wiki"
  | "blog"
  | "documentLibrary"
  | (string & {});
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
export type UserContextPolicy =
  | "ATTRIBUTE_FILTER"
  | "USER_TOKEN"
  | (string & {});
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
export type ExperienceStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
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
export type FaqStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
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
export type AccessControlConfigurationSummaryList =
  AccessControlConfigurationSummary[];
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
export type QuerySuggestionsBlockListSummaryItems =
  QuerySuggestionsBlockListSummary[];
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
export type QueryResultType =
  | "DOCUMENT"
  | "QUESTION_ANSWER"
  | "ANSWER"
  | (string & {});
export interface DocumentRelevanceConfiguration {
  Name: string;
  Relevance: Relevance;
}
export type DocumentRelevanceOverrideConfigurationList =
  DocumentRelevanceConfiguration[];
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
export type MissingAttributeKeyStrategy =
  | "IGNORE"
  | "COLLAPSE"
  | "EXPAND"
  | (string & {});
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
export type AdditionalResultAttributeValueType =
  | "TEXT_WITH_HIGHLIGHTS_VALUE"
  | (string & {});
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
export type DocumentAttributeValueCountPairList =
  DocumentAttributeValueCountPair[];
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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0, EntityList: D.list(i_EntityConfiguration) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0, Personas: D.list({ EntityId: 0, Persona: 0 }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      DocumentIdList: 0,
      DataSourceSyncJobMetricTarget: {
        DataSourceId: 0,
        DataSourceSyncJobId: 0,
      },
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
  operationName: "BatchDeleteDocument",
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0, FeaturedResultsSetIds: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      DocumentInfoList: D.list({
        DocumentId: 0,
        Attributes: D.list(i_DocumentAttribute),
      }),
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
  operationName: "BatchGetDocumentStatus",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      RoleArn: 0,
      Documents: D.list({
        Id: 0,
        Title: 0,
        Blob: 0,
        S3Path: i_S3Path,
        Attributes: D.list(i_DocumentAttribute),
        AccessControlList: D.list(i_Principal),
        HierarchicalAccessControlList: D.list(i_HierarchicalPrincipal),
        ContentType: 0,
        AccessControlConfigurationId: 0,
      }),
      CustomDocumentEnrichmentConfiguration:
        i_CustomDocumentEnrichmentConfiguration,
    },
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
  operationName: "BatchPutDocument",
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Name: 0,
      Description: 0,
      AccessControlList: D.list(i_Principal),
      HierarchicalAccessControlList: D.list(i_HierarchicalPrincipal),
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateAccessControlConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      IndexId: 0,
      Type: 0,
      Configuration: i_DataSourceConfiguration,
      VpcConfiguration: i_DataSourceVpcConfiguration,
      Description: 0,
      Schedule: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
      LanguageCode: 0,
      CustomDocumentEnrichmentConfiguration:
        i_CustomDocumentEnrichmentConfiguration,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      IndexId: 0,
      RoleArn: 0,
      Configuration: i_ExperienceConfiguration,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateExperience",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Name: 0,
      Description: 0,
      S3Path: i_S3Path,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      FileFormat: 0,
      ClientToken: D.m({ idempotency: true }),
      LanguageCode: 0,
    },
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
  operationName: "CreateFaq",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      FeaturedResultsSetName: 0,
      Description: 0,
      ClientToken: 0,
      Status: 0,
      QueryTexts: 0,
      FeaturedDocuments: D.list(i_FeaturedDocument),
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceAlreadyExistException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Edition: 0,
      RoleArn: 0,
      ServerSideEncryptionConfiguration: { KmsKeyId: 0 },
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      UserTokenConfigurations: D.list(i_UserTokenConfiguration),
      UserContextPolicy: 0,
      UserGroupResolutionConfiguration: i_UserGroupResolutionConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceAlreadyExistException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Name: 0,
      Description: 0,
      SourceS3Path: i_S3Path,
      ClientToken: D.m({ idempotency: true }),
      RoleArn: 0,
      Tags: D.list(i_Tag),
    },
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
  operationName: "CreateQuerySuggestionsBlockList",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Name: 0,
      Description: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      SourceS3Path: i_S3Path,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateThesaurus",
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0, Id: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IndexId: 0, DataSourceId: 0, GroupId: 0, OrderingId: 0 },
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
  operationName: "DeletePrincipalMapping",
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0, Id: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0, Id: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0 },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      CustomDocumentEnrichmentConfiguration: {
        InlineConfigurations: D.list({
          Condition: o_DocumentAttributeCondition,
          Target: { TargetDocumentAttributeValue: o_DocumentAttributeValue },
        }),
        PreExtractionHookConfiguration: o_HookConfiguration,
        PostExtractionHookConfiguration: o_HookConfiguration,
      },
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
  operationName: "DescribeDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeExperience",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeFaq",
})) as any;

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
  descriptor: { service: svc, input: { IndexId: 0, FeaturedResultsSetId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0 },
    output: {
      ServerSideEncryptionConfiguration: { KmsKeyId: D.secret },
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
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
  operationName: "DescribeIndex",
})) as any;

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
  descriptor: {
    service: svc,
    input: { IndexId: 0, DataSourceId: 0, GroupId: 0 },
    output: {
      GroupOrderingIdSummaries: D.list({
        LastUpdatedAt: D.ts,
        ReceivedAt: D.ts,
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
  operationName: "DescribePrincipalMapping",
})) as any;

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
  descriptor: {
    service: svc,
    input: { IndexId: 0, Id: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeQuerySuggestionsBlockList",
})) as any;

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
  descriptor: {
    service: svc,
    input: { IndexId: 0 },
    output: { LastSuggestionsBuildTime: D.ts, LastClearTime: D.ts },
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
  operationName: "DescribeQuerySuggestionsConfig",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeThesaurus",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0, EntityList: D.list(i_EntityConfiguration) },
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
  operationName: "DisassociateEntitiesFromExperience",
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0, EntityIds: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      QueryText: 0,
      MaxSuggestionsCount: 0,
      SuggestionTypes: 0,
      AttributeSuggestionsConfig: {
        SuggestionAttributes: 0,
        AdditionalResponseAttributes: 0,
        AttributeFilter: i_AttributeFilter,
        UserContext: i_UserContext,
      },
    },
    output: {
      Suggestions: D.list({
        SourceDocuments: D.list({
          AdditionalAttributes: D.list(o_DocumentAttribute),
        }),
      }),
    },
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
  operationName: "GetQuerySuggestions",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Interval: 0,
      MetricType: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { SnapShotTimeFilter: { StartTime: D.ts, EndTime: D.ts } },
  },
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: { SummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      IndexId: 0,
      NextToken: 0,
      MaxResults: 0,
      StartTimeFilter: { StartTime: 0, EndTime: 0 },
      StatusFilter: 0,
    },
    output: { History: D.list({ StartTime: D.ts, EndTime: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: { SummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { Id: 0, IndexId: 0, NextToken: 0 },
    output: {
      SummaryItems: D.list({
        DisplayData: {
          UserName: D.secret,
          GroupName: D.secret,
          IdentifiedUserName: D.secret,
          FirstName: D.secret,
          LastName: D.secret,
        },
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: { SummaryItems: D.list({ CreatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: { FaqSummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
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
  operationName: "ListFeaturedResultsSets",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      DataSourceId: 0,
      OrderingId: 0,
      NextToken: 0,
      MaxResults: 0,
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
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      IndexConfigurationSummaryItems: D.list({
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      BlockListSummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IndexId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      ThesaurusSummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      DataSourceId: 0,
      GroupId: 0,
      GroupMembers: {
        MemberGroups: D.list({ GroupId: 0, DataSourceId: 0 }),
        MemberUsers: D.list({ UserId: 0 }),
        S3PathforGroupMembers: i_S3Path,
      },
      OrderingId: 0,
      RoleArn: 0,
    },
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
  operationName: "PutPrincipalMapping",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      QueryText: 0,
      AttributeFilter: i_AttributeFilter,
      Facets: D.list(i_Facet),
      RequestedDocumentAttributes: 0,
      QueryResultTypeFilter: 0,
      DocumentRelevanceOverrideConfigurations: D.list(
        i_DocumentRelevanceConfiguration,
      ),
      PageNumber: 0,
      PageSize: 0,
      SortingConfiguration: i_SortingConfiguration,
      SortingConfigurations: D.list(i_SortingConfiguration),
      UserContext: i_UserContext,
      VisitorId: 0,
      SpellCorrectionConfiguration: { IncludeQuerySpellCheckSuggestions: 0 },
      CollapseConfiguration: {
        DocumentAttributeKey: 0,
        SortingConfigurations: D.list(i_SortingConfiguration),
        MissingAttributeKeyStrategy: 0,
        Expand: 0,
        ExpandConfiguration: {
          MaxResultItemsToExpand: 0,
          MaxExpandedResultsPerItem: 0,
        },
      },
    },
    output: {
      ResultItems: D.list({
        DocumentAttributes: D.list(o_DocumentAttribute),
        CollapsedResultDetail: {
          DocumentAttribute: o_DocumentAttribute,
          ExpandedResults: D.list({
            DocumentAttributes: D.list(o_DocumentAttribute),
          }),
        },
      }),
      FacetResults: D.list(o_FacetResult),
      FeaturedResultsItems: D.list({
        DocumentAttributes: D.list(o_DocumentAttribute),
      }),
    },
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
  operationName: "Query",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      QueryText: 0,
      AttributeFilter: i_AttributeFilter,
      RequestedDocumentAttributes: 0,
      DocumentRelevanceOverrideConfigurations: D.list(
        i_DocumentRelevanceConfiguration,
      ),
      PageNumber: 0,
      PageSize: 0,
      UserContext: i_UserContext,
    },
    output: {
      ResultItems: D.list({ DocumentAttributes: D.list(o_DocumentAttribute) }),
    },
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
  operationName: "Retrieve",
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, IndexId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      QueryId: 0,
      ClickFeedbackItems: D.list({ ResultId: 0, ClickTime: 0 }),
      RelevanceFeedbackItems: D.list({ ResultId: 0, RelevanceValue: 0 }),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Id: 0,
      Name: 0,
      Description: 0,
      AccessControlList: D.list(i_Principal),
      HierarchicalAccessControlList: D.list(i_HierarchicalPrincipal),
    },
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
  operationName: "UpdateAccessControlConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Name: 0,
      IndexId: 0,
      Configuration: i_DataSourceConfiguration,
      VpcConfiguration: i_DataSourceVpcConfiguration,
      Description: 0,
      Schedule: 0,
      RoleArn: 0,
      LanguageCode: 0,
      CustomDocumentEnrichmentConfiguration:
        i_CustomDocumentEnrichmentConfiguration,
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
  operationName: "UpdateDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Name: 0,
      IndexId: 0,
      RoleArn: 0,
      Configuration: i_ExperienceConfiguration,
      Description: 0,
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
  operationName: "UpdateExperience",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      FeaturedResultsSetId: 0,
      FeaturedResultsSetName: 0,
      Description: 0,
      Status: 0,
      QueryTexts: 0,
      FeaturedDocuments: D.list(i_FeaturedDocument),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Name: 0,
      RoleArn: 0,
      Description: 0,
      DocumentMetadataConfigurationUpdates: D.list({
        Name: 0,
        Type: 0,
        Relevance: i_Relevance,
        Search: { Facetable: 0, Searchable: 0, Displayable: 0, Sortable: 0 },
      }),
      CapacityUnits: { StorageCapacityUnits: 0, QueryCapacityUnits: 0 },
      UserTokenConfigurations: D.list(i_UserTokenConfiguration),
      UserContextPolicy: 0,
      UserGroupResolutionConfiguration: i_UserGroupResolutionConfiguration,
    },
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
  operationName: "UpdateIndex",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Id: 0,
      Name: 0,
      Description: 0,
      SourceS3Path: i_S3Path,
      RoleArn: 0,
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
  operationName: "UpdateQuerySuggestionsBlockList",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IndexId: 0,
      Mode: 0,
      QueryLogLookBackWindowInDays: 0,
      IncludeQueriesWithoutUserInformation: 0,
      MinimumNumberOfQueryingUsers: 0,
      MinimumQueryCount: 0,
      AttributeSuggestionsConfig: {
        SuggestableConfigList: D.list({ AttributeName: 0, Suggestable: 0 }),
        AttributeSuggestionsMode: 0,
      },
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
  operationName: "UpdateQuerySuggestionsConfig",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Name: 0,
      IndexId: 0,
      Description: 0,
      RoleArn: 0,
      SourceS3Path: i_S3Path,
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
  operationName: "UpdateThesaurus",
})) as any;

const i_AttributeFilter: D.LazyStruct = () => ({
  AndAllFilters: D.list(i_AttributeFilter),
  OrAllFilters: D.list(i_AttributeFilter),
  NotFilter: i_AttributeFilter,
  EqualsTo: i_DocumentAttribute,
  ContainsAll: i_DocumentAttribute,
  ContainsAny: i_DocumentAttribute,
  GreaterThan: i_DocumentAttribute,
  GreaterThanOrEquals: i_DocumentAttribute,
  LessThan: i_DocumentAttribute,
  LessThanOrEquals: i_DocumentAttribute,
});
const i_CustomDocumentEnrichmentConfiguration: D.LazyStruct = () => ({
  InlineConfigurations: D.list({
    Condition: i_DocumentAttributeCondition,
    Target: {
      TargetDocumentAttributeKey: 0,
      TargetDocumentAttributeValueDeletion: 0,
      TargetDocumentAttributeValue: i_DocumentAttributeValue,
    },
    DocumentContentDeletion: 0,
  }),
  PreExtractionHookConfiguration: i_HookConfiguration,
  PostExtractionHookConfiguration: i_HookConfiguration,
  RoleArn: 0,
});
const i_DataSourceConfiguration: D.LazyStruct = () => ({
  S3Configuration: {
    BucketName: 0,
    InclusionPrefixes: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    DocumentsMetadataConfiguration: { S3Prefix: 0 },
    AccessControlListConfiguration: { KeyPath: 0 },
  },
  SharePointConfiguration: {
    SharePointVersion: 0,
    Urls: 0,
    SecretArn: 0,
    CrawlAttachments: 0,
    UseChangeLog: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    DocumentTitleFieldName: 0,
    DisableLocalGroups: 0,
    SslCertificateS3Path: i_S3Path,
    AuthenticationType: 0,
    ProxyConfiguration: i_ProxyConfiguration,
  },
  DatabaseConfiguration: {
    DatabaseEngineType: 0,
    ConnectionConfiguration: {
      DatabaseHost: 0,
      DatabasePort: 0,
      DatabaseName: 0,
      TableName: 0,
      SecretArn: 0,
    },
    VpcConfiguration: i_DataSourceVpcConfiguration,
    ColumnConfiguration: {
      DocumentIdColumnName: 0,
      DocumentDataColumnName: 0,
      DocumentTitleColumnName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
      ChangeDetectingColumns: 0,
    },
    AclConfiguration: { AllowedGroupsColumnName: 0 },
    SqlConfiguration: { QueryIdentifiersEnclosingOption: 0 },
  },
  SalesforceConfiguration: {
    ServerUrl: 0,
    SecretArn: 0,
    StandardObjectConfigurations: D.list({
      Name: 0,
      DocumentDataFieldName: 0,
      DocumentTitleFieldName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    }),
    KnowledgeArticleConfiguration: {
      IncludedStates: 0,
      StandardKnowledgeArticleTypeConfiguration: {
        DocumentDataFieldName: 0,
        DocumentTitleFieldName: 0,
        FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
      },
      CustomKnowledgeArticleTypeConfigurations: D.list({
        Name: 0,
        DocumentDataFieldName: 0,
        DocumentTitleFieldName: 0,
        FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
      }),
    },
    ChatterFeedConfiguration: {
      DocumentDataFieldName: 0,
      DocumentTitleFieldName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
      IncludeFilterTypes: 0,
    },
    CrawlAttachments: 0,
    StandardObjectAttachmentConfiguration: {
      DocumentTitleFieldName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    },
    IncludeAttachmentFilePatterns: 0,
    ExcludeAttachmentFilePatterns: 0,
  },
  OneDriveConfiguration: {
    TenantDomain: 0,
    SecretArn: 0,
    OneDriveUsers: { OneDriveUserList: 0, OneDriveUserS3Path: i_S3Path },
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    DisableLocalGroups: 0,
  },
  ServiceNowConfiguration: {
    HostUrl: 0,
    SecretArn: 0,
    ServiceNowBuildVersion: 0,
    KnowledgeArticleConfiguration: {
      CrawlAttachments: 0,
      IncludeAttachmentFilePatterns: 0,
      ExcludeAttachmentFilePatterns: 0,
      DocumentDataFieldName: 0,
      DocumentTitleFieldName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
      FilterQuery: 0,
    },
    ServiceCatalogConfiguration: {
      CrawlAttachments: 0,
      IncludeAttachmentFilePatterns: 0,
      ExcludeAttachmentFilePatterns: 0,
      DocumentDataFieldName: 0,
      DocumentTitleFieldName: 0,
      FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    },
    AuthenticationType: 0,
  },
  ConfluenceConfiguration: {
    ServerUrl: 0,
    SecretArn: 0,
    Version: 0,
    SpaceConfiguration: {
      CrawlPersonalSpaces: 0,
      CrawlArchivedSpaces: 0,
      IncludeSpaces: 0,
      ExcludeSpaces: 0,
      SpaceFieldMappings: D.list({
        DataSourceFieldName: 0,
        DateFieldFormat: 0,
        IndexFieldName: 0,
      }),
    },
    PageConfiguration: {
      PageFieldMappings: D.list({
        DataSourceFieldName: 0,
        DateFieldFormat: 0,
        IndexFieldName: 0,
      }),
    },
    BlogConfiguration: {
      BlogFieldMappings: D.list({
        DataSourceFieldName: 0,
        DateFieldFormat: 0,
        IndexFieldName: 0,
      }),
    },
    AttachmentConfiguration: {
      CrawlAttachments: 0,
      AttachmentFieldMappings: D.list({
        DataSourceFieldName: 0,
        DateFieldFormat: 0,
        IndexFieldName: 0,
      }),
    },
    VpcConfiguration: i_DataSourceVpcConfiguration,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    ProxyConfiguration: i_ProxyConfiguration,
    AuthenticationType: 0,
  },
  GoogleDriveConfiguration: {
    SecretArn: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    ExcludeMimeTypes: 0,
    ExcludeUserAccounts: 0,
    ExcludeSharedDrives: 0,
  },
  WebCrawlerConfiguration: {
    Urls: {
      SeedUrlConfiguration: { SeedUrls: 0, WebCrawlerMode: 0 },
      SiteMapsConfiguration: { SiteMaps: 0 },
    },
    CrawlDepth: 0,
    MaxLinksPerPage: 0,
    MaxContentSizePerPageInMegaBytes: 0,
    MaxUrlsPerMinuteCrawlRate: 0,
    UrlInclusionPatterns: 0,
    UrlExclusionPatterns: 0,
    ProxyConfiguration: i_ProxyConfiguration,
    AuthenticationConfiguration: {
      BasicAuthentication: D.list({ Host: 0, Port: 0, Credentials: 0 }),
    },
  },
  WorkDocsConfiguration: {
    OrganizationId: 0,
    CrawlComments: 0,
    UseChangeLog: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
  },
  FsxConfiguration: {
    FileSystemId: 0,
    FileSystemType: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
    SecretArn: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
  },
  SlackConfiguration: {
    TeamId: 0,
    SecretArn: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
    SlackEntityList: 0,
    UseChangeLog: 0,
    CrawlBotMessage: 0,
    ExcludeArchived: 0,
    SinceCrawlDate: 0,
    LookBackPeriod: 0,
    PrivateChannelFilter: 0,
    PublicChannelFilter: 0,
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    FieldMappings: D.list(i_DataSourceToIndexFieldMapping),
  },
  BoxConfiguration: {
    EnterpriseId: 0,
    SecretArn: 0,
    UseChangeLog: 0,
    CrawlComments: 0,
    CrawlTasks: 0,
    CrawlWebLinks: 0,
    FileFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    TaskFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    CommentFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    WebLinkFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
  },
  QuipConfiguration: {
    Domain: 0,
    SecretArn: 0,
    CrawlFileComments: 0,
    CrawlChatRooms: 0,
    CrawlAttachments: 0,
    FolderIds: 0,
    ThreadFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    MessageFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    AttachmentFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
  },
  JiraConfiguration: {
    JiraAccountUrl: 0,
    SecretArn: 0,
    UseChangeLog: 0,
    Project: 0,
    IssueType: 0,
    Status: 0,
    IssueSubEntityFilter: 0,
    AttachmentFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    CommentFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    IssueFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    ProjectFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    WorkLogFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
  },
  GitHubConfiguration: {
    SaaSConfiguration: { OrganizationName: 0, HostUrl: 0 },
    OnPremiseConfiguration: {
      HostUrl: 0,
      OrganizationName: 0,
      SslCertificateS3Path: i_S3Path,
    },
    Type: 0,
    SecretArn: 0,
    UseChangeLog: 0,
    GitHubDocumentCrawlProperties: {
      CrawlRepositoryDocuments: 0,
      CrawlIssue: 0,
      CrawlIssueComment: 0,
      CrawlIssueCommentAttachment: 0,
      CrawlPullRequest: 0,
      CrawlPullRequestComment: 0,
      CrawlPullRequestCommentAttachment: 0,
    },
    RepositoryFilter: 0,
    InclusionFolderNamePatterns: 0,
    InclusionFileTypePatterns: 0,
    InclusionFileNamePatterns: 0,
    ExclusionFolderNamePatterns: 0,
    ExclusionFileTypePatterns: 0,
    ExclusionFileNamePatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
    GitHubRepositoryConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubCommitConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubIssueDocumentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubIssueCommentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubIssueAttachmentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubPullRequestCommentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubPullRequestDocumentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
    GitHubPullRequestDocumentAttachmentConfigurationFieldMappings: D.list(
      i_DataSourceToIndexFieldMapping,
    ),
  },
  AlfrescoConfiguration: {
    SiteUrl: 0,
    SiteId: 0,
    SecretArn: 0,
    SslCertificateS3Path: i_S3Path,
    CrawlSystemFolders: 0,
    CrawlComments: 0,
    EntityFilter: 0,
    DocumentLibraryFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    BlogFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    WikiFieldMappings: D.list(i_DataSourceToIndexFieldMapping),
    InclusionPatterns: 0,
    ExclusionPatterns: 0,
    VpcConfiguration: i_DataSourceVpcConfiguration,
  },
  TemplateConfiguration: { Template: 0 },
});
const i_DataSourceVpcConfiguration: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
});
const i_DocumentAttribute: D.LazyStruct = () => ({
  Key: 0,
  Value: i_DocumentAttributeValue,
});
const i_DocumentRelevanceConfiguration: D.LazyStruct = () => ({
  Name: 0,
  Relevance: i_Relevance,
});
const i_EntityConfiguration: D.LazyStruct = () => ({
  EntityId: 0,
  EntityType: 0,
});
const i_ExperienceConfiguration: D.LazyStruct = () => ({
  ContentSourceConfiguration: {
    DataSourceIds: 0,
    FaqIds: 0,
    DirectPutContent: 0,
  },
  UserIdentityConfiguration: { IdentityAttributeName: 0 },
});
const i_Facet: D.LazyStruct = () => ({
  DocumentAttributeKey: 0,
  Facets: D.list(i_Facet),
  MaxResults: 0,
});
const i_FeaturedDocument: D.LazyStruct = () => ({ Id: 0 });
const i_HierarchicalPrincipal: D.LazyStruct = () => ({
  PrincipalList: D.list(i_Principal),
});
const i_Principal: D.LazyStruct = () => ({
  Name: 0,
  Type: 0,
  Access: 0,
  DataSourceId: 0,
});
const i_Relevance: D.LazyStruct = () => ({
  Freshness: 0,
  Importance: 0,
  Duration: 0,
  RankOrder: 0,
  ValueImportanceMap: 0,
});
const i_S3Path: D.LazyStruct = () => ({ Bucket: 0, Key: 0 });
const i_SortingConfiguration: D.LazyStruct = () => ({
  DocumentAttributeKey: 0,
  SortOrder: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_UserContext: D.LazyStruct = () => ({
  Token: 0,
  UserId: 0,
  Groups: 0,
  DataSourceGroups: D.list({ GroupId: 0, DataSourceId: 0 }),
});
const i_UserGroupResolutionConfiguration: D.LazyStruct = () => ({
  UserGroupResolutionMode: 0,
});
const i_UserTokenConfiguration: D.LazyStruct = () => ({
  JwtTokenTypeConfiguration: {
    KeyLocation: 0,
    URL: 0,
    SecretManagerArn: 0,
    UserNameAttributeField: 0,
    GroupAttributeField: 0,
    Issuer: 0,
    ClaimRegex: 0,
  },
  JsonTokenTypeConfiguration: {
    UserNameAttributeField: 0,
    GroupAttributeField: 0,
  },
});
const o_DocumentAttribute: D.LazyStruct = () => ({
  Value: o_DocumentAttributeValue,
});
const o_DocumentAttributeCondition: D.LazyStruct = () => ({
  ConditionOnValue: o_DocumentAttributeValue,
});
const o_DocumentAttributeValue: D.LazyStruct = () => ({ DateValue: D.ts });
const o_FacetResult: D.LazyStruct = () => ({
  DocumentAttributeValueCountPairs: D.list({
    DocumentAttributeValue: o_DocumentAttributeValue,
    FacetResults: D.list(o_FacetResult),
  }),
});
const o_HookConfiguration: D.LazyStruct = () => ({
  InvocationCondition: o_DocumentAttributeCondition,
});
const i_DataSourceToIndexFieldMapping: D.LazyStruct = () => ({
  DataSourceFieldName: 0,
  DateFieldFormat: 0,
  IndexFieldName: 0,
});
const i_DocumentAttributeCondition: D.LazyStruct = () => ({
  ConditionDocumentAttributeKey: 0,
  Operator: 0,
  ConditionOnValue: i_DocumentAttributeValue,
});
const i_DocumentAttributeValue: D.LazyStruct = () => ({
  StringValue: 0,
  StringListValue: 0,
  LongValue: 0,
  DateValue: 0,
});
const i_HookConfiguration: D.LazyStruct = () => ({
  InvocationCondition: i_DocumentAttributeCondition,
  LambdaArn: 0,
  S3Bucket: 0,
});
const i_ProxyConfiguration: D.LazyStruct = () => ({
  Host: 0,
  Port: 0,
  Credentials: 0,
});
