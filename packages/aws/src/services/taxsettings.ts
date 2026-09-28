import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "TaxSettings",
  target: "TaxSettings",
  version: "2018-05-10",
  sigv4: "tax",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
                `https://tax-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://tax-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://tax.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://tax.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(PartitionResult),
            {},
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
  })<{ readonly message: string | redacted.Redacted<string> }> {}
export class AttachmentUploadException
  extends /*@__PURE__*/ TE.TaggedError(
    "AttachmentUploadException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class CaseCreationLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CaseCreationLimitExceededException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string | redacted.Redacted<string>;
    readonly errorCode: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly message: string | redacted.Redacted<string>;
    readonly errorCode: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string | redacted.Redacted<string>;
    readonly errorCode: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string | redacted.Redacted<string>;
    readonly errorCode: ValidationExceptionErrorCode;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type AccountId = string;
export type AccountIds = string[];
export interface BatchDeleteTaxRegistrationRequest {
  accountIds: string[];
}
export type ErrorMessage = string | redacted.Redacted<string>;
export type ErrorCode = string;
export interface BatchDeleteTaxRegistrationError_ {
  accountId: string;
  message: string | redacted.Redacted<string>;
  code?: string;
}
export type BatchDeleteTaxRegistrationErrors =
  BatchDeleteTaxRegistrationError_[];
export interface BatchDeleteTaxRegistrationResponse {
  errors: BatchDeleteTaxRegistrationError_[];
}
export interface BatchGetTaxExemptionsRequest {
  accountIds: string[];
}
export type CountryCode = string;
export type State = string;
export interface Authority {
  country: string;
  state?: string;
}
export type DisplayName = string;
export type Authorities = Authority[];
export interface TaxExemptionType {
  displayName?: string;
  description?: string;
  applicableJurisdictions?: Authority[];
}
export type EntityExemptionAccountStatus =
  | "None"
  | "Valid"
  | "Expired"
  | "Pending"
  | (string & {});
export interface TaxExemption {
  authority: Authority;
  taxExemptionType: TaxExemptionType;
  effectiveDate?: Date;
  expirationDate?: Date;
  systemEffectiveDate?: Date;
  status?: EntityExemptionAccountStatus;
}
export type TaxExemptions = TaxExemption[];
export interface TaxExemptionDetails {
  taxExemptions?: TaxExemption[];
  heritageObtainedDetails?: boolean;
  heritageObtainedParentEntity?: string;
  heritageObtainedReason?: string;
}
export type TaxExemptionDetailsMap = {
  [key: string]: TaxExemptionDetails | undefined;
};
export interface BatchGetTaxExemptionsResponse {
  taxExemptionDetailsMap?: { [key: string]: TaxExemptionDetails | undefined };
  failedAccounts?: string[];
}
export type RegistrationId = string;
export type TaxRegistrationType =
  | "VAT"
  | "GST"
  | "CPF"
  | "CNPJ"
  | "SST"
  | "TIN"
  | "NRIC"
  | "PAN"
  | "NIP"
  | (string & {});
export type LegalName = string;
export type AddressLine1 = string;
export type AddressLine2 = string;
export type AddressLine3 = string;
export type District = string;
export type City = string;
export type PostalCode = string;
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  districtOrCounty?: string;
  city?: string;
  stateOrRegion?: string;
  postalCode: string;
  countryCode: string;
}
export type Sector = "Business" | "Individual" | "Government" | (string & {});
export type MalaysiaServiceTaxCode =
  | "Consultancy"
  | "Digital Service And Electronic Medium"
  | "IT Services"
  | "Training Or Coaching"
  | (string & {});
export type MalaysiaServiceTaxCodesList = MalaysiaServiceTaxCode[];
export type TaxInformationNumber = string;
export type BusinessRegistrationNumber = string;
export interface MalaysiaAdditionalInfo {
  serviceTaxCodes?: MalaysiaServiceTaxCode[];
  taxInformationNumber?: string;
  businessRegistrationNumber?: string;
}
export type IsraelDealerType = "Authorized" | "Non-authorized" | (string & {});
export type IsraelCustomerType = "Business" | "Individual" | (string & {});
export interface IsraelAdditionalInfo {
  dealerType: IsraelDealerType;
  customerType: IsraelCustomerType;
}
export type RegistryCommercialCode = string;
export interface EstoniaAdditionalInfo {
  registryCommercialCode: string;
}
export type CanadaProvincialSalesTaxIdString = string;
export type CanadaQuebecSalesTaxNumberString = string;
export type CanadaRetailSalesTaxNumberString = string;
export interface CanadaAdditionalInfo {
  provincialSalesTaxId?: string;
  canadaQuebecSalesTaxNumber?: string;
  canadaRetailSalesTaxNumber?: string;
  isResellerAccount?: boolean;
}
export type RegistrationType = "Intra-EU" | "Local" | (string & {});
export interface SpainAdditionalInfo {
  registrationType: RegistrationType;
}
export type PersonType =
  | "Legal Person"
  | "Physical Person"
  | "Business"
  | (string & {});
export interface KenyaAdditionalInfo {
  personType: PersonType;
}
export type BusinessRepresentativeName = string;
export type LineOfBusiness = string;
export type ItemOfBusiness = string;
export interface SouthKoreaAdditionalInfo {
  businessRepresentativeName: string;
  lineOfBusiness: string;
  itemOfBusiness: string;
}
export type TaxOffice = string;
export type KepEmailId = string;
export type SecondaryTaxId = string;
export type Industries =
  | "CirculatingOrg"
  | "ProfessionalOrg"
  | "Banks"
  | "Insurance"
  | "PensionAndBenefitFunds"
  | "DevelopmentAgencies"
  | (string & {});
export interface TurkeyAdditionalInfo {
  taxOffice?: string;
  kepEmailId?: string;
  secondaryTaxId?: string;
  industries?: Industries;
}
export interface GeorgiaAdditionalInfo {
  personType: PersonType;
}
export type SdiAccountId = string;
export type CigNumber = string;
export type CupNumber = string;
export type TaxCode = string;
export type CustomerType = "Business" | "Individual" | (string & {});
export interface ItalyAdditionalInfo {
  sdiAccountId?: string;
  cigNumber?: string;
  cupNumber?: string;
  taxCode?: string;
  customerType?: CustomerType;
}
export type TaxRegistrationNumberType =
  | "TaxRegistrationNumber"
  | "LocalRegistrationNumber"
  | (string & {});
export interface RomaniaAdditionalInfo {
  taxRegistrationNumberType: TaxRegistrationNumberType;
}
export type UkraineTrnType = "Business" | "Individual" | (string & {});
export interface UkraineAdditionalInfo {
  ukraineTrnType: UkraineTrnType;
}
export type IndividualRegistrationNumber = string;
export type PolandTaxRegistrationNumberType =
  | "EUTaxRegistrationNumber"
  | "LocalTaxRegistrationNumber"
  | "LocalRegistrationNumber"
  | (string & {});
export interface PolandAdditionalInfo {
  individualRegistrationNumber?: string;
  isGroupVatEnabled?: boolean;
  taxRegistrationNumberType?: PolandTaxRegistrationNumberType;
}
export type SaudiArabiaTaxRegistrationNumberType =
  | "TaxRegistrationNumber"
  | "TaxIdentificationNumber"
  | "CommercialRegistrationNumber"
  | (string & {});
export interface SaudiArabiaAdditionalInfo {
  taxRegistrationNumberType?: SaudiArabiaTaxRegistrationNumberType;
}
export type IndonesiaTaxRegistrationNumberType =
  | "NIK"
  | "PassportNumber"
  | "NPWP"
  | "NITKU"
  | (string & {});
export type PpnExceptionDesignationCode = string;
export type DecisionNumber = string;
export interface IndonesiaAdditionalInfo {
  taxRegistrationNumberType?: IndonesiaTaxRegistrationNumberType;
  ppnExceptionDesignationCode?: string;
  decisionNumber?: string;
}
export type EnterpriseIdentificationNumber = string;
export type ElectronicTransactionCodeNumber = string;
export type PaymentVoucherNumber = string;
export type DateString = string;
export interface VietnamAdditionalInfo {
  enterpriseIdentificationNumber?: string;
  electronicTransactionCodeNumber?: string;
  paymentVoucherNumber?: string;
  paymentVoucherNumberDate?: string;
}
export type UniqueIdentificationNumber = string;
export interface EgyptAdditionalInfo {
  uniqueIdentificationNumber?: string;
  uniqueIdentificationNumberExpirationDate?: string;
}
export type ContractingAuthorityCode = string;
export interface GreeceAdditionalInfo {
  contractingAuthorityCode?: string;
}
export type UzbekistanTaxRegistrationNumberType =
  | "Business"
  | "Individual"
  | (string & {});
export type VatRegistrationNumber = string;
export interface UzbekistanAdditionalInfo {
  taxRegistrationNumberType?: UzbekistanTaxRegistrationNumberType;
  vatRegistrationNumber?: string;
}
export interface PhilippinesAdditionalInfo {
  isVatRegistered?: boolean;
}
export type PeppolId = string;
export interface BelgiumAdditionalInfo {
  peppolId?: string;
  isMercuriusBoxEnabled?: boolean;
}
export type ChileDocumentType = "Invoice" | "Receipt" | (string & {});
export interface ChileAdditionalInfo {
  documentType?: ChileDocumentType;
  businessActivity?: string;
}
export type SirenNumber = string;
export interface FranceAdditionalInfo {
  sirenNumber: string;
}
export interface AdditionalInfoRequest {
  malaysiaAdditionalInfo?: MalaysiaAdditionalInfo;
  israelAdditionalInfo?: IsraelAdditionalInfo;
  estoniaAdditionalInfo?: EstoniaAdditionalInfo;
  canadaAdditionalInfo?: CanadaAdditionalInfo;
  spainAdditionalInfo?: SpainAdditionalInfo;
  kenyaAdditionalInfo?: KenyaAdditionalInfo;
  southKoreaAdditionalInfo?: SouthKoreaAdditionalInfo;
  turkeyAdditionalInfo?: TurkeyAdditionalInfo;
  georgiaAdditionalInfo?: GeorgiaAdditionalInfo;
  italyAdditionalInfo?: ItalyAdditionalInfo;
  romaniaAdditionalInfo?: RomaniaAdditionalInfo;
  ukraineAdditionalInfo?: UkraineAdditionalInfo;
  polandAdditionalInfo?: PolandAdditionalInfo;
  saudiArabiaAdditionalInfo?: SaudiArabiaAdditionalInfo;
  indonesiaAdditionalInfo?: IndonesiaAdditionalInfo;
  vietnamAdditionalInfo?: VietnamAdditionalInfo;
  egyptAdditionalInfo?: EgyptAdditionalInfo;
  greeceAdditionalInfo?: GreeceAdditionalInfo;
  uzbekistanAdditionalInfo?: UzbekistanAdditionalInfo;
  philippinesAdditionalInfo?: PhilippinesAdditionalInfo;
  belgiumAdditionalInfo?: BelgiumAdditionalInfo;
  chileAdditionalInfo?: ChileAdditionalInfo;
  franceAdditionalInfo?: FranceAdditionalInfo;
}
export type DateOfBirth = string;
export type S3BucketName = string;
export type S3Key = string;
export interface SourceS3Location {
  bucket: string;
  key: string;
}
export type TaxDocumentName = string;
export type FileBlob = Uint8Array;
export interface TaxRegistrationDocFile {
  fileName: string;
  fileContent: Uint8Array;
}
export interface TaxRegistrationDocument {
  s3Location?: SourceS3Location;
  file?: TaxRegistrationDocFile;
}
export type TaxRegistrationDocuments = TaxRegistrationDocument[];
export interface VerificationDetails {
  dateOfBirth?: string;
  taxRegistrationDocuments?: TaxRegistrationDocument[];
}
export type CertifiedEmailId = string;
export interface TaxRegistrationEntry {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName?: string;
  legalAddress?: Address;
  sector?: Sector;
  additionalTaxInformation?: AdditionalInfoRequest;
  verificationDetails?: VerificationDetails;
  certifiedEmailId?: string;
}
export interface BatchPutTaxRegistrationRequest {
  accountIds: string[];
  taxRegistrationEntry: TaxRegistrationEntry;
}
export type TaxRegistrationStatus =
  | "Verified"
  | "Pending"
  | "Deleted"
  | "Rejected"
  | (string & {});
export interface BatchPutTaxRegistrationError_ {
  accountId: string;
  message: string | redacted.Redacted<string>;
  code?: string;
}
export type BatchPutTaxRegistrationErrors = BatchPutTaxRegistrationError_[];
export interface BatchPutTaxRegistrationResponse {
  status?: TaxRegistrationStatus;
  errors: BatchPutTaxRegistrationError_[];
}
export interface DeleteSupplementalTaxRegistrationRequest {
  authorityId: string;
}
export interface DeleteSupplementalTaxRegistrationResponse {}
export interface DeleteTaxRegistrationRequest {
  accountId?: string;
}
export interface DeleteTaxRegistrationResponse {}
export interface GetTaxExemptionTypesRequest {}
export type TaxExemptionTypes = TaxExemptionType[];
export interface GetTaxExemptionTypesResponse {
  taxExemptionTypes?: TaxExemptionType[];
}
export interface GetTaxInheritanceRequest {}
export type HeritageStatus = "OptIn" | "OptOut" | (string & {});
export interface GetTaxInheritanceResponse {
  heritageStatus?: HeritageStatus;
}
export interface GetTaxRegistrationRequest {
  accountId?: string;
}
export type TaxDocumentAccessToken = string;
export interface TaxDocumentMetadata {
  taxDocumentAccessToken: string;
  taxDocumentName: string;
}
export type TaxDocumentMetadatas = TaxDocumentMetadata[];
export type CcmCode = string;
export type LegalNatureCode = string;
export interface BrazilAdditionalInfo {
  ccmCode?: string;
  legalNatureCode?: string;
}
export type Pan = string;
export interface IndiaAdditionalInfo {
  pan?: string;
}
export interface AdditionalInfoResponse {
  malaysiaAdditionalInfo?: MalaysiaAdditionalInfo;
  israelAdditionalInfo?: IsraelAdditionalInfo;
  estoniaAdditionalInfo?: EstoniaAdditionalInfo;
  canadaAdditionalInfo?: CanadaAdditionalInfo;
  brazilAdditionalInfo?: BrazilAdditionalInfo;
  spainAdditionalInfo?: SpainAdditionalInfo;
  kenyaAdditionalInfo?: KenyaAdditionalInfo;
  southKoreaAdditionalInfo?: SouthKoreaAdditionalInfo;
  turkeyAdditionalInfo?: TurkeyAdditionalInfo;
  georgiaAdditionalInfo?: GeorgiaAdditionalInfo;
  italyAdditionalInfo?: ItalyAdditionalInfo;
  romaniaAdditionalInfo?: RomaniaAdditionalInfo;
  ukraineAdditionalInfo?: UkraineAdditionalInfo;
  polandAdditionalInfo?: PolandAdditionalInfo;
  saudiArabiaAdditionalInfo?: SaudiArabiaAdditionalInfo;
  indiaAdditionalInfo?: IndiaAdditionalInfo;
  indonesiaAdditionalInfo?: IndonesiaAdditionalInfo;
  vietnamAdditionalInfo?: VietnamAdditionalInfo;
  egyptAdditionalInfo?: EgyptAdditionalInfo;
  greeceAdditionalInfo?: GreeceAdditionalInfo;
  uzbekistanAdditionalInfo?: UzbekistanAdditionalInfo;
  philippinesAdditionalInfo?: PhilippinesAdditionalInfo;
  belgiumAdditionalInfo?: BelgiumAdditionalInfo;
  chileAdditionalInfo?: ChileAdditionalInfo;
  franceAdditionalInfo?: FranceAdditionalInfo;
}
export interface TaxRegistration {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName: string;
  status: TaxRegistrationStatus;
  sector?: Sector;
  taxDocumentMetadatas?: TaxDocumentMetadata[];
  certifiedEmailId?: string;
  additionalTaxInformation?: AdditionalInfoResponse;
  legalAddress: Address;
}
export interface GetTaxRegistrationResponse {
  taxRegistration?: TaxRegistration;
}
export type S3Prefix = string;
export interface DestinationS3Location {
  bucket: string;
  prefix?: string;
}
export interface GetTaxRegistrationDocumentRequest {
  destinationS3Location?: DestinationS3Location;
  taxDocumentMetadata: TaxDocumentMetadata;
}
export type DestinationFilePath = string;
export type Url = string;
export interface GetTaxRegistrationDocumentResponse {
  destinationFilePath?: string;
  presignedS3Url?: string;
}
export type MaxResults = number;
export type PaginationTokenString = string;
export interface ListSupplementalTaxRegistrationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type SupplementalTaxRegistrationType = "VAT" | (string & {});
export interface SupplementalTaxRegistration {
  registrationId: string;
  registrationType: SupplementalTaxRegistrationType;
  legalName: string;
  address: Address;
  authorityId: string;
  status: TaxRegistrationStatus;
}
export type SupplementalTaxRegistrationList = SupplementalTaxRegistration[];
export interface ListSupplementalTaxRegistrationsResponse {
  taxRegistrations: SupplementalTaxRegistration[];
  nextToken?: string;
}
export interface ListTaxExemptionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ListTaxExemptionsResponse {
  nextToken?: string;
  taxExemptionDetailsMap?: { [key: string]: TaxExemptionDetails | undefined };
}
export interface ListTaxRegistrationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface Jurisdiction {
  stateOrRegion?: string;
  countryCode: string;
}
export interface TaxRegistrationWithJurisdiction {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName: string;
  status: TaxRegistrationStatus;
  sector?: Sector;
  taxDocumentMetadatas?: TaxDocumentMetadata[];
  certifiedEmailId?: string;
  additionalTaxInformation?: AdditionalInfoResponse;
  jurisdiction: Jurisdiction;
}
export type InheritanceObtainedReason = string;
export interface TaxInheritanceDetails {
  parentEntityId?: string;
  inheritanceObtainedReason?: string;
}
export type AccountName = string;
export type Seller = string;
export type AddressRoleType =
  | "TaxAddress"
  | "BillingAddress"
  | "ContactAddress"
  | (string & {});
export type AddressRoleMap = { [key in AddressRoleType]?: Jurisdiction };
export interface AccountMetaData {
  accountName?: string;
  seller?: string;
  address?: Address;
  addressType?: AddressRoleType;
  addressRoleMap?: { [key: string]: Jurisdiction | undefined };
}
export interface AccountDetails {
  accountId?: string;
  taxRegistration?: TaxRegistrationWithJurisdiction;
  taxInheritanceDetails?: TaxInheritanceDetails;
  accountMetaData?: AccountMetaData;
}
export type AccountDetailsList = AccountDetails[];
export interface ListTaxRegistrationsResponse {
  accountDetails: AccountDetails[];
  nextToken?: string;
}
export interface SupplementalTaxRegistrationEntry {
  registrationId: string;
  registrationType: SupplementalTaxRegistrationType;
  legalName: string;
  address: Address;
}
export interface PutSupplementalTaxRegistrationRequest {
  taxRegistrationEntry: SupplementalTaxRegistrationEntry;
}
export interface PutSupplementalTaxRegistrationResponse {
  authorityId: string;
  status: TaxRegistrationStatus;
}
export type ExemptionDocumentName = string;
export type ExemptionFileBlob = Uint8Array;
export interface ExemptionCertificate {
  documentName: string;
  documentFile: Uint8Array;
}
export interface PutTaxExemptionRequest {
  accountIds: string[];
  authority: Authority;
  exemptionType: string;
  exemptionCertificate: ExemptionCertificate;
}
export interface PutTaxExemptionResponse {
  caseId?: string;
}
export interface PutTaxInheritanceRequest {
  heritageStatus?: HeritageStatus;
}
export interface PutTaxInheritanceResponse {}
export interface PutTaxRegistrationRequest {
  accountId?: string;
  taxRegistrationEntry: TaxRegistrationEntry;
}
export interface PutTaxRegistrationResponse {
  status?: TaxRegistrationStatus;
}
export type ValidationExceptionErrorCode =
  | "MalformedToken"
  | "ExpiredToken"
  | "InvalidToken"
  | "FieldValidationFailed"
  | "MissingInput"
  | "NonIndiaCustomerCanNotSetPAN"
  | "GSTExistenceBlockSetPAN"
  | (string & {});
export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchDeleteTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tax registration for multiple accounts in batch. This can be used to delete tax registrations for up to five accounts in one batch.
 *
 * This API operation can't be used to delete your tax registration in Brazil. Use the Payment preferences page in the Billing and Cost Management console instead.
 */
export const batchDeleteTaxRegistration: API.OperationMethod<
  BatchDeleteTaxRegistrationRequest,
  BatchDeleteTaxRegistrationResponse,
  BatchDeleteTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchDeleteTaxRegistration",
    input: { accountIds: 0 },
    output: { errors: D.list({ message: D.secret }) },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTaxRegistration",
})) as any;

export type BatchGetTaxExemptionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the active tax exemptions for a given list of accounts. The IAM action is `tax:GetExemptions`.
 */
export const batchGetTaxExemptions: API.OperationMethod<
  BatchGetTaxExemptionsRequest,
  BatchGetTaxExemptionsResponse,
  BatchGetTaxExemptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGetTaxExemptions",
    input: { accountIds: 0 },
    output: { taxExemptionDetailsMap: D.map(o_TaxExemptionDetails) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTaxExemptions",
})) as any;

export type BatchPutTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tax registration for multiple accounts in batch. This can be used to add or update tax registrations for up to five accounts in one batch. You can't set a TRN if there's a pending TRN. You'll need to delete the pending TRN first.
 *
 * To call this API operation for specific countries, see the following country-specific requirements.
 *
 * **Bangladesh**
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Brazil**
 *
 * - You must complete the tax registration process in the Payment preferences page in the Billing and Cost Management console. After your TRN and billing address are verified, you can call this API operation.
 *
 * - For Amazon Web Services accounts created through Organizations, you can call this API operation when you don't have a billing address.
 *
 * **Georgia**
 *
 * - The valid `personType` values are `Physical Person` and `Business`.
 *
 * **Indonesia**
 *
 * - `PutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022.
 *
 * - `BatchPutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022, through our third-party partner PT Achilles Advanced Management (OnlinePajak).
 *
 * - You must specify the `taxRegistrationNumberType` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If you specify `decisionNumber`, you must specify the `ppnExceptionDesignationCode` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object. If the `taxRegistrationNumberType` is set to NPWP or NITKU, valid values for `ppnExceptionDesignationCode` are either `01`, `02`, `03`, `07`, or `08`.
 *
 * For other `taxRegistrationNumberType` values, `ppnExceptionDesignationCode` must be either `01`, `07`, or `08`.
 *
 * - If `ppnExceptionDesignationCode` is `07` or `08`, you must specify the `decisionNumber` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Kenya**
 *
 * - You must specify the `personType` in the `kenyaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `personType` is `Physical Person`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Malaysia**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * - `RegistrationType` valid values are `NRIC` for individual, and TIN and sales and service tax (SST) for Business.
 *
 * - For individual, you can specify the `taxInformationNumber` in `MalaysiaAdditionalInfo` with NRIC type, and a valid `MyKad` or NRIC number.
 *
 * - For business, you must specify a `businessRegistrationNumber` in `MalaysiaAdditionalInfo` with a TIN type and tax identification number.
 *
 * - For business resellers, you must specify a `businessRegistrationNumber` and `taxInformationNumber` in `MalaysiaAdditionalInfo` with a sales and service tax (SST) type and a valid SST number.
 *
 * - For business resellers with service codes, you must specify `businessRegistrationNumber`, `taxInformationNumber`, and distinct `serviceTaxCodes` in `MalaysiaAdditionalInfo` with a SST type and valid sales and service tax (SST) number. By using this API operation, Amazon Web Services registers your self-declaration that you’re an authorized business reseller registered with the Royal Malaysia Customs Department (RMCD), and have a valid SST number.
 *
 * - Amazon Web Services reserves the right to seek additional information and/or take other actions to support your self-declaration as appropriate.
 *
 * - Amazon Web Services is currently registered under the following service tax codes. You must include at least one of the service tax codes in the service tax code strings to declare yourself as an authorized registered business reseller.
 *
 * Taxable service and service tax codes:
 *
 * Consultancy - 9907061674
 *
 * Training or coaching service - 9907071685
 *
 * IT service - 9907101676
 *
 * Digital services and electronic medium - 9907121690
 *
 * **Mexico**
 *
 * - You must provide a Constancia de Situación fiscal (CSF) document in the **verificationDetails** field.
 *
 * - You do not need to provide address and legal name. These will be populated based on your tax registration number.
 *
 * **Nepal**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Saudi Arabia**
 *
 * - For `address`, you must specify `addressLine3`.
 *
 * **South Korea**
 *
 * - You must specify the `certifiedEmailId` and `legalName` in the `TaxRegistrationEntry` object. Use Korean characters for `legalName`.
 *
 * - You must specify the `businessRepresentativeName`, `itemOfBusiness`, and `lineOfBusiness` in the `southKoreaAdditionalInfo` field of the `additionalTaxInformation` object. Use Korean characters for these fields.
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * - For the `address` object, use Korean characters for `addressLine1`, `addressLine2` `city`, `postalCode`, and `stateOrRegion`.
 *
 * **Spain**
 *
 * - You must specify the `registrationType` in the `spainAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `registrationType` is `Local`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Turkey**
 *
 * - You must specify the `sector` in the `taxRegistrationEntry` object.
 *
 * - If your `sector` is `Business`, `Individual`, or `Government`:
 *
 * - Specify the `taxOffice`. If your `sector` is `Individual`, don't enter this value.
 *
 * - (Optional) Specify the `kepEmailId`. If your `sector` is `Individual`, don't enter this value.
 *
 * - **Note:** In the **Tax Settings** page of the Billing console, `Government` appears as **Public institutions**
 *
 * - If your `sector` is `Business` and you're subject to KDV tax, you must specify your industry in the `industries` field.
 *
 * - For `address`, you must specify `districtOrCounty`.
 *
 * **Ukraine**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Philippines**
 *
 * - You can optionally specify the `isVatRegistered` in the `philippinesAdditionalInfo` field of the `additionalTaxInformation` object to indicate your VAT registration status with the Bureau of Internal Revenue (BIR).
 *
 * **Belgium**
 *
 * - You can optionally specify the `peppolId` in the `belgiumAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Chile**
 *
 * - You can optionally specify the `documentType` and `businessActivity` in the `chileAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **France**
 *
 * - You must specify the `sirenNumber` in the `franceAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Poland**
 *
 * - You can optionally specify the `taxRegistrationNumberType` in the `polandAdditionalInfo` field of the `additionalTaxInformation` object. Valid values are `EUTaxRegistrationNumber`, `LocalTaxRegistrationNumber`, or `LocalRegistrationNumber`.
 */
