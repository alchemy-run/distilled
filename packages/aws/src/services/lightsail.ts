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
  sdkId: "Lightsail",
  target: "Lightsail_20161128",
  version: "2016-11-28",
  sigv4: "lightsail",
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
                `https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://lightsail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://lightsail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class AccountSetupInProgressException
  extends /*@__PURE__*/ TE.TaggedError("AccountSetupInProgressException", [], {
    status: 428,
  })<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class OperationFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationFailureException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class RegionSetupInProgressException
  extends /*@__PURE__*/ TE.TaggedError("RegionSetupInProgressException", [], {
    status: 428,
  })<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export class UnauthenticatedException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthenticatedException",
    ["AuthError"],
    { status: 401 },
  )<{
    readonly code?: string;
    readonly docs?: string;
    readonly message?: string;
    readonly tip?: string;
  }> {}
export type ResourceName = string;
export interface AllocateStaticIpRequest {
  staticIpName: string;
}
export type NonEmptyString = string;
export type ResourceType =
  | "ContainerService"
  | "Instance"
  | "StaticIp"
  | "KeyPair"
  | "InstanceSnapshot"
  | "Domain"
  | "PeeredVpc"
  | "LoadBalancer"
  | "LoadBalancerTlsCertificate"
  | "Disk"
  | "DiskSnapshot"
  | "RelationalDatabase"
  | "RelationalDatabaseSnapshot"
  | "ExportSnapshotRecord"
  | "CloudFormationStackRecord"
  | "Alarm"
  | "ContactMethod"
  | "Distribution"
  | "Certificate"
  | "Bucket"
  | (string & {});
export type IsoDate = Date;
export type RegionName =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-south-2"
  | "ca-central-1"
  | "ap-east-1"
  | "ap-south-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "sa-east-1"
  | (string & {});
export interface ResourceLocation {
  availabilityZone?: string;
  regionName?: RegionName;
}
export type OperationType =
  | "DeleteKnownHostKeys"
  | "DeleteInstance"
  | "CreateInstance"
  | "StopInstance"
  | "StartInstance"
  | "RebootInstance"
  | "OpenInstancePublicPorts"
  | "PutInstancePublicPorts"
  | "CloseInstancePublicPorts"
  | "AllocateStaticIp"
  | "ReleaseStaticIp"
  | "AttachStaticIp"
  | "DetachStaticIp"
  | "UpdateDomainEntry"
  | "DeleteDomainEntry"
  | "CreateDomain"
  | "DeleteDomain"
  | "CreateInstanceSnapshot"
  | "DeleteInstanceSnapshot"
  | "CreateInstancesFromSnapshot"
  | "CreateLoadBalancer"
  | "DeleteLoadBalancer"
  | "AttachInstancesToLoadBalancer"
  | "DetachInstancesFromLoadBalancer"
  | "UpdateLoadBalancerAttribute"
  | "CreateLoadBalancerTlsCertificate"
  | "DeleteLoadBalancerTlsCertificate"
  | "AttachLoadBalancerTlsCertificate"
  | "CreateDisk"
  | "DeleteDisk"
  | "AttachDisk"
  | "DetachDisk"
  | "CreateDiskSnapshot"
  | "DeleteDiskSnapshot"
  | "CreateDiskFromSnapshot"
  | "CreateRelationalDatabase"
  | "UpdateRelationalDatabase"
  | "DeleteRelationalDatabase"
  | "CreateRelationalDatabaseFromSnapshot"
  | "CreateRelationalDatabaseSnapshot"
  | "DeleteRelationalDatabaseSnapshot"
  | "UpdateRelationalDatabaseParameters"
  | "StartRelationalDatabase"
  | "RebootRelationalDatabase"
  | "StopRelationalDatabase"
  | "EnableAddOn"
  | "DisableAddOn"
  | "PutAlarm"
  | "GetAlarms"
  | "DeleteAlarm"
  | "TestAlarm"
  | "CreateContactMethod"
  | "GetContactMethods"
  | "SendContactMethodVerification"
  | "DeleteContactMethod"
  | "CreateDistribution"
  | "UpdateDistribution"
  | "DeleteDistribution"
  | "ResetDistributionCache"
  | "AttachCertificateToDistribution"
  | "DetachCertificateFromDistribution"
  | "UpdateDistributionBundle"
  | "SetIpAddressType"
  | "CreateCertificate"
  | "DeleteCertificate"
  | "CreateContainerService"
  | "UpdateContainerService"
  | "DeleteContainerService"
  | "CreateContainerServiceDeployment"
  | "CreateContainerServiceRegistryLogin"
  | "RegisterContainerImage"
  | "DeleteContainerImage"
  | "CreateBucket"
  | "DeleteBucket"
  | "CreateBucketAccessKey"
  | "DeleteBucketAccessKey"
  | "UpdateBucketBundle"
  | "UpdateBucket"
  | "SetResourceAccessForBucket"
  | "UpdateInstanceMetadataOptions"
  | "StartGUISession"
  | "StopGUISession"
  | "SetupInstanceHttps"
  | (string & {});
export type OperationStatus =
  | "NotStarted"
  | "Started"
  | "Failed"
  | "Completed"
  | "Succeeded"
  | (string & {});
export interface Operation {
  id?: string;
  resourceName?: string;
  resourceType?: ResourceType;
  createdAt?: Date;
  location?: ResourceLocation;
  isTerminal?: boolean;
  operationDetails?: string;
  operationType?: OperationType;
  status?: OperationStatus;
  statusChangedAt?: Date;
  errorCode?: string;
  errorDetails?: string;
}
export type OperationList = Operation[];
export interface AllocateStaticIpResult {
  operations?: Operation[];
}
export interface AttachCertificateToDistributionRequest {
  distributionName: string;
  certificateName: string;
}
export interface AttachCertificateToDistributionResult {
  operation?: Operation;
}
export interface AttachDiskRequest {
  diskName: string;
  instanceName: string;
  diskPath: string;
  autoMounting?: boolean;
}
export interface AttachDiskResult {
  operations?: Operation[];
}
export type ResourceNameList = string[];
export interface AttachInstancesToLoadBalancerRequest {
  loadBalancerName: string;
  instanceNames: string[];
}
export interface AttachInstancesToLoadBalancerResult {
  operations?: Operation[];
}
export interface AttachLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
}
export interface AttachLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export interface AttachStaticIpRequest {
  staticIpName: string;
  instanceName: string;
}
export interface AttachStaticIpResult {
  operations?: Operation[];
}
export type Port = number;
export type NetworkProtocol =
  | "tcp"
  | "all"
  | "udp"
  | "icmp"
  | "icmpv6"
  | (string & {});
export type StringList = string[];
export interface PortInfo {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export interface CloseInstancePublicPortsRequest {
  portInfo: PortInfo;
  instanceName: string;
}
export interface CloseInstancePublicPortsResult {
  operation?: Operation;
}
export interface CopySnapshotRequest {
  sourceSnapshotName?: string;
  sourceResourceName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
  targetSnapshotName: string;
  sourceRegion: RegionName;
}
export interface CopySnapshotResult {
  operations?: Operation[];
}
export type BucketName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export type TagList = Tag[];
export interface CreateBucketRequest {
  bucketName: string;
  bundleId: string;
  tags?: Tag[];
  enableObjectVersioning?: boolean;
}
export type AccessType = "public" | "private" | (string & {});
export interface AccessRules {
  getObject?: AccessType;
  allowPublicOverrides?: boolean;
}
export type PartnerIdList = string[];
export interface ResourceReceivingAccess {
  name?: string;
  resourceType?: string;
}
export type AccessReceiverList = ResourceReceivingAccess[];
export interface BucketState {
  code?: string;
  message?: string;
}
export type BucketAccessLogPrefix = string;
export interface BucketAccessLogConfig {
  enabled: boolean;
  destination?: string;
  prefix?: string;
}
export type BucketCorsRuleId = string;
export type BucketCorsAllowedMethod = string;
export type BucketCorsAllowedMethods = string[];
export type BucketCorsAllowedOrigins = string[];
export type BucketCorsAllowedHeaders = string[];
export type BucketCorsExposeHeaders = string[];
export interface BucketCorsRule {
  id?: string;
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders?: string[];
  exposeHeaders?: string[];
  maxAgeSeconds?: number;
}
export type BucketCorsRules = BucketCorsRule[];
export interface BucketCorsConfig {
  rules?: BucketCorsRule[];
}
export interface Bucket {
  resourceType?: string;
  accessRules?: AccessRules;
  arn?: string;
  bundleId?: string;
  createdAt?: Date;
  url?: string;
  location?: ResourceLocation;
  name?: string;
  supportCode?: string;
  tags?: Tag[];
  objectVersioning?: string;
  ableToUpdateBundle?: boolean;
  readonlyAccessAccounts?: string[];
  resourcesReceivingAccess?: ResourceReceivingAccess[];
  state?: BucketState;
  accessLogConfig?: BucketAccessLogConfig;
  cors?: BucketCorsConfig;
}
export interface CreateBucketResult {
  bucket?: Bucket;
  operations?: Operation[];
}
export interface CreateBucketAccessKeyRequest {
  bucketName: string;
}
export type IAMAccessKeyId = string | redacted.Redacted<string>;
export type StatusType = "Active" | "Inactive" | (string & {});
export interface AccessKeyLastUsed {
  lastUsedDate?: Date;
  region?: string;
  serviceName?: string;
}
export interface AccessKey {
  accessKeyId?: string | redacted.Redacted<string>;
  secretAccessKey?: string;
  status?: StatusType;
  createdAt?: Date;
  lastUsed?: AccessKeyLastUsed;
}
export interface CreateBucketAccessKeyResult {
  accessKey?: AccessKey;
  operations?: Operation[];
}
export type CertificateName = string;
export type DomainName = string;
export type SubjectAlternativeNameList = string[];
export interface CreateCertificateRequest {
  certificateName: string;
  domainName: string;
  subjectAlternativeNames?: string[];
  tags?: Tag[];
}
export type CertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | (string & {});
export type SerialNumber = string;
export interface ResourceRecord {
  name?: string;
  type?: string;
  value?: string;
}
export type DnsRecordCreationStateCode =
  | "SUCCEEDED"
  | "STARTED"
  | "FAILED"
  | (string & {});
export interface DnsRecordCreationState {
  code?: DnsRecordCreationStateCode;
  message?: string;
}
export type CertificateDomainValidationStatus =
  | "PENDING_VALIDATION"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export interface DomainValidationRecord {
  domainName?: string;
  resourceRecord?: ResourceRecord;
  dnsRecordCreationState?: DnsRecordCreationState;
  validationStatus?: CertificateDomainValidationStatus;
}
export type DomainValidationRecordList = DomainValidationRecord[];
export type RequestFailureReason = string;
export type InUseResourceCount = number;
export type KeyAlgorithm = string;
export type IssuerCA = string;
export type EligibleToRenew = string;
export type RenewalStatus =
  | "PendingAutoRenewal"
  | "PendingValidation"
  | "Success"
  | "Failed"
  | (string & {});
export type RenewalStatusReason = string;
export interface RenewalSummary {
  domainValidationRecords?: DomainValidationRecord[];
  renewalStatus?: RenewalStatus;
  renewalStatusReason?: string;
  updatedAt?: Date;
}
export type RevocationReason = string;
export interface Certificate {
  arn?: string;
  name?: string;
  domainName?: string;
  status?: CertificateStatus;
  serialNumber?: string;
  subjectAlternativeNames?: string[];
  domainValidationRecords?: DomainValidationRecord[];
  requestFailureReason?: string;
  inUseResourceCount?: number;
  keyAlgorithm?: string;
  createdAt?: Date;
  issuedAt?: Date;
  issuerCA?: string;
  notBefore?: Date;
  notAfter?: Date;
  eligibleToRenew?: string;
  renewalSummary?: RenewalSummary;
  revokedAt?: Date;
  revocationReason?: string;
  tags?: Tag[];
  supportCode?: string;
}
export interface CertificateSummary {
  certificateArn?: string;
  certificateName?: string;
  domainName?: string;
  certificateDetail?: Certificate;
  tags?: Tag[];
}
export interface CreateCertificateResult {
  certificate?: CertificateSummary;
  operations?: Operation[];
}
export type PortInfoSourceType =
  | "DEFAULT"
  | "INSTANCE"
  | "NONE"
  | "CLOSED"
  | (string & {});
export interface InstanceEntry {
  sourceName: string;
  instanceType: string;
  portInfoSource: PortInfoSourceType;
  userData?: string;
  availabilityZone: string;
}
export type InstanceEntryList = InstanceEntry[];
export interface CreateCloudFormationStackRequest {
  instances: InstanceEntry[];
}
export interface CreateCloudFormationStackResult {
  operations?: Operation[];
}
export type ContactProtocol = "Email" | "SMS" | (string & {});
export type StringMax256 = string;
export interface CreateContactMethodRequest {
  protocol: ContactProtocol;
  contactEndpoint: string;
  tags?: Tag[];
}
export interface CreateContactMethodResult {
  operations?: Operation[];
}
export type ContainerServiceName = string;
export type ContainerServicePowerName =
  | "nano"
  | "micro"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | (string & {});
export type ContainerServiceScale = number;
export type ContainerServicePublicDomainsList = string[];
export type ContainerServicePublicDomains = {
  [key: string]: string[] | undefined;
};
export type ContainerName = string;
export type Environment = { [key: string]: string | undefined };
export type ContainerServiceProtocol =
  | "HTTP"
  | "HTTPS"
  | "TCP"
  | "UDP"
  | (string & {});
export type PortMap = { [key: string]: ContainerServiceProtocol | undefined };
export interface Container {
  image?: string;
  command?: string[];
  environment?: { [key: string]: string | undefined };
  ports?: { [key: string]: ContainerServiceProtocol | undefined };
}
export type ContainerMap = { [key: string]: Container | undefined };
export interface ContainerServiceHealthCheckConfig {
  healthyThreshold?: number;
  unhealthyThreshold?: number;
  timeoutSeconds?: number;
  intervalSeconds?: number;
  path?: string;
  successCodes?: string;
}
export interface EndpointRequest {
  containerName: string;
  containerPort: number;
  healthCheck?: ContainerServiceHealthCheckConfig;
}
export interface ContainerServiceDeploymentRequest {
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: EndpointRequest;
}
export interface ContainerServiceECRImagePullerRoleRequest {
  isActive?: boolean;
}
export interface PrivateRegistryAccessRequest {
  ecrImagePullerRole?: ContainerServiceECRImagePullerRoleRequest;
}
export interface CreateContainerServiceRequest {
  serviceName: string;
  power: ContainerServicePowerName;
  scale: number;
  tags?: Tag[];
  publicDomainNames?: { [key: string]: string[] | undefined };
  deployment?: ContainerServiceDeploymentRequest;
  privateRegistryAccess?: PrivateRegistryAccessRequest;
}
export type ContainerServiceState =
  | "PENDING"
  | "READY"
  | "RUNNING"
  | "UPDATING"
  | "DELETING"
  | "DISABLED"
  | "DEPLOYING"
  | (string & {});
export type ContainerServiceStateDetailCode =
  | "CREATING_SYSTEM_RESOURCES"
  | "CREATING_NETWORK_INFRASTRUCTURE"
  | "PROVISIONING_CERTIFICATE"
  | "PROVISIONING_SERVICE"
  | "CREATING_DEPLOYMENT"
  | "EVALUATING_HEALTH_CHECK"
  | "ACTIVATING_DEPLOYMENT"
  | "CERTIFICATE_LIMIT_EXCEEDED"
  | "UNKNOWN_ERROR"
  | (string & {});
export interface ContainerServiceStateDetail {
  code?: ContainerServiceStateDetailCode;
  message?: string;
}
export type ContainerServiceDeploymentState =
  | "ACTIVATING"
  | "ACTIVE"
  | "INACTIVE"
  | "FAILED"
  | (string & {});
export interface ContainerServiceEndpoint {
  containerName?: string;
  containerPort?: number;
  healthCheck?: ContainerServiceHealthCheckConfig;
}
export interface ContainerServiceDeployment {
  version?: number;
  state?: ContainerServiceDeploymentState;
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: ContainerServiceEndpoint;
  createdAt?: Date;
}
export interface ContainerServiceECRImagePullerRole {
  isActive?: boolean;
  principalArn?: string;
}
export interface PrivateRegistryAccess {
  ecrImagePullerRole?: ContainerServiceECRImagePullerRole;
}
export interface ContainerService {
  containerServiceName?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  power?: ContainerServicePowerName;
  powerId?: string;
  state?: ContainerServiceState;
  stateDetail?: ContainerServiceStateDetail;
  scale?: number;
  currentDeployment?: ContainerServiceDeployment;
  nextDeployment?: ContainerServiceDeployment;
  isDisabled?: boolean;
  principalArn?: string;
  privateDomainName?: string;
  publicDomainNames?: { [key: string]: string[] | undefined };
  url?: string;
  privateRegistryAccess?: PrivateRegistryAccess;
}
export interface CreateContainerServiceResult {
  containerService?: ContainerService;
}
export interface CreateContainerServiceDeploymentRequest {
  serviceName: string;
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: EndpointRequest;
}
export interface CreateContainerServiceDeploymentResult {
  containerService?: ContainerService;
}
export interface CreateContainerServiceRegistryLoginRequest {}
export interface ContainerServiceRegistryLogin {
  username?: string;
  password?: string;
  expiresAt?: Date;
  registry?: string;
}
export interface CreateContainerServiceRegistryLoginResult {
  registryLogin?: ContainerServiceRegistryLogin;
}
export type AddOnType = "AutoSnapshot" | "StopInstanceOnIdle" | (string & {});
export type TimeOfDay = string;
export interface AutoSnapshotAddOnRequest {
  snapshotTimeOfDay?: string;
}
export interface StopInstanceOnIdleRequest {
  threshold?: string;
  duration?: string;
}
export interface AddOnRequest {
  addOnType: AddOnType;
  autoSnapshotAddOnRequest?: AutoSnapshotAddOnRequest;
  stopInstanceOnIdleRequest?: StopInstanceOnIdleRequest;
}
export type AddOnRequestList = AddOnRequest[];
export interface CreateDiskRequest {
  diskName: string;
  availabilityZone: string;
  sizeInGb: number;
  tags?: Tag[];
  addOns?: AddOnRequest[];
}
export interface CreateDiskResult {
  operations?: Operation[];
}
export interface CreateDiskFromSnapshotRequest {
  diskName: string;
  diskSnapshotName?: string;
  availabilityZone: string;
  sizeInGb: number;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  sourceDiskName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
}
export interface CreateDiskFromSnapshotResult {
  operations?: Operation[];
}
export interface CreateDiskSnapshotRequest {
  diskName?: string;
  diskSnapshotName: string;
  instanceName?: string;
  tags?: Tag[];
}
export interface CreateDiskSnapshotResult {
  operations?: Operation[];
}
export type OriginProtocolPolicyEnum =
  | "http-only"
  | "https-only"
  | (string & {});
export type OriginIpAddressTypeEnum =
  | "ipv4"
  | "ipv6"
  | "dualstack"
  | (string & {});
export interface InputOrigin {
  name?: string;
  regionName?: RegionName;
  protocolPolicy?: OriginProtocolPolicyEnum;
  responseTimeout?: number;
  ipAddressType?: OriginIpAddressTypeEnum;
}
export type BehaviorEnum = "dont-cache" | "cache" | (string & {});
export interface CacheBehavior {
  behavior?: BehaviorEnum;
}
export type ForwardValues = "none" | "allow-list" | "all" | (string & {});
export interface CookieObject {
  option?: ForwardValues;
  cookiesAllowList?: string[];
}
export type HeaderEnum =
  | "Accept"
  | "Accept-Charset"
  | "Accept-Datetime"
  | "Accept-Encoding"
  | "Accept-Language"
  | "Authorization"
  | "CloudFront-Forwarded-Proto"
  | "CloudFront-Is-Desktop-Viewer"
  | "CloudFront-Is-Mobile-Viewer"
  | "CloudFront-Is-SmartTV-Viewer"
  | "CloudFront-Is-Tablet-Viewer"
  | "CloudFront-Viewer-Country"
  | "Host"
  | "Origin"
  | "Referer"
  | (string & {});
export type HeaderForwardList = HeaderEnum[];
export interface HeaderObject {
  option?: ForwardValues;
  headersAllowList?: HeaderEnum[];
}
export interface QueryStringObject {
  option?: boolean;
  queryStringsAllowList?: string[];
}
export interface CacheSettings {
  defaultTTL?: number;
  minimumTTL?: number;
  maximumTTL?: number;
  allowedHTTPMethods?: string;
  cachedHTTPMethods?: string;
  forwardedCookies?: CookieObject;
  forwardedHeaders?: HeaderObject;
  forwardedQueryStrings?: QueryStringObject;
}
export interface CacheBehaviorPerPath {
  path?: string;
  behavior?: BehaviorEnum;
}
export type CacheBehaviorList = CacheBehaviorPerPath[];
export type IpAddressType = "dualstack" | "ipv4" | "ipv6" | (string & {});
export type ViewerMinimumTlsProtocolVersionEnum =
  | "TLSv1.1_2016"
  | "TLSv1.2_2018"
  | "TLSv1.2_2019"
  | "TLSv1.2_2021"
  | (string & {});
export interface CreateDistributionRequest {
  distributionName: string;
  origin: InputOrigin;
  defaultCacheBehavior: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  bundleId: string;
  ipAddressType?: IpAddressType;
  tags?: Tag[];
  certificateName?: string;
  viewerMinimumTlsProtocolVersion?: ViewerMinimumTlsProtocolVersionEnum;
}
export interface Origin {
  name?: string;
  resourceType?: ResourceType;
  regionName?: RegionName;
  protocolPolicy?: OriginProtocolPolicyEnum;
  responseTimeout?: number;
  ipAddressType?: OriginIpAddressTypeEnum;
}
export interface LightsailDistribution {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  alternativeDomainNames?: string[];
  status?: string;
  isEnabled?: boolean;
  domainName?: string;
  bundleId?: string;
  certificateName?: string;
  origin?: Origin;
  originPublicDNS?: string;
  defaultCacheBehavior?: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  ableToUpdateBundle?: boolean;
  ipAddressType?: IpAddressType;
  tags?: Tag[];
  viewerMinimumTlsProtocolVersion?: string;
}
export interface CreateDistributionResult {
  distribution?: LightsailDistribution;
  operation?: Operation;
}
export interface CreateDomainRequest {
  domainName: string;
  tags?: Tag[];
}
export interface CreateDomainResult {
  operation?: Operation;
}
export type DomainEntryType = string;
export type DomainEntryOptionsKeys = string;
export type DomainEntryOptions = { [key: string]: string | undefined };
export interface DomainEntry {
  id?: string;
  name?: string;
  target?: string;
  isAlias?: boolean;
  type?: string;
  options?: { [key: string]: string | undefined };
}
export interface CreateDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export interface CreateDomainEntryResult {
  operation?: Operation;
}
export interface CreateGUISessionAccessDetailsRequest {
  resourceName: string;
}
export type Status =
  | "startExpired"
  | "notStarted"
  | "started"
  | "starting"
  | "stopped"
  | "stopping"
  | "settingUpInstance"
  | "failedInstanceCreation"
  | "failedStartingGUISession"
  | "failedStoppingGUISession"
  | (string & {});
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export interface Session {
  name?: string;
  url?: string | redacted.Redacted<string>;
  isPrimary?: boolean;
}
export type Sessions = Session[];
export interface CreateGUISessionAccessDetailsResult {
  resourceName?: string;
  status?: Status;
  percentageComplete?: number;
  failureReason?: string;
  sessions?: Session[];
}
export interface CreateInstancesRequest {
  instanceNames: string[];
  availabilityZone: string;
  customImageName?: string;
  blueprintId: string;
  bundleId: string;
  userData?: string;
  keyPairName?: string;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  ipAddressType?: IpAddressType;
}
export interface CreateInstancesResult {
  operations?: Operation[];
}
export interface DiskMap {
  originalDiskPath?: string;
  newDiskName?: string;
}
export type DiskMapList = DiskMap[];
export type AttachedDiskMap = { [key: string]: DiskMap[] | undefined };
export interface CreateInstancesFromSnapshotRequest {
  instanceNames: string[];
  attachedDiskMapping?: { [key: string]: DiskMap[] | undefined };
  availabilityZone: string;
  instanceSnapshotName?: string;
  bundleId: string;
  userData?: string;
  keyPairName?: string;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  ipAddressType?: IpAddressType;
  sourceInstanceName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
}
export interface CreateInstancesFromSnapshotResult {
  operations?: Operation[];
}
export interface CreateInstanceSnapshotRequest {
  instanceSnapshotName: string;
  instanceName: string;
  tags?: Tag[];
}
export interface CreateInstanceSnapshotResult {
  operations?: Operation[];
}
export interface CreateKeyPairRequest {
  keyPairName: string;
  tags?: Tag[];
}
export type Base64 = string;
export interface KeyPair {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  fingerprint?: string;
}
export interface CreateKeyPairResult {
  keyPair?: KeyPair;
  publicKeyBase64?: string;
  privateKeyBase64?: string;
  operation?: Operation;
}
export type DomainNameList = string[];
export interface CreateLoadBalancerRequest {
  loadBalancerName: string;
  instancePort: number;
  healthCheckPath?: string;
  certificateName?: string;
  certificateDomainName?: string;
  certificateAlternativeNames?: string[];
  tags?: Tag[];
  ipAddressType?: IpAddressType;
  tlsPolicyName?: string;
}
export interface CreateLoadBalancerResult {
  operations?: Operation[];
}
export interface CreateLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
  certificateDomainName: string;
  certificateAlternativeNames?: string[];
  tags?: Tag[];
}
export interface CreateLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface CreateRelationalDatabaseRequest {
  relationalDatabaseName: string;
  availabilityZone?: string;
  relationalDatabaseBlueprintId: string;
  relationalDatabaseBundleId: string;
  masterDatabaseName: string;
  masterUsername: string;
  masterUserPassword?: string | redacted.Redacted<string>;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  publiclyAccessible?: boolean;
  tags?: Tag[];
}
export interface CreateRelationalDatabaseResult {
  operations?: Operation[];
}
export interface CreateRelationalDatabaseFromSnapshotRequest {
  relationalDatabaseName: string;
  availabilityZone?: string;
  publiclyAccessible?: boolean;
  relationalDatabaseSnapshotName?: string;
  relationalDatabaseBundleId?: string;
  sourceRelationalDatabaseName?: string;
  restoreTime?: Date;
  useLatestRestorableTime?: boolean;
  tags?: Tag[];
}
export interface CreateRelationalDatabaseFromSnapshotResult {
  operations?: Operation[];
}
export interface CreateRelationalDatabaseSnapshotRequest {
  relationalDatabaseName: string;
  relationalDatabaseSnapshotName: string;
  tags?: Tag[];
}
export interface CreateRelationalDatabaseSnapshotResult {
  operations?: Operation[];
}
export interface DeleteAlarmRequest {
  alarmName: string;
}
export interface DeleteAlarmResult {
  operations?: Operation[];
}
export type AutoSnapshotDate = string;
export interface DeleteAutoSnapshotRequest {
  resourceName: string;
  date: string;
}
export interface DeleteAutoSnapshotResult {
  operations?: Operation[];
}
export interface DeleteBucketRequest {
  bucketName: string;
  forceDelete?: boolean;
}
export interface DeleteBucketResult {
  operations?: Operation[];
}
export interface DeleteBucketAccessKeyRequest {
  bucketName: string;
  accessKeyId: string;
}
export interface DeleteBucketAccessKeyResult {
  operations?: Operation[];
}
export interface DeleteCertificateRequest {
  certificateName: string;
}
export interface DeleteCertificateResult {
  operations?: Operation[];
}
export interface DeleteContactMethodRequest {
  protocol: ContactProtocol;
}
export interface DeleteContactMethodResult {
  operations?: Operation[];
}
export interface DeleteContainerImageRequest {
  serviceName: string;
  image: string;
}
export interface DeleteContainerImageResult {}
export interface DeleteContainerServiceRequest {
  serviceName: string;
}
export interface DeleteContainerServiceResult {}
export interface DeleteDiskRequest {
  diskName: string;
  forceDeleteAddOns?: boolean;
}
export interface DeleteDiskResult {
  operations?: Operation[];
}
export interface DeleteDiskSnapshotRequest {
  diskSnapshotName: string;
}
export interface DeleteDiskSnapshotResult {
  operations?: Operation[];
}
export interface DeleteDistributionRequest {
  distributionName?: string;
}
export interface DeleteDistributionResult {
  operation?: Operation;
}
export interface DeleteDomainRequest {
  domainName: string;
}
export interface DeleteDomainResult {
  operation?: Operation;
}
export interface DeleteDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export interface DeleteDomainEntryResult {
  operation?: Operation;
}
export interface DeleteInstanceRequest {
  instanceName: string;
  forceDeleteAddOns?: boolean;
}
export interface DeleteInstanceResult {
  operations?: Operation[];
}
export interface DeleteInstanceSnapshotRequest {
  instanceSnapshotName: string;
}
export interface DeleteInstanceSnapshotResult {
  operations?: Operation[];
}
export interface DeleteKeyPairRequest {
  keyPairName: string;
  expectedFingerprint?: string;
}
export interface DeleteKeyPairResult {
  operation?: Operation;
}
export interface DeleteKnownHostKeysRequest {
  instanceName: string;
}
export interface DeleteKnownHostKeysResult {
  operations?: Operation[];
}
export interface DeleteLoadBalancerRequest {
  loadBalancerName: string;
}
export interface DeleteLoadBalancerResult {
  operations?: Operation[];
}
export interface DeleteLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
  force?: boolean;
}
export interface DeleteLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export interface DeleteRelationalDatabaseRequest {
  relationalDatabaseName: string;
  skipFinalSnapshot?: boolean;
  finalRelationalDatabaseSnapshotName?: string;
}
export interface DeleteRelationalDatabaseResult {
  operations?: Operation[];
}
export interface DeleteRelationalDatabaseSnapshotRequest {
  relationalDatabaseSnapshotName: string;
}
export interface DeleteRelationalDatabaseSnapshotResult {
  operations?: Operation[];
}
export interface DetachCertificateFromDistributionRequest {
  distributionName: string;
}
export interface DetachCertificateFromDistributionResult {
  operation?: Operation;
}
export interface DetachDiskRequest {
  diskName: string;
}
export interface DetachDiskResult {
  operations?: Operation[];
}
export interface DetachInstancesFromLoadBalancerRequest {
  loadBalancerName: string;
  instanceNames: string[];
}
export interface DetachInstancesFromLoadBalancerResult {
  operations?: Operation[];
}
export interface DetachStaticIpRequest {
  staticIpName: string;
}
export interface DetachStaticIpResult {
  operations?: Operation[];
}
export interface DisableAddOnRequest {
  addOnType: AddOnType;
  resourceName: string;
}
export interface DisableAddOnResult {
  operations?: Operation[];
}
export interface DownloadDefaultKeyPairRequest {}
export interface DownloadDefaultKeyPairResult {
  publicKeyBase64?: string;
  privateKeyBase64?: string;
  createdAt?: Date;
}
export interface EnableAddOnRequest {
  resourceName: string;
  addOnRequest: AddOnRequest;
}
export interface EnableAddOnResult {
  operations?: Operation[];
}
export interface ExportSnapshotRequest {
  sourceSnapshotName: string;
}
export interface ExportSnapshotResult {
  operations?: Operation[];
}
export interface GetActiveNamesRequest {
  pageToken?: string;
}
export interface GetActiveNamesResult {
  activeNames?: string[];
  nextPageToken?: string;
}
export interface GetAlarmsRequest {
  alarmName?: string;
  pageToken?: string;
  monitoredResourceName?: string;
}
export type ResourceArn = string;
export interface MonitoredResourceInfo {
  arn?: string;
  name?: string;
  resourceType?: ResourceType;
}
export type ComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export type MetricPeriod = number;
export type TreatMissingData =
  | "breaching"
  | "notBreaching"
  | "ignore"
  | "missing"
  | (string & {});
export type MetricStatistic =
  | "Minimum"
  | "Maximum"
  | "Sum"
  | "Average"
  | "SampleCount"
  | (string & {});
export type MetricName =
  | "CPUUtilization"
  | "NetworkIn"
  | "NetworkOut"
  | "StatusCheckFailed"
  | "StatusCheckFailed_Instance"
  | "StatusCheckFailed_System"
  | "ClientTLSNegotiationErrorCount"
  | "HealthyHostCount"
  | "UnhealthyHostCount"
  | "HTTPCode_LB_4XX_Count"
  | "HTTPCode_LB_5XX_Count"
  | "HTTPCode_Instance_2XX_Count"
  | "HTTPCode_Instance_3XX_Count"
  | "HTTPCode_Instance_4XX_Count"
  | "HTTPCode_Instance_5XX_Count"
  | "InstanceResponseTime"
  | "RejectedConnectionCount"
  | "RequestCount"
  | "DatabaseConnections"
  | "DiskQueueDepth"
  | "FreeStorageSpace"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | "BurstCapacityTime"
  | "BurstCapacityPercentage"
  | (string & {});
export type AlarmState = "OK" | "ALARM" | "INSUFFICIENT_DATA" | (string & {});
export type MetricUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export type ContactProtocolsList = ContactProtocol[];
export type NotificationTriggerList = AlarmState[];
export interface Alarm {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  supportCode?: string;
  monitoredResourceInfo?: MonitoredResourceInfo;
  comparisonOperator?: ComparisonOperator;
  evaluationPeriods?: number;
  period?: number;
  threshold?: number;
  datapointsToAlarm?: number;
  treatMissingData?: TreatMissingData;
  statistic?: MetricStatistic;
  metricName?: MetricName;
  state?: AlarmState;
  unit?: MetricUnit;
  contactProtocols?: ContactProtocol[];
  notificationTriggers?: AlarmState[];
  notificationEnabled?: boolean;
  tags?: Tag[];
}
export type AlarmsList = Alarm[];
export interface GetAlarmsResult {
  alarms?: Alarm[];
  nextPageToken?: string;
}
export interface GetAutoSnapshotsRequest {
  resourceName: string;
}
export type AutoSnapshotStatus =
  | "Success"
  | "Failed"
  | "InProgress"
  | "NotFound"
  | (string & {});
export interface AttachedDisk {
  path?: string;
  sizeInGb?: number;
}
export type AttachedDiskList = AttachedDisk[];
export interface AutoSnapshotDetails {
  date?: string;
  createdAt?: Date;
  status?: AutoSnapshotStatus;
  fromAttachedDisks?: AttachedDisk[];
}
export type AutoSnapshotDetailsList = AutoSnapshotDetails[];
export interface GetAutoSnapshotsResult {
  resourceName?: string;
  resourceType?: ResourceType;
  autoSnapshots?: AutoSnapshotDetails[];
}
export type AppCategory = "LfR" | (string & {});
export interface GetBlueprintsRequest {
  includeInactive?: boolean;
  pageToken?: string;
  appCategory?: AppCategory;
}
export type BlueprintType = "os" | "app" | (string & {});
export type InstancePlatform = "LINUX_UNIX" | "WINDOWS" | (string & {});
export interface Blueprint {
  blueprintId?: string;
  name?: string;
  group?: string;
  type?: BlueprintType;
  description?: string;
  isActive?: boolean;
  minPower?: number;
  version?: string;
  versionCode?: string;
  productUrl?: string;
  licenseUrl?: string;
  platform?: InstancePlatform;
  appCategory?: AppCategory;
}
export type BlueprintList = Blueprint[];
export interface GetBlueprintsResult {
  blueprints?: Blueprint[];
  nextPageToken?: string;
}
export interface GetBucketAccessKeysRequest {
  bucketName: string;
}
export type AccessKeyList = AccessKey[];
export interface GetBucketAccessKeysResult {
  accessKeys?: AccessKey[];
}
export interface GetBucketBundlesRequest {
  includeInactive?: boolean;
}
export interface BucketBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  storagePerMonthInGb?: number;
  transferPerMonthInGb?: number;
  isActive?: boolean;
}
export type BucketBundleList = BucketBundle[];
export interface GetBucketBundlesResult {
  bundles?: BucketBundle[];
}
export type BucketMetricName =
  | "BucketSizeBytes"
  | "NumberOfObjects"
  | (string & {});
export type MetricStatisticList = MetricStatistic[];
export interface GetBucketMetricDataRequest {
  bucketName: string;
  metricName: BucketMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  statistics: MetricStatistic[];
  unit: MetricUnit;
}
export interface MetricDatapoint {
  average?: number;
  maximum?: number;
  minimum?: number;
  sampleCount?: number;
  sum?: number;
  timestamp?: Date;
  unit?: MetricUnit;
}
export type MetricDatapointList = MetricDatapoint[];
export interface GetBucketMetricDataResult {
  metricName?: BucketMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetBucketsRequest {
  bucketName?: string;
  pageToken?: string;
  includeConnectedResources?: boolean;
  includeCors?: boolean;
}
export type BucketList = Bucket[];
export type AccountLevelBpaSyncStatus =
  | "InSync"
  | "Failed"
  | "NeverSynced"
  | "Defaulted"
  | (string & {});
export type BPAStatusMessage =
  | "DEFAULTED_FOR_SLR_MISSING"
  | "SYNC_ON_HOLD"
  | "DEFAULTED_FOR_SLR_MISSING_ON_HOLD"
  | "Unknown"
  | (string & {});
export interface AccountLevelBpaSync {
  status?: AccountLevelBpaSyncStatus;
  lastSyncedAt?: Date;
  message?: BPAStatusMessage;
  bpaImpactsLightsail?: boolean;
}
export interface GetBucketsResult {
  buckets?: Bucket[];
  nextPageToken?: string;
  accountLevelBpaSync?: AccountLevelBpaSync;
}
export interface GetBundlesRequest {
  includeInactive?: boolean;
  pageToken?: string;
  appCategory?: AppCategory;
}
export type InstancePlatformList = InstancePlatform[];
export type AppCategoryList = AppCategory[];
export interface Bundle {
  price?: number;
  cpuCount?: number;
  diskSizeInGb?: number;
  bundleId?: string;
  instanceType?: string;
  isActive?: boolean;
  name?: string;
  power?: number;
  ramSizeInGb?: number;
  transferPerMonthInGb?: number;
  supportedPlatforms?: InstancePlatform[];
  supportedAppCategories?: AppCategory[];
  publicIpv4AddressCount?: number;
}
export type BundleList = Bundle[];
export interface GetBundlesResult {
  bundles?: Bundle[];
  nextPageToken?: string;
}
export type CertificateStatusList = CertificateStatus[];
export type IncludeCertificateDetails = boolean;
export interface GetCertificatesRequest {
  certificateStatuses?: CertificateStatus[];
  includeCertificateDetails?: boolean;
  certificateName?: string;
  pageToken?: string;
}
export type CertificateSummaryList = CertificateSummary[];
export interface GetCertificatesResult {
  certificates?: CertificateSummary[];
  nextPageToken?: string;
}
export interface GetCloudFormationStackRecordsRequest {
  pageToken?: string;
}
export type RecordState = "Started" | "Succeeded" | "Failed" | (string & {});
export type CloudFormationStackRecordSourceType =
  | "ExportSnapshotRecord"
  | (string & {});
export interface CloudFormationStackRecordSourceInfo {
  resourceType?: CloudFormationStackRecordSourceType;
  name?: string;
  arn?: string;
}
export type CloudFormationStackRecordSourceInfoList =
  CloudFormationStackRecordSourceInfo[];
export interface DestinationInfo {
  id?: string;
  service?: string;
}
export interface CloudFormationStackRecord {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  state?: RecordState;
  sourceInfo?: CloudFormationStackRecordSourceInfo[];
  destinationInfo?: DestinationInfo;
}
export type CloudFormationStackRecordList = CloudFormationStackRecord[];
export interface GetCloudFormationStackRecordsResult {
  cloudFormationStackRecords?: CloudFormationStackRecord[];
  nextPageToken?: string;
}
export interface GetContactMethodsRequest {
  protocols?: ContactProtocol[];
}
export type ContactMethodStatus =
  | "PendingVerification"
  | "Valid"
  | "Invalid"
  | (string & {});
export interface ContactMethod {
  contactEndpoint?: string;
  status?: ContactMethodStatus;
  protocol?: ContactProtocol;
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  supportCode?: string;
  tags?: Tag[];
}
export type ContactMethodsList = ContactMethod[];
export interface GetContactMethodsResult {
  contactMethods?: ContactMethod[];
}
export interface GetContainerAPIMetadataRequest {}
export type ContainerServiceMetadataEntry = {
  [key: string]: string | undefined;
};
export type ContainerServiceMetadataEntryList = {
  [key: string]: string | undefined;
}[];
export interface GetContainerAPIMetadataResult {
  metadata?: { [key: string]: string | undefined }[];
}
export interface GetContainerImagesRequest {
  serviceName: string;
}
export interface ContainerImage {
  image?: string;
  digest?: string;
  createdAt?: Date;
}
export type ContainerImageList = ContainerImage[];
export interface GetContainerImagesResult {
  containerImages?: ContainerImage[];
}
export interface GetContainerLogRequest {
  serviceName: string;
  containerName: string;
  startTime?: Date;
  endTime?: Date;
  filterPattern?: string;
  pageToken?: string;
}
export interface ContainerServiceLogEvent {
  createdAt?: Date;
  message?: string;
}
export type ContainerServiceLogEventList = ContainerServiceLogEvent[];
export interface GetContainerLogResult {
  logEvents?: ContainerServiceLogEvent[];
  nextPageToken?: string;
}
export interface GetContainerServiceDeploymentsRequest {
  serviceName: string;
}
export type ContainerServiceDeploymentList = ContainerServiceDeployment[];
export interface GetContainerServiceDeploymentsResult {
  deployments?: ContainerServiceDeployment[];
}
export type ContainerServiceMetricName =
  | "CPUUtilization"
  | "MemoryUtilization"
  | (string & {});
export interface GetContainerServiceMetricDataRequest {
  serviceName: string;
  metricName: ContainerServiceMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  statistics: MetricStatistic[];
}
export interface GetContainerServiceMetricDataResult {
  metricName?: ContainerServiceMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetContainerServicePowersRequest {}
export interface ContainerServicePower {
  powerId?: string;
  price?: number;
  cpuCount?: number;
  ramSizeInGb?: number;
  name?: string;
  isActive?: boolean;
}
export type ContainerServicePowerList = ContainerServicePower[];
export interface GetContainerServicePowersResult {
  powers?: ContainerServicePower[];
}
export interface GetContainerServicesRequest {
  serviceName?: string;
}
export type ContainerServiceList = ContainerService[];
export interface ContainerServicesListResult {
  containerServices?: ContainerService[];
}
export interface GetCostEstimateRequest {
  resourceName: string;
  startTime: Date;
  endTime: Date;
}
export type PricingUnit =
  | "GB"
  | "Hrs"
  | "GB-Mo"
  | "Bundles"
  | "Queries"
  | (string & {});
export type Currency = "USD" | (string & {});
export interface TimePeriod {
  start?: Date;
  end?: Date;
}
export interface EstimateByTime {
  usageCost?: number;
  pricingUnit?: PricingUnit;
  unit?: number;
  currency?: Currency;
  timePeriod?: TimePeriod;
}
export type EstimatesByTime = EstimateByTime[];
export interface CostEstimate {
  usageType?: string;
  resultsByTime?: EstimateByTime[];
}
export type CostEstimates = CostEstimate[];
export interface ResourceBudgetEstimate {
  resourceName?: string;
  resourceType?: ResourceType;
  costEstimates?: CostEstimate[];
  startTime?: Date;
  endTime?: Date;
}
export type ResourcesBudgetEstimate = ResourceBudgetEstimate[];
export interface GetCostEstimateResult {
  resourcesBudgetEstimate?: ResourceBudgetEstimate[];
}
export interface GetDiskRequest {
  diskName: string;
}
export interface AddOn {
  name?: string;
  status?: string;
  snapshotTimeOfDay?: string;
  nextSnapshotTimeOfDay?: string;
  threshold?: string;
  duration?: string;
}
export type AddOnList = AddOn[];
export type DiskState =
  | "pending"
  | "error"
  | "available"
  | "in-use"
  | "unknown"
  | (string & {});
export type AutoMountStatus =
  | "Failed"
  | "Pending"
  | "Mounted"
  | "NotMounted"
  | (string & {});
export interface Disk {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  addOns?: AddOn[];
  sizeInGb?: number;
  isSystemDisk?: boolean;
  iops?: number;
  path?: string;
  state?: DiskState;
  attachedTo?: string;
  isAttached?: boolean;
  attachmentState?: string;
  gbInUse?: number;
  autoMountStatus?: AutoMountStatus;
}
export interface GetDiskResult {
  disk?: Disk;
}
export interface GetDisksRequest {
  pageToken?: string;
}
export type DiskList = Disk[];
export interface GetDisksResult {
  disks?: Disk[];
  nextPageToken?: string;
}
export interface GetDiskSnapshotRequest {
  diskSnapshotName: string;
}
export type DiskSnapshotState =
  | "pending"
  | "completed"
  | "error"
  | "unknown"
  | (string & {});
export interface DiskSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  sizeInGb?: number;
  state?: DiskSnapshotState;
  progress?: string;
  fromDiskName?: string;
  fromDiskArn?: string;
  fromInstanceName?: string;
  fromInstanceArn?: string;
  isFromAutoSnapshot?: boolean;
}
export interface GetDiskSnapshotResult {
  diskSnapshot?: DiskSnapshot;
}
export interface GetDiskSnapshotsRequest {
  pageToken?: string;
}
export type DiskSnapshotList = DiskSnapshot[];
export interface GetDiskSnapshotsResult {
  diskSnapshots?: DiskSnapshot[];
  nextPageToken?: string;
}
export interface GetDistributionBundlesRequest {}
export interface DistributionBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  transferPerMonthInGb?: number;
  isActive?: boolean;
}
export type DistributionBundleList = DistributionBundle[];
export interface GetDistributionBundlesResult {
  bundles?: DistributionBundle[];
}
export interface GetDistributionLatestCacheResetRequest {
  distributionName?: string;
}
export interface GetDistributionLatestCacheResetResult {
  status?: string;
  createTime?: Date;
}
export type DistributionMetricName =
  | "Requests"
  | "BytesDownloaded"
  | "BytesUploaded"
  | "TotalErrorRate"
  | "Http4xxErrorRate"
  | "Http5xxErrorRate"
  | (string & {});
export interface GetDistributionMetricDataRequest {
  distributionName: string;
  metricName: DistributionMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export interface GetDistributionMetricDataResult {
  metricName?: DistributionMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetDistributionsRequest {
  distributionName?: string;
  pageToken?: string;
}
export type DistributionList = LightsailDistribution[];
export interface GetDistributionsResult {
  distributions?: LightsailDistribution[];
  nextPageToken?: string;
}
export interface GetDomainRequest {
  domainName: string;
}
export type DomainEntryList = DomainEntry[];
export type NameServersUpdateStateCode =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "STARTED"
  | (string & {});
export interface NameServersUpdateState {
  code?: NameServersUpdateStateCode;
  message?: string;
}
export type R53HostedZoneDeletionStateCode =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "STARTED"
  | (string & {});
export interface R53HostedZoneDeletionState {
  code?: R53HostedZoneDeletionStateCode;
  message?: string;
}
export interface RegisteredDomainDelegationInfo {
  nameServersUpdateState?: NameServersUpdateState;
  r53HostedZoneDeletionState?: R53HostedZoneDeletionState;
}
export interface Domain {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  domainEntries?: DomainEntry[];
  registeredDomainDelegationInfo?: RegisteredDomainDelegationInfo;
}
export interface GetDomainResult {
  domain?: Domain;
}
export interface GetDomainsRequest {
  pageToken?: string;
}
export type DomainList = Domain[];
export interface GetDomainsResult {
  domains?: Domain[];
  nextPageToken?: string;
}
export interface GetExportSnapshotRecordsRequest {
  pageToken?: string;
}
export type ExportSnapshotRecordSourceType =
  | "InstanceSnapshot"
  | "DiskSnapshot"
  | (string & {});
export interface DiskInfo {
  name?: string;
  path?: string;
  sizeInGb?: number;
  isSystemDisk?: boolean;
}
export type DiskInfoList = DiskInfo[];
export interface InstanceSnapshotInfo {
  fromBundleId?: string;
  fromBlueprintId?: string;
  fromDiskInfo?: DiskInfo[];
}
export interface DiskSnapshotInfo {
  sizeInGb?: number;
}
export interface ExportSnapshotRecordSourceInfo {
  resourceType?: ExportSnapshotRecordSourceType;
  createdAt?: Date;
  name?: string;
  arn?: string;
  fromResourceName?: string;
  fromResourceArn?: string;
  instanceSnapshotInfo?: InstanceSnapshotInfo;
  diskSnapshotInfo?: DiskSnapshotInfo;
}
export interface ExportSnapshotRecord {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  state?: RecordState;
  sourceInfo?: ExportSnapshotRecordSourceInfo;
  destinationInfo?: DestinationInfo;
}
export type ExportSnapshotRecordList = ExportSnapshotRecord[];
export interface GetExportSnapshotRecordsResult {
  exportSnapshotRecords?: ExportSnapshotRecord[];
  nextPageToken?: string;
}
export interface GetInstanceRequest {
  instanceName: string;
}
export type IpAddress = string;
export type Ipv6Address = string;
export type Ipv6AddressList = string[];
export interface InstanceHardware {
  cpuCount?: number;
  disks?: Disk[];
  ramSizeInGb?: number;
}
export interface MonthlyTransfer {
  gbPerMonthAllocated?: number;
}
export type PortAccessType = "Public" | "Private" | (string & {});
export type AccessDirection = "inbound" | "outbound" | (string & {});
export interface InstancePortInfo {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  accessFrom?: string;
  accessType?: PortAccessType;
  commonName?: string;
  accessDirection?: AccessDirection;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export type InstancePortInfoList = InstancePortInfo[];
export interface InstanceNetworking {
  monthlyTransfer?: MonthlyTransfer;
  ports?: InstancePortInfo[];
}
export interface InstanceState {
  code?: number;
  name?: string;
}
export type InstanceMetadataState = "pending" | "applied" | (string & {});
export type HttpTokens = "optional" | "required" | (string & {});
export type HttpEndpoint = "disabled" | "enabled" | (string & {});
export type HttpProtocolIpv6 = "disabled" | "enabled" | (string & {});
export interface InstanceMetadataOptions {
  state?: InstanceMetadataState;
  httpTokens?: HttpTokens;
  httpEndpoint?: HttpEndpoint;
  httpPutResponseHopLimit?: number;
  httpProtocolIpv6?: HttpProtocolIpv6;
}
export interface Instance {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  blueprintId?: string;
  blueprintName?: string;
  bundleId?: string;
  addOns?: AddOn[];
  isStaticIp?: boolean;
  privateIpAddress?: string;
  publicIpAddress?: string;
  ipv6Addresses?: string[];
  ipAddressType?: IpAddressType;
  hardware?: InstanceHardware;
  networking?: InstanceNetworking;
  state?: InstanceState;
  username?: string;
  sshKeyName?: string;
  metadataOptions?: InstanceMetadataOptions;
}
export interface GetInstanceResult {
  instance?: Instance;
}
export type InstanceAccessProtocol = "ssh" | "rdp" | (string & {});
export interface GetInstanceAccessDetailsRequest {
  instanceName: string;
  protocol?: InstanceAccessProtocol;
}
export interface PasswordData {
  ciphertext?: string;
  keyPairName?: string;
}
export interface HostKeyAttributes {
  algorithm?: string;
  publicKey?: string;
  witnessedAt?: Date;
  fingerprintSHA1?: string;
  fingerprintSHA256?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
}
export type HostKeysList = HostKeyAttributes[];
export interface InstanceAccessDetails {
  certKey?: string;
  expiresAt?: Date;
  ipAddress?: string;
  ipv6Addresses?: string[];
  password?: string;
  passwordData?: PasswordData;
  privateKey?: string;
  protocol?: InstanceAccessProtocol;
  instanceName?: string;
  username?: string;
  hostKeys?: HostKeyAttributes[];
}
export interface GetInstanceAccessDetailsResult {
  accessDetails?: InstanceAccessDetails;
}
export type InstanceMetricName =
  | "CPUUtilization"
  | "NetworkIn"
  | "NetworkOut"
  | "StatusCheckFailed"
  | "StatusCheckFailed_Instance"
  | "StatusCheckFailed_System"
  | "BurstCapacityTime"
  | "BurstCapacityPercentage"
  | "MetadataNoToken"
  | (string & {});
export interface GetInstanceMetricDataRequest {
  instanceName: string;
  metricName: InstanceMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export interface GetInstanceMetricDataResult {
  metricName?: InstanceMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetInstancePortStatesRequest {
  instanceName: string;
}
export type PortState = "open" | "closed" | (string & {});
export interface InstancePortState {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  state?: PortState;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export type InstancePortStateList = InstancePortState[];
export interface GetInstancePortStatesResult {
  portStates?: InstancePortState[];
}
export interface GetInstancesRequest {
  pageToken?: string;
}
export type InstanceList = Instance[];
export interface GetInstancesResult {
  instances?: Instance[];
  nextPageToken?: string;
}
export interface GetInstanceSnapshotRequest {
  instanceSnapshotName: string;
}
export type InstanceSnapshotState =
  | "pending"
  | "error"
  | "available"
  | (string & {});
export interface InstanceSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  state?: InstanceSnapshotState;
  progress?: string;
  fromAttachedDisks?: Disk[];
  fromInstanceName?: string;
  fromInstanceArn?: string;
  fromBlueprintId?: string;
  fromBundleId?: string;
  isFromAutoSnapshot?: boolean;
  sizeInGb?: number;
}
export interface GetInstanceSnapshotResult {
  instanceSnapshot?: InstanceSnapshot;
}
export interface GetInstanceSnapshotsRequest {
  pageToken?: string;
}
export type InstanceSnapshotList = InstanceSnapshot[];
export interface GetInstanceSnapshotsResult {
  instanceSnapshots?: InstanceSnapshot[];
  nextPageToken?: string;
}
export interface GetInstanceStateRequest {
  instanceName: string;
}
export interface GetInstanceStateResult {
  state?: InstanceState;
}
export interface GetKeyPairRequest {
  keyPairName: string;
}
export interface GetKeyPairResult {
  keyPair?: KeyPair;
}
export interface GetKeyPairsRequest {
  pageToken?: string;
  includeDefaultKeyPair?: boolean;
}
export type KeyPairList = KeyPair[];
export interface GetKeyPairsResult {
  keyPairs?: KeyPair[];
  nextPageToken?: string;
}
export interface GetLoadBalancerRequest {
  loadBalancerName: string;
}
export type LoadBalancerState =
  | "active"
  | "provisioning"
  | "active_impaired"
  | "failed"
  | "unknown"
  | (string & {});
export type LoadBalancerProtocol = "HTTP_HTTPS" | "HTTP" | (string & {});
export type PortList = number[];
export type InstanceHealthState =
  | "initial"
  | "healthy"
  | "unhealthy"
  | "unused"
  | "draining"
  | "unavailable"
  | (string & {});
export type InstanceHealthReason =
  | "Lb.RegistrationInProgress"
  | "Lb.InitialHealthChecking"
  | "Lb.InternalError"
  | "Instance.ResponseCodeMismatch"
  | "Instance.Timeout"
  | "Instance.FailedHealthChecks"
  | "Instance.NotRegistered"
  | "Instance.NotInUse"
  | "Instance.DeregistrationInProgress"
  | "Instance.InvalidState"
  | "Instance.IpUnusable"
  | (string & {});
export interface InstanceHealthSummary {
  instanceName?: string;
  instanceHealth?: InstanceHealthState;
  instanceHealthReason?: InstanceHealthReason;
}
export type InstanceHealthSummaryList = InstanceHealthSummary[];
export interface LoadBalancerTlsCertificateSummary {
  name?: string;
  isAttached?: boolean;
}
export type LoadBalancerTlsCertificateSummaryList =
  LoadBalancerTlsCertificateSummary[];
export type LoadBalancerAttributeName =
  | "HealthCheckPath"
  | "SessionStickinessEnabled"
  | "SessionStickiness_LB_CookieDurationSeconds"
  | "HttpsRedirectionEnabled"
  | "TlsPolicyName"
  | (string & {});
export type LoadBalancerConfigurationOptions = {
  [key in LoadBalancerAttributeName]?: string;
};
export interface LoadBalancer {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  dnsName?: string;
  state?: LoadBalancerState;
  protocol?: LoadBalancerProtocol;
  publicPorts?: number[];
  healthCheckPath?: string;
  instancePort?: number;
  instanceHealthSummary?: InstanceHealthSummary[];
  tlsCertificateSummaries?: LoadBalancerTlsCertificateSummary[];
  configurationOptions?: { [key: string]: string | undefined };
  ipAddressType?: IpAddressType;
  httpsRedirectionEnabled?: boolean;
  tlsPolicyName?: string;
}
export interface GetLoadBalancerResult {
  loadBalancer?: LoadBalancer;
}
export type LoadBalancerMetricName =
  | "ClientTLSNegotiationErrorCount"
  | "HealthyHostCount"
  | "UnhealthyHostCount"
  | "HTTPCode_LB_4XX_Count"
  | "HTTPCode_LB_5XX_Count"
  | "HTTPCode_Instance_2XX_Count"
  | "HTTPCode_Instance_3XX_Count"
  | "HTTPCode_Instance_4XX_Count"
  | "HTTPCode_Instance_5XX_Count"
  | "InstanceResponseTime"
  | "RejectedConnectionCount"
  | "RequestCount"
  | (string & {});
export interface GetLoadBalancerMetricDataRequest {
  loadBalancerName: string;
  metricName: LoadBalancerMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export interface GetLoadBalancerMetricDataResult {
  metricName?: LoadBalancerMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetLoadBalancersRequest {
  pageToken?: string;
}
export type LoadBalancerList = LoadBalancer[];
export interface GetLoadBalancersResult {
  loadBalancers?: LoadBalancer[];
  nextPageToken?: string;
}
export interface GetLoadBalancerTlsCertificatesRequest {
  loadBalancerName: string;
}
export type LoadBalancerTlsCertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | "UNKNOWN"
  | (string & {});
export type LoadBalancerTlsCertificateDomainStatus =
  | "PENDING_VALIDATION"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export type LoadBalancerTlsCertificateDnsRecordCreationStateCode =
  | "SUCCEEDED"
  | "STARTED"
  | "FAILED"
  | (string & {});
export interface LoadBalancerTlsCertificateDnsRecordCreationState {
  code?: LoadBalancerTlsCertificateDnsRecordCreationStateCode;
  message?: string;
}
export interface LoadBalancerTlsCertificateDomainValidationRecord {
  name?: string;
  type?: string;
  value?: string;
  validationStatus?: LoadBalancerTlsCertificateDomainStatus;
  domainName?: string;
  dnsRecordCreationState?: LoadBalancerTlsCertificateDnsRecordCreationState;
}
export type LoadBalancerTlsCertificateDomainValidationRecordList =
  LoadBalancerTlsCertificateDomainValidationRecord[];
export type LoadBalancerTlsCertificateFailureReason =
  | "NO_AVAILABLE_CONTACTS"
  | "ADDITIONAL_VERIFICATION_REQUIRED"
  | "DOMAIN_NOT_ALLOWED"
  | "INVALID_PUBLIC_DOMAIN"
  | "OTHER"
  | (string & {});
export type LoadBalancerTlsCertificateRenewalStatus =
  | "PENDING_AUTO_RENEWAL"
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface LoadBalancerTlsCertificateDomainValidationOption {
  domainName?: string;
  validationStatus?: LoadBalancerTlsCertificateDomainStatus;
}
export type LoadBalancerTlsCertificateDomainValidationOptionList =
  LoadBalancerTlsCertificateDomainValidationOption[];
export interface LoadBalancerTlsCertificateRenewalSummary {
  renewalStatus?: LoadBalancerTlsCertificateRenewalStatus;
  domainValidationOptions?: LoadBalancerTlsCertificateDomainValidationOption[];
}
export type LoadBalancerTlsCertificateRevocationReason =
  | "UNSPECIFIED"
  | "KEY_COMPROMISE"
  | "CA_COMPROMISE"
  | "AFFILIATION_CHANGED"
  | "SUPERCEDED"
  | "CESSATION_OF_OPERATION"
  | "CERTIFICATE_HOLD"
  | "REMOVE_FROM_CRL"
  | "PRIVILEGE_WITHDRAWN"
  | "A_A_COMPROMISE"
  | (string & {});
export interface LoadBalancerTlsCertificate {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  loadBalancerName?: string;
  isAttached?: boolean;
  status?: LoadBalancerTlsCertificateStatus;
  domainName?: string;
  domainValidationRecords?: LoadBalancerTlsCertificateDomainValidationRecord[];
  failureReason?: LoadBalancerTlsCertificateFailureReason;
  issuedAt?: Date;
  issuer?: string;
  keyAlgorithm?: string;
  notAfter?: Date;
  notBefore?: Date;
  renewalSummary?: LoadBalancerTlsCertificateRenewalSummary;
  revocationReason?: LoadBalancerTlsCertificateRevocationReason;
  revokedAt?: Date;
  serial?: string;
  signatureAlgorithm?: string;
  subject?: string;
  subjectAlternativeNames?: string[];
}
export type LoadBalancerTlsCertificateList = LoadBalancerTlsCertificate[];
export interface GetLoadBalancerTlsCertificatesResult {
  tlsCertificates?: LoadBalancerTlsCertificate[];
}
export interface GetLoadBalancerTlsPoliciesRequest {
  pageToken?: string;
}
export interface LoadBalancerTlsPolicy {
  name?: string;
  isDefault?: boolean;
  description?: string;
  protocols?: string[];
  ciphers?: string[];
}
export type LoadBalancerTlsPolicyList = LoadBalancerTlsPolicy[];
export interface GetLoadBalancerTlsPoliciesResult {
  tlsPolicies?: LoadBalancerTlsPolicy[];
  nextPageToken?: string;
}
export interface GetOperationRequest {
  operationId: string;
}
export interface GetOperationResult {
  operation?: Operation;
}
export interface GetOperationsRequest {
  pageToken?: string;
}
export interface GetOperationsResult {
  operations?: Operation[];
  nextPageToken?: string;
}
export interface GetOperationsForResourceRequest {
  resourceName: string;
  pageToken?: string;
}
export interface GetOperationsForResourceResult {
  operations?: Operation[];
  nextPageCount?: string;
  nextPageToken?: string;
}
export interface GetRegionsRequest {
  includeAvailabilityZones?: boolean;
  includeRelationalDatabaseAvailabilityZones?: boolean;
}
export interface AvailabilityZone {
  zoneName?: string;
  state?: string;
}
export type AvailabilityZoneList = AvailabilityZone[];
export interface Region {
  continentCode?: string;
  description?: string;
  displayName?: string;
  name?: RegionName;
  availabilityZones?: AvailabilityZone[];
  relationalDatabaseAvailabilityZones?: AvailabilityZone[];
}
export type RegionList = Region[];
export interface GetRegionsResult {
  regions?: Region[];
}
export interface GetRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export interface RelationalDatabaseHardware {
  cpuCount?: number;
  diskSizeInGb?: number;
  ramSizeInGb?: number;
}
export interface PendingModifiedRelationalDatabaseValues {
  masterUserPassword?: string;
  engineVersion?: string;
  backupRetentionEnabled?: boolean;
}
export interface RelationalDatabaseEndpoint {
  port?: number;
  address?: string;
}
export interface PendingMaintenanceAction {
  action?: string;
  description?: string;
  currentApplyDate?: Date;
}
export type PendingMaintenanceActionList = PendingMaintenanceAction[];
export interface RelationalDatabase {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  relationalDatabaseBlueprintId?: string;
  relationalDatabaseBundleId?: string;
  masterDatabaseName?: string;
  hardware?: RelationalDatabaseHardware;
  state?: string;
  secondaryAvailabilityZone?: string;
  backupRetentionEnabled?: boolean;
  pendingModifiedValues?: PendingModifiedRelationalDatabaseValues;
  engine?: string;
  engineVersion?: string;
  latestRestorableTime?: Date;
  masterUsername?: string;
  parameterApplyStatus?: string;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  publiclyAccessible?: boolean;
  masterEndpoint?: RelationalDatabaseEndpoint;
  pendingMaintenanceActions?: PendingMaintenanceAction[];
  caCertificateIdentifier?: string;
}
export interface GetRelationalDatabaseResult {
  relationalDatabase?: RelationalDatabase;
}
export interface GetRelationalDatabaseBlueprintsRequest {
  pageToken?: string;
}
export type RelationalDatabaseEngine = "mysql" | (string & {});
export interface RelationalDatabaseBlueprint {
  blueprintId?: string;
  engine?: RelationalDatabaseEngine;
  engineVersion?: string;
  engineDescription?: string;
  engineVersionDescription?: string;
  isEngineDefault?: boolean;
}
export type RelationalDatabaseBlueprintList = RelationalDatabaseBlueprint[];
export interface GetRelationalDatabaseBlueprintsResult {
  blueprints?: RelationalDatabaseBlueprint[];
  nextPageToken?: string;
}
export interface GetRelationalDatabaseBundlesRequest {
  pageToken?: string;
  includeInactive?: boolean;
}
export interface RelationalDatabaseBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  ramSizeInGb?: number;
  diskSizeInGb?: number;
  transferPerMonthInGb?: number;
  cpuCount?: number;
  isEncrypted?: boolean;
  isActive?: boolean;
}
export type RelationalDatabaseBundleList = RelationalDatabaseBundle[];
export interface GetRelationalDatabaseBundlesResult {
  bundles?: RelationalDatabaseBundle[];
  nextPageToken?: string;
}
export interface GetRelationalDatabaseEventsRequest {
  relationalDatabaseName: string;
  durationInMinutes?: number;
  pageToken?: string;
}
export interface RelationalDatabaseEvent {
  resource?: string;
  createdAt?: Date;
  message?: string;
  eventCategories?: string[];
}
export type RelationalDatabaseEventList = RelationalDatabaseEvent[];
export interface GetRelationalDatabaseEventsResult {
  relationalDatabaseEvents?: RelationalDatabaseEvent[];
  nextPageToken?: string;
}
export interface GetRelationalDatabaseLogEventsRequest {
  relationalDatabaseName: string;
  logStreamName: string;
  startTime?: Date;
  endTime?: Date;
  startFromHead?: boolean;
  pageToken?: string;
}
export interface LogEvent {
  createdAt?: Date;
  message?: string;
}
export type LogEventList = LogEvent[];
export interface GetRelationalDatabaseLogEventsResult {
  resourceLogEvents?: LogEvent[];
  nextBackwardToken?: string;
  nextForwardToken?: string;
}
export interface GetRelationalDatabaseLogStreamsRequest {
  relationalDatabaseName: string;
}
export interface GetRelationalDatabaseLogStreamsResult {
  logStreams?: string[];
}
export type RelationalDatabasePasswordVersion =
  | "CURRENT"
  | "PREVIOUS"
  | "PENDING"
  | (string & {});
export interface GetRelationalDatabaseMasterUserPasswordRequest {
  relationalDatabaseName: string;
  passwordVersion?: RelationalDatabasePasswordVersion;
}
export interface GetRelationalDatabaseMasterUserPasswordResult {
  masterUserPassword?: string | redacted.Redacted<string>;
  createdAt?: Date;
}
export type RelationalDatabaseMetricName =
  | "CPUUtilization"
  | "DatabaseConnections"
  | "DiskQueueDepth"
  | "FreeStorageSpace"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | (string & {});
export interface GetRelationalDatabaseMetricDataRequest {
  relationalDatabaseName: string;
  metricName: RelationalDatabaseMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export interface GetRelationalDatabaseMetricDataResult {
  metricName?: RelationalDatabaseMetricName;
  metricData?: MetricDatapoint[];
}
export interface GetRelationalDatabaseParametersRequest {
  relationalDatabaseName: string;
  pageToken?: string;
}
export interface RelationalDatabaseParameter {
  allowedValues?: string;
  applyMethod?: string;
  applyType?: string;
  dataType?: string;
  description?: string;
  isModifiable?: boolean;
  parameterName?: string;
  parameterValue?: string;
}
export type RelationalDatabaseParameterList = RelationalDatabaseParameter[];
export interface GetRelationalDatabaseParametersResult {
  parameters?: RelationalDatabaseParameter[];
  nextPageToken?: string;
}
export interface GetRelationalDatabasesRequest {
  pageToken?: string;
}
export type RelationalDatabaseList = RelationalDatabase[];
export interface GetRelationalDatabasesResult {
  relationalDatabases?: RelationalDatabase[];
  nextPageToken?: string;
}
export interface GetRelationalDatabaseSnapshotRequest {
  relationalDatabaseSnapshotName: string;
}
export interface RelationalDatabaseSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  engine?: string;
  engineVersion?: string;
  sizeInGb?: number;
  state?: string;
  fromRelationalDatabaseName?: string;
  fromRelationalDatabaseArn?: string;
  fromRelationalDatabaseBundleId?: string;
  fromRelationalDatabaseBlueprintId?: string;
}
export interface GetRelationalDatabaseSnapshotResult {
  relationalDatabaseSnapshot?: RelationalDatabaseSnapshot;
}
export interface GetRelationalDatabaseSnapshotsRequest {
  pageToken?: string;
}
export type RelationalDatabaseSnapshotList = RelationalDatabaseSnapshot[];
export interface GetRelationalDatabaseSnapshotsResult {
  relationalDatabaseSnapshots?: RelationalDatabaseSnapshot[];
  nextPageToken?: string;
}
export type SetupHistoryPageToken = string;
export interface GetSetupHistoryRequest {
  resourceName: string;
  pageToken?: string;
}
export type SetupDomainName = string;
export type SetupDomainNameList = string[];
export type CertificateProvider = "LetsEncrypt" | (string & {});
export interface SetupRequest {
  instanceName?: string;
  domainNames?: string[];
  certificateProvider?: CertificateProvider;
}
export interface SetupHistoryResource {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
}
export type SetupStatus = "succeeded" | "failed" | "inProgress" | (string & {});
export interface SetupExecutionDetails {
  command?: string;
  dateTime?: Date;
  name?: string;
  status?: SetupStatus;
  standardError?: string;
  standardOutput?: string;
  version?: string;
}
export type SetupExecutionDetailsList = SetupExecutionDetails[];
export interface SetupHistory {
  operationId?: string;
  request?: SetupRequest;
  resource?: SetupHistoryResource;
  executionDetails?: SetupExecutionDetails[];
  status?: SetupStatus;
}
export type SetupHistoryList = SetupHistory[];
export interface GetSetupHistoryResult {
  setupHistory?: SetupHistory[];
  nextPageToken?: string;
}
export interface GetStaticIpRequest {
  staticIpName: string;
}
export interface StaticIp {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  ipAddress?: string;
  attachedTo?: string;
  isAttached?: boolean;
}
export interface GetStaticIpResult {
  staticIp?: StaticIp;
}
export interface GetStaticIpsRequest {
  pageToken?: string;
}
export type StaticIpList = StaticIp[];
export interface GetStaticIpsResult {
  staticIps?: StaticIp[];
  nextPageToken?: string;
}
export interface ImportKeyPairRequest {
  keyPairName: string;
  publicKeyBase64: string;
}
export interface ImportKeyPairResult {
  operation?: Operation;
}
export interface IsVpcPeeredRequest {}
export interface IsVpcPeeredResult {
  isPeered?: boolean;
}
export interface OpenInstancePublicPortsRequest {
  portInfo: PortInfo;
  instanceName: string;
}
export interface OpenInstancePublicPortsResult {
  operation?: Operation;
}
export interface PeerVpcRequest {}
export interface PeerVpcResult {
  operation?: Operation;
}
export interface PutAlarmRequest {
  alarmName: string;
  metricName: MetricName;
  monitoredResourceName: string;
  comparisonOperator: ComparisonOperator;
  threshold: number;
  evaluationPeriods: number;
  datapointsToAlarm?: number;
  treatMissingData?: TreatMissingData;
  contactProtocols?: ContactProtocol[];
  notificationTriggers?: AlarmState[];
  notificationEnabled?: boolean;
  tags?: Tag[];
}
export interface PutAlarmResult {
  operations?: Operation[];
}
export type PortInfoList = PortInfo[];
export interface PutInstancePublicPortsRequest {
  portInfos: PortInfo[];
  instanceName: string;
}
export interface PutInstancePublicPortsResult {
  operation?: Operation;
}
export interface RebootInstanceRequest {
  instanceName: string;
}
export interface RebootInstanceResult {
  operations?: Operation[];
}
export interface RebootRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export interface RebootRelationalDatabaseResult {
  operations?: Operation[];
}
export type ContainerLabel = string;
export interface RegisterContainerImageRequest {
  serviceName: string;
  label: string;
  digest: string;
}
export interface RegisterContainerImageResult {
  containerImage?: ContainerImage;
}
export interface ReleaseStaticIpRequest {
  staticIpName: string;
}
export interface ReleaseStaticIpResult {
  operations?: Operation[];
}
export interface ResetDistributionCacheRequest {
  distributionName?: string;
}
export interface ResetDistributionCacheResult {
  status?: string;
  createTime?: Date;
  operation?: Operation;
}
export type ContactMethodVerificationProtocol = "Email" | (string & {});
export interface SendContactMethodVerificationRequest {
  protocol: ContactMethodVerificationProtocol;
}
export interface SendContactMethodVerificationResult {
  operations?: Operation[];
}
export interface SetIpAddressTypeRequest {
  resourceType: ResourceType;
  resourceName: string;
  ipAddressType: IpAddressType;
  acceptBundleUpdate?: boolean;
}
export interface SetIpAddressTypeResult {
  operations?: Operation[];
}
export type ResourceBucketAccess = "allow" | "deny" | (string & {});
export interface SetResourceAccessForBucketRequest {
  resourceName: string;
  bucketName: string;
  access: ResourceBucketAccess;
}
export interface SetResourceAccessForBucketResult {
  operations?: Operation[];
}
export type EmailAddress = string | redacted.Redacted<string>;
export interface SetupInstanceHttpsRequest {
  instanceName: string;
  emailAddress: string | redacted.Redacted<string>;
  domainNames: string[];
  certificateProvider: CertificateProvider;
}
export interface SetupInstanceHttpsResult {
  operations?: Operation[];
}
export interface StartGUISessionRequest {
  resourceName: string;
}
export interface StartGUISessionResult {
  operations?: Operation[];
}
export interface StartInstanceRequest {
  instanceName: string;
}
export interface StartInstanceResult {
  operations?: Operation[];
}
export interface StartRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export interface StartRelationalDatabaseResult {
  operations?: Operation[];
}
export interface StopGUISessionRequest {
  resourceName: string;
}
export interface StopGUISessionResult {
  operations?: Operation[];
}
export interface StopInstanceRequest {
  instanceName: string;
  force?: boolean;
}
export interface StopInstanceResult {
  operations?: Operation[];
}
export interface StopRelationalDatabaseRequest {
  relationalDatabaseName: string;
  relationalDatabaseSnapshotName?: string;
}
export interface StopRelationalDatabaseResult {
  operations?: Operation[];
}
export interface TagResourceRequest {
  resourceName: string;
  resourceArn?: string;
  tags: Tag[];
}
export interface TagResourceResult {
  operations?: Operation[];
}
export interface TestAlarmRequest {
  alarmName: string;
  state: AlarmState;
}
export interface TestAlarmResult {
  operations?: Operation[];
}
export interface UnpeerVpcRequest {}
export interface UnpeerVpcResult {
  operation?: Operation;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceName: string;
  resourceArn?: string;
  tagKeys: string[];
}
export interface UntagResourceResult {
  operations?: Operation[];
}
export interface UpdateBucketRequest {
  bucketName: string;
  accessRules?: AccessRules;
  versioning?: string;
  readonlyAccessAccounts?: string[];
  accessLogConfig?: BucketAccessLogConfig;
  cors?: BucketCorsConfig;
}
export interface UpdateBucketResult {
  bucket?: Bucket;
  operations?: Operation[];
}
export interface UpdateBucketBundleRequest {
  bucketName: string;
  bundleId: string;
}
export interface UpdateBucketBundleResult {
  operations?: Operation[];
}
export interface UpdateContainerServiceRequest {
  serviceName: string;
  power?: ContainerServicePowerName;
  scale?: number;
  isDisabled?: boolean;
  publicDomainNames?: { [key: string]: string[] | undefined };
  privateRegistryAccess?: PrivateRegistryAccessRequest;
}
export interface UpdateContainerServiceResult {
  containerService?: ContainerService;
}
export interface UpdateDistributionRequest {
  distributionName: string;
  origin?: InputOrigin;
  defaultCacheBehavior?: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  isEnabled?: boolean;
  viewerMinimumTlsProtocolVersion?: ViewerMinimumTlsProtocolVersionEnum;
  certificateName?: string;
  useDefaultCertificate?: boolean;
}
export interface UpdateDistributionResult {
  operation?: Operation;
}
export interface UpdateDistributionBundleRequest {
  distributionName?: string;
  bundleId?: string;
}
export interface UpdateDistributionBundleResult {
  operation?: Operation;
}
export interface UpdateDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export interface UpdateDomainEntryResult {
  operations?: Operation[];
}
export interface UpdateInstanceMetadataOptionsRequest {
  instanceName: string;
  httpTokens?: HttpTokens;
  httpEndpoint?: HttpEndpoint;
  httpPutResponseHopLimit?: number;
  httpProtocolIpv6?: HttpProtocolIpv6;
}
export interface UpdateInstanceMetadataOptionsResult {
  operation?: Operation;
}
export interface UpdateLoadBalancerAttributeRequest {
  loadBalancerName: string;
  attributeName: LoadBalancerAttributeName;
  attributeValue: string;
}
export interface UpdateLoadBalancerAttributeResult {
  operations?: Operation[];
}
export interface UpdateRelationalDatabaseRequest {
  relationalDatabaseName: string;
  masterUserPassword?: string | redacted.Redacted<string>;
  rotateMasterUserPassword?: boolean;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  enableBackupRetention?: boolean;
  disableBackupRetention?: boolean;
  publiclyAccessible?: boolean;
  applyImmediately?: boolean;
  caCertificateIdentifier?: string;
  relationalDatabaseBlueprintId?: string;
}
export interface UpdateRelationalDatabaseResult {
  operations?: Operation[];
}
export interface UpdateRelationalDatabaseParametersRequest {
  relationalDatabaseName: string;
  parameters: RelationalDatabaseParameter[];
}
export interface UpdateRelationalDatabaseParametersResult {
  operations?: Operation[];
}
export type AllocateStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allocates a static IP address.
 */
export const allocateStaticIp: API.OperationMethod<
  AllocateStaticIpRequest,
  AllocateStaticIpResult,
  AllocateStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { staticIpName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateStaticIp",
})) as any;

export type AttachCertificateToDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches an SSL/TLS certificate to your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After the certificate is attached, your distribution accepts HTTPS traffic for all of the
 * domains that are associated with the certificate.
 *
 * Use the `CreateCertificate` action to create a certificate that you can attach
 * to your distribution.
 *
 * Only certificates created in the `us-east-1`
 * Amazon Web Services Region can be attached to Lightsail distributions. Lightsail
 * distributions are global resources that can reference an origin in any Amazon Web Services
 * Region, and distribute its content globally. However, all distributions are located in the
 * `us-east-1` Region.
 */
export const attachCertificateToDistribution: API.OperationMethod<
  AttachCertificateToDistributionRequest,
  AttachCertificateToDistributionResult,
  AttachCertificateToDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0, certificateName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachCertificateToDistribution",
})) as any;

export type AttachDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a block storage disk to a running or stopped Lightsail instance and exposes it
 * to the instance with the specified disk name.
 *
 * The `attach disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const attachDisk: API.OperationMethod<
  AttachDiskRequest,
  AttachDiskResult,
  AttachDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskName: 0, instanceName: 0, diskPath: 0, autoMounting: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachDisk",
})) as any;

