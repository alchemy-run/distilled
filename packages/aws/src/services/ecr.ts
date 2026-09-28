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
  sdkId: "ECR",
  target: "AmazonEC2ContainerRegistry_V20150921",
  version: "2015-09-21",
  sigv4: "ecr",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ecr.amazonaws.com/doc/2015-09-21/",
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://api.ecr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.ecr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BlockedByOrganizationPolicyException
  extends /*@__PURE__*/ TE.TaggedError("BlockedByOrganizationPolicyException")<{
    readonly message?: string;
  }> {}
export class EmptyUploadException
  extends /*@__PURE__*/ TE.TaggedError("EmptyUploadException")<{
    readonly message?: string;
  }> {}
export class ExclusionAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ExclusionAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ExclusionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ExclusionNotFoundException")<{
    readonly message?: string;
  }> {}
export class ImageAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ImageAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ImageArchivedException
  extends /*@__PURE__*/ TE.TaggedError("ImageArchivedException")<{
    readonly message?: string;
  }> {}
export class ImageDigestDoesNotMatchException
  extends /*@__PURE__*/ TE.TaggedError("ImageDigestDoesNotMatchException")<{
    readonly message?: string;
  }> {}
export class ImageNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ImageNotFoundException")<{
    readonly message?: string;
  }> {}
export class ImageStorageClassUpdateNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ImageStorageClassUpdateNotSupportedException",
  )<{ readonly message?: string }> {}
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
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagParameterException")<{
    readonly message?: string;
  }> {}
export class KmsException
  extends /*@__PURE__*/ TE.TaggedError("KmsException")<{
    readonly message?: string;
    readonly kmsError?: string;
  }> {}
export class LayerAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("LayerAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class LayerInaccessibleException
  extends /*@__PURE__*/ TE.TaggedError("LayerInaccessibleException")<{
    readonly message?: string;
  }> {}
export class LayerPartTooSmallException
  extends /*@__PURE__*/ TE.TaggedError("LayerPartTooSmallException")<{
    readonly message?: string;
  }> {}
export class LayersNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("LayersNotFoundException")<{
    readonly message?: string;
  }> {}
export class LifecyclePolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("LifecyclePolicyNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class LifecyclePolicyPreviewInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "LifecyclePolicyPreviewInProgressException",
  )<{ readonly message?: string }> {}
export class LifecyclePolicyPreviewNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "LifecyclePolicyPreviewNotFoundException",
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class PullThroughCacheRuleAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "PullThroughCacheRuleAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class PullThroughCacheRuleNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "PullThroughCacheRuleNotFoundException",
  )<{ readonly message?: string }> {}
export class ReferencedImagesNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ReferencedImagesNotFoundException")<{
    readonly message?: string;
  }> {}
export class RegistryPolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RegistryPolicyNotFoundException")<{
    readonly message?: string;
  }> {}
export class RepositoryAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryAlreadyExistsException", [
    "ConflictError",
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class RepositoryNotEmptyException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNotEmptyException", [
    "ConflictError",
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class RepositoryNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class RepositoryPolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryPolicyNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ScanNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ScanNotFoundException")<{
    readonly message?: string;
  }> {}
export class SecretNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("SecretNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServerException
  extends /*@__PURE__*/ TE.TaggedError("ServerException", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class SigningConfigurationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SigningConfigurationNotFoundException",
  )<{ readonly message?: string }> {}
export class TemplateAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("TemplateAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class TemplateNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("TemplateNotFoundException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException", [
    "QuotaError",
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class UnableToAccessSecretException
  extends /*@__PURE__*/ TE.TaggedError("UnableToAccessSecretException")<{
    readonly message?: string;
  }> {}
export class UnableToDecryptSecretValueException
  extends /*@__PURE__*/ TE.TaggedError("UnableToDecryptSecretValueException")<{
    readonly message?: string;
  }> {}
export class UnableToGetUpstreamImageException
  extends /*@__PURE__*/ TE.TaggedError("UnableToGetUpstreamImageException")<{
    readonly message?: string;
  }> {}
export class UnableToGetUpstreamLayerException
  extends /*@__PURE__*/ TE.TaggedError("UnableToGetUpstreamLayerException")<{
    readonly message?: string;
  }> {}
export class UnableToListUpstreamImageReferrersException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnableToListUpstreamImageReferrersException",
  )<{ readonly message?: string }> {}
export class UnsupportedImageTypeException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedImageTypeException")<{
    readonly message?: string;
  }> {}
export class UnsupportedUpstreamRegistryException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedUpstreamRegistryException")<{
    readonly message?: string;
  }> {}
