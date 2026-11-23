import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PartnerCentral Selling",
  serviceShapeName: "AWSPartnerCentralSelling",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral-selling" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
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
  '{"url":"https://partnercentral-selling.{R}.api.aws","properties":{},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "PartnerCentralSelling",
  service: "PartnerCentralSelling",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionErrorCode",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
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
    /*@__PURE__*/ T.HttpError(500),
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      ErrorList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2593, __c81, 1)).annotate({
          identifier: "ValidationExceptionErrorList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  Phone?: string | redacted.Redacted<string> | undefined;
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
export type WebsiteUrl = string | redacted.Redacted<string>;
export type DunsNumber = string | redacted.Redacted<string>;
export type AddressPart = string | redacted.Redacted<string>;
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
export interface Address {
  City?: string | redacted.Redacted<string> | undefined;
  PostalCode?: string | redacted.Redacted<string> | undefined;
  StateOrRegion?: string | redacted.Redacted<string> | undefined;
  CountryCode?: CountryCode | undefined;
  StreetAddress?: string | redacted.Redacted<string> | undefined;
}
export type Domain = string | redacted.Redacted<string>;
export interface CustomerAccountData {
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  Duns?: string | redacted.Redacted<string> | undefined;
  Address?: Address | undefined;
  Industry?: string | undefined;
  OtherIndustry?: string | undefined;
  Domain?: string | redacted.Redacted<string> | undefined;
  ParentCompanyName?: string | redacted.Redacted<string> | undefined;
}
export type PartnerAccountIdentifier = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type CustomerAccountTagList = Tag[];
export type ClientToken = string;
export interface CreateCustomerAccountRequest {
  Catalog: string;
  Account: CustomerAccountData;
  PartnerAccountIdentifier?: string | undefined;
  Tags?: Tag[] | undefined;
  ClientToken?: string | undefined;
}
export type CustomerAccountArn = string;
export type CustomerAccountId = string;
export type EnrichmentStatus =
  | "PENDING"
  | "ENRICHED"
  | "NO_MATCH_FOUND"
  | "ACTION_REQUIRED"
  | (string & {});
export interface CreateCustomerAccountResponse {
  Arn: string;
  Id: string;
  Status: EnrichmentStatus;
  Catalog: string;
  PartnerAccountIdentifier?: string | undefined;
  CreatedDate: Date;
}
export type EngagementTitle = string;
export type EngagementDescription = string;
export type EngagementContextIdentifier = string;
export type EngagementContextType =
  | "CustomerProject"
  | "Lead"
  | "ProspectingResult"
  | "CustomerAccount"
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
export interface EngagementCustomer {
  Industry: Industry;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl: string | redacted.Redacted<string>;
  CountryCode: CountryCode;
}
export type EngagementCustomerProjectTitle = string;
export type EngagementCustomerBusinessProblem = string | redacted.Redacted<string>;
export interface EngagementCustomerProjectDetails {
  Title: string;
  BusinessProblem: string | redacted.Redacted<string>;
  TargetCompletionDate: string;
}
export interface CustomerProjectsContext {
  Customer?: EngagementCustomer | undefined;
  Project?: EngagementCustomerProjectDetails | undefined;
}
export type ChannelName = string;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export type UtcTimeOfDay = string;
export interface BestOutreachWindow {
  Day: DayOfWeek;
  StartTimeUtc: string;
  EndTimeUtc: string;
}
export type BestOutreachWindowList = BestOutreachWindow[];
export interface ChannelRecommendation {
  RecommendedChannel: string;
  BestOutreachWindows?: BestOutreachWindow[] | undefined;
}
export interface LeadInsights {
  LeadReadinessScore?: string | undefined;
  ChannelRecommendation?: ChannelRecommendation | undefined;
}
export type LeadQualificationStatus = string;
export type LeadIndustry = string;
export type LeadWebsiteUrl = string | redacted.Redacted<string>;
export type LeadCountryCode = string | redacted.Redacted<string>;
export interface LeadAddress {
  City?: string | undefined;
  PostalCode?: string | undefined;
  StateOrRegion?: string | undefined;
  CountryCode?: string | redacted.Redacted<string> | undefined;
}
export type AwsMaturity = string;
export type LeadMarketSegment = string;
export interface LeadCustomer {
  Industry?: string | undefined;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  Address?: LeadAddress | undefined;
  AwsMaturity?: string | undefined;
  MarketSegment?: string | undefined;
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
  Phone?: string | redacted.Redacted<string> | undefined;
}
export interface LeadInteraction {
  SourceType?: string | undefined;
  SourceId?: string | undefined;
  SourceName?: string | undefined;
  Usecase?: string | undefined;
  InteractionDate?: Date | undefined;
  CustomerAction?: string | undefined;
  BusinessProblem?: string | redacted.Redacted<string> | undefined;
  Contact: LeadContact;
}
export type LeadInteractionList = LeadInteraction[];
export interface LeadContext {
  Insights?: LeadInsights | undefined;
  QualificationStatus?: string | undefined;
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
  AccountName?: string | undefined;
  Geo?: string | undefined;
  Region?: string | undefined;
  SubRegion?: string | undefined;
  Country?: CountryCode | undefined;
  Industry?: Industry | undefined;
  SubIndustry?: string | undefined;
  Segment?: string | undefined;
  CompanySize?: string | undefined;
  EligiblePrograms?: string[] | undefined;
  PublicProfileSummary?: string | undefined;
}
export type EngagementScoreLevel = string;
export interface ProspectingInsights {
  MarketplaceEngagementScore?: string | undefined;
  SolutionScore?: string | undefined;
  SolutionCategory?: string | undefined;
  SolutionSubCategory?: string | undefined;
}
export type ProspectingTaskIdentifier = string;
export type TaskArn = string;
export type TaskName = string;
export interface ProspectingResultAws {
  Customer?: ProspectingResultCustomer | undefined;
  Insights?: ProspectingInsights | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  TaskName?: string | undefined;
}
export interface ProspectingResult {
  Aws?: ProspectingResultAws | undefined;
}
export type CustomerAccountArnOrIdentifier = string;
export type AccountWebsiteUrl = string | redacted.Redacted<string>;
export interface AccountCustomer {
  Industry?: string | undefined;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  CountryCode?: CountryCode | undefined;
}
export interface CustomerAccountContext {
  AccountIdentifier?: string | undefined;
  Customer?: AccountCustomer | undefined;
}
export type EngagementContextPayload =
  | {
      CustomerProject: CustomerProjectsContext;
      Lead?: undefined;
      ProspectingResult?: undefined;
      CustomerAccount?: undefined;
    }
  | {
      CustomerProject?: undefined;
      Lead: LeadContext;
      ProspectingResult?: undefined;
      CustomerAccount?: undefined;
    }
  | {
      CustomerProject?: undefined;
      Lead?: undefined;
      ProspectingResult: ProspectingResult;
      CustomerAccount?: undefined;
    }
  | {
      CustomerProject?: undefined;
      Lead?: undefined;
      ProspectingResult?: undefined;
      CustomerAccount: CustomerAccountContext;
    };
export interface EngagementContextDetails {
  Id?: string | undefined;
  Type: EngagementContextType;
  Payload?: EngagementContextPayload | undefined;
}
export type EngagementContexts = EngagementContextDetails[];
export interface CreateEngagementRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  Contexts?: EngagementContextDetails[] | undefined;
}
export type EngagementIdentifier = string;
export type EngagementArn = string;
export interface CreateEngagementResponse {
  Id?: string | undefined;
  Arn?: string | undefined;
  ModifiedAt?: Date | undefined;
}
export type EngagementArnOrIdentifier = string;
export interface CreateEngagementContextRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ClientToken?: string | undefined;
  Type: EngagementContextType;
  Payload: EngagementContextPayload;
}
export interface CreateEngagementContextResponse {
  EngagementId?: string | undefined;
  EngagementArn?: string | undefined;
  EngagementLastModifiedAt?: Date | undefined;
  ContextId?: string | undefined;
}
export type InvitationMessage = string | redacted.Redacted<string>;
export type Alias = string | redacted.Redacted<string>;
export type AwsAccount = string | redacted.Redacted<string>;
export interface AccountReceiver {
  Alias?: string | redacted.Redacted<string> | undefined;
  AwsAccountId: string | redacted.Redacted<string>;
}
export type Receiver = { Account: AccountReceiver };
export type SenderContactEmail = string | redacted.Redacted<string>;
export interface SenderContact {
  Email: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string> | undefined;
  LastName?: string | redacted.Redacted<string> | undefined;
  BusinessTitle?: string | redacted.Redacted<string> | undefined;
  Phone?: string | redacted.Redacted<string> | undefined;
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
  Amount?: string | redacted.Redacted<string> | undefined;
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TargetCompany: string;
  EstimationUrl?: string | undefined;
}
export type ExpectedCustomerSpendList = ExpectedCustomerSpend[];
export interface ProjectDetails {
  BusinessProblem: string | redacted.Redacted<string>;
  Title: string;
  TargetCompletionDate: string;
  ExpectedCustomerSpend: ExpectedCustomerSpend[];
}
export type OpportunityType = "Net New Business" | "Flat Renewal" | "Expansion" | (string & {});
export interface OpportunityInvitationPayload {
  SenderContacts?: SenderContact[] | undefined;
  ReceiverResponsibilities: ReceiverResponsibility[];
  Customer: EngagementCustomer;
  Project: ProjectDetails;
  OpportunityType?: OpportunityType | undefined;
}
export interface LeadInvitationCustomer {
  Industry?: string | undefined;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  CountryCode?: string | redacted.Redacted<string> | undefined;
  AwsMaturity?: string | undefined;
  MarketSegment?: string | undefined;
}
export interface LeadInvitationInteraction {
  SourceType?: string | undefined;
  SourceId?: string | undefined;
  SourceName?: string | undefined;
  Usecase?: string | undefined;
  ContactBusinessTitle: string | redacted.Redacted<string>;
}
export interface LeadInvitationPayload {
  Customer: LeadInvitationCustomer;
  Interaction: LeadInvitationInteraction;
}
export type ContactWindow = "MORNING" | "AFTERNOON" | "EVENING" | (string & {});
export interface PreferredContactWindow {
  Window?: ContactWindow | undefined;
  Timezone?: string | undefined;
}
export interface AccountPlanningInvitationPayload {
  AccountIdentifier?: string | undefined;
  Customer?: AccountCustomer | undefined;
  SenderContacts?: SenderContact[] | undefined;
  PreferredContact?: PreferredContactWindow | undefined;
}
export type Payload =
  | {
      OpportunityInvitation: OpportunityInvitationPayload;
      LeadInvitation?: undefined;
      AccountPlanningInvitation?: undefined;
    }
  | {
      OpportunityInvitation?: undefined;
      LeadInvitation: LeadInvitationPayload;
      AccountPlanningInvitation?: undefined;
    }
  | {
      OpportunityInvitation?: undefined;
      LeadInvitation?: undefined;
      AccountPlanningInvitation: AccountPlanningInvitationPayload;
    };
export interface Invitation {
  Message: string | redacted.Redacted<string>;
  Receiver: Receiver;
  Payload: Payload;
}
export interface CreateEngagementInvitationRequest {
  Catalog: string;
  ClientToken?: string | undefined;
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
export interface Account {
  Industry?: Industry | undefined;
  OtherIndustry?: string | undefined;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  AwsAccountId?: string | redacted.Redacted<string> | undefined;
  Address?: Address | undefined;
  Duns?: string | redacted.Redacted<string> | undefined;
}
export interface Contact {
  Email?: string | redacted.Redacted<string> | undefined;
  FirstName?: string | redacted.Redacted<string> | undefined;
  LastName?: string | redacted.Redacted<string> | undefined;
  BusinessTitle?: string | redacted.Redacted<string> | undefined;
  Phone?: string | redacted.Redacted<string> | undefined;
}
export type CustomerContactsList = Contact[];
export interface Customer {
  Account?: Account | undefined;
  Contacts?: Contact[] | undefined;
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
  DeliveryModels?: DeliveryModel[] | undefined;
  ExpectedCustomerSpend?: ExpectedCustomerSpend[] | undefined;
  ExpectedContractDuration?: ExpectedContractDuration | undefined;
  Title?: string | redacted.Redacted<string> | undefined;
  ApnPrograms?: string[] | undefined;
  CustomerBusinessProblem?: string | redacted.Redacted<string> | undefined;
  CustomerUseCase?: string | undefined;
  RelatedOpportunityIdentifier?: string | undefined;
  SalesActivities?: SalesActivity[] | undefined;
  CompetitorName?: CompetitorName | undefined;
  OtherCompetitorNames?: string | undefined;
  OtherSolutionDescription?: string | redacted.Redacted<string> | undefined;
  AdditionalComments?: string | undefined;
  AwsPartition?: AwsPartition | undefined;
}
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
  CampaignName?: string | undefined;
  Source?: MarketingSource | undefined;
  UseCases?: string[] | undefined;
  Channels?: Channel[] | undefined;
  AwsFundingUsed?: AwsFundingUsed | undefined;
}
export type RevenueModel = "Contract" | "Pay-as-you-go" | "Subscription" | (string & {});
export interface MonetaryValue {
  Amount: string;
  CurrencyCode: CurrencyCode;
}
export interface SoftwareRevenue {
  DeliveryModel?: RevenueModel | undefined;
  Value?: MonetaryValue | undefined;
  EffectiveDate?: string | undefined;
  ExpirationDate?: string | undefined;
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
  Stage?: Stage | undefined;
  ClosedLostReason?: ClosedLostReason | undefined;
  NextSteps?: string | redacted.Redacted<string> | undefined;
  TargetCloseDate?: string | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  ReviewComments?: string | undefined;
  ReviewStatusReason?: string | undefined;
  NextStepsHistory?: NextStepsHistory[] | undefined;
}
export type OpportunityOrigin = "AWS Referral" | "Partner Referral" | (string & {});
export type PartnerOpportunityTeamMembersList = Contact[];
export type TagList = Tag[];
export interface CreateOpportunityRequest {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[] | undefined;
  NationalSecurity?: NationalSecurity | undefined;
  PartnerOpportunityIdentifier?: string | undefined;
  Customer?: Customer | undefined;
  Project?: Project | undefined;
  OpportunityType?: OpportunityType | undefined;
  Marketing?: Marketing | undefined;
  SoftwareRevenue?: SoftwareRevenue | undefined;
  ClientToken?: string | undefined;
  LifeCycle?: LifeCycle | undefined;
  Origin?: OpportunityOrigin | undefined;
  OpportunityTeam?: Contact[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateOpportunityResponse {
  Id: string;
  PartnerOpportunityIdentifier?: string | undefined;
  LastModifiedDate?: Date | undefined;
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
  ClientToken?: string | undefined;
}
export type ResourceArn = string;
export type ResourceSnapshotRevision = number;
export interface CreateResourceSnapshotResponse {
  Arn?: string | undefined;
  Revision?: number | undefined;
}
export interface CreateResourceSnapshotJobRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Tags?: Tag[] | undefined;
}
export type ResourceSnapshotJobIdentifier = string;
export type ResourceSnapshotJobArn = string;
export interface CreateResourceSnapshotJobResponse {
  Id?: string | undefined;
  Arn?: string | undefined;
}
export interface DeleteCustomerAccountRequest {
  Catalog: string;
  Identifier: string;
}
export interface DeleteCustomerAccountResponse {}
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
export type SalesInvolvementType = "For Visibility Only" | "Co-Sell" | (string & {});
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
  TargetCloseDate?: string | undefined;
  ClosedLostReason?: AwsClosedLostReason | undefined;
  Stage?: AwsOpportunityStage | undefined;
  NextSteps?: string | redacted.Redacted<string> | undefined;
  NextStepsHistory?: ProfileNextStepsHistory[] | undefined;
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
  Email?: string | redacted.Redacted<string> | undefined;
  FirstName?: string | redacted.Redacted<string> | undefined;
  LastName?: string | redacted.Redacted<string> | undefined;
  BusinessTitle?: AwsMemberBusinessTitle | undefined;
}
export type AwsOpportunityTeamMembersList = AwsTeamMember[];
export type EngagementScore = "High" | "Medium" | "Low" | (string & {});
export type MonetaryAmount = string | redacted.Redacted<string>;
export type AmountMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export type StringList = string[];
export interface AwsProductOptimization {
  Description: string;
  SavingsAmount: string | redacted.Redacted<string>;
}
export type AwsProductOptimizationsList = AwsProductOptimization[];
export interface AwsProductDetails {
  ProductCode: string;
  ServiceCode?: string | undefined;
  Categories: string[];
  Amount?: string | redacted.Redacted<string> | undefined;
  OptimizedAmount?: string | redacted.Redacted<string> | undefined;
  PotentialSavingsAmount?: string | redacted.Redacted<string> | undefined;
  Optimizations: AwsProductOptimization[];
}
export type AwsProductsList = AwsProductDetails[];
export interface AwsProductInsights {
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TotalAmount?: string | redacted.Redacted<string> | undefined;
  TotalOptimizedAmount?: string | redacted.Redacted<string> | undefined;
  TotalPotentialSavingsAmount?: string | redacted.Redacted<string> | undefined;
  TotalAmountByCategory: { [key: string]: string | redacted.Redacted<string> | undefined };
  AwsProducts: AwsProductDetails[];
}
export interface AwsProductsSpendInsightsBySource {
  Partner?: AwsProductInsights | undefined;
  AWS?: AwsProductInsights | undefined;
}
export interface OpportunityQuality {
  Score?: number | undefined;
  Trend?: string | undefined;
}
export type RecommendationAttributeMap = { [key: string]: string | undefined };
export interface Recommendation {
  Type: string;
  Details: string;
  Attributes?: { [key: string]: string | undefined } | undefined;
}
export type RecommendationList = Recommendation[];
export interface AwsOpportunityInsights {
  NextBestActions?: string | undefined;
  EngagementScore?: EngagementScore | undefined;
  AwsProductsSpendInsightsBySource?: AwsProductsSpendInsightsBySource | undefined;
  OpportunityQuality?: OpportunityQuality | undefined;
  Recommendations?: Recommendation[] | undefined;
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
  AwsProducts?: string[] | undefined;
  Solutions?: string[] | undefined;
  AwsMarketplaceSolutions?: string[] | undefined;
  AwsMarketplaceProducts?: string[] | undefined;
}
export interface AwsOpportunityCustomer {
  Contacts?: Contact[] | undefined;
}
export interface AwsOpportunityProject {
  ExpectedCustomerSpend?: ExpectedCustomerSpend[] | undefined;
  AwsPartition?: AwsPartition | undefined;
}
export interface AwsSoftwareRevenue {
  Value?: MonetaryValue | undefined;
  Discount?: string | undefined;
  EffectiveDate?: string | undefined;
  ExpirationDate?: string | undefined;
}
export interface GetAwsOpportunitySummaryResponse {
  RelatedOpportunityId?: string | undefined;
  Origin?: OpportunityOrigin | undefined;
  InvolvementType?: SalesInvolvementType | undefined;
  Visibility?: Visibility | undefined;
  LifeCycle?: AwsOpportunityLifeCycle | undefined;
  OpportunityTeam?: AwsTeamMember[] | undefined;
  Insights?: AwsOpportunityInsights | undefined;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason | undefined;
  RelatedEntityIds?: AwsOpportunityRelatedEntities | undefined;
  Customer?: AwsOpportunityCustomer | undefined;
  Project?: AwsOpportunityProject | undefined;
  CosellMotion?: string | undefined;
  CosellMotionReason?: string | undefined;
  SoftwareRevenue?: AwsSoftwareRevenue | undefined;
  Catalog: string;
}
export interface GetCustomerAccountRequest {
  Catalog: string;
  Identifier: string;
}
export interface Issue {
  Severity?: string | undefined;
  Code?: string | undefined;
  Message?: string | undefined;
}
export type IssueList = Issue[];
export type EligibleProgramList = string[];
export interface AwsEnrichmentCustomer {
  AccountName?: string | undefined;
  Industry?: string | undefined;
  SubIndustry?: string | undefined;
  Sector?: string | undefined;
  Segment?: string | undefined;
  CompanySize?: string | undefined;
  Region?: string | undefined;
  SubRegion?: string | undefined;
  Geo?: string | undefined;
  Country?: string | undefined;
  CustomerAccountPlanningQualification?: string | undefined;
  EligiblePrograms?: string[] | undefined;
}
export interface AwsEnrichmentInsights {
  MarketplaceEngagementScore?: string | undefined;
  SolutionCategory?: string | undefined;
  SolutionScore?: string | undefined;
  SolutionSubCategory?: string | undefined;
}
export interface AwsEnrichment {
  Customer?: AwsEnrichmentCustomer | undefined;
  Insights?: AwsEnrichmentInsights | undefined;
}
export type CustomerAccountFailureReason =
  | "DUPLICATE_CUSTOMER_MATCH"
  | "PROCESSING_ERROR"
  | (string & {});
