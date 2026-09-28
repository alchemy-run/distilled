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
  sdkId: "Directory Service",
  target: "DirectoryService_20150416",
  version: "2015-04-16",
  sigv4: "ds",
  protocol: awsJson1_1Protocol,
  xmlns: "http://directoryservice.amazonaws.com/doc/2015-04-16/",
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
                `https://ds-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ds-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ds.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ds.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ADAssessmentLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ADAssessmentLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class AuthenticationFailedException
  extends /*@__PURE__*/ TE.TaggedError("AuthenticationFailedException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class CertificateAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("CertificateAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string; readonly RequestId?: string }> {}
export class CertificateDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("CertificateDoesNotExistException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class CertificateInUseException
  extends /*@__PURE__*/ TE.TaggedError("CertificateInUseException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class CertificateLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("CertificateLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ClientException
  extends /*@__PURE__*/ TE.TaggedError("ClientException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryAlreadyInRegionException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryAlreadyInRegionException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryAlreadySharedException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryAlreadySharedException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryDoesNotExistException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryInDesiredStateException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryInDesiredStateException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryNotSharedException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryNotSharedException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryUnavailableException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DisableAlreadyInProgressException
  extends /*@__PURE__*/ TE.TaggedError("DisableAlreadyInProgressException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class DomainControllerLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DomainControllerLimitExceededException",
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class EnableAlreadyInProgressException
  extends /*@__PURE__*/ TE.TaggedError("EnableAlreadyInProgressException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("EntityAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string; readonly RequestId?: string }> {}
export class EntityDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("EntityDoesNotExistException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class IncompatibleSettingsException
  extends /*@__PURE__*/ TE.TaggedError("IncompatibleSettingsException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InsufficientPermissionsException
  extends /*@__PURE__*/ TE.TaggedError("InsufficientPermissionsException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidCertificateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCertificateException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidClientAuthStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidClientAuthStatusException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidLDAPSStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidLDAPSStatusException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidPasswordException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPasswordException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class InvalidTargetException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class IpRouteLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("IpRouteLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class NoAvailableCertificateException
  extends /*@__PURE__*/ TE.TaggedError("NoAvailableCertificateException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class OrganizationsException
  extends /*@__PURE__*/ TE.TaggedError("OrganizationsException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class RegionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("RegionLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ShareLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ShareLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class SnapshotLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("SnapshotLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class TagLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TagLimitExceededException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class UnsupportedSettingsException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedSettingsException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class UserDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("UserDoesNotExistException")<{
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export type DirectoryId = string;
export interface AcceptSharedDirectoryRequest {
  SharedDirectoryId: string;
}
export type CustomerId = string;
export type ShareMethod = "ORGANIZATIONS" | "HANDSHAKE" | (string & {});
export type ShareStatus =
  | "Shared"
  | "PendingAcceptance"
  | "Rejected"
  | "Rejecting"
  | "RejectFailed"
  | "Sharing"
  | "ShareFailed"
  | "Deleted"
  | "Deleting"
  | (string & {});
export type Notes = string | redacted.Redacted<string>;
export type CreatedDateTime = Date;
export type LastUpdatedDateTime = Date;
export interface SharedDirectory {
  OwnerAccountId?: string;
  OwnerDirectoryId?: string;
  ShareMethod?: ShareMethod;
  SharedAccountId?: string;
  SharedDirectoryId?: string;
  ShareStatus?: ShareStatus;
  ShareNotes?: string | redacted.Redacted<string>;
  CreatedDateTime?: Date;
  LastUpdatedDateTime?: Date;
}
export interface AcceptSharedDirectoryResult {
  SharedDirectory?: SharedDirectory;
}
export type CidrIp = string;
export type CidrIpv6 = string;
export type Description = string;
export interface IpRoute {
  CidrIp?: string;
  CidrIpv6?: string;
  Description?: string;
}
export type IpRoutes = IpRoute[];
export type UpdateSecurityGroupForDirectoryControllers = boolean;
export interface AddIpRoutesRequest {
  DirectoryId: string;
  IpRoutes: IpRoute[];
  UpdateSecurityGroupForDirectoryControllers?: boolean;
}
export interface AddIpRoutesResult {}
export type RegionName = string;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export interface DirectoryVpcSettings {
  VpcId: string;
  SubnetIds: string[];
}
export interface AddRegionRequest {
  DirectoryId: string;
  RegionName: string;
  VPCSettings: DirectoryVpcSettings;
}
export interface AddRegionResult {}
export type ResourceId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export interface AddTagsToResourceRequest {
  ResourceId: string;
  Tags: Tag[];
}
export interface AddTagsToResourceResult {}
export type SchemaExtensionId = string;
export interface CancelSchemaExtensionRequest {
  DirectoryId: string;
  SchemaExtensionId: string;
}
export interface CancelSchemaExtensionResult {}
export type DirectoryName = string;
export type DirectoryShortName = string;
export type ConnectPassword = string | redacted.Redacted<string>;
export type DirectorySize = "Small" | "Large" | (string & {});
export type IpAddr = string;
export type DnsIpAddrs = string[];
export type Ipv6Addr = string;
export type DnsIpv6Addrs = string[];
export type UserName = string;
export interface DirectoryConnectSettings {
  VpcId: string;
  SubnetIds: string[];
  CustomerDnsIps?: string[];
  CustomerDnsIpsV6?: string[];
  CustomerUserName: string;
}
export type NetworkType = "Dual-stack" | "IPv4" | "IPv6" | (string & {});
export interface ConnectDirectoryRequest {
  Name: string;
  ShortName?: string;
  Password: string | redacted.Redacted<string>;
  Description?: string;
  Size: DirectorySize;
  ConnectSettings: DirectoryConnectSettings;
  Tags?: Tag[];
  NetworkType?: NetworkType;
}
export interface ConnectDirectoryResult {
  DirectoryId?: string;
}
export type AliasName = string;
export interface CreateAliasRequest {
  DirectoryId: string;
  Alias: string;
}
export interface CreateAliasResult {
  DirectoryId?: string;
  Alias?: string;
}
export type ComputerName = string;
export type ComputerPassword = string | redacted.Redacted<string>;
export type OrganizationalUnitDN = string;
export type AttributeName = string;
export type AttributeValue = string;
export interface Attribute {
  Name?: string;
  Value?: string;
}
export type Attributes = Attribute[];
export interface CreateComputerRequest {
  DirectoryId: string;
  ComputerName: string;
  Password: string | redacted.Redacted<string>;
  OrganizationalUnitDistinguishedName?: string;
  ComputerAttributes?: Attribute[];
}
export type SID = string;
export interface Computer {
  ComputerId?: string;
  ComputerName?: string;
  ComputerAttributes?: Attribute[];
}
export interface CreateComputerResult {
  Computer?: Computer;
}
export type RemoteDomainName = string;
export interface CreateConditionalForwarderRequest {
  DirectoryId: string;
  RemoteDomainName: string;
  DnsIpAddrs?: string[];
  DnsIpv6Addrs?: string[];
}
export interface CreateConditionalForwarderResult {}
export type Password = string | redacted.Redacted<string>;
export interface CreateDirectoryRequest {
  Name: string;
  ShortName?: string;
  Password: string | redacted.Redacted<string>;
  Description?: string;
  Size: DirectorySize;
  VpcSettings?: DirectoryVpcSettings;
  Tags?: Tag[];
  NetworkType?: NetworkType;
}
export interface CreateDirectoryResult {
  DirectoryId?: string;
}
export type SecretArn = string;
export type AssessmentId = string;
export interface CreateHybridADRequest {
  SecretArn: string;
  AssessmentId: string;
  Tags?: Tag[];
}
export interface CreateHybridADResult {
  DirectoryId?: string;
}
export type LogGroupName = string;
export interface CreateLogSubscriptionRequest {
  DirectoryId: string;
  LogGroupName: string;
}
export interface CreateLogSubscriptionResult {}
export type DirectoryEdition =
  | "Enterprise"
  | "Standard"
  | "Hybrid"
  | (string & {});
export interface CreateMicrosoftADRequest {
  Name: string;
  ShortName?: string;
  Password: string | redacted.Redacted<string>;
  Description?: string;
  VpcSettings: DirectoryVpcSettings;
  Edition?: DirectoryEdition;
  Tags?: Tag[];
  NetworkType?: NetworkType;
}
export interface CreateMicrosoftADResult {
  DirectoryId?: string;
}
export type SnapshotName = string;
export interface CreateSnapshotRequest {
  DirectoryId: string;
  Name?: string;
}
export type SnapshotId = string;
export interface CreateSnapshotResult {
  SnapshotId?: string;
}
export type TrustPassword = string | redacted.Redacted<string>;
export type TrustDirection =
  | "One-Way: Outgoing"
  | "One-Way: Incoming"
  | "Two-Way"
  | (string & {});
export type TrustType = "Forest" | "External" | (string & {});
export type SelectiveAuth = "Enabled" | "Disabled" | (string & {});
export interface CreateTrustRequest {
  DirectoryId: string;
  RemoteDomainName: string;
  TrustPassword: string | redacted.Redacted<string>;
  TrustDirection: TrustDirection;
  TrustType?: TrustType;
  ConditionalForwarderIpAddrs?: string[];
  ConditionalForwarderIpv6Addrs?: string[];
  SelectiveAuth?: SelectiveAuth;
}
export type TrustId = string;
export interface CreateTrustResult {
  TrustId?: string;
}
export interface DeleteADAssessmentRequest {
  AssessmentId: string;
}
export interface DeleteADAssessmentResult {
  AssessmentId?: string;
}
export interface DeleteConditionalForwarderRequest {
  DirectoryId: string;
  RemoteDomainName: string;
}
export interface DeleteConditionalForwarderResult {}
export interface DeleteDirectoryRequest {
  DirectoryId: string;
}
export interface DeleteDirectoryResult {
  DirectoryId?: string;
}
export interface DeleteLogSubscriptionRequest {
  DirectoryId: string;
}
export interface DeleteLogSubscriptionResult {}
export interface DeleteSnapshotRequest {
  SnapshotId: string;
}
export interface DeleteSnapshotResult {
  SnapshotId?: string;
}
export type DeleteAssociatedConditionalForwarder = boolean;
export interface DeleteTrustRequest {
  TrustId: string;
  DeleteAssociatedConditionalForwarder?: boolean;
}
export interface DeleteTrustResult {
  TrustId?: string;
}
export type CertificateId = string;
export interface DeregisterCertificateRequest {
  DirectoryId: string;
  CertificateId: string;
}
export interface DeregisterCertificateResult {}
export type TopicName = string;
export interface DeregisterEventTopicRequest {
  DirectoryId: string;
  TopicName: string;
}
export interface DeregisterEventTopicResult {}
export interface DescribeADAssessmentRequest {
  AssessmentId: string;
}
export type AssessmentStartTime = Date;
export type LastUpdateDateTime = Date;
export type AssessmentStatus = string;
export type AssessmentStatusCode = string;
export type AssessmentStatusReason = string;
export type CustomerDnsIps = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type AssessmentInstanceId = string;
export type AssessmentInstanceIds = string[];
export type AssessmentReportType = string;
export type AssessmentVersion = string;
export interface Assessment {
  AssessmentId?: string;
  DirectoryId?: string;
  DnsName?: string;
  StartTime?: Date;
  LastUpdateDateTime?: Date;
  Status?: string;
  StatusCode?: string;
  StatusReason?: string;
  CustomerDnsIps?: string[];
  VpcId?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  SelfManagedInstanceIds?: string[];
  ReportType?: string;
  Version?: string;
}
export type AssessmentValidationCategory = string;
export type AssessmentValidationName = string;
export type AssessmentValidationStatus = string;
export type AssessmentValidationStatusCode = string;
export type AssessmentValidationStatusReason = string;
export type AssessmentValidationTimeStamp = Date;
export interface AssessmentValidation {
  Category?: string;
  Name?: string;
  Status?: string;
  StatusCode?: string;
  StatusReason?: string;
  StartTime?: Date;
  LastUpdateDateTime?: Date;
}
export type AssessmentValidations = AssessmentValidation[];
export interface AssessmentReport {
  DomainControllerIp?: string;
  Validations?: AssessmentValidation[];
}
export type AssessmentReports = AssessmentReport[];
export interface DescribeADAssessmentResult {
  Assessment?: Assessment;
  AssessmentReports?: AssessmentReport[];
}
export interface DescribeCAEnrollmentPolicyRequest {
  DirectoryId: string;
}
export type PcaConnectorArn = string;
export type CaEnrollmentPolicyStatus =
  | "InProgress"
  | "Success"
  | "Failed"
  | "Disabling"
  | "Disabled"
  | "Impaired"
  | (string & {});
export type CaEnrollmentPolicyStatusReason = string;
export interface DescribeCAEnrollmentPolicyResult {
  DirectoryId?: string;
  PcaConnectorArn?: string;
  CaEnrollmentPolicyStatus?: CaEnrollmentPolicyStatus;
  LastUpdatedDateTime?: Date;
  CaEnrollmentPolicyStatusReason?: string;
}
export interface DescribeCertificateRequest {
  DirectoryId: string;
  CertificateId: string;
}
export type CertificateState =
  | "Registering"
  | "Registered"
  | "RegisterFailed"
  | "Deregistering"
  | "Deregistered"
  | "DeregisterFailed"
  | (string & {});
export type CertificateStateReason = string;
export type CertificateCN = string;
export type CertificateRegisteredDateTime = Date;
export type CertificateExpiryDateTime = Date;
export type CertificateType = "ClientCertAuth" | "ClientLDAPS" | (string & {});
export type OCSPUrl = string;
export interface ClientCertAuthSettings {
  OCSPUrl?: string;
}
export interface Certificate {
  CertificateId?: string;
  State?: CertificateState;
  StateReason?: string;
  CommonName?: string;
  RegisteredDateTime?: Date;
  ExpiryDateTime?: Date;
  Type?: CertificateType;
  ClientCertAuthSettings?: ClientCertAuthSettings;
}
export interface DescribeCertificateResult {
  Certificate?: Certificate;
}
export type ClientAuthenticationType =
  | "SmartCard"
  | "SmartCardOrPassword"
  | (string & {});
export type NextToken = string;
export type PageLimit = number;
export interface DescribeClientAuthenticationSettingsRequest {
  DirectoryId: string;
  Type?: ClientAuthenticationType;
  NextToken?: string;
  Limit?: number;
}
export type ClientAuthenticationStatus = "Enabled" | "Disabled" | (string & {});
export interface ClientAuthenticationSettingInfo {
  Type?: ClientAuthenticationType;
  Status?: ClientAuthenticationStatus;
  LastUpdatedDateTime?: Date;
}
export type ClientAuthenticationSettingsInfo =
  ClientAuthenticationSettingInfo[];
export interface DescribeClientAuthenticationSettingsResult {
  ClientAuthenticationSettingsInfo?: ClientAuthenticationSettingInfo[];
  NextToken?: string;
}
export type RemoteDomainNames = string[];
export interface DescribeConditionalForwardersRequest {
  DirectoryId: string;
  RemoteDomainNames?: string[];
}
export type ReplicationScope = "Domain" | (string & {});
export interface ConditionalForwarder {
  RemoteDomainName?: string;
  DnsIpAddrs?: string[];
  DnsIpv6Addrs?: string[];
  ReplicationScope?: ReplicationScope;
}
export type ConditionalForwarders = ConditionalForwarder[];
export interface DescribeConditionalForwardersResult {
  ConditionalForwarders?: ConditionalForwarder[];
}
export type DirectoryIds = string[];
export type Limit = number;
export interface DescribeDirectoriesRequest {
  DirectoryIds?: string[];
  NextToken?: string;
  Limit?: number;
}
export type AccessUrl = string;
export type DirectoryStage =
  | "Requested"
  | "Creating"
  | "Created"
  | "Active"
  | "Inoperable"
  | "Impaired"
  | "Restoring"
  | "RestoreFailed"
  | "Deleting"
  | "Deleted"
  | "Failed"
  | "Updating"
  | (string & {});
export type LaunchTime = Date;
export type DirectoryType =
  | "SimpleAD"
  | "ADConnector"
  | "MicrosoftAD"
  | "SharedMicrosoftAD"
  | (string & {});
export type AvailabilityZone = string;
export type AvailabilityZones = string[];
export interface DirectoryVpcSettingsDescription {
  VpcId?: string;
  SubnetIds?: string[];
  SecurityGroupId?: string;
  AvailabilityZones?: string[];
}
export type IpAddrs = string[];
export type IpV6Addrs = string[];
export interface DirectoryConnectSettingsDescription {
  VpcId?: string;
  SubnetIds?: string[];
  CustomerUserName?: string;
  SecurityGroupId?: string;
  AvailabilityZones?: string[];
  ConnectIps?: string[];
  ConnectIpsV6?: string[];
}
export type Server = string;
export type Servers = string[];
export type PortNumber = number;
export type RadiusTimeout = number;
export type RadiusRetries = number;
export type RadiusSharedSecret = string | redacted.Redacted<string>;
export type RadiusAuthenticationProtocol =
  | "PAP"
  | "CHAP"
  | "MS-CHAPv1"
  | "MS-CHAPv2"
  | (string & {});
export type RadiusDisplayLabel = string;
export type UseSameUsername = boolean;
export interface RadiusSettings {
  RadiusServers?: string[];
  RadiusServersIpv6?: string[];
  RadiusPort?: number;
  RadiusTimeout?: number;
  RadiusRetries?: number;
  SharedSecret?: string | redacted.Redacted<string>;
  AuthenticationProtocol?: RadiusAuthenticationProtocol;
  DisplayLabel?: string;
  UseSameUsername?: boolean;
}
export type RadiusStatus = "Creating" | "Completed" | "Failed" | (string & {});
export type StageReason = string;
export type SsoEnabled = boolean;
export type DesiredNumberOfDomainControllers = number;
export interface OwnerDirectoryDescription {
  DirectoryId?: string;
  AccountId?: string;
  DnsIpAddrs?: string[];
  DnsIpv6Addrs?: string[];
  VpcSettings?: DirectoryVpcSettingsDescription;
  RadiusSettings?: RadiusSettings;
  RadiusStatus?: RadiusStatus;
  NetworkType?: NetworkType;
}
export type AdditionalRegions = string[];
export interface RegionsInfo {
  PrimaryRegion?: string;
  AdditionalRegions?: string[];
}
export type OSVersion = "SERVER_2012" | "SERVER_2019" | (string & {});
export interface HybridSettingsDescription {
  SelfManagedDnsIpAddrs?: string[];
  SelfManagedInstanceIds?: string[];
}
export interface DirectoryDescription {
  DirectoryId?: string;
  Name?: string;
  ShortName?: string;
  Size?: DirectorySize;
  Edition?: DirectoryEdition;
  Alias?: string;
  AccessUrl?: string;
  Description?: string;
  DnsIpAddrs?: string[];
  DnsIpv6Addrs?: string[];
  Stage?: DirectoryStage;
  ShareStatus?: ShareStatus;
  ShareMethod?: ShareMethod;
  ShareNotes?: string | redacted.Redacted<string>;
  LaunchTime?: Date;
  StageLastUpdatedDateTime?: Date;
  Type?: DirectoryType;
  VpcSettings?: DirectoryVpcSettingsDescription;
  ConnectSettings?: DirectoryConnectSettingsDescription;
  RadiusSettings?: RadiusSettings;
  RadiusStatus?: RadiusStatus;
  StageReason?: string;
  SsoEnabled?: boolean;
  DesiredNumberOfDomainControllers?: number;
  OwnerDirectoryDescription?: OwnerDirectoryDescription;
  RegionsInfo?: RegionsInfo;
  OsVersion?: OSVersion;
  HybridSettings?: HybridSettingsDescription;
  NetworkType?: NetworkType;
}
export type DirectoryDescriptions = DirectoryDescription[];
export interface DescribeDirectoriesResult {
  DirectoryDescriptions?: DirectoryDescription[];
  NextToken?: string;
}
export interface DescribeDirectoryDataAccessRequest {
  DirectoryId: string;
}
export type DataAccessStatus =
  | "Disabled"
  | "Disabling"
  | "Enabled"
  | "Enabling"
  | "Failed"
  | (string & {});
export interface DescribeDirectoryDataAccessResult {
  DataAccessStatus?: DataAccessStatus;
}
export type DomainControllerId = string;
export type DomainControllerIds = string[];
export interface DescribeDomainControllersRequest {
  DirectoryId: string;
  DomainControllerIds?: string[];
  NextToken?: string;
  Limit?: number;
}
export type DomainControllerStatus =
  | "Creating"
  | "Active"
  | "Impaired"
  | "Restoring"
  | "Deleting"
  | "Deleted"
  | "Failed"
  | "Updating"
  | (string & {});
export type DomainControllerStatusReason = string;
export interface DomainController {
  DirectoryId?: string;
  DomainControllerId?: string;
  DnsIpAddr?: string;
  DnsIpv6Addr?: string;
  VpcId?: string;
  SubnetId?: string;
  AvailabilityZone?: string;
  Status?: DomainControllerStatus;
  StatusReason?: string;
  LaunchTime?: Date;
  StatusLastUpdatedDateTime?: Date;
}
export type DomainControllers = DomainController[];
export interface DescribeDomainControllersResult {
  DomainControllers?: DomainController[];
  NextToken?: string;
}
export type TopicNames = string[];
export interface DescribeEventTopicsRequest {
  DirectoryId?: string;
  TopicNames?: string[];
}
export type TopicArn = string;
export type TopicStatus =
  | "Registered"
  | "Topic not found"
  | "Failed"
  | "Deleted"
  | (string & {});
export interface EventTopic {
  DirectoryId?: string;
  TopicName?: string;
  TopicArn?: string;
  CreatedDateTime?: Date;
  Status?: TopicStatus;
}
export type EventTopics = EventTopic[];
export interface DescribeEventTopicsResult {
  EventTopics?: EventTopic[];
}
export type HybridUpdateType =
  | "SelfManagedInstances"
  | "HybridAdministratorAccount"
  | (string & {});
export interface DescribeHybridADUpdateRequest {
  DirectoryId: string;
  UpdateType?: HybridUpdateType;
  NextToken?: string;
}
export type UpdateStatus =
  | "Updated"
  | "Updating"
  | "UpdateFailed"
  | (string & {});
export type UpdateStatusReason = string;
export type InitiatedBy = string;
export interface HybridUpdateValue {
  InstanceIds?: string[];
  DnsIps?: string[];
}
export type StartDateTime = Date;
export interface HybridUpdateInfoEntry {
  Status?: UpdateStatus;
  StatusReason?: string;
  InitiatedBy?: string;
  NewValue?: HybridUpdateValue;
  PreviousValue?: HybridUpdateValue;
  StartTime?: Date;
  LastUpdatedDateTime?: Date;
  AssessmentId?: string;
}
export type HybridUpdateInfoEntries = HybridUpdateInfoEntry[];
export interface HybridUpdateActivities {
  SelfManagedInstances?: HybridUpdateInfoEntry[];
  HybridAdministratorAccount?: HybridUpdateInfoEntry[];
}
export interface DescribeHybridADUpdateResult {
  UpdateActivities?: HybridUpdateActivities;
  NextToken?: string;
}
export type LDAPSType = "Client" | (string & {});
export interface DescribeLDAPSSettingsRequest {
  DirectoryId: string;
  Type?: LDAPSType;
  NextToken?: string;
  Limit?: number;
}
export type LDAPSStatus =
  | "Enabling"
  | "Enabled"
  | "EnableFailed"
  | "Disabled"
  | (string & {});
export type LDAPSStatusReason = string;
export interface LDAPSSettingInfo {
  LDAPSStatus?: LDAPSStatus;
  LDAPSStatusReason?: string;
  LastUpdatedDateTime?: Date;
}
export type LDAPSSettingsInfo = LDAPSSettingInfo[];
export interface DescribeLDAPSSettingsResult {
  LDAPSSettingsInfo?: LDAPSSettingInfo[];
  NextToken?: string;
}
export interface DescribeRegionsRequest {
  DirectoryId: string;
  RegionName?: string;
  NextToken?: string;
}
export type RegionType = "Primary" | "Additional" | (string & {});
export type StateLastUpdatedDateTime = Date;
export interface RegionDescription {
  DirectoryId?: string;
  RegionName?: string;
  RegionType?: RegionType;
  Status?: DirectoryStage;
  VpcSettings?: DirectoryVpcSettings;
  DesiredNumberOfDomainControllers?: number;
  LaunchTime?: Date;
  StatusLastUpdatedDateTime?: Date;
  LastUpdatedDateTime?: Date;
}
export type RegionsDescription = RegionDescription[];
export interface DescribeRegionsResult {
  RegionsDescription?: RegionDescription[];
  NextToken?: string;
}
export type DirectoryConfigurationStatus =
  | "Requested"
  | "Updating"
  | "Updated"
  | "Failed"
  | "Default"
  | (string & {});
export interface DescribeSettingsRequest {
  DirectoryId: string;
  Status?: DirectoryConfigurationStatus;
  NextToken?: string;
}
export type DirectoryConfigurationSettingType = string;
export type DirectoryConfigurationSettingName = string;
export type DirectoryConfigurationSettingAllowedValues = string;
export type DirectoryConfigurationSettingValue = string;
export type DirectoryConfigurationSettingRequestDetailedStatus = {
  [key: string]: DirectoryConfigurationStatus | undefined;
};
export type DirectoryConfigurationSettingRequestStatusMessage = string;
export type DirectoryConfigurationSettingLastUpdatedDateTime = Date;
export type DirectoryConfigurationSettingLastRequestedDateTime = Date;
export type DirectoryConfigurationSettingDataType = string;
export interface SettingEntry {
  Type?: string;
  Name?: string;
  AllowedValues?: string;
  AppliedValue?: string;
  RequestedValue?: string;
  RequestStatus?: DirectoryConfigurationStatus;
  RequestDetailedStatus?: {
    [key: string]: DirectoryConfigurationStatus | undefined;
  };
  RequestStatusMessage?: string;
  LastUpdatedDateTime?: Date;
  LastRequestedDateTime?: Date;
  DataType?: string;
}
export type SettingEntries = SettingEntry[];
export interface DescribeSettingsResult {
  DirectoryId?: string;
  SettingEntries?: SettingEntry[];
  NextToken?: string;
}
export interface DescribeSharedDirectoriesRequest {
  OwnerDirectoryId: string;
  SharedDirectoryIds?: string[];
  NextToken?: string;
  Limit?: number;
}
export type SharedDirectories = SharedDirectory[];
export interface DescribeSharedDirectoriesResult {
  SharedDirectories?: SharedDirectory[];
  NextToken?: string;
}
export type SnapshotIds = string[];
export interface DescribeSnapshotsRequest {
  DirectoryId?: string;
  SnapshotIds?: string[];
  NextToken?: string;
  Limit?: number;
}
export type SnapshotType = "Auto" | "Manual" | (string & {});
export type SnapshotStatus =
  | "Creating"
  | "Completed"
  | "Failed"
  | (string & {});
export type StartTime = Date;
export interface Snapshot {
  DirectoryId?: string;
  SnapshotId?: string;
  Type?: SnapshotType;
  Name?: string;
  Status?: SnapshotStatus;
  StartTime?: Date;
}
export type Snapshots = Snapshot[];
export interface DescribeSnapshotsResult {
  Snapshots?: Snapshot[];
  NextToken?: string;
}
export type TrustIds = string[];
export interface DescribeTrustsRequest {
  DirectoryId?: string;
  TrustIds?: string[];
  NextToken?: string;
  Limit?: number;
}
export type TrustState =
  | "Creating"
  | "Created"
  | "Verifying"
  | "VerifyFailed"
  | "Verified"
  | "Updating"
  | "UpdateFailed"
  | "Updated"
  | "Deleting"
  | "Deleted"
  | "Failed"
  | (string & {});
export type TrustStateReason = string;
export interface Trust {
  DirectoryId?: string;
  TrustId?: string;
  RemoteDomainName?: string;
  TrustType?: TrustType;
  TrustDirection?: TrustDirection;
  TrustState?: TrustState;
  CreatedDateTime?: Date;
  LastUpdatedDateTime?: Date;
  StateLastUpdatedDateTime?: Date;
  TrustStateReason?: string;
  SelectiveAuth?: SelectiveAuth;
}
export type Trusts = Trust[];
export interface DescribeTrustsResult {
  Trusts?: Trust[];
  NextToken?: string;
}
export type UpdateType = "OS" | "NETWORK" | "SIZE" | (string & {});
export interface DescribeUpdateDirectoryRequest {
  DirectoryId: string;
  UpdateType: UpdateType;
  RegionName?: string;
  NextToken?: string;
}
export interface OSUpdateSettings {
  OSVersion?: OSVersion;
}
export interface UpdateValue {
  OSUpdateSettings?: OSUpdateSettings;
}
export interface UpdateInfoEntry {
  Region?: string;
  Status?: UpdateStatus;
  StatusReason?: string;
  InitiatedBy?: string;
  NewValue?: UpdateValue;
  PreviousValue?: UpdateValue;
  StartTime?: Date;
  LastUpdatedDateTime?: Date;
}
export type UpdateActivities = UpdateInfoEntry[];
export interface DescribeUpdateDirectoryResult {
  UpdateActivities?: UpdateInfoEntry[];
  NextToken?: string;
}
export interface DisableCAEnrollmentPolicyRequest {
  DirectoryId: string;
}
export interface DisableCAEnrollmentPolicyResult {}
export interface DisableClientAuthenticationRequest {
  DirectoryId: string;
  Type: ClientAuthenticationType;
}
export interface DisableClientAuthenticationResult {}
export interface DisableDirectoryDataAccessRequest {
  DirectoryId: string;
}
export interface DisableDirectoryDataAccessResult {}
export interface DisableLDAPSRequest {
  DirectoryId: string;
  Type: LDAPSType;
}
export interface DisableLDAPSResult {}
export interface DisableRadiusRequest {
  DirectoryId: string;
}
export interface DisableRadiusResult {}
export interface DisableSsoRequest {
  DirectoryId: string;
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
}
export interface DisableSsoResult {}
export interface EnableCAEnrollmentPolicyRequest {
  DirectoryId: string;
  PcaConnectorArn: string;
}
export interface EnableCAEnrollmentPolicyResult {}
export interface EnableClientAuthenticationRequest {
  DirectoryId: string;
  Type: ClientAuthenticationType;
}
export interface EnableClientAuthenticationResult {}
export interface EnableDirectoryDataAccessRequest {
  DirectoryId: string;
}
export interface EnableDirectoryDataAccessResult {}
export interface EnableLDAPSRequest {
  DirectoryId: string;
  Type: LDAPSType;
}
export interface EnableLDAPSResult {}
export interface EnableRadiusRequest {
  DirectoryId: string;
  RadiusSettings: RadiusSettings;
}
export interface EnableRadiusResult {}
export interface EnableSsoRequest {
  DirectoryId: string;
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
}
export interface EnableSsoResult {}
export interface GetDirectoryLimitsRequest {}
export type CloudOnlyDirectoriesLimitReached = boolean;
export type ConnectedDirectoriesLimitReached = boolean;
export interface DirectoryLimits {
  CloudOnlyDirectoriesLimit?: number;
  CloudOnlyDirectoriesCurrentCount?: number;
  CloudOnlyDirectoriesLimitReached?: boolean;
  CloudOnlyMicrosoftADLimit?: number;
  CloudOnlyMicrosoftADCurrentCount?: number;
  CloudOnlyMicrosoftADLimitReached?: boolean;
  ConnectedDirectoriesLimit?: number;
  ConnectedDirectoriesCurrentCount?: number;
  ConnectedDirectoriesLimitReached?: boolean;
}
export interface GetDirectoryLimitsResult {
  DirectoryLimits?: DirectoryLimits;
}
export interface GetSnapshotLimitsRequest {
  DirectoryId: string;
}
export type ManualSnapshotsLimitReached = boolean;
export interface SnapshotLimits {
  ManualSnapshotsLimit?: number;
  ManualSnapshotsCurrentCount?: number;
  ManualSnapshotsLimitReached?: boolean;
}
export interface GetSnapshotLimitsResult {
  SnapshotLimits?: SnapshotLimits;
}
export type AssessmentLimit = number;
export interface ListADAssessmentsRequest {
  DirectoryId?: string;
  NextToken?: string;
  Limit?: number;
}
export interface AssessmentSummary {
  AssessmentId?: string;
  DirectoryId?: string;
  DnsName?: string;
  StartTime?: Date;
  LastUpdateDateTime?: Date;
  Status?: string;
  CustomerDnsIps?: string[];
  ReportType?: string;
}
export type Assessments = AssessmentSummary[];
export interface ListADAssessmentsResult {
  Assessments?: AssessmentSummary[];
  NextToken?: string;
}
export interface ListCertificatesRequest {
  DirectoryId: string;
  NextToken?: string;
  Limit?: number;
}
export interface CertificateInfo {
  CertificateId?: string;
  CommonName?: string;
  State?: CertificateState;
  ExpiryDateTime?: Date;
  Type?: CertificateType;
}
export type CertificatesInfo = CertificateInfo[];
export interface ListCertificatesResult {
  NextToken?: string;
  CertificatesInfo?: CertificateInfo[];
}
export interface ListIpRoutesRequest {
  DirectoryId: string;
  NextToken?: string;
  Limit?: number;
}
export type IpRouteStatusMsg =
  | "Adding"
  | "Added"
  | "Removing"
  | "Removed"
  | "AddFailed"
  | "RemoveFailed"
  | (string & {});
export type AddedDateTime = Date;
export type IpRouteStatusReason = string;
export interface IpRouteInfo {
  DirectoryId?: string;
  CidrIp?: string;
  CidrIpv6?: string;
  IpRouteStatusMsg?: IpRouteStatusMsg;
  AddedDateTime?: Date;
  IpRouteStatusReason?: string;
  Description?: string;
}
export type IpRoutesInfo = IpRouteInfo[];
export interface ListIpRoutesResult {
  IpRoutesInfo?: IpRouteInfo[];
  NextToken?: string;
}
export interface ListLogSubscriptionsRequest {
  DirectoryId?: string;
  NextToken?: string;
  Limit?: number;
}
export type SubscriptionCreatedDateTime = Date;
export interface LogSubscription {
  DirectoryId?: string;
  LogGroupName?: string;
  SubscriptionCreatedDateTime?: Date;
}
export type LogSubscriptions = LogSubscription[];
export interface ListLogSubscriptionsResult {
  LogSubscriptions?: LogSubscription[];
  NextToken?: string;
}
export interface ListSchemaExtensionsRequest {
  DirectoryId: string;
  NextToken?: string;
  Limit?: number;
}
export type SchemaExtensionStatus =
  | "Initializing"
  | "CreatingSnapshot"
  | "UpdatingSchema"
  | "Replicating"
  | "CancelInProgress"
  | "RollbackInProgress"
  | "Cancelled"
  | "Failed"
  | "Completed"
  | (string & {});
export type SchemaExtensionStatusReason = string;
export type EndDateTime = Date;
export interface SchemaExtensionInfo {
  DirectoryId?: string;
  SchemaExtensionId?: string;
  Description?: string;
  SchemaExtensionStatus?: SchemaExtensionStatus;
  SchemaExtensionStatusReason?: string;
  StartDateTime?: Date;
  EndDateTime?: Date;
}
export type SchemaExtensionsInfo = SchemaExtensionInfo[];
export interface ListSchemaExtensionsResult {
  SchemaExtensionsInfo?: SchemaExtensionInfo[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceId: string;
  NextToken?: string;
  Limit?: number;
}
export interface ListTagsForResourceResult {
  Tags?: Tag[];
  NextToken?: string;
}
export type CertificateData = string;
export interface RegisterCertificateRequest {
  DirectoryId: string;
  CertificateData: string;
  Type?: CertificateType;
  ClientCertAuthSettings?: ClientCertAuthSettings;
}
export interface RegisterCertificateResult {
  CertificateId?: string;
}
export interface RegisterEventTopicRequest {
  DirectoryId: string;
  TopicName: string;
}
export interface RegisterEventTopicResult {}
export interface RejectSharedDirectoryRequest {
  SharedDirectoryId: string;
}
export interface RejectSharedDirectoryResult {
  SharedDirectoryId?: string;
}
export type CidrIps = string[];
export type CidrIpv6s = string[];
export interface RemoveIpRoutesRequest {
  DirectoryId: string;
  CidrIps?: string[];
  CidrIpv6s?: string[];
}
export interface RemoveIpRoutesResult {}
export interface RemoveRegionRequest {
  DirectoryId: string;
}
export interface RemoveRegionResult {}
export type TagKeys = string[];
export interface RemoveTagsFromResourceRequest {
  ResourceId: string;
  TagKeys: string[];
}
export interface RemoveTagsFromResourceResult {}
export type CustomerUserName = string;
export type UserPassword = string | redacted.Redacted<string>;
export interface ResetUserPasswordRequest {
  DirectoryId: string;
  UserName: string;
  NewPassword: string | redacted.Redacted<string>;
}
export interface ResetUserPasswordResult {}
export interface RestoreFromSnapshotRequest {
  SnapshotId: string;
}
export interface RestoreFromSnapshotResult {}
export type TargetId = string;
export type TargetType = "ACCOUNT" | (string & {});
export interface ShareTarget {
  Id: string;
  Type: TargetType;
}
export interface ShareDirectoryRequest {
  DirectoryId: string;
  ShareNotes?: string | redacted.Redacted<string>;
  ShareTarget: ShareTarget;
  ShareMethod: ShareMethod;
}
export interface ShareDirectoryResult {
  SharedDirectoryId?: string;
}
export interface AssessmentConfiguration {
  CustomerDnsIps: string[];
  DnsName: string;
  VpcSettings: DirectoryVpcSettings;
  InstanceIds: string[];
  SecurityGroupIds?: string[];
}
export interface StartADAssessmentRequest {
  AssessmentConfiguration?: AssessmentConfiguration;
  DirectoryId?: string;
}
export interface StartADAssessmentResult {
  AssessmentId?: string;
}
export type CreateSnapshotBeforeSchemaExtension = boolean;
export type LdifContent = string;
export interface StartSchemaExtensionRequest {
  DirectoryId: string;
  CreateSnapshotBeforeSchemaExtension: boolean;
  LdifContent: string;
  Description: string;
}
export interface StartSchemaExtensionResult {
  SchemaExtensionId?: string;
}
export interface UnshareTarget {
  Id: string;
  Type: TargetType;
}
export interface UnshareDirectoryRequest {
  DirectoryId: string;
  UnshareTarget: UnshareTarget;
}
export interface UnshareDirectoryResult {
  SharedDirectoryId?: string;
}
export interface UpdateConditionalForwarderRequest {
  DirectoryId: string;
  RemoteDomainName: string;
  DnsIpAddrs?: string[];
  DnsIpv6Addrs?: string[];
}
export interface UpdateConditionalForwarderResult {}
export interface DirectorySizeUpdateSettings {
  DirectorySize?: DirectorySize;
}
export interface NetworkUpdateSettings {
  NetworkType?: NetworkType;
  CustomerDnsIpsV6?: string[];
}
export type CreateSnapshotBeforeUpdate = boolean;
export interface UpdateDirectorySetupRequest {
  DirectoryId: string;
  UpdateType: UpdateType;
  OSUpdateSettings?: OSUpdateSettings;
  DirectorySizeUpdateSettings?: DirectorySizeUpdateSettings;
  NetworkUpdateSettings?: NetworkUpdateSettings;
  CreateSnapshotBeforeUpdate?: boolean;
}
export interface UpdateDirectorySetupResult {}
export interface HybridAdministratorAccountUpdate {
  SecretArn: string;
}
export interface HybridCustomerInstancesSettings {
  CustomerDnsIps: string[];
  InstanceIds: string[];
}
export interface UpdateHybridADRequest {
  DirectoryId: string;
  HybridAdministratorAccountUpdate?: HybridAdministratorAccountUpdate;
  SelfManagedInstancesSettings?: HybridCustomerInstancesSettings;
}
export interface UpdateHybridADResult {
  DirectoryId?: string;
  AssessmentId?: string;
}
export interface UpdateNumberOfDomainControllersRequest {
  DirectoryId: string;
  DesiredNumber: number;
}
export interface UpdateNumberOfDomainControllersResult {}
export interface UpdateRadiusRequest {
  DirectoryId: string;
  RadiusSettings: RadiusSettings;
}
export interface UpdateRadiusResult {}
export interface Setting {
  Name: string;
  Value: string;
}
export type Settings = Setting[];
export interface UpdateSettingsRequest {
  DirectoryId: string;
  Settings: Setting[];
}
export interface UpdateSettingsResult {
  DirectoryId?: string;
}
export interface UpdateTrustRequest {
  TrustId: string;
  SelectiveAuth?: SelectiveAuth;
}
export type RequestId = string;
export interface UpdateTrustResult {
  RequestId?: string;
  TrustId?: string;
}
export interface VerifyTrustRequest {
  TrustId: string;
}
export interface VerifyTrustResult {
  TrustId?: string;
}
export type ExceptionMessage = string;
export type AcceptSharedDirectoryError =
  | ClientException
  | DirectoryAlreadySharedException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Accepts a directory sharing request that was sent from the directory owner account.
 */
export const acceptSharedDirectory: API.OperationMethod<
  AcceptSharedDirectoryRequest,
  AcceptSharedDirectoryResult,
  AcceptSharedDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SharedDirectoryId: 0 },
    output: { SharedDirectory: o_SharedDirectory },
  },
  errors: [
    ClientException,
    DirectoryAlreadySharedException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptSharedDirectory",
})) as any;

export type AddIpRoutesError =
  | ClientException
  | DirectoryUnavailableException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | IpRouteLimitExceededException
  | ServiceException
  | CommonErrors;
/**
 * If the DNS server for your self-managed domain uses a publicly addressable IP address,
 * you must add a CIDR address block to correctly route traffic to and from your Microsoft AD
 * on Amazon Web Services. *AddIpRoutes* adds this address block. You can
 * also use *AddIpRoutes* to facilitate routing traffic that uses public IP
 * ranges from your Microsoft AD on Amazon Web Services to a peer VPC.
 *
 * Before you call *AddIpRoutes*, ensure that all of the required
 * permissions have been explicitly granted through a policy. For details about what
 * permissions are required to run the *AddIpRoutes* operation, see Directory Service API Permissions: Actions, Resources, and Conditions Reference.
 */
export const addIpRoutes: API.OperationMethod<
  AddIpRoutesRequest,
  AddIpRoutesResult,
  AddIpRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      IpRoutes: D.list({ CidrIp: 0, CidrIpv6: 0, Description: 0 }),
      UpdateSecurityGroupForDirectoryControllers: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    IpRouteLimitExceededException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddIpRoutes",
})) as any;

export type AddRegionError =
  | AccessDeniedException
  | ClientException
  | DirectoryAlreadyInRegionException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | RegionLimitExceededException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds two domain controllers in the specified Region for the specified directory.
 */
export const addRegion: API.OperationMethod<
  AddRegionRequest,
  AddRegionResult,
  AddRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      RegionName: 0,
      VPCSettings: i_DirectoryVpcSettings,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryAlreadyInRegionException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    RegionLimitExceededException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRegion",
})) as any;

export type AddTagsToResourceError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | TagLimitExceededException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified directory. Each directory can
 * have a maximum of 50 tags. Each tag consists of a key and optional value. Tag keys must be
 * unique to each resource.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceRequest,
  AddTagsToResourceResult,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, Tags: D.list(i_Tag) } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    TagLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
})) as any;

export type CancelSchemaExtensionError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | CommonErrors;
/**
 * Cancels an in-progress schema extension to a Microsoft AD directory. Once a schema
 * extension has started replicating to all domain controllers, the task can no longer be
 * canceled. A schema extension can be canceled during any of the following states;
 * `Initializing`, `CreatingSnapshot`, and
 * `UpdatingSchema`.
 */
export const cancelSchemaExtension: API.OperationMethod<
  CancelSchemaExtensionRequest,
  CancelSchemaExtensionResult,
  CancelSchemaExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, SchemaExtensionId: 0 } },
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSchemaExtension",
})) as any;

export type ConnectDirectoryError =
  | ClientException
  | DirectoryLimitExceededException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Creates an AD Connector to connect to a self-managed directory.
 *
 * Before you call `ConnectDirectory`, ensure that all of the required permissions
 * have been explicitly granted through a policy. For details about what permissions are required
 * to run the `ConnectDirectory` operation, see Directory Service API Permissions: Actions, Resources, and Conditions Reference.
 */
export const connectDirectory: API.OperationMethod<
  ConnectDirectoryRequest,
  ConnectDirectoryResult,
  ConnectDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ShortName: 0,
      Password: 0,
      Description: 0,
      Size: 0,
      ConnectSettings: {
        VpcId: 0,
        SubnetIds: 0,
        CustomerDnsIps: 0,
        CustomerDnsIpsV6: 0,
        CustomerUserName: 0,
      },
      Tags: D.list(i_Tag),
      NetworkType: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryLimitExceededException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConnectDirectory",
})) as any;

export type CreateAliasError =
  | ClientException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Creates an alias for a directory and assigns the alias to the directory. The alias is used
 * to construct the access URL for the directory, such as
 * `http://.awsapps.com`.
 *
 * After an alias has been created, it cannot be deleted or reused, so this operation should only be used when absolutely necessary.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  CreateAliasResult,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Alias: 0 } },
  errors: [
    ClientException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
})) as any;

