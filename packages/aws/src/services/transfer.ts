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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Transfer",
  serviceShapeName: "TransferService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "transfer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-05");
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
              `https://transfer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://transfer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://transfer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://transfer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://transfer.{R}.{D}","properties":{},"headers":{}}');

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
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceExistsException>()(
    "ResourceExistsException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Resource: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Resource: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceUnavailable", httpResponseCode: 503 }),
      /*@__PURE__*/ T.HttpError(503),
    ),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type HomeDirectory = string;
export type HomeDirectoryType = "PATH" | "LOGICAL" | (string & {});
export type MapEntry = string;
export type MapTarget = string;
export type MapType = "FILE" | "DIRECTORY" | (string & {});
export interface HomeDirectoryMapEntry {
  Entry: string;
  Target: string;
  Type?: MapType;
}
export type HomeDirectoryMappings = HomeDirectoryMapEntry[];
export type Policy = string;
export type PosixId = number;
export type SecondaryGids = number[];
export interface PosixProfile {
  Uid: number;
  Gid: number;
  SecondaryGids?: number[];
}
export type Role = string;
export type ServerId = string;
export type ExternalId = string;
export interface CreateAccessRequest {
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role: string;
  ServerId: string;
  ExternalId: string;
}
export interface CreateAccessResponse {
  ServerId: string;
  ExternalId: string;
}
export type Description = string;
export type ProfileId = string;
export type AgreementStatusType = "ACTIVE" | "INACTIVE" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export type PreserveFilenameType = "ENABLED" | "DISABLED" | (string & {});
export type EnforceMessageSigningType = "ENABLED" | "DISABLED" | (string & {});
export interface CustomDirectoriesType {
  FailedFilesDirectory: string;
  MdnFilesDirectory: string;
  PayloadFilesDirectory: string;
  StatusFilesDirectory: string;
  TemporaryFilesDirectory: string;
}
export interface CreateAgreementRequest {
  Description?: string;
  ServerId: string;
  LocalProfileId: string;
  PartnerProfileId: string;
  BaseDirectory?: string;
  AccessRole: string;
  Status?: AgreementStatusType;
  Tags?: Tag[];
  PreserveFilename?: PreserveFilenameType;
  EnforceMessageSigning?: EnforceMessageSigningType;
  CustomDirectories?: CustomDirectoriesType;
}
export type AgreementId = string;
export interface CreateAgreementResponse {
  AgreementId: string;
}
export type Url = string;
export type MessageSubject = string | redacted.Redacted<string>;
export type CompressionEnum = "ZLIB" | "DISABLED" | (string & {});
export type EncryptionAlg =
  | "AES128_CBC"
  | "AES192_CBC"
  | "AES256_CBC"
  | "DES_EDE3_CBC"
  | "NONE"
  | (string & {});
export type SigningAlg = "SHA256" | "SHA384" | "SHA512" | "SHA1" | "NONE" | (string & {});
export type MdnSigningAlg =
  | "SHA256"
  | "SHA384"
  | "SHA512"
  | "SHA1"
  | "NONE"
  | "DEFAULT"
  | (string & {});
export type MdnResponse = "SYNC" | "NONE" | "ASYNC" | (string & {});
export type As2ConnectorSecretId = string;
export type PreserveContentType = "ENABLED" | "DISABLED" | (string & {});
export type As2AsyncMdnServerIds = string[];
export interface As2AsyncMdnConnectorConfig {
  Url?: string;
  ServerIds?: string[];
}
export interface As2ConnectorConfig {
  LocalProfileId?: string;
  PartnerProfileId?: string;
  MessageSubject?: string | redacted.Redacted<string>;
  Compression?: CompressionEnum;
  EncryptionAlgorithm?: EncryptionAlg;
  SigningAlgorithm?: SigningAlg;
  MdnSigningAlgorithm?: MdnSigningAlg;
  MdnResponse?: MdnResponse;
  BasicAuthSecretId?: string;
  PreserveContentType?: PreserveContentType;
  AsyncMdnConfig?: As2AsyncMdnConnectorConfig;
}
export type SecretId = string;
export type SftpConnectorTrustedHostKey = string;
export type SftpConnectorTrustedHostKeyList = string[];
export type MaxConcurrentConnections = number;
export type SecretVersionStage = string;
export type SecretVersionStageList = string[];
export interface SftpConnectorConfig {
  UserSecretId?: string;
  TrustedHostKeys?: string[];
  MaxConcurrentConnections?: number;
  OrderedUserSecretVersionStages?: string[];
}
export type ConnectorSecurityPolicyName = string;
export type VpcLatticeResourceConfigurationArn = string;
export type SftpPort = number;
export interface ConnectorVpcLatticeEgressConfig {
  ResourceConfigurationArn: string;
  PortNumber?: number;
}
export type ConnectorEgressConfig = { VpcLattice: ConnectorVpcLatticeEgressConfig };
export type ConnectorsIpAddressType = "IPV4" | "DUALSTACK" | (string & {});
export interface CreateConnectorRequest {
  Url?: string;
  As2Config?: As2ConnectorConfig;
  AccessRole: string;
  LoggingRole?: string;
  Tags?: Tag[];
  SftpConfig?: SftpConnectorConfig;
  SecurityPolicyName?: string;
  EgressConfig?: ConnectorEgressConfig;
  IpAddressType?: ConnectorsIpAddressType;
}
export type ConnectorId = string;
export interface CreateConnectorResponse {
  ConnectorId: string;
}
export type As2Id = string;
export type ProfileType = "LOCAL" | "PARTNER" | (string & {});
export type CertificateId = string;
export type CertificateIds = string[];
export interface CreateProfileRequest {
  As2Id: string;
  ProfileType: ProfileType;
  CertificateIds?: string[];
  Tags?: Tag[];
}
export interface CreateProfileResponse {
  ProfileId: string;
}
export type Certificate = string;
export type Domain = "S3" | "EFS" | (string & {});
export type AddressAllocationId = string;
export type AddressAllocationIds = string[];
export type SubnetId = string;
export type SubnetIds = string[];
export type VpcEndpointId = string;
export type VpcId = string;
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface EndpointDetails {
  AddressAllocationIds?: string[];
  SubnetIds?: string[];
  VpcEndpointId?: string;
  VpcId?: string;
  SecurityGroupIds?: string[];
}
export type EndpointType = "PUBLIC" | "VPC" | "VPC_ENDPOINT" | (string & {});
export type HostKey = string | redacted.Redacted<string>;
export type DirectoryId = string;
export type SftpAuthenticationMethods =
  | "PASSWORD"
  | "PUBLIC_KEY"
  | "PUBLIC_KEY_OR_PASSWORD"
  | "PUBLIC_KEY_AND_PASSWORD"
  | (string & {});
export interface IdentityProviderDetails {
  Url?: string;
  InvocationRole?: string;
  DirectoryId?: string;
  Function?: string;
  SftpAuthenticationMethods?: SftpAuthenticationMethods;
}
export type IdentityProviderType =
  | "SERVICE_MANAGED"
  | "API_GATEWAY"
  | "AWS_DIRECTORY_SERVICE"
  | "AWS_LAMBDA"
  | (string & {});
export type NullableRole = string;
export type PostAuthenticationLoginBanner = string;
export type PreAuthenticationLoginBanner = string;
export type Protocol = "SFTP" | "FTP" | "FTPS" | "AS2" | (string & {});
export type Protocols = Protocol[];
export type PassiveIp = string;
export type TlsSessionResumptionMode = "DISABLED" | "ENABLED" | "ENFORCED" | (string & {});
export type SetStatOption = "DEFAULT" | "ENABLE_NO_OP" | (string & {});
export type CommunicationMode = "CLIENT_TALK_FIRST" | "SERVER_TALK_FIRST" | (string & {});
export interface SftpPortWithOptions {
  SftpPort: number;
  CommunicationMode?: CommunicationMode;
}
export type SftpPorts = SftpPortWithOptions[];
export type As2Transport = "HTTP" | (string & {});
export type As2Transports = As2Transport[];
export type ProxyMode = "NONE" | "PROXY_PROTOCOL_V2_ENFORCED" | (string & {});
export interface ProxyConfig {
  SftpMode?: ProxyMode;
}
export interface ProtocolDetails {
  PassiveIp?: string;
  TlsSessionResumptionMode?: TlsSessionResumptionMode;
  SetStatOption?: SetStatOption;
  SftpPorts?: SftpPortWithOptions[];
  As2Transports?: As2Transport[];
  ProxyConfig?: ProxyConfig;
}
export type SecurityPolicyName = string;
export type WorkflowId = string;
export interface WorkflowDetail {
  WorkflowId: string;
  ExecutionRole: string;
}
export type OnUploadWorkflowDetails = WorkflowDetail[];
export type OnPartialUploadWorkflowDetails = WorkflowDetail[];
export interface WorkflowDetails {
  OnUpload?: WorkflowDetail[];
  OnPartialUpload?: WorkflowDetail[];
}
export type Arn = string;
export type StructuredLogDestinations = string[];
export type DirectoryListingOptimization = "ENABLED" | "DISABLED" | (string & {});
export interface S3StorageOptions {
  DirectoryListingOptimization?: DirectoryListingOptimization;
}
export type IpAddressType = "IPV4" | "DUALSTACK" | (string & {});
export interface CreateServerRequest {
  Certificate?: string;
  Domain?: Domain;
  EndpointDetails?: EndpointDetails;
  EndpointType?: EndpointType;
  HostKey?: string | redacted.Redacted<string>;
  IdentityProviderDetails?: IdentityProviderDetails;
  IdentityProviderType?: IdentityProviderType;
  LoggingRole?: string;
  PostAuthenticationLoginBanner?: string;
  PreAuthenticationLoginBanner?: string;
  Protocols?: Protocol[];
  ProtocolDetails?: ProtocolDetails;
  SecurityPolicyName?: string;
  Tags?: Tag[];
  WorkflowDetails?: WorkflowDetails;
  StructuredLogDestinations?: string[];
  S3StorageOptions?: S3StorageOptions;
  IpAddressType?: IpAddressType;
}
export interface CreateServerResponse {
  ServerId: string;
}
export type SshPublicKeyBody = string;
export type UserName = string;
export interface CreateUserRequest {
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role: string;
  ServerId: string;
  SshPublicKeyBody?: string;
  Tags?: Tag[];
  UserName: string;
}
export interface CreateUserResponse {
  ServerId: string;
  UserName: string;
}
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfig {
  InstanceArn?: string;
  Role?: string;
}
export type WebAppIdentityProviderDetails = { IdentityCenterConfig: IdentityCenterConfig };
export type WebAppAccessEndpoint = string;
export type WebAppUnitCount = number;
export type WebAppUnits = { Provisioned: number };
export type WebAppEndpointPolicy = "FIPS" | "STANDARD" | (string & {});
export type WebAppVpcEndpointIpAddressType = "IPV4" | "DUALSTACK" | (string & {});
export interface WebAppVpcConfig {
  SubnetIds?: string[];
  VpcId?: string;
  SecurityGroupIds?: string[];
  IpAddressType?: WebAppVpcEndpointIpAddressType;
}
export type WebAppEndpointDetails = { Vpc: WebAppVpcConfig };
export interface CreateWebAppRequest {
  IdentityProviderDetails: WebAppIdentityProviderDetails;
  AccessEndpoint?: string;
  WebAppUnits?: WebAppUnits;
  Tags?: Tag[];
  WebAppEndpointPolicy?: WebAppEndpointPolicy;
  EndpointDetails?: WebAppEndpointDetails;
}
export type WebAppId = string;
export interface CreateWebAppResponse {
  WebAppId: string;
}
export type WorkflowDescription = string;
export type WorkflowStepType = "COPY" | "CUSTOM" | "TAG" | "DELETE" | "DECRYPT" | (string & {});
export type WorkflowStepName = string;
export type S3Bucket = string;
export type S3Key = string;
export interface S3InputFileLocation {
  Bucket?: string;
  Key?: string;
}
export type EfsFileSystemId = string;
export type EfsPath = string;
export interface EfsFileLocation {
  FileSystemId?: string;
  Path?: string;
}
export interface InputFileLocation {
  S3FileLocation?: S3InputFileLocation;
  EfsFileLocation?: EfsFileLocation;
}
export type OverwriteExisting = "TRUE" | "FALSE" | (string & {});
export type SourceFileLocation = string;
export interface CopyStepDetails {
  Name?: string;
  DestinationFileLocation?: InputFileLocation;
  OverwriteExisting?: OverwriteExisting;
  SourceFileLocation?: string;
}
export type CustomStepTarget = string;
export type CustomStepTimeoutSeconds = number;
export interface CustomStepDetails {
  Name?: string;
  Target?: string;
  TimeoutSeconds?: number;
  SourceFileLocation?: string;
}
export interface DeleteStepDetails {
  Name?: string;
  SourceFileLocation?: string;
}
export type S3TagKey = string;
export type S3TagValue = string;
export interface S3Tag {
  Key: string;
  Value: string;
}
export type S3Tags = S3Tag[];
export interface TagStepDetails {
  Name?: string;
  Tags?: S3Tag[];
  SourceFileLocation?: string;
}
export type EncryptionType = "PGP" | (string & {});
export interface DecryptStepDetails {
  Name?: string;
  Type: EncryptionType;
  SourceFileLocation?: string;
  OverwriteExisting?: OverwriteExisting;
  DestinationFileLocation: InputFileLocation;
}
export interface WorkflowStep {
  Type?: WorkflowStepType;
  CopyStepDetails?: CopyStepDetails;
  CustomStepDetails?: CustomStepDetails;
  DeleteStepDetails?: DeleteStepDetails;
  TagStepDetails?: TagStepDetails;
  DecryptStepDetails?: DecryptStepDetails;
}
export type WorkflowSteps = WorkflowStep[];
export interface CreateWorkflowRequest {
  Description?: string;
  Steps: WorkflowStep[];
  OnExceptionSteps?: WorkflowStep[];
  Tags?: Tag[];
  StructuredLogDestinations?: string[];
}
export interface CreateWorkflowResponse {
  WorkflowId: string;
}
export interface DeleteAccessRequest {
  ServerId: string;
  ExternalId: string;
}
export interface DeleteAccessResponse {}
export interface DeleteAgreementRequest {
  AgreementId: string;
  ServerId: string;
}
export interface DeleteAgreementResponse {}
export interface DeleteCertificateRequest {
  CertificateId: string;
}
export interface DeleteCertificateResponse {}
export interface DeleteConnectorRequest {
  ConnectorId: string;
}
export interface DeleteConnectorResponse {}
export type HostKeyId = string;
export interface DeleteHostKeyRequest {
  ServerId: string;
  HostKeyId: string;
}
export interface DeleteHostKeyResponse {}
export interface DeleteProfileRequest {
  ProfileId: string;
}
export interface DeleteProfileResponse {}
export interface DeleteServerRequest {
  ServerId: string;
}
export interface DeleteServerResponse {}
export type SshPublicKeyId = string;
export interface DeleteSshPublicKeyRequest {
  ServerId: string;
  SshPublicKeyId: string;
  UserName: string;
}
export interface DeleteSshPublicKeyResponse {}
export interface DeleteUserRequest {
  ServerId: string;
  UserName: string;
}
export interface DeleteUserResponse {}
export interface DeleteWebAppRequest {
  WebAppId: string;
}
export interface DeleteWebAppResponse {}
export interface DeleteWebAppCustomizationRequest {
  WebAppId: string;
}
export interface DeleteWebAppCustomizationResponse {}
export interface DeleteWorkflowRequest {
  WorkflowId: string;
}
export interface DeleteWorkflowResponse {}
export interface DescribeAccessRequest {
  ServerId: string;
  ExternalId: string;
}
export interface DescribedAccess {
  HomeDirectory?: string;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  HomeDirectoryType?: HomeDirectoryType;
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role?: string;
  ExternalId?: string;
}
export interface DescribeAccessResponse {
  ServerId: string;
  Access: DescribedAccess;
}
export interface DescribeAgreementRequest {
  AgreementId: string;
  ServerId: string;
}
export interface DescribedAgreement {
  Arn: string;
  AgreementId?: string;
  Description?: string;
  Status?: AgreementStatusType;
  ServerId?: string;
  LocalProfileId?: string;
  PartnerProfileId?: string;
  BaseDirectory?: string;
  AccessRole?: string;
  Tags?: Tag[];
  PreserveFilename?: PreserveFilenameType;
  EnforceMessageSigning?: EnforceMessageSigningType;
  CustomDirectories?: CustomDirectoriesType;
}
export interface DescribeAgreementResponse {
  Agreement: DescribedAgreement;
}
export interface DescribeCertificateRequest {
  CertificateId: string;
}
export type CertificateUsageType = "SIGNING" | "ENCRYPTION" | "TLS" | (string & {});
export type CertificateStatusType = "ACTIVE" | "PENDING_ROTATION" | "INACTIVE" | (string & {});
export type CertificateBodyType = string | redacted.Redacted<string>;
export type CertificateChainType = string | redacted.Redacted<string>;
export type CertDate = Date;
export type CertSerial = string;
export type CertificateType = "CERTIFICATE" | "CERTIFICATE_WITH_PRIVATE_KEY" | (string & {});
export interface DescribedCertificate {
  Arn: string;
  CertificateId?: string;
  Usage?: CertificateUsageType;
  Status?: CertificateStatusType;
  Certificate?: string | redacted.Redacted<string>;
  CertificateChain?: string | redacted.Redacted<string>;
  ActiveDate?: Date;
  InactiveDate?: Date;
  Serial?: string;
  NotBeforeDate?: Date;
  NotAfterDate?: Date;
  Type?: CertificateType;
  Description?: string;
  Tags?: Tag[];
}
export interface DescribeCertificateResponse {
  Certificate: DescribedCertificate;
}
export interface DescribeConnectorRequest {
  ConnectorId: string;
}
export type ServiceManagedEgressIpAddress = string;
export type ServiceManagedEgressIpAddresses = string[];
export interface DescribedConnectorVpcLatticeEgressConfig {
  ResourceConfigurationArn: string;
  PortNumber?: number;
}
export type DescribedConnectorEgressConfig = {
  VpcLattice: DescribedConnectorVpcLatticeEgressConfig;
};
export type ConnectorEgressType = "SERVICE_MANAGED" | "VPC_LATTICE" | (string & {});
export type ConnectorErrorMessage = string;
export type ConnectorStatus = "ACTIVE" | "ERRORED" | "PENDING" | (string & {});
export interface DescribedConnector {
  Arn: string;
  ConnectorId?: string;
  Url?: string;
  As2Config?: As2ConnectorConfig;
  AccessRole?: string;
  LoggingRole?: string;
  Tags?: Tag[];
  SftpConfig?: SftpConnectorConfig;
  ServiceManagedEgressIpAddresses?: string[];
  SecurityPolicyName?: string;
  EgressConfig?: DescribedConnectorEgressConfig;
  EgressType: ConnectorEgressType;
  ErrorMessage?: string;
  Status: ConnectorStatus;
  IpAddressType?: ConnectorsIpAddressType;
}
export interface DescribeConnectorResponse {
  Connector: DescribedConnector;
}
export type ExecutionId = string;
export interface DescribeExecutionRequest {
  ExecutionId: string;
  WorkflowId: string;
}
export type S3VersionId = string;
export type S3Etag = string;
export interface S3FileLocation {
  Bucket?: string;
  Key?: string;
  VersionId?: string;
  Etag?: string;
}
export interface FileLocation {
  S3FileLocation?: S3FileLocation;
  EfsFileLocation?: EfsFileLocation;
}
export type SessionId = string;
export interface UserDetails {
  UserName: string;
  ServerId: string;
  SessionId?: string;
}
export interface ServiceMetadata {
  UserDetails: UserDetails;
}
export type LogGroupName = string;
export interface LoggingConfiguration {
  LoggingRole?: string;
  LogGroupName?: string;
}
export type ExecutionStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "EXCEPTION"
  | "HANDLING_EXCEPTION"
  | (string & {});
export type StepResultOutputsJson = string;
export type ExecutionErrorType =
  | "PERMISSION_DENIED"
  | "CUSTOM_STEP_FAILED"
  | "THROTTLED"
  | "ALREADY_EXISTS"
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "TIMEOUT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export type ExecutionErrorMessage = string;
export interface ExecutionError {
  Type: ExecutionErrorType;
  Message: string;
}
export interface ExecutionStepResult {
  StepType?: WorkflowStepType;
  Outputs?: string;
  Error?: ExecutionError;
}
export type ExecutionStepResults = ExecutionStepResult[];
export interface ExecutionResults {
  Steps?: ExecutionStepResult[];
  OnExceptionSteps?: ExecutionStepResult[];
}
export interface DescribedExecution {
  ExecutionId?: string;
  InitialFileLocation?: FileLocation;
  ServiceMetadata?: ServiceMetadata;
  ExecutionRole?: string;
  LoggingConfiguration?: LoggingConfiguration;
  PosixProfile?: PosixProfile;
  Status?: ExecutionStatus;
  Results?: ExecutionResults;
}
export interface DescribeExecutionResponse {
  WorkflowId: string;
  Execution: DescribedExecution;
}
export interface DescribeHostKeyRequest {
  ServerId: string;
  HostKeyId: string;
}
export type HostKeyFingerprint = string;
export type HostKeyDescription = string;
export type HostKeyType = string;
export type DateImported = Date;
export interface DescribedHostKey {
  Arn: string;
  HostKeyId?: string;
  HostKeyFingerprint?: string;
  Description?: string;
  Type?: string;
  DateImported?: Date;
  Tags?: Tag[];
}
export interface DescribeHostKeyResponse {
  HostKey: DescribedHostKey;
}
export interface DescribeProfileRequest {
  ProfileId: string;
}
export interface DescribedProfile {
  Arn: string;
  ProfileId?: string;
  ProfileType?: ProfileType;
  As2Id?: string;
  CertificateIds?: string[];
  Tags?: Tag[];
}
export interface DescribeProfileResponse {
  Profile: DescribedProfile;
}
export interface DescribeSecurityPolicyRequest {
  SecurityPolicyName: string;
}
export type Fips = boolean;
export type SecurityPolicyOption = string;
export type SecurityPolicyOptions = string[];
export type SecurityPolicyResourceType = "SERVER" | "CONNECTOR" | (string & {});
export type SecurityPolicyProtocol = "SFTP" | "FTPS" | (string & {});
export type SecurityPolicyProtocols = SecurityPolicyProtocol[];
export interface DescribedSecurityPolicy {
  Fips?: boolean;
  SecurityPolicyName: string;
  SshCiphers?: string[];
  SshKexs?: string[];
  SshMacs?: string[];
  TlsCiphers?: string[];
  SshHostKeyAlgorithms?: string[];
  Type?: SecurityPolicyResourceType;
  Protocols?: SecurityPolicyProtocol[];
}
export interface DescribeSecurityPolicyResponse {
  SecurityPolicy: DescribedSecurityPolicy;
}
export interface DescribeServerRequest {
  ServerId: string;
}
export type State =
  | "OFFLINE"
  | "ONLINE"
  | "STARTING"
  | "STOPPING"
  | "START_FAILED"
  | "STOP_FAILED"
  | (string & {});
export type UserCount = number;
export interface DescribedServer {
  Arn: string;
  Certificate?: string;
  ProtocolDetails?: ProtocolDetails;
  Domain?: Domain;
  EndpointDetails?: EndpointDetails;
  EndpointType?: EndpointType;
  HostKeyFingerprint?: string;
  IdentityProviderDetails?: IdentityProviderDetails;
  IdentityProviderType?: IdentityProviderType;
  LoggingRole?: string;
  PostAuthenticationLoginBanner?: string;
  PreAuthenticationLoginBanner?: string;
  Protocols?: Protocol[];
  SecurityPolicyName?: string;
  ServerId?: string;
  State?: State;
  Tags?: Tag[];
  UserCount?: number;
  WorkflowDetails?: WorkflowDetails;
  StructuredLogDestinations?: string[];
  S3StorageOptions?: S3StorageOptions;
  As2ServiceManagedEgressIpAddresses?: string[];
  IpAddressType?: IpAddressType;
}
export interface DescribeServerResponse {
  Server: DescribedServer;
}
export interface DescribeUserRequest {
  ServerId: string;
  UserName: string;
}
export interface SshPublicKey {
  DateImported: Date;
  SshPublicKeyBody: string;
  SshPublicKeyId: string;
}
export type SshPublicKeys = SshPublicKey[];
export interface DescribedUser {
  Arn: string;
  HomeDirectory?: string;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  HomeDirectoryType?: HomeDirectoryType;
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role?: string;
  SshPublicKeys?: SshPublicKey[];
  Tags?: Tag[];
  UserName?: string;
}
export interface DescribeUserResponse {
  ServerId: string;
  User: DescribedUser;
}
export interface DescribeWebAppRequest {
  WebAppId: string;
}
export type IdentityCenterApplicationArn = string;
export interface DescribedIdentityCenterConfig {
  ApplicationArn?: string;
  InstanceArn?: string;
  Role?: string;
}
export type DescribedWebAppIdentityProviderDetails = {
  IdentityCenterConfig: DescribedIdentityCenterConfig;
};
export type WebAppEndpoint = string;
export type WebAppEndpointType = "PUBLIC" | "VPC" | (string & {});
export interface DescribedWebAppVpcConfig {
  SubnetIds?: string[];
  VpcId?: string;
  VpcEndpointId?: string;
}
export type DescribedWebAppEndpointDetails = { Vpc: DescribedWebAppVpcConfig };
export interface DescribedWebApp {
  Arn: string;
  WebAppId: string;
  DescribedIdentityProviderDetails?: DescribedWebAppIdentityProviderDetails;
  AccessEndpoint?: string;
  WebAppEndpoint?: string;
  WebAppUnits?: WebAppUnits;
  Tags?: Tag[];
  WebAppEndpointPolicy?: WebAppEndpointPolicy;
  EndpointType?: WebAppEndpointType;
  DescribedEndpointDetails?: DescribedWebAppEndpointDetails;
}
export interface DescribeWebAppResponse {
  WebApp: DescribedWebApp;
}
export interface DescribeWebAppCustomizationRequest {
  WebAppId: string;
}
export type WebAppTitle = string;
export type WebAppLogoFile = Uint8Array | redacted.Redacted<Uint8Array>;
export type WebAppFaviconFile = Uint8Array | redacted.Redacted<Uint8Array>;
export interface DescribedWebAppCustomization {
  Arn: string;
  WebAppId: string;
  Title?: string;
  LogoFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  FaviconFile?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface DescribeWebAppCustomizationResponse {
  WebAppCustomization: DescribedWebAppCustomization;
}
export interface DescribeWorkflowRequest {
  WorkflowId: string;
}
export interface DescribedWorkflow {
  Arn: string;
  Description?: string;
  Steps?: WorkflowStep[];
  OnExceptionSteps?: WorkflowStep[];
  WorkflowId?: string;
  Tags?: Tag[];
  StructuredLogDestinations?: string[];
}
export interface DescribeWorkflowResponse {
  Workflow: DescribedWorkflow;
}
export type PrivateKeyType = string | redacted.Redacted<string>;
export interface ImportCertificateRequest {
  Usage: CertificateUsageType;
  Certificate: string | redacted.Redacted<string>;
  CertificateChain?: string | redacted.Redacted<string>;
  PrivateKey?: string | redacted.Redacted<string>;
  ActiveDate?: Date;
  InactiveDate?: Date;
  Description?: string;
  Tags?: Tag[];
}
export interface ImportCertificateResponse {
  CertificateId: string;
}
export interface ImportHostKeyRequest {
  ServerId: string;
  HostKeyBody: string | redacted.Redacted<string>;
  Description?: string;
  Tags?: Tag[];
}
export interface ImportHostKeyResponse {
  ServerId: string;
  HostKeyId: string;
}
export interface ImportSshPublicKeyRequest {
  ServerId: string;
  SshPublicKeyBody: string;
  UserName: string;
}
export interface ImportSshPublicKeyResponse {
  ServerId: string;
  SshPublicKeyId: string;
  UserName: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAccessesRequest {
  MaxResults?: number;
  NextToken?: string;
  ServerId: string;
}
export interface ListedAccess {
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  Role?: string;
  ExternalId?: string;
}
export type ListedAccesses = ListedAccess[];
export interface ListAccessesResponse {
  NextToken?: string;
  ServerId: string;
  Accesses: ListedAccess[];
}
export interface ListAgreementsRequest {
  MaxResults?: number;
  NextToken?: string;
  ServerId: string;
}
export interface ListedAgreement {
  Arn?: string;
  AgreementId?: string;
  Description?: string;
  Status?: AgreementStatusType;
  ServerId?: string;
  LocalProfileId?: string;
  PartnerProfileId?: string;
}
export type ListedAgreements = ListedAgreement[];
export interface ListAgreementsResponse {
  NextToken?: string;
  Agreements: ListedAgreement[];
}
export interface ListCertificatesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedCertificate {
  Arn?: string;
  CertificateId?: string;
  Usage?: CertificateUsageType;
  Status?: CertificateStatusType;
  ActiveDate?: Date;
  InactiveDate?: Date;
  Type?: CertificateType;
  Description?: string;
}
export type ListedCertificates = ListedCertificate[];
export interface ListCertificatesResponse {
  NextToken?: string;
  Certificates: ListedCertificate[];
}
export interface ListConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedConnector {
  Arn?: string;
  ConnectorId?: string;
  Url?: string;
}
export type ListedConnectors = ListedConnector[];
export interface ListConnectorsResponse {
  NextToken?: string;
  Connectors: ListedConnector[];
}
export interface ListExecutionsRequest {
  MaxResults?: number;
  NextToken?: string;
  WorkflowId: string;
}
export interface ListedExecution {
  ExecutionId?: string;
  InitialFileLocation?: FileLocation;
  ServiceMetadata?: ServiceMetadata;
  Status?: ExecutionStatus;
}
export type ListedExecutions = ListedExecution[];
export interface ListExecutionsResponse {
  NextToken?: string;
  WorkflowId: string;
  Executions: ListedExecution[];
}
export type TransferId = string;
export interface ListFileTransferResultsRequest {
  ConnectorId: string;
  TransferId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type FilePath = string;
export type TransferTableStatus = "QUEUED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type FailureCode = string;
export type Message = string;
export interface ConnectorFileTransferResult {
  FilePath: string;
  StatusCode: TransferTableStatus;
  FailureCode?: string;
  FailureMessage?: string;
}
export type ConnectorFileTransferResults = ConnectorFileTransferResult[];
export interface ListFileTransferResultsResponse {
  FileTransferResults: ConnectorFileTransferResult[];
  NextToken?: string;
}
export interface ListHostKeysRequest {
  MaxResults?: number;
  NextToken?: string;
  ServerId: string;
}
export interface ListedHostKey {
  Arn: string;
  HostKeyId?: string;
  Fingerprint?: string;
  Description?: string;
  Type?: string;
  DateImported?: Date;
}
export type ListedHostKeys = ListedHostKey[];
export interface ListHostKeysResponse {
  NextToken?: string;
  ServerId: string;
  HostKeys: ListedHostKey[];
}
export interface ListProfilesRequest {
  MaxResults?: number;
  NextToken?: string;
  ProfileType?: ProfileType;
}
export interface ListedProfile {
  Arn?: string;
  ProfileId?: string;
  As2Id?: string;
  ProfileType?: ProfileType;
}
export type ListedProfiles = ListedProfile[];
export interface ListProfilesResponse {
  NextToken?: string;
  Profiles: ListedProfile[];
}
export interface ListSecurityPoliciesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type SecurityPolicyNames = string[];
export interface ListSecurityPoliciesResponse {
  NextToken?: string;
  SecurityPolicyNames: string[];
}
export interface ListServersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedServer {
  Arn: string;
  Domain?: Domain;
  IdentityProviderType?: IdentityProviderType;
  EndpointType?: EndpointType;
  LoggingRole?: string;
  ServerId?: string;
  State?: State;
  UserCount?: number;
}
export type ListedServers = ListedServer[];
export interface ListServersResponse {
  NextToken?: string;
  Servers: ListedServer[];
}
export interface ListTagsForResourceRequest {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Arn?: string;
  NextToken?: string;
  Tags?: Tag[];
}
export interface ListUsersRequest {
  MaxResults?: number;
  NextToken?: string;
  ServerId: string;
}
export type SshPublicKeyCount = number;
export interface ListedUser {
  Arn: string;
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  Role?: string;
  SshPublicKeyCount?: number;
  UserName?: string;
}
export type ListedUsers = ListedUser[];
export interface ListUsersResponse {
  NextToken?: string;
  ServerId: string;
  Users: ListedUser[];
}
export interface ListWebAppsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedWebApp {
  Arn: string;
  WebAppId: string;
  AccessEndpoint?: string;
  WebAppEndpoint?: string;
  EndpointType?: WebAppEndpointType;
}
export type ListedWebApps = ListedWebApp[];
export interface ListWebAppsResponse {
  NextToken?: string;
  WebApps: ListedWebApp[];
}
export interface ListWorkflowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListedWorkflow {
  WorkflowId?: string;
  Description?: string;
  Arn?: string;
}
export type ListedWorkflows = ListedWorkflow[];
export interface ListWorkflowsResponse {
  NextToken?: string;
  Workflows: ListedWorkflow[];
}
export type CallbackToken = string;
export type CustomStepStatus = "SUCCESS" | "FAILURE" | (string & {});
export interface SendWorkflowStepStateRequest {
  WorkflowId: string;
  ExecutionId: string;
  Token: string;
  Status: CustomStepStatus;
}
export interface SendWorkflowStepStateResponse {}
export type MaxItems = number;
export interface StartDirectoryListingRequest {
  ConnectorId: string;
  RemoteDirectoryPath: string;
  MaxItems?: number;
  OutputDirectoryPath: string;
}
export type ListingId = string;
export type OutputFileName = string;
export interface StartDirectoryListingResponse {
  ListingId: string;
  OutputFileName: string;
}
export type FilePaths = string[];
export type CustomHttpHeaderKeyType = string | redacted.Redacted<string>;
export type CustomHttpHeaderValueType = string | redacted.Redacted<string>;
export interface CustomHttpHeader {
  Key?: string | redacted.Redacted<string>;
  Value?: string | redacted.Redacted<string>;
}
export type CustomHttpHeaders = CustomHttpHeader[];
export interface StartFileTransferRequest {
  ConnectorId: string;
  SendFilePaths?: string[];
  RetrieveFilePaths?: string[];
  LocalDirectoryPath?: string;
  RemoteDirectoryPath?: string;
  CustomHttpHeaders?: CustomHttpHeader[];
}
export interface StartFileTransferResponse {
  TransferId: string;
}
export interface StartRemoteDeleteRequest {
  ConnectorId: string;
  DeletePath: string;
}
export type DeleteId = string;
export interface StartRemoteDeleteResponse {
  DeleteId: string;
}
export interface StartRemoteMoveRequest {
  ConnectorId: string;
  SourcePath: string;
  TargetPath: string;
}
export type MoveId = string;
export interface StartRemoteMoveResponse {
  MoveId: string;
}
export interface StartServerRequest {
  ServerId: string;
}
export interface StartServerResponse {}
export interface StopServerRequest {
  ServerId: string;
}
export interface StopServerResponse {}
export interface TagResourceRequest {
  Arn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TestConnectionRequest {
  ConnectorId: string;
}
export type Status = string;
export type SftpConnectorHostKey = string;
export interface SftpConnectorConnectionDetails {
  HostKey?: string;
}
export interface TestConnectionResponse {
  ConnectorId?: string;
  Status?: string;
  StatusMessage?: string;
  SftpConnectionDetails?: SftpConnectorConnectionDetails;
}
export type SourceIp = string;
export type UserPassword = string | redacted.Redacted<string>;
export interface TestIdentityProviderRequest {
  ServerId: string;
  ServerProtocol?: Protocol;
  SourceIp?: string;
  UserName: string;
  UserPassword?: string | redacted.Redacted<string>;
}
export type Response = string;
export type StatusCode = number;
export interface TestIdentityProviderResponse {
  Response?: string;
  StatusCode: number;
  Message?: string;
  Url: string;
}
export type TagKeys = string[];
export interface UntagResourceRequest {
  Arn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessRequest {
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role?: string;
  ServerId: string;
  ExternalId: string;
}
export interface UpdateAccessResponse {
  ServerId: string;
  ExternalId: string;
}
export interface UpdateAgreementRequest {
  AgreementId: string;
  ServerId: string;
  Description?: string;
  Status?: AgreementStatusType;
  LocalProfileId?: string;
  PartnerProfileId?: string;
  BaseDirectory?: string;
  AccessRole?: string;
  PreserveFilename?: PreserveFilenameType;
  EnforceMessageSigning?: EnforceMessageSigningType;
  CustomDirectories?: CustomDirectoriesType;
}
export interface UpdateAgreementResponse {
  AgreementId: string;
}
export interface UpdateCertificateRequest {
  CertificateId: string;
  ActiveDate?: Date;
  InactiveDate?: Date;
  Description?: string;
}
export interface UpdateCertificateResponse {
  CertificateId: string;
}
export interface UpdateConnectorVpcLatticeEgressConfig {
  ResourceConfigurationArn?: string;
  PortNumber?: number;
}
export type UpdateConnectorEgressConfig = { VpcLattice: UpdateConnectorVpcLatticeEgressConfig };
export interface UpdateConnectorRequest {
  ConnectorId: string;
  Url?: string;
  As2Config?: As2ConnectorConfig;
  AccessRole?: string;
  LoggingRole?: string;
  SftpConfig?: SftpConnectorConfig;
  SecurityPolicyName?: string;
  EgressConfig?: UpdateConnectorEgressConfig;
  IpAddressType?: ConnectorsIpAddressType;
}
export interface UpdateConnectorResponse {
  ConnectorId: string;
}
export interface UpdateHostKeyRequest {
  ServerId: string;
  HostKeyId: string;
  Description: string;
}
export interface UpdateHostKeyResponse {
  ServerId: string;
  HostKeyId: string;
}
export interface UpdateProfileRequest {
  ProfileId: string;
  CertificateIds?: string[];
}
export interface UpdateProfileResponse {
  ProfileId: string;
}
export interface UpdateServerRequest {
  Certificate?: string;
  ProtocolDetails?: ProtocolDetails;
  EndpointDetails?: EndpointDetails;
  EndpointType?: EndpointType;
  HostKey?: string | redacted.Redacted<string>;
  IdentityProviderDetails?: IdentityProviderDetails;
  LoggingRole?: string;
  PostAuthenticationLoginBanner?: string;
  PreAuthenticationLoginBanner?: string;
  Protocols?: Protocol[];
  SecurityPolicyName?: string;
  ServerId: string;
  WorkflowDetails?: WorkflowDetails;
  StructuredLogDestinations?: string[];
  S3StorageOptions?: S3StorageOptions;
  IpAddressType?: IpAddressType;
  IdentityProviderType?: IdentityProviderType;
}
export interface UpdateServerResponse {
  ServerId: string;
}
export interface UpdateUserRequest {
  HomeDirectory?: string;
  HomeDirectoryType?: HomeDirectoryType;
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  Policy?: string;
  PosixProfile?: PosixProfile;
  Role?: string;
  ServerId: string;
  UserName: string;
}
export interface UpdateUserResponse {
  ServerId: string;
  UserName: string;
}
export interface UpdateWebAppIdentityCenterConfig {
  Role?: string;
}
export type UpdateWebAppIdentityProviderDetails = {
  IdentityCenterConfig: UpdateWebAppIdentityCenterConfig;
};
export interface UpdateWebAppVpcConfig {
  SubnetIds?: string[];
  IpAddressType?: WebAppVpcEndpointIpAddressType;
}
export type UpdateWebAppEndpointDetails = { Vpc: UpdateWebAppVpcConfig };
export interface UpdateWebAppRequest {
  WebAppId: string;
  IdentityProviderDetails?: UpdateWebAppIdentityProviderDetails;
  AccessEndpoint?: string;
  WebAppUnits?: WebAppUnits;
  EndpointDetails?: UpdateWebAppEndpointDetails;
}
export interface UpdateWebAppResponse {
  WebAppId: string;
}
export interface UpdateWebAppCustomizationRequest {
  WebAppId: string;
  Title?: string;
  LogoFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  FaviconFile?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface UpdateWebAppCustomizationResponse {
  WebAppId: string;
}
export type Resource = string;
export type ResourceType = string;
export type ServiceErrorMessage = string;
export type RetryAfterSeconds = string;
export type CreateAccessError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Used by administrators to choose which groups in the directory should have access to upload and download files over the enabled protocols using Transfer Family. For example, a Microsoft Active Directory might contain 50,000 users, but only a small fraction might need the ability to transfer files to the server. An administrator can use `CreateAccess` to limit the access to the correct set of users who need this ability.
 */
export const createAccess: API.OperationMethod<
  CreateAccessRequest,
  CreateAccessResponse,
  CreateAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<CreateAccessRequest>,
  output: __S(1488, __c93, 0) as any as S.Schema<CreateAccessResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccess",
}));

export type CreateAgreementError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an agreement. An agreement is a bilateral trading partner agreement, or partnership, between an Transfer Family server and an AS2 process. The agreement defines the file and message transfer relationship between the server and the AS2 process. To define an agreement, Transfer Family combines a server, local profile, partner profile, certificate, and other attributes.
 *
 * The partner is identified with the `PartnerProfileId`, and the AS2 process is identified with the `LocalProfileId`.
 *
 * Specify *either* `BaseDirectory` or `CustomDirectories`, but not both. Specifying both causes the command to fail.
 */
export const createAgreement: API.OperationMethod<
  CreateAgreementRequest,
  CreateAgreementResponse,
  CreateAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAgreementRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<CreateAgreementResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgreement",
}));

export type CreateConnectorError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the connector, which captures the parameters for a connection for the AS2 or SFTP protocol. For AS2, the connector is required for sending files to an externally hosted AS2 server. For SFTP, the connector is required when sending files to an SFTP server or receiving files from an SFTP server. For more details about connectors, see Configure AS2 connectors and Create SFTP connectors.
 *
 * You must specify exactly one configuration object: either for AS2 (`As2Config`) or SFTP (`SftpConfig`).
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateConnectorRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateConnectorResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

export type CreateProfileError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the local or partner profile to use for AS2 transfers.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  CreateProfileResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateProfileRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateProfileResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
}));

export type CreateServerError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Instantiates an auto-scaling virtual server based on the selected file transfer protocol in Amazon Web Services. When you make updates to your file transfer protocol-enabled server or when you work with users, use the service-generated `ServerId` property that is assigned to the newly created server.
 */
export const createServer: API.OperationMethod<
  CreateServerRequest,
  CreateServerResponse,
  CreateServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateServerRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<CreateServerResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServer",
}));

export type CreateUserError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a user and associates them with an existing file transfer protocol-enabled server. You can only create and associate users with servers that have the `IdentityProviderType` set to `SERVICE_MANAGED`. Using parameters for `CreateUser`, you can specify the user name, set the home directory, store the user's public key, and assign the user's Identity and Access Management (IAM) role. You can also optionally add a session policy, and assign metadata with tags that can be used to group and search for users.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<CreateUserResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type CreateWebAppError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a web app based on specified parameters, and returns the ID for the new web app. You can configure the web app to be publicly accessible or hosted within a VPC.
 *
 * For more information about using VPC endpoints with Transfer Family, see Create a Transfer Family web app in a VPC.
 */
export const createWebApp: API.OperationMethod<
  CreateWebAppRequest,
  CreateWebAppResponse,
  CreateWebAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(276, __c17, 4) as any as S.Schema<CreateWebAppRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateWebAppResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebApp",
}));

export type CreateWorkflowError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to create a workflow with specified steps and step details the workflow invokes after file transfer completes. After creating a workflow, you can associate the workflow created with any transfer servers by specifying the `workflow-details` field in `CreateServer` and `UpdateServer` operations.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateWorkflowRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<CreateWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
}));

export type DeleteAccessError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Allows you to delete the access specified in the `ServerID` and `ExternalID` parameters.
 */
export const deleteAccess: API.OperationMethod<
  DeleteAccessRequest,
  DeleteAccessResponse,
  DeleteAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DeleteAccessRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteAccessResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccess",
}));

export type DeleteAgreementError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Delete the agreement that's specified in the provided `AgreementId`.
 */
export const deleteAgreement: API.OperationMethod<
  DeleteAgreementRequest,
  DeleteAgreementResponse,
  DeleteAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DeleteAgreementRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteAgreementResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgreement",
}));

export type DeleteCertificateError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the certificate that's specified in the `CertificateId` parameter.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteCertificateRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteCertificateResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
}));

export type DeleteConnectorError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the connector that's specified in the provided `ConnectorId`.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteConnectorResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

export type DeleteHostKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the host key that's specified in the `HostKeyId` parameter.
 */
export const deleteHostKey: API.OperationMethod<
  DeleteHostKeyRequest,
  DeleteHostKeyResponse,
  DeleteHostKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteHostKeyRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteHostKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHostKey",
}));

export type DeleteProfileError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the profile that's specified in the `ProfileId` parameter.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileRequest,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteProfileRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteProfileResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
}));

export type DeleteServerError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the file transfer protocol-enabled server that you specify.
 *
 * No response returns from this operation.
 */
export const deleteServer: API.OperationMethod<
  DeleteServerRequest,
  DeleteServerResponse,
  DeleteServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteServerRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteServerResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServer",
}));

export type DeleteSshPublicKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a user's Secure Shell (SSH) public key.
 */
export const deleteSshPublicKey: API.OperationMethod<
  DeleteSshPublicKeyRequest,
  DeleteSshPublicKeyResponse,
  DeleteSshPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteSshPublicKeyRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteSshPublicKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSshPublicKey",
}));

export type DeleteUserError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the user belonging to a file transfer protocol-enabled server you specify.
 *
 * No response returns from this operation.
 *
 * When you delete a user from a server, the user's information is lost.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteUserResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DeleteWebAppError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified web app.
 */
export const deleteWebApp: API.OperationMethod<
  DeleteWebAppRequest,
  DeleteWebAppResponse,
  DeleteWebAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteWebAppRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteWebAppResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebApp",
}));

export type DeleteWebAppCustomizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the `WebAppCustomization` object that corresponds to the web app ID specified.
 */
export const deleteWebAppCustomization: API.OperationMethod<
  DeleteWebAppCustomizationRequest,
  DeleteWebAppCustomizationResponse,
  DeleteWebAppCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DeleteWebAppCustomizationRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteWebAppCustomizationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebAppCustomization",
}));

export type DeleteWorkflowError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified workflow.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DeleteWorkflowRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
}));

export type DescribeAccessError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the access that is assigned to the specific file transfer protocol-enabled server, as identified by its `ServerId` property and its `ExternalId`.
 *
 * The response from this call returns the properties of the access that is associated with the `ServerId` value that was specified.
 */
export const describeAccess: API.OperationMethod<
  DescribeAccessRequest,
  DescribeAccessResponse,
  DescribeAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DescribeAccessRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<DescribeAccessResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccess",
}));

export type DescribeAgreementError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the agreement that's identified by the `AgreementId`.
 */
export const describeAgreement: API.OperationMethod<
  DescribeAgreementRequest,
  DescribeAgreementResponse,
  DescribeAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<DescribeAgreementRequest>,
  output: __S(594, __c37, 2) as any as S.Schema<DescribeAgreementResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgreement",
}));

export type DescribeCertificateError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the certificate that's identified by the `CertificateId`.
 *
 * Transfer Family automatically publishes a Amazon CloudWatch metric called `DaysUntilExpiry` for imported certificates. This metric tracks the number of days until the certificate expires based on the `InactiveDate`. The metric is available in the `AWS/Transfer` namespace and includes the `CertificateId` as a dimension.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResponse,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<DescribeCertificateRequest>,
  output: __S(610, __c38, 2) as any as S.Schema<DescribeCertificateResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
}));

export type DescribeConnectorError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the connector that's identified by the `ConnectorId.`
 */
export const describeConnector: API.OperationMethod<
  DescribeConnectorRequest,
  DescribeConnectorResponse,
  DescribeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DescribeConnectorRequest>,
  output: __S(626, __c39, 2) as any as S.Schema<DescribeConnectorResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnector",
}));

export type DescribeExecutionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * You can use `DescribeExecution` to check the details of the execution of the specified workflow.
 *
 * This API call only returns details for in-progress workflows.
 *
 * If you provide an ID for an execution that is not in progress, or if the execution doesn't match the specified workflow ID, you receive a `ResourceNotFound` exception.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionRequest,
  DescribeExecutionResponse,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DescribeExecutionRequest>,
  output: __S(647, __c40, 7) as any as S.Schema<DescribeExecutionResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
}));

export type DescribeHostKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the details of the host key that's specified by the `HostKeyId` and `ServerId`.
 */
export const describeHostKey: API.OperationMethod<
  DescribeHostKeyRequest,
  DescribeHostKeyResponse,
  DescribeHostKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DescribeHostKeyRequest>,
  output: __S(674, __c42, 2) as any as S.Schema<DescribeHostKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHostKey",
}));

export type DescribeProfileError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the details of the profile that's specified by the `ProfileId`.
 */
export const describeProfile: API.OperationMethod<
  DescribeProfileRequest,
  DescribeProfileResponse,
  DescribeProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DescribeProfileRequest>,
  output: __S(690, __c43, 2) as any as S.Schema<DescribeProfileResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProfile",
}));

export type DescribeSecurityPolicyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the security policy that is attached to your server or SFTP connector. The response contains a description of the security policy's properties. For more information about security policies, see Working with security policies for servers or Working with security policies for SFTP connectors.
 */
export const describeSecurityPolicy: API.OperationMethod<
  DescribeSecurityPolicyRequest,
  DescribeSecurityPolicyResponse,
  DescribeSecurityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<DescribeSecurityPolicyRequest>,
  output: __S(706, __c44, 2) as any as S.Schema<DescribeSecurityPolicyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityPolicy",
}));

export type DescribeServerError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes a file transfer protocol-enabled server that you specify by passing the `ServerId` parameter.
 *
 * The response contains a description of a server's properties. When you set `EndpointType` to VPC, the response will contain the `EndpointDetails`.
 */
export const describeServer: API.OperationMethod<
  DescribeServerRequest,
  DescribeServerResponse,
  DescribeServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<DescribeServerRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<DescribeServerResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServer",
}));

export type DescribeUserError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the user assigned to the specific file transfer protocol-enabled server, as identified by its `ServerId` property.
 *
 * The response from this call returns the properties of the user associated with the `ServerId` value that was specified.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<DescribeUserRequest>,
  output: __S(740, __c46, 4) as any as S.Schema<DescribeUserResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type DescribeWebAppError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the web app that's identified by `WebAppId`. The response includes endpoint configuration details such as whether the web app is publicly accessible or VPC hosted.
 *
 * For more information about using VPC endpoints with Transfer Family, see Create a Transfer Family web app in a VPC.
 */
export const describeWebApp: API.OperationMethod<
  DescribeWebAppRequest,
  DescribeWebAppResponse,
  DescribeWebAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<DescribeWebAppRequest>,
  output: __S(758, __c47, 6) as any as S.Schema<DescribeWebAppResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWebApp",
}));

export type DescribeWebAppCustomizationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the web app customization object that's identified by `WebAppId`.
 */
export const describeWebAppCustomization: API.OperationMethod<
  DescribeWebAppCustomizationRequest,
  DescribeWebAppCustomizationResponse,
  DescribeWebAppCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DescribeWebAppCustomizationRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<DescribeWebAppCustomizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWebAppCustomization",
}));

export type DescribeWorkflowError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes the specified workflow.
 */
export const describeWorkflow: API.OperationMethod<
  DescribeWorkflowRequest,
  DescribeWorkflowResponse,
  DescribeWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<DescribeWorkflowRequest>,
  output: __S(786, __c49, 2) as any as S.Schema<DescribeWorkflowResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflow",
}));

export type ImportCertificateError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Imports the signing and encryption certificates that you need to create local (AS2) profiles and partner profiles.
 *
 * You can import both the certificate and its chain in the `Certificate` parameter.
 *
 * After importing a certificate, Transfer Family automatically creates a Amazon CloudWatch metric called `DaysUntilExpiry` that tracks the number of days until the certificate expires. The metric is based on the `InactiveDate` parameter and is published daily in the `AWS/Transfer` namespace.
 *
 * It can take up to a full day after importing a certificate for Transfer Family to emit the `DaysUntilExpiry` metric to your account.
 *
 * If you use the `Certificate` parameter to upload both the certificate and its chain, don't use the `CertificateChain` parameter.
 *
 * **CloudWatch monitoring**
 *
 * The `DaysUntilExpiry` metric includes the following specifications:
 *
 * - **Units:** Count (days)
 *
 * - **Dimensions:** `CertificateId` (always present), `Description` (if provided during certificate import)
 *
 * - **Statistics:** Minimum, Maximum, Average
 *
 * - **Frequency:** Published daily
 */
export const importCertificate: API.OperationMethod<
  ImportCertificateRequest,
  ImportCertificateResponse,
  ImportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ImportCertificateRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<ImportCertificateResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
}));

export type ImportHostKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a host key to the server that's specified by the `ServerId` parameter.
 */
export const importHostKey: API.OperationMethod<
  ImportHostKeyRequest,
  ImportHostKeyResponse,
  ImportHostKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<ImportHostKeyRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<ImportHostKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportHostKey",
}));

export type ImportSshPublicKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a Secure Shell (SSH) public key to a Transfer Family user identified by a `UserName` value assigned to the specific file transfer protocol-enabled server, identified by `ServerId`.
 *
 * The response returns the `UserName` value, the `ServerId` value, and the name of the `SshPublicKeyId`.
 */
export const importSshPublicKey: API.OperationMethod<
  ImportSshPublicKeyRequest,
  ImportSshPublicKeyResponse,
  ImportSshPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<ImportSshPublicKeyRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<ImportSshPublicKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSshPublicKey",
}));

export type ListAccessesError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the details for all the accesses you have on your server.
 */
export const listAccesses: API.PaginatedOperationMethod<
  ListAccessesRequest,
  ListAccessesResponse,
  ListAccessesError,
  Credentials | HttpClient.HttpClient,
  ListedAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListAccessesRequest>,
  output: __S(883, __c55, 3) as any as S.Schema<ListAccessesResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccesses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accesses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAgreementsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the agreements for the server that's identified by the `ServerId` that you supply. If you want to limit the results to a certain number, supply a value for the `MaxResults` parameter. If you ran the command previously and received a value for `NextToken`, you can supply that value to continue listing agreements from where you left off.
 */
export const listAgreements: API.PaginatedOperationMethod<
  ListAgreementsRequest,
  ListAgreementsResponse,
  ListAgreementsError,
  Credentials | HttpClient.HttpClient,
  ListedAgreement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListAgreementsRequest>,
  output: __S(899, __c56, 3) as any as S.Schema<ListAgreementsResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Agreements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCertificatesError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the current certificates that have been imported into Transfer Family. If you want to limit the results to a certain number, supply a value for the `MaxResults` parameter. If you ran the command previously and received a value for the `NextToken` parameter, you can supply that value to continue listing certificates from where you left off.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  ListedCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<ListCertificatesRequest>,
  output: __S(915, __c57, 3) as any as S.Schema<ListCertificatesResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Certificates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the connectors for the specified Region.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ListedConnector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<ListConnectorsRequest>,
  output: __S(931, __c58, 3) as any as S.Schema<ListConnectorsResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
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

export type ListExecutionsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all in-progress executions for the specified workflow.
 *
 * If the specified workflow ID cannot be found, `ListExecutions` returns a `ResourceNotFound` exception.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ListedExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<ListExecutionsRequest>,
  output: __S(947, __c59, 3) as any as S.Schema<ListExecutionsResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Executions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFileTransferResultsError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns real-time updates and detailed information on the status of each individual file being transferred in a specific file transfer operation. You specify the file transfer by providing its `ConnectorId` and its `TransferId`.
 *
 * File transfer results are available up to 7 days after an operation has been requested.
 */
export const listFileTransferResults: API.PaginatedOperationMethod<
  ListFileTransferResultsRequest,
  ListFileTransferResultsResponse,
  ListFileTransferResultsError,
  Credentials | HttpClient.HttpClient,
  ConnectorFileTransferResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<ListFileTransferResultsRequest>,
  output: __S(963, __c60, 3) as any as S.Schema<ListFileTransferResultsResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileTransferResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FileTransferResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHostKeysError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of host keys for the server that's specified by the `ServerId` parameter.
 */
export const listHostKeys: API.OperationMethod<
  ListHostKeysRequest,
  ListHostKeysResponse,
  ListHostKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<ListHostKeysRequest>,
  output: __S(979, __c61, 3) as any as S.Schema<ListHostKeysResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostKeys",
}));

export type ListProfilesError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the profiles for your system. If you want to limit the results to a certain number, supply a value for the `MaxResults` parameter. If you ran the command previously and received a value for `NextToken`, you can supply that value to continue listing profiles from where you left off.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ListedProfile
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<ListProfilesRequest>,
  output: __S(995, __c62, 3) as any as S.Schema<ListProfilesResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Profiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityPoliciesError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the security policies that are attached to your servers and SFTP connectors. For more information about security policies, see Working with security policies for servers or Working with security policies for SFTP connectors.
 */
export const listSecurityPolicies: API.PaginatedOperationMethod<
  ListSecurityPoliciesRequest,
  ListSecurityPoliciesResponse,
  ListSecurityPoliciesError,
  Credentials | HttpClient.HttpClient,
  SecurityPolicyName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<ListSecurityPoliciesRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<ListSecurityPoliciesResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityPolicyNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServersError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the file transfer protocol-enabled servers that are associated with your Amazon Web Services account.
 */
export const listServers: API.PaginatedOperationMethod<
  ListServersRequest,
  ListServersResponse,
  ListServersError,
  Credentials | HttpClient.HttpClient,
  ListedServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<ListServersRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListServersResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Servers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all of the tags associated with the Amazon Resource Name (ARN) that you specify. The resource can be a user, server, or role.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the users for a file transfer protocol-enabled server that you specify by passing the `ServerId` parameter.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  ListedUser
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListUsersResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWebAppsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all web apps associated with your Amazon Web Services account for your current region. The response includes the endpoint type for each web app, showing whether it is publicly accessible or VPC hosted.
 *
 * For more information about using VPC endpoints with Transfer Family, see Create a Transfer Family web app in a VPC.
 */
export const listWebApps: API.PaginatedOperationMethod<
  ListWebAppsRequest,
  ListWebAppsResponse,
  ListWebAppsError,
  Credentials | HttpClient.HttpClient,
  ListedWebApp
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<ListWebAppsRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListWebAppsResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WebApps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all workflows associated with your Amazon Web Services account for your current region.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  ListedWorkflow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(1091, __c68, 3) as any as S.Schema<ListWorkflowsResponse>,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workflows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SendWorkflowStepStateError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Sends a callback for asynchronous custom steps.
 *
 * The `ExecutionId`, `WorkflowId`, and `Token` are passed to the target resource during execution of a custom step of a workflow. You must include those with their callback as well as providing a status.
 */
export const sendWorkflowStepState: API.OperationMethod<
  SendWorkflowStepStateRequest,
  SendWorkflowStepStateResponse,
  SendWorkflowStepStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<SendWorkflowStepStateRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<SendWorkflowStepStateResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWorkflowStepState",
}));

export type StartDirectoryListingError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of the contents of a directory from a remote SFTP server. You specify the connector ID, the output path, and the remote directory path. You can also specify the optional `MaxItems` value to control the maximum number of items that are listed from the remote directory. This API returns a list of all files and directories in the remote directory (up to the maximum value), but does not return files or folders in sub-directories. That is, it only returns a list of files and directories one-level deep.
 *
 * After you receive the listing file, you can provide the files that you want to transfer to the `RetrieveFilePaths` parameter of the `StartFileTransfer` API call.
 *
 * The naming convention for the output file is ` *connector-ID*-*listing-ID*.json`. The output file contains the following information:
 *
 * - `filePath`: the complete path of a remote file, relative to the directory of the listing request for your SFTP connector on the remote server.
 *
 * - `modifiedTimestamp`: the last time the file was modified, in UTC time format. This field is optional. If the remote file attributes don't contain a timestamp, it is omitted from the file listing.
 *
 * - `size`: the size of the file, in bytes. This field is optional. If the remote file attributes don't contain a file size, it is omitted from the file listing.
 *
 * - `path`: the complete path of a remote directory, relative to the directory of the listing request for your SFTP connector on the remote server.
 *
 * - `truncated`: a flag indicating whether the list output contains all of the items contained in the remote directory or not. If your `Truncated` output value is true, you can increase the value provided in the optional `max-items` input attribute to be able to list more items (up to the maximum allowed list size of 200,000 items).
 */
export const startDirectoryListing: API.OperationMethod<
  StartDirectoryListingRequest,
  StartDirectoryListingResponse,
  StartDirectoryListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<StartDirectoryListingRequest>,
  output: __S(1121, __c70, 1) as any as S.Schema<StartDirectoryListingResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDirectoryListing",
}));

export type StartFileTransferError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Begins a file transfer between local Amazon Web Services storage and a remote AS2 or SFTP server.
 *
 * - For an AS2 connector, you specify the `ConnectorId` and one or more `SendFilePaths` to identify the files you want to transfer.
 *
 * - For an SFTP connector, the file transfer can be either outbound or inbound. In both cases, you specify the `ConnectorId`. Depending on the direction of the transfer, you also specify the following items:
 *
 * - If you are transferring file from a partner's SFTP server to Amazon Web Services storage, you specify one or more `RetrieveFilePaths` to identify the files you want to transfer, and a `LocalDirectoryPath` to specify the destination folder.
 *
 * - If you are transferring file to a partner's SFTP server from Amazon Web Services storage, you specify one or more `SendFilePaths` to identify the files you want to transfer, and a `RemoteDirectoryPath` to specify the destination folder.
 */
export const startFileTransfer: API.OperationMethod<
  StartFileTransferRequest,
  StartFileTransferResponse,
  StartFileTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1138, __c71, 2) as any as S.Schema<StartFileTransferRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<StartFileTransferResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFileTransfer",
}));

export type StartRemoteDeleteError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a file or directory on the remote SFTP server.
 */
export const startRemoteDelete: API.OperationMethod<
  StartRemoteDeleteRequest,
  StartRemoteDeleteResponse,
  StartRemoteDeleteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<StartRemoteDeleteRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<StartRemoteDeleteResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRemoteDelete",
}));

export type StartRemoteMoveError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Moves or renames a file or directory on the remote SFTP server.
 */
export const startRemoteMove: API.OperationMethod<
  StartRemoteMoveRequest,
  StartRemoteMoveResponse,
  StartRemoteMoveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<StartRemoteMoveRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<StartRemoteMoveResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRemoteMove",
}));

export type StartServerError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Changes the state of a file transfer protocol-enabled server from `OFFLINE` to `ONLINE`. It has no impact on a server that is already `ONLINE`. An `ONLINE` server can accept and process file transfer jobs.
 *
 * The state of `STARTING` indicates that the server is in an intermediate state, either not fully able to respond, or not fully online. The values of `START_FAILED` can indicate an error condition.
 *
 * No response is returned from this call.
 */
export const startServer: API.OperationMethod<
  StartServerRequest,
  StartServerResponse,
  StartServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<StartServerRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<StartServerResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartServer",
}));

export type StopServerError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Changes the state of a file transfer protocol-enabled server from `ONLINE` to `OFFLINE`. An `OFFLINE` server cannot accept and process file transfer jobs. Information tied to your server, such as server and user properties, are not affected by stopping your server.
 *
 * Stopping the server does not reduce or impact your file transfer protocol endpoint billing; you must delete the server to stop being billed.
 *
 * The state of `STOPPING` indicates that the server is in an intermediate state, either not fully able to respond, or not fully offline. The values of `STOP_FAILED` can indicate an error condition.
 *
 * No response is returned from this call.
 */
export const stopServer: API.OperationMethod<
  StopServerRequest,
  StopServerResponse,
  StopServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<StopServerRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<StopServerResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopServer",
}));

export type TagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Attaches a key-value pair to a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
 *
 * There is no response returned from this call.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestConnectionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Tests whether your SFTP connector is set up successfully. We highly recommend that you call this operation to test your ability to transfer files between local Amazon Web Services storage and a trading partner's SFTP server.
 */
export const testConnection: API.OperationMethod<
  TestConnectionRequest,
  TestConnectionResponse,
  TestConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<TestConnectionRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<TestConnectionResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
}));

export type TestIdentityProviderError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * If the `IdentityProviderType` of a file transfer protocol-enabled server is `AWS_DIRECTORY_SERVICE` or `API_Gateway`, tests whether your identity provider is set up successfully. We highly recommend that you call this operation to test your authentication method as soon as you create your server. By doing so, you can troubleshoot issues with the identity provider integration to ensure that your users can successfully use the service.
 *
 * The `ServerId` and `UserName` parameters are required. The `ServerProtocol`, `SourceIp`, and `UserPassword` are all optional.
 *
 * Note the following:
 *
 * - You cannot use `TestIdentityProvider` if the `IdentityProviderType` of your server is `SERVICE_MANAGED`.
 *
 * - `TestIdentityProvider` does not work with keys: it only accepts passwords.
 *
 * - `TestIdentityProvider` can test the password operation for a custom Identity Provider that handles keys and passwords.
 *
 * - If you provide any incorrect values for any parameters, the `Response` field is empty.
 *
 * - If you provide a server ID for a server that uses service-managed users, you get an error:
 *
 * ` An error occurred (InvalidRequestException) when calling the TestIdentityProvider operation: s-*server-ID* not configured for external auth `
 *
 * - If you enter a Server ID for the `--server-id` parameter that does not identify an actual Transfer server, you receive the following error:
 *
 * `An error occurred (ResourceNotFoundException) when calling the TestIdentityProvider operation: Unknown server`.
 *
 * It is possible your sever is in a different region. You can specify a region by adding the following: `--region region-code`, such as `--region us-east-2` to specify a server in **US East (Ohio)**.
 */
export const testIdentityProvider: API.OperationMethod<
  TestIdentityProviderRequest,
  TestIdentityProviderResponse,
  TestIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<TestIdentityProviderRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<TestIdentityProviderResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestIdentityProvider",
}));

export type UntagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Detaches a key-value pair from a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
 *
 * No response is returned from this call.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccessError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to update parameters for the access specified in the `ServerID` and `ExternalID` parameters.
 */
export const updateAccess: API.OperationMethod<
  UpdateAccessRequest,
  UpdateAccessResponse,
  UpdateAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<UpdateAccessRequest>,
  output: __S(1488, __c93, 0) as any as S.Schema<UpdateAccessResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccess",
}));

export type UpdateAgreementError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates some of the parameters for an existing agreement. Provide the `AgreementId` and the `ServerId` for the agreement that you want to update, along with the new values for the parameters to update.
 *
 * Specify *either* `BaseDirectory` or `CustomDirectories`, but not both. Specifying both causes the command to fail.
 *
 * If you update an agreement from using base directory to custom directories, the base directory is no longer used. Similarly, if you change from custom directories to a base directory, the custom directories are no longer used.
 */
export const updateAgreement: API.OperationMethod<
  UpdateAgreementRequest,
  UpdateAgreementResponse,
  UpdateAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<UpdateAgreementRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateAgreementResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgreement",
}));

export type UpdateCertificateError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the active and inactive dates for a certificate.
 */
export const updateCertificate: API.OperationMethod<
  UpdateCertificateRequest,
  UpdateCertificateResponse,
  UpdateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateCertificateRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<UpdateCertificateResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificate",
}));

export type UpdateConnectorError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates some of the parameters for an existing connector. Provide the `ConnectorId` for the connector that you want to update, along with the new values for the parameters to update.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1330, __c83, 2) as any as S.Schema<UpdateConnectorRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateConnectorResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
}));

export type UpdateHostKeyError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the description for the host key that's specified by the `ServerId` and `HostKeyId` parameters.
 */
export const updateHostKey: API.OperationMethod<
  UpdateHostKeyRequest,
  UpdateHostKeyResponse,
  UpdateHostKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<UpdateHostKeyRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<UpdateHostKeyResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHostKey",
}));

export type UpdateProfileError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates some of the parameters for an existing profile. Provide the `ProfileId` for the profile that you want to update, along with the new values for the parameters to update.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateProfileRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<UpdateProfileResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfile",
}));

export type UpdateServerError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the file transfer protocol-enabled server's properties after that server has been created.
 *
 * The `UpdateServer` call returns the `ServerId` of the server you updated.
 */
export const updateServer: API.OperationMethod<
  UpdateServerRequest,
  UpdateServerResponse,
  UpdateServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<UpdateServerRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<UpdateServerResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServer",
}));

export type UpdateUserError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns new properties to a user. Parameters you pass modify any or all of the following: the home directory, role, and policy for the `UserName` and `ServerId` you specify.
 *
 * The response returns the `ServerId` and the `UserName` for the updated user.
 *
 * In the console, you can select *Restricted* when you create or update a user. This ensures that the user can't access anything outside of their home directory. The programmatic way to configure this behavior is to update the user. Set their `HomeDirectoryType` to `LOGICAL`, and specify `HomeDirectoryMappings` with `Entry` as root (`/`) and `Target` as their home directory.
 *
 * For example, if the user's home directory is `/test/admin-user`, the following command updates the user so that their configuration in the console shows the *Restricted* flag as selected.
 *
 * ` aws transfer update-user --server-id <server-id> --user-name admin-user --home-directory-type LOGICAL --home-directory-mappings "[{\"Entry\":\"/\", \"Target\":\"/test/admin-user\"}]"`
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<UpdateUserResponse>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));

export type UpdateWebAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns new properties to a web app. You can modify the access point, identity provider details, endpoint configuration, and the web app units.
 *
 * For more information about using VPC endpoints with Transfer Family, see Create a Transfer Family web app in a VPC.
 */
export const updateWebApp: API.OperationMethod<
  UpdateWebAppRequest,
  UpdateWebAppResponse,
  UpdateWebAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1412, __c88, 4) as any as S.Schema<UpdateWebAppRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateWebAppResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebApp",
}));

export type UpdateWebAppCustomizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns new customization properties to a web app. You can modify the icon file, logo file, and title.
 */
export const updateWebAppCustomization: API.OperationMethod<
  UpdateWebAppCustomizationRequest,
  UpdateWebAppCustomizationResponse,
  UpdateWebAppCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<UpdateWebAppCustomizationRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateWebAppCustomizationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebAppCustomization",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          ServerId: S.String,
          LocalProfileId: S.String,
          PartnerProfileId: S.String,
          BaseDirectory: S.optional(S.String),
          AccessRole: S.String,
          Status: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          PreserveFilename: S.optional(S.String),
          EnforceMessageSigning: S.optional(S.String),
          CustomDirectories: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAgreementRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FailedFilesDirectory: S.String,
          MdnFilesDirectory: S.String,
          PayloadFilesDirectory: S.String,
          StatusFilesDirectory: S.String,
          TemporaryFilesDirectory: S.String,
        }),
      ).annotate({ identifier: "CustomDirectoriesType" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AgreementId: S.String })).annotate({
        identifier: "CreateAgreementResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(S.String),
          As2Config: S.optional(__S(113, __c7, 1)),
          AccessRole: S.String,
          LoggingRole: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          SftpConfig: S.optional(__S(114, __c7, 2)),
          SecurityPolicyName: S.optional(S.String),
          EgressConfig: S.optional(__S(97, __c6, 1)),
          IpAddressType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectorRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceConfigurationArn: S.String, PortNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "ConnectorVpcLatticeEgressConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ VpcLattice: __S(96, __c6, 0) })]);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Url: S.optional(S.String), ServerIds: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "As2AsyncMdnConnectorConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocalProfileId: S.optional(S.String),
          PartnerProfileId: S.optional(S.String),
          MessageSubject: S.optional(SensitiveString),
          Compression: S.optional(S.String),
          EncryptionAlgorithm: S.optional(S.String),
          SigningAlgorithm: S.optional(S.String),
          MdnSigningAlgorithm: S.optional(S.String),
          MdnResponse: S.optional(S.String),
          BasicAuthSecretId: S.optional(S.String),
          PreserveContentType: S.optional(S.String),
          AsyncMdnConfig: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "As2ConnectorConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserSecretId: S.optional(S.String),
          TrustedHostKeys: S.optional(__S(80, __c5, 0)),
          MaxConcurrentConnections: S.optional(S.Number),
          OrderedUserSecretVersionStages: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "SftpConnectorConfig" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ConnectorId: S.String })).annotate({
        identifier: "CreateConnectorResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          As2Id: S.String,
          ProfileType: S.String,
          CertificateIds: S.optional(__S(80, __c5, 0)),
          Tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProfileRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProfileId: S.String })).annotate({
        identifier: "CreateProfileResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Certificate: S.optional(S.String),
          Domain: S.optional(S.String),
          EndpointDetails: S.optional(__S(208, __c13, 0)),
          EndpointType: S.optional(S.String),
          HostKey: S.optional(SensitiveString),
          IdentityProviderDetails: S.optional(__S(209, __c13, 1)),
          IdentityProviderType: S.optional(S.String),
          LoggingRole: S.optional(S.String),
          PostAuthenticationLoginBanner: S.optional(S.String),
          PreAuthenticationLoginBanner: S.optional(S.String),
          Protocols: S.optional(__S(192, __c12, 0)),
          ProtocolDetails: S.optional(__S(213, __c13, 5)),
          SecurityPolicyName: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          WorkflowDetails: S.optional(__S(216, __c13, 8)),
          StructuredLogDestinations: S.optional(__S(80, __c5, 0)),
          S3StorageOptions: S.optional(__S(217, __c13, 9)),
          IpAddressType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServerRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AddressAllocationIds: S.optional(__S(80, __c5, 0)),
          SubnetIds: S.optional(__S(80, __c5, 0)),
          VpcEndpointId: S.optional(S.String),
          VpcId: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "EndpointDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(S.String),
          InvocationRole: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          Function: S.optional(S.String),
          SftpAuthenticationMethods: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityProviderDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SftpPort: S.Number, CommunicationMode: S.optional(S.String) }),
      ).annotate({ identifier: "SftpPortWithOptions" });
    case 3:
      return S.Array(__S(210, __c13, 2));
    case 4:
      return S.suspend(() => S.Struct({ SftpMode: S.optional(S.String) })).annotate({
        identifier: "ProxyConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          PassiveIp: S.optional(S.String),
          TlsSessionResumptionMode: S.optional(S.String),
          SetStatOption: S.optional(S.String),
          SftpPorts: S.optional(__S(211, __c13, 3)),
          As2Transports: S.optional(__S(192, __c12, 0)),
          ProxyConfig: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "ProtocolDetails" });
    case 6:
      return S.suspend(() => S.Struct({ WorkflowId: S.String, ExecutionRole: S.String })).annotate({
        identifier: "WorkflowDetail",
      });
    case 7:
      return S.Array(__S(214, __c13, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          OnUpload: S.optional(__S(215, __c13, 7)),
          OnPartialUpload: S.optional(__S(215, __c13, 7)),
        }),
      ).annotate({ identifier: "WorkflowDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ DirectoryListingOptimization: S.optional(S.String) }),
      ).annotate({ identifier: "S3StorageOptions" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ServerId: S.String })).annotate({
        identifier: "CreateServerResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.String,
          ServerId: S.String,
          SshPublicKeyBody: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          UserName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ServerId: S.String, UserName: S.String })).annotate({
        identifier: "CreateUserResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.optional(S.String), Role: S.optional(S.String) }),
      ).annotate({ identifier: "IdentityCenterConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ IdentityCenterConfig: __S(272, __c17, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(80, __c5, 0)),
          VpcId: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(80, __c5, 0)),
          IpAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebAppVpcConfig" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ Vpc: __S(274, __c17, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          IdentityProviderDetails: __S(273, __c17, 1),
          AccessEndpoint: S.optional(S.String),
          WebAppUnits: S.optional(__S(288, __c18, 0)),
          Tags: S.optional(__S(17, __c1, 1)),
          WebAppEndpointPolicy: S.optional(S.String),
          EndpointDetails: S.optional(__S(275, __c17, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/createWebApp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWebAppRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ Provisioned: S.Number })]);
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ WebAppId: S.String })).annotate({
        identifier: "CreateWebAppResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Steps: __S(360, __c22, 8),
          OnExceptionSteps: S.optional(__S(360, __c22, 8)),
          Tags: S.optional(__S(17, __c1, 1)),
          StructuredLogDestinations: S.optional(__S(80, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkflowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ WorkflowId: S.String })).annotate({
        identifier: "CreateWorkflowResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileSystemId: S.optional(S.String), Path: S.optional(S.String) }),
      ).annotate({ identifier: "EfsFileLocation" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
      ).annotate({ identifier: "S3InputFileLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          S3FileLocation: S.optional(__S(352, __c22, 0)),
          EfsFileLocation: S.optional(__S(336, __c21, 0)),
        }),
      ).annotate({ identifier: "InputFileLocation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DestinationFileLocation: S.optional(__S(353, __c22, 1)),
          OverwriteExisting: S.optional(S.String),
          SourceFileLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopyStepDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Target: S.optional(S.String),
          TimeoutSeconds: S.optional(S.Number),
          SourceFileLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomStepDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), SourceFileLocation: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteStepDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          SourceFileLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "TagStepDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.String,
          SourceFileLocation: S.optional(S.String),
          OverwriteExisting: S.optional(S.String),
          DestinationFileLocation: __S(353, __c22, 1),
        }),
      ).annotate({ identifier: "DecryptStepDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          CopyStepDetails: S.optional(__S(354, __c22, 2)),
          CustomStepDetails: S.optional(__S(355, __c22, 3)),
          DeleteStepDetails: S.optional(__S(356, __c22, 4)),
          TagStepDetails: S.optional(__S(357, __c22, 5)),
          DecryptStepDetails: S.optional(__S(358, __c22, 6)),
        }),
      ).annotate({ identifier: "WorkflowStep" });
    case 8:
      return S.Array(__S(359, __c22, 7));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, ExternalId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAccessResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AgreementId: S.String, ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAgreementRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCertificateRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, HostKeyId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHostKeyRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProfileRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServerRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, SshPublicKeyId: S.String, UserName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSshPublicKeyRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, UserName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebAppId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/deleteWebApp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWebAppRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebAppId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteWebAppCustomization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebAppCustomizationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkflowId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkflowRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, ExternalId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          HomeDirectoryType: S.optional(S.String),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.optional(S.String),
          ExternalId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedAccess" });
    case 2:
      return S.suspend(() => S.Struct({ ServerId: S.String, Access: __S(577, __c36, 1) })).annotate(
        { identifier: "DescribeAccessResponse" },
      );
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AgreementId: S.String, ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAgreementRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          AgreementId: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          ServerId: S.optional(S.String),
          LocalProfileId: S.optional(S.String),
          PartnerProfileId: S.optional(S.String),
          BaseDirectory: S.optional(S.String),
          AccessRole: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          PreserveFilename: S.optional(S.String),
          EnforceMessageSigning: S.optional(S.String),
          CustomDirectories: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DescribedAgreement" });
    case 2:
      return S.suspend(() => S.Struct({ Agreement: __S(593, __c37, 1) })).annotate({
        identifier: "DescribeAgreementResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          CertificateId: S.optional(S.String),
          Usage: S.optional(S.String),
          Status: S.optional(S.String),
          Certificate: S.optional(SensitiveString),
          CertificateChain: S.optional(SensitiveString),
          ActiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InactiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Serial: S.optional(S.String),
          NotBeforeDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotAfterDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "DescribedCertificate" });
    case 2:
      return S.suspend(() => S.Struct({ Certificate: __S(609, __c38, 1) })).annotate({
        identifier: "DescribeCertificateResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ConnectorId: S.optional(S.String),
          Url: S.optional(S.String),
          As2Config: S.optional(__S(113, __c7, 1)),
          AccessRole: S.optional(S.String),
          LoggingRole: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          SftpConfig: S.optional(__S(114, __c7, 2)),
          ServiceManagedEgressIpAddresses: S.optional(__S(80, __c5, 0)),
          SecurityPolicyName: S.optional(S.String),
          EgressConfig: S.optional(__S(97, __c6, 1)),
          EgressType: S.String,
          ErrorMessage: S.optional(S.String),
          Status: S.String,
          IpAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedConnector" });
    case 2:
      return S.suspend(() => S.Struct({ Connector: __S(625, __c39, 1) })).annotate({
        identifier: "DescribeConnectorResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExecutionId: S.String, WorkflowId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoggingRole: S.optional(S.String), LogGroupName: S.optional(S.String) }),
      ).annotate({ identifier: "LoggingConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ Type: S.String, Message: S.String })).annotate({
        identifier: "ExecutionError",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StepType: S.optional(S.String),
          Outputs: S.optional(S.String),
          Error: S.optional(__S(642, __c40, 2)),
        }),
      ).annotate({ identifier: "ExecutionStepResult" });
    case 4:
      return S.Array(__S(643, __c40, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Steps: S.optional(__S(644, __c40, 4)),
          OnExceptionSteps: S.optional(__S(644, __c40, 4)),
        }),
      ).annotate({ identifier: "ExecutionResults" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ExecutionId: S.optional(S.String),
          InitialFileLocation: S.optional(__S(657, __c41, 1)),
          ServiceMetadata: S.optional(__S(659, __c41, 3)),
          ExecutionRole: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(641, __c40, 1)),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Status: S.optional(S.String),
          Results: S.optional(__S(645, __c40, 5)),
        }),
      ).annotate({ identifier: "DescribedExecution" });
    case 7:
      return S.suspend(() =>
        S.Struct({ WorkflowId: S.String, Execution: __S(646, __c40, 6) }),
      ).annotate({ identifier: "DescribeExecutionResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
          Etag: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3FileLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          S3FileLocation: S.optional(__S(656, __c41, 0)),
          EfsFileLocation: S.optional(__S(336, __c21, 0)),
        }),
      ).annotate({ identifier: "FileLocation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ UserName: S.String, ServerId: S.String, SessionId: S.optional(S.String) }),
      ).annotate({ identifier: "UserDetails" });
    case 3:
      return S.suspend(() => S.Struct({ UserDetails: __S(658, __c41, 2) })).annotate({
        identifier: "ServiceMetadata",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, HostKeyId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHostKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          HostKeyId: S.optional(S.String),
          HostKeyFingerprint: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          DateImported: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "DescribedHostKey" });
    case 2:
      return S.suspend(() => S.Struct({ HostKey: __S(673, __c42, 1) })).annotate({
        identifier: "DescribeHostKeyResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ProfileId: S.optional(S.String),
          ProfileType: S.optional(S.String),
          As2Id: S.optional(S.String),
          CertificateIds: S.optional(__S(80, __c5, 0)),
          Tags: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "DescribedProfile" });
    case 2:
      return S.suspend(() => S.Struct({ Profile: __S(689, __c43, 1) })).annotate({
        identifier: "DescribeProfileResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecurityPolicyName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSecurityPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Fips: S.optional(S.Boolean),
          SecurityPolicyName: S.String,
          SshCiphers: S.optional(__S(80, __c5, 0)),
          SshKexs: S.optional(__S(80, __c5, 0)),
          SshMacs: S.optional(__S(80, __c5, 0)),
          TlsCiphers: S.optional(__S(80, __c5, 0)),
          SshHostKeyAlgorithms: S.optional(__S(80, __c5, 0)),
          Type: S.optional(S.String),
          Protocols: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "DescribedSecurityPolicy" });
    case 2:
      return S.suspend(() => S.Struct({ SecurityPolicy: __S(705, __c44, 1) })).annotate({
        identifier: "DescribeSecurityPolicyResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeServerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Certificate: S.optional(S.String),
          ProtocolDetails: S.optional(__S(213, __c13, 5)),
          Domain: S.optional(S.String),
          EndpointDetails: S.optional(__S(208, __c13, 0)),
          EndpointType: S.optional(S.String),
          HostKeyFingerprint: S.optional(S.String),
          IdentityProviderDetails: S.optional(__S(209, __c13, 1)),
          IdentityProviderType: S.optional(S.String),
          LoggingRole: S.optional(S.String),
          PostAuthenticationLoginBanner: S.optional(S.String),
          PreAuthenticationLoginBanner: S.optional(S.String),
          Protocols: S.optional(__S(192, __c12, 0)),
          SecurityPolicyName: S.optional(S.String),
          ServerId: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          UserCount: S.optional(S.Number),
          WorkflowDetails: S.optional(__S(216, __c13, 8)),
          StructuredLogDestinations: S.optional(__S(80, __c5, 0)),
          S3StorageOptions: S.optional(__S(217, __c13, 9)),
          As2ServiceManagedEgressIpAddresses: S.optional(__S(80, __c5, 0)),
          IpAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedServer" });
    case 2:
      return S.suspend(() => S.Struct({ Server: __S(721, __c45, 1) })).annotate({
        identifier: "DescribeServerResponse",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, UserName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DateImported: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SshPublicKeyBody: S.String,
          SshPublicKeyId: S.String,
        }),
      ).annotate({ identifier: "SshPublicKey" });
    case 2:
      return S.Array(__S(737, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          HomeDirectory: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          HomeDirectoryType: S.optional(S.String),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.optional(S.String),
          SshPublicKeys: S.optional(__S(738, __c46, 2)),
          Tags: S.optional(__S(17, __c1, 1)),
          UserName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedUser" });
    case 4:
      return S.suspend(() => S.Struct({ ServerId: S.String, User: __S(739, __c46, 3) })).annotate({
        identifier: "DescribeUserResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebAppId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/describeWebApp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeWebAppRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          Role: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedIdentityCenterConfig" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ IdentityCenterConfig: __S(753, __c47, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(80, __c5, 0)),
          VpcId: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribedWebAppVpcConfig" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ Vpc: __S(755, __c47, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          WebAppId: S.String,
          DescribedIdentityProviderDetails: S.optional(__S(754, __c47, 2)),
          AccessEndpoint: S.optional(S.String),
          WebAppEndpoint: S.optional(S.String),
          WebAppUnits: S.optional(__S(288, __c18, 0)),
          Tags: S.optional(__S(17, __c1, 1)),
          WebAppEndpointPolicy: S.optional(S.String),
          EndpointType: S.optional(S.String),
          DescribedEndpointDetails: S.optional(__S(756, __c47, 4)),
        }),
      ).annotate({ identifier: "DescribedWebApp" });
    case 6:
      return S.suspend(() => S.Struct({ WebApp: __S(757, __c47, 5) })).annotate({
        identifier: "DescribeWebAppResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebAppId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describeWebAppCustomization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWebAppCustomizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          WebAppId: S.String,
          Title: S.optional(S.String),
          LogoFile: S.optional(SensitiveBlob),
          FaviconFile: S.optional(SensitiveBlob),
        }),
      ).annotate({ identifier: "DescribedWebAppCustomization" });
    case 2:
      return S.suspend(() => S.Struct({ WebAppCustomization: __S(769, __c48, 1) })).annotate({
        identifier: "DescribeWebAppCustomizationResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkflowId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Description: S.optional(S.String),
          Steps: S.optional(__S(360, __c22, 8)),
          OnExceptionSteps: S.optional(__S(360, __c22, 8)),
          WorkflowId: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
          StructuredLogDestinations: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "DescribedWorkflow" });
    case 2:
      return S.suspend(() => S.Struct({ Workflow: __S(785, __c49, 1) })).annotate({
        identifier: "DescribeWorkflowResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Usage: S.String,
          Certificate: SensitiveString,
          CertificateChain: S.optional(SensitiveString),
          PrivateKey: S.optional(SensitiveString),
          ActiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InactiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportCertificateRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CertificateId: S.String })).annotate({
        identifier: "ImportCertificateResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerId: S.String,
          HostKeyBody: SensitiveString,
          Description: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportHostKeyRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ServerId: S.String, HostKeyId: S.String })).annotate({
        identifier: "ImportHostKeyResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, SshPublicKeyBody: S.String, UserName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportSshPublicKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, SshPublicKeyId: S.String, UserName: S.String }),
      ).annotate({ identifier: "ImportSshPublicKeyResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ServerId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccessesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          Role: S.optional(S.String),
          ExternalId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedAccess" });
    case 2:
      return S.Array(__S(881, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServerId: S.String,
          Accesses: __S(882, __c55, 2),
        }),
      ).annotate({ identifier: "ListAccessesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ServerId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AgreementId: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          ServerId: S.optional(S.String),
          LocalProfileId: S.optional(S.String),
          PartnerProfileId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedAgreement" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Agreements: __S(898, __c56, 2) }),
      ).annotate({ identifier: "ListAgreementsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CertificateId: S.optional(S.String),
          Usage: S.optional(S.String),
          Status: S.optional(S.String),
          ActiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InactiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedCertificate" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Certificates: __S(914, __c57, 2) }),
      ).annotate({ identifier: "ListCertificatesResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          Url: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedConnector" });
    case 2:
      return S.Array(__S(929, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Connectors: __S(930, __c58, 2) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          WorkflowId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionId: S.optional(S.String),
          InitialFileLocation: S.optional(__S(657, __c41, 1)),
          ServiceMetadata: S.optional(__S(659, __c41, 3)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedExecution" });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          WorkflowId: S.String,
          Executions: __S(946, __c59, 2),
        }),
      ).annotate({ identifier: "ListExecutionsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String,
          TransferId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listFileTransferResults" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFileTransferResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FilePath: S.String,
          StatusCode: S.String,
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorFileTransferResult" });
    case 2:
      return S.Array(__S(961, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FileTransferResults: __S(962, __c60, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFileTransferResultsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ServerId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListHostKeysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          HostKeyId: S.optional(S.String),
          Fingerprint: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          DateImported: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ListedHostKey" });
    case 2:
      return S.Array(__S(977, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServerId: S.String,
          HostKeys: __S(978, __c61, 2),
        }),
      ).annotate({ identifier: "ListHostKeysResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ProfileType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ProfileId: S.optional(S.String),
          As2Id: S.optional(S.String),
          ProfileType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedProfile" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Profiles: __S(994, __c62, 2) }),
      ).annotate({ identifier: "ListProfilesResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSecurityPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), SecurityPolicyNames: __S(80, __c5, 0) }),
      ).annotate({ identifier: "ListSecurityPoliciesResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Domain: S.optional(S.String),
          IdentityProviderType: S.optional(S.String),
          EndpointType: S.optional(S.String),
          LoggingRole: S.optional(S.String),
          ServerId: S.optional(S.String),
          State: S.optional(S.String),
          UserCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListedServer" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Servers: __S(1026, __c64, 2) }),
      ).annotate({ identifier: "ListServersResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          NextToken: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ServerId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          Role: S.optional(S.String),
          SshPublicKeyCount: S.optional(S.Number),
          UserName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedUser" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServerId: S.String,
          Users: __S(1058, __c66, 2),
        }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listWebApps" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWebAppsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          WebAppId: S.String,
          AccessEndpoint: S.optional(S.String),
          WebAppEndpoint: S.optional(S.String),
          EndpointType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedWebApp" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), WebApps: __S(1074, __c67, 2) }),
      ).annotate({ identifier: "ListWebAppsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowId: S.optional(S.String),
          Description: S.optional(S.String),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListedWorkflow" });
    case 2:
      return S.Array(__S(1089, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Workflows: __S(1090, __c68, 2) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowId: S.String,
          ExecutionId: S.String,
          Token: S.String,
          Status: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendWorkflowStepStateRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String,
          RemoteDirectoryPath: S.String,
          MaxItems: S.optional(S.Number),
          OutputDirectoryPath: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDirectoryListingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ListingId: S.String, OutputFileName: S.String })).annotate({
        identifier: "StartDirectoryListingResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(SensitiveString), Value: S.optional(SensitiveString) }),
      ).annotate({ identifier: "CustomHttpHeader" });
    case 1:
      return S.Array(__S(1136, __c71, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String,
          SendFilePaths: S.optional(__S(80, __c5, 0)),
          RetrieveFilePaths: S.optional(__S(80, __c5, 0)),
          LocalDirectoryPath: S.optional(S.String),
          RemoteDirectoryPath: S.optional(S.String),
          CustomHttpHeaders: S.optional(__S(1137, __c71, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFileTransferRequest" });
    case 3:
      return S.suspend(() => S.Struct({ TransferId: S.String })).annotate({
        identifier: "StartFileTransferResponse",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String, DeletePath: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/startRemoteDelete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRemoteDeleteRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DeleteId: S.String })).annotate({
        identifier: "StartRemoteDeleteResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String, SourcePath: S.String, TargetPath: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/startRemoteMove" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRemoteMoveRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MoveId: S.String })).annotate({
        identifier: "StartRemoteMoveResponse",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartServerRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopServerRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Tags: __S(17, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HostKey: S.optional(S.String) })).annotate({
        identifier: "SftpConnectorConnectionDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          SftpConnectionDetails: S.optional(__S(1233, __c77, 1)),
        }),
      ).annotate({ identifier: "TestConnectionResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerId: S.String,
          ServerProtocol: S.optional(S.String),
          SourceIp: S.optional(S.String),
          UserName: S.String,
          UserPassword: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestIdentityProviderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Response: S.optional(S.String),
          StatusCode: S.Number,
          Message: S.optional(S.String),
          Url: S.String,
        }),
      ).annotate({ identifier: "TestIdentityProviderResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, TagKeys: __S(80, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.optional(S.String),
          ServerId: S.String,
          ExternalId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccessRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AgreementId: S.String,
          ServerId: S.String,
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          LocalProfileId: S.optional(S.String),
          PartnerProfileId: S.optional(S.String),
          BaseDirectory: S.optional(S.String),
          AccessRole: S.optional(S.String),
          PreserveFilename: S.optional(S.String),
          EnforceMessageSigning: S.optional(S.String),
          CustomDirectories: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAgreementRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateId: S.String,
          ActiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InactiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCertificateRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceConfigurationArn: S.optional(S.String),
          PortNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdateConnectorVpcLatticeEgressConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ VpcLattice: __S(1328, __c83, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String,
          Url: S.optional(S.String),
          As2Config: S.optional(__S(113, __c7, 1)),
          AccessRole: S.optional(S.String),
          LoggingRole: S.optional(S.String),
          SftpConfig: S.optional(__S(114, __c7, 2)),
          SecurityPolicyName: S.optional(S.String),
          EgressConfig: S.optional(__S(1329, __c83, 1)),
          IpAddressType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConnectorRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerId: S.String, HostKeyId: S.String, Description: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateHostKeyRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String, CertificateIds: S.optional(__S(80, __c5, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateProfileRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Certificate: S.optional(S.String),
          ProtocolDetails: S.optional(__S(213, __c13, 5)),
          EndpointDetails: S.optional(__S(208, __c13, 0)),
          EndpointType: S.optional(S.String),
          HostKey: S.optional(SensitiveString),
          IdentityProviderDetails: S.optional(__S(209, __c13, 1)),
          LoggingRole: S.optional(S.String),
          PostAuthenticationLoginBanner: S.optional(S.String),
          PreAuthenticationLoginBanner: S.optional(S.String),
          Protocols: S.optional(__S(192, __c12, 0)),
          SecurityPolicyName: S.optional(S.String),
          ServerId: S.String,
          WorkflowDetails: S.optional(__S(216, __c13, 8)),
          StructuredLogDestinations: S.optional(__S(80, __c5, 0)),
          S3StorageOptions: S.optional(__S(217, __c13, 9)),
          IpAddressType: S.optional(S.String),
          IdentityProviderType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServerRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.optional(S.String),
          ServerId: S.String,
          UserName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Role: S.optional(S.String) })).annotate({
        identifier: "UpdateWebAppIdentityCenterConfig",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ IdentityCenterConfig: __S(1408, __c88, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ SubnetIds: S.optional(__S(80, __c5, 0)), IpAddressType: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateWebAppVpcConfig" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ Vpc: __S(1410, __c88, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          WebAppId: S.String,
          IdentityProviderDetails: S.optional(__S(1409, __c88, 1)),
          AccessEndpoint: S.optional(S.String),
          WebAppUnits: S.optional(__S(288, __c18, 0)),
          EndpointDetails: S.optional(__S(1411, __c88, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/updateWebApp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateWebAppRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebAppId: S.String,
          Title: S.optional(S.String),
          LogoFile: S.optional(SensitiveBlob),
          FaviconFile: S.optional(SensitiveBlob),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateWebAppCustomization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWebAppCustomizationRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HomeDirectory: S.optional(S.String),
          HomeDirectoryType: S.optional(S.String),
          HomeDirectoryMappings: S.optional(__S(1473, __c92, 1)),
          Policy: S.optional(S.String),
          PosixProfile: S.optional(__S(1457, __c91, 1)),
          Role: S.String,
          ServerId: S.String,
          ExternalId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccessRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ Uid: S.Number, Gid: S.Number, SecondaryGids: S.optional(__S(1456, __c91, 0)) }),
      ).annotate({ identifier: "PosixProfile" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Entry: S.String, Target: S.String, Type: S.optional(S.String) }),
      ).annotate({ identifier: "HomeDirectoryMapEntry" });
    case 1:
      return S.Array(__S(1472, __c92, 0));
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ServerId: S.String, ExternalId: S.String })).annotate({
        identifier: "CreateAccessResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