export interface GetCustomerAccountResponse {
  Arn: string;
  Id: string;
  Catalog: string;
  EnrichmentStatus: EnrichmentStatus;
  PartnerAccountIdentifier?: string | undefined;
  CreatedDate: Date;
  LastModifiedDate: Date;
  Issues?: Issue[] | undefined;
  AwsEnrichment?: AwsEnrichment | undefined;
  ReasonCode?: CustomerAccountFailureReason | undefined;
  Message?: string | undefined;
  ExistingCustomerAccountArn?: string | undefined;
  Account: CustomerAccountData;
  Tags?: Tag[] | undefined;
}
export type BulkJobArnOrIdentifier = string;
export interface GetCustomerAccountBulkJobRequest {
  Catalog: string;
  Identifier: string;
}
export type BulkJobArn = string;
export type JobId = string;
export type BulkJobStatus = "SUBMITTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type FileName = string;
export interface GetCustomerAccountBulkJobResponse {
  Arn: string;
  Id: string;
  Status: BulkJobStatus;
  FileName?: string | undefined;
  TotalRecords: number;
  ProcessedRecords: number;
  SuccessCount: number;
  FailureCount: number;
  DeletedCount: number;
  FailureReason?: string | undefined;
  CreatedAt: Date;
  CompletedAt?: Date | undefined;
}
export type BulkReportType = "FAILED_RECORDS" | "ALL_RECORDS" | (string & {});
export interface GetCustomerAccountBulkJobReportUrlRequest {
  Catalog: string;
  Identifier: string;
  ReportType?: BulkReportType | undefined;
}
export type BulkReportStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "AVAILABLE"
  | "FAILED"
  | "EXPIRED"
  | (string & {});
export type BulkReportUrl = string | redacted.Redacted<string>;
export interface GetCustomerAccountBulkJobReportUrlResponse {
  ReportStatus: BulkReportStatus;
  ReportType: BulkReportType;
  Url?: string | redacted.Redacted<string> | undefined;
  ExpiresAt?: Date | undefined;
  FailureReason?: string | undefined;
}
export type FilterList = Filter[];
export type FilterableField =
  | "ENRICHMENT_STATUS"
  | "COMPANY_NAME"
  | "AWS_INDUSTRY"
  | "ACCOUNT_PLANNING_QUALIFICATION"
  | "PROGRAM_ELIGIBILITY"
  | "IMPORT_ID"
  | "CREATED_DATE"
  | "LAST_MODIFIED_DATE"
  | "GEO"
  | "COUNTRY"
  | "SEGMENT"
  | "SOLUTION_CATEGORY"
  | "MARKETPLACE_ENGAGEMENT_SCORE"
  | "SOLUTION_SCORE"
  | (string & {});
export type AccountFilterStringList = string[];
export type FilterValue =
  | {
      StringValue: string;
      StringListValue?: undefined;
      LongValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue: string[];
      LongValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue: number;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue?: undefined;
      DateValue: Date;
    };
export interface FilterCondition {
  Key: FilterableField;
  Value: FilterValue;
}
export interface Filter {
  AndAllFilters?: Filter[] | undefined;
  OrAllFilters?: Filter[] | undefined;
  NotFilter?: Filter | undefined;
  EqualsTo?: FilterCondition | undefined;
  ContainsAny?: FilterCondition | undefined;
  ContainsAll?: FilterCondition | undefined;
  GreaterThan?: FilterCondition | undefined;
  GreaterThanOrEquals?: FilterCondition | undefined;
  LessThan?: FilterCondition | undefined;
  LessThanOrEquals?: FilterCondition | undefined;
}
export type AggregatableField =
  | "ENRICHMENT_STATUS"
  | "AWS_INDUSTRY"
  | "SEGMENT"
  | "REGION"
  | "SOLUTION_CATEGORY"
  | "ACCOUNT_PLANNING_QUALIFICATION"
  | "PROGRAM_ELIGIBILITY"
  | "MARKETPLACE_ENGAGEMENT_SCORE"
  | "GEO"
  | "COUNTRY"
  | "SOLUTION_SCORE"
  | (string & {});
export type AggregatableFieldList = AggregatableField[];
export interface AggregationRequest {
  GroupBy: AggregatableField[];
}
export type AggregationRequestList = AggregationRequest[];
export interface GetCustomerAccountStatisticsRequest {
  Catalog: string;
  Filter?: Filter | undefined;
  Aggregations?: AggregationRequest[] | undefined;
  IncludeMissing?: boolean | undefined;
}
export type BucketValueList = string[];
export interface Bucket {
  Values: string[];
  Count: number;
}
export type BucketList = Bucket[];
export interface AggregationResult {
  GroupBy: AggregatableField[];
  Buckets: Bucket[];
  OtherCount: number;
}
export type AggregationResultList = AggregationResult[];
export interface GetCustomerAccountStatisticsResponse {
  TotalCount: number;
  Aggregations?: AggregationResult[] | undefined;
}
export interface GetEngagementRequest {
  Catalog: string;
  Identifier: string;
}
export interface GetEngagementResponse {
  Id?: string | undefined;
  Arn?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  CreatedAt?: Date | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
  MemberCount?: number | undefined;
  ModifiedAt?: Date | undefined;
  ModifiedBy?: string | redacted.Redacted<string> | undefined;
  Contexts?: EngagementContextDetails[] | undefined;
}
export interface GetEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export type EngagementInvitationPayloadType =
  | "OpportunityInvitation"
  | "LeadInvitation"
  | "AccountPlanningInvitation"
  | (string & {});
export type InvitationStatus = "ACCEPTED" | "PENDING" | "REJECTED" | "EXPIRED" | (string & {});
export type RejectionReasonString = string;
export type MemberCompanyName = string | redacted.Redacted<string>;
export interface EngagementMemberSummary {
  CompanyName?: string | redacted.Redacted<string> | undefined;
  WebsiteUrl?: string | undefined;
}
export type EngagementMemberSummaries = EngagementMemberSummary[];
export interface InvitationProspectingResultAws {
  Customer?: ProspectingResultCustomer | undefined;
  Insights?: ProspectingInsights | undefined;
}
export interface EnrichmentContext {
  ProspectingResultAws?: InvitationProspectingResultAws | undefined;
  LeadInsights?: LeadInsights | undefined;
}
export interface GetEngagementInvitationResponse {
  Arn?: string | undefined;
  PayloadType?: EngagementInvitationPayloadType | undefined;
  Id: string;
  EngagementId?: string | undefined;
  EngagementTitle?: string | undefined;
  Status?: InvitationStatus | undefined;
  InvitationDate?: Date | undefined;
  ExpirationDate?: Date | undefined;
  SenderAwsAccountId?: string | redacted.Redacted<string> | undefined;
  SenderCompanyName?: string | undefined;
  Receiver?: Receiver | undefined;
  Catalog: string;
  RejectionReason?: string | undefined;
  Payload?: Payload | undefined;
  InvitationMessage?: string | redacted.Redacted<string> | undefined;
  EngagementDescription?: string | undefined;
  ExistingMembers?: EngagementMemberSummary[] | undefined;
  EnrichmentContext?: EnrichmentContext | undefined;
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
  AwsMarketplaceOffers?: string[] | undefined;
  AwsMarketplaceOfferSets?: string[] | undefined;
  Solutions?: string[] | undefined;
  AwsProducts?: string[] | undefined;
  AwsMarketplaceSolutions?: string[] | undefined;
  AwsMarketplaceProducts?: string[] | undefined;
}
export interface GetOpportunityResponse {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[] | undefined;
  NationalSecurity?: NationalSecurity | undefined;
  PartnerOpportunityIdentifier?: string | undefined;
  Customer?: Customer | undefined;
  Project?: Project | undefined;
  OpportunityType?: OpportunityType | undefined;
  Marketing?: Marketing | undefined;
  SoftwareRevenue?: SoftwareRevenue | undefined;
  Id: string;
  Arn?: string | undefined;
  LastModifiedDate: Date;
  CreatedDate: Date;
  RelatedEntityIdentifiers: RelatedEntityIdentifiers;
  LifeCycle?: LifeCycle | undefined;
  OpportunityTeam?: Contact[] | undefined;
}
export type BulkJobId = string;
export type BulkFileFormat = "CSV" | (string & {});
export interface GetOpportunityBulkJobReportUrlRequest {
  Catalog: string;
  JobId: string;
  ReportFormat: BulkFileFormat;
  ReportType?: BulkReportType | undefined;
}
export interface GetOpportunityBulkJobReportUrlResponse {
  ReportStatus: BulkReportStatus;
  ReportType: BulkReportType;
  ReportFormat: BulkFileFormat;
  Url?: string | redacted.Redacted<string> | undefined;
  ExpiresAt?: Date | undefined;
  FailureReason?: string | undefined;
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
  EngagementContextId?: string | undefined;
  Status: ProspectingTaskStatus;
  ReasonCode?: string | undefined;
  Message?: string | undefined;
}
export type EngagementProspectingResultList = EngagementProspectingResult[];
export interface GetProspectingFromEngagementTaskResponse {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date | undefined;
  Engagements: EngagementProspectingResult[];
}
export interface GetResourceSnapshotRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Revision?: number | undefined;
}
export interface LifeCycleForView {
  TargetCloseDate?: string | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  Stage?: Stage | undefined;
  NextSteps?: string | redacted.Redacted<string> | undefined;
}
export interface ProjectView {
  DeliveryModels?: DeliveryModel[] | undefined;
  ExpectedCustomerSpend?: ExpectedCustomerSpend[] | undefined;
  ExpectedContractDuration?: ExpectedContractDuration | undefined;
  CustomerUseCase?: string | undefined;
  SalesActivities?: SalesActivity[] | undefined;
  OtherSolutionDescription?: string | redacted.Redacted<string> | undefined;
}
export interface OpportunitySummaryView {
  OpportunityType?: OpportunityType | undefined;
  Lifecycle?: LifeCycleForView | undefined;
  OpportunityTeam?: Contact[] | undefined;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[] | undefined;
  Customer?: Customer | undefined;
  Project?: ProjectView | undefined;
  RelatedEntityIdentifiers?: RelatedEntityIdentifiers | undefined;
}
export interface AwsOpportunitySummaryFullView {
  RelatedOpportunityId?: string | undefined;
  Origin?: OpportunityOrigin | undefined;
  InvolvementType?: SalesInvolvementType | undefined;
  Visibility?: Visibility | undefined;
  LifeCycle?: AwsOpportunityLifeCycle | undefined;
  OpportunityTeam?: AwsTeamMember[] | undefined;
  Insights?: AwsOpportunityInsights | undefined;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason | undefined;
  RelatedEntityIds?: AwsOpportunityRelatedEntities | undefined;
  Customer?: AwsOpportunityCustomer | undefined;
  Project?: AwsOpportunityProject | undefined;
  CosellMotion?: string | undefined;
  CosellMotionReason?: string | undefined;
  SoftwareRevenue?: AwsSoftwareRevenue | undefined;
}
export type ResourceSnapshotPayload =
  | { OpportunitySummary: OpportunitySummaryView; AwsOpportunitySummaryFullView?: undefined }
  | {
      OpportunitySummary?: undefined;
      AwsOpportunitySummaryFullView: AwsOpportunitySummaryFullView;
    };
