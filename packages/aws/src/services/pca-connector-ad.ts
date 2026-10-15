import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Pca Connector Ad",
  serviceShapeName: "PcaConnectorAd",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "pca-connector-ad" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://pca-connector-ad-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pca-connector-ad-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pca-connector-ad.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://pca-connector-ad.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://pca-connector-ad.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DirectoryId = string;
export type CertificateAuthorityArn = string;
export type IpAddressType = "IPV4" | "DUALSTACK" | (string & {});
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface VpcInformation {
  IpAddressType?: IpAddressType;
  SecurityGroupIds: string[];
}
export type ClientToken = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateConnectorRequest {
  DirectoryId: string;
  CertificateAuthorityArn: string;
  VpcInformation: VpcInformation;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ConnectorArn = string;
export interface CreateConnectorResponse {
  ConnectorArn?: string;
}
export interface CreateDirectoryRegistrationRequest {
  DirectoryId: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type DirectoryRegistrationArn = string;
export interface CreateDirectoryRegistrationResponse {
  DirectoryRegistrationArn?: string;
}
export interface CreateServicePrincipalNameRequest {
  DirectoryRegistrationArn: string;
  ConnectorArn: string;
  ClientToken?: string;
}
export interface CreateServicePrincipalNameResponse {}
export type TemplateName = string;
export type ValidityPeriodType = "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS" | (string & {});
export interface ValidityPeriod {
  PeriodType: ValidityPeriodType;
  Period: number;
}
export interface CertificateValidity {
  ValidityPeriod: ValidityPeriod;
  RenewalPeriod: ValidityPeriod;
}
export type TemplateNameList = string[];
export type KeySpec = "KEY_EXCHANGE" | "SIGNATURE" | (string & {});
export type CryptoProvidersList = string[];
export interface PrivateKeyAttributesV2 {
  MinimalKeyLength: number;
  KeySpec: KeySpec;
  CryptoProviders?: string[];
}
export type ClientCompatibilityV2 =
  | "WINDOWS_SERVER_2003"
  | "WINDOWS_SERVER_2008"
  | "WINDOWS_SERVER_2008_R2"
  | "WINDOWS_SERVER_2012"
  | "WINDOWS_SERVER_2012_R2"
  | "WINDOWS_SERVER_2016"
  | (string & {});
export interface PrivateKeyFlagsV2 {
  ExportableKey?: boolean;
  StrongKeyProtectionRequired?: boolean;
  ClientVersion: ClientCompatibilityV2;
}
export interface EnrollmentFlagsV2 {
  IncludeSymmetricAlgorithms?: boolean;
  UserInteractionRequired?: boolean;
  RemoveInvalidCertificateFromPersonalStore?: boolean;
  NoSecurityExtension?: boolean;
  EnableKeyReuseOnNtTokenKeysetStorageFull?: boolean;
}
export interface SubjectNameFlagsV2 {
  SanRequireDomainDns?: boolean;
  SanRequireSpn?: boolean;
  SanRequireDirectoryGuid?: boolean;
  SanRequireUpn?: boolean;
  SanRequireEmail?: boolean;
  SanRequireDns?: boolean;
  RequireDnsAsCn?: boolean;
  RequireEmail?: boolean;
  RequireCommonName?: boolean;
  RequireDirectoryPath?: boolean;
}
export interface GeneralFlagsV2 {
  AutoEnrollment?: boolean;
  MachineType?: boolean;
}
export interface KeyUsageFlags {
  DigitalSignature?: boolean;
  NonRepudiation?: boolean;
  KeyEncipherment?: boolean;
  DataEncipherment?: boolean;
  KeyAgreement?: boolean;
}
export interface KeyUsage {
  Critical?: boolean;
  UsageFlags: KeyUsageFlags;
}
export type ApplicationPolicyType =
  | "ALL_APPLICATION_POLICIES"
  | "ANY_PURPOSE"
  | "ATTESTATION_IDENTITY_KEY_CERTIFICATE"
  | "CERTIFICATE_REQUEST_AGENT"
  | "CLIENT_AUTHENTICATION"
  | "CODE_SIGNING"
  | "CTL_USAGE"
  | "DIGITAL_RIGHTS"
  | "DIRECTORY_SERVICE_EMAIL_REPLICATION"
  | "DISALLOWED_LIST"
  | "DNS_SERVER_TRUST"
  | "DOCUMENT_ENCRYPTION"
  | "DOCUMENT_SIGNING"
  | "DYNAMIC_CODE_GENERATOR"
  | "EARLY_LAUNCH_ANTIMALWARE_DRIVER"
  | "EMBEDDED_WINDOWS_SYSTEM_COMPONENT_VERIFICATION"
  | "ENCLAVE"
  | "ENCRYPTING_FILE_SYSTEM"
  | "ENDORSEMENT_KEY_CERTIFICATE"
  | "FILE_RECOVERY"
  | "HAL_EXTENSION"
  | "IP_SECURITY_END_SYSTEM"
  | "IP_SECURITY_IKE_INTERMEDIATE"
  | "IP_SECURITY_TUNNEL_TERMINATION"
  | "IP_SECURITY_USER"
  | "ISOLATED_USER_MODE"
  | "KDC_AUTHENTICATION"
  | "KERNEL_MODE_CODE_SIGNING"
  | "KEY_PACK_LICENSES"
  | "KEY_RECOVERY"
  | "KEY_RECOVERY_AGENT"
  | "LICENSE_SERVER_VERIFICATION"
  | "LIFETIME_SIGNING"
  | "MICROSOFT_PUBLISHER"
  | "MICROSOFT_TIME_STAMPING"
  | "MICROSOFT_TRUST_LIST_SIGNING"
  | "OCSP_SIGNING"
  | "OEM_WINDOWS_SYSTEM_COMPONENT_VERIFICATION"
  | "PLATFORM_CERTIFICATE"
  | "PREVIEW_BUILD_SIGNING"
  | "PRIVATE_KEY_ARCHIVAL"
  | "PROTECTED_PROCESS_LIGHT_VERIFICATION"
  | "PROTECTED_PROCESS_VERIFICATION"
  | "QUALIFIED_SUBORDINATION"
  | "REVOKED_LIST_SIGNER"
  | "ROOT_PROGRAM_AUTO_UPDATE_CA_REVOCATION"
  | "ROOT_PROGRAM_AUTO_UPDATE_END_REVOCATION"
  | "ROOT_PROGRAM_NO_OSCP_FAILOVER_TO_CRL"
  | "ROOT_LIST_SIGNER"
  | "SECURE_EMAIL"
  | "SERVER_AUTHENTICATION"
  | "SMART_CARD_LOGIN"
  | "SPC_ENCRYPTED_DIGEST_RETRY_COUNT"
  | "SPC_RELAXED_PE_MARKER_CHECK"
  | "TIME_STAMPING"
  | "WINDOWS_HARDWARE_DRIVER_ATTESTED_VERIFICATION"
  | "WINDOWS_HARDWARE_DRIVER_EXTENDED_VERIFICATION"
  | "WINDOWS_HARDWARE_DRIVER_VERIFICATION"
  | "WINDOWS_HELLO_RECOVERY_KEY_ENCRYPTION"
  | "WINDOWS_KITS_COMPONENT"
  | "WINDOWS_RT_VERIFICATION"
  | "WINDOWS_SOFTWARE_EXTENSION_VERIFICATION"
  | "WINDOWS_STORE"
  | "WINDOWS_SYSTEM_COMPONENT_VERIFICATION"
  | "WINDOWS_TCB_COMPONENT"
  | "WINDOWS_THIRD_PARTY_APPLICATION_COMPONENT"
  | "WINDOWS_UPDATE"
  | (string & {});
export type CustomObjectIdentifier = string;
export type ApplicationPolicy =
  | { PolicyType: ApplicationPolicyType; PolicyObjectIdentifier?: never }
  | { PolicyType?: never; PolicyObjectIdentifier: string };
export type ApplicationPolicyList = ApplicationPolicy[];
export interface ApplicationPolicies {
  Critical?: boolean;
  Policies: ApplicationPolicy[];
}
export interface ExtensionsV2 {
  KeyUsage: KeyUsage;
  ApplicationPolicies?: ApplicationPolicies;
}
export interface TemplateV2 {
  CertificateValidity: CertificateValidity;
  SupersededTemplates?: string[];
  PrivateKeyAttributes: PrivateKeyAttributesV2;
  PrivateKeyFlags: PrivateKeyFlagsV2;
  EnrollmentFlags: EnrollmentFlagsV2;
  SubjectNameFlags: SubjectNameFlagsV2;
  GeneralFlags: GeneralFlagsV2;
  Extensions: ExtensionsV2;
}
export type KeyUsagePropertyType = "ALL" | (string & {});
export interface KeyUsagePropertyFlags {
  Decrypt?: boolean;
  KeyAgreement?: boolean;
  Sign?: boolean;
}
export type KeyUsageProperty =
  | { PropertyType: KeyUsagePropertyType; PropertyFlags?: never }
  | { PropertyType?: never; PropertyFlags: KeyUsagePropertyFlags };
export type PrivateKeyAlgorithm = "RSA" | "ECDH_P256" | "ECDH_P384" | "ECDH_P521" | (string & {});
export interface PrivateKeyAttributesV3 {
  MinimalKeyLength: number;
  KeySpec: KeySpec;
  CryptoProviders?: string[];
  KeyUsageProperty: KeyUsageProperty;
  Algorithm: PrivateKeyAlgorithm;
}
export type ClientCompatibilityV3 =
  | "WINDOWS_SERVER_2008"
  | "WINDOWS_SERVER_2008_R2"
  | "WINDOWS_SERVER_2012"
  | "WINDOWS_SERVER_2012_R2"
  | "WINDOWS_SERVER_2016"
  | (string & {});
export interface PrivateKeyFlagsV3 {
  ExportableKey?: boolean;
  StrongKeyProtectionRequired?: boolean;
  RequireAlternateSignatureAlgorithm?: boolean;
  ClientVersion: ClientCompatibilityV3;
}
export interface EnrollmentFlagsV3 {
  IncludeSymmetricAlgorithms?: boolean;
  UserInteractionRequired?: boolean;
  RemoveInvalidCertificateFromPersonalStore?: boolean;
  NoSecurityExtension?: boolean;
  EnableKeyReuseOnNtTokenKeysetStorageFull?: boolean;
}
export interface SubjectNameFlagsV3 {
  SanRequireDomainDns?: boolean;
  SanRequireSpn?: boolean;
  SanRequireDirectoryGuid?: boolean;
  SanRequireUpn?: boolean;
  SanRequireEmail?: boolean;
  SanRequireDns?: boolean;
  RequireDnsAsCn?: boolean;
  RequireEmail?: boolean;
  RequireCommonName?: boolean;
  RequireDirectoryPath?: boolean;
}
export interface GeneralFlagsV3 {
  AutoEnrollment?: boolean;
  MachineType?: boolean;
}
export type HashAlgorithm = "SHA256" | "SHA384" | "SHA512" | (string & {});
export interface ExtensionsV3 {
  KeyUsage: KeyUsage;
  ApplicationPolicies?: ApplicationPolicies;
}
export interface TemplateV3 {
  CertificateValidity: CertificateValidity;
  SupersededTemplates?: string[];
  PrivateKeyAttributes: PrivateKeyAttributesV3;
  PrivateKeyFlags: PrivateKeyFlagsV3;
  EnrollmentFlags: EnrollmentFlagsV3;
  SubjectNameFlags: SubjectNameFlagsV3;
  GeneralFlags: GeneralFlagsV3;
  HashAlgorithm: HashAlgorithm;
  Extensions: ExtensionsV3;
}
export interface PrivateKeyAttributesV4 {
  MinimalKeyLength: number;
  KeySpec: KeySpec;
  CryptoProviders?: string[];
  KeyUsageProperty?: KeyUsageProperty;
  Algorithm?: PrivateKeyAlgorithm;
}
export type ClientCompatibilityV4 =
  | "WINDOWS_SERVER_2012"
  | "WINDOWS_SERVER_2012_R2"
  | "WINDOWS_SERVER_2016"
  | (string & {});
export interface PrivateKeyFlagsV4 {
  ExportableKey?: boolean;
  StrongKeyProtectionRequired?: boolean;
  RequireAlternateSignatureAlgorithm?: boolean;
  RequireSameKeyRenewal?: boolean;
  UseLegacyProvider?: boolean;
  ClientVersion: ClientCompatibilityV4;
}
export interface EnrollmentFlagsV4 {
  IncludeSymmetricAlgorithms?: boolean;
  UserInteractionRequired?: boolean;
  RemoveInvalidCertificateFromPersonalStore?: boolean;
  NoSecurityExtension?: boolean;
  EnableKeyReuseOnNtTokenKeysetStorageFull?: boolean;
}
export interface SubjectNameFlagsV4 {
  SanRequireDomainDns?: boolean;
  SanRequireSpn?: boolean;
  SanRequireDirectoryGuid?: boolean;
  SanRequireUpn?: boolean;
  SanRequireEmail?: boolean;
  SanRequireDns?: boolean;
  RequireDnsAsCn?: boolean;
  RequireEmail?: boolean;
  RequireCommonName?: boolean;
  RequireDirectoryPath?: boolean;
}
export interface GeneralFlagsV4 {
  AutoEnrollment?: boolean;
  MachineType?: boolean;
}
export interface ExtensionsV4 {
  KeyUsage: KeyUsage;
  ApplicationPolicies?: ApplicationPolicies;
}
export interface TemplateV4 {
  CertificateValidity: CertificateValidity;
  SupersededTemplates?: string[];
  PrivateKeyAttributes: PrivateKeyAttributesV4;
  PrivateKeyFlags: PrivateKeyFlagsV4;
  EnrollmentFlags: EnrollmentFlagsV4;
  SubjectNameFlags: SubjectNameFlagsV4;
  GeneralFlags: GeneralFlagsV4;
  HashAlgorithm?: HashAlgorithm;
  Extensions: ExtensionsV4;
}
export type TemplateDefinition =
  | { TemplateV2: TemplateV2; TemplateV3?: never; TemplateV4?: never }
  | { TemplateV2?: never; TemplateV3: TemplateV3; TemplateV4?: never }
  | { TemplateV2?: never; TemplateV3?: never; TemplateV4: TemplateV4 };
export interface CreateTemplateRequest {
  ConnectorArn: string;
  Name: string;
  Definition: TemplateDefinition;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type TemplateArn = string;
export interface CreateTemplateResponse {
  TemplateArn?: string;
}
export type GroupSecurityIdentifier = string;
export type DisplayName = string;
export type AccessRight = "ALLOW" | "DENY" | (string & {});
export interface AccessRights {
  Enroll?: AccessRight;
  AutoEnroll?: AccessRight;
}
export interface CreateTemplateGroupAccessControlEntryRequest {
  TemplateArn: string;
  GroupSecurityIdentifier: string;
  GroupDisplayName: string;
  AccessRights: AccessRights;
  ClientToken?: string;
}
export interface CreateTemplateGroupAccessControlEntryResponse {}
export interface DeleteConnectorRequest {
  ConnectorArn: string;
}
export interface DeleteConnectorResponse {}
export interface DeleteDirectoryRegistrationRequest {
  DirectoryRegistrationArn: string;
}
export interface DeleteDirectoryRegistrationResponse {}
export interface DeleteServicePrincipalNameRequest {
  DirectoryRegistrationArn: string;
  ConnectorArn: string;
}
export interface DeleteServicePrincipalNameResponse {}
export interface DeleteTemplateRequest {
  TemplateArn: string;
}
export interface DeleteTemplateResponse {}
export interface DeleteTemplateGroupAccessControlEntryRequest {
  TemplateArn: string;
  GroupSecurityIdentifier: string;
}
export interface DeleteTemplateGroupAccessControlEntryResponse {}
export interface GetConnectorRequest {
  ConnectorArn: string;
}
export type ConnectorStatus = "CREATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
export type ConnectorStatusReason =
  | "CA_CERTIFICATE_REGISTRATION_FAILED"
  | "DIRECTORY_ACCESS_DENIED"
  | "INTERNAL_FAILURE"
  | "INSUFFICIENT_FREE_ADDRESSES"
  | "INVALID_SUBNET_IP_PROTOCOL"
  | "PRIVATECA_ACCESS_DENIED"
  | "PRIVATECA_RESOURCE_NOT_FOUND"
  | "SECURITY_GROUP_NOT_IN_VPC"
  | "VPC_ACCESS_DENIED"
  | "VPC_ENDPOINT_LIMIT_EXCEEDED"
  | "VPC_RESOURCE_NOT_FOUND"
  | (string & {});
export interface Connector {
  Arn?: string;
  CertificateAuthorityArn?: string;
  CertificateEnrollmentPolicyServerEndpoint?: string;
  DirectoryId?: string;
  VpcInformation?: VpcInformation;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetConnectorResponse {
  Connector?: Connector;
}
export interface GetDirectoryRegistrationRequest {
  DirectoryRegistrationArn: string;
}
export type DirectoryRegistrationStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type DirectoryRegistrationStatusReason =
  | "DIRECTORY_ACCESS_DENIED"
  | "DIRECTORY_RESOURCE_NOT_FOUND"
  | "DIRECTORY_NOT_ACTIVE"
  | "DIRECTORY_NOT_REACHABLE"
  | "DIRECTORY_TYPE_NOT_SUPPORTED"
  | "INTERNAL_FAILURE"
  | (string & {});
export interface DirectoryRegistration {
  Arn?: string;
  DirectoryId?: string;
  Status?: DirectoryRegistrationStatus;
  StatusReason?: DirectoryRegistrationStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetDirectoryRegistrationResponse {
  DirectoryRegistration?: DirectoryRegistration;
}
export interface GetServicePrincipalNameRequest {
  DirectoryRegistrationArn: string;
  ConnectorArn: string;
}
export type ServicePrincipalNameStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ServicePrincipalNameStatusReason =
  | "DIRECTORY_ACCESS_DENIED"
  | "DIRECTORY_NOT_REACHABLE"
  | "DIRECTORY_RESOURCE_NOT_FOUND"
  | "SPN_EXISTS_ON_DIFFERENT_AD_OBJECT"
  | "SPN_LIMIT_EXCEEDED"
  | "INTERNAL_FAILURE"
  | (string & {});
export interface ServicePrincipalName {
  DirectoryRegistrationArn?: string;
  ConnectorArn?: string;
  Status?: ServicePrincipalNameStatus;
  StatusReason?: ServicePrincipalNameStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetServicePrincipalNameResponse {
  ServicePrincipalName?: ServicePrincipalName;
}
export interface GetTemplateRequest {
  TemplateArn: string;
}
export type TemplateStatus = "ACTIVE" | "DELETING" | (string & {});
export interface TemplateRevision {
  MajorRevision: number;
  MinorRevision: number;
}
export interface Template {
  Arn?: string;
  ConnectorArn?: string;
  Definition?: TemplateDefinition;
  Name?: string;
  ObjectIdentifier?: string;
  PolicySchema?: number;
  Status?: TemplateStatus;
  Revision?: TemplateRevision;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetTemplateResponse {
  Template?: Template;
}
export interface GetTemplateGroupAccessControlEntryRequest {
  TemplateArn: string;
  GroupSecurityIdentifier: string;
}
export interface AccessControlEntry {
  GroupDisplayName?: string;
  GroupSecurityIdentifier?: string;
  AccessRights?: AccessRights;
  TemplateArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetTemplateGroupAccessControlEntryResponse {
  AccessControlEntry?: AccessControlEntry;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ConnectorSummary {
  Arn?: string;
  CertificateAuthorityArn?: string;
  CertificateEnrollmentPolicyServerEndpoint?: string;
  DirectoryId?: string;
  VpcInformation?: VpcInformation;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ConnectorList = ConnectorSummary[];
export interface ListConnectorsResponse {
  Connectors?: ConnectorSummary[];
  NextToken?: string;
}
export interface ListDirectoryRegistrationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DirectoryRegistrationSummary {
  Arn?: string;
  DirectoryId?: string;
  Status?: DirectoryRegistrationStatus;
  StatusReason?: DirectoryRegistrationStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type DirectoryRegistrationList = DirectoryRegistrationSummary[];
export interface ListDirectoryRegistrationsResponse {
  DirectoryRegistrations?: DirectoryRegistrationSummary[];
  NextToken?: string;
}
export interface ListServicePrincipalNamesRequest {
  MaxResults?: number;
  NextToken?: string;
  DirectoryRegistrationArn: string;
}
export interface ServicePrincipalNameSummary {
  DirectoryRegistrationArn?: string;
  ConnectorArn?: string;
  Status?: ServicePrincipalNameStatus;
  StatusReason?: ServicePrincipalNameStatusReason;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ServicePrincipalNameList = ServicePrincipalNameSummary[];
export interface ListServicePrincipalNamesResponse {
  ServicePrincipalNames?: ServicePrincipalNameSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTemplateGroupAccessControlEntriesRequest {
  MaxResults?: number;
  NextToken?: string;
  TemplateArn: string;
}
export interface AccessControlEntrySummary {
  GroupDisplayName?: string;
  GroupSecurityIdentifier?: string;
  AccessRights?: AccessRights;
  TemplateArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type AccessControlEntryList = AccessControlEntrySummary[];
export interface ListTemplateGroupAccessControlEntriesResponse {
  AccessControlEntries?: AccessControlEntrySummary[];
  NextToken?: string;
}
export interface ListTemplatesRequest {
  MaxResults?: number;
  NextToken?: string;
  ConnectorArn: string;
}
export interface TemplateSummary {
  Arn?: string;
  ConnectorArn?: string;
  Definition?: TemplateDefinition;
  Name?: string;
  ObjectIdentifier?: string;
  PolicySchema?: number;
  Status?: TemplateStatus;
  Revision?: TemplateRevision;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type TemplateList = TemplateSummary[];
export interface ListTemplatesResponse {
  Templates?: TemplateSummary[];
  NextToken?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateTemplateRequest {
  TemplateArn: string;
  Definition?: TemplateDefinition;
  ReenrollAllCertificateHolders?: boolean;
}
export interface UpdateTemplateResponse {}
export interface UpdateTemplateGroupAccessControlEntryRequest {
  TemplateArn: string;
  GroupSecurityIdentifier: string;
  GroupDisplayName?: string;
  AccessRights?: AccessRights;
}
export interface UpdateTemplateGroupAccessControlEntryResponse {}
export type ValidationExceptionReason =
  | "FIELD_VALIDATION_FAILED"
  | "INVALID_CA_SUBJECT"
  | "INVALID_PERMISSION"
  | "INVALID_STATE"
  | "MISMATCHED_CONNECTOR"
  | "MISMATCHED_VPC"
  | "NO_CLIENT_TOKEN"
  | "UNKNOWN_OPERATION"
  | "OTHER"
  | (string & {});
export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector between Amazon Web Services Private CA and an Active Directory. You must specify the private CA,
 * directory ID, and security groups.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<CreateConnectorRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<CreateConnectorResponse>,
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
  operationName: "CreateConnector",
}));

export type CreateDirectoryRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a directory registration that authorizes communication between Amazon Web Services Private CA and an
 * Active Directory
 */
export const createDirectoryRegistration: API.OperationMethod<
  CreateDirectoryRegistrationRequest,
  CreateDirectoryRegistrationResponse,
  CreateDirectoryRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<CreateDirectoryRegistrationRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<CreateDirectoryRegistrationResponse>,
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
  operationName: "CreateDirectoryRegistration",
}));

export type CreateServicePrincipalNameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service principal name (SPN) for the service account in Active Directory. Kerberos
 * authentication uses SPNs to associate a service instance with a service sign-in
 * account.
 */
export const createServicePrincipalName: API.OperationMethod<
  CreateServicePrincipalNameRequest,
  CreateServicePrincipalNameResponse,
  CreateServicePrincipalNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<CreateServicePrincipalNameRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateServicePrincipalNameResponse>,
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
  operationName: "CreateServicePrincipalName",
}));

export type CreateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Active Directory compatible certificate template. The connectors issues certificates
 * using these templates based on the requester's Active Directory group membership.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateTemplateRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateTemplateResponse>,
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
  operationName: "CreateTemplate",
}));

export type CreateTemplateGroupAccessControlEntryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a group access control entry. Allow or deny Active Directory groups from enrolling and/or
 * autoenrolling with the template based on the group security identifiers (SIDs).
 */
export const createTemplateGroupAccessControlEntry: API.OperationMethod<
  CreateTemplateGroupAccessControlEntryRequest,
  CreateTemplateGroupAccessControlEntryResponse,
  CreateTemplateGroupAccessControlEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CreateTemplateGroupAccessControlEntryRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateTemplateGroupAccessControlEntryResponse>,
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
  operationName: "CreateTemplateGroupAccessControlEntry",
}));

export type DeleteConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connector for Active Directory. You must provide the Amazon Resource Name (ARN) of the
 * connector that you want to delete. You can find the ARN by calling the https://docs.aws.amazon.com/pca-connector-ad/latest/APIReference/API_ListConnectors
 * action. Deleting a connector does not deregister your directory with Amazon Web Services Private CA. You can
 * deregister your directory by calling the https://docs.aws.amazon.com/pca-connector-ad/latest/APIReference/API_DeleteDirectoryRegistration
 * action.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteConnectorResponse>,
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
  operationName: "DeleteConnector",
}));

