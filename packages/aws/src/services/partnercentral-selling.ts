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
  sdkId: "PartnerCentral Selling",
  target: "AWSPartnerCentralSelling",
  version: "2022-07-26",
  sigv4: "partnercentral-selling",
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
              `https://partnercentral-selling-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://partnercentral-selling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    readonly message?: string;
    readonly Reason?: AccessDeniedExceptionErrorCode;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
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
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly ErrorList?: ValidationExceptionError[];
  }> {}
export type CatalogIdentifier = string;
export type EngagementInvitationArnOrIdentifier = string;
export interface AcceptEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export interface AcceptEngagementInvitationResponse {}
export type OpportunityIdentifier = string;
export type Email = string | redacted.Redacted<string>;
export type Name = string | redacted.Redacted<string>;
export type PhoneNumber = string | redacted.Redacted<string>;
export type JobTitle = string | redacted.Redacted<string>;
export interface AssigneeContact {
  Email: string | redacted.Redacted<string>;
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
  BusinessTitle: string | redacted.Redacted<string>;
}
export interface AssignOpportunityRequest {
  Catalog: string;
  Identifier: string;
  Assignee: AssigneeContact;
}
export interface AssignOpportunityResponse {}
export type RelatedEntityType =
  | "Solutions"
  | "AwsProducts"
  | "AwsMarketplaceOffers"
  | "AwsMarketplaceOfferSets"
  | "AwsMarketplaceSolutions"
  | "AwsMarketplaceProducts"
  | (string & {});
export interface AssociateOpportunityRequest {
  Catalog: string;
  OpportunityIdentifier: string;
  RelatedEntityType: RelatedEntityType;
  RelatedEntityIdentifier: string;
}
export interface AssociateOpportunityResponse {}
export type ClientToken = string;
export type EngagementTitle = string;
export type EngagementDescription = string;
export type EngagementContextIdentifier = string;
export type EngagementContextType =
  | "CustomerProject"
  | "Lead"
  | "ProspectingResult"
  | (string & {});
export type Industry =
  | "Aerospace"
  | "Agriculture"
  | "Automotive"
  | "Computers and Electronics"
  | "Consumer Goods"
  | "Education"
  | "Energy - Oil and Gas"
  | "Energy - Power and Utilities"
  | "Financial Services"
  | "Gaming"
  | "Government"
  | "Healthcare"
  | "Hospitality"
  | "Life Sciences"
  | "Manufacturing"
  | "Marketing and Advertising"
  | "Media and Entertainment"
  | "Mining"
  | "Non-Profit Organization"
  | "Professional Services"
  | "Real Estate and Construction"
  | "Retail"
  | "Software and Internet"
  | "Telecommunications"
  | "Transportation and Logistics"
  | "Travel"
  | "Wholesale and Distribution"
  | "Other"
  | (string & {});
export type CompanyName = string | redacted.Redacted<string>;
export type CompanyWebsiteUrl = string | redacted.Redacted<string>;
export type CountryCode =
  | "US"
  | "AF"
  | "AX"
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
  | "BQ"
  | "BA"
  | "BW"
  | "BV"
  | "BR"
  | "IO"
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
  | "CG"
  | "CK"
  | "CR"
  | "CI"
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
  | "GF"
  | "PF"
  | "TF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GP"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HM"
  | "VA"
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
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KR"
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
  | "MQ"
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
  | "NF"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PS"
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
  | "GS"
  | "SS"
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
  | "TL"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "UM"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "VG"
  | "VI"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW"
  | (string & {});
export interface EngagementCustomer {
  Industry: Industry;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl: string | redacted.Redacted<string>;
  CountryCode: CountryCode;
}
export type EngagementCustomerProjectTitle = string;
export type EngagementCustomerBusinessProblem =
  | string
  | redacted.Redacted<string>;
export interface EngagementCustomerProjectDetails {
  Title: string;
  BusinessProblem: string | redacted.Redacted<string>;
  TargetCompletionDate: string;
}
export interface CustomerProjectsContext {
  Customer?: EngagementCustomer;
  Project?: EngagementCustomerProjectDetails;
}
export interface LeadInsights {
  LeadReadinessScore?: string;
}
export type LeadQualificationStatus = string;
export type LeadIndustry = string;
export type LeadWebsiteUrl = string | redacted.Redacted<string>;
export type LeadCountryCode = string | redacted.Redacted<string>;
export interface LeadAddress {
  City?: string;
  PostalCode?: string;
  StateOrRegion?: string;
  CountryCode?: string | redacted.Redacted<string>;
}
export type AwsMaturity = string;
export type LeadMarketSegment = string;
export interface LeadCustomer {
  Industry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  Address?: LeadAddress;
  AwsMaturity?: string;
  MarketSegment?: string;
}
export type LeadSourceType = string;
export type LeadSourceId = string;
export type LeadSourceName = string;
export type EngagementUseCase = string;
export type CustomerAction = string;
export type LeadBusinessProblem = string | redacted.Redacted<string>;
export type LeadJobTitle = string | redacted.Redacted<string>;
export type LeadEmail = string | redacted.Redacted<string>;
export type LeadPhoneNumber = string | redacted.Redacted<string>;
export interface LeadContact {
  BusinessTitle: string | redacted.Redacted<string>;
  Email: string | redacted.Redacted<string>;
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export interface LeadInteraction {
  SourceType?: string;
  SourceId?: string;
  SourceName?: string;
  Usecase?: string;
  InteractionDate?: Date;
  CustomerAction?: string;
  BusinessProblem?: string | redacted.Redacted<string>;
  Contact: LeadContact;
}
export type LeadInteractionList = LeadInteraction[];
export interface LeadContext {
  Insights?: LeadInsights;
  QualificationStatus?: string;
  Customer: LeadCustomer;
  Interactions: LeadInteraction[];
}
export type ProspectingAccountName = string;
export type ProspectingGeo = string;
export type ProspectingRegion = string;
export type ProspectingSubRegion = string;
export type ProspectingSubIndustry = string;
export type ProspectingSegment = string;
export type ProspectingCompanySize = string;
export type EligibleProgramsList = string[];
export type ProspectingPublicProfileSummary = string;
export interface ProspectingResultCustomer {
  AccountName?: string;
  Geo?: string;
  Region?: string;
  SubRegion?: string;
  Country?: CountryCode;
  Industry?: Industry;
  SubIndustry?: string;
  Segment?: string;
  CompanySize?: string;
  EligiblePrograms?: string[];
  PublicProfileSummary?: string;
}
export type EngagementScoreLevel = string;
export interface ProspectingInsights {
  MarketplaceEngagementScore?: string;
  SolutionScore?: string;
  SolutionCategory?: string;
  SolutionSubCategory?: string;
}
export type ProspectingTaskIdentifier = string;
export type TaskArn = string;
export type TaskName = string;
export interface ProspectingResultAws {
  Customer?: ProspectingResultCustomer;
  Insights?: ProspectingInsights;
  StartTime?: Date;
  EndTime?: Date;
  TaskId?: string;
  TaskArn?: string;
  TaskName?: string;
}
export interface ProspectingResult {
  Aws?: ProspectingResultAws;
}
export type EngagementContextPayload =
  | {
      CustomerProject: CustomerProjectsContext;
      Lead?: never;
      ProspectingResult?: never;
    }
  | { CustomerProject?: never; Lead: LeadContext; ProspectingResult?: never }
  | {
      CustomerProject?: never;
      Lead?: never;
      ProspectingResult: ProspectingResult;
    };
export interface EngagementContextDetails {
  Id?: string;
  Type: EngagementContextType;
  Payload?: EngagementContextPayload;
}
export type EngagementContexts = EngagementContextDetails[];
export interface CreateEngagementRequest {
  Catalog: string;
  ClientToken: string;
  Title?: string;
  Description?: string;
  Contexts?: EngagementContextDetails[];
}
export type EngagementIdentifier = string;
export type EngagementArn = string;
export interface CreateEngagementResponse {
  Id?: string;
  Arn?: string;
  ModifiedAt?: Date;
}
export type EngagementArnOrIdentifier = string;
export interface CreateEngagementContextRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ClientToken: string;
  Type: EngagementContextType;
  Payload: EngagementContextPayload;
}
export interface CreateEngagementContextResponse {
  EngagementId?: string;
  EngagementArn?: string;
  EngagementLastModifiedAt?: Date;
  ContextId?: string;
}
export type InvitationMessage = string | redacted.Redacted<string>;
export type Alias = string | redacted.Redacted<string>;
export type AwsAccount = string | redacted.Redacted<string>;
export interface AccountReceiver {
  Alias?: string | redacted.Redacted<string>;
  AwsAccountId: string | redacted.Redacted<string>;
}
export type Receiver = { Account: AccountReceiver };
export type SenderContactEmail = string | redacted.Redacted<string>;
export interface SenderContact {
  Email: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export type SenderContactList = SenderContact[];
export type ReceiverResponsibility =
  | "Distributor"
  | "Reseller"
  | "Hardware Partner"
  | "Managed Service Provider"
  | "Software Partner"
  | "Services Partner"
  | "Training Partner"
  | "Co-Sell Facilitator"
  | "Facilitator"
  | (string & {});
export type ReceiverResponsibilityList = ReceiverResponsibility[];
export type Amount = string | redacted.Redacted<string>;
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CNY"
  | "NZD"
  | "INR"
  | "JPY"
  | "CHF"
  | "SEK"
  | "AED"
  | "AFN"
  | "ALL"
  | "AMD"
  | "ANG"
  | "AOA"
  | "ARS"
  | "AWG"
  | "AZN"
  | "BAM"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BHD"
  | "BIF"
  | "BMD"
  | "BND"
  | "BOB"
  | "BOV"
  | "BRL"
  | "BSD"
  | "BTN"
  | "BWP"
  | "BYN"
  | "BZD"
  | "CDF"
  | "CHE"
  | "CHW"
  | "CLF"
  | "CLP"
  | "COP"
  | "COU"
  | "CRC"
  | "CUC"
  | "CUP"
  | "CVE"
  | "CZK"
  | "DJF"
  | "DKK"
  | "DOP"
  | "DZD"
  | "EGP"
  | "ERN"
  | "ETB"
  | "FJD"
  | "FKP"
  | "GEL"
  | "GHS"
  | "GIP"
  | "GMD"
  | "GNF"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "IQD"
  | "IRR"
  | "ISK"
  | "JMD"
  | "JOD"
  | "KES"
  | "KGS"
  | "KHR"
  | "KMF"
  | "KPW"
  | "KRW"
  | "KWD"
  | "KYD"
  | "KZT"
  | "LAK"
  | "LBP"
  | "LKR"
  | "LRD"
  | "LSL"
  | "LYD"
  | "MAD"
  | "MDL"
  | "MGA"
  | "MKD"
  | "MMK"
  | "MNT"
  | "MOP"
  | "MRU"
  | "MUR"
  | "MVR"
  | "MWK"
  | "MXN"
  | "MXV"
  | "MYR"
  | "MZN"
  | "NAD"
  | "NGN"
  | "NIO"
  | "NOK"
  | "NPR"
  | "OMR"
  | "PAB"
  | "PEN"
  | "PGK"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RON"
  | "RSD"
  | "RUB"
  | "RWF"
  | "SAR"
  | "SBD"
  | "SCR"
  | "SDG"
  | "SGD"
  | "SHP"
  | "SLL"
  | "SOS"
  | "SRD"
  | "SSP"
  | "STN"
  | "SVC"
  | "SYP"
  | "SZL"
  | "THB"
  | "TJS"
  | "TMT"
  | "TND"
  | "TOP"
  | "TRY"
  | "TTD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "UGX"
  | "USN"
  | "UYI"
  | "UYU"
  | "UZS"
  | "VEF"
  | "VND"
  | "VUV"
  | "WST"
  | "XAF"
  | "XCD"
  | "XDR"
  | "XOF"
  | "XPF"
  | "XSU"
  | "XUA"
  | "YER"
  | "ZAR"
  | "ZMW"
  | "ZWL"
  | (string & {});
export type PaymentFrequency = "Monthly" | (string & {});
export type EstimationUrl = string;
export interface ExpectedCustomerSpend {
  Amount?: string | redacted.Redacted<string>;
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TargetCompany: string;
  EstimationUrl?: string;
}
export type ExpectedCustomerSpendList = ExpectedCustomerSpend[];
export interface ProjectDetails {
  BusinessProblem: string | redacted.Redacted<string>;
  Title: string;
  TargetCompletionDate: string;
  ExpectedCustomerSpend: ExpectedCustomerSpend[];
}
export interface OpportunityInvitationPayload {
  SenderContacts?: SenderContact[];
  ReceiverResponsibilities: ReceiverResponsibility[];
  Customer: EngagementCustomer;
  Project: ProjectDetails;
}
export interface LeadInvitationCustomer {
  Industry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  CountryCode?: string | redacted.Redacted<string>;
  AwsMaturity?: string;
  MarketSegment?: string;
}
export interface LeadInvitationInteraction {
  SourceType?: string;
  SourceId?: string;
  SourceName?: string;
  Usecase?: string;
  ContactBusinessTitle: string | redacted.Redacted<string>;
}
export interface LeadInvitationPayload {
  Customer: LeadInvitationCustomer;
  Interaction: LeadInvitationInteraction;
}
export type Payload =
  | {
      OpportunityInvitation: OpportunityInvitationPayload;
      LeadInvitation?: never;
    }
  | { OpportunityInvitation?: never; LeadInvitation: LeadInvitationPayload };
export interface Invitation {
  Message: string | redacted.Redacted<string>;
  Receiver: Receiver;
  Payload: Payload;
}
export interface CreateEngagementInvitationRequest {
  Catalog: string;
  ClientToken: string;
  EngagementIdentifier: string;
  Invitation: Invitation;
}
export type EngagementInvitationIdentifier = string;
export type EngagementInvitationArn = string;
export interface CreateEngagementInvitationResponse {
  Id: string;
  Arn: string;
}
export type PrimaryNeedFromAws =
  | "Co-Sell - Architectural Validation"
  | "Co-Sell - Business Presentation"
  | "Co-Sell - Competitive Information"
  | "Co-Sell - Pricing Assistance"
  | "Co-Sell - Technical Consultation"
  | "Co-Sell - Total Cost of Ownership Evaluation"
  | "Co-Sell - Deal Support"
  | "Co-Sell - Support for Public Tender / RFx"
  | (string & {});
export type PrimaryNeedsFromAws = PrimaryNeedFromAws[];
export type NationalSecurity = "Yes" | "No" | (string & {});
export type WebsiteUrl = string | redacted.Redacted<string>;
export type AddressPart = string | redacted.Redacted<string>;
export interface Address {
  City?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  CountryCode?: CountryCode;
  StreetAddress?: string | redacted.Redacted<string>;
}
export type DunsNumber = string | redacted.Redacted<string>;
export interface Account {
  Industry?: Industry;
  OtherIndustry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  AwsAccountId?: string | redacted.Redacted<string>;
  Address?: Address;
  Duns?: string | redacted.Redacted<string>;
}
export interface Contact {
  Email?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export type CustomerContactsList = Contact[];
export interface Customer {
  Account?: Account;
  Contacts?: Contact[];
}
export type DeliveryModel =
  | "SaaS or PaaS"
  | "BYOL or AMI"
  | "Managed Services"
  | "Professional Services"
  | "Resell"
  | "Other"
  | (string & {});
export type DeliveryModels = DeliveryModel[];
export type ExpectedContractDurationTerm = "Months" | (string & {});
export interface ExpectedContractDuration {
  Term: ExpectedContractDurationTerm;
  Value: string;
}
export type PiiString = string | redacted.Redacted<string>;
export type ApnPrograms = string[];
export type SalesActivity =
  | "Initialized discussions with customer"
  | "Customer has shown interest in solution"
  | "Conducted POC / Demo"
  | "In evaluation / planning stage"
  | "Agreed on solution to Business Problem"
  | "Completed Action Plan"
  | "Finalized Deployment Need"
  | "SOW Signed"
  | (string & {});
export type SalesActivities = SalesActivity[];
export type CompetitorName =
  | "Oracle Cloud"
  | "On-Prem"
  | "Co-location"
  | "Akamai"
  | "AliCloud"
  | "Google Cloud Platform"
  | "IBM Softlayer"
  | "Microsoft Azure"
  | "Other- Cost Optimization"
  | "No Competition"
  | "*Other"
  | (string & {});
export type AwsPartition = "aws-eusc" | (string & {});
export interface Project {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
  Title?: string | redacted.Redacted<string>;
  ApnPrograms?: string[];
  CustomerBusinessProblem?: string | redacted.Redacted<string>;
  CustomerUseCase?: string;
  RelatedOpportunityIdentifier?: string;
  SalesActivities?: SalesActivity[];
  CompetitorName?: CompetitorName;
  OtherCompetitorNames?: string;
  OtherSolutionDescription?: string | redacted.Redacted<string>;
  AdditionalComments?: string;
  AwsPartition?: AwsPartition;
}
export type OpportunityType =
  | "Net New Business"
  | "Flat Renewal"
  | "Expansion"
  | (string & {});
export type MarketingSource = "Marketing Activity" | "None" | (string & {});
export type UseCases = string[];
export type Channel =
  | "AWS Marketing Central"
  | "Content Syndication"
  | "Display"
  | "Email"
  | "Live Event"
  | "Out Of Home (OOH)"
  | "Print"
  | "Search"
  | "Social"
  | "Telemarketing"
  | "TV"
  | "Video"
  | "Virtual Event"
  | (string & {});
export type Channels = Channel[];
export type AwsFundingUsed = "Yes" | "No" | (string & {});
export interface Marketing {
  CampaignName?: string;
  Source?: MarketingSource;
  UseCases?: string[];
  Channels?: Channel[];
  AwsFundingUsed?: AwsFundingUsed;
}
export type RevenueModel =
  | "Contract"
  | "Pay-as-you-go"
  | "Subscription"
  | (string & {});
export interface MonetaryValue {
  Amount: string;
  CurrencyCode: CurrencyCode;
}
export interface SoftwareRevenue {
  DeliveryModel?: RevenueModel;
  Value?: MonetaryValue;
  EffectiveDate?: string;
  ExpirationDate?: string;
}
export type Stage =
  | "Prospect"
  | "Qualified"
  | "Technical Validation"
  | "Business Validation"
  | "Committed"
  | "Launched"
  | "Closed Lost"
  | (string & {});
export type ClosedLostReason =
  | "Customer Deficiency"
  | "Delay / Cancellation of Project"
  | "Legal / Tax / Regulatory"
  | "Lost to Competitor - Google"
  | "Lost to Competitor - Microsoft"
  | "Lost to Competitor - SoftLayer"
  | "Lost to Competitor - VMWare"
  | "Lost to Competitor - Other"
  | "No Opportunity"
  | "On Premises Deployment"
  | "Partner Gap"
  | "Price"
  | "Security / Compliance"
  | "Technical Limitations"
  | "Customer Experience"
  | "Other"
  | "People/Relationship/Governance"
  | "Product/Technology"
  | "Financial/Commercial"
  | (string & {});
export type ReviewStatus =
  | "Pending Submission"
  | "Submitted"
  | "In review"
  | "Approved"
  | "Rejected"
  | "Action Required"
  | (string & {});
export interface NextStepsHistory {
  Value: string;
  Time: Date;
}
export type NextStepsHistories = NextStepsHistory[];
export interface LifeCycle {
  Stage?: Stage;
  ClosedLostReason?: ClosedLostReason;
  NextSteps?: string | redacted.Redacted<string>;
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  ReviewComments?: string;
  ReviewStatusReason?: string;
  NextStepsHistory?: NextStepsHistory[];
}
export type OpportunityOrigin =
  | "AWS Referral"
  | "Partner Referral"
  | (string & {});
export type PartnerOpportunityTeamMembersList = Contact[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateOpportunityRequest {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  ClientToken: string;
  LifeCycle?: LifeCycle;
  Origin?: OpportunityOrigin;
  OpportunityTeam?: Contact[];
  Tags?: Tag[];
}
export interface CreateOpportunityResponse {
  Id: string;
  PartnerOpportunityIdentifier?: string;
  LastModifiedDate?: Date;
}
export type ResourceType = "Opportunity" | (string & {});
export type ResourceIdentifier = string;
export type ResourceTemplateName = string;
export interface CreateResourceSnapshotRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  ClientToken: string;
}
export type ResourceArn = string;
export type ResourceSnapshotRevision = number;
export interface CreateResourceSnapshotResponse {
  Arn?: string;
  Revision?: number;
}
export interface CreateResourceSnapshotJobRequest {
  Catalog: string;
  ClientToken: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Tags?: Tag[];
}
export type ResourceSnapshotJobIdentifier = string;
export type ResourceSnapshotJobArn = string;
export interface CreateResourceSnapshotJobResponse {
  Id?: string;
  Arn?: string;
}
export interface DeleteResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export interface DeleteResourceSnapshotJobResponse {}
export interface DisassociateOpportunityRequest {
  Catalog: string;
  OpportunityIdentifier: string;
  RelatedEntityType: RelatedEntityType;
  RelatedEntityIdentifier: string;
}
export interface DisassociateOpportunityResponse {}
export interface GetAwsOpportunitySummaryRequest {
  Catalog: string;
  RelatedOpportunityIdentifier: string;
}
export type SalesInvolvementType =
  | "For Visibility Only"
  | "Co-Sell"
  | (string & {});
export type Visibility = "Full" | "Limited" | (string & {});
export type AwsClosedLostReason =
  | "Administrative"
  | "Business Associate Agreement"
  | "Company Acquired/Dissolved"
  | "Competitive Offering"
  | "Customer Data Requirement"
  | "Customer Deficiency"
  | "Customer Experience"
  | "Delay / Cancellation of Project"
  | "Duplicate"
  | "Duplicate Opportunity"
  | "Executive Blocker"
  | "Failed Vetting"
  | "Feature Limitation"
  | "Financial/Commercial"
  | "Insufficient Amazon Value"
  | "Insufficient AWS Value"
  | "International Constraints"
  | "Legal / Tax / Regulatory"
  | "Legal Terms and Conditions"
  | "Lost to Competitor"
  | "Lost to Competitor - Google"
  | "Lost to Competitor - Microsoft"
  | "Lost to Competitor - Other"
  | "Lost to Competitor - Rackspace"
  | "Lost to Competitor - SoftLayer"
  | "Lost to Competitor - VMWare"
  | "No Customer Reference"
  | "No Integration Resources"
  | "No Opportunity"
  | "No Perceived Value of MP"
  | "No Response"
  | "Not Committed to AWS"
  | "No Update"
  | "On Premises Deployment"
  | "Other"
  | "Other (Details in Description)"
  | "Partner Gap"
  | "Past Due"
  | "People/Relationship/Governance"
  | "Platform Technology Limitation"
  | "Preference for Competitor"
  | "Price"
  | "Product/Technology"
  | "Product Not on AWS"
  | "Security / Compliance"
  | "Self-Service"
  | "Technical Limitations"
  | "Term Sheet Impasse"
  | (string & {});
export type AwsOpportunityStage =
  | "Not Started"
  | "In Progress"
  | "Prospect"
  | "Engaged"
  | "Identified"
  | "Qualify"
  | "Research"
  | "Seller Engaged"
  | "Evaluating"
  | "Seller Registered"
  | "Term Sheet Negotiation"
  | "Contract Negotiation"
  | "Onboarding"
  | "Building Integration"
  | "Qualified"
  | "On-hold"
  | "Technical Validation"
  | "Business Validation"
  | "Committed"
  | "Launched"
  | "Deferred to Partner"
  | "Closed Lost"
  | "Completed"
  | "Closed Incomplete"
  | (string & {});
export interface ProfileNextStepsHistory {
  Value: string;
  Time: Date;
}
export type ProfileNextStepsHistories = ProfileNextStepsHistory[];
export interface AwsOpportunityLifeCycle {
  TargetCloseDate?: string;
  ClosedLostReason?: AwsClosedLostReason;
  Stage?: AwsOpportunityStage;
  NextSteps?: string | redacted.Redacted<string>;
  NextStepsHistory?: ProfileNextStepsHistory[];
}
export type AwsMemberBusinessTitle =
  | "AWSSalesRep"
  | "AWSAccountOwner"
  | "WWPSPDM"
  | "PDM"
  | "PSM"
  | "ISVSM"
  | "Signatory"
  | (string & {});
export interface AwsTeamMember {
  Email?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: AwsMemberBusinessTitle;
}
export type AwsOpportunityTeamMembersList = AwsTeamMember[];
export type EngagementScore = "High" | "Medium" | "Low" | (string & {});
export type MonetaryAmount = string | redacted.Redacted<string>;
export type AmountMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type StringList = string[];
export interface AwsProductOptimization {
  Description: string;
  SavingsAmount: string | redacted.Redacted<string>;
}
export type AwsProductOptimizationsList = AwsProductOptimization[];
export interface AwsProductDetails {
  ProductCode: string;
  ServiceCode?: string;
  Categories: string[];
  Amount?: string | redacted.Redacted<string>;
  OptimizedAmount?: string | redacted.Redacted<string>;
  PotentialSavingsAmount?: string | redacted.Redacted<string>;
  Optimizations: AwsProductOptimization[];
}
export type AwsProductsList = AwsProductDetails[];
export interface AwsProductInsights {
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TotalAmount?: string | redacted.Redacted<string>;
  TotalOptimizedAmount?: string | redacted.Redacted<string>;
  TotalPotentialSavingsAmount?: string | redacted.Redacted<string>;
  TotalAmountByCategory: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  AwsProducts: AwsProductDetails[];
}
export interface AwsProductsSpendInsightsBySource {
  Partner?: AwsProductInsights;
  AWS?: AwsProductInsights;
}
export interface OpportunityQuality {
  Score?: number;
  Trend?: string;
}
export type RecommendationAttributeMap = { [key: string]: string | undefined };
export interface Recommendation {
  Type: string;
  Details: string;
  Attributes?: { [key: string]: string | undefined };
}
export type RecommendationList = Recommendation[];
export interface AwsOpportunityInsights {
  NextBestActions?: string;
  EngagementScore?: EngagementScore;
  AwsProductsSpendInsightsBySource?: AwsProductsSpendInsightsBySource;
  OpportunityQuality?: OpportunityQuality;
  Recommendations?: Recommendation[];
}
export type InvolvementTypeChangeReason =
  | "Expansion Opportunity"
  | "Change in Deal Information"
  | "Customer Requested"
  | "Technical Complexity"
  | "Risk Mitigation"
  | (string & {});
export type AwsProductIdentifier = string;
export type AwsProductIdentifiers = string[];
export type SolutionIdentifier = string;
export type SolutionIdentifiers = string[];
export type AwsMarketplaceSolutionIdentifier = string;
export type AwsMarketplaceSolutionIdentifiers = string[];
export type AwsMarketplaceProductArn = string;
export type AwsMarketplaceProductIdentifiers = string[];
export interface AwsOpportunityRelatedEntities {
  AwsProducts?: string[];
  Solutions?: string[];
  AwsMarketplaceSolutions?: string[];
  AwsMarketplaceProducts?: string[];
}
export interface AwsOpportunityCustomer {
  Contacts?: Contact[];
}
export interface AwsOpportunityProject {
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  AwsPartition?: AwsPartition;
}
export interface AwsSoftwareRevenue {
  Value?: MonetaryValue;
  Discount?: string;
  EffectiveDate?: string;
  ExpirationDate?: string;
}
export interface GetAwsOpportunitySummaryResponse {
  RelatedOpportunityId?: string;
  Origin?: OpportunityOrigin;
  InvolvementType?: SalesInvolvementType;
  Visibility?: Visibility;
  LifeCycle?: AwsOpportunityLifeCycle;
  OpportunityTeam?: AwsTeamMember[];
  Insights?: AwsOpportunityInsights;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason;
  RelatedEntityIds?: AwsOpportunityRelatedEntities;
  Customer?: AwsOpportunityCustomer;
  Project?: AwsOpportunityProject;
  CosellMotion?: string;
  SoftwareRevenue?: AwsSoftwareRevenue;
  Catalog: string;
}
export interface GetEngagementRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetEngagementResponse {
  Id?: string;
  Arn?: string;
  Title?: string;
  Description?: string;
  CreatedAt?: Date;
  CreatedBy?: string | redacted.Redacted<string>;
  MemberCount?: number;
  ModifiedAt?: Date;
  ModifiedBy?: string | redacted.Redacted<string>;
  Contexts?: EngagementContextDetails[];
}
export interface GetEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export type EngagementInvitationPayloadType =
  | "OpportunityInvitation"
  | "LeadInvitation"
  | (string & {});
export type InvitationStatus =
  | "ACCEPTED"
  | "PENDING"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export type RejectionReasonString = string;
export type MemberCompanyName = string | redacted.Redacted<string>;
export interface EngagementMemberSummary {
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string;
}
export type EngagementMemberSummaries = EngagementMemberSummary[];
export interface InvitationProspectingResultAws {
  Customer?: ProspectingResultCustomer;
  Insights?: ProspectingInsights;
}
export interface EnrichmentContext {
  ProspectingResultAws?: InvitationProspectingResultAws;
  LeadInsights?: LeadInsights;
}
export interface GetEngagementInvitationResponse {
  Arn?: string;
  PayloadType?: EngagementInvitationPayloadType;
  Id: string;
  EngagementId?: string;
  EngagementTitle?: string;
  Status?: InvitationStatus;
  InvitationDate?: Date;
  ExpirationDate?: Date;
  SenderAwsAccountId?: string | redacted.Redacted<string>;
  SenderCompanyName?: string;
  Receiver?: Receiver;
  Catalog: string;
  RejectionReason?: string;
  Payload?: Payload;
  InvitationMessage?: string | redacted.Redacted<string>;
  EngagementDescription?: string;
  ExistingMembers?: EngagementMemberSummary[];
  EnrichmentContext?: EnrichmentContext;
}
export interface GetOpportunityRequest {
  Catalog: string;
  Identifier: string;
}
export type OpportunityArn = string;
export type AwsMarketplaceOfferIdentifier = string;
export type AwsMarketplaceOfferIdentifiers = string[];
export type AwsMarketplaceOfferSetIdentifier = string;
export type AwsMarketplaceOfferSetIdentifiers = string[];
export interface RelatedEntityIdentifiers {
  AwsMarketplaceOffers?: string[];
  AwsMarketplaceOfferSets?: string[];
  Solutions?: string[];
  AwsProducts?: string[];
  AwsMarketplaceSolutions?: string[];
  AwsMarketplaceProducts?: string[];
}
export interface GetOpportunityResponse {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  Id: string;
  Arn?: string;
  LastModifiedDate: Date;
  CreatedDate: Date;
  RelatedEntityIdentifiers: RelatedEntityIdentifiers;
  LifeCycle?: LifeCycle;
  OpportunityTeam?: Contact[];
}
export interface GetProspectingFromEngagementTaskRequest {
  Catalog: string;
  TaskIdentifier: string;
}
export type ProspectingTaskArn = string;
export type ProspectingTaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface EngagementProspectingResult {
  EngagementIdentifier: string;
  EngagementContextId?: string;
  Status: ProspectingTaskStatus;
  ReasonCode?: string;
  Message?: string;
}
export type EngagementProspectingResultList = EngagementProspectingResult[];
export interface GetProspectingFromEngagementTaskResponse {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date;
  Engagements: EngagementProspectingResult[];
}
export interface GetResourceSnapshotRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Revision?: number;
}
export interface LifeCycleForView {
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  Stage?: Stage;
  NextSteps?: string | redacted.Redacted<string>;
}
export interface ProjectView {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
  CustomerUseCase?: string;
  SalesActivities?: SalesActivity[];
  OtherSolutionDescription?: string | redacted.Redacted<string>;
}
export interface OpportunitySummaryView {
  OpportunityType?: OpportunityType;
  Lifecycle?: LifeCycleForView;
  OpportunityTeam?: Contact[];
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  Customer?: Customer;
  Project?: ProjectView;
  RelatedEntityIdentifiers?: RelatedEntityIdentifiers;
}
export interface AwsOpportunitySummaryFullView {
  RelatedOpportunityId?: string;
  Origin?: OpportunityOrigin;
  InvolvementType?: SalesInvolvementType;
  Visibility?: Visibility;
  LifeCycle?: AwsOpportunityLifeCycle;
  OpportunityTeam?: AwsTeamMember[];
  Insights?: AwsOpportunityInsights;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason;
  RelatedEntityIds?: AwsOpportunityRelatedEntities;
  Customer?: AwsOpportunityCustomer;
  Project?: AwsOpportunityProject;
  CosellMotion?: string;
  SoftwareRevenue?: AwsSoftwareRevenue;
}
export type ResourceSnapshotPayload =
  | {
      OpportunitySummary: OpportunitySummaryView;
      AwsOpportunitySummaryFullView?: never;
    }
  | {
      OpportunitySummary?: never;
      AwsOpportunitySummaryFullView: AwsOpportunitySummaryFullView;
    };
export type AwsAccountIdOrAliasList = (string | redacted.Redacted<string>)[];
export interface GetResourceSnapshotResponse {
  Catalog: string;
  Arn?: string;
  CreatedBy?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceSnapshotTemplateName?: string;
  Revision?: number;
  Payload?: ResourceSnapshotPayload;
  TargetMemberAccounts?: (string | redacted.Redacted<string>)[];
}
export interface GetResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export type ResourceSnapshotJobStatus = "Running" | "Stopped" | (string & {});
export interface GetResourceSnapshotJobResponse {
  Catalog: string;
  Id?: string;
  Arn?: string;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceArn?: string;
  ResourceSnapshotTemplateName?: string;
  CreatedAt?: Date;
  Status?: ResourceSnapshotJobStatus;
  LastSuccessfulExecutionDate?: Date;
  LastFailure?: string;
}
export interface GetSellingSystemSettingsRequest {
  Catalog: string;
}
export type ResourceSnapshotJobRoleArn = string;
export interface GetSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string;
}
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export type ListTasksSortName = "StartTime" | (string & {});
export interface ListTasksSortBase {
  SortOrder: SortOrder;
  SortBy: ListTasksSortName;
}
export type TaskStatus = "IN_PROGRESS" | "COMPLETE" | "FAILED" | (string & {});
export type TaskStatuses = TaskStatus[];
export type OpportunityIdentifiers = string[];
export type EngagementInvitationIdentifiers = string[];
export type TaskArnOrIdentifier = string;
export type TaskIdentifiers = string[];
export interface ListEngagementByAcceptingInvitationTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  OpportunityIdentifier?: string[];
  EngagementInvitationIdentifier?: string[];
  TaskIdentifier?: string[];
}
export type TaskIdentifier = string;
export type ReasonCode =
  | "InvitationAccessDenied"
  | "InvitationValidationFailed"
  | "EngagementAccessDenied"
  | "OpportunityAccessDenied"
  | "ResourceSnapshotJobAccessDenied"
  | "ResourceSnapshotJobValidationFailed"
  | "ResourceSnapshotJobConflict"
  | "EngagementValidationFailed"
  | "EngagementConflict"
  | "OpportunitySubmissionFailed"
  | "EngagementInvitationConflict"
  | "InternalError"
  | "OpportunityValidationFailed"
  | "OpportunityConflict"
  | "ResourceSnapshotAccessDenied"
  | "ResourceSnapshotValidationFailed"
  | "ResourceSnapshotConflict"
  | "ServiceQuotaExceeded"
  | "RequestThrottled"
  | "ContextNotFound"
  | "CustomerProjectContextNotPermitted"
  | "DisqualifiedLeadNotPermitted"
  | (string & {});
export interface ListEngagementByAcceptingInvitationTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementInvitationId?: string;
}
export type ListEngagementByAcceptingInvitationTaskSummaries =
  ListEngagementByAcceptingInvitationTaskSummary[];
export interface ListEngagementByAcceptingInvitationTasksResponse {
  TaskSummaries?: ListEngagementByAcceptingInvitationTaskSummary[];
  NextToken?: string;
}
export type EngagementIdentifiers = string[];
export interface ListEngagementFromOpportunityTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  TaskIdentifier?: string[];
  OpportunityIdentifier?: string[];
  EngagementIdentifier?: string[];
}
export interface ListEngagementFromOpportunityTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  EngagementInvitationId?: string;
}
export type ListEngagementFromOpportunityTaskSummaries =
  ListEngagementFromOpportunityTaskSummary[];
export interface ListEngagementFromOpportunityTasksResponse {
  TaskSummaries?: ListEngagementFromOpportunityTaskSummary[];
  NextToken?: string;
}
export type PageSize = number;
export type OpportunityEngagementInvitationSortName =
  | "InvitationDate"
  | (string & {});
export interface OpportunityEngagementInvitationSort {
  SortOrder: SortOrder;
  SortBy: OpportunityEngagementInvitationSortName;
}
export type EngagementInvitationsPayloadType =
  EngagementInvitationPayloadType[];
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export type InvitationStatusList = InvitationStatus[];
export interface ListEngagementInvitationsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: OpportunityEngagementInvitationSort;
  PayloadType?: EngagementInvitationPayloadType[];
  ParticipantType: ParticipantType;
  Status?: InvitationStatus[];
  EngagementIdentifier?: string[];
  SenderAwsAccountId?: (string | redacted.Redacted<string>)[];
}
export interface EngagementInvitationSummary {
  Arn?: string;
  PayloadType?: EngagementInvitationPayloadType;
  Id: string;
  EngagementId?: string;
  EngagementTitle?: string;
  Status?: InvitationStatus;
  InvitationDate?: Date;
  ExpirationDate?: Date;
  SenderAwsAccountId?: string | redacted.Redacted<string>;
  SenderCompanyName?: string;
  Receiver?: Receiver;
  Catalog: string;
  ParticipantType?: ParticipantType;
}
export type EngagementInvitationSummaries = EngagementInvitationSummary[];
export interface ListEngagementInvitationsResponse {
  EngagementInvitationSummaries?: EngagementInvitationSummary[];
  NextToken?: string;
}
export type MemberPageSize = number;
export interface ListEngagementMembersRequest {
  Catalog: string;
  Identifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface EngagementMember {
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string;
  AccountId?: string | redacted.Redacted<string>;
}
export type EngagementMembers = EngagementMember[];
export interface ListEngagementMembersResponse {
  EngagementMemberList: EngagementMember[];
  NextToken?: string;
}
export interface ListEngagementResourceAssociationsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string;
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export interface EngagementResourceAssociationSummary {
  Catalog: string;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export type EngagementResourceAssociationSummaryList =
  EngagementResourceAssociationSummary[];
export interface ListEngagementResourceAssociationsResponse {
  EngagementResourceAssociationSummaries: EngagementResourceAssociationSummary[];
  NextToken?: string;
}
export type AwsAccountList = (string | redacted.Redacted<string>)[];
export type EngagementContextTypeList = EngagementContextType[];
export type EngagementSortName = "CreatedDate" | (string & {});
export interface EngagementSort {
  SortOrder: SortOrder;
  SortBy: EngagementSortName;
}
export type EngagementPageSize = number;
export interface ListEngagementsRequest {
  Catalog: string;
  CreatedBy?: (string | redacted.Redacted<string>)[];
  ExcludeCreatedBy?: (string | redacted.Redacted<string>)[];
  ContextTypes?: EngagementContextType[];
  ExcludeContextTypes?: EngagementContextType[];
  Sort?: EngagementSort;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string[];
}
export interface EngagementSummary {
  Arn?: string;
  Id?: string;
  Title?: string;
  CreatedAt?: Date;
  CreatedBy?: string | redacted.Redacted<string>;
  MemberCount?: number;
  ModifiedAt?: Date;
  ModifiedBy?: string | redacted.Redacted<string>;
  ContextTypes?: EngagementContextType[];
}
export type EngagementSummaryList = EngagementSummary[];
export interface ListEngagementsResponse {
  EngagementSummaryList: EngagementSummary[];
  NextToken?: string;
}
export type OpportunitySortName =
  | "LastModifiedDate"
  | "Identifier"
  | "CustomerCompanyName"
  | "CreatedDate"
  | "TargetCloseDate"
  | (string & {});
export interface OpportunitySort {
  SortOrder: SortOrder;
  SortBy: OpportunitySortName;
}
export interface LastModifiedDate {
  AfterLastModifiedDate?: Date;
  BeforeLastModifiedDate?: Date;
}
export type FilterIdentifier = string[];
export type FilterLifeCycleStage = Stage[];
export type FilterLifeCycleReviewStatus = ReviewStatus[];
export interface CreatedDateFilter {
  AfterCreatedDate?: Date;
  BeforeCreatedDate?: Date;
}
export interface TargetCloseDateFilter {
  AfterTargetCloseDate?: string;
  BeforeTargetCloseDate?: string;
}
export interface ListOpportunitiesRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: OpportunitySort;
  LastModifiedDate?: LastModifiedDate;
  Identifier?: string[];
  LifeCycleStage?: Stage[];
  LifeCycleReviewStatus?: ReviewStatus[];
  CustomerCompanyName?: string[];
  CreatedDate?: CreatedDateFilter;
  TargetCloseDate?: TargetCloseDateFilter;
}
export interface LifeCycleSummary {
  Stage?: Stage;
  ClosedLostReason?: ClosedLostReason;
  NextSteps?: string | redacted.Redacted<string>;
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  ReviewComments?: string;
  ReviewStatusReason?: string;
}
export interface AddressSummary {
  City?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  CountryCode?: CountryCode;
}
export interface AccountSummary {
  Industry?: Industry;
  OtherIndustry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  Address?: AddressSummary;
}
export interface CustomerSummary {
  Account?: AccountSummary;
}
export interface ProjectSummary {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
}
export interface OpportunitySummary {
  Catalog: string;
  Id?: string;
  Arn?: string;
  PartnerOpportunityIdentifier?: string;
  OpportunityType?: OpportunityType;
  LastModifiedDate?: Date;
  CreatedDate?: Date;
  LifeCycle?: LifeCycleSummary;
  Customer?: CustomerSummary;
  Project?: ProjectSummary;
}
export type OpportunitySummaries = OpportunitySummary[];
export interface ListOpportunitiesResponse {
  OpportunitySummaries: OpportunitySummary[];
  NextToken?: string;
}
export type ContextIdentifier = string;
export type ContextIdentifiers = string[];
export interface ListOpportunityFromEngagementTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  TaskIdentifier?: string[];
  OpportunityIdentifier?: string[];
  EngagementIdentifier?: string[];
  ContextIdentifier?: string[];
}
export interface ListOpportunityFromEngagementTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  ContextId?: string;
}
export type ListOpportunityFromEngagementTaskSummaries =
  ListOpportunityFromEngagementTaskSummary[];
export interface ListOpportunityFromEngagementTasksResponse {
  TaskSummaries?: ListOpportunityFromEngagementTaskSummary[];
  NextToken?: string;
}
export type TaskIdentifierList = string[];
export type TaskNameList = string[];
export type ProspectingFromEngagementTaskSortName =
  | "StartTime"
  | "TaskName"
  | "FailedEngagementCount"
  | (string & {});
export interface ProspectingFromEngagementTaskSort {
  SortOrder: SortOrder;
  SortBy: ProspectingFromEngagementTaskSortName;
}
export interface ListProspectingFromEngagementTasksRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  TaskIdentifier?: string[];
  TaskName?: string[];
  StartAfter?: Date;
  StartBefore?: Date;
  Sort?: ProspectingFromEngagementTaskSort;
}
export interface ProspectingTaskSummary {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date;
  TotalEngagementCount: number;
  CompletedEngagementCount: number;
  FailedEngagementCount: number;
}
export type ProspectingTaskSummaryList = ProspectingTaskSummary[];
export interface ListProspectingFromEngagementTasksResponse {
  NextToken?: string;
  TaskSummaries: ProspectingTaskSummary[];
}
export type SortBy = "CreatedDate" | (string & {});
export interface SortObject {
  SortBy?: SortBy;
  SortOrder?: SortOrder;
}
export interface ListResourceSnapshotJobsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string;
  Status?: ResourceSnapshotJobStatus;
  Sort?: SortObject;
}
export interface ResourceSnapshotJobSummary {
  Id?: string;
  Arn?: string;
  EngagementId?: string;
  Status?: ResourceSnapshotJobStatus;
}
export type ResourceSnapshotJobSummaryList = ResourceSnapshotJobSummary[];
export interface ListResourceSnapshotJobsResponse {
  ResourceSnapshotJobSummaries: ResourceSnapshotJobSummary[];
  NextToken?: string;
}
export interface ListResourceSnapshotsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier: string;
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  ResourceSnapshotTemplateIdentifier?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export type ResourceSnapshotArn = string;
export interface ResourceSnapshotSummary {
  Arn?: string;
  Revision?: number;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceSnapshotTemplateName?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export type ResourceSnapshotSummaryList = ResourceSnapshotSummary[];
export interface ListResourceSnapshotsResponse {
  ResourceSnapshotSummaries: ResourceSnapshotSummary[];
  NextToken?: string;
}
export type SolutionSortName =
  | "Identifier"
  | "Name"
  | "Status"
  | "Category"
  | "CreatedDate"
  | (string & {});
export interface SolutionSort {
  SortOrder: SortOrder;
  SortBy: SolutionSortName;
}
export type SolutionStatus = "Active" | "Inactive" | "Draft" | (string & {});
export type FilterStatus = SolutionStatus[];
export type AwsMarketplaceSolutionArn = string;
export type AwsMarketplaceSolutionArnList = string[];
export interface ListSolutionsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: SolutionSort;
  Status?: SolutionStatus[];
  Identifier?: string[];
  Category?: string[];
  AwsMarketplaceSolutionArn?: string[];
}
export type SolutionArn = string;
export interface SolutionBase {
  Catalog: string;
  Id: string;
  Arn?: string;
  Name: string;
  Status: SolutionStatus;
  Category: string;
  CreatedDate: Date;
  AwsMarketplaceSolutionArn?: string;
}
export type SolutionList = SolutionBase[];
export interface ListSolutionsResponse {
  SolutionSummaries: SolutionBase[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}
export type ResourceSnapshotJobRoleIdentifier = string;
export interface PutSellingSystemSettingsRequest {
  Catalog: string;
  ResourceSnapshotJobRoleIdentifier?: string;
}
export interface PutSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string;
}
export interface RejectEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
  RejectionReason?: string;
}
export interface RejectEngagementInvitationResponse {}
export interface StartEngagementByAcceptingInvitationTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  Tags?: Tag[];
}
export interface StartEngagementByAcceptingInvitationTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementInvitationId?: string;
}
export interface AwsSubmission {
  InvolvementType: SalesInvolvementType;
  Visibility?: Visibility;
}
export interface StartEngagementFromOpportunityTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  AwsSubmission: AwsSubmission;
  Tags?: Tag[];
}
export interface StartEngagementFromOpportunityTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  EngagementInvitationId?: string;
}
export interface StartOpportunityFromEngagementTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  ContextIdentifier: string;
  Tags?: Tag[];
}
export interface StartOpportunityFromEngagementTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  ContextId?: string;
}
export type EngagementIdentifierList = string[];
export interface StartProspectingFromEngagementTaskRequest {
  Catalog: string;
  Identifiers: string[];
  TaskName: string;
  ClientToken: string;
}
export interface StartProspectingFromEngagementTaskResponse {
  Identifiers: string[];
  TaskName: string;
  Message?: string;
  ReasonCode?: string;
  StartTime: Date;
  TaskId?: string;
  TaskArn?: string;
  TaskStatus: ProspectingTaskStatus;
}
export interface StartResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export interface StartResourceSnapshotJobResponse {}
export interface StopResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export interface StopResourceSnapshotJobResponse {}
export interface SubmitOpportunityRequest {
  Catalog: string;
  Identifier: string;
  InvolvementType: SalesInvolvementType;
  Visibility?: Visibility;
}
export interface SubmitOpportunityResponse {}
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
export interface UpdateLeadContext {
  QualificationStatus?: string;
  Customer: LeadCustomer;
  Interaction?: LeadInteraction;
  Insights?: LeadInsights;
}
export type UpdateEngagementContextPayload =
  | {
      Lead: UpdateLeadContext;
      CustomerProject?: never;
      ProspectingResult?: never;
    }
  | {
      Lead?: never;
      CustomerProject: CustomerProjectsContext;
      ProspectingResult?: never;
    }
  | {
      Lead?: never;
      CustomerProject?: never;
      ProspectingResult: ProspectingResult;
    };
export interface UpdateEngagementContextRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ContextIdentifier: string;
  EngagementLastModifiedAt: Date;
  Type: EngagementContextType;
  Payload: UpdateEngagementContextPayload;
}
export interface UpdateEngagementContextResponse {
  EngagementId: string;
  EngagementArn: string;
  EngagementLastModifiedAt: Date;
  ContextId: string;
}
export interface UpdateOpportunityRequest {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  LastModifiedDate: Date;
  Identifier: string;
  LifeCycle?: LifeCycle;
}
export interface UpdateOpportunityResponse {
  Id: string;
  LastModifiedDate: Date;
}
export type AccessDeniedExceptionErrorCode =
  | "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE"
  | (string & {});
export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export type ValidationExceptionErrorCode =
  | "REQUIRED_FIELD_MISSING"
  | "INVALID_ENUM_VALUE"
  | "INVALID_STRING_FORMAT"
  | "INVALID_VALUE"
  | "NOT_ENOUGH_VALUES"
  | "TOO_MANY_VALUES"
  | "INVALID_RESOURCE_STATE"
  | "DUPLICATE_KEY_VALUE"
  | "VALUE_OUT_OF_RANGE"
  | "ACTION_NOT_PERMITTED"
  | (string & {});
export interface ValidationExceptionError {
  FieldName?: string;
  Message: string;
  Code: ValidationExceptionErrorCode;
}
export type ValidationExceptionErrorList = ValidationExceptionError[];
export type AcceptEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use the `AcceptEngagementInvitation` action to accept an engagement invitation shared by AWS. Accepting the invitation indicates your willingness to participate in the engagement, granting you access to all engagement-related data.
 */
export const acceptEngagementInvitation: API.OperationMethod<
  AcceptEngagementInvitationRequest,
  AcceptEngagementInvitationResponse,
  AcceptEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Catalog: 0, Identifier: 0 } },
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
  operationName: "AcceptEngagementInvitation",
})) as any;

export type AssignOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to reassign an existing `Opportunity` to another user within your Partner Central account. The specified user receives the opportunity, and it appears on their Partner Central dashboard, allowing them to take necessary actions or proceed with the opportunity.
 *
 * This is useful for distributing opportunities to the appropriate team members or departments within your organization, ensuring that each opportunity is handled by the right person. By default, the opportunity owner is the one who creates it. Currently, there's no API to enumerate the list of available users.
 */
export const assignOpportunity: API.OperationMethod<
  AssignOpportunityRequest,
  AssignOpportunityResponse,
  AssignOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifier: 0,
      Assignee: {
        Email: 0,
        FirstName: 0,
        LastName: 0,
        Phone: 0,
        BusinessTitle: 0,
      },
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
  operationName: "AssignOpportunity",
})) as any;

export type AssociateOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to create a formal association between an `Opportunity` and various related entities, enriching the context and details of the opportunity for better collaboration and decision making. You can associate an opportunity with the following entity types:
 *
 * - Partner Solution: A software product or consulting practice created and delivered by Partners. Partner Solutions help customers address business challenges using Amazon Web Services services.
 *
 * - Amazon Web Services Products: Amazon Web Services offers many products and services that provide scalable, reliable, and cost-effective infrastructure solutions. For the latest list of Amazon Web Services products, see Amazon Web Services products.
 *
 * - Amazon Web Services Marketplace private offer: Allows Amazon Web Services Marketplace sellers to extend custom pricing and terms to individual Amazon Web Services customers. Sellers can negotiate custom prices, payment schedules, and end user license terms through private offers, enabling Amazon Web Services customers to acquire software solutions tailored to their specific needs. For more information, see Private offers in Amazon Web Services Marketplace.
 *
 * To obtain identifiers for these entities, use the following methods:
 *
 * - Solution: Use the `ListSolutions` operation.
 *
 * - AWS Products: For the latest list of Amazon Web Services products, see Amazon Web Services products.
 *
 * - Amazon Web Services Marketplace private offer: Use the Using the Amazon Web Services Marketplace Catalog API to list entities. Specifically, use the `ListEntities` operation to retrieve a list of private offers. The request returns the details of available private offers. For more information, see ListEntities.
 */
export const associateOpportunity: API.OperationMethod<
  AssociateOpportunityRequest,
  AssociateOpportunityResponse,
  AssociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      OpportunityIdentifier: 0,
      RelatedEntityType: 0,
      RelatedEntityIdentifier: 0,
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
  operationName: "AssociateOpportunity",
})) as any;

export type CreateEngagementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateEngagement` action allows you to create an `Engagement`, which serves as a collaborative space between different parties such as AWS Partners and AWS Sellers. This action automatically adds the caller's AWS account as an active member of the newly created `Engagement`.
 */