export type AwsAccountIdOrAliasList = (string | redacted.Redacted<string>)[];
export interface GetResourceSnapshotResponse {
  Catalog: string;
  Arn?: string | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
  CreatedAt?: Date | undefined;
  EngagementId?: string | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceId?: string | undefined;
  ResourceSnapshotTemplateName?: string | undefined;
  Revision?: number | undefined;
  Payload?: ResourceSnapshotPayload | undefined;
  TargetMemberAccounts?: (string | redacted.Redacted<string>)[] | undefined;
}
export interface GetResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export type ResourceSnapshotJobStatus = "Running" | "Stopped" | (string & {});
export interface GetResourceSnapshotJobResponse {
  Catalog: string;
  Id?: string | undefined;
  Arn?: string | undefined;
  EngagementId?: string | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceId?: string | undefined;
  ResourceArn?: string | undefined;
  ResourceSnapshotTemplateName?: string | undefined;
  CreatedAt?: Date | undefined;
  Status?: ResourceSnapshotJobStatus | undefined;
  LastSuccessfulExecutionDate?: Date | undefined;
  LastFailure?: string | undefined;
}
export interface GetSellingSystemSettingsRequest {
  Catalog: string;
}
export type ResourceSnapshotJobRoleArn = string;
export interface GetSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string | undefined;
}
export type BulkRecordStatus = "SUCCEEDED" | "FAILED" | (string & {});
export type MaxResults = number;
export type NextToken = string;
export interface ListCustomerAccountBulkJobResultsRequest {
  Catalog: string;
  Identifier: string;
  Status?: BulkRecordStatus | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface BulkJobResult {
  RequestId: string;
  Status: BulkRecordStatus;
  ResourceIdentifier?: string | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type BulkJobResultList = BulkJobResult[];
export interface ListCustomerAccountBulkJobResultsResponse {
  Results: BulkJobResult[];
  NextToken?: string | undefined;
}
export interface CustomerAccountBulkJobFilter {
  Identifier?: string | undefined;
  Status?: BulkJobStatus | undefined;
}
export interface ListCustomerAccountBulkJobsRequest {
  Catalog: string;
  Filter?: CustomerAccountBulkJobFilter | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CustomerAccountBulkJobSummary {
  Arn: string;
  Id: string;
  Status: BulkJobStatus;
  FileName?: string | undefined;
  TotalRecords: number;
  ProcessedRecords: number;
  SuccessCount: number;
  FailureCount: number;
  DeletedCount: number;
  FailureReason?: string | undefined;
  CreatedAt: Date;
  CompletedAt?: Date | undefined;
}
export type CustomerAccountBulkJobSummaryList = CustomerAccountBulkJobSummary[];
export interface ListCustomerAccountBulkJobsResponse {
  items: CustomerAccountBulkJobSummary[];
  NextToken?: string | undefined;
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
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: ListTasksSortBase | undefined;
  Catalog: string;
  TaskStatus?: TaskStatus[] | undefined;
  OpportunityIdentifier?: string[] | undefined;
  EngagementInvitationIdentifier?: string[] | undefined;
  TaskIdentifier?: string[] | undefined;
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
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementInvitationId?: string | undefined;
}
export type ListEngagementByAcceptingInvitationTaskSummaries =
  ListEngagementByAcceptingInvitationTaskSummary[];
export interface ListEngagementByAcceptingInvitationTasksResponse {
  TaskSummaries?: ListEngagementByAcceptingInvitationTaskSummary[] | undefined;
  NextToken?: string | undefined;
}
export type EngagementIdentifiers = string[];
export interface ListEngagementFromOpportunityTasksRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: ListTasksSortBase | undefined;
  Catalog: string;
  TaskStatus?: TaskStatus[] | undefined;
  TaskIdentifier?: string[] | undefined;
  OpportunityIdentifier?: string[] | undefined;
  EngagementIdentifier?: string[] | undefined;
}
export interface ListEngagementFromOpportunityTaskSummary {
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementId?: string | undefined;
  EngagementInvitationId?: string | undefined;
}
export type ListEngagementFromOpportunityTaskSummaries = ListEngagementFromOpportunityTaskSummary[];
export interface ListEngagementFromOpportunityTasksResponse {
  TaskSummaries?: ListEngagementFromOpportunityTaskSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ReadinessLevel = "SalesReady" | "MarketingReady" | "LowPotential" | (string & {});
export type EngagementGroupSortName = "Count" | "UpdatedAt" | (string & {});
export interface EngagementGroupSort {
  SortBy: EngagementGroupSortName;
  SortOrder: SortOrder;
}
export type EngagementGroupArnOrIdentifier = string;
export type EngagementGroupIdentifiers = string[];
export type PageSize = number;
export type LeadsNextToken = string;
export interface ListEngagementGroupsRequest {
  Catalog: string;
  ReadinessLevel?: ReadinessLevel | undefined;
  Sort?: EngagementGroupSort | undefined;
  EngagementGroupIdentifiers?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type GroupId = string;
export type EngagementGroupArn = string;
export type EngagementGroupName = string;
export type EngagementGroupDescription = string;
export interface EngagementGroupSummary {
  Id: string;
  Arn?: string | undefined;
  Catalog?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  Count?: number | undefined;
  ReadinessLevel?: ReadinessLevel | undefined;
  UpdatedAt?: Date | undefined;
}
export type EngagementGroupSummaries = EngagementGroupSummary[];
export interface ListEngagementGroupsResponse {
  EngagementGroupSummaries?: EngagementGroupSummary[] | undefined;
  NextToken?: string | undefined;
}
export type OpportunityEngagementInvitationSortName = "InvitationDate" | (string & {});
export interface OpportunityEngagementInvitationSort {
  SortOrder: SortOrder;
  SortBy: OpportunityEngagementInvitationSortName;
}
export type EngagementInvitationsPayloadType = EngagementInvitationPayloadType[];
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export type InvitationStatusList = InvitationStatus[];
export interface ListEngagementInvitationsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: OpportunityEngagementInvitationSort | undefined;
  PayloadType?: EngagementInvitationPayloadType[] | undefined;
  ParticipantType: ParticipantType;
  Status?: InvitationStatus[] | undefined;
  EngagementIdentifier?: string[] | undefined;
  SenderAwsAccountId?: (string | redacted.Redacted<string>)[] | undefined;
}
export interface EngagementInvitationSummary {
  Arn?: string | undefined;
  PayloadType?: EngagementInvitationPayloadType | undefined;
  Id: string;
  EngagementId?: string | undefined;
  EngagementTitle?: string | undefined;
  Status?: InvitationStatus | undefined;
  InvitationDate?: Date | undefined;
  ExpirationDate?: Date | undefined;
  SenderAwsAccountId?: string | redacted.Redacted<string> | undefined;
  SenderCompanyName?: string | undefined;
  Receiver?: Receiver | undefined;
  Catalog: string;
  ParticipantType?: ParticipantType | undefined;
}
export type EngagementInvitationSummaries = EngagementInvitationSummary[];
export interface ListEngagementInvitationsResponse {
  EngagementInvitationSummaries?: EngagementInvitationSummary[] | undefined;
  NextToken?: string | undefined;
}
export type MemberPageSize = number;
export interface ListEngagementMembersRequest {
  Catalog: string;
  Identifier: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface EngagementMember {
  CompanyName?: string | redacted.Redacted<string> | undefined;
  WebsiteUrl?: string | undefined;
  AccountId?: string | redacted.Redacted<string> | undefined;
}
export type EngagementMembers = EngagementMember[];
export interface ListEngagementMembersResponse {
  EngagementMemberList: EngagementMember[];
  NextToken?: string | undefined;
}
export interface ListEngagementResourceAssociationsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  EngagementIdentifier?: string | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceIdentifier?: string | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
}
export interface EngagementResourceAssociationSummary {
  Catalog: string;
  EngagementId?: string | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceId?: string | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
}
export type EngagementResourceAssociationSummaryList = EngagementResourceAssociationSummary[];
export interface ListEngagementResourceAssociationsResponse {
  EngagementResourceAssociationSummaries: EngagementResourceAssociationSummary[];
  NextToken?: string | undefined;
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
  CreatedBy?: (string | redacted.Redacted<string>)[] | undefined;
  ExcludeCreatedBy?: (string | redacted.Redacted<string>)[] | undefined;
  ContextTypes?: EngagementContextType[] | undefined;
  ExcludeContextTypes?: EngagementContextType[] | undefined;
  Sort?: EngagementSort | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  EngagementIdentifier?: string[] | undefined;
}
export interface EngagementSummary {
  Arn?: string | undefined;
  Id?: string | undefined;
  Title?: string | undefined;
  CreatedAt?: Date | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
  MemberCount?: number | undefined;
  ModifiedAt?: Date | undefined;
  ModifiedBy?: string | redacted.Redacted<string> | undefined;
  ContextTypes?: EngagementContextType[] | undefined;
}
export type EngagementSummaryList = EngagementSummary[];
export interface ListEngagementsResponse {
  EngagementSummaryList: EngagementSummary[];
  NextToken?: string | undefined;
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
  AfterLastModifiedDate?: Date | undefined;
  BeforeLastModifiedDate?: Date | undefined;
}
export type FilterIdentifier = string[];
export type FilterLifeCycleStage = Stage[];
export type FilterLifeCycleReviewStatus = ReviewStatus[];
export interface CreatedDateFilter {
  AfterCreatedDate?: Date | undefined;
  BeforeCreatedDate?: Date | undefined;
}
export interface TargetCloseDateFilter {
  AfterTargetCloseDate?: string | undefined;
  BeforeTargetCloseDate?: string | undefined;
}
export interface ListOpportunitiesRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: OpportunitySort | undefined;
  LastModifiedDate?: LastModifiedDate | undefined;
  Identifier?: string[] | undefined;
  LifeCycleStage?: Stage[] | undefined;
  LifeCycleReviewStatus?: ReviewStatus[] | undefined;
  CustomerCompanyName?: string[] | undefined;
  CreatedDate?: CreatedDateFilter | undefined;
  TargetCloseDate?: TargetCloseDateFilter | undefined;
}
export interface LifeCycleSummary {
  Stage?: Stage | undefined;
  ClosedLostReason?: ClosedLostReason | undefined;
  NextSteps?: string | redacted.Redacted<string> | undefined;
  TargetCloseDate?: string | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  ReviewComments?: string | undefined;
  ReviewStatusReason?: string | undefined;
}
export interface AddressSummary {
  City?: string | redacted.Redacted<string> | undefined;
  PostalCode?: string | redacted.Redacted<string> | undefined;
  StateOrRegion?: string | redacted.Redacted<string> | undefined;
  CountryCode?: CountryCode | undefined;
}
export interface AccountSummary {
  Industry?: Industry | undefined;
  OtherIndustry?: string | undefined;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string> | undefined;
  Address?: AddressSummary | undefined;
}
export interface CustomerSummary {
  Account?: AccountSummary | undefined;
}
export interface ProjectSummary {
  DeliveryModels?: DeliveryModel[] | undefined;
  ExpectedCustomerSpend?: ExpectedCustomerSpend[] | undefined;
  ExpectedContractDuration?: ExpectedContractDuration | undefined;
}
export interface OpportunitySummary {
  Catalog: string;
  Id?: string | undefined;
  Arn?: string | undefined;
  PartnerOpportunityIdentifier?: string | undefined;
  OpportunityType?: OpportunityType | undefined;
  LastModifiedDate?: Date | undefined;
  CreatedDate?: Date | undefined;
  LifeCycle?: LifeCycleSummary | undefined;
  Customer?: CustomerSummary | undefined;
  Project?: ProjectSummary | undefined;
}
export type OpportunitySummaries = OpportunitySummary[];
export interface ListOpportunitiesResponse {
  OpportunitySummaries: OpportunitySummary[];
  NextToken?: string | undefined;
}
export interface ListOpportunityBulkJobResultsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  JobId: string;
  Status?: BulkRecordStatus | undefined;
}
export interface ListOpportunityBulkJobResultsResponse {
  Results: BulkJobResult[];
  NextToken?: string | undefined;
}
export interface ListOpportunityBulkJobsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  JobId?: string | undefined;
  Status?: BulkJobStatus | undefined;
}
export type BulkFileName = string;
export type BulkOperationType = "BULK_CREATE" | "BULK_UPDATE" | (string & {});
export interface OpportunityBulkJobSummary {
  JobId: string;
  Status: BulkJobStatus;
  TotalRecords: number;
  ProcessedRecords: number;
  SuccessCount: number;
  FailureCount: number;
  CreatedAt: Date;
  StartedAt?: Date | undefined;
  CompletedAt?: Date | undefined;
  FailureReason?: string | undefined;
  FileName?: string | undefined;
  OperationType?: BulkOperationType | undefined;
}
export type OpportunityBulkJobSummaryList = OpportunityBulkJobSummary[];
export interface ListOpportunityBulkJobsResponse {
  OpportunityBulkJobSummaries: OpportunityBulkJobSummary[];
  NextToken?: string | undefined;
}
export type ContextIdentifier = string;
export type ContextIdentifiers = string[];
export interface ListOpportunityFromEngagementTasksRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: ListTasksSortBase | undefined;
  Catalog: string;
  TaskStatus?: TaskStatus[] | undefined;
  TaskIdentifier?: string[] | undefined;
  OpportunityIdentifier?: string[] | undefined;
  EngagementIdentifier?: string[] | undefined;
  ContextIdentifier?: string[] | undefined;
}
export interface ListOpportunityFromEngagementTaskSummary {
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementId?: string | undefined;
  ContextId?: string | undefined;
}
export type ListOpportunityFromEngagementTaskSummaries = ListOpportunityFromEngagementTaskSummary[];
export interface ListOpportunityFromEngagementTasksResponse {
  TaskSummaries?: ListOpportunityFromEngagementTaskSummary[] | undefined;
  NextToken?: string | undefined;
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
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  TaskIdentifier?: string[] | undefined;
  TaskName?: string[] | undefined;
  StartAfter?: Date | undefined;
  StartBefore?: Date | undefined;
  Sort?: ProspectingFromEngagementTaskSort | undefined;
}
export interface ProspectingTaskSummary {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date | undefined;
  TotalEngagementCount: number;
  CompletedEngagementCount: number;
  FailedEngagementCount: number;
}
export type ProspectingTaskSummaryList = ProspectingTaskSummary[];
export interface ListProspectingFromEngagementTasksResponse {
  NextToken?: string | undefined;
  TaskSummaries: ProspectingTaskSummary[];
}
export type SortBy = "CreatedDate" | (string & {});
export interface SortObject {
  SortBy?: SortBy | undefined;
  SortOrder?: SortOrder | undefined;
}
export interface ListResourceSnapshotJobsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  EngagementIdentifier?: string | undefined;
  Status?: ResourceSnapshotJobStatus | undefined;
  Sort?: SortObject | undefined;
}
export interface ResourceSnapshotJobSummary {
  Id?: string | undefined;
  Arn?: string | undefined;
  EngagementId?: string | undefined;
  Status?: ResourceSnapshotJobStatus | undefined;
}
export type ResourceSnapshotJobSummaryList = ResourceSnapshotJobSummary[];
export interface ListResourceSnapshotJobsResponse {
  ResourceSnapshotJobSummaries: ResourceSnapshotJobSummary[];
  NextToken?: string | undefined;
}
export interface ListResourceSnapshotsRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  EngagementIdentifier: string;
  ResourceType?: ResourceType | undefined;
  ResourceIdentifier?: string | undefined;
  ResourceSnapshotTemplateIdentifier?: string | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
}
export type ResourceSnapshotArn = string;
export interface ResourceSnapshotSummary {
  Arn?: string | undefined;
  Revision?: number | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceId?: string | undefined;
  ResourceSnapshotTemplateName?: string | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
}
export type ResourceSnapshotSummaryList = ResourceSnapshotSummary[];
export interface ListResourceSnapshotsResponse {
  ResourceSnapshotSummaries: ResourceSnapshotSummary[];
  NextToken?: string | undefined;
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
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Sort?: SolutionSort | undefined;
  Status?: SolutionStatus[] | undefined;
  Identifier?: string[] | undefined;
  Category?: string[] | undefined;
  AwsMarketplaceSolutionArn?: string[] | undefined;
}
export type SolutionArn = string;
export interface SolutionBase {
  Catalog: string;
  Id: string;
  Arn?: string | undefined;
  Name: string;
  Status: SolutionStatus;
  Category: string;
  CreatedDate: Date;
  AwsMarketplaceSolutionArn?: string | undefined;
}
export type SolutionList = SolutionBase[];
export interface ListSolutionsResponse {
  SolutionSummaries: SolutionBase[];
  NextToken?: string | undefined;
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
  ResourceSnapshotJobRoleIdentifier?: string | undefined;
}
export interface PutSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string | undefined;
}
export interface RejectEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
  RejectionReason?: string | undefined;
}
export interface RejectEngagementInvitationResponse {}
export type SortableField =
  | "COMPANY_NAME"
  | "CREATED_DATE"
  | "LAST_MODIFIED_DATE"
  | "MARKETPLACE_ENGAGEMENT_SCORE"
  | "SOLUTION_SCORE"
  | (string & {});