export type DeleteDirectoryRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a directory registration. Deleting a directory registration deauthorizes
 * Amazon Web Services Private CA with the directory.
 */
export const deleteDirectoryRegistration: API.OperationMethod<
  DeleteDirectoryRegistrationRequest,
  DeleteDirectoryRegistrationResponse,
  DeleteDirectoryRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<DeleteDirectoryRegistrationRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteDirectoryRegistrationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectoryRegistration",
}));

export type DeleteServicePrincipalNameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the service principal name (SPN) used by a connector to authenticate with your
 * Active Directory.
 */
export const deleteServicePrincipalName: API.OperationMethod<
  DeleteServicePrincipalNameRequest,
  DeleteServicePrincipalNameResponse,
  DeleteServicePrincipalNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<DeleteServicePrincipalNameRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteServicePrincipalNameResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServicePrincipalName",
}));

export type DeleteTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a template. Certificates issued using the template are still valid until they
 * are revoked or expired.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<DeleteTemplateRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteTemplateResponse>,
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
  operationName: "DeleteTemplate",
}));

export type DeleteTemplateGroupAccessControlEntryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group access control entry.
 */
export const deleteTemplateGroupAccessControlEntry: API.OperationMethod<
  DeleteTemplateGroupAccessControlEntryRequest,
  DeleteTemplateGroupAccessControlEntryResponse,
  DeleteTemplateGroupAccessControlEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<DeleteTemplateGroupAccessControlEntryRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteTemplateGroupAccessControlEntryResponse>,
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
  operationName: "DeleteTemplateGroupAccessControlEntry",
}));