export const batchPutTaxRegistration: API.OperationMethod<
  BatchPutTaxRegistrationRequest,
  BatchPutTaxRegistrationResponse,
  BatchPutTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchPutTaxRegistration",
    input: { accountIds: 0, taxRegistrationEntry: i_TaxRegistrationEntry },
    output: { errors: D.list({ message: D.secret }) },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutTaxRegistration",
})) as any;

export type DeleteSupplementalTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a supplemental tax registration for a single account.
 */
export const deleteSupplementalTaxRegistration: API.OperationMethod<
  DeleteSupplementalTaxRegistrationRequest,
  DeleteSupplementalTaxRegistrationResponse,
  DeleteSupplementalTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteSupplementalTaxRegistration",
    input: { authorityId: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSupplementalTaxRegistration",
})) as any;

export type DeleteTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tax registration for a single account.
 *
 * This API operation can't be used to delete your tax registration in Brazil. Use the Payment preferences page in the Billing and Cost Management console instead.
 */
export const deleteTaxRegistration: API.OperationMethod<
  DeleteTaxRegistrationRequest,
  DeleteTaxRegistrationResponse,
  DeleteTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteTaxRegistration",
    input: { accountId: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaxRegistration",
})) as any;

export type GetTaxExemptionTypesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get supported tax exemption types. The IAM action is `tax:GetExemptions`.
 */