export const createEngagement: API.OperationMethod<
  CreateEngagementRequest,
  CreateEngagementResponse,
  CreateEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      Title: 0,
      Description: 0,
      Contexts: D.list({ Id: 0, Type: 0, Payload: i_EngagementContextPayload }),
    },
    output: { ModifiedAt: D.ts },
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
  operationName: "CreateEngagement",
})) as any;

export type CreateEngagementContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new context within an existing engagement. This action allows you to add contextual information such as customer projects or documents to an engagement, providing additional details that help facilitate collaboration between engagement members.
 */
export const createEngagementContext: API.OperationMethod<
  CreateEngagementContextRequest,
  CreateEngagementContextResponse,
  CreateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      EngagementIdentifier: 0,
      ClientToken: D.m({ idempotency: true }),
      Type: 0,
      Payload: i_EngagementContextPayload,
    },
    output: { EngagementLastModifiedAt: D.ts },
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
  operationName: "CreateEngagementContext",
})) as any;

export type CreateEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates an invitation from a sender to a single receiver to join an engagement.
 */
export const createEngagementInvitation: API.OperationMethod<
  CreateEngagementInvitationRequest,
  CreateEngagementInvitationResponse,
  CreateEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      EngagementIdentifier: 0,
      Invitation: {
        Message: 0,
        Receiver: { Account: { Alias: 0, AwsAccountId: 0 } },
        Payload: {
          OpportunityInvitation: {
            SenderContacts: D.list({
              Email: 0,
              FirstName: 0,
              LastName: 0,
              BusinessTitle: 0,
              Phone: 0,
            }),
            ReceiverResponsibilities: 0,
            Customer: i_EngagementCustomer,
            Project: {
              BusinessProblem: 0,
              Title: 0,
              TargetCompletionDate: 0,
              ExpectedCustomerSpend: D.list(i_ExpectedCustomerSpend),
            },
          },
          LeadInvitation: {
            Customer: {
              Industry: 0,
              CompanyName: 0,
              WebsiteUrl: 0,
              CountryCode: 0,
              AwsMaturity: 0,
              MarketSegment: 0,
            },
            Interaction: {
              SourceType: 0,
              SourceId: 0,
              SourceName: 0,
              Usecase: 0,
              ContactBusinessTitle: 0,
            },
          },
        },
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
  operationName: "CreateEngagementInvitation",
})) as any;

