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
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PartnerCentral Account",
  serviceShapeName: "PartnerCentralAccount",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral-account" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-04-04");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://partnercentral-account-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://partnercentral-account.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://partnercentral-account.{R}.api.aws","properties":{},"headers":{}}',
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "AccessDeniedExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ConflictExceptionReason",
      }),
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
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceNotFoundExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ServiceQuotaExceededExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      ErrorDetails: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(347, __c43, 3)).annotate({
          identifier: "ValidationErrorList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Catalog = string;
export type ConnectionInvitationId = string;
export type ClientToken = string;
export interface AcceptConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
}
export type ConnectionId = string;
export type ConnectionArn = string;
export type AwsAccountId = string;
export type ConnectionType = "OPPORTUNITY_COLLABORATION" | "SUBSIDIARY" | (string & {});
export type Email = string;
export type SensitiveUnicodeString = string | redacted.Redacted<string>;
export type ConnectionTypeStatus = "ACTIVE" | "CANCELED" | (string & {});
export type PartnerProfileId = string;
export type UnicodeString = string;
export interface PartnerProfileSummary {
  Id: string;
  Name: string;
}
export type SellerProfileId = string;
export interface SellerProfileSummary {
  Id: string;
  Name: string;
}
export interface AccountSummary {
  Name: string;
}
export type Participant =
  | { PartnerProfile: PartnerProfileSummary; SellerProfile?: never; Account?: never }
  | { PartnerProfile?: never; SellerProfile: SellerProfileSummary; Account?: never }
  | { PartnerProfile?: never; SellerProfile?: never; Account: AccountSummary };
export interface ConnectionTypeDetail {
  CreatedAt: Date;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
  Status: ConnectionTypeStatus;
  CanceledAt?: Date;
  CanceledBy?: string;
  OtherParticipant: Participant;
}
export type ConnectionTypeDetailMap = { [key in ConnectionType]?: ConnectionTypeDetail };
export interface Connection {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export interface AcceptConnectionInvitationResponse {
  Connection: Connection;
}
export type PartnerIdentifier = string;
export type EmailVerificationCode = string | redacted.Redacted<string>;
export interface AssociateAwsTrainingCertificationEmailDomainRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  Email: string;
  EmailVerificationCode: string | redacted.Redacted<string>;
}
export interface AssociateAwsTrainingCertificationEmailDomainResponse {}
export interface CancelConnectionRequest {
  Catalog: string;
  Identifier: string;
  ConnectionType: ConnectionType;
  Reason: string;
  ClientToken: string;
}
export interface CancelConnectionResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export interface CancelConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
}
export type ConnectionInvitationArn = string;
export type ParticipantIdentifier = string;
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED"
  | "EXPIRED"
  | (string & {});
export type UnicodeStringIncludingNewLine = string;
export interface CancelConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export type ProfileTaskId = string;
export interface CancelProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  TaskId: string;
}
export type PartnerArn = string;
export type PartnerId = string;
export type Url = string;
export type PrimarySolutionType =
  | "SOFTWARE_PRODUCTS"
  | "CONSULTING_SERVICES"
  | "PROFESSIONAL_SERVICES"
  | "MANAGED_SERVICES"
  | "HARDWARE_PRODUCTS"
  | "COMMUNICATION_SERVICES"
  | "VALUE_ADDED_RESALE_AWS_SERVICES"
  | "TRAINING_SERVICES"
  | (string & {});
export type IndustrySegment =
  | "AGRICULTURE_MINING"
  | "BIOTECHNOLOGY"
  | "BUSINESS_CONSUMER_SERVICES"
  | "BUSINESS_SERV"
  | "COMMUNICATIONS"
  | "COMPUTER_HARDWARE"
  | "COMPUTERS_ELECTRONICS"
  | "COMPUTER_SOFTWARE"
  | "CONSUMER_GOODS"
  | "CONSUMER_RELATED"
  | "EDUCATION"
  | "ENERGY_UTILITIES"
  | "FINANCIAL_SERVICES"
  | "GAMING"
  | "GOVERNMENT"
  | "GOVERNMENT_EDUCATION_PUBLIC_SERVICES"
  | "HEALTHCARE"
  | "HEALTHCARE_PHARMACEUTICALS_BIOTECH"
  | "INDUSTRIAL_ENERGY"
  | "INTERNET_SPECIFIC"
  | "LIFE_SCIENCES"
  | "MANUFACTURING"
  | "MEDIA_ENTERTAINMENT_LEISURE"
  | "MEDIA_ENTERTAINMENT"
  | "MEDICAL_HEALTH"
  | "NON_PROFIT_ORGANIZATION"
  | "OTHER"
  | "PROFESSIONAL_SERVICES"
  | "REAL_ESTATE_CONSTRUCTION"
  | "RETAIL"
  | "RETAIL_WHOLESALE_DISTRIBUTION"
  | "SEMICONDUCTOR_ELECTR"
  | "SOFTWARE_INTERNET"
  | "TELECOMMUNICATIONS"
  | "TRANSPORTATION_LOGISTICS"
  | "TRAVEL_HOSPITALITY"
  | "WHOLESALE_DISTRIBUTION"
  | (string & {});