export type CreateComputerError =
  | AuthenticationFailedException
  | ClientException
  | DirectoryUnavailableException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates an Active Directory computer object in the specified directory.
 */
export const createComputer: API.OperationMethod<
  CreateComputerRequest,
  CreateComputerResult,
  CreateComputerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      ComputerName: 0,
      Password: 0,
      OrganizationalUnitDistinguishedName: 0,
      ComputerAttributes: D.list({ Name: 0, Value: 0 }),
    },
  },
  errors: [
    AuthenticationFailedException,
    ClientException,
    DirectoryUnavailableException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputer",
})) as any;

export type CreateConditionalForwarderError =
  | ClientException
  | DirectoryUnavailableException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a conditional forwarder associated with your Amazon Web Services directory. Conditional
 * forwarders are required in order to set up a trust relationship with another domain. The
 * conditional forwarder points to the trusted domain.
 */
export const createConditionalForwarder: API.OperationMethod<
  CreateConditionalForwarderRequest,
  CreateConditionalForwarderResult,
  CreateConditionalForwarderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      RemoteDomainName: 0,
      DnsIpAddrs: 0,
      DnsIpv6Addrs: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConditionalForwarder",
})) as any;

export type CreateDirectoryError =
  | ClientException
  | DirectoryLimitExceededException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Creates a Simple AD directory. For more information, see Simple Active Directory in the *Directory Service Admin Guide*.
 *
 * Before you call `CreateDirectory`, ensure that all of the required permissions
 * have been explicitly granted through a policy. For details about what permissions are required
 * to run the `CreateDirectory` operation, see Directory Service API Permissions: Actions, Resources, and Conditions Reference.
 */
