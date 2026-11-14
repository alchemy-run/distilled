import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SocialMessaging",
  service: "SocialMessaging",
  propagate: TxXray.propagate,
} as const;

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
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface WhatsAppSignupCallback {
  accessToken: string | redacted.Redacted<string>;
  callbackUrl?: string | undefined;
}
export type AssociateInProgressToken = string | redacted.Redacted<string>;
export type WhatsAppPhoneNumber = string;
export type TwoFactorPin = string | redacted.Redacted<string>;
export type IsoCountryCode = string;
export interface Tag {
  key: string;
  value?: string | undefined;
}
export type TagList = Tag[];
export interface WabaPhoneNumberSetupFinalization {
  id: string;
  twoFactorPin: string | redacted.Redacted<string>;
  dataLocalizationRegion?: string | undefined;
  tags?: Tag[] | undefined;
}
export type WabaPhoneNumberSetupFinalizationList = WabaPhoneNumberSetupFinalization[];
export type LinkedWhatsAppBusinessAccountId = string;
export type WhatsAppBusinessAccountId = string;
export type EventDestinationArn = string;
export type RoleArn = string;
export interface WhatsAppBusinessAccountEventDestination {
  eventDestinationArn: string;
  roleArn?: string | undefined;
}
export type WhatsAppBusinessAccountEventDestinations = WhatsAppBusinessAccountEventDestination[];
export interface WabaSetupFinalization {
  id?: string | undefined;
  eventDestinations?: WhatsAppBusinessAccountEventDestination[] | undefined;
  tags?: Tag[] | undefined;
}
export interface WhatsAppSetupFinalization {
  associateInProgressToken: string | redacted.Redacted<string>;
  phoneNumbers: WabaPhoneNumberSetupFinalization[];
  phoneNumberParent?: string | undefined;
  waba?: WabaSetupFinalization | undefined;
}
export interface AssociateWhatsAppBusinessAccountInput {
  signupCallback?: WhatsAppSignupCallback | undefined;
  setupFinalization?: WhatsAppSetupFinalization | undefined;
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
  dataLocalizationRegion?: string | undefined;
}
export type WhatsAppPhoneNumberDetailList = WhatsAppPhoneNumberDetail[];
export interface LinkedWhatsAppBusinessAccountIdMetaData {
  accountName?: string | undefined;
  registrationStatus?: RegistrationStatus | undefined;
  unregisteredWhatsAppPhoneNumbers?: WhatsAppPhoneNumberDetail[] | undefined;
  wabaId?: string | undefined;
}
export type LinkedAccountWithIncompleteSetup = {
  [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined;
};
export interface WhatsAppSignupCallbackResult {
  associateInProgressToken?: string | redacted.Redacted<string> | undefined;
  linkedAccountsWithIncompleteSetup?:
    | { [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined }
    | undefined;
}
export interface AssociateWhatsAppBusinessAccountOutput {
  signupCallbackResult?: WhatsAppSignupCallbackResult | undefined;
  statusCode?: number | undefined;
  linkedWhatsAppBusinessAccountId?: string | undefined;
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
  flowJson?: Uint8Array | undefined;
  publish?: boolean | undefined;
  cloneFlowId?: string | undefined;
  endpointUri?: string | undefined;
}
export type MetaFlowValidationError = string;
export type ValidationErrorList = string[];
export interface CreateWhatsAppFlowOutput {
  flowId?: string | undefined;
  validationErrors?: string[] | undefined;
}
export type MetaTemplateDefinition = Uint8Array;
export interface CreateWhatsAppMessageTemplateInput {
  templateDefinition: Uint8Array;
  id: string;
}
export type MetaTemplateId = string;
export type MetaTemplateCategory = string;
export interface CreateWhatsAppMessageTemplateOutput {
  metaTemplateId?: string | undefined;
  templateStatus?: string | undefined;
  category?: string | undefined;
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
  type?: string | undefined;
  phoneNumber?: string | undefined;
  url?: { [key: string]: string | undefined } | undefined;
  otpType?: string | undefined;
  zeroTapTermsAccepted?: boolean | undefined;
  supportedApps?: { [key: string]: string | undefined }[] | undefined;
}
export type MetaLibraryTemplateButtonInputs = LibraryTemplateButtonInput[];
export type AddContactNumber = boolean;
export type AddLearnMoreLink = boolean;
export type AddSecurityRecommendation = boolean;
export type AddTrackPackageLink = boolean;
export type CodeExpirationMinutes = number;
export interface LibraryTemplateBodyInputs {
  addContactNumber?: boolean | undefined;
  addLearnMoreLink?: boolean | undefined;
  addSecurityRecommendation?: boolean | undefined;
  addTrackPackageLink?: boolean | undefined;
  codeExpirationMinutes?: number | undefined;
}
export interface MetaLibraryTemplate {
  templateName: string;
  libraryTemplateName: string;
  templateCategory: string;
  templateLanguage: string;
  libraryTemplateButtonInputs?: LibraryTemplateButtonInput[] | undefined;
  libraryTemplateBodyInputs?: LibraryTemplateBodyInputs | undefined;
}
export interface CreateWhatsAppMessageTemplateFromLibraryInput {
  metaLibraryTemplate: MetaLibraryTemplate;
  id: string;
}
export interface CreateWhatsAppMessageTemplateFromLibraryOutput {
  metaTemplateId?: string | undefined;
  templateStatus?: string | undefined;
  category?: string | undefined;
}
export interface S3File {
  bucketName: string;
  key: string;
}
export interface CreateWhatsAppMessageTemplateMediaInput {
  id: string;
  sourceS3File?: S3File | undefined;
}
export interface CreateWhatsAppMessageTemplateMediaOutput {
  metaHeaderHandle?: string | undefined;
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
  success?: boolean | undefined;
}
export type DeleteAllLanguages = boolean;
export interface DeleteWhatsAppMessageTemplateInput {
  metaTemplateId?: string | undefined;
  deleteAllLanguages?: boolean | undefined;
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
export type DirectSendEnforcementStatus = string;
export type DirectSendEnforcementStatusExpiresAt = Date;
export interface WhatsAppPhoneNumberSummary {
  arn: string;
  phoneNumber: string;
  phoneNumberId: string;
  metaPhoneNumberId: string;
  displayPhoneNumberName: string;
  displayPhoneNumber: string;
  qualityRating: string;
  dataLocalizationRegion?: string | undefined;
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
  marketingMessagesOnboardingStatus?: string | undefined;
  directSendEnforcementStatus?: string | undefined;
  directSendEnforcementStatusExpiresAt?: Date | undefined;
  datasetId?: string | undefined;
  phoneNumbers: WhatsAppPhoneNumberSummary[];
}
export interface GetLinkedWhatsAppBusinessAccountOutput {
  account?: LinkedWhatsAppBusinessAccount | undefined;
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
  holidaySchedule?: WhatsAppHolidayScheduleEntry[] | undefined;
}
export type WhatsAppCallIconVisibility = string;
export type WhatsAppCallbackPermissionStatus = string;
export interface WhatsAppCallSettings {
  callEnabled: boolean;
  callHours?: WhatsAppCallHours | undefined;
  callIconVisibility?: string | undefined;
  callbackPermissionStatus?: string | undefined;
}
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberOutput {
  phoneNumber?: WhatsAppPhoneNumberDetail | undefined;
  linkedWhatsAppBusinessAccountId?: string | undefined;
  callSettings?: WhatsAppCallSettings | undefined;
}
export interface GetWhatsAppBusinessPublicKeyInput {
  originationPhoneNumberId: string;
}
export type BusinessPublicKeyPem = string;
export type BusinessPublicKeySignatureStatus = string;
export interface GetWhatsAppBusinessPublicKeyOutput {
  businessPublicKey?: string | undefined;
  businessPublicKeySignatureStatus?: string | undefined;
}
export type WhatsAppDestinationPhoneNumber = string | redacted.Redacted<string>;
export type WhatsAppBusinessScopedUserId = string | redacted.Redacted<string>;
export interface GetWhatsAppCallPermissionInput {
  originationPhoneNumberId: string;
  destinationPhoneNumber?: string | redacted.Redacted<string> | undefined;
  endUserBsuid?: string | redacted.Redacted<string> | undefined;
}
export type WhatsAppCallPermissionStatus = string;
export interface WhatsAppCallPermission {
  status: string;
  expirationTime?: Date | undefined;
}
export type WhatsAppCallPermissionActionName = string;
export type Iso8601Duration = string;
export interface WhatsAppCallPermissionLimit {
  timePeriod: string;
  maxAllowed: number;
  currentUsage: number;
  limitExpirationTime?: Date | undefined;
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
  currency?: string | undefined;
  timezoneId?: string | undefined;
  messageTemplateNamespace?: string | undefined;
}
export type MetaFlowApplicationLink = string;
export type MetaFlowApplicationName = string;
export type MetaFlowApplicationId = string;
export interface MetaFlowApplicationInfo {
  link?: string | undefined;
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
  entities?: MetaFlowHealthEntity[] | undefined;
}
export interface GetWhatsAppFlowOutput {
  flowId: string;
  flowName: string;
  flowStatus: string;
  categories?: MetaFlowCategory[] | undefined;
  validationErrors?: string[] | undefined;
  jsonVersion?: string | undefined;
  dataApiVersion?: string | undefined;
  endpointUri?: string | undefined;
  preview?: MetaFlowPreviewInfo | undefined;
  whatsAppBusinessAccount?: MetaFlowWhatsAppBusinessAccountInfo | undefined;
  application?: MetaFlowApplicationInfo | undefined;
  healthStatus?: MetaFlowHealthStatus | undefined;
}
export interface GetWhatsAppFlowPreviewInput {
  id: string;
  flowId: string;
  invalidate?: boolean | undefined;
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
  metadataOnly?: boolean | undefined;
  destinationS3PresignedUrl?: S3PresignedUrl | undefined;
  destinationS3File?: S3File | undefined;
}
export interface GetWhatsAppMessageMediaOutput {
  mimeType?: string | undefined;
  fileSize?: number | undefined;
}
export interface GetWhatsAppMessageTemplateInput {
  metaTemplateId?: string | undefined;
  id: string;
  templateName?: string | undefined;
  templateLanguageCode?: string | undefined;
}
export type MetaTemplate = string;
export interface GetWhatsAppMessageTemplateOutput {
  template?: string | undefined;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListLinkedWhatsAppBusinessAccountsInput {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface LinkedWhatsAppBusinessAccountSummary {
  arn: string;
  id: string;
  wabaId: string;
  registrationStatus: RegistrationStatus;
  linkDate: Date;
  wabaName: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
  marketingMessagesOnboardingStatus?: string | undefined;
  directSendEnforcementStatus?: string | undefined;
  directSendEnforcementStatusExpiresAt?: Date | undefined;
  datasetId?: string | undefined;
}
export type LinkedWhatsAppBusinessAccountSummaryList = LinkedWhatsAppBusinessAccountSummary[];
export interface ListLinkedWhatsAppBusinessAccountsOutput {
  linkedAccounts?: LinkedWhatsAppBusinessAccountSummary[] | undefined;
  nextToken?: string | undefined;
}
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  statusCode?: number | undefined;
  tags?: Tag[] | undefined;
}
export interface ListWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
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
  nextToken?: string | undefined;
}
export interface ListWhatsAppFlowsInput {
  id: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
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
  nextToken?: string | undefined;
}
export interface ListWhatsAppMessageTemplatesInput {
  id: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type MetaTemplateStatus = string;
export type MetaTemplateQualityScore = string;
export type MetaTemplateSource = string;
export interface TemplateSummary {
  templateName?: string | undefined;
  metaTemplateId?: string | undefined;
  templateStatus?: string | undefined;
  templateQualityScore?: string | undefined;
  templateLanguage?: string | undefined;
  templateCategory?: string | undefined;
  templateSource?: string | undefined;
  correctCategory?: string | undefined;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListWhatsAppMessageTemplatesOutput {
  templates?: TemplateSummary[] | undefined;
  nextToken?: string | undefined;
}
export type Filter = { [key: string]: string | undefined };
export interface ListWhatsAppTemplateLibraryInput {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  id: string;
  filters?: { [key: string]: string | undefined } | undefined;
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
  type?: string | undefined;
  text?: string | undefined;
  phoneNumber?: string | undefined;
  url?: string | undefined;
  otpType?: string | undefined;
  zeroTapTermsAccepted?: boolean | undefined;
  supportedApps?: { [key: string]: string | undefined }[] | undefined;
}
export type MetaLibraryTemplateButtonList = LibraryTemplateButtonList[];
export type MetaTemplateBodyExampleParams = string[];
export interface MetaLibraryTemplateDefinition {
  templateName?: string | undefined;
  templateLanguage?: string | undefined;
  templateCategory?: string | undefined;
  templateTopic?: string | undefined;
  templateUseCase?: string | undefined;
  templateIndustry?: string[] | undefined;
  templateHeader?: string | undefined;
  templateBody?: string | undefined;
  templateButtons?: LibraryTemplateButtonList[] | undefined;
  templateId?: string | undefined;
  templateBodyExampleParams?: string[] | undefined;
}
export type MetaLibraryTemplatesList = MetaLibraryTemplateDefinition[];
export interface ListWhatsAppTemplateLibraryOutput {
  metaLibraryTemplates?: MetaLibraryTemplateDefinition[] | undefined;
  nextToken?: string | undefined;
}
export interface PostWhatsAppMessageMediaInput {
  originationPhoneNumberId: string;
  sourceS3PresignedUrl?: S3PresignedUrl | undefined;
  sourceS3File?: S3File | undefined;
}
export interface PostWhatsAppMessageMediaOutput {
  mediaId?: string | undefined;
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
  businessPublicKey?: string | undefined;
  kmsKeyArn?: string | undefined;
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
  messageId?: string | undefined;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceOutput {
  statusCode?: number | undefined;
}
export type StringList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {
  statusCode?: number | undefined;
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
  flowName?: string | undefined;
  categories?: MetaFlowCategory[] | undefined;
  endpointUri?: string | undefined;
  metaAppId?: string | undefined;
}
export interface UpdateWhatsAppFlowOutput {}
export interface UpdateWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  flowJson: Uint8Array;
}
export interface UpdateWhatsAppFlowAssetsOutput {
  validationErrors?: string[] | undefined;
}
export type MetaParameterFormat = string;
export type MetaTemplateComponents = Uint8Array;
export type MetaTemplateCtaLinkTrackingOptedOut = boolean;
export interface UpdateWhatsAppMessageTemplateInput {
  id: string;
  metaTemplateId?: string | undefined;
  templateName?: string | undefined;
  templateLanguageCode?: string | undefined;
  parameterFormat?: string | undefined;
  templateCategory?: string | undefined;
  templateComponents?: Uint8Array | undefined;
  ctaUrlLinkTrackingOptedOut?: boolean | undefined;
}
export interface UpdateWhatsAppMessageTemplateOutput {}
export type ErrorMessage = string;
export type AssociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | LimitExceededException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * This is only used through the Amazon Web Services console during sign-up to associate your WhatsApp Business Account to your Amazon Web Services account.
 */
export const associateWhatsAppBusinessAccount: API.OperationMethod<
  AssociateWhatsAppBusinessAccountInput & RegionInput,
  AssociateWhatsAppBusinessAccountOutput,
  AssociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5, __c0, 5) as any as S.Schema<AssociateWhatsAppBusinessAccountInput>,
  output: __S(9, __c0, 9) as any as S.Schema<AssociateWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InvalidParametersException,
    LimitExceededException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWhatsAppBusinessAccount",
  telemetry: TELEMETRY,
  span: "AssociateWhatsAppBusinessAccount",
}));

export type CreateWhatsAppDatasetError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Meta Conversions API dataset for a WhatsApp Business Account.
 */
export const createWhatsAppDataset: API.OperationMethod<
  CreateWhatsAppDatasetInput & RegionInput,
  CreateWhatsAppDatasetOutput,
  CreateWhatsAppDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateWhatsAppDatasetInput>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateWhatsAppDatasetOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppDataset",
  telemetry: TELEMETRY,
  span: "CreateWhatsAppDataset",
}));

