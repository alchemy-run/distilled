import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "ACM",
  target: "CertificateManager",
  version: "2015-12-08",
  sigv4: "acm",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
    const {
      Region,
      Endpoint,
      UseFIPS = false,
      UseDualStack = false,
      ServiceType,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      return e(`${Endpoint}`);
    }
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (ServiceType === "ACM-ACME") {
          if (Endpoint != null) {
            return e(`${Endpoint}`);
          }
          if (_.getAttr(PartitionResult, "name") === "aws") {
            if (UseFIPS === true) {
              return err(
                "FIPS endpoints are not available for ACME operations",
              );
            }
            return e(
              `https://acm-acme.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "ACME operations are only available in commercial AWS partitions",
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          return e(
            `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
            return e(`https://acm.${Region}.amazonaws.com`);
          }
          return e(
            `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (UseDualStack === true) {
          return e(
            `https://acm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://acm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
    return err("Region must be set to resolve an endpoint.");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "AccessDenied",
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException", [
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class InvalidArgsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgsException")<{
    readonly message?: string;
  }> {}
export class InvalidArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArnException")<{
    readonly message?: string;
  }> {}
export class InvalidDomainValidationOptionsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDomainValidationOptionsException",
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStateException")<{
    readonly message?: string;
  }> {}
export class InvalidTagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class RequestInProgressException
  extends /*@__PURE__*/ TE.TaggedError("RequestInProgressException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
  }> {}