export class UploadNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("UploadNotFoundException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type RegistryId = string;
export type RepositoryName = string;
export type BatchedOperationLayerDigest = string;
export type BatchedOperationLayerDigestList = string[];
export interface BatchCheckLayerAvailabilityRequest {
  registryId?: string;
  repositoryName: string;
  layerDigests: string[];
}
export type LayerDigest = string;
export type LayerAvailability =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "ARCHIVED"
  | (string & {});
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
  | "UpstreamAccessDenied"
  | "UpstreamTooManyRequests"
  | "UpstreamUnavailable"
  | "ImageInaccessible"
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
export type MediaTypeList = string[];
export interface BatchGetImageRequest {
  registryId?: string;
  repositoryName: string;
  imageIds: ImageIdentifier[];
  acceptedMediaTypes?: string[];
}
export type ImageManifest = string;
export interface Image {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageManifest?: string;
  imageManifestMediaType?: string;
}
export type ImageList = Image[];
export interface BatchGetImageResponse {
  images?: Image[];
  failures?: ImageFailure[];
}
export type ScanningConfigurationRepositoryNameList = string[];
export interface BatchGetRepositoryScanningConfigurationRequest {
  repositoryNames: string[];
}
export type Arn = string;
export type ScanOnPushFlag = boolean;
export type ScanFrequency =
  | "SCAN_ON_PUSH"
  | "CONTINUOUS_SCAN"
  | "MANUAL"
  | (string & {});
export type ScanningRepositoryFilterValue = string;
export type ScanningRepositoryFilterType = "WILDCARD" | (string & {});
export interface ScanningRepositoryFilter {
  filter: string;
  filterType: ScanningRepositoryFilterType;
}
export type ScanningRepositoryFilterList = ScanningRepositoryFilter[];
export interface RepositoryScanningConfiguration {
  repositoryArn?: string;
  repositoryName?: string;
  scanOnPush?: boolean;
  scanFrequency?: ScanFrequency;
  appliedScanFilters?: ScanningRepositoryFilter[];
}
export type RepositoryScanningConfigurationList =
  RepositoryScanningConfiguration[];
export type ScanningConfigurationFailureCode =
  | "REPOSITORY_NOT_FOUND"
  | (string & {});
export type ScanningConfigurationFailureReason = string;
export interface RepositoryScanningConfigurationFailure {
  repositoryName?: string;
  failureCode?: ScanningConfigurationFailureCode;
  failureReason?: string;
}
export type RepositoryScanningConfigurationFailureList =
  RepositoryScanningConfigurationFailure[];
export interface BatchGetRepositoryScanningConfigurationResponse {
  scanningConfigurations?: RepositoryScanningConfiguration[];
  failures?: RepositoryScanningConfigurationFailure[];
}
export type UploadId = string;
export type LayerDigestList = string[];
export interface CompleteLayerUploadRequest {
  registryId?: string;
  repositoryName: string;
  uploadId: string;
  layerDigests: string[];
}
export interface CompleteLayerUploadResponse {
  registryId?: string;
  repositoryName?: string;
  uploadId?: string;
  layerDigest?: string;
}
export type PullThroughCacheRuleRepositoryPrefix = string;
export type Url = string;
export type UpstreamRegistry =
  | "ecr"
  | "ecr-public"
  | "quay"
  | "k8s"
  | "docker-hub"
  | "github-container-registry"
  | "azure-container-registry"
  | "gitlab-container-registry"
  | "chainguard"
  | (string & {});
export type CredentialArn = string;
export type CustomRoleArn = string;
export interface CreatePullThroughCacheRuleRequest {
  ecrRepositoryPrefix: string;
  upstreamRegistryUrl: string;
  registryId?: string;
  upstreamRegistry?: UpstreamRegistry;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
}
export type CreationTimestamp = Date;
export interface CreatePullThroughCacheRuleResponse {
  ecrRepositoryPrefix?: string;
  upstreamRegistryUrl?: string;
  createdAt?: Date;
  registryId?: string;
  upstreamRegistry?: UpstreamRegistry;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type ImageTagMutability =
  | "MUTABLE"
  | "IMMUTABLE"
  | "IMMUTABLE_WITH_EXCLUSION"
  | "MUTABLE_WITH_EXCLUSION"
  | (string & {});
export type ImageTagMutabilityExclusionFilterType = "WILDCARD" | (string & {});
export type ImageTagMutabilityExclusionFilterValue = string;
export interface ImageTagMutabilityExclusionFilter {
  filterType: ImageTagMutabilityExclusionFilterType;
  filter: string;
}
export type ImageTagMutabilityExclusionFilters =
  ImageTagMutabilityExclusionFilter[];
export interface ImageScanningConfiguration {
  scanOnPush?: boolean;
}
export type EncryptionType = "AES256" | "KMS" | "KMS_DSSE" | (string & {});
export type KmsKey = string;
export interface EncryptionConfiguration {
  encryptionType: EncryptionType;
  kmsKey?: string;
}
export interface CreateRepositoryRequest {
  registryId?: string;
  repositoryName: string;
  tags?: Tag[];
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  imageScanningConfiguration?: ImageScanningConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface Repository {
  repositoryArn?: string;
  registryId?: string;
  repositoryName?: string;
  repositoryUri?: string;
  createdAt?: Date;
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  imageScanningConfiguration?: ImageScanningConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface CreateRepositoryResponse {
  repository?: Repository;
}
export type Prefix = string;
export type RepositoryTemplateDescription = string;
export type KmsKeyForRepositoryCreationTemplate = string;
export interface EncryptionConfigurationForRepositoryCreationTemplate {
  encryptionType: EncryptionType;
  kmsKey?: string;
}
export type RepositoryPolicyText = string;
export type LifecyclePolicyTextForRepositoryCreationTemplate = string;
export type RCTAppliedFor =
  | "REPLICATION"
  | "PULL_THROUGH_CACHE"
  | "CREATE_ON_PUSH"
  | (string & {});
export type RCTAppliedForList = RCTAppliedFor[];
export interface CreateRepositoryCreationTemplateRequest {
  prefix: string;
  description?: string;
  encryptionConfiguration?: EncryptionConfigurationForRepositoryCreationTemplate;
  resourceTags?: Tag[];
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  repositoryPolicy?: string;
  lifecyclePolicy?: string;
  appliedFor: RCTAppliedFor[];
  customRoleArn?: string;
}
export interface RepositoryCreationTemplate {
  prefix?: string;
  description?: string;
  encryptionConfiguration?: EncryptionConfigurationForRepositoryCreationTemplate;
  resourceTags?: Tag[];
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  repositoryPolicy?: string;
  lifecyclePolicy?: string;
  appliedFor?: RCTAppliedFor[];
  customRoleArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateRepositoryCreationTemplateResponse {
  registryId?: string;
  repositoryCreationTemplate?: RepositoryCreationTemplate;
}
export interface DeleteLifecyclePolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export type LifecyclePolicyText = string;
export type EvaluationTimestamp = Date;
export interface DeleteLifecyclePolicyResponse {
  registryId?: string;
  repositoryName?: string;
  lifecyclePolicyText?: string;
  lastEvaluatedAt?: Date;
}
export interface DeletePullThroughCacheRuleRequest {
  ecrRepositoryPrefix: string;
  registryId?: string;
}
export interface DeletePullThroughCacheRuleResponse {
  ecrRepositoryPrefix?: string;
  upstreamRegistryUrl?: string;
  createdAt?: Date;
  registryId?: string;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
}
export interface DeleteRegistryPolicyRequest {}
export type RegistryPolicyText = string;
export interface DeleteRegistryPolicyResponse {
  registryId?: string;
  policyText?: string;
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
export interface DeleteRepositoryCreationTemplateRequest {
  prefix: string;
}
export interface DeleteRepositoryCreationTemplateResponse {
  registryId?: string;
  repositoryCreationTemplate?: RepositoryCreationTemplate;
}
export interface DeleteRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export interface DeleteRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export interface DeleteSigningConfigurationRequest {}
export type SigningProfileArn = string;
export type SigningRepositoryFilterValue = string;
export type SigningRepositoryFilterType = "WILDCARD_MATCH" | (string & {});
export interface SigningRepositoryFilter {
  filter: string;
  filterType: SigningRepositoryFilterType;
}
export type SigningRepositoryFilterList = SigningRepositoryFilter[];
export interface SigningRule {
  signingProfileArn: string;
  repositoryFilters?: SigningRepositoryFilter[];
}
export type SigningRuleList = SigningRule[];
export interface SigningConfiguration {
  rules: SigningRule[];
}
export interface DeleteSigningConfigurationResponse {
  registryId?: string;
  signingConfiguration?: SigningConfiguration;
}
export type PrincipalArn = string;
export interface DeregisterPullTimeUpdateExclusionRequest {
  principalArn: string;
}
export interface DeregisterPullTimeUpdateExclusionResponse {
  principalArn?: string;
}
export interface DescribeImageReplicationStatusRequest {
  repositoryName: string;
  imageId: ImageIdentifier;
  registryId?: string;
}
export type Region = string;
export type ReplicationStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export type ReplicationError = string;
export interface ImageReplicationStatus {
  region?: string;
  registryId?: string;
  status?: ReplicationStatus;
  failureCode?: string;
}
export type ImageReplicationStatusList = ImageReplicationStatus[];
export interface DescribeImageReplicationStatusResponse {
  repositoryName?: string;
  imageId?: ImageIdentifier;
  replicationStatuses?: ImageReplicationStatus[];
}
export type NextToken = string;
export type MaxResults = number;
export type TagStatus = "TAGGED" | "UNTAGGED" | "ANY" | (string & {});
export type ImageStatusFilter =
  | "ACTIVE"
  | "ARCHIVED"
  | "ACTIVATING"
  | "ANY"
  | (string & {});
export interface DescribeImagesFilter {
  tagStatus?: TagStatus;
  imageStatus?: ImageStatusFilter;
}
export interface DescribeImagesRequest {
  registryId?: string;
  repositoryName: string;
  imageIds?: ImageIdentifier[];
  nextToken?: string;
  maxResults?: number;
  filter?: DescribeImagesFilter;
}
export type ImageTagList = string[];
export type ImageSizeInBytes = number;
export type PushTimestamp = Date;
export type ScanStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | "UNSUPPORTED_IMAGE"
  | "ACTIVE"
  | "PENDING"
  | "SCAN_ELIGIBILITY_EXPIRED"
  | "FINDINGS_UNAVAILABLE"
  | "LIMIT_EXCEEDED"
  | "IMAGE_ARCHIVED"
  | (string & {});
export type ScanStatusDescription = string;
export interface ImageScanStatus {
  status?: ScanStatus;
  description?: string;
}
export type ScanTimestamp = Date;
export type VulnerabilitySourceUpdateTimestamp = Date;
export type FindingSeverity =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | "UNDEFINED"
  | (string & {});
export type SeverityCount = number;
export type FindingSeverityCounts = { [key in FindingSeverity]?: number };
export interface ImageScanFindingsSummary {
  imageScanCompletedAt?: Date;
  vulnerabilitySourceUpdatedAt?: Date;
  findingSeverityCounts?: { [key: string]: number | undefined };
}
export type RecordedPullTimestamp = Date;
export type ImageStatus = "ACTIVE" | "ARCHIVED" | "ACTIVATING" | (string & {});
export type LastArchivedAtTimestamp = Date;
export type LastActivatedAtTimestamp = Date;
export interface ImageDetail {
  registryId?: string;
  repositoryName?: string;
  imageDigest?: string;
  imageTags?: string[];
  imageSizeInBytes?: number;
  imagePushedAt?: Date;
  imageScanStatus?: ImageScanStatus;
  imageScanFindingsSummary?: ImageScanFindingsSummary;
  imageManifestMediaType?: string;
  artifactMediaType?: string;
  lastRecordedPullTime?: Date;
  subjectManifestDigest?: string;
  imageStatus?: ImageStatus;
  lastArchivedAt?: Date;
  lastActivatedAt?: Date;
}
export type ImageDetailList = ImageDetail[];
export interface DescribeImagesResponse {
  imageDetails?: ImageDetail[];
  nextToken?: string;
}
export interface DescribeImageScanFindingsRequest {
  registryId?: string;
  repositoryName: string;
  imageId: ImageIdentifier;
  nextToken?: string;
  maxResults?: number;
}
export type FindingName = string;
export type FindingDescription = string;
export type AttributeKey = string;
export type AttributeValue = string;
export interface Attribute {
  key: string;
  value?: string;
}
export type AttributeList = Attribute[];
export interface ImageScanFinding {
  name?: string;
  description?: string;
  uri?: string;
  severity?: FindingSeverity;
  attributes?: Attribute[];
}
export type ImageScanFindingList = ImageScanFinding[];
export type FindingArn = string;
export type BaseScore = number;
export type ScoringVector = string;
export type Source = string;
export type Version = string;
export interface CvssScore {
  baseScore?: number;
  scoringVector?: string;
  source?: string;
  version?: string;
}
export type CvssScoreList = CvssScore[];
export type ReferenceUrlsList = string[];
export type RelatedVulnerability = string;
export type RelatedVulnerabilitiesList = string[];
export type Severity = string;
export type VulnerabilityId = string;
export type Arch = string;
export type Epoch = number;
export type FilePath = string;
export type VulnerablePackageName = string;
export type PackageManager = string;
export type Release = string;
export type SourceLayerHash = string;
export type FixedInVersion = string;
export interface VulnerablePackage {
  arch?: string;
  epoch?: number;
  filePath?: string;
  name?: string;
  packageManager?: string;
  release?: string;
  sourceLayerHash?: string;
  version?: string;
  fixedInVersion?: string;
}
export type VulnerablePackagesList = VulnerablePackage[];
export interface PackageVulnerabilityDetails {
  cvss?: CvssScore[];
  referenceUrls?: string[];
  relatedVulnerabilities?: string[];
  source?: string;
  sourceUrl?: string;
  vendorCreatedAt?: Date;
  vendorSeverity?: string;
  vendorUpdatedAt?: Date;
  vulnerabilityId?: string;
  vulnerablePackages?: VulnerablePackage[];
}
export type RecommendationText = string;
export interface Recommendation {
  url?: string;
  text?: string;
}
export interface Remediation {
  recommendation?: Recommendation;
}
export type Author = string;
export type ImageTagsList = string[];
export type Platform = string;
export type InUseCount = number;
export interface AwsEcrContainerImageDetails {
  architecture?: string;
  author?: string;
  imageHash?: string;
  imageTags?: string[];
  platform?: string;
  pushedAt?: Date;
  lastInUseAt?: Date;
  inUseCount?: number;
  registry?: string;
  repositoryName?: string;
}
export interface ResourceDetails {
  awsEcrContainerImage?: AwsEcrContainerImageDetails;
}
export type ResourceId = string;
export type Tags = { [key: string]: string | undefined };
export type Type = string;
export interface Resource {
  details?: ResourceDetails;
  id?: string;
  tags?: { [key: string]: string | undefined };
  type?: string;
}
export type ResourceList = Resource[];
export type Score = number;
export type Metric = string;
export type Reason = string;
export interface CvssScoreAdjustment {
  metric?: string;
  reason?: string;
}
export type CvssScoreAdjustmentList = CvssScoreAdjustment[];
export interface CvssScoreDetails {
  adjustments?: CvssScoreAdjustment[];
  score?: number;
  scoreSource?: string;
  scoringVector?: string;
  version?: string;
}
export interface ScoreDetails {
  cvss?: CvssScoreDetails;
}
export type Status = string;
export type Title = string;
export type FixAvailable = string;
export type ExploitAvailable = string;
export interface EnhancedImageScanFinding {
  awsAccountId?: string;
  description?: string;
  findingArn?: string;
  firstObservedAt?: Date;
  lastObservedAt?: Date;
  packageVulnerabilityDetails?: PackageVulnerabilityDetails;
  remediation?: Remediation;
  resources?: Resource[];
  score?: number;
  scoreDetails?: ScoreDetails;
  severity?: string;
  status?: string;
  title?: string;
  type?: string;
  updatedAt?: Date;
  fixAvailable?: string;
  exploitAvailable?: string;
}
export type EnhancedImageScanFindingList = EnhancedImageScanFinding[];
export interface ImageScanFindings {
  imageScanCompletedAt?: Date;
  vulnerabilitySourceUpdatedAt?: Date;
  findingSeverityCounts?: { [key: string]: number | undefined };
  findings?: ImageScanFinding[];
  enhancedFindings?: EnhancedImageScanFinding[];
}
export interface DescribeImageScanFindingsResponse {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageScanStatus?: ImageScanStatus;
  imageScanFindings?: ImageScanFindings;
  nextToken?: string;
}
export interface DescribeImageSigningStatusRequest {
  repositoryName: string;
  imageId: ImageIdentifier;
  registryId?: string;
}
export type SigningStatusFailureCode = string;
export type SigningStatusFailureReason = string;
export type SigningStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export interface ImageSigningStatus {
  signingProfileArn?: string;
  failureCode?: string;
  failureReason?: string;
  status?: SigningStatus;
}
export type ImageSigningStatusList = ImageSigningStatus[];
export interface DescribeImageSigningStatusResponse {
  repositoryName?: string;
  imageId?: ImageIdentifier;
  registryId?: string;
  signingStatuses?: ImageSigningStatus[];
}
export type PullThroughCacheRuleRepositoryPrefixList = string[];
export interface DescribePullThroughCacheRulesRequest {
  registryId?: string;
  ecrRepositoryPrefixes?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type UpdatedTimestamp = Date;
export interface PullThroughCacheRule {
  ecrRepositoryPrefix?: string;
  upstreamRegistryUrl?: string;
  createdAt?: Date;
  registryId?: string;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
  upstreamRegistry?: UpstreamRegistry;
  updatedAt?: Date;
}
export type PullThroughCacheRuleList = PullThroughCacheRule[];
export interface DescribePullThroughCacheRulesResponse {
  pullThroughCacheRules?: PullThroughCacheRule[];
  nextToken?: string;
}
export interface DescribeRegistryRequest {}
export interface ReplicationDestination {
  region: string;
  registryId: string;
}
export type ReplicationDestinationList = ReplicationDestination[];
export type RepositoryFilterValue = string;
export type RepositoryFilterType = "PREFIX_MATCH" | (string & {});
export interface RepositoryFilter {
  filter: string;
  filterType: RepositoryFilterType;
}
export type RepositoryFilterList = RepositoryFilter[];
export interface ReplicationRule {
  destinations: ReplicationDestination[];
  repositoryFilters?: RepositoryFilter[];
}
export type ReplicationRuleList = ReplicationRule[];
export interface ReplicationConfiguration {
  rules: ReplicationRule[];
}
export interface DescribeRegistryResponse {
  registryId?: string;
  replicationConfiguration?: ReplicationConfiguration;
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
export type PrefixList = string[];
export interface DescribeRepositoryCreationTemplatesRequest {
  prefixes?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type RepositoryCreationTemplateList = RepositoryCreationTemplate[];
export interface DescribeRepositoryCreationTemplatesResponse {
  registryId?: string;
  repositoryCreationTemplates?: RepositoryCreationTemplate[];
  nextToken?: string;
}
export type AccountSettingName = string;
export interface GetAccountSettingRequest {
  name: string;
}
export interface GetAccountSettingResponse {
  name?: string;
  value?: string;
}
export type GetAuthorizationTokenRegistryIdList = string[];
export interface GetAuthorizationTokenRequest {
  registryIds?: string[];
}
export type Base64 = string;
export type ExpirationTimestamp = Date;
export type ProxyEndpoint = string;
export interface AuthorizationData {
  authorizationToken?: string | redacted.Redacted<string>;
  expiresAt?: Date;
  proxyEndpoint?: string;
}
export type AuthorizationDataList = AuthorizationData[];
export interface GetAuthorizationTokenResponse {
  authorizationData?: AuthorizationData[];
}
export interface GetDownloadUrlForLayerRequest {
  registryId?: string;
  repositoryName: string;
  layerDigest: string;
}
export interface GetDownloadUrlForLayerResponse {
  downloadUrl?: string;
  layerDigest?: string;
}
export interface GetLifecyclePolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export interface GetLifecyclePolicyResponse {
  registryId?: string;
  repositoryName?: string;
  lifecyclePolicyText?: string;
  lastEvaluatedAt?: Date;
}
export type LifecyclePreviewMaxResults = number;
export interface LifecyclePolicyPreviewFilter {
  tagStatus?: TagStatus;
}
export interface GetLifecyclePolicyPreviewRequest {
  registryId?: string;
  repositoryName: string;
  imageIds?: ImageIdentifier[];
  nextToken?: string;
  maxResults?: number;
  filter?: LifecyclePolicyPreviewFilter;
}
export type LifecyclePolicyPreviewStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "EXPIRED"
  | "FAILED"
  | (string & {});
export type ImageActionType = "EXPIRE" | "TRANSITION" | (string & {});
export type LifecyclePolicyTargetStorageClass = "ARCHIVE" | (string & {});
export interface LifecyclePolicyRuleAction {
  type?: ImageActionType;
  targetStorageClass?: LifecyclePolicyTargetStorageClass;
}
export type LifecyclePolicyRulePriority = number;
export type LifecyclePolicyStorageClass =
  | "ARCHIVE"
  | "STANDARD"
  | (string & {});
export interface LifecyclePolicyPreviewResult {
  imageTags?: string[];
  imageDigest?: string;
  imagePushedAt?: Date;
  action?: LifecyclePolicyRuleAction;
  appliedRulePriority?: number;
  storageClass?: LifecyclePolicyStorageClass;
}
export type LifecyclePolicyPreviewResultList = LifecyclePolicyPreviewResult[];
export type ImageCount = number;
export interface TransitioningImageTotalCount {
  targetStorageClass?: LifecyclePolicyTargetStorageClass;
  imageTotalCount?: number;
}
export type TransitioningImageTotalCounts = TransitioningImageTotalCount[];
export interface LifecyclePolicyPreviewSummary {
  expiringImageTotalCount?: number;
  transitioningImageTotalCounts?: TransitioningImageTotalCount[];
}
export interface GetLifecyclePolicyPreviewResponse {
  registryId?: string;
  repositoryName?: string;
  lifecyclePolicyText?: string;
  status?: LifecyclePolicyPreviewStatus;
  nextToken?: string;
  previewResults?: LifecyclePolicyPreviewResult[];
  summary?: LifecyclePolicyPreviewSummary;
}
export interface GetRegistryPolicyRequest {}
export interface GetRegistryPolicyResponse {
  registryId?: string;
  policyText?: string;
}
export interface GetRegistryScanningConfigurationRequest {}
export type ScanType = "BASIC" | "ENHANCED" | (string & {});
export interface RegistryScanningRule {
  scanFrequency: ScanFrequency;
  repositoryFilters: ScanningRepositoryFilter[];
}
export type RegistryScanningRuleList = RegistryScanningRule[];
export interface RegistryScanningConfiguration {
  scanType?: ScanType;
  rules?: RegistryScanningRule[];
}
export interface GetRegistryScanningConfigurationResponse {
  registryId?: string;
  scanningConfiguration?: RegistryScanningConfiguration;
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
export interface GetSigningConfigurationRequest {}
export interface GetSigningConfigurationResponse {
  registryId?: string;
  signingConfiguration?: SigningConfiguration;
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
export interface SubjectIdentifier {
  imageDigest: string;
}
export type ArtifactType = string;
export type ArtifactTypeList = string[];
export type ArtifactStatusFilter =
  | "ACTIVE"
  | "ARCHIVED"
  | "ACTIVATING"
  | "ANY"
  | (string & {});
export interface ListImageReferrersFilter {
  artifactTypes?: string[];
  artifactStatus?: ArtifactStatusFilter;
}
export type FiftyMaxResults = number;
export interface ListImageReferrersRequest {
  registryId?: string;
  repositoryName: string;
  subjectId: SubjectIdentifier;
  filter?: ListImageReferrersFilter;
  nextToken?: string;
  maxResults?: number;
}
export type Annotations = { [key: string]: string | undefined };
export type ArtifactStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "ACTIVATING"
  | (string & {});
export interface ImageReferrer {
  digest: string;
  mediaType: string;
  artifactType?: string;
  size: number;
  annotations?: { [key: string]: string | undefined };
  artifactStatus?: ArtifactStatus;
}
export type ImageReferrerList = ImageReferrer[];
export interface ListImageReferrersResponse {
  referrers?: ImageReferrer[];
  nextToken?: string;
}
export interface ListImagesFilter {
  tagStatus?: TagStatus;
  imageStatus?: ImageStatusFilter;
}
export interface ListImagesRequest {
  registryId?: string;
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
  filter?: ListImagesFilter;
}
export interface ListImagesResponse {
  imageIds?: ImageIdentifier[];
  nextToken?: string;
}
export interface ListPullTimeUpdateExclusionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type PullTimeUpdateExclusionList = string[];
export interface ListPullTimeUpdateExclusionsResponse {
  pullTimeUpdateExclusions?: string[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type AccountSettingValue = string;
export interface PutAccountSettingRequest {
  name: string;
  value: string;
}
export interface PutAccountSettingResponse {
  name?: string;
  value?: string;
}
export interface PutImageRequest {
  registryId?: string;
  repositoryName: string;
  imageManifest: string;
  imageManifestMediaType?: string;
  imageTag?: string;
  imageDigest?: string;
}
export interface PutImageResponse {
  image?: Image;
}
export interface PutImageScanningConfigurationRequest {
  registryId?: string;
  repositoryName: string;
  imageScanningConfiguration: ImageScanningConfiguration;
}
export interface PutImageScanningConfigurationResponse {
  registryId?: string;
  repositoryName?: string;
  imageScanningConfiguration?: ImageScanningConfiguration;
}
export interface PutImageTagMutabilityRequest {
  registryId?: string;
  repositoryName: string;
  imageTagMutability: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
}
export interface PutImageTagMutabilityResponse {
  registryId?: string;
  repositoryName?: string;
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
}
export interface PutLifecyclePolicyRequest {
  registryId?: string;
  repositoryName: string;
  lifecyclePolicyText: string;
}
export interface PutLifecyclePolicyResponse {
  registryId?: string;
  repositoryName?: string;
  lifecyclePolicyText?: string;
}
export interface PutRegistryPolicyRequest {
  policyText: string;
}
export interface PutRegistryPolicyResponse {
  registryId?: string;
  policyText?: string;
}
export interface PutRegistryScanningConfigurationRequest {
  scanType?: ScanType;
  rules?: RegistryScanningRule[];
}
export interface PutRegistryScanningConfigurationResponse {
  registryScanningConfiguration?: RegistryScanningConfiguration;
}
export interface PutReplicationConfigurationRequest {
  replicationConfiguration: ReplicationConfiguration;
}
export interface PutReplicationConfigurationResponse {
  replicationConfiguration?: ReplicationConfiguration;
}
export interface PutSigningConfigurationRequest {
  signingConfiguration: SigningConfiguration;
}
export interface PutSigningConfigurationResponse {
  signingConfiguration?: SigningConfiguration;
}
export interface RegisterPullTimeUpdateExclusionRequest {
  principalArn: string;
}
export interface RegisterPullTimeUpdateExclusionResponse {
  principalArn?: string;
  createdAt?: Date;
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
export interface StartImageScanRequest {
  registryId?: string;
  repositoryName: string;
  imageId: ImageIdentifier;
}
export interface StartImageScanResponse {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageScanStatus?: ImageScanStatus;
}
export interface StartLifecyclePolicyPreviewRequest {
  registryId?: string;
  repositoryName: string;
  lifecyclePolicyText?: string;
}
export interface StartLifecyclePolicyPreviewResponse {
  registryId?: string;
  repositoryName?: string;
  lifecyclePolicyText?: string;
  status?: LifecyclePolicyPreviewStatus;
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
export type TargetStorageClass = "STANDARD" | "ARCHIVE" | (string & {});
export interface UpdateImageStorageClassRequest {
  registryId?: string;
  repositoryName: string;
  imageId: ImageIdentifier;
  targetStorageClass: TargetStorageClass;
}
export interface UpdateImageStorageClassResponse {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageStatus?: ImageStatus;
}
export interface UpdatePullThroughCacheRuleRequest {
  registryId?: string;
  ecrRepositoryPrefix: string;
  credentialArn?: string;
  customRoleArn?: string;
}
export interface UpdatePullThroughCacheRuleResponse {
  ecrRepositoryPrefix?: string;
  registryId?: string;
  updatedAt?: Date;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
}
export interface UpdateRepositoryCreationTemplateRequest {
  prefix: string;
  description?: string;
  encryptionConfiguration?: EncryptionConfigurationForRepositoryCreationTemplate;
  resourceTags?: Tag[];
  imageTagMutability?: ImageTagMutability;
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  repositoryPolicy?: string;
  lifecyclePolicy?: string;
  appliedFor?: RCTAppliedFor[];
  customRoleArn?: string;
}
export interface UpdateRepositoryCreationTemplateResponse {
  registryId?: string;
  repositoryCreationTemplate?: RepositoryCreationTemplate;
}
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
export interface ValidatePullThroughCacheRuleRequest {
  ecrRepositoryPrefix: string;
  registryId?: string;
}
export type IsPTCRuleValid = boolean;
export type PTCValidateFailure = string;
export interface ValidatePullThroughCacheRuleResponse {
  ecrRepositoryPrefix?: string;
  registryId?: string;
  upstreamRegistryUrl?: string;
  credentialArn?: string;
  customRoleArn?: string;
  upstreamRepositoryPrefix?: string;
  isValid?: boolean;
  failure?: string;
}
export type ExceptionMessage = string;
export type KmsError = string;
export type BatchCheckLayerAvailabilityError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Checks the availability of one or more image layers in a repository.
 *
 * When an image is pushed to a repository, each image layer is checked to verify if it
 * has been uploaded before. If it has been uploaded, then the image layer is
 * skipped.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
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
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCheckLayerAvailability",
})) as any;

export type BatchDeleteImageError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a list of specified images within a repository. Images are specified with
 * either an `imageTag` or `imageDigest`.
 *
 * You can remove a tag from an image by specifying the image's tag in your request. When
 * you remove the last tag from an image, the image is deleted from your repository.
 *
 * You can completely delete an image (and all of its tags) by specifying the image's
 * digest in your request.
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImage",
})) as any;

export type BatchGetImageError =
  | InvalidParameterException
  | LimitExceededException
  | RepositoryNotFoundException
  | ServerException
  | UnableToGetUpstreamImageException
  | CommonErrors;
/**
 * Gets detailed information for an image. Images are specified with either an
 * `imageTag` or `imageDigest`.
 *
 * When an image is pulled, the BatchGetImage API is called once to retrieve the image
 * manifest.
 */
export const batchGetImage: API.OperationMethod<
  BatchGetImageRequest,
  BatchGetImageResponse,
  BatchGetImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageIds: D.list(i_ImageIdentifier),
      acceptedMediaTypes: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    RepositoryNotFoundException,
    ServerException,
    UnableToGetUpstreamImageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetImage",
})) as any;

export type BatchGetRepositoryScanningConfigurationError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the scanning configuration for one or more repositories.
 */
export const batchGetRepositoryScanningConfiguration: API.OperationMethod<
  BatchGetRepositoryScanningConfigurationRequest,
  BatchGetRepositoryScanningConfigurationResponse,
  BatchGetRepositoryScanningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryNames: 0 } },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRepositoryScanningConfiguration",
})) as any;

export type CompleteLayerUploadError =
  | EmptyUploadException
  | InvalidLayerException
  | InvalidParameterException
  | KmsException
  | LayerAlreadyExistsException
  | LayerPartTooSmallException
  | RepositoryNotFoundException
  | ServerException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Informs Amazon ECR that the image layer upload has completed for a specified registry,
 * repository name, and upload ID. You can optionally provide a `sha256` digest
 * of the image layer for data validation purposes.
 *
 * When an image is pushed, the CompleteLayerUpload API is called once per each new image
 * layer to verify that the upload has completed.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
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
    KmsException,
    LayerAlreadyExistsException,
    LayerPartTooSmallException,
    RepositoryNotFoundException,
    ServerException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteLayerUpload",
})) as any;