export type CreateOpportunityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an `Opportunity` record in Partner Central. Use this operation to create a potential business opportunity for submission to Amazon Web Services. Creating an opportunity sets `Lifecycle.ReviewStatus` to `Pending Submission`.
 *
 * To submit an opportunity, follow these steps:
 *
 * - To create the opportunity, use `CreateOpportunity`.
 *
 * - To associate a solution with the opportunity, use `AssociateOpportunity`.
 *
 * - To start the engagement with AWS, use `StartEngagementFromOpportunity`.
 *
 * After submission, you can't edit the opportunity until the review is complete. But opportunities in the `Pending Submission` state must have complete details. You can update the opportunity while it's in the `Pending Submission` state.
 *
 * There's a set of mandatory fields to create opportunities, but consider providing optional fields to enrich the opportunity record.
 */
export const createOpportunity: API.OperationMethod<
  CreateOpportunityRequest,
  CreateOpportunityResponse,
  CreateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      PrimaryNeedsFromAws: 0,
      NationalSecurity: 0,
      PartnerOpportunityIdentifier: 0,
      Customer: i_Customer,
      Project: i_Project,
      OpportunityType: 0,
      Marketing: i_Marketing,
      SoftwareRevenue: i_SoftwareRevenue,
      ClientToken: D.m({ idempotency: true }),
      LifeCycle: i_LifeCycle,
      Origin: 0,
      OpportunityTeam: D.list(i_Contact),
      Tags: D.list(i_Tag),
    },
    output: { LastModifiedDate: D.ts },
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
  operationName: "CreateOpportunity",
})) as any;