export class TagPolicyException
  extends /*@__PURE__*/ TE.TaggedError("TagPolicyException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError", "ThrottlingError", "RetryableError"],
    { code: "Throttling", status: 400 },
  )<{
    readonly message?: string;
    readonly throttlingReasons?: ThrottlingReason[];
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { code: "ValidationError", status: 400 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsToCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export interface AddTagsToCertificateResponse {}
export type AcmeEndpointArn = string;
export type DomainName = string;
export type DomainScopeOption = "ENABLED" | "DISABLED" | (string & {});
export interface DomainScope {
  ExactDomain?: DomainScopeOption;
  Subdomains?: DomainScopeOption;
  Wildcards?: DomainScopeOption;
}
export type HostedZoneId = string;
export interface DnsPrevalidationOptions {
  DomainScope?: DomainScope;
  HostedZoneId?: string;
}
export type PrevalidationOptions = {
  DnsPrevalidation: DnsPrevalidationOptions;
};
export interface CreateAcmeDomainValidationRequest {
  IdempotencyToken?: string;
  AcmeEndpointArn: string;
  DomainName: string;
  PrevalidationOptions: PrevalidationOptions;
  Tags?: Tag[];
}
export type AcmeDomainValidationArn = string;
export interface CreateAcmeDomainValidationResponse {
  AcmeDomainValidationArn: string;
}
export type AcmeAuthorizationBehavior = "PRE_APPROVED" | (string & {});
export type AcmeContact = "REQUIRED" | "NOT_REQUIRED" | (string & {});
export type PublicKeyAlgorithm =
  | "RSA_2048"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | (string & {});
export type PublicKeyAlgorithmList = PublicKeyAlgorithm[];
export interface PublicCertificateAuthority {
  AllowedKeyAlgorithms?: PublicKeyAlgorithm[];
}
export type CertificateAuthority = {
  PublicCertificateAuthority: PublicCertificateAuthority;
};
export interface CreateAcmeEndpointRequest {
  IdempotencyToken?: string;
  AuthorizationBehavior: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority: CertificateAuthority;
  Tags?: Tag[];
  CertificateTags?: Tag[];
}
export interface CreateAcmeEndpointResponse {
  AcmeEndpointArn?: string;
}
export type RoleArn = string;
export type TimeType = "MINUTES" | "HOURS" | "DAYS" | (string & {});
export interface Expiration {
  Value: number;
  Type: TimeType;
}
export interface CreateAcmeExternalAccountBindingRequest {
  IdempotencyToken?: string;
  AcmeEndpointArn: string;
  RoleArn: string;
  Expiration?: Expiration;
  Tags?: Tag[];
}
export type AcmeExternalAccountBindingArn = string;
export interface AcmeExternalAccountBinding {
  AcmeExternalAccountBindingArn?: string;
  AcmeEndpointArn?: string;
  RoleArn?: string;
  ExpiresAt?: Date;
  RevokedAt?: Date;
  LastUsedAt?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface CreateAcmeExternalAccountBindingResponse {
  ExternalAccountBinding?: AcmeExternalAccountBinding;
}
export interface DeleteAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
}
export interface DeleteAcmeDomainValidationResponse {}
export interface DeleteAcmeEndpointRequest {
  AcmeEndpointArn: string;
}
export interface DeleteAcmeEndpointResponse {}
export interface DeleteAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export interface DeleteAcmeExternalAccountBindingResponse {}
export interface DeleteCertificateRequest {
  CertificateArn: string;
}
export interface DeleteCertificateResponse {}
export interface DescribeAcmeAccountRequest {
  AcmeEndpointArn: string;
  AccountUrl: string;
}
export type AcmeAccountStatus =
  | "VALID"
  | "DEACTIVATED"
  | "REVOKED"
  | (string & {});
export type ContactList = string[];
export interface AcmeAccount {
  AccountUrl?: string;
  PublicKeyThumbprint?: string;
  Status?: AcmeAccountStatus;
  CreatedAt?: Date;
  AcmeExternalAccountBindingArn?: string;
  Contacts?: string[];
}
export interface DescribeAcmeAccountResponse {
  AcmeAccount?: AcmeAccount;
}
export interface DescribeAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
}
export type PrevalidationType = "DNS_PREVALIDATION" | (string & {});
export type RecordType = "CNAME" | (string & {});
export interface ResourceRecord {
  Name: string;
  Type: RecordType;
  Value: string;
}
export interface DnsPrevalidationDetails {
  DomainScope?: DomainScope;
  HostedZoneId?: string;
  ResourceRecord?: ResourceRecord;
}
export type PrevalidationDetails = {
  DnsPrevalidation: DnsPrevalidationDetails;
};
export type AcmeDomainValidationStatus =
  | "VALIDATING"
  | "VALID"
  | "INVALID"
  | "DELETING"
  | (string & {});
export type AcmeDomainValidationFailureReason =
  | "ACCESS_DENIED"
  | "DOMAIN_MISMATCH"
  | "DOMAIN_NOT_ALLOWED"
  | "ENDPOINT_NOT_ACTIVE"
  | "HOSTED_ZONE_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "INVALID_CHANGE_BATCH"
  | "INVALID_PUBLIC_DOMAIN"
  | "TIMED_OUT"
  | (string & {});
export interface FailureDetails {
  Reason?: AcmeDomainValidationFailureReason;
  Message?: string;
}
export interface AcmeDomainValidation {
  AcmeDomainValidationArn?: string;
  AcmeEndpointArn?: string;
  DomainName?: string;
  PrevalidationType?: PrevalidationType;
  PrevalidationDetails?: PrevalidationDetails;
  Status?: AcmeDomainValidationStatus;
  FailureDetails?: FailureDetails;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface DescribeAcmeDomainValidationResponse {
  AcmeDomainValidation?: AcmeDomainValidation;
}
export interface DescribeAcmeEndpointRequest {
  AcmeEndpointArn: string;
}
export type AcmeEndpointStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface AcmeEndpoint {
  AcmeEndpointArn?: string;
  EndpointUrl?: string;
  Status?: AcmeEndpointStatus;
  FailureReason?: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
  CertificateTags?: Tag[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface DescribeAcmeEndpointResponse {
  AcmeEndpoint?: AcmeEndpoint;
}
export interface DescribeAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export interface DescribeAcmeExternalAccountBindingResponse {
  ExternalAccountBinding?: AcmeExternalAccountBinding;
}
export interface DescribeCertificateRequest {
  CertificateArn: string;
}
export type DomainNameString = string;
export type DomainList = string[];
export type CertificateManagedBy = "CLOUDFRONT" | (string & {});
export type ValidationEmailList = string[];
export type DomainStatus =
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface HttpRedirect {
  RedirectFrom?: string;
  RedirectTo?: string;
}
export type ValidationMethod = "EMAIL" | "DNS" | "HTTP" | (string & {});
export interface DomainValidation {
  DomainName: string;
  ValidationEmails?: string[];
  ValidationDomain?: string;
  ValidationStatus?: DomainStatus;
  ResourceRecord?: ResourceRecord;
  HttpRedirect?: HttpRedirect;
  ValidationMethod?: ValidationMethod;
}
export type DomainValidationList = DomainValidation[];
export type CertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | (string & {});
export type RevocationReason =
  | "UNSPECIFIED"
  | "KEY_COMPROMISE"
  | "CA_COMPROMISE"
  | "AFFILIATION_CHANGED"
  | "SUPERCEDED"
  | "SUPERSEDED"
  | "CESSATION_OF_OPERATION"
  | "CERTIFICATE_HOLD"
  | "REMOVE_FROM_CRL"
  | "PRIVILEGE_WITHDRAWN"
  | "A_A_COMPROMISE"
  | (string & {});
export type KeyAlgorithm =
  | "RSA_1024"
  | "RSA_2048"
  | "RSA_3072"
  | "RSA_4096"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | "EC_secp521r1"
  | (string & {});
export type InUseList = string[];
export type FailureReason =
  | "NO_AVAILABLE_CONTACTS"
  | "ADDITIONAL_VERIFICATION_REQUIRED"
  | "DOMAIN_NOT_ALLOWED"
  | "INVALID_PUBLIC_DOMAIN"
  | "DOMAIN_VALIDATION_DENIED"
  | "CAA_ERROR"
  | "PCA_LIMIT_EXCEEDED"
  | "PCA_INVALID_ARN"
  | "PCA_INVALID_STATE"
  | "PCA_REQUEST_FAILED"
  | "PCA_NAME_CONSTRAINTS_VALIDATION"
  | "PCA_RESOURCE_NOT_FOUND"
  | "PCA_INVALID_ARGS"
  | "PCA_INVALID_DURATION"
  | "PCA_ACCESS_DENIED"
  | "SLR_NOT_FOUND"
  | "OTHER"
  | (string & {});
export type CertificateType =
  | "IMPORTED"
  | "AMAZON_ISSUED"
  | "PRIVATE"
  | (string & {});
export type RenewalStatus =
  | "PENDING_AUTO_RENEWAL"
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface RenewalSummary {
  RenewalStatus: RenewalStatus;
  DomainValidationOptions: DomainValidation[];
  RenewalStatusReason?: FailureReason;
  UpdatedAt: Date;
}
export type KeyUsageName =
  | "DIGITAL_SIGNATURE"
  | "NON_REPUDIATION"
  | "KEY_ENCIPHERMENT"
  | "DATA_ENCIPHERMENT"
  | "KEY_AGREEMENT"
  | "CERTIFICATE_SIGNING"
  | "CRL_SIGNING"
  | "ENCIPHER_ONLY"
  | "DECIPHER_ONLY"
  | "ANY"
  | "CUSTOM"
  | (string & {});
export interface KeyUsage {
  Name?: KeyUsageName;
}
export type KeyUsageList = KeyUsage[];
export type ExtendedKeyUsageName =
  | "TLS_WEB_SERVER_AUTHENTICATION"
  | "TLS_WEB_CLIENT_AUTHENTICATION"
  | "CODE_SIGNING"
  | "EMAIL_PROTECTION"
  | "TIME_STAMPING"
  | "OCSP_SIGNING"
  | "IPSEC_END_SYSTEM"
  | "IPSEC_TUNNEL"
  | "IPSEC_USER"
  | "ANY"
  | "NONE"
  | "CUSTOM"
  | (string & {});
export interface ExtendedKeyUsage {
  Name?: ExtendedKeyUsageName;
  OID?: string;
}
export type ExtendedKeyUsageList = ExtendedKeyUsage[];
export type RenewalEligibility = "ELIGIBLE" | "INELIGIBLE" | (string & {});
export type CertificateTransparencyLoggingPreference =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type CertificateExport = "ENABLED" | "DISABLED" | (string & {});
export interface CertificateOptions {
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference;
  Export?: CertificateExport;
  ValidationMethod?: ValidationMethod;
}
export type UpdateStatus =
  | "PENDING_DOMAIN_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export type UpdateType = "DOMAIN_VALIDATION_METHOD" | (string & {});
export interface DomainValidationMethodUpdateSummary {
  From?: ValidationMethod;
  To?: ValidationMethod;
}
export interface UpdateSummary {
  Status?: UpdateStatus;
  Type?: UpdateType;
  DomainValidationMethodUpdateSummary?: DomainValidationMethodUpdateSummary;
  RequestedAt?: Date;
  UpdatedAt?: Date;
}
export type CertificateKeyPairOrigin =
  | "AWS_MANAGED"
  | "ACME"
  | "CUSTOMER_PROVIDED"
  | (string & {});
export type AcmeAccountId = string;
export interface CertificateDetail {
  CertificateArn?: string;
  DomainName?: string;
  SubjectAlternativeNames?: string[];
  ManagedBy?: CertificateManagedBy;
  DomainValidationOptions?: DomainValidation[];
  Serial?: string;
  Subject?: string;
  Issuer?: string;
  CreatedAt?: Date;
  IssuedAt?: Date;
  ImportedAt?: Date;
  Status?: CertificateStatus;
  RevokedAt?: Date;
  RevocationReason?: RevocationReason;
  NotBefore?: Date;
  NotAfter?: Date;
  KeyAlgorithm?: KeyAlgorithm;
  SignatureAlgorithm?: string;
  InUseBy?: string[];
  FailureReason?: FailureReason;
  Type?: CertificateType;
  RenewalSummary?: RenewalSummary;
  KeyUsages?: KeyUsage[];
  ExtendedKeyUsages?: ExtendedKeyUsage[];
  CertificateAuthorityArn?: string;
  RenewalEligibility?: RenewalEligibility;
  Options?: CertificateOptions;
  UpdateSummary?: UpdateSummary;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
  AcmeEndpointArn?: string;
  AcmeAccountId?: string;
}
export interface DescribeCertificateResponse {
  Certificate?: CertificateDetail;
}
export type PassphraseBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ExportCertificateRequest {
  CertificateArn: string;
  Passphrase: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type CertificateBody = string;
export type CertificateChain = string;
export type PrivateKey = string | redacted.Redacted<string>;
export interface ExportCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
  PrivateKey?: string | redacted.Redacted<string>;
}
export interface GetAccountConfigurationRequest {}
export type PositiveInteger = number;
export interface ExpiryEventsConfiguration {
  DaysBeforeExpiry?: number;
}
export interface GetAccountConfigurationResponse {
  ExpiryEvents?: ExpiryEventsConfiguration;
}
export interface GetAcmeExternalAccountBindingCredentialsRequest {
  AcmeExternalAccountBindingArn: string;
}
export type MacKey = string | redacted.Redacted<string>;
export interface GetAcmeExternalAccountBindingCredentialsResponse {
  KeyId?: string;
  MacKey?: string | redacted.Redacted<string>;
}
export interface GetCertificateRequest {
  CertificateArn: string;
}
export interface GetCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
}
export type CertificateBodyBlob = Uint8Array;
export type PrivateKeyBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export type CertificateChainBlob = Uint8Array;
export interface ImportCertificateRequest {
  CertificateArn?: string;
  Certificate: Uint8Array;
  PrivateKey: Uint8Array | redacted.Redacted<Uint8Array>;
  CertificateChain?: Uint8Array;
  Tags?: Tag[];
}
export interface ImportCertificateResponse {
  CertificateArn?: string;
}
export interface ListAcmeAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export interface AcmeAccountSummary {
  AccountUrl?: string;
  PublicKeyThumbprint?: string;
  Status?: AcmeAccountStatus;
  CreatedAt?: Date;
  AcmeExternalAccountBindingArn?: string;
  Contacts?: string[];
}
export type AcmeAccountList = AcmeAccountSummary[];
export interface ListAcmeAccountsResponse {
  AcmeAccounts?: AcmeAccountSummary[];
  NextToken?: string;
}
export interface ListAcmeDomainValidationsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export interface AcmeDomainValidationSummary {
  AcmeDomainValidationArn?: string;
  AcmeEndpointArn?: string;
  DomainName?: string;
  PrevalidationType?: PrevalidationType;
  PrevalidationDetails?: PrevalidationDetails;
  Status?: AcmeDomainValidationStatus;
  FailureDetails?: FailureDetails;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type AcmeDomainValidationList = AcmeDomainValidationSummary[];
export interface ListAcmeDomainValidationsResponse {
  AcmeDomainValidations?: AcmeDomainValidationSummary[];
  NextToken?: string;
}
export interface ListAcmeEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface AcmeEndpointSummary {
  AcmeEndpointArn?: string;
  EndpointUrl?: string;
  Status?: AcmeEndpointStatus;
  FailureReason?: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
  CertificateTags?: Tag[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type AcmeEndpointList = AcmeEndpointSummary[];
export interface ListAcmeEndpointsResponse {
  AcmeEndpoints?: AcmeEndpointSummary[];
  NextToken?: string;
}
export interface ListAcmeExternalAccountBindingsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export interface AcmeExternalAccountBindingSummary {
  AcmeExternalAccountBindingArn?: string;
  AcmeEndpointArn?: string;
  RoleArn?: string;
  ExpiresAt?: Date;
  RevokedAt?: Date;
  LastUsedAt?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type AcmeExternalAccountBindingList =
  AcmeExternalAccountBindingSummary[];
export interface ListAcmeExternalAccountBindingsResponse {
  ExternalAccountBindings?: AcmeExternalAccountBindingSummary[];
  NextToken?: string;
}
export type CertificateArn = string;
export type NextToken = string;
export type MaxItems = number;
export interface ListCertificateDomainValidationsRequest {
  CertificateArn: string;
  NextToken?: string;
  MaxItems?: number;
}
export interface EmailValidationChallenge {
  ValidationEmails?: string[];
  ValidationDomain?: string;
}
export interface DnsValidationChallenge {
  ResourceRecord?: ResourceRecord;
}
export type ValidationChallenge =
  | {
      EmailValidationChallenge: EmailValidationChallenge;
      DnsValidationChallenge?: never;
    }
  | {
      EmailValidationChallenge?: never;
      DnsValidationChallenge: DnsValidationChallenge;
    };
export interface ValidationConfiguration {
  ValidationMethod?: ValidationMethod;
  ValidationChallenge?: ValidationChallenge;
  ValidationStatus?: DomainStatus;
}
export interface DomainValidationSummary {
  DomainName: string;
  ActiveValidationConfiguration?: ValidationConfiguration;
  RequestedValidationConfiguration?: ValidationConfiguration;
}
export type DomainValidationSummaryList = DomainValidationSummary[];
export interface ListCertificateDomainValidationsResponse {
  DomainValidationSummaryList?: DomainValidationSummary[];
  NextToken?: string;
}
export type CertificateStatuses = CertificateStatus[];
export type CertificateKeyPairOrigins = CertificateKeyPairOrigin[];
export type ExtendedKeyUsageFilterList = ExtendedKeyUsageName[];
export type KeyUsageFilterList = KeyUsageName[];
export type KeyAlgorithmList = KeyAlgorithm[];
export interface Filters {
  extendedKeyUsage?: ExtendedKeyUsageName[];
  keyUsage?: KeyUsageName[];
  keyTypes?: KeyAlgorithm[];
  exportOption?: CertificateExport;
  managedBy?: CertificateManagedBy;
}
export type SortBy = "CREATED_AT" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListCertificatesRequest {
  CertificateStatuses?: CertificateStatus[];
  CertificateKeyPairOrigins?: CertificateKeyPairOrigin[];
  Includes?: Filters;
  NextToken?: string;
  MaxItems?: number;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
}
export type KeyUsageNames = KeyUsageName[];
export type ExtendedKeyUsageNames = ExtendedKeyUsageName[];
export interface CertificateSummary {
  CertificateArn?: string;
  DomainName?: string;
  SubjectAlternativeNameSummaries?: string[];
  HasAdditionalSubjectAlternativeNames?: boolean;
  Status?: CertificateStatus;
  Type?: CertificateType;
  KeyAlgorithm?: KeyAlgorithm;
  KeyUsages?: KeyUsageName[];
  ExtendedKeyUsages?: ExtendedKeyUsageName[];
  ExportOption?: CertificateExport;
  InUse?: boolean;
  Exported?: boolean;
  RenewalEligibility?: RenewalEligibility;
  NotBefore?: Date;
  NotAfter?: Date;
  CreatedAt?: Date;
  IssuedAt?: Date;
  ImportedAt?: Date;
  RevokedAt?: Date;
  ManagedBy?: CertificateManagedBy;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
}
export type CertificateSummaryList = CertificateSummary[];
export interface ListCertificatesResponse {
  NextToken?: string;
  CertificateSummaryList?: CertificateSummary[];
}
export interface ListTagsForCertificateRequest {
  CertificateArn: string;
}
export interface ListTagsForCertificateResponse {
  Tags?: Tag[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type IdempotencyToken = string;
export interface PutAccountConfigurationRequest {
  ExpiryEvents?: ExpiryEventsConfiguration;
  IdempotencyToken: string;
}
export interface PutAccountConfigurationResponse {}
export interface RemoveTagsFromCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export interface RemoveTagsFromCertificateResponse {}
export interface RenewCertificateRequest {
  CertificateArn: string;
}
export interface RenewCertificateResponse {}
export interface DomainValidationOption {
  DomainName: string;
  ValidationDomain: string;
}
export type DomainValidationOptionList = DomainValidationOption[];
export type PcaArn = string;
export interface RequestCertificateRequest {
  DomainName: string;
  ValidationMethod?: ValidationMethod;
  SubjectAlternativeNames?: string[];
  IdempotencyToken?: string;
  DomainValidationOptions?: DomainValidationOption[];
  Options?: CertificateOptions;
  CertificateAuthorityArn?: string;
  Tags?: Tag[];
  KeyAlgorithm?: KeyAlgorithm;
  ManagedBy?: CertificateManagedBy;
}
export interface RequestCertificateResponse {
  CertificateArn?: string;
}
export interface ResendValidationEmailRequest {
  CertificateArn: string;
  Domain: string;
  ValidationDomain: string;
}
export interface ResendValidationEmailResponse {}
export interface RevokeAcmeAccountRequest {
  AcmeEndpointArn: string;
  AccountUrl: string;
}
export interface RevokeAcmeAccountResponse {}
export interface RevokeAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export interface RevokeAcmeExternalAccountBindingResponse {}
export interface RevokeCertificateRequest {
  CertificateArn: string;
  RevocationReason: RevocationReason;
}
export interface RevokeCertificateResponse {
  CertificateArn?: string;
}
export type CertificateFilterStatementList = CertificateFilterStatement[];
export type FilterString = string;
export type ComparisonOperator = "CONTAINS" | "EQUALS" | (string & {});
export interface CommonNameFilter {
  Value: string;
  ComparisonOperator: ComparisonOperator;
}
export type SubjectFilter = { CommonName: CommonNameFilter };
export interface DnsNameFilter {
  Value: string;
  ComparisonOperator: ComparisonOperator;
}
export type SubjectAlternativeNameFilter = { DnsName: DnsNameFilter };
export type SerialNumber = string;
export interface TimestampRange {
  Start?: Date;
  End?: Date;
}
export type X509AttributeFilter =
  | {
      Subject: SubjectFilter;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName: SubjectAlternativeNameFilter;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage: ExtendedKeyUsageName;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage: KeyUsageName;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm: KeyAlgorithm;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber: string;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter: TimestampRange;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore: TimestampRange;
    };
export type AcmCertificateMetadataFilter =
  | {
      Status: CertificateStatus;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus: RenewalStatus;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type: CertificateType;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse: boolean;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported: boolean;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption: CertificateExport;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy: CertificateManagedBy;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod: ValidationMethod;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin: CertificateKeyPairOrigin;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn: string;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId: string;
    };
export type CertificateFilter =
  | {
      CertificateArn: string;
      X509AttributeFilter?: never;
      AcmCertificateMetadataFilter?: never;
    }
  | {
      CertificateArn?: never;
      X509AttributeFilter: X509AttributeFilter;
      AcmCertificateMetadataFilter?: never;
    }
  | {
      CertificateArn?: never;
      X509AttributeFilter?: never;
      AcmCertificateMetadataFilter: AcmCertificateMetadataFilter;
    };
export type CertificateFilterStatement =
  | {
      And: CertificateFilterStatement[];
      Or?: never;
      Not?: never;
      Filter?: never;
    }
  | {
      And?: never;
      Or: CertificateFilterStatement[];
      Not?: never;
      Filter?: never;
    }
  | { And?: never; Or?: never; Not: CertificateFilterStatement; Filter?: never }
  | { And?: never; Or?: never; Not?: never; Filter: CertificateFilter };
export type SearchMaxResults = number;
export type SearchCertificatesSortBy =
  | "CREATED_AT"
  | "NOT_AFTER"
  | "STATUS"
  | "RENEWAL_STATUS"
  | "EXPORTED"
  | "IN_USE"
  | "NOT_BEFORE"
  | "KEY_ALGORITHM"
  | "TYPE"
  | "CERTIFICATE_ARN"
  | "COMMON_NAME"
  | "REVOKED_AT"
  | "RENEWAL_ELIGIBILITY"
  | "ISSUED_AT"
  | "MANAGED_BY"
  | "EXPORT_OPTION"
  | "VALIDATION_METHOD"
  | "IMPORTED_AT"
  | "ACME_ENDPOINT_ARN"
  | "ACME_ACCOUNT_ID"
  | "CERTIFICATE_KEY_PAIR_ORIGIN"
  | (string & {});
export type SearchCertificatesSortOrder =
  | "ASCENDING"
  | "DESCENDING"
  | (string & {});
export interface SearchCertificatesRequest {
  FilterStatement?: CertificateFilterStatement;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: SearchCertificatesSortBy;
  SortOrder?: SearchCertificatesSortOrder;
}
export type DomainComponentList = string[];
export interface CustomAttribute {
  ObjectIdentifier?: string;
  Value?: string;
}
export type CustomAttributeList = CustomAttribute[];
export interface DistinguishedName {
  CommonName?: string;
  DomainComponents?: string[];
  Country?: string;
  CustomAttributes?: CustomAttribute[];
  DistinguishedNameQualifier?: string;
  GenerationQualifier?: string;
  GivenName?: string;
  Initials?: string;
  Locality?: string;
  Organization?: string;
  OrganizationalUnit?: string;
  Pseudonym?: string;
  SerialNumber?: string;
  State?: string;
  Surname?: string;
  Title?: string;
}
export interface OtherName {
  ObjectIdentifier?: string;
  Value?: string;
}
export type GeneralName =
  | {
      DirectoryName: DistinguishedName;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName: string;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress: string;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName: OtherName;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId: string;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name: string;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier: string;
    };
export type GeneralNameList = GeneralName[];
export interface X509Attributes {
  Issuer?: DistinguishedName;
  Subject?: DistinguishedName;
  SubjectAlternativeNames?: GeneralName[];
  ExtendedKeyUsages?: ExtendedKeyUsageName[];
  KeyAlgorithm?: KeyAlgorithm;
  KeyUsages?: KeyUsageName[];
  SerialNumber?: string;
  NotAfter?: Date;
  NotBefore?: Date;
}
export interface AcmCertificateMetadata {
  CreatedAt?: Date;
  Exported?: boolean;
  ImportedAt?: Date;
  InUse?: boolean;
  IssuedAt?: Date;
  RenewalEligibility?: RenewalEligibility;
  RevokedAt?: Date;
  Status?: CertificateStatus;
  RenewalStatus?: RenewalStatus;
  Type?: CertificateType;
  ExportOption?: CertificateExport;
  ManagedBy?: CertificateManagedBy;
  ValidationMethod?: ValidationMethod;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
  AcmeEndpointArn?: string;
  AcmeAccountId?: string;
}
export type CertificateMetadata = {
  AcmCertificateMetadata: AcmCertificateMetadata;
};
export interface CertificateSearchResult {
  CertificateArn?: string;
  X509Attributes?: X509Attributes;
  CertificateMetadata?: CertificateMetadata;
}
export type CertificateSearchResultList = CertificateSearchResult[];
export interface SearchCertificatesResponse {
  Results?: CertificateSearchResult[];
  NextToken?: string;
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
export interface UpdateAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
  PrevalidationOptions?: PrevalidationOptions;
}
export interface UpdateAcmeDomainValidationResponse {}
export interface UpdateAcmeEndpointRequest {
  AcmeEndpointArn: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
}
export interface UpdateAcmeEndpointResponse {}
export interface UpdateCertificateOptionsRequest {
  CertificateArn: string;
  Options: CertificateOptions;
}
export interface UpdateCertificateOptionsResponse {}
export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export type ThrottlingReasonList = ThrottlingReason[];
export type ValidationExceptionMessage = string;
export type ServiceErrorMessage = string;
export type AddTagsToCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to an ACM certificate. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a `key` and an optional `value`. You specify the certificate on input by its Amazon Resource Name (ARN). You specify the tag by using a key-value pair.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use TagResource instead.
 *
 * You can apply a tag to just one certificate if you want to identify a specific characteristic of that certificate, or you can apply the same tag to multiple certificates if you want to filter for a common relationship among those certificates. Similarly, you can apply the same tag to multiple resources if you want to specify a relationship among those resources. For example, you can add the same tag to an ACM certificate and an Elastic Load Balancing load balancer to indicate that they are both used by the same website. For more information, see Tagging ACM certificates.
 *
 * To remove one or more tags, use the RemoveTagsFromCertificate action. To view all of the tags that have been applied to the certificate, use the ListTagsForCertificate action.
 */
export const addTagsToCertificate: API.OperationMethod<
  AddTagsToCertificateRequest,
  AddTagsToCertificateResponse,
  AddTagsToCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, Tags: D.list(i_Tag) },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToCertificate",
})) as any;

export type CreateAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain validation for an ACME endpoint. Domain validations authorize the endpoint to issue certificates for specified domain names. You configure prevalidation to prove domain ownership.
 */
export const createAcmeDomainValidation: API.OperationMethod<
  CreateAcmeDomainValidationRequest,
  CreateAcmeDomainValidationResponse,
  CreateAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdempotencyToken: D.m({ idempotency: true }),
      AcmeEndpointArn: 0,
      DomainName: 0,
      PrevalidationOptions: i_PrevalidationOptions,
      Tags: D.list(i_Tag),
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "CreateAcmeDomainValidation",
})) as any;

export type CreateAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ACME endpoint, which is a managed ACME server with a unique endpoint URL. After creation, ACME clients can use the endpoint URL to automate certificate issuance using the ACME protocol.
 */
export const createAcmeEndpoint: API.OperationMethod<
  CreateAcmeEndpointRequest,
  CreateAcmeEndpointResponse,
  CreateAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdempotencyToken: D.m({ idempotency: true }),
      AuthorizationBehavior: 0,
      Contact: 0,
      CertificateAuthority: i_CertificateAuthority,
      Tags: D.list(i_Tag),
      CertificateTags: D.list(i_Tag),
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "CreateAcmeEndpoint",
})) as any;

export type CreateAcmeExternalAccountBindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an external account binding (EAB) for an ACME endpoint. An EAB provides credentials that authorize an ACME client to register an account with the endpoint. Each EAB is associated with an IAM role that controls what certificate operations the ACME client can perform.
 */
export const createAcmeExternalAccountBinding: API.OperationMethod<
  CreateAcmeExternalAccountBindingRequest,
  CreateAcmeExternalAccountBindingResponse,
  CreateAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdempotencyToken: D.m({ idempotency: true }),
      AcmeEndpointArn: 0,
      RoleArn: 0,
      Expiration: { Value: 0, Type: 0 },
      Tags: D.list(i_Tag),
    },
    output: { ExternalAccountBinding: o_AcmeExternalAccountBinding },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "CreateAcmeExternalAccountBinding",
})) as any;

export type DeleteAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain validation. After deletion, the ACME endpoint can no longer issue certificates for the associated domain.
 */
export const deleteAcmeDomainValidation: API.OperationMethod<
  DeleteAcmeDomainValidationRequest,
  DeleteAcmeDomainValidationResponse,
  DeleteAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeDomainValidationArn: 0 },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DeleteAcmeDomainValidation",
})) as any;

export type DeleteAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ACME endpoint. After deletion, the endpoint URL is no longer accessible and ACME clients cannot issue certificates through it. Any existing external account bindings and domain validations associated with the endpoint are also deleted.
 */
