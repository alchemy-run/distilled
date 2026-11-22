import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { awsServiceErrorsWith } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PartnerCentral Marketing",
  serviceShapeName: "AWSPartnerDemandGenerator",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral-marketing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-05-31");
const proto = /*@__PURE__*/ T.SmithyProtocolsRpcv2Cbor();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://partnercentral-marketing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://partnercentral-marketing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://partnercentral-marketing.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "PartnerCentralMarketing",
  service: "PartnerCentralMarketing",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      Reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    Reason: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ValidationExceptionReason" }),
    ),
    FieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(209, __c26, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type Catalog = "AWS" | "Sandbox" | (string & {});
export type CampaignIdentifier = string;
export type Identifier = string;
export interface BatchCreateCampaignAssetEntry {
  SourceAssetTemplateIdentifier: string;
}
export type BatchCreateCampaignAssetEntries = BatchCreateCampaignAssetEntry[];
export interface BatchCreateCampaignAssetRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  Entries: BatchCreateCampaignAssetEntry[];
}
export interface BatchCreateCampaignAssetError_ {
  SourceAssetTemplateId: string;
  Code: string;
  Message: string;
}
export type BatchCreateCampaignAssetErrors = BatchCreateCampaignAssetError_[];
export type CampaignAssetId = string;
export type LayoutOptionValue = string;
export type AssetName = string;
export type TemplateFieldId = string;
export type TemplateFieldIdList = string[];
export type LayoutFormat = "HTML" | "PDF" | "IMAGE" | (string & {});
export type LayoutUrl = string;
export type LayoutPageType = "FORM" | "CONFIRMATION" | (string & {});
export interface LayoutPreview {
  Format: LayoutFormat;
  Url: string;
  PageType?: LayoutPageType | undefined;
}
export type LayoutPreviewList = LayoutPreview[];
export interface CampaignAssetLayoutOption {
  Value: string;
  Label?: string | undefined;
  FieldIds: string[];
  LayoutPreviews?: LayoutPreview[] | undefined;
}
export type CampaignAssetLayoutOptionList = CampaignAssetLayoutOption[];
export interface CampaignAssetLayout {
  Selected?: string | undefined;
  Options: CampaignAssetLayoutOption[];
}
export interface BatchCreateCampaignAssetResult {
  SourceAssetTemplateId: string;
  Id: string;
  Layout?: CampaignAssetLayout | undefined;
}
export type BatchCreateCampaignAssetResults = BatchCreateCampaignAssetResult[];
export interface BatchCreateCampaignAssetResponse {
  Errors: BatchCreateCampaignAssetError_[];
  Successful?: BatchCreateCampaignAssetResult[] | undefined;
}
export type CampaignName = string;
export type CampaignTemplateId = string;
export type SenderEmail = string | redacted.Redacted<string>;
export type PrivacyPolicyUrl = string;
export type PartnerAddress = string | redacted.Redacted<string>;
export type S3Uri = string;
export type S3VersionId = string;
export interface FileRef {
  S3Uri: string;
  VersionId: string;
}
export type EngagementGroupId = string;
export type EngagementGroupIdList = string[];
export type Industry =
  | "FINANCIAL_SERVICES"
  | "HEALTHCARE"
  | "MANUFACTURING"
  | "RETAIL"
  | "MEDIA_ENTERTAINMENT"
  | "ENERGY"
  | "EDUCATION"
  | "GOVERNMENT"
  | "TELECOMMUNICATIONS"
  | "AUTOMOTIVE"
  | "INSURANCE"
  | "OTHER"
  | (string & {});
export type IndustryList = Industry[];
export type CompanySize =
  | "STARTUP"
  | "SMALL_BUSINESS"
  | "MID_MARKET"
  | "ENTERPRISE"
  | "GLOBAL_ENTERPRISE"
  | (string & {});
export type CompanySizeList = CompanySize[];
export type CountryCode = string;
export type CountryCodeList = string[];
export interface TargetAudience {
  Industries?: Industry[] | undefined;
  CompanySizes?: CompanySize[] | undefined;
  Countries?: string[] | undefined;
}
export type Amount = string;
export type CurrencyCode = string;
export interface MonetaryValue {
  Amount: string;
  CurrencyCode: string;
}
export type UtcDate = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateCampaignRequest {
  Catalog: Catalog;
  Name: string;
  CampaignTemplateId: string;
  SenderEmail?: string | redacted.Redacted<string> | undefined;
  PrivacyPolicyUrl?: string | undefined;
  PartnerAddress?: string | redacted.Redacted<string> | undefined;
  PartnerBadge?: FileRef | undefined;
  EmailTarget?: FileRef | undefined;
  EmailTargetEngagementGroupIds?: string[] | undefined;
  TargetAudience?: TargetAudience | undefined;
  EstimatedBudget?: MonetaryValue | undefined;
  TotalBudget?: MonetaryValue | undefined;
  StartOn?: string | undefined;
  EndOn?: string | undefined;
  ClientToken?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type CampaignId = string;
export type TaggableResourceArn = string;
export interface CreateCampaignResponse {
  Id: string;
  Arn: string;
}
export type Platform = "FACEBOOK" | "LINKEDIN" | "X" | (string & {});
export interface CreateSocialConnectionAuthorizationUrlRequest {
  Catalog: Catalog;
  Platform: Platform;
}
export type AuthorizationUrl = string | redacted.Redacted<string>;
export interface CreateSocialConnectionAuthorizationUrlResponse {
  Platform: Platform;
  AuthorizationUrl: string | redacted.Redacted<string>;
}
export interface DeactivateCampaignAssetRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetIdentifier: string;
}
export type CampaignAssetState = "INACTIVE" | "ACTIVE" | (string & {});
export type AttemptStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
export type CampaignAssetStateReason =
  | "ASSET_NOT_FOUND"
  | "ASSET_NOT_STARTABLE"
  | "ASSET_START_IN_PROGRESS"
  | "ASSET_ALREADY_ACTIVE"
  | "SEND_WINDOW_TOO_SOON"
  | "REQUIRED_FIELD_MISSING"
  | "RECIPIENT_LIST_MISSING"
  | "ENGAGEMENT_GROUPS_UNAVAILABLE"
  | "SENDER_EMAIL_MISSING"
  | "END_ON_MISSING"
  | "ASSET_CONTENT_MISSING"
  | "ASSET_NOT_ACTIVATABLE"
  | "TEMPLATE_CHANGED"
  | "PARTNER_IMAGE_REJECTED"
  | "PREREQUISITE_ASSET_NOT_ACTIVE"
  | "PARTNER_NOT_PROVISIONED"
  | "RECIPIENT_LIST_EMPTY"
  | "RECIPIENT_LIMIT_EXCEEDED"
  | "CONTACT_OPT_IN_REQUIRED"
  | "MAILING_CREDITS_EXHAUSTED"
  | "SENDER_EMAIL_INVALID"
  | "SOCIAL_CONNECTION_MISSING"
  | "SOCIAL_CONNECTION_EXPIRED"
  | "SOCIAL_CONNECTION_PAGE_REQUIRED"
  | "DELIVERY_FAILED"
  | "INTERNAL_ERROR"
  | "MAILING_CREDITS_INSUFFICIENT"
  | "PARTNER_PROFILE_FIELD_MISSING"
  | "PARTNER_PROFILE_FIELD_DOES_NOT_FIT"
  | "SOCIAL_CONNECTION_NOT_CHOSEN"
  | "PRIVACY_POLICY_URL_MISSING"
  | "PARTNER_ADDRESS_MISSING"
  | "SEND_MODE_MISSING"
  | "CONTENT_REJECTED"
  | "URL_NOT_ALLOWED"
  | "SENDER_NOT_APPROVED"
  | (string & {});