export type AttachInstancesToLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches one or more Lightsail instances to a load balancer.
 *
 * After some time, the instances are attached to the load balancer and the health check
 * status is available.
 *
 * The `attach instances to load balancer` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Lightsail Developer Guide.
 */
export const attachInstancesToLoadBalancer: API.OperationMethod<
  AttachInstancesToLoadBalancerRequest,
  AttachInstancesToLoadBalancerResult,
  AttachInstancesToLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0, instanceNames: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachInstancesToLoadBalancer",
})) as any;

export type AttachLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a Transport Layer Security (TLS) certificate to your load balancer. TLS is just
 * an updated, more secure version of Secure Socket Layer (SSL).
 *
 * Once you create and validate your certificate, you can attach it to your load balancer.
 * You can also use this API to rotate the certificates on your account. Use the
 * `AttachLoadBalancerTlsCertificate` action with the non-attached certificate, and
 * it will replace the existing one and become the attached certificate.
 *
 * The `AttachLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const attachLoadBalancerTlsCertificate: API.OperationMethod<
  AttachLoadBalancerTlsCertificateRequest,
  AttachLoadBalancerTlsCertificateResult,
  AttachLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0, certificateName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerTlsCertificate",
})) as any;

export type AttachStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a static IP address to a specific Amazon Lightsail instance.
 */
export const attachStaticIp: API.OperationMethod<
  AttachStaticIpRequest,
  AttachStaticIpResult,
  AttachStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { staticIpName: 0, instanceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachStaticIp",
})) as any;

export type CloseInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Closes ports for a specific Amazon Lightsail instance.
 *
 * The `CloseInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const closeInstancePublicPorts: API.OperationMethod<
  CloseInstancePublicPortsRequest,
  CloseInstancePublicPortsResult,
  CloseInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { portInfo: i_PortInfo, instanceName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseInstancePublicPorts",
})) as any;