export const deleteAcmeEndpoint: API.OperationMethod<
  DeleteAcmeEndpointRequest,
  DeleteAcmeEndpointResponse,
  DeleteAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeEndpointArn: 0 },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DeleteAcmeEndpoint",
})) as any;

export type DeleteAcmeExternalAccountBindingError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an external account binding. Previously fetched credentials for this binding will no longer be usable for account registration. A deleted binding cannot be recovered.
 */
export const deleteAcmeExternalAccountBinding: API.OperationMethod<
  DeleteAcmeExternalAccountBindingRequest,
  DeleteAcmeExternalAccountBindingResponse,
  DeleteAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeExternalAccountBindingArn: 0 },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAcmeExternalAccountBinding",
})) as any;

export type DeleteCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a certificate and its associated private key. If this action succeeds, the certificate is not available for use by Amazon Web Services services integrated with ACM. Deleting a certificate is eventually consistent. The may be a short delay before the certificate no longer appears in the list that can be displayed by calling the ListCertificates action or be retrieved by calling the GetCertificate action.
 *
 * You cannot delete an ACM certificate that is being used by another Amazon Web Services service. To delete a certificate that is in use, you must first remove the certificate association using the console or the CLI for the associated service.
 *
 * Deleting a certificate issued by a private certificate authority (CA) has no effect on the CA. You will continue to be charged for the CA until it is deleted. For more information, see Deleting Your Private CA in the *Private Certificate Authority User Guide*.
 *
 * You cannot delete a certificate with a `CertificateKeyPairOrigin` of `ACME`. ACM automatically deletes these certificates 1 year after they expire.
 *
 * Deleting a certificate issued by a private certificate authority (CA) has no effect on the CA. You will continue to be charged for the CA until it is deleted. For more information, see Deleting your private CA in the *Amazon Web Services Private Certificate Authority User Guide*.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
})) as any;

