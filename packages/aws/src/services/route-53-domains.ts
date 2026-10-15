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
const ns = /*@__PURE__*/ T.XmlNamespace("https://route53domains.amazonaws.com/doc/2014-05-15/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Route 53 Domains",
  serviceShapeName: "Route53Domains_v20140515",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53domains" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-05-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://route53domains-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53domains-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53domains.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://route53domains.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://route53domains.{R}.{D}","properties":{},"headers":{}}');

export class DnssecLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DnssecLimitExceeded>()(
    "DnssecLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class DomainLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DomainLimitExceeded>()(
    "DomainLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class DomainNotFound
  extends /*@__PURE__*/ S.TaggedError<DomainNotFound>()(
    "DomainNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidInput",
      message: { includes: "not found in account" },
    }),
  ).pipe(C.withNotFoundError) {}
export class DuplicateRequest
  extends /*@__PURE__*/ S.TaggedError<DuplicateRequest>()(
    "DuplicateRequest",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidInput
  extends /*@__PURE__*/ S.TaggedError<InvalidInput>()(
    "InvalidInput",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OperationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<OperationLimitExceeded>()(
    "OperationLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class TLDInMaintenance
  extends /*@__PURE__*/ S.TaggedError<TLDInMaintenance>()(
    "TLDInMaintenance",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tld: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TLDRulesViolation
  extends /*@__PURE__*/ S.TaggedError<TLDRulesViolation>()(
    "TLDRulesViolation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedTLD
  extends /*@__PURE__*/ S.TaggedError<UnsupportedTLD>()(
    "UnsupportedTLD",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainName = string;
export type Password = string | redacted.Redacted<string>;
export interface AcceptDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string;
  Password: string | redacted.Redacted<string>;
}
export type OperationId = string;
export interface AcceptDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string;
}
export type DnssecPublicKey = string;
export interface DnssecSigningAttributes {
  Algorithm?: number;
  Flags?: number;
  PublicKey?: string;
}
export interface AssociateDelegationSignerToDomainRequest {
  DomainName: string;
  SigningAttributes: DnssecSigningAttributes;
}
export interface AssociateDelegationSignerToDomainResponse {
  OperationId?: string;
}
export interface CancelDomainTransferToAnotherAwsAccountRequest {
  DomainName: string;
}
export interface CancelDomainTransferToAnotherAwsAccountResponse {
  OperationId?: string;
}
export type LangCode = string;
export interface CheckDomainAvailabilityRequest {
  DomainName: string;
  IdnLangCode?: string;
}
export type DomainAvailability =
  | "AVAILABLE"
  | "AVAILABLE_RESERVED"
  | "AVAILABLE_PREORDER"
  | "UNAVAILABLE"
  | "UNAVAILABLE_PREMIUM"
  | "UNAVAILABLE_RESTRICTED"
  | "RESERVED"
  | "DONT_KNOW"
  | "INVALID_NAME_FOR_TLD"
  | "PENDING"
  | (string & {});
export interface CheckDomainAvailabilityResponse {
  Availability?: DomainAvailability;
}
export type DomainAuthCode = string | redacted.Redacted<string>;
export interface CheckDomainTransferabilityRequest {
  DomainName: string;
  AuthCode?: string | redacted.Redacted<string>;
}
export type Transferable =
  | "TRANSFERABLE"
  | "UNTRANSFERABLE"
  | "DONT_KNOW"
  | "DOMAIN_IN_OWN_ACCOUNT"
  | "DOMAIN_IN_ANOTHER_ACCOUNT"
  | "PREMIUM_DOMAIN"
  | (string & {});
export interface DomainTransferability {
  Transferable?: Transferable;
}
export type Message = string;
export interface CheckDomainTransferabilityResponse {
  Transferability?: DomainTransferability;
  Message?: string;
}
export interface DeleteDomainRequest {
  DomainName: string;
}
export interface DeleteDomainResponse {
  OperationId?: string;
}
export type TagKey = string;
export type TagKeyList = string[];
export interface DeleteTagsForDomainRequest {
  DomainName: string;
  TagsToDelete: string[];
}
export interface DeleteTagsForDomainResponse {}
export interface DisableDomainAutoRenewRequest {
  DomainName: string;
}
export interface DisableDomainAutoRenewResponse {}
export interface DisableDomainTransferLockRequest {
  DomainName: string;
}
export interface DisableDomainTransferLockResponse {
  OperationId?: string;
}
export interface DisassociateDelegationSignerFromDomainRequest {
  DomainName: string;
  Id: string;
}
export interface DisassociateDelegationSignerFromDomainResponse {
  OperationId?: string;
}
export interface EnableDomainAutoRenewRequest {
  DomainName: string;
}
export interface EnableDomainAutoRenewResponse {}
export interface EnableDomainTransferLockRequest {
  DomainName: string;
}
export interface EnableDomainTransferLockResponse {
  OperationId?: string;
}
export interface GetContactReachabilityStatusRequest {
  domainName?: string;
}
export type ReachabilityStatus = "PENDING" | "DONE" | "EXPIRED" | (string & {});
export interface GetContactReachabilityStatusResponse {
  domainName?: string;
  status?: ReachabilityStatus;
}
export interface GetDomainDetailRequest {
  DomainName: string;
}
export type HostName = string;
export type GlueIp = string;
export type GlueIpList = string[];
export interface Nameserver {
  Name: string;
  GlueIps?: string[];
}
export type NameserverList = Nameserver[];
export type ContactName = string | redacted.Redacted<string>;
export type ContactType =
  | "PERSON"
  | "COMPANY"
  | "ASSOCIATION"
  | "PUBLIC_BODY"
  | "RESELLER"
  | (string & {});
export type AddressLine = string | redacted.Redacted<string>;
export type City = string | redacted.Redacted<string>;
export type State = string | redacted.Redacted<string>;
export type CountryCode =
  | "AC"
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AN"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TP"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW"
  | (string & {});
export type ZipCode = string | redacted.Redacted<string>;
export type ContactNumber = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export type ExtraParamName =
  | "DUNS_NUMBER"
  | "BRAND_NUMBER"
  | "BIRTH_DEPARTMENT"
  | "BIRTH_DATE_IN_YYYY_MM_DD"
  | "BIRTH_COUNTRY"
  | "BIRTH_CITY"
  | "DOCUMENT_NUMBER"
  | "AU_ID_NUMBER"
  | "AU_ID_TYPE"
  | "CA_LEGAL_TYPE"
  | "CA_BUSINESS_ENTITY_TYPE"
  | "CA_LEGAL_REPRESENTATIVE"
  | "CA_LEGAL_REPRESENTATIVE_CAPACITY"
  | "ES_IDENTIFICATION"
  | "ES_IDENTIFICATION_TYPE"
  | "ES_LEGAL_FORM"
  | "FI_BUSINESS_NUMBER"
  | "FI_ID_NUMBER"
  | "FI_NATIONALITY"
  | "FI_ORGANIZATION_TYPE"
  | "IT_NATIONALITY"
  | "IT_PIN"
  | "IT_REGISTRANT_ENTITY_TYPE"
  | "RU_PASSPORT_DATA"
  | "SE_ID_NUMBER"
  | "SG_ID_NUMBER"
  | "VAT_NUMBER"
  | "UK_CONTACT_TYPE"
  | "UK_COMPANY_NUMBER"
  | "EU_COUNTRY_OF_CITIZENSHIP"
  | "AU_PRIORITY_TOKEN"
  | "AU_ELIGIBILITY_TYPE"
  | "AU_POLICY_REASON"
  | "AU_REGISTRANT_NAME"
  | (string & {});
export type ExtraParamValue = string | redacted.Redacted<string>;
export interface ExtraParam {
  Name: ExtraParamName;
  Value: string | redacted.Redacted<string>;
}
export type ExtraParamList = ExtraParam[];
export interface ContactDetail {
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  ContactType?: ContactType;
  OrganizationName?: string | redacted.Redacted<string>;
  AddressLine1?: string | redacted.Redacted<string>;
  AddressLine2?: string | redacted.Redacted<string>;
  City?: string | redacted.Redacted<string>;
  State?: string | redacted.Redacted<string>;
  CountryCode?: CountryCode;
  ZipCode?: string | redacted.Redacted<string>;
  PhoneNumber?: string | redacted.Redacted<string>;
  Email?: string | redacted.Redacted<string>;
  Fax?: string | redacted.Redacted<string>;
  ExtraParams?: ExtraParam[];
}
export type RegistrarName = string;
export type RegistrarWhoIsServer = string;
export type RegistrarUrl = string;
export type RegistryDomainId = string;
export type Reseller = string;
export type DNSSec = string;
export type DomainStatus = string;
export type DomainStatusList = string[];
export interface DnssecKey {
  Algorithm?: number;
  Flags?: number;
  PublicKey?: string;
  DigestType?: number;
  Digest?: string;
  KeyTag?: number;
  Id?: string;
}
export type DnssecKeyList = DnssecKey[];
export interface GetDomainDetailResponse {
  DomainName?: string;
  Nameservers?: Nameserver[];
  AutoRenew?: boolean;
  AdminContact?: ContactDetail;
  RegistrantContact?: ContactDetail;
  TechContact?: ContactDetail;
  AdminPrivacy?: boolean;
  RegistrantPrivacy?: boolean;
  TechPrivacy?: boolean;
  RegistrarName?: string;
  WhoIsServer?: string;
  RegistrarUrl?: string;
  AbuseContactEmail?: string | redacted.Redacted<string>;
  AbuseContactPhone?: string | redacted.Redacted<string>;
  RegistryDomainId?: string;
  CreationDate?: Date;
  UpdatedDate?: Date;
  ExpirationDate?: Date;
  Reseller?: string;
  DnsSec?: string;
  StatusList?: string[];
  DnssecKeys?: DnssecKey[];
  BillingContact?: ContactDetail;
  BillingPrivacy?: boolean;
}
export interface GetDomainSuggestionsRequest {
  DomainName: string;
  SuggestionCount: number;
  OnlyAvailable: boolean;
}
export interface DomainSuggestion {
  DomainName?: string;
  Availability?: string;
}
export type DomainSuggestionsList = DomainSuggestion[];
export interface GetDomainSuggestionsResponse {
  SuggestionsList?: DomainSuggestion[];
}
export interface GetOperationDetailRequest {
  OperationId: string;
}
export type OperationStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "ERROR"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export type ErrorMessage = string;
export type OperationType =
  | "REGISTER_DOMAIN"
  | "DELETE_DOMAIN"
  | "TRANSFER_IN_DOMAIN"
  | "UPDATE_DOMAIN_CONTACT"
  | "UPDATE_NAMESERVER"
  | "CHANGE_PRIVACY_PROTECTION"
  | "DOMAIN_LOCK"
  | "ENABLE_AUTORENEW"
  | "DISABLE_AUTORENEW"
  | "ADD_DNSSEC"
  | "REMOVE_DNSSEC"
  | "EXPIRE_DOMAIN"
  | "TRANSFER_OUT_DOMAIN"
  | "CHANGE_DOMAIN_OWNER"
  | "RENEW_DOMAIN"
  | "PUSH_DOMAIN"
  | "INTERNAL_TRANSFER_OUT_DOMAIN"
  | "INTERNAL_TRANSFER_IN_DOMAIN"
  | "RELEASE_TO_GANDI"
  | "TRANSFER_ON_RENEW"
  | "RESTORE_DOMAIN"
  | (string & {});
export type StatusFlag =
  | "PENDING_ACCEPTANCE"
  | "PENDING_CUSTOMER_ACTION"
  | "PENDING_AUTHORIZATION"
  | "PENDING_PAYMENT_VERIFICATION"
  | "PENDING_SUPPORT_CASE"
  | (string & {});
export interface GetOperationDetailResponse {
  OperationId?: string;
  Status?: OperationStatus;
  Message?: string;
  DomainName?: string;
  Type?: OperationType;
  SubmittedDate?: Date;
  LastUpdatedDate?: Date;
  StatusFlag?: StatusFlag;
}
export type ListDomainsAttributeName = "DomainName" | "Expiry" | (string & {});
export type Operator = "LE" | "GE" | "BEGINS_WITH" | (string & {});
export type Value = string;
export type Values = string[];
export interface FilterCondition {
  Name: ListDomainsAttributeName;
  Operator: Operator;
  Values: string[];
}
export type FilterConditions = FilterCondition[];
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface SortCondition {
  Name: ListDomainsAttributeName;
  SortOrder: SortOrder;
}
export type PageMarker = string;
export type PageMaxItems = number;
export interface ListDomainsRequest {
  FilterConditions?: FilterCondition[];
  SortCondition?: SortCondition;
  Marker?: string;
  MaxItems?: number;
}
export interface DomainSummary {
  DomainName?: string;
  AutoRenew?: boolean;
  TransferLock?: boolean;
  Expiry?: Date;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsResponse {
  Domains?: DomainSummary[];
  NextPageMarker?: string;
}
export type OperationStatusList = OperationStatus[];
export type OperationTypeList = OperationType[];
export type ListOperationsSortAttributeName = "SubmittedDate" | (string & {});
export interface ListOperationsRequest {
  SubmittedSince?: Date;
  Marker?: string;
  MaxItems?: number;
  Status?: OperationStatus[];
  Type?: OperationType[];
  SortBy?: ListOperationsSortAttributeName;
  SortOrder?: SortOrder;
}
export interface OperationSummary {
  OperationId?: string;
  Status?: OperationStatus;
  Type?: OperationType;
  SubmittedDate?: Date;
  DomainName?: string;
  Message?: string;
  StatusFlag?: StatusFlag;
  LastUpdatedDate?: Date;
}
export type OperationSummaryList = OperationSummary[];
export interface ListOperationsResponse {
  Operations?: OperationSummary[];
  NextPageMarker?: string;
}
export type TldName = string;
export type ListPricesPageMaxItems = number;
export interface ListPricesRequest {
  Tld?: string;
  Marker?: string;
  MaxItems?: number;
}
export type DomainPriceName = string;
export type Price = number;
export type Currency = string;
export interface PriceWithCurrency {
  Price: number;
  Currency: string;
}
export interface DomainPrice {
  Name?: string;
  RegistrationPrice?: PriceWithCurrency;
  TransferPrice?: PriceWithCurrency;
  RenewalPrice?: PriceWithCurrency;
  ChangeOwnershipPrice?: PriceWithCurrency;
  RestorationPrice?: PriceWithCurrency;
}
export type DomainPriceList = DomainPrice[];
export interface ListPricesResponse {
  Prices?: DomainPrice[];
  NextPageMarker?: string;
}
export interface ListTagsForDomainRequest {
  DomainName: string;
}
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ListTagsForDomainResponse {
  TagList?: Tag[];
}
export type Label = string;
export interface PushDomainRequest {
  DomainName: string;
  Target: string;
}
export interface PushDomainResponse {}
export type DurationInYears = number;
export interface RegisterDomainRequest {
  DomainName: string;
  IdnLangCode?: string;
  DurationInYears: number;
  AutoRenew?: boolean;
  AdminContact: ContactDetail;
  RegistrantContact: ContactDetail;
  TechContact: ContactDetail;
  PrivacyProtectAdminContact?: boolean;
  PrivacyProtectRegistrantContact?: boolean;
  PrivacyProtectTechContact?: boolean;
  BillingContact?: ContactDetail;
  PrivacyProtectBillingContact?: boolean;
}
export interface RegisterDomainResponse {
  OperationId?: string;
}
export interface RejectDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string;
}
export interface RejectDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string;
}
export type CurrentExpiryYear = number;
export interface RenewDomainRequest {
  DomainName: string;
  DurationInYears?: number;
  CurrentExpiryYear: number;
}
export interface RenewDomainResponse {
  OperationId?: string;
}
export interface ResendContactReachabilityEmailRequest {
  domainName?: string;
}
export interface ResendContactReachabilityEmailResponse {
  domainName?: string;
  emailAddress?: string | redacted.Redacted<string>;
  isAlreadyVerified?: boolean;
}
export interface ResendOperationAuthorizationRequest {
  OperationId: string;
}
export interface ResendOperationAuthorizationResponse {}
export interface RetrieveDomainAuthCodeRequest {
  DomainName: string;
}
export interface RetrieveDomainAuthCodeResponse {
  AuthCode?: string | redacted.Redacted<string>;
}
export interface TransferDomainRequest {
  DomainName: string;
  IdnLangCode?: string;
  DurationInYears?: number;
  Nameservers?: Nameserver[];
  AuthCode?: string | redacted.Redacted<string>;
  AutoRenew?: boolean;
  AdminContact: ContactDetail;
  RegistrantContact: ContactDetail;
  TechContact: ContactDetail;
  PrivacyProtectAdminContact?: boolean;
  PrivacyProtectRegistrantContact?: boolean;
  PrivacyProtectTechContact?: boolean;
  BillingContact?: ContactDetail;
  PrivacyProtectBillingContact?: boolean;
}
export interface TransferDomainResponse {
  OperationId?: string;
}
export type AccountId = string;
export interface TransferDomainToAnotherAwsAccountRequest {
  DomainName: string;
  AccountId: string;
}
export interface TransferDomainToAnotherAwsAccountResponse {
  OperationId?: string;
  Password?: string | redacted.Redacted<string>;
}
export interface Consent {
  MaxPrice: number;
  Currency: string;
}
export interface UpdateDomainContactRequest {
  DomainName: string;
  AdminContact?: ContactDetail;
  RegistrantContact?: ContactDetail;
  TechContact?: ContactDetail;
  Consent?: Consent;
  BillingContact?: ContactDetail;
}
export interface UpdateDomainContactResponse {
  OperationId?: string;
}
export interface UpdateDomainContactPrivacyRequest {
  DomainName: string;
  AdminPrivacy?: boolean;
  RegistrantPrivacy?: boolean;
  TechPrivacy?: boolean;
  BillingPrivacy?: boolean;
}
export interface UpdateDomainContactPrivacyResponse {
  OperationId?: string;
}
export type FIAuthKey = string | redacted.Redacted<string>;
export interface UpdateDomainNameserversRequest {
  DomainName: string;
  FIAuthKey?: string | redacted.Redacted<string>;
  Nameservers: Nameserver[];
}
export interface UpdateDomainNameserversResponse {
  OperationId?: string;
}
export interface UpdateTagsForDomainRequest {
  DomainName: string;
  TagsToUpdate?: Tag[];
}
export interface UpdateTagsForDomainResponse {}
export interface ViewBillingRequest {
  Start?: Date;
  End?: Date;
  Marker?: string;
  MaxItems?: number;
}
export type InvoiceId = string;
export interface BillingRecord {
  DomainName?: string;
  Operation?: OperationType;
  InvoiceId?: string;
  BillDate?: Date;
  Price?: number;
}
export type BillingRecords = BillingRecord[];
export interface ViewBillingResponse {
  NextPageMarker?: string;
  BillingRecords?: BillingRecord[];
}
export type RequestId = string;
export type AcceptDomainTransferFromAnotherAwsAccountError =
  | DomainLimitExceeded
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * Accepts the transfer of a domain from another Amazon Web Services account to the
 * currentAmazon Web Services account. You initiate a transfer between Amazon Web Services accounts using TransferDomainToAnotherAwsAccount.
 *
 * If you use the CLI command at accept-domain-transfer-from-another-aws-account, use JSON format as input
 * instead of text because otherwise CLI will throw an error from domain
 * transfer input that includes single quotes.
 *
 * Use either ListOperations or GetOperationDetail to determine whether the operation succeeded. GetOperationDetail provides additional information, for example,
 * `Domain Transfer from Aws Account 111122223333 has been cancelled`.
 */
export const acceptDomainTransferFromAnotherAwsAccount: API.OperationMethod<
  AcceptDomainTransferFromAnotherAwsAccountRequest,
  AcceptDomainTransferFromAnotherAwsAccountResponse,
  AcceptDomainTransferFromAnotherAwsAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<AcceptDomainTransferFromAnotherAwsAccountRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<AcceptDomainTransferFromAnotherAwsAccountResponse>,
  errors: [DomainLimitExceeded, InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDomainTransferFromAnotherAwsAccount",
}));

export type AssociateDelegationSignerToDomainError =
  | DnssecLimitExceeded
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * Creates a delegation signer (DS) record in the registry zone for this domain
 * name.
 *
 * Note that creating DS record at the registry impacts DNSSEC validation of your DNS
 * records. This action may render your domain name unavailable on the internet if the
 * steps are completed in the wrong order, or with incorrect timing. For more information
 * about DNSSEC signing, see Configuring DNSSEC
 * signing in the Route 53 developer
 * guide.
 */
export const associateDelegationSignerToDomain: API.OperationMethod<
  AssociateDelegationSignerToDomainRequest,
  AssociateDelegationSignerToDomainResponse,
  AssociateDelegationSignerToDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<AssociateDelegationSignerToDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<AssociateDelegationSignerToDomainResponse>,
  errors: [
    DnssecLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDelegationSignerToDomain",
}));