export interface CustomerAccountSort {
  SortBy: SortableField;
  SortOrder: SortOrder;
}
export interface SearchCustomerAccountsRequest {
  Catalog: string;
  Filter?: Filter | undefined;
  Sort?: CustomerAccountSort | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CustomerAccountDetailsSummary {
  CompanyName: string | redacted.Redacted<string>;
}
export type EnrichmentValue = string;
export interface AwsEnrichmentCustomerSummary {
  Industry?: string | undefined;
  AccountPlanningQualification?: string | undefined;
  EligiblePrograms?: string[] | undefined;
  Geo?: string | undefined;
  Country?: string | undefined;
  Segment?: string | undefined;
}
export interface AwsEnrichmentInsightsSummary {
  MarketplaceEngagementScore?: string | undefined;
  SolutionCategory?: string | undefined;
  SolutionScore?: string | undefined;
}
export interface AwsEnrichmentSummary {
  Customer?: AwsEnrichmentCustomerSummary | undefined;
  Insights?: AwsEnrichmentInsightsSummary | undefined;
}
export interface CustomerAccountSummary {
  Arn: string;
  Id: string;
  Catalog: string;
  EnrichmentStatus: EnrichmentStatus;
  PartnerAccountIdentifier?: string | undefined;
  CreatedDate: Date;
  LastModifiedDate: Date;
  CustomerAccount: CustomerAccountDetailsSummary;
  AwsEnrichment?: AwsEnrichmentSummary | undefined;
}
export type CustomerAccountSummaryList = CustomerAccountSummary[];
export interface SearchCustomerAccountsResponse {
  CustomerAccountSummaries: CustomerAccountSummary[];
  NextToken?: string | undefined;
}
export type EngagementSearchKeyword = string | redacted.Redacted<string>;
export type EngagementSearchFilterList = EngagementSearchFilter[];
export type EngagementSearchFilterName =
  | "EngagementId"
  | "Title"
  | "PartnerId"
  | "CreatedAt"
  | "LastModifiedAt"
  | "MemberCount"
  | "ProspectingCustomerGeo"
  | "ProspectingCustomerRegion"
  | "ProspectingCustomerIndustry"
  | "ProspectingCustomerSegment"
  | "ProspectingCustomerCountry"
  | "ProspectingCustomerCompanySize"
  | "ProspectingInsightsMarketplaceEngagementScore"
  | "ProspectingInsightsSolutionCategory"
  | "ProspectingInsightsSolutionSubCategory"
  | "LeadQualificationStatus"
  | "LeadReadinessScore"
  | "LeadCustomerIndustry"
  | "LeadCustomerCountryCode"
  | "LeadCustomerAwsMaturity"
  | "LeadCustomerMarketSegment"
  | "LeadInteractionsSourceType"
  | "LeadCustomerCompanyName"
  | "LeadInteractionsContactFirstName"
  | "LeadInteractionsContactLastName"
  | "LeadInteractionsUsecase"
  | "LeadInteractionsSourceName"
  | "LeadInteractionsContactBusinessTitle"
  | "ContextType"
  | (string & {});
export type EngagementSearchStringValue = string | redacted.Redacted<string>;
export type EngagementSearchFilterValues = (string | redacted.Redacted<string>)[];
export type EngagementSearchFilterValue =
  | {
      StringValue: string | redacted.Redacted<string>;
      StringListValue?: undefined;
      LongValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue: (string | redacted.Redacted<string>)[];
      LongValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue: number;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue?: undefined;
      DateValue: Date;
    };
export interface EngagementSearchPredicate {
  Key: EngagementSearchFilterName;
  Value: EngagementSearchFilterValue;
}
export interface EngagementSearchFilter {
  AndAllFilters?: EngagementSearchFilter[] | undefined;
  OrAllFilters?: EngagementSearchFilter[] | undefined;
  NotFilter?: EngagementSearchFilter | undefined;
  EqualsTo?: EngagementSearchPredicate | undefined;
  ContainsAny?: EngagementSearchPredicate | undefined;
  ContainsAll?: EngagementSearchPredicate | undefined;
  GreaterThan?: EngagementSearchPredicate | undefined;
  GreaterThanOrEquals?: EngagementSearchPredicate | undefined;
  LessThan?: EngagementSearchPredicate | undefined;
  LessThanOrEquals?: EngagementSearchPredicate | undefined;
}
export type EngagementSearchSortName =
  | "EngagementId"
  | "Title"
  | "PartnerId"
  | "CreatedAt"
  | "LastModifiedAt"
  | "MemberCount"
  | "ProspectingCustomerGeo"
  | "ProspectingCustomerRegion"
  | "ProspectingCustomerIndustry"
  | "ProspectingCustomerSegment"
  | "ProspectingCustomerCountry"
  | "ProspectingCustomerCompanySize"
  | "ProspectingInsightsMarketplaceEngagementScore"
  | "ProspectingInsightsSolutionCategory"
  | "ProspectingInsightsSolutionSubCategory"
  | "LeadQualificationStatus"
  | "LeadReadinessScore"
  | "LeadCustomerIndustry"
  | "LeadCustomerCountryCode"
  | "LeadCustomerAwsMaturity"
  | "LeadCustomerMarketSegment"
  | "LeadCustomerCompanyName"
  | "LeadInteractionsContactFirstName"
  | "LeadInteractionsContactLastName"
  | "LeadInteractionsUsecase"
  | "LeadInteractionsContactBusinessTitle"
  | (string & {});
export interface EngagementSearchSort {
  SortBy: EngagementSearchSortName;
  SortOrder: SortOrder;
}
export interface SearchEngagementsRequest {
  Catalog: string;
  Keyword?: string | redacted.Redacted<string> | undefined;
  Filter?: EngagementSearchFilter | undefined;
  GroupId?: string | undefined;
  Sort?: EngagementSearchSort | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface EngagementSearchSummary {
  Id?: string | undefined;
  Arn?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  CreatedAt?: Date | undefined;
  CreatedBy?: string | redacted.Redacted<string> | undefined;
  MemberCount?: number | undefined;
  ModifiedAt?: Date | undefined;
  ModifiedBy?: string | redacted.Redacted<string> | undefined;
  Contexts?: EngagementContextDetails[] | undefined;
}
export type EngagementSearchSummaryList = EngagementSearchSummary[];
export interface SearchEngagementsResponse {
  EngagementSearchSummaries?: EngagementSearchSummary[] | undefined;
  NextToken?: string | undefined;
}
export type SearchKeyword = string | redacted.Redacted<string>;
export type OpportunitySearchFilterList = OpportunitySearchFilter[];
export type OpportunitySearchFilterName =
  | "OpportunityId"
  | "Stage"
  | "ReviewStatus"
  | "CustomerCompanyName"
  | "LastModifiedDate"
  | "TargetCloseDate"
  | "CreatedDate"
  | "CountryCode"
  | "PartnerProjectTitle"
  | "OpportunityType"
  | "PartnerOpportunityIdentifier"
  | "Industry"
  | "AwsAccountId"
  | "ApnPrograms"
  | "Origin"
  | "Tags"
  | "NextStep"
  | "OfferId"
  | "OfferSetId"
  | "AwsMarketplaceSolution"
  | "CosellMotion"
  | "OpportunityOwner"
  | "EstimatedMrr"
  | "EngagementScore"
  | (string & {});
export type SearchFilterValue = string | redacted.Redacted<string>;
export type OpportunitySearchFilterValues = (string | redacted.Redacted<string>)[];
export type OpportunitySearchFilterValue =
  | {
      StringValue: string | redacted.Redacted<string>;
      StringListValue?: undefined;
      LongValue?: undefined;
      DoubleValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue: (string | redacted.Redacted<string>)[];
      LongValue?: undefined;
      DoubleValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue: number;
      DoubleValue?: undefined;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue?: undefined;
      DoubleValue: number;
      DateValue?: undefined;
    }
  | {
      StringValue?: undefined;
      StringListValue?: undefined;
      LongValue?: undefined;
      DoubleValue?: undefined;
      DateValue: Date;
    };
export interface OpportunitySearchPredicate {
  Key: OpportunitySearchFilterName;
  Value: OpportunitySearchFilterValue;
}
export interface OpportunitySearchFilter {
  AndAllFilters?: OpportunitySearchFilter[] | undefined;
  OrAllFilters?: OpportunitySearchFilter[] | undefined;
  NotFilter?: OpportunitySearchFilter | undefined;
  EqualsTo?: OpportunitySearchPredicate | undefined;
  ContainsAny?: OpportunitySearchPredicate | undefined;
  ContainsAll?: OpportunitySearchPredicate | undefined;
  GreaterThan?: OpportunitySearchPredicate | undefined;
  GreaterThanOrEquals?: OpportunitySearchPredicate | undefined;
  LessThan?: OpportunitySearchPredicate | undefined;
  LessThanOrEquals?: OpportunitySearchPredicate | undefined;
}
export type OpportunitySearchSortName =
  | "OpportunityId"
  | "Stage"
  | "ReviewStatus"
  | "CustomerCompanyName"
  | "LastModifiedDate"
  | "TargetCloseDate"
  | "CreatedDate"
  | "CountryCode"
  | "PartnerProjectTitle"
  | "OpportunityType"
  | "PartnerOpportunityIdentifier"
  | "Industry"
  | "AwsAccountId"
  | "Origin"
  | "NextStep"
  | "CosellMotion"
  | "OpportunityOwner"
  | "EngagementScore"
  | "EstimatedMrr"
  | "Tags"
  | "OfferId"
  | "OfferSetId"
  | "ApnPrograms"
  | (string & {});
export interface OpportunitySearchSort {
  SortBy: OpportunitySearchSortName;
  SortOrder: SortOrder;
}
export interface SearchOpportunitiesRequest {
  Catalog: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Keyword?: string | redacted.Redacted<string> | undefined;
  Filter?: OpportunitySearchFilter | undefined;
  Sort?: OpportunitySearchSort | undefined;
}
export interface OpportunitySearchLifeCycle {
  ReviewStatus?: ReviewStatus | undefined;
  Stage?: Stage | undefined;
  NextSteps?: string | redacted.Redacted<string> | undefined;
  TargetCloseDate?: string | undefined;
}
export type SearchCompanyName = string | redacted.Redacted<string>;
export type SearchAwsAccount = string | redacted.Redacted<string>;
export interface OpportunitySearchAddress {
  CountryCode?: CountryCode | undefined;
}
export interface OpportunitySearchAccount {
  CompanyName?: string | redacted.Redacted<string> | undefined;
  Industry?: Industry | undefined;
  AwsAccountId?: string | redacted.Redacted<string> | undefined;
  Address?: OpportunitySearchAddress | undefined;
}
export interface OpportunitySearchCustomer {
  Account?: OpportunitySearchAccount | undefined;
}
export interface OpportunitySearchExpectedCustomerSpend {
  Amount?: string | redacted.Redacted<string> | undefined;
  CurrencyCode: CurrencyCode;
}
export type OpportunitySearchExpectedCustomerSpendList = OpportunitySearchExpectedCustomerSpend[];
export interface OpportunitySearchProject {
  Title?: string | redacted.Redacted<string> | undefined;
  ApnPrograms?: string[] | undefined;
  ExpectedCustomerSpend?: OpportunitySearchExpectedCustomerSpend[] | undefined;
}
export interface OpportunitySearchRelatedEntityIdentifiers {
  AwsMarketplaceOffers?: string[] | undefined;
  AwsMarketplaceOfferSets?: string[] | undefined;
  AwsMarketplaceSolutions?: string[] | undefined;
  Solutions?: string[] | undefined;
}
export type SearchTeamMemberName = string | redacted.Redacted<string>;
export interface OpportunitySearchTeamMember {
  FirstName?: string | redacted.Redacted<string> | undefined;
  LastName?: string | redacted.Redacted<string> | undefined;
  BusinessTitle?: string | redacted.Redacted<string> | undefined;
}
export type OpportunitySearchTeamMembersList = OpportunitySearchTeamMember[];
export type CosellMotion = string | redacted.Redacted<string>;
export type SearchEngagementScore = "High" | "Medium" | "Low" | (string & {});
export interface OpportunitySearchOpportunityQuality {
  Score?: number | undefined;
}
export interface OpportunitySearchInsights {
  EngagementScore?: SearchEngagementScore | undefined;
  OpportunityQuality?: OpportunitySearchOpportunityQuality | undefined;
}
export interface OpportunitySearchAwsSummary {
  Origin?: OpportunityOrigin | undefined;
  CosellMotion?: string | redacted.Redacted<string> | undefined;
  Insights?: OpportunitySearchInsights | undefined;
}
export interface OpportunitySearchSummary {
  Id: string;
  LastModifiedDate: Date;
  CreatedDate: Date;
  OpportunityType?: OpportunityType | undefined;
  PartnerOpportunityIdentifier?: string | undefined;
  LifeCycle?: OpportunitySearchLifeCycle | undefined;
  Customer?: OpportunitySearchCustomer | undefined;
  Project?: OpportunitySearchProject | undefined;
  Tags?: Tag[] | undefined;
  RelatedEntityIdentifiers?: OpportunitySearchRelatedEntityIdentifiers | undefined;
  OpportunityTeam?: OpportunitySearchTeamMember[] | undefined;
  AwsOpportunitySummary?: OpportunitySearchAwsSummary | undefined;
}
export type OpportunitySearchSummaries = OpportunitySearchSummary[];
export interface SearchOpportunitiesResponse {
  OpportunitySearchSummaries: OpportunitySearchSummary[];
  NextToken?: string | undefined;
}
export type FileUri = string | redacted.Redacted<string>;
export interface StartCustomerAccountBulkJobRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  FileUri: string | redacted.Redacted<string>;
}
export interface StartCustomerAccountBulkJobResponse {
  Arn: string;
  Id: string;
  Status: BulkJobStatus;
  CreatedAt: Date;
}
export interface StartEngagementByAcceptingInvitationTaskRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  Identifier: string;
  Tags?: Tag[] | undefined;
}
export interface StartEngagementByAcceptingInvitationTaskResponse {
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementInvitationId?: string | undefined;
}
export interface AwsSubmission {
  InvolvementType: SalesInvolvementType;
  Visibility?: Visibility | undefined;
}
export interface StartEngagementFromOpportunityTaskRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  Identifier: string;
  AwsSubmission: AwsSubmission;
  Tags?: Tag[] | undefined;
}
export interface StartEngagementFromOpportunityTaskResponse {
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementId?: string | undefined;
  EngagementInvitationId?: string | undefined;
}
export interface StartOpportunityBulkJobRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  FileURI: string | redacted.Redacted<string>;
  FileFormat: BulkFileFormat;
}
export interface StartOpportunityBulkJobResponse {
  JobId: string;
}
export interface StartOpportunityFromEngagementTaskRequest {
  Catalog: string;
  ClientToken?: string | undefined;
  Identifier: string;
  ContextIdentifier: string;
  Tags?: Tag[] | undefined;
}
export interface StartOpportunityFromEngagementTaskResponse {
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
  StartTime?: Date | undefined;
  TaskStatus?: TaskStatus | undefined;
  Message?: string | undefined;
  ReasonCode?: ReasonCode | undefined;
  OpportunityId?: string | undefined;
  ResourceSnapshotJobId?: string | undefined;
  EngagementId?: string | undefined;
  ContextId?: string | undefined;
}
export type EngagementIdentifierList = string[];
export interface StartProspectingFromEngagementTaskRequest {
  Catalog: string;
  Identifiers: string[];
  TaskName: string;
  ClientToken?: string | undefined;
}
export interface StartProspectingFromEngagementTaskResponse {
  Identifiers: string[];
  TaskName: string;
  Message?: string | undefined;
  ReasonCode?: string | undefined;
  StartTime: Date;
  TaskId?: string | undefined;
  TaskArn?: string | undefined;
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
  Visibility?: Visibility | undefined;
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
export interface UpdateCustomerAccountRequest {
  Catalog: string;
  Identifier: string;
  Account: CustomerAccountData;
  PartnerAccountIdentifier?: string | undefined;
  LastModifiedDate: Date;
}
export interface UpdateCustomerAccountResponse {
  Arn: string;
  Id: string;
  Status: EnrichmentStatus;
  Catalog: string;
  PartnerAccountIdentifier?: string | undefined;
  CreatedDate: Date;
  LastModifiedDate: Date;
}
export interface UpdateLeadContext {
  QualificationStatus?: string | undefined;
  Customer: LeadCustomer;
  Interaction?: LeadInteraction | undefined;
  Insights?: LeadInsights | undefined;
}
export type UpdateEngagementContextPayload =
  | { Lead: UpdateLeadContext; CustomerProject?: undefined; ProspectingResult?: undefined }
  | { Lead?: undefined; CustomerProject: CustomerProjectsContext; ProspectingResult?: undefined }
  | { Lead?: undefined; CustomerProject?: undefined; ProspectingResult: ProspectingResult };
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
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[] | undefined;
  NationalSecurity?: NationalSecurity | undefined;
  PartnerOpportunityIdentifier?: string | undefined;
  Customer?: Customer | undefined;
  Project?: Project | undefined;
  OpportunityType?: OpportunityType | undefined;
  Marketing?: Marketing | undefined;
  SoftwareRevenue?: SoftwareRevenue | undefined;
  LastModifiedDate: Date;
  Identifier: string;
  LifeCycle?: LifeCycle | undefined;
}
export interface UpdateOpportunityResponse {
  Id: string;
  LastModifiedDate: Date;
}
export type AccessDeniedExceptionErrorCode =
  | "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE"
  | "SEARCH_OPPORTUNITIES_NOT_ENABLED"
  | "SEARCH_OPPORTUNITIES_DATA_NOT_ROUTED_TO_DDB"
  | "OPPORTUNITY_BULK_JOB_NOT_ENABLED"
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
  FieldName?: string | undefined;
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
  AcceptEngagementInvitationRequest & RegionInput,
  AcceptEngagementInvitationResponse,
  AcceptEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<AcceptEngagementInvitationRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<AcceptEngagementInvitationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptEngagementInvitation",
  telemetry: TELEMETRY,
  span: "AcceptEngagementInvitation",
}));

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
  AssignOpportunityRequest & RegionInput,
  AssignOpportunityResponse,
  AssignOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3009, __c94, 1) as any as S.Schema<AssignOpportunityRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<AssignOpportunityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssignOpportunity",
  telemetry: TELEMETRY,
  span: "AssignOpportunity",
}));

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
  AssociateOpportunityRequest & RegionInput,
  AssociateOpportunityResponse,
  AssociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<AssociateOpportunityRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<AssociateOpportunityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateOpportunity",
  telemetry: TELEMETRY,
  span: "AssociateOpportunity",
}));

export type CreateCustomerAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `CreateCustomerAccount` to map a customer account from your records to an AWS customer. Provide details about the customer, such as the company name and website. AWS then matches the account to a customer and adds enrichment information about it.
 *
 * Matching runs asynchronously. The response returns the new customer account with a status of `PENDING`. Use `GetCustomerAccount` to check the result and read the enrichment information.
 */
export const createCustomerAccount: API.OperationMethod<
  CreateCustomerAccountRequest & RegionInput,
  CreateCustomerAccountResponse,
  CreateCustomerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateCustomerAccountRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateCustomerAccountResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomerAccount",
  telemetry: TELEMETRY,
  span: "CreateCustomerAccount",
}));

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
  CreateEngagementRequest & RegionInput,
  CreateEngagementResponse,
  CreateEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateEngagementRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<CreateEngagementResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEngagement",
  telemetry: TELEMETRY,
  span: "CreateEngagement",
}));

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
  CreateEngagementContextRequest & RegionInput,
  CreateEngagementContextResponse,
  CreateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<CreateEngagementContextRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<CreateEngagementContextResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEngagementContext",
  telemetry: TELEMETRY,
  span: "CreateEngagementContext",
}));

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
  CreateEngagementInvitationRequest & RegionInput,
  CreateEngagementInvitationResponse,
  CreateEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(417, __c13, 1) as any as S.Schema<CreateEngagementInvitationRequest>,
  output: __S(418, __c13, 2) as any as S.Schema<CreateEngagementInvitationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEngagementInvitation",
  telemetry: TELEMETRY,
  span: "CreateEngagementInvitation",
}));

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
  CreateOpportunityRequest & RegionInput,
  CreateOpportunityResponse,
  CreateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreateOpportunityRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<CreateOpportunityResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpportunity",
  telemetry: TELEMETRY,
  span: "CreateOpportunity",
}));

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
  CreateResourceSnapshotRequest & RegionInput,
  CreateResourceSnapshotResponse,
  CreateResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<CreateResourceSnapshotRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<CreateResourceSnapshotResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceSnapshot",
  telemetry: TELEMETRY,
  span: "CreateResourceSnapshot",
}));

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
  CreateResourceSnapshotJobRequest & RegionInput,
  CreateResourceSnapshotJobResponse,
  CreateResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CreateResourceSnapshotJobRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<CreateResourceSnapshotJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceSnapshotJob",
  telemetry: TELEMETRY,
  span: "CreateResourceSnapshotJob",
}));

export type DeleteCustomerAccountError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `DeleteCustomerAccount` to delete a customer account. This operation is idempotent. Deleting a customer account that was already deleted succeeds.
 */
export const deleteCustomerAccount: API.OperationMethod<
  DeleteCustomerAccountRequest & RegionInput,
  DeleteCustomerAccountResponse,
  DeleteCustomerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeleteCustomerAccountRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<DeleteCustomerAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomerAccount",
  telemetry: TELEMETRY,
  span: "DeleteCustomerAccount",
}));

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
  DeleteResourceSnapshotJobRequest & RegionInput,
  DeleteResourceSnapshotJobResponse,
  DeleteResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<DeleteResourceSnapshotJobRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<DeleteResourceSnapshotJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceSnapshotJob",
  telemetry: TELEMETRY,
  span: "DeleteResourceSnapshotJob",
}));

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
  DisassociateOpportunityRequest & RegionInput,
  DisassociateOpportunityResponse,
  DisassociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DisassociateOpportunityRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<DisassociateOpportunityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateOpportunity",
  telemetry: TELEMETRY,
  span: "DisassociateOpportunity",
}));

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
  GetAwsOpportunitySummaryRequest & RegionInput,
  GetAwsOpportunitySummaryResponse,
  GetAwsOpportunitySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<GetAwsOpportunitySummaryRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<GetAwsOpportunitySummaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAwsOpportunitySummary",
  telemetry: TELEMETRY,
  span: "GetAwsOpportunitySummary",
}));

export type GetCustomerAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `GetCustomerAccount` to retrieve the details of a customer account, including the customer information that you provided, the enrichment status, and the enrichment information that AWS provides when the status is `ENRICHED`.
 */
export const getCustomerAccount: API.OperationMethod<
  GetCustomerAccountRequest & RegionInput,
  GetCustomerAccountResponse,
  GetCustomerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<GetCustomerAccountRequest>,
  output: __S(966, __c30, 6) as any as S.Schema<GetCustomerAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomerAccount",
  telemetry: TELEMETRY,
  span: "GetCustomerAccount",
}));

export type GetCustomerAccountBulkJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `GetCustomerAccountBulkJob` to retrieve the status and record counts of a bulk job.
 */
export const getCustomerAccountBulkJob: API.OperationMethod<
  GetCustomerAccountBulkJobRequest & RegionInput,
  GetCustomerAccountBulkJobResponse,
  GetCustomerAccountBulkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<GetCustomerAccountBulkJobRequest>,
  output: __S(1024, __c32, 0) as any as S.Schema<GetCustomerAccountBulkJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomerAccountBulkJob",
  telemetry: TELEMETRY,
  span: "GetCustomerAccountBulkJob",
}));

export type GetCustomerAccountBulkJobReportUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `GetCustomerAccountBulkJobReportUrl` to get a temporary URL for downloading the report of a bulk job, such as the list of records that failed. A report is available only after the job is `COMPLETED` or `FAILED`. For a job that is still running, the request fails with a `ConflictException`.
 *
 * The report is generated on request. If `ReportStatus` is not `AVAILABLE`, call the operation again later.
 */
export const getCustomerAccountBulkJobReportUrl: API.OperationMethod<
  GetCustomerAccountBulkJobReportUrlRequest & RegionInput,
  GetCustomerAccountBulkJobReportUrlResponse,
  GetCustomerAccountBulkJobReportUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<GetCustomerAccountBulkJobReportUrlRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<GetCustomerAccountBulkJobReportUrlResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomerAccountBulkJobReportUrl",
  telemetry: TELEMETRY,
  span: "GetCustomerAccountBulkJobReportUrl",
}));

export type GetCustomerAccountStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `GetCustomerAccountStatistics` to count your customer accounts and group them by fields such as industry, geography, or enrichment status. You can use the same filters as `SearchCustomerAccounts`.
 */
export const getCustomerAccountStatistics: API.OperationMethod<
  GetCustomerAccountStatisticsRequest & RegionInput,
  GetCustomerAccountStatisticsResponse,
  GetCustomerAccountStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1090, __c34, 2) as any as S.Schema<GetCustomerAccountStatisticsRequest>,
  output: __S(1095, __c34, 7) as any as S.Schema<GetCustomerAccountStatisticsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomerAccountStatistics",
  telemetry: TELEMETRY,
  span: "GetCustomerAccountStatistics",
}));

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
  GetEngagementRequest & RegionInput,
  GetEngagementResponse,
  GetEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetEngagementRequest>,
  output: __S(1184, __c37, 0) as any as S.Schema<GetEngagementResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngagement",
  telemetry: TELEMETRY,
  span: "GetEngagement",
}));

export type GetEngagementInvitationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an engagement invitation shared by AWS with a partner. The information includes aspects such as customer, project details, and lifecycle information. To connect an engagement invitation with an opportunity, match the invitation's `Payload.Project.Title` with opportunity `Project.Title`.
 */
export const getEngagementInvitation: API.OperationMethod<
  GetEngagementInvitationRequest & RegionInput,
  GetEngagementInvitationResponse,
  GetEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<GetEngagementInvitationRequest>,
  output: __S(1221, __c38, 5) as any as S.Schema<GetEngagementInvitationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngagementInvitation",
  telemetry: TELEMETRY,
  span: "GetEngagementInvitation",
}));

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
  GetOpportunityRequest & RegionInput,
  GetOpportunityResponse,
  GetOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<GetOpportunityRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<GetOpportunityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpportunity",
  telemetry: TELEMETRY,
  span: "GetOpportunity",
}));

export type GetOpportunityBulkJobReportUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of the failed-records report for a finished opportunity bulk job and, when the report is ready, a temporary URL to download it.
 *
 * A report is available only after the job is `COMPLETED` or `FAILED`. The URL expires after 15 minutes, and the report expires after about 7 days.
 */
export const getOpportunityBulkJobReportUrl: API.OperationMethod<
  GetOpportunityBulkJobReportUrlRequest & RegionInput,
  GetOpportunityBulkJobReportUrlResponse,
  GetOpportunityBulkJobReportUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<GetOpportunityBulkJobReportUrlRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<GetOpportunityBulkJobReportUrlResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpportunityBulkJobReportUrl",
  telemetry: TELEMETRY,
  span: "GetOpportunityBulkJobReportUrl",
}));

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
  GetProspectingFromEngagementTaskRequest & RegionInput,
  GetProspectingFromEngagementTaskResponse,
  GetProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<GetProspectingFromEngagementTaskRequest>,
  output: __S(1347, __c42, 3) as any as S.Schema<GetProspectingFromEngagementTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProspectingFromEngagementTask",
  telemetry: TELEMETRY,
  span: "GetProspectingFromEngagementTask",
}));

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
  GetResourceSnapshotRequest & RegionInput,
  GetResourceSnapshotResponse,
  GetResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<GetResourceSnapshotRequest>,
  output: __S(1382, __c43, 6) as any as S.Schema<GetResourceSnapshotResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSnapshot",
  telemetry: TELEMETRY,
  span: "GetResourceSnapshot",
}));

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
  GetResourceSnapshotJobRequest & RegionInput,
  GetResourceSnapshotJobResponse,
  GetResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<GetResourceSnapshotJobRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<GetResourceSnapshotJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSnapshotJob",
  telemetry: TELEMETRY,
  span: "GetResourceSnapshotJob",
}));

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
  GetSellingSystemSettingsRequest & RegionInput,
  GetSellingSystemSettingsResponse,
  GetSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<GetSellingSystemSettingsRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<GetSellingSystemSettingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSellingSystemSettings",
  telemetry: TELEMETRY,
  span: "GetSellingSystemSettings",
}));

export type ListCustomerAccountBulkJobResultsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `ListCustomerAccountBulkJobResults` to list the outcome of each record in a bulk job. You can filter the results to records that succeeded or failed. A job that failed before it processed any records returns an empty list.
 *
 * Results are paginated. Use `NextToken` to retrieve additional results.
 */
export const listCustomerAccountBulkJobResults: API.PaginatedOperationMethod<
  ListCustomerAccountBulkJobResultsRequest & RegionInput,
  ListCustomerAccountBulkJobResultsResponse,
  ListCustomerAccountBulkJobResultsError,
  Credentials | HttpClient.HttpClient,
  BulkJobResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<ListCustomerAccountBulkJobResultsRequest>,
  output: __S(1570, __c49, 2) as any as S.Schema<ListCustomerAccountBulkJobResultsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomerAccountBulkJobResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomerAccountBulkJobResults",
})) as any;

export type ListCustomerAccountBulkJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `ListCustomerAccountBulkJobs` to list the bulk jobs in the specified catalog. You can filter the results by job identifier or status.
 *
 * Results are paginated. Use `NextToken` to retrieve additional results.
 */
export const listCustomerAccountBulkJobs: API.PaginatedOperationMethod<
  ListCustomerAccountBulkJobsRequest & RegionInput,
  ListCustomerAccountBulkJobsResponse,
  ListCustomerAccountBulkJobsError,
  Credentials | HttpClient.HttpClient,
  CustomerAccountBulkJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1601, __c50, 1) as any as S.Schema<ListCustomerAccountBulkJobsRequest>,
  output: __S(1603, __c50, 3) as any as S.Schema<ListCustomerAccountBulkJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomerAccountBulkJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomerAccountBulkJobs",
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
  ListEngagementByAcceptingInvitationTasksRequest & RegionInput,
  ListEngagementByAcceptingInvitationTasksResponse,
  ListEngagementByAcceptingInvitationTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementByAcceptingInvitationTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<ListEngagementByAcceptingInvitationTasksRequest>,
  output: __S(1634, __c51, 2) as any as S.Schema<ListEngagementByAcceptingInvitationTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementByAcceptingInvitationTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementByAcceptingInvitationTasks",
})) as any;

export type ListEngagementFromOpportunityTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed EngagementFromOpportunity tasks that were initiated by the caller's account.
 */
export const listEngagementFromOpportunityTasks: API.PaginatedOperationMethod<
  ListEngagementFromOpportunityTasksRequest & RegionInput,
  ListEngagementFromOpportunityTasksResponse,
  ListEngagementFromOpportunityTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementFromOpportunityTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<ListEngagementFromOpportunityTasksRequest>,
  output: __S(1730, __c54, 2) as any as S.Schema<ListEngagementFromOpportunityTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementFromOpportunityTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementFromOpportunityTasks",
})) as any;

export type ListEngagementGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the active, fully curated AWS Partner Central engagement groups that are available to you in the specified catalog. An engagement group is a curated set of engagements that share common characteristics, such as customer geography, industry, or solution category. To retrieve the engagements in a group, pass the group `Id` to `SearchEngagements` as `GroupId`, and use `NextToken` to retrieve additional pages of groups.
 */
export const listEngagementGroups: API.PaginatedOperationMethod<
  ListEngagementGroupsRequest & RegionInput,
  ListEngagementGroupsResponse,
  ListEngagementGroupsError,
  Credentials | HttpClient.HttpClient,
  EngagementGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<ListEngagementGroupsRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<ListEngagementGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementGroupSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementGroups",
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
  ListEngagementInvitationsRequest & RegionInput,
  ListEngagementInvitationsResponse,
  ListEngagementInvitationsError,
  Credentials | HttpClient.HttpClient,
  EngagementInvitationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<ListEngagementInvitationsRequest>,
  output: __S(1859, __c58, 3) as any as S.Schema<ListEngagementInvitationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementInvitationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementInvitations",
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
  ListEngagementMembersRequest & RegionInput,
  ListEngagementMembersResponse,
  ListEngagementMembersError,
  Credentials | HttpClient.HttpClient,
  EngagementMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<ListEngagementMembersRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<ListEngagementMembersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementMemberList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementMembers",
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
  ListEngagementResourceAssociationsRequest & RegionInput,
  ListEngagementResourceAssociationsResponse,
  ListEngagementResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  EngagementResourceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<ListEngagementResourceAssociationsRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListEngagementResourceAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementResourceAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagementResourceAssociations",
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
  ListEngagementsRequest & RegionInput,
  ListEngagementsResponse,
  ListEngagementsError,
  Credentials | HttpClient.HttpClient,
  EngagementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ListEngagementsRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListEngagementsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementSummaryList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEngagements",
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
 * To synchronize your system with Amazon Web Services, list only the opportunities that were newly created or updated. We recommend you rely on events emitted by the service into your Amazon Web Services account's Amazon EventBridge default event bus. You can also use the `ListOpportunities` action.
 *
 * We recommend the following approach:
 *
 * - Find the latest `LastModifiedDate` that you stored, and only use the values that came from Amazon Web Services. Don't use values generated by your system.
 *
 * - When you send a `ListOpportunities` request, submit the date in ISO 8601 format in the `AfterLastModifiedDate` filter.
 *
 * - Amazon Web Services only returns opportunities created or updated on or after that date and time. Use `NextToken` to iterate over all pages.
 */
export const listOpportunities: API.PaginatedOperationMethod<
  ListOpportunitiesRequest & RegionInput,
  ListOpportunitiesResponse,
  ListOpportunitiesError,
  Credentials | HttpClient.HttpClient,
  OpportunitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1987, __c62, 3) as any as S.Schema<ListOpportunitiesRequest>,
  output: __S(1995, __c62, 11) as any as S.Schema<ListOpportunitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpportunitySummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpportunities",
})) as any;

export type ListOpportunityBulkJobResultsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the outcome of each record in an opportunity bulk job. You can filter the results by record status.
 *
 * Results are paginated. Use `NextToken` to retrieve additional results.
 */
export const listOpportunityBulkJobResults: API.PaginatedOperationMethod<
  ListOpportunityBulkJobResultsRequest & RegionInput,
  ListOpportunityBulkJobResultsResponse,
  ListOpportunityBulkJobResultsError,
  Credentials | HttpClient.HttpClient,
  BulkJobResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<ListOpportunityBulkJobResultsRequest>,
  output: __S(1570, __c49, 2) as any as S.Schema<ListOpportunityBulkJobResultsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunityBulkJobResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpportunityBulkJobResults",
})) as any;

export type ListOpportunityBulkJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the opportunity bulk jobs in the specified catalog, newest first. You can filter the results by job identifier or status.
 *
 * Results are paginated. Use `NextToken` to retrieve additional results.
 */
export const listOpportunityBulkJobs: API.PaginatedOperationMethod<
  ListOpportunityBulkJobsRequest & RegionInput,
  ListOpportunityBulkJobsResponse,
  ListOpportunityBulkJobsError,
  Credentials | HttpClient.HttpClient,
  OpportunityBulkJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<ListOpportunityBulkJobsRequest>,
  output: __S(2051, __c64, 3) as any as S.Schema<ListOpportunityBulkJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunityBulkJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpportunityBulkJobSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpportunityBulkJobs",
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
  ListOpportunityFromEngagementTasksRequest & RegionInput,
  ListOpportunityFromEngagementTasksResponse,
  ListOpportunityFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ListOpportunityFromEngagementTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<ListOpportunityFromEngagementTasksRequest>,
  output: __S(2082, __c65, 2) as any as S.Schema<ListOpportunityFromEngagementTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunityFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpportunityFromEngagementTasks",
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
  ListProspectingFromEngagementTasksRequest & RegionInput,
  ListProspectingFromEngagementTasksResponse,
  ListProspectingFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ProspectingTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<ListProspectingFromEngagementTasksRequest>,
  output: __S(2147, __c67, 3) as any as S.Schema<ListProspectingFromEngagementTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProspectingFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProspectingFromEngagementTasks",
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
  ListResourceSnapshotJobsRequest & RegionInput,
  ListResourceSnapshotJobsResponse,
  ListResourceSnapshotJobsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2177, __c68, 1) as any as S.Schema<ListResourceSnapshotJobsRequest>,
  output: __S(2180, __c68, 4) as any as S.Schema<ListResourceSnapshotJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSnapshotJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotJobSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceSnapshotJobs",
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
  ListResourceSnapshotsRequest & RegionInput,
  ListResourceSnapshotsResponse,
  ListResourceSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<ListResourceSnapshotsRequest>,
  output: __S(2211, __c69, 3) as any as S.Schema<ListResourceSnapshotsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceSnapshots",
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
  ListSolutionsRequest & RegionInput,
  ListSolutionsResponse,
  ListSolutionsError,
  Credentials | HttpClient.HttpClient,
  SolutionBase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListSolutionsRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListSolutionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SolutionSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSolutions",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  PutSellingSystemSettingsRequest & RegionInput,
  PutSellingSystemSettingsResponse,
  PutSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<PutSellingSystemSettingsRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<PutSellingSystemSettingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSellingSystemSettings",
  telemetry: TELEMETRY,
  span: "PutSellingSystemSettings",
}));

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
  RejectEngagementInvitationRequest & RegionInput,
  RejectEngagementInvitationResponse,
  RejectEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<RejectEngagementInvitationRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<RejectEngagementInvitationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectEngagementInvitation",
  telemetry: TELEMETRY,
  span: "RejectEngagementInvitation",
}));

export type SearchCustomerAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `SearchCustomerAccounts` to find customer accounts in the specified catalog. You can filter the results by fields such as enrichment status, industry, geography, and creation date, and sort them by company name, date, or score.
 *
 * Results are paginated. Use `NextToken` to retrieve additional results.
 */
export const searchCustomerAccounts: API.PaginatedOperationMethod<
  SearchCustomerAccountsRequest & RegionInput,
  SearchCustomerAccountsResponse,
  SearchCustomerAccountsError,
  Credentials | HttpClient.HttpClient,
  CustomerAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<SearchCustomerAccountsRequest>,
  output: __S(2375, __c74, 7) as any as S.Schema<SearchCustomerAccountsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchCustomerAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomerAccountSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchCustomerAccounts",
})) as any;

export type SearchEngagementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the engagements in AWS Partner Central that match your criteria, such as customer industry or geography. You can combine a free-text `Keyword`, a structured `Filter` tree, an engagement group (`GroupId`), and `Sort` options, and each search criterion that you specify narrows the results. Results are paginated, so use `NextToken` to retrieve additional results.
 */
export const searchEngagements: API.PaginatedOperationMethod<
  SearchEngagementsRequest & RegionInput,
  SearchEngagementsResponse,
  SearchEngagementsError,
  Credentials | HttpClient.HttpClient,
  EngagementSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2404, __c75, 4) as any as S.Schema<SearchEngagementsRequest>,
  output: __S(2406, __c75, 6) as any as S.Schema<SearchEngagementsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementSearchSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchEngagements",
})) as any;

export type SearchOpportunitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `SearchOpportunities` operation in the AWS Partner Central Selling API searches and filters the opportunities available to you in AWS Partner Central.
 *
 * You can optionally provide a free-text `Keyword`, a structured `Filter` tree, and `Sort` options. The operation returns a curated summary view of each matching opportunity. If you supply both `Keyword` and `Filter`, the operation combines them with a logical AND, so each one narrows the result set.
 *
 * Results are paginated. Use the `NextToken` parameter to retrieve additional pages of results.
 */
export const searchOpportunities: API.PaginatedOperationMethod<
  SearchOpportunitiesRequest & RegionInput,
  SearchOpportunitiesResponse,
  SearchOpportunitiesError,
  Credentials | HttpClient.HttpClient,
  OpportunitySearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2436, __c76, 4) as any as S.Schema<SearchOpportunitiesRequest>,
  output: __S(2452, __c76, 20) as any as S.Schema<SearchOpportunitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchOpportunities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpportunitySearchSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchOpportunities",
})) as any;

export type StartCustomerAccountBulkJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `StartCustomerAccountBulkJob` to create many customer accounts from a single file. The job starts processing as soon as it is created.
 *
 * Use `GetCustomerAccountBulkJob` to track progress, `ListCustomerAccountBulkJobResults` to review the outcome of each record, and `GetCustomerAccountBulkJobReportUrl` to download a report when the job finishes.
 */
export const startCustomerAccountBulkJob: API.OperationMethod<
  StartCustomerAccountBulkJobRequest & RegionInput,
  StartCustomerAccountBulkJobResponse,
  StartCustomerAccountBulkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<StartCustomerAccountBulkJobRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<StartCustomerAccountBulkJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCustomerAccountBulkJob",
  telemetry: TELEMETRY,
  span: "StartCustomerAccountBulkJob",
}));

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
 * This action starts the engagement by accepting an `EngagementInvitation`. The task is asynchronous and involves the following steps: accepting the invitation, creating an opportunity in the partner's account from the AWS opportunity, and copying details for tracking. When completed, an `Opportunity Created` event is generated, indicating that the opportunity has been successfully created in the partner's account.
 */
