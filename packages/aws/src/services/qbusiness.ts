import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "QBusiness",
  target: "ExpertQ",
  version: "2023-11-27",
  sigv4: "qbusiness",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
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
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://qbusiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ExternalResourceException
  extends /*@__PURE__*/ TE.TaggedError("ExternalResourceException", [], {
    status: 424,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class LicenseNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "LicenseNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class MediaTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "MediaTooLargeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
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
  | {
      stringValue: string;
      stringListValue?: never;
      longValue?: never;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue: string[];
      longValue?: never;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      longValue: number;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      longValue?: never;
      dateValue: Date;
    };
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
export type DocumentContent =
  | { blob: Uint8Array; s3?: never }
  | { blob?: never; s3: S3 };
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
export type InlineDocumentEnrichmentConfigurations =
  InlineDocumentEnrichmentConfiguration[];
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
export type ChatMode =
  | "RETRIEVAL_MODE"
  | "CREATOR_MODE"
  | "PLUGIN_MODE"
  | (string & {});
export type PluginId = string;
export interface PluginConfiguration {
  pluginId: string;
}
export type ChatModeConfiguration = {
  pluginConfiguration: PluginConfiguration;
};
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
export type ActionExecutionPayload = {
  [key: string]: ActionExecutionPayloadField | undefined;
};
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
export type SystemMessageType =
  | "RESPONSE"
  | "GROUNDED_RESPONSE"
  | (string & {});
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
export type ActionPayloadFieldType =
  | "STRING"
  | "NUMBER"
  | "ARRAY"
  | "BOOLEAN"
  | (string & {});
export interface ActionReviewPayloadFieldAllowedValue {
  value?: any;
  displayValue?: any;
}
export type ActionReviewPayloadFieldAllowedValues =
  ActionReviewPayloadFieldAllowedValue[];
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
export type ActionReviewPayload = {
  [key: string]: ActionReviewPayloadField | undefined;
};
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
export type ResponseConfigurations = {
  [key in ResponseConfigurationType]?: ResponseConfiguration;
};
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
  attributeValueBoosting?: {
    [key: string]: StringAttributeValueBoostingLevel | undefined;
  };
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
  boostingOverride?: {
    [key: string]: DocumentAttributeBoostingConfiguration | undefined;
  };
}
export type KendraIndexId = string;
export interface KendraIndexConfiguration {
  indexId: string;
}
export type RetrieverConfiguration =
  | {
      nativeIndexConfiguration: NativeIndexConfiguration;
      kendraIndexConfiguration?: never;
    }
  | {
      nativeIndexConfiguration?: never;
      kendraIndexConfiguration: KendraIndexConfiguration;
    };
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
export type WebExperienceSamplePromptsControlMode =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
  | {
      samlConfiguration: SamlProviderConfiguration;
      openIDConnectConfiguration?: never;
    }
  | {
      samlConfiguration?: never;
      openIDConnectConfiguration: OpenIDConnectProviderConfiguration;
    };
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
export type RuleType =
  | "CONTENT_BLOCKER_RULE"
  | "CONTENT_RETRIEVAL_RULE"
  | (string & {});
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
export type HallucinationReductionControl =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export type AttributeType =
  | "STRING"
  | "STRING_LIST"
  | "NUMBER"
  | "DATE"
  | (string & {});
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
export type WebExperienceAuthConfiguration = {
  samlConfiguration: SamlConfiguration;
};
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/policy",
    input: {
      applicationId: 0,
      statementId: 0,
      actions: 0,
      conditions: D.list({
        conditionOperator: 0,
        conditionKey: 0,
        conditionValues: 0,
      }),
      principal: 0,
    },
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
  operationName: "AssociatePermission",
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices/{indexId}/documents/delete",
    input: {
      applicationId: 0,
      indexId: 0,
      documents: D.list({ documentId: 0 }),
      dataSourceSyncId: 0,
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
  operationName: "BatchDeleteDocument",
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices/{indexId}/documents",
    input: {
      applicationId: 0,
      indexId: 0,
      documents: D.list({
        id: 0,
        attributes: D.list(i_DocumentAttribute),
        content: { blob: 0, s3: i_S3 },
        contentType: 0,
        title: 0,
        accessConfiguration: {
          accessControls: D.list({
            principals: D.list({
              user: { id: 0, access: 0, membershipType: 0 },
              group: { name: 0, access: 0, membershipType: 0 },
            }),
            memberRelation: 0,
          }),
          memberRelation: 0,
        },
        documentEnrichmentConfiguration: i_DocumentEnrichmentConfiguration,
        mediaExtractionConfiguration: i_MediaExtractionConfiguration,
      }),
      roleArn: 0,
      dataSourceSyncId: 0,
    },
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
  operationName: "BatchPutDocument",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/subscriptions/{subscriptionId}",
    input: { applicationId: 0, subscriptionId: 0 },
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
  operationName: "CancelSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/conversations",
    input: {
      applicationId: 0,
      userId: D.m({ query: "userId" }),
      userGroups: D.m({ query: "userGroups" }),
      conversationId: D.m({ query: "conversationId" }),
      parentMessageId: D.m({ query: "parentMessageId" }),
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      inputStream: D.m({
        payload: true,
        shape: D.events({
          configurationEvent: {
            chatMode: 0,
            chatModeConfiguration: i_ChatModeConfiguration,
            attributeFilter: i_AttributeFilter,
          },
          textEvent: { userMessage: 0 },
          attachmentEvent: { attachment: i_AttachmentInput },
          actionExecutionEvent: {
            pluginId: 0,
            payload: D.map(i_ActionExecutionPayloadField),
            payloadFieldNameSeparator: 0,
          },
          endOfInputEvent: {},
          authChallengeResponseEvent: { responseMap: 0 },
        }),
      }),
    },
    output: {
      outputStream: D.m({
        payload: true,
        shape: D.events({
          textEvent: 0,
          metadataEvent: { sourceAttributions: D.list(o_SourceAttribution) },
          actionReviewEvent: 0,
          failedAttachmentEvent: 0,
          authChallengeRequestEvent: 0,
        }),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/conversations?sync",
    input: {
      applicationId: 0,
      userId: D.m({ query: "userId" }),
      userGroups: D.m({ query: "userGroups" }),
      userMessage: 0,
      attachments: D.list(i_AttachmentInput),
      actionExecution: {
        pluginId: 0,
        payload: D.map(i_ActionExecutionPayloadField),
        payloadFieldNameSeparator: 0,
      },
      authChallengeResponse: { responseMap: 0 },
      conversationId: 0,
      parentMessageId: 0,
      attributeFilter: i_AttributeFilter,
      chatMode: 0,
      chatModeConfiguration: i_ChatModeConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: { sourceAttributions: D.list(o_SourceAttribution) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/index/{indexId}/users/{userId}/documents/{documentId}/check-document-access",
    input: {
      applicationId: 0,
      indexId: 0,
      userId: 0,
      documentId: 0,
      dataSourceId: D.m({ query: "dataSourceId" }),
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
  operationName: "CheckDocumentAccess",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/experiences/{webExperienceId}/anonymous-url",
    input: {
      applicationId: 0,
      webExperienceId: 0,
      sessionDurationInMinutes: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      displayName: 0,
      roleArn: 0,
      identityType: 0,
      iamIdentityProviderArn: 0,
      identityCenterInstanceArn: 0,
      clientIdsForOIDC: 0,
      description: 0,
      encryptionConfiguration: { kmsKeyId: 0 },
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
      attachmentsConfiguration: i_AttachmentsConfiguration,
      qAppsConfiguration: i_QAppsConfiguration,
      personalizationConfiguration: i_PersonalizationConfiguration,
      quickSightConfiguration: { clientNamespace: 0 },
    },
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
  operationName: "CreateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/chatresponseconfigurations",
    input: {
      applicationId: 0,
      displayName: 0,
      clientToken: D.m({ idempotency: true }),
      responseConfigurations: D.map(i_ResponseConfiguration),
      tags: D.list(i_Tag),
    },
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
  operationName: "CreateChatResponseConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/dataaccessors",
    input: {
      applicationId: 0,
      principal: 0,
      actionConfigurations: D.list(i_ActionConfiguration),
      clientToken: D.m({ idempotency: true }),
      displayName: 0,
      authenticationDetail: i_DataAccessorAuthenticationDetail,
      tags: D.list(i_Tag),
    },
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
  operationName: "CreateDataAccessor",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices/{indexId}/datasources",
    input: {
      applicationId: 0,
      indexId: 0,
      displayName: 0,
      configuration: 0,
      vpcConfiguration: i_DataSourceVpcConfiguration,
      description: 0,
      tags: D.list(i_Tag),
      syncSchedule: 0,
      roleArn: 0,
      clientToken: D.m({ idempotency: true }),
      documentEnrichmentConfiguration: i_DocumentEnrichmentConfiguration,
      mediaExtractionConfiguration: i_MediaExtractionConfiguration,
    },
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
  operationName: "CreateDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices",
    input: {
      applicationId: 0,
      displayName: 0,
      description: 0,
      type: 0,
      tags: D.list(i_Tag),
      capacityConfiguration: i_IndexCapacityConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateIndex",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/plugins",
    input: {
      applicationId: 0,
      displayName: 0,
      type: 0,
      authConfiguration: i_PluginAuthConfiguration,
      serverUrl: 0,
      customPluginConfiguration: i_CustomPluginConfiguration,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreatePlugin",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/retrievers",
    input: {
      applicationId: 0,
      type: 0,
      displayName: 0,
      configuration: i_RetrieverConfiguration,
      roleArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
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
  operationName: "CreateRetriever",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/subscriptions",
    input: {
      applicationId: 0,
      principal: { user: 0, group: 0 },
      type: 0,
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
  operationName: "CreateSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/users",
    input: {
      applicationId: 0,
      userId: 0,
      userAliases: D.list(i_UserAlias),
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/experiences",
    input: {
      applicationId: 0,
      title: 0,
      subtitle: 0,
      welcomeMessage: 0,
      samplePromptsControlMode: 0,
      origins: 0,
      roleArn: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
      identityProviderConfiguration: i_IdentityProviderConfiguration,
      browserExtensionConfiguration: i_BrowserExtensionConfiguration,
      customizationConfiguration: i_CustomizationConfiguration,
    },
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
  operationName: "CreateWebExperience",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}",
    input: { applicationId: 0 },
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
  operationName: "DeleteApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/conversations/{conversationId}/attachments/{attachmentId}",
    input: {
      applicationId: 0,
      conversationId: 0,
      attachmentId: 0,
      userId: D.m({ query: "userId" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/chatcontrols",
    input: { applicationId: 0 },
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
  operationName: "DeleteChatControlsConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
    input: { applicationId: 0, chatResponseConfigurationId: 0 },
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
  operationName: "DeleteChatResponseConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/conversations/{conversationId}",
    input: {
      conversationId: 0,
      applicationId: 0,
      userId: D.m({ query: "userId" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/dataaccessors/{dataAccessorId}",
    input: { applicationId: 0, dataAccessorId: 0 },
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
  operationName: "DeleteDataAccessor",
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
 * Deletes an Amazon Q Business data source connector. While the data source is being deleted, the `Status` field returned by a call to the `DescribeDataSource` API is set to `DELETING`.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
    input: { applicationId: 0, indexId: 0, dataSourceId: 0 },
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
  operationName: "DeleteDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/indices/{indexId}/groups/{groupName}",
    input: {
      applicationId: 0,
      indexId: 0,
      groupName: 0,
      dataSourceId: D.m({ query: "dataSourceId" }),
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
  operationName: "DeleteGroup",
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
 * Deletes an Amazon Q Business index.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/indices/{indexId}",
    input: { applicationId: 0, indexId: 0 },
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
  operationName: "DeleteIndex",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/plugins/{pluginId}",
    input: { applicationId: 0, pluginId: 0 },
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
  operationName: "DeletePlugin",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/retrievers/{retrieverId}",
    input: { applicationId: 0, retrieverId: 0 },
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
  operationName: "DeleteRetriever",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/users/{userId}",
    input: { applicationId: 0, userId: 0 },
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
  operationName: "DeleteUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/experiences/{webExperienceId}",
    input: { applicationId: 0, webExperienceId: 0 },
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
  operationName: "DeleteWebExperience",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/policy/{statementId}",
    input: { applicationId: 0, statementId: 0 },
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
  operationName: "DisassociatePermission",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}",
    input: { applicationId: 0 },
    output: {
      encryptionConfiguration: { kmsKeyId: D.secret },
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/chatcontrols",
    input: {
      applicationId: 0,
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
    input: { applicationId: 0, chatResponseConfigurationId: 0 },
    output: {
      createdAt: D.ts,
      inUseConfiguration: o_ChatResponseConfigurationDetail,
      lastUpdateConfiguration: o_ChatResponseConfigurationDetail,
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
  operationName: "GetChatResponseConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataaccessors/{dataAccessorId}",
    input: { applicationId: 0, dataAccessorId: 0 },
    output: {
      displayName: D.secret,
      actionConfigurations: D.list({
        filterConfiguration: { documentAttributeFilter: o_AttributeFilter },
      }),
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetDataAccessor",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
    input: { applicationId: 0, indexId: 0, dataSourceId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      documentEnrichmentConfiguration: {
        inlineConfigurations: D.list({
          condition: o_DocumentAttributeCondition,
          target: { value: o_DocumentAttributeValue },
        }),
        preExtractionHookConfiguration: o_HookConfiguration,
        postExtractionHookConfiguration: o_HookConfiguration,
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
  operationName: "GetDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/index/{indexId}/documents/{documentId}/content",
    input: {
      applicationId: 0,
      indexId: 0,
      dataSourceId: D.m({ query: "dataSourceId" }),
      documentId: 0,
      outputFormat: D.m({ query: "outputFormat" }),
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
  operationName: "GetDocumentContent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}/groups/{groupName}",
    input: {
      applicationId: 0,
      indexId: 0,
      groupName: 0,
      dataSourceId: D.m({ query: "dataSourceId" }),
    },
    output: {
      status: o_GroupStatusDetail,
      statusHistory: D.list(o_GroupStatusDetail),
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
  operationName: "GetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}",
    input: { applicationId: 0, indexId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetIndex",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/media/{mediaId}",
    input: { applicationId: 0, conversationId: 0, messageId: 0, mediaId: 0 },
    output: { mediaBytes: D.blob },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/plugins/{pluginId}",
    input: { applicationId: 0, pluginId: 0 },
    output: {
      customPluginConfiguration: { apiSchema: { payload: D.secret } },
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetPlugin",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/policy",
    input: { applicationId: 0 },
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
  operationName: "GetPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/retrievers/{retrieverId}",
    input: { applicationId: 0, retrieverId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetRetriever",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/users/{userId}",
    input: { applicationId: 0, userId: 0 },
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
  operationName: "GetUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/experiences/{webExperienceId}",
    input: { applicationId: 0, webExperienceId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetWebExperience",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { applications: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/attachments",
    input: {
      applicationId: 0,
      conversationId: D.m({ query: "conversationId" }),
      userId: D.m({ query: "userId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { attachments: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/chatresponseconfigurations",
    input: {
      applicationId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      chatResponseConfigurations: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/conversations",
    input: {
      applicationId: 0,
      userId: D.m({ query: "userId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { conversations: D.list({ startTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataaccessors",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      dataAccessors: D.list({
        displayName: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}/datasources",
    input: {
      applicationId: 0,
      indexId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { dataSources: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/syncjobs",
    input: {
      dataSourceId: 0,
      applicationId: 0,
      indexId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      statusFilter: D.m({ query: "syncStatus" }),
    },
    output: { history: D.list({ startTime: D.ts, endTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/index/{indexId}/documents",
    input: {
      applicationId: 0,
      indexId: 0,
      dataSourceIds: D.m({ query: "dataSourceIds" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      documentDetailList: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices/{indexId}/groups",
    input: {
      applicationId: 0,
      indexId: 0,
      updatedEarlierThan: D.m({
        query: "updatedEarlierThan",
        shape: D.tsAs("epoch-seconds"),
      }),
      dataSourceId: D.m({ query: "dataSourceId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/indices",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { indices: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/conversations/{conversationId}",
    input: {
      conversationId: 0,
      applicationId: 0,
      userId: D.m({ query: "userId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      messages: D.list({
        time: D.ts,
        sourceAttribution: D.list(o_SourceAttribution),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/plugins/{pluginId}/actions",
    input: {
      applicationId: 0,
      pluginId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/plugins",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { plugins: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
 * Lists configured Amazon Q Business actions for any plugin type—both built-in and custom.
 */
export const listPluginTypeActions: API.PaginatedOperationMethod<
  ListPluginTypeActionsRequest,
  ListPluginTypeActionsResponse,
  ListPluginTypeActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /pluginTypes/{pluginType}/actions",
    input: {
      pluginType: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /pluginTypeMetadata",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/retrievers",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/subscriptions",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceARN}",
    input: { resourceARN: 0 },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/experiences",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { webExperiences: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/feedback",
    input: {
      applicationId: 0,
      userId: D.m({ query: "userId" }),
      conversationId: 0,
      messageId: 0,
      messageCopiedAt: 0,
      messageUsefulness: {
        usefulness: 0,
        reason: 0,
        comment: 0,
        submittedAt: 0,
      },
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
  operationName: "PutFeedback",
})) as any;

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
 * Create, or updates, a mapping of users—who have access to a document—to groups.
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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/indices/{indexId}/groups",
    input: {
      applicationId: 0,
      indexId: 0,
      groupName: 0,
      dataSourceId: 0,
      type: 0,
      groupMembers: {
        memberGroups: D.list({ groupName: 0, type: 0 }),
        memberUsers: D.list({ userId: 0, type: 0 }),
        s3PathForGroupMembers: i_S3,
      },
      roleArn: 0,
    },
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
  operationName: "PutGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/relevant-content",
    input: {
      applicationId: 0,
      queryText: 0,
      contentSource: { retriever: { retrieverId: 0 } },
      attributeFilter: i_AttributeFilter,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      relevantContent: D.list({
        documentAttributes: D.list(o_DocumentAttribute),
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/startsync",
    input: { dataSourceId: 0, applicationId: 0, indexId: 0 },
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
  operationName: "StartDataSourceSyncJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/stopsync",
    input: { dataSourceId: 0, applicationId: 0, indexId: 0 },
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
  operationName: "StopDataSourceSyncJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceARN}",
    input: { resourceARN: 0, tags: D.list(i_Tag) },
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
 * Removes a tag from an Amazon Q Business application or a data source.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceARN}",
    input: { resourceARN: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}",
    input: {
      applicationId: 0,
      identityCenterInstanceArn: 0,
      displayName: 0,
      description: 0,
      roleArn: 0,
      attachmentsConfiguration: i_AttachmentsConfiguration,
      qAppsConfiguration: i_QAppsConfiguration,
      personalizationConfiguration: i_PersonalizationConfiguration,
      autoSubscriptionConfiguration: {
        autoSubscribe: 0,
        defaultSubscriptionType: 0,
      },
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
  operationName: "UpdateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /applications/{applicationId}/chatcontrols",
    input: {
      applicationId: 0,
      clientToken: D.m({ idempotency: true }),
      responseScope: 0,
      orchestrationConfiguration: { control: 0 },
      blockedPhrasesConfigurationUpdate: {
        blockedPhrasesToCreateOrUpdate: 0,
        blockedPhrasesToDelete: 0,
        systemMessageOverride: 0,
      },
      topicConfigurationsToCreateOrUpdate: D.list(i_TopicConfiguration),
      topicConfigurationsToDelete: D.list(i_TopicConfiguration),
      creatorModeConfiguration: { creatorModeControl: 0 },
      hallucinationReductionConfiguration: { hallucinationReductionControl: 0 },
    },
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
  operationName: "UpdateChatControlsConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
    input: {
      applicationId: 0,
      chatResponseConfigurationId: 0,
      displayName: 0,
      responseConfigurations: D.map(i_ResponseConfiguration),
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
  operationName: "UpdateChatResponseConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/dataaccessors/{dataAccessorId}",
    input: {
      applicationId: 0,
      dataAccessorId: 0,
      actionConfigurations: D.list(i_ActionConfiguration),
      authenticationDetail: i_DataAccessorAuthenticationDetail,
      displayName: 0,
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
  operationName: "UpdateDataAccessor",
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
 * Updates an existing Amazon Q Business data source connector.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
    input: {
      applicationId: 0,
      indexId: 0,
      dataSourceId: 0,
      displayName: 0,
      configuration: 0,
      vpcConfiguration: i_DataSourceVpcConfiguration,
      description: 0,
      syncSchedule: 0,
      roleArn: 0,
      documentEnrichmentConfiguration: i_DocumentEnrichmentConfiguration,
      mediaExtractionConfiguration: i_MediaExtractionConfiguration,
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
  operationName: "UpdateDataSource",
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
 * Updates an Amazon Q Business index.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/indices/{indexId}",
    input: {
      applicationId: 0,
      indexId: 0,
      displayName: 0,
      description: 0,
      capacityConfiguration: i_IndexCapacityConfiguration,
      documentAttributeConfigurations: D.list({ name: 0, type: 0, search: 0 }),
    },
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
  operationName: "UpdateIndex",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/plugins/{pluginId}",
    input: {
      applicationId: 0,
      pluginId: 0,
      displayName: 0,
      state: 0,
      serverUrl: 0,
      customPluginConfiguration: i_CustomPluginConfiguration,
      authConfiguration: i_PluginAuthConfiguration,
    },
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
  operationName: "UpdatePlugin",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/retrievers/{retrieverId}",
    input: {
      applicationId: 0,
      retrieverId: 0,
      configuration: i_RetrieverConfiguration,
      displayName: 0,
      roleArn: 0,
    },
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
  operationName: "UpdateRetriever",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/subscriptions/{subscriptionId}",
    input: { applicationId: 0, subscriptionId: 0, type: 0 },
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
  operationName: "UpdateSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/users/{userId}",
    input: {
      applicationId: 0,
      userId: 0,
      userAliasesToUpdate: D.list(i_UserAlias),
      userAliasesToDelete: D.list(i_UserAlias),
    },
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
  operationName: "UpdateUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{applicationId}/experiences/{webExperienceId}",
    input: {
      applicationId: 0,
      webExperienceId: 0,
      roleArn: 0,
      authenticationConfiguration: {
        samlConfiguration: {
          metadataXML: 0,
          roleArn: 0,
          userIdAttribute: 0,
          userGroupAttribute: 0,
        },
      },
      title: 0,
      subtitle: 0,
      welcomeMessage: 0,
      samplePromptsControlMode: 0,
      identityProviderConfiguration: i_IdentityProviderConfiguration,
      origins: 0,
      browserExtensionConfiguration: i_BrowserExtensionConfiguration,
      customizationConfiguration: i_CustomizationConfiguration,
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
  operationName: "UpdateWebExperience",
})) as any;

const i_ActionConfiguration: D.LazyStruct = () => ({
  action: 0,
  filterConfiguration: { documentAttributeFilter: i_AttributeFilter },
});
const i_ActionExecutionPayloadField: D.LazyStruct = () => ({ value: 0 });
const i_AttachmentInput: D.LazyStruct = () => ({
  data: 0,
  name: 0,
  copyFrom: { conversation: { conversationId: 0, attachmentId: 0 } },
});
const i_AttachmentsConfiguration: D.LazyStruct = () => ({
  attachmentsControlMode: 0,
});
const i_AttributeFilter: D.LazyStruct = () => ({
  andAllFilters: D.list(i_AttributeFilter),
  orAllFilters: D.list(i_AttributeFilter),
  notFilter: i_AttributeFilter,
  equalsTo: i_DocumentAttribute,
  containsAll: i_DocumentAttribute,
  containsAny: i_DocumentAttribute,
  greaterThan: i_DocumentAttribute,
  greaterThanOrEquals: i_DocumentAttribute,
  lessThan: i_DocumentAttribute,
  lessThanOrEquals: i_DocumentAttribute,
});
const i_BrowserExtensionConfiguration: D.LazyStruct = () => ({
  enabledBrowserExtensions: 0,
});
const i_ChatModeConfiguration: D.LazyStruct = () => ({
  pluginConfiguration: { pluginId: 0 },
});
const i_CustomPluginConfiguration: D.LazyStruct = () => ({
  description: 0,
  apiSchemaType: 0,
  apiSchema: { payload: 0, s3: i_S3 },
});
const i_CustomizationConfiguration: D.LazyStruct = () => ({
  customCSSUrl: 0,
  logoUrl: 0,
  fontUrl: 0,
  faviconUrl: 0,
});
const i_DataAccessorAuthenticationDetail: D.LazyStruct = () => ({
  authenticationType: 0,
  authenticationConfiguration: {
    idcTrustedTokenIssuerConfiguration: { idcTrustedTokenIssuerArn: 0 },
  },
  externalIds: 0,
});
const i_DataSourceVpcConfiguration: D.LazyStruct = () => ({
  subnetIds: 0,
  securityGroupIds: 0,
});
const i_DocumentAttribute: D.LazyStruct = () => ({
  name: 0,
  value: i_DocumentAttributeValue,
});
const i_DocumentEnrichmentConfiguration: D.LazyStruct = () => ({
  inlineConfigurations: D.list({
    condition: i_DocumentAttributeCondition,
    target: {
      key: 0,
      value: i_DocumentAttributeValue,
      attributeValueOperator: 0,
    },
    documentContentOperator: 0,
  }),
  preExtractionHookConfiguration: i_HookConfiguration,
  postExtractionHookConfiguration: i_HookConfiguration,
});
const i_IdentityProviderConfiguration: D.LazyStruct = () => ({
  samlConfiguration: { authenticationUrl: 0 },
  openIDConnectConfiguration: { secretsArn: 0, secretsRole: 0 },
});
const i_IndexCapacityConfiguration: D.LazyStruct = () => ({ units: 0 });
const i_MediaExtractionConfiguration: D.LazyStruct = () => ({
  imageExtractionConfiguration: { imageExtractionStatus: 0 },
  audioExtractionConfiguration: { audioExtractionStatus: 0 },
  videoExtractionConfiguration: { videoExtractionStatus: 0 },
});
const i_PersonalizationConfiguration: D.LazyStruct = () => ({
  personalizationControlMode: 0,
});
const i_PluginAuthConfiguration: D.LazyStruct = () => ({
  basicAuthConfiguration: { secretArn: 0, roleArn: 0 },
  oAuth2ClientCredentialConfiguration: {
    secretArn: 0,
    roleArn: 0,
    authorizationUrl: 0,
    tokenUrl: 0,
  },
  noAuthConfiguration: {},
  idcAuthConfiguration: { idcApplicationArn: 0, roleArn: 0 },
});
const i_QAppsConfiguration: D.LazyStruct = () => ({ qAppsControlMode: 0 });
const i_ResponseConfiguration: D.LazyStruct = () => ({
  instructionCollection: {
    responseLength: 0,
    targetAudience: 0,
    perspective: 0,
    outputStyle: 0,
    identity: 0,
    tone: 0,
    customInstructions: 0,
    examples: 0,
  },
});
const i_RetrieverConfiguration: D.LazyStruct = () => ({
  nativeIndexConfiguration: {
    indexId: 0,
    version: 0,
    boostingOverride: D.map({
      numberConfiguration: { boostingLevel: 0, boostingType: 0 },
      stringConfiguration: { boostingLevel: 0, attributeValueBoosting: 0 },
      dateConfiguration: { boostingLevel: 0, boostingDurationInSeconds: 0 },
      stringListConfiguration: { boostingLevel: 0 },
    }),
  },
  kendraIndexConfiguration: { indexId: 0 },
});
const i_S3: D.LazyStruct = () => ({ bucket: 0, key: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TopicConfiguration: D.LazyStruct = () => ({
  name: 0,
  description: 0,
  exampleChatMessages: 0,
  rules: D.list({
    includedUsersAndGroups: i_UsersAndGroups,
    excludedUsersAndGroups: i_UsersAndGroups,
    ruleType: 0,
    ruleConfiguration: {
      contentBlockerRule: { systemMessageOverride: 0 },
      contentRetrievalRule: {
        eligibleDataSources: D.list({ indexId: 0, dataSourceId: 0 }),
      },
    },
  }),
});
const i_UserAlias: D.LazyStruct = () => ({
  indexId: 0,
  dataSourceId: 0,
  userId: 0,
});
const o_AttributeFilter: D.LazyStruct = () => ({
  andAllFilters: D.list(o_AttributeFilter),
  orAllFilters: D.list(o_AttributeFilter),
  notFilter: o_AttributeFilter,
  equalsTo: o_DocumentAttribute,
  containsAll: o_DocumentAttribute,
  containsAny: o_DocumentAttribute,
  greaterThan: o_DocumentAttribute,
  greaterThanOrEquals: o_DocumentAttribute,
  lessThan: o_DocumentAttribute,
  lessThanOrEquals: o_DocumentAttribute,
});
const o_ChatResponseConfigurationDetail: D.LazyStruct = () => ({
  updatedAt: D.ts,
});
const o_DocumentAttribute: D.LazyStruct = () => ({
  value: o_DocumentAttributeValue,
});
const o_DocumentAttributeCondition: D.LazyStruct = () => ({
  value: o_DocumentAttributeValue,
});
const o_DocumentAttributeValue: D.LazyStruct = () => ({ dateValue: D.ts });
const o_GroupStatusDetail: D.LazyStruct = () => ({ lastUpdatedAt: D.ts });
const o_HookConfiguration: D.LazyStruct = () => ({
  invocationCondition: o_DocumentAttributeCondition,
});
const o_SourceAttribution: D.LazyStruct = () => ({ updatedAt: D.ts });
const i_DocumentAttributeCondition: D.LazyStruct = () => ({
  key: 0,
  operator: 0,
  value: i_DocumentAttributeValue,
});
const i_DocumentAttributeValue: D.LazyStruct = () => ({
  stringValue: 0,
  stringListValue: 0,
  longValue: 0,
  dateValue: 0,
});
const i_HookConfiguration: D.LazyStruct = () => ({
  invocationCondition: i_DocumentAttributeCondition,
  lambdaArn: 0,
  s3BucketName: 0,
  roleArn: 0,
});
const i_UsersAndGroups: D.LazyStruct = () => ({ userIds: 0, userGroups: 0 });