export const getTaxExemptionTypes: API.OperationMethod<
  GetTaxExemptionTypesRequest,
  GetTaxExemptionTypesResponse,
  GetTaxExemptionTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetTaxExemptionTypes", input: {} },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxExemptionTypes",
})) as any;

export type GetTaxInheritanceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The get account tax inheritance status.
 */
export const getTaxInheritance: API.OperationMethod<
  GetTaxInheritanceRequest,
  GetTaxInheritanceResponse,
  GetTaxInheritanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetTaxInheritance", input: {} },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxInheritance",
})) as any;

export type GetTaxRegistrationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves tax registration for a single account.
 */
export const getTaxRegistration: API.OperationMethod<
  GetTaxRegistrationRequest,
  GetTaxRegistrationResponse,
  GetTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTaxRegistration",
    input: { accountId: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxRegistration",
})) as any;

export type GetTaxRegistrationDocumentError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Downloads your tax documents to the Amazon S3 bucket that you specify in your request.
 */
export const getTaxRegistrationDocument: API.OperationMethod<
  GetTaxRegistrationDocumentRequest,
  GetTaxRegistrationDocumentResponse,
  GetTaxRegistrationDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTaxRegistrationDocument",
    input: {
      destinationS3Location: { bucket: 0, prefix: 0 },
      taxDocumentMetadata: { taxDocumentAccessToken: 0, taxDocumentName: 0 },
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxRegistrationDocument",
})) as any;

export type ListSupplementalTaxRegistrationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves supplemental tax registrations for a single account.
 */
export const listSupplementalTaxRegistrations: API.PaginatedOperationMethod<
  ListSupplementalTaxRegistrationsRequest,
  ListSupplementalTaxRegistrationsResponse,
  ListSupplementalTaxRegistrationsError,
  Credentials | HttpClient.HttpClient,
  SupplementalTaxRegistration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListSupplementalTaxRegistrations",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupplementalTaxRegistrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taxRegistrations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaxExemptionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tax exemption of accounts listed in a consolidated billing family. The IAM action is `tax:GetExemptions`.
 */
export const listTaxExemptions: API.PaginatedOperationMethod<
  ListTaxExemptionsRequest,
  ListTaxExemptionsResponse,
  ListTaxExemptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTaxExemptions",
    input: { maxResults: 0, nextToken: 0 },
    output: { taxExemptionDetailsMap: D.map(o_TaxExemptionDetails) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaxExemptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taxExemptionDetailsMap",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaxRegistrationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tax registration of accounts listed in a consolidated billing family. This can be used to retrieve up to 100 accounts' tax registrations in one call (default 50).
 */
export const listTaxRegistrations: API.PaginatedOperationMethod<
  ListTaxRegistrationsRequest,
  ListTaxRegistrationsResponse,
  ListTaxRegistrationsError,
  Credentials | HttpClient.HttpClient,
  AccountDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTaxRegistrations",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaxRegistrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutSupplementalTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Stores supplemental tax registration for a single account.
 */
export const putSupplementalTaxRegistration: API.OperationMethod<
  PutSupplementalTaxRegistrationRequest,
  PutSupplementalTaxRegistrationResponse,
  PutSupplementalTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutSupplementalTaxRegistration",
    input: {
      taxRegistrationEntry: {
        registrationId: 0,
        registrationType: 0,
        legalName: 0,
        address: i_Address,
      },
    },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSupplementalTaxRegistration",
})) as any;