export type CancelDomainTransferToAnotherAwsAccountError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * Cancels the transfer of a domain from the current Amazon Web Services account to
 * another Amazon Web Services account. You initiate a transfer betweenAmazon Web Services accounts using TransferDomainToAnotherAwsAccount.
 *
 * You must cancel the transfer before the other Amazon Web Services account accepts
 * the transfer using AcceptDomainTransferFromAnotherAwsAccount.
 *
 * Use either ListOperations or GetOperationDetail to determine whether the operation succeeded. GetOperationDetail provides additional information, for example,
 * `Domain Transfer from Aws Account 111122223333 has been cancelled`.
 */
export const cancelDomainTransferToAnotherAwsAccount: API.OperationMethod<
  CancelDomainTransferToAnotherAwsAccountRequest,
  CancelDomainTransferToAnotherAwsAccountResponse,
  CancelDomainTransferToAnotherAwsAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<CancelDomainTransferToAnotherAwsAccountRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<CancelDomainTransferToAnotherAwsAccountResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDomainTransferToAnotherAwsAccount",
}));

export type CheckDomainAvailabilityError =
  | InvalidInput
  | TLDInMaintenance
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation checks the availability of one domain name. Note that if the
 * availability status of a domain is pending, you must submit another request to determine
 * the availability of the domain name.
 */