export type CreateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new WhatsApp Flow. Flows enable businesses to create rich, interactive forms and experiences
 * that users can complete without leaving WhatsApp. The Flow is created in DRAFT status. If `publish`
 * is set to `true` and a valid `flowJson` is provided, the Flow is published immediately.
 */
export const createWhatsAppFlow: API.OperationMethod<
  CreateWhatsAppFlowInput & RegionInput,
  CreateWhatsAppFlowOutput,
  CreateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateWhatsAppFlowInput>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "CreateWhatsAppFlow",
}));

export type CreateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template from a custom definition.
 *
 * Amazon Web Services End User Messaging Social does not store any WhatsApp message template content.
 */
export const createWhatsAppMessageTemplate: API.OperationMethod<
  CreateWhatsAppMessageTemplateInput & RegionInput,
  CreateWhatsAppMessageTemplateOutput,
  CreateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateWhatsAppMessageTemplateInput>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplate",
  telemetry: TELEMETRY,
  span: "CreateWhatsAppMessageTemplate",
}));

export type CreateWhatsAppMessageTemplateFromLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template using a template from Meta's template library.
 */
export const createWhatsAppMessageTemplateFromLibrary: API.OperationMethod<
  CreateWhatsAppMessageTemplateFromLibraryInput & RegionInput,
  CreateWhatsAppMessageTemplateFromLibraryOutput,
  CreateWhatsAppMessageTemplateFromLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(180, __c11, 4) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryInput>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateFromLibrary",
  telemetry: TELEMETRY,
  span: "CreateWhatsAppMessageTemplateFromLibrary",
}));

export type CreateWhatsAppMessageTemplateMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Uploads media for use in a WhatsApp message template.
 */
export const createWhatsAppMessageTemplateMedia: API.OperationMethod<
  CreateWhatsAppMessageTemplateMediaInput & RegionInput,
  CreateWhatsAppMessageTemplateMediaOutput,
  CreateWhatsAppMessageTemplateMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<CreateWhatsAppMessageTemplateMediaInput>,
  output: __S(225, __c14, 1) as any as S.Schema<CreateWhatsAppMessageTemplateMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateMedia",
  telemetry: TELEMETRY,
  span: "CreateWhatsAppMessageTemplateMedia",
}));

export type DeleteWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a WhatsApp Flow permanently. Only Flows in DRAFT status can be deleted. Published or deprecated Flows cannot be deleted.
 */
export const deleteWhatsAppFlow: API.OperationMethod<
  DeleteWhatsAppFlowInput & RegionInput,
  DeleteWhatsAppFlowOutput,
  DeleteWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteWhatsAppFlowInput>,
  output: __S(272, __c17, 0) as any as S.Schema<DeleteWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "DeleteWhatsAppFlow",
}));

export type DeleteWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a media object from the WhatsApp service. If the object is still in an Amazon S3 bucket you should delete it from there too.
 */
