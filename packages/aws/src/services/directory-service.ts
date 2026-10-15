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
const ns = /*@__PURE__*/ T.XmlNamespace("http://directoryservice.amazonaws.com/doc/2015-04-16/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Directory Service",
  serviceShapeName: "DirectoryService_20150416",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ds" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-04-16");
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
              `https://ds-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://ds-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://ds.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ds.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ds.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }).pipe(C.withAuthError) {}
export class ADAssessmentLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ADAssessmentLimitExceededException>()(
    "ADAssessmentLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class AuthenticationFailedException
  extends /*@__PURE__*/ S.TaggedError<AuthenticationFailedException>()(
    "AuthenticationFailedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class CertificateAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<CertificateAlreadyExistsException>()(
    "CertificateAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class CertificateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CertificateDoesNotExistException>()(
    "CertificateDoesNotExistException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class CertificateInUseException
  extends /*@__PURE__*/ S.TaggedError<CertificateInUseException>()("CertificateInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class CertificateLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CertificateLimitExceededException>()(
    "CertificateLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()("ClientException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class DirectoryAlreadyInRegionException
  extends /*@__PURE__*/ S.TaggedError<DirectoryAlreadyInRegionException>()(
    "DirectoryAlreadyInRegionException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryAlreadySharedException
  extends /*@__PURE__*/ S.TaggedError<DirectoryAlreadySharedException>()(
    "DirectoryAlreadySharedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DirectoryDoesNotExistException>()(
    "DirectoryDoesNotExistException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryInDesiredStateException
  extends /*@__PURE__*/ S.TaggedError<DirectoryInDesiredStateException>()(
    "DirectoryInDesiredStateException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DirectoryLimitExceededException>()(
    "DirectoryLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryNotSharedException
  extends /*@__PURE__*/ S.TaggedError<DirectoryNotSharedException>()(
    "DirectoryNotSharedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DirectoryUnavailableException>()(
    "DirectoryUnavailableException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DisableAlreadyInProgressException
  extends /*@__PURE__*/ S.TaggedError<DisableAlreadyInProgressException>()(
    "DisableAlreadyInProgressException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class DomainControllerLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DomainControllerLimitExceededException>()(
    "DomainControllerLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class EnableAlreadyInProgressException
  extends /*@__PURE__*/ S.TaggedError<EnableAlreadyInProgressException>()(
    "EnableAlreadyInProgressException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyExistsException>()(
    "EntityAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class EntityDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<EntityDoesNotExistException>()(
    "EntityDoesNotExistException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class IncompatibleSettingsException
  extends /*@__PURE__*/ S.TaggedError<IncompatibleSettingsException>()(
    "IncompatibleSettingsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InsufficientPermissionsException
  extends /*@__PURE__*/ S.TaggedError<InsufficientPermissionsException>()(
    "InsufficientPermissionsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InvalidCertificateException
  extends /*@__PURE__*/ S.TaggedError<InvalidCertificateException>()(
    "InvalidCertificateException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InvalidClientAuthStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientAuthStatusException>()(
    "InvalidClientAuthStatusException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InvalidLDAPSStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidLDAPSStatusException>()(
    "InvalidLDAPSStatusException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()("InvalidPasswordException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidTargetException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetException>()("InvalidTargetException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class IpRouteLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<IpRouteLimitExceededException>()(
    "IpRouteLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class NoAvailableCertificateException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableCertificateException>()(
    "NoAvailableCertificateException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class OrganizationsException
  extends /*@__PURE__*/ S.TaggedError<OrganizationsException>()("OrganizationsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class RegionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RegionLimitExceededException>()(
    "RegionLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()("ServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ShareLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ShareLimitExceededException>()(
    "ShareLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class SimpleADClosedToNewCustomers
  extends /*@__PURE__*/ S.TaggedError<SimpleADClosedToNewCustomers>()(
    "SimpleADClosedToNewCustomers",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { includes: "Simple AD is no longer open to new customers" },
    }),
  ).pipe(C.withAuthError) {}
export class SnapshotLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<SnapshotLimitExceededException>()(
    "SnapshotLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()("TagLimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class UnsupportedSettingsException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedSettingsException>()(
    "UnsupportedSettingsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class UserDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<UserDoesNotExistException>()("UserDoesNotExistException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    RequestId: /*@__PURE__*/ S.optional(S.String),
  }) {}
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
export type DirectoryEdition = "Enterprise" | "Standard" | "Hybrid" | (string & {});
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
export type TrustDirection = "One-Way: Outgoing" | "One-Way: Incoming" | "Two-Way" | (string & {});
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
export type ClientAuthenticationType = "SmartCard" | "SmartCardOrPassword" | (string & {});
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
export type ClientAuthenticationSettingsInfo = ClientAuthenticationSettingInfo[];
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
export type TopicStatus = "Registered" | "Topic not found" | "Failed" | "Deleted" | (string & {});
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
export type UpdateStatus = "Updated" | "Updating" | "UpdateFailed" | (string & {});
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
export type LDAPSStatus = "Enabling" | "Enabled" | "EnableFailed" | "Disabled" | (string & {});
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
  RequestDetailedStatus?: { [key: string]: DirectoryConfigurationStatus | undefined };
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
export type SnapshotStatus = "Creating" | "Completed" | "Failed" | (string & {});
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
  input: __S(368, __c23, 0) as any as S.Schema<AcceptSharedDirectoryRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<AcceptSharedDirectoryResult>,
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
}));

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
  input: __S(402, __c25, 2) as any as S.Schema<AddIpRoutesRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<AddIpRoutesResult>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<AddRegionRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<AddRegionResult>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<AddTagsToResourceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<AddTagsToResourceResult>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<CancelSchemaExtensionRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CancelSchemaExtensionResult>,
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSchemaExtension",
}));

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
  input: __S(529, __c33, 1) as any as S.Schema<ConnectDirectoryRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<ConnectDirectoryResult>,
  errors: [
    ClientException,
    DirectoryLimitExceededException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConnectDirectory",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<CreateAliasRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<CreateAliasResult>,
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
}));

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
  input: __S(578, __c36, 2) as any as S.Schema<CreateComputerRequest>,
  output: __S(580, __c36, 4) as any as S.Schema<CreateComputerResult>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<CreateConditionalForwarderRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CreateConditionalForwarderResult>,
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
}));

export type CreateDirectoryError =
  | ClientException
  | DirectoryLimitExceededException
  | InvalidParameterException
  | ServiceException
  | SimpleADClosedToNewCustomers
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
  input: __S(608, __c38, 0) as any as S.Schema<CreateDirectoryRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<CreateDirectoryResult>,
  errors: [
    ClientException,
    DirectoryLimitExceededException,
    InvalidParameterException,
    ServiceException,
    SimpleADClosedToNewCustomers,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectory",
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<CreateHybridADRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<CreateHybridADResult>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<CreateLogSubscriptionRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CreateLogSubscriptionResult>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<CreateMicrosoftADRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<CreateMicrosoftADResult>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<CreateSnapshotResult>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<CreateTrustRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<CreateTrustResult>,
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
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<DeleteADAssessmentRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteADAssessmentResult>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<DeleteConditionalForwarderRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeleteConditionalForwarderResult>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<DeleteDirectoryRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<DeleteDirectoryResult>,
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectory",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<DeleteLogSubscriptionRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeleteLogSubscriptionResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogSubscription",
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteSnapshotResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<DeleteTrustRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<DeleteTrustResult>,
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
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<DeregisterCertificateRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeregisterCertificateResult>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<DeregisterEventTopicRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeregisterEventTopicResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterEventTopic",
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<DescribeADAssessmentRequest>,
  output: __S(886, __c55, 6) as any as S.Schema<DescribeADAssessmentResult>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<DescribeCAEnrollmentPolicyRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<DescribeCAEnrollmentPolicyResult>,
  errors: [
    ClientException,
    DirectoryDoesNotExistException,
    ServiceException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCAEnrollmentPolicy",
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<DescribeCertificateRequest>,
  output: __S(914, __c57, 2) as any as S.Schema<DescribeCertificateResult>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<DescribeClientAuthenticationSettingsRequest>,
  output: __S(947, __c59, 3) as any as S.Schema<DescribeClientAuthenticationSettingsResult>,
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
  input: __S(960, __c60, 0) as any as S.Schema<DescribeConditionalForwardersRequest>,
  output: __S(963, __c60, 3) as any as S.Schema<DescribeConditionalForwardersResult>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<DescribeDirectoriesRequest>,
  output: __S(984, __c61, 8) as any as S.Schema<DescribeDirectoriesResult>,
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
  input: __S(1008, __c63, 0) as any as S.Schema<DescribeDirectoryDataAccessRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<DescribeDirectoryDataAccessResult>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<DescribeDomainControllersRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<DescribeDomainControllersResult>,
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
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
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
  input: __S(1040, __c65, 0) as any as S.Schema<DescribeEventTopicsRequest>,
  output: __S(1043, __c65, 3) as any as S.Schema<DescribeEventTopicsResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTopics",
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<DescribeHybridADUpdateRequest>,
  output: __S(1061, __c66, 5) as any as S.Schema<DescribeHybridADUpdateResult>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<DescribeLDAPSSettingsRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<DescribeLDAPSSettingsResult>,
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
  input: __S(1088, __c68, 0) as any as S.Schema<DescribeRegionsRequest>,
  output: __S(1091, __c68, 3) as any as S.Schema<DescribeRegionsResult>,
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
  input: __S(1104, __c69, 0) as any as S.Schema<DescribeSettingsRequest>,
  output: __S(1108, __c69, 4) as any as S.Schema<DescribeSettingsResult>,
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
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<DescribeSharedDirectoriesRequest>,
  output: __S(1122, __c70, 2) as any as S.Schema<DescribeSharedDirectoriesResult>,
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
  input: __S(1136, __c71, 0) as any as S.Schema<DescribeSnapshotsRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<DescribeSnapshotsResult>,
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
  input: __S(1152, __c72, 0) as any as S.Schema<DescribeTrustsRequest>,
  output: __S(1155, __c72, 3) as any as S.Schema<DescribeTrustsResult>,
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
  input: __S(1168, __c73, 0) as any as S.Schema<DescribeUpdateDirectoryRequest>,
  output: __S(1172, __c73, 4) as any as S.Schema<DescribeUpdateDirectoryResult>,
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
  input: __S(1200, __c75, 0) as any as S.Schema<DisableCAEnrollmentPolicyRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableCAEnrollmentPolicyResult>,
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
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<DisableClientAuthenticationRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableClientAuthenticationResult>,
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
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<DisableDirectoryDataAccessRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableDirectoryDataAccessResult>,
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
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<DisableLDAPSRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableLDAPSResult>,
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
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<DisableRadiusRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableRadiusResult>,
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRadius",
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<DisableSsoRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DisableSsoResult>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<EnableCAEnrollmentPolicyRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableCAEnrollmentPolicyResult>,
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
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<EnableClientAuthenticationRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableClientAuthenticationResult>,
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
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<EnableDirectoryDataAccessRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableDirectoryDataAccessResult>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<EnableLDAPSRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableLDAPSResult>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<EnableRadiusRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableRadiusResult>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<EnableSsoRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<EnableSsoResult>,
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
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<GetDirectoryLimitsRequest>,
  output: __S(1394, __c87, 2) as any as S.Schema<GetDirectoryLimitsResult>,
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectoryLimits",
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<GetSnapshotLimitsRequest>,
  output: __S(1410, __c88, 2) as any as S.Schema<GetSnapshotLimitsResult>,
  errors: [ClientException, EntityDoesNotExistException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshotLimits",
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<ListADAssessmentsRequest>,
  output: __S(1427, __c89, 3) as any as S.Schema<ListADAssessmentsResult>,
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
  input: __S(1440, __c90, 0) as any as S.Schema<ListCertificatesRequest>,
  output: __S(1443, __c90, 3) as any as S.Schema<ListCertificatesResult>,
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
  input: __S(1456, __c91, 0) as any as S.Schema<ListIpRoutesRequest>,
  output: __S(1459, __c91, 3) as any as S.Schema<ListIpRoutesResult>,
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
  input: __S(1472, __c92, 0) as any as S.Schema<ListLogSubscriptionsRequest>,
  output: __S(1475, __c92, 3) as any as S.Schema<ListLogSubscriptionsResult>,
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
  input: __S(1488, __c93, 0) as any as S.Schema<ListSchemaExtensionsRequest>,
  output: __S(1491, __c93, 3) as any as S.Schema<ListSchemaExtensionsResult>,
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
  input: __S(0, __c0, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<ListTagsForResourceResult>,
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
  input: __S(16, __c1, 0) as any as S.Schema<RegisterCertificateRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<RegisterCertificateResult>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<RegisterEventTopicRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<RegisterEventTopicResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterEventTopic",
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<RejectSharedDirectoryRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<RejectSharedDirectoryResult>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<RemoveIpRoutesRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<RemoveIpRoutesResult>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<RemoveRegionRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<RemoveRegionResult>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<RemoveTagsFromResourceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<RemoveTagsFromResourceResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<ResetUserPasswordRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<ResetUserPasswordResult>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<RestoreFromSnapshotRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<RestoreFromSnapshotResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromSnapshot",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<ShareDirectoryRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<ShareDirectoryResult>,
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
}));

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
  input: __S(193, __c12, 1) as any as S.Schema<StartADAssessmentRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<StartADAssessmentResult>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<StartSchemaExtensionRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<StartSchemaExtensionResult>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<UnshareDirectoryRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<UnshareDirectoryResult>,
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
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<UpdateConditionalForwarderRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateConditionalForwarderResult>,
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
}));

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
  input: __S(258, __c16, 2) as any as S.Schema<UpdateDirectorySetupRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateDirectorySetupResult>,
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
}));

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
  input: __S(274, __c17, 2) as any as S.Schema<UpdateHybridADRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<UpdateHybridADResult>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<UpdateNumberOfDomainControllersRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateNumberOfDomainControllersResult>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<UpdateRadiusRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateRadiusResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRadius",
}));

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
  input: __S(322, __c20, 2) as any as S.Schema<UpdateSettingsRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<UpdateSettingsResult>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<UpdateTrustRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<UpdateTrustResult>,
  errors: [
    ClientException,
    EntityDoesNotExistException,
    InvalidParameterException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrust",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<VerifyTrustRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<VerifyTrustResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(497, __c31, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTagsForResourceResult" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          CertificateData: S.String,
          Type: S.optional(S.String),
          ClientCertAuthSettings: S.optional(__S(928, __c58, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterCertificateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CertificateId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterCertificateResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, TopicName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterEventTopicRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SharedDirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectSharedDirectoryRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SharedDirectoryId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "RejectSharedDirectoryResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          CidrIps: S.optional(__S(448, __c28, 0)),
          CidrIpv6s: S.optional(__S(448, __c28, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveIpRoutesRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveRegionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagKeys: __S(448, __c28, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsFromResourceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, UserName: S.String, NewPassword: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetUserPasswordRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RestoreFromSnapshotRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          ShareNotes: S.optional(SensitiveString),
          ShareTarget: __S(176, __c11, 0),
          ShareMethod: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ShareDirectoryRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String, Type: S.String })).annotate({
        identifier: "ShareTarget",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerDnsIps: __S(448, __c28, 0),
          DnsName: S.String,
          VpcSettings: __S(464, __c29, 0),
          InstanceIds: __S(448, __c28, 0),
          SecurityGroupIds: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "AssessmentConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssessmentConfiguration: S.optional(__S(192, __c12, 0)),
          DirectoryId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartADAssessmentRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          CreateSnapshotBeforeSchemaExtension: S.Boolean,
          LdifContent: S.String,
          Description: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSchemaExtensionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SchemaExtensionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartSchemaExtensionResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, UnshareTarget: __S(176, __c11, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UnshareDirectoryRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          RemoteDomainName: S.String,
          DnsIpAddrs: S.optional(__S(448, __c28, 0)),
          DnsIpv6Addrs: S.optional(__S(448, __c28, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConditionalForwarderRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DirectorySize: S.optional(S.String) })).annotate({
        identifier: "DirectorySizeUpdateSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NetworkType: S.optional(S.String),
          CustomerDnsIpsV6: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "NetworkUpdateSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          UpdateType: S.String,
          OSUpdateSettings: S.optional(__S(1184, __c74, 0)),
          DirectorySizeUpdateSettings: S.optional(__S(256, __c16, 0)),
          NetworkUpdateSettings: S.optional(__S(257, __c16, 1)),
          CreateSnapshotBeforeUpdate: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDirectorySetupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SecretArn: S.String })).annotate({
        identifier: "HybridAdministratorAccountUpdate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ CustomerDnsIps: __S(448, __c28, 0), InstanceIds: __S(448, __c28, 0) }),
      ).annotate({ identifier: "HybridCustomerInstancesSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          HybridAdministratorAccountUpdate: S.optional(__S(272, __c17, 0)),
          SelfManagedInstancesSettings: S.optional(__S(273, __c17, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateHybridADRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.optional(S.String), AssessmentId: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "UpdateHybridADResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, DesiredNumber: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateNumberOfDomainControllersRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, RadiusSettings: __S(992, __c62, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRadiusRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "Setting",
      });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Settings: __S(321, __c20, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSettingsRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrustId: S.String, SelectiveAuth: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTrustRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RequestId: S.optional(S.String), TrustId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "UpdateTrustResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrustId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyTrustRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SharedDirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptSharedDirectoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SharedDirectory: S.optional(__S(384, __c24, 0)) }).pipe(ns),
      ).annotate({ identifier: "AcceptSharedDirectoryResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OwnerAccountId: S.optional(S.String),
          OwnerDirectoryId: S.optional(S.String),
          ShareMethod: S.optional(S.String),
          SharedAccountId: S.optional(S.String),
          SharedDirectoryId: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          ShareNotes: S.optional(SensitiveString),
          CreatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SharedDirectory" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CidrIp: S.optional(S.String),
          CidrIpv6: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpRoute" });
    case 1:
      return S.Array(__S(400, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          IpRoutes: __S(401, __c25, 1),
          UpdateSecurityGroupForDirectoryControllers: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddIpRoutesRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AddIpRoutesResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          RegionName: S.String,
          VPCSettings: __S(464, __c29, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddRegionRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VpcId: S.String, SubnetIds: __S(448, __c28, 0) })).annotate(
        { identifier: "DirectoryVpcSettings" },
      );
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, Tags: __S(497, __c31, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(496, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, SchemaExtensionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelSchemaExtensionRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.String,
          SubnetIds: __S(448, __c28, 0),
          CustomerDnsIps: S.optional(__S(448, __c28, 0)),
          CustomerDnsIpsV6: S.optional(__S(448, __c28, 0)),
          CustomerUserName: S.String,
        }),
      ).annotate({ identifier: "DirectoryConnectSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ShortName: S.optional(S.String),
          Password: SensitiveString,
          Description: S.optional(S.String),
          Size: S.String,
          ConnectSettings: __S(528, __c33, 0),
          Tags: S.optional(__S(497, __c31, 1)),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConnectDirectoryRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DirectoryId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "ConnectDirectoryResult",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Alias: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAliasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.optional(S.String), Alias: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateAliasResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Attribute" });
    case 1:
      return S.Array(__S(576, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          ComputerName: S.String,
          Password: SensitiveString,
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          ComputerAttributes: S.optional(__S(577, __c36, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateComputerRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComputerId: S.optional(S.String),
          ComputerName: S.optional(S.String),
          ComputerAttributes: S.optional(__S(577, __c36, 1)),
        }),
      ).annotate({ identifier: "Computer" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Computer: S.optional(__S(579, __c36, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateComputerResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          RemoteDomainName: S.String,
          DnsIpAddrs: S.optional(__S(448, __c28, 0)),
          DnsIpv6Addrs: S.optional(__S(448, __c28, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConditionalForwarderRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ShortName: S.optional(S.String),
          Password: SensitiveString,
          Description: S.optional(S.String),
          Size: S.String,
          VpcSettings: S.optional(__S(464, __c29, 0)),
          Tags: S.optional(__S(497, __c31, 1)),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDirectoryRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecretArn: S.String,
          AssessmentId: S.String,
          Tags: S.optional(__S(497, __c31, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHybridADRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, LogGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLogSubscriptionRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ShortName: S.optional(S.String),
          Password: SensitiveString,
          Description: S.optional(S.String),
          VpcSettings: __S(464, __c29, 0),
          Edition: S.optional(S.String),
          Tags: S.optional(__S(497, __c31, 1)),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMicrosoftADRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SnapshotId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateSnapshotResult",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          RemoteDomainName: S.String,
          TrustPassword: SensitiveString,
          TrustDirection: S.String,
          TrustType: S.optional(S.String),
          ConditionalForwarderIpAddrs: S.optional(__S(448, __c28, 0)),
          ConditionalForwarderIpv6Addrs: S.optional(__S(448, __c28, 0)),
          SelectiveAuth: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTrustRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TrustId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateTrustResult",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssessmentId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteADAssessmentRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AssessmentId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteADAssessmentResult",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, RemoteDomainName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConditionalForwarderRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDirectoryRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLogSubscriptionRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrustId: S.String,
          DeleteAssociatedConditionalForwarder: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTrustRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, CertificateId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterCertificateRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, TopicName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterEventTopicRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssessmentId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeADAssessmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssessmentId: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          DnsName: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusCode: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CustomerDnsIps: S.optional(__S(448, __c28, 0)),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(448, __c28, 0)),
          SecurityGroupIds: S.optional(__S(448, __c28, 0)),
          SelfManagedInstanceIds: S.optional(__S(448, __c28, 0)),
          ReportType: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "Assessment" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          StatusCode: S.optional(S.String),
          StatusReason: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AssessmentValidation" });
    case 3:
      return S.Array(__S(882, __c55, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DomainControllerIp: S.optional(S.String),
          Validations: S.optional(__S(883, __c55, 3)),
        }),
      ).annotate({ identifier: "AssessmentReport" });
    case 5:
      return S.Array(__S(884, __c55, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Assessment: S.optional(__S(881, __c55, 1)),
          AssessmentReports: S.optional(__S(885, __c55, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeADAssessmentResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCAEnrollmentPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          PcaConnectorArn: S.optional(S.String),
          CaEnrollmentPolicyStatus: S.optional(S.String),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CaEnrollmentPolicyStatusReason: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCAEnrollmentPolicyResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, CertificateId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CertificateId: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          CommonName: S.optional(S.String),
          RegisteredDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiryDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          ClientCertAuthSettings: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "Certificate" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Certificate: S.optional(__S(913, __c57, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeCertificateResult" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OCSPUrl: S.optional(S.String) })).annotate({
        identifier: "ClientCertAuthSettings",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          Type: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClientAuthenticationSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ClientAuthenticationSettingInfo" });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClientAuthenticationSettingsInfo: S.optional(__S(946, __c59, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeClientAuthenticationSettingsResult" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, RemoteDomainNames: S.optional(__S(448, __c28, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConditionalForwardersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RemoteDomainName: S.optional(S.String),
          DnsIpAddrs: S.optional(__S(448, __c28, 0)),
          DnsIpv6Addrs: S.optional(__S(448, __c28, 0)),
          ReplicationScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConditionalForwarder" });
    case 2:
      return S.Array(__S(961, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ConditionalForwarders: S.optional(__S(962, __c60, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeConditionalForwardersResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryIds: S.optional(__S(448, __c28, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectoriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(448, __c28, 0)),
          SecurityGroupId: S.optional(S.String),
          AvailabilityZones: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "DirectoryVpcSettingsDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(448, __c28, 0)),
          CustomerUserName: S.optional(S.String),
          SecurityGroupId: S.optional(S.String),
          AvailabilityZones: S.optional(__S(448, __c28, 0)),
          ConnectIps: S.optional(__S(448, __c28, 0)),
          ConnectIpsV6: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "DirectoryConnectSettingsDescription" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          AccountId: S.optional(S.String),
          DnsIpAddrs: S.optional(__S(448, __c28, 0)),
          DnsIpv6Addrs: S.optional(__S(448, __c28, 0)),
          VpcSettings: S.optional(__S(977, __c61, 1)),
          RadiusSettings: S.optional(__S(992, __c62, 0)),
          RadiusStatus: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "OwnerDirectoryDescription" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PrimaryRegion: S.optional(S.String),
          AdditionalRegions: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "RegionsInfo" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SelfManagedDnsIpAddrs: S.optional(__S(448, __c28, 0)),
          SelfManagedInstanceIds: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "HybridSettingsDescription" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Name: S.optional(S.String),
          ShortName: S.optional(S.String),
          Size: S.optional(S.String),
          Edition: S.optional(S.String),
          Alias: S.optional(S.String),
          AccessUrl: S.optional(S.String),
          Description: S.optional(S.String),
          DnsIpAddrs: S.optional(__S(448, __c28, 0)),
          DnsIpv6Addrs: S.optional(__S(448, __c28, 0)),
          Stage: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          ShareMethod: S.optional(S.String),
          ShareNotes: S.optional(SensitiveString),
          LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StageLastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          VpcSettings: S.optional(__S(977, __c61, 1)),
          ConnectSettings: S.optional(__S(978, __c61, 2)),
          RadiusSettings: S.optional(__S(992, __c62, 0)),
          RadiusStatus: S.optional(S.String),
          StageReason: S.optional(S.String),
          SsoEnabled: S.optional(S.Boolean),
          DesiredNumberOfDomainControllers: S.optional(S.Number),
          OwnerDirectoryDescription: S.optional(__S(979, __c61, 3)),
          RegionsInfo: S.optional(__S(980, __c61, 4)),
          OsVersion: S.optional(S.String),
          HybridSettings: S.optional(__S(981, __c61, 5)),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DirectoryDescription" });
    case 7:
      return S.Array(__S(982, __c61, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          DirectoryDescriptions: S.optional(__S(983, __c61, 7)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectoriesResult" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RadiusServers: S.optional(__S(448, __c28, 0)),
          RadiusServersIpv6: S.optional(__S(448, __c28, 0)),
          RadiusPort: S.optional(S.Number),
          RadiusTimeout: S.optional(S.Number),
          RadiusRetries: S.optional(S.Number),
          SharedSecret: S.optional(SensitiveString),
          AuthenticationProtocol: S.optional(S.String),
          DisplayLabel: S.optional(S.String),
          UseSameUsername: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RadiusSettings" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDirectoryDataAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataAccessStatus: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectoryDataAccessResult" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          DomainControllerIds: S.optional(__S(448, __c28, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDomainControllersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          DomainControllerId: S.optional(S.String),
          DnsIpAddr: S.optional(S.String),
          DnsIpv6Addr: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusLastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DomainController" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DomainControllers: S.optional(__S(1026, __c64, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDomainControllersResult" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          TopicNames: S.optional(__S(448, __c28, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventTopicsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          TopicName: S.optional(S.String),
          TopicArn: S.optional(S.String),
          CreatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventTopic" });
    case 2:
      return S.Array(__S(1041, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EventTopics: S.optional(__S(1042, __c65, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEventTopicsResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          UpdateType: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeHybridADUpdateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(448, __c28, 0)),
          DnsIps: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "HybridUpdateValue" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          InitiatedBy: S.optional(S.String),
          NewValue: S.optional(__S(1057, __c66, 1)),
          PreviousValue: S.optional(__S(1057, __c66, 1)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssessmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "HybridUpdateInfoEntry" });
    case 3:
      return S.Array(__S(1058, __c66, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          SelfManagedInstances: S.optional(__S(1059, __c66, 3)),
          HybridAdministratorAccount: S.optional(__S(1059, __c66, 3)),
        }),
      ).annotate({ identifier: "HybridUpdateActivities" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          UpdateActivities: S.optional(__S(1060, __c66, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeHybridADUpdateResult" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          Type: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLDAPSSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LDAPSStatus: S.optional(S.String),
          LDAPSStatusReason: S.optional(S.String),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LDAPSSettingInfo" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LDAPSSettingsInfo: S.optional(__S(1074, __c67, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLDAPSSettingsResult" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          RegionName: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRegionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          RegionName: S.optional(S.String),
          RegionType: S.optional(S.String),
          Status: S.optional(S.String),
          VpcSettings: S.optional(__S(464, __c29, 0)),
          DesiredNumberOfDomainControllers: S.optional(S.Number),
          LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusLastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RegionDescription" });
    case 2:
      return S.Array(__S(1089, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RegionsDescription: S.optional(__S(1090, __c68, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRegionsResult" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSettingsRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          AppliedValue: S.optional(S.String),
          RequestedValue: S.optional(S.String),
          RequestStatus: S.optional(S.String),
          RequestDetailedStatus: S.optional(__S(1105, __c69, 1)),
          RequestStatusMessage: S.optional(S.String),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastRequestedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SettingEntry" });
    case 3:
      return S.Array(__S(1106, __c69, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SettingEntries: S.optional(__S(1107, __c69, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSettingsResult" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OwnerDirectoryId: S.String,
          SharedDirectoryIds: S.optional(__S(448, __c28, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSharedDirectoriesRequest" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SharedDirectories: S.optional(__S(1121, __c70, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSharedDirectoriesResult" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SnapshotIds: S.optional(__S(448, __c28, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Snapshot" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Snapshots: S.optional(__S(1138, __c71, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotsResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          TrustIds: S.optional(__S(448, __c28, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTrustsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          TrustId: S.optional(S.String),
          RemoteDomainName: S.optional(S.String),
          TrustType: S.optional(S.String),
          TrustDirection: S.optional(S.String),
          TrustState: S.optional(S.String),
          CreatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StateLastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrustStateReason: S.optional(S.String),
          SelectiveAuth: S.optional(S.String),
        }),
      ).annotate({ identifier: "Trust" });
    case 2:
      return S.Array(__S(1153, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Trusts: S.optional(__S(1154, __c72, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeTrustsResult" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          UpdateType: S.String,
          RegionName: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUpdateDirectoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OSUpdateSettings: S.optional(__S(1184, __c74, 0)) }),
      ).annotate({ identifier: "UpdateValue" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          InitiatedBy: S.optional(S.String),
          NewValue: S.optional(__S(1169, __c73, 1)),
          PreviousValue: S.optional(__S(1169, __c73, 1)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateInfoEntry" });
    case 3:
      return S.Array(__S(1170, __c73, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          UpdateActivities: S.optional(__S(1171, __c73, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeUpdateDirectoryResult" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OSVersion: S.optional(S.String) })).annotate({
        identifier: "OSUpdateSettings",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableCAEnrollmentPolicyRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Type: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableClientAuthenticationRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableDirectoryDataAccessRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Type: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableLDAPSRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableRadiusRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableSsoRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, PcaConnectorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableCAEnrollmentPolicyRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Type: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableClientAuthenticationRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableDirectoryDataAccessRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, Type: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableLDAPSRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String, RadiusSettings: __S(992, __c62, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableRadiusRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableSsoRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDirectoryLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudOnlyDirectoriesLimit: S.optional(S.Number),
          CloudOnlyDirectoriesCurrentCount: S.optional(S.Number),
          CloudOnlyDirectoriesLimitReached: S.optional(S.Boolean),
          CloudOnlyMicrosoftADLimit: S.optional(S.Number),
          CloudOnlyMicrosoftADCurrentCount: S.optional(S.Number),
          CloudOnlyMicrosoftADLimitReached: S.optional(S.Boolean),
          ConnectedDirectoriesLimit: S.optional(S.Number),
          ConnectedDirectoriesCurrentCount: S.optional(S.Number),
          ConnectedDirectoriesLimitReached: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DirectoryLimits" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DirectoryLimits: S.optional(__S(1393, __c87, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetDirectoryLimitsResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSnapshotLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManualSnapshotsLimit: S.optional(S.Number),
          ManualSnapshotsCurrentCount: S.optional(S.Number),
          ManualSnapshotsLimitReached: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SnapshotLimits" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SnapshotLimits: S.optional(__S(1409, __c88, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetSnapshotLimitsResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListADAssessmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssessmentId: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          DnsName: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          CustomerDnsIps: S.optional(__S(448, __c28, 0)),
          ReportType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssessmentSummary" });
    case 2:
      return S.Array(__S(1425, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Assessments: S.optional(__S(1426, __c89, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListADAssessmentsResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CertificateId: S.optional(S.String),
          CommonName: S.optional(S.String),
          State: S.optional(S.String),
          ExpiryDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateInfo" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CertificatesInfo: S.optional(__S(1442, __c90, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListCertificatesResult" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIpRoutesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          CidrIp: S.optional(S.String),
          CidrIpv6: S.optional(S.String),
          IpRouteStatusMsg: S.optional(S.String),
          AddedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IpRouteStatusReason: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpRouteInfo" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IpRoutesInfo: S.optional(__S(1458, __c91, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListIpRoutesResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLogSubscriptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          LogGroupName: S.optional(S.String),
          SubscriptionCreatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LogSubscription" });
    case 2:
      return S.Array(__S(1473, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LogSubscriptions: S.optional(__S(1474, __c92, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLogSubscriptionsResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchemaExtensionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SchemaExtensionId: S.optional(S.String),
          Description: S.optional(S.String),
          SchemaExtensionStatus: S.optional(S.String),
          SchemaExtensionStatusReason: S.optional(S.String),
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SchemaExtensionInfo" });
    case 2:
      return S.Array(__S(1489, __c93, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SchemaExtensionsInfo: S.optional(__S(1490, __c93, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSchemaExtensionsResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