export type IndustrySegmentList = IndustrySegment[];
export type Locale = string;
export interface LocalizedContent {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  Locale: string;
}
export type LocalizedContentList = LocalizedContent[];
export type CountryCode = string;
export type SubdivisionCode = string;
export interface Headquarters {
  CountryCode: string;
  SubdivisionCode: string;
}
export interface TaskDetails {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  PrimarySolutionType: PrimarySolutionType;
  IndustrySegments: IndustrySegment[];
  TranslationSourceLocale: string;
  LocalizedContents?: LocalizedContent[];
  Headquarters?: Headquarters;
}
export type ProfileTaskStatus = "IN_PROGRESS" | "CANCELED" | "SUCCEEDED" | "FAILED" | (string & {});
export type ProfileValidationErrorReason =
  | "INVALID_CONTENT"
  | "DUPLICATE_PROFILE"
  | "INVALID_LOGO"
  | "INVALID_LOGO_URL"
  | "INVALID_LOGO_FILE"
  | "INVALID_LOGO_SIZE"
  | "INVALID_WEBSITE_URL"
  | (string & {});
export interface ErrorDetail {
  Locale: string;
  Message: string;
  Reason: ProfileValidationErrorReason;
}
export type ErrorDetailList = ErrorDetail[];
export interface CancelProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export interface CreateConnectionInvitationRequest {
  Catalog: string;
  ClientToken: string;
  ConnectionType: ConnectionType;
  Email: string;
  Message: string;
  Name: string | redacted.Redacted<string>;
  ReceiverIdentifier: string;
}
export interface CreateConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export interface AllianceLeadContact {
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Email: string;
  BusinessTitle: string | redacted.Redacted<string>;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreatePartnerRequest {
  Catalog: string;
  ClientToken?: string;
  LegalName: string | redacted.Redacted<string>;
  PrimarySolutionType: PrimarySolutionType;
  AllianceLeadContact: AllianceLeadContact;
  EmailVerificationCode: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface PartnerProfile {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  PrimarySolutionType: PrimarySolutionType;
  IndustrySegments: IndustrySegment[];
  TranslationSourceLocale: string;
  LocalizedContents?: LocalizedContent[];
  Headquarters?: Headquarters;
  ProfileId?: string;
}
export type DomainName = string;
export interface PartnerDomain {
  DomainName: string;
  RegisteredAt: Date;
}
export type PartnerDomainList = PartnerDomain[];
export interface CreatePartnerResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
  Profile: PartnerProfile;
  AwsTrainingCertificationEmailDomains?: PartnerDomain[];
  AllianceLeadContact: AllianceLeadContact;
}
export interface DisassociateAwsTrainingCertificationEmailDomainRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  DomainName: string;
}
export interface DisassociateAwsTrainingCertificationEmailDomainResponse {}
export interface GetAllianceLeadContactRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetAllianceLeadContactResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  AllianceLeadContact: AllianceLeadContact;
}
export interface GetConnectionRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetConnectionResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export interface GetConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export interface GetConnectionPreferencesRequest {
  Catalog: string;
}
export type ConnectionPreferencesArn = string;
export type AccessType = "ALLOW_ALL" | "DENY_ALL" | "ALLOW_BY_DEFAULT_DENY_SOME" | (string & {});
export type ParticipantIdentifierList = string[];
export type Revision = number;
export interface GetConnectionPreferencesResponse {
  Catalog: string;
  Arn: string;
  AccessType: AccessType;
  ExcludedParticipantIds?: string[];
  UpdatedAt: Date;
  Revision: number;
}
export interface GetPartnerRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetPartnerResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
  Profile: PartnerProfile;
  AwsTrainingCertificationEmailDomains?: PartnerDomain[];
}
export interface GetProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export interface GetProfileVisibilityRequest {
  Catalog: string;
  Identifier: string;
}
export type ProfileVisibility = "PRIVATE" | "PUBLIC" | (string & {});
export interface GetProfileVisibilityResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Visibility: ProfileVisibility;
  ProfileId: string;
}
export interface GetQualificationsAssociationDetailsRequest {
  Catalog: string;
  Identifier: string;
}
export type QualificationsAssociationStatus = "ASSOCIATED" | "NOT_ASSOCIATED" | (string & {});
export interface QualificationsAssociationPartner {
  ProfileId?: string;
  AccountId?: string;
}
export type AssociatedPartnerList = QualificationsAssociationPartner[];
export interface GetQualificationsAssociationDetailsResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Status: QualificationsAssociationStatus;
  PrimaryPartner?: QualificationsAssociationPartner;
  AssociatedPartners?: QualificationsAssociationPartner[];
  UpdatedAt?: Date;
}
export interface GetQualificationsAssociationTaskRequest {
  Catalog: string;
  Identifier: string;
}
export type QualificationsAssociationTaskId = string;
export type QualificationsAssociationTaskStatus = "IN_PROGRESS" | "SUCCEEDED" | (string & {});
export interface GetQualificationsAssociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsAssociationTaskStatus;
  PrimaryPartner: QualificationsAssociationPartner;
  StartedAt: Date;
  EndedAt?: Date;
}
export interface GetQualificationsDisassociationTaskRequest {
  Catalog: string;
  Identifier: string;
}
export type QualificationsDisassociationTaskId = string;
export type QualificationsDisassociationTaskStatus = "IN_PROGRESS" | "SUCCEEDED" | (string & {});
export interface GetQualificationsDisassociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsDisassociationTaskStatus;
  AssociatedPartner: QualificationsAssociationPartner;
  StartedAt: Date;
  EndedAt?: Date;
}
export type VerificationType = "BUSINESS_VERIFICATION" | "REGISTRANT_VERIFICATION" | (string & {});
export interface GetVerificationRequest {
  VerificationType: VerificationType;
}
export type VerificationStatus =
  | "PENDING_CUSTOMER_ACTION"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | "REJECTED"
  | (string & {});