export type DescribeAcmeAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACME account, including its status, public key thumbprint, and associated external account binding.
 */
export const describeAcmeAccount: API.OperationMethod<
  DescribeAcmeAccountRequest,
  DescribeAcmeAccountResponse,
  DescribeAcmeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeEndpointArn: 0, AccountUrl: 0 },
    output: { AcmeAccount: { CreatedAt: D.ts } },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DescribeAcmeAccount",
})) as any;

export type DescribeAcmeDomainValidationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified domain validation, including its status, domain scope, and DNS resource records required for validation.
 */
export const describeAcmeDomainValidation: API.OperationMethod<
  DescribeAcmeDomainValidationRequest,
  DescribeAcmeDomainValidationResponse,
  DescribeAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeDomainValidationArn: 0 },
    output: { AcmeDomainValidation: { CreatedAt: D.ts, UpdatedAt: D.ts } },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DescribeAcmeDomainValidation",
})) as any;

export type DescribeAcmeEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACME endpoint, including its status, URL, authorization behavior, and certificate authority configuration.
 */
export const describeAcmeEndpoint: API.OperationMethod<
  DescribeAcmeEndpointRequest,
  DescribeAcmeEndpointResponse,
  DescribeAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeEndpointArn: 0 },
    output: { AcmeEndpoint: { CreatedAt: D.ts, UpdatedAt: D.ts } },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DescribeAcmeEndpoint",
})) as any;

export type DescribeAcmeExternalAccountBindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified external account binding, including the associated IAM role, expiration time, and usage history.
 */
export const describeAcmeExternalAccountBinding: API.OperationMethod<
  DescribeAcmeExternalAccountBindingRequest,
  DescribeAcmeExternalAccountBindingResponse,
  DescribeAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeExternalAccountBindingArn: 0 },
    output: { ExternalAccountBinding: o_AcmeExternalAccountBinding },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "DescribeAcmeExternalAccountBinding",
})) as any;

export type DescribeCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACM certificate.
 *
 * If you have just created a certificate using the `RequestCertificate` action, there is a delay of several seconds before you can retrieve information about it.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResponse,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    output: {
      Certificate: {
        CreatedAt: D.ts,
        IssuedAt: D.ts,
        ImportedAt: D.ts,
        RevokedAt: D.ts,
        NotBefore: D.ts,
        NotAfter: D.ts,
        RenewalSummary: { UpdatedAt: D.ts },
        UpdateSummary: { RequestedAt: D.ts, UpdatedAt: D.ts },
      },
    },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
})) as any;

export type ExportCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports a private certificate issued by a private certificate authority (CA) or a public certificate for use anywhere. The exported file contains the certificate, the certificate chain, and the encrypted private key associated with the public key that is embedded in the certificate. For security, you must assign a passphrase for the private key when exporting it.
 *
 * For information about exporting and formatting a certificate using the ACM console or CLI, see Export a private certificate and Export a public certificate.
 *
 * ACM public certificates created prior to June 17, 2025 cannot be exported.
 */
export const exportCertificate: API.OperationMethod<
  ExportCertificateRequest,
  ExportCertificateResponse,
  ExportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, Passphrase: 0 },
    output: { PrivateKey: D.secret },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportCertificate",
})) as any;

export type GetAccountConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the account configuration options associated with an Amazon Web Services account.
 */
export const getAccountConfiguration: API.OperationMethod<
  GetAccountConfigurationRequest,
  GetAccountConfigurationResponse,
  GetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
})) as any;

export type GetAcmeExternalAccountBindingCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the key ID and MAC key credentials for an external account binding. These credentials are used by ACME clients during account registration to bind to the endpoint.
 */
export const getAcmeExternalAccountBindingCredentials: API.OperationMethod<
  GetAcmeExternalAccountBindingCredentialsRequest,
  GetAcmeExternalAccountBindingCredentialsResponse,
  GetAcmeExternalAccountBindingCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeExternalAccountBindingArn: 0 },
    output: { MacKey: D.secret },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "GetAcmeExternalAccountBindingCredentials",
})) as any;

export type GetCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a certificate and its certificate chain. The certificate may be either a public or private certificate issued using the ACM `RequestCertificate` action, or a certificate imported into ACM using the `ImportCertificate` action. The chain consists of the certificate of the issuing CA and the intermediate certificates of any other subordinate CAs. All of the certificates are base64 encoded. You can use OpenSSL to decode the certificates and inspect individual fields.
 */
export const getCertificate: API.OperationMethod<
  GetCertificateRequest,
  GetCertificateResponse,
  GetCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificate",
})) as any;

export type ImportCertificateError =
  | ConflictException
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | LimitExceededException
  | ResourceNotFoundException
  | TagPolicyException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Imports a certificate into Certificate Manager (ACM) to use with services that are integrated with ACM. Note that integrated services allow only certificate types and keys they support to be associated with their resources. Further, their support differs depending on whether the certificate is imported into IAM or into ACM. For more information, see the documentation for each service. For more information about importing certificates into ACM, see Importing Certificates in the *Certificate Manager User Guide*.
 *
 * ACM does not provide managed renewal for certificates that you import.
 *
 * Note the following guidelines when importing third party certificates:
 *
 * - You must enter the private key that matches the certificate you are importing.
 *
 * - The private key must be unencrypted. You cannot import a private key that is protected by a password or a passphrase.
 *
 * - The private key must be no larger than 5 KB (5,120 bytes).
 *
 * - The certificate, private key, and certificate chain must be PEM-encoded.
 *
 * - The current time must be between the `Not Before` and `Not After` certificate fields.
 *
 * - The `Issuer` field must not be empty.
 *
 * - The OCSP authority URL, if present, must not exceed 1000 characters.
 *
 * - To import a new certificate, omit the `CertificateArn` argument. Include this argument only when you want to replace a previously imported certificate.
 *
 * - When you import a certificate by using the CLI, you must specify the certificate, the certificate chain, and the private key by their file names preceded by `fileb://`. For example, you can specify a certificate saved in the `C:\temp` folder as `fileb://C:\temp\certificate_to_import.pem`. If you are making an HTTP or HTTPS Query request, include these arguments as BLOBs.
 *
 * - When you import a certificate by using an SDK, you must specify the certificate, the certificate chain, and the private key files in the manner required by the programming language you're using.
 *
 * - The cryptographic algorithm of an imported certificate must match the algorithm of the signing CA. For example, if the signing CA key type is RSA, then the certificate key type must also be RSA.
 *
 * This operation returns the Amazon Resource Name (ARN) of the imported certificate.
 */
export const importCertificate: API.OperationMethod<
  ImportCertificateRequest,
  ImportCertificateResponse,
  ImportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateArn: 0,
      Certificate: 0,
      PrivateKey: 0,
      CertificateChain: 0,
      Tags: D.list(i_Tag),
    },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    ConflictException,
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    ResourceNotFoundException,
    TagPolicyException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
})) as any;

export type ListAcmeAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of ACME accounts registered with the specified ACME endpoint. ACME accounts are created when clients use external account binding credentials to register.
 */
export const listAcmeAccounts: API.PaginatedOperationMethod<
  ListAcmeAccountsRequest,
  ListAcmeAccountsResponse,
  ListAcmeAccountsError,
  Credentials | HttpClient.HttpClient,
  AcmeAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, AcmeEndpointArn: 0 },
    output: { AcmeAccounts: D.list({ CreatedAt: D.ts }) },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "ListAcmeAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeDomainValidationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of domain validations for the specified ACME endpoint.
 */