export interface DeactivateCampaignAssetResponse {
  Id: string;
  State: CampaignAssetState;
  LastActivationStatus?: AttemptStatus | undefined;
  StateReason?: CampaignAssetStateReason | undefined;
}
export interface DeleteCampaignRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
}
export interface DeleteCampaignResponse {}
export interface DeleteCampaignAssetRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetIdentifier: string;
}
export interface DeleteCampaignAssetResponse {}
export type SocialConnectionIdentifier = string;
export interface DeleteSocialConnectionRequest {
  Catalog: Catalog;
  Identifier: string;
  ClientToken?: string | undefined;
}
export interface DeleteSocialConnectionResponse {}
export interface GetCampaignRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
}
export type CampaignState = "DRAFT" | "ACTIVE" | "COMPLETED" | (string & {});
export type AssetLanguage =
  | "en"
  | "es"
  | "es-419"
  | "fr"
  | "de"
  | "it"
  | "pt-BR"
  | "id"
  | "tr"
  | "ja"
  | "ko"
  | "zh-Hans"
  | "zh-Hant"
  | "ar"
  | (string & {});
export type PartnerLogoUrl = string;
export interface PartnerProfileBranding {
  DisplayName?: string | undefined;
  WebsiteUrl?: string | undefined;
  LogoUrl?: string | undefined;
  RefreshedAt: Date;
}
export interface PartnerBadgeDetail {
  Url: string;
  AttachedAt: Date;
}
export type ScanStatus = "PENDING" | "CLEAN" | "REJECTED" | (string & {});
export interface EmailTargetDetail {
  ScanStatus?: ScanStatus | undefined;
  AttachedAt?: Date | undefined;
  ValidCount?: number | undefined;
  RejectedCount?: number | undefined;
  DuplicateCount?: number | undefined;
  FileName?: string | undefined;
}
export type SocialConnectionId = string;
export type CampaignSocialConnectionIds = string[];
export type CampaignSocialConnections = { [key in Platform]?: string[] | undefined };
export type CampaignSetting =
  | "SENDER_EMAIL"
  | "END_ON"
  | "EMAIL_TARGET"
  | "PRIVACY_POLICY_URL"
  | "PARTNER_ADDRESS"
  | "PARTNER_BADGE"
  | (string & {});
export type PartnerProfileField =
  | "DISPLAY_NAME"
  | "WEBSITE_URL"
  | "LOGO"
  | "WEBSITE_DOMAIN"
  | "COPYRIGHT_LINE"
  | "PARTNER_DETAILS"
  | "COPYRIGHT_AND_DETAILS"
  | "COPYRIGHT_YEAR_LINE"
  | (string & {});
export type CampaignAssetIdList = string[];
export interface ActivationIssue {
  Code: CampaignAssetStateReason;
  FieldId?: string | undefined;
  CampaignSetting?: CampaignSetting | undefined;
  PartnerProfileField?: PartnerProfileField | undefined;
  AffectedAssetIds?: string[] | undefined;
  Message: string;
}
export type ActivationIssueList = ActivationIssue[];
export interface Campaign {
  CampaignId: string;
  Arn: string;
  Name: string;
  State: CampaignState;
  CampaignTemplateId?: string | undefined;
  Language?: AssetLanguage | undefined;
  PartnerProfile?: PartnerProfileBranding | undefined;
  SenderEmail?: string | redacted.Redacted<string> | undefined;
  PrivacyPolicyUrl?: string | undefined;
  PartnerAddress?: string | redacted.Redacted<string> | undefined;
  PartnerBadge?: PartnerBadgeDetail | undefined;
  EmailTarget?: EmailTargetDetail | undefined;
  EmailTargetEngagementGroupIds?: string[] | undefined;
  SocialConnections?: { [key: string]: string[] | undefined } | undefined;
  EstimatedBudget?: MonetaryValue | undefined;
  TotalBudget?: MonetaryValue | undefined;
  TargetAudience?: TargetAudience | undefined;
  StartOn?: string | undefined;
  EndOn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  ActivationIssues: ActivationIssue[];
}
export interface GetCampaignResponse {
  Campaign: Campaign;
}
export interface GetCampaignAssetRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetIdentifier: string;
}
export type CampaignAssetCategory =
  | "EMAIL"
  | "LANDING_PAGE"
  | "SOCIAL_POST"
  | "BANNER_AD"
  | "DOCUMENT"
  | (string & {});
export type LinkLabel = string;
export type DeliveryStatus = "PENDING" | "DELIVERED" | "FAILED" | (string & {});
export type Id = string;
export type FileFormat = "PDF" | "DOCX" | "PPTX" | "HTML" | "IMAGE" | (string & {});
export type SendMode = "ON_ACTIVATION" | "SCHEDULED" | (string & {});
export type TemplateFieldLabel = string;
export type TemplateFieldDescription = string;
export type TemplateFieldSection = "HEADER" | "BODY" | "FOOTER" | (string & {});
export type TemplateFieldPattern = string;
export type AssetBodyContent = string | redacted.Redacted<string>;
export interface TextFieldType {
  MinLength?: number | undefined;
  MaxLength?: number | undefined;
  Pattern?: string | undefined;
  Placeholder?: string | redacted.Redacted<string> | undefined;
}
export type HtmlTagName = string;
export type AllowedTagList = string[];
export interface RichTextFieldType {
  MaxLength?: number | undefined;
  AllowedTags: string[];
  Placeholder?: string | redacted.Redacted<string> | undefined;
}
export type ImageFormat = "PNG" | "JPEG" | (string & {});
export type ImageFormatList = ImageFormat[];
export interface ImageFieldType {
  MaxSizeBytes?: number | undefined;
  AllowedFormats?: ImageFormat[] | undefined;
  DefaultValue?: LayoutPreview | undefined;
  RecommendedWidthPixels?: number | undefined;
  RecommendedHeightPixels?: number | undefined;
}
export interface AssetLinkFieldType {
  Category: CampaignAssetCategory;
  LabelFieldId?: string | undefined;
}
export type FieldType =
  | { Text: TextFieldType; RichText?: undefined; Image?: undefined; AssetLink?: undefined }
  | { Text?: undefined; RichText: RichTextFieldType; Image?: undefined; AssetLink?: undefined }
  | { Text?: undefined; RichText?: undefined; Image: ImageFieldType; AssetLink?: undefined }
  | { Text?: undefined; RichText?: undefined; Image?: undefined; AssetLink: AssetLinkFieldType };
export interface CampaignAssetTemplateField {
  FieldId: string;
  Label?: string | undefined;
  Description?: string | undefined;
  Section?: TemplateFieldSection | undefined;
  Page?: number | undefined;
  Required?: boolean | undefined;
  Type: FieldType;
  CampaignSetting?: CampaignSetting | undefined;
  PartnerProfileField?: PartnerProfileField | undefined;
}
export type FileReference = string;
export interface CampaignAssetImageSource {
  CampaignIdentifier: string;
  CampaignAssetIdentifier: string;
  FieldId: string;
}
export type TemplateFieldValue =
  | {
      Text: string | redacted.Redacted<string>;
      ImageReference?: undefined;
      LinkedAssetId?: undefined;
      CampaignAssetImage?: undefined;
    }
  | {
      Text?: undefined;
      ImageReference: string;
      LinkedAssetId?: undefined;
      CampaignAssetImage?: undefined;
    }
  | {
      Text?: undefined;
      ImageReference?: undefined;
      LinkedAssetId: string;
      CampaignAssetImage?: undefined;
    }
  | {
      Text?: undefined;
      ImageReference?: undefined;
      LinkedAssetId?: undefined;
      CampaignAssetImage: CampaignAssetImageSource;
    };
