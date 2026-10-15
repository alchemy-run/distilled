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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ConnectHealth",
  serviceShapeName: "ConnectHealth",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "health-agent" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-01-29");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://health-agent-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://health-agent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://health-agent.{R}.api.aws","properties":{},"headers":{}}',
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type SubscriptionId = string;
export interface ActivateSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export type SubscriptionArn = string;
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "DELETED" | (string & {});
export interface SubscriptionDescription {
  domainId: string;
  subscriptionId: string;
  arn: string;
  status: SubscriptionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  activatedAt?: Date;
  deactivatedAt?: Date;
}
export interface ActivateSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export type DomainName = string;
export type KmsKeyArn = string;
export interface CreateWebAppConfiguration {
  ehrRole: string;
  idcInstanceId: string;
  idcRegion: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateDomainInput {
  name: string;
  kmsKeyArn?: string;
  webAppSetupConfiguration?: CreateWebAppConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type DomainArn = string;
export type EncryptionType = "AWS_OWNED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export interface EncryptionContext {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export type DomainStatus = "ACTIVE" | "DELETING" | "DELETED" | (string & {});
export type WebAppUrl = string;
export interface WebAppConfiguration {
  ehrRole: string;
  idcApplicationId: string;
  idcRegion: string;
}
export interface CreateDomainOutput {
  domainId: string;
  arn: string;
  name: string;
  kmsKeyArn?: string;
  encryptionContext?: EncryptionContext;
  status: DomainStatus;
  webAppUrl?: string;
  webAppConfiguration?: WebAppConfiguration;
  createdAt: Date;
}
export interface CreateSubscriptionInput {
  domainId: string;
}
export interface CreateSubscriptionOutput {
  domainId: string;
  subscriptionId: string;
  arn: string;
  status: SubscriptionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  activatedAt?: Date;
  deactivatedAt?: Date;
}
export interface DeactivateSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export interface DeactivateSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export interface DeleteDomainInput {
  domainId: string;
}
export interface DeleteDomainOutput {
  domainId: string;
  arn: string;
  status: DomainStatus;
}
export interface GetDomainInput {
  domainId: string;
}
export interface GetDomainOutput {
  domainId: string;
  arn: string;
  name: string;
  kmsKeyArn?: string;
  encryptionContext?: EncryptionContext;
  status: DomainStatus;
  webAppUrl?: string;
  webAppConfiguration?: WebAppConfiguration;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type ScribeSessionId = string;
export interface GetMedicalScribeListeningSessionInput {
  sessionId: string;
  domainId: string;
  subscriptionId: string;
}
export type MedicalScribeLanguageCode = "en-US" | "multi" | (string & {});
export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding = "pcm" | "flac" | (string & {});
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole = "PATIENT" | "CLINICIAN" | (string & {});
export interface MedicalScribeChannelDefinition {
  channelId: number;
  participantRole: MedicalScribeParticipantRole;
}
export type MedicalScribeChannelDefinitions = MedicalScribeChannelDefinition[];
export type S3Uri = string;
export type ManagedNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export interface ManagedTemplateResponse {
  templateType?: ManagedNoteTemplate;
}
export type CustomTemplateBase =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | (string & {});
export interface CustomTemplateResponse {
  templateType?: CustomTemplateBase;
}
export type NoteTemplateSettingsResponse =
  | { managedTemplate: ManagedTemplateResponse; customTemplate?: never }
  | { managedTemplate?: never; customTemplate: CustomTemplateResponse };
export interface ClinicalNoteGenerationSettingsResponse {
  noteTemplateSettings?: NoteTemplateSettingsResponse;
}
export interface MedicalScribePostStreamActionSettingsResponse {
  outputS3Uri: string;
  clinicalNoteGenerationSettings: ClinicalNoteGenerationSettingsResponse;
}
export type Uri = string;
export type PostStreamArtifactGenerationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type ErrorMessage = string;
export interface ArtifactDetails {
  outputLocation?: string;
  status?: PostStreamArtifactGenerationStatus;
  failureReason?: string;
}
export interface ClinicalNoteGenerationResult {
  noteResult?: ArtifactDetails;
  transcriptResult?: ArtifactDetails;
  afterVisitSummaryResult?: ArtifactDetails;
}
export interface MedicalScribePostStreamActionsResult {
  clinicalNoteGenerationResult?: ClinicalNoteGenerationResult;
}
export type NonNullBoolean = boolean;
export type MedicalScribeStreamStatus =
  | "IN_PROGRESS"
  | "PAUSED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface MedicalScribeListeningSessionDetails {
  sessionId?: string;
  domainId?: string;
  subscriptionId?: string;
  languageCode?: MedicalScribeLanguageCode;
  mediaSampleRateHertz?: number;
  mediaEncoding?: MedicalScribeMediaEncoding;
  channelDefinitions?: MedicalScribeChannelDefinition[];
  postStreamActionSettings?: MedicalScribePostStreamActionSettingsResponse;
  postStreamActionResult?: MedicalScribePostStreamActionsResult;
  encounterContextProvided?: boolean;
  streamStatus?: MedicalScribeStreamStatus;
  streamCreationTime?: Date;
  streamEndTime?: Date;
}
export interface GetMedicalScribeListeningSessionOutput {
  medicalScribeListeningSessionDetails?: MedicalScribeListeningSessionDetails;
}
export type JobId = string;
export interface GetPatientInsightsJobRequest {
  domainId: string;
  jobId: string;
}
export type JobArn = string;
export type JobStatus = "SUBMITTED" | "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | (string & {});
export interface InsightsOutput {
  uri: string;
}
export type NonEmptyString = string;
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type SensitiveIsoDateString = string | redacted.Redacted<string>;
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export interface PatientInsightsPatientContext {
  patientId: string | redacted.Redacted<string>;
  dateOfBirth?: string | redacted.Redacted<string>;
  pronouns?: Pronouns;
}
export type InsightsType = "PRE_VISIT" | (string & {});
export interface InsightsContext {
  insightsType: InsightsType;
}
export interface PatientInsightsEncounterContext {
  encounterReason: string | redacted.Redacted<string>;
}
export type ProviderRole = "CLINICIAN" | (string & {});
export type Specialty = "PRIMARY_CARE" | (string & {});
export interface UserContext {
  role: ProviderRole;
  userId: string | redacted.Redacted<string>;
  specialty?: Specialty;
}
export interface FHIRServer {
  fhirEndpoint: string;
  oauthToken?: string | redacted.Redacted<string>;
}
export interface S3Source {
  uri: string;
}
export type S3Sources = S3Source[];
export interface InputDataConfig {
  fhirServer?: FHIRServer;
  s3Sources?: S3Source[];
}
export interface OutputDataConfig {
  s3OutputPath: string;
}
export interface GetPatientInsightsJobResponse {
  jobId: string;
  jobArn: string;
  jobStatus: JobStatus;
  creationTime?: Date;
  updatedTime?: Date;
  insightsOutput?: InsightsOutput;
  statusDetails?: string;
  patientContext: PatientInsightsPatientContext;
  insightsContext: InsightsContext;
  encounterContext: PatientInsightsEncounterContext;
  userContext: UserContext;
  inputDataConfig: InputDataConfig;
  outputDataConfig: OutputDataConfig;
}
export interface GetSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export interface GetSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export interface ListDomainsInput {
  status?: DomainStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface DomainSummary {
  domainId: string;
  arn: string;
  name: string;
  status: DomainStatus;
  createdAt: Date;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsOutput {
  domains: DomainSummary[];
  nextToken?: string;
}
export interface ListSubscriptionsInput {
  domainId: string;
  maxResults?: number;
  nextToken?: string;
}
export type SubscriptionList = SubscriptionDescription[];
export interface ListSubscriptionsOutput {
  subscriptions: SubscriptionDescription[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export type AudioChunk = Uint8Array;
export interface MedicalScribeAudioEvent {
  audioChunk: Uint8Array;
}
export interface MedicalScribeBinaryAudioEvent {
  audioChunk: Uint8Array;
}
export type MedicalScribeSessionControlEventType = "END_OF_SESSION" | (string & {});
export interface MedicalScribeSessionControlEvent {
  type?: MedicalScribeSessionControlEventType;
}
export interface ManagedTemplate {
  templateType: ManagedNoteTemplate;
}
export type SensitiveSectionHeaderString = string | redacted.Redacted<string>;
export type SensitiveMarkdownString = string | redacted.Redacted<string>;
export interface TemplateSectionInstruction {
  sectionHeader: string | redacted.Redacted<string>;
  sectionInstruction: string | redacted.Redacted<string>;
}
export type TemplateInstructions = TemplateSectionInstruction[];
export interface CustomTemplate {
  templateType: CustomTemplateBase;
  templateInstructions: TemplateSectionInstruction[];
}
export type NoteTemplateSettings =
  | { managedTemplate: ManagedTemplate; customTemplate?: never }
  | { managedTemplate?: never; customTemplate: CustomTemplate };
export interface ClinicalNoteGenerationSettings {
  noteTemplateSettings: NoteTemplateSettings;
}
export interface MedicalScribePostStreamActionSettings {
  outputS3Uri: string;
  clinicalNoteGenerationSettings: ClinicalNoteGenerationSettings;
}
export interface EncounterContext {
  unstructuredContext?: string | redacted.Redacted<string>;
}
export interface MedicalScribeConfigurationEvent {
  postStreamActionSettings: MedicalScribePostStreamActionSettings;
  channelDefinitions?: MedicalScribeChannelDefinition[];
  encounterContext?: EncounterContext;
}
export type MedicalScribeInputStream =
  | {
      audioEvent: MedicalScribeAudioEvent;
      binaryAudioEvent?: never;
      sessionControlEvent?: never;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent: MedicalScribeBinaryAudioEvent;
      sessionControlEvent?: never;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent?: never;
      sessionControlEvent: MedicalScribeSessionControlEvent;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent?: never;
      sessionControlEvent?: never;
      configurationEvent: MedicalScribeConfigurationEvent;
    };
export interface StartMedicalScribeListeningSessionInput {
  sessionId: string;
  domainId: string;
  subscriptionId: string;
  languageCode: MedicalScribeLanguageCode;
  mediaSampleRateHertz: number;
  mediaEncoding: MedicalScribeMediaEncoding;
  inputStream?: stream.Stream<MedicalScribeInputStream, Error, never>;
}
export type RequestId = string;
export type AudioOffset = number;
export interface MedicalScribeTranscriptSegment {
  segmentId?: string;
  audioBeginOffset?: number;
  audioEndOffset?: number;
  isPartial?: boolean;
  channelId?: string;
  content?: string;
}
export interface MedicalScribeTranscriptEvent {
  transcriptSegment?: MedicalScribeTranscriptSegment;
}
export type MedicalScribeOutputStream =
  | {
      transcriptEvent: MedicalScribeTranscriptEvent;
      internalFailureException?: never;
      validationException?: never;
    }
  | {
      transcriptEvent?: never;
      internalFailureException: InternalServerException;
      validationException?: never;
    }
  | {
      transcriptEvent?: never;
      internalFailureException?: never;
      validationException: ValidationException;
    };
export interface StartMedicalScribeListeningSessionOutput {
  sessionId?: string;
  domainId?: string;
  subscriptionId?: string;
  requestId?: string;
  languageCode?: MedicalScribeLanguageCode;
  mediaSampleRateHertz?: number;
  mediaEncoding?: MedicalScribeMediaEncoding;
  responseStream?: stream.Stream<MedicalScribeOutputStream, Error, never>;
}
export interface StartPatientInsightsJobRequest {
  domainId: string;
  patientContext: PatientInsightsPatientContext;
  insightsContext: InsightsContext;
  encounterContext: PatientInsightsEncounterContext;
  userContext: UserContext;
  inputDataConfig: InputDataConfig;
  outputDataConfig: OutputDataConfig;
  clientToken?: string;
}
export interface StartPatientInsightsJobResponse {
  jobArn: string;
  jobId: string;
  creationTime?: Date;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type ActivateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Activates a Subscription to enable billing for a user.
 */
export const activateSubscription: API.OperationMethod<
  ActivateSubscriptionInput,
  ActivateSubscriptionOutput,
  ActivateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<ActivateSubscriptionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<ActivateSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateSubscription",
}));

export type CreateDomainError = ServiceQuotaExceededException | CommonErrors;
/**
 * Creates a new Domain for managing HealthAgent resources.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(609, __c19, 1) as any as S.Schema<CreateDomainInput>,
  output: __S(610, __c19, 2) as any as S.Schema<CreateDomainOutput>,
  errors: [ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Subscription within a Domain for billing and user management.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<CreateSubscriptionInput>,
  output: __S(576, __c18, 0) as any as S.Schema<CreateSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
}));

export type DeactivateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deactivates a Subscription to stop billing for a user.
 */
export const deactivateSubscription: API.OperationMethod<
  DeactivateSubscriptionInput,
  DeactivateSubscriptionOutput,
  DeactivateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeactivateSubscriptionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeactivateSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateSubscription",
}));

export type DeleteDomainError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a Domain and all associated resources.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<DeleteDomainInput>,
  output: __S(33, __c1, 1) as any as S.Schema<DeleteDomainOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type GetDomainError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a Domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<GetDomainInput>,
  output: __S(65, __c2, 1) as any as S.Schema<GetDomainOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
}));

export type GetMedicalScribeListeningSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about an existing Medical Scribe listening session
 */
export const getMedicalScribeListeningSession: API.OperationMethod<
  GetMedicalScribeListeningSessionInput,
  GetMedicalScribeListeningSessionOutput,
  GetMedicalScribeListeningSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<GetMedicalScribeListeningSessionInput>,
  output: __S(105, __c3, 9) as any as S.Schema<GetMedicalScribeListeningSessionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeListeningSession",
  endpointHostPrefix: "streaming.",
}));

export type GetPatientInsightsJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a started patient insights job.
 */
export const getPatientInsightsJob: API.OperationMethod<
  GetPatientInsightsJobRequest,
  GetPatientInsightsJobResponse,
  GetPatientInsightsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<GetPatientInsightsJobRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<GetPatientInsightsJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatientInsightsJob",
  endpointHostPrefix: "runtime.",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Subscription.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<GetSubscriptionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<GetSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type ListDomainsError = CommonErrors;
/**
 * Lists Domains for a given account.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<ListDomainsInput>,
  output: __S(259, __c8, 3) as any as S.Schema<ListDomainsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Subscriptions within a Domain.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<ListSubscriptionsInput>,
  output: __S(290, __c9, 2) as any as S.Schema<ListSubscriptionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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

export type ListTagsForResourceError = CommonErrors;
/**
 * Lists the tags associated with the specified resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(321, __c10, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartMedicalScribeListeningSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new Medical Scribe listening session for real-time audio transcription
 */