export const createDirectory: API.OperationMethod<
  CreateDirectoryRequest,
  CreateDirectoryResult,
  CreateDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ShortName: 0,
      Password: 0,
      Description: 0,
      Size: 0,
      VpcSettings: i_DirectoryVpcSettings,
      Tags: D.list(i_Tag),
      NetworkType: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryLimitExceededException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectory",
})) as any;

export type CreateHybridADError =
  | ADAssessmentLimitExceededException
  | ClientException
  | DirectoryLimitExceededException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a hybrid directory that connects your self-managed Active Directory (AD)
 * infrastructure and Amazon Web Services.
 *
 * You must have a successful directory assessment using StartADAssessment to validate your environment compatibility before you
 * use this operation.
 *
 * Updates are applied asynchronously. Use DescribeDirectories to
 * monitor the progress of directory creation.
 */
export const createHybridAD: API.OperationMethod<
  CreateHybridADRequest,
  CreateHybridADResult,
  CreateHybridADError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SecretArn: 0, AssessmentId: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ADAssessmentLimitExceededException,
    ClientException,
    DirectoryLimitExceededException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHybridAD",
})) as any;

export type CreateLogSubscriptionError =
  | ClientException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InsufficientPermissionsException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a subscription to forward real-time Directory Service domain controller security
 * logs to the specified Amazon CloudWatch log group in your Amazon Web Services account.
 */