export type CreateResourceSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action allows you to create an immutable snapshot of a specific resource, such as an opportunity, within the context of an engagement. The snapshot captures a subset of the resource's data based on the schema defined by the provided template.
 */
export const createResourceSnapshot: API.OperationMethod<
  CreateResourceSnapshotRequest,
  CreateResourceSnapshotResponse,
  CreateResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      EngagementIdentifier: 0,
      ResourceType: 0,
      ResourceIdentifier: 0,
      ResourceSnapshotTemplateIdentifier: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateResourceSnapshot",
})) as any;

export type CreateResourceSnapshotJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to create a job to generate a snapshot of the specified resource within an engagement. It initiates an asynchronous process to create a resource snapshot. The job creates a new snapshot only if the resource state has changed, adhering to the same access control and immutability rules as direct snapshot creation.
 */
export const createResourceSnapshotJob: API.OperationMethod<
  CreateResourceSnapshotJobRequest,
  CreateResourceSnapshotJobResponse,
  CreateResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      EngagementIdentifier: 0,
      ResourceType: 0,
      ResourceIdentifier: 0,
      ResourceSnapshotTemplateIdentifier: 0,
      Tags: D.list(i_Tag),
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
  operationName: "CreateResourceSnapshotJob",
})) as any;

export type DeleteResourceSnapshotJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to deletes a previously created resource snapshot job. The job must be in a stopped state before it can be deleted.
 */
export const deleteResourceSnapshotJob: API.OperationMethod<
  DeleteResourceSnapshotJobRequest,
  DeleteResourceSnapshotJobResponse,
  DeleteResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, ResourceSnapshotJobIdentifier: 0 },
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
  operationName: "DeleteResourceSnapshotJob",
})) as any;

export type DisassociateOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to remove an existing association between an `Opportunity` and related entities, such as a Partner Solution, Amazon Web Services product, or an Amazon Web Services Marketplace offer. This operation is the counterpart to `AssociateOpportunity`, and it provides flexibility to manage associations as business needs change.
 *
 * Use this operation to update the associations of an `Opportunity` due to changes in the related entities, or if an association was made in error. Ensuring accurate associations helps maintain clarity and accuracy to track and manage business opportunities. When you replace an entity, first attach the new entity and then disassociate the one to be removed, especially if it's the last remaining entity that's required.
 */
export const disassociateOpportunity: API.OperationMethod<
  DisassociateOpportunityRequest,
  DisassociateOpportunityResponse,
  DisassociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      OpportunityIdentifier: 0,
      RelatedEntityType: 0,
      RelatedEntityIdentifier: 0,
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
  operationName: "DisassociateOpportunity",
})) as any;