export const listAcmeDomainValidations: API.PaginatedOperationMethod<
  ListAcmeDomainValidationsRequest,
  ListAcmeDomainValidationsResponse,
  ListAcmeDomainValidationsError,
  Credentials | HttpClient.HttpClient,
  AcmeDomainValidationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, AcmeEndpointArn: 0 },
    output: {
      AcmeDomainValidations: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "ListAcmeDomainValidations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeDomainValidations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of ACME endpoints in your account. Use this operation to view all configured ACME endpoints and their current status.
 */
export const listAcmeEndpoints: API.PaginatedOperationMethod<
  ListAcmeEndpointsRequest,
  ListAcmeEndpointsResponse,
  ListAcmeEndpointsError,
  Credentials | HttpClient.HttpClient,
  AcmeEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { AcmeEndpoints: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcmeEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeExternalAccountBindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of external account bindings for the specified ACME endpoint.
 */
export const listAcmeExternalAccountBindings: API.PaginatedOperationMethod<
  ListAcmeExternalAccountBindingsRequest,
  ListAcmeExternalAccountBindingsResponse,
  ListAcmeExternalAccountBindingsError,
  Credentials | HttpClient.HttpClient,
  AcmeExternalAccountBindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, AcmeEndpointArn: 0 },
    output: {
      ExternalAccountBindings: D.list({
        ExpiresAt: D.ts,
        RevokedAt: D.ts,
        LastUsedAt: D.ts,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "ListAcmeExternalAccountBindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExternalAccountBindings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCertificateDomainValidationsError =
  | AccessDeniedException
  | InvalidArgsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns per-domain validation summaries for an ACM certificate. Each summary includes the domain name, the active validation configuration, and the requested validation configuration when a validation method migration is in progress. You can use the results to monitor the progress of an email-to-DNS validation migration and to retrieve the CNAME records required for DNS validation.
 */
export const listCertificateDomainValidations: API.PaginatedOperationMethod<
  ListCertificateDomainValidationsRequest,
  ListCertificateDomainValidationsResponse,
  ListCertificateDomainValidationsError,
  Credentials | HttpClient.HttpClient,
  DomainValidationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, NextToken: 0, MaxItems: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateDomainValidations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainValidationSummaryList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCertificatesError =
  | InvalidArgsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of certificate ARNs and domain names. You can request that only certificates that match a specific status be listed. You can also filter by specific attributes of the certificate. Default filtering returns only `RSA_2048` certificates. For more information, see Filters.
 *
 * By default, this action does not return certificates with a `CertificateKeyPairOrigin` of `ACME`. To include ACME certificates, specify `ACME` in the `CertificateKeyPairOrigins` filter.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  CertificateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateStatuses: 0,
      CertificateKeyPairOrigins: 0,
      Includes: {
        extendedKeyUsage: 0,
        keyUsage: 0,
        keyTypes: 0,
        exportOption: 0,
        managedBy: 0,
      },
      NextToken: 0,
      MaxItems: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      CertificateSummaryList: D.list({
        NotBefore: D.ts,
        NotAfter: D.ts,
        CreatedAt: D.ts,
        IssuedAt: D.ts,
        ImportedAt: D.ts,
        RevokedAt: D.ts,
      }),
    },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [InvalidArgsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CertificateSummaryList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that have been applied to the ACM certificate. Use the certificate's Amazon Resource Name (ARN) to specify the certificate. To add a tag to an ACM certificate, use the AddTagsToCertificate action. To delete a tag, use the RemoveTagsFromCertificate action.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use ListTagsForResource instead.
 */
export const listTagsForCertificate: API.OperationMethod<
  ListTagsForCertificateRequest,
  ListTagsForCertificateResponse,
  ListTagsForCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForCertificate",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an ACM resource.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use ListTagsForCertificate instead.
 *
 * To add one or more tags, use the TagResource action. To remove one or more tags, use the UntagResource action.
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
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutAccountConfigurationError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or modifies account-level configurations in ACM.
 *
 * The supported configuration option is `DaysBeforeExpiry`. This option specifies the number of days prior to certificate expiration when ACM starts generating `EventBridge` events. ACM sends one event per day per certificate until the certificate expires. By default, accounts receive events starting 45 days before certificate expiration.
 */
export const putAccountConfiguration: API.OperationMethod<
  PutAccountConfigurationRequest,
  PutAccountConfigurationResponse,
  PutAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExpiryEvents: { DaysBeforeExpiry: 0 }, IdempotencyToken: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountConfiguration",
})) as any;

export type RemoveTagsFromCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove one or more tags from an ACM certificate. A tag consists of a key-value pair. If you do not specify the value portion of the tag when calling this function, the tag will be removed regardless of value. If you specify a value, the tag is removed only if it is associated with the specified value.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use UntagResource instead.
 *
 * To add tags to a certificate, use the AddTagsToCertificate action. To view all of the tags that have been applied to a specific ACM certificate, use the ListTagsForCertificate action.
 */
export const removeTagsFromCertificate: API.OperationMethod<
  RemoveTagsFromCertificateRequest,
  RemoveTagsFromCertificateResponse,
  RemoveTagsFromCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, Tags: D.list(i_Tag) },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromCertificate",
})) as any;

export type RenewCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Renews an eligible ACM certificate. In order to renew your Amazon Web Services Private CA certificates with ACM, you must first grant the ACM service principal permission to do so. For more information, see Testing Managed Renewal in the ACM User Guide.
 */
export const renewCertificate: API.OperationMethod<
  RenewCertificateRequest,
  RenewCertificateResponse,
  RenewCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewCertificate",
})) as any;

export type RequestCertificateError =
  | InvalidArnException
  | InvalidDomainValidationOptionsException
  | InvalidParameterException
  | InvalidTagException
  | LimitExceededException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Requests an ACM certificate for use with other Amazon Web Services services. To request an ACM certificate, you must specify a fully qualified domain name (FQDN) in the `DomainName` parameter. You can also specify additional FQDNs in the `SubjectAlternativeNames` parameter.
 *
 * If you are requesting a private certificate, domain validation is not required. If you are requesting a public certificate, each domain name that you specify must be validated to verify that you own or control the domain. You can use DNS validation or email validation. We recommend that you use DNS validation.
 *
 * ACM behavior differs from the RFC 6125 specification of the certificate validation process. ACM first checks for a Subject Alternative Name, and, if it finds one, ignores the common name (CN).
 *
 * After successful completion of the `RequestCertificate` action, there is a delay of several seconds before you can retrieve information about the new certificate.
 */
export const requestCertificate: API.OperationMethod<
  RequestCertificateRequest,
  RequestCertificateResponse,
  RequestCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      ValidationMethod: 0,
      SubjectAlternativeNames: 0,
      IdempotencyToken: 0,
      DomainValidationOptions: D.list({ DomainName: 0, ValidationDomain: 0 }),
      Options: i_CertificateOptions,
      CertificateAuthorityArn: 0,
      Tags: D.list(i_Tag),
      KeyAlgorithm: 0,
      ManagedBy: 0,
    },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestCertificate",
})) as any;

