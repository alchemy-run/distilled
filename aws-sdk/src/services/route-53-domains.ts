import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace(
  "https://route53domains.amazonaws.com/doc/2014-05-15/",
);
const svc = T.AwsApiService({
  sdkId: "Route 53 Domains",
  serviceShapeName: "Route53Domains_v20140515",
});
const auth = T.AwsAuthSigv4({ name: "route53domains" });
const ver = T.ServiceVersion("2014-05-15");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53domains.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://route53domains.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type DomainName = string;
export type Password = string | redacted.Redacted<string>;
export type OperationId = string;
export type ErrorMessage = string;
export type DnssecPublicKey = string;
export type RequestId = string;
export type LangCode = string;
export type DomainAuthCode = string | redacted.Redacted<string>;
export type Message = string;
export type TagKey = string;
export type HostName = string;
export type GlueIp = string;
export type ContactName = string | redacted.Redacted<string>;
export type AddressLine = string | redacted.Redacted<string>;
export type City = string | redacted.Redacted<string>;
export type State = string | redacted.Redacted<string>;
export type ZipCode = string | redacted.Redacted<string>;
export type ContactNumber = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export type ExtraParamValue = string | redacted.Redacted<string>;
export type RegistrarName = string;
export type RegistrarWhoIsServer = string;
export type RegistrarUrl = string;
export type RegistryDomainId = string;
export type Reseller = string;
export type DNSSec = string;
export type DomainStatus = string;
export type Value = string;
export type PageMarker = string;
export type PageMaxItems = number;
export type TldName = string;
export type ListPricesPageMaxItems = number;
export type DomainPriceName = string;
export type Price = number;
export type Currency = string;
export type TagValue = string;
export type Label = string;
export type DurationInYears = number;
export type CurrentExpiryYear = number;
export type AccountId = string;
export type FIAuthKey = string | redacted.Redacted<string>;
export type InvoiceId = string;

//# Schemas
export interface AcceptDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string;
  Password: string | redacted.Redacted<string>;
}
export const AcceptDomainTransferFromAnotherAwsAccountRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Password: SensitiveString }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptDomainTransferFromAnotherAwsAccountRequest",
}) as any as S.Schema<AcceptDomainTransferFromAnotherAwsAccountRequest>;
export interface AcceptDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string;
}
export const AcceptDomainTransferFromAnotherAwsAccountResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AcceptDomainTransferFromAnotherAwsAccountResponse",
}) as any as S.Schema<AcceptDomainTransferFromAnotherAwsAccountResponse>;
export interface DnssecSigningAttributes {
  Algorithm?: number;
  Flags?: number;
  PublicKey?: string;
}
export const DnssecSigningAttributes = S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(S.Number),
    Flags: S.optional(S.Number),
    PublicKey: S.optional(S.String),
  }),
).annotate({
  identifier: "DnssecSigningAttributes",
}) as any as S.Schema<DnssecSigningAttributes>;
export interface AssociateDelegationSignerToDomainRequest {
  DomainName: string;
  SigningAttributes: DnssecSigningAttributes;
}
export const AssociateDelegationSignerToDomainRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    SigningAttributes: DnssecSigningAttributes,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateDelegationSignerToDomainRequest",
}) as any as S.Schema<AssociateDelegationSignerToDomainRequest>;
export interface AssociateDelegationSignerToDomainResponse {
  OperationId?: string;
}
export const AssociateDelegationSignerToDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AssociateDelegationSignerToDomainResponse",
}) as any as S.Schema<AssociateDelegationSignerToDomainResponse>;
export interface CancelDomainTransferToAnotherAwsAccountRequest {
  DomainName: string;
}
export const CancelDomainTransferToAnotherAwsAccountRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelDomainTransferToAnotherAwsAccountRequest",
}) as any as S.Schema<CancelDomainTransferToAnotherAwsAccountRequest>;
export interface CancelDomainTransferToAnotherAwsAccountResponse {
  OperationId?: string;
}
export const CancelDomainTransferToAnotherAwsAccountResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CancelDomainTransferToAnotherAwsAccountResponse",
}) as any as S.Schema<CancelDomainTransferToAnotherAwsAccountResponse>;
export interface CheckDomainAvailabilityRequest {
  DomainName: string;
  IdnLangCode?: string;
}
export const CheckDomainAvailabilityRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, IdnLangCode: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckDomainAvailabilityRequest",
}) as any as S.Schema<CheckDomainAvailabilityRequest>;
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
export const DomainAvailability = S.String;
export interface CheckDomainAvailabilityResponse {
  Availability?: DomainAvailability;
}
export const CheckDomainAvailabilityResponse = S.suspend(() =>
  S.Struct({ Availability: S.optional(DomainAvailability) }).pipe(ns),
).annotate({
  identifier: "CheckDomainAvailabilityResponse",
}) as any as S.Schema<CheckDomainAvailabilityResponse>;
export interface CheckDomainTransferabilityRequest {
  DomainName: string;
  AuthCode?: string | redacted.Redacted<string>;
}
export const CheckDomainTransferabilityRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    AuthCode: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckDomainTransferabilityRequest",
}) as any as S.Schema<CheckDomainTransferabilityRequest>;
export type Transferable =
  | "TRANSFERABLE"
  | "UNTRANSFERABLE"
  | "DONT_KNOW"
  | "DOMAIN_IN_OWN_ACCOUNT"
  | "DOMAIN_IN_ANOTHER_ACCOUNT"
  | "PREMIUM_DOMAIN"
  | (string & {});
