import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SSM Contacts",
  target: "SSMContacts",
  version: "2021-05-03",
  sigv4: "ssm-contacts",
  protocol: awsJson1_1Protocol,
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
                `https://ssm-contacts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ssm-contacts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm-contacts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm-contacts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly DependentEntities?: DependentEntity[];
  }> {}
export class DataEncryptionException
  extends /*@__PURE__*/ TE.TaggedError(
    "DataEncryptionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class IncidentManagerNotOnboarded
  extends /*@__PURE__*/ TE.TaggedError(
    "IncidentManagerNotOnboarded",
    ["BadRequestError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "Account not found for the request" },
      },
    },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class InvalidRotationArn
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRotationArn",
    ["BadRequestError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "Invalid resource Arn" },
      },
    },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly QuotaCode: string;
    readonly ServiceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
    readonly RetryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type SsmContactsArn = string;
export type AcceptType = "DELIVERED" | "READ" | (string & {});
export type ReceiptInfo = string;
export type AcceptCode = string;
export type AcceptCodeValidation = "IGNORE" | "ENFORCE" | (string & {});
export interface AcceptPageRequest {
  PageId: string;
  ContactChannelId?: string;
  AcceptType: AcceptType;
  Note?: string;
  AcceptCode: string;
  AcceptCodeValidation?: AcceptCodeValidation;
}
export interface AcceptPageResult {}
export type ActivationCode = string;
export interface ActivateContactChannelRequest {
  ContactChannelId: string;
  ActivationCode: string;
}
export interface ActivateContactChannelResult {}
export type ContactAlias = string;
export type ContactName = string;
export type ContactType =
  | "PERSONAL"
  | "ESCALATION"
  | "ONCALL_SCHEDULE"
  | (string & {});
export type StageDurationInMins = number;
export type RetryIntervalInMinutes = number;
export interface ChannelTargetInfo {
  ContactChannelId: string;
  RetryIntervalInMinutes?: number;
}
export type IsEssential = boolean;
export interface ContactTargetInfo {
  ContactId?: string;
  IsEssential: boolean;
}
export interface Target {
  ChannelTargetInfo?: ChannelTargetInfo;
  ContactTargetInfo?: ContactTargetInfo;
}
export type TargetsList = Target[];
export interface Stage {
  DurationInMinutes: number;
  Targets: Target[];
}
export type StagesList = Stage[];
export type SsmContactsArnList = string[];
export interface Plan {
  Stages?: Stage[];
  RotationIds?: string[];
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagsList = Tag[];
export type IdempotencyToken = string;
export interface CreateContactRequest {
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
  Plan: Plan;
  Tags?: Tag[];
  IdempotencyToken?: string;
}
export interface CreateContactResult {
  ContactArn: string;
}
export type ChannelName = string;
export type ChannelType = "SMS" | "VOICE" | "EMAIL" | (string & {});
export type SimpleAddress = string;
export interface ContactChannelAddress {
  SimpleAddress?: string;
}
export type DeferActivation = boolean;
export interface CreateContactChannelRequest {
  ContactId: string;
  Name: string;
  Type: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  DeferActivation?: boolean;
  IdempotencyToken?: string;
}
export interface CreateContactChannelResult {
  ContactChannelArn: string;
}
export type RotationName = string;
export type RotationContactsArnList = string[];
export type TimeZoneId = string;
export type DayOfMonth = number;
export type HourOfDay = number;
export type MinuteOfHour = number;
export interface HandOffTime {
  HourOfDay: number;
  MinuteOfHour: number;
}
export interface MonthlySetting {
  DayOfMonth: number;
  HandOffTime: HandOffTime;
}
export type MonthlySettings = MonthlySetting[];
export type DayOfWeek =
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | "SUN"
  | (string & {});
export interface WeeklySetting {
  DayOfWeek: DayOfWeek;
  HandOffTime: HandOffTime;
}
export type WeeklySettings = WeeklySetting[];
export type DailySettings = HandOffTime[];
export type NumberOfOnCalls = number;
export interface CoverageTime {
  Start?: HandOffTime;
  End?: HandOffTime;
}
export type CoverageTimes = CoverageTime[];
export type ShiftCoveragesMap = { [key in DayOfWeek]?: CoverageTime[] };
export type RecurrenceMultiplier = number;
export interface RecurrenceSettings {
  MonthlySettings?: MonthlySetting[];
  WeeklySettings?: WeeklySetting[];
  DailySettings?: HandOffTime[];
  NumberOfOnCalls: number;
  ShiftCoverages?: { [key: string]: CoverageTime[] | undefined };
  RecurrenceMultiplier: number;
}
export interface CreateRotationRequest {
  Name: string;
  ContactIds: string[];
  StartTime?: Date;
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
  Tags?: Tag[];
  IdempotencyToken?: string;
}
export interface CreateRotationResult {
  RotationArn: string;
}
export type RotationOverrideContactsArnList = string[];
export interface CreateRotationOverrideRequest {
  RotationId: string;
  NewContactIds: string[];
  StartTime: Date;
  EndTime: Date;
  IdempotencyToken?: string;
}
export type Uuid = string;
export interface CreateRotationOverrideResult {
  RotationOverrideId: string;
}
export interface DeactivateContactChannelRequest {
  ContactChannelId: string;
}
export interface DeactivateContactChannelResult {}
export interface DeleteContactRequest {
  ContactId: string;
}
export interface DeleteContactResult {}
export interface DeleteContactChannelRequest {
  ContactChannelId: string;
}
export interface DeleteContactChannelResult {}
export interface DeleteRotationRequest {
  RotationId: string;
}
export interface DeleteRotationResult {}
export interface DeleteRotationOverrideRequest {
  RotationId: string;
  RotationOverrideId: string;
}
export interface DeleteRotationOverrideResult {}
export interface DescribeEngagementRequest {
  EngagementId: string;
}
export type Sender = string;
export type Subject = string;
export type Content = string;
export type PublicSubject = string;
export type PublicContent = string;
export type IncidentId = string;
export interface DescribeEngagementResult {
  ContactArn: string;
  EngagementArn: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  StartTime?: Date;
  StopTime?: Date;
}
export interface DescribePageRequest {
  PageId: string;
}
export interface DescribePageResult {
  PageArn: string;
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  SentTime?: Date;
  ReadTime?: Date;
  DeliveryTime?: Date;
}
export interface GetContactRequest {
  ContactId: string;
}
export interface GetContactResult {
  ContactArn: string;
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
  Plan: Plan;
}
export interface GetContactChannelRequest {
  ContactChannelId: string;
}
export type ActivationStatus = "ACTIVATED" | "NOT_ACTIVATED" | (string & {});
export interface GetContactChannelResult {
  ContactArn: string;
  ContactChannelArn: string;
  Name: string;
  Type: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  ActivationStatus?: ActivationStatus;
}
export interface GetContactPolicyRequest {
  ContactArn: string;
}
export type Policy = string;
export interface GetContactPolicyResult {
  ContactArn?: string;
  Policy?: string;
}
export interface GetRotationRequest {
  RotationId: string;
}
export interface GetRotationResult {
  RotationArn: string;
  Name: string;
  ContactIds: string[];
  StartTime: Date;
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
}
export interface GetRotationOverrideRequest {
  RotationId: string;
  RotationOverrideId: string;
}
export interface GetRotationOverrideResult {
  RotationOverrideId?: string;
  RotationArn?: string;
  NewContactIds?: string[];
  StartTime?: Date;
  EndTime?: Date;
  CreateTime?: Date;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListContactChannelsRequest {
  ContactId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContactChannel {
  ContactChannelArn: string;
  ContactArn: string;
  Name: string;
  Type?: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  ActivationStatus: ActivationStatus;
}
export type ContactChannelList = ContactChannel[];
export interface ListContactChannelsResult {
  NextToken?: string;
  ContactChannels: ContactChannel[];
}
export interface ListContactsRequest {
  NextToken?: string;
  MaxResults?: number;
  AliasPrefix?: string;
  Type?: ContactType;
}
export interface Contact {
  ContactArn: string;
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
}
export type ContactsList = Contact[];
export interface ListContactsResult {
  NextToken?: string;
  Contacts?: Contact[];
}
export interface TimeRange {
  StartTime?: Date;
  EndTime?: Date;
}
export interface ListEngagementsRequest {
  NextToken?: string;
  MaxResults?: number;
  IncidentId?: string;
  TimeRangeValue?: TimeRange;
}
export interface Engagement {
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  IncidentId?: string;
  StartTime?: Date;
  StopTime?: Date;
}
export type EngagementsList = Engagement[];
export interface ListEngagementsResult {
  NextToken?: string;
  Engagements: Engagement[];
}
export interface ListPageReceiptsRequest {
  PageId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ReceiptType =
  | "DELIVERED"
  | "ERROR"
  | "READ"
  | "SENT"
  | "STOP"
  | (string & {});
export interface Receipt {
  ContactChannelArn?: string;
  ReceiptType: ReceiptType;
  ReceiptInfo?: string;
  ReceiptTime: Date;
}
export type ReceiptsList = Receipt[];
export interface ListPageReceiptsResult {
  NextToken?: string;
  Receipts?: Receipt[];
}
export interface ListPageResolutionsRequest {
  NextToken?: string;
  PageId: string;
}
export type StageIndex = number;
export interface ResolutionContact {
  ContactArn: string;
  Type: ContactType;
  StageIndex?: number;
}
export type ResolutionList = ResolutionContact[];
export interface ListPageResolutionsResult {
  NextToken?: string;
  PageResolutions: ResolutionContact[];
}
export interface ListPagesByContactRequest {
  ContactId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface Page {
  PageArn: string;
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  IncidentId?: string;
  SentTime?: Date;
  DeliveryTime?: Date;
  ReadTime?: Date;
}
export type PagesList = Page[];
export interface ListPagesByContactResult {
  NextToken?: string;
  Pages: Page[];
}
export interface ListPagesByEngagementRequest {
  EngagementId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListPagesByEngagementResult {
  NextToken?: string;
  Pages: Page[];
}
export type Member = string;
export type RotationPreviewMemberList = string[];
export type RotationOverridePreviewMemberList = string[];
export interface PreviewOverride {
  NewMembers?: string[];
  StartTime?: Date;
  EndTime?: Date;
}
export type OverrideList = PreviewOverride[];
export interface ListPreviewRotationShiftsRequest {
  RotationStartTime?: Date;
  StartTime?: Date;
  EndTime: Date;
  Members: string[];
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
  Overrides?: PreviewOverride[];
  NextToken?: string;
  MaxResults?: number;
}
export type ShiftType = "REGULAR" | "OVERRIDDEN" | (string & {});
export interface ShiftDetails {
  OverriddenContactIds: string[];
}
export interface RotationShift {
  ContactIds?: string[];
  StartTime: Date;
  EndTime: Date;
  Type?: ShiftType;
  ShiftDetails?: ShiftDetails;
}
export type RotationShifts = RotationShift[];
export interface ListPreviewRotationShiftsResult {
  RotationShifts?: RotationShift[];
  NextToken?: string;
}
export interface ListRotationOverridesRequest {
  RotationId: string;
  StartTime: Date;
  EndTime: Date;
  NextToken?: string;
  MaxResults?: number;
}
export interface RotationOverride {
  RotationOverrideId: string;
  NewContactIds: string[];
  StartTime: Date;
  EndTime: Date;
  CreateTime: Date;
}
export type RotationOverrides = RotationOverride[];
export interface ListRotationOverridesResult {
  RotationOverrides?: RotationOverride[];
  NextToken?: string;
}
export interface ListRotationsRequest {
  RotationNamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface Rotation {
  RotationArn: string;
  Name: string;
  ContactIds?: string[];
  StartTime?: Date;
  TimeZoneId?: string;
  Recurrence?: RecurrenceSettings;
}
export type Rotations = Rotation[];
export interface ListRotationsResult {
  NextToken?: string;
  Rotations: Rotation[];
}
export interface ListRotationShiftsRequest {
  RotationId: string;
  StartTime?: Date;
  EndTime: Date;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListRotationShiftsResult {
  RotationShifts?: RotationShift[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResult {
  Tags?: Tag[];
}
export interface PutContactPolicyRequest {
  ContactArn: string;
  Policy: string;
}
export interface PutContactPolicyResult {}
export interface SendActivationCodeRequest {
  ContactChannelId: string;
}
export interface SendActivationCodeResult {}
export interface StartEngagementRequest {
  ContactId: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  IdempotencyToken?: string;
}
export interface StartEngagementResult {
  EngagementArn: string;
}
export type StopReason = string;
export interface StopEngagementRequest {
  EngagementId: string;
  Reason?: string;
}
export interface StopEngagementResult {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResult {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdateContactRequest {
  ContactId: string;
  DisplayName?: string;
  Plan?: Plan;
}
export interface UpdateContactResult {}
export interface UpdateContactChannelRequest {
  ContactChannelId: string;
  Name?: string;
  DeliveryAddress?: ContactChannelAddress;
}
export interface UpdateContactChannelResult {}
export interface UpdateRotationRequest {
  RotationId: string;
  ContactIds?: string[];
  StartTime?: Date;
  TimeZoneId?: string;
  Recurrence: RecurrenceSettings;
}
export interface UpdateRotationResult {}
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export interface DependentEntity {
  RelationType: string;
  DependentResourceIds: string[];
}
export type DependentEntityList = DependentEntity[];
export type AcceptPageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Used to acknowledge an engagement to a contact channel during an incident.
 */
export const acceptPage: API.OperationMethod<
  AcceptPageRequest,
  AcceptPageResult,
  AcceptPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PageId: 0,
      ContactChannelId: 0,
      AcceptType: 0,
      Note: 0,
      AcceptCode: 0,
      AcceptCodeValidation: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPage",
})) as any;

export type ActivateContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Activates a contact's contact channel. Incident Manager can't engage a contact until the
 * contact channel has been activated.
 */
export const activateContactChannel: API.OperationMethod<
  ActivateContactChannelRequest,
  ActivateContactChannelResult,
  ActivateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ContactChannelId: 0, ActivationCode: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateContactChannel",
})) as any;

export type CreateContactError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Contacts are either the contacts that Incident Manager engages during an incident or the
 * escalation plans that Incident Manager uses to engage contacts in phases during an
 * incident.
 */
export const createContact: API.OperationMethod<
  CreateContactRequest,
  CreateContactResult,
  CreateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Alias: 0,
      DisplayName: 0,
      Type: 0,
      Plan: i_Plan,
      Tags: D.list(i_Tag),
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
})) as any;

export type CreateContactChannelError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * A contact channel is the method that Incident Manager uses to engage your contact.
 */
export const createContactChannel: API.OperationMethod<
  CreateContactChannelRequest,
  CreateContactChannelResult,
  CreateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContactId: 0,
      Name: 0,
      Type: 0,
      DeliveryAddress: i_ContactChannelAddress,
      DeferActivation: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactChannel",
})) as any;

export type CreateRotationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Creates a rotation in an on-call schedule.
 */
export const createRotation: API.OperationMethod<
  CreateRotationRequest,
  CreateRotationResult,
  CreateRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ContactIds: 0,
      StartTime: 0,
      TimeZoneId: 0,
      Recurrence: i_RecurrenceSettings,
      Tags: D.list(i_Tag),
      IdempotencyToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRotation",
})) as any;

export type CreateRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Creates an override for a rotation in an on-call schedule.
 */
export const createRotationOverride: API.OperationMethod<
  CreateRotationOverrideRequest,
  CreateRotationOverrideResult,
  CreateRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RotationId: 0,
      NewContactIds: 0,
      StartTime: 0,
      EndTime: 0,
      IdempotencyToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRotationOverride",
})) as any;

export type DeactivateContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To no longer receive Incident Manager engagements to a contact channel, you can deactivate
 * the channel.
 */
export const deactivateContactChannel: API.OperationMethod<
  DeactivateContactChannelRequest,
  DeactivateContactChannelResult,
  DeactivateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactChannelId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateContactChannel",
})) as any;

export type DeleteContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To remove a contact from Incident Manager, you can delete the contact. However, deleting a
 * contact does not remove it from escalation plans and related response plans. Deleting an
 * escalation plan also does not remove it from all related response plans. To modify an
 * escalation plan, we recommend using the UpdateContact action to specify a
 * different existing contact.
 */
export const deleteContact: API.OperationMethod<
  DeleteContactRequest,
  DeleteContactResult,
  DeleteContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContact",
})) as any;

export type DeleteContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To stop receiving engagements on a contact channel, you can delete the channel from a
 * contact. Deleting the contact channel does not remove it from the contact's engagement
 * plan, but the stage that includes the channel will be ignored. If you delete the only
 * contact channel for a contact, you'll no longer be able to engage that contact during an
 * incident.
 */
export const deleteContactChannel: API.OperationMethod<
  DeleteContactChannelRequest,
  DeleteContactChannelResult,
  DeleteContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactChannelId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactChannel",
})) as any;

export type DeleteRotationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Deletes a rotation from the system. If a rotation belongs to more than one on-call
 * schedule, this operation deletes it from all of them.
 */
export const deleteRotation: API.OperationMethod<
  DeleteRotationRequest,
  DeleteRotationResult,
  DeleteRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RotationId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRotation",
})) as any;

export type DeleteRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Deletes an existing override for an on-call rotation.
 */
export const deleteRotationOverride: API.OperationMethod<
  DeleteRotationOverrideRequest,
  DeleteRotationOverrideResult,
  DeleteRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RotationId: 0, RotationOverrideId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRotationOverride",
})) as any;

export type DescribeEngagementError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Incident Manager uses engagements to engage contacts and escalation plans during an incident.
 * Use this command to describe the engagement that occurred during an incident.
 */
export const describeEngagement: API.OperationMethod<
  DescribeEngagementRequest,
  DescribeEngagementResult,
  DescribeEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EngagementId: 0 },
    output: { StartTime: D.ts, StopTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngagement",
})) as any;

export type DescribePageError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists details of the engagement to a contact channel.
 */
export const describePage: API.OperationMethod<
  DescribePageRequest,
  DescribePageResult,
  DescribePageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PageId: 0 },
    output: { SentTime: D.ts, ReadTime: D.ts, DeliveryTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePage",
})) as any;

export type GetContactError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves information about the specified contact or escalation plan.
 */
export const getContact: API.OperationMethod<
  GetContactRequest,
  GetContactResult,
  GetContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactId: 0 } },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContact",
})) as any;

export type GetContactChannelError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * List details about a specific contact channel.
 */
export const getContactChannel: API.OperationMethod<
  GetContactChannelRequest,
  GetContactChannelResult,
  GetContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactChannelId: 0 } },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactChannel",
})) as any;

export type GetContactPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves the resource policies attached to the specified contact or escalation
 * plan.
 */
export const getContactPolicy: API.OperationMethod<
  GetContactPolicyRequest,
  GetContactPolicyResult,
  GetContactPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactPolicy",
})) as any;

export type GetRotationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves information about an on-call rotation.
 */
export const getRotation: API.OperationMethod<
  GetRotationRequest,
  GetRotationResult,
  GetRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RotationId: 0 },
    output: { StartTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRotation",
})) as any;

export type GetRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves information about an override to an on-call rotation.
 */
export const getRotationOverride: API.OperationMethod<
  GetRotationOverrideRequest,
  GetRotationOverrideResult,
  GetRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RotationId: 0, RotationOverrideId: 0 },
    output: { StartTime: D.ts, EndTime: D.ts, CreateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRotationOverride",
})) as any;

export type ListContactChannelsError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all contact channels for the specified contact.
 */
export const listContactChannels: API.PaginatedOperationMethod<
  ListContactChannelsRequest,
  ListContactChannelsResult,
  ListContactChannelsError,
  Credentials | HttpClient.HttpClient,
  ContactChannel
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ContactId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactChannels",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all contacts and escalation plans in Incident Manager.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest,
  ListContactsResult,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  Contact
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, AliasPrefix: 0, Type: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Contacts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all engagements that have happened in an incident.
 */
export const listEngagements: API.PaginatedOperationMethod<
  ListEngagementsRequest,
  ListEngagementsResult,
  ListEngagementsError,
  Credentials | HttpClient.HttpClient,
  Engagement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      IncidentId: 0,
      TimeRangeValue: { StartTime: 0, EndTime: 0 },
    },
    output: { Engagements: D.list({ StartTime: D.ts, StopTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Engagements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPageReceiptsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all of the engagements to contact channels that have been acknowledged.
 */
export const listPageReceipts: API.PaginatedOperationMethod<
  ListPageReceiptsRequest,
  ListPageReceiptsResult,
  ListPageReceiptsError,
  Credentials | HttpClient.HttpClient,
  Receipt
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PageId: 0, NextToken: 0, MaxResults: 0 },
    output: { Receipts: D.list({ ReceiptTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPageReceipts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Receipts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPageResolutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Returns the resolution path of an engagement. For example, the escalation plan engaged
 * in an incident might target an on-call schedule that includes several contacts in a
 * rotation, but just one contact on-call when the incident starts. The resolution path
 * indicates the hierarchy of escalation plan > on-call schedule >
 * contact.
 */
export const listPageResolutions: API.PaginatedOperationMethod<
  ListPageResolutionsRequest,
  ListPageResolutionsResult,
  ListPageResolutionsError,
  Credentials | HttpClient.HttpClient,
  ResolutionContact
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, PageId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPageResolutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PageResolutions",
  } as const,
})) as any;

export type ListPagesByContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the engagements to a contact's contact channels.
 */
export const listPagesByContact: API.PaginatedOperationMethod<
  ListPagesByContactRequest,
  ListPagesByContactResult,
  ListPagesByContactError,
  Credentials | HttpClient.HttpClient,
  Page
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ContactId: 0, NextToken: 0, MaxResults: 0 },
    output: { Pages: D.list(o_Page) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPagesByContact",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPagesByEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the engagements to contact channels that occurred by engaging a contact.
 */
export const listPagesByEngagement: API.PaginatedOperationMethod<
  ListPagesByEngagementRequest,
  ListPagesByEngagementResult,
  ListPagesByEngagementError,
  Credentials | HttpClient.HttpClient,
  Page
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { EngagementId: 0, NextToken: 0, MaxResults: 0 },
    output: { Pages: D.list(o_Page) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPagesByEngagement",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPreviewRotationShiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Returns a list of shifts based on rotation configuration parameters.
 *
 * The Incident Manager primarily uses this operation to populate the **Preview** calendar. It is not typically run by end users.
 */
export const listPreviewRotationShifts: API.PaginatedOperationMethod<
  ListPreviewRotationShiftsRequest,
  ListPreviewRotationShiftsResult,
  ListPreviewRotationShiftsError,
  Credentials | HttpClient.HttpClient,
  RotationShift
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      RotationStartTime: 0,
      StartTime: 0,
      EndTime: 0,
      Members: 0,
      TimeZoneId: 0,
      Recurrence: i_RecurrenceSettings,
      Overrides: D.list({ NewMembers: 0, StartTime: 0, EndTime: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { RotationShifts: D.list(o_RotationShift) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPreviewRotationShifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationShifts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationOverridesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves a list of overrides currently specified for an on-call rotation.
 */
export const listRotationOverrides: API.PaginatedOperationMethod<
  ListRotationOverridesRequest,
  ListRotationOverridesResult,
  ListRotationOverridesError,
  Credentials | HttpClient.HttpClient,
  RotationOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      RotationId: 0,
      StartTime: 0,
      EndTime: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      RotationOverrides: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        CreateTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotationOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationOverrides",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves a list of on-call rotations.
 */
export const listRotations: API.PaginatedOperationMethod<
  ListRotationsRequest,
  ListRotationsResult,
  ListRotationsError,
  Credentials | HttpClient.HttpClient,
  Rotation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RotationNamePrefix: 0, NextToken: 0, MaxResults: 0 },
    output: { Rotations: D.list({ StartTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rotations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationShiftsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Returns a list of shifts generated by an existing rotation in the system.
 */
export const listRotationShifts: API.PaginatedOperationMethod<
  ListRotationShiftsRequest,
  ListRotationShiftsResult,
  ListRotationShiftsError,
  Credentials | HttpClient.HttpClient,
  RotationShift
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      RotationId: 0,
      StartTime: 0,
      EndTime: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { RotationShifts: D.list(o_RotationShift) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotationShifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationShifts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the tags of a contact, escalation plan, rotation, or on-call schedule.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutContactPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Adds a resource policy to the specified contact or escalation plan. The resource policy
 * is used to share the contact or escalation plan using Resource Access Manager (RAM). For more information about cross-account sharing, see Setting up
 * cross-account functionality.
 */
export const putContactPolicy: API.OperationMethod<
  PutContactPolicyRequest,
  PutContactPolicyResult,
  PutContactPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactArn: 0, Policy: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContactPolicy",
})) as any;

export type SendActivationCodeError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Sends an activation code to a contact channel. The contact can use this code to activate
 * the contact channel in the console or with the `ActivateChannel` operation.
 * Incident Manager can't engage a contact channel until it has been activated.
 */
export const sendActivationCode: API.OperationMethod<
  SendActivationCodeRequest,
  SendActivationCodeResult,
  SendActivationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContactChannelId: 0 } },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendActivationCode",
})) as any;

export type StartEngagementError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Starts an engagement to a contact or escalation plan. The engagement engages each
 * contact specified in the incident.
 */
export const startEngagement: API.OperationMethod<
  StartEngagementRequest,
  StartEngagementResult,
  StartEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContactId: 0,
      Sender: 0,
      Subject: 0,
      Content: 0,
      PublicSubject: 0,
      PublicContent: 0,
      IncidentId: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEngagement",
})) as any;

export type StopEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Stops an engagement before it finishes the final stage of the escalation plan or
 * engagement plan. Further contacts aren't engaged.
 */
export const stopEngagement: API.OperationMethod<
  StopEngagementRequest,
  StopEngagementResult,
  StopEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EngagementId: 0, Reason: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEngagement",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Tags a contact or escalation plan. You can tag only contacts and escalation plans in the
 * first region of your replication set.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
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
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateContactError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Updates the contact or escalation plan specified.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResult,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ContactId: 0, DisplayName: 0, Plan: i_Plan },
  },
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
})) as any;

export type UpdateContactChannelError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Updates a contact's contact channel.
 */
export const updateContactChannel: API.OperationMethod<
  UpdateContactChannelRequest,
  UpdateContactChannelResult,
  UpdateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContactChannelId: 0,
      Name: 0,
      DeliveryAddress: i_ContactChannelAddress,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactChannel",
})) as any;

export type UpdateRotationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Updates the information specified for an on-call rotation.
 */
export const updateRotation: API.OperationMethod<
  UpdateRotationRequest,
  UpdateRotationResult,
  UpdateRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RotationId: 0,
      ContactIds: 0,
      StartTime: 0,
      TimeZoneId: 0,
      Recurrence: i_RecurrenceSettings,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRotation",
})) as any;

const i_ContactChannelAddress: D.LazyStruct = () => ({ SimpleAddress: 0 });
const i_Plan: D.LazyStruct = () => ({
  Stages: D.list({
    DurationInMinutes: 0,
    Targets: D.list({
      ChannelTargetInfo: { ContactChannelId: 0, RetryIntervalInMinutes: 0 },
      ContactTargetInfo: { ContactId: 0, IsEssential: 0 },
    }),
  }),
  RotationIds: 0,
});
const i_RecurrenceSettings: D.LazyStruct = () => ({
  MonthlySettings: D.list({ DayOfMonth: 0, HandOffTime: i_HandOffTime }),
  WeeklySettings: D.list({ DayOfWeek: 0, HandOffTime: i_HandOffTime }),
  DailySettings: D.list(i_HandOffTime),
  NumberOfOnCalls: 0,
  ShiftCoverages: D.map(D.list({ Start: i_HandOffTime, End: i_HandOffTime })),
  RecurrenceMultiplier: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Page: D.LazyStruct = () => ({
  SentTime: D.ts,
  DeliveryTime: D.ts,
  ReadTime: D.ts,
});
const o_RotationShift: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const i_HandOffTime: D.LazyStruct = () => ({ HourOfDay: 0, MinuteOfHour: 0 });