export type CopySnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Copies a manual snapshot of an instance or disk as another manual snapshot, or copies an
 * automatic snapshot of an instance or disk as a manual snapshot. This operation can also be
 * used to copy a manual or automatic snapshot of an instance or a disk from one Amazon Web Services Region to another in Amazon Lightsail.
 *
 * When copying a *manual snapshot*, be sure to define the source
 * region, `source snapshot name`, and `target snapshot name`
 * parameters.
 *
 * When copying an *automatic snapshot*, be sure to define the
 * `source region`, `source resource name`, target snapshot
 * name, and either the `restore date` or the use latest restorable
 * auto snapshot parameters.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotRequest,
  CopySnapshotResult,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      sourceSnapshotName: 0,
      sourceResourceName: 0,
      restoreDate: 0,
      useLatestRestorableAutoSnapshot: 0,
      targetSnapshotName: 0,
      sourceRegion: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
})) as any;

export type CreateBucketError =
  | AccessDeniedException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail bucket.
 *
 * A bucket is a cloud storage resource available in the Lightsail object storage service.
 * Use buckets to store objects such as data and its descriptive metadata. For more information
 * about buckets, see Buckets in Amazon Lightsail in the Amazon Lightsail Developer
 * Guide.
 */
export const createBucket: API.OperationMethod<
  CreateBucketRequest,
  CreateBucketResult,
  CreateBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      bucketName: 0,
      bundleId: 0,
      tags: D.list(i_Tag),
      enableObjectVersioning: 0,
    },
    output: { bucket: o_Bucket, operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
})) as any;