export const deleteWhatsAppMessageMedia: API.OperationMethod<
  DeleteWhatsAppMessageMediaInput & RegionInput,
  DeleteWhatsAppMessageMediaOutput,
  DeleteWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeleteWhatsAppMessageMediaInput>,
  output: __S(289, __c18, 1) as any as S.Schema<DeleteWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageMedia",
  telemetry: TELEMETRY,
  span: "DeleteWhatsAppMessageMedia",
}));

export type DeleteWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a WhatsApp message template.
 */
export const deleteWhatsAppMessageTemplate: API.OperationMethod<
  DeleteWhatsAppMessageTemplateInput & RegionInput,
  DeleteWhatsAppMessageTemplateOutput,
  DeleteWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteWhatsAppMessageTemplateInput>,
  output: __S(272, __c17, 0) as any as S.Schema<DeleteWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageTemplate",
  telemetry: TELEMETRY,
  span: "DeleteWhatsAppMessageTemplate",
}));

export type DeprecateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Deprecates a published WhatsApp Flow, marking it as no longer recommended for use. The Flow must be in PUBLISHED status. This is an irreversible operation.
 */
export const deprecateWhatsAppFlow: API.OperationMethod<
  DeprecateWhatsAppFlowInput & RegionInput,
  DeprecateWhatsAppFlowOutput,
  DeprecateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeprecateWhatsAppFlowInput>,
  output: __S(272, __c17, 0) as any as S.Schema<DeprecateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "DeprecateWhatsAppFlow",
}));

export type DisassociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a WhatsApp Business Account (WABA) from your Amazon Web Services account.
 */
export const disassociateWhatsAppBusinessAccount: API.OperationMethod<
  DisassociateWhatsAppBusinessAccountInput & RegionInput,
  DisassociateWhatsAppBusinessAccountOutput,
  DisassociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DisassociateWhatsAppBusinessAccountInput>,
  output: __S(272, __c17, 0) as any as S.Schema<DisassociateWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWhatsAppBusinessAccount",
  telemetry: TELEMETRY,
  span: "DisassociateWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Get the details of your linked WhatsApp Business Account.
 */
export const getLinkedWhatsAppBusinessAccount: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountInput & RegionInput,
  GetLinkedWhatsAppBusinessAccountOutput,
  GetLinkedWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetLinkedWhatsAppBusinessAccountInput>,
  output: __S(354, __c22, 2) as any as S.Schema<GetLinkedWhatsAppBusinessAccountOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccount",
  telemetry: TELEMETRY,
  span: "GetLinkedWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountPhoneNumberError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the WABA account id and phone number details of a WhatsApp business account phone number.
 */
export const getLinkedWhatsAppBusinessAccountPhoneNumber: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountPhoneNumberInput & RegionInput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberInput>,
  output: __S(369, __c23, 1) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccountPhoneNumber",
  telemetry: TELEMETRY,
  span: "GetLinkedWhatsAppBusinessAccountPhoneNumber",
}));

export type GetWhatsAppBusinessPublicKeyError =
  | AccessDeniedByMetaException
  | AccessDeniedException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the business public key for a phone number and its signature status.
 */
export const getWhatsAppBusinessPublicKey: API.OperationMethod<
  GetWhatsAppBusinessPublicKeyInput & RegionInput,
  GetWhatsAppBusinessPublicKeyOutput,
  GetWhatsAppBusinessPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetWhatsAppBusinessPublicKeyInput>,
  output: __S(401, __c25, 1) as any as S.Schema<GetWhatsAppBusinessPublicKeyOutput>,
  errors: [
    AccessDeniedByMetaException,
    AccessDeniedException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppBusinessPublicKey",
  telemetry: TELEMETRY,
  span: "GetWhatsAppBusinessPublicKey",
}));

export type GetWhatsAppCallPermissionError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current calling permission for a WhatsApp end user, along with the calling actions the business is allowed to take with that user. Provide the destination phone number or the business-scoped user ID to identify the end user.
 */
export const getWhatsAppCallPermission: API.OperationMethod<
  GetWhatsAppCallPermissionInput & RegionInput,
  GetWhatsAppCallPermissionOutput,
  GetWhatsAppCallPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetWhatsAppCallPermissionInput>,
  output: __S(422, __c26, 6) as any as S.Schema<GetWhatsAppCallPermissionOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppCallPermission",
  telemetry: TELEMETRY,
  span: "GetWhatsAppCallPermission",
}));

