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
  sdkId: "Transfer",
  target: "TransferService",
  version: "2018-11-05",
  sigv4: "transfer",
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
                `https://transfer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://transfer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://transfer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://transfer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "AccessDenied",
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceError",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceExistsException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message: string;
    readonly Resource: string;
    readonly ResourceType: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly Resource: string;
    readonly ResourceType: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { code: "ServiceUnavailable", status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: "Retry-After" } },
  )<{ readonly RetryAfterSeconds?: string; readonly message?: string }> {}
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
export type SigningAlg =
  | "SHA256"
  | "SHA384"
  | "SHA512"
  | "SHA1"
  | "NONE"
  | (string & {});
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
export interface SftpConnectorConfig {
  UserSecretId?: string;
  TrustedHostKeys?: string[];
  MaxConcurrentConnections?: number;
}
export type ConnectorSecurityPolicyName = string;
export type VpcLatticeResourceConfigurationArn = string;
export type SftpPort = number;
export interface ConnectorVpcLatticeEgressConfig {
  ResourceConfigurationArn: string;
  PortNumber?: number;
}
export type ConnectorEgressConfig = {
  VpcLattice: ConnectorVpcLatticeEgressConfig;
};
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
export type TlsSessionResumptionMode =
  | "DISABLED"
  | "ENABLED"
  | "ENFORCED"
  | (string & {});
export type SetStatOption = "DEFAULT" | "ENABLE_NO_OP" | (string & {});
export type As2Transport = "HTTP" | (string & {});
export type As2Transports = As2Transport[];
export interface ProtocolDetails {
  PassiveIp?: string;
  TlsSessionResumptionMode?: TlsSessionResumptionMode;
  SetStatOption?: SetStatOption;
  As2Transports?: As2Transport[];
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
export type DirectoryListingOptimization =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export type WebAppIdentityProviderDetails = {
  IdentityCenterConfig: IdentityCenterConfig;
};
export type WebAppAccessEndpoint = string;
export type WebAppUnitCount = number;
export type WebAppUnits = { Provisioned: number };
export type WebAppEndpointPolicy = "FIPS" | "STANDARD" | (string & {});
export type WebAppVpcEndpointIpAddressType =
  | "IPV4"
  | "DUALSTACK"
  | (string & {});
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
export type WorkflowStepType =
  | "COPY"
  | "CUSTOM"
  | "TAG"
  | "DELETE"
  | "DECRYPT"
  | (string & {});
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
export type CertificateUsageType =
  | "SIGNING"
  | "ENCRYPTION"
  | "TLS"
  | (string & {});
export type CertificateStatusType =
  | "ACTIVE"
  | "PENDING_ROTATION"
  | "INACTIVE"
  | (string & {});
export type CertificateBodyType = string | redacted.Redacted<string>;
export type CertificateChainType = string | redacted.Redacted<string>;
export type CertDate = Date;
export type CertSerial = string;
export type CertificateType =
  | "CERTIFICATE"
  | "CERTIFICATE_WITH_PRIVATE_KEY"
  | (string & {});
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
export type ConnectorEgressType =
  | "SERVICE_MANAGED"
  | "VPC_LATTICE"
  | (string & {});
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
export type TransferTableStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type UpdateConnectorEgressConfig = {
  VpcLattice: UpdateConnectorVpcLatticeEgressConfig;
};
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
  descriptor: {
    service: svc,
    input: {
      HomeDirectory: 0,
      HomeDirectoryType: 0,
      HomeDirectoryMappings: D.list(i_HomeDirectoryMapEntry),
      Policy: 0,
      PosixProfile: i_PosixProfile,
      Role: 0,
      ServerId: 0,
      ExternalId: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      ServerId: 0,
      LocalProfileId: 0,
      PartnerProfileId: 0,
      BaseDirectory: 0,
      AccessRole: 0,
      Status: 0,
      Tags: D.list(i_Tag),
      PreserveFilename: 0,
      EnforceMessageSigning: 0,
      CustomDirectories: i_CustomDirectoriesType,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Url: 0,
      As2Config: i_As2ConnectorConfig,
      AccessRole: 0,
      LoggingRole: 0,
      Tags: D.list(i_Tag),
      SftpConfig: i_SftpConnectorConfig,
      SecurityPolicyName: 0,
      EgressConfig: {
        VpcLattice: { ResourceConfigurationArn: 0, PortNumber: 0 },
      },
      IpAddressType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { As2Id: 0, ProfileType: 0, CertificateIds: 0, Tags: D.list(i_Tag) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Certificate: 0,
      Domain: 0,
      EndpointDetails: i_EndpointDetails,
      EndpointType: 0,
      HostKey: 0,
      IdentityProviderDetails: i_IdentityProviderDetails,
      IdentityProviderType: 0,
      LoggingRole: 0,
      PostAuthenticationLoginBanner: 0,
      PreAuthenticationLoginBanner: 0,
      Protocols: 0,
      ProtocolDetails: i_ProtocolDetails,
      SecurityPolicyName: 0,
      Tags: D.list(i_Tag),
      WorkflowDetails: i_WorkflowDetails,
      StructuredLogDestinations: 0,
      S3StorageOptions: i_S3StorageOptions,
      IpAddressType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      HomeDirectory: 0,
      HomeDirectoryType: 0,
      HomeDirectoryMappings: D.list(i_HomeDirectoryMapEntry),
      Policy: 0,
      PosixProfile: i_PosixProfile,
      Role: 0,
      ServerId: 0,
      SshPublicKeyBody: 0,
      Tags: D.list(i_Tag),
      UserName: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityProviderDetails: {
        IdentityCenterConfig: { InstanceArn: 0, Role: 0 },
      },
      AccessEndpoint: 0,
      WebAppUnits: i_WebAppUnits,
      Tags: D.list(i_Tag),
      WebAppEndpointPolicy: 0,
      EndpointDetails: {
        Vpc: { SubnetIds: 0, VpcId: 0, SecurityGroupIds: 0, IpAddressType: 0 },
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      Steps: D.list(i_WorkflowStep),
      OnExceptionSteps: D.list(i_WorkflowStep),
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0, ExternalId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccess",
})) as any;

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
  descriptor: { service: svc, input: { AgreementId: 0, ServerId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgreement",
})) as any;

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
  descriptor: { service: svc, input: { CertificateId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
})) as any;

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
  descriptor: { service: svc, input: { ConnectorId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0, HostKeyId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ProfileId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, SshPublicKeyId: 0, UserName: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0, UserName: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

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
  descriptor: { service: svc, input: { WebAppId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { WebAppId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { WorkflowId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0, ExternalId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccess",
})) as any;

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
  descriptor: { service: svc, input: { AgreementId: 0, ServerId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgreement",
})) as any;

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
  descriptor: {
    service: svc,
    input: { CertificateId: 0 },
    output: {
      Certificate: {
        Certificate: D.secret,
        CertificateChain: D.secret,
        ActiveDate: D.ts,
        InactiveDate: D.ts,
        NotBeforeDate: D.ts,
        NotAfterDate: D.ts,
      },
    },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConnectorId: 0 },
    output: { Connector: { As2Config: { MessageSubject: D.secret } } },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnector",
})) as any;

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
  descriptor: { service: svc, input: { ExecutionId: 0, WorkflowId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, HostKeyId: 0 },
    output: { HostKey: { DateImported: D.ts } },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHostKey",
})) as any;

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
  descriptor: { service: svc, input: { ProfileId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProfile",
})) as any;

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
  descriptor: { service: svc, input: { SecurityPolicyName: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, UserName: 0 },
    output: { User: { SshPublicKeys: D.list({ DateImported: D.ts }) } },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

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
  descriptor: { service: svc, input: { WebAppId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { WebAppId: 0 },
    output: {
      WebAppCustomization: {
        LogoFile: D.secretBlob,
        FaviconFile: D.secretBlob,
      },
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { WorkflowId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflow",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Usage: 0,
      Certificate: 0,
      CertificateChain: 0,
      PrivateKey: 0,
      ActiveDate: 0,
      InactiveDate: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, HostKeyBody: 0, Description: 0, Tags: D.list(i_Tag) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, SshPublicKeyBody: 0, UserName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ServerId: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ServerId: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Certificates: D.list({ ActiveDate: D.ts, InactiveDate: D.ts }) },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, WorkflowId: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { ConnectorId: 0, TransferId: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ServerId: 0 },
    output: { HostKeys: D.list({ DateImported: D.ts }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ProfileType: 0 },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { Arn: 0, MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, ServerId: 0 },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { WorkflowId: 0, ExecutionId: 0, Token: 0, Status: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConnectorId: 0,
      RemoteDirectoryPath: 0,
      MaxItems: 0,
      OutputDirectoryPath: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConnectorId: 0,
      SendFilePaths: 0,
      RetrieveFilePaths: 0,
      LocalDirectoryPath: 0,
      RemoteDirectoryPath: 0,
      CustomHttpHeaders: D.list({ Key: 0, Value: 0 }),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ConnectorId: 0, DeletePath: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConnectorId: 0, SourcePath: 0, TargetPath: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ServerId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Arn: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { ConnectorId: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ServerId: 0,
      ServerProtocol: 0,
      SourceIp: 0,
      UserName: 0,
      UserPassword: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestIdentityProvider",
})) as any;

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
  descriptor: { service: svc, input: { Arn: 0, TagKeys: 0 } },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      HomeDirectory: 0,
      HomeDirectoryType: 0,
      HomeDirectoryMappings: D.list(i_HomeDirectoryMapEntry),
      Policy: 0,
      PosixProfile: i_PosixProfile,
      Role: 0,
      ServerId: 0,
      ExternalId: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AgreementId: 0,
      ServerId: 0,
      Description: 0,
      Status: 0,
      LocalProfileId: 0,
      PartnerProfileId: 0,
      BaseDirectory: 0,
      AccessRole: 0,
      PreserveFilename: 0,
      EnforceMessageSigning: 0,
      CustomDirectories: i_CustomDirectoriesType,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { CertificateId: 0, ActiveDate: 0, InactiveDate: 0, Description: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConnectorId: 0,
      Url: 0,
      As2Config: i_As2ConnectorConfig,
      AccessRole: 0,
      LoggingRole: 0,
      SftpConfig: i_SftpConnectorConfig,
      SecurityPolicyName: 0,
      EgressConfig: {
        VpcLattice: { ResourceConfigurationArn: 0, PortNumber: 0 },
      },
      IpAddressType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServerId: 0, HostKeyId: 0, Description: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ProfileId: 0, CertificateIds: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Certificate: 0,
      ProtocolDetails: i_ProtocolDetails,
      EndpointDetails: i_EndpointDetails,
      EndpointType: 0,
      HostKey: 0,
      IdentityProviderDetails: i_IdentityProviderDetails,
      LoggingRole: 0,
      PostAuthenticationLoginBanner: 0,
      PreAuthenticationLoginBanner: 0,
      Protocols: 0,
      SecurityPolicyName: 0,
      ServerId: 0,
      WorkflowDetails: i_WorkflowDetails,
      StructuredLogDestinations: 0,
      S3StorageOptions: i_S3StorageOptions,
      IpAddressType: 0,
      IdentityProviderType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      HomeDirectory: 0,
      HomeDirectoryType: 0,
      HomeDirectoryMappings: D.list(i_HomeDirectoryMapEntry),
      Policy: 0,
      PosixProfile: i_PosixProfile,
      Role: 0,
      ServerId: 0,
      UserName: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      WebAppId: 0,
      IdentityProviderDetails: { IdentityCenterConfig: { Role: 0 } },
      AccessEndpoint: 0,
      WebAppUnits: i_WebAppUnits,
      EndpointDetails: { Vpc: { SubnetIds: 0, IpAddressType: 0 } },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { WebAppId: 0, Title: 0, LogoFile: 0, FaviconFile: 0 },
  },
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
})) as any;

const i_As2ConnectorConfig: D.LazyStruct = () => ({
  LocalProfileId: 0,
  PartnerProfileId: 0,
  MessageSubject: 0,
  Compression: 0,
  EncryptionAlgorithm: 0,
  SigningAlgorithm: 0,
  MdnSigningAlgorithm: 0,
  MdnResponse: 0,
  BasicAuthSecretId: 0,
  PreserveContentType: 0,
  AsyncMdnConfig: { Url: 0, ServerIds: 0 },
});
const i_CustomDirectoriesType: D.LazyStruct = () => ({
  FailedFilesDirectory: 0,
  MdnFilesDirectory: 0,
  PayloadFilesDirectory: 0,
  StatusFilesDirectory: 0,
  TemporaryFilesDirectory: 0,
});
const i_EndpointDetails: D.LazyStruct = () => ({
  AddressAllocationIds: 0,
  SubnetIds: 0,
  VpcEndpointId: 0,
  VpcId: 0,
  SecurityGroupIds: 0,
});
const i_HomeDirectoryMapEntry: D.LazyStruct = () => ({
  Entry: 0,
  Target: 0,
  Type: 0,
});
const i_IdentityProviderDetails: D.LazyStruct = () => ({
  Url: 0,
  InvocationRole: 0,
  DirectoryId: 0,
  Function: 0,
  SftpAuthenticationMethods: 0,
});
const i_PosixProfile: D.LazyStruct = () => ({
  Uid: 0,
  Gid: 0,
  SecondaryGids: 0,
});
const i_ProtocolDetails: D.LazyStruct = () => ({
  PassiveIp: 0,
  TlsSessionResumptionMode: 0,
  SetStatOption: 0,
  As2Transports: 0,
});
const i_S3StorageOptions: D.LazyStruct = () => ({
  DirectoryListingOptimization: 0,
});
const i_SftpConnectorConfig: D.LazyStruct = () => ({
  UserSecretId: 0,
  TrustedHostKeys: 0,
  MaxConcurrentConnections: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_WebAppUnits: D.LazyStruct = () => ({ Provisioned: 0 });
const i_WorkflowDetails: D.LazyStruct = () => ({
  OnUpload: D.list(i_WorkflowDetail),
  OnPartialUpload: D.list(i_WorkflowDetail),
});
const i_WorkflowStep: D.LazyStruct = () => ({
  Type: 0,
  CopyStepDetails: {
    Name: 0,
    DestinationFileLocation: i_InputFileLocation,
    OverwriteExisting: 0,
    SourceFileLocation: 0,
  },
  CustomStepDetails: {
    Name: 0,
    Target: 0,
    TimeoutSeconds: 0,
    SourceFileLocation: 0,
  },
  DeleteStepDetails: { Name: 0, SourceFileLocation: 0 },
  TagStepDetails: {
    Name: 0,
    Tags: D.list({ Key: 0, Value: 0 }),
    SourceFileLocation: 0,
  },
  DecryptStepDetails: {
    Name: 0,
    Type: 0,
    SourceFileLocation: 0,
    OverwriteExisting: 0,
    DestinationFileLocation: i_InputFileLocation,
  },
});
const i_InputFileLocation: D.LazyStruct = () => ({
  S3FileLocation: { Bucket: 0, Key: 0 },
  EfsFileLocation: { FileSystemId: 0, Path: 0 },
});
const i_WorkflowDetail: D.LazyStruct = () => ({
  WorkflowId: 0,
  ExecutionRole: 0,
});