export type CreateBucketAccessKeyError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new access key for the specified Amazon Lightsail bucket. Access keys consist of
 * an access key ID and corresponding secret access key.
 *
 * Access keys grant full programmatic access to the specified bucket and its objects. You
 * can have a maximum of two access keys per bucket. Use the GetBucketAccessKeys action to get a list of current access keys for a specific bucket. For more
 * information about access keys, see Creating access keys for a bucket in Amazon Lightsail in the
 * *Amazon Lightsail Developer Guide*.
 *
 * The `secretAccessKey` value is returned only in response to the
 * `CreateBucketAccessKey` action. You can get a secret access key only when you
 * first create an access key; you cannot get the secret access key later. If you lose the
 * secret access key, you must create a new access key.
 */
export const createBucketAccessKey: API.OperationMethod<
  CreateBucketAccessKeyRequest,
  CreateBucketAccessKeyResult,
  CreateBucketAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { bucketName: 0 },
    output: { accessKey: o_AccessKey, operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucketAccessKey",
})) as any;

export type CreateCertificateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate for an Amazon Lightsail content delivery network (CDN)
 * distribution and a container service.
 *
 * After the certificate is valid, use the `AttachCertificateToDistribution`
 * action to use the certificate and its domains with your distribution. Or use the
 * `UpdateContainerService` action to use the certificate and its domains with your
 * container service.
 *
 * Only certificates created in the `us-east-1`
 * Amazon Web Services Region can be attached to Lightsail distributions. Lightsail
 * distributions are global resources that can reference an origin in any Amazon Web Services
 * Region, and distribute its content globally. However, all distributions are located in the
 * `us-east-1` Region.
 */