export type GetWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata and status of a WhatsApp Flow, including validation errors, preview information, and health status.
 */
export const getWhatsAppFlow: API.OperationMethod<
  GetWhatsAppFlowInput & RegionInput,
  GetWhatsAppFlowOutput,
  GetWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetWhatsAppFlowInput>,
  output: __S(438, __c27, 6) as any as S.Schema<GetWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "GetWhatsAppFlow",
}));

export type GetWhatsAppFlowPreviewError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Generates a web preview URL for testing a WhatsApp Flow before publishing. Preview URLs expire in 30 days and can be shared with stakeholders for review.
 */
export const getWhatsAppFlowPreview: API.OperationMethod<
  GetWhatsAppFlowPreviewInput & RegionInput,
  GetWhatsAppFlowPreviewOutput,
  GetWhatsAppFlowPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<GetWhatsAppFlowPreviewInput>,
  output: __S(465, __c29, 1) as any as S.Schema<GetWhatsAppFlowPreviewOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlowPreview",
  telemetry: TELEMETRY,
  span: "GetWhatsAppFlowPreview",
}));

export type GetWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Get a media file from the WhatsApp service. On successful completion the media file is
 * retrieved from Meta and stored in the specified Amazon S3 bucket. Use either
 * `destinationS3File` or `destinationS3PresignedUrl` for the
 * destination. If both are used then an `InvalidParameterException` is
 * returned.
 */
export const getWhatsAppMessageMedia: API.OperationMethod<
  GetWhatsAppMessageMediaInput & RegionInput,
  GetWhatsAppMessageMediaOutput,
  GetWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<GetWhatsAppMessageMediaInput>,
  output: __S(481, __c30, 1) as any as S.Schema<GetWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageMedia",
  telemetry: TELEMETRY,
  span: "GetWhatsAppMessageMedia",
}));

export type GetWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specific WhatsApp message template.
 */
export const getWhatsAppMessageTemplate: API.OperationMethod<
  GetWhatsAppMessageTemplateInput & RegionInput,
  GetWhatsAppMessageTemplateOutput,
  GetWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetWhatsAppMessageTemplateInput>,
  output: __S(513, __c32, 1) as any as S.Schema<GetWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageTemplate",
  telemetry: TELEMETRY,
  span: "GetWhatsAppMessageTemplate",
}));

export type ListLinkedWhatsAppBusinessAccountsError =
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * List all WhatsApp Business Accounts linked to your Amazon Web Services account.
 */
export const listLinkedWhatsAppBusinessAccounts: API.PaginatedOperationMethod<
  ListLinkedWhatsAppBusinessAccountsInput & RegionInput,
  ListLinkedWhatsAppBusinessAccountsOutput,
  ListLinkedWhatsAppBusinessAccountsError,
  Credentials | HttpClient.HttpClient,
  LinkedWhatsAppBusinessAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsInput>,
  output: __S(531, __c33, 3) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
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
  telemetry: TELEMETRY,
  span: "ListLinkedWhatsAppBusinessAccounts",
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * List all tags associated with a resource, such as a phone number or WABA.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(545, __c34, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the assets (Flow JSON definition) of a WhatsApp Flow with presigned download URLs. Download URLs are generated by Meta and expire after a short period.
 */
export const listWhatsAppFlowAssets: API.PaginatedOperationMethod<
  ListWhatsAppFlowAssetsInput & RegionInput,
  ListWhatsAppFlowAssetsOutput,
  ListWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowAsset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListWhatsAppFlowAssetsInput>,
  output: __S(563, __c35, 3) as any as S.Schema<ListWhatsAppFlowAssetsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
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
  telemetry: TELEMETRY,
  span: "ListWhatsAppFlowAssets",
})) as any;

export type ListWhatsAppFlowsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all WhatsApp Flows for a WhatsApp Business Account. Returns summary information including Flow ID, name, status, and categories.
 */
export const listWhatsAppFlows: API.PaginatedOperationMethod<
  ListWhatsAppFlowsInput & RegionInput,
  ListWhatsAppFlowsOutput,
  ListWhatsAppFlowsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListWhatsAppFlowsInput>,
  output: __S(579, __c36, 3) as any as S.Schema<ListWhatsAppFlowsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
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
  telemetry: TELEMETRY,
  span: "ListWhatsAppFlows",
})) as any;

export type ListWhatsAppMessageTemplatesError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists WhatsApp message templates for a specific WhatsApp Business Account.
 */
export const listWhatsAppMessageTemplates: API.PaginatedOperationMethod<
  ListWhatsAppMessageTemplatesInput & RegionInput,
  ListWhatsAppMessageTemplatesOutput,
  ListWhatsAppMessageTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListWhatsAppMessageTemplatesInput>,
  output: __S(595, __c37, 3) as any as S.Schema<ListWhatsAppMessageTemplatesOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
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
  telemetry: TELEMETRY,
  span: "ListWhatsAppMessageTemplates",
})) as any;

export type ListWhatsAppTemplateLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists templates available in Meta's template library for WhatsApp messaging.
 */
export const listWhatsAppTemplateLibrary: API.PaginatedOperationMethod<
  ListWhatsAppTemplateLibraryInput & RegionInput,
  ListWhatsAppTemplateLibraryOutput,
  ListWhatsAppTemplateLibraryError,
  Credentials | HttpClient.HttpClient,
  MetaLibraryTemplateDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListWhatsAppTemplateLibraryInput>,
  output: __S(613, __c38, 5) as any as S.Schema<ListWhatsAppTemplateLibraryOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
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
  telemetry: TELEMETRY,
  span: "ListWhatsAppTemplateLibrary",
})) as any;

export type PostWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Upload a media file to the WhatsApp service. Only the specified
 * `originationPhoneNumberId` has the permissions to send the media file when
 * using SendWhatsAppMessage. You must use either `sourceS3File`
 * or `sourceS3PresignedUrl` for the source. If both or neither are specified then an
 * `InvalidParameterException` is returned.
 */