export type ResendValidationEmailError =
  | InvalidArnException
  | InvalidDomainValidationOptionsException
  | InvalidStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Resends the email that requests domain ownership validation. The domain owner or an authorized representative must approve the ACM certificate before it can be issued. The certificate can be approved by clicking a link in the mail to navigate to the Amazon certificate approval website and then clicking **I Approve**. However, the validation email can be blocked by spam filters. Therefore, if you do not receive the original mail, you can request that the mail be resent within 72 hours of requesting the ACM certificate. If more than 72 hours have elapsed since your original request or since your last attempt to resend validation mail, you must request a new certificate. For more information about setting up your contact email addresses, see Configure Email for your Domain.
 */
export const resendValidationEmail: API.OperationMethod<
  ResendValidationEmailRequest,
  ResendValidationEmailResponse,
  ResendValidationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, Domain: 0, ValidationDomain: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendValidationEmail",
})) as any;

export type RevokeAcmeAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes an ACME account, preventing it from requesting or revoking certificates. This operation is irreversible.
 */
export const revokeAcmeAccount: API.OperationMethod<
  RevokeAcmeAccountRequest,
  RevokeAcmeAccountResponse,
  RevokeAcmeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeEndpointArn: 0, AccountUrl: 0 },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "RevokeAcmeAccount",
})) as any;

export type RevokeAcmeExternalAccountBindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes an external account binding, preventing new ACME accounts from being registered using this binding. Existing ACME accounts that were previously registered using the binding are not affected and must be revoked separately.
 */
export const revokeAcmeExternalAccountBinding: API.OperationMethod<
  RevokeAcmeExternalAccountBindingRequest,
  RevokeAcmeExternalAccountBindingResponse,
  RevokeAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcmeExternalAccountBindingArn: 0 },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "RevokeAcmeExternalAccountBinding",
})) as any;

export type RevokeCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes a public ACM certificate. You can only revoke certificates that have been previously exported.
 *
 * Once a certificate is revoked, you cannot reuse the certificate. Revoking a certificate is permanent.
 */
export const revokeCertificate: API.OperationMethod<
  RevokeCertificateRequest,
  RevokeCertificateResponse,
  RevokeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, RevocationReason: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeCertificate",
})) as any;

export type SearchCertificatesError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of certificates matching search criteria. You can filter certificates by X.509 attributes and ACM specific properties like certificate status, type and renewal eligibility. This operation provides more flexible filtering than ListCertificates by supporting complex filter statements.
 */
export const searchCertificates: API.PaginatedOperationMethod<
  SearchCertificatesRequest,
  SearchCertificatesResponse,
  SearchCertificatesError,
  Credentials | HttpClient.HttpClient,
  CertificateSearchResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FilterStatement: i_CertificateFilterStatement,
      MaxResults: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      Results: D.list({
        X509Attributes: { NotAfter: D.ts, NotBefore: D.ts },
        CertificateMetadata: {
          AcmCertificateMetadata: {
            CreatedAt: D.ts,
            ImportedAt: D.ts,
            IssuedAt: D.ts,
            RevokedAt: D.ts,
          },
        },
      }),
    },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to an ACM resource. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a `key` and an optional `value`.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use AddTagsToCertificate instead.
 *
 * To remove one or more tags, use the UntagResource action. To view all of the tags that have been applied to a resource, use the ListTagsForResource action.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from an ACM resource.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use RemoveTagsFromCertificate instead.
 *
 * To add one or more tags, use the TagResource action. To view all of the tags that have been applied to a resource, use the ListTagsForResource action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, TagKeys: 0 },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the prevalidation configuration of an existing domain validation.
 */
export const updateAcmeDomainValidation: API.OperationMethod<
  UpdateAcmeDomainValidationRequest,
  UpdateAcmeDomainValidationResponse,
  UpdateAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcmeDomainValidationArn: 0,
      PrevalidationOptions: i_PrevalidationOptions,
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "UpdateAcmeDomainValidation",
})) as any;

export type UpdateAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing ACME endpoint. You can change the authorization behavior, contact requirement, or certificate authority settings.
 */
export const updateAcmeEndpoint: API.OperationMethod<
  UpdateAcmeEndpointRequest,
  UpdateAcmeEndpointResponse,
  UpdateAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcmeEndpointArn: 0,
      AuthorizationBehavior: 0,
      Contact: 0,
      CertificateAuthority: i_CertificateAuthority,
    },
    staticContext: { ServiceType: { value: "ACM-ACME" } },
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
  operationName: "UpdateAcmeEndpoint",
})) as any;

export type UpdateCertificateOptionsError =
  | ConflictException
  | InvalidArnException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates certificate options. You can use this operation to change the domain validation method or specify whether to export your certificate. For more information, see Migrate from email to DNS validation and Certificate Manager Exportable Managed Certificates.
 */
export const updateCertificateOptions: API.OperationMethod<
  UpdateCertificateOptionsRequest,
  UpdateCertificateOptionsResponse,
  UpdateCertificateOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateArn: 0, Options: i_CertificateOptions },
    staticContext: { ServiceType: { value: "ACM" } },
  },
  errors: [
    ConflictException,
    InvalidArnException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificateOptions",
})) as any;

const i_CertificateAuthority: D.LazyStruct = () => ({
  PublicCertificateAuthority: { AllowedKeyAlgorithms: 0 },
});
const i_CertificateFilterStatement: D.LazyStruct = () => ({
  And: D.list(i_CertificateFilterStatement),
  Or: D.list(i_CertificateFilterStatement),
  Not: i_CertificateFilterStatement,
  Filter: {
    CertificateArn: 0,
    X509AttributeFilter: {
      Subject: { CommonName: { Value: 0, ComparisonOperator: 0 } },
      SubjectAlternativeName: { DnsName: { Value: 0, ComparisonOperator: 0 } },
      ExtendedKeyUsage: 0,
      KeyUsage: 0,
      KeyAlgorithm: 0,
      SerialNumber: 0,
      NotAfter: i_TimestampRange,
      NotBefore: i_TimestampRange,
    },
    AcmCertificateMetadataFilter: {
      Status: 0,
      RenewalStatus: 0,
      Type: 0,
      InUse: 0,
      Exported: 0,
      ExportOption: 0,
      ManagedBy: 0,
      ValidationMethod: 0,
      CertificateKeyPairOrigin: 0,
      AcmeEndpointArn: 0,
      AcmeAccountId: 0,
    },
  },
});
const i_CertificateOptions: D.LazyStruct = () => ({
  CertificateTransparencyLoggingPreference: 0,
  Export: 0,
  ValidationMethod: 0,
});
const i_PrevalidationOptions: D.LazyStruct = () => ({
  DnsPrevalidation: {
    DomainScope: { ExactDomain: 0, Subdomains: 0, Wildcards: 0 },
    HostedZoneId: 0,
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AcmeExternalAccountBinding: D.LazyStruct = () => ({
  ExpiresAt: D.ts,
  RevokedAt: D.ts,
  LastUsedAt: D.ts,
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
const i_TimestampRange: D.LazyStruct = () => ({ Start: 0, End: 0 });