export const createCertificate: API.OperationMethod<
  CreateCertificateRequest,
  CreateCertificateResult,
  CreateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      certificateName: 0,
      domainName: 0,
      subjectAlternativeNames: 0,
      tags: D.list(i_Tag),
    },
    output: {
      certificate: o_CertificateSummary,
      operations: D.list(o_Operation),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificate",
})) as any;

export type CreateCloudFormationStackError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation stack, which creates a new Amazon EC2 instance from an exported
 * Amazon Lightsail snapshot. This operation results in a CloudFormation stack record that can be
 * used to track the AWS CloudFormation stack created. Use the get cloud formation stack
 * records operation to get a list of the CloudFormation stacks created.
 *
 * Wait until after your new Amazon EC2 instance is created before running the create
 * cloud formation stack operation again with the same export snapshot record.
 */
export const createCloudFormationStack: API.OperationMethod<
  CreateCloudFormationStackRequest,
  CreateCloudFormationStackResult,
  CreateCloudFormationStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instances: D.list({
        sourceName: 0,
        instanceType: 0,
        portInfoSource: 0,
        userData: 0,
        availabilityZone: 0,
      }),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFormationStack",
})) as any;

export type CreateContactMethodError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an email or SMS text message contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 *
 * The `create contact method` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const createContactMethod: API.OperationMethod<
  CreateContactMethodRequest,
  CreateContactMethodResult,
  CreateContactMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { protocol: 0, contactEndpoint: 0, tags: D.list(i_Tag) },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactMethod",
})) as any;

export type CreateContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail container service.
 *
 * A Lightsail container service is a compute resource to which you can deploy containers.
 * For more information, see Container services in Amazon Lightsail in the Lightsail Dev
 * Guide.
 */
export const createContainerService: API.OperationMethod<
  CreateContainerServiceRequest,
  CreateContainerServiceResult,
  CreateContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      power: 0,
      scale: 0,
      tags: D.list(i_Tag),
      publicDomainNames: 0,
      deployment: {
        containers: D.map(i_Container),
        publicEndpoint: i_EndpointRequest,
      },
      privateRegistryAccess: i_PrivateRegistryAccessRequest,
    },
    output: { containerService: o_ContainerService },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerService",
})) as any;

export type CreateContainerServiceDeploymentError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a deployment for your Amazon Lightsail container service.
 *
 * A deployment specifies the containers that will be launched on the container service and
 * their settings, such as the ports to open, the environment variables to apply, and the launch
 * command to run. It also specifies the container that will serve as the public endpoint of the
 * deployment and its settings, such as the HTTP or HTTPS port to use, and the health check
 * configuration.
 *
 * You can deploy containers to your container service using container images from a public
 * registry such as Amazon ECR Public, or from your local machine. For more information, see
 * Creating container images for your Amazon Lightsail container services in the
 * *Amazon Lightsail Developer Guide*.
 */
export const createContainerServiceDeployment: API.OperationMethod<
  CreateContainerServiceDeploymentRequest,
  CreateContainerServiceDeploymentResult,
  CreateContainerServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      containers: D.map(i_Container),
      publicEndpoint: i_EndpointRequest,
    },
    output: { containerService: o_ContainerService },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerServiceDeployment",
})) as any;

export type CreateContainerServiceRegistryLoginError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a temporary set of log in credentials that you can use to log in to the Docker
 * process on your local machine. After you're logged in, you can use the native Docker commands
 * to push your local container images to the container image registry of your Amazon Lightsail
 * account so that you can use them with your Lightsail container service. The log in
 * credentials expire 12 hours after they are created, at which point you will need to create a
 * new set of log in credentials.
 *
 * You can only push container images to the container service registry of your Lightsail
 * account. You cannot pull container images or perform any other container image management
 * actions on the container service registry.
 *
 * After you push your container images to the container image registry of your Lightsail
 * account, use the `RegisterContainerImage` action to register the pushed images to a
 * specific Lightsail container service.
 *
 * This action is not required if you install and use the Lightsail Control
 * (lightsailctl) plugin to push container images to your Lightsail container service. For
 * more information, see Pushing and managing container images on your Amazon Lightsail container services
 * in the *Amazon Lightsail Developer Guide*.
 */
export const createContainerServiceRegistryLogin: API.OperationMethod<
  CreateContainerServiceRegistryLoginRequest,
  CreateContainerServiceRegistryLoginResult,
  CreateContainerServiceRegistryLoginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { registryLogin: { expiresAt: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerServiceRegistryLogin",
})) as any;

export type CreateDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a block storage disk that can be attached to an Amazon Lightsail instance in the
 * same Availability Zone (`us-east-2a`).
 *
 * The `create disk` operation supports tag-based access control via request tags.
 * For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDisk: API.OperationMethod<
  CreateDiskRequest,
  CreateDiskResult,
  CreateDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      diskName: 0,
      availabilityZone: 0,
      sizeInGb: 0,
      tags: D.list(i_Tag),
      addOns: D.list(i_AddOnRequest),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDisk",
})) as any;

export type CreateDiskFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a block storage disk from a manual or automatic snapshot of a disk. The resulting
 * disk can be attached to an Amazon Lightsail instance in the same Availability Zone
 * (`us-east-2a`).
 *
 * The `create disk from snapshot` operation supports tag-based access control via
 * request tags and resource tags applied to the resource identified by disk snapshot
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDiskFromSnapshot: API.OperationMethod<
  CreateDiskFromSnapshotRequest,
  CreateDiskFromSnapshotResult,
  CreateDiskFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      diskName: 0,
      diskSnapshotName: 0,
      availabilityZone: 0,
      sizeInGb: 0,
      tags: D.list(i_Tag),
      addOns: D.list(i_AddOnRequest),
      sourceDiskName: 0,
      restoreDate: 0,
      useLatestRestorableAutoSnapshot: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDiskFromSnapshot",
})) as any;

export type CreateDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of a block storage disk. You can use snapshots for backups, to make
 * copies of disks, and to save data before shutting down a Lightsail instance.
 *
 * You can take a snapshot of an attached disk that is in use; however, snapshots only
 * capture data that has been written to your disk at the time the snapshot command is issued.
 * This may exclude any data that has been cached by any applications or the operating system. If
 * you can pause any file systems on the disk long enough to take a snapshot, your snapshot
 * should be complete. Nevertheless, if you cannot pause all file writes to the disk, you should
 * unmount the disk from within the Lightsail instance, issue the create disk snapshot command,
 * and then remount the disk to ensure a consistent and complete snapshot. You may remount and
 * use your disk while the snapshot status is pending.
 *
 * You can also use this operation to create a snapshot of an instance's system volume. You
 * might want to do this, for example, to recover data from the system volume of a botched
 * instance or to create a backup of the system volume like you would for a block storage disk.
 * To create a snapshot of a system volume, just define the `instance name` parameter
 * when issuing the snapshot command, and a snapshot of the defined instance's system volume will
 * be created. After the snapshot is available, you can create a block storage disk from the
 * snapshot and attach it to a running instance to access the data on the disk.
 *
 * The `create disk snapshot` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDiskSnapshot: API.OperationMethod<
  CreateDiskSnapshotRequest,
  CreateDiskSnapshotResult,
  CreateDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      diskName: 0,
      diskSnapshotName: 0,
      instanceName: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDiskSnapshot",
})) as any;

export type CreateDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail content delivery network (CDN) distribution.
 *
 * A distribution is a globally distributed network of caching servers that improve the
 * performance of your website or web application hosted on a Lightsail instance. For more
 * information, see Content delivery networks in Amazon Lightsail.
 */
export const createDistribution: API.OperationMethod<
  CreateDistributionRequest,
  CreateDistributionResult,
  CreateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      distributionName: 0,
      origin: i_InputOrigin,
      defaultCacheBehavior: i_CacheBehavior,
      cacheBehaviorSettings: i_CacheSettings,
      cacheBehaviors: D.list(i_CacheBehaviorPerPath),
      bundleId: 0,
      ipAddressType: 0,
      tags: D.list(i_Tag),
      certificateName: 0,
      viewerMinimumTlsProtocolVersion: 0,
    },
    output: { distribution: o_LightsailDistribution, operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistribution",
})) as any;

export type CreateDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a domain resource for the specified domain (example.com).
 *
 * The `create domain` operation supports tag-based access control via request
 * tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResult,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0, tags: D.list(i_Tag) },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type CreateDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one of the following domain name system (DNS) records in a domain DNS zone:
 * Address (A), canonical name (CNAME), mail exchanger (MX), name server (NS), start of authority
 * (SOA), service locator (SRV), or text (TXT).
 *
 * The `create domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const createDomainEntry: API.OperationMethod<
  CreateDomainEntryRequest,
  CreateDomainEntryResult,
  CreateDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0, domainEntry: i_DomainEntry },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainEntry",
})) as any;

export type CreateGUISessionAccessDetailsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates two URLs that are used to access a virtual computer’s graphical user interface
 * (GUI) session. The primary URL initiates a web-based Amazon DCV session to the virtual
 * computer's application. The secondary URL initiates a web-based Amazon DCV session to the
 * virtual computer's operating session.
 *
 * Use `StartGUISession` to open the session.
 */
export const createGUISessionAccessDetails: API.OperationMethod<
  CreateGUISessionAccessDetailsRequest,
  CreateGUISessionAccessDetailsResult,
  CreateGUISessionAccessDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0 },
    output: { sessions: D.list({ url: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGUISessionAccessDetails",
})) as any;

export type CreateInstancesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one or more Amazon Lightsail instances.
 *
 * The `create instances` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const createInstances: API.OperationMethod<
  CreateInstancesRequest,
  CreateInstancesResult,
  CreateInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceNames: 0,
      availabilityZone: 0,
      customImageName: 0,
      blueprintId: 0,
      bundleId: 0,
      userData: 0,
      keyPairName: 0,
      tags: D.list(i_Tag),
      addOns: D.list(i_AddOnRequest),
      ipAddressType: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstances",
})) as any;

export type CreateInstancesFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one or more new instances from a manual or automatic snapshot of an
 * instance.
 *
 * The `create instances from snapshot` operation supports tag-based access
 * control via request tags and resource tags applied to the resource identified by
 * `instance snapshot name`. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createInstancesFromSnapshot: API.OperationMethod<
  CreateInstancesFromSnapshotRequest,
  CreateInstancesFromSnapshotResult,
  CreateInstancesFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceNames: 0,
      attachedDiskMapping: D.map(
        D.list({ originalDiskPath: 0, newDiskName: 0 }),
      ),
      availabilityZone: 0,
      instanceSnapshotName: 0,
      bundleId: 0,
      userData: 0,
      keyPairName: 0,
      tags: D.list(i_Tag),
      addOns: D.list(i_AddOnRequest),
      ipAddressType: 0,
      sourceInstanceName: 0,
      restoreDate: 0,
      useLatestRestorableAutoSnapshot: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstancesFromSnapshot",
})) as any;

export type CreateInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of a specific virtual private server, or *instance*.
 * You can use a snapshot to create a new instance that is based on that snapshot.
 *
 * The `create instance snapshot` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createInstanceSnapshot: API.OperationMethod<
  CreateInstanceSnapshotRequest,
  CreateInstanceSnapshotResult,
  CreateInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceSnapshotName: 0, instanceName: 0, tags: D.list(i_Tag) },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceSnapshot",
})) as any;

export type CreateKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a custom SSH key pair that you can use with an Amazon Lightsail
 * instance.
 *
 * Use the DownloadDefaultKeyPair action to create a Lightsail default key
 * pair in an Amazon Web Services Region where a default key pair does not currently
 * exist.
 *
 * The `create key pair` operation supports tag-based access control via request
 * tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createKeyPair: API.OperationMethod<
  CreateKeyPairRequest,
  CreateKeyPairResult,
  CreateKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyPairName: 0, tags: D.list(i_Tag) },
    output: { keyPair: o_KeyPair, operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyPair",
})) as any;

export type CreateLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a Lightsail load balancer. To learn more about deciding whether to load balance
 * your application, see Configure your Lightsail instances for load balancing. You can create up to 10
 * load balancers per AWS Region in your account.
 *
 * When you create a load balancer, you can specify a unique name and port settings. To
 * change additional load balancer settings, use the `UpdateLoadBalancerAttribute`
 * operation.
 *
 * The `create load balancer` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createLoadBalancer: API.OperationMethod<
  CreateLoadBalancerRequest,
  CreateLoadBalancerResult,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      loadBalancerName: 0,
      instancePort: 0,
      healthCheckPath: 0,
      certificateName: 0,
      certificateDomainName: 0,
      certificateAlternativeNames: 0,
      tags: D.list(i_Tag),
      ipAddressType: 0,
      tlsPolicyName: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancer",
})) as any;

export type CreateLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate for an Amazon Lightsail load balancer.
 *
 * TLS is just an updated, more secure version of Secure Socket Layer (SSL).
 *
 * The `CreateLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createLoadBalancerTlsCertificate: API.OperationMethod<
  CreateLoadBalancerTlsCertificateRequest,
  CreateLoadBalancerTlsCertificateResult,
  CreateLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      loadBalancerName: 0,
      certificateName: 0,
      certificateDomainName: 0,
      certificateAlternativeNames: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancerTlsCertificate",
})) as any;

export type CreateRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new database in Amazon Lightsail.
 *
 * The `create relational database` operation supports tag-based access control
 * via request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabase: API.OperationMethod<
  CreateRelationalDatabaseRequest,
  CreateRelationalDatabaseResult,
  CreateRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      availabilityZone: 0,
      relationalDatabaseBlueprintId: 0,
      relationalDatabaseBundleId: 0,
      masterDatabaseName: 0,
      masterUsername: 0,
      masterUserPassword: 0,
      preferredBackupWindow: 0,
      preferredMaintenanceWindow: 0,
      publiclyAccessible: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabase",
})) as any;

export type CreateRelationalDatabaseFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new database from an existing database snapshot in Amazon Lightsail.
 *
 * You can create a new database from a snapshot in if something goes wrong with your
 * original database, or to change it to a different plan, such as a high availability or
 * standard plan.
 *
 * The `create relational database from snapshot` operation supports tag-based
 * access control via request tags and resource tags applied to the resource identified by
 * relationalDatabaseSnapshotName. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabaseFromSnapshot: API.OperationMethod<
  CreateRelationalDatabaseFromSnapshotRequest,
  CreateRelationalDatabaseFromSnapshotResult,
  CreateRelationalDatabaseFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      availabilityZone: 0,
      publiclyAccessible: 0,
      relationalDatabaseSnapshotName: 0,
      relationalDatabaseBundleId: 0,
      sourceRelationalDatabaseName: 0,
      restoreTime: 0,
      useLatestRestorableTime: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabaseFromSnapshot",
})) as any;

export type CreateRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of your database in Amazon Lightsail. You can use snapshots for backups,
 * to make copies of a database, and to save data before deleting a database.
 *
 * The `create relational database snapshot` operation supports tag-based access
 * control via request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabaseSnapshot: API.OperationMethod<
  CreateRelationalDatabaseSnapshotRequest,
  CreateRelationalDatabaseSnapshotResult,
  CreateRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      relationalDatabaseSnapshotName: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabaseSnapshot",
})) as any;

export type DeleteAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an alarm.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const deleteAlarm: API.OperationMethod<
  DeleteAlarmRequest,
  DeleteAlarmResult,
  DeleteAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { alarmName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarm",
})) as any;

export type DeleteAutoSnapshotError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an automatic snapshot of an instance or disk. For more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteAutoSnapshot: API.OperationMethod<
  DeleteAutoSnapshotRequest,
  DeleteAutoSnapshotResult,
  DeleteAutoSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, date: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoSnapshot",
})) as any;

export type DeleteBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a Amazon Lightsail bucket.
 *
 * When you delete your bucket, the bucket name is released and can be reused for a new
 * bucket in your account or another Amazon Web Services account.
 */
export const deleteBucket: API.OperationMethod<
  DeleteBucketRequest,
  DeleteBucketResult,
  DeleteBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { bucketName: 0, forceDelete: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
})) as any;