export type PutTaxExemptionError =
  | AccessDeniedException
  | AttachmentUploadException
  | CaseCreationLimitExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds the tax exemption for a single account or all accounts listed in a consolidated billing family. The IAM action is `tax:UpdateExemptions`.
 */
export const putTaxExemption: API.OperationMethod<
  PutTaxExemptionRequest,
  PutTaxExemptionResponse,
  PutTaxExemptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutTaxExemption",
    input: {
      accountIds: 0,
      authority: { country: 0, state: 0 },
      exemptionType: 0,
      exemptionCertificate: { documentName: 0, documentFile: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AttachmentUploadException,
    CaseCreationLimitExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxExemption",
})) as any;

export type PutTaxInheritanceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The updated tax inheritance status.
 */
export const putTaxInheritance: API.OperationMethod<
  PutTaxInheritanceRequest,
  PutTaxInheritanceResponse,
  PutTaxInheritanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutTaxInheritance",
    input: { heritageStatus: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxInheritance",
})) as any;

export type PutTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tax registration for a single account. You can't set a TRN if there's a pending TRN. You'll need to delete the pending TRN first.
 *
 * To call this API operation for specific countries, see the following country-specific requirements.
 *
 * **Bangladesh**
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Brazil**
 *
 * - You must complete the tax registration process in the Payment preferences page in the Billing and Cost Management console. After your TRN and billing address are verified, you can call this API operation.
 *
 * - For Amazon Web Services accounts created through Organizations, you can call this API operation when you don't have a billing address.
 *
 * **Georgia**
 *
 * - The valid `personType` values are `Physical Person` and `Business`.
 *
 * **Indonesia**
 *
 * - `PutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022.
 *
 * - `BatchPutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022, through our third-party partner PT Achilles Advanced Management (OnlinePajak).
 *
 * - You must specify the `taxRegistrationNumberType` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If you specify `decisionNumber`, you must specify the `ppnExceptionDesignationCode` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object. If the `taxRegistrationNumberType` is set to NPWP or NITKU, valid values for `ppnExceptionDesignationCode` are either `01`, `02`, `03`, `07`, or `08`.
 *
 * For other `taxRegistrationNumberType` values, `ppnExceptionDesignationCode` must be either `01`, `07`, or `08`.
 *
 * - If `ppnExceptionDesignationCode` is `07` or `08`, you must specify the `decisionNumber` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Kenya**
 *
 * - You must specify the `personType` in the `kenyaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `personType` is `Physical Person`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Malaysia**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * - `RegistrationType` valid values are `NRIC` for individual, and TIN and sales and service tax (SST) for Business.
 *
 * - For individual, you can specify the `taxInformationNumber` in `MalaysiaAdditionalInfo` with NRIC type, and a valid `MyKad` or NRIC number.
 *
 * - For business, you must specify a `businessRegistrationNumber` in `MalaysiaAdditionalInfo` with a TIN type and tax identification number.
 *
 * - For business resellers, you must specify a `businessRegistrationNumber` and `taxInformationNumber` in `MalaysiaAdditionalInfo` with a sales and service tax (SST) type and a valid SST number.
 *
 * - For business resellers with service codes, you must specify `businessRegistrationNumber`, `taxInformationNumber`, and distinct `serviceTaxCodes` in `MalaysiaAdditionalInfo` with a SST type and valid sales and service tax (SST) number. By using this API operation, Amazon Web Services registers your self-declaration that you’re an authorized business reseller registered with the Royal Malaysia Customs Department (RMCD), and have a valid SST number.
 *
 * - Amazon Web Services reserves the right to seek additional information and/or take other actions to support your self-declaration as appropriate.
 *
 * - Amazon Web Services is currently registered under the following service tax codes. You must include at least one of the service tax codes in the service tax code strings to declare yourself as an authorized registered business reseller.
 *
 * Taxable service and service tax codes:
 *
 * Consultancy - 9907061674
 *
 * Training or coaching service - 9907071685
 *
 * IT service - 9907101676
 *
 * Digital services and electronic medium - 9907121690
 *
 * **Mexico**
 *
 * - You must provide a Constancia de Situación fiscal (CSF) document in the **verificationDetails** field.
 *
 * - You do not need to provide address and legal name. These will be populated based on your tax registration number.
 *
 * **Nepal**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Saudi Arabia**
 *
 * - For `address`, you must specify `addressLine3`.
 *
 * **South Korea**
 *
 * - You must specify the `certifiedEmailId` and `legalName` in the `TaxRegistrationEntry` object. Use Korean characters for `legalName`.
 *
 * - You must specify the `businessRepresentativeName`, `itemOfBusiness`, and `lineOfBusiness` in the `southKoreaAdditionalInfo` field of the `additionalTaxInformation` object. Use Korean characters for these fields.
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * - For the `address` object, use Korean characters for `addressLine1`, `addressLine2` `city`, `postalCode`, and `stateOrRegion`.
 *
 * **Spain**
 *
 * - You must specify the `registrationType` in the `spainAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `registrationType` is `Local`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Turkey**
 *
 * - You must specify the `sector` in the `taxRegistrationEntry` object.
 *
 * - If your `sector` is `Business`, `Individual`, or `Government`:
 *
 * - Specify the `taxOffice`. If your `sector` is `Individual`, don't enter this value.
 *
 * - (Optional) Specify the `kepEmailId`. If your `sector` is `Individual`, don't enter this value.
 *
 * - **Note:** In the **Tax Settings** page of the Billing console, `Government` appears as **Public institutions**
 *
 * - If your `sector` is `Business` and you're subject to KDV tax, you must specify your industry in the `industries` field.
 *
 * - For `address`, you must specify `districtOrCounty`.
 *
 * **Ukraine**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Philippines**
 *
 * - You can optionally specify the `isVatRegistered` in the `philippinesAdditionalInfo` field of the `additionalTaxInformation` object to indicate your VAT registration status with the Bureau of Internal Revenue (BIR).
 *
 * **Belgium**
 *
 * - You can optionally specify the `peppolId` in the `belgiumAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Chile**
 *
 * - You can optionally specify the `documentType` and `businessActivity` in the `chileAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **France**
 *
 * - You must specify the `sirenNumber` in the `franceAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Poland**
 *
 * - You can optionally specify the `taxRegistrationNumberType` in the `polandAdditionalInfo` field of the `additionalTaxInformation` object. Valid values are `EUTaxRegistrationNumber`, `LocalTaxRegistrationNumber`, or `LocalRegistrationNumber`.
 */
export const putTaxRegistration: API.OperationMethod<
  PutTaxRegistrationRequest,
  PutTaxRegistrationResponse,
  PutTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutTaxRegistration",
    input: { accountId: 0, taxRegistrationEntry: i_TaxRegistrationEntry },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxRegistration",
})) as any;

const i_Address: D.LazyStruct = () => ({
  addressLine1: 0,
  addressLine2: 0,
  addressLine3: 0,
  districtOrCounty: 0,
  city: 0,
  stateOrRegion: 0,
  postalCode: 0,
  countryCode: 0,
});
const i_TaxRegistrationEntry: D.LazyStruct = () => ({
  registrationId: 0,
  registrationType: 0,
  legalName: 0,
  legalAddress: i_Address,
  sector: 0,
  additionalTaxInformation: {
    malaysiaAdditionalInfo: {
      serviceTaxCodes: 0,
      taxInformationNumber: 0,
      businessRegistrationNumber: 0,
    },
    israelAdditionalInfo: { dealerType: 0, customerType: 0 },
    estoniaAdditionalInfo: { registryCommercialCode: 0 },
    canadaAdditionalInfo: {
      provincialSalesTaxId: 0,
      canadaQuebecSalesTaxNumber: 0,
      canadaRetailSalesTaxNumber: 0,
      isResellerAccount: 0,
    },
    spainAdditionalInfo: { registrationType: 0 },
    kenyaAdditionalInfo: { personType: 0 },
    southKoreaAdditionalInfo: {
      businessRepresentativeName: 0,
      lineOfBusiness: 0,
      itemOfBusiness: 0,
    },
    turkeyAdditionalInfo: {
      taxOffice: 0,
      kepEmailId: 0,
      secondaryTaxId: 0,
      industries: 0,
    },
    georgiaAdditionalInfo: { personType: 0 },
    italyAdditionalInfo: {
      sdiAccountId: 0,
      cigNumber: 0,
      cupNumber: 0,
      taxCode: 0,
      customerType: 0,
    },
    romaniaAdditionalInfo: { taxRegistrationNumberType: 0 },
    ukraineAdditionalInfo: { ukraineTrnType: 0 },
    polandAdditionalInfo: {
      individualRegistrationNumber: 0,
      isGroupVatEnabled: 0,
      taxRegistrationNumberType: 0,
    },
    saudiArabiaAdditionalInfo: { taxRegistrationNumberType: 0 },
    indonesiaAdditionalInfo: {
      taxRegistrationNumberType: 0,
      ppnExceptionDesignationCode: 0,
      decisionNumber: 0,
    },
    vietnamAdditionalInfo: {
      enterpriseIdentificationNumber: 0,
      electronicTransactionCodeNumber: 0,
      paymentVoucherNumber: 0,
      paymentVoucherNumberDate: 0,
    },
    egyptAdditionalInfo: {
      uniqueIdentificationNumber: 0,
      uniqueIdentificationNumberExpirationDate: 0,
    },
    greeceAdditionalInfo: { contractingAuthorityCode: 0 },
    uzbekistanAdditionalInfo: {
      taxRegistrationNumberType: 0,
      vatRegistrationNumber: 0,
    },
    philippinesAdditionalInfo: { isVatRegistered: 0 },
    belgiumAdditionalInfo: { peppolId: 0, isMercuriusBoxEnabled: 0 },
    chileAdditionalInfo: { documentType: 0, businessActivity: 0 },
    franceAdditionalInfo: { sirenNumber: 0 },
  },
  verificationDetails: {
    dateOfBirth: 0,
    taxRegistrationDocuments: D.list({
      s3Location: { bucket: 0, key: 0 },
      file: { fileName: 0, fileContent: 0 },
    }),
  },
  certifiedEmailId: 0,
});
const o_TaxExemptionDetails: D.LazyStruct = () => ({
  taxExemptions: D.list({
    effectiveDate: D.ts,
    expirationDate: D.ts,
    systemEffectiveDate: D.ts,
  }),
});
