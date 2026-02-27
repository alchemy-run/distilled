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
const svc = T.AwsApiService({
  sdkId: "ACM",
  serviceShapeName: "CertificateManager",
});
const auth = T.AwsAuthSigv4({ name: "acm" });
const ver = T.ServiceVersion("2015-12-08");
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
              `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://acm.${Region}.amazonaws.com`);
            }
            return e(
              `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://acm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://acm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export type AvailabilityErrorMessage = string;
export type ServiceErrorMessage = string;
export type DomainNameString = string;
export type PassphraseBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export type CertificateBody = string;
export type CertificateChain = string;
export type PrivateKey = string | redacted.Redacted<string>;
export type PositiveInteger = number;
export type CertificateBodyBlob = Uint8Array;
export type PrivateKeyBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export type CertificateChainBlob = Uint8Array;
export type NextToken = string;
export type MaxItems = number;
export type ValidationExceptionMessage = string;
export type IdempotencyToken = string;
export type PcaArn = string;

//# Schemas
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface AddTagsToCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export const AddTagsToCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddTagsToCertificateRequest",
}) as any as S.Schema<AddTagsToCertificateRequest>;
export interface AddTagsToCertificateResponse {}
export const AddTagsToCertificateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AddTagsToCertificateResponse",
}) as any as S.Schema<AddTagsToCertificateResponse>;
export interface DeleteCertificateRequest {
  CertificateArn: string;
}
export const DeleteCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCertificateRequest",
}) as any as S.Schema<DeleteCertificateRequest>;
export interface DeleteCertificateResponse {}
export const DeleteCertificateResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteCertificateResponse" },
) as any as S.Schema<DeleteCertificateResponse>;
export interface DescribeCertificateRequest {
  CertificateArn: string;
}
export const DescribeCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeCertificateRequest",
}) as any as S.Schema<DescribeCertificateRequest>;
export type DomainList = string[];
export const DomainList = S.Array(S.String);
export type CertificateManagedBy = "CLOUDFRONT" | (string & {});
export const CertificateManagedBy = S.String;
export type ValidationEmailList = string[];
export const ValidationEmailList = S.Array(S.String);
export type DomainStatus =
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const DomainStatus = S.String;
export type RecordType = "CNAME" | (string & {});
export const RecordType = S.String;
export interface ResourceRecord {
  Name: string;
  Type: RecordType;
  Value: string;
}
export const ResourceRecord = S.suspend(() =>
  S.Struct({ Name: S.String, Type: RecordType, Value: S.String }),
).annotate({ identifier: "ResourceRecord" }) as any as S.Schema<ResourceRecord>;
export interface HttpRedirect {
  RedirectFrom?: string;
  RedirectTo?: string;
}
export const HttpRedirect = S.suspend(() =>
  S.Struct({
    RedirectFrom: S.optional(S.String),
    RedirectTo: S.optional(S.String),
  }),
).annotate({ identifier: "HttpRedirect" }) as any as S.Schema<HttpRedirect>;
export type ValidationMethod = "EMAIL" | "DNS" | "HTTP" | (string & {});
export const ValidationMethod = S.String;
export interface DomainValidation {
  DomainName: string;
  ValidationEmails?: string[];
  ValidationDomain?: string;
  ValidationStatus?: DomainStatus;
  ResourceRecord?: ResourceRecord;
  HttpRedirect?: HttpRedirect;
  ValidationMethod?: ValidationMethod;
}
export const DomainValidation = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ValidationEmails: S.optional(ValidationEmailList),
    ValidationDomain: S.optional(S.String),
    ValidationStatus: S.optional(DomainStatus),
    ResourceRecord: S.optional(ResourceRecord),
    HttpRedirect: S.optional(HttpRedirect),
    ValidationMethod: S.optional(ValidationMethod),
  }),
).annotate({
  identifier: "DomainValidation",
}) as any as S.Schema<DomainValidation>;
export type DomainValidationList = DomainValidation[];
export const DomainValidationList = S.Array(DomainValidation);
export type CertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | (string & {});
export const CertificateStatus = S.String;
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
export const RevocationReason = S.String;
export type KeyAlgorithm =
  | "RSA_1024"
  | "RSA_2048"
  | "RSA_3072"
  | "RSA_4096"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | "EC_secp521r1"
  | (string & {});
export const KeyAlgorithm = S.String;
export type InUseList = string[];
export const InUseList = S.Array(S.String);
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
export const FailureReason = S.String;
export type CertificateType =
  | "IMPORTED"
  | "AMAZON_ISSUED"
  | "PRIVATE"
  | (string & {});
export const CertificateType = S.String;
export type RenewalStatus =
  | "PENDING_AUTO_RENEWAL"
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const RenewalStatus = S.String;
export interface RenewalSummary {
  RenewalStatus: RenewalStatus;
  DomainValidationOptions: DomainValidation[];
  RenewalStatusReason?: FailureReason;
  UpdatedAt: Date;
}
export const RenewalSummary = S.suspend(() =>
  S.Struct({
    RenewalStatus: RenewalStatus,
    DomainValidationOptions: DomainValidationList,
    RenewalStatusReason: S.optional(FailureReason),
    UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "RenewalSummary" }) as any as S.Schema<RenewalSummary>;
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
export const KeyUsageName = S.String;
export interface KeyUsage {
  Name?: KeyUsageName;
}
export const KeyUsage = S.suspend(() =>
  S.Struct({ Name: S.optional(KeyUsageName) }),
).annotate({ identifier: "KeyUsage" }) as any as S.Schema<KeyUsage>;
export type KeyUsageList = KeyUsage[];
export const KeyUsageList = S.Array(KeyUsage);
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
export const ExtendedKeyUsageName = S.String;
export interface ExtendedKeyUsage {
  Name?: ExtendedKeyUsageName;
  OID?: string;
}
export const ExtendedKeyUsage = S.suspend(() =>
  S.Struct({
    Name: S.optional(ExtendedKeyUsageName),
    OID: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtendedKeyUsage",
}) as any as S.Schema<ExtendedKeyUsage>;
export type ExtendedKeyUsageList = ExtendedKeyUsage[];
export const ExtendedKeyUsageList = S.Array(ExtendedKeyUsage);
export type RenewalEligibility = "ELIGIBLE" | "INELIGIBLE" | (string & {});
export const RenewalEligibility = S.String;
export type CertificateTransparencyLoggingPreference =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CertificateTransparencyLoggingPreference = S.String;
export type CertificateExport = "ENABLED" | "DISABLED" | (string & {});
export const CertificateExport = S.String;
export interface CertificateOptions {
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference;
  Export?: CertificateExport;
}
export const CertificateOptions = S.suspend(() =>
  S.Struct({
    CertificateTransparencyLoggingPreference: S.optional(
      CertificateTransparencyLoggingPreference,
    ),
    Export: S.optional(CertificateExport),
  }),
).annotate({
  identifier: "CertificateOptions",
}) as any as S.Schema<CertificateOptions>;
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
}
export const CertificateDetail = S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    SubjectAlternativeNames: S.optional(DomainList),
    ManagedBy: S.optional(CertificateManagedBy),
    DomainValidationOptions: S.optional(DomainValidationList),
    Serial: S.optional(S.String),
    Subject: S.optional(S.String),
    Issuer: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(CertificateStatus),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevocationReason: S.optional(RevocationReason),
    NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    SignatureAlgorithm: S.optional(S.String),
    InUseBy: S.optional(InUseList),
    FailureReason: S.optional(FailureReason),
    Type: S.optional(CertificateType),
    RenewalSummary: S.optional(RenewalSummary),
    KeyUsages: S.optional(KeyUsageList),
    ExtendedKeyUsages: S.optional(ExtendedKeyUsageList),
    CertificateAuthorityArn: S.optional(S.String),
    RenewalEligibility: S.optional(RenewalEligibility),
    Options: S.optional(CertificateOptions),
  }),
).annotate({
  identifier: "CertificateDetail",
}) as any as S.Schema<CertificateDetail>;
export interface DescribeCertificateResponse {
  Certificate?: CertificateDetail;
}
export const DescribeCertificateResponse = S.suspend(() =>
  S.Struct({ Certificate: S.optional(CertificateDetail) }),
).annotate({
  identifier: "DescribeCertificateResponse",
}) as any as S.Schema<DescribeCertificateResponse>;
export interface ExportCertificateRequest {
  CertificateArn: string;
  Passphrase: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const ExportCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Passphrase: SensitiveBlob }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExportCertificateRequest",
}) as any as S.Schema<ExportCertificateRequest>;
export interface ExportCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
  PrivateKey?: string | redacted.Redacted<string>;
}
export const ExportCertificateResponse = S.suspend(() =>
  S.Struct({
    Certificate: S.optional(S.String),
    CertificateChain: S.optional(S.String),
    PrivateKey: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExportCertificateResponse",
}) as any as S.Schema<ExportCertificateResponse>;
export interface GetAccountConfigurationRequest {}
export const GetAccountConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAccountConfigurationRequest",
}) as any as S.Schema<GetAccountConfigurationRequest>;
export interface ExpiryEventsConfiguration {
  DaysBeforeExpiry?: number;
}
export const ExpiryEventsConfiguration = S.suspend(() =>
  S.Struct({ DaysBeforeExpiry: S.optional(S.Number) }),
).annotate({
  identifier: "ExpiryEventsConfiguration",
}) as any as S.Schema<ExpiryEventsConfiguration>;
export interface GetAccountConfigurationResponse {
  ExpiryEvents?: ExpiryEventsConfiguration;
}
export const GetAccountConfigurationResponse = S.suspend(() =>
  S.Struct({ ExpiryEvents: S.optional(ExpiryEventsConfiguration) }),
).annotate({
  identifier: "GetAccountConfigurationResponse",
}) as any as S.Schema<GetAccountConfigurationResponse>;
export interface GetCertificateRequest {
  CertificateArn: string;
}
export const GetCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCertificateRequest",
}) as any as S.Schema<GetCertificateRequest>;
export interface GetCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
}
export const GetCertificateResponse = S.suspend(() =>
  S.Struct({
    Certificate: S.optional(S.String),
    CertificateChain: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCertificateResponse",
}) as any as S.Schema<GetCertificateResponse>;
export interface ImportCertificateRequest {
  CertificateArn?: string;
  Certificate: Uint8Array;
  PrivateKey: Uint8Array | redacted.Redacted<Uint8Array>;
  CertificateChain?: Uint8Array;
  Tags?: Tag[];
}
export const ImportCertificateRequest = S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    Certificate: T.Blob,
    PrivateKey: SensitiveBlob,
    CertificateChain: S.optional(T.Blob),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportCertificateRequest",
}) as any as S.Schema<ImportCertificateRequest>;
export interface ImportCertificateResponse {
  CertificateArn?: string;
}
export const ImportCertificateResponse = S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "ImportCertificateResponse",
}) as any as S.Schema<ImportCertificateResponse>;
export type CertificateStatuses = CertificateStatus[];
export const CertificateStatuses = S.Array(CertificateStatus);
export type ExtendedKeyUsageFilterList = ExtendedKeyUsageName[];
export const ExtendedKeyUsageFilterList = S.Array(ExtendedKeyUsageName);
export type KeyUsageFilterList = KeyUsageName[];
export const KeyUsageFilterList = S.Array(KeyUsageName);
export type KeyAlgorithmList = KeyAlgorithm[];
export const KeyAlgorithmList = S.Array(KeyAlgorithm);
export interface Filters {
  extendedKeyUsage?: ExtendedKeyUsageName[];
  keyUsage?: KeyUsageName[];
  keyTypes?: KeyAlgorithm[];
  exportOption?: CertificateExport;
  managedBy?: CertificateManagedBy;
}
export const Filters = S.suspend(() =>
  S.Struct({
    extendedKeyUsage: S.optional(ExtendedKeyUsageFilterList),
    keyUsage: S.optional(KeyUsageFilterList),
    keyTypes: S.optional(KeyAlgorithmList),
    exportOption: S.optional(CertificateExport),
    managedBy: S.optional(CertificateManagedBy),
  }),
).annotate({ identifier: "Filters" }) as any as S.Schema<Filters>;
export type SortBy = "CREATED_AT" | (string & {});
export const SortBy = S.String;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;
export interface ListCertificatesRequest {
  CertificateStatuses?: CertificateStatus[];
  Includes?: Filters;
  NextToken?: string;
  MaxItems?: number;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
}
export const ListCertificatesRequest = S.suspend(() =>
  S.Struct({
    CertificateStatuses: S.optional(CertificateStatuses),
    Includes: S.optional(Filters),
    NextToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    SortBy: S.optional(SortBy),
    SortOrder: S.optional(SortOrder),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCertificatesRequest",
}) as any as S.Schema<ListCertificatesRequest>;
export type KeyUsageNames = KeyUsageName[];
export const KeyUsageNames = S.Array(KeyUsageName);
export type ExtendedKeyUsageNames = ExtendedKeyUsageName[];
export const ExtendedKeyUsageNames = S.Array(ExtendedKeyUsageName);
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
}
export const CertificateSummary = S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    SubjectAlternativeNameSummaries: S.optional(DomainList),
    HasAdditionalSubjectAlternativeNames: S.optional(S.Boolean),
    Status: S.optional(CertificateStatus),
    Type: S.optional(CertificateType),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    KeyUsages: S.optional(KeyUsageNames),
    ExtendedKeyUsages: S.optional(ExtendedKeyUsageNames),
    ExportOption: S.optional(CertificateExport),
    InUse: S.optional(S.Boolean),
    Exported: S.optional(S.Boolean),
    RenewalEligibility: S.optional(RenewalEligibility),
    NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ManagedBy: S.optional(CertificateManagedBy),
  }),
).annotate({
  identifier: "CertificateSummary",
}) as any as S.Schema<CertificateSummary>;
export type CertificateSummaryList = CertificateSummary[];
export const CertificateSummaryList = S.Array(CertificateSummary);
export interface ListCertificatesResponse {
  NextToken?: string;
  CertificateSummaryList?: CertificateSummary[];
}
export const ListCertificatesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    CertificateSummaryList: S.optional(CertificateSummaryList),
  }),
).annotate({
  identifier: "ListCertificatesResponse",
}) as any as S.Schema<ListCertificatesResponse>;
export interface ListTagsForCertificateRequest {
  CertificateArn: string;
}
export const ListTagsForCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForCertificateRequest",
}) as any as S.Schema<ListTagsForCertificateRequest>;
export interface ListTagsForCertificateResponse {
  Tags?: Tag[];
}
export const ListTagsForCertificateResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForCertificateResponse",
}) as any as S.Schema<ListTagsForCertificateResponse>;
export interface PutAccountConfigurationRequest {
  ExpiryEvents?: ExpiryEventsConfiguration;
  IdempotencyToken: string;
}
export const PutAccountConfigurationRequest = S.suspend(() =>
  S.Struct({
    ExpiryEvents: S.optional(ExpiryEventsConfiguration),
    IdempotencyToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutAccountConfigurationRequest",
}) as any as S.Schema<PutAccountConfigurationRequest>;
export interface PutAccountConfigurationResponse {}
export const PutAccountConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountConfigurationResponse",
}) as any as S.Schema<PutAccountConfigurationResponse>;
export interface RemoveTagsFromCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export const RemoveTagsFromCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveTagsFromCertificateRequest",
}) as any as S.Schema<RemoveTagsFromCertificateRequest>;
export interface RemoveTagsFromCertificateResponse {}
export const RemoveTagsFromCertificateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveTagsFromCertificateResponse",
}) as any as S.Schema<RemoveTagsFromCertificateResponse>;
export interface RenewCertificateRequest {
  CertificateArn: string;
}
export const RenewCertificateRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RenewCertificateRequest",
}) as any as S.Schema<RenewCertificateRequest>;
export interface RenewCertificateResponse {}
export const RenewCertificateResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "RenewCertificateResponse",
}) as any as S.Schema<RenewCertificateResponse>;
export interface DomainValidationOption {
  DomainName: string;
  ValidationDomain: string;
}
export const DomainValidationOption = S.suspend(() =>
  S.Struct({ DomainName: S.String, ValidationDomain: S.String }),
).annotate({
  identifier: "DomainValidationOption",
}) as any as S.Schema<DomainValidationOption>;
export type DomainValidationOptionList = DomainValidationOption[];
export const DomainValidationOptionList = S.Array(DomainValidationOption);
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
export const RequestCertificateRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ValidationMethod: S.optional(ValidationMethod),
    SubjectAlternativeNames: S.optional(DomainList),
    IdempotencyToken: S.optional(S.String),
    DomainValidationOptions: S.optional(DomainValidationOptionList),
    Options: S.optional(CertificateOptions),
    CertificateAuthorityArn: S.optional(S.String),
    Tags: S.optional(TagList),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    ManagedBy: S.optional(CertificateManagedBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RequestCertificateRequest",
}) as any as S.Schema<RequestCertificateRequest>;
export interface RequestCertificateResponse {
  CertificateArn?: string;
}
export const RequestCertificateResponse = S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "RequestCertificateResponse",
}) as any as S.Schema<RequestCertificateResponse>;
export interface ResendValidationEmailRequest {
  CertificateArn: string;
  Domain: string;
  ValidationDomain: string;
}
export const ResendValidationEmailRequest = S.suspend(() =>
  S.Struct({
    CertificateArn: S.String,
    Domain: S.String,
    ValidationDomain: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResendValidationEmailRequest",
}) as any as S.Schema<ResendValidationEmailRequest>;
export interface ResendValidationEmailResponse {}
export const ResendValidationEmailResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResendValidationEmailResponse",
}) as any as S.Schema<ResendValidationEmailResponse>;
export interface RevokeCertificateRequest {
  CertificateArn: string;
  RevocationReason: RevocationReason;
}
export const RevokeCertificateRequest = S.suspend(() =>
  S.Struct({
    CertificateArn: S.String,
    RevocationReason: RevocationReason,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RevokeCertificateRequest",
}) as any as S.Schema<RevokeCertificateRequest>;
export interface RevokeCertificateResponse {
  CertificateArn?: string;
}
export const RevokeCertificateResponse = S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "RevokeCertificateResponse",
}) as any as S.Schema<RevokeCertificateResponse>;
export interface UpdateCertificateOptionsRequest {
  CertificateArn: string;
  Options: CertificateOptions;
}
export const UpdateCertificateOptionsRequest = S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Options: CertificateOptions }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCertificateOptionsRequest",
}) as any as S.Schema<UpdateCertificateOptionsRequest>;
export interface UpdateCertificateOptionsResponse {}
export const UpdateCertificateOptionsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCertificateOptionsResponse",
}) as any as S.Schema<UpdateCertificateOptionsResponse>;

//# Errors
export class InvalidArnException extends S.TaggedErrorClass<InvalidArnException>()(
  "InvalidArnException",
  { message: S.optional(S.String) },
) {}
export class InvalidParameterException extends S.TaggedErrorClass<InvalidParameterException>()(
  "InvalidParameterException",
  { message: S.optional(S.String) },
) {}
export class InvalidTagException extends S.TaggedErrorClass<InvalidTagException>()(
  "InvalidTagException",
  { message: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
) {}
export class TagPolicyException extends S.TaggedErrorClass<TagPolicyException>()(
  "TagPolicyException",
  { message: S.optional(S.String) },
) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.optional(S.String) },
) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
  T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { message: S.optional(S.String) },
) {}
export class RequestInProgressException extends S.TaggedErrorClass<RequestInProgressException>()(
  "RequestInProgressException",
  { message: S.optional(S.String) },
) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { message: S.optional(S.String) },
) {}
export class InvalidArgsException extends S.TaggedErrorClass<InvalidArgsException>()(
  "InvalidArgsException",
  { message: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class InvalidDomainValidationOptionsException extends S.TaggedErrorClass<InvalidDomainValidationOptionsException>()(
  "InvalidDomainValidationOptionsException",
  { message: S.optional(S.String) },
) {}
export class InvalidStateException extends S.TaggedErrorClass<InvalidStateException>()(
  "InvalidStateException",
  { message: S.optional(S.String) },
) {}

//# Operations
export type AddTagsToCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more tags to an ACM certificate. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a `key` and an optional `value`. You specify the certificate on input by its Amazon Resource Name (ARN). You specify the tag by using a key-value pair.
 *
 * You can apply a tag to just one certificate if you want to identify a specific characteristic of that certificate, or you can apply the same tag to multiple certificates if you want to filter for a common relationship among those certificates. Similarly, you can apply the same tag to multiple resources if you want to specify a relationship among those resources. For example, you can add the same tag to an ACM certificate and an Elastic Load Balancing load balancer to indicate that they are both used by the same website. For more information, see Tagging ACM certificates.
 *
 * To remove one or more tags, use the RemoveTagsFromCertificate action. To view all of the tags that have been applied to the certificate, use the ListTagsForCertificate action.
 */
export const addTagsToCertificate: API.OperationMethod<
  AddTagsToCertificateRequest,
  AddTagsToCertificateResponse,
  AddTagsToCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddTagsToCertificateRequest,
  output: AddTagsToCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
export type DeleteCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a certificate and its associated private key. If this action succeeds, the certificate no longer appears in the list that can be displayed by calling the ListCertificates action or be retrieved by calling the GetCertificate action. The certificate will not be available for use by Amazon Web Services services integrated with ACM.
 *
 * You cannot delete an ACM certificate that is being used by another Amazon Web Services service. To delete a certificate that is in use, the certificate association must first be removed.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCertificateRequest,
  output: DeleteCertificateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
export type DescribeCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeCertificateRequest,
  output: DescribeCertificateResponse,
  errors: [InvalidArnException, ResourceNotFoundException],
}));
export type ExportCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports a private certificate issued by a private certificate authority (CA) or public certificate for use anywhere. The exported file contains the certificate, the certificate chain, and the encrypted private key associated with the public key that is embedded in the certificate. For security, you must assign a passphrase for the private key when exporting it.
 *
 * For information about exporting and formatting a certificate using the ACM console or CLI, see Export a private certificate and Export a public certificate.
 */
export const exportCertificate: API.OperationMethod<
  ExportCertificateRequest,
  ExportCertificateResponse,
  ExportCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportCertificateRequest,
  output: ExportCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountConfigurationRequest,
  output: GetAccountConfigurationResponse,
  errors: [AccessDeniedException, ThrottlingException],
}));
export type GetCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a certificate and its certificate chain. The certificate may be either a public or private certificate issued using the ACM `RequestCertificate` action, or a certificate imported into ACM using the `ImportCertificate` action. The chain consists of the certificate of the issuing CA and the intermediate certificates of any other subordinate CAs. All of the certificates are base64 encoded. You can use OpenSSL to decode the certificates and inspect individual fields.
 */
export const getCertificate: API.OperationMethod<
  GetCertificateRequest,
  GetCertificateResponse,
  GetCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCertificateRequest,
  output: GetCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
}));
export type ImportCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | LimitExceededException
  | ResourceNotFoundException
  | TagPolicyException
  | TooManyTagsException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportCertificateRequest,
  output: ImportCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    ResourceNotFoundException,
    TagPolicyException,
    TooManyTagsException,
  ],
}));
export type ListCertificatesError =
  | InvalidArgsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of certificate ARNs and domain names. You can request that only certificates that match a specific status be listed. You can also filter by specific attributes of the certificate. Default filtering returns only `RSA_2048` certificates. For more information, see Filters.
 */
export const listCertificates: API.OperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCertificatesRequest,
  ) => stream.Stream<
    ListCertificatesResponse,
    ListCertificatesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCertificatesRequest,
  ) => stream.Stream<
    CertificateSummary,
    ListCertificatesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCertificatesRequest,
  output: ListCertificatesResponse,
  errors: [InvalidArgsException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CertificateSummaryList",
    pageSize: "MaxItems",
  } as const,
}));
export type ListTagsForCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags that have been applied to the ACM certificate. Use the certificate's Amazon Resource Name (ARN) to specify the certificate. To add a tag to an ACM certificate, use the AddTagsToCertificate action. To delete a tag, use the RemoveTagsFromCertificate action.
 */
export const listTagsForCertificate: API.OperationMethod<
  ListTagsForCertificateRequest,
  ListTagsForCertificateResponse,
  ListTagsForCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForCertificateRequest,
  output: ListTagsForCertificateResponse,
  errors: [InvalidArnException, ResourceNotFoundException],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutAccountConfigurationRequest,
  output: PutAccountConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type RemoveTagsFromCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | CommonErrors;
/**
 * Remove one or more tags from an ACM certificate. A tag consists of a key-value pair. If you do not specify the value portion of the tag when calling this function, the tag will be removed regardless of value. If you specify a value, the tag is removed only if it is associated with the specified value.
 *
 * To add tags to a certificate, use the AddTagsToCertificate action. To view all of the tags that have been applied to a specific ACM certificate, use the ListTagsForCertificate action.
 */
export const removeTagsFromCertificate: API.OperationMethod<
  RemoveTagsFromCertificateRequest,
  RemoveTagsFromCertificateResponse,
  RemoveTagsFromCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveTagsFromCertificateRequest,
  output: RemoveTagsFromCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
  ],
}));
export type RenewCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Renews an eligible ACM certificate. In order to renew your Amazon Web Services Private CA certificates with ACM, you must first grant the ACM service principal permission to do so. For more information, see Testing Managed Renewal in the ACM User Guide.
 */
export const renewCertificate: API.OperationMethod<
  RenewCertificateRequest,
  RenewCertificateResponse,
  RenewCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RenewCertificateRequest,
  output: RenewCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestCertificateRequest,
  output: RequestCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
}));
export type ResendValidationEmailError =
  | InvalidArnException
  | InvalidDomainValidationOptionsException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resends the email that requests domain ownership validation. The domain owner or an authorized representative must approve the ACM certificate before it can be issued. The certificate can be approved by clicking a link in the mail to navigate to the Amazon certificate approval website and then clicking **I Approve**. However, the validation email can be blocked by spam filters. Therefore, if you do not receive the original mail, you can request that the mail be resent within 72 hours of requesting the ACM certificate. If more than 72 hours have elapsed since your original request or since your last attempt to resend validation mail, you must request a new certificate. For more information about setting up your contact email addresses, see Configure Email for your Domain.
 */
export const resendValidationEmail: API.OperationMethod<
  ResendValidationEmailRequest,
  ResendValidationEmailResponse,
  ResendValidationEmailError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResendValidationEmailRequest,
  output: ResendValidationEmailResponse,
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
}));
export type RevokeCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Revokes a public ACM certificate. You can only revoke certificates that have been previously exported.
 */
export const revokeCertificate: API.OperationMethod<
  RevokeCertificateRequest,
  RevokeCertificateResponse,
  RevokeCertificateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevokeCertificateRequest,
  output: RevokeCertificateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
export type UpdateCertificateOptionsError =
  | InvalidArnException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a certificate. You can use this function to specify whether to opt in to or out of recording your certificate in a certificate transparency log and exporting. For more information, see Opting Out of Certificate Transparency Logging and Certificate Manager Exportable Managed Certificates.
 */
export const updateCertificateOptions: API.OperationMethod<
  UpdateCertificateOptionsRequest,
  UpdateCertificateOptionsResponse,
  UpdateCertificateOptionsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCertificateOptionsRequest,
  output: UpdateCertificateOptionsResponse,
  errors: [
    InvalidArnException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
}));