export type CreatePullThroughCacheRuleError =
  | InvalidParameterException
  | LimitExceededException
  | PullThroughCacheRuleAlreadyExistsException
  | SecretNotFoundException
  | ServerException
  | UnableToAccessSecretException
  | UnableToDecryptSecretValueException
  | UnsupportedUpstreamRegistryException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pull through cache rule. A pull through cache rule provides a way to cache
 * images from an upstream registry source in your Amazon ECR private registry. For more
 * information, see Using pull through cache
 * rules in the *Amazon Elastic Container Registry User Guide*.
 */
export const createPullThroughCacheRule: API.OperationMethod<
  CreatePullThroughCacheRuleRequest,
  CreatePullThroughCacheRuleResponse,
  CreatePullThroughCacheRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ecrRepositoryPrefix: 0,
      upstreamRegistryUrl: 0,
      registryId: 0,
      upstreamRegistry: 0,
      credentialArn: 0,
      customRoleArn: 0,
      upstreamRepositoryPrefix: 0,
    },
    output: { createdAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    PullThroughCacheRuleAlreadyExistsException,
    SecretNotFoundException,
    ServerException,
    UnableToAccessSecretException,
    UnableToDecryptSecretValueException,
    UnsupportedUpstreamRegistryException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePullThroughCacheRule",
})) as any;

