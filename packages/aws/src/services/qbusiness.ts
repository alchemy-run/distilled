import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "QBusiness", serviceShapeName: "ExpertQ" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "qbusiness" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-11-27");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseFIPS = false, Endpoint } = p;
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
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://qbusiness-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err("FIPS is enabled but this partition does not support FIPS");
            }
            return e(
              `https://qbusiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://qbusiness-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          return e(`https://qbusiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://qbusiness.{R}.api.aws","properties":{},"headers":{}}',
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
export class ExternalResourceException
  extends /*@__PURE__*/ S.TaggedError<ExternalResourceException>()(
    "ExternalResourceException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LicenseNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LicenseNotFoundException>()(
    "LicenseNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MediaTooLargeException
  extends /*@__PURE__*/ S.TaggedError<MediaTooLargeException>()(
    "MediaTooLargeException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(3713, __c116, 1)).annotate({
          identifier: "ValidationExceptionFields",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationId = string;
export type StatementId = string;
export type QIamAction = string;
export type QIamActions = string[];
export type PermissionConditionOperator = "StringEquals" | (string & {});
export type PermissionConditionKey = string;
export type PermissionConditionValue = string;
export type PermissionConditionValues = string[];
export interface PermissionCondition {
  conditionOperator: PermissionConditionOperator;
  conditionKey: string;
  conditionValues: string[];
}
export type PermissionConditions = PermissionCondition[];
export type PrincipalRoleArn = string;
export interface AssociatePermissionRequest {
  applicationId: string;
  statementId: string;
  actions: string[];
  conditions?: PermissionCondition[];
  principal: string;
}
export interface AssociatePermissionResponse {
  statement?: string;
}
export type IndexId = string;
export type DocumentId = string;
export interface DeleteDocument {
  documentId: string;
}
export type DeleteDocuments = DeleteDocument[];
export type ExecutionId = string;
export interface BatchDeleteDocumentRequest {
  applicationId: string;
  indexId: string;
  documents: DeleteDocument[];
  dataSourceSyncId?: string;
}
export type ErrorMessage = string;
export type ErrorCode =
  | "InternalError"
  | "InvalidRequest"
  | "ResourceInactive"
  | "ResourceNotFound"
  | (string & {});
export interface ErrorDetail {
  errorMessage?: string;
  errorCode?: ErrorCode;
}
export type DataSourceId = string;
export interface FailedDocument {
  id?: string;
  error?: ErrorDetail;
  dataSourceId?: string;
}
export type FailedDocuments = FailedDocument[];
export interface BatchDeleteDocumentResponse {
  failedDocuments?: FailedDocument[];
}
export type DocumentAttributeKey = string;
export type DocumentAttributeStringValue = string;
export type DocumentAttributeStringListValue = string[];
export type DocumentAttributeValue =
  | { stringValue: string; stringListValue?: never; longValue?: never; dateValue?: never }
  | { stringValue?: never; stringListValue: string[]; longValue?: never; dateValue?: never }
  | { stringValue?: never; stringListValue?: never; longValue: number; dateValue?: never }
  | { stringValue?: never; stringListValue?: never; longValue?: never; dateValue: Date };
export interface DocumentAttribute {
  name: string;
  value: DocumentAttributeValue;
}
export type DocumentAttributes = DocumentAttribute[];
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3 {
  bucket: string;
  key: string;
}
export type DocumentContent = { blob: Uint8Array; s3?: never } | { blob?: never; s3: S3 };
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
export type Title = string;
export type UserId = string;
export type ReadAccessType = "ALLOW" | "DENY" | (string & {});
export type MembershipType = "INDEX" | "DATASOURCE" | (string & {});
export interface PrincipalUser {
  id?: string;
  access: ReadAccessType;
  membershipType?: MembershipType;
}
export type GroupName = string;
export interface PrincipalGroup {
  name?: string;
  access: ReadAccessType;
  membershipType?: MembershipType;
}
export type Principal =
  | { user: PrincipalUser; group?: never }
  | { user?: never; group: PrincipalGroup };
export type Principals = Principal[];
export type MemberRelation = "AND" | "OR" | (string & {});
export interface AccessControl {
  principals: Principal[];
  memberRelation?: MemberRelation;
}
export type AccessControls = AccessControl[];
export interface AccessConfiguration {
  accessControls: AccessControl[];
  memberRelation?: MemberRelation;
}
export type DocumentEnrichmentConditionOperator =
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "EXISTS"
  | "NOT_EXISTS"
  | "BEGINS_WITH"
  | (string & {});
export interface DocumentAttributeCondition {
  key: string;
  operator: DocumentEnrichmentConditionOperator;
  value?: DocumentAttributeValue;
}
export type AttributeValueOperator = "DELETE" | (string & {});
export interface DocumentAttributeTarget {
  key: string;
  value?: DocumentAttributeValue;
  attributeValueOperator?: AttributeValueOperator;
}
export type DocumentContentOperator = "DELETE" | (string & {});
export interface InlineDocumentEnrichmentConfiguration {
  condition?: DocumentAttributeCondition;
  target?: DocumentAttributeTarget;
  documentContentOperator?: DocumentContentOperator;
}
export type InlineDocumentEnrichmentConfigurations = InlineDocumentEnrichmentConfiguration[];
export type LambdaArn = string;
export type RoleArn = string;
export interface HookConfiguration {
  invocationCondition?: DocumentAttributeCondition;
  lambdaArn?: string;
  s3BucketName?: string;
  roleArn?: string;
}
export interface DocumentEnrichmentConfiguration {
  inlineConfigurations?: InlineDocumentEnrichmentConfiguration[];
  preExtractionHookConfiguration?: HookConfiguration;
  postExtractionHookConfiguration?: HookConfiguration;
}
export type ImageExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface ImageExtractionConfiguration {
  imageExtractionStatus: ImageExtractionStatus;
}
export type AudioExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AudioExtractionConfiguration {
  audioExtractionStatus: AudioExtractionStatus;
}
export type VideoExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface VideoExtractionConfiguration {
  videoExtractionStatus: VideoExtractionStatus;
}
export interface MediaExtractionConfiguration {
  imageExtractionConfiguration?: ImageExtractionConfiguration;
  audioExtractionConfiguration?: AudioExtractionConfiguration;
  videoExtractionConfiguration?: VideoExtractionConfiguration;
}
export interface Document {
  id: string;
  attributes?: DocumentAttribute[];
  content?: DocumentContent;
  contentType?: ContentType;
  title?: string;
  accessConfiguration?: AccessConfiguration;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export type Documents = Document[];
export interface BatchPutDocumentRequest {
  applicationId: string;
  indexId: string;
  documents: Document[];
  roleArn?: string;
  dataSourceSyncId?: string;
}
export interface BatchPutDocumentResponse {
  failedDocuments?: FailedDocument[];
}
export type SubscriptionId = string;
export interface CancelSubscriptionRequest {
  applicationId: string;
  subscriptionId: string;
}
export type SubscriptionArn = string;
export type SubscriptionType = "Q_LITE" | "Q_BUSINESS" | (string & {});
export interface SubscriptionDetails {
  type?: SubscriptionType;
}
export interface CancelSubscriptionResponse {
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export type UserGroups = string[];
export type ConversationId = string;
export type MessageId = string;
export type ClientToken = string;
export type ChatMode = "RETRIEVAL_MODE" | "CREATOR_MODE" | "PLUGIN_MODE" | (string & {});
export type PluginId = string;
export interface PluginConfiguration {
  pluginId: string;
}
export type ChatModeConfiguration = { pluginConfiguration: PluginConfiguration };
export type AttributeFilters = AttributeFilter[];
export interface AttributeFilter {
  andAllFilters?: AttributeFilter[];
  orAllFilters?: AttributeFilter[];
  notFilter?: AttributeFilter;
  equalsTo?: DocumentAttribute;
  containsAll?: DocumentAttribute;
  containsAny?: DocumentAttribute;
  greaterThan?: DocumentAttribute;
  greaterThanOrEquals?: DocumentAttribute;
  lessThan?: DocumentAttribute;
  lessThanOrEquals?: DocumentAttribute;
}
export interface ConfigurationEvent {
  chatMode?: ChatMode;
  chatModeConfiguration?: ChatModeConfiguration;
  attributeFilter?: AttributeFilter;
}
export type UserMessage = string;
export interface TextInputEvent {
  userMessage: string;
}
export type AttachmentName = string;
export type AttachmentId = string;
export interface ConversationSource {
  conversationId: string;
  attachmentId: string;
}
export type CopyFromSource = { conversation: ConversationSource };
export interface AttachmentInput {
  data?: Uint8Array;
  name?: string;
  copyFrom?: CopyFromSource;
}
export interface AttachmentInputEvent {
  attachment?: AttachmentInput;
}
export type ActionPayloadFieldKey = string;
export type ActionPayloadFieldValue = unknown;
export interface ActionExecutionPayloadField {
  value: any;
}
export type ActionExecutionPayload = { [key: string]: ActionExecutionPayloadField | undefined };
export type ActionPayloadFieldNameSeparator = string;
export interface ActionExecutionEvent {
  pluginId: string;
  payload: { [key: string]: ActionExecutionPayloadField | undefined };
  payloadFieldNameSeparator: string;
}
export interface EndOfInputEvent {}
export type AuthResponseKey = string;
export type AuthResponseValue = string;
export type AuthorizationResponseMap = { [key: string]: string | undefined };
export interface AuthChallengeResponseEvent {
  responseMap: { [key: string]: string | undefined };
}
export type ChatInputStream =
  | {
      configurationEvent: ConfigurationEvent;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent: TextInputEvent;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent: AttachmentInputEvent;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent: ActionExecutionEvent;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent: EndOfInputEvent;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent: AuthChallengeResponseEvent;
    };
export interface ChatInput {
  applicationId: string;
  userId?: string;
  userGroups?: string[];
  conversationId?: string;
  parentMessageId?: string;
  clientToken?: string;
  inputStream?: stream.Stream<ChatInputStream, Error, never>;
}
export type SystemMessageType = "RESPONSE" | "GROUNDED_RESPONSE" | (string & {});
export interface TextOutputEvent {
  systemMessageType?: SystemMessageType;
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  systemMessage?: string;
}
export type SnippetExcerptText = string;
export interface SnippetExcerpt {
  text?: string;
}
export type SourceAttributionMediaId = string;
export type MediaId = string;
export interface ImageSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
}
export type AudioExtractionType = "TRANSCRIPT" | "SUMMARY" | (string & {});
export interface AudioSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
  startTimeMilliseconds?: number;
  endTimeMilliseconds?: number;
  audioExtractionType?: AudioExtractionType;
}
export type VideoExtractionType = "TRANSCRIPT" | "SUMMARY" | (string & {});
export interface VideoSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
  startTimeMilliseconds?: number;
  endTimeMilliseconds?: number;
  videoExtractionType?: VideoExtractionType;
}
export type SourceDetails =
  | {
      imageSourceDetails: ImageSourceDetails;
      audioSourceDetails?: never;
      videoSourceDetails?: never;
    }
  | {
      imageSourceDetails?: never;
      audioSourceDetails: AudioSourceDetails;
      videoSourceDetails?: never;
    }
  | {
      imageSourceDetails?: never;
      audioSourceDetails?: never;
      videoSourceDetails: VideoSourceDetails;
    };
export interface TextSegment {
  beginOffset?: number;
  endOffset?: number;
  snippetExcerpt?: SnippetExcerpt;
  mediaId?: string;
  mediaMimeType?: string;
  sourceDetails?: SourceDetails;
}
export type TextSegmentList = TextSegment[];
export interface SourceAttribution {
  title?: string;
  snippet?: string;
  url?: string;
  citationNumber?: number;
  updatedAt?: Date;
  textMessageSegments?: TextSegment[];
  documentId?: string;
  indexId?: string;
  datasourceId?: string;
}
export type SourceAttributions = SourceAttribution[];
export interface MetadataEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  sourceAttributions?: SourceAttribution[];
  finalTextMessage?: string;
}
export type PluginType =
  | "SERVICE_NOW"
  | "SALESFORCE"
  | "JIRA"
  | "ZENDESK"
  | "CUSTOM"
  | "QUICKSIGHT"
  | "SERVICENOW_NOW_PLATFORM"
  | "JIRA_CLOUD"
  | "SALESFORCE_CRM"
  | "ZENDESK_SUITE"
  | "ATLASSIAN_CONFLUENCE"
  | "GOOGLE_CALENDAR"
  | "MICROSOFT_TEAMS"
  | "MICROSOFT_EXCHANGE"
  | "PAGERDUTY_ADVANCE"
  | "SMARTSHEET"
  | "ASANA"
  | (string & {});
export type ActionPayloadFieldType = "STRING" | "NUMBER" | "ARRAY" | "BOOLEAN" | (string & {});
export interface ActionReviewPayloadFieldAllowedValue {
  value?: any;
  displayValue?: any;
}
export type ActionReviewPayloadFieldAllowedValues = ActionReviewPayloadFieldAllowedValue[];
export type ActionReviewPayloadFieldArrayItemJsonSchema = unknown;
export interface ActionReviewPayloadField {
  displayName?: string;
  displayOrder?: number;
  displayDescription?: string;
  type?: ActionPayloadFieldType;
  value?: any;
  allowedValues?: ActionReviewPayloadFieldAllowedValue[];
  allowedFormat?: string;
  arrayItemJsonSchema?: any;
  required?: boolean;
}
export type ActionReviewPayload = { [key: string]: ActionReviewPayloadField | undefined };
export interface ActionReviewEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  pluginId?: string;
  pluginType?: PluginType;
  payload?: { [key: string]: ActionReviewPayloadField | undefined };
  payloadFieldNameSeparator?: string;
}
export type AttachmentStatus = "FAILED" | "SUCCESS" | (string & {});
export interface AttachmentOutput {
  name?: string;
  status?: AttachmentStatus;
  error?: ErrorDetail;
  attachmentId?: string;
  conversationId?: string;
}
export interface FailedAttachmentEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  attachment?: AttachmentOutput;
}
export type Url = string;
export interface AuthChallengeRequestEvent {
  authorizationUrl: string;
}
export type ChatOutputStream =
  | {
      textEvent: TextOutputEvent;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent: MetadataEvent;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent: ActionReviewEvent;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent: FailedAttachmentEvent;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent: AuthChallengeRequestEvent;
    };
export interface ChatOutput {
  outputStream?: stream.Stream<ChatOutputStream, Error, never>;
}
export type AttachmentsInput = AttachmentInput[];
export interface ActionExecution {
  pluginId: string;
  payload: { [key: string]: ActionExecutionPayloadField | undefined };
  payloadFieldNameSeparator: string;
}
export interface AuthChallengeResponse {
  responseMap: { [key: string]: string | undefined };
}
export interface ChatSyncInput {
  applicationId: string;
  userId?: string;
  userGroups?: string[];
  userMessage?: string;
  attachments?: AttachmentInput[];
  actionExecution?: ActionExecution;
  authChallengeResponse?: AuthChallengeResponse;
  conversationId?: string;
  parentMessageId?: string;
  attributeFilter?: AttributeFilter;
  chatMode?: ChatMode;
  chatModeConfiguration?: ChatModeConfiguration;
  clientToken?: string;
}
export interface ActionReview {
  pluginId?: string;
  pluginType?: PluginType;
  payload?: { [key: string]: ActionReviewPayloadField | undefined };
  payloadFieldNameSeparator?: string;
}
export interface AuthChallengeRequest {
  authorizationUrl: string;
}
export type AttachmentsOutput = AttachmentOutput[];
export interface ChatSyncOutput {
  conversationId?: string;
  systemMessage?: string;
  systemMessageId?: string;
  userMessageId?: string;
  actionReview?: ActionReview;
  authChallengeRequest?: AuthChallengeRequest;
  sourceAttributions?: SourceAttribution[];
  failedAttachments?: AttachmentOutput[];
}
export interface CheckDocumentAccessRequest {
  applicationId: string;
  indexId: string;
  userId: string;
  documentId: string;
  dataSourceId?: string;
}
export interface AssociatedGroup {
  name?: string;
  type?: MembershipType;
}
export type AssociatedGroups = AssociatedGroup[];
export interface AssociatedUser {
  id?: string;
  type?: MembershipType;
}
export type AssociatedUsers = AssociatedUser[];
export interface DocumentAclUser {
  id?: string;
  type?: MembershipType;
}
export type DocumentAclUsers = DocumentAclUser[];
export interface DocumentAclGroup {
  name?: string;
  type?: MembershipType;
}
export type DocumentAclGroups = DocumentAclGroup[];
export interface DocumentAclCondition {
  memberRelation?: MemberRelation;
  users?: DocumentAclUser[];
  groups?: DocumentAclGroup[];
}
export type DocumentAclConditions = DocumentAclCondition[];
export interface DocumentAclMembership {
  memberRelation?: MemberRelation;
  conditions?: DocumentAclCondition[];
}
export interface DocumentAcl {
  allowlist?: DocumentAclMembership;
  denyList?: DocumentAclMembership;
}
export interface CheckDocumentAccessResponse {
  userGroups?: AssociatedGroup[];
  userAliases?: AssociatedUser[];
  hasAccess?: boolean;
  documentAcl?: DocumentAcl;
}
export type WebExperienceId = string;
export type SessionDurationInMinutes = number;
export interface CreateAnonymousWebExperienceUrlRequest {
  applicationId: string;
  webExperienceId: string;
  sessionDurationInMinutes?: number;
}
export interface CreateAnonymousWebExperienceUrlResponse {
  anonymousUrl?: string;
}
export type ApplicationName = string;
export type IdentityType =
  | "AWS_IAM_IDP_SAML"
  | "AWS_IAM_IDP_OIDC"
  | "AWS_IAM_IDC"
  | "AWS_QUICKSIGHT_IDP"
  | "ANONYMOUS"
  | (string & {});
