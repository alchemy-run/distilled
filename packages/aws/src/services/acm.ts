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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "ACM", serviceShapeName: "CertificateManager" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "acm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-12-08");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, Endpoint, UseFIPS = false, UseDualStack = false, ServiceType } = p;
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
            return err("FIPS endpoints are not available for ACME operations");
          }
          return e(
            `https://acm-acme.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return err("ACME operations are only available in commercial AWS partitions");
      }
      if (UseFIPS === true && UseDualStack === true) {
        return e(`https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
      }
      if (UseFIPS === true) {
        if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
          return e(`https://acm.${Region}.amazonaws.com`);
        }
        return e(`https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
      if (UseDualStack === true) {
        return e(`https://acm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
      }
      return e(`https://acm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
    }
  }
  return err("Region must be set to resolve an endpoint.");
}, '{"url":"https://acm.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.Retryable(),
  ).pipe(C.withRetryableError) {}
export class InvalidArgsException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgsException>()("InvalidArgsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()("InvalidArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidDomainValidationOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidDomainValidationOptionsException>()(
    "InvalidDomainValidationOptionsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()("InvalidStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()("InvalidTagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withQuotaError) {}
export class RequestInProgressException
  extends /*@__PURE__*/ S.TaggedError<RequestInProgressException>()("RequestInProgressException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()("TagPolicyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      throttlingReasons: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type PrevalidationOptions = { DnsPrevalidation: DnsPrevalidationOptions };
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
export type PublicKeyAlgorithm = "RSA_2048" | "EC_prime256v1" | "EC_secp384r1" | (string & {});
export type PublicKeyAlgorithmList = PublicKeyAlgorithm[];
export interface PublicCertificateAuthority {
  AllowedKeyAlgorithms?: PublicKeyAlgorithm[];
}
export type CertificateAuthority = { PublicCertificateAuthority: PublicCertificateAuthority };
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
export type AcmeAccountStatus = "VALID" | "DEACTIVATED" | "REVOKED" | (string & {});
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
export type PrevalidationDetails = { DnsPrevalidation: DnsPrevalidationDetails };
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
export type AcmeEndpointStatus = "CREATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
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
export type DomainStatus = "PENDING_VALIDATION" | "SUCCESS" | "FAILED" | (string & {});
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
export type CertificateType = "IMPORTED" | "AMAZON_ISSUED" | "PRIVATE" | (string & {});
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
export type CertificateTransparencyLoggingPreference = "ENABLED" | "DISABLED" | (string & {});
export type CertificateExport = "ENABLED" | "DISABLED" | (string & {});
export interface CertificateOptions {
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference;
  Export?: CertificateExport;
  ValidationMethod?: ValidationMethod;
}
export type UpdateStatus = "PENDING_DOMAIN_VALIDATION" | "SUCCESS" | "FAILED" | (string & {});
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
export type CertificateKeyPairOrigin = "AWS_MANAGED" | "ACME" | "CUSTOMER_PROVIDED" | (string & {});
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
export type AcmeExternalAccountBindingList = AcmeExternalAccountBindingSummary[];
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
  | { EmailValidationChallenge: EmailValidationChallenge; DnsValidationChallenge?: never }
  | { EmailValidationChallenge?: never; DnsValidationChallenge: DnsValidationChallenge };
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
  | { CertificateArn: string; X509AttributeFilter?: never; AcmCertificateMetadataFilter?: never }
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
  | { And: CertificateFilterStatement[]; Or?: never; Not?: never; Filter?: never }
  | { And?: never; Or: CertificateFilterStatement[]; Not?: never; Filter?: never }
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
export type SearchCertificatesSortOrder = "ASCENDING" | "DESCENDING" | (string & {});
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
export type CertificateMetadata = { AcmCertificateMetadata: AcmCertificateMetadata };
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
  input: __S(32, __c1, 0) as any as S.Schema<AddTagsToCertificateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<AddTagsToCertificateResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<CreateAcmeDomainValidationRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<CreateAcmeDomainValidationResponse>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<CreateAcmeEndpointRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<CreateAcmeEndpointResponse>,
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
}));

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
  input: __S(321, __c10, 1) as any as S.Schema<CreateAcmeExternalAccountBindingRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<CreateAcmeExternalAccountBindingResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeleteAcmeDomainValidationRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteAcmeDomainValidationResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<DeleteAcmeEndpointRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteAcmeEndpointResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DeleteAcmeExternalAccountBindingRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteAcmeExternalAccountBindingResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAcmeExternalAccountBinding",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteCertificateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteCertificateResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DescribeAcmeAccountRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<DescribeAcmeAccountResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DescribeAcmeDomainValidationRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<DescribeAcmeDomainValidationResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DescribeAcmeEndpointRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<DescribeAcmeEndpointResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DescribeAcmeExternalAccountBindingRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<DescribeAcmeExternalAccountBindingResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DescribeCertificateRequest>,
  output: __S(844, __c26, 12) as any as S.Schema<DescribeCertificateResponse>,
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<ExportCertificateRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<ExportCertificateResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<GetAccountConfigurationRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<GetAccountConfigurationResponse>,
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<GetAcmeExternalAccountBindingCredentialsRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<GetAcmeExternalAccountBindingCredentialsResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<GetCertificateRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<GetCertificateResponse>,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificate",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<ImportCertificateRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<ImportCertificateResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<ListAcmeAccountsRequest>,
  output: __S(1122, __c35, 2) as any as S.Schema<ListAcmeAccountsResponse>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListAcmeDomainValidationsRequest>,
  output: __S(1154, __c36, 2) as any as S.Schema<ListAcmeDomainValidationsResponse>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListAcmeEndpointsRequest>,
  output: __S(1186, __c37, 2) as any as S.Schema<ListAcmeEndpointsResponse>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListAcmeExternalAccountBindingsRequest>,
  output: __S(1218, __c38, 2) as any as S.Schema<ListAcmeExternalAccountBindingsResponse>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListCertificateDomainValidationsRequest>,
  output: __S(1255, __c39, 7) as any as S.Schema<ListCertificateDomainValidationsResponse>,
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

export type ListCertificatesError = InvalidArgsException | ValidationException | CommonErrors;
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
  input: __S(1281, __c40, 1) as any as S.Schema<ListCertificatesRequest>,
  output: __S(1284, __c40, 4) as any as S.Schema<ListCertificatesResponse>,
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
  input: __S(1312, __c41, 0) as any as S.Schema<ListTagsForCertificateRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<ListTagsForCertificateResponse>,
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForCertificate",
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<PutAccountConfigurationRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<PutAccountConfigurationResponse>,
  errors: [AccessDeniedException, ConflictException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountConfiguration",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<RemoveTagsFromCertificateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RemoveTagsFromCertificateResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<RenewCertificateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RenewCertificateResponse>,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewCertificate",
}));

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
  input: __S(1506, __c47, 2) as any as S.Schema<RequestCertificateRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<RequestCertificateResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<ResendValidationEmailRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<ResendValidationEmailResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<RevokeAcmeAccountRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RevokeAcmeAccountResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<RevokeAcmeExternalAccountBindingRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RevokeAcmeExternalAccountBindingResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<RevokeCertificateRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<RevokeCertificateResponse>,
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
}));

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
  input: __S(1673, __c52, 9) as any as S.Schema<SearchCertificatesRequest>,
  output: __S(1684, __c52, 20) as any as S.Schema<SearchCertificatesResponse>,
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
  input: __S(1696, __c53, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(1728, __c54, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<UpdateAcmeDomainValidationRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UpdateAcmeDomainValidationResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<UpdateAcmeEndpointRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UpdateAcmeEndpointResponse>,
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
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<UpdateCertificateOptionsRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UpdateCertificateOptionsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
      ).annotate({ identifier: "ThrottlingReason" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, Tags: __S(65, __c2, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "AddTagsToCertificateRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AddTagsToCertificateResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          AcmeEndpointArn: S.String,
          DomainName: S.String,
          PrevalidationOptions: __S(193, __c6, 1),
          Tags: S.optional(__S(65, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "CreateAcmeDomainValidationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AcmeDomainValidationArn: S.String })).annotate({
        identifier: "CreateAcmeDomainValidationResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExactDomain: S.optional(S.String),
          Subdomains: S.optional(S.String),
          Wildcards: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainScope" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainScope: S.optional(__S(160, __c5, 0)),
          HostedZoneId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnsPrevalidationOptions" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ DnsPrevalidation: __S(192, __c6, 0) })]);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          AuthorizationBehavior: S.String,
          Contact: S.optional(S.String),
          CertificateAuthority: __S(289, __c9, 1),
          Tags: S.optional(__S(65, __c2, 1)),
          CertificateTags: S.optional(__S(65, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "CreateAcmeEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AcmeEndpointArn: S.optional(S.String) })).annotate({
        identifier: "CreateAcmeEndpointResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AllowedKeyAlgorithms: S.optional(__S(256, __c8, 0)) }),
      ).annotate({ identifier: "PublicCertificateAuthority" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ PublicCertificateAuthority: __S(288, __c9, 0) })]);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.Number, Type: S.String })).annotate({
        identifier: "Expiration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          AcmeEndpointArn: S.String,
          RoleArn: S.String,
          Expiration: S.optional(__S(320, __c10, 0)),
          Tags: S.optional(__S(65, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "CreateAcmeExternalAccountBindingRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExternalAccountBinding: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "CreateAcmeExternalAccountBindingResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcmeExternalAccountBindingArn: S.optional(S.String),
          AcmeEndpointArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUsedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AcmeExternalAccountBinding" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeDomainValidationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAcmeDomainValidationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeEndpointArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAcmeEndpointRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAcmeExternalAccountBindingRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteCertificateRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeEndpointArn: S.String, AccountUrl: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeAcmeAccountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AcmeAccount: S.optional(__S(608, __c19, 0)) })).annotate({
        identifier: "DescribeAcmeAccountResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountUrl: S.optional(S.String),
          PublicKeyThumbprint: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AcmeExternalAccountBindingArn: S.optional(S.String),
          Contacts: S.optional(__S(576, __c18, 0)),
        }),
      ).annotate({ identifier: "AcmeAccount" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeDomainValidationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeAcmeDomainValidationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AcmeDomainValidation: S.optional(__S(707, __c22, 3)) }),
      ).annotate({ identifier: "DescribeAcmeDomainValidationResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Type: S.String, Value: S.String }),
      ).annotate({ identifier: "ResourceRecord" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainScope: S.optional(__S(160, __c5, 0)),
          HostedZoneId: S.optional(S.String),
          ResourceRecord: S.optional(__S(672, __c21, 0)),
        }),
      ).annotate({ identifier: "DnsPrevalidationDetails" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ DnsPrevalidation: __S(704, __c22, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ Reason: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "FailureDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AcmeDomainValidationArn: S.optional(S.String),
          AcmeEndpointArn: S.optional(S.String),
          DomainName: S.optional(S.String),
          PrevalidationType: S.optional(S.String),
          PrevalidationDetails: S.optional(__S(705, __c22, 1)),
          Status: S.optional(S.String),
          FailureDetails: S.optional(__S(706, __c22, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AcmeDomainValidation" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeEndpointArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeAcmeEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AcmeEndpoint: S.optional(__S(768, __c24, 0)) })).annotate({
        identifier: "DescribeAcmeEndpointResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcmeEndpointArn: S.optional(S.String),
          EndpointUrl: S.optional(S.String),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
          AuthorizationBehavior: S.optional(S.String),
          Contact: S.optional(S.String),
          CertificateAuthority: S.optional(__S(289, __c9, 1)),
          CertificateTags: S.optional(__S(65, __c2, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AcmeEndpoint" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeAcmeExternalAccountBindingRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RedirectFrom: S.optional(S.String), RedirectTo: S.optional(S.String) }),
      ).annotate({ identifier: "HttpRedirect" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ValidationEmails: S.optional(__S(576, __c18, 0)),
          ValidationDomain: S.optional(S.String),
          ValidationStatus: S.optional(S.String),
          ResourceRecord: S.optional(__S(672, __c21, 0)),
          HttpRedirect: S.optional(__S(833, __c26, 1)),
          ValidationMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainValidation" });
    case 3:
      return S.Array(__S(834, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RenewalStatus: S.String,
          DomainValidationOptions: __S(835, __c26, 3),
          RenewalStatusReason: S.optional(S.String),
          UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "RenewalSummary" });
    case 5:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "KeyUsage",
      });
    case 6:
      return S.Array(__S(837, __c26, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), OID: S.optional(S.String) }),
      ).annotate({ identifier: "ExtendedKeyUsage" });
    case 8:
      return S.Array(__S(839, __c26, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ From: S.optional(S.String), To: S.optional(S.String) }),
      ).annotate({ identifier: "DomainValidationMethodUpdateSummary" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Type: S.optional(S.String),
          DomainValidationMethodUpdateSummary: S.optional(__S(841, __c26, 9)),
          RequestedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateSummary" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          DomainName: S.optional(S.String),
          SubjectAlternativeNames: S.optional(__S(576, __c18, 0)),
          ManagedBy: S.optional(S.String),
          DomainValidationOptions: S.optional(__S(835, __c26, 3)),
          Serial: S.optional(S.String),
          Subject: S.optional(S.String),
          Issuer: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RevocationReason: S.optional(S.String),
          NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KeyAlgorithm: S.optional(S.String),
          SignatureAlgorithm: S.optional(S.String),
          InUseBy: S.optional(__S(576, __c18, 0)),
          FailureReason: S.optional(S.String),
          Type: S.optional(S.String),
          RenewalSummary: S.optional(__S(836, __c26, 4)),
          KeyUsages: S.optional(__S(838, __c26, 6)),
          ExtendedKeyUsages: S.optional(__S(840, __c26, 8)),
          CertificateAuthorityArn: S.optional(S.String),
          RenewalEligibility: S.optional(S.String),
          Options: S.optional(__S(864, __c27, 0)),
          UpdateSummary: S.optional(__S(842, __c26, 10)),
          CertificateKeyPairOrigin: S.optional(S.String),
          AcmeEndpointArn: S.optional(S.String),
          AcmeAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateDetail" });
    case 12:
      return S.suspend(() => S.Struct({ Certificate: S.optional(__S(843, __c26, 11)) })).annotate({
        identifier: "DescribeCertificateResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateTransparencyLoggingPreference: S.optional(S.String),
          Export: S.optional(S.String),
          ValidationMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateOptions" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, Passphrase: SensitiveBlob }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ExportCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Certificate: S.optional(S.String),
          CertificateChain: S.optional(S.String),
          PrivateKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ExportCertificateResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "GetAccountConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ExpiryEvents: S.optional(__S(960, __c30, 0)) })).annotate({
        identifier: "GetAccountConfigurationResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DaysBeforeExpiry: S.optional(S.Number) })).annotate({
        identifier: "ExpiryEventsConfiguration",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "GetAcmeExternalAccountBindingCredentialsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ KeyId: S.optional(S.String), MacKey: S.optional(SensitiveString) }),
      ).annotate({ identifier: "GetAcmeExternalAccountBindingCredentialsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "GetCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Certificate: S.optional(S.String), CertificateChain: S.optional(S.String) }),
      ).annotate({ identifier: "GetCertificateResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          Certificate: T.Blob,
          PrivateKey: SensitiveBlob,
          CertificateChain: S.optional(T.Blob),
          Tags: S.optional(__S(65, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ImportCertificateRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CertificateArn: S.optional(S.String) })).annotate({
        identifier: "ImportCertificateResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AcmeEndpointArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "ListAcmeAccountsRequest" });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AcmeAccounts: S.optional(__S(1121, __c35, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAcmeAccountsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AcmeEndpointArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "ListAcmeDomainValidationsRequest" });
    case 1:
      return S.Array(__S(707, __c22, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AcmeDomainValidations: S.optional(__S(1153, __c36, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAcmeDomainValidationsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "ListAcmeEndpointsRequest" });
    case 1:
      return S.Array(__S(768, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AcmeEndpoints: S.optional(__S(1185, __c37, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAcmeEndpointsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AcmeEndpointArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "ListAcmeExternalAccountBindingsRequest" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ExternalAccountBindings: S.optional(__S(1217, __c38, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAcmeExternalAccountBindingsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.String,
          NextToken: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ListCertificateDomainValidationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ValidationEmails: S.optional(__S(576, __c18, 0)),
          ValidationDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmailValidationChallenge" });
    case 2:
      return S.suspend(() => S.Struct({ ResourceRecord: S.optional(__S(672, __c21, 0)) })).annotate(
        { identifier: "DnsValidationChallenge" },
      );
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ EmailValidationChallenge: __S(1249, __c39, 1) }),
        /*@__PURE__*/ S.Struct({ DnsValidationChallenge: __S(1250, __c39, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          ValidationMethod: S.optional(S.String),
          ValidationChallenge: S.optional(__S(1251, __c39, 3)),
          ValidationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ValidationConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ActiveValidationConfiguration: S.optional(__S(1252, __c39, 4)),
          RequestedValidationConfiguration: S.optional(__S(1252, __c39, 4)),
        }),
      ).annotate({ identifier: "DomainValidationSummary" });
    case 6:
      return S.Array(__S(1253, __c39, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DomainValidationSummaryList: S.optional(__S(1254, __c39, 6)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCertificateDomainValidationsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          extendedKeyUsage: S.optional(__S(256, __c8, 0)),
          keyUsage: S.optional(__S(256, __c8, 0)),
          keyTypes: S.optional(__S(256, __c8, 0)),
          exportOption: S.optional(S.String),
          managedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CertificateStatuses: S.optional(__S(256, __c8, 0)),
          CertificateKeyPairOrigins: S.optional(__S(256, __c8, 0)),
          Includes: S.optional(__S(1280, __c40, 0)),
          NextToken: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ListCertificatesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          DomainName: S.optional(S.String),
          SubjectAlternativeNameSummaries: S.optional(__S(576, __c18, 0)),
          HasAdditionalSubjectAlternativeNames: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
          KeyAlgorithm: S.optional(S.String),
          KeyUsages: S.optional(__S(256, __c8, 0)),
          ExtendedKeyUsages: S.optional(__S(256, __c8, 0)),
          ExportOption: S.optional(S.String),
          InUse: S.optional(S.Boolean),
          Exported: S.optional(S.Boolean),
          RenewalEligibility: S.optional(S.String),
          NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ManagedBy: S.optional(S.String),
          CertificateKeyPairOrigin: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateSummary" });
    case 3:
      return S.Array(__S(1282, __c40, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CertificateSummaryList: S.optional(__S(1283, __c40, 3)),
        }),
      ).annotate({ identifier: "ListCertificatesResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForCertificateRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(65, __c2, 1)) })).annotate({
        identifier: "ListTagsForCertificateResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExpiryEvents: S.optional(__S(960, __c30, 0)), IdempotencyToken: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "PutAccountConfigurationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, Tags: __S(65, __c2, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "RemoveTagsFromCertificateRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "RenewCertificateRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, ValidationDomain: S.String }),
      ).annotate({ identifier: "DomainValidationOption" });
    case 1:
      return S.Array(__S(1504, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ValidationMethod: S.optional(S.String),
          SubjectAlternativeNames: S.optional(__S(576, __c18, 0)),
          IdempotencyToken: S.optional(S.String),
          DomainValidationOptions: S.optional(__S(1505, __c47, 1)),
          Options: S.optional(__S(864, __c27, 0)),
          CertificateAuthorityArn: S.optional(S.String),
          Tags: S.optional(__S(65, __c2, 1)),
          KeyAlgorithm: S.optional(S.String),
          ManagedBy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "RequestCertificateRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, Domain: S.String, ValidationDomain: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "ResendValidationEmailRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeEndpointArn: S.String, AccountUrl: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "RevokeAcmeAccountRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "RevokeAcmeExternalAccountBindingRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, RevocationReason: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "RevokeCertificateRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(1672, __c52, 8)).annotate({
          identifier: "CertificateFilterStatement",
        }),
      );
    case 1:
      return S.suspend(() => S.Struct({ Value: S.String, ComparisonOperator: S.String })).annotate({
        identifier: "CommonNameFilter",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ CommonName: __S(1665, __c52, 1) })]);
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ DnsName: __S(1665, __c52, 1) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimestampRange" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Subject: __S(1666, __c52, 2) }),
        /*@__PURE__*/ S.Struct({ SubjectAlternativeName: __S(1667, __c52, 3) }),
        /*@__PURE__*/ S.Struct({ ExtendedKeyUsage: S.String }),
        /*@__PURE__*/ S.Struct({ KeyUsage: S.String }),
        /*@__PURE__*/ S.Struct({ KeyAlgorithm: S.String }),
        /*@__PURE__*/ S.Struct({ SerialNumber: S.String }),
        /*@__PURE__*/ S.Struct({ NotAfter: __S(1668, __c52, 4) }),
        /*@__PURE__*/ S.Struct({ NotBefore: __S(1668, __c52, 4) }),
      ]);
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Status: S.String }),
        /*@__PURE__*/ S.Struct({ RenewalStatus: S.String }),
        /*@__PURE__*/ S.Struct({ Type: S.String }),
        /*@__PURE__*/ S.Struct({ InUse: S.Boolean }),
        /*@__PURE__*/ S.Struct({ Exported: S.Boolean }),
        /*@__PURE__*/ S.Struct({ ExportOption: S.String }),
        /*@__PURE__*/ S.Struct({ ManagedBy: S.String }),
        /*@__PURE__*/ S.Struct({ ValidationMethod: S.String }),
        /*@__PURE__*/ S.Struct({ CertificateKeyPairOrigin: S.String }),
        /*@__PURE__*/ S.Struct({ AcmeEndpointArn: S.String }),
        /*@__PURE__*/ S.Struct({ AcmeAccountId: S.String }),
      ]);
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ CertificateArn: S.String }),
        /*@__PURE__*/ S.Struct({ X509AttributeFilter: __S(1669, __c52, 5) }),
        /*@__PURE__*/ S.Struct({ AcmCertificateMetadataFilter: __S(1670, __c52, 6) }),
      ]);
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          And: /*@__PURE__*/ S.suspend(() => __S(1664, __c52, 0)).annotate({
            identifier: "CertificateFilterStatementList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          Or: /*@__PURE__*/ S.suspend(() => __S(1664, __c52, 0)).annotate({
            identifier: "CertificateFilterStatementList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          Not: /*@__PURE__*/ S.suspend(() => __S(1672, __c52, 8)).annotate({
            identifier: "CertificateFilterStatement",
          }),
        }),
        /*@__PURE__*/ S.Struct({ Filter: __S(1671, __c52, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          FilterStatement: S.optional(__S(1672, __c52, 8)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "SearchCertificatesRequest" });
    case 10:
      return S.suspend(() =>
        S.Struct({ ObjectIdentifier: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "CustomAttribute" });
    case 11:
      return S.Array(__S(1674, __c52, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          CommonName: S.optional(S.String),
          DomainComponents: S.optional(__S(576, __c18, 0)),
          Country: S.optional(S.String),
          CustomAttributes: S.optional(__S(1675, __c52, 11)),
          DistinguishedNameQualifier: S.optional(S.String),
          GenerationQualifier: S.optional(S.String),
          GivenName: S.optional(S.String),
          Initials: S.optional(S.String),
          Locality: S.optional(S.String),
          Organization: S.optional(S.String),
          OrganizationalUnit: S.optional(S.String),
          Pseudonym: S.optional(S.String),
          SerialNumber: S.optional(S.String),
          State: S.optional(S.String),
          Surname: S.optional(S.String),
          Title: S.optional(S.String),
        }),
      ).annotate({ identifier: "DistinguishedName" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DirectoryName: __S(1676, __c52, 12) }),
        /*@__PURE__*/ S.Struct({ DnsName: S.String }),
        /*@__PURE__*/ S.Struct({ IpAddress: S.String }),
        /*@__PURE__*/ S.Struct({ OtherName: __S(1674, __c52, 10) }),
        /*@__PURE__*/ S.Struct({ RegisteredId: S.String }),
        /*@__PURE__*/ S.Struct({ Rfc822Name: S.String }),
        /*@__PURE__*/ S.Struct({ UniformResourceIdentifier: S.String }),
      ]);
    case 14:
      return S.Array(__S(1677, __c52, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Issuer: S.optional(__S(1676, __c52, 12)),
          Subject: S.optional(__S(1676, __c52, 12)),
          SubjectAlternativeNames: S.optional(__S(1678, __c52, 14)),
          ExtendedKeyUsages: S.optional(__S(256, __c8, 0)),
          KeyAlgorithm: S.optional(S.String),
          KeyUsages: S.optional(__S(256, __c8, 0)),
          SerialNumber: S.optional(S.String),
          NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "X509Attributes" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Exported: S.optional(S.Boolean),
          ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InUse: S.optional(S.Boolean),
          IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RenewalEligibility: S.optional(S.String),
          RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          RenewalStatus: S.optional(S.String),
          Type: S.optional(S.String),
          ExportOption: S.optional(S.String),
          ManagedBy: S.optional(S.String),
          ValidationMethod: S.optional(S.String),
          CertificateKeyPairOrigin: S.optional(S.String),
          AcmeEndpointArn: S.optional(S.String),
          AcmeAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AcmCertificateMetadata" });
    case 17:
      return S.Union([/*@__PURE__*/ S.Struct({ AcmCertificateMetadata: __S(1680, __c52, 16) })]);
    case 18:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          X509Attributes: S.optional(__S(1679, __c52, 15)),
          CertificateMetadata: S.optional(__S(1681, __c52, 17)),
        }),
      ).annotate({ identifier: "CertificateSearchResult" });
    case 19:
      return S.Array(__S(1682, __c52, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(1683, __c52, 19)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchCertificatesResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(65, __c2, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(576, __c18, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcmeDomainValidationArn: S.String,
          PrevalidationOptions: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateAcmeDomainValidationRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcmeEndpointArn: S.String,
          AuthorizationBehavior: S.optional(S.String),
          Contact: S.optional(S.String),
          CertificateAuthority: S.optional(__S(289, __c9, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateAcmeEndpointRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, Options: __S(864, __c27, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ServiceType: { value: "ACM" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateCertificateOptionsRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
