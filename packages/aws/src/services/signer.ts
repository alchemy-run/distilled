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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "signer", serviceShapeName: "WallabyService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "signer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-08-25");
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
              `https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://signer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://signer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://signer.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SigningProfileAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SigningProfileAlreadyExists>()(
    "SigningProfileAlreadyExists",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "already exists" },
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ImageFormat = "JSON" | "JSONEmbedded" | "JSONDetached" | (string & {});
export interface SigningPlatformOverrides {
  signingConfiguration?: SigningConfigurationOverrides;
  signingImageFormat?: ImageFormat;
}
export type SigningParameterKey = string;
export type SigningParameterValue = string;
export type SigningParameters = { [key: string]: string | undefined };
export type RequestedBy = string;
export type SigningStatus = "InProgress" | "Failed" | "Succeeded" | (string & {});
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
export type SigningProfileStatus = "Active" | "Canceled" | "Revoked" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AddProfilePermissionRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<AddProfilePermissionResponse>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<CancelSigningProfileRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<CancelSigningProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSigningProfile",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DescribeSigningJobRequest>,
  output: __S(18, __c4, 2) as any as S.Schema<DescribeSigningJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSigningJob",
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<GetRevocationStatusRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<GetRevocationStatusResponse>,
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
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<GetSigningPlatformRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<GetSigningPlatformResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningPlatform",
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<GetSigningProfileRequest>,
  output: __S(62, __c15, 2) as any as S.Schema<GetSigningProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningProfile",
}));

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
  input: __S(68, __c17, 0) as any as S.Schema<ListProfilePermissionsRequest>,
  output: __S(71, __c17, 3) as any as S.Schema<ListProfilePermissionsResponse>,
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
}));

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
  input: __S(72, __c18, 0) as any as S.Schema<ListSigningJobsRequest>,
  output: __S(75, __c18, 3) as any as S.Schema<ListSigningJobsResponse>,
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
  input: __S(76, __c19, 0) as any as S.Schema<ListSigningPlatformsRequest>,
  output: __S(78, __c19, 2) as any as S.Schema<ListSigningPlatformsResponse>,
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
  input: __S(80, __c20, 0) as any as S.Schema<ListSigningProfilesRequest>,
  output: __S(83, __c20, 3) as any as S.Schema<ListSigningProfilesResponse>,
  errors: [AccessDeniedException, InternalServiceErrorException, TooManyRequestsException],
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
  input: __S(84, __c21, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(85, __c21, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(88, __c22, 0) as any as S.Schema<PutSigningProfileRequest>,
  output: __S(89, __c22, 1) as any as S.Schema<PutSigningProfileResponse>,
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
}));

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
  input: __S(92, __c23, 0) as any as S.Schema<RemoveProfilePermissionRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<RemoveProfilePermissionResponse>,
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
}));

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
  input: __S(96, __c24, 0) as any as S.Schema<RevokeSignatureRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<RevokeSignatureResponse>,
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
}));

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
  input: __S(100, __c25, 0) as any as S.Schema<RevokeSigningProfileRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<RevokeSigningProfileResponse>,
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
}));

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
  input: __S(104, __c26, 0) as any as S.Schema<SignPayloadRequest>,
  output: __S(105, __c26, 1) as any as S.Schema<SignPayloadResponse>,
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
}));

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
  input: __S(110, __c27, 2) as any as S.Schema<StartSigningJobRequest>,
  output: __S(111, __c27, 3) as any as S.Schema<StartSigningJobResponse>,
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
}));

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
  input: __S(112, __c28, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(116, __c29, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          profileVersion: S.optional(S.String),
          action: S.String,
          principal: S.String,
          revisionId: S.optional(S.String),
          statementId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/signing-profiles/{profileName}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddProfilePermissionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ revisionId: S.optional(S.String) })).annotate({
        identifier: "AddProfilePermissionResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profileName: S.String.pipe(T.HttpLabel("profileName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/signing-profiles/{profileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSigningProfileRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelSigningProfileResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signing-jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSigningJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reason: S.optional(S.String),
          revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revokedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningJobRevocationRecord" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          source: S.optional(__S(37, __c9, 1)),
          signingMaterial: S.optional(__S(20, __c5, 0)),
          platformId: S.optional(S.String),
          platformDisplayName: S.optional(S.String),
          profileName: S.optional(S.String),
          profileVersion: S.optional(S.String),
          overrides: S.optional(__S(29, __c7, 1)),
          signingParameters: S.optional(__S(24, __c6, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          signatureExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          requestedBy: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          revocationRecord: S.optional(__S(17, __c4, 1)),
          signedObject: S.optional(__S(33, __c8, 1)),
          jobOwner: S.optional(S.String),
          jobInvoker: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeSigningJobResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ certificateArn: S.optional(S.String) })).annotate({
        identifier: "SigningMaterial",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          encryptionAlgorithm: S.optional(S.String),
          hashAlgorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningConfigurationOverrides" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          signingConfiguration: S.optional(__S(28, __c7, 0)),
          signingImageFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningPlatformOverrides" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.optional(S.String), key: S.optional(S.String) }),
      ).annotate({ identifier: "S3SignedObject" });
    case 1:
      return S.suspend(() => S.Struct({ s3: S.optional(__S(32, __c8, 0)) })).annotate({
        identifier: "SignedObject",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, key: S.String, version: S.String }),
      ).annotate({ identifier: "S3Source" });
    case 1:
      return S.suspend(() => S.Struct({ s3: S.optional(__S(36, __c9, 0)) })).annotate({
        identifier: "Source",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          signatureTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
            T.HttpQuery("signatureTimestamp"),
          ),
          platformId: S.String.pipe(T.HttpQuery("platformId")),
          profileVersionArn: S.String.pipe(T.HttpQuery("profileVersionArn")),
          jobArn: S.String.pipe(T.HttpQuery("jobArn")),
          certificateHashes: __S(44, __c11, 0).pipe(T.HttpQuery("certificateHashes")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/revocations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRevocationStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ revokedEntities: S.optional(__S(44, __c11, 0)) })).annotate(
        { identifier: "GetRevocationStatusResponse" },
      );
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ platformId: S.String.pipe(T.HttpLabel("platformId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signing-platforms/{platformId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSigningPlatformRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ allowedValues: __S(56, __c14, 0), defaultValue: S.String }),
      ).annotate({ identifier: "EncryptionAlgorithmOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          encryptionAlgorithmOptions: __S(52, __c13, 0),
          hashAlgorithmOptions: __S(52, __c13, 0),
        }),
      ).annotate({ identifier: "SigningConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ supportedFormats: __S(56, __c14, 0), defaultFormat: S.String }),
      ).annotate({ identifier: "SigningImageFormat" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          platformId: S.optional(S.String),
          displayName: S.optional(S.String),
          partner: S.optional(S.String),
          target: S.optional(S.String),
          category: S.optional(S.String),
          signingConfiguration: S.optional(__S(53, __c13, 1)),
          signingImageFormat: S.optional(__S(54, __c13, 2)),
          maxSizeInMB: S.optional(S.Number),
          revocationSupported: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetSigningPlatformResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          profileOwner: S.optional(S.String).pipe(T.HttpQuery("profileOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signing-profiles/{profileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSigningProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          revocationEffectiveFrom: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revokedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningProfileRevocationRecord" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          profileName: S.optional(S.String),
          profileVersion: S.optional(S.String),
          profileVersionArn: S.optional(S.String),
          revocationRecord: S.optional(__S(61, __c15, 1)),
          signingMaterial: S.optional(__S(20, __c5, 0)),
          platformId: S.optional(S.String),
          platformDisplayName: S.optional(S.String),
          signatureValidityPeriod: S.optional(__S(64, __c16, 0)),
          overrides: S.optional(__S(29, __c7, 1)),
          signingParameters: S.optional(__S(24, __c6, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(24, __c6, 0)),
        }),
      ).annotate({ identifier: "GetSigningProfileResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Number), type: S.optional(S.String) }),
      ).annotate({ identifier: "SignatureValidityPeriod" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signing-profiles/{profileName}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfilePermissionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          principal: S.optional(S.String),
          statementId: S.optional(S.String),
          profileVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Permission" });
    case 2:
      return S.Array(__S(69, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          revisionId: S.optional(S.String),
          policySizeBytes: S.optional(S.Number),
          permissions: S.optional(__S(70, __c17, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfilePermissionsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          platformId: S.optional(S.String).pipe(T.HttpQuery("platformId")),
          requestedBy: S.optional(S.String).pipe(T.HttpQuery("requestedBy")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          isRevoked: S.optional(S.Boolean).pipe(T.HttpQuery("isRevoked")),
          signatureExpiresBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("signatureExpiresBefore"),
          ),
          signatureExpiresAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("signatureExpiresAfter"),
          ),
          jobInvoker: S.optional(S.String).pipe(T.HttpQuery("jobInvoker")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/signing-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSigningJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          source: S.optional(__S(37, __c9, 1)),
          signedObject: S.optional(__S(33, __c8, 1)),
          signingMaterial: S.optional(__S(20, __c5, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          isRevoked: S.optional(S.Boolean),
          profileName: S.optional(S.String),
          profileVersion: S.optional(S.String),
          platformId: S.optional(S.String),
          platformDisplayName: S.optional(S.String),
          signatureExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          jobOwner: S.optional(S.String),
          jobInvoker: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningJob" });
    case 2:
      return S.Array(__S(73, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(74, __c18, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSigningJobsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          category: S.optional(S.String).pipe(T.HttpQuery("category")),
          partner: S.optional(S.String).pipe(T.HttpQuery("partner")),
          target: S.optional(S.String).pipe(T.HttpQuery("target")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/signing-platforms" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSigningPlatformsRequest" });
    case 1:
      return S.Array(__S(55, __c13, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ platforms: S.optional(__S(77, __c19, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSigningPlatformsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeCanceled: S.optional(S.Boolean).pipe(T.HttpQuery("includeCanceled")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          platformId: S.optional(S.String).pipe(T.HttpQuery("platformId")),
          statuses: S.optional(__S(56, __c14, 0)).pipe(T.HttpQuery("statuses")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/signing-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSigningProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileName: S.optional(S.String),
          profileVersion: S.optional(S.String),
          profileVersionArn: S.optional(S.String),
          signingMaterial: S.optional(__S(20, __c5, 0)),
          signatureValidityPeriod: S.optional(__S(64, __c16, 0)),
          platformId: S.optional(S.String),
          platformDisplayName: S.optional(S.String),
          signingParameters: S.optional(__S(24, __c6, 0)),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(24, __c6, 0)),
        }),
      ).annotate({ identifier: "SigningProfile" });
    case 2:
      return S.Array(__S(81, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ profiles: S.optional(__S(82, __c20, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSigningProfilesResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(24, __c6, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          signingMaterial: S.optional(__S(20, __c5, 0)),
          signatureValidityPeriod: S.optional(__S(64, __c16, 0)),
          platformId: S.String,
          overrides: S.optional(__S(29, __c7, 1)),
          signingParameters: S.optional(__S(24, __c6, 0)),
          tags: S.optional(__S(24, __c6, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/signing-profiles/{profileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSigningProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          profileVersion: S.optional(S.String),
          profileVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutSigningProfileResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          revisionId: S.String.pipe(T.HttpQuery("revisionId")),
          statementId: S.String.pipe(T.HttpLabel("statementId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/signing-profiles/{profileName}/permissions/{statementId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveProfilePermissionRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          jobOwner: S.optional(S.String),
          reason: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/signing-jobs/{jobId}/revoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeSignatureRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String.pipe(T.HttpLabel("profileName")),
          profileVersion: S.String,
          reason: S.String,
          effectiveTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/signing-profiles/{profileName}/revoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeSigningProfileRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileName: S.String,
          profileOwner: S.optional(S.String),
          payload: T.Blob,
          payloadFormat: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/signing-jobs/with-payload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SignPayloadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          jobOwner: S.optional(S.String),
          metadata: S.optional(__S(24, __c6, 0)),
          signature: S.optional(T.Blob),
        }),
      ).annotate({ identifier: "SignPayloadResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.optional(S.String), prefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Destination" });
    case 1:
      return S.suspend(() => S.Struct({ s3: S.optional(__S(108, __c27, 0)) })).annotate({
        identifier: "Destination",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          source: __S(37, __c9, 1),
          destination: __S(109, __c27, 1),
          profileName: S.String,
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
          profileOwner: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/signing-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartSigningJobRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), jobOwner: S.optional(S.String) }),
      ).annotate({ identifier: "StartSigningJobResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(24, __c6, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(44, __c11, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