export const postWhatsAppMessageMedia: API.OperationMethod<
  PostWhatsAppMessageMediaInput & RegionInput,
  PostWhatsAppMessageMediaOutput,
  PostWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<PostWhatsAppMessageMediaInput>,
  output: __S(625, __c39, 1) as any as S.Schema<PostWhatsAppMessageMediaOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostWhatsAppMessageMedia",
  telemetry: TELEMETRY,
  span: "PostWhatsAppMessageMedia",
}));

export type PublishWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Publishes a WhatsApp Flow, making it available for use in template messages. The Flow must be in DRAFT status with valid Flow JSON that passes Meta's validation. This is an irreversible operation.
 */
export const publishWhatsAppFlow: API.OperationMethod<
  PublishWhatsAppFlowInput & RegionInput,
  PublishWhatsAppFlowOutput,
  PublishWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<PublishWhatsAppFlowInput>,
  output: __S(272, __c17, 0) as any as S.Schema<PublishWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "PublishWhatsAppFlow",
}));

export type PutWhatsAppBusinessAccountEventDestinationsError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Add an event destination to log event data from WhatsApp for a WhatsApp Business Account (WABA). A WABA can only have one event destination at a time. All resources associated with the WABA use the same event destination.
 */
export const putWhatsAppBusinessAccountEventDestinations: API.OperationMethod<
  PutWhatsAppBusinessAccountEventDestinationsInput & RegionInput,
  PutWhatsAppBusinessAccountEventDestinationsOutput,
  PutWhatsAppBusinessAccountEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsInput>,
  output: __S(272, __c17, 0) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessAccountEventDestinations",
  telemetry: TELEMETRY,
  span: "PutWhatsAppBusinessAccountEventDestinations",
}));

export type PutWhatsAppBusinessPublicKeyError =
  | AccessDeniedByMetaException
  | AccessDeniedException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | ValidationException
  | CommonErrors;
/**
 * Sets the business public key used to encrypt the data exchanged with the endpoint of a data exchange Flow.
 */
export const putWhatsAppBusinessPublicKey: API.OperationMethod<
  PutWhatsAppBusinessPublicKeyInput & RegionInput,
  PutWhatsAppBusinessPublicKeyOutput,
  PutWhatsAppBusinessPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<PutWhatsAppBusinessPublicKeyInput>,
  output: __S(272, __c17, 0) as any as S.Schema<PutWhatsAppBusinessPublicKeyOutput>,
  errors: [
    AccessDeniedByMetaException,
    AccessDeniedException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessPublicKey",
  telemetry: TELEMETRY,
  span: "PutWhatsAppBusinessPublicKey",
}));

export type SendWhatsAppCallEventError =
  | AccessDeniedByMetaException
  | ConflictException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Sends a WhatsApp calling event, such as connecting or terminating a call, for a business phone number. This operation passes the event through to Meta. To use this operation, the origination phone number must belong to a WhatsApp Business Account that is linked to your Amazon Web Services account.
 */
export const sendWhatsAppCallEvent: API.OperationMethod<
  SendWhatsAppCallEventInput & RegionInput,
  SendWhatsAppCallEventOutput,
  SendWhatsAppCallEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<SendWhatsAppCallEventInput>,
  output: __S(689, __c43, 1) as any as S.Schema<SendWhatsAppCallEventOutput>,
  errors: [
    AccessDeniedByMetaException,
    ConflictException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppCallEvent",
  telemetry: TELEMETRY,
  span: "SendWhatsAppCallEvent",
}));

export type SendWhatsAppConversionEventError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Sends a conversion event to Meta's Conversions API for the specified WhatsApp Business Account dataset.
 */
export const sendWhatsAppConversionEvent: API.OperationMethod<
  SendWhatsAppConversionEventInput & RegionInput,
  SendWhatsAppConversionEventOutput,
  SendWhatsAppConversionEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<SendWhatsAppConversionEventInput>,
  output: __S(705, __c44, 1) as any as S.Schema<SendWhatsAppConversionEventOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppConversionEvent",
  telemetry: TELEMETRY,
  span: "SendWhatsAppConversionEvent",
}));

export type SendWhatsAppMessageError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedByMetaException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Send a WhatsApp message. For examples of sending a message using the Amazon Web Services
 * CLI, see Sending messages in the
 *
 * *Amazon Web Services End User Messaging Social User Guide*
 * .
 */
export const sendWhatsAppMessage: API.OperationMethod<
  SendWhatsAppMessageInput & RegionInput,
  SendWhatsAppMessageOutput,
  SendWhatsAppMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<SendWhatsAppMessageInput>,
  output: __S(721, __c45, 1) as any as S.Schema<SendWhatsAppMessageOutput>,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedByMetaException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppMessage",
  telemetry: TELEMETRY,
  span: "SendWhatsAppMessage",
}));

export type TagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified resource. When you specify
 * an existing tag key, the value is overwritten with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<TagResourceInput>,
  output: __S(752, __c47, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput & RegionInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(752, __c47, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateLinkedWhatsAppBusinessAccountPhoneNumberError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the calling settings for a linked WhatsApp business phone number, such as whether calling is enabled and the hours during which the business accepts calls.
 */
export const updateLinkedWhatsAppBusinessAccountPhoneNumber: API.OperationMethod<
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput & RegionInput,
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  UpdateLinkedWhatsAppBusinessAccountPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<UpdateLinkedWhatsAppBusinessAccountPhoneNumberInput>,
  output: __S(
    785,
    __c49,
    1,
  ) as any as S.Schema<UpdateLinkedWhatsAppBusinessAccountPhoneNumberOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLinkedWhatsAppBusinessAccountPhoneNumber",
  telemetry: TELEMETRY,
  span: "UpdateLinkedWhatsAppBusinessAccountPhoneNumber",
}));

