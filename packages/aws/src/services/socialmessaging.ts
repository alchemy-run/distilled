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
  sdkId: "SocialMessaging",
  target: "SocialMessaging",
  version: "2024-01-01",
  sigv4: "social-messaging",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedByMetaException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessDeniedByMetaException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class DependencyException
  extends /*@__PURE__*/ TE.TaggedError(
    "DependencyException",
    ["ServerError", "RetryableError"],
    { status: 502 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidParametersException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParametersException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottledRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledRequestException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
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
export type WabaPhoneNumberSetupFinalizationList =
  WabaPhoneNumberSetupFinalization[];
export type LinkedWhatsAppBusinessAccountId = string;
export type WhatsAppBusinessAccountId = string;
export type EventDestinationArn = string;
export type RoleArn = string;
export interface WhatsAppBusinessAccountEventDestination {
  eventDestinationArn: string;
  roleArn?: string;
}
export type WhatsAppBusinessAccountEventDestinations =
  WhatsAppBusinessAccountEventDestination[];
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
export interface CreateWhatsAppFlowInput {
  id: string;
  flowName: string;
  categories: MetaFlowCategory[];
  flowJson?: Uint8Array;
  publish?: boolean;
  cloneFlowId?: string;
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
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberOutput {
  phoneNumber?: WhatsAppPhoneNumberDetail;
  linkedWhatsAppBusinessAccountId?: string;
}
export interface GetWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export type MetaFlowStatus = string;
export type MetaFlowJsonVersion = string;
export type MetaFlowDataApiVersion = string;
export type MetaFlowEndpointUri = string;
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
export type LinkedWhatsAppBusinessAccountSummaryList =
  LinkedWhatsAppBusinessAccountSummary[];
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
export type WhatsAppConversionEventBlob =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
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
export interface UpdateWhatsAppFlowInput {
  id: string;
  flowId: string;
  flowName?: string;
  categories?: MetaFlowCategory[];
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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/signup",
    input: {
      signupCallback: { accessToken: 0, callbackUrl: 0 },
      setupFinalization: {
        associateInProgressToken: 0,
        phoneNumbers: D.list({
          id: 0,
          twoFactorPin: 0,
          dataLocalizationRegion: 0,
          tags: D.list(i_Tag),
        }),
        phoneNumberParent: 0,
        waba: {
          id: 0,
          eventDestinations: D.list(i_WhatsAppBusinessAccountEventDestination),
          tags: D.list(i_Tag),
        },
      },
    },
    output: { signupCallbackResult: { associateInProgressToken: D.secret } },
    body: true,
  },
  errors: [
    DependencyException,
    InvalidParametersException,
    LimitExceededException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWhatsAppBusinessAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/waba/dataset",
    input: { id: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/flow/create",
    input: {
      id: 0,
      flowName: 0,
      categories: 0,
      flowJson: 0,
      publish: 0,
      cloneFlowId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/template/put",
    input: { templateDefinition: 0, id: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/template/create",
    input: {
      metaLibraryTemplate: {
        templateName: 0,
        libraryTemplateName: 0,
        templateCategory: 0,
        templateLanguage: 0,
        libraryTemplateButtonInputs: D.list({
          type: 0,
          phoneNumber: 0,
          url: 0,
          otpType: 0,
          zeroTapTermsAccepted: 0,
          supportedApps: 0,
        }),
        libraryTemplateBodyInputs: {
          addContactNumber: 0,
          addLearnMoreLink: 0,
          addSecurityRecommendation: 0,
          addTrackPackageLink: 0,
          codeExpirationMinutes: 0,
        },
      },
      id: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/template/media",
    input: { id: 0, sourceS3File: i_S3File },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/whatsapp/flow",
    input: { id: D.m({ query: "id" }), flowId: D.m({ query: "flowId" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/whatsapp/media",
    input: {
      mediaId: D.m({ query: "mediaId" }),
      originationPhoneNumberId: D.m({ query: "originationPhoneNumberId" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/whatsapp/template",
    input: {
      metaTemplateId: D.m({ query: "metaTemplateId" }),
      deleteAllLanguages: D.m({ query: "deleteAllTemplates" }),
      id: D.m({ query: "id" }),
      templateName: D.m({ query: "templateName" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/flow/deprecate",
    input: { id: 0, flowId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/whatsapp/waba/disassociate",
    input: { id: D.m({ query: "id" }) },
  },
  errors: [
    DependencyException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWhatsAppBusinessAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/waba/details",
    input: { id: D.m({ query: "id" }) },
    output: { account: { linkDate: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/waba/phone/details",
    input: { id: D.m({ query: "id" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/flow",
    input: { id: D.m({ query: "id" }), flowId: D.m({ query: "flowId" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/flow/preview",
    input: {
      id: D.m({ query: "id" }),
      flowId: D.m({ query: "flowId" }),
      invalidate: D.m({ query: "invalidate" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/media/get",
    input: {
      mediaId: 0,
      originationPhoneNumberId: 0,
      metadataOnly: 0,
      destinationS3PresignedUrl: i_S3PresignedUrl,
      destinationS3File: i_S3File,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/template",
    input: {
      metaTemplateId: D.m({ query: "metaTemplateId" }),
      id: D.m({ query: "id" }),
      templateName: D.m({ query: "templateName" }),
      templateLanguageCode: D.m({ query: "templateLanguageCode" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/waba/list",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { linkedAccounts: D.list({ linkDate: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/tags/list",
    input: { resourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/flow/assets",
    input: {
      id: D.m({ query: "id" }),
      flowId: D.m({ query: "flowId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/flow/list",
    input: {
      id: D.m({ query: "id" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/whatsapp/template/list",
    input: {
      id: D.m({ query: "id" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/template/library",
    input: {
      nextToken: 0,
      maxResults: 0,
      id: D.m({ query: "id" }),
      filters: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/media",
    input: {
      originationPhoneNumberId: 0,
      sourceS3PresignedUrl: i_S3PresignedUrl,
      sourceS3File: i_S3File,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/flow/publish",
    input: { id: 0, flowId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/whatsapp/waba/eventdestinations",
    input: {
      id: 0,
      eventDestinations: D.list(i_WhatsAppBusinessAccountEventDestination),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessAccountEventDestinations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/waba/dataset/events",
    input: { id: 0, datasetId: 0, eventData: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/send",
    input: { originationPhoneNumberId: 0, message: 0, metaApiVersion: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/tag-resource",
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/untag-resource",
    input: { resourceArn: 0, tagKeys: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/flow/update",
    input: { id: 0, flowId: 0, flowName: 0, categories: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/flow/assets/update",
    input: { id: 0, flowId: 0, flowJson: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/whatsapp/template",
    input: {
      id: 0,
      metaTemplateId: 0,
      templateName: 0,
      templateLanguageCode: 0,
      parameterFormat: 0,
      templateCategory: 0,
      templateComponents: 0,
      ctaUrlLinkTrackingOptedOut: 0,
    },
    body: true,
  },
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
})) as any;

const i_S3File: D.LazyStruct = () => ({ bucketName: 0, key: 0 });
const i_S3PresignedUrl: D.LazyStruct = () => ({ url: 0, headers: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_WhatsAppBusinessAccountEventDestination: D.LazyStruct = () => ({
  eventDestinationArn: 0,
  roleArn: 0,
});