export type VerificationStatusReason = string;
export type LegalName = string | redacted.Redacted<string>;
export type RegistrationId = string | redacted.Redacted<string>;
export type JurisdictionCode = string;
export interface BusinessVerificationDetails {
  LegalName: string | redacted.Redacted<string>;
  RegistrationId: string | redacted.Redacted<string>;
  CountryCode: string;
  JurisdictionOfIncorporation?: string;
}
export type CompletionUrl = string;
export interface BusinessVerificationResponse {
  BusinessVerificationDetails: BusinessVerificationDetails;
  CompletionUrl?: string;
  CompletionUrlExpiresAt?: Date;
}
export interface RegistrantVerificationResponse {
  CompletionUrl: string;
  CompletionUrlExpiresAt: Date;
}
export type VerificationResponseDetails =
  | {
      BusinessVerificationResponse: BusinessVerificationResponse;
      RegistrantVerificationResponse?: never;
    }
  | {
      BusinessVerificationResponse?: never;
      RegistrantVerificationResponse: RegistrantVerificationResponse;
    };
export interface GetVerificationResponse {
  VerificationType: VerificationType;
  VerificationStatus: VerificationStatus;
  VerificationStatusReason?: string;
  VerificationResponseDetails: VerificationResponseDetails;
  StartedAt: Date;
  CompletedAt?: Date;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListConnectionInvitationsRequest {
  Catalog: string;
  NextToken?: string;
  ConnectionType?: ConnectionType;
  MaxResults?: number;
  OtherParticipantIdentifiers?: string[];
  ParticipantType?: ParticipantType;
  Status?: InvitationStatus;
}
export interface ConnectionInvitationSummary {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
}
export type ConnectionInvitationSummaryList = ConnectionInvitationSummary[];
export interface ListConnectionInvitationsResponse {
  ConnectionInvitationSummaries: ConnectionInvitationSummary[];
  NextToken?: string;
}
export type ConnectionTypeFilter = string;
export interface ListConnectionsRequest {
  Catalog: string;
  NextToken?: string;
  ConnectionType?: string;
  MaxResults?: number;
  OtherParticipantIdentifiers?: string[];
}
export interface ConnectionTypeSummary {
  Status: ConnectionTypeStatus;
  OtherParticipant: Participant;
}
export type ConnectionTypeSummaryMap = { [key in ConnectionType]?: ConnectionTypeSummary };
export interface ConnectionSummary {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeSummary | undefined };
}
export type ConnectionSummaryList = ConnectionSummary[];
export interface ListConnectionsResponse {
  ConnectionSummaries: ConnectionSummary[];
  NextToken?: string;
}
export interface ListPartnersRequest {
  Catalog: string;
  NextToken?: string;
}
export interface PartnerSummary {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
}
export type PartnerSummaryList = PartnerSummary[];
export interface ListPartnersResponse {
  PartnerSummaryList: PartnerSummary[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn: string;
  Tags?: Tag[];
}
export interface PutAllianceLeadContactRequest {
  Catalog: string;
  Identifier: string;
  AllianceLeadContact: AllianceLeadContact;
  EmailVerificationCode?: string | redacted.Redacted<string>;
}
export interface PutAllianceLeadContactResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  AllianceLeadContact: AllianceLeadContact;
}
export interface PutProfileVisibilityRequest {
  Catalog: string;
  Identifier: string;
  Visibility: ProfileVisibility;
}
export interface PutProfileVisibilityResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Visibility: ProfileVisibility;
  ProfileId: string;
}
export interface RejectConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
  Reason?: string;
}
export interface RejectConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export interface SendEmailVerificationCodeRequest {
  Catalog: string;
  Email: string;
}
export interface SendEmailVerificationCodeResponse {}
export interface StartProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  TaskDetails: TaskDetails;
}
export interface StartProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export interface StartQualificationsAssociationTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  PrimaryPartner: QualificationsAssociationPartner;
}
export interface StartQualificationsAssociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsAssociationTaskStatus;
  PrimaryPartner: QualificationsAssociationPartner;
  StartedAt: Date;
}
export interface StartQualificationsDisassociationTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  AssociatedPartner: QualificationsAssociationPartner;
}
export interface StartQualificationsDisassociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsDisassociationTaskStatus;
  AssociatedPartner: QualificationsAssociationPartner;
  StartedAt: Date;
}
export interface RegistrantVerificationDetails {}
export type VerificationDetails =
  | {
      BusinessVerificationDetails: BusinessVerificationDetails;
      RegistrantVerificationDetails?: never;
    }
  | {
      BusinessVerificationDetails?: never;
      RegistrantVerificationDetails: RegistrantVerificationDetails;
    };