export type UpdateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the metadata of a WhatsApp Flow, such as its name or categories. This does not update the Flow JSON definition. Use UpdateWhatsAppFlowAssets to update the Flow JSON.
 */
export const updateWhatsAppFlow: API.OperationMethod<
  UpdateWhatsAppFlowInput & RegionInput,
  UpdateWhatsAppFlowOutput,
  UpdateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<UpdateWhatsAppFlowInput>,
  output: __S(272, __c17, 0) as any as S.Schema<UpdateWhatsAppFlowOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlow",
  telemetry: TELEMETRY,
  span: "UpdateWhatsAppFlow",
}));

export type UpdateWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Flow JSON definition (assets) of a WhatsApp Flow. Updating a published Flow's assets reverts it to DRAFT status, requiring re-publishing.
 */
export const updateWhatsAppFlowAssets: API.OperationMethod<
  UpdateWhatsAppFlowAssetsInput & RegionInput,
  UpdateWhatsAppFlowAssetsOutput,
  UpdateWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<UpdateWhatsAppFlowAssetsInput>,
  output: __S(817, __c51, 1) as any as S.Schema<UpdateWhatsAppFlowAssetsOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlowAssets",
  telemetry: TELEMETRY,
  span: "UpdateWhatsAppFlowAssets",
}));

export type UpdateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing WhatsApp message template.
 */