export type DeleteBucketAccessKeyError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an access key for the specified Amazon Lightsail bucket.
 *
 * We recommend that you delete an access key if the secret access key is compromised.
 *
 * For more information about access keys, see Creating access keys for a bucket in Amazon Lightsail in the
 * *Amazon Lightsail Developer Guide*.
 */
export const deleteBucketAccessKey: API.OperationMethod<
  DeleteBucketAccessKeyRequest,
  DeleteBucketAccessKeyResult,
  DeleteBucketAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { bucketName: 0, accessKeyId: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketAccessKey",
})) as any;

export type DeleteCertificateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an SSL/TLS certificate for your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * Certificates that are currently attached to a distribution cannot be deleted. Use the
 * `DetachCertificateFromDistribution` action to detach a certificate from a
 * distribution.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResult,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { certificateName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
})) as any;

export type DeleteContactMethodError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 */
export const deleteContactMethod: API.OperationMethod<
  DeleteContactMethodRequest,
  DeleteContactMethodResult,
  DeleteContactMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { protocol: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactMethod",
})) as any;

export type DeleteContainerImageError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a container image that is registered to your Amazon Lightsail container
 * service.
 */
export const deleteContainerImage: API.OperationMethod<
  DeleteContainerImageRequest,
  DeleteContainerImageResult,
  DeleteContainerImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceName: 0, image: 0 } },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerImage",
})) as any;

export type DeleteContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes your Amazon Lightsail container service.
 */
export const deleteContainerService: API.OperationMethod<
  DeleteContainerServiceRequest,
  DeleteContainerServiceResult,
  DeleteContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceName: 0 } },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerService",
})) as any;

export type DeleteDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified block storage disk. The disk must be in the `available`
 * state (not attached to a Lightsail instance).
 *
 * The disk may remain in the `deleting` state for several minutes.
 *
 * The `delete disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const deleteDisk: API.OperationMethod<
  DeleteDiskRequest,
  DeleteDiskResult,
  DeleteDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskName: 0, forceDeleteAddOns: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDisk",
})) as any;

export type DeleteDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified disk snapshot.
 *
 * When you make periodic snapshots of a disk, the snapshots are incremental, and only the
 * blocks on the device that have changed since your last snapshot are saved in the new snapshot.
 * When you delete a snapshot, only the data not needed for any other snapshot is removed. So
 * regardless of which prior snapshots have been deleted, all active snapshots will have access
 * to all the information needed to restore the disk.
 *
 * The `delete disk snapshot` operation supports tag-based access control via
 * resource tags applied to the resource identified by `disk snapshot name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteDiskSnapshot: API.OperationMethod<
  DeleteDiskSnapshotRequest,
  DeleteDiskSnapshotResult,
  DeleteDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskSnapshotName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDiskSnapshot",
})) as any;

export type DeleteDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes your Amazon Lightsail content delivery network (CDN) distribution.
 */
export const deleteDistribution: API.OperationMethod<
  DeleteDistributionRequest,
  DeleteDistributionResult,
  DeleteDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDistribution",
})) as any;

export type DeleteDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified domain recordset and all of its domain records.
 *
 * The `delete domain` operation supports tag-based access control via resource
 * tags applied to the resource identified by `domain name`. For more information, see
 * the Amazon Lightsail Developer Guide.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResult,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DeleteDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific domain entry.
 *
 * The `delete domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteDomainEntry: API.OperationMethod<
  DeleteDomainEntryRequest,
  DeleteDomainEntryResult,
  DeleteDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0, domainEntry: i_DomainEntry },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainEntry",
})) as any;

export type DeleteInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an Amazon Lightsail instance.
 *
 * The `delete instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResult,
  DeleteInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0, forceDeleteAddOns: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstance",
})) as any;

export type DeleteInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific snapshot of a virtual private server (or
 * *instance*).
 *
 * The `delete instance snapshot` operation supports tag-based access control via
 * resource tags applied to the resource identified by `instance snapshot name`. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteInstanceSnapshot: API.OperationMethod<
  DeleteInstanceSnapshotRequest,
  DeleteInstanceSnapshotResult,
  DeleteInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceSnapshotName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceSnapshot",
})) as any;

export type DeleteKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified key pair by removing the public key from Amazon Lightsail.
 *
 * You can delete key pairs that were created using the ImportKeyPair and
 * CreateKeyPair actions, as well as the Lightsail default key pair. A new default
 * key pair will not be created unless you launch an instance without specifying a custom key
 * pair, or you call the DownloadDefaultKeyPair API.
 *
 * The `delete key pair` operation supports tag-based access control via resource
 * tags applied to the resource identified by `key pair name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const deleteKeyPair: API.OperationMethod<
  DeleteKeyPairRequest,
  DeleteKeyPairResult,
  DeleteKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyPairName: 0, expectedFingerprint: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyPair",
})) as any;

export type DeleteKnownHostKeysError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the known host key or certificate used by the Amazon Lightsail browser-based SSH or
 * RDP clients to authenticate an instance. This operation enables the Lightsail browser-based
 * SSH or RDP clients to connect to the instance after a host key mismatch.
 *
 * Perform this operation only if you were expecting the host key or certificate mismatch
 * or if you are familiar with the new host key or certificate on the instance. For more
 * information, see Troubleshooting connection issues when using the Amazon Lightsail browser-based SSH or RDP
 * client.
 */
export const deleteKnownHostKeys: API.OperationMethod<
  DeleteKnownHostKeysRequest,
  DeleteKnownHostKeysResult,
  DeleteKnownHostKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnownHostKeys",
})) as any;

export type DeleteLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a Lightsail load balancer and all its associated SSL/TLS certificates. Once the
 * load balancer is deleted, you will need to create a new load balancer, create a new
 * certificate, and verify domain ownership again.
 *
 * The `delete load balancer` operation supports tag-based access control via
 * resource tags applied to the resource identified by `load balancer name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteLoadBalancer: API.OperationMethod<
  DeleteLoadBalancerRequest,
  DeleteLoadBalancerResult,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
})) as any;

export type DeleteLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an SSL/TLS certificate associated with a Lightsail load balancer.
 *
 * The `DeleteLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteLoadBalancerTlsCertificate: API.OperationMethod<
  DeleteLoadBalancerTlsCertificateRequest,
  DeleteLoadBalancerTlsCertificateResult,
  DeleteLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0, certificateName: 0, force: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerTlsCertificate",
})) as any;

export type DeleteRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a database in Amazon Lightsail.
 *
 * The `delete relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteRelationalDatabase: API.OperationMethod<
  DeleteRelationalDatabaseRequest,
  DeleteRelationalDatabaseResult,
  DeleteRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      skipFinalSnapshot: 0,
      finalRelationalDatabaseSnapshotName: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelationalDatabase",
})) as any;

export type DeleteRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a database snapshot in Amazon Lightsail.
 *
 * The `delete relational database snapshot` operation supports tag-based access
 * control via resource tags applied to the resource identified by relationalDatabaseName. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteRelationalDatabaseSnapshot: API.OperationMethod<
  DeleteRelationalDatabaseSnapshotRequest,
  DeleteRelationalDatabaseSnapshotResult,
  DeleteRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseSnapshotName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelationalDatabaseSnapshot",
})) as any;

export type DetachCertificateFromDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches an SSL/TLS certificate from your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After the certificate is detached, your distribution stops accepting traffic for all of
 * the domains that are associated with the certificate.
 */
export const detachCertificateFromDistribution: API.OperationMethod<
  DetachCertificateFromDistributionRequest,
  DetachCertificateFromDistributionResult,
  DetachCertificateFromDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachCertificateFromDistribution",
})) as any;

export type DetachDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches a stopped block storage disk from a Lightsail instance. Make sure to unmount
 * any file systems on the device within your operating system before stopping the instance and
 * detaching the disk.
 *
 * The `detach disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const detachDisk: API.OperationMethod<
  DetachDiskRequest,
  DetachDiskResult,
  DetachDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachDisk",
})) as any;

export type DetachInstancesFromLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches the specified instances from a Lightsail load balancer.
 *
 * This operation waits until the instances are no longer needed before they are detached
 * from the load balancer.
 *
 * The `detach instances from load balancer` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const detachInstancesFromLoadBalancer: API.OperationMethod<
  DetachInstancesFromLoadBalancerRequest,
  DetachInstancesFromLoadBalancerResult,
  DetachInstancesFromLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0, instanceNames: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachInstancesFromLoadBalancer",
})) as any;

export type DetachStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches a static IP from the Amazon Lightsail instance to which it is attached.
 */
export const detachStaticIp: API.OperationMethod<
  DetachStaticIpRequest,
  DetachStaticIpResult,
  DetachStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { staticIpName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachStaticIp",
})) as any;

export type DisableAddOnError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Disables an add-on for an Amazon Lightsail resource. For more information, see the Amazon Lightsail Developer Guide.
 */
export const disableAddOn: API.OperationMethod<
  DisableAddOnRequest,
  DisableAddOnResult,
  DisableAddOnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { addOnType: 0, resourceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAddOn",
})) as any;

export type DownloadDefaultKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Downloads the regional Amazon Lightsail default key pair.
 *
 * This action also creates a Lightsail default key pair if a default key pair
 * does not currently exist in the Amazon Web Services Region.
 */
export const downloadDefaultKeyPair: API.OperationMethod<
  DownloadDefaultKeyPairRequest,
  DownloadDefaultKeyPairResult,
  DownloadDefaultKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { createdAt: D.ts } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DownloadDefaultKeyPair",
})) as any;

export type EnableAddOnError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Enables or modifies an add-on for an Amazon Lightsail resource. For more information, see
 * the Amazon Lightsail Developer Guide.
 */
export const enableAddOn: API.OperationMethod<
  EnableAddOnRequest,
  EnableAddOnResult,
  EnableAddOnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, addOnRequest: i_AddOnRequest },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAddOn",
})) as any;

export type ExportSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Exports an Amazon Lightsail instance or block storage disk snapshot to Amazon Elastic Compute Cloud (Amazon EC2).
 * This operation results in an export snapshot record that can be used with the create
 * cloud formation stack operation to create new Amazon EC2 instances.
 *
 * Exported instance snapshots appear in Amazon EC2 as Amazon Machine Images (AMIs), and the
 * instance system disk appears as an Amazon Elastic Block Store (Amazon EBS) volume. Exported disk snapshots appear in
 * Amazon EC2 as Amazon EBS volumes. Snapshots are exported to the same Amazon Web Services Region in
 * Amazon EC2 as the source Lightsail snapshot.
 *
 * The `export snapshot` operation supports tag-based access control via resource
 * tags applied to the resource identified by `source snapshot name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 *
 * Use the `get instance snapshots` or `get disk snapshots`
 * operations to get a list of snapshots that you can export to Amazon EC2.
 */
export const exportSnapshot: API.OperationMethod<
  ExportSnapshotRequest,
  ExportSnapshotResult,
  ExportSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { sourceSnapshotName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSnapshot",
})) as any;

export type GetActiveNamesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the names of all active (not deleted) resources.
 */
export const getActiveNames: API.OperationMethod<
  GetActiveNamesRequest,
  GetActiveNamesResult,
  GetActiveNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pageToken: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActiveNames",
})) as any;

export type GetAlarmsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the configured alarms. Specify an alarm name in your request to
 * return information about a specific alarm, or specify a monitored resource name to return
 * information about all alarms for a specific resource.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const getAlarms: API.OperationMethod<
  GetAlarmsRequest,
  GetAlarmsResult,
  GetAlarmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { alarmName: 0, pageToken: 0, monitoredResourceName: 0 },
    output: { alarms: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlarms",
})) as any;

export type GetAutoSnapshotsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the available automatic snapshots for an instance or disk. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const getAutoSnapshots: API.OperationMethod<
  GetAutoSnapshotsRequest,
  GetAutoSnapshotsResult,
  GetAutoSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0 },
    output: { autoSnapshots: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoSnapshots",
})) as any;

export type GetBlueprintsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of available instance images, or *blueprints*. You can
 * use a blueprint to create a new instance already running a specific operating system, as well
 * as a preinstalled app or development stack. The software each instance is running depends on
 * the blueprint image you choose.
 *
 * Use active blueprints when creating new instances. Inactive blueprints are listed to
 * support customers with existing instances and are not necessarily available to create new
 * instances. Blueprints are marked inactive when they become outdated due to operating system
 * updates or new application releases.
 */
export const getBlueprints: API.OperationMethod<
  GetBlueprintsRequest,
  GetBlueprintsResult,
  GetBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { includeInactive: 0, pageToken: 0, appCategory: 0 },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprints",
})) as any;

export type GetBucketAccessKeysError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the existing access key IDs for the specified Amazon Lightsail bucket.
 *
 * This action does not return the secret access key value of an access key. You can get a
 * secret access key only when you create it from the response of the CreateBucketAccessKey action. If you lose the secret access key, you must create
 * a new access key.
 */
export const getBucketAccessKeys: API.OperationMethod<
  GetBucketAccessKeysRequest,
  GetBucketAccessKeysResult,
  GetBucketAccessKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { bucketName: 0 },
    output: { accessKeys: D.list(o_AccessKey) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAccessKeys",
})) as any;

export type GetBucketBundlesError =
  | AccessDeniedException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that you can apply to a Amazon Lightsail bucket.
 *
 * The bucket bundle specifies the monthly cost, storage quota, and data transfer quota for a
 * bucket.
 *
 * Use the UpdateBucketBundle action to update the
 * bundle for a bucket.
 */
export const getBucketBundles: API.OperationMethod<
  GetBucketBundlesRequest,
  GetBucketBundlesResult,
  GetBucketBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { includeInactive: 0 } },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketBundles",
})) as any;

export type GetBucketMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric for an Amazon Lightsail bucket.
 *
 * Metrics report the utilization of a bucket. View and collect metric data regularly to
 * monitor the number of objects stored in a bucket (including object versions) and the storage
 * space used by those objects.
 */
export const getBucketMetricData: API.OperationMethod<
  GetBucketMetricDataRequest,
  GetBucketMetricDataResult,
  GetBucketMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      bucketName: 0,
      metricName: 0,
      startTime: 0,
      endTime: 0,
      period: 0,
      statistics: 0,
      unit: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketMetricData",
})) as any;

export type GetBucketsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more Amazon Lightsail buckets. The information returned
 * includes the synchronization status of the Amazon Simple Storage Service (Amazon S3)
 * account-level block public access feature for your Lightsail buckets.
 *
 * For more information about buckets, see Buckets in Amazon Lightsail in the Amazon Lightsail Developer
 * Guide.
 */
export const getBuckets: API.OperationMethod<
  GetBucketsRequest,
  GetBucketsResult,
  GetBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      bucketName: 0,
      pageToken: 0,
      includeConnectedResources: 0,
      includeCors: 0,
    },
    output: {
      buckets: D.list(o_Bucket),
      accountLevelBpaSync: { lastSyncedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuckets",
})) as any;

export type GetBundlesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that you can apply to an Amazon Lightsail instance when you create
 * it.
 *
 * A bundle describes the specifications of an instance, such as the monthly cost, amount of
 * memory, the number of vCPUs, amount of storage space, and monthly network data transfer
 * quota.
 *
 * Bundles are referred to as *instance plans* in the Lightsail
 * console.
 */
export const getBundles: API.OperationMethod<
  GetBundlesRequest,
  GetBundlesResult,
  GetBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { includeInactive: 0, pageToken: 0, appCategory: 0 },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBundles",
})) as any;

export type GetCertificatesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more Amazon Lightsail SSL/TLS certificates.
 *
 * To get a summary of a certificate, omit `includeCertificateDetails` from your
 * request. The response will include only the certificate Amazon Resource Name (ARN),
 * certificate name, domain name, and tags.
 */
export const getCertificates: API.OperationMethod<
  GetCertificatesRequest,
  GetCertificatesResult,
  GetCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      certificateStatuses: 0,
      includeCertificateDetails: 0,
      certificateName: 0,
      pageToken: 0,
    },
    output: { certificates: D.list(o_CertificateSummary) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificates",
})) as any;

export type GetCloudFormationStackRecordsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the CloudFormation stack record created as a result of the create cloud
 * formation stack operation.
 *
 * An AWS CloudFormation stack is used to create a new Amazon EC2 instance from an exported Lightsail
 * snapshot.
 */
export const getCloudFormationStackRecords: API.OperationMethod<
  GetCloudFormationStackRecordsRequest,
  GetCloudFormationStackRecordsResult,
  GetCloudFormationStackRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { cloudFormationStackRecords: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFormationStackRecords",
})) as any;

export type GetContactMethodsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the configured contact methods. Specify a protocol in your
 * request to return information about a specific contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 */
export const getContactMethods: API.OperationMethod<
  GetContactMethodsRequest,
  GetContactMethodsResult,
  GetContactMethodsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { protocols: 0 },
    output: { contactMethods: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactMethods",
})) as any;

export type GetContainerAPIMetadataError =
  | AccessDeniedException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about Amazon Lightsail containers, such as the current version of the
 * Lightsail Control (lightsailctl) plugin.
 */
export const getContainerAPIMetadata: API.OperationMethod<
  GetContainerAPIMetadataRequest,
  GetContainerAPIMetadataResult,
  GetContainerAPIMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerAPIMetadata",
})) as any;

export type GetContainerImagesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the container images that are registered to your Amazon Lightsail container
 * service.
 *
 * If you created a deployment on your Lightsail container service that uses container
 * images from a public registry like Docker Hub, those images are not returned as part of this
 * action. Those images are not registered to your Lightsail container service.
 */
export const getContainerImages: API.OperationMethod<
  GetContainerImagesRequest,
  GetContainerImagesResult,
  GetContainerImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0 },
    output: { containerImages: D.list(o_ContainerImage) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerImages",
})) as any;

export type GetContainerLogError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the log events of a container of your Amazon Lightsail container service.
 *
 * If your container service has more than one node (i.e., a scale greater than 1), then the
 * log events that are returned for the specified container are merged from all nodes on your
 * container service.
 *
 * Container logs are retained for a certain amount of time. For more information, see
 * Amazon Lightsail
 * endpoints and quotas in the Amazon Web Services General
 * Reference.
 */
export const getContainerLog: API.OperationMethod<
  GetContainerLogRequest,
  GetContainerLogResult,
  GetContainerLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      containerName: 0,
      startTime: 0,
      endTime: 0,
      filterPattern: 0,
      pageToken: 0,
    },
    output: { logEvents: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerLog",
})) as any;

export type GetContainerServiceDeploymentsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the deployments for your Amazon Lightsail container service
 *
 * A deployment specifies the settings, such as the ports and launch command, of containers
 * that are deployed to your container service.
 *
 * The deployments are ordered by version in ascending order. The newest version is listed at
 * the top of the response.
 *
 * A set number of deployments are kept before the oldest one is replaced with the newest
 * one. For more information, see Amazon Lightsail
 * endpoints and quotas in the Amazon Web Services General
 * Reference.
 */
export const getContainerServiceDeployments: API.OperationMethod<
  GetContainerServiceDeploymentsRequest,
  GetContainerServiceDeploymentsResult,
  GetContainerServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0 },
    output: { deployments: D.list(o_ContainerServiceDeployment) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServiceDeployments",
})) as any;

export type GetContainerServiceMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric of your Amazon Lightsail container
 * service.
 *
 * Metrics report the utilization of your resources. Monitor and collect metric data
 * regularly to maintain the reliability, availability, and performance of your resources.
 */
export const getContainerServiceMetricData: API.OperationMethod<
  GetContainerServiceMetricDataRequest,
  GetContainerServiceMetricDataResult,
  GetContainerServiceMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      metricName: 0,
      startTime: 0,
      endTime: 0,
      period: 0,
      statistics: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServiceMetricData",
})) as any;

export type GetContainerServicePowersError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of powers that can be specified for your Amazon Lightsail container
 * services.
 *
 * The power specifies the amount of memory, the number of vCPUs, and the base price of the
 * container service.
 */
export const getContainerServicePowers: API.OperationMethod<
  GetContainerServicePowersRequest,
  GetContainerServicePowersResult,
  GetContainerServicePowersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServicePowers",
})) as any;

export type GetContainerServicesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more of your Amazon Lightsail container services.
 */
export const getContainerServices: API.OperationMethod<
  GetContainerServicesRequest,
  ContainerServicesListResult,
  GetContainerServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0 },
    output: { containerServices: D.list(o_ContainerService) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServices",
})) as any;