export type IAMIdentityProviderArn = string;
export type InstanceArn = string;
export type ClientIdForOIDC = string;
export type ClientIdsForOIDC = string[];
export type Description = string;
export type KmsKeyId = string | redacted.Redacted<string>;
export interface EncryptionConfiguration {
  kmsKeyId?: string | redacted.Redacted<string>;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type Tags = Tag[];
export type AttachmentsControlMode = "ENABLED" | "DISABLED" | (string & {});
export interface AttachmentsConfiguration {
  attachmentsControlMode: AttachmentsControlMode;
}
export type QAppsControlMode = "ENABLED" | "DISABLED" | (string & {});
export interface QAppsConfiguration {
  qAppsControlMode: QAppsControlMode;
}
export type PersonalizationControlMode = "ENABLED" | "DISABLED" | (string & {});
export interface PersonalizationConfiguration {
  personalizationControlMode: PersonalizationControlMode;
}
export type ClientNamespace = string;
export interface QuickSightConfiguration {
  clientNamespace: string;
}
export interface CreateApplicationRequest {
  displayName: string;
  roleArn?: string;
  identityType?: IdentityType;
  iamIdentityProviderArn?: string;
  identityCenterInstanceArn?: string;
  clientIdsForOIDC?: string[];
  description?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
  clientToken?: string;
  attachmentsConfiguration?: AttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  quickSightConfiguration?: QuickSightConfiguration;
}
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationId?: string;
  applicationArn?: string;
}
export type DisplayName = string;
export type ResponseConfigurationType = "ALL" | (string & {});
export type Instruction = string;
export interface InstructionCollection {
  responseLength?: string;
  targetAudience?: string;
  perspective?: string;
  outputStyle?: string;
  identity?: string;
  tone?: string;
  customInstructions?: string;
  examples?: string;
}
export interface ResponseConfiguration {
  instructionCollection?: InstructionCollection;
}
export type ResponseConfigurations = { [key in ResponseConfigurationType]?: ResponseConfiguration };
export interface CreateChatResponseConfigurationRequest {
  applicationId: string;
  displayName: string;
  clientToken?: string;
  responseConfigurations: { [key: string]: ResponseConfiguration | undefined };
  tags?: Tag[];
}
export type ChatResponseConfigurationId = string;
export type ChatResponseConfigurationArn = string;
export interface CreateChatResponseConfigurationResponse {
  chatResponseConfigurationId: string;
  chatResponseConfigurationArn: string;
}
export interface ActionFilterConfiguration {
  documentAttributeFilter: AttributeFilter;
}
export interface ActionConfiguration {
  action: string;
  filterConfiguration?: ActionFilterConfiguration;
}
export type ActionConfigurationList = ActionConfiguration[];
export type DataAccessorName = string | redacted.Redacted<string>;
export type DataAccessorAuthenticationType =
  | "AWS_IAM_IDC_TTI"
  | "AWS_IAM_IDC_AUTH_CODE"
  | (string & {});
export type IdcTrustedTokenIssuerArn = string;
export interface DataAccessorIdcTrustedTokenIssuerConfiguration {
  idcTrustedTokenIssuerArn: string;
}
export type DataAccessorAuthenticationConfiguration = {
  idcTrustedTokenIssuerConfiguration: DataAccessorIdcTrustedTokenIssuerConfiguration;
};
export type DataAccessorExternalId = string;
export type DataAccessorExternalIds = string[];
export interface DataAccessorAuthenticationDetail {
  authenticationType: DataAccessorAuthenticationType;
  authenticationConfiguration?: DataAccessorAuthenticationConfiguration;
  externalIds?: string[];
}
export interface CreateDataAccessorRequest {
  applicationId: string;
  principal: string;
  actionConfigurations: ActionConfiguration[];
  clientToken?: string;
  displayName: string | redacted.Redacted<string>;
  authenticationDetail?: DataAccessorAuthenticationDetail;
  tags?: Tag[];
}
export type DataAccessorId = string;
export type IdcApplicationArn = string;
export type DataAccessorArn = string;
export interface CreateDataAccessorResponse {
  dataAccessorId: string;
  idcApplicationArn: string;
  dataAccessorArn: string;
}
export type DataSourceName = string;
export type DataSourceConfiguration = unknown;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface DataSourceVpcConfiguration {
  subnetIds: string[];
  securityGroupIds: string[];
}
export type SyncSchedule = string;
export interface CreateDataSourceRequest {
  applicationId: string;
  indexId: string;
  displayName: string;
  configuration: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  description?: string;
  tags?: Tag[];
  syncSchedule?: string;
  roleArn?: string;
  clientToken?: string;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export type DataSourceArn = string;
export interface CreateDataSourceResponse {
  dataSourceId?: string;
  dataSourceArn?: string;
}
export type IndexName = string;
export type IndexType = "ENTERPRISE" | "STARTER" | (string & {});
export type IndexCapacityInteger = number;
export interface IndexCapacityConfiguration {
  units?: number;
}
export interface CreateIndexRequest {
  applicationId: string;
  displayName: string;
  description?: string;
  type?: IndexType;
  tags?: Tag[];
  capacityConfiguration?: IndexCapacityConfiguration;
  clientToken?: string;
}
export type IndexArn = string;
export interface CreateIndexResponse {
  indexId?: string;
  indexArn?: string;
}
export type PluginName = string;
export type SecretArn = string;
export interface BasicAuthConfiguration {
  secretArn: string;
  roleArn: string;
}
export interface OAuth2ClientCredentialConfiguration {
  secretArn: string;
  roleArn: string;
  authorizationUrl?: string;
  tokenUrl?: string;
}
export interface NoAuthConfiguration {}
export interface IdcAuthConfiguration {
  idcApplicationArn: string;
  roleArn: string;
}
export type PluginAuthConfiguration =
  | {
      basicAuthConfiguration: BasicAuthConfiguration;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration?: never;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration: OAuth2ClientCredentialConfiguration;
      noAuthConfiguration?: never;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration: NoAuthConfiguration;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration?: never;
      idcAuthConfiguration: IdcAuthConfiguration;
    };
export type PluginDescription = string;
export type APISchemaType = "OPEN_API_V3" | (string & {});
export type Payload = string | redacted.Redacted<string>;
export type APISchema =
  | { payload: string | redacted.Redacted<string>; s3?: never }
  | { payload?: never; s3: S3 };
export interface CustomPluginConfiguration {
  description: string;
  apiSchemaType: APISchemaType;
  apiSchema?: APISchema;
}
export interface CreatePluginRequest {
  applicationId: string;
  displayName: string;
  type: PluginType;
  authConfiguration: PluginAuthConfiguration;
  serverUrl?: string;
  customPluginConfiguration?: CustomPluginConfiguration;
  tags?: Tag[];
  clientToken?: string;
}
export type PluginArn = string;
export type PluginBuildStatus =
  | "READY"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export interface CreatePluginResponse {
  pluginId?: string;
  pluginArn?: string;
  buildStatus?: PluginBuildStatus;
}
export type RetrieverType = "NATIVE_INDEX" | "KENDRA_INDEX" | (string & {});
export type RetrieverName = string;
export type DocumentAttributeBoostingLevel =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH"
  | "ONE"
  | "TWO"
  | (string & {});
export type NumberAttributeBoostingType =
  | "PRIORITIZE_LARGER_VALUES"
  | "PRIORITIZE_SMALLER_VALUES"
  | (string & {});
export interface NumberAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  boostingType?: NumberAttributeBoostingType;
}
export type StringAttributeValueBoostingLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH"
  | "ONE"
  | "TWO"
  | "THREE"
  | "FOUR"
  | "FIVE"
  | (string & {});
export type StringAttributeValueBoosting = {
  [key: string]: StringAttributeValueBoostingLevel | undefined;
};
export interface StringAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  attributeValueBoosting?: { [key: string]: StringAttributeValueBoostingLevel | undefined };
}
export type BoostingDurationInSeconds = number;
export interface DateAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  boostingDurationInSeconds?: number;
}
export interface StringListAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
}
export type DocumentAttributeBoostingConfiguration =
  | {
      numberConfiguration: NumberAttributeBoostingConfiguration;
      stringConfiguration?: never;
      dateConfiguration?: never;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration: StringAttributeBoostingConfiguration;
      dateConfiguration?: never;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration?: never;
      dateConfiguration: DateAttributeBoostingConfiguration;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration?: never;
      dateConfiguration?: never;
      stringListConfiguration: StringListAttributeBoostingConfiguration;
    };
export type DocumentAttributeBoostingOverrideMap = {
  [key: string]: DocumentAttributeBoostingConfiguration | undefined;
};
export interface NativeIndexConfiguration {
  indexId: string;
  version?: number;
  boostingOverride?: { [key: string]: DocumentAttributeBoostingConfiguration | undefined };
}
export type KendraIndexId = string;
export interface KendraIndexConfiguration {
  indexId: string;
}
export type RetrieverConfiguration =
  | { nativeIndexConfiguration: NativeIndexConfiguration; kendraIndexConfiguration?: never }
  | { nativeIndexConfiguration?: never; kendraIndexConfiguration: KendraIndexConfiguration };
export interface CreateRetrieverRequest {
  applicationId: string;
  type: RetrieverType;
  displayName: string;
  configuration: RetrieverConfiguration;
  roleArn?: string;
  clientToken?: string;
  tags?: Tag[];
}
export type RetrieverId = string;
export type RetrieverArn = string;
export interface CreateRetrieverResponse {
  retrieverId?: string;
  retrieverArn?: string;
}
export type UserIdentifier = string;
export type GroupIdentifier = string;
export type SubscriptionPrincipal =
  | { user: string; group?: never }
  | { user?: never; group: string };
export interface CreateSubscriptionRequest {
  applicationId: string;
  principal: SubscriptionPrincipal;
  type: SubscriptionType;
  clientToken?: string;
}
export interface CreateSubscriptionResponse {
  subscriptionId?: string;
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export interface UserAlias {
  indexId?: string;
  dataSourceId?: string;
  userId: string;
}
export type UserAliases = UserAlias[];
export interface CreateUserRequest {
  applicationId: string;
  userId: string;
  userAliases?: UserAlias[];
  clientToken?: string;
}
export interface CreateUserResponse {}
export type WebExperienceTitle = string;
export type WebExperienceSubtitle = string;
export type WebExperienceWelcomeMessage = string;
export type WebExperienceSamplePromptsControlMode = "ENABLED" | "DISABLED" | (string & {});
export type Origin = string;
export type WebExperienceOrigins = string[];
export type SamlAuthenticationUrl = string;
export interface SamlProviderConfiguration {
  authenticationUrl: string;
}
export interface OpenIDConnectProviderConfiguration {
  secretsArn: string;
  secretsRole: string;
}
export type IdentityProviderConfiguration =
  | { samlConfiguration: SamlProviderConfiguration; openIDConnectConfiguration?: never }
  | { samlConfiguration?: never; openIDConnectConfiguration: OpenIDConnectProviderConfiguration };
export type BrowserExtension = string;
export type BrowserExtensionList = string[];
export interface BrowserExtensionConfiguration {
  enabledBrowserExtensions: string[];
}
export type CustomCSSUrl = string;
export type LogoUrl = string;
export type FontUrl = string;
export type FaviconUrl = string;
export interface CustomizationConfiguration {
  customCSSUrl?: string;
  logoUrl?: string;
  fontUrl?: string;
  faviconUrl?: string;
}
export interface CreateWebExperienceRequest {
  applicationId: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  origins?: string[];
  roleArn?: string;
  tags?: Tag[];
  clientToken?: string;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export type WebExperienceArn = string;
export interface CreateWebExperienceResponse {
  webExperienceId?: string;
  webExperienceArn?: string;
}
export interface DeleteApplicationRequest {
  applicationId: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteAttachmentRequest {
  applicationId: string;
  conversationId: string;
  attachmentId: string;
  userId?: string;
}
export interface DeleteAttachmentResponse {}
export interface DeleteChatControlsConfigurationRequest {
  applicationId: string;
}
export interface DeleteChatControlsConfigurationResponse {}
export interface DeleteChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
}
export interface DeleteChatResponseConfigurationResponse {}
export interface DeleteConversationRequest {
  conversationId: string;
  applicationId: string;
  userId?: string;
}
export interface DeleteConversationResponse {}
export interface DeleteDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
}
export interface DeleteDataAccessorResponse {}
export interface DeleteDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
}
export interface DeleteDataSourceResponse {}
export interface DeleteGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
}
export interface DeleteGroupResponse {}
export interface DeleteIndexRequest {
  applicationId: string;
  indexId: string;
}
export interface DeleteIndexResponse {}
export interface DeletePluginRequest {
  applicationId: string;
  pluginId: string;
}
export interface DeletePluginResponse {}
export interface DeleteRetrieverRequest {
  applicationId: string;
  retrieverId: string;
}
export interface DeleteRetrieverResponse {}
export interface DeleteUserRequest {
  applicationId: string;
  userId: string;
}
export interface DeleteUserResponse {}
export interface DeleteWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
}
export interface DeleteWebExperienceResponse {}
export interface DisassociatePermissionRequest {
  applicationId: string;
  statementId: string;
}
export interface DisassociatePermissionResponse {}
export interface GetApplicationRequest {
  applicationId: string;
}
export type ApplicationStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export interface AppliedAttachmentsConfiguration {
  attachmentsControlMode?: AttachmentsControlMode;
}
export type AutoSubscriptionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AutoSubscriptionConfiguration {
  autoSubscribe?: AutoSubscriptionStatus;
  defaultSubscriptionType?: SubscriptionType;
}
export interface GetApplicationResponse {
  displayName?: string;
  applicationId?: string;
  applicationArn?: string;
  identityType?: IdentityType;
  iamIdentityProviderArn?: string;
  identityCenterApplicationArn?: string;
  roleArn?: string;
  status?: ApplicationStatus;
  description?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
  error?: ErrorDetail;
  attachmentsConfiguration?: AppliedAttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  autoSubscriptionConfiguration?: AutoSubscriptionConfiguration;
  clientIdsForOIDC?: string[];
  quickSightConfiguration?: QuickSightConfiguration;
}
export type MaxResultsIntegerForGetTopicConfigurations = number;
export type NextToken = string;
export interface GetChatControlsConfigurationRequest {
  applicationId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ResponseScope =
  | "ENTERPRISE_CONTENT_ONLY"
  | "EXTENDED_KNOWLEDGE_ENABLED"
  | (string & {});
export type OrchestrationControl = "ENABLED" | "DISABLED" | (string & {});
export interface AppliedOrchestrationConfiguration {
  control: OrchestrationControl;
}
export type BlockedPhrase = string;
export type BlockedPhrases = string[];
export type SystemMessageOverride = string;
export interface BlockedPhrasesConfiguration {
  blockedPhrases?: string[];
  systemMessageOverride?: string;
}
export type TopicConfigurationName = string;
export type TopicDescription = string;
export type ExampleChatMessage = string;
export type ExampleChatMessages = string[];
export type UserIds = string[];
export interface UsersAndGroups {
  userIds?: string[];
  userGroups?: string[];
}
export type RuleType = "CONTENT_BLOCKER_RULE" | "CONTENT_RETRIEVAL_RULE" | (string & {});
export interface ContentBlockerRule {
  systemMessageOverride?: string;
}
export interface EligibleDataSource {
  indexId?: string;
  dataSourceId?: string;
}
export type EligibleDataSources = EligibleDataSource[];
export interface ContentRetrievalRule {
  eligibleDataSources?: EligibleDataSource[];
}
export type RuleConfiguration =
  | { contentBlockerRule: ContentBlockerRule; contentRetrievalRule?: never }
  | { contentBlockerRule?: never; contentRetrievalRule: ContentRetrievalRule };
export interface Rule {
  includedUsersAndGroups?: UsersAndGroups;
  excludedUsersAndGroups?: UsersAndGroups;
  ruleType: RuleType;
  ruleConfiguration?: RuleConfiguration;
}
export type Rules = Rule[];
export interface TopicConfiguration {
  name: string;
  description?: string;
  exampleChatMessages?: string[];
  rules: Rule[];
}
export type TopicConfigurations = TopicConfiguration[];
export type CreatorModeControl = "ENABLED" | "DISABLED" | (string & {});
export interface AppliedCreatorModeConfiguration {
  creatorModeControl: CreatorModeControl;
}
export type HallucinationReductionControl = "ENABLED" | "DISABLED" | (string & {});
export interface HallucinationReductionConfiguration {
  hallucinationReductionControl?: HallucinationReductionControl;
}
export interface GetChatControlsConfigurationResponse {
  responseScope?: ResponseScope;
  orchestrationConfiguration?: AppliedOrchestrationConfiguration;
  blockedPhrases?: BlockedPhrasesConfiguration;
  topicConfigurations?: TopicConfiguration[];
  creatorModeConfiguration?: AppliedCreatorModeConfiguration;
  nextToken?: string;
  hallucinationReductionConfiguration?: HallucinationReductionConfiguration;
}
export interface GetChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
}
export type ChatResponseConfigurationStatus =
  | "CREATING"
  | "UPDATING"
  | "FAILED"
  | "ACTIVE"
  | (string & {});