export interface CampaignAssetFieldValue {
  Field: CampaignAssetTemplateField;
  Value?: TemplateFieldValue | undefined;
}
export type CampaignAssetFieldValueList = CampaignAssetFieldValue[];
export type PublicUrl = string;
export interface CampaignAsset {
  Id: string;
  CampaignId: string;
  Category: CampaignAssetCategory;
  Name: string;
  LinkLabel?: string | undefined;
  State: CampaignAssetState;
  LastActivationStatus?: AttemptStatus | undefined;
  DeliveryStatus?: DeliveryStatus | undefined;
  DeliveryStatusReason?: CampaignAssetStateReason | undefined;
  SourceAssetTemplateId?: string | undefined;
  SocialPlatform?: Platform | undefined;
  FileFormat?: FileFormat | undefined;
  SendMode?: SendMode | undefined;
  ScheduledSendAt?: Date | undefined;
  FieldValues?: CampaignAssetFieldValue[] | undefined;
  LayoutPreviews?: LayoutPreview[] | undefined;
  Layout?: CampaignAssetLayout | undefined;
  ActivationIssues: ActivationIssue[];
  PublicUrl?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export interface GetCampaignAssetResponse {
  Asset: CampaignAsset;
}
export interface GetCampaignAssetActivationTaskRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
}
export type CampaignAssetActivationTaskId = string;
export type CampaignAssetActivationTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "PARTIAL_FAILURE"
  | "FAILED"
  | (string & {});
export type CampaignAssetActivationStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
export type ErrorMessage = string;
export interface CampaignAssetActivationOutcome {
  CampaignAssetId: string;
  Status: CampaignAssetActivationStatus;
  Reason?: CampaignAssetStateReason | undefined;
  Message?: string | undefined;
}
export type CampaignAssetActivationOutcomes = CampaignAssetActivationOutcome[];
export interface GetCampaignAssetActivationTaskResponse {
  CampaignId: string;
  TaskId: string;
  TaskStatus: CampaignAssetActivationTaskStatus;
  StartedAt: Date;
  EndedAt?: Date | undefined;
  Assets: CampaignAssetActivationOutcome[];
}
export type CampaignAssetExportTaskId = string;
export interface GetCampaignAssetExportTaskRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetExportTaskIdentifier: string;
}
export type CampaignAssetExportTaskStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type PresignedUrl = string;
export type CampaignAssetExportFailureCode =
  | "EXPORT_TIMEOUT"
  | "EXPORT_TOO_LARGE"
  | "PACKAGING_ERROR"
  | "SOURCE_OBJECT_MISSING"
  | "INTERNAL_ERROR"
  | (string & {});
export interface CampaignAssetExportFailureReason {
  Code: CampaignAssetExportFailureCode;
  Message: string;
}
export interface GetCampaignAssetExportTaskResponse {
  Id: string;
  Status: CampaignAssetExportTaskStatus;
  CreatedAt?: Date | undefined;
  DownloadUrl?: string | undefined;
  ExpiresAt?: Date | undefined;
  FailureReason?: CampaignAssetExportFailureReason | undefined;
}
export interface GetCampaignTemplateRequest {
  Catalog: Catalog;
  Identifier: string;
}
export type TemplateName = string;
export type CampaignTemplateDescription = string;
export type CampaignTemplateCollection = "GENERAL" | "BUILD_WITH_AI" | (string & {});
export type AwsServicesList = string[];
export type CustomerSegment = "ENTERPRISE" | "SMB" | "PUBLIC_SECTOR" | "ISV" | (string & {});
export type CustomerSegmentList = CustomerSegment[];
export type Theme =
  | "AI"
  | "MIGRATION_MODERNIZATION"
  | "SECURITY"
  | "DATA_ANALYTICS"
  | "AWS_TRAINING_CERTIFICATION"
  | "AWS_MARKETPLACE"
  | "CONNECT"
  | "EVENTS"
  | (string & {});
export type ThemeList = Theme[];
export type CampaignAssetTemplateType =
  | "EMAIL"
  | "SOCIAL_POST"
  | "LANDING_PAGE"
  | "BANNER_AD"
  | "DOCUMENT"
  | (string & {});