export type CreateRepositoryError =
  | InvalidParameterException
  | InvalidTagParameterException
  | KmsException
  | LimitExceededException
  | RepositoryAlreadyExistsException
  | ServerException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a repository. For more information, see Amazon ECR repositories in the
 * *Amazon Elastic Container Registry User Guide*.
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
      registryId: 0,
      repositoryName: 0,
      tags: D.list(i_Tag),
      imageTagMutability: 0,
      imageTagMutabilityExclusionFilters: D.list(
        i_ImageTagMutabilityExclusionFilter,
      ),
      imageScanningConfiguration: i_ImageScanningConfiguration,
      encryptionConfiguration: { encryptionType: 0, kmsKey: 0 },
    },
    output: { repository: o_Repository },
  },
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    KmsException,
    LimitExceededException,
    RepositoryAlreadyExistsException,
    ServerException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
})) as any;

export type CreateRepositoryCreationTemplateError =
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | TemplateAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a repository creation template. This template is used to define the settings
 * for repositories created by Amazon ECR on your behalf. For example, repositories created
 * through pull through cache actions. For more information, see Private
 * repository creation templates in the
 * *Amazon Elastic Container Registry User Guide*.
 */
export const createRepositoryCreationTemplate: API.OperationMethod<
  CreateRepositoryCreationTemplateRequest,
  CreateRepositoryCreationTemplateResponse,
  CreateRepositoryCreationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      prefix: 0,
      description: 0,
      encryptionConfiguration:
        i_EncryptionConfigurationForRepositoryCreationTemplate,
      resourceTags: D.list(i_Tag),
      imageTagMutability: 0,
      imageTagMutabilityExclusionFilters: D.list(
        i_ImageTagMutabilityExclusionFilter,
      ),
      repositoryPolicy: 0,
      lifecyclePolicy: 0,
      appliedFor: 0,
      customRoleArn: 0,
    },
    output: { repositoryCreationTemplate: o_RepositoryCreationTemplate },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    TemplateAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepositoryCreationTemplate",
})) as any;