export const checkDomainAvailability: API.OperationMethod<
  CheckDomainAvailabilityRequest,
  CheckDomainAvailabilityResponse,
  CheckDomainAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<CheckDomainAvailabilityRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<CheckDomainAvailabilityResponse>,
  errors: [InvalidInput, TLDInMaintenance, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDomainAvailability",
}));

export type CheckDomainTransferabilityError =
  | InvalidInput
  | TLDInMaintenance
  | UnsupportedTLD
  | CommonErrors;
/**
 * Checks whether a domain name can be transferred to Amazon Route 53.
 */
export const checkDomainTransferability: API.OperationMethod<
  CheckDomainTransferabilityRequest,
  CheckDomainTransferabilityResponse,
  CheckDomainTransferabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CheckDomainTransferabilityRequest>,
  output: __S(26, __c3, 2) as any as S.Schema<CheckDomainTransferabilityResponse>,
  errors: [InvalidInput, TLDInMaintenance, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDomainTransferability",
}));

export type DeleteDomainError =
  | DuplicateRequest
  | InvalidInput
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation deletes the specified domain. This action is permanent. For more
 * information, see Deleting a domain name
 * registration.
 *
 * To transfer the domain registration to another registrar, use the transfer process
 * that's provided by the registrar to which you want to transfer the registration.
 * Otherwise, the following apply:
 *
 * - You can't get a refund for the cost of a deleted domain registration.
 *
 * - The registry for the top-level domain might hold the domain name for a brief
 * time before releasing it for other users to register (varies by registry).
 *
 * - When the registration has been deleted, we'll send you a confirmation to the
 * registrant contact. The email will come from
 * `noreply@domainnameverification.net` or
 * `noreply@emailverification.info` or
 * `noreply@registrar.amazon`.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<DeleteDomainResponse>,
  errors: [DuplicateRequest, InvalidInput, TLDRulesViolation, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteTagsForDomainError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation deletes the specified tags for a domain.
 *
 * All tag operations are eventually consistent; subsequent operations might not
 * immediately represent all issued operations.
 */
export const deleteTagsForDomain: API.OperationMethod<
  DeleteTagsForDomainRequest,
  DeleteTagsForDomainResponse,
  DeleteTagsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteTagsForDomainRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteTagsForDomainResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTagsForDomain",
}));

