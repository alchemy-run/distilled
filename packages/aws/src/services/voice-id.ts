import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Voice ID",
  target: "VoiceID",
  version: "2021-09-27",
  sigv4: "voiceid",
  protocol: awsJson1_0Protocol,
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
                `https://voiceid-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://voiceid-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://voiceid.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://voiceid.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly ConflictType?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceType?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type DomainId = string;
export type WatchlistId = string;
export type FraudsterId = string | redacted.Redacted<string>;
export interface AssociateFraudsterRequest {
  DomainId: string;
  WatchlistId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export type GeneratedFraudsterId = string;
export type ResponseWatchlistIds = string[];
export interface Fraudster {
  DomainId?: string;
  GeneratedFraudsterId?: string;
  CreatedAt?: Date;
  WatchlistIds?: string[];
}
export interface AssociateFraudsterResponse {
  Fraudster?: Fraudster;
}
export type DomainName = string | redacted.Redacted<string>;
export type Description = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export interface ServerSideEncryptionConfiguration {
  KmsKeyId: string;
}
export type ClientTokenString = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export interface CreateDomainRequest {
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
}
export type Arn = string;
export type DomainStatus = string;
export type ServerSideEncryptionUpdateStatus = string;
export interface ServerSideEncryptionUpdateDetails {
  OldKmsKeyId?: string;
  UpdateStatus?: string;
  Message?: string;
}
export interface WatchlistDetails {
  DefaultWatchlistId: string;
}
export interface Domain {
  DomainId?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DomainStatus?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ServerSideEncryptionUpdateDetails?: ServerSideEncryptionUpdateDetails;
  WatchlistDetails?: WatchlistDetails;
}
export interface CreateDomainResponse {
  Domain?: Domain;
}
export type WatchlistName = string | redacted.Redacted<string>;
export type WatchlistDescription = string | redacted.Redacted<string>;
export interface CreateWatchlistRequest {
  DomainId: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
}
export interface Watchlist {
  DomainId?: string;
  WatchlistId?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DefaultWatchlist?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface CreateWatchlistResponse {
  Watchlist?: Watchlist;
}
export interface DeleteDomainRequest {
  DomainId: string;
}
export interface DeleteDomainResponse {}
export interface DeleteFraudsterRequest {
  DomainId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export interface DeleteFraudsterResponse {}
export type SpeakerId = string | redacted.Redacted<string>;
export interface DeleteSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export interface DeleteSpeakerResponse {}
export interface DeleteWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
}
export interface DeleteWatchlistResponse {}
export interface DescribeDomainRequest {
  DomainId: string;
}
export interface DescribeDomainResponse {
  Domain?: Domain;
}
export interface DescribeFraudsterRequest {
  DomainId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export interface DescribeFraudsterResponse {
  Fraudster?: Fraudster;
}
export type JobId = string;
export interface DescribeFraudsterRegistrationJobRequest {
  DomainId: string;
  JobId: string;
}
export type JobName = string | redacted.Redacted<string>;
export type FraudsterRegistrationJobStatus = string;
export type IamRoleArn = string;
export type DuplicateRegistrationAction = string;
export type Score = number;
export type RegistrationConfigWatchlistIds = string[];
export interface RegistrationConfig {
  DuplicateRegistrationAction?: string;
  FraudsterSimilarityThreshold?: number;
  WatchlistIds?: string[];
}
export type S3Uri = string;
export interface InputDataConfig {
  S3Uri: string;
}
export interface OutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export interface FailureDetails {
  StatusCode?: number;
  Message?: string;
}
export interface JobProgress {
  PercentComplete?: number;
}
export interface FraudsterRegistrationJob {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  DataAccessRoleArn?: string;
  RegistrationConfig?: RegistrationConfig;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export interface DescribeFraudsterRegistrationJobResponse {
  Job?: FraudsterRegistrationJob;
}
export interface DescribeSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export type CustomerSpeakerId = string | redacted.Redacted<string>;
export type GeneratedSpeakerId = string;
export type SpeakerStatus = string;
export interface Speaker {
  DomainId?: string;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LastAccessedAt?: Date;
}
export interface DescribeSpeakerResponse {
  Speaker?: Speaker;
}
export interface DescribeSpeakerEnrollmentJobRequest {
  DomainId: string;
  JobId: string;
}
export type SpeakerEnrollmentJobStatus = string;
export type ExistingEnrollmentAction = string;
export type FraudDetectionAction = string;
export type EnrollmentJobFraudDetectionConfigWatchlistIds = string[];
export interface EnrollmentJobFraudDetectionConfig {
  FraudDetectionAction?: string;
  RiskThreshold?: number;
  WatchlistIds?: string[];
}
export interface EnrollmentConfig {
  ExistingEnrollmentAction?: string;
  FraudDetectionConfig?: EnrollmentJobFraudDetectionConfig;
}
export interface SpeakerEnrollmentJob {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  DataAccessRoleArn?: string;
  EnrollmentConfig?: EnrollmentConfig;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export interface DescribeSpeakerEnrollmentJobResponse {
  Job?: SpeakerEnrollmentJob;
}
export interface DescribeWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
}
export interface DescribeWatchlistResponse {
  Watchlist?: Watchlist;
}
export interface DisassociateFraudsterRequest {
  DomainId: string;
  WatchlistId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export interface DisassociateFraudsterResponse {
  Fraudster?: Fraudster;
}
export type SessionNameOrId = string;
export interface EvaluateSessionRequest {
  DomainId: string;
  SessionNameOrId: string;
}
export type SessionId = string;
export type SessionName = string;
export type StreamingStatus = string;
export type UniqueIdLarge = string;
export type AuthenticationDecision = string;
export interface AuthenticationConfiguration {
  AcceptanceThreshold: number;
}
export interface AuthenticationResult {
  AuthenticationResultId?: string;
  AudioAggregationStartedAt?: Date;
  AudioAggregationEndedAt?: Date;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Decision?: string;
  Score?: number;
  Configuration?: AuthenticationConfiguration;
}
export interface FraudDetectionConfiguration {
  RiskThreshold?: number;
  WatchlistId?: string;
}
export type FraudDetectionDecision = string;
export type FraudDetectionReason = string;
export type FraudDetectionReasons = string[];
export interface KnownFraudsterRisk {
  RiskScore: number;
  GeneratedFraudsterId?: string;
}
export interface VoiceSpoofingRisk {
  RiskScore: number;
}
export interface FraudRiskDetails {
  KnownFraudsterRisk: KnownFraudsterRisk;
  VoiceSpoofingRisk: VoiceSpoofingRisk;
}
export interface FraudDetectionResult {
  FraudDetectionResultId?: string;
  AudioAggregationStartedAt?: Date;
  AudioAggregationEndedAt?: Date;
  Configuration?: FraudDetectionConfiguration;
  Decision?: string;
  Reasons?: string[];
  RiskDetails?: FraudRiskDetails;
}
export interface EvaluateSessionResponse {
  DomainId?: string;
  SessionId?: string;
  SessionName?: string;
  StreamingStatus?: string;
  AuthenticationResult?: AuthenticationResult;
  FraudDetectionResult?: FraudDetectionResult;
}
export type MaxResultsForListDomainFe = number;
export type NextToken = string;
export interface ListDomainsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DomainSummary {
  DomainId?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DomainStatus?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ServerSideEncryptionUpdateDetails?: ServerSideEncryptionUpdateDetails;
  WatchlistDetails?: WatchlistDetails;
}
export type DomainSummaries = DomainSummary[];
export interface ListDomainsResponse {
  DomainSummaries?: DomainSummary[];
  NextToken?: string;
}
export type MaxResultsForList = number;
export interface ListFraudsterRegistrationJobsRequest {
  DomainId: string;
  JobStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface FraudsterRegistrationJobSummary {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export type FraudsterRegistrationJobSummaries =
  FraudsterRegistrationJobSummary[];
export interface ListFraudsterRegistrationJobsResponse {
  JobSummaries?: FraudsterRegistrationJobSummary[];
  NextToken?: string;
}
export interface ListFraudstersRequest {
  DomainId: string;
  WatchlistId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface FraudsterSummary {
  DomainId?: string;
  GeneratedFraudsterId?: string;
  CreatedAt?: Date;
  WatchlistIds?: string[];
}
export type FraudsterSummaries = FraudsterSummary[];
export interface ListFraudstersResponse {
  FraudsterSummaries?: FraudsterSummary[];
  NextToken?: string;
}
export interface ListSpeakerEnrollmentJobsRequest {
  DomainId: string;
  JobStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SpeakerEnrollmentJobSummary {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export type SpeakerEnrollmentJobSummaries = SpeakerEnrollmentJobSummary[];
export interface ListSpeakerEnrollmentJobsResponse {
  JobSummaries?: SpeakerEnrollmentJobSummary[];
  NextToken?: string;
}
export interface ListSpeakersRequest {
  DomainId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SpeakerSummary {
  DomainId?: string;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LastAccessedAt?: Date;
}
export type SpeakerSummaries = SpeakerSummary[];
export interface ListSpeakersResponse {
  SpeakerSummaries?: SpeakerSummary[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListWatchlistsRequest {
  DomainId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface WatchlistSummary {
  DomainId?: string;
  WatchlistId?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DefaultWatchlist?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type WatchlistSummaries = WatchlistSummary[];
export interface ListWatchlistsResponse {
  WatchlistSummaries?: WatchlistSummary[];
  NextToken?: string;
}
export interface OptOutSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export interface OptOutSpeakerResponse {
  Speaker?: Speaker;
}
export interface StartFraudsterRegistrationJobRequest {
  ClientToken?: string;
  JobName?: string | redacted.Redacted<string>;
  DomainId: string;
  DataAccessRoleArn: string;
  RegistrationConfig?: RegistrationConfig;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
}
export interface StartFraudsterRegistrationJobResponse {
  Job?: FraudsterRegistrationJob;
}
export interface StartSpeakerEnrollmentJobRequest {
  ClientToken?: string;
  JobName?: string | redacted.Redacted<string>;
  DomainId: string;
  DataAccessRoleArn: string;
  EnrollmentConfig?: EnrollmentConfig;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
}
export interface StartSpeakerEnrollmentJobResponse {
  Job?: SpeakerEnrollmentJob;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateDomainRequest {
  DomainId: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
}
export interface UpdateDomainResponse {
  Domain?: Domain;
}
export interface UpdateWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export interface UpdateWatchlistResponse {
  Watchlist?: Watchlist;
}
export type ConflictType = string;
export type ResourceType = string;
export type AssociateFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the fraudsters with the watchlist specified in the same domain.
 */
export const associateFraudster: API.OperationMethod<
  AssociateFraudsterRequest,
  AssociateFraudsterResponse,
  AssociateFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, WatchlistId: 0, FraudsterId: 0 },
    output: { Fraudster: o_Fraudster },
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
  operationName: "AssociateFraudster",
})) as any;

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain that contains all Amazon Connect Voice ID data, such as speakers, fraudsters,
 * customer audio, and voiceprints. Every domain is created with a default watchlist that fraudsters can be a part of.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ServerSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Domain: o_Domain },
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
  operationName: "CreateDomain",
})) as any;

export type CreateWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a watchlist that fraudsters can be a part of.
 */
export const createWatchlist: API.OperationMethod<
  CreateWatchlistRequest,
  CreateWatchlistResponse,
  CreateWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      Name: 0,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { Watchlist: o_Watchlist },
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
  operationName: "CreateWatchlist",
})) as any;

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified domain from Voice ID.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0 } },
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
  operationName: "DeleteDomain",
})) as any;

export type DeleteFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified fraudster from Voice ID. This action disassociates the fraudster from any watchlists it is a part of.
 */
export const deleteFraudster: API.OperationMethod<
  DeleteFraudsterRequest,
  DeleteFraudsterResponse,
  DeleteFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0, FraudsterId: 0 } },
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
  operationName: "DeleteFraudster",
})) as any;

export type DeleteSpeakerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified speaker from Voice ID.
 */
export const deleteSpeaker: API.OperationMethod<
  DeleteSpeakerRequest,
  DeleteSpeakerResponse,
  DeleteSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0, SpeakerId: 0 } },
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
  operationName: "DeleteSpeaker",
})) as any;

export type DeleteWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified watchlist from Voice ID. This API throws an exception when
 * there are fraudsters in the watchlist that you are trying to delete. You must delete the
 * fraudsters, and then delete the watchlist. Every domain has a default watchlist which cannot be deleted.
 */
export const deleteWatchlist: API.OperationMethod<
  DeleteWatchlistRequest,
  DeleteWatchlistResponse,
  DeleteWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0, WatchlistId: 0 } },
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
  operationName: "DeleteWatchlist",
})) as any;

export type DescribeDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified domain.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResponse,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0 },
    output: { Domain: o_Domain },
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
  operationName: "DescribeDomain",
})) as any;

export type DescribeFraudsterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified fraudster.
 */
export const describeFraudster: API.OperationMethod<
  DescribeFraudsterRequest,
  DescribeFraudsterResponse,
  DescribeFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, FraudsterId: 0 },
    output: { Fraudster: o_Fraudster },
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
  operationName: "DescribeFraudster",
})) as any;

export type DescribeFraudsterRegistrationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified fraudster registration job.
 */
export const describeFraudsterRegistrationJob: API.OperationMethod<
  DescribeFraudsterRegistrationJobRequest,
  DescribeFraudsterRegistrationJobResponse,
  DescribeFraudsterRegistrationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, JobId: 0 },
    output: { Job: o_FraudsterRegistrationJob },
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
  operationName: "DescribeFraudsterRegistrationJob",
})) as any;

export type DescribeSpeakerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified speaker.
 */
export const describeSpeaker: API.OperationMethod<
  DescribeSpeakerRequest,
  DescribeSpeakerResponse,
  DescribeSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, SpeakerId: 0 },
    output: { Speaker: o_Speaker },
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
  operationName: "DescribeSpeaker",
})) as any;

export type DescribeSpeakerEnrollmentJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified speaker enrollment job.
 */
export const describeSpeakerEnrollmentJob: API.OperationMethod<
  DescribeSpeakerEnrollmentJobRequest,
  DescribeSpeakerEnrollmentJobResponse,
  DescribeSpeakerEnrollmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, JobId: 0 },
    output: { Job: o_SpeakerEnrollmentJob },
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
  operationName: "DescribeSpeakerEnrollmentJob",
})) as any;

export type DescribeWatchlistError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified watchlist.
 */
export const describeWatchlist: API.OperationMethod<
  DescribeWatchlistRequest,
  DescribeWatchlistResponse,
  DescribeWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, WatchlistId: 0 },
    output: { Watchlist: o_Watchlist },
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
  operationName: "DescribeWatchlist",
})) as any;

export type DisassociateFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the fraudsters from the watchlist specified. Voice ID always expects a
 * fraudster to be a part of at least one watchlist. If
 * you try to disassociate a fraudster from its only watchlist, a `ValidationException` is thrown.
 */
export const disassociateFraudster: API.OperationMethod<
  DisassociateFraudsterRequest,
  DisassociateFraudsterResponse,
  DisassociateFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, WatchlistId: 0, FraudsterId: 0 },
    output: { Fraudster: o_Fraudster },
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
  operationName: "DisassociateFraudster",
})) as any;

export type EvaluateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates a specified session based on audio data accumulated during a streaming
 * Amazon Connect Voice ID call.
 */
export const evaluateSession: API.OperationMethod<
  EvaluateSessionRequest,
  EvaluateSessionResponse,
  EvaluateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, SessionNameOrId: 0 },
    output: {
      AuthenticationResult: {
        AudioAggregationStartedAt: D.ts,
        AudioAggregationEndedAt: D.ts,
        CustomerSpeakerId: D.secret,
      },
      FraudDetectionResult: {
        AudioAggregationStartedAt: D.ts,
        AudioAggregationEndedAt: D.ts,
      },
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
  operationName: "EvaluateSession",
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the domains in the Amazon Web Services account.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: {
      DomainSummaries: D.list({
        Name: D.secret,
        Description: D.secret,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
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
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFraudsterRegistrationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the fraudster registration jobs in the domain with the given
 * `JobStatus`. If `JobStatus` is not provided, this lists all
 * fraudster registration jobs in the given domain.
 */
export const listFraudsterRegistrationJobs: API.PaginatedOperationMethod<
  ListFraudsterRegistrationJobsRequest,
  ListFraudsterRegistrationJobsResponse,
  ListFraudsterRegistrationJobsError,
  Credentials | HttpClient.HttpClient,
  FraudsterRegistrationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, JobStatus: 0, MaxResults: 0, NextToken: 0 },
    output: {
      JobSummaries: D.list({
        JobName: D.secret,
        CreatedAt: D.ts,
        EndedAt: D.ts,
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
  operationName: "ListFraudsterRegistrationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFraudstersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all fraudsters in a specified watchlist or domain.
 */
export const listFraudsters: API.PaginatedOperationMethod<
  ListFraudstersRequest,
  ListFraudstersResponse,
  ListFraudstersError,
  Credentials | HttpClient.HttpClient,
  FraudsterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, WatchlistId: 0, MaxResults: 0, NextToken: 0 },
    output: { FraudsterSummaries: D.list({ CreatedAt: D.ts }) },
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
  operationName: "ListFraudsters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FraudsterSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSpeakerEnrollmentJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the speaker enrollment jobs in the domain with the specified
 * `JobStatus`. If `JobStatus` is not provided, this lists all
 * jobs with all possible speaker enrollment job statuses.
 */
export const listSpeakerEnrollmentJobs: API.PaginatedOperationMethod<
  ListSpeakerEnrollmentJobsRequest,
  ListSpeakerEnrollmentJobsResponse,
  ListSpeakerEnrollmentJobsError,
  Credentials | HttpClient.HttpClient,
  SpeakerEnrollmentJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, JobStatus: 0, MaxResults: 0, NextToken: 0 },
    output: {
      JobSummaries: D.list({
        JobName: D.secret,
        CreatedAt: D.ts,
        EndedAt: D.ts,
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
  operationName: "ListSpeakerEnrollmentJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSpeakersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all speakers in a specified domain.
 */
export const listSpeakers: API.PaginatedOperationMethod<
  ListSpeakersRequest,
  ListSpeakersResponse,
  ListSpeakersError,
  Credentials | HttpClient.HttpClient,
  SpeakerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      SpeakerSummaries: D.list({
        CustomerSpeakerId: D.secret,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
        LastAccessedAt: D.ts,
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
  operationName: "ListSpeakers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SpeakerSummaries",
    pageSize: "MaxResults",
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
 * Lists all tags associated with a specified Voice ID resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
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

export type ListWatchlistsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all watchlists in a specified domain.
 */
export const listWatchlists: API.PaginatedOperationMethod<
  ListWatchlistsRequest,
  ListWatchlistsResponse,
  ListWatchlistsError,
  Credentials | HttpClient.HttpClient,
  WatchlistSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      WatchlistSummaries: D.list({
        Name: D.secret,
        Description: D.secret,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
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
  operationName: "ListWatchlists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WatchlistSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type OptOutSpeakerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Opts out a speaker from Voice ID. A speaker can be opted out regardless of whether or
 * not they already exist in Voice ID. If they don't yet exist, a new speaker is created
 * in an opted out state. If they already exist, their existing status is overridden and
 * they are opted out. Enrollment and evaluation authentication requests are rejected for
 * opted out speakers, and opted out speakers have no voice embeddings stored in
 * Voice ID.
 */
export const optOutSpeaker: API.OperationMethod<
  OptOutSpeakerRequest,
  OptOutSpeakerResponse,
  OptOutSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, SpeakerId: 0 },
    output: { Speaker: o_Speaker },
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
  operationName: "OptOutSpeaker",
})) as any;

export type StartFraudsterRegistrationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new batch fraudster registration job using provided details.
 */
export const startFraudsterRegistrationJob: API.OperationMethod<
  StartFraudsterRegistrationJobRequest,
  StartFraudsterRegistrationJobResponse,
  StartFraudsterRegistrationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      JobName: 0,
      DomainId: 0,
      DataAccessRoleArn: 0,
      RegistrationConfig: {
        DuplicateRegistrationAction: 0,
        FraudsterSimilarityThreshold: 0,
        WatchlistIds: 0,
      },
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
    },
    output: { Job: o_FraudsterRegistrationJob },
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
  operationName: "StartFraudsterRegistrationJob",
})) as any;

export type StartSpeakerEnrollmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new batch speaker enrollment job using specified details.
 */
export const startSpeakerEnrollmentJob: API.OperationMethod<
  StartSpeakerEnrollmentJobRequest,
  StartSpeakerEnrollmentJobResponse,
  StartSpeakerEnrollmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      JobName: 0,
      DomainId: 0,
      DataAccessRoleArn: 0,
      EnrollmentConfig: {
        ExistingEnrollmentAction: 0,
        FraudDetectionConfig: {
          FraudDetectionAction: 0,
          RiskThreshold: 0,
          WatchlistIds: 0,
        },
      },
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
    },
    output: { Job: o_SpeakerEnrollmentJob },
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
  operationName: "StartSpeakerEnrollmentJob",
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
 * Tags a Voice ID resource with the provided list of tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes specified tags from a specified Amazon Connect Voice ID resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
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
  operationName: "UntagResource",
})) as any;

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified domain. This API has clobber behavior, and clears and replaces
 * all attributes. If an optional field, such as 'Description' is not provided, it is
 * removed from the domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainRequest,
  UpdateDomainResponse,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      Name: 0,
      Description: 0,
      ServerSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
    },
    output: { Domain: o_Domain },
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
  operationName: "UpdateDomain",
})) as any;

export type UpdateWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified watchlist. Every domain has a default watchlist which cannot be updated.
 */
export const updateWatchlist: API.OperationMethod<
  UpdateWatchlistRequest,
  UpdateWatchlistResponse,
  UpdateWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, WatchlistId: 0, Name: 0, Description: 0 },
    output: { Watchlist: o_Watchlist },
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
  operationName: "UpdateWatchlist",
})) as any;

const i_InputDataConfig: D.LazyStruct = () => ({ S3Uri: 0 });
const i_OutputDataConfig: D.LazyStruct = () => ({ S3Uri: 0, KmsKeyId: 0 });
const i_ServerSideEncryptionConfiguration: D.LazyStruct = () => ({
  KmsKeyId: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Domain: D.LazyStruct = () => ({
  Name: D.secret,
  Description: D.secret,
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
const o_Fraudster: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_FraudsterRegistrationJob: D.LazyStruct = () => ({
  JobName: D.secret,
  CreatedAt: D.ts,
  EndedAt: D.ts,
});
const o_Speaker: D.LazyStruct = () => ({
  CustomerSpeakerId: D.secret,
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
  LastAccessedAt: D.ts,
});
const o_SpeakerEnrollmentJob: D.LazyStruct = () => ({
  JobName: D.secret,
  CreatedAt: D.ts,
  EndedAt: D.ts,
});
const o_Watchlist: D.LazyStruct = () => ({
  Name: D.secret,
  Description: D.secret,
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