export const startMedicalScribeListeningSession: API.OperationMethod<
  StartMedicalScribeListeningSessionInput,
  StartMedicalScribeListeningSessionOutput,
  StartMedicalScribeListeningSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(365, __c11, 13) as any as S.Schema<StartMedicalScribeListeningSessionInput>,
  output: __S(369, __c11, 17) as any as S.Schema<StartMedicalScribeListeningSessionOutput>,
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
  operationName: "StartMedicalScribeListeningSession",
  endpointHostPrefix: "streaming.",
}));

export type StartPatientInsightsJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new patient insights job.
 */
export const startPatientInsightsJob: API.OperationMethod<
  StartPatientInsightsJobRequest,
  StartPatientInsightsJobResponse,
  StartPatientInsightsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<StartPatientInsightsJobRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<StartPatientInsightsJobResponse>,
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
  operationName: "StartPatientInsightsJob",
  endpointHostPrefix: "runtime.",
}));

export type TagResourceError = CommonErrors;
/**
 * Associates the specified tags with the specified resource
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<TagResourceInput>,
  output: __S(448, __c14, 0) as any as S.Schema<TagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes the specified tags from the specified resource
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(481, __c15, 1) as any as S.Schema<UntagResourceInput>,
  output: __S(448, __c14, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{domainId}/subscriptions/{subscriptionId}/deactivate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeactivateSubscriptionInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domain/{domainId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ domainId: S.String, arn: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteDomainOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/domain/{domainId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          arn: S.String,
          name: S.String,
          kmsKeyArn: S.optional(S.String),
          encryptionContext: S.optional(__S(640, __c20, 0)),
          status: S.String,
          webAppUrl: S.optional(S.String),
          webAppConfiguration: S.optional(__S(641, __c20, 1)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(672, __c21, 0)),
        }),
      ).annotate({ identifier: "GetDomainOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/medical-scribe-stream/domain/{domainId}/subscription/{subscriptionId}/session/{sessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMedicalScribeListeningSessionInput" });
    case 1:
      return S.suspend(() => S.Struct({ templateType: S.optional(S.String) })).annotate({
        identifier: "ManagedTemplateResponse",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ managedTemplate: __S(97, __c3, 1) }),
        /*@__PURE__*/ S.Struct({ customTemplate: __S(97, __c3, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({ noteTemplateSettings: S.optional(__S(98, __c3, 2)) }),
      ).annotate({ identifier: "ClinicalNoteGenerationSettingsResponse" });
    case 4:
      return S.suspend(() =>
        S.Struct({ outputS3Uri: S.String, clinicalNoteGenerationSettings: __S(99, __c3, 3) }),
      ).annotate({ identifier: "MedicalScribePostStreamActionSettingsResponse" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          outputLocation: S.optional(S.String),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ArtifactDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          noteResult: S.optional(__S(101, __c3, 5)),
          transcriptResult: S.optional(__S(101, __c3, 5)),
          afterVisitSummaryResult: S.optional(__S(101, __c3, 5)),
        }),
      ).annotate({ identifier: "ClinicalNoteGenerationResult" });
    case 7:
      return S.suspend(() =>
        S.Struct({ clinicalNoteGenerationResult: S.optional(__S(102, __c3, 6)) }),
      ).annotate({ identifier: "MedicalScribePostStreamActionsResult" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.optional(S.String),
          domainId: S.optional(S.String),
          subscriptionId: S.optional(S.String),
          languageCode: S.optional(S.String),
          mediaSampleRateHertz: S.optional(S.Number),
          mediaEncoding: S.optional(S.String),
          channelDefinitions: S.optional(__S(129, __c4, 1)),
          postStreamActionSettings: S.optional(__S(100, __c3, 4)),
          postStreamActionResult: S.optional(__S(103, __c3, 7)),
          encounterContextProvided: S.optional(S.Boolean),
          streamStatus: S.optional(S.String),
          streamCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          streamEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MedicalScribeListeningSessionDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ medicalScribeListeningSessionDetails: S.optional(__S(104, __c3, 8)) }),
      ).annotate({ identifier: "GetMedicalScribeListeningSessionOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ channelId: S.Number, participantRole: S.String })).annotate(
        { identifier: "MedicalScribeChannelDefinition" },
      );
    case 1:
      return S.Array(__S(128, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domain/{domainId}/patient-insights-job/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPatientInsightsJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          jobArn: S.String,
          jobStatus: S.String,
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          insightsOutput: S.optional(__S(192, __c6, 0)),
          statusDetails: S.optional(S.String),
          patientContext: __S(193, __c6, 1),
          insightsContext: __S(194, __c6, 2),
          encounterContext: __S(195, __c6, 3),
          userContext: __S(196, __c6, 4),
          inputDataConfig: __S(199, __c6, 7),
          outputDataConfig: __S(200, __c6, 8),
        }),
      ).annotate({ identifier: "GetPatientInsightsJobResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uri: S.String })).annotate({
        identifier: "InsightsOutput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          patientId: SensitiveString,
          dateOfBirth: S.optional(SensitiveString),
          pronouns: S.optional(S.String),
        }),
      ).annotate({ identifier: "PatientInsightsPatientContext" });
    case 2:
      return S.suspend(() => S.Struct({ insightsType: S.String })).annotate({
        identifier: "InsightsContext",
      });
    case 3:
      return S.suspend(() => S.Struct({ encounterReason: SensitiveString })).annotate({
        identifier: "PatientInsightsEncounterContext",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ role: S.String, userId: SensitiveString, specialty: S.optional(S.String) }),
      ).annotate({ identifier: "UserContext" });
    case 5:
      return S.suspend(() =>
        S.Struct({ fhirEndpoint: S.String, oauthToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "FHIRServer" });
    case 6:
      return S.Array(__S(192, __c6, 0));
    case 7:
      return S.suspend(() =>
        S.Struct({
          fhirServer: S.optional(__S(197, __c6, 5)),
          s3Sources: S.optional(__S(198, __c6, 6)),
        }),
      ).annotate({ identifier: "InputDataConfig" });
    case 8:
      return S.suspend(() => S.Struct({ s3OutputPath: S.String })).annotate({
        identifier: "OutputDataConfig",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{domainId}/subscriptions/{subscriptionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/domain" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          arn: S.String,
          name: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ domains: __S(258, __c8, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{domainId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionsInput" });
    case 1:
      return S.Array(__S(576, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ subscriptions: __S(289, __c9, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionsOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(672, __c21, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ audioChunk: T.Blob })).annotate({
        identifier: "MedicalScribeAudioEvent",
      });
    case 1:
      return S.suspend(() => S.Struct({ audioChunk: T.Blob.pipe(T.EventPayload()) })).annotate({
        identifier: "MedicalScribeBinaryAudioEvent",
      });
    case 2:
      return S.suspend(() => S.Struct({ type: S.optional(S.String) })).annotate({
        identifier: "MedicalScribeSessionControlEvent",
      });
    case 3:
      return S.suspend(() => S.Struct({ templateType: S.String })).annotate({
        identifier: "ManagedTemplate",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ sectionHeader: SensitiveString, sectionInstruction: SensitiveString }),
      ).annotate({ identifier: "TemplateSectionInstruction" });
    case 5:
      return S.Array(__S(356, __c11, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ templateType: S.String, templateInstructions: __S(357, __c11, 5) }),
      ).annotate({ identifier: "CustomTemplate" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ managedTemplate: __S(355, __c11, 3) }),
        /*@__PURE__*/ S.Struct({ customTemplate: __S(358, __c11, 6) }),
      ]);
    case 8:
      return S.suspend(() => S.Struct({ noteTemplateSettings: __S(359, __c11, 7) })).annotate({
        identifier: "ClinicalNoteGenerationSettings",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ outputS3Uri: S.String, clinicalNoteGenerationSettings: __S(360, __c11, 8) }),
      ).annotate({ identifier: "MedicalScribePostStreamActionSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({ unstructuredContext: S.optional(SensitiveString) }),
      ).annotate({ identifier: "EncounterContext" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          postStreamActionSettings: __S(361, __c11, 9),
          channelDefinitions: S.optional(__S(129, __c4, 1)),
          encounterContext: S.optional(__S(362, __c11, 10)),
        }),
      ).annotate({ identifier: "MedicalScribeConfigurationEvent" });
    case 12:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ audioEvent: __S(352, __c11, 0) }),
          /*@__PURE__*/ S.Struct({ binaryAudioEvent: __S(353, __c11, 1) }),
          /*@__PURE__*/ S.Struct({ sessionControlEvent: __S(354, __c11, 2) }),
          /*@__PURE__*/ S.Struct({ configurationEvent: __S(363, __c11, 11) }),
        ]),
      );
    case 13:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String.pipe(T.HttpHeader("x-amzn-medscribe-session-id")),
          domainId: S.String.pipe(T.HttpHeader("x-amzn-medscribe-domain-id")),
          subscriptionId: S.String.pipe(T.HttpHeader("x-amzn-medscribe-subscription-id")),
          languageCode: S.String.pipe(T.HttpHeader("x-amzn-medscribe-language-code")),
          mediaSampleRateHertz: S.Number.pipe(T.HttpHeader("x-amzn-medscribe-sample-rate")),
          mediaEncoding: S.String.pipe(T.HttpHeader("x-amzn-medscribe-media-encoding")),
          inputStream: S.optional(__S(364, __c11, 12)).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/medical-scribe-stream/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMedicalScribeListeningSessionInput" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          segmentId: S.optional(S.String),
          audioBeginOffset: S.optional(S.Number),
          audioEndOffset: S.optional(S.Number),
          isPartial: S.optional(S.Boolean),
          channelId: S.optional(S.String),
          content: S.optional(S.String),
        }),
      ).annotate({ identifier: "MedicalScribeTranscriptSegment" });
    case 15:
      return S.suspend(() =>
        S.Struct({ transcriptSegment: S.optional(__S(366, __c11, 14)) }),
      ).annotate({ identifier: "MedicalScribeTranscriptEvent" });
    case 16:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ transcriptEvent: __S(367, __c11, 15) }),
          /*@__PURE__*/ S.Struct({
            internalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
        ]),
      );
    case 17:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-medscribe-session-id")),
          domainId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-medscribe-domain-id")),
          subscriptionId: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-medscribe-subscription-id"),
          ),
          requestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
          languageCode: S.optional(S.String).pipe(T.HttpHeader("x-amzn-medscribe-language-code")),
          mediaSampleRateHertz: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-medscribe-sample-rate"),
          ),
          mediaEncoding: S.optional(S.String).pipe(T.HttpHeader("x-amzn-medscribe-media-encoding")),
          responseStream: S.optional(__S(368, __c11, 16)).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "StartMedicalScribeListeningSessionOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          patientContext: __S(193, __c6, 1),
          insightsContext: __S(194, __c6, 2),
          encounterContext: __S(195, __c6, 3),
          userContext: __S(196, __c6, 4),
          inputDataConfig: __S(199, __c6, 7),
          outputDataConfig: __S(200, __c6, 8),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domain/{domainId}/patient-insights-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartPatientInsightsJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobId: S.String,
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartPatientInsightsJobResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(672, __c21, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(480, __c15, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{domainId}/subscriptions/{subscriptionId}/activate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ActivateSubscriptionInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ subscription: S.optional(__S(576, __c18, 0)) })).annotate({
        identifier: "ActivateSubscriptionOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          subscriptionId: S.String,
          arn: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deactivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SubscriptionDescription" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ehrRole: S.String, idcInstanceId: S.String, idcRegion: S.String }),
      ).annotate({ identifier: "CreateWebAppConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          kmsKeyArn: S.optional(S.String),
          webAppSetupConfiguration: S.optional(__S(608, __c19, 0)),
          tags: S.optional(__S(672, __c21, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/domain" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDomainInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          arn: S.String,
          name: S.String,
          kmsKeyArn: S.optional(S.String),
          encryptionContext: S.optional(__S(640, __c20, 0)),
          status: S.String,
          webAppUrl: S.optional(S.String),
          webAppConfiguration: S.optional(__S(641, __c20, 1)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateDomainOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ encryptionType: S.String, kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ehrRole: S.String, idcApplicationId: S.String, idcRegion: S.String }),
      ).annotate({ identifier: "WebAppConfiguration" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