export const createLogSubscription: API.OperationMethod<
  CreateLogSubscriptionRequest,
  CreateLogSubscriptionResult,
  CreateLogSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, LogGroupName: 0 } },
  errors: [
    ClientException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InsufficientPermissionsException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogSubscription",
})) as any;

export type CreateMicrosoftADError =
  | ClientException
  | DirectoryLimitExceededException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a Microsoft AD directory in the Amazon Web Services Cloud. For more information, see Managed Microsoft AD in the *Directory Service Admin Guide*.
 *
 * Before you call *CreateMicrosoftAD*, ensure that all of the required
 * permissions have been explicitly granted through a policy. For details about what permissions
 * are required to run the *CreateMicrosoftAD* operation, see Directory Service API Permissions: Actions, Resources, and Conditions Reference.
 */
export const createMicrosoftAD: API.OperationMethod<
  CreateMicrosoftADRequest,
  CreateMicrosoftADResult,
  CreateMicrosoftADError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ShortName: 0,
      Password: 0,
      Description: 0,
      VpcSettings: i_DirectoryVpcSettings,
      Edition: 0,
      Tags: D.list(i_Tag),
      NetworkType: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryLimitExceededException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMicrosoftAD",
})) as any;

export type CreateSnapshotError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | SnapshotLimitExceededException
  | CommonErrors;