export interface ChatResponseConfigurationDetail {
  responseConfigurations?: { [key: string]: ResponseConfiguration | undefined };
  responseConfigurationSummary?: string;
  status?: ChatResponseConfigurationStatus;
  error?: ErrorDetail;
  updatedAt?: Date;
}
export interface GetChatResponseConfigurationResponse {
  chatResponseConfigurationId?: string;
  chatResponseConfigurationArn?: string;
  displayName?: string;
  createdAt?: Date;
  inUseConfiguration?: ChatResponseConfigurationDetail;
  lastUpdateConfiguration?: ChatResponseConfigurationDetail;
}
export interface GetDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
}
export interface GetDataAccessorResponse {
  displayName?: string | redacted.Redacted<string>;
  dataAccessorId?: string;
  dataAccessorArn?: string;
  applicationId?: string;
  idcApplicationArn?: string;
  principal?: string;
  actionConfigurations?: ActionConfiguration[];
  authenticationDetail?: DataAccessorAuthenticationDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
}
export type DataSourceStatus =
  | "PENDING_CREATION"
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export interface GetDataSourceResponse {
  applicationId?: string;
  indexId?: string;
  dataSourceId?: string;
  dataSourceArn?: string;
  displayName?: string;
  type?: string;
  configuration?: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  status?: DataSourceStatus;
  syncSchedule?: string;
  roleArn?: string;
  error?: ErrorDetail;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export type OutputFormat = "RAW" | "EXTRACTED" | (string & {});
export interface GetDocumentContentRequest {
  applicationId: string;
  indexId: string;
  dataSourceId?: string;
  documentId: string;
  outputFormat?: OutputFormat;
}
export interface GetDocumentContentResponse {
  presignedUrl: string;
  mimeType: string;
}
export interface GetGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
}
export type GroupStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "PROCESSING"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface GroupStatusDetail {
  status?: GroupStatus;
  lastUpdatedAt?: Date;
  errorDetail?: ErrorDetail;
}
export type GroupStatusDetails = GroupStatusDetail[];
export interface GetGroupResponse {
  status?: GroupStatusDetail;
  statusHistory?: GroupStatusDetail[];
}
export interface GetIndexRequest {
  applicationId: string;
  indexId: string;
}
export type IndexStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export type DocumentMetadataConfigurationName = string;
export type AttributeType = "STRING" | "STRING_LIST" | "NUMBER" | "DATE" | (string & {});
export type Status = "ENABLED" | "DISABLED" | (string & {});
export interface DocumentAttributeConfiguration {
  name?: string;
  type?: AttributeType;
  search?: Status;
}
export type DocumentAttributeConfigurations = DocumentAttributeConfiguration[];
export type IndexedTextBytes = number;
export type IndexedTextDocument = number;
export interface TextDocumentStatistics {
  indexedTextBytes?: number;
  indexedTextDocumentCount?: number;
}
export interface IndexStatistics {
  textDocumentStatistics?: TextDocumentStatistics;
}
export interface GetIndexResponse {
  applicationId?: string;
  indexId?: string;
  displayName?: string;
  indexArn?: string;
  status?: IndexStatus;
  type?: IndexType;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  capacityConfiguration?: IndexCapacityConfiguration;
  documentAttributeConfigurations?: DocumentAttributeConfiguration[];
  error?: ErrorDetail;
  indexStatistics?: IndexStatistics;
}
export interface GetMediaRequest {
  applicationId: string;
  conversationId: string;
  messageId: string;
  mediaId: string;
}
export interface GetMediaResponse {
  mediaBytes?: Uint8Array;
  mediaMimeType?: string;
}
export interface GetPluginRequest {
  applicationId: string;
  pluginId: string;
}
export type PluginState = "ENABLED" | "DISABLED" | (string & {});
export interface GetPluginResponse {
  applicationId?: string;
  pluginId?: string;
  displayName?: string;
  type?: PluginType;
  serverUrl?: string;
  authConfiguration?: PluginAuthConfiguration;
  customPluginConfiguration?: CustomPluginConfiguration;
  buildStatus?: PluginBuildStatus;
  pluginArn?: string;
  state?: PluginState;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetPolicyRequest {
  applicationId: string;
}
export interface GetPolicyResponse {
  policy?: string;
}
export interface GetRetrieverRequest {
  applicationId: string;
  retrieverId: string;
}
export type RetrieverStatus = "CREATING" | "ACTIVE" | "FAILED" | (string & {});
export interface GetRetrieverResponse {
  applicationId?: string;
  retrieverId?: string;
  retrieverArn?: string;
  type?: RetrieverType;
  status?: RetrieverStatus;
  displayName?: string;
  configuration?: RetrieverConfiguration;
  roleArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetUserRequest {
  applicationId: string;
  userId: string;
}
export interface GetUserResponse {
  userAliases?: UserAlias[];
}
export interface GetWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
}
export type WebExperienceStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "PENDING_AUTH_CONFIG"
  | (string & {});
export type SamlMetadataXML = string;
export type SamlAttribute = string;
export interface SamlConfiguration {
  metadataXML: string;
  roleArn: string;
  userIdAttribute: string;
  userGroupAttribute?: string;
}
export type WebExperienceAuthConfiguration = { samlConfiguration: SamlConfiguration };
export interface GetWebExperienceResponse {
  applicationId?: string;
  webExperienceId?: string;
  webExperienceArn?: string;
  defaultEndpoint?: string;
  status?: WebExperienceStatus;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  origins?: string[];
  roleArn?: string;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  authenticationConfiguration?: WebExperienceAuthConfiguration;
  error?: ErrorDetail;
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export type MaxResultsIntegerForListApplications = number;
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface Application {
  displayName?: string;
  applicationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: ApplicationStatus;
  identityType?: IdentityType;
  quickSightConfiguration?: QuickSightConfiguration;
}
export type Applications = Application[];
export interface ListApplicationsResponse {
  nextToken?: string;
  applications?: Application[];
}
export type MaxResultsIntegerForListAttachments = number;
export interface ListAttachmentsRequest {
  applicationId: string;
  conversationId?: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Attachment {
  attachmentId?: string;
  conversationId?: string;
  name?: string;
  copyFrom?: CopyFromSource;
  fileType?: string;
  fileSize?: number;
  md5chksum?: string;
  createdAt?: Date;
  status?: AttachmentStatus;
  error?: ErrorDetail;
}
export type AttachmentList = Attachment[];
export interface ListAttachmentsResponse {
  attachments?: Attachment[];
  nextToken?: string;
}
export interface ListChatResponseConfigurationsRequest {
  applicationId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ResponseConfigurationSummary = string;
export interface ChatResponseConfiguration {
  chatResponseConfigurationId: string;
  chatResponseConfigurationArn: string;
  displayName: string;
  responseConfigurationSummary?: string;
  status: ChatResponseConfigurationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ChatResponseConfigurations = ChatResponseConfiguration[];
export interface ListChatResponseConfigurationsResponse {
  chatResponseConfigurations?: ChatResponseConfiguration[];
  nextToken?: string;
}
export type MaxResultsIntegerForListConversations = number;
export interface ListConversationsRequest {
  applicationId: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ConversationTitle = string;
export interface Conversation {
  conversationId?: string;
  title?: string;
  startTime?: Date;
}
export type Conversations = Conversation[];
export interface ListConversationsResponse {
  nextToken?: string;
  conversations?: Conversation[];
}
export type NextToken1500 = string;
export type MaxResultsIntegerForListDataAccessors = number;
export interface ListDataAccessorsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DataAccessor {
  displayName?: string | redacted.Redacted<string>;
  dataAccessorId?: string;
  dataAccessorArn?: string;
  idcApplicationArn?: string;
  principal?: string;
  authenticationDetail?: DataAccessorAuthenticationDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export type DataAccessors = DataAccessor[];
export interface ListDataAccessorsResponse {
  dataAccessors?: DataAccessor[];
  nextToken?: string;
}
export type MaxResultsIntegerForListDataSources = number;
export interface ListDataSourcesRequest {
  applicationId: string;
  indexId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DataSource {
  displayName?: string;
  dataSourceId?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: DataSourceStatus;
}
export type DataSources = DataSource[];
export interface ListDataSourcesResponse {
  dataSources?: DataSource[];
  nextToken?: string;
}
export type MaxResultsIntegerForListDataSourcesSyncJobs = number;
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
  dataSourceId: string;
  applicationId: string;
  indexId: string;
  nextToken?: string;
  maxResults?: number;
  startTime?: Date;
  endTime?: Date;
  statusFilter?: DataSourceSyncJobStatus;
}
export type MetricValue = string;
export interface DataSourceSyncJobMetrics {
  documentsAdded?: string;
  documentsModified?: string;
  documentsDeleted?: string;
  documentsFailed?: string;
  documentsScanned?: string;
}
export interface DataSourceSyncJob {
  executionId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: DataSourceSyncJobStatus;
  error?: ErrorDetail;
  dataSourceErrorCode?: string;
  metrics?: DataSourceSyncJobMetrics;
}
export type DataSourceSyncJobs = DataSourceSyncJob[];
export interface ListDataSourceSyncJobsResponse {
  history?: DataSourceSyncJob[];
  nextToken?: string;
}
export type DataSourceIds = string[];
export type MaxResultsIntegerForListDocuments = number;
export interface ListDocumentsRequest {
  applicationId: string;
  indexId: string;
  dataSourceIds?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type DocumentStatus =
  | "RECEIVED"
  | "PROCESSING"
  | "INDEXED"
  | "UPDATED"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | "DOCUMENT_FAILED_TO_INDEX"
  | (string & {});
export interface DocumentDetails {
  documentId?: string;
  status?: DocumentStatus;
  error?: ErrorDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export type DocumentDetailList = DocumentDetails[];
export interface ListDocumentsResponse {
  documentDetailList?: DocumentDetails[];
  nextToken?: string;
}
export type MaxResultsIntegerForListGroupsRequest = number;
export interface ListGroupsRequest {
  applicationId: string;
  indexId: string;
  updatedEarlierThan: Date;
  dataSourceId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GroupSummary {
  groupName?: string;
}
export type GroupSummaryList = GroupSummary[];
export interface ListGroupsResponse {
  nextToken?: string;
  items?: GroupSummary[];
}
export type MaxResultsIntegerForListIndices = number;
export interface ListIndicesRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Index {
  displayName?: string;
  indexId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: IndexStatus;
}
export type Indices = Index[];
export interface ListIndicesResponse {
  nextToken?: string;
  indices?: Index[];
}
export type MaxResultsIntegerForListMessages = number;
export interface ListMessagesRequest {
  conversationId: string;
  applicationId: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type MessageBody = string;
export type MessageType = "USER" | "SYSTEM" | (string & {});
export interface Message {
  messageId?: string;
  body?: string;
  time?: Date;
  type?: MessageType;
  attachments?: AttachmentOutput[];
  sourceAttribution?: SourceAttribution[];
  actionReview?: ActionReview;
  actionExecution?: ActionExecution;
}
export type Messages = Message[];
export interface ListMessagesResponse {
  messages?: Message[];
  nextToken?: string;
}
export type MaxResultsIntegerForListPluginActions = number;
export interface ListPluginActionsRequest {
  applicationId: string;
  pluginId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ActionSummary {
  actionIdentifier?: string;
  displayName?: string;
  instructionExample?: string;
  description?: string;
}
export type Actions = ActionSummary[];
export interface ListPluginActionsResponse {
  nextToken?: string;
  items?: ActionSummary[];
}
export type MaxResultsIntegerForListPlugins = number;
export interface ListPluginsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Plugin {
  pluginId?: string;
  displayName?: string;
  type?: PluginType;
  serverUrl?: string;
  state?: PluginState;
  buildStatus?: PluginBuildStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type Plugins = Plugin[];
export interface ListPluginsResponse {
  nextToken?: string;
  plugins?: Plugin[];
}
export type MaxResultsIntegerForListPluginTypeActions = number;
export interface ListPluginTypeActionsRequest {
  pluginType: PluginType;
  nextToken?: string;
  maxResults?: number;
}
export interface ListPluginTypeActionsResponse {
  nextToken?: string;
  items?: ActionSummary[];
}
export type MaxResultsIntegerForListPluginTypeMetadata = number;
export interface ListPluginTypeMetadataRequest {
  nextToken?: string;
  maxResults?: number;
}
export type PluginTypeCategory =
  | "Customer relationship management (CRM)"
  | "Project management"
  | "Communication"
  | "Productivity"
  | "Ticketing and incident management"
  | (string & {});
export interface PluginTypeMetadataSummary {
  type?: PluginType;
  category?: PluginTypeCategory;
  description?: string;
}
export type ListPluginTypeMetadataSummaries = PluginTypeMetadataSummary[];
export interface ListPluginTypeMetadataResponse {
  nextToken?: string;
  items?: PluginTypeMetadataSummary[];
}
export type MaxResultsIntegerForListRetrieversRequest = number;
export interface ListRetrieversRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Retriever {
  applicationId?: string;
  retrieverId?: string;
  type?: RetrieverType;
  status?: RetrieverStatus;
  displayName?: string;
}
export type Retrievers = Retriever[];
export interface ListRetrieversResponse {
  retrievers?: Retriever[];
  nextToken?: string;
}
export type MaxResultsIntegerForListSubscriptions = number;
export interface ListSubscriptionsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Subscription {
  subscriptionId?: string;
  subscriptionArn?: string;
  principal?: SubscriptionPrincipal;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export type Subscriptions = Subscription[];
export interface ListSubscriptionsResponse {
  nextToken?: string;
  subscriptions?: Subscription[];
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type MaxResultsIntegerForListWebExperiencesRequest = number;
export interface ListWebExperiencesRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface WebExperience {
  webExperienceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  defaultEndpoint?: string;
  status?: WebExperienceStatus;
}
export type WebExperiences = WebExperience[];
export interface ListWebExperiencesResponse {
  webExperiences?: WebExperience[];
  nextToken?: string;
}
export type SystemMessageId = string;
export type MessageUsefulness = "USEFUL" | "NOT_USEFUL" | (string & {});
export type MessageUsefulnessReason =
  | "NOT_FACTUALLY_CORRECT"
  | "HARMFUL_OR_UNSAFE"
  | "INCORRECT_OR_MISSING_SOURCES"
  | "NOT_HELPFUL"
  | "FACTUALLY_CORRECT"
  | "COMPLETE"
  | "RELEVANT_SOURCES"
  | "HELPFUL"
  | "NOT_BASED_ON_DOCUMENTS"
  | "NOT_COMPLETE"
  | "NOT_CONCISE"
  | "OTHER"
  | (string & {});
export type MessageUsefulnessComment = string;
export interface MessageUsefulnessFeedback {
  usefulness: MessageUsefulness;
  reason?: MessageUsefulnessReason;
  comment?: string;
  submittedAt: Date;
}
export interface PutFeedbackRequest {
  applicationId: string;
  userId?: string;
  conversationId: string;
  messageId: string;
  messageCopiedAt?: Date;
  messageUsefulness?: MessageUsefulnessFeedback;
}
export interface PutFeedbackResponse {}
export interface MemberGroup {
  groupName: string;
  type?: MembershipType;
}
export type MemberGroups = MemberGroup[];
export type DataSourceUserId = string;
export interface MemberUser {
  userId: string;
  type?: MembershipType;
}
export type MemberUsers = MemberUser[];
export interface GroupMembers {
  memberGroups?: MemberGroup[];
  memberUsers?: MemberUser[];
  s3PathForGroupMembers?: S3;
}
export interface PutGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
  type: MembershipType;
  groupMembers: GroupMembers;
  roleArn?: string;
}
export interface PutGroupResponse {}
export type QueryText = string;
export interface RetrieverContentSource {
  retrieverId: string;
}
export type ContentSource = { retriever: RetrieverContentSource };
export type MaxResults = number;
export interface SearchRelevantContentRequest {
  applicationId: string;
  queryText: string;
  contentSource: ContentSource;
  attributeFilter?: AttributeFilter;
  maxResults?: number;
  nextToken?: string;
}
export type ScoreConfidence =
  | "VERY_HIGH"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NOT_AVAILABLE"
  | (string & {});
export interface ScoreAttributes {
  scoreConfidence?: ScoreConfidence;
}
export interface RelevantContent {
  content?: string;
  documentId?: string;
  documentTitle?: string;
  documentUri?: string;
  documentAttributes?: DocumentAttribute[];
  scoreAttributes?: ScoreAttributes;
}
export type RelevantContentList = RelevantContent[];
export interface SearchRelevantContentResponse {
  relevantContent?: RelevantContent[];
  nextToken?: string;
}
export interface StartDataSourceSyncJobRequest {
  dataSourceId: string;
  applicationId: string;
  indexId: string;
}
export interface StartDataSourceSyncJobResponse {
  executionId?: string;
}
export interface StopDataSourceSyncJobRequest {
  dataSourceId: string;
  applicationId: string;
  indexId: string;
}
export interface StopDataSourceSyncJobResponse {}
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationRequest {
  applicationId: string;
  identityCenterInstanceArn?: string;
  displayName?: string;
  description?: string;
  roleArn?: string;
  attachmentsConfiguration?: AttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  autoSubscriptionConfiguration?: AutoSubscriptionConfiguration;
}
export interface UpdateApplicationResponse {}
export interface OrchestrationConfiguration {
  control: OrchestrationControl;
}
export interface BlockedPhrasesConfigurationUpdate {
  blockedPhrasesToCreateOrUpdate?: string[];
  blockedPhrasesToDelete?: string[];
  systemMessageOverride?: string;
}
export interface CreatorModeConfiguration {
  creatorModeControl: CreatorModeControl;
}
export interface UpdateChatControlsConfigurationRequest {
  applicationId: string;
  clientToken?: string;
  responseScope?: ResponseScope;
  orchestrationConfiguration?: OrchestrationConfiguration;
  blockedPhrasesConfigurationUpdate?: BlockedPhrasesConfigurationUpdate;
  topicConfigurationsToCreateOrUpdate?: TopicConfiguration[];
  topicConfigurationsToDelete?: TopicConfiguration[];
  creatorModeConfiguration?: CreatorModeConfiguration;
  hallucinationReductionConfiguration?: HallucinationReductionConfiguration;
}
export interface UpdateChatControlsConfigurationResponse {}
export interface UpdateChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
  displayName?: string;
  responseConfigurations: { [key: string]: ResponseConfiguration | undefined };
  clientToken?: string;
}
export interface UpdateChatResponseConfigurationResponse {}
export interface UpdateDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
  actionConfigurations: ActionConfiguration[];
  authenticationDetail?: DataAccessorAuthenticationDetail;
  displayName?: string | redacted.Redacted<string>;
}
export interface UpdateDataAccessorResponse {}
export interface UpdateDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
  displayName?: string;
  configuration?: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  description?: string;
  syncSchedule?: string;
  roleArn?: string;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export interface UpdateDataSourceResponse {}
export interface UpdateIndexRequest {
  applicationId: string;
  indexId: string;
  displayName?: string;
  description?: string;
  capacityConfiguration?: IndexCapacityConfiguration;
  documentAttributeConfigurations?: DocumentAttributeConfiguration[];
}
export interface UpdateIndexResponse {}
export interface UpdatePluginRequest {
  applicationId: string;
  pluginId: string;
  displayName?: string;
  state?: PluginState;
  serverUrl?: string;
  customPluginConfiguration?: CustomPluginConfiguration;
  authConfiguration?: PluginAuthConfiguration;
}
export interface UpdatePluginResponse {}
export interface UpdateRetrieverRequest {
  applicationId: string;
  retrieverId: string;
  configuration?: RetrieverConfiguration;
  displayName?: string;
  roleArn?: string;
}
export interface UpdateRetrieverResponse {}
export interface UpdateSubscriptionRequest {
  applicationId: string;
  subscriptionId: string;
  type: SubscriptionType;
}
export interface UpdateSubscriptionResponse {
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export interface UpdateUserRequest {
  applicationId: string;
  userId: string;
  userAliasesToUpdate?: UserAlias[];
  userAliasesToDelete?: UserAlias[];
}
export interface UpdateUserResponse {
  userAliasesAdded?: UserAlias[];
  userAliasesUpdated?: UserAlias[];
  userAliasesDeleted?: UserAlias[];
}
export interface UpdateWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
  roleArn?: string;
  authenticationConfiguration?: WebExperienceAuthConfiguration;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  origins?: string[];
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export interface UpdateWebExperienceResponse {}
export type ValidationExceptionReason =
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "UNKNOWN_OPERATION"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFields = ValidationExceptionField[];
export type AssociatePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates a permission policy for a Amazon Q Business application, allowing cross-account access for an ISV. This operation creates a new policy statement for the specified Amazon Q Business application. The policy statement defines the IAM actions that the ISV is allowed to perform on the Amazon Q Business application's resources.
 */
export const associatePermission: API.OperationMethod<
  AssociatePermissionRequest,
  AssociatePermissionResponse,
  AssociatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<AssociatePermissionRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<AssociatePermissionResponse>,
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
  operationName: "AssociatePermission",
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
 * Asynchronously deletes one or more documents added using the `BatchPutDocument` API from an Amazon Q Business index.
 *
 * You can see the progress of the deletion, and any error messages related to the process, by using CloudWatch.
 */
export const batchDeleteDocument: API.OperationMethod<
  BatchDeleteDocumentRequest,
  BatchDeleteDocumentResponse,
  BatchDeleteDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(66, __c2, 2) as any as S.Schema<BatchDeleteDocumentRequest>,
  output: __S(98, __c3, 2) as any as S.Schema<BatchDeleteDocumentResponse>,
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
 * Adds one or more documents to an Amazon Q Business index.
 *
 * You use this API to:
 *
 * - ingest your structured and unstructured documents and documents stored in an Amazon S3 bucket into an Amazon Q Business index.
 *
 * - add custom attributes to documents in an Amazon Q Business index.
 *
 * - attach an access control list to the documents added to an Amazon Q Business index.
 *
 * You can see the progress of the deletion, and any error messages related to the process, by using CloudWatch.
 */
export const batchPutDocument: API.OperationMethod<
  BatchPutDocumentRequest,
  BatchPutDocumentResponse,
  BatchPutDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(170, __c5, 10) as any as S.Schema<BatchPutDocumentRequest>,
  output: __S(98, __c3, 2) as any as S.Schema<BatchPutDocumentResponse>,
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

export type CancelSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Unsubscribes a user or a group from their pricing tier in an Amazon Q Business application. An unsubscribed user or group loses all Amazon Q Business feature access at the start of next month.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<CancelSubscriptionRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<CancelSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSubscription",
}));

export type ChatError =
  | AccessDeniedException
  | ConflictException
  | ExternalResourceException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts or continues a streaming Amazon Q Business conversation.
 */
export const chat: API.OperationMethod<
  ChatInput,
  ChatOutput,
  ChatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(452, __c14, 4) as any as S.Schema<ChatInput>,
  output: __S(458, __c14, 10) as any as S.Schema<ChatOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExternalResourceException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Chat",
}));

export type ChatSyncError =
  | AccessDeniedException
  | ConflictException
  | ExternalResourceException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts or continues a non-streaming Amazon Q Business conversation.
 */
export const chatSync: API.OperationMethod<
  ChatSyncInput,
  ChatSyncOutput,
  ChatSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(641, __c20, 1) as any as S.Schema<ChatSyncInput>,
  output: __S(642, __c20, 2) as any as S.Schema<ChatSyncOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExternalResourceException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChatSync",
}));

export type CheckDocumentAccessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Verifies if a user has access permissions for a specified document and returns the actual ACL attached to the document. Resolves user access on the document via user aliases and groups when verifying user access.
 */
export const checkDocumentAccess: API.OperationMethod<
  CheckDocumentAccessRequest,
  CheckDocumentAccessResponse,
  CheckDocumentAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<CheckDocumentAccessRequest>,
  output: __S(713, __c22, 9) as any as S.Schema<CheckDocumentAccessResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDocumentAccess",
}));

export type CreateAnonymousWebExperienceUrlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a unique URL for anonymous Amazon Q Business web experience. This URL can only be used once and must be used within 5 minutes after it's generated.
 */
export const createAnonymousWebExperienceUrl: API.OperationMethod<
  CreateAnonymousWebExperienceUrlRequest,
  CreateAnonymousWebExperienceUrlResponse,
  CreateAnonymousWebExperienceUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<CreateAnonymousWebExperienceUrlRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<CreateAnonymousWebExperienceUrlResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnonymousWebExperienceUrl",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business application.
 *
 * There are new tiers for Amazon Q Business. Not all features in Amazon Q Business Pro are also available in Amazon Q Business Lite. For information on what's included in Amazon Q Business Lite and what's included in Amazon Q Business Pro, see Amazon Q Business tiers. You must use the Amazon Q Business console to assign subscription tiers to users.
 *
 * An Amazon Q Apps service linked role will be created if it's absent in the Amazon Web Services account when `QAppsConfiguration` is enabled in the request. For more information, see Using service-linked roles for Q Apps.
 *
 * When you create an application, Amazon Q Business may securely transmit data for processing from your selected Amazon Web Services region, but within your geography. For more information, see Cross region inference in Amazon Q Business.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<CreateApplicationResponse>,
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
  operationName: "CreateApplication",
}));

