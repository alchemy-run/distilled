import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Pca Connector Ad",
  target: "PcaConnectorAd",
  version: "2018-05-10",
  sigv4: "pca-connector-ad",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pca-connector-ad.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://pca-connector-ad.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly ServiceCode: string;
    readonly QuotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly ServiceCode?: string;
    readonly QuotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
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
export type ValidityPeriodType =
  | "HOURS"
  | "DAYS"
  | "WEEKS"
  | "MONTHS"
  | "YEARS"
  | (string & {});
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
export type PrivateKeyAlgorithm =
  | "RSA"
  | "ECDH_P256"
  | "ECDH_P384"
  | "ECDH_P521"
  | (string & {});
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
export type ConnectorStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /connectors",
    input: {
      DirectoryId: 0,
      CertificateAuthorityArn: 0,
      VpcInformation: { IpAddressType: 0, SecurityGroupIds: 0 },
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
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
  operationName: "CreateConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /directoryRegistrations",
    input: { DirectoryId: 0, ClientToken: D.m({ idempotency: true }), Tags: 0 },
    body: true,
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
  operationName: "CreateDirectoryRegistration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
    input: {
      DirectoryRegistrationArn: 0,
      ConnectorArn: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "CreateServicePrincipalName",
})) as any;

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
 * using these templates based on the requester’s Active Directory group membership.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /templates",
    input: {
      ConnectorArn: 0,
      Name: 0,
      Definition: i_TemplateDefinition,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
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
  operationName: "CreateTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /templates/{TemplateArn}/accessControlEntries",
    input: {
      TemplateArn: 0,
      GroupSecurityIdentifier: 0,
      GroupDisplayName: 0,
      AccessRights: i_AccessRights,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "CreateTemplateGroupAccessControlEntry",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /connectors/{ConnectorArn}",
    input: { ConnectorArn: 0 },
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
  operationName: "DeleteConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /directoryRegistrations/{DirectoryRegistrationArn}",
    input: { DirectoryRegistrationArn: 0 },
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
  operationName: "DeleteDirectoryRegistration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
    input: { DirectoryRegistrationArn: 0, ConnectorArn: 0 },
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
  operationName: "DeleteServicePrincipalName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /templates/{TemplateArn}",
    input: { TemplateArn: 0 },
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
  operationName: "DeleteTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
    input: { TemplateArn: 0, GroupSecurityIdentifier: 0 },
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
  operationName: "DeleteTemplateGroupAccessControlEntry",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /connectors/{ConnectorArn}",
    input: { ConnectorArn: 0 },
    output: { Connector: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /directoryRegistrations/{DirectoryRegistrationArn}",
    input: { DirectoryRegistrationArn: 0 },
    output: { DirectoryRegistration: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetDirectoryRegistration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames/{ConnectorArn}",
    input: { DirectoryRegistrationArn: 0, ConnectorArn: 0 },
    output: { ServicePrincipalName: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetServicePrincipalName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /templates/{TemplateArn}",
    input: { TemplateArn: 0 },
    output: { Template: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
    input: { TemplateArn: 0, GroupSecurityIdentifier: 0 },
    output: { AccessControlEntry: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetTemplateGroupAccessControlEntry",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /connectors",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Connectors: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /directoryRegistrations",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      DirectoryRegistrations: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /directoryRegistrations/{DirectoryRegistrationArn}/servicePrincipalNames",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      DirectoryRegistrationArn: 0,
    },
    output: {
      ServicePrincipalNames: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /templates/{TemplateArn}/accessControlEntries",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      TemplateArn: 0,
    },
    output: {
      AccessControlEntries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /templates",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      ConnectorArn: D.m({ query: "ConnectorArn" }),
    },
    output: { Templates: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /templates/{TemplateArn}",
    input: {
      TemplateArn: 0,
      Definition: i_TemplateDefinition,
      ReenrollAllCertificateHolders: 0,
    },
    body: true,
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
  operationName: "UpdateTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /templates/{TemplateArn}/accessControlEntries/{GroupSecurityIdentifier}",
    input: {
      TemplateArn: 0,
      GroupSecurityIdentifier: 0,
      GroupDisplayName: 0,
      AccessRights: i_AccessRights,
    },
    body: true,
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
  operationName: "UpdateTemplateGroupAccessControlEntry",
})) as any;

const i_AccessRights: D.LazyStruct = () => ({ Enroll: 0, AutoEnroll: 0 });
const i_TemplateDefinition: D.LazyStruct = () => ({
  TemplateV2: {
    CertificateValidity: i_CertificateValidity,
    SupersededTemplates: 0,
    PrivateKeyAttributes: {
      MinimalKeyLength: 0,
      KeySpec: 0,
      CryptoProviders: 0,
    },
    PrivateKeyFlags: {
      ExportableKey: 0,
      StrongKeyProtectionRequired: 0,
      ClientVersion: 0,
    },
    EnrollmentFlags: {
      IncludeSymmetricAlgorithms: 0,
      UserInteractionRequired: 0,
      RemoveInvalidCertificateFromPersonalStore: 0,
      NoSecurityExtension: 0,
      EnableKeyReuseOnNtTokenKeysetStorageFull: 0,
    },
    SubjectNameFlags: {
      SanRequireDomainDns: 0,
      SanRequireSpn: 0,
      SanRequireDirectoryGuid: 0,
      SanRequireUpn: 0,
      SanRequireEmail: 0,
      SanRequireDns: 0,
      RequireDnsAsCn: 0,
      RequireEmail: 0,
      RequireCommonName: 0,
      RequireDirectoryPath: 0,
    },
    GeneralFlags: { AutoEnrollment: 0, MachineType: 0 },
    Extensions: {
      KeyUsage: i_KeyUsage,
      ApplicationPolicies: i_ApplicationPolicies,
    },
  },
  TemplateV3: {
    CertificateValidity: i_CertificateValidity,
    SupersededTemplates: 0,
    PrivateKeyAttributes: {
      MinimalKeyLength: 0,
      KeySpec: 0,
      CryptoProviders: 0,
      KeyUsageProperty: i_KeyUsageProperty,
      Algorithm: 0,
    },
    PrivateKeyFlags: {
      ExportableKey: 0,
      StrongKeyProtectionRequired: 0,
      RequireAlternateSignatureAlgorithm: 0,
      ClientVersion: 0,
    },
    EnrollmentFlags: {
      IncludeSymmetricAlgorithms: 0,
      UserInteractionRequired: 0,
      RemoveInvalidCertificateFromPersonalStore: 0,
      NoSecurityExtension: 0,
      EnableKeyReuseOnNtTokenKeysetStorageFull: 0,
    },
    SubjectNameFlags: {
      SanRequireDomainDns: 0,
      SanRequireSpn: 0,
      SanRequireDirectoryGuid: 0,
      SanRequireUpn: 0,
      SanRequireEmail: 0,
      SanRequireDns: 0,
      RequireDnsAsCn: 0,
      RequireEmail: 0,
      RequireCommonName: 0,
      RequireDirectoryPath: 0,
    },
    GeneralFlags: { AutoEnrollment: 0, MachineType: 0 },
    HashAlgorithm: 0,
    Extensions: {
      KeyUsage: i_KeyUsage,
      ApplicationPolicies: i_ApplicationPolicies,
    },
  },
  TemplateV4: {
    CertificateValidity: i_CertificateValidity,
    SupersededTemplates: 0,
    PrivateKeyAttributes: {
      MinimalKeyLength: 0,
      KeySpec: 0,
      CryptoProviders: 0,
      KeyUsageProperty: i_KeyUsageProperty,
      Algorithm: 0,
    },
    PrivateKeyFlags: {
      ExportableKey: 0,
      StrongKeyProtectionRequired: 0,
      RequireAlternateSignatureAlgorithm: 0,
      RequireSameKeyRenewal: 0,
      UseLegacyProvider: 0,
      ClientVersion: 0,
    },
    EnrollmentFlags: {
      IncludeSymmetricAlgorithms: 0,
      UserInteractionRequired: 0,
      RemoveInvalidCertificateFromPersonalStore: 0,
      NoSecurityExtension: 0,
      EnableKeyReuseOnNtTokenKeysetStorageFull: 0,
    },
    SubjectNameFlags: {
      SanRequireDomainDns: 0,
      SanRequireSpn: 0,
      SanRequireDirectoryGuid: 0,
      SanRequireUpn: 0,
      SanRequireEmail: 0,
      SanRequireDns: 0,
      RequireDnsAsCn: 0,
      RequireEmail: 0,
      RequireCommonName: 0,
      RequireDirectoryPath: 0,
    },
    GeneralFlags: { AutoEnrollment: 0, MachineType: 0 },
    HashAlgorithm: 0,
    Extensions: {
      KeyUsage: i_KeyUsage,
      ApplicationPolicies: i_ApplicationPolicies,
    },
  },
});
const i_ApplicationPolicies: D.LazyStruct = () => ({
  Critical: 0,
  Policies: D.list({ PolicyType: 0, PolicyObjectIdentifier: 0 }),
});
const i_CertificateValidity: D.LazyStruct = () => ({
  ValidityPeriod: i_ValidityPeriod,
  RenewalPeriod: i_ValidityPeriod,
});
const i_KeyUsage: D.LazyStruct = () => ({
  Critical: 0,
  UsageFlags: {
    DigitalSignature: 0,
    NonRepudiation: 0,
    KeyEncipherment: 0,
    DataEncipherment: 0,
    KeyAgreement: 0,
  },
});
const i_KeyUsageProperty: D.LazyStruct = () => ({
  PropertyType: 0,
  PropertyFlags: { Decrypt: 0, KeyAgreement: 0, Sign: 0 },
});
const i_ValidityPeriod: D.LazyStruct = () => ({ PeriodType: 0, Period: 0 });
