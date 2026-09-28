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
  sdkId: "signer",
  target: "WallabyService",
  version: "2017-08-25",
  sigv4: "signer",
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
                `https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://signer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://signer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly code?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly code?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLimitExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class SigningProfileAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "SigningProfileAlreadyExists",
    ["AlreadyExistsError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "already exists" },
      },
    },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: string }> {}
export type ProfileName = string;
export type ProfileVersion = string;
export interface AddProfilePermissionRequest {
  profileName: string;
  profileVersion?: string;
  action: string;
  principal: string;
  revisionId?: string;
  statementId: string;
}
export interface AddProfilePermissionResponse {
  revisionId?: string;
}
export interface CancelSigningProfileRequest {
  profileName: string;
}
export interface CancelSigningProfileResponse {}
export type JobId = string;
export interface DescribeSigningJobRequest {
  jobId: string;
}
export type BucketName = string;
export type Key = string;
export type Version = string;
export interface S3Source {
  bucketName: string;
  key: string;
  version: string;
}
export interface Source {
  s3?: S3Source;
}
export type CertificateArn = string;
export interface SigningMaterial {
  certificateArn?: string;
}
export type PlatformId = string;
export type DisplayName = string;
export type EncryptionAlgorithm = "RSA" | "ECDSA" | (string & {});
export type HashAlgorithm = "SHA1" | "SHA256" | (string & {});
export interface SigningConfigurationOverrides {
  encryptionAlgorithm?: EncryptionAlgorithm;
  hashAlgorithm?: HashAlgorithm;
}
export type ImageFormat =
  | "JSON"
  | "JSONEmbedded"
  | "JSONDetached"
  | (string & {});
export interface SigningPlatformOverrides {
  signingConfiguration?: SigningConfigurationOverrides;
  signingImageFormat?: ImageFormat;
}
export type SigningParameterKey = string;
export type SigningParameterValue = string;
export type SigningParameters = { [key: string]: string | undefined };
export type RequestedBy = string;
export type SigningStatus =
  | "InProgress"
  | "Failed"
  | "Succeeded"
  | (string & {});
export type StatusReason = string;
export interface SigningJobRevocationRecord {
  reason?: string;
  revokedAt?: Date;
  revokedBy?: string;
}
export interface S3SignedObject {
  bucketName?: string;
  key?: string;
}
export interface SignedObject {
  s3?: S3SignedObject;
}
export type AccountId = string;
export interface DescribeSigningJobResponse {
  jobId?: string;
  source?: Source;
  signingMaterial?: SigningMaterial;
  platformId?: string;
  platformDisplayName?: string;
  profileName?: string;
  profileVersion?: string;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  createdAt?: Date;
  completedAt?: Date;
  signatureExpiresAt?: Date;
  requestedBy?: string;
  status?: SigningStatus;
  statusReason?: string;
  revocationRecord?: SigningJobRevocationRecord;
  signedObject?: SignedObject;
  jobOwner?: string;
  jobInvoker?: string;
}
export type Arn = string;
export type CertificateHashes = string[];
export interface GetRevocationStatusRequest {
  signatureTimestamp: Date;
  platformId: string;
  profileVersionArn: string;
  jobArn: string;
  certificateHashes: string[];
}
export type RevokedEntities = string[];
export interface GetRevocationStatusResponse {
  revokedEntities?: string[];
}
export interface GetSigningPlatformRequest {
  platformId: string;
}
export type Category = "AWSIoT" | (string & {});
export type EncryptionAlgorithms = EncryptionAlgorithm[];
export interface EncryptionAlgorithmOptions {
  allowedValues: EncryptionAlgorithm[];
  defaultValue: EncryptionAlgorithm;
}
export type HashAlgorithms = HashAlgorithm[];
export interface HashAlgorithmOptions {
  allowedValues: HashAlgorithm[];
  defaultValue: HashAlgorithm;
}
export interface SigningConfiguration {
  encryptionAlgorithmOptions: EncryptionAlgorithmOptions;
  hashAlgorithmOptions: HashAlgorithmOptions;
}
export type ImageFormats = ImageFormat[];
export interface SigningImageFormat {
  supportedFormats: ImageFormat[];
  defaultFormat: ImageFormat;
}
export type MaxSizeInMB = number;
export interface GetSigningPlatformResponse {
  platformId?: string;
  displayName?: string;
  partner?: string;
  target?: string;
  category?: Category;
  signingConfiguration?: SigningConfiguration;
  signingImageFormat?: SigningImageFormat;
  maxSizeInMB?: number;
  revocationSupported?: boolean;
}
export interface GetSigningProfileRequest {
  profileName: string;
  profileOwner?: string;
}
export interface SigningProfileRevocationRecord {
  revocationEffectiveFrom?: Date;
  revokedAt?: Date;
  revokedBy?: string;
}
export type ValidityType = "DAYS" | "MONTHS" | "YEARS" | (string & {});
export interface SignatureValidityPeriod {
  value?: number;
  type?: ValidityType;
}
export type SigningProfileStatus =
  | "Active"
  | "Canceled"
  | "Revoked"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface GetSigningProfileResponse {
  profileName?: string;
  profileVersion?: string;
  profileVersionArn?: string;
  revocationRecord?: SigningProfileRevocationRecord;
  signingMaterial?: SigningMaterial;
  platformId?: string;
  platformDisplayName?: string;
  signatureValidityPeriod?: SignatureValidityPeriod;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  status?: SigningProfileStatus;
  statusReason?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface ListProfilePermissionsRequest {
  profileName: string;
  nextToken?: string;
}
export type PolicySizeBytes = number;
export interface Permission {
  action?: string;
  principal?: string;
  statementId?: string;
  profileVersion?: string;
}
export type Permissions = Permission[];
export interface ListProfilePermissionsResponse {
  revisionId?: string;
  policySizeBytes?: number;
  permissions?: Permission[];
  nextToken?: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListSigningJobsRequest {
  status?: SigningStatus;
  platformId?: string;
  requestedBy?: string;
  maxResults?: number;
  nextToken?: string;
  isRevoked?: boolean;
  signatureExpiresBefore?: Date;
  signatureExpiresAfter?: Date;
  jobInvoker?: string;
}
export interface SigningJob {
  jobId?: string;
  source?: Source;
  signedObject?: SignedObject;
  signingMaterial?: SigningMaterial;
  createdAt?: Date;
  status?: SigningStatus;
  isRevoked?: boolean;
  profileName?: string;
  profileVersion?: string;
  platformId?: string;
  platformDisplayName?: string;
  signatureExpiresAt?: Date;
  jobOwner?: string;
  jobInvoker?: string;
}
export type SigningJobs = SigningJob[];
export interface ListSigningJobsResponse {
  jobs?: SigningJob[];
  nextToken?: string;
}
export interface ListSigningPlatformsRequest {
  category?: string;
  partner?: string;
  target?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface SigningPlatform {
  platformId?: string;
  displayName?: string;
  partner?: string;
  target?: string;
  category?: Category;
  signingConfiguration?: SigningConfiguration;
  signingImageFormat?: SigningImageFormat;
  maxSizeInMB?: number;
  revocationSupported?: boolean;
}
export type SigningPlatforms = SigningPlatform[];
export interface ListSigningPlatformsResponse {
  platforms?: SigningPlatform[];
  nextToken?: string;
}
export type Statuses = SigningProfileStatus[];
export interface ListSigningProfilesRequest {
  includeCanceled?: boolean;
  maxResults?: number;
  nextToken?: string;
  platformId?: string;
  statuses?: SigningProfileStatus[];
}
export interface SigningProfile {
  profileName?: string;
  profileVersion?: string;
  profileVersionArn?: string;
  signingMaterial?: SigningMaterial;
  signatureValidityPeriod?: SignatureValidityPeriod;
  platformId?: string;
  platformDisplayName?: string;
  signingParameters?: { [key: string]: string | undefined };
  status?: SigningProfileStatus;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export type SigningProfiles = SigningProfile[];
export interface ListSigningProfilesResponse {
  profiles?: SigningProfile[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutSigningProfileRequest {
  profileName: string;
  signingMaterial?: SigningMaterial;
  signatureValidityPeriod?: SignatureValidityPeriod;
  platformId: string;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface PutSigningProfileResponse {
  arn?: string;
  profileVersion?: string;
  profileVersionArn?: string;
}
export interface RemoveProfilePermissionRequest {
  profileName: string;
  revisionId: string;
  statementId: string;
}
export interface RemoveProfilePermissionResponse {
  revisionId?: string;
}
export type RevocationReasonString = string;
export interface RevokeSignatureRequest {
  jobId: string;
  jobOwner?: string;
  reason: string;
}
export interface RevokeSignatureResponse {}
export interface RevokeSigningProfileRequest {
  profileName: string;
  profileVersion: string;
  reason: string;
  effectiveTime: Date;
}
export interface RevokeSigningProfileResponse {}
export type Payload = Uint8Array;
export interface SignPayloadRequest {
  profileName: string;
  profileOwner?: string;
  payload: Uint8Array;
  payloadFormat: string;
}
export type Metadata = { [key: string]: string | undefined };
export interface SignPayloadResponse {
  jobId?: string;
  jobOwner?: string;
  metadata?: { [key: string]: string | undefined };
  signature?: Uint8Array;
}
export type Prefix = string;
export interface S3Destination {
  bucketName?: string;
  prefix?: string;
}
export interface Destination {
  s3?: S3Destination;
}
export type ClientRequestToken = string;
export interface StartSigningJobRequest {
  source: Source;
  destination: Destination;
  profileName: string;
  clientRequestToken: string;
  profileOwner?: string;
}
export interface StartSigningJobResponse {
  jobId?: string;
  jobOwner?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type ErrorCode = string;
export type AddProfilePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Adds cross-account permissions to a signing profile.
 */
export const addProfilePermission: API.OperationMethod<
  AddProfilePermissionRequest,
  AddProfilePermissionResponse,
  AddProfilePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /signing-profiles/{profileName}/permissions",
    input: {
      profileName: 0,
      profileVersion: 0,
      action: 0,
      principal: 0,
      revisionId: 0,
      statementId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddProfilePermission",
})) as any;

export type CancelSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the state of an `ACTIVE` signing profile to `CANCELED`.
 * A canceled profile is still viewable with the `ListSigningProfiles`
 * operation, but it cannot perform new signing jobs. See Data Retention for more information on scheduled deletion of a canceled signing profile.
 */
export const cancelSigningProfile: API.OperationMethod<
  CancelSigningProfileRequest,
  CancelSigningProfileResponse,
  CancelSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /signing-profiles/{profileName}",
    input: { profileName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSigningProfile",
})) as any;

export type DescribeSigningJobError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specific code signing job. You specify the job by using the
 * `jobId` value that is returned by the StartSigningJob
 * operation.
 */
export const describeSigningJob: API.OperationMethod<
  DescribeSigningJobRequest,
  DescribeSigningJobResponse,
  DescribeSigningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-jobs/{jobId}",
    input: { jobId: 0 },
    output: {
      createdAt: D.ts,
      completedAt: D.ts,
      signatureExpiresAt: D.ts,
      revocationRecord: { revokedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSigningJob",
})) as any;

export type GetRevocationStatusError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the revocation status of one or more of the signing profile, signing job,
 * and signing certificate.
 */
export const getRevocationStatus: API.OperationMethod<
  GetRevocationStatusRequest,
  GetRevocationStatusResponse,
  GetRevocationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /revocations",
    input: {
      signatureTimestamp: D.m({
        query: "signatureTimestamp",
        shape: D.tsAs("epoch-seconds"),
      }),
      platformId: D.m({ query: "platformId" }),
      profileVersionArn: D.m({ query: "profileVersionArn" }),
      jobArn: D.m({ query: "jobArn" }),
      certificateHashes: D.m({ query: "certificateHashes" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevocationStatus",
  endpointHostPrefix: "data-",
})) as any;

export type GetSigningPlatformError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information on a specific signing platform.
 */
export const getSigningPlatform: API.OperationMethod<
  GetSigningPlatformRequest,
  GetSigningPlatformResponse,
  GetSigningPlatformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-platforms/{platformId}",
    input: { platformId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningPlatform",
})) as any;

export type GetSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information on a specific signing profile.
 */
export const getSigningProfile: API.OperationMethod<
  GetSigningProfileRequest,
  GetSigningProfileResponse,
  GetSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-profiles/{profileName}",
    input: { profileName: 0, profileOwner: D.m({ query: "profileOwner" }) },
    output: {
      revocationRecord: { revocationEffectiveFrom: D.ts, revokedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningProfile",
})) as any;

export type ListProfilePermissionsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cross-account permissions associated with a signing profile.
 */
export const listProfilePermissions: API.OperationMethod<
  ListProfilePermissionsRequest,
  ListProfilePermissionsResponse,
  ListProfilePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-profiles/{profileName}/permissions",
    input: { profileName: 0, nextToken: D.m({ query: "nextToken" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfilePermissions",
})) as any;

export type ListSigningJobsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all your signing jobs. You can use the `maxResults` parameter to limit the
 * number of signing jobs that are returned in the response. If additional jobs remain to
 * be listed, AWS Signer returns a `nextToken` value. Use this value in
 * subsequent calls to `ListSigningJobs` to fetch the remaining values. You can
 * continue calling `ListSigningJobs` with your `maxResults`
 * parameter and with new values that Signer returns in the `nextToken`
 * parameter until all of your signing jobs have been returned.
 */
export const listSigningJobs: API.PaginatedOperationMethod<
  ListSigningJobsRequest,
  ListSigningJobsResponse,
  ListSigningJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-jobs",
    input: {
      status: D.m({ query: "status" }),
      platformId: D.m({ query: "platformId" }),
      requestedBy: D.m({ query: "requestedBy" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      isRevoked: D.m({ query: "isRevoked" }),
      signatureExpiresBefore: D.m({
        query: "signatureExpiresBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      signatureExpiresAfter: D.m({
        query: "signatureExpiresAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      jobInvoker: D.m({ query: "jobInvoker" }),
    },
    output: { jobs: D.list({ createdAt: D.ts, signatureExpiresAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSigningPlatformsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all signing platforms available in AWS Signer that match the request parameters. If
 * additional jobs remain to be listed, Signer returns a `nextToken` value.
 * Use this value in subsequent calls to `ListSigningJobs` to fetch the
 * remaining values. You can continue calling `ListSigningJobs` with your
 * `maxResults` parameter and with new values that Signer returns in the
 * `nextToken` parameter until all of your signing jobs have been
 * returned.
 */
export const listSigningPlatforms: API.PaginatedOperationMethod<
  ListSigningPlatformsRequest,
  ListSigningPlatformsResponse,
  ListSigningPlatformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-platforms",
    input: {
      category: D.m({ query: "category" }),
      partner: D.m({ query: "partner" }),
      target: D.m({ query: "target" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningPlatforms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSigningProfilesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all available signing profiles in your AWS account. Returns only profiles with an
 * `ACTIVE` status unless the `includeCanceled` request field is
 * set to `true`. If additional jobs remain to be listed, AWS Signer returns a
 * `nextToken` value. Use this value in subsequent calls to
 * `ListSigningJobs` to fetch the remaining values. You can continue calling
 * `ListSigningJobs` with your `maxResults` parameter and with
 * new values that Signer returns in the `nextToken` parameter until all of
 * your signing jobs have been returned.
 */
export const listSigningProfiles: API.PaginatedOperationMethod<
  ListSigningProfilesRequest,
  ListSigningProfilesResponse,
  ListSigningProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /signing-profiles",
    input: {
      includeCanceled: D.m({ query: "includeCanceled" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      platformId: D.m({ query: "platformId" }),
      statuses: D.m({ query: "statuses" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of the tags associated with a signing profile resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | SigningProfileAlreadyExists
  | CommonErrors;
/**
 * Creates a signing profile. A signing profile is a code-signing template that can be used to
 * carry out a pre-defined signing job.
 */
export const putSigningProfile: API.OperationMethod<
  PutSigningProfileRequest,
  PutSigningProfileResponse,
  PutSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /signing-profiles/{profileName}",
    input: {
      profileName: 0,
      signingMaterial: { certificateArn: 0 },
      signatureValidityPeriod: { value: 0, type: 0 },
      platformId: 0,
      overrides: {
        signingConfiguration: { encryptionAlgorithm: 0, hashAlgorithm: 0 },
        signingImageFormat: 0,
      },
      signingParameters: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
    SigningProfileAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSigningProfile",
})) as any;

export type RemoveProfilePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes cross-account permissions from a signing profile.
 */
export const removeProfilePermission: API.OperationMethod<
  RemoveProfilePermissionRequest,
  RemoveProfilePermissionResponse,
  RemoveProfilePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /signing-profiles/{profileName}/permissions/{statementId}",
    input: {
      profileName: 0,
      revisionId: D.m({ query: "revisionId" }),
      statementId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveProfilePermission",
})) as any;

export type RevokeSignatureError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Changes the state of a signing job to `REVOKED`. This indicates that the signature is no
 * longer valid.
 */
export const revokeSignature: API.OperationMethod<
  RevokeSignatureRequest,
  RevokeSignatureResponse,
  RevokeSignatureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /signing-jobs/{jobId}/revoke",
    input: { jobId: 0, jobOwner: 0, reason: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSignature",
})) as any;

export type RevokeSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Changes the state of a signing profile to `REVOKED`. This indicates that signatures
 * generated using the signing profile after an effective start date are no longer
 * valid. A revoked profile is still viewable with the `ListSigningProfiles`
 * operation, but it cannot perform new signing jobs. See Data Retention
 * for more information on scheduled deletion of a revoked signing profile.
 */
export const revokeSigningProfile: API.OperationMethod<
  RevokeSigningProfileRequest,
  RevokeSigningProfileResponse,
  RevokeSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /signing-profiles/{profileName}/revoke",
    input: { profileName: 0, profileVersion: 0, reason: 0, effectiveTime: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSigningProfile",
})) as any;

export type SignPayloadError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Signs a binary payload and returns a signature envelope.
 */
export const signPayload: API.OperationMethod<
  SignPayloadRequest,
  SignPayloadResponse,
  SignPayloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /signing-jobs/with-payload",
    input: { profileName: 0, profileOwner: 0, payload: 0, payloadFormat: 0 },
    output: { signature: D.blob },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignPayload",
})) as any;

export type StartSigningJobError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a signing job to be performed on the code provided. Signing jobs are
 * viewable by the `ListSigningJobs` operation. Note the following requirements:
 *
 * - You must create an Amazon S3 source bucket. For more information, see Creating a Bucket in the
 * *Amazon S3 Getting Started Guide*.
 *
 * - Your S3 source bucket must be version enabled.
 *
 * - You must create an S3 destination bucket. AWS Signer uses your S3 destination bucket to
 * write your signed code.
 *
 * - You specify the name of the source and destination buckets when calling the
 * `StartSigningJob` operation.
 *
 * - You must ensure the S3 buckets are from the same Region as the signing profile. Cross-Region signing isn't supported.
 *
 * - You must also specify a request token that identifies your request to Signer.
 *
 * You can call the DescribeSigningJob and the ListSigningJobs actions after you call
 * `StartSigningJob`.
 *
 * For a Java example that shows how to use this action, see StartSigningJob.
 */
export const startSigningJob: API.OperationMethod<
  StartSigningJobRequest,
  StartSigningJobResponse,
  StartSigningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /signing-jobs",
    input: {
      source: { s3: { bucketName: 0, key: 0, version: 0 } },
      destination: { s3: { bucketName: 0, prefix: 0 } },
      profileName: 0,
      clientRequestToken: D.m({ idempotency: true }),
      profileOwner: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSigningJob",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds one or more tags to a signing profile. Tags are labels that you can use to
 * identify and organize your AWS resources. Each tag consists of a key and an optional
 * value. To specify the signing profile, use its Amazon Resource Name (ARN). To specify
 * the tag, use a key-value pair.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more tags from a signing profile. To remove the tags, specify a list of
 * tag keys.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;