export type CreateChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new chat response configuration for an Amazon Q Business application. This operation establishes a set of parameters that define how the system generates and formats responses to user queries in chat interactions.
 */
export const createChatResponseConfiguration: API.OperationMethod<
  CreateChatResponseConfigurationRequest,
  CreateChatResponseConfigurationResponse,
  CreateChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<CreateChatResponseConfigurationRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<CreateChatResponseConfigurationResponse>,
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
  operationName: "CreateChatResponseConfiguration",
}));

export type CreateDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new data accessor for an ISV to access data from a Amazon Q Business application. The data accessor is an entity that represents the ISV's access to the Amazon Q Business application's data. It includes the IAM role ARN for the ISV, a friendly name, and a set of action configurations that define the specific actions the ISV is allowed to perform and any associated data filters. When the data accessor is created, an IAM Identity Center application is also created to manage the ISV's identity and authentication for accessing the Amazon Q Business application.
 */
export const createDataAccessor: API.OperationMethod<
  CreateDataAccessorRequest,
  CreateDataAccessorResponse,
  CreateDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<CreateDataAccessorRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<CreateDataAccessorResponse>,
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
  operationName: "CreateDataAccessor",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data source connector for an Amazon Q Business application.
 *
 * `CreateDataSource` is a synchronous operation. The operation returns 200 if the data source was successfully created. Otherwise, an exception is raised.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CreateDataSourceRequest>,
  output: __S(1121, __c35, 1) as any as S.Schema<CreateDataSourceResponse>,
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
  operationName: "CreateDataSource",
}));

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business index.
 *
 * To determine if index creation has completed, check the `Status` field returned from a call to `DescribeIndex`. The `Status` field is set to `ACTIVE` when the index is ready to use.
 *
 * Once the index is active, you can index your documents using the `BatchPutDocument` API or the `CreateDataSource` API.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<CreateIndexRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<CreateIndexResponse>,
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
  operationName: "CreateIndex",
}));

export type CreatePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business plugin.
 */
export const createPlugin: API.OperationMethod<
  CreatePluginRequest,
  CreatePluginResponse,
  CreatePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<CreatePluginRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<CreatePluginResponse>,
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
  operationName: "CreatePlugin",
}));

export type CreateRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a retriever to your Amazon Q Business application.
 */
export const createRetriever: API.OperationMethod<
  CreateRetrieverRequest,
  CreateRetrieverResponse,
  CreateRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<CreateRetrieverRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<CreateRetrieverResponse>,
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
  operationName: "CreateRetriever",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Subscribes an IAM Identity Center user or a group to a pricing tier for an Amazon Q Business application.
 *
 * Amazon Q Business offers two subscription tiers: `Q_LITE` and `Q_BUSINESS`. Subscription tier determines feature access for the user. For more information on subscriptions and pricing tiers, see Amazon Q Business pricing.
 *
 * For an example IAM role policy for assigning subscriptions, see Set up required permissions in the Amazon Q Business User Guide.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<CreateSubscriptionRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<CreateSubscriptionResponse>,
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
  operationName: "CreateSubscription",
}));

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a universally unique identifier (UUID) mapped to a list of local user ids within an application.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateUserResponse>,
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
  operationName: "CreateUser",
}));

export type CreateWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business web experience.
 */
export const createWebExperience: API.OperationMethod<
  CreateWebExperienceRequest,
  CreateWebExperienceResponse,
  CreateWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<CreateWebExperienceRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<CreateWebExperienceResponse>,
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
  operationName: "CreateWebExperience",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteApplicationResponse>,
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
  operationName: "DeleteApplication",
}));

export type DeleteAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attachment associated with a specific Amazon Q Business conversation.
 */
export const deleteAttachment: API.OperationMethod<
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DeleteAttachmentRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteAttachmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachment",
}));

export type DeleteChatControlsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes chat controls configured for an existing Amazon Q Business application.
 */
export const deleteChatControlsConfiguration: API.OperationMethod<
  DeleteChatControlsConfigurationRequest,
  DeleteChatControlsConfigurationResponse,
  DeleteChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<DeleteChatControlsConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteChatControlsConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChatControlsConfiguration",
}));

export type DeleteChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified chat response configuration from an Amazon Q Business application.
 */
export const deleteChatResponseConfiguration: API.OperationMethod<
  DeleteChatResponseConfigurationRequest,
  DeleteChatResponseConfigurationResponse,
  DeleteChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteChatResponseConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteChatResponseConfigurationResponse>,
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
  operationName: "DeleteChatResponseConfiguration",
}));

export type DeleteConversationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business web experience conversation.
 */
export const deleteConversation: API.OperationMethod<
  DeleteConversationRequest,
  DeleteConversationResponse,
  DeleteConversationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteConversationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteConversationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConversation",
}));

export type DeleteDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified data accessor. This operation permanently removes the data accessor and its associated IAM Identity Center application. Any access granted to the ISV through this data accessor will be revoked.
 */
export const deleteDataAccessor: API.OperationMethod<
  DeleteDataAccessorRequest,
  DeleteDataAccessorResponse,
  DeleteDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteDataAccessorRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteDataAccessorResponse>,
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
  operationName: "DeleteDataAccessor",
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
 * Deletes an Amazon Q Business data source connector. While the data source is being deleted, the `Status` field returned by a call to the `DescribeDataSource` API is set to `DELETING`.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<DeleteDataSourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteDataSourceResponse>,
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