/**
 * Creates a snapshot of a Simple AD or Microsoft AD directory in the Amazon Web Services cloud.
 *
 * You cannot take snapshots of AD Connector directories.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResult,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Name: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    SnapshotLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
})) as any;

export type CreateTrustError =
  | ClientException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Directory Service for Microsoft Active Directory allows you to configure trust relationships. For
 * example, you can establish a trust between your Managed Microsoft AD directory, and your existing
 * self-managed Microsoft Active Directory. This would allow you to provide users and groups
 * access to resources in either domain, with a single set of credentials.
 *
 * This action initiates the creation of the Amazon Web Services side of a trust relationship between an
 * Managed Microsoft AD directory and an external domain. You can create either a forest trust or an
 * external trust.
 */
export const createTrust: API.OperationMethod<
  CreateTrustRequest,
  CreateTrustResult,
  CreateTrustError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      RemoteDomainName: 0,
      TrustPassword: 0,
      TrustDirection: 0,
      TrustType: 0,
      ConditionalForwarderIpAddrs: 0,
      ConditionalForwarderIpv6Addrs: 0,
      SelectiveAuth: 0,
    },
  },
  errors: [
    ClientException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrust",
})) as any;

export type DeleteADAssessmentError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a directory assessment and all associated data. This operation permanently
 * removes the assessment results, validation reports, and configuration
 * information.
 *
 * You cannot delete system-initiated assessments. You can delete customer-created
 * assessments even if they are in progress.
 */
export const deleteADAssessment: API.OperationMethod<
  DeleteADAssessmentRequest,
  DeleteADAssessmentResult,
  DeleteADAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AssessmentId: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteADAssessment",
})) as any;

export type DeleteConditionalForwarderError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a conditional forwarder that has been set up for your Amazon Web Services
 * directory.
 */
export const deleteConditionalForwarder: API.OperationMethod<
  DeleteConditionalForwarderRequest,
  DeleteConditionalForwarderResult,
  DeleteConditionalForwarderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, RemoteDomainName: 0 } },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConditionalForwarder",
})) as any;

export type DeleteDirectoryError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | CommonErrors;
/**
 * Deletes an Directory Service directory.
 *
 * Before you call `DeleteDirectory`, ensure that all of the required permissions
 * have been explicitly granted through a policy. For details about what permissions are required
 * to run the `DeleteDirectory` operation, see Directory Service API Permissions: Actions, Resources, and Conditions Reference.
 */
export const deleteDirectory: API.OperationMethod<
  DeleteDirectoryRequest,
  DeleteDirectoryResult,
  DeleteDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectory",
})) as any;

export type DeleteLogSubscriptionError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified log subscription.
 */
export const deleteLogSubscription: API.OperationMethod<
  DeleteLogSubscriptionRequest,
  DeleteLogSubscriptionResult,
  DeleteLogSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogSubscription",
})) as any;

export type DeleteSnapshotError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Deletes a directory snapshot.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResult,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SnapshotId: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
})) as any;

export type DeleteTrustError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes an existing trust relationship between your Managed Microsoft AD directory and an external
 * domain.
 */
export const deleteTrust: API.OperationMethod<
  DeleteTrustRequest,
  DeleteTrustResult,
  DeleteTrustError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrustId: 0, DeleteAssociatedConditionalForwarder: 0 },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrust",
})) as any;

export type DeregisterCertificateError =
  | CertificateDoesNotExistException
  | CertificateInUseException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes from the system the certificate that was registered for secure LDAP or client
 * certificate authentication.
 */
export const deregisterCertificate: API.OperationMethod<
  DeregisterCertificateRequest,
  DeregisterCertificateResult,
  DeregisterCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, CertificateId: 0 } },
  errors: [
    CertificateDoesNotExistException,
    CertificateInUseException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCertificate",
})) as any;

export type DeregisterEventTopicError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Removes the specified directory as a publisher to the specified Amazon SNS topic.
 */
export const deregisterEventTopic: API.OperationMethod<
  DeregisterEventTopicRequest,
  DeregisterEventTopicResult,
  DeregisterEventTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, TopicName: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterEventTopic",
})) as any;

export type DescribeADAssessmentError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves detailed information about a directory assessment, including its current
 * status, validation results, and configuration details. Use this operation to monitor
 * assessment progress and review results.
 */
export const describeADAssessment: API.OperationMethod<
  DescribeADAssessmentRequest,
  DescribeADAssessmentResult,
  DescribeADAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssessmentId: 0 },
    output: {
      Assessment: { StartTime: D.ts, LastUpdateDateTime: D.ts },
      AssessmentReports: D.list({
        Validations: D.list({ StartTime: D.ts, LastUpdateDateTime: D.ts }),
      }),
    },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeADAssessment",
})) as any;

export type DescribeCAEnrollmentPolicyError =
  | ClientException
  | DirectoryDoesNotExistException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves detailed information about the certificate authority (CA) enrollment policy for
 * the specified directory. This policy determines how client certificates are automatically enrolled and
 * managed through Amazon Web Services Private Certificate Authority.
 */
export const describeCAEnrollmentPolicy: API.OperationMethod<
  DescribeCAEnrollmentPolicyRequest,
  DescribeCAEnrollmentPolicyResult,
  DescribeCAEnrollmentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0 },
    output: { LastUpdatedDateTime: D.ts },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCAEnrollmentPolicy",
})) as any;