export const Transferable = S.String;
export interface DomainTransferability {
  Transferable?: Transferable;
}
export const DomainTransferability = S.suspend(() =>
  S.Struct({ Transferable: S.optional(Transferable) }),
).annotate({
  identifier: "DomainTransferability",
}) as any as S.Schema<DomainTransferability>;
export interface CheckDomainTransferabilityResponse {
  Transferability?: DomainTransferability;
  Message?: string;
}
export const CheckDomainTransferabilityResponse = S.suspend(() =>
  S.Struct({
    Transferability: S.optional(DomainTransferability),
    Message: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CheckDomainTransferabilityResponse",
}) as any as S.Schema<CheckDomainTransferabilityResponse>;
export interface DeleteDomainRequest {
  DomainName: string;
}
export const DeleteDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {
  OperationId?: string;
}
export const DeleteDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface DeleteTagsForDomainRequest {
  DomainName: string;
  TagsToDelete: string[];
}
export const DeleteTagsForDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, TagsToDelete: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTagsForDomainRequest",
}) as any as S.Schema<DeleteTagsForDomainRequest>;
export interface DeleteTagsForDomainResponse {}
export const DeleteTagsForDomainResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTagsForDomainResponse",
}) as any as S.Schema<DeleteTagsForDomainResponse>;
export interface DisableDomainAutoRenewRequest {
  DomainName: string;
}
export const DisableDomainAutoRenewRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableDomainAutoRenewRequest",
}) as any as S.Schema<DisableDomainAutoRenewRequest>;
export interface DisableDomainAutoRenewResponse {}
export const DisableDomainAutoRenewResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableDomainAutoRenewResponse",
}) as any as S.Schema<DisableDomainAutoRenewResponse>;
export interface DisableDomainTransferLockRequest {
  DomainName: string;
}
export const DisableDomainTransferLockRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableDomainTransferLockRequest",
}) as any as S.Schema<DisableDomainTransferLockRequest>;
export interface DisableDomainTransferLockResponse {
  OperationId?: string;
}
export const DisableDomainTransferLockResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DisableDomainTransferLockResponse",
}) as any as S.Schema<DisableDomainTransferLockResponse>;
export interface DisassociateDelegationSignerFromDomainRequest {
  DomainName: string;
  Id: string;
}
export const DisassociateDelegationSignerFromDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Id: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateDelegationSignerFromDomainRequest",
}) as any as S.Schema<DisassociateDelegationSignerFromDomainRequest>;
export interface DisassociateDelegationSignerFromDomainResponse {
  OperationId?: string;
}
export const DisassociateDelegationSignerFromDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DisassociateDelegationSignerFromDomainResponse",
}) as any as S.Schema<DisassociateDelegationSignerFromDomainResponse>;
export interface EnableDomainAutoRenewRequest {
  DomainName: string;
}
export const EnableDomainAutoRenewRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableDomainAutoRenewRequest",
}) as any as S.Schema<EnableDomainAutoRenewRequest>;
export interface EnableDomainAutoRenewResponse {}
export const EnableDomainAutoRenewResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "EnableDomainAutoRenewResponse",
}) as any as S.Schema<EnableDomainAutoRenewResponse>;
export interface EnableDomainTransferLockRequest {
  DomainName: string;
}
export const EnableDomainTransferLockRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableDomainTransferLockRequest",
}) as any as S.Schema<EnableDomainTransferLockRequest>;
export interface EnableDomainTransferLockResponse {
  OperationId?: string;
}
export const EnableDomainTransferLockResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "EnableDomainTransferLockResponse",
}) as any as S.Schema<EnableDomainTransferLockResponse>;
export interface GetContactReachabilityStatusRequest {
  domainName?: string;
}
export const GetContactReachabilityStatusRequest = S.suspend(() =>
  S.Struct({ domainName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContactReachabilityStatusRequest",
}) as any as S.Schema<GetContactReachabilityStatusRequest>;
export type ReachabilityStatus = "PENDING" | "DONE" | "EXPIRED" | (string & {});
export const ReachabilityStatus = S.String;
export interface GetContactReachabilityStatusResponse {
  domainName?: string;
  status?: ReachabilityStatus;
}
export const GetContactReachabilityStatusResponse = S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    status: S.optional(ReachabilityStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetContactReachabilityStatusResponse",
}) as any as S.Schema<GetContactReachabilityStatusResponse>;
export interface GetDomainDetailRequest {
  DomainName: string;
}
export const GetDomainDetailRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainDetailRequest",
}) as any as S.Schema<GetDomainDetailRequest>;
export type GlueIpList = string[];
export const GlueIpList = S.Array(S.String);
export interface Nameserver {
  Name: string;
  GlueIps?: string[];
}
export const Nameserver = S.suspend(() =>
  S.Struct({ Name: S.String, GlueIps: S.optional(GlueIpList) }),
).annotate({ identifier: "Nameserver" }) as any as S.Schema<Nameserver>;
export type NameserverList = Nameserver[];
export const NameserverList = S.Array(Nameserver);
export type ContactType =
  | "PERSON"
  | "COMPANY"
  | "ASSOCIATION"
  | "PUBLIC_BODY"
  | "RESELLER"
  | (string & {});