export type DisableDomainAutoRenewError = InvalidInput | UnsupportedTLD | CommonErrors;
/**
 * This operation disables automatic renewal of domain registration for the specified
 * domain.
 */
export const disableDomainAutoRenew: API.OperationMethod<
  DisableDomainAutoRenewRequest,
  DisableDomainAutoRenewResponse,
  DisableDomainAutoRenewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DisableDomainAutoRenewRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DisableDomainAutoRenewResponse>,
  errors: [InvalidInput, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableDomainAutoRenew",
}));

export type DisableDomainTransferLockError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation removes the transfer lock on the domain (specifically the
 * `clientTransferProhibited` status) to allow domain transfers. We
 * recommend you refrain from performing this action unless you intend to transfer the
 * domain to a different registrar. Successful submission returns an operation ID that you
 * can use to track the progress and completion of the action. If the request is not
 * completed successfully, the domain registrant will be notified by email.
 */
export const disableDomainTransferLock: API.OperationMethod<
  DisableDomainTransferLockRequest,
  DisableDomainTransferLockResponse,
  DisableDomainTransferLockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DisableDomainTransferLockRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<DisableDomainTransferLockResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableDomainTransferLock",
}));

export type DisassociateDelegationSignerFromDomainError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * Deletes a delegation signer (DS) record in the registry zone for this domain
 * name.
 */
export const disassociateDelegationSignerFromDomain: API.OperationMethod<
  DisassociateDelegationSignerFromDomainRequest,
  DisassociateDelegationSignerFromDomainResponse,
  DisassociateDelegationSignerFromDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DisassociateDelegationSignerFromDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<DisassociateDelegationSignerFromDomainResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDelegationSignerFromDomain",
}));

export type EnableDomainAutoRenewError =
  | InvalidInput
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation configures Amazon Route 53 to automatically renew the specified domain
 * before the domain registration expires. The cost of renewing your domain registration is
 * billed to your Amazon Web Services account.
 *
 * The period during which you can renew a domain name varies by TLD. For a list of TLDs
 * and their renewal policies, see Domains That You Can
 * Register with Amazon Route 53 in the Amazon Route 53 Developer
 * Guide. Route 53 requires that you renew before the end of the renewal
 * period so we can complete processing before the deadline.
 */