export type DescribeCertificateError =
  | CertificateDoesNotExistException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Displays information about the certificate registered for secure LDAP or client
 * certificate authentication.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResult,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, CertificateId: 0 },
    output: { Certificate: { RegisteredDateTime: D.ts, ExpiryDateTime: D.ts } },
  },
  errors: [
    CertificateDoesNotExistException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
})) as any;

export type DescribeClientAuthenticationSettingsError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about the type of client authentication for the specified directory,
 * if the type is specified. If no type is specified, information about all client authentication
 * types that are supported for the specified directory is retrieved. Currently, only
 * `SmartCard` is supported.
 */
export const describeClientAuthenticationSettings: API.PaginatedOperationMethod<
  DescribeClientAuthenticationSettingsRequest,
  DescribeClientAuthenticationSettingsResult,
  DescribeClientAuthenticationSettingsError,
  Credentials | HttpClient.HttpClient,
  ClientAuthenticationSettingInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, Type: 0, NextToken: 0, Limit: 0 },
    output: {
      ClientAuthenticationSettingsInfo: D.list({ LastUpdatedDateTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClientAuthenticationSettings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClientAuthenticationSettingsInfo",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConditionalForwardersError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Obtains information about the conditional forwarders for this account.
 *
 * If no input parameters are provided for RemoteDomainNames, this request describes all
 * conditional forwarders for the specified directory ID.
 */
export const describeConditionalForwarders: API.OperationMethod<
  DescribeConditionalForwardersRequest,
  DescribeConditionalForwardersResult,
  DescribeConditionalForwardersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, RemoteDomainNames: 0 } },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConditionalForwarders",
})) as any;

export type DescribeDirectoriesError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Obtains information about the directories that belong to this account.
 *
 * You can retrieve information about specific directories by passing the directory
 * identifiers in the `DirectoryIds` parameter. Otherwise, all directories that belong
 * to the current account are returned.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `DescribeDirectoriesResult.NextToken` member contains a token that you pass in
 * the next call to DescribeDirectories to retrieve the next set of
 * items.
 *
 * You can also specify a maximum number of return results with the `Limit`
 * parameter.
 */
export const describeDirectories: API.PaginatedOperationMethod<
  DescribeDirectoriesRequest,
  DescribeDirectoriesResult,
  DescribeDirectoriesError,
  Credentials | HttpClient.HttpClient,
  DirectoryDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryIds: 0, NextToken: 0, Limit: 0 },
    output: {
      DirectoryDescriptions: D.list({
        ShareNotes: D.secret,
        LaunchTime: D.ts,
        StageLastUpdatedDateTime: D.ts,
        RadiusSettings: o_RadiusSettings,
        OwnerDirectoryDescription: { RadiusSettings: o_RadiusSettings },
      }),
    },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DirectoryDescriptions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDirectoryDataAccessError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Obtains status of directory data access enablement through the Directory Service Data API for the
 * specified directory.
 */
export const describeDirectoryDataAccess: API.OperationMethod<
  DescribeDirectoryDataAccessRequest,
  DescribeDirectoryDataAccessResult,
  DescribeDirectoryDataAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectoryDataAccess",
})) as any;

export type DescribeDomainControllersError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides information about any domain controllers in your directory.
 */
export const describeDomainControllers: API.PaginatedOperationMethod<
  DescribeDomainControllersRequest,
  DescribeDomainControllersResult,
  DescribeDomainControllersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, DomainControllerIds: 0, NextToken: 0, Limit: 0 },
    output: {
      DomainControllers: D.list({
        LaunchTime: D.ts,
        StatusLastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainControllers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeEventTopicsError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Obtains information about which Amazon SNS topics receive status messages from the specified
 * directory.
 *
 * If no input parameters are provided, such as DirectoryId or TopicName, this request
 * describes all of the associations in the account.
 */
export const describeEventTopics: API.OperationMethod<
  DescribeEventTopicsRequest,
  DescribeEventTopicsResult,
  DescribeEventTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, TopicNames: 0 },
    output: { EventTopics: D.list({ CreatedDateTime: D.ts }) },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTopics",
})) as any;

export type DescribeHybridADUpdateError =
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about update activities for a hybrid directory. This operation
 * provides details about configuration changes, administrator account updates, and
 * self-managed instance settings (IDs and DNS IPs).
 */
export const describeHybridADUpdate: API.OperationMethod<
  DescribeHybridADUpdateRequest,
  DescribeHybridADUpdateResult,
  DescribeHybridADUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UpdateType: 0, NextToken: 0 },
    output: {
      UpdateActivities: {
        SelfManagedInstances: D.list(o_HybridUpdateInfoEntry),
        HybridAdministratorAccount: D.list(o_HybridUpdateInfoEntry),
      },
    },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHybridADUpdate",
})) as any;

export type DescribeLDAPSSettingsError =
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Describes the status of LDAP security for the specified directory.
 */
export const describeLDAPSSettings: API.PaginatedOperationMethod<
  DescribeLDAPSSettingsRequest,
  DescribeLDAPSSettingsResult,
  DescribeLDAPSSettingsError,
  Credentials | HttpClient.HttpClient,
  LDAPSSettingInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, Type: 0, NextToken: 0, Limit: 0 },
    output: { LDAPSSettingsInfo: D.list({ LastUpdatedDateTime: D.ts }) },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLDAPSSettings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LDAPSSettingsInfo",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRegionsError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides information about the Regions that are configured for multi-Region
 * replication.
 */
export const describeRegions: API.PaginatedOperationMethod<
  DescribeRegionsRequest,
  DescribeRegionsResult,
  DescribeRegionsError,
  Credentials | HttpClient.HttpClient,
  RegionDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, RegionName: 0, NextToken: 0 },
    output: {
      RegionsDescription: D.list({
        LaunchTime: D.ts,
        StatusLastUpdatedDateTime: D.ts,
        LastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegionsDescription",
  } as const,
})) as any;

export type DescribeSettingsError =
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about the configurable settings for the specified directory.
 */
export const describeSettings: API.OperationMethod<
  DescribeSettingsRequest,
  DescribeSettingsResult,
  DescribeSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, Status: 0, NextToken: 0 },
    output: {
      SettingEntries: D.list({
        LastUpdatedDateTime: D.ts,
        LastRequestedDateTime: D.ts,
      }),
    },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSettings",
})) as any;

export type DescribeSharedDirectoriesError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns the shared directories in your account.
 */
export const describeSharedDirectories: API.PaginatedOperationMethod<
  DescribeSharedDirectoriesRequest,
  DescribeSharedDirectoriesResult,
  DescribeSharedDirectoriesError,
  Credentials | HttpClient.HttpClient,
  SharedDirectory
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OwnerDirectoryId: 0,
      SharedDirectoryIds: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: { SharedDirectories: D.list(o_SharedDirectory) },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedDirectories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SharedDirectories",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeSnapshotsError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Obtains information about the directory snapshots that belong to this account.
 *
 * This operation supports pagination with the use of the *NextToken* request and
 * response parameters. If more results are available, the *DescribeSnapshots.NextToken*
 * member contains a token that you pass in the next call to DescribeSnapshots to
 * retrieve the next set of items.
 *
 * You can also specify a maximum number of return results with the *Limit*
 * parameter.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest,
  DescribeSnapshotsResult,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, SnapshotIds: 0, NextToken: 0, Limit: 0 },
    output: { Snapshots: D.list({ StartTime: D.ts }) },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeTrustsError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Obtains information about the trust relationships for this account.
 *
 * If no input parameters are provided, such as DirectoryId or TrustIds, this request
 * describes all the trust relationships belonging to the account.
 */
export const describeTrusts: API.PaginatedOperationMethod<
  DescribeTrustsRequest,
  DescribeTrustsResult,
  DescribeTrustsError,
  Credentials | HttpClient.HttpClient,
  Trust
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, TrustIds: 0, NextToken: 0, Limit: 0 },
    output: {
      Trusts: D.list({
        CreatedDateTime: D.ts,
        LastUpdatedDateTime: D.ts,
        StateLastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrusts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Trusts",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeUpdateDirectoryError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Describes the updates of a directory for a particular update type.
 */
export const describeUpdateDirectory: API.PaginatedOperationMethod<
  DescribeUpdateDirectoryRequest,
  DescribeUpdateDirectoryResult,
  DescribeUpdateDirectoryError,
  Credentials | HttpClient.HttpClient,
  UpdateInfoEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UpdateType: 0, RegionName: 0, NextToken: 0 },
    output: {
      UpdateActivities: D.list({ StartTime: D.ts, LastUpdatedDateTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdateDirectory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UpdateActivities",
  } as const,
})) as any;

export type DisableCAEnrollmentPolicyError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | DisableAlreadyInProgressException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Disables the certificate authority (CA) enrollment policy for the specified directory. This stops
 * automatic certificate enrollment and management for domain-joined clients, but does not affect
 * existing certificates.
 *
 * Disabling the CA enrollment policy prevents new certificates from being automatically
 * enrolled, but existing certificates remain valid and functional until they expire.
 */
export const disableCAEnrollmentPolicy: API.OperationMethod<
  DisableCAEnrollmentPolicyRequest,
  DisableCAEnrollmentPolicyResult,
  DisableCAEnrollmentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    DisableAlreadyInProgressException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableCAEnrollmentPolicy",
})) as any;

export type DisableClientAuthenticationError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidClientAuthStatusException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Disables alternative client authentication methods for the specified directory.
 */
export const disableClientAuthentication: API.OperationMethod<
  DisableClientAuthenticationRequest,
  DisableClientAuthenticationResult,
  DisableClientAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Type: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidClientAuthStatusException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableClientAuthentication",
})) as any;

export type DisableDirectoryDataAccessError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryInDesiredStateException
  | DirectoryUnavailableException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deactivates access to directory data via the Directory Service Data API for the specified directory. For
 * more information, see Directory Service Data API Reference.
 */
export const disableDirectoryDataAccess: API.OperationMethod<
  DisableDirectoryDataAccessRequest,
  DisableDirectoryDataAccessResult,
  DisableDirectoryDataAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryInDesiredStateException,
    DirectoryUnavailableException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableDirectoryDataAccess",
})) as any;

export type DisableLDAPSError =
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | InvalidLDAPSStatusException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deactivates LDAP secure calls for the specified directory.
 */
export const disableLDAPS: API.OperationMethod<
  DisableLDAPSRequest,
  DisableLDAPSResult,
  DisableLDAPSError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Type: 0 } },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    InvalidLDAPSStatusException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableLDAPS",
})) as any;

export type DisableRadiusError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | CommonErrors;
/**
 * Disables multi-factor authentication (MFA) with the Remote Authentication Dial In User
 * Service (RADIUS) server for an AD Connector or Microsoft AD directory.
 */
export const disableRadius: API.OperationMethod<
  DisableRadiusRequest,
  DisableRadiusResult,
  DisableRadiusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRadius",
})) as any;

export type DisableSsoError =
  | AuthenticationFailedException
  | ClientException
  | EntityDoesNotExistException
  | InsufficientPermissionsException
  | ServiceException
  | CommonErrors;
/**
 * Disables single-sign on for a directory.
 */