export type GetAwsOpportunitySummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a summary of an AWS Opportunity. This summary includes high-level details about the opportunity sourced from AWS, such as lifecycle information, customer details, and involvement type. It is useful for tracking updates on the AWS opportunity corresponding to an opportunity in the partner's account.
 */
export const getAwsOpportunitySummary: API.OperationMethod<
  GetAwsOpportunitySummaryRequest,
  GetAwsOpportunitySummaryResponse,
  GetAwsOpportunitySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, RelatedOpportunityIdentifier: 0 },
    output: {
      LifeCycle: o_AwsOpportunityLifeCycle,
      OpportunityTeam: D.list(o_AwsTeamMember),
      Insights: o_AwsOpportunityInsights,
      Customer: o_AwsOpportunityCustomer,
      Project: o_AwsOpportunityProject,
      SoftwareRevenue: o_AwsSoftwareRevenue,
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
  operationName: "GetAwsOpportunitySummary",
})) as any;

export type GetEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieve the engagement record for a given `EngagementIdentifier`.
 */
export const getEngagement: API.OperationMethod<
  GetEngagementRequest,
  GetEngagementResponse,
  GetEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      CreatedAt: D.ts,
      CreatedBy: D.secret,
      ModifiedAt: D.ts,
      ModifiedBy: D.secret,
      Contexts: D.list({
        Payload: {
          CustomerProject: {
            Customer: o_EngagementCustomer,
            Project: { BusinessProblem: D.secret },
          },
          Lead: {
            Customer: {
              CompanyName: D.secret,
              WebsiteUrl: D.secret,
              Address: { CountryCode: D.secret },
            },
            Interactions: D.list({
              InteractionDate: D.ts,
              BusinessProblem: D.secret,
              Contact: {
                BusinessTitle: D.secret,
                Email: D.secret,
                FirstName: D.secret,
                LastName: D.secret,
                Phone: D.secret,
              },
            }),
          },
          ProspectingResult: {
            Aws: {
              Customer: o_ProspectingResultCustomer,
              StartTime: D.ts,
              EndTime: D.ts,
            },
          },
        },
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
  operationName: "GetEngagement",
})) as any;

export type GetEngagementInvitationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an engagement invitation shared by AWS with a partner. The information includes aspects such as customer, project details, and lifecycle information. To connect an engagement invitation with an opportunity, match the invitation’s `Payload.Project.Title` with opportunity `Project.Title`.
 */
export const getEngagementInvitation: API.OperationMethod<
  GetEngagementInvitationRequest,
  GetEngagementInvitationResponse,
  GetEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      InvitationDate: D.ts,
      ExpirationDate: D.ts,
      SenderAwsAccountId: D.secret,
      Receiver: o_Receiver,
      Payload: {
        OpportunityInvitation: {
          SenderContacts: D.list({
            Email: D.secret,
            FirstName: D.secret,
            LastName: D.secret,
            BusinessTitle: D.secret,
            Phone: D.secret,
          }),
          Customer: o_EngagementCustomer,
          Project: {
            BusinessProblem: D.secret,
            ExpectedCustomerSpend: D.list(o_ExpectedCustomerSpend),
          },
        },
        LeadInvitation: {
          Customer: {
            CompanyName: D.secret,
            WebsiteUrl: D.secret,
            CountryCode: D.secret,
          },
          Interaction: { ContactBusinessTitle: D.secret },
        },
      },
      InvitationMessage: D.secret,
      ExistingMembers: D.list({ CompanyName: D.secret }),
      EnrichmentContext: {
        ProspectingResultAws: { Customer: o_ProspectingResultCustomer },
      },
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
  operationName: "GetEngagementInvitation",
})) as any;

export type GetOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the `Opportunity` record from Partner Central by a given `Identifier`.
 *
 * Use the `ListOpportunities` action or the event notification (from Amazon EventBridge) to obtain this identifier.
 */
export const getOpportunity: API.OperationMethod<
  GetOpportunityRequest,
  GetOpportunityResponse,
  GetOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      Customer: o_Customer,
      Project: {
        ExpectedCustomerSpend: D.list(o_ExpectedCustomerSpend),
        Title: D.secret,
        CustomerBusinessProblem: D.secret,
        OtherSolutionDescription: D.secret,
      },
      SoftwareRevenue: { Value: o_MonetaryValue },
      LastModifiedDate: D.ts,
      CreatedDate: D.ts,
      LifeCycle: {
        NextSteps: D.secret,
        NextStepsHistory: D.list({ Time: D.ts }),
      },
      OpportunityTeam: D.list(o_Contact),
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
  operationName: "GetOpportunity",
})) as any;

export type GetProspectingFromEngagementTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a prospecting task previously started with `StartProspectingFromEngagementTask` to enable polling for completion and access to per-engagement processing results.
 */
export const getProspectingFromEngagementTask: API.OperationMethod<
  GetProspectingFromEngagementTaskRequest,
  GetProspectingFromEngagementTaskResponse,
  GetProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, TaskIdentifier: 0 },
    output: { StartTime: D.ts, EndTime: D.ts },
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
  operationName: "GetProspectingFromEngagementTask",
})) as any;

export type GetResourceSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieve a specific snapshot record.
 */
export const getResourceSnapshot: API.OperationMethod<
  GetResourceSnapshotRequest,
  GetResourceSnapshotResponse,
  GetResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      EngagementIdentifier: 0,
      ResourceType: 0,
      ResourceIdentifier: 0,
      ResourceSnapshotTemplateIdentifier: 0,
      Revision: 0,
    },
    output: {
      CreatedBy: D.secret,
      CreatedAt: D.ts,
      Payload: {
        OpportunitySummary: {
          Lifecycle: { NextSteps: D.secret },
          OpportunityTeam: D.list(o_Contact),
          Customer: o_Customer,
          Project: {
            ExpectedCustomerSpend: D.list(o_ExpectedCustomerSpend),
            OtherSolutionDescription: D.secret,
          },
        },
        AwsOpportunitySummaryFullView: {
          LifeCycle: o_AwsOpportunityLifeCycle,
          OpportunityTeam: D.list(o_AwsTeamMember),
          Insights: o_AwsOpportunityInsights,
          Customer: o_AwsOpportunityCustomer,
          Project: o_AwsOpportunityProject,
          SoftwareRevenue: o_AwsSoftwareRevenue,
        },
      },
      TargetMemberAccounts: D.list(D.secret),
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
  operationName: "GetResourceSnapshot",
})) as any;

export type GetResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieves information about a specific resource snapshot job.
 */
export const getResourceSnapshotJob: API.OperationMethod<
  GetResourceSnapshotJobRequest,
  GetResourceSnapshotJobResponse,
  GetResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, ResourceSnapshotJobIdentifier: 0 },
    output: { CreatedAt: D.ts, LastSuccessfulExecutionDate: D.ts },
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
  operationName: "GetResourceSnapshotJob",
})) as any;

export type GetSellingSystemSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the currently set system settings, which include the IAM Role used for resource snapshot jobs.
 */
export const getSellingSystemSettings: API.OperationMethod<
  GetSellingSystemSettingsRequest,
  GetSellingSystemSettingsResponse,
  GetSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Catalog: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSellingSystemSettings",
})) as any;

export type ListEngagementByAcceptingInvitationTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed StartEngagementByAcceptingInvitationTask tasks that were initiated by the caller's account.
 */
export const listEngagementByAcceptingInvitationTasks: API.PaginatedOperationMethod<
  ListEngagementByAcceptingInvitationTasksRequest,
  ListEngagementByAcceptingInvitationTasksResponse,
  ListEngagementByAcceptingInvitationTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementByAcceptingInvitationTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Sort: i_ListTasksSortBase,
      Catalog: 0,
      TaskStatus: 0,
      OpportunityIdentifier: 0,
      EngagementInvitationIdentifier: 0,
      TaskIdentifier: 0,
    },
    output: { TaskSummaries: D.list({ StartTime: D.ts }) },
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
  operationName: "ListEngagementByAcceptingInvitationTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementFromOpportunityTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed `EngagementFromOpportunity` tasks that were initiated by the caller's account.
 */
export const listEngagementFromOpportunityTasks: API.PaginatedOperationMethod<
  ListEngagementFromOpportunityTasksRequest,
  ListEngagementFromOpportunityTasksResponse,
  ListEngagementFromOpportunityTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementFromOpportunityTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Sort: i_ListTasksSortBase,
      Catalog: 0,
      TaskStatus: 0,
      TaskIdentifier: 0,
      OpportunityIdentifier: 0,
      EngagementIdentifier: 0,
    },
    output: { TaskSummaries: D.list({ StartTime: D.ts }) },
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
  operationName: "ListEngagementFromOpportunityTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of engagement invitations sent to the partner. This allows partners to view all pending or past engagement invitations, helping them track opportunities shared by AWS.
 */