export type DeleteLifecyclePolicyError =
  | InvalidParameterException
  | LifecyclePolicyNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the lifecycle policy associated with the specified repository.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0 },
    output: { lastEvaluatedAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    LifecyclePolicyNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
})) as any;

export type DeletePullThroughCacheRuleError =
  | InvalidParameterException
  | PullThroughCacheRuleNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a pull through cache rule.
 */
export const deletePullThroughCacheRule: API.OperationMethod<
  DeletePullThroughCacheRuleRequest,
  DeletePullThroughCacheRuleResponse,
  DeletePullThroughCacheRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ecrRepositoryPrefix: 0, registryId: 0 },
    output: { createdAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    PullThroughCacheRuleNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePullThroughCacheRule",
})) as any;

export type DeleteRegistryPolicyError =
  | InvalidParameterException
  | RegistryPolicyNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the registry permissions policy.
 */
export const deleteRegistryPolicy: API.OperationMethod<
  DeleteRegistryPolicyRequest,
  DeleteRegistryPolicyResponse,
  DeleteRegistryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidParameterException,
    RegistryPolicyNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistryPolicy",
})) as any;

export type DeleteRepositoryError =
  | InvalidParameterException
  | KmsException
  | RepositoryNotEmptyException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a repository. If the repository isn't empty, you must either delete the
 * contents of the repository or use the `force` option to delete the repository
 * and have Amazon ECR delete all of its contents on your behalf.
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
    KmsException,
    RepositoryNotEmptyException,
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
})) as any;

export type DeleteRepositoryCreationTemplateError =
  | InvalidParameterException
  | ServerException
  | TemplateNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a repository creation template.
 */
export const deleteRepositoryCreationTemplate: API.OperationMethod<
  DeleteRepositoryCreationTemplateRequest,
  DeleteRepositoryCreationTemplateResponse,
  DeleteRepositoryCreationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { prefix: 0 },
    output: { repositoryCreationTemplate: o_RepositoryCreationTemplate },
  },
  errors: [
    InvalidParameterException,
    ServerException,
    TemplateNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryCreationTemplate",
})) as any;