export type CampaignAssetTemplateFieldList = CampaignAssetTemplateField[];
export type CampaignAssetTemplateIdList = string[];
export interface CampaignAssetTemplate {
  Id: string;
  Type: CampaignAssetTemplateType;
  Label: string;
  DisplayOrder?: number | undefined;
  Fields?: CampaignAssetTemplateField[] | undefined;
  LayoutPreviews?: LayoutPreview[] | undefined;
  PrerequisiteAssetTemplateIds?: string[] | undefined;
  SocialPlatform?: Platform | undefined;
}
export type CampaignAssetTemplateList = CampaignAssetTemplate[];
export interface ReferenceMaterial {
  Name: string;
  Url?: string | undefined;
}
export type ReferenceMaterialList = ReferenceMaterial[];
export interface CampaignTemplate {
  Id: string;
  Name: string;
  Industry?: Industry | undefined;
  UseCase?: string | undefined;
  Description?: string | undefined;
  LanguageCode?: AssetLanguage | undefined;
  Collection: CampaignTemplateCollection;
  AwsServices?: string[] | undefined;
  CustomerSegments?: CustomerSegment[] | undefined;
  Themes?: Theme[] | undefined;
  SetupDuration?: string | undefined;
  ThumbnailUrl?: string | undefined;
  EffectiveDateBegin?: Date | undefined;
  AssetTemplates?: CampaignAssetTemplate[] | undefined;
  ReferenceMaterials?: ReferenceMaterial[] | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export interface GetCampaignTemplateResponse {
  CampaignTemplate: CampaignTemplate;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListCampaignAssetsRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CampaignAssetSummary {
  Id: string;
  Category: CampaignAssetCategory;
  Name: string;
  LinkLabel?: string | undefined;
  State?: CampaignAssetState | undefined;
  LastActivationStatus?: AttemptStatus | undefined;
  DeliveryStatus?: DeliveryStatus | undefined;
  DeliveryStatusReason?: CampaignAssetStateReason | undefined;
  SourceAssetTemplateId?: string | undefined;
  SocialPlatform?: Platform | undefined;
  StartedAt?: Date | undefined;
  FileFormat?: FileFormat | undefined;
  SendMode?: SendMode | undefined;
  ScheduledSendAt?: Date | undefined;
}
export type CampaignAssetSummaryList = CampaignAssetSummary[];
export interface ListCampaignAssetsResponse {
  Items: CampaignAssetSummary[];
  NextToken?: string | undefined;
}
export type CampaignIdentifierList = string[];
export type CampaignStateList = CampaignState[];
export type CampaignSortName = "NAME" | "STATE" | "START_ON" | "CREATED_AT" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface CampaignSort {
  SortBy: CampaignSortName;
  SortOrder: SortOrder;
}
export interface ListCampaignsRequest {
  Catalog: Catalog;
  CampaignIdentifiers?: string[] | undefined;
  Name?: string | undefined;
  States?: CampaignState[] | undefined;
  Sort?: CampaignSort | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CampaignSummary {
  CampaignId: string;
  Arn: string;
  Name: string;
  State: CampaignState;
  Language?: AssetLanguage | undefined;
  StartOn?: string | undefined;
  EndOn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type CampaignSummaryList = CampaignSummary[];
export interface ListCampaignsResponse {
  Items: CampaignSummary[];
  NextToken?: string | undefined;
}
export interface ListSocialConnectionsRequest {
  Catalog: Catalog;
  Platform?: Platform | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SocialConnectionStatus = "AUTHORIZED" | "EXPIRED" | "PAGE_REQUIRED" | (string & {});
export type SocialPageName = string;
export type SocialAccountName = string | redacted.Redacted<string>;
export interface SocialConnectionSummary {
  Id: string;
  Platform: Platform;
  Status: SocialConnectionStatus;
  PageName?: string | undefined;
  AccountName?: string | redacted.Redacted<string> | undefined;
  ConnectedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export type SocialConnectionSummaryList = SocialConnectionSummary[];
export interface ListSocialConnectionsResponse {
  Items: SocialConnectionSummary[];
  NextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn: string;
  Tags?: Tag[] | undefined;
}
export type TemplateSearchText = string;
export type IndustryFilterList = Industry[];
export type UseCaseFilter = string;
export type UseCaseFilterList = string[];
export type LanguageFilterList = AssetLanguage[];
export type AwsServiceFilterList = string[];
export type CustomerSegmentFilterList = CustomerSegment[];
export type ThemeFilterList = Theme[];
export type CampaignTemplateCollectionFilterList = CampaignTemplateCollection[];
export interface SearchCampaignTemplatesRequest {
  Catalog: Catalog;
  SearchText?: string | undefined;
  Industry?: Industry[] | undefined;
  UseCase?: string[] | undefined;
  Language?: AssetLanguage[] | undefined;
  AwsServices?: string[] | undefined;
  CustomerSegments?: CustomerSegment[] | undefined;
  Themes?: Theme[] | undefined;
  Collection?: CampaignTemplateCollection[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CampaignTemplateSummary {
  Id: string;
  Name: string;
  Industry?: Industry | undefined;
  UseCase?: string | undefined;
  Description?: string | undefined;
  LanguageCode?: AssetLanguage | undefined;
  Collection: CampaignTemplateCollection;
  AwsServices?: string[] | undefined;
  CustomerSegments?: CustomerSegment[] | undefined;
  Themes?: Theme[] | undefined;
  ThumbnailUrl?: string | undefined;
}
export type CampaignTemplateSummaryList = CampaignTemplateSummary[];
export interface SearchCampaignTemplatesResponse {
  TotalResults: number;
  CampaignTemplates: CampaignTemplateSummary[];
  NextToken?: string | undefined;
}
export type CampaignAssetIdentifiers = string[];
export interface StartCampaignAssetActivationTaskRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetIdentifiers: string[];
  ClientToken?: string | undefined;
}
export interface StartCampaignAssetActivationTaskResponse {
  CampaignId: string;
  TaskId: string;
  TaskStatus: CampaignAssetActivationTaskStatus;
  StartedAt: Date;
  EndedAt?: Date | undefined;
  Assets: CampaignAssetActivationOutcome[];
}
export interface StartCampaignAssetExportTaskRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  ClientToken?: string | undefined;
}
export interface StartCampaignAssetExportTaskResponse {
  Id: string;
  Status: CampaignAssetExportTaskStatus;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCampaignRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  Name?: string | undefined;
  SenderEmail?: string | redacted.Redacted<string> | undefined;
  PrivacyPolicyUrl?: string | undefined;
  PartnerAddress?: string | redacted.Redacted<string> | undefined;
  PartnerBadge?: FileRef | undefined;
  EmailTarget?: FileRef | undefined;
  EmailTargetEngagementGroupIds?: string[] | undefined;
  SocialConnections?: { [key: string]: string[] | undefined } | undefined;
  EstimatedBudget?: MonetaryValue | undefined;
  TotalBudget?: MonetaryValue | undefined;
  TargetAudience?: TargetAudience | undefined;
  ClientToken?: string | undefined;
  StartOn?: string | undefined;
  EndOn?: string | undefined;
}
export interface UpdateCampaignResponse {
  Id: string;
}
export interface FieldValueInput {
  FieldId: string;
  Value?: TemplateFieldValue | undefined;
}
export type FieldValueInputList = FieldValueInput[];
export interface UpdateCampaignAssetRequest {
  Catalog: Catalog;
  CampaignIdentifier: string;
  CampaignAssetIdentifier: string;
  FieldValues?: FieldValueInput[] | undefined;
  Layout?: string | undefined;
  SendMode?: SendMode | undefined;
  ScheduledSendAt?: Date | undefined;
  ClientToken?: string | undefined;
}
export interface UpdateCampaignAssetResponse {
  Id: string;
  State: CampaignAssetState;
  ActivationIssues: ActivationIssue[];
}
export type ConflictReason = string;
export type AccessDeniedExceptionReason = "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE" | (string & {});
export type ValidationExceptionReason =
  | "FIELD_VALIDATION_FAILED"
  | "CANNOT_PARSE"
  | "OTHER"
  | "CAMPAIGN_INCOMPLETE"
  | (string & {});
export type ValidationExceptionFieldCode =
  | "VALUE_TOO_SHORT"
  | "VALUE_TOO_LONG"
  | "PATTERN_MISMATCH"
  | "DISALLOWED_HTML_TAG"
  | "WRONG_VALUE_TYPE"
  | "FILE_REFERENCE_INVALID"
  | "FILE_REFERENCE_NOT_OWNED"
  | "IMAGE_FORMAT_NOT_SUPPORTED"
  | "IMAGE_FORMAT_NOT_ALLOWED"
  | "IMAGE_TOO_LARGE"
  | "FILE_TOO_LARGE"
  | "SCAN_REJECTED"
  | "UNKNOWN_FIELD"
  | "IMAGE_ASPECT_RATIO_MISMATCH"
  | "FIELD_SET_ON_CAMPAIGN"
  | "EMAIL_COLUMN_MISSING"
  | "RECIPIENT_LIST_TOO_LARGE"
  | "RECIPIENT_LIST_EMPTY"
  | "INVALID_VALUE"
  | "NOT_SUPPORTED_FOR_CATEGORY"
  | "RECIPIENT_LIST_NOT_UTF8"
  | "FIELD_FROM_PARTNER_PROFILE"
  | "COPY_SOURCE_INVALID"
  | "SENDER_DOMAIN_NOT_ALLIANCE_LEAD"
  | "SENDER_DOMAIN_DKIM_MISSING"
  | "SENDER_DOMAIN_DMARC_MISSING"
  | "PARTNER_BADGE_NOT_ELIGIBLE"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  FieldId?: string | undefined;
  Message: string;
  Code?: ValidationExceptionFieldCode | undefined;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchCreateCampaignAssetError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instantiates one or more of the campaign template's blueprints as assets of
 * this campaign.
 *
 * The only asset-create operation: DG-038 deleted the singular
 * CreateCampaignAsset, and AWS Batch Operations makes exposing a singular
 * alongside a batch optional ("which MAY actually be exposed in addition"). It
 * also replaced kit instantiation -- CreateCampaign creates zero assets, so this
 * is the only path by which an asset comes into existence.
 *
 * Errors here are whole-request only, and nothing is written when one is thrown.
 * Per-entry failures ride in the response's `Errors` list with a 200.
 * ServiceQuotaExceededException is deliberately absent: a campaign holds at most
 * one asset per blueprint (I-15), so the ceiling is the size of the bound kit and
 * a request of unique valid entries cannot exceed it.
 */
export const batchCreateCampaignAsset: API.OperationMethod<
  BatchCreateCampaignAssetRequest & RegionInput,
  BatchCreateCampaignAssetResponse,
  BatchCreateCampaignAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(218, __c27, 2) as any as S.Schema<BatchCreateCampaignAssetRequest>,
  output: __S(223, __c27, 7) as any as S.Schema<BatchCreateCampaignAssetResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateCampaignAsset",
  telemetry: TELEMETRY,
  span: "BatchCreateCampaignAsset",
}));

export type CreateCampaignError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new marketing campaign.
 *
 * Returns the identity of the new campaign, not the campaign. Growing a response is
 * backward compatible and shrinking one is not, and the caller's next step is a
 * `GetCampaign` anyway -- a write that supplies an audience cannot report its scan verdict,
 * because that is decided after it commits.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest & RegionInput,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<CreateCampaignRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<CreateCampaignResponse>,
  errors: [ConflictException, ResourceNotFoundException, ServiceQuotaExceededException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
  telemetry: TELEMETRY,
  span: "CreateCampaign",
}));

export type CreateSocialConnectionAuthorizationUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a single-use URL the partner visits to authorize publishing on a
 * platform. Serves a first connect, connecting a further account, and
 * re-authorizing an expired one: consenting with an account that is already
 * connected re-authorizes that connection and keeps its id; any other account
 * adds a connection. Poll ListSocialConnections for the outcome. Deliberately not
 * idempotent and takes no client token: every call must mint a fresh single-use
 * URL, so replaying a cached response would hand back a dead one.
 */
export const createSocialConnectionAuthorizationUrl: API.OperationMethod<
  CreateSocialConnectionAuthorizationUrlRequest & RegionInput,
  CreateSocialConnectionAuthorizationUrlResponse,
  CreateSocialConnectionAuthorizationUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<CreateSocialConnectionAuthorizationUrlRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<CreateSocialConnectionAuthorizationUrlResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSocialConnectionAuthorizationUrl",
  telemetry: TELEMETRY,
  span: "CreateSocialConnectionAuthorizationUrl",
}));