export type DeleteGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group so that all users and sub groups that belong to the group can no longer access documents only available to that group. For example, after deleting the group "Summer Interns", all interns who belonged to that group no longer see intern-only documents in their chat results.
 *
 * If you want to delete, update, or replace users or sub groups of a group, you need to use the `PutGroup` operation. For example, if a user in the group "Engineering" leaves the engineering team and another user takes their place, you provide an updated list of users or sub groups that belong to the "Engineering" group when calling `PutGroup`.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteGroupResponse>,
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
  operationName: "DeleteGroup",
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
 * Deletes an Amazon Q Business index.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteIndexRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteIndexResponse>,
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

export type DeletePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business plugin.
 */
export const deletePlugin: API.OperationMethod<
  DeletePluginRequest,
  DeletePluginResponse,
  DeletePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<DeletePluginRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeletePluginResponse>,
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
  operationName: "DeletePlugin",
}));

export type DeleteRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the retriever used by an Amazon Q Business application.
 */
export const deleteRetriever: API.OperationMethod<
  DeleteRetrieverRequest,
  DeleteRetrieverResponse,
  DeleteRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<DeleteRetrieverRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteRetrieverResponse>,
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
  operationName: "DeleteRetriever",
}));

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user by email id.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteUserResponse>,
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
  operationName: "DeleteUser",
}));

export type DeleteWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business web experience.
 */
export const deleteWebExperience: API.OperationMethod<
  DeleteWebExperienceRequest,
  DeleteWebExperienceResponse,
  DeleteWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<DeleteWebExperienceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteWebExperienceResponse>,
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
  operationName: "DeleteWebExperience",
}));

export type DisassociatePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a permission policy from a Amazon Q Business application, revoking the cross-account access that was previously granted to an ISV. This operation deletes the specified policy statement from the application's permission policy.
 */
export const disassociatePermission: API.OperationMethod<
  DisassociatePermissionRequest,
  DisassociatePermissionResponse,
  DisassociatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<DisassociatePermissionRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DisassociatePermissionResponse>,
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
  operationName: "DisassociatePermission",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<GetApplicationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetChatControlsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about chat controls configured for an existing Amazon Q Business application.
 */
export const getChatControlsConfiguration: API.PaginatedOperationMethod<
  GetChatControlsConfigurationRequest,
  GetChatControlsConfigurationResponse,
  GetChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient,
  TopicConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<GetChatControlsConfigurationRequest>,
  output: __S(2082, __c65, 2) as any as S.Schema<GetChatControlsConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChatControlsConfiguration",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "topicConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetChatResponseConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific chat response configuration from an Amazon Q Business application. This operation returns the complete configuration settings and metadata.
 */
export const getChatResponseConfiguration: API.OperationMethod<
  GetChatResponseConfigurationRequest,
  GetChatResponseConfigurationResponse,
  GetChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<GetChatResponseConfigurationRequest>,
  output: __S(2146, __c67, 2) as any as S.Schema<GetChatResponseConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChatResponseConfiguration",
}));

export type GetDataAccessorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specified data accessor. This operation returns details about the data accessor, including its display name, unique identifier, Amazon Resource Name (ARN), the associated Amazon Q Business application and IAM Identity Center application, the IAM role for the ISV, the action configurations, and the timestamps for when the data accessor was created and last updated.
 */
export const getDataAccessor: API.OperationMethod<
  GetDataAccessorRequest,
  GetDataAccessorResponse,
  GetDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<GetDataAccessorRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<GetDataAccessorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAccessor",
}));

export type GetDataSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business data source connector.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<GetDataSourceRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<GetDataSourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetDocumentContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the content of a document that was ingested into Amazon Q Business. This API validates user authorization against document ACLs before returning a pre-signed URL for secure document access. You can download or view source documents referenced in chat responses through the URL.
 */
export const getDocumentContent: API.OperationMethod<
  GetDocumentContentRequest,
  GetDocumentContentResponse,
  GetDocumentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<GetDocumentContentRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<GetDocumentContentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentContent",
}));

export type GetGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a group by group name.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<GetGroupRequest>,
  output: __S(2275, __c71, 3) as any as S.Schema<GetGroupResponse>,
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
  operationName: "GetGroup",
}));

export type GetIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business index.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<GetIndexRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<GetIndexResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetMediaError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | MediaTooLargeException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the image bytes corresponding to a media object. If you have implemented your own application with the Chat and ChatSync APIs, and have enabled content extraction from visual data in Amazon Q Business, you use the GetMedia API operation to download the images so you can show them in your UI with responses.
 *
 * For more information, see Extracting semantic meaning from images and visuals.
 */
export const getMedia: API.OperationMethod<
  GetMediaRequest,
  GetMediaResponse,
  GetMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<GetMediaRequest>,
  output: __S(2369, __c74, 1) as any as S.Schema<GetMediaResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    MediaTooLargeException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedia",
}));

export type GetPluginError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business plugin.
 */
export const getPlugin: API.OperationMethod<
  GetPluginRequest,
  GetPluginResponse,
  GetPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<GetPluginRequest>,
  output: __S(2401, __c75, 1) as any as S.Schema<GetPluginResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlugin",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current permission policy for a Amazon Q Business application. The policy is returned as a JSON-formatted string and defines the IAM actions that are allowed or denied for the application's resources.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<GetPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetRetrieverError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing retriever used by an Amazon Q Business application.
 */
export const getRetriever: API.OperationMethod<
  GetRetrieverRequest,
  GetRetrieverResponse,
  GetRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<GetRetrieverRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<GetRetrieverResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetriever",
}));

export type GetUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the universally unique identifier (UUID) associated with a local user in a data source.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<GetUserRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<GetUserResponse>,
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
  operationName: "GetUser",
}));

export type GetWebExperienceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business web experience.
 */
export const getWebExperience: API.OperationMethod<
  GetWebExperienceRequest,
  GetWebExperienceResponse,
  GetWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<GetWebExperienceRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<GetWebExperienceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebExperience",
}));

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Q Business applications.
 *
 * Amazon Q Business applications may securely transmit data for processing across Amazon Web Services Regions within your geography. For more information, see Cross region inference in Amazon Q Business.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(2595, __c81, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttachmentsError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of attachments associated with an Amazon Q Business web experience or a list of attachements associated with a specific Amazon Q Business conversation.
 */
export const listAttachments: API.PaginatedOperationMethod<
  ListAttachmentsRequest,
  ListAttachmentsResponse,
  ListAttachmentsError,
  Credentials | HttpClient.HttpClient,
  Attachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<ListAttachmentsRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<ListAttachmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attachments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListChatResponseConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all chat response configurations available in a specified Amazon Q Business application. This operation returns summary information about each configuration to help administrators manage and select appropriate response settings.
 */
export const listChatResponseConfigurations: API.PaginatedOperationMethod<
  ListChatResponseConfigurationsRequest,
  ListChatResponseConfigurationsResponse,
  ListChatResponseConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ChatResponseConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<ListChatResponseConfigurationsRequest>,
  output: __S(2659, __c83, 3) as any as S.Schema<ListChatResponseConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChatResponseConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "chatResponseConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConversationsError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more Amazon Q Business conversations.
 */
export const listConversations: API.PaginatedOperationMethod<
  ListConversationsRequest,
  ListConversationsResponse,
  ListConversationsError,
  Credentials | HttpClient.HttpClient,
  Conversation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<ListConversationsRequest>,
  output: __S(2691, __c84, 3) as any as S.Schema<ListConversationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConversations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "conversations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data accessors for a Amazon Q Business application. This operation returns a paginated list of data accessor summaries, including the friendly name, unique identifier, ARN, associated IAM role, and creation/update timestamps for each data accessor.
 */
export const listDataAccessors: API.PaginatedOperationMethod<
  ListDataAccessorsRequest,
  ListDataAccessorsResponse,
  ListDataAccessorsError,
  Credentials | HttpClient.HttpClient,
  DataAccessor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<ListDataAccessorsRequest>,
  output: __S(2723, __c85, 3) as any as S.Schema<ListDataAccessorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAccessors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataAccessors",
    pageSize: "maxResults",
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
 * Lists the Amazon Q Business data source connectors that you have created.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<ListDataSourcesRequest>,
  output: __S(2755, __c86, 3) as any as S.Schema<ListDataSourcesResponse>,
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
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSources",
    pageSize: "maxResults",
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
 * Get information about an Amazon Q Business data source connector synchronization.
 */
export const listDataSourceSyncJobs: API.PaginatedOperationMethod<
  ListDataSourceSyncJobsRequest,
  ListDataSourceSyncJobsResponse,
  ListDataSourceSyncJobsError,
  Credentials | HttpClient.HttpClient,
  DataSourceSyncJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<ListDataSourceSyncJobsRequest>,
  output: __S(2788, __c87, 4) as any as S.Schema<ListDataSourceSyncJobsResponse>,
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
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "history",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of documents attached to an index.
 */
export const listDocuments: API.PaginatedOperationMethod<
  ListDocumentsRequest,
  ListDocumentsResponse,
  ListDocumentsError,
  Credentials | HttpClient.HttpClient,
  DocumentDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<ListDocumentsRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<ListDocumentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocuments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "documentDetailList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of groups that are mapped to users.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(2851, __c89, 3) as any as S.Schema<ListGroupsResponse>,
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
  operationName: "ListGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIndicesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Q Business indices you have created.
 */
export const listIndices: API.PaginatedOperationMethod<
  ListIndicesRequest,
  ListIndicesResponse,
  ListIndicesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<ListIndicesRequest>,
  output: __S(2883, __c90, 3) as any as S.Schema<ListIndicesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMessagesError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of messages associated with an Amazon Q Business web experience.
 */
export const listMessages: API.PaginatedOperationMethod<
  ListMessagesRequest,
  ListMessagesResponse,
  ListMessagesError,
  Credentials | HttpClient.HttpClient,
  Message
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<ListMessagesRequest>,
  output: __S(2915, __c91, 3) as any as S.Schema<ListMessagesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginActionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business actions for a specific plugin in an Amazon Q Business application.
 */
export const listPluginActions: API.PaginatedOperationMethod<
  ListPluginActionsRequest,
  ListPluginActionsResponse,
  ListPluginActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<ListPluginActionsRequest>,
  output: __S(2978, __c93, 2) as any as S.Schema<ListPluginActionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business plugins.
 */
export const listPlugins: API.PaginatedOperationMethod<
  ListPluginsRequest,
  ListPluginsResponse,
  ListPluginsError,
  Credentials | HttpClient.HttpClient,
  Plugin
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<ListPluginsRequest>,
  output: __S(3011, __c94, 3) as any as S.Schema<ListPluginsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlugins",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plugins",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginTypeActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business actions for any plugin type--both built-in and custom.
 */
export const listPluginTypeActions: API.PaginatedOperationMethod<
  ListPluginTypeActionsRequest,
  ListPluginTypeActionsResponse,
  ListPluginTypeActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<ListPluginTypeActionsRequest>,
  output: __S(2978, __c93, 2) as any as S.Schema<ListPluginTypeActionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginTypeActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginTypeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists metadata for all Amazon Q Business plugin types.
 */
export const listPluginTypeMetadata: API.PaginatedOperationMethod<
  ListPluginTypeMetadataRequest,
  ListPluginTypeMetadataResponse,
  ListPluginTypeMetadataError,
  Credentials | HttpClient.HttpClient,
  PluginTypeMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<ListPluginTypeMetadataRequest>,
  output: __S(3075, __c96, 3) as any as S.Schema<ListPluginTypeMetadataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginTypeMetadata",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRetrieversError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the retriever used by an Amazon Q Business application.
 */
export const listRetrievers: API.PaginatedOperationMethod<
  ListRetrieversRequest,
  ListRetrieversResponse,
  ListRetrieversError,
  Credentials | HttpClient.HttpClient,
  Retriever
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<ListRetrieversRequest>,
  output: __S(3107, __c97, 3) as any as S.Schema<ListRetrieversResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrievers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retrievers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all subscriptions created in an Amazon Q Business application.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<ListSubscriptionsRequest>,
  output: __S(3139, __c98, 3) as any as S.Schema<ListSubscriptionsResponse>,
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
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
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
 * Gets a list of tags associated with a specified resource. Amazon Q Business applications and data sources can have tags associated with them.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3169, __c99, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListWebExperiencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more Amazon Q Business Web Experiences.
 */
export const listWebExperiences: API.PaginatedOperationMethod<
  ListWebExperiencesRequest,
  ListWebExperiencesResponse,
  ListWebExperiencesError,
  Credentials | HttpClient.HttpClient,
  WebExperience
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<ListWebExperiencesRequest>,
  output: __S(3203, __c100, 3) as any as S.Schema<ListWebExperiencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebExperiences",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "webExperiences",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables your end user to provide feedback on their Amazon Q Business generated chat responses.
 */
export const putFeedback: API.OperationMethod<
  PutFeedbackRequest,
  PutFeedbackResponse,
  PutFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3233, __c101, 1) as any as S.Schema<PutFeedbackRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<PutFeedbackResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedback",
}));

export type PutGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create, or updates, a mapping of users--who have access to a document--to groups.
 *
 * You can also map sub groups to groups. For example, the group "Company Intellectual Property Teams" includes sub groups "Research" and "Engineering". These sub groups include their own list of users or people who work in these teams. Only users who work in research and engineering, and therefore belong in the intellectual property group, can see top-secret company documents in their Amazon Q Business chat results.
 *
 * There are two options for creating groups, either passing group members inline or using an S3 file via the S3PathForGroupMembers field. For inline groups, there is a limit of 1000 members per group and for provided S3 files there is a limit of 100 thousand members. When creating a group using an S3 file, you provide both an S3 file and a `RoleArn` for Amazon Q Buisness to access the file.
 */
export const putGroup: API.OperationMethod<
  PutGroupRequest,
  PutGroupResponse,
  PutGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3269, __c102, 5) as any as S.Schema<PutGroupRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<PutGroupResponse>,
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
  operationName: "PutGroup",
}));

export type SearchRelevantContentError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for relevant content in a Amazon Q Business application based on a query. This operation takes a search query text, the Amazon Q Business application identifier, and optional filters (such as content source and maximum results) as input. It returns a list of relevant content items, where each item includes the content text, the unique document identifier, the document title, the document URI, any relevant document attributes, and score attributes indicating the confidence level of the relevance.
 */
export const searchRelevantContent: API.PaginatedOperationMethod<
  SearchRelevantContentRequest,
  SearchRelevantContentResponse,
  SearchRelevantContentError,
  Credentials | HttpClient.HttpClient,
  RelevantContent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3298, __c103, 2) as any as S.Schema<SearchRelevantContentRequest>,
  output: __S(3302, __c103, 6) as any as S.Schema<SearchRelevantContentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRelevantContent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relevantContent",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDataSourceSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data source connector synchronization job. If a synchronization job is already in progress, Amazon Q Business returns a `ConflictException`.
 */
export const startDataSourceSyncJob: API.OperationMethod<
  StartDataSourceSyncJobRequest,
  StartDataSourceSyncJobResponse,
  StartDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<StartDataSourceSyncJobRequest>,
  output: __S(3329, __c104, 1) as any as S.Schema<StartDataSourceSyncJobResponse>,
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
  operationName: "StartDataSourceSyncJob",
}));

export type StopDataSourceSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an Amazon Q Business data source connector synchronization job already in progress.
 */
export const stopDataSourceSyncJob: API.OperationMethod<
  StopDataSourceSyncJobRequest,
  StopDataSourceSyncJobResponse,
  StopDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<StopDataSourceSyncJobRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<StopDataSourceSyncJobResponse>,
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
  operationName: "StopDataSourceSyncJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tag to the specified Amazon Q Business application or data source resource. If the tag already exists, the existing value is replaced with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<TagResourceResponse>,
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
 * Removes a tag from an Amazon Q Business application or a data source.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q Business application.
 *
 * Amazon Q Business applications may securely transmit data for processing across Amazon Web Services Regions within your geography. For more information, see Cross region inference in Amazon Q Business.
 *
 * An Amazon Q Apps service-linked role will be created if it's absent in the Amazon Web Services account when `QAppsConfiguration` is enabled in the request. For more information, see Using service-linked roles for Q Apps.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateApplicationResponse>,
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
  operationName: "UpdateApplication",
}));

export type UpdateChatControlsConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a set of chat controls configured for an existing Amazon Q Business application.
 */