export type DeleteRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes the repository policy associated with the specified repository.
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryPolicy",
})) as any;

export type DeleteSigningConfigurationError =
  | ServerException
  | SigningConfigurationNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the registry's signing configuration. Images pushed after deletion of the signing
 * configuration will no longer be automatically signed.
 *
 * For more information, see Managed signing in the
 * *Amazon Elastic Container Registry User Guide*.
 *
 * Deleting the signing configuration does not affect existing image signatures.
 */
export const deleteSigningConfiguration: API.OperationMethod<
  DeleteSigningConfigurationRequest,
  DeleteSigningConfigurationResponse,
  DeleteSigningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    ServerException,
    SigningConfigurationNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSigningConfiguration",
})) as any;

export type DeregisterPullTimeUpdateExclusionError =
  | ExclusionNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Removes a principal from the pull time update exclusion list for a registry. Once removed, Amazon ECR will resume updating the pull time if the specified principal pulls an image.
 */
export const deregisterPullTimeUpdateExclusion: API.OperationMethod<
  DeregisterPullTimeUpdateExclusionRequest,
  DeregisterPullTimeUpdateExclusionResponse,
  DeregisterPullTimeUpdateExclusionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { principalArn: 0 } },
  errors: [
    ExclusionNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterPullTimeUpdateExclusion",
})) as any;

export type DescribeImageReplicationStatusError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the replication status for a specified image.
 */
export const describeImageReplicationStatus: API.OperationMethod<
  DescribeImageReplicationStatusRequest,
  DescribeImageReplicationStatusResponse,
  DescribeImageReplicationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, imageId: i_ImageIdentifier, registryId: 0 },
  },
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageReplicationStatus",
})) as any;

export type DescribeImagesError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns metadata about the images in a repository.
 *
 * Starting with Docker version 1.9, the Docker client compresses image layers before
 * pushing them to a V2 Docker registry. The output of the `docker images`
 * command shows the uncompressed image size. Therefore, Docker might return a larger
 * image than the image shown in the Amazon Web Services Management Console.
 *
 * The new version of Amazon ECR
 * *Basic Scanning* doesn't use the ImageDetail$imageScanFindingsSummary and ImageDetail$imageScanStatus attributes from the API response to
 * return scan results. Use the DescribeImageScanFindings API
 * instead. For more information about Amazon Web Services native basic scanning, see Scan
 * images for software vulnerabilities in Amazon ECR.
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
      filter: { tagStatus: 0, imageStatus: 0 },
    },
    output: {
      imageDetails: D.list({
        imagePushedAt: D.ts,
        imageScanFindingsSummary: {
          imageScanCompletedAt: D.ts,
          vulnerabilitySourceUpdatedAt: D.ts,
        },
        lastRecordedPullTime: D.ts,
        lastArchivedAt: D.ts,
        lastActivatedAt: D.ts,
      }),
    },
  },
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
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

export type DescribeImageScanFindingsError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ScanNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the scan findings for the specified image.
 */
export const describeImageScanFindings: API.PaginatedOperationMethod<
  DescribeImageScanFindingsRequest,
  DescribeImageScanFindingsResponse,
  DescribeImageScanFindingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageId: i_ImageIdentifier,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      imageScanFindings: {
        imageScanCompletedAt: D.ts,
        vulnerabilitySourceUpdatedAt: D.ts,
        enhancedFindings: D.list({
          firstObservedAt: D.ts,
          lastObservedAt: D.ts,
          packageVulnerabilityDetails: {
            vendorCreatedAt: D.ts,
            vendorUpdatedAt: D.ts,
          },
          resources: D.list({
            details: {
              awsEcrContainerImage: { pushedAt: D.ts, lastInUseAt: D.ts },
            },
          }),
          updatedAt: D.ts,
        }),
      },
    },
  },
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ScanNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageScanFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeImageSigningStatusError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the signing status for a specified image. If the image matched
 * signing rules that reference different signing profiles, a status is returned
 * for each profile.
 *
 * For more information, see Managed signing in the
 * *Amazon Elastic Container Registry User Guide*.
 */
export const describeImageSigningStatus: API.OperationMethod<
  DescribeImageSigningStatusRequest,
  DescribeImageSigningStatusResponse,
  DescribeImageSigningStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, imageId: i_ImageIdentifier, registryId: 0 },
  },
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageSigningStatus",
})) as any;

export type DescribePullThroughCacheRulesError =
  | InvalidParameterException
  | PullThroughCacheRuleNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the pull through cache rules for a registry.
 */
export const describePullThroughCacheRules: API.PaginatedOperationMethod<
  DescribePullThroughCacheRulesRequest,
  DescribePullThroughCacheRulesResponse,
  DescribePullThroughCacheRulesError,
  Credentials | HttpClient.HttpClient,
  PullThroughCacheRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      ecrRepositoryPrefixes: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      pullThroughCacheRules: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    InvalidParameterException,
    PullThroughCacheRuleNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePullThroughCacheRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pullThroughCacheRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRegistryError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the settings for a registry. The replication configuration for a repository
 * can be created or updated with the PutReplicationConfiguration API
 * action.
 */
export const describeRegistry: API.OperationMethod<
  DescribeRegistryRequest,
  DescribeRegistryResponse,
  DescribeRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistry",
})) as any;

export type DescribeRepositoriesError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes image repositories in a registry.
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

export type DescribeRepositoryCreationTemplatesError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about the repository creation templates in a registry. The
 * `prefixes` request parameter can be used to return the details for a
 * specific repository creation template.
 */
export const describeRepositoryCreationTemplates: API.PaginatedOperationMethod<
  DescribeRepositoryCreationTemplatesRequest,
  DescribeRepositoryCreationTemplatesResponse,
  DescribeRepositoryCreationTemplatesError,
  Credentials | HttpClient.HttpClient,
  RepositoryCreationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { prefixes: 0, nextToken: 0, maxResults: 0 },
    output: {
      repositoryCreationTemplates: D.list(o_RepositoryCreationTemplate),
    },
  },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRepositoryCreationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositoryCreationTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAccountSettingError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the account setting value for the specified setting name.
 */
export const getAccountSetting: API.OperationMethod<
  GetAccountSettingRequest,
  GetAccountSettingResponse,
  GetAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSetting",
})) as any;

export type GetAuthorizationTokenError =
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Retrieves an authorization token. An authorization token represents your IAM
 * authentication credentials and can be used to access any Amazon ECR registry that your IAM
 * principal has access to. The authorization token is valid for 12 hours.
 *
 * The `authorizationToken` returned is a base64 encoded string that can be
 * decoded and used in a `docker login` command to authenticate to a registry.
 * The CLI offers an `get-login-password` command that simplifies the login
 * process. For more information, see Registry
 * authentication in the *Amazon Elastic Container Registry User Guide*.
 */
export const getAuthorizationToken: API.OperationMethod<
  GetAuthorizationTokenRequest,
  GetAuthorizationTokenResponse,
  GetAuthorizationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryIds: 0 },
    output: {
      authorizationData: D.list({
        authorizationToken: D.secret,
        expiresAt: D.ts,
      }),
    },
  },
  errors: [InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizationToken",
})) as any;

export type GetDownloadUrlForLayerError =
  | InvalidParameterException
  | LayerInaccessibleException
  | LayersNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnableToGetUpstreamLayerException
  | CommonErrors;
/**
 * Retrieves the pre-signed Amazon S3 download URL corresponding to an image layer. You can
 * only get URLs for image layers that are referenced in an image.
 *
 * When an image is pulled, the GetDownloadUrlForLayer API is called once per image layer
 * that is not already cached.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const getDownloadUrlForLayer: API.OperationMethod<
  GetDownloadUrlForLayerRequest,
  GetDownloadUrlForLayerResponse,
  GetDownloadUrlForLayerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, layerDigest: 0 },
  },
  errors: [
    InvalidParameterException,
    LayerInaccessibleException,
    LayersNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnableToGetUpstreamLayerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDownloadUrlForLayer",
})) as any;

export type GetLifecyclePolicyError =
  | InvalidParameterException
  | LifecyclePolicyNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the lifecycle policy for the specified repository.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0 },
    output: { lastEvaluatedAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    LifecyclePolicyNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
})) as any;

export type GetLifecyclePolicyPreviewError =
  | InvalidParameterException
  | LifecyclePolicyPreviewNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the results of the lifecycle policy preview request for the specified
 * repository.
 */