export type DeactivateCampaignAssetError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a live campaign asset: an email's scheduled send is withdrawn, a
 * social post is removed before it publishes. On a completed campaign, it
 * also removes a published document, banner or landing page.
 *
 * Synchronous, and safe to repeat. Does not delete the asset record, so a
 * stopped email or social post can be started again.
 *
 * Not every asset can be stopped, and the reasons differ in kind. An email
 * that has begun sending **cannot** be recalled: the send is gone. A document,
 * a banner or a landing page is **refused** with `ASSET_NOT_DEACTIVATABLE` until
 * the campaign has completed (the UTC date is after its `EndOn`). Until then the
 * partner fixes one in place by updating it and activating it again, which keeps
 * its URL, so every email that already linked to it keeps working.
 *
 * Once the campaign has completed, the removal is permanent, because a completed
 * campaign can't activate anything again:
 *
 * - A document's published PDF is deleted. Its URL stops serving within about a
 * minute (the CDN revalidates), and `PublicUrl` is no longer returned. Anything
 * that linked to it, such as a landing page's download button or a sent email,
 * reaches an error page. The export still contains the document.
 * - A banner's or landing page's published object is taken down at the delivery
 * platform, and the images the partner put on it are deleted. A landing page
 * stops capturing leads, and its `PublicUrl` is no longer returned. A partner
 * site that embedded a banner shows nothing there. The platform's own CDN can
 * keep serving a copy a visitor already cached, which collects nothing.
 *
 * A landing page and a document it links to can be removed in either order.
 */
export const deactivateCampaignAsset: API.OperationMethod<
  DeactivateCampaignAssetRequest & RegionInput,
  DeactivateCampaignAssetResponse,
  DeactivateCampaignAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeactivateCampaignAssetRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DeactivateCampaignAssetResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateCampaignAsset",
  telemetry: TELEMETRY,
  span: "DeactivateCampaignAsset",
}));

export type DeleteCampaignError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes a campaign, its assets and their stored files.
 *
 * A hard delete with no undo: the campaign leaves ListCampaigns and every read of it returns
 * ResourceNotFoundException. Its tags are removed with it.
 *
 * Refused with ConflictException while the campaign has a live asset (`CAMPAIGN_HAS_ACTIVE_ASSETS`),
 * because deleting the record would orphan what the delivery platform still serves or sends:
 * deactivate those assets first. Also refused while an activation task is running
 * (`CAMPAIGN_ACTIVATION_IN_PROGRESS`). A completed campaign can be deleted.
 *
 * Idempotent in effect: deleting a campaign that is already gone returns ResourceNotFoundException,
 * and nothing is left behind by a retry.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest & RegionInput,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<DeleteCampaignRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteCampaignResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
  telemetry: TELEMETRY,
  span: "DeleteCampaign",
}));

export type DeleteCampaignAssetError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes a campaign asset.
 */
export const deleteCampaignAsset: API.OperationMethod<
  DeleteCampaignAssetRequest & RegionInput,
  DeleteCampaignAssetResponse,
  DeleteCampaignAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DeleteCampaignAssetRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteCampaignAssetResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignAsset",
  telemetry: TELEMETRY,
  span: "DeleteCampaignAsset",
}));

export type DeleteSocialConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes and deletes one social connection; other connections on the same
 * platform are untouched. Idempotent: deleting an unknown or already-deleted
 * connection succeeds rather than returning a not-found error.
 */
export const deleteSocialConnection: API.OperationMethod<
  DeleteSocialConnectionRequest & RegionInput,
  DeleteSocialConnectionResponse,
  DeleteSocialConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteSocialConnectionRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteSocialConnectionResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSocialConnection",
  telemetry: TELEMETRY,
  span: "DeleteSocialConnection",
}));

export type GetCampaignError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a campaign by its identifier.
 */
export const getCampaign: API.OperationMethod<
  GetCampaignRequest & RegionInput,
  GetCampaignResponse,
  GetCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetCampaignRequest>,
  output: __S(45, __c5, 5) as any as S.Schema<GetCampaignResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
  telemetry: TELEMETRY,
  span: "GetCampaign",
}));

export type GetCampaignAssetError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an asset by its identifier.
 */
export const getCampaignAsset: API.OperationMethod<
  GetCampaignAssetRequest & RegionInput,
  GetCampaignAssetResponse,
  GetCampaignAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetCampaignAssetRequest>,
  output: __S(68, __c8, 4) as any as S.Schema<GetCampaignAssetResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignAsset",
  telemetry: TELEMETRY,
  span: "GetCampaignAsset",
}));

export type GetCampaignAssetActivationTaskError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reads a campaign's current activation task.
 *
 * Keyed on the **campaign**, with no task identifier, because a campaign has at
 * most one activation task: runs are serialised, so there is no collection to
 * address into. The caller always holds the task id anyway, because Start
 * returned it -- the id is a correlation value, not an address.
 *
 * Returns the campaign's most recent task. A new task overwrites the previous
 * one, so this is not a history: the durable per-asset record is on the assets
 * themselves. Returns ResourceNotFoundException when the campaign has never had
 * a task, or when its last one has expired.
 */
export const getCampaignAssetActivationTask: API.OperationMethod<
  GetCampaignAssetActivationTaskRequest & RegionInput,
  GetCampaignAssetActivationTaskResponse,
  GetCampaignAssetActivationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetCampaignAssetActivationTaskRequest>,
  output: __S(98, __c12, 2) as any as S.Schema<GetCampaignAssetActivationTaskResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignAssetActivationTask",
  telemetry: TELEMETRY,
  span: "GetCampaignAssetActivationTask",
}));

export type GetCampaignAssetExportTaskError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a campaign asset export task by its identifier, reporting its
 * status and, when the task is COMPLETED, a freshly minted short-lived
 * presigned URL for downloading the ZIP archive.
 *
 * The download URL is minted on each call and is valid for at most 15 minutes;
 * clients should download promptly rather than caching it. When the task has
 * FAILED, FailureReason explains why. Poll this operation (roughly every 2-5
 * seconds) until the task reaches a terminal state.
 */
export const getCampaignAssetExportTask: API.OperationMethod<
  GetCampaignAssetExportTaskRequest & RegionInput,
  GetCampaignAssetExportTaskResponse,
  GetCampaignAssetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetCampaignAssetExportTaskRequest>,
  output: __S(106, __c13, 2) as any as S.Schema<GetCampaignAssetExportTaskResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignAssetExportTask",
  telemetry: TELEMETRY,
  span: "GetCampaignAssetExportTask",
}));

