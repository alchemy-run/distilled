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
  sdkId: "EndUserMessaging",
  serviceShapeName: "EndUserMessaging",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "end-user-messaging" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-09-21");
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
              `https://end-user-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://end-user-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://end-user-messaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://end-user-messaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://end-user-messaging.{R}.{D}","properties":{},"headers":{}}');

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
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(249, __c31, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type BrandProfileName = string;
export type ClientToken = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateBrandProfileInput {
  brandProfileName: string;
  clientToken?: string | redacted.Redacted<string>;
  deletionProtectionEnabled?: boolean;
  tags?: Tag[];
}
export type BrandProfileIdOrArn = string;
export type AmazonResourceName = string;
export type Status = "ACTIVE" | "BLOCKED" | "PAUSED" | "CANCELLED" | "FAILED" | (string & {});
export interface CreateBrandProfileOutput {
  brandProfileId: string;
  brandProfileArn: string;
  brandProfileName: string;
  status: Status;
  deletionProtectionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributesCreated: number;
}
export type BrandProfileAttributeName = string | redacted.Redacted<string>;
export type BrandProfileAttributeType = "TEXT" | "IMAGE" | "DOCUMENT" | (string & {});
export type BrandProfileAttributeValue = string | redacted.Redacted<string>;
export type AttachmentBody = Uint8Array | redacted.Redacted<Uint8Array>;
export type BrandProfileAttributeDescription = string | redacted.Redacted<string>;
export type BrandProfileAttributeCategory = string;
export interface BrandProfileAttributeInput {
  attributeName: string | redacted.Redacted<string>;
  attributeType: BrandProfileAttributeType;
  attributeValue?: string | redacted.Redacted<string>;
  attachmentBody?: Uint8Array | redacted.Redacted<Uint8Array>;
  description?: string | redacted.Redacted<string>;
  category?: string;
}
export type BrandProfileAttributeInputList = BrandProfileAttributeInput[];
export interface CreateBrandProfileAttributesInput {
  brandProfileId: string;
  attributes: BrandProfileAttributeInput[];
  clientToken?: string | redacted.Redacted<string>;
}
export type MediaDownloadUrl = string | redacted.Redacted<string>;
export interface BrandProfileAttributeOutput {
  attributeName: string | redacted.Redacted<string>;
  attributeType: BrandProfileAttributeType;
  mediaDownloadUrl?: string | redacted.Redacted<string>;
}
export type BrandProfileAttributeOutputList = BrandProfileAttributeOutput[];
export interface CreateBrandProfileAttributesOutput {
  attributes: BrandProfileAttributeOutput[];
}
export type RegistrationIdOrArn = string;
export interface CreateBrandProfileFromRegistrationInput {
  registrationId: string;
  brandProfileName: string;
  smartMatch?: boolean;
  tags?: Tag[];
  clientToken?: string | redacted.Redacted<string>;
}
export type JobId = string;
export type JobResourceIdentifier = string;
export interface JobResult {
  jobId: string;
  resourceIdentifier: string;
}
export type JobResults = JobResult[];
export interface CreateBrandProfileFromRegistrationOutput {
  results: JobResult[];
}
export type NotifyCodeConfigurationName = string;
export type CodeType = "NUMERIC" | "ALPHA" | "ALPHANUMERIC" | (string & {});
export type CodeLength = number;
export type ValidityPeriodMinutes = number;
export type MaxVerificationAttempts = number;
export interface CodeConfigurationParameters {
  codeType?: CodeType;
  codeLength?: number;
  validityPeriodMinutes?: number;
  maxAttempts?: number;
}
export type InlineTemplateBody = string | redacted.Redacted<string>;
export type DestinationCountryParameterKey = string;
export type DestinationCountryParameterValue = string | redacted.Redacted<string>;
export type DestinationCountryParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface TextParameters {
  inlineTemplateBody?: string | redacted.Redacted<string>;
  destinationCountryParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type LanguageCode = string;
export type VoiceId = string;
export type VoiceMessageBodyTextType = "TEXT" | "SSML" | (string & {});
export interface VoiceParameters {
  inlineTemplateBody?: string | redacted.Redacted<string>;
  languageCode?: string;
  voiceId?: string;
  voiceMessageBodyTextType?: VoiceMessageBodyTextType;
}
export type NotifyTemplateId = string;
export interface NotifyParameters {
  notifyTemplateId?: string;
  voiceId?: string;
}
export type WhatsAppTemplateName = string;
export interface WhatsAppParameters {
  whatsAppTemplateName?: string;
  languageCode?: string;
}
export interface ChannelParameters {
  text?: TextParameters;
  voice?: VoiceParameters;
  notify?: NotifyParameters;
  whatsApp?: WhatsAppParameters;
}
export interface CreateNotifyCodeConfigurationInput {
  notifyCodeConfigurationName: string;
  codeConfigurationParameters?: CodeConfigurationParameters;
  channelParameters?: ChannelParameters;
  deletionProtectionEnabled?: boolean;
  clientToken?: string | redacted.Redacted<string>;
  tags?: Tag[];
}
export type NotifyCodeConfigurationId = string;
export interface NotifyCodeConfiguration {
  notifyCodeConfigurationId: string;
  notifyCodeConfigurationArn: string;
  notifyCodeConfigurationName: string;
  codeConfigurationParameters?: CodeConfigurationParameters;
  channelParameters?: ChannelParameters;
  deletionProtectionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateNotifyCodeConfigurationOutput {
  notifyCodeConfiguration: NotifyCodeConfiguration;
}
export type RegistrationType = string;
export type RegistrationTypeList = string[];
export interface CreateRegistrationsFromBrandProfileInput {
  brandProfileId: string;
  registrationTypes: string[];
  smartMatch?: boolean;
  clientToken?: string | redacted.Redacted<string>;
}
export interface CreateRegistrationsFromBrandProfileOutput {
  results: JobResult[];
}
export interface DeleteBrandProfileInput {
  brandProfileId: string;
}
export interface DeleteBrandProfileOutput {
  brandProfileId: string;
  brandProfileArn: string;
}
export interface DeleteBrandProfileAttributeInput {
  brandProfileId: string;
  attributeName: string | redacted.Redacted<string>;
}
export interface DeleteBrandProfileAttributeOutput {
  brandProfileId: string;
  attributeName: string | redacted.Redacted<string>;
}
export type NotifyCodeConfigurationIdOrArn = string;
export interface DeleteNotifyCodeConfigurationInput {
  notifyCodeConfigurationId: string;
}
export interface DeleteNotifyCodeConfigurationOutput {}
export interface GetBrandProfileInput {
  brandProfileId: string;
}
export interface GetBrandProfileOutput {
  brandProfileId: string;
  brandProfileArn: string;
  brandProfileName: string;
  status: Status;
  deletionProtectionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetBrandProfileAttributeInput {
  brandProfileId: string;
  attributeName: string | redacted.Redacted<string>;
}
export interface GetBrandProfileAttributeOutput {
  attributeName: string | redacted.Redacted<string>;
  attributeType: BrandProfileAttributeType;
  attributeValue?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  category?: string;
  mediaContentType?: string;
  mediaSizeBytes?: number;
  mediaDownloadUrl?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetJobInput {
  jobId: string;
}
export type JobStatus = "SUCCESS" | "PROCESSING" | "FAILED" | (string & {});
export type JobOperationType = string;
export type JobErrorCode = string;
export type JobErrorMessage = string;
export type JobResourceType = "REGISTRATION" | "BRAND_PROFILE" | (string & {});
export type JobResourceId = string;
export interface JobResource {
  resourceType: JobResourceType;
  resourceId: string;
  resourceArn: string;
}
export type JobResourceList = JobResource[];
export interface Job {
  jobId: string;
  status: JobStatus;
  operationType: string;
  createdAt: Date;
  updatedAt: Date;
  brandProfileId?: string;
  errorCode?: string;
  errorMessage?: string;
  resources?: JobResource[];
}
export interface GetNotifyCodeConfigurationInput {
  notifyCodeConfigurationId: string;
}
export interface GetNotifyCodeConfigurationOutput {
  notifyCodeConfiguration: NotifyCodeConfiguration;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListBrandProfileAttributesInput {
  brandProfileId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BrandProfileAttributeSummary {
  attributeName: string | redacted.Redacted<string>;
  attributeType: BrandProfileAttributeType;
  description?: string | redacted.Redacted<string>;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type BrandProfileAttributeSummaryList = BrandProfileAttributeSummary[];
export interface ListBrandProfileAttributesOutput {
  brandProfileAttributes: BrandProfileAttributeSummary[];
  nextToken?: string;
}
export interface ListBrandProfilesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface BrandProfileInfo {
  brandProfileId: string;
  brandProfileArn: string;
  brandProfileName: string;
  status: Status;
  deletionProtectionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type BrandProfileInfoList = BrandProfileInfo[];
export interface ListBrandProfilesOutput {
  brandProfiles: BrandProfileInfo[];
  nextToken?: string;
}
export interface ListJobsInput {
  maxResults?: number;
  nextToken?: string;
  status?: JobStatus;
  brandProfileId?: string;
  operationType?: string;
}
export interface JobSummary {
  jobId: string;
  status: JobStatus;
  operationType: string;
  createdAt: Date;
  updatedAt: Date;
  brandProfileId?: string;
  errorCode?: string;
  errorMessage?: string;
  resources?: JobResource[];
}
export type JobSummaryList = JobSummary[];
export interface ListJobsOutput {
  jobs: JobSummary[];
  nextToken?: string;
}
export interface ListNotifyCodeConfigurationsInput {
  maxResults?: number;
  nextToken?: string;
}
export type NotifyCodeConfigurationList = NotifyCodeConfiguration[];
export interface ListNotifyCodeConfigurationsOutput {
  notifyCodeConfigurations: NotifyCodeConfiguration[];
  nextToken?: string;
}
export interface ListRegistrationsFromBrandProfileInput {
  brandProfileId: string;
  maxResults?: number;
  nextToken?: string;
}
export type RegistrationId = string;
export interface RegistrationAssociationSummary {
  registrationId: string;
  registrationType: string;
  createdAt: Date;
  smartMatchUsed: boolean;
}
export type RegistrationAssociationSummaryList = RegistrationAssociationSummary[];
export interface ListRegistrationsFromBrandProfileOutput {
  registrationAssociations: RegistrationAssociationSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: Tag[];
}
export type NotifyChannel = "TEXT" | "VOICE" | "WHATSAPP" | (string & {});
export type DestinationIdentity = string | redacted.Redacted<string>;
export type OriginationIdentity = string;
export type ConfigurationSetName = string;
export type ContextKey = string | redacted.Redacted<string>;
export type ContextValue = string | redacted.Redacted<string>;
export type ContextMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export type ReferenceId = string;
export interface SendNotifyCodeVerificationInput {
  channel: NotifyChannel;
  destinationIdentity: string | redacted.Redacted<string>;
  originationIdentity: string;
  notifyCodeConfiguration?: string;
  overrideChannelParameters?: ChannelParameters;
  overrideCodeConfigurationParameters?: CodeConfigurationParameters;
  configurationSetName?: string;
  context?: { [key: string]: string | redacted.Redacted<string> | undefined };
  referenceId?: string;
}
export type VerificationId = string;
export type MessageId = string;
export interface SendNotifyCodeVerificationOutput {
  verificationId: string;
  messageId: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateBrandProfileInput {
  brandProfileId: string;
  brandProfileName?: string;
  deletionProtectionEnabled?: boolean;
}
export interface UpdateBrandProfileOutput {
  brandProfileId: string;
  brandProfileArn: string;
  brandProfileName: string;
  status: Status;
  deletionProtectionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateBrandProfileAttributeInput {
  brandProfileId: string;
  attributeName: string | redacted.Redacted<string>;
  attributeValue?: string | redacted.Redacted<string>;
  attachmentBody?: Uint8Array;
  description?: string | redacted.Redacted<string>;
  category?: string;
}
export interface UpdateBrandProfileAttributeOutput {
  attributeName: string | redacted.Redacted<string>;
  attributeType: BrandProfileAttributeType;
  attributeValue?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  category?: string;
  mediaContentType?: string;
  mediaSizeBytes?: number;
  createdAt: Date;
  updatedAt: Date;
}
export type OnAttributeConflict = "REPLACE" | "PRESERVE" | (string & {});
export interface UpdateBrandProfileFromRegistrationInput {
  brandProfileId: string;
  registrationId: string;
  smartMatch?: boolean;
  onAttributeConflict?: OnAttributeConflict;
  clientToken?: string | redacted.Redacted<string>;
}
export interface UpdateBrandProfileFromRegistrationOutput {
  results: JobResult[];
}
export interface UpdateCodeConfigurationParameters {
  codeType?: CodeType;
  codeLength?: number;
  validityPeriodMinutes?: number;
  maxAttempts?: number;
}
export type UpdateInlineTemplateBody = string | redacted.Redacted<string>;
export type UpdateDestinationCountryParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface UpdateTextParameters {
  inlineTemplateBody?: string | redacted.Redacted<string>;
  destinationCountryParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type UpdateLanguageCode = string;
export type UpdateVoiceId = string;
export interface UpdateVoiceParameters {
  inlineTemplateBody?: string | redacted.Redacted<string>;
  languageCode?: string;
  voiceId?: string;
  voiceMessageBodyTextType?: VoiceMessageBodyTextType;
}
export type UpdateNotifyTemplateId = string;
export interface UpdateNotifyParameters {
  notifyTemplateId?: string;
  voiceId?: string;
}
export type UpdateWhatsAppTemplateName = string;
export interface UpdateWhatsAppParameters {
  whatsAppTemplateName?: string;
  languageCode?: string;
}
export interface UpdateChannelParameters {
  text?: UpdateTextParameters;
  voice?: UpdateVoiceParameters;
  notify?: UpdateNotifyParameters;
  whatsApp?: UpdateWhatsAppParameters;
}
export interface UpdateNotifyCodeConfigurationInput {
  notifyCodeConfigurationId: string;
  notifyCodeConfigurationName?: string;
  codeConfigurationParameters?: UpdateCodeConfigurationParameters;
  channelParameters?: UpdateChannelParameters;
  deletionProtectionEnabled?: boolean;
}
export interface UpdateNotifyCodeConfigurationOutput {
  notifyCodeConfiguration: NotifyCodeConfiguration;
}
export type RegistrationIdList = string[];
export interface UpdateRegistrationsFromBrandProfileInput {
  brandProfileId: string;
  registrationIds: string[];
  smartMatch?: boolean;
  onAttributeConflict?: OnAttributeConflict;
  clientToken?: string | redacted.Redacted<string>;
}
export interface UpdateRegistrationsFromBrandProfileOutput {
  results: JobResult[];
}
export type VerificationCode = string | redacted.Redacted<string>;
export interface ValidateNotifyCodeVerificationInput {
  destinationIdentity: string | redacted.Redacted<string>;
  referenceId?: string;
  code: string | redacted.Redacted<string>;
}
export type VerificationStatus = "VALID" | "INVALID" | (string & {});
export interface ValidateNotifyCodeVerificationOutput {
  status: VerificationStatus;
}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateBrandProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a brand profile. A brand profile is a lightweight container that holds your brand identity information as flexible attributes. After you create a brand profile, use the CreateBrandProfileAttributes operation to add company information, addresses, compliance documents, and logos.
 */
export const createBrandProfile: API.OperationMethod<
  CreateBrandProfileInput,
  CreateBrandProfileOutput,
  CreateBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateBrandProfileInput>,
  output: __S(257, __c32, 1) as any as S.Schema<CreateBrandProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBrandProfile",
}));

export type CreateBrandProfileAttributesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates up to 10 attributes for a brand profile in a single request. For attributes of type IMAGE or DOCUMENT, the response includes a presigned Amazon S3 URL that you use to upload the media. This operation is atomic: either all of the attributes are created, or none of them are.
 */
export const createBrandProfileAttributes: API.OperationMethod<
  CreateBrandProfileAttributesInput,
  CreateBrandProfileAttributesOutput,
  CreateBrandProfileAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(274, __c34, 2) as any as S.Schema<CreateBrandProfileAttributesInput>,
  output: __S(277, __c34, 5) as any as S.Schema<CreateBrandProfileAttributesOutput>,
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
  operationName: "CreateBrandProfileAttributes",
}));

export type CreateBrandProfileFromRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a brand profile and populates its attributes from an existing registration. This operation runs asynchronously. Use the GetJob operation to track its progress.
 */
export const createBrandProfileFromRegistration: API.OperationMethod<
  CreateBrandProfileFromRegistrationInput,
  CreateBrandProfileFromRegistrationOutput,
  CreateBrandProfileFromRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<CreateBrandProfileFromRegistrationInput>,
  output: __S(290, __c36, 2) as any as S.Schema<CreateBrandProfileFromRegistrationOutput>,
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
  operationName: "CreateBrandProfileFromRegistration",
}));

export type CreateNotifyCodeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notify code configuration. A notify code configuration is a reusable policy that defines how one-time passcodes are generated and rendered, including the code type, length, validity period, maximum number of attempts, and channel templates.
 */
export const createNotifyCodeConfiguration: API.OperationMethod<
  CreateNotifyCodeConfigurationInput,
  CreateNotifyCodeConfigurationOutput,
  CreateNotifyCodeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateNotifyCodeConfigurationInput>,
  output: __S(24, __c3, 0) as any as S.Schema<CreateNotifyCodeConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotifyCodeConfiguration",
}));

export type CreateRegistrationsFromBrandProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates one or more registrations in the DRAFT state and prefills their fields from the attributes of a brand profile. This operation runs asynchronously. Use the GetJob operation to track its progress.
 */
export const createRegistrationsFromBrandProfile: API.OperationMethod<
  CreateRegistrationsFromBrandProfileInput,
  CreateRegistrationsFromBrandProfileOutput,
  CreateRegistrationsFromBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CreateRegistrationsFromBrandProfileInput>,
  output: __S(290, __c36, 2) as any as S.Schema<CreateRegistrationsFromBrandProfileOutput>,
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
  operationName: "CreateRegistrationsFromBrandProfile",
}));

export type DeleteBrandProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a brand profile. This operation also deletes the attributes of the profile and any associated media. The request fails if deletion protection is enabled for the profile.
 */
export const deleteBrandProfile: API.OperationMethod<
  DeleteBrandProfileInput,
  DeleteBrandProfileOutput,
  DeleteBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteBrandProfileInput>,
  output: __S(49, __c6, 1) as any as S.Schema<DeleteBrandProfileOutput>,
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
  operationName: "DeleteBrandProfile",
}));

export type DeleteBrandProfileAttributeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a brand profile attribute. If the attribute stores media, this operation also deletes the associated media.
 */
export const deleteBrandProfileAttribute: API.OperationMethod<
  DeleteBrandProfileAttributeInput,
  DeleteBrandProfileAttributeOutput,
  DeleteBrandProfileAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteBrandProfileAttributeInput>,
  output: __S(57, __c7, 1) as any as S.Schema<DeleteBrandProfileAttributeOutput>,
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
  operationName: "DeleteBrandProfileAttribute",
}));

export type DeleteNotifyCodeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notify code configuration. Verifications that are already in progress are not affected, because they capture the policy at the time that the passcode was sent.
 */
export const deleteNotifyCodeConfiguration: API.OperationMethod<
  DeleteNotifyCodeConfigurationInput,
  DeleteNotifyCodeConfigurationOutput,
  DeleteNotifyCodeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DeleteNotifyCodeConfigurationInput>,
  output: __S(72, __c9, 0) as any as S.Schema<DeleteNotifyCodeConfigurationOutput>,
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
  operationName: "DeleteNotifyCodeConfiguration",
}));

export type GetBrandProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for a brand profile, including its name, status, deletion protection setting, and timestamps. To retrieve the attributes of the profile, use the ListBrandProfileAttributes operation.
 */
export const getBrandProfile: API.OperationMethod<
  GetBrandProfileInput,
  GetBrandProfileOutput,
  GetBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetBrandProfileInput>,
  output: __S(88, __c11, 0) as any as S.Schema<GetBrandProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrandProfile",
}));

export type GetBrandProfileAttributeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a single brand profile attribute.
 */
export const getBrandProfileAttribute: API.OperationMethod<
  GetBrandProfileAttributeInput,
  GetBrandProfileAttributeOutput,
  GetBrandProfileAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetBrandProfileAttributeInput>,
  output: __S(97, __c12, 1) as any as S.Schema<GetBrandProfileAttributeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrandProfileAttribute",
}));

export type GetJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state of an asynchronous job, including its status and any resources that it created or updated.
 */
export const getJob: API.OperationMethod<
  GetJobInput,
  Job,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetJobInput>,
  output: __S(114, __c14, 2) as any as S.Schema<Job>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetNotifyCodeConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a notify code configuration.
 */
export const getNotifyCodeConfiguration: API.OperationMethod<
  GetNotifyCodeConfigurationInput,
  GetNotifyCodeConfigurationOutput,
  GetNotifyCodeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetNotifyCodeConfigurationInput>,
  output: __S(24, __c3, 0) as any as S.Schema<GetNotifyCodeConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotifyCodeConfiguration",
}));

export type ListBrandProfileAttributesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the attributes for a brand profile.
 */
export const listBrandProfileAttributes: API.PaginatedOperationMethod<
  ListBrandProfileAttributesInput,
  ListBrandProfileAttributesOutput,
  ListBrandProfileAttributesError,
  Credentials | HttpClient.HttpClient,
  BrandProfileAttributeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ListBrandProfileAttributesInput>,
  output: __S(131, __c16, 3) as any as S.Schema<ListBrandProfileAttributesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrandProfileAttributes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "brandProfileAttributes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrandProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the brand profiles in your account. Use the nextToken parameter to retrieve additional results.
 */
export const listBrandProfiles: API.PaginatedOperationMethod<
  ListBrandProfilesInput,
  ListBrandProfilesOutput,
  ListBrandProfilesError,
  Credentials | HttpClient.HttpClient,
  BrandProfileInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListBrandProfilesInput>,
  output: __S(138, __c17, 2) as any as S.Schema<ListBrandProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrandProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "brandProfiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the asynchronous jobs in your account. You can filter the results by status, brand profile, or operation type.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsInput,
  ListJobsOutput,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListJobsInput>,
  output: __S(146, __c18, 2) as any as S.Schema<ListJobsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotifyCodeConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the notify code configurations in your account.
 */
export const listNotifyCodeConfigurations: API.PaginatedOperationMethod<
  ListNotifyCodeConfigurationsInput,
  ListNotifyCodeConfigurationsOutput,
  ListNotifyCodeConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotifyCodeConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListNotifyCodeConfigurationsInput>,
  output: __S(154, __c19, 2) as any as S.Schema<ListNotifyCodeConfigurationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifyCodeConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notifyCodeConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistrationsFromBrandProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the registrations that were created from a brand profile through the synchronization operations.
 */
export const listRegistrationsFromBrandProfile: API.PaginatedOperationMethod<
  ListRegistrationsFromBrandProfileInput,
  ListRegistrationsFromBrandProfileOutput,
  ListRegistrationsFromBrandProfileError,
  Credentials | HttpClient.HttpClient,
  RegistrationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListRegistrationsFromBrandProfileInput>,
  output: __S(163, __c20, 3) as any as S.Schema<ListRegistrationsFromBrandProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistrationsFromBrandProfile",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registrationAssociations",
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
 * Retrieves the tags that are associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(169, __c21, 1) as any as S.Schema<ListTagsForResourceOutput>,
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

export type SendNotifyCodeVerificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a one-time passcode and delivers it to a recipient over the requested channel. The passcode policy is captured from the referenced notify code configuration at the time of the request, so later updates to the configuration do not affect verifications that are already in progress.
 */
export const sendNotifyCodeVerification: API.OperationMethod<
  SendNotifyCodeVerificationInput,
  SendNotifyCodeVerificationOutput,
  SendNotifyCodeVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<SendNotifyCodeVerificationInput>,
  output: __S(177, __c22, 1) as any as S.Schema<SendNotifyCodeVerificationOutput>,
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
  operationName: "SendNotifyCodeVerification",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites the tags on a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<TagResourceInput>,
  output: __S(72, __c9, 0) as any as S.Schema<TagResourceOutput>,
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
 * Removes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(72, __c9, 0) as any as S.Schema<UntagResourceOutput>,
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

export type UpdateBrandProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name or the deletion protection setting of a brand profile. To change the information that is stored in the profile, use the brand profile attribute operations.
 */
export const updateBrandProfile: API.OperationMethod<
  UpdateBrandProfileInput,
  UpdateBrandProfileOutput,
  UpdateBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<UpdateBrandProfileInput>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateBrandProfileOutput>,
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
  operationName: "UpdateBrandProfile",
}));

export type UpdateBrandProfileAttributeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the value, description, or category of an existing brand profile attribute.
 */
export const updateBrandProfileAttribute: API.OperationMethod<
  UpdateBrandProfileAttributeInput,
  UpdateBrandProfileAttributeOutput,
  UpdateBrandProfileAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<UpdateBrandProfileAttributeInput>,
  output: __S(209, __c26, 1) as any as S.Schema<UpdateBrandProfileAttributeOutput>,
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
  operationName: "UpdateBrandProfileAttribute",
}));

export type UpdateBrandProfileFromRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports or refreshes the attributes of an existing brand profile from an existing registration. This operation runs asynchronously. Use the GetJob operation to track its progress.
 */
export const updateBrandProfileFromRegistration: API.OperationMethod<
  UpdateBrandProfileFromRegistrationInput,
  UpdateBrandProfileFromRegistrationOutput,
  UpdateBrandProfileFromRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<UpdateBrandProfileFromRegistrationInput>,
  output: __S(290, __c36, 2) as any as S.Schema<UpdateBrandProfileFromRegistrationOutput>,
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
  operationName: "UpdateBrandProfileFromRegistration",
}));

export type UpdateNotifyCodeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the mutable fields of a notify code configuration. Only the fields that you supply are changed. For the template and language fields, supplying an empty value clears the currently stored value.
 */
export const updateNotifyCodeConfiguration: API.OperationMethod<
  UpdateNotifyCodeConfigurationInput,
  UpdateNotifyCodeConfigurationOutput,
  UpdateNotifyCodeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<UpdateNotifyCodeConfigurationInput>,
  output: __S(24, __c3, 0) as any as S.Schema<UpdateNotifyCodeConfigurationOutput>,
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
  operationName: "UpdateNotifyCodeConfiguration",
}));

export type UpdateRegistrationsFromBrandProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Repushes the attributes of a brand profile into existing DRAFT registrations. This operation runs asynchronously. Use the GetJob operation to track its progress.
 */
export const updateRegistrationsFromBrandProfile: API.OperationMethod<
  UpdateRegistrationsFromBrandProfileInput,
  UpdateRegistrationsFromBrandProfileOutput,
  UpdateRegistrationsFromBrandProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<UpdateRegistrationsFromBrandProfileInput>,
  output: __S(290, __c36, 2) as any as S.Schema<UpdateRegistrationsFromBrandProfileOutput>,
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
  operationName: "UpdateRegistrationsFromBrandProfile",
}));

export type ValidateNotifyCodeVerificationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates a one-time passcode that a recipient submitted. Validation succeeds when the passcode matches, the validity period has not elapsed, and the maximum number of attempts has not been exceeded.
 */
export const validateNotifyCodeVerification: API.OperationMethod<
  ValidateNotifyCodeVerificationInput,
  ValidateNotifyCodeVerificationOutput,
  ValidateNotifyCodeVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ValidateNotifyCodeVerificationInput>,
  output: __S(241, __c30, 1) as any as S.Schema<ValidateNotifyCodeVerificationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateNotifyCodeVerification",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notifyCodeConfigurationName: S.String,
          codeConfigurationParameters: S.optional(__S(8, __c1, 0)),
          channelParameters: S.optional(__S(14, __c1, 6)),
          deletionProtectionEnabled: S.optional(S.Boolean),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(265, __c33, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/notify-code-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotifyCodeConfigurationInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          codeType: S.optional(S.String),
          codeLength: S.optional(S.Number),
          validityPeriodMinutes: S.optional(S.Number),
          maxAttempts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CodeConfigurationParameters" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          inlineTemplateBody: S.optional(SensitiveString),
          destinationCountryParameters: S.optional(__S(9, __c1, 1)),
        }),
      ).annotate({ identifier: "TextParameters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          inlineTemplateBody: S.optional(SensitiveString),
          languageCode: S.optional(S.String),
          voiceId: S.optional(S.String),
          voiceMessageBodyTextType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VoiceParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({ notifyTemplateId: S.optional(S.String), voiceId: S.optional(S.String) }),
      ).annotate({ identifier: "NotifyParameters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          whatsAppTemplateName: S.optional(S.String),
          languageCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "WhatsAppParameters" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          text: S.optional(__S(10, __c1, 2)),
          voice: S.optional(__S(11, __c1, 3)),
          notify: S.optional(__S(12, __c1, 4)),
          whatsApp: S.optional(__S(13, __c1, 5)),
        }),
      ).annotate({ identifier: "ChannelParameters" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notifyCodeConfigurationId: S.String,
          notifyCodeConfigurationArn: S.String,
          notifyCodeConfigurationName: S.String,
          codeConfigurationParameters: S.optional(__S(8, __c1, 0)),
          channelParameters: S.optional(__S(14, __c1, 6)),
          deletionProtectionEnabled: S.Boolean,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "NotifyCodeConfiguration" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ notifyCodeConfiguration: __S(16, __c2, 0) })).annotate({
        identifier: "CreateNotifyCodeConfigurationOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          registrationTypes: __S(40, __c5, 0),
          smartMatch: S.optional(S.Boolean),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/brand-profiles/{brandProfileId}/create-registrations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRegistrationsFromBrandProfileInput" });
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
        S.Struct({ brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/brand-profiles/{brandProfileId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBrandProfileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ brandProfileId: S.String, brandProfileArn: S.String }),
      ).annotate({ identifier: "DeleteBrandProfileOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          attributeName: SensitiveString.pipe(T.HttpLabel("attributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/brand-profiles/{brandProfileId}/attributes/{attributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBrandProfileAttributeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ brandProfileId: S.String, attributeName: SensitiveString }),
      ).annotate({ identifier: "DeleteBrandProfileAttributeOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notifyCodeConfigurationId: S.String.pipe(T.HttpLabel("notifyCodeConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/notify-code-configurations/{notifyCodeConfigurationId+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotifyCodeConfigurationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteNotifyCodeConfigurationOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brand-profiles/{brandProfileId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBrandProfileInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String,
          brandProfileArn: S.String,
          brandProfileName: S.String,
          status: S.String,
          deletionProtectionEnabled: S.Boolean,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetBrandProfileOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          attributeName: SensitiveString.pipe(T.HttpLabel("attributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/brand-profiles/{brandProfileId}/attributes/{attributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBrandProfileAttributeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attributeName: SensitiveString,
          attributeType: S.String,
          attributeValue: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          category: S.optional(S.String),
          mediaContentType: S.optional(S.String),
          mediaSizeBytes: S.optional(S.Number),
          mediaDownloadUrl: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetBrandProfileAttributeOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/jobs/{jobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceType: S.String, resourceId: S.String, resourceArn: S.String }),
      ).annotate({ identifier: "JobResource" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          operationType: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          brandProfileId: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
          resources: S.optional(__S(113, __c14, 1)),
        }),
      ).annotate({ identifier: "Job" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notifyCodeConfigurationId: S.String.pipe(T.HttpLabel("notifyCodeConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/notify-code-configurations/{notifyCodeConfigurationId+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotifyCodeConfigurationInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brand-profiles/{brandProfileId}/attributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBrandProfileAttributesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attributeName: SensitiveString,
          attributeType: S.String,
          description: S.optional(SensitiveString),
          category: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "BrandProfileAttributeSummary" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ brandProfileAttributes: __S(130, __c16, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBrandProfileAttributesOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/brand-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBrandProfilesInput" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ brandProfiles: __S(137, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBrandProfilesOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          brandProfileId: S.optional(S.String).pipe(T.HttpQuery("brandProfileId")),
          operationType: S.optional(S.String).pipe(T.HttpQuery("operationType")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListJobsInput" });
    case 1:
      return S.Array(__S(114, __c14, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ jobs: __S(145, __c18, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/notify-code-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotifyCodeConfigurationsInput" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ notifyCodeConfigurations: __S(153, __c19, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotifyCodeConfigurationsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brand-profiles/{brandProfileId}/registrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRegistrationsFromBrandProfileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registrationId: S.String,
          registrationType: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          smartMatchUsed: S.Boolean,
        }),
      ).annotate({ identifier: "RegistrationAssociationSummary" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ registrationAssociations: __S(162, __c20, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistrationsFromBrandProfileOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(265, __c33, 1)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          channel: S.String,
          destinationIdentity: SensitiveString,
          originationIdentity: S.String,
          notifyCodeConfiguration: S.optional(S.String),
          overrideChannelParameters: S.optional(__S(14, __c1, 6)),
          overrideCodeConfigurationParameters: S.optional(__S(8, __c1, 0)),
          configurationSetName: S.optional(S.String),
          context: S.optional(__S(9, __c1, 1)),
          referenceId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/notify-code-verifications/send" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendNotifyCodeVerificationInput" });
    case 1:
      return S.suspend(() => S.Struct({ verificationId: S.String, messageId: S.String })).annotate({
        identifier: "SendNotifyCodeVerificationOutput",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(265, __c33, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(40, __c5, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          brandProfileName: S.optional(S.String),
          deletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/brand-profiles/{brandProfileId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBrandProfileInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          attributeName: SensitiveString.pipe(T.HttpLabel("attributeName")),
          attributeValue: S.optional(SensitiveString),
          attachmentBody: S.optional(T.Blob),
          description: S.optional(SensitiveString),
          category: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/brand-profiles/{brandProfileId}/attributes/{attributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBrandProfileAttributeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attributeName: SensitiveString,
          attributeType: S.String,
          attributeValue: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          category: S.optional(S.String),
          mediaContentType: S.optional(S.String),
          mediaSizeBytes: S.optional(S.Number),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateBrandProfileAttributeOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          registrationId: S.String,
          smartMatch: S.optional(S.Boolean),
          onAttributeConflict: S.optional(S.String),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/brand-profiles/{brandProfileId}/update-from-registration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBrandProfileFromRegistrationInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notifyCodeConfigurationId: S.String.pipe(T.HttpLabel("notifyCodeConfigurationId")),
          notifyCodeConfigurationName: S.optional(S.String),
          codeConfigurationParameters: S.optional(__S(8, __c1, 0)),
          channelParameters: S.optional(__S(14, __c1, 6)),
          deletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/notify-code-configurations/{notifyCodeConfigurationId+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotifyCodeConfigurationInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          registrationIds: __S(40, __c5, 0),
          smartMatch: S.optional(S.Boolean),
          onAttributeConflict: S.optional(S.String),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/brand-profiles/{brandProfileId}/update-registrations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRegistrationsFromBrandProfileInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationIdentity: SensitiveString,
          referenceId: S.optional(S.String),
          code: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/notify-code-verifications/validate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateNotifyCodeVerificationInput" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "ValidateNotifyCodeVerificationOutput",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(248, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          brandProfileName: S.String,
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          deletionProtectionEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(265, __c33, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/brand-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBrandProfileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String,
          brandProfileArn: S.String,
          brandProfileName: S.String,
          status: S.String,
          deletionProtectionEnabled: S.Boolean,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          attributesCreated: S.Number,
        }),
      ).annotate({ identifier: "CreateBrandProfileOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(264, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          attributeName: SensitiveString,
          attributeType: S.String,
          attributeValue: S.optional(SensitiveString),
          attachmentBody: S.optional(SensitiveBlob),
          description: S.optional(SensitiveString),
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "BrandProfileAttributeInput" });
    case 1:
      return S.Array(__S(272, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          brandProfileId: S.String.pipe(T.HttpLabel("brandProfileId")),
          attributes: __S(273, __c34, 1),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/brand-profiles/{brandProfileId}/attributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBrandProfileAttributesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          attributeName: SensitiveString,
          attributeType: S.String,
          mediaDownloadUrl: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BrandProfileAttributeOutput" });
    case 4:
      return S.Array(__S(275, __c34, 3));
    case 5:
      return S.suspend(() => S.Struct({ attributes: __S(276, __c34, 4) })).annotate({
        identifier: "CreateBrandProfileAttributesOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registrationId: S.String,
          brandProfileName: S.String,
          smartMatch: S.optional(S.Boolean),
          tags: S.optional(__S(265, __c33, 1)),
          clientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/brand-profiles/create-from-registration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBrandProfileFromRegistrationInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobId: S.String, resourceIdentifier: S.String })).annotate({
        identifier: "JobResult",
      });
    case 1:
      return S.Array(__S(288, __c36, 0));
    case 2:
      return S.suspend(() => S.Struct({ results: __S(289, __c36, 1) })).annotate({
        identifier: "CreateBrandProfileFromRegistrationOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