export type GetConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about your connector. You specify the connector on input by its ARN
 * (Amazon Resource Name).
 */
export const getConnector: API.OperationMethod<
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<GetConnectorRequest>,
  output: __S(289, __c9, 1) as any as S.Schema<GetConnectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
}));

export type GetDirectoryRegistrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A structure that contains information about your directory registration.
 */
export const getDirectoryRegistration: API.OperationMethod<
  GetDirectoryRegistrationRequest,
  GetDirectoryRegistrationResponse,
  GetDirectoryRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<GetDirectoryRegistrationRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<GetDirectoryRegistrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectoryRegistration",
}));

export type GetServicePrincipalNameError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the service principal name that the connector uses to authenticate with
 * Active Directory.
 */
export const getServicePrincipalName: API.OperationMethod<
  GetServicePrincipalNameRequest,
  GetServicePrincipalNameResponse,
  GetServicePrincipalNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetServicePrincipalNameRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<GetServicePrincipalNameResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServicePrincipalName",
}));

export type GetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a certificate template that the connector uses to issue certificates from a
 * private CA.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateRequest,
  GetTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetTemplateRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<GetTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

export type GetTemplateGroupAccessControlEntryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the group access control entries for a template.
 */
export const getTemplateGroupAccessControlEntry: API.OperationMethod<
  GetTemplateGroupAccessControlEntryRequest,
  GetTemplateGroupAccessControlEntryResponse,
  GetTemplateGroupAccessControlEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetTemplateGroupAccessControlEntryRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<GetTemplateGroupAccessControlEntryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateGroupAccessControlEntry",
}));