export const updateChatControlsConfiguration: API.OperationMethod<
  UpdateChatControlsConfigurationRequest,
  UpdateChatControlsConfigurationResponse,
  UpdateChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3489, __c109, 1) as any as S.Schema<UpdateChatControlsConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateChatControlsConfigurationResponse>,
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
  operationName: "UpdateChatControlsConfiguration",
}));

export type UpdateChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing chat response configuration in an Amazon Q Business application. This operation allows administrators to modify configuration settings, display name, and response parameters to refine how the system generates responses.
 */
export const updateChatResponseConfiguration: API.OperationMethod<
  UpdateChatResponseConfigurationRequest,
  UpdateChatResponseConfigurationResponse,
  UpdateChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<UpdateChatResponseConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateChatResponseConfigurationResponse>,
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
  operationName: "UpdateChatResponseConfiguration",
}));

export type UpdateDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing data accessor. This operation allows modifying the action configurations (the allowed actions and associated filters) and the display name of the data accessor. It does not allow changing the IAM role associated with the data accessor or other core properties of the data accessor.
 */
export const updateDataAccessor: API.OperationMethod<
  UpdateDataAccessorRequest,
  UpdateDataAccessorResponse,
  UpdateDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<UpdateDataAccessorRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateDataAccessorResponse>,
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
  operationName: "UpdateDataAccessor",
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
 * Updates an existing Amazon Q Business data source connector.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<UpdateDataSourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateDataSourceResponse>,
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
 * Updates an Amazon Q Business index.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<UpdateIndexRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateIndexResponse>,
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

export type UpdatePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Q Business plugin.
 */
export const updatePlugin: API.OperationMethod<
  UpdatePluginRequest,
  UpdatePluginResponse,
  UpdatePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<UpdatePluginRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdatePluginResponse>,
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
  operationName: "UpdatePlugin",
}));

export type UpdateRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the retriever used for your Amazon Q Business application.
 */
export const updateRetriever: API.OperationMethod<
  UpdateRetrieverRequest,
  UpdateRetrieverResponse,
  UpdateRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<UpdateRetrieverRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateRetrieverResponse>,
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
  operationName: "UpdateRetriever",
}));

export type UpdateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the pricing tier for an Amazon Q Business subscription. Upgrades are instant. Downgrades apply at the start of the next month. Subscription tier determines feature access for the user. For more information on subscriptions and pricing tiers, see Amazon Q Business pricing.
 */
export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionRequest,
  UpdateSubscriptionResponse,
  UpdateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<UpdateSubscriptionRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UpdateSubscriptionResponse>,
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
  operationName: "UpdateSubscription",
}));

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a information associated with a user id.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<UpdateUserResponse>,
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
  operationName: "UpdateUser",
}));

export type UpdateWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Q Business web experience.
 */