export type GetCampaignTemplateError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves full detail of one campaign template, including its ordered asset
 * templates with their field schema and layout previews.
 */
export const getCampaignTemplate: API.OperationMethod<
  GetCampaignTemplateRequest & RegionInput,
  GetCampaignTemplateResponse,
  GetCampaignTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetCampaignTemplateRequest>,
  output: __S(119, __c14, 7) as any as S.Schema<GetCampaignTemplateResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignTemplate",
  telemetry: TELEMETRY,
  span: "GetCampaignTemplate",
}));

export type ListCampaignAssetsError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists assets for a campaign with pagination.
 */
export const listCampaignAssets: API.PaginatedOperationMethod<
  ListCampaignAssetsRequest & RegionInput,
  ListCampaignAssetsResponse,
  ListCampaignAssetsError,
  Credentials | HttpClient.HttpClient,
  CampaignAssetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListCampaignAssetsRequest>,
  output: __S(123, __c15, 3) as any as S.Schema<ListCampaignAssetsResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaignAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCampaignAssets",
})) as any;

export type ListCampaignsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists campaigns with optional filters and pagination.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest & RegionInput,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(129, __c16, 1) as any as S.Schema<ListCampaignsRequest>,
  output: __S(132, __c16, 4) as any as S.Schema<ListCampaignsResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCampaigns",
})) as any;

export type ListSocialConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the partner's social connections, optionally filtered by platform.
 */
export const listSocialConnections: API.PaginatedOperationMethod<
  ListSocialConnectionsRequest & RegionInput,
  ListSocialConnectionsResponse,
  ListSocialConnectionsError,
  Credentials | HttpClient.HttpClient,
  SocialConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListSocialConnectionsRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<ListSocialConnectionsResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSocialConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSocialConnections",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags applied to a Partner Central Marketing resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type SearchCampaignTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches and browses the AWS-authored campaign template catalog. With no
 * SearchText it returns the whole catalog in the default order, so browse and
 * keyword search share one shape; GetCampaignTemplate reads one template.
 */
export const searchCampaignTemplates: API.PaginatedOperationMethod<
  SearchCampaignTemplatesRequest & RegionInput,
  SearchCampaignTemplatesResponse,
  SearchCampaignTemplatesError,
  Credentials | HttpClient.HttpClient,
  CampaignTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<SearchCampaignTemplatesRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<SearchCampaignTemplatesResponse>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchCampaignTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CampaignTemplates",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchCampaignTemplates",
})) as any;

export type StartCampaignAssetActivationTaskError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Activates 1-25 of a campaign's assets as one ordered unit, and returns a task
 * to poll.
 *
 * Takes a **list** because the service owns the ordering. Assets link to one
 * another by URL -- an email's call-to-action carries the landing page's URL, the
 * landing page's download field carries the document's -- and a URL does not
 * exist until the asset it points at is activated. Those edges are derived by
 * the service from the campaign's pinned template, so reconstructing and
 * topologically sorting them is work the service has already done, and getting
 * it wrong arms an email with a dead link. Name every asset you want live and
 * the service sequences them; "activate everything" is the list with every id
 * in it, which ListCampaignAssets already gave you.
 *
 * Asynchronous, because activating an asset installs or arms behaviour that runs
 * later and an email activation bulk-loads its audience into the delivery
 * platform. Everything decidable **without** a write to the delivery platform is
 * evaluated before this returns; everything else lands on the task.
 *
 * A refusal that applies to one asset does not fail the request: that asset is
 * on the task already FAILED, with its reason, and the rest run. A refusal that
 * applies to the whole request -- a malformed list, an unknown campaign, another
 * task already running on this campaign, this service's service-linked role
 * being deleted (ConflictException `SERVICE_LINKED_ROLE_DELETION_IN_PROGRESS`),
 * a campaign setting an asset in the request needs (ValidationException
 * `CAMPAIGN_INCOMPLETE`), a campaign sender that no longer passes `CreateCampaign`'s
 * sender rules while the request names an email (ValidationException with no
 * `FieldList`, whose message ends with one `Reason: ` token per failed rule:
 * `PATTERN_MISMATCH`, `SENDER_DOMAIN_NOT_ALLIANCE_LEAD`, or `SENDER_DOMAIN_DKIM_MISSING`
 * and/or `SENDER_DOMAIN_DMARC_MISSING`) -- is thrown, and nothing starts.
 *
 * One task runs on a campaign at a time. A second concurrent call is refused
 * with ConflictException / CAMPAIGN_ACTIVATION_IN_PROGRESS, whose `ResourceId`
 * names the task already holding the campaign. Two tasks over *disjoint* asset
 * sets are refused too: the guard is deliberately campaign-wide, because
 * overlapping runs made the per-asset status misleading rather than merely
 * contended.
 */
export const startCampaignAssetActivationTask: API.OperationMethod<
  StartCampaignAssetActivationTaskRequest & RegionInput,
  StartCampaignAssetActivationTaskResponse,
  StartCampaignAssetActivationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<StartCampaignAssetActivationTaskRequest>,
  output: __S(98, __c12, 2) as any as S.Schema<StartCampaignAssetActivationTaskResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCampaignAssetActivationTask",
  telemetry: TELEMETRY,
  span: "StartCampaignAssetActivationTask",
}));

export type StartCampaignAssetExportTaskError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous task that packages a campaign's assets
 * into a single downloadable ZIP archive.
 *
 * Fire-and-return: the campaign is validated (it must exist and not be
 * cancelled), a task record is persisted, an asynchronous execution is
 * started, and the task id is returned with status IN_PROGRESS. This operation
 * does not inspect assets -- all resolution, exclusion, and failure are
 * determined by the execution and surfaced only by GetCampaignAssetExportTask.
 *
 * Every campaign is exportable, including one never activated, because
 * renderable assets are composed on demand at export time rather than
 * requiring finished, launched deliverables.
 */
export const startCampaignAssetExportTask: API.OperationMethod<
  StartCampaignAssetExportTaskRequest & RegionInput,
  StartCampaignAssetExportTaskResponse,
  StartCampaignAssetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<StartCampaignAssetExportTaskRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<StartCampaignAssetExportTaskResponse>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCampaignAssetExportTask",
  telemetry: TELEMETRY,
  span: "StartCampaignAssetExportTask",
}));

export type TagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or replaces tags on a Partner Central Marketing resource.
 *
 * Idempotent: applying a tag that is already present with the same value is a
 * no-op, and supplying a key that already exists replaces its value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ConflictException, ResourceNotFoundException, ServiceQuotaExceededException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a Partner Central Marketing resource.
 *
 * Idempotent: removing a key that is not present succeeds.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateCampaignError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Edits a campaign in place.
 *
 * Partial update: an omitted field is left unchanged, which is the standard meaning of an
 * `Update` verb -- a full replacement would be a `Put`. Change-only, with no way to clear a
 * field back to empty, because the campaign's file members cannot round-trip: they are
 * written as an `s3://` reference and read back as a URL or as metadata, so a replacement
 * payload could not resend an unchanged recipient list without re-uploading it.
 *
 * Refused while an activation task runs (`CAMPAIGN_ACTIVATION_IN_PROGRESS`) and once the campaign is
 * completed (`CAMPAIGN_COMPLETED`, the UTC date is after its `EndOn`).
 *
 * Last-writer-wins, with no concurrency token: this is low-contention metadata owned by one
 * partner.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest & RegionInput,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UpdateCampaignRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<UpdateCampaignResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
  telemetry: TELEMETRY,
  span: "UpdateCampaign",
}));

