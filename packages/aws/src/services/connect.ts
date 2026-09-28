import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Connect",
  target: "AmazonConnectService",
  version: "2017-08-08",
  sigv4: "connect",
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
                `https://connect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://connect.${Region}.amazonaws.com`);
              }
              return e(
                `https://connect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConditionalOperationFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConditionalOperationFailedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ContactFlowNotPublishedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContactFlowNotPublishedException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ContactNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContactNotFoundException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class ContactNotTerminatedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContactNotTerminatedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class DestinationNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DestinationNotAllowedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class DuplicateResourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateResourceException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class IdempotencyException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotencyException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidActiveRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidActiveRegionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidContactFlowException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidContactFlowException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly problems?: ProblemDetail[]; readonly message?: string }> {}
export class InvalidContactFlowModuleException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidContactFlowModuleException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Problems?: ProblemDetail[]; readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: InvalidRequestExceptionReason;
  }> {}
export class InvalidTestCaseException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTestCaseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Problems?: ProblemDetail[]; readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class MaximumResultReturnedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumResultReturnedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OutboundContactNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OutboundContactNotPermittedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class OutputTypeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OutputTypeNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class PropertyValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "PropertyValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly PropertyList?: PropertyValidationExceptionProperty[];
  }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message?: string;
    readonly ResourceType?: ResourceType;
    readonly ResourceId?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotReadyException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly Reason?: ServiceQuotaExceededExceptionReason;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UserNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type InstanceId = string;
export type ResourceId = string;
export type VersionNumber = number;
export interface ActivateEvaluationFormRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
}
export type ARN = string;
export interface ActivateEvaluationFormResponse {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  EvaluationFormVersion: number;
}
export type DataSetId = string;
export type AWSAccountId = string;
export interface AssociateAnalyticsDataSetRequest {
  InstanceId: string;
  DataSetId: string;
  TargetAccountId?: string;
}
export interface AssociateAnalyticsDataSetResponse {
  DataSetId?: string;
  TargetAccountId?: string;
  ResourceShareId?: string;
  ResourceShareArn?: string;
}
export type Origin = string;
export type ClientToken = string;
export interface AssociateApprovedOriginRequest {
  InstanceId: string;
  Origin: string;
  ClientToken?: string;
}
export interface AssociateApprovedOriginResponse {}
export type BotName = string;
export type LexRegion = string;
export interface LexBot {
  Name: string;
  LexRegion: string;
}
export type AliasArn = string;
export interface LexV2Bot {
  AliasArn?: string;
}
export interface AssociateBotRequest {
  InstanceId: string;
  LexBot?: LexBot;
  LexV2Bot?: LexV2Bot;
  ClientToken?: string;
}
export interface AssociateBotResponse {}
export type ContactId = string;
export type AgentResourceId = string;
export interface AssociateContactWithUserRequest {
  InstanceId: string;
  ContactId: string;
  UserId: string;
}
export interface AssociateContactWithUserResponse {}
export type VocabularyLanguageCode =
  | "ar-AE"
  | "de-CH"
  | "de-DE"
  | "en-AB"
  | "en-AU"
  | "en-GB"
  | "en-IE"
  | "en-IN"
  | "en-US"
  | "en-WL"
  | "es-ES"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "hi-IN"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | "pt-BR"
  | "pt-PT"
  | "zh-CN"
  | "en-NZ"
  | "en-ZA"
  | "ca-ES"
  | "da-DK"
  | "fi-FI"
  | "id-ID"
  | "ms-MY"
  | "nl-NL"
  | "no-NO"
  | "pl-PL"
  | "sv-SE"
  | "tl-PH"
  | (string & {});
export type VocabularyId = string;
export interface AssociateDefaultVocabularyRequest {
  InstanceId: string;
  LanguageCode: VocabularyLanguageCode;
  VocabularyId?: string;
}
export interface AssociateDefaultVocabularyResponse {}
export type EmailAddressId = string;
export interface AliasConfiguration {
  EmailAddressId: string;
}
export interface AssociateEmailAddressAliasRequest {
  EmailAddressId: string;
  InstanceId: string;
  AliasConfiguration: AliasConfiguration;
  ClientToken?: string;
}
export interface AssociateEmailAddressAliasResponse {}
export type FlowAssociationResourceType =
  | "SMS_PHONE_NUMBER"
  | "INBOUND_EMAIL"
  | "OUTBOUND_EMAIL"
  | "ANALYTICS_CONNECTOR"
  | "WHATSAPP_MESSAGING_PHONE_NUMBER"
  | (string & {});
export interface AssociateFlowRequest {
  InstanceId: string;
  ResourceId: string;
  FlowId: string;
  ResourceType: FlowAssociationResourceType;
}
export interface AssociateFlowResponse {}
export type HoursOfOperationId = string;
export interface ParentHoursOfOperationConfig {
  HoursOfOperationId?: string;
}
export type ParentHoursOfOperationConfigList = ParentHoursOfOperationConfig[];
export interface AssociateHoursOfOperationsRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  ParentHoursOfOperationConfigs: ParentHoursOfOperationConfig[];
}
export interface AssociateHoursOfOperationsResponse {}
export type InstanceStorageResourceType =
  | "CHAT_TRANSCRIPTS"
  | "CALL_RECORDINGS"
  | "SCHEDULED_REPORTS"
  | "MEDIA_STREAMS"
  | "CONTACT_TRACE_RECORDS"
  | "AGENT_EVENTS"
  | "REAL_TIME_CONTACT_ANALYSIS_SEGMENTS"
  | "ATTACHMENTS"
  | "CONTACT_EVALUATIONS"
  | "SCREEN_RECORDINGS"
  | "REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS"
  | "REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS"
  | "EMAIL_MESSAGES"
  | (string & {});
export type AssociationId = string;
export type StorageType =
  | "S3"
  | "KINESIS_VIDEO_STREAM"
  | "KINESIS_STREAM"
  | "KINESIS_FIREHOSE"
  | (string & {});
export type BucketName = string;
export type Prefix = string;
export type EncryptionType = "KMS" | (string & {});
export type KeyId = string;
export interface EncryptionConfig {
  EncryptionType: EncryptionType;
  KeyId: string;
}
export interface S3Config {
  BucketName: string;
  BucketPrefix: string;
  EncryptionConfig?: EncryptionConfig;
}
export type Hours = number;
export interface KinesisVideoStreamConfig {
  Prefix: string;
  RetentionPeriodHours: number;
  EncryptionConfig: EncryptionConfig;
}
export interface KinesisStreamConfig {
  StreamArn: string;
}
export interface KinesisFirehoseConfig {
  FirehoseArn: string;
}
export interface InstanceStorageConfig {
  AssociationId?: string;
  StorageType: StorageType;
  S3Config?: S3Config;
  KinesisVideoStreamConfig?: KinesisVideoStreamConfig;
  KinesisStreamConfig?: KinesisStreamConfig;
  KinesisFirehoseConfig?: KinesisFirehoseConfig;
}
export interface AssociateInstanceStorageConfigRequest {
  InstanceId: string;
  ResourceType: InstanceStorageResourceType;
  StorageConfig: InstanceStorageConfig;
  ClientToken?: string;
}
export interface AssociateInstanceStorageConfigResponse {
  AssociationId?: string;
}
export type FunctionArn = string;
export interface AssociateLambdaFunctionRequest {
  InstanceId: string;
  FunctionArn: string;
  ClientToken?: string;
}
export interface AssociateLambdaFunctionResponse {}
export interface AssociateLexBotRequest {
  InstanceId: string;
  LexBot: LexBot;
  ClientToken?: string;
}
export interface AssociateLexBotResponse {}
export type PhoneNumberId = string;
export type ContactFlowId = string;
export interface AssociatePhoneNumberContactFlowRequest {
  PhoneNumberId: string;
  InstanceId: string;
  ContactFlowId: string;
}
export interface AssociatePhoneNumberContactFlowResponse {}
export type QueueId = string;
export interface EmailAddressConfig {
  EmailAddressId: string;
}
export type EmailAddressConfigList = EmailAddressConfig[];
export interface AssociateQueueEmailAddressesRequest {
  InstanceId: string;
  QueueId: string;
  EmailAddressesConfig: EmailAddressConfig[];
  ClientToken?: string;
}
export interface AssociateQueueEmailAddressesResponse {}
export type QuickConnectId = string;
export type QuickConnectsList = string[];
export interface AssociateQueueQuickConnectsRequest {
  InstanceId: string;
  QueueId: string;
  QuickConnectIds: string[];
}
export interface AssociateQueueQuickConnectsResponse {}
export type RoutingProfileId = string;
export type Channel = "VOICE" | "CHAT" | "TASK" | "EMAIL" | (string & {});
export interface RoutingProfileQueueReference {
  QueueId: string;
  Channel: Channel;
}
export type Priority = number;
export type Delay = number;
export interface RoutingProfileQueueConfig {
  QueueReference: RoutingProfileQueueReference;
  Priority: number;
  Delay: number;
}
export type RoutingProfileQueueConfigList = RoutingProfileQueueConfig[];
export interface RoutingProfileManualAssignmentQueueConfig {
  QueueReference: RoutingProfileQueueReference;
}
export type RoutingProfileManualAssignmentQueueConfigList =
  RoutingProfileManualAssignmentQueueConfig[];
export interface AssociateRoutingProfileQueuesRequest {
  InstanceId: string;
  RoutingProfileId: string;
  QueueConfigs?: RoutingProfileQueueConfig[];
  ManualAssignmentQueueConfigs?: RoutingProfileManualAssignmentQueueConfig[];
}
export interface AssociateRoutingProfileQueuesResponse {}
export type PEM = string;
export interface AssociateSecurityKeyRequest {
  InstanceId: string;
  Key: string;
  ClientToken?: string;
}
export interface AssociateSecurityKeyResponse {
  AssociationId?: string;
}
export type SecurityProfileId = string;
export interface SecurityProfileItem {
  Id?: string;
}
export type SecurityProfiles = SecurityProfileItem[];
export type EntityType = "USER" | "AI_AGENT" | (string & {});
export type EntityArn = string;
export interface AssociateSecurityProfilesRequest {
  InstanceId: string;
  SecurityProfiles: SecurityProfileItem[];
  EntityType: EntityType;
  EntityArn: string;
}
export interface AssociateSecurityProfilesResponse {}
export type TrafficDistributionGroupIdOrArn = string;
export type UserId = string;
export interface AssociateTrafficDistributionGroupUserRequest {
  TrafficDistributionGroupId: string;
  UserId: string;
  InstanceId: string;
}
export interface AssociateTrafficDistributionGroupUserResponse {}
export type PredefinedAttributeName = string;
export type PredefinedAttributeStringValue = string;
export type ProficiencyLevel = number;
export interface UserProficiency {
  AttributeName: string;
  AttributeValue: string;
  Level: number;
}
export type UserProficiencyList = UserProficiency[];
export interface AssociateUserProficienciesRequest {
  InstanceId: string;
  UserId: string;
  UserProficiencies: UserProficiency[];
}
export interface AssociateUserProficienciesResponse {}
export type WorkspaceId = string;
export type WorkspaceResourceArnList = string[];
export interface AssociateWorkspaceRequest {
  InstanceId: string;
  WorkspaceId: string;
  ResourceArns: string[];
}
export interface SuccessfulBatchAssociationSummary {
  ResourceArn?: string;
}
export type SuccessfulBatchAssociationSummaryList =
  SuccessfulBatchAssociationSummary[];
export type WorkspaceErrorCode = string;
export type WorkspaceBatchErrorMessage = string;
export interface FailedBatchAssociationSummary {
  ResourceArn?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type FailedBatchAssociationSummaryList = FailedBatchAssociationSummary[];
export interface AssociateWorkspaceResponse {
  SuccessfulList?: SuccessfulBatchAssociationSummary[];
  FailedList?: FailedBatchAssociationSummary[];
}
export type DataSetIds = string[];
export interface BatchAssociateAnalyticsDataSetRequest {
  InstanceId: string;
  DataSetIds: string[];
  TargetAccountId?: string;
}
export interface AnalyticsDataAssociationResult {
  DataSetId?: string;
  TargetAccountId?: string;
  ResourceShareId?: string;
  ResourceShareArn?: string;
  ResourceShareStatus?: string;
}
export type AnalyticsDataAssociationResults = AnalyticsDataAssociationResult[];
export interface ErrorResult {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type ErrorResults = ErrorResult[];
export interface BatchAssociateAnalyticsDataSetResponse {
  Created?: AnalyticsDataAssociationResult[];
  Errors?: ErrorResult[];
}
export type DataTableId = string;
export type DataTableName = string;
export interface PrimaryValue {
  AttributeName: string;
  Value: string;
}
export type PrimaryValuesSet = PrimaryValue[];
export interface DataTableLockVersion {
  DataTable?: string;
  Attribute?: string;
  PrimaryValues?: string;
  Value?: string;
}
export type RegionName = string;
export interface DataTableValue {
  PrimaryValues?: PrimaryValue[];
  AttributeName: string;
  Value: string;
  LockVersion?: DataTableLockVersion;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type DataTableValueList = DataTableValue[];
export interface BatchCreateDataTableValueRequest {
  InstanceId: string;
  DataTableId: string;
  Values: DataTableValue[];
}
export interface BatchCreateDataTableValueSuccessResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  RecordId: string;
  LockVersion: DataTableLockVersion;
}
export type BatchCreateDataTableValueSuccessResultList =
  BatchCreateDataTableValueSuccessResult[];
export interface BatchCreateDataTableValueFailureResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  Message: string;
}
export type BatchCreateDataTableValueFailureResultList =
  BatchCreateDataTableValueFailureResult[];
export interface BatchCreateDataTableValueResponse {
  Successful: BatchCreateDataTableValueSuccessResult[];
  Failed: BatchCreateDataTableValueFailureResult[];
}
export interface DataTableDeleteValueIdentifier {
  PrimaryValues?: PrimaryValue[];
  AttributeName: string;
  LockVersion: DataTableLockVersion;
}
export type DataTableDeleteValueIdentifierList =
  DataTableDeleteValueIdentifier[];
export interface BatchDeleteDataTableValueRequest {
  InstanceId: string;
  DataTableId: string;
  Values: DataTableDeleteValueIdentifier[];
}
export interface BatchDeleteDataTableValueSuccessResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  LockVersion: DataTableLockVersion;
}
export type BatchDeleteDataTableValueSuccessResultList =
  BatchDeleteDataTableValueSuccessResult[];
export interface BatchDeleteDataTableValueFailureResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  Message: string;
}
export type BatchDeleteDataTableValueFailureResultList =
  BatchDeleteDataTableValueFailureResult[];
export interface BatchDeleteDataTableValueResponse {
  Successful: BatchDeleteDataTableValueSuccessResult[];
  Failed: BatchDeleteDataTableValueFailureResult[];
}
export interface DataTableValueIdentifier {
  PrimaryValues?: PrimaryValue[];
  AttributeName: string;
}
export type DataTableValueIdentifierList = DataTableValueIdentifier[];
export interface BatchDescribeDataTableValueRequest {
  InstanceId: string;
  DataTableId: string;
  Values: DataTableValueIdentifier[];
}
export interface PrimaryValueResponse {
  AttributeName?: string;
  AttributeId?: string;
  Value?: string;
}
export type PrimaryValuesResponseSet = PrimaryValueResponse[];
export interface BatchDescribeDataTableValueSuccessResult {
  RecordId: string;
  AttributeId: string;
  PrimaryValues: PrimaryValueResponse[];
  AttributeName: string;
  Value?: string;
  LockVersion: DataTableLockVersion;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type BatchDescribeDataTableValueSuccessResultList =
  BatchDescribeDataTableValueSuccessResult[];
export interface BatchDescribeDataTableValueFailureResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  Message: string;
}
export type BatchDescribeDataTableValueFailureResultList =
  BatchDescribeDataTableValueFailureResult[];
export interface BatchDescribeDataTableValueResponse {
  Successful: BatchDescribeDataTableValueSuccessResult[];
  Failed: BatchDescribeDataTableValueFailureResult[];
}
export interface BatchDisassociateAnalyticsDataSetRequest {
  InstanceId: string;
  DataSetIds: string[];
  TargetAccountId?: string;
}
export interface BatchDisassociateAnalyticsDataSetResponse {
  Deleted?: string[];
  Errors?: ErrorResult[];
}
export type FileId = string;
export type FileIdList = string[];
export interface BatchGetAttachedFileMetadataRequest {
  FileIds: string[];
  InstanceId: string;
  AssociatedResourceArn: string;
}
export type ISO8601Datetime = string;
export type FileName = string;
export type FileSizeInBytes = number;
export type FileStatusType =
  | "APPROVED"
  | "REJECTED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export type CreatedByInfo =
  | { ConnectUserArn: string; AWSIdentityArn?: never }
  | { ConnectUserArn?: never; AWSIdentityArn: string };
export type FileUseCaseType =
  | "CONTACT_ANALYSIS"
  | "EMAIL_MESSAGE"
  | "EMAIL_MESSAGE_PLAIN_TEXT"
  | "EMAIL_MESSAGE_REDACTED"
  | "EMAIL_MESSAGE_PLAIN_TEXT_REDACTED"
  | "ATTACHMENT"
  | "VOICE_RECORDING"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface AttachedFile {
  CreationTime: string;
  FileArn: string;
  FileId: string;
  FileName: string;
  FileSizeInBytes: number;
  FileStatus: FileStatusType;
  CreatedBy?: CreatedByInfo;
  FileUseCaseType?: FileUseCaseType;
  AssociatedResourceArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export type AttachedFilesList = AttachedFile[];
export type ErrorCode = string;
export type ErrorMessage = string;
export interface AttachedFileError {
  ErrorCode?: string;
  ErrorMessage?: string;
  FileId?: string;
}
export type AttachedFileErrorsList = AttachedFileError[];
export interface BatchGetAttachedFileMetadataResponse {
  Files?: AttachedFile[];
  Errors?: AttachedFileError[];
}
export type ResourceArnListMaxLimit100 = string[];
export type ListFlowAssociationResourceType =
  | "WHATSAPP_MESSAGING_PHONE_NUMBER"
  | "VOICE_PHONE_NUMBER"
  | "INBOUND_EMAIL"
  | "OUTBOUND_EMAIL"
  | "ANALYTICS_CONNECTOR"
  | (string & {});
export interface BatchGetFlowAssociationRequest {
  InstanceId: string;
  ResourceIds: string[];
  ResourceType?: ListFlowAssociationResourceType;
}
export interface FlowAssociationSummary {
  ResourceId?: string;
  FlowId?: string;
  ResourceType?: ListFlowAssociationResourceType;
}
export type FlowAssociationSummaryList = FlowAssociationSummary[];
export interface BatchGetFlowAssociationResponse {
  FlowAssociationSummaryList?: FlowAssociationSummary[];
}
export type EndpointType =
  | "TELEPHONE_NUMBER"
  | "VOIP"
  | "CONTACT_FLOW"
  | "CONNECT_PHONENUMBER_ARN"
  | "EMAIL_ADDRESS"
  | (string & {});
export type EndpointAddress = string;
export interface Endpoint {
  Type?: EndpointType;
  Address?: string;
}
export type RequestIdentifier = string;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export type CampaignId = string;
export interface Campaign {
  CampaignId?: string;
}
export type OutboundStrategyType = "AGENT_FIRST" | (string & {});
export type PostAcceptPreviewTimeoutDurationInSeconds = number;
export interface PostAcceptTimeoutConfig {
  DurationInSeconds: number;
}
export type AllowedUserAction = "CALL" | "DISCARD" | (string & {});
export type AllowedUserActions = AllowedUserAction[];
export interface Preview {
  PostAcceptTimeoutConfig: PostAcceptTimeoutConfig;
  AllowedUserActions: AllowedUserAction[];
}
export interface AgentFirst {
  Preview?: Preview;
}
export interface OutboundStrategyConfig {
  AgentFirst?: AgentFirst;
}
export interface OutboundStrategy {
  Type: OutboundStrategyType;
  Config?: OutboundStrategyConfig;
}
export interface ContactDataRequest {
  SystemEndpoint?: Endpoint;
  CustomerEndpoint?: Endpoint;
  RequestIdentifier?: string;
  QueueId?: string;
  Attributes?: { [key: string]: string | undefined };
  Campaign?: Campaign;
  OutboundStrategy?: OutboundStrategy;
}
export type ContactDataRequestList = ContactDataRequest[];
export interface BatchPutContactRequest {
  ClientToken?: string;
  InstanceId: string;
  ContactDataRequestList: ContactDataRequest[];
}
export interface SuccessfulRequest {
  RequestIdentifier?: string;
  ContactId?: string;
}
export type SuccessfulRequestList = SuccessfulRequest[];
export type FailureReasonCode =
  | "INVALID_ATTRIBUTE_KEY"
  | "INVALID_CUSTOMER_ENDPOINT"
  | "INVALID_SYSTEM_ENDPOINT"
  | "INVALID_QUEUE"
  | "INVALID_OUTBOUND_STRATEGY"
  | "MISSING_CAMPAIGN"
  | "MISSING_CUSTOMER_ENDPOINT"
  | "MISSING_QUEUE_ID_AND_SYSTEM_ENDPOINT"
  | "REQUEST_THROTTLED"
  | "IDEMPOTENCY_EXCEPTION"
  | "INTERNAL_ERROR"
  | (string & {});
export interface FailedRequest {
  RequestIdentifier?: string;
  FailureReasonCode?: FailureReasonCode;
  FailureReasonMessage?: string;
}
export type FailedRequestList = FailedRequest[];
export interface BatchPutContactResponse {
  SuccessfulRequestList?: SuccessfulRequest[];
  FailedRequestList?: FailedRequest[];
}
export interface BatchUpdateDataTableValueRequest {
  InstanceId: string;
  DataTableId: string;
  Values: DataTableValue[];
}
export interface BatchUpdateDataTableValueSuccessResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  LockVersion: DataTableLockVersion;
}
export type BatchUpdateDataTableValueSuccessResultList =
  BatchUpdateDataTableValueSuccessResult[];
export interface BatchUpdateDataTableValueFailureResult {
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  Message: string;
}
export type BatchUpdateDataTableValueFailureResultList =
  BatchUpdateDataTableValueFailureResult[];
export interface BatchUpdateDataTableValueResponse {
  Successful: BatchUpdateDataTableValueSuccessResult[];
  Failed: BatchUpdateDataTableValueFailureResult[];
}
export type PhoneNumber = string;
export type PhoneNumberDescription = string;
export interface ClaimPhoneNumberRequest {
  TargetArn?: string;
  InstanceId?: string;
  PhoneNumber: string;
  PhoneNumberDescription?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface ClaimPhoneNumberResponse {
  PhoneNumberId?: string;
  PhoneNumberArn?: string;
}
export interface CompleteAttachedFileUploadRequest {
  InstanceId: string;
  FileId: string;
  AssociatedResourceArn: string;
}
export interface CompleteAttachedFileUploadResponse {}
export type AgentStatusName = string;
export type AgentStatusDescription = string;
export type AgentStatusState = "ENABLED" | "DISABLED" | (string & {});
export type AgentStatusOrderNumber = number;
export interface CreateAgentStatusRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  State: AgentStatusState;
  DisplayOrder?: number;
  Tags?: { [key: string]: string | undefined };
}
export type AgentStatusId = string;
export interface CreateAgentStatusResponse {
  AgentStatusARN?: string;
  AgentStatusId?: string;
}
export type FileSourceUri = string;
export interface CreateAttachedFileRequest {
  ClientToken?: string;
  InstanceId: string;
  FileUseCaseType: FileUseCaseType;
  FileSourceUri: string;
  AssociatedResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateAttachedFileResponse {
  FileArn?: string;
  FileId?: string;
  CreationTime?: string;
  FileStatus?: FileStatusType;
}
export type SecurityProfileIds = string[];
export type AuthCodeEntityType = "CUSTOMER_PROFILE" | (string & {});
export type EntityId = string;
export type CustomerProfilesDomainName = string;
export interface AuthScope {
  SecurityProfileIds?: string[];
  EntityType: AuthCodeEntityType;
  EntityId?: string;
  DomainName?: string;
}
export type MaxSessionDurationMinutes = number;
export type SessionInactivityDurationMinutes = number;
export interface CreateAuthCodeRequest {
  InstanceId: string;
  Scope: AuthScope;
  MaxSessionDurationMinutes?: number;
  SessionInactivityDurationMinutes: number;
}
export type AuthCode = string | redacted.Redacted<string>;
export type SessionId = string;
export interface CreateAuthCodeResponse {
  AuthCode?: string | redacted.Redacted<string>;
  SessionId?: string;
  EntityType?: AuthCodeEntityType;
  EntityId?: string;
}
export type ReferenceKey = string;
export type ReferenceValue = string;
export type ReferenceType =
  | "URL"
  | "ATTACHMENT"
  | "CONTACT_ANALYSIS"
  | "NUMBER"
  | "STRING"
  | "DATE"
  | "EMAIL"
  | "EMAIL_MESSAGE"
  | "EMAIL_MESSAGE_PLAIN_TEXT"
  | "EMAIL_MESSAGE_PLAIN_TEXT_REDACTED"
  | "EMAIL_MESSAGE_REDACTED"
  | (string & {});
export type ReferenceStatus =
  | "AVAILABLE"
  | "DELETED"
  | "APPROVED"
  | "REJECTED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export type ReferenceArn = string;
export type ReferenceStatusReason = string;
export interface Reference {
  Value?: string;
  Type: ReferenceType;
  Status?: ReferenceStatus;
  Arn?: string;
  StatusReason?: string;
}
export type ContactReferences = { [key: string]: Reference | undefined };
export type ContactInitiationMethod =
  | "INBOUND"
  | "OUTBOUND"
  | "TRANSFER"
  | "QUEUE_TRANSFER"
  | "CALLBACK"
  | "API"
  | "DISCONNECT"
  | "MONITOR"
  | "EXTERNAL_OUTBOUND"
  | "WEBRTC_API"
  | "AGENT_REPLY"
  | "FLOW"
  | (string & {});
export type ExpiryDurationInMinutes = number;
export interface UserInfo {
  UserId?: string;
}
export type InitiateAs = "CONNECTED_TO_USER" | "COMPLETED" | (string & {});
export type Name = string | redacted.Redacted<string>;
export type Description = string | redacted.Redacted<string>;
export type SegmentAttributeName = string;
export type SegmentAttributeValueString = string;
export type SegmentAttributeValueMap = {
  [key: string]: SegmentAttributeValue | undefined;
};
export type SegmentAttributeValueInteger = number;
export type SegmentAttributeValueList = SegmentAttributeValue[];
export interface SegmentAttributeValue {
  ValueString?: string;
  ValueMap?: { [key: string]: SegmentAttributeValue | undefined };
  ValueInteger?: number;
  ValueList?: SegmentAttributeValue[];
  ValueArn?: string;
}
export type SegmentAttributes = {
  [key: string]: SegmentAttributeValue | undefined;
};
export interface CreateContactRequest {
  InstanceId: string;
  ClientToken?: string;
  RelatedContactId?: string;
  Attributes?: { [key: string]: string | undefined };
  References?: { [key: string]: Reference | undefined };
  Channel: Channel;
  InitiationMethod: ContactInitiationMethod;
  ExpiryDurationInMinutes?: number;
  UserInfo?: UserInfo;
  InitiateAs?: InitiateAs;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  PreviousContactId?: string;
}
export interface CreateContactResponse {
  ContactId?: string;
  ContactArn?: string;
}
export type ContactFlowName = string;
export type ContactFlowType =
  | "CONTACT_FLOW"
  | "CUSTOMER_QUEUE"
  | "CUSTOMER_HOLD"
  | "CUSTOMER_WHISPER"
  | "AGENT_HOLD"
  | "AGENT_WHISPER"
  | "OUTBOUND_WHISPER"
  | "AGENT_TRANSFER"
  | "QUEUE_TRANSFER"
  | "CAMPAIGN"
  | (string & {});
export type ContactFlowDescription = string;
export type ContactFlowContent = string;
export type ContactFlowStatus = "PUBLISHED" | "SAVED" | (string & {});
export interface CreateContactFlowRequest {
  InstanceId: string;
  Name: string;
  Type: ContactFlowType;
  Description?: string;
  Content: string;
  Status?: ContactFlowStatus;
  Tags?: { [key: string]: string | undefined };
}
export type FlowContentSha256 = string;
export interface CreateContactFlowResponse {
  ContactFlowId?: string;
  ContactFlowArn?: string;
  FlowContentSha256?: string;
}
export type ContactFlowModuleName = string;
export type ContactFlowModuleDescription = string;
export type ContactFlowModuleContent = string;
export type FlowModuleSettings = string;
export interface ExternalInvocationConfiguration {
  Enabled?: boolean;
}
export interface CreateContactFlowModuleRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  Content: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  Settings?: string;
  ExternalInvocationConfiguration?: ExternalInvocationConfiguration;
}
export type ContactFlowModuleId = string;
export interface CreateContactFlowModuleResponse {
  Id?: string;
  Arn?: string;
}
export type InstanceIdOrArn = string;
export type ResourceVersion = number;
export type ContactFlowModuleAlias = string;
export interface CreateContactFlowModuleAliasRequest {
  InstanceId: string;
  Description?: string;
  ContactFlowModuleId: string;
  ContactFlowModuleVersion: number;
  AliasName: string;
}
export interface CreateContactFlowModuleAliasResponse {
  ContactFlowModuleArn?: string;
  Id?: string;
}
export type FlowModuleContentSha256 = string;
export interface CreateContactFlowModuleVersionRequest {
  InstanceId: string;
  Description?: string;
  ContactFlowModuleId: string;
  FlowModuleContentSha256?: string;
}
export interface CreateContactFlowModuleVersionResponse {
  ContactFlowModuleArn?: string;
  Version?: number;
}
export interface CreateContactFlowVersionRequest {
  InstanceId: string;
  Description?: string;
  ContactFlowId: string;
  FlowContentSha256?: string;
  ContactFlowVersion?: number;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface CreateContactFlowVersionResponse {
  ContactFlowArn?: string;
  Version?: number;
}
export type DataTableDescription = string;
export type TimeZone = string;
export type DataTableLockLevel =
  | "NONE"
  | "DATA_TABLE"
  | "PRIMARY_VALUE"
  | "ATTRIBUTE"
  | "VALUE"
  | (string & {});
export type DataTableStatus = "PUBLISHED" | (string & {});
export interface CreateDataTableRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  TimeZone: string;
  ValueLockLevel: DataTableLockLevel;
  Status: DataTableStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDataTableResponse {
  Id: string;
  Arn: string;
  LockVersion: DataTableLockVersion;
}
export type DataTableAttributeValueType =
  | "TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "TEXT_LIST"
  | "NUMBER_LIST"
  | (string & {});
export type LengthBoundary = number;
export type ValueBoundary = number;
export type PositiveAndNegativeDouble = number;
export type PositiveDouble = number;
export type ValidationEnumValues = string[];
export interface ValidationEnum {
  Strict?: boolean;
  Values?: string[];
}
export interface Validation {
  MinLength?: number;
  MaxLength?: number;
  MinValues?: number;
  MaxValues?: number;
  IgnoreCase?: boolean;
  Minimum?: number;
  Maximum?: number;
  ExclusiveMinimum?: number;
  ExclusiveMaximum?: number;
  MultipleOf?: number;
  Enum?: ValidationEnum;
}
export interface CreateDataTableAttributeRequest {
  InstanceId: string;
  DataTableId: string;
  Name: string;
  ValueType: DataTableAttributeValueType;
  Description?: string;
  Primary?: boolean;
  Validation?: Validation;
}
export interface CreateDataTableAttributeResponse {
  Name: string;
  AttributeId?: string;
  LockVersion: DataTableLockVersion;
}
export type EmailAddress = string | redacted.Redacted<string>;
export type EmailAddressDisplayName = string | redacted.Redacted<string>;
export interface CreateEmailAddressRequest {
  Description?: string | redacted.Redacted<string>;
  InstanceId: string;
  EmailAddress: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type EmailAddressArn = string;
export interface CreateEmailAddressResponse {
  EmailAddressId?: string;
  EmailAddressArn?: string;
}
export type EvaluationFormTitle = string;
export type EvaluationFormDescription = string;
export type EvaluationFormSectionTitle = string;
export type ReferenceId = string;
export type EvaluationFormQuestionInstructions = string;
export type EvaluationFormItemWeight = number;
export type PerformanceCategoryName =
  | "NEEDS_IMPROVEMENT"
  | "EXCEEDS_EXPECTATIONS"
  | (string & {});
export type EvaluationScorePercentage = number;
export interface EvaluationFormScoreThreshold {
  PerformanceCategory: PerformanceCategoryName;
  MinScorePercentage?: number;
  MaxScorePercentage?: number;
}
export type EvaluationFormScoreThresholdList = EvaluationFormScoreThreshold[];
export interface EvaluationFormSection {
  Title: string;
  RefId: string;
  Instructions?: string;
  Items: EvaluationFormItem[];
  Weight?: number;
  IsExcludedFromScoring?: boolean;
  ScoreThresholds?: EvaluationFormScoreThreshold[];
}
export type EvaluationFormQuestionTitle = string;
export type EvaluationFormQuestionType =
  | "TEXT"
  | "SINGLESELECT"
  | "NUMERIC"
  | "MULTISELECT"
  | "DATETIME"
  | (string & {});
export type EvaluationFormQuestionAnswerScore = number;
export interface AutomaticFailConfiguration {
  TargetSection?: string;
}
export type PointValue = number;
export interface QuestionOptionPointsConfiguration {
  PointValue: number;
  IsBonus?: boolean;
}
export interface EvaluationFormNumericQuestionOption {
  MinValue: number;
  MaxValue: number;
  Score?: number;
  AutomaticFail?: boolean;
  AutomaticFailConfiguration?: AutomaticFailConfiguration;
  PointsConfiguration?: QuestionOptionPointsConfiguration;
}
export type EvaluationFormNumericQuestionOptionList =
  EvaluationFormNumericQuestionOption[];
export type NumericQuestionPropertyAutomationLabel =
  | "OVERALL_CUSTOMER_SENTIMENT_SCORE"
  | "OVERALL_AGENT_SENTIMENT_SCORE"
  | "CUSTOMER_SENTIMENT_SCORE_WITHOUT_AGENT"
  | "CUSTOMER_SENTIMENT_SCORE_WITH_AGENT"
  | "NON_TALK_TIME"
  | "NON_TALK_TIME_PERCENTAGE"
  | "NUMBER_OF_INTERRUPTIONS"
  | "CONTACT_DURATION"
  | "AGENT_INTERACTION_DURATION"
  | "CUSTOMER_HOLD_TIME"
  | "LONGEST_HOLD_DURATION"
  | "NUMBER_OF_HOLDS"
  | "AGENT_INTERACTION_AND_HOLD_DURATION"
  | (string & {});
export interface NumericQuestionPropertyValueAutomation {
  Label: NumericQuestionPropertyAutomationLabel;
}
export type EvaluationFormQuestionAutomationAnswerSourceType =
  | "CONTACT_LENS_DATA"
  | "GEN_AI"
  | (string & {});
export interface EvaluationFormQuestionAutomationAnswerSource {
  SourceType: EvaluationFormQuestionAutomationAnswerSourceType;
}
export type EvaluationFormNumericQuestionAutomation =
  | {
      PropertyValue: NumericQuestionPropertyValueAutomation;
      AnswerSource?: never;
    }
  | {
      PropertyValue?: never;
      AnswerSource: EvaluationFormQuestionAutomationAnswerSource;
    };
export interface EvaluationFormNumericQuestionProperties {
  MinValue: number;
  MaxValue: number;
  Options?: EvaluationFormNumericQuestionOption[];
  Automation?: EvaluationFormNumericQuestionAutomation;
}
export type EvaluationFormSingleSelectQuestionOptionText = string;
export interface EvaluationFormSingleSelectQuestionOption {
  RefId: string;
  Text: string;
  Score?: number;
  AutomaticFail?: boolean;
  AutomaticFailConfiguration?: AutomaticFailConfiguration;
  PointsConfiguration?: QuestionOptionPointsConfiguration;
}
export type EvaluationFormSingleSelectQuestionOptionList =
  EvaluationFormSingleSelectQuestionOption[];
export type EvaluationFormSingleSelectQuestionDisplayMode =
  | "DROPDOWN"
  | "RADIO"
  | (string & {});
export type SingleSelectQuestionRuleCategoryAutomationLabel = string;
export type SingleSelectQuestionRuleCategoryAutomationCondition =
  | "PRESENT"
  | "NOT_PRESENT"
  | (string & {});
export interface SingleSelectQuestionRuleCategoryAutomation {
  Category: string;
  Condition: SingleSelectQuestionRuleCategoryAutomationCondition;
  OptionRefId: string;
}
export type EvaluationFormSingleSelectQuestionAutomationOption = {
  RuleCategory: SingleSelectQuestionRuleCategoryAutomation;
};
export type EvaluationFormSingleSelectQuestionAutomationOptionList =
  EvaluationFormSingleSelectQuestionAutomationOption[];
export interface EvaluationFormSingleSelectQuestionAutomation {
  Options?: EvaluationFormSingleSelectQuestionAutomationOption[];
  DefaultOptionRefId?: string;
  AnswerSource?: EvaluationFormQuestionAutomationAnswerSource;
}
export interface EvaluationFormSingleSelectQuestionProperties {
  Options: EvaluationFormSingleSelectQuestionOption[];
  DisplayAs?: EvaluationFormSingleSelectQuestionDisplayMode;
  Automation?: EvaluationFormSingleSelectQuestionAutomation;
}
export interface EvaluationFormTextQuestionAutomation {
  AnswerSource?: EvaluationFormQuestionAutomationAnswerSource;
}
export interface EvaluationFormTextQuestionProperties {
  Automation?: EvaluationFormTextQuestionAutomation;
}
export type EvaluationFormMultiSelectQuestionOptionText = string;
export interface EvaluationFormMultiSelectQuestionOption {
  RefId: string;
  Text: string;
  Score?: number;
  AutomaticFail?: boolean;
  AutomaticFailConfiguration?: AutomaticFailConfiguration;
  PointsConfiguration?: QuestionOptionPointsConfiguration;
}
export type EvaluationFormMultiSelectQuestionOptionList =
  EvaluationFormMultiSelectQuestionOption[];
export type EvaluationFormMultiSelectQuestionDisplayMode =
  | "DROPDOWN"
  | "CHECKBOX"
  | (string & {});
export type MultiSelectQuestionRuleCategoryAutomationLabel = string;
export type MultiSelectQuestionRuleCategoryAutomationCondition =
  | "PRESENT"
  | "NOT_PRESENT"
  | (string & {});
export type ReferenceIdList = string[];
export interface MultiSelectQuestionRuleCategoryAutomation {
  Category: string;
  Condition: MultiSelectQuestionRuleCategoryAutomationCondition;
  OptionRefIds: string[];
}
export type EvaluationFormMultiSelectQuestionAutomationOption = {
  RuleCategory: MultiSelectQuestionRuleCategoryAutomation;
};
export type EvaluationFormMultiSelectQuestionAutomationOptionList =
  EvaluationFormMultiSelectQuestionAutomationOption[];
export interface EvaluationFormMultiSelectQuestionAutomation {
  Options?: EvaluationFormMultiSelectQuestionAutomationOption[];
  DefaultOptionRefIds?: string[];
  AnswerSource?: EvaluationFormQuestionAutomationAnswerSource;
}
export interface EvaluationFormMultiSelectQuestionProperties {
  Options: EvaluationFormMultiSelectQuestionOption[];
  DisplayAs?: EvaluationFormMultiSelectQuestionDisplayMode;
  Automation?: EvaluationFormMultiSelectQuestionAutomation;
}
export type EvaluationFormQuestionTypeProperties =
  | {
      Numeric: EvaluationFormNumericQuestionProperties;
      SingleSelect?: never;
      Text?: never;
      MultiSelect?: never;
    }
  | {
      Numeric?: never;
      SingleSelect: EvaluationFormSingleSelectQuestionProperties;
      Text?: never;
      MultiSelect?: never;
    }
  | {
      Numeric?: never;
      SingleSelect?: never;
      Text: EvaluationFormTextQuestionProperties;
      MultiSelect?: never;
    }
  | {
      Numeric?: never;
      SingleSelect?: never;
      Text?: never;
      MultiSelect: EvaluationFormMultiSelectQuestionProperties;
    };
export type EvaluationFormItemEnablementSourceType =
  | "QUESTION_REF_ID"
  | (string & {});
export interface EvaluationFormItemEnablementSource {
  Type: EvaluationFormItemEnablementSourceType;
  RefId?: string;
}
export type EvaluationFormItemEnablementSourceValueType =
  | "OPTION_REF_ID"
  | (string & {});
export interface EvaluationFormItemEnablementSourceValue {
  Type: EvaluationFormItemEnablementSourceValueType;
  RefId?: string;
}
export type EvaluationFormItemEnablementSourceValueList =
  EvaluationFormItemEnablementSourceValue[];
export type EvaluationFormItemSourceValuesComparator =
  | "IN"
  | "NOT_IN"
  | "ALL_IN"
  | "EXACT"
  | (string & {});
export interface EvaluationFormItemEnablementExpression {
  Source: EvaluationFormItemEnablementSource;
  Values: EvaluationFormItemEnablementSourceValue[];
  Comparator: EvaluationFormItemSourceValuesComparator;
}
export type EvaluationFormItemEnablementConditionOperand =
  | { Expression: EvaluationFormItemEnablementExpression; Condition?: never }
  | { Expression?: never; Condition: EvaluationFormItemEnablementCondition };
export type EvaluationFormItemEnablementConditionOperandList =
  EvaluationFormItemEnablementConditionOperand[];
export type EvaluationFormItemEnablementOperator = "OR" | "AND" | (string & {});
export interface EvaluationFormItemEnablementCondition {
  Operands: EvaluationFormItemEnablementConditionOperand[];
  Operator?: EvaluationFormItemEnablementOperator;
}
export type EvaluationFormItemEnablementAction =
  | "DISABLE"
  | "ENABLE"
  | (string & {});
export interface EvaluationFormItemEnablementConfiguration {
  Condition: EvaluationFormItemEnablementCondition;
  Action: EvaluationFormItemEnablementAction;
  DefaultAction?: EvaluationFormItemEnablementAction;
}
export interface QuestionPointsConfiguration {
  MaxPointValue?: number;
  MinPointValue?: number;
  IsBonus?: boolean;
}
export interface EvaluationFormQuestionScoringConfiguration {
  PointsConfiguration?: QuestionPointsConfiguration;
  IsExcludedFromScoring?: boolean;
  ScoreThresholds?: EvaluationFormScoreThreshold[];
}
export interface EvaluationFormQuestion {
  Title: string;
  Instructions?: string;
  RefId: string;
  NotApplicableEnabled?: boolean;
  QuestionType: EvaluationFormQuestionType;
  QuestionTypeProperties?: EvaluationFormQuestionTypeProperties;
  Enablement?: EvaluationFormItemEnablementConfiguration;
  Weight?: number;
  ScoringConfiguration?: EvaluationFormQuestionScoringConfiguration;
}
export type EvaluationFormItem =
  | { Section: EvaluationFormSection; Question?: never }
  | { Section?: never; Question: EvaluationFormQuestion };
export type EvaluationFormItemsList = EvaluationFormItem[];
export type EvaluationFormScoringMode =
  | "QUESTION_ONLY"
  | "SECTION_ONLY"
  | "POINTS_BASED"
  | (string & {});
export type EvaluationFormScoringStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface EvaluationFormScoringStrategy {
  Mode: EvaluationFormScoringMode;
  Status: EvaluationFormScoringStatus;
  ScoreThresholds?: EvaluationFormScoreThreshold[];
}
export interface EvaluationFormAutoEvaluationConfiguration {
  Enabled: boolean;
}
export type BoxedBoolean = boolean;
export type EvaluationReviewNotificationRecipientType =
  | "USER_ID"
  | (string & {});
export interface EvaluationReviewNotificationRecipientValue {
  UserId?: string;
}
export interface EvaluationReviewNotificationRecipient {
  Type: EvaluationReviewNotificationRecipientType;
  Value: EvaluationReviewNotificationRecipientValue;
}
export type EvaluationReviewNotificationRecipientList =
  EvaluationReviewNotificationRecipient[];
export interface EvaluationReviewConfiguration {
  ReviewNotificationRecipients: EvaluationReviewNotificationRecipient[];
  EligibilityDays?: number;
}
export type ContactInteractionType =
  | "AGENT"
  | "AUTOMATED"
  | "CUSTOMER"
  | (string & {});
export interface EvaluationFormTargetConfiguration {
  ContactInteractionType: ContactInteractionType;
}
export type EvaluationFormLanguageCode =
  | "de-DE"
  | "en-US"
  | "es-ES"
  | "fr-FR"
  | "it-IT"
  | "pt-BR"
  | "ja-JP"
  | "ko-KR"
  | "zh-CN"
  | "ms-MY"
  | (string & {});
export interface EvaluationFormLanguageConfiguration {
  FormLanguage?: EvaluationFormLanguageCode;
}
export interface CreateEvaluationFormRequest {
  InstanceId: string;
  Title: string;
  Description?: string;
  Items: EvaluationFormItem[];
  ScoringStrategy?: EvaluationFormScoringStrategy;
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  ClientToken?: string;
  AsDraft?: boolean;
  Tags?: { [key: string]: string | undefined };
  ReviewConfiguration?: EvaluationReviewConfiguration;
  TargetConfiguration?: EvaluationFormTargetConfiguration;
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
}
export interface CreateEvaluationFormResponse {
  EvaluationFormId: string;
  EvaluationFormArn: string;
}
export type ExtractionDefinitionName = string;
export type ExtractionDefinitionPromptHint = string;
export type NotFoundBehaviorType = "USE_DEFAULT_VALUE" | "OMIT" | (string & {});
export type NotFoundDefaultValue = string;
export interface ExtractionDefinitionNotFoundBehavior {
  Behavior: NotFoundBehaviorType;
  DefaultValue?: string;
}
export interface ExtractionConfiguration {
  PromptHint: string;
  NotFoundBehavior?: ExtractionDefinitionNotFoundBehavior;
}
export type ExtractionDefinitionDisplayLabel = string;
export interface ExtractionDefinitionDisplay {
  Label?: string;
}
export interface CreateExtractionDefinitionRequest {
  ClientToken?: string;
  InstanceId: string;
  Name: string;
  ExtractionConfiguration: ExtractionConfiguration;
  Display?: ExtractionDefinitionDisplay;
  Tags?: { [key: string]: string | undefined };
}
export type ExtractionDefinitionId = string;
export interface CreateExtractionDefinitionResponse {
  ExtractionDefinitionArn: string;
  ExtractionDefinitionId: string;
}
export type CommonNameLength127 = string;
export type HoursOfOperationDescription = string;
export type HoursOfOperationDays =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export type Hours24Format = number;
export type MinutesLimit60 = number;
export interface HoursOfOperationTimeSlice {
  Hours: number;
  Minutes: number;
}
export interface HoursOfOperationConfig {
  Day: HoursOfOperationDays;
  StartTime: HoursOfOperationTimeSlice;
  EndTime: HoursOfOperationTimeSlice;
}
export type HoursOfOperationConfigList = HoursOfOperationConfig[];
export interface CreateHoursOfOperationRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  TimeZone: string;
  Config: HoursOfOperationConfig[];
  ParentHoursOfOperationConfigs?: ParentHoursOfOperationConfig[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateHoursOfOperationResponse {
  HoursOfOperationId?: string;
  HoursOfOperationArn?: string;
}
export type CommonHumanReadableName = string;
export type CommonHumanReadableDescription = string;
export type OverrideDays =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export interface OverrideTimeSlice {
  Hours: number;
  Minutes: number;
}
export interface HoursOfOperationOverrideConfig {
  Day?: OverrideDays;
  StartTime?: OverrideTimeSlice;
  EndTime?: OverrideTimeSlice;
}
export type HoursOfOperationOverrideConfigList =
  HoursOfOperationOverrideConfig[];
export type HoursOfOperationOverrideYearMonthDayDateFormat = string;
export type RecurrenceFrequency =
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | (string & {});
export type IntervalPositiveInteger = number;
export type Month = number;
export type MonthList = number[];
export type MonthDay = number;
export type MonthDayList = number[];
export type WeekdayOccurrenceInteger = number;
export type WeekdayOccurrenceList = number[];
export interface RecurrencePattern {
  Frequency: RecurrenceFrequency;
  Interval: number;
  ByMonth?: number[];
  ByMonthDay?: number[];
  ByWeekdayOccurrence?: number[];
}
export interface RecurrenceConfig {
  RecurrencePattern: RecurrencePattern;
}
export type OverrideType = "STANDARD" | "OPEN" | "CLOSED" | (string & {});
export interface CreateHoursOfOperationOverrideRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  Name: string;
  Description?: string;
  Config: HoursOfOperationOverrideConfig[];
  EffectiveFrom: string;
  EffectiveTill: string;
  RecurrenceConfig?: RecurrenceConfig;
  OverrideType?: OverrideType;
}
export type HoursOfOperationOverrideId = string;
export interface CreateHoursOfOperationOverrideResponse {
  HoursOfOperationOverrideId?: string;
}
export type DirectoryType =
  | "SAML"
  | "CONNECT_MANAGED"
  | "EXISTING_DIRECTORY"
  | (string & {});
export type DirectoryAlias = string | redacted.Redacted<string>;
export type DirectoryId = string;
export type InboundCallsEnabled = boolean;
export type OutboundCallsEnabled = boolean;
export interface CreateInstanceRequest {
  ClientToken?: string;
  IdentityManagementType: DirectoryType;
  InstanceAlias?: string | redacted.Redacted<string>;
  DirectoryId?: string;
  InboundCallsEnabled: boolean;
  OutboundCallsEnabled: boolean;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateInstanceResponse {
  Id?: string;
  Arn?: string;
}
export type IntegrationType =
  | "EVENT"
  | "VOICE_ID"
  | "PINPOINT_APP"
  | "WISDOM_ASSISTANT"
  | "WISDOM_KNOWLEDGE_BASE"
  | "WISDOM_QUICK_RESPONSES"
  | "Q_MESSAGE_TEMPLATES"
  | "CASES_DOMAIN"
  | "APPLICATION"
  | "FILE_SCANNER"
  | "SES_IDENTITY"
  | "ANALYTICS_CONNECTOR"
  | "CALL_TRANSFER_CONNECTOR"
  | "COGNITO_USER_POOL"
  | "MESSAGE_PROCESSOR"
  | (string & {});
export type URI = string;
export type SourceApplicationName = string;
export type SourceType = "SALESFORCE" | "ZENDESK" | "CASES" | (string & {});
export interface CreateIntegrationAssociationRequest {
  InstanceId: string;
  IntegrationType: IntegrationType;
  IntegrationArn: string;
  SourceApplicationUrl?: string;
  SourceApplicationName?: string;
  SourceType?: SourceType;
  Tags?: { [key: string]: string | undefined };
}
export type IntegrationAssociationId = string;
export interface CreateIntegrationAssociationResponse {
  IntegrationAssociationId?: string;
  IntegrationAssociationArn?: string;
}
export type MetricName = string;
export type ComponentAlias = string;
export type MetricId = string;
export type MetricFilterKey = string;
export type MetricFilterNumberConditionComparison =
  | "LESSER"
  | "LESSER_OR_EQUAL"
  | "GREATER"
  | "GREATER_OR_EQUAL"
  | (string & {});
export type NumberValueList = number[];
export interface MetricFilterNumberCondition {
  Comparison: MetricFilterNumberConditionComparison;
  Values: number[];
}
export type MetricFilterStringConditionComparison =
  | "MATCHES_ANY"
  | "MATCHES_NONE"
  | (string & {});
export type StringValueList = string[];
export interface MetricFilterStringCondition {
  Comparison: MetricFilterStringConditionComparison;
  Values: string[];
}
export type MetricFilterBooleanConditionComparison =
  | "IS_TRUE"
  | "IS_FALSE"
  | (string & {});
export interface MetricFilterBooleanCondition {
  Comparison: MetricFilterBooleanConditionComparison;
}
export interface MetricFilter {
  MetricFilterKey: string;
  Negate?: boolean;
  NumberCondition?: MetricFilterNumberCondition;
  StringCondition?: MetricFilterStringCondition;
  BooleanCondition?: MetricFilterBooleanCondition;
}
export type MetricFilterList = MetricFilter[];
export interface CalculationComponent {
  Alias: string;
  MetricName?: string;
  MetricId?: string;
  MetricFilters?: MetricFilter[];
}
export type CalculationComponentList = CalculationComponent[];
export type CalculationExpression = string;
export interface MetricCalculation {
  CalculationComponents: CalculationComponent[];
  Calculation: string;
}
export type MetricUnit =
  | "INTEGER"
  | "DOUBLE"
  | "PERCENT"
  | "SECONDS"
  | (string & {});
export type MetricStatus = "PUBLISHED" | "SAVED" | (string & {});
export type MetricDescription = string;
export type TrendIndicator =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | (string & {});
export interface CreateMetricRequest {
  InstanceId: string;
  Name: string;
  MetricCalculation: MetricCalculation;
  Unit: MetricUnit;
  Status?: MetricStatus;
  ClientToken?: string;
  Description?: string;
  PositiveTrendIndicator?: TrendIndicator;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateMetricResponse {
  MetricArn: string;
  MetricId: string;
}
export type RecipientList = string[];
export type ConfigurableNotificationPriority = "HIGH" | "LOW" | (string & {});
export type LocaleCode =
  | "en_US"
  | "de_DE"
  | "es_ES"
  | "fr_FR"
  | "id_ID"
  | "it_IT"
  | "ja_JP"
  | "ko_KR"
  | "pt_BR"
  | "zh_CN"
  | "zh_TW"
  | (string & {});
export type LocalizedString = string;
export type NotificationContent = { [key in LocaleCode]?: string };
export type NotificationId = string;
export interface CreateNotificationRequest {
  InstanceId: string;
  ExpiresAt?: Date;
  Recipients: string[];
  Priority?: ConfigurableNotificationPriority;
  Content: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  PredefinedNotificationId?: string;
  ClientToken?: string;
}
export interface CreateNotificationResponse {
  NotificationId: string;
  NotificationArn: string;
}
export type ParticipantRole =
  | "AGENT"
  | "CUSTOMER"
  | "SYSTEM"
  | "CUSTOM_BOT"
  | "SUPERVISOR"
  | (string & {});
export type DisplayName = string;
export type VideoCapability = "SEND" | (string & {});
export type ScreenShareCapability = "SEND" | (string & {});
export interface ParticipantCapabilities {
  Video?: VideoCapability;
  ScreenShare?: ScreenShareCapability;
}
export interface ParticipantDetailsToAdd {
  ParticipantRole?: ParticipantRole;
  DisplayName?: string;
  ParticipantCapabilities?: ParticipantCapabilities;
}
export interface CreateParticipantRequest {
  InstanceId: string;
  ContactId: string;
  ClientToken?: string;
  ParticipantDetails: ParticipantDetailsToAdd;
}
export type ParticipantToken = string;
export interface ParticipantTokenCredentials {
  ParticipantToken?: string;
  Expiry?: string;
}
export type ParticipantId = string;
export interface CreateParticipantResponse {
  ParticipantCredentials?: ParticipantTokenCredentials;
  ParticipantId?: string;
}
export type RehydrationType =
  | "ENTIRE_PAST_SESSION"
  | "FROM_SEGMENT"
  | (string & {});
export interface CreatePersistentContactAssociationRequest {
  InstanceId: string;
  InitialContactId: string;
  RehydrationType: RehydrationType;
  SourceContactId: string;
  ClientToken?: string;
}
export interface CreatePersistentContactAssociationResponse {
  ContinuedFromContactId?: string;
}
export type PredefinedAttributeStringValuesList = string[];
export type PredefinedAttributeValues = { StringList: string[] };
export type PredefinedAttributePurposeName = string;
export type PredefinedAttributePurposeNameList = string[];
export type EnableValueValidationOnAssociation = boolean;
export interface InputPredefinedAttributeConfiguration {
  EnableValueValidationOnAssociation?: boolean;
}
export interface CreatePredefinedAttributeRequest {
  InstanceId: string;
  Name: string;
  Values?: PredefinedAttributeValues;
  Purposes?: string[];
  AttributeConfiguration?: InputPredefinedAttributeConfiguration;
}
export interface CreatePredefinedAttributeResponse {}
export type PromptDescription = string;
export type S3Uri = string;
export interface CreatePromptRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  S3Uri: string;
  Tags?: { [key: string]: string | undefined };
}
export type PromptId = string;
export interface CreatePromptResponse {
  PromptARN?: string;
  PromptId?: string;
}
export type DeviceToken = string;
export type DeviceType = "GCM" | "APNS" | "APNS_SANDBOX" | (string & {});
export type IncludeRawMessage = boolean;
export interface ContactConfiguration {
  ContactId: string;
  ParticipantRole?: ParticipantRole;
  IncludeRawMessage?: boolean;
}
export interface CreatePushNotificationRegistrationRequest {
  InstanceId: string;
  ClientToken?: string;
  PinpointAppArn: string;
  DeviceToken: string;
  DeviceType: DeviceType;
  ContactConfiguration: ContactConfiguration;
}
export type RegistrationId = string;
export interface CreatePushNotificationRegistrationResponse {
  RegistrationId: string;
}
export type QueueDescription = string;
export type OutboundCallerIdName = string;
export interface OutboundCallerConfig {
  OutboundCallerIdName?: string;
  OutboundCallerIdNumberId?: string;
  OutboundFlowId?: string;
}
export interface OutboundEmailConfig {
  OutboundEmailAddressId?: string;
}
export type QueueMaxContacts = number;
export interface CreateQueueRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  OutboundCallerConfig?: OutboundCallerConfig;
  OutboundEmailConfig?: OutboundEmailConfig;
  HoursOfOperationId: string;
  MaxContacts?: number;
  QuickConnectIds?: string[];
  EmailAddressesConfig?: EmailAddressConfig[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateQueueResponse {
  QueueArn?: string;
  QueueId?: string;
}
export type QuickConnectName = string;
export type QuickConnectDescription = string;
export type QuickConnectType =
  | "USER"
  | "QUEUE"
  | "PHONE_NUMBER"
  | "FLOW"
  | (string & {});
export interface UserQuickConnectConfig {
  UserId: string;
  ContactFlowId: string;
}
export interface QueueQuickConnectConfig {
  QueueId: string;
  ContactFlowId: string;
}
export interface PhoneNumberQuickConnectConfig {
  PhoneNumber: string;
}
export interface FlowQuickConnectConfig {
  ContactFlowId: string;
}
export interface QuickConnectConfig {
  QuickConnectType: QuickConnectType;
  UserConfig?: UserQuickConnectConfig;
  QueueConfig?: QueueQuickConnectConfig;
  PhoneConfig?: PhoneNumberQuickConnectConfig;
  FlowConfig?: FlowQuickConnectConfig;
}
export interface CreateQuickConnectRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  QuickConnectConfig: QuickConnectConfig;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateQuickConnectResponse {
  QuickConnectARN?: string;
  QuickConnectId?: string;
}
export type RoutingProfileName = string;
export type RoutingProfileDescription = string;
export type Concurrency = number;
export type BehaviorType =
  | "ROUTE_CURRENT_CHANNEL_ONLY"
  | "ROUTE_ANY_CHANNEL"
  | (string & {});
export interface CrossChannelBehavior {
  BehaviorType: BehaviorType;
}
export interface MediaConcurrency {
  Channel: Channel;
  Concurrency: number;
  CrossChannelBehavior?: CrossChannelBehavior;
}
export type MediaConcurrencies = MediaConcurrency[];
export type AgentAvailabilityTimer =
  | "TIME_SINCE_LAST_ACTIVITY"
  | "TIME_SINCE_LAST_INBOUND"
  | (string & {});
export interface CreateRoutingProfileRequest {
  InstanceId: string;
  Name: string;
  Description: string;
  DefaultOutboundQueueId: string;
  QueueConfigs?: RoutingProfileQueueConfig[];
  ManualAssignmentQueueConfigs?: RoutingProfileManualAssignmentQueueConfig[];
  MediaConcurrencies: MediaConcurrency[];
  Tags?: { [key: string]: string | undefined };
  AgentAvailabilityTimer?: AgentAvailabilityTimer;
}
export interface CreateRoutingProfileResponse {
  RoutingProfileArn?: string;
  RoutingProfileId?: string;
}
export type RuleName = string;
export type EventSourceName =
  | "OnPostCallAnalysisAvailable"
  | "OnRealTimeCallAnalysisAvailable"
  | "OnRealTimeChatAnalysisAvailable"
  | "OnPostChatAnalysisAvailable"
  | "OnAfterCallWorkAvailable"
  | "OnAfterChatWorkAvailable"
  | "OnEmailAnalysisAvailable"
  | "OnZendeskTicketCreate"
  | "OnZendeskTicketStatusUpdate"
  | "OnSalesforceCaseCreate"
  | "OnContactEvaluationSubmit"
  | "OnMetricDataUpdate"
  | "OnCaseCreate"
  | "OnCaseUpdate"
  | "OnSlaBreach"
  | "OnAlertUpdate"
  | "OnSchedulePublish"
  | "OnScheduleUpdate"
  | "OnScheduleTimeOffRequestActivity"
  | (string & {});
export interface RuleTriggerEventSource {
  EventSourceName: EventSourceName;
  IntegrationAssociationId?: string;
}
export type RuleFunction = string;
export type ActionType =
  | "CREATE_TASK"
  | "ASSIGN_CONTACT_CATEGORY"
  | "GENERATE_EVENTBRIDGE_EVENT"
  | "SEND_NOTIFICATION"
  | "CREATE_CASE"
  | "UPDATE_CASE"
  | "ASSIGN_SLA"
  | "END_ASSOCIATED_TASKS"
  | "SUBMIT_AUTO_EVALUATION"
  | "EXTRACT_INFORMATION"
  | (string & {});
export type TaskNameExpression = string;
export type TaskDescriptionExpression = string;
export interface TaskActionDefinition {
  Name: string;
  Description?: string;
  ContactFlowId: string;
  References?: { [key: string]: Reference | undefined };
}
export type EventBridgeActionName = string;
export interface EventBridgeActionDefinition {
  Name: string;
}
export interface AssignContactCategoryActionDefinition {}
export type NotificationDeliveryType = "EMAIL" | (string & {});
export type Subject = string;
export type Content = string;
export type NotificationContentType = "PLAIN_TEXT" | (string & {});
export type UserTagMap = { [key: string]: string | undefined };
export type UserIdList = string[];
export interface NotificationRecipientType {
  UserTags?: { [key: string]: string | undefined };
  UserIds?: string[];
}
export interface SendNotificationActionDefinition {
  DeliveryMethod: NotificationDeliveryType;
  Subject?: string;
  Content: string;
  ContentType: NotificationContentType;
  Recipient: NotificationRecipientType;
  Exclusion?: NotificationRecipientType;
}
export type FieldValueId = string;
export interface EmptyFieldValue {}
export type FieldStringValue = string;
export interface FieldValueUnion {
  BooleanValue?: boolean;
  DoubleValue?: number;
  EmptyValue?: EmptyFieldValue;
  StringValue?: string;
}
export interface FieldValue {
  Id: string;
  Value: FieldValueUnion;
}
export type FieldValues = FieldValue[];
export type TemplateId = string;
export interface CreateCaseActionDefinition {
  Fields: FieldValue[];
  TemplateId: string;
}
export interface UpdateCaseActionDefinition {
  Fields: FieldValue[];
}
export type SlaAssignmentType = "CASES" | (string & {});
export type SlaName = string;
export type SlaType = "CaseField" | (string & {});
export type SlaFieldValueUnionList = FieldValueUnion[];
export type TargetSlaMinutes = number;
export interface CaseSlaConfiguration {
  Name: string;
  Type: SlaType;
  FieldId?: string;
  TargetFieldValues?: FieldValueUnion[];
  TargetSlaMinutes: number;
}
export interface AssignSlaActionDefinition {
  SlaAssignmentType: SlaAssignmentType;
  CaseSlaConfiguration?: CaseSlaConfiguration;
}
export interface EndAssociatedTasksActionDefinition {}
export type EvaluationFormId = string;
export interface SubmitAutoEvaluationActionDefinition {
  EvaluationFormId: string;
}
export type RulesExtractionDefinitionId = string;
export interface RulesExtractionDefinitionIdentifier {
  Identifier: string;
}
export type RulesExtractionDefinitionIdentifierList =
  RulesExtractionDefinitionIdentifier[];
export interface ExtractInformationActionDefinition {
  RulesExtractionDefinitions: RulesExtractionDefinitionIdentifier[];
}
export interface RuleAction {
  ActionType: ActionType;
  TaskAction?: TaskActionDefinition;
  EventBridgeAction?: EventBridgeActionDefinition;
  AssignContactCategoryAction?: AssignContactCategoryActionDefinition;
  SendNotificationAction?: SendNotificationActionDefinition;
  CreateCaseAction?: CreateCaseActionDefinition;
  UpdateCaseAction?: UpdateCaseActionDefinition;
  AssignSlaAction?: AssignSlaActionDefinition;
  EndAssociatedTasksAction?: EndAssociatedTasksActionDefinition;
  SubmitAutoEvaluationAction?: SubmitAutoEvaluationActionDefinition;
  ExtractInformationAction?: ExtractInformationActionDefinition;
}
export type RuleActions = RuleAction[];
export type RulePublishStatus = "DRAFT" | "PUBLISHED" | (string & {});
export interface CreateRuleRequest {
  InstanceId: string;
  Name: string;
  TriggerEventSource: RuleTriggerEventSource;
  Function: string;
  Actions: RuleAction[];
  PublishStatus: RulePublishStatus;
  ClientToken?: string;
}
export type RuleId = string;
export interface CreateRuleResponse {
  RuleArn: string;
  RuleId: string;
}
export type CreateSecurityProfileName = string;
export type SecurityProfileDescription = string;
export type SecurityProfilePermission = string;
export type PermissionsList = string[];
export type SecurityProfilePolicyKey = string;
export type SecurityProfilePolicyValue = string;
export type AllowedAccessControlTags = { [key: string]: string | undefined };
export type TagRestrictedResourceName = string;
export type TagRestrictedResourceList = string[];
export type Namespace = string;
export type Permission = string;
export type ApplicationPermissions = string[];
export type ApplicationType = "MCP" | "THIRD_PARTY_APPLICATION" | (string & {});
export interface Application {
  Namespace?: string;
  ApplicationPermissions?: string[];
  Type?: ApplicationType;
}
export type Applications = Application[];
export type HierarchyRestrictedResourceName = string;
export type HierarchyRestrictedResourceList = string[];
export type HierarchyGroupId = string;
export type FlowModuleType = "MCP" | (string & {});
export type FlowModuleId = string;
export interface FlowModule {
  Type?: FlowModuleType;
  FlowModuleId?: string;
}
export type AllowedFlowModules = FlowModule[];
export type AccessType = "ALLOW" | (string & {});
export type PrimaryAttributeContextKeyName = string;
export type IAMRestrictedPrimaryValue = string;
export type PrimaryValueList = string[];
export interface PrimaryAttributeValue {
  AccessType?: AccessType;
  AttributeName?: string;
  Values?: string[];
}
export type PrimaryAttributeValuesSet = PrimaryAttributeValue[];
export interface PrimaryAttributeAccessControlConfigurationItem {
  PrimaryAttributeValues?: PrimaryAttributeValue[];
}
export interface DataTableAccessControlConfiguration {
  PrimaryAttributeAccessControlConfiguration?: PrimaryAttributeAccessControlConfigurationItem;
}
export interface GranularAccessControlConfiguration {
  DataTableAccessControlConfiguration?: DataTableAccessControlConfiguration;
}
export interface CreateSecurityProfileRequest {
  SecurityProfileName: string;
  Description?: string;
  Permissions?: string[];
  InstanceId: string;
  Tags?: { [key: string]: string | undefined };
  AllowedAccessControlTags?: { [key: string]: string | undefined };
  TagRestrictedResources?: string[];
  Applications?: Application[];
  HierarchyRestrictedResources?: string[];
  AllowedAccessControlHierarchyGroupId?: string;
  AllowedFlowModules?: FlowModule[];
  GranularAccessControlConfiguration?: GranularAccessControlConfiguration;
}
export interface CreateSecurityProfileResponse {
  SecurityProfileId?: string;
  SecurityProfileArn?: string;
}
export type TaskTemplateName = string;
export type TaskTemplateDescription = string;
export type TaskTemplateFieldName = string;
export interface TaskTemplateFieldIdentifier {
  Name?: string;
}
export interface RequiredFieldInfo {
  Id?: TaskTemplateFieldIdentifier;
}
export type RequiredTaskTemplateFields = RequiredFieldInfo[];
export interface ReadOnlyFieldInfo {
  Id?: TaskTemplateFieldIdentifier;
}
export type ReadOnlyTaskTemplateFields = ReadOnlyFieldInfo[];
export interface InvisibleFieldInfo {
  Id?: TaskTemplateFieldIdentifier;
}
export type InvisibleTaskTemplateFields = InvisibleFieldInfo[];
export interface TaskTemplateConstraints {
  RequiredFields?: RequiredFieldInfo[];
  ReadOnlyFields?: ReadOnlyFieldInfo[];
  InvisibleFields?: InvisibleFieldInfo[];
}
export type TaskTemplateFieldValue = string;
export interface TaskTemplateDefaultFieldValue {
  Id?: TaskTemplateFieldIdentifier;
  DefaultValue?: string;
}
export type TaskTemplateDefaultFieldValueList = TaskTemplateDefaultFieldValue[];
export interface TaskTemplateDefaults {
  DefaultFieldValues?: TaskTemplateDefaultFieldValue[];
}
export type TaskTemplateStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type TaskTemplateFieldDescription = string;
export type TaskTemplateFieldType =
  | "NAME"
  | "DESCRIPTION"
  | "SCHEDULED_TIME"
  | "QUICK_CONNECT"
  | "URL"
  | "NUMBER"
  | "TEXT"
  | "TEXT_AREA"
  | "DATE_TIME"
  | "BOOLEAN"
  | "SINGLE_SELECT"
  | "EMAIL"
  | "SELF_ASSIGN"
  | "EXPIRY_DURATION"
  | (string & {});
export type TaskTemplateSingleSelectOption = string;
export type SingleSelectOptions = string[];
export interface TaskTemplateField {
  Id: TaskTemplateFieldIdentifier;
  Description?: string;
  Type?: TaskTemplateFieldType;
  SingleSelectOptions?: string[];
}
export type TaskTemplateFields = TaskTemplateField[];
export interface CreateTaskTemplateRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  ContactFlowId?: string;
  SelfAssignFlowId?: string;
  Constraints?: TaskTemplateConstraints;
  Defaults?: TaskTemplateDefaults;
  Status?: TaskTemplateStatus;
  Fields: TaskTemplateField[];
  ClientToken?: string;
}
export type TaskTemplateId = string;
export type TaskTemplateArn = string;
export interface CreateTaskTemplateResponse {
  Id: string;
  Arn: string;
}
export type TestCaseName = string;
export type TestCaseDescription = string;
export type TestCaseContent = string;
export type TestCaseEntryPointType = "VOICE_CALL" | "CHAT" | (string & {});
export interface VoiceCallEntryPointParameters {
  SourcePhoneNumber?: string;
  DestinationPhoneNumber?: string;
  FlowId?: string;
}
export interface ChatEntryPointParameters {
  FlowId?: string;
}
export interface TestCaseEntryPoint {
  Type?: TestCaseEntryPointType;
  VoiceCallEntryPointParameters?: VoiceCallEntryPointParameters;
  ChatEntryPointParameters?: ChatEntryPointParameters;
}
export type TestCaseInitializationData = string;
export type TestCaseStatus = "PUBLISHED" | "SAVED" | (string & {});
export type TestCaseId = string;
export interface CreateTestCaseRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  Content: string;
  EntryPoint?: TestCaseEntryPoint;
  InitializationData?: string;
  Status?: TestCaseStatus;
  TestCaseId?: string;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface CreateTestCaseResponse {
  TestCaseId?: string;
  TestCaseArn?: string;
}
export type Name128 = string;
export type Description250 = string;
export interface CreateTrafficDistributionGroupRequest {
  Name: string;
  Description?: string;
  InstanceId: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type TrafficDistributionGroupId = string;
export type TrafficDistributionGroupArn = string;
export interface CreateTrafficDistributionGroupResponse {
  Id?: string;
  Arn?: string;
}
export type UseCaseType =
  | "RULES_EVALUATION"
  | "CONNECT_CAMPAIGNS"
  | (string & {});
export interface CreateUseCaseRequest {
  InstanceId: string;
  IntegrationAssociationId: string;
  UseCaseType: UseCaseType;
  Tags?: { [key: string]: string | undefined };
}
export type UseCaseId = string;
export interface CreateUseCaseResponse {
  UseCaseId?: string;
  UseCaseArn?: string;
}
export type AgentUsername = string;
export type Password = string | redacted.Redacted<string>;
export type AgentFirstName = string | redacted.Redacted<string>;
export type AgentLastName = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export interface UserIdentityInfo {
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  Email?: string | redacted.Redacted<string>;
  SecondaryEmail?: string | redacted.Redacted<string>;
  Mobile?: string;
}
export type PhoneType = "SOFT_PHONE" | "DESK_PHONE" | (string & {});
export type AutoAccept = boolean;
export type AfterContactWorkTimeLimit = number;
export type SensitivePhoneNumber = string | redacted.Redacted<string>;
export type PersistentConnection = boolean;
export interface UserPhoneConfig {
  PhoneType?: PhoneType;
  AutoAccept?: boolean;
  AfterContactWorkTimeLimit?: number;
  DeskPhoneNumber?: string | redacted.Redacted<string>;
  PersistentConnection?: boolean;
}
export type DirectoryUserId = string;
export type AgentFirstCallbackAutoAccept = boolean;
export interface AutoAcceptConfig {
  Channel: Channel;
  AutoAccept: boolean;
  AgentFirstCallbackAutoAccept?: boolean;
}
export type AutoAcceptConfigs = AutoAcceptConfig[];
export interface AfterContactWorkConfig {
  AfterContactWorkTimeLimit?: number;
}
export interface AfterContactWorkConfigPerChannel {
  Channel: Channel;
  AfterContactWorkConfig: AfterContactWorkConfig;
  AgentFirstCallbackAfterContactWorkConfig?: AfterContactWorkConfig;
}
export type AfterContactWorkConfigs = AfterContactWorkConfigPerChannel[];
export interface PhoneNumberConfig {
  Channel: Channel;
  PhoneType: PhoneType;
  PhoneNumber?: string | redacted.Redacted<string>;
}
export type PhoneNumberConfigs = PhoneNumberConfig[];
export interface PersistentConnectionConfig {
  Channel: Channel;
  PersistentConnection: boolean;
}
export type PersistentConnectionConfigs = PersistentConnectionConfig[];
export type VoiceEnhancementMode =
  | "VOICE_ISOLATION"
  | "NOISE_SUPPRESSION"
  | "NONE"
  | (string & {});
export interface VoiceEnhancementConfig {
  Channel: Channel;
  VoiceEnhancementMode: VoiceEnhancementMode;
}
export type VoiceEnhancementConfigs = VoiceEnhancementConfig[];
export interface CreateUserRequest {
  Username: string;
  Password?: string | redacted.Redacted<string>;
  IdentityInfo?: UserIdentityInfo;
  PhoneConfig?: UserPhoneConfig;
  DirectoryUserId?: string;
  SecurityProfileIds: string[];
  RoutingProfileId: string;
  HierarchyGroupId?: string;
  InstanceId: string;
  AutoAcceptConfigs?: AutoAcceptConfig[];
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  PhoneNumberConfigs?: PhoneNumberConfig[];
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateUserResponse {
  UserId?: string;
  UserArn?: string;
}
export type HierarchyGroupName = string;
export interface CreateUserHierarchyGroupRequest {
  Name: string;
  ParentGroupId?: string;
  InstanceId: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateUserHierarchyGroupResponse {
  HierarchyGroupId?: string;
  HierarchyGroupArn?: string;
}
export type ViewsInstanceId = string;
export type ViewsClientToken = string;
export type ViewStatus = "PUBLISHED" | "SAVED" | (string & {});
export type ViewTemplate = string;
export type ViewAction = string | redacted.Redacted<string>;
export type ViewActions = (string | redacted.Redacted<string>)[];
export interface ViewInputContent {
  Template?: string;
  Actions?: (string | redacted.Redacted<string>)[];
}
export type ViewDescription = string;
export type ViewName = string | redacted.Redacted<string>;
export interface CreateViewRequest {
  InstanceId: string;
  ClientToken?: string;
  Status: ViewStatus;
  Content: ViewInputContent;
  Description?: string;
  Name: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export type ViewId = string;
export type ViewType = "CUSTOMER_MANAGED" | "AWS_MANAGED" | (string & {});
export type ViewVersion = number;
export type ViewInputSchema = string | redacted.Redacted<string>;
export interface ViewContent {
  InputSchema?: string | redacted.Redacted<string>;
  Template?: string;
  Actions?: (string | redacted.Redacted<string>)[];
}
export type ViewContentSha256 = string;
export interface View {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Status?: ViewStatus;
  Type?: ViewType;
  Description?: string;
  Version?: number;
  VersionDescription?: string;
  Content?: ViewContent;
  Tags?: { [key: string]: string | undefined };
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  ViewContentSha256?: string;
}
export interface CreateViewResponse {
  View?: View;
}
export interface CreateViewVersionRequest {
  InstanceId: string;
  ViewId: string;
  VersionDescription?: string;
  ViewContentSha256?: string;
}
export interface CreateViewVersionResponse {
  View?: View;
}
export type VocabularyName = string;
export type VocabularyContent = string;
export interface CreateVocabularyRequest {
  ClientToken?: string;
  InstanceId: string;
  VocabularyName: string;
  LanguageCode: VocabularyLanguageCode;
  Content: string;
  Tags?: { [key: string]: string | undefined };
}
export type VocabularyState =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "CREATION_FAILED"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export interface CreateVocabularyResponse {
  VocabularyArn: string;
  VocabularyId: string;
  State: VocabularyState;
}
export type WorkspaceName = string;
export type WorkspaceDescription = string;
export type ThemeString = string;
export interface PaletteHeader {
  Background?: string;
  Text?: string;
  TextHover?: string;
  InvertActionsColors?: boolean;
}
export interface PaletteNavigation {
  Background?: string;
  TextBackgroundHover?: string;
  TextBackgroundActive?: string;
  Text?: string;
  TextHover?: string;
  TextActive?: string;
  InvertActionsColors?: boolean;
}
export interface PaletteCanvas {
  ContainerBackground?: string;
  PageBackground?: string;
  ActiveBackground?: string;
}
export interface PalettePrimary {
  Default?: string;
  Active?: string;
  ContrastText?: string;
}
export interface WorkspaceThemePalette {
  Header?: PaletteHeader;
  Navigation?: PaletteNavigation;
  Canvas?: PaletteCanvas;
  Primary?: PalettePrimary;
}
export type ThemeImageLink = string;
export interface ImagesLogo {
  Default?: string;
  Favicon?: string;
}
export interface WorkspaceThemeImages {
  Logo?: ImagesLogo;
}
export type WorkspaceFontFamily =
  | "Arial"
  | "Courier New"
  | "Georgia"
  | "Times New Roman"
  | "Trebuchet"
  | "Verdana"
  | (string & {});
export interface FontFamily {
  Default?: WorkspaceFontFamily;
}
export interface WorkspaceThemeTypography {
  FontFamily?: FontFamily;
}
export interface WorkspaceThemeConfig {
  Palette?: WorkspaceThemePalette;
  Images?: WorkspaceThemeImages;
  Typography?: WorkspaceThemeTypography;
}
export interface WorkspaceTheme {
  Light?: WorkspaceThemeConfig;
  Dark?: WorkspaceThemeConfig;
}
export type WorkspaceTitle = string;
export interface CreateWorkspaceRequest {
  InstanceId: string;
  Name: string;
  Description?: string;
  Theme?: WorkspaceTheme;
  Title?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateWorkspaceResponse {
  WorkspaceId: string;
  WorkspaceArn: string;
}
export type Page = string;
export type Slug = string;
export type InputData = string;
export interface CreateWorkspacePageRequest {
  InstanceId: string;
  WorkspaceId: string;
  ResourceArn: string;
  Page: string;
  Slug?: string;
  InputData?: string;
}
export interface CreateWorkspacePageResponse {}
export interface DeactivateEvaluationFormRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
}
export interface DeactivateEvaluationFormResponse {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  EvaluationFormVersion: number;
}
export interface DeleteAttachedFileRequest {
  InstanceId: string;
  FileId: string;
  AssociatedResourceArn: string;
}
export interface DeleteAttachedFileResponse {}
export type ContactField =
  | "CUSTOMER_ENDPOINT"
  | "ADDITIONAL_EMAIL_RECIPIENTS"
  | "EMAIL_SUBJECT"
  | (string & {});
export type ContactFields = ContactField[];
export interface DeleteContactDataRequest {
  InstanceId: string;
  ContactId: string;
  ContactFields: ContactField[];
}
export interface DeleteContactDataResponse {}
export interface DeleteContactEvaluationRequest {
  InstanceId: string;
  EvaluationId: string;
}
export interface DeleteContactEvaluationResponse {}
export interface DeleteContactFlowRequest {
  InstanceId: string;
  ContactFlowId: string;
}
export interface DeleteContactFlowResponse {}
export interface DeleteContactFlowModuleRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
}
export interface DeleteContactFlowModuleResponse {}
export interface DeleteContactFlowModuleAliasRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  AliasId: string;
}
export interface DeleteContactFlowModuleAliasResponse {}
export interface DeleteContactFlowModuleVersionRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  ContactFlowModuleVersion: number;
}
export interface DeleteContactFlowModuleVersionResponse {}
export interface DeleteContactFlowVersionRequest {
  InstanceId: string;
  ContactFlowId: string;
  ContactFlowVersion: number;
}
export interface DeleteContactFlowVersionResponse {}
export interface DeleteDataTableRequest {
  InstanceId: string;
  DataTableId: string;
}
export interface DeleteDataTableResponse {}
export interface DeleteDataTableAttributeRequest {
  InstanceId: string;
  DataTableId: string;
  AttributeName: string;
}
export interface DeleteDataTableAttributeResponse {
  LockVersion: DataTableLockVersion;
}
export interface DeleteEmailAddressRequest {
  InstanceId: string;
  EmailAddressId: string;
}
export interface DeleteEmailAddressResponse {}
export interface DeleteEvaluationFormRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion?: number;
}
export interface DeleteEvaluationFormResponse {}
export interface DeleteExtractionDefinitionRequest {
  InstanceId: string;
  ExtractionDefinitionId: string;
}
export interface DeleteExtractionDefinitionResponse {}
export interface DeleteHoursOfOperationRequest {
  InstanceId: string;
  HoursOfOperationId: string;
}
export interface DeleteHoursOfOperationResponse {}
export interface DeleteHoursOfOperationOverrideRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  HoursOfOperationOverrideId: string;
}
export interface DeleteHoursOfOperationOverrideResponse {}
export interface DeleteInstanceRequest {
  InstanceId: string;
  ClientToken?: string;
}
export interface DeleteInstanceResponse {}
export interface DeleteIntegrationAssociationRequest {
  InstanceId: string;
  IntegrationAssociationId: string;
}
export interface DeleteIntegrationAssociationResponse {}
export interface DeleteMetricRequest {
  InstanceId: string;
  MetricId: string;
}
export interface DeleteMetricResponse {}
export interface DeleteNotificationRequest {
  InstanceId: string;
  NotificationId: string;
}
export interface DeleteNotificationResponse {}
export interface DeletePredefinedAttributeRequest {
  InstanceId: string;
  Name: string;
}
export interface DeletePredefinedAttributeResponse {}
export interface DeletePromptRequest {
  InstanceId: string;
  PromptId: string;
}
export interface DeletePromptResponse {}
export interface DeletePushNotificationRegistrationRequest {
  InstanceId: string;
  RegistrationId: string;
  ContactId: string;
}
export interface DeletePushNotificationRegistrationResponse {}
export interface DeleteQueueRequest {
  InstanceId: string;
  QueueId: string;
}
export interface DeleteQueueResponse {}
export interface DeleteQuickConnectRequest {
  InstanceId: string;
  QuickConnectId: string;
}
export interface DeleteQuickConnectResponse {}
export interface DeleteRoutingProfileRequest {
  InstanceId: string;
  RoutingProfileId: string;
}
export interface DeleteRoutingProfileResponse {}
export interface DeleteRuleRequest {
  InstanceId: string;
  RuleId: string;
}
export interface DeleteRuleResponse {}
export interface DeleteSecurityProfileRequest {
  InstanceId: string;
  SecurityProfileId: string;
}
export interface DeleteSecurityProfileResponse {}
export interface DeleteSessionRequest {
  InstanceId: string;
  SessionId: string;
}
export interface DeleteSessionResponse {}
export interface DeleteTaskTemplateRequest {
  InstanceId: string;
  TaskTemplateId: string;
}
export interface DeleteTaskTemplateResponse {}
export interface DeleteTestCaseRequest {
  InstanceId: string;
  TestCaseId: string;
}
export interface DeleteTestCaseResponse {}
export interface DeleteTrafficDistributionGroupRequest {
  TrafficDistributionGroupId: string;
}
export interface DeleteTrafficDistributionGroupResponse {}
export interface DeleteUseCaseRequest {
  InstanceId: string;
  IntegrationAssociationId: string;
  UseCaseId: string;
}
export interface DeleteUseCaseResponse {}
export interface DeleteUserRequest {
  InstanceId: string;
  UserId: string;
}
export interface DeleteUserResponse {}
export interface DeleteUserHierarchyGroupRequest {
  HierarchyGroupId: string;
  InstanceId: string;
}
export interface DeleteUserHierarchyGroupResponse {}
export interface DeleteViewRequest {
  InstanceId: string;
  ViewId: string;
}
export interface DeleteViewResponse {}
export interface DeleteViewVersionRequest {
  InstanceId: string;
  ViewId: string;
  ViewVersion: number;
}
export interface DeleteViewVersionResponse {}
export interface DeleteVocabularyRequest {
  InstanceId: string;
  VocabularyId: string;
}
export interface DeleteVocabularyResponse {
  VocabularyArn: string;
  VocabularyId: string;
  State: VocabularyState;
}
export interface DeleteWorkspaceRequest {
  InstanceId: string;
  WorkspaceId: string;
}
export interface DeleteWorkspaceResponse {}
export type MediaType =
  | "IMAGE_LOGO_LIGHT_FAVICON"
  | "IMAGE_LOGO_DARK_FAVICON"
  | "IMAGE_LOGO_LIGHT_HORIZONTAL"
  | "IMAGE_LOGO_DARK_HORIZONTAL"
  | (string & {});
export interface DeleteWorkspaceMediaRequest {
  InstanceId: string;
  WorkspaceId: string;
  MediaType: MediaType;
}
export interface DeleteWorkspaceMediaResponse {}
export interface DeleteWorkspacePageRequest {
  InstanceId: string;
  WorkspaceId: string;
  Page: string;
}
export interface DeleteWorkspacePageResponse {}
export interface DescribeAgentStatusRequest {
  InstanceId: string;
  AgentStatusId: string;
}
export type AgentStatusType = "ROUTABLE" | "CUSTOM" | "OFFLINE" | (string & {});
export interface AgentStatus {
  AgentStatusARN?: string;
  AgentStatusId?: string;
  Name?: string;
  Description?: string;
  Type?: AgentStatusType;
  DisplayOrder?: number;
  State?: AgentStatusState;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeAgentStatusResponse {
  AgentStatus?: AgentStatus;
}
export type AttachmentScope =
  | "EMAIL"
  | "CHAT"
  | "CASE"
  | "TASK"
  | (string & {});
export interface DescribeAttachedFilesConfigurationRequest {
  InstanceId: string;
  AttachmentScope: AttachmentScope;
}
export type MaximumSizeLimitInBytes = number;
export type FileExtension = string;
export interface AllowedExtension {
  Extension: string;
}
export type AllowedExtensionsList = AllowedExtension[];
export interface ExtensionConfiguration {
  AllowedExtensions: AllowedExtension[];
}
export interface AttachedFilesConfiguration {
  InstanceId: string;
  AttachmentScope: AttachmentScope;
  MaximumSizeLimitInBytes?: number;
  ExtensionConfiguration?: ExtensionConfiguration;
  LastModifiedTime?: Date;
}
export interface DescribeAttachedFilesConfigurationResponse {
  AttachedFilesConfiguration: AttachedFilesConfiguration;
}
export type AuthenticationProfileId = string;
export interface DescribeAuthenticationProfileRequest {
  AuthenticationProfileId: string;
  InstanceId: string;
}
export type AuthenticationProfileName = string;
export type AuthenticationProfileDescription = string;
export type IpCidr = string;
export type IpCidrList = string[];
export type AccessTokenDuration = number;
export type RefreshTokenDuration = number;
export type InactivityDuration = number;
export interface AuthenticationProfile {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  AllowedIps?: string[];
  BlockedIps?: string[];
  IsDefault?: boolean;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
  PeriodicSessionDuration?: number;
  MaxSessionDuration?: number;
  SessionInactivityDuration?: number;
  SessionInactivityHandlingEnabled?: boolean;
}
export interface DescribeAuthenticationProfileResponse {
  AuthenticationProfile?: AuthenticationProfile;
}
export interface DescribeContactRequest {
  InstanceId: string;
  ContactId: string;
}
export interface QueueInfo {
  Id?: string;
  EnqueueTimestamp?: Date;
}
export type AgentPauseDurationInSeconds = number;
export interface AgentHierarchyGroup {
  Arn?: string;
}
export interface HierarchyGroups {
  Level1?: AgentHierarchyGroup;
  Level2?: AgentHierarchyGroup;
  Level3?: AgentHierarchyGroup;
  Level4?: AgentHierarchyGroup;
  Level5?: AgentHierarchyGroup;
}
export type PlatformName = string;
export type PlatformVersion = string;
export type OperatingSystem = string;
export interface DeviceInfo {
  PlatformName?: string;
  PlatformVersion?: string;
  OperatingSystem?: string;
}
export type Duration = number;
export type ParticipantState =
  | "INITIAL"
  | "CONNECTED"
  | "DISCONNECTED"
  | "MISSED"
  | (string & {});
export interface StateTransition {
  State?: ParticipantState;
  StateStartTimestamp?: Date;
  StateEndTimestamp?: Date;
}
export type StateTransitions = StateTransition[];
export interface AgentInfo {
  Id?: string;
  AcceptedByAgentTimestamp?: Date;
  PreviewEndTimestamp?: Date;
  ConnectedToAgentTimestamp?: Date;
  AgentPauseDurationInSeconds?: number;
  HierarchyGroups?: HierarchyGroups;
  DeviceInfo?: DeviceInfo;
  Capabilities?: ParticipantCapabilities;
  AfterContactWorkDuration?: number;
  AfterContactWorkStartTimestamp?: Date;
  AfterContactWorkEndTimestamp?: Date;
  AgentInitiatedHoldDuration?: number;
  StateTransitions?: StateTransition[];
  VoiceEnhancementMode?: VoiceEnhancementMode;
}
export type TotalPauseCount = number;
export type TotalPauseDurationInSeconds = number;
export type AiUseCase = "AgentAssistance" | "SelfService" | (string & {});
export type AiAgentVersionId = string;
export interface AiAgentInfo {
  AiUseCase?: AiUseCase;
  AiAgentVersionId?: string;
  AiAgentEscalated?: boolean;
}
export type AiAgents = AiAgentInfo[];
export interface WisdomInfo {
  SessionArn?: string;
  AiAgents?: AiAgentInfo[];
}
export type CustomerId = string;
export type EndpointDisplayName = string;
export interface EndpointInfo {
  Type?: EndpointType;
  Address?: string;
  DisplayName?: string;
}
export type QueueTimeAdjustmentSeconds = number;
export type QueuePriority = number;
export type ContactTagKey = string;
export type ContactTagValue = string;
export type ContactTagMap = { [key: string]: string | undefined };
export type DurationInSeconds = number;
export interface Expiry {
  DurationInSeconds?: number;
  ExpiryTimestamp?: Date;
}
export type ProficiencyValue = string;
export type NullableProficiencyLevel = number;
export interface Range {
  MinProficiencyLevel?: number;
  MaxProficiencyLevel?: number;
}
export type AgentId = string;
export type AgentIds = string[];
export interface AgentsCriteria {
  AgentIds?: string[];
}
export interface MatchCriteria {
  AgentsCriteria?: AgentsCriteria;
}
export type ComparisonOperator = string;
export interface AttributeCondition {
  Name?: string;
  Value?: string;
  ProficiencyLevel?: number;
  Range?: Range;
  MatchCriteria?: MatchCriteria;
  ComparisonOperator?: string;
}
export type Expressions = Expression[];
export interface Expression {
  AttributeCondition?: AttributeCondition;
  AndExpression?: Expression[];
  OrExpression?: Expression[];
  NotAttributeCondition?: AttributeCondition;
}
export type RoutingCriteriaStepStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "JOINED"
  | "EXPIRED"
  | (string & {});
export interface Step {
  Expiry?: Expiry;
  Expression?: Expression;
  Status?: RoutingCriteriaStepStatus;
}
export type Steps = Step[];
export type Index = number;
export interface RoutingCriteria {
  Steps?: Step[];
  ActivationTimestamp?: Date;
  Index?: number;
}
export interface Customer {
  DeviceInfo?: DeviceInfo;
  Capabilities?: ParticipantCapabilities;
}
export type AnsweringMachineDetectionStatus =
  | "ANSWERED"
  | "UNDETECTED"
  | "ERROR"
  | "HUMAN_ANSWERED"
  | "SIT_TONE_DETECTED"
  | "SIT_TONE_BUSY"
  | "SIT_TONE_INVALID_NUMBER"
  | "FAX_MACHINE_DETECTED"
  | "VOICEMAIL_BEEP"
  | "VOICEMAIL_NO_BEEP"
  | "AMD_UNRESOLVED"
  | "AMD_UNANSWERED"
  | "AMD_ERROR"
  | "AMD_NOT_APPLICABLE"
  | (string & {});
export interface CustomerVoiceActivity {
  GreetingStartTimestamp?: Date;
  GreetingEndTimestamp?: Date;
}
export type AudioQualityScore = number;
export type PotentialAudioQualityIssue = string;
export type PotentialAudioQualityIssues = string[];
export interface AudioQualityMetricsInfo {
  QualityScore?: number;
  PotentialQualityIssues?: string[];
}
export interface AgentQualityMetrics {
  Audio?: AudioQualityMetricsInfo;
}
export interface CustomerQualityMetrics {
  Audio?: AudioQualityMetricsInfo;
}
export interface QualityMetrics {
  Agent?: AgentQualityMetrics;
  Customer?: CustomerQualityMetrics;
}
export type Count = number;
export type DurationMillis = number;
export interface ChatContactMetrics {
  MultiParty?: boolean;
  TotalMessages?: number;
  TotalBotMessages?: number;
  TotalBotMessageLengthInChars?: number;
  ConversationCloseTimeInMillis?: number;
  ConversationTurnCount?: number;
  AgentFirstResponseTimestamp?: Date;
  AgentFirstResponseTimeInMillis?: number;
}
export type ParticipantType =
  | "ALL"
  | "MANAGER"
  | "AGENT"
  | "CUSTOMER"
  | "THIRDPARTY"
  | (string & {});
export interface ParticipantMetrics {
  ParticipantId?: string;
  ParticipantType?: ParticipantType;
  ConversationAbandon?: boolean;
  MessagesSent?: number;
  NumResponses?: number;
  MessageLengthInChars?: number;
  TotalResponseTimeInMillis?: number;
  MaxResponseTimeInMillis?: number;
  LastMessageTimestamp?: Date;
}
export interface ChatMetrics {
  ChatContactMetrics?: ChatContactMetrics;
  AgentMetrics?: ParticipantMetrics;
  CustomerMetrics?: ParticipantMetrics;
}
export type PotentialDisconnectIssue = string;
export interface DisconnectDetails {
  PotentialDisconnectIssue?: string;
}
export interface EmailRecipient {
  Address?: string;
  DisplayName?: string;
}
export type EmailRecipientsList = EmailRecipient[];
export interface AdditionalEmailRecipients {
  ToList?: EmailRecipient[];
  CcList?: EmailRecipient[];
}
export type RecordingLocation = string;
export type MediaStreamType = "AUDIO" | "VIDEO" | (string & {});
export type FragmentNumber = string;
export type RecordingStatus = "AVAILABLE" | "DELETED" | (string & {});
export type RecordingDeletionReason = string;
export type UnprocessedTranscriptLocation = string;
export interface RecordingInfo {
  StorageType?: StorageType;
  Location?: string;
  MediaStreamType?: MediaStreamType;
  ParticipantType?: ParticipantType;
  FragmentStartNumber?: string;
  FragmentStopNumber?: string;
  StartTimestamp?: Date;
  StopTimestamp?: Date;
  Status?: RecordingStatus;
  DeletionReason?: string;
  UnprocessedTranscriptLocation?: string;
}
export type Recordings = RecordingInfo[];
export type EvaluationId = string;
export type FormId = string;
export type EvaluationArn = string;
export type Status = "COMPLETE" | "IN_PROGRESS" | "DELETED" | (string & {});
export type ExportLocation = string;
export interface ContactEvaluation {
  FormId?: string;
  EvaluationArn?: string;
  Status?: Status;
  StartTimestamp?: Date;
  EndTimestamp?: Date;
  DeleteTimestamp?: Date;
  ExportLocation?: string;
}
export type ContactEvaluations = {
  [key: string]: ContactEvaluation | undefined;
};
export interface TaskTemplateInfoV2 {
  Arn?: string;
  Name?: string;
}
export type ContactDetailName = string;
export type ContactDetailDescription = string;
export interface ContactDetails {
  Name?: string;
  Description?: string;
}
export type NextContactType = "QUICK_CONNECT" | (string & {});
export interface QuickConnectContactData {
  ContactId?: string;
  InitiationTimestamp?: Date;
  QuickConnectId?: string;
  QuickConnectName?: string;
  QuickConnectType?: QuickConnectType;
}
export type NextContactMetadata = {
  QuickConnectContactData: QuickConnectContactData;
};
export interface NextContactEntry {
  Type?: NextContactType;
  NextContactMetadata?: NextContactMetadata;
}
export type NextContacts = NextContactEntry[];
export type ActiveRegion = string;
export type OriginRegion = string;
export interface GlobalResiliencyMetadata {
  ActiveRegion?: string;
  OriginRegion?: string;
  TrafficDistributionGroupId?: string;
}
export interface Contact {
  Arn?: string;
  Id?: string;
  InitialContactId?: string;
  PreviousContactId?: string;
  ContactAssociationId?: string;
  InitiationMethod?: ContactInitiationMethod;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Channel?: Channel;
  QueueInfo?: QueueInfo;
  AgentInfo?: AgentInfo;
  InitiationTimestamp?: Date;
  DisconnectTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  LastPausedTimestamp?: Date;
  LastResumedTimestamp?: Date;
  RingStartTimestamp?: Date;
  TotalPauseCount?: number;
  TotalPauseDurationInSeconds?: number;
  ScheduledTimestamp?: Date;
  RelatedContactId?: string;
  WisdomInfo?: WisdomInfo;
  CustomerId?: string;
  CustomerEndpoint?: EndpointInfo;
  SystemEndpoint?: EndpointInfo;
  QueueTimeAdjustmentSeconds?: number;
  QueuePriority?: number;
  Tags?: { [key: string]: string | undefined };
  ConnectedToSystemTimestamp?: Date;
  RoutingCriteria?: RoutingCriteria;
  Customer?: Customer;
  Campaign?: Campaign;
  AnsweringMachineDetectionStatus?: AnsweringMachineDetectionStatus;
  CustomerVoiceActivity?: CustomerVoiceActivity;
  QualityMetrics?: QualityMetrics;
  ChatMetrics?: ChatMetrics;
  DisconnectDetails?: DisconnectDetails;
  AdditionalEmailRecipients?: AdditionalEmailRecipients;
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  Recordings?: RecordingInfo[];
  DisconnectReason?: string;
  ContactEvaluations?: { [key: string]: ContactEvaluation | undefined };
  TaskTemplateInfo?: TaskTemplateInfoV2;
  ContactDetails?: ContactDetails;
  OutboundStrategy?: OutboundStrategy;
  Attributes?: { [key: string]: string | undefined };
  NextContacts?: NextContactEntry[];
  GlobalResiliencyMetadata?: GlobalResiliencyMetadata;
}
export interface DescribeContactResponse {
  Contact?: Contact;
}
export interface DescribeContactEvaluationRequest {
  InstanceId: string;
  EvaluationId: string;
}
export interface EvaluationScore {
  Percentage?: number;
  NotApplicable?: boolean;
  AutomaticFail?: boolean;
  AppliedWeight?: number;
  EarnedPoints?: number;
  MaxBasePoint?: number;
  PerformanceCategory?: PerformanceCategoryName;
}
export type AutoEvaluationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export interface AutoEvaluationDetails {
  AutoEvaluationEnabled: boolean;
  AutoEvaluationStatus?: AutoEvaluationStatus;
}
export type EvaluationAcknowledgerCommentString = string;
export interface EvaluationAcknowledgement {
  AcknowledgedTime: Date;
  AcknowledgedBy: string;
  AcknowledgerComment?: string;
}
export type EvaluationReviewRequestCommentContent = string;
export interface EvaluationReviewRequestComment {
  Comment?: string;
  CreatedTime?: Date;
  CreatedBy?: string;
}
export type EvaluationReviewRequestCommentList =
  EvaluationReviewRequestComment[];
export interface EvaluationReviewMetadata {
  ReviewId?: string;
  RequestedTime?: Date;
  RequestedBy?: string;
  CreatedTime?: Date;
  CreatedBy?: string;
  ReviewRequestComments: EvaluationReviewRequestComment[];
}
export type ContactParticipantRole =
  | "AGENT"
  | "SYSTEM"
  | "CUSTOM_BOT"
  | "CUSTOMER"
  | (string & {});
export interface EvaluationContactParticipant {
  ContactParticipantRole?: ContactParticipantRole;
  ContactParticipantId?: string;
}
export interface EvaluationMetadata {
  ContactId: string;
  EvaluatorArn: string;
  ContactAgentId?: string;
  CalibrationSessionId?: string;
  Score?: EvaluationScore;
  AutoEvaluation?: AutoEvaluationDetails;
  Acknowledgement?: EvaluationAcknowledgement;
  Review?: EvaluationReviewMetadata;
  ContactParticipant?: EvaluationContactParticipant;
  SamplingJobId?: string;
}
export type EvaluationAnswerDataStringValue = string;
export type EvaluationAnswerDataNumericValue = number;
export type EvaluationAnswerDataStringValueList = string[];
export type EvaluationAnswerData =
  | {
      StringValue: string;
      NumericValue?: never;
      StringValues?: never;
      DateTimeValue?: never;
      NotApplicable?: never;
    }
  | {
      StringValue?: never;
      NumericValue: number;
      StringValues?: never;
      DateTimeValue?: never;
      NotApplicable?: never;
    }
  | {
      StringValue?: never;
      NumericValue?: never;
      StringValues: string[];
      DateTimeValue?: never;
      NotApplicable?: never;
    }
  | {
      StringValue?: never;
      NumericValue?: never;
      StringValues?: never;
      DateTimeValue: string;
      NotApplicable?: never;
    }
  | {
      StringValue?: never;
      NumericValue?: never;
      StringValues?: never;
      DateTimeValue?: never;
      NotApplicable: boolean;
    };
export type EvaluationSuggestedAnswerStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export type EvaluationTranscriptType = "RAW" | "REDACTED" | (string & {});
export interface EvaluationQuestionInputDetails {
  TranscriptType?: EvaluationTranscriptType;
}
export type EvaluationQuestionAnswerAnalysisType =
  | "CONTACT_LENS_DATA"
  | "GEN_AI"
  | (string & {});
export type EvaluationSuggestedAnswerJustification = string;
export type EvaluationSuggestedAnswerTranscriptMillisOffset = number;
export interface EvaluationSuggestedAnswerTranscriptMillisecondOffsets {
  BeginOffsetMillis: number;
}
export type EvaluationSuggestedAnswerTranscriptSegment = string;
export interface EvaluationTranscriptPointOfInterest {
  MillisecondOffsets?: EvaluationSuggestedAnswerTranscriptMillisecondOffsets;
  TranscriptSegment?: string;
}
export type EvaluationTranscriptPointsOfInterest =
  EvaluationTranscriptPointOfInterest[];
export interface EvaluationGenAIAnswerAnalysisDetails {
  Justification?: string;
  PointsOfInterest?: EvaluationTranscriptPointOfInterest[];
}
export type QuestionRuleCategoryAutomationLabel = string;
export type QuestionRuleCategoryAutomationCondition =
  | "PRESENT"
  | "NOT_PRESENT"
  | (string & {});
export interface EvaluationAutomationRuleCategory {
  Category: string;
  Condition: QuestionRuleCategoryAutomationCondition;
  PointsOfInterest?: EvaluationTranscriptPointOfInterest[];
}
export type EvaluationAutomationRuleCategoryList =
  EvaluationAutomationRuleCategory[];
export interface EvaluationContactLensAnswerAnalysisDetails {
  MatchedRuleCategories?: EvaluationAutomationRuleCategory[];
}
export type EvaluationQuestionAnswerAnalysisDetails =
  | { GenAI: EvaluationGenAIAnswerAnalysisDetails; ContactLens?: never }
  | { GenAI?: never; ContactLens: EvaluationContactLensAnswerAnalysisDetails };
export interface EvaluationSuggestedAnswer {
  Value?: EvaluationAnswerData;
  Status: EvaluationSuggestedAnswerStatus;
  Input?: EvaluationQuestionInputDetails;
  AnalysisType: EvaluationQuestionAnswerAnalysisType;
  AnalysisDetails?: EvaluationQuestionAnswerAnalysisDetails;
}
export type EvaluationSuggestedAnswersList = EvaluationSuggestedAnswer[];
export interface EvaluationAnswerOutput {
  Value?: EvaluationAnswerData;
  SystemSuggestedValue?: EvaluationAnswerData;
  SuggestedAnswers?: EvaluationSuggestedAnswer[];
}
export type EvaluationAnswersOutputMap = {
  [key: string]: EvaluationAnswerOutput | undefined;
};
export type EvaluationNoteString = string;
export interface EvaluationNote {
  Value?: string;
}
export type EvaluationNotesMap = { [key: string]: EvaluationNote | undefined };
export type EvaluationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "REVIEW_REQUESTED"
  | "UNDER_REVIEW"
  | (string & {});
export type EvaluationScoresMap = {
  [key: string]: EvaluationScore | undefined;
};
export type EvaluationType = "STANDARD" | "CALIBRATION" | (string & {});
export interface Evaluation {
  EvaluationId: string;
  EvaluationArn: string;
  Metadata: EvaluationMetadata;
  Answers: { [key: string]: EvaluationAnswerOutput | undefined };
  Notes: { [key: string]: EvaluationNote | undefined };
  Status: EvaluationStatus;
  Scores?: { [key: string]: EvaluationScore | undefined };
  CreatedTime: Date;
  LastModifiedTime: Date;
  EvaluationType?: EvaluationType;
  Tags?: { [key: string]: string | undefined };
}
export interface EvaluationFormContent {
  EvaluationFormVersion: number;
  EvaluationFormId: string;
  EvaluationFormArn: string;
  Title: string;
  Description?: string;
  Items: EvaluationFormItem[];
  ScoringStrategy?: EvaluationFormScoringStrategy;
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  TargetConfiguration?: EvaluationFormTargetConfiguration;
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
  ReviewConfiguration?: EvaluationReviewConfiguration;
}
export interface DescribeContactEvaluationResponse {
  Evaluation: Evaluation;
  EvaluationForm: EvaluationFormContent;
}
export interface DescribeContactFlowRequest {
  InstanceId: string;
  ContactFlowId: string;
}
export type ContactFlowState = "ACTIVE" | "ARCHIVED" | (string & {});
export interface ContactFlow {
  Arn?: string;
  Id?: string;
  Name?: string;
  Type?: ContactFlowType;
  State?: ContactFlowState;
  Status?: ContactFlowStatus;
  Description?: string;
  Content?: string;
  Tags?: { [key: string]: string | undefined };
  FlowContentSha256?: string;
  Version?: number;
  VersionDescription?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeContactFlowResponse {
  ContactFlow?: ContactFlow;
}
export interface DescribeContactFlowModuleRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
}
export type ContactFlowModuleState = "ACTIVE" | "ARCHIVED" | (string & {});
export type ContactFlowModuleStatus = "PUBLISHED" | "SAVED" | (string & {});
export interface ContactFlowModule {
  Arn?: string;
  Id?: string;
  Name?: string;
  Content?: string;
  Description?: string;
  State?: ContactFlowModuleState;
  Status?: ContactFlowModuleStatus;
  Tags?: { [key: string]: string | undefined };
  FlowModuleContentSha256?: string;
  Version?: number;
  VersionDescription?: string;
  Settings?: string;
  ExternalInvocationConfiguration?: ExternalInvocationConfiguration;
}
export interface DescribeContactFlowModuleResponse {
  ContactFlowModule?: ContactFlowModule;
}
export interface DescribeContactFlowModuleAliasRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  AliasId: string;
}
export interface ContactFlowModuleAliasInfo {
  ContactFlowModuleId?: string;
  ContactFlowModuleArn?: string;
  AliasId?: string;
  Version?: number;
  Name?: string;
  Description?: string;
  LastModifiedRegion?: string;
  LastModifiedTime?: Date;
}
export interface DescribeContactFlowModuleAliasResponse {
  ContactFlowModuleAlias?: ContactFlowModuleAliasInfo;
}
export interface DescribeDataTableRequest {
  InstanceId: string;
  DataTableId: string;
}
export type DataTableVersion = string;
export interface DataTable {
  Name: string;
  Id: string;
  Arn: string;
  TimeZone: string;
  Description?: string;
  ValueLockLevel?: DataTableLockLevel;
  LockVersion?: DataTableLockVersion;
  Version?: string;
  VersionDescription?: string;
  Status?: DataTableStatus;
  CreatedTime?: Date;
  LastModifiedTime: Date;
  LastModifiedRegion?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeDataTableResponse {
  DataTable: DataTable;
}
export interface DescribeDataTableAttributeRequest {
  InstanceId: string;
  DataTableId: string;
  AttributeName: string;
}
export interface DataTableAttribute {
  AttributeId?: string;
  Name: string;
  ValueType: DataTableAttributeValueType;
  Description?: string;
  DataTableId?: string;
  DataTableArn?: string;
  Primary?: boolean;
  Version?: string;
  LockVersion?: DataTableLockVersion;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
  Validation?: Validation;
}
export interface DescribeDataTableAttributeResponse {
  Attribute: DataTableAttribute;
}
export interface DescribeEmailAddressRequest {
  InstanceId: string;
  EmailAddressId: string;
}
export type AliasConfigurationList = AliasConfiguration[];
export interface DescribeEmailAddressResponse {
  EmailAddressId?: string;
  EmailAddressArn?: string;
  EmailAddress?: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  CreateTimestamp?: string;
  ModifiedTimestamp?: string;
  AliasConfigurations?: AliasConfiguration[];
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeEvaluationFormRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion?: number;
}
export type EvaluationFormVersionIsLocked = boolean;
export type EvaluationFormVersionStatus = "DRAFT" | "ACTIVE" | (string & {});
export type EvaluationFormValidationStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface EvaluationForm {
  EvaluationFormId: string;
  EvaluationFormVersion: number;
  Locked: boolean;
  EvaluationFormArn: string;
  Title: string;
  Description?: string;
  Status: EvaluationFormVersionStatus;
  Items: EvaluationFormItem[];
  ScoringStrategy?: EvaluationFormScoringStrategy;
  CreatedTime: Date;
  CreatedBy: string;
  LastModifiedTime: Date;
  LastModifiedBy: string;
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  ReviewConfiguration?: EvaluationReviewConfiguration;
  Tags?: { [key: string]: string | undefined };
  TargetConfiguration?: EvaluationFormTargetConfiguration;
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
  LatestValidationStatus?: EvaluationFormValidationStatus;
  LastValidationTime?: Date;
}
export interface DescribeEvaluationFormResponse {
  EvaluationForm: EvaluationForm;
}
export interface DescribeExtractionDefinitionRequest {
  InstanceId: string;
  ExtractionDefinitionId: string;
}
export interface ExtractionDefinition {
  Name: string;
  ExtractionDefinitionId: string;
  ExtractionDefinitionArn: string;
  ExtractionConfiguration: ExtractionConfiguration;
  Display?: ExtractionDefinitionDisplay;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  LastUpdatedBy: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeExtractionDefinitionResponse {
  ExtractionDefinition: ExtractionDefinition;
}
export interface DescribeHoursOfOperationRequest {
  InstanceId: string;
  HoursOfOperationId: string;
}
export interface HoursOfOperationsIdentifier {
  Name: string;
  Id: string;
  Arn?: string;
}
export type ParentHoursOfOperationsList = HoursOfOperationsIdentifier[];
export interface HoursOfOperation {
  HoursOfOperationId?: string;
  HoursOfOperationArn?: string;
  Name?: string;
  Description?: string;
  TimeZone?: string;
  Config?: HoursOfOperationConfig[];
  ParentHoursOfOperations?: HoursOfOperationsIdentifier[];
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeHoursOfOperationResponse {
  HoursOfOperation?: HoursOfOperation;
}
export interface DescribeHoursOfOperationOverrideRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  HoursOfOperationOverrideId: string;
}
export interface HoursOfOperationOverride {
  HoursOfOperationOverrideId?: string;
  HoursOfOperationId?: string;
  HoursOfOperationArn?: string;
  Name?: string;
  Description?: string;
  Config?: HoursOfOperationOverrideConfig[];
  EffectiveFrom?: string;
  EffectiveTill?: string;
  RecurrenceConfig?: RecurrenceConfig;
  OverrideType?: OverrideType;
}
export interface DescribeHoursOfOperationOverrideResponse {
  HoursOfOperationOverride?: HoursOfOperationOverride;
}
export interface DescribeInstanceRequest {
  InstanceId: string;
}
export type InstanceStatus =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "CREATION_FAILED"
  | (string & {});
export interface InstanceStatusReason {
  Message?: string;
}
export type Url = string;
export interface Instance {
  Id?: string;
  Arn?: string;
  IdentityManagementType?: DirectoryType;
  InstanceAlias?: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  ServiceRole?: string;
  InstanceStatus?: InstanceStatus;
  StatusReason?: InstanceStatusReason;
  InboundCallsEnabled?: boolean;
  OutboundCallsEnabled?: boolean;
  InstanceAccessUrl?: string;
  Tags?: { [key: string]: string | undefined };
}
export type AwsRegion = string;
export type InstanceReplicationStatus =
  | "INSTANCE_REPLICATION_COMPLETE"
  | "INSTANCE_REPLICATION_IN_PROGRESS"
  | "INSTANCE_REPLICATION_FAILED"
  | "INSTANCE_REPLICA_DELETING"
  | "INSTANCE_REPLICATION_DELETION_FAILED"
  | "RESOURCE_REPLICATION_NOT_STARTED"
  | (string & {});
export type ReplicationStatusReason = string;
export interface ReplicationStatusSummary {
  Region?: string;
  ReplicationStatus?: InstanceReplicationStatus;
  ReplicationStatusReason?: string;
}
export type ReplicationStatusSummaryList = ReplicationStatusSummary[];
export type GlobalSignInEndpoint = string;
export interface ReplicationConfiguration {
  ReplicationStatusSummaryList?: ReplicationStatusSummary[];
  SourceRegion?: string;
  GlobalSignInEndpoint?: string;
}
export interface DescribeInstanceResponse {
  Instance?: Instance;
  ReplicationConfiguration?: ReplicationConfiguration;
}
export type InstanceAttributeType =
  | "INBOUND_CALLS"
  | "OUTBOUND_CALLS"
  | "CONTACTFLOW_LOGS"
  | "CONTACT_LENS"
  | "AUTO_RESOLVE_BEST_VOICES"
  | "USE_CUSTOM_TTS_VOICES"
  | "EARLY_MEDIA"
  | "MULTI_PARTY_CONFERENCE"
  | "HIGH_VOLUME_OUTBOUND"
  | "ENHANCED_CONTACT_MONITORING"
  | "ENHANCED_CHAT_MONITORING"
  | "MULTI_PARTY_CHAT_CONFERENCE"
  | "MESSAGE_STREAMING"
  | (string & {});
export interface DescribeInstanceAttributeRequest {
  InstanceId: string;
  AttributeType: InstanceAttributeType;
}
export type InstanceAttributeValue = string;
export interface Attribute {
  AttributeType?: InstanceAttributeType;
  Value?: string;
}
export interface DescribeInstanceAttributeResponse {
  Attribute?: Attribute;
}
export interface DescribeInstanceStorageConfigRequest {
  InstanceId: string;
  AssociationId: string;
  ResourceType: InstanceStorageResourceType;
}
export interface DescribeInstanceStorageConfigResponse {
  StorageConfig?: InstanceStorageConfig;
}
export interface DescribeMetricRequest {
  InstanceId: string;
  MetricId: string;
}
export type MetricCreationMethod =
  | "SERVICE_LEVEL_BUILDER"
  | "METRIC_BUILDER"
  | (string & {});
export type MetricType = "AWS_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
export type MetricGroupingList = string[];
export type FilterId = string;
export type AvailableFilterType =
  | "METRIC_LEVEL"
  | "RESOURCE_LEVEL"
  | (string & {});
export interface AvailableFilter {
  Id?: string;
  Type?: AvailableFilterType;
}
export type AvailableFilterList = AvailableFilter[];
export type RefreshRate = number;
export type MetricCategory = string;
export type SupportedStatsList = string[];
export type DefaultStat = string;
export type SupportsPreaggregateCalculation = boolean;
export type SupportsCustomCalculation = boolean;
export type PrimaryEventSource = string;
export type PrimaryEventSourceEffectiveTimestampType = string;
export interface MetricDefinition {
  Arn: string;
  Id: string;
  Name: string;
  Description?: string;
  MetricCalculation?: MetricCalculation;
  CreationMethod?: MetricCreationMethod;
  Status?: MetricStatus;
  Type: MetricType;
  Unit: MetricUnit;
  PositiveTrendIndicator?: TrendIndicator;
  Groupings: string[];
  Filters: AvailableFilter[];
  EffectiveTime?: Date;
  RefreshRate?: number;
  Category: string;
  SupportedStats?: string[];
  DefaultStat?: string;
  SupportsPreaggregateCalculation: boolean;
  SupportsCustomCalculation: boolean;
  PrimaryEventSource?: string;
  PrimaryEventSourceEffectiveTimestampType?: string;
  CreatedTime?: Date;
  CreatedUser?: CreatedByInfo;
  LastModifiedRegion?: string;
  LastModifiedTime?: Date;
  LastModifiedUser?: CreatedByInfo;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeMetricResponse {
  Metric: MetricDefinition;
}
export interface DescribeNotificationRequest {
  InstanceId: string;
  NotificationId: string;
}
export type NotificationPriority = "URGENT" | "HIGH" | "LOW" | (string & {});
export interface Notification {
  Content?: { [key: string]: string | undefined };
  Id: string;
  Arn: string;
  Priority?: NotificationPriority;
  Recipients?: string[];
  LastModifiedTime: Date;
  CreatedAt?: Date;
  ExpiresAt?: Date;
  LastModifiedRegion?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeNotificationResponse {
  Notification: Notification;
}
export interface DescribePhoneNumberRequest {
  PhoneNumberId: string;
}
export type PhoneNumberCountryCode =
  | "AF"
  | "AL"
  | "DZ"
  | "AS"
  | "AD"
  | "AO"
  | "AI"
  | "AQ"
  | "AG"
  | "AR"
  | "AM"
  | "AW"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BY"
  | "BE"
  | "BZ"
  | "BJ"
  | "BM"
  | "BT"
  | "BO"
  | "BA"
  | "BW"
  | "BR"
  | "IO"
  | "VG"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "KH"
  | "CM"
  | "CA"
  | "CV"
  | "KY"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CX"
  | "CC"
  | "CO"
  | "KM"
  | "CK"
  | "CR"
  | "HR"
  | "CU"
  | "CW"
  | "CY"
  | "CZ"
  | "CD"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "TL"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "ET"
  | "FK"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "PF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HN"
  | "HK"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IR"
  | "IQ"
  | "IE"
  | "IM"
  | "IL"
  | "IT"
  | "CI"
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MO"
  | "MK"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MR"
  | "MU"
  | "YT"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MS"
  | "MA"
  | "MZ"
  | "MM"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "AN"
  | "NC"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "NU"
  | "KP"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PN"
  | "PL"
  | "PT"
  | "PR"
  | "QA"
  | "CG"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "BL"
  | "SH"
  | "KN"
  | "LC"
  | "MF"
  | "PM"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SX"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "KR"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SJ"
  | "SZ"
  | "SE"
  | "CH"
  | "SY"
  | "TW"
  | "TJ"
  | "TZ"
  | "TH"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "VI"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "US"
  | "UY"
  | "UZ"
  | "VU"
  | "VA"
  | "VE"
  | "VN"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW"
  | (string & {});
export type PhoneNumberType =
  | "TOLL_FREE"
  | "DID"
  | "UIFN"
  | "SHARED"
  | "THIRD_PARTY_TF"
  | "THIRD_PARTY_DID"
  | "SHORT_CODE"
  | (string & {});
export type PhoneNumberWorkflowStatus =
  | "CLAIMED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export type PhoneNumberWorkflowMessage = string;
export interface PhoneNumberStatus {
  Status?: PhoneNumberWorkflowStatus;
  Message?: string;
}
export interface ClaimedPhoneNumberSummary {
  PhoneNumberId?: string;
  PhoneNumberArn?: string;
  PhoneNumber?: string;
  PhoneNumberCountryCode?: PhoneNumberCountryCode;
  PhoneNumberType?: PhoneNumberType;
  PhoneNumberDescription?: string;
  TargetArn?: string;
  InstanceId?: string;
  Tags?: { [key: string]: string | undefined };
  PhoneNumberStatus?: PhoneNumberStatus;
  SourcePhoneNumberArn?: string;
}
export interface DescribePhoneNumberResponse {
  ClaimedPhoneNumberSummary?: ClaimedPhoneNumberSummary;
}
export interface DescribePredefinedAttributeRequest {
  InstanceId: string;
  Name: string;
}
export type IsReadOnly = boolean;
export interface PredefinedAttributeConfiguration {
  EnableValueValidationOnAssociation?: boolean;
  IsReadOnly?: boolean;
}
export interface PredefinedAttribute {
  Name?: string;
  Values?: PredefinedAttributeValues;
  Purposes?: string[];
  AttributeConfiguration?: PredefinedAttributeConfiguration;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribePredefinedAttributeResponse {
  PredefinedAttribute?: PredefinedAttribute;
}
export interface DescribePromptRequest {
  InstanceId: string;
  PromptId: string;
}
export interface Prompt {
  PromptARN?: string;
  PromptId?: string;
  Name?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribePromptResponse {
  Prompt?: Prompt;
}
export interface DescribeQueueRequest {
  InstanceId: string;
  QueueId: string;
}
export type QueueStatus = "ENABLED" | "DISABLED" | (string & {});
export interface Queue {
  Name?: string;
  QueueArn?: string;
  QueueId?: string;
  Description?: string;
  OutboundCallerConfig?: OutboundCallerConfig;
  OutboundEmailConfig?: OutboundEmailConfig;
  HoursOfOperationId?: string;
  MaxContacts?: number;
  Status?: QueueStatus;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeQueueResponse {
  Queue?: Queue;
}
export interface DescribeQuickConnectRequest {
  InstanceId: string;
  QuickConnectId: string;
}
export interface QuickConnect {
  QuickConnectARN?: string;
  QuickConnectId?: string;
  Name?: string;
  Description?: string;
  QuickConnectConfig?: QuickConnectConfig;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeQuickConnectResponse {
  QuickConnect?: QuickConnect;
}
export interface DescribeRoutingProfileRequest {
  InstanceId: string;
  RoutingProfileId: string;
}
export type AssociatedQueueIdList = string[];
export interface RoutingProfile {
  InstanceId?: string;
  Name?: string;
  RoutingProfileArn?: string;
  RoutingProfileId?: string;
  Description?: string;
  MediaConcurrencies?: MediaConcurrency[];
  DefaultOutboundQueueId?: string;
  Tags?: { [key: string]: string | undefined };
  NumberOfAssociatedQueues?: number;
  NumberOfAssociatedManualAssignmentQueues?: number;
  NumberOfAssociatedUsers?: number;
  AgentAvailabilityTimer?: AgentAvailabilityTimer;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
  IsDefault?: boolean;
  AssociatedQueueIds?: string[];
  AssociatedManualAssignmentQueueIds?: string[];
}
export interface DescribeRoutingProfileResponse {
  RoutingProfile?: RoutingProfile;
}
export interface DescribeRuleRequest {
  InstanceId: string;
  RuleId: string;
}
export type RuleCapabilityTier = "GenerativeAI" | (string & {});
export type RuleCapabilityTiers = RuleCapabilityTier[];
export interface Rule {
  Name: string;
  RuleId: string;
  RuleArn: string;
  TriggerEventSource: RuleTriggerEventSource;
  RuleCapabilityTiers?: RuleCapabilityTier[];
  Function: string;
  Actions: RuleAction[];
  PublishStatus: RulePublishStatus;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  LastUpdatedBy: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeRuleResponse {
  Rule: Rule;
}
export interface DescribeSecurityProfileRequest {
  SecurityProfileId: string;
  InstanceId: string;
}
export type SecurityProfileName = string;
export interface SecurityProfile {
  Id?: string;
  OrganizationResourceId?: string;
  Arn?: string;
  SecurityProfileName?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  AllowedAccessControlTags?: { [key: string]: string | undefined };
  TagRestrictedResources?: string[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
  HierarchyRestrictedResources?: string[];
  AllowedAccessControlHierarchyGroupId?: string;
  GranularAccessControlConfiguration?: GranularAccessControlConfiguration;
}
export interface DescribeSecurityProfileResponse {
  SecurityProfile?: SecurityProfile;
}
export interface DescribeTestCaseRequest {
  InstanceId: string;
  TestCaseId: string;
  Status?: TestCaseStatus;
}
export type TestCaseSha256 = string;
export interface TestCase {
  Arn?: string;
  Id?: string;
  Name?: string;
  Content?: string;
  EntryPoint?: TestCaseEntryPoint;
  InitializationData?: string;
  Description?: string;
  Status?: TestCaseStatus;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
  Tags?: { [key: string]: string | undefined };
  TestCaseSha256?: string;
}
export interface DescribeTestCaseResponse {
  TestCase?: TestCase;
}
export interface DescribeTrafficDistributionGroupRequest {
  TrafficDistributionGroupId: string;
}
export type InstanceArn = string;
export type TrafficDistributionGroupStatus =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "CREATION_FAILED"
  | "PENDING_DELETION"
  | "DELETION_FAILED"
  | "UPDATE_IN_PROGRESS"
  | (string & {});
export interface TrafficDistributionGroup {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  InstanceArn?: string;
  Status?: TrafficDistributionGroupStatus;
  Tags?: { [key: string]: string | undefined };
  IsDefault?: boolean;
}
export interface DescribeTrafficDistributionGroupResponse {
  TrafficDistributionGroup?: TrafficDistributionGroup;
}
export interface DescribeUserRequest {
  UserId: string;
  InstanceId: string;
}
export interface User {
  Id?: string;
  Arn?: string;
  Username?: string;
  IdentityInfo?: UserIdentityInfo;
  PhoneConfig?: UserPhoneConfig;
  DirectoryUserId?: string;
  SecurityProfileIds?: string[];
  RoutingProfileId?: string;
  HierarchyGroupId?: string;
  Tags?: { [key: string]: string | undefined };
  AutoAcceptConfigs?: AutoAcceptConfig[];
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  PhoneNumberConfigs?: PhoneNumberConfig[];
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeUserResponse {
  User?: User;
}
export interface DescribeUserHierarchyGroupRequest {
  HierarchyGroupId: string;
  InstanceId: string;
}
export type HierarchyLevelId = string;
export interface HierarchyGroupSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface HierarchyPath {
  LevelOne?: HierarchyGroupSummary;
  LevelTwo?: HierarchyGroupSummary;
  LevelThree?: HierarchyGroupSummary;
  LevelFour?: HierarchyGroupSummary;
  LevelFive?: HierarchyGroupSummary;
}
export interface HierarchyGroup {
  Id?: string;
  Arn?: string;
  Name?: string;
  LevelId?: string;
  HierarchyPath?: HierarchyPath;
  Tags?: { [key: string]: string | undefined };
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface DescribeUserHierarchyGroupResponse {
  HierarchyGroup?: HierarchyGroup;
}
export interface DescribeUserHierarchyStructureRequest {
  InstanceId: string;
}
export type HierarchyLevelName = string;
export interface HierarchyLevel {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface HierarchyStructure {
  LevelOne?: HierarchyLevel;
  LevelTwo?: HierarchyLevel;
  LevelThree?: HierarchyLevel;
  LevelFour?: HierarchyLevel;
  LevelFive?: HierarchyLevel;
}
export interface DescribeUserHierarchyStructureResponse {
  HierarchyStructure?: HierarchyStructure;
}
export interface DescribeViewRequest {
  InstanceId: string;
  ViewId: string;
}
export interface DescribeViewResponse {
  View?: View;
}
export interface DescribeVocabularyRequest {
  InstanceId: string;
  VocabularyId: string;
}
export type VocabularyLastModifiedTime = Date;
export type VocabularyFailureReason = string;
export interface Vocabulary {
  Name: string;
  Id: string;
  Arn: string;
  LanguageCode: VocabularyLanguageCode;
  State: VocabularyState;
  LastModifiedTime: Date;
  FailureReason?: string;
  Content?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeVocabularyResponse {
  Vocabulary: Vocabulary;
}
export interface DescribeWorkspaceRequest {
  InstanceId: string;
  WorkspaceId: string;
}
export type Visibility = "ALL" | "ASSIGNED" | "NONE" | (string & {});
export interface Workspace {
  Visibility?: Visibility;
  Id: string;
  Name: string;
  Arn: string;
  Description?: string;
  Theme?: WorkspaceTheme;
  Title?: string;
  LastModifiedTime: Date;
  LastModifiedRegion?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeWorkspaceResponse {
  Workspace: Workspace;
}
export interface DisassociateAnalyticsDataSetRequest {
  InstanceId: string;
  DataSetId: string;
  TargetAccountId?: string;
}
export interface DisassociateAnalyticsDataSetResponse {}
export interface DisassociateApprovedOriginRequest {
  InstanceId: string;
  Origin: string;
  ClientToken?: string;
}
export interface DisassociateApprovedOriginResponse {}
export interface DisassociateBotRequest {
  InstanceId: string;
  LexBot?: LexBot;
  LexV2Bot?: LexV2Bot;
  ClientToken?: string;
}
export interface DisassociateBotResponse {}
export interface DisassociateEmailAddressAliasRequest {
  EmailAddressId: string;
  InstanceId: string;
  AliasConfiguration: AliasConfiguration;
  ClientToken?: string;
}
export interface DisassociateEmailAddressAliasResponse {}
export interface DisassociateFlowRequest {
  InstanceId: string;
  ResourceId: string;
  ResourceType: FlowAssociationResourceType;
}
export interface DisassociateFlowResponse {}
export type ParentHoursOfOperationIdList = string[];
export interface DisassociateHoursOfOperationsRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  ParentHoursOfOperationIds: string[];
}
export interface DisassociateHoursOfOperationsResponse {}
export interface DisassociateInstanceStorageConfigRequest {
  InstanceId: string;
  AssociationId: string;
  ResourceType: InstanceStorageResourceType;
  ClientToken?: string;
}
export interface DisassociateInstanceStorageConfigResponse {}
export interface DisassociateLambdaFunctionRequest {
  InstanceId: string;
  FunctionArn: string;
  ClientToken?: string;
}
export interface DisassociateLambdaFunctionResponse {}
export interface DisassociateLexBotRequest {
  InstanceId: string;
  BotName: string;
  LexRegion: string;
  ClientToken?: string;
}
export interface DisassociateLexBotResponse {}
export interface DisassociatePhoneNumberContactFlowRequest {
  PhoneNumberId: string;
  InstanceId: string;
}
export interface DisassociatePhoneNumberContactFlowResponse {}
export type EmailAddressIdList = string[];
export interface DisassociateQueueEmailAddressesRequest {
  InstanceId: string;
  QueueId: string;
  EmailAddressesId: string[];
  ClientToken?: string;
}
export interface DisassociateQueueEmailAddressesResponse {}
export interface DisassociateQueueQuickConnectsRequest {
  InstanceId: string;
  QueueId: string;
  QuickConnectIds: string[];
}
export interface DisassociateQueueQuickConnectsResponse {}
export type RoutingProfileQueueReferenceList = RoutingProfileQueueReference[];
export interface DisassociateRoutingProfileQueuesRequest {
  InstanceId: string;
  RoutingProfileId: string;
  QueueReferences?: RoutingProfileQueueReference[];
  ManualAssignmentQueueReferences?: RoutingProfileQueueReference[];
}
export interface DisassociateRoutingProfileQueuesResponse {}
export interface DisassociateSecurityKeyRequest {
  InstanceId: string;
  AssociationId: string;
  ClientToken?: string;
}
export interface DisassociateSecurityKeyResponse {}
export interface DisassociateSecurityProfilesRequest {
  InstanceId: string;
  SecurityProfiles: SecurityProfileItem[];
  EntityType: EntityType;
  EntityArn: string;
}
export interface DisassociateSecurityProfilesResponse {}
export interface DisassociateTrafficDistributionGroupUserRequest {
  TrafficDistributionGroupId: string;
  UserId: string;
  InstanceId: string;
}
export interface DisassociateTrafficDistributionGroupUserResponse {}
export interface UserProficiencyDisassociate {
  AttributeName: string;
  AttributeValue: string;
}
export type UserProficiencyDisassociateList = UserProficiencyDisassociate[];
export interface DisassociateUserProficienciesRequest {
  InstanceId: string;
  UserId: string;
  UserProficiencies: UserProficiencyDisassociate[];
}
export interface DisassociateUserProficienciesResponse {}
export interface DisassociateWorkspaceRequest {
  InstanceId: string;
  WorkspaceId: string;
  ResourceArns: string[];
}
export interface DisassociateWorkspaceResponse {
  SuccessfulList?: SuccessfulBatchAssociationSummary[];
  FailedList?: FailedBatchAssociationSummary[];
}
export interface DismissUserContactRequest {
  UserId: string;
  InstanceId: string;
  ContactId: string;
}
export interface DismissUserContactResponse {}
export type AttributeNameList = string[];
export interface DataTableValueEvaluationSet {
  PrimaryValues?: PrimaryValue[];
  AttributeNames: string[];
}
export type DataTableValueEvaluationSetList = DataTableValueEvaluationSet[];
export type NextToken = string;
export type MaxResult100 = number;
export interface EvaluateDataTableValuesRequest {
  InstanceId: string;
  DataTableId: string;
  Values: DataTableValueEvaluationSet[];
  TimeZone?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataTableEvaluatedValue {
  RecordId: string;
  PrimaryValues: PrimaryValue[];
  AttributeName: string;
  ValueType: DataTableAttributeValueType;
  Found: boolean;
  Error: boolean;
  EvaluatedValue: string;
}
export type DataTableEvaluatedValueList = DataTableEvaluatedValue[];
export interface EvaluateDataTableValuesResponse {
  Values: DataTableEvaluatedValue[];
  NextToken?: string;
}
export type URLExpiryInSeconds = number;
export interface GetAttachedFileRequest {
  InstanceId: string;
  FileId: string;
  UrlExpiryInSeconds?: number;
  AssociatedResourceArn: string;
}
export type MetadataUrl = string;
export interface DownloadUrlMetadata {
  Url?: string;
  UrlExpiry?: string;
}
export interface GetAttachedFileResponse {
  FileArn?: string;
  FileId?: string;
  CreationTime?: string;
  FileStatus?: FileStatusType;
  FileName?: string;
  FileSizeInBytes: number;
  AssociatedResourceArn?: string;
  FileUseCaseType?: FileUseCaseType;
  CreatedBy?: CreatedByInfo;
  DownloadUrlMetadata?: DownloadUrlMetadata;
  Tags?: { [key: string]: string | undefined };
}
export interface GetContactAttributesRequest {
  InstanceId: string;
  InitialContactId: string;
}
export interface GetContactAttributesResponse {
  Attributes?: { [key: string]: string | undefined };
}
export type ContactMetricName =
  | "ESTIMATED_WAIT_TIME"
  | "POSITION_IN_QUEUE"
  | (string & {});
export interface ContactMetricInfo {
  Name: ContactMetricName;
}
export type ContactMetrics = ContactMetricInfo[];
export interface GetContactMetricsRequest {
  InstanceId: string;
  ContactId: string;
  Metrics: ContactMetricInfo[];
}
export type ContactMetricValue = { Number: number };
export interface ContactMetricResult {
  Name: ContactMetricName;
  Value: ContactMetricValue;
}
export type ContactMetricResults = ContactMetricResult[];
export interface GetContactMetricsResponse {
  MetricResults?: ContactMetricResult[];
  Id?: string;
  Arn?: string;
}
export type Queues = string[];
export type Channels = Channel[];
export type RoutingProfiles = string[];
export type RoutingExpression = string;
export type RoutingExpressions = string[];
export type AgentStatuses = string[];
export type Subtype = string;
export type Subtypes = string[];
export type ValidationTestType = string;
export type ValidationTestTypes = string[];
export interface Filters {
  Queues?: string[];
  Channels?: Channel[];
  RoutingProfiles?: string[];
  RoutingStepExpressions?: string[];
  AgentStatuses?: string[];
  Subtypes?: string[];
  ValidationTestTypes?: string[];
}
export type Grouping =
  | "QUEUE"
  | "CHANNEL"
  | "ROUTING_PROFILE"
  | "ROUTING_STEP_EXPRESSION"
  | "AGENT_STATUS"
  | "SUBTYPE"
  | "VALIDATION_TEST_TYPE"
  | (string & {});
export type Groupings = Grouping[];
export type CurrentMetricName =
  | "AGENTS_ONLINE"
  | "AGENTS_AVAILABLE"
  | "AGENTS_ON_CALL"
  | "AGENTS_NON_PRODUCTIVE"
  | "AGENTS_AFTER_CONTACT_WORK"
  | "AGENTS_ERROR"
  | "AGENTS_STAFFED"
  | "CONTACTS_IN_QUEUE"
  | "OLDEST_CONTACT_AGE"
  | "CONTACTS_SCHEDULED"
  | "AGENTS_ON_CONTACT"
  | "SLOTS_ACTIVE"
  | "SLOTS_AVAILABLE"
  | "ESTIMATED_WAIT_TIME"
  | (string & {});
export type CurrentMetricId = string;
export type Unit = "SECONDS" | "COUNT" | "PERCENT" | (string & {});
export interface CurrentMetric {
  Name?: CurrentMetricName;
  MetricId?: string;
  Unit?: Unit;
}
export type CurrentMetrics = CurrentMetric[];
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface CurrentMetricSortCriteria {
  SortByMetric?: CurrentMetricName;
  SortOrder?: SortOrder;
}
export type CurrentMetricSortCriteriaMaxOne = CurrentMetricSortCriteria[];
export interface GetCurrentMetricDataRequest {
  InstanceId: string;
  Filters: Filters;
  Groupings?: Grouping[];
  CurrentMetrics: CurrentMetric[];
  NextToken?: string;
  MaxResults?: number;
  SortCriteria?: CurrentMetricSortCriteria[];
}
export interface QueueReference {
  Id?: string;
  Arn?: string;
}
export interface RoutingProfileReference {
  Id?: string;
  Arn?: string;
}
export interface AgentStatusIdentifier {
  Arn?: string;
  Id?: string;
}
export interface Dimensions {
  Queue?: QueueReference;
  Channel?: Channel;
  RoutingProfile?: RoutingProfileReference;
  RoutingStepExpression?: string;
  AgentStatus?: AgentStatusIdentifier;
  Subtype?: string;
  ValidationTestType?: string;
}
export type Value = number;
export interface CurrentMetricData {
  Metric?: CurrentMetric;
  Value?: number;
}
export type CurrentMetricDataCollections = CurrentMetricData[];
export interface CurrentMetricResult {
  Dimensions?: Dimensions;
  Collections?: CurrentMetricData[];
}
export type CurrentMetricResults = CurrentMetricResult[];
export type ApproximateTotalCount = number;
export interface GetCurrentMetricDataResponse {
  NextToken?: string;
  MetricResults?: CurrentMetricResult[];
  DataSnapshotTime?: Date;
  ApproximateTotalCount?: number;
}
export type ContactState =
  | "INCOMING"
  | "PENDING"
  | "CONNECTING"
  | "CONNECTED"
  | "CONNECTED_ONHOLD"
  | "MISSED"
  | "ERROR"
  | "ENDED"
  | "REJECTED"
  | (string & {});
export type ContactStates = ContactState[];
export interface ContactFilter {
  ContactStates?: ContactState[];
}
export type AgentsMinOneMaxHundred = string[];
export type UserDataHierarchyGroups = string[];
export interface UserDataFilters {
  Queues?: string[];
  ContactFilter?: ContactFilter;
  RoutingProfiles?: string[];
  Agents?: string[];
  UserHierarchyGroups?: string[];
}
export interface GetCurrentUserDataRequest {
  InstanceId: string;
  Filters: UserDataFilters;
  NextToken?: string;
  MaxResults?: number;
}
export interface UserReference {
  Id?: string;
  Arn?: string;
}
export interface HierarchyGroupSummaryReference {
  Id?: string;
  Arn?: string;
}
export interface HierarchyPathReference {
  LevelOne?: HierarchyGroupSummaryReference;
  LevelTwo?: HierarchyGroupSummaryReference;
  LevelThree?: HierarchyGroupSummaryReference;
  LevelFour?: HierarchyGroupSummaryReference;
  LevelFive?: HierarchyGroupSummaryReference;
}
export interface AgentStatusReference {
  StatusStartTimestamp?: Date;
  StatusArn?: string;
  StatusName?: string;
}
export type IntegerCount = number;
export type ChannelToCountMap = { [key in Channel]?: number };
export interface AgentContactReference {
  ContactId?: string;
  Channel?: Channel;
  InitiationMethod?: ContactInitiationMethod;
  AgentContactState?: ContactState;
  StateStartTimestamp?: Date;
  ConnectedToAgentTimestamp?: Date;
  Queue?: QueueReference;
}
export type AgentContactReferenceList = AgentContactReference[];
export interface UserData {
  User?: UserReference;
  RoutingProfile?: RoutingProfileReference;
  HierarchyPath?: HierarchyPathReference;
  Status?: AgentStatusReference;
  AvailableSlotsByChannel?: { [key: string]: number | undefined };
  MaxSlotsByChannel?: { [key: string]: number | undefined };
  ActiveSlotsByChannel?: { [key: string]: number | undefined };
  Contacts?: AgentContactReference[];
  NextStatus?: string;
}
export type UserDataList = UserData[];
export interface GetCurrentUserDataResponse {
  NextToken?: string;
  UserDataList?: UserData[];
  ApproximateTotalCount?: number;
}
export interface GetEffectiveHoursOfOperationsRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  FromDate: string;
  ToDate: string;
}
export interface OperationalHour {
  Start?: OverrideTimeSlice;
  End?: OverrideTimeSlice;
}
export type OperationalHours = OperationalHour[];
export interface EffectiveHoursOfOperations {
  Date?: string;
  OperationalHours?: OperationalHour[];
}
export type EffectiveHoursOfOperationList = EffectiveHoursOfOperations[];
export type OperationalStatus = "OPEN" | "CLOSED" | (string & {});
export interface OverrideHour {
  Start?: OverrideTimeSlice;
  End?: OverrideTimeSlice;
  OverrideName?: string;
  OperationalStatus?: OperationalStatus;
}
export type OverrideHours = OverrideHour[];
export interface EffectiveOverrideHours {
  Date?: string;
  OverrideHours?: OverrideHour[];
}
export type EffectiveOverrideHoursList = EffectiveOverrideHours[];
export interface GetEffectiveHoursOfOperationsResponse {
  EffectiveHoursOfOperationList?: EffectiveHoursOfOperations[];
  EffectiveOverrideHoursList?: EffectiveOverrideHours[];
  TimeZone?: string;
}
export interface GetEvaluationFormValidationRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion?: number;
}
export type EvaluationFormValidationFailureReason = string;
export type EvaluationFormValidationIssueCode = string;
export type EvaluationFormValidationFindingItemProperty = string;
export interface EvaluationFormValidationFindingItem {
  RefId?: string;
  Property?: string;
}
export type EvaluationFormValidationFindingItemList =
  EvaluationFormValidationFindingItem[];
export type EvaluationFormValidationFindingDescription = string;
export type EvaluationFormValidationFindingSuggestion = string;
export type EvaluationFormValidationFindingSeverity =
  | "WARNING"
  | "ERROR"
  | (string & {});
export interface EvaluationFormValidationFinding {
  IssueCode: string;
  Items?: EvaluationFormValidationFindingItem[];
  Description: string;
  Suggestion?: string;
  Severity: EvaluationFormValidationFindingSeverity;
}
export type EvaluationFormValidationFindingList =
  EvaluationFormValidationFinding[];
export interface GetEvaluationFormValidationResponse {
  Status: EvaluationFormValidationStatus;
  FailureReason?: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
  StartedTime: Date;
  Findings?: EvaluationFormValidationFinding[];
}
export interface GetFederationTokenRequest {
  InstanceId: string;
}
export type SecurityToken = string | redacted.Redacted<string>;
export interface Credentials {
  AccessToken?: string | redacted.Redacted<string>;
  AccessTokenExpiration?: Date;
  RefreshToken?: string | redacted.Redacted<string>;
  RefreshTokenExpiration?: Date;
}
export interface GetFederationTokenResponse {
  UserId?: string;
  UserArn?: string;
  Credentials?: Credentials;
  SignInUrl?: string;
}
export interface GetFlowAssociationRequest {
  InstanceId: string;
  ResourceId: string;
  ResourceType: FlowAssociationResourceType;
}
export interface GetFlowAssociationResponse {
  ResourceId?: string;
  FlowId?: string;
  ResourceType?: FlowAssociationResourceType;
}
export type HistoricalMetricName =
  | "CONTACTS_QUEUED"
  | "CONTACTS_HANDLED"
  | "CONTACTS_ABANDONED"
  | "CONTACTS_CONSULTED"
  | "CONTACTS_AGENT_HUNG_UP_FIRST"
  | "CONTACTS_HANDLED_INCOMING"
  | "CONTACTS_HANDLED_OUTBOUND"
  | "CONTACTS_HOLD_ABANDONS"
  | "CONTACTS_TRANSFERRED_IN"
  | "CONTACTS_TRANSFERRED_OUT"
  | "CONTACTS_TRANSFERRED_IN_FROM_QUEUE"
  | "CONTACTS_TRANSFERRED_OUT_FROM_QUEUE"
  | "CONTACTS_MISSED"
  | "CALLBACK_CONTACTS_HANDLED"
  | "API_CONTACTS_HANDLED"
  | "OCCUPANCY"
  | "HANDLE_TIME"
  | "AFTER_CONTACT_WORK_TIME"
  | "QUEUED_TIME"
  | "ABANDON_TIME"
  | "QUEUE_ANSWER_TIME"
  | "HOLD_TIME"
  | "INTERACTION_TIME"
  | "INTERACTION_AND_HOLD_TIME"
  | "SERVICE_LEVEL"
  | (string & {});
export type Comparison = "LT" | (string & {});
export type ThresholdValue = number;
export interface Threshold {
  Comparison?: Comparison;
  ThresholdValue?: number;
}
export type Statistic = "SUM" | "MAX" | "AVG" | (string & {});
export interface HistoricalMetric {
  Name?: HistoricalMetricName;
  Threshold?: Threshold;
  Statistic?: Statistic;
  Unit?: Unit;
}
export type HistoricalMetrics = HistoricalMetric[];
export interface GetMetricDataRequest {
  InstanceId: string;
  StartTime: Date;
  EndTime: Date;
  Filters: Filters;
  Groupings?: Grouping[];
  HistoricalMetrics: HistoricalMetric[];
  NextToken?: string;
  MaxResults?: number;
}
export interface HistoricalMetricData {
  Metric?: HistoricalMetric;
  Value?: number;
}
export type HistoricalMetricDataCollections = HistoricalMetricData[];
export interface HistoricalMetricResult {
  Dimensions?: Dimensions;
  Collections?: HistoricalMetricData[];
}
export type HistoricalMetricResults = HistoricalMetricResult[];
export interface GetMetricDataResponse {
  NextToken?: string;
  MetricResults?: HistoricalMetricResult[];
}
export type IntervalPeriod =
  | "FIFTEEN_MIN"
  | "THIRTY_MIN"
  | "HOUR"
  | "DAY"
  | "WEEK"
  | "TOTAL"
  | (string & {});
export interface IntervalDetails {
  TimeZone?: string;
  IntervalPeriod?: IntervalPeriod;
}
export type ResourceArnOrId = string;
export type FilterValueList = string[];
export type FilterV2StringConditionComparisonOperator =
  | "NOT_EXISTS"
  | (string & {});
export interface FilterV2StringCondition {
  Comparison?: FilterV2StringConditionComparisonOperator;
}
export interface FilterV2 {
  FilterKey?: string;
  FilterValues?: string[];
  StringCondition?: FilterV2StringCondition;
}
export type FiltersV2List = FilterV2[];
export type GroupingV2 = string;
export type GroupingsV2 = string[];
export type MetricNameV2 = string;
export interface ThresholdV2 {
  Comparison?: string;
  ThresholdValue?: number;
}
export type ThresholdCollections = ThresholdV2[];
export type MetricFilterValueList = string[];
export interface MetricFilterV2 {
  MetricFilterKey?: string;
  MetricFilterValues?: string[];
  Negate?: boolean;
}
export type MetricFiltersV2List = MetricFilterV2[];
export interface MetricV2 {
  Name?: string;
  Threshold?: ThresholdV2[];
  MetricId?: string;
  MetricFilters?: MetricFilterV2[];
}
export type MetricsV2 = MetricV2[];
export type NextToken2500 = string;
export interface GetMetricDataV2Request {
  ResourceArn: string;
  StartTime: Date;
  EndTime: Date;
  Interval?: IntervalDetails;
  Filters: FilterV2[];
  Groupings?: string[];
  Metrics: MetricV2[];
  NextToken?: string;
  MaxResults?: number;
}
export type DimensionsV2Key = string;
export type DimensionsV2Value = string;
export type DimensionsV2Map = { [key: string]: string | undefined };
export interface MetricInterval {
  Interval?: IntervalPeriod;
  StartTime?: Date;
  EndTime?: Date;
}
export interface MetricDataV2 {
  Metric?: MetricV2;
  Value?: number;
}
export type MetricDataCollectionsV2 = MetricDataV2[];
export interface MetricResultV2 {
  Dimensions?: { [key: string]: string | undefined };
  MetricInterval?: MetricInterval;
  Collections?: MetricDataV2[];
}
export type MetricResultsV2 = MetricResultV2[];
export interface GetMetricDataV2Response {
  NextToken?: string;
  MetricResults?: MetricResultV2[];
}
export interface GetPromptFileRequest {
  InstanceId: string;
  PromptId: string;
}
export type PromptPresignedUrl = string;
export interface GetPromptFileResponse {
  PromptPresignedUrl?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type SnapshotVersion = string;
export interface GetTaskTemplateRequest {
  InstanceId: string;
  TaskTemplateId: string;
  SnapshotVersion?: string;
}
export interface GetTaskTemplateResponse {
  InstanceId?: string;
  Id: string;
  Arn: string;
  Name: string;
  Description?: string;
  ContactFlowId?: string;
  SelfAssignFlowId?: string;
  Constraints?: TaskTemplateConstraints;
  Defaults?: TaskTemplateDefaults;
  Fields?: TaskTemplateField[];
  Status?: TaskTemplateStatus;
  LastModifiedTime?: Date;
  CreatedTime?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type TestCaseExecutionId = string;
export interface GetTestCaseExecutionSummaryRequest {
  InstanceId: string;
  TestCaseId: string;
  TestCaseExecutionId: string;
}
export type TestCaseExecutionStatus =
  | "INITIATED"
  | "PASSED"
  | "FAILED"
  | "IN_PROGRESS"
  | "STOPPED"
  | (string & {});
export interface ObservationSummary {
  TotalObservations?: number;
  ObservationsPassed?: number;
  ObservationsFailed?: number;
}
export interface GetTestCaseExecutionSummaryResponse {
  StartTime?: Date;
  EndTime?: Date;
  Status?: TestCaseExecutionStatus;
  ObservationSummary?: ObservationSummary;
}
export interface GetTrafficDistributionRequest {
  Id: string;
}
export type Percentage = number;
export interface Distribution {
  Region: string;
  Percentage: number;
}
export type DistributionList = Distribution[];
export interface TelephonyConfig {
  Distributions: Distribution[];
}
export interface SignInDistribution {
  Region: string;
  Enabled: boolean;
}
export type SignInDistributionList = SignInDistribution[];
export interface SignInConfig {
  Distributions: SignInDistribution[];
}
export interface AgentConfig {
  Distributions: Distribution[];
}
export interface GetTrafficDistributionResponse {
  TelephonyConfig?: TelephonyConfig;
  Id?: string;
  Arn?: string;
  SignInConfig?: SignInConfig;
  AgentConfig?: AgentConfig;
}
export interface ImportPhoneNumberRequest {
  InstanceId: string;
  SourcePhoneNumberArn: string;
  PhoneNumberDescription?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface ImportPhoneNumberResponse {
  PhoneNumberId?: string;
  PhoneNumberArn?: string;
}
export type MediaSource = string;
export interface ImportWorkspaceMediaRequest {
  InstanceId: string;
  WorkspaceId: string;
  MediaType: MediaType;
  MediaSource: string;
}
export interface ImportWorkspaceMediaResponse {}
export type MaxResult1000 = number;
export type AgentStatusTypes = AgentStatusType[];
export interface ListAgentStatusRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  AgentStatusTypes?: AgentStatusType[];
}
export interface AgentStatusSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  Type?: AgentStatusType;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type AgentStatusSummaryList = AgentStatusSummary[];
export interface ListAgentStatusResponse {
  NextToken?: string;
  AgentStatusSummaryList?: AgentStatusSummary[];
}
export interface ListAnalyticsDataAssociationsRequest {
  InstanceId: string;
  DataSetId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAnalyticsDataAssociationsResponse {
  Results?: AnalyticsDataAssociationResult[];
  NextToken?: string;
}
export interface ListAnalyticsDataLakeDataSetsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AnalyticsDataSetsResult {
  DataSetId?: string;
  DataSetName?: string;
}
export type AnalyticsDataSetsResults = AnalyticsDataSetsResult[];
export interface ListAnalyticsDataLakeDataSetsResponse {
  Results?: AnalyticsDataSetsResult[];
  NextToken?: string;
}
export type MaxResult25 = number;
export interface ListApprovedOriginsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type OriginsList = string[];
export interface ListApprovedOriginsResponse {
  Origins?: string[];
  NextToken?: string;
}
export type ListAssociatedContactsRequestMaxResults = number;
export interface ListAssociatedContactsRequest {
  InstanceId: string;
  ContactId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AssociatedContactSummary {
  ContactId?: string;
  ContactArn?: string;
  InitiationTimestamp?: Date;
  DisconnectTimestamp?: Date;
  InitialContactId?: string;
  PreviousContactId?: string;
  RelatedContactId?: string;
  InitiationMethod?: ContactInitiationMethod;
  Channel?: Channel;
}
export type AssociatedContactSummaryList = AssociatedContactSummary[];
export interface ListAssociatedContactsResponse {
  ContactSummaryList?: AssociatedContactSummary[];
  NextToken?: string;
}
export interface ListAttachedFilesConfigurationsRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AttachedFilesConfigurationSummary {
  InstanceId: string;
  AttachmentScope: AttachmentScope;
  MaximumSizeLimitInBytes?: number;
  ExtensionConfiguration?: ExtensionConfiguration;
}
export type AttachedFilesConfigurationSummaryList =
  AttachedFilesConfigurationSummary[];
export interface ListAttachedFilesConfigurationsResponse {
  AttachedFilesConfigurations?: AttachedFilesConfigurationSummary[];
  NextToken?: string;
}
export interface ListAuthenticationProfilesRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AuthenticationProfileSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  IsDefault?: boolean;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type AuthenticationProfileSummaryList = AuthenticationProfileSummary[];
export interface ListAuthenticationProfilesResponse {
  AuthenticationProfileSummaryList?: AuthenticationProfileSummary[];
  NextToken?: string;
}
export type LexVersion = "V1" | "V2" | (string & {});
export interface ListBotsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  LexVersion: LexVersion;
}
export interface LexBotConfig {
  LexBot?: LexBot;
  LexV2Bot?: LexV2Bot;
}
export type LexBotConfigList = LexBotConfig[];
export interface ListBotsResponse {
  LexBots?: LexBotConfig[];
  NextToken?: string;
}
export interface ListChildHoursOfOperationsRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ChildHoursOfOperationsList = HoursOfOperationsIdentifier[];
export interface ListChildHoursOfOperationsResponse {
  NextToken?: string;
  ChildHoursOfOperationsSummaryList?: HoursOfOperationsIdentifier[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListContactEvaluationsRequest {
  InstanceId: string;
  ContactId: string;
  NextToken?: string;
}
export interface EvaluationAcknowledgementSummary {
  AcknowledgedTime?: Date;
  AcknowledgedBy?: string;
  AcknowledgerComment?: string;
}
export interface EvaluationSummary {
  EvaluationId: string;
  EvaluationArn: string;
  EvaluationFormTitle: string;
  EvaluationFormId: string;
  CalibrationSessionId?: string;
  Status: EvaluationStatus;
  AutoEvaluationEnabled?: boolean;
  AutoEvaluationStatus?: AutoEvaluationStatus;
  EvaluatorArn: string;
  Score?: EvaluationScore;
  Acknowledgement?: EvaluationAcknowledgementSummary;
  EvaluationType?: EvaluationType;
  CreatedTime: Date;
  LastModifiedTime: Date;
  ContactParticipant?: EvaluationContactParticipant;
}
export type EvaluationSummaryList = EvaluationSummary[];
export interface ListContactEvaluationsResponse {
  EvaluationSummaryList: EvaluationSummary[];
  NextToken?: string;
}
export interface ListContactFlowModuleAliasesRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContactFlowModuleAliasSummary {
  Arn?: string;
  AliasId?: string;
  Version?: number;
  AliasName?: string;
  AliasDescription?: string;
  LastModifiedTime?: Date;
}
export type ContactFlowModuleAliasSummaryList = ContactFlowModuleAliasSummary[];
export interface ListContactFlowModuleAliasesResponse {
  ContactFlowModuleAliasSummaryList?: ContactFlowModuleAliasSummary[];
  NextToken?: string;
}
export interface ListContactFlowModulesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  ContactFlowModuleState?: ContactFlowModuleState;
}
export interface ContactFlowModuleSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  State?: ContactFlowModuleState;
}
export type ContactFlowModulesSummaryList = ContactFlowModuleSummary[];
export interface ListContactFlowModulesResponse {
  ContactFlowModulesSummaryList?: ContactFlowModuleSummary[];
  NextToken?: string;
}
export interface ListContactFlowModuleVersionsRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContactFlowModuleVersionSummary {
  Arn?: string;
  VersionDescription?: string;
  Version?: number;
}
export type ContactFlowModuleVersionSummaryList =
  ContactFlowModuleVersionSummary[];
export interface ListContactFlowModuleVersionsResponse {
  ContactFlowModuleVersionSummaryList?: ContactFlowModuleVersionSummary[];
  NextToken?: string;
}
export type ContactFlowTypes = ContactFlowType[];
export interface ListContactFlowsRequest {
  InstanceId: string;
  ContactFlowTypes?: ContactFlowType[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ContactFlowSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  ContactFlowType?: ContactFlowType;
  ContactFlowState?: ContactFlowState;
  ContactFlowStatus?: ContactFlowStatus;
}
export type ContactFlowSummaryList = ContactFlowSummary[];
export interface ListContactFlowsResponse {
  ContactFlowSummaryList?: ContactFlowSummary[];
  NextToken?: string;
}
export interface ListContactFlowVersionsRequest {
  InstanceId: string;
  ContactFlowId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContactFlowVersionSummary {
  Arn?: string;
  VersionDescription?: string;
  Version?: number;
}
export type ContactFlowVersionSummaryList = ContactFlowVersionSummary[];
export interface ListContactFlowVersionsResponse {
  ContactFlowVersionSummaryList?: ContactFlowVersionSummary[];
  NextToken?: string;
}
export type ReferenceTypes = ReferenceType[];
export interface ListContactReferencesRequest {
  InstanceId: string;
  ContactId: string;
  ReferenceTypes: ReferenceType[];
  NextToken?: string;
}
export interface UrlReference {
  Name?: string;
  Value?: string;
}
export interface AttachmentReference {
  Name?: string;
  Value?: string;
  Status?: ReferenceStatus;
  Arn?: string;
}
export interface EmailMessageReference {
  Name?: string;
  Arn?: string;
}
export interface StringReference {
  Name?: string;
  Value?: string;
}
export interface NumberReference {
  Name?: string;
  Value?: string;
}
export interface DateReference {
  Name?: string;
  Value?: string;
}
export interface EmailReference {
  Name?: string;
  Value?: string;
}
export type ReferenceSummary =
  | {
      Url: UrlReference;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment: AttachmentReference;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage: EmailMessageReference;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted: EmailMessageReference;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText: EmailMessageReference;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted: EmailMessageReference;
      String?: never;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String: StringReference;
      Number?: never;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number: NumberReference;
      Date?: never;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date: DateReference;
      Email?: never;
    }
  | {
      Url?: never;
      Attachment?: never;
      EmailMessage?: never;
      EmailMessageRedacted?: never;
      EmailMessagePlainText?: never;
      EmailMessagePlainTextRedacted?: never;
      String?: never;
      Number?: never;
      Date?: never;
      Email: EmailReference;
    };
export type ReferenceSummaryList = ReferenceSummary[];
export interface ListContactReferencesResponse {
  ReferenceSummaryList?: ReferenceSummary[];
  NextToken?: string;
}
export type AttributeIds = string[];
export interface ListDataTableAttributesRequest {
  InstanceId: string;
  DataTableId: string;
  AttributeIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type AttributeList = DataTableAttribute[];
export interface ListDataTableAttributesResponse {
  NextToken?: string;
  Attributes: DataTableAttribute[];
}
export type RecordIds = string[];
export type ValueList = string[];
export interface PrimaryAttributeValueFilter {
  AttributeName: string;
  Values: string[];
}
export type PrimaryAttributeValueFilters = PrimaryAttributeValueFilter[];
export interface ListDataTablePrimaryValuesRequest {
  InstanceId: string;
  DataTableId: string;
  RecordIds?: string[];
  PrimaryAttributeValues?: PrimaryAttributeValueFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface RecordPrimaryValue {
  RecordId?: string;
  PrimaryValues?: PrimaryValueResponse[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type PrimaryValuesList = RecordPrimaryValue[];
export interface ListDataTablePrimaryValuesResponse {
  NextToken?: string;
  PrimaryValuesList: RecordPrimaryValue[];
}
export interface ListDataTablesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataTableSummary {
  Name?: string;
  Id?: string;
  Arn?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type DataTableSummaryList = DataTableSummary[];
export interface ListDataTablesResponse {
  NextToken?: string;
  DataTableSummaryList: DataTableSummary[];
}
export interface ListDataTableValuesRequest {
  InstanceId: string;
  DataTableId: string;
  RecordIds?: string[];
  PrimaryAttributeValues?: PrimaryAttributeValueFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface DataTableValueSummary {
  RecordId?: string;
  AttributeId?: string;
  PrimaryValues: PrimaryValueResponse[];
  AttributeName: string;
  ValueType: DataTableAttributeValueType;
  Value: string;
  LockVersion?: DataTableLockVersion;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type DataTableValueSummaryList = DataTableValueSummary[];
export interface ListDataTableValuesResponse {
  NextToken?: string;
  Values: DataTableValueSummary[];
}
export type VocabularyNextToken = string;
export interface ListDefaultVocabulariesRequest {
  InstanceId: string;
  LanguageCode?: VocabularyLanguageCode;
  MaxResults?: number;
  NextToken?: string;
}
export interface DefaultVocabulary {
  InstanceId: string;
  LanguageCode: VocabularyLanguageCode;
  VocabularyId: string;
  VocabularyName: string;
}
export type DefaultVocabularyList = DefaultVocabulary[];
export interface ListDefaultVocabulariesResponse {
  DefaultVocabularyList: DefaultVocabulary[];
  NextToken?: string;
}
export interface ListEntitySecurityProfilesRequest {
  InstanceId: string;
  EntityType: EntityType;
  EntityArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SecurityProfiles100 = SecurityProfileItem[];
export interface ListEntitySecurityProfilesResponse {
  SecurityProfiles?: SecurityProfileItem[];
  NextToken?: string;
}
export interface ListEvaluationFormsRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface EvaluationFormSummary {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  Title: string;
  CreatedTime: Date;
  CreatedBy: string;
  LastModifiedTime: Date;
  LastModifiedBy: string;
  LastActivatedTime?: Date;
  LastActivatedBy?: string;
  LatestVersion: number;
  ActiveVersion?: number;
}
export type EvaluationFormSummaryList = EvaluationFormSummary[];
export interface ListEvaluationFormsResponse {
  EvaluationFormSummaryList: EvaluationFormSummary[];
  NextToken?: string;
}
export interface ListEvaluationFormVersionsRequest {
  InstanceId: string;
  EvaluationFormId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface EvaluationFormVersionSummary {
  EvaluationFormArn: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
  Locked: boolean;
  Status: EvaluationFormVersionStatus;
  CreatedTime: Date;
  CreatedBy: string;
  LastModifiedTime: Date;
  LastModifiedBy: string;
}
export type EvaluationFormVersionSummaryList = EvaluationFormVersionSummary[];
export interface ListEvaluationFormVersionsResponse {
  EvaluationFormVersionSummaryList: EvaluationFormVersionSummary[];
  NextToken?: string;
}
export interface ListExtractionDefinitionsRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ExtractionDefinitionSummary {
  Name: string;
  ExtractionDefinitionId: string;
  ExtractionDefinitionArn: string;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  LastUpdatedBy: string;
}
export type ExtractionDefinitionSummaryList = ExtractionDefinitionSummary[];
export interface ListExtractionDefinitionsResponse {
  ExtractionDefinitionSummaryList: ExtractionDefinitionSummary[];
  NextToken?: string;
}
export interface ListFlowAssociationsRequest {
  InstanceId: string;
  ResourceType?: ListFlowAssociationResourceType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListFlowAssociationsResponse {
  FlowAssociationSummaryList?: FlowAssociationSummary[];
  NextToken?: string;
}
export interface ListHoursOfOperationOverridesRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type HoursOfOperationOverrideList = HoursOfOperationOverride[];
export interface ListHoursOfOperationOverridesResponse {
  NextToken?: string;
  HoursOfOperationOverrideList?: HoursOfOperationOverride[];
  LastModifiedRegion?: string;
  LastModifiedTime?: Date;
}
export interface ListHoursOfOperationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type HoursOfOperationName = string;
export interface HoursOfOperationSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type HoursOfOperationSummaryList = HoursOfOperationSummary[];
export interface ListHoursOfOperationsResponse {
  HoursOfOperationSummaryList?: HoursOfOperationSummary[];
  NextToken?: string;
}
export type MaxResult7 = number;
export interface ListInstanceAttributesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type AttributesList = Attribute[];
export interface ListInstanceAttributesResponse {
  Attributes?: Attribute[];
  NextToken?: string;
}
export type MaxResult10 = number;
export interface ListInstancesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface InstanceSummary {
  Id?: string;
  Arn?: string;
  IdentityManagementType?: DirectoryType;
  InstanceAlias?: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  ServiceRole?: string;
  InstanceStatus?: InstanceStatus;
  InboundCallsEnabled?: boolean;
  OutboundCallsEnabled?: boolean;
  InstanceAccessUrl?: string;
}
export type InstanceSummaryList = InstanceSummary[];
export interface ListInstancesResponse {
  InstanceSummaryList?: InstanceSummary[];
  NextToken?: string;
}
export interface ListInstanceStorageConfigsRequest {
  InstanceId: string;
  ResourceType: InstanceStorageResourceType;
  NextToken?: string;
  MaxResults?: number;
}
export type InstanceStorageConfigs = InstanceStorageConfig[];
export interface ListInstanceStorageConfigsResponse {
  StorageConfigs?: InstanceStorageConfig[];
  NextToken?: string;
}
export interface ListIntegrationAssociationsRequest {
  InstanceId: string;
  IntegrationType?: IntegrationType;
  NextToken?: string;
  MaxResults?: number;
  IntegrationArn?: string;
}
export interface IntegrationAssociationSummary {
  IntegrationAssociationId?: string;
  IntegrationAssociationArn?: string;
  InstanceId?: string;
  IntegrationType?: IntegrationType;
  IntegrationArn?: string;
  SourceApplicationUrl?: string;
  SourceApplicationName?: string;
  SourceType?: SourceType;
}
export type IntegrationAssociationSummaryList = IntegrationAssociationSummary[];
export interface ListIntegrationAssociationsResponse {
  IntegrationAssociationSummaryList?: IntegrationAssociationSummary[];
  NextToken?: string;
}
export interface ListLambdaFunctionsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type FunctionArnsList = string[];
export interface ListLambdaFunctionsResponse {
  LambdaFunctions?: string[];
  NextToken?: string;
}
export interface ListLexBotsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type LexBotsList = LexBot[];
export interface ListLexBotsResponse {
  LexBots?: LexBot[];
  NextToken?: string;
}
export interface ListMetricsRequest {
  InstanceId: string;
  Type?: MetricType;
  MaxResults?: number;
  NextToken?: string;
}
export interface MetricSummary {
  Arn: string;
  Id: string;
  Name: string;
  Status: MetricStatus;
  Type: MetricType;
  LastModifiedRegion?: string;
  LastModifiedTime?: Date;
}
export type MetricSummaryList = MetricSummary[];
export interface ListMetricsResponse {
  MetricSummaryList: MetricSummary[];
  NextToken?: string;
}
export interface ListNotificationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type NotificationSummaryList = Notification[];
export interface ListNotificationsResponse {
  NextToken?: string;
  NotificationSummaryList: Notification[];
}
export type PhoneNumberTypes = PhoneNumberType[];
export type PhoneNumberCountryCodes = PhoneNumberCountryCode[];
export interface ListPhoneNumbersRequest {
  InstanceId: string;
  PhoneNumberTypes?: PhoneNumberType[];
  PhoneNumberCountryCodes?: PhoneNumberCountryCode[];
  NextToken?: string;
  MaxResults?: number;
}
export interface PhoneNumberSummary {
  Id?: string;
  Arn?: string;
  PhoneNumber?: string;
  PhoneNumberType?: PhoneNumberType;
  PhoneNumberCountryCode?: PhoneNumberCountryCode;
}
export type PhoneNumberSummaryList = PhoneNumberSummary[];
export interface ListPhoneNumbersResponse {
  PhoneNumberSummaryList?: PhoneNumberSummary[];
  NextToken?: string;
}
export type LargeNextToken = string;
export type PhoneNumberPrefix = string;
export interface ListPhoneNumbersV2Request {
  TargetArn?: string;
  InstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
  PhoneNumberCountryCodes?: PhoneNumberCountryCode[];
  PhoneNumberTypes?: PhoneNumberType[];
  PhoneNumberPrefix?: string;
}
export interface ListPhoneNumbersSummary {
  PhoneNumberId?: string;
  PhoneNumberArn?: string;
  PhoneNumber?: string;
  PhoneNumberCountryCode?: PhoneNumberCountryCode;
  PhoneNumberType?: PhoneNumberType;
  TargetArn?: string;
  InstanceId?: string;
  PhoneNumberDescription?: string;
  SourcePhoneNumberArn?: string;
}
export type ListPhoneNumbersSummaryList = ListPhoneNumbersSummary[];
export interface ListPhoneNumbersV2Response {
  NextToken?: string;
  ListPhoneNumbersSummaryList?: ListPhoneNumbersSummary[];
}
export interface ListPredefinedAttributesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface PredefinedAttributeSummary {
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type PredefinedAttributeSummaryList = PredefinedAttributeSummary[];
export interface ListPredefinedAttributesResponse {
  NextToken?: string;
  PredefinedAttributeSummaryList?: PredefinedAttributeSummary[];
}
export interface ListPromptsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type PromptName = string;
export interface PromptSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type PromptSummaryList = PromptSummary[];
export interface ListPromptsResponse {
  PromptSummaryList?: PromptSummary[];
  NextToken?: string;
}
export interface ListQueueEmailAddressesRequest {
  InstanceId: string;
  QueueId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface EmailAddressSummary {
  Id?: string;
  Arn?: string;
  IsDefaultOutboundEmail?: boolean;
}
export type EmailAddressMetadataList = EmailAddressSummary[];
export interface ListQueueEmailAddressesResponse {
  NextToken?: string;
  EmailAddressMetadataList?: EmailAddressSummary[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListQueueQuickConnectsRequest {
  InstanceId: string;
  QueueId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface QuickConnectSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  QuickConnectType?: QuickConnectType;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type QuickConnectSummaryList = QuickConnectSummary[];
export interface ListQueueQuickConnectsResponse {
  NextToken?: string;
  QuickConnectSummaryList?: QuickConnectSummary[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type QueueType = "STANDARD" | "AGENT" | (string & {});
export type QueueTypes = QueueType[];
export interface ListQueuesRequest {
  InstanceId: string;
  QueueTypes?: QueueType[];
  NextToken?: string;
  MaxResults?: number;
}
export type QueueName = string;
export interface QueueSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  QueueType?: QueueType;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type QueueSummaryList = QueueSummary[];
export interface ListQueuesResponse {
  QueueSummaryList?: QueueSummary[];
  NextToken?: string;
}
export type QuickConnectTypes = QuickConnectType[];
export interface ListQuickConnectsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  QuickConnectTypes?: QuickConnectType[];
}
export interface ListQuickConnectsResponse {
  QuickConnectSummaryList?: QuickConnectSummary[];
  NextToken?: string;
}
export type RealTimeContactAnalysisOutputType =
  | "Raw"
  | "Redacted"
  | (string & {});
export type RealTimeContactAnalysisSegmentType =
  | "Transcript"
  | "Categories"
  | "Issues"
  | "Event"
  | "Attachments"
  | "PostContactSummary"
  | "ExtractedInformation"
  | (string & {});
export type RealTimeContactAnalysisSegmentTypes =
  RealTimeContactAnalysisSegmentType[];
export interface ListRealtimeContactAnalysisSegmentsV2Request {
  InstanceId: string;
  ContactId: string;
  MaxResults?: number;
  NextToken?: string;
  OutputType: RealTimeContactAnalysisOutputType;
  SegmentTypes: RealTimeContactAnalysisSegmentType[];
}
export type RealTimeContactAnalysisSupportedChannel =
  | "VOICE"
  | "CHAT"
  | (string & {});
export type RealTimeContactAnalysisStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type RealTimeContactAnalysisId256 = string;
export type RealTimeContactAnalysisTranscriptContent = string;
export type RealTimeContactAnalysisContentType = string;
export type RealTimeContactAnalysisTimeInstant = Date;
export type RealTimeContactAnalysisTimeData = { AbsoluteTime: Date };
export type RealTimeContactAnalysisOffset = number;
export interface RealTimeContactAnalysisCharacterInterval {
  BeginOffsetChar: number;
  EndOffsetChar: number;
}
export type RealTimeContactAnalysisCharacterIntervals =
  RealTimeContactAnalysisCharacterInterval[];
export interface RealTimeContactAnalysisTranscriptItemRedaction {
  CharacterOffsets?: RealTimeContactAnalysisCharacterInterval[];
}
export type RealTimeContactAnalysisSentimentLabel =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | (string & {});
export interface RealTimeContactAnalysisSegmentTranscript {
  Id: string;
  ParticipantId: string;
  ParticipantRole: ParticipantRole;
  DisplayName?: string;
  Content: string;
  ContentType?: string;
  Time: RealTimeContactAnalysisTimeData;
  Redaction?: RealTimeContactAnalysisTranscriptItemRedaction;
  Sentiment?: RealTimeContactAnalysisSentimentLabel;
}
export type RealTimeContactAnalysisCategoryName = string;
export interface RealTimeContactAnalysisTranscriptItemWithCharacterOffsets {
  Id: string;
  CharacterOffsets?: RealTimeContactAnalysisCharacterInterval;
}
export type RealTimeContactAnalysisTranscriptItemsWithCharacterOffsets =
  RealTimeContactAnalysisTranscriptItemWithCharacterOffsets[];
export interface RealTimeContactAnalysisPointOfInterest {
  TranscriptItems?: RealTimeContactAnalysisTranscriptItemWithCharacterOffsets[];
}
export type RealTimeContactAnalysisPointsOfInterest =
  RealTimeContactAnalysisPointOfInterest[];
export interface RealTimeContactAnalysisCategoryDetails {
  PointsOfInterest: RealTimeContactAnalysisPointOfInterest[];
}
export type RealTimeContactAnalysisMatchedDetails = {
  [key: string]: RealTimeContactAnalysisCategoryDetails | undefined;
};
export interface RealTimeContactAnalysisSegmentCategories {
  MatchedDetails: {
    [key: string]: RealTimeContactAnalysisCategoryDetails | undefined;
  };
}
export interface RealTimeContactAnalysisTranscriptItemWithContent {
  Content?: string;
  Id: string;
  CharacterOffsets?: RealTimeContactAnalysisCharacterInterval;
}
export type RealTimeContactAnalysisTranscriptItemsWithContent =
  RealTimeContactAnalysisTranscriptItemWithContent[];
export interface RealTimeContactAnalysisIssueDetected {
  TranscriptItems: RealTimeContactAnalysisTranscriptItemWithContent[];
}
export type RealTimeContactAnalysisIssuesDetected =
  RealTimeContactAnalysisIssueDetected[];
export interface RealTimeContactAnalysisSegmentIssues {
  IssuesDetected: RealTimeContactAnalysisIssueDetected[];
}
export type RealTimeContactAnalysisEventType = string;
export interface RealTimeContactAnalysisSegmentEvent {
  Id: string;
  ParticipantId?: string;
  ParticipantRole?: ParticipantRole;
  DisplayName?: string;
  EventType: string;
  Time: RealTimeContactAnalysisTimeData;
}
export type AttachmentName = string;
export type ContentType = string;
export type ArtifactId = string;
export type ArtifactStatus =
  | "APPROVED"
  | "REJECTED"
  | "IN_PROGRESS"
  | (string & {});
export interface RealTimeContactAnalysisAttachment {
  AttachmentName: string;
  ContentType?: string;
  AttachmentId: string;
  Status?: ArtifactStatus;
}
export type RealTimeContactAnalysisAttachments =
  RealTimeContactAnalysisAttachment[];
export interface RealTimeContactAnalysisSegmentAttachments {
  Id: string;
  ParticipantId: string;
  ParticipantRole: ParticipantRole;
  DisplayName?: string;
  Attachments: RealTimeContactAnalysisAttachment[];
  Time: RealTimeContactAnalysisTimeData;
}
export type RealTimeContactAnalysisPostContactSummaryContent = string;
export type RealTimeContactAnalysisPostContactSummaryStatus =
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type RealTimeContactAnalysisPostContactSummaryFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INVALID_ANALYSIS_CONFIGURATION"
  | "INTERNAL_ERROR"
  | (string & {});
export interface RealTimeContactAnalysisSegmentPostContactSummary {
  Content?: string;
  Status: RealTimeContactAnalysisPostContactSummaryStatus;
  FailureCode?: RealTimeContactAnalysisPostContactSummaryFailureCode;
}
export type RealTimeContactAnalysisExtractedInformationContent = string;
export interface RealTimeContactAnalysisExtractedInformationValue {
  Content: string;
  PointsOfInterest: RealTimeContactAnalysisTranscriptItemWithCharacterOffsets[];
}
export type RealTimeContactAnalysisExtractedInformationValues =
  RealTimeContactAnalysisExtractedInformationValue[];
export type RealTimeContactAnalysisExtractedInformationFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INTERNAL_ERROR"
  | "MAX_PACKAGE_FEATURE_ONLY"
  | (string & {});
export interface RealTimeContactAnalysisSegmentExtractedInformation {
  ExtractionDefinitionId: string;
  ExtractionDefinitionName: string;
  ExtractionDefinitionDisplayLabel?: string;
  ExtractedValues?: RealTimeContactAnalysisExtractedInformationValue[];
  FailureCode?: RealTimeContactAnalysisExtractedInformationFailureCode;
}
export type RealtimeContactAnalysisSegment =
  | {
      Transcript: RealTimeContactAnalysisSegmentTranscript;
      Categories?: never;
      Issues?: never;
      Event?: never;
      Attachments?: never;
      PostContactSummary?: never;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories: RealTimeContactAnalysisSegmentCategories;
      Issues?: never;
      Event?: never;
      Attachments?: never;
      PostContactSummary?: never;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories?: never;
      Issues: RealTimeContactAnalysisSegmentIssues;
      Event?: never;
      Attachments?: never;
      PostContactSummary?: never;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories?: never;
      Issues?: never;
      Event: RealTimeContactAnalysisSegmentEvent;
      Attachments?: never;
      PostContactSummary?: never;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories?: never;
      Issues?: never;
      Event?: never;
      Attachments: RealTimeContactAnalysisSegmentAttachments;
      PostContactSummary?: never;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories?: never;
      Issues?: never;
      Event?: never;
      Attachments?: never;
      PostContactSummary: RealTimeContactAnalysisSegmentPostContactSummary;
      ExtractedInformation?: never;
    }
  | {
      Transcript?: never;
      Categories?: never;
      Issues?: never;
      Event?: never;
      Attachments?: never;
      PostContactSummary?: never;
      ExtractedInformation: RealTimeContactAnalysisSegmentExtractedInformation;
    };
export type RealtimeContactAnalysisSegments = RealtimeContactAnalysisSegment[];
export interface ListRealtimeContactAnalysisSegmentsV2Response {
  Channel: RealTimeContactAnalysisSupportedChannel;
  Status: RealTimeContactAnalysisStatus;
  Segments: RealtimeContactAnalysisSegment[];
  NextToken?: string;
}
export interface ListRoutingProfileManualAssignmentQueuesRequest {
  InstanceId: string;
  RoutingProfileId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface RoutingProfileManualAssignmentQueueConfigSummary {
  QueueId: string;
  QueueArn: string;
  QueueName: string;
  Channel: Channel;
}
export type RoutingProfileManualAssignmentQueueConfigSummaryList =
  RoutingProfileManualAssignmentQueueConfigSummary[];
export interface ListRoutingProfileManualAssignmentQueuesResponse {
  NextToken?: string;
  RoutingProfileManualAssignmentQueueConfigSummaryList?: RoutingProfileManualAssignmentQueueConfigSummary[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListRoutingProfileQueuesRequest {
  InstanceId: string;
  RoutingProfileId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface RoutingProfileQueueConfigSummary {
  QueueId: string;
  QueueArn: string;
  QueueName: string;
  Priority: number;
  Delay: number;
  Channel: Channel;
}
export type RoutingProfileQueueConfigSummaryList =
  RoutingProfileQueueConfigSummary[];
export interface ListRoutingProfileQueuesResponse {
  NextToken?: string;
  RoutingProfileQueueConfigSummaryList?: RoutingProfileQueueConfigSummary[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListRoutingProfilesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface RoutingProfileSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type RoutingProfileSummaryList = RoutingProfileSummary[];
export interface ListRoutingProfilesResponse {
  RoutingProfileSummaryList?: RoutingProfileSummary[];
  NextToken?: string;
}
export type MaxResult200 = number;
export interface ListRulesRequest {
  InstanceId: string;
  PublishStatus?: RulePublishStatus;
  EventSourceName?: EventSourceName;
  MaxResults?: number;
  NextToken?: string;
}
export interface ActionSummary {
  ActionType: ActionType;
}
export type ActionSummaries = ActionSummary[];
export interface RuleSummary {
  Name: string;
  RuleId: string;
  RuleArn: string;
  EventSourceName: EventSourceName;
  PublishStatus: RulePublishStatus;
  RuleCapabilityTiers?: RuleCapabilityTier[];
  ActionSummaries: ActionSummary[];
  CreatedTime: Date;
  LastUpdatedTime: Date;
}
export type RuleSummaryList = RuleSummary[];
export interface ListRulesResponse {
  RuleSummaryList: RuleSummary[];
  NextToken?: string;
}
export type MaxResult2 = number;
export interface ListSecurityKeysRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface SecurityKey {
  AssociationId?: string;
  Key?: string;
  CreationTime?: Date;
}
export type SecurityKeysList = SecurityKey[];
export interface ListSecurityKeysResponse {
  SecurityKeys?: SecurityKey[];
  NextToken?: string;
}
export interface ListSecurityProfileApplicationsRequest {
  SecurityProfileId: string;
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListSecurityProfileApplicationsResponse {
  Applications?: Application[];
  NextToken?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListSecurityProfileFlowModulesRequest {
  SecurityProfileId: string;
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListSecurityProfileFlowModulesResponse {
  AllowedFlowModules?: FlowModule[];
  NextToken?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListSecurityProfilePermissionsRequest {
  SecurityProfileId: string;
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListSecurityProfilePermissionsResponse {
  Permissions?: string[];
  NextToken?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListSecurityProfilesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface SecurityProfileSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type SecurityProfileSummaryList = SecurityProfileSummary[];
export interface ListSecurityProfilesResponse {
  SecurityProfileSummaryList?: SecurityProfileSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTaskTemplatesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: TaskTemplateStatus;
  Name?: string;
}
export interface TaskTemplateMetadata {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Status?: TaskTemplateStatus;
  LastModifiedTime?: Date;
  CreatedTime?: Date;
}
export type TaskTemplateList = TaskTemplateMetadata[];
export interface ListTaskTemplatesResponse {
  TaskTemplates?: TaskTemplateMetadata[];
  NextToken?: string;
}
export interface ListTestCaseExecutionRecordsRequest {
  InstanceId: string;
  TestCaseId: string;
  TestCaseExecutionId: string;
  Status?: TestCaseExecutionStatus;
  NextToken?: string;
  MaxResults?: number;
}
export type TestCaseResourceId = string;
export type ExecutionRecordStatus =
  | "PASSED"
  | "FAILED"
  | "IN_PROGRESS"
  | "STOPPED"
  | (string & {});
export type ExecutionRecordString = string;
export interface ExecutionRecord {
  ObservationId?: string;
  Status?: ExecutionRecordStatus;
  Timestamp?: Date;
  Record?: string;
}
export type ExecutionRecordList = ExecutionRecord[];
export interface ListTestCaseExecutionRecordsResponse {
  ExecutionRecords?: ExecutionRecord[];
  NextToken?: string;
}
export type EpochMilliseconds = number;
export interface ListTestCaseExecutionsRequest {
  InstanceId: string;
  TestCaseId?: string;
  TestCaseName?: string;
  StartTime?: number;
  EndTime?: number;
  Status?: TestCaseExecutionStatus;
  NextToken?: string;
  MaxResults?: number;
}
export interface TestCaseExecution {
  StartTime?: Date;
  EndTime?: Date;
  TestCaseExecutionId?: string;
  TestCaseId?: string;
  TestCaseExecutionStatus?: TestCaseExecutionStatus;
  Tags?: { [key: string]: string | undefined };
}
export type TestCaseExecutionList = TestCaseExecution[];
export interface ListTestCaseExecutionsResponse {
  TestCaseExecutions?: TestCaseExecution[];
  NextToken?: string;
}
export interface ListTestCasesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TestCaseSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  Status?: TestCaseStatus;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type TestCaseSummaryList = TestCaseSummary[];
export interface ListTestCasesResponse {
  TestCaseSummaryList?: TestCaseSummary[];
  NextToken?: string;
}
export interface ListTrafficDistributionGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
  InstanceId?: string;
}
export interface TrafficDistributionGroupSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  InstanceArn?: string;
  Status?: TrafficDistributionGroupStatus;
  IsDefault?: boolean;
}
export type TrafficDistributionGroupSummaryList =
  TrafficDistributionGroupSummary[];
export interface ListTrafficDistributionGroupsResponse {
  NextToken?: string;
  TrafficDistributionGroupSummaryList?: TrafficDistributionGroupSummary[];
}
export interface ListTrafficDistributionGroupUsersRequest {
  TrafficDistributionGroupId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TrafficDistributionGroupUserSummary {
  UserId?: string;
}
export type TrafficDistributionGroupUserSummaryList =
  TrafficDistributionGroupUserSummary[];
export interface ListTrafficDistributionGroupUsersResponse {
  NextToken?: string;
  TrafficDistributionGroupUserSummaryList?: TrafficDistributionGroupUserSummary[];
}
export interface ListUseCasesRequest {
  InstanceId: string;
  IntegrationAssociationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface UseCase {
  UseCaseId?: string;
  UseCaseArn?: string;
  UseCaseType?: UseCaseType;
}
export type UseCaseSummaryList = UseCase[];
export interface ListUseCasesResponse {
  UseCaseSummaryList?: UseCase[];
  NextToken?: string;
}
export interface ListUserHierarchyGroupsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type HierarchyGroupSummaryList = HierarchyGroupSummary[];
export interface ListUserHierarchyGroupsResponse {
  UserHierarchyGroupSummaryList?: HierarchyGroupSummary[];
  NextToken?: string;
}
export interface ListUserNotificationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  UserId: string;
}
export type NotificationStatus = "READ" | "UNREAD" | "HIDDEN" | (string & {});
export type NotificationSource =
  | "CUSTOMER"
  | "RULES"
  | "SYSTEM"
  | (string & {});
export interface UserNotificationSummary {
  NotificationId?: string;
  NotificationStatus?: NotificationStatus;
  InstanceId?: string;
  RecipientId?: string;
  Content?: { [key: string]: string | undefined };
  Priority?: NotificationPriority;
  Source?: NotificationSource;
  CreatedAt?: Date;
  ExpiresAt?: Date;
}
export type UserNotificationSummaryList = UserNotificationSummary[];
export interface ListUserNotificationsResponse {
  UserNotifications?: UserNotificationSummary[];
  NextToken?: string;
}
export interface ListUserProficienciesRequest {
  InstanceId: string;
  UserId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListUserProficienciesResponse {
  NextToken?: string;
  UserProficiencyList?: UserProficiency[];
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface ListUsersRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface UserSummary {
  Id?: string;
  Arn?: string;
  Username?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type UserSummaryList = UserSummary[];
export interface ListUsersResponse {
  UserSummaryList?: UserSummary[];
  NextToken?: string;
}
export type ViewsNextToken = string;
export type MaxResults = number;
export interface ListViewsRequest {
  InstanceId: string;
  Type?: ViewType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ViewSummary {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Type?: ViewType;
  Status?: ViewStatus;
  Description?: string;
}
export type ViewsSummaryList = ViewSummary[];
export interface ListViewsResponse {
  ViewsSummaryList?: ViewSummary[];
  NextToken?: string;
}
export interface ListViewVersionsRequest {
  InstanceId: string;
  ViewId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ViewVersionSummary {
  Id?: string;
  Arn?: string;
  Description?: string;
  Name?: string | redacted.Redacted<string>;
  Type?: ViewType;
  Version?: number;
  VersionDescription?: string;
}
export type ViewVersionSummaryList = ViewVersionSummary[];
export interface ListViewVersionsResponse {
  ViewVersionSummaryList?: ViewVersionSummary[];
  NextToken?: string;
}
export interface ListWorkspaceMediaRequest {
  InstanceId: string;
  WorkspaceId: string;
}
export interface MediaItem {
  Type?: MediaType;
  Source?: string;
}
export type MediaList = MediaItem[];
export interface ListWorkspaceMediaResponse {
  Media?: MediaItem[];
}
export interface ListWorkspacePagesRequest {
  InstanceId: string;
  WorkspaceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkspacePage {
  ResourceArn?: string;
  Page?: string;
  Slug?: string;
  InputData?: string;
}
export type WorkspacePageList = WorkspacePage[];
export interface ListWorkspacePagesResponse {
  NextToken?: string;
  WorkspacePageList: WorkspacePage[];
}
export interface ListWorkspacesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkspaceSummary {
  Id?: string;
  Name?: string;
  Arn?: string;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export type WorkspaceSummaryList = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  NextToken?: string;
  WorkspaceSummaryList: WorkspaceSummary[];
}
export type MonitorCapability = "SILENT_MONITOR" | "BARGE" | (string & {});
export type AllowedMonitorCapabilities = MonitorCapability[];
export interface MonitorContactRequest {
  InstanceId: string;
  ContactId: string;
  UserId: string;
  AllowedMonitorCapabilities?: MonitorCapability[];
  ClientToken?: string;
}
export interface MonitorContactResponse {
  ContactId?: string;
  ContactArn?: string;
}
export interface PauseContactRequest {
  ContactId: string;
  InstanceId: string;
  ContactFlowId?: string;
}
export interface PauseContactResponse {}
export interface PutUserStatusRequest {
  UserId: string;
  InstanceId: string;
  AgentStatusId: string;
}
export interface PutUserStatusResponse {}
export interface ReleasePhoneNumberRequest {
  PhoneNumberId: string;
  ClientToken?: string;
}
export interface ReleasePhoneNumberResponse {}
export interface ReplicateInstanceRequest {
  InstanceId: string;
  ReplicaRegion: string;
  ClientToken?: string;
  ReplicaAlias: string | redacted.Redacted<string>;
}
export interface ReplicateInstanceResponse {
  Id?: string;
  Arn?: string;
}
export interface ResumeContactRequest {
  ContactId: string;
  InstanceId: string;
  ContactFlowId?: string;
}
export interface ResumeContactResponse {}
export type ContactRecordingType = "AGENT" | "IVR" | "SCREEN" | (string & {});
export interface ResumeContactRecordingRequest {
  InstanceId: string;
  ContactId: string;
  InitialContactId: string;
  ContactRecordingType?: ContactRecordingType;
}
export interface ResumeContactRecordingResponse {}
export interface TagCondition {
  TagKey?: string;
  TagValue?: string;
}
export type TagAndConditionList = TagCondition[];
export interface CommonAttributeAndCondition {
  TagConditions?: TagCondition[];
}
export type CommonAttributeOrConditionList = CommonAttributeAndCondition[];
export interface ControlPlaneAttributeFilter {
  OrConditions?: CommonAttributeAndCondition[];
  AndCondition?: CommonAttributeAndCondition;
  TagCondition?: TagCondition;
}
export interface AgentStatusSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type AgentStatusSearchConditionList = AgentStatusSearchCriteria[];
export type StringComparisonType =
  | "STARTS_WITH"
  | "CONTAINS"
  | "EXACT"
  | (string & {});
export interface StringCondition {
  FieldName?: string;
  Value?: string;
  ComparisonType?: StringComparisonType;
}
export interface AgentStatusSearchCriteria {
  OrConditions?: AgentStatusSearchCriteria[];
  AndConditions?: AgentStatusSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchAgentStatusesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: AgentStatusSearchFilter;
  SearchCriteria?: AgentStatusSearchCriteria;
}
export type AgentStatusList = AgentStatus[];
export interface SearchAgentStatusesResponse {
  AgentStatuses?: AgentStatus[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface SearchAvailablePhoneNumbersRequest {
  TargetArn?: string;
  InstanceId?: string;
  PhoneNumberCountryCode: PhoneNumberCountryCode;
  PhoneNumberType: PhoneNumberType;
  PhoneNumberPrefix?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AvailableNumberSummary {
  PhoneNumber?: string;
  PhoneNumberCountryCode?: PhoneNumberCountryCode;
  PhoneNumberType?: PhoneNumberType;
}
export type AvailableNumbersList = AvailableNumberSummary[];
export interface SearchAvailablePhoneNumbersResponse {
  NextToken?: string;
  AvailableNumbersList?: AvailableNumberSummary[];
}
export type EvaluationSearchConditionList = EvaluationSearchCriteria[];
export type NullableProficiencyLimitValue = number;
export type NumberComparisonType =
  | "GREATER_OR_EQUAL"
  | "GREATER"
  | "LESSER_OR_EQUAL"
  | "LESSER"
  | "EQUAL"
  | "NOT_EQUAL"
  | "RANGE"
  | (string & {});
export interface NumberCondition {
  FieldName?: string;
  MinValue?: number;
  MaxValue?: number;
  ComparisonType?: NumberComparisonType;
}
export type BooleanComparisonType = "IS_TRUE" | "IS_FALSE" | (string & {});
export interface BooleanCondition {
  FieldName?: string;
  ComparisonType?: BooleanComparisonType;
}
export type DateTimeFormat = string;
export type DateTimeComparisonType =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "LESS_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "RANGE"
  | (string & {});
export interface DateTimeCondition {
  FieldName?: string;
  MinValue?: string;
  MaxValue?: string;
  ComparisonType?: DateTimeComparisonType;
}
export type DecimalComparisonType =
  | "GREATER_OR_EQUAL"
  | "GREATER"
  | "LESSER_OR_EQUAL"
  | "LESSER"
  | "EQUAL"
  | "NOT_EQUAL"
  | "RANGE"
  | (string & {});
export interface DecimalCondition {
  FieldName?: string;
  MinValue?: number;
  MaxValue?: number;
  ComparisonType?: DecimalComparisonType;
}
export interface EvaluationSearchCriteria {
  OrConditions?: EvaluationSearchCriteria[];
  AndConditions?: EvaluationSearchCriteria[];
  StringCondition?: StringCondition;
  NumberCondition?: NumberCondition;
  BooleanCondition?: BooleanCondition;
  DateTimeCondition?: DateTimeCondition;
  DecimalCondition?: DecimalCondition;
}
export type ContactEvaluationAttributeKey = "ContactAgentId" | (string & {});
export interface ContactEvaluationAttributeValue {
  StringValue?: string;
}
export type ContactEvaluationAttributeComparisonType = "EXACT" | (string & {});
export interface ContactEvaluationAttributeCondition {
  AttributeKey?: ContactEvaluationAttributeKey;
  AttributeValue?: ContactEvaluationAttributeValue;
  ComparisonType?: ContactEvaluationAttributeComparisonType;
}
export type ContactEvaluationAttributeConditionList =
  ContactEvaluationAttributeCondition[];
export interface ContactEvaluationAttributeAndCondition {
  TagConditions?: TagCondition[];
  AttributeConditions?: ContactEvaluationAttributeCondition[];
}
export type ContactEvaluationAttributeOrConditionList =
  ContactEvaluationAttributeAndCondition[];
export interface ContactEvaluationAttributeFilter {
  OrConditions?: ContactEvaluationAttributeAndCondition[];
  AndCondition?: ContactEvaluationAttributeAndCondition;
  TagCondition?: TagCondition;
  ContactEvaluationAttributeCondition?: ContactEvaluationAttributeCondition;
}
export interface EvaluationSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
  ContactEvaluationAttributeFilter?: ContactEvaluationAttributeFilter;
}
export interface SearchContactEvaluationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchCriteria?: EvaluationSearchCriteria;
  SearchFilter?: EvaluationSearchFilter;
}
export interface EvaluationSearchMetadata {
  ContactId: string;
  EvaluatorArn: string;
  ContactAgentId?: string;
  CalibrationSessionId?: string;
  ScorePercentage?: number;
  ScoreAutomaticFail?: boolean;
  ScoreNotApplicable?: boolean;
  AutoEvaluationEnabled?: boolean;
  AutoEvaluationStatus?: AutoEvaluationStatus;
  AcknowledgedTime?: Date;
  AcknowledgedBy?: string;
  AcknowledgerComment?: string;
  SamplingJobId?: string;
  ReviewId?: string;
  ContactParticipantRole?: ContactParticipantRole;
  ContactParticipantId?: string;
  EarnedPoints?: number;
  MaxBasePoint?: number;
  PerformanceCategory?: PerformanceCategoryName;
}
export interface EvaluationSearchSummary {
  EvaluationId: string;
  EvaluationArn: string;
  EvaluationFormId?: string;
  EvaluationFormVersion: number;
  EvaluationFormTitle?: string;
  Metadata: EvaluationSearchMetadata;
  Status: EvaluationStatus;
  EvaluationType?: EvaluationType;
  CreatedTime: Date;
  LastModifiedTime: Date;
  Tags?: { [key: string]: string | undefined };
}
export type EvaluationSearchSummaryList = EvaluationSearchSummary[];
export interface SearchContactEvaluationsResponse {
  EvaluationSearchSummaryList?: EvaluationSearchSummary[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type TagOrConditionList = TagCondition[][];
export interface ControlPlaneTagFilter {
  OrConditions?: TagCondition[][];
  AndConditions?: TagCondition[];
  TagCondition?: TagCondition;
}
export interface ContactFlowModuleSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type ContactFlowModuleSearchConditionList =
  ContactFlowModuleSearchCriteria[];
export interface ContactFlowModuleSearchCriteria {
  OrConditions?: ContactFlowModuleSearchCriteria[];
  AndConditions?: ContactFlowModuleSearchCriteria[];
  StringCondition?: StringCondition;
  StateCondition?: ContactFlowModuleState;
  StatusCondition?: ContactFlowModuleStatus;
}
export interface SearchContactFlowModulesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: ContactFlowModuleSearchFilter;
  SearchCriteria?: ContactFlowModuleSearchCriteria;
}
export type ContactFlowModuleSearchSummaryList = ContactFlowModule[];
export interface SearchContactFlowModulesResponse {
  ContactFlowModules?: ContactFlowModule[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface ContactFlowTypeCondition {
  ContactFlowType?: ContactFlowType;
}
export interface ContactFlowAttributeAndCondition {
  TagConditions?: TagCondition[];
  ContactFlowTypeCondition?: ContactFlowTypeCondition;
}
export type ContactFlowAttributeOrConditionList =
  ContactFlowAttributeAndCondition[];
export interface ContactFlowAttributeFilter {
  OrConditions?: ContactFlowAttributeAndCondition[];
  AndCondition?: ContactFlowAttributeAndCondition;
  TagCondition?: TagCondition;
  ContactFlowTypeCondition?: ContactFlowTypeCondition;
}
export interface ContactFlowSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
  FlowAttributeFilter?: ContactFlowAttributeFilter;
}
export type ContactFlowSearchConditionList = ContactFlowSearchCriteria[];
export interface ContactFlowSearchCriteria {
  OrConditions?: ContactFlowSearchCriteria[];
  AndConditions?: ContactFlowSearchCriteria[];
  StringCondition?: StringCondition;
  TypeCondition?: ContactFlowType;
  StateCondition?: ContactFlowState;
  StatusCondition?: ContactFlowStatus;
}
export interface SearchContactFlowsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: ContactFlowSearchFilter;
  SearchCriteria?: ContactFlowSearchCriteria;
}
export type ContactFlowSearchSummaryList = ContactFlow[];
export interface SearchContactFlowsResponse {
  ContactFlows?: ContactFlow[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type SearchContactsTimeRangeType =
  | "INITIATION_TIMESTAMP"
  | "SCHEDULED_TIMESTAMP"
  | "CONNECTED_TO_AGENT_TIMESTAMP"
  | "DISCONNECT_TIMESTAMP"
  | "ENQUEUE_TIMESTAMP"
  | (string & {});
export interface SearchContactsTimeRange {
  Type: SearchContactsTimeRangeType;
  StartTime: Date;
  EndTime: Date;
}
export type SearchText = string | redacted.Redacted<string>;
export type SearchTextList = (string | redacted.Redacted<string>)[];
export type SearchContactsMatchType =
  | "MATCH_ALL"
  | "MATCH_ANY"
  | "MATCH_EXACT"
  | "MATCH_NONE"
  | (string & {});
export interface NameCriteria {
  SearchText: (string | redacted.Redacted<string>)[];
  MatchType: SearchContactsMatchType;
}
export type AgentResourceIdList = string[];
export type HierarchyGroupIdList = string[];
export interface AgentHierarchyGroups {
  L1Ids?: string[];
  L2Ids?: string[];
  L3Ids?: string[];
  L4Ids?: string[];
  L5Ids?: string[];
}
export type ChannelList = Channel[];
export interface TranscriptCriteria {
  ParticipantRole: ParticipantRole;
  SearchText: (string | redacted.Redacted<string>)[];
  MatchType: SearchContactsMatchType;
}
export type TranscriptCriteriaList = TranscriptCriteria[];
export interface Transcript {
  Criteria: TranscriptCriteria[];
  MatchType?: SearchContactsMatchType;
}
export interface ContactAnalysis {
  Transcript?: Transcript;
}
export type InitiationMethodList = ContactInitiationMethod[];
export type QueueIdList = string[];
export interface SearchableAgentCriteriaStep {
  AgentIds?: string[];
  MatchType?: SearchContactsMatchType;
}
export interface SearchableRoutingCriteriaStep {
  AgentCriteria?: SearchableAgentCriteriaStep;
}
export type SearchableRoutingCriteriaStepList = SearchableRoutingCriteriaStep[];
export interface SearchableRoutingCriteria {
  Steps?: SearchableRoutingCriteriaStep[];
}
export type SearchContactsTimeRangeConditionType = "NOT_EXISTS" | (string & {});
export interface SearchContactsTimestampCondition {
  Type: SearchContactsTimeRangeType;
  ConditionType: SearchContactsTimeRangeConditionType;
}
export interface SearchContactsAdditionalTimeRangeCriteria {
  TimeRange?: SearchContactsTimeRange;
  TimestampCondition?: SearchContactsTimestampCondition;
}
export type SearchContactsAdditionalTimeRangeCriteriaList =
  SearchContactsAdditionalTimeRangeCriteria[];
export interface SearchContactsAdditionalTimeRange {
  Criteria: SearchContactsAdditionalTimeRangeCriteria[];
  MatchType: SearchContactsMatchType;
}
export type SearchableContactAttributeKey = string | redacted.Redacted<string>;
export type SearchableContactAttributeValue =
  | string
  | redacted.Redacted<string>;
export type SearchableContactAttributeValueList = (
  | string
  | redacted.Redacted<string>
)[];
export interface SearchableContactAttributesCriteria {
  Key: string | redacted.Redacted<string>;
  Values: (string | redacted.Redacted<string>)[];
}
export type SearchableContactAttributesCriteriaList =
  SearchableContactAttributesCriteria[];
export interface SearchableContactAttributes {
  Criteria: SearchableContactAttributesCriteria[];
  MatchType?: SearchContactsMatchType;
}
export type SearchableSegmentAttributeKey = string | redacted.Redacted<string>;
export type SearchableSegmentAttributeValue =
  | string
  | redacted.Redacted<string>;
export type SearchableSegmentAttributeValueList = (
  | string
  | redacted.Redacted<string>
)[];
export interface SearchableSegmentAttributesCriteria {
  Key: string | redacted.Redacted<string>;
  Values: (string | redacted.Redacted<string>)[];
}
export type SearchableSegmentAttributesCriteriaList =
  SearchableSegmentAttributesCriteria[];
export interface SearchableSegmentAttributes {
  Criteria: SearchableSegmentAttributesCriteria[];
  MatchType?: SearchContactsMatchType;
}
export type ActiveRegionList = string[];
export type AiAgentId = string;
export type AiAgentVersionNumber = number;
export interface AiAgentSearchCriteria {
  Id?: string;
  VersionNumber?: number;
  AiAgentEscalated?: boolean;
  AiUseCase?: AiUseCase;
}
export type AiAgentSearchCriteriaList = AiAgentSearchCriteria[];
export interface AiAgentsCriteria {
  Criteria?: AiAgentSearchCriteria[];
}
export interface SearchCriteria {
  Name?: NameCriteria;
  AgentIds?: string[];
  AgentHierarchyGroups?: AgentHierarchyGroups;
  Channels?: Channel[];
  ContactAnalysis?: ContactAnalysis;
  InitiationMethods?: ContactInitiationMethod[];
  QueueIds?: string[];
  RoutingCriteria?: SearchableRoutingCriteria;
  AdditionalTimeRange?: SearchContactsAdditionalTimeRange;
  SearchableContactAttributes?: SearchableContactAttributes;
  SearchableSegmentAttributes?: SearchableSegmentAttributes;
  ActiveRegions?: string[];
  ContactTags?: ControlPlaneTagFilter;
  AiAgents?: AiAgentsCriteria;
}
export type SortableFieldName =
  | "INITIATION_TIMESTAMP"
  | "SCHEDULED_TIMESTAMP"
  | "CONNECTED_TO_AGENT_TIMESTAMP"
  | "DISCONNECT_TIMESTAMP"
  | "INITIATION_METHOD"
  | "CHANNEL"
  | "EXPIRY_TIMESTAMP"
  | (string & {});
export interface Sort {
  FieldName: SortableFieldName;
  Order: SortOrder;
}
export interface SearchContactsRequest {
  InstanceId: string;
  TimeRange: SearchContactsTimeRange;
  SearchCriteria?: SearchCriteria;
  MaxResults?: number;
  NextToken?: string;
  Sort?: Sort;
}
export interface ContactSearchSummaryQueueInfo {
  Id?: string;
  EnqueueTimestamp?: Date;
}
export interface ContactSearchSummaryAgentInfo {
  Id?: string;
  ConnectedToAgentTimestamp?: Date;
}
export interface ContactSearchSummarySegmentAttributeValue {
  ValueString?: string;
  ValueMap?: { [key: string]: SegmentAttributeValue | undefined };
}
export type ContactSearchSummarySegmentAttributes = {
  [key: string]: ContactSearchSummarySegmentAttributeValue | undefined;
};
export interface ContactSearchSummaryAiAgentInfo {
  AiAgentVersionId?: string;
  AiAgentEscalated?: boolean;
  AiUseCase?: AiUseCase;
}
export type ContactSearchSummaryAiAgentInfoList =
  ContactSearchSummaryAiAgentInfo[];
export interface ContactSearchSummary {
  Arn?: string;
  Id?: string;
  InitialContactId?: string;
  PreviousContactId?: string;
  InitiationMethod?: ContactInitiationMethod;
  Channel?: Channel;
  QueueInfo?: ContactSearchSummaryQueueInfo;
  AgentInfo?: ContactSearchSummaryAgentInfo;
  InitiationTimestamp?: Date;
  DisconnectTimestamp?: Date;
  ScheduledTimestamp?: Date;
  SegmentAttributes?: {
    [key: string]: ContactSearchSummarySegmentAttributeValue | undefined;
  };
  Name?: string | redacted.Redacted<string>;
  RoutingCriteria?: RoutingCriteria;
  Tags?: { [key: string]: string | undefined };
  GlobalResiliencyMetadata?: GlobalResiliencyMetadata;
  AiAgentInfo?: ContactSearchSummaryAiAgentInfo[];
}
export type Contacts = ContactSearchSummary[];
export type TotalCount = number;
export interface SearchContactsResponse {
  Contacts: ContactSearchSummary[];
  NextToken?: string;
  TotalCount?: number;
}
export interface DataTableSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type DataTableSearchConditionList = DataTableSearchCriteria[];
export interface DataTableSearchCriteria {
  OrConditions?: DataTableSearchCriteria[];
  AndConditions?: DataTableSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchDataTablesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: DataTableSearchFilter;
  SearchCriteria?: DataTableSearchCriteria;
}
export type DataTableList = DataTable[];
export interface SearchDataTablesResponse {
  DataTables?: DataTable[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type EmailAddressSearchConditionList = EmailAddressSearchCriteria[];
export interface EmailAddressSearchCriteria {
  OrConditions?: EmailAddressSearchCriteria[];
  AndConditions?: EmailAddressSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface EmailAddressSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export interface SearchEmailAddressesRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
  SearchCriteria?: EmailAddressSearchCriteria;
  SearchFilter?: EmailAddressSearchFilter;
}
export interface EmailAddressMetadata {
  EmailAddressId?: string;
  EmailAddressArn?: string;
  EmailAddress?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  AliasConfigurations?: AliasConfiguration[];
}
export type EmailAddressList = EmailAddressMetadata[];
export interface SearchEmailAddressesResponse {
  NextToken?: string;
  EmailAddresses?: EmailAddressMetadata[];
  ApproximateTotalCount?: number;
}
export type EvaluationFormSearchConditionList = EvaluationFormSearchCriteria[];
export interface EvaluationFormSearchCriteria {
  OrConditions?: EvaluationFormSearchCriteria[];
  AndConditions?: EvaluationFormSearchCriteria[];
  StringCondition?: StringCondition;
  NumberCondition?: NumberCondition;
  BooleanCondition?: BooleanCondition;
  DateTimeCondition?: DateTimeCondition;
}
export interface EvaluationFormSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export interface SearchEvaluationFormsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchCriteria?: EvaluationFormSearchCriteria;
  SearchFilter?: EvaluationFormSearchFilter;
}
export interface EvaluationFormSearchSummary {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  Title: string;
  Status: EvaluationFormVersionStatus;
  Description?: string;
  CreatedTime: Date;
  CreatedBy: string;
  LastModifiedTime: Date;
  LastModifiedBy: string;
  LastActivatedTime?: Date;
  LastActivatedBy?: string;
  LatestVersion: number;
  ActiveVersion?: number;
  AutoEvaluationEnabled?: boolean;
  EvaluationFormLanguage?: EvaluationFormLanguageCode;
  ContactInteractionType?: ContactInteractionType;
  Tags?: { [key: string]: string | undefined };
}
export type EvaluationFormSearchSummaryList = EvaluationFormSearchSummary[];
export interface SearchEvaluationFormsResponse {
  EvaluationFormSearchSummaryList?: EvaluationFormSearchSummary[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface HoursOfOperationSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type HoursOfOperationOverrideSearchConditionList =
  HoursOfOperationOverrideSearchCriteria[];
export type DateYearMonthDayFormat = string;
export type DateComparisonType =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "LESS_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | (string & {});
export interface DateCondition {
  FieldName?: string;
  Value?: string;
  ComparisonType?: DateComparisonType;
}
export interface HoursOfOperationOverrideSearchCriteria {
  OrConditions?: HoursOfOperationOverrideSearchCriteria[];
  AndConditions?: HoursOfOperationOverrideSearchCriteria[];
  StringCondition?: StringCondition;
  DateCondition?: DateCondition;
}
export interface SearchHoursOfOperationOverridesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: HoursOfOperationSearchFilter;
  SearchCriteria?: HoursOfOperationOverrideSearchCriteria;
}
export interface SearchHoursOfOperationOverridesResponse {
  HoursOfOperationOverrides?: HoursOfOperationOverride[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type HoursOfOperationSearchConditionList =
  HoursOfOperationSearchCriteria[];
export interface HoursOfOperationSearchCriteria {
  OrConditions?: HoursOfOperationSearchCriteria[];
  AndConditions?: HoursOfOperationSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchHoursOfOperationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: HoursOfOperationSearchFilter;
  SearchCriteria?: HoursOfOperationSearchCriteria;
}
export type HoursOfOperationList = HoursOfOperation[];
export interface SearchHoursOfOperationsResponse {
  HoursOfOperations?: HoursOfOperation[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface MetricSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type MetricSearchConditionList = MetricSearchCriteria[];
export interface MetricSearchCriteria {
  OrConditions?: MetricSearchCriteria[];
  AndConditions?: MetricSearchCriteria[];
  StringCondition?: StringCondition;
  BooleanCondition?: BooleanCondition;
}
export interface SearchMetricsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: MetricSearchFilter;
  SearchCriteria?: MetricSearchCriteria;
}
export type MetricSearchSummaryList = MetricDefinition[];
export interface SearchMetricsResponse {
  Metrics?: MetricDefinition[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface NotificationSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type NotificationSearchConditionList = NotificationSearchCriteria[];
export interface NotificationSearchCriteria {
  OrConditions?: NotificationSearchCriteria[];
  AndConditions?: NotificationSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchNotificationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: NotificationSearchFilter;
  SearchCriteria?: NotificationSearchCriteria;
}
export interface NotificationSearchSummary {
  Id?: string;
  Arn?: string;
  InstanceId?: string;
  Content?: { [key: string]: string | undefined };
  Priority?: NotificationPriority;
  Recipients?: string[];
  CreatedAt?: Date;
  ExpiresAt?: Date;
  LastModifiedRegion?: string;
  LastModifiedTime?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type NotificationSearchSummaryList = NotificationSearchSummary[];
export interface SearchNotificationsResponse {
  Notifications?: NotificationSearchSummary[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type PredefinedAttributeSearchConditionList =
  PredefinedAttributeSearchCriteria[];
export interface PredefinedAttributeSearchCriteria {
  OrConditions?: PredefinedAttributeSearchCriteria[];
  AndConditions?: PredefinedAttributeSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchPredefinedAttributesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchCriteria?: PredefinedAttributeSearchCriteria;
}
export type PredefinedAttributeSearchSummaryList = PredefinedAttribute[];
export interface SearchPredefinedAttributesResponse {
  PredefinedAttributes?: PredefinedAttribute[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface PromptSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type PromptSearchConditionList = PromptSearchCriteria[];
export interface PromptSearchCriteria {
  OrConditions?: PromptSearchCriteria[];
  AndConditions?: PromptSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchPromptsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: PromptSearchFilter;
  SearchCriteria?: PromptSearchCriteria;
}
export type PromptList = Prompt[];
export interface SearchPromptsResponse {
  Prompts?: Prompt[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type MaxResult500 = number;
export interface QueueSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type QueueSearchConditionList = QueueSearchCriteria[];
export type SearchableQueueType = "STANDARD" | (string & {});
export interface QueueSearchCriteria {
  OrConditions?: QueueSearchCriteria[];
  AndConditions?: QueueSearchCriteria[];
  StringCondition?: StringCondition;
  QueueTypeCondition?: SearchableQueueType;
}
export interface SearchQueuesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: QueueSearchFilter;
  SearchCriteria?: QueueSearchCriteria;
}
export type QueueSearchSummaryList = Queue[];
export interface SearchQueuesResponse {
  Queues?: Queue[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface QuickConnectSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type QuickConnectSearchConditionList = QuickConnectSearchCriteria[];
export interface QuickConnectSearchCriteria {
  OrConditions?: QuickConnectSearchCriteria[];
  AndConditions?: QuickConnectSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchQuickConnectsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: QuickConnectSearchFilter;
  SearchCriteria?: QuickConnectSearchCriteria;
}
export type QuickConnectSearchSummaryList = QuickConnect[];
export interface SearchQuickConnectsResponse {
  QuickConnects?: QuickConnect[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type ResourceTypeList = string[];
export type TagKeyString = string;
export type TagValueString = string;
export interface TagSearchCondition {
  tagKey?: string;
  tagValue?: string;
  tagKeyComparisonType?: StringComparisonType;
  tagValueComparisonType?: StringComparisonType;
}
export interface ResourceTagsSearchCriteria {
  TagSearchCondition?: TagSearchCondition;
}
export interface SearchResourceTagsRequest {
  InstanceId: string;
  ResourceTypes?: string[];
  NextToken?: string;
  MaxResults?: number;
  SearchCriteria?: ResourceTagsSearchCriteria;
}
export interface TagSet {
  key?: string;
  value?: string;
}
export type TagsList = TagSet[];
export interface SearchResourceTagsResponse {
  Tags?: TagSet[];
  NextToken?: string;
}
export interface RoutingProfileSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type RoutingProfileSearchConditionList = RoutingProfileSearchCriteria[];
export interface RoutingProfileSearchCriteria {
  OrConditions?: RoutingProfileSearchCriteria[];
  AndConditions?: RoutingProfileSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchRoutingProfilesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: RoutingProfileSearchFilter;
  SearchCriteria?: RoutingProfileSearchCriteria;
}
export type RoutingProfileList = RoutingProfile[];
export interface SearchRoutingProfilesResponse {
  RoutingProfiles?: RoutingProfile[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type RulesSearchConditionList = RulesSearchCriteria[];
export interface RulesSearchCriteria {
  OrConditions?: RulesSearchCriteria[];
  AndConditions?: RulesSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface RuleAttributeAndCondition {
  TagConditions?: TagCondition[];
}
export type RuleAttributeOrConditionList = RuleAttributeAndCondition[];
export interface RuleAttributeFilter {
  OrConditions?: RuleAttributeAndCondition[];
  AndCondition?: RuleAttributeAndCondition;
  TagCondition?: TagCondition;
}
export interface RulesSearchFilter {
  AttributeFilter?: RuleAttributeFilter;
}
export interface SearchRulesRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
  SearchCriteria?: RulesSearchCriteria;
  SearchFilter?: RulesSearchFilter;
}
export interface RuleSearchSummary {
  Name: string;
  RuleId: string;
  RuleArn: string;
  TriggerEventSource: RuleTriggerEventSource;
  ActionSummaries: ActionSummary[];
  RuleCapabilityTiers?: RuleCapabilityTier[];
  PublishStatus: RulePublishStatus;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  LastUpdatedBy: string;
  Tags?: { [key: string]: string | undefined };
}
export type RuleSearchSummaryList = RuleSearchSummary[];
export interface SearchRulesResponse {
  Rules: RuleSearchSummary[];
  ApproximateTotalCount?: number;
  NextToken?: string;
}
export type SecurityProfileSearchConditionList =
  SecurityProfileSearchCriteria[];
export interface SecurityProfileSearchCriteria {
  OrConditions?: SecurityProfileSearchCriteria[];
  AndConditions?: SecurityProfileSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SecurityProfilesSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export interface SearchSecurityProfilesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchCriteria?: SecurityProfileSearchCriteria;
  SearchFilter?: SecurityProfilesSearchFilter;
}
export interface SecurityProfileSearchSummary {
  Id?: string;
  OrganizationResourceId?: string;
  Arn?: string;
  SecurityProfileName?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export type SecurityProfilesSearchSummaryList = SecurityProfileSearchSummary[];
export interface SearchSecurityProfilesResponse {
  SecurityProfiles?: SecurityProfileSearchSummary[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface TestCaseSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}
export type TestCaseSearchConditionList = TestCaseSearchCriteria[];
export interface TestCaseSearchCriteria {
  OrConditions?: TestCaseSearchCriteria[];
  AndConditions?: TestCaseSearchCriteria[];
  StringCondition?: StringCondition;
  StatusCondition?: TestCaseStatus;
}
export interface SearchTestCasesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: TestCaseSearchFilter;
  SearchCriteria?: TestCaseSearchCriteria;
}
export type TestCaseSearchSummaryList = TestCase[];
export interface SearchTestCasesResponse {
  TestCases?: TestCase[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface UserHierarchyGroupSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type UserHierarchyGroupSearchConditionList =
  UserHierarchyGroupSearchCriteria[];
export interface UserHierarchyGroupSearchCriteria {
  OrConditions?: UserHierarchyGroupSearchCriteria[];
  AndConditions?: UserHierarchyGroupSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchUserHierarchyGroupsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: UserHierarchyGroupSearchFilter;
  SearchCriteria?: UserHierarchyGroupSearchCriteria;
}
export type UserHierarchyGroupList = HierarchyGroup[];
export interface SearchUserHierarchyGroupsResponse {
  UserHierarchyGroups?: HierarchyGroup[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export type HierarchyGroupMatchType =
  | "EXACT"
  | "WITH_CHILD_GROUPS"
  | (string & {});
export interface HierarchyGroupCondition {
  Value?: string;
  HierarchyGroupMatchType?: HierarchyGroupMatchType;
}
export interface AttributeAndCondition {
  TagConditions?: TagCondition[];
  HierarchyGroupCondition?: HierarchyGroupCondition;
}
export type AttributeOrConditionList = AttributeAndCondition[];
export interface ControlPlaneUserAttributeFilter {
  OrConditions?: AttributeAndCondition[];
  AndCondition?: AttributeAndCondition;
  TagCondition?: TagCondition;
  HierarchyGroupCondition?: HierarchyGroupCondition;
}
export interface UserSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
  UserAttributeFilter?: ControlPlaneUserAttributeFilter;
}
export type UserSearchConditionList = UserSearchCriteria[];
export type TargetListType = "PROFICIENCIES" | (string & {});
export interface Condition {
  StringCondition?: StringCondition;
  NumberCondition?: NumberCondition;
}
export type Conditions = Condition[];
export interface ListCondition {
  TargetListType?: TargetListType;
  Conditions?: Condition[];
}
export interface UserSearchCriteria {
  OrConditions?: UserSearchCriteria[];
  AndConditions?: UserSearchCriteria[];
  StringCondition?: StringCondition;
  ListCondition?: ListCondition;
  HierarchyGroupCondition?: HierarchyGroupCondition;
}
export interface SearchUsersRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: UserSearchFilter;
  SearchCriteria?: UserSearchCriteria;
}
export interface UserIdentityInfoLite {
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
}
export interface UserSearchSummary {
  Arn?: string;
  DirectoryUserId?: string;
  HierarchyGroupId?: string;
  Id?: string;
  IdentityInfo?: UserIdentityInfoLite;
  PhoneConfig?: UserPhoneConfig;
  RoutingProfileId?: string;
  SecurityProfileIds?: string[];
  Tags?: { [key: string]: string | undefined };
  Username?: string;
  AutoAcceptConfigs?: AutoAcceptConfig[];
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  PhoneNumberConfigs?: PhoneNumberConfig[];
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
}
export type UserSearchSummaryList = UserSearchSummary[];
export interface SearchUsersResponse {
  Users?: UserSearchSummary[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface ViewSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type ViewSearchConditionList = ViewSearchCriteria[];
export interface ViewSearchCriteria {
  OrConditions?: ViewSearchCriteria[];
  AndConditions?: ViewSearchCriteria[];
  StringCondition?: StringCondition;
  ViewTypeCondition?: ViewType;
  ViewStatusCondition?: ViewStatus;
}
export interface SearchViewsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: ViewSearchFilter;
  SearchCriteria?: ViewSearchCriteria;
}
export type ViewSearchSummaryList = View[];
export interface SearchViewsResponse {
  Views?: View[];
  NextToken?: string;
  ApproximateTotalCount?: number;
}
export interface SearchVocabulariesRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
  State?: VocabularyState;
  NameStartsWith?: string;
  LanguageCode?: VocabularyLanguageCode;
}
export interface VocabularySummary {
  Name: string;
  Id: string;
  Arn: string;
  LanguageCode: VocabularyLanguageCode;
  State: VocabularyState;
  LastModifiedTime: Date;
  FailureReason?: string;
}
export type VocabularySummaryList = VocabularySummary[];
export interface SearchVocabulariesResponse {
  VocabularySummaryList?: VocabularySummary[];
  NextToken?: string;
}
export interface WorkspaceAssociationSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type WorkspaceAssociationSearchConditionList =
  WorkspaceAssociationSearchCriteria[];
export interface WorkspaceAssociationSearchCriteria {
  OrConditions?: WorkspaceAssociationSearchCriteria[];
  AndConditions?: WorkspaceAssociationSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchWorkspaceAssociationsRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: WorkspaceAssociationSearchFilter;
  SearchCriteria?: WorkspaceAssociationSearchCriteria;
}
export type WorkspaceAssociatedResourceId = string;
export type WorkspaceAssociatedResourceType = string;
export type WorkspaceAssociatedResourceName = string;
export interface WorkspaceAssociationSearchSummary {
  WorkspaceId?: string;
  WorkspaceArn?: string;
  ResourceId?: string;
  ResourceArn?: string;
  ResourceType?: string;
  ResourceName?: string;
}
export type WorkspaceAssociationSearchSummaryList =
  WorkspaceAssociationSearchSummary[];
export interface SearchWorkspaceAssociationsResponse {
  NextToken?: string;
  WorkspaceAssociations?: WorkspaceAssociationSearchSummary[];
  ApproximateTotalCount?: number;
}
export interface WorkspaceSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}
export type WorkspaceSearchConditionList = WorkspaceSearchCriteria[];
export interface WorkspaceSearchCriteria {
  OrConditions?: WorkspaceSearchCriteria[];
  AndConditions?: WorkspaceSearchCriteria[];
  StringCondition?: StringCondition;
}
export interface SearchWorkspacesRequest {
  InstanceId: string;
  NextToken?: string;
  MaxResults?: number;
  SearchFilter?: WorkspaceSearchFilter;
  SearchCriteria?: WorkspaceSearchCriteria;
}
export interface WorkspaceSearchSummary {
  Id?: string;
  Name?: string;
  Visibility?: Visibility;
  Description?: string;
  Title?: string;
  Arn?: string;
  CreatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type WorkspaceSearchSummaryList = WorkspaceSearchSummary[];
export interface SearchWorkspacesResponse {
  NextToken?: string;
  Workspaces?: WorkspaceSearchSummary[];
  ApproximateTotalCount?: number;
}
export type SourceId = string;
export type DestinationId = string;
export type ChatEventType = "DISCONNECT" | "MESSAGE" | "EVENT" | (string & {});
export type ChatContentType = string;
export type ChatContent = string;
export interface ChatEvent {
  Type: ChatEventType;
  ContentType?: string;
  Content?: string;
}
export type SupportedMessagingContentType = string;
export type SupportedMessagingContentTypes = string[];
export interface ParticipantDetails {
  DisplayName: string;
}
export type ChatStreamingEndpointARN = string;
export interface ChatStreamingConfiguration {
  StreamingEndpointArn: string;
}
export interface NewSessionDetails {
  SupportedMessagingContentTypes?: string[];
  ParticipantDetails?: ParticipantDetails;
  Attributes?: { [key: string]: string | undefined };
  StreamingConfiguration?: ChatStreamingConfiguration;
}
export interface SendChatIntegrationEventRequest {
  SourceId: string;
  DestinationId: string;
  Subtype?: string;
  Event: ChatEvent;
  NewSessionDetails?: NewSessionDetails;
}
export type NewChatCreated = boolean;
export interface SendChatIntegrationEventResponse {
  InitialContactId?: string;
  NewChatCreated?: boolean;
}
export interface EmailAddressInfo {
  EmailAddress: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
}
export type EmailAddressRecipientList = EmailAddressInfo[];
export interface OutboundAdditionalRecipients {
  CcEmailAddresses?: EmailAddressInfo[];
}
export type OutboundMessageSourceType = "TEMPLATE" | "RAW" | (string & {});
export type MessageTemplateKnowledgeBaseId = string;
export type MessageTemplateId = string;
export type CustomerProfileAttributesSerialized = string;
export interface TemplateAttributes {
  CustomAttributes?: { [key: string]: string | undefined };
  CustomerProfileAttributes?: string;
}
export interface TemplatedMessageConfig {
  KnowledgeBaseId: string;
  MessageTemplateId: string;
  TemplateAttributes: TemplateAttributes;
}
export type OutboundSubject = string | redacted.Redacted<string>;
export type Body = string | redacted.Redacted<string>;
export type EmailMessageContentType = string;
export interface OutboundRawMessage {
  Subject: string | redacted.Redacted<string>;
  Body: string | redacted.Redacted<string>;
  ContentType: string;
}
export interface OutboundEmailContent {
  MessageSourceType: OutboundMessageSourceType;
  TemplatedMessageConfig?: TemplatedMessageConfig;
  RawMessage?: OutboundRawMessage;
}
export type TrafficType = "GENERAL" | "CAMPAIGN" | (string & {});
export type OutboundRequestId = string;
export interface SourceCampaign {
  CampaignId?: string;
  OutboundRequestId?: string;
}
export interface SendOutboundEmailRequest {
  InstanceId: string;
  FromEmailAddress: EmailAddressInfo;
  DestinationEmailAddress: EmailAddressInfo;
  AdditionalRecipients?: OutboundAdditionalRecipients;
  EmailMessage: OutboundEmailContent;
  TrafficType: TrafficType;
  SourceCampaign?: SourceCampaign;
  ClientToken?: string;
}
export interface SendOutboundEmailResponse {}
export type WebBrowserId = string;
export type WebSessionId = string;
export interface WebNotificationSource {
  SourceCampaign: SourceCampaign;
}
export type WidgetId = string;
export type CustomerProfileId = string;
export interface WidgetDestination {
  WidgetId: string;
  ProfileId: string;
}
export type NotificationType = "WIDGET_VIEW" | "WIDGET_ACTION" | (string & {});
export type ViewArn = string;
export type PersonalizeDomainName = string;
export type RecommenderName = string;
export type RecommenderContextKey = string;
export type RecommenderContextValue = string;
export type RecommenderContext = { [key: string]: string | undefined };
export interface RecommenderConfig {
  DomainName: string;
  RecommenderName: string;
  Context?: { [key: string]: string | undefined };
}
export interface ContentAttributes {
  RecommenderConfig?: RecommenderConfig;
}
export interface WebNotificationContent {
  Type: NotificationType;
  ViewArn?: string;
  Attributes?: ContentAttributes;
}
export interface SendOutboundWebNotificationRequest {
  InstanceId: string;
  ClientToken?: string;
  BrowserId: string;
  SessionId: string;
  ExpiresAt: Date;
  Source: WebNotificationSource;
  Destination: WidgetDestination;
  Content: WebNotificationContent;
}
export interface SendOutboundWebNotificationResponse {}
export interface AiAgentInput {
  AiAgentId: string;
}
export interface ChatMessage {
  ContentType: string;
  Content: string;
}
export interface PersistentChat {
  RehydrationType?: RehydrationType;
  SourceContactId?: string;
}
export interface StartAssistantContactRequest {
  InstanceId: string;
  AiAgent: AiAgentInput;
  ParticipantDetails: ParticipantDetails;
  InitialMessage?: ChatMessage;
  Attributes?: { [key: string]: string | undefined };
  ClientToken?: string;
  PersistentChat?: PersistentChat;
  RelatedContactId?: string;
}
export interface StartAssistantContactResponse {
  ContactId?: string;
  ParticipantId?: string;
  ParticipantToken?: string;
  ContinuedFromContactId?: string;
}
export interface StartAttachedFileUploadRequest {
  ClientToken?: string;
  InstanceId: string;
  FileName: string;
  FileSizeInBytes: number;
  UrlExpiryInSeconds?: number;
  FileUseCaseType: FileUseCaseType;
  AssociatedResourceArn: string;
  CreatedBy?: CreatedByInfo;
  Tags?: { [key: string]: string | undefined };
}
export type UrlMetadataSignedHeadersKey = string;
export type UrlMetadataSignedHeadersValue = string;
export type UrlMetadataSignedHeaders = { [key: string]: string | undefined };
export interface UploadUrlMetadata {
  Url?: string;
  UrlExpiry?: string;
  HeadersToInclude?: { [key: string]: string | undefined };
}
export interface StartAttachedFileUploadResponse {
  FileArn?: string;
  FileId?: string;
  CreationTime?: string;
  FileStatus?: FileStatusType;
  CreatedBy?: CreatedByInfo;
  UploadUrlMetadata?: UploadUrlMetadata;
}
export type ResponseMode = "INCREMENTAL" | "COMPLETE" | (string & {});
export interface ParticipantConfiguration {
  ResponseMode?: ResponseMode;
}
export type ChatDurationInMinutes = number;
export type CustomerIdNonEmpty = string | redacted.Redacted<string>;
export type DisconnectOnCustomerExitParticipantType = "AGENT" | (string & {});
export type DisconnectOnCustomerExit =
  DisconnectOnCustomerExitParticipantType[];
export interface StartChatContactRequest {
  InstanceId: string;
  ContactFlowId: string;
  Attributes?: { [key: string]: string | undefined };
  ParticipantDetails: ParticipantDetails;
  ParticipantConfiguration?: ParticipantConfiguration;
  InitialMessage?: ChatMessage;
  ClientToken?: string;
  ChatDurationInMinutes?: number;
  SupportedMessagingContentTypes?: string[];
  PersistentChat?: PersistentChat;
  RelatedContactId?: string;
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  CustomerId?: string | redacted.Redacted<string>;
  DisconnectOnCustomerExit?: DisconnectOnCustomerExitParticipantType[];
}
export interface StartChatContactResponse {
  ContactId?: string;
  ParticipantId?: string;
  ParticipantToken?: string;
  ContinuedFromContactId?: string;
}
export type AnalyticsMode =
  | "PostContact"
  | "RealTime"
  | "ContactLens"
  | "AutomatedInteraction"
  | (string & {});
export type AnalyticsModes = AnalyticsMode[];
export type LanguageLocale = string;
export interface LanguageConfiguration {
  LanguageLocale?: string;
}
export type Behavior = "Enable" | "Disable" | (string & {});
export type Policy =
  | "None"
  | "RedactedOnly"
  | "RedactedAndOriginal"
  | (string & {});
export type Entity = string;
export type Entities = string[];
export type MaskMode = "PII" | "EntityType" | (string & {});
export interface RedactionConfiguration {
  Behavior: Behavior;
  Policy: Policy;
  Entities?: string[];
  MaskMode?: MaskMode;
}
export interface SentimentConfiguration {
  Behavior: Behavior;
}
export type SummaryMode =
  | "PostContact"
  | "AutomatedInteraction"
  | "ContactChain"
  | (string & {});
export type SummaryModes = SummaryMode[];
export interface SummaryConfiguration {
  SummaryModes: SummaryMode[];
}
export interface RulesConfiguration {
  Behavior?: Behavior;
}
export interface AnalyticsConfiguration {
  LanguageConfiguration: LanguageConfiguration;
  RedactionConfiguration: RedactionConfiguration;
  SentimentConfiguration: SentimentConfiguration;
  SummaryConfiguration: SummaryConfiguration;
  RulesConfiguration: RulesConfiguration;
}
export interface StartContactConversationalAnalyticsJobRequest {
  InstanceId: string;
  ContactId: string;
  AnalyticsModes: AnalyticsMode[];
  AnalyticsConfiguration: AnalyticsConfiguration;
  ClientToken?: string;
}
export interface StartContactConversationalAnalyticsJobResponse {
  InstanceId?: string;
  ContactId?: string;
}
export interface AutoEvaluationConfiguration {
  Enabled: boolean;
}
export interface StartContactEvaluationRequest {
  InstanceId: string;
  ContactId: string;
  EvaluationFormId: string;
  AutoEvaluationConfiguration?: AutoEvaluationConfiguration;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartContactEvaluationResponse {
  EvaluationId: string;
  EvaluationArn: string;
}
export type ContactMediaProcessingFailureMode =
  | "DELIVER_UNPROCESSED_MESSAGE"
  | "DO_NOT_DELIVER_UNPROCESSED_MESSAGE"
  | (string & {});
export interface StartContactMediaProcessingRequest {
  InstanceId?: string;
  ContactId?: string;
  ProcessorArn?: string;
  FailureMode?: ContactMediaProcessingFailureMode;
}
export interface StartContactMediaProcessingResponse {}
export type VoiceRecordingTrack =
  | "FROM_AGENT"
  | "TO_AGENT"
  | "ALL"
  | (string & {});
export type IvrRecordingTrack = "ALL" | (string & {});
export interface VoiceRecordingConfiguration {
  VoiceRecordingTrack?: VoiceRecordingTrack;
  IvrRecordingTrack?: IvrRecordingTrack;
}
export interface StartContactRecordingRequest {
  InstanceId: string;
  ContactId: string;
  InitialContactId: string;
  VoiceRecordingConfiguration: VoiceRecordingConfiguration;
}
export interface StartContactRecordingResponse {}
export interface StartContactStreamingRequest {
  InstanceId: string;
  ContactId: string;
  ChatStreamingConfiguration: ChatStreamingConfiguration;
  ClientToken: string;
}
export type StreamingId = string;
export interface StartContactStreamingResponse {
  StreamingId: string;
}
export type InboundMessageSourceType = "RAW" | (string & {});
export type InboundSubject = string | redacted.Redacted<string>;
export type EmailHeaderType =
  | "REFERENCES"
  | "MESSAGE_ID"
  | "IN_REPLY_TO"
  | "X_SES_SPAM_VERDICT"
  | "X_SES_VIRUS_VERDICT"
  | (string & {});
export type EmailHeaderValue = string;
export type EmailHeaders = { [key in EmailHeaderType]?: string };
export interface InboundRawMessage {
  Subject: string | redacted.Redacted<string>;
  Body: string | redacted.Redacted<string>;
  ContentType: string;
  Headers?: { [key: string]: string | undefined };
}
export interface InboundEmailContent {
  MessageSourceType: InboundMessageSourceType;
  RawMessage?: InboundRawMessage;
}
export interface InboundAdditionalRecipients {
  ToAddresses?: EmailAddressInfo[];
  CcAddresses?: EmailAddressInfo[];
}
export type PreSignedAttachmentUrl = string;
export interface EmailAttachment {
  FileName: string;
  S3Url: string;
}
export type EmailAttachments = EmailAttachment[];
export interface StartEmailContactRequest {
  InstanceId: string;
  FromEmailAddress: EmailAddressInfo;
  DestinationEmailAddress: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  References?: { [key: string]: Reference | undefined };
  Name?: string | redacted.Redacted<string>;
  EmailMessage: InboundEmailContent;
  AdditionalRecipients?: InboundAdditionalRecipients;
  Attachments?: EmailAttachment[];
  ContactFlowId?: string;
  RelatedContactId?: string;
  Attributes?: { [key: string]: string | undefined };
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  ClientToken?: string;
}
export interface StartEmailContactResponse {
  ContactId?: string;
}
export interface StartEvaluationFormValidationRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
}
export interface StartEvaluationFormValidationResponse {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  EvaluationFormVersion: number;
}
export interface StartOutboundChatContactRequest {
  SourceEndpoint: Endpoint;
  DestinationEndpoint: Endpoint;
  InstanceId: string;
  SegmentAttributes: { [key: string]: SegmentAttributeValue | undefined };
  Attributes?: { [key: string]: string | undefined };
  ContactFlowId: string;
  ChatDurationInMinutes?: number;
  ParticipantDetails?: ParticipantDetails;
  InitialSystemMessage?: ChatMessage;
  InitialTemplatedSystemMessage?: TemplatedMessageConfig;
  RelatedContactId?: string;
  SupportedMessagingContentTypes?: string[];
  ClientToken?: string;
}
export interface StartOutboundChatContactResponse {
  ContactId?: string;
}
export interface StartOutboundEmailContactRequest {
  InstanceId: string;
  ContactId: string;
  FromEmailAddress?: EmailAddressInfo;
  DestinationEmailAddress: EmailAddressInfo;
  AdditionalRecipients?: OutboundAdditionalRecipients;
  EmailMessage: OutboundEmailContent;
  ClientToken?: string;
}
export interface StartOutboundEmailContactResponse {
  ContactId?: string;
}
export interface AnswerMachineDetectionConfig {
  EnableAnswerMachineDetection?: boolean;
  AwaitAnswerMachinePrompt?: boolean;
}
export type RingTimeoutInSeconds = number;
export interface StartOutboundVoiceContactRequest {
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  References?: { [key: string]: Reference | undefined };
  RelatedContactId?: string;
  DestinationPhoneNumber: string;
  ContactFlowId: string;
  InstanceId: string;
  ClientToken?: string;
  SourcePhoneNumber?: string;
  QueueId?: string;
  Attributes?: { [key: string]: string | undefined };
  AnswerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  CampaignId?: string;
  TrafficType?: TrafficType;
  OutboundStrategy?: OutboundStrategy;
  RingTimeoutInSeconds?: number;
}
export interface StartOutboundVoiceContactResponse {
  ContactId?: string;
}
export interface StartScreenSharingRequest {
  ClientToken?: string;
  InstanceId: string;
  ContactId: string;
}
export interface StartScreenSharingResponse {}
export interface TaskAttachment {
  FileName: string;
  S3Url: string;
}
export type TaskAttachments = TaskAttachment[];
export interface StartTaskContactRequest {
  InstanceId: string;
  PreviousContactId?: string;
  ContactFlowId?: string;
  Attributes?: { [key: string]: string | undefined };
  Name: string | redacted.Redacted<string>;
  References?: { [key: string]: Reference | undefined };
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
  ScheduledTime?: Date;
  TaskTemplateId?: string;
  QuickConnectId?: string;
  RelatedContactId?: string;
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  Attachments?: TaskAttachment[];
}
export interface StartTaskContactResponse {
  ContactId?: string;
}
export interface StartTestCaseExecutionRequest {
  InstanceId: string;
  TestCaseId: string;
  ClientToken?: string;
}
export interface StartTestCaseExecutionResponse {
  TestCaseExecutionId?: string;
  TestCaseId?: string;
  Status?: TestCaseExecutionStatus;
}
export interface AllowedCapabilities {
  Customer?: ParticipantCapabilities;
  Agent?: ParticipantCapabilities;
}
export interface StartWebRTCContactRequest {
  Attributes?: { [key: string]: string | undefined };
  ClientToken?: string;
  ContactFlowId: string;
  InstanceId: string;
  AllowedCapabilities?: AllowedCapabilities;
  ParticipantDetails: ParticipantDetails;
  RelatedContactId?: string;
  References?: { [key: string]: Reference | undefined };
  Description?: string | redacted.Redacted<string>;
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
}
export type AttendeeId = string;
export type JoinToken = string | redacted.Redacted<string>;
export interface Attendee {
  AttendeeId?: string;
  JoinToken?: string | redacted.Redacted<string>;
}
export type MediaRegion = string;
export interface MediaPlacement {
  AudioHostUrl?: string;
  AudioFallbackUrl?: string;
  SignalingUrl?: string;
  TurnControlUrl?: string;
  EventIngestionUrl?: string;
}
export type MeetingFeatureStatus = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export interface AudioFeatures {
  EchoReduction?: MeetingFeatureStatus;
}
export interface MeetingFeaturesConfiguration {
  Audio?: AudioFeatures;
}
export type MeetingId = string;
export interface Meeting {
  MediaRegion?: string;
  MediaPlacement?: MediaPlacement;
  MeetingFeatures?: MeetingFeaturesConfiguration;
  MeetingId?: string;
}
export interface ConnectionData {
  Attendee?: Attendee;
  Meeting?: Meeting;
}
export interface StartWebRTCContactResponse {
  ConnectionData?: ConnectionData;
  ContactId?: string;
  ParticipantId?: string;
  ParticipantToken?: string;
}
export type DisconnectReasonCode = string;
export interface DisconnectReason {
  Code?: string;
}
export interface StopContactRequest {
  ContactId: string;
  InstanceId: string;
  DisconnectReason?: DisconnectReason;
}
export interface StopContactResponse {}
export interface StopContactMediaProcessingRequest {
  InstanceId?: string;
  ContactId?: string;
}
export interface StopContactMediaProcessingResponse {}
export interface StopContactRecordingRequest {
  InstanceId: string;
  ContactId: string;
  InitialContactId: string;
  ContactRecordingType?: ContactRecordingType;
}
export interface StopContactRecordingResponse {}
export interface StopContactStreamingRequest {
  InstanceId: string;
  ContactId: string;
  StreamingId: string;
}
export interface StopContactStreamingResponse {}
export interface StopTestCaseExecutionRequest {
  InstanceId: string;
  TestCaseExecutionId: string;
  TestCaseId: string;
  ClientToken?: string;
}
export interface StopTestCaseExecutionResponse {}
export interface EvaluationAnswerInput {
  Value?: EvaluationAnswerData;
}
export type EvaluationAnswersInputMap = {
  [key: string]: EvaluationAnswerInput | undefined;
};
export type EvaluatorUserUnion = { ConnectUserArn: string };
export interface SubmitContactEvaluationRequest {
  InstanceId: string;
  EvaluationId: string;
  Answers?: { [key: string]: EvaluationAnswerInput | undefined };
  Notes?: { [key: string]: EvaluationNote | undefined };
  SubmittedBy?: EvaluatorUserUnion;
}
export interface SubmitContactEvaluationResponse {
  EvaluationId: string;
  EvaluationArn: string;
}
export interface SuspendContactRecordingRequest {
  InstanceId: string;
  ContactId: string;
  InitialContactId: string;
  ContactRecordingType?: ContactRecordingType;
}
export interface SuspendContactRecordingResponse {}
export interface TagContactRequest {
  ContactId: string;
  InstanceId: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagContactResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TransferContactRequest {
  InstanceId: string;
  ContactId: string;
  QueueId?: string;
  UserId?: string;
  ContactFlowId: string;
  ClientToken?: string;
}
export interface TransferContactResponse {
  ContactId?: string;
  ContactArn?: string;
}
export type ContactTagKeys = string[];
export interface UntagContactRequest {
  ContactId: string;
  InstanceId: string;
  TagKeys: string[];
}
export interface UntagContactResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type UpdateAgentStatusDescription = string;
export interface UpdateAgentStatusRequest {
  InstanceId: string;
  AgentStatusId: string;
  Name?: string;
  Description?: string;
  State?: AgentStatusState;
  DisplayOrder?: number;
  ResetOrderNumber?: boolean;
}
export interface UpdateAgentStatusResponse {}
export interface UpdateAttachedFilesConfigurationRequest {
  InstanceId: string;
  AttachmentScope: AttachmentScope;
  MaximumSizeLimitInBytes?: number;
  ExtensionConfiguration?: ExtensionConfiguration;
}
export interface UpdateAttachedFilesConfigurationResponse {
  InstanceId: string;
  AttachmentScope: AttachmentScope;
  MaximumSizeLimitInBytes?: number;
  ExtensionConfiguration?: ExtensionConfiguration;
  LastModifiedTime?: Date;
}
export interface UpdateAuthenticationProfileRequest {
  AuthenticationProfileId: string;
  InstanceId: string;
  Name?: string;
  Description?: string;
  AllowedIps?: string[];
  BlockedIps?: string[];
  PeriodicSessionDuration?: number;
  SessionInactivityDuration?: number;
  SessionInactivityHandlingEnabled?: boolean;
}
export interface UpdateAuthenticationProfileResponse {}
export interface QueueInfoInput {
  Id?: string;
}
export interface UpdateContactRequest {
  InstanceId: string;
  ContactId: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  References?: { [key: string]: Reference | undefined };
  SegmentAttributes?: { [key: string]: SegmentAttributeValue | undefined };
  QueueInfo?: QueueInfoInput;
  UserInfo?: UserInfo;
  CustomerEndpoint?: Endpoint;
  SystemEndpoint?: Endpoint;
}
export interface UpdateContactResponse {}
export interface UpdateContactAttributesRequest {
  InitialContactId: string;
  InstanceId: string;
  Attributes: { [key: string]: string | undefined };
}
export interface UpdateContactAttributesResponse {}
export interface UpdateContactEvaluationRequest {
  InstanceId: string;
  EvaluationId: string;
  Answers?: { [key: string]: EvaluationAnswerInput | undefined };
  Notes?: { [key: string]: EvaluationNote | undefined };
  UpdatedBy?: EvaluatorUserUnion;
}
export interface UpdateContactEvaluationResponse {
  EvaluationId: string;
  EvaluationArn: string;
}
export interface UpdateContactFlowContentRequest {
  InstanceId: string;
  ContactFlowId: string;
  Content: string;
}
export interface UpdateContactFlowContentResponse {}
export interface UpdateContactFlowMetadataRequest {
  InstanceId: string;
  ContactFlowId: string;
  Name?: string;
  Description?: string;
  ContactFlowState?: ContactFlowState;
}
export interface UpdateContactFlowMetadataResponse {}
export interface UpdateContactFlowModuleAliasRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  AliasId: string;
  Name?: string;
  Description?: string;
  ContactFlowModuleVersion?: number;
}
export interface UpdateContactFlowModuleAliasResponse {}
export interface UpdateContactFlowModuleContentRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  Content?: string;
  Settings?: string;
}
export interface UpdateContactFlowModuleContentResponse {}
export interface UpdateContactFlowModuleMetadataRequest {
  InstanceId: string;
  ContactFlowModuleId: string;
  Name?: string;
  Description?: string;
  State?: ContactFlowModuleState;
}
export interface UpdateContactFlowModuleMetadataResponse {}
export interface UpdateContactFlowNameRequest {
  InstanceId: string;
  ContactFlowId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateContactFlowNameResponse {}
export interface RoutingCriteriaInputStepExpiry {
  DurationInSeconds?: number;
}
export interface RoutingCriteriaInputStep {
  Expiry?: RoutingCriteriaInputStepExpiry;
  Expression?: Expression;
}
export type RoutingCriteriaInputSteps = RoutingCriteriaInputStep[];
export interface RoutingCriteriaInput {
  Steps?: RoutingCriteriaInputStep[];
}
export interface UpdateContactRoutingDataRequest {
  InstanceId: string;
  ContactId: string;
  QueueTimeAdjustmentSeconds?: number;
  QueuePriority?: number;
  RoutingCriteria?: RoutingCriteriaInput;
}
export interface UpdateContactRoutingDataResponse {}
export interface UpdateContactScheduleRequest {
  InstanceId: string;
  ContactId: string;
  ScheduledTime: Date;
}
export interface UpdateContactScheduleResponse {}
export interface UpdateContactTaskTemplateRequest {
  InstanceId: string;
  TaskTemplateId: string;
  ContactId: string;
}
export interface UpdateContactTaskTemplateResponse {}
export interface UpdateDataTableAttributeRequest {
  InstanceId: string;
  DataTableId: string;
  AttributeName: string;
  Name: string;
  ValueType: DataTableAttributeValueType;
  Description?: string;
  Primary?: boolean;
  Validation?: Validation;
}
export interface UpdateDataTableAttributeResponse {
  Name: string;
  LockVersion: DataTableLockVersion;
}
export interface UpdateDataTableMetadataRequest {
  InstanceId: string;
  DataTableId: string;
  Name: string;
  Description?: string;
  ValueLockLevel: DataTableLockLevel;
  TimeZone: string;
}
export interface UpdateDataTableMetadataResponse {
  LockVersion: DataTableLockVersion;
}
export interface UpdateDataTablePrimaryValuesRequest {
  InstanceId: string;
  DataTableId: string;
  PrimaryValues: PrimaryValue[];
  NewPrimaryValues: PrimaryValue[];
  LockVersion: DataTableLockVersion;
}
export interface UpdateDataTablePrimaryValuesResponse {
  LockVersion: DataTableLockVersion;
}
export interface UpdateEmailAddressMetadataRequest {
  InstanceId: string;
  EmailAddressId: string;
  Description?: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  ClientToken?: string;
}
export interface UpdateEmailAddressMetadataResponse {
  EmailAddressId?: string;
  EmailAddressArn?: string;
}
export interface UpdateEvaluationFormRequest {
  InstanceId: string;
  EvaluationFormId: string;
  EvaluationFormVersion: number;
  CreateNewVersion?: boolean;
  Title: string;
  Description?: string;
  Items: EvaluationFormItem[];
  ScoringStrategy?: EvaluationFormScoringStrategy;
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  ReviewConfiguration?: EvaluationReviewConfiguration;
  AsDraft?: boolean;
  ClientToken?: string;
  TargetConfiguration?: EvaluationFormTargetConfiguration;
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
}
export interface UpdateEvaluationFormResponse {
  EvaluationFormId: string;
  EvaluationFormArn: string;
  EvaluationFormVersion: number;
}
export interface UpdateExtractionDefinitionRequest {
  ClientToken?: string;
  ExtractionDefinitionId: string;
  InstanceId: string;
  Name: string;
  ExtractionConfiguration: ExtractionConfiguration;
  Display?: ExtractionDefinitionDisplay;
}
export interface UpdateExtractionDefinitionResponse {}
export type UpdateHoursOfOperationDescription = string;
export interface UpdateHoursOfOperationRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  Name?: string;
  Description?: string;
  TimeZone?: string;
  Config?: HoursOfOperationConfig[];
}
export interface UpdateHoursOfOperationResponse {}
export interface UpdateHoursOfOperationOverrideRequest {
  InstanceId: string;
  HoursOfOperationId: string;
  HoursOfOperationOverrideId: string;
  Name?: string;
  Description?: string;
  Config?: HoursOfOperationOverrideConfig[];
  EffectiveFrom?: string;
  EffectiveTill?: string;
  RecurrenceConfig?: RecurrenceConfig;
  OverrideType?: OverrideType;
}
export interface UpdateHoursOfOperationOverrideResponse {}
export interface UpdateInstanceAttributeRequest {
  InstanceId: string;
  AttributeType: InstanceAttributeType;
  Value: string;
  ClientToken?: string;
}
export interface UpdateInstanceAttributeResponse {}
export interface UpdateInstanceStorageConfigRequest {
  InstanceId: string;
  AssociationId: string;
  ResourceType: InstanceStorageResourceType;
  StorageConfig: InstanceStorageConfig;
  ClientToken?: string;
}
export interface UpdateInstanceStorageConfigResponse {}
export interface UpdateMetricContentRequest {
  InstanceId: string;
  MetricId: string;
  MetricCalculation?: MetricCalculation;
  Unit?: MetricUnit;
  PositiveTrendIndicator?: TrendIndicator;
}
export interface UpdateMetricContentResponse {}
export interface UpdateMetricMetadataRequest {
  InstanceId: string;
  MetricId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateMetricMetadataResponse {}
export interface UpdateNotificationContentRequest {
  InstanceId: string;
  NotificationId: string;
  Content: { [key: string]: string | undefined };
}
export interface UpdateNotificationContentResponse {}
export type AuthorizationCode = string | redacted.Redacted<string>;
export type AuthenticationError = string | redacted.Redacted<string>;
export type AuthenticationErrorDescription = string | redacted.Redacted<string>;
export interface UpdateParticipantAuthenticationRequest {
  State: string;
  InstanceId: string;
  Code?: string | redacted.Redacted<string>;
  Error?: string | redacted.Redacted<string>;
  ErrorDescription?: string | redacted.Redacted<string>;
}
export interface UpdateParticipantAuthenticationResponse {}
export type TimerEligibleParticipantRoles =
  | "CUSTOMER"
  | "AGENT"
  | (string & {});
export type ParticipantTimerType =
  | "IDLE"
  | "DISCONNECT_NONCUSTOMER"
  | (string & {});
export type ParticipantTimerAction = "Unset" | (string & {});
export type ParticipantTimerDurationInMinutes = number;
export type ParticipantTimerValue =
  | {
      ParticipantTimerAction: ParticipantTimerAction;
      ParticipantTimerDurationInMinutes?: never;
    }
  | {
      ParticipantTimerAction?: never;
      ParticipantTimerDurationInMinutes: number;
    };
export interface ParticipantTimerConfiguration {
  ParticipantRole: TimerEligibleParticipantRoles;
  TimerType: ParticipantTimerType;
  TimerValue: ParticipantTimerValue;
}
export type ParticipantTimerConfigList = ParticipantTimerConfiguration[];
export interface ChatParticipantRoleConfig {
  ParticipantTimerConfigList: ParticipantTimerConfiguration[];
}
export type UpdateParticipantRoleConfigChannelInfo = {
  Chat: ChatParticipantRoleConfig;
};
export interface UpdateParticipantRoleConfigRequest {
  InstanceId: string;
  ContactId: string;
  ChannelConfiguration: UpdateParticipantRoleConfigChannelInfo;
}
export interface UpdateParticipantRoleConfigResponse {}
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string;
  TargetArn?: string;
  InstanceId?: string;
  ClientToken?: string;
}
export interface UpdatePhoneNumberResponse {
  PhoneNumberId?: string;
  PhoneNumberArn?: string;
}
export interface UpdatePhoneNumberMetadataRequest {
  PhoneNumberId: string;
  PhoneNumberDescription?: string;
  ClientToken?: string;
}
export interface UpdatePhoneNumberMetadataResponse {}
export interface UpdatePredefinedAttributeRequest {
  InstanceId: string;
  Name: string;
  Values?: PredefinedAttributeValues;
  Purposes?: string[];
  AttributeConfiguration?: InputPredefinedAttributeConfiguration;
}
export interface UpdatePredefinedAttributeResponse {}
export interface UpdatePromptRequest {
  InstanceId: string;
  PromptId: string;
  Name?: string;
  Description?: string;
  S3Uri?: string;
}
export interface UpdatePromptResponse {
  PromptARN?: string;
  PromptId?: string;
}
export interface UpdateQueueHoursOfOperationRequest {
  InstanceId: string;
  QueueId: string;
  HoursOfOperationId: string;
}
export interface UpdateQueueHoursOfOperationResponse {}
export interface UpdateQueueMaxContactsRequest {
  InstanceId: string;
  QueueId: string;
  MaxContacts?: number;
}
export interface UpdateQueueMaxContactsResponse {}
export interface UpdateQueueNameRequest {
  InstanceId: string;
  QueueId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateQueueNameResponse {}
export interface UpdateQueueOutboundCallerConfigRequest {
  InstanceId: string;
  QueueId: string;
  OutboundCallerConfig: OutboundCallerConfig;
}
export interface UpdateQueueOutboundCallerConfigResponse {}
export interface UpdateQueueOutboundEmailConfigRequest {
  InstanceId: string;
  QueueId: string;
  OutboundEmailConfig: OutboundEmailConfig;
}
export interface UpdateQueueOutboundEmailConfigResponse {}
export interface UpdateQueueStatusRequest {
  InstanceId: string;
  QueueId: string;
  Status: QueueStatus;
}
export interface UpdateQueueStatusResponse {}
export interface UpdateQuickConnectConfigRequest {
  InstanceId: string;
  QuickConnectId: string;
  QuickConnectConfig: QuickConnectConfig;
}
export interface UpdateQuickConnectConfigResponse {}
export type UpdateQuickConnectDescription = string;
export interface UpdateQuickConnectNameRequest {
  InstanceId: string;
  QuickConnectId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateQuickConnectNameResponse {}
export interface UpdateRoutingProfileAgentAvailabilityTimerRequest {
  InstanceId: string;
  RoutingProfileId: string;
  AgentAvailabilityTimer: AgentAvailabilityTimer;
}
export interface UpdateRoutingProfileAgentAvailabilityTimerResponse {}
export interface UpdateRoutingProfileConcurrencyRequest {
  InstanceId: string;
  RoutingProfileId: string;
  MediaConcurrencies: MediaConcurrency[];
}
export interface UpdateRoutingProfileConcurrencyResponse {}
export interface UpdateRoutingProfileDefaultOutboundQueueRequest {
  InstanceId: string;
  RoutingProfileId: string;
  DefaultOutboundQueueId: string;
}
export interface UpdateRoutingProfileDefaultOutboundQueueResponse {}
export interface UpdateRoutingProfileNameRequest {
  InstanceId: string;
  RoutingProfileId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateRoutingProfileNameResponse {}
export interface UpdateRoutingProfileQueuesRequest {
  InstanceId: string;
  RoutingProfileId: string;
  QueueConfigs: RoutingProfileQueueConfig[];
}
export interface UpdateRoutingProfileQueuesResponse {}
export interface UpdateRuleRequest {
  RuleId: string;
  InstanceId: string;
  Name: string;
  Function: string;
  Actions: RuleAction[];
  PublishStatus: RulePublishStatus;
}
export interface UpdateRuleResponse {}
export interface UpdateSecurityProfileRequest {
  Description?: string;
  Permissions?: string[];
  SecurityProfileId: string;
  InstanceId: string;
  AllowedAccessControlTags?: { [key: string]: string | undefined };
  TagRestrictedResources?: string[];
  Applications?: Application[];
  HierarchyRestrictedResources?: string[];
  AllowedAccessControlHierarchyGroupId?: string;
  AllowedFlowModules?: FlowModule[];
  GranularAccessControlConfiguration?: GranularAccessControlConfiguration;
}
export interface UpdateSecurityProfileResponse {}
export interface UpdateTaskTemplateRequest {
  TaskTemplateId: string;
  InstanceId: string;
  Name?: string;
  Description?: string;
  ContactFlowId?: string;
  SelfAssignFlowId?: string;
  Constraints?: TaskTemplateConstraints;
  Defaults?: TaskTemplateDefaults;
  Status?: TaskTemplateStatus;
  Fields?: TaskTemplateField[];
}
export interface UpdateTaskTemplateResponse {
  InstanceId?: string;
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  ContactFlowId?: string;
  SelfAssignFlowId?: string;
  Constraints?: TaskTemplateConstraints;
  Defaults?: TaskTemplateDefaults;
  Fields?: TaskTemplateField[];
  Status?: TaskTemplateStatus;
  LastModifiedTime?: Date;
  CreatedTime?: Date;
}
export interface UpdateTestCaseRequest {
  InstanceId: string;
  TestCaseId: string;
  Content?: string;
  EntryPoint?: TestCaseEntryPoint;
  InitializationData?: string;
  Name?: string;
  Description?: string;
  Status?: TestCaseStatus;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface UpdateTestCaseResponse {}
export interface UpdateTrafficDistributionRequest {
  Id: string;
  TelephonyConfig?: TelephonyConfig;
  SignInConfig?: SignInConfig;
  AgentConfig?: AgentConfig;
}
export interface UpdateTrafficDistributionResponse {}
export interface UpdateUserConfigRequest {
  AutoAcceptConfigs?: AutoAcceptConfig[];
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  PhoneNumberConfigs?: PhoneNumberConfig[];
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserConfigResponse {}
export interface UpdateUserHierarchyRequest {
  HierarchyGroupId?: string;
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserHierarchyResponse {}
export interface UpdateUserHierarchyGroupNameRequest {
  Name: string;
  HierarchyGroupId: string;
  InstanceId: string;
}
export interface UpdateUserHierarchyGroupNameResponse {}
export interface HierarchyLevelUpdate {
  Name: string;
}
export interface HierarchyStructureUpdate {
  LevelOne?: HierarchyLevelUpdate;
  LevelTwo?: HierarchyLevelUpdate;
  LevelThree?: HierarchyLevelUpdate;
  LevelFour?: HierarchyLevelUpdate;
  LevelFive?: HierarchyLevelUpdate;
}
export interface UpdateUserHierarchyStructureRequest {
  HierarchyStructure: HierarchyStructureUpdate;
  InstanceId: string;
}
export interface UpdateUserHierarchyStructureResponse {}
export interface UpdateUserIdentityInfoRequest {
  IdentityInfo: UserIdentityInfo;
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserIdentityInfoResponse {}
export interface UpdateUserNotificationStatusRequest {
  InstanceId: string;
  NotificationId: string;
  UserId: string;
  Status: NotificationStatus;
  LastModifiedTime?: Date;
  LastModifiedRegion?: string;
}
export interface UpdateUserNotificationStatusResponse {}
export interface UpdateUserPhoneConfigRequest {
  PhoneConfig: UserPhoneConfig;
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserPhoneConfigResponse {}
export interface UpdateUserProficienciesRequest {
  InstanceId: string;
  UserId: string;
  UserProficiencies: UserProficiency[];
}
export interface UpdateUserProficienciesResponse {}
export interface UpdateUserRoutingProfileRequest {
  RoutingProfileId: string;
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserRoutingProfileResponse {}
export interface UpdateUserSecurityProfilesRequest {
  SecurityProfileIds: string[];
  UserId: string;
  InstanceId: string;
}
export interface UpdateUserSecurityProfilesResponse {}
export interface UpdateViewContentRequest {
  InstanceId: string;
  ViewId: string;
  Status: ViewStatus;
  Content: ViewInputContent;
}
export interface UpdateViewContentResponse {
  View?: View;
}
export interface UpdateViewMetadataRequest {
  InstanceId: string;
  ViewId: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string;
}
export interface UpdateViewMetadataResponse {}
export interface UpdateWorkspaceMetadataRequest {
  InstanceId: string;
  WorkspaceId: string;
  Name?: string;
  Description?: string;
  Title?: string;
}
export interface UpdateWorkspaceMetadataResponse {}
export interface UpdateWorkspacePageRequest {
  InstanceId: string;
  WorkspaceId: string;
  Page: string;
  NewPage?: string;
  ResourceArn?: string;
  Slug?: string;
  InputData?: string;
}
export interface UpdateWorkspacePageResponse {}
export interface UpdateWorkspaceThemeRequest {
  InstanceId: string;
  WorkspaceId: string;
  Theme?: WorkspaceTheme;
}
export interface UpdateWorkspaceThemeResponse {}
export interface UpdateWorkspaceVisibilityRequest {
  InstanceId: string;
  WorkspaceId: string;
  Visibility: Visibility;
}
export interface UpdateWorkspaceVisibilityResponse {}
export type Message = string;
export type AttachedFileInvalidRequestExceptionReason =
  | "INVALID_FILE_SIZE"
  | "INVALID_FILE_TYPE"
  | "INVALID_FILE_NAME"
  | (string & {});
export type InvalidRequestExceptionReason = {
  AttachedFileInvalidRequestExceptionReason: AttachedFileInvalidRequestExceptionReason;
};
export type AttachedFileServiceQuotaExceededExceptionReason =
  | "TOTAL_FILE_SIZE_EXCEEDED"
  | "TOTAL_FILE_COUNT_EXCEEDED"
  | (string & {});
export type ServiceQuotaExceededExceptionReason = {
  AttachedFileServiceQuotaExceededExceptionReason: AttachedFileServiceQuotaExceededExceptionReason;
};
export type ProblemMessageString = string;
export interface ProblemDetail {
  message?: string;
}
export type Problems = ProblemDetail[];
export type PropertyValidationExceptionReason =
  | "INVALID_FORMAT"
  | "UNIQUE_CONSTRAINT_VIOLATED"
  | "REFERENCED_RESOURCE_NOT_FOUND"
  | "RESOURCE_NAME_ALREADY_EXISTS"
  | "REQUIRED_PROPERTY_MISSING"
  | "NOT_SUPPORTED"
  | "TYPE_MISMATCH"
  | (string & {});
export interface PropertyValidationExceptionProperty {
  PropertyPath: string;
  Reason: PropertyValidationExceptionReason;
  Message: string;
}
export type PropertyValidationExceptionPropertyList =
  PropertyValidationExceptionProperty[];
export type ResourceType =
  | "CONTACT"
  | "CONTACT_FLOW"
  | "INSTANCE"
  | "PARTICIPANT"
  | "HIERARCHY_LEVEL"
  | "HIERARCHY_GROUP"
  | "USER"
  | "PHONE_NUMBER"
  | (string & {});
export type ActivateEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Activates an evaluation form in the specified Connect Customer instance. After the evaluation form is
 * activated, it is available to start new evaluations based on the form.
 */
export const activateEvaluationForm: API.OperationMethod<
  ActivateEvaluationFormRequest,
  ActivateEvaluationFormResponse,
  ActivateEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluation-forms/{InstanceId}/{EvaluationFormId}/activate",
    input: { InstanceId: 0, EvaluationFormId: 0, EvaluationFormVersion: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateEvaluationForm",
})) as any;

export type AssociateAnalyticsDataSetError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates the specified dataset for a Connect Customer instance with the target account. You can associate
 * only one dataset in a single call.
 */
export const associateAnalyticsDataSet: API.OperationMethod<
  AssociateAnalyticsDataSetRequest,
  AssociateAnalyticsDataSetResponse,
  AssociateAnalyticsDataSetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analytics-data/instance/{InstanceId}/association",
    input: { InstanceId: 0, DataSetId: 0, TargetAccountId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAnalyticsDataSet",
})) as any;

export type AssociateApprovedOriginError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Associates an approved origin to an Connect Customer instance.
 */
export const associateApprovedOrigin: API.OperationMethod<
  AssociateApprovedOriginRequest,
  AssociateApprovedOriginResponse,
  AssociateApprovedOriginError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/approved-origin",
    input: {
      InstanceId: 0,
      Origin: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApprovedOrigin",
})) as any;

export type AssociateBotError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Allows the specified Connect Customer instance to access the specified Amazon Lex or Amazon Lex V2
 * bot.
 */
export const associateBot: API.OperationMethod<
  AssociateBotRequest,
  AssociateBotResponse,
  AssociateBotError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/bot",
    input: {
      InstanceId: 0,
      LexBot: i_LexBot,
      LexV2Bot: i_LexV2Bot,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBot",
})) as any;

export type AssociateContactWithUserError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a queued contact with an agent.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Programmatically assign queued contacts to available users.
 *
 * - Leverage the IAM context key `connect:PreferredUserArn` to restrict contact association to specific
 * preferred user.
 *
 * **Important things to know**
 *
 * - Use this API with chat, email, task, and voice contacts. For voice callbacks, this API does not support customer-first mode.
 *
 * - This API can be used to offer a contact to an agent even if the agent is currently at maximum concurrency
 * for the channel.
 *
 * - Use it to associate contacts with users regardless of their current state, including custom states. Ensure
 * your application logic accounts for user availability before making associations.
 *
 * - It honors the IAM context key `connect:PreferredUserArn` to prevent unauthorized contact
 * associations.
 *
 * - It respects the IAM context key `connect:PreferredUserArn` to enforce authorization controls and
 * prevent unauthorized contact associations. Verify that your IAM policies are properly configured to support your
 * intended use cases.
 *
 * - The service quota *Queues per routing profile per instance* applies to manually assigned
 * queues, too. For more information about this quota, see Connect Customer
 * quotas in the *Connect Customer Administrator Guide*.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const associateContactWithUser: API.OperationMethod<
  AssociateContactWithUserRequest,
  AssociateContactWithUserResponse,
  AssociateContactWithUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contacts/{InstanceId}/{ContactId}/associate-user",
    input: { InstanceId: 0, ContactId: 0, UserId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateContactWithUser",
})) as any;

export type AssociateDefaultVocabularyError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an existing vocabulary as the default. Contact Lens for Connect Customer uses the vocabulary in post-call and real-time
 * analysis sessions for the given language.
 */
export const associateDefaultVocabulary: API.OperationMethod<
  AssociateDefaultVocabularyRequest,
  AssociateDefaultVocabularyResponse,
  AssociateDefaultVocabularyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /default-vocabulary/{InstanceId}/{LanguageCode}",
    input: { InstanceId: 0, LanguageCode: 0, VocabularyId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDefaultVocabulary",
})) as any;

export type AssociateEmailAddressAliasError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an email address alias with an existing email address in an Connect Customer instance. This creates
 * a forwarding relationship where emails sent to the alias email address are automatically forwarded to the primary
 * email address.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - **Unified customer support**: Create multiple entry points (for example,
 * support@example.com, help@example.com, customercare@example.com) that all forward to a single agent queue for
 * streamlined management.
 *
 * - **Department consolidation**: Forward emails from legacy department addresses
 * (for example, sales@example.com, info@example.com) to a centralized customer service email during organizational
 * restructuring.
 *
 * - **Brand management**: Enable you to use familiar brand-specific email addresses
 * that forward to the appropriate Connect Customer instance email address.
 *
 * **Important things to know**
 *
 * - Each email address can have a maximum of one alias. You cannot create multiple aliases for the same email
 * address.
 *
 * - If the alias email address already receives direct emails, it continues to receive direct emails plus
 * forwarded emails.
 *
 * - You cannot chain email aliases together (that is, create an alias of an alias).
 *
 * `AssociateEmailAddressAlias` does not return the following information:
 *
 * - A confirmation of the alias relationship details (you must call DescribeEmailAddress to verify).
 *
 * - The timestamp of when the association occurred.
 *
 * - The status of the forwarding configuration.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 *
 * **Related operations**
 *
 * - DisassociateEmailAddressAlias: Removes the alias association between two email addresses in an Connect Customer instance.
 *
 * - DescribeEmailAddress: View current alias configurations for an email address.
 *
 * - SearchEmailAddresses: Find email addresses and their alias relationships across an instance.
 *
 * - CreateEmailAddress: Create new email addresses that can participate in alias relationships.
 *
 * - DeleteEmailAddress: Remove email addresses (automatically removes any alias relationships).
 *
 * - UpdateEmailAddressMetadata: Modify email address properties (does not affect alias relationships).
 */
export const associateEmailAddressAlias: API.OperationMethod<
  AssociateEmailAddressAliasRequest,
  AssociateEmailAddressAliasResponse,
  AssociateEmailAddressAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /email-addresses/{InstanceId}/{EmailAddressId}/associate-alias",
    input: {
      EmailAddressId: 0,
      InstanceId: 0,
      AliasConfiguration: i_AliasConfiguration,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEmailAddressAlias",
})) as any;

export type AssociateFlowError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a connect resource to a flow.
 */
export const associateFlow: API.OperationMethod<
  AssociateFlowRequest,
  AssociateFlowResponse,
  AssociateFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /flow-associations/{InstanceId}",
    input: { InstanceId: 0, ResourceId: 0, FlowId: 0, ResourceType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFlow",
})) as any;

export type AssociateHoursOfOperationsError =
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a set of hours of operations with another hours of operation. For more information about inheriting overrides from parent hours of operation, see Hours of operation overrides in the Administrator Guide.
 */
export const associateHoursOfOperations: API.OperationMethod<
  AssociateHoursOfOperationsRequest,
  AssociateHoursOfOperationsResponse,
  AssociateHoursOfOperationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hours-of-operations/{InstanceId}/{HoursOfOperationId}/associate-hours",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      ParentHoursOfOperationConfigs: D.list(i_ParentHoursOfOperationConfig),
    },
    body: true,
  },
  errors: [
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateHoursOfOperations",
})) as any;

export type AssociateInstanceStorageConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Associates a storage resource type for the first time. You can only associate one type of storage configuration
 * in a single call. This means, for example, that you can't define an instance with multiple S3 buckets for storing
 * chat transcripts.
 *
 * This API does not create a resource that doesn't exist. It only associates it to the instance. Ensure that the
 * resource being specified in the storage configuration, like an S3 bucket, exists when being used for
 * association.
 */
export const associateInstanceStorageConfig: API.OperationMethod<
  AssociateInstanceStorageConfigRequest,
  AssociateInstanceStorageConfigResponse,
  AssociateInstanceStorageConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/storage-config",
    input: {
      InstanceId: 0,
      ResourceType: 0,
      StorageConfig: i_InstanceStorageConfig,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateInstanceStorageConfig",
})) as any;

export type AssociateLambdaFunctionError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Allows the specified Connect Customer instance to access the specified Lambda function.
 */
export const associateLambdaFunction: API.OperationMethod<
  AssociateLambdaFunctionRequest,
  AssociateLambdaFunctionResponse,
  AssociateLambdaFunctionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/lambda-function",
    input: {
      InstanceId: 0,
      FunctionArn: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLambdaFunction",
})) as any;

export type AssociateLexBotError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Allows the specified Connect Customer instance to access the specified Amazon Lex V1 bot. This API
 * only supports the association of Amazon Lex V1 bots.
 */
export const associateLexBot: API.OperationMethod<
  AssociateLexBotRequest,
  AssociateLexBotResponse,
  AssociateLexBotError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/lex-bot",
    input: {
      InstanceId: 0,
      LexBot: i_LexBot,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLexBot",
})) as any;

export type AssociatePhoneNumberContactFlowError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a flow with a phone number claimed to your Connect Customer instance.
 *
 * If the number is claimed to a traffic distribution group, and you are calling this API using an instance in the Amazon Web Services Region where the traffic distribution group was created, you can use either a full phone number ARN or UUID value for the
 * `PhoneNumberId` URI request parameter. However, if the number is claimed to a traffic distribution group and you are calling
 * this API using an instance in the alternate Amazon Web Services Region associated with the traffic distribution group, you must provide a
 * full phone number ARN. If a UUID is provided
 * in
 * this scenario, you will receive a `ResourceNotFoundException`.
 */
export const associatePhoneNumberContactFlow: API.OperationMethod<
  AssociatePhoneNumberContactFlowRequest,
  AssociatePhoneNumberContactFlowResponse,
  AssociatePhoneNumberContactFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /phone-number/{PhoneNumberId}/contact-flow",
    input: { PhoneNumberId: 0, InstanceId: 0, ContactFlowId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePhoneNumberContactFlow",
})) as any;

export type AssociateQueueEmailAddressesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a set of email addresses with a queue to enable agents to select different "From" (system) email addresses when replying to inbound email contacts or initiating outbound email contacts. This allows agents to handle email contacts across different brands and business units within the same queue.
 *
 * **Important things to know**
 *
 * - You can associate up to 49 additional email addresses with a single queue, plus 1 default outbound email address, for a total of 50.
 *
 * - The email addresses must already exist in the Connect Customer instance before they can be associated with a queue.
 *
 * - Agents will be able to select from these associated email addresses when handling email contacts in the queue.
 *
 * - For inbound email contacts, agents can select from email addresses associated with the queue where the contact was accepted.
 *
 * - For outbound email contacts, agents can select from email addresses associated with their default outbound queue configured in their routing profile.
 */
export const associateQueueEmailAddresses: API.OperationMethod<
  AssociateQueueEmailAddressesRequest,
  AssociateQueueEmailAddressesResponse,
  AssociateQueueEmailAddressesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/associate-email-addresses",
    input: {
      InstanceId: 0,
      QueueId: 0,
      EmailAddressesConfig: D.list(i_EmailAddressConfig),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQueueEmailAddresses",
})) as any;

export type AssociateQueueQuickConnectsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a set of quick connects with a queue.
 */
export const associateQueueQuickConnects: API.OperationMethod<
  AssociateQueueQuickConnectsRequest,
  AssociateQueueQuickConnectsResponse,
  AssociateQueueQuickConnectsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/associate-quick-connects",
    input: { InstanceId: 0, QueueId: 0, QuickConnectIds: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQueueQuickConnects",
})) as any;

export type AssociateRoutingProfileQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a set of queues with a routing profile.
 */
export const associateRoutingProfileQueues: API.OperationMethod<
  AssociateRoutingProfileQueuesRequest,
  AssociateRoutingProfileQueuesResponse,
  AssociateRoutingProfileQueuesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/associate-queues",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      QueueConfigs: D.list(i_RoutingProfileQueueConfig),
      ManualAssignmentQueueConfigs: D.list(
        i_RoutingProfileManualAssignmentQueueConfig,
      ),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateRoutingProfileQueues",
})) as any;

export type AssociateSecurityKeyError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Associates a security key to the instance.
 */
export const associateSecurityKey: API.OperationMethod<
  AssociateSecurityKeyRequest,
  AssociateSecurityKeyResponse,
  AssociateSecurityKeyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/security-key",
    input: { InstanceId: 0, Key: 0, ClientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSecurityKey",
})) as any;

export type AssociateSecurityProfilesError =
  | AccessDeniedException
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate security profiles with an Entity in an Amazon Connect instance.
 */
export const associateSecurityProfiles: API.OperationMethod<
  AssociateSecurityProfilesRequest,
  AssociateSecurityProfilesResponse,
  AssociateSecurityProfilesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /associate-security-profiles/{InstanceId}",
    input: {
      InstanceId: 0,
      SecurityProfiles: D.list(i_SecurityProfileItem),
      EntityType: 0,
      EntityArn: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSecurityProfiles",
})) as any;

export type AssociateTrafficDistributionGroupUserError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an agent with a traffic distribution group. This API can be called only in the Region where the traffic distribution group
 * is created.
 */
export const associateTrafficDistributionGroupUser: API.OperationMethod<
  AssociateTrafficDistributionGroupUserRequest,
  AssociateTrafficDistributionGroupUserResponse,
  AssociateTrafficDistributionGroupUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /traffic-distribution-group/{TrafficDistributionGroupId}/user",
    input: { TrafficDistributionGroupId: 0, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTrafficDistributionGroupUser",
})) as any;

export type AssociateUserProficienciesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a set of proficiencies with a user.
 */
export const associateUserProficiencies: API.OperationMethod<
  AssociateUserProficienciesRequest,
  AssociateUserProficienciesResponse,
  AssociateUserProficienciesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/associate-proficiencies",
    input: {
      InstanceId: 0,
      UserId: 0,
      UserProficiencies: D.list(i_UserProficiency),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateUserProficiencies",
})) as any;

export type AssociateWorkspaceError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a workspace with one or more users or routing profiles, allowing them to access the workspace's
 * configured views and pages.
 */
export const associateWorkspace: API.OperationMethod<
  AssociateWorkspaceRequest,
  AssociateWorkspaceResponse,
  AssociateWorkspaceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/associate",
    input: { InstanceId: 0, WorkspaceId: 0, ResourceArns: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWorkspace",
})) as any;

export type BatchAssociateAnalyticsDataSetError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a list of analytics datasets for a given Connect Customer instance to a target account. You can
 * associate multiple datasets in a single call.
 */
export const batchAssociateAnalyticsDataSet: API.OperationMethod<
  BatchAssociateAnalyticsDataSetRequest,
  BatchAssociateAnalyticsDataSetResponse,
  BatchAssociateAnalyticsDataSetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /analytics-data/instance/{InstanceId}/associations",
    input: { InstanceId: 0, DataSetIds: 0, TargetAccountId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateAnalyticsDataSet",
})) as any;

export type BatchCreateDataTableValueError =
  | AccessDeniedException
  | ConflictException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates values for attributes in a data table. The value may be a default or it may be associated with a primary
 * value. The value must pass all customer defined validation as well as the default validation for the value type. The
 * operation must conform to Batch Operation API Standards. Although the standard specifies that successful and failed
 * entities are listed separately in the response, authorization fails if any primary values or attributes are
 * unauthorized. The combination of primary values and the attribute name serve as the identifier for the individual
 * item request.
 */
export const batchCreateDataTableValue: API.OperationMethod<
  BatchCreateDataTableValueRequest,
  BatchCreateDataTableValueResponse,
  BatchCreateDataTableValueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/create",
    input: { InstanceId: 0, DataTableId: 0, Values: D.list(i_DataTableValue) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateDataTableValue",
})) as any;

export type BatchDeleteDataTableValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes multiple values from a data table. API users may delete values at any time. When deletion is requested
 * from the admin website, a warning is shown alerting the user of the most recent time the attribute and its values
 * were accessed. System managed values are not deletable by customers.
 */
export const batchDeleteDataTableValue: API.OperationMethod<
  BatchDeleteDataTableValueRequest,
  BatchDeleteDataTableValueResponse,
  BatchDeleteDataTableValueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/delete",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      Values: D.list({
        PrimaryValues: D.list(i_PrimaryValue),
        AttributeName: 0,
        LockVersion: i_DataTableLockVersion,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteDataTableValue",
})) as any;

export type BatchDescribeDataTableValueError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves multiple values from a data table without evaluating expressions. Returns the raw stored values along
 * with metadata such as lock versions and modification timestamps. "Describe" is a deprecated term but is allowed to
 * maintain consistency with existing operations.
 */
export const batchDescribeDataTableValue: API.OperationMethod<
  BatchDescribeDataTableValueRequest,
  BatchDescribeDataTableValueResponse,
  BatchDescribeDataTableValueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/describe",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      Values: D.list({
        PrimaryValues: D.list(i_PrimaryValue),
        AttributeName: 0,
      }),
    },
    output: { Successful: D.list({ LastModifiedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeDataTableValue",
})) as any;

export type BatchDisassociateAnalyticsDataSetError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a list of analytics datasets associated with a given Connect Customer instance. You can disassociate
 * multiple datasets in a single call.
 */
export const batchDisassociateAnalyticsDataSet: API.OperationMethod<
  BatchDisassociateAnalyticsDataSetRequest,
  BatchDisassociateAnalyticsDataSetResponse,
  BatchDisassociateAnalyticsDataSetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /analytics-data/instance/{InstanceId}/associations",
    input: { InstanceId: 0, DataSetIds: 0, TargetAccountId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateAnalyticsDataSet",
})) as any;

export type BatchGetAttachedFileMetadataError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to retrieve metadata about multiple attached files on an associated resource. Each attached file
 * provided in the input list must be associated with the input AssociatedResourceArn.
 */
export const batchGetAttachedFileMetadata: API.OperationMethod<
  BatchGetAttachedFileMetadataRequest,
  BatchGetAttachedFileMetadataResponse,
  BatchGetAttachedFileMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attached-files/{InstanceId}",
    input: {
      FileIds: 0,
      InstanceId: 0,
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAttachedFileMetadata",
})) as any;

export type BatchGetFlowAssociationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieve the flow associations for the given resources.
 */
export const batchGetFlowAssociation: API.OperationMethod<
  BatchGetFlowAssociationRequest,
  BatchGetFlowAssociationResponse,
  BatchGetFlowAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /flow-associations-batch/{InstanceId}",
    input: { InstanceId: 0, ResourceIds: 0, ResourceType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFlowAssociation",
})) as any;

export type BatchPutContactError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Only the Connect Customer outbound campaigns service principal is allowed to assume a role in your account
 * and call this API.
 *
 * Allows you to create a batch of contacts in Connect Customer. The outbound campaigns capability ingests dial
 * requests via the PutDialRequestBatch API. It then uses BatchPutContact to create contacts corresponding to those dial
 * requests. If agents are available, the dial requests are dialed out, which results in a voice call. The resulting
 * voice call uses the same contactId that was created by BatchPutContact.
 */
export const batchPutContact: API.OperationMethod<
  BatchPutContactRequest,
  BatchPutContactResponse,
  BatchPutContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/batch/{InstanceId}",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      ContactDataRequestList: D.list({
        SystemEndpoint: i_Endpoint,
        CustomerEndpoint: i_Endpoint,
        RequestIdentifier: 0,
        QueueId: 0,
        Attributes: 0,
        Campaign: { CampaignId: 0 },
        OutboundStrategy: i_OutboundStrategy,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutContact",
})) as any;

export type BatchUpdateDataTableValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates multiple data table values using all properties from BatchCreateDataTableValue. System managed values
 * are not modifiable by customers. The operation requires proper lock versions to prevent concurrent modification
 * conflicts.
 */
export const batchUpdateDataTableValue: API.OperationMethod<
  BatchUpdateDataTableValueRequest,
  BatchUpdateDataTableValueResponse,
  BatchUpdateDataTableValueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/update",
    input: { InstanceId: 0, DataTableId: 0, Values: D.list(i_DataTableValue) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateDataTableValue",
})) as any;

export type ClaimPhoneNumberError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Claims an available phone number to your Connect Customer instance or traffic distribution group. You can call
 * this API only in the same Amazon Web Services Region where the Connect Customer instance or traffic distribution group was
 * created.
 *
 * For more information about how to use this operation, see Claim a phone number in your country and Claim
 * phone numbers to traffic distribution groups in the Connect Customer Administrator
 * Guide.
 *
 * You can call the SearchAvailablePhoneNumbers API for
 * available phone numbers that you can claim. Call the DescribePhoneNumber API to verify the status
 * of a previous ClaimPhoneNumber operation.
 *
 * If you plan to claim and release numbers frequently,
 * contact us for a service quota exception. Otherwise, it is possible you will be blocked from
 * claiming and releasing any more numbers until up to 180 days past the oldest number
 * released has expired.
 *
 * By default you can claim and release up to 200% of your maximum number of active
 * phone numbers. If you claim and release phone numbers using
 * the UI or API during a rolling 180 day cycle that exceeds 200% of your phone number
 * service level quota, you will be blocked from claiming any more numbers until 180
 * days past the oldest number released has expired.
 *
 * For example, if you already have 99 claimed numbers and a service level quota of 99 phone numbers, and in any 180
 * day period you release 99, claim 99, and then release 99, you will have exceeded the
 * 200% limit. At that point you are blocked from claiming any more numbers until you
 * open an Amazon Web Services support ticket.
 */
export const claimPhoneNumber: API.OperationMethod<
  ClaimPhoneNumberRequest,
  ClaimPhoneNumberResponse,
  ClaimPhoneNumberError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number/claim",
    input: {
      TargetArn: 0,
      InstanceId: 0,
      PhoneNumber: 0,
      PhoneNumberDescription: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClaimPhoneNumber",
})) as any;

export type CompleteAttachedFileUploadError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to confirm that the attached file has been uploaded using the pre-signed URL provided in the
 * StartAttachedFileUpload API.
 */
export const completeAttachedFileUpload: API.OperationMethod<
  CompleteAttachedFileUploadRequest,
  CompleteAttachedFileUploadResponse,
  CompleteAttachedFileUploadError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attached-files/{InstanceId}/{FileId}",
    input: {
      InstanceId: 0,
      FileId: 0,
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteAttachedFileUpload",
})) as any;

export type CreateAgentStatusError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an agent status for the specified Connect Customer instance.
 */
export const createAgentStatus: API.OperationMethod<
  CreateAgentStatusRequest,
  CreateAgentStatusResponse,
  CreateAgentStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /agent-status/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      State: 0,
      DisplayOrder: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgentStatus",
})) as any;

export type CreateAttachedFileError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an attached file for a completed voice contact by copying a recording from a source S3 URI into
 * Connect Customer managed storage. Use this API to attach voice recordings to contacts for downstream
 * processing such as conversational analytics.
 *
 * The `AssociatedResourceArn` must be the ARN of a completed voice contact, `FileUseCaseType`
 * must be set to `VOICE_RECORDING`, and `FileSourceUri` must be a valid S3 URI.
 *
 * For example, you can call `CreateContact`, then `CreateAttachedFile`, then
 * `StartContactConversationalAnalyticsJob` to create a contact, attach a recording, and
 * run post-call analytics.
 */
export const createAttachedFile: API.OperationMethod<
  CreateAttachedFileRequest,
  CreateAttachedFileResponse,
  CreateAttachedFileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /attached-files/{InstanceId}/files",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      FileUseCaseType: 0,
      FileSourceUri: 0,
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAttachedFile",
})) as any;

export type CreateAuthCodeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an authorization code for the specified Connect Customer instance. The authorization code can be used
 * to establish a session with scoped permissions defined by the specified scope parameters.
 */
export const createAuthCode: API.OperationMethod<
  CreateAuthCodeRequest,
  CreateAuthCodeResponse,
  CreateAuthCodeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /auth/code/{InstanceId}",
    input: {
      InstanceId: 0,
      Scope: {
        SecurityProfileIds: 0,
        EntityType: 0,
        EntityId: 0,
        DomainName: 0,
      },
      MaxSessionDurationMinutes: 0,
      SessionInactivityDurationMinutes: 0,
    },
    output: { AuthCode: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthCode",
})) as any;

export type CreateContactError =
  | AccessDeniedException
  | ConflictException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Only the VOICE, EMAIL, and TASK channels are supported.
 *
 * - For VOICE: The supported initiation method is `TRANSFER`. The contacts created with this
 * initiation method have a subtype `connect:ExternalAudio`.
 *
 * - For EMAIL: The supported initiation methods are `OUTBOUND`, `AGENT_REPLY`, and
 * `FLOW`.
 *
 * - For TASK: The supported initiation method is `API`. Contacts created with this API have a sub-type
 * of `connect:ExternalTask`.
 *
 * Creates a new VOICE, EMAIL, or TASK contact.
 *
 * After a contact is created, you can move it to the desired state by using the `InitiateAs` parameter.
 * While you can use API to create task contacts that are in the `COMPLETED` state, you must contact Amazon Web Services Support before using it for bulk import use cases. Bulk import causes your requests to be throttled or
 * fail if your CreateContact limits aren't high enough.
 */
export const createContact: API.OperationMethod<
  CreateContactRequest,
  CreateContactResponse,
  CreateContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/create-contact",
    input: {
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
      RelatedContactId: 0,
      Attributes: 0,
      References: D.map(i_Reference),
      Channel: 0,
      InitiationMethod: 0,
      ExpiryDurationInMinutes: 0,
      UserInfo: i_UserInfo,
      InitiateAs: 0,
      Name: 0,
      Description: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      PreviousContactId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
})) as any;

export type CreateContactFlowError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidContactFlowException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a flow for the specified Connect Customer instance.
 *
 * You can also create and update flows using the Connect Customer
 * Flow language.
 */
export const createContactFlow: API.OperationMethod<
  CreateContactFlowRequest,
  CreateContactFlowResponse,
  CreateContactFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-flows/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Type: 0,
      Description: 0,
      Content: 0,
      Status: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidContactFlowException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactFlow",
})) as any;

export type CreateContactFlowModuleError =
  | AccessDeniedException
  | DuplicateResourceException
  | IdempotencyException
  | InternalServiceException
  | InvalidContactFlowModuleException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a flow module for the specified Connect Customer instance.
 */
export const createContactFlowModule: API.OperationMethod<
  CreateContactFlowModuleRequest,
  CreateContactFlowModuleResponse,
  CreateContactFlowModuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-flow-modules/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      Content: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
      Settings: 0,
      ExternalInvocationConfiguration: { Enabled: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    IdempotencyException,
    InternalServiceException,
    InvalidContactFlowModuleException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactFlowModule",
})) as any;

export type CreateContactFlowModuleAliasError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a named alias that points to a specific version of a contact flow module.
 */
export const createContactFlowModuleAlias: API.OperationMethod<
  CreateContactFlowModuleAliasRequest,
  CreateContactFlowModuleAliasResponse,
  CreateContactFlowModuleAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/alias",
    input: {
      InstanceId: 0,
      Description: 0,
      ContactFlowModuleId: 0,
      ContactFlowModuleVersion: 0,
      AliasName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactFlowModuleAlias",
})) as any;

export type CreateContactFlowModuleVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an immutable snapshot of a contact flow module, preserving its content and settings at a specific point
 * in time for version control and rollback capabilities.
 */
export const createContactFlowModuleVersion: API.OperationMethod<
  CreateContactFlowModuleVersionRequest,
  CreateContactFlowModuleVersionResponse,
  CreateContactFlowModuleVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/version",
    input: {
      InstanceId: 0,
      Description: 0,
      ContactFlowModuleId: 0,
      FlowModuleContentSha256: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactFlowModuleVersion",
})) as any;

export type CreateContactFlowVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Publishes a new version of the flow provided. Versions are immutable and monotonically increasing. If the
 * `FlowContentSha256` provided is different from the `FlowContentSha256` of the
 * `$LATEST` published flow content, then an error is returned. This API only supports creating versions for
 * flows of type `Campaign`.
 */
export const createContactFlowVersion: API.OperationMethod<
  CreateContactFlowVersionRequest,
  CreateContactFlowVersionResponse,
  CreateContactFlowVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-flows/{InstanceId}/{ContactFlowId}/version",
    input: {
      InstanceId: 0,
      Description: 0,
      ContactFlowId: 0,
      FlowContentSha256: 0,
      ContactFlowVersion: 0,
      LastModifiedTime: 0,
      LastModifiedRegion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactFlowVersion",
})) as any;

export type CreateDataTableError =
  | AccessDeniedException
  | ConflictException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new data table with the specified properties. Supports the creation of all table properties except for
 * attributes and values. A table with no attributes and values is a valid state for a table. The number of tables per
 * instance is limited to 100 per instance. Customers can request an increase by using Amazon Web Services Service Quotas.
 */
export const createDataTable: API.OperationMethod<
  CreateDataTableRequest,
  CreateDataTableResponse,
  CreateDataTableError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-tables/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      TimeZone: 0,
      ValueLockLevel: 0,
      Status: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataTable",
})) as any;

export type CreateDataTableAttributeError =
  | AccessDeniedException
  | ConflictException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds an attribute to an existing data table. Creating a new primary attribute uses the empty value for the
 * specified value type for all existing records. This should not affect uniqueness of published data tables since the
 * existing primary values will already be unique. Creating attributes does not create any values. System managed tables
 * may not allow customers to create new attributes.
 */
export const createDataTableAttribute: API.OperationMethod<
  CreateDataTableAttributeRequest,
  CreateDataTableAttributeResponse,
  CreateDataTableAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /data-tables/{InstanceId}/{DataTableId}/attributes",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      Name: 0,
      ValueType: 0,
      Description: 0,
      Primary: 0,
      Validation: i_Validation,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataTableAttribute",
})) as any;

export type CreateEmailAddressError =
  | AccessDeniedException
  | DuplicateResourceException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Create new email address in the specified Connect Customer instance. For more information about email
 * addresses, see Create email
 * addresses in the Connect Customer Administrator Guide.
 */
export const createEmailAddress: API.OperationMethod<
  CreateEmailAddressRequest,
  CreateEmailAddressResponse,
  CreateEmailAddressError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /email-addresses/{InstanceId}",
    input: {
      Description: 0,
      InstanceId: 0,
      EmailAddress: 0,
      DisplayName: 0,
      Tags: 0,
      ClientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailAddress",
})) as any;

export type CreateEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an evaluation form in the specified Connect Customer instance. The form can be used to define
 * questions related to agent performance, and create sections to organize such questions. Question and section
 * identifiers cannot be duplicated within the same evaluation form.
 */
export const createEvaluationForm: API.OperationMethod<
  CreateEvaluationFormRequest,
  CreateEvaluationFormResponse,
  CreateEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /evaluation-forms/{InstanceId}",
    input: {
      InstanceId: 0,
      Title: 0,
      Description: 0,
      Items: D.list(i_EvaluationFormItem),
      ScoringStrategy: i_EvaluationFormScoringStrategy,
      AutoEvaluationConfiguration: i_EvaluationFormAutoEvaluationConfiguration,
      ClientToken: D.m({ idempotency: true }),
      AsDraft: 0,
      Tags: 0,
      ReviewConfiguration: i_EvaluationReviewConfiguration,
      TargetConfiguration: i_EvaluationFormTargetConfiguration,
      LanguageConfiguration: i_EvaluationFormLanguageConfiguration,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvaluationForm",
})) as any;

export type CreateExtractionDefinitionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an extraction definition in the specified Connect Customer instance. An extraction
 * definition specifies how structured data is extracted from customer interactions using generative
 * AI, including the prompt hint that guides extraction and the behavior when a value cannot be
 * found.
 */
export const createExtractionDefinition: API.OperationMethod<
  CreateExtractionDefinitionRequest,
  CreateExtractionDefinitionResponse,
  CreateExtractionDefinitionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /extraction-definitions/{InstanceId}",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      Name: 0,
      ExtractionConfiguration: i_ExtractionConfiguration,
      Display: i_ExtractionDefinitionDisplay,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtractionDefinition",
})) as any;

export type CreateHoursOfOperationError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates hours of operation.
 */
export const createHoursOfOperation: API.OperationMethod<
  CreateHoursOfOperationRequest,
  CreateHoursOfOperationResponse,
  CreateHoursOfOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /hours-of-operations/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      TimeZone: 0,
      Config: D.list(i_HoursOfOperationConfig),
      ParentHoursOfOperationConfigs: D.list(i_ParentHoursOfOperationConfig),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHoursOfOperation",
})) as any;

export type CreateHoursOfOperationOverrideError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an hours of operation override in an Connect Customer hours of operation resource.
 */
export const createHoursOfOperationOverride: API.OperationMethod<
  CreateHoursOfOperationOverrideRequest,
  CreateHoursOfOperationOverrideResponse,
  CreateHoursOfOperationOverrideError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /hours-of-operations/{InstanceId}/{HoursOfOperationId}/overrides",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      Name: 0,
      Description: 0,
      Config: D.list(i_HoursOfOperationOverrideConfig),
      EffectiveFrom: 0,
      EffectiveTill: 0,
      RecurrenceConfig: i_RecurrenceConfig,
      OverrideType: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHoursOfOperationOverride",
})) as any;

export type CreateInstanceError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Initiates an Connect Customer instance with all the supported channels enabled. It does not attach any
 * storage, such as Amazon Simple Storage Service (Amazon S3) or Amazon Kinesis. It also does not allow for any
 * configurations on features, such as Contact Lens for Connect Customer.
 *
 * For more information, see Create an Connect Customer instance in the
 * *Connect Customer Administrator Guide*.
 *
 * Connect Customer enforces a limit on the total number of instances that you can create or delete in 30 days.
 * If you exceed this limit, you will get an error message indicating there has been an excessive number of attempts at creating or deleting instances.
 * You must wait 30 days before you can restart creating and deleting instances in your account.
 */
export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance",
    input: {
      ClientToken: D.m({ idempotency: true }),
      IdentityManagementType: 0,
      InstanceAlias: 0,
      DirectoryId: 0,
      InboundCallsEnabled: 0,
      OutboundCallsEnabled: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstance",
})) as any;

export type CreateIntegrationAssociationError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Amazon Web Services resource association with an Connect Customer instance.
 */
export const createIntegrationAssociation: API.OperationMethod<
  CreateIntegrationAssociationRequest,
  CreateIntegrationAssociationResponse,
  CreateIntegrationAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/integration-associations",
    input: {
      InstanceId: 0,
      IntegrationType: 0,
      IntegrationArn: 0,
      SourceApplicationUrl: 0,
      SourceApplicationName: 0,
      SourceType: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationAssociation",
})) as any;

export type CreateMetricError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new metric definition for the specified Connect Customer instance. You can create custom metrics
 * that use formulas referencing existing Amazon Web Services-managed metrics, optionally with filters applied.
 */
export const createMetric: API.OperationMethod<
  CreateMetricRequest,
  CreateMetricResponse,
  CreateMetricError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /metrics/definitions/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      MetricCalculation: i_MetricCalculation,
      Unit: 0,
      Status: 0,
      ClientToken: D.m({ idempotency: true }),
      Description: 0,
      PositiveTrendIndicator: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMetric",
})) as any;

export type CreateNotificationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new notification to be delivered to specified recipients. Notifications can include localized content with links, and an optional expiration time. Recipients can be specified as individual user ARNs or instance ARNs to target all users in an instance.
 */
export const createNotification: API.OperationMethod<
  CreateNotificationRequest,
  CreateNotificationResponse,
  CreateNotificationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /notifications/{InstanceId}",
    input: {
      InstanceId: 0,
      ExpiresAt: 0,
      Recipients: 0,
      Priority: 0,
      Content: 0,
      Tags: 0,
      PredefinedNotificationId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotification",
})) as any;

export type CreateParticipantError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a new participant into an on-going chat contact or webRTC call. For more information, see Customize chat flow experiences by
 * integrating custom participants or Enable multi-user web, in-app, and video
 * calling.
 */
export const createParticipant: API.OperationMethod<
  CreateParticipantRequest,
  CreateParticipantResponse,
  CreateParticipantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/create-participant",
    input: {
      InstanceId: 0,
      ContactId: 0,
      ClientToken: D.m({ idempotency: true }),
      ParticipantDetails: {
        ParticipantRole: 0,
        DisplayName: 0,
        ParticipantCapabilities: i_ParticipantCapabilities,
      },
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParticipant",
})) as any;

export type CreatePersistentContactAssociationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Enables rehydration of chats for the lifespan of a contact. For more information about chat rehydration, see
 * Enable persistent chat in
 * the *Connect Customer Administrator Guide*.
 */
export const createPersistentContactAssociation: API.OperationMethod<
  CreatePersistentContactAssociationRequest,
  CreatePersistentContactAssociationResponse,
  CreatePersistentContactAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/persistent-contact-association/{InstanceId}/{InitialContactId}",
    input: {
      InstanceId: 0,
      InitialContactId: 0,
      RehydrationType: 0,
      SourceContactId: 0,
      ClientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePersistentContactAssociation",
})) as any;

export type CreatePredefinedAttributeError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new predefined attribute for the specified Connect Customer instance. A *predefined attribute*
 * is made up of a name and a value.
 *
 * For the predefined attributes per instance quota, see Connect Customer
 * quotas.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Create an attribute for routing proficiency (for example, agent certification) that has predefined values (for
 * example, a list of possible certifications). For more information, see Create predefined attributes for routing contacts to
 * agents.
 *
 * - Create an attribute for business unit name that has a list of predefined business unit names used in your
 * organization. This is a use case where information for a contact varies between transfers or conferences. For more
 * information, see Use contact segment attributes.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const createPredefinedAttribute: API.OperationMethod<
  CreatePredefinedAttributeRequest,
  CreatePredefinedAttributeResponse,
  CreatePredefinedAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /predefined-attributes/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Values: i_PredefinedAttributeValues,
      Purposes: 0,
      AttributeConfiguration: i_InputPredefinedAttributeConfiguration,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePredefinedAttribute",
})) as any;

export type CreatePromptError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a prompt. For more information about prompts, such as supported file types and maximum length, see
 * Create prompts in the
 * *Connect Customer Administrator Guide*.
 */
export const createPrompt: API.OperationMethod<
  CreatePromptRequest,
  CreatePromptResponse,
  CreatePromptError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /prompts/{InstanceId}",
    input: { InstanceId: 0, Name: 0, Description: 0, S3Uri: 0, Tags: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrompt",
})) as any;

export type CreatePushNotificationRegistrationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates registration for a device token and a chat contact to receive real-time push notifications. For more
 * information about push notifications, see Set up push notifications in Connect Customer for mobile chat in the *Connect Customer Administrator Guide*.
 */
export const createPushNotificationRegistration: API.OperationMethod<
  CreatePushNotificationRegistrationRequest,
  CreatePushNotificationRegistrationResponse,
  CreatePushNotificationRegistrationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /push-notification/{InstanceId}/registrations",
    input: {
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
      PinpointAppArn: 0,
      DeviceToken: 0,
      DeviceType: 0,
      ContactConfiguration: {
        ContactId: 0,
        ParticipantRole: 0,
        IncludeRawMessage: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePushNotificationRegistration",
})) as any;

export type CreateQueueError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new queue for the specified Connect Customer instance.
 *
 * - If the phone number is claimed to a traffic distribution group that was created in the
 * same Region as the Connect Customer instance where you are calling this API, then you can use a
 * full phone number ARN or a UUID for `OutboundCallerIdNumberId`. However, if the phone number is claimed
 * to a traffic distribution group that is in one Region, and you are calling this API from an instance in another Amazon Web Services Region that is associated with the traffic distribution group, you must provide a full phone number ARN. If a
 * UUID is provided in this scenario, you will receive a
 * `ResourceNotFoundException`.
 *
 * - Only use the phone number ARN format that doesn't contain `instance` in the path, for example,
 * `arn:aws:connect:us-east-1:1234567890:phone-number/uuid`. This is the same ARN format that is returned
 * when you call the ListPhoneNumbersV2 API.
 *
 * - If you plan to use IAM policies to allow/deny access to this API for phone number resources
 * claimed to a traffic distribution group, see Allow or Deny queue API actions for phone numbers in a replica Region.
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /queues/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      OutboundCallerConfig: i_OutboundCallerConfig,
      OutboundEmailConfig: i_OutboundEmailConfig,
      HoursOfOperationId: 0,
      MaxContacts: 0,
      QuickConnectIds: 0,
      EmailAddressesConfig: D.list(i_EmailAddressConfig),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
})) as any;

export type CreateQuickConnectError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a quick connect for the specified Connect Customer instance.
 */
export const createQuickConnect: API.OperationMethod<
  CreateQuickConnectRequest,
  CreateQuickConnectResponse,
  CreateQuickConnectError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /quick-connects/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      QuickConnectConfig: i_QuickConnectConfig,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuickConnect",
})) as any;

export type CreateRoutingProfileError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new routing profile.
 */
export const createRoutingProfile: API.OperationMethod<
  CreateRoutingProfileRequest,
  CreateRoutingProfileResponse,
  CreateRoutingProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /routing-profiles/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      DefaultOutboundQueueId: 0,
      QueueConfigs: D.list(i_RoutingProfileQueueConfig),
      ManualAssignmentQueueConfigs: D.list(
        i_RoutingProfileManualAssignmentQueueConfig,
      ),
      MediaConcurrencies: D.list(i_MediaConcurrency),
      Tags: 0,
      AgentAvailabilityTimer: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoutingProfile",
})) as any;

export type CreateRuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a rule for the specified Connect Customer instance.
 *
 * Use the Rules Function
 * language to code conditions for the rule.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rules/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      TriggerEventSource: { EventSourceName: 0, IntegrationAssociationId: 0 },
      Function: 0,
      Actions: D.list(i_RuleAction),
      PublishStatus: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
})) as any;

export type CreateSecurityProfileError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a security profile.
 *
 * For information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const createSecurityProfile: API.OperationMethod<
  CreateSecurityProfileRequest,
  CreateSecurityProfileResponse,
  CreateSecurityProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /security-profiles/{InstanceId}",
    input: {
      SecurityProfileName: 0,
      Description: 0,
      Permissions: 0,
      InstanceId: 0,
      Tags: 0,
      AllowedAccessControlTags: 0,
      TagRestrictedResources: 0,
      Applications: D.list(i_Application),
      HierarchyRestrictedResources: 0,
      AllowedAccessControlHierarchyGroupId: 0,
      AllowedFlowModules: D.list(i_FlowModule),
      GranularAccessControlConfiguration: i_GranularAccessControlConfiguration,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityProfile",
})) as any;

export type CreateTaskTemplateError =
  | InternalServiceException
  | InvalidParameterException
  | PropertyValidationException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new task template in the specified Connect Customer instance.
 */
export const createTaskTemplate: API.OperationMethod<
  CreateTaskTemplateRequest,
  CreateTaskTemplateResponse,
  CreateTaskTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/task/template",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      ContactFlowId: 0,
      SelfAssignFlowId: 0,
      Constraints: i_TaskTemplateConstraints,
      Defaults: i_TaskTemplateDefaults,
      Status: 0,
      Fields: D.list(i_TaskTemplateField),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PropertyValidationException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTaskTemplate",
})) as any;

export type CreateTestCaseError =
  | AccessDeniedException
  | DuplicateResourceException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidTestCaseException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a test case with its content and metadata for the specified Amazon Connect instance.
 */
export const createTestCase: API.OperationMethod<
  CreateTestCaseRequest,
  CreateTestCaseResponse,
  CreateTestCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /test-cases/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      Content: 0,
      EntryPoint: i_TestCaseEntryPoint,
      InitializationData: 0,
      Status: 0,
      TestCaseId: D.m({ header: "x-amz-resource-id" }),
      Tags: 0,
      LastModifiedTime: D.m({ header: "x-amz-last-modified-time" }),
      LastModifiedRegion: D.m({ header: "x-amz-last-modified-region" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTestCaseException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestCase",
})) as any;

export type CreateTrafficDistributionGroupError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a traffic distribution group given an Connect Customer instance that has been replicated.
 *
 * The `SignInConfig` distribution is available only on a
 * default `TrafficDistributionGroup` (see the `IsDefault` parameter in the
 * TrafficDistributionGroup
 * data type). If you call
 * `UpdateTrafficDistribution` with a modified `SignInConfig` and a non-default `TrafficDistributionGroup`,
 * an `InvalidRequestException` is returned.
 *
 * For more information about creating traffic distribution groups, see Set up traffic distribution groups in the
 * *Connect Customer Administrator Guide*.
 */
export const createTrafficDistributionGroup: API.OperationMethod<
  CreateTrafficDistributionGroupRequest,
  CreateTrafficDistributionGroupResponse,
  CreateTrafficDistributionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /traffic-distribution-group",
    input: {
      Name: 0,
      Description: 0,
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficDistributionGroup",
})) as any;

export type CreateUseCaseError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a use case for an integration association.
 */
export const createUseCase: API.OperationMethod<
  CreateUseCaseRequest,
  CreateUseCaseResponse,
  CreateUseCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/integration-associations/{IntegrationAssociationId}/use-cases",
    input: {
      InstanceId: 0,
      IntegrationAssociationId: 0,
      UseCaseType: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUseCase",
})) as any;

export type CreateUserError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a user account for the specified Connect Customer instance.
 *
 * Certain UserIdentityInfo parameters are required in some situations. For example, `Email`,
 * `FirstName` and `LastName` are required if you are using Connect Customer or SAML for
 * identity management.
 *
 * Fields in `PhoneConfig` cannot be set simultaneously with their corresponding channel-specific configuration parameters. Specifically:
 *
 * - `PhoneConfig.AutoAccept` conflicts with `AutoAcceptConfigs`
 *
 * - `PhoneConfig.AfterContactWorkTimeLimit` conflicts with `AfterContactWorkConfigs`
 *
 * - `PhoneConfig.PhoneType` and `PhoneConfig.PhoneNumber` conflict with `PhoneNumberConfigs`
 *
 * - `PhoneConfig.PersistentConnection` conflicts with `PersistentConnectionConfigs`
 *
 * We recommend using channel-specific parameters such as `AutoAcceptConfigs`, `AfterContactWorkConfigs`, `PhoneNumberConfigs`, `PersistentConnectionConfigs`, and `VoiceEnhancementConfigs` for per-channel configuration.
 *
 * For information about how to create users using the Connect Customer admin website, see Add Users in the Connect Customer
 * Administrator Guide.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /users/{InstanceId}",
    input: {
      Username: 0,
      Password: 0,
      IdentityInfo: i_UserIdentityInfo,
      PhoneConfig: i_UserPhoneConfig,
      DirectoryUserId: 0,
      SecurityProfileIds: 0,
      RoutingProfileId: 0,
      HierarchyGroupId: 0,
      InstanceId: 0,
      AutoAcceptConfigs: D.list(i_AutoAcceptConfig),
      AfterContactWorkConfigs: D.list(i_AfterContactWorkConfigPerChannel),
      PhoneNumberConfigs: D.list(i_PhoneNumberConfig),
      PersistentConnectionConfigs: D.list(i_PersistentConnectionConfig),
      VoiceEnhancementConfigs: D.list(i_VoiceEnhancementConfig),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type CreateUserHierarchyGroupError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new user hierarchy group.
 */
export const createUserHierarchyGroup: API.OperationMethod<
  CreateUserHierarchyGroupRequest,
  CreateUserHierarchyGroupResponse,
  CreateUserHierarchyGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /user-hierarchy-groups/{InstanceId}",
    input: { Name: 0, ParentGroupId: 0, InstanceId: 0, Tags: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserHierarchyGroup",
})) as any;

export type CreateViewError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new view with the possible status of `SAVED` or `PUBLISHED`.
 *
 * The views will have a unique name for each connect instance.
 *
 * It performs basic content validation if the status is `SAVED` or full content validation if the
 * status is set to `PUBLISHED`. An error is returned if validation fails. It associates either the
 * `$SAVED` qualifier or both of the `$SAVED` and `$LATEST` qualifiers with the
 * provided view content based on the status. The view is idempotent if ClientToken is provided.
 */
export const createView: API.OperationMethod<
  CreateViewRequest,
  CreateViewResponse,
  CreateViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /views/{InstanceId}",
    input: {
      InstanceId: 0,
      ClientToken: 0,
      Status: 0,
      Content: i_ViewInputContent,
      Description: 0,
      Name: 0,
      Tags: 0,
    },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateView",
})) as any;

export type CreateViewVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Publishes a new version of the view identifier.
 *
 * Versions are immutable and monotonically increasing.
 *
 * It returns the highest version if there is no change in content compared to that version. An error is displayed
 * if the supplied ViewContentSha256 is different from the ViewContentSha256 of the `$LATEST` alias.
 */
export const createViewVersion: API.OperationMethod<
  CreateViewVersionRequest,
  CreateViewVersionResponse,
  CreateViewVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /views/{InstanceId}/{ViewId}/versions",
    input: {
      InstanceId: 0,
      ViewId: 0,
      VersionDescription: 0,
      ViewContentSha256: 0,
    },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateViewVersion",
})) as any;

export type CreateVocabularyError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a custom vocabulary associated with your Connect Customer instance. You can set a custom vocabulary to
 * be your default vocabulary for a given language. Contact Lens for Connect Customer uses the default vocabulary in post-call and real-time
 * contact analysis sessions for that language.
 */
export const createVocabulary: API.OperationMethod<
  CreateVocabularyRequest,
  CreateVocabularyResponse,
  CreateVocabularyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /vocabulary/{InstanceId}",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      VocabularyName: 0,
      LanguageCode: 0,
      Content: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabulary",
})) as any;

export type CreateWorkspaceError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a workspace that defines the user experience by mapping views to pages. Workspaces can be assigned to
 * users or routing profiles.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{InstanceId}",
    input: {
      InstanceId: 0,
      Name: 0,
      Description: 0,
      Theme: i_WorkspaceTheme,
      Title: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspace",
})) as any;

export type CreateWorkspacePageError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a view with a page in a workspace, defining what users see when they navigate to that page.
 */
export const createWorkspacePage: API.OperationMethod<
  CreateWorkspacePageRequest,
  CreateWorkspacePageResponse,
  CreateWorkspacePageError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{InstanceId}/{WorkspaceId}/pages",
    input: {
      InstanceId: 0,
      WorkspaceId: 0,
      ResourceArn: 0,
      Page: 0,
      Slug: 0,
      InputData: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspacePage",
})) as any;

export type DeactivateEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deactivates an evaluation form in the specified Connect Customer instance. After a form is deactivated, it is no longer
 * available for users to start new evaluations based on the form.
 */
export const deactivateEvaluationForm: API.OperationMethod<
  DeactivateEvaluationFormRequest,
  DeactivateEvaluationFormResponse,
  DeactivateEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluation-forms/{InstanceId}/{EvaluationFormId}/deactivate",
    input: { InstanceId: 0, EvaluationFormId: 0, EvaluationFormVersion: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateEvaluationForm",
})) as any;

export type DeleteAttachedFileError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an attached file along with the underlying S3 Object.
 *
 * The attached file is **permanently deleted** if S3 bucket versioning is not
 * enabled.
 */
export const deleteAttachedFile: API.OperationMethod<
  DeleteAttachedFileRequest,
  DeleteAttachedFileResponse,
  DeleteAttachedFileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /attached-files/{InstanceId}/{FileId}",
    input: {
      InstanceId: 0,
      FileId: 0,
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachedFile",
})) as any;

export type DeleteContactDataError =
  | ContactNotTerminatedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified fields containing personally identifiable information (PII) from a
 * contact in the specified Connect Customer instance. We redact PII (such as
 * customer endpoints, additional email recipients, and the email subject) from the contact and its
 * associated contact trace record (CTR). The contact must be in a terminated state.
 *
 * **This deletion is permanent and cannot be undone.** Performing this
 * operation permanently deletes the specified PII. There is
 * no retention period; you cannot recover the data after deletion. We remove only the fields
 * that Connect Customer identifies and stores as PII. Any PII that you place in fields
 * outside the scope of this operation remains your responsibility to remove.
 */
export const deleteContactData: API.OperationMethod<
  DeleteContactDataRequest,
  DeleteContactDataResponse,
  DeleteContactDataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/delete/{InstanceId}/{ContactId}",
    input: { InstanceId: 0, ContactId: 0, ContactFields: 0 },
    body: true,
  },
  errors: [
    ContactNotTerminatedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactData",
})) as any;

export type DeleteContactEvaluationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a contact evaluation in the specified Connect Customer instance.
 */
export const deleteContactEvaluation: API.OperationMethod<
  DeleteContactEvaluationRequest,
  DeleteContactEvaluationResponse,
  DeleteContactEvaluationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-evaluations/{InstanceId}/{EvaluationId}",
    input: { InstanceId: 0, EvaluationId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactEvaluation",
})) as any;

export type DeleteContactFlowError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a flow for the specified Connect Customer instance.
 */
export const deleteContactFlow: API.OperationMethod<
  DeleteContactFlowRequest,
  DeleteContactFlowResponse,
  DeleteContactFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-flows/{InstanceId}/{ContactFlowId}",
    input: { InstanceId: 0, ContactFlowId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactFlow",
})) as any;

export type DeleteContactFlowModuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified flow module.
 */
export const deleteContactFlowModule: API.OperationMethod<
  DeleteContactFlowModuleRequest,
  DeleteContactFlowModuleResponse,
  DeleteContactFlowModuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}",
    input: { InstanceId: 0, ContactFlowModuleId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactFlowModule",
})) as any;

export type DeleteContactFlowModuleAliasError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes an alias reference, breaking the named connection to the underlying module version without affecting the
 * version itself.
 */
export const deleteContactFlowModuleAlias: API.OperationMethod<
  DeleteContactFlowModuleAliasRequest,
  DeleteContactFlowModuleAliasResponse,
  DeleteContactFlowModuleAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/alias/{AliasId}",
    input: { InstanceId: 0, ContactFlowModuleId: 0, AliasId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactFlowModuleAlias",
})) as any;

export type DeleteContactFlowModuleVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a specific version of a contact flow module.
 */
export const deleteContactFlowModuleVersion: API.OperationMethod<
  DeleteContactFlowModuleVersionRequest,
  DeleteContactFlowModuleVersionResponse,
  DeleteContactFlowModuleVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/version/{ContactFlowModuleVersion}",
    input: {
      InstanceId: 0,
      ContactFlowModuleId: 0,
      ContactFlowModuleVersion: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactFlowModuleVersion",
})) as any;

export type DeleteContactFlowVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the particular version specified in flow version identifier.
 */
export const deleteContactFlowVersion: API.OperationMethod<
  DeleteContactFlowVersionRequest,
  DeleteContactFlowVersionResponse,
  DeleteContactFlowVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact-flows/{InstanceId}/{ContactFlowId}/version/{ContactFlowVersion}",
    input: { InstanceId: 0, ContactFlowId: 0, ContactFlowVersion: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactFlowVersion",
})) as any;

export type DeleteDataTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a data table and all associated attributes, versions, audits, and values. Does not update any references
 * to the data table, even from other data tables. This includes dynamic values and conditional validations. System
 * managed data tables are not deletable by customers. API users may delete the table at any time. When deletion is
 * requested from the admin website, a warning is shown alerting the user of the most recent time the table and its
 * values were accessed.
 */
export const deleteDataTable: API.OperationMethod<
  DeleteDataTableRequest,
  DeleteDataTableResponse,
  DeleteDataTableError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /data-tables/{InstanceId}/{DataTableId}",
    input: { InstanceId: 0, DataTableId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataTable",
})) as any;

export type DeleteDataTableAttributeError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an attribute and all its values from a data table.
 */
export const deleteDataTableAttribute: API.OperationMethod<
  DeleteDataTableAttributeRequest,
  DeleteDataTableAttributeResponse,
  DeleteDataTableAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /data-tables/{InstanceId}/{DataTableId}/attributes/{AttributeName}",
    input: { InstanceId: 0, DataTableId: 0, AttributeName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataTableAttribute",
})) as any;

export type DeleteEmailAddressError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes email address from the specified Connect Customer instance.
 */
export const deleteEmailAddress: API.OperationMethod<
  DeleteEmailAddressRequest,
  DeleteEmailAddressResponse,
  DeleteEmailAddressError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /email-addresses/{InstanceId}/{EmailAddressId}",
    input: { InstanceId: 0, EmailAddressId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailAddress",
})) as any;

export type DeleteEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an evaluation form in the specified Connect Customer instance.
 *
 * - If the version property is provided, only the specified version of the evaluation form is deleted.
 *
 * - If no version is provided, then the full form (all versions) is deleted.
 */
export const deleteEvaluationForm: API.OperationMethod<
  DeleteEvaluationFormRequest,
  DeleteEvaluationFormResponse,
  DeleteEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /evaluation-forms/{InstanceId}/{EvaluationFormId}",
    input: {
      InstanceId: 0,
      EvaluationFormId: 0,
      EvaluationFormVersion: D.m({ query: "version" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvaluationForm",
})) as any;

export type DeleteExtractionDefinitionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an extraction definition from the specified Connect Customer instance.
 */
export const deleteExtractionDefinition: API.OperationMethod<
  DeleteExtractionDefinitionRequest,
  DeleteExtractionDefinitionResponse,
  DeleteExtractionDefinitionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /extraction-definitions/{InstanceId}/{ExtractionDefinitionId}",
    input: { InstanceId: 0, ExtractionDefinitionId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtractionDefinition",
})) as any;

export type DeleteHoursOfOperationError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an hours of operation.
 */
export const deleteHoursOfOperation: API.OperationMethod<
  DeleteHoursOfOperationRequest,
  DeleteHoursOfOperationResponse,
  DeleteHoursOfOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /hours-of-operations/{InstanceId}/{HoursOfOperationId}",
    input: { InstanceId: 0, HoursOfOperationId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHoursOfOperation",
})) as any;

export type DeleteHoursOfOperationOverrideError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an hours of operation override in an Connect Customer hours of operation resource.
 */
export const deleteHoursOfOperationOverride: API.OperationMethod<
  DeleteHoursOfOperationOverrideRequest,
  DeleteHoursOfOperationOverrideResponse,
  DeleteHoursOfOperationOverrideError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /hours-of-operations/{InstanceId}/{HoursOfOperationId}/overrides/{HoursOfOperationOverrideId}",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      HoursOfOperationOverrideId: 0,
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHoursOfOperationOverride",
})) as any;

export type DeleteInstanceError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Deletes the Connect Customer instance. For more information, see Delete your Connect Customer instance in the
 * *Connect Customer Administrator Guide*.
 *
 * Connect Customer enforces a limit on the total number of instances that you can create or delete in 30 days.
 * If you exceed this limit, you will get an error message indicating there has been an excessive number of attempts at creating or deleting instances.
 * You must wait 30 days before you can restart creating and deleting instances in your account.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  DeleteInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}",
    input: {
      InstanceId: 0,
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstance",
})) as any;

export type DeleteIntegrationAssociationError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services resource association from an Connect Customer instance. The association must not
 * have any use cases associated with it.
 */
export const deleteIntegrationAssociation: API.OperationMethod<
  DeleteIntegrationAssociationRequest,
  DeleteIntegrationAssociationResponse,
  DeleteIntegrationAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/integration-associations/{IntegrationAssociationId}",
    input: { InstanceId: 0, IntegrationAssociationId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationAssociation",
})) as any;

export type DeleteMetricError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing metric from the specified Connect Customer instance. This operation fails with `ResourceConflictException` if the metric is currently in use in a dashboard.
 */
export const deleteMetric: API.OperationMethod<
  DeleteMetricRequest,
  DeleteMetricResponse,
  DeleteMetricError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /metrics/definitions/{InstanceId}/{MetricId}",
    input: { InstanceId: 0, MetricId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetric",
})) as any;

export type DeleteNotificationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a notification. Once deleted, the notification is no longer visible to all users and cannot be managed through the Admin Website or APIs.
 */
export const deleteNotification: API.OperationMethod<
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  DeleteNotificationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /notifications/{InstanceId}/{NotificationId}",
    input: { InstanceId: 0, NotificationId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotification",
})) as any;

export type DeletePredefinedAttributeError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a predefined attribute from the specified Connect Customer instance.
 */
export const deletePredefinedAttribute: API.OperationMethod<
  DeletePredefinedAttributeRequest,
  DeletePredefinedAttributeResponse,
  DeletePredefinedAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /predefined-attributes/{InstanceId}/{Name}",
    input: { InstanceId: 0, Name: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePredefinedAttribute",
})) as any;

export type DeletePromptError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a prompt.
 */
export const deletePrompt: API.OperationMethod<
  DeletePromptRequest,
  DeletePromptResponse,
  DeletePromptError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /prompts/{InstanceId}/{PromptId}",
    input: { InstanceId: 0, PromptId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrompt",
})) as any;

export type DeletePushNotificationRegistrationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes registration for a device token and a chat contact.
 */
export const deletePushNotificationRegistration: API.OperationMethod<
  DeletePushNotificationRegistrationRequest,
  DeletePushNotificationRegistrationResponse,
  DeletePushNotificationRegistrationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /push-notification/{InstanceId}/registrations/{RegistrationId}",
    input: {
      InstanceId: 0,
      RegistrationId: 0,
      ContactId: D.m({ query: "contactId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePushNotificationRegistration",
})) as any;

export type DeleteQueueError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a queue.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /queues/{InstanceId}/{QueueId}",
    input: { InstanceId: 0, QueueId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
})) as any;

export type DeleteQuickConnectError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a quick connect.
 *
 * After calling DeleteUser, it's important to call `DeleteQuickConnect` to delete any records related to the
 * deleted users. This will help you:
 *
 * - Avoid dangling resources that impact your service quotas.
 *
 * - Remove deleted users so they don't appear to agents as transfer options.
 *
 * - Avoid the disruption of other Connect Customer processes, such as instance replication and syncing if
 * you're using Connect Customer Global Resiliency.
 */
export const deleteQuickConnect: API.OperationMethod<
  DeleteQuickConnectRequest,
  DeleteQuickConnectResponse,
  DeleteQuickConnectError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /quick-connects/{InstanceId}/{QuickConnectId}",
    input: { InstanceId: 0, QuickConnectId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickConnect",
})) as any;

export type DeleteRoutingProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a routing profile.
 */
export const deleteRoutingProfile: API.OperationMethod<
  DeleteRoutingProfileRequest,
  DeleteRoutingProfileResponse,
  DeleteRoutingProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /routing-profiles/{InstanceId}/{RoutingProfileId}",
    input: { InstanceId: 0, RoutingProfileId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoutingProfile",
})) as any;

export type DeleteRuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a rule for the specified Connect Customer instance.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /rules/{InstanceId}/{RuleId}",
    input: { InstanceId: 0, RuleId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
})) as any;

export type DeleteSecurityProfileError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a security profile.
 */
export const deleteSecurityProfile: API.OperationMethod<
  DeleteSecurityProfileRequest,
  DeleteSecurityProfileResponse,
  DeleteSecurityProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /security-profiles/{InstanceId}/{SecurityProfileId}",
    input: { InstanceId: 0, SecurityProfileId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityProfile",
})) as any;

export type DeleteSessionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a session for the specified Connect Customer instance.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /auth/sessions/{InstanceId}/{SessionId}",
    input: { InstanceId: 0, SessionId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSession",
})) as any;

export type DeleteTaskTemplateError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the task template.
 */
export const deleteTaskTemplate: API.OperationMethod<
  DeleteTaskTemplateRequest,
  DeleteTaskTemplateResponse,
  DeleteTaskTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/task/template/{TaskTemplateId}",
    input: { InstanceId: 0, TaskTemplateId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskTemplate",
})) as any;

export type DeleteTestCaseError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the test case that has already been created for the specified Amazon Connect instance.
 */
export const deleteTestCase: API.OperationMethod<
  DeleteTestCaseRequest,
  DeleteTestCaseResponse,
  DeleteTestCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /test-cases/{InstanceId}/{TestCaseId}",
    input: { InstanceId: 0, TestCaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestCase",
})) as any;

export type DeleteTrafficDistributionGroupError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a traffic distribution group. This API can be called only in the Region where the traffic distribution group is created.
 *
 * For more information about deleting traffic distribution groups, see Delete traffic distribution groups in the
 * *Connect Customer Administrator Guide*.
 */
export const deleteTrafficDistributionGroup: API.OperationMethod<
  DeleteTrafficDistributionGroupRequest,
  DeleteTrafficDistributionGroupResponse,
  DeleteTrafficDistributionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /traffic-distribution-group/{TrafficDistributionGroupId}",
    input: { TrafficDistributionGroupId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficDistributionGroup",
})) as any;

export type DeleteUseCaseError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a use case from an integration association.
 */
export const deleteUseCase: API.OperationMethod<
  DeleteUseCaseRequest,
  DeleteUseCaseResponse,
  DeleteUseCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/integration-associations/{IntegrationAssociationId}/use-cases/{UseCaseId}",
    input: { InstanceId: 0, IntegrationAssociationId: 0, UseCaseId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUseCase",
})) as any;

export type DeleteUserError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a user account from the specified Connect Customer instance.
 *
 * For information about what happens to a user's data when their account is deleted, see Delete Users from Your Connect Customer
 * Instance in the *Connect Customer Administrator Guide*.
 *
 * After calling DeleteUser, call DeleteQuickConnect to delete any records
 * related to the deleted users. This will help you:
 *
 * - Avoid dangling resources that impact your service quotas.
 *
 * - Remove deleted users so they don't appear to agents as transfer options.
 *
 * - Avoid the disruption of other Connect Customer processes, such as instance replication and syncing if
 * you're using Connect Customer Global Resiliency.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /users/{InstanceId}/{UserId}",
    input: { InstanceId: 0, UserId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DeleteUserHierarchyGroupError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing user hierarchy group. It must not be associated with any agents or have any active child
 * groups.
 */
export const deleteUserHierarchyGroup: API.OperationMethod<
  DeleteUserHierarchyGroupRequest,
  DeleteUserHierarchyGroupResponse,
  DeleteUserHierarchyGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /user-hierarchy-groups/{InstanceId}/{HierarchyGroupId}",
    input: { HierarchyGroupId: 0, InstanceId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserHierarchyGroup",
})) as any;

export type DeleteViewError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the view entirely. It deletes the view and all associated qualifiers (versions and aliases).
 */
export const deleteView: API.OperationMethod<
  DeleteViewRequest,
  DeleteViewResponse,
  DeleteViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /views/{InstanceId}/{ViewId}",
    input: { InstanceId: 0, ViewId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteView",
})) as any;

export type DeleteViewVersionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the particular version specified in `ViewVersion` identifier.
 */
export const deleteViewVersion: API.OperationMethod<
  DeleteViewVersionRequest,
  DeleteViewVersionResponse,
  DeleteViewVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /views/{InstanceId}/{ViewId}/versions/{ViewVersion}",
    input: { InstanceId: 0, ViewId: 0, ViewVersion: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteViewVersion",
})) as any;

export type DeleteVocabularyError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the vocabulary that has the given identifier.
 */
export const deleteVocabulary: API.OperationMethod<
  DeleteVocabularyRequest,
  DeleteVocabularyResponse,
  DeleteVocabularyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /vocabulary-remove/{InstanceId}/{VocabularyId}",
    input: { InstanceId: 0, VocabularyId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabulary",
})) as any;

export type DeleteWorkspaceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a workspace and removes all associated view and resource assignments.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{InstanceId}/{WorkspaceId}",
    input: { InstanceId: 0, WorkspaceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspace",
})) as any;

export type DeleteWorkspaceMediaError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a media asset (such as a logo) from a workspace.
 */
export const deleteWorkspaceMedia: API.OperationMethod<
  DeleteWorkspaceMediaRequest,
  DeleteWorkspaceMediaResponse,
  DeleteWorkspaceMediaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{InstanceId}/{WorkspaceId}/media",
    input: {
      InstanceId: 0,
      WorkspaceId: 0,
      MediaType: D.m({ query: "mediaType" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceMedia",
})) as any;

export type DeleteWorkspacePageError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a view and a page in a workspace. The page will display the default view after
 * deletion.
 */
export const deleteWorkspacePage: API.OperationMethod<
  DeleteWorkspacePageRequest,
  DeleteWorkspacePageResponse,
  DeleteWorkspacePageError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{InstanceId}/{WorkspaceId}/pages/{Page}",
    input: { InstanceId: 0, WorkspaceId: 0, Page: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspacePage",
})) as any;

export type DescribeAgentStatusError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an agent status.
 */
export const describeAgentStatus: API.OperationMethod<
  DescribeAgentStatusRequest,
  DescribeAgentStatusResponse,
  DescribeAgentStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /agent-status/{InstanceId}/{AgentStatusId}",
    input: { InstanceId: 0, AgentStatusId: 0 },
    output: { AgentStatus: o_AgentStatus },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgentStatus",
})) as any;

export type DescribeAttachedFilesConfigurationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the attached files configuration for the specified Connect Customer instance and attachment scope.
 *
 * If a custom configuration exists for the specified attachment scope, the custom configuration is returned. If no custom configuration exists, the default configuration values for that attachment scope are returned.
 */
export const describeAttachedFilesConfiguration: API.OperationMethod<
  DescribeAttachedFilesConfigurationRequest,
  DescribeAttachedFilesConfigurationResponse,
  DescribeAttachedFilesConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /attached-files-configurations/{InstanceId}/{AttachmentScope}",
    input: { InstanceId: 0, AttachmentScope: 0 },
    output: { AttachedFilesConfiguration: { LastModifiedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttachedFilesConfiguration",
})) as any;

export type DescribeAuthenticationProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change. To
 * request access to this API, contact Amazon Web Services Support.
 *
 * Describes the target authentication profile.
 */
export const describeAuthenticationProfile: API.OperationMethod<
  DescribeAuthenticationProfileRequest,
  DescribeAuthenticationProfileResponse,
  DescribeAuthenticationProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /authentication-profiles/{InstanceId}/{AuthenticationProfileId}",
    input: { AuthenticationProfileId: 0, InstanceId: 0 },
    output: {
      AuthenticationProfile: { CreatedTime: D.ts, LastModifiedTime: D.ts },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthenticationProfile",
})) as any;

export type DescribeContactError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Describes the specified contact.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Retrieve contact information such as the caller's phone number and the specific number the caller dialed to
 * integrate into custom monitoring or custom agent experience solutions.
 *
 * - Detect when a customer chat session disconnects due to a network issue on the agent's end. Use the
 * DisconnectReason field in the ContactTraceRecord to detect
 * this event and then re-queue the chat for followup.
 *
 * - Identify after contact work (ACW) duration and call recordings information when a COMPLETED event is received
 * by using the contact event
 * stream.
 *
 * **Important things to know**
 *
 * - `SystemEndpoint` is not populated for contacts with initiation method of MONITOR, QUEUE_TRANSFER,
 * or CALLBACK
 *
 * - Contact information remains available in Connect Customer for 24 months from the
 * `InitiationTimestamp`, and then it is deleted. Only contact information that is available in Connect Customer is returned by this API.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const describeContact: API.OperationMethod<
  DescribeContactRequest,
  DescribeContactResponse,
  DescribeContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contacts/{InstanceId}/{ContactId}",
    input: { InstanceId: 0, ContactId: 0 },
    output: {
      Contact: {
        Name: D.secret,
        Description: D.secret,
        QueueInfo: { EnqueueTimestamp: D.ts },
        AgentInfo: {
          AcceptedByAgentTimestamp: D.ts,
          PreviewEndTimestamp: D.ts,
          ConnectedToAgentTimestamp: D.ts,
          AfterContactWorkStartTimestamp: D.ts,
          AfterContactWorkEndTimestamp: D.ts,
          StateTransitions: D.list({
            StateStartTimestamp: D.ts,
            StateEndTimestamp: D.ts,
          }),
        },
        InitiationTimestamp: D.ts,
        DisconnectTimestamp: D.ts,
        LastUpdateTimestamp: D.ts,
        LastPausedTimestamp: D.ts,
        LastResumedTimestamp: D.ts,
        RingStartTimestamp: D.ts,
        ScheduledTimestamp: D.ts,
        ConnectedToSystemTimestamp: D.ts,
        RoutingCriteria: o_RoutingCriteria,
        CustomerVoiceActivity: {
          GreetingStartTimestamp: D.ts,
          GreetingEndTimestamp: D.ts,
        },
        ChatMetrics: {
          ChatContactMetrics: { AgentFirstResponseTimestamp: D.ts },
          AgentMetrics: o_ParticipantMetrics,
          CustomerMetrics: o_ParticipantMetrics,
        },
        Recordings: D.list({ StartTimestamp: D.ts, StopTimestamp: D.ts }),
        ContactEvaluations: D.map({
          StartTimestamp: D.ts,
          EndTimestamp: D.ts,
          DeleteTimestamp: D.ts,
        }),
        NextContacts: D.list({
          NextContactMetadata: {
            QuickConnectContactData: { InitiationTimestamp: D.ts },
          },
        }),
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContact",
})) as any;

export type DescribeContactEvaluationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a contact evaluation in the specified Connect Customer instance.
 */
export const describeContactEvaluation: API.OperationMethod<
  DescribeContactEvaluationRequest,
  DescribeContactEvaluationResponse,
  DescribeContactEvaluationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-evaluations/{InstanceId}/{EvaluationId}",
    input: { InstanceId: 0, EvaluationId: 0 },
    output: {
      Evaluation: {
        Metadata: {
          Acknowledgement: { AcknowledgedTime: D.ts },
          Review: {
            RequestedTime: D.ts,
            CreatedTime: D.ts,
            ReviewRequestComments: D.list({ CreatedTime: D.ts }),
          },
        },
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactEvaluation",
})) as any;

export type DescribeContactFlowError =
  | ContactFlowNotPublishedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified flow.
 *
 * You can also create and update flows using the Connect Customer
 * Flow language.
 *
 * Use the `$SAVED` alias in the request to describe the `SAVED` content of a Flow. For
 * example, `arn:aws:.../contact-flow/{id}:$SAVED`. After a flow is published, `$SAVED` needs to
 * be supplied to view saved content that has not been published.
 *
 * Use `arn:aws:.../contact-flow/{id}:{version}` to retrieve the content of a specific flow
 * version.
 *
 * In the response, **Status** indicates the flow status as either `SAVED`
 * or `PUBLISHED`. The `PUBLISHED` status will initiate validation on the content.
 * `SAVED` does not initiate validation of the content. `SAVED` | `PUBLISHED`
 */
export const describeContactFlow: API.OperationMethod<
  DescribeContactFlowRequest,
  DescribeContactFlowResponse,
  DescribeContactFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flows/{InstanceId}/{ContactFlowId}",
    input: { InstanceId: 0, ContactFlowId: 0 },
    output: { ContactFlow: o_ContactFlow },
  },
  errors: [
    ContactFlowNotPublishedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactFlow",
})) as any;

export type DescribeContactFlowModuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified flow module.
 *
 * Use the `$SAVED` alias in the request to describe the `SAVED` content of a Flow. For
 * example, `arn:aws:.../contact-flow/{id}:$SAVED`. After a flow is published, `$SAVED` needs to
 * be supplied to view saved content that has not been published.
 */
export const describeContactFlowModule: API.OperationMethod<
  DescribeContactFlowModuleRequest,
  DescribeContactFlowModuleResponse,
  DescribeContactFlowModuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}",
    input: { InstanceId: 0, ContactFlowModuleId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactFlowModule",
})) as any;

export type DescribeContactFlowModuleAliasError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific alias, including which version it currently points to and its
 * metadata.
 */
export const describeContactFlowModuleAlias: API.OperationMethod<
  DescribeContactFlowModuleAliasRequest,
  DescribeContactFlowModuleAliasResponse,
  DescribeContactFlowModuleAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/alias/{AliasId}",
    input: { InstanceId: 0, ContactFlowModuleId: 0, AliasId: 0 },
    output: { ContactFlowModuleAlias: { LastModifiedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactFlowModuleAlias",
})) as any;

export type DescribeDataTableError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns all properties for a data table except for attributes and values. All properties from CreateDataTable
 * are returned as well as properties for region replication, versioning, and system tables. "Describe" is a deprecated
 * term but is allowed to maintain consistency with existing operations.
 */
export const describeDataTable: API.OperationMethod<
  DescribeDataTableRequest,
  DescribeDataTableResponse,
  DescribeDataTableError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /data-tables/{InstanceId}/{DataTableId}",
    input: { InstanceId: 0, DataTableId: 0 },
    output: { DataTable: o_DataTable },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataTable",
})) as any;

export type DescribeDataTableAttributeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information for a specific data table attribute including its configuration, validation rules,
 * and metadata. "Describe" is a deprecated term but is allowed to maintain consistency with existing operations.
 */
export const describeDataTableAttribute: API.OperationMethod<
  DescribeDataTableAttributeRequest,
  DescribeDataTableAttributeResponse,
  DescribeDataTableAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /data-tables/{InstanceId}/{DataTableId}/attributes/{AttributeName}",
    input: { InstanceId: 0, DataTableId: 0, AttributeName: 0 },
    output: { Attribute: o_DataTableAttribute },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataTableAttribute",
})) as any;

export type DescribeEmailAddressError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describe email address form the specified Connect Customer instance.
 */
export const describeEmailAddress: API.OperationMethod<
  DescribeEmailAddressRequest,
  DescribeEmailAddressResponse,
  DescribeEmailAddressError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /email-addresses/{InstanceId}/{EmailAddressId}",
    input: { InstanceId: 0, EmailAddressId: 0 },
    output: {
      EmailAddress: D.secret,
      DisplayName: D.secret,
      Description: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmailAddress",
})) as any;

export type DescribeEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an evaluation form in the specified Connect Customer instance. If the version property is not
 * provided, the latest version of the evaluation form is described.
 */
export const describeEvaluationForm: API.OperationMethod<
  DescribeEvaluationFormRequest,
  DescribeEvaluationFormResponse,
  DescribeEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluation-forms/{InstanceId}/{EvaluationFormId}",
    input: {
      InstanceId: 0,
      EvaluationFormId: 0,
      EvaluationFormVersion: D.m({ query: "version" }),
    },
    output: {
      EvaluationForm: {
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
        LastValidationTime: D.ts,
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvaluationForm",
})) as any;

export type DescribeExtractionDefinitionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an extraction definition in the specified Connect Customer instance.
 */
export const describeExtractionDefinition: API.OperationMethod<
  DescribeExtractionDefinitionRequest,
  DescribeExtractionDefinitionResponse,
  DescribeExtractionDefinitionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /extraction-definitions/{InstanceId}/{ExtractionDefinitionId}",
    input: { InstanceId: 0, ExtractionDefinitionId: 0 },
    output: {
      ExtractionDefinition: { CreatedTime: D.ts, LastUpdatedTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExtractionDefinition",
})) as any;

export type DescribeHoursOfOperationError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the hours of operation.
 */
export const describeHoursOfOperation: API.OperationMethod<
  DescribeHoursOfOperationRequest,
  DescribeHoursOfOperationResponse,
  DescribeHoursOfOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /hours-of-operations/{InstanceId}/{HoursOfOperationId}",
    input: { InstanceId: 0, HoursOfOperationId: 0 },
    output: { HoursOfOperation: o_HoursOfOperation },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHoursOfOperation",
})) as any;

export type DescribeHoursOfOperationOverrideError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the hours of operation override.
 */
export const describeHoursOfOperationOverride: API.OperationMethod<
  DescribeHoursOfOperationOverrideRequest,
  DescribeHoursOfOperationOverrideResponse,
  DescribeHoursOfOperationOverrideError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /hours-of-operations/{InstanceId}/{HoursOfOperationId}/overrides/{HoursOfOperationOverrideId}",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      HoursOfOperationOverrideId: 0,
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHoursOfOperationOverride",
})) as any;

export type DescribeInstanceError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns the current state of the specified instance identifier. It tracks the instance while it is being created
 * and returns an error status, if applicable.
 *
 * If an instance is not created successfully, the instance status reason field returns details relevant to the
 * reason. The instance in a failed state is returned only for 24 hours after the CreateInstance API was invoked.
 */
export const describeInstance: API.OperationMethod<
  DescribeInstanceRequest,
  DescribeInstanceResponse,
  DescribeInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}",
    input: { InstanceId: 0 },
    output: { Instance: { InstanceAlias: D.secret, CreatedTime: D.ts } },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstance",
})) as any;

export type DescribeInstanceAttributeError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Describes the specified instance attribute.
 */
export const describeInstanceAttribute: API.OperationMethod<
  DescribeInstanceAttributeRequest,
  DescribeInstanceAttributeResponse,
  DescribeInstanceAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/attribute/{AttributeType}",
    input: { InstanceId: 0, AttributeType: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceAttribute",
})) as any;

export type DescribeInstanceStorageConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Retrieves the current storage configurations for the specified resource type, association ID, and instance
 * ID.
 */
export const describeInstanceStorageConfig: API.OperationMethod<
  DescribeInstanceStorageConfigRequest,
  DescribeInstanceStorageConfigResponse,
  DescribeInstanceStorageConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/storage-config/{AssociationId}",
    input: {
      InstanceId: 0,
      AssociationId: 0,
      ResourceType: D.m({ query: "resourceType" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceStorageConfig",
})) as any;

export type DescribeMetricError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the full definition of an existing metric from the specified Connect Customer instance.
 */
export const describeMetric: API.OperationMethod<
  DescribeMetricRequest,
  DescribeMetricResponse,
  DescribeMetricError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /metrics/definitions/{InstanceId}/{MetricId}",
    input: { InstanceId: 0, MetricId: 0 },
    output: { Metric: o_MetricDefinition },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetric",
})) as any;

export type DescribeNotificationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific notification, including its content, priority, recipients, and metadata.
 */
export const describeNotification: API.OperationMethod<
  DescribeNotificationRequest,
  DescribeNotificationResponse,
  DescribeNotificationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /notifications/{InstanceId}/{NotificationId}",
    input: { InstanceId: 0, NotificationId: 0 },
    output: { Notification: o_Notification },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotification",
})) as any;

export type DescribePhoneNumberError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets details and status of a phone number that’s claimed to your Connect Customer instance or traffic distribution group.
 *
 * If the number is claimed to a traffic distribution group, and you are calling in the Amazon Web Services Region where the traffic distribution group was
 * created, you can use either a phone number ARN or UUID value for the `PhoneNumberId` URI request
 * parameter. However, if the number is claimed to a traffic distribution group and you are calling this API in the alternate Amazon Web Services Region associated with the traffic distribution group, you must provide a full phone number ARN. If a UUID is provided
 * in
 * this scenario, you receive a `ResourceNotFoundException`.
 */
export const describePhoneNumber: API.OperationMethod<
  DescribePhoneNumberRequest,
  DescribePhoneNumberResponse,
  DescribePhoneNumberError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number/{PhoneNumberId}",
    input: { PhoneNumberId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePhoneNumber",
})) as any;

export type DescribePredefinedAttributeError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a predefined attribute for the specified Connect Customer instance. A *predefined attribute*
 * is made up of a name and a value. You can use predefined attributes for:
 *
 * - Routing proficiency (for example, agent certification) that has predefined values (for example, a list of
 * possible certifications). For more information, see Create predefined attributes for routing contacts to
 * agents.
 *
 * - Contact information that varies between transfers or conferences, such as the name of the business unit
 * handling the contact. For more information, see Use contact segment attributes.
 *
 * For the predefined attributes per instance quota, see Connect Customer
 * quotas.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const describePredefinedAttribute: API.OperationMethod<
  DescribePredefinedAttributeRequest,
  DescribePredefinedAttributeResponse,
  DescribePredefinedAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /predefined-attributes/{InstanceId}/{Name}",
    input: { InstanceId: 0, Name: 0 },
    output: { PredefinedAttribute: o_PredefinedAttribute },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePredefinedAttribute",
})) as any;

export type DescribePromptError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the prompt.
 */
export const describePrompt: API.OperationMethod<
  DescribePromptRequest,
  DescribePromptResponse,
  DescribePromptError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /prompts/{InstanceId}/{PromptId}",
    input: { InstanceId: 0, PromptId: 0 },
    output: { Prompt: o_Prompt },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePrompt",
})) as any;

export type DescribeQueueError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified queue.
 */
export const describeQueue: API.OperationMethod<
  DescribeQueueRequest,
  DescribeQueueResponse,
  DescribeQueueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /queues/{InstanceId}/{QueueId}",
    input: { InstanceId: 0, QueueId: 0 },
    output: { Queue: o_Queue },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueue",
})) as any;

export type DescribeQuickConnectError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the quick connect.
 */
export const describeQuickConnect: API.OperationMethod<
  DescribeQuickConnectRequest,
  DescribeQuickConnectResponse,
  DescribeQuickConnectError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /quick-connects/{InstanceId}/{QuickConnectId}",
    input: { InstanceId: 0, QuickConnectId: 0 },
    output: { QuickConnect: o_QuickConnect },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuickConnect",
})) as any;

export type DescribeRoutingProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified routing profile.
 *
 * `DescribeRoutingProfile` does not populate AssociatedQueueIds in its response. The example Response
 * Syntax shown on this page is incorrect; we are working to update it. SearchRoutingProfiles does include
 * AssociatedQueueIds.
 */
export const describeRoutingProfile: API.OperationMethod<
  DescribeRoutingProfileRequest,
  DescribeRoutingProfileResponse,
  DescribeRoutingProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /routing-profiles/{InstanceId}/{RoutingProfileId}",
    input: { InstanceId: 0, RoutingProfileId: 0 },
    output: { RoutingProfile: o_RoutingProfile },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoutingProfile",
})) as any;

export type DescribeRuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a rule for the specified Connect Customer instance.
 */
export const describeRule: API.OperationMethod<
  DescribeRuleRequest,
  DescribeRuleResponse,
  DescribeRuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /rules/{InstanceId}/{RuleId}",
    input: { InstanceId: 0, RuleId: 0 },
    output: { Rule: { CreatedTime: D.ts, LastUpdatedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRule",
})) as any;

export type DescribeSecurityProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets basic information about the security profile.
 *
 * For information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const describeSecurityProfile: API.OperationMethod<
  DescribeSecurityProfileRequest,
  DescribeSecurityProfileResponse,
  DescribeSecurityProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles/{InstanceId}/{SecurityProfileId}",
    input: { SecurityProfileId: 0, InstanceId: 0 },
    output: { SecurityProfile: { LastModifiedTime: D.ts } },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityProfile",
})) as any;

export type DescribeTestCaseError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified test case and allows you to get the content and metadata of the test case for the specified Amazon Connect instance.
 */
export const describeTestCase: API.OperationMethod<
  DescribeTestCaseRequest,
  DescribeTestCaseResponse,
  DescribeTestCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /test-cases/{InstanceId}/{TestCaseId}",
    input: { InstanceId: 0, TestCaseId: 0, Status: D.m({ query: "status" }) },
    output: { TestCase: o_TestCase },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestCase",
})) as any;

export type DescribeTrafficDistributionGroupError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets details and status of a traffic distribution group.
 */
export const describeTrafficDistributionGroup: API.OperationMethod<
  DescribeTrafficDistributionGroupRequest,
  DescribeTrafficDistributionGroupResponse,
  DescribeTrafficDistributionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /traffic-distribution-group/{TrafficDistributionGroupId}",
    input: { TrafficDistributionGroupId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrafficDistributionGroup",
})) as any;

export type DescribeUserError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified user. You can find the instance ID in the Connect Customer
 * console (it’s the final part of the ARN). The console does not display the user IDs. Instead, list the users
 * and note the IDs provided in the output.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /users/{InstanceId}/{UserId}",
    input: { UserId: 0, InstanceId: 0 },
    output: {
      User: {
        IdentityInfo: {
          FirstName: D.secret,
          LastName: D.secret,
          Email: D.secret,
          SecondaryEmail: D.secret,
        },
        PhoneConfig: o_UserPhoneConfig,
        PhoneNumberConfigs: D.list(o_PhoneNumberConfig),
        LastModifiedTime: D.ts,
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

export type DescribeUserHierarchyGroupError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified hierarchy group.
 */
export const describeUserHierarchyGroup: API.OperationMethod<
  DescribeUserHierarchyGroupRequest,
  DescribeUserHierarchyGroupResponse,
  DescribeUserHierarchyGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /user-hierarchy-groups/{InstanceId}/{HierarchyGroupId}",
    input: { HierarchyGroupId: 0, InstanceId: 0 },
    output: { HierarchyGroup: o_HierarchyGroup },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserHierarchyGroup",
})) as any;

export type DescribeUserHierarchyStructureError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the hierarchy structure of the specified Connect Customer instance.
 */
export const describeUserHierarchyStructure: API.OperationMethod<
  DescribeUserHierarchyStructureRequest,
  DescribeUserHierarchyStructureResponse,
  DescribeUserHierarchyStructureError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /user-hierarchy-structure/{InstanceId}",
    input: { InstanceId: 0 },
    output: {
      HierarchyStructure: {
        LevelOne: o_HierarchyLevel,
        LevelTwo: o_HierarchyLevel,
        LevelThree: o_HierarchyLevel,
        LevelFour: o_HierarchyLevel,
        LevelFive: o_HierarchyLevel,
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserHierarchyStructure",
})) as any;

export type DescribeViewError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the view for the specified Connect Customer instance and view identifier.
 *
 * The view identifier can be supplied as a ViewId or ARN.
 *
 * `$SAVED` needs to be supplied if a view is unpublished.
 *
 * The view identifier can contain an optional qualifier, for example, `:$SAVED`, which
 * is either an actual version number or an Connect Customer managed qualifier `$SAVED | $LATEST`. If it is
 * not supplied, then `$LATEST` is assumed for customer managed views and an error is returned if there is no
 * published content available. Version 1 is assumed for Amazon Web Services managed views.
 */
export const describeView: API.OperationMethod<
  DescribeViewRequest,
  DescribeViewResponse,
  DescribeViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /views/{InstanceId}/{ViewId}",
    input: { InstanceId: 0, ViewId: 0 },
    output: { View: o_View },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeView",
})) as any;

export type DescribeVocabularyError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified vocabulary.
 */
export const describeVocabulary: API.OperationMethod<
  DescribeVocabularyRequest,
  DescribeVocabularyResponse,
  DescribeVocabularyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /vocabulary/{InstanceId}/{VocabularyId}",
    input: { InstanceId: 0, VocabularyId: 0 },
    output: { Vocabulary: { LastModifiedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVocabulary",
})) as any;

export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about a workspace, including its configuration and metadata.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{InstanceId}/{WorkspaceId}",
    input: { InstanceId: 0, WorkspaceId: 0 },
    output: { Workspace: { LastModifiedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspace",
})) as any;

export type DisassociateAnalyticsDataSetError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the dataset ID associated with a given Connect Customer instance.
 */
export const disassociateAnalyticsDataSet: API.OperationMethod<
  DisassociateAnalyticsDataSetRequest,
  DisassociateAnalyticsDataSetResponse,
  DisassociateAnalyticsDataSetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /analytics-data/instance/{InstanceId}/association",
    input: { InstanceId: 0, DataSetId: 0, TargetAccountId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAnalyticsDataSet",
})) as any;

export type DisassociateApprovedOriginError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Revokes access to integrated applications from Connect Customer.
 */
export const disassociateApprovedOrigin: API.OperationMethod<
  DisassociateApprovedOriginRequest,
  DisassociateApprovedOriginResponse,
  DisassociateApprovedOriginError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/approved-origin",
    input: {
      InstanceId: 0,
      Origin: D.m({ query: "origin" }),
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApprovedOrigin",
})) as any;

export type DisassociateBotError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Revokes authorization from the specified instance to access the specified Amazon Lex or Amazon Lex V2 bot.
 */
export const disassociateBot: API.OperationMethod<
  DisassociateBotRequest,
  DisassociateBotResponse,
  DisassociateBotError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/bot",
    input: {
      InstanceId: 0,
      LexBot: i_LexBot,
      LexV2Bot: i_LexV2Bot,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBot",
})) as any;

export type DisassociateEmailAddressAliasError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the alias association between two email addresses in an Connect Customer instance. After
 * disassociation, emails sent to the former alias email address are no longer forwarded to the primary email address.
 * Both email addresses continue to exist independently and can receive emails directly.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - **Department separation**: Remove alias relationships when splitting a
 * consolidated support queue back into separate department-specific queues.
 *
 * - **Email address retirement**: Cleanly remove forwarding relationships before
 * decommissioning old email addresses.
 *
 * - **Organizational restructuring**: Reconfigure email routing when business
 * processes change and aliases are no longer needed.
 *
 * **Important things to know**
 *
 * - Concurrent operations: This API uses distributed locking, so concurrent operations on the same email addresses
 * may be temporarily blocked.
 *
 * - Emails sent to the former alias address are still delivered directly to that address if it exists.
 *
 * - You do not need to delete the email addresses after disassociation. Both addresses remain active
 * independently.
 *
 * - After a successful disassociation, you can immediately create a new alias relationship with the same
 * addresses.
 *
 * - 200 status means alias was successfully disassociated.
 *
 * `DisassociateEmailAddressAlias` does not return the following information:
 *
 * - Details in the response about the email that was disassociated. The response returns an empty body.
 *
 * - The timestamp of when the disassociation occurred.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 *
 * **Related operations**
 *
 * - AssociateEmailAddressAlias: Associates an email address alias with an existing email address in an
 * Connect Customer instance.
 *
 * - DescribeEmailAddress: View current alias configurations for an email address.
 *
 * - SearchEmailAddresses: Find email addresses and their alias relationships across an instance.
 *
 * - CreateEmailAddress: Create new email addresses that can participate in alias relationships.
 *
 * - DeleteEmailAddress: Remove email addresses (automatically removes any alias relationships).
 *
 * - UpdateEmailAddressMetadata: Modify email address properties (does not affect alias relationships).
 */
export const disassociateEmailAddressAlias: API.OperationMethod<
  DisassociateEmailAddressAliasRequest,
  DisassociateEmailAddressAliasResponse,
  DisassociateEmailAddressAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /email-addresses/{InstanceId}/{EmailAddressId}/disassociate-alias",
    input: {
      EmailAddressId: 0,
      InstanceId: 0,
      AliasConfiguration: i_AliasConfiguration,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEmailAddressAlias",
})) as any;

export type DisassociateFlowError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a connect resource from a flow.
 */
export const disassociateFlow: API.OperationMethod<
  DisassociateFlowRequest,
  DisassociateFlowResponse,
  DisassociateFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /flow-associations/{InstanceId}/{ResourceId}/{ResourceType}",
    input: { InstanceId: 0, ResourceId: 0, ResourceType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFlow",
})) as any;

export type DisassociateHoursOfOperationsError =
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a set of hours of operations with another hours of operation. For more information about inheriting overrides from parent hours of operation, see Hours of operation overrides in the Administrator Guide.
 */
export const disassociateHoursOfOperations: API.OperationMethod<
  DisassociateHoursOfOperationsRequest,
  DisassociateHoursOfOperationsResponse,
  DisassociateHoursOfOperationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hours-of-operations/{InstanceId}/{HoursOfOperationId}/disassociate-hours",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      ParentHoursOfOperationIds: 0,
    },
    body: true,
  },
  errors: [
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateHoursOfOperations",
})) as any;

export type DisassociateInstanceStorageConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Removes the storage type configurations for the specified resource type and association ID.
 */
export const disassociateInstanceStorageConfig: API.OperationMethod<
  DisassociateInstanceStorageConfigRequest,
  DisassociateInstanceStorageConfigResponse,
  DisassociateInstanceStorageConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/storage-config/{AssociationId}",
    input: {
      InstanceId: 0,
      AssociationId: 0,
      ResourceType: D.m({ query: "resourceType" }),
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateInstanceStorageConfig",
})) as any;

export type DisassociateLambdaFunctionError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Remove the Lambda function from the dropdown options available in the relevant flow blocks.
 */
export const disassociateLambdaFunction: API.OperationMethod<
  DisassociateLambdaFunctionRequest,
  DisassociateLambdaFunctionResponse,
  DisassociateLambdaFunctionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/lambda-function",
    input: {
      InstanceId: 0,
      FunctionArn: D.m({ query: "functionArn" }),
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLambdaFunction",
})) as any;

export type DisassociateLexBotError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Revokes authorization from the specified instance to access the specified Amazon Lex bot.
 */
export const disassociateLexBot: API.OperationMethod<
  DisassociateLexBotRequest,
  DisassociateLexBotResponse,
  DisassociateLexBotError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/lex-bot",
    input: {
      InstanceId: 0,
      BotName: D.m({ query: "botName" }),
      LexRegion: D.m({ query: "lexRegion" }),
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLexBot",
})) as any;

export type DisassociatePhoneNumberContactFlowError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the flow association from a phone number claimed to your Connect Customer instance.
 *
 * If the number is claimed to a traffic distribution group, and you are calling this API using an instance in the Amazon Web Services Region where the traffic distribution group was created, you can use either a full phone number ARN or UUID value for the
 * `PhoneNumberId` URI request parameter. However, if the number is claimed to a traffic distribution group and you are calling
 * this API using an instance in the alternate Amazon Web Services Region associated with the traffic distribution group, you must provide a
 * full phone number ARN. If a UUID is provided in this scenario, you will receive a
 * `ResourceNotFoundException`.
 */
export const disassociatePhoneNumberContactFlow: API.OperationMethod<
  DisassociatePhoneNumberContactFlowRequest,
  DisassociatePhoneNumberContactFlowResponse,
  DisassociatePhoneNumberContactFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /phone-number/{PhoneNumberId}/contact-flow",
    input: { PhoneNumberId: 0, InstanceId: D.m({ query: "instanceId" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePhoneNumberContactFlow",
})) as any;

export type DisassociateQueueEmailAddressesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a set of email addresses and a queue. After disassociation, agents will no longer be able to select these email addresses as "From" addresses when replying to inbound email contacts or initiating outbound email contacts in this queue.
 *
 * **Important things to know**
 *
 * - Agents will no longer see these email addresses in their "From" address selection options for this queue.
 *
 * - The email addresses themselves are not deleted from the instance, only their availability for agent selection in this queue is removed.
 *
 * - Changes take effect immediately and will affect the agent experience in the Contact Control Panel (CCP).
 */
export const disassociateQueueEmailAddresses: API.OperationMethod<
  DisassociateQueueEmailAddressesRequest,
  DisassociateQueueEmailAddressesResponse,
  DisassociateQueueEmailAddressesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/disassociate-email-addresses",
    input: {
      InstanceId: 0,
      QueueId: 0,
      EmailAddressesId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQueueEmailAddresses",
})) as any;

export type DisassociateQueueQuickConnectsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a set of quick connects from a queue.
 */
export const disassociateQueueQuickConnects: API.OperationMethod<
  DisassociateQueueQuickConnectsRequest,
  DisassociateQueueQuickConnectsResponse,
  DisassociateQueueQuickConnectsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/disassociate-quick-connects",
    input: { InstanceId: 0, QueueId: 0, QuickConnectIds: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQueueQuickConnects",
})) as any;

export type DisassociateRoutingProfileQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a set of queues from a routing profile.
 *
 * Up to 10 queue references can be disassociated in a single API call. More than 10 queue references results in a
 * single call results in an InvalidParameterException.
 */
export const disassociateRoutingProfileQueues: API.OperationMethod<
  DisassociateRoutingProfileQueuesRequest,
  DisassociateRoutingProfileQueuesResponse,
  DisassociateRoutingProfileQueuesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/disassociate-queues",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      QueueReferences: D.list(i_RoutingProfileQueueReference),
      ManualAssignmentQueueReferences: D.list(i_RoutingProfileQueueReference),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRoutingProfileQueues",
})) as any;

export type DisassociateSecurityKeyError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Deletes the specified security key.
 */
export const disassociateSecurityKey: API.OperationMethod<
  DisassociateSecurityKeyRequest,
  DisassociateSecurityKeyResponse,
  DisassociateSecurityKeyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /instance/{InstanceId}/security-key/{AssociationId}",
    input: {
      InstanceId: 0,
      AssociationId: 0,
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSecurityKey",
})) as any;

export type DisassociateSecurityProfilesError =
  | AccessDeniedException
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a security profile attached to a Q in Connect AI Agent Entity in an Amazon Connect instance.
 */
export const disassociateSecurityProfiles: API.OperationMethod<
  DisassociateSecurityProfilesRequest,
  DisassociateSecurityProfilesResponse,
  DisassociateSecurityProfilesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disassociate-security-profiles/{InstanceId}",
    input: {
      InstanceId: 0,
      SecurityProfiles: D.list(i_SecurityProfileItem),
      EntityType: 0,
      EntityArn: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSecurityProfiles",
})) as any;

export type DisassociateTrafficDistributionGroupUserError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates an agent from a traffic distribution group. This API can be called only in the Region where the
 * traffic distribution group is created.
 */
export const disassociateTrafficDistributionGroupUser: API.OperationMethod<
  DisassociateTrafficDistributionGroupUserRequest,
  DisassociateTrafficDistributionGroupUserResponse,
  DisassociateTrafficDistributionGroupUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /traffic-distribution-group/{TrafficDistributionGroupId}/user",
    input: {
      TrafficDistributionGroupId: 0,
      UserId: D.m({ query: "UserId" }),
      InstanceId: D.m({ query: "InstanceId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTrafficDistributionGroupUser",
})) as any;

export type DisassociateUserProficienciesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a set of proficiencies from a user.
 */
export const disassociateUserProficiencies: API.OperationMethod<
  DisassociateUserProficienciesRequest,
  DisassociateUserProficienciesResponse,
  DisassociateUserProficienciesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/disassociate-proficiencies",
    input: {
      InstanceId: 0,
      UserId: 0,
      UserProficiencies: D.list({ AttributeName: 0, AttributeValue: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateUserProficiencies",
})) as any;

export type DisassociateWorkspaceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a workspace and one or more users or routing profiles.
 */
export const disassociateWorkspace: API.OperationMethod<
  DisassociateWorkspaceRequest,
  DisassociateWorkspaceResponse,
  DisassociateWorkspaceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/disassociate",
    input: { InstanceId: 0, WorkspaceId: 0, ResourceArns: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWorkspace",
})) as any;

export type DismissUserContactError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Dismisses contacts from an agent’s CCP and returns the agent to an available state, which allows the agent to
 * receive a new routed contact. Contacts can only be dismissed if they are in a `MISSED`,
 * `ERROR`, `ENDED`, or `REJECTED` state in the Agent Event Stream.
 */
export const dismissUserContact: API.OperationMethod<
  DismissUserContactRequest,
  DismissUserContactResponse,
  DismissUserContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/contact",
    input: { UserId: 0, InstanceId: 0, ContactId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DismissUserContact",
})) as any;

export type EvaluateDataTableValuesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Evaluates values at the time of the request and returns them. It considers the request's timezone or the table's
 * timezone, in that order, when accessing time based tables. When a value is accessed, the accessor's identity and the
 * time of access are saved alongside the value to help identify values that are actively in use. The term "Batch" is
 * not included in the operation name since it does not meet all the criteria for a batch operation as specified in
 * Batch Operations: Amazon Web Services API Standards.
 */
export const evaluateDataTableValues: API.PaginatedOperationMethod<
  EvaluateDataTableValuesRequest,
  EvaluateDataTableValuesResponse,
  EvaluateDataTableValuesError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/evaluate",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      Values: D.list({
        PrimaryValues: D.list(i_PrimaryValue),
        AttributeNames: 0,
      }),
      TimeZone: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateDataTableValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAttachedFileError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a pre-signed URL for download of an approved attached file. This API also returns metadata about the
 * attached file. It will only return a downloadURL if the status of the attached file is `APPROVED`.
 */
export const getAttachedFile: API.OperationMethod<
  GetAttachedFileRequest,
  GetAttachedFileResponse,
  GetAttachedFileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /attached-files/{InstanceId}/{FileId}",
    input: {
      InstanceId: 0,
      FileId: 0,
      UrlExpiryInSeconds: D.m({ query: "urlExpiryInSeconds" }),
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttachedFile",
})) as any;

export type GetContactAttributesError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the contact attributes for the specified contact.
 */
export const getContactAttributes: API.OperationMethod<
  GetContactAttributesRequest,
  GetContactAttributesResponse,
  GetContactAttributesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact/attributes/{InstanceId}/{InitialContactId}",
    input: { InstanceId: 0, InitialContactId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactAttributes",
})) as any;

export type GetContactMetricsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves contact metric data for a specified contact.
 *
 * **Use cases**
 *
 * Following are common use cases for position in queue and estimated wait time:
 *
 * - Customer-Facing Wait Time Announcements - Display or announce the estimated wait time and position in queue to customers before or during their queue experience.
 *
 * - Callback Offerings - Offer customers a callback option when the estimated wait time or position in queue exceeds a defined threshold.
 *
 * - Queue Routing Decisions - Route incoming contacts to less congested queues by comparing estimated wait time and position in queue across multiple queues.
 *
 * - Self-Service Deflection - Redirect customers to self-service options like chatbots or FAQs when estimated wait time is high or position in queue is unfavorable.
 *
 * **Important things to know**
 *
 * - Metrics are only available while the contact is actively in queue.
 *
 * - For more information, see the Position in queue metric in the *Connect Customer Administrator Guide*.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const getContactMetrics: API.OperationMethod<
  GetContactMetricsRequest,
  GetContactMetricsResponse,
  GetContactMetricsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/contact",
    input: { InstanceId: 0, ContactId: 0, Metrics: D.list({ Name: 0 }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactMetrics",
})) as any;

export type GetCurrentMetricDataError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the real-time metric data from the specified Connect Customer instance.
 *
 * For a description of each metric, see Metrics definitions in the *Connect Customer Administrator Guide*.
 *
 * When you make a successful API request, you can expect the following metric values in the response:
 *
 * - **Metric value is null**: The calculation cannot be performed due to divide by
 * zero or insufficient data
 *
 * - **Metric value is a number (including 0) of defined type**: The number provided
 * is the calculation result
 *
 * - **MetricResult list is empty**: The request cannot find any data in the
 * system
 *
 * The following guidelines can help you work with the API:
 *
 * - Each dimension in the metric response must contain a value
 *
 * - Each item in MetricResult must include all requested metrics
 *
 * - If the response is slow due to large result sets, try these approaches:
 *
 * - Add filters to reduce the amount of data returned
 */
export const getCurrentMetricData: API.PaginatedOperationMethod<
  GetCurrentMetricDataRequest,
  GetCurrentMetricDataResponse,
  GetCurrentMetricDataError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/current/{InstanceId}",
    input: {
      InstanceId: 0,
      Filters: i_Filters,
      Groupings: 0,
      CurrentMetrics: D.list({ Name: 0, MetricId: 0, Unit: 0 }),
      NextToken: 0,
      MaxResults: 0,
      SortCriteria: D.list({ SortByMetric: 0, SortOrder: 0 }),
    },
    output: { DataSnapshotTime: D.ts },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCurrentMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCurrentUserDataError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the real-time active user data from the specified Connect Customer instance.
 */
export const getCurrentUserData: API.PaginatedOperationMethod<
  GetCurrentUserDataRequest,
  GetCurrentUserDataResponse,
  GetCurrentUserDataError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/userdata/{InstanceId}",
    input: {
      InstanceId: 0,
      Filters: {
        Queues: 0,
        ContactFilter: { ContactStates: 0 },
        RoutingProfiles: 0,
        Agents: 0,
        UserHierarchyGroups: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      UserDataList: D.list({
        Status: { StatusStartTimestamp: D.ts },
        Contacts: D.list({
          StateStartTimestamp: D.ts,
          ConnectedToAgentTimestamp: D.ts,
        }),
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCurrentUserData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEffectiveHoursOfOperationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get the hours of operations with the effective override applied.
 */
export const getEffectiveHoursOfOperations: API.OperationMethod<
  GetEffectiveHoursOfOperationsRequest,
  GetEffectiveHoursOfOperationsResponse,
  GetEffectiveHoursOfOperationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /effective-hours-of-operations/{InstanceId}/{HoursOfOperationId}",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      FromDate: D.m({ query: "fromDate" }),
      ToDate: D.m({ query: "toDate" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectiveHoursOfOperations",
})) as any;

export type GetEvaluationFormValidationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status and results of a validation process started by StartEvaluationFormValidation.
 * Returns the current execution status (`IN_PROGRESS`, `COMPLETED`, or `FAILED`),
 * the validated form version, and when completed, a list of findings that identify structural issues and quality
 * improvements for the evaluation form, and may include suggested fixes. If the validation failed, a reason is provided
 * indicating the cause of the failure.
 */
export const getEvaluationFormValidation: API.OperationMethod<
  GetEvaluationFormValidationRequest,
  GetEvaluationFormValidationResponse,
  GetEvaluationFormValidationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluation-forms/{InstanceId}/{EvaluationFormId}/validation-results",
    input: {
      InstanceId: 0,
      EvaluationFormId: 0,
      EvaluationFormVersion: D.m({ query: "version" }),
    },
    output: { StartedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluationFormValidation",
})) as any;

export type GetFederationTokenError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UserNotFoundException
  | CommonErrors;
/**
 * Supports SAML sign-in for Connect Customer. Retrieves a token for federation. The token is for the Connect Customer user which corresponds to the IAM credentials that were used to invoke this action.
 *
 * For more information about how SAML sign-in works in Connect Customer, see Configure SAML with IAM for Connect Customer
 * in the *Connect Customer Administrator Guide*.
 *
 * This API doesn't support root users. If you try to invoke GetFederationToken with root credentials, an error
 * message similar to the following one appears:
 *
 * `Provided identity: Principal: .... User: .... cannot be used for federation with Connect Customer`
 */
export const getFederationToken: API.OperationMethod<
  GetFederationTokenRequest,
  GetFederationTokenResponse,
  GetFederationTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /user/federate/{InstanceId}",
    input: { InstanceId: 0 },
    output: {
      Credentials: {
        AccessToken: D.secret,
        AccessTokenExpiration: D.ts,
        RefreshToken: D.secret,
        RefreshTokenExpiration: D.ts,
      },
    },
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFederationToken",
})) as any;

export type GetFlowAssociationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the flow associated for a given resource.
 */
export const getFlowAssociation: API.OperationMethod<
  GetFlowAssociationRequest,
  GetFlowAssociationResponse,
  GetFlowAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /flow-associations/{InstanceId}/{ResourceId}/{ResourceType}",
    input: { InstanceId: 0, ResourceId: 0, ResourceType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowAssociation",
})) as any;

export type GetMetricDataError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets historical metric data from the specified Connect Customer instance.
 *
 * For a description of each historical metric, see Metrics definitions in the *Connect Customer Administrator Guide*.
 *
 * We recommend using the GetMetricDataV2 API. It provides more flexibility, features, and the ability to query longer time ranges
 * than `GetMetricData`. Use it to retrieve historical agent and contact metrics for the last 3 months, at
 * varying intervals. You can also use it to build custom dashboards to measure historical queue and agent performance.
 * For example, you can track the number of incoming contacts for the last 7 days, with data split by day, to see how
 * contact volume changed per day of the week.
 */
export const getMetricData: API.PaginatedOperationMethod<
  GetMetricDataRequest,
  GetMetricDataResponse,
  GetMetricDataError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/historical/{InstanceId}",
    input: {
      InstanceId: 0,
      StartTime: 0,
      EndTime: 0,
      Filters: i_Filters,
      Groupings: 0,
      HistoricalMetrics: D.list({
        Name: 0,
        Threshold: { Comparison: 0, ThresholdValue: 0 },
        Statistic: 0,
        Unit: 0,
      }),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMetricDataV2Error =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets metric data from the specified Connect Customer instance.
 *
 * `GetMetricDataV2` offers more features than GetMetricData, the previous version of this API. It
 * has new metrics, offers filtering at a metric level, and offers the ability to filter and group data by channels,
 * queues, routing profiles, agents, and agent hierarchy levels. It can retrieve historical data for the last 3 months,
 * at varying intervals. It does not support agent queues.
 *
 * For a description of the historical metrics that are supported by `GetMetricDataV2` and
 * `GetMetricData`, see Metrics definitions in the *Connect Customer Administrator Guide*.
 *
 * When you make a successful API request, you can expect the following metric values in the response:
 *
 * - **Metric value is null**: The calculation cannot be performed due to divide by
 * zero or insufficient data
 *
 * - **Metric value is a number (including 0) of defined type**: The number provided
 * is the calculation result
 *
 * - **MetricResult list is empty**: The request cannot find any data in the
 * system
 *
 * The following guidelines can help you work with the API:
 *
 * - Each dimension in the metric response must contain a value
 *
 * - Each item in MetricResult must include all requested metrics
 *
 * - If the response is slow due to large result sets, try these approaches:
 *
 * - Narrow the time range of your request
 *
 * - Add filters to reduce the amount of data returned
 */
export const getMetricDataV2: API.PaginatedOperationMethod<
  GetMetricDataV2Request,
  GetMetricDataV2Response,
  GetMetricDataV2Error,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/data",
    input: {
      ResourceArn: 0,
      StartTime: 0,
      EndTime: 0,
      Interval: { TimeZone: 0, IntervalPeriod: 0 },
      Filters: D.list({
        FilterKey: 0,
        FilterValues: 0,
        StringCondition: { Comparison: 0 },
      }),
      Groupings: 0,
      Metrics: D.list({
        Name: 0,
        Threshold: D.list({ Comparison: 0, ThresholdValue: 0 }),
        MetricId: 0,
        MetricFilters: D.list({
          MetricFilterKey: 0,
          MetricFilterValues: 0,
          Negate: 0,
        }),
      }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      MetricResults: D.list({
        MetricInterval: { StartTime: D.ts, EndTime: D.ts },
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricDataV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPromptFileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the prompt file.
 */
export const getPromptFile: API.OperationMethod<
  GetPromptFileRequest,
  GetPromptFileResponse,
  GetPromptFileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /prompts/{InstanceId}/{PromptId}/file",
    input: { InstanceId: 0, PromptId: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPromptFile",
})) as any;

export type GetTaskTemplateError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets details about a specific task template in the specified Connect Customer instance.
 */
export const getTaskTemplate: API.OperationMethod<
  GetTaskTemplateRequest,
  GetTaskTemplateResponse,
  GetTaskTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/task/template/{TaskTemplateId}",
    input: {
      InstanceId: 0,
      TaskTemplateId: 0,
      SnapshotVersion: D.m({ query: "snapshotVersion" }),
    },
    output: { LastModifiedTime: D.ts, CreatedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaskTemplate",
})) as any;

export type GetTestCaseExecutionSummaryError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves an overview of a test execution that includes the status of the execution, start and end time, and observation summary.
 */
export const getTestCaseExecutionSummary: API.OperationMethod<
  GetTestCaseExecutionSummaryRequest,
  GetTestCaseExecutionSummaryResponse,
  GetTestCaseExecutionSummaryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /test-cases/{InstanceId}/{TestCaseId}/{TestCaseExecutionId}/summary",
    input: { InstanceId: 0, TestCaseId: 0, TestCaseExecutionId: 0 },
    output: { StartTime: D.ts, EndTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestCaseExecutionSummary",
})) as any;

export type GetTrafficDistributionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current traffic distribution for a given traffic distribution group.
 */
export const getTrafficDistribution: API.OperationMethod<
  GetTrafficDistributionRequest,
  GetTrafficDistributionResponse,
  GetTrafficDistributionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /traffic-distribution/{Id}",
    input: { Id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficDistribution",
})) as any;

export type ImportPhoneNumberError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Imports a claimed phone number from an external service, such as Amazon Web Services End User Messaging, into an
 * Connect Customer instance. You can call this API only in the same Amazon Web Services Region where the Connect Customer instance was created.
 *
 * Call the DescribePhoneNumber API to verify the status of a previous `ImportPhoneNumber` operation.
 *
 * If you plan to claim or import numbers and then release numbers frequently, contact us for a service quota
 * exception. Otherwise, it is possible you will be blocked from claiming and releasing any more numbers until up to 180
 * days past the oldest number released has expired.
 *
 * By default you can claim or import and then release up to 200% of your maximum number of active phone numbers.
 * If you claim or import and then release phone numbers using the UI or API during a rolling 180 day cycle that exceeds
 * 200% of your phone number service level quota, you will be blocked from claiming or importing any more numbers until
 * 180 days past the oldest number released has expired.
 *
 * For example, if you already have 99 claimed or imported numbers and a service level quota of 99 phone numbers,
 * and in any 180 day period you release 99, claim 99, and then release 99, you will have exceeded the 200% limit. At
 * that point you are blocked from claiming any more numbers until you open an Amazon Web Services Support ticket.
 */
export const importPhoneNumber: API.OperationMethod<
  ImportPhoneNumberRequest,
  ImportPhoneNumberResponse,
  ImportPhoneNumberError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number/import",
    input: {
      InstanceId: 0,
      SourcePhoneNumberArn: 0,
      PhoneNumberDescription: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPhoneNumber",
})) as any;

export type ImportWorkspaceMediaError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Imports a media asset (such as a logo) for use in a workspace.
 */
export const importWorkspaceMedia: API.OperationMethod<
  ImportWorkspaceMediaRequest,
  ImportWorkspaceMediaResponse,
  ImportWorkspaceMediaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/media",
    input: { InstanceId: 0, WorkspaceId: 0, MediaType: 0, MediaSource: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportWorkspaceMedia",
})) as any;

export type ListAgentStatusesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists agent statuses.
 */
export const listAgentStatuses: API.PaginatedOperationMethod<
  ListAgentStatusRequest,
  ListAgentStatusResponse,
  ListAgentStatusesError,
  Creds | HttpClient.HttpClient,
  AgentStatusSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /agent-status/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      AgentStatusTypes: D.m({ query: "AgentStatusTypes" }),
    },
    output: { AgentStatusSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AgentStatusSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAnalyticsDataAssociationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the association status of requested dataset ID for a given Connect Customer instance.
 */
export const listAnalyticsDataAssociations: API.OperationMethod<
  ListAnalyticsDataAssociationsRequest,
  ListAnalyticsDataAssociationsResponse,
  ListAnalyticsDataAssociationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /analytics-data/instance/{InstanceId}/association",
    input: {
      InstanceId: 0,
      DataSetId: D.m({ query: "DataSetId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyticsDataAssociations",
})) as any;

export type ListAnalyticsDataLakeDataSetsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the data lake datasets available to associate with for a given Connect Customer instance.
 */
export const listAnalyticsDataLakeDataSets: API.OperationMethod<
  ListAnalyticsDataLakeDataSetsRequest,
  ListAnalyticsDataLakeDataSetsResponse,
  ListAnalyticsDataLakeDataSetsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /analytics-data/instance/{InstanceId}/datasets",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyticsDataLakeDataSets",
})) as any;

export type ListApprovedOriginsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of all approved origins associated with the instance.
 */
export const listApprovedOrigins: API.PaginatedOperationMethod<
  ListApprovedOriginsRequest,
  ListApprovedOriginsResponse,
  ListApprovedOriginsError,
  Creds | HttpClient.HttpClient,
  Origin
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/approved-origins",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApprovedOrigins",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Origins",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssociatedContactsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about contact tree, a list of associated contacts with a unique identifier.
 */
export const listAssociatedContacts: API.OperationMethod<
  ListAssociatedContactsRequest,
  ListAssociatedContactsResponse,
  ListAssociatedContactsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact/associated/{InstanceId}",
    input: {
      InstanceId: 0,
      ContactId: D.m({ query: "contactId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ContactSummaryList: D.list({
        InitiationTimestamp: D.ts,
        DisconnectTimestamp: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedContacts",
})) as any;

export type ListAttachedFilesConfigurationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the attached files configurations for the specified Connect Customer instance.
 *
 * This API returns effective configurations (custom overrides or defaults) for each attachment scope. If no custom configuration exists for a scope, the default configuration values are returned.
 */
export const listAttachedFilesConfigurations: API.PaginatedOperationMethod<
  ListAttachedFilesConfigurationsRequest,
  ListAttachedFilesConfigurationsResponse,
  ListAttachedFilesConfigurationsError,
  Creds | HttpClient.HttpClient,
  AttachedFilesConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /attached-files-configurations/{InstanceId}",
    input: {
      InstanceId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedFilesConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttachedFilesConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAuthenticationProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change. To
 * request access to this API, contact Amazon Web Services Support.
 *
 * Provides summary information about the authentication profiles in a specified Connect Customer
 * instance.
 */
export const listAuthenticationProfiles: API.PaginatedOperationMethod<
  ListAuthenticationProfilesRequest,
  ListAuthenticationProfilesResponse,
  ListAuthenticationProfilesError,
  Creds | HttpClient.HttpClient,
  AuthenticationProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /authentication-profiles-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      AuthenticationProfileSummaryList: D.list({ LastModifiedTime: D.ts }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuthenticationProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthenticationProfileSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBotsError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * For the specified version of Amazon Lex, returns a paginated list of all the Amazon Lex bots
 * currently associated with the instance. Use this API to return both Amazon Lex V1 and V2
 * bots.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Creds | HttpClient.HttpClient,
  LexBotConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/bots",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      LexVersion: D.m({ query: "lexVersion" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LexBots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChildHoursOfOperationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the child hours of operations for the specified parent hours of operation.
 *
 * For more information about child hours of operations, see Link overrides from different hours of operation in the
 * * Administrator Guide*.
 */
export const listChildHoursOfOperations: API.PaginatedOperationMethod<
  ListChildHoursOfOperationsRequest,
  ListChildHoursOfOperationsResponse,
  ListChildHoursOfOperationsError,
  Creds | HttpClient.HttpClient,
  HoursOfOperationsIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /hours-of-operations/{InstanceId}/{HoursOfOperationId}/hours",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChildHoursOfOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChildHoursOfOperationsSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactEvaluationsError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists contact evaluations in the specified Connect Customer instance.
 */
export const listContactEvaluations: API.PaginatedOperationMethod<
  ListContactEvaluationsRequest,
  ListContactEvaluationsResponse,
  ListContactEvaluationsError,
  Creds | HttpClient.HttpClient,
  EvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-evaluations/{InstanceId}",
    input: {
      InstanceId: 0,
      ContactId: D.m({ query: "contactId" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      EvaluationSummaryList: D.list({
        Acknowledgement: { AcknowledgedTime: D.ts },
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EvaluationSummaryList",
  } as const,
})) as any;

export type ListContactFlowModuleAliasesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all aliases associated with a contact flow module, showing their current version mappings and
 * metadata.
 */
export const listContactFlowModuleAliases: API.PaginatedOperationMethod<
  ListContactFlowModuleAliasesRequest,
  ListContactFlowModuleAliasesResponse,
  ListContactFlowModuleAliasesError,
  Creds | HttpClient.HttpClient,
  ContactFlowModuleAliasSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/aliases",
    input: {
      InstanceId: 0,
      ContactFlowModuleId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ContactFlowModuleAliasSummaryList: D.list({ LastModifiedTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactFlowModuleAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowModuleAliasSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactFlowModulesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the flow modules for the specified Connect Customer instance.
 */
export const listContactFlowModules: API.PaginatedOperationMethod<
  ListContactFlowModulesRequest,
  ListContactFlowModulesResponse,
  ListContactFlowModulesError,
  Creds | HttpClient.HttpClient,
  ContactFlowModuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flow-modules-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      ContactFlowModuleState: D.m({ query: "state" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactFlowModules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowModulesSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactFlowModuleVersionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of all versions for a specific contact flow module.
 */
export const listContactFlowModuleVersions: API.PaginatedOperationMethod<
  ListContactFlowModuleVersionsRequest,
  ListContactFlowModuleVersionsResponse,
  ListContactFlowModuleVersionsError,
  Creds | HttpClient.HttpClient,
  ContactFlowModuleVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/versions",
    input: {
      InstanceId: 0,
      ContactFlowModuleId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactFlowModuleVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowModuleVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactFlowsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the flows for the specified Connect Customer instance.
 *
 * You can also create and update flows using the Connect Customer
 * Flow language.
 *
 * For more information about flows, see Flows in the Connect Customer
 * Administrator Guide.
 */
export const listContactFlows: API.PaginatedOperationMethod<
  ListContactFlowsRequest,
  ListContactFlowsResponse,
  ListContactFlowsError,
  Creds | HttpClient.HttpClient,
  ContactFlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flows-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      ContactFlowTypes: D.m({ query: "contactFlowTypes" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactFlowVersionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns all the available versions for the specified Connect Customer instance and flow identifier.
 */
export const listContactFlowVersions: API.PaginatedOperationMethod<
  ListContactFlowVersionsRequest,
  ListContactFlowVersionsResponse,
  ListContactFlowVersionsError,
  Creds | HttpClient.HttpClient,
  ContactFlowVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact-flows/{InstanceId}/{ContactFlowId}/versions",
    input: {
      InstanceId: 0,
      ContactFlowId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactFlowVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactReferencesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * For the specified `referenceTypes`, returns a list of references associated with the contact.
 * *References* are links to documents that are related to a contact, such as emails, attachments,
 * or URLs.
 */
export const listContactReferences: API.PaginatedOperationMethod<
  ListContactReferencesRequest,
  ListContactReferencesResponse,
  ListContactReferencesError,
  Creds | HttpClient.HttpClient,
  ReferenceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /contact/references/{InstanceId}/{ContactId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      ReferenceTypes: D.m({ query: "referenceTypes" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactReferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReferenceSummaryList",
  } as const,
})) as any;

export type ListDataTableAttributesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns all attributes for a specified data table. A maximum of 100 attributes per data table is allowed.
 * Customers can request an increase by using Amazon Web Services Service Quotas. The response can be filtered by specific attribute IDs
 * for CloudFormation integration.
 */
export const listDataTableAttributes: API.PaginatedOperationMethod<
  ListDataTableAttributesRequest,
  ListDataTableAttributesResponse,
  ListDataTableAttributesError,
  Creds | HttpClient.HttpClient,
  DataTableAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/attributes",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      AttributeIds: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Attributes: D.list(o_DataTableAttribute) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTableAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Attributes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTablePrimaryValuesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all primary value combinations for a given data table. Returns the unique combinations of primary
 * attribute values that identify records in the table. Up to 100 records are returned per request.
 */
export const listDataTablePrimaryValues: API.PaginatedOperationMethod<
  ListDataTablePrimaryValuesRequest,
  ListDataTablePrimaryValuesResponse,
  ListDataTablePrimaryValuesError,
  Creds | HttpClient.HttpClient,
  RecordPrimaryValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/list-primary",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      RecordIds: 0,
      PrimaryAttributeValues: D.list(i_PrimaryAttributeValueFilter),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { PrimaryValuesList: D.list({ LastModifiedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTablePrimaryValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PrimaryValuesList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTablesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all data tables for the specified Amazon Connect instance. Returns summary information for each table
 * including basic metadata and modification details.
 */
export const listDataTables: API.PaginatedOperationMethod<
  ListDataTablesRequest,
  ListDataTablesResponse,
  ListDataTablesError,
  Creds | HttpClient.HttpClient,
  DataTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /data-tables/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { DataTableSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataTableSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTableValuesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists values stored in a data table with optional filtering by record IDs or primary attribute values. Returns
 * the raw stored values along with metadata such as lock versions and modification timestamps.
 */
export const listDataTableValues: API.PaginatedOperationMethod<
  ListDataTableValuesRequest,
  ListDataTableValuesResponse,
  ListDataTableValuesError,
  Creds | HttpClient.HttpClient,
  DataTableValueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/list",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      RecordIds: 0,
      PrimaryAttributeValues: D.list(i_PrimaryAttributeValueFilter),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Values: D.list({ LastModifiedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTableValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Values",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDefaultVocabulariesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the default vocabularies for the specified Connect Customer instance.
 */
export const listDefaultVocabularies: API.PaginatedOperationMethod<
  ListDefaultVocabulariesRequest,
  ListDefaultVocabulariesResponse,
  ListDefaultVocabulariesError,
  Creds | HttpClient.HttpClient,
  DefaultVocabulary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /default-vocabulary-summary/{InstanceId}",
    input: { InstanceId: 0, LanguageCode: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDefaultVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DefaultVocabularyList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitySecurityProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all security profiles attached to a Q in Connect AIAgent Entity in an Amazon Connect instance.
 */
export const listEntitySecurityProfiles: API.PaginatedOperationMethod<
  ListEntitySecurityProfilesRequest,
  ListEntitySecurityProfilesResponse,
  ListEntitySecurityProfilesError,
  Creds | HttpClient.HttpClient,
  SecurityProfileItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /entity-security-profiles-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      EntityType: 0,
      EntityArn: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitySecurityProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityProfiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEvaluationFormsError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists evaluation forms in the specified Connect Customer instance.
 */
export const listEvaluationForms: API.PaginatedOperationMethod<
  ListEvaluationFormsRequest,
  ListEvaluationFormsResponse,
  ListEvaluationFormsError,
  Creds | HttpClient.HttpClient,
  EvaluationFormSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluation-forms/{InstanceId}",
    input: {
      InstanceId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      EvaluationFormSummaryList: D.list({
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
        LastActivatedTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvaluationForms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EvaluationFormSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEvaluationFormVersionsError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists versions of an evaluation form in the specified Connect Customer instance.
 */
export const listEvaluationFormVersions: API.PaginatedOperationMethod<
  ListEvaluationFormVersionsRequest,
  ListEvaluationFormVersionsResponse,
  ListEvaluationFormVersionsError,
  Creds | HttpClient.HttpClient,
  EvaluationFormVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluation-forms/{InstanceId}/{EvaluationFormId}/versions",
    input: {
      InstanceId: 0,
      EvaluationFormId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      EvaluationFormVersionSummaryList: D.list({
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvaluationFormVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EvaluationFormVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExtractionDefinitionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists extraction definitions in the specified Connect Customer instance.
 */
export const listExtractionDefinitions: API.PaginatedOperationMethod<
  ListExtractionDefinitionsRequest,
  ListExtractionDefinitionsResponse,
  ListExtractionDefinitionsError,
  Creds | HttpClient.HttpClient,
  ExtractionDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /extraction-definitions/{InstanceId}",
    input: {
      InstanceId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ExtractionDefinitionSummaryList: D.list({
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtractionDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExtractionDefinitionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowAssociationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the flow association based on the filters.
 */
export const listFlowAssociations: API.PaginatedOperationMethod<
  ListFlowAssociationsRequest,
  ListFlowAssociationsResponse,
  ListFlowAssociationsError,
  Creds | HttpClient.HttpClient,
  FlowAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /flow-associations-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      ResourceType: D.m({ query: "ResourceType" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowAssociationSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHoursOfOperationOverridesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the hours of operation overrides.
 */
export const listHoursOfOperationOverrides: API.PaginatedOperationMethod<
  ListHoursOfOperationOverridesRequest,
  ListHoursOfOperationOverridesResponse,
  ListHoursOfOperationOverridesError,
  Creds | HttpClient.HttpClient,
  HoursOfOperationOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /hours-of-operations/{InstanceId}/{HoursOfOperationId}/overrides",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHoursOfOperationOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HoursOfOperationOverrideList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHoursOfOperationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the hours of operation for the specified Connect Customer instance.
 *
 * For more information about hours of operation, see Set the Hours of Operation for a Queue in the
 * *Connect Customer Administrator Guide*.
 */
export const listHoursOfOperations: API.PaginatedOperationMethod<
  ListHoursOfOperationsRequest,
  ListHoursOfOperationsResponse,
  ListHoursOfOperationsError,
  Creds | HttpClient.HttpClient,
  HoursOfOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /hours-of-operations-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { HoursOfOperationSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHoursOfOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HoursOfOperationSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstanceAttributesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of all attribute types for the given instance.
 */
export const listInstanceAttributes: API.PaginatedOperationMethod<
  ListInstanceAttributesRequest,
  ListInstanceAttributesResponse,
  ListInstanceAttributesError,
  Creds | HttpClient.HttpClient,
  Attribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/attributes",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Attributes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstancesError =
  | InternalServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Return a list of instances which are in active state, creation-in-progress state, and failed state. Instances
 * that aren't successfully created (they are in a failed state) are returned only for 24 hours after the CreateInstance
 * API was invoked.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Creds | HttpClient.HttpClient,
  InstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      InstanceSummaryList: D.list({
        InstanceAlias: D.secret,
        CreatedTime: D.ts,
      }),
    },
  },
  errors: [InternalServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstanceStorageConfigsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of storage configs for the identified instance and resource type.
 */
export const listInstanceStorageConfigs: API.PaginatedOperationMethod<
  ListInstanceStorageConfigsRequest,
  ListInstanceStorageConfigsResponse,
  ListInstanceStorageConfigsError,
  Creds | HttpClient.HttpClient,
  InstanceStorageConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/storage-configs",
    input: {
      InstanceId: 0,
      ResourceType: D.m({ query: "resourceType" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceStorageConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StorageConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIntegrationAssociationsError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the Amazon Web Services resource associations for the specified Connect Customer instance.
 */
export const listIntegrationAssociations: API.PaginatedOperationMethod<
  ListIntegrationAssociationsRequest,
  ListIntegrationAssociationsResponse,
  ListIntegrationAssociationsError,
  Creds | HttpClient.HttpClient,
  IntegrationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/integration-associations",
    input: {
      InstanceId: 0,
      IntegrationType: D.m({ query: "integrationType" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      IntegrationArn: D.m({ query: "integrationArn" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IntegrationAssociationSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLambdaFunctionsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of all Lambda functions that display in the dropdown options in the relevant flow
 * blocks.
 */
export const listLambdaFunctions: API.PaginatedOperationMethod<
  ListLambdaFunctionsRequest,
  ListLambdaFunctionsResponse,
  ListLambdaFunctionsError,
  Creds | HttpClient.HttpClient,
  FunctionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/lambda-functions",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLambdaFunctions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LambdaFunctions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLexBotsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of all the Amazon Lex V1 bots currently associated with the instance. To return
 * both Amazon Lex V1 and V2 bots, use the ListBots API.
 */
export const listLexBots: API.PaginatedOperationMethod<
  ListLexBotsRequest,
  ListLexBotsResponse,
  ListLexBotsError,
  Creds | HttpClient.HttpClient,
  LexBot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/lex-bots",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLexBots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LexBots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMetricsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of metric summaries for the specified Connect Customer instance. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listMetrics: API.PaginatedOperationMethod<
  ListMetricsRequest,
  ListMetricsResponse,
  ListMetricsError,
  Creds | HttpClient.HttpClient,
  MetricSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /metrics/definitions/{InstanceId}",
    input: {
      InstanceId: 0,
      Type: D.m({ query: "type" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { MetricSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MetricSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of all notifications in the Amazon Connect instance.
 */
export const listNotifications: API.OperationMethod<
  ListNotificationsRequest,
  ListNotificationsResponse,
  ListNotificationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /notifications/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { NotificationSummaryList: D.list(o_Notification) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifications",
})) as any;

export type ListPhoneNumbersError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the phone numbers for the specified Connect Customer instance.
 *
 * For more information about phone numbers, see Set Up Phone Numbers for Your Contact
 * Center in the *Connect Customer Administrator Guide*.
 *
 * - We recommend using ListPhoneNumbersV2 to return phone number types. ListPhoneNumbers doesn't support number types
 * `UIFN`, `SHARED`, `THIRD_PARTY_TF`, and `THIRD_PARTY_DID`. While it
 * returns numbers of those types, it incorrectly lists them as `TOLL_FREE` or `DID`.
 *
 * - The phone number `Arn` value that is returned from each of the items in the PhoneNumberSummaryList cannot be used to tag phone number resources. It will fail with a
 * `ResourceNotFoundException`. Instead, use the ListPhoneNumbersV2 API. It returns the new
 * phone number ARN that can be used to tag phone number resources.
 */
export const listPhoneNumbers: API.PaginatedOperationMethod<
  ListPhoneNumbersRequest,
  ListPhoneNumbersResponse,
  ListPhoneNumbersError,
  Creds | HttpClient.HttpClient,
  PhoneNumberSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-numbers-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      PhoneNumberTypes: D.m({ query: "phoneNumberTypes" }),
      PhoneNumberCountryCodes: D.m({ query: "phoneNumberCountryCodes" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PhoneNumberSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumbersV2Error =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists phone numbers claimed to your Connect Customer instance or traffic distribution group. If the provided `TargetArn`
 * is a traffic distribution group, you can call this API in both Amazon Web Services Regions associated with traffic distribution group.
 *
 * For more information about phone numbers, see Set Up Phone Numbers for Your Contact
 * Center in the *Connect Customer Administrator Guide*.
 *
 * - When given an instance ARN, `ListPhoneNumbersV2` returns only the phone numbers claimed to the
 * instance.
 *
 * - When given a traffic distribution group ARN `ListPhoneNumbersV2` returns only the phone numbers claimed to the
 * traffic distribution group.
 */
export const listPhoneNumbersV2: API.PaginatedOperationMethod<
  ListPhoneNumbersV2Request,
  ListPhoneNumbersV2Response,
  ListPhoneNumbersV2Error,
  Creds | HttpClient.HttpClient,
  ListPhoneNumbersSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number/list",
    input: {
      TargetArn: 0,
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      PhoneNumberCountryCodes: 0,
      PhoneNumberTypes: 0,
      PhoneNumberPrefix: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbersV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ListPhoneNumbersSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPredefinedAttributesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists predefined attributes for the specified Connect Customer instance. A *predefined attribute* is
 * made up of a name and a value. You can use predefined attributes for:
 *
 * - Routing proficiency (for example, agent certification) that has predefined values (for example, a list of
 * possible certifications). For more information, see Create predefined attributes for routing contacts to
 * agents.
 *
 * - Contact information that varies between transfers or conferences, such as the name of the business unit
 * handling the contact. For more information, see Use contact segment attributes.
 *
 * For the predefined attributes per instance quota, see Connect Customer
 * quotas.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const listPredefinedAttributes: API.PaginatedOperationMethod<
  ListPredefinedAttributesRequest,
  ListPredefinedAttributesResponse,
  ListPredefinedAttributesError,
  Creds | HttpClient.HttpClient,
  PredefinedAttributeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /predefined-attributes/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      PredefinedAttributeSummaryList: D.list({ LastModifiedTime: D.ts }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPredefinedAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredefinedAttributeSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPromptsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the prompts for the specified Connect Customer instance.
 */
export const listPrompts: API.PaginatedOperationMethod<
  ListPromptsRequest,
  ListPromptsResponse,
  ListPromptsError,
  Creds | HttpClient.HttpClient,
  PromptSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /prompts-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { PromptSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrompts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PromptSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueueEmailAddressesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all email addresses that are currently associated with a specific queue, providing details about which "From" email addresses agents can select when handling email contacts. This helps administrators manage agent email address options and understand the available choices for different brands and business units.
 *
 * **Important things to know**
 *
 * - The response includes metadata about each email address available for agent selection, including whether it's configured as the default outbound email.
 *
 * - Agents can select from these email addresses when replying to inbound contacts or initiating outbound contacts in this queue.
 *
 * - The list includes both explicitly associated email addresses and any default outbound email address configured for the queue.
 *
 * - Results are paginated to handle queues with many associated email addresses (up to 50 per queue).
 */
export const listQueueEmailAddresses: API.OperationMethod<
  ListQueueEmailAddressesRequest,
  ListQueueEmailAddressesResponse,
  ListQueueEmailAddressesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /queues/{InstanceId}/{QueueId}/email-addresses",
    input: {
      InstanceId: 0,
      QueueId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueEmailAddresses",
})) as any;

export type ListQueueQuickConnectsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the quick connects associated with a queue.
 */
export const listQueueQuickConnects: API.PaginatedOperationMethod<
  ListQueueQuickConnectsRequest,
  ListQueueQuickConnectsResponse,
  ListQueueQuickConnectsError,
  Creds | HttpClient.HttpClient,
  QuickConnectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /queues/{InstanceId}/{QueueId}/quick-connects",
    input: {
      InstanceId: 0,
      QueueId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      QuickConnectSummaryList: D.list(o_QuickConnectSummary),
      LastModifiedTime: D.ts,
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueQuickConnects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QuickConnectSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the queues for the specified Connect Customer instance.
 *
 * If you do not specify a `QueueTypes` parameter, both standard and
 * agent queues are returned. This might cause an unexpected truncation of results if you have more than 1000 agents and
 * you limit the number of results of the API call in code.
 *
 * For more information about queues, see Queues: Standard and Agent in the
 * *Connect Customer Administrator Guide*.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Creds | HttpClient.HttpClient,
  QueueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /queues-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      QueueTypes: D.m({ query: "queueTypes" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { QueueSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QueueSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQuickConnectsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about the quick connects for the specified Connect Customer instance.
 */
export const listQuickConnects: API.PaginatedOperationMethod<
  ListQuickConnectsRequest,
  ListQuickConnectsResponse,
  ListQuickConnectsError,
  Creds | HttpClient.HttpClient,
  QuickConnectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /quick-connects/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      QuickConnectTypes: D.m({ query: "QuickConnectTypes" }),
    },
    output: { QuickConnectSummaryList: D.list(o_QuickConnectSummary) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickConnects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QuickConnectSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRealtimeContactAnalysisSegmentsV2Error =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | OutputTypeNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a list of analysis segments for a real-time chat analysis session. This API supports CHAT channels
 * only.
 *
 * This API does not support VOICE. If you attempt to use it for VOICE, an `InvalidRequestException`
 * occurs.
 */
export const listRealtimeContactAnalysisSegmentsV2: API.PaginatedOperationMethod<
  ListRealtimeContactAnalysisSegmentsV2Request,
  ListRealtimeContactAnalysisSegmentsV2Response,
  ListRealtimeContactAnalysisSegmentsV2Error,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/list-real-time-analysis-segments-v2/{InstanceId}/{ContactId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      MaxResults: 0,
      NextToken: 0,
      OutputType: 0,
      SegmentTypes: 0,
    },
    output: {
      Segments: D.list({
        Transcript: { Time: o_RealTimeContactAnalysisTimeData },
        Event: { Time: o_RealTimeContactAnalysisTimeData },
        Attachments: { Time: o_RealTimeContactAnalysisTimeData },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    OutputTypeNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRealtimeContactAnalysisSegmentsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoutingProfileManualAssignmentQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the manual assignment queues associated with a routing profile.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - This API returns list of queues where contacts can be manually assigned or picked by an agent who has access
 * to the Worklist app. The user can additionally filter on queues, if they have access to those queues (otherwise a
 * invalid request exception will be thrown).
 *
 * For information about how manual contact assignment works in the agent workspace, see the Access the Worklist app in the Connect Customer agent workspace in the *Connect Customer Administrator Guide*.
 *
 * **Important things to know**
 *
 * - This API only returns the manual assignment queues associated with a routing profile. Use the
 * ListRoutingProfileQueues API to list the auto assignment queues for the routing profile.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const listRoutingProfileManualAssignmentQueues: API.PaginatedOperationMethod<
  ListRoutingProfileManualAssignmentQueuesRequest,
  ListRoutingProfileManualAssignmentQueuesResponse,
  ListRoutingProfileManualAssignmentQueuesError,
  Creds | HttpClient.HttpClient,
  RoutingProfileManualAssignmentQueueConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /routing-profiles/{InstanceId}/{RoutingProfileId}/manual-assignment-queues",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingProfileManualAssignmentQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingProfileManualAssignmentQueueConfigSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoutingProfileQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the queues associated with a routing profile.
 */
export const listRoutingProfileQueues: API.PaginatedOperationMethod<
  ListRoutingProfileQueuesRequest,
  ListRoutingProfileQueuesResponse,
  ListRoutingProfileQueuesError,
  Creds | HttpClient.HttpClient,
  RoutingProfileQueueConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /routing-profiles/{InstanceId}/{RoutingProfileId}/queues",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingProfileQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingProfileQueueConfigSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoutingProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the routing profiles for the specified Connect Customer instance.
 *
 * For more information about routing profiles, see Routing Profiles and Create a Routing Profile in the *Connect Customer Administrator Guide*.
 */
export const listRoutingProfiles: API.PaginatedOperationMethod<
  ListRoutingProfilesRequest,
  ListRoutingProfilesResponse,
  ListRoutingProfilesError,
  Creds | HttpClient.HttpClient,
  RoutingProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /routing-profiles-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { RoutingProfileSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingProfileSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List all rules for the specified Connect Customer instance.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Creds | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /rules/{InstanceId}",
    input: {
      InstanceId: 0,
      PublishStatus: D.m({ query: "publishStatus" }),
      EventSourceName: D.m({ query: "eventSourceName" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      RuleSummaryList: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityKeysError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Returns a paginated list of all security keys associated with the instance.
 */
export const listSecurityKeys: API.PaginatedOperationMethod<
  ListSecurityKeysRequest,
  ListSecurityKeysResponse,
  ListSecurityKeysError,
  Creds | HttpClient.HttpClient,
  SecurityKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/security-keys",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { SecurityKeys: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityKeys",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityProfileApplicationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of third-party applications or MCP Servers in a specific security profile.
 */
export const listSecurityProfileApplications: API.PaginatedOperationMethod<
  ListSecurityProfileApplicationsRequest,
  ListSecurityProfileApplicationsResponse,
  ListSecurityProfileApplicationsError,
  Creds | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles-applications/{InstanceId}/{SecurityProfileId}",
    input: {
      SecurityProfileId: 0,
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfileApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityProfileFlowModulesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * A list of Flow Modules an AI Agent can invoke as a tool
 */
export const listSecurityProfileFlowModules: API.PaginatedOperationMethod<
  ListSecurityProfileFlowModulesRequest,
  ListSecurityProfileFlowModulesResponse,
  ListSecurityProfileFlowModulesError,
  Creds | HttpClient.HttpClient,
  FlowModule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles-flow-modules/{InstanceId}/{SecurityProfileId}",
    input: {
      SecurityProfileId: 0,
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfileFlowModules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AllowedFlowModules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityProfilePermissionsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the permissions granted to a security profile.
 *
 * For information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const listSecurityProfilePermissions: API.PaginatedOperationMethod<
  ListSecurityProfilePermissionsRequest,
  ListSecurityProfilePermissionsResponse,
  ListSecurityProfilePermissionsError,
  Creds | HttpClient.HttpClient,
  SecurityProfilePermission
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles-permissions/{InstanceId}/{SecurityProfileId}",
    input: {
      SecurityProfileId: 0,
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfilePermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Permissions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the security profiles for the specified Connect Customer instance.
 *
 * For more information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const listSecurityProfiles: API.PaginatedOperationMethod<
  ListSecurityProfilesRequest,
  ListSecurityProfilesResponse,
  ListSecurityProfilesError,
  Creds | HttpClient.HttpClient,
  SecurityProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { SecurityProfileSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityProfileSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 *
 * For sample policies that use tags, see Connect Customer Identity-Based Policy
 * Examples in the *Connect Customer Administrator Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTaskTemplatesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists task templates for the specified Connect Customer instance.
 */
export const listTaskTemplates: API.PaginatedOperationMethod<
  ListTaskTemplatesRequest,
  ListTaskTemplatesResponse,
  ListTaskTemplatesError,
  Creds | HttpClient.HttpClient,
  TaskTemplateMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/task/template",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      Status: D.m({ query: "status" }),
      Name: D.m({ query: "name" }),
    },
    output: {
      TaskTemplates: D.list({ LastModifiedTime: D.ts, CreatedTime: D.ts }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTestCaseExecutionRecordsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists detailed steps of test case execution that includes all observations along with actions taken and data associated in the specified Amazon Connect instance.
 */
export const listTestCaseExecutionRecords: API.OperationMethod<
  ListTestCaseExecutionRecordsRequest,
  ListTestCaseExecutionRecordsResponse,
  ListTestCaseExecutionRecordsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /test-cases/{InstanceId}/{TestCaseId}/{TestCaseExecutionId}/records",
    input: {
      InstanceId: 0,
      TestCaseId: 0,
      TestCaseExecutionId: 0,
      Status: D.m({ query: "status" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { ExecutionRecords: D.list({ Timestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestCaseExecutionRecords",
})) as any;

export type ListTestCaseExecutionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all test case executions and allows filtering by test case id, test case name, start time, end time or status of the execution for the specified Amazon Connect instance.
 */
export const listTestCaseExecutions: API.OperationMethod<
  ListTestCaseExecutionsRequest,
  ListTestCaseExecutionsResponse,
  ListTestCaseExecutionsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /test-case-executions/{InstanceId}",
    input: {
      InstanceId: 0,
      TestCaseId: D.m({ query: "testCaseId" }),
      TestCaseName: D.m({ query: "testCaseName" }),
      StartTime: D.m({ query: "startTime" }),
      EndTime: D.m({ query: "endTime" }),
      Status: D.m({ query: "status" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { TestCaseExecutions: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestCaseExecutions",
})) as any;

export type ListTestCasesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the test cases present in the specific Amazon Connect instance.
 */
export const listTestCases: API.PaginatedOperationMethod<
  ListTestCasesRequest,
  ListTestCasesResponse,
  ListTestCasesError,
  Creds | HttpClient.HttpClient,
  TestCaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /test-cases-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { TestCaseSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestCases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TestCaseSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrafficDistributionGroupsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists traffic distribution groups.
 */
export const listTrafficDistributionGroups: API.PaginatedOperationMethod<
  ListTrafficDistributionGroupsRequest,
  ListTrafficDistributionGroupsResponse,
  ListTrafficDistributionGroupsError,
  Creds | HttpClient.HttpClient,
  TrafficDistributionGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /traffic-distribution-groups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      InstanceId: D.m({ query: "instanceId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficDistributionGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrafficDistributionGroupSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrafficDistributionGroupUsersError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists traffic distribution group users.
 */
export const listTrafficDistributionGroupUsers: API.PaginatedOperationMethod<
  ListTrafficDistributionGroupUsersRequest,
  ListTrafficDistributionGroupUsersResponse,
  ListTrafficDistributionGroupUsersError,
  Creds | HttpClient.HttpClient,
  TrafficDistributionGroupUserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /traffic-distribution-group/{TrafficDistributionGroupId}/user",
    input: {
      TrafficDistributionGroupId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficDistributionGroupUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrafficDistributionGroupUserSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUseCasesError =
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the use cases for the integration association.
 */
export const listUseCases: API.PaginatedOperationMethod<
  ListUseCasesRequest,
  ListUseCasesResponse,
  ListUseCasesError,
  Creds | HttpClient.HttpClient,
  UseCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instance/{InstanceId}/integration-associations/{IntegrationAssociationId}/use-cases",
    input: {
      InstanceId: 0,
      IntegrationAssociationId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUseCases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UseCaseSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserHierarchyGroupsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the hierarchy groups for the specified Connect Customer instance.
 *
 * For more information about agent hierarchies, see Set Up Agent Hierarchies in the *Connect Customer Administrator Guide*.
 */
export const listUserHierarchyGroups: API.PaginatedOperationMethod<
  ListUserHierarchyGroupsRequest,
  ListUserHierarchyGroupsResponse,
  ListUserHierarchyGroupsError,
  Creds | HttpClient.HttpClient,
  HierarchyGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /user-hierarchy-groups-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { UserHierarchyGroupSummaryList: D.list(o_HierarchyGroupSummary) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserHierarchyGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserHierarchyGroupSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserNotificationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of notifications for a specific user, including the notification status for that user.
 */
export const listUserNotifications: API.OperationMethod<
  ListUserNotificationsRequest,
  ListUserNotificationsResponse,
  ListUserNotificationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /users/{InstanceId}/{UserId}/notifications",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      UserId: 0,
    },
    output: { UserNotifications: D.list({ CreatedAt: D.ts, ExpiresAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserNotifications",
})) as any;

export type ListUserProficienciesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists proficiencies associated with a user.
 */
export const listUserProficiencies: API.PaginatedOperationMethod<
  ListUserProficienciesRequest,
  ListUserProficienciesResponse,
  ListUserProficienciesError,
  Creds | HttpClient.HttpClient,
  UserProficiency
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /users/{InstanceId}/{UserId}/proficiencies",
    input: {
      InstanceId: 0,
      UserId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserProficiencies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserProficiencyList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides summary information about the users for the specified Connect Customer instance.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Creds | HttpClient.HttpClient,
  UserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /users-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { UserSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListViewsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns views in the given instance.
 *
 * Results are sorted primarily by type, and secondarily by name.
 */
export const listViews: API.PaginatedOperationMethod<
  ListViewsRequest,
  ListViewsResponse,
  ListViewsError,
  Creds | HttpClient.HttpClient,
  ViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /views/{InstanceId}",
    input: {
      InstanceId: 0,
      Type: D.m({ query: "type" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { ViewsSummaryList: D.list({ Name: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ViewsSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListViewVersionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns all the available versions for the specified Connect Customer instance and view identifier.
 *
 * Results will be sorted from highest to lowest.
 */
export const listViewVersions: API.PaginatedOperationMethod<
  ListViewVersionsRequest,
  ListViewVersionsResponse,
  ListViewVersionsError,
  Creds | HttpClient.HttpClient,
  ViewVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /views/{InstanceId}/{ViewId}/versions",
    input: {
      InstanceId: 0,
      ViewId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { ViewVersionSummaryList: D.list({ Name: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViewVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ViewVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkspaceMediaError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists media assets (such as logos) associated with a workspace.
 */
export const listWorkspaceMedia: API.OperationMethod<
  ListWorkspaceMediaRequest,
  ListWorkspaceMediaResponse,
  ListWorkspaceMediaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{InstanceId}/{WorkspaceId}/media",
    input: { InstanceId: 0, WorkspaceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaceMedia",
})) as any;

export type ListWorkspacePagesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the page configurations in a workspace, including the views assigned to each page.
 */
export const listWorkspacePages: API.PaginatedOperationMethod<
  ListWorkspacePagesRequest,
  ListWorkspacePagesResponse,
  ListWorkspacePagesError,
  Creds | HttpClient.HttpClient,
  WorkspacePage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{InstanceId}/{WorkspaceId}/pages",
    input: {
      InstanceId: 0,
      WorkspaceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspacePages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkspacePageList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkspacesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the workspaces in an Amazon Connect instance.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Creds | HttpClient.HttpClient,
  WorkspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{InstanceId}",
    input: {
      InstanceId: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { WorkspaceSummaryList: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkspaceSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type MonitorContactError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates silent monitoring of a contact. The Contact Control Panel (CCP) of the user specified by
 * *userId* will be set to silent monitoring mode on the contact.
 */
export const monitorContact: API.OperationMethod<
  MonitorContactRequest,
  MonitorContactResponse,
  MonitorContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/monitor",
    input: {
      InstanceId: 0,
      ContactId: 0,
      UserId: 0,
      AllowedMonitorCapabilities: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MonitorContact",
})) as any;

export type PauseContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows pausing an ongoing task contact.
 */
export const pauseContact: API.OperationMethod<
  PauseContactRequest,
  PauseContactResponse,
  PauseContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/pause",
    input: { ContactId: 0, InstanceId: 0, ContactFlowId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseContact",
})) as any;

export type PutUserStatusError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Changes the current status of a user or agent in Connect Customer. If the agent is currently handling a
 * contact, this sets the agent's next status.
 *
 * For more information, see Agent status and Set your
 * next status in the *Connect Customer Administrator Guide*.
 */
export const putUserStatus: API.OperationMethod<
  PutUserStatusRequest,
  PutUserStatusResponse,
  PutUserStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /users/{InstanceId}/{UserId}/status",
    input: { UserId: 0, InstanceId: 0, AgentStatusId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUserStatus",
})) as any;

export type ReleasePhoneNumberError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Releases a phone number previously claimed to an Connect Customer instance or traffic distribution group. You can call this API
 * only in the Amazon Web Services Region where the number was claimed.
 *
 * To release phone numbers from a traffic distribution group, use the `ReleasePhoneNumber` API, not the Connect Customer admin website.
 *
 * After releasing a phone number, the phone number enters into a cooldown period for up to 180 days. It cannot be
 * searched for or claimed again until the period has ended. If you accidentally release a phone number, contact
 * Amazon Web Services Support.
 *
 * If you plan to claim and release numbers frequently,
 * contact us for a service quota exception. Otherwise, it is possible you will be blocked from
 * claiming and releasing any more numbers until up to 180 days past the oldest number
 * released has expired.
 *
 * By default you can claim and release up to 200% of your maximum number of active
 * phone numbers. If you claim and release phone numbers using
 * the UI or API during a rolling 180 day cycle that exceeds 200% of your phone number
 * service level quota, you will be blocked from claiming any more numbers until 180
 * days past the oldest number released has expired.
 *
 * For example, if you already have 99 claimed numbers and a service level quota of 99 phone numbers, and in any 180
 * day period you release 99, claim 99, and then release 99, you will have exceeded the
 * 200% limit. At that point you are blocked from claiming any more numbers until you
 * open an Amazon Web Services support ticket.
 */
export const releasePhoneNumber: API.OperationMethod<
  ReleasePhoneNumberRequest,
  ReleasePhoneNumberResponse,
  ReleasePhoneNumberError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /phone-number/{PhoneNumberId}",
    input: {
      PhoneNumberId: 0,
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleasePhoneNumber",
})) as any;

export type ReplicateInstanceError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Replicates an Connect Customer instance in the specified Amazon Web Services Region and copies configuration
 * information for Connect Customer resources across Amazon Web Services Regions.
 *
 * For more information about replicating an Connect Customer instance, see Create a replica of your existing Connect Customer
 * instance in the *Connect Customer Administrator Guide*.
 */
export const replicateInstance: API.OperationMethod<
  ReplicateInstanceRequest,
  ReplicateInstanceResponse,
  ReplicateInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/replicate",
    input: {
      InstanceId: 0,
      ReplicaRegion: 0,
      ClientToken: D.m({ idempotency: true }),
      ReplicaAlias: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplicateInstance",
})) as any;

export type ResumeContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows resuming a task contact in a paused state.
 */
export const resumeContact: API.OperationMethod<
  ResumeContactRequest,
  ResumeContactResponse,
  ResumeContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/resume",
    input: { ContactId: 0, InstanceId: 0, ContactFlowId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeContact",
})) as any;

export type ResumeContactRecordingError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * When a contact is being recorded, and the recording has been suspended using SuspendContactRecording, this API
 * resumes recording whatever recording is selected in the flow configuration: call, screen, or both. If only call
 * recording or only screen recording is enabled, then it would resume.
 *
 * Voice and screen recordings are supported.
 */
export const resumeContactRecording: API.OperationMethod<
  ResumeContactRecordingRequest,
  ResumeContactRecordingResponse,
  ResumeContactRecordingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/resume-recording",
    input: {
      InstanceId: 0,
      ContactId: 0,
      InitialContactId: 0,
      ContactRecordingType: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeContactRecording",
})) as any;

export type SearchAgentStatusesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches AgentStatuses in an Connect Customer instance, with optional filtering.
 */
export const searchAgentStatuses: API.PaginatedOperationMethod<
  SearchAgentStatusesRequest,
  SearchAgentStatusesResponse,
  SearchAgentStatusesError,
  Creds | HttpClient.HttpClient,
  AgentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-agent-statuses",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_AgentStatusSearchCriteria,
    },
    output: { AgentStatuses: D.list(o_AgentStatus) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAgentStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AgentStatuses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchAvailablePhoneNumbersError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for available phone numbers that you can claim to your Connect Customer instance or traffic distribution group. If the
 * provided `TargetArn` is a traffic distribution group, you can call this API in both Amazon Web Services Regions associated with
 * the traffic distribution group.
 */
export const searchAvailablePhoneNumbers: API.PaginatedOperationMethod<
  SearchAvailablePhoneNumbersRequest,
  SearchAvailablePhoneNumbersResponse,
  SearchAvailablePhoneNumbersError,
  Creds | HttpClient.HttpClient,
  AvailableNumberSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number/search-available",
    input: {
      TargetArn: 0,
      InstanceId: 0,
      PhoneNumberCountryCode: 0,
      PhoneNumberType: 0,
      PhoneNumberPrefix: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAvailablePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AvailableNumbersList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchContactEvaluationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches contact evaluations in an Connect Customer instance, with optional filtering.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Find contact evaluations by using specific search criteria.
 *
 * - Find contact evaluations that are tagged with a specific set of tags.
 *
 * **Important things to know**
 *
 * - A Search operation, unlike a List operation, takes time to index changes to resource (create, update or
 * delete). If you don't see updated information for recently changed contact evaluations, try calling the API again
 * in a few seconds.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const searchContactEvaluations: API.OperationMethod<
  SearchContactEvaluationsRequest,
  SearchContactEvaluationsResponse,
  SearchContactEvaluationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-contact-evaluations",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchCriteria: i_EvaluationSearchCriteria,
      SearchFilter: {
        AttributeFilter: i_ControlPlaneAttributeFilter,
        ContactEvaluationAttributeFilter: {
          OrConditions: D.list(i_ContactEvaluationAttributeAndCondition),
          AndCondition: i_ContactEvaluationAttributeAndCondition,
          TagCondition: i_TagCondition,
          ContactEvaluationAttributeCondition:
            i_ContactEvaluationAttributeCondition,
        },
      },
    },
    output: {
      EvaluationSearchSummaryList: D.list({
        Metadata: { AcknowledgedTime: D.ts },
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContactEvaluations",
})) as any;

export type SearchContactFlowModulesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches the flow modules in an Connect Customer instance, with optional filtering.
 */
export const searchContactFlowModules: API.PaginatedOperationMethod<
  SearchContactFlowModulesRequest,
  SearchContactFlowModulesResponse,
  SearchContactFlowModulesError,
  Creds | HttpClient.HttpClient,
  ContactFlowModule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-contact-flow-modules",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_ContactFlowModuleSearchCriteria,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContactFlowModules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlowModules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchContactFlowsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches the flows in an Connect Customer instance, with optional filtering.
 */
export const searchContactFlows: API.PaginatedOperationMethod<
  SearchContactFlowsRequest,
  SearchContactFlowsResponse,
  SearchContactFlowsError,
  Creds | HttpClient.HttpClient,
  ContactFlow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-contact-flows",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: {
        TagFilter: i_ControlPlaneTagFilter,
        FlowAttributeFilter: {
          OrConditions: D.list(i_ContactFlowAttributeAndCondition),
          AndCondition: i_ContactFlowAttributeAndCondition,
          TagCondition: i_TagCondition,
          ContactFlowTypeCondition: i_ContactFlowTypeCondition,
        },
      },
      SearchCriteria: i_ContactFlowSearchCriteria,
    },
    output: { ContactFlows: D.list(o_ContactFlow) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContactFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactFlows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchContactsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches contacts in an Connect Customer instance.
 */
export const searchContacts: API.PaginatedOperationMethod<
  SearchContactsRequest,
  SearchContactsResponse,
  SearchContactsError,
  Creds | HttpClient.HttpClient,
  ContactSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-contacts",
    input: {
      InstanceId: 0,
      TimeRange: i_SearchContactsTimeRange,
      SearchCriteria: {
        Name: { SearchText: 0, MatchType: 0 },
        AgentIds: 0,
        AgentHierarchyGroups: {
          L1Ids: 0,
          L2Ids: 0,
          L3Ids: 0,
          L4Ids: 0,
          L5Ids: 0,
        },
        Channels: 0,
        ContactAnalysis: {
          Transcript: {
            Criteria: D.list({
              ParticipantRole: 0,
              SearchText: 0,
              MatchType: 0,
            }),
            MatchType: 0,
          },
        },
        InitiationMethods: 0,
        QueueIds: 0,
        RoutingCriteria: {
          Steps: D.list({ AgentCriteria: { AgentIds: 0, MatchType: 0 } }),
        },
        AdditionalTimeRange: {
          Criteria: D.list({
            TimeRange: i_SearchContactsTimeRange,
            TimestampCondition: { Type: 0, ConditionType: 0 },
          }),
          MatchType: 0,
        },
        SearchableContactAttributes: {
          Criteria: D.list({ Key: 0, Values: 0 }),
          MatchType: 0,
        },
        SearchableSegmentAttributes: {
          Criteria: D.list({ Key: 0, Values: 0 }),
          MatchType: 0,
        },
        ActiveRegions: 0,
        ContactTags: i_ControlPlaneTagFilter,
        AiAgents: {
          Criteria: D.list({
            Id: 0,
            VersionNumber: 0,
            AiAgentEscalated: 0,
            AiUseCase: 0,
          }),
        },
      },
      MaxResults: 0,
      NextToken: 0,
      Sort: { FieldName: 0, Order: 0 },
    },
    output: {
      Contacts: D.list({
        QueueInfo: { EnqueueTimestamp: D.ts },
        AgentInfo: { ConnectedToAgentTimestamp: D.ts },
        InitiationTimestamp: D.ts,
        DisconnectTimestamp: D.ts,
        ScheduledTimestamp: D.ts,
        Name: D.secret,
        RoutingCriteria: o_RoutingCriteria,
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Contacts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchDataTablesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for data tables based on the table's ID, name, and description. In the future, this operation can
 * support searching on attribute names and possibly primary values. Follows other search operations closely and
 * supports both search criteria and filters.
 */
export const searchDataTables: API.PaginatedOperationMethod<
  SearchDataTablesRequest,
  SearchDataTablesResponse,
  SearchDataTablesError,
  Creds | HttpClient.HttpClient,
  DataTable
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-data-tables",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_DataTableSearchCriteria,
    },
    output: { DataTables: D.list(o_DataTable) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDataTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataTables",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchEmailAddressesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches email address in an instance, with optional filtering.
 */
export const searchEmailAddresses: API.OperationMethod<
  SearchEmailAddressesRequest,
  SearchEmailAddressesResponse,
  SearchEmailAddressesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-email-addresses",
    input: {
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      SearchCriteria: i_EmailAddressSearchCriteria,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
    },
    output: {
      EmailAddresses: D.list({
        EmailAddress: D.secret,
        Description: D.secret,
        DisplayName: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchEmailAddresses",
})) as any;

export type SearchEvaluationFormsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches evaluation forms in an Connect Customer instance, with optional filtering.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - List all evaluation forms in an instance.
 *
 * - Find all evaluation forms that meet specific criteria, such as Title, Description, Status, and more.
 *
 * - Find all evaluation forms that are tagged with a specific set of tags.
 *
 * **Important things to know**
 *
 * - A Search operation, unlike a List operation, takes time to index changes to resource (create, update or
 * delete). If you don't see updated information for recently changed contact evaluations, try calling the API again
 * in a few seconds.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const searchEvaluationForms: API.OperationMethod<
  SearchEvaluationFormsRequest,
  SearchEvaluationFormsResponse,
  SearchEvaluationFormsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-evaluation-forms",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchCriteria: i_EvaluationFormSearchCriteria,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
    },
    output: {
      EvaluationFormSearchSummaryList: D.list({
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
        LastActivatedTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchEvaluationForms",
})) as any;

export type SearchHoursOfOperationOverridesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches the hours of operation overrides.
 */
export const searchHoursOfOperationOverrides: API.PaginatedOperationMethod<
  SearchHoursOfOperationOverridesRequest,
  SearchHoursOfOperationOverridesResponse,
  SearchHoursOfOperationOverridesError,
  Creds | HttpClient.HttpClient,
  HoursOfOperationOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-hours-of-operation-overrides",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: i_HoursOfOperationSearchFilter,
      SearchCriteria: i_HoursOfOperationOverrideSearchCriteria,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchHoursOfOperationOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HoursOfOperationOverrides",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchHoursOfOperationsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches the hours of operation in an Connect Customer instance, with optional filtering.
 */
export const searchHoursOfOperations: API.PaginatedOperationMethod<
  SearchHoursOfOperationsRequest,
  SearchHoursOfOperationsResponse,
  SearchHoursOfOperationsError,
  Creds | HttpClient.HttpClient,
  HoursOfOperation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-hours-of-operations",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: i_HoursOfOperationSearchFilter,
      SearchCriteria: i_HoursOfOperationSearchCriteria,
    },
    output: { HoursOfOperations: D.list(o_HoursOfOperation) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchHoursOfOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HoursOfOperations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchMetricsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for metrics in the specified Connect Customer instance using search criteria and optional tag-based filters. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const searchMetrics: API.PaginatedOperationMethod<
  SearchMetricsRequest,
  SearchMetricsResponse,
  SearchMetricsError,
  Creds | HttpClient.HttpClient,
  MetricDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-metrics",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_MetricSearchCriteria,
    },
    output: { Metrics: D.list(o_MetricDefinition) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Metrics",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchNotificationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for notifications based on specified criteria and filters. Returns a paginated list of notifications matching the search parameters, ordered by descending creation time. Supports filtering by content and tags.
 */
export const searchNotifications: API.OperationMethod<
  SearchNotificationsRequest,
  SearchNotificationsResponse,
  SearchNotificationsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-notifications",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_NotificationSearchCriteria,
    },
    output: {
      Notifications: D.list({
        CreatedAt: D.ts,
        ExpiresAt: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchNotifications",
})) as any;

export type SearchPredefinedAttributesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches predefined attributes that meet certain criteria. A *predefined attribute* is made
 * up of a name and a value. You can use predefined attributes for:
 *
 * - Routing proficiency (for example, agent certification) that has predefined values (for example, a list of
 * possible certifications). For more information, see Create predefined attributes for routing contacts to
 * agents.
 *
 * - Contact information that varies between transfers or conferences, such as the name of the business unit
 * handling the contact. For more information, see Use contact segment attributes.
 *
 * For the predefined attributes per instance quota, see Connect Customer
 * quotas.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const searchPredefinedAttributes: API.PaginatedOperationMethod<
  SearchPredefinedAttributesRequest,
  SearchPredefinedAttributesResponse,
  SearchPredefinedAttributesError,
  Creds | HttpClient.HttpClient,
  PredefinedAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-predefined-attributes",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchCriteria: i_PredefinedAttributeSearchCriteria,
    },
    output: { PredefinedAttributes: D.list(o_PredefinedAttribute) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPredefinedAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredefinedAttributes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchPromptsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches prompts in an Connect Customer instance, with optional filtering.
 */
export const searchPrompts: API.PaginatedOperationMethod<
  SearchPromptsRequest,
  SearchPromptsResponse,
  SearchPromptsError,
  Creds | HttpClient.HttpClient,
  Prompt
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-prompts",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_PromptSearchCriteria,
    },
    output: { Prompts: D.list(o_Prompt) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPrompts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Prompts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches queues in an Connect Customer instance, with optional filtering.
 */
export const searchQueues: API.PaginatedOperationMethod<
  SearchQueuesRequest,
  SearchQueuesResponse,
  SearchQueuesError,
  Creds | HttpClient.HttpClient,
  Queue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-queues",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_QueueSearchCriteria,
    },
    output: { Queues: D.list(o_Queue) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Queues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchQuickConnectsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches quick connects in an Connect Customer instance, with optional filtering.
 */
export const searchQuickConnects: API.PaginatedOperationMethod<
  SearchQuickConnectsRequest,
  SearchQuickConnectsResponse,
  SearchQuickConnectsError,
  Creds | HttpClient.HttpClient,
  QuickConnect
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-quick-connects",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_QuickConnectSearchCriteria,
    },
    output: { QuickConnects: D.list(o_QuickConnect) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuickConnects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QuickConnects",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchResourceTagsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | MaximumResultReturnedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches tags used in an Connect Customer instance using optional search criteria.
 */
export const searchResourceTags: API.PaginatedOperationMethod<
  SearchResourceTagsRequest,
  SearchResourceTagsResponse,
  SearchResourceTagsError,
  Creds | HttpClient.HttpClient,
  TagSet
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-resource-tags",
    input: {
      InstanceId: 0,
      ResourceTypes: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchCriteria: {
        TagSearchCondition: {
          tagKey: 0,
          tagValue: 0,
          tagKeyComparisonType: 0,
          tagValueComparisonType: 0,
        },
      },
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    MaximumResultReturnedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchResourceTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchRoutingProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches routing profiles in an Connect Customer instance, with optional filtering.
 *
 * `SearchRoutingProfiles` does not populate LastModifiedRegion, LastModifiedTime,
 * MediaConcurrencies.CrossChannelBehavior, and AgentAvailabilityTimer in its response, but DescribeRoutingProfile does.
 */
export const searchRoutingProfiles: API.PaginatedOperationMethod<
  SearchRoutingProfilesRequest,
  SearchRoutingProfilesResponse,
  SearchRoutingProfilesError,
  Creds | HttpClient.HttpClient,
  RoutingProfile
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-routing-profiles",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_RoutingProfileSearchCriteria,
    },
    output: { RoutingProfiles: D.list(o_RoutingProfile) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRoutingProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingProfiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchRulesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches rules in an Connect Customer instance, with optional filtering.
 */
export const searchRules: API.PaginatedOperationMethod<
  SearchRulesRequest,
  SearchRulesResponse,
  SearchRulesError,
  Creds | HttpClient.HttpClient,
  RuleSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-rules",
    input: {
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      SearchCriteria: i_RulesSearchCriteria,
      SearchFilter: {
        AttributeFilter: {
          OrConditions: D.list(i_RuleAttributeAndCondition),
          AndCondition: i_RuleAttributeAndCondition,
          TagCondition: i_TagCondition,
        },
      },
    },
    output: { Rules: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchSecurityProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches security profiles in an Connect Customer instance, with optional filtering.
 *
 * For information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const searchSecurityProfiles: API.PaginatedOperationMethod<
  SearchSecurityProfilesRequest,
  SearchSecurityProfilesResponse,
  SearchSecurityProfilesError,
  Creds | HttpClient.HttpClient,
  SecurityProfileSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-security-profiles",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchCriteria: i_SecurityProfileSearchCriteria,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSecurityProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityProfiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTestCasesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for test cases in the specified Amazon Connect instance, with optional filtering.
 */
export const searchTestCases: API.PaginatedOperationMethod<
  SearchTestCasesRequest,
  SearchTestCasesResponse,
  SearchTestCasesError,
  Creds | HttpClient.HttpClient,
  TestCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-test-cases",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { TagFilter: i_ControlPlaneTagFilter },
      SearchCriteria: i_TestCaseSearchCriteria,
    },
    output: { TestCases: D.list(o_TestCase) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTestCases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TestCases",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchUserHierarchyGroupsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches UserHierarchyGroups in an Connect Customer instance, with optional filtering.
 *
 * The UserHierarchyGroup with `"LevelId": "0"` is the foundation for building levels on top of an
 * instance. It is not user-definable, nor is it visible in the UI.
 */
export const searchUserHierarchyGroups: API.PaginatedOperationMethod<
  SearchUserHierarchyGroupsRequest,
  SearchUserHierarchyGroupsResponse,
  SearchUserHierarchyGroupsError,
  Creds | HttpClient.HttpClient,
  HierarchyGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-user-hierarchy-groups",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_UserHierarchyGroupSearchCriteria,
    },
    output: { UserHierarchyGroups: D.list(o_HierarchyGroup) },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUserHierarchyGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserHierarchyGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchUsersError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches users in an Connect Customer instance, with optional filtering.
 *
 * `AfterContactWorkTimeLimit` is returned in milliseconds.
 */
export const searchUsers: API.PaginatedOperationMethod<
  SearchUsersRequest,
  SearchUsersResponse,
  SearchUsersError,
  Creds | HttpClient.HttpClient,
  UserSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-users",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: {
        TagFilter: i_ControlPlaneTagFilter,
        UserAttributeFilter: {
          OrConditions: D.list(i_AttributeAndCondition),
          AndCondition: i_AttributeAndCondition,
          TagCondition: i_TagCondition,
          HierarchyGroupCondition: i_HierarchyGroupCondition,
        },
      },
      SearchCriteria: i_UserSearchCriteria,
    },
    output: {
      Users: D.list({
        IdentityInfo: { FirstName: D.secret, LastName: D.secret },
        PhoneConfig: o_UserPhoneConfig,
        PhoneNumberConfigs: D.list(o_PhoneNumberConfig),
      }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchViewsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches views based on name, description, or tags.
 */
export const searchViews: API.PaginatedOperationMethod<
  SearchViewsRequest,
  SearchViewsResponse,
  SearchViewsError,
  Creds | HttpClient.HttpClient,
  View
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-views",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_ViewSearchCriteria,
    },
    output: { Views: D.list(o_View) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Views",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchVocabulariesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for vocabularies within a specific Connect Customer instance using `State`,
 * `NameStartsWith`, and `LanguageCode`.
 */
export const searchVocabularies: API.PaginatedOperationMethod<
  SearchVocabulariesRequest,
  SearchVocabulariesResponse,
  SearchVocabulariesError,
  Creds | HttpClient.HttpClient,
  VocabularySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /vocabulary-summary/{InstanceId}",
    input: {
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      State: 0,
      NameStartsWith: 0,
      LanguageCode: 0,
    },
    output: { VocabularySummaryList: D.list({ LastModifiedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VocabularySummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchWorkspaceAssociationsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for workspace associations with users or routing profiles based on various criteria.
 */
export const searchWorkspaceAssociations: API.PaginatedOperationMethod<
  SearchWorkspaceAssociationsRequest,
  SearchWorkspaceAssociationsResponse,
  SearchWorkspaceAssociationsError,
  Creds | HttpClient.HttpClient,
  WorkspaceAssociationSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-workspace-associations",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_WorkspaceAssociationSearchCriteria,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchWorkspaceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkspaceAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchWorkspacesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches workspaces based on name, description, visibility, or tags.
 */
export const searchWorkspaces: API.PaginatedOperationMethod<
  SearchWorkspacesRequest,
  SearchWorkspacesResponse,
  SearchWorkspacesError,
  Creds | HttpClient.HttpClient,
  WorkspaceSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-workspaces",
    input: {
      InstanceId: 0,
      NextToken: 0,
      MaxResults: 0,
      SearchFilter: { AttributeFilter: i_ControlPlaneAttributeFilter },
      SearchCriteria: i_WorkspaceSearchCriteria,
    },
    output: { Workspaces: D.list({ CreatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workspaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SendChatIntegrationEventError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Processes chat integration events from Amazon Web Services or external integrations to Connect Customer. A chat
 * integration event includes:
 *
 * - SourceId, DestinationId, and Subtype: a set of identifiers, uniquely representing a chat
 *
 * - ChatEvent: details of the chat action to perform such as sending a message, event, or disconnecting from a
 * chat
 *
 * When a chat integration event is sent with chat identifiers that do not map to an active chat contact, a new
 * chat contact is also created before handling chat action.
 *
 * Access to this API is currently restricted to Amazon Web Services End User Messaging for supporting SMS
 * integration.
 */
export const sendChatIntegrationEvent: API.OperationMethod<
  SendChatIntegrationEventRequest,
  SendChatIntegrationEventResponse,
  SendChatIntegrationEventError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /chat-integration-event",
    input: {
      SourceId: 0,
      DestinationId: 0,
      Subtype: 0,
      Event: { Type: 0, ContentType: 0, Content: 0 },
      NewSessionDetails: {
        SupportedMessagingContentTypes: 0,
        ParticipantDetails: i_ParticipantDetails,
        Attributes: 0,
        StreamingConfiguration: i_ChatStreamingConfiguration,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendChatIntegrationEvent",
})) as any;

export type SendOutboundEmailError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Send outbound email for outbound campaigns. For more information about outbound campaigns, see Set up Connect Customer
 * outbound campaigns.
 *
 * Only the Connect Customer outbound campaigns service principal is allowed to assume a role in your account
 * and call this API.
 */
export const sendOutboundEmail: API.OperationMethod<
  SendOutboundEmailRequest,
  SendOutboundEmailResponse,
  SendOutboundEmailError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /instance/{InstanceId}/outbound-email",
    input: {
      InstanceId: 0,
      FromEmailAddress: i_EmailAddressInfo,
      DestinationEmailAddress: i_EmailAddressInfo,
      AdditionalRecipients: i_OutboundAdditionalRecipients,
      EmailMessage: i_OutboundEmailContent,
      TrafficType: 0,
      SourceCampaign: i_SourceCampaign,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendOutboundEmail",
})) as any;

export type SendOutboundWebNotificationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sends an outbound web notification to a customer's web browser for outbound campaigns. For more information
 * about outbound campaigns, see Set up Connect Customer outbound
 * campaigns.
 *
 * Only the Connect Customer outbound campaigns service principal is allowed to assume a role in your account
 * and call this API.
 */
export const sendOutboundWebNotification: API.OperationMethod<
  SendOutboundWebNotificationRequest,
  SendOutboundWebNotificationResponse,
  SendOutboundWebNotificationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/outbound-web-notification",
    input: {
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
      BrowserId: 0,
      SessionId: 0,
      ExpiresAt: 0,
      Source: { SourceCampaign: i_SourceCampaign },
      Destination: { WidgetId: 0, ProfileId: 0 },
      Content: {
        Type: 0,
        ViewArn: 0,
        Attributes: {
          RecommenderConfig: { DomainName: 0, RecommenderName: 0, Context: 0 },
        },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendOutboundWebNotification",
})) as any;

export type StartAssistantContactError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a chat contact with an AI agent.
 *
 * Use the returned `ParticipantToken` with the CreateParticipantConnection operation.
 *
 * For more information about chat, see the following topics in the Connect Customer
 * Administrator Guide:
 *
 * - Concepts: Web and mobile messaging capabilities in Connect Customer
 *
 * - Connect Customer Chat security best practices
 */
export const startAssistantContact: API.OperationMethod<
  StartAssistantContactRequest,
  StartAssistantContactResponse,
  StartAssistantContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/assistant",
    input: {
      InstanceId: 0,
      AiAgent: { AiAgentId: 0 },
      ParticipantDetails: i_ParticipantDetails,
      InitialMessage: i_ChatMessage,
      Attributes: 0,
      ClientToken: D.m({ idempotency: true }),
      PersistentChat: i_PersistentChat,
      RelatedContactId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssistantContact",
})) as any;

export type StartAttachedFileUploadError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a pre-signed Amazon S3 URL in response for uploading your content.
 *
 * You may only use this API to upload attachments to a Connect Customer Case, Connect Customer Email, or
 * Connect Customer Task.
 */
export const startAttachedFileUpload: API.OperationMethod<
  StartAttachedFileUploadRequest,
  StartAttachedFileUploadResponse,
  StartAttachedFileUploadError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /attached-files/{InstanceId}",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      FileName: 0,
      FileSizeInBytes: 0,
      UrlExpiryInSeconds: 0,
      FileUseCaseType: 0,
      AssociatedResourceArn: D.m({ query: "associatedResourceArn" }),
      CreatedBy: { ConnectUserArn: 0, AWSIdentityArn: 0 },
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAttachedFileUpload",
})) as any;

export type StartChatContactError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates a flow to start a new chat for the customer. Response of this API provides a token required to obtain
 * credentials from the CreateParticipantConnection API in the Connect Customer Participant Service.
 *
 * When a new chat contact is successfully created, clients must subscribe to the participant’s connection for the
 * created chat within 5 minutes. This is achieved by invoking CreateParticipantConnection with WEBSOCKET and CONNECTION_CREDENTIALS.
 *
 * A 429 error occurs in the following situations:
 *
 * - API rate limit is exceeded. API TPS throttling returns a `TooManyRequests` exception.
 *
 * - The quota for
 * concurrent active chats is exceeded. Active chat throttling returns a
 * `LimitExceededException`.
 *
 * If you use the `ChatDurationInMinutes` parameter and receive a 400 error, your account may not
 * support the ability to configure custom chat durations. For more information, contact Amazon Web Services Support.
 *
 * For more information about chat, see the following topics in the Connect Customer
 * Administrator Guide:
 *
 * - Concepts: Web and mobile messaging capabilities in Connect Customer
 *
 * - Connect Customer Chat security best practices
 */
export const startChatContact: API.OperationMethod<
  StartChatContactRequest,
  StartChatContactResponse,
  StartChatContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/chat",
    input: {
      InstanceId: 0,
      ContactFlowId: 0,
      Attributes: 0,
      ParticipantDetails: i_ParticipantDetails,
      ParticipantConfiguration: { ResponseMode: 0 },
      InitialMessage: i_ChatMessage,
      ClientToken: D.m({ idempotency: true }),
      ChatDurationInMinutes: 0,
      SupportedMessagingContentTypes: 0,
      PersistentChat: i_PersistentChat,
      RelatedContactId: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      CustomerId: 0,
      DisconnectOnCustomerExit: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChatContact",
})) as any;

export type StartContactConversationalAnalyticsJobError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a Contact Lens post-call analytics job for the specified contact. This API runs Conversational
 * Analytics post-contact analysis on a voice recording that is already attached to the contact, generating
 * transcription, sentiment analysis, redaction, and summarization results based on the provided configuration.
 *
 * A voice recording must already be attached to the contact before calling this API. Use
 * `CreateAttachedFile` to attach a recording from an S3 source URI.
 *
 * For example, you can call `CreateContact`, then `CreateAttachedFile`, then
 * `StartContactConversationalAnalyticsJob` to create a contact, attach a recording, and
 * run post-call analytics.
 */
export const startContactConversationalAnalyticsJob: API.OperationMethod<
  StartContactConversationalAnalyticsJobRequest,
  StartContactConversationalAnalyticsJobResponse,
  StartContactConversationalAnalyticsJobError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/start-conversational-analytics-job/{InstanceId}/{ContactId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      AnalyticsModes: 0,
      AnalyticsConfiguration: {
        LanguageConfiguration: { LanguageLocale: 0 },
        RedactionConfiguration: {
          Behavior: 0,
          Policy: 0,
          Entities: 0,
          MaskMode: 0,
        },
        SentimentConfiguration: { Behavior: 0 },
        SummaryConfiguration: { SummaryModes: 0 },
        RulesConfiguration: { Behavior: 0 },
      },
      ClientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContactConversationalAnalyticsJob",
})) as any;

export type StartContactEvaluationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an empty evaluation in the specified Connect Customer instance, using the given evaluation form for the
 * particular contact. The evaluation form version used for the contact evaluation corresponds to the currently
 * activated version. If no version is activated for the evaluation form, the contact evaluation cannot be started.
 *
 * Evaluations created through the public API do not contain answer values suggested from automation.
 */
export const startContactEvaluation: API.OperationMethod<
  StartContactEvaluationRequest,
  StartContactEvaluationResponse,
  StartContactEvaluationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact-evaluations/{InstanceId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      EvaluationFormId: 0,
      AutoEvaluationConfiguration: { Enabled: 0 },
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContactEvaluation",
})) as any;

export type StartContactMediaProcessingError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Enables in-flight message processing for an ongoing chat session. Message processing will stay active for the
 * rest of the chat, even if an individual contact segment ends.
 */
export const startContactMediaProcessing: API.OperationMethod<
  StartContactMediaProcessingRequest,
  StartContactMediaProcessingResponse,
  StartContactMediaProcessingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/start-contact-media-processing",
    input: { InstanceId: 0, ContactId: 0, ProcessorArn: 0, FailureMode: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContactMediaProcessing",
})) as any;

export type StartContactRecordingError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts recording the contact:
 *
 * - If the API is called *before* the agent joins the call, recording starts when the agent
 * joins the call.
 *
 * - If the API is called *after* the agent joins the call, recording starts at the time of the
 * API call.
 *
 * StartContactRecording is a one-time action. For example, if you use StopContactRecording to stop recording an
 * ongoing call, you can't use StartContactRecording to restart it. For scenarios where the recording has started and
 * you want to suspend and resume it, such as when collecting sensitive information (for example, a credit card number),
 * use SuspendContactRecording and ResumeContactRecording.
 *
 * You can use this API to override the recording behavior configured in the Set recording behavior block.
 *
 * Only voice recordings are supported at this time.
 */
export const startContactRecording: API.OperationMethod<
  StartContactRecordingRequest,
  StartContactRecordingResponse,
  StartContactRecordingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/start-recording",
    input: {
      InstanceId: 0,
      ContactId: 0,
      InitialContactId: 0,
      VoiceRecordingConfiguration: {
        VoiceRecordingTrack: 0,
        IvrRecordingTrack: 0,
      },
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContactRecording",
})) as any;

export type StartContactStreamingError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates real-time message streaming for a new chat contact.
 *
 * For more information about message streaming, see Enable real-time chat message streaming in the
 * *Connect Customer Administrator Guide*.
 *
 * For more information about chat, see the following topics in the Connect Customer
 * Administrator Guide:
 *
 * - Concepts: Web and mobile messaging capabilities in Connect Customer
 *
 * - Connect Customer Chat security best practices
 */
export const startContactStreaming: API.OperationMethod<
  StartContactStreamingRequest,
  StartContactStreamingResponse,
  StartContactStreamingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/start-streaming",
    input: {
      InstanceId: 0,
      ContactId: 0,
      ChatStreamingConfiguration: i_ChatStreamingConfiguration,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContactStreaming",
})) as any;

export type StartEmailContactError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an inbound email contact and initiates a flow to start the email contact for the customer. Response of
 * this API provides the ContactId of the email contact created.
 */
export const startEmailContact: API.OperationMethod<
  StartEmailContactRequest,
  StartEmailContactResponse,
  StartEmailContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/email",
    input: {
      InstanceId: 0,
      FromEmailAddress: i_EmailAddressInfo,
      DestinationEmailAddress: 0,
      Description: 0,
      References: D.map(i_Reference),
      Name: 0,
      EmailMessage: {
        MessageSourceType: 0,
        RawMessage: { Subject: 0, Body: 0, ContentType: 0, Headers: 0 },
      },
      AdditionalRecipients: {
        ToAddresses: D.list(i_EmailAddressInfo),
        CcAddresses: D.list(i_EmailAddressInfo),
      },
      Attachments: D.list({ FileName: 0, S3Url: 0 }),
      ContactFlowId: 0,
      RelatedContactId: 0,
      Attributes: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEmailContact",
})) as any;

export type StartEvaluationFormValidationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an asynchronous validation process for an evaluation form version in the specified Connect Customer
 * instance. The validation first performs structural checks on the form content (such as verifying required fields,
 * valid scoring configuration, and correct conditional logic), then asynchronously analyzes questions configured for
 * generative AI evaluation against a set of best practices. Use GetEvaluationFormValidation to
 * retrieve the status and results once the validation completes.
 */
export const startEvaluationFormValidation: API.OperationMethod<
  StartEvaluationFormValidationRequest,
  StartEvaluationFormValidationResponse,
  StartEvaluationFormValidationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluation-forms/{InstanceId}/{EvaluationFormId}/validate",
    input: { InstanceId: 0, EvaluationFormId: 0, EvaluationFormVersion: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEvaluationFormValidation",
})) as any;

export type StartOutboundChatContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a new outbound SMS or WhatsApp contact to a customer. Response of this API provides the
 * `ContactId` of the outbound SMS or WhatsApp contact created.
 *
 * **SourceEndpoint** only supports Endpoints with
 * `CONNECT_PHONENUMBER_ARN` as Type and **DestinationEndpoint** only supports
 * Endpoints with `TELEPHONE_NUMBER` as Type. **ContactFlowId** initiates the
 * flow to manage the new contact created.
 *
 * This API can be used to initiate outbound SMS or WhatsApp contacts for an agent, or it can also deflect
 * an ongoing contact to an outbound SMS or WhatsApp contact by using the StartOutboundChatContact Flow
 * Action.
 *
 * For more information about using SMS or WhatsApp in Connect Customer, see the following topics in
 * the *Connect Customer Administrator Guide*:
 *
 * - Set up SMS
 * messaging
 *
 * - Request an SMS-enabled phone
 * number through Amazon Web Services End User Messaging SMS
 *
 * - Set up WhatsApp
 * Business messaging
 */
export const startOutboundChatContact: API.OperationMethod<
  StartOutboundChatContactRequest,
  StartOutboundChatContactResponse,
  StartOutboundChatContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/outbound-chat",
    input: {
      SourceEndpoint: i_Endpoint,
      DestinationEndpoint: i_Endpoint,
      InstanceId: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      Attributes: 0,
      ContactFlowId: 0,
      ChatDurationInMinutes: 0,
      ParticipantDetails: i_ParticipantDetails,
      InitialSystemMessage: i_ChatMessage,
      InitialTemplatedSystemMessage: i_TemplatedMessageConfig,
      RelatedContactId: 0,
      SupportedMessagingContentTypes: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOutboundChatContact",
})) as any;

export type StartOutboundEmailContactError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a flow to send an agent reply or outbound email contact (created from the CreateContact API) to a
 * customer.
 */
export const startOutboundEmailContact: API.OperationMethod<
  StartOutboundEmailContactRequest,
  StartOutboundEmailContactResponse,
  StartOutboundEmailContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/outbound-email",
    input: {
      InstanceId: 0,
      ContactId: 0,
      FromEmailAddress: i_EmailAddressInfo,
      DestinationEmailAddress: i_EmailAddressInfo,
      AdditionalRecipients: i_OutboundAdditionalRecipients,
      EmailMessage: i_OutboundEmailContent,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOutboundEmailContact",
})) as any;

export type StartOutboundVoiceContactError =
  | DestinationNotAllowedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | OutboundContactNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Places an outbound call to a contact, and then initiates the flow. It performs the actions in the flow that's
 * specified (in `ContactFlowId`).
 *
 * Agents do not initiate the outbound API, which means that they do not dial the contact. If the flow places an
 * outbound call to a contact, and then puts the contact in queue, the call is then routed to the agent, like any other
 * inbound case.
 *
 * Dialing timeout for this operation can be configured with the “RingTimeoutInSeconds” parameter. If not
 * specified, the default dialing timeout will be 60 seconds which means if the call is not connected within 60 seconds,
 * it fails.
 *
 * UK numbers with a 447 prefix are not allowed by default. Before you can dial these UK mobile numbers, you must
 * submit a service quota increase request. For more information, see Connect Customer Service Quotas in the
 * *Connect Customer Administrator Guide*.
 *
 * Campaign calls are not allowed by default. Before you can make a call with `TrafficType` =
 * `CAMPAIGN`, you must submit a service quota increase request to the quota Connect Customer campaigns.
 *
 * For Preview dialing mode, only the Amazon Connect outbound campaigns service principal is allowed to assume a
 * role in your account and call this API with OutboundStrategy.
 */
export const startOutboundVoiceContact: API.OperationMethod<
  StartOutboundVoiceContactRequest,
  StartOutboundVoiceContactResponse,
  StartOutboundVoiceContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/outbound-voice",
    input: {
      Name: 0,
      Description: 0,
      References: D.map(i_Reference),
      RelatedContactId: 0,
      DestinationPhoneNumber: 0,
      ContactFlowId: 0,
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
      SourcePhoneNumber: 0,
      QueueId: 0,
      Attributes: 0,
      AnswerMachineDetectionConfig: {
        EnableAnswerMachineDetection: 0,
        AwaitAnswerMachinePrompt: 0,
      },
      CampaignId: 0,
      TrafficType: 0,
      OutboundStrategy: i_OutboundStrategy,
      RingTimeoutInSeconds: 0,
    },
    body: true,
  },
  errors: [
    DestinationNotAllowedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    OutboundContactNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOutboundVoiceContact",
})) as any;

export type StartScreenSharingError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts screen sharing for a contact. For more information about screen sharing, see Set up in-app, web, video calling, and screen sharing
 * capabilities in the *Connect Customer Administrator Guide*.
 */
export const startScreenSharing: API.OperationMethod<
  StartScreenSharingRequest,
  StartScreenSharingResponse,
  StartScreenSharingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/screen-sharing",
    input: {
      ClientToken: D.m({ idempotency: true }),
      InstanceId: 0,
      ContactId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartScreenSharing",
})) as any;

export type StartTaskContactError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a flow to start a new task contact. For more information about task contacts, see Concepts: Tasks in Connect Customer in the
 * *Connect Customer Administrator Guide*.
 *
 * When using `PreviousContactId` and `RelatedContactId` input parameters, note the
 * following:
 *
 * - `PreviousContactId`
 *
 * - Any updates to user-defined task contact attributes on any contact linked through the same
 * `PreviousContactId` will affect every contact in the chain.
 *
 * - There can be a maximum of 12 linked task contacts in a chain. That is, 12 task contacts can be created that
 * share the same `PreviousContactId`.
 *
 * - `RelatedContactId`
 *
 * - Copies contact attributes from the related task contact to the new contact.
 *
 * - Any update on attributes in a new task contact does not update attributes on previous contact.
 *
 * - There’s no limit on the number of task contacts that can be created that use the same
 * `RelatedContactId`.
 *
 * In addition, when calling StartTaskContact include only one of these parameters: `ContactFlowID`,
 * `QuickConnectID`, or `TaskTemplateID`. Only one parameter is required as long as the task
 * template has a flow configured to run it. If more than one parameter is specified, or only the
 * `TaskTemplateID` is specified but it does not have a flow configured, the request returns an error
 * because Connect Customer cannot identify the unique flow to run when the task is created.
 *
 * A `ServiceQuotaExceededException` occurs when the number of open tasks exceeds the active tasks quota
 * or there are already 12 tasks referencing the same `PreviousContactId`. For more information about service
 * quotas for task contacts, see Connect Customer service quotas in the
 * *Connect Customer Administrator Guide*.
 */
export const startTaskContact: API.OperationMethod<
  StartTaskContactRequest,
  StartTaskContactResponse,
  StartTaskContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/task",
    input: {
      InstanceId: 0,
      PreviousContactId: 0,
      ContactFlowId: 0,
      Attributes: 0,
      Name: 0,
      References: D.map(i_Reference),
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
      ScheduledTime: 0,
      TaskTemplateId: 0,
      QuickConnectId: 0,
      RelatedContactId: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      Attachments: D.list({ FileName: 0, S3Url: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTaskContact",
})) as any;

export type StartTestCaseExecutionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts executing a published test case.
 */
export const startTestCaseExecution: API.OperationMethod<
  StartTestCaseExecutionRequest,
  StartTestCaseExecutionResponse,
  StartTestCaseExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /test-cases/{InstanceId}/{TestCaseId}/start-execution",
    input: {
      InstanceId: 0,
      TestCaseId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestCaseExecution",
})) as any;

export type StartWebRTCContactError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Places an inbound in-app, web, or video call to a contact, and then initiates the flow. It performs the actions
 * in the flow that are specified (in ContactFlowId) and present in the Connect Customer instance (specified as
 * InstanceId).
 */
export const startWebRTCContact: API.OperationMethod<
  StartWebRTCContactRequest,
  StartWebRTCContactResponse,
  StartWebRTCContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/webrtc",
    input: {
      Attributes: 0,
      ClientToken: D.m({ idempotency: true }),
      ContactFlowId: 0,
      InstanceId: 0,
      AllowedCapabilities: {
        Customer: i_ParticipantCapabilities,
        Agent: i_ParticipantCapabilities,
      },
      ParticipantDetails: i_ParticipantDetails,
      RelatedContactId: 0,
      References: D.map(i_Reference),
      Description: 0,
      SegmentAttributes: D.map(i_SegmentAttributeValue),
    },
    output: { ConnectionData: { Attendee: { JoinToken: D.secret } } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWebRTCContact",
})) as any;

export type StopContactError =
  | ContactNotFoundException
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Ends the specified contact. Use this API to stop queued callbacks. It does not work for voice contacts that use
 * the following initiation methods:
 *
 * - DISCONNECT
 *
 * - TRANSFER
 *
 * - QUEUE_TRANSFER
 *
 * - EXTERNAL_OUTBOUND
 *
 * - MONITOR
 *
 * Chat and task contacts can be terminated in any state, regardless of initiation method.
 */
export const stopContact: API.OperationMethod<
  StopContactRequest,
  StopContactResponse,
  StopContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/stop",
    input: { ContactId: 0, InstanceId: 0, DisconnectReason: { Code: 0 } },
    body: true,
  },
  errors: [
    ContactNotFoundException,
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContact",
})) as any;

export type StopContactMediaProcessingError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops in-flight message processing for an ongoing chat session.
 */
export const stopContactMediaProcessing: API.OperationMethod<
  StopContactMediaProcessingRequest,
  StopContactMediaProcessingResponse,
  StopContactMediaProcessingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/stop-contact-media-processing",
    input: { InstanceId: 0, ContactId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContactMediaProcessing",
})) as any;

export type StopContactRecordingError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops recording a call when a contact is being recorded. StopContactRecording is a one-time action. If you use
 * StopContactRecording to stop recording an ongoing call, you can't use StartContactRecording to restart it. For
 * scenarios where the recording has started and you want to suspend it for sensitive information (for example, to
 * collect a credit card number), and then restart it, use SuspendContactRecording and ResumeContactRecording.
 *
 * Only voice recordings are supported at this time.
 */
export const stopContactRecording: API.OperationMethod<
  StopContactRecordingRequest,
  StopContactRecordingResponse,
  StopContactRecordingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/stop-recording",
    input: {
      InstanceId: 0,
      ContactId: 0,
      InitialContactId: 0,
      ContactRecordingType: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContactRecording",
})) as any;

export type StopContactStreamingError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Ends message streaming on a specified contact. To restart message streaming on that contact, call the StartContactStreaming
 * API.
 */
export const stopContactStreaming: API.OperationMethod<
  StopContactStreamingRequest,
  StopContactStreamingResponse,
  StopContactStreamingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/stop-streaming",
    input: { InstanceId: 0, ContactId: 0, StreamingId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContactStreaming",
})) as any;

export type StopTestCaseExecutionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Stops a running test execution.
 */
export const stopTestCaseExecution: API.OperationMethod<
  StopTestCaseExecutionRequest,
  StopTestCaseExecutionResponse,
  StopTestCaseExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /test-cases/{InstanceId}/{TestCaseId}/{TestCaseExecutionId}/stop-execution",
    input: {
      InstanceId: 0,
      TestCaseExecutionId: 0,
      TestCaseId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTestCaseExecution",
})) as any;

export type SubmitContactEvaluationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Submits a contact evaluation in the specified Connect Customer instance. Answers included in the request are
 * merged with existing answers for the given evaluation. If no answers or notes are passed, the evaluation is submitted
 * with the existing answers and notes. You can delete an answer or note by passing an empty object (`{}`) to
 * the question identifier.
 *
 * If a contact evaluation is already in submitted state, this operation will trigger a resubmission.
 */
export const submitContactEvaluation: API.OperationMethod<
  SubmitContactEvaluationRequest,
  SubmitContactEvaluationResponse,
  SubmitContactEvaluationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-evaluations/{InstanceId}/{EvaluationId}/submit",
    input: {
      InstanceId: 0,
      EvaluationId: 0,
      Answers: D.map(i_EvaluationAnswerInput),
      Notes: D.map(i_EvaluationNote),
      SubmittedBy: i_EvaluatorUserUnion,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitContactEvaluation",
})) as any;

export type SuspendContactRecordingError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * When a contact is being recorded, this API suspends recording whatever is selected in the flow configuration:
 * call (IVR or agent), screen, or both. If only call recording or only screen recording is enabled, then it would be
 * suspended. For example, you might suspend the screen recording while collecting sensitive information, such as a
 * credit card number. Then use ResumeContactRecording to restart
 * recording the screen.
 *
 * The period of time that the recording is suspended is filled with silence in the final recording.
 *
 * Voice (IVR, agent) and screen recordings are supported.
 */
export const suspendContactRecording: API.OperationMethod<
  SuspendContactRecordingRequest,
  SuspendContactRecordingResponse,
  SuspendContactRecordingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/suspend-recording",
    input: {
      InstanceId: 0,
      ContactId: 0,
      InitialContactId: 0,
      ContactRecordingType: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendContactRecording",
})) as any;

export type TagContactError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds the specified tags to the contact resource. For more information about this API is used, see Set up granular billing for a detailed
 * view of your Connect Customer usage.
 */
export const tagContact: API.OperationMethod<
  TagContactRequest,
  TagContactResponse,
  TagContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/tags",
    input: { ContactId: 0, InstanceId: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagContact",
})) as any;

export type TagResourceError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 *
 * Some of the supported resource types are agents, routing profiles, queues, quick connects, flows, agent
 * statuses, hours of operation, phone numbers, security profiles, task templates, and custom metrics. For a complete list, see Tagging resources in Connect Customer.
 *
 * For sample policies that use tags, see Connect Customer Identity-Based Policy
 * Examples in the *Connect Customer Administrator Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TransferContactError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Transfers `TASK` or `EMAIL`
 * contacts from one agent or queue to another agent or queue at any point after a contact is
 * created. You can transfer a contact to another queue by providing the flow which orchestrates the contact to the
 * destination queue. This gives you more control over contact handling and helps you adhere to the service level
 * agreement (SLA) guaranteed to your customers.
 *
 * Note the following requirements:
 *
 * - Transfer is only supported for `TASK` and `EMAIL` contacts.
 *
 * - Do not use both `QueueId` and `UserId` in the same call.
 *
 * - The following flow types are supported: Inbound flow, Transfer to agent flow, and Transfer to queue
 * flow.
 *
 * - The `TransferContact` API can be called only on active contacts.
 *
 * - A contact cannot be transferred more than 11 times.
 */
export const transferContact: API.OperationMethod<
  TransferContactRequest,
  TransferContactResponse,
  TransferContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/transfer",
    input: {
      InstanceId: 0,
      ContactId: 0,
      QueueId: 0,
      UserId: 0,
      ContactFlowId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferContact",
})) as any;

export type UntagContactError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified tags from the contact resource. For more information about this API is used, see Set up granular billing for a detailed
 * view of your Connect Customer usage.
 */
export const untagContact: API.OperationMethod<
  UntagContactRequest,
  UntagContactResponse,
  UntagContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /contact/tags/{InstanceId}/{ContactId}",
    input: { ContactId: 0, InstanceId: 0, TagKeys: D.m({ query: "TagKeys" }) },
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagContact",
})) as any;

export type UntagResourceError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAgentStatusError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates agent status.
 */
export const updateAgentStatus: API.OperationMethod<
  UpdateAgentStatusRequest,
  UpdateAgentStatusResponse,
  UpdateAgentStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agent-status/{InstanceId}/{AgentStatusId}",
    input: {
      InstanceId: 0,
      AgentStatusId: 0,
      Name: 0,
      Description: 0,
      State: 0,
      DisplayOrder: 0,
      ResetOrderNumber: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentStatus",
})) as any;

export type UpdateAttachedFilesConfigurationError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the attached files configuration for the specified Connect Customer instance and attachment scope.
 *
 * If no instance-specific configuration exists, this operation creates one. Partial updates are supported—only specified fields are updated, while unspecified fields retain their current values.
 */
export const updateAttachedFilesConfiguration: API.OperationMethod<
  UpdateAttachedFilesConfigurationRequest,
  UpdateAttachedFilesConfigurationResponse,
  UpdateAttachedFilesConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attached-files-configurations/{InstanceId}/{AttachmentScope}",
    input: {
      InstanceId: 0,
      AttachmentScope: 0,
      MaximumSizeLimitInBytes: 0,
      ExtensionConfiguration: { AllowedExtensions: D.list({ Extension: 0 }) },
    },
    output: { LastModifiedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAttachedFilesConfiguration",
})) as any;

export type UpdateAuthenticationProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change. To
 * request access to this API, contact Amazon Web Services Support.
 *
 * Updates the selected authentication profile.
 */
export const updateAuthenticationProfile: API.OperationMethod<
  UpdateAuthenticationProfileRequest,
  UpdateAuthenticationProfileResponse,
  UpdateAuthenticationProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /authentication-profiles/{InstanceId}/{AuthenticationProfileId}",
    input: {
      AuthenticationProfileId: 0,
      InstanceId: 0,
      Name: 0,
      Description: 0,
      AllowedIps: 0,
      BlockedIps: 0,
      PeriodicSessionDuration: 0,
      SessionInactivityDuration: 0,
      SessionInactivityHandlingEnabled: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthenticationProfile",
})) as any;

export type UpdateContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Adds or updates user-defined contact information associated with the specified contact. At least one field to be
 * updated must be present in the request.
 *
 * You can add or update user-defined contact information for both ongoing and completed contacts.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateContactError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contacts/{InstanceId}/{ContactId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      Name: 0,
      Description: 0,
      References: D.map(i_Reference),
      SegmentAttributes: D.map(i_SegmentAttributeValue),
      QueueInfo: { Id: 0 },
      UserInfo: i_UserInfo,
      CustomerEndpoint: i_Endpoint,
      SystemEndpoint: i_Endpoint,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
})) as any;

export type UpdateContactAttributesError =
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates or updates user-defined contact
 * attributes associated with the specified contact.
 *
 * You can create or update user-defined attributes for both ongoing and completed contacts. For example, while the
 * call is active, you can update the customer's name or the reason the customer called. You can add notes about steps
 * that the agent took during the call that display to the next agent that takes the call. You can also update
 * attributes for a contact using data from your CRM application and save the data with the contact in Connect Customer. You could also flag calls for additional analysis, such as legal review or to identify abusive callers.
 *
 * Contact attributes are available in Connect Customer for 24 months, and are then deleted. For information
 * about contact record retention and the maximum size of the contact record attributes section, see Feature
 * specifications in the *Connect Customer Administrator Guide*.
 */
export const updateContactAttributes: API.OperationMethod<
  UpdateContactAttributesRequest,
  UpdateContactAttributesResponse,
  UpdateContactAttributesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/attributes",
    input: { InitialContactId: 0, InstanceId: 0, Attributes: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactAttributes",
})) as any;

export type UpdateContactEvaluationError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates details about a contact evaluation in the specified Connect Customer instance. A contact evaluation
 * must be in draft state. Answers included in the request are merged with existing answers for the given evaluation. An
 * answer or note can be deleted by passing an empty object (`{}`) to the question identifier.
 */
export const updateContactEvaluation: API.OperationMethod<
  UpdateContactEvaluationRequest,
  UpdateContactEvaluationResponse,
  UpdateContactEvaluationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-evaluations/{InstanceId}/{EvaluationId}",
    input: {
      InstanceId: 0,
      EvaluationId: 0,
      Answers: D.map(i_EvaluationAnswerInput),
      Notes: D.map(i_EvaluationNote),
      UpdatedBy: i_EvaluatorUserUnion,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactEvaluation",
})) as any;

export type UpdateContactFlowContentError =
  | InternalServiceException
  | InvalidContactFlowException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the specified flow.
 *
 * You can also create and update flows using the Connect Customer
 * Flow language.
 *
 * Use the `$SAVED` alias in the request to describe the `SAVED` content of a Flow. For
 * example, `arn:aws:.../contact-flow/{id}:$SAVED`. After a flow is published, `$SAVED` needs to
 * be supplied to view saved content that has not been published.
 */
export const updateContactFlowContent: API.OperationMethod<
  UpdateContactFlowContentRequest,
  UpdateContactFlowContentResponse,
  UpdateContactFlowContentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flows/{InstanceId}/{ContactFlowId}/content",
    input: { InstanceId: 0, ContactFlowId: 0, Content: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidContactFlowException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowContent",
})) as any;

export type UpdateContactFlowMetadataError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates metadata about specified flow.
 */
export const updateContactFlowMetadata: API.OperationMethod<
  UpdateContactFlowMetadataRequest,
  UpdateContactFlowMetadataResponse,
  UpdateContactFlowMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flows/{InstanceId}/{ContactFlowId}/metadata",
    input: {
      InstanceId: 0,
      ContactFlowId: 0,
      Name: 0,
      Description: 0,
      ContactFlowState: 0,
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowMetadata",
})) as any;

export type UpdateContactFlowModuleAliasError =
  | AccessDeniedException
  | ConditionalOperationFailedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a specific Aliases metadata, including the version it’s tied to, it’s name, and description.
 */
export const updateContactFlowModuleAlias: API.OperationMethod<
  UpdateContactFlowModuleAliasRequest,
  UpdateContactFlowModuleAliasResponse,
  UpdateContactFlowModuleAliasError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/alias/{AliasId}",
    input: {
      InstanceId: 0,
      ContactFlowModuleId: 0,
      AliasId: 0,
      Name: 0,
      Description: 0,
      ContactFlowModuleVersion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConditionalOperationFailedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowModuleAlias",
})) as any;

export type UpdateContactFlowModuleContentError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidContactFlowModuleException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates specified flow module for the specified Connect Customer instance.
 *
 * Use the `$SAVED` alias in the request to describe the `SAVED` content of a Flow. For
 * example, `arn:aws:.../contact-flow/{id}:$SAVED`. After a flow is published, `$SAVED` needs to
 * be supplied to view saved content that has not been published.
 */
export const updateContactFlowModuleContent: API.OperationMethod<
  UpdateContactFlowModuleContentRequest,
  UpdateContactFlowModuleContentResponse,
  UpdateContactFlowModuleContentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/content",
    input: { InstanceId: 0, ContactFlowModuleId: 0, Content: 0, Settings: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidContactFlowModuleException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowModuleContent",
})) as any;

export type UpdateContactFlowModuleMetadataError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates metadata about specified flow module.
 */
export const updateContactFlowModuleMetadata: API.OperationMethod<
  UpdateContactFlowModuleMetadataRequest,
  UpdateContactFlowModuleMetadataResponse,
  UpdateContactFlowModuleMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flow-modules/{InstanceId}/{ContactFlowModuleId}/metadata",
    input: {
      InstanceId: 0,
      ContactFlowModuleId: 0,
      Name: 0,
      Description: 0,
      State: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowModuleMetadata",
})) as any;

export type UpdateContactFlowNameError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The name of the flow.
 *
 * You can also create and update flows using the Connect Customer
 * Flow language.
 */
export const updateContactFlowName: API.OperationMethod<
  UpdateContactFlowNameRequest,
  UpdateContactFlowNameResponse,
  UpdateContactFlowNameError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact-flows/{InstanceId}/{ContactFlowId}/name",
    input: { InstanceId: 0, ContactFlowId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactFlowName",
})) as any;

export type UpdateContactRoutingDataError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidActiveRegionException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates routing priority and age on the contact (**QueuePriority** and **QueueTimeAdjustmentInSeconds**). These properties can be used to change a customer's position
 * in the queue. For example, you can move a contact to the back of the queue by setting a lower routing priority
 * relative to other contacts in queue; or you can move a contact to the front of the queue by increasing the routing
 * age which will make the contact look artificially older and therefore higher up in the first-in-first-out routing
 * order. Note that adjusting the routing age of a contact affects only its position in queue, and not its actual queue
 * wait time as reported through metrics. These properties can also be updated by using the Set routing priority / age flow
 * block.
 *
 * Either **QueuePriority** or **QueueTimeAdjustmentInSeconds** should be provided within the request body, but not both.
 */
export const updateContactRoutingData: API.OperationMethod<
  UpdateContactRoutingDataRequest,
  UpdateContactRoutingDataResponse,
  UpdateContactRoutingDataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contacts/{InstanceId}/{ContactId}/routing-data",
    input: {
      InstanceId: 0,
      ContactId: 0,
      QueueTimeAdjustmentSeconds: 0,
      QueuePriority: 0,
      RoutingCriteria: {
        Steps: D.list({
          Expiry: { DurationInSeconds: 0 },
          Expression: i_Expression,
        }),
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidActiveRegionException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactRoutingData",
})) as any;

export type UpdateContactScheduleError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the scheduled time of a task contact that is already scheduled.
 */
export const updateContactSchedule: API.OperationMethod<
  UpdateContactScheduleRequest,
  UpdateContactScheduleResponse,
  UpdateContactScheduleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/schedule",
    input: { InstanceId: 0, ContactId: 0, ScheduledTime: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactSchedule",
})) as any;

export type UpdateContactTaskTemplateError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | PropertyValidationException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Updates the task template association on an existing task contact. You can update the task template on a contact
 * before assignment to support tasks that are created without a template (for example Rules or disconnect flows) or change the agent interaction
 * form to represent the latest task data (for example an initial request that was submitted as a refund gets updated to
 * an account cancellation and requires a new template).
 *
 * This operation can only be used with task contacts that are in progress and not connected to an agent. A task
 * template can be updated a maximum of 5 times per contact.
 *
 * The task's references must be compatible with the fields of the target task template. If the target template has
 * a required field, the task must have a corresponding reference with a matching name and compatible type. The
 * following task template field types map to reference types:
 *
 * - `TEXT`, `TEXT_AREA`, `BOOLEAN`, and `SINGLE_SELECT` map to
 * references of type `STRING`.
 *
 * - `NUMBER` maps to references of type `NUMBER`.
 *
 * - `DATE_TIME` maps to references of type `DATE`.
 *
 * - `URL` maps to references of type `URL`.
 *
 * - `EMAIL` maps to references of type `EMAIL`.
 *
 * References corresponding to `TEXT` fields must be fewer than 512 characters.
 * `TEXT_AREA` fields must be fewer than 4,096 characters. `BOOLEAN` fields must have a value
 * of `true` or `false`.
 *
 * An `InvalidRequestException` occurs when `UpdateContactTaskTemplate` is called on a
 * connected or terminated task, when it is called on non-task contacts, and when the task contact already uses the
 * provided task template. A `PropertyValidationException` occurs when the task's references conflict with
 * the task template's fields, for example if the task is missing a reference that matches a required field, or if the
 * task has a reference that matches a required field's name but not its datatype.
 */
export const updateContactTaskTemplate: API.OperationMethod<
  UpdateContactTaskTemplateRequest,
  UpdateContactTaskTemplateResponse,
  UpdateContactTaskTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/task-template",
    input: { InstanceId: 0, TaskTemplateId: 0, ContactId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    PropertyValidationException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactTaskTemplate",
})) as any;

export type UpdateDataTableAttributeError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates all properties for an attribute using all properties from CreateDataTableAttribute. There are no other
 * granular update endpoints. It does not act as a patch operation - all properties must be provided. System managed
 * attributes are not mutable by customers. Changing an attribute's validation does not invalidate existing values since
 * validation only runs when values are created or updated.
 */
export const updateDataTableAttribute: API.OperationMethod<
  UpdateDataTableAttributeRequest,
  UpdateDataTableAttributeResponse,
  UpdateDataTableAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/attributes/{AttributeName}",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      AttributeName: 0,
      Name: 0,
      ValueType: 0,
      Description: 0,
      Primary: 0,
      Validation: i_Validation,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataTableAttribute",
})) as any;

export type UpdateDataTableMetadataError =
  | AccessDeniedException
  | ConflictException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the metadata properties of a data table. Accepts all fields similar to CreateDataTable, except for
 * fields and tags. There are no other granular update endpoints. It does not act as a patch operation - all properties
 * must be provided or defaults will be used. Fields follow the same requirements as CreateDataTable.
 */
export const updateDataTableMetadata: API.OperationMethod<
  UpdateDataTableMetadataRequest,
  UpdateDataTableMetadataResponse,
  UpdateDataTableMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      Name: 0,
      Description: 0,
      ValueLockLevel: 0,
      TimeZone: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataTableMetadata",
})) as any;

export type UpdateDataTablePrimaryValuesError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the primary values for a record. This operation affects all existing values that are currently
 * associated to the record and its primary values. Users that have restrictions on attributes and/or primary values are
 * not authorized to use this endpoint. The combination of new primary values must be unique within the table.
 */
export const updateDataTablePrimaryValues: API.OperationMethod<
  UpdateDataTablePrimaryValuesRequest,
  UpdateDataTablePrimaryValuesResponse,
  UpdateDataTablePrimaryValuesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /data-tables/{InstanceId}/{DataTableId}/values/update-primary",
    input: {
      InstanceId: 0,
      DataTableId: 0,
      PrimaryValues: D.list(i_PrimaryValue),
      NewPrimaryValues: D.list(i_PrimaryValue),
      LockVersion: i_DataTableLockVersion,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataTablePrimaryValues",
})) as any;

export type UpdateEmailAddressMetadataError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an email address metadata. For more information about email addresses, see Create email addresses in the Connect Customer
 * Administrator Guide.
 */
export const updateEmailAddressMetadata: API.OperationMethod<
  UpdateEmailAddressMetadataRequest,
  UpdateEmailAddressMetadataResponse,
  UpdateEmailAddressMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /email-addresses/{InstanceId}/{EmailAddressId}",
    input: {
      InstanceId: 0,
      EmailAddressId: 0,
      Description: 0,
      DisplayName: 0,
      ClientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailAddressMetadata",
})) as any;

export type UpdateEvaluationFormError =
  | InternalServiceException
  | InvalidParameterException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates details about a specific evaluation form version in the specified Connect Customer instance. Question
 * and section identifiers cannot be duplicated within the same evaluation form.
 *
 * This operation does not support partial updates. Instead it does a full update of evaluation form
 * content.
 */
export const updateEvaluationForm: API.OperationMethod<
  UpdateEvaluationFormRequest,
  UpdateEvaluationFormResponse,
  UpdateEvaluationFormError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /evaluation-forms/{InstanceId}/{EvaluationFormId}",
    input: {
      InstanceId: 0,
      EvaluationFormId: 0,
      EvaluationFormVersion: 0,
      CreateNewVersion: 0,
      Title: 0,
      Description: 0,
      Items: D.list(i_EvaluationFormItem),
      ScoringStrategy: i_EvaluationFormScoringStrategy,
      AutoEvaluationConfiguration: i_EvaluationFormAutoEvaluationConfiguration,
      ReviewConfiguration: i_EvaluationReviewConfiguration,
      AsDraft: 0,
      ClientToken: D.m({ idempotency: true }),
      TargetConfiguration: i_EvaluationFormTargetConfiguration,
      LanguageConfiguration: i_EvaluationFormLanguageConfiguration,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEvaluationForm",
})) as any;

export type UpdateExtractionDefinitionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an extraction definition in the specified Connect Customer instance.
 */
export const updateExtractionDefinition: API.OperationMethod<
  UpdateExtractionDefinitionRequest,
  UpdateExtractionDefinitionResponse,
  UpdateExtractionDefinitionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /extraction-definitions/{InstanceId}/{ExtractionDefinitionId}",
    input: {
      ClientToken: D.m({ idempotency: true }),
      ExtractionDefinitionId: 0,
      InstanceId: 0,
      Name: 0,
      ExtractionConfiguration: i_ExtractionConfiguration,
      Display: i_ExtractionDefinitionDisplay,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtractionDefinition",
})) as any;

export type UpdateHoursOfOperationError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the hours of operation.
 */
export const updateHoursOfOperation: API.OperationMethod<
  UpdateHoursOfOperationRequest,
  UpdateHoursOfOperationResponse,
  UpdateHoursOfOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hours-of-operations/{InstanceId}/{HoursOfOperationId}",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      Name: 0,
      Description: 0,
      TimeZone: 0,
      Config: D.list(i_HoursOfOperationConfig),
    },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHoursOfOperation",
})) as any;

export type UpdateHoursOfOperationOverrideError =
  | ConditionalOperationFailedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Update the hours of operation override.
 */
export const updateHoursOfOperationOverride: API.OperationMethod<
  UpdateHoursOfOperationOverrideRequest,
  UpdateHoursOfOperationOverrideResponse,
  UpdateHoursOfOperationOverrideError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hours-of-operations/{InstanceId}/{HoursOfOperationId}/overrides/{HoursOfOperationOverrideId}",
    input: {
      InstanceId: 0,
      HoursOfOperationId: 0,
      HoursOfOperationOverrideId: 0,
      Name: 0,
      Description: 0,
      Config: D.list(i_HoursOfOperationOverrideConfig),
      EffectiveFrom: 0,
      EffectiveTill: 0,
      RecurrenceConfig: i_RecurrenceConfig,
      OverrideType: 0,
    },
    body: true,
  },
  errors: [
    ConditionalOperationFailedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHoursOfOperationOverride",
})) as any;

export type UpdateInstanceAttributeError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Updates the value for the specified attribute type.
 */
export const updateInstanceAttribute: API.OperationMethod<
  UpdateInstanceAttributeRequest,
  UpdateInstanceAttributeResponse,
  UpdateInstanceAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/attribute/{AttributeType}",
    input: {
      InstanceId: 0,
      AttributeType: 0,
      Value: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceAttribute",
})) as any;

export type UpdateInstanceStorageConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API is in preview release for Connect Customer and is subject to change.
 *
 * Updates an existing configuration for a resource type. This API is idempotent.
 */
export const updateInstanceStorageConfig: API.OperationMethod<
  UpdateInstanceStorageConfigRequest,
  UpdateInstanceStorageConfigResponse,
  UpdateInstanceStorageConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/storage-config/{AssociationId}",
    input: {
      InstanceId: 0,
      AssociationId: 0,
      ResourceType: D.m({ query: "resourceType" }),
      StorageConfig: i_InstanceStorageConfig,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceStorageConfig",
})) as any;

export type UpdateMetricContentError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the calculation, unit, and/or trend indicator of an existing metric in the specified Connect Customer instance.
 */
export const updateMetricContent: API.OperationMethod<
  UpdateMetricContentRequest,
  UpdateMetricContentResponse,
  UpdateMetricContentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/definitions/{InstanceId}/{MetricId}/content",
    input: {
      InstanceId: 0,
      MetricId: 0,
      MetricCalculation: i_MetricCalculation,
      Unit: 0,
      PositiveTrendIndicator: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMetricContent",
})) as any;

export type UpdateMetricMetadataError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and/or description of an existing metric in the specified Connect Customer instance.
 */
export const updateMetricMetadata: API.OperationMethod<
  UpdateMetricMetadataRequest,
  UpdateMetricMetadataResponse,
  UpdateMetricMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/definitions/{InstanceId}/{MetricId}/metadata",
    input: { InstanceId: 0, MetricId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMetricMetadata",
})) as any;

export type UpdateNotificationContentError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the localized content of an existing notification. This operation applies to all users for whom the notification was sent.
 */
export const updateNotificationContent: API.OperationMethod<
  UpdateNotificationContentRequest,
  UpdateNotificationContentResponse,
  UpdateNotificationContentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /notifications/{InstanceId}/{NotificationId}",
    input: { InstanceId: 0, NotificationId: 0, Content: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationContent",
})) as any;

export type UpdateParticipantAuthenticationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Instructs Connect Customer to resume the authentication process. The subsequent actions depend on the request
 * body contents:
 *
 * - **If a code is provided**: Connect retrieves the identity information from Amazon
 * Cognito and imports it into Connect Customer Profiles.
 *
 * - **If an error is provided**: The error branch of the Authenticate Customer block
 * is executed.
 *
 * The API returns a success response to acknowledge the request. However, the interaction and exchange of
 * identity information occur asynchronously after the response is returned.
 */
export const updateParticipantAuthentication: API.OperationMethod<
  UpdateParticipantAuthenticationRequest,
  UpdateParticipantAuthenticationResponse,
  UpdateParticipantAuthenticationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /contact/update-participant-authentication",
    input: { State: 0, InstanceId: 0, Code: 0, Error: 0, ErrorDescription: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParticipantAuthentication",
})) as any;

export type UpdateParticipantRoleConfigError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates timeouts for when human chat participants are to be considered idle, and when agents are automatically
 * disconnected from a chat due to idleness. You can set four timers:
 *
 * - Customer idle timeout
 *
 * - Customer auto-disconnect timeout
 *
 * - Agent idle timeout
 *
 * - Agent auto-disconnect timeout
 *
 * For more information about how chat timeouts work, see
 * Set up chat timeouts for human participants.
 */
export const updateParticipantRoleConfig: API.OperationMethod<
  UpdateParticipantRoleConfigRequest,
  UpdateParticipantRoleConfigResponse,
  UpdateParticipantRoleConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contact/participant-role-config/{InstanceId}/{ContactId}",
    input: {
      InstanceId: 0,
      ContactId: 0,
      ChannelConfiguration: {
        Chat: {
          ParticipantTimerConfigList: D.list({
            ParticipantRole: 0,
            TimerType: 0,
            TimerValue: {
              ParticipantTimerAction: 0,
              ParticipantTimerDurationInMinutes: 0,
            },
          }),
        },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParticipantRoleConfig",
})) as any;

export type UpdatePhoneNumberError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates your claimed phone number from its current Connect Customer instance or traffic distribution group to another Connect Customer instance or traffic distribution group in the same Amazon Web Services Region.
 *
 * After using this API, you must verify that the phone number is attached to the correct flow in the target
 * instance or traffic distribution group. You need to do this because the API switches only the phone number to a new
 * instance or traffic distribution group. It doesn't migrate the flow configuration of the phone number, too.
 *
 * You can call DescribePhoneNumber API to verify the status of a previous UpdatePhoneNumber operation.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  UpdatePhoneNumberError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /phone-number/{PhoneNumberId}",
    input: {
      PhoneNumberId: 0,
      TargetArn: 0,
      InstanceId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumber",
})) as any;

export type UpdatePhoneNumberMetadataError =
  | AccessDeniedException
  | IdempotencyException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a phone number’s metadata.
 *
 * To verify the status of a previous UpdatePhoneNumberMetadata operation, call the DescribePhoneNumber API.
 */
export const updatePhoneNumberMetadata: API.OperationMethod<
  UpdatePhoneNumberMetadataRequest,
  UpdatePhoneNumberMetadataResponse,
  UpdatePhoneNumberMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /phone-number/{PhoneNumberId}/metadata",
    input: {
      PhoneNumberId: 0,
      PhoneNumberDescription: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IdempotencyException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumberMetadata",
})) as any;

export type UpdatePredefinedAttributeError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a predefined attribute for the specified Connect Customer instance. A *predefined attribute* is
 * made up of a name and a value.
 *
 * For the predefined attributes per instance quota, see Connect Customer
 * quotas.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Update routing proficiency (for example, agent certification) that has predefined values (for example, a list
 * of possible certifications). For more information, see Create predefined attributes for routing contacts to
 * agents.
 *
 * - Update an attribute for business unit name that has a list of predefined business unit names used in your
 * organization. This is a use case where information for a contact varies between transfers or conferences. For more
 * information, see Use contact segment attributes.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const updatePredefinedAttribute: API.OperationMethod<
  UpdatePredefinedAttributeRequest,
  UpdatePredefinedAttributeResponse,
  UpdatePredefinedAttributeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /predefined-attributes/{InstanceId}/{Name}",
    input: {
      InstanceId: 0,
      Name: 0,
      Values: i_PredefinedAttributeValues,
      Purposes: 0,
      AttributeConfiguration: i_InputPredefinedAttributeConfiguration,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePredefinedAttribute",
})) as any;

export type UpdatePromptError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a prompt.
 */
export const updatePrompt: API.OperationMethod<
  UpdatePromptRequest,
  UpdatePromptResponse,
  UpdatePromptError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /prompts/{InstanceId}/{PromptId}",
    input: { InstanceId: 0, PromptId: 0, Name: 0, Description: 0, S3Uri: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrompt",
})) as any;

export type UpdateQueueHoursOfOperationError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the hours of operation for the specified queue.
 */
export const updateQueueHoursOfOperation: API.OperationMethod<
  UpdateQueueHoursOfOperationRequest,
  UpdateQueueHoursOfOperationResponse,
  UpdateQueueHoursOfOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/hours-of-operation",
    input: { InstanceId: 0, QueueId: 0, HoursOfOperationId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueHoursOfOperation",
})) as any;

export type UpdateQueueMaxContactsError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the maximum number of contacts allowed in a queue before it is considered full.
 */
export const updateQueueMaxContacts: API.OperationMethod<
  UpdateQueueMaxContactsRequest,
  UpdateQueueMaxContactsResponse,
  UpdateQueueMaxContactsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/max-contacts",
    input: { InstanceId: 0, QueueId: 0, MaxContacts: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueMaxContacts",
})) as any;

export type UpdateQueueNameError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and description of a queue. At least `Name` or `Description` must be provided.
 */
export const updateQueueName: API.OperationMethod<
  UpdateQueueNameRequest,
  UpdateQueueNameResponse,
  UpdateQueueNameError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/name",
    input: { InstanceId: 0, QueueId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueName",
})) as any;

export type UpdateQueueOutboundCallerConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the outbound caller ID name, number, and outbound whisper flow for a specified queue.
 *
 * - If the phone number is claimed to a traffic distribution group that was created in the
 * same Region as the Connect Customer instance where you are calling this API, then you can use a
 * full phone number ARN or a UUID for `OutboundCallerIdNumberId`. However, if the phone number is claimed
 * to a traffic distribution group that is in one Region, and you are calling this API from an instance in another Amazon Web Services Region that is associated with the traffic distribution group, you must provide a full phone number ARN. If a
 * UUID is provided in this scenario, you will receive a
 * `ResourceNotFoundException`.
 *
 * - Only use the phone number ARN format that doesn't contain `instance` in the path, for example,
 * `arn:aws:connect:us-east-1:1234567890:phone-number/uuid`. This is the same ARN format that is returned
 * when you call the ListPhoneNumbersV2 API.
 *
 * - If you plan to use IAM policies to allow/deny access to this API for phone number resources
 * claimed to a traffic distribution group, see Allow or Deny queue API actions for phone numbers in a replica Region.
 */
export const updateQueueOutboundCallerConfig: API.OperationMethod<
  UpdateQueueOutboundCallerConfigRequest,
  UpdateQueueOutboundCallerConfigResponse,
  UpdateQueueOutboundCallerConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/outbound-caller-config",
    input: {
      InstanceId: 0,
      QueueId: 0,
      OutboundCallerConfig: i_OutboundCallerConfig,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueOutboundCallerConfig",
})) as any;

export type UpdateQueueOutboundEmailConfigError =
  | AccessDeniedException
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the outbound email address Id for a specified queue.
 */
export const updateQueueOutboundEmailConfig: API.OperationMethod<
  UpdateQueueOutboundEmailConfigRequest,
  UpdateQueueOutboundEmailConfigResponse,
  UpdateQueueOutboundEmailConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/outbound-email-config",
    input: {
      InstanceId: 0,
      QueueId: 0,
      OutboundEmailConfig: i_OutboundEmailConfig,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueOutboundEmailConfig",
})) as any;

export type UpdateQueueStatusError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the status of the queue.
 */
export const updateQueueStatus: API.OperationMethod<
  UpdateQueueStatusRequest,
  UpdateQueueStatusResponse,
  UpdateQueueStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queues/{InstanceId}/{QueueId}/status",
    input: { InstanceId: 0, QueueId: 0, Status: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueStatus",
})) as any;

export type UpdateQuickConnectConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the configuration settings for the specified quick connect.
 */
export const updateQuickConnectConfig: API.OperationMethod<
  UpdateQuickConnectConfigRequest,
  UpdateQuickConnectConfigResponse,
  UpdateQuickConnectConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /quick-connects/{InstanceId}/{QuickConnectId}/config",
    input: {
      InstanceId: 0,
      QuickConnectId: 0,
      QuickConnectConfig: i_QuickConnectConfig,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickConnectConfig",
})) as any;

export type UpdateQuickConnectNameError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and description of a quick connect. The request accepts the following data in JSON format. At least `Name` or `Description` must be provided.
 */
export const updateQuickConnectName: API.OperationMethod<
  UpdateQuickConnectNameRequest,
  UpdateQuickConnectNameResponse,
  UpdateQuickConnectNameError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /quick-connects/{InstanceId}/{QuickConnectId}/name",
    input: { InstanceId: 0, QuickConnectId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickConnectName",
})) as any;

export type UpdateRoutingProfileAgentAvailabilityTimerError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Whether agents with this routing profile will have their routing order calculated based on time since
 * their last inbound contact or *longest idle time*.
 */
export const updateRoutingProfileAgentAvailabilityTimer: API.OperationMethod<
  UpdateRoutingProfileAgentAvailabilityTimerRequest,
  UpdateRoutingProfileAgentAvailabilityTimerResponse,
  UpdateRoutingProfileAgentAvailabilityTimerError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/agent-availability-timer",
    input: { InstanceId: 0, RoutingProfileId: 0, AgentAvailabilityTimer: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingProfileAgentAvailabilityTimer",
})) as any;

export type UpdateRoutingProfileConcurrencyError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the channels that agents can handle in the Contact Control Panel (CCP) for a routing profile.
 */
export const updateRoutingProfileConcurrency: API.OperationMethod<
  UpdateRoutingProfileConcurrencyRequest,
  UpdateRoutingProfileConcurrencyResponse,
  UpdateRoutingProfileConcurrencyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/concurrency",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      MediaConcurrencies: D.list(i_MediaConcurrency),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingProfileConcurrency",
})) as any;

export type UpdateRoutingProfileDefaultOutboundQueueError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the default outbound queue of a routing profile.
 */
export const updateRoutingProfileDefaultOutboundQueue: API.OperationMethod<
  UpdateRoutingProfileDefaultOutboundQueueRequest,
  UpdateRoutingProfileDefaultOutboundQueueResponse,
  UpdateRoutingProfileDefaultOutboundQueueError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/default-outbound-queue",
    input: { InstanceId: 0, RoutingProfileId: 0, DefaultOutboundQueueId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingProfileDefaultOutboundQueue",
})) as any;

export type UpdateRoutingProfileNameError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and description of a routing profile. The request accepts the following data in JSON format. At least `Name` or `Description` must be provided.
 */
export const updateRoutingProfileName: API.OperationMethod<
  UpdateRoutingProfileNameRequest,
  UpdateRoutingProfileNameResponse,
  UpdateRoutingProfileNameError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/name",
    input: { InstanceId: 0, RoutingProfileId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingProfileName",
})) as any;

export type UpdateRoutingProfileQueuesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties associated with a set of queues for a routing profile.
 */
export const updateRoutingProfileQueues: API.OperationMethod<
  UpdateRoutingProfileQueuesRequest,
  UpdateRoutingProfileQueuesResponse,
  UpdateRoutingProfileQueuesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-profiles/{InstanceId}/{RoutingProfileId}/queues",
    input: {
      InstanceId: 0,
      RoutingProfileId: 0,
      QueueConfigs: D.list(i_RoutingProfileQueueConfig),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingProfileQueues",
})) as any;

export type UpdateRuleError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a rule for the specified Connect Customer instance.
 *
 * Use the Rules Function
 * language to code conditions for the rule.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /rules/{InstanceId}/{RuleId}",
    input: {
      RuleId: 0,
      InstanceId: 0,
      Name: 0,
      Function: 0,
      Actions: D.list(i_RuleAction),
      PublishStatus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
})) as any;

export type UpdateSecurityProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a security profile.
 *
 * For information about security profiles, see Security Profiles in the *Connect Customer Administrator Guide*. For a mapping of the API name and user interface name of the security
 * profile permissions, see List
 * of security profile permissions.
 */
export const updateSecurityProfile: API.OperationMethod<
  UpdateSecurityProfileRequest,
  UpdateSecurityProfileResponse,
  UpdateSecurityProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /security-profiles/{InstanceId}/{SecurityProfileId}",
    input: {
      Description: 0,
      Permissions: 0,
      SecurityProfileId: 0,
      InstanceId: 0,
      AllowedAccessControlTags: 0,
      TagRestrictedResources: 0,
      Applications: D.list(i_Application),
      HierarchyRestrictedResources: 0,
      AllowedAccessControlHierarchyGroupId: 0,
      AllowedFlowModules: D.list(i_FlowModule),
      GranularAccessControlConfiguration: i_GranularAccessControlConfiguration,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityProfile",
})) as any;

export type UpdateTaskTemplateError =
  | InternalServiceException
  | InvalidParameterException
  | PropertyValidationException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates details about a specific task template in the specified Connect Customer instance. This operation does
 * not support partial updates. Instead it does a full update of template content.
 */
export const updateTaskTemplate: API.OperationMethod<
  UpdateTaskTemplateRequest,
  UpdateTaskTemplateResponse,
  UpdateTaskTemplateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /instance/{InstanceId}/task/template/{TaskTemplateId}",
    input: {
      TaskTemplateId: 0,
      InstanceId: 0,
      Name: 0,
      Description: 0,
      ContactFlowId: 0,
      SelfAssignFlowId: 0,
      Constraints: i_TaskTemplateConstraints,
      Defaults: i_TaskTemplateDefaults,
      Status: 0,
      Fields: D.list(i_TaskTemplateField),
    },
    output: { LastModifiedTime: D.ts, CreatedTime: D.ts },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PropertyValidationException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskTemplate",
})) as any;

export type UpdateTestCaseError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidTestCaseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates any of the metadata for a test case, such as the name, description, and status or content of an existing test case. This API doesn't allow customers to update the tags of the test case resource for the specified Amazon Connect instance.
 */
export const updateTestCase: API.OperationMethod<
  UpdateTestCaseRequest,
  UpdateTestCaseResponse,
  UpdateTestCaseError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /test-cases/{InstanceId}/{TestCaseId}",
    input: {
      InstanceId: 0,
      TestCaseId: 0,
      Content: 0,
      EntryPoint: i_TestCaseEntryPoint,
      InitializationData: 0,
      Name: 0,
      Description: 0,
      Status: 0,
      LastModifiedTime: D.m({ header: "x-amz-last-modified-time" }),
      LastModifiedRegion: D.m({ header: "x-amz-last-modified-region" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTestCaseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestCase",
})) as any;

export type UpdateTrafficDistributionError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the traffic distribution for a given traffic distribution group.
 *
 * When you shift telephony traffic, also shift agents and/or agent sign-ins to ensure they can handle the calls
 * in the other Region. If you don't shift the agents, voice calls will go to the shifted Region but there won't be any
 * agents available to receive the calls.
 *
 * The `SignInConfig` distribution is available only on a
 * default `TrafficDistributionGroup` (see the `IsDefault` parameter in the
 * TrafficDistributionGroup
 * data type). If you call
 * `UpdateTrafficDistribution` with a modified `SignInConfig` and a non-default `TrafficDistributionGroup`,
 * an `InvalidRequestException` is returned.
 *
 * For more information about updating a traffic distribution group, see Update telephony traffic distribution
 * across Amazon Web Services Regions
 * in the *Connect Customer Administrator Guide*.
 *
 * **Important things to know**
 *
 * - Invoke the UpdateTrafficDistribution API in the region that should handle traffic.
 */
export const updateTrafficDistribution: API.OperationMethod<
  UpdateTrafficDistributionRequest,
  UpdateTrafficDistributionResponse,
  UpdateTrafficDistributionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /traffic-distribution/{Id}",
    input: {
      Id: 0,
      TelephonyConfig: { Distributions: D.list(i_Distribution) },
      SignInConfig: { Distributions: D.list({ Region: 0, Enabled: 0 }) },
      AgentConfig: { Distributions: D.list(i_Distribution) },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficDistribution",
})) as any;

export type UpdateUserConfigError =
  | ConditionalOperationFailedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the configuration settings for the specified user, including per-channel auto-accept and after contact work (ACW) timeout settings.
 *
 * This operation replaces the UpdateUserPhoneConfig API. While UpdateUserPhoneConfig applies the same ACW timeout to all channels, UpdateUserConfig allows you to set different auto-accept and ACW timeout values for each channel type.
 */
export const updateUserConfig: API.OperationMethod<
  UpdateUserConfigRequest,
  UpdateUserConfigResponse,
  UpdateUserConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/config",
    input: {
      AutoAcceptConfigs: D.list(i_AutoAcceptConfig),
      AfterContactWorkConfigs: D.list(i_AfterContactWorkConfigPerChannel),
      PhoneNumberConfigs: D.list(i_PhoneNumberConfig),
      PersistentConnectionConfigs: D.list(i_PersistentConnectionConfig),
      VoiceEnhancementConfigs: D.list(i_VoiceEnhancementConfig),
      UserId: 0,
      InstanceId: 0,
    },
    body: true,
  },
  errors: [
    ConditionalOperationFailedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserConfig",
})) as any;

export type UpdateUserHierarchyError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns the specified hierarchy group to the specified user.
 */
export const updateUserHierarchy: API.OperationMethod<
  UpdateUserHierarchyRequest,
  UpdateUserHierarchyResponse,
  UpdateUserHierarchyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/hierarchy",
    input: { HierarchyGroupId: 0, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserHierarchy",
})) as any;

export type UpdateUserHierarchyGroupNameError =
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name of the user hierarchy group.
 */
export const updateUserHierarchyGroupName: API.OperationMethod<
  UpdateUserHierarchyGroupNameRequest,
  UpdateUserHierarchyGroupNameResponse,
  UpdateUserHierarchyGroupNameError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user-hierarchy-groups/{InstanceId}/{HierarchyGroupId}/name",
    input: { Name: 0, HierarchyGroupId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserHierarchyGroupName",
})) as any;

export type UpdateUserHierarchyStructureError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the user hierarchy structure: add, remove, and rename user hierarchy levels.
 */
export const updateUserHierarchyStructure: API.OperationMethod<
  UpdateUserHierarchyStructureRequest,
  UpdateUserHierarchyStructureResponse,
  UpdateUserHierarchyStructureError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /user-hierarchy-structure/{InstanceId}",
    input: {
      HierarchyStructure: {
        LevelOne: i_HierarchyLevelUpdate,
        LevelTwo: i_HierarchyLevelUpdate,
        LevelThree: i_HierarchyLevelUpdate,
        LevelFour: i_HierarchyLevelUpdate,
        LevelFive: i_HierarchyLevelUpdate,
      },
      InstanceId: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserHierarchyStructure",
})) as any;

export type UpdateUserIdentityInfoError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the identity information for the specified user.
 *
 * We strongly recommend limiting who has the ability to invoke `UpdateUserIdentityInfo`. Someone with
 * that ability can change the login credentials of other users by changing their email address. This poses a security
 * risk to your organization. They can change the email address of a user to the attacker's email address, and then
 * reset the password through email. For more information, see Best Practices for Security Profiles
 * in the *Connect Customer Administrator Guide*.
 */
export const updateUserIdentityInfo: API.OperationMethod<
  UpdateUserIdentityInfoRequest,
  UpdateUserIdentityInfoResponse,
  UpdateUserIdentityInfoError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/identity-info",
    input: { IdentityInfo: i_UserIdentityInfo, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserIdentityInfo",
})) as any;

export type UpdateUserNotificationStatusError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the status of a notification for a specific user, such as marking it as read or hidden. Users can only update notification status for notifications that have been sent to them. READ status deprioritizes the notification and greys it out, while HIDDEN status removes it from the notification widget.
 */
export const updateUserNotificationStatus: API.OperationMethod<
  UpdateUserNotificationStatusRequest,
  UpdateUserNotificationStatusResponse,
  UpdateUserNotificationStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/notifications/{NotificationId}",
    input: {
      InstanceId: 0,
      NotificationId: 0,
      UserId: 0,
      Status: 0,
      LastModifiedTime: D.m({ header: "x-amz-last-modified-time" }),
      LastModifiedRegion: D.m({ header: "x-amz-last-modified-region" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserNotificationStatus",
})) as any;

export type UpdateUserPhoneConfigError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the phone configuration settings for the specified user.
 *
 * We recommend using the UpdateUserConfig API, which supports additional functionality that is not available in the UpdateUserPhoneConfig API, such as voice enhancement settings and per-channel configuration for auto-accept and After Contact Work (ACW) timeouts. In comparison, the UpdateUserPhoneConfig API will always set the same ACW timeouts to all channels the user handles.
 */
export const updateUserPhoneConfig: API.OperationMethod<
  UpdateUserPhoneConfigRequest,
  UpdateUserPhoneConfigResponse,
  UpdateUserPhoneConfigError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/phone-config",
    input: { PhoneConfig: i_UserPhoneConfig, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPhoneConfig",
})) as any;

export type UpdateUserProficienciesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties associated with the proficiencies of a user.
 */
export const updateUserProficiencies: API.OperationMethod<
  UpdateUserProficienciesRequest,
  UpdateUserProficienciesResponse,
  UpdateUserProficienciesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/proficiencies",
    input: {
      InstanceId: 0,
      UserId: 0,
      UserProficiencies: D.list(i_UserProficiency),
    },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProficiencies",
})) as any;

export type UpdateUserRoutingProfileError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns the specified routing profile to the specified user.
 */
export const updateUserRoutingProfile: API.OperationMethod<
  UpdateUserRoutingProfileRequest,
  UpdateUserRoutingProfileResponse,
  UpdateUserRoutingProfileError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/routing-profile",
    input: { RoutingProfileId: 0, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserRoutingProfile",
})) as any;

export type UpdateUserSecurityProfilesError =
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns the specified security profiles to the specified user.
 */
export const updateUserSecurityProfiles: API.OperationMethod<
  UpdateUserSecurityProfilesRequest,
  UpdateUserSecurityProfilesResponse,
  UpdateUserSecurityProfilesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users/{InstanceId}/{UserId}/security-profiles",
    input: { SecurityProfileIds: 0, UserId: 0, InstanceId: 0 },
    body: true,
  },
  errors: [
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserSecurityProfiles",
})) as any;

export type UpdateViewContentError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the view content of the given view identifier in the specified Connect Customer instance.
 *
 * It performs content validation if `Status` is set to `SAVED` and performs full content
 * validation if `Status` is `PUBLISHED`. Note that the `$SAVED` alias' content will
 * always be updated, but the `$LATEST` alias' content will only be updated if `Status` is
 * `PUBLISHED`.
 */
export const updateViewContent: API.OperationMethod<
  UpdateViewContentRequest,
  UpdateViewContentResponse,
  UpdateViewContentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /views/{InstanceId}/{ViewId}",
    input: { InstanceId: 0, ViewId: 0, Status: 0, Content: i_ViewInputContent },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateViewContent",
})) as any;

export type UpdateViewMetadataError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the view metadata. Note that either `Name` or `Description` must be
 * provided.
 */
export const updateViewMetadata: API.OperationMethod<
  UpdateViewMetadataRequest,
  UpdateViewMetadataResponse,
  UpdateViewMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /views/{InstanceId}/{ViewId}/metadata",
    input: { InstanceId: 0, ViewId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateViewMetadata",
})) as any;

export type UpdateWorkspaceMetadataError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the metadata of a workspace, such as its name and description.
 */
export const updateWorkspaceMetadata: API.OperationMethod<
  UpdateWorkspaceMetadataRequest,
  UpdateWorkspaceMetadataResponse,
  UpdateWorkspaceMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/metadata",
    input: { InstanceId: 0, WorkspaceId: 0, Name: 0, Description: 0, Title: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceMetadata",
})) as any;

export type UpdateWorkspacePageError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the configuration of a page in a workspace, including the associated view and input data.
 */
export const updateWorkspacePage: API.OperationMethod<
  UpdateWorkspacePageRequest,
  UpdateWorkspacePageResponse,
  UpdateWorkspacePageError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/pages/{Page}",
    input: {
      InstanceId: 0,
      WorkspaceId: 0,
      Page: 0,
      NewPage: 0,
      ResourceArn: 0,
      Slug: 0,
      InputData: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceConflictException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspacePage",
})) as any;

export type UpdateWorkspaceThemeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the theme configuration for a workspace, including colors and styling.
 */
export const updateWorkspaceTheme: API.OperationMethod<
  UpdateWorkspaceThemeRequest,
  UpdateWorkspaceThemeResponse,
  UpdateWorkspaceThemeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/theme",
    input: { InstanceId: 0, WorkspaceId: 0, Theme: i_WorkspaceTheme },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceTheme",
})) as any;

export type UpdateWorkspaceVisibilityError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the visibility setting of a workspace, controlling whether it is available to all users, assigned users
 * only, or none.
 */
export const updateWorkspaceVisibility: API.OperationMethod<
  UpdateWorkspaceVisibilityRequest,
  UpdateWorkspaceVisibilityResponse,
  UpdateWorkspaceVisibilityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{InstanceId}/{WorkspaceId}/visibility",
    input: { InstanceId: 0, WorkspaceId: 0, Visibility: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceVisibility",
})) as any;

const i_AfterContactWorkConfigPerChannel: D.LazyStruct = () => ({
  Channel: 0,
  AfterContactWorkConfig: i_AfterContactWorkConfig,
  AgentFirstCallbackAfterContactWorkConfig: i_AfterContactWorkConfig,
});
const i_AgentStatusSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_AgentStatusSearchCriteria),
  AndConditions: D.list(i_AgentStatusSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_AliasConfiguration: D.LazyStruct = () => ({ EmailAddressId: 0 });
const i_Application: D.LazyStruct = () => ({
  Namespace: 0,
  ApplicationPermissions: 0,
  Type: 0,
});
const i_AttributeAndCondition: D.LazyStruct = () => ({
  TagConditions: D.list(i_TagCondition),
  HierarchyGroupCondition: i_HierarchyGroupCondition,
});
const i_AutoAcceptConfig: D.LazyStruct = () => ({
  Channel: 0,
  AutoAccept: 0,
  AgentFirstCallbackAutoAccept: 0,
});
const i_ChatMessage: D.LazyStruct = () => ({ ContentType: 0, Content: 0 });
const i_ChatStreamingConfiguration: D.LazyStruct = () => ({
  StreamingEndpointArn: 0,
});
const i_ContactEvaluationAttributeAndCondition: D.LazyStruct = () => ({
  TagConditions: D.list(i_TagCondition),
  AttributeConditions: D.list(i_ContactEvaluationAttributeCondition),
});
const i_ContactEvaluationAttributeCondition: D.LazyStruct = () => ({
  AttributeKey: 0,
  AttributeValue: { StringValue: 0 },
  ComparisonType: 0,
});
const i_ContactFlowAttributeAndCondition: D.LazyStruct = () => ({
  TagConditions: D.list(i_TagCondition),
  ContactFlowTypeCondition: i_ContactFlowTypeCondition,
});
const i_ContactFlowModuleSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_ContactFlowModuleSearchCriteria),
  AndConditions: D.list(i_ContactFlowModuleSearchCriteria),
  StringCondition: i_StringCondition,
  StateCondition: 0,
  StatusCondition: 0,
});
const i_ContactFlowSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_ContactFlowSearchCriteria),
  AndConditions: D.list(i_ContactFlowSearchCriteria),
  StringCondition: i_StringCondition,
  TypeCondition: 0,
  StateCondition: 0,
  StatusCondition: 0,
});
const i_ContactFlowTypeCondition: D.LazyStruct = () => ({ ContactFlowType: 0 });
const i_ControlPlaneAttributeFilter: D.LazyStruct = () => ({
  OrConditions: D.list(i_CommonAttributeAndCondition),
  AndCondition: i_CommonAttributeAndCondition,
  TagCondition: i_TagCondition,
});
const i_ControlPlaneTagFilter: D.LazyStruct = () => ({
  OrConditions: D.list(D.list(i_TagCondition)),
  AndConditions: D.list(i_TagCondition),
  TagCondition: i_TagCondition,
});
const i_DataTableLockVersion: D.LazyStruct = () => ({
  DataTable: 0,
  Attribute: 0,
  PrimaryValues: 0,
  Value: 0,
});
const i_DataTableSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_DataTableSearchCriteria),
  AndConditions: D.list(i_DataTableSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_DataTableValue: D.LazyStruct = () => ({
  PrimaryValues: D.list(i_PrimaryValue),
  AttributeName: 0,
  Value: 0,
  LockVersion: i_DataTableLockVersion,
  LastModifiedTime: 0,
  LastModifiedRegion: 0,
});
const i_Distribution: D.LazyStruct = () => ({ Region: 0, Percentage: 0 });
const i_EmailAddressConfig: D.LazyStruct = () => ({ EmailAddressId: 0 });
const i_EmailAddressInfo: D.LazyStruct = () => ({
  EmailAddress: 0,
  DisplayName: 0,
});
const i_EmailAddressSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_EmailAddressSearchCriteria),
  AndConditions: D.list(i_EmailAddressSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_Endpoint: D.LazyStruct = () => ({ Type: 0, Address: 0 });
const i_EvaluationAnswerInput: D.LazyStruct = () => ({
  Value: {
    StringValue: 0,
    NumericValue: 0,
    StringValues: 0,
    DateTimeValue: 0,
    NotApplicable: 0,
  },
});
const i_EvaluationFormAutoEvaluationConfiguration: D.LazyStruct = () => ({
  Enabled: 0,
});
const i_EvaluationFormItem: D.LazyStruct = () => ({
  Section: {
    Title: 0,
    RefId: 0,
    Instructions: 0,
    Items: D.list(i_EvaluationFormItem),
    Weight: 0,
    IsExcludedFromScoring: 0,
    ScoreThresholds: D.list(i_EvaluationFormScoreThreshold),
  },
  Question: {
    Title: 0,
    Instructions: 0,
    RefId: 0,
    NotApplicableEnabled: 0,
    QuestionType: 0,
    QuestionTypeProperties: {
      Numeric: {
        MinValue: 0,
        MaxValue: 0,
        Options: D.list({
          MinValue: 0,
          MaxValue: 0,
          Score: 0,
          AutomaticFail: 0,
          AutomaticFailConfiguration: i_AutomaticFailConfiguration,
          PointsConfiguration: i_QuestionOptionPointsConfiguration,
        }),
        Automation: {
          PropertyValue: { Label: 0 },
          AnswerSource: i_EvaluationFormQuestionAutomationAnswerSource,
        },
      },
      SingleSelect: {
        Options: D.list({
          RefId: 0,
          Text: 0,
          Score: 0,
          AutomaticFail: 0,
          AutomaticFailConfiguration: i_AutomaticFailConfiguration,
          PointsConfiguration: i_QuestionOptionPointsConfiguration,
        }),
        DisplayAs: 0,
        Automation: {
          Options: D.list({
            RuleCategory: { Category: 0, Condition: 0, OptionRefId: 0 },
          }),
          DefaultOptionRefId: 0,
          AnswerSource: i_EvaluationFormQuestionAutomationAnswerSource,
        },
      },
      Text: {
        Automation: {
          AnswerSource: i_EvaluationFormQuestionAutomationAnswerSource,
        },
      },
      MultiSelect: {
        Options: D.list({
          RefId: 0,
          Text: 0,
          Score: 0,
          AutomaticFail: 0,
          AutomaticFailConfiguration: i_AutomaticFailConfiguration,
          PointsConfiguration: i_QuestionOptionPointsConfiguration,
        }),
        DisplayAs: 0,
        Automation: {
          Options: D.list({
            RuleCategory: { Category: 0, Condition: 0, OptionRefIds: 0 },
          }),
          DefaultOptionRefIds: 0,
          AnswerSource: i_EvaluationFormQuestionAutomationAnswerSource,
        },
      },
    },
    Enablement: {
      Condition: i_EvaluationFormItemEnablementCondition,
      Action: 0,
      DefaultAction: 0,
    },
    Weight: 0,
    ScoringConfiguration: {
      PointsConfiguration: { MaxPointValue: 0, MinPointValue: 0, IsBonus: 0 },
      IsExcludedFromScoring: 0,
      ScoreThresholds: D.list(i_EvaluationFormScoreThreshold),
    },
  },
});
const i_EvaluationFormLanguageConfiguration: D.LazyStruct = () => ({
  FormLanguage: 0,
});
const i_EvaluationFormScoringStrategy: D.LazyStruct = () => ({
  Mode: 0,
  Status: 0,
  ScoreThresholds: D.list(i_EvaluationFormScoreThreshold),
});
const i_EvaluationFormSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_EvaluationFormSearchCriteria),
  AndConditions: D.list(i_EvaluationFormSearchCriteria),
  StringCondition: i_StringCondition,
  NumberCondition: i_NumberCondition,
  BooleanCondition: i_BooleanCondition,
  DateTimeCondition: i_DateTimeCondition,
});
const i_EvaluationFormTargetConfiguration: D.LazyStruct = () => ({
  ContactInteractionType: 0,
});
const i_EvaluationNote: D.LazyStruct = () => ({ Value: 0 });
const i_EvaluationReviewConfiguration: D.LazyStruct = () => ({
  ReviewNotificationRecipients: D.list({ Type: 0, Value: { UserId: 0 } }),
  EligibilityDays: 0,
});
const i_EvaluationSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_EvaluationSearchCriteria),
  AndConditions: D.list(i_EvaluationSearchCriteria),
  StringCondition: i_StringCondition,
  NumberCondition: i_NumberCondition,
  BooleanCondition: i_BooleanCondition,
  DateTimeCondition: i_DateTimeCondition,
  DecimalCondition: {
    FieldName: 0,
    MinValue: 0,
    MaxValue: 0,
    ComparisonType: 0,
  },
});
const i_EvaluatorUserUnion: D.LazyStruct = () => ({ ConnectUserArn: 0 });
const i_Expression: D.LazyStruct = () => ({
  AttributeCondition: i_AttributeCondition,
  AndExpression: D.list(i_Expression),
  OrExpression: D.list(i_Expression),
  NotAttributeCondition: i_AttributeCondition,
});
const i_ExtractionConfiguration: D.LazyStruct = () => ({
  PromptHint: 0,
  NotFoundBehavior: { Behavior: 0, DefaultValue: 0 },
});
const i_ExtractionDefinitionDisplay: D.LazyStruct = () => ({ Label: 0 });
const i_Filters: D.LazyStruct = () => ({
  Queues: 0,
  Channels: 0,
  RoutingProfiles: 0,
  RoutingStepExpressions: 0,
  AgentStatuses: 0,
  Subtypes: 0,
  ValidationTestTypes: 0,
});
const i_FlowModule: D.LazyStruct = () => ({ Type: 0, FlowModuleId: 0 });
const i_GranularAccessControlConfiguration: D.LazyStruct = () => ({
  DataTableAccessControlConfiguration: {
    PrimaryAttributeAccessControlConfiguration: {
      PrimaryAttributeValues: D.list({
        AccessType: 0,
        AttributeName: 0,
        Values: 0,
      }),
    },
  },
});
const i_HierarchyGroupCondition: D.LazyStruct = () => ({
  Value: 0,
  HierarchyGroupMatchType: 0,
});
const i_HierarchyLevelUpdate: D.LazyStruct = () => ({ Name: 0 });
const i_HoursOfOperationConfig: D.LazyStruct = () => ({
  Day: 0,
  StartTime: i_HoursOfOperationTimeSlice,
  EndTime: i_HoursOfOperationTimeSlice,
});
const i_HoursOfOperationOverrideConfig: D.LazyStruct = () => ({
  Day: 0,
  StartTime: i_OverrideTimeSlice,
  EndTime: i_OverrideTimeSlice,
});
const i_HoursOfOperationOverrideSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_HoursOfOperationOverrideSearchCriteria),
  AndConditions: D.list(i_HoursOfOperationOverrideSearchCriteria),
  StringCondition: i_StringCondition,
  DateCondition: { FieldName: 0, Value: 0, ComparisonType: 0 },
});
const i_HoursOfOperationSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_HoursOfOperationSearchCriteria),
  AndConditions: D.list(i_HoursOfOperationSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_HoursOfOperationSearchFilter: D.LazyStruct = () => ({
  TagFilter: i_ControlPlaneTagFilter,
});
const i_InputPredefinedAttributeConfiguration: D.LazyStruct = () => ({
  EnableValueValidationOnAssociation: 0,
});
const i_InstanceStorageConfig: D.LazyStruct = () => ({
  AssociationId: 0,
  StorageType: 0,
  S3Config: {
    BucketName: 0,
    BucketPrefix: 0,
    EncryptionConfig: i_EncryptionConfig,
  },
  KinesisVideoStreamConfig: {
    Prefix: 0,
    RetentionPeriodHours: 0,
    EncryptionConfig: i_EncryptionConfig,
  },
  KinesisStreamConfig: { StreamArn: 0 },
  KinesisFirehoseConfig: { FirehoseArn: 0 },
});
const i_LexBot: D.LazyStruct = () => ({ Name: 0, LexRegion: 0 });
const i_LexV2Bot: D.LazyStruct = () => ({ AliasArn: 0 });
const i_MediaConcurrency: D.LazyStruct = () => ({
  Channel: 0,
  Concurrency: 0,
  CrossChannelBehavior: { BehaviorType: 0 },
});
const i_MetricCalculation: D.LazyStruct = () => ({
  CalculationComponents: D.list({
    Alias: 0,
    MetricName: 0,
    MetricId: 0,
    MetricFilters: D.list({
      MetricFilterKey: 0,
      Negate: 0,
      NumberCondition: { Comparison: 0, Values: 0 },
      StringCondition: { Comparison: 0, Values: 0 },
      BooleanCondition: { Comparison: 0 },
    }),
  }),
  Calculation: 0,
});
const i_MetricSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_MetricSearchCriteria),
  AndConditions: D.list(i_MetricSearchCriteria),
  StringCondition: i_StringCondition,
  BooleanCondition: i_BooleanCondition,
});
const i_NotificationSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_NotificationSearchCriteria),
  AndConditions: D.list(i_NotificationSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_OutboundAdditionalRecipients: D.LazyStruct = () => ({
  CcEmailAddresses: D.list(i_EmailAddressInfo),
});
const i_OutboundCallerConfig: D.LazyStruct = () => ({
  OutboundCallerIdName: 0,
  OutboundCallerIdNumberId: 0,
  OutboundFlowId: 0,
});
const i_OutboundEmailConfig: D.LazyStruct = () => ({
  OutboundEmailAddressId: 0,
});
const i_OutboundEmailContent: D.LazyStruct = () => ({
  MessageSourceType: 0,
  TemplatedMessageConfig: i_TemplatedMessageConfig,
  RawMessage: { Subject: 0, Body: 0, ContentType: 0 },
});
const i_OutboundStrategy: D.LazyStruct = () => ({
  Type: 0,
  Config: {
    AgentFirst: {
      Preview: {
        PostAcceptTimeoutConfig: { DurationInSeconds: 0 },
        AllowedUserActions: 0,
      },
    },
  },
});
const i_ParentHoursOfOperationConfig: D.LazyStruct = () => ({
  HoursOfOperationId: 0,
});
const i_ParticipantCapabilities: D.LazyStruct = () => ({
  Video: 0,
  ScreenShare: 0,
});
const i_ParticipantDetails: D.LazyStruct = () => ({ DisplayName: 0 });
const i_PersistentChat: D.LazyStruct = () => ({
  RehydrationType: 0,
  SourceContactId: 0,
});
const i_PersistentConnectionConfig: D.LazyStruct = () => ({
  Channel: 0,
  PersistentConnection: 0,
});
const i_PhoneNumberConfig: D.LazyStruct = () => ({
  Channel: 0,
  PhoneType: 0,
  PhoneNumber: 0,
});
const i_PredefinedAttributeSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_PredefinedAttributeSearchCriteria),
  AndConditions: D.list(i_PredefinedAttributeSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_PredefinedAttributeValues: D.LazyStruct = () => ({ StringList: 0 });
const i_PrimaryAttributeValueFilter: D.LazyStruct = () => ({
  AttributeName: 0,
  Values: 0,
});
const i_PrimaryValue: D.LazyStruct = () => ({ AttributeName: 0, Value: 0 });
const i_PromptSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_PromptSearchCriteria),
  AndConditions: D.list(i_PromptSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_QueueSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_QueueSearchCriteria),
  AndConditions: D.list(i_QueueSearchCriteria),
  StringCondition: i_StringCondition,
  QueueTypeCondition: 0,
});
const i_QuickConnectConfig: D.LazyStruct = () => ({
  QuickConnectType: 0,
  UserConfig: { UserId: 0, ContactFlowId: 0 },
  QueueConfig: { QueueId: 0, ContactFlowId: 0 },
  PhoneConfig: { PhoneNumber: 0 },
  FlowConfig: { ContactFlowId: 0 },
});
const i_QuickConnectSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_QuickConnectSearchCriteria),
  AndConditions: D.list(i_QuickConnectSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_RecurrenceConfig: D.LazyStruct = () => ({
  RecurrencePattern: {
    Frequency: 0,
    Interval: 0,
    ByMonth: 0,
    ByMonthDay: 0,
    ByWeekdayOccurrence: 0,
  },
});
const i_Reference: D.LazyStruct = () => ({
  Value: 0,
  Type: 0,
  Status: 0,
  Arn: 0,
  StatusReason: 0,
});
const i_RoutingProfileManualAssignmentQueueConfig: D.LazyStruct = () => ({
  QueueReference: i_RoutingProfileQueueReference,
});
const i_RoutingProfileQueueConfig: D.LazyStruct = () => ({
  QueueReference: i_RoutingProfileQueueReference,
  Priority: 0,
  Delay: 0,
});
const i_RoutingProfileQueueReference: D.LazyStruct = () => ({
  QueueId: 0,
  Channel: 0,
});
const i_RoutingProfileSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_RoutingProfileSearchCriteria),
  AndConditions: D.list(i_RoutingProfileSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_RuleAction: D.LazyStruct = () => ({
  ActionType: 0,
  TaskAction: {
    Name: 0,
    Description: 0,
    ContactFlowId: 0,
    References: D.map(i_Reference),
  },
  EventBridgeAction: { Name: 0 },
  AssignContactCategoryAction: {},
  SendNotificationAction: {
    DeliveryMethod: 0,
    Subject: 0,
    Content: 0,
    ContentType: 0,
    Recipient: i_NotificationRecipientType,
    Exclusion: i_NotificationRecipientType,
  },
  CreateCaseAction: { Fields: D.list(i_FieldValue), TemplateId: 0 },
  UpdateCaseAction: { Fields: D.list(i_FieldValue) },
  AssignSlaAction: {
    SlaAssignmentType: 0,
    CaseSlaConfiguration: {
      Name: 0,
      Type: 0,
      FieldId: 0,
      TargetFieldValues: D.list(i_FieldValueUnion),
      TargetSlaMinutes: 0,
    },
  },
  EndAssociatedTasksAction: {},
  SubmitAutoEvaluationAction: { EvaluationFormId: 0 },
  ExtractInformationAction: {
    RulesExtractionDefinitions: D.list({ Identifier: 0 }),
  },
});
const i_RuleAttributeAndCondition: D.LazyStruct = () => ({
  TagConditions: D.list(i_TagCondition),
});
const i_RulesSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_RulesSearchCriteria),
  AndConditions: D.list(i_RulesSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_SearchContactsTimeRange: D.LazyStruct = () => ({
  Type: 0,
  StartTime: 0,
  EndTime: 0,
});
const i_SecurityProfileItem: D.LazyStruct = () => ({ Id: 0 });
const i_SecurityProfileSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_SecurityProfileSearchCriteria),
  AndConditions: D.list(i_SecurityProfileSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_SegmentAttributeValue: D.LazyStruct = () => ({
  ValueString: 0,
  ValueMap: D.map(i_SegmentAttributeValue),
  ValueInteger: 0,
  ValueList: D.list(i_SegmentAttributeValue),
  ValueArn: 0,
});
const i_SourceCampaign: D.LazyStruct = () => ({
  CampaignId: 0,
  OutboundRequestId: 0,
});
const i_TagCondition: D.LazyStruct = () => ({ TagKey: 0, TagValue: 0 });
const i_TaskTemplateConstraints: D.LazyStruct = () => ({
  RequiredFields: D.list({ Id: i_TaskTemplateFieldIdentifier }),
  ReadOnlyFields: D.list({ Id: i_TaskTemplateFieldIdentifier }),
  InvisibleFields: D.list({ Id: i_TaskTemplateFieldIdentifier }),
});
const i_TaskTemplateDefaults: D.LazyStruct = () => ({
  DefaultFieldValues: D.list({
    Id: i_TaskTemplateFieldIdentifier,
    DefaultValue: 0,
  }),
});
const i_TaskTemplateField: D.LazyStruct = () => ({
  Id: i_TaskTemplateFieldIdentifier,
  Description: 0,
  Type: 0,
  SingleSelectOptions: 0,
});
const i_TemplatedMessageConfig: D.LazyStruct = () => ({
  KnowledgeBaseId: 0,
  MessageTemplateId: 0,
  TemplateAttributes: { CustomAttributes: 0, CustomerProfileAttributes: 0 },
});
const i_TestCaseEntryPoint: D.LazyStruct = () => ({
  Type: 0,
  VoiceCallEntryPointParameters: {
    SourcePhoneNumber: 0,
    DestinationPhoneNumber: 0,
    FlowId: 0,
  },
  ChatEntryPointParameters: { FlowId: 0 },
});
const i_TestCaseSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_TestCaseSearchCriteria),
  AndConditions: D.list(i_TestCaseSearchCriteria),
  StringCondition: i_StringCondition,
  StatusCondition: 0,
});
const i_UserHierarchyGroupSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_UserHierarchyGroupSearchCriteria),
  AndConditions: D.list(i_UserHierarchyGroupSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_UserIdentityInfo: D.LazyStruct = () => ({
  FirstName: 0,
  LastName: 0,
  Email: 0,
  SecondaryEmail: 0,
  Mobile: 0,
});
const i_UserInfo: D.LazyStruct = () => ({ UserId: 0 });
const i_UserPhoneConfig: D.LazyStruct = () => ({
  PhoneType: 0,
  AutoAccept: 0,
  AfterContactWorkTimeLimit: 0,
  DeskPhoneNumber: 0,
  PersistentConnection: 0,
});
const i_UserProficiency: D.LazyStruct = () => ({
  AttributeName: 0,
  AttributeValue: 0,
  Level: 0,
});
const i_UserSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_UserSearchCriteria),
  AndConditions: D.list(i_UserSearchCriteria),
  StringCondition: i_StringCondition,
  ListCondition: {
    TargetListType: 0,
    Conditions: D.list({
      StringCondition: i_StringCondition,
      NumberCondition: i_NumberCondition,
    }),
  },
  HierarchyGroupCondition: i_HierarchyGroupCondition,
});
const i_Validation: D.LazyStruct = () => ({
  MinLength: 0,
  MaxLength: 0,
  MinValues: 0,
  MaxValues: 0,
  IgnoreCase: 0,
  Minimum: 0,
  Maximum: 0,
  ExclusiveMinimum: 0,
  ExclusiveMaximum: 0,
  MultipleOf: 0,
  Enum: { Strict: 0, Values: 0 },
});
const i_ViewInputContent: D.LazyStruct = () => ({ Template: 0, Actions: 0 });
const i_ViewSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_ViewSearchCriteria),
  AndConditions: D.list(i_ViewSearchCriteria),
  StringCondition: i_StringCondition,
  ViewTypeCondition: 0,
  ViewStatusCondition: 0,
});
const i_VoiceEnhancementConfig: D.LazyStruct = () => ({
  Channel: 0,
  VoiceEnhancementMode: 0,
});
const i_WorkspaceAssociationSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_WorkspaceAssociationSearchCriteria),
  AndConditions: D.list(i_WorkspaceAssociationSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_WorkspaceSearchCriteria: D.LazyStruct = () => ({
  OrConditions: D.list(i_WorkspaceSearchCriteria),
  AndConditions: D.list(i_WorkspaceSearchCriteria),
  StringCondition: i_StringCondition,
});
const i_WorkspaceTheme: D.LazyStruct = () => ({
  Light: i_WorkspaceThemeConfig,
  Dark: i_WorkspaceThemeConfig,
});
const o_AgentStatus: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_ContactFlow: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_DataTable: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_DataTableAttribute: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_HierarchyGroup: D.LazyStruct = () => ({
  HierarchyPath: {
    LevelOne: o_HierarchyGroupSummary,
    LevelTwo: o_HierarchyGroupSummary,
    LevelThree: o_HierarchyGroupSummary,
    LevelFour: o_HierarchyGroupSummary,
    LevelFive: o_HierarchyGroupSummary,
  },
  LastModifiedTime: D.ts,
});
const o_HierarchyGroupSummary: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
});
const o_HierarchyLevel: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_HoursOfOperation: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_MetricDefinition: D.LazyStruct = () => ({
  EffectiveTime: D.ts,
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_Notification: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  CreatedAt: D.ts,
  ExpiresAt: D.ts,
});
const o_ParticipantMetrics: D.LazyStruct = () => ({
  LastMessageTimestamp: D.ts,
});
const o_PhoneNumberConfig: D.LazyStruct = () => ({ PhoneNumber: D.secret });
const o_PredefinedAttribute: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_Prompt: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_Queue: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_QuickConnect: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_QuickConnectSummary: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_RealTimeContactAnalysisTimeData: D.LazyStruct = () => ({
  AbsoluteTime: D.ts,
});
const o_RoutingCriteria: D.LazyStruct = () => ({
  Steps: D.list({ Expiry: { ExpiryTimestamp: D.ts } }),
  ActivationTimestamp: D.ts,
});
const o_RoutingProfile: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_TestCase: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_UserPhoneConfig: D.LazyStruct = () => ({ DeskPhoneNumber: D.secret });
const o_View: D.LazyStruct = () => ({
  Name: D.secret,
  Content: { InputSchema: D.secret, Actions: D.list(D.secret) },
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
const i_AfterContactWorkConfig: D.LazyStruct = () => ({
  AfterContactWorkTimeLimit: 0,
});
const i_AttributeCondition: D.LazyStruct = () => ({
  Name: 0,
  Value: 0,
  ProficiencyLevel: 0,
  Range: { MinProficiencyLevel: 0, MaxProficiencyLevel: 0 },
  MatchCriteria: { AgentsCriteria: { AgentIds: 0 } },
  ComparisonOperator: 0,
});
const i_AutomaticFailConfiguration: D.LazyStruct = () => ({ TargetSection: 0 });
const i_BooleanCondition: D.LazyStruct = () => ({
  FieldName: 0,
  ComparisonType: 0,
});
const i_CommonAttributeAndCondition: D.LazyStruct = () => ({
  TagConditions: D.list(i_TagCondition),
});
const i_DateTimeCondition: D.LazyStruct = () => ({
  FieldName: 0,
  MinValue: 0,
  MaxValue: 0,
  ComparisonType: 0,
});
const i_EncryptionConfig: D.LazyStruct = () => ({
  EncryptionType: 0,
  KeyId: 0,
});
const i_EvaluationFormItemEnablementCondition: D.LazyStruct = () => ({
  Operands: D.list({
    Expression: {
      Source: { Type: 0, RefId: 0 },
      Values: D.list({ Type: 0, RefId: 0 }),
      Comparator: 0,
    },
    Condition: i_EvaluationFormItemEnablementCondition,
  }),
  Operator: 0,
});
const i_EvaluationFormQuestionAutomationAnswerSource: D.LazyStruct = () => ({
  SourceType: 0,
});
const i_EvaluationFormScoreThreshold: D.LazyStruct = () => ({
  PerformanceCategory: 0,
  MinScorePercentage: 0,
  MaxScorePercentage: 0,
});
const i_FieldValue: D.LazyStruct = () => ({ Id: 0, Value: i_FieldValueUnion });
const i_FieldValueUnion: D.LazyStruct = () => ({
  BooleanValue: 0,
  DoubleValue: 0,
  EmptyValue: {},
  StringValue: 0,
});
const i_HoursOfOperationTimeSlice: D.LazyStruct = () => ({
  Hours: 0,
  Minutes: 0,
});
const i_NotificationRecipientType: D.LazyStruct = () => ({
  UserTags: 0,
  UserIds: 0,
});
const i_NumberCondition: D.LazyStruct = () => ({
  FieldName: 0,
  MinValue: 0,
  MaxValue: 0,
  ComparisonType: 0,
});
const i_OverrideTimeSlice: D.LazyStruct = () => ({ Hours: 0, Minutes: 0 });
const i_QuestionOptionPointsConfiguration: D.LazyStruct = () => ({
  PointValue: 0,
  IsBonus: 0,
});
const i_StringCondition: D.LazyStruct = () => ({
  FieldName: 0,
  Value: 0,
  ComparisonType: 0,
});
const i_TaskTemplateFieldIdentifier: D.LazyStruct = () => ({ Name: 0 });
const i_WorkspaceThemeConfig: D.LazyStruct = () => ({
  Palette: {
    Header: { Background: 0, Text: 0, TextHover: 0, InvertActionsColors: 0 },
    Navigation: {
      Background: 0,
      TextBackgroundHover: 0,
      TextBackgroundActive: 0,
      Text: 0,
      TextHover: 0,
      TextActive: 0,
      InvertActionsColors: 0,
    },
    Canvas: { ContainerBackground: 0, PageBackground: 0, ActiveBackground: 0 },
    Primary: { Default: 0, Active: 0, ContrastText: 0 },
  },
  Images: { Logo: { Default: 0, Favicon: 0 } },
  Typography: { FontFamily: { Default: 0 } },
});
