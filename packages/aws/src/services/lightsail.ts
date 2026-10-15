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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lightsail",
  serviceShapeName: "Lightsail_20161128",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lightsail" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-11-28");
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
              `https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lightsail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://lightsail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://lightsail.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccountSetupInProgressException
  extends /*@__PURE__*/ S.TaggedError<AccountSetupInProgressException>()(
    "AccountSetupInProgressException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(428),
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OperationFailureException
  extends /*@__PURE__*/ S.TaggedError<OperationFailureException>()(
    "OperationFailureException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RegionSetupInProgressException
  extends /*@__PURE__*/ S.TaggedError<RegionSetupInProgressException>()(
    "RegionSetupInProgressException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(428),
  ) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UnauthenticatedException
  extends /*@__PURE__*/ S.TaggedError<UnauthenticatedException>()(
    "UnauthenticatedException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      docs: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      tip: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
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
  | "GetProfile"
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
export type NetworkProtocol = "tcp" | "all" | "udp" | "icmp" | "icmpv6" | (string & {});
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
export type DnsRecordCreationStateCode = "SUCCEEDED" | "STARTED" | "FAILED" | (string & {});
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
export type PortInfoSourceType = "DEFAULT" | "INSTANCE" | "NONE" | "CLOSED" | (string & {});
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
export type ContainerServicePublicDomains = { [key: string]: string[] | undefined };
export type ContainerName = string;
export type Environment = { [key: string]: string | undefined };
export type ContainerServiceProtocol = "HTTP" | "HTTPS" | "TCP" | "UDP" | (string & {});
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
export type OriginProtocolPolicyEnum = "http-only" | "https-only" | (string & {});
export type OriginIpAddressTypeEnum = "ipv4" | "ipv6" | "dualstack" | (string & {});
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
export interface DistributionCustomErrorResponse {
  errorCode?: number;
  responseCode?: string;
  responsePagePath?: string;
  errorCachingMinTTL?: number;
}
export type DistributionCustomErrorResponseList = DistributionCustomErrorResponse[];
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
  enablePrivateOriginAccess?: boolean;
  defaultRootObject?: string;
  customErrorResponses?: DistributionCustomErrorResponse[];
}
export interface Origin {
  name?: string;
  resourceType?: ResourceType;
  regionName?: RegionName;
  protocolPolicy?: OriginProtocolPolicyEnum;
  responseTimeout?: number;
  ipAddressType?: OriginIpAddressTypeEnum;
  isPrivateOriginAccessEnabled?: boolean;
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
  defaultRootObject?: string;
  customErrorResponses?: DistributionCustomErrorResponse[];
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
export type TreatMissingData = "breaching" | "notBreaching" | "ignore" | "missing" | (string & {});
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
  | "FreeableMemory"
  | "SwapUsage"
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
export type AutoSnapshotStatus = "Success" | "Failed" | "InProgress" | "NotFound" | (string & {});
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
export type BucketMetricName = "BucketSizeBytes" | "NumberOfObjects" | (string & {});
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
export type CloudFormationStackRecordSourceType = "ExportSnapshotRecord" | (string & {});
export interface CloudFormationStackRecordSourceInfo {
  resourceType?: CloudFormationStackRecordSourceType;
  name?: string;
  arn?: string;
}
export type CloudFormationStackRecordSourceInfoList = CloudFormationStackRecordSourceInfo[];
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
export type ContactMethodStatus = "PendingVerification" | "Valid" | "Invalid" | (string & {});
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
export type ContainerServiceMetadataEntry = { [key: string]: string | undefined };
export type ContainerServiceMetadataEntryList = { [key: string]: string | undefined }[];
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
export type ContainerServiceMetricName = "CPUUtilization" | "MemoryUtilization" | (string & {});
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
export type PricingUnit = "GB" | "Hrs" | "GB-Mo" | "Bundles" | "Queries" | (string & {});
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
export type DiskState = "pending" | "error" | "available" | "in-use" | "unknown" | (string & {});
export type AutoMountStatus = "Failed" | "Pending" | "Mounted" | "NotMounted" | (string & {});
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
export type DiskSnapshotState = "pending" | "completed" | "error" | "unknown" | (string & {});
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
export type ExportSnapshotRecordSourceType = "InstanceSnapshot" | "DiskSnapshot" | (string & {});
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
export type InstanceSnapshotState = "pending" | "error" | "available" | (string & {});
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
export type LoadBalancerTlsCertificateSummaryList = LoadBalancerTlsCertificateSummary[];
export type LoadBalancerAttributeName =
  | "HealthCheckPath"
  | "SessionStickinessEnabled"
  | "SessionStickiness_LB_CookieDurationSeconds"
  | "HttpsRedirectionEnabled"
  | "TlsPolicyName"
  | (string & {});
export type LoadBalancerConfigurationOptions = { [key in LoadBalancerAttributeName]?: string };
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
export interface GetProfileRequest {}
export type ProfileType = "Lightsailor" | "LightsailPartner" | (string & {});
export type TierName = "Essential" | "Growth" | "Accelerate" | "Premier" | (string & {});
export type PartnerStatus = "Active" | "Suspended" | (string & {});
export interface PartnerInfo {
  enrolledAt: Date;
  tierName?: TierName;
  status: PartnerStatus;
}
export interface GetProfileResult {
  profileType: ProfileType;
  partner?: PartnerInfo;
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
const Region = /*@__PURE__*/ __L.at(__c176, 2) as any as S.Schema<Region>;
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
export type RelationalDatabasePasswordVersion = "CURRENT" | "PREVIOUS" | "PENDING" | (string & {});
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
  | "FreeableMemory"
  | "SwapUsage"
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
  enablePrivateOriginAccess?: boolean;
  defaultRootObject?: string;
  customErrorResponses?: DistributionCustomErrorResponse[];
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
  input: __S(2768, __c173, 0) as any as S.Schema<AllocateStaticIpRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<AllocateStaticIpResult>,
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
}));

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
  input: __S(3072, __c192, 0) as any as S.Schema<AttachCertificateToDistributionRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<AttachCertificateToDistributionResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AttachDiskRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<AttachDiskResult>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<AttachInstancesToLoadBalancerRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<AttachInstancesToLoadBalancerResult>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<AttachLoadBalancerTlsCertificateRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<AttachLoadBalancerTlsCertificateResult>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<AttachStaticIpRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<AttachStaticIpResult>,
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
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<CloseInstancePublicPortsRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<CloseInstancePublicPortsResult>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<CopySnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CopySnapshotResult>,
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
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<CreateBucketRequest>,
  output: __S(1232, __c77, 0) as any as S.Schema<CreateBucketResult>,
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
}));

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
  input: __S(1440, __c90, 0) as any as S.Schema<CreateBucketAccessKeyRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<CreateBucketAccessKeyResult>,
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
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<CreateCertificateRequest>,
  output: __S(1473, __c92, 1) as any as S.Schema<CreateCertificateResult>,
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
}));

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
  input: __S(1522, __c95, 2) as any as S.Schema<CreateCloudFormationStackRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateCloudFormationStackResult>,
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
}));

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
  input: __S(1536, __c96, 0) as any as S.Schema<CreateContactMethodRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateContactMethodResult>,
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
}));

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
  input: __S(1553, __c97, 1) as any as S.Schema<CreateContainerServiceRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<CreateContainerServiceResult>,
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
}));

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
  input: __S(1664, __c104, 0) as any as S.Schema<CreateContainerServiceDeploymentRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<CreateContainerServiceDeploymentResult>,
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
}));

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
  input: __S(1680, __c105, 0) as any as S.Schema<CreateContainerServiceRegistryLoginRequest>,
  output: __S(1682, __c105, 2) as any as S.Schema<CreateContainerServiceRegistryLoginResult>,
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
}));

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
  input: __S(1696, __c106, 0) as any as S.Schema<CreateDiskRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateDiskResult>,
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
}));

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
  input: __S(1744, __c109, 0) as any as S.Schema<CreateDiskFromSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateDiskFromSnapshotResult>,
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
}));

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
  input: __S(1760, __c110, 0) as any as S.Schema<CreateDiskSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateDiskSnapshotResult>,
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
}));

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
  input: __S(1776, __c111, 0) as any as S.Schema<CreateDistributionRequest>,
  output: __S(1777, __c111, 1) as any as S.Schema<CreateDistributionResult>,
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
}));

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
  input: __S(1856, __c116, 0) as any as S.Schema<CreateDomainRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<CreateDomainResult>,
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
}));

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
  input: __S(1872, __c117, 0) as any as S.Schema<CreateDomainEntryRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<CreateDomainEntryResult>,
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
}));

export type CreateGUISessionAccessDetailsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates two URLs that are used to access a virtual computer's graphical user interface
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
  input: __S(1904, __c119, 0) as any as S.Schema<CreateGUISessionAccessDetailsRequest>,
  output: __S(1907, __c119, 3) as any as S.Schema<CreateGUISessionAccessDetailsResult>,
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
}));

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
  input: __S(1920, __c120, 0) as any as S.Schema<CreateInstancesRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateInstancesResult>,
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
}));

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
  input: __S(1939, __c121, 3) as any as S.Schema<CreateInstancesFromSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateInstancesFromSnapshotResult>,
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
}));

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
  input: __S(1952, __c122, 0) as any as S.Schema<CreateInstanceSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateInstanceSnapshotResult>,
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
}));

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
  input: __S(1968, __c123, 0) as any as S.Schema<CreateKeyPairRequest>,
  output: __S(1969, __c123, 1) as any as S.Schema<CreateKeyPairResult>,
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
}));

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
  input: __S(2000, __c125, 0) as any as S.Schema<CreateLoadBalancerRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateLoadBalancerResult>,
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
}));

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
  input: __S(2016, __c126, 0) as any as S.Schema<CreateLoadBalancerTlsCertificateRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateLoadBalancerTlsCertificateResult>,
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
}));

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
  input: __S(2032, __c127, 0) as any as S.Schema<CreateRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateRelationalDatabaseResult>,
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
}));

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
  input: __S(2048, __c128, 0) as any as S.Schema<CreateRelationalDatabaseFromSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateRelationalDatabaseFromSnapshotResult>,
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
}));

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
  input: __S(2064, __c129, 0) as any as S.Schema<CreateRelationalDatabaseSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<CreateRelationalDatabaseSnapshotResult>,
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
}));

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
  input: __S(2080, __c130, 0) as any as S.Schema<DeleteAlarmRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteAlarmResult>,
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
}));

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
  input: __S(2096, __c131, 0) as any as S.Schema<DeleteAutoSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteAutoSnapshotResult>,
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
}));

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
  input: __S(2112, __c132, 0) as any as S.Schema<DeleteBucketRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteBucketResult>,
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
}));

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
  input: __S(2128, __c133, 0) as any as S.Schema<DeleteBucketAccessKeyRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteBucketAccessKeyResult>,
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
}));

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
  input: __S(2144, __c134, 0) as any as S.Schema<DeleteCertificateRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteCertificateResult>,
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
}));

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
  input: __S(2160, __c135, 0) as any as S.Schema<DeleteContactMethodRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteContactMethodResult>,
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
}));

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
  input: __S(2176, __c136, 0) as any as S.Schema<DeleteContainerImageRequest>,
  output: __S(2192, __c137, 0) as any as S.Schema<DeleteContainerImageResult>,
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
}));

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
  input: __S(2208, __c138, 0) as any as S.Schema<DeleteContainerServiceRequest>,
  output: __S(2192, __c137, 0) as any as S.Schema<DeleteContainerServiceResult>,
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
}));

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
  input: __S(2224, __c139, 0) as any as S.Schema<DeleteDiskRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteDiskResult>,
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
}));

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
  input: __S(2240, __c140, 0) as any as S.Schema<DeleteDiskSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteDiskSnapshotResult>,
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
}));

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
  input: __S(2256, __c141, 0) as any as S.Schema<DeleteDistributionRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<DeleteDistributionResult>,
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
}));

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
  input: __S(2272, __c142, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<DeleteDomainResult>,
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
}));

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
  input: __S(2288, __c143, 0) as any as S.Schema<DeleteDomainEntryRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<DeleteDomainEntryResult>,
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
}));

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
  input: __S(2304, __c144, 0) as any as S.Schema<DeleteInstanceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteInstanceResult>,
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
}));

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
  input: __S(2320, __c145, 0) as any as S.Schema<DeleteInstanceSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteInstanceSnapshotResult>,
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
}));

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
  input: __S(2336, __c146, 0) as any as S.Schema<DeleteKeyPairRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<DeleteKeyPairResult>,
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
}));

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
  input: __S(2352, __c147, 0) as any as S.Schema<DeleteKnownHostKeysRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteKnownHostKeysResult>,
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
}));

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
  input: __S(2368, __c148, 0) as any as S.Schema<DeleteLoadBalancerRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteLoadBalancerResult>,
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
}));

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
  input: __S(2384, __c149, 0) as any as S.Schema<DeleteLoadBalancerTlsCertificateRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteLoadBalancerTlsCertificateResult>,
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
}));

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
  input: __S(2400, __c150, 0) as any as S.Schema<DeleteRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteRelationalDatabaseResult>,
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
}));

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
  input: __S(2416, __c151, 0) as any as S.Schema<DeleteRelationalDatabaseSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DeleteRelationalDatabaseSnapshotResult>,
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
}));

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
  input: __S(2432, __c152, 0) as any as S.Schema<DetachCertificateFromDistributionRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<DetachCertificateFromDistributionResult>,
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
}));

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
  input: __S(2448, __c153, 0) as any as S.Schema<DetachDiskRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DetachDiskResult>,
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
}));

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
  input: __S(2464, __c154, 0) as any as S.Schema<DetachInstancesFromLoadBalancerRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DetachInstancesFromLoadBalancerResult>,
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
}));

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
  input: __S(2480, __c155, 0) as any as S.Schema<DetachStaticIpRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DetachStaticIpResult>,
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
}));

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
  input: __S(2496, __c156, 0) as any as S.Schema<DisableAddOnRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<DisableAddOnResult>,
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
}));

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
  input: __S(2512, __c157, 0) as any as S.Schema<DownloadDefaultKeyPairRequest>,
  output: __S(2513, __c157, 1) as any as S.Schema<DownloadDefaultKeyPairResult>,
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
}));

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
  input: __S(2528, __c158, 0) as any as S.Schema<EnableAddOnRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<EnableAddOnResult>,
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
}));

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
  input: __S(2544, __c159, 0) as any as S.Schema<ExportSnapshotRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<ExportSnapshotResult>,
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
}));

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
  input: __S(2560, __c160, 0) as any as S.Schema<GetActiveNamesRequest>,
  output: __S(2561, __c160, 1) as any as S.Schema<GetActiveNamesResult>,
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
}));

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
  input: __S(2576, __c161, 0) as any as S.Schema<GetAlarmsRequest>,
  output: __S(2580, __c161, 4) as any as S.Schema<GetAlarmsResult>,
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
}));

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
  input: __S(2592, __c162, 0) as any as S.Schema<GetAutoSnapshotsRequest>,
  output: __S(2597, __c162, 5) as any as S.Schema<GetAutoSnapshotsResult>,
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
}));

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
  input: __S(2608, __c163, 0) as any as S.Schema<GetBlueprintsRequest>,
  output: __S(2611, __c163, 3) as any as S.Schema<GetBlueprintsResult>,
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
}));

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
  input: __S(2624, __c164, 0) as any as S.Schema<GetBucketAccessKeysRequest>,
  output: __S(2626, __c164, 2) as any as S.Schema<GetBucketAccessKeysResult>,
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
}));

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
  input: __S(2640, __c165, 0) as any as S.Schema<GetBucketBundlesRequest>,
  output: __S(2643, __c165, 3) as any as S.Schema<GetBucketBundlesResult>,
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
}));

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
  input: __S(2656, __c166, 0) as any as S.Schema<GetBucketMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetBucketMetricDataResult>,
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
}));

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
  input: __S(2688, __c168, 0) as any as S.Schema<GetBucketsRequest>,
  output: __S(2691, __c168, 3) as any as S.Schema<GetBucketsResult>,
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
}));

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
  input: __S(2704, __c169, 0) as any as S.Schema<GetBundlesRequest>,
  output: __S(2707, __c169, 3) as any as S.Schema<GetBundlesResult>,
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
}));

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
  input: __S(2720, __c170, 0) as any as S.Schema<GetCertificatesRequest>,
  output: __S(2722, __c170, 2) as any as S.Schema<GetCertificatesResult>,
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
}));

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
  input: __S(2736, __c171, 0) as any as S.Schema<GetCloudFormationStackRecordsRequest>,
  output: __S(2741, __c171, 5) as any as S.Schema<GetCloudFormationStackRecordsResult>,
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
}));

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
  input: __S(2864, __c179, 0) as any as S.Schema<GetContactMethodsRequest>,
  output: __S(2867, __c179, 3) as any as S.Schema<GetContactMethodsResult>,
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
}));

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
  input: __S(2880, __c180, 0) as any as S.Schema<GetContainerAPIMetadataRequest>,
  output: __S(2882, __c180, 2) as any as S.Schema<GetContainerAPIMetadataResult>,
  errors: [
    AccessDeniedException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerAPIMetadata",
}));

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
  input: __S(2896, __c181, 0) as any as S.Schema<GetContainerImagesRequest>,
  output: __S(2898, __c181, 2) as any as S.Schema<GetContainerImagesResult>,
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
}));

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
  input: __S(2928, __c183, 0) as any as S.Schema<GetContainerLogRequest>,
  output: __S(2929, __c183, 1) as any as S.Schema<GetContainerLogResult>,
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
}));

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
  input: __S(2960, __c185, 0) as any as S.Schema<GetContainerServiceDeploymentsRequest>,
  output: __S(2962, __c185, 2) as any as S.Schema<GetContainerServiceDeploymentsResult>,
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
}));

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
  input: __S(2976, __c186, 0) as any as S.Schema<GetContainerServiceMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetContainerServiceMetricDataResult>,
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
}));

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
  input: __S(2992, __c187, 0) as any as S.Schema<GetContainerServicePowersRequest>,
  output: __S(2995, __c187, 3) as any as S.Schema<GetContainerServicePowersResult>,
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
}));

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
  input: __S(3008, __c188, 0) as any as S.Schema<GetContainerServicesRequest>,
  output: __S(3010, __c188, 2) as any as S.Schema<ContainerServicesListResult>,
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
}));

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
  input: __S(3024, __c189, 0) as any as S.Schema<GetCostEstimateRequest>,
  output: __S(3032, __c189, 8) as any as S.Schema<GetCostEstimateResult>,
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
}));

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
  input: __S(3040, __c190, 0) as any as S.Schema<GetDiskRequest>,
  output: __S(3041, __c190, 1) as any as S.Schema<GetDiskResult>,
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
}));

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
  input: __S(3104, __c194, 0) as any as S.Schema<GetDisksRequest>,
  output: __S(3105, __c194, 1) as any as S.Schema<GetDisksResult>,
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
}));

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
  input: __S(3136, __c196, 0) as any as S.Schema<GetDiskSnapshotRequest>,
  output: __S(3137, __c196, 1) as any as S.Schema<GetDiskSnapshotResult>,
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
}));

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
  input: __S(3168, __c198, 0) as any as S.Schema<GetDiskSnapshotsRequest>,
  output: __S(3170, __c198, 2) as any as S.Schema<GetDiskSnapshotsResult>,
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
}));

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
  input: __S(3184, __c199, 0) as any as S.Schema<GetDistributionBundlesRequest>,
  output: __S(3187, __c199, 3) as any as S.Schema<GetDistributionBundlesResult>,
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
}));

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
  input: __S(3200, __c200, 0) as any as S.Schema<GetDistributionLatestCacheResetRequest>,
  output: __S(3201, __c200, 1) as any as S.Schema<GetDistributionLatestCacheResetResult>,
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
}));

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
  input: __S(3216, __c201, 0) as any as S.Schema<GetDistributionMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetDistributionMetricDataResult>,
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
}));

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
  input: __S(3232, __c202, 0) as any as S.Schema<GetDistributionsRequest>,
  output: __S(3234, __c202, 2) as any as S.Schema<GetDistributionsResult>,
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
}));

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
  input: __S(3248, __c203, 0) as any as S.Schema<GetDomainRequest>,
  output: __S(3249, __c203, 1) as any as S.Schema<GetDomainResult>,
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
}));

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
  input: __S(3280, __c205, 0) as any as S.Schema<GetDomainsRequest>,
  output: __S(3282, __c205, 2) as any as S.Schema<GetDomainsResult>,
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
}));

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
  input: __S(3296, __c206, 0) as any as S.Schema<GetExportSnapshotRecordsRequest>,
  output: __S(3304, __c206, 8) as any as S.Schema<GetExportSnapshotRecordsResult>,
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
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<GetInstanceRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetInstanceResult>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<GetInstanceAccessDetailsRequest>,
  output: __S(69, __c4, 5) as any as S.Schema<GetInstanceAccessDetailsResult>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<GetInstanceMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetInstanceMetricDataResult>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<GetInstancePortStatesRequest>,
  output: __S(99, __c6, 3) as any as S.Schema<GetInstancePortStatesResult>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<GetInstancesRequest>,
  output: __S(114, __c7, 2) as any as S.Schema<GetInstancesResult>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<GetInstanceSnapshotRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<GetInstanceSnapshotResult>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<GetInstanceSnapshotsRequest>,
  output: __S(162, __c10, 2) as any as S.Schema<GetInstanceSnapshotsResult>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<GetInstanceStateRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetInstanceStateResult>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<GetKeyPairRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<GetKeyPairResult>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<GetKeyPairsRequest>,
  output: __S(210, __c13, 2) as any as S.Schema<GetKeyPairsResult>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<GetLoadBalancerRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetLoadBalancerResult>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<GetLoadBalancerMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetLoadBalancerMetricDataResult>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<GetLoadBalancersRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<GetLoadBalancersResult>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<GetLoadBalancerTlsCertificatesRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<GetLoadBalancerTlsCertificatesResult>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<GetLoadBalancerTlsPoliciesRequest>,
  output: __S(339, __c21, 3) as any as S.Schema<GetLoadBalancerTlsPoliciesResult>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<GetOperationRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<GetOperationResult>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<GetOperationsRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetOperationsResult>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<GetOperationsForResourceRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<GetOperationsForResourceResult>,
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
}));

export type GetProfileError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the profile of the Amazon Lightsail account that makes the
 * request. The response includes the profile type and, for accounts enrolled in the Lightsail
 * partner program, the partner membership details.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResult,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetProfileRequest>,
  output: __S(402, __c25, 2) as any as S.Schema<GetProfileResult>,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<GetRegionsRequest>,
  output: __S(418, __c26, 2) as any as S.Schema<GetRegionsResult>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<GetRelationalDatabaseRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetRelationalDatabaseResult>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<GetRelationalDatabaseBlueprintsRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<GetRelationalDatabaseBlueprintsResult>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<GetRelationalDatabaseBundlesRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<GetRelationalDatabaseBundlesResult>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<GetRelationalDatabaseEventsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<GetRelationalDatabaseEventsResult>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<GetRelationalDatabaseLogEventsRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<GetRelationalDatabaseLogEventsResult>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<GetRelationalDatabaseLogStreamsRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<GetRelationalDatabaseLogStreamsResult>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<GetRelationalDatabaseMasterUserPasswordRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<GetRelationalDatabaseMasterUserPasswordResult>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<GetRelationalDatabaseMetricDataRequest>,
  output: __S(2674, __c167, 2) as any as S.Schema<GetRelationalDatabaseMetricDataResult>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<GetRelationalDatabaseParametersRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<GetRelationalDatabaseParametersResult>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<GetRelationalDatabasesRequest>,
  output: __S(626, __c39, 2) as any as S.Schema<GetRelationalDatabasesResult>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<GetRelationalDatabaseSnapshotRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<GetRelationalDatabaseSnapshotResult>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetRelationalDatabaseSnapshotsRequest>,
  output: __S(690, __c43, 2) as any as S.Schema<GetRelationalDatabaseSnapshotsResult>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<GetSetupHistoryRequest>,
  output: __S(711, __c44, 7) as any as S.Schema<GetSetupHistoryResult>,
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
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetStaticIpRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetStaticIpResult>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetStaticIpsRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<GetStaticIpsResult>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<ImportKeyPairRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<ImportKeyPairResult>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<IsVpcPeeredRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<IsVpcPeeredResult>,
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
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<OpenInstancePublicPortsRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<OpenInstancePublicPortsResult>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<PeerVpcRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<PeerVpcResult>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<PutAlarmRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<PutAlarmResult>,
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
}));

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
  input: __S(881, __c55, 1) as any as S.Schema<PutInstancePublicPortsRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<PutInstancePublicPortsResult>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<RebootInstanceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<RebootInstanceResult>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<RebootRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<RebootRelationalDatabaseResult>,
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
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<RegisterContainerImageRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<RegisterContainerImageResult>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<ReleaseStaticIpRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<ReleaseStaticIpResult>,
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
}));

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
  input: __S(960, __c60, 0) as any as S.Schema<ResetDistributionCacheRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<ResetDistributionCacheResult>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<SendContactMethodVerificationRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<SendContactMethodVerificationResult>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<SetIpAddressTypeRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<SetIpAddressTypeResult>,
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
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<SetResourceAccessForBucketRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<SetResourceAccessForBucketResult>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<SetupInstanceHttpsRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<SetupInstanceHttpsResult>,
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
}));

export type StartGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Initiates a graphical user interface (GUI) session that's used to access a virtual
 * computer's operating system and application. The session will be active for 1 hour. Use this
 * action to resume the session after it expires.
 */
export const startGUISession: API.OperationMethod<
  StartGUISessionRequest,
  StartGUISessionResult,
  StartGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<StartGUISessionRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StartGUISessionResult>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<StartInstanceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StartInstanceResult>,
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
}));

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
  input: __S(1088, __c68, 0) as any as S.Schema<StartRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StartRelationalDatabaseResult>,
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
}));

export type StopGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Terminates a web-based Amazon DCV session that's used to access a virtual computer's
 * operating system or application. The session will close and any unsaved data will be
 * lost.
 */
export const stopGUISession: API.OperationMethod<
  StopGUISessionRequest,
  StopGUISessionResult,
  StopGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<StopGUISessionRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StopGUISessionResult>,
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
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<StopInstanceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StopInstanceResult>,
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
}));

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
  input: __S(1136, __c71, 0) as any as S.Schema<StopRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<StopRelationalDatabaseResult>,
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
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<TagResourceResult>,
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
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<TestAlarmRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<TestAlarmResult>,
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
}));

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
  input: __S(1184, __c74, 0) as any as S.Schema<UnpeerVpcRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<UnpeerVpcResult>,
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
}));

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
  input: __S(1200, __c75, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UntagResourceResult>,
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
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<UpdateBucketRequest>,
  output: __S(1232, __c77, 0) as any as S.Schema<UpdateBucketResult>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<UpdateBucketBundleRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UpdateBucketBundleResult>,
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
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateContainerServiceRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<UpdateContainerServiceResult>,
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
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<UpdateDistributionRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<UpdateDistributionResult>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<UpdateDistributionBundleRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<UpdateDistributionBundleResult>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateDomainEntryRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UpdateDomainEntryResult>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<UpdateInstanceMetadataOptionsRequest>,
  output: __S(3088, __c193, 0) as any as S.Schema<UpdateInstanceMetadataOptionsResult>,
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
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<UpdateLoadBalancerAttributeRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UpdateLoadBalancerAttributeResult>,
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
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<UpdateRelationalDatabaseRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UpdateRelationalDatabaseResult>,
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
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<UpdateRelationalDatabaseParametersRequest>,
  output: __S(2800, __c175, 0) as any as S.Schema<UpdateRelationalDatabaseParametersResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          diskName: S.String,
          instanceName: S.String,
          diskPath: S.String,
          autoMounting: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachDisk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachDiskRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ instance: S.optional(__S(38, __c2, 6)) })).annotate({
        identifier: "GetInstanceResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cpuCount: S.optional(S.Number),
          disks: S.optional(__S(3120, __c195, 0)),
          ramSizeInGb: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceHardware" });
    case 1:
      return S.suspend(() => S.Struct({ gbPerMonthAllocated: S.optional(S.Number) })).annotate({
        identifier: "MonthlyTransfer",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          fromPort: S.optional(S.Number),
          toPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          accessFrom: S.optional(S.String),
          accessType: S.optional(S.String),
          commonName: S.optional(S.String),
          accessDirection: S.optional(S.String),
          cidrs: S.optional(__S(240, __c15, 0)),
          ipv6Cidrs: S.optional(__S(240, __c15, 0)),
          cidrListAliases: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "InstancePortInfo" });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          monthlyTransfer: S.optional(__S(33, __c2, 1)),
          ports: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "InstanceNetworking" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          state: S.optional(S.String),
          httpTokens: S.optional(S.String),
          httpEndpoint: S.optional(S.String),
          httpPutResponseHopLimit: S.optional(S.Number),
          httpProtocolIpv6: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceMetadataOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          blueprintId: S.optional(S.String),
          blueprintName: S.optional(S.String),
          bundleId: S.optional(S.String),
          addOns: S.optional(__S(3057, __c191, 1)),
          isStaticIp: S.optional(S.Boolean),
          privateIpAddress: S.optional(S.String),
          publicIpAddress: S.optional(S.String),
          ipv6Addresses: S.optional(__S(240, __c15, 0)),
          ipAddressType: S.optional(S.String),
          hardware: S.optional(__S(32, __c2, 0)),
          networking: S.optional(__S(36, __c2, 4)),
          state: S.optional(__S(48, __c3, 0)),
          username: S.optional(S.String),
          sshKeyName: S.optional(S.String),
          metadataOptions: S.optional(__S(37, __c2, 5)),
        }),
      ).annotate({ identifier: "Instance" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.Number), name: S.optional(S.String) }),
      ).annotate({ identifier: "InstanceState" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String, protocol: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceAccessDetails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceAccessDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ciphertext: S.optional(S.String), keyPairName: S.optional(S.String) }),
      ).annotate({ identifier: "PasswordData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          algorithm: S.optional(S.String),
          publicKey: S.optional(S.String),
          witnessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          fingerprintSHA1: S.optional(S.String),
          fingerprintSHA256: S.optional(S.String),
          notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "HostKeyAttributes" });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          certKey: S.optional(S.String),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ipAddress: S.optional(S.String),
          ipv6Addresses: S.optional(__S(240, __c15, 0)),
          password: S.optional(S.String),
          passwordData: S.optional(__S(65, __c4, 1)),
          privateKey: S.optional(S.String),
          protocol: S.optional(S.String),
          instanceName: S.optional(S.String),
          username: S.optional(S.String),
          hostKeys: S.optional(__S(67, __c4, 3)),
        }),
      ).annotate({ identifier: "InstanceAccessDetails" });
    case 5:
      return S.suspend(() => S.Struct({ accessDetails: S.optional(__S(68, __c4, 4)) })).annotate({
        identifier: "GetInstanceAccessDetailsResult",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.String,
          metricName: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          unit: S.String,
          statistics: __S(1808, __c113, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceMetricData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceMetricDataRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstancePortStates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstancePortStatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fromPort: S.optional(S.Number),
          toPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          state: S.optional(S.String),
          cidrs: S.optional(__S(240, __c15, 0)),
          ipv6Cidrs: S.optional(__S(240, __c15, 0)),
          cidrListAliases: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "InstancePortState" });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() => S.Struct({ portStates: S.optional(__S(98, __c6, 2)) })).annotate({
        identifier: "GetInstancePortStatesResult",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstancesRequest" });
    case 1:
      return S.Array(__S(38, __c2, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({ instances: S.optional(__S(113, __c7, 1)), nextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetInstancesResult" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceSnapshot: S.optional(__S(144, __c9, 0)) }),
      ).annotate({ identifier: "GetInstanceSnapshotResult" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          state: S.optional(S.String),
          progress: S.optional(S.String),
          fromAttachedDisks: S.optional(__S(3120, __c195, 0)),
          fromInstanceName: S.optional(S.String),
          fromInstanceArn: S.optional(S.String),
          fromBlueprintId: S.optional(S.String),
          fromBundleId: S.optional(S.String),
          isFromAutoSnapshot: S.optional(S.Boolean),
          sizeInGb: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceSnapshot" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceSnapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceSnapshotsRequest" });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceSnapshots: S.optional(__S(161, __c10, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInstanceSnapshotsResult" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceState" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceStateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ state: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "GetInstanceStateResult",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ keyPairName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetKeyPair" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKeyPairRequest" });
    case 1:
      return S.suspend(() => S.Struct({ keyPair: S.optional(__S(1984, __c124, 0)) })).annotate({
        identifier: "GetKeyPairResult",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageToken: S.optional(S.String),
          includeDefaultKeyPair: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetKeyPairs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKeyPairsRequest" });
    case 1:
      return S.Array(__S(1984, __c124, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ keyPairs: S.optional(__S(209, __c13, 1)), nextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetKeyPairsResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String, instanceNames: __S(240, __c15, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachInstancesToLoadBalancer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachInstancesToLoadBalancerRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoadBalancerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ loadBalancer: S.optional(__S(278, __c17, 6)) })).annotate({
        identifier: "GetLoadBalancerResult",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.optional(S.String),
          instanceHealth: S.optional(S.String),
          instanceHealthReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceHealthSummary" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), isAttached: S.optional(S.Boolean) }),
      ).annotate({ identifier: "LoadBalancerTlsCertificateSummary" });
    case 4:
      return S.Array(__S(275, __c17, 3));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          dnsName: S.optional(S.String),
          state: S.optional(S.String),
          protocol: S.optional(S.String),
          publicPorts: S.optional(__S(272, __c17, 0)),
          healthCheckPath: S.optional(S.String),
          instancePort: S.optional(S.Number),
          instanceHealthSummary: S.optional(__S(274, __c17, 2)),
          tlsCertificateSummaries: S.optional(__S(276, __c17, 4)),
          configurationOptions: S.optional(__S(277, __c17, 5)),
          ipAddressType: S.optional(S.String),
          httpsRedirectionEnabled: S.optional(S.Boolean),
          tlsPolicyName: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoadBalancer" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadBalancerName: S.String,
          metricName: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          unit: S.String,
          statistics: __S(1808, __c113, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancerMetricData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoadBalancerMetricDataRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoadBalancersRequest" });
    case 1:
      return S.Array(__S(278, __c17, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          loadBalancers: S.optional(__S(305, __c19, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLoadBalancersResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancerTlsCertificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoadBalancerTlsCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          type: S.optional(S.String),
          value: S.optional(S.String),
          validationStatus: S.optional(S.String),
          domainName: S.optional(S.String),
          dnsRecordCreationState: S.optional(__S(1488, __c93, 0)),
        }),
      ).annotate({ identifier: "LoadBalancerTlsCertificateDomainValidationRecord" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String), validationStatus: S.optional(S.String) }),
      ).annotate({ identifier: "LoadBalancerTlsCertificateDomainValidationOption" });
    case 4:
      return S.Array(__S(323, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          renewalStatus: S.optional(S.String),
          domainValidationOptions: S.optional(__S(324, __c20, 4)),
        }),
      ).annotate({ identifier: "LoadBalancerTlsCertificateRenewalSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          loadBalancerName: S.optional(S.String),
          isAttached: S.optional(S.Boolean),
          status: S.optional(S.String),
          domainName: S.optional(S.String),
          domainValidationRecords: S.optional(__S(322, __c20, 2)),
          failureReason: S.optional(S.String),
          issuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          issuer: S.optional(S.String),
          keyAlgorithm: S.optional(S.String),
          notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          renewalSummary: S.optional(__S(325, __c20, 5)),
          revocationReason: S.optional(S.String),
          revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          serial: S.optional(S.String),
          signatureAlgorithm: S.optional(S.String),
          subject: S.optional(S.String),
          subjectAlternativeNames: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "LoadBalancerTlsCertificate" });
    case 7:
      return S.Array(__S(326, __c20, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ tlsCertificates: S.optional(__S(327, __c20, 7)) }),
      ).annotate({ identifier: "GetLoadBalancerTlsCertificatesResult" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancerTlsPolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoadBalancerTlsPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          isDefault: S.optional(S.Boolean),
          description: S.optional(S.String),
          protocols: S.optional(__S(240, __c15, 0)),
          ciphers: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "LoadBalancerTlsPolicy" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          tlsPolicies: S.optional(__S(338, __c21, 2)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLoadBalancerTlsPoliciesResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ operationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetOperation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOperationRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetOperations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operations: S.optional(__S(2784, __c174, 0)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetOperationsResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String, pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetOperationsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOperationsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operations: S.optional(__S(2784, __c174, 0)),
          nextPageCount: S.optional(S.String),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetOperationsForResourceResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/GetProfile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          enrolledAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tierName: S.optional(S.String),
          status: S.String,
        }),
      ).annotate({ identifier: "PartnerInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ profileType: S.String, partner: S.optional(__S(401, __c25, 1)) }),
      ).annotate({ identifier: "GetProfileResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeAvailabilityZones: S.optional(S.Boolean),
          includeRelationalDatabaseAvailabilityZones: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRegions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegionsRequest" });
    case 1:
      return S.Array(Region);
    case 2:
      return S.suspend(() => S.Struct({ regions: S.optional(__S(417, __c26, 1)) })).annotate({
        identifier: "GetRegionsResult",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String, certificateName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachLoadBalancerTlsCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachLoadBalancerTlsCertificateRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ relationalDatabase: S.optional(__S(469, __c29, 5)) }),
      ).annotate({ identifier: "GetRelationalDatabaseResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cpuCount: S.optional(S.Number),
          diskSizeInGb: S.optional(S.Number),
          ramSizeInGb: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RelationalDatabaseHardware" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          masterUserPassword: S.optional(S.String),
          engineVersion: S.optional(S.String),
          backupRetentionEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PendingModifiedRelationalDatabaseValues" });
    case 2:
      return S.suspend(() =>
        S.Struct({ port: S.optional(S.Number), address: S.optional(S.String) }),
      ).annotate({ identifier: "RelationalDatabaseEndpoint" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          description: S.optional(S.String),
          currentApplyDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PendingMaintenanceAction" });
    case 4:
      return S.Array(__S(467, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          relationalDatabaseBlueprintId: S.optional(S.String),
          relationalDatabaseBundleId: S.optional(S.String),
          masterDatabaseName: S.optional(S.String),
          hardware: S.optional(__S(464, __c29, 0)),
          state: S.optional(S.String),
          secondaryAvailabilityZone: S.optional(S.String),
          backupRetentionEnabled: S.optional(S.Boolean),
          pendingModifiedValues: S.optional(__S(465, __c29, 1)),
          engine: S.optional(S.String),
          engineVersion: S.optional(S.String),
          latestRestorableTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          masterUsername: S.optional(S.String),
          parameterApplyStatus: S.optional(S.String),
          preferredBackupWindow: S.optional(S.String),
          preferredMaintenanceWindow: S.optional(S.String),
          publiclyAccessible: S.optional(S.Boolean),
          masterEndpoint: S.optional(__S(466, __c29, 2)),
          pendingMaintenanceActions: S.optional(__S(468, __c29, 4)),
          caCertificateIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelationalDatabase" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseBlueprints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseBlueprintsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blueprintId: S.optional(S.String),
          engine: S.optional(S.String),
          engineVersion: S.optional(S.String),
          engineDescription: S.optional(S.String),
          engineVersionDescription: S.optional(S.String),
          isEngineDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RelationalDatabaseBlueprint" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          blueprints: S.optional(__S(482, __c30, 2)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseBlueprintsResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String), includeInactive: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseBundles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseBundlesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bundleId: S.optional(S.String),
          name: S.optional(S.String),
          price: S.optional(S.Number),
          ramSizeInGb: S.optional(S.Number),
          diskSizeInGb: S.optional(S.Number),
          transferPerMonthInGb: S.optional(S.Number),
          cpuCount: S.optional(S.Number),
          isEncrypted: S.optional(S.Boolean),
          isActive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RelationalDatabaseBundle" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ bundles: S.optional(__S(498, __c31, 2)), nextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetRelationalDatabaseBundlesResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          durationInMinutes: S.optional(S.Number),
          pageToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resource: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          eventCategories: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "RelationalDatabaseEvent" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseEvents: S.optional(__S(514, __c32, 2)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseEventsResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          logStreamName: S.String,
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startFromHead: S.optional(S.Boolean),
          pageToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseLogEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseLogEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceLogEvents: S.optional(__S(2945, __c184, 1)),
          nextBackwardToken: S.optional(S.String),
          nextForwardToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseLogEventsResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseLogStreams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseLogStreamsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ logStreams: S.optional(__S(240, __c15, 0)) })).annotate({
        identifier: "GetRelationalDatabaseLogStreamsResult",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String, passwordVersion: S.optional(S.String) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/ls/api/2016-11-28/GetRelationalDatabaseMasterUserPassword",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseMasterUserPasswordRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          masterUserPassword: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseMasterUserPasswordResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          metricName: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          unit: S.String,
          statistics: __S(1808, __c113, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseMetricData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseMetricDataRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String, pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseParameters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          parameters: S.optional(__S(609, __c38, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseParametersResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          allowedValues: S.optional(S.String),
          applyMethod: S.optional(S.String),
          applyType: S.optional(S.String),
          dataType: S.optional(S.String),
          description: S.optional(S.String),
          isModifiable: S.optional(S.Boolean),
          parameterName: S.optional(S.String),
          parameterValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelationalDatabaseParameter" });
    case 1:
      return S.Array(__S(608, __c38, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabasesRequest" });
    case 1:
      return S.Array(__S(469, __c29, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({
          relationalDatabases: S.optional(__S(625, __c39, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabasesResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ staticIpName: S.String, instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachStaticIp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachStaticIpRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseSnapshot: S.optional(__S(672, __c42, 0)) }),
      ).annotate({ identifier: "GetRelationalDatabaseSnapshotResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          engine: S.optional(S.String),
          engineVersion: S.optional(S.String),
          sizeInGb: S.optional(S.Number),
          state: S.optional(S.String),
          fromRelationalDatabaseName: S.optional(S.String),
          fromRelationalDatabaseArn: S.optional(S.String),
          fromRelationalDatabaseBundleId: S.optional(S.String),
          fromRelationalDatabaseBlueprintId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelationalDatabaseSnapshot" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRelationalDatabaseSnapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRelationalDatabaseSnapshotsRequest" });
    case 1:
      return S.Array(__S(672, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseSnapshots: S.optional(__S(689, __c43, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRelationalDatabaseSnapshotsResult" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String, pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/get-setup-history" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSetupHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.optional(S.String),
          domainNames: S.optional(__S(240, __c15, 0)),
          certificateProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetupRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetupHistoryResource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          command: S.optional(S.String),
          dateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.optional(S.String),
          status: S.optional(S.String),
          standardError: S.optional(S.String),
          standardOutput: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetupExecutionDetails" });
    case 4:
      return S.Array(__S(707, __c44, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          operationId: S.optional(S.String),
          request: S.optional(__S(705, __c44, 1)),
          resource: S.optional(__S(706, __c44, 2)),
          executionDetails: S.optional(__S(708, __c44, 4)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetupHistory" });
    case 6:
      return S.Array(__S(709, __c44, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          setupHistory: S.optional(__S(710, __c44, 6)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSetupHistoryResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ staticIpName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetStaticIp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStaticIpRequest" });
    case 1:
      return S.suspend(() => S.Struct({ staticIp: S.optional(__S(736, __c46, 0)) })).annotate({
        identifier: "GetStaticIpResult",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          ipAddress: S.optional(S.String),
          attachedTo: S.optional(S.String),
          isAttached: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StaticIp" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetStaticIps" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStaticIpsRequest" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          staticIps: S.optional(__S(753, __c47, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetStaticIpsResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ keyPairName: S.String, publicKeyBase64: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ImportKeyPair" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportKeyPairRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/IsVpcPeered" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "IsVpcPeeredRequest" });
    case 1:
      return S.suspend(() => S.Struct({ isPeered: S.optional(S.Boolean) })).annotate({
        identifier: "IsVpcPeeredResult",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portInfo: __S(864, __c54, 0), instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/OpenInstancePublicPorts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "OpenInstancePublicPortsRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/PeerVpc" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PeerVpcRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmName: S.String,
          metricName: S.String,
          monitoredResourceName: S.String,
          comparisonOperator: S.String,
          threshold: S.Number,
          evaluationPeriods: S.Number,
          datapointsToAlarm: S.optional(S.Number),
          treatMissingData: S.optional(S.String),
          contactProtocols: S.optional(__S(1808, __c113, 0)),
          notificationTriggers: S.optional(__S(1808, __c113, 0)),
          notificationEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/PutAlarm" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAlarmRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portInfo: __S(864, __c54, 0), instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CloseInstancePublicPorts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CloseInstancePublicPortsRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fromPort: S.optional(S.Number),
          toPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          cidrs: S.optional(__S(240, __c15, 0)),
          ipv6Cidrs: S.optional(__S(240, __c15, 0)),
          cidrListAliases: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "PortInfo" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(864, __c54, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ portInfos: __S(880, __c55, 0), instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/PutInstancePublicPorts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutInstancePublicPortsRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/RebootInstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RebootInstanceRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/RebootRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RebootRelationalDatabaseRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          label: S.String,
          digest: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/images",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterContainerImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ containerImage: S.optional(__S(2912, __c182, 0)) }),
      ).annotate({ identifier: "RegisterContainerImageResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ staticIpName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ReleaseStaticIp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ReleaseStaticIpRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ResetDistributionCache" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetDistributionCacheRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          operation: S.optional(__S(2848, __c178, 0)),
        }),
      ).annotate({ identifier: "ResetDistributionCacheResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ protocol: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/SendContactMethodVerification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendContactMethodVerificationRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceName: S.String,
          ipAddressType: S.String,
          acceptBundleUpdate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/SetIpAddressType" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetIpAddressTypeRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String, bucketName: S.String, access: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/SetResourceAccessForBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetResourceAccessForBucketRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.String,
          emailAddress: SensitiveString,
          domainNames: __S(240, __c15, 0),
          certificateProvider: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/setup-instance-https" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetupInstanceHttpsRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceSnapshotName: S.optional(S.String),
          sourceResourceName: S.optional(S.String),
          restoreDate: S.optional(S.String),
          useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
          targetSnapshotName: S.String,
          sourceRegion: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CopySnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopySnapshotRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/start-gui-session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartGUISessionRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StartInstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInstanceRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StartRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRelationalDatabaseRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/stop-gui-session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopGUISessionRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String, force: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StopInstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopInstanceRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          relationalDatabaseSnapshotName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StopRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopRelationalDatabaseRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.String,
          resourceArn: S.optional(S.String),
          tags: __S(1249, __c78, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/TagResource" }),
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
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmName: S.String.pipe(T.HttpLabel("alarmName")),
          state: S.String.pipe(T.HttpQuery("state")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/TestAlarm/{alarmName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestAlarmRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UnpeerVpc" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UnpeerVpcRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.String,
          resourceArn: S.optional(S.String),
          tagKeys: __S(240, __c15, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UntagResource" }),
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
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.String,
          bundleId: S.String,
          tags: S.optional(__S(1249, __c78, 1)),
          enableObjectVersioning: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBucketRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(__S(1272, __c79, 8)),
          operations: S.optional(__S(2784, __c174, 0)),
        }),
      ).annotate({ identifier: "CreateBucketResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(1248, __c78, 0));
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ getObject: S.optional(S.String), allowPublicOverrides: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AccessRules" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), resourceType: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceReceivingAccess" });
    case 2:
      return S.Array(__S(1265, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "BucketState" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          destination: S.optional(S.String),
          prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "BucketAccessLogConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          allowedMethods: __S(240, __c15, 0),
          allowedOrigins: __S(240, __c15, 0),
          allowedHeaders: S.optional(__S(240, __c15, 0)),
          exposeHeaders: S.optional(__S(240, __c15, 0)),
          maxAgeSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BucketCorsRule" });
    case 6:
      return S.Array(__S(1269, __c79, 5));
    case 7:
      return S.suspend(() => S.Struct({ rules: S.optional(__S(1270, __c79, 6)) })).annotate({
        identifier: "BucketCorsConfig",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          accessRules: S.optional(__S(1264, __c79, 0)),
          arn: S.optional(S.String),
          bundleId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          url: S.optional(S.String),
          location: S.optional(__S(2832, __c177, 0)),
          name: S.optional(S.String),
          supportCode: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          objectVersioning: S.optional(S.String),
          ableToUpdateBundle: S.optional(S.Boolean),
          readonlyAccessAccounts: S.optional(__S(240, __c15, 0)),
          resourcesReceivingAccess: S.optional(__S(1266, __c79, 2)),
          state: S.optional(__S(1267, __c79, 3)),
          accessLogConfig: S.optional(__S(1268, __c79, 4)),
          cors: S.optional(__S(1271, __c79, 7)),
        }),
      ).annotate({ identifier: "Bucket" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.String,
          accessRules: S.optional(__S(1264, __c79, 0)),
          versioning: S.optional(S.String),
          readonlyAccessAccounts: S.optional(__S(240, __c15, 0)),
          accessLogConfig: S.optional(__S(1268, __c79, 4)),
          cors: S.optional(__S(1271, __c79, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBucketRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, bundleId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateBucketBundle" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBucketBundleRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          power: S.optional(S.String),
          scale: S.optional(S.Number),
          isDisabled: S.optional(S.Boolean),
          publicDomainNames: S.optional(__S(1648, __c103, 0)),
          privateRegistryAccess: S.optional(__S(1569, __c98, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/ls/api/2016-11-28/container-services/{serviceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContainerServiceRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionName: S.String,
          origin: S.optional(__S(1792, __c112, 0)),
          defaultCacheBehavior: S.optional(__S(1840, __c115, 0)),
          cacheBehaviorSettings: S.optional(__S(1844, __c115, 4)),
          cacheBehaviors: S.optional(__S(1846, __c115, 6)),
          isEnabled: S.optional(S.Boolean),
          viewerMinimumTlsProtocolVersion: S.optional(S.String),
          certificateName: S.optional(S.String),
          useDefaultCertificate: S.optional(S.Boolean),
          enablePrivateOriginAccess: S.optional(S.Boolean),
          defaultRootObject: S.optional(S.String),
          customErrorResponses: S.optional(__S(1848, __c115, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateDistribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.optional(S.String), bundleId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateDistributionBundle" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionBundleRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String, domainEntry: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateDomainEntry" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainEntryRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.String,
          httpTokens: S.optional(S.String),
          httpEndpoint: S.optional(S.String),
          httpPutResponseHopLimit: S.optional(S.Number),
          httpProtocolIpv6: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateInstanceMetadataOptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInstanceMetadataOptionsRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadBalancerName: S.String,
          attributeName: S.String,
          attributeValue: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateLoadBalancerAttribute" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLoadBalancerAttributeRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          masterUserPassword: S.optional(SensitiveString),
          rotateMasterUserPassword: S.optional(S.Boolean),
          preferredBackupWindow: S.optional(S.String),
          preferredMaintenanceWindow: S.optional(S.String),
          enableBackupRetention: S.optional(S.Boolean),
          disableBackupRetention: S.optional(S.Boolean),
          publiclyAccessible: S.optional(S.Boolean),
          applyImmediately: S.optional(S.Boolean),
          caCertificateIdentifier: S.optional(S.String),
          relationalDatabaseBlueprintId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRelationalDatabaseRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseName: S.String, parameters: __S(609, __c38, 1) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/ls/api/2016-11-28/UpdateRelationalDatabaseParameters",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRelationalDatabaseParametersRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateBucketAccessKey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBucketAccessKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessKey: S.optional(__S(1457, __c91, 1)),
          operations: S.optional(__S(2784, __c174, 0)),
        }),
      ).annotate({ identifier: "CreateBucketAccessKeyResult" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lastUsedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          region: S.optional(S.String),
          serviceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessKeyLastUsed" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.optional(SensitiveString),
          secretAccessKey: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUsed: S.optional(__S(1456, __c91, 0)),
        }),
      ).annotate({ identifier: "AccessKey" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateName: S.String,
          domainName: S.String,
          subjectAlternativeNames: S.optional(__S(240, __c15, 0)),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificate: S.optional(__S(1509, __c94, 5)),
          operations: S.optional(__S(2784, __c174, 0)),
        }),
      ).annotate({ identifier: "CreateCertificateResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "DnsRecordCreationState" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          type: S.optional(S.String),
          value: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceRecord" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          resourceRecord: S.optional(__S(1504, __c94, 0)),
          dnsRecordCreationState: S.optional(__S(1488, __c93, 0)),
          validationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainValidationRecord" });
    case 2:
      return S.Array(__S(1505, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainValidationRecords: S.optional(__S(1506, __c94, 2)),
          renewalStatus: S.optional(S.String),
          renewalStatusReason: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RenewalSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          domainName: S.optional(S.String),
          status: S.optional(S.String),
          serialNumber: S.optional(S.String),
          subjectAlternativeNames: S.optional(__S(240, __c15, 0)),
          domainValidationRecords: S.optional(__S(1506, __c94, 2)),
          requestFailureReason: S.optional(S.String),
          inUseResourceCount: S.optional(S.Number),
          keyAlgorithm: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          issuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          issuerCA: S.optional(S.String),
          notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          eligibleToRenew: S.optional(S.String),
          renewalSummary: S.optional(__S(1507, __c94, 3)),
          revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revocationReason: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          supportCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Certificate" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateName: S.optional(S.String),
          domainName: S.optional(S.String),
          certificateDetail: S.optional(__S(1508, __c94, 4)),
          tags: S.optional(__S(1249, __c78, 1)),
        }),
      ).annotate({ identifier: "CertificateSummary" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.String,
          instanceType: S.String,
          portInfoSource: S.String,
          userData: S.optional(S.String),
          availabilityZone: S.String,
        }),
      ).annotate({ identifier: "InstanceEntry" });
    case 1:
      return S.Array(__S(1520, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ instances: __S(1521, __c95, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateCloudFormationStack" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCloudFormationStackRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          protocol: S.String,
          contactEndpoint: S.String,
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateContactMethod" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContactMethodRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containers: S.optional(__S(1634, __c102, 2)),
          publicEndpoint: S.optional(__S(1584, __c99, 0)),
        }),
      ).annotate({ identifier: "ContainerServiceDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          power: S.String,
          scale: S.Number,
          tags: S.optional(__S(1249, __c78, 1)),
          publicDomainNames: S.optional(__S(1648, __c103, 0)),
          deployment: S.optional(__S(1552, __c97, 0)),
          privateRegistryAccess: S.optional(__S(1569, __c98, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/container-services" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContainerServiceRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ isActive: S.optional(S.Boolean) })).annotate({
        identifier: "ContainerServiceECRImagePullerRoleRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ecrImagePullerRole: S.optional(__S(1568, __c98, 0)) }),
      ).annotate({ identifier: "PrivateRegistryAccessRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerName: S.String,
          containerPort: S.Number,
          healthCheck: S.optional(__S(1635, __c102, 3)),
        }),
      ).annotate({ identifier: "EndpointRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerService: S.optional(__S(1651, __c103, 3)) }),
      ).annotate({ identifier: "CreateContainerServiceResult" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          image: S.optional(S.String),
          command: S.optional(__S(240, __c15, 0)),
          environment: S.optional(__S(1616, __c101, 0)),
          ports: S.optional(__S(1632, __c102, 0)),
        }),
      ).annotate({ identifier: "Container" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1633, __c102, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          healthyThreshold: S.optional(S.Number),
          unhealthyThreshold: S.optional(S.Number),
          timeoutSeconds: S.optional(S.Number),
          intervalSeconds: S.optional(S.Number),
          path: S.optional(S.String),
          successCodes: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerServiceHealthCheckConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          containerName: S.optional(S.String),
          containerPort: S.optional(S.Number),
          healthCheck: S.optional(__S(1635, __c102, 3)),
        }),
      ).annotate({ identifier: "ContainerServiceEndpoint" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.Number),
          state: S.optional(S.String),
          containers: S.optional(__S(1634, __c102, 2)),
          publicEndpoint: S.optional(__S(1636, __c102, 4)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ContainerServiceDeployment" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(240, __c15, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ isActive: S.optional(S.Boolean), principalArn: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerServiceECRImagePullerRole" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ecrImagePullerRole: S.optional(__S(1649, __c103, 1)) }),
      ).annotate({ identifier: "PrivateRegistryAccess" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          containerServiceName: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          power: S.optional(S.String),
          powerId: S.optional(S.String),
          state: S.optional(S.String),
          stateDetail: S.optional(__S(1488, __c93, 0)),
          scale: S.optional(S.Number),
          currentDeployment: S.optional(__S(1637, __c102, 5)),
          nextDeployment: S.optional(__S(1637, __c102, 5)),
          isDisabled: S.optional(S.Boolean),
          principalArn: S.optional(S.String),
          privateDomainName: S.optional(S.String),
          publicDomainNames: S.optional(__S(1648, __c103, 0)),
          url: S.optional(S.String),
          privateRegistryAccess: S.optional(__S(1650, __c103, 2)),
        }),
      ).annotate({ identifier: "ContainerService" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          containers: S.optional(__S(1634, __c102, 2)),
          publicEndpoint: S.optional(__S(1584, __c99, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/deployments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContainerServiceDeploymentRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/container-registry-login" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContainerServiceRegistryLoginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          username: S.optional(S.String),
          password: S.optional(S.String),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          registry: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerServiceRegistryLogin" });
    case 2:
      return S.suspend(() =>
        S.Struct({ registryLogin: S.optional(__S(1681, __c105, 1)) }),
      ).annotate({ identifier: "CreateContainerServiceRegistryLoginResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          diskName: S.String,
          availabilityZone: S.String,
          sizeInGb: S.Number,
          tags: S.optional(__S(1249, __c78, 1)),
          addOns: S.optional(__S(1712, __c107, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDisk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDiskRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1730, __c108, 2));
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ snapshotTimeOfDay: S.optional(S.String) })).annotate({
        identifier: "AutoSnapshotAddOnRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ threshold: S.optional(S.String), duration: S.optional(S.String) }),
      ).annotate({ identifier: "StopInstanceOnIdleRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          addOnType: S.String,
          autoSnapshotAddOnRequest: S.optional(__S(1728, __c108, 0)),
          stopInstanceOnIdleRequest: S.optional(__S(1729, __c108, 1)),
        }),
      ).annotate({ identifier: "AddOnRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          diskName: S.String,
          diskSnapshotName: S.optional(S.String),
          availabilityZone: S.String,
          sizeInGb: S.Number,
          tags: S.optional(__S(1249, __c78, 1)),
          addOns: S.optional(__S(1712, __c107, 0)),
          sourceDiskName: S.optional(S.String),
          restoreDate: S.optional(S.String),
          useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDiskFromSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDiskFromSnapshotRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          diskName: S.optional(S.String),
          diskSnapshotName: S.String,
          instanceName: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDiskSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDiskSnapshotRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionName: S.String,
          origin: __S(1792, __c112, 0),
          defaultCacheBehavior: __S(1840, __c115, 0),
          cacheBehaviorSettings: S.optional(__S(1844, __c115, 4)),
          cacheBehaviors: S.optional(__S(1846, __c115, 6)),
          bundleId: S.String,
          ipAddressType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          certificateName: S.optional(S.String),
          viewerMinimumTlsProtocolVersion: S.optional(S.String),
          enablePrivateOriginAccess: S.optional(S.Boolean),
          defaultRootObject: S.optional(S.String),
          customErrorResponses: S.optional(__S(1848, __c115, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDistribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          distribution: S.optional(__S(1825, __c114, 1)),
          operation: S.optional(__S(2848, __c178, 0)),
        }),
      ).annotate({ identifier: "CreateDistributionResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          regionName: S.optional(S.String),
          protocolPolicy: S.optional(S.String),
          responseTimeout: S.optional(S.Number),
          ipAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "InputOrigin" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
          regionName: S.optional(S.String),
          protocolPolicy: S.optional(S.String),
          responseTimeout: S.optional(S.Number),
          ipAddressType: S.optional(S.String),
          isPrivateOriginAccessEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Origin" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          alternativeDomainNames: S.optional(__S(240, __c15, 0)),
          status: S.optional(S.String),
          isEnabled: S.optional(S.Boolean),
          domainName: S.optional(S.String),
          bundleId: S.optional(S.String),
          certificateName: S.optional(S.String),
          origin: S.optional(__S(1824, __c114, 0)),
          originPublicDNS: S.optional(S.String),
          defaultCacheBehavior: S.optional(__S(1840, __c115, 0)),
          cacheBehaviorSettings: S.optional(__S(1844, __c115, 4)),
          cacheBehaviors: S.optional(__S(1846, __c115, 6)),
          ableToUpdateBundle: S.optional(S.Boolean),
          ipAddressType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          viewerMinimumTlsProtocolVersion: S.optional(S.String),
          defaultRootObject: S.optional(S.String),
          customErrorResponses: S.optional(__S(1848, __c115, 8)),
        }),
      ).annotate({ identifier: "LightsailDistribution" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ behavior: S.optional(S.String) })).annotate({
        identifier: "CacheBehavior",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          option: S.optional(S.String),
          cookiesAllowList: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "CookieObject" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          option: S.optional(S.String),
          headersAllowList: S.optional(__S(1808, __c113, 0)),
        }),
      ).annotate({ identifier: "HeaderObject" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          option: S.optional(S.Boolean),
          queryStringsAllowList: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "QueryStringObject" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          defaultTTL: S.optional(S.Number),
          minimumTTL: S.optional(S.Number),
          maximumTTL: S.optional(S.Number),
          allowedHTTPMethods: S.optional(S.String),
          cachedHTTPMethods: S.optional(S.String),
          forwardedCookies: S.optional(__S(1841, __c115, 1)),
          forwardedHeaders: S.optional(__S(1842, __c115, 2)),
          forwardedQueryStrings: S.optional(__S(1843, __c115, 3)),
        }),
      ).annotate({ identifier: "CacheSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({ path: S.optional(S.String), behavior: S.optional(S.String) }),
      ).annotate({ identifier: "CacheBehaviorPerPath" });
    case 6:
      return S.Array(__S(1845, __c115, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          errorCode: S.optional(S.Number),
          responseCode: S.optional(S.String),
          responsePagePath: S.optional(S.String),
          errorCachingMinTTL: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DistributionCustomErrorResponse" });
    case 8:
      return S.Array(__S(1847, __c115, 7));
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String, tags: S.optional(__S(1249, __c78, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String, domainEntry: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDomainEntry" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainEntryRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          target: S.optional(S.String),
          isAlias: S.optional(S.Boolean),
          type: S.optional(S.String),
          options: S.optional(__S(1616, __c101, 0)),
        }),
      ).annotate({ identifier: "DomainEntry" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/create-gui-session-access-details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGUISessionAccessDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          url: S.optional(SensitiveString),
          isPrimary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Session" });
    case 2:
      return S.Array(__S(1905, __c119, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.optional(S.String),
          status: S.optional(S.String),
          percentageComplete: S.optional(S.Number),
          failureReason: S.optional(S.String),
          sessions: S.optional(__S(1906, __c119, 2)),
        }),
      ).annotate({ identifier: "CreateGUISessionAccessDetailsResult" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceNames: __S(240, __c15, 0),
          availabilityZone: S.String,
          customImageName: S.optional(S.String),
          blueprintId: S.String,
          bundleId: S.String,
          userData: S.optional(S.String),
          keyPairName: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          addOns: S.optional(__S(1712, __c107, 0)),
          ipAddressType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInstancesRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ originalDiskPath: S.optional(S.String), newDiskName: S.optional(S.String) }),
      ).annotate({ identifier: "DiskMap" });
    case 1:
      return S.Array(__S(1936, __c121, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1937, __c121, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          instanceNames: __S(240, __c15, 0),
          attachedDiskMapping: S.optional(__S(1938, __c121, 2)),
          availabilityZone: S.String,
          instanceSnapshotName: S.optional(S.String),
          bundleId: S.String,
          userData: S.optional(S.String),
          keyPairName: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          addOns: S.optional(__S(1712, __c107, 0)),
          ipAddressType: S.optional(S.String),
          sourceInstanceName: S.optional(S.String),
          restoreDate: S.optional(S.String),
          useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateInstancesFromSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInstancesFromSnapshotRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceSnapshotName: S.String,
          instanceName: S.String,
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateInstanceSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInstanceSnapshotRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ keyPairName: S.String, tags: S.optional(__S(1249, __c78, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateKeyPair" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKeyPairRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          keyPair: S.optional(__S(1984, __c124, 0)),
          publicKeyBase64: S.optional(S.String),
          privateKeyBase64: S.optional(S.String),
          operation: S.optional(__S(2848, __c178, 0)),
        }),
      ).annotate({ identifier: "CreateKeyPairResult" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          fingerprint: S.optional(S.String),
        }),
      ).annotate({ identifier: "KeyPair" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadBalancerName: S.String,
          instancePort: S.Number,
          healthCheckPath: S.optional(S.String),
          certificateName: S.optional(S.String),
          certificateDomainName: S.optional(S.String),
          certificateAlternativeNames: S.optional(__S(240, __c15, 0)),
          tags: S.optional(__S(1249, __c78, 1)),
          ipAddressType: S.optional(S.String),
          tlsPolicyName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateLoadBalancer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLoadBalancerRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadBalancerName: S.String,
          certificateName: S.String,
          certificateDomainName: S.String,
          certificateAlternativeNames: S.optional(__S(240, __c15, 0)),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateLoadBalancerTlsCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLoadBalancerTlsCertificateRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          availabilityZone: S.optional(S.String),
          relationalDatabaseBlueprintId: S.String,
          relationalDatabaseBundleId: S.String,
          masterDatabaseName: S.String,
          masterUsername: S.String,
          masterUserPassword: S.optional(SensitiveString),
          preferredBackupWindow: S.optional(S.String),
          preferredMaintenanceWindow: S.optional(S.String),
          publiclyAccessible: S.optional(S.Boolean),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRelationalDatabaseRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          availabilityZone: S.optional(S.String),
          publiclyAccessible: S.optional(S.Boolean),
          relationalDatabaseSnapshotName: S.optional(S.String),
          relationalDatabaseBundleId: S.optional(S.String),
          sourceRelationalDatabaseName: S.optional(S.String),
          restoreTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          useLatestRestorableTime: S.optional(S.Boolean),
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/ls/api/2016-11-28/CreateRelationalDatabaseFromSnapshot",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRelationalDatabaseFromSnapshotRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          relationalDatabaseSnapshotName: S.String,
          tags: S.optional(__S(1249, __c78, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateRelationalDatabaseSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRelationalDatabaseSnapshotRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ alarmName: S.String.pipe(T.HttpLabel("alarmName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ls/api/2016-11-28/DeleteAlarm/{alarmName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAlarmRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String, date: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteAutoSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAutoSnapshotRequest" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, forceDelete: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBucketRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, accessKeyId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteBucketAccessKey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBucketAccessKeyRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCertificateRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ protocol: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteContactMethod" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContactMethodRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          image: S.String.pipe(T.HttpLabel("image")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/images/{image}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContainerImageRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteContainerImageResult" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContainerServiceRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ diskName: S.String, forceDeleteAddOns: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDisk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDiskRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ diskSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDiskSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDiskSnapshotRequest" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDistribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDistributionRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainRequest" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String, domainEntry: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDomainEntry" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainEntryRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String, forceDeleteAddOns: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteInstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInstanceRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteInstanceSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInstanceSnapshotRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ keyPairName: S.String, expectedFingerprint: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteKeyPair" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeyPairRequest" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteKnownHostKeys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKnownHostKeysRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteLoadBalancer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLoadBalancerRequest" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadBalancerName: S.String,
          certificateName: S.String,
          force: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteLoadBalancerTlsCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLoadBalancerTlsCertificateRequest" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationalDatabaseName: S.String,
          skipFinalSnapshot: S.optional(S.Boolean),
          finalRelationalDatabaseSnapshotName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteRelationalDatabase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRelationalDatabaseRequest" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ relationalDatabaseSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteRelationalDatabaseSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRelationalDatabaseSnapshotRequest" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachCertificateFromDistribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachCertificateFromDistributionRequest" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ diskName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachDisk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachDiskRequest" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadBalancerName: S.String, instanceNames: __S(240, __c15, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachInstancesFromLoadBalancer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachInstancesFromLoadBalancerRequest" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ staticIpName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachStaticIp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachStaticIpRequest" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ addOnType: S.String, resourceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DisableAddOn" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableAddOnRequest" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DownloadDefaultKeyPair" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DownloadDefaultKeyPairRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          publicKeyBase64: S.optional(S.String),
          privateKeyBase64: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DownloadDefaultKeyPairResult" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String, addOnRequest: __S(1730, __c108, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/EnableAddOn" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableAddOnRequest" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ExportSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportSnapshotRequest" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetActiveNames" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetActiveNamesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          activeNames: S.optional(__S(240, __c15, 0)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetActiveNamesResult" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmName: S.optional(S.String).pipe(T.HttpQuery("alarmName")),
          pageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
          monitoredResourceName: S.optional(S.String).pipe(T.HttpQuery("monitoredResourceName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/GetAlarms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAlarmsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "MonitoredResourceInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          supportCode: S.optional(S.String),
          monitoredResourceInfo: S.optional(__S(2577, __c161, 1)),
          comparisonOperator: S.optional(S.String),
          evaluationPeriods: S.optional(S.Number),
          period: S.optional(S.Number),
          threshold: S.optional(S.Number),
          datapointsToAlarm: S.optional(S.Number),
          treatMissingData: S.optional(S.String),
          statistic: S.optional(S.String),
          metricName: S.optional(S.String),
          state: S.optional(S.String),
          unit: S.optional(S.String),
          contactProtocols: S.optional(__S(1808, __c113, 0)),
          notificationTriggers: S.optional(__S(1808, __c113, 0)),
          notificationEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(1249, __c78, 1)),
        }),
      ).annotate({ identifier: "Alarm" });
    case 3:
      return S.Array(__S(2578, __c161, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ alarms: S.optional(__S(2579, __c161, 3)), nextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAlarmsResult" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetAutoSnapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutoSnapshotsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ path: S.optional(S.String), sizeInGb: S.optional(S.Number) }),
      ).annotate({ identifier: "AttachedDisk" });
    case 2:
      return S.Array(__S(2593, __c162, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          date: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          fromAttachedDisks: S.optional(__S(2594, __c162, 2)),
        }),
      ).annotate({ identifier: "AutoSnapshotDetails" });
    case 4:
      return S.Array(__S(2595, __c162, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.optional(S.String),
          resourceType: S.optional(S.String),
          autoSnapshots: S.optional(__S(2596, __c162, 4)),
        }),
      ).annotate({ identifier: "GetAutoSnapshotsResult" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeInactive: S.optional(S.Boolean),
          pageToken: S.optional(S.String),
          appCategory: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBlueprints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBlueprintsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blueprintId: S.optional(S.String),
          name: S.optional(S.String),
          group: S.optional(S.String),
          type: S.optional(S.String),
          description: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          minPower: S.optional(S.Number),
          version: S.optional(S.String),
          versionCode: S.optional(S.String),
          productUrl: S.optional(S.String),
          licenseUrl: S.optional(S.String),
          platform: S.optional(S.String),
          appCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "Blueprint" });
    case 2:
      return S.Array(__S(2609, __c163, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          blueprints: S.optional(__S(2610, __c163, 2)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBlueprintsResult" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketAccessKeys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBucketAccessKeysRequest" });
    case 1:
      return S.Array(__S(1457, __c91, 1));
    case 2:
      return S.suspend(() => S.Struct({ accessKeys: S.optional(__S(2625, __c164, 1)) })).annotate({
        identifier: "GetBucketAccessKeysResult",
      });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ includeInactive: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketBundles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBucketBundlesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bundleId: S.optional(S.String),
          name: S.optional(S.String),
          price: S.optional(S.Number),
          storagePerMonthInGb: S.optional(S.Number),
          transferPerMonthInGb: S.optional(S.Number),
          isActive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BucketBundle" });
    case 2:
      return S.Array(__S(2641, __c165, 1));
    case 3:
      return S.suspend(() => S.Struct({ bundles: S.optional(__S(2642, __c165, 2)) })).annotate({
        identifier: "GetBucketBundlesResult",
      });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.String,
          metricName: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          period: S.Number,
          statistics: __S(1808, __c113, 0),
          unit: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketMetricData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBucketMetricDataRequest" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          average: S.optional(S.Number),
          maximum: S.optional(S.Number),
          minimum: S.optional(S.Number),
          sampleCount: S.optional(S.Number),
          sum: S.optional(S.Number),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDatapoint" });
    case 1:
      return S.Array(__S(2672, __c167, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          metricName: S.optional(S.String),
          metricData: S.optional(__S(2673, __c167, 1)),
        }),
      ).annotate({ identifier: "GetBucketMetricDataResult" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.optional(S.String),
          pageToken: S.optional(S.String),
          includeConnectedResources: S.optional(S.Boolean),
          includeCors: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBuckets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBucketsRequest" });
    case 1:
      return S.Array(__S(1272, __c79, 8));
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          lastSyncedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          bpaImpactsLightsail: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AccountLevelBpaSync" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          buckets: S.optional(__S(2689, __c168, 1)),
          nextPageToken: S.optional(S.String),
          accountLevelBpaSync: S.optional(__S(2690, __c168, 2)),
        }),
      ).annotate({ identifier: "GetBucketsResult" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeInactive: S.optional(S.Boolean),
          pageToken: S.optional(S.String),
          appCategory: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBundles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBundlesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          price: S.optional(S.Number),
          cpuCount: S.optional(S.Number),
          diskSizeInGb: S.optional(S.Number),
          bundleId: S.optional(S.String),
          instanceType: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          name: S.optional(S.String),
          power: S.optional(S.Number),
          ramSizeInGb: S.optional(S.Number),
          transferPerMonthInGb: S.optional(S.Number),
          supportedPlatforms: S.optional(__S(1808, __c113, 0)),
          supportedAppCategories: S.optional(__S(1808, __c113, 0)),
          publicIpv4AddressCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Bundle" });
    case 2:
      return S.Array(__S(2705, __c169, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          bundles: S.optional(__S(2706, __c169, 2)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBundlesResult" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateStatuses: S.optional(__S(1808, __c113, 0)),
          includeCertificateDetails: S.optional(S.Boolean),
          certificateName: S.optional(S.String),
          pageToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetCertificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCertificatesRequest" });
    case 1:
      return S.Array(__S(1509, __c94, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificates: S.optional(__S(2721, __c170, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCertificatesResult" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetCloudFormationStackRecords" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudFormationStackRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudFormationStackRecordSourceInfo" });
    case 2:
      return S.Array(__S(2737, __c171, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          state: S.optional(S.String),
          sourceInfo: S.optional(__S(2738, __c171, 2)),
          destinationInfo: S.optional(__S(2752, __c172, 0)),
        }),
      ).annotate({ identifier: "CloudFormationStackRecord" });
    case 4:
      return S.Array(__S(2739, __c171, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          cloudFormationStackRecords: S.optional(__S(2740, __c171, 4)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCloudFormationStackRecordsResult" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), service: S.optional(S.String) }),
      ).annotate({ identifier: "DestinationInfo" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ staticIpName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AllocateStaticIp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AllocateStaticIpRequest" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2848, __c178, 0));
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ operations: S.optional(__S(2784, __c174, 0)) })).annotate({
        identifier: "AllocateStaticIpResult",
      });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ zoneName: S.optional(S.String), state: S.optional(S.String) }),
      ).annotate({ identifier: "AvailabilityZone" });
    case 1:
      return S.Array(__S(2816, __c176, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          continentCode: S.optional(S.String),
          description: S.optional(S.String),
          displayName: S.optional(S.String),
          name: S.optional(S.String),
          availabilityZones: S.optional(__S(2817, __c176, 1)),
          relationalDatabaseAvailabilityZones: S.optional(__S(2817, __c176, 1)),
        }),
      ).annotate({ identifier: "Region" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ availabilityZone: S.optional(S.String), regionName: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceLocation" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          resourceName: S.optional(S.String),
          resourceType: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          isTerminal: S.optional(S.Boolean),
          operationDetails: S.optional(S.String),
          operationType: S.optional(S.String),
          status: S.optional(S.String),
          statusChangedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorCode: S.optional(S.String),
          errorDetails: S.optional(S.String),
        }),
      ).annotate({ identifier: "Operation" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          protocols: S.optional(__S(1808, __c113, 0)).pipe(T.HttpQuery("protocols")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/GetContactMethods" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContactMethodsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contactEndpoint: S.optional(S.String),
          status: S.optional(S.String),
          protocol: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          supportCode: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
        }),
      ).annotate({ identifier: "ContactMethod" });
    case 2:
      return S.Array(__S(2865, __c179, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ contactMethods: S.optional(__S(2866, __c179, 2)) }),
      ).annotate({ identifier: "GetContactMethodsResult" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/container-api-metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerAPIMetadataRequest" });
    case 1:
      return S.Array(__S(1616, __c101, 0));
    case 2:
      return S.suspend(() => S.Struct({ metadata: S.optional(__S(2881, __c180, 1)) })).annotate({
        identifier: "GetContainerAPIMetadataResult",
      });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/images",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerImagesRequest" });
    case 1:
      return S.Array(__S(2912, __c182, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ containerImages: S.optional(__S(2897, __c181, 1)) }),
      ).annotate({ identifier: "GetContainerImagesResult" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          image: S.optional(S.String),
          digest: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ContainerImage" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          containerName: S.String.pipe(T.HttpLabel("containerName")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          filterPattern: S.optional(S.String).pipe(T.HttpQuery("filterPattern")),
          pageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/containers/{containerName}/log",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerLogRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logEvents: S.optional(__S(2945, __c184, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetContainerLogResult" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerServiceLogEvent" });
    case 1:
      return S.Array(__S(2944, __c184, 0));
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/deployments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerServiceDeploymentsRequest" });
    case 1:
      return S.Array(__S(1637, __c102, 5));
    case 2:
      return S.suspend(() => S.Struct({ deployments: S.optional(__S(2961, __c185, 1)) })).annotate({
        identifier: "GetContainerServiceDeploymentsResult",
      });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String.pipe(T.HttpLabel("serviceName")),
          metricName: S.String.pipe(T.HttpQuery("metricName")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
          period: S.Number.pipe(T.HttpQuery("period")),
          statistics: __S(1808, __c113, 0).pipe(T.HttpQuery("statistics")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/ls/api/2016-11-28/container-services/{serviceName}/metrics",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerServiceMetricDataRequest" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/container-service-powers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerServicePowersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          powerId: S.optional(S.String),
          price: S.optional(S.Number),
          cpuCount: S.optional(S.Number),
          ramSizeInGb: S.optional(S.Number),
          name: S.optional(S.String),
          isActive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ContainerServicePower" });
    case 2:
      return S.Array(__S(2993, __c187, 1));
    case 3:
      return S.suspend(() => S.Struct({ powers: S.optional(__S(2994, __c187, 2)) })).annotate({
        identifier: "GetContainerServicePowersResult",
      });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.optional(S.String).pipe(T.HttpQuery("serviceName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ls/api/2016-11-28/container-services" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerServicesRequest" });
    case 1:
      return S.Array(__S(1651, __c103, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ containerServices: S.optional(__S(3009, __c188, 1)) }),
      ).annotate({ identifier: "ContainerServicesListResult" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/budgettracker/getCostEstimate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCostEstimateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          end: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimePeriod" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          usageCost: S.optional(S.Number),
          pricingUnit: S.optional(S.String),
          unit: S.optional(S.Number),
          currency: S.optional(S.String),
          timePeriod: S.optional(__S(3025, __c189, 1)),
        }),
      ).annotate({ identifier: "EstimateByTime" });
    case 3:
      return S.Array(__S(3026, __c189, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          usageType: S.optional(S.String),
          resultsByTime: S.optional(__S(3027, __c189, 3)),
        }),
      ).annotate({ identifier: "CostEstimate" });
    case 5:
      return S.Array(__S(3028, __c189, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.optional(S.String),
          resourceType: S.optional(S.String),
          costEstimates: S.optional(__S(3029, __c189, 5)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceBudgetEstimate" });
    case 7:
      return S.Array(__S(3030, __c189, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ resourcesBudgetEstimate: S.optional(__S(3031, __c189, 7)) }),
      ).annotate({ identifier: "GetCostEstimateResult" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ diskName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDisk" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDiskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ disk: S.optional(__S(3058, __c191, 2)) })).annotate({
        identifier: "GetDiskResult",
      });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          snapshotTimeOfDay: S.optional(S.String),
          nextSnapshotTimeOfDay: S.optional(S.String),
          threshold: S.optional(S.String),
          duration: S.optional(S.String),
        }),
      ).annotate({ identifier: "AddOn" });
    case 1:
      return S.Array(__S(3056, __c191, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          addOns: S.optional(__S(3057, __c191, 1)),
          sizeInGb: S.optional(S.Number),
          isSystemDisk: S.optional(S.Boolean),
          iops: S.optional(S.Number),
          path: S.optional(S.String),
          state: S.optional(S.String),
          attachedTo: S.optional(S.String),
          isAttached: S.optional(S.Boolean),
          attachmentState: S.optional(S.String),
          gbInUse: S.optional(S.Number),
          autoMountStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Disk" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.String, certificateName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachCertificateToDistribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachCertificateToDistributionRequest" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ operation: S.optional(__S(2848, __c178, 0)) })).annotate({
        identifier: "AttachCertificateToDistributionResult",
      });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDisks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDisksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ disks: S.optional(__S(3120, __c195, 0)), nextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetDisksResult" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(3058, __c191, 2));
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ diskSnapshotName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDiskSnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDiskSnapshotRequest" });
    case 1:
      return S.suspend(() => S.Struct({ diskSnapshot: S.optional(__S(3152, __c197, 0)) })).annotate(
        { identifier: "GetDiskSnapshotResult" },
      );
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          sizeInGb: S.optional(S.Number),
          state: S.optional(S.String),
          progress: S.optional(S.String),
          fromDiskName: S.optional(S.String),
          fromDiskArn: S.optional(S.String),
          fromInstanceName: S.optional(S.String),
          fromInstanceArn: S.optional(S.String),
          isFromAutoSnapshot: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DiskSnapshot" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDiskSnapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDiskSnapshotsRequest" });
    case 1:
      return S.Array(__S(3152, __c197, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          diskSnapshots: S.optional(__S(3169, __c198, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDiskSnapshotsResult" });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDistributionBundles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionBundlesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bundleId: S.optional(S.String),
          name: S.optional(S.String),
          price: S.optional(S.Number),
          transferPerMonthInGb: S.optional(S.Number),
          isActive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DistributionBundle" });
    case 2:
      return S.Array(__S(3185, __c199, 1));
    case 3:
      return S.suspend(() => S.Struct({ bundles: S.optional(__S(3186, __c199, 2)) })).annotate({
        identifier: "GetDistributionBundlesResult",
      });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDistributionLatestCacheReset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionLatestCacheResetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDistributionLatestCacheResetResult" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionName: S.String,
          metricName: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          period: S.Number,
          unit: S.String,
          statistics: __S(1808, __c113, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDistributionMetricData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionMetricDataRequest" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ distributionName: S.optional(S.String), pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDistributions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionsRequest" });
    case 1:
      return S.Array(__S(1825, __c114, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          distributions: S.optional(__S(3233, __c202, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDistributionsResult" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainRequest" });
    case 1:
      return S.suspend(() => S.Struct({ domain: S.optional(__S(3266, __c204, 2)) })).annotate({
        identifier: "GetDomainResult",
      });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1888, __c118, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          nameServersUpdateState: S.optional(__S(1488, __c93, 0)),
          r53HostedZoneDeletionState: S.optional(__S(1488, __c93, 0)),
        }),
      ).annotate({ identifier: "RegisteredDomainDelegationInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          supportCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(1249, __c78, 1)),
          domainEntries: S.optional(__S(3264, __c204, 0)),
          registeredDomainDelegationInfo: S.optional(__S(3265, __c204, 1)),
        }),
      ).annotate({ identifier: "Domain" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDomains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainsRequest" });
    case 1:
      return S.Array(__S(3266, __c204, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domains: S.optional(__S(3281, __c205, 1)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDomainsResult" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pageToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetExportSnapshotRecords" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExportSnapshotRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          path: S.optional(S.String),
          sizeInGb: S.optional(S.Number),
          isSystemDisk: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DiskInfo" });
    case 2:
      return S.Array(__S(3297, __c206, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          fromBundleId: S.optional(S.String),
          fromBlueprintId: S.optional(S.String),
          fromDiskInfo: S.optional(__S(3298, __c206, 2)),
        }),
      ).annotate({ identifier: "InstanceSnapshotInfo" });
    case 4:
      return S.suspend(() => S.Struct({ sizeInGb: S.optional(S.Number) })).annotate({
        identifier: "DiskSnapshotInfo",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          fromResourceName: S.optional(S.String),
          fromResourceArn: S.optional(S.String),
          instanceSnapshotInfo: S.optional(__S(3299, __c206, 3)),
          diskSnapshotInfo: S.optional(__S(3300, __c206, 4)),
        }),
      ).annotate({ identifier: "ExportSnapshotRecordSourceInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          location: S.optional(__S(2832, __c177, 0)),
          resourceType: S.optional(S.String),
          state: S.optional(S.String),
          sourceInfo: S.optional(__S(3301, __c206, 5)),
          destinationInfo: S.optional(__S(2752, __c172, 0)),
        }),
      ).annotate({ identifier: "ExportSnapshotRecord" });
    case 7:
      return S.Array(__S(3302, __c206, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          exportSnapshotRecords: S.optional(__S(3303, __c206, 7)),
          nextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetExportSnapshotRecordsResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