export const startEngagementByAcceptingInvitationTask: API.OperationMethod<
  StartEngagementByAcceptingInvitationTaskRequest & RegionInput,
  StartEngagementByAcceptingInvitationTaskResponse,
  StartEngagementByAcceptingInvitationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<StartEngagementByAcceptingInvitationTaskRequest>,
  output: __S(1696, __c53, 0) as any as S.Schema<StartEngagementByAcceptingInvitationTaskResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEngagementByAcceptingInvitationTask",
  telemetry: TELEMETRY,
  span: "StartEngagementByAcceptingInvitationTask",
}));

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
  StartEngagementFromOpportunityTaskRequest & RegionInput,
  StartEngagementFromOpportunityTaskResponse,
  StartEngagementFromOpportunityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2529, __c79, 1) as any as S.Schema<StartEngagementFromOpportunityTaskRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<StartEngagementFromOpportunityTaskResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEngagementFromOpportunityTask",
  telemetry: TELEMETRY,
  span: "StartEngagementFromOpportunityTask",
}));

export type StartOpportunityBulkJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `StartOpportunityBulkJob` operation creates or updates many opportunities in AWS Partner Central (Partner Central) from a single CSV file. The column headers in the file determine whether the job creates or updates opportunities.
 *
 * Returns a `JobId` for the job. Use `ListOpportunityBulkJobs` to track the job, `ListOpportunityBulkJobResults` to review each record, and `GetOpportunityBulkJobReportUrl` to download a report of the failed records.
 */
export const startOpportunityBulkJob: API.OperationMethod<
  StartOpportunityBulkJobRequest & RegionInput,
  StartOpportunityBulkJobResponse,
  StartOpportunityBulkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<StartOpportunityBulkJobRequest>,
  output: __S(2561, __c80, 1) as any as S.Schema<StartOpportunityBulkJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOpportunityBulkJob",
  telemetry: TELEMETRY,
  span: "StartOpportunityBulkJob",
}));

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
  StartOpportunityFromEngagementTaskRequest & RegionInput,
  StartOpportunityFromEngagementTaskResponse,
  StartOpportunityFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<StartOpportunityFromEngagementTaskRequest>,
  output: __S(2112, __c66, 0) as any as S.Schema<StartOpportunityFromEngagementTaskResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOpportunityFromEngagementTask",
  telemetry: TELEMETRY,
  span: "StartOpportunityFromEngagementTask",
}));

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
  StartProspectingFromEngagementTaskRequest & RegionInput,
  StartProspectingFromEngagementTaskResponse,
  StartProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<StartProspectingFromEngagementTaskRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<StartProspectingFromEngagementTaskResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProspectingFromEngagementTask",
  telemetry: TELEMETRY,
  span: "StartProspectingFromEngagementTask",
}));

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
  StartResourceSnapshotJobRequest & RegionInput,
  StartResourceSnapshotJobResponse,
  StartResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<StartResourceSnapshotJobRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<StartResourceSnapshotJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceSnapshotJob",
  telemetry: TELEMETRY,
  span: "StartResourceSnapshotJob",
}));

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
  StopResourceSnapshotJobRequest & RegionInput,
  StopResourceSnapshotJobResponse,
  StopResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<StopResourceSnapshotJobRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<StopResourceSnapshotJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopResourceSnapshotJob",
  telemetry: TELEMETRY,
  span: "StopResourceSnapshotJob",
}));

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
  SubmitOpportunityRequest & RegionInput,
  SubmitOpportunityResponse,
  SubmitOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<SubmitOpportunityRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<SubmitOpportunityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitOpportunity",
  telemetry: TELEMETRY,
  span: "SubmitOpportunity",
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
 * Assigns one or more tags (key-value pairs) to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
 * Removes a tag or tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2976, __c93, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateCustomerAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `UpdateCustomerAccount` to replace the customer information on an existing customer account. AWS matches the account again with the updated information.
 *
 * To prevent concurrent changes from overwriting each other, specify the `LastModifiedDate` value that you last read for the account. If the account changed since then, the request fails with a `ConflictException`.
 */