export const disableSso: API.OperationMethod<
  DisableSsoRequest,
  DisableSsoResult,
  DisableSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UserName: 0, Password: 0 },
  },
  errors: [
    AuthenticationFailedException,
    ClientException,
    EntityDoesNotExistException,
    InsufficientPermissionsException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSso",
})) as any;

export type EnableCAEnrollmentPolicyError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | EnableAlreadyInProgressException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Enables certificate authority (CA) enrollment policy for the specified directory. This allows
 * domain-joined clients to automatically request and receive certificates from the specified
 * Amazon Web Services Private Certificate Authority.
 *
 * Before enabling CA enrollment, ensure that the PCA connector is properly configured and
 * accessible from the directory. The connector must be in an active state and have the
 * necessary permissions.
 */
export const enableCAEnrollmentPolicy: API.OperationMethod<
  EnableCAEnrollmentPolicyRequest,
  EnableCAEnrollmentPolicyResult,
  EnableCAEnrollmentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, PcaConnectorArn: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    EnableAlreadyInProgressException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableCAEnrollmentPolicy",
})) as any;

export type EnableClientAuthenticationError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidClientAuthStatusException
  | NoAvailableCertificateException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Enables alternative client authentication methods for the specified directory.
 */
export const enableClientAuthentication: API.OperationMethod<
  EnableClientAuthenticationRequest,
  EnableClientAuthenticationResult,
  EnableClientAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Type: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidClientAuthStatusException,
    NoAvailableCertificateException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableClientAuthentication",
})) as any;

export type EnableDirectoryDataAccessError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryInDesiredStateException
  | DirectoryUnavailableException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Enables access to directory data via the Directory Service Data API for the specified directory. For
 * more information, see Directory Service Data API Reference.
 */
export const enableDirectoryDataAccess: API.OperationMethod<
  EnableDirectoryDataAccessRequest,
  EnableDirectoryDataAccessResult,
  EnableDirectoryDataAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryInDesiredStateException,
    DirectoryUnavailableException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableDirectoryDataAccess",
})) as any;

export type EnableLDAPSError =
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | InvalidLDAPSStatusException
  | InvalidParameterException
  | NoAvailableCertificateException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Activates the switch for the specific directory to always use LDAP secure calls.
 */
export const enableLDAPS: API.OperationMethod<
  EnableLDAPSRequest,
  EnableLDAPSResult,
  EnableLDAPSError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, Type: 0 } },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    InvalidLDAPSStatusException,
    InvalidParameterException,
    NoAvailableCertificateException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableLDAPS",
})) as any;

export type EnableRadiusError =
  | ClientException
  | EntityAlreadyExistsException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Enables multi-factor authentication (MFA) with the Remote Authentication Dial In User
 * Service (RADIUS) server for an AD Connector or Microsoft AD directory.
 */
export const enableRadius: API.OperationMethod<
  EnableRadiusRequest,
  EnableRadiusResult,
  EnableRadiusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, RadiusSettings: i_RadiusSettings },
  },
  errors: [
    ClientException,
    EntityAlreadyExistsException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableRadius",
})) as any;

export type EnableSsoError =
  | AuthenticationFailedException
  | ClientException
  | EntityDoesNotExistException
  | InsufficientPermissionsException
  | ServiceException
  | CommonErrors;
/**
 * Enables single sign-on for a directory. Single sign-on allows users in your directory to
 * access certain Amazon Web Services services from a computer joined to the directory without having to enter
 * their credentials separately.
 */
export const enableSso: API.OperationMethod<
  EnableSsoRequest,
  EnableSsoResult,
  EnableSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UserName: 0, Password: 0 },
  },
  errors: [
    AuthenticationFailedException,
    ClientException,
    EntityDoesNotExistException,
    InsufficientPermissionsException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSso",
})) as any;

export type GetDirectoryLimitsError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | CommonErrors;
/**
 * Obtains directory limit information for the current Region.
 */
export const getDirectoryLimits: API.OperationMethod<
  GetDirectoryLimitsRequest,
  GetDirectoryLimitsResult,
  GetDirectoryLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectoryLimits",
})) as any;

export type GetSnapshotLimitsError =
  | ClientException
  | EntityDoesNotExistException
  | ServiceException
  | CommonErrors;
/**
 * Obtains the manual snapshot limits for a directory.
 */
export const getSnapshotLimits: API.OperationMethod<
  GetSnapshotLimitsRequest,
  GetSnapshotLimitsResult,
  GetSnapshotLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshotLimits",
})) as any;

export type ListADAssessmentsError =
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves a list of directory assessments for the specified directory or all
 * assessments in your account. Use this operation to monitor assessment status and manage
 * multiple assessments.
 */
export const listADAssessments: API.PaginatedOperationMethod<
  ListADAssessmentsRequest,
  ListADAssessmentsResult,
  ListADAssessmentsError,
  Credentials | HttpClient.HttpClient,
  AssessmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, NextToken: 0, Limit: 0 },
    output: {
      Assessments: D.list({ StartTime: D.ts, LastUpdateDateTime: D.ts }),
    },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListADAssessments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assessments",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListCertificatesError =
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * For the specified directory, lists all the certificates registered for a secure LDAP or
 * client certificate authentication.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResult,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  CertificateInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, NextToken: 0, Limit: 0 },
    output: { CertificatesInfo: D.list({ ExpiryDateTime: D.ts }) },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CertificatesInfo",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListIpRoutesError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Lists the address blocks that you have added to a directory.
 */
export const listIpRoutes: API.PaginatedOperationMethod<
  ListIpRoutesRequest,
  ListIpRoutesResult,
  ListIpRoutesError,
  Credentials | HttpClient.HttpClient,
  IpRouteInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, NextToken: 0, Limit: 0 },
    output: { IpRoutesInfo: D.list({ AddedDateTime: D.ts }) },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIpRoutes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IpRoutesInfo",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListLogSubscriptionsError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | ServiceException
  | CommonErrors;
/**
 * Lists the active log subscriptions for the Amazon Web Services account.
 */
export const listLogSubscriptions: API.PaginatedOperationMethod<
  ListLogSubscriptionsRequest,
  ListLogSubscriptionsResult,
  ListLogSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  LogSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, NextToken: 0, Limit: 0 },
    output: { LogSubscriptions: D.list({ SubscriptionCreatedDateTime: D.ts }) },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LogSubscriptions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListSchemaExtensionsError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | ServiceException
  | CommonErrors;
/**
 * Lists all schema extensions applied to a Microsoft AD Directory.
 */
export const listSchemaExtensions: API.PaginatedOperationMethod<
  ListSchemaExtensionsRequest,
  ListSchemaExtensionsResult,
  ListSchemaExtensionsError,
  Credentials | HttpClient.HttpClient,
  SchemaExtensionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, NextToken: 0, Limit: 0 },
    output: {
      SchemaExtensionsInfo: D.list({ StartDateTime: D.ts, EndDateTime: D.ts }),
    },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaExtensions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SchemaExtensionsInfo",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidNextTokenException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Lists all tags on a directory.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, NextToken: 0, Limit: 0 },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidNextTokenException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "Limit",
  } as const,
})) as any;

export type RegisterCertificateError =
  | CertificateAlreadyExistsException
  | CertificateLimitExceededException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | InvalidCertificateException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Registers a certificate for a secure LDAP or client certificate authentication.
 */
export const registerCertificate: API.OperationMethod<
  RegisterCertificateRequest,
  RegisterCertificateResult,
  RegisterCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      CertificateData: 0,
      Type: 0,
      ClientCertAuthSettings: { OCSPUrl: 0 },
    },
  },
  errors: [
    CertificateAlreadyExistsException,
    CertificateLimitExceededException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    InvalidCertificateException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCertificate",
})) as any;

export type RegisterEventTopicError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Associates a directory with an Amazon SNS topic. This establishes the directory as a
 * publisher to the specified Amazon SNS topic. You can then receive email or text (SMS) messages when
 * the status of your directory changes. You get notified if your directory goes from an Active
 * status to an Impaired or Inoperable status. You also receive a notification when the directory
 * returns to an Active status.
 */
export const registerEventTopic: API.OperationMethod<
  RegisterEventTopicRequest,
  RegisterEventTopicResult,
  RegisterEventTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, TopicName: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterEventTopic",
})) as any;

export type RejectSharedDirectoryError =
  | ClientException
  | DirectoryAlreadySharedException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Rejects a directory sharing request that was sent from the directory owner account.
 */
export const rejectSharedDirectory: API.OperationMethod<
  RejectSharedDirectoryRequest,
  RejectSharedDirectoryResult,
  RejectSharedDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SharedDirectoryId: 0 } },
  errors: [
    ClientException,
    DirectoryAlreadySharedException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectSharedDirectory",
})) as any;

export type RemoveIpRoutesError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Removes IP address blocks from a directory.
 */
export const removeIpRoutes: API.OperationMethod<
  RemoveIpRoutesRequest,
  RemoveIpRoutesResult,
  RemoveIpRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, CidrIps: 0, CidrIpv6s: 0 },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveIpRoutes",
})) as any;

export type RemoveRegionError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Stops all replication and removes the domain controllers from the specified Region. You
 * cannot remove the primary Region with this operation. Instead, use the
 * `DeleteDirectory` API.
 */
export const removeRegion: API.OperationMethod<
  RemoveRegionRequest,
  RemoveRegionResult,
  RemoveRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRegion",
})) as any;

export type RemoveTagsFromResourceError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Removes tags from a directory.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceRequest,
  RemoveTagsFromResourceResult,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, TagKeys: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
})) as any;

export type ResetUserPasswordError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidPasswordException
  | ServiceException
  | UnsupportedOperationException
  | UserDoesNotExistException
  | CommonErrors;
/**
 * Resets the password for any user in your Managed Microsoft AD or Simple AD directory. Disabled
 * users will become enabled and can be authenticated following the API call.
 *
 * You can reset the password for any user in your directory with the following
 * exceptions:
 *
 * - For Simple AD, you cannot reset the password for any user that is a member of either
 * the **Domain Admins** or Enterprise
 * Admins group except for the administrator user.
 *
 * - For Managed Microsoft AD, you can only reset the password for a user that is in an OU based
 * off of the NetBIOS name that you typed when you created your directory. For example, you
 * cannot reset the password for a user in the Amazon Web Services
 * Reserved OU. For more information about the OU structure for an Managed Microsoft AD
 * directory, see What Gets Created in the Directory Service Administration
 * Guide.
 */
export const resetUserPassword: API.OperationMethod<
  ResetUserPasswordRequest,
  ResetUserPasswordResult,
  ResetUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UserName: 0, NewPassword: 0 },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidPasswordException,
    ServiceException,
    UnsupportedOperationException,
    UserDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetUserPassword",
})) as any;

export type RestoreFromSnapshotError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Restores a directory using an existing directory snapshot.
 *
 * When you restore a directory from a snapshot, any changes made to the directory after the snapshot date are overwritten.
 *
 * This action returns as soon as the restore operation is initiated. You can monitor the
 * progress of the restore operation by calling the DescribeDirectories operation with
 * the directory identifier. When the **DirectoryDescription.Stage** value changes to
 * `Active`, the restore operation is complete.
 */