export const ContactType = S.String;
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
export const CountryCode = S.String;
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
export const ExtraParamName = S.String;
export interface ExtraParam {
  Name: ExtraParamName;
  Value: string | redacted.Redacted<string>;
}
export const ExtraParam = S.suspend(() =>
  S.Struct({ Name: ExtraParamName, Value: SensitiveString }),
).annotate({ identifier: "ExtraParam" }) as any as S.Schema<ExtraParam>;
export type ExtraParamList = ExtraParam[];
export const ExtraParamList = S.Array(ExtraParam);
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
export const ContactDetail = S.suspend(() =>
  S.Struct({
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    ContactType: S.optional(ContactType),
    OrganizationName: S.optional(SensitiveString),
    AddressLine1: S.optional(SensitiveString),
    AddressLine2: S.optional(SensitiveString),
    City: S.optional(SensitiveString),
    State: S.optional(SensitiveString),
    CountryCode: S.optional(CountryCode),
    ZipCode: S.optional(SensitiveString),
    PhoneNumber: S.optional(SensitiveString),
    Email: S.optional(SensitiveString),
    Fax: S.optional(SensitiveString),
    ExtraParams: S.optional(ExtraParamList),
  }),
).annotate({ identifier: "ContactDetail" }) as any as S.Schema<ContactDetail>;
export type DomainStatusList = string[];
export const DomainStatusList = S.Array(S.String);
export interface DnssecKey {
  Algorithm?: number;
  Flags?: number;
  PublicKey?: string;
  DigestType?: number;
  Digest?: string;
  KeyTag?: number;
  Id?: string;
}
export const DnssecKey = S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(S.Number),
    Flags: S.optional(S.Number),
    PublicKey: S.optional(S.String),
    DigestType: S.optional(S.Number),
    Digest: S.optional(S.String),
    KeyTag: S.optional(S.Number),
    Id: S.optional(S.String),
  }),
).annotate({ identifier: "DnssecKey" }) as any as S.Schema<DnssecKey>;
export type DnssecKeyList = DnssecKey[];
export const DnssecKeyList = S.Array(DnssecKey);
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
export const GetDomainDetailResponse = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    Nameservers: S.optional(NameserverList),
    AutoRenew: S.optional(S.Boolean),
    AdminContact: S.optional(ContactDetail),
    RegistrantContact: S.optional(ContactDetail),
    TechContact: S.optional(ContactDetail),
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
    StatusList: S.optional(DomainStatusList),
    DnssecKeys: S.optional(DnssecKeyList),
    BillingContact: S.optional(ContactDetail),
    BillingPrivacy: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "GetDomainDetailResponse",
}) as any as S.Schema<GetDomainDetailResponse>;
export interface GetDomainSuggestionsRequest {
  DomainName: string;
  SuggestionCount: number;
  OnlyAvailable: boolean;
}
export const GetDomainSuggestionsRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    SuggestionCount: S.Number,
    OnlyAvailable: S.Boolean,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainSuggestionsRequest",
}) as any as S.Schema<GetDomainSuggestionsRequest>;
export interface DomainSuggestion {
  DomainName?: string;
  Availability?: string;
}
export const DomainSuggestion = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    Availability: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainSuggestion",
}) as any as S.Schema<DomainSuggestion>;
export type DomainSuggestionsList = DomainSuggestion[];
export const DomainSuggestionsList = S.Array(DomainSuggestion);
export interface GetDomainSuggestionsResponse {
  SuggestionsList?: DomainSuggestion[];
}
export const GetDomainSuggestionsResponse = S.suspend(() =>
  S.Struct({ SuggestionsList: S.optional(DomainSuggestionsList) }).pipe(ns),
).annotate({
  identifier: "GetDomainSuggestionsResponse",
}) as any as S.Schema<GetDomainSuggestionsResponse>;
export interface GetOperationDetailRequest {
  OperationId: string;
}
export const GetOperationDetailRequest = S.suspend(() =>
  S.Struct({ OperationId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOperationDetailRequest",
}) as any as S.Schema<GetOperationDetailRequest>;
export type OperationStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "ERROR"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export const OperationStatus = S.String;
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
export const OperationType = S.String;
export type StatusFlag =
  | "PENDING_ACCEPTANCE"
  | "PENDING_CUSTOMER_ACTION"
  | "PENDING_AUTHORIZATION"
  | "PENDING_PAYMENT_VERIFICATION"
  | "PENDING_SUPPORT_CASE"
  | (string & {});
export const StatusFlag = S.String;
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
export const GetOperationDetailResponse = S.suspend(() =>
  S.Struct({
    OperationId: S.optional(S.String),
    Status: S.optional(OperationStatus),
    Message: S.optional(S.String),
    DomainName: S.optional(S.String),
    Type: S.optional(OperationType),
    SubmittedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StatusFlag: S.optional(StatusFlag),
  }).pipe(ns),
).annotate({
  identifier: "GetOperationDetailResponse",
}) as any as S.Schema<GetOperationDetailResponse>;
export type ListDomainsAttributeName = "DomainName" | "Expiry" | (string & {});
export const ListDomainsAttributeName = S.String;
export type Operator = "LE" | "GE" | "BEGINS_WITH" | (string & {});
export const Operator = S.String;
export type Values = string[];
export const Values = S.Array(S.String);
export interface FilterCondition {
  Name: ListDomainsAttributeName;
  Operator: Operator;
  Values: string[];
}
export const FilterCondition = S.suspend(() =>
  S.Struct({
    Name: ListDomainsAttributeName,
    Operator: Operator,
    Values: Values,
  }),
).annotate({
  identifier: "FilterCondition",
}) as any as S.Schema<FilterCondition>;
export type FilterConditions = FilterCondition[];
export const FilterConditions = S.Array(FilterCondition);
export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = S.String;
export interface SortCondition {
  Name: ListDomainsAttributeName;
  SortOrder: SortOrder;
}
export const SortCondition = S.suspend(() =>
  S.Struct({ Name: ListDomainsAttributeName, SortOrder: SortOrder }),
).annotate({ identifier: "SortCondition" }) as any as S.Schema<SortCondition>;
export interface ListDomainsRequest {
  FilterConditions?: FilterCondition[];
  SortCondition?: SortCondition;
  Marker?: string;
  MaxItems?: number;
}
export const ListDomainsRequest = S.suspend(() =>
  S.Struct({
    FilterConditions: S.optional(FilterConditions),
    SortCondition: S.optional(SortCondition),
    Marker: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsRequest",
}) as any as S.Schema<ListDomainsRequest>;
export interface DomainSummary {
  DomainName?: string;
  AutoRenew?: boolean;
  TransferLock?: boolean;
  Expiry?: Date;
}
export const DomainSummary = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    AutoRenew: S.optional(S.Boolean),
    TransferLock: S.optional(S.Boolean),
    Expiry: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaryList = DomainSummary[];
export const DomainSummaryList = S.Array(DomainSummary);
export interface ListDomainsResponse {
  Domains?: DomainSummary[];
  NextPageMarker?: string;
}
export const ListDomainsResponse = S.suspend(() =>
  S.Struct({
    Domains: S.optional(DomainSummaryList),
    NextPageMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainsResponse",
}) as any as S.Schema<ListDomainsResponse>;
export type OperationStatusList = OperationStatus[];
export const OperationStatusList = S.Array(OperationStatus);
export type OperationTypeList = OperationType[];
export const OperationTypeList = S.Array(OperationType);
export type ListOperationsSortAttributeName = "SubmittedDate" | (string & {});
export const ListOperationsSortAttributeName = S.String;
export interface ListOperationsRequest {
  SubmittedSince?: Date;
  Marker?: string;
  MaxItems?: number;
  Status?: OperationStatus[];
  Type?: OperationType[];
  SortBy?: ListOperationsSortAttributeName;
  SortOrder?: SortOrder;
}
export const ListOperationsRequest = S.suspend(() =>
  S.Struct({
    SubmittedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Marker: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    Status: S.optional(OperationStatusList),
    Type: S.optional(OperationTypeList),
    SortBy: S.optional(ListOperationsSortAttributeName),
    SortOrder: S.optional(SortOrder),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOperationsRequest",
}) as any as S.Schema<ListOperationsRequest>;
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
export const OperationSummary = S.suspend(() =>
  S.Struct({
    OperationId: S.optional(S.String),
    Status: S.optional(OperationStatus),
    Type: S.optional(OperationType),
    SubmittedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DomainName: S.optional(S.String),
    Message: S.optional(S.String),
    StatusFlag: S.optional(StatusFlag),
    LastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "OperationSummary",
}) as any as S.Schema<OperationSummary>;
export type OperationSummaryList = OperationSummary[];
export const OperationSummaryList = S.Array(OperationSummary);
export interface ListOperationsResponse {
  Operations?: OperationSummary[];
  NextPageMarker?: string;
}
export const ListOperationsResponse = S.suspend(() =>
  S.Struct({
    Operations: S.optional(OperationSummaryList),
    NextPageMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOperationsResponse",
}) as any as S.Schema<ListOperationsResponse>;
export interface ListPricesRequest {
  Tld?: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListPricesRequest = S.suspend(() =>
  S.Struct({
    Tld: S.optional(S.String),
    Marker: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricesRequest",
}) as any as S.Schema<ListPricesRequest>;
export interface PriceWithCurrency {
  Price: number;
  Currency: string;
}
export const PriceWithCurrency = S.suspend(() =>
  S.Struct({ Price: S.Number, Currency: S.String }),
).annotate({
  identifier: "PriceWithCurrency",
}) as any as S.Schema<PriceWithCurrency>;
export interface DomainPrice {
  Name?: string;
  RegistrationPrice?: PriceWithCurrency;
  TransferPrice?: PriceWithCurrency;
  RenewalPrice?: PriceWithCurrency;
  ChangeOwnershipPrice?: PriceWithCurrency;
  RestorationPrice?: PriceWithCurrency;
}
export const DomainPrice = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    RegistrationPrice: S.optional(PriceWithCurrency),
    TransferPrice: S.optional(PriceWithCurrency),
    RenewalPrice: S.optional(PriceWithCurrency),
    ChangeOwnershipPrice: S.optional(PriceWithCurrency),
    RestorationPrice: S.optional(PriceWithCurrency),
  }),
).annotate({ identifier: "DomainPrice" }) as any as S.Schema<DomainPrice>;
export type DomainPriceList = DomainPrice[];
export const DomainPriceList = S.Array(DomainPrice);
export interface ListPricesResponse {
  Prices?: DomainPrice[];
  NextPageMarker?: string;
}
export const ListPricesResponse = S.suspend(() =>
  S.Struct({
    Prices: S.optional(DomainPriceList),
    NextPageMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPricesResponse",
}) as any as S.Schema<ListPricesResponse>;
export interface ListTagsForDomainRequest {
  DomainName: string;
}
export const ListTagsForDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForDomainRequest",
}) as any as S.Schema<ListTagsForDomainRequest>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface ListTagsForDomainResponse {
  TagList?: Tag[];
}
export const ListTagsForDomainResponse = S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForDomainResponse",
}) as any as S.Schema<ListTagsForDomainResponse>;
export interface PushDomainRequest {
  DomainName: string;
  Target: string;
}
export const PushDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Target: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PushDomainRequest",
}) as any as S.Schema<PushDomainRequest>;
export interface PushDomainResponse {}
export const PushDomainResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PushDomainResponse",
}) as any as S.Schema<PushDomainResponse>;
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
export const RegisterDomainRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    IdnLangCode: S.optional(S.String),
    DurationInYears: S.Number,
    AutoRenew: S.optional(S.Boolean),
    AdminContact: ContactDetail,
    RegistrantContact: ContactDetail,
    TechContact: ContactDetail,
    PrivacyProtectAdminContact: S.optional(S.Boolean),
    PrivacyProtectRegistrantContact: S.optional(S.Boolean),
    PrivacyProtectTechContact: S.optional(S.Boolean),
    BillingContact: S.optional(ContactDetail),
    PrivacyProtectBillingContact: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterDomainRequest",
}) as any as S.Schema<RegisterDomainRequest>;
export interface RegisterDomainResponse {
  OperationId?: string;
}
export const RegisterDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterDomainResponse",
}) as any as S.Schema<RegisterDomainResponse>;
export interface RejectDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string;
}
export const RejectDomainTransferFromAnotherAwsAccountRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectDomainTransferFromAnotherAwsAccountRequest",
}) as any as S.Schema<RejectDomainTransferFromAnotherAwsAccountRequest>;
export interface RejectDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string;
}
export const RejectDomainTransferFromAnotherAwsAccountResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RejectDomainTransferFromAnotherAwsAccountResponse",
}) as any as S.Schema<RejectDomainTransferFromAnotherAwsAccountResponse>;
export interface RenewDomainRequest {
  DomainName: string;
  DurationInYears?: number;
  CurrentExpiryYear: number;
}
export const RenewDomainRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    DurationInYears: S.optional(S.Number),
    CurrentExpiryYear: S.Number,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RenewDomainRequest",
}) as any as S.Schema<RenewDomainRequest>;
export interface RenewDomainResponse {
  OperationId?: string;
}
export const RenewDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RenewDomainResponse",
}) as any as S.Schema<RenewDomainResponse>;
export interface ResendContactReachabilityEmailRequest {
  domainName?: string;
}
export const ResendContactReachabilityEmailRequest = S.suspend(() =>
  S.Struct({ domainName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResendContactReachabilityEmailRequest",
}) as any as S.Schema<ResendContactReachabilityEmailRequest>;
export interface ResendContactReachabilityEmailResponse {
  domainName?: string;
  emailAddress?: string | redacted.Redacted<string>;
  isAlreadyVerified?: boolean;
}
export const ResendContactReachabilityEmailResponse = S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    emailAddress: S.optional(SensitiveString),
    isAlreadyVerified: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "ResendContactReachabilityEmailResponse",
}) as any as S.Schema<ResendContactReachabilityEmailResponse>;
export interface ResendOperationAuthorizationRequest {
  OperationId: string;
}
export const ResendOperationAuthorizationRequest = S.suspend(() =>
  S.Struct({ OperationId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResendOperationAuthorizationRequest",
}) as any as S.Schema<ResendOperationAuthorizationRequest>;
export interface ResendOperationAuthorizationResponse {}
export const ResendOperationAuthorizationResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ResendOperationAuthorizationResponse",
}) as any as S.Schema<ResendOperationAuthorizationResponse>;
export interface RetrieveDomainAuthCodeRequest {
  DomainName: string;
}
export const RetrieveDomainAuthCodeRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveDomainAuthCodeRequest",
}) as any as S.Schema<RetrieveDomainAuthCodeRequest>;
export interface RetrieveDomainAuthCodeResponse {
  AuthCode?: string | redacted.Redacted<string>;
}
export const RetrieveDomainAuthCodeResponse = S.suspend(() =>
  S.Struct({ AuthCode: S.optional(SensitiveString) }).pipe(ns),
).annotate({
  identifier: "RetrieveDomainAuthCodeResponse",
}) as any as S.Schema<RetrieveDomainAuthCodeResponse>;
export interface TransferDomainRequest {
  DomainName: string;
  IdnLangCode?: string;
  DurationInYears: number;
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
export const TransferDomainRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    IdnLangCode: S.optional(S.String),
    DurationInYears: S.Number,
    Nameservers: S.optional(NameserverList),
    AuthCode: S.optional(SensitiveString),
    AutoRenew: S.optional(S.Boolean),
    AdminContact: ContactDetail,
    RegistrantContact: ContactDetail,
    TechContact: ContactDetail,
    PrivacyProtectAdminContact: S.optional(S.Boolean),
    PrivacyProtectRegistrantContact: S.optional(S.Boolean),
    PrivacyProtectTechContact: S.optional(S.Boolean),
    BillingContact: S.optional(ContactDetail),
    PrivacyProtectBillingContact: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TransferDomainRequest",
}) as any as S.Schema<TransferDomainRequest>;
export interface TransferDomainResponse {
  OperationId?: string;
}
export const TransferDomainResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "TransferDomainResponse",
}) as any as S.Schema<TransferDomainResponse>;
export interface TransferDomainToAnotherAwsAccountRequest {
  DomainName: string;
  AccountId: string;
}
export const TransferDomainToAnotherAwsAccountRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, AccountId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TransferDomainToAnotherAwsAccountRequest",
}) as any as S.Schema<TransferDomainToAnotherAwsAccountRequest>;
export interface TransferDomainToAnotherAwsAccountResponse {
  OperationId?: string;
  Password?: string | redacted.Redacted<string>;
}
export const TransferDomainToAnotherAwsAccountResponse = S.suspend(() =>
  S.Struct({
    OperationId: S.optional(S.String),
    Password: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "TransferDomainToAnotherAwsAccountResponse",
}) as any as S.Schema<TransferDomainToAnotherAwsAccountResponse>;
export interface Consent {
  MaxPrice: number;
  Currency: string;
}
export const Consent = S.suspend(() =>
  S.Struct({ MaxPrice: S.Number, Currency: S.String }),
).annotate({ identifier: "Consent" }) as any as S.Schema<Consent>;
export interface UpdateDomainContactRequest {
  DomainName: string;
  AdminContact?: ContactDetail;
  RegistrantContact?: ContactDetail;
  TechContact?: ContactDetail;
  Consent?: Consent;
  BillingContact?: ContactDetail;
}
export const UpdateDomainContactRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    AdminContact: S.optional(ContactDetail),
    RegistrantContact: S.optional(ContactDetail),
    TechContact: S.optional(ContactDetail),
    Consent: S.optional(Consent),
    BillingContact: S.optional(ContactDetail),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainContactRequest",
}) as any as S.Schema<UpdateDomainContactRequest>;
export interface UpdateDomainContactResponse {
  OperationId?: string;
}
export const UpdateDomainContactResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDomainContactResponse",
}) as any as S.Schema<UpdateDomainContactResponse>;
export interface UpdateDomainContactPrivacyRequest {
  DomainName: string;
  AdminPrivacy?: boolean;
  RegistrantPrivacy?: boolean;
  TechPrivacy?: boolean;
  BillingPrivacy?: boolean;
}
export const UpdateDomainContactPrivacyRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    AdminPrivacy: S.optional(S.Boolean),
    RegistrantPrivacy: S.optional(S.Boolean),
    TechPrivacy: S.optional(S.Boolean),
    BillingPrivacy: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainContactPrivacyRequest",
}) as any as S.Schema<UpdateDomainContactPrivacyRequest>;
export interface UpdateDomainContactPrivacyResponse {
  OperationId?: string;
}
export const UpdateDomainContactPrivacyResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDomainContactPrivacyResponse",
}) as any as S.Schema<UpdateDomainContactPrivacyResponse>;
export interface UpdateDomainNameserversRequest {
  DomainName: string;
  FIAuthKey?: string | redacted.Redacted<string>;
  Nameservers: Nameserver[];
}
export const UpdateDomainNameserversRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    FIAuthKey: S.optional(SensitiveString),
    Nameservers: NameserverList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainNameserversRequest",
}) as any as S.Schema<UpdateDomainNameserversRequest>;
export interface UpdateDomainNameserversResponse {
  OperationId?: string;
}
export const UpdateDomainNameserversResponse = S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDomainNameserversResponse",
}) as any as S.Schema<UpdateDomainNameserversResponse>;
export interface UpdateTagsForDomainRequest {
  DomainName: string;
  TagsToUpdate?: Tag[];
}
export const UpdateTagsForDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, TagsToUpdate: S.optional(TagList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTagsForDomainRequest",
}) as any as S.Schema<UpdateTagsForDomainRequest>;
export interface UpdateTagsForDomainResponse {}
export const UpdateTagsForDomainResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateTagsForDomainResponse",
}) as any as S.Schema<UpdateTagsForDomainResponse>;
export interface ViewBillingRequest {
  Start?: Date;
  End?: Date;
  Marker?: string;
  MaxItems?: number;
}
export const ViewBillingRequest = S.suspend(() =>
  S.Struct({
    Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Marker: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ViewBillingRequest",
}) as any as S.Schema<ViewBillingRequest>;
export interface BillingRecord {
  DomainName?: string;
  Operation?: OperationType;
  InvoiceId?: string;
  BillDate?: Date;
  Price?: number;
}
export const BillingRecord = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    Operation: S.optional(OperationType),
    InvoiceId: S.optional(S.String),
    BillDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Price: S.optional(S.Number),
  }),
).annotate({ identifier: "BillingRecord" }) as any as S.Schema<BillingRecord>;
export type BillingRecords = BillingRecord[];
export const BillingRecords = S.Array(BillingRecord);
export interface ViewBillingResponse {
  NextPageMarker?: string;
  BillingRecords?: BillingRecord[];
}
export const ViewBillingResponse = S.suspend(() =>
  S.Struct({
    NextPageMarker: S.optional(S.String),
    BillingRecords: S.optional(BillingRecords),
  }).pipe(ns),
).annotate({
  identifier: "ViewBillingResponse",
}) as any as S.Schema<ViewBillingResponse>;