export const updateWhatsAppMessageTemplate: API.OperationMethod<
  UpdateWhatsAppMessageTemplateInput & RegionInput,
  UpdateWhatsAppMessageTemplateOutput,
  UpdateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<UpdateWhatsAppMessageTemplateInput>,
  output: __S(272, __c17, 0) as any as S.Schema<UpdateWhatsAppMessageTemplateOutput>,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppMessageTemplate",
  telemetry: TELEMETRY,
  span: "UpdateWhatsAppMessageTemplate",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
          tags: S.optional(__S(65, __c4, 1)),
        }),
      ).annotate({ identifier: "WabaPhoneNumberSetupFinalization" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          eventDestinations: S.optional(__S(49, __c3, 1)),
          tags: S.optional(__S(65, __c4, 1)),
        }),
      ).annotate({ identifier: "WabaSetupFinalization" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          associateInProgressToken: SensitiveString,
          phoneNumbers: __S(2, __c0, 2),
          phoneNumberParent: S.optional(S.String),
          waba: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({ identifier: "WhatsAppSetupFinalization" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          signupCallback: S.optional(__S(0, __c0, 0)),
          setupFinalization: S.optional(__S(4, __c0, 4)),
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
          unregisteredWhatsAppPhoneNumbers: S.optional(__S(16, __c1, 0)),
          wabaId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccountIdMetaData" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(6, __c0, 6).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          associateInProgressToken: S.optional(SensitiveString),
          linkedAccountsWithIncompleteSetup: S.optional(__S(7, __c0, 7)),
        }),
      ).annotate({ identifier: "WhatsAppSignupCallbackResult" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          signupCallbackResult: S.optional(__S(8, __c0, 8)),
          statusCode: S.optional(S.Number),
          linkedWhatsAppBusinessAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateWhatsAppBusinessAccountOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(32, __c2, 0));
  }
}
function __c2(j: number): any {
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventDestinationArn: S.String, roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "WhatsAppBusinessAccountEventDestination" });
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          flowName: S.String,
          categories: __S(128, __c8, 0),
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
        S.Struct({ flowId: S.optional(S.String), validationErrors: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "CreateWhatsAppFlowOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
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
function __c10(j: number): any {
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
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          phoneNumber: S.optional(S.String),
          url: S.optional(__S(192, __c12, 0)),
          otpType: S.optional(S.String),
          zeroTapTermsAccepted: S.optional(S.Boolean),
          supportedApps: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "LibraryTemplateButtonInput" });
    case 1:
      return S.Array(__S(176, __c11, 0));
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
          libraryTemplateButtonInputs: S.optional(__S(177, __c11, 1)),
          libraryTemplateBodyInputs: S.optional(__S(178, __c11, 2)),
        }),
      ).annotate({ identifier: "MetaLibraryTemplate" });
    case 4:
      return S.suspend(() =>
        S.Struct({ metaLibraryTemplate: __S(179, __c11, 3), id: S.String }).pipe(
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(192, __c12, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, sourceS3File: S.optional(__S(240, __c15, 0)) }).pipe(
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucketName: S.String, key: S.String })).annotate({
        identifier: "S3File",
      });
  }
}
function __c16(j: number): any {
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteWhatsAppFlowOutput" });
  }
}
function __c18(j: number): any {
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
function __c19(j: number): any {
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
function __c20(j: number): any {
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
function __c21(j: number): any {
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
function __c22(j: number): any {
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
          eventDestinations: __S(49, __c3, 1),
          marketingMessagesOnboardingStatus: S.optional(S.String),
          directSendEnforcementStatus: S.optional(S.String),
          directSendEnforcementStatusExpiresAt: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          datasetId: S.optional(S.String),
          phoneNumbers: __S(16, __c1, 0),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccount" });
    case 2:
      return S.suspend(() => S.Struct({ account: S.optional(__S(353, __c22, 1)) })).annotate({
        identifier: "GetLinkedWhatsAppBusinessAccountOutput",
      });
  }
}
function __c23(j: number): any {
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
          phoneNumber: S.optional(__S(32, __c2, 0)),
          linkedWhatsAppBusinessAccountId: S.optional(S.String),
          callSettings: S.optional(__S(390, __c24, 6)),
        }),
      ).annotate({ identifier: "GetLinkedWhatsAppBusinessAccountPhoneNumberOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ hours: S.Number, minutes: S.Number })).annotate({
        identifier: "WhatsAppTimeOfDay",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dayOfWeek: S.String,
          openTime: __S(384, __c24, 0),
          closeTime: __S(384, __c24, 0),
        }),
      ).annotate({ identifier: "WhatsAppWeeklyOperatingHoursEntry" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ date: S.String, startTime: __S(384, __c24, 0), endTime: __S(384, __c24, 0) }),
      ).annotate({ identifier: "WhatsAppHolidayScheduleEntry" });
    case 4:
      return S.Array(__S(387, __c24, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          timezone: S.String,
          weeklyOperatingHours: __S(386, __c24, 2),
          holidaySchedule: S.optional(__S(388, __c24, 4)),
        }),
      ).annotate({ identifier: "WhatsAppCallHours" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          callEnabled: S.Boolean,
          callHours: S.optional(__S(389, __c24, 5)),
          callIconVisibility: S.optional(S.String),
          callbackPermissionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "WhatsAppCallSettings" });
  }
}
function __c25(j: number): any {
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
function __c26(j: number): any {
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
      return S.Array(__S(418, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ actionName: S.String, canPerformAction: S.Boolean, limits: __S(419, __c26, 3) }),
      ).annotate({ identifier: "WhatsAppCallPermissionAction" });
    case 5:
      return S.Array(__S(420, __c26, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ permission: __S(417, __c26, 1), actions: __S(421, __c26, 5) }),
      ).annotate({ identifier: "GetWhatsAppCallPermissionOutput" });
  }
}
function __c27(j: number): any {
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
      return S.Array(__S(435, __c27, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ canSendMessage: S.String, entities: S.optional(__S(436, __c27, 4)) }),
      ).annotate({ identifier: "MetaFlowHealthStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          flowId: S.String,
          flowName: S.String,
          flowStatus: S.String,
          categories: S.optional(__S(128, __c8, 0)),
          validationErrors: S.optional(__S(112, __c7, 0)),
          jsonVersion: S.optional(S.String),
          dataApiVersion: S.optional(S.String),
          endpointUri: S.optional(S.String),
          preview: S.optional(__S(448, __c28, 0)),
          whatsAppBusinessAccount: S.optional(__S(433, __c27, 1)),
          application: S.optional(__S(434, __c27, 2)),
          healthStatus: S.optional(__S(437, __c27, 5)),
        }),
      ).annotate({ identifier: "GetWhatsAppFlowOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ previewUrl: S.String, expiresAt: S.String })).annotate({
        identifier: "MetaFlowPreviewInfo",
      });
  }
}
function __c29(j: number): any {
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
      return S.suspend(() => S.Struct({ flowId: S.String, preview: __S(448, __c28, 0) })).annotate({
        identifier: "GetWhatsAppFlowPreviewOutput",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mediaId: S.String,
          originationPhoneNumberId: S.String,
          metadataOnly: S.optional(S.Boolean),
          destinationS3PresignedUrl: S.optional(__S(496, __c31, 0)),
          destinationS3File: S.optional(__S(240, __c15, 0)),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ url: S.String, headers: __S(192, __c12, 0) })).annotate({
        identifier: "S3PresignedUrl",
      });
  }
}
function __c32(j: number): any {
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
function __c33(j: number): any {
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
          eventDestinations: __S(49, __c3, 1),
          marketingMessagesOnboardingStatus: S.optional(S.String),
          directSendEnforcementStatus: S.optional(S.String),
          directSendEnforcementStatusExpiresAt: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          datasetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkedWhatsAppBusinessAccountSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          linkedAccounts: S.optional(__S(530, __c33, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLinkedWhatsAppBusinessAccountsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/tags/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.Number), tags: S.optional(__S(65, __c4, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c35(j: number): any {
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
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flowAssets: __S(562, __c35, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppFlowAssetsOutput" });
  }
}
function __c36(j: number): any {
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
          flowCategories: __S(128, __c8, 0),
          validationErrors: __S(112, __c7, 0),
        }),
      ).annotate({ identifier: "MetaFlowSummary" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flows: __S(578, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppFlowsOutput" });
  }
}
function __c37(j: number): any {
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
          templateSource: S.optional(S.String),
          correctCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateSummary" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ templates: S.optional(__S(594, __c37, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWhatsAppMessageTemplatesOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          id: S.String.pipe(T.HttpQuery("id")),
          filters: S.optional(__S(192, __c12, 0)),
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
          supportedApps: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "LibraryTemplateButtonList" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          templateName: S.optional(S.String),
          templateLanguage: S.optional(S.String),
          templateCategory: S.optional(S.String),
          templateTopic: S.optional(S.String),
          templateUseCase: S.optional(S.String),
          templateIndustry: S.optional(__S(112, __c7, 0)),
          templateHeader: S.optional(S.String),
          templateBody: S.optional(S.String),
          templateButtons: S.optional(__S(610, __c38, 2)),
          templateId: S.optional(S.String),
          templateBodyExampleParams: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "MetaLibraryTemplateDefinition" });
    case 4:
      return S.Array(__S(611, __c38, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          metaLibraryTemplates: S.optional(__S(612, __c38, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWhatsAppTemplateLibraryOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          originationPhoneNumberId: S.String,
          sourceS3PresignedUrl: S.optional(__S(496, __c31, 0)),
          sourceS3File: S.optional(__S(240, __c15, 0)),
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
function __c40(j: number): any {
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
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, eventDestinations: __S(49, __c3, 1) }).pipe(
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
function __c42(j: number): any {
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
function __c43(j: number): any {
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
function __c44(j: number): any {
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
function __c45(j: number): any {
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(65, __c4, 1) }).pipe(
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ statusCode: S.optional(S.Number) })).annotate({
        identifier: "TagResourceOutput",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(112, __c7, 0) }).pipe(
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")), callSettings: __S(390, __c24, 6) }).pipe(
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
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          flowId: S.String,
          flowName: S.optional(S.String),
          categories: S.optional(__S(128, __c8, 0)),
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
function __c51(j: number): any {
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
      return S.suspend(() =>
        S.Struct({ validationErrors: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "UpdateWhatsAppFlowAssetsOutput" });
  }
}
function __c52(j: number): any {
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