export const restoreFromSnapshot: API.OperationMethod<
  RestoreFromSnapshotRequest,
  RestoreFromSnapshotResult,
  RestoreFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SnapshotId: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromSnapshot",
})) as any;

export type ShareDirectoryError =
  | AccessDeniedException
  | ClientException
  | DirectoryAlreadySharedException
  | EntityDoesNotExistException
  | InvalidParameterException
  | InvalidTargetException
  | OrganizationsException
  | ServiceException
  | ShareLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Shares a specified directory (`DirectoryId`) in your Amazon Web Services account (directory
 * owner) with another Amazon Web Services account (directory consumer). With this operation you can use your
 * directory from any Amazon Web Services account and from any Amazon VPC within an Amazon Web Services Region.
 *
 * When you share your Managed Microsoft AD directory, Directory Service creates a shared directory in the
 * directory consumer account. This shared directory contains the metadata to provide access to
 * the directory within the directory owner account. The shared directory is visible in all VPCs
 * in the directory consumer account.
 *
 * The `ShareMethod` parameter determines whether the specified directory can be
 * shared between Amazon Web Services accounts inside the same Amazon Web Services organization (`ORGANIZATIONS`).
 * It also determines whether you can share the directory with any other Amazon Web Services account either
 * inside or outside of the organization (`HANDSHAKE`).
 *
 * The `ShareNotes` parameter is only used when `HANDSHAKE` is called,
 * which sends a directory sharing request to the directory consumer.
 */
export const shareDirectory: API.OperationMethod<
  ShareDirectoryRequest,
  ShareDirectoryResult,
  ShareDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      ShareNotes: 0,
      ShareTarget: { Id: 0, Type: 0 },
      ShareMethod: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryAlreadySharedException,
    EntityDoesNotExistException,
    InvalidParameterException,
    InvalidTargetException,
    OrganizationsException,
    ServiceException,
    ShareLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ShareDirectory",
})) as any;

export type StartADAssessmentError =
  | ADAssessmentLimitExceededException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Initiates a directory assessment to validate your self-managed AD environment for
 * hybrid domain join. The assessment checks compatibility and connectivity of the
 * self-managed AD environment.
 *
 * A directory assessment is automatically created when you create a hybrid directory.
 * There are two types of assessments: `CUSTOMER` and `SYSTEM`. Your
 * Amazon Web Services account has a limit of 100 `CUSTOMER` directory assessments.
 *
 * The assessment process typically takes 30 minutes or more to complete. The assessment
 * process is asynchronous and you can monitor it with
 * `DescribeADAssessment`.
 *
 * The `InstanceIds` must have a one-to-one correspondence with
 * `CustomerDnsIps`, meaning that if the IP address for instance i-10243410
 * is 10.24.34.100 and the IP address for instance i-10243420 is 10.24.34.200, then the
 * input arrays must maintain the same order relationship, either [10.24.34.100,
 * 10.24.34.200] paired with [i-10243410, i-10243420] or [10.24.34.200, 10.24.34.100]
 * paired with [i-10243420, i-10243410].
 *
 * Note: You must provide exactly one `DirectoryId` or
 * `AssessmentConfiguration`.
 */
export const startADAssessment: API.OperationMethod<
  StartADAssessmentRequest,
  StartADAssessmentResult,
  StartADAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssessmentConfiguration: {
        CustomerDnsIps: 0,
        DnsName: 0,
        VpcSettings: i_DirectoryVpcSettings,
        InstanceIds: 0,
        SecurityGroupIds: 0,
      },
      DirectoryId: 0,
    },
  },
  errors: [
    ADAssessmentLimitExceededException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartADAssessment",
})) as any;

export type StartSchemaExtensionError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | SnapshotLimitExceededException
  | CommonErrors;
/**
 * Applies a schema extension to a Microsoft AD directory.
 */
export const startSchemaExtension: API.OperationMethod<
  StartSchemaExtensionRequest,
  StartSchemaExtensionResult,
  StartSchemaExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      CreateSnapshotBeforeSchemaExtension: 0,
      LdifContent: 0,
      Description: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    SnapshotLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSchemaExtension",
})) as any;

export type UnshareDirectoryError =
  | ClientException
  | DirectoryNotSharedException
  | EntityDoesNotExistException
  | InvalidTargetException
  | ServiceException
  | CommonErrors;
/**
 * Stops the directory sharing between the directory owner and consumer accounts.
 */
export const unshareDirectory: API.OperationMethod<
  UnshareDirectoryRequest,
  UnshareDirectoryResult,
  UnshareDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, UnshareTarget: { Id: 0, Type: 0 } },
  },
  errors: [
    ClientException,
    DirectoryNotSharedException,
    EntityDoesNotExistException,
    InvalidTargetException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnshareDirectory",
})) as any;

export type UpdateConditionalForwarderError =
  | ClientException
  | DirectoryUnavailableException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates a conditional forwarder that has been set up for your Amazon Web Services
 * directory.
 */
export const updateConditionalForwarder: API.OperationMethod<
  UpdateConditionalForwarderRequest,
  UpdateConditionalForwarderResult,
  UpdateConditionalForwarderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      RemoteDomainName: 0,
      DnsIpAddrs: 0,
      DnsIpv6Addrs: 0,
    },
  },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConditionalForwarder",
})) as any;

export type UpdateDirectorySetupError =
  | AccessDeniedException
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryInDesiredStateException
  | DirectoryUnavailableException
  | InvalidParameterException
  | ServiceException
  | SnapshotLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates directory configuration for the specified update type.
 */
export const updateDirectorySetup: API.OperationMethod<
  UpdateDirectorySetupRequest,
  UpdateDirectorySetupResult,
  UpdateDirectorySetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      UpdateType: 0,
      OSUpdateSettings: { OSVersion: 0 },
      DirectorySizeUpdateSettings: { DirectorySize: 0 },
      NetworkUpdateSettings: { NetworkType: 0, CustomerDnsIpsV6: 0 },
      CreateSnapshotBeforeUpdate: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryInDesiredStateException,
    DirectoryUnavailableException,
    InvalidParameterException,
    ServiceException,
    SnapshotLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectorySetup",
})) as any;

export type UpdateHybridADError =
  | ADAssessmentLimitExceededException
  | ClientException
  | DirectoryDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the configuration of an existing hybrid directory. You can recover hybrid
 * directory administrator account or modify self-managed instance settings.
 *
 * Updates are applied asynchronously. Use DescribeHybridADUpdate to
 * monitor the progress of configuration changes.
 *
 * The `InstanceIds` must have a one-to-one correspondence with
 * `CustomerDnsIps`, meaning that if the IP address for instance i-10243410
 * is 10.24.34.100 and the IP address for instance i-10243420 is 10.24.34.200, then the
 * input arrays must maintain the same order relationship, either [10.24.34.100,
 * 10.24.34.200] paired with [i-10243410, i-10243420] or [10.24.34.200, 10.24.34.100]
 * paired with [i-10243420, i-10243410].
 *
 * You must provide at least one update to UpdateHybridADRequest$HybridAdministratorAccountUpdate or UpdateHybridADRequest$SelfManagedInstancesSettings.
 */
export const updateHybridAD: API.OperationMethod<
  UpdateHybridADRequest,
  UpdateHybridADResult,
  UpdateHybridADError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      HybridAdministratorAccountUpdate: { SecretArn: 0 },
      SelfManagedInstancesSettings: { CustomerDnsIps: 0, InstanceIds: 0 },
    },
  },
  errors: [
    ADAssessmentLimitExceededException,
    ClientException,
    DirectoryDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHybridAD",
})) as any;

export type UpdateNumberOfDomainControllersError =
  | ClientException
  | DirectoryUnavailableException
  | DomainControllerLimitExceededException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds or removes domain controllers to or from the directory. Based on the difference
 * between current value and new value (provided through this API call), domain controllers will
 * be added or removed. It may take up to 45 minutes for any new domain controllers to become
 * fully active once the requested number of domain controllers is updated. During this time, you
 * cannot make another update request.
 */
export const updateNumberOfDomainControllers: API.OperationMethod<
  UpdateNumberOfDomainControllersRequest,
  UpdateNumberOfDomainControllersResult,
  UpdateNumberOfDomainControllersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, DesiredNumber: 0 } },
  errors: [
    ClientException,
    DirectoryUnavailableException,
    DomainControllerLimitExceededException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNumberOfDomainControllers",
})) as any;

export type UpdateRadiusError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Updates the Remote Authentication Dial In User Service (RADIUS) server information for
 * an AD Connector or Microsoft AD directory.
 */
export const updateRadius: API.OperationMethod<
  UpdateRadiusRequest,
  UpdateRadiusResult,
  UpdateRadiusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, RadiusSettings: i_RadiusSettings },
  },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRadius",
})) as any;

export type UpdateSettingsError =
  | ClientException
  | DirectoryDoesNotExistException
  | DirectoryUnavailableException
  | IncompatibleSettingsException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | UnsupportedSettingsException
  | CommonErrors;
/**
 * Updates the configurable settings for the specified directory.
 */
export const updateSettings: API.OperationMethod<
  UpdateSettingsRequest,
  UpdateSettingsResult,
  UpdateSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, Settings: D.list({ Name: 0, Value: 0 }) },
  },
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    DirectoryUnavailableException,
    IncompatibleSettingsException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
    UnsupportedSettingsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSettings",
})) as any;

export type UpdateTrustError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | CommonErrors;
/**
 * Updates the trust that has been set up between your Managed Microsoft AD directory and an
 * self-managed Active Directory.
 */
export const updateTrust: API.OperationMethod<
  UpdateTrustRequest,
  UpdateTrustResult,
  UpdateTrustError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustId: 0, SelectiveAuth: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrust",
})) as any;

export type VerifyTrustError =
  | ClientException
  | EntityDoesNotExistException
  | InvalidParameterException
  | ServiceException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Directory Service for Microsoft Active Directory allows you to configure and verify trust
 * relationships.
 *
 * This action verifies a trust relationship between your Managed Microsoft AD directory and an
 * external domain.
 */
export const verifyTrust: API.OperationMethod<
  VerifyTrustRequest,
  VerifyTrustResult,
  VerifyTrustError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustId: 0 } },
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyTrust",
})) as any;

const i_DirectoryVpcSettings: D.LazyStruct = () => ({ VpcId: 0, SubnetIds: 0 });
const i_RadiusSettings: D.LazyStruct = () => ({
  RadiusServers: 0,
  RadiusServersIpv6: 0,
  RadiusPort: 0,
  RadiusTimeout: 0,
  RadiusRetries: 0,
  SharedSecret: 0,
  AuthenticationProtocol: 0,
  DisplayLabel: 0,
  UseSameUsername: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_HybridUpdateInfoEntry: D.LazyStruct = () => ({
  StartTime: D.ts,
  LastUpdatedDateTime: D.ts,
});
const o_RadiusSettings: D.LazyStruct = () => ({ SharedSecret: D.secret });
const o_SharedDirectory: D.LazyStruct = () => ({
  ShareNotes: D.secret,
  CreatedDateTime: D.ts,
  LastUpdatedDateTime: D.ts,
});