//# Errors
export class DomainLimitExceeded extends S.TaggedErrorClass<DomainLimitExceeded>()(
  "DomainLimitExceeded",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class InvalidInput extends S.TaggedErrorClass<InvalidInput>()(
  "InvalidInput",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class OperationLimitExceeded extends S.TaggedErrorClass<OperationLimitExceeded>()(
  "OperationLimitExceeded",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class UnsupportedTLD extends S.TaggedErrorClass<UnsupportedTLD>()(
  "UnsupportedTLD",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class DnssecLimitExceeded extends S.TaggedErrorClass<DnssecLimitExceeded>()(
  "DnssecLimitExceeded",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class DuplicateRequest extends S.TaggedErrorClass<DuplicateRequest>()(
  "DuplicateRequest",
  { requestId: S.optional(S.String), message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TLDRulesViolation extends S.TaggedErrorClass<TLDRulesViolation>()(
  "TLDRulesViolation",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptDomainTransferFromAnotherAwsAccountRequest,
  output: AcceptDomainTransferFromAnotherAwsAccountResponse,
  errors: [
    DomainLimitExceeded,
    InvalidInput,
    OperationLimitExceeded,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateDelegationSignerToDomainRequest,
  output: AssociateDelegationSignerToDomainResponse,
  errors: [
    DnssecLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelDomainTransferToAnotherAwsAccountRequest,
  output: CancelDomainTransferToAnotherAwsAccountResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type CheckDomainAvailabilityError =
  | InvalidInput
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckDomainAvailabilityRequest,
  output: CheckDomainAvailabilityResponse,
  errors: [InvalidInput, UnsupportedTLD],
}));
export type CheckDomainTransferabilityError =
  | InvalidInput
  | UnsupportedTLD
  | CommonErrors;
/**
 * Checks whether a domain name can be transferred to Amazon Route 53.
 */
export const checkDomainTransferability: API.OperationMethod<
  CheckDomainTransferabilityRequest,
  CheckDomainTransferabilityResponse,
  CheckDomainTransferabilityError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckDomainTransferabilityRequest,
  output: CheckDomainTransferabilityResponse,
  errors: [InvalidInput, UnsupportedTLD],
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
 * that’s provided by the registrar to which you want to transfer the registration.
 * Otherwise, the following apply:
 *
 * - You can’t get a refund for the cost of a deleted domain registration.
 *
 * - The registry for the top-level domain might hold the domain name for a brief
 * time before releasing it for other users to register (varies by registry).
 *
 * - When the registration has been deleted, we'll send you a confirmation to the
 * registrant contact. The email will come from
 * `noreply@domainnameverification.net` or
 * `noreply@registrar.amazon.com`.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [DuplicateRequest, InvalidInput, TLDRulesViolation, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTagsForDomainRequest,
  output: DeleteTagsForDomainResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type DisableDomainAutoRenewError =
  | InvalidInput
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation disables automatic renewal of domain registration for the specified
 * domain.
 */
export const disableDomainAutoRenew: API.OperationMethod<
  DisableDomainAutoRenewRequest,
  DisableDomainAutoRenewResponse,
  DisableDomainAutoRenewError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableDomainAutoRenewRequest,
  output: DisableDomainAutoRenewResponse,
  errors: [InvalidInput, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableDomainTransferLockRequest,
  output: DisableDomainTransferLockResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateDelegationSignerFromDomainRequest,
  output: DisassociateDelegationSignerFromDomainResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableDomainAutoRenewRequest,
  output: EnableDomainAutoRenewResponse,
  errors: [InvalidInput, TLDRulesViolation, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableDomainTransferLockRequest,
  output: EnableDomainTransferLockResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetContactReachabilityStatusRequest,
  output: GetContactReachabilityStatusResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type GetDomainDetailError = InvalidInput | UnsupportedTLD | CommonErrors;
/**
 * This operation returns detailed information about a specified domain that is
 * associated with the current Amazon Web Services account. Contact information for the
 * domain is also returned as part of the output.
 */
export const getDomainDetail: API.OperationMethod<
  GetDomainDetailRequest,
  GetDomainDetailResponse,
  GetDomainDetailError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainDetailRequest,
  output: GetDomainDetailResponse,
  errors: [InvalidInput, UnsupportedTLD],
}));
export type GetDomainSuggestionsError =
  | InvalidInput
  | UnsupportedTLD
  | CommonErrors;
/**
 * The GetDomainSuggestions operation returns a list of suggested domain names.
 */
export const getDomainSuggestions: API.OperationMethod<
  GetDomainSuggestionsRequest,
  GetDomainSuggestionsResponse,
  GetDomainSuggestionsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainSuggestionsRequest,
  output: GetDomainSuggestionsResponse,
  errors: [InvalidInput, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationDetailRequest,
  output: GetOperationDetailResponse,
  errors: [InvalidInput],
}));
export type ListDomainsError = InvalidInput | CommonErrors;
/**
 * This operation returns all the domain names registered with Amazon Route 53 for the
 * current Amazon Web Services account if no filtering conditions are used.
 */
export const listDomains: API.OperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDomainsRequest,
  ) => stream.Stream<
    ListDomainsResponse,
    ListDomainsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDomainsRequest,
  ) => stream.Stream<
    DomainSummary,
    ListDomainsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [InvalidInput],
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Domains",
    pageSize: "MaxItems",
  } as const,
}));
export type ListOperationsError = InvalidInput | CommonErrors;
/**
 * Returns information about all of the operations that return an operation ID and that
 * have ever been performed on domains that were registered by the current account.
 *
 * This command runs only in the us-east-1 Region.
 */