export const getLifecyclePolicyPreview: API.PaginatedOperationMethod<
  GetLifecyclePolicyPreviewRequest,
  GetLifecyclePolicyPreviewResponse,
  GetLifecyclePolicyPreviewError,
  Credentials | HttpClient.HttpClient,
  LifecyclePolicyPreviewResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageIds: D.list(i_ImageIdentifier),
      nextToken: 0,
      maxResults: 0,
      filter: { tagStatus: 0 },
    },
    output: { previewResults: D.list({ imagePushedAt: D.ts }) },
  },
  errors: [
    InvalidParameterException,
    LifecyclePolicyPreviewNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicyPreview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "previewResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetRegistryPolicyError =
  | InvalidParameterException
  | RegistryPolicyNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the permissions policy for a registry.
 */
export const getRegistryPolicy: API.OperationMethod<
  GetRegistryPolicyRequest,
  GetRegistryPolicyResponse,
  GetRegistryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidParameterException,
    RegistryPolicyNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryPolicy",
})) as any;

export type GetRegistryScanningConfigurationError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the scanning configuration for a registry.
 */
export const getRegistryScanningConfiguration: API.OperationMethod<
  GetRegistryScanningConfigurationRequest,
  GetRegistryScanningConfigurationResponse,
  GetRegistryScanningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryScanningConfiguration",
})) as any;

export type GetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryPolicy",
})) as any;

export type GetSigningConfigurationError =
  | InvalidParameterException
  | ServerException
  | SigningConfigurationNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the registry's signing configuration, which defines
 * rules for automatically signing images using Amazon Web Services Signer.
 *
 * For more information, see Managed signing in the
 * *Amazon Elastic Container Registry User Guide*.
 */
export const getSigningConfiguration: API.OperationMethod<
  GetSigningConfigurationRequest,
  GetSigningConfigurationResponse,
  GetSigningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidParameterException,
    ServerException,
    SigningConfigurationNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningConfiguration",
})) as any;

export type InitiateLayerUploadError =
  | InvalidParameterException
  | KmsException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Notifies Amazon ECR that you intend to upload an image layer.
 *
 * When an image is pushed, the InitiateLayerUpload API is called once per image layer
 * that has not already been uploaded. Whether or not an image layer has been uploaded is
 * determined by the BatchCheckLayerAvailability API action.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
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
    KmsException,
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateLayerUpload",
})) as any;

export type ListImageReferrersError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnableToListUpstreamImageReferrersException
  | ValidationException
  | CommonErrors;
/**
 * Lists the artifacts associated with a specified subject image.
 *
 * The IAM principal invoking this operation must have the `ecr:BatchGetImage` permission.
 */
export const listImageReferrers: API.OperationMethod<
  ListImageReferrersRequest,
  ListImageReferrersResponse,
  ListImageReferrersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      subjectId: { imageDigest: 0 },
      filter: { artifactTypes: 0, artifactStatus: 0 },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnableToListUpstreamImageReferrersException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageReferrers",
})) as any;

export type ListImagesError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists all the image IDs for the specified repository.
 *
 * You can filter images based on whether or not they are tagged by using the
 * `tagStatus` filter and specifying either `TAGGED`,
 * `UNTAGGED` or `ANY`. For example, you can filter your results
 * to return only `UNTAGGED` images and then pipe that result to a BatchDeleteImage operation to delete them. Or, you can filter your
 * results to return only `TAGGED` images to list all of the tags in your
 * repository.
 */
export const listImages: API.PaginatedOperationMethod<
  ListImagesRequest,
  ListImagesResponse,
  ListImagesError,
  Credentials | HttpClient.HttpClient,
  ImageIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      nextToken: 0,
      maxResults: 0,
      filter: { tagStatus: 0, imageStatus: 0 },
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPullTimeUpdateExclusionsError =
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the IAM principals that are excluded from having their image pull times recorded.
 */
export const listPullTimeUpdateExclusions: API.OperationMethod<
  ListPullTimeUpdateExclusionsRequest,
  ListPullTimeUpdateExclusionsResponse,
  ListPullTimeUpdateExclusionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { maxResults: 0, nextToken: 0 } },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPullTimeUpdateExclusions",
})) as any;

export type ListTagsForResourceError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * List the tags for an Amazon ECR resource.
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutAccountSettingError =
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to change the basic scan type version or registry policy scope.
 */
export const putAccountSetting: API.OperationMethod<
  PutAccountSettingRequest,
  PutAccountSettingResponse,
  PutAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, value: 0 } },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSetting",
})) as any;

export type PutImageError =
  | ImageAlreadyExistsException
  | ImageDigestDoesNotMatchException
  | ImageTagAlreadyExistsException
  | InvalidParameterException
  | KmsException
  | LayersNotFoundException
  | LimitExceededException
  | ReferencedImagesNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates or updates the image manifest and tags associated with an image.
 *
 * When an image is pushed and all new image layers have been uploaded, the PutImage API
 * is called once to create or update the image manifest and the tags associated with the
 * image.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
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
    KmsException,
    LayersNotFoundException,
    LimitExceededException,
    ReferencedImagesNotFoundException,
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImage",
})) as any;

export type PutImageScanningConfigurationError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * The `PutImageScanningConfiguration` API is being deprecated, in favor
 * of specifying the image scanning configuration at the registry level. For more
 * information, see PutRegistryScanningConfiguration.
 *
 * Updates the image scanning configuration for the specified repository.
 */
export const putImageScanningConfiguration: API.OperationMethod<
  PutImageScanningConfigurationRequest,
  PutImageScanningConfigurationResponse,
  PutImageScanningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageScanningConfiguration: i_ImageScanningConfiguration,
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImageScanningConfiguration",
})) as any;

export type PutImageTagMutabilityError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the image tag mutability settings for the specified repository. For more
 * information, see Image tag
 * mutability in the *Amazon Elastic Container Registry User Guide*.
 */
export const putImageTagMutability: API.OperationMethod<
  PutImageTagMutabilityRequest,
  PutImageTagMutabilityResponse,
  PutImageTagMutabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageTagMutability: 0,
      imageTagMutabilityExclusionFilters: D.list(
        i_ImageTagMutabilityExclusionFilter,
      ),
    },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImageTagMutability",
})) as any;

export type PutLifecyclePolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the lifecycle policy for the specified repository. For more
 * information, see Lifecycle policy
 * template.
 */
export const putLifecyclePolicy: API.OperationMethod<
  PutLifecyclePolicyRequest,
  PutLifecyclePolicyResponse,
  PutLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, lifecyclePolicyText: 0 },
  },
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecyclePolicy",
})) as any;

export type PutRegistryPolicyError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the permissions policy for your registry.
 *
 * A registry policy is used to specify permissions for another Amazon Web Services account and is used
 * when configuring cross-account replication. For more information, see Registry permissions in the *Amazon Elastic Container Registry User Guide*.
 */
export const putRegistryPolicy: API.OperationMethod<
  PutRegistryPolicyRequest,
  PutRegistryPolicyResponse,
  PutRegistryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { policyText: 0 } },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRegistryPolicy",
})) as any;

export type PutRegistryScanningConfigurationError =
  | BlockedByOrganizationPolicyException
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the scanning configuration for your private registry.
 */
export const putRegistryScanningConfiguration: API.OperationMethod<
  PutRegistryScanningConfigurationRequest,
  PutRegistryScanningConfigurationResponse,
  PutRegistryScanningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      scanType: 0,
      rules: D.list({
        scanFrequency: 0,
        repositoryFilters: D.list({ filter: 0, filterType: 0 }),
      }),
    },
  },
  errors: [
    BlockedByOrganizationPolicyException,
    InvalidParameterException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRegistryScanningConfiguration",
})) as any;

export type PutReplicationConfigurationError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the replication configuration for a registry. The existing
 * replication configuration for a repository can be retrieved with the DescribeRegistry API action. The first time the
 * PutReplicationConfiguration API is called, a service-linked IAM role is created in
 * your account for the replication process. For more information, see Using
 * service-linked roles for Amazon ECR in the *Amazon Elastic Container Registry User Guide*.
 * For more information on the custom role for replication, see Creating an IAM role for replication.
 *
 * When configuring cross-account replication, the destination account must grant the
 * source account permission to replicate. This permission is controlled using a
 * registry permissions policy. For more information, see PutRegistryPolicy.
 */