export interface StartVerificationRequest {
  ClientToken?: string;
  VerificationDetails?: VerificationDetails;
}
export interface StartVerificationResponse {
  VerificationType: VerificationType;
  VerificationStatus: VerificationStatus;
  VerificationStatusReason?: string;
  VerificationResponseDetails: VerificationResponseDetails;
  StartedAt: Date;
  CompletedAt?: Date;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectionPreferencesRequest {
  Catalog: string;
  Revision: number;
  AccessType: AccessType;
  ExcludedParticipantIdentifiers?: string[];
}
export interface UpdateConnectionPreferencesResponse {
  Catalog: string;
  Arn: string;
  AccessType: AccessType;
  ExcludedParticipantIds?: string[];
  UpdatedAt: Date;
  Revision: number;
}
export type AccessDeniedExceptionReason =
  | "ACCESS_DENIED"
  | "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE"
  | (string & {});
export type ConflictExceptionReason =
  | "CONFLICT_CLIENT_TOKEN"
  | "DUPLICATE_PARTNER"
  | "INCOMPATIBLE_PROFILE_STATE"
  | "INCOMPATIBLE_PARTNER_PROFILE_TASK_STATE"
  | "DUPLICATE_CONNECTION_INVITATION"
  | "INCOMPATIBLE_CONNECTION_INVITATION_STATE"
  | "INCOMPATIBLE_CONNECTION_INVITATION_RECEIVER"
  | "DUPLICATE_CONNECTION"
  | "INCOMPATIBLE_CONNECTION_STATE"
  | "INCOMPATIBLE_CONNECTION_PREFERENCES_REVISION"
  | "ACCOUNT_ALREADY_VERIFIED"
  | "VERIFICATION_ALREADY_IN_PROGRESS"
  | "INCOMPATIBLE_QUALIFICATIONS_ASSOCIATION_TASK_STATE"
  | (string & {});
export type ResourceNotFoundExceptionReason =
  | "PARTNER_NOT_FOUND"
  | "PARTNER_PROFILE_NOT_FOUND"
  | "PARTNER_PROFILE_TASK_NOT_FOUND"
  | "PARTNER_DOMAIN_NOT_FOUND"
  | "SENDER_PROFILE_NOT_FOUND"
  | "RECEIVER_PROFILE_NOT_FOUND"
  | "CONNECTION_INVITATION_NOT_FOUND"
  | "CONNECTION_NOT_FOUND"
  | "VERIFICATION_NOT_FOUND"
  | "QUALIFICATIONS_ASSOCIATION_TASK_NOT_FOUND"
  | "QUALIFICATIONS_DISASSOCIATION_TASK_NOT_FOUND"
  | (string & {});
export type ServiceQuotaExceededExceptionReason =
  | "LIMIT_EXCEEDED_NUMBER_OF_EMAIL"
  | "LIMIT_EXCEEDED_NUMBER_OF_DOMAIN"
  | "LIMIT_EXCEEDED_NUMBER_OF_CONNECTION_INVITATION_PER_DAY"
  | "LIMIT_EXCEEDED_NUMBER_OF_ACTIVE_CONNECTION"
  | "LIMIT_EXCEEDED_NUMBER_OF_OPEN_CONNECTION_INVITATION"
  | "LIMIT_EXCEEDED_NUMBER_OF_PROFILE_UPDATE_PER_DAY"
  | "LIMIT_EXCEEDED_NUMBER_OF_PROFILE_VISIBILITY_UPDATE_PER_DAY"
  | (string & {});
export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export type FieldValidationCode =
  | "REQUIRED_FIELD_MISSING"
  | "DUPLICATE_VALUE"
  | "INVALID_VALUE"
  | "INVALID_STRING_FORMAT"
  | "TOO_MANY_VALUES"
  | "ACTION_NOT_PERMITTED"
  | "INVALID_ENUM_VALUE"
  | (string & {});
export interface FieldValidationError {
  Name: string;
  Message: string;
  Code: FieldValidationCode;
}
export type BusinessValidationCode =
  | "INCOMPATIBLE_CONNECTION_INVITATION_REQUEST"
  | "INCOMPATIBLE_LEGAL_NAME"
  | "INCOMPATIBLE_KNOW_YOUR_BUSINESS_STATUS"
  | "INCOMPATIBLE_IDENTITY_VERIFICATION_STATUS"
  | "INVALID_ACCOUNT_LINKING_STATUS"
  | "INVALID_ACCOUNT_STATE"
  | "INCOMPATIBLE_DOMAIN"
  | "INELIGIBLE_ACCOUNT_TIER"
  | "MISSING_ACTIVE_SUBSIDIARY_CONNECTION"
  | "INCOMPATIBLE_SUBSIDIARY_CONNECTION"
  | "INCOMPATIBLE_PRIMARY_PARTNER"
  | "QUALIFICATIONS_ASSOCIATION_LIMIT_EXCEEDED"
  | "QUALIFICATIONS_ASSOCIATION_NOT_FOUND"
  | "QUALIFICATIONS_ASSOCIATION_EXISTS"
  | (string & {});
export interface BusinessValidationError {
  Message: string;
  Code: BusinessValidationCode;
}
export type ValidationError =
  | { FieldValidationError: FieldValidationError; BusinessValidationError?: never }
  | { FieldValidationError?: never; BusinessValidationError: BusinessValidationError };
export type ValidationErrorList = ValidationError[];
export type AcceptConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a connection invitation from another partner, establishing a formal partnership connection between the two parties.
 */
export const acceptConnectionInvitation: API.OperationMethod<
  AcceptConnectionInvitationRequest,
  AcceptConnectionInvitationResponse,
  AcceptConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<AcceptConnectionInvitationRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<AcceptConnectionInvitationResponse>,
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
  operationName: "AcceptConnectionInvitation",
}));

export type AssociateAwsTrainingCertificationEmailDomainError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an email domain with AWS training and certification for the partner account, enabling automatic verification of employee certifications.
 */