export const listEngagementInvitations: API.PaginatedOperationMethod<
  ListEngagementInvitationsRequest,
  ListEngagementInvitationsResponse,
  ListEngagementInvitationsError,
  Credentials | HttpClient.HttpClient,
  EngagementInvitationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      Sort: { SortOrder: 0, SortBy: 0 },
      PayloadType: 0,
      ParticipantType: 0,
      Status: 0,
      EngagementIdentifier: 0,
      SenderAwsAccountId: 0,
    },
    output: {
      EngagementInvitationSummaries: D.list({
        InvitationDate: D.ts,
        ExpirationDate: D.ts,
        SenderAwsAccountId: D.secret,
        Receiver: o_Receiver,
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
  operationName: "ListEngagementInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementInvitationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of member partners in an Engagement. This operation can only be invoked by members of the Engagement. The `ListEngagementMembers` operation allows you to fetch information about the members of a specific Engagement. This action is restricted to members of the Engagement being queried.
 */
export const listEngagementMembers: API.PaginatedOperationMethod<
  ListEngagementMembersRequest,
  ListEngagementMembersResponse,
  ListEngagementMembersError,
  Credentials | HttpClient.HttpClient,
  EngagementMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0, MaxResults: 0, NextToken: 0 },
    output: {
      EngagementMemberList: D.list({
        CompanyName: D.secret,
        AccountId: D.secret,
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
  operationName: "ListEngagementMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementMemberList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementResourceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between resources and engagements where the caller is a member and has at least one snapshot in the engagement.
 */
export const listEngagementResourceAssociations: API.PaginatedOperationMethod<
  ListEngagementResourceAssociationsRequest,
  ListEngagementResourceAssociationsResponse,
  ListEngagementResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  EngagementResourceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      EngagementIdentifier: 0,
      ResourceType: 0,
      ResourceIdentifier: 0,
      CreatedBy: 0,
    },
    output: {
      EngagementResourceAssociationSummaries: D.list({ CreatedBy: D.secret }),
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
  operationName: "ListEngagementResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementResourceAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action allows users to retrieve a list of Engagement records from Partner Central. This action can be used to manage and track various engagements across different stages of the partner selling process.
 */
export const listEngagements: API.PaginatedOperationMethod<
  ListEngagementsRequest,
  ListEngagementsResponse,
  ListEngagementsError,
  Credentials | HttpClient.HttpClient,
  EngagementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      CreatedBy: 0,
      ExcludeCreatedBy: 0,
      ContextTypes: 0,
      ExcludeContextTypes: 0,
      Sort: { SortOrder: 0, SortBy: 0 },
      MaxResults: 0,
      NextToken: 0,
      EngagementIdentifier: 0,
    },
    output: {
      EngagementSummaryList: D.list({
        CreatedAt: D.ts,
        CreatedBy: D.secret,
        ModifiedAt: D.ts,
        ModifiedBy: D.secret,
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
  operationName: "ListEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpportunitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This request accepts a list of filters that retrieve opportunity subsets as well as sort options. This feature is available to partners from Partner Central using the `ListOpportunities` API action.
 *
 * To synchronize your system with Amazon Web Services, list only the opportunities that were newly created or updated. We recommend you rely on events emitted by the service into your Amazon Web Services account’s Amazon EventBridge default event bus. You can also use the `ListOpportunities` action.
 *
 * We recommend the following approach:
 *
 * - Find the latest `LastModifiedDate` that you stored, and only use the values that came from Amazon Web Services. Don’t use values generated by your system.
 *
 * - When you send a `ListOpportunities` request, submit the date in ISO 8601 format in the `AfterLastModifiedDate` filter.
 *
 * - Amazon Web Services only returns opportunities created or updated on or after that date and time. Use `NextToken` to iterate over all pages.
 */
export const listOpportunities: API.PaginatedOperationMethod<
  ListOpportunitiesRequest,
  ListOpportunitiesResponse,
  ListOpportunitiesError,
  Credentials | HttpClient.HttpClient,
  OpportunitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      Sort: { SortOrder: 0, SortBy: 0 },
      LastModifiedDate: {
        AfterLastModifiedDate: D.tsAs("date-time"),
        BeforeLastModifiedDate: D.tsAs("date-time"),
      },
      Identifier: 0,
      LifeCycleStage: 0,
      LifeCycleReviewStatus: 0,
      CustomerCompanyName: 0,
      CreatedDate: {
        AfterCreatedDate: D.tsAs("date-time"),
        BeforeCreatedDate: D.tsAs("date-time"),
      },
      TargetCloseDate: { AfterTargetCloseDate: 0, BeforeTargetCloseDate: 0 },
    },
    output: {
      OpportunitySummaries: D.list({
        LastModifiedDate: D.ts,
        CreatedDate: D.ts,
        LifeCycle: { NextSteps: D.secret },
        Customer: {
          Account: {
            CompanyName: D.secret,
            WebsiteUrl: D.secret,
            Address: {
              City: D.secret,
              PostalCode: D.secret,
              StateOrRegion: D.secret,
              CountryCode: D.secret,
            },
          },
        },
        Project: { ExpectedCustomerSpend: D.list(o_ExpectedCustomerSpend) },
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
  operationName: "ListOpportunities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpportunitySummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpportunityFromEngagementTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed opportunity creation tasks from engagements that were initiated by the caller's account.
 */
export const listOpportunityFromEngagementTasks: API.PaginatedOperationMethod<
  ListOpportunityFromEngagementTasksRequest,
  ListOpportunityFromEngagementTasksResponse,
  ListOpportunityFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ListOpportunityFromEngagementTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Sort: i_ListTasksSortBase,
      Catalog: 0,
      TaskStatus: 0,
      TaskIdentifier: 0,
      OpportunityIdentifier: 0,
      EngagementIdentifier: 0,
      ContextIdentifier: 0,
    },
    output: { TaskSummaries: D.list({ StartTime: D.ts }) },
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
  operationName: "ListOpportunityFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProspectingFromEngagementTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all prospecting tasks initiated by the caller's account. Supports optional filters by task identifier, task name, or start time range. Results can be sorted using configurable options. The response is paginated. Use the `NextToken` value from each response to retrieve subsequent pages.
 */
export const listProspectingFromEngagementTasks: API.PaginatedOperationMethod<
  ListProspectingFromEngagementTasksRequest,
  ListProspectingFromEngagementTasksResponse,
  ListProspectingFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ProspectingTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      TaskIdentifier: 0,
      TaskName: 0,
      StartAfter: D.tsAs("date-time"),
      StartBefore: D.tsAs("date-time"),
      Sort: { SortOrder: 0, SortBy: 0 },
    },
    output: { TaskSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProspectingFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSnapshotJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists resource snapshot jobs owned by the customer. This operation supports various filtering scenarios, including listing all jobs owned by the caller, jobs for a specific engagement, jobs with a specific status, or any combination of these filters.
 */
export const listResourceSnapshotJobs: API.PaginatedOperationMethod<
  ListResourceSnapshotJobsRequest,
  ListResourceSnapshotJobsResponse,
  ListResourceSnapshotJobsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      EngagementIdentifier: 0,
      Status: 0,
      Sort: { SortBy: 0, SortOrder: 0 },
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
  operationName: "ListResourceSnapshotJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of resource view snapshots based on specified criteria. This operation supports various use cases, including:
 *
 * - Fetching all snapshots associated with an engagement.
 *
 * - Retrieving snapshots of a specific resource type within an engagement.
 *
 * - Obtaining snapshots for a particular resource using a specified template.
 *
 * - Accessing the latest snapshot of a resource within an engagement.
 *
 * - Filtering snapshots by resource owner.
 */
export const listResourceSnapshots: API.PaginatedOperationMethod<
  ListResourceSnapshotsRequest,
  ListResourceSnapshotsResponse,
  ListResourceSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      EngagementIdentifier: 0,
      ResourceType: 0,
      ResourceIdentifier: 0,
      ResourceSnapshotTemplateIdentifier: 0,
      CreatedBy: 0,
    },
    output: { ResourceSnapshotSummaries: D.list({ CreatedBy: D.secret }) },
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
  operationName: "ListResourceSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSolutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of Partner Solutions that the partner registered on Partner Central. This API is used to generate a list of solutions that an end user selects from for association with an opportunity.
 */
export const listSolutions: API.PaginatedOperationMethod<
  ListSolutionsRequest,
  ListSolutionsResponse,
  ListSolutionsError,
  Credentials | HttpClient.HttpClient,
  SolutionBase
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      MaxResults: 0,
      NextToken: 0,
      Sort: { SortOrder: 0, SortBy: 0 },
      Status: 0,
      Identifier: 0,
      Category: 0,
      AwsMarketplaceSolutionArn: 0,
    },
    output: { SolutionSummaries: D.list({ CreatedDate: D.ts }) },
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
  operationName: "ListSolutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SolutionSummaries",
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
 * Returns a list of tags for a resource.
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

export type PutSellingSystemSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the currently set system settings, which include the IAM Role used for resource snapshot jobs.
 */
export const putSellingSystemSettings: API.OperationMethod<
  PutSellingSystemSettingsRequest,
  PutSellingSystemSettingsResponse,
  PutSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, ResourceSnapshotJobRoleIdentifier: 0 },
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
  operationName: "PutSellingSystemSettings",
})) as any;

export type RejectEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action rejects an `EngagementInvitation` that AWS shared. Rejecting an invitation indicates that the partner doesn't want to pursue the opportunity, and all related data will become inaccessible thereafter.
 */
export const rejectEngagementInvitation: API.OperationMethod<
  RejectEngagementInvitationRequest,
  RejectEngagementInvitationResponse,
  RejectEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0, RejectionReason: 0 },
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
  operationName: "RejectEngagementInvitation",
})) as any;

export type StartEngagementByAcceptingInvitationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action starts the engagement by accepting an `EngagementInvitation`. The task is asynchronous and involves the following steps: accepting the invitation, creating an opportunity in the partner’s account from the AWS opportunity, and copying details for tracking. When completed, an `Opportunity Created` event is generated, indicating that the opportunity has been successfully created in the partner's account.
 */
export const startEngagementByAcceptingInvitationTask: API.OperationMethod<
  StartEngagementByAcceptingInvitationTaskRequest,
  StartEngagementByAcceptingInvitationTaskResponse,
  StartEngagementByAcceptingInvitationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
      Tags: D.list(i_Tag),
    },
    output: { StartTime: D.ts },
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
  operationName: "StartEngagementByAcceptingInvitationTask",
})) as any;

export type StartEngagementFromOpportunityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Similar to `StartEngagementByAcceptingInvitationTask`, this action is asynchronous and performs multiple steps before completion. This action orchestrates a comprehensive workflow that combines multiple API operations into a single task to create and initiate an engagement from an existing opportunity. It automatically executes a sequence of operations including `GetOpportunity`, `CreateEngagement` (if it doesn't exist), `CreateResourceSnapshot`, `CreateResourceSnapshotJob`, `CreateEngagementInvitation` (if not already invited/accepted), and `SubmitOpportunity`.
 */
export const startEngagementFromOpportunityTask: API.OperationMethod<
  StartEngagementFromOpportunityTaskRequest,
  StartEngagementFromOpportunityTaskResponse,
  StartEngagementFromOpportunityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
      AwsSubmission: { InvolvementType: 0, Visibility: 0 },
      Tags: D.list(i_Tag),
    },
    output: { StartTime: D.ts },
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
  operationName: "StartEngagementFromOpportunityTask",
})) as any;

export type StartOpportunityFromEngagementTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates an opportunity from an existing engagement context. The task is asynchronous and orchestrates the process of converting engagement contextual information into a structured opportunity record within the partner's account.
 */