export const putReplicationConfiguration: API.OperationMethod<
  PutReplicationConfigurationRequest,
  PutReplicationConfigurationResponse,
  PutReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      replicationConfiguration: {
        rules: D.list({
          destinations: D.list({ region: 0, registryId: 0 }),
          repositoryFilters: D.list({ filter: 0, filterType: 0 }),
        }),
      },
    },
  },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutReplicationConfiguration",
})) as any;

export type PutSigningConfigurationError =
  | InvalidParameterException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the registry's signing configuration, which defines
 * rules for automatically signing images with Amazon Web Services Signer.
 *
 * For more information, see Managed signing in the
 * *Amazon Elastic Container Registry User Guide*.
 *
 * To successfully generate a signature, the IAM principal pushing images must have
 * permission to sign payloads with the Amazon Web Services Signer signing profile referenced in the signing
 * configuration.
 */
export const putSigningConfiguration: API.OperationMethod<
  PutSigningConfigurationRequest,
  PutSigningConfigurationResponse,
  PutSigningConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      signingConfiguration: {
        rules: D.list({
          signingProfileArn: 0,
          repositoryFilters: D.list({ filter: 0, filterType: 0 }),
        }),
      },
    },
  },
  errors: [InvalidParameterException, ServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSigningConfiguration",
})) as any;

export type RegisterPullTimeUpdateExclusionError =
  | ExclusionAlreadyExistsException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Adds an IAM principal to the pull time update exclusion list for a registry. Amazon ECR will not record the pull time if an excluded principal pulls an image.
 */
export const registerPullTimeUpdateExclusion: API.OperationMethod<
  RegisterPullTimeUpdateExclusionRequest,
  RegisterPullTimeUpdateExclusionResponse,
  RegisterPullTimeUpdateExclusionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { principalArn: 0 },
    output: { createdAt: D.ts },
  },
  errors: [
    ExclusionAlreadyExistsException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPullTimeUpdateExclusion",
})) as any;

export type SetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Applies a repository policy to the specified repository to control access permissions.
 * For more information, see Amazon ECR Repository
 * policies in the *Amazon Elastic Container Registry User Guide*.
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRepositoryPolicy",
})) as any;

export type StartImageScanError =
  | ImageArchivedException
  | ImageNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedImageTypeException
  | ValidationException
  | CommonErrors;
/**
 * Starts a basic image vulnerability scan.
 *
 * A basic image scan can only be started once per 24 hours on an individual image. This
 * limit includes if an image was scanned on initial push. You can start up to 100,000
 * basic scans per 24 hours. This limit includes both scans on initial push and scans
 * initiated by the StartImageScan API. For more information, see Basic scanning in the *Amazon Elastic Container Registry User Guide*.
 */
export const startImageScan: API.OperationMethod<
  StartImageScanRequest,
  StartImageScanResponse,
  StartImageScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, imageId: i_ImageIdentifier },
  },
  errors: [
    ImageArchivedException,
    ImageNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedImageTypeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImageScan",
})) as any;

export type StartLifecyclePolicyPreviewError =
  | InvalidParameterException
  | LifecyclePolicyNotFoundException
  | LifecyclePolicyPreviewInProgressException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Starts a preview of a lifecycle policy for the specified repository. This allows you
 * to see the results before associating the lifecycle policy with the repository.
 */
export const startLifecyclePolicyPreview: API.OperationMethod<
  StartLifecyclePolicyPreviewRequest,
  StartLifecyclePolicyPreviewResponse,
  StartLifecyclePolicyPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { registryId: 0, repositoryName: 0, lifecyclePolicyText: 0 },
  },
  errors: [
    InvalidParameterException,
    LifecyclePolicyNotFoundException,
    LifecyclePolicyPreviewInProgressException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLifecyclePolicyPreview",
})) as any;

export type TagResourceError =
  | InvalidParameterException
  | InvalidTagParameterException
  | RepositoryNotFoundException
  | ServerException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds specified tags to a resource with the specified ARN. Existing tags on a resource
 * are not changed if they are not specified in the request parameters.
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateImageStorageClassError =
  | ImageNotFoundException
  | ImageStorageClassUpdateNotSupportedException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Transitions an image between storage classes. You can transition images from Amazon ECR standard storage class to Amazon ECR archival storage class for long-term storage, or restore archived images back to Amazon ECR standard.
 */
export const updateImageStorageClass: API.OperationMethod<
  UpdateImageStorageClassRequest,
  UpdateImageStorageClassResponse,
  UpdateImageStorageClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      repositoryName: 0,
      imageId: i_ImageIdentifier,
      targetStorageClass: 0,
    },
  },
  errors: [
    ImageNotFoundException,
    ImageStorageClassUpdateNotSupportedException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImageStorageClass",
})) as any;

export type UpdatePullThroughCacheRuleError =
  | InvalidParameterException
  | PullThroughCacheRuleNotFoundException
  | SecretNotFoundException
  | ServerException
  | UnableToAccessSecretException
  | UnableToDecryptSecretValueException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing pull through cache rule.
 */
export const updatePullThroughCacheRule: API.OperationMethod<
  UpdatePullThroughCacheRuleRequest,
  UpdatePullThroughCacheRuleResponse,
  UpdatePullThroughCacheRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registryId: 0,
      ecrRepositoryPrefix: 0,
      credentialArn: 0,
      customRoleArn: 0,
    },
    output: { updatedAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    PullThroughCacheRuleNotFoundException,
    SecretNotFoundException,
    ServerException,
    UnableToAccessSecretException,
    UnableToDecryptSecretValueException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullThroughCacheRule",
})) as any;

export type UpdateRepositoryCreationTemplateError =
  | InvalidParameterException
  | ServerException
  | TemplateNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing repository creation template.
 */
export const updateRepositoryCreationTemplate: API.OperationMethod<
  UpdateRepositoryCreationTemplateRequest,
  UpdateRepositoryCreationTemplateResponse,
  UpdateRepositoryCreationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      prefix: 0,
      description: 0,
      encryptionConfiguration:
        i_EncryptionConfigurationForRepositoryCreationTemplate,
      resourceTags: D.list(i_Tag),
      imageTagMutability: 0,
      imageTagMutabilityExclusionFilters: D.list(
        i_ImageTagMutabilityExclusionFilter,
      ),
      repositoryPolicy: 0,
      lifecyclePolicy: 0,
      appliedFor: 0,
      customRoleArn: 0,
    },
    output: { repositoryCreationTemplate: o_RepositoryCreationTemplate },
  },
  errors: [
    InvalidParameterException,
    ServerException,
    TemplateNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryCreationTemplate",
})) as any;

export type UploadLayerPartError =
  | InvalidLayerPartException
  | InvalidParameterException
  | KmsException
  | LimitExceededException
  | RepositoryNotFoundException
  | ServerException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Uploads an image layer part to Amazon ECR.
 *
 * When an image is pushed, each new image layer is uploaded in parts. The maximum size
 * of each image layer part can be 20971520 bytes (or about 20MB). The UploadLayerPart API
 * is called once per each new image layer part.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by
 * customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
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
    KmsException,
    LimitExceededException,
    RepositoryNotFoundException,
    ServerException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadLayerPart",
})) as any;

export type ValidatePullThroughCacheRuleError =
  | InvalidParameterException
  | PullThroughCacheRuleNotFoundException
  | ServerException
  | ValidationException
  | CommonErrors;
/**
 * Validates an existing pull through cache rule for an upstream registry that requires
 * authentication. This will retrieve the contents of the Amazon Web Services Secrets Manager secret, verify the
 * syntax, and then validate that authentication to the upstream registry is
 * successful.
 */
export const validatePullThroughCacheRule: API.OperationMethod<
  ValidatePullThroughCacheRuleRequest,
  ValidatePullThroughCacheRuleResponse,
  ValidatePullThroughCacheRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ecrRepositoryPrefix: 0, registryId: 0 },
  },
  errors: [
    InvalidParameterException,
    PullThroughCacheRuleNotFoundException,
    ServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidatePullThroughCacheRule",
})) as any;

const i_EncryptionConfigurationForRepositoryCreationTemplate: D.LazyStruct =
  () => ({ encryptionType: 0, kmsKey: 0 });
const i_ImageIdentifier: D.LazyStruct = () => ({ imageDigest: 0, imageTag: 0 });
const i_ImageScanningConfiguration: D.LazyStruct = () => ({ scanOnPush: 0 });
const i_ImageTagMutabilityExclusionFilter: D.LazyStruct = () => ({
  filterType: 0,
  filter: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Repository: D.LazyStruct = () => ({ createdAt: D.ts });
const o_RepositoryCreationTemplate: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
