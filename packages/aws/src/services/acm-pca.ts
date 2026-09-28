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
  sdkId: "ACM PCA",
  target: "ACMPrivateCA",
  version: "2017-08-22",
  sigv4: "acm-pca",
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
                `https://acm-pca-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://acm-pca.${Region}.amazonaws.com`);
              }
              return e(
                `https://acm-pca-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://acm-pca.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://acm-pca.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CertificateMismatchException
  extends /*@__PURE__*/ TE.TaggedError("CertificateMismatchException")<{
    readonly message?: string;
  }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class InvalidArgsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgsException")<{
    readonly message?: string;
  }> {}
export class InvalidArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArnException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidPolicyException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPolicyException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
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
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class LockoutPreventedException
  extends /*@__PURE__*/ TE.TaggedError("LockoutPreventedException")<{
    readonly message?: string;
  }> {}
export class MalformedCertificateException
  extends /*@__PURE__*/ TE.TaggedError("MalformedCertificateException")<{
    readonly message?: string;
  }> {}
export class MalformedCSRException
  extends /*@__PURE__*/ TE.TaggedError("MalformedCSRException")<{
    readonly message?: string;
  }> {}
export class PermissionAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("PermissionAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class RequestAlreadyProcessedException
  extends /*@__PURE__*/ TE.TaggedError("RequestAlreadyProcessedException")<{
    readonly message?: string;
  }> {}
export class RequestFailedException
  extends /*@__PURE__*/ TE.TaggedError("RequestFailedException")<{
    readonly message?: string;
  }> {}
export class RequestInProgressException
  extends /*@__PURE__*/ TE.TaggedError("RequestInProgressException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export type KeyAlgorithm =
  | "RSA_2048"
  | "RSA_3072"
  | "RSA_4096"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | "EC_secp521r1"
  | "ML_DSA_44"
  | "ML_DSA_65"
  | "ML_DSA_87"
  | "SM2"
  | (string & {});
export type SigningAlgorithm =
  | "SHA256WITHECDSA"
  | "SHA384WITHECDSA"
  | "SHA512WITHECDSA"
  | "SHA256WITHRSA"
  | "SHA384WITHRSA"
  | "SHA512WITHRSA"
  | "SHA256WITHRSA_PSS"
  | "SHA384WITHRSA_PSS"
  | "SHA512WITHRSA_PSS"
  | "SM3WITHSM2"
  | "ML_DSA_44"
  | "ML_DSA_65"
  | "ML_DSA_87"
  | (string & {});
export type CountryCodeString = string;
export type String64 = string;
export type ASN1PrintableString64 = string;
export type String128 = string;
export type String40 = string;
export type String16 = string;
export type String5 = string;
export type String3 = string;
export type CustomObjectIdentifier = string;
export type String1To256 = string;
export interface CustomAttribute {
  ObjectIdentifier: string;
  Value: string;
}
export type CustomAttributeList = CustomAttribute[];
export interface ASN1Subject {
  Country?: string;
  Organization?: string;
  OrganizationalUnit?: string;
  DistinguishedNameQualifier?: string;
  State?: string;
  CommonName?: string;
  SerialNumber?: string;
  Locality?: string;
  Title?: string;
  Surname?: string;
  GivenName?: string;
  Initials?: string;
  Pseudonym?: string;
  GenerationQualifier?: string;
  CustomAttributes?: CustomAttribute[];
}
export interface KeyUsage {
  DigitalSignature?: boolean;
  NonRepudiation?: boolean;
  KeyEncipherment?: boolean;
  DataEncipherment?: boolean;
  KeyAgreement?: boolean;
  KeyCertSign?: boolean;
  CRLSign?: boolean;
  EncipherOnly?: boolean;
  DecipherOnly?: boolean;
}
export type AccessMethodType =
  | "CA_REPOSITORY"
  | "RESOURCE_PKI_MANIFEST"
  | "RESOURCE_PKI_NOTIFY"
  | (string & {});
export interface AccessMethod {
  CustomObjectIdentifier?: string;
  AccessMethodType?: AccessMethodType;
}
export type String256 = string;
export interface OtherName {
  TypeId: string;
  Value: string;
}
export type String253 = string;
export interface EdiPartyName {
  PartyName: string;
  NameAssigner?: string;
}
export type String39 = string;
export interface GeneralName {
  OtherName?: OtherName;
  Rfc822Name?: string;
  DnsName?: string;
  DirectoryName?: ASN1Subject;
  EdiPartyName?: EdiPartyName;
  UniformResourceIdentifier?: string;
  IpAddress?: string;
  RegisteredId?: string;
}
export interface AccessDescription {
  AccessMethod: AccessMethod;
  AccessLocation: GeneralName;
}
export type AccessDescriptionList = AccessDescription[];
export interface CsrExtensions {
  KeyUsage?: KeyUsage;
  SubjectInformationAccess?: AccessDescription[];
}
export interface CertificateAuthorityConfiguration {
  KeyAlgorithm: KeyAlgorithm;
  SigningAlgorithm: SigningAlgorithm;
  Subject: ASN1Subject;
  CsrExtensions?: CsrExtensions;
}
export type Integer1To5000 = number;
export type CnameString = string;
export type S3BucketName3To255 = string;
export type S3ObjectAcl =
  | "PUBLIC_READ"
  | "BUCKET_OWNER_FULL_CONTROL"
  | (string & {});
export interface CrlDistributionPointExtensionConfiguration {
  OmitExtension: boolean;
}
export type CrlType = "COMPLETE" | "PARTITIONED" | (string & {});
export type CrlPathString = string;
export interface CrlConfiguration {
  Enabled: boolean;
  ExpirationInDays?: number;
  CustomCname?: string;
  S3BucketName?: string;
  S3ObjectAcl?: S3ObjectAcl;
  CrlDistributionPointExtensionConfiguration?: CrlDistributionPointExtensionConfiguration;
  CrlType?: CrlType;
  CustomPath?: string;
}
export interface OcspConfiguration {
  Enabled: boolean;
  OcspCustomCname?: string;
}
export interface RevocationConfiguration {
  CrlConfiguration?: CrlConfiguration;
  OcspConfiguration?: OcspConfiguration;
}
export type CertificateAuthorityType = "ROOT" | "SUBORDINATE" | (string & {});
export type IdempotencyToken = string;
export type KeyStorageSecurityStandard =
  | "FIPS_140_2_LEVEL_2_OR_HIGHER"
  | "FIPS_140_2_LEVEL_3_OR_HIGHER"
  | "CCPC_LEVEL_1_OR_HIGHER"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export type CertificateAuthorityUsageMode =
  | "GENERAL_PURPOSE"
  | "SHORT_LIVED_CERTIFICATE"
  | (string & {});
export interface CreateCertificateAuthorityRequest {
  CertificateAuthorityConfiguration: CertificateAuthorityConfiguration;
  RevocationConfiguration?: RevocationConfiguration;
  CertificateAuthorityType: CertificateAuthorityType;
  IdempotencyToken?: string;
  KeyStorageSecurityStandard?: KeyStorageSecurityStandard;
  Tags?: Tag[];
  UsageMode?: CertificateAuthorityUsageMode;
}
export type Arn = string;
export interface CreateCertificateAuthorityResponse {
  CertificateAuthorityArn?: string;
}
export type S3BucketName = string;
export type AuditReportResponseFormat = "JSON" | "CSV" | (string & {});
export interface CreateCertificateAuthorityAuditReportRequest {
  CertificateAuthorityArn: string;
  S3BucketName: string;
  AuditReportResponseFormat: AuditReportResponseFormat;
}
export type AuditReportId = string;
export type S3Key = string;
export interface CreateCertificateAuthorityAuditReportResponse {
  AuditReportId?: string;
  S3Key?: string;
}
export type Principal = string;
export type AccountId = string;
export type ActionType =
  | "IssueCertificate"
  | "GetCertificate"
  | "ListPermissions"
  | (string & {});
export type ActionList = ActionType[];
export interface CreatePermissionRequest {
  CertificateAuthorityArn: string;
  Principal: string;
  SourceAccount?: string;
  Actions: ActionType[];
}
export interface CreatePermissionResponse {}
export type PermanentDeletionTimeInDays = number;
export interface DeleteCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
  PermanentDeletionTimeInDays?: number;
}
export interface DeleteCertificateAuthorityResponse {}
export interface DeletePermissionRequest {
  CertificateAuthorityArn: string;
  Principal: string;
  SourceAccount?: string;
}
export interface DeletePermissionResponse {}
export interface DeletePolicyRequest {
  ResourceArn: string;
}
export interface DeletePolicyResponse {}
export interface DescribeCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
}
export type CertificateAuthorityStatus =
  | "CREATING"
  | "PENDING_CERTIFICATE"
  | "ACTIVE"
  | "DELETED"
  | "DISABLED"
  | "EXPIRED"
  | "FAILED"
  | (string & {});
export type FailureReason =
  | "REQUEST_TIMED_OUT"
  | "UNSUPPORTED_ALGORITHM"
  | "OTHER"
  | (string & {});
export interface CertificateAuthority {
  Arn?: string;
  OwnerAccount?: string;
  CreatedAt?: Date;
  LastStateChangeAt?: Date;
  Type?: CertificateAuthorityType;
  Serial?: string;
  Status?: CertificateAuthorityStatus;
  NotBefore?: Date;
  NotAfter?: Date;
  FailureReason?: FailureReason;
  CertificateAuthorityConfiguration?: CertificateAuthorityConfiguration;
  RevocationConfiguration?: RevocationConfiguration;
  RestorableUntil?: Date;
  KeyStorageSecurityStandard?: KeyStorageSecurityStandard;
  UsageMode?: CertificateAuthorityUsageMode;
}
export interface DescribeCertificateAuthorityResponse {
  CertificateAuthority?: CertificateAuthority;
}
export interface DescribeCertificateAuthorityAuditReportRequest {
  CertificateAuthorityArn: string;
  AuditReportId: string;
}
export type AuditReportStatus =
  | "CREATING"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface DescribeCertificateAuthorityAuditReportResponse {
  AuditReportStatus?: AuditReportStatus;
  S3BucketName?: string;
  S3Key?: string;
  CreatedAt?: Date;
}
export interface GetCertificateRequest {
  CertificateAuthorityArn: string;
  CertificateArn: string;
}
export type CertificateBody = string;
export type CertificateChain = string;
export interface GetCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
}
export interface GetCertificateAuthorityCertificateRequest {
  CertificateAuthorityArn: string;
}
export interface GetCertificateAuthorityCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
}
export interface GetCertificateAuthorityCsrRequest {
  CertificateAuthorityArn: string;
}
export type CsrBody = string;
export interface GetCertificateAuthorityCsrResponse {
  Csr?: string;
}
export interface GetPolicyRequest {
  ResourceArn: string;
}
export type AWSPolicy = string;
export interface GetPolicyResponse {
  Policy?: string;
}
export type CertificateBodyBlob = Uint8Array;
export type CertificateChainBlob = Uint8Array;
export interface ImportCertificateAuthorityCertificateRequest {
  CertificateAuthorityArn: string;
  Certificate: Uint8Array;
  CertificateChain?: Uint8Array;
}
export interface ImportCertificateAuthorityCertificateResponse {}
export type PolicyQualifierId = "CPS" | (string & {});
export interface Qualifier {
  CpsUri: string;
}
export interface PolicyQualifierInfo {
  PolicyQualifierId: PolicyQualifierId;
  Qualifier: Qualifier;
}
export type PolicyQualifierInfoList = PolicyQualifierInfo[];
export interface PolicyInformation {
  CertPolicyId: string;
  PolicyQualifiers?: PolicyQualifierInfo[];
}
export type CertificatePolicyList = PolicyInformation[];
export type ExtendedKeyUsageType =
  | "SERVER_AUTH"
  | "CLIENT_AUTH"
  | "CODE_SIGNING"
  | "EMAIL_PROTECTION"
  | "TIME_STAMPING"
  | "OCSP_SIGNING"
  | "SMART_CARD_LOGIN"
  | "DOCUMENT_SIGNING"
  | "CERTIFICATE_TRANSPARENCY"
  | (string & {});
export interface ExtendedKeyUsage {
  ExtendedKeyUsageType?: ExtendedKeyUsageType;
  ExtendedKeyUsageObjectIdentifier?: string;
}
export type ExtendedKeyUsageList = ExtendedKeyUsage[];
export type GeneralNameList = GeneralName[];
export type Base64String1To4096 = string;
export interface CustomExtension {
  ObjectIdentifier: string;
  Value: string;
  Critical?: boolean;
}
export type CustomExtensionList = CustomExtension[];
export interface Extensions {
  CertificatePolicies?: PolicyInformation[];
  ExtendedKeyUsage?: ExtendedKeyUsage[];
  KeyUsage?: KeyUsage;
  SubjectAlternativeNames?: GeneralName[];
  CustomExtensions?: CustomExtension[];
}
export interface ApiPassthrough {
  Extensions?: Extensions;
  Subject?: ASN1Subject;
}
export type CsrBlob = Uint8Array;
export type PositiveLong = number;
export type ValidityPeriodType =
  | "END_DATE"
  | "ABSOLUTE"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | (string & {});
export interface Validity {
  Value: number;
  Type: ValidityPeriodType;
}
export interface IssueCertificateRequest {
  ApiPassthrough?: ApiPassthrough;
  CertificateAuthorityArn: string;
  Csr: Uint8Array;
  SigningAlgorithm: SigningAlgorithm;
  TemplateArn?: string;
  Validity: Validity;
  ValidityNotBefore?: Validity;
  IdempotencyToken?: string;
}
export interface IssueCertificateResponse {
  CertificateArn?: string;
}
export type MaxResults = number;
export type NextToken = string;
export type ResourceOwner = "SELF" | "OTHER_ACCOUNTS" | (string & {});
export interface ListCertificateAuthoritiesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceOwner?: ResourceOwner;
}
export type CertificateAuthorities = CertificateAuthority[];
export interface ListCertificateAuthoritiesResponse {
  NextToken?: string;
  CertificateAuthorities?: CertificateAuthority[];
}
export interface ListPermissionsRequest {
  MaxResults?: number;
  NextToken?: string;
  CertificateAuthorityArn: string;
}
export interface Permission {
  CertificateAuthorityArn?: string;
  CreatedAt?: Date;
  Principal?: string;
  SourceAccount?: string;
  Actions?: ActionType[];
  Policy?: string;
}
export type PermissionList = Permission[];
export interface ListPermissionsResponse {
  NextToken?: string;
  Permissions?: Permission[];
}
export interface ListTagsRequest {
  MaxResults?: number;
  NextToken?: string;
  CertificateAuthorityArn: string;
}
export interface ListTagsResponse {
  NextToken?: string;
  Tags?: Tag[];
}
export interface PutPolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutPolicyResponse {}
export interface RestoreCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
}
export interface RestoreCertificateAuthorityResponse {}
export type RevocationReason =
  | "UNSPECIFIED"
  | "KEY_COMPROMISE"
  | "CERTIFICATE_AUTHORITY_COMPROMISE"
  | "AFFILIATION_CHANGED"
  | "SUPERSEDED"
  | "CESSATION_OF_OPERATION"
  | "PRIVILEGE_WITHDRAWN"
  | "A_A_COMPROMISE"
  | (string & {});
export interface RevokeCertificateRequest {
  CertificateAuthorityArn: string;
  CertificateSerial: string;
  RevocationReason: RevocationReason;
}
export interface RevokeCertificateResponse {}
export interface TagCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
  Tags: Tag[];
}
export interface TagCertificateAuthorityResponse {}
export interface UntagCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
  Tags: Tag[];
}
export interface UntagCertificateAuthorityResponse {}
export interface UpdateCertificateAuthorityRequest {
  CertificateAuthorityArn: string;
  RevocationConfiguration?: RevocationConfiguration;
  Status?: CertificateAuthorityStatus;
}
export interface UpdateCertificateAuthorityResponse {}
export type CreateCertificateAuthorityError =
  | InvalidArgsException
  | InvalidPolicyException
  | InvalidTagException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a root or subordinate private certificate authority (CA). You must specify the CA configuration, an optional configuration for Online Certificate Status Protocol (OCSP) and/or a certificate revocation list (CRL), the CA type, and an optional idempotency token to avoid accidental creation of multiple CAs. The CA configuration specifies the name of the algorithm and key size to be used to create the CA private key, the type of signing algorithm that the CA uses, and X.500 subject information. The OCSP configuration can optionally specify a custom URL for the OCSP responder. The CRL configuration specifies the CRL expiration period in days (the validity period of the CRL), the Amazon S3 bucket that will contain the CRL, and a CNAME alias for the S3 bucket that is included in certificates issued by the CA. If successful, this action returns the Amazon Resource Name (ARN) of the CA.
 *
 * Both Amazon Web Services Private CA and the IAM principal must have permission to write to the S3 bucket that you specify. If the IAM principal making the call does not have permission to write to the bucket, then an exception is thrown. For more information, see Access policies for CRLs in Amazon S3.
 *
 * Amazon Web Services Private CA assets that are stored in Amazon S3 can be protected with encryption. For more information, see Encrypting Your CRLs.
 */
export const createCertificateAuthority: API.OperationMethod<
  CreateCertificateAuthorityRequest,
  CreateCertificateAuthorityResponse,
  CreateCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateAuthorityConfiguration: {
        KeyAlgorithm: 0,
        SigningAlgorithm: 0,
        Subject: i_ASN1Subject,
        CsrExtensions: {
          KeyUsage: i_KeyUsage,
          SubjectInformationAccess: D.list({
            AccessMethod: { CustomObjectIdentifier: 0, AccessMethodType: 0 },
            AccessLocation: i_GeneralName,
          }),
        },
      },
      RevocationConfiguration: i_RevocationConfiguration,
      CertificateAuthorityType: 0,
      IdempotencyToken: 0,
      KeyStorageSecurityStandard: 0,
      Tags: D.list(i_Tag),
      UsageMode: 0,
    },
  },
  errors: [
    InvalidArgsException,
    InvalidPolicyException,
    InvalidTagException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateAuthority",
})) as any;

export type CreateCertificateAuthorityAuditReportError =
  | InvalidArgsException
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an audit report that lists every time that your CA private key is used to issue a certificate. The IssueCertificate and RevokeCertificate actions use the private key.
 *
 * To save the audit report to your designated Amazon S3 bucket, you must create a bucket policy that grants Amazon Web Services Private CA permission to access and write to it. For an example policy, see Prepare an Amazon S3 bucket for audit reports.
 *
 * Amazon Web Services Private CA assets that are stored in Amazon S3 can be protected with encryption. For more information, see Encrypting Your Audit Reports.
 *
 * You can generate a maximum of one report every 30 minutes.
 */
export const createCertificateAuthorityAuditReport: API.OperationMethod<
  CreateCertificateAuthorityAuditReportRequest,
  CreateCertificateAuthorityAuditReportResponse,
  CreateCertificateAuthorityAuditReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateAuthorityArn: 0,
      S3BucketName: 0,
      AuditReportResponseFormat: 0,
    },
  },
  errors: [
    InvalidArgsException,
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateAuthorityAuditReport",
})) as any;

export type CreatePermissionError =
  | InvalidArnException
  | InvalidStateException
  | LimitExceededException
  | PermissionAlreadyExistsException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Grants one or more permissions on a private CA to the Certificate Manager (ACM) service principal (`acm.amazonaws.com`). These permissions allow ACM to issue and renew ACM certificates that reside in the same Amazon Web Services account as the CA.
 *
 * You can list current permissions with the ListPermissions action and revoke them with the DeletePermission action.
 * **About Permissions**
 *
 * - If the private CA and the certificates it issues reside in the same account, you can use `CreatePermission` to grant permissions for ACM to carry out automatic certificate renewals.
 *
 * - For automatic certificate renewal to succeed, the ACM service principal needs permissions to create, retrieve, and list certificates.
 *
 * - If the private CA and the ACM certificates reside in different accounts, then permissions cannot be used to enable automatic renewals. Instead, the ACM certificate owner must set up a resource-based policy to enable cross-account issuance and renewals. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 */
export const createPermission: API.OperationMethod<
  CreatePermissionRequest,
  CreatePermissionResponse,
  CreatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateAuthorityArn: 0,
      Principal: 0,
      SourceAccount: 0,
      Actions: 0,
    },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    LimitExceededException,
    PermissionAlreadyExistsException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermission",
})) as any;

export type DeleteCertificateAuthorityError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a private certificate authority (CA). You must provide the Amazon Resource Name (ARN) of the private CA that you want to delete. You can find the ARN by calling the ListCertificateAuthorities action.
 *
 * Deleting a CA will invalidate other CAs and certificates below it in your CA hierarchy.
 *
 * Before you can delete a CA that you have created and activated, you must disable it. To do this, call the UpdateCertificateAuthority action and set the **CertificateAuthorityStatus** parameter to `DISABLED`.
 *
 * Additionally, you can delete a CA if you are waiting for it to be created (that is, the status of the CA is `CREATING`). You can also delete it if the CA has been created but you haven't yet imported the signed certificate into Amazon Web Services Private CA (that is, the status of the CA is `PENDING_CERTIFICATE`).
 *
 * When you successfully call DeleteCertificateAuthority, the CA's status changes to `DELETED`. However, the CA won't be permanently deleted until the restoration period has passed. By default, if you do not set the `PermanentDeletionTimeInDays` parameter, the CA remains restorable for 30 days. You can set the parameter from 7 to 30 days. The DescribeCertificateAuthority action returns the time remaining in the restoration window of a private CA in the `DELETED` state. To restore an eligible CA, call the RestoreCertificateAuthority action.
 *
 * A private CA can be deleted if it is in the `PENDING_CERTIFICATE`, `CREATING`, `EXPIRED`, `DISABLED`, or `FAILED` state. To delete a CA in the `ACTIVE` state, you must first disable it, or else the delete request results in an exception. If you are deleting a private CA in the `PENDING_CERTIFICATE` or `DISABLED` state, you can set the length of its restoration period to 7-30 days. The default is 30. During this time, the status is set to `DELETED` and the CA can be restored. A private CA deleted in the `CREATING` or `FAILED` state has no assigned restoration period and cannot be restored.
 */
export const deleteCertificateAuthority: API.OperationMethod<
  DeleteCertificateAuthorityRequest,
  DeleteCertificateAuthorityResponse,
  DeleteCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, PermanentDeletionTimeInDays: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificateAuthority",
})) as any;

export type DeletePermissionError =
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Revokes permissions on a private CA granted to the Certificate Manager (ACM) service principal (acm.amazonaws.com).
 *
 * These permissions allow ACM to issue and renew ACM certificates that reside in the same Amazon Web Services account as the CA. If you revoke these permissions, ACM will no longer renew the affected certificates automatically.
 *
 * Permissions can be granted with the CreatePermission action and listed with the ListPermissions action.
 * **About Permissions**
 *
 * - If the private CA and the certificates it issues reside in the same account, you can use `CreatePermission` to grant permissions for ACM to carry out automatic certificate renewals.
 *
 * - For automatic certificate renewal to succeed, the ACM service principal needs permissions to create, retrieve, and list certificates.
 *
 * - If the private CA and the ACM certificates reside in different accounts, then permissions cannot be used to enable automatic renewals. Instead, the ACM certificate owner must set up a resource-based policy to enable cross-account issuance and renewals. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 */
export const deletePermission: API.OperationMethod<
  DeletePermissionRequest,
  DeletePermissionResponse,
  DeletePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, Principal: 0, SourceAccount: 0 },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermission",
})) as any;

export type DeletePolicyError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidStateException
  | LockoutPreventedException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to a private CA. Deletion will remove any access that the policy has granted. If there is no policy attached to the private CA, this action will return successful.
 *
 * If you delete a policy that was applied through Amazon Web Services Resource Access Manager (RAM), the CA will be removed from all shares in which it was included.
 *
 * The Certificate Manager Service Linked Role that the policy supports is not affected when you delete the policy.
 *
 * The current policy can be shown with GetPolicy and updated with PutPolicy.
 * **About Policies**
 *
 * - A policy grants access on a private CA to an Amazon Web Services customer account, to Amazon Web Services Organizations, or to an Amazon Web Services Organizations unit. Policies are under the control of a CA administrator. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 *
 * - A policy permits a user of Certificate Manager (ACM) to issue ACM certificates signed by a CA in another account.
 *
 * - For ACM to manage automatic renewal of these certificates, the ACM user must configure a Service Linked Role (SLR). The SLR allows the ACM service to assume the identity of the user, subject to confirmation against the Amazon Web Services Private CA policy. For more information, see Using a Service Linked Role with ACM.
 *
 * - Updates made in Amazon Web Services Resource Manager (RAM) are reflected in policies. For more information, see Attach a Policy for Cross-Account Access.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidStateException,
    LockoutPreventedException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DescribeCertificateAuthorityError =
  | InvalidArnException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists information about your private certificate authority (CA) or one that has been shared with you. You specify the private CA on input by its ARN (Amazon Resource Name). The output contains the status of your CA. This can be any of the following:
 *
 * - `CREATING` - Amazon Web Services Private CA is creating your private certificate authority.
 *
 * - `PENDING_CERTIFICATE` - The certificate is pending. You must use your Amazon Web Services Private CA-hosted or on-premises root or subordinate CA to sign your private CA CSR and then import it into Amazon Web Services Private CA.
 *
 * - `ACTIVE` - Your private CA is active.
 *
 * - `DISABLED` - Your private CA has been disabled.
 *
 * - `EXPIRED` - Your private CA certificate has expired.
 *
 * - `FAILED` - Your private CA has failed. Your CA can fail because of problems such a network outage or back-end Amazon Web Services failure or other errors. A failed CA can never return to the pending state. You must create a new CA.
 *
 * - `DELETED` - Your private CA is within the restoration period, after which it is permanently deleted. The length of time remaining in the CA's restoration period is also included in this action's output.
 */
export const describeCertificateAuthority: API.OperationMethod<
  DescribeCertificateAuthorityRequest,
  DescribeCertificateAuthorityResponse,
  DescribeCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0 },
    output: { CertificateAuthority: o_CertificateAuthority },
  },
  errors: [InvalidArnException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateAuthority",
})) as any;

export type DescribeCertificateAuthorityAuditReportError =
  | InvalidArgsException
  | InvalidArnException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists information about a specific audit report created by calling the CreateCertificateAuthorityAuditReport action. Audit information is created every time the certificate authority (CA) private key is used. The private key is used when you call the IssueCertificate action or the RevokeCertificate action.
 */
export const describeCertificateAuthorityAuditReport: API.OperationMethod<
  DescribeCertificateAuthorityAuditReportRequest,
  DescribeCertificateAuthorityAuditReportResponse,
  DescribeCertificateAuthorityAuditReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, AuditReportId: 0 },
    output: { CreatedAt: D.ts },
  },
  errors: [
    InvalidArgsException,
    InvalidArnException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateAuthorityAuditReport",
})) as any;

export type GetCertificateError =
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a certificate from your private CA or one that has been shared with you. The ARN of the certificate is returned when you call the IssueCertificate action. You must specify both the ARN of your private CA and the ARN of the issued certificate when calling the **GetCertificate** action. You can retrieve the certificate if it is in the **ISSUED**, **EXPIRED**, or **REVOKED** state. You can call the CreateCertificateAuthorityAuditReport action to create a report that contains information about all of the certificates issued and revoked by your private CA.
 */
export const getCertificate: API.OperationMethod<
  GetCertificateRequest,
  GetCertificateResponse,
  GetCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, CertificateArn: 0 },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificate",
})) as any;

export type GetCertificateAuthorityCertificateError =
  | InvalidArnException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the certificate and certificate chain for your private certificate authority (CA) or one that has been shared with you. Both the certificate and the chain are base64 PEM-encoded. The chain does not include the CA certificate. Each certificate in the chain signs the one before it.
 */
export const getCertificateAuthorityCertificate: API.OperationMethod<
  GetCertificateAuthorityCertificateRequest,
  GetCertificateAuthorityCertificateResponse,
  GetCertificateAuthorityCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CertificateAuthorityArn: 0 } },
  errors: [
    InvalidArnException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificateAuthorityCertificate",
})) as any;

export type GetCertificateAuthorityCsrError =
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the certificate signing request (CSR) for your private certificate authority (CA). The CSR is created when you call the CreateCertificateAuthority action. Sign the CSR with your Amazon Web Services Private CA-hosted or on-premises root or subordinate CA. Then import the signed certificate back into Amazon Web Services Private CA by calling the ImportCertificateAuthorityCertificate action. The CSR is returned as a base64 PEM-encoded string.
 */
export const getCertificateAuthorityCsr: API.OperationMethod<
  GetCertificateAuthorityCsrRequest,
  GetCertificateAuthorityCsrResponse,
  GetCertificateAuthorityCsrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CertificateAuthorityArn: 0 } },
  errors: [
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificateAuthorityCsr",
})) as any;

export type GetPolicyError =
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a private CA. If either the private CA resource or the policy cannot be found, this action returns a `ResourceNotFoundException`.
 *
 * The policy can be attached or updated with PutPolicy and removed with DeletePolicy.
 * **About Policies**
 *
 * - A policy grants access on a private CA to an Amazon Web Services customer account, to Amazon Web Services Organizations, or to an Amazon Web Services Organizations unit. Policies are under the control of a CA administrator. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 *
 * - A policy permits a user of Certificate Manager (ACM) to issue ACM certificates signed by a CA in another account.
 *
 * - For ACM to manage automatic renewal of these certificates, the ACM user must configure a Service Linked Role (SLR). The SLR allows the ACM service to assume the identity of the user, subject to confirmation against the Amazon Web Services Private CA policy. For more information, see Using a Service Linked Role with ACM.
 *
 * - Updates made in Amazon Web Services Resource Manager (RAM) are reflected in policies. For more information, see Attach a Policy for Cross-Account Access.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type ImportCertificateAuthorityCertificateError =
  | CertificateMismatchException
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidRequestException
  | InvalidStateException
  | MalformedCertificateException
  | RequestFailedException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports a signed private CA certificate into Amazon Web Services Private CA. This action is used when you are using a chain of trust whose root is located outside Amazon Web Services Private CA. Before you can call this action, the following preparations must in place:
 *
 * - In Amazon Web Services Private CA, call the CreateCertificateAuthority action to create the private CA that you plan to back with the imported certificate.
 *
 * - Call the GetCertificateAuthorityCsr action to generate a certificate signing request (CSR).
 *
 * - Sign the CSR using a root or intermediate CA hosted by either an on-premises PKI hierarchy or by a commercial CA.
 *
 * - Create a certificate chain and copy the signed certificate and the certificate chain to your working directory.
 *
 * Amazon Web Services Private CA supports three scenarios for installing a CA certificate:
 *
 * - Installing a certificate for a root CA hosted by Amazon Web Services Private CA.
 *
 * - Installing a subordinate CA certificate whose parent authority is hosted by Amazon Web Services Private CA.
 *
 * - Installing a subordinate CA certificate whose parent authority is externally hosted.
 *
 * The following additional requirements apply when you import a CA certificate.
 *
 * - Only a self-signed certificate can be imported as a root CA.
 *
 * - A self-signed certificate cannot be imported as a subordinate CA.
 *
 * - Your certificate chain must not include the private CA certificate that you are importing.
 *
 * - Your root CA must be the last certificate in your chain. The subordinate certificate, if any, that your root CA signed must be next to last. The subordinate certificate signed by the preceding subordinate CA must come next, and so on until your chain is built.
 *
 * - The chain must be PEM-encoded.
 *
 * - The maximum allowed size of a certificate is 32 KB.
 *
 * - The maximum allowed size of a certificate chain is 2 MB.
 *
 * *Enforcement of Critical Constraints*
 *
 * Amazon Web Services Private CA allows the following extensions to be marked critical in the imported CA certificate or chain.
 *
 * - Authority key identifier
 *
 * - Basic constraints (*must* be marked critical)
 *
 * - Certificate policies
 *
 * - Extended key usage
 *
 * - Inhibit anyPolicy
 *
 * - Issuer alternative name
 *
 * - Key usage
 *
 * - Name constraints
 *
 * - Policy mappings
 *
 * - Subject alternative name
 *
 * - Subject directory attributes
 *
 * - Subject key identifier
 *
 * - Subject information access
 *
 * Amazon Web Services Private CA rejects the following extensions when they are marked critical in an imported CA certificate or chain.
 *
 * - Authority information access
 *
 * - CRL distribution points
 *
 * - Freshest CRL
 *
 * - Policy constraints
 *
 * Amazon Web Services Private Certificate Authority will also reject any other extension marked as critical not contained on the preceding list of allowed extensions.
 */
export const importCertificateAuthorityCertificate: API.OperationMethod<
  ImportCertificateAuthorityCertificateRequest,
  ImportCertificateAuthorityCertificateResponse,
  ImportCertificateAuthorityCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, Certificate: 0, CertificateChain: 0 },
  },
  errors: [
    CertificateMismatchException,
    ConcurrentModificationException,
    InvalidArnException,
    InvalidRequestException,
    InvalidStateException,
    MalformedCertificateException,
    RequestFailedException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificateAuthorityCertificate",
})) as any;

export type IssueCertificateError =
  | InvalidArgsException
  | InvalidArnException
  | InvalidStateException
  | LimitExceededException
  | MalformedCSRException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Uses your private certificate authority (CA), or one that has been shared with you, to issue a client certificate. This action returns the Amazon Resource Name (ARN) of the certificate. You can retrieve the certificate by calling the GetCertificate action and specifying the ARN.
 *
 * You cannot use the ACM **ListCertificateAuthorities** action to retrieve the ARNs of the certificates that you issue by using Amazon Web Services Private CA.
 */
export const issueCertificate: API.OperationMethod<
  IssueCertificateRequest,
  IssueCertificateResponse,
  IssueCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApiPassthrough: {
        Extensions: {
          CertificatePolicies: D.list({
            CertPolicyId: 0,
            PolicyQualifiers: D.list({
              PolicyQualifierId: 0,
              Qualifier: { CpsUri: 0 },
            }),
          }),
          ExtendedKeyUsage: D.list({
            ExtendedKeyUsageType: 0,
            ExtendedKeyUsageObjectIdentifier: 0,
          }),
          KeyUsage: i_KeyUsage,
          SubjectAlternativeNames: D.list(i_GeneralName),
          CustomExtensions: D.list({
            ObjectIdentifier: 0,
            Value: 0,
            Critical: 0,
          }),
        },
        Subject: i_ASN1Subject,
      },
      CertificateAuthorityArn: 0,
      Csr: 0,
      SigningAlgorithm: 0,
      TemplateArn: 0,
      Validity: i_Validity,
      ValidityNotBefore: i_Validity,
      IdempotencyToken: 0,
    },
  },
  errors: [
    InvalidArgsException,
    InvalidArnException,
    InvalidStateException,
    LimitExceededException,
    MalformedCSRException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IssueCertificate",
})) as any;

export type ListCertificateAuthoritiesError =
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the private certificate authorities that you created by using the CreateCertificateAuthority action.
 */
export const listCertificateAuthorities: API.PaginatedOperationMethod<
  ListCertificateAuthoritiesRequest,
  ListCertificateAuthoritiesResponse,
  ListCertificateAuthoritiesError,
  Credentials | HttpClient.HttpClient,
  CertificateAuthority
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ResourceOwner: 0 },
    output: { CertificateAuthorities: D.list(o_CertificateAuthority) },
  },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateAuthorities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CertificateAuthorities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionsError =
  | InvalidArnException
  | InvalidNextTokenException
  | InvalidStateException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List all permissions on a private CA, if any, granted to the Certificate Manager (ACM) service principal (acm.amazonaws.com).
 *
 * These permissions allow ACM to issue and renew ACM certificates that reside in the same Amazon Web Services account as the CA.
 *
 * Permissions can be granted with the CreatePermission action and revoked with the DeletePermission action.
 * **About Permissions**
 *
 * - If the private CA and the certificates it issues reside in the same account, you can use `CreatePermission` to grant permissions for ACM to carry out automatic certificate renewals.
 *
 * - For automatic certificate renewal to succeed, the ACM service principal needs permissions to create, retrieve, and list certificates.
 *
 * - If the private CA and the ACM certificates reside in different accounts, then permissions cannot be used to enable automatic renewals. Instead, the ACM certificate owner must set up a resource-based policy to enable cross-account issuance and renewals. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  Permission
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, CertificateAuthorityArn: 0 },
    output: { Permissions: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    InvalidArnException,
    InvalidNextTokenException,
    InvalidStateException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Permissions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidArnException
  | InvalidStateException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags, if any, that are associated with your private CA or one that has been shared with you. Tags are labels that you can use to identify and organize your CAs. Each tag consists of a key and an optional value. Call the TagCertificateAuthority action to add one or more tags to your CA. Call the UntagCertificateAuthority action to remove tags.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, CertificateAuthorityArn: 0 },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutPolicyError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidPolicyException
  | InvalidStateException
  | LockoutPreventedException
  | RequestFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a private CA.
 *
 * A policy can also be applied by sharing a private CA through Amazon Web Services Resource Access Manager (RAM). For more information, see Attach a Policy for Cross-Account Access.
 *
 * The policy can be displayed with GetPolicy and removed with DeletePolicy.
 * **About Policies**
 *
 * - A policy grants access on a private CA to an Amazon Web Services customer account, to Amazon Web Services Organizations, or to an Amazon Web Services Organizations unit. Policies are under the control of a CA administrator. For more information, see Using a Resource Based Policy with Amazon Web Services Private CA.
 *
 * - A policy permits a user of Certificate Manager (ACM) to issue ACM certificates signed by a CA in another account.
 *
 * - For ACM to manage automatic renewal of these certificates, the ACM user must configure a Service Linked Role (SLR). The SLR allows the ACM service to assume the identity of the user, subject to confirmation against the Amazon Web Services Private CA policy. For more information, see Using a Service Linked Role with ACM.
 *
 * - Updates made in Amazon Web Services Resource Manager (RAM) are reflected in policies. For more information, see Attach a Policy for Cross-Account Access.
 */
export const putPolicy: API.OperationMethod<
  PutPolicyRequest,
  PutPolicyResponse,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Policy: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidPolicyException,
    InvalidStateException,
    LockoutPreventedException,
    RequestFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPolicy",
})) as any;

export type RestoreCertificateAuthorityError =
  | InvalidArnException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restores a certificate authority (CA) that is in the `DELETED` state. You can restore a CA during the period that you defined in the **PermanentDeletionTimeInDays** parameter of the DeleteCertificateAuthority action. Currently, you can specify 7 to 30 days. If you did not specify a **PermanentDeletionTimeInDays** value, by default you can restore the CA at any time in a 30 day period. You can check the time remaining in the restoration period of a private CA in the `DELETED` state by calling the DescribeCertificateAuthority or ListCertificateAuthorities actions. The status of a restored CA is set to its pre-deletion status when the **RestoreCertificateAuthority** action returns. To change its status to `ACTIVE`, call the UpdateCertificateAuthority action. If the private CA was in the `PENDING_CERTIFICATE` state at deletion, you must use the ImportCertificateAuthorityCertificate action to import a certificate authority into the private CA before it can be activated. You cannot restore a CA after the restoration period has ended.
 */
export const restoreCertificateAuthority: API.OperationMethod<
  RestoreCertificateAuthorityRequest,
  RestoreCertificateAuthorityResponse,
  RestoreCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CertificateAuthorityArn: 0 } },
  errors: [
    InvalidArnException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreCertificateAuthority",
})) as any;

export type RevokeCertificateError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidRequestException
  | InvalidStateException
  | LimitExceededException
  | RequestAlreadyProcessedException
  | RequestFailedException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Revokes a certificate that was issued inside Amazon Web Services Private CA. If you enable a certificate revocation list (CRL) when you create or update your private CA, information about the revoked certificates will be included in the CRL. Amazon Web Services Private CA writes the CRL to an S3 bucket that you specify. A CRL is typically updated approximately 30 minutes after a certificate is revoked. If for any reason the CRL update fails, Amazon Web Services Private CA attempts makes further attempts every 15 minutes. With Amazon CloudWatch, you can create alarms for the metrics `CRLGenerated` and `MisconfiguredCRLBucket`. For more information, see Supported CloudWatch Metrics.
 *
 * Both Amazon Web Services Private CA and the IAM principal must have permission to write to the S3 bucket that you specify. If the IAM principal making the call does not have permission to write to the bucket, then an exception is thrown. For more information, see Access policies for CRLs in Amazon S3.
 *
 * Amazon Web Services Private CA also writes revocation information to the audit report. For more information, see CreateCertificateAuthorityAuditReport.
 *
 * You cannot revoke a root CA self-signed certificate.
 */
export const revokeCertificate: API.OperationMethod<
  RevokeCertificateRequest,
  RevokeCertificateResponse,
  RevokeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateAuthorityArn: 0,
      CertificateSerial: 0,
      RevocationReason: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidRequestException,
    InvalidStateException,
    LimitExceededException,
    RequestAlreadyProcessedException,
    RequestFailedException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeCertificate",
})) as any;

export type TagCertificateAuthorityError =
  | InvalidArnException
  | InvalidStateException
  | InvalidTagException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more tags to your private CA. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a key and an optional value. You specify the private CA on input by its Amazon Resource Name (ARN). You specify the tag by using a key-value pair. You can apply a tag to just one private CA if you want to identify a specific characteristic of that CA, or you can apply the same tag to multiple private CAs if you want to filter for a common relationship among those CAs. To remove one or more tags, use the UntagCertificateAuthority action. Call the ListTags action to see what tags are associated with your CA.
 *
 * To attach tags to a private CA during the creation procedure, a CA administrator must first associate an inline IAM policy with the `CreateCertificateAuthority` action and explicitly allow tagging. For more information, see Attaching tags to a CA at the time of creation.
 */
export const tagCertificateAuthority: API.OperationMethod<
  TagCertificateAuthorityRequest,
  TagCertificateAuthorityResponse,
  TagCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    InvalidTagException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagCertificateAuthority",
})) as any;

export type UntagCertificateAuthorityError =
  | InvalidArnException
  | InvalidStateException
  | InvalidTagException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Remove one or more tags from your private CA. A tag consists of a key-value pair. If you do not specify the value portion of the tag when calling this action, the tag will be removed regardless of value. If you specify a value, the tag is removed only if it is associated with the specified value. To add tags to a private CA, use the TagCertificateAuthority. Call the ListTags action to see what tags are associated with your CA.
 */
export const untagCertificateAuthority: API.OperationMethod<
  UntagCertificateAuthorityRequest,
  UntagCertificateAuthorityResponse,
  UntagCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CertificateAuthorityArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    InvalidArnException,
    InvalidStateException,
    InvalidTagException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagCertificateAuthority",
})) as any;

export type UpdateCertificateAuthorityError =
  | ConcurrentModificationException
  | InvalidArgsException
  | InvalidArnException
  | InvalidPolicyException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the status or configuration of a private certificate authority (CA). Your private CA must be in the `ACTIVE` or `DISABLED` state before you can update it. You can disable a private CA that is in the `ACTIVE` state or make a CA that is in the `DISABLED` state active again.
 *
 * Both Amazon Web Services Private CA and the IAM principal must have permission to write to the S3 bucket that you specify. If the IAM principal making the call does not have permission to write to the bucket, then an exception is thrown. For more information, see Access policies for CRLs in Amazon S3.
 */
export const updateCertificateAuthority: API.OperationMethod<
  UpdateCertificateAuthorityRequest,
  UpdateCertificateAuthorityResponse,
  UpdateCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CertificateAuthorityArn: 0,
      RevocationConfiguration: i_RevocationConfiguration,
      Status: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgsException,
    InvalidArnException,
    InvalidPolicyException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificateAuthority",
})) as any;

const i_ASN1Subject: D.LazyStruct = () => ({
  Country: 0,
  Organization: 0,
  OrganizationalUnit: 0,
  DistinguishedNameQualifier: 0,
  State: 0,
  CommonName: 0,
  SerialNumber: 0,
  Locality: 0,
  Title: 0,
  Surname: 0,
  GivenName: 0,
  Initials: 0,
  Pseudonym: 0,
  GenerationQualifier: 0,
  CustomAttributes: D.list({ ObjectIdentifier: 0, Value: 0 }),
});
const i_GeneralName: D.LazyStruct = () => ({
  OtherName: { TypeId: 0, Value: 0 },
  Rfc822Name: 0,
  DnsName: 0,
  DirectoryName: i_ASN1Subject,
  EdiPartyName: { PartyName: 0, NameAssigner: 0 },
  UniformResourceIdentifier: 0,
  IpAddress: 0,
  RegisteredId: 0,
});
const i_KeyUsage: D.LazyStruct = () => ({
  DigitalSignature: 0,
  NonRepudiation: 0,
  KeyEncipherment: 0,
  DataEncipherment: 0,
  KeyAgreement: 0,
  KeyCertSign: 0,
  CRLSign: 0,
  EncipherOnly: 0,
  DecipherOnly: 0,
});
const i_RevocationConfiguration: D.LazyStruct = () => ({
  CrlConfiguration: {
    Enabled: 0,
    ExpirationInDays: 0,
    CustomCname: 0,
    S3BucketName: 0,
    S3ObjectAcl: 0,
    CrlDistributionPointExtensionConfiguration: { OmitExtension: 0 },
    CrlType: 0,
    CustomPath: 0,
  },
  OcspConfiguration: { Enabled: 0, OcspCustomCname: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Validity: D.LazyStruct = () => ({ Value: 0, Type: 0 });
const o_CertificateAuthority: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastStateChangeAt: D.ts,
  NotBefore: D.ts,
  NotAfter: D.ts,
  RestorableUntil: D.ts,
});
