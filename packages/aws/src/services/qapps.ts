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
  sdkId: "QApps",
  target: "QAppsService",
  version: "2023-11-27",
  sigv4: "qapps",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ContentTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContentTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
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
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type BatchCreateCategoryInputCategoryList =
  BatchCreateCategoryInputCategory[];
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
export type ExecutionStatus =
  | "IN_PROGRESS"
  | "WAITING"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /catalog.associateItemRating",
    input: { instanceId: D.m({ header: "instance-id" }), libraryItemId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.install",
    input: { instanceId: D.m({ header: "instance-id" }), appId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.createCategories",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      categories: D.list({ id: 0, title: 0, color: 0 }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.deleteCategories",
    input: { instanceId: D.m({ header: "instance-id" }), categories: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.updateCategories",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      categories: D.list({ id: 0, title: 0, color: 0 }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.createItem",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: 0,
      appVersion: 0,
      categories: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.createPresignedUrl",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      cardId: 0,
      appId: 0,
      fileContentsSha256: 0,
      fileName: 0,
      scope: 0,
      sessionId: 0,
    },
    output: { presignedUrlExpiration: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.create",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      title: 0,
      description: 0,
      appDefinition: i_AppDefinitionInput,
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.deleteItem",
    input: { instanceId: D.m({ header: "instance-id" }), libraryItemId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.delete",
    input: { instanceId: D.m({ header: "instance-id" }), appId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps.describeQAppPermissions",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: D.m({ query: "appId" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.disassociateItemRating",
    input: { instanceId: D.m({ header: "instance-id" }), libraryItemId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.uninstall",
    input: { instanceId: D.m({ header: "instance-id" }), appId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /runtime.exportQAppSessionData",
    input: { instanceId: D.m({ header: "instance-id" }), sessionId: 0 },
    output: { expiresAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /catalog.getItem",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      libraryItemId: D.m({ query: "libraryItemId" }),
      appId: D.m({ query: "appId" }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apps.get",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: D.m({ query: "appId" }),
      appVersion: D.m({ query: "appVersion" }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      appDefinition: {
        cards: D.list({ qQuery: { attributeFilter: o_AttributeFilter } }),
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /runtime.getQAppSession",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      sessionId: D.m({ query: "sessionId" }),
    },
    output: { cardStatus: D.map({ submissions: D.list({ timestamp: D.ts }) }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /runtime.getQAppSessionMetadata",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      sessionId: D.m({ query: "sessionId" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.importDocument",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      cardId: 0,
      appId: 0,
      fileContentsBase64: 0,
      fileName: 0,
      scope: 0,
      sessionId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /catalog.listCategories",
    input: { instanceId: D.m({ header: "instance-id" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /catalog.list",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      limit: D.m({ query: "limit" }),
      nextToken: D.m({ query: "nextToken" }),
      categoryId: D.m({ query: "categoryId" }),
    },
    output: { libraryItems: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /apps.list",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      limit: D.m({ query: "limit" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { apps: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /runtime.listQAppSessionData",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      sessionId: D.m({ query: "sessionId" }),
    },
    output: { sessionData: D.list({ timestamp: D.ts }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceARN}",
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
  descriptor: {
    service: svc,
    http: "POST /apps.predictQApp",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      options: {
        conversation: D.list({ body: 0, type: 0 }),
        problemStatement: 0,
      },
    },
    output: {
      app: {
        appDefinition: {
          cards: D.list({ qQuery: { attributeFilter: o_AttributeFilter } }),
        },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /runtime.startQAppSession",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: 0,
      appVersion: 0,
      initialValues: D.list(i_CardValue),
      sessionId: 0,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /runtime.deleteMiniAppRun",
    input: { instanceId: D.m({ header: "instance-id" }), sessionId: 0 },
    body: true,
  },
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
 * Associates tags with an Amazon Q Apps resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceARN}",
    input: { resourceARN: 0, tags: 0 },
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
 * Disassociates tags from an Amazon Q Apps resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceARN}",
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
  descriptor: {
    service: svc,
    http: "POST /catalog.updateItem",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      libraryItemId: 0,
      status: 0,
      categories: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /catalog.updateItemMetadata",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      libraryItemId: 0,
      isVerified: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.update",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: 0,
      title: 0,
      description: 0,
      appDefinition: i_AppDefinitionInput,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /apps.updateQAppPermissions",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      appId: 0,
      grantPermissions: D.list(i_PermissionInput),
      revokePermissions: D.list(i_PermissionInput),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /runtime.updateQAppSession",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      sessionId: 0,
      values: D.list(i_CardValue),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /runtime.updateQAppSessionMetadata",
    input: {
      instanceId: D.m({ header: "instance-id" }),
      sessionId: 0,
      sessionName: 0,
      sharingConfiguration: { enabled: 0, acceptResponses: 0, revealCards: 0 },
    },
    body: true,
  },
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
})) as any;

const i_AppDefinitionInput: D.LazyStruct = () => ({
  cards: D.list({
    textInput: { title: 0, id: 0, type: 0, placeholder: 0, defaultValue: 0 },
    qQuery: {
      title: 0,
      id: 0,
      type: 0,
      prompt: 0,
      outputSource: 0,
      attributeFilter: i_AttributeFilter,
    },
    qPlugin: {
      title: 0,
      id: 0,
      type: 0,
      prompt: 0,
      pluginId: 0,
      actionIdentifier: 0,
    },
    fileUpload: {
      title: 0,
      id: 0,
      type: 0,
      filename: 0,
      fileId: 0,
      allowOverride: 0,
    },
    formInput: {
      title: 0,
      id: 0,
      type: 0,
      metadata: { schema: 0 },
      computeMode: 0,
    },
  }),
  initialPrompt: 0,
});
const i_CardValue: D.LazyStruct = () => ({
  cardId: 0,
  value: 0,
  submissionMutation: { submissionId: 0, mutationType: 0 },
});
const i_PermissionInput: D.LazyStruct = () => ({ action: 0, principal: 0 });
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
const o_DocumentAttribute: D.LazyStruct = () => ({
  value: { dateValue: D.ts },
});
const i_DocumentAttribute: D.LazyStruct = () => ({
  name: 0,
  value: { stringValue: 0, stringListValue: 0, longValue: 0, dateValue: 0 },
});
