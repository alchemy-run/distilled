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
  sdkId: "ConnectHealth",
  target: "ConnectHealth",
  version: "2025-01-29",
  sigv4: "health-agent",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type DomainId = string;
export type SubscriptionId = string;
export interface ActivateSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export type SubscriptionArn = string;
export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETED"
  | (string & {});
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
export type EncryptionType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
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
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding = "pcm" | "flac" | (string & {});
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole =
  | "PATIENT"
  | "CLINICIAN"
  | (string & {});
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
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
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
export type MedicalScribeSessionControlEventType =
  | "END_OF_SESSION"
  | (string & {});
export interface MedicalScribeSessionControlEvent {
  type?: MedicalScribeSessionControlEventType;
}
export interface ManagedTemplate {
  templateType: ManagedNoteTemplate;
}
export type SensitiveAlphanumericString = string | redacted.Redacted<string>;
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
  descriptor: {
    service: svc,
    http: "POST /domains/{domainId}/subscriptions/{subscriptionId}/activate",
    input: { domainId: 0, subscriptionId: 0 },
    output: { subscription: o_SubscriptionDescription },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domain",
    input: {
      name: 0,
      kmsKeyArn: 0,
      webAppSetupConfiguration: { ehrRole: 0, idcInstanceId: 0, idcRegion: 0 },
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domains/{domainId}/subscriptions",
    input: { domainId: 0 },
    output: {
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      activatedAt: D.ts,
      deactivatedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domains/{domainId}/subscriptions/{subscriptionId}/deactivate",
    input: { domainId: 0, subscriptionId: 0 },
    output: { subscription: o_SubscriptionDescription },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /domain/{domainId}",
    input: { domainId: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domain/{domainId}",
    input: { domainId: 0 },
    output: { createdAt: D.ts },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /medical-scribe-stream/domain/{domainId}/subscription/{subscriptionId}/session/{sessionId}",
    input: { sessionId: 0, domainId: 0, subscriptionId: 0 },
    output: {
      medicalScribeListeningSessionDetails: {
        streamCreationTime: D.ts,
        streamEndTime: D.ts,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domain/{domainId}/patient-insights-job/{jobId}",
    input: { domainId: 0, jobId: 0 },
    output: {
      creationTime: D.ts,
      updatedTime: D.ts,
      patientContext: {
        patientId: D.secret,
        dateOfBirth: D.secret,
        pronouns: D.secret,
      },
      encounterContext: { encounterReason: D.secret },
      userContext: { userId: D.secret },
      inputDataConfig: { fhirServer: { oauthToken: D.secret } },
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
  operationName: "GetPatientInsightsJob",
  endpointHostPrefix: "runtime.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domains/{domainId}/subscriptions/{subscriptionId}",
    input: { domainId: 0, subscriptionId: 0 },
    output: { subscription: o_SubscriptionDescription },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domain",
    input: {
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { domains: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /domains/{domainId}/subscriptions",
    input: {
      domainId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { subscriptions: D.list(o_SubscriptionDescription) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /medical-scribe-stream/",
    input: {
      sessionId: D.m({ header: "x-amzn-medscribe-session-id" }),
      domainId: D.m({ header: "x-amzn-medscribe-domain-id" }),
      subscriptionId: D.m({ header: "x-amzn-medscribe-subscription-id" }),
      languageCode: D.m({ header: "x-amzn-medscribe-language-code" }),
      mediaSampleRateHertz: D.m({ header: "x-amzn-medscribe-sample-rate" }),
      mediaEncoding: D.m({ header: "x-amzn-medscribe-media-encoding" }),
      inputStream: D.m({
        payload: true,
        shape: D.events(
          {
            audioEvent: { audioChunk: 0 },
            binaryAudioEvent: { audioChunk: 0 },
            sessionControlEvent: { type: 0 },
            configurationEvent: {
              postStreamActionSettings: {
                outputS3Uri: 0,
                clinicalNoteGenerationSettings: {
                  noteTemplateSettings: {
                    managedTemplate: { templateType: 0 },
                    customTemplate: {
                      templateType: 0,
                      templateInstructions: D.list({
                        sectionHeader: 0,
                        sectionInstruction: 0,
                      }),
                    },
                  },
                },
              },
              channelDefinitions: D.list({ channelId: 0, participantRole: 0 }),
              encounterContext: { unstructuredContext: 0 },
            },
          },
          { binaryAudioEvent: "audioChunk" },
        ),
      }),
    },
    output: {
      sessionId: D.m({ header: "x-amzn-medscribe-session-id" }),
      domainId: D.m({ header: "x-amzn-medscribe-domain-id" }),
      subscriptionId: D.m({ header: "x-amzn-medscribe-subscription-id" }),
      requestId: D.m({ header: "x-amzn-request-id" }),
      languageCode: D.m({ header: "x-amzn-medscribe-language-code" }),
      mediaSampleRateHertz: D.m({
        header: "x-amzn-medscribe-sample-rate",
        shape: D.num,
      }),
      mediaEncoding: D.m({ header: "x-amzn-medscribe-media-encoding" }),
      responseStream: D.m({
        payload: true,
        shape: D.events({
          transcriptEvent: 0,
          internalFailureException: 0,
          validationException: 0,
        }),
      }),
    },
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
  operationName: "StartMedicalScribeListeningSession",
  endpointHostPrefix: "streaming.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domain/{domainId}/patient-insights-job",
    input: {
      domainId: 0,
      patientContext: { patientId: 0, dateOfBirth: 0, pronouns: 0 },
      insightsContext: { insightsType: 0 },
      encounterContext: { encounterReason: 0 },
      userContext: { role: 0, userId: 0, specialty: 0 },
      inputDataConfig: {
        fhirServer: { fhirEndpoint: 0, oauthToken: 0 },
        s3Sources: D.list({ uri: 0 }),
      },
      outputDataConfig: { s3OutputPath: 0 },
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTime: D.ts },
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
  operationName: "StartPatientInsightsJob",
  endpointHostPrefix: "runtime.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const o_SubscriptionDescription: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
  activatedAt: D.ts,
  deactivatedAt: D.ts,
});