export type UpdateCampaignAssetError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an asset's field values, layout or send time. Refused with
 * `ConflictException` while the campaign's running activation task still owns the
 * asset (`ASSET_START_IN_PROGRESS`), and for a live email or social post
 * (`ASSET_ALREADY_ACTIVE`): deactivate it first.
 */
export const updateCampaignAsset: API.OperationMethod<
  UpdateCampaignAssetRequest & RegionInput,
  UpdateCampaignAssetResponse,
  UpdateCampaignAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(202, __c25, 2) as any as S.Schema<UpdateCampaignAssetRequest>,
  output: __S(203, __c25, 3) as any as S.Schema<UpdateCampaignAssetResponse>,
  errors: [ConflictException, ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignAsset",
  telemetry: TELEMETRY,
  span: "UpdateCampaignAsset",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeactivateCampaignAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          State: S.String,
          LastActivationStatus: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeactivateCampaignAssetResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, CampaignIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCampaignRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCampaignResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteCampaignAssetRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSocialConnectionRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, CampaignIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.optional(S.String),
          WebsiteUrl: S.optional(S.String),
          LogoUrl: S.optional(S.String),
          RefreshedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "PartnerProfileBranding" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Url: S.String, AttachedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
      ).annotate({ identifier: "PartnerBadgeDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScanStatus: S.optional(S.String),
          AttachedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ValidCount: S.optional(S.Number),
          RejectedCount: S.optional(S.Number),
          DuplicateCount: S.optional(S.Number),
          FileName: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmailTargetDetail" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CampaignId: S.String,
          Arn: S.String,
          Name: S.String,
          State: S.String,
          CampaignTemplateId: S.optional(S.String),
          Language: S.optional(S.String),
          PartnerProfile: S.optional(__S(41, __c5, 1)),
          SenderEmail: S.optional(SensitiveString),
          PrivacyPolicyUrl: S.optional(S.String),
          PartnerAddress: S.optional(SensitiveString),
          PartnerBadge: S.optional(__S(42, __c5, 2)),
          EmailTarget: S.optional(__S(43, __c5, 3)),
          EmailTargetEngagementGroupIds: S.optional(__S(240, __c30, 0)),
          SocialConnections: S.optional(__S(56, __c7, 0)),
          EstimatedBudget: S.optional(__S(265, __c33, 1)),
          TotalBudget: S.optional(__S(265, __c33, 1)),
          TargetAudience: S.optional(__S(264, __c33, 0)),
          StartOn: S.optional(S.String),
          EndOn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActivationIssues: __S(49, __c6, 1),
        }),
      ).annotate({ identifier: "Campaign" });
    case 5:
      return S.suspend(() => S.Struct({ Campaign: __S(44, __c5, 4) })).annotate({
        identifier: "GetCampaignResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Code: S.String,
          FieldId: S.optional(S.String),
          CampaignSetting: S.optional(S.String),
          PartnerProfileField: S.optional(S.String),
          AffectedAssetIds: S.optional(__S(240, __c30, 0)),
          Message: S.String,
        }),
      ).annotate({ identifier: "ActivationIssue" });
    case 1:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(240, __c30, 0).pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCampaignAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Field: __S(77, __c9, 5), Value: S.optional(__S(81, __c10, 1)) }),
      ).annotate({ identifier: "CampaignAssetFieldValue" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          CampaignId: S.String,
          Category: S.String,
          Name: S.String,
          LinkLabel: S.optional(S.String),
          State: S.String,
          LastActivationStatus: S.optional(S.String),
          DeliveryStatus: S.optional(S.String),
          DeliveryStatusReason: S.optional(S.String),
          SourceAssetTemplateId: S.optional(S.String),
          SocialPlatform: S.optional(S.String),
          FileFormat: S.optional(S.String),
          SendMode: S.optional(S.String),
          ScheduledSendAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FieldValues: S.optional(__S(66, __c8, 2)),
          LayoutPreviews: S.optional(__S(233, __c29, 1)),
          Layout: S.optional(__S(226, __c28, 2)),
          ActivationIssues: __S(49, __c6, 1),
          PublicUrl: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CampaignAsset" });
    case 4:
      return S.suspend(() => S.Struct({ Asset: __S(67, __c8, 3) })).annotate({
        identifier: "GetCampaignAssetResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MinLength: S.optional(S.Number),
          MaxLength: S.optional(S.Number),
          Pattern: S.optional(S.String),
          Placeholder: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "TextFieldType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxLength: S.optional(S.Number),
          AllowedTags: __S(240, __c30, 0),
          Placeholder: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RichTextFieldType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxSizeBytes: S.optional(S.Number),
          AllowedFormats: S.optional(__S(256, __c32, 0)),
          DefaultValue: S.optional(__S(232, __c29, 0)),
          RecommendedWidthPixels: S.optional(S.Number),
          RecommendedHeightPixels: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImageFieldType" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Category: S.String, LabelFieldId: S.optional(S.String) }),
      ).annotate({ identifier: "AssetLinkFieldType" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Text: __S(72, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ RichText: __S(73, __c9, 1) }),
        /*@__PURE__*/ S.Struct({ Image: __S(74, __c9, 2) }),
        /*@__PURE__*/ S.Struct({ AssetLink: __S(75, __c9, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          FieldId: S.String,
          Label: S.optional(S.String),
          Description: S.optional(S.String),
          Section: S.optional(S.String),
          Page: S.optional(S.Number),
          Required: S.optional(S.Boolean),
          Type: __S(76, __c9, 4),
          CampaignSetting: S.optional(S.String),
          PartnerProfileField: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignAssetTemplateField" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CampaignIdentifier: S.String,
          CampaignAssetIdentifier: S.String,
          FieldId: S.String,
        }),
      ).annotate({ identifier: "CampaignAssetImageSource" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Text: SensitiveString }),
        /*@__PURE__*/ S.Struct({ ImageReference: S.String }),
        /*@__PURE__*/ S.Struct({ LinkedAssetId: S.String }),
        /*@__PURE__*/ S.Struct({ CampaignAssetImage: __S(80, __c10, 0) }),
      ]);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, CampaignIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCampaignAssetActivationTaskRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CampaignAssetId: S.String,
          Status: S.String,
          Reason: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignAssetActivationOutcome" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CampaignId: S.String,
          TaskId: S.String,
          TaskStatus: S.String,
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Assets: __S(97, __c12, 1),
        }),
      ).annotate({ identifier: "GetCampaignAssetActivationTaskResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetExportTaskIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCampaignAssetExportTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Code: S.String, Message: S.String })).annotate({
        identifier: "CampaignAssetExportFailureReason",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Status: S.String,
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DownloadUrl: S.optional(S.String),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(__S(105, __c13, 1)),
        }),
      ).annotate({ identifier: "GetCampaignAssetExportTaskResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCampaignTemplateRequest" });
    case 1:
      return S.Array(__S(77, __c9, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Type: S.String,
          Label: S.String,
          DisplayOrder: S.optional(S.Number),
          Fields: S.optional(__S(113, __c14, 1)),
          LayoutPreviews: S.optional(__S(233, __c29, 1)),
          PrerequisiteAssetTemplateIds: S.optional(__S(240, __c30, 0)),
          SocialPlatform: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignAssetTemplate" });
    case 3:
      return S.Array(__S(114, __c14, 2));
    case 4:
      return S.suspend(() => S.Struct({ Name: S.String, Url: S.optional(S.String) })).annotate({
        identifier: "ReferenceMaterial",
      });
    case 5:
      return S.Array(__S(116, __c14, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Industry: S.optional(S.String),
          UseCase: S.optional(S.String),
          Description: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          Collection: S.String,
          AwsServices: S.optional(__S(240, __c30, 0)),
          CustomerSegments: S.optional(__S(256, __c32, 0)),
          Themes: S.optional(__S(256, __c32, 0)),
          SetupDuration: S.optional(S.String),
          ThumbnailUrl: S.optional(S.String),
          EffectiveDateBegin: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssetTemplates: S.optional(__S(115, __c14, 3)),
          ReferenceMaterials: S.optional(__S(117, __c14, 5)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CampaignTemplate" });
    case 7:
      return S.suspend(() => S.Struct({ CampaignTemplate: __S(118, __c14, 6) })).annotate({
        identifier: "GetCampaignTemplateResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCampaignAssetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Category: S.String,
          Name: S.String,
          LinkLabel: S.optional(S.String),
          State: S.optional(S.String),
          LastActivationStatus: S.optional(S.String),
          DeliveryStatus: S.optional(S.String),
          DeliveryStatusReason: S.optional(S.String),
          SourceAssetTemplateId: S.optional(S.String),
          SocialPlatform: S.optional(S.String),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileFormat: S.optional(S.String),
          SendMode: S.optional(S.String),
          ScheduledSendAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CampaignAssetSummary" });
    case 2:
      return S.Array(__S(121, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(122, __c15, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCampaignAssetsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SortBy: S.String, SortOrder: S.String })).annotate({
        identifier: "CampaignSort",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifiers: S.optional(__S(240, __c30, 0)),
          Name: S.optional(S.String),
          States: S.optional(__S(256, __c32, 0)),
          Sort: S.optional(__S(128, __c16, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCampaignsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CampaignId: S.String,
          Arn: S.String,
          Name: S.String,
          State: S.String,
          Language: S.optional(S.String),
          StartOn: S.optional(S.String),
          EndOn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CampaignSummary" });
    case 3:
      return S.Array(__S(130, __c16, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Items: __S(131, __c16, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCampaignsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Platform: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSocialConnectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Platform: S.String,
          Status: S.String,
          PageName: S.optional(S.String),
          AccountName: S.optional(SensitiveString),
          ConnectedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SocialConnectionSummary" });
    case 2:
      return S.Array(__S(137, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(138, __c17, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSocialConnectionsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: S.optional(__S(273, __c34, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          SearchText: S.optional(S.String),
          Industry: S.optional(__S(256, __c32, 0)),
          UseCase: S.optional(__S(240, __c30, 0)),
          Language: S.optional(__S(256, __c32, 0)),
          AwsServices: S.optional(__S(240, __c30, 0)),
          CustomerSegments: S.optional(__S(256, __c32, 0)),
          Themes: S.optional(__S(256, __c32, 0)),
          Collection: S.optional(__S(256, __c32, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchCampaignTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Industry: S.optional(S.String),
          UseCase: S.optional(S.String),
          Description: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          Collection: S.String,
          AwsServices: S.optional(__S(240, __c30, 0)),
          CustomerSegments: S.optional(__S(256, __c32, 0)),
          Themes: S.optional(__S(256, __c32, 0)),
          ThumbnailUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignTemplateSummary" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TotalResults: S.Number,
          CampaignTemplates: __S(154, __c19, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchCampaignTemplatesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetIdentifiers: __S(240, __c30, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCampaignAssetActivationTaskRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCampaignAssetExportTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.String, Status: S.String })).annotate({
        identifier: "StartCampaignAssetExportTaskResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(273, __c34, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(240, __c30, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          Name: S.optional(S.String),
          SenderEmail: S.optional(SensitiveString),
          PrivacyPolicyUrl: S.optional(S.String),
          PartnerAddress: S.optional(SensitiveString),
          PartnerBadge: S.optional(__S(280, __c35, 0)),
          EmailTarget: S.optional(__S(280, __c35, 0)),
          EmailTargetEngagementGroupIds: S.optional(__S(240, __c30, 0)),
          SocialConnections: S.optional(__S(56, __c7, 0)),
          EstimatedBudget: S.optional(__S(265, __c33, 1)),
          TotalBudget: S.optional(__S(265, __c33, 1)),
          TargetAudience: S.optional(__S(264, __c33, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StartOn: S.optional(S.String),
          EndOn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCampaignRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.String })).annotate({
        identifier: "UpdateCampaignResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldId: S.String, Value: S.optional(__S(81, __c10, 1)) }),
      ).annotate({ identifier: "FieldValueInput" });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          CampaignAssetIdentifier: S.String,
          FieldValues: S.optional(__S(201, __c25, 1)),
          Layout: S.optional(S.String),
          SendMode: S.optional(S.String),
          ScheduledSendAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCampaignAssetRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Id: S.String, State: S.String, ActivationIssues: __S(49, __c6, 1) }),
      ).annotate({ identifier: "UpdateCampaignAssetResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          FieldId: S.optional(S.String),
          Message: S.String,
          Code: S.optional(S.String),
        }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(208, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SourceAssetTemplateIdentifier: S.String })).annotate({
        identifier: "BatchCreateCampaignAssetEntry",
      });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CampaignIdentifier: S.String,
          Entries: __S(217, __c27, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchCreateCampaignAssetRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SourceAssetTemplateId: S.String, Code: S.String, Message: S.String }),
      ).annotate({ identifier: "BatchCreateCampaignAssetError" });
    case 4:
      return S.Array(__S(219, __c27, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          SourceAssetTemplateId: S.String,
          Id: S.String,
          Layout: S.optional(__S(226, __c28, 2)),
        }),
      ).annotate({ identifier: "BatchCreateCampaignAssetResult" });
    case 6:
      return S.Array(__S(221, __c27, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Errors: __S(220, __c27, 4), Successful: S.optional(__S(222, __c27, 6)) }),
      ).annotate({ identifier: "BatchCreateCampaignAssetResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Value: S.String,
          Label: S.optional(S.String),
          FieldIds: __S(240, __c30, 0),
          LayoutPreviews: S.optional(__S(233, __c29, 1)),
        }),
      ).annotate({ identifier: "CampaignAssetLayoutOption" });
    case 1:
      return S.Array(__S(224, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Selected: S.optional(S.String), Options: __S(225, __c28, 1) }),
      ).annotate({ identifier: "CampaignAssetLayout" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Format: S.String, Url: S.String, PageType: S.optional(S.String) }),
      ).annotate({ identifier: "LayoutPreview" });
    case 1:
      return S.Array(__S(232, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Name: S.String,
          CampaignTemplateId: S.String,
          SenderEmail: S.optional(SensitiveString),
          PrivacyPolicyUrl: S.optional(S.String),
          PartnerAddress: S.optional(SensitiveString),
          PartnerBadge: S.optional(__S(280, __c35, 0)),
          EmailTarget: S.optional(__S(280, __c35, 0)),
          EmailTargetEngagementGroupIds: S.optional(__S(240, __c30, 0)),
          TargetAudience: S.optional(__S(264, __c33, 0)),
          EstimatedBudget: S.optional(__S(265, __c33, 1)),
          TotalBudget: S.optional(__S(265, __c33, 1)),
          StartOn: S.optional(S.String),
          EndOn: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(273, __c34, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCampaignRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.String, Arn: S.String })).annotate({
        identifier: "CreateCampaignResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Industries: S.optional(__S(256, __c32, 0)),
          CompanySizes: S.optional(__S(256, __c32, 0)),
          Countries: S.optional(__S(240, __c30, 0)),
        }),
      ).annotate({ identifier: "TargetAudience" });
    case 1:
      return S.suspend(() => S.Struct({ Amount: S.String, CurrencyCode: S.String })).annotate({
        identifier: "MonetaryValue",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(272, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3Uri: S.String, VersionId: S.String })).annotate({
        identifier: "FileRef",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Platform: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSocialConnectionAuthorizationUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Platform: S.String, AuthorizationUrl: SensitiveString }),
      ).annotate({ identifier: "CreateSocialConnectionAuthorizationUrlResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