export const listOperations: API.OperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOperationsRequest,
  ) => stream.Stream<
    ListOperationsResponse,
    ListOperationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOperationsRequest,
  ) => stream.Stream<
    OperationSummary,
    ListOperationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [InvalidInput],
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Operations",
    pageSize: "MaxItems",
  } as const,
}));
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
export const listPrices: API.OperationMethod<
  ListPricesRequest,
  ListPricesResponse,
  ListPricesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPricesRequest,
  ) => stream.Stream<
    ListPricesResponse,
    ListPricesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPricesRequest,
  ) => stream.Stream<
    DomainPrice,
    ListPricesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPricesRequest,
  output: ListPricesResponse,
  errors: [InvalidInput, UnsupportedTLD],
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "Prices",
    pageSize: "MaxItems",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForDomainRequest,
  output: ListTagsForDomainResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type PushDomainError =
  | InvalidInput
  | OperationLimitExceeded
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PushDomainRequest,
  output: PushDomainResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterDomainRequest,
  output: RegisterDomainResponse,
  errors: [
    DomainLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RejectDomainTransferFromAnotherAwsAccountRequest,
  output: RejectDomainTransferFromAnotherAwsAccountResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type RenewDomainError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RenewDomainRequest,
  output: RenewDomainResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
}));
export type ResendContactReachabilityEmailError =
  | InvalidInput
  | OperationLimitExceeded
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResendContactReachabilityEmailRequest,
  output: ResendContactReachabilityEmailResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type ResendOperationAuthorizationError = InvalidInput | CommonErrors;