export type ListConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors that you created by using the https://docs.aws.amazon.com/pca-connector-ad/latest/APIReference/API_CreateConnector action.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListConnectorsRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<ListConnectorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Connectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDirectoryRegistrationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the directory registrations that you created by using the https://docs.aws.amazon.com/pca-connector-ad/latest/APIReference/API_CreateDirectoryRegistration
 * action.
 */
export const listDirectoryRegistrations: API.PaginatedOperationMethod<
  ListDirectoryRegistrationsRequest,
  ListDirectoryRegistrationsResponse,
  ListDirectoryRegistrationsError,
  Credentials | HttpClient.HttpClient,
  DirectoryRegistrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<ListDirectoryRegistrationsRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<ListDirectoryRegistrationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDirectoryRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DirectoryRegistrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicePrincipalNamesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the service principal names that the connector uses to authenticate with
 * Active Directory.
 */
export const listServicePrincipalNames: API.PaginatedOperationMethod<
  ListServicePrincipalNamesRequest,
  ListServicePrincipalNamesResponse,
  ListServicePrincipalNamesError,
  Credentials | HttpClient.HttpClient,
  ServicePrincipalNameSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListServicePrincipalNamesRequest>,
  output: __S(674, __c21, 2) as any as S.Schema<ListServicePrincipalNamesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicePrincipalNames",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServicePrincipalNames",
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
 * Lists the tags, if any, that are associated with your resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type ListTemplateGroupAccessControlEntriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists group access control entries you created.
 */