export const enableDomainAutoRenew: API.OperationMethod<
  EnableDomainAutoRenewRequest,
  EnableDomainAutoRenewResponse,
  EnableDomainAutoRenewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<EnableDomainAutoRenewRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<EnableDomainAutoRenewResponse>,
  errors: [InvalidInput, TLDRulesViolation, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableDomainAutoRenew",
}));

export type EnableDomainTransferLockError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation sets the transfer lock on the domain (specifically the
 * `clientTransferProhibited` status) to prevent domain transfers.
 * Successful submission returns an operation ID that you can use to track the progress and
 * completion of the action. If the request is not completed successfully, the domain
 * registrant will be notified by email.
 */
export const enableDomainTransferLock: API.OperationMethod<
  EnableDomainTransferLockRequest,
  EnableDomainTransferLockResponse,
  EnableDomainTransferLockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<EnableDomainTransferLockRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<EnableDomainTransferLockResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableDomainTransferLock",
}));

export type GetContactReachabilityStatusError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * For operations that require confirmation that the email address for the registrant
 * contact is valid, such as registering a new domain, this operation returns information
 * about whether the registrant contact has responded.
 *
 * If you want us to resend the email, use the
 * `ResendContactReachabilityEmail` operation.
 */
export const getContactReachabilityStatus: API.OperationMethod<
  GetContactReachabilityStatusRequest,
  GetContactReachabilityStatusResponse,
  GetContactReachabilityStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetContactReachabilityStatusRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<GetContactReachabilityStatusResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactReachabilityStatus",
}));

export type GetDomainDetailError = InvalidInput | UnsupportedTLD | DomainNotFound | CommonErrors;
/**
 * This operation returns detailed information about a specified domain that is
 * associated with the current Amazon Web Services account. Contact information for the
 * domain is also returned as part of the output.
 */
export const getDomainDetail: API.OperationMethod<
  GetDomainDetailRequest,
  GetDomainDetailResponse,
  GetDomainDetailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetDomainDetailRequest>,
  output: __S(115, __c14, 3) as any as S.Schema<GetDomainDetailResponse>,
  errors: [InvalidInput, UnsupportedTLD, DomainNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDetail",
}));

export type GetDomainSuggestionsError =
  | InvalidInput
  | TLDInMaintenance
  | UnsupportedTLD
  | CommonErrors;
/**
 * The GetDomainSuggestions operation returns a list of suggested domain names.
 */
export const getDomainSuggestions: API.OperationMethod<
  GetDomainSuggestionsRequest,
  GetDomainSuggestionsResponse,
  GetDomainSuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetDomainSuggestionsRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<GetDomainSuggestionsResponse>,
  errors: [InvalidInput, TLDInMaintenance, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainSuggestions",
}));

export type GetOperationDetailError = InvalidInput | CommonErrors;
/**
 * This operation returns the current status of an operation that is not
 * completed.
 */
export const getOperationDetail: API.OperationMethod<
  GetOperationDetailRequest,
  GetOperationDetailResponse,
  GetOperationDetailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetOperationDetailRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<GetOperationDetailResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperationDetail",
}));

export type ListDomainsError = InvalidInput | CommonErrors;
/**
 * This operation returns all the domain names registered with Amazon Route 53 for the
 * current Amazon Web Services account if no filtering conditions are used.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(155, __c19, 3) as any as S.Schema<ListDomainsRequest>,
  output: __S(158, __c19, 6) as any as S.Schema<ListDomainsResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Domains",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListOperationsError = InvalidInput | CommonErrors;
/**
 * Returns information about all of the operations that return an operation ID and that
 * have ever been performed on domains that were registered by the current account.
 *
 * This command runs only in the us-east-1 Region.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  OperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(161, __c20, 1) as any as S.Schema<ListOperationsRequest>,
  output: __S(164, __c20, 4) as any as S.Schema<ListOperationsResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Operations",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListPricesError = InvalidInput | UnsupportedTLD | CommonErrors;
/**
 * Lists the following prices for either all the TLDs supported by Route 53, or
 * the specified TLD:
 *
 * - Registration
 *
 * - Transfer
 *
 * - Owner change
 *
 * - Domain renewal
 *
 * - Domain restoration
 */
export const listPrices: API.PaginatedOperationMethod<
  ListPricesRequest,
  ListPricesResponse,
  ListPricesError,
  Credentials | HttpClient.HttpClient,
  DomainPrice
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListPricesRequest>,
  output: __S(172, __c21, 4) as any as S.Schema<ListPricesResponse>,
  errors: [InvalidInput, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrices",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Prices",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForDomainError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation returns all of the tags that are associated with the specified
 * domain.
 *
 * All tag operations are eventually consistent; subsequent operations might not
 * immediately represent all issued operations.
 */
export const listTagsForDomain: API.OperationMethod<
  ListTagsForDomainRequest,
  ListTagsForDomainResponse,
  ListTagsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListTagsForDomainRequest>,
  output: __S(177, __c22, 1) as any as S.Schema<ListTagsForDomainResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForDomain",
}));

export type PushDomainError =
  | InvalidInput
  | OperationLimitExceeded
  | TLDInMaintenance
  | UnsupportedTLD
  | CommonErrors;
/**
 * Moves a domain from Amazon Web Services to another registrar.
 *
 * Supported actions:
 *
 * - Changes the IPS tags of a .uk domain, and pushes it to transit. Transit means
 * that the domain is ready to be transferred to another registrar.
 */
export const pushDomain: API.OperationMethod<
  PushDomainRequest,
  PushDomainResponse,
  PushDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<PushDomainRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<PushDomainResponse>,
  errors: [InvalidInput, OperationLimitExceeded, TLDInMaintenance, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PushDomain",
}));

export type RegisterDomainError =
  | DomainLimitExceeded
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation registers a domain. For some top-level domains (TLDs), this operation
 * requires extra parameters.
 *
 * When you register a domain, Amazon Route 53 does the following:
 *
 * - Creates a Route 53 hosted zone that has the same name as the domain. Route 53
 * assigns four name servers to your hosted zone and automatically updates your
 * domain registration with the names of these name servers.
 *
 * - Enables auto renew, so your domain registration will renew automatically each
 * year. We'll notify you in advance of the renewal date so you can choose whether
 * to renew the registration.
 *
 * - Optionally enables privacy protection, so WHOIS queries return contact for the registrar
 * or the phrase "REDACTED FOR PRIVACY", or "On behalf of owner."
 * If you don't enable privacy protection, WHOIS queries return the information
 * that you entered for the administrative, registrant, and technical
 * contacts.
 *
 * While some domains may allow different privacy settings per contact, we recommend
 * specifying the same privacy setting for all contacts.
 *
 * - If registration is successful, returns an operation ID that you can use to
 * track the progress and completion of the action. If the request is not completed
 * successfully, the domain registrant is notified by email.
 *
 * - Charges your Amazon Web Services account an amount based on the top-level
 * domain. For more information, see Amazon Route 53 Pricing.
 */
