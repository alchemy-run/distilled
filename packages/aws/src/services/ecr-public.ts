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
  sdkId: "ECR PUBLIC",
  target: "SpencerFrontendService",
  version: "2020-10-30",
  sigv4: "ecr-public",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ecr-public.amazonaws.com/doc/2020-12-02/",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
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
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.ecr-public.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class EmptyUploadException
  extends /*@__PURE__*/ TE.TaggedError("EmptyUploadException")<{
    readonly message?: string;
  }> {}
export class ImageAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ImageAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ImageDigestDoesNotMatchException
  extends /*@__PURE__*/ TE.TaggedError("ImageDigestDoesNotMatchException")<{
    readonly message?: string;
  }> {}
export class ImageNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ImageNotFoundException")<{
    readonly message?: string;
  }> {}
export class ImageTagAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ImageTagAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class InvalidLayerException
  extends /*@__PURE__*/ TE.TaggedError("InvalidLayerException")<{
    readonly message?: string;
  }> {}
export class InvalidLayerPartException
  extends /*@__PURE__*/ TE.TaggedError("InvalidLayerPartException")<{
    readonly registryId?: string;
    readonly repositoryName?: string;
    readonly uploadId?: string;
    readonly lastValidByteReceived?: number;
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
  }> {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagParameterException")<{
    readonly message?: string;
  }> {}
export class LayerAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("LayerAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class LayerPartTooSmallException
  extends /*@__PURE__*/ TE.TaggedError("LayerPartTooSmallException")<{
    readonly message?: string;
  }> {}
export class LayersNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("LayersNotFoundException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ReferencedImagesNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ReferencedImagesNotFoundException")<{
    readonly message?: string;
  }> {}
export class RegistryNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RegistryNotFoundException")<{
    readonly message?: string;
  }> {}
export class RepositoryAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class RepositoryCatalogDataNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryCatalogDataNotFoundException",
  )<{ readonly message?: string }> {}
export class RepositoryNotEmptyException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNotEmptyException")<{
    readonly message?: string;
  }> {}
export class RepositoryNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNotFoundException")<{
    readonly message?: string;
  }> {}
export class RepositoryPolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryPolicyNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServerException
  extends /*@__PURE__*/ TE.TaggedError("ServerException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export class UnsupportedCommandException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedCommandException")<{
    readonly message?: string;
  }> {}
export class UploadNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("UploadNotFoundException")<{
    readonly message?: string;
  }> {}
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
export type LayerFailureCode =
  | "InvalidLayerDigest"
  | "MissingLayerDigest"
  | (string & {});
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
export type RegistryAliasStatus =
  | "ACTIVE"
  | "PENDING"
  | "REJECTED"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, layerDigests: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageIds: D.list(i_ImageIdentifier),
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImage",
})) as any;

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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, uploadId: 0, layerDigests: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      catalogData: i_RepositoryCatalogDataInput,
      tags: D.list(i_Tag),
    },
    output: { repository: o_Repository },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, force: 0 },
    output: { repository: o_Repository },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { registryId: 0, repositoryName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageIds: D.list(i_ImageIdentifier),
      nextToken: 0,
      maxResults: 0,
    },
    output: { imageDetails: D.list({ imagePushedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, nextToken: 0, maxResults: 0 },
    output: {
      imageTagDetails: D.list({
        createdAt: D.ts,
        imageDetail: { imagePushedAt: D.ts },
      }),
    },
  },
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryNames: 0, nextToken: 0, maxResults: 0 },
    output: { repositories: D.list(o_Repository) },
  },
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
  descriptor: {
    service: svc,
    input: {},
    output: {
      authorizationData: { authorizationToken: D.secret, expiresAt: D.ts },
    },
  },
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizationToken",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryCatalogData",
})) as any;

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
  descriptor: { service: svc, input: { registryId: 0, repositoryName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { registryId: 0, repositoryName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { registryId: 0, repositoryName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageManifest: 0,
      imageManifestMediaType: 0,
      imageTag: 0,
      imageDigest: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { displayName: 0 } },
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRegistryCatalogData",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      catalogData: i_RepositoryCatalogDataInput,
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRepositoryCatalogData",
})) as any;

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
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, policyText: 0, force: 0 },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRepositoryPolicy",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      uploadId: 0,
      partFirstByte: 0,
      partLastByte: 0,
      layerPartBlob: 0,
    },
  },
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
})) as any;

const i_ImageIdentifier: D.LazyStruct = () => ({ imageDigest: 0, imageTag: 0 });
const i_RepositoryCatalogDataInput: D.LazyStruct = () => ({
  description: 0,
  architectures: 0,
  operatingSystems: 0,
  logoImageBlob: 0,
  aboutText: 0,
  usageText: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Repository: D.LazyStruct = () => ({ createdAt: D.ts });