export const updateWebExperience: API.OperationMethod<
  UpdateWebExperienceRequest,
  UpdateWebExperienceResponse,
  UpdateWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<UpdateWebExperienceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateWebExperienceResponse>,
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
  operationName: "UpdateWebExperience",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          conditionOperator: S.String,
          conditionKey: S.String,
          conditionValues: __S(32, __c1, 0),
        }),
      ).annotate({ identifier: "PermissionCondition" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          statementId: S.String,
          actions: __S(32, __c1, 0),
          conditions: S.optional(__S(1, __c0, 1)),
          principal: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePermissionRequest" });
    case 3:
      return S.suspend(() => S.Struct({ statement: S.optional(S.String) })).annotate({
        identifier: "AssociatePermissionResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ documentId: S.String })).annotate({
        identifier: "DeleteDocument",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          documents: __S(65, __c2, 1),
          dataSourceSyncId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/indices/{indexId}/documents/delete",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteDocumentRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          dataSourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedDocument" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() => S.Struct({ failedDocuments: S.optional(__S(97, __c3, 1)) })).annotate({
        identifier: "BatchDeleteDocumentResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ errorMessage: S.optional(S.String), errorCode: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetail" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ blob: T.Blob }),
        /*@__PURE__*/ S.Struct({ s3: __S(288, __c9, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          access: S.String,
          membershipType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrincipalUser" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          access: S.String,
          membershipType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrincipalGroup" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(161, __c5, 1) }),
        /*@__PURE__*/ S.Struct({ group: __S(162, __c5, 2) }),
      ]);
    case 4:
      return S.Array(__S(163, __c5, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ principals: __S(164, __c5, 4), memberRelation: S.optional(S.String) }),
      ).annotate({ identifier: "AccessControl" });
    case 6:
      return S.Array(__S(165, __c5, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ accessControls: __S(166, __c5, 6), memberRelation: S.optional(S.String) }),
      ).annotate({ identifier: "AccessConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          attributes: S.optional(__S(320, __c10, 0)),
          content: S.optional(__S(160, __c5, 0)),
          contentType: S.optional(S.String),
          title: S.optional(S.String),
          accessConfiguration: S.optional(__S(167, __c5, 7)),
          documentEnrichmentConfiguration: S.optional(__S(261, __c8, 5)),
          mediaExtractionConfiguration: S.optional(__S(265, __c8, 9)),
        }),
      ).annotate({ identifier: "Document" });
    case 9:
      return S.Array(__S(168, __c5, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          documents: __S(169, __c5, 9),
          roleArn: S.optional(S.String),
          dataSourceSyncId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/indices/{indexId}/documents",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutDocumentRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ stringListValue: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ longValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          dateValue: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
      ]);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: __S(192, __c6, 0) })).annotate({
        identifier: "DocumentAttribute",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, operator: S.String, value: S.optional(__S(192, __c6, 0)) }),
      ).annotate({ identifier: "DocumentAttributeCondition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          key: S.String,
          value: S.optional(__S(192, __c6, 0)),
          attributeValueOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentAttributeTarget" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          condition: S.optional(__S(256, __c8, 0)),
          target: S.optional(__S(257, __c8, 1)),
          documentContentOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "InlineDocumentEnrichmentConfiguration" });
    case 3:
      return S.Array(__S(258, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          invocationCondition: S.optional(__S(256, __c8, 0)),
          lambdaArn: S.optional(S.String),
          s3BucketName: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "HookConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          inlineConfigurations: S.optional(__S(259, __c8, 3)),
          preExtractionHookConfiguration: S.optional(__S(260, __c8, 4)),
          postExtractionHookConfiguration: S.optional(__S(260, __c8, 4)),
        }),
      ).annotate({ identifier: "DocumentEnrichmentConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ imageExtractionStatus: S.String })).annotate({
        identifier: "ImageExtractionConfiguration",
      });
    case 7:
      return S.suspend(() => S.Struct({ audioExtractionStatus: S.String })).annotate({
        identifier: "AudioExtractionConfiguration",
      });
    case 8:
      return S.suspend(() => S.Struct({ videoExtractionStatus: S.String })).annotate({
        identifier: "VideoExtractionConfiguration",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          imageExtractionConfiguration: S.optional(__S(262, __c8, 6)),
          audioExtractionConfiguration: S.optional(__S(263, __c8, 7)),
          videoExtractionConfiguration: S.optional(__S(264, __c8, 8)),
        }),
      ).annotate({ identifier: "MediaExtractionConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucket: S.String, key: S.String })).annotate({
        identifier: "S3",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(224, __c7, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/subscriptions/{subscriptionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSubscriptionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.optional(S.String) })).annotate({
        identifier: "SubscriptionDetails",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriptionArn: S.optional(S.String),
          currentSubscription: S.optional(__S(384, __c12, 0)),
          nextSubscription: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "CancelSubscriptionResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          chatMode: S.optional(S.String),
          chatModeConfiguration: S.optional(__S(481, __c15, 1)),
          attributeFilter: S.optional(__S(513, __c16, 1)),
        }),
      ).annotate({ identifier: "ConfigurationEvent" });
    case 1:
      return S.suspend(() => S.Struct({ userMessage: S.String })).annotate({
        identifier: "TextInputEvent",
      });
    case 2:
      return S.suspend(() => S.Struct({ attachment: S.optional(__S(482, __c15, 2)) })).annotate({
        identifier: "AttachmentInputEvent",
      });
    case 3:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ configurationEvent: __S(448, __c14, 0) }),
          /*@__PURE__*/ S.Struct({ textEvent: __S(449, __c14, 1) }),
          /*@__PURE__*/ S.Struct({ attachmentEvent: __S(450, __c14, 2) }),
          /*@__PURE__*/ S.Struct({ actionExecutionEvent: __S(578, __c18, 2) }),
          /*@__PURE__*/ S.Struct({ endOfInputEvent: __S(608, __c19, 0) }),
          /*@__PURE__*/ S.Struct({ authChallengeResponseEvent: __S(484, __c15, 4) }),
        ]),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          userGroups: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("userGroups")),
          conversationId: S.optional(S.String).pipe(T.HttpQuery("conversationId")),
          parentMessageId: S.optional(S.String).pipe(T.HttpQuery("parentMessageId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          inputStream: S.optional(__S(451, __c14, 3)).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/conversations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChatInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          systemMessageType: S.optional(S.String),
          conversationId: S.optional(S.String),
          userMessageId: S.optional(S.String),
          systemMessageId: S.optional(S.String),
          systemMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TextOutputEvent" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.optional(S.String),
          userMessageId: S.optional(S.String),
          systemMessageId: S.optional(S.String),
          sourceAttributions: S.optional(__S(587, __c18, 11)),
          finalTextMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetadataEvent" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.optional(S.String),
          userMessageId: S.optional(S.String),
          systemMessageId: S.optional(S.String),
          pluginId: S.optional(S.String),
          pluginType: S.optional(S.String),
          payload: S.optional(__S(591, __c18, 15)),
          payloadFieldNameSeparator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionReviewEvent" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.optional(S.String),
          userMessageId: S.optional(S.String),
          systemMessageId: S.optional(S.String),
          attachment: S.optional(__S(592, __c18, 16)),
        }),
      ).annotate({ identifier: "FailedAttachmentEvent" });
    case 9:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ textEvent: __S(453, __c14, 5) }),
          /*@__PURE__*/ S.Struct({ metadataEvent: __S(454, __c14, 6) }),
          /*@__PURE__*/ S.Struct({ actionReviewEvent: __S(455, __c14, 7) }),
          /*@__PURE__*/ S.Struct({ failedAttachmentEvent: __S(456, __c14, 8) }),
          /*@__PURE__*/ S.Struct({ authChallengeRequestEvent: __S(485, __c15, 5) }),
        ]),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({ outputStream: S.optional(__S(457, __c14, 9)).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "ChatOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ pluginId: S.String })).annotate({
        identifier: "PluginConfiguration",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ pluginConfiguration: __S(480, __c15, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(T.Blob),
          name: S.optional(S.String),
          copyFrom: S.optional(__S(545, __c17, 1)),
        }),
      ).annotate({ identifier: "AttachmentInput" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ responseMap: __S(483, __c15, 3) })).annotate({
        identifier: "AuthChallengeResponseEvent",
      });
    case 5:
      return S.suspend(() => S.Struct({ authorizationUrl: S.String })).annotate({
        identifier: "AuthChallengeRequestEvent",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<AttributeFilter> => __S(513, __c16, 1)).annotate({
          identifier: "AttributeFilter",
        }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          andAllFilters: S.optional(
            S.suspend(() => __S(512, __c16, 0)).annotate({ identifier: "AttributeFilters" }),
          ),
          orAllFilters: S.optional(
            S.suspend(() => __S(512, __c16, 0)).annotate({ identifier: "AttributeFilters" }),
          ),
          notFilter: S.optional(
            S.suspend((): S.Schema<AttributeFilter> => __S(513, __c16, 1)).annotate({
              identifier: "AttributeFilter",
            }),
          ),
          equalsTo: S.optional(__S(224, __c7, 0)),
          containsAll: S.optional(__S(224, __c7, 0)),
          containsAny: S.optional(__S(224, __c7, 0)),
          greaterThan: S.optional(__S(224, __c7, 0)),
          greaterThanOrEquals: S.optional(__S(224, __c7, 0)),
          lessThan: S.optional(__S(224, __c7, 0)),
          lessThanOrEquals: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "AttributeFilter" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ conversationId: S.String, attachmentId: S.String }),
      ).annotate({ identifier: "ConversationSource" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ conversation: __S(544, __c17, 0) })]);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.Any })).annotate({
        identifier: "ActionExecutionPayloadField",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(576, __c18, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          pluginId: S.String,
          payload: __S(577, __c18, 1),
          payloadFieldNameSeparator: S.String,
        }),
      ).annotate({ identifier: "ActionExecutionEvent" });
    case 3:
      return S.suspend(() => S.Struct({ text: S.optional(S.String) })).annotate({
        identifier: "SnippetExcerpt",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ mediaId: S.optional(S.String), mediaMimeType: S.optional(S.String) }),
      ).annotate({ identifier: "ImageSourceDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          mediaId: S.optional(S.String),
          mediaMimeType: S.optional(S.String),
          startTimeMilliseconds: S.optional(S.Number),
          endTimeMilliseconds: S.optional(S.Number),
          audioExtractionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AudioSourceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          mediaId: S.optional(S.String),
          mediaMimeType: S.optional(S.String),
          startTimeMilliseconds: S.optional(S.Number),
          endTimeMilliseconds: S.optional(S.Number),
          videoExtractionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VideoSourceDetails" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ imageSourceDetails: __S(580, __c18, 4) }),
        /*@__PURE__*/ S.Struct({ audioSourceDetails: __S(581, __c18, 5) }),
        /*@__PURE__*/ S.Struct({ videoSourceDetails: __S(582, __c18, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          beginOffset: S.optional(S.Number),
          endOffset: S.optional(S.Number),
          snippetExcerpt: S.optional(__S(579, __c18, 3)),
          mediaId: S.optional(S.String),
          mediaMimeType: S.optional(S.String),
          sourceDetails: S.optional(__S(583, __c18, 7)),
        }),
      ).annotate({ identifier: "TextSegment" });
    case 9:
      return S.Array(__S(584, __c18, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          snippet: S.optional(S.String),
          url: S.optional(S.String),
          citationNumber: S.optional(S.Number),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          textMessageSegments: S.optional(__S(585, __c18, 9)),
          documentId: S.optional(S.String),
          indexId: S.optional(S.String),
          datasourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceAttribution" });
    case 11:
      return S.Array(__S(586, __c18, 10)).pipe(/*@__PURE__*/ T.Sparse());
    case 12:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Any), displayValue: S.optional(S.Any) }),
      ).annotate({ identifier: "ActionReviewPayloadFieldAllowedValue" });
    case 13:
      return S.Array(__S(588, __c18, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          displayOrder: S.optional(S.Number),
          displayDescription: S.optional(S.String),
          type: S.optional(S.String),
          value: S.optional(S.Any),
          allowedValues: S.optional(__S(589, __c18, 13)),
          allowedFormat: S.optional(S.String),
          arrayItemJsonSchema: S.optional(S.Any),
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ActionReviewPayloadField" });
    case 15:
      return S.Record(S.String, /*@__PURE__*/ __S(590, __c18, 14).pipe(S.optional));
    case 16:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          attachmentId: S.optional(S.String),
          conversationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "EndOfInputEvent" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(482, __c15, 2));
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          userGroups: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("userGroups")),
          userMessage: S.optional(S.String),
          attachments: S.optional(__S(640, __c20, 0)),
          actionExecution: S.optional(__S(578, __c18, 2)),
          authChallengeResponse: S.optional(__S(484, __c15, 4)),
          conversationId: S.optional(S.String),
          parentMessageId: S.optional(S.String),
          attributeFilter: S.optional(__S(513, __c16, 1)),
          chatMode: S.optional(S.String),
          chatModeConfiguration: S.optional(__S(481, __c15, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/conversations?sync" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChatSyncInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.optional(S.String),
          systemMessage: S.optional(S.String),
          systemMessageId: S.optional(S.String),
          userMessageId: S.optional(S.String),
          actionReview: S.optional(__S(672, __c21, 0)),
          authChallengeRequest: S.optional(__S(485, __c15, 5)),
          sourceAttributions: S.optional(__S(587, __c18, 11)),
          failedAttachments: S.optional(__S(673, __c21, 1)),
        }),
      ).annotate({ identifier: "ChatSyncOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pluginId: S.optional(S.String),
          pluginType: S.optional(S.String),
          payload: S.optional(__S(591, __c18, 15)),
          payloadFieldNameSeparator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionReview" });
    case 1:
      return S.Array(__S(592, __c18, 16));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          documentId: S.String.pipe(T.HttpLabel("documentId")),
          dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/index/{indexId}/users/{userId}/documents/{documentId}/check-document-access",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CheckDocumentAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "AssociatedGroup" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "AssociatedUser" });
    case 4:
      return S.Array(__S(707, __c22, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          memberRelation: S.optional(S.String),
          users: S.optional(__S(708, __c22, 4)),
          groups: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({ identifier: "DocumentAclCondition" });
    case 6:
      return S.Array(__S(709, __c22, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          memberRelation: S.optional(S.String),
          conditions: S.optional(__S(710, __c22, 6)),
        }),
      ).annotate({ identifier: "DocumentAclMembership" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          allowlist: S.optional(__S(711, __c22, 7)),
          denyList: S.optional(__S(711, __c22, 7)),
        }),
      ).annotate({ identifier: "DocumentAcl" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          userGroups: S.optional(__S(706, __c22, 2)),
          userAliases: S.optional(__S(708, __c22, 4)),
          hasAccess: S.optional(S.Boolean),
          documentAcl: S.optional(__S(712, __c22, 8)),
        }),
      ).annotate({ identifier: "CheckDocumentAccessResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
          sessionDurationInMinutes: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/experiences/{webExperienceId}/anonymous-url",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAnonymousWebExperienceUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ anonymousUrl: S.optional(S.String) })).annotate({
        identifier: "CreateAnonymousWebExperienceUrlResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          roleArn: S.optional(S.String),
          identityType: S.optional(S.String),
          iamIdentityProviderArn: S.optional(S.String),
          identityCenterInstanceArn: S.optional(S.String),
          clientIdsForOIDC: S.optional(__S(32, __c1, 0)),
          description: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(832, __c26, 0)),
          tags: S.optional(__S(801, __c25, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          attachmentsConfiguration: S.optional(__S(928, __c29, 0)),
          qAppsConfiguration: S.optional(__S(896, __c28, 0)),
          personalizationConfiguration: S.optional(__S(897, __c28, 1)),
          quickSightConfiguration: S.optional(__S(864, __c27, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ applicationId: S.optional(S.String), applicationArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(800, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyId: S.optional(SensitiveString) })).annotate({
        identifier: "EncryptionConfiguration",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ clientNamespace: S.String })).annotate({
        identifier: "QuickSightConfiguration",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ qAppsControlMode: S.String })).annotate({
        identifier: "QAppsConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ personalizationControlMode: S.String })).annotate({
        identifier: "PersonalizationConfiguration",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attachmentsControlMode: S.String })).annotate({
        identifier: "AttachmentsConfiguration",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          displayName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          responseConfigurations: __S(994, __c31, 2),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/chatresponseconfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChatResponseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ chatResponseConfigurationId: S.String, chatResponseConfigurationArn: S.String }),
      ).annotate({ identifier: "CreateChatResponseConfigurationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          responseLength: S.optional(S.String),
          targetAudience: S.optional(S.String),
          perspective: S.optional(S.String),
          outputStyle: S.optional(S.String),
          identity: S.optional(S.String),
          tone: S.optional(S.String),
          customInstructions: S.optional(S.String),
          examples: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstructionCollection" });
    case 1:
      return S.suspend(() =>
        S.Struct({ instructionCollection: S.optional(__S(992, __c31, 0)) }),
      ).annotate({ identifier: "ResponseConfiguration" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(993, __c31, 1).pipe(S.optional));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          principal: S.String,
          actionConfigurations: __S(1090, __c34, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          displayName: SensitiveString,
          authenticationDetail: S.optional(__S(1058, __c33, 2)),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/dataaccessors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataAccessorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataAccessorId: S.String,
          idcApplicationArn: S.String,
          dataAccessorArn: S.String,
        }),
      ).annotate({ identifier: "CreateDataAccessorResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ idcTrustedTokenIssuerArn: S.String })).annotate({
        identifier: "DataAccessorIdcTrustedTokenIssuerConfiguration",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ idcTrustedTokenIssuerConfiguration: __S(1056, __c33, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          authenticationType: S.String,
          authenticationConfiguration: S.optional(__S(1057, __c33, 1)),
          externalIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "DataAccessorAuthenticationDetail" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ documentAttributeFilter: __S(513, __c16, 1) })).annotate({
        identifier: "ActionFilterConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ action: S.String, filterConfiguration: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({ identifier: "ActionConfiguration" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          displayName: S.String,
          configuration: S.Any,
          vpcConfiguration: S.optional(__S(1152, __c36, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          syncSchedule: S.optional(S.String),
          roleArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          documentEnrichmentConfiguration: S.optional(__S(261, __c8, 5)),
          mediaExtractionConfiguration: S.optional(__S(265, __c8, 9)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dataSourceId: S.optional(S.String), dataSourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDataSourceResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subnetIds: __S(32, __c1, 0), securityGroupIds: __S(32, __c1, 0) }),
      ).annotate({ identifier: "DataSourceVpcConfiguration" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          displayName: S.String,
          description: S.optional(S.String),
          type: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          capacityConfiguration: S.optional(__S(1216, __c38, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/indices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ indexId: S.optional(S.String), indexArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateIndexResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ units: S.optional(S.Number) })).annotate({
        identifier: "IndexCapacityConfiguration",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          displayName: S.String,
          type: S.String,
          authConfiguration: __S(1283, __c40, 3),
          serverUrl: S.optional(S.String),
          customPluginConfiguration: S.optional(__S(1285, __c40, 5)),
          tags: S.optional(__S(801, __c25, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/plugins" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePluginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pluginId: S.optional(S.String),
          pluginArn: S.optional(S.String),
          buildStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreatePluginResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ secretArn: S.String, roleArn: S.String })).annotate({
        identifier: "BasicAuthConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          secretArn: S.String,
          roleArn: S.String,
          authorizationUrl: S.optional(S.String),
          tokenUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuth2ClientCredentialConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ idcApplicationArn: S.String, roleArn: S.String })).annotate(
        { identifier: "IdcAuthConfiguration" },
      );
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ basicAuthConfiguration: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ oAuth2ClientCredentialConfiguration: __S(1281, __c40, 1) }),
        /*@__PURE__*/ S.Struct({ noAuthConfiguration: __S(608, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ idcAuthConfiguration: __S(1282, __c40, 2) }),
      ]);
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ payload: SensitiveString }),
        /*@__PURE__*/ S.Struct({ s3: __S(288, __c9, 0) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          description: S.String,
          apiSchemaType: S.String,
          apiSchema: S.optional(__S(1284, __c40, 4)),
        }),
      ).annotate({ identifier: "CustomPluginConfiguration" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          type: S.String,
          displayName: S.String,
          configuration: __S(1353, __c42, 9),
          roleArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/retrievers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRetrieverRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ retrieverId: S.optional(S.String), retrieverArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateRetrieverResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ boostingLevel: S.String, boostingType: S.optional(S.String) }),
      ).annotate({ identifier: "NumberAttributeBoostingConfiguration" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          boostingLevel: S.String,
          attributeValueBoosting: S.optional(__S(1345, __c42, 1)),
        }),
      ).annotate({ identifier: "StringAttributeBoostingConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ boostingLevel: S.String, boostingDurationInSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "DateAttributeBoostingConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ boostingLevel: S.String })).annotate({
        identifier: "StringListAttributeBoostingConfiguration",
      });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ numberConfiguration: __S(1344, __c42, 0) }),
        /*@__PURE__*/ S.Struct({ stringConfiguration: __S(1346, __c42, 2) }),
        /*@__PURE__*/ S.Struct({ dateConfiguration: __S(1347, __c42, 3) }),
        /*@__PURE__*/ S.Struct({ stringListConfiguration: __S(1348, __c42, 4) }),
      ]);
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(1349, __c42, 5).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({
          indexId: S.String,
          version: S.optional(S.Number),
          boostingOverride: S.optional(__S(1350, __c42, 6)),
        }),
      ).annotate({ identifier: "NativeIndexConfiguration" });
    case 8:
      return S.suspend(() => S.Struct({ indexId: S.String })).annotate({
        identifier: "KendraIndexConfiguration",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ nativeIndexConfiguration: __S(1351, __c42, 7) }),
        /*@__PURE__*/ S.Struct({ kendraIndexConfiguration: __S(1352, __c42, 8) }),
      ]);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          principal: __S(1408, __c44, 0),
          type: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscriptionId: S.optional(S.String),
          subscriptionArn: S.optional(S.String),
          currentSubscription: S.optional(__S(384, __c12, 0)),
          nextSubscription: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "CreateSubscriptionResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: S.String }),
        /*@__PURE__*/ S.Struct({ group: S.String }),
      ]);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.String,
          userAliases: S.optional(__S(1473, __c46, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          indexId: S.optional(S.String),
          dataSourceId: S.optional(S.String),
          userId: S.String,
        }),
      ).annotate({ identifier: "UserAlias" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          title: S.optional(S.String),
          subtitle: S.optional(S.String),
          welcomeMessage: S.optional(S.String),
          samplePromptsControlMode: S.optional(S.String),
          origins: S.optional(__S(32, __c1, 0)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          identityProviderConfiguration: S.optional(__S(1538, __c48, 2)),
          browserExtensionConfiguration: S.optional(__S(1539, __c48, 3)),
          customizationConfiguration: S.optional(__S(1540, __c48, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/experiences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWebExperienceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ webExperienceId: S.optional(S.String), webExperienceArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateWebExperienceResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ authenticationUrl: S.String })).annotate({
        identifier: "SamlProviderConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ secretsArn: S.String, secretsRole: S.String })).annotate({
        identifier: "OpenIDConnectProviderConfiguration",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ samlConfiguration: __S(1536, __c48, 0) }),
        /*@__PURE__*/ S.Struct({ openIDConnectConfiguration: __S(1537, __c48, 1) }),
      ]);
    case 3:
      return S.suspend(() => S.Struct({ enabledBrowserExtensions: __S(32, __c1, 0) })).annotate({
        identifier: "BrowserExtensionConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          customCSSUrl: S.optional(S.String),
          logoUrl: S.optional(S.String),
          fontUrl: S.optional(S.String),
          faviconUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomizationConfiguration" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
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
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          conversationId: S.String.pipe(T.HttpLabel("conversationId")),
          attachmentId: S.String.pipe(T.HttpLabel("attachmentId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/conversations/{conversationId}/attachments/{attachmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttachmentRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/chatcontrols" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChatControlsConfigurationRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          chatResponseConfigurationId: S.String.pipe(T.HttpLabel("chatResponseConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChatResponseConfigurationRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.String.pipe(T.HttpLabel("conversationId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/conversations/{conversationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConversationRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataAccessorRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataSourceRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          groupName: S.String.pipe(T.HttpLabel("groupName")),
          dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/indices/{indexId}/groups/{groupName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/indices/{indexId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIndexRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          pluginId: S.String.pipe(T.HttpLabel("pluginId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/plugins/{pluginId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePluginRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/retrievers/{retrieverId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRetrieverRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/users/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/experiences/{webExperienceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebExperienceRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          statementId: S.String.pipe(T.HttpLabel("statementId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/policy/{statementId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePermissionRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ attachmentsControlMode: S.optional(S.String) })).annotate({
        identifier: "AppliedAttachmentsConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          applicationId: S.optional(S.String),
          applicationArn: S.optional(S.String),
          identityType: S.optional(S.String),
          iamIdentityProviderArn: S.optional(S.String),
          identityCenterApplicationArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          description: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(832, __c26, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          error: S.optional(__S(128, __c4, 0)),
          attachmentsConfiguration: S.optional(__S(2017, __c63, 1)),
          qAppsConfiguration: S.optional(__S(896, __c28, 0)),
          personalizationConfiguration: S.optional(__S(897, __c28, 1)),
          autoSubscriptionConfiguration: S.optional(__S(2048, __c64, 0)),
          clientIdsForOIDC: S.optional(__S(32, __c1, 0)),
          quickSightConfiguration: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autoSubscribe: S.optional(S.String),
          defaultSubscriptionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoSubscriptionConfiguration" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/chatcontrols" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChatControlsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blockedPhrases: S.optional(__S(32, __c1, 0)),
          systemMessageOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlockedPhrasesConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          responseScope: S.optional(S.String),
          orchestrationConfiguration: S.optional(__S(2112, __c66, 0)),
          blockedPhrases: S.optional(__S(2081, __c65, 1)),
          topicConfigurations: S.optional(__S(2122, __c66, 10)),
          creatorModeConfiguration: S.optional(__S(2123, __c66, 11)),
          nextToken: S.optional(S.String),
          hallucinationReductionConfiguration: S.optional(__S(2124, __c66, 12)),
        }),
      ).annotate({ identifier: "GetChatControlsConfigurationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ control: S.String })).annotate({
        identifier: "AppliedOrchestrationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userIds: S.optional(__S(32, __c1, 0)),
          userGroups: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "UsersAndGroups" });
    case 2:
      return S.suspend(() => S.Struct({ systemMessageOverride: S.optional(S.String) })).annotate({
        identifier: "ContentBlockerRule",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ indexId: S.optional(S.String), dataSourceId: S.optional(S.String) }),
      ).annotate({ identifier: "EligibleDataSource" });
    case 4:
      return S.Array(__S(2115, __c66, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ eligibleDataSources: S.optional(__S(2116, __c66, 4)) }),
      ).annotate({ identifier: "ContentRetrievalRule" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contentBlockerRule: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ contentRetrievalRule: __S(2117, __c66, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          includedUsersAndGroups: S.optional(__S(2113, __c66, 1)),
          excludedUsersAndGroups: S.optional(__S(2113, __c66, 1)),
          ruleType: S.String,
          ruleConfiguration: S.optional(__S(2118, __c66, 6)),
        }),
      ).annotate({ identifier: "Rule" });
    case 8:
      return S.Array(__S(2119, __c66, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          exampleChatMessages: S.optional(__S(32, __c1, 0)),
          rules: __S(2120, __c66, 8),
        }),
      ).annotate({ identifier: "TopicConfiguration" });
    case 10:
      return S.Array(__S(2121, __c66, 9));
    case 11:
      return S.suspend(() => S.Struct({ creatorModeControl: S.String })).annotate({
        identifier: "AppliedCreatorModeConfiguration",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ hallucinationReductionControl: S.optional(S.String) }),
      ).annotate({ identifier: "HallucinationReductionConfiguration" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          chatResponseConfigurationId: S.String.pipe(T.HttpLabel("chatResponseConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChatResponseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          responseConfigurations: S.optional(__S(994, __c31, 2)),
          responseConfigurationSummary: S.optional(S.String),
          status: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChatResponseConfigurationDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          chatResponseConfigurationId: S.optional(S.String),
          chatResponseConfigurationArn: S.optional(S.String),
          displayName: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseConfiguration: S.optional(__S(2145, __c67, 1)),
          lastUpdateConfiguration: S.optional(__S(2145, __c67, 1)),
        }),
      ).annotate({ identifier: "GetChatResponseConfigurationResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataAccessorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(SensitiveString),
          dataAccessorId: S.optional(S.String),
          dataAccessorArn: S.optional(S.String),
          applicationId: S.optional(S.String),
          idcApplicationArn: S.optional(S.String),
          principal: S.optional(S.String),
          actionConfigurations: S.optional(__S(1090, __c34, 2)),
          authenticationDetail: S.optional(__S(1058, __c33, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDataAccessorResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          indexId: S.optional(S.String),
          dataSourceId: S.optional(S.String),
          dataSourceArn: S.optional(S.String),
          displayName: S.optional(S.String),
          type: S.optional(S.String),
          configuration: S.optional(S.Any),
          vpcConfiguration: S.optional(__S(1152, __c36, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          status: S.optional(S.String),
          syncSchedule: S.optional(S.String),
          roleArn: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          documentEnrichmentConfiguration: S.optional(__S(261, __c8, 5)),
          mediaExtractionConfiguration: S.optional(__S(265, __c8, 9)),
        }),
      ).annotate({ identifier: "GetDataSourceResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
          documentId: S.String.pipe(T.HttpLabel("documentId")),
          outputFormat: S.optional(S.String).pipe(T.HttpQuery("outputFormat")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/index/{indexId}/documents/{documentId}/content",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentContentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ presignedUrl: S.String, mimeType: S.String })).annotate({
        identifier: "GetDocumentContentResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          groupName: S.String.pipe(T.HttpLabel("groupName")),
          dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/indices/{indexId}/groups/{groupName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorDetail: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "GroupStatusDetail" });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(__S(2273, __c71, 1)),
          statusHistory: S.optional(__S(2274, __c71, 2)),
        }),
      ).annotate({ identifier: "GetGroupResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/indices/{indexId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          indexedTextBytes: S.optional(S.Number),
          indexedTextDocumentCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TextDocumentStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({ textDocumentStatistics: S.optional(__S(2305, __c72, 1)) }),
      ).annotate({ identifier: "IndexStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          indexId: S.optional(S.String),
          displayName: S.optional(S.String),
          indexArn: S.optional(S.String),
          status: S.optional(S.String),
          type: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          capacityConfiguration: S.optional(__S(1216, __c38, 0)),
          documentAttributeConfigurations: S.optional(__S(2337, __c73, 1)),
          error: S.optional(__S(128, __c4, 0)),
          indexStatistics: S.optional(__S(2306, __c72, 2)),
        }),
      ).annotate({ identifier: "GetIndexResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          type: S.optional(S.String),
          search: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentAttributeConfiguration" });
    case 1:
      return S.Array(__S(2336, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          conversationId: S.String.pipe(T.HttpLabel("conversationId")),
          messageId: S.String.pipe(T.HttpLabel("messageId")),
          mediaId: S.String.pipe(T.HttpLabel("mediaId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/media/{mediaId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMediaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ mediaBytes: S.optional(T.Blob), mediaMimeType: S.optional(S.String) }),
      ).annotate({ identifier: "GetMediaResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          pluginId: S.String.pipe(T.HttpLabel("pluginId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/plugins/{pluginId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPluginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          pluginId: S.optional(S.String),
          displayName: S.optional(S.String),
          type: S.optional(S.String),
          serverUrl: S.optional(S.String),
          authConfiguration: S.optional(__S(1283, __c40, 3)),
          customPluginConfiguration: S.optional(__S(1285, __c40, 5)),
          buildStatus: S.optional(S.String),
          pluginArn: S.optional(S.String),
          state: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetPluginResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.optional(S.String) })).annotate({
        identifier: "GetPolicyResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/retrievers/{retrieverId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRetrieverRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          retrieverId: S.optional(S.String),
          retrieverArn: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          displayName: S.optional(S.String),
          configuration: S.optional(__S(1353, __c42, 9)),
          roleArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetRetrieverResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/users/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userAliases: S.optional(__S(1473, __c46, 1)) })).annotate({
        identifier: "GetUserResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/experiences/{webExperienceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebExperienceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          webExperienceId: S.optional(S.String),
          webExperienceArn: S.optional(S.String),
          defaultEndpoint: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          title: S.optional(S.String),
          subtitle: S.optional(S.String),
          welcomeMessage: S.optional(S.String),
          samplePromptsControlMode: S.optional(S.String),
          origins: S.optional(__S(32, __c1, 0)),
          roleArn: S.optional(S.String),
          identityProviderConfiguration: S.optional(__S(1538, __c48, 2)),
          authenticationConfiguration: S.optional(__S(2561, __c80, 1)),
          error: S.optional(__S(128, __c4, 0)),
          browserExtensionConfiguration: S.optional(__S(1539, __c48, 3)),
          customizationConfiguration: S.optional(__S(1540, __c48, 4)),
        }),
      ).annotate({ identifier: "GetWebExperienceResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metadataXML: S.String,
          roleArn: S.String,
          userIdAttribute: S.String,
          userGroupAttribute: S.optional(S.String),
        }),
      ).annotate({ identifier: "SamlConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ samlConfiguration: __S(2560, __c80, 0) })]);
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          applicationId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          identityType: S.optional(S.String),
          quickSightConfiguration: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "Application" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          applications: S.optional(__S(2594, __c81, 2)),
        }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          conversationId: S.optional(S.String).pipe(T.HttpQuery("conversationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/attachments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAttachmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attachmentId: S.optional(S.String),
          conversationId: S.optional(S.String),
          name: S.optional(S.String),
          copyFrom: S.optional(__S(545, __c17, 1)),
          fileType: S.optional(S.String),
          fileSize: S.optional(S.Number),
          md5chksum: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "Attachment" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ attachments: S.optional(__S(2626, __c82, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAttachmentsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/chatresponseconfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChatResponseConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          chatResponseConfigurationId: S.String,
          chatResponseConfigurationArn: S.String,
          displayName: S.String,
          responseConfigurationSummary: S.optional(S.String),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChatResponseConfiguration" });
    case 2:
      return S.Array(__S(2657, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          chatResponseConfigurations: S.optional(__S(2658, __c83, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListChatResponseConfigurationsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/conversations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConversationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.optional(S.String),
          title: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Conversation" });
    case 2:
      return S.Array(__S(2689, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          conversations: S.optional(__S(2690, __c84, 2)),
        }),
      ).annotate({ identifier: "ListConversationsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/dataaccessors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataAccessorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(SensitiveString),
          dataAccessorId: S.optional(S.String),
          dataAccessorArn: S.optional(S.String),
          idcApplicationArn: S.optional(S.String),
          principal: S.optional(S.String),
          authenticationDetail: S.optional(__S(1058, __c33, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataAccessor" });
    case 2:
      return S.Array(__S(2721, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          dataAccessors: S.optional(__S(2722, __c85, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataAccessorsResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          dataSourceId: S.optional(S.String),
          type: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataSource" });
    case 2:
      return S.Array(__S(2753, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dataSources: S.optional(__S(2754, __c86, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourcesResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          statusFilter: S.optional(S.String).pipe(T.HttpQuery("syncStatus")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/syncjobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourceSyncJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          documentsAdded: S.optional(S.String),
          documentsModified: S.optional(S.String),
          documentsDeleted: S.optional(S.String),
          documentsFailed: S.optional(S.String),
          documentsScanned: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataSourceSyncJobMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          executionId: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          dataSourceErrorCode: S.optional(S.String),
          metrics: S.optional(__S(2785, __c87, 1)),
        }),
      ).annotate({ identifier: "DataSourceSyncJob" });
    case 3:
      return S.Array(__S(2786, __c87, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ history: S.optional(__S(2787, __c87, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceSyncJobsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          dataSourceIds: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("dataSourceIds")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/index/{indexId}/documents",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDocumentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          documentId: S.optional(S.String),
          status: S.optional(S.String),
          error: S.optional(__S(128, __c4, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DocumentDetails" });
    case 2:
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          documentDetailList: S.optional(__S(2818, __c88, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDocumentsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          updatedEarlierThan: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
            T.HttpQuery("updatedEarlierThan"),
          ),
          dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/indices/{indexId}/groups",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ groupName: S.optional(S.String) })).annotate({
        identifier: "GroupSummary",
      });
    case 2:
      return S.Array(__S(2849, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(2850, __c89, 2)) }),
      ).annotate({ identifier: "ListGroupsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/indices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIndicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(S.String),
          indexId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "Index" });
    case 2:
      return S.Array(__S(2881, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), indices: S.optional(__S(2882, __c90, 2)) }),
      ).annotate({ identifier: "ListIndicesResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          conversationId: S.String.pipe(T.HttpLabel("conversationId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/conversations/{conversationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMessagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messageId: S.optional(S.String),
          body: S.optional(S.String),
          time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          type: S.optional(S.String),
          attachments: S.optional(__S(673, __c21, 1)),
          sourceAttribution: S.optional(__S(587, __c18, 11)),
          actionReview: S.optional(__S(672, __c21, 0)),
          actionExecution: S.optional(__S(578, __c18, 2)),
        }),
      ).annotate({ identifier: "Message" });
    case 2:
      return S.Array(__S(2913, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ messages: S.optional(__S(2914, __c91, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMessagesResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          pluginId: S.String.pipe(T.HttpLabel("pluginId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/plugins/{pluginId}/actions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPluginActionsRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionIdentifier: S.optional(S.String),
          displayName: S.optional(S.String),
          instructionExample: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionSummary" });
    case 1:
      return S.Array(__S(2976, __c93, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(2977, __c93, 1)) }),
      ).annotate({ identifier: "ListPluginActionsResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/plugins" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPluginsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pluginId: S.optional(S.String),
          displayName: S.optional(S.String),
          type: S.optional(S.String),
          serverUrl: S.optional(S.String),
          state: S.optional(S.String),
          buildStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Plugin" });
    case 2:
      return S.Array(__S(3009, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), plugins: S.optional(__S(3010, __c94, 2)) }),
      ).annotate({ identifier: "ListPluginsResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pluginType: S.String.pipe(T.HttpLabel("pluginType")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/pluginTypes/{pluginType}/actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPluginTypeActionsRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/pluginTypeMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPluginTypeMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          category: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PluginTypeMetadataSummary" });
    case 2:
      return S.Array(__S(3073, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(3074, __c96, 2)) }),
      ).annotate({ identifier: "ListPluginTypeMetadataResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/retrievers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRetrieversRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          retrieverId: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Retriever" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ retrievers: S.optional(__S(3106, __c97, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRetrieversResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscriptionId: S.optional(S.String),
          subscriptionArn: S.optional(S.String),
          principal: S.optional(__S(1408, __c44, 0)),
          currentSubscription: S.optional(__S(384, __c12, 0)),
          nextSubscription: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "Subscription" });
    case 2:
      return S.Array(__S(3137, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          subscriptions: S.optional(__S(3138, __c98, 2)),
        }),
      ).annotate({ identifier: "ListSubscriptionsResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String.pipe(T.HttpLabel("resourceARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(801, __c25, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/experiences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebExperiencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          webExperienceId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          defaultEndpoint: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebExperience" });
    case 2:
      return S.Array(__S(3201, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          webExperiences: S.optional(__S(3202, __c100, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWebExperiencesResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usefulness: S.String,
          reason: S.optional(S.String),
          comment: S.optional(S.String),
          submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MessageUsefulnessFeedback" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          conversationId: S.String.pipe(T.HttpLabel("conversationId")),
          messageId: S.String.pipe(T.HttpLabel("messageId")),
          messageCopiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          messageUsefulness: S.optional(__S(3232, __c101, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/feedback",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFeedbackRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupName: S.String, type: S.optional(S.String) }),
      ).annotate({ identifier: "MemberGroup" });
    case 1:
      return S.Array(__S(3264, __c102, 0));
    case 2:
      return S.suspend(() => S.Struct({ userId: S.String, type: S.optional(S.String) })).annotate({
        identifier: "MemberUser",
      });
    case 3:
      return S.Array(__S(3266, __c102, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          memberGroups: S.optional(__S(3265, __c102, 1)),
          memberUsers: S.optional(__S(3267, __c102, 3)),
          s3PathForGroupMembers: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "GroupMembers" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          groupName: S.String,
          dataSourceId: S.optional(S.String),
          type: S.String,
          groupMembers: __S(3268, __c102, 4),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/indices/{indexId}/groups",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutGroupRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ retrieverId: S.String })).annotate({
        identifier: "RetrieverContentSource",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ retriever: __S(3296, __c103, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          queryText: S.String,
          contentSource: __S(3297, __c103, 1),
          attributeFilter: S.optional(__S(513, __c16, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/relevant-content" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchRelevantContentRequest" });
    case 3:
      return S.suspend(() => S.Struct({ scoreConfidence: S.optional(S.String) })).annotate({
        identifier: "ScoreAttributes",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          content: S.optional(S.String),
          documentId: S.optional(S.String),
          documentTitle: S.optional(S.String),
          documentUri: S.optional(S.String),
          documentAttributes: S.optional(__S(320, __c10, 0)),
          scoreAttributes: S.optional(__S(3299, __c103, 3)),
        }),
      ).annotate({ identifier: "RelevantContent" });
    case 5:
      return S.Array(__S(3300, __c103, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          relevantContent: S.optional(__S(3301, __c103, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchRelevantContentResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/startsync",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDataSourceSyncJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ executionId: S.optional(S.String) })).annotate({
        identifier: "StartDataSourceSyncJobResponse",
      });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/stopsync",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDataSourceSyncJobRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
          tags: __S(801, __c25, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceARN}" }),
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
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
          tagKeys: __S(32, __c1, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceARN}" }),
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
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          identityCenterInstanceArn: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          roleArn: S.optional(S.String),
          attachmentsConfiguration: S.optional(__S(928, __c29, 0)),
          qAppsConfiguration: S.optional(__S(896, __c28, 0)),
          personalizationConfiguration: S.optional(__S(897, __c28, 1)),
          autoSubscriptionConfiguration: S.optional(__S(2048, __c64, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/applications/{applicationId}" }),
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
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blockedPhrasesToCreateOrUpdate: S.optional(__S(32, __c1, 0)),
          blockedPhrasesToDelete: S.optional(__S(32, __c1, 0)),
          systemMessageOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlockedPhrasesConfigurationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          responseScope: S.optional(S.String),
          orchestrationConfiguration: S.optional(__S(2112, __c66, 0)),
          blockedPhrasesConfigurationUpdate: S.optional(__S(3488, __c109, 0)),
          topicConfigurationsToCreateOrUpdate: S.optional(__S(2122, __c66, 10)),
          topicConfigurationsToDelete: S.optional(__S(2122, __c66, 10)),
          creatorModeConfiguration: S.optional(__S(2123, __c66, 11)),
          hallucinationReductionConfiguration: S.optional(__S(2124, __c66, 12)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{applicationId}/chatcontrols" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChatControlsConfigurationRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          chatResponseConfigurationId: S.String.pipe(T.HttpLabel("chatResponseConfigurationId")),
          displayName: S.optional(S.String),
          responseConfigurations: __S(994, __c31, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChatResponseConfigurationRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
          actionConfigurations: __S(1090, __c34, 2),
          authenticationDetail: S.optional(__S(1058, __c33, 2)),
          displayName: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataAccessorRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          displayName: S.optional(S.String),
          configuration: S.optional(S.Any),
          vpcConfiguration: S.optional(__S(1152, __c36, 0)),
          description: S.optional(S.String),
          syncSchedule: S.optional(S.String),
          roleArn: S.optional(S.String),
          documentEnrichmentConfiguration: S.optional(__S(261, __c8, 5)),
          mediaExtractionConfiguration: S.optional(__S(265, __c8, 9)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataSourceRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          indexId: S.String.pipe(T.HttpLabel("indexId")),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          capacityConfiguration: S.optional(__S(1216, __c38, 0)),
          documentAttributeConfigurations: S.optional(__S(2337, __c73, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/applications/{applicationId}/indices/{indexId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIndexRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          pluginId: S.String.pipe(T.HttpLabel("pluginId")),
          displayName: S.optional(S.String),
          state: S.optional(S.String),
          serverUrl: S.optional(S.String),
          customPluginConfiguration: S.optional(__S(1285, __c40, 5)),
          authConfiguration: S.optional(__S(1283, __c40, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/applications/{applicationId}/plugins/{pluginId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePluginRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
          configuration: S.optional(__S(1353, __c42, 9)),
          displayName: S.optional(S.String),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/retrievers/{retrieverId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRetrieverRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(3712, __c116, 0));
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
          type: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/subscriptions/{subscriptionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          userAliasesToUpdate: S.optional(__S(1473, __c46, 1)),
          userAliasesToDelete: S.optional(__S(1473, __c46, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/applications/{applicationId}/users/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userAliasesAdded: S.optional(__S(1473, __c46, 1)),
          userAliasesUpdated: S.optional(__S(1473, __c46, 1)),
          userAliasesDeleted: S.optional(__S(1473, __c46, 1)),
        }),
      ).annotate({ identifier: "UpdateUserResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
          roleArn: S.optional(S.String),
          authenticationConfiguration: S.optional(__S(2561, __c80, 1)),
          title: S.optional(S.String),
          subtitle: S.optional(S.String),
          welcomeMessage: S.optional(S.String),
          samplePromptsControlMode: S.optional(S.String),
          identityProviderConfiguration: S.optional(__S(1538, __c48, 2)),
          origins: S.optional(__S(32, __c1, 0)),
          browserExtensionConfiguration: S.optional(__S(1539, __c48, 3)),
          customizationConfiguration: S.optional(__S(1540, __c48, 4)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{applicationId}/experiences/{webExperienceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWebExperienceRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