export const registerDomain: API.OperationMethod<
  RegisterDomainRequest,
  RegisterDomainResponse,
  RegisterDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<RegisterDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<RegisterDomainResponse>,
  errors: [
    DomainLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDomain",
}));

export type RejectDomainTransferFromAnotherAwsAccountError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * Rejects the transfer of a domain from another Amazon Web Services account to the
 * current Amazon Web Services account. You initiate a transfer betweenAmazon Web Services accounts using TransferDomainToAnotherAwsAccount.
 *
 * Use either ListOperations or GetOperationDetail to determine whether the operation succeeded. GetOperationDetail provides additional information, for example,
 * `Domain Transfer from Aws Account 111122223333 has been cancelled`.
 */
export const rejectDomainTransferFromAnotherAwsAccount: API.OperationMethod<
  RejectDomainTransferFromAnotherAwsAccountRequest,
  RejectDomainTransferFromAnotherAwsAccountResponse,
  RejectDomainTransferFromAnotherAwsAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<RejectDomainTransferFromAnotherAwsAccountRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<RejectDomainTransferFromAnotherAwsAccountResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDomainTransferFromAnotherAwsAccount",
}));

export type RenewDomainError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | DomainNotFound
  | CommonErrors;
/**
 * This operation renews a domain for the specified number of years. The cost of renewing
 * your domain is billed to your Amazon Web Services account.
 *
 * We recommend that you renew your domain several weeks before the expiration date. Some
 * TLD registries delete domains before the expiration date if you haven't renewed far
 * enough in advance. For more information about renewing domain registration, see Renewing
 * Registration for a Domain in the Amazon Route 53 Developer
 * Guide.
 */
export const renewDomain: API.OperationMethod<
  RenewDomainRequest,
  RenewDomainResponse,
  RenewDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<RenewDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<RenewDomainResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
    DomainNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewDomain",
}));

export type ResendContactReachabilityEmailError =
  | InvalidInput
  | OperationLimitExceeded
  | TLDInMaintenance
  | UnsupportedTLD
  | CommonErrors;
/**
 * For operations that require confirmation that the email address for the registrant
 * contact is valid, such as registering a new domain, this operation resends the
 * confirmation email to the current email address for the registrant contact.
 */
export const resendContactReachabilityEmail: API.OperationMethod<
  ResendContactReachabilityEmailRequest,
  ResendContactReachabilityEmailResponse,
  ResendContactReachabilityEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ResendContactReachabilityEmailRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<ResendContactReachabilityEmailResponse>,
  errors: [InvalidInput, OperationLimitExceeded, TLDInMaintenance, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendContactReachabilityEmail",
}));

export type ResendOperationAuthorizationError = InvalidInput | TLDInMaintenance | CommonErrors;
/**
 * Resend the form of authorization email for this operation.
 */
export const resendOperationAuthorization: API.OperationMethod<
  ResendOperationAuthorizationRequest,
  ResendOperationAuthorizationResponse,
  ResendOperationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ResendOperationAuthorizationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<ResendOperationAuthorizationResponse>,
  errors: [InvalidInput, TLDInMaintenance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendOperationAuthorization",
}));

export type RetrieveDomainAuthCodeError =
  | InvalidInput
  | TLDInMaintenance
  | UnsupportedTLD
  | DomainNotFound
  | CommonErrors;
/**
 * This operation returns the authorization code for the domain. To transfer a domain to
 * another registrar, you provide this value to the new registrar.
 */
export const retrieveDomainAuthCode: API.OperationMethod<
  RetrieveDomainAuthCodeRequest,
  RetrieveDomainAuthCodeResponse,
  RetrieveDomainAuthCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<RetrieveDomainAuthCodeRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<RetrieveDomainAuthCodeResponse>,
  errors: [InvalidInput, TLDInMaintenance, UnsupportedTLD, DomainNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveDomainAuthCode",
}));

export type TransferDomainError =
  | DomainLimitExceeded
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * Transfers a domain from another registrar to Amazon Route 53.
 *
 * For more information about transferring domains, see the following topics:
 *
 * - For transfer requirements, a detailed procedure, and information about viewing
 * the status of a domain that you're transferring to Route 53, see Transferring Registration for a Domain to Amazon Route 53 in the
 * *Amazon Route 53 Developer Guide*.
 *
 * - For information about how to transfer a domain from one Amazon Web Services account to another, see TransferDomainToAnotherAwsAccount.
 *
 * - For information about how to transfer a domain to another domain registrar,
 * see Transferring a Domain from Amazon Route 53 to Another Registrar in
 * the *Amazon Route 53 Developer Guide*.
 *
 * During the transfer of any country code top-level domains (ccTLDs) to Route 53, except for .cc and .tv,
 * updates to the owner contact are ignored and the owner contact data from the registry is used.
 * You can
 * update the owner contact after the transfer is complete. For more information, see
 * UpdateDomainContact.
 *
 * If the registrar for your domain is also the DNS service provider for the domain, we
 * highly recommend that you transfer your DNS service to Route 53 or to another DNS
 * service provider before you transfer your registration. Some registrars provide free DNS
 * service when you purchase a domain registration. When you transfer the registration, the
 * previous registrar will not renew your domain registration and could end your DNS
 * service at any time.
 *
 * If the registrar for your domain is also the DNS service provider for the domain
 * and you don't transfer DNS service to another provider, your website, email, and the
 * web applications associated with the domain might become unavailable.
 *
 * If the transfer is successful, this method returns an operation ID that you can use to
 * track the progress and completion of the action. If the transfer doesn't complete
 * successfully, the domain registrant will be notified by email.
 */
export const transferDomain: API.OperationMethod<
  TransferDomainRequest,
  TransferDomainResponse,
  TransferDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<TransferDomainRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<TransferDomainResponse>,
  errors: [
    DomainLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferDomain",
}));

export type TransferDomainToAnotherAwsAccountError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * Transfers a domain from the current Amazon Web Services account to another Amazon Web Services account. Note the following:
 *
 * - The Amazon Web Services account that you're transferring the domain to must
 * accept the transfer. If the other account doesn't accept the transfer within 3
 * days, we cancel the transfer. See AcceptDomainTransferFromAnotherAwsAccount.
 *
 * - You can cancel the transfer before the other account accepts it. See CancelDomainTransferToAnotherAwsAccount.
 *
 * - The other account can reject the transfer. See RejectDomainTransferFromAnotherAwsAccount.
 *
 * When you transfer a domain from one Amazon Web Services account to another, Route
 * 53 doesn't transfer the hosted zone that is associated with the domain. DNS
 * resolution isn't affected if the domain and the hosted zone are owned by separate
 * accounts, so transferring the hosted zone is optional. For information about
 * transferring the hosted zone to another Amazon Web Services account, see Migrating a
 * Hosted Zone to a Different Amazon Web Services Account in the
 * *Amazon Route 53 Developer Guide*.
 *
 * Use either ListOperations or GetOperationDetail to determine whether the operation succeeded. GetOperationDetail provides additional information, for example,
 * `Domain Transfer from Aws Account 111122223333 has been cancelled`.
 */
