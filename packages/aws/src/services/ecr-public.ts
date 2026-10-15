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
const ns = /*@__PURE__*/ T.XmlNamespace("http://ecr-public.amazonaws.com/doc/2020-12-02/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ECR PUBLIC",
  serviceShapeName: "SpencerFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ecr-public" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-10-30");
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
              `https://api.ecr-public-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.ecr-public-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://ecr-public.${Region}.api.aws`);
            }
            return e(
              `https://api.ecr-public.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://api.ecr-public.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.ecr-public.{R}.{D}","properties":{},"headers":{}}');

export class EmptyUploadException
  extends /*@__PURE__*/ S.TaggedError<EmptyUploadException>()("EmptyUploadException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ImageAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ImageAlreadyExistsException>()(
    "ImageAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ImageDigestDoesNotMatchException
  extends /*@__PURE__*/ S.TaggedError<ImageDigestDoesNotMatchException>()(
    "ImageDigestDoesNotMatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ImageNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ImageNotFoundException>()("ImageNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ImageTagAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ImageTagAlreadyExistsException>()(
    "ImageTagAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class InvalidLayerException
  extends /*@__PURE__*/ S.TaggedError<InvalidLayerException>()("InvalidLayerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidLayerPartException
  extends /*@__PURE__*/ S.TaggedError<InvalidLayerPartException>()("InvalidLayerPartException", {
    registryId: /*@__PURE__*/ S.optional(S.String),
    repositoryName: /*@__PURE__*/ S.optional(S.String),
    uploadId: /*@__PURE__*/ S.optional(S.String),
    lastValidByteReceived: /*@__PURE__*/ S.optional(S.Number),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagParameterException>()(
    "InvalidTagParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class LayerAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<LayerAlreadyExistsException>()(
    "LayerAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class LayerPartTooSmallException
  extends /*@__PURE__*/ S.TaggedError<LayerPartTooSmallException>()("LayerPartTooSmallException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LayersNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LayersNotFoundException>()("LayersNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ReferencedImagesNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ReferencedImagesNotFoundException>()(
    "ReferencedImagesNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RegistryNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RegistryNotFoundException>()("RegistryNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RepositoryAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<RepositoryAlreadyExistsException>()(
    "RepositoryAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class RepositoryCatalogDataNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryCatalogDataNotFoundException>()(
    "RepositoryCatalogDataNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotEmptyException>()(
    "RepositoryNotEmptyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotFoundException>()(
    "RepositoryNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryPolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryPolicyNotFoundException>()(
    "RepositoryPolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()("ServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnsupportedCommandException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedCommandException>()(
    "UnsupportedCommandException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class UploadNotFoundException
  extends /*@__PURE__*/ S.TaggedError<UploadNotFoundException>()("UploadNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type RegistryIdOrAlias = string;
export type RepositoryName = string;
export type BatchedOperationLayerDigest = string;
export type BatchedOperationLayerDigestList = string[];
export interface BatchCheckLayerAvailabilityRequest {
  registryId?: string;
  repositoryName: string;
  layerDigests: string[];
}
export type LayerDigest = string;
export type LayerAvailability = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export type LayerSizeInBytes = number;
export type MediaType = string;
export interface Layer {
  layerDigest?: string;
  layerAvailability?: LayerAvailability;
  layerSize?: number;
  mediaType?: string;
}
export type LayerList = Layer[];
export type LayerFailureCode = "InvalidLayerDigest" | "MissingLayerDigest" | (string & {});
export type LayerFailureReason = string;
export interface LayerFailure {
  layerDigest?: string;
  failureCode?: LayerFailureCode;
  failureReason?: string;
}
export type LayerFailureList = LayerFailure[];
export interface BatchCheckLayerAvailabilityResponse {
  layers?: Layer[];
  failures?: LayerFailure[];
}
export type ImageDigest = string;
export type ImageTag = string;
export interface ImageIdentifier {
  imageDigest?: string;
  imageTag?: string;
}
export type ImageIdentifierList = ImageIdentifier[];
export interface BatchDeleteImageRequest {
  registryId?: string;
  repositoryName: string;
  imageIds: ImageIdentifier[];
}
export type ImageFailureCode =
  | "InvalidImageDigest"
  | "InvalidImageTag"
  | "ImageTagDoesNotMatchDigest"
  | "ImageNotFound"
  | "MissingDigestAndTag"
  | "ImageReferencedByManifestList"
  | "KmsError"
  | (string & {});
export type ImageFailureReason = string;
export interface ImageFailure {
  imageId?: ImageIdentifier;
  failureCode?: ImageFailureCode;
  failureReason?: string;
}
export type ImageFailureList = ImageFailure[];
export interface BatchDeleteImageResponse {
  imageIds?: ImageIdentifier[];
  failures?: ImageFailure[];
}
export type UploadId = string;
export type LayerDigestList = string[];
export interface CompleteLayerUploadRequest {
  registryId?: string;
  repositoryName: string;
  uploadId: string;
  layerDigests: string[];
}
export type RegistryId = string;
export interface CompleteLayerUploadResponse {
  registryId?: string;
  repositoryName?: string;
  uploadId?: string;
  layerDigest?: string;
}
export type RepositoryDescription = string;
export type Architecture = string;
export type ArchitectureList = string[];
export type OperatingSystem = string;
export type OperatingSystemList = string[];
export type LogoImageBlob = Uint8Array;
export type AboutText = string;
export type UsageText = string;
export interface RepositoryCatalogDataInput {
  description?: string;
  architectures?: string[];
  operatingSystems?: string[];
  logoImageBlob?: Uint8Array;
  aboutText?: string;
  usageText?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateRepositoryRequest {
  repositoryName: string;
  catalogData?: RepositoryCatalogDataInput;
  tags?: Tag[];
}
export type Arn = string;
export type Url = string;
export type CreationTimestamp = Date;
export interface Repository {
  repositoryArn?: string;
  registryId?: string;
  repositoryName?: string;
  repositoryUri?: string;
  createdAt?: Date;
}
export type ResourceUrl = string;
export type MarketplaceCertified = boolean;
export interface RepositoryCatalogData {
  description?: string;
  architectures?: string[];
  operatingSystems?: string[];
  logoUrl?: string;
  aboutText?: string;
  usageText?: string;
  marketplaceCertified?: boolean;
}
export interface CreateRepositoryResponse {
  repository?: Repository;
  catalogData?: RepositoryCatalogData;
}
export type ForceFlag = boolean;
export interface DeleteRepositoryRequest {
  registryId?: string;
  repositoryName: string;
  force?: boolean;
}
export interface DeleteRepositoryResponse {
  repository?: Repository;
}
export interface DeleteRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export type RepositoryPolicyText = string;
export interface DeleteRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export type NextToken = string;
export type MaxResults = number;
export interface DescribeImagesRequest {
  registryId?: string;
  repositoryName: string;
  imageIds?: ImageIdentifier[];
  nextToken?: string;
  maxResults?: number;
}
export type ImageTagList = string[];
export type ImageSizeInBytes = number;
export type PushTimestamp = Date;
export interface ImageDetail {
  registryId?: string;
  repositoryName?: string;
  imageDigest?: string;
  imageTags?: string[];
  imageSizeInBytes?: number;
  imagePushedAt?: Date;
  imageManifestMediaType?: string;
  artifactMediaType?: string;
}
export type ImageDetailList = ImageDetail[];
export interface DescribeImagesResponse {
  imageDetails?: ImageDetail[];
  nextToken?: string;
}
export interface DescribeImageTagsRequest {
  registryId?: string;
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ReferencedImageDetail {
  imageDigest?: string;
  imageSizeInBytes?: number;
  imagePushedAt?: Date;
  imageManifestMediaType?: string;
  artifactMediaType?: string;
}
export interface ImageTagDetail {
  imageTag?: string;
  createdAt?: Date;
  imageDetail?: ReferencedImageDetail;
}
export type ImageTagDetailList = ImageTagDetail[];
export interface DescribeImageTagsResponse {
  imageTagDetails?: ImageTagDetail[];
  nextToken?: string;
}
export interface DescribeRegistriesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type RegistryVerified = boolean;
export type RegistryAliasName = string;
export type RegistryAliasStatus = "ACTIVE" | "PENDING" | "REJECTED" | (string & {});
export type PrimaryRegistryAliasFlag = boolean;
export type DefaultRegistryAliasFlag = boolean;
export interface RegistryAlias {
  name: string;
  status: RegistryAliasStatus;
  primaryRegistryAlias: boolean;
  defaultRegistryAlias: boolean;
}
export type RegistryAliasList = RegistryAlias[];
export interface Registry {
  registryId: string;
  registryArn: string;
  registryUri: string;
  verified: boolean;
  aliases: RegistryAlias[];
}
export type RegistryList = Registry[];
export interface DescribeRegistriesResponse {
  registries: Registry[];
  nextToken?: string;
}
export type RepositoryNameList = string[];
export interface DescribeRepositoriesRequest {
  registryId?: string;
  repositoryNames?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type RepositoryList = Repository[];
export interface DescribeRepositoriesResponse {
  repositories?: Repository[];
  nextToken?: string;
}
export interface GetAuthorizationTokenRequest {}
export type Base64 = string;
export type ExpirationTimestamp = Date;
export interface AuthorizationData {
  authorizationToken?: string | redacted.Redacted<string>;
  expiresAt?: Date;
}
export interface GetAuthorizationTokenResponse {
  authorizationData?: AuthorizationData;
}
export interface GetRegistryCatalogDataRequest {}
export type RegistryDisplayName = string;
export interface RegistryCatalogData {
  displayName?: string;
}
export interface GetRegistryCatalogDataResponse {
  registryCatalogData: RegistryCatalogData;
}
export interface GetRepositoryCatalogDataRequest {
  registryId?: string;
  repositoryName: string;
}
export interface GetRepositoryCatalogDataResponse {
  catalogData?: RepositoryCatalogData;
}
export interface GetRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export interface GetRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export interface InitiateLayerUploadRequest {
  registryId?: string;
  repositoryName: string;
}
export type PartSize = number;
export interface InitiateLayerUploadResponse {
  uploadId?: string;
  partSize?: number;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type ImageManifest = string;
export interface PutImageRequest {
  registryId?: string;
  repositoryName: string;
  imageManifest: string;
  imageManifestMediaType?: string;
  imageTag?: string;
  imageDigest?: string;
}
export interface Image {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageManifest?: string;
  imageManifestMediaType?: string;
}
export interface PutImageResponse {
  image?: Image;
}
export interface PutRegistryCatalogDataRequest {
  displayName?: string;
}
export interface PutRegistryCatalogDataResponse {
  registryCatalogData: RegistryCatalogData;
}
export interface PutRepositoryCatalogDataRequest {
  registryId?: string;
  repositoryName: string;
  catalogData: RepositoryCatalogDataInput;
}
export interface PutRepositoryCatalogDataResponse {
  catalogData?: RepositoryCatalogData;
}
export interface SetRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
  policyText: string;
  force?: boolean;
}
export interface SetRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type LayerPartBlob = Uint8Array;
export interface UploadLayerPartRequest {
  registryId?: string;
  repositoryName: string;
  uploadId: string;
  partFirstByte: number;
  partLastByte: number;
  layerPartBlob: Uint8Array;
}
export interface UploadLayerPartResponse {
  registryId?: string;
  repositoryName?: string;
  uploadId?: string;
  lastByteReceived?: number;
}
export type ExceptionMessage = string;
export type BatchCheckLayerAvailabilityError =
  | InvalidParameterException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Checks the availability of one or more image layers that are within a repository in a
 * public registry. When an image is pushed to a repository, each image layer is checked to
 * verify if it has been uploaded before. If it has been uploaded, then the image layer is
 * skipped.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const batchCheckLayerAvailability: API.OperationMethod<
  BatchCheckLayerAvailabilityRequest,
  BatchCheckLayerAvailabilityResponse,
  BatchCheckLayerAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchCheckLayerAvailabilityRequest>,
  output: __S(5, __c0, 5) as any as S.Schema<BatchCheckLayerAvailabilityResponse>,
  errors: [
    InvalidParameterException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCheckLayerAvailability",
}));

export type BatchDeleteImageError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes a list of specified images that are within a repository in a public registry.
 * Images are specified with either an `imageTag` or
 * `imageDigest`.
 *
 * You can remove a tag from an image by specifying the image's tag in your request. When
 * you remove the last tag from an image, the image is deleted from your repository.
 *
 * You can completely delete an image (and all of its tags) by specifying the digest of the
 * image in your request.
 */
export const batchDeleteImage: API.OperationMethod<
  BatchDeleteImageRequest,
  BatchDeleteImageResponse,
  BatchDeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<BatchDeleteImageRequest>,
  output: __S(19, __c2, 3) as any as S.Schema<BatchDeleteImageResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImage",
}));

export type CompleteLayerUploadError =
  | EmptyUploadException
  | InvalidLayerException
  | InvalidParameterException
  | LayerAlreadyExistsException
  | LayerPartTooSmallException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Informs Amazon ECR that the image layer upload is complete for a specified public registry,
 * repository name, and upload ID. You can optionally provide a `sha256` digest of
 * the image layer for data validation purposes.
 *
 * When an image is pushed, the CompleteLayerUpload API is called once for each new image
 * layer to verify that the upload is complete.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const completeLayerUpload: API.OperationMethod<
  CompleteLayerUploadRequest,
  CompleteLayerUploadResponse,
  CompleteLayerUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<CompleteLayerUploadRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<CompleteLayerUploadResponse>,
  errors: [
    EmptyUploadException,
    InvalidLayerException,
    InvalidParameterException,
    LayerAlreadyExistsException,
    LayerPartTooSmallException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteLayerUpload",
}));

export type CreateRepositoryError =
  | InvalidParameterException
  | InvalidTagParameterException
  | LimitExceededException
  | RepositoryAlreadyExistsException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates a repository in a public registry. For more information, see Amazon ECR
 * repositories in the *Amazon Elastic Container Registry User Guide*.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CreateRepositoryRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<CreateRepositoryResponse>,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    LimitExceededException,
    RepositoryAlreadyExistsException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
}));

export type DeleteRepositoryError =
  | InvalidParameterException
  | RepositoryNotEmptyException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes a repository in a public registry. If the repository contains images, you must
 * either manually delete all images in the repository or use the `force` option.
 * This option deletes all images on your behalf before deleting the repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryRequest,
  DeleteRepositoryResponse,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteRepositoryRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<DeleteRepositoryResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotEmptyException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
}));

export type DeleteRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes the repository policy that's associated with the specified repository.
 */
export const deleteRepositoryPolicy: API.OperationMethod<
  DeleteRepositoryPolicyRequest,
  DeleteRepositoryPolicyResponse,
  DeleteRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteRepositoryPolicyRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteRepositoryPolicyResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    RepositoryPolicyNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryPolicy",
}));

export type DescribeImagesError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns metadata that's related to the images in a repository in a public
 * registry.
 *
 * Beginning with Docker version 1.9, the Docker client compresses image layers before
 * pushing them to a V2 Docker registry. The output of the `docker images`
 * command shows the uncompressed image size. Therefore, it might return a larger image
 * size than the image sizes that are returned by DescribeImages.
 */
export const describeImages: API.PaginatedOperationMethod<
  DescribeImagesRequest,
  DescribeImagesResponse,
  DescribeImagesError,
  Credentials | HttpClient.HttpClient,
  ImageDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DescribeImagesRequest>,
  output: __S(115, __c14, 3) as any as S.Schema<DescribeImagesResponse>,
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeImageTagsError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns the image tag details for a repository in a public registry.
 */
export const describeImageTags: API.PaginatedOperationMethod<
  DescribeImageTagsRequest,
  DescribeImageTagsResponse,
  DescribeImageTagsError,
  Credentials | HttpClient.HttpClient,
  ImageTagDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DescribeImageTagsRequest>,
  output: __S(124, __c15, 4) as any as S.Schema<DescribeImageTagsResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageTags",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageTagDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRegistriesError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns details for a public registry.
 */
export const describeRegistries: API.PaginatedOperationMethod<
  DescribeRegistriesRequest,
  DescribeRegistriesResponse,
  DescribeRegistriesError,
  Credentials | HttpClient.HttpClient,
  Registry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DescribeRegistriesRequest>,
  output: __S(133, __c16, 5) as any as S.Schema<DescribeRegistriesResponse>,
  errors: [InvalidParameterException, ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRepositoriesError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Describes repositories that are in a public registry.
 */
export const describeRepositories: API.PaginatedOperationMethod<
  DescribeRepositoriesRequest,
  DescribeRepositoriesResponse,
  DescribeRepositoriesError,
  Credentials | HttpClient.HttpClient,
  Repository
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DescribeRepositoriesRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<DescribeRepositoriesResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAuthorizationTokenError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves an authorization token. An authorization token represents your IAM
 * authentication credentials. You can use it to access any Amazon ECR registry that your IAM
 * principal has access to. The authorization token is valid for 12 hours. This API requires
 * the `ecr-public:GetAuthorizationToken` and
 * `sts:GetServiceBearerToken` permissions.
 */
export const getAuthorizationToken: API.OperationMethod<
  GetAuthorizationTokenRequest,
  GetAuthorizationTokenResponse,
  GetAuthorizationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetAuthorizationTokenRequest>,
  output: __S(146, __c18, 2) as any as S.Schema<GetAuthorizationTokenResponse>,
  errors: [InvalidParameterException, ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizationToken",
}));

export type GetRegistryCatalogDataError =
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves catalog metadata for a public registry.
 */
export const getRegistryCatalogData: API.OperationMethod<
  GetRegistryCatalogDataRequest,
  GetRegistryCatalogDataResponse,
  GetRegistryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetRegistryCatalogDataRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<GetRegistryCatalogDataResponse>,
  errors: [ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryCatalogData",
}));

export type GetRepositoryCatalogDataError =
  | InvalidParameterException
  | RepositoryCatalogDataNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieve catalog metadata for a repository in a public registry. This metadata is
 * displayed publicly in the Amazon ECR Public Gallery.
 */
export const getRepositoryCatalogData: API.OperationMethod<
  GetRepositoryCatalogDataRequest,
  GetRepositoryCatalogDataResponse,
  GetRepositoryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<GetRepositoryCatalogDataRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<GetRepositoryCatalogDataResponse>,
  errors: [
    InvalidParameterException,
    RepositoryCatalogDataNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryCatalogData",
}));

export type GetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves the repository policy for the specified repository.
 */
export const getRepositoryPolicy: API.OperationMethod<
  GetRepositoryPolicyRequest,
  GetRepositoryPolicyResponse,
  GetRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<GetRepositoryPolicyRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<GetRepositoryPolicyResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    RepositoryPolicyNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryPolicy",
}));

export type InitiateLayerUploadError =
  | InvalidParameterException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Notifies Amazon ECR that you intend to upload an image layer.
 *
 * When an image is pushed, the InitiateLayerUpload API is called once for each image layer
 * that hasn't already been uploaded. Whether an image layer uploads is determined by the
 * BatchCheckLayerAvailability API action.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const initiateLayerUpload: API.OperationMethod<
  InitiateLayerUploadRequest,
  InitiateLayerUploadResponse,
  InitiateLayerUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<InitiateLayerUploadRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<InitiateLayerUploadResponse>,
  errors: [
    InvalidParameterException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateLayerUpload",
}));

export type ListTagsForResourceError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * List the tags for an Amazon ECR Public resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutImageError =
  | ImageAlreadyExistsException
  | ImageDigestDoesNotMatchException
  | ImageTagAlreadyExistsException
  | InvalidParameterException
  | LayersNotFoundException
  | LimitExceededException
  | ReferencedImagesNotFoundException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates or updates the image manifest and tags that are associated with an image.
 *
 * When an image is pushed and all new image layers have been uploaded, the PutImage API is
 * called once to create or update the image manifest and the tags that are associated with
 * the image.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const putImage: API.OperationMethod<
  PutImageRequest,
  PutImageResponse,
  PutImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<PutImageRequest>,
  output: __S(210, __c26, 2) as any as S.Schema<PutImageResponse>,
  errors: [
    ImageAlreadyExistsException,
    ImageDigestDoesNotMatchException,
    ImageTagAlreadyExistsException,
    InvalidParameterException,
    LayersNotFoundException,
    LimitExceededException,
    ReferencedImagesNotFoundException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImage",
}));

export type PutRegistryCatalogDataError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Create or update the catalog data for a public registry.
 */
export const putRegistryCatalogData: API.OperationMethod<
  PutRegistryCatalogDataRequest,
  PutRegistryCatalogDataResponse,
  PutRegistryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<PutRegistryCatalogDataRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<PutRegistryCatalogDataResponse>,
  errors: [InvalidParameterException, ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRegistryCatalogData",
}));

export type PutRepositoryCatalogDataError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates or updates the catalog data for a repository in a public registry.
 */
export const putRepositoryCatalogData: API.OperationMethod<
  PutRepositoryCatalogDataRequest,
  PutRepositoryCatalogDataResponse,
  PutRepositoryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<PutRepositoryCatalogDataRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<PutRepositoryCatalogDataResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRepositoryCatalogData",
}));

export type SetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Applies a repository policy to the specified public repository to control access
 * permissions. For more information, see Amazon ECR Repository
 * Policies in the *Amazon Elastic Container Registry User Guide*.
 */
export const setRepositoryPolicy: API.OperationMethod<
  SetRepositoryPolicyRequest,
  SetRepositoryPolicyResponse,
  SetRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<SetRepositoryPolicyRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<SetRepositoryPolicyResponse>,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRepositoryPolicy",
}));

export type TagResourceError =
  | InvalidParameterException
  | InvalidTagParameterException
  | RepositoryNotFoundException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    RepositoryNotFoundException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterException
  | InvalidTagParameterException
  | RepositoryNotFoundException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    RepositoryNotFoundException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UploadLayerPartError =
  | InvalidLayerPartException
  | InvalidParameterException
  | LimitExceededException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Uploads an image layer part to Amazon ECR.
 *
 * When an image is pushed, each new image layer is uploaded in parts. The maximum size of
 * each image layer part can be 20971520 bytes (about 20MB). The UploadLayerPart API is called
 * once for each new image layer part.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const uploadLayerPart: API.OperationMethod<
  UploadLayerPartRequest,
  UploadLayerPartResponse,
  UploadLayerPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<UploadLayerPartRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<UploadLayerPartResponse>,
  errors: [
    InvalidLayerPartException,
    InvalidParameterException,
    LimitExceededException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadLayerPart",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          layerDigests: __S(8, __c1, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchCheckLayerAvailabilityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          layerDigest: S.optional(S.String),
          layerAvailability: S.optional(S.String),
          layerSize: S.optional(S.Number),
          mediaType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Layer" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          layerDigest: S.optional(S.String),
          failureCode: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "LayerFailure" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          layers: S.optional(__S(2, __c0, 2)),
          failures: S.optional(__S(4, __c0, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchCheckLayerAvailabilityResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          imageIds: __S(24, __c3, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageId: S.optional(__S(32, __c4, 0)),
          failureCode: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageFailure" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageIds: S.optional(__S(24, __c3, 0)),
          failures: S.optional(__S(18, __c2, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchDeleteImageResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageDigest: S.optional(S.String), imageTag: S.optional(S.String) }),
      ).annotate({ identifier: "ImageIdentifier" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          uploadId: S.String,
          layerDigests: __S(8, __c1, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CompleteLayerUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          uploadId: S.optional(S.String),
          layerDigest: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CompleteLayerUploadResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          catalogData: S.optional(__S(80, __c10, 0)),
          tags: S.optional(__S(73, __c9, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRepositoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repository: S.optional(__S(56, __c7, 0)),
          catalogData: S.optional(__S(64, __c8, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateRepositoryResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryArn: S.optional(S.String),
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          repositoryUri: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Repository" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          architectures: S.optional(__S(8, __c1, 0)),
          operatingSystems: S.optional(__S(8, __c1, 0)),
          logoUrl: S.optional(S.String),
          aboutText: S.optional(S.String),
          usageText: S.optional(S.String),
          marketplaceCertified: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RepositoryCatalogData" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(72, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          architectures: S.optional(__S(8, __c1, 0)),
          operatingSystems: S.optional(__S(8, __c1, 0)),
          logoImageBlob: S.optional(T.Blob),
          aboutText: S.optional(S.String),
          usageText: S.optional(S.String),
        }),
      ).annotate({ identifier: "RepositoryCatalogDataInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteRepositoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ repository: S.optional(__S(56, __c7, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteRepositoryResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRepositoryPolicyRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          policyText: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteRepositoryPolicyResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          imageIds: S.optional(__S(24, __c3, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          imageDigest: S.optional(S.String),
          imageTags: S.optional(__S(8, __c1, 0)),
          imageSizeInBytes: S.optional(S.Number),
          imagePushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          imageManifestMediaType: S.optional(S.String),
          artifactMediaType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageDetail" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageDetails: S.optional(__S(114, __c14, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeImagesResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImageTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageDigest: S.optional(S.String),
          imageSizeInBytes: S.optional(S.Number),
          imagePushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          imageManifestMediaType: S.optional(S.String),
          artifactMediaType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReferencedImageDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageTag: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          imageDetail: S.optional(__S(121, __c15, 1)),
        }),
      ).annotate({ identifier: "ImageTagDetail" });
    case 3:
      return S.Array(__S(122, __c15, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          imageTagDetails: S.optional(__S(123, __c15, 3)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeImageTagsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRegistriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          status: S.String,
          primaryRegistryAlias: S.Boolean,
          defaultRegistryAlias: S.Boolean,
        }),
      ).annotate({ identifier: "RegistryAlias" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String,
          registryArn: S.String,
          registryUri: S.String,
          verified: S.Boolean,
          aliases: __S(130, __c16, 2),
        }),
      ).annotate({ identifier: "Registry" });
    case 4:
      return S.Array(__S(131, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ registries: __S(132, __c16, 4), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeRegistriesResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryNames: S.optional(__S(8, __c1, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRepositoriesRequest" });
    case 1:
      return S.Array(__S(56, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          repositories: S.optional(__S(137, __c17, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRepositoriesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAuthorizationTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          authorizationToken: S.optional(SensitiveString),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AuthorizationData" });
    case 2:
      return S.suspend(() =>
        S.Struct({ authorizationData: S.optional(__S(145, __c18, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetAuthorizationTokenResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRegistryCatalogDataRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ displayName: S.optional(S.String) })).annotate({
        identifier: "RegistryCatalogData",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ registryCatalogData: __S(160, __c20, 0) }).pipe(ns),
      ).annotate({ identifier: "GetRegistryCatalogDataResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryCatalogDataRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ catalogData: S.optional(__S(64, __c8, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetRepositoryCatalogDataResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryPolicyRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InitiateLayerUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ uploadId: S.optional(S.String), partSize: S.optional(S.Number) }).pipe(ns),
      ).annotate({ identifier: "InitiateLayerUploadResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(73, __c9, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          imageManifest: S.String,
          imageManifestMediaType: S.optional(S.String),
          imageTag: S.optional(S.String),
          imageDigest: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          imageId: S.optional(__S(32, __c4, 0)),
          imageManifest: S.optional(S.String),
          imageManifestMediaType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Image" });
    case 2:
      return S.suspend(() => S.Struct({ image: S.optional(__S(209, __c26, 1)) }).pipe(ns)).annotate(
        { identifier: "PutImageResponse" },
      );
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ displayName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRegistryCatalogDataRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          catalogData: __S(80, __c10, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRepositoryCatalogDataRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          policyText: S.String,
          force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetRepositoryPolicyRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(73, __c9, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(8, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.String,
          uploadId: S.String,
          partFirstByte: S.Number,
          partLastByte: S.Number,
          layerPartBlob: T.Blob,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UploadLayerPartRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          uploadId: S.optional(S.String),
          lastByteReceived: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "UploadLayerPartResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