export const associateAwsTrainingCertificationEmailDomain: API.OperationMethod<
  AssociateAwsTrainingCertificationEmailDomainRequest,
  AssociateAwsTrainingCertificationEmailDomainResponse,
  AssociateAwsTrainingCertificationEmailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<AssociateAwsTrainingCertificationEmailDomainRequest>,
  output: __S(
    384,
    __c48,
    0,
  ) as any as S.Schema<AssociateAwsTrainingCertificationEmailDomainResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAwsTrainingCertificationEmailDomain",
}));

export type CancelConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an existing connection between partners, terminating the partnership relationship.
 */
export const cancelConnection: API.OperationMethod<
  CancelConnectionRequest,
  CancelConnectionResponse,
  CancelConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<CancelConnectionRequest>,
  output: __S(362, __c45, 2) as any as S.Schema<CancelConnectionResponse>,
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
  operationName: "CancelConnection",
}));

export type CancelConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending connection invitation before it has been accepted or rejected.
 */
export const cancelConnectionInvitation: API.OperationMethod<
  CancelConnectionInvitationRequest,
  CancelConnectionInvitationResponse,
  CancelConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelConnectionInvitationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelConnectionInvitationResponse>,
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
  operationName: "CancelConnectionInvitation",
}));

export type CancelProfileUpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress profile update task, stopping any pending changes to the partner profile.
 */
export const cancelProfileUpdateTask: API.OperationMethod<
  CancelProfileUpdateTaskRequest,
  CancelProfileUpdateTaskResponse,
  CancelProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<CancelProfileUpdateTaskRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<CancelProfileUpdateTaskResponse>,
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
  operationName: "CancelProfileUpdateTask",
}));

export type CreateConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new connection invitation to establish a partnership with another organization.
 */
export const createConnectionInvitation: API.OperationMethod<
  CreateConnectionInvitationRequest,
  CreateConnectionInvitationResponse,
  CreateConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<CreateConnectionInvitationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateConnectionInvitationResponse>,
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
  operationName: "CreateConnectionInvitation",
}));

export type CreatePartnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new partner account in the AWS Partner Network with the specified details and configuration.
 */
export const createPartner: API.OperationMethod<
  CreatePartnerRequest,
  CreatePartnerResponse,
  CreatePartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CreatePartnerRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<CreatePartnerResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartner",
}));

export type DisassociateAwsTrainingCertificationEmailDomainError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between an email domain and AWS training and certification for the partner account.
 */
export const disassociateAwsTrainingCertificationEmailDomain: API.OperationMethod<
  DisassociateAwsTrainingCertificationEmailDomainRequest,
  DisassociateAwsTrainingCertificationEmailDomainResponse,
  DisassociateAwsTrainingCertificationEmailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    80,
    __c10,
    0,
  ) as any as S.Schema<DisassociateAwsTrainingCertificationEmailDomainRequest>,
  output: __S(
    384,
    __c48,
    0,
  ) as any as S.Schema<DisassociateAwsTrainingCertificationEmailDomainResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAwsTrainingCertificationEmailDomain",
}));

export type GetAllianceLeadContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the alliance lead contact information for a partner account.
 */
export const getAllianceLeadContact: API.OperationMethod<
  GetAllianceLeadContactRequest,
  GetAllianceLeadContactResponse,
  GetAllianceLeadContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetAllianceLeadContactRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<GetAllianceLeadContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAllianceLeadContact",
}));

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific connection between partners.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetConnectionRequest>,
  output: __S(362, __c45, 2) as any as S.Schema<GetConnectionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetConnectionInvitationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific connection invitation.
 */
export const getConnectionInvitation: API.OperationMethod<
  GetConnectionInvitationRequest,
  GetConnectionInvitationResponse,
  GetConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetConnectionInvitationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<GetConnectionInvitationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionInvitation",
}));

export type GetConnectionPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the connection preferences for a partner account, including access settings and exclusions.
 */
export const getConnectionPreferences: API.OperationMethod<
  GetConnectionPreferencesRequest,
  GetConnectionPreferencesResponse,
  GetConnectionPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetConnectionPreferencesRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<GetConnectionPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionPreferences",
}));

export type GetPartnerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific partner account.
 */
export const getPartner: API.OperationMethod<
  GetPartnerRequest,
  GetPartnerResponse,
  GetPartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetPartnerRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<GetPartnerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartner",
}));

export type GetProfileUpdateTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific profile update task.
 */
export const getProfileUpdateTask: API.OperationMethod<
  GetProfileUpdateTaskRequest,
  GetProfileUpdateTaskResponse,
  GetProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetProfileUpdateTaskRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<GetProfileUpdateTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileUpdateTask",
}));

export type GetProfileVisibilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the visibility settings for a partner profile, determining who can see the profile information.
 */
export const getProfileVisibility: API.OperationMethod<
  GetProfileVisibilityRequest,
  GetProfileVisibilityResponse,
  GetProfileVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<GetProfileVisibilityRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<GetProfileVisibilityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileVisibility",
}));

export type GetQualificationsAssociationDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns your current qualifications association status, the primary partner, and the full list of partners associated under the primary partner.
 */
export const getQualificationsAssociationDetails: API.OperationMethod<
  GetQualificationsAssociationDetailsRequest,
  GetQualificationsAssociationDetailsResponse,
  GetQualificationsAssociationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetQualificationsAssociationDetailsRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<GetQualificationsAssociationDetailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsAssociationDetails",
}));

export type GetQualificationsAssociationTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of the most recent qualifications association task for your partner account. Use this operation to poll the progress of an association task initiated by `StartQualificationsAssociationTask`.
 */