export const transferDomainToAnotherAwsAccount: API.OperationMethod<
  TransferDomainToAnotherAwsAccountRequest,
  TransferDomainToAnotherAwsAccountResponse,
  TransferDomainToAnotherAwsAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<TransferDomainToAnotherAwsAccountRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<TransferDomainToAnotherAwsAccountResponse>,
  errors: [DuplicateRequest, InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferDomainToAnotherAwsAccount",
}));

export type UpdateDomainContactError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation updates the contact information for a particular domain. You must
 * specify information for at least one contact: registrant, administrator, or
 * technical.
 *
 * If the update is successful, this method returns an operation ID that you can use to
 * track the progress and completion of the operation. If the request is not completed
 * successfully, the domain registrant will be notified by email.
 */
export const updateDomainContact: API.OperationMethod<
  UpdateDomainContactRequest,
  UpdateDomainContactResponse,
  UpdateDomainContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(265, __c33, 1) as any as S.Schema<UpdateDomainContactRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<UpdateDomainContactResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainContact",
}));

export type UpdateDomainContactPrivacyError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation updates the specified domain contact's privacy setting. When privacy
 * protection is enabled, your contact information is replaced with contact information for
 * the registrar or with the phrase "REDACTED FOR PRIVACY", or "On behalf of owner."
 *
 * While some domains may allow different privacy settings per contact, we recommend
 * specifying the same privacy setting for all contacts.
 *
 * This operation affects only the contact information for the specified contact type
 * (administrative, registrant, or technical). If the request succeeds, Amazon Route 53
 * returns an operation ID that you can use with GetOperationDetail to track the progress and completion of the action. If
 * the request doesn't complete successfully, the domain registrant will be notified by
 * email.
 *
 * By disabling the privacy service via API, you consent to the publication of the
 * contact information provided for this domain via the public WHOIS database. You
 * certify that you are the registrant of this domain name and have the authority to
 * make this decision. You may withdraw your consent at any time by enabling privacy
 * protection using either `UpdateDomainContactPrivacy` or the Route 53
 * console. Enabling privacy protection removes the contact information provided for
 * this domain from the WHOIS database. For more information on our privacy practices,
 * see https://aws.amazon.com/privacy/.
 */
export const updateDomainContactPrivacy: API.OperationMethod<
  UpdateDomainContactPrivacyRequest,
  UpdateDomainContactPrivacyResponse,
  UpdateDomainContactPrivacyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<UpdateDomainContactPrivacyRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<UpdateDomainContactPrivacyResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainContactPrivacy",
}));

export type UpdateDomainNameserversError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
  | DomainNotFound
  | CommonErrors;
/**
 * This operation replaces the current set of name servers for the domain with the
 * specified set of name servers. If you use Amazon Route 53 as your DNS service, specify
 * the four name servers in the delegation set for the hosted zone for the domain.
 *
 * If successful, this operation returns an operation ID that you can use to track the
 * progress and completion of the action. If the request is not completed successfully, the
 * domain registrant will be notified by email.
 */
export const updateDomainNameservers: API.OperationMethod<
  UpdateDomainNameserversRequest,
  UpdateDomainNameserversResponse,
  UpdateDomainNameserversError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<UpdateDomainNameserversRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<UpdateDomainNameserversResponse>,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
    DomainNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainNameservers",
}));

export type UpdateTagsForDomainError =
  | InvalidInput
  | OperationLimitExceeded
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation adds or updates tags for a specified domain.
 *
 * All tag operations are eventually consistent; subsequent operations might not
 * immediately represent all issued operations.
 */
export const updateTagsForDomain: API.OperationMethod<
  UpdateTagsForDomainRequest,
  UpdateTagsForDomainResponse,
  UpdateTagsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UpdateTagsForDomainRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateTagsForDomainResponse>,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagsForDomain",
}));

export type ViewBillingError = InvalidInput | CommonErrors;
/**
 * Returns all the domain-related billing records for the current Amazon Web Services account for a specified period
 */