export type GetCostEstimateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Retrieves information about the cost estimate for a specified resource. A cost estimate
 * will not generate for a resource that has been deleted.
 */
export const getCostEstimate: API.OperationMethod<
  GetCostEstimateRequest,
  GetCostEstimateResult,
  GetCostEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, startTime: 0, endTime: 0 },
    output: {
      resourcesBudgetEstimate: D.list({
        costEstimates: D.list({
          resultsByTime: D.list({ timePeriod: { start: D.ts, end: D.ts } }),
        }),
        startTime: D.ts,
        endTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostEstimate",
})) as any;

export type GetDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific block storage disk.
 */
export const getDisk: API.OperationMethod<
  GetDiskRequest,
  GetDiskResult,
  GetDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskName: 0 },
    output: { disk: o_Disk },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDisk",
})) as any;

export type GetDisksError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all block storage disks in your AWS account and region.
 */
export const getDisks: API.OperationMethod<
  GetDisksRequest,
  GetDisksResult,
  GetDisksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { disks: D.list(o_Disk) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDisks",
})) as any;

export type GetDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific block storage disk snapshot.
 */
export const getDiskSnapshot: API.OperationMethod<
  GetDiskSnapshotRequest,
  GetDiskSnapshotResult,
  GetDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { diskSnapshotName: 0 },
    output: { diskSnapshot: o_DiskSnapshot },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiskSnapshot",
})) as any;

export type GetDiskSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all block storage disk snapshots in your AWS account and
 * region.
 */
export const getDiskSnapshots: API.OperationMethod<
  GetDiskSnapshotsRequest,
  GetDiskSnapshotsResult,
  GetDiskSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { diskSnapshots: D.list(o_DiskSnapshot) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiskSnapshots",
})) as any;

export type GetDistributionBundlesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that can be applied to your Amazon Lightsail content delivery network
 * (CDN) distributions.
 *
 * A distribution bundle specifies the monthly network transfer quota and monthly cost of
 * your distribution.
 */
export const getDistributionBundles: API.OperationMethod<
  GetDistributionBundlesRequest,
  GetDistributionBundlesResult,
  GetDistributionBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionBundles",
})) as any;

export type GetDistributionLatestCacheResetError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the timestamp and status of the last cache reset of a specific Amazon Lightsail
 * content delivery network (CDN) distribution.
 */
export const getDistributionLatestCacheReset: API.OperationMethod<
  GetDistributionLatestCacheResetRequest,
  GetDistributionLatestCacheResetResult,
  GetDistributionLatestCacheResetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0 },
    output: { createTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionLatestCacheReset",
})) as any;

export type GetDistributionMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric for an Amazon Lightsail content delivery
 * network (CDN) distribution.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getDistributionMetricData: API.OperationMethod<
  GetDistributionMetricDataRequest,
  GetDistributionMetricDataResult,
  GetDistributionMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      distributionName: 0,
      metricName: 0,
      startTime: 0,
      endTime: 0,
      period: 0,
      unit: 0,
      statistics: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionMetricData",
})) as any;

export type GetDistributionsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more of your Amazon Lightsail content delivery network
 * (CDN) distributions.
 */
export const getDistributions: API.OperationMethod<
  GetDistributionsRequest,
  GetDistributionsResult,
  GetDistributionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0, pageToken: 0 },
    output: { distributions: D.list(o_LightsailDistribution) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributions",
})) as any;

export type GetDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific domain recordset.
 */
export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResult,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0 },
    output: { domain: o_Domain },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
})) as any;

export type GetDomainsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of all domains in the user's account.
 */
export const getDomains: API.OperationMethod<
  GetDomainsRequest,
  GetDomainsResult,
  GetDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { domains: D.list(o_Domain) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomains",
})) as any;

export type GetExportSnapshotRecordsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all export snapshot records created as a result of the export
 * snapshot operation.
 *
 * An export snapshot record can be used to create a new Amazon EC2 instance and its related
 * resources with the CreateCloudFormationStack
 * action.
 */
export const getExportSnapshotRecords: API.OperationMethod<
  GetExportSnapshotRecordsRequest,
  GetExportSnapshotRecordsResult,
  GetExportSnapshotRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: {
      exportSnapshotRecords: D.list({
        createdAt: D.ts,
        sourceInfo: { createdAt: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportSnapshotRecords",
})) as any;

export type GetInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific Amazon Lightsail instance, which is a virtual private
 * server.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResult,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0 },
    output: { instance: o_Instance },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
})) as any;

export type GetInstanceAccessDetailsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns temporary SSH keys you can use to connect to a specific virtual private server, or
 * *instance*.
 *
 * The `get instance access details` operation supports tag-based access control
 * via resource tags applied to the resource identified by `instance name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const getInstanceAccessDetails: API.OperationMethod<
  GetInstanceAccessDetailsRequest,
  GetInstanceAccessDetailsResult,
  GetInstanceAccessDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0, protocol: 0 },
    output: {
      accessDetails: {
        expiresAt: D.ts,
        hostKeys: D.list({
          witnessedAt: D.ts,
          notValidBefore: D.ts,
          notValidAfter: D.ts,
        }),
      },
    },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceAccessDetails",
})) as any;

export type GetInstanceMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points for the specified Amazon Lightsail instance metric, given an
 * instance name.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getInstanceMetricData: API.OperationMethod<
  GetInstanceMetricDataRequest,
  GetInstanceMetricDataResult,
  GetInstanceMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceName: 0,
      metricName: 0,
      period: 0,
      startTime: 0,
      endTime: 0,
      unit: 0,
      statistics: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceMetricData",
})) as any;

export type GetInstancePortStatesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the firewall port states for a specific Amazon Lightsail instance, the IP addresses
 * allowed to connect to the instance through the ports, and the protocol.
 */
export const getInstancePortStates: API.OperationMethod<
  GetInstancePortStatesRequest,
  GetInstancePortStatesResult,
  GetInstancePortStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { instanceName: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstancePortStates",
})) as any;

export type GetInstancesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all Amazon Lightsail virtual private servers, or
 * *instances*.
 */
export const getInstances: API.OperationMethod<
  GetInstancesRequest,
  GetInstancesResult,
  GetInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { instances: D.list(o_Instance) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstances",
})) as any;

export type GetInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific instance snapshot.
 */
export const getInstanceSnapshot: API.OperationMethod<
  GetInstanceSnapshotRequest,
  GetInstanceSnapshotResult,
  GetInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceSnapshotName: 0 },
    output: { instanceSnapshot: o_InstanceSnapshot },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceSnapshot",
})) as any;

export type GetInstanceSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all instance snapshots for the user's account.
 */
export const getInstanceSnapshots: API.OperationMethod<
  GetInstanceSnapshotsRequest,
  GetInstanceSnapshotsResult,
  GetInstanceSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { instanceSnapshots: D.list(o_InstanceSnapshot) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceSnapshots",
})) as any;

export type GetInstanceStateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the state of a specific instance. Works on one instance at a time.
 */
export const getInstanceState: API.OperationMethod<
  GetInstanceStateRequest,
  GetInstanceStateResult,
  GetInstanceStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { instanceName: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceState",
})) as any;

export type GetKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific key pair.
 */
export const getKeyPair: API.OperationMethod<
  GetKeyPairRequest,
  GetKeyPairResult,
  GetKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyPairName: 0 },
    output: { keyPair: o_KeyPair },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyPair",
})) as any;

export type GetKeyPairsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all key pairs in the user's account.
 */
export const getKeyPairs: API.OperationMethod<
  GetKeyPairsRequest,
  GetKeyPairsResult,
  GetKeyPairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0, includeDefaultKeyPair: 0 },
    output: { keyPairs: D.list(o_KeyPair) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyPairs",
})) as any;

export type GetLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the specified Lightsail load balancer.
 */
export const getLoadBalancer: API.OperationMethod<
  GetLoadBalancerRequest,
  GetLoadBalancerResult,
  GetLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0 },
    output: { loadBalancer: o_LoadBalancer },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancer",
})) as any;

export type GetLoadBalancerMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about health metrics for your Lightsail load balancer.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getLoadBalancerMetricData: API.OperationMethod<
  GetLoadBalancerMetricDataRequest,
  GetLoadBalancerMetricDataResult,
  GetLoadBalancerMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      loadBalancerName: 0,
      metricName: 0,
      period: 0,
      startTime: 0,
      endTime: 0,
      unit: 0,
      statistics: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerMetricData",
})) as any;

export type GetLoadBalancersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all load balancers in an account.
 */
export const getLoadBalancers: API.OperationMethod<
  GetLoadBalancersRequest,
  GetLoadBalancersResult,
  GetLoadBalancersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { loadBalancers: D.list(o_LoadBalancer) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancers",
})) as any;

export type GetLoadBalancerTlsCertificatesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the TLS certificates that are associated with the specified
 * Lightsail load balancer.
 *
 * TLS is just an updated, more secure version of Secure Socket Layer (SSL).
 *
 * You can have a maximum of 2 certificates associated with a Lightsail load balancer. One
 * is active and the other is inactive.
 */
export const getLoadBalancerTlsCertificates: API.OperationMethod<
  GetLoadBalancerTlsCertificatesRequest,
  GetLoadBalancerTlsCertificatesResult,
  GetLoadBalancerTlsCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0 },
    output: {
      tlsCertificates: D.list({
        createdAt: D.ts,
        issuedAt: D.ts,
        notAfter: D.ts,
        notBefore: D.ts,
        revokedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerTlsCertificates",
})) as any;

export type GetLoadBalancerTlsPoliciesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of TLS security policies that you can apply to Lightsail load
 * balancers.
 *
 * For more information about load balancer TLS security policies, see Configuring TLS security policies on your Amazon Lightsail load
 * balancers in the *Amazon Lightsail Developer Guide*.
 */
export const getLoadBalancerTlsPolicies: API.OperationMethod<
  GetLoadBalancerTlsPoliciesRequest,
  GetLoadBalancerTlsPoliciesResult,
  GetLoadBalancerTlsPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pageToken: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerTlsPolicies",
})) as any;

export type GetOperationError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific operation. Operations include events such as when you
 * create an instance, allocate a static IP, attach a static IP, and so on.
 */
export const getOperation: API.OperationMethod<
  GetOperationRequest,
  GetOperationResult,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { operationId: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
})) as any;

export type GetOperationsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all operations.
 *
 * Results are returned from oldest to newest, up to a maximum of 200. Results can be paged
 * by making each subsequent call to `GetOperations` use the maximum (last)
 * `statusChangedAt` value from the previous request.
 */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResult,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperations",
})) as any;

export type GetOperationsForResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Gets operations for a specific resource (an instance or a static IP).
 */
export const getOperationsForResource: API.OperationMethod<
  GetOperationsForResourceRequest,
  GetOperationsForResourceResult,
  GetOperationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, pageToken: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperationsForResource",
})) as any;

export type GetRegionsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of all valid regions for Amazon Lightsail. Use the include
 * availability zones parameter to also return the Availability Zones in a
 * region.
 */
export const getRegions: API.OperationMethod<
  GetRegionsRequest,
  GetRegionsResult,
  GetRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      includeAvailabilityZones: 0,
      includeRelationalDatabaseAvailabilityZones: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegions",
})) as any;

export type GetRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific database in Amazon Lightsail.
 */
export const getRelationalDatabase: API.OperationMethod<
  GetRelationalDatabaseRequest,
  GetRelationalDatabaseResult,
  GetRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0 },
    output: { relationalDatabase: o_RelationalDatabase },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabase",
})) as any;

export type GetRelationalDatabaseBlueprintsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of available database blueprints in Amazon Lightsail. A blueprint describes
 * the major engine version of a database.
 *
 * You can use a blueprint ID to create a new database that runs a specific database
 * engine.
 */
export const getRelationalDatabaseBlueprints: API.OperationMethod<
  GetRelationalDatabaseBlueprintsRequest,
  GetRelationalDatabaseBlueprintsResult,
  GetRelationalDatabaseBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pageToken: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseBlueprints",
})) as any;

export type GetRelationalDatabaseBundlesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of bundles that are available in Amazon Lightsail. A bundle describes the
 * performance specifications for a database.
 *
 * You can use a bundle ID to create a new database with explicit performance
 * specifications.
 */
export const getRelationalDatabaseBundles: API.OperationMethod<
  GetRelationalDatabaseBundlesRequest,
  GetRelationalDatabaseBundlesResult,
  GetRelationalDatabaseBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pageToken: 0, includeInactive: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseBundles",
})) as any;

export type GetRelationalDatabaseEventsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of events for a specific database in Amazon Lightsail.
 */
export const getRelationalDatabaseEvents: API.OperationMethod<
  GetRelationalDatabaseEventsRequest,
  GetRelationalDatabaseEventsResult,
  GetRelationalDatabaseEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0, durationInMinutes: 0, pageToken: 0 },
    output: { relationalDatabaseEvents: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseEvents",
})) as any;

export type GetRelationalDatabaseLogEventsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of log events for a database in Amazon Lightsail.
 */
export const getRelationalDatabaseLogEvents: API.OperationMethod<
  GetRelationalDatabaseLogEventsRequest,
  GetRelationalDatabaseLogEventsResult,
  GetRelationalDatabaseLogEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      logStreamName: 0,
      startTime: 0,
      endTime: 0,
      startFromHead: 0,
      pageToken: 0,
    },
    output: { resourceLogEvents: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseLogEvents",
})) as any;

export type GetRelationalDatabaseLogStreamsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of available log streams for a specific database in Amazon Lightsail.
 */
export const getRelationalDatabaseLogStreams: API.OperationMethod<
  GetRelationalDatabaseLogStreamsRequest,
  GetRelationalDatabaseLogStreamsResult,
  GetRelationalDatabaseLogStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { relationalDatabaseName: 0 } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseLogStreams",
})) as any;

export type GetRelationalDatabaseMasterUserPasswordError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the current, previous, or pending versions of the master user password for a
 * Lightsail database.
 *
 * The `GetRelationalDatabaseMasterUserPassword` operation supports tag-based
 * access control via resource tags applied to the resource identified by
 * relationalDatabaseName.
 */
export const getRelationalDatabaseMasterUserPassword: API.OperationMethod<
  GetRelationalDatabaseMasterUserPasswordRequest,
  GetRelationalDatabaseMasterUserPasswordResult,
  GetRelationalDatabaseMasterUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0, passwordVersion: 0 },
    output: { masterUserPassword: D.secret, createdAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseMasterUserPassword",
})) as any;

export type GetRelationalDatabaseMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of the specified metric for a database in Amazon Lightsail.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getRelationalDatabaseMetricData: API.OperationMethod<
  GetRelationalDatabaseMetricDataRequest,
  GetRelationalDatabaseMetricDataResult,
  GetRelationalDatabaseMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      metricName: 0,
      period: 0,
      startTime: 0,
      endTime: 0,
      unit: 0,
      statistics: 0,
    },
    output: { metricData: D.list(o_MetricDatapoint) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseMetricData",
})) as any;

export type GetRelationalDatabaseParametersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all of the runtime parameters offered by the underlying database software, or
 * engine, for a specific database in Amazon Lightsail.
 *
 * In addition to the parameter names and values, this operation returns other information
 * about each parameter. This information includes whether changes require a reboot, whether the
 * parameter is modifiable, the allowed values, and the data types.
 */
export const getRelationalDatabaseParameters: API.OperationMethod<
  GetRelationalDatabaseParametersRequest,
  GetRelationalDatabaseParametersResult,
  GetRelationalDatabaseParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0, pageToken: 0 },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseParameters",
})) as any;

export type GetRelationalDatabasesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all of your databases in Amazon Lightsail.
 */
export const getRelationalDatabases: API.OperationMethod<
  GetRelationalDatabasesRequest,
  GetRelationalDatabasesResult,
  GetRelationalDatabasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { relationalDatabases: D.list(o_RelationalDatabase) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabases",
})) as any;

export type GetRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific database snapshot in Amazon Lightsail.
 */
export const getRelationalDatabaseSnapshot: API.OperationMethod<
  GetRelationalDatabaseSnapshotRequest,
  GetRelationalDatabaseSnapshotResult,
  GetRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseSnapshotName: 0 },
    output: { relationalDatabaseSnapshot: o_RelationalDatabaseSnapshot },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseSnapshot",
})) as any;

export type GetRelationalDatabaseSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all of your database snapshots in Amazon Lightsail.
 */
export const getRelationalDatabaseSnapshots: API.OperationMethod<
  GetRelationalDatabaseSnapshotsRequest,
  GetRelationalDatabaseSnapshotsResult,
  GetRelationalDatabaseSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: {
      relationalDatabaseSnapshots: D.list(o_RelationalDatabaseSnapshot),
    },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseSnapshots",
})) as any;

export type GetSetupHistoryError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns detailed information for five of the most recent `SetupInstanceHttps`
 * requests that were ran on the target instance.
 */
export const getSetupHistory: API.OperationMethod<
  GetSetupHistoryRequest,
  GetSetupHistoryResult,
  GetSetupHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, pageToken: 0 },
    output: {
      setupHistory: D.list({
        resource: { createdAt: D.ts },
        executionDetails: D.list({ dateTime: D.ts }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSetupHistory",
})) as any;

export type GetStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about an Amazon Lightsail static IP.
 */
export const getStaticIp: API.OperationMethod<
  GetStaticIpRequest,
  GetStaticIpResult,
  GetStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { staticIpName: 0 },
    output: { staticIp: o_StaticIp },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticIp",
})) as any;

export type GetStaticIpsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all static IPs in the user's account.
 */
export const getStaticIps: API.OperationMethod<
  GetStaticIpsRequest,
  GetStaticIpsResult,
  GetStaticIpsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pageToken: 0 },
    output: { staticIps: D.list(o_StaticIp) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticIps",
})) as any;

export type ImportKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Imports a public SSH key from a specific key pair.
 */
export const importKeyPair: API.OperationMethod<
  ImportKeyPairRequest,
  ImportKeyPairResult,
  ImportKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { keyPairName: 0, publicKeyBase64: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportKeyPair",
})) as any;

export type IsVpcPeeredError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a Boolean value indicating whether your Lightsail VPC is peered.
 */
export const isVpcPeered: API.OperationMethod<
  IsVpcPeeredRequest,
  IsVpcPeeredResult,
  IsVpcPeeredError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsVpcPeered",
})) as any;

export type OpenInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Opens ports for a specific Amazon Lightsail instance, and specifies the IP addresses
 * allowed to connect to the instance through the ports, and the protocol.
 *
 * The `OpenInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const openInstancePublicPorts: API.OperationMethod<
  OpenInstancePublicPortsRequest,
  OpenInstancePublicPortsResult,
  OpenInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { portInfo: i_PortInfo, instanceName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OpenInstancePublicPorts",
})) as any;

export type PeerVpcError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Peers the Lightsail VPC with the user's default VPC.
 */
export const peerVpc: API.OperationMethod<
  PeerVpcRequest,
  PeerVpcResult,
  PeerVpcError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { operation: o_Operation } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PeerVpc",
})) as any;

export type PutAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates or updates an alarm, and associates it with the specified metric.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 *
 * When this action creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed.
 *
 * When you update an existing alarm, its state is left unchanged, but the update completely
 * overwrites the previous configuration of the alarm. The alarm is then evaluated with the
 * updated configuration.
 *
 * The `put alarm` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const putAlarm: API.OperationMethod<
  PutAlarmRequest,
  PutAlarmResult,
  PutAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      alarmName: 0,
      metricName: 0,
      monitoredResourceName: 0,
      comparisonOperator: 0,
      threshold: 0,
      evaluationPeriods: 0,
      datapointsToAlarm: 0,
      treatMissingData: 0,
      contactProtocols: 0,
      notificationTriggers: 0,
      notificationEnabled: 0,
      tags: D.list(i_Tag),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlarm",
})) as any;

export type PutInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Opens ports for a specific Amazon Lightsail instance, and specifies the IP addresses
 * allowed to connect to the instance through the ports, and the protocol. This action also
 * closes all currently open ports that are not included in the request. Include all of the ports
 * and the protocols you want to open in your `PutInstancePublicPorts`request. Or use
 * the `OpenInstancePublicPorts` action to open ports without closing currently open
 * ports.
 *
 * The `PutInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const putInstancePublicPorts: API.OperationMethod<
  PutInstancePublicPortsRequest,
  PutInstancePublicPortsResult,
  PutInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { portInfos: D.list(i_PortInfo), instanceName: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInstancePublicPorts",
})) as any;

export type RebootInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Restarts a specific instance.
 *
 * The `reboot instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const rebootInstance: API.OperationMethod<
  RebootInstanceRequest,
  RebootInstanceResult,
  RebootInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootInstance",
})) as any;