/**
 * Resend the form of authorization email for this operation.
 */
export const resendOperationAuthorization: API.OperationMethod<
  ResendOperationAuthorizationRequest,
  ResendOperationAuthorizationResponse,
  ResendOperationAuthorizationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResendOperationAuthorizationRequest,
  output: ResendOperationAuthorizationResponse,
  errors: [InvalidInput],
}));
export type RetrieveDomainAuthCodeError =
  | InvalidInput
  | UnsupportedTLD
  | CommonErrors;
/**
 * This operation returns the authorization code for the domain. To transfer a domain to
 * another registrar, you provide this value to the new registrar.
 */
export const retrieveDomainAuthCode: API.OperationMethod<
  RetrieveDomainAuthCodeRequest,
  RetrieveDomainAuthCodeResponse,
  RetrieveDomainAuthCodeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetrieveDomainAuthCodeRequest,
  output: RetrieveDomainAuthCodeResponse,
  errors: [InvalidInput, UnsupportedTLD],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TransferDomainRequest,
  output: TransferDomainResponse,
  errors: [
    DomainLimitExceeded,
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TransferDomainToAnotherAwsAccountRequest,
  output: TransferDomainToAnotherAwsAccountResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDomainContactRequest,
  output: UpdateDomainContactResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDomainContactPrivacyRequest,
  output: UpdateDomainContactPrivacyResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
}));
export type UpdateDomainNameserversError =
  | DuplicateRequest
  | InvalidInput
  | OperationLimitExceeded
  | TLDRulesViolation
  | UnsupportedTLD
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDomainNameserversRequest,
  output: UpdateDomainNameserversResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    OperationLimitExceeded,
    TLDRulesViolation,
    UnsupportedTLD,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTagsForDomainRequest,
  output: UpdateTagsForDomainResponse,
  errors: [InvalidInput, OperationLimitExceeded, UnsupportedTLD],
}));
export type ViewBillingError = InvalidInput | CommonErrors;
/**
 * Returns all the domain-related billing records for the current Amazon Web Services account for a specified period
 */
export const viewBilling: API.OperationMethod<
  ViewBillingRequest,
  ViewBillingResponse,
  ViewBillingError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ViewBillingRequest,
  ) => stream.Stream<
    ViewBillingResponse,
    ViewBillingError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ViewBillingRequest,
  ) => stream.Stream<
    BillingRecord,
    ViewBillingError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ViewBillingRequest,
  output: ViewBillingResponse,
  errors: [InvalidInput],
  pagination: {
    inputToken: "Marker",
    outputToken: "NextPageMarker",
    items: "BillingRecords",
    pageSize: "MaxItems",
  } as const,
}));
