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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SocialMessaging",
  serviceShapeName: "SocialMessaging",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "social-messaging" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-01-01");
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
              `https://social-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://social-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://social-messaging.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedByMetaException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedByMetaException>()(
    "AccessDeniedByMetaException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(502), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidParametersException>()(
    "InvalidParametersException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottledRequestException
  extends /*@__PURE__*/ S.TaggedError<ThrottledRequestException>()(
    "ThrottledRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export interface WhatsAppSignupCallback {
  accessToken: string | redacted.Redacted<string>;
  callbackUrl?: string;
}
export type AssociateInProgressToken = string | redacted.Redacted<string>;
export type WhatsAppPhoneNumber = string;
export type TwoFactorPin = string | redacted.Redacted<string>;
export type IsoCountryCode = string;
export interface Tag {
  key: string;
  value?: string;
}
export type TagList = Tag[];
export interface WabaPhoneNumberSetupFinalization {
  id: string;
  twoFactorPin: string | redacted.Redacted<string>;
  dataLocalizationRegion?: string;
  tags?: Tag[];
}
export type WabaPhoneNumberSetupFinalizationList = WabaPhoneNumberSetupFinalization[];
export type LinkedWhatsAppBusinessAccountId = string;
export type WhatsAppBusinessAccountId = string;
export type EventDestinationArn = string;
export type RoleArn = string;
export interface WhatsAppBusinessAccountEventDestination {
  eventDestinationArn: string;
  roleArn?: string;
}
export type WhatsAppBusinessAccountEventDestinations = WhatsAppBusinessAccountEventDestination[];
export interface WabaSetupFinalization {
  id?: string;
  eventDestinations?: WhatsAppBusinessAccountEventDestination[];
  tags?: Tag[];
}
export interface WhatsAppSetupFinalization {
  associateInProgressToken: string | redacted.Redacted<string>;
  phoneNumbers: WabaPhoneNumberSetupFinalization[];
  phoneNumberParent?: string;
  waba?: WabaSetupFinalization;
}
export interface AssociateWhatsAppBusinessAccountInput {
  signupCallback?: WhatsAppSignupCallback;
  setupFinalization?: WhatsAppSetupFinalization;
}
export type WhatsAppBusinessAccountName = string;
export type RegistrationStatus = "COMPLETE" | "INCOMPLETE" | (string & {});
export type LinkedWhatsAppPhoneNumberArn = string;
export type PhoneNumber = string;
export type WhatsAppPhoneNumberId = string;
export type WhatsAppPhoneNumberName = string;
export type WhatsAppDisplayPhoneNumber = string;
export type WhatsAppPhoneNumberQualityRating = string;
export interface WhatsAppPhoneNumberDetail {
  arn: string;
  phoneNumber: string;
  phoneNumberId: string;
  metaPhoneNumberId: string;
  displayPhoneNumberName: string;
  displayPhoneNumber: string;
  qualityRating: string;
  dataLocalizationRegion?: string;
}
export type WhatsAppPhoneNumberDetailList = WhatsAppPhoneNumberDetail[];
export interface LinkedWhatsAppBusinessAccountIdMetaData {
  accountName?: string;
  registrationStatus?: RegistrationStatus;
  unregisteredWhatsAppPhoneNumbers?: WhatsAppPhoneNumberDetail[];
  wabaId?: string;
}
export type LinkedAccountWithIncompleteSetup = {
  [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined;
};
export interface WhatsAppSignupCallbackResult {
  associateInProgressToken?: string | redacted.Redacted<string>;
  linkedAccountsWithIncompleteSetup?: {
    [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined;
  };
}
export interface AssociateWhatsAppBusinessAccountOutput {
  signupCallbackResult?: WhatsAppSignupCallbackResult;
  statusCode?: number;
  linkedWhatsAppBusinessAccountId?: string;
}
export interface CreateWhatsAppDatasetInput {
  id: string;
}
export type WhatsAppDatasetId = string;
export interface CreateWhatsAppDatasetOutput {
  datasetId: string;
}
export type MetaFlowName = string;
export type MetaFlowCategory =
  | "SIGN_UP"
  | "SIGN_IN"
  | "APPOINTMENT_BOOKING"
  | "LEAD_GENERATION"
  | "SHOPPING"
  | "CONTACT_US"
  | "CUSTOMER_SUPPORT"
  | "SURVEY"
  | "OTHER"
  | (string & {});
export type MetaFlowCategoryList = MetaFlowCategory[];
export type MetaFlowJsonBlob = Uint8Array;
export type MetaFlowId = string;
export type MetaFlowEndpointUri = string;
export interface CreateWhatsAppFlowInput {
  id: string;
  flowName: string;
  categories: MetaFlowCategory[];
  flowJson?: Uint8Array;
  publish?: boolean;
  cloneFlowId?: string;
  endpointUri?: string;
}
export type MetaFlowValidationError = string;
export type ValidationErrorList = string[];
export interface CreateWhatsAppFlowOutput {
  flowId?: string;
  validationErrors?: string[];
}
export type MetaTemplateDefinition = Uint8Array;
export interface CreateWhatsAppMessageTemplateInput {
  templateDefinition: Uint8Array;
  id: string;
}
export type MetaTemplateId = string;
export type MetaTemplateCategory = string;
export interface CreateWhatsAppMessageTemplateOutput {
  metaTemplateId?: string;
  templateStatus?: string;
  category?: string;
}
export type MetaTemplateName = string;
export type MetaTemplateLanguage = string;
export type ButtonType = string;
export type MetaUrlWithSuffixExample = { [key: string]: string | undefined };
export type OtpType = string;
export type ZeroTapTermsAccepted = boolean;
export type SupportedApp = { [key: string]: string | undefined };
export type SupportedApps = { [key: string]: string | undefined }[];
export interface LibraryTemplateButtonInput {
  type?: string;
  phoneNumber?: string;
  url?: { [key: string]: string | undefined };
  otpType?: string;
  zeroTapTermsAccepted?: boolean;
  supportedApps?: { [key: string]: string | undefined }[];
}
export type MetaLibraryTemplateButtonInputs = LibraryTemplateButtonInput[];
export type AddContactNumber = boolean;
export type AddLearnMoreLink = boolean;
export type AddSecurityRecommendation = boolean;
export type AddTrackPackageLink = boolean;
export type CodeExpirationMinutes = number;
export interface LibraryTemplateBodyInputs {
  addContactNumber?: boolean;
  addLearnMoreLink?: boolean;
  addSecurityRecommendation?: boolean;
  addTrackPackageLink?: boolean;
  codeExpirationMinutes?: number;
}
export interface MetaLibraryTemplate {
  templateName: string;
  libraryTemplateName: string;
  templateCategory: string;
  templateLanguage: string;
  libraryTemplateButtonInputs?: LibraryTemplateButtonInput[];
  libraryTemplateBodyInputs?: LibraryTemplateBodyInputs;
}
export interface CreateWhatsAppMessageTemplateFromLibraryInput {
  metaLibraryTemplate: MetaLibraryTemplate;
  id: string;
}
export interface CreateWhatsAppMessageTemplateFromLibraryOutput {
  metaTemplateId?: string;
  templateStatus?: string;
  category?: string;
}
export interface S3File {
  bucketName: string;
  key: string;
}
export interface CreateWhatsAppMessageTemplateMediaInput {
  id: string;
  sourceS3File?: S3File;
}
export interface CreateWhatsAppMessageTemplateMediaOutput {
  metaHeaderHandle?: string;
}
export interface DeleteWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export interface DeleteWhatsAppFlowOutput {}
export type WhatsAppMediaId = string;
export interface DeleteWhatsAppMessageMediaInput {
  mediaId: string;
  originationPhoneNumberId: string;
}
export interface DeleteWhatsAppMessageMediaOutput {
  success?: boolean;
}
export type DeleteAllLanguages = boolean;
export interface DeleteWhatsAppMessageTemplateInput {
  metaTemplateId?: string;
  deleteAllLanguages?: boolean;
  id: string;
  templateName: string;
}
export interface DeleteWhatsAppMessageTemplateOutput {}
export interface DeprecateWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export interface DeprecateWhatsAppFlowOutput {}
export interface DisassociateWhatsAppBusinessAccountInput {
  id: string;
}
export interface DisassociateWhatsAppBusinessAccountOutput {}
export interface GetLinkedWhatsAppBusinessAccountInput {
  id: string;
}
export type LinkedWhatsAppBusinessAccountArn = string;
export type WhatsAppBusinessAccountLinkDate = Date;
export type WhatsAppBusinessAccountMarketingMessagesOnboardingStatus = string;
export interface WhatsAppPhoneNumberSummary {
  arn: string;
  phoneNumber: string;
  phoneNumberId: string;
  metaPhoneNumberId: string;
  displayPhoneNumberName: string;
  displayPhoneNumber: string;
  qualityRating: string;
  dataLocalizationRegion?: string;
}
export type WhatsAppPhoneNumberSummaryList = WhatsAppPhoneNumberSummary[];
export interface LinkedWhatsAppBusinessAccount {
  arn: string;
  id: string;
  wabaId: string;
  registrationStatus: RegistrationStatus;
  linkDate: Date;
  wabaName: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
  marketingMessagesOnboardingStatus?: string;
  datasetId?: string;
  phoneNumbers: WhatsAppPhoneNumberSummary[];
}
export interface GetLinkedWhatsAppBusinessAccountOutput {
  account?: LinkedWhatsAppBusinessAccount;
}
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberInput {
  id: string;
}
export type IanaTimezone = string;
export type WhatsAppDayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export interface WhatsAppTimeOfDay {
  hours: number;
  minutes: number;
}
export interface WhatsAppWeeklyOperatingHoursEntry {
  dayOfWeek: WhatsAppDayOfWeek;
  openTime: WhatsAppTimeOfDay;
  closeTime: WhatsAppTimeOfDay;
}
export type WhatsAppWeeklyOperatingHoursList = WhatsAppWeeklyOperatingHoursEntry[];
export type WhatsAppDate = string;
export interface WhatsAppHolidayScheduleEntry {
  date: string;
  startTime: WhatsAppTimeOfDay;
  endTime: WhatsAppTimeOfDay;
}
export type WhatsAppHolidayScheduleList = WhatsAppHolidayScheduleEntry[];
export interface WhatsAppCallHours {
  enabled: boolean;
  timezone: string;
  weeklyOperatingHours: WhatsAppWeeklyOperatingHoursEntry[];
  holidaySchedule?: WhatsAppHolidayScheduleEntry[];
}
export type WhatsAppCallIconVisibility = string;
export type WhatsAppCallbackPermissionStatus = string;
export interface WhatsAppCallSettings {
  callEnabled: boolean;
  callHours?: WhatsAppCallHours;
  callIconVisibility?: string;
  callbackPermissionStatus?: string;
}
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberOutput {
  phoneNumber?: WhatsAppPhoneNumberDetail;
  linkedWhatsAppBusinessAccountId?: string;
  callSettings?: WhatsAppCallSettings;
}
export interface GetWhatsAppBusinessPublicKeyInput {
  originationPhoneNumberId: string;
}
export type BusinessPublicKeyPem = string;
export type BusinessPublicKeySignatureStatus = string;
export interface GetWhatsAppBusinessPublicKeyOutput {
  businessPublicKey?: string;
  businessPublicKeySignatureStatus?: string;
}
export type WhatsAppDestinationPhoneNumber = string | redacted.Redacted<string>;
export type WhatsAppBusinessScopedUserId = string | redacted.Redacted<string>;
export interface GetWhatsAppCallPermissionInput {
  originationPhoneNumberId: string;
  destinationPhoneNumber?: string | redacted.Redacted<string>;
  endUserBsuid?: string | redacted.Redacted<string>;
}
export type WhatsAppCallPermissionStatus = string;
export interface WhatsAppCallPermission {
  status: string;
  expirationTime?: Date;
}
export type WhatsAppCallPermissionActionName = string;
export type Iso8601Duration = string;
export interface WhatsAppCallPermissionLimit {
  timePeriod: string;
  maxAllowed: number;
  currentUsage: number;
  limitExpirationTime?: Date;
}
export type WhatsAppCallPermissionLimitList = WhatsAppCallPermissionLimit[];
export interface WhatsAppCallPermissionAction {
  actionName: string;
  canPerformAction: boolean;
  limits: WhatsAppCallPermissionLimit[];
}
export type WhatsAppCallPermissionActionList = WhatsAppCallPermissionAction[];
export interface GetWhatsAppCallPermissionOutput {
  permission: WhatsAppCallPermission;
  actions: WhatsAppCallPermissionAction[];
}
export interface GetWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export type MetaFlowStatus = string;
export type MetaFlowJsonVersion = string;
export type MetaFlowDataApiVersion = string;
export type MetaFlowPreviewUrl = string;
export type MetaFlowTimestamp = string;
export interface MetaFlowPreviewInfo {
  previewUrl: string;
  expiresAt: string;
}
export type MetaFlowWabaCurrency = string;
export type MetaFlowWabaTimezoneId = string;
export type MetaFlowWabaTemplateNamespace = string;
export interface MetaFlowWhatsAppBusinessAccountInfo {
  id: string;
  name: string;
  currency?: string;
  timezoneId?: string;
  messageTemplateNamespace?: string;
}
export type MetaFlowApplicationLink = string;
export type MetaFlowApplicationName = string;
export type MetaFlowApplicationId = string;
export interface MetaFlowApplicationInfo {
  link?: string;
  name: string;
  id: string;
}
export type MetaFlowHealthStatusAvailability = string;
export type MetaFlowHealthEntityType = string;
export interface MetaFlowHealthEntity {
  entityType: string;
  id: string;
  canSendMessage: string;
}
export type MetaFlowHealthEntityList = MetaFlowHealthEntity[];
export interface MetaFlowHealthStatus {
  canSendMessage: string;
  entities?: MetaFlowHealthEntity[];
}
export interface GetWhatsAppFlowOutput {
  flowId: string;
  flowName: string;
  flowStatus: string;
  categories?: MetaFlowCategory[];
  validationErrors?: string[];
  jsonVersion?: string;
  dataApiVersion?: string;
  endpointUri?: string;
  preview?: MetaFlowPreviewInfo;
  whatsAppBusinessAccount?: MetaFlowWhatsAppBusinessAccountInfo;
  application?: MetaFlowApplicationInfo;
  healthStatus?: MetaFlowHealthStatus;
}
export interface GetWhatsAppFlowPreviewInput {
  id: string;
  flowId: string;
  invalidate?: boolean;
}
export interface GetWhatsAppFlowPreviewOutput {
  flowId: string;
  preview: MetaFlowPreviewInfo;
}
export type Headers = { [key: string]: string | undefined };
export interface S3PresignedUrl {
  url: string;
  headers: { [key: string]: string | undefined };
}
export interface GetWhatsAppMessageMediaInput {
  mediaId: string;
  originationPhoneNumberId: string;
  metadataOnly?: boolean;
  destinationS3PresignedUrl?: S3PresignedUrl;
  destinationS3File?: S3File;
}
export interface GetWhatsAppMessageMediaOutput {
  mimeType?: string;
  fileSize?: number;
}
export interface GetWhatsAppMessageTemplateInput {
  metaTemplateId?: string;
  id: string;
  templateName?: string;
  templateLanguageCode?: string;
}
export type MetaTemplate = string;
export interface GetWhatsAppMessageTemplateOutput {
  template?: string;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListLinkedWhatsAppBusinessAccountsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface LinkedWhatsAppBusinessAccountSummary {
  arn: string;
  id: string;
  wabaId: string;
  registrationStatus: RegistrationStatus;
  linkDate: Date;
  wabaName: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
  marketingMessagesOnboardingStatus?: string;
  datasetId?: string;
}
export type LinkedWhatsAppBusinessAccountSummaryList = LinkedWhatsAppBusinessAccountSummary[];
export interface ListLinkedWhatsAppBusinessAccountsOutput {
  linkedAccounts?: LinkedWhatsAppBusinessAccountSummary[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  statusCode?: number;
  tags?: Tag[];
}
export interface ListWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  nextToken?: string;
  maxResults?: number;
}
export type MetaFlowAssetName = string;
export type MetaFlowAssetType = string;
export type MetaFlowAssetDownloadUrl = string;
export interface MetaFlowAsset {
  name: string;
  assetType: string;
  downloadUrl: string;
}
export type MetaFlowAssetList = MetaFlowAsset[];
export interface ListWhatsAppFlowAssetsOutput {
  flowAssets: MetaFlowAsset[];
  nextToken?: string;
}
export interface ListWhatsAppFlowsInput {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export interface MetaFlowSummary {
  flowId: string;
  flowName: string;
  flowStatus: string;
  flowCategories: MetaFlowCategory[];
  validationErrors: string[];
}
export type MetaFlowSummaryList = MetaFlowSummary[];
export interface ListWhatsAppFlowsOutput {
  flows: MetaFlowSummary[];
  nextToken?: string;
}
export interface ListWhatsAppMessageTemplatesInput {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export type MetaTemplateStatus = string;
export type MetaTemplateQualityScore = string;
export interface TemplateSummary {
  templateName?: string;
  metaTemplateId?: string;
  templateStatus?: string;
  templateQualityScore?: string;
  templateLanguage?: string;
  templateCategory?: string;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListWhatsAppMessageTemplatesOutput {
  templates?: TemplateSummary[];
  nextToken?: string;
}
export type Filter = { [key: string]: string | undefined };
export interface ListWhatsAppTemplateLibraryInput {
  nextToken?: string;
  maxResults?: number;
  id: string;
  filters?: { [key: string]: string | undefined };
}
export type MetaTemplateTopic = string;
export type MetaTemplateUseCase = string;
export type MetaIndustry = string;
export type MetaIndustries = string[];
export type MetaTemplateHeader = string;
export type MetaTemplateBody = string;
export type MetaText = string;
export type MetaUrl = string;
export interface LibraryTemplateButtonList {
  type?: string;
  text?: string;
  phoneNumber?: string;
  url?: string;
  otpType?: string;
  zeroTapTermsAccepted?: boolean;
  supportedApps?: { [key: string]: string | undefined }[];
}
export type MetaLibraryTemplateButtonList = LibraryTemplateButtonList[];
export type MetaTemplateBodyExampleParams = string[];
export interface MetaLibraryTemplateDefinition {
  templateName?: string;
  templateLanguage?: string;
  templateCategory?: string;
  templateTopic?: string;
  templateUseCase?: string;
  templateIndustry?: string[];
  templateHeader?: string;
  templateBody?: string;
  templateButtons?: LibraryTemplateButtonList[];
  templateId?: string;
  templateBodyExampleParams?: string[];
}
export type MetaLibraryTemplatesList = MetaLibraryTemplateDefinition[];
export interface ListWhatsAppTemplateLibraryOutput {
  metaLibraryTemplates?: MetaLibraryTemplateDefinition[];
  nextToken?: string;
}
export interface PostWhatsAppMessageMediaInput {
  originationPhoneNumberId: string;
  sourceS3PresignedUrl?: S3PresignedUrl;
  sourceS3File?: S3File;
}
export interface PostWhatsAppMessageMediaOutput {
  mediaId?: string;
}
export interface PublishWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export interface PublishWhatsAppFlowOutput {}
export interface PutWhatsAppBusinessAccountEventDestinationsInput {
  id: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
}
export interface PutWhatsAppBusinessAccountEventDestinationsOutput {}
export type KmsKeyArn = string;
export interface PutWhatsAppBusinessPublicKeyInput {
  originationPhoneNumberId: string;
  businessPublicKey?: string;
  kmsKeyArn?: string;
}
export interface PutWhatsAppBusinessPublicKeyOutput {}
export type WhatsAppCallEventBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface SendWhatsAppCallEventInput {
  originationPhoneNumberId: string;
  metaApiVersion: string;
  callEvent: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface SendWhatsAppCallEventOutput {
  callId: string;
}
export type WhatsAppConversionEventBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface SendWhatsAppConversionEventInput {
  id: string;
  datasetId: string;
  eventData: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface SendWhatsAppConversionEventOutput {
  requestId: string;
}
export type WhatsAppMessageBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface SendWhatsAppMessageInput {
  originationPhoneNumberId: string;
  message: Uint8Array | redacted.Redacted<Uint8Array>;
  metaApiVersion: string;
}
export interface SendWhatsAppMessageOutput {
  messageId?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceOutput {
  statusCode?: number;
}
export type StringList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {
  statusCode?: number;
}
export interface UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput {
  id: string;
  callSettings: WhatsAppCallSettings;
}
export interface UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput {
  phoneNumberId: string;
}
export interface UpdateWhatsAppFlowInput {
  id: string;
  flowId: string;
  flowName?: string;
  categories?: MetaFlowCategory[];
  endpointUri?: string;
  metaAppId?: string;
}
export interface UpdateWhatsAppFlowOutput {}
export interface UpdateWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  flowJson: Uint8Array;
}
export interface UpdateWhatsAppFlowAssetsOutput {
  validationErrors?: string[];
}
export type MetaParameterFormat = string;
export type MetaTemplateComponents = Uint8Array;
export type MetaTemplateCtaLinkTrackingOptedOut = boolean;
export interface UpdateWhatsAppMessageTemplateInput {
  id: string;
  metaTemplateId?: string;
  templateName?: string;
  templateLanguageCode?: string;
  parameterFormat?: string;
  templateCategory?: string;
  templateComponents?: Uint8Array;
  ctaUrlLinkTrackingOptedOut?: boolean;
}
export interface UpdateWhatsAppMessageTemplateOutput {}
export type ErrorMessage = string;
export type AssociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | LimitExceededException
  | ThrottledRequestException
  | CommonErrors;
/**
 * This is only used through the Amazon Web Services console during sign-up to associate your WhatsApp Business Account to your Amazon Web Services account.
 */
export const associateWhatsAppBusinessAccount: API.OperationMethod<
  AssociateWhatsAppBusinessAccountInput,
  AssociateWhatsAppBusinessAccountOutput,
  AssociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(773, __c48, 5) as any as S.Schema<AssociateWhatsAppBusinessAccountInput>,
  output: __S(777, __c48, 9) as any as S.Schema<AssociateWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InvalidParametersException,
    LimitExceededException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWhatsAppBusinessAccount",
}));

export type CreateWhatsAppDatasetError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a Meta Conversions API dataset for a WhatsApp Business Account.
 */
export const createWhatsAppDataset: API.OperationMethod<
  CreateWhatsAppDatasetInput,
  CreateWhatsAppDatasetOutput,
  CreateWhatsAppDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateWhatsAppDatasetInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateWhatsAppDatasetOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppDataset",
}));

export type CreateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp Flow. Flows enable businesses to create rich, interactive forms and experiences
 * that users can complete without leaving WhatsApp. The Flow is created in DRAFT status. If `publish`
 * is set to `true` and a valid `flowJson` is provided, the Flow is published immediately.
 */
export const createWhatsAppFlow: API.OperationMethod<
  CreateWhatsAppFlowInput,
  CreateWhatsAppFlowOutput,
  CreateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<CreateWhatsAppFlowInput>,
  output: __S(17, __c1, 1) as any as S.Schema<CreateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppFlow",
}));

export type CreateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template from a custom definition.
 *
 * Amazon Web Services End User Messaging Social does not store any WhatsApp message template content.
 */
export const createWhatsAppMessageTemplate: API.OperationMethod<
  CreateWhatsAppMessageTemplateInput,
  CreateWhatsAppMessageTemplateOutput,
  CreateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateWhatsAppMessageTemplateInput>,
  output: __S(80, __c5, 0) as any as S.Schema<CreateWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplate",
}));

export type CreateWhatsAppMessageTemplateFromLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template using a template from Meta's template library.
 */
export const createWhatsAppMessageTemplateFromLibrary: API.OperationMethod<
  CreateWhatsAppMessageTemplateFromLibraryInput,
  CreateWhatsAppMessageTemplateFromLibraryOutput,
  CreateWhatsAppMessageTemplateFromLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c6, 4) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryInput>,
  output: __S(80, __c5, 0) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateFromLibrary",
}));

export type CreateWhatsAppMessageTemplateMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Uploads media for use in a WhatsApp message template.
 */
export const createWhatsAppMessageTemplateMedia: API.OperationMethod<
  CreateWhatsAppMessageTemplateMediaInput,
  CreateWhatsAppMessageTemplateMediaOutput,
  CreateWhatsAppMessageTemplateMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateWhatsAppMessageTemplateMediaInput>,
  output: __S(145, __c9, 1) as any as S.Schema<CreateWhatsAppMessageTemplateMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateMedia",
}));

export type DeleteWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deletes a WhatsApp Flow permanently. Only Flows in DRAFT status can be deleted. Published or deprecated Flows cannot be deleted.
 */
export const deleteWhatsAppFlow: API.OperationMethod<
  DeleteWhatsAppFlowInput,
  DeleteWhatsAppFlowOutput,
  DeleteWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteWhatsAppFlowInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppFlow",
}));

export type DeleteWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Delete a media object from the WhatsApp service. If the object is still in an Amazon S3 bucket you should delete it from there too.
 */
export const deleteWhatsAppMessageMedia: API.OperationMethod<
  DeleteWhatsAppMessageMediaInput,
  DeleteWhatsAppMessageMediaOutput,
  DeleteWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteWhatsAppMessageMediaInput>,
  output: __S(209, __c13, 1) as any as S.Schema<DeleteWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageMedia",
}));

export type DeleteWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deletes a WhatsApp message template.
 */
export const deleteWhatsAppMessageTemplate: API.OperationMethod<
  DeleteWhatsAppMessageTemplateInput,
  DeleteWhatsAppMessageTemplateOutput,
  DeleteWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteWhatsAppMessageTemplateInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageTemplate",
}));

export type DeprecateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deprecates a published WhatsApp Flow, marking it as no longer recommended for use. The Flow must be in PUBLISHED status. This is an irreversible operation.
 */
export const deprecateWhatsAppFlow: API.OperationMethod<
  DeprecateWhatsAppFlowInput,
  DeprecateWhatsAppFlowOutput,
  DeprecateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeprecateWhatsAppFlowInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DeprecateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateWhatsAppFlow",
}));

export type DisassociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Disassociate a WhatsApp Business Account (WABA) from your Amazon Web Services account.
 */
export const disassociateWhatsAppBusinessAccount: API.OperationMethod<
  DisassociateWhatsAppBusinessAccountInput,
  DisassociateWhatsAppBusinessAccountOutput,
  DisassociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DisassociateWhatsAppBusinessAccountInput>,
  output: __S(192, __c12, 0) as any as S.Schema<DisassociateWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Get the details of your linked WhatsApp Business Account.
 */
export const getLinkedWhatsAppBusinessAccount: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountInput,
  GetLinkedWhatsAppBusinessAccountOutput,
  GetLinkedWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetLinkedWhatsAppBusinessAccountInput>,
  output: __S(274, __c17, 2) as any as S.Schema<GetLinkedWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountPhoneNumberError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieve the WABA account id and phone number details of a WhatsApp business account phone number.
 */
export const getLinkedWhatsAppBusinessAccountPhoneNumber: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountPhoneNumberInput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberInput>,
  output: __S(289, __c18, 1) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccountPhoneNumber",
}));

export type GetWhatsAppBusinessPublicKeyError =
  | AccessDeniedByMetaException
  | AccessDeniedException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves the business public key for a phone number and its signature status.
 */
export const getWhatsAppBusinessPublicKey: API.OperationMethod<
  GetWhatsAppBusinessPublicKeyInput,
  GetWhatsAppBusinessPublicKeyOutput,
  GetWhatsAppBusinessPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetWhatsAppBusinessPublicKeyInput>,
  output: __S(321, __c20, 1) as any as S.Schema<GetWhatsAppBusinessPublicKeyOutput>,
  errors: [
    AccessDeniedByMetaException,
    AccessDeniedException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppBusinessPublicKey",
}));

export type GetWhatsAppCallPermissionError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves the current calling permission for a WhatsApp end user, along with the calling actions the business is allowed to take with that user. Provide the destination phone number or the business-scoped user ID to identify the end user.
 */
export const getWhatsAppCallPermission: API.OperationMethod<
  GetWhatsAppCallPermissionInput,
  GetWhatsAppCallPermissionOutput,
  GetWhatsAppCallPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetWhatsAppCallPermissionInput>,
  output: __S(342, __c21, 6) as any as S.Schema<GetWhatsAppCallPermissionOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppCallPermission",
}));

export type GetWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves the metadata and status of a WhatsApp Flow, including validation errors, preview information, and health status.
 */
export const getWhatsAppFlow: API.OperationMethod<
  GetWhatsAppFlowInput,
  GetWhatsAppFlowOutput,
  GetWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetWhatsAppFlowInput>,
  output: __S(358, __c22, 6) as any as S.Schema<GetWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlow",
}));

export type GetWhatsAppFlowPreviewError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Generates a web preview URL for testing a WhatsApp Flow before publishing. Preview URLs expire in 30 days and can be shared with stakeholders for review.
 */
export const getWhatsAppFlowPreview: API.OperationMethod<
  GetWhatsAppFlowPreviewInput,
  GetWhatsAppFlowPreviewOutput,
  GetWhatsAppFlowPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetWhatsAppFlowPreviewInput>,
  output: __S(385, __c24, 1) as any as S.Schema<GetWhatsAppFlowPreviewOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlowPreview",
}));

export type GetWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Get a media file from the WhatsApp service. On successful completion the media file is
 * retrieved from Meta and stored in the specified Amazon S3 bucket. Use either
 * `destinationS3File` or `destinationS3PresignedUrl` for the
 * destination. If both are used then an `InvalidParameterException` is
 * returned.
 */
export const getWhatsAppMessageMedia: API.OperationMethod<
  GetWhatsAppMessageMediaInput,
  GetWhatsAppMessageMediaOutput,
  GetWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetWhatsAppMessageMediaInput>,
  output: __S(401, __c25, 1) as any as S.Schema<GetWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageMedia",
}));

export type GetWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves a specific WhatsApp message template.
 */
export const getWhatsAppMessageTemplate: API.OperationMethod<
  GetWhatsAppMessageTemplateInput,
  GetWhatsAppMessageTemplateOutput,
  GetWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetWhatsAppMessageTemplateInput>,
  output: __S(433, __c27, 1) as any as S.Schema<GetWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageTemplate",
}));

export type ListLinkedWhatsAppBusinessAccountsError =
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * List all WhatsApp Business Accounts linked to your Amazon Web Services account.
 */
export const listLinkedWhatsAppBusinessAccounts: API.PaginatedOperationMethod<
  ListLinkedWhatsAppBusinessAccountsInput,
  ListLinkedWhatsAppBusinessAccountsOutput,
  ListLinkedWhatsAppBusinessAccountsError,
  Credentials | HttpClient.HttpClient,
  LinkedWhatsAppBusinessAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsInput>,
  output: __S(451, __c28, 3) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinkedWhatsAppBusinessAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "linkedAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * List all tags associated with a resource, such as a phone number or WABA.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(465, __c29, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServiceException, InvalidParametersException, ThrottledRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists the assets (Flow JSON definition) of a WhatsApp Flow with presigned download URLs. Download URLs are generated by Meta and expire after a short period.
 */
export const listWhatsAppFlowAssets: API.PaginatedOperationMethod<
  ListWhatsAppFlowAssetsInput,
  ListWhatsAppFlowAssetsOutput,
  ListWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowAsset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListWhatsAppFlowAssetsInput>,
  output: __S(483, __c30, 3) as any as S.Schema<ListWhatsAppFlowAssetsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppFlowAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowAssets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppFlowsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists all WhatsApp Flows for a WhatsApp Business Account. Returns summary information including Flow ID, name, status, and categories.
 */
export const listWhatsAppFlows: API.PaginatedOperationMethod<
  ListWhatsAppFlowsInput,
  ListWhatsAppFlowsOutput,
  ListWhatsAppFlowsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListWhatsAppFlowsInput>,
  output: __S(499, __c31, 3) as any as S.Schema<ListWhatsAppFlowsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppFlows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppMessageTemplatesError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists WhatsApp message templates for a specific WhatsApp Business Account.
 */
export const listWhatsAppMessageTemplates: API.PaginatedOperationMethod<
  ListWhatsAppMessageTemplatesInput,
  ListWhatsAppMessageTemplatesOutput,
  ListWhatsAppMessageTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListWhatsAppMessageTemplatesInput>,
  output: __S(515, __c32, 3) as any as S.Schema<ListWhatsAppMessageTemplatesOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppMessageTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppTemplateLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists templates available in Meta's template library for WhatsApp messaging.
 */
export const listWhatsAppTemplateLibrary: API.PaginatedOperationMethod<
  ListWhatsAppTemplateLibraryInput,
  ListWhatsAppTemplateLibraryOutput,
  ListWhatsAppTemplateLibraryError,
  Credentials | HttpClient.HttpClient,
  MetaLibraryTemplateDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListWhatsAppTemplateLibraryInput>,
  output: __S(533, __c33, 5) as any as S.Schema<ListWhatsAppTemplateLibraryOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppTemplateLibrary",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metaLibraryTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PostWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Upload a media file to the WhatsApp service. Only the specified
 * `originationPhoneNumberId` has the permissions to send the media file when
 * using SendWhatsAppMessage. You must use either `sourceS3File`
 * or `sourceS3PresignedUrl` for the source. If both or neither are specified then an
 * `InvalidParameterException` is returned.
 */
export const postWhatsAppMessageMedia: API.OperationMethod<
  PostWhatsAppMessageMediaInput,
  PostWhatsAppMessageMediaOutput,
  PostWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<PostWhatsAppMessageMediaInput>,
  output: __S(545, __c34, 1) as any as S.Schema<PostWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostWhatsAppMessageMedia",
}));

export type PublishWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Publishes a WhatsApp Flow, making it available for use in template messages. The Flow must be in DRAFT status with valid Flow JSON that passes Meta's validation. This is an irreversible operation.
 */
export const publishWhatsAppFlow: API.OperationMethod<
  PublishWhatsAppFlowInput,
  PublishWhatsAppFlowOutput,
  PublishWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<PublishWhatsAppFlowInput>,
  output: __S(192, __c12, 0) as any as S.Schema<PublishWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishWhatsAppFlow",
}));

export type PutWhatsAppBusinessAccountEventDestinationsError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Add an event destination to log event data from WhatsApp for a WhatsApp Business Account (WABA). A WABA can only have one event destination at a time. All resources associated with the WABA use the same event destination.
 */
export const putWhatsAppBusinessAccountEventDestinations: API.OperationMethod<
  PutWhatsAppBusinessAccountEventDestinationsInput,
  PutWhatsAppBusinessAccountEventDestinationsOutput,
  PutWhatsAppBusinessAccountEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsInput>,
  output: __S(192, __c12, 0) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsOutput>,
  errors: [InternalServiceException, InvalidParametersException, ThrottledRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessAccountEventDestinations",
}));

export type PutWhatsAppBusinessPublicKeyError =
  | AccessDeniedByMetaException
  | AccessDeniedException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Sets the business public key used to encrypt the data exchanged with the endpoint of a data exchange Flow.
 */
export const putWhatsAppBusinessPublicKey: API.OperationMethod<
  PutWhatsAppBusinessPublicKeyInput,
  PutWhatsAppBusinessPublicKeyOutput,
  PutWhatsAppBusinessPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<PutWhatsAppBusinessPublicKeyInput>,
  output: __S(192, __c12, 0) as any as S.Schema<PutWhatsAppBusinessPublicKeyOutput>,
  errors: [
    AccessDeniedByMetaException,
    AccessDeniedException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessPublicKey",
}));

export type SendWhatsAppCallEventError =
  | AccessDeniedByMetaException
  | ConflictException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Sends a WhatsApp calling event, such as connecting or terminating a call, for a business phone number. This operation passes the event through to Meta. To use this operation, the origination phone number must belong to a WhatsApp Business Account that is linked to your Amazon Web Services account.
 */
export const sendWhatsAppCallEvent: API.OperationMethod<
  SendWhatsAppCallEventInput,
  SendWhatsAppCallEventOutput,
  SendWhatsAppCallEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<SendWhatsAppCallEventInput>,
  output: __S(609, __c38, 1) as any as S.Schema<SendWhatsAppCallEventOutput>,
  errors: [
    AccessDeniedByMetaException,
    ConflictException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppCallEvent",
}));

export type SendWhatsAppConversionEventError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Sends a conversion event to Meta's Conversions API for the specified WhatsApp Business Account dataset.
 */
export const sendWhatsAppConversionEvent: API.OperationMethod<
  SendWhatsAppConversionEventInput,
  SendWhatsAppConversionEventOutput,
  SendWhatsAppConversionEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<SendWhatsAppConversionEventInput>,
  output: __S(625, __c39, 1) as any as S.Schema<SendWhatsAppConversionEventOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppConversionEvent",
}));

export type SendWhatsAppMessageError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedByMetaException
  | CommonErrors;
/**
 * Send a WhatsApp message. For examples of sending a message using the Amazon Web Services
 * CLI, see Sending messages in the
 *
 * *Amazon Web Services End User Messaging Social User Guide*
 * .
 */
export const sendWhatsAppMessage: API.OperationMethod<
  SendWhatsAppMessageInput,
  SendWhatsAppMessageOutput,
  SendWhatsAppMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<SendWhatsAppMessageInput>,
  output: __S(641, __c40, 1) as any as S.Schema<SendWhatsAppMessageOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedByMetaException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppMessage",
}));

export type TagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified resource. When you specify
 * an existing tag key, the value is overwritten with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<TagResourceInput>,
  output: __S(672, __c42, 0) as any as S.Schema<TagResourceOutput>,
  errors: [InternalServiceException, InvalidParametersException, ThrottledRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Removes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(672, __c42, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [InternalServiceException, InvalidParametersException, ThrottledRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateLinkedWhatsAppBusinessAccountPhoneNumberError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates the calling settings for a linked WhatsApp business phone number, such as whether calling is enabled and the hours during which the business accepts calls.
 */
export const updateLinkedWhatsAppBusinessAccountPhoneNumber: API.OperationMethod<
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput,
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput>,
  output: __S(
    705,
    __c44,
    1,
  ) as any as S.Schema<UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLinkedWhatsAppBusinessAccountPhoneNumber",
}));

export type UpdateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates the metadata of a WhatsApp Flow, such as its name or categories. This does not update the Flow JSON definition. Use UpdateWhatsAppFlowAssets to update the Flow JSON.
 */
export const updateWhatsAppFlow: API.OperationMethod<
  UpdateWhatsAppFlowInput,
  UpdateWhatsAppFlowOutput,
  UpdateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<UpdateWhatsAppFlowInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlow",
}));

export type UpdateWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates the Flow JSON definition (assets) of a WhatsApp Flow. Updating a published Flow's assets reverts it to DRAFT status, requiring re-publishing.
 */
export const updateWhatsAppFlowAssets: API.OperationMethod<
  UpdateWhatsAppFlowAssetsInput,
  UpdateWhatsAppFlowAssetsOutput,
  UpdateWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UpdateWhatsAppFlowAssetsInput>,
  output: __S(737, __c46, 1) as any as S.Schema<UpdateWhatsAppFlowAssetsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlowAssets",
}));

export type UpdateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates an existing WhatsApp message template.
 */
export const updateWhatsAppMessageTemplate: API.OperationMethod<
  UpdateWhatsAppMessageTemplateInput,
  UpdateWhatsAppMessageTemplateOutput,
  UpdateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateWhatsAppMessageTemplateInput>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppMessageTemplate",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/waba/dataset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWhatsAppDatasetInput" });
    case 1:
      return S.suspend(() => S.Struct({ datasetId: S.String })).annotate({
        identifier: "CreateWhatsAppDatasetOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          flowName: S.String,
          categories: __S(48, __c3, 0),
          flowJson: S.optional(T.Blob),
          publish: S.optional(S.Boolean),
          cloneFlowId: S.optional(S.String),
          endpointUri: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/flow/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWhatsAppFlowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ flowId: S.optional(S.String), validationErrors: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "CreateWhatsAppFlowOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
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
        S.Struct({ templateDefinition: T.Blob, id: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/template/put" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWhatsAppMessageTemplateInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metaTemplateId: S.optional(S.String),
          templateStatus: S.optional(S.String),
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWhatsAppMessageTemplateOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          phoneNumber: S.optional(S.String),
          url: S.optional(__S(112, __c7, 0)),
          otpType: S.optional(S.String),
          zeroTapTermsAccepted: S.optional(S.Boolean),
          supportedApps: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "LibraryTemplateButtonInput" });
    case 1:
      return S.Array(__S(96, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          addContactNumber: S.optional(S.Boolean),
          addLearnMoreLink: S.optional(S.Boolean),
          addSecurityRecommendation: S.optional(S.Boolean),
          addTrackPackageLink: S.optional(S.Boolean),
          codeExpirationMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LibraryTemplateBodyInputs" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          libraryTemplateName: S.String,
          templateCategory: S.String,
          templateLanguage: S.String,
          libraryTemplateButtonInputs: S.optional(__S(97, __c6, 1)),
          libraryTemplateBodyInputs: S.optional(__S(98, __c6, 2)),
        }),
      ).annotate({ identifier: "MetaLibraryTemplate" });
    case 4:
      return S.suspend(() =>
        S.Struct({ metaLibraryTemplate: __S(99, __c6, 3), id: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/template/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWhatsAppMessageTemplateFromLibraryInput" });
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
      return S.Array(__S(112, __c7, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, sourceS3File: S.optional(__S(160, __c10, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/template/media" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWhatsAppMessageTemplateMediaInput" });
    case 1:
      return S.suspend(() => S.Struct({ metaHeaderHandle: S.optional(S.String) })).annotate({
        identifier: "CreateWhatsAppMessageTemplateMediaOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucketName: S.String, key: S.String })).annotate({
        identifier: "S3File",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          flowId: S.String.pipe(T.HttpQuery("flowId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/whatsapp/flow" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWhatsAppFlowInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteWhatsAppFlowOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mediaId: S.String.pipe(T.HttpQuery("mediaId")),
          originationPhoneNumberId: S.String.pipe(T.HttpQuery("originationPhoneNumberId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/whatsapp/media" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWhatsAppMessageMediaInput" });
    case 1:
      return S.suspend(() => S.Struct({ success: S.optional(S.Boolean) })).annotate({
        identifier: "DeleteWhatsAppMessageMediaOutput",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metaTemplateId: S.optional(S.String).pipe(T.HttpQuery("metaTemplateId")),
          deleteAllLanguages: S.optional(S.Boolean).pipe(T.HttpQuery("deleteAllTemplates")),
          id: S.String.pipe(T.HttpQuery("id")),
          templateName: S.String.pipe(T.HttpQuery("templateName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/whatsapp/template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWhatsAppMessageTemplateInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, flowId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/flow/deprecate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeprecateWhatsAppFlowInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/whatsapp/waba/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateWhatsAppBusinessAccountInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/waba/details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinkedWhatsAppBusinessAccountInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          wabaId: S.String,
          registrationStatus: S.String,
          linkDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          wabaName: S.String,
          eventDestinations: __S(817, __c51, 1),
          marketingMessagesOnboardingStatus: S.optional(S.String),
          datasetId: S.optional(S.String),
          phoneNumbers: __S(784, __c49, 0),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccount" });
    case 2:
      return S.suspend(() => S.Struct({ account: S.optional(__S(273, __c17, 1)) })).annotate({
        identifier: "GetLinkedWhatsAppBusinessAccountOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/waba/phone/details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinkedWhatsAppBusinessAccountPhoneNumberInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          phoneNumber: S.optional(__S(800, __c50, 0)),
          linkedWhatsAppBusinessAccountId: S.optional(S.String),
          callSettings: S.optional(__S(310, __c19, 6)),
        }),
      ).annotate({ identifier: "GetLinkedWhatsAppBusinessAccountPhoneNumberOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ hours: S.Number, minutes: S.Number })).annotate({
        identifier: "WhatsAppTimeOfDay",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dayOfWeek: S.String,
          openTime: __S(304, __c19, 0),
          closeTime: __S(304, __c19, 0),
        }),
      ).annotate({ identifier: "WhatsAppWeeklyOperatingHoursEntry" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ date: S.String, startTime: __S(304, __c19, 0), endTime: __S(304, __c19, 0) }),
      ).annotate({ identifier: "WhatsAppHolidayScheduleEntry" });
    case 4:
      return S.Array(__S(307, __c19, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          timezone: S.String,
          weeklyOperatingHours: __S(306, __c19, 2),
          holidaySchedule: S.optional(__S(308, __c19, 4)),
        }),
      ).annotate({ identifier: "WhatsAppCallHours" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          callEnabled: S.Boolean,
          callHours: S.optional(__S(309, __c19, 5)),
          callIconVisibility: S.optional(S.String),
          callbackPermissionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "WhatsAppCallSettings" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String.pipe(T.HttpQuery("originationPhoneNumberId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/business-public-key" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWhatsAppBusinessPublicKeyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          businessPublicKey: S.optional(S.String),
          businessPublicKeySignatureStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWhatsAppBusinessPublicKeyOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          destinationPhoneNumber: S.optional(SensitiveString),
          endUserBsuid: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/call/permission/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWhatsAppCallPermissionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "WhatsAppCallPermission" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          timePeriod: S.String,
          maxAllowed: S.Number,
          currentUsage: S.Number,
          limitExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "WhatsAppCallPermissionLimit" });
    case 3:
      return S.Array(__S(338, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ actionName: S.String, canPerformAction: S.Boolean, limits: __S(339, __c21, 3) }),
      ).annotate({ identifier: "WhatsAppCallPermissionAction" });
    case 5:
      return S.Array(__S(340, __c21, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ permission: __S(337, __c21, 1), actions: __S(341, __c21, 5) }),
      ).annotate({ identifier: "GetWhatsAppCallPermissionOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          flowId: S.String.pipe(T.HttpQuery("flowId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/whatsapp/flow" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWhatsAppFlowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          currency: S.optional(S.String),
          timezoneId: S.optional(S.String),
          messageTemplateNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetaFlowWhatsAppBusinessAccountInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ link: S.optional(S.String), name: S.String, id: S.String }),
      ).annotate({ identifier: "MetaFlowApplicationInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({ entityType: S.String, id: S.String, canSendMessage: S.String }),
      ).annotate({ identifier: "MetaFlowHealthEntity" });
    case 4:
      return S.Array(__S(355, __c22, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ canSendMessage: S.String, entities: S.optional(__S(356, __c22, 4)) }),
      ).annotate({ identifier: "MetaFlowHealthStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          flowId: S.String,
          flowName: S.String,
          flowStatus: S.String,
          categories: S.optional(__S(48, __c3, 0)),
          validationErrors: S.optional(__S(32, __c2, 0)),
          jsonVersion: S.optional(S.String),
          dataApiVersion: S.optional(S.String),
          endpointUri: S.optional(S.String),
          preview: S.optional(__S(368, __c23, 0)),
          whatsAppBusinessAccount: S.optional(__S(353, __c22, 1)),
          application: S.optional(__S(354, __c22, 2)),
          healthStatus: S.optional(__S(357, __c22, 5)),
        }),
      ).annotate({ identifier: "GetWhatsAppFlowOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ previewUrl: S.String, expiresAt: S.String })).annotate({
        identifier: "MetaFlowPreviewInfo",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          flowId: S.String.pipe(T.HttpQuery("flowId")),
          invalidate: S.optional(S.Boolean).pipe(T.HttpQuery("invalidate")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/flow/preview" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWhatsAppFlowPreviewInput" });
    case 1:
      return S.suspend(() => S.Struct({ flowId: S.String, preview: __S(368, __c23, 0) })).annotate({
        identifier: "GetWhatsAppFlowPreviewOutput",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mediaId: S.String,
          originationPhoneNumberId: S.String,
          metadataOnly: S.optional(S.Boolean),
          destinationS3PresignedUrl: S.optional(__S(416, __c26, 0)),
          destinationS3File: S.optional(__S(160, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/media/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWhatsAppMessageMediaInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ mimeType: S.optional(S.String), fileSize: S.optional(S.Number) }),
      ).annotate({ identifier: "GetWhatsAppMessageMediaOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ url: S.String, headers: __S(112, __c7, 0) })).annotate({
        identifier: "S3PresignedUrl",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metaTemplateId: S.optional(S.String).pipe(T.HttpQuery("metaTemplateId")),
          id: S.String.pipe(T.HttpQuery("id")),
          templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
          templateLanguageCode: S.optional(S.String).pipe(T.HttpQuery("templateLanguageCode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWhatsAppMessageTemplateInput" });
    case 1:
      return S.suspend(() => S.Struct({ template: S.optional(S.String) })).annotate({
        identifier: "GetWhatsAppMessageTemplateOutput",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/waba/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLinkedWhatsAppBusinessAccountsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          wabaId: S.String,
          registrationStatus: S.String,
          linkDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          wabaName: S.String,
          eventDestinations: __S(817, __c51, 1),
          marketingMessagesOnboardingStatus: S.optional(S.String),
          datasetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccountSummary" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          linkedAccounts: S.optional(__S(450, __c28, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLinkedWhatsAppBusinessAccountsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/tags/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.Number), tags: S.optional(__S(833, __c52, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          flowId: S.String.pipe(T.HttpQuery("flowId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/flow/assets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWhatsAppFlowAssetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, assetType: S.String, downloadUrl: S.String }),
      ).annotate({ identifier: "MetaFlowAsset" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flowAssets: __S(482, __c30, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppFlowAssetsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/flow/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWhatsAppFlowsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          flowId: S.String,
          flowName: S.String,
          flowStatus: S.String,
          flowCategories: __S(48, __c3, 0),
          validationErrors: __S(32, __c2, 0),
        }),
      ).annotate({ identifier: "MetaFlowSummary" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flows: __S(498, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppFlowsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpQuery("id")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/whatsapp/template/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWhatsAppMessageTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateName: S.optional(S.String),
          metaTemplateId: S.optional(S.String),
          templateStatus: S.optional(S.String),
          templateQualityScore: S.optional(S.String),
          templateLanguage: S.optional(S.String),
          templateCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateSummary" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ templates: S.optional(__S(514, __c32, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppMessageTemplatesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          id: S.String.pipe(T.HttpQuery("id")),
          filters: S.optional(__S(112, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/template/library" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWhatsAppTemplateLibraryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          text: S.optional(S.String),
          phoneNumber: S.optional(S.String),
          url: S.optional(S.String),
          otpType: S.optional(S.String),
          zeroTapTermsAccepted: S.optional(S.Boolean),
          supportedApps: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "LibraryTemplateButtonList" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          templateName: S.optional(S.String),
          templateLanguage: S.optional(S.String),
          templateCategory: S.optional(S.String),
          templateTopic: S.optional(S.String),
          templateUseCase: S.optional(S.String),
          templateIndustry: S.optional(__S(32, __c2, 0)),
          templateHeader: S.optional(S.String),
          templateBody: S.optional(S.String),
          templateButtons: S.optional(__S(530, __c33, 2)),
          templateId: S.optional(S.String),
          templateBodyExampleParams: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "MetaLibraryTemplateDefinition" });
    case 4:
      return S.Array(__S(531, __c33, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          metaLibraryTemplates: S.optional(__S(532, __c33, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWhatsAppTemplateLibraryOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          sourceS3PresignedUrl: S.optional(__S(416, __c26, 0)),
          sourceS3File: S.optional(__S(160, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/media" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostWhatsAppMessageMediaInput" });
    case 1:
      return S.suspend(() => S.Struct({ mediaId: S.optional(S.String) })).annotate({
        identifier: "PostWhatsAppMessageMediaOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, flowId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/flow/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishWhatsAppFlowInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, eventDestinations: __S(817, __c51, 1) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/whatsapp/waba/eventdestinations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutWhatsAppBusinessAccountEventDestinationsInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          businessPublicKey: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/whatsapp/business-public-key" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutWhatsAppBusinessPublicKeyInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          metaApiVersion: S.String,
          callEvent: SensitiveBlob,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/call/event" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendWhatsAppCallEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ callId: S.String })).annotate({
        identifier: "SendWhatsAppCallEventOutput",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, datasetId: S.String, eventData: SensitiveBlob }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/waba/dataset/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendWhatsAppConversionEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ requestId: S.String })).annotate({
        identifier: "SendWhatsAppConversionEventOutput",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          message: SensitiveBlob,
          metaApiVersion: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/whatsapp/send" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SendWhatsAppMessageInput" });
    case 1:
      return S.suspend(() => S.Struct({ messageId: S.optional(S.String) })).annotate({
        identifier: "SendWhatsAppMessageOutput",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(833, __c52, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/tag-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ statusCode: S.optional(S.Number) })).annotate({
        identifier: "TagResourceOutput",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(32, __c2, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/untag-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")), callSettings: __S(310, __c19, 6) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/whatsapp/waba/phone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput" });
    case 1:
      return S.suspend(() => S.Struct({ phoneNumberId: S.String })).annotate({
        identifier: "UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          flowId: S.String,
          flowName: S.optional(S.String),
          categories: S.optional(__S(48, __c3, 0)),
          endpointUri: S.optional(S.String),
          metaAppId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/flow/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWhatsAppFlowInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, flowId: S.String, flowJson: T.Blob }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/flow/assets/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWhatsAppFlowAssetsInput" });
    case 1:
      return S.suspend(() => S.Struct({ validationErrors: S.optional(__S(32, __c2, 0)) })).annotate(
        { identifier: "UpdateWhatsAppFlowAssetsOutput" },
      );
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          metaTemplateId: S.optional(S.String),
          templateName: S.optional(S.String),
          templateLanguageCode: S.optional(S.String),
          parameterFormat: S.optional(S.String),
          templateCategory: S.optional(S.String),
          templateComponents: S.optional(T.Blob),
          ctaUrlLinkTrackingOptedOut: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWhatsAppMessageTemplateInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessToken: SensitiveString, callbackUrl: S.optional(S.String) }),
      ).annotate({ identifier: "WhatsAppSignupCallback" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          twoFactorPin: SensitiveString,
          dataLocalizationRegion: S.optional(S.String),
          tags: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "WabaPhoneNumberSetupFinalization" });
    case 2:
      return S.Array(__S(769, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          eventDestinations: S.optional(__S(817, __c51, 1)),
          tags: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "WabaSetupFinalization" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          associateInProgressToken: SensitiveString,
          phoneNumbers: __S(770, __c48, 2),
          phoneNumberParent: S.optional(S.String),
          waba: S.optional(__S(771, __c48, 3)),
        }),
      ).annotate({ identifier: "WhatsAppSetupFinalization" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          signupCallback: S.optional(__S(768, __c48, 0)),
          setupFinalization: S.optional(__S(772, __c48, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/whatsapp/signup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateWhatsAppBusinessAccountInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          accountName: S.optional(S.String),
          registrationStatus: S.optional(S.String),
          unregisteredWhatsAppPhoneNumbers: S.optional(__S(784, __c49, 0)),
          wabaId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccountIdMetaData" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(774, __c48, 6).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          associateInProgressToken: S.optional(SensitiveString),
          linkedAccountsWithIncompleteSetup: S.optional(__S(775, __c48, 7)),
        }),
      ).annotate({ identifier: "WhatsAppSignupCallbackResult" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          signupCallbackResult: S.optional(__S(776, __c48, 8)),
          statusCode: S.optional(S.Number),
          linkedWhatsAppBusinessAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateWhatsAppBusinessAccountOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(800, __c50, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          phoneNumber: S.String,
          phoneNumberId: S.String,
          metaPhoneNumberId: S.String,
          displayPhoneNumberName: S.String,
          displayPhoneNumber: S.String,
          qualityRating: S.String,
          dataLocalizationRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "WhatsAppPhoneNumberDetail" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventDestinationArn: S.String, roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "WhatsAppBusinessAccountEventDestination" });
    case 1:
      return S.Array(__S(816, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(832, __c52, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
