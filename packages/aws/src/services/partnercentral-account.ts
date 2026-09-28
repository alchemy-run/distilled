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
  sdkId: "PartnerCentral Account",
  target: "PartnerCentralAccount",
  version: "2025-04-04",
  sigv4: "partnercentral-account",
  protocol: awsJson1_0Protocol,
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{
    readonly message: string;
    readonly Reason: AccessDeniedExceptionReason;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string; readonly Reason: ConflictExceptionReason }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly Reason: ResourceNotFoundExceptionReason;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly Reason: ServiceQuotaExceededExceptionReason;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly ServiceCode?: string;
    readonly QuotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly ErrorDetails?: ValidationError[];
  }> {}
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
export type ConnectionType =
  | "OPPORTUNITY_COLLABORATION"
  | "SUBSIDIARY"
  | (string & {});
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
  | {
      PartnerProfile: PartnerProfileSummary;
      SellerProfile?: never;
      Account?: never;
    }
  | {
      PartnerProfile?: never;
      SellerProfile: SellerProfileSummary;
      Account?: never;
    }
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
export type ConnectionTypeDetailMap = {
  [key in ConnectionType]?: ConnectionTypeDetail;
};
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
export type ProfileTaskStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
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
export type AccessType =
  | "ALLOW_ALL"
  | "DENY_ALL"
  | "ALLOW_BY_DEFAULT_DENY_SOME"
  | (string & {});
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
export type QualificationsAssociationStatus =
  | "ASSOCIATED"
  | "NOT_ASSOCIATED"
  | (string & {});
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
export type QualificationsAssociationTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
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
export type QualificationsDisassociationTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
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
export type VerificationType =
  | "BUSINESS_VERIFICATION"
  | "REGISTRANT_VERIFICATION"
  | (string & {});
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
export type ConnectionTypeSummaryMap = {
  [key in ConnectionType]?: ConnectionTypeSummary;
};
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
  | {
      FieldValidationError: FieldValidationError;
      BusinessValidationError?: never;
    }
  | {
      FieldValidationError?: never;
      BusinessValidationError: BusinessValidationError;
    };
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: {
      Connection: {
        UpdatedAt: D.ts,
        ConnectionTypes: D.map(o_ConnectionTypeDetail),
      },
    },
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
  operationName: "AcceptConnectionInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      Email: 0,
      EmailVerificationCode: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ConnectionType: 0,
      Reason: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { UpdatedAt: D.ts, ConnectionTypes: D.map(o_ConnectionTypeDetail) },
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
  operationName: "CancelConnection",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      ExpiresAt: D.ts,
      InviterName: D.secret,
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
  operationName: "CancelConnectionInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      TaskId: 0,
    },
    output: { StartedAt: D.ts, EndedAt: D.ts },
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
  operationName: "CancelProfileUpdateTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      ConnectionType: 0,
      Email: 0,
      Message: 0,
      Name: 0,
      ReceiverIdentifier: 0,
    },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      ExpiresAt: D.ts,
      InviterName: D.secret,
    },
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
  operationName: "CreateConnectionInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      LegalName: 0,
      PrimarySolutionType: 0,
      AllianceLeadContact: i_AllianceLeadContact,
      EmailVerificationCode: 0,
      Tags: D.list(i_Tag),
    },
    output: {
      LegalName: D.secret,
      CreatedAt: D.ts,
      AwsTrainingCertificationEmailDomains: D.list(o_PartnerDomain),
      AllianceLeadContact: o_AllianceLeadContact,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      DomainName: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { AllianceLeadContact: o_AllianceLeadContact },
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
  operationName: "GetAllianceLeadContact",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { UpdatedAt: D.ts, ConnectionTypes: D.map(o_ConnectionTypeDetail) },
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
  operationName: "GetConnection",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      ExpiresAt: D.ts,
      InviterName: D.secret,
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
  operationName: "GetConnectionInvitation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0 },
    output: { UpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      LegalName: D.secret,
      CreatedAt: D.ts,
      AwsTrainingCertificationEmailDomains: D.list(o_PartnerDomain),
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
  operationName: "GetPartner",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { StartedAt: D.ts, EndedAt: D.ts },
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
  operationName: "GetProfileUpdateTask",
})) as any;

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
  descriptor: { service: svc, input: { Catalog: 0, Identifier: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { UpdatedAt: D.ts },
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
  operationName: "GetQualificationsAssociationDetails",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { StartedAt: D.ts, EndedAt: D.ts },
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
  operationName: "GetQualificationsAssociationTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: { StartedAt: D.ts, EndedAt: D.ts },
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
  operationName: "GetQualificationsDisassociationTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: { VerificationType: 0 },
    output: {
      VerificationResponseDetails: o_VerificationResponseDetails,
      StartedAt: D.ts,
      CompletedAt: D.ts,
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
  operationName: "GetVerification",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      NextToken: 0,
      ConnectionType: 0,
      MaxResults: 0,
      OtherParticipantIdentifiers: 0,
      ParticipantType: 0,
      Status: 0,
    },
    output: {
      ConnectionInvitationSummaries: D.list({
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
        ExpiresAt: D.ts,
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      NextToken: 0,
      ConnectionType: 0,
      MaxResults: 0,
      OtherParticipantIdentifiers: 0,
    },
    output: { ConnectionSummaries: D.list({ UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { Catalog: 0, NextToken: 0 },
    output: {
      PartnerSummaryList: D.list({ LegalName: D.secret, CreatedAt: D.ts }),
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      AllianceLeadContact: i_AllianceLeadContact,
      EmailVerificationCode: 0,
    },
    output: { AllianceLeadContact: o_AllianceLeadContact },
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
  operationName: "PutAllianceLeadContact",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0, Visibility: 0 },
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
  operationName: "PutProfileVisibility",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      Reason: 0,
    },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      ExpiresAt: D.ts,
      InviterName: D.secret,
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
  operationName: "RejectConnectionInvitation",
})) as any;

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
  descriptor: { service: svc, input: { Catalog: 0, Email: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      TaskDetails: {
        DisplayName: 0,
        Description: 0,
        WebsiteUrl: 0,
        LogoUrl: 0,
        PrimarySolutionType: 0,
        IndustrySegments: 0,
        TranslationSourceLocale: 0,
        LocalizedContents: D.list({
          DisplayName: 0,
          Description: 0,
          WebsiteUrl: 0,
          LogoUrl: 0,
          Locale: 0,
        }),
        Headquarters: { CountryCode: 0, SubdivisionCode: 0 },
      },
    },
    output: { StartedAt: D.ts, EndedAt: D.ts },
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
  operationName: "StartProfileUpdateTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      PrimaryPartner: i_QualificationsAssociationPartner,
    },
    output: { StartedAt: D.ts },
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
  operationName: "StartQualificationsAssociationTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      ClientToken: D.m({ idempotency: true }),
      AssociatedPartner: i_QualificationsAssociationPartner,
    },
    output: { StartedAt: D.ts },
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
  operationName: "StartQualificationsDisassociationTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      VerificationDetails: {
        BusinessVerificationDetails: {
          LegalName: 0,
          RegistrationId: 0,
          CountryCode: 0,
          JurisdictionOfIncorporation: 0,
        },
        RegistrantVerificationDetails: {},
      },
    },
    output: {
      VerificationResponseDetails: o_VerificationResponseDetails,
      StartedAt: D.ts,
      CompletedAt: D.ts,
    },
  },
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
 * Adds or updates tags for a specified AWS Partner Central Account resource.
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
 * Removes specified tags from an AWS Partner Central Account resource.
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Revision: 0,
      AccessType: 0,
      ExcludedParticipantIdentifiers: 0,
    },
    output: { UpdatedAt: D.ts },
  },
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
})) as any;

const i_AllianceLeadContact: D.LazyStruct = () => ({
  FirstName: 0,
  LastName: 0,
  Email: 0,
  BusinessTitle: 0,
});
const i_QualificationsAssociationPartner: D.LazyStruct = () => ({
  ProfileId: 0,
  AccountId: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AllianceLeadContact: D.LazyStruct = () => ({
  FirstName: D.secret,
  LastName: D.secret,
  BusinessTitle: D.secret,
});
const o_ConnectionTypeDetail: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  InviterName: D.secret,
  CanceledAt: D.ts,
});
const o_PartnerDomain: D.LazyStruct = () => ({ RegisteredAt: D.ts });
const o_VerificationResponseDetails: D.LazyStruct = () => ({
  BusinessVerificationResponse: {
    BusinessVerificationDetails: {
      LegalName: D.secret,
      RegistrationId: D.secret,
    },
    CompletionUrlExpiresAt: D.ts,
  },
  RegistrantVerificationResponse: { CompletionUrlExpiresAt: D.ts },
});