export const getQualificationsAssociationTask: API.OperationMethod<
  GetQualificationsAssociationTaskRequest,
  GetQualificationsAssociationTaskResponse,
  GetQualificationsAssociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<GetQualificationsAssociationTaskRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<GetQualificationsAssociationTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsAssociationTask",
}));

export type GetQualificationsDisassociationTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of the most recent qualifications disassociation task for your partner account. Use this operation to poll the progress of a disassociation task initiated by `StartQualificationsDisassociationTask`.
 */
export const getQualificationsDisassociationTask: API.OperationMethod<
  GetQualificationsDisassociationTaskRequest,
  GetQualificationsDisassociationTaskResponse,
  GetQualificationsDisassociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<GetQualificationsDisassociationTaskRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<GetQualificationsDisassociationTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsDisassociationTask",
}));

export type GetVerificationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status and details of a verification process for a partner account. This operation allows partners to check the progress and results of business or registrant verification processes.
 */
export const getVerification: API.OperationMethod<
  GetVerificationRequest,
  GetVerificationResponse,
  GetVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<GetVerificationRequest>,
  output: __S(220, __c27, 4) as any as S.Schema<GetVerificationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVerification",
}));

export type ListConnectionInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists connection invitations for the partner account, with optional filtering by status, type, and other criteria.
 */
export const listConnectionInvitations: API.PaginatedOperationMethod<
  ListConnectionInvitationsRequest,
  ListConnectionInvitationsResponse,
  ListConnectionInvitationsError,
  Credentials | HttpClient.HttpClient,
  ConnectionInvitationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListConnectionInvitationsRequest>,
  output: __S(227, __c28, 3) as any as S.Schema<ListConnectionInvitationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionInvitationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active connections for the partner account, with optional filtering by connection type and participant.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListConnectionsRequest>,
  output: __S(237, __c29, 5) as any as S.Schema<ListConnectionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPartnersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists partner accounts in the catalog, providing a summary view of all partners.
 */
export const listPartners: API.PaginatedOperationMethod<
  ListPartnersRequest,
  ListPartnersResponse,
  ListPartnersError,
  Credentials | HttpClient.HttpClient,
  PartnerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListPartnersRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<ListPartnersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PartnerSummaryList",
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
 * Lists all tags associated with a specific AWS Partner Central Account resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type PutAllianceLeadContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the alliance lead contact information for a partner account.
 */
export const putAllianceLeadContact: API.OperationMethod<
  PutAllianceLeadContactRequest,
  PutAllianceLeadContactResponse,
  PutAllianceLeadContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<PutAllianceLeadContactRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<PutAllianceLeadContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAllianceLeadContact",
}));

export type PutProfileVisibilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the visibility level for a partner profile, controlling who can view the profile information.
 */
export const putProfileVisibility: API.OperationMethod<
  PutProfileVisibilityRequest,
  PutProfileVisibilityResponse,
  PutProfileVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<PutProfileVisibilityRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<PutProfileVisibilityResponse>,
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
  operationName: "PutProfileVisibility",
}));

export type RejectConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a connection invitation from another partner, declining the partnership request.
 */
export const rejectConnectionInvitation: API.OperationMethod<
  RejectConnectionInvitationRequest,
  RejectConnectionInvitationResponse,
  RejectConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<RejectConnectionInvitationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<RejectConnectionInvitationResponse>,
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
  operationName: "RejectConnectionInvitation",
}));

export type SendEmailVerificationCodeError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an email verification code to the specified email address for account verification purposes.
 */
export const sendEmailVerificationCode: API.OperationMethod<
  SendEmailVerificationCodeRequest,
  SendEmailVerificationCodeResponse,
  SendEmailVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<SendEmailVerificationCodeRequest>,
  output: __S(384, __c48, 0) as any as S.Schema<SendEmailVerificationCodeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmailVerificationCode",
}));

export type StartProfileUpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a profile update task to modify partner profile information asynchronously.
 */
export const startProfileUpdateTask: API.OperationMethod<
  StartProfileUpdateTaskRequest,
  StartProfileUpdateTaskResponse,
  StartProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<StartProfileUpdateTaskRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<StartProfileUpdateTaskResponse>,
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
  operationName: "StartProfileUpdateTask",
}));

export type StartQualificationsAssociationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous task to associate your partner qualifications with a primary account. You must be a subsidiary of the primary account with an active subsidiary connection. Use `GetQualificationsAssociationTask` to monitor task progress.
 */
export const startQualificationsAssociationTask: API.OperationMethod<
  StartQualificationsAssociationTaskRequest,
  StartQualificationsAssociationTaskResponse,
  StartQualificationsAssociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<StartQualificationsAssociationTaskRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<StartQualificationsAssociationTaskResponse>,
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
  operationName: "StartQualificationsAssociationTask",
}));

export type StartQualificationsDisassociationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous task to disassociate your partner qualifications from a primary account. You must currently be associated and cannot disassociate if you are the primary partner. Use `GetQualificationsDisassociationTask` to monitor task progress.
 */
export const startQualificationsDisassociationTask: API.OperationMethod<
  StartQualificationsDisassociationTaskRequest,
  StartQualificationsDisassociationTaskResponse,
  StartQualificationsDisassociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<StartQualificationsDisassociationTaskRequest>,
  output: __S(305, __c38, 1) as any as S.Schema<StartQualificationsDisassociationTaskResponse>,
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
  operationName: "StartQualificationsDisassociationTask",
}));