export const listTemplateGroupAccessControlEntries: API.PaginatedOperationMethod<
  ListTemplateGroupAccessControlEntriesRequest,
  ListTemplateGroupAccessControlEntriesResponse,
  ListTemplateGroupAccessControlEntriesError,
  Credentials | HttpClient.HttpClient,
  AccessControlEntrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<ListTemplateGroupAccessControlEntriesRequest>,
  output: __S(738, __c23, 2) as any as S.Schema<ListTemplateGroupAccessControlEntriesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateGroupAccessControlEntries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccessControlEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the templates, if any, that are associated with a connector.
 */
export const listTemplates: API.PaginatedOperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<ListTemplatesRequest>,
  output: __S(770, __c24, 2) as any as S.Schema<ListTemplatesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Templates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to your resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from your resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update template configuration to define the information included in certificates.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<UpdateTemplateRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UpdateTemplateResponse>,
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
  operationName: "UpdateTemplate",
}));

export type UpdateTemplateGroupAccessControlEntryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a group access control entry you created using CreateTemplateGroupAccessControlEntry.
 */
export const updateTemplateGroupAccessControlEntry: API.OperationMethod<
  UpdateTemplateGroupAccessControlEntryRequest,
  UpdateTemplateGroupAccessControlEntryResponse,
  UpdateTemplateGroupAccessControlEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<UpdateTemplateGroupAccessControlEntryRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UpdateTemplateGroupAccessControlEntryResponse>,
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
  operationName: "UpdateTemplateGroupAccessControlEntry",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.String,
          Name: S.String,
          Definition: __S(54, __c1, 22),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/templates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TemplateArn: S.optional(S.String) })).annotate({
        identifier: "CreateTemplateResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PeriodType: S.String, Period: S.Number })).annotate({
        identifier: "ValidityPeriod",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ValidityPeriod: __S(32, __c1, 0), RenewalPeriod: __S(32, __c1, 0) }),
      ).annotate({ identifier: "CertificateValidity" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MinimalKeyLength: S.Number,
          KeySpec: S.String,
          CryptoProviders: S.optional(__S(960, __c30, 0)),
        }),
      ).annotate({ identifier: "PrivateKeyAttributesV2" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ExportableKey: S.optional(S.Boolean),
          StrongKeyProtectionRequired: S.optional(S.Boolean),
          ClientVersion: S.String,
        }),
      ).annotate({ identifier: "PrivateKeyFlagsV2" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          IncludeSymmetricAlgorithms: S.optional(S.Boolean),
          UserInteractionRequired: S.optional(S.Boolean),
          RemoveInvalidCertificateFromPersonalStore: S.optional(S.Boolean),
          NoSecurityExtension: S.optional(S.Boolean),
          EnableKeyReuseOnNtTokenKeysetStorageFull: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EnrollmentFlagsV2" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SanRequireDomainDns: S.optional(S.Boolean),
          SanRequireSpn: S.optional(S.Boolean),
          SanRequireDirectoryGuid: S.optional(S.Boolean),
          SanRequireUpn: S.optional(S.Boolean),
          SanRequireEmail: S.optional(S.Boolean),
          SanRequireDns: S.optional(S.Boolean),
          RequireDnsAsCn: S.optional(S.Boolean),
          RequireEmail: S.optional(S.Boolean),
          RequireCommonName: S.optional(S.Boolean),
          RequireDirectoryPath: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SubjectNameFlagsV2" });
    case 6:
      return S.suspend(() =>
        S.Struct({ AutoEnrollment: S.optional(S.Boolean), MachineType: S.optional(S.Boolean) }),
      ).annotate({ identifier: "GeneralFlagsV2" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DigitalSignature: S.optional(S.Boolean),
          NonRepudiation: S.optional(S.Boolean),
          KeyEncipherment: S.optional(S.Boolean),
          DataEncipherment: S.optional(S.Boolean),
          KeyAgreement: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "KeyUsageFlags" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Critical: S.optional(S.Boolean), UsageFlags: __S(39, __c1, 7) }),
      ).annotate({ identifier: "KeyUsage" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ PolicyType: S.String }),
        /*@__PURE__*/ S.Struct({ PolicyObjectIdentifier: S.String }),
      ]);
    case 10:
      return S.Array(__S(41, __c1, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Critical: S.optional(S.Boolean), Policies: __S(42, __c1, 10) }),
      ).annotate({ identifier: "ApplicationPolicies" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          KeyUsage: __S(40, __c1, 8),
          ApplicationPolicies: S.optional(__S(43, __c1, 11)),
        }),
      ).annotate({ identifier: "ExtensionsV2" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          CertificateValidity: __S(33, __c1, 1),
          SupersededTemplates: S.optional(__S(960, __c30, 0)),
          PrivateKeyAttributes: __S(34, __c1, 2),
          PrivateKeyFlags: __S(35, __c1, 3),
          EnrollmentFlags: __S(36, __c1, 4),
          SubjectNameFlags: __S(37, __c1, 5),
          GeneralFlags: __S(38, __c1, 6),
          Extensions: __S(44, __c1, 12),
        }),
      ).annotate({ identifier: "TemplateV2" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Decrypt: S.optional(S.Boolean),
          KeyAgreement: S.optional(S.Boolean),
          Sign: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "KeyUsagePropertyFlags" });
    case 15:
      return S.Union([
        /*@__PURE__*/ S.Struct({ PropertyType: S.String }),
        /*@__PURE__*/ S.Struct({ PropertyFlags: __S(46, __c1, 14) }),
      ]);
    case 16:
      return S.suspend(() =>
        S.Struct({
          MinimalKeyLength: S.Number,
          KeySpec: S.String,
          CryptoProviders: S.optional(__S(960, __c30, 0)),
          KeyUsageProperty: __S(47, __c1, 15),
          Algorithm: S.String,
        }),
      ).annotate({ identifier: "PrivateKeyAttributesV3" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ExportableKey: S.optional(S.Boolean),
          StrongKeyProtectionRequired: S.optional(S.Boolean),
          RequireAlternateSignatureAlgorithm: S.optional(S.Boolean),
          ClientVersion: S.String,
        }),
      ).annotate({ identifier: "PrivateKeyFlagsV3" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          CertificateValidity: __S(33, __c1, 1),
          SupersededTemplates: S.optional(__S(960, __c30, 0)),
          PrivateKeyAttributes: __S(48, __c1, 16),
          PrivateKeyFlags: __S(49, __c1, 17),
          EnrollmentFlags: __S(36, __c1, 4),
          SubjectNameFlags: __S(37, __c1, 5),
          GeneralFlags: __S(38, __c1, 6),
          HashAlgorithm: S.String,
          Extensions: __S(44, __c1, 12),
        }),
      ).annotate({ identifier: "TemplateV3" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          MinimalKeyLength: S.Number,
          KeySpec: S.String,
          CryptoProviders: S.optional(__S(960, __c30, 0)),
          KeyUsageProperty: S.optional(__S(47, __c1, 15)),
          Algorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrivateKeyAttributesV4" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          ExportableKey: S.optional(S.Boolean),
          StrongKeyProtectionRequired: S.optional(S.Boolean),
          RequireAlternateSignatureAlgorithm: S.optional(S.Boolean),
          RequireSameKeyRenewal: S.optional(S.Boolean),
          UseLegacyProvider: S.optional(S.Boolean),
          ClientVersion: S.String,
        }),
      ).annotate({ identifier: "PrivateKeyFlagsV4" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          CertificateValidity: __S(33, __c1, 1),
          SupersededTemplates: S.optional(__S(960, __c30, 0)),
          PrivateKeyAttributes: __S(51, __c1, 19),
          PrivateKeyFlags: __S(52, __c1, 20),
          EnrollmentFlags: __S(36, __c1, 4),
          SubjectNameFlags: __S(37, __c1, 5),
          GeneralFlags: __S(38, __c1, 6),
          HashAlgorithm: S.optional(S.String),
          Extensions: __S(44, __c1, 12),
        }),
      ).annotate({ identifier: "TemplateV4" });
    case 22:
      return S.Union([
        /*@__PURE__*/ S.Struct({ TemplateV2: __S(45, __c1, 13) }),
        /*@__PURE__*/ S.Struct({ TemplateV3: __S(50, __c1, 18) }),
        /*@__PURE__*/ S.Struct({ TemplateV4: __S(53, __c1, 21) }),
      ]);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
          GroupSecurityIdentifier: S.String,
          GroupDisplayName: S.String,
          AccessRights: __S(96, __c3, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/templates/{TemplateArn}/accessControlEntries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTemplateGroupAccessControlEntryRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enroll: S.optional(S.String), AutoEnroll: S.optional(S.String) }),
      ).annotate({ identifier: "AccessRights" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connectors/{ConnectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/directoryRegistrations/{DirectoryRegistrationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDirectoryRegistrationRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
          ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServicePrincipalNameRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/templates/{TemplateArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTemplateRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
          GroupSecurityIdentifier: S.String.pipe(T.HttpLabel("GroupSecurityIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTemplateGroupAccessControlEntryRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connectors/{ConnectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Connector: S.optional(__S(320, __c10, 0)) })).annotate({
        identifier: "GetConnectorResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CertificateAuthorityArn: S.optional(S.String),
          CertificateEnrollmentPolicyServerEndpoint: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          VpcInformation: S.optional(__S(992, __c31, 0)),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Connector" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/directoryRegistrations/{DirectoryRegistrationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDirectoryRegistrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DirectoryRegistration: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "GetDirectoryRegistrationResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DirectoryRegistration" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
          ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServicePrincipalNameRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServicePrincipalName: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "GetServicePrincipalNameResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.optional(S.String),
          ConnectorArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServicePrincipalName" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{TemplateArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Template: S.optional(__S(513, __c16, 1)) })).annotate({
        identifier: "GetTemplateResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MajorRevision: S.Number, MinorRevision: S.Number }),
      ).annotate({ identifier: "TemplateRevision" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConnectorArn: S.optional(S.String),
          Definition: S.optional(__S(54, __c1, 22)),
          Name: S.optional(S.String),
          ObjectIdentifier: S.optional(S.String),
          PolicySchema: S.optional(S.Number),
          Status: S.optional(S.String),
          Revision: S.optional(__S(512, __c16, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Template" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
          GroupSecurityIdentifier: S.String.pipe(T.HttpLabel("GroupSecurityIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTemplateGroupAccessControlEntryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccessControlEntry: S.optional(__S(576, __c18, 0)) }),
      ).annotate({ identifier: "GetTemplateGroupAccessControlEntryResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupDisplayName: S.optional(S.String),
          GroupSecurityIdentifier: S.optional(S.String),
          AccessRights: S.optional(__S(96, __c3, 0)),
          TemplateArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AccessControlEntry" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/connectors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Connectors: S.optional(__S(609, __c19, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/directoryRegistrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDirectoryRegistrationsRequest" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrations: S.optional(__S(641, __c20, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDirectoryRegistrationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListServicePrincipalNamesRequest" });
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServicePrincipalNames: S.optional(__S(673, __c21, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServicePrincipalNamesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1024, __c32, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{TemplateArn}/accessControlEntries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTemplateGroupAccessControlEntriesRequest" });
    case 1:
      return S.Array(__S(576, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccessControlEntries: S.optional(__S(737, __c23, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTemplateGroupAccessControlEntriesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          ConnectorArn: S.String.pipe(T.HttpQuery("ConnectorArn")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/templates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTemplatesRequest" });
    case 1:
      return S.Array(__S(513, __c16, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Templates: S.optional(__S(769, __c24, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTemplatesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(1024, __c32, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(960, __c30, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
          Definition: S.optional(__S(54, __c1, 22)),
          ReenrollAllCertificateHolders: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/templates/{TemplateArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTemplateRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
          GroupSecurityIdentifier: S.String.pipe(T.HttpLabel("GroupSecurityIdentifier")),
          GroupDisplayName: S.optional(S.String),
          AccessRights: S.optional(__S(96, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTemplateGroupAccessControlEntryRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          CertificateAuthorityArn: S.String,
          VpcInformation: __S(992, __c31, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1024, __c32, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ConnectorArn: S.optional(S.String) })).annotate({
        identifier: "CreateConnectorResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IpAddressType: S.optional(S.String), SecurityGroupIds: __S(960, __c30, 0) }),
      ).annotate({ identifier: "VpcInformation" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1024, __c32, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/directoryRegistrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDirectoryRegistrationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DirectoryRegistrationArn: S.optional(S.String) })).annotate(
        { identifier: "CreateDirectoryRegistrationResponse" },
      );
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryRegistrationArn: S.String.pipe(T.HttpLabel("DirectoryRegistrationArn")),
          ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServicePrincipalNameRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateServicePrincipalNameResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
