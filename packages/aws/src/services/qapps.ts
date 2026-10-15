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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "QApps", serviceShapeName: "QAppsService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "qapps" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-11-27");
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
              `https://data.qapps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.qapps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://data.qapps.{R}.{D}","properties":{},"headers":{}}');

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
export class ContentTooLargeException
  extends /*@__PURE__*/ S.TaggedError<ContentTooLargeException>()(
    "ContentTooLargeException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: S.String,
      quotaCode: S.String,
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InstanceId = string;
export type UUID = string;
export interface AssociateLibraryItemReviewInput {
  instanceId: string;
  libraryItemId: string;
}
export interface AssociateLibraryItemReviewResponse {}
export interface AssociateQAppWithUserInput {
  instanceId: string;
  appId: string;
}
export interface AssociateQAppWithUserResponse {}
export interface BatchCreateCategoryInputCategory {
  id?: string;
  title: string;
  color?: string;
}
export type BatchCreateCategoryInputCategoryList = BatchCreateCategoryInputCategory[];
export interface BatchCreateCategoryInput {
  instanceId: string;
  categories: BatchCreateCategoryInputCategory[];
}
export interface BatchCreateCategoryResponse {}
export type DeleteCategoryInputList = string[];
export interface BatchDeleteCategoryInput {
  instanceId: string;
  categories: string[];
}
export interface BatchDeleteCategoryResponse {}
export interface CategoryInput {
  id: string;
  title: string;
  color?: string;
}
export type CategoryListInput = CategoryInput[];
export interface BatchUpdateCategoryInput {
  instanceId: string;
  categories: CategoryInput[];
}
export interface BatchUpdateCategoryResponse {}
export type AppVersion = number;
export type CategoryIdList = string[];
export interface CreateLibraryItemInput {
  instanceId: string;
  appId: string;
  appVersion: number;
  categories: string[];
}
export type QAppsTimestamp = Date;
export interface CreateLibraryItemOutput {
  libraryItemId: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isVerified?: boolean;
}
export type Filename = string;
export type DocumentScope = "APPLICATION" | "SESSION" | (string & {});
export interface CreatePresignedUrlInput {
  instanceId: string;
  cardId: string;
  appId: string;
  fileContentsSha256: string;
  fileName: string;
  scope: DocumentScope;
  sessionId?: string;
}
export type PresignedUrlFields = { [key: string]: string | undefined };
export interface CreatePresignedUrlOutput {
  fileId: string;
  presignedUrl: string;
  presignedUrlFields: { [key: string]: string | undefined };
  presignedUrlExpiration: Date;
}
export type Title = string;
export type Description = string;
export type CardType =
  | "text-input"
  | "q-query"
  | "file-upload"
  | "q-plugin"
  | "form-input"
  | (string & {});
export type Placeholder = string;
export type Default = string;
export interface TextInputCardInput {
  title: string;
  id: string;
  type: CardType;
  placeholder?: string;
  defaultValue?: string;
}
export type Prompt = string;
export type CardOutputSource = "approved-sources" | "llm" | (string & {});
export type AttributeFilters = AttributeFilter[];
export type DocumentAttributeKey = string;
export type DocumentAttributeStringValue = string;
export type PlatoString = string;
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
export interface QQueryCardInput {
  title: string;
  id: string;
  type: CardType;
  prompt: string;
  outputSource?: CardOutputSource;
  attributeFilter?: AttributeFilter;
}
export type PluginId = string;
export type ActionIdentifier = string;
export interface QPluginCardInput {
  title: string;
  id: string;
  type: CardType;
  prompt: string;
  pluginId: string;
  actionIdentifier?: string;
}
export interface FileUploadCardInput {
  title: string;
  id: string;
  type: CardType;
  filename?: string;
  fileId?: string;
  allowOverride?: boolean;
}
export type FormInputCardMetadataSchema = unknown;
export interface FormInputCardMetadata {
  schema: any;
}
export type InputCardComputeMode = "append" | "replace" | (string & {});
export interface FormInputCardInput {
  title: string;
  id: string;
  type: CardType;
  metadata: FormInputCardMetadata;
  computeMode?: InputCardComputeMode;
}
export type CardInput =
  | {
      textInput: TextInputCardInput;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery: QQueryCardInput;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin: QPluginCardInput;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload: FileUploadCardInput;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput: FormInputCardInput;
    };
export type CardList = CardInput[];
export type InitialPrompt = string;
export interface AppDefinitionInput {
  cards: CardInput[];
  initialPrompt?: string;
}
export type TagMap = { [key: string]: string | undefined };
export interface CreateQAppInput {
  instanceId: string;
  title: string;
  description?: string;
  appDefinition: AppDefinitionInput;
  tags?: { [key: string]: string | undefined };
}
export type AppArn = string;
export type AppStatus = "PUBLISHED" | "DRAFT" | "DELETED" | (string & {});
export type AppRequiredCapability =
  | "FileUpload"
  | "CreatorMode"
  | "RetrievalMode"
  | "PluginMode"
  | (string & {});
export type AppRequiredCapabilities = AppRequiredCapability[];
export interface CreateQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
}
export interface DeleteLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
}
export interface DeleteLibraryItemResponse {}
export interface DeleteQAppInput {
  instanceId: string;
  appId: string;
}
export interface DeleteQAppResponse {}
export interface DescribeQAppPermissionsInput {
  instanceId: string;
  appId: string;
}
export type Action = "read" | "write" | (string & {});
export type UserType = "owner" | "user" | (string & {});
export interface PrincipalOutput {
  userId?: string;
  userType?: UserType;
  email?: string;
}
export interface PermissionOutput {
  action: Action;
  principal: PrincipalOutput;
}
export type PermissionsOutputList = PermissionOutput[];
export interface DescribeQAppPermissionsOutput {
  resourceArn?: string;
  appId?: string;
  permissions?: PermissionOutput[];
}
export interface DisassociateLibraryItemReviewInput {
  instanceId: string;
  libraryItemId: string;
}
export interface DisassociateLibraryItemReviewResponse {}
export interface DisassociateQAppFromUserInput {
  instanceId: string;
  appId: string;
}
export interface DisassociateQAppFromUserResponse {}
export interface ExportQAppSessionDataInput {
  instanceId: string;
  sessionId: string;
}
export interface ExportQAppSessionDataOutput {
  csvFileLink: string;
  expiresAt: Date;
  sessionArn: string;
}
export interface GetLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
  appId?: string;
}
export interface Category {
  id: string;
  title: string;
  color?: string;
  appCount?: number;
}
export type CategoryList = Category[];
export interface GetLibraryItemOutput {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export interface GetQAppInput {
  instanceId: string;
  appId: string;
  appVersion?: number;
}
export type DependencyList = string[];
export interface TextInputCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  placeholder?: string;
  defaultValue?: string;
}
export type MemoryReferenceList = string[];
export interface QQueryCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  prompt: string;
  outputSource: CardOutputSource;
  attributeFilter?: AttributeFilter;
  memoryReferences?: string[];
}
export type PluginType =
  | "SERVICE_NOW"
  | "SALESFORCE"
  | "JIRA"
  | "ZENDESK"
  | "CUSTOM"
  | "ASANA"
  | "ATLASSIAN_CONFLUENCE"
  | "GOOGLE_CALENDAR"
  | "JIRA_CLOUD"
  | "MICROSOFT_EXCHANGE"
  | "MICROSOFT_TEAMS"
  | "PAGERDUTY_ADVANCE"
  | "SALESFORCE_CRM"
  | "SERVICENOW_NOW_PLATFORM"
  | "SMARTSHEET"
  | "ZENDESK_SUITE"
  | (string & {});
export interface QPluginCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  prompt: string;
  pluginType: PluginType;
  pluginId: string;
  actionIdentifier?: string;
}
export interface FileUploadCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  filename?: string;
  fileId?: string;
  allowOverride?: boolean;
}
export interface FormInputCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  metadata: FormInputCardMetadata;
  computeMode?: InputCardComputeMode;
}
export type Card =
  | {
      textInput: TextInputCard;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery: QQueryCard;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin: QPluginCard;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload: FileUploadCard;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput: FormInputCard;
    };
export type CardModelList = Card[];
export interface AppDefinition {
  appDefinitionVersion: string;
  cards: Card[];
  canEdit?: boolean;
}
export interface GetQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
  appDefinition: AppDefinition;
}
export interface GetQAppSessionInput {
  instanceId: string;
  sessionId: string;
}
export type SessionName = string;
export type ExecutionStatus = "IN_PROGRESS" | "WAITING" | "COMPLETED" | "ERROR" | (string & {});
export interface Submission {
  value?: any;
  submissionId?: string;
  timestamp?: Date;
}
export type SubmissionList = Submission[];
export interface CardStatus {
  currentState: ExecutionStatus;
  currentValue: string;
  submissions?: Submission[];
}
export type CardStatusMap = { [key: string]: CardStatus | undefined };
export interface GetQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  appVersion?: number;
  latestPublishedAppVersion?: number;
  status: ExecutionStatus;
  cardStatus: { [key: string]: CardStatus | undefined };
  userIsHost?: boolean;
}
export interface GetQAppSessionMetadataInput {
  instanceId: string;
  sessionId: string;
}
export type SessionSharingEnabled = boolean;
export type SessionSharingAcceptResponses = boolean;
export type SessionSharingRevealCards = boolean;
export interface SessionSharingConfiguration {
  enabled: boolean;
  acceptResponses?: boolean;
  revealCards?: boolean;
}
export interface GetQAppSessionMetadataOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
  sessionOwner?: boolean;
}
export interface ImportDocumentInput {
  instanceId: string;
  cardId: string;
  appId: string;
  fileContentsBase64: string;
  fileName: string;
  scope: DocumentScope;
  sessionId?: string;
}
export interface ImportDocumentOutput {
  fileId?: string;
}
export interface ListCategoriesInput {
  instanceId: string;
}
export type CategoriesList = Category[];
export interface ListCategoriesOutput {
  categories?: Category[];
}
export type PageLimit = number;
export type PaginationToken = string;
export interface ListLibraryItemsInput {
  instanceId: string;
  limit?: number;
  nextToken?: string;
  categoryId?: string;
}
export interface LibraryItemMember {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export type LibraryItemList = LibraryItemMember[];
export interface ListLibraryItemsOutput {
  libraryItems?: LibraryItemMember[];
  nextToken?: string;
}
export interface ListQAppsInput {
  instanceId: string;
  limit?: number;
  nextToken?: string;
}
export interface UserAppItem {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  createdAt: Date;
  canEdit?: boolean;
  status?: string;
  isVerified?: boolean;
}
export type UserAppsList = UserAppItem[];
export interface ListQAppsOutput {
  apps: UserAppItem[];
  nextToken?: string;
}
export interface ListQAppSessionDataInput {
  instanceId: string;
  sessionId: string;
}
export type UserId = string;
export interface User {
  userId?: string;
}
export interface QAppSessionData {
  cardId: string;
  value?: any;
  user: User;
  submissionId?: string;
  timestamp?: Date;
}
export type QAppSessionDataList = QAppSessionData[];
export interface ListQAppSessionDataOutput {
  sessionId: string;
  sessionArn: string;
  sessionData?: QAppSessionData[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type Sender = "USER" | "SYSTEM" | (string & {});
export interface ConversationMessage {
  body: string;
  type: Sender;
}
export type MessageList = ConversationMessage[];
export type PredictQAppInputOptions =
  | { conversation: ConversationMessage[]; problemStatement?: never }
  | { conversation?: never; problemStatement: string };
export interface PredictQAppInput {
  instanceId: string;
  options?: PredictQAppInputOptions;
}
export interface PredictAppDefinition {
  title: string;
  description?: string;
  appDefinition: AppDefinitionInput;
}
export interface PredictQAppOutput {
  app: PredictAppDefinition;
  problemStatement: string;
}
export type SubmissionMutationKind = "edit" | "delete" | "add" | (string & {});
export interface SubmissionMutation {
  submissionId: string;
  mutationType: SubmissionMutationKind;
}
export interface CardValue {
  cardId: string;
  value: string;
  submissionMutation?: SubmissionMutation;
}
export type CardValueList = CardValue[];
export interface StartQAppSessionInput {
  instanceId: string;
  appId: string;
  appVersion: number;
  initialValues?: CardValue[];
  sessionId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
}
export interface StopQAppSessionInput {
  instanceId: string;
  sessionId: string;
}
export interface StopQAppSessionResponse {}
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type LibraryItemStatus = "PUBLISHED" | "DISABLED" | (string & {});
export interface UpdateLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
  status?: LibraryItemStatus;
  categories?: string[];
}
export interface UpdateLibraryItemOutput {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export interface UpdateLibraryItemMetadataInput {
  instanceId: string;
  libraryItemId: string;
  isVerified?: boolean;
}
export interface UpdateLibraryItemMetadataResponse {}
export interface UpdateQAppInput {
  instanceId: string;
  appId: string;
  title?: string;
  description?: string;
  appDefinition?: AppDefinitionInput;
}
export interface UpdateQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
}
export interface PermissionInput {
  action: Action;
  principal: string;
}
export type PermissionsInputList = PermissionInput[];
export interface UpdateQAppPermissionsInput {
  instanceId: string;
  appId: string;
  grantPermissions?: PermissionInput[];
  revokePermissions?: PermissionInput[];
}
export interface UpdateQAppPermissionsOutput {
  resourceArn?: string;
  appId?: string;
  permissions?: PermissionOutput[];
}
export interface UpdateQAppSessionInput {
  instanceId: string;
  sessionId: string;
  values?: CardValue[];
}
export interface UpdateQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
}
export interface UpdateQAppSessionMetadataInput {
  instanceId: string;
  sessionId: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
}
export interface UpdateQAppSessionMetadataOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
}
export type AssociateLibraryItemReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Associates a rating or review for a library item with the user submitting the request. This increments the rating count for the specified library item.
 */
export const associateLibraryItemReview: API.OperationMethod<
  AssociateLibraryItemReviewInput,
  AssociateLibraryItemReviewResponse,
  AssociateLibraryItemReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<AssociateLibraryItemReviewInput>,
  output: __S(736, __c46, 0) as any as S.Schema<AssociateLibraryItemReviewResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLibraryItemReview",
}));

export type AssociateQAppWithUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a link between the user's identity calling the operation and a specific Q App. This is useful to mark the Q App as a *favorite* for the user if the user doesn't own the Amazon Q App so they can still run it and see it in their inventory of Q Apps.
 */
export const associateQAppWithUser: API.OperationMethod<
  AssociateQAppWithUserInput,
  AssociateQAppWithUserResponse,
  AssociateQAppWithUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateQAppWithUserInput>,
  output: __S(736, __c46, 0) as any as S.Schema<AssociateQAppWithUserResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQAppWithUser",
}));

export type BatchCreateCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchCreateCategory: API.OperationMethod<
  BatchCreateCategoryInput,
  BatchCreateCategoryResponse,
  BatchCreateCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(18, __c1, 2) as any as S.Schema<BatchCreateCategoryInput>,
  output: __S(736, __c46, 0) as any as S.Schema<BatchCreateCategoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateCategory",
}));

export type BatchDeleteCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchDeleteCategory: API.OperationMethod<
  BatchDeleteCategoryInput,
  BatchDeleteCategoryResponse,
  BatchDeleteCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<BatchDeleteCategoryInput>,
  output: __S(736, __c46, 0) as any as S.Schema<BatchDeleteCategoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCategory",
}));

export type BatchUpdateCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchUpdateCategory: API.OperationMethod<
  BatchUpdateCategoryInput,
  BatchUpdateCategoryResponse,
  BatchUpdateCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(66, __c4, 2) as any as S.Schema<BatchUpdateCategoryInput>,
  output: __S(736, __c46, 0) as any as S.Schema<BatchUpdateCategoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCategory",
}));

export type CreateLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new library item for an Amazon Q App, allowing it to be discovered and used by other allowed users.
 */
export const createLibraryItem: API.OperationMethod<
  CreateLibraryItemInput,
  CreateLibraryItemOutput,
  CreateLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateLibraryItemInput>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateLibraryItemOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLibraryItem",
}));

export type CreatePresignedUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a presigned URL for an S3 POST operation to upload a file. You can use this URL to set a default file for a `FileUploadCard` in a Q App definition or to provide a file for a single Q App run. The `scope` parameter determines how the file will be used, either at the app definition level or the app session level.
 *
 * The IAM permissions are derived from the `qapps:ImportDocument` action. For more information on the IAM policy for Amazon Q Apps, see IAM permissions for using Amazon Q Apps.
 */
export const createPresignedUrl: API.OperationMethod<
  CreatePresignedUrlInput,
  CreatePresignedUrlOutput,
  CreatePresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreatePresignedUrlInput>,
  output: __S(97, __c6, 1) as any as S.Schema<CreatePresignedUrlOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedUrl",
}));

export type CreateQAppError =
  | AccessDeniedException
  | ConflictException
  | ContentTooLargeException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon Q App based on the provided definition. The Q App definition specifies the cards and flow of the Q App. This operation also calculates the dependencies between the cards by inspecting the references in the prompts.
 */
export const createQApp: API.OperationMethod<
  CreateQAppInput,
  CreateQAppOutput,
  CreateQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateQAppInput>,
  output: __S(192, __c12, 0) as any as S.Schema<CreateQAppOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ContentTooLargeException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQApp",
}));

export type DeleteLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a library item for an Amazon Q App, removing it from the library so it can no longer be discovered or used by other users.
 */
export const deleteLibraryItem: API.OperationMethod<
  DeleteLibraryItemInput,
  DeleteLibraryItemResponse,
  DeleteLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteLibraryItemInput>,
  output: __S(736, __c46, 0) as any as S.Schema<DeleteLibraryItemResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLibraryItem",
}));

export type DeleteQAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q App owned by the user. If the Q App was previously published to the library, it is also removed from the library.
 */
export const deleteQApp: API.OperationMethod<
  DeleteQAppInput,
  DeleteQAppResponse,
  DeleteQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteQAppInput>,
  output: __S(736, __c46, 0) as any as S.Schema<DeleteQAppResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQApp",
}));

export type DescribeQAppPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Describes read permissions for a Amazon Q App in Amazon Q Business application environment instance.
 */
export const describeQAppPermissions: API.OperationMethod<
  DescribeQAppPermissionsInput,
  DescribeQAppPermissionsOutput,
  DescribeQAppPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeQAppPermissionsInput>,
  output: __S(259, __c16, 3) as any as S.Schema<DescribeQAppPermissionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQAppPermissions",
}));

export type DisassociateLibraryItemReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Removes a rating or review previously submitted by the user for a library item.
 */
export const disassociateLibraryItemReview: API.OperationMethod<
  DisassociateLibraryItemReviewInput,
  DisassociateLibraryItemReviewResponse,
  DisassociateLibraryItemReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DisassociateLibraryItemReviewInput>,
  output: __S(736, __c46, 0) as any as S.Schema<DisassociateLibraryItemReviewResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLibraryItemReview",
}));

export type DisassociateQAppFromUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a Q App from a user removing the user's access to run the Q App.
 */
export const disassociateQAppFromUser: API.OperationMethod<
  DisassociateQAppFromUserInput,
  DisassociateQAppFromUserResponse,
  DisassociateQAppFromUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DisassociateQAppFromUserInput>,
  output: __S(736, __c46, 0) as any as S.Schema<DisassociateQAppFromUserResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQAppFromUser",
}));

export type ExportQAppSessionDataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Exports the collected data of a Q App data collection session.
 */
export const exportQAppSessionData: API.OperationMethod<
  ExportQAppSessionDataInput,
  ExportQAppSessionDataOutput,
  ExportQAppSessionDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ExportQAppSessionDataInput>,
  output: __S(305, __c19, 1) as any as S.Schema<ExportQAppSessionDataOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportQAppSessionData",
}));

export type GetLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a library item for an Amazon Q App, including its metadata, categories, ratings, and usage statistics.
 */
export const getLibraryItem: API.OperationMethod<
  GetLibraryItemInput,
  GetLibraryItemOutput,
  GetLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetLibraryItemInput>,
  output: __S(352, __c22, 0) as any as S.Schema<GetLibraryItemOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLibraryItem",
}));

export type GetQAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full details of an Q App, including its definition specifying the cards and flow.
 */
export const getQApp: API.OperationMethod<
  GetQAppInput,
  GetQAppOutput,
  GetQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetQAppInput>,
  output: __S(377, __c23, 9) as any as S.Schema<GetQAppOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQApp",
}));

export type GetQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state and results for an active session of an Amazon Q App.
 */
export const getQAppSession: API.OperationMethod<
  GetQAppSessionInput,
  GetQAppSessionOutput,
  GetQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetQAppSessionInput>,
  output: __S(389, __c24, 5) as any as S.Schema<GetQAppSessionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQAppSession",
}));

export type GetQAppSessionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current configuration of a Q App session.
 */
export const getQAppSessionMetadata: API.OperationMethod<
  GetQAppSessionMetadataInput,
  GetQAppSessionMetadataOutput,
  GetQAppSessionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetQAppSessionMetadataInput>,
  output: __S(401, __c25, 1) as any as S.Schema<GetQAppSessionMetadataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQAppSessionMetadata",
}));

export type ImportDocumentError =
  | AccessDeniedException
  | ContentTooLargeException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Uploads a file that can then be used either as a default in a `FileUploadCard` from Q App definition or as a file that is used inside a single Q App run. The purpose of the document is determined by a scope parameter that indicates whether it is at the app definition level or at the app session level.
 */
export const importDocument: API.OperationMethod<
  ImportDocumentInput,
  ImportDocumentOutput,
  ImportDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ImportDocumentInput>,
  output: __S(433, __c27, 1) as any as S.Schema<ImportDocumentOutput>,
  errors: [
    AccessDeniedException,
    ContentTooLargeException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDocument",
}));

export type ListCategoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the categories of a Amazon Q Business application environment instance. For more information, see Custom labels for Amazon Q Apps.
 */
export const listCategories: API.OperationMethod<
  ListCategoriesInput,
  ListCategoriesOutput,
  ListCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListCategoriesInput>,
  output: __S(449, __c28, 1) as any as S.Schema<ListCategoriesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCategories",
}));

export type ListLibraryItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the library items for Amazon Q Apps that are published and available for users in your Amazon Web Services account.
 */
export const listLibraryItems: API.PaginatedOperationMethod<
  ListLibraryItemsInput,
  ListLibraryItemsOutput,
  ListLibraryItemsError,
  Credentials | HttpClient.HttpClient,
  LibraryItemMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListLibraryItemsInput>,
  output: __S(466, __c29, 2) as any as S.Schema<ListLibraryItemsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLibraryItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "libraryItems",
    pageSize: "limit",
  } as const,
})) as any;

export type ListQAppsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Q Apps owned by or associated with the user either because they created it or because they used it from the library in the past. The user identity is extracted from the credentials used to invoke this operation..
 */
export const listQApps: API.PaginatedOperationMethod<
  ListQAppsInput,
  ListQAppsOutput,
  ListQAppsError,
  Credentials | HttpClient.HttpClient,
  UserAppItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListQAppsInput>,
  output: __S(483, __c30, 3) as any as S.Schema<ListQAppsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQApps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apps",
    pageSize: "limit",
  } as const,
})) as any;

export type ListQAppSessionDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the collected data of a Q App data collection session.
 */
export const listQAppSessionData: API.OperationMethod<
  ListQAppSessionDataInput,
  ListQAppSessionDataOutput,
  ListQAppSessionDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListQAppSessionDataInput>,
  output: __S(500, __c31, 4) as any as S.Schema<ListQAppSessionDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQAppSessionData",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an Amazon Q Apps resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type PredictQAppError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Generates an Amazon Q App definition based on either a conversation or a problem statement provided as input.The resulting app definition can be used to call `CreateQApp`. This API doesn't create Amazon Q Apps directly.
 */
export const predictQApp: API.OperationMethod<
  PredictQAppInput,
  PredictQAppOutput,
  PredictQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(531, __c33, 3) as any as S.Schema<PredictQAppInput>,
  output: __S(533, __c33, 5) as any as S.Schema<PredictQAppOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PredictQApp",
}));

export type StartQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new session for an Amazon Q App, allowing inputs to be provided and the app to be run.
 *
 * Each Q App session will be condensed into a single conversation in the web experience.
 */
export const startQAppSession: API.OperationMethod<
  StartQAppSessionInput,
  StartQAppSessionOutput,
  StartQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<StartQAppSessionInput>,
  output: __S(563, __c35, 3) as any as S.Schema<StartQAppSessionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQAppSession",
}));

export type StopQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops an active session for an Amazon Q App.This deletes all data related to the session and makes it invalid for future uses. The results of the session will be persisted as part of the conversation.
 */
export const stopQAppSession: API.OperationMethod<
  StopQAppSessionInput,
  StopQAppSessionResponse,
  StopQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<StopQAppSessionInput>,
  output: __S(736, __c46, 0) as any as S.Schema<StopQAppSessionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQAppSession",
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
 * Associates tags with an Amazon Q Apps resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(736, __c46, 0) as any as S.Schema<TagResourceResponse>,
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
 * Disassociates tags from an Amazon Q Apps resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(736, __c46, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateLibraryItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the library item for an Amazon Q App.
 */
export const updateLibraryItem: API.OperationMethod<
  UpdateLibraryItemInput,
  UpdateLibraryItemOutput,
  UpdateLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<UpdateLibraryItemInput>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateLibraryItemOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLibraryItem",
}));

export type UpdateLibraryItemMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the verification status of a library item for an Amazon Q App.
 */
export const updateLibraryItemMetadata: API.OperationMethod<
  UpdateLibraryItemMetadataInput,
  UpdateLibraryItemMetadataResponse,
  UpdateLibraryItemMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<UpdateLibraryItemMetadataInput>,
  output: __S(736, __c46, 0) as any as S.Schema<UpdateLibraryItemMetadataResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLibraryItemMetadata",
}));

export type UpdateQAppError =
  | AccessDeniedException
  | ContentTooLargeException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q App, allowing modifications to its title, description, and definition.
 */
export const updateQApp: API.OperationMethod<
  UpdateQAppInput,
  UpdateQAppOutput,
  UpdateQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<UpdateQAppInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateQAppOutput>,
  errors: [
    AccessDeniedException,
    ContentTooLargeException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQApp",
}));

export type UpdateQAppPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates read permissions for a Amazon Q App in Amazon Q Business application environment instance.
 */
export const updateQAppPermissions: API.OperationMethod<
  UpdateQAppPermissionsInput,
  UpdateQAppPermissionsOutput,
  UpdateQAppPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(674, __c42, 2) as any as S.Schema<UpdateQAppPermissionsInput>,
  output: __S(259, __c16, 3) as any as S.Schema<UpdateQAppPermissionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppPermissions",
}));

export type UpdateQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the session for a given Q App `sessionId`. This is only valid when at least one card of the session is in the `WAITING` state. Data for each `WAITING` card can be provided as input. If inputs are not provided, the call will be accepted but session will not move forward. Inputs for cards that are not in the `WAITING` status will be ignored.
 */
export const updateQAppSession: API.OperationMethod<
  UpdateQAppSessionInput,
  UpdateQAppSessionOutput,
  UpdateQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateQAppSessionInput>,
  output: __S(563, __c35, 3) as any as S.Schema<UpdateQAppSessionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppSession",
}));

export type UpdateQAppSessionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration metadata of a session for a given Q App `sessionId`.
 */
export const updateQAppSessionMetadata: API.OperationMethod<
  UpdateQAppSessionMetadataInput,
  UpdateQAppSessionMetadataOutput,
  UpdateQAppSessionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateQAppSessionMetadataInput>,
  output: __S(705, __c44, 1) as any as S.Schema<UpdateQAppSessionMetadataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppSessionMetadata",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpHeader("instance-id")), appId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.install" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateQAppWithUserInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), title: S.String, color: S.optional(S.String) }),
      ).annotate({ identifier: "BatchCreateCategoryInputCategory" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          categories: __S(17, __c1, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.createCategories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateCategoryInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          categories: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.deleteCategories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteCategoryInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, title: S.String, color: S.optional(S.String) }),
      ).annotate({ identifier: "CategoryInput" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          categories: __S(65, __c4, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.updateCategories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateCategoryInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String,
          appVersion: S.Number,
          categories: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.createItem" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLibraryItemInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          libraryItemId: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          ratingCount: S.Number,
          isVerified: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CreateLibraryItemOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          cardId: S.String,
          appId: S.String,
          fileContentsSha256: S.String,
          fileName: S.String,
          scope: S.String,
          sessionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/apps.createPresignedUrl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePresignedUrlInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fileId: S.String,
          presignedUrl: S.String,
          presignedUrlFields: __S(112, __c7, 0),
          presignedUrlExpiration: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePresignedUrlOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          title: S.String,
          description: S.optional(S.String),
          appDefinition: __S(183, __c11, 7),
          tags: S.optional(__S(112, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.create" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateQAppInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<AttributeFilter> => __S(147, __c9, 3)).annotate({
          identifier: "AttributeFilter",
        }),
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ stringListValue: __S(48, __c3, 0) }),
        /*@__PURE__*/ S.Struct({ longValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          dateValue: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, value: __S(145, __c9, 1) })).annotate({
        identifier: "DocumentAttribute",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          andAllFilters: S.optional(
            S.suspend(() => __S(144, __c9, 0)).annotate({ identifier: "AttributeFilters" }),
          ),
          orAllFilters: S.optional(
            S.suspend(() => __S(144, __c9, 0)).annotate({ identifier: "AttributeFilters" }),
          ),
          notFilter: S.optional(
            S.suspend((): S.Schema<AttributeFilter> => __S(147, __c9, 3)).annotate({
              identifier: "AttributeFilter",
            }),
          ),
          equalsTo: S.optional(__S(146, __c9, 2)),
          containsAll: S.optional(__S(146, __c9, 2)),
          containsAny: S.optional(__S(146, __c9, 2)),
          greaterThan: S.optional(__S(146, __c9, 2)),
          greaterThanOrEquals: S.optional(__S(146, __c9, 2)),
          lessThan: S.optional(__S(146, __c9, 2)),
          lessThanOrEquals: S.optional(__S(146, __c9, 2)),
        }),
      ).annotate({ identifier: "AttributeFilter" });
    case 4:
      return S.suspend(() => S.Struct({ schema: S.Any })).annotate({
        identifier: "FormInputCardMetadata",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          id: S.String,
          type: S.String,
          placeholder: S.optional(S.String),
          defaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "TextInputCardInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          id: S.String,
          type: S.String,
          prompt: S.String,
          outputSource: S.optional(S.String),
          attributeFilter: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "QQueryCardInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          id: S.String,
          type: S.String,
          prompt: S.String,
          pluginId: S.String,
          actionIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "QPluginCardInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          id: S.String,
          type: S.String,
          filename: S.optional(S.String),
          fileId: S.optional(S.String),
          allowOverride: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FileUploadCardInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          id: S.String,
          type: S.String,
          metadata: __S(148, __c9, 4),
          computeMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FormInputCardInput" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ textInput: __S(176, __c11, 0) }),
        /*@__PURE__*/ S.Struct({ qQuery: __S(177, __c11, 1) }),
        /*@__PURE__*/ S.Struct({ qPlugin: __S(178, __c11, 2) }),
        /*@__PURE__*/ S.Struct({ fileUpload: __S(179, __c11, 3) }),
        /*@__PURE__*/ S.Struct({ formInput: __S(180, __c11, 4) }),
      ]);
    case 6:
      return S.Array(__S(181, __c11, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ cards: __S(182, __c11, 6), initialPrompt: S.optional(S.String) }),
      ).annotate({ identifier: "AppDefinitionInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appId: S.String,
          appArn: S.String,
          title: S.String,
          description: S.optional(S.String),
          initialPrompt: S.optional(S.String),
          appVersion: S.Number,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedBy: S.String,
          requiredCapabilities: S.optional(__S(160, __c10, 0)),
        }),
      ).annotate({ identifier: "CreateQAppOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.deleteItem" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLibraryItemInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpHeader("instance-id")), appId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.delete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteQAppInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String.pipe(T.HttpQuery("appId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/apps.describeQAppPermissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeQAppPermissionsInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String),
          userType: S.optional(S.String),
          email: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrincipalOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ action: S.String, principal: __S(256, __c16, 0) }),
      ).annotate({ identifier: "PermissionOutput" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          appId: S.optional(S.String),
          permissions: S.optional(__S(258, __c16, 2)),
        }),
      ).annotate({ identifier: "DescribeQAppPermissionsOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.disassociateItemRating" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateLibraryItemReviewInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpHeader("instance-id")), appId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.uninstall" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateQAppFromUserInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtime.exportQAppSessionData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportQAppSessionDataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          csvFileLink: S.String,
          expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          sessionArn: S.String,
        }),
      ).annotate({ identifier: "ExportQAppSessionDataOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String.pipe(T.HttpQuery("libraryItemId")),
          appId: S.optional(S.String).pipe(T.HttpQuery("appId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/catalog.getItem" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLibraryItemInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          color: S.optional(S.String),
          appCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Category" });
    case 1:
      return S.Array(__S(336, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          libraryItemId: S.String,
          appId: S.String,
          appVersion: S.Number,
          categories: __S(337, __c21, 1),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          ratingCount: S.Number,
          isRatedByUser: S.optional(S.Boolean),
          userCount: S.optional(S.Number),
          isVerified: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetLibraryItemOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String.pipe(T.HttpQuery("appId")),
          appVersion: S.optional(S.Number).pipe(T.HttpQuery("appVersion")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/apps.get" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQAppInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          dependencies: __S(48, __c3, 0),
          type: S.String,
          placeholder: S.optional(S.String),
          defaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "TextInputCard" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          dependencies: __S(48, __c3, 0),
          type: S.String,
          prompt: S.String,
          outputSource: S.String,
          attributeFilter: S.optional(__S(147, __c9, 3)),
          memoryReferences: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "QQueryCard" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          dependencies: __S(48, __c3, 0),
          type: S.String,
          prompt: S.String,
          pluginType: S.String,
          pluginId: S.String,
          actionIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "QPluginCard" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          dependencies: __S(48, __c3, 0),
          type: S.String,
          filename: S.optional(S.String),
          fileId: S.optional(S.String),
          allowOverride: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FileUploadCard" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          title: S.String,
          dependencies: __S(48, __c3, 0),
          type: S.String,
          metadata: __S(148, __c9, 4),
          computeMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FormInputCard" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ textInput: __S(369, __c23, 1) }),
        /*@__PURE__*/ S.Struct({ qQuery: __S(370, __c23, 2) }),
        /*@__PURE__*/ S.Struct({ qPlugin: __S(371, __c23, 3) }),
        /*@__PURE__*/ S.Struct({ fileUpload: __S(372, __c23, 4) }),
        /*@__PURE__*/ S.Struct({ formInput: __S(373, __c23, 5) }),
      ]);
    case 7:
      return S.Array(__S(374, __c23, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          appDefinitionVersion: S.String,
          cards: __S(375, __c23, 7),
          canEdit: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AppDefinition" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          appId: S.String,
          appArn: S.String,
          title: S.String,
          description: S.optional(S.String),
          initialPrompt: S.optional(S.String),
          appVersion: S.Number,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedBy: S.String,
          requiredCapabilities: S.optional(__S(160, __c10, 0)),
          appDefinition: __S(376, __c23, 8),
        }),
      ).annotate({ identifier: "GetQAppOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/runtime.getQAppSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQAppSessionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.Any),
          submissionId: S.optional(S.String),
          timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Submission" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          currentState: S.String,
          currentValue: S.String,
          submissions: S.optional(__S(386, __c24, 2)),
        }),
      ).annotate({ identifier: "CardStatus" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(387, __c24, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          sessionName: S.optional(S.String),
          appVersion: S.optional(S.Number),
          latestPublishedAppVersion: S.optional(S.Number),
          status: S.String,
          cardStatus: __S(388, __c24, 4),
          userIsHost: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetQAppSessionOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/runtime.getQAppSessionMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQAppSessionMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          sessionName: S.optional(S.String),
          sharingConfiguration: __S(416, __c26, 0),
          sessionOwner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetQAppSessionMetadataOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          acceptResponses: S.optional(S.Boolean),
          revealCards: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SessionSharingConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          cardId: S.String,
          appId: S.String,
          fileContentsBase64: S.String,
          fileName: S.String,
          scope: S.String,
          sessionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/apps.importDocument" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportDocumentInput" });
    case 1:
      return S.suspend(() => S.Struct({ fileId: S.optional(S.String) })).annotate({
        identifier: "ImportDocumentOutput",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpHeader("instance-id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/catalog.listCategories" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCategoriesInput" });
    case 1:
      return S.suspend(() => S.Struct({ categories: S.optional(__S(337, __c21, 1)) })).annotate({
        identifier: "ListCategoriesOutput",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          categoryId: S.optional(S.String).pipe(T.HttpQuery("categoryId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/catalog.list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLibraryItemsInput" });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ libraryItems: S.optional(__S(465, __c29, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLibraryItemsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/apps.list" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQAppsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appId: S.String,
          appArn: S.String,
          title: S.String,
          description: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          canEdit: S.optional(S.Boolean),
          status: S.optional(S.String),
          isVerified: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UserAppItem" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ apps: __S(482, __c30, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQAppsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/runtime.listQAppSessionData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQAppSessionDataInput" });
    case 1:
      return S.suspend(() => S.Struct({ userId: S.optional(S.String) })).annotate({
        identifier: "User",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          cardId: S.String,
          value: S.optional(S.Any),
          user: __S(497, __c31, 1),
          submissionId: S.optional(S.String),
          timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "QAppSessionData" });
    case 3:
      return S.Array(__S(498, __c31, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          sessionData: S.optional(__S(499, __c31, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListQAppSessionDataOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String.pipe(T.HttpLabel("resourceARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(112, __c7, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ body: S.String, type: S.String })).annotate({
        identifier: "ConversationMessage",
      });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ conversation: __S(529, __c33, 1) }),
        /*@__PURE__*/ S.Struct({ problemStatement: S.String }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          options: S.optional(__S(530, __c33, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.predictQApp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PredictQAppInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.optional(S.String),
          appDefinition: __S(183, __c11, 7),
        }),
      ).annotate({ identifier: "PredictAppDefinition" });
    case 5:
      return S.suspend(() =>
        S.Struct({ app: __S(532, __c33, 4), problemStatement: S.String }),
      ).annotate({ identifier: "PredictQAppOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String,
          appVersion: S.Number,
          initialValues: S.optional(__S(562, __c35, 2)),
          sessionId: S.optional(S.String),
          tags: S.optional(__S(112, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtime.startQAppSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartQAppSessionInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ submissionId: S.String, mutationType: S.String })).annotate(
        { identifier: "SubmissionMutation" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          cardId: S.String,
          value: S.String,
          submissionMutation: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "CardValue" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() => S.Struct({ sessionId: S.String, sessionArn: S.String })).annotate({
        identifier: "StartQAppSessionOutput",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtime.deleteMiniAppRun" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopQAppSessionInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
          tags: __S(112, __c7, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceARN}" }),
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
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
          tagKeys: __S(48, __c3, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceARN}" }),
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String,
          status: S.optional(S.String),
          categories: S.optional(__S(48, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.updateItem" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLibraryItemInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String,
          isVerified: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.updateItemMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLibraryItemMetadataInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String,
          title: S.optional(S.String),
          description: S.optional(S.String),
          appDefinition: S.optional(__S(183, __c11, 7)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/apps.update" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateQAppInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ action: S.String, principal: S.String })).annotate({
        identifier: "PermissionInput",
      });
    case 1:
      return S.Array(__S(672, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          appId: S.String,
          grantPermissions: S.optional(__S(673, __c42, 1)),
          revokePermissions: S.optional(__S(673, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/apps.updateQAppPermissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQAppPermissionsInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String,
          values: S.optional(__S(562, __c35, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtime.updateQAppSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQAppSessionInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          sessionId: S.String,
          sessionName: S.optional(S.String),
          sharingConfiguration: __S(416, __c26, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtime.updateQAppSessionMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQAppSessionMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          sessionName: S.optional(S.String),
          sharingConfiguration: __S(416, __c26, 0),
        }),
      ).annotate({ identifier: "UpdateQAppSessionMetadataOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpHeader("instance-id")),
          libraryItemId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/catalog.associateItemRating" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateLibraryItemReviewInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateLibraryItemReviewResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