export type StartVerificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a new verification process for a partner account. This operation begins the verification workflow for either business registration or individual registrant identity verification as required by AWS Partner Central.
 */
export const startVerification: API.OperationMethod<
  StartVerificationRequest,
  StartVerificationResponse,
  StartVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(313, __c39, 1) as any as S.Schema<StartVerificationRequest>,
  output: __S(220, __c27, 4) as any as S.Schema<StartVerificationResponse>,
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
  operationName: "StartVerification",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a specified AWS Partner Central Account resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(384, __c48, 0) as any as S.Schema<TagResourceResponse>,
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
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes specified tags from an AWS Partner Central Account resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(384, __c48, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

export type UpdateConnectionPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the connection preferences for a partner account, modifying access settings and exclusions.
 */
export const updateConnectionPreferences: API.OperationMethod<
  UpdateConnectionPreferencesRequest,
  UpdateConnectionPreferencesResponse,
  UpdateConnectionPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<UpdateConnectionPreferencesRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UpdateConnectionPreferencesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionPreferences",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelConnectionInvitationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.String,
          Arn: S.String,
          ConnectionId: S.optional(S.String),
          ConnectionType: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OtherParticipantIdentifier: S.String,
          ParticipantType: S.String,
          Status: S.String,
          InvitationMessage: S.String,
          InviterEmail: S.String,
          InviterName: SensitiveString,
        }),
      ).annotate({ identifier: "CancelConnectionInvitationResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          TaskId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelProfileUpdateTaskRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.String,
          Description: S.String,
          WebsiteUrl: S.String,
          LogoUrl: S.String,
          Locale: S.String,
        }),
      ).annotate({ identifier: "LocalizedContent" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CountryCode: S.String, SubdivisionCode: S.String }),
      ).annotate({ identifier: "Headquarters" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.String,
          Description: S.String,
          WebsiteUrl: S.String,
          LogoUrl: S.String,
          PrimarySolutionType: S.String,
          IndustrySegments: __S(24, __c3, 0),
          TranslationSourceLocale: S.String,
          LocalizedContents: S.optional(__S(26, __c3, 2)),
          Headquarters: S.optional(__S(27, __c3, 3)),
        }),
      ).annotate({ identifier: "TaskDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Locale: S.String, Message: S.String, Reason: S.String }),
      ).annotate({ identifier: "ErrorDetail" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          TaskId: S.String,
          TaskDetails: __S(32, __c4, 0),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Status: S.String,
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ErrorDetailList: S.optional(__S(34, __c4, 2)),
        }),
      ).annotate({ identifier: "CancelProfileUpdateTaskResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          ConnectionType: S.String,
          Email: S.String,
          Message: S.String,
          Name: SensitiveString,
          ReceiverIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionInvitationRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LegalName: SensitiveString,
          PrimarySolutionType: S.String,
          AllianceLeadContact: __S(56, __c7, 0),
          EmailVerificationCode: SensitiveString,
          Tags: S.optional(__S(73, __c9, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePartnerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          LegalName: SensitiveString,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Profile: __S(64, __c8, 0),
          AwsTrainingCertificationEmailDomains: S.optional(__S(66, __c8, 2)),
          AllianceLeadContact: __S(56, __c7, 0),
        }),
      ).annotate({ identifier: "CreatePartnerResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirstName: SensitiveString,
          LastName: SensitiveString,
          Email: S.String,
          BusinessTitle: SensitiveString,
        }),
      ).annotate({ identifier: "AllianceLeadContact" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.String,
          Description: S.String,
          WebsiteUrl: S.String,
          LogoUrl: S.String,
          PrimarySolutionType: S.String,
          IndustrySegments: __S(24, __c3, 0),
          TranslationSourceLocale: S.String,
          LocalizedContents: S.optional(__S(26, __c3, 2)),
          Headquarters: S.optional(__S(27, __c3, 3)),
          ProfileId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PartnerProfile" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          RegisteredAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PartnerDomain" });
    case 2:
      return S.Array(__S(65, __c8, 1));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(72, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DomainName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateAwsTrainingCertificationEmailDomainRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAllianceLeadContactRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          AllianceLeadContact: __S(56, __c7, 0),
        }),
      ).annotate({ identifier: "GetAllianceLeadContactResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectionInvitationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectionPreferencesRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          AccessType: S.String,
          ExcludedParticipantIds: S.optional(__S(128, __c16, 0)),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Revision: S.Number,
        }),
      ).annotate({ identifier: "GetConnectionPreferencesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPartnerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          LegalName: SensitiveString,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Profile: __S(64, __c8, 0),
          AwsTrainingCertificationEmailDomains: S.optional(__S(66, __c8, 2)),
        }),
      ).annotate({ identifier: "GetPartnerResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProfileUpdateTaskRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProfileVisibilityRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          Visibility: S.String,
          ProfileId: S.String,
        }),
      ).annotate({ identifier: "GetProfileVisibilityResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQualificationsAssociationDetailsRequest" });
    case 1:
      return S.Array(__S(184, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          Status: S.String,
          PrimaryPartner: S.optional(__S(184, __c23, 0)),
          AssociatedPartners: S.optional(__S(177, __c22, 1)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetQualificationsAssociationDetailsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.optional(S.String), AccountId: S.optional(S.String) }),
      ).annotate({ identifier: "QualificationsAssociationPartner" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQualificationsAssociationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          TaskId: S.String,
          Status: S.String,
          PrimaryPartner: __S(184, __c23, 0),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetQualificationsAssociationTaskResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQualificationsDisassociationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          TaskId: S.String,
          Status: S.String,
          AssociatedPartner: __S(184, __c23, 0),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetQualificationsDisassociationTaskResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VerificationType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVerificationRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LegalName: SensitiveString,
          RegistrationId: SensitiveString,
          CountryCode: S.String,
          JurisdictionOfIncorporation: S.optional(S.String),
        }),
      ).annotate({ identifier: "BusinessVerificationDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BusinessVerificationDetails: __S(216, __c27, 0),
          CompletionUrl: S.optional(S.String),
          CompletionUrlExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BusinessVerificationResponse" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompletionUrl: S.String,
          CompletionUrlExpiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "RegistrantVerificationResponse" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ BusinessVerificationResponse: __S(217, __c27, 1) }),
        /*@__PURE__*/ S.Struct({ RegistrantVerificationResponse: __S(218, __c27, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          VerificationType: S.String,
          VerificationStatus: S.String,
          VerificationStatusReason: S.optional(S.String),
          VerificationResponseDetails: __S(219, __c27, 3),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetVerificationResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          NextToken: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          OtherParticipantIdentifiers: S.optional(__S(128, __c16, 0)),
          ParticipantType: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectionInvitationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.String,
          Arn: S.String,
          ConnectionId: S.optional(S.String),
          ConnectionType: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OtherParticipantIdentifier: S.String,
          ParticipantType: S.String,
          Status: S.String,
        }),
      ).annotate({ identifier: "ConnectionInvitationSummary" });
    case 2:
      return S.Array(__S(225, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectionInvitationSummaries: __S(226, __c28, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectionInvitationsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          NextToken: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          OtherParticipantIdentifiers: S.optional(__S(128, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.String, OtherParticipant: __S(370, __c46, 2) }),
      ).annotate({ identifier: "ConnectionTypeSummary" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(233, __c29, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.String,
          Arn: S.String,
          OtherParticipantAccountId: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ConnectionTypes: __S(234, __c29, 2),
        }),
      ).annotate({ identifier: "ConnectionSummary" });
    case 4:
      return S.Array(__S(235, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ConnectionSummaries: __S(236, __c29, 4), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectionsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPartnersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          LegalName: SensitiveString,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PartnerSummary" });
    case 2:
      return S.Array(__S(241, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PartnerSummaryList: __S(242, __c30, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPartnersResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: S.optional(__S(73, __c9, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          AllianceLeadContact: __S(56, __c7, 0),
          EmailVerificationCode: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAllianceLeadContactRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String, Visibility: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutProfileVisibilityRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Reason: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RejectConnectionInvitationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Email: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SendEmailVerificationCodeRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          TaskDetails: __S(32, __c4, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartProfileUpdateTaskRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          PrimaryPartner: __S(184, __c23, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartQualificationsAssociationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          TaskId: S.String,
          Status: S.String,
          PrimaryPartner: __S(184, __c23, 0),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartQualificationsAssociationTaskResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          AssociatedPartner: __S(184, __c23, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartQualificationsDisassociationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.String,
          Id: S.String,
          TaskId: S.String,
          Status: S.String,
          AssociatedPartner: __S(184, __c23, 0),
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartQualificationsDisassociationTaskResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ BusinessVerificationDetails: __S(216, __c27, 0) }),
        /*@__PURE__*/ S.Struct({ RegistrantVerificationDetails: __S(384, __c48, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VerificationDetails: S.optional(__S(312, __c39, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartVerificationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(73, __c9, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(128, __c16, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Revision: S.Number,
          AccessType: S.String,
          ExcludedParticipantIdentifiers: S.optional(__S(128, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConnectionPreferencesRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String, Code: S.String }),
      ).annotate({ identifier: "FieldValidationError" });
    case 1:
      return S.suspend(() => S.Struct({ Message: S.String, Code: S.String })).annotate({
        identifier: "BusinessValidationError",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ FieldValidationError: __S(344, __c43, 0) }),
        /*@__PURE__*/ S.Struct({ BusinessValidationError: __S(345, __c43, 1) }),
      ]);
    case 3:
      return S.Array(__S(346, __c43, 2));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptConnectionInvitationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Connection: __S(362, __c45, 2) })).annotate({
        identifier: "AcceptConnectionInvitationResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          InviterEmail: S.String,
          InviterName: SensitiveString,
          Status: S.String,
          CanceledAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CanceledBy: S.optional(S.String),
          OtherParticipant: __S(370, __c46, 2),
        }),
      ).annotate({ identifier: "ConnectionTypeDetail" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(360, __c45, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.String,
          Arn: S.String,
          OtherParticipantAccountId: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ConnectionTypes: __S(361, __c45, 1),
        }),
      ).annotate({ identifier: "Connection" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String, Name: S.String })).annotate({
        identifier: "PartnerProfileSummary",
      });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "AccountSummary",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ PartnerProfile: __S(368, __c46, 0) }),
        /*@__PURE__*/ S.Struct({ SellerProfile: __S(368, __c46, 0) }),
        /*@__PURE__*/ S.Struct({ Account: __S(369, __c46, 1) }),
      ]);
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Email: S.String,
          EmailVerificationCode: SensitiveString,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateAwsTrainingCertificationEmailDomainRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateAwsTrainingCertificationEmailDomainResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ConnectionType: S.String,
          Reason: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelConnectionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