export const updateCustomerAccount: API.OperationMethod<
  UpdateCustomerAccountRequest & RegionInput,
  UpdateCustomerAccountResponse,
  UpdateCustomerAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<UpdateCustomerAccountRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<UpdateCustomerAccountResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomerAccount",
  telemetry: TELEMETRY,
  span: "UpdateCustomerAccount",
}));

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
  UpdateEngagementContextRequest & RegionInput,
  UpdateEngagementContextResponse,
  UpdateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2882, __c90, 2) as any as S.Schema<UpdateEngagementContextRequest>,
  output: __S(2883, __c90, 3) as any as S.Schema<UpdateEngagementContextResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEngagementContext",
  telemetry: TELEMETRY,
  span: "UpdateEngagementContext",
}));

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
  UpdateOpportunityRequest & RegionInput,
  UpdateOpportunityResponse,
  UpdateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<UpdateOpportunityRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<UpdateOpportunityResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpportunity",
  telemetry: TELEMETRY,
  span: "UpdateOpportunity",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Account: __S(96, __c3, 0),
          PartnerAccountIdentifier: S.optional(S.String),
          Tags: S.optional(__S(33, __c1, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateCustomerAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomerAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Status: S.String,
          Catalog: S.String,
          PartnerAccountIdentifier: S.optional(S.String),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateCustomerAccountResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
          StateOrRegion: S.optional(SensitiveString),
          CountryCode: S.optional(S.String),
          StreetAddress: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Address" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          Duns: S.optional(SensitiveString),
          Address: S.optional(__S(64, __c2, 0)),
          Industry: S.optional(S.String),
          OtherIndustry: S.optional(S.String),
          Domain: S.optional(SensitiveString),
          ParentCompanyName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CustomerAccountData" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Contexts: S.optional(__S(353, __c11, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateEngagement" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEngagementRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateEngagementResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          CountryCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountCustomer" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Industry: S.String,
          CompanyName: SensitiveString,
          WebsiteUrl: SensitiveString,
          CountryCode: S.String,
        }),
      ).annotate({ identifier: "EngagementCustomer" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Day: S.String, StartTimeUtc: S.String, EndTimeUtc: S.String }),
      ).annotate({ identifier: "BestOutreachWindow" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecommendedChannel: S.String,
          BestOutreachWindows: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "ChannelRecommendation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LeadReadinessScore: S.optional(S.String),
          ChannelRecommendation: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "LeadInsights" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AccountName: S.optional(S.String),
          Geo: S.optional(S.String),
          Region: S.optional(S.String),
          SubRegion: S.optional(S.String),
          Country: S.optional(S.String),
          Industry: S.optional(S.String),
          SubIndustry: S.optional(S.String),
          Segment: S.optional(S.String),
          CompanySize: S.optional(S.String),
          EligiblePrograms: S.optional(__S(224, __c7, 0)),
          PublicProfileSummary: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProspectingResultCustomer" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MarketplaceEngagementScore: S.optional(S.String),
          SolutionScore: S.optional(S.String),
          SolutionCategory: S.optional(S.String),
          SolutionSubCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProspectingInsights" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(325, __c10, 5));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Insights: S.optional(__S(259, __c8, 3)),
          QualificationStatus: S.optional(S.String),
          Customer: __S(323, __c10, 3),
          Interactions: __S(288, __c9, 0),
        }),
      ).annotate({ identifier: "LeadContext" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifier: S.optional(S.String),
          Customer: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "CustomerAccountContext" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ CustomerProject: __S(321, __c10, 1) }),
        /*@__PURE__*/ S.Struct({ Lead: __S(289, __c9, 1) }),
        /*@__PURE__*/ S.Struct({ ProspectingResult: __S(327, __c10, 7) }),
        /*@__PURE__*/ S.Struct({ CustomerAccount: __S(290, __c9, 2) }),
      ]);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          BusinessProblem: SensitiveString,
          TargetCompletionDate: S.String,
        }),
      ).annotate({ identifier: "EngagementCustomerProjectDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Customer: S.optional(__S(192, __c6, 0)),
          Project: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "CustomerProjectsContext" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(S.String),
          PostalCode: S.optional(S.String),
          StateOrRegion: S.optional(S.String),
          CountryCode: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "LeadAddress" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          Address: S.optional(__S(322, __c10, 2)),
          AwsMaturity: S.optional(S.String),
          MarketSegment: S.optional(S.String),
        }),
      ).annotate({ identifier: "LeadCustomer" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BusinessTitle: SensitiveString,
          Email: SensitiveString,
          FirstName: SensitiveString,
          LastName: SensitiveString,
          Phone: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "LeadContact" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          SourceId: S.optional(S.String),
          SourceName: S.optional(S.String),
          Usecase: S.optional(S.String),
          InteractionDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CustomerAction: S.optional(S.String),
          BusinessProblem: S.optional(SensitiveString),
          Contact: __S(324, __c10, 4),
        }),
      ).annotate({ identifier: "LeadInteraction" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Customer: S.optional(__S(260, __c8, 4)),
          Insights: S.optional(__S(261, __c8, 5)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          TaskName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProspectingResultAws" });
    case 7:
      return S.suspend(() => S.Struct({ Aws: S.optional(__S(326, __c10, 6)) })).annotate({
        identifier: "ProspectingResult",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.String,
          Payload: S.optional(__S(291, __c9, 3)),
        }),
      ).annotate({ identifier: "EngagementContextDetails" });
    case 1:
      return S.Array(__S(352, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          EngagementIdentifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Type: S.String,
          Payload: __S(291, __c9, 3),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateEngagementContext" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEngagementContextRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EngagementId: S.optional(S.String),
          EngagementArn: S.optional(S.String),
          EngagementLastModifiedAt: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ContextId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateEngagementContextResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Message: SensitiveString,
          Receiver: __S(545, __c17, 1),
          Payload: __S(521, __c16, 9),
        }),
      ).annotate({ identifier: "Invitation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          EngagementIdentifier: S.String,
          Invitation: __S(416, __c13, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateEngagementInvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEngagementInvitationRequest" });
    case 2:
      return S.suspend(() => S.Struct({ Id: S.String, Arn: S.String })).annotate({
        identifier: "CreateEngagementInvitationResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Amount: S.optional(SensitiveString),
          CurrencyCode: S.String,
          Frequency: S.String,
          TargetCompany: S.String,
          EstimationUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExpectedCustomerSpend" });
    case 1:
      return S.Array(__S(448, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: SensitiveString,
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BusinessTitle: S.optional(SensitiveString),
          Phone: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SenderContact" });
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BusinessProblem: SensitiveString,
          Title: S.String,
          TargetCompletionDate: S.String,
          ExpectedCustomerSpend: __S(449, __c14, 1),
        }),
      ).annotate({ identifier: "ProjectDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SenderContacts: S.optional(__S(513, __c16, 1)),
          ReceiverResponsibilities: __S(480, __c15, 0),
          Customer: __S(192, __c6, 0),
          Project: __S(514, __c16, 2),
          OpportunityType: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpportunityInvitationPayload" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          CountryCode: S.optional(SensitiveString),
          AwsMaturity: S.optional(S.String),
          MarketSegment: S.optional(S.String),
        }),
      ).annotate({ identifier: "LeadInvitationCustomer" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          SourceId: S.optional(S.String),
          SourceName: S.optional(S.String),
          Usecase: S.optional(S.String),
          ContactBusinessTitle: SensitiveString,
        }),
      ).annotate({ identifier: "LeadInvitationInteraction" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Customer: __S(516, __c16, 4), Interaction: __S(517, __c16, 5) }),
      ).annotate({ identifier: "LeadInvitationPayload" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Window: S.optional(S.String), Timezone: S.optional(S.String) }),
      ).annotate({ identifier: "PreferredContactWindow" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifier: S.optional(S.String),
          Customer: S.optional(__S(160, __c5, 0)),
          SenderContacts: S.optional(__S(513, __c16, 1)),
          PreferredContact: S.optional(__S(519, __c16, 7)),
        }),
      ).annotate({ identifier: "AccountPlanningInvitationPayload" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ OpportunityInvitation: __S(515, __c16, 3) }),
        /*@__PURE__*/ S.Struct({ LeadInvitation: __S(518, __c16, 6) }),
        /*@__PURE__*/ S.Struct({ AccountPlanningInvitation: __S(520, __c16, 8) }),
      ]);
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Alias: S.optional(SensitiveString), AwsAccountId: SensitiveString }),
      ).annotate({ identifier: "AccountReceiver" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Account: __S(544, __c17, 0) })]);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          PrimaryNeedsFromAws: S.optional(__S(480, __c15, 0)),
          NationalSecurity: S.optional(S.String),
          PartnerOpportunityIdentifier: S.optional(S.String),
          Customer: S.optional(__S(673, __c21, 1)),
          Project: S.optional(__S(704, __c22, 0)),
          OpportunityType: S.optional(S.String),
          Marketing: S.optional(__S(705, __c22, 1)),
          SoftwareRevenue: S.optional(__S(706, __c22, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LifeCycle: S.optional(__S(707, __c22, 3)),
          Origin: S.optional(S.String),
          OpportunityTeam: S.optional(__S(609, __c19, 1)),
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOpportunityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          PartnerOpportunityIdentifier: S.optional(S.String),
          LastModifiedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateOpportunityResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BusinessTitle: S.optional(SensitiveString),
          Phone: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Contact" });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() => S.Struct({ Amount: S.String, CurrencyCode: S.String })).annotate({
        identifier: "MonetaryValue",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ Value: S.String, Time: T.DateFromString.pipe(T.TimestampFormat("date-time")) }),
      ).annotate({ identifier: "NextStepsHistory" });
    case 4:
      return S.Array(__S(611, __c19, 3));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Term: S.String, Value: S.String })).annotate({
        identifier: "ExpectedContractDuration",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          OtherIndustry: S.optional(S.String),
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          AwsAccountId: S.optional(SensitiveString),
          Address: S.optional(__S(64, __c2, 0)),
          Duns: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Account" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Account: S.optional(__S(672, __c21, 0)),
          Contacts: S.optional(__S(609, __c19, 1)),
        }),
      ).annotate({ identifier: "Customer" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeliveryModels: S.optional(__S(480, __c15, 0)),
          ExpectedCustomerSpend: S.optional(__S(449, __c14, 1)),
          ExpectedContractDuration: S.optional(__S(640, __c20, 0)),
          Title: S.optional(SensitiveString),
          ApnPrograms: S.optional(__S(224, __c7, 0)),
          CustomerBusinessProblem: S.optional(SensitiveString),
          CustomerUseCase: S.optional(S.String),
          RelatedOpportunityIdentifier: S.optional(S.String),
          SalesActivities: S.optional(__S(480, __c15, 0)),
          CompetitorName: S.optional(S.String),
          OtherCompetitorNames: S.optional(S.String),
          OtherSolutionDescription: S.optional(SensitiveString),
          AdditionalComments: S.optional(S.String),
          AwsPartition: S.optional(S.String),
        }),
      ).annotate({ identifier: "Project" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CampaignName: S.optional(S.String),
          Source: S.optional(S.String),
          UseCases: S.optional(__S(224, __c7, 0)),
          Channels: S.optional(__S(480, __c15, 0)),
          AwsFundingUsed: S.optional(S.String),
        }),
      ).annotate({ identifier: "Marketing" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeliveryModel: S.optional(S.String),
          Value: S.optional(__S(610, __c19, 2)),
          EffectiveDate: S.optional(S.String),
          ExpirationDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareRevenue" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Stage: S.optional(S.String),
          ClosedLostReason: S.optional(S.String),
          NextSteps: S.optional(SensitiveString),
          TargetCloseDate: S.optional(S.String),
          ReviewStatus: S.optional(S.String),
          ReviewComments: S.optional(S.String),
          ReviewStatusReason: S.optional(S.String),
          NextStepsHistory: S.optional(__S(612, __c19, 4)),
        }),
      ).annotate({ identifier: "LifeCycle" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          EngagementIdentifier: S.String,
          ResourceType: S.String,
          ResourceIdentifier: S.String,
          ResourceSnapshotTemplateIdentifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateResourceSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Revision: S.optional(S.Number) }),
      ).annotate({ identifier: "CreateResourceSnapshotResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          EngagementIdentifier: S.String,
          ResourceType: S.String,
          ResourceIdentifier: S.String,
          ResourceSnapshotTemplateIdentifier: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateResourceSnapshotJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceSnapshotJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateResourceSnapshotJobResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteCustomerAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomerAccountRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteResourceSnapshotJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceSnapshotJobRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          OpportunityIdentifier: S.String,
          RelatedEntityType: S.String,
          RelatedEntityIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DisassociateOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateOpportunityRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, RelatedOpportunityIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetAwsOpportunitySummary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAwsOpportunitySummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RelatedOpportunityId: S.optional(S.String),
          Origin: S.optional(S.String),
          InvolvementType: S.optional(S.String),
          Visibility: S.optional(S.String),
          LifeCycle: S.optional(__S(928, __c29, 0)),
          OpportunityTeam: S.optional(__S(930, __c29, 2)),
          Insights: S.optional(__S(942, __c29, 14)),
          InvolvementTypeChangeReason: S.optional(S.String),
          RelatedEntityIds: S.optional(__S(943, __c29, 15)),
          Customer: S.optional(__S(944, __c29, 16)),
          Project: S.optional(__S(945, __c29, 17)),
          CosellMotion: S.optional(S.String),
          CosellMotionReason: S.optional(S.String),
          SoftwareRevenue: S.optional(__S(946, __c29, 18)),
          Catalog: S.String,
        }),
      ).annotate({ identifier: "GetAwsOpportunitySummaryResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetCloseDate: S.optional(S.String),
          ClosedLostReason: S.optional(S.String),
          Stage: S.optional(S.String),
          NextSteps: S.optional(SensitiveString),
          NextStepsHistory: S.optional(__S(612, __c19, 4)),
        }),
      ).annotate({ identifier: "AwsOpportunityLifeCycle" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Email: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BusinessTitle: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsTeamMember" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({ Description: S.String, SavingsAmount: SensitiveString }),
      ).annotate({ identifier: "AwsProductOptimization" });
    case 5:
      return S.Array(__S(932, __c29, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ProductCode: S.String,
          ServiceCode: S.optional(S.String),
          Categories: __S(224, __c7, 0),
          Amount: S.optional(SensitiveString),
          OptimizedAmount: S.optional(SensitiveString),
          PotentialSavingsAmount: S.optional(SensitiveString),
          Optimizations: __S(933, __c29, 5),
        }),
      ).annotate({ identifier: "AwsProductDetails" });
    case 7:
      return S.Array(__S(934, __c29, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          CurrencyCode: S.String,
          Frequency: S.String,
          TotalAmount: S.optional(SensitiveString),
          TotalOptimizedAmount: S.optional(SensitiveString),
          TotalPotentialSavingsAmount: S.optional(SensitiveString),
          TotalAmountByCategory: __S(931, __c29, 3),
          AwsProducts: __S(935, __c29, 7),
        }),
      ).annotate({ identifier: "AwsProductInsights" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Partner: S.optional(__S(936, __c29, 8)), AWS: S.optional(__S(936, __c29, 8)) }),
      ).annotate({ identifier: "AwsProductsSpendInsightsBySource" });
    case 10:
      return S.suspend(() =>
        S.Struct({ Score: S.optional(S.Number), Trend: S.optional(S.String) }),
      ).annotate({ identifier: "OpportunityQuality" });
    case 11:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Details: S.String,
          Attributes: S.optional(__S(939, __c29, 11)),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 13:
      return S.Array(__S(940, __c29, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          NextBestActions: S.optional(S.String),
          EngagementScore: S.optional(S.String),
          AwsProductsSpendInsightsBySource: S.optional(__S(937, __c29, 9)),
          OpportunityQuality: S.optional(__S(938, __c29, 10)),
          Recommendations: S.optional(__S(941, __c29, 13)),
        }),
      ).annotate({ identifier: "AwsOpportunityInsights" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          AwsProducts: S.optional(__S(224, __c7, 0)),
          Solutions: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceSolutions: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceProducts: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "AwsOpportunityRelatedEntities" });
    case 16:
      return S.suspend(() => S.Struct({ Contacts: S.optional(__S(609, __c19, 1)) })).annotate({
        identifier: "AwsOpportunityCustomer",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ExpectedCustomerSpend: S.optional(__S(449, __c14, 1)),
          AwsPartition: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsOpportunityProject" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(__S(610, __c19, 2)),
          Discount: S.optional(S.String),
          EffectiveDate: S.optional(S.String),
          ExpirationDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsSoftwareRevenue" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetCustomerAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomerAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Severity: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "Issue" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountName: S.optional(S.String),
          Industry: S.optional(S.String),
          SubIndustry: S.optional(S.String),
          Sector: S.optional(S.String),
          Segment: S.optional(S.String),
          CompanySize: S.optional(S.String),
          Region: S.optional(S.String),
          SubRegion: S.optional(S.String),
          Geo: S.optional(S.String),
          Country: S.optional(S.String),
          CustomerAccountPlanningQualification: S.optional(S.String),
          EligiblePrograms: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "AwsEnrichmentCustomer" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MarketplaceEngagementScore: S.optional(S.String),
          SolutionCategory: S.optional(S.String),
          SolutionScore: S.optional(S.String),
          SolutionSubCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEnrichmentInsights" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Customer: S.optional(__S(963, __c30, 3)),
          Insights: S.optional(__S(964, __c30, 4)),
        }),
      ).annotate({ identifier: "AwsEnrichment" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Catalog: S.String,
          EnrichmentStatus: S.String,
          PartnerAccountIdentifier: S.optional(S.String),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Issues: S.optional(__S(962, __c30, 2)),
          AwsEnrichment: S.optional(__S(965, __c30, 5)),
          ReasonCode: S.optional(S.String),
          Message: S.optional(S.String),
          ExistingCustomerAccountArn: S.optional(S.String),
          Account: __S(96, __c3, 0),
          Tags: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "GetCustomerAccountResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetCustomerAccountBulkJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomerAccountBulkJobRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Status: S.String,
          FileName: S.optional(S.String),
          TotalRecords: S.Number,
          ProcessedRecords: S.Number,
          SuccessCount: S.Number,
          FailureCount: S.Number,
          DeletedCount: S.Number,
          FailureReason: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetCustomerAccountBulkJobResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ReportType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetCustomerAccountBulkJobReportUrl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomerAccountBulkJobReportUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportStatus: S.String,
          ReportType: S.String,
          Url: S.optional(SensitiveString),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCustomerAccountBulkJobReportUrlResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GroupBy: __S(480, __c15, 0) })).annotate({
        identifier: "AggregationRequest",
      });
    case 1:
      return S.Array(__S(1088, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Filter: S.optional(__S(1123, __c35, 3)),
          Aggregations: S.optional(__S(1089, __c34, 1)),
          IncludeMissing: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetCustomerAccountStatistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomerAccountStatisticsRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Values: __S(224, __c7, 0), Count: S.Number })).annotate({
        identifier: "Bucket",
      });
    case 4:
      return S.Array(__S(1091, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          GroupBy: __S(480, __c15, 0),
          Buckets: __S(1092, __c34, 4),
          OtherCount: S.Number,
        }),
      ).annotate({ identifier: "AggregationResult" });
    case 6:
      return S.Array(__S(1093, __c34, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ TotalCount: S.Number, Aggregations: S.optional(__S(1094, __c34, 6)) }),
      ).annotate({ identifier: "GetCustomerAccountStatisticsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Filter> => __S(1123, __c35, 3)).annotate({
          identifier: "Filter",
        }),
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StringValue: S.String }),
        /*@__PURE__*/ S.Struct({ StringListValue: __S(224, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ LongValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          DateValue: /*@__PURE__*/ T.DateFromString.pipe(
            /*@__PURE__*/ T.TimestampFormat("date-time"),
          ),
        }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ Key: S.String, Value: __S(1121, __c35, 1) })).annotate({
        identifier: "FilterCondition",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AndAllFilters: S.optional(
            S.suspend(() => __S(1120, __c35, 0)).annotate({ identifier: "FilterList" }),
          ),
          OrAllFilters: S.optional(
            S.suspend(() => __S(1120, __c35, 0)).annotate({ identifier: "FilterList" }),
          ),
          NotFilter: S.optional(
            S.suspend((): S.Schema<Filter> => __S(1123, __c35, 3)).annotate({
              identifier: "Filter",
            }),
          ),
          EqualsTo: S.optional(__S(1122, __c35, 2)),
          ContainsAny: S.optional(__S(1122, __c35, 2)),
          ContainsAll: S.optional(__S(1122, __c35, 2)),
          GreaterThan: S.optional(__S(1122, __c35, 2)),
          GreaterThanOrEquals: S.optional(__S(1122, __c35, 2)),
          LessThan: S.optional(__S(1122, __c35, 2)),
          LessThanOrEquals: S.optional(__S(1122, __c35, 2)),
        }),
      ).annotate({ identifier: "Filter" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetEngagement" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEngagementRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedBy: S.optional(SensitiveString),
          MemberCount: S.optional(S.Number),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedBy: S.optional(SensitiveString),
          Contexts: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "GetEngagementResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetEngagementInvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEngagementInvitationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CompanyName: S.optional(SensitiveString), WebsiteUrl: S.optional(S.String) }),
      ).annotate({ identifier: "EngagementMemberSummary" });
    case 2:
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Customer: S.optional(__S(260, __c8, 4)),
          Insights: S.optional(__S(261, __c8, 5)),
        }),
      ).annotate({ identifier: "InvitationProspectingResultAws" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProspectingResultAws: S.optional(__S(1219, __c38, 3)),
          LeadInsights: S.optional(__S(259, __c8, 3)),
        }),
      ).annotate({ identifier: "EnrichmentContext" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          PayloadType: S.optional(S.String),
          Id: S.String,
          EngagementId: S.optional(S.String),
          EngagementTitle: S.optional(S.String),
          Status: S.optional(S.String),
          InvitationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpirationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SenderAwsAccountId: S.optional(SensitiveString),
          SenderCompanyName: S.optional(S.String),
          Receiver: S.optional(__S(545, __c17, 1)),
          Catalog: S.String,
          RejectionReason: S.optional(S.String),
          Payload: S.optional(__S(521, __c16, 9)),
          InvitationMessage: S.optional(SensitiveString),
          EngagementDescription: S.optional(S.String),
          ExistingMembers: S.optional(__S(1218, __c38, 2)),
          EnrichmentContext: S.optional(__S(1220, __c38, 4)),
        }),
      ).annotate({ identifier: "GetEngagementInvitationResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetOpportunity" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOpportunityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          PrimaryNeedsFromAws: S.optional(__S(480, __c15, 0)),
          NationalSecurity: S.optional(S.String),
          PartnerOpportunityIdentifier: S.optional(S.String),
          Customer: S.optional(__S(673, __c21, 1)),
          Project: S.optional(__S(704, __c22, 0)),
          OpportunityType: S.optional(S.String),
          Marketing: S.optional(__S(705, __c22, 1)),
          SoftwareRevenue: S.optional(__S(706, __c22, 2)),
          Id: S.String,
          Arn: S.optional(S.String),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          RelatedEntityIdentifiers: __S(1280, __c40, 0),
          LifeCycle: S.optional(__S(707, __c22, 3)),
          OpportunityTeam: S.optional(__S(609, __c19, 1)),
        }),
      ).annotate({ identifier: "GetOpportunityResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsMarketplaceOffers: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceOfferSets: S.optional(__S(224, __c7, 0)),
          Solutions: S.optional(__S(224, __c7, 0)),
          AwsProducts: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceSolutions: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceProducts: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "RelatedEntityIdentifiers" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          JobId: S.String,
          ReportFormat: S.String,
          ReportType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetOpportunityBulkJobReportUrl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOpportunityBulkJobReportUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportStatus: S.String,
          ReportType: S.String,
          ReportFormat: S.String,
          Url: S.optional(SensitiveString),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetOpportunityBulkJobReportUrlResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, TaskIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetProspectingFromEngagementTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProspectingFromEngagementTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EngagementIdentifier: S.String,
          EngagementContextId: S.optional(S.String),
          Status: S.String,
          ReasonCode: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngagementProspectingResult" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.String,
          TaskArn: S.String,
          TaskName: S.String,
          StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Engagements: __S(1346, __c42, 2),
        }),
      ).annotate({ identifier: "GetProspectingFromEngagementTaskResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          EngagementIdentifier: S.String,
          ResourceType: S.String,
          ResourceIdentifier: S.String,
          ResourceSnapshotTemplateIdentifier: S.String,
          Revision: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetResourceSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetCloseDate: S.optional(S.String),
          ReviewStatus: S.optional(S.String),
          Stage: S.optional(S.String),
          NextSteps: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "LifeCycleForView" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeliveryModels: S.optional(__S(480, __c15, 0)),
          ExpectedCustomerSpend: S.optional(__S(449, __c14, 1)),
          ExpectedContractDuration: S.optional(__S(640, __c20, 0)),
          CustomerUseCase: S.optional(S.String),
          SalesActivities: S.optional(__S(480, __c15, 0)),
          OtherSolutionDescription: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ProjectView" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          OpportunityType: S.optional(S.String),
          Lifecycle: S.optional(__S(1377, __c43, 1)),
          OpportunityTeam: S.optional(__S(609, __c19, 1)),
          PrimaryNeedsFromAws: S.optional(__S(480, __c15, 0)),
          Customer: S.optional(__S(673, __c21, 1)),
          Project: S.optional(__S(1378, __c43, 2)),
          RelatedEntityIdentifiers: S.optional(__S(1280, __c40, 0)),
        }),
      ).annotate({ identifier: "OpportunitySummaryView" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          RelatedOpportunityId: S.optional(S.String),
          Origin: S.optional(S.String),
          InvolvementType: S.optional(S.String),
          Visibility: S.optional(S.String),
          LifeCycle: S.optional(__S(928, __c29, 0)),
          OpportunityTeam: S.optional(__S(930, __c29, 2)),
          Insights: S.optional(__S(942, __c29, 14)),
          InvolvementTypeChangeReason: S.optional(S.String),
          RelatedEntityIds: S.optional(__S(943, __c29, 15)),
          Customer: S.optional(__S(944, __c29, 16)),
          Project: S.optional(__S(945, __c29, 17)),
          CosellMotion: S.optional(S.String),
          CosellMotionReason: S.optional(S.String),
          SoftwareRevenue: S.optional(__S(946, __c29, 18)),
        }),
      ).annotate({ identifier: "AwsOpportunitySummaryFullView" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ OpportunitySummary: __S(1379, __c43, 3) }),
        /*@__PURE__*/ S.Struct({ AwsOpportunitySummaryFullView: __S(1380, __c43, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Arn: S.optional(S.String),
          CreatedBy: S.optional(SensitiveString),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EngagementId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceSnapshotTemplateName: S.optional(S.String),
          Revision: S.optional(S.Number),
          Payload: S.optional(__S(1381, __c43, 5)),
          TargetMemberAccounts: S.optional(__S(1408, __c44, 0)),
        }),
      ).annotate({ identifier: "GetResourceSnapshotResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetResourceSnapshotJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceSnapshotJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          EngagementId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceSnapshotTemplateName: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          LastSuccessfulExecutionDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          LastFailure: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceSnapshotJobResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetSellingSystemSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSellingSystemSettingsRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, ResourceSnapshotJobRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "GetSellingSystemSettingsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          Status: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListCustomerAccountBulkJobResults" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomerAccountBulkJobResultsRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RequestId: S.String,
          Status: S.String,
          ResourceIdentifier: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkJobResult" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Results: __S(1569, __c49, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCustomerAccountBulkJobResultsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CustomerAccountBulkJobFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Filter: S.optional(__S(1600, __c50, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListCustomerAccountBulkJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomerAccountBulkJobsRequest" });
    case 2:
      return S.Array(__S(1024, __c32, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1602, __c50, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCustomerAccountBulkJobsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          Catalog: S.String,
          TaskStatus: S.optional(__S(480, __c15, 0)),
          OpportunityIdentifier: S.optional(__S(224, __c7, 0)),
          EngagementInvitationIdentifier: S.optional(__S(224, __c7, 0)),
          TaskIdentifier: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementByAcceptingInvitationTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementByAcceptingInvitationTasksRequest" });
    case 1:
      return S.Array(__S(1696, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskSummaries: S.optional(__S(1633, __c51, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementByAcceptingInvitationTasksResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SortOrder: S.String, SortBy: S.String })).annotate({
        identifier: "ListTasksSortBase",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskStatus: S.optional(S.String),
          Message: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          OpportunityId: S.optional(S.String),
          ResourceSnapshotJobId: S.optional(S.String),
          EngagementInvitationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementByAcceptingInvitationTaskSummary" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          Catalog: S.String,
          TaskStatus: S.optional(__S(480, __c15, 0)),
          TaskIdentifier: S.optional(__S(224, __c7, 0)),
          OpportunityIdentifier: S.optional(__S(224, __c7, 0)),
          EngagementIdentifier: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementFromOpportunityTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementFromOpportunityTasksRequest" });
    case 1:
      return S.Array(__S(1760, __c55, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskSummaries: S.optional(__S(1729, __c54, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementFromOpportunityTasksResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskStatus: S.optional(S.String),
          Message: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          OpportunityId: S.optional(S.String),
          ResourceSnapshotJobId: S.optional(S.String),
          EngagementId: S.optional(S.String),
          EngagementInvitationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementFromOpportunityTaskSummary" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ReadinessLevel: S.optional(S.String),
          Sort: S.optional(__S(1824, __c57, 0)),
          EngagementGroupIdentifiers: S.optional(__S(224, __c7, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.optional(S.String),
          Catalog: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Count: S.optional(S.Number),
          ReadinessLevel: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "EngagementGroupSummary" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EngagementGroupSummaries: S.optional(__S(1794, __c56, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementGroupsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SortBy: S.String, SortOrder: S.String })).annotate({
        identifier: "EngagementGroupSort",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          PayloadType: S.optional(__S(480, __c15, 0)),
          ParticipantType: S.String,
          Status: S.optional(__S(480, __c15, 0)),
          EngagementIdentifier: S.optional(__S(224, __c7, 0)),
          SenderAwsAccountId: S.optional(__S(1408, __c44, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementInvitations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementInvitationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          PayloadType: S.optional(S.String),
          Id: S.String,
          EngagementId: S.optional(S.String),
          EngagementTitle: S.optional(S.String),
          Status: S.optional(S.String),
          InvitationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpirationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SenderAwsAccountId: S.optional(SensitiveString),
          SenderCompanyName: S.optional(S.String),
          Receiver: S.optional(__S(545, __c17, 1)),
          Catalog: S.String,
          ParticipantType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngagementInvitationSummary" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EngagementInvitationSummaries: S.optional(__S(1858, __c58, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementInvitationsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementMembers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CompanyName: S.optional(SensitiveString),
          WebsiteUrl: S.optional(S.String),
          AccountId: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EngagementMember" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EngagementMemberList: __S(1890, __c59, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEngagementMembersResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          EngagementIdentifier: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          CreatedBy: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListEngagementResourceAssociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEngagementResourceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          EngagementId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          CreatedBy: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EngagementResourceAssociationSummary" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EngagementResourceAssociationSummaries: __S(1922, __c60, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEngagementResourceAssociationsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          CreatedBy: S.optional(__S(1408, __c44, 0)),
          ExcludeCreatedBy: S.optional(__S(1408, __c44, 0)),
          ContextTypes: S.optional(__S(480, __c15, 0)),
          ExcludeContextTypes: S.optional(__S(480, __c15, 0)),
          Sort: S.optional(__S(1664, __c52, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          EngagementIdentifier: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListEngagements" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEngagementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Title: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedBy: S.optional(SensitiveString),
          MemberCount: S.optional(S.Number),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedBy: S.optional(SensitiveString),
          ContextTypes: S.optional(__S(480, __c15, 0)),
        }),
      ).annotate({ identifier: "EngagementSummary" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EngagementSummaryList: __S(1954, __c61, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEngagementsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AfterLastModifiedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BeforeLastModifiedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "LastModifiedDate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AfterCreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BeforeCreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreatedDateFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AfterTargetCloseDate: S.optional(S.String),
          BeforeTargetCloseDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetCloseDateFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          LastModifiedDate: S.optional(__S(1984, __c62, 0)),
          Identifier: S.optional(__S(224, __c7, 0)),
          LifeCycleStage: S.optional(__S(480, __c15, 0)),
          LifeCycleReviewStatus: S.optional(__S(480, __c15, 0)),
          CustomerCompanyName: S.optional(__S(224, __c7, 0)),
          CreatedDate: S.optional(__S(1985, __c62, 1)),
          TargetCloseDate: S.optional(__S(1986, __c62, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListOpportunities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOpportunitiesRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Stage: S.optional(S.String),
          ClosedLostReason: S.optional(S.String),
          NextSteps: S.optional(SensitiveString),
          TargetCloseDate: S.optional(S.String),
          ReviewStatus: S.optional(S.String),
          ReviewComments: S.optional(S.String),
          ReviewStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifeCycleSummary" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
          StateOrRegion: S.optional(SensitiveString),
          CountryCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AddressSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          OtherIndustry: S.optional(S.String),
          CompanyName: SensitiveString,
          WebsiteUrl: S.optional(SensitiveString),
          Address: S.optional(__S(1989, __c62, 5)),
        }),
      ).annotate({ identifier: "AccountSummary" });
    case 7:
      return S.suspend(() => S.Struct({ Account: S.optional(__S(1990, __c62, 6)) })).annotate({
        identifier: "CustomerSummary",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DeliveryModels: S.optional(__S(480, __c15, 0)),
          ExpectedCustomerSpend: S.optional(__S(449, __c14, 1)),
          ExpectedContractDuration: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "ProjectSummary" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          PartnerOpportunityIdentifier: S.optional(S.String),
          OpportunityType: S.optional(S.String),
          LastModifiedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LifeCycle: S.optional(__S(1988, __c62, 4)),
          Customer: S.optional(__S(1991, __c62, 7)),
          Project: S.optional(__S(1992, __c62, 8)),
        }),
      ).annotate({ identifier: "OpportunitySummary" });
    case 10:
      return S.Array(__S(1993, __c62, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ OpportunitySummaries: __S(1994, __c62, 10), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOpportunitiesResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          JobId: S.String,
          Status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListOpportunityBulkJobResults" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOpportunityBulkJobResultsRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          JobId: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListOpportunityBulkJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOpportunityBulkJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          Status: S.String,
          TotalRecords: S.Number,
          ProcessedRecords: S.Number,
          SuccessCount: S.Number,
          FailureCount: S.Number,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FailureReason: S.optional(S.String),
          FileName: S.optional(S.String),
          OperationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpportunityBulkJobSummary" });
    case 2:
      return S.Array(__S(2049, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OpportunityBulkJobSummaries: __S(2050, __c64, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOpportunityBulkJobsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          Catalog: S.String,
          TaskStatus: S.optional(__S(480, __c15, 0)),
          TaskIdentifier: S.optional(__S(224, __c7, 0)),
          OpportunityIdentifier: S.optional(__S(224, __c7, 0)),
          EngagementIdentifier: S.optional(__S(224, __c7, 0)),
          ContextIdentifier: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListOpportunityFromEngagementTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOpportunityFromEngagementTasksRequest" });
    case 1:
      return S.Array(__S(2112, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskSummaries: S.optional(__S(2081, __c65, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOpportunityFromEngagementTasksResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskStatus: S.optional(S.String),
          Message: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          OpportunityId: S.optional(S.String),
          ResourceSnapshotJobId: S.optional(S.String),
          EngagementId: S.optional(S.String),
          ContextId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOpportunityFromEngagementTaskSummary" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          TaskIdentifier: S.optional(__S(224, __c7, 0)),
          TaskName: S.optional(__S(224, __c7, 0)),
          StartAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Sort: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListProspectingFromEngagementTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProspectingFromEngagementTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.String,
          TaskArn: S.String,
          TaskName: S.String,
          StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TotalEngagementCount: S.Number,
          CompletedEngagementCount: S.Number,
          FailedEngagementCount: S.Number,
        }),
      ).annotate({ identifier: "ProspectingTaskSummary" });
    case 2:
      return S.Array(__S(2145, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), TaskSummaries: __S(2146, __c67, 2) }),
      ).annotate({ identifier: "ListProspectingFromEngagementTasksResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SortBy: S.optional(S.String), SortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "SortObject" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          EngagementIdentifier: S.optional(S.String),
          Status: S.optional(S.String),
          Sort: S.optional(__S(2176, __c68, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourceSnapshotJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceSnapshotJobsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          EngagementId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceSnapshotJobSummary" });
    case 3:
      return S.Array(__S(2178, __c68, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResourceSnapshotJobSummaries: __S(2179, __c68, 3),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceSnapshotJobsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          EngagementIdentifier: S.String,
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ResourceSnapshotTemplateIdentifier: S.optional(S.String),
          CreatedBy: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourceSnapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceSnapshotsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Revision: S.optional(S.Number),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceSnapshotTemplateName: S.optional(S.String),
          CreatedBy: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ResourceSnapshotSummary" });
    case 2:
      return S.Array(__S(2209, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceSnapshotSummaries: __S(2210, __c69, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceSnapshotsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(1664, __c52, 0)),
          Status: S.optional(__S(480, __c15, 0)),
          Identifier: S.optional(__S(224, __c7, 0)),
          Category: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceSolutionArn: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListSolutions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSolutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Id: S.String,
          Arn: S.optional(S.String),
          Name: S.String,
          Status: S.String,
          Category: S.String,
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          AwsMarketplaceSolutionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SolutionBase" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SolutionSummaries: __S(2242, __c70, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSolutionsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: __S(33, __c1, 1) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ResourceSnapshotJobRoleIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutSellingSystemSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSellingSystemSettingsRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          RejectionReason: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RejectEngagementInvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectEngagementInvitationRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Filter: S.optional(__S(1123, __c35, 3)),
          Sort: S.optional(__S(1824, __c57, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SearchCustomerAccounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchCustomerAccountsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CompanyName: SensitiveString })).annotate({
        identifier: "CustomerAccountDetailsSummary",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Industry: S.optional(S.String),
          AccountPlanningQualification: S.optional(S.String),
          EligiblePrograms: S.optional(__S(224, __c7, 0)),
          Geo: S.optional(S.String),
          Country: S.optional(S.String),
          Segment: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEnrichmentCustomerSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MarketplaceEngagementScore: S.optional(S.String),
          SolutionCategory: S.optional(S.String),
          SolutionScore: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEnrichmentInsightsSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Customer: S.optional(__S(2370, __c74, 2)),
          Insights: S.optional(__S(2371, __c74, 3)),
        }),
      ).annotate({ identifier: "AwsEnrichmentSummary" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Catalog: S.String,
          EnrichmentStatus: S.String,
          PartnerAccountIdentifier: S.optional(S.String),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          CustomerAccount: __S(2369, __c74, 1),
          AwsEnrichment: S.optional(__S(2372, __c74, 4)),
        }),
      ).annotate({ identifier: "CustomerAccountSummary" });
    case 6:
      return S.Array(__S(2373, __c74, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          CustomerAccountSummaries: __S(2374, __c74, 6),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchCustomerAccountsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<EngagementSearchFilter> =>
          __S(2403, __c75, 3),
        ).annotate({ identifier: "EngagementSearchFilter" }),
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StringValue: SensitiveString }),
        /*@__PURE__*/ S.Struct({ StringListValue: __S(1408, __c44, 0) }),
        /*@__PURE__*/ S.Struct({ LongValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          DateValue: /*@__PURE__*/ T.DateFromString.pipe(
            /*@__PURE__*/ T.TimestampFormat("date-time"),
          ),
        }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ Key: S.String, Value: __S(2401, __c75, 1) })).annotate({
        identifier: "EngagementSearchPredicate",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AndAllFilters: S.optional(
            S.suspend(() => __S(2400, __c75, 0)).annotate({
              identifier: "EngagementSearchFilterList",
            }),
          ),
          OrAllFilters: S.optional(
            S.suspend(() => __S(2400, __c75, 0)).annotate({
              identifier: "EngagementSearchFilterList",
            }),
          ),
          NotFilter: S.optional(
            S.suspend((): S.Schema<EngagementSearchFilter> => __S(2403, __c75, 3)).annotate({
              identifier: "EngagementSearchFilter",
            }),
          ),
          EqualsTo: S.optional(__S(2402, __c75, 2)),
          ContainsAny: S.optional(__S(2402, __c75, 2)),
          ContainsAll: S.optional(__S(2402, __c75, 2)),
          GreaterThan: S.optional(__S(2402, __c75, 2)),
          GreaterThanOrEquals: S.optional(__S(2402, __c75, 2)),
          LessThan: S.optional(__S(2402, __c75, 2)),
          LessThanOrEquals: S.optional(__S(2402, __c75, 2)),
        }),
      ).annotate({ identifier: "EngagementSearchFilter" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Keyword: S.optional(SensitiveString),
          Filter: S.optional(__S(2403, __c75, 3)),
          GroupId: S.optional(S.String),
          Sort: S.optional(__S(1824, __c57, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SearchEngagements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchEngagementsRequest" });
    case 5:
      return S.Array(__S(1184, __c37, 0));
    case 6:
      return S.suspend(() =>
        S.Struct({
          EngagementSearchSummaries: S.optional(__S(2405, __c75, 5)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchEngagementsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<OpportunitySearchFilter> =>
          __S(2435, __c76, 3),
        ).annotate({ identifier: "OpportunitySearchFilter" }),
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StringValue: SensitiveString }),
        /*@__PURE__*/ S.Struct({ StringListValue: __S(1408, __c44, 0) }),
        /*@__PURE__*/ S.Struct({ LongValue: S.Number }),
        /*@__PURE__*/ S.Struct({ DoubleValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          DateValue: /*@__PURE__*/ T.DateFromString.pipe(
            /*@__PURE__*/ T.TimestampFormat("date-time"),
          ),
        }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ Key: S.String, Value: __S(2433, __c76, 1) })).annotate({
        identifier: "OpportunitySearchPredicate",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AndAllFilters: S.optional(
            S.suspend(() => __S(2432, __c76, 0)).annotate({
              identifier: "OpportunitySearchFilterList",
            }),
          ),
          OrAllFilters: S.optional(
            S.suspend(() => __S(2432, __c76, 0)).annotate({
              identifier: "OpportunitySearchFilterList",
            }),
          ),
          NotFilter: S.optional(
            S.suspend((): S.Schema<OpportunitySearchFilter> => __S(2435, __c76, 3)).annotate({
              identifier: "OpportunitySearchFilter",
            }),
          ),
          EqualsTo: S.optional(__S(2434, __c76, 2)),
          ContainsAny: S.optional(__S(2434, __c76, 2)),
          ContainsAll: S.optional(__S(2434, __c76, 2)),
          GreaterThan: S.optional(__S(2434, __c76, 2)),
          GreaterThanOrEquals: S.optional(__S(2434, __c76, 2)),
          LessThan: S.optional(__S(2434, __c76, 2)),
          LessThanOrEquals: S.optional(__S(2434, __c76, 2)),
        }),
      ).annotate({ identifier: "OpportunitySearchFilter" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Keyword: S.optional(SensitiveString),
          Filter: S.optional(__S(2435, __c76, 3)),
          Sort: S.optional(__S(1824, __c57, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SearchOpportunities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchOpportunitiesRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ReviewStatus: S.optional(S.String),
          Stage: S.optional(S.String),
          NextSteps: S.optional(SensitiveString),
          TargetCloseDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpportunitySearchLifeCycle" });
    case 6:
      return S.suspend(() => S.Struct({ CountryCode: S.optional(S.String) })).annotate({
        identifier: "OpportunitySearchAddress",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CompanyName: S.optional(SensitiveString),
          Industry: S.optional(S.String),
          AwsAccountId: S.optional(SensitiveString),
          Address: S.optional(__S(2438, __c76, 6)),
        }),
      ).annotate({ identifier: "OpportunitySearchAccount" });
    case 8:
      return S.suspend(() => S.Struct({ Account: S.optional(__S(2439, __c76, 7)) })).annotate({
        identifier: "OpportunitySearchCustomer",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ Amount: S.optional(SensitiveString), CurrencyCode: S.String }),
      ).annotate({ identifier: "OpportunitySearchExpectedCustomerSpend" });
    case 10:
      return S.Array(__S(2441, __c76, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(SensitiveString),
          ApnPrograms: S.optional(__S(224, __c7, 0)),
          ExpectedCustomerSpend: S.optional(__S(2442, __c76, 10)),
        }),
      ).annotate({ identifier: "OpportunitySearchProject" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AwsMarketplaceOffers: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceOfferSets: S.optional(__S(224, __c7, 0)),
          AwsMarketplaceSolutions: S.optional(__S(224, __c7, 0)),
          Solutions: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "OpportunitySearchRelatedEntityIdentifiers" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BusinessTitle: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "OpportunitySearchTeamMember" });
    case 14:
      return S.Array(__S(2445, __c76, 13));
    case 15:
      return S.suspend(() => S.Struct({ Score: S.optional(S.Number) })).annotate({
        identifier: "OpportunitySearchOpportunityQuality",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({
          EngagementScore: S.optional(S.String),
          OpportunityQuality: S.optional(__S(2447, __c76, 15)),
        }),
      ).annotate({ identifier: "OpportunitySearchInsights" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Origin: S.optional(S.String),
          CosellMotion: S.optional(SensitiveString),
          Insights: S.optional(__S(2448, __c76, 16)),
        }),
      ).annotate({ identifier: "OpportunitySearchAwsSummary" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          OpportunityType: S.optional(S.String),
          PartnerOpportunityIdentifier: S.optional(S.String),
          LifeCycle: S.optional(__S(2437, __c76, 5)),
          Customer: S.optional(__S(2440, __c76, 8)),
          Project: S.optional(__S(2443, __c76, 11)),
          Tags: S.optional(__S(33, __c1, 1)),
          RelatedEntityIdentifiers: S.optional(__S(2444, __c76, 12)),
          OpportunityTeam: S.optional(__S(2446, __c76, 14)),
          AwsOpportunitySummary: S.optional(__S(2449, __c76, 17)),
        }),
      ).annotate({ identifier: "OpportunitySearchSummary" });
    case 19:
      return S.Array(__S(2450, __c76, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          OpportunitySearchSummaries: __S(2451, __c76, 19),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchOpportunitiesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileUri: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartCustomerAccountBulkJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCustomerAccountBulkJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Status: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartCustomerAccountBulkJobResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Identifier: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartEngagementByAcceptingInvitationTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartEngagementByAcceptingInvitationTaskRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InvolvementType: S.String, Visibility: S.optional(S.String) }),
      ).annotate({ identifier: "AwsSubmission" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Identifier: S.String,
          AwsSubmission: __S(2528, __c79, 0),
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartEngagementFromOpportunityTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartEngagementFromOpportunityTaskRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileURI: SensitiveString,
          FileFormat: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartOpportunityBulkJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartOpportunityBulkJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.String })).annotate({
        identifier: "StartOpportunityBulkJobResponse",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Message: S.String, Code: S.String }),
      ).annotate({ identifier: "ValidationExceptionError" });
    case 1:
      return S.Array(__S(2592, __c81, 0));
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Identifier: S.String,
          ContextIdentifier: S.String,
          Tags: S.optional(__S(33, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartOpportunityFromEngagementTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartOpportunityFromEngagementTaskRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifiers: __S(224, __c7, 0),
          TaskName: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartProspectingFromEngagementTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartProspectingFromEngagementTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifiers: __S(224, __c7, 0),
          TaskName: S.String,
          Message: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          TaskStatus: S.String,
        }),
      ).annotate({ identifier: "StartProspectingFromEngagementTaskResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartResourceSnapshotJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartResourceSnapshotJobRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopResourceSnapshotJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopResourceSnapshotJobRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          InvolvementType: S.String,
          Visibility: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SubmitOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubmitOpportunityRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(33, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(224, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          Account: __S(96, __c3, 0),
          PartnerAccountIdentifier: S.optional(S.String),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateCustomerAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomerAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Status: S.String,
          Catalog: S.String,
          PartnerAccountIdentifier: S.optional(S.String),
          CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateCustomerAccountResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QualificationStatus: S.optional(S.String),
          Customer: __S(323, __c10, 3),
          Interaction: S.optional(__S(325, __c10, 5)),
          Insights: S.optional(__S(259, __c8, 3)),
        }),
      ).annotate({ identifier: "UpdateLeadContext" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Lead: __S(2880, __c90, 0) }),
        /*@__PURE__*/ S.Struct({ CustomerProject: __S(321, __c10, 1) }),
        /*@__PURE__*/ S.Struct({ ProspectingResult: __S(327, __c10, 7) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          EngagementIdentifier: S.String,
          ContextIdentifier: S.String,
          EngagementLastModifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Type: S.String,
          Payload: __S(2881, __c90, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateEngagementContext" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEngagementContextRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EngagementId: S.String,
          EngagementArn: S.String,
          EngagementLastModifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ContextId: S.String,
        }),
      ).annotate({ identifier: "UpdateEngagementContextResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          PrimaryNeedsFromAws: S.optional(__S(480, __c15, 0)),
          NationalSecurity: S.optional(S.String),
          PartnerOpportunityIdentifier: S.optional(S.String),
          Customer: S.optional(__S(673, __c21, 1)),
          Project: S.optional(__S(704, __c22, 0)),
          OpportunityType: S.optional(S.String),
          Marketing: S.optional(__S(705, __c22, 1)),
          SoftwareRevenue: S.optional(__S(706, __c22, 2)),
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Identifier: S.String,
          LifeCycle: S.optional(__S(707, __c22, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOpportunityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateOpportunityResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AcceptEngagementInvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptEngagementInvitationRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptEngagementInvitationResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: SensitiveString,
          FirstName: SensitiveString,
          LastName: SensitiveString,
          Phone: S.optional(SensitiveString),
          BusinessTitle: SensitiveString,
        }),
      ).annotate({ identifier: "AssigneeContact" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String, Assignee: __S(3008, __c94, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AssignOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssignOpportunityRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          OpportunityIdentifier: S.String,
          RelatedEntityType: S.String,
          RelatedEntityIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AssociateOpportunity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateOpportunityRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