export type RebootRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Restarts a specific database in Amazon Lightsail.
 *
 * The `reboot relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const rebootRelationalDatabase: API.OperationMethod<
  RebootRelationalDatabaseRequest,
  RebootRelationalDatabaseResult,
  RebootRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootRelationalDatabase",
})) as any;

export type RegisterContainerImageError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Registers a container image to your Amazon Lightsail container service.
 *
 * This action is not required if you install and use the Lightsail Control
 * (lightsailctl) plugin to push container images to your Lightsail container service. For
 * more information, see Pushing and managing container images on your Amazon Lightsail container services
 * in the *Amazon Lightsail Developer Guide*.
 */
export const registerContainerImage: API.OperationMethod<
  RegisterContainerImageRequest,
  RegisterContainerImageResult,
  RegisterContainerImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0, label: 0, digest: 0 },
    output: { containerImage: o_ContainerImage },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterContainerImage",
})) as any;

export type ReleaseStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific static IP from your account.
 */
export const releaseStaticIp: API.OperationMethod<
  ReleaseStaticIpRequest,
  ReleaseStaticIpResult,
  ReleaseStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { staticIpName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleaseStaticIp",
})) as any;

export type ResetDistributionCacheError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes currently cached content from your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After resetting the cache, the next time a content request is made, your distribution
 * pulls, serves, and caches it from the origin.
 */
export const resetDistributionCache: API.OperationMethod<
  ResetDistributionCacheRequest,
  ResetDistributionCacheResult,
  ResetDistributionCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0 },
    output: { createTime: D.ts, operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDistributionCache",
})) as any;

export type SendContactMethodVerificationError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sends a verification request to an email contact method to ensure it's owned by the
 * requester. SMS contact methods don't need to be verified.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 *
 * A verification request is sent to the contact method when you initially create it. Use
 * this action to send another verification request if a previous verification request was
 * deleted, or has expired.
 *
 * Notifications are not sent to an email contact method until after it is verified, and
 * confirmed as valid.
 */
export const sendContactMethodVerification: API.OperationMethod<
  SendContactMethodVerificationRequest,
  SendContactMethodVerificationResult,
  SendContactMethodVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { protocol: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendContactMethodVerification",
})) as any;

export type SetIpAddressTypeError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sets the IP address type for an Amazon Lightsail resource.
 *
 * Use this action to enable dual-stack for a resource, which enables IPv4 and IPv6 for the
 * specified resource. Alternately, you can use this action to disable dual-stack, and enable
 * IPv4 only.
 */
export const setIpAddressType: API.OperationMethod<
  SetIpAddressTypeRequest,
  SetIpAddressTypeResult,
  SetIpAddressTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceType: 0,
      resourceName: 0,
      ipAddressType: 0,
      acceptBundleUpdate: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIpAddressType",
})) as any;

export type SetResourceAccessForBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sets the Amazon Lightsail resources that can access the specified Lightsail
 * bucket.
 *
 * Lightsail buckets currently support setting access for Lightsail instances in the same
 * Amazon Web Services Region.
 */
export const setResourceAccessForBucket: API.OperationMethod<
  SetResourceAccessForBucketRequest,
  SetResourceAccessForBucketResult,
  SetResourceAccessForBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, bucketName: 0, access: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetResourceAccessForBucket",
})) as any;

export type SetupInstanceHttpsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate that secures traffic for your website. After the
 * certificate is created, it is installed on the specified Lightsail instance.
 *
 * If you provide more than one domain name in the request, at least one name must be less
 * than or equal to 63 characters in length.
 */
export const setupInstanceHttps: API.OperationMethod<
  SetupInstanceHttpsRequest,
  SetupInstanceHttpsResult,
  SetupInstanceHttpsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceName: 0,
      emailAddress: 0,
      domainNames: 0,
      certificateProvider: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetupInstanceHttps",
})) as any;

export type StartGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Initiates a graphical user interface (GUI) session that’s used to access a virtual
 * computer’s operating system and application. The session will be active for 1 hour. Use this
 * action to resume the session after it expires.
 */
export const startGUISession: API.OperationMethod<
  StartGUISessionRequest,
  StartGUISessionResult,
  StartGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGUISession",
})) as any;

export type StartInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Starts a specific Amazon Lightsail instance from a stopped state. To restart an instance,
 * use the `reboot instance` operation.
 *
 * When you start a stopped instance, Lightsail assigns a new public IP address to the
 * instance. To use the same IP address after stopping and starting an instance, create a
 * static IP address and attach it to the instance. For more information, see the Amazon Lightsail Developer Guide.
 *
 * The `start instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const startInstance: API.OperationMethod<
  StartInstanceRequest,
  StartInstanceResult,
  StartInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstance",
})) as any;

export type StartRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Starts a specific database from a stopped state in Amazon Lightsail. To restart a database,
 * use the `reboot relational database` operation.
 *
 * The `start relational database` operation supports tag-based access control via
 * resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const startRelationalDatabase: API.OperationMethod<
  StartRelationalDatabaseRequest,
  StartRelationalDatabaseResult,
  StartRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRelationalDatabase",
})) as any;

export type StopGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Terminates a web-based Amazon DCV session that’s used to access a virtual computer’s
 * operating system or application. The session will close and any unsaved data will be
 * lost.
 */
export const stopGUISession: API.OperationMethod<
  StopGUISessionRequest,
  StopGUISessionResult,
  StopGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGUISession",
})) as any;

export type StopInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Stops a specific Amazon Lightsail instance that is currently running.
 *
 * When you start a stopped instance, Lightsail assigns a new public IP address to the
 * instance. To use the same IP address after stopping and starting an instance, create a
 * static IP address and attach it to the instance. For more information, see the Amazon Lightsail Developer Guide.
 *
 * The `stop instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const stopInstance: API.OperationMethod<
  StopInstanceRequest,
  StopInstanceResult,
  StopInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0, force: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInstance",
})) as any;

export type StopRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Stops a specific database that is currently running in Amazon Lightsail.
 *
 * If you don't manually start your database instance after it has been stopped for seven
 * consecutive days, Amazon Lightsail automatically starts it for you. This action helps ensure
 * that your database instance doesn't fall behind on any required maintenance updates.
 *
 * The `stop relational database` operation supports tag-based access control via
 * resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const stopRelationalDatabase: API.OperationMethod<
  StopRelationalDatabaseRequest,
  StopRelationalDatabaseResult,
  StopRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { relationalDatabaseName: 0, relationalDatabaseSnapshotName: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRelationalDatabase",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Adds one or more tags to the specified Amazon Lightsail resource. Each resource can have a
 * maximum of 50 tags. Each tag consists of a key and an optional value. Tag keys must be unique
 * per resource. For more information about tags, see the Amazon Lightsail Developer Guide.
 *
 * The `tag resource` operation supports tag-based access control via request tags
 * and resource tags applied to the resource identified by `resource name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, resourceArn: 0, tags: D.list(i_Tag) },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Tests an alarm by displaying a banner on the Amazon Lightsail console. If a notification
 * trigger is configured for the specified alarm, the test also sends a notification to the
 * notification protocol (`Email` and/or `SMS`) configured for the
 * alarm.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const testAlarm: API.OperationMethod<
  TestAlarmRequest,
  TestAlarmResult,
  TestAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { alarmName: 0, state: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAlarm",
})) as any;

export type UnpeerVpcError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Unpeers the Lightsail VPC from the user's default VPC.
 */
export const unpeerVpc: API.OperationMethod<
  UnpeerVpcRequest,
  UnpeerVpcResult,
  UnpeerVpcError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { operation: o_Operation } },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnpeerVpc",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified set of tag keys and their values from the specified Amazon Lightsail
 * resource.
 *
 * The `untag resource` operation supports tag-based access control via request
 * tags and resource tags applied to the resource identified by `resource name`. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceName: 0, resourceArn: 0, tagKeys: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates an existing Amazon Lightsail bucket.
 *
 * Use this action to update the configuration of an existing bucket, such as versioning,
 * public accessibility, and the Amazon Web Services accounts that can access the bucket.
 */
export const updateBucket: API.OperationMethod<
  UpdateBucketRequest,
  UpdateBucketResult,
  UpdateBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      bucketName: 0,
      accessRules: { getObject: 0, allowPublicOverrides: 0 },
      versioning: 0,
      readonlyAccessAccounts: 0,
      accessLogConfig: { enabled: 0, destination: 0, prefix: 0 },
      cors: {
        rules: D.list({
          id: 0,
          allowedMethods: 0,
          allowedOrigins: 0,
          allowedHeaders: 0,
          exposeHeaders: 0,
          maxAgeSeconds: 0,
        }),
      },
    },
    output: { bucket: o_Bucket, operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucket",
})) as any;

export type UpdateBucketBundleError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the bundle, or storage plan, of an existing Amazon Lightsail bucket.
 *
 * A bucket bundle specifies the monthly cost, storage space, and data transfer quota for a
 * bucket. You can update a bucket's bundle only one time within a monthly Amazon Web Services
 * billing cycle. To determine if you can update a bucket's bundle, use the GetBuckets action. The
 * `ableToUpdateBundle` parameter in the response will indicate whether you can
 * currently update a bucket's bundle.
 *
 * Update a bucket's bundle if it's consistently going over its storage space or data
 * transfer quota, or if a bucket's usage is consistently in the lower range of its storage space
 * or data transfer quota. Due to the unpredictable usage fluctuations that a bucket might
 * experience, we strongly recommend that you update a bucket's bundle only as a long-term
 * strategy, instead of as a short-term, monthly cost-cutting measure. Choose a bucket bundle
 * that will provide the bucket with ample storage space and data transfer for a long time to
 * come.
 */
export const updateBucketBundle: API.OperationMethod<
  UpdateBucketBundleRequest,
  UpdateBucketBundleResult,
  UpdateBucketBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { bucketName: 0, bundleId: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucketBundle",
})) as any;

export type UpdateContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the configuration of your Amazon Lightsail container service, such as its power,
 * scale, and public domain names.
 */
export const updateContainerService: API.OperationMethod<
  UpdateContainerServiceRequest,
  UpdateContainerServiceResult,
  UpdateContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      power: 0,
      scale: 0,
      isDisabled: 0,
      publicDomainNames: 0,
      privateRegistryAccess: i_PrivateRegistryAccessRequest,
    },
    output: { containerService: o_ContainerService },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerService",
})) as any;

export type UpdateDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates an existing Amazon Lightsail content delivery network (CDN) distribution.
 *
 * Use this action to update the configuration of your existing distribution.
 */
export const updateDistribution: API.OperationMethod<
  UpdateDistributionRequest,
  UpdateDistributionResult,
  UpdateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      distributionName: 0,
      origin: i_InputOrigin,
      defaultCacheBehavior: i_CacheBehavior,
      cacheBehaviorSettings: i_CacheSettings,
      cacheBehaviors: D.list(i_CacheBehaviorPerPath),
      isEnabled: 0,
      viewerMinimumTlsProtocolVersion: 0,
      certificateName: 0,
      useDefaultCertificate: 0,
    },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistribution",
})) as any;

export type UpdateDistributionBundleError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the bundle of your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * A distribution bundle specifies the monthly network transfer quota and monthly cost of
 * your distribution.
 *
 * Update your distribution's bundle if your distribution is going over its monthly network
 * transfer quota and is incurring an overage fee.
 *
 * You can update your distribution's bundle only one time within your monthly Amazon Web Services billing cycle. To determine if you can update your distribution's bundle, use the
 * `GetDistributions` action. The `ableToUpdateBundle` parameter in the
 * result will indicate whether you can currently update your distribution's bundle.
 */
export const updateDistributionBundle: API.OperationMethod<
  UpdateDistributionBundleRequest,
  UpdateDistributionBundleResult,
  UpdateDistributionBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { distributionName: 0, bundleId: 0 },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistributionBundle",
})) as any;

export type UpdateDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates a domain recordset after it is created.
 *
 * The `update domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const updateDomainEntry: API.OperationMethod<
  UpdateDomainEntryRequest,
  UpdateDomainEntryResult,
  UpdateDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domainName: 0, domainEntry: i_DomainEntry },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainEntry",
})) as any;

export type UpdateInstanceMetadataOptionsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Modifies the Amazon Lightsail instance metadata parameters on a running or stopped
 * instance. When you modify the parameters on a running instance, the `GetInstance`
 * or `GetInstances` API operation initially responds with a state of
 * `pending`. After the parameter modifications are successfully applied, the state
 * changes to `applied` in subsequent `GetInstance` or
 * `GetInstances` API calls. For more information, see Use IMDSv2 with an Amazon Lightsail instance in the *Amazon Lightsail Developer Guide*.
 */
export const updateInstanceMetadataOptions: API.OperationMethod<
  UpdateInstanceMetadataOptionsRequest,
  UpdateInstanceMetadataOptionsResult,
  UpdateInstanceMetadataOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceName: 0,
      httpTokens: 0,
      httpEndpoint: 0,
      httpPutResponseHopLimit: 0,
      httpProtocolIpv6: 0,
    },
    output: { operation: o_Operation },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceMetadataOptions",
})) as any;

export type UpdateLoadBalancerAttributeError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the specified attribute for a load balancer. You can only update one attribute at
 * a time.
 *
 * The `update load balancer attribute` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const updateLoadBalancerAttribute: API.OperationMethod<
  UpdateLoadBalancerAttributeRequest,
  UpdateLoadBalancerAttributeResult,
  UpdateLoadBalancerAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { loadBalancerName: 0, attributeName: 0, attributeValue: 0 },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoadBalancerAttribute",
})) as any;

export type UpdateRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allows the update of one or more attributes of a database in Amazon Lightsail.
 *
 * Updates are applied immediately, or in cases where the updates could result in an outage,
 * are applied during the database's predefined maintenance window.
 *
 * The `update relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const updateRelationalDatabase: API.OperationMethod<
  UpdateRelationalDatabaseRequest,
  UpdateRelationalDatabaseResult,
  UpdateRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      masterUserPassword: 0,
      rotateMasterUserPassword: 0,
      preferredBackupWindow: 0,
      preferredMaintenanceWindow: 0,
      enableBackupRetention: 0,
      disableBackupRetention: 0,
      publiclyAccessible: 0,
      applyImmediately: 0,
      caCertificateIdentifier: 0,
      relationalDatabaseBlueprintId: 0,
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelationalDatabase",
})) as any;

export type UpdateRelationalDatabaseParametersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allows the update of one or more parameters of a database in Amazon Lightsail.
 *
 * Parameter updates don't cause outages; therefore, their application is not subject to the
 * preferred maintenance window. However, there are two ways in which parameter updates are
 * applied: `dynamic` or `pending-reboot`. Parameters marked with a
 * `dynamic` apply type are applied immediately. Parameters marked with a
 * `pending-reboot` apply type are applied only after the database is rebooted using
 * the `reboot relational database` operation.
 *
 * The `update relational database parameters` operation supports tag-based access
 * control via resource tags applied to the resource identified by relationalDatabaseName. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const updateRelationalDatabaseParameters: API.OperationMethod<
  UpdateRelationalDatabaseParametersRequest,
  UpdateRelationalDatabaseParametersResult,
  UpdateRelationalDatabaseParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      relationalDatabaseName: 0,
      parameters: D.list({
        allowedValues: 0,
        applyMethod: 0,
        applyType: 0,
        dataType: 0,
        description: 0,
        isModifiable: 0,
        parameterName: 0,
        parameterValue: 0,
      }),
    },
    output: { operations: D.list(o_Operation) },
  },
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelationalDatabaseParameters",
})) as any;

const i_AddOnRequest: D.LazyStruct = () => ({
  addOnType: 0,
  autoSnapshotAddOnRequest: { snapshotTimeOfDay: 0 },
  stopInstanceOnIdleRequest: { threshold: 0, duration: 0 },
});
const i_CacheBehavior: D.LazyStruct = () => ({ behavior: 0 });
const i_CacheBehaviorPerPath: D.LazyStruct = () => ({ path: 0, behavior: 0 });
const i_CacheSettings: D.LazyStruct = () => ({
  defaultTTL: 0,
  minimumTTL: 0,
  maximumTTL: 0,
  allowedHTTPMethods: 0,
  cachedHTTPMethods: 0,
  forwardedCookies: { option: 0, cookiesAllowList: 0 },
  forwardedHeaders: { option: 0, headersAllowList: 0 },
  forwardedQueryStrings: { option: 0, queryStringsAllowList: 0 },
});
const i_Container: D.LazyStruct = () => ({
  image: 0,
  command: 0,
  environment: 0,
  ports: 0,
});
const i_DomainEntry: D.LazyStruct = () => ({
  id: 0,
  name: 0,
  target: 0,
  isAlias: 0,
  type: 0,
  options: 0,
});
const i_EndpointRequest: D.LazyStruct = () => ({
  containerName: 0,
  containerPort: 0,
  healthCheck: {
    healthyThreshold: 0,
    unhealthyThreshold: 0,
    timeoutSeconds: 0,
    intervalSeconds: 0,
    path: 0,
    successCodes: 0,
  },
});
const i_InputOrigin: D.LazyStruct = () => ({
  name: 0,
  regionName: 0,
  protocolPolicy: 0,
  responseTimeout: 0,
  ipAddressType: 0,
});
const i_PortInfo: D.LazyStruct = () => ({
  fromPort: 0,
  toPort: 0,
  protocol: 0,
  cidrs: 0,
  ipv6Cidrs: 0,
  cidrListAliases: 0,
});
const i_PrivateRegistryAccessRequest: D.LazyStruct = () => ({
  ecrImagePullerRole: { isActive: 0 },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_AccessKey: D.LazyStruct = () => ({
  accessKeyId: D.secret,
  createdAt: D.ts,
  lastUsed: { lastUsedDate: D.ts },
});
const o_Bucket: D.LazyStruct = () => ({ createdAt: D.ts });
const o_CertificateSummary: D.LazyStruct = () => ({
  certificateDetail: {
    createdAt: D.ts,
    issuedAt: D.ts,
    notBefore: D.ts,
    notAfter: D.ts,
    renewalSummary: { updatedAt: D.ts },
    revokedAt: D.ts,
  },
});
const o_ContainerImage: D.LazyStruct = () => ({ createdAt: D.ts });
const o_ContainerService: D.LazyStruct = () => ({
  createdAt: D.ts,
  currentDeployment: o_ContainerServiceDeployment,
  nextDeployment: o_ContainerServiceDeployment,
});
const o_ContainerServiceDeployment: D.LazyStruct = () => ({ createdAt: D.ts });
const o_Disk: D.LazyStruct = () => ({ createdAt: D.ts });
const o_DiskSnapshot: D.LazyStruct = () => ({ createdAt: D.ts });
const o_Domain: D.LazyStruct = () => ({ createdAt: D.ts });
const o_Instance: D.LazyStruct = () => ({
  createdAt: D.ts,
  hardware: { disks: D.list(o_Disk) },
});
const o_InstanceSnapshot: D.LazyStruct = () => ({
  createdAt: D.ts,
  fromAttachedDisks: D.list(o_Disk),
});
const o_KeyPair: D.LazyStruct = () => ({ createdAt: D.ts });
const o_LightsailDistribution: D.LazyStruct = () => ({ createdAt: D.ts });
const o_LoadBalancer: D.LazyStruct = () => ({ createdAt: D.ts });
const o_MetricDatapoint: D.LazyStruct = () => ({ timestamp: D.ts });
const o_Operation: D.LazyStruct = () => ({
  createdAt: D.ts,
  statusChangedAt: D.ts,
});
const o_RelationalDatabase: D.LazyStruct = () => ({
  createdAt: D.ts,
  latestRestorableTime: D.ts,
  pendingMaintenanceActions: D.list({ currentApplyDate: D.ts }),
});
const o_RelationalDatabaseSnapshot: D.LazyStruct = () => ({ createdAt: D.ts });
const o_StaticIp: D.LazyStruct = () => ({ createdAt: D.ts });