export const startOpportunityFromEngagementTask: API.OperationMethod<
  StartOpportunityFromEngagementTaskRequest,
  StartOpportunityFromEngagementTaskResponse,
  StartOpportunityFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
      ContextIdentifier: 0,
      Tags: D.list(i_Tag),
    },
    output: { StartTime: D.ts },
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
  operationName: "StartOpportunityFromEngagementTask",
})) as any;

export type StartProspectingFromEngagementTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a task to convert one or more engagement contexts into new prospecting leads. The task runs asynchronously. To poll for status, use `GetProspectingFromEngagementTask`, or use `ListProspectingFromEngagementTasks` to monitor multiple tasks.
 */
export const startProspectingFromEngagementTask: API.OperationMethod<
  StartProspectingFromEngagementTaskRequest,
  StartProspectingFromEngagementTaskResponse,
  StartProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Identifiers: 0,
      TaskName: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { StartTime: D.ts },
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
  operationName: "StartProspectingFromEngagementTask",
})) as any;

export type StartResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a resource snapshot job that has been previously created.
 */
export const startResourceSnapshotJob: API.OperationMethod<
  StartResourceSnapshotJobRequest,
  StartResourceSnapshotJobResponse,
  StartResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, ResourceSnapshotJobIdentifier: 0 },
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
  operationName: "StartResourceSnapshotJob",
})) as any;

export type StopResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a resource snapshot job. The job must be started prior to being stopped.
 */
export const stopResourceSnapshotJob: API.OperationMethod<
  StopResourceSnapshotJobRequest,
  StopResourceSnapshotJobResponse,
  StopResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, ResourceSnapshotJobIdentifier: 0 },
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
  operationName: "StopResourceSnapshotJob",
})) as any;

export type SubmitOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to submit an Opportunity that was previously created by partner for AWS review. After you perform this action, the Opportunity becomes non-editable until it is reviewed by AWS and has ` LifeCycle.ReviewStatus ` as either `Approved` or `Action Required`.
 */
export const submitOpportunity: API.OperationMethod<
  SubmitOpportunityRequest,
  SubmitOpportunityResponse,
  SubmitOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0, InvolvementType: 0, Visibility: 0 },
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
  operationName: "SubmitOpportunity",
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
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
 * Removes a tag or tags from a resource.
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

export type UpdateEngagementContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the context information for an existing engagement with new or modified data.
 */
export const updateEngagementContext: API.OperationMethod<
  UpdateEngagementContextRequest,
  UpdateEngagementContextResponse,
  UpdateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      EngagementIdentifier: 0,
      ContextIdentifier: 0,
      EngagementLastModifiedAt: D.tsAs("date-time"),
      Type: 0,
      Payload: {
        Lead: {
          QualificationStatus: 0,
          Customer: i_LeadCustomer,
          Interaction: i_LeadInteraction,
          Insights: i_LeadInsights,
        },
        CustomerProject: i_CustomerProjectsContext,
        ProspectingResult: i_ProspectingResult,
      },
    },
    output: { EngagementLastModifiedAt: D.ts },
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
  operationName: "UpdateEngagementContext",
})) as any;

export type UpdateOpportunityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the `Opportunity` record identified by a given `Identifier`. This operation allows you to modify the details of an existing opportunity to reflect the latest information and progress. Use this action to keep the opportunity record up-to-date and accurate.
 *
 * When you perform updates, include the entire payload with each request. If any field is omitted, the API assumes that the field is set to `null`. The best practice is to always perform a `GetOpportunity` to retrieve the latest values, then send the complete payload with the updated values to be changed.
 */
export const updateOpportunity: API.OperationMethod<
  UpdateOpportunityRequest,
  UpdateOpportunityResponse,
  UpdateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      PrimaryNeedsFromAws: 0,
      NationalSecurity: 0,
      PartnerOpportunityIdentifier: 0,
      Customer: i_Customer,
      Project: i_Project,
      OpportunityType: 0,
      Marketing: i_Marketing,
      SoftwareRevenue: i_SoftwareRevenue,
      LastModifiedDate: D.tsAs("date-time"),
      Identifier: 0,
      LifeCycle: i_LifeCycle,
    },
    output: { LastModifiedDate: D.ts },
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
  operationName: "UpdateOpportunity",
})) as any;

const i_Contact: D.LazyStruct = () => ({
  Email: 0,
  FirstName: 0,
  LastName: 0,
  BusinessTitle: 0,
  Phone: 0,
});
const i_Customer: D.LazyStruct = () => ({
  Account: {
    Industry: 0,
    OtherIndustry: 0,
    CompanyName: 0,
    WebsiteUrl: 0,
    AwsAccountId: 0,
    Address: {
      City: 0,
      PostalCode: 0,
      StateOrRegion: 0,
      CountryCode: 0,
      StreetAddress: 0,
    },
    Duns: 0,
  },
  Contacts: D.list(i_Contact),
});
const i_CustomerProjectsContext: D.LazyStruct = () => ({
  Customer: i_EngagementCustomer,
  Project: { Title: 0, BusinessProblem: 0, TargetCompletionDate: 0 },
});
const i_EngagementContextPayload: D.LazyStruct = () => ({
  CustomerProject: i_CustomerProjectsContext,
  Lead: {
    Insights: i_LeadInsights,
    QualificationStatus: 0,
    Customer: i_LeadCustomer,
    Interactions: D.list(i_LeadInteraction),
  },
  ProspectingResult: i_ProspectingResult,
});
const i_EngagementCustomer: D.LazyStruct = () => ({
  Industry: 0,
  CompanyName: 0,
  WebsiteUrl: 0,
  CountryCode: 0,
});
const i_ExpectedCustomerSpend: D.LazyStruct = () => ({
  Amount: 0,
  CurrencyCode: 0,
  Frequency: 0,
  TargetCompany: 0,
  EstimationUrl: 0,
});
const i_LeadCustomer: D.LazyStruct = () => ({
  Industry: 0,
  CompanyName: 0,
  WebsiteUrl: 0,
  Address: { City: 0, PostalCode: 0, StateOrRegion: 0, CountryCode: 0 },
  AwsMaturity: 0,
  MarketSegment: 0,
});
const i_LeadInsights: D.LazyStruct = () => ({ LeadReadinessScore: 0 });
const i_LeadInteraction: D.LazyStruct = () => ({
  SourceType: 0,
  SourceId: 0,
  SourceName: 0,
  Usecase: 0,
  InteractionDate: D.tsAs("date-time"),
  CustomerAction: 0,
  BusinessProblem: 0,
  Contact: { BusinessTitle: 0, Email: 0, FirstName: 0, LastName: 0, Phone: 0 },
});
const i_LifeCycle: D.LazyStruct = () => ({
  Stage: 0,
  ClosedLostReason: 0,
  NextSteps: 0,
  TargetCloseDate: 0,
  ReviewStatus: 0,
  ReviewComments: 0,
  ReviewStatusReason: 0,
  NextStepsHistory: D.list({ Value: 0, Time: D.tsAs("date-time") }),
});
const i_ListTasksSortBase: D.LazyStruct = () => ({ SortOrder: 0, SortBy: 0 });
const i_Marketing: D.LazyStruct = () => ({
  CampaignName: 0,
  Source: 0,
  UseCases: 0,
  Channels: 0,
  AwsFundingUsed: 0,
});
const i_Project: D.LazyStruct = () => ({
  DeliveryModels: 0,
  ExpectedCustomerSpend: D.list(i_ExpectedCustomerSpend),
  ExpectedContractDuration: { Term: 0, Value: 0 },
  Title: 0,
  ApnPrograms: 0,
  CustomerBusinessProblem: 0,
  CustomerUseCase: 0,
  RelatedOpportunityIdentifier: 0,
  SalesActivities: 0,
  CompetitorName: 0,
  OtherCompetitorNames: 0,
  OtherSolutionDescription: 0,
  AdditionalComments: 0,
  AwsPartition: 0,
});
const i_ProspectingResult: D.LazyStruct = () => ({
  Aws: {
    Customer: {
      AccountName: 0,
      Geo: 0,
      Region: 0,
      SubRegion: 0,
      Country: 0,
      Industry: 0,
      SubIndustry: 0,
      Segment: 0,
      CompanySize: 0,
      EligiblePrograms: 0,
      PublicProfileSummary: 0,
    },
    Insights: {
      MarketplaceEngagementScore: 0,
      SolutionScore: 0,
      SolutionCategory: 0,
      SolutionSubCategory: 0,
    },
    StartTime: D.tsAs("date-time"),
    EndTime: D.tsAs("date-time"),
    TaskId: 0,
    TaskArn: 0,
    TaskName: 0,
  },
});
const i_SoftwareRevenue: D.LazyStruct = () => ({
  DeliveryModel: 0,
  Value: { Amount: 0, CurrencyCode: 0 },
  EffectiveDate: 0,
  ExpirationDate: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AwsOpportunityCustomer: D.LazyStruct = () => ({
  Contacts: D.list(o_Contact),
});
const o_AwsOpportunityInsights: D.LazyStruct = () => ({
  AwsProductsSpendInsightsBySource: {
    Partner: o_AwsProductInsights,
    AWS: o_AwsProductInsights,
  },
});
const o_AwsOpportunityLifeCycle: D.LazyStruct = () => ({
  NextSteps: D.secret,
  NextStepsHistory: D.list({ Time: D.ts }),
});
const o_AwsOpportunityProject: D.LazyStruct = () => ({
  ExpectedCustomerSpend: D.list(o_ExpectedCustomerSpend),
});
const o_AwsSoftwareRevenue: D.LazyStruct = () => ({ Value: o_MonetaryValue });
const o_AwsTeamMember: D.LazyStruct = () => ({
  Email: D.secret,
  FirstName: D.secret,
  LastName: D.secret,
});
const o_Contact: D.LazyStruct = () => ({
  Email: D.secret,
  FirstName: D.secret,
  LastName: D.secret,
  BusinessTitle: D.secret,
  Phone: D.secret,
});
const o_Customer: D.LazyStruct = () => ({
  Account: {
    CompanyName: D.secret,
    WebsiteUrl: D.secret,
    AwsAccountId: D.secret,
    Address: {
      City: D.secret,
      PostalCode: D.secret,
      StateOrRegion: D.secret,
      CountryCode: D.secret,
      StreetAddress: D.secret,
    },
    Duns: D.secret,
  },
  Contacts: D.list(o_Contact),
});
const o_EngagementCustomer: D.LazyStruct = () => ({
  CompanyName: D.secret,
  WebsiteUrl: D.secret,
  CountryCode: D.secret,
});
const o_ExpectedCustomerSpend: D.LazyStruct = () => ({
  Amount: D.secret,
  CurrencyCode: D.secret,
});
const o_MonetaryValue: D.LazyStruct = () => ({ CurrencyCode: D.secret });
const o_ProspectingResultCustomer: D.LazyStruct = () => ({ Country: D.secret });
const o_Receiver: D.LazyStruct = () => ({
  Account: { Alias: D.secret, AwsAccountId: D.secret },
});
const o_AwsProductInsights: D.LazyStruct = () => ({
  CurrencyCode: D.secret,
  TotalAmount: D.secret,
  TotalOptimizedAmount: D.secret,
  TotalPotentialSavingsAmount: D.secret,
  TotalAmountByCategory: D.map(D.secret),
  AwsProducts: D.list({
    Amount: D.secret,
    OptimizedAmount: D.secret,
    PotentialSavingsAmount: D.secret,
    Optimizations: D.list({ SavingsAmount: D.secret }),
  }),
});