export const viewBilling: API.PaginatedOperationMethod<
  ViewBillingRequest,
  ViewBillingResponse,
  ViewBillingError,
  Credentials | HttpClient.HttpClient,
  BillingRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<ViewBillingRequest>,
  output: __S(299, __c37, 3) as any as S.Schema<ViewBillingResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ViewBilling",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "BillingRecords",
    pageSize: "MaxItems",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.Number),
          Flags: S.optional(S.Number),
          PublicKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnssecSigningAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, SigningAttributes: __S(0, __c0, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateDelegationSignerToDomainRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelDomainTransferToAnotherAwsAccountRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, IdnLangCode: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CheckDomainAvailabilityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Availability: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CheckDomainAvailabilityResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, AuthCode: S.optional(SensitiveString) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CheckDomainTransferabilityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Transferable: S.optional(S.String) })).annotate({
        identifier: "DomainTransferability",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Transferability: S.optional(__S(25, __c3, 1)),
          Message: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CheckDomainTransferabilityResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, TagsToDelete: __S(56, __c7, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTagsForDomainRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteTagsForDomainResponse",
      });
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
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableDomainAutoRenewRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableDomainTransferLockRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, Id: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateDelegationSignerFromDomainRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableDomainAutoRenewRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableDomainTransferLockRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetContactReachabilityStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String), status: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "GetContactReachabilityStatusResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainDetailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.Number),
          Flags: S.optional(S.Number),
          PublicKey: S.optional(S.String),
          DigestType: S.optional(S.Number),
          Digest: S.optional(S.String),
          KeyTag: S.optional(S.Number),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnssecKey" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          Nameservers: S.optional(__S(129, __c16, 1)),
          AutoRenew: S.optional(S.Boolean),
          AdminContact: S.optional(__S(122, __c15, 2)),
          RegistrantContact: S.optional(__S(122, __c15, 2)),
          TechContact: S.optional(__S(122, __c15, 2)),
          AdminPrivacy: S.optional(S.Boolean),
          RegistrantPrivacy: S.optional(S.Boolean),
          TechPrivacy: S.optional(S.Boolean),
          RegistrarName: S.optional(S.String),
          WhoIsServer: S.optional(S.String),
          RegistrarUrl: S.optional(S.String),
          AbuseContactEmail: S.optional(SensitiveString),
          AbuseContactPhone: S.optional(SensitiveString),
          RegistryDomainId: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Reseller: S.optional(S.String),
          DnsSec: S.optional(S.String),
          StatusList: S.optional(__S(56, __c7, 0)),
          DnssecKeys: S.optional(__S(114, __c14, 2)),
          BillingContact: S.optional(__S(122, __c15, 2)),
          BillingPrivacy: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "GetDomainDetailResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: SensitiveString })).annotate({
        identifier: "ExtraParam",
      });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          ContactType: S.optional(S.String),
          OrganizationName: S.optional(SensitiveString),
          AddressLine1: S.optional(SensitiveString),
          AddressLine2: S.optional(SensitiveString),
          City: S.optional(SensitiveString),
          State: S.optional(SensitiveString),
          CountryCode: S.optional(S.String),
          ZipCode: S.optional(SensitiveString),
          PhoneNumber: S.optional(SensitiveString),
          Email: S.optional(SensitiveString),
          Fax: S.optional(SensitiveString),
          ExtraParams: S.optional(__S(121, __c15, 1)),
        }),
      ).annotate({ identifier: "ContactDetail" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, GlueIps: S.optional(__S(56, __c7, 0)) }),
      ).annotate({ identifier: "Nameserver" });
    case 1:
      return S.Array(__S(128, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          SuggestionCount: S.Number,
          OnlyAvailable: S.Boolean,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDomainSuggestionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainName: S.optional(S.String), Availability: S.optional(S.String) }),
      ).annotate({ identifier: "DomainSuggestion" });
    case 2:
      return S.Array(__S(137, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SuggestionsList: S.optional(__S(138, __c17, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetDomainSuggestionsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOperationDetailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OperationId: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          DomainName: S.optional(S.String),
          Type: S.optional(S.String),
          SubmittedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusFlag: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOperationDetailResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Operator: S.String, Values: __S(56, __c7, 0) }),
      ).annotate({ identifier: "FilterCondition" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() => S.Struct({ Name: S.String, SortOrder: S.String })).annotate({
        identifier: "SortCondition",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FilterConditions: S.optional(__S(153, __c19, 1)),
          SortCondition: S.optional(__S(154, __c19, 2)),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          AutoRenew: S.optional(S.Boolean),
          TransferLock: S.optional(S.Boolean),
          Expiry: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 5:
      return S.Array(__S(156, __c19, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Domains: S.optional(__S(157, __c19, 5)),
          NextPageMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDomainsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubmittedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          Status: S.optional(__S(160, __c20, 0)),
          Type: S.optional(__S(160, __c20, 0)),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOperationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OperationId: S.optional(S.String),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
          SubmittedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DomainName: S.optional(S.String),
          Message: S.optional(S.String),
          StatusFlag: S.optional(S.String),
          LastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OperationSummary" });
    case 3:
      return S.Array(__S(162, __c20, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Operations: S.optional(__S(163, __c20, 3)),
          NextPageMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOperationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tld: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPricesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Price: S.Number, Currency: S.String })).annotate({
        identifier: "PriceWithCurrency",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          RegistrationPrice: S.optional(__S(169, __c21, 1)),
          TransferPrice: S.optional(__S(169, __c21, 1)),
          RenewalPrice: S.optional(__S(169, __c21, 1)),
          ChangeOwnershipPrice: S.optional(__S(169, __c21, 1)),
          RestorationPrice: S.optional(__S(169, __c21, 1)),
        }),
      ).annotate({ identifier: "DomainPrice" });
    case 3:
      return S.Array(__S(170, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Prices: S.optional(__S(171, __c21, 3)),
          NextPageMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPricesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(185, __c23, 1)) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForDomainResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(184, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, Target: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PushDomainRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          IdnLangCode: S.optional(S.String),
          DurationInYears: S.Number,
          AutoRenew: S.optional(S.Boolean),
          AdminContact: __S(122, __c15, 2),
          RegistrantContact: __S(122, __c15, 2),
          TechContact: __S(122, __c15, 2),
          PrivacyProtectAdminContact: S.optional(S.Boolean),
          PrivacyProtectRegistrantContact: S.optional(S.Boolean),
          PrivacyProtectTechContact: S.optional(S.Boolean),
          BillingContact: S.optional(__S(122, __c15, 2)),
          PrivacyProtectBillingContact: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterDomainRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectDomainTransferFromAnotherAwsAccountRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          DurationInYears: S.optional(S.Number),
          CurrentExpiryYear: S.Number,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RenewDomainRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResendContactReachabilityEmailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          emailAddress: S.optional(SensitiveString),
          isAlreadyVerified: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "ResendContactReachabilityEmailResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResendOperationAuthorizationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RetrieveDomainAuthCodeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AuthCode: S.optional(SensitiveString) }).pipe(ns)).annotate(
        { identifier: "RetrieveDomainAuthCodeResponse" },
      );
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          IdnLangCode: S.optional(S.String),
          DurationInYears: S.optional(S.Number),
          Nameservers: S.optional(__S(129, __c16, 1)),
          AuthCode: S.optional(SensitiveString),
          AutoRenew: S.optional(S.Boolean),
          AdminContact: __S(122, __c15, 2),
          RegistrantContact: __S(122, __c15, 2),
          TechContact: __S(122, __c15, 2),
          PrivacyProtectAdminContact: S.optional(S.Boolean),
          PrivacyProtectRegistrantContact: S.optional(S.Boolean),
          PrivacyProtectTechContact: S.optional(S.Boolean),
          BillingContact: S.optional(__S(122, __c15, 2)),
          PrivacyProtectBillingContact: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TransferDomainRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, AccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TransferDomainToAnotherAwsAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OperationId: S.optional(S.String), Password: S.optional(SensitiveString) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "TransferDomainToAnotherAwsAccountResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MaxPrice: S.Number, Currency: S.String })).annotate({
        identifier: "Consent",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          AdminContact: S.optional(__S(122, __c15, 2)),
          RegistrantContact: S.optional(__S(122, __c15, 2)),
          TechContact: S.optional(__S(122, __c15, 2)),
          Consent: S.optional(__S(264, __c33, 0)),
          BillingContact: S.optional(__S(122, __c15, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDomainContactRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          AdminPrivacy: S.optional(S.Boolean),
          RegistrantPrivacy: S.optional(S.Boolean),
          TechPrivacy: S.optional(S.Boolean),
          BillingPrivacy: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDomainContactPrivacyRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          FIAuthKey: S.optional(SensitiveString),
          Nameservers: __S(129, __c16, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDomainNameserversRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, TagsToUpdate: S.optional(__S(185, __c23, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTagsForDomainRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ViewBillingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          Operation: S.optional(S.String),
          InvoiceId: S.optional(S.String),
          BillDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Price: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BillingRecord" });
    case 2:
      return S.Array(__S(297, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextPageMarker: S.optional(S.String),
          BillingRecords: S.optional(__S(298, __c37, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ViewBillingResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, Password: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptDomainTransferFromAnotherAwsAccountRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OperationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AcceptDomainTransferFromAnotherAwsAccountResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
