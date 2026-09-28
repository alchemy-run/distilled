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
  sdkId: "SageMaker",
  target: "SageMaker",
  version: "2017-07-24",
  sigv4: "sagemaker",
  protocol: awsJson1_1Protocol,
  xmlns: "http://sagemaker.amazonaws.com/doc/2017-05-13/",
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
                `https://api.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws") {
                return e(`https://api-fips.sagemaker.${Region}.amazonaws.com`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://api-fips.sagemaker.${Region}.amazonaws.com`);
              }
              return e(
                `https://api.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class EndpointAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "Cannot create already existing endpoint" },
      },
    },
  )<{ readonly message?: string }> {}
export class EndpointConfigAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointConfigAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ValidationException",
        message: {
          includes: "Cannot create already existing endpoint configuration",
        },
      },
    },
  )<{ readonly message?: string }> {}
export class EndpointConfigNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointConfigNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "Could not find endpoint configuration" },
      },
    },
  )<{ readonly message?: string }> {}
export class EndpointNotFound
  extends /*@__PURE__*/ TE.TaggedError("EndpointNotFound", ["NotFoundError"], {
    synthetic: {
      from: "ValidationException",
      message: { includes: 'Could not find endpoint "' },
    },
  })<{ readonly message?: string }> {}
export class ModelAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "ModelAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "Cannot create already existing model" },
      },
    },
  )<{ readonly message?: string }> {}
export class ModelNotFound
  extends /*@__PURE__*/ TE.TaggedError("ModelNotFound", ["NotFoundError"], {
    synthetic: {
      from: "ValidationException",
      message: { includes: "Could not find model" },
    },
  })<{ readonly message?: string }> {}
export class ResourceInUse
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUse", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class ResourceLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("ResourceLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFound
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFound")<{
    readonly message?: string;
  }> {}
export type AssociationEntityArn = string;
export type AssociationEdgeType =
  | "ContributedTo"
  | "AssociatedWith"
  | "DerivedFrom"
  | "Produced"
  | "SameAs"
  | (string & {});
export interface AddAssociationRequest {
  SourceArn?: string;
  DestinationArn?: string;
  AssociationType?: AssociationEdgeType;
}
export interface AddAssociationResponse {
  SourceArn?: string;
  DestinationArn?: string;
}
export type ResourceArn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsInput {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface AddTagsOutput {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export type ExperimentEntityName = string;
export interface AssociateTrialComponentRequest {
  TrialComponentName?: string;
  TrialName?: string;
}
export type TrialComponentArn = string;
export type TrialArn = string;
export interface AssociateTrialComponentResponse {
  TrialComponentArn?: string;
  TrialArn?: string;
}
export type ClusterArn = string;
export type ClusterNodeId = string;
export type VolumeId = string;
export interface AttachClusterNodeVolumeRequest {
  ClusterArn?: string;
  NodeId?: string;
  VolumeId?: string;
}
export type VolumeAttachmentStatus =
  | "attaching"
  | "attached"
  | "detaching"
  | "detached"
  | "busy"
  | (string & {});
export type VolumeDeviceName = string;
export interface AttachClusterNodeVolumeResponse {
  ClusterArn: string;
  NodeId: string;
  VolumeId: string;
  AttachTime: Date;
  Status: VolumeAttachmentStatus;
  DeviceName: string;
}
export type ClusterNameOrArn = string;
export type ClusterInstanceGroupName = string;
export type BatchAddIncrementCount = number;
export type ClusterAvailabilityZone = string;
export type ClusterAvailabilityZones = string[];
export type ClusterInstanceType =
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5.4xlarge"
  | "ml.p6e-gb200.36xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.c5.large"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.12xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5.24xlarge"
  | "ml.c5n.large"
  | "ml.c5n.2xlarge"
  | "ml.c5n.4xlarge"
  | "ml.c5n.9xlarge"
  | "ml.c5n.18xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.8xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.16xlarge"
  | "ml.m5.24xlarge"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.gr6.4xlarge"
  | "ml.gr6.8xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.trn2.3xlarge"
  | "ml.trn2.48xlarge"
  | "ml.c6i.large"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.r6i.large"
  | "ml.r6i.xlarge"
  | "ml.r6i.2xlarge"
  | "ml.r6i.4xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.12xlarge"
  | "ml.r6i.16xlarge"
  | "ml.r6i.24xlarge"
  | "ml.r6i.32xlarge"
  | "ml.i3en.large"
  | "ml.i3en.xlarge"
  | "ml.i3en.2xlarge"
  | "ml.i3en.3xlarge"
  | "ml.i3en.6xlarge"
  | "ml.i3en.12xlarge"
  | "ml.i3en.24xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.r5d.16xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.p6-b300.48xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.c6g.medium"
  | "ml.c6g.large"
  | "ml.c6g.xlarge"
  | "ml.c6g.2xlarge"
  | "ml.c6g.4xlarge"
  | "ml.c6g.8xlarge"
  | "ml.c6g.12xlarge"
  | "ml.c6g.16xlarge"
  | "ml.c7g.medium"
  | "ml.c7g.large"
  | "ml.c7g.xlarge"
  | "ml.c7g.2xlarge"
  | "ml.c7g.4xlarge"
  | "ml.c7g.8xlarge"
  | "ml.c7g.12xlarge"
  | "ml.c7g.16xlarge"
  | "ml.c8g.medium"
  | "ml.c8g.large"
  | "ml.c8g.xlarge"
  | "ml.c8g.2xlarge"
  | "ml.c8g.4xlarge"
  | "ml.c8g.8xlarge"
  | "ml.c8g.12xlarge"
  | "ml.c8g.16xlarge"
  | "ml.c8g.24xlarge"
  | "ml.c8g.48xlarge"
  | "ml.c6a.large"
  | "ml.c6a.xlarge"
  | "ml.c6a.2xlarge"
  | "ml.c6a.4xlarge"
  | "ml.c6a.8xlarge"
  | "ml.c6a.12xlarge"
  | "ml.c6a.16xlarge"
  | "ml.c6a.24xlarge"
  | "ml.c6a.32xlarge"
  | "ml.c6a.48xlarge"
  | "ml.m6a.large"
  | "ml.m6a.xlarge"
  | "ml.m6a.2xlarge"
  | "ml.m6a.4xlarge"
  | "ml.m6a.8xlarge"
  | "ml.m6a.12xlarge"
  | "ml.m6a.16xlarge"
  | "ml.m6a.24xlarge"
  | "ml.m6a.32xlarge"
  | "ml.m6a.48xlarge"
  | "ml.m6g.medium"
  | "ml.m6g.large"
  | "ml.m6g.xlarge"
  | "ml.m6g.2xlarge"
  | "ml.m6g.4xlarge"
  | "ml.m6g.8xlarge"
  | "ml.m6g.12xlarge"
  | "ml.m6g.16xlarge"
  | "ml.m7g.medium"
  | "ml.m7g.large"
  | "ml.m7g.xlarge"
  | "ml.m7g.2xlarge"
  | "ml.m7g.4xlarge"
  | "ml.m7g.8xlarge"
  | "ml.m7g.12xlarge"
  | "ml.m7g.16xlarge"
  | "ml.m8g.medium"
  | "ml.m8g.large"
  | "ml.m8g.xlarge"
  | "ml.m8g.2xlarge"
  | "ml.m8g.4xlarge"
  | "ml.m8g.8xlarge"
  | "ml.m8g.12xlarge"
  | "ml.m8g.16xlarge"
  | "ml.m8g.24xlarge"
  | "ml.m8g.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | (string & {});
export type ClusterInstanceTypes = ClusterInstanceType[];
export interface AddClusterNodeSpecification {
  InstanceGroupName: string;
  IncrementTargetCountBy: number;
  AvailabilityZones?: string[];
  InstanceTypes?: ClusterInstanceType[];
}
export type AddClusterNodeSpecificationList = AddClusterNodeSpecification[];
export interface BatchAddClusterNodesRequest {
  ClusterName: string;
  ClientToken?: string;
  NodesToAdd?: AddClusterNodeSpecification[];
}
export type ClusterNodeLogicalId = string;
export type ClusterInstanceStatus =
  | "Running"
  | "Failure"
  | "Pending"
  | "ShuttingDown"
  | "SystemUpdating"
  | "DeepHealthCheckInProgress"
  | "NotFound"
  | (string & {});
export interface NodeAdditionResult {
  NodeLogicalId: string;
  InstanceGroupName: string;
  Status: ClusterInstanceStatus;
  AvailabilityZones?: string[];
  InstanceTypes?: ClusterInstanceType[];
}
export type NodeAdditionResultList = NodeAdditionResult[];
export type InstanceGroupName = string;
export type BatchAddClusterNodesErrorCode =
  | "InstanceGroupNotFound"
  | "InvalidInstanceGroupStatus"
  | "IncompatibleAvailabilityZones"
  | "IncompatibleInstanceTypes"
  | (string & {});
export type BatchAddFailureCount = number;
export interface BatchAddClusterNodesError_ {
  InstanceGroupName: string;
  ErrorCode: BatchAddClusterNodesErrorCode;
  FailedCount: number;
  AvailabilityZones?: string[];
  InstanceTypes?: ClusterInstanceType[];
  Message?: string;
}
export type BatchAddClusterNodesErrorList = BatchAddClusterNodesError_[];
export interface BatchAddClusterNodesResponse {
  Successful: NodeAdditionResult[];
  Failed: BatchAddClusterNodesError_[];
}
export type ClusterNodeIds = string[];
export type ClusterNodeLogicalIdList = string[];
export interface BatchDeleteClusterNodesRequest {
  ClusterName?: string;
  NodeIds?: string[];
  NodeLogicalIds?: string[];
}
export type BatchDeleteClusterNodesErrorCode =
  | "NodeIdNotFound"
  | "InvalidNodeStatus"
  | "NodeIdInUse"
  | (string & {});
export interface BatchDeleteClusterNodesError_ {
  Code?: BatchDeleteClusterNodesErrorCode;
  Message?: string;
  NodeId?: string;
}
export type BatchDeleteClusterNodesErrorList = BatchDeleteClusterNodesError_[];
export interface BatchDeleteClusterNodeLogicalIdsError {
  Code?: BatchDeleteClusterNodesErrorCode;
  Message?: string;
  NodeLogicalId?: string;
}
export type BatchDeleteClusterNodeLogicalIdsErrorList =
  BatchDeleteClusterNodeLogicalIdsError[];
export interface BatchDeleteClusterNodesResponse {
  Failed?: (BatchDeleteClusterNodesError & {
    Code: BatchDeleteClusterNodesErrorCode;
    Message: string;
    NodeId: ClusterNodeId;
  })[];
  Successful?: string[];
  FailedNodeLogicalIds?: (BatchDeleteClusterNodeLogicalIdsError & {
    Code: BatchDeleteClusterNodesErrorCode;
    Message: string;
    NodeLogicalId: ClusterNodeLogicalId;
  })[];
  SuccessfulNodeLogicalIds?: string[];
}
export type ModelPackageArn = string;
export type ModelPackageArnList = string[];
export interface BatchDescribeModelPackageInput {
  ModelPackageArnList?: string[];
}
export type EntityName = string;
export type ModelPackageVersion = number;
export type EntityDescription = string;
export type CreationTime = Date;
export type ContainerHostname = string;
export type ContainerImage = string;
export type ImageDigest = string;
export type Url = string;
export type S3ModelUri = string;
export type S3ModelDataType = "S3Prefix" | "S3Object" | (string & {});
export type ModelCompressionType = "None" | "Gzip" | (string & {});
export type AcceptEula = boolean;
export interface ModelAccessConfig {
  AcceptEula?: boolean;
}
export type HubContentArn = string;
export interface InferenceHubAccessConfig {
  HubContentArn?: string;
}
export interface S3ModelDataSource {
  S3Uri?: string;
  S3DataType?: S3ModelDataType;
  CompressionType?: ModelCompressionType;
  ModelAccessConfig?: ModelAccessConfig;
  HubAccessConfig?: InferenceHubAccessConfig;
  ManifestS3Uri?: string;
  ETag?: string;
  ManifestEtag?: string;
}
export interface ModelDataSource {
  S3DataSource?: S3ModelDataSource;
}
export type ProductId = string;
export type EnvironmentKey = string;
export type EnvironmentValue = string;
export type EnvironmentMap = { [key: string]: string | undefined };
export type DataInputConfig = string;
export interface ModelInput {
  DataInputConfig?: string;
}
export type ModelPackageFrameworkVersion = string;
export type AdditionalModelChannelName = string;
export interface AdditionalModelDataSource {
  ChannelName?: string;
  S3DataSource?: S3ModelDataSource;
}
export type AdditionalModelDataSources = AdditionalModelDataSource[];
export type AdditionalS3DataSourceDataType =
  | "S3Object"
  | "S3Prefix"
  | (string & {});
export type S3Uri = string;
export type CompressionType = "None" | "Gzip" | (string & {});
export interface AdditionalS3DataSource {
  S3DataType?: AdditionalS3DataSourceDataType;
  S3Uri?: string;
  CompressionType?: CompressionType;
  ETag?: string;
}
export type HubContentName = string;
export type HubContentVersion = string;
export type RecipeName = string;
export interface BaseModel {
  HubContentName?: string;
  HubContentVersion?: string;
  RecipeName?: string;
}
export interface ModelPackageContainerDefinition {
  ContainerHostname?: string;
  Image?: string;
  ImageDigest?: string;
  ModelDataUrl?: string;
  ModelDataSource?: ModelDataSource;
  ProductId?: string;
  Environment?: { [key: string]: string | undefined };
  ModelInput?: ModelInput;
  Framework?: string;
  FrameworkVersion?: string;
  NearestModelName?: string;
  AdditionalModelDataSources?: AdditionalModelDataSource[];
  AdditionalS3DataSource?: AdditionalS3DataSource;
  ModelDataETag?: string;
  IsCheckpoint?: boolean;
  BaseModel?: BaseModel;
}
export type ModelPackageContainerDefinitionList =
  ModelPackageContainerDefinition[];
export type TransformInstanceType =
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.c6i.large"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.r6i.large"
  | "ml.r6i.xlarge"
  | "ml.r6i.2xlarge"
  | "ml.r6i.4xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.12xlarge"
  | "ml.r6i.16xlarge"
  | "ml.r6i.24xlarge"
  | "ml.r6i.32xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.inf2.xlarge"
  | "ml.inf2.8xlarge"
  | "ml.inf2.24xlarge"
  | "ml.inf2.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | (string & {});
export type TransformInstanceTypes = TransformInstanceType[];
export type ProductionVariantInstanceType =
  | "ml.t2.medium"
  | "ml.t2.large"
  | "ml.t2.xlarge"
  | "ml.t2.2xlarge"
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.m5d.large"
  | "ml.m5d.xlarge"
  | "ml.m5d.2xlarge"
  | "ml.m5d.4xlarge"
  | "ml.m5d.12xlarge"
  | "ml.m5d.24xlarge"
  | "ml.c4.large"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.c5.large"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5d.large"
  | "ml.c5d.xlarge"
  | "ml.c5d.2xlarge"
  | "ml.c5d.4xlarge"
  | "ml.c5d.9xlarge"
  | "ml.c5d.18xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.24xlarge"
  | "ml.r5d.large"
  | "ml.r5d.xlarge"
  | "ml.r5d.2xlarge"
  | "ml.r5d.4xlarge"
  | "ml.r5d.12xlarge"
  | "ml.r5d.24xlarge"
  | "ml.inf1.xlarge"
  | "ml.inf1.2xlarge"
  | "ml.inf1.6xlarge"
  | "ml.inf1.24xlarge"
  | "ml.dl1.24xlarge"
  | "ml.c6i.large"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.r6i.large"
  | "ml.r6i.xlarge"
  | "ml.r6i.2xlarge"
  | "ml.r6i.4xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.12xlarge"
  | "ml.r6i.16xlarge"
  | "ml.r6i.24xlarge"
  | "ml.r6i.32xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.r8g.medium"
  | "ml.r8g.large"
  | "ml.r8g.xlarge"
  | "ml.r8g.2xlarge"
  | "ml.r8g.4xlarge"
  | "ml.r8g.8xlarge"
  | "ml.r8g.12xlarge"
  | "ml.r8g.16xlarge"
  | "ml.r8g.24xlarge"
  | "ml.r8g.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | "ml.p4d.24xlarge"
  | "ml.c7g.large"
  | "ml.c7g.xlarge"
  | "ml.c7g.2xlarge"
  | "ml.c7g.4xlarge"
  | "ml.c7g.8xlarge"
  | "ml.c7g.12xlarge"
  | "ml.c7g.16xlarge"
  | "ml.m6g.large"
  | "ml.m6g.xlarge"
  | "ml.m6g.2xlarge"
  | "ml.m6g.4xlarge"
  | "ml.m6g.8xlarge"
  | "ml.m6g.12xlarge"
  | "ml.m6g.16xlarge"
  | "ml.m6gd.large"
  | "ml.m6gd.xlarge"
  | "ml.m6gd.2xlarge"
  | "ml.m6gd.4xlarge"
  | "ml.m6gd.8xlarge"
  | "ml.m6gd.12xlarge"
  | "ml.m6gd.16xlarge"
  | "ml.c6g.large"
  | "ml.c6g.xlarge"
  | "ml.c6g.2xlarge"
  | "ml.c6g.4xlarge"
  | "ml.c6g.8xlarge"
  | "ml.c6g.12xlarge"
  | "ml.c6g.16xlarge"
  | "ml.c6gd.large"
  | "ml.c6gd.xlarge"
  | "ml.c6gd.2xlarge"
  | "ml.c6gd.4xlarge"
  | "ml.c6gd.8xlarge"
  | "ml.c6gd.12xlarge"
  | "ml.c6gd.16xlarge"
  | "ml.c6gn.large"
  | "ml.c6gn.xlarge"
  | "ml.c6gn.2xlarge"
  | "ml.c6gn.4xlarge"
  | "ml.c6gn.8xlarge"
  | "ml.c6gn.12xlarge"
  | "ml.c6gn.16xlarge"
  | "ml.r6g.large"
  | "ml.r6g.xlarge"
  | "ml.r6g.2xlarge"
  | "ml.r6g.4xlarge"
  | "ml.r6g.8xlarge"
  | "ml.r6g.12xlarge"
  | "ml.r6g.16xlarge"
  | "ml.r6gd.large"
  | "ml.r6gd.xlarge"
  | "ml.r6gd.2xlarge"
  | "ml.r6gd.4xlarge"
  | "ml.r6gd.8xlarge"
  | "ml.r6gd.12xlarge"
  | "ml.r6gd.16xlarge"
  | "ml.p4de.24xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.trn2.48xlarge"
  | "ml.inf2.xlarge"
  | "ml.inf2.8xlarge"
  | "ml.inf2.24xlarge"
  | "ml.inf2.48xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.c8g.medium"
  | "ml.c8g.large"
  | "ml.c8g.xlarge"
  | "ml.c8g.2xlarge"
  | "ml.c8g.4xlarge"
  | "ml.c8g.8xlarge"
  | "ml.c8g.12xlarge"
  | "ml.c8g.16xlarge"
  | "ml.c8g.24xlarge"
  | "ml.c8g.48xlarge"
  | "ml.r7gd.medium"
  | "ml.r7gd.large"
  | "ml.r7gd.xlarge"
  | "ml.r7gd.2xlarge"
  | "ml.r7gd.4xlarge"
  | "ml.r7gd.8xlarge"
  | "ml.r7gd.12xlarge"
  | "ml.r7gd.16xlarge"
  | "ml.m8g.medium"
  | "ml.m8g.large"
  | "ml.m8g.xlarge"
  | "ml.m8g.2xlarge"
  | "ml.m8g.4xlarge"
  | "ml.m8g.8xlarge"
  | "ml.m8g.12xlarge"
  | "ml.m8g.16xlarge"
  | "ml.m8g.24xlarge"
  | "ml.m8g.48xlarge"
  | "ml.c6in.large"
  | "ml.c6in.xlarge"
  | "ml.c6in.2xlarge"
  | "ml.c6in.4xlarge"
  | "ml.c6in.8xlarge"
  | "ml.c6in.12xlarge"
  | "ml.c6in.16xlarge"
  | "ml.c6in.24xlarge"
  | "ml.c6in.32xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.p6-b300.48xlarge"
  | "ml.p6e-gb200.36xlarge"
  | "ml.p5.4xlarge"
  | (string & {});
export type RealtimeInferenceInstanceTypes = ProductionVariantInstanceType[];
export type ContentType = string;
export type ContentTypes = string[];
export type ResponseMIMEType = string;
export type ResponseMIMETypes = string[];
export interface InferenceSpecification {
  Containers?: ModelPackageContainerDefinition[];
  SupportedTransformInstanceTypes?: TransformInstanceType[];
  SupportedRealtimeInferenceInstanceTypes?: ProductionVariantInstanceType[];
  SupportedContentTypes?: string[];
  SupportedResponseMIMETypes?: string[];
}
export type ModelPackageStatus =
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export type ModelApprovalStatus =
  | "Approved"
  | "Rejected"
  | "PendingManualApproval"
  | (string & {});
export type ModelPackageRegistrationType =
  | "Logged"
  | "Registered"
  | (string & {});
export interface BatchDescribeModelPackageSummary {
  ModelPackageGroupName?: string;
  ModelPackageVersion?: number;
  ModelPackageArn?: string;
  ModelPackageDescription?: string;
  CreationTime?: Date;
  InferenceSpecification?: InferenceSpecification;
  ModelPackageStatus?: ModelPackageStatus;
  ModelApprovalStatus?: ModelApprovalStatus;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
}
export type ModelPackageSummaries = {
  [key: string]: BatchDescribeModelPackageSummary | undefined;
};
export interface BatchDescribeModelPackageError_ {
  ErrorCode?: string;
  ErrorResponse?: string;
}
export type BatchDescribeModelPackageErrorMap = {
  [key: string]: BatchDescribeModelPackageError_ | undefined;
};
export interface BatchDescribeModelPackageOutput {
  ModelPackageSummaries?: {
    [key: string]:
      | (BatchDescribeModelPackageSummary & {
          ModelPackageGroupName: EntityName;
          ModelPackageArn: ModelPackageArn;
          CreationTime: CreationTime;
          InferenceSpecification: InferenceSpecification & {
            Containers: (ModelPackageContainerDefinition & {
              ModelDataSource: ModelDataSource & {
                S3DataSource: S3ModelDataSource & {
                  S3Uri: S3ModelUri;
                  S3DataType: S3ModelDataType;
                  CompressionType: ModelCompressionType;
                  ModelAccessConfig: ModelAccessConfig & {
                    AcceptEula: AcceptEula;
                  };
                  HubAccessConfig: InferenceHubAccessConfig & {
                    HubContentArn: HubContentArn;
                  };
                };
              };
              ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
              AdditionalModelDataSources: (AdditionalModelDataSource & {
                ChannelName: AdditionalModelChannelName;
                S3DataSource: S3ModelDataSource & {
                  S3Uri: S3ModelUri;
                  S3DataType: S3ModelDataType;
                  CompressionType: ModelCompressionType;
                  ModelAccessConfig: ModelAccessConfig & {
                    AcceptEula: AcceptEula;
                  };
                  HubAccessConfig: InferenceHubAccessConfig & {
                    HubContentArn: HubContentArn;
                  };
                };
              })[];
              AdditionalS3DataSource: AdditionalS3DataSource & {
                S3DataType: AdditionalS3DataSourceDataType;
                S3Uri: S3Uri;
              };
            })[];
          };
          ModelPackageStatus: ModelPackageStatus;
        })
      | undefined;
  };
  BatchDescribeModelPackageErrorMap?: {
    [key: string]:
      | (BatchDescribeModelPackageError & {
          ErrorCode: string;
          ErrorResponse: string;
        })
      | undefined;
  };
}
export interface BatchRebootClusterNodesRequest {
  ClusterName?: string;
  NodeIds?: string[];
  NodeLogicalIds?: string[];
}
export type BatchRebootClusterNodesErrorCode =
  | "InstanceIdNotFound"
  | "InvalidInstanceStatus"
  | "InstanceIdInUse"
  | "InternalServerError"
  | (string & {});
export interface BatchRebootClusterNodesError_ {
  NodeId?: string;
  ErrorCode?: BatchRebootClusterNodesErrorCode;
  Message?: string;
}
export type BatchRebootClusterNodesErrors = BatchRebootClusterNodesError_[];
export interface BatchRebootClusterNodeLogicalIdsError {
  NodeLogicalId?: string;
  ErrorCode?: BatchRebootClusterNodesErrorCode;
  Message?: string;
}
export type BatchRebootClusterNodeLogicalIdsErrors =
  BatchRebootClusterNodeLogicalIdsError[];
export interface BatchRebootClusterNodesResponse {
  Successful?: string[];
  Failed?: (BatchRebootClusterNodesError & {
    NodeId: ClusterNodeId;
    ErrorCode: BatchRebootClusterNodesErrorCode;
    Message: string;
  })[];
  FailedNodeLogicalIds?: (BatchRebootClusterNodeLogicalIdsError & {
    NodeLogicalId: ClusterNodeLogicalId;
    ErrorCode: BatchRebootClusterNodesErrorCode;
    Message: string;
  })[];
  SuccessfulNodeLogicalIds?: string[];
}
export interface BatchReplaceClusterNodesRequest {
  ClusterName?: string;
  NodeIds?: string[];
  NodeLogicalIds?: string[];
}
export type BatchReplaceClusterNodesErrorCode =
  | "InstanceIdNotFound"
  | "InvalidInstanceStatus"
  | "InstanceIdInUse"
  | "InternalServerError"
  | (string & {});
export interface BatchReplaceClusterNodesError_ {
  NodeId?: string;
  ErrorCode?: BatchReplaceClusterNodesErrorCode;
  Message?: string;
}
export type BatchReplaceClusterNodesErrors = BatchReplaceClusterNodesError_[];
export interface BatchReplaceClusterNodeLogicalIdsError {
  NodeLogicalId?: string;
  ErrorCode?: BatchReplaceClusterNodesErrorCode;
  Message?: string;
}
export type BatchReplaceClusterNodeLogicalIdsErrors =
  BatchReplaceClusterNodeLogicalIdsError[];
export interface BatchReplaceClusterNodesResponse {
  Successful?: string[];
  Failed?: (BatchReplaceClusterNodesError & {
    NodeId: ClusterNodeId;
    ErrorCode: BatchReplaceClusterNodesErrorCode;
    Message: string;
  })[];
  FailedNodeLogicalIds?: (BatchReplaceClusterNodeLogicalIdsError & {
    NodeLogicalId: ClusterNodeLogicalId;
    ErrorCode: BatchReplaceClusterNodesErrorCode;
    Message: string;
  })[];
  SuccessfulNodeLogicalIds?: string[];
}
export type SourceUri = string;
export type String256 = string;
export interface ActionSource {
  SourceUri?: string;
  SourceType?: string;
  SourceId?: string;
}
export type ExperimentDescription = string;
export type ActionStatus =
  | "Unknown"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type StringParameterValue = string;
export type LineageEntityParameters = { [key: string]: string | undefined };
export type MetadataPropertyValue = string;
export interface MetadataProperties {
  CommitId?: string;
  Repository?: string;
  GeneratedBy?: string;
  ProjectId?: string;
}
export interface CreateActionRequest {
  ActionName?: string;
  Source?: ActionSource;
  ActionType?: string;
  Description?: string;
  Status?: ActionStatus;
  Properties?: { [key: string]: string | undefined };
  MetadataProperties?: MetadataProperties;
  Tags?: Tag[];
}
export type ActionArn = string;
export interface CreateActionResponse {
  ActionArn?: string;
}
export type AIEntityName = string;
export type AIResourceIdentifier = string;
export interface AIBenchmarkInferenceComponent {
  Identifier?: string;
}
export type AIBenchmarkInferenceComponentList = AIBenchmarkInferenceComponent[];
export interface AIBenchmarkEndpoint {
  Identifier?: string;
  TargetContainerHostname?: string;
  InferenceComponents?: AIBenchmarkInferenceComponent[];
}
export type AIBenchmarkTarget = { Endpoint: AIBenchmarkEndpoint };
export type AIMlflowResourceArn = string;
export type AIMlflowExperimentName = string;
export type AIMlflowRunName = string;
export interface AIMlflowConfig {
  MlflowResourceArn?: string;
  MlflowExperimentName?: string;
  MlflowRunName?: string;
}
export interface AIBenchmarkOutputConfig {
  S3OutputLocation?: string;
  MlflowConfig?: AIMlflowConfig;
}
export type RoleArn = string;
export type SecurityGroupId = string;
export type VpcSecurityGroupIds = string[];
export type SubnetId = string;
export type Subnets = string[];
export interface VpcConfig {
  SecurityGroupIds?: string[];
  Subnets?: string[];
}
export interface AIBenchmarkNetworkConfig {
  VpcConfig?: VpcConfig;
}
export interface CreateAIBenchmarkJobRequest {
  AIBenchmarkJobName?: string;
  BenchmarkTarget?: AIBenchmarkTarget;
  OutputConfig?: AIBenchmarkOutputConfig;
  AIWorkloadConfigIdentifier?: string;
  RoleArn?: string;
  NetworkConfig?: AIBenchmarkNetworkConfig;
  Tags?: Tag[];
}
export type AIBenchmarkJobArn = string;
export interface CreateAIBenchmarkJobResponse {
  AIBenchmarkJobArn: string;
}
export interface AIModelSourceS3 {
  S3Uri?: string;
}
export type AIModelSource = { S3: AIModelSourceS3 };
export interface AIRecommendationOutputConfig {
  S3OutputLocation?: string;
  ModelPackageGroupIdentifier?: string;
  MlflowConfig?: AIMlflowConfig;
}
export type AIRecommendationMetric =
  | "ttft-ms"
  | "throughput"
  | "cost"
  | (string & {});
export interface AIRecommendationConstraint {
  Metric?: AIRecommendationMetric;
}
export type AIRecommendationConstraintList = AIRecommendationConstraint[];
export interface AIRecommendationPerformanceTarget {
  Constraints?: AIRecommendationConstraint[];
}
export type AIRecommendationInferenceFramework = "LMI" | "VLLM" | (string & {});
export interface AIRecommendationInferenceSpecification {
  Framework?: AIRecommendationInferenceFramework;
}
export type AIRecommendationAllowOptimization = boolean;
export type AIRecommendationInstanceType =
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.4xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.p6-b200.48xlarge"
  | (string & {});
export type AIRecommendationInstanceTypeList = AIRecommendationInstanceType[];
export type AICapacityReservationPreference =
  | "capacity-reservations-only"
  | (string & {});
export type AIMlReservationArn = string;
export type AIMlReservationArnList = string[];
export interface AICapacityReservationConfig {
  CapacityReservationPreference?: AICapacityReservationPreference;
  MlReservationArns?: string[];
}
export interface AIRecommendationComputeSpec {
  InstanceTypes?: AIRecommendationInstanceType[];
  CapacityReservationConfig?: AICapacityReservationConfig;
}
export type AIAdapterId = string;
export interface AIAdapterModelPackageEntry {
  AdapterId?: string;
  ModelPackageArn?: string;
}
export type AIAdapterModelPackageEntryList = AIAdapterModelPackageEntry[];
export interface AIAdapterS3Entry {
  AdapterId?: string;
  S3Uri?: string;
}
export type AIAdapterS3EntryList = AIAdapterS3Entry[];
export type AIAdapterSource =
  | { ModelPackageArns: AIAdapterModelPackageEntry[]; S3Uris?: never }
  | { ModelPackageArns?: never; S3Uris: AIAdapterS3Entry[] };
export interface CreateAIRecommendationJobRequest {
  AIRecommendationJobName?: string;
  ModelSource?: AIModelSource;
  OutputConfig?: AIRecommendationOutputConfig;
  AIWorkloadConfigIdentifier?: string;
  PerformanceTarget?: AIRecommendationPerformanceTarget;
  RoleArn?: string;
  InferenceSpecification?: AIRecommendationInferenceSpecification;
  OptimizeModel?: boolean;
  ComputeSpec?: AIRecommendationComputeSpec;
  AdapterSource?: AIAdapterSource;
  Tags?: Tag[];
}
export type AIRecommendationJobArn = string;
export interface CreateAIRecommendationJobResponse {
  AIRecommendationJobArn: string;
}
export type AIChannelName = string;
export interface AIWorkloadS3DataSource {
  S3Uri?: string;
}
export interface AIWorkloadDataSource {
  S3DataSource?: AIWorkloadS3DataSource;
}
export interface AIWorkloadInputDataConfig {
  ChannelName?: string;
  DataSource?: AIWorkloadDataSource;
}
export type AIWorkloadInputDataConfigList = AIWorkloadInputDataConfig[];
export type AIDatasetConfig = { InputDataConfig: AIWorkloadInputDataConfig[] };
export type WorkloadSpec = { Inline: string };
export interface AIWorkloadConfigs {
  WorkloadSpec?: WorkloadSpec;
}
export interface CreateAIWorkloadConfigRequest {
  AIWorkloadConfigName?: string;
  DatasetConfig?: AIDatasetConfig;
  AIWorkloadConfigs?: AIWorkloadConfigs;
  Tags?: Tag[];
}
export type AIWorkloadConfigArn = string;
export interface CreateAIWorkloadConfigResponse {
  AIWorkloadConfigArn: string;
}
export type ParameterName = string;
export type ParameterType =
  | "Integer"
  | "Continuous"
  | "Categorical"
  | "FreeText"
  | (string & {});
export type ParameterValue = string;
export interface IntegerParameterRangeSpecification {
  MinValue?: string;
  MaxValue?: string;
}
export interface ContinuousParameterRangeSpecification {
  MinValue?: string;
  MaxValue?: string;
}
export type ParameterValues = string[];
export interface CategoricalParameterRangeSpecification {
  Values?: string[];
}
export interface ParameterRange {
  IntegerParameterRangeSpecification?: IntegerParameterRangeSpecification;
  ContinuousParameterRangeSpecification?: ContinuousParameterRangeSpecification;
  CategoricalParameterRangeSpecification?: CategoricalParameterRangeSpecification;
}
export type HyperParameterValue = string;
export interface HyperParameterSpecification {
  Name?: string;
  Description?: string;
  Type?: ParameterType;
  Range?: ParameterRange;
  IsTunable?: boolean;
  IsRequired?: boolean;
  DefaultValue?: string;
}
export type HyperParameterSpecifications = HyperParameterSpecification[];
export type TrainingInstanceType =
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3dn.24xlarge"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5n.xlarge"
  | "ml.c5n.2xlarge"
  | "ml.c5n.4xlarge"
  | "ml.c5n.9xlarge"
  | "ml.c5n.18xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.trn2.48xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.r5d.large"
  | "ml.r5d.xlarge"
  | "ml.r5d.2xlarge"
  | "ml.r5d.4xlarge"
  | "ml.r5d.8xlarge"
  | "ml.r5d.12xlarge"
  | "ml.r5d.16xlarge"
  | "ml.r5d.24xlarge"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.p6e-gb200.36xlarge"
  | "ml.p5.4xlarge"
  | "ml.p6-b300.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | (string & {});
export type TrainingInstanceTypes = TrainingInstanceType[];
export type MetricName = string;
export type MetricRegex = string;
export interface MetricDefinition {
  Name?: string;
  Regex?: string;
}
export type MetricDefinitionList = MetricDefinition[];
export type ChannelName = string;
export type CompressionTypes = CompressionType[];
export type TrainingInputMode = "Pipe" | "File" | "FastFile" | (string & {});
export type InputModes = TrainingInputMode[];
export interface ChannelSpecification {
  Name?: string;
  Description?: string;
  IsRequired?: boolean;
  SupportedContentTypes?: string[];
  SupportedCompressionTypes?: CompressionType[];
  SupportedInputModes?: TrainingInputMode[];
}
export type ChannelSpecifications = ChannelSpecification[];
export type HyperParameterTuningJobObjectiveType =
  | "Maximize"
  | "Minimize"
  | (string & {});
export interface HyperParameterTuningJobObjective {
  Type?: HyperParameterTuningJobObjectiveType;
  MetricName?: string;
}
export type HyperParameterTuningJobObjectives =
  HyperParameterTuningJobObjective[];
export interface TrainingSpecification {
  TrainingImage?: string;
  TrainingImageDigest?: string;
  SupportedHyperParameters?: HyperParameterSpecification[];
  SupportedTrainingInstanceTypes?: TrainingInstanceType[];
  SupportsDistributedTraining?: boolean;
  MetricDefinitions?: MetricDefinition[];
  TrainingChannels?: ChannelSpecification[];
  SupportedTuningJobObjectiveMetrics?: HyperParameterTuningJobObjective[];
  AdditionalS3DataSource?: AdditionalS3DataSource;
}
export type HyperParameterKey = string;
export type HyperParameters = { [key: string]: string | undefined };
export type S3DataType =
  | "ManifestFile"
  | "S3Prefix"
  | "AugmentedManifestFile"
  | "Converse"
  | (string & {});
export type S3DataDistribution =
  | "FullyReplicated"
  | "ShardedByS3Key"
  | (string & {});
export type AttributeName = string;
export type AttributeNames = string[];
export type InstanceGroupNames = string[];
export interface HubAccessConfig {
  HubContentArn?: string;
}
export interface S3DataSource {
  S3DataType?: S3DataType;
  S3Uri?: string;
  S3DataDistributionType?: S3DataDistribution;
  AttributeNames?: string[];
  InstanceGroupNames?: string[];
  ModelAccessConfig?: ModelAccessConfig;
  HubAccessConfig?: HubAccessConfig;
}
export type FileSystemId = string;
export type FileSystemAccessMode = "rw" | "ro" | (string & {});
export type FileSystemType = "EFS" | "FSxLustre" | (string & {});
export type DirectoryPath = string;
export interface FileSystemDataSource {
  FileSystemId?: string;
  FileSystemAccessMode?: FileSystemAccessMode;
  FileSystemType?: FileSystemType;
  DirectoryPath?: string;
}
export type HubDataSetArn = string;
export interface DatasetSource {
  DatasetArn: string;
}
export interface DataSource {
  S3DataSource?: S3DataSource;
  FileSystemDataSource?: FileSystemDataSource;
  DatasetSource?: DatasetSource;
}
export type RecordWrapper = "None" | "RecordIO" | (string & {});
export type Seed = number;
export interface ShuffleConfig {
  Seed?: number;
}
export interface Channel {
  ChannelName?: string;
  DataSource?: DataSource;
  ContentType?: string;
  CompressionType?: CompressionType;
  RecordWrapperType?: RecordWrapper;
  InputMode?: TrainingInputMode;
  ShuffleConfig?: ShuffleConfig;
}
export type InputDataConfig = Channel[];
export type KmsKeyId = string;
export type OutputCompressionType = "GZIP" | "NONE" | (string & {});
export interface OutputDataConfig {
  KmsKeyId?: string;
  S3OutputPath?: string;
  CompressionType?: OutputCompressionType;
}
export type TrainingInstanceCount = number;
export type OptionalVolumeSizeInGB = number;
export type KeepAlivePeriodInSeconds = number;
export interface InstanceGroup {
  InstanceType?: TrainingInstanceType;
  InstanceCount?: number;
  InstanceGroupName?: string;
}
export type InstanceGroups = InstanceGroup[];
export type TrainingPlanArn = string;
export interface PlacementSpecification {
  UltraServerId?: string;
  InstanceCount?: number;
}
export type PlacementSpecifications = PlacementSpecification[];
export interface InstancePlacementConfig {
  EnableMultipleJobs?: boolean;
  PlacementSpecifications?: PlacementSpecification[];
}
export interface ResourceConfig {
  InstanceType?: TrainingInstanceType;
  InstanceCount?: number;
  VolumeSizeInGB?: number;
  VolumeKmsKeyId?: string;
  KeepAlivePeriodInSeconds?: number;
  InstanceGroups?: InstanceGroup[];
  TrainingPlanArn?: string;
  InstancePlacementConfig?: InstancePlacementConfig;
}
export type MaxRuntimeInSeconds = number;
export type MaxWaitTimeInSeconds = number;
export type MaxPendingTimeInSeconds = number;
export interface StoppingCondition {
  MaxRuntimeInSeconds?: number;
  MaxWaitTimeInSeconds?: number;
  MaxPendingTimeInSeconds?: number;
}
export interface TrainingJobDefinition {
  TrainingInputMode?: TrainingInputMode;
  HyperParameters?: { [key: string]: string | undefined };
  InputDataConfig?: Channel[];
  OutputDataConfig?: OutputDataConfig;
  ResourceConfig?: ResourceConfig;
  StoppingCondition?: StoppingCondition;
}
export type MaxConcurrentTransforms = number;
export type MaxPayloadInMB = number;
export type BatchStrategy = "MultiRecord" | "SingleRecord" | (string & {});
export type TransformEnvironmentKey = string;
export type TransformEnvironmentValue = string;
export type TransformEnvironmentMap = { [key: string]: string | undefined };
export interface TransformS3DataSource {
  S3DataType?: S3DataType;
  S3Uri?: string;
}
export interface TransformDataSource {
  S3DataSource?: TransformS3DataSource;
}
export type SplitType =
  | "None"
  | "Line"
  | "RecordIO"
  | "TFRecord"
  | (string & {});
export interface TransformInput {
  DataSource?: TransformDataSource;
  ContentType?: string;
  CompressionType?: CompressionType;
  SplitType?: SplitType;
}
export type Accept = string;
export type AssemblyType = "None" | "Line" | (string & {});
export interface TransformOutput {
  S3OutputPath?: string;
  Accept?: string;
  AssembleWith?: AssemblyType;
  KmsKeyId?: string;
}
export type TransformInstanceCount = number;
export type TransformAmiVersion = string;
export interface TransformResources {
  InstanceType?: TransformInstanceType;
  InstanceCount?: number;
  VolumeKmsKeyId?: string;
  TransformAmiVersion?: string;
}
export interface TransformJobDefinition {
  MaxConcurrentTransforms?: number;
  MaxPayloadInMB?: number;
  BatchStrategy?: BatchStrategy;
  Environment?: { [key: string]: string | undefined };
  TransformInput?: TransformInput;
  TransformOutput?: TransformOutput;
  TransformResources?: TransformResources;
}
export interface AlgorithmValidationProfile {
  ProfileName?: string;
  TrainingJobDefinition?: TrainingJobDefinition;
  TransformJobDefinition?: TransformJobDefinition;
}
export type AlgorithmValidationProfiles = AlgorithmValidationProfile[];
export interface AlgorithmValidationSpecification {
  ValidationRole?: string;
  ValidationProfiles?: AlgorithmValidationProfile[];
}
export type CertifyForMarketplace = boolean;
export interface CreateAlgorithmInput {
  AlgorithmName?: string;
  AlgorithmDescription?: string;
  TrainingSpecification?: TrainingSpecification;
  InferenceSpecification?: InferenceSpecification;
  ValidationSpecification?: AlgorithmValidationSpecification;
  CertifyForMarketplace?: boolean;
  Tags?: Tag[];
}
export type AlgorithmArn = string;
export interface CreateAlgorithmOutput {
  AlgorithmArn: string;
}
export type DomainId = string;
export type UserProfileName = string;
export type SpaceName = string;
export type AppType =
  | "JupyterServer"
  | "KernelGateway"
  | "DetailedProfiler"
  | "TensorBoard"
  | "CodeEditor"
  | "JupyterLab"
  | "RStudioServerPro"
  | "RSessionGateway"
  | "Canvas"
  | (string & {});
export type AppName = string;
export type ImageArn = string;
export type ImageVersionArn = string;
export type ImageVersionAlias = string;
export type AppInstanceType =
  | "system"
  | "ml.t3.micro"
  | "ml.t3.small"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.8xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.16xlarge"
  | "ml.m5.24xlarge"
  | "ml.m5d.large"
  | "ml.m5d.xlarge"
  | "ml.m5d.2xlarge"
  | "ml.m5d.4xlarge"
  | "ml.m5d.8xlarge"
  | "ml.m5d.12xlarge"
  | "ml.m5d.16xlarge"
  | "ml.m5d.24xlarge"
  | "ml.c5.large"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.12xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5.24xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3dn.24xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.geospatial.interactive"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c6i.large"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r6i.large"
  | "ml.r6i.xlarge"
  | "ml.r6i.2xlarge"
  | "ml.r6i.4xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.12xlarge"
  | "ml.r6i.16xlarge"
  | "ml.r6i.24xlarge"
  | "ml.r6i.32xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.m6id.large"
  | "ml.m6id.xlarge"
  | "ml.m6id.2xlarge"
  | "ml.m6id.4xlarge"
  | "ml.m6id.8xlarge"
  | "ml.m6id.12xlarge"
  | "ml.m6id.16xlarge"
  | "ml.m6id.24xlarge"
  | "ml.m6id.32xlarge"
  | "ml.c6id.large"
  | "ml.c6id.xlarge"
  | "ml.c6id.2xlarge"
  | "ml.c6id.4xlarge"
  | "ml.c6id.8xlarge"
  | "ml.c6id.12xlarge"
  | "ml.c6id.16xlarge"
  | "ml.c6id.24xlarge"
  | "ml.c6id.32xlarge"
  | "ml.r6id.large"
  | "ml.r6id.xlarge"
  | "ml.r6id.2xlarge"
  | "ml.r6id.4xlarge"
  | "ml.r6id.8xlarge"
  | "ml.r6id.12xlarge"
  | "ml.r6id.16xlarge"
  | "ml.r6id.24xlarge"
  | "ml.r6id.32xlarge"
  | "ml.p5.4xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | (string & {});
export type StudioLifecycleConfigArn = string;
export type StudioResourceSpecTrainingPlanArn = string;
export interface ResourceSpec {
  SageMakerImageArn?: string;
  SageMakerImageVersionArn?: string;
  SageMakerImageVersionAlias?: string;
  InstanceType?: AppInstanceType;
  LifecycleConfigArn?: string;
  TrainingPlanArn?: string;
}
export interface CreateAppRequest {
  DomainId?: string;
  UserProfileName?: string;
  SpaceName?: string;
  AppType?: AppType;
  AppName?: string;
  Tags?: Tag[];
  ResourceSpec?: ResourceSpec;
  RecoveryMode?: boolean;
}
export type AppArn = string;
export interface CreateAppResponse {
  AppArn?: string;
}
export type AppImageConfigName = string;
export type KernelName = string;
export type KernelDisplayName = string;
export interface KernelSpec {
  Name?: string;
  DisplayName?: string;
}
export type KernelSpecs = KernelSpec[];
export type MountPath = string;
export type DefaultUid = number;
export type DefaultGid = number;
export interface FileSystemConfig {
  MountPath?: string;
  DefaultUid?: number;
  DefaultGid?: number;
}
export interface KernelGatewayImageConfig {
  KernelSpecs?: KernelSpec[];
  FileSystemConfig?: FileSystemConfig;
}
export type NonEmptyString64 = string;
export type CustomImageContainerArguments = string[];
export type NonEmptyString256 = string;
export type CustomImageContainerEntrypoint = string[];
export type CustomImageContainerEnvironmentVariables = {
  [key: string]: string | undefined;
};
export interface ContainerConfig {
  ContainerArguments?: string[];
  ContainerEntrypoint?: string[];
  ContainerEnvironmentVariables?: { [key: string]: string | undefined };
}
export interface JupyterLabAppImageConfig {
  FileSystemConfig?: FileSystemConfig;
  ContainerConfig?: ContainerConfig;
}
export interface CodeEditorAppImageConfig {
  FileSystemConfig?: FileSystemConfig;
  ContainerConfig?: ContainerConfig;
}
export interface CreateAppImageConfigRequest {
  AppImageConfigName?: string;
  Tags?: Tag[];
  KernelGatewayImageConfig?: KernelGatewayImageConfig;
  JupyterLabAppImageConfig?: JupyterLabAppImageConfig;
  CodeEditorAppImageConfig?: CodeEditorAppImageConfig;
}
export type AppImageConfigArn = string;
export interface CreateAppImageConfigResponse {
  AppImageConfigArn?: string;
}
export type ArtifactSourceIdType =
  | "MD5Hash"
  | "S3ETag"
  | "S3Version"
  | "Custom"
  | (string & {});
export interface ArtifactSourceType {
  SourceIdType?: ArtifactSourceIdType;
  Value?: string;
}
export type ArtifactSourceTypes = ArtifactSourceType[];
export interface ArtifactSource {
  SourceUri?: string;
  SourceTypes?: ArtifactSourceType[];
}
export type ArtifactPropertyValue = string;
export type ArtifactProperties = { [key: string]: string | undefined };
export interface CreateArtifactRequest {
  ArtifactName?: string;
  Source?: ArtifactSource;
  ArtifactType?: string;
  Properties?: { [key: string]: string | undefined };
  MetadataProperties?: MetadataProperties;
  Tags?: Tag[];
}
export type ArtifactArn = string;
export interface CreateArtifactResponse {
  ArtifactArn?: string;
}
export type AutoMLJobName = string;
export type AutoMLS3DataType =
  | "ManifestFile"
  | "S3Prefix"
  | "AugmentedManifestFile"
  | (string & {});
export interface AutoMLS3DataSource {
  S3DataType?: AutoMLS3DataType;
  S3Uri?: string;
}
export interface AutoMLDataSource {
  S3DataSource?: AutoMLS3DataSource;
}
export type TargetAttributeName = string;
export type AutoMLChannelType = "training" | "validation" | (string & {});
export type SampleWeightAttributeName = string;
export interface AutoMLChannel {
  DataSource?: AutoMLDataSource;
  CompressionType?: CompressionType;
  TargetAttributeName?: string;
  ContentType?: string;
  ChannelType?: AutoMLChannelType;
  SampleWeightAttributeName?: string;
}
export type AutoMLInputDataConfig = AutoMLChannel[];
export interface AutoMLOutputDataConfig {
  KmsKeyId?: string;
  S3OutputPath?: string;
}
export type ProblemType =
  | "BinaryClassification"
  | "MulticlassClassification"
  | "Regression"
  | (string & {});
export type AutoMLMetricEnum =
  | "Accuracy"
  | "MSE"
  | "F1"
  | "F1macro"
  | "AUC"
  | "RMSE"
  | "BalancedAccuracy"
  | "R2"
  | "Recall"
  | "RecallMacro"
  | "Precision"
  | "PrecisionMacro"
  | "MAE"
  | "MAPE"
  | "MASE"
  | "WAPE"
  | "AverageWeightedQuantileLoss"
  | (string & {});
export interface AutoMLJobObjective {
  MetricName?: AutoMLMetricEnum;
}
export type MaxCandidates = number;
export type MaxRuntimePerTrainingJobInSeconds = number;
export type MaxAutoMLJobRuntimeInSeconds = number;
export interface AutoMLJobCompletionCriteria {
  MaxCandidates?: number;
  MaxRuntimePerTrainingJobInSeconds?: number;
  MaxAutoMLJobRuntimeInSeconds?: number;
}
export interface AutoMLSecurityConfig {
  VolumeKmsKeyId?: string;
  EnableInterContainerTrafficEncryption?: boolean;
  VpcConfig?: VpcConfig;
}
export type AutoMLAlgorithm =
  | "xgboost"
  | "linear-learner"
  | "mlp"
  | "lightgbm"
  | "catboost"
  | "randomforest"
  | "extra-trees"
  | "nn-torch"
  | "fastai"
  | "cnn-qr"
  | "deepar"
  | "prophet"
  | "npts"
  | "arima"
  | "ets"
  | (string & {});
export type AutoMLAlgorithms = AutoMLAlgorithm[];
export interface AutoMLAlgorithmConfig {
  AutoMLAlgorithms?: AutoMLAlgorithm[];
}
export type AutoMLAlgorithmsConfig = AutoMLAlgorithmConfig[];
export interface AutoMLCandidateGenerationConfig {
  FeatureSpecificationS3Uri?: string;
  AlgorithmsConfig?: AutoMLAlgorithmConfig[];
}
export type ValidationFraction = number;
export interface AutoMLDataSplitConfig {
  ValidationFraction?: number;
}
export type AutoMLMode =
  | "AUTO"
  | "ENSEMBLING"
  | "HYPERPARAMETER_TUNING"
  | (string & {});
export interface AutoMLJobConfig {
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  SecurityConfig?: AutoMLSecurityConfig;
  CandidateGenerationConfig?: AutoMLCandidateGenerationConfig;
  DataSplitConfig?: AutoMLDataSplitConfig;
  Mode?: AutoMLMode;
}
export type GenerateCandidateDefinitionsOnly = boolean;
export type AutoGenerateEndpointName = boolean;
export type EndpointName = string;
export interface ModelDeployConfig {
  AutoGenerateEndpointName?: boolean;
  EndpointName?: string;
}
export interface CreateAutoMLJobRequest {
  AutoMLJobName?: string;
  InputDataConfig?: AutoMLChannel[];
  OutputDataConfig?: AutoMLOutputDataConfig;
  ProblemType?: ProblemType;
  AutoMLJobObjective?: AutoMLJobObjective;
  AutoMLJobConfig?: AutoMLJobConfig;
  RoleArn?: string;
  GenerateCandidateDefinitionsOnly?: boolean;
  Tags?: Tag[];
  ModelDeployConfig?: ModelDeployConfig;
}
export type AutoMLJobArn = string;
export interface CreateAutoMLJobResponse {
  AutoMLJobArn: string;
}
export interface AutoMLJobChannel {
  ChannelType?: AutoMLChannelType;
  ContentType?: string;
  CompressionType?: CompressionType;
  DataSource?: AutoMLDataSource;
}
export type AutoMLJobInputDataConfig = AutoMLJobChannel[];
export interface ImageClassificationJobConfig {
  CompletionCriteria?: AutoMLJobCompletionCriteria;
}
export type ContentColumn = string;
export type TargetLabelColumn = string;
export interface TextClassificationJobConfig {
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  ContentColumn?: string;
  TargetLabelColumn?: string;
}
export type ForecastFrequency = string;
export type ForecastHorizon = number;
export type ForecastQuantile = string;
export type ForecastQuantiles = string[];
export type TransformationAttributeName = string;
export type FillingType =
  | "frontfill"
  | "middlefill"
  | "backfill"
  | "futurefill"
  | "frontfill_value"
  | "middlefill_value"
  | "backfill_value"
  | "futurefill_value"
  | (string & {});
export type FillingTransformationValue = string;
export type FillingTransformationMap = { [key in FillingType]?: string };
export type FillingTransformations = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export type AggregationTransformationValue =
  | "sum"
  | "avg"
  | "first"
  | "min"
  | "max"
  | (string & {});
export type AggregationTransformations = {
  [key: string]: AggregationTransformationValue | undefined;
};
export interface TimeSeriesTransformations {
  Filling?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  Aggregation?: { [key: string]: AggregationTransformationValue | undefined };
}
export type TimestampAttributeName = string;
export type ItemIdentifierAttributeName = string;
export type GroupingAttributeName = string;
export type GroupingAttributeNames = string[];
export interface TimeSeriesConfig {
  TargetAttributeName?: string;
  TimestampAttributeName?: string;
  ItemIdentifierAttributeName?: string;
  GroupingAttributeNames?: string[];
}
export type CountryCode = string;
export interface HolidayConfigAttributes {
  CountryCode?: string;
}
export type HolidayConfig = HolidayConfigAttributes[];
export interface CandidateGenerationConfig {
  AlgorithmsConfig?: AutoMLAlgorithmConfig[];
}
export interface TimeSeriesForecastingJobConfig {
  FeatureSpecificationS3Uri?: string;
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  ForecastFrequency?: string;
  ForecastHorizon?: number;
  ForecastQuantiles?: string[];
  Transformations?: TimeSeriesTransformations;
  TimeSeriesConfig?: TimeSeriesConfig;
  HolidayConfig?: HolidayConfigAttributes[];
  CandidateGenerationConfig?: CandidateGenerationConfig;
}
export interface TabularJobConfig {
  CandidateGenerationConfig?: CandidateGenerationConfig;
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  FeatureSpecificationS3Uri?: string;
  Mode?: AutoMLMode;
  GenerateCandidateDefinitionsOnly?: boolean;
  ProblemType?: ProblemType;
  TargetAttributeName?: string;
  SampleWeightAttributeName?: string;
}
export type BaseModelName = string;
export type TextGenerationHyperParameterKey = string;
export type TextGenerationHyperParameterValue = string;
export type TextGenerationHyperParameters = {
  [key: string]: string | undefined;
};
export interface TextGenerationJobConfig {
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  BaseModelName?: string;
  TextGenerationHyperParameters?: { [key: string]: string | undefined };
  ModelAccessConfig?: ModelAccessConfig;
}
export type AutoMLProblemTypeConfig =
  | {
      ImageClassificationJobConfig: ImageClassificationJobConfig;
      TextClassificationJobConfig?: never;
      TimeSeriesForecastingJobConfig?: never;
      TabularJobConfig?: never;
      TextGenerationJobConfig?: never;
    }
  | {
      ImageClassificationJobConfig?: never;
      TextClassificationJobConfig: TextClassificationJobConfig;
      TimeSeriesForecastingJobConfig?: never;
      TabularJobConfig?: never;
      TextGenerationJobConfig?: never;
    }
  | {
      ImageClassificationJobConfig?: never;
      TextClassificationJobConfig?: never;
      TimeSeriesForecastingJobConfig: TimeSeriesForecastingJobConfig;
      TabularJobConfig?: never;
      TextGenerationJobConfig?: never;
    }
  | {
      ImageClassificationJobConfig?: never;
      TextClassificationJobConfig?: never;
      TimeSeriesForecastingJobConfig?: never;
      TabularJobConfig: TabularJobConfig;
      TextGenerationJobConfig?: never;
    }
  | {
      ImageClassificationJobConfig?: never;
      TextClassificationJobConfig?: never;
      TimeSeriesForecastingJobConfig?: never;
      TabularJobConfig?: never;
      TextGenerationJobConfig: TextGenerationJobConfig;
    };
export interface EmrServerlessComputeConfig {
  ExecutionRoleARN?: string;
}
export interface AutoMLComputeConfig {
  EmrServerlessComputeConfig?: EmrServerlessComputeConfig;
}
export interface CreateAutoMLJobV2Request {
  AutoMLJobName?: string;
  AutoMLJobInputDataConfig?: AutoMLJobChannel[];
  OutputDataConfig?: AutoMLOutputDataConfig;
  AutoMLProblemTypeConfig?: AutoMLProblemTypeConfig;
  RoleArn?: string;
  Tags?: Tag[];
  SecurityConfig?: AutoMLSecurityConfig;
  AutoMLJobObjective?: AutoMLJobObjective;
  ModelDeployConfig?: ModelDeployConfig;
  DataSplitConfig?: AutoMLDataSplitConfig;
  AutoMLComputeConfig?: AutoMLComputeConfig;
}
export interface CreateAutoMLJobV2Response {
  AutoMLJobArn: string;
}
export type ClusterName = string;
export type ClusterInstanceCount = number;
export interface ClusterInstanceRequirements {
  InstanceTypes?: ClusterInstanceType[];
}
export type ClusterLifeCycleConfigFileName = string;
export interface ClusterLifeCycleConfig {
  SourceS3Uri?: string;
  OnCreate?: string;
  OnInitComplete?: string;
}
export type ClusterThreadsPerCore = number;
export type ClusterEbsVolumeSizeInGB = number;
export interface ClusterEbsVolumeConfig {
  VolumeSizeInGB?: number;
  VolumeKmsKeyId?: string;
  RootVolume?: boolean;
}
export type ClusterDnsName = string;
export type ClusterMountName = string;
export type ClusterFsxMountPath = string;
export interface ClusterFsxLustreConfig {
  DnsName: string;
  MountName: string;
  MountPath?: string;
}
export interface ClusterFsxOpenZfsConfig {
  DnsName: string;
  MountPath?: string;
}
export type ClusterInstanceStorageConfig =
  | {
      EbsVolumeConfig: ClusterEbsVolumeConfig;
      FsxLustreConfig?: never;
      FsxOpenZfsConfig?: never;
    }
  | {
      EbsVolumeConfig?: never;
      FsxLustreConfig: ClusterFsxLustreConfig;
      FsxOpenZfsConfig?: never;
    }
  | {
      EbsVolumeConfig?: never;
      FsxLustreConfig?: never;
      FsxOpenZfsConfig: ClusterFsxOpenZfsConfig;
    };
export type ClusterInstanceStorageConfigs = ClusterInstanceStorageConfig[];
export type DeepHealthCheckType =
  | "InstanceStress"
  | "InstanceConnectivity"
  | (string & {});
export type OnStartDeepHealthChecks = DeepHealthCheckType[];
export type CronScheduleExpression = string;
export type NodeUnavailabilityType =
  | "INSTANCE_COUNT"
  | "CAPACITY_PERCENTAGE"
  | (string & {});
export type NodeUnavailabilityValue = number;
export interface CapacitySizeConfig {
  Type?: NodeUnavailabilityType;
  Value?: number;
}
export interface RollingDeploymentPolicy {
  MaximumBatchSize?: CapacitySizeConfig;
  RollbackMaximumBatchSize?: CapacitySizeConfig;
}
export type WaitTimeIntervalInSeconds = number;
export type AlarmName = string;
export interface AlarmDetails {
  AlarmName?: string;
}
export type AutoRollbackAlarms = AlarmDetails[];
export interface DeploymentConfiguration {
  RollingUpdatePolicy?: RollingDeploymentPolicy;
  WaitIntervalInSeconds?: number;
  AutoRollbackConfiguration?: AlarmDetails[];
}
export interface ScheduledUpdateConfig {
  ScheduleExpression?: string;
  DeploymentConfig?: DeploymentConfiguration;
}
export type ImageId = string;
export type ClusterPatchingStrategy =
  | "WhenIdle"
  | "WhenAllIdle"
  | (string & {});
export interface ClusterPatchSchedule {
  NextPatchDate?: Date;
}
export interface ClusterAutoPatchConfig {
  PatchingStrategy: ClusterPatchingStrategy;
  PatchSchedule?: ClusterPatchSchedule;
  DeploymentConfig?: DeploymentConfiguration;
}
export type ImageReleaseVersion = string;
export type ClusterKubernetesLabelKey = string;
export type ClusterKubernetesLabelValue = string;
export type ClusterKubernetesLabels = { [key: string]: string | undefined };
export type ClusterKubernetesTaintKey = string;
export type ClusterKubernetesTaintValue = string;
export type ClusterKubernetesTaintEffect =
  | "NoSchedule"
  | "PreferNoSchedule"
  | "NoExecute"
  | (string & {});
export interface ClusterKubernetesTaint {
  Key: string;
  Value?: string;
  Effect: ClusterKubernetesTaintEffect;
}
export type ClusterKubernetesTaints = ClusterKubernetesTaint[];
export interface ClusterKubernetesConfig {
  Labels?: { [key: string]: string | undefined };
  Taints?: ClusterKubernetesTaint[];
}
export type ClusterSlurmNodeType =
  | "Controller"
  | "Login"
  | "Compute"
  | (string & {});
export type ClusterPartitionName = string;
export type ClusterPartitionNames = string[];
export interface ClusterSlurmConfig {
  NodeType: ClusterSlurmNodeType;
  PartitionNames?: string[];
}
export interface ClusterSpotOptions {}
export interface ClusterOnDemandOptions {}
export interface ClusterCapacityRequirements {
  Spot?: ClusterSpotOptions;
  OnDemand?: ClusterOnDemandOptions;
}
export type ClusterInterfaceType = "efa" | "efa-only" | (string & {});
export interface ClusterNetworkInterface {
  InterfaceType?: ClusterInterfaceType;
}
export interface ClusterInstanceGroupSpecification {
  InstanceCount?: number;
  MinInstanceCount?: number;
  InstanceGroupName?: string;
  InstanceType?: ClusterInstanceType;
  InstanceRequirements?: ClusterInstanceRequirements;
  LifeCycleConfig?: ClusterLifeCycleConfig;
  ExecutionRole?: string;
  ThreadsPerCore?: number;
  InstanceStorageConfigs?: ClusterInstanceStorageConfig[];
  OnStartDeepHealthChecks?: DeepHealthCheckType[];
  TrainingPlanArn?: string;
  OverrideVpcConfig?: VpcConfig;
  ScheduledUpdateConfig?: ScheduledUpdateConfig;
  ImageId?: string;
  AutoPatchConfig?: ClusterAutoPatchConfig;
  ImageReleaseVersion?: string;
  KubernetesConfig?: ClusterKubernetesConfig;
  SlurmConfig?: ClusterSlurmConfig;
  CapacityRequirements?: ClusterCapacityRequirements;
  NetworkInterface?: ClusterNetworkInterface;
}
export type ClusterInstanceGroupSpecifications =
  ClusterInstanceGroupSpecification[];
export type FSxLustreSizeInGiB = number;
export type FSxLustrePerUnitStorageThroughput = number;
export interface FSxLustreConfig {
  SizeInGiB?: number;
  PerUnitStorageThroughput?: number;
}
export interface EnvironmentConfig {
  FSxLustreConfig?: FSxLustreConfig;
}
export interface ClusterRestrictedInstanceGroupSpecification {
  InstanceCount?: number;
  InstanceGroupName?: string;
  InstanceType?: ClusterInstanceType;
  ExecutionRole?: string;
  ThreadsPerCore?: number;
  InstanceStorageConfigs?: ClusterInstanceStorageConfig[];
  OnStartDeepHealthChecks?: DeepHealthCheckType[];
  TrainingPlanArn?: string;
  OverrideVpcConfig?: VpcConfig;
  ScheduledUpdateConfig?: ScheduledUpdateConfig;
  EnvironmentConfig?: EnvironmentConfig;
}
export type ClusterRestrictedInstanceGroupSpecifications =
  ClusterRestrictedInstanceGroupSpecification[];
export type ClusterFSxLustreDeletionPolicy =
  | "DeleteIfNotUsed"
  | "Keep"
  | (string & {});
export interface ClusterSharedEnvironmentConfig {
  FSxLustreDeletionPolicy?: ClusterFSxLustreDeletionPolicy;
  FSxLustreConfig?: FSxLustreConfig;
}
export interface ClusterRestrictedInstanceGroupsConfig {
  SharedEnvironmentConfig?: ClusterSharedEnvironmentConfig;
}
export type EksClusterArn = string;
export interface ClusterOrchestratorEksConfig {
  ClusterArn?: string;
}
export type ClusterSlurmConfigStrategy =
  | "Overwrite"
  | "Managed"
  | "Merge"
  | (string & {});
export interface ClusterOrchestratorSlurmConfig {
  SlurmConfigStrategy?: ClusterSlurmConfigStrategy;
}
export interface ClusterOrchestrator {
  Eks?: ClusterOrchestratorEksConfig;
  Slurm?: ClusterOrchestratorSlurmConfig;
}
export type ClusterNodeRecovery = "Automatic" | "None" | (string & {});
export type ClusterConfigMode = "Enable" | "Disable" | (string & {});
export type ClusterInstanceMemoryAllocationPercentage = number;
export interface ClusterTieredStorageConfig {
  Mode?: ClusterConfigMode;
  InstanceMemoryAllocationPercentage?: number;
}
export type ClusterNodeProvisioningMode = "Continuous" | (string & {});
export type ClusterAutoScalingMode = "Enable" | "Disable" | (string & {});
export type ClusterAutoScalerType = "Karpenter" | (string & {});
export interface ClusterAutoScalingConfig {
  Mode: ClusterAutoScalingMode;
  AutoScalerType?: ClusterAutoScalerType;
}
export interface CreateClusterRequest {
  ClusterName?: string;
  InstanceGroups?: ClusterInstanceGroupSpecification[];
  RestrictedInstanceGroups?: ClusterRestrictedInstanceGroupSpecification[];
  RestrictedInstanceGroupsConfig?: ClusterRestrictedInstanceGroupsConfig;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
  Orchestrator?: ClusterOrchestrator;
  NodeRecovery?: ClusterNodeRecovery;
  TieredStorageConfig?: ClusterTieredStorageConfig;
  NodeProvisioningMode?: ClusterNodeProvisioningMode;
  ClusterRole?: string;
  AutoScaling?: ClusterAutoScalingConfig;
}
export interface CreateClusterResponse {
  ClusterArn: string;
}
export type ClusterSchedulerPriorityClassName = string;
export type PriorityWeight = number;
export interface PriorityClass {
  Name?: string;
  Weight?: number;
}
export type PriorityClassList = PriorityClass[];
export type FairShare = "Enabled" | "Disabled" | (string & {});
export type IdleResourceSharing = "Enabled" | "Disabled" | (string & {});
export interface SchedulerConfig {
  PriorityClasses?: PriorityClass[];
  FairShare?: FairShare;
  IdleResourceSharing?: IdleResourceSharing;
}
export interface CreateClusterSchedulerConfigRequest {
  Name?: string;
  ClusterArn?: string;
  SchedulerConfig?: SchedulerConfig;
  Description?: string;
  Tags?: Tag[];
}
export type ClusterSchedulerConfigArn = string;
export type ClusterSchedulerConfigId = string;
export interface CreateClusterSchedulerConfigResponse {
  ClusterSchedulerConfigArn: string;
  ClusterSchedulerConfigId: string;
}
export type GitConfigUrl = string;
export type Branch = string;
export type SecretArn = string;
export interface GitConfig {
  RepositoryUrl?: string;
  Branch?: string;
  SecretArn?: string;
}
export interface CreateCodeRepositoryInput {
  CodeRepositoryName?: string;
  GitConfig?: GitConfig;
  Tags?: Tag[];
}
export type CodeRepositoryArn = string;
export interface CreateCodeRepositoryOutput {
  CodeRepositoryArn: string;
}
export type Framework =
  | "TENSORFLOW"
  | "KERAS"
  | "MXNET"
  | "ONNX"
  | "PYTORCH"
  | "XGBOOST"
  | "TFLITE"
  | "DARKNET"
  | "SKLEARN"
  | (string & {});
export type FrameworkVersion = string;
export interface InputConfig {
  S3Uri?: string;
  DataInputConfig?: string;
  Framework?: Framework;
  FrameworkVersion?: string;
}
export type TargetDevice =
  | "lambda"
  | "ml_m4"
  | "ml_m5"
  | "ml_m6g"
  | "ml_c4"
  | "ml_c5"
  | "ml_c6g"
  | "ml_p2"
  | "ml_p3"
  | "ml_g4dn"
  | "ml_inf1"
  | "ml_inf2"
  | "ml_trn1"
  | "ml_eia2"
  | "jetson_tx1"
  | "jetson_tx2"
  | "jetson_nano"
  | "jetson_xavier"
  | "rasp3b"
  | "rasp4b"
  | "imx8qm"
  | "deeplens"
  | "rk3399"
  | "rk3288"
  | "aisage"
  | "sbe_c"
  | "qcs605"
  | "qcs603"
  | "sitara_am57x"
  | "amba_cv2"
  | "amba_cv22"
  | "amba_cv25"
  | "x86_win32"
  | "x86_win64"
  | "coreml"
  | "jacinto_tda4vm"
  | "imx8mplus"
  | (string & {});
export type TargetPlatformOs = "ANDROID" | "LINUX" | (string & {});
export type TargetPlatformArch =
  | "X86_64"
  | "X86"
  | "ARM64"
  | "ARM_EABI"
  | "ARM_EABIHF"
  | (string & {});
export type TargetPlatformAccelerator =
  | "INTEL_GRAPHICS"
  | "MALI"
  | "NVIDIA"
  | "NNA"
  | (string & {});
export interface TargetPlatform {
  Os?: TargetPlatformOs;
  Arch?: TargetPlatformArch;
  Accelerator?: TargetPlatformAccelerator;
}
export type CompilerOptions = string;
export interface OutputConfig {
  S3OutputLocation?: string;
  TargetDevice?: TargetDevice;
  TargetPlatform?: TargetPlatform;
  CompilerOptions?: string;
  KmsKeyId?: string;
}
export type NeoVpcSecurityGroupId = string;
export type NeoVpcSecurityGroupIds = string[];
export type NeoVpcSubnetId = string;
export type NeoVpcSubnets = string[];
export interface NeoVpcConfig {
  SecurityGroupIds?: string[];
  Subnets?: string[];
}
export interface CreateCompilationJobRequest {
  CompilationJobName?: string;
  RoleArn?: string;
  ModelPackageVersionArn?: string;
  InputConfig?: InputConfig;
  OutputConfig?: OutputConfig;
  VpcConfig?: NeoVpcConfig;
  StoppingCondition?: StoppingCondition;
  Tags?: Tag[];
}
export type CompilationJobArn = string;
export interface CreateCompilationJobResponse {
  CompilationJobArn: string;
}
export type InstanceCount = number;
export type AcceleratorsAmount = number;
export type VCpuAmount = number;
export type MemoryInGiBAmount = number;
export type MIGProfileType =
  | "mig-1g.5gb"
  | "mig-1g.10gb"
  | "mig-1g.18gb"
  | "mig-1g.20gb"
  | "mig-1g.23gb"
  | "mig-1g.35gb"
  | "mig-1g.45gb"
  | "mig-1g.47gb"
  | "mig-2g.10gb"
  | "mig-2g.20gb"
  | "mig-2g.35gb"
  | "mig-2g.45gb"
  | "mig-2g.47gb"
  | "mig-3g.20gb"
  | "mig-3g.40gb"
  | "mig-3g.71gb"
  | "mig-3g.90gb"
  | "mig-3g.93gb"
  | "mig-4g.20gb"
  | "mig-4g.40gb"
  | "mig-4g.71gb"
  | "mig-4g.90gb"
  | "mig-4g.93gb"
  | "mig-7g.40gb"
  | "mig-7g.80gb"
  | "mig-7g.141gb"
  | "mig-7g.180gb"
  | "mig-7g.186gb"
  | (string & {});
export interface AcceleratorPartitionConfig {
  Type?: MIGProfileType;
  Count?: number;
}
export interface ComputeQuotaResourceConfig {
  InstanceType?: ClusterInstanceType;
  Count?: number;
  Accelerators?: number;
  VCpu?: number;
  MemoryInGiB?: number;
  AcceleratorPartition?: AcceleratorPartitionConfig;
}
export type ComputeQuotaResourceConfigList = ComputeQuotaResourceConfig[];
export type ResourceSharingStrategy =
  | "Lend"
  | "DontLend"
  | "LendAndBorrow"
  | (string & {});
export type BorrowLimit = number;
export type AbsoluteBorrowLimitResourceList = ComputeQuotaResourceConfig[];
export interface ResourceSharingConfig {
  Strategy?: ResourceSharingStrategy;
  BorrowLimit?: number;
  AbsoluteBorrowLimits?: ComputeQuotaResourceConfig[];
}
export type PreemptTeamTasks = "Never" | "LowerPriority" | (string & {});
export interface ComputeQuotaConfig {
  ComputeQuotaResources?: ComputeQuotaResourceConfig[];
  ResourceSharingConfig?: ResourceSharingConfig;
  PreemptTeamTasks?: PreemptTeamTasks;
}
export type ComputeQuotaTargetTeamName = string;
export type FairShareWeight = number;
export interface ComputeQuotaTarget {
  TeamName?: string;
  FairShareWeight?: number;
}
export type ActivationState = "Enabled" | "Disabled" | (string & {});
export interface CreateComputeQuotaRequest {
  Name?: string;
  Description?: string;
  ClusterArn?: string;
  ComputeQuotaConfig?: ComputeQuotaConfig;
  ComputeQuotaTarget?: ComputeQuotaTarget;
  ActivationState?: ActivationState;
  Tags?: Tag[];
}
export type ComputeQuotaArn = string;
export type ComputeQuotaId = string;
export interface CreateComputeQuotaResponse {
  ComputeQuotaArn: string;
  ComputeQuotaId: string;
}
export type ContextName = string;
export interface ContextSource {
  SourceUri?: string;
  SourceType?: string;
  SourceId?: string;
}
export interface CreateContextRequest {
  ContextName?: string;
  Source?: ContextSource;
  ContextType?: string;
  Description?: string;
  Properties?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export type ContextArn = string;
export interface CreateContextResponse {
  ContextArn?: string;
}
export type MonitoringJobDefinitionName = string;
export type ProcessingJobName = string;
export interface MonitoringConstraintsResource {
  S3Uri?: string;
}
export interface MonitoringStatisticsResource {
  S3Uri?: string;
}
export interface DataQualityBaselineConfig {
  BaseliningJobName?: string;
  ConstraintsResource?: MonitoringConstraintsResource;
  StatisticsResource?: MonitoringStatisticsResource;
}
export type ImageUri = string;
export type ContainerEntrypointString = string;
export type ContainerEntrypoint = string[];
export type ContainerArgument = string;
export type MonitoringContainerArguments = string[];
export type ProcessingEnvironmentKey = string;
export type ProcessingEnvironmentValue = string;
export type MonitoringEnvironmentMap = { [key: string]: string | undefined };
export interface DataQualityAppSpecification {
  ImageUri?: string;
  ContainerEntrypoint?: string[];
  ContainerArguments?: string[];
  RecordPreprocessorSourceUri?: string;
  PostAnalyticsProcessorSourceUri?: string;
  Environment?: { [key: string]: string | undefined };
}
export type ProcessingLocalPath = string;
export type ProcessingS3InputMode = "Pipe" | "File" | (string & {});
export type ProcessingS3DataDistributionType =
  | "FullyReplicated"
  | "ShardedByS3Key"
  | (string & {});
export type ProbabilityThresholdAttribute = number;
export type MonitoringTimeOffsetString = string;
export type ExcludeFeaturesAttribute = string;
export interface EndpointInput {
  EndpointName?: string;
  LocalPath?: string;
  S3InputMode?: ProcessingS3InputMode;
  S3DataDistributionType?: ProcessingS3DataDistributionType;
  FeaturesAttribute?: string;
  InferenceAttribute?: string;
  ProbabilityAttribute?: string;
  ProbabilityThresholdAttribute?: number;
  StartTimeOffset?: string;
  EndTimeOffset?: string;
  ExcludeFeaturesAttribute?: string;
}
export type DestinationS3Uri = string;
export interface MonitoringCsvDatasetFormat {
  Header?: boolean;
}
export interface MonitoringJsonDatasetFormat {
  Line?: boolean;
}
export interface MonitoringParquetDatasetFormat {}
export interface MonitoringDatasetFormat {
  Csv?: MonitoringCsvDatasetFormat;
  Json?: MonitoringJsonDatasetFormat;
  Parquet?: MonitoringParquetDatasetFormat;
}
export interface BatchTransformInput {
  DataCapturedDestinationS3Uri?: string;
  DatasetFormat?: MonitoringDatasetFormat;
  LocalPath?: string;
  S3InputMode?: ProcessingS3InputMode;
  S3DataDistributionType?: ProcessingS3DataDistributionType;
  FeaturesAttribute?: string;
  InferenceAttribute?: string;
  ProbabilityAttribute?: string;
  ProbabilityThresholdAttribute?: number;
  StartTimeOffset?: string;
  EndTimeOffset?: string;
  ExcludeFeaturesAttribute?: string;
}
export interface DataQualityJobInput {
  EndpointInput?: EndpointInput;
  BatchTransformInput?: BatchTransformInput;
}
export type MonitoringS3Uri = string;
export type ProcessingS3UploadMode = "Continuous" | "EndOfJob" | (string & {});
export interface MonitoringS3Output {
  S3Uri?: string;
  LocalPath?: string;
  S3UploadMode?: ProcessingS3UploadMode;
}
export interface MonitoringOutput {
  S3Output?: MonitoringS3Output;
}
export type MonitoringOutputs = MonitoringOutput[];
export interface MonitoringOutputConfig {
  MonitoringOutputs?: MonitoringOutput[];
  KmsKeyId?: string;
}
export type ProcessingInstanceCount = number;
export type ProcessingInstanceType =
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.r5d.large"
  | "ml.r5d.xlarge"
  | "ml.r5d.2xlarge"
  | "ml.r5d.4xlarge"
  | "ml.r5d.8xlarge"
  | "ml.r5d.12xlarge"
  | "ml.r5d.16xlarge"
  | "ml.r5d.24xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.p5.4xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | (string & {});
export type ProcessingVolumeSizeInGB = number;
export interface MonitoringClusterConfig {
  InstanceCount?: number;
  InstanceType?: ProcessingInstanceType;
  VolumeSizeInGB?: number;
  VolumeKmsKeyId?: string;
}
export interface MonitoringResources {
  ClusterConfig?: MonitoringClusterConfig;
}
export interface MonitoringNetworkConfig {
  EnableInterContainerTrafficEncryption?: boolean;
  EnableNetworkIsolation?: boolean;
  VpcConfig?: VpcConfig;
}
export type MonitoringMaxRuntimeInSeconds = number;
export interface MonitoringStoppingCondition {
  MaxRuntimeInSeconds?: number;
}
export interface CreateDataQualityJobDefinitionRequest {
  JobDefinitionName?: string;
  DataQualityBaselineConfig?: DataQualityBaselineConfig;
  DataQualityAppSpecification?: DataQualityAppSpecification;
  DataQualityJobInput?: DataQualityJobInput;
  DataQualityJobOutputConfig?: MonitoringOutputConfig;
  JobResources?: MonitoringResources;
  NetworkConfig?: MonitoringNetworkConfig;
  RoleArn?: string;
  StoppingCondition?: MonitoringStoppingCondition;
  Tags?: Tag[];
}
export type MonitoringJobDefinitionArn = string;
export interface CreateDataQualityJobDefinitionResponse {
  JobDefinitionArn: string;
}
export type DeviceFleetDescription = string;
export type EdgePresetDeploymentType = "GreengrassV2Component" | (string & {});
export interface EdgeOutputConfig {
  S3OutputLocation?: string;
  KmsKeyId?: string;
  PresetDeploymentType?: EdgePresetDeploymentType;
  PresetDeploymentConfig?: string;
}
export type EnableIotRoleAlias = boolean;
export interface CreateDeviceFleetRequest {
  DeviceFleetName?: string;
  RoleArn?: string;
  Description?: string;
  OutputConfig?: EdgeOutputConfig;
  Tags?: Tag[];
  EnableIotRoleAlias?: boolean;
}
export interface CreateDeviceFleetResponse {}
export type DomainName = string;
export type AuthMode = "SSO" | "IAM" | (string & {});
export type SecurityGroupIds = string[];
export type NotebookOutputOption = "Allowed" | "Disabled" | (string & {});
export interface SharingSettings {
  NotebookOutputOption?: NotebookOutputOption;
  S3OutputPath?: string;
  S3KmsKeyId?: string;
}
export type LifecycleConfigArns = string[];
export type RepositoryUrl = string;
export interface CodeRepository {
  RepositoryUrl?: string;
}
export type CodeRepositories = CodeRepository[];
export interface JupyterServerAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  LifecycleConfigArns?: string[];
  CodeRepositories?: CodeRepository[];
}
export type ImageName = string;
export type ImageVersionNumber = number;
export interface CustomImage {
  ImageName?: string;
  ImageVersionNumber?: number;
  AppImageConfigName?: string;
}
export type CustomImages = CustomImage[];
export interface KernelGatewayAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  CustomImages?: CustomImage[];
  LifecycleConfigArns?: string[];
}
export interface TensorBoardAppSettings {
  DefaultResourceSpec?: ResourceSpec;
}
export type RStudioServerProAccessStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type RStudioServerProUserGroup =
  | "R_STUDIO_ADMIN"
  | "R_STUDIO_USER"
  | (string & {});
export interface RStudioServerProAppSettings {
  AccessStatus?: RStudioServerProAccessStatus;
  UserGroup?: RStudioServerProUserGroup;
}
export interface RSessionAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  CustomImages?: CustomImage[];
}
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export interface TimeSeriesForecastingSettings {
  Status?: FeatureStatus;
  AmazonForecastRoleArn?: string;
}
export interface ModelRegisterSettings {
  Status?: FeatureStatus;
  CrossAccountModelRegisterRoleArn?: string;
}
export interface WorkspaceSettings {
  S3ArtifactPath?: string;
  S3KmsKeyId?: string;
}
export type DataSourceName = "SalesforceGenie" | "Snowflake" | (string & {});
export interface IdentityProviderOAuthSetting {
  DataSourceName?: DataSourceName;
  Status?: FeatureStatus;
  SecretArn?: string;
}
export type IdentityProviderOAuthSettings = IdentityProviderOAuthSetting[];
export interface DirectDeploySettings {
  Status?: FeatureStatus;
}
export interface KendraSettings {
  Status?: FeatureStatus;
}
export interface GenerativeAiSettings {
  AmazonBedrockRoleArn?: string;
}
export interface EmrServerlessSettings {
  ExecutionRoleArn?: string;
  Status?: FeatureStatus;
}
export interface CanvasAppSettings {
  TimeSeriesForecastingSettings?: TimeSeriesForecastingSettings;
  ModelRegisterSettings?: ModelRegisterSettings;
  WorkspaceSettings?: WorkspaceSettings;
  IdentityProviderOAuthSettings?: IdentityProviderOAuthSetting[];
  DirectDeploySettings?: DirectDeploySettings;
  KendraSettings?: KendraSettings;
  GenerativeAiSettings?: GenerativeAiSettings;
  EmrServerlessSettings?: EmrServerlessSettings;
}
export type LifecycleManagement = "ENABLED" | "DISABLED" | (string & {});
export type IdleTimeoutInMinutes = number;
export interface IdleSettings {
  LifecycleManagement?: LifecycleManagement;
  IdleTimeoutInMinutes?: number;
  MinIdleTimeoutInMinutes?: number;
  MaxIdleTimeoutInMinutes?: number;
}
export interface AppLifecycleManagement {
  IdleSettings?: IdleSettings;
}
export interface CodeEditorAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  CustomImages?: CustomImage[];
  LifecycleConfigArns?: string[];
  AppLifecycleManagement?: AppLifecycleManagement;
  BuiltInLifecycleConfigArn?: string;
}
export type AssumableRoleArns = string[];
export type ExecutionRoleArns = string[];
export interface EmrSettings {
  AssumableRoleArns?: string[];
  ExecutionRoleArns?: string[];
}
export interface JupyterLabAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  CustomImages?: CustomImage[];
  LifecycleConfigArns?: string[];
  CodeRepositories?: CodeRepository[];
  AppLifecycleManagement?: AppLifecycleManagement;
  EmrSettings?: EmrSettings;
  BuiltInLifecycleConfigArn?: string;
}
export type SpaceEbsVolumeSizeInGb = number;
export interface DefaultEbsStorageSettings {
  DefaultEbsVolumeSizeInGb?: number;
  MaximumEbsVolumeSizeInGb?: number;
}
export interface DefaultSpaceStorageSettings {
  DefaultEbsStorageSettings?: DefaultEbsStorageSettings;
}
export type LandingUri = string;
export type StudioWebPortal = "ENABLED" | "DISABLED" | (string & {});
export type Uid = number;
export type Gid = number;
export interface CustomPosixUserConfig {
  Uid?: number;
  Gid?: number;
}
export type FileSystemPath = string;
export interface EFSFileSystemConfig {
  FileSystemId?: string;
  FileSystemPath?: string;
}
export interface FSxLustreFileSystemConfig {
  FileSystemId?: string;
  FileSystemPath?: string;
}
export type String1024 = string;
export type S3SchemaUri = string;
export interface S3FileSystemConfig {
  MountPath?: string;
  S3Uri?: string;
}
export type CustomFileSystemConfig =
  | {
      EFSFileSystemConfig: EFSFileSystemConfig;
      FSxLustreFileSystemConfig?: never;
      S3FileSystemConfig?: never;
    }
  | {
      EFSFileSystemConfig?: never;
      FSxLustreFileSystemConfig: FSxLustreFileSystemConfig;
      S3FileSystemConfig?: never;
    }
  | {
      EFSFileSystemConfig?: never;
      FSxLustreFileSystemConfig?: never;
      S3FileSystemConfig: S3FileSystemConfig;
    };
export type CustomFileSystemConfigs = CustomFileSystemConfig[];
export type MlTools =
  | "DataWrangler"
  | "FeatureStore"
  | "EmrClusters"
  | "AutoMl"
  | "Experiments"
  | "Training"
  | "ModelEvaluation"
  | "Pipelines"
  | "Models"
  | "JumpStart"
  | "InferenceRecommender"
  | "Endpoints"
  | "Projects"
  | "InferenceOptimization"
  | "PerformanceEvaluation"
  | "LakeraGuard"
  | "Comet"
  | "DeepchecksLLMEvaluation"
  | "Fiddler"
  | "HyperPodClusters"
  | "RunningInstances"
  | "Datasets"
  | "Evaluators"
  | (string & {});
export type HiddenMlToolsList = MlTools[];
export type HiddenAppTypesList = AppType[];
export type HiddenInstanceTypesList = AppInstanceType[];
export type SageMakerImageName = "sagemaker_distribution" | (string & {});
export type ImageVersionAliasPattern = string;
export type VersionAliasesList = string[];
export interface HiddenSageMakerImage {
  SageMakerImageName?: SageMakerImageName;
  VersionAliases?: string[];
}
export type HiddenSageMakerImageVersionAliasesList = HiddenSageMakerImage[];
export type ExecutionRoleSessionNameMode =
  | "STATIC"
  | "USER_IDENTITY"
  | (string & {});
export interface StudioWebPortalSettings {
  HiddenMlTools?: MlTools[];
  HiddenAppTypes?: AppType[];
  HiddenInstanceTypes?: AppInstanceType[];
  HiddenSageMakerImageVersionAliases?: HiddenSageMakerImage[];
  ExecutionRoleSessionNameMode?: ExecutionRoleSessionNameMode;
}
export type AutoMountHomeEFS =
  | "Enabled"
  | "Disabled"
  | "DefaultAsDomain"
  | (string & {});
export interface UserSettings {
  ExecutionRole?: string;
  SecurityGroups?: string[];
  SharingSettings?: SharingSettings;
  JupyterServerAppSettings?: JupyterServerAppSettings;
  KernelGatewayAppSettings?: KernelGatewayAppSettings;
  TensorBoardAppSettings?: TensorBoardAppSettings;
  RStudioServerProAppSettings?: RStudioServerProAppSettings;
  RSessionAppSettings?: RSessionAppSettings;
  CanvasAppSettings?: CanvasAppSettings;
  CodeEditorAppSettings?: CodeEditorAppSettings;
  JupyterLabAppSettings?: JupyterLabAppSettings;
  SpaceStorageSettings?: DefaultSpaceStorageSettings;
  DefaultLandingUri?: string;
  StudioWebPortal?: StudioWebPortal;
  CustomPosixUserConfig?: CustomPosixUserConfig;
  CustomFileSystemConfigs?: CustomFileSystemConfig[];
  StudioWebPortalSettings?: StudioWebPortalSettings;
  AutoMountHomeEFS?: AutoMountHomeEFS;
}
export type DomainSecurityGroupIds = string[];
export interface RStudioServerProDomainSettings {
  DomainExecutionRoleArn?: string;
  RStudioConnectUrl?: string;
  RStudioPackageManagerUrl?: string;
  DefaultResourceSpec?: ResourceSpec;
}
export type ExecutionRoleIdentityConfig =
  | "USER_PROFILE_NAME"
  | "DISABLED"
  | (string & {});
export interface TrustedIdentityPropagationSettings {
  Status?: FeatureStatus;
}
export type AccountId = string;
export type VpcOnlyTrustedAccounts = string[];
export interface DockerSettings {
  EnableDockerAccess?: FeatureStatus;
  VpcOnlyTrustedAccounts?: string[];
  RootlessDocker?: FeatureStatus;
}
export type QProfileArn = string;
export interface AmazonQSettings {
  Status?: FeatureStatus;
  QProfileArn?: string;
}
export type RegionName = string;
export type UnifiedStudioDomainId = string;
export type UnifiedStudioProjectId = string;
export type UnifiedStudioEnvironmentId = string;
export type SingleSignOnApplicationArn = string;
export interface UnifiedStudioSettings {
  StudioWebPortalAccess?: FeatureStatus;
  DomainAccountId?: string;
  DomainRegion?: string;
  DomainId?: string;
  ProjectId?: string;
  EnvironmentId?: string;
  ProjectS3Path?: string;
  SingleSignOnApplicationArn?: string;
}
export type IPAddressType = "ipv4" | "dualstack" | (string & {});
export interface DomainSettings {
  SecurityGroupIds?: string[];
  RStudioServerProDomainSettings?: RStudioServerProDomainSettings;
  ExecutionRoleIdentityConfig?: ExecutionRoleIdentityConfig;
  TrustedIdentityPropagationSettings?: TrustedIdentityPropagationSettings;
  DockerSettings?: DockerSettings;
  AmazonQSettings?: AmazonQSettings;
  UnifiedStudioSettings?: UnifiedStudioSettings;
  IpAddressType?: IPAddressType;
}
export type VpcId = string;
export type AppNetworkAccessType =
  | "PublicInternetOnly"
  | "VpcOnly"
  | (string & {});
export type AppSecurityGroupManagement = "Service" | "Customer" | (string & {});
export type HomeEfsFileSystemCreation = "Enabled" | "Disabled" | (string & {});
export type TagPropagation = "ENABLED" | "DISABLED" | (string & {});
export interface DefaultSpaceSettings {
  ExecutionRole?: string;
  SecurityGroups?: string[];
  JupyterServerAppSettings?: JupyterServerAppSettings;
  KernelGatewayAppSettings?: KernelGatewayAppSettings;
  JupyterLabAppSettings?: JupyterLabAppSettings;
  SpaceStorageSettings?: DefaultSpaceStorageSettings;
  CustomPosixUserConfig?: CustomPosixUserConfig;
  CustomFileSystemConfigs?: CustomFileSystemConfig[];
}
export interface CreateDomainRequest {
  DomainName?: string;
  AuthMode?: AuthMode;
  DefaultUserSettings?: UserSettings;
  DomainSettings?: DomainSettings;
  SubnetIds?: string[];
  VpcId?: string;
  Tags?: Tag[];
  AppNetworkAccessType?: AppNetworkAccessType;
  HomeEfsFileSystemKmsKeyId?: string;
  KmsKeyId?: string;
  AppSecurityGroupManagement?: AppSecurityGroupManagement;
  HomeEfsFileSystemCreation?: HomeEfsFileSystemCreation;
  TagPropagation?: TagPropagation;
  DefaultSpaceSettings?: DefaultSpaceSettings;
}
export type DomainArn = string;
export interface CreateDomainResponse {
  DomainArn?: string;
  DomainId?: string;
  Url?: string;
}
export interface EdgeDeploymentModelConfig {
  ModelHandle?: string;
  EdgePackagingJobName?: string;
}
export type EdgeDeploymentModelConfigs = EdgeDeploymentModelConfig[];
export type DeviceSubsetType =
  | "PERCENTAGE"
  | "SELECTION"
  | "NAMECONTAINS"
  | (string & {});
export type Percentage = number;
export type DeviceName = string;
export type DeviceNames = string[];
export interface DeviceSelectionConfig {
  DeviceSubsetType?: DeviceSubsetType;
  Percentage?: number;
  DeviceNames?: string[];
  DeviceNameContains?: string;
}
export type FailureHandlingPolicy =
  | "ROLLBACK_ON_FAILURE"
  | "DO_NOTHING"
  | (string & {});
export interface EdgeDeploymentConfig {
  FailureHandlingPolicy?: FailureHandlingPolicy;
}
export interface DeploymentStage {
  StageName?: string;
  DeviceSelectionConfig?: DeviceSelectionConfig;
  DeploymentConfig?: EdgeDeploymentConfig;
}
export type DeploymentStages = DeploymentStage[];
export interface CreateEdgeDeploymentPlanRequest {
  EdgeDeploymentPlanName?: string;
  ModelConfigs?: EdgeDeploymentModelConfig[];
  DeviceFleetName?: string;
  Stages?: DeploymentStage[];
  Tags?: Tag[];
}
export type EdgeDeploymentPlanArn = string;
export interface CreateEdgeDeploymentPlanResponse {
  EdgeDeploymentPlanArn: string;
}
export interface CreateEdgeDeploymentStageRequest {
  EdgeDeploymentPlanName?: string;
  Stages?: DeploymentStage[];
}
export interface CreateEdgeDeploymentStageResponse {}
export type EdgeVersion = string;
export interface CreateEdgePackagingJobRequest {
  EdgePackagingJobName?: string;
  CompilationJobName?: string;
  ModelName?: string;
  ModelVersion?: string;
  RoleArn?: string;
  OutputConfig?: EdgeOutputConfig;
  ResourceKey?: string;
  Tags?: Tag[];
}
export interface CreateEdgePackagingJobResponse {}
export type EndpointConfigName = string;
export type TrafficRoutingConfigType =
  | "ALL_AT_ONCE"
  | "CANARY"
  | "LINEAR"
  | (string & {});
export type WaitIntervalInSeconds = number;
export type CapacitySizeType =
  | "INSTANCE_COUNT"
  | "CAPACITY_PERCENT"
  | (string & {});
export type CapacitySizeValue = number;
export interface CapacitySize {
  Type?: CapacitySizeType;
  Value?: number;
}
export interface TrafficRoutingConfig {
  Type?: TrafficRoutingConfigType;
  WaitIntervalInSeconds?: number;
  CanarySize?: CapacitySize;
  LinearStepSize?: CapacitySize;
}
export type TerminationWaitInSeconds = number;
export type MaximumExecutionTimeoutInSeconds = number;
export interface BlueGreenUpdatePolicy {
  TrafficRoutingConfiguration?: TrafficRoutingConfig;
  TerminationWaitInSeconds?: number;
  MaximumExecutionTimeoutInSeconds?: number;
}
export interface RollingUpdatePolicy {
  MaximumBatchSize?: CapacitySize;
  WaitIntervalInSeconds?: number;
  MaximumExecutionTimeoutInSeconds?: number;
  RollbackMaximumBatchSize?: CapacitySize;
}
export interface Alarm {
  AlarmName?: string;
}
export type AlarmList = Alarm[];
export interface AutoRollbackConfig {
  Alarms?: Alarm[];
}
export interface DeploymentConfig {
  BlueGreenUpdatePolicy?: BlueGreenUpdatePolicy;
  RollingUpdatePolicy?: RollingUpdatePolicy;
  AutoRollbackConfiguration?: AutoRollbackConfig;
}
export interface CreateEndpointInput {
  EndpointName?: string;
  EndpointConfigName?: string;
  DeploymentConfig?: DeploymentConfig;
  Tags?: Tag[];
}
export type EndpointArn = string;
export interface CreateEndpointOutput {
  EndpointArn: string;
}
export type VariantName = string;
export type ModelName = string;
export type InitialTaskCount = number;
export type InstancePoolPriority = number;
export interface InstancePool {
  InstanceType?: ProductionVariantInstanceType;
  ModelNameOverride?: string;
  Priority?: number;
}
export type InstancePoolList = InstancePool[];
export type VariantInstanceProvisionTimeoutInSeconds = number;
export type VariantWeight = number;
export type ProductionVariantAcceleratorType =
  | "ml.eia1.medium"
  | "ml.eia1.large"
  | "ml.eia1.xlarge"
  | "ml.eia2.medium"
  | "ml.eia2.large"
  | "ml.eia2.xlarge"
  | (string & {});
export interface ProductionVariantCoreDumpConfig {
  DestinationS3Uri?: string;
  KmsKeyId?: string;
}
export type ServerlessMemorySizeInMB = number;
export type ServerlessMaxConcurrency = number;
export type ServerlessProvisionedConcurrency = number;
export interface ProductionVariantServerlessConfig {
  MemorySizeInMB?: number;
  MaxConcurrency?: number;
  ProvisionedConcurrency?: number;
}
export type ProductionVariantVolumeSizeInGB = number;
export type ProductionVariantModelDataDownloadTimeoutInSeconds = number;
export type ProductionVariantContainerStartupHealthCheckTimeoutInSeconds =
  number;
export type ProductionVariantSSMAccess = boolean;
export type ManagedInstanceScalingStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type ManagedInstanceScalingMinInstanceCount = number;
export type ManagedInstanceScalingMaxInstanceCount = number;
export type ManagedInstanceScalingScaleInStrategy =
  | "IDLE_RELEASE"
  | "CONSOLIDATION"
  | (string & {});
export type ManagedInstanceScalingMaximumStepSize = number;
export type ManagedInstanceScalingCooldownInMinutes = number;
export interface ProductionVariantManagedInstanceScalingScaleInPolicy {
  Strategy?: ManagedInstanceScalingScaleInStrategy;
  MaximumStepSize?: number;
  CooldownInMinutes?: number;
}
export interface ProductionVariantManagedInstanceScaling {
  Status?: ManagedInstanceScalingStatus;
  MinInstanceCount?: number;
  MaxInstanceCount?: number;
  ScaleInPolicy?: ProductionVariantManagedInstanceScalingScaleInPolicy;
}
export type RoutingStrategy =
  | "LEAST_OUTSTANDING_REQUESTS"
  | "RANDOM"
  | "PREFIX_AWARE"
  | (string & {});
export type PrefixAwareRoutingPrefixLength = number;
export type PrefixAwareRoutingConcurrencyThreshold = number;
export interface PrefixAwareRoutingConfig {
  PrefixLength?: number;
  ConcurrencyThreshold?: number;
}
export interface ProductionVariantRoutingConfig {
  RoutingStrategy?: RoutingStrategy;
  PrefixAwareRoutingConfig?: PrefixAwareRoutingConfig;
}
export type ProductionVariantInferenceAmiVersion =
  | "al2-ami-sagemaker-inference-gpu-2"
  | "al2-ami-sagemaker-inference-gpu-2-1"
  | "al2-ami-sagemaker-inference-gpu-3-1"
  | "al2-ami-sagemaker-inference-neuron-2"
  | "al2023-ami-sagemaker-inference-gpu-4-1"
  | (string & {});
export type CapacityReservationPreference =
  | "capacity-reservations-only"
  | (string & {});
export type MlReservationArn = string;
export interface ProductionVariantCapacityReservationConfig {
  CapacityReservationPreference?: CapacityReservationPreference;
  MlReservationArn?: string;
}
export interface ProductionVariant {
  VariantName?: string;
  ModelName?: string;
  InitialInstanceCount?: number;
  InstanceType?: ProductionVariantInstanceType;
  InstancePools?: InstancePool[];
  VariantInstanceProvisionTimeoutInSeconds?: number;
  InitialVariantWeight?: number;
  AcceleratorType?: ProductionVariantAcceleratorType;
  CoreDumpConfig?: ProductionVariantCoreDumpConfig;
  ServerlessConfig?: ProductionVariantServerlessConfig;
  VolumeSizeInGB?: number;
  ModelDataDownloadTimeoutInSeconds?: number;
  ContainerStartupHealthCheckTimeoutInSeconds?: number;
  EnableSSMAccess?: boolean;
  ManagedInstanceScaling?: ProductionVariantManagedInstanceScaling;
  RoutingConfig?: ProductionVariantRoutingConfig;
  InferenceAmiVersion?: ProductionVariantInferenceAmiVersion;
  CapacityReservationConfig?: ProductionVariantCapacityReservationConfig;
}
export type ProductionVariantList = ProductionVariant[];
export type EnableCapture = boolean;
export type SamplingPercentage = number;
export type CaptureMode = "Input" | "Output" | "InputAndOutput" | (string & {});
export interface CaptureOption {
  CaptureMode?: CaptureMode;
}
export type CaptureOptionList = CaptureOption[];
export type CsvContentType = string;
export type CsvContentTypes = string[];
export type JsonContentType = string;
export type JsonContentTypes = string[];
export interface CaptureContentTypeHeader {
  CsvContentTypes?: string[];
  JsonContentTypes?: string[];
}
export interface DataCaptureConfig {
  EnableCapture?: boolean;
  InitialSamplingPercentage?: number;
  DestinationS3Uri?: string;
  KmsKeyId?: string;
  CaptureOptions?: CaptureOption[];
  CaptureContentTypeHeader?: CaptureContentTypeHeader;
}
export type MaxConcurrentInvocationsPerInstance = number;
export interface AsyncInferenceClientConfig {
  MaxConcurrentInvocationsPerInstance?: number;
}
export type SnsTopicArn = string;
export type AsyncNotificationTopicTypes =
  | "SUCCESS_NOTIFICATION_TOPIC"
  | "ERROR_NOTIFICATION_TOPIC"
  | (string & {});
export type AsyncNotificationTopicTypeList = AsyncNotificationTopicTypes[];
export interface AsyncInferenceNotificationConfig {
  SuccessTopic?: string;
  ErrorTopic?: string;
  IncludeInferenceResponseIn?: AsyncNotificationTopicTypes[];
}
export interface AsyncInferenceOutputConfig {
  KmsKeyId?: string;
  S3OutputPath?: string;
  NotificationConfig?: AsyncInferenceNotificationConfig;
  S3FailurePath?: string;
}
export interface AsyncInferenceConfig {
  ClientConfig?: AsyncInferenceClientConfig;
  OutputConfig?: AsyncInferenceOutputConfig;
}
export type ClarifyEnableExplanations = string;
export type ClarifyFeaturesAttribute = string;
export type ClarifyContentTemplate = string;
export type ClarifyMaxRecordCount = number;
export type ClarifyMaxPayloadInMB = number;
export type ClarifyProbabilityIndex = number;
export type ClarifyLabelIndex = number;
export type ClarifyProbabilityAttribute = string;
export type ClarifyLabelAttribute = string;
export type ClarifyHeader = string;
export type ClarifyLabelHeaders = string[];
export type ClarifyFeatureHeaders = string[];
export type ClarifyFeatureType =
  | "numerical"
  | "categorical"
  | "text"
  | (string & {});
export type ClarifyFeatureTypes = ClarifyFeatureType[];
export interface ClarifyInferenceConfig {
  FeaturesAttribute?: string;
  ContentTemplate?: string;
  MaxRecordCount?: number;
  MaxPayloadInMB?: number;
  ProbabilityIndex?: number;
  LabelIndex?: number;
  ProbabilityAttribute?: string;
  LabelAttribute?: string;
  LabelHeaders?: string[];
  FeatureHeaders?: string[];
  FeatureTypes?: ClarifyFeatureType[];
}
export type ClarifyMimeType = string;
export type ClarifyShapBaseline = string;
export interface ClarifyShapBaselineConfig {
  MimeType?: string;
  ShapBaseline?: string;
  ShapBaselineUri?: string;
}
export type ClarifyShapNumberOfSamples = number;
export type ClarifyShapUseLogit = boolean;
export type ClarifyShapSeed = number;
export type ClarifyTextLanguage =
  | "af"
  | "sq"
  | "ar"
  | "hy"
  | "eu"
  | "bn"
  | "bg"
  | "ca"
  | "zh"
  | "hr"
  | "cs"
  | "da"
  | "nl"
  | "en"
  | "et"
  | "fi"
  | "fr"
  | "de"
  | "el"
  | "gu"
  | "he"
  | "hi"
  | "hu"
  | "is"
  | "id"
  | "ga"
  | "it"
  | "kn"
  | "ky"
  | "lv"
  | "lt"
  | "lb"
  | "mk"
  | "ml"
  | "mr"
  | "ne"
  | "nb"
  | "fa"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sa"
  | "sr"
  | "tn"
  | "si"
  | "sk"
  | "sl"
  | "es"
  | "sv"
  | "tl"
  | "ta"
  | "tt"
  | "te"
  | "tr"
  | "uk"
  | "ur"
  | "yo"
  | "lij"
  | "xx"
  | (string & {});
export type ClarifyTextGranularity =
  | "token"
  | "sentence"
  | "paragraph"
  | (string & {});
export interface ClarifyTextConfig {
  Language?: ClarifyTextLanguage;
  Granularity?: ClarifyTextGranularity;
}
export interface ClarifyShapConfig {
  ShapBaselineConfig?: ClarifyShapBaselineConfig;
  NumberOfSamples?: number;
  UseLogit?: boolean;
  Seed?: number;
  TextConfig?: ClarifyTextConfig;
}
export interface ClarifyExplainerConfig {
  EnableExplanations?: string;
  InferenceConfig?: ClarifyInferenceConfig;
  ShapConfig?: ClarifyShapConfig;
}
export interface ExplainerConfig {
  ClarifyExplainerConfig?: ClarifyExplainerConfig;
}
export type EnableEnhancedMetrics = boolean;
export type EnableDetailedObservability = boolean;
export type MetricPublishFrequencyInSeconds =
  | 10
  | 30
  | 60
  | 120
  | 180
  | 240
  | 300
  | (number & {});
export interface MetricsConfig {
  EnableEnhancedMetrics?: boolean;
  EnableDetailedObservability?: boolean;
  MetricPublishFrequencyInSeconds?: MetricPublishFrequencyInSeconds;
}
export interface CreateEndpointConfigInput {
  EndpointConfigName?: string;
  ProductionVariants?: ProductionVariant[];
  DataCaptureConfig?: DataCaptureConfig;
  Tags?: Tag[];
  KmsKeyId?: string;
  AsyncInferenceConfig?: AsyncInferenceConfig;
  ExplainerConfig?: ExplainerConfig;
  ShadowProductionVariants?: ProductionVariant[];
  ExecutionRoleArn?: string;
  VpcConfig?: VpcConfig;
  EnableNetworkIsolation?: boolean;
  MetricsConfig?: MetricsConfig;
}
export type EndpointConfigArn = string;
export interface CreateEndpointConfigOutput {
  EndpointConfigArn: string;
}
export interface CreateExperimentRequest {
  ExperimentName?: string;
  DisplayName?: string;
  Description?: string;
  Tags?: Tag[];
}
export type ExperimentArn = string;
export interface CreateExperimentResponse {
  ExperimentArn?: string;
}
export type FeatureGroupName = string;
export type FeatureName = string;
export type FeatureType = "Integral" | "Fractional" | "String" | (string & {});
export type CollectionType = "List" | "Set" | "Vector" | (string & {});
export type Dimension = number;
export interface VectorConfig {
  Dimension?: number;
}
export type CollectionConfig = { VectorConfig: VectorConfig };
export interface FeatureDefinition {
  FeatureName?: string;
  FeatureType?: FeatureType;
  CollectionType?: CollectionType;
  CollectionConfig?: CollectionConfig;
}
export type FeatureDefinitions = FeatureDefinition[];
export interface OnlineStoreSecurityConfig {
  KmsKeyId?: string;
}
export type TtlDurationUnit =
  | "Seconds"
  | "Minutes"
  | "Hours"
  | "Days"
  | "Weeks"
  | (string & {});
export type TtlDurationValue = number;
export interface TtlDuration {
  Unit?: TtlDurationUnit;
  Value?: number;
}
export type StorageType = "Standard" | "InMemory" | (string & {});
export interface OnlineStoreConfig {
  SecurityConfig?: OnlineStoreSecurityConfig;
  EnableOnlineStore?: boolean;
  TtlDuration?: TtlDuration;
  StorageType?: StorageType;
}
export interface S3StorageConfig {
  S3Uri?: string;
  KmsKeyId?: string;
  ResolvedOutputS3Uri?: string;
}
export type TableName = string;
export type Catalog = string;
export type Database = string;
export interface DataCatalogConfig {
  TableName?: string;
  Catalog?: string;
  Database?: string;
}
export type TableFormat = "Default" | "Glue" | "Iceberg" | (string & {});
export interface OfflineStoreConfig {
  S3StorageConfig?: S3StorageConfig;
  DisableGlueTableCreation?: boolean;
  DataCatalogConfig?: DataCatalogConfig;
  TableFormat?: TableFormat;
}
export type ThroughputMode = "OnDemand" | "Provisioned" | (string & {});
export type CapacityUnit = number;
export interface ThroughputConfig {
  ThroughputMode?: ThroughputMode;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedWriteCapacityUnits?: number;
}
export type Description = string;
export interface CreateFeatureGroupRequest {
  FeatureGroupName?: string;
  RecordIdentifierFeatureName?: string;
  EventTimeFeatureName?: string;
  FeatureDefinitions?: FeatureDefinition[];
  OnlineStoreConfig?: OnlineStoreConfig;
  OfflineStoreConfig?: OfflineStoreConfig;
  ThroughputConfig?: ThroughputConfig;
  RoleArn?: string;
  Description?: string;
  Tags?: Tag[];
}
export type FeatureGroupArn = string;
export interface CreateFeatureGroupResponse {
  FeatureGroupArn: string;
}
export type FlowDefinitionName = string;
export type AwsManagedHumanLoopRequestSource =
  | "AWS/Rekognition/DetectModerationLabels/Image/V3"
  | "AWS/Textract/AnalyzeDocument/Forms/V1"
  | (string & {});
export interface HumanLoopRequestSource {
  AwsManagedHumanLoopRequestSource?: AwsManagedHumanLoopRequestSource;
}
export type HumanLoopActivationConditions = string;
export interface HumanLoopActivationConditionsConfig {
  HumanLoopActivationConditions?: string;
}
export interface HumanLoopActivationConfig {
  HumanLoopActivationConditionsConfig?: HumanLoopActivationConditionsConfig;
}
export type WorkteamArn = string;
export type HumanTaskUiArn = string;
export type FlowDefinitionTaskTitle = string;
export type FlowDefinitionTaskDescription = string;
export type FlowDefinitionTaskCount = number;
export type FlowDefinitionTaskAvailabilityLifetimeInSeconds = number;
export type FlowDefinitionTaskTimeLimitInSeconds = number;
export type FlowDefinitionTaskKeyword = string;
export type FlowDefinitionTaskKeywords = string[];
export type Dollars = number;
export type Cents = number;
export type TenthFractionsOfACent = number;
export interface USD {
  Dollars?: number;
  Cents?: number;
  TenthFractionsOfACent?: number;
}
export interface PublicWorkforceTaskPrice {
  AmountInUsd?: USD;
}
export interface HumanLoopConfig {
  WorkteamArn?: string;
  HumanTaskUiArn?: string;
  TaskTitle?: string;
  TaskDescription?: string;
  TaskCount?: number;
  TaskAvailabilityLifetimeInSeconds?: number;
  TaskTimeLimitInSeconds?: number;
  TaskKeywords?: string[];
  PublicWorkforceTaskPrice?: PublicWorkforceTaskPrice;
}
export interface FlowDefinitionOutputConfig {
  S3OutputPath?: string;
  KmsKeyId?: string;
}
export interface CreateFlowDefinitionRequest {
  FlowDefinitionName?: string;
  HumanLoopRequestSource?: HumanLoopRequestSource;
  HumanLoopActivationConfig?: HumanLoopActivationConfig;
  HumanLoopConfig?: HumanLoopConfig;
  OutputConfig?: FlowDefinitionOutputConfig;
  RoleArn?: string;
  Tags?: Tag[];
}
export type FlowDefinitionArn = string;
export interface CreateFlowDefinitionResponse {
  FlowDefinitionArn: string;
}
export type HubName = string;
export type HubDescription = string;
export type HubDisplayName = string;
export type HubSearchKeyword = string;
export type HubSearchKeywordList = string[];
export type S3OutputPath = string;
export interface HubS3StorageConfig {
  S3OutputPath?: string;
}
export interface CreateHubRequest {
  HubName?: string;
  HubDescription?: string;
  HubDisplayName?: string;
  HubSearchKeywords?: string[];
  S3StorageConfig?: HubS3StorageConfig;
  Tags?: Tag[];
}
export type HubArn = string;
export interface CreateHubResponse {
  HubArn: string;
}
export type HubNameOrArn = string;
export type HubContentType =
  | "Model"
  | "Notebook"
  | "ModelReference"
  | "DataSet"
  | "JsonDoc"
  | (string & {});
export interface PresignedUrlAccessConfig {
  AcceptEula?: boolean;
  ExpectedS3Url?: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface CreateHubContentPresignedUrlsRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  HubContentName?: string;
  HubContentVersion?: string;
  AccessConfig?: PresignedUrlAccessConfig;
  MaxResults?: number;
  NextToken?: string;
}
export type LongS3Uri = string;
export type LocalPath = string;
export interface AuthorizedUrl {
  Url?: string;
  LocalPath?: string;
}
export type AuthorizedUrlConfigs = AuthorizedUrl[];
export interface CreateHubContentPresignedUrlsResponse {
  AuthorizedUrlConfigs: AuthorizedUrl[];
  NextToken?: string;
}
export type SageMakerPublicHubContentArn = string;
export interface CreateHubContentReferenceRequest {
  HubName?: string;
  SageMakerPublicHubContentArn?: string;
  HubContentName?: string;
  MinVersion?: string;
  Tags?: Tag[];
}
export interface CreateHubContentReferenceResponse {
  HubArn: string;
  HubContentArn: string;
}
export type HumanTaskUiName = string;
export type TemplateContent = string;
export interface UiTemplate {
  Content?: string;
}
export interface CreateHumanTaskUiRequest {
  HumanTaskUiName?: string;
  UiTemplate?: UiTemplate;
  Tags?: Tag[];
}
export interface CreateHumanTaskUiResponse {
  HumanTaskUiArn: string;
}
export type HyperParameterTuningJobName = string;
export type HyperParameterTuningJobStrategyType =
  | "Bayesian"
  | "Random"
  | "Hyperband"
  | "Grid"
  | (string & {});
export type HyperbandStrategyMinResource = number;
export type HyperbandStrategyMaxResource = number;
export interface HyperbandStrategyConfig {
  MinResource?: number;
  MaxResource?: number;
}
export interface HyperParameterTuningJobStrategyConfig {
  HyperbandStrategyConfig?: HyperbandStrategyConfig;
}
export type MaxNumberOfTrainingJobs = number;
export type MaxParallelTrainingJobs = number;
export type HyperParameterTuningMaxRuntimeInSeconds = number;
export interface ResourceLimits {
  MaxNumberOfTrainingJobs?: number;
  MaxParallelTrainingJobs?: number;
  MaxRuntimeInSeconds?: number;
}
export type ParameterKey = string;
export type HyperParameterScalingType =
  | "Auto"
  | "Linear"
  | "Logarithmic"
  | "ReverseLogarithmic"
  | (string & {});
export interface IntegerParameterRange {
  Name?: string;
  MinValue?: string;
  MaxValue?: string;
  ScalingType?: HyperParameterScalingType;
}
export type IntegerParameterRanges = IntegerParameterRange[];
export interface ContinuousParameterRange {
  Name?: string;
  MinValue?: string;
  MaxValue?: string;
  ScalingType?: HyperParameterScalingType;
}
export type ContinuousParameterRanges = ContinuousParameterRange[];
export interface CategoricalParameterRange {
  Name?: string;
  Values?: string[];
}
export type CategoricalParameterRanges = CategoricalParameterRange[];
export interface AutoParameter {
  Name?: string;
  ValueHint?: string;
}
export type AutoParameters = AutoParameter[];
export interface ParameterRanges {
  IntegerParameterRanges?: IntegerParameterRange[];
  ContinuousParameterRanges?: ContinuousParameterRange[];
  CategoricalParameterRanges?: CategoricalParameterRange[];
  AutoParameters?: AutoParameter[];
}
export type TrainingJobEarlyStoppingType = "Off" | "Auto" | (string & {});
export type TargetObjectiveMetricValue = number;
export type MaxNumberOfTrainingJobsNotImproving = number;
export interface BestObjectiveNotImproving {
  MaxNumberOfTrainingJobsNotImproving?: number;
}
export type CompleteOnConvergence = "Disabled" | "Enabled" | (string & {});
export interface ConvergenceDetected {
  CompleteOnConvergence?: CompleteOnConvergence;
}
export interface TuningJobCompletionCriteria {
  TargetObjectiveMetricValue?: number;
  BestObjectiveNotImproving?: BestObjectiveNotImproving;
  ConvergenceDetected?: ConvergenceDetected;
}
export type RandomSeed = number;
export interface HyperParameterTuningJobConfig {
  Strategy?: HyperParameterTuningJobStrategyType;
  StrategyConfig?: HyperParameterTuningJobStrategyConfig;
  HyperParameterTuningJobObjective?: HyperParameterTuningJobObjective;
  ResourceLimits?: ResourceLimits;
  ParameterRanges?: ParameterRanges;
  TrainingJobEarlyStoppingType?: TrainingJobEarlyStoppingType;
  TuningJobCompletionCriteria?: TuningJobCompletionCriteria;
  RandomSeed?: number;
}
export type HyperParameterTrainingJobDefinitionName = string;
export type AlgorithmImage = string;
export type ArnOrName = string;
export interface HyperParameterAlgorithmSpecification {
  TrainingImage?: string;
  TrainingInputMode?: TrainingInputMode;
  AlgorithmName?: string;
  MetricDefinitions?: MetricDefinition[];
}
export type HyperParameterTuningAllocationStrategy =
  | "Prioritized"
  | (string & {});
export type VolumeSizeInGB = number;
export interface HyperParameterTuningInstanceConfig {
  InstanceType?: TrainingInstanceType;
  InstanceCount?: number;
  VolumeSizeInGB?: number;
}
export type HyperParameterTuningInstanceConfigs =
  HyperParameterTuningInstanceConfig[];
export interface HyperParameterTuningResourceConfig {
  InstanceType?: TrainingInstanceType;
  InstanceCount?: number;
  VolumeSizeInGB?: number;
  VolumeKmsKeyId?: string;
  AllocationStrategy?: HyperParameterTuningAllocationStrategy;
  InstanceConfigs?: HyperParameterTuningInstanceConfig[];
}
export interface CheckpointConfig {
  S3Uri?: string;
  LocalPath?: string;
}
export type MaximumRetryAttempts = number;
export interface RetryStrategy {
  MaximumRetryAttempts?: number;
}
export type HyperParameterTrainingJobEnvironmentKey = string;
export type HyperParameterTrainingJobEnvironmentValue = string;
export type HyperParameterTrainingJobEnvironmentMap = {
  [key: string]: string | undefined;
};
export interface HyperParameterTrainingJobDefinition {
  DefinitionName?: string;
  TuningObjective?: HyperParameterTuningJobObjective;
  HyperParameterRanges?: ParameterRanges;
  StaticHyperParameters?: { [key: string]: string | undefined };
  AlgorithmSpecification?: HyperParameterAlgorithmSpecification;
  RoleArn?: string;
  InputDataConfig?: Channel[];
  VpcConfig?: VpcConfig;
  OutputDataConfig?: OutputDataConfig;
  ResourceConfig?: ResourceConfig;
  HyperParameterTuningResourceConfig?: HyperParameterTuningResourceConfig;
  StoppingCondition?: StoppingCondition;
  EnableNetworkIsolation?: boolean;
  EnableInterContainerTrafficEncryption?: boolean;
  EnableManagedSpotTraining?: boolean;
  CheckpointConfig?: CheckpointConfig;
  RetryStrategy?: RetryStrategy;
  Environment?: { [key: string]: string | undefined };
}
export type HyperParameterTrainingJobDefinitions =
  HyperParameterTrainingJobDefinition[];
export interface ParentHyperParameterTuningJob {
  HyperParameterTuningJobName?: string;
}
export type ParentHyperParameterTuningJobs = ParentHyperParameterTuningJob[];
export type HyperParameterTuningJobWarmStartType =
  | "IdenticalDataAndAlgorithm"
  | "TransferLearning"
  | (string & {});
export interface HyperParameterTuningJobWarmStartConfig {
  ParentHyperParameterTuningJobs?: ParentHyperParameterTuningJob[];
  WarmStartType?: HyperParameterTuningJobWarmStartType;
}
export type AutotuneMode = "Enabled" | (string & {});
export interface Autotune {
  Mode?: AutotuneMode;
}
export interface CreateHyperParameterTuningJobRequest {
  HyperParameterTuningJobName?: string;
  HyperParameterTuningJobConfig?: HyperParameterTuningJobConfig;
  TrainingJobDefinition?: HyperParameterTrainingJobDefinition;
  TrainingJobDefinitions?: HyperParameterTrainingJobDefinition[];
  WarmStartConfig?: HyperParameterTuningJobWarmStartConfig;
  Tags?: Tag[];
  Autotune?: Autotune;
}
export type HyperParameterTuningJobArn = string;
export interface CreateHyperParameterTuningJobResponse {
  HyperParameterTuningJobArn: string;
}
export type ImageDescription = string;
export type ImageDisplayName = string;
export interface CreateImageRequest {
  Description?: string;
  DisplayName?: string;
  ImageName?: string;
  RoleArn?: string;
  Tags?: Tag[];
}
export interface CreateImageResponse {
  ImageArn?: string;
}
export type ImageBaseImage = string;
export type ClientToken = string;
export type SageMakerImageVersionAlias = string;
export type SageMakerImageVersionAliases = string[];
export type VendorGuidance =
  | "NOT_PROVIDED"
  | "STABLE"
  | "TO_BE_ARCHIVED"
  | "ARCHIVED"
  | (string & {});
export type JobType =
  | "TRAINING"
  | "INFERENCE"
  | "NOTEBOOK_KERNEL"
  | (string & {});
export type MLFramework = string;
export type ProgrammingLang = string;
export type Processor = "CPU" | "GPU" | (string & {});
export type Horovod = boolean;
export type ReleaseNotes = string;
export interface CreateImageVersionRequest {
  BaseImage?: string;
  ClientToken?: string;
  ImageName?: string;
  Aliases?: string[];
  VendorGuidance?: VendorGuidance;
  JobType?: JobType;
  MLFramework?: string;
  ProgrammingLang?: string;
  Processor?: Processor;
  Horovod?: boolean;
  ReleaseNotes?: string;
}
export interface CreateImageVersionResponse {
  ImageVersionArn?: string;
}
export type InferenceComponentName = string;
export type MetricsEndpointPath = string;
export interface MetricsEndpoint {
  MetricsEndpointPath?: string;
  MetricPublishFrequencyInSeconds?: MetricPublishFrequencyInSeconds;
}
export type MetricsEndpointList = MetricsEndpoint[];
export interface ContainerMetricsConfig {
  MetricsEndpoints?: MetricsEndpoint[];
}
export interface InferenceComponentContainerSpecification {
  Image?: string;
  ArtifactUrl?: string;
  Environment?: { [key: string]: string | undefined };
  ContainerMetricsConfig?: ContainerMetricsConfig;
}
export interface InferenceComponentStartupParameters {
  ModelDataDownloadTimeoutInSeconds?: number;
  ContainerStartupHealthCheckTimeoutInSeconds?: number;
}
export type NumberOfCpuCores = number;
export type NumberOfAcceleratorDevices = number;
export type MemoryInMb = number;
export interface InferenceComponentComputeResourceRequirements {
  NumberOfCpuCoresRequired?: number;
  NumberOfAcceleratorDevicesRequired?: number;
  MinMemoryRequiredInMb?: number;
  MaxMemoryRequiredInMb?: number;
}
export type EnableCaching = boolean;
export interface InferenceComponentDataCacheConfig {
  EnableCaching?: boolean;
}
export type InferenceComponentPlacementStrategy =
  | "SPREAD"
  | "BINPACK"
  | (string & {});
export type AvailabilityZoneBalanceEnforcementMode =
  | "PERMISSIVE"
  | (string & {});
export type AvailabilityZoneBalanceMaxImbalance = number;
export interface InferenceComponentAvailabilityZoneBalance {
  EnforcementMode?: AvailabilityZoneBalanceEnforcementMode;
  MaxImbalance?: number;
}
export interface InferenceComponentSchedulingConfig {
  PlacementStrategy?: InferenceComponentPlacementStrategy;
  AvailabilityZoneBalance?: InferenceComponentAvailabilityZoneBalance;
}
export interface InferenceComponentSpecification {
  InstanceType?: ProductionVariantInstanceType;
  ModelName?: string;
  Container?: InferenceComponentContainerSpecification;
  StartupParameters?: InferenceComponentStartupParameters;
  ComputeResourceRequirements?: InferenceComponentComputeResourceRequirements;
  BaseInferenceComponentName?: string;
  DataCacheConfig?: InferenceComponentDataCacheConfig;
  SchedulingConfig?: InferenceComponentSchedulingConfig;
}
export type InferenceComponentSpecificationList =
  InferenceComponentSpecification[];
export type InferenceComponentCopyCount = number;
export interface InferenceComponentRuntimeConfig {
  CopyCount?: number;
}
export interface CreateInferenceComponentInput {
  InferenceComponentName?: string;
  EndpointName?: string;
  VariantName?: string;
  Specification?: InferenceComponentSpecification;
  Specifications?: InferenceComponentSpecification[];
  RuntimeConfig?: InferenceComponentRuntimeConfig;
  Tags?: Tag[];
}
export type InferenceComponentArn = string;
export interface CreateInferenceComponentOutput {
  InferenceComponentArn: string;
}
export type InferenceExperimentName = string;
export type InferenceExperimentType = "ShadowMode" | (string & {});
export interface InferenceExperimentSchedule {
  StartTime?: Date;
  EndTime?: Date;
}
export type InferenceExperimentDescription = string;
export type ModelVariantName = string;
export type ModelInfrastructureType = "RealTimeInference" | (string & {});
export type TaskCount = number;
export interface RealTimeInferenceConfig {
  InstanceType?: ProductionVariantInstanceType;
  InstanceCount?: number;
}
export interface ModelInfrastructureConfig {
  InfrastructureType?: ModelInfrastructureType;
  RealTimeInferenceConfig?: RealTimeInferenceConfig;
}
export interface ModelVariantConfig {
  ModelName?: string;
  VariantName?: string;
  InfrastructureConfig?: ModelInfrastructureConfig;
}
export type ModelVariantConfigList = ModelVariantConfig[];
export interface InferenceExperimentDataStorageConfig {
  Destination?: string;
  KmsKey?: string;
  ContentType?: CaptureContentTypeHeader;
}
export interface ShadowModelVariantConfig {
  ShadowModelVariantName?: string;
  SamplingPercentage?: number;
}
export type ShadowModelVariantConfigList = ShadowModelVariantConfig[];
export interface ShadowModeConfig {
  SourceModelVariantName?: string;
  ShadowModelVariants?: ShadowModelVariantConfig[];
}
export interface CreateInferenceExperimentRequest {
  Name?: string;
  Type?: InferenceExperimentType;
  Schedule?: InferenceExperimentSchedule;
  Description?: string;
  RoleArn?: string;
  EndpointName?: string;
  ModelVariants?: ModelVariantConfig[];
  DataStorageConfig?: InferenceExperimentDataStorageConfig;
  ShadowModeConfig?: ShadowModeConfig;
  KmsKey?: string;
  Tags?: Tag[];
}
export type InferenceExperimentArn = string;
export interface CreateInferenceExperimentResponse {
  InferenceExperimentArn: string;
}
export type RecommendationJobName = string;
export type RecommendationJobType = "Default" | "Advanced" | (string & {});
export type JobDurationInSeconds = number;
export type TrafficType = "PHASES" | "STAIRS" | (string & {});
export type InitialNumberOfUsers = number;
export type SpawnRate = number;
export type TrafficDurationInSeconds = number;
export interface Phase {
  InitialNumberOfUsers?: number;
  SpawnRate?: number;
  DurationInSeconds?: number;
}
export type Phases = Phase[];
export type NumberOfSteps = number;
export type UsersPerStep = number;
export interface Stairs {
  DurationInSeconds?: number;
  NumberOfSteps?: number;
  UsersPerStep?: number;
}
export interface TrafficPattern {
  TrafficType?: TrafficType;
  Phases?: Phase[];
  Stairs?: Stairs;
}
export type MaxNumberOfTests = number;
export type MaxParallelOfTests = number;
export interface RecommendationJobResourceLimit {
  MaxNumberOfTests?: number;
  MaxParallelOfTests?: number;
}
export type InferenceSpecificationName = string;
export type String64 = string;
export type String128 = string;
export type CategoricalParameterRangeValues = string[];
export interface CategoricalParameter {
  Name?: string;
  Value?: string[];
}
export type CategoricalParameters = CategoricalParameter[];
export interface EnvironmentParameterRanges {
  CategoricalParameterRanges?: CategoricalParameter[];
}
export interface EndpointInputConfiguration {
  InstanceType?: ProductionVariantInstanceType;
  ServerlessConfig?: ProductionVariantServerlessConfig;
  InferenceSpecificationName?: string;
  EnvironmentParameterRanges?: EnvironmentParameterRanges;
}
export type EndpointInputConfigurations = EndpointInputConfiguration[];
export type RecommendationJobFrameworkVersion = string;
export type RecommendationJobSupportedContentType = string;
export type RecommendationJobSupportedContentTypes = string[];
export interface RecommendationJobPayloadConfig {
  SamplePayloadUrl?: string;
  SupportedContentTypes?: string[];
}
export type RecommendationJobSupportedInstanceTypes = string[];
export type RecommendationJobSupportedEndpointType =
  | "RealTime"
  | "Serverless"
  | (string & {});
export type RecommendationJobDataInputConfig = string;
export type RecommendationJobSupportedResponseMIMEType = string;
export type RecommendationJobSupportedResponseMIMETypes = string[];
export interface RecommendationJobContainerConfig {
  Domain?: string;
  Task?: string;
  Framework?: string;
  FrameworkVersion?: string;
  PayloadConfig?: RecommendationJobPayloadConfig;
  NearestModelName?: string;
  SupportedInstanceTypes?: string[];
  SupportedEndpointType?: RecommendationJobSupportedEndpointType;
  DataInputConfig?: string;
  SupportedResponseMIMETypes?: string[];
}
export interface EndpointInfo {
  EndpointName?: string;
}
export type Endpoints = EndpointInfo[];
export type RecommendationJobVpcSecurityGroupId = string;
export type RecommendationJobVpcSecurityGroupIds = string[];
export type RecommendationJobVpcSubnetId = string;
export type RecommendationJobVpcSubnets = string[];
export interface RecommendationJobVpcConfig {
  SecurityGroupIds?: string[];
  Subnets?: string[];
}
export interface RecommendationJobInputConfig {
  ModelPackageVersionArn?: string;
  ModelName?: string;
  JobDurationInSeconds?: number;
  TrafficPattern?: TrafficPattern;
  ResourceLimit?: RecommendationJobResourceLimit;
  EndpointConfigurations?: EndpointInputConfiguration[];
  VolumeKmsKeyId?: string;
  ContainerConfig?: RecommendationJobContainerConfig;
  Endpoints?: EndpointInfo[];
  VpcConfig?: RecommendationJobVpcConfig;
}
export type RecommendationJobDescription = string;
export interface ModelLatencyThreshold {
  Percentile?: string;
  ValueInMilliseconds?: number;
}
export type ModelLatencyThresholds = ModelLatencyThreshold[];
export type FlatInvocations = "Continue" | "Stop" | (string & {});
export interface RecommendationJobStoppingConditions {
  MaxInvocations?: number;
  ModelLatencyThresholds?: ModelLatencyThreshold[];
  FlatInvocations?: FlatInvocations;
}
export interface RecommendationJobCompiledOutputConfig {
  S3OutputUri?: string;
}
export interface RecommendationJobOutputConfig {
  KmsKeyId?: string;
  CompiledOutputConfig?: RecommendationJobCompiledOutputConfig;
}
export interface CreateInferenceRecommendationsJobRequest {
  JobName?: string;
  JobType?: RecommendationJobType;
  RoleArn?: string;
  InputConfig?: RecommendationJobInputConfig;
  JobDescription?: string;
  StoppingConditions?: RecommendationJobStoppingConditions;
  OutputConfig?: RecommendationJobOutputConfig;
  Tags?: Tag[];
}
export type RecommendationJobArn = string;
export interface CreateInferenceRecommendationsJobResponse {
  JobArn: string;
}
export type JobName = string;
export type JobCategory = "AgentRFT" | "AgentRFTEvaluation" | (string & {});
export type JobSchemaVersion = string;
export type JobConfigDocument = string;
export interface CreateJobRequest {
  JobName?: string;
  RoleArn?: string;
  JobCategory?: JobCategory;
  JobConfigSchemaVersion?: string;
  JobConfigDocument?: string;
  Tags?: Tag[];
}
export type JobArn = string;
export interface CreateJobResponse {
  JobArn: string;
}
export type LabelingJobName = string;
export type LabelAttributeName = string;
export interface LabelingJobS3DataSource {
  ManifestS3Uri?: string;
}
export interface LabelingJobSnsDataSource {
  SnsTopicArn?: string;
}
export interface LabelingJobDataSource {
  S3DataSource?: LabelingJobS3DataSource;
  SnsDataSource?: LabelingJobSnsDataSource;
}
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export type ContentClassifiers = ContentClassifier[];
export interface LabelingJobDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export interface LabelingJobInputConfig {
  DataSource?: LabelingJobDataSource;
  DataAttributes?: LabelingJobDataAttributes;
}
export interface LabelingJobOutputConfig {
  S3OutputPath?: string;
  KmsKeyId?: string;
  SnsTopicArn?: string;
}
export type MaxHumanLabeledObjectCount = number;
export type MaxPercentageOfInputDatasetLabeled = number;
export interface LabelingJobStoppingConditions {
  MaxHumanLabeledObjectCount?: number;
  MaxPercentageOfInputDatasetLabeled?: number;
}
export type LabelingJobAlgorithmSpecificationArn = string;
export type ModelArn = string;
export interface LabelingJobResourceConfig {
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export interface LabelingJobAlgorithmsConfig {
  LabelingJobAlgorithmSpecificationArn?: string;
  InitialActiveLearningModelArn?: string;
  LabelingJobResourceConfig?: LabelingJobResourceConfig;
}
export interface UiConfig {
  UiTemplateS3Uri?: string;
  HumanTaskUiArn?: string;
}
export type LambdaFunctionArn = string;
export type TaskKeyword = string;
export type TaskKeywords = string[];
export type TaskTitle = string;
export type TaskDescription = string;
export type NumberOfHumanWorkersPerDataObject = number;
export type TaskTimeLimitInSeconds = number;
export type TaskAvailabilityLifetimeInSeconds = number;
export type MaxConcurrentTaskCount = number;
export interface AnnotationConsolidationConfig {
  AnnotationConsolidationLambdaArn?: string;
}
export interface HumanTaskConfig {
  WorkteamArn?: string;
  UiConfig?: UiConfig;
  PreHumanTaskLambdaArn?: string;
  TaskKeywords?: string[];
  TaskTitle?: string;
  TaskDescription?: string;
  NumberOfHumanWorkersPerDataObject?: number;
  TaskTimeLimitInSeconds?: number;
  TaskAvailabilityLifetimeInSeconds?: number;
  MaxConcurrentTaskCount?: number;
  AnnotationConsolidationConfig?: AnnotationConsolidationConfig;
  PublicWorkforceTaskPrice?: PublicWorkforceTaskPrice;
}
export interface CreateLabelingJobRequest {
  LabelingJobName?: string;
  LabelAttributeName?: string;
  InputConfig?: LabelingJobInputConfig;
  OutputConfig?: LabelingJobOutputConfig;
  RoleArn?: string;
  LabelCategoryConfigS3Uri?: string;
  StoppingConditions?: LabelingJobStoppingConditions;
  LabelingJobAlgorithmsConfig?: LabelingJobAlgorithmsConfig;
  HumanTaskConfig?: HumanTaskConfig;
  Tags?: Tag[];
}
export type LabelingJobArn = string;
export interface CreateLabelingJobResponse {
  LabelingJobArn: string;
}
export type MlflowAppName = string;
export type ModelRegistrationMode =
  | "AutoModelRegistrationEnabled"
  | "AutoModelRegistrationDisabled"
  | (string & {});
export type WeeklyMaintenanceWindowStart = string;
export type AccountDefaultStatus = "ENABLED" | "DISABLED" | (string & {});
export type DefaultDomainIdList = string[];
export interface CreateMlflowAppRequest {
  Name?: string;
  ArtifactStoreUri?: string;
  RoleArn?: string;
  KmsKeyId?: string;
  ModelRegistrationMode?: ModelRegistrationMode;
  WeeklyMaintenanceWindowStart?: string;
  AccountDefaultStatus?: AccountDefaultStatus;
  DefaultDomainIdList?: string[];
  Tags?: Tag[];
}
export type MlflowAppArn = string;
export interface CreateMlflowAppResponse {
  Arn?: string;
}
export type TrackingServerName = string;
export type TrackingServerSize = "Small" | "Medium" | "Large" | (string & {});
export type MlflowVersion = string;
export interface CreateMlflowTrackingServerRequest {
  TrackingServerName?: string;
  ArtifactStoreUri?: string;
  TrackingServerSize?: TrackingServerSize;
  MlflowVersion?: string;
  RoleArn?: string;
  AutomaticModelRegistration?: boolean;
  WeeklyMaintenanceWindowStart?: string;
  Tags?: Tag[];
  S3BucketOwnerAccountId?: string;
  S3BucketOwnerVerification?: boolean;
}
export type TrackingServerArn = string;
export interface CreateMlflowTrackingServerResponse {
  TrackingServerArn?: string;
}
export type RepositoryAccessMode = "Platform" | "Vpc" | (string & {});
export type RepositoryCredentialsProviderArn = string;
export interface RepositoryAuthConfig {
  RepositoryCredentialsProviderArn?: string;
}
export interface ImageConfig {
  RepositoryAccessMode?: RepositoryAccessMode;
  RepositoryAuthConfig?: RepositoryAuthConfig;
}
export type ContainerMode = "SingleModel" | "MultiModel" | (string & {});
export type VersionedArnOrName = string;
export type ModelCacheSetting = "Enabled" | "Disabled" | (string & {});
export interface MultiModelConfig {
  ModelCacheSetting?: ModelCacheSetting;
}
export interface ContainerDefinition {
  ContainerHostname?: string;
  Image?: string;
  ImageConfig?: ImageConfig;
  Mode?: ContainerMode;
  ModelDataUrl?: string;
  ModelDataSource?: ModelDataSource;
  AdditionalModelDataSources?: AdditionalModelDataSource[];
  Environment?: { [key: string]: string | undefined };
  ModelPackageName?: string;
  InferenceSpecificationName?: string;
  MultiModelConfig?: MultiModelConfig;
  ContainerMetricsConfig?: ContainerMetricsConfig;
}
export type ContainerDefinitionList = ContainerDefinition[];
export type InferenceExecutionMode = "Serial" | "Direct" | (string & {});
export interface InferenceExecutionConfig {
  Mode?: InferenceExecutionMode;
}
export interface CreateModelInput {
  ModelName?: string;
  PrimaryContainer?: ContainerDefinition;
  Containers?: ContainerDefinition[];
  InferenceExecutionConfig?: InferenceExecutionConfig;
  ExecutionRoleArn?: string;
  Tags?: Tag[];
  VpcConfig?: VpcConfig;
  EnableNetworkIsolation?: boolean;
}
export interface CreateModelOutput {
  ModelArn: string;
}
export interface ModelBiasBaselineConfig {
  BaseliningJobName?: string;
  ConstraintsResource?: MonitoringConstraintsResource;
}
export interface ModelBiasAppSpecification {
  ImageUri?: string;
  ConfigUri?: string;
  Environment?: { [key: string]: string | undefined };
}
export interface MonitoringGroundTruthS3Input {
  S3Uri?: string;
}
export interface ModelBiasJobInput {
  EndpointInput?: EndpointInput;
  BatchTransformInput?: BatchTransformInput;
  GroundTruthS3Input?: MonitoringGroundTruthS3Input;
}
export interface CreateModelBiasJobDefinitionRequest {
  JobDefinitionName?: string;
  ModelBiasBaselineConfig?: ModelBiasBaselineConfig;
  ModelBiasAppSpecification?: ModelBiasAppSpecification;
  ModelBiasJobInput?: ModelBiasJobInput;
  ModelBiasJobOutputConfig?: MonitoringOutputConfig;
  JobResources?: MonitoringResources;
  NetworkConfig?: MonitoringNetworkConfig;
  RoleArn?: string;
  StoppingCondition?: MonitoringStoppingCondition;
  Tags?: Tag[];
}
export interface CreateModelBiasJobDefinitionResponse {
  JobDefinitionArn: string;
}
export interface ModelCardSecurityConfig {
  KmsKeyId?: string;
}
export type ModelCardContent = string | redacted.Redacted<string>;
export type ModelCardStatus =
  | "Draft"
  | "PendingReview"
  | "Approved"
  | "Archived"
  | (string & {});
export interface CreateModelCardRequest {
  ModelCardName?: string;
  SecurityConfig?: ModelCardSecurityConfig;
  Content?: string | redacted.Redacted<string>;
  ModelCardStatus?: ModelCardStatus;
  Tags?: Tag[];
}
export type ModelCardArn = string;
export interface CreateModelCardResponse {
  ModelCardArn: string;
}
export type ModelCardNameOrArn = string;
export interface ModelCardExportOutputConfig {
  S3OutputPath?: string;
}
export interface CreateModelCardExportJobRequest {
  ModelCardName?: string;
  ModelCardVersion?: number;
  ModelCardExportJobName?: string;
  OutputConfig?: ModelCardExportOutputConfig;
}
export type ModelCardExportJobArn = string;
export interface CreateModelCardExportJobResponse {
  ModelCardExportJobArn: string;
}
export interface ModelExplainabilityBaselineConfig {
  BaseliningJobName?: string;
  ConstraintsResource?: MonitoringConstraintsResource;
}
export interface ModelExplainabilityAppSpecification {
  ImageUri?: string;
  ConfigUri?: string;
  Environment?: { [key: string]: string | undefined };
}
export interface ModelExplainabilityJobInput {
  EndpointInput?: EndpointInput;
  BatchTransformInput?: BatchTransformInput;
}
export interface CreateModelExplainabilityJobDefinitionRequest {
  JobDefinitionName?: string;
  ModelExplainabilityBaselineConfig?: ModelExplainabilityBaselineConfig;
  ModelExplainabilityAppSpecification?: ModelExplainabilityAppSpecification;
  ModelExplainabilityJobInput?: ModelExplainabilityJobInput;
  ModelExplainabilityJobOutputConfig?: MonitoringOutputConfig;
  JobResources?: MonitoringResources;
  NetworkConfig?: MonitoringNetworkConfig;
  RoleArn?: string;
  StoppingCondition?: MonitoringStoppingCondition;
  Tags?: Tag[];
}
export interface CreateModelExplainabilityJobDefinitionResponse {
  JobDefinitionArn: string;
}
export interface ModelPackageValidationProfile {
  ProfileName?: string;
  TransformJobDefinition?: TransformJobDefinition;
}
export type ModelPackageValidationProfiles = ModelPackageValidationProfile[];
export interface ModelPackageValidationSpecification {
  ValidationRole?: string;
  ValidationProfiles?: ModelPackageValidationProfile[];
}
export interface SourceAlgorithm {
  ModelDataUrl?: string;
  ModelDataSource?: ModelDataSource;
  ModelDataETag?: string;
  AlgorithmName?: string;
}
export type SourceAlgorithmList = SourceAlgorithm[];
export interface SourceAlgorithmSpecification {
  SourceAlgorithms?: SourceAlgorithm[];
}
export type ContentDigest = string;
export interface MetricsSource {
  ContentType?: string;
  ContentDigest?: string;
  S3Uri?: string;
}
export interface ModelQuality {
  Statistics?: MetricsSource;
  Constraints?: MetricsSource;
}
export interface ModelDataQuality {
  Statistics?: MetricsSource;
  Constraints?: MetricsSource;
}
export interface Bias {
  Report?: MetricsSource;
  PreTrainingReport?: MetricsSource;
  PostTrainingReport?: MetricsSource;
}
export interface Explainability {
  Report?: MetricsSource;
}
export interface ModelMetrics {
  ModelQuality?: ModelQuality;
  ModelDataQuality?: ModelDataQuality;
  Bias?: Bias;
  Explainability?: Explainability;
}
export type CustomerMetadataKey = string;
export type CustomerMetadataValue = string;
export type CustomerMetadataMap = { [key: string]: string | undefined };
export interface FileSource {
  ContentType?: string;
  ContentDigest?: string;
  S3Uri?: string;
}
export interface DriftCheckBias {
  ConfigFile?: FileSource;
  PreTrainingConstraints?: MetricsSource;
  PostTrainingConstraints?: MetricsSource;
}
export interface DriftCheckExplainability {
  Constraints?: MetricsSource;
  ConfigFile?: FileSource;
}
export interface DriftCheckModelQuality {
  Statistics?: MetricsSource;
  Constraints?: MetricsSource;
}
export interface DriftCheckModelDataQuality {
  Statistics?: MetricsSource;
  Constraints?: MetricsSource;
}
export interface DriftCheckBaselines {
  Bias?: DriftCheckBias;
  Explainability?: DriftCheckExplainability;
  ModelQuality?: DriftCheckModelQuality;
  ModelDataQuality?: DriftCheckModelDataQuality;
}
export interface AdditionalInferenceSpecificationDefinition {
  Name?: string;
  Description?: string;
  Containers?: ModelPackageContainerDefinition[];
  SupportedTransformInstanceTypes?: TransformInstanceType[];
  SupportedRealtimeInferenceInstanceTypes?: ProductionVariantInstanceType[];
  SupportedContentTypes?: string[];
  SupportedResponseMIMETypes?: string[];
}
export type AdditionalInferenceSpecifications =
  AdditionalInferenceSpecificationDefinition[];
export type SkipModelValidation = "All" | "None" | (string & {});
export type ModelPackageSourceUri = string;
export interface ModelPackageSecurityConfig {
  KmsKeyId?: string;
}
export interface ModelPackageModelCard {
  ModelCardContent?: string | redacted.Redacted<string>;
  ModelCardStatus?: ModelCardStatus;
}
export type StageDescription = string;
export interface ModelLifeCycle {
  Stage?: string;
  StageStatus?: string;
  StageDescription?: string;
}
export type ManagedStorageType = "Restricted" | (string & {});
export interface CreateModelPackageInput {
  ModelPackageName?: string;
  ModelPackageGroupName?: string;
  ModelPackageDescription?: string;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
  InferenceSpecification?: InferenceSpecification;
  ValidationSpecification?: ModelPackageValidationSpecification;
  SourceAlgorithmSpecification?: SourceAlgorithmSpecification;
  CertifyForMarketplace?: boolean;
  Tags?: Tag[];
  ModelApprovalStatus?: ModelApprovalStatus;
  MetadataProperties?: MetadataProperties;
  ModelMetrics?: ModelMetrics;
  ClientToken?: string;
  Domain?: string;
  Task?: string;
  SamplePayloadUrl?: string;
  CustomerMetadataProperties?: { [key: string]: string | undefined };
  DriftCheckBaselines?: DriftCheckBaselines;
  AdditionalInferenceSpecifications?: AdditionalInferenceSpecificationDefinition[];
  SkipModelValidation?: SkipModelValidation;
  SourceUri?: string;
  SecurityConfig?: ModelPackageSecurityConfig;
  ModelCard?: ModelPackageModelCard;
  ModelLifeCycle?: ModelLifeCycle;
  ManagedStorageType?: ManagedStorageType;
}
export interface CreateModelPackageOutput {
  ModelPackageArn: string;
}
export interface ManagedConfiguration {
  ManagedStorageType?: ManagedStorageType;
}
export interface CreateModelPackageGroupInput {
  ModelPackageGroupName?: string;
  ModelPackageGroupDescription?: string;
  Tags?: Tag[];
  ManagedConfiguration?: ManagedConfiguration;
}
export type ModelPackageGroupArn = string;
export interface CreateModelPackageGroupOutput {
  ModelPackageGroupArn: string;
}
export interface ModelQualityBaselineConfig {
  BaseliningJobName?: string;
  ConstraintsResource?: MonitoringConstraintsResource;
}
export type MonitoringProblemType =
  | "BinaryClassification"
  | "MulticlassClassification"
  | "Regression"
  | (string & {});
export interface ModelQualityAppSpecification {
  ImageUri?: string;
  ContainerEntrypoint?: string[];
  ContainerArguments?: string[];
  RecordPreprocessorSourceUri?: string;
  PostAnalyticsProcessorSourceUri?: string;
  ProblemType?: MonitoringProblemType;
  Environment?: { [key: string]: string | undefined };
}
export interface ModelQualityJobInput {
  EndpointInput?: EndpointInput;
  BatchTransformInput?: BatchTransformInput;
  GroundTruthS3Input?: MonitoringGroundTruthS3Input;
}
export interface CreateModelQualityJobDefinitionRequest {
  JobDefinitionName?: string;
  ModelQualityBaselineConfig?: ModelQualityBaselineConfig;
  ModelQualityAppSpecification?: ModelQualityAppSpecification;
  ModelQualityJobInput?: ModelQualityJobInput;
  ModelQualityJobOutputConfig?: MonitoringOutputConfig;
  JobResources?: MonitoringResources;
  NetworkConfig?: MonitoringNetworkConfig;
  RoleArn?: string;
  StoppingCondition?: MonitoringStoppingCondition;
  Tags?: Tag[];
}
export interface CreateModelQualityJobDefinitionResponse {
  JobDefinitionArn: string;
}
export type MonitoringScheduleName = string;
export type ScheduleExpression = string;
export interface ScheduleConfig {
  ScheduleExpression?: string;
  DataAnalysisStartTime?: string;
  DataAnalysisEndTime?: string;
}
export interface MonitoringBaselineConfig {
  BaseliningJobName?: string;
  ConstraintsResource?: MonitoringConstraintsResource;
  StatisticsResource?: MonitoringStatisticsResource;
}
export interface MonitoringInput {
  EndpointInput?: EndpointInput;
  BatchTransformInput?: BatchTransformInput;
}
export type MonitoringInputs = MonitoringInput[];
export interface MonitoringAppSpecification {
  ImageUri?: string;
  ContainerEntrypoint?: string[];
  ContainerArguments?: string[];
  RecordPreprocessorSourceUri?: string;
  PostAnalyticsProcessorSourceUri?: string;
}
export interface NetworkConfig {
  EnableInterContainerTrafficEncryption?: boolean;
  EnableNetworkIsolation?: boolean;
  VpcConfig?: VpcConfig;
}
export interface MonitoringJobDefinition {
  BaselineConfig?: MonitoringBaselineConfig;
  MonitoringInputs?: MonitoringInput[];
  MonitoringOutputConfig?: MonitoringOutputConfig;
  MonitoringResources?: MonitoringResources;
  MonitoringAppSpecification?: MonitoringAppSpecification;
  StoppingCondition?: MonitoringStoppingCondition;
  Environment?: { [key: string]: string | undefined };
  NetworkConfig?: NetworkConfig;
  RoleArn?: string;
}
export type MonitoringType =
  | "DataQuality"
  | "ModelQuality"
  | "ModelBias"
  | "ModelExplainability"
  | (string & {});
export interface MonitoringScheduleConfig {
  ScheduleConfig?: ScheduleConfig;
  MonitoringJobDefinition?: MonitoringJobDefinition;
  MonitoringJobDefinitionName?: string;
  MonitoringType?: MonitoringType;
}
export interface CreateMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
  MonitoringScheduleConfig?: MonitoringScheduleConfig;
  Tags?: Tag[];
}
export type MonitoringScheduleArn = string;
export interface CreateMonitoringScheduleResponse {
  MonitoringScheduleArn: string;
}
export type NotebookInstanceName = string;
export type InstanceType =
  | "ml.t2.medium"
  | "ml.t2.large"
  | "ml.t2.xlarge"
  | "ml.t2.2xlarge"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.m5d.large"
  | "ml.m5d.xlarge"
  | "ml.m5d.2xlarge"
  | "ml.m5d.4xlarge"
  | "ml.m5d.8xlarge"
  | "ml.m5d.12xlarge"
  | "ml.m5d.16xlarge"
  | "ml.m5d.24xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5d.xlarge"
  | "ml.c5d.2xlarge"
  | "ml.c5d.4xlarge"
  | "ml.c5d.9xlarge"
  | "ml.c5d.18xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3dn.24xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.inf1.xlarge"
  | "ml.inf1.2xlarge"
  | "ml.inf1.6xlarge"
  | "ml.inf1.24xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.inf2.xlarge"
  | "ml.inf2.8xlarge"
  | "ml.inf2.24xlarge"
  | "ml.inf2.48xlarge"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.c6i.large"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.r6i.large"
  | "ml.r6i.xlarge"
  | "ml.r6i.2xlarge"
  | "ml.r6i.4xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.12xlarge"
  | "ml.r6i.16xlarge"
  | "ml.r6i.24xlarge"
  | "ml.r6i.32xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.m6id.large"
  | "ml.m6id.xlarge"
  | "ml.m6id.2xlarge"
  | "ml.m6id.4xlarge"
  | "ml.m6id.8xlarge"
  | "ml.m6id.12xlarge"
  | "ml.m6id.16xlarge"
  | "ml.m6id.24xlarge"
  | "ml.m6id.32xlarge"
  | "ml.c6id.large"
  | "ml.c6id.xlarge"
  | "ml.c6id.2xlarge"
  | "ml.c6id.4xlarge"
  | "ml.c6id.8xlarge"
  | "ml.c6id.12xlarge"
  | "ml.c6id.16xlarge"
  | "ml.c6id.24xlarge"
  | "ml.c6id.32xlarge"
  | "ml.r6id.large"
  | "ml.r6id.xlarge"
  | "ml.r6id.2xlarge"
  | "ml.r6id.4xlarge"
  | "ml.r6id.8xlarge"
  | "ml.r6id.12xlarge"
  | "ml.r6id.16xlarge"
  | "ml.r6id.24xlarge"
  | "ml.r6id.32xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.p5.4xlarge"
  | "ml.p5en.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | (string & {});
export type NotebookInstanceLifecycleConfigName = string;
export type DirectInternetAccess = "Enabled" | "Disabled" | (string & {});
export type NotebookInstanceVolumeSizeInGB = number;
export type NotebookInstanceAcceleratorType =
  | "ml.eia1.medium"
  | "ml.eia1.large"
  | "ml.eia1.xlarge"
  | "ml.eia2.medium"
  | "ml.eia2.large"
  | "ml.eia2.xlarge"
  | (string & {});
export type NotebookInstanceAcceleratorTypes =
  NotebookInstanceAcceleratorType[];
export type CodeRepositoryNameOrUrl = string;
export type AdditionalCodeRepositoryNamesOrUrls = string[];
export type RootAccess = "Enabled" | "Disabled" | (string & {});
export type PlatformIdentifier = string;
export type MinimumInstanceMetadataServiceVersion = string;
export interface InstanceMetadataServiceConfiguration {
  MinimumInstanceMetadataServiceVersion?: string;
}
export interface CreateNotebookInstanceInput {
  NotebookInstanceName?: string;
  InstanceType?: InstanceType;
  SubnetId?: string;
  SecurityGroupIds?: string[];
  IpAddressType?: IPAddressType;
  RoleArn?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
  LifecycleConfigName?: string;
  DirectInternetAccess?: DirectInternetAccess;
  VolumeSizeInGB?: number;
  AcceleratorTypes?: NotebookInstanceAcceleratorType[];
  DefaultCodeRepository?: string;
  AdditionalCodeRepositories?: string[];
  RootAccess?: RootAccess;
  PlatformIdentifier?: string;
  InstanceMetadataServiceConfiguration?: InstanceMetadataServiceConfiguration;
}
export type NotebookInstanceArn = string;
export interface CreateNotebookInstanceOutput {
  NotebookInstanceArn?: string;
}
export type NotebookInstanceLifecycleConfigContent = string;
export interface NotebookInstanceLifecycleHook {
  Content?: string;
}
export type NotebookInstanceLifecycleConfigList =
  NotebookInstanceLifecycleHook[];
export interface CreateNotebookInstanceLifecycleConfigInput {
  NotebookInstanceLifecycleConfigName?: string;
  OnCreate?: NotebookInstanceLifecycleHook[];
  OnStart?: NotebookInstanceLifecycleHook[];
  Tags?: Tag[];
}
export type NotebookInstanceLifecycleConfigArn = string;
export interface CreateNotebookInstanceLifecycleConfigOutput {
  NotebookInstanceLifecycleConfigArn?: string;
}
export type OptimizationModelAcceptEula = boolean;
export interface OptimizationModelAccessConfig {
  AcceptEula?: boolean;
}
export interface OptimizationJobModelSourceS3 {
  S3Uri?: string;
  ModelAccessConfig?: OptimizationModelAccessConfig;
}
export interface OptimizationSageMakerModel {
  ModelName?: string;
}
export interface OptimizationJobModelSource {
  S3?: OptimizationJobModelSourceS3;
  SageMakerModel?: OptimizationSageMakerModel;
}
export type OptimizationJobDeploymentInstanceType =
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.inf2.xlarge"
  | "ml.inf2.8xlarge"
  | "ml.inf2.24xlarge"
  | "ml.inf2.48xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.g7e.2xlarge"
  | "ml.g7e.4xlarge"
  | "ml.g7e.8xlarge"
  | "ml.g7e.12xlarge"
  | "ml.g7e.24xlarge"
  | "ml.g7e.48xlarge"
  | "ml.g7.2xlarge"
  | "ml.g7.4xlarge"
  | "ml.g7.8xlarge"
  | "ml.g7.12xlarge"
  | "ml.g7.24xlarge"
  | "ml.g7.48xlarge"
  | (string & {});
export type OptimizationJobMaxInstanceCount = number;
export type OptimizationJobEnvironmentVariables = {
  [key: string]: string | undefined;
};
export type OptimizationContainerImage = string;
export interface ModelQuantizationConfig {
  Image?: string;
  OverrideEnvironment?: { [key: string]: string | undefined };
}
export interface ModelCompilationConfig {
  Image?: string;
  OverrideEnvironment?: { [key: string]: string | undefined };
}
export interface ModelShardingConfig {
  Image?: string;
  OverrideEnvironment?: { [key: string]: string | undefined };
}
export type ModelSpeculativeDecodingTechnique = "EAGLE" | (string & {});
export type ModelSpeculativeDecodingS3DataType =
  | "S3Prefix"
  | "ManifestFile"
  | (string & {});
export interface ModelSpeculativeDecodingTrainingDataSource {
  S3Uri?: string;
  S3DataType?: ModelSpeculativeDecodingS3DataType;
}
export interface ModelSpeculativeDecodingConfig {
  Technique?: ModelSpeculativeDecodingTechnique;
  TrainingDataSource?: ModelSpeculativeDecodingTrainingDataSource;
}
export type OptimizationConfig =
  | {
      ModelQuantizationConfig: ModelQuantizationConfig;
      ModelCompilationConfig?: never;
      ModelShardingConfig?: never;
      ModelSpeculativeDecodingConfig?: never;
    }
  | {
      ModelQuantizationConfig?: never;
      ModelCompilationConfig: ModelCompilationConfig;
      ModelShardingConfig?: never;
      ModelSpeculativeDecodingConfig?: never;
    }
  | {
      ModelQuantizationConfig?: never;
      ModelCompilationConfig?: never;
      ModelShardingConfig: ModelShardingConfig;
      ModelSpeculativeDecodingConfig?: never;
    }
  | {
      ModelQuantizationConfig?: never;
      ModelCompilationConfig?: never;
      ModelShardingConfig?: never;
      ModelSpeculativeDecodingConfig: ModelSpeculativeDecodingConfig;
    };
export type OptimizationConfigs = OptimizationConfig[];
export interface OptimizationJobOutputConfig {
  KmsKeyId?: string;
  S3OutputLocation?: string;
  SageMakerModel?: OptimizationSageMakerModel;
}
export type OptimizationVpcSecurityGroupId = string;
export type OptimizationVpcSecurityGroupIds = string[];
export type OptimizationVpcSubnetId = string;
export type OptimizationVpcSubnets = string[];
export interface OptimizationVpcConfig {
  SecurityGroupIds?: string[];
  Subnets?: string[];
}
export type OptimizationJobTrainingPlanArns = string[];
export interface CreateOptimizationJobRequest {
  OptimizationJobName?: string;
  RoleArn?: string;
  ModelSource?: OptimizationJobModelSource;
  DeploymentInstanceType?: OptimizationJobDeploymentInstanceType;
  MaxInstanceCount?: number;
  OptimizationEnvironment?: { [key: string]: string | undefined };
  OptimizationConfigs?: OptimizationConfig[];
  OutputConfig?: OptimizationJobOutputConfig;
  StoppingCondition?: StoppingCondition;
  Tags?: Tag[];
  VpcConfig?: OptimizationVpcConfig;
  TrainingPlanArns?: string[];
}
export type OptimizationJobArn = string;
export interface CreateOptimizationJobResponse {
  OptimizationJobArn: string;
}
export type PartnerAppName = string;
export type PartnerAppType =
  | "lakera-guard"
  | "comet"
  | "deepchecks-llm-evaluation"
  | "fiddler"
  | (string & {});
export type WeeklyScheduleTimeFormat = string;
export interface PartnerAppMaintenanceConfig {
  MaintenanceWindowStart?: string;
}
export type PartnerAppAdminUserList = string[];
export type PartnerAppArguments = { [key: string]: string | undefined };
export type GroupNamePattern = string;
export type AssignedGroupPatternsList = string[];
export type GroupPatternsList = string[];
export interface RoleGroupAssignment {
  RoleName: string;
  GroupPatterns: string[];
}
export type RoleGroupAssignmentsList = RoleGroupAssignment[];
export interface PartnerAppConfig {
  AdminUsers?: string[];
  Arguments?: { [key: string]: string | undefined };
  AssignedGroupPatterns?: string[];
  RoleGroupAssignments?: RoleGroupAssignment[];
}
export type InstanceArn = string;
export interface IdcConfigInput {
  InstanceArn: string;
}
export type PartnerAppAuthType = "IAM" | "IDC" | (string & {});
export interface CreatePartnerAppRequest {
  Name?: string;
  Type?: PartnerAppType;
  ExecutionRoleArn?: string;
  KmsKeyId?: string;
  MaintenanceConfig?: PartnerAppMaintenanceConfig;
  Tier?: string;
  ApplicationConfig?: PartnerAppConfig;
  IdcConfig?: IdcConfigInput;
  AuthType?: PartnerAppAuthType;
  EnableIamSessionBasedIdentity?: boolean;
  EnableAutoMinorVersionUpgrade?: boolean;
  ClientToken?: string;
  Tags?: Tag[];
}
export type PartnerAppArn = string;
export interface CreatePartnerAppResponse {
  Arn?: string;
}
export type ExpiresInSeconds = number;
export type SessionExpirationDurationInSeconds = number;
export interface CreatePartnerAppPresignedUrlRequest {
  Arn?: string;
  ExpiresInSeconds?: number;
  SessionExpirationDurationInSeconds?: number;
}
export type String2048 = string;
export interface CreatePartnerAppPresignedUrlResponse {
  Url?: string;
}
export type PipelineName = string;
export type PipelineDefinition = string;
export type BucketName = string;
export type Key = string;
export type VersionId = string;
export interface PipelineDefinitionS3Location {
  Bucket?: string;
  ObjectKey?: string;
  VersionId?: string;
}
export type PipelineDescription = string;
export type IdempotencyToken = string;
export type MaxParallelExecutionSteps = number;
export interface ParallelismConfiguration {
  MaxParallelExecutionSteps?: number;
}
export interface CreatePipelineRequest {
  PipelineName?: string;
  PipelineDisplayName?: string;
  PipelineDefinition?: string;
  PipelineDefinitionS3Location?: PipelineDefinitionS3Location;
  PipelineDescription?: string;
  ClientRequestToken?: string;
  RoleArn?: string;
  Tags?: Tag[];
  ParallelismConfiguration?: ParallelismConfiguration;
}
export type PipelineArn = string;
export interface CreatePipelineResponse {
  PipelineArn?: string;
}
export interface CreatePresignedDomainUrlRequest {
  DomainId?: string;
  UserProfileName?: string;
  SessionExpirationDurationInSeconds?: number;
  ExpiresInSeconds?: number;
  SpaceName?: string;
  LandingUri?: string;
}
export type PresignedDomainUrl = string;
export interface CreatePresignedDomainUrlResponse {
  AuthorizedUrl?: string;
}
export interface CreatePresignedMlflowAppUrlRequest {
  Arn?: string;
  ExpiresInSeconds?: number;
  SessionExpirationDurationInSeconds?: number;
}
export type MlflowAppUrl = string;
export interface CreatePresignedMlflowAppUrlResponse {
  AuthorizedUrl?: string;
}
export interface CreatePresignedMlflowTrackingServerUrlRequest {
  TrackingServerName?: string;
  ExpiresInSeconds?: number;
  SessionExpirationDurationInSeconds?: number;
}
export type TrackingServerUrl = string;
export interface CreatePresignedMlflowTrackingServerUrlResponse {
  AuthorizedUrl?: string;
}
export interface CreatePresignedNotebookInstanceUrlInput {
  NotebookInstanceName?: string;
  SessionExpirationDurationInSeconds?: number;
}
export type NotebookInstanceUrl = string;
export interface CreatePresignedNotebookInstanceUrlOutput {
  AuthorizedUrl?: string;
}
export type AppManaged = boolean;
export type ProcessingS3DataType = "ManifestFile" | "S3Prefix" | (string & {});
export type ProcessingS3CompressionType = "None" | "Gzip" | (string & {});
export interface ProcessingS3Input {
  S3Uri?: string;
  LocalPath?: string;
  S3DataType?: ProcessingS3DataType;
  S3InputMode?: ProcessingS3InputMode;
  S3DataDistributionType?: ProcessingS3DataDistributionType;
  S3CompressionType?: ProcessingS3CompressionType;
}
export type AthenaCatalog = string;
export type AthenaDatabase = string;
export type AthenaQueryString = string;
export type AthenaWorkGroup = string;
export type AthenaResultFormat =
  | "PARQUET"
  | "ORC"
  | "AVRO"
  | "JSON"
  | "TEXTFILE"
  | (string & {});
export type AthenaResultCompressionType =
  | "GZIP"
  | "SNAPPY"
  | "ZLIB"
  | (string & {});
export interface AthenaDatasetDefinition {
  Catalog?: string;
  Database?: string;
  QueryString?: string;
  WorkGroup?: string;
  OutputS3Uri?: string;
  KmsKeyId?: string;
  OutputFormat?: AthenaResultFormat;
  OutputCompression?: AthenaResultCompressionType;
}
export type RedshiftClusterId = string;
export type RedshiftDatabase = string;
export type RedshiftUserName = string;
export type RedshiftQueryString = string;
export type RedshiftResultFormat = "PARQUET" | "CSV" | (string & {});
export type RedshiftResultCompressionType =
  | "None"
  | "GZIP"
  | "BZIP2"
  | "ZSTD"
  | "SNAPPY"
  | (string & {});
export interface RedshiftDatasetDefinition {
  ClusterId?: string;
  Database?: string;
  DbUser?: string;
  QueryString?: string;
  ClusterRoleArn?: string;
  OutputS3Uri?: string;
  KmsKeyId?: string;
  OutputFormat?: RedshiftResultFormat;
  OutputCompression?: RedshiftResultCompressionType;
}
export type DataDistributionType =
  | "FullyReplicated"
  | "ShardedByS3Key"
  | (string & {});
export type InputMode = "Pipe" | "File" | (string & {});
export interface DatasetDefinition {
  AthenaDatasetDefinition?: AthenaDatasetDefinition;
  RedshiftDatasetDefinition?: RedshiftDatasetDefinition;
  LocalPath?: string;
  DataDistributionType?: DataDistributionType;
  InputMode?: InputMode;
}
export interface ProcessingInput {
  InputName?: string;
  AppManaged?: boolean;
  S3Input?: ProcessingS3Input;
  DatasetDefinition?: DatasetDefinition;
}
export type ProcessingInputs = ProcessingInput[];
export interface ProcessingS3Output {
  S3Uri?: string;
  LocalPath?: string;
  S3UploadMode?: ProcessingS3UploadMode;
}
export interface ProcessingFeatureStoreOutput {
  FeatureGroupName?: string;
}
export interface ProcessingOutput {
  OutputName?: string;
  S3Output?: ProcessingS3Output;
  FeatureStoreOutput?: ProcessingFeatureStoreOutput;
  AppManaged?: boolean;
}
export type ProcessingOutputs = ProcessingOutput[];
export interface ProcessingOutputConfig {
  Outputs?: ProcessingOutput[];
  KmsKeyId?: string;
}
export interface ProcessingClusterConfig {
  InstanceCount?: number;
  InstanceType?: ProcessingInstanceType;
  VolumeSizeInGB?: number;
  VolumeKmsKeyId?: string;
}
export interface ProcessingResources {
  ClusterConfig?: ProcessingClusterConfig;
}
export type ProcessingMaxRuntimeInSeconds = number;
export interface ProcessingStoppingCondition {
  MaxRuntimeInSeconds?: number;
}
export type ContainerArguments = string[];
export interface AppSpecification {
  ImageUri?: string;
  ContainerEntrypoint?: string[];
  ContainerArguments?: string[];
}
export type ProcessingEnvironmentMap = { [key: string]: string | undefined };
export interface ExperimentConfig {
  ExperimentName?: string;
  TrialName?: string;
  TrialComponentDisplayName?: string;
  RunName?: string;
}
export interface CreateProcessingJobRequest {
  ProcessingInputs?: ProcessingInput[];
  ProcessingOutputConfig?: ProcessingOutputConfig;
  ProcessingJobName?: string;
  ProcessingResources?: ProcessingResources;
  StoppingCondition?: ProcessingStoppingCondition;
  AppSpecification?: AppSpecification;
  Environment?: { [key: string]: string | undefined };
  NetworkConfig?: NetworkConfig;
  RoleArn?: string;
  Tags?: Tag[];
  ExperimentConfig?: ExperimentConfig;
}
export type ProcessingJobArn = string;
export interface CreateProcessingJobResponse {
  ProcessingJobArn: string;
}
export type ProjectEntityName = string;
export type ServiceCatalogEntityId = string;
export type ProvisioningParameterKey = string;
export type ProvisioningParameterValue = string;
export interface ProvisioningParameter {
  Key?: string;
  Value?: string;
}
export type ProvisioningParameters = ProvisioningParameter[];
export interface ServiceCatalogProvisioningDetails {
  ProductId?: string;
  ProvisioningArtifactId?: string;
  PathId?: string;
  ProvisioningParameters?: ProvisioningParameter[];
}
export type CfnTemplateName = string;
export type CfnTemplateURL = string;
export type CfnStackParameterKey = string;
export type CfnStackParameterValue = string;
export interface CfnStackCreateParameter {
  Key?: string;
  Value?: string;
}
export type CfnStackCreateParameters = CfnStackCreateParameter[];
export interface CfnCreateTemplateProvider {
  TemplateName?: string;
  TemplateURL?: string;
  RoleARN?: string;
  Parameters?: CfnStackCreateParameter[];
}
export interface CreateTemplateProvider {
  CfnTemplateProvider?: CfnCreateTemplateProvider;
}
export type CreateTemplateProviderList = CreateTemplateProvider[];
export interface CreateProjectInput {
  ProjectName?: string;
  ProjectDescription?: string;
  ServiceCatalogProvisioningDetails?: ServiceCatalogProvisioningDetails;
  Tags?: Tag[];
  TemplateProviders?: CreateTemplateProvider[];
}
export type ProjectArn = string;
export type ProjectId = string;
export interface CreateProjectOutput {
  ProjectArn: string;
  ProjectId: string;
}
export interface SpaceIdleSettings {
  IdleTimeoutInMinutes?: number;
}
export interface SpaceAppLifecycleManagement {
  IdleSettings?: SpaceIdleSettings;
}
export interface SpaceCodeEditorAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  AppLifecycleManagement?: SpaceAppLifecycleManagement;
}
export interface SpaceJupyterLabAppSettings {
  DefaultResourceSpec?: ResourceSpec;
  CodeRepositories?: CodeRepository[];
  AppLifecycleManagement?: SpaceAppLifecycleManagement;
}
export interface EbsStorageSettings {
  EbsVolumeSizeInGb?: number;
}
export interface SpaceStorageSettings {
  EbsStorageSettings?: EbsStorageSettings;
}
export interface EFSFileSystem {
  FileSystemId?: string;
}
export interface FSxLustreFileSystem {
  FileSystemId?: string;
}
export interface S3FileSystem {
  S3Uri?: string;
}
export type CustomFileSystem =
  | {
      EFSFileSystem: EFSFileSystem;
      FSxLustreFileSystem?: never;
      S3FileSystem?: never;
    }
  | {
      EFSFileSystem?: never;
      FSxLustreFileSystem: FSxLustreFileSystem;
      S3FileSystem?: never;
    }
  | {
      EFSFileSystem?: never;
      FSxLustreFileSystem?: never;
      S3FileSystem: S3FileSystem;
    };
export type CustomFileSystems = CustomFileSystem[];
export interface SpaceSettings {
  JupyterServerAppSettings?: JupyterServerAppSettings;
  KernelGatewayAppSettings?: KernelGatewayAppSettings;
  CodeEditorAppSettings?: SpaceCodeEditorAppSettings;
  JupyterLabAppSettings?: SpaceJupyterLabAppSettings;
  AppType?: AppType;
  SpaceStorageSettings?: SpaceStorageSettings;
  SpaceManagedResources?: FeatureStatus;
  CustomFileSystems?: CustomFileSystem[];
  RemoteAccess?: FeatureStatus;
}
export interface OwnershipSettings {
  OwnerUserProfileName?: string;
}
export type SharingType = "Private" | "Shared" | (string & {});
export interface SpaceSharingSettings {
  SharingType?: SharingType;
}
export interface CreateSpaceRequest {
  DomainId?: string;
  SpaceName?: string;
  Tags?: Tag[];
  SpaceSettings?: SpaceSettings;
  OwnershipSettings?: OwnershipSettings;
  SpaceSharingSettings?: SpaceSharingSettings;
  SpaceDisplayName?: string;
}
export type SpaceArn = string;
export interface CreateSpaceResponse {
  SpaceArn?: string;
}
export type StudioLifecycleConfigName = string;
export type StudioLifecycleConfigContent = string;
export type StudioLifecycleConfigAppType =
  | "JupyterServer"
  | "KernelGateway"
  | "CodeEditor"
  | "JupyterLab"
  | (string & {});
export interface CreateStudioLifecycleConfigRequest {
  StudioLifecycleConfigName?: string;
  StudioLifecycleConfigContent?: string;
  StudioLifecycleConfigAppType?: StudioLifecycleConfigAppType;
  Tags?: Tag[];
}
export interface CreateStudioLifecycleConfigResponse {
  StudioLifecycleConfigArn?: string;
}
export type TrainingJobName = string;
export type TrainingContainerEntrypointString = string;
export type TrainingContainerEntrypoint = string[];
export type TrainingContainerArgument = string;
export type TrainingContainerArguments = string[];
export type TrainingRepositoryAccessMode = "Platform" | "Vpc" | (string & {});
export type TrainingRepositoryCredentialsProviderArn = string;
export interface TrainingRepositoryAuthConfig {
  TrainingRepositoryCredentialsProviderArn?: string;
}
export interface TrainingImageConfig {
  TrainingRepositoryAccessMode?: TrainingRepositoryAccessMode;
  TrainingRepositoryAuthConfig?: TrainingRepositoryAuthConfig;
}
export interface AlgorithmSpecification {
  TrainingImage?: string;
  AlgorithmName?: string;
  TrainingInputMode?: TrainingInputMode;
  MetricDefinitions?: MetricDefinition[];
  EnableSageMakerMetricsTimeSeries?: boolean;
  ContainerEntrypoint?: string[];
  ContainerArguments?: string[];
  TrainingImageConfig?: TrainingImageConfig;
}
export type ConfigKey = string;
export type ConfigValue = string;
export type HookParameters = { [key: string]: string | undefined };
export type CollectionName = string;
export type CollectionParameters = { [key: string]: string | undefined };
export interface CollectionConfiguration {
  CollectionName?: string;
  CollectionParameters?: { [key: string]: string | undefined };
}
export type CollectionConfigurations = CollectionConfiguration[];
export interface DebugHookConfig {
  LocalPath?: string;
  S3OutputPath?: string;
  HookParameters?: { [key: string]: string | undefined };
  CollectionConfigurations?: CollectionConfiguration[];
}
export type RuleConfigurationName = string;
export type RuleParameters = { [key: string]: string | undefined };
export interface DebugRuleConfiguration {
  RuleConfigurationName?: string;
  LocalPath?: string;
  S3OutputPath?: string;
  RuleEvaluatorImage?: string;
  InstanceType?: ProcessingInstanceType;
  VolumeSizeInGB?: number;
  RuleParameters?: { [key: string]: string | undefined };
}
export type DebugRuleConfigurations = DebugRuleConfiguration[];
export interface TensorBoardOutputConfig {
  LocalPath?: string;
  S3OutputPath?: string;
}
export type ProfilingIntervalInMilliseconds = number;
export type ProfilingParameters = { [key: string]: string | undefined };
export type DisableProfiler = boolean;
export interface ProfilerConfig {
  S3OutputPath?: string;
  ProfilingIntervalInMilliseconds?: number;
  ProfilingParameters?: { [key: string]: string | undefined };
  DisableProfiler?: boolean;
}
export interface ProfilerRuleConfiguration {
  RuleConfigurationName?: string;
  LocalPath?: string;
  S3OutputPath?: string;
  RuleEvaluatorImage?: string;
  InstanceType?: ProcessingInstanceType;
  VolumeSizeInGB?: number;
  RuleParameters?: { [key: string]: string | undefined };
}
export type ProfilerRuleConfigurations = ProfilerRuleConfiguration[];
export type TrainingEnvironmentKey = string;
export type TrainingEnvironmentValue = string;
export type TrainingEnvironmentMap = { [key: string]: string | undefined };
export type EnableRemoteDebug = boolean;
export interface RemoteDebugConfig {
  EnableRemoteDebug?: boolean;
}
export type EnableInfraCheck = boolean;
export interface InfraCheckConfig {
  EnableInfraCheck?: boolean;
}
export type EnableSessionTagChaining = boolean;
export interface SessionChainingConfig {
  EnableSessionTagChaining?: boolean;
}
export type ServerlessJobBaseModelArn = string;
export type ServerlessJobType = "FineTuning" | "Evaluation" | (string & {});
export type CustomizationTechnique =
  | "SFT"
  | "DPO"
  | "RLVR"
  | "RLAIF"
  | (string & {});
export type Peft = "LORA" | (string & {});
export type EvaluationType =
  | "LLMAJEvaluation"
  | "CustomScorerEvaluation"
  | "BenchmarkEvaluation"
  | (string & {});
export type EvaluatorArn = string;
export type SequenceLength = string;
export interface ServerlessJobConfig {
  BaseModelArn: string;
  AcceptEula?: boolean;
  JobType: ServerlessJobType;
  CustomizationTechnique?: CustomizationTechnique;
  Peft?: Peft;
  EvaluationType?: EvaluationType;
  EvaluatorArn?: string;
  SequenceLength?: string;
}
export type MlFlowResourceArn = string;
export type MlflowExperimentName = string;
export type MlflowRunName = string;
export interface MlflowConfig {
  MlflowResourceArn: string;
  MlflowExperimentName?: string;
  MlflowRunName?: string;
}
export interface ModelPackageConfig {
  ModelPackageGroupArn: string;
  SourceModelPackageArn?: string;
}
export interface CreateTrainingJobRequest {
  TrainingJobName?: string;
  HyperParameters?: { [key: string]: string | undefined };
  AlgorithmSpecification?: AlgorithmSpecification;
  RoleArn?: string;
  InputDataConfig?: Channel[];
  OutputDataConfig?: OutputDataConfig;
  ResourceConfig?: ResourceConfig;
  VpcConfig?: VpcConfig;
  StoppingCondition?: StoppingCondition;
  Tags?: Tag[];
  EnableNetworkIsolation?: boolean;
  EnableInterContainerTrafficEncryption?: boolean;
  EnableManagedSpotTraining?: boolean;
  CheckpointConfig?: CheckpointConfig;
  DebugHookConfig?: DebugHookConfig;
  DebugRuleConfigurations?: DebugRuleConfiguration[];
  TensorBoardOutputConfig?: TensorBoardOutputConfig;
  ExperimentConfig?: ExperimentConfig;
  ProfilerConfig?: ProfilerConfig;
  ProfilerRuleConfigurations?: ProfilerRuleConfiguration[];
  Environment?: { [key: string]: string | undefined };
  RetryStrategy?: RetryStrategy;
  RemoteDebugConfig?: RemoteDebugConfig;
  InfraCheckConfig?: InfraCheckConfig;
  SessionChainingConfig?: SessionChainingConfig;
  ServerlessJobConfig?: ServerlessJobConfig;
  MlflowConfig?: MlflowConfig;
  ModelPackageConfig?: ModelPackageConfig;
}
export type TrainingJobArn = string;
export interface CreateTrainingJobResponse {
  TrainingJobArn: string;
}
export type TrainingPlanName = string;
export type TrainingPlanOfferingId = string;
export type SpareInstanceCountPerUltraServer = number;
export interface CreateTrainingPlanRequest {
  TrainingPlanName?: string;
  TrainingPlanOfferingId?: string;
  SpareInstanceCountPerUltraServer?: number;
  Tags?: Tag[];
}
export interface CreateTrainingPlanResponse {
  TrainingPlanArn: string;
}
export type TransformJobName = string;
export type InvocationsTimeoutInSeconds = number;
export type InvocationsMaxRetries = number;
export interface ModelClientConfig {
  InvocationsTimeoutInSeconds?: number;
  InvocationsMaxRetries?: number;
}
export interface BatchDataCaptureConfig {
  DestinationS3Uri?: string;
  KmsKeyId?: string;
  GenerateInferenceId?: boolean;
}
export type JsonPath = string;
export type JoinSource = "Input" | "None" | (string & {});
export interface DataProcessing {
  InputFilter?: string;
  OutputFilter?: string;
  JoinSource?: JoinSource;
}
export interface CreateTransformJobRequest {
  TransformJobName?: string;
  ModelName?: string;
  MaxConcurrentTransforms?: number;
  ModelClientConfig?: ModelClientConfig;
  MaxPayloadInMB?: number;
  BatchStrategy?: BatchStrategy;
  Environment?: { [key: string]: string | undefined };
  TransformInput?: TransformInput;
  TransformOutput?: TransformOutput;
  DataCaptureConfig?: BatchDataCaptureConfig;
  TransformResources?: TransformResources;
  DataProcessing?: DataProcessing;
  Tags?: Tag[];
  ExperimentConfig?: ExperimentConfig;
}
export type TransformJobArn = string;
export interface CreateTransformJobResponse {
  TransformJobArn: string;
}
export interface CreateTrialRequest {
  TrialName?: string;
  DisplayName?: string;
  ExperimentName?: string;
  MetadataProperties?: MetadataProperties;
  Tags?: Tag[];
}
export interface CreateTrialResponse {
  TrialArn?: string;
}
export type TrialComponentPrimaryStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type TrialComponentStatusMessage = string;
export interface TrialComponentStatus {
  PrimaryStatus?: TrialComponentPrimaryStatus;
  Message?: string;
}
export type TrialComponentKey320 = string;
export type DoubleParameterValue = number;
export type TrialComponentParameterValue =
  | { StringValue: string; NumberValue?: never }
  | { StringValue?: never; NumberValue: number };
export type TrialComponentParameters = {
  [key: string]: TrialComponentParameterValue | undefined;
};
export type TrialComponentKey128 = string;
export type MediaType = string;
export type TrialComponentArtifactValue = string;
export interface TrialComponentArtifact {
  MediaType?: string;
  Value?: string;
}
export type TrialComponentArtifacts = {
  [key: string]: TrialComponentArtifact | undefined;
};
export interface CreateTrialComponentRequest {
  TrialComponentName?: string;
  DisplayName?: string;
  Status?: TrialComponentStatus;
  StartTime?: Date;
  EndTime?: Date;
  Parameters?: { [key: string]: TrialComponentParameterValue | undefined };
  InputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  OutputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  MetadataProperties?: MetadataProperties;
  Tags?: Tag[];
}
export interface CreateTrialComponentResponse {
  TrialComponentArn?: string;
}
export type SingleSignOnUserIdentifier = string;
export interface CreateUserProfileRequest {
  DomainId?: string;
  UserProfileName?: string;
  SingleSignOnUserIdentifier?: string;
  SingleSignOnUserValue?: string;
  Tags?: Tag[];
  UserSettings?: UserSettings;
}
export type UserProfileArn = string;
export interface CreateUserProfileResponse {
  UserProfileArn?: string;
}
export type CognitoUserPool = string;
export type ClientId = string;
export interface CognitoConfig {
  UserPool?: string;
  ClientId?: string;
}
export type ClientSecret = string | redacted.Redacted<string>;
export type OidcEndpoint = string;
export type Scope = string;
export type AuthenticationRequestExtraParamsKey = string;
export type AuthenticationRequestExtraParamsValue = string;
export type AuthenticationRequestExtraParams = {
  [key: string]: string | undefined;
};
export interface OidcConfig {
  ClientId?: string;
  ClientSecret?: string | redacted.Redacted<string>;
  Issuer?: string;
  AuthorizationEndpoint?: string;
  TokenEndpoint?: string;
  UserInfoEndpoint?: string;
  LogoutEndpoint?: string;
  JwksUri?: string;
  Scope?: string;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
}
export type Cidr = string;
export type Cidrs = string[];
export interface SourceIpConfig {
  Cidrs?: string[];
}
export type WorkforceName = string;
export type WorkforceVpcId = string;
export type WorkforceSecurityGroupId = string;
export type WorkforceSecurityGroupIds = string[];
export type WorkforceSubnetId = string;
export type WorkforceSubnets = string[];
export interface WorkforceVpcConfigRequest {
  VpcId?: string;
  SecurityGroupIds?: string[];
  Subnets?: string[];
}
export type WorkforceIpAddressType = "ipv4" | "dualstack" | (string & {});
export interface CreateWorkforceRequest {
  CognitoConfig?: CognitoConfig;
  OidcConfig?: OidcConfig;
  SourceIpConfig?: SourceIpConfig;
  WorkforceName?: string;
  Tags?: Tag[];
  WorkforceVpcConfig?: WorkforceVpcConfigRequest;
  IpAddressType?: WorkforceIpAddressType;
}
export type WorkforceArn = string;
export interface CreateWorkforceResponse {
  WorkforceArn: string;
}
export type WorkteamName = string;
export type CognitoUserGroup = string;
export interface CognitoMemberDefinition {
  UserPool?: string;
  UserGroup?: string;
  ClientId?: string;
}
export type Group = string;
export type Groups = string[];
export interface OidcMemberDefinition {
  Groups?: string[];
}
export interface MemberDefinition {
  CognitoMemberDefinition?: CognitoMemberDefinition;
  OidcMemberDefinition?: OidcMemberDefinition;
}
export type MemberDefinitions = MemberDefinition[];
export type String200 = string;
export type NotificationTopicArn = string;
export interface NotificationConfiguration {
  NotificationTopicArn?: string;
}
export type EnabledOrDisabled = "Enabled" | "Disabled" | (string & {});
export interface IamPolicyConstraints {
  SourceIp?: EnabledOrDisabled;
  VpcSourceIp?: EnabledOrDisabled;
}
export interface S3Presign {
  IamPolicyConstraints?: IamPolicyConstraints;
}
export interface WorkerAccessConfiguration {
  S3Presign?: S3Presign;
}
export interface CreateWorkteamRequest {
  WorkteamName?: string;
  WorkforceName?: string;
  MemberDefinitions?: MemberDefinition[];
  Description?: string;
  NotificationConfiguration?: NotificationConfiguration;
  WorkerAccessConfiguration?: WorkerAccessConfiguration;
  Tags?: Tag[];
}
export interface CreateWorkteamResponse {
  WorkteamArn?: string;
}
export interface DeleteActionRequest {
  ActionName?: string;
}
export interface DeleteActionResponse {
  ActionArn?: string;
}
export interface DeleteAIBenchmarkJobRequest {
  AIBenchmarkJobName?: string;
}
export interface DeleteAIBenchmarkJobResponse {
  AIBenchmarkJobArn?: string;
}
export interface DeleteAIRecommendationJobRequest {
  AIRecommendationJobName?: string;
}
export interface DeleteAIRecommendationJobResponse {
  AIRecommendationJobArn?: string;
}
export interface DeleteAIWorkloadConfigRequest {
  AIWorkloadConfigName?: string;
}
export interface DeleteAIWorkloadConfigResponse {
  AIWorkloadConfigArn?: string;
}
export interface DeleteAlgorithmInput {
  AlgorithmName?: string;
}
export interface DeleteAlgorithmResponse {}
export interface DeleteAppRequest {
  DomainId?: string;
  UserProfileName?: string;
  SpaceName?: string;
  AppType?: AppType;
  AppName?: string;
}
export interface DeleteAppResponse {}
export interface DeleteAppImageConfigRequest {
  AppImageConfigName?: string;
}
export interface DeleteAppImageConfigResponse {}
export interface DeleteArtifactRequest {
  ArtifactArn?: string;
  Source?: ArtifactSource;
}
export interface DeleteArtifactResponse {
  ArtifactArn?: string;
}
export interface DeleteAssociationRequest {
  SourceArn?: string;
  DestinationArn?: string;
}
export interface DeleteAssociationResponse {
  SourceArn?: string;
  DestinationArn?: string;
}
export interface DeleteClusterRequest {
  ClusterName?: string;
}
export interface DeleteClusterResponse {
  ClusterArn: string;
}
export interface DeleteClusterSchedulerConfigRequest {
  ClusterSchedulerConfigId?: string;
}
export interface DeleteClusterSchedulerConfigResponse {}
export interface DeleteCodeRepositoryInput {
  CodeRepositoryName?: string;
}
export interface DeleteCodeRepositoryResponse {}
export interface DeleteCompilationJobRequest {
  CompilationJobName?: string;
}
export interface DeleteCompilationJobResponse {}
export interface DeleteComputeQuotaRequest {
  ComputeQuotaId?: string;
}
export interface DeleteComputeQuotaResponse {}
export interface DeleteContextRequest {
  ContextName?: string;
}
export interface DeleteContextResponse {
  ContextArn?: string;
}
export interface DeleteDataQualityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DeleteDataQualityJobDefinitionResponse {}
export interface DeleteDeviceFleetRequest {
  DeviceFleetName?: string;
}
export interface DeleteDeviceFleetResponse {}
export type RetentionType = "Retain" | "Delete" | (string & {});
export interface RetentionPolicy {
  HomeEfsFileSystem?: RetentionType;
}
export interface DeleteDomainRequest {
  DomainId?: string;
  RetentionPolicy?: RetentionPolicy;
}
export interface DeleteDomainResponse {}
export interface DeleteEdgeDeploymentPlanRequest {
  EdgeDeploymentPlanName?: string;
}
export interface DeleteEdgeDeploymentPlanResponse {}
export interface DeleteEdgeDeploymentStageRequest {
  EdgeDeploymentPlanName?: string;
  StageName?: string;
}
export interface DeleteEdgeDeploymentStageResponse {}
export interface DeleteEndpointInput {
  EndpointName?: string;
}
export interface DeleteEndpointResponse {}
export interface DeleteEndpointConfigInput {
  EndpointConfigName?: string;
}
export interface DeleteEndpointConfigResponse {}
export interface DeleteExperimentRequest {
  ExperimentName?: string;
}
export interface DeleteExperimentResponse {
  ExperimentArn?: string;
}
export interface DeleteFeatureGroupRequest {
  FeatureGroupName?: string;
}
export interface DeleteFeatureGroupResponse {}
export interface DeleteFlowDefinitionRequest {
  FlowDefinitionName?: string;
}
export interface DeleteFlowDefinitionResponse {}
export interface DeleteHubRequest {
  HubName?: string;
}
export interface DeleteHubResponse {}
export interface DeleteHubContentRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  HubContentName?: string;
  HubContentVersion?: string;
}
export interface DeleteHubContentResponse {}
export interface DeleteHubContentReferenceRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  HubContentName?: string;
}
export interface DeleteHubContentReferenceResponse {}
export interface DeleteHumanTaskUiRequest {
  HumanTaskUiName?: string;
}
export interface DeleteHumanTaskUiResponse {}
export interface DeleteHyperParameterTuningJobRequest {
  HyperParameterTuningJobName?: string;
}
export interface DeleteHyperParameterTuningJobResponse {}
export interface DeleteImageRequest {
  ImageName?: string;
}
export interface DeleteImageResponse {}
export interface DeleteImageVersionRequest {
  ImageName?: string;
  Version?: number;
  Alias?: string;
}
export interface DeleteImageVersionResponse {}
export interface DeleteInferenceComponentInput {
  InferenceComponentName?: string;
}
export interface DeleteInferenceComponentResponse {}
export interface DeleteInferenceExperimentRequest {
  Name?: string;
}
export interface DeleteInferenceExperimentResponse {
  InferenceExperimentArn: string;
}
export interface DeleteJobRequest {
  JobName?: string;
  JobCategory?: JobCategory;
}
export interface DeleteJobResponse {}
export interface DeleteMlflowAppRequest {
  Arn?: string;
}
export interface DeleteMlflowAppResponse {
  Arn?: string;
}
export interface DeleteMlflowTrackingServerRequest {
  TrackingServerName?: string;
}
export interface DeleteMlflowTrackingServerResponse {
  TrackingServerArn?: string;
}
export interface DeleteModelInput {
  ModelName?: string;
}
export interface DeleteModelResponse {}
export interface DeleteModelBiasJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DeleteModelBiasJobDefinitionResponse {}
export interface DeleteModelCardRequest {
  ModelCardName?: string;
}
export interface DeleteModelCardResponse {}
export interface DeleteModelExplainabilityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DeleteModelExplainabilityJobDefinitionResponse {}
export interface DeleteModelPackageInput {
  ModelPackageName?: string;
}
export interface DeleteModelPackageResponse {}
export interface DeleteModelPackageGroupInput {
  ModelPackageGroupName?: string;
}
export interface DeleteModelPackageGroupResponse {}
export interface DeleteModelPackageGroupPolicyInput {
  ModelPackageGroupName?: string;
}
export interface DeleteModelPackageGroupPolicyResponse {}
export interface DeleteModelQualityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DeleteModelQualityJobDefinitionResponse {}
export interface DeleteMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
}
export interface DeleteMonitoringScheduleResponse {}
export interface DeleteNotebookInstanceInput {
  NotebookInstanceName?: string;
}
export interface DeleteNotebookInstanceResponse {}
export interface DeleteNotebookInstanceLifecycleConfigInput {
  NotebookInstanceLifecycleConfigName?: string;
}
export interface DeleteNotebookInstanceLifecycleConfigResponse {}
export interface DeleteOptimizationJobRequest {
  OptimizationJobName?: string;
}
export interface DeleteOptimizationJobResponse {}
export interface DeletePartnerAppRequest {
  Arn?: string;
  ClientToken?: string;
}
export interface DeletePartnerAppResponse {
  Arn?: string;
}
export interface DeletePipelineRequest {
  PipelineName?: string;
  ClientRequestToken?: string;
}
export interface DeletePipelineResponse {
  PipelineArn?: string;
}
export interface DeleteProcessingJobRequest {
  ProcessingJobName?: string;
}
export interface DeleteProcessingJobResponse {}
export interface DeleteProjectInput {
  ProjectName?: string;
}
export interface DeleteProjectResponse {}
export interface DeleteSpaceRequest {
  DomainId?: string;
  SpaceName?: string;
}
export interface DeleteSpaceResponse {}
export interface DeleteStudioLifecycleConfigRequest {
  StudioLifecycleConfigName?: string;
}
export interface DeleteStudioLifecycleConfigResponse {}
export type TagKeyList = string[];
export interface DeleteTagsInput {
  ResourceArn?: string;
  TagKeys?: string[];
}
export interface DeleteTagsOutput {}
export interface DeleteTrainingJobRequest {
  TrainingJobName?: string;
}
export interface DeleteTrainingJobResponse {}
export interface DeleteTrialRequest {
  TrialName?: string;
}
export interface DeleteTrialResponse {
  TrialArn?: string;
}
export interface DeleteTrialComponentRequest {
  TrialComponentName?: string;
}
export interface DeleteTrialComponentResponse {
  TrialComponentArn?: string;
}
export interface DeleteUserProfileRequest {
  DomainId?: string;
  UserProfileName?: string;
}
export interface DeleteUserProfileResponse {}
export interface DeleteWorkforceRequest {
  WorkforceName?: string;
}
export interface DeleteWorkforceResponse {}
export interface DeleteWorkteamRequest {
  WorkteamName?: string;
}
export type Success = boolean;
export interface DeleteWorkteamResponse {
  Success: boolean;
}
export interface DeregisterDevicesRequest {
  DeviceFleetName?: string;
  DeviceNames?: string[];
}
export interface DeregisterDevicesResponse {}
export type ExperimentEntityNameOrArn = string;
export interface DescribeActionRequest {
  ActionName?: string;
}
export interface IamIdentity {
  Arn?: string;
  PrincipalId?: string;
  SourceIdentity?: string;
}
export interface UserContext {
  UserProfileArn?: string;
  UserProfileName?: string;
  DomainId?: string;
  IamIdentity?: IamIdentity;
}
export type LineageGroupArn = string;
export interface DescribeActionResponse {
  ActionName?: string;
  ActionArn?: string;
  Source?: ActionSource & { SourceUri: SourceUri };
  ActionType?: string;
  Description?: string;
  Status?: ActionStatus;
  Properties?: { [key: string]: string | undefined };
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
  LineageGroupArn?: string;
}
export interface DescribeAIBenchmarkJobRequest {
  AIBenchmarkJobName?: string;
}
export type AIBenchmarkJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type FailureReason = string;
export interface AICloudWatchLogs {
  LogGroupArn?: string;
  LogStreamName?: string;
}
export type AICloudWatchLogsList = AICloudWatchLogs[];
export interface AIBenchmarkOutputResult {
  S3OutputLocation?: string;
  CloudWatchLogs?: AICloudWatchLogs[];
  MlflowConfig?: AIMlflowConfig;
}
export interface DescribeAIBenchmarkJobResponse {
  AIBenchmarkJobName: string;
  AIBenchmarkJobArn: string;
  AIBenchmarkJobStatus: AIBenchmarkJobStatus;
  FailureReason?: string;
  BenchmarkTarget: AIBenchmarkTarget;
  OutputConfig: AIBenchmarkOutputResult & {
    S3OutputLocation: S3Uri;
    MlflowConfig: AIMlflowConfig & { MlflowResourceArn: AIMlflowResourceArn };
  };
  AIWorkloadConfigIdentifier: string;
  RoleArn: string;
  NetworkConfig?: AIBenchmarkNetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  CreationTime: Date;
  StartTime?: Date;
  EndTime?: Date;
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export interface DescribeAIRecommendationJobRequest {
  AIRecommendationJobName?: string;
}
export type AIRecommendationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface AIRecommendationOutputResult {
  S3OutputLocation?: string;
  ModelPackageGroupIdentifier?: string;
  MlflowConfig?: AIMlflowConfig;
}
export type AIRecommendationOptimizationType =
  | "SpeculativeDecoding"
  | "KernelTuning"
  | (string & {});
export type AIRecommendationOptimizationConfigMap = {
  [key: string]: string | undefined;
};
export interface AIRecommendationOptimizationDetail {
  OptimizationType?: AIRecommendationOptimizationType;
  OptimizationConfig?: { [key: string]: string | undefined };
}
export type AIRecommendationOptimizationDetailList =
  AIRecommendationOptimizationDetail[];
export type AIInferenceSpecificationName = string;
export type AIRecommendationInstanceCount = number;
export type AIRecommendationCopyCountPerInstance = number;
export interface AIRecommendationInstanceDetail {
  InstanceType?: AIRecommendationInstanceType;
  InstanceCount?: number;
  CopyCountPerInstance?: number;
}
export type AIRecommendationInstanceDetailList =
  AIRecommendationInstanceDetail[];
export interface AIRecommendationModelDetails {
  ModelPackageArn?: string;
  InferenceSpecificationName?: string;
  InstanceDetails?: AIRecommendationInstanceDetail[];
}
export interface AIRecommendationDeploymentS3Channel {
  ChannelName?: string;
  Uri?: string;
}
export type AIRecommendationDeploymentS3ChannelList =
  AIRecommendationDeploymentS3Channel[];
export type AIRecommendationMinCpuMemoryRequiredInMb = number;
export interface AIRecommendationDeploymentConfiguration {
  S3?: AIRecommendationDeploymentS3Channel[];
  ImageUri?: string;
  InstanceType?: AIRecommendationInstanceType;
  InstanceCount?: number;
  CopyCountPerInstance?: number;
  EnvironmentVariables?: { [key: string]: string | undefined };
  MinCpuMemoryRequiredInMb?: number;
}
export interface AIRecommendationPerformanceMetric {
  Metric?: string;
  Stat?: string;
  Value?: string;
  Unit?: string;
}
export type ExpectedPerformanceList = AIRecommendationPerformanceMetric[];
export interface AIRecommendationAdapterDetails {
  ModelPackageArns?: AIAdapterModelPackageEntry[];
  S3Uris?: AIAdapterS3Entry[];
}
export interface AIRecommendation {
  RecommendationDescription?: string;
  OptimizationDetails?: AIRecommendationOptimizationDetail[];
  ModelDetails?: AIRecommendationModelDetails;
  DeploymentConfiguration?: AIRecommendationDeploymentConfiguration;
  AIBenchmarkJobArn?: string;
  ExpectedPerformance?: AIRecommendationPerformanceMetric[];
  AdapterDetails?: AIRecommendationAdapterDetails;
}
export type AIRecommendationList = AIRecommendation[];
export interface DescribeAIRecommendationJobResponse {
  AIRecommendationJobName: string;
  AIRecommendationJobArn: string;
  AIRecommendationJobStatus: AIRecommendationJobStatus;
  FailureReason?: string;
  ModelSource: AIModelSource;
  OutputConfig: AIRecommendationOutputResult & {
    S3OutputLocation: S3Uri;
    MlflowConfig: AIMlflowConfig & { MlflowResourceArn: AIMlflowResourceArn };
  };
  InferenceSpecification?: AIRecommendationInferenceSpecification;
  AIWorkloadConfigIdentifier: string;
  OptimizeModel?: boolean;
  PerformanceTarget?: AIRecommendationPerformanceTarget & {
    Constraints: (AIRecommendationConstraint & {
      Metric: AIRecommendationMetric;
    })[];
  };
  Recommendations?: (AIRecommendation & {
    OptimizationDetails: (AIRecommendationOptimizationDetail & {
      OptimizationType: AIRecommendationOptimizationType;
    })[];
    ExpectedPerformance: (AIRecommendationPerformanceMetric & {
      Metric: string;
      Value: string;
    })[];
    AdapterDetails: AIRecommendationAdapterDetails & {
      ModelPackageArns: (AIAdapterModelPackageEntry & {
        AdapterId: AIAdapterId;
        ModelPackageArn: ModelPackageArn;
      })[];
      S3Uris: (AIAdapterS3Entry & { AdapterId: AIAdapterId; S3Uri: S3Uri })[];
    };
  })[];
  RoleArn: string;
  ComputeSpec?: AIRecommendationComputeSpec;
  AdapterSource?: AIAdapterSource;
  CreationTime: Date;
  StartTime?: Date;
  EndTime?: Date;
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export interface DescribeAIWorkloadConfigRequest {
  AIWorkloadConfigName?: string;
}
export interface DescribeAIWorkloadConfigResponse {
  AIWorkloadConfigName: string;
  AIWorkloadConfigArn: string;
  DatasetConfig?: AIDatasetConfig;
  AIWorkloadConfigs?: AIWorkloadConfigs & { WorkloadSpec: WorkloadSpec };
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  CreationTime: Date;
}
export interface DescribeAlgorithmInput {
  AlgorithmName?: string;
}
export type AlgorithmStatus =
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export type DetailedAlgorithmStatus =
  | "NotStarted"
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export interface AlgorithmStatusItem {
  Name?: string;
  Status?: DetailedAlgorithmStatus;
  FailureReason?: string;
}
export type AlgorithmStatusItemList = AlgorithmStatusItem[];
export interface AlgorithmStatusDetails {
  ValidationStatuses?: AlgorithmStatusItem[];
  ImageScanStatuses?: AlgorithmStatusItem[];
}
export interface DescribeAlgorithmOutput {
  AlgorithmName: string;
  AlgorithmArn: string;
  AlgorithmDescription?: string;
  CreationTime: Date;
  TrainingSpecification: TrainingSpecification & {
    TrainingImage: ContainerImage;
    SupportedTrainingInstanceTypes: TrainingInstanceTypes;
    TrainingChannels: (ChannelSpecification & {
      Name: ChannelName;
      SupportedContentTypes: ContentTypes;
      SupportedInputModes: InputModes;
    })[];
    SupportedHyperParameters: (HyperParameterSpecification & {
      Name: ParameterName;
      Type: ParameterType;
      Range: ParameterRange & {
        IntegerParameterRangeSpecification: IntegerParameterRangeSpecification & {
          MinValue: ParameterValue;
          MaxValue: ParameterValue;
        };
        ContinuousParameterRangeSpecification: ContinuousParameterRangeSpecification & {
          MinValue: ParameterValue;
          MaxValue: ParameterValue;
        };
        CategoricalParameterRangeSpecification: CategoricalParameterRangeSpecification & {
          Values: ParameterValues;
        };
      };
    })[];
    MetricDefinitions: (MetricDefinition & {
      Name: MetricName;
      Regex: MetricRegex;
    })[];
    SupportedTuningJobObjectiveMetrics: (HyperParameterTuningJobObjective & {
      Type: HyperParameterTuningJobObjectiveType;
      MetricName: MetricName;
    })[];
    AdditionalS3DataSource: AdditionalS3DataSource & {
      S3DataType: AdditionalS3DataSourceDataType;
      S3Uri: S3Uri;
    };
  };
  InferenceSpecification?: InferenceSpecification & {
    Containers: (ModelPackageContainerDefinition & {
      ModelDataSource: ModelDataSource & {
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      };
      ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
      AdditionalModelDataSources: (AdditionalModelDataSource & {
        ChannelName: AdditionalModelChannelName;
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      })[];
      AdditionalS3DataSource: AdditionalS3DataSource & {
        S3DataType: AdditionalS3DataSourceDataType;
        S3Uri: S3Uri;
      };
    })[];
  };
  ValidationSpecification?: AlgorithmValidationSpecification & {
    ValidationRole: RoleArn;
    ValidationProfiles: (AlgorithmValidationProfile & {
      ProfileName: EntityName;
      TrainingJobDefinition: TrainingJobDefinition & {
        TrainingInputMode: TrainingInputMode;
        InputDataConfig: (Channel & {
          ChannelName: ChannelName;
          DataSource: DataSource & {
            S3DataSource: S3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: HubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
            FileSystemDataSource: FileSystemDataSource & {
              FileSystemId: FileSystemId;
              FileSystemAccessMode: FileSystemAccessMode;
              FileSystemType: FileSystemType;
              DirectoryPath: DirectoryPath;
            };
          };
          ShuffleConfig: ShuffleConfig & { Seed: Seed };
        })[];
        OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
        ResourceConfig: ResourceConfig & {
          InstanceGroups: (InstanceGroup & {
            InstanceType: TrainingInstanceType;
            InstanceCount: TrainingInstanceCount;
            InstanceGroupName: InstanceGroupName;
          })[];
          InstancePlacementConfig: InstancePlacementConfig & {
            PlacementSpecifications: (PlacementSpecification & {
              InstanceCount: TrainingInstanceCount;
            })[];
          };
        };
        StoppingCondition: StoppingCondition;
      };
      TransformJobDefinition: TransformJobDefinition & {
        TransformInput: TransformInput & {
          DataSource: TransformDataSource & {
            S3DataSource: TransformS3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
            };
          };
        };
        TransformOutput: TransformOutput & { S3OutputPath: S3Uri };
        TransformResources: TransformResources & {
          InstanceType: TransformInstanceType;
          InstanceCount: TransformInstanceCount;
        };
      };
    })[];
  };
  AlgorithmStatus: AlgorithmStatus;
  AlgorithmStatusDetails: AlgorithmStatusDetails & {
    ValidationStatuses: (AlgorithmStatusItem & {
      Name: EntityName;
      Status: DetailedAlgorithmStatus;
    })[];
    ImageScanStatuses: (AlgorithmStatusItem & {
      Name: EntityName;
      Status: DetailedAlgorithmStatus;
    })[];
  };
  ProductId?: string;
  CertifyForMarketplace?: boolean;
}
export interface DescribeAppRequest {
  DomainId?: string;
  UserProfileName?: string;
  SpaceName?: string;
  AppType?: AppType;
  AppName?: string;
}
export type AppStatus =
  | "Deleted"
  | "Deleting"
  | "Failed"
  | "InService"
  | "Pending"
  | (string & {});
export interface DescribeAppResponse {
  AppArn?: string;
  AppType?: AppType;
  AppName?: string;
  DomainId?: string;
  UserProfileName?: string;
  SpaceName?: string;
  Status?: AppStatus;
  EffectiveTrustedIdentityPropagationStatus?: FeatureStatus;
  RecoveryMode?: boolean;
  LastHealthCheckTimestamp?: Date;
  LastUserActivityTimestamp?: Date;
  CreationTime?: Date;
  FailureReason?: string;
  ResourceSpec?: ResourceSpec;
  BuiltInLifecycleConfigArn?: string;
}
export interface DescribeAppImageConfigRequest {
  AppImageConfigName?: string;
}
export interface DescribeAppImageConfigResponse {
  AppImageConfigArn?: string;
  AppImageConfigName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  KernelGatewayImageConfig?: KernelGatewayImageConfig & {
    KernelSpecs: (KernelSpec & { Name: KernelName })[];
  };
  JupyterLabAppImageConfig?: JupyterLabAppImageConfig;
  CodeEditorAppImageConfig?: CodeEditorAppImageConfig;
}
export interface DescribeArtifactRequest {
  ArtifactArn?: string;
}
export interface DescribeArtifactResponse {
  ArtifactName?: string;
  ArtifactArn?: string;
  Source?: ArtifactSource & {
    SourceUri: SourceUri;
    SourceTypes: (ArtifactSourceType & {
      SourceIdType: ArtifactSourceIdType;
      Value: String256;
    })[];
  };
  ArtifactType?: string;
  Properties?: { [key: string]: string | undefined };
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
  LineageGroupArn?: string;
}
export interface DescribeAutoMLJobRequest {
  AutoMLJobName?: string;
}
export type AutoMLFailureReason = string;
export interface AutoMLPartialFailureReason {
  PartialFailureMessage?: string;
}
export type AutoMLPartialFailureReasons = AutoMLPartialFailureReason[];
export type CandidateName = string;
export type AutoMLJobObjectiveType = "Maximize" | "Minimize" | (string & {});
export type MetricValue = number;
export interface FinalAutoMLJobObjectiveMetric {
  Type?: AutoMLJobObjectiveType;
  MetricName?: AutoMLMetricEnum;
  Value?: number;
  StandardMetricName?: AutoMLMetricEnum;
}
export type ObjectiveStatus =
  | "Succeeded"
  | "Pending"
  | "Failed"
  | (string & {});
export type CandidateStepType =
  | "AWS::SageMaker::TrainingJob"
  | "AWS::SageMaker::TransformJob"
  | "AWS::SageMaker::ProcessingJob"
  | (string & {});
export type CandidateStepArn = string;
export type CandidateStepName = string;
export interface AutoMLCandidateStep {
  CandidateStepType?: CandidateStepType;
  CandidateStepArn?: string;
  CandidateStepName?: string;
}
export type CandidateSteps = AutoMLCandidateStep[];
export type CandidateStatus =
  | "Completed"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | (string & {});
export interface AutoMLContainerDefinition {
  Image?: string;
  ModelDataUrl?: string;
  Environment?: { [key: string]: string | undefined };
}
export type AutoMLContainerDefinitions = AutoMLContainerDefinition[];
export type ExplainabilityLocation = string;
export type ModelInsightsLocation = string;
export type BacktestResultsLocation = string;
export interface CandidateArtifactLocations {
  Explainability?: string;
  ModelInsights?: string;
  BacktestResults?: string;
}
export type AutoMLMetricExtendedEnum =
  | "Accuracy"
  | "MSE"
  | "F1"
  | "F1macro"
  | "AUC"
  | "RMSE"
  | "MAE"
  | "R2"
  | "BalancedAccuracy"
  | "Precision"
  | "PrecisionMacro"
  | "Recall"
  | "RecallMacro"
  | "LogLoss"
  | "InferenceLatency"
  | "MAPE"
  | "MASE"
  | "WAPE"
  | "AverageWeightedQuantileLoss"
  | "Rouge1"
  | "Rouge2"
  | "RougeL"
  | "RougeLSum"
  | "Perplexity"
  | "ValidationLoss"
  | "TrainingLoss"
  | (string & {});
export type MetricSetSource = "Train" | "Validation" | "Test" | (string & {});
export interface MetricDatum {
  MetricName?: AutoMLMetricEnum;
  StandardMetricName?: AutoMLMetricExtendedEnum;
  Value?: number;
  Set?: MetricSetSource;
}
export type MetricDataList = MetricDatum[];
export interface CandidateProperties {
  CandidateArtifactLocations?: CandidateArtifactLocations;
  CandidateMetrics?: MetricDatum[];
}
export type AutoMLProcessingUnit = "CPU" | "GPU" | (string & {});
export type AutoMLInferenceContainerDefinitions = {
  [key in AutoMLProcessingUnit]?: AutoMLContainerDefinition[];
};
export interface AutoMLCandidate {
  CandidateName?: string;
  FinalAutoMLJobObjectiveMetric?: FinalAutoMLJobObjectiveMetric;
  ObjectiveStatus?: ObjectiveStatus;
  CandidateSteps?: AutoMLCandidateStep[];
  CandidateStatus?: CandidateStatus;
  InferenceContainers?: AutoMLContainerDefinition[];
  CreationTime?: Date;
  EndTime?: Date;
  LastModifiedTime?: Date;
  FailureReason?: string;
  CandidateProperties?: CandidateProperties;
  InferenceContainerDefinitions?: {
    [key: string]: AutoMLContainerDefinition[] | undefined;
  };
}
export type AutoMLJobStatus =
  | "Completed"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | (string & {});
export type AutoMLJobSecondaryStatus =
  | "Starting"
  | "MaxCandidatesReached"
  | "Failed"
  | "Stopped"
  | "MaxAutoMLJobRuntimeReached"
  | "Stopping"
  | "CandidateDefinitionsGenerated"
  | "Completed"
  | "ExplainabilityError"
  | "DeployingModel"
  | "ModelDeploymentError"
  | "GeneratingModelInsightsReport"
  | "ModelInsightsError"
  | "AnalyzingData"
  | "FeatureEngineering"
  | "ModelTuning"
  | "GeneratingExplainabilityReport"
  | "TrainingModels"
  | "PreTraining"
  | (string & {});
export type CandidateDefinitionNotebookLocation = string;
export type DataExplorationNotebookLocation = string;
export interface AutoMLJobArtifacts {
  CandidateDefinitionNotebookLocation?: string;
  DataExplorationNotebookLocation?: string;
}
export interface ResolvedAttributes {
  AutoMLJobObjective?: AutoMLJobObjective;
  ProblemType?: ProblemType;
  CompletionCriteria?: AutoMLJobCompletionCriteria;
}
export interface ModelDeployResult {
  EndpointName?: string;
}
export interface DescribeAutoMLJobResponse {
  AutoMLJobName: string;
  AutoMLJobArn: string;
  InputDataConfig: (AutoMLChannel & {
    TargetAttributeName: TargetAttributeName;
    DataSource: AutoMLDataSource & {
      S3DataSource: AutoMLS3DataSource & {
        S3DataType: AutoMLS3DataType;
        S3Uri: S3Uri;
      };
    };
  })[];
  OutputDataConfig: AutoMLOutputDataConfig & { S3OutputPath: S3Uri };
  RoleArn: string;
  AutoMLJobObjective?: AutoMLJobObjective & { MetricName: AutoMLMetricEnum };
  ProblemType?: ProblemType;
  AutoMLJobConfig?: AutoMLJobConfig & {
    SecurityConfig: AutoMLSecurityConfig & {
      VpcConfig: VpcConfig & {
        SecurityGroupIds: VpcSecurityGroupIds;
        Subnets: Subnets;
      };
    };
    CandidateGenerationConfig: AutoMLCandidateGenerationConfig & {
      AlgorithmsConfig: (AutoMLAlgorithmConfig & {
        AutoMLAlgorithms: AutoMLAlgorithms;
      })[];
    };
  };
  CreationTime: Date;
  EndTime?: Date;
  LastModifiedTime: Date;
  FailureReason?: string;
  PartialFailureReasons?: AutoMLPartialFailureReason[];
  BestCandidate?: AutoMLCandidate & {
    CandidateName: CandidateName;
    ObjectiveStatus: ObjectiveStatus;
    CandidateSteps: (AutoMLCandidateStep & {
      CandidateStepType: CandidateStepType;
      CandidateStepArn: CandidateStepArn;
      CandidateStepName: CandidateStepName;
    })[];
    CandidateStatus: CandidateStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
    FinalAutoMLJobObjectiveMetric: FinalAutoMLJobObjectiveMetric & {
      MetricName: AutoMLMetricEnum;
      Value: MetricValue;
    };
    InferenceContainers: (AutoMLContainerDefinition & {
      Image: ContainerImage;
      ModelDataUrl: Url;
    })[];
    CandidateProperties: CandidateProperties & {
      CandidateArtifactLocations: CandidateArtifactLocations & {
        Explainability: ExplainabilityLocation;
      };
    };
    InferenceContainerDefinitions: {
      [key: string]:
        | (AutoMLContainerDefinition & {
            Image: ContainerImage;
            ModelDataUrl: Url;
          })[]
        | undefined;
    };
  };
  AutoMLJobStatus: AutoMLJobStatus;
  AutoMLJobSecondaryStatus: AutoMLJobSecondaryStatus;
  GenerateCandidateDefinitionsOnly?: boolean;
  AutoMLJobArtifacts?: AutoMLJobArtifacts;
  ResolvedAttributes?: ResolvedAttributes & {
    AutoMLJobObjective: AutoMLJobObjective & { MetricName: AutoMLMetricEnum };
  };
  ModelDeployConfig?: ModelDeployConfig;
  ModelDeployResult?: ModelDeployResult;
}
export interface DescribeAutoMLJobV2Request {
  AutoMLJobName?: string;
}
export type AutoMLProblemTypeConfigName =
  | "ImageClassification"
  | "TextClassification"
  | "TimeSeriesForecasting"
  | "Tabular"
  | "TextGeneration"
  | (string & {});
export interface TabularResolvedAttributes {
  ProblemType?: ProblemType;
}
export interface TextGenerationResolvedAttributes {
  BaseModelName?: string;
}
export type AutoMLProblemTypeResolvedAttributes =
  | {
      TabularResolvedAttributes: TabularResolvedAttributes;
      TextGenerationResolvedAttributes?: never;
    }
  | {
      TabularResolvedAttributes?: never;
      TextGenerationResolvedAttributes: TextGenerationResolvedAttributes;
    };
export interface AutoMLResolvedAttributes {
  AutoMLJobObjective?: AutoMLJobObjective;
  CompletionCriteria?: AutoMLJobCompletionCriteria;
  AutoMLProblemTypeResolvedAttributes?: AutoMLProblemTypeResolvedAttributes;
}
export interface DescribeAutoMLJobV2Response {
  AutoMLJobName: string;
  AutoMLJobArn: string;
  AutoMLJobInputDataConfig: (AutoMLJobChannel & {
    DataSource: AutoMLDataSource & {
      S3DataSource: AutoMLS3DataSource & {
        S3DataType: AutoMLS3DataType;
        S3Uri: S3Uri;
      };
    };
  })[];
  OutputDataConfig: AutoMLOutputDataConfig & { S3OutputPath: S3Uri };
  RoleArn: string;
  AutoMLJobObjective?: AutoMLJobObjective & { MetricName: AutoMLMetricEnum };
  AutoMLProblemTypeConfig?: AutoMLProblemTypeConfig;
  AutoMLProblemTypeConfigName?: AutoMLProblemTypeConfigName;
  CreationTime: Date;
  EndTime?: Date;
  LastModifiedTime: Date;
  FailureReason?: string;
  PartialFailureReasons?: AutoMLPartialFailureReason[];
  BestCandidate?: AutoMLCandidate & {
    CandidateName: CandidateName;
    ObjectiveStatus: ObjectiveStatus;
    CandidateSteps: (AutoMLCandidateStep & {
      CandidateStepType: CandidateStepType;
      CandidateStepArn: CandidateStepArn;
      CandidateStepName: CandidateStepName;
    })[];
    CandidateStatus: CandidateStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
    FinalAutoMLJobObjectiveMetric: FinalAutoMLJobObjectiveMetric & {
      MetricName: AutoMLMetricEnum;
      Value: MetricValue;
    };
    InferenceContainers: (AutoMLContainerDefinition & {
      Image: ContainerImage;
      ModelDataUrl: Url;
    })[];
    CandidateProperties: CandidateProperties & {
      CandidateArtifactLocations: CandidateArtifactLocations & {
        Explainability: ExplainabilityLocation;
      };
    };
    InferenceContainerDefinitions: {
      [key: string]:
        | (AutoMLContainerDefinition & {
            Image: ContainerImage;
            ModelDataUrl: Url;
          })[]
        | undefined;
    };
  };
  AutoMLJobStatus: AutoMLJobStatus;
  AutoMLJobSecondaryStatus: AutoMLJobSecondaryStatus;
  AutoMLJobArtifacts?: AutoMLJobArtifacts;
  ResolvedAttributes?: AutoMLResolvedAttributes & {
    AutoMLJobObjective: AutoMLJobObjective & { MetricName: AutoMLMetricEnum };
  };
  ModelDeployConfig?: ModelDeployConfig;
  ModelDeployResult?: ModelDeployResult;
  DataSplitConfig?: AutoMLDataSplitConfig;
  SecurityConfig?: AutoMLSecurityConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  AutoMLComputeConfig?: AutoMLComputeConfig & {
    EmrServerlessComputeConfig: EmrServerlessComputeConfig & {
      ExecutionRoleARN: RoleArn;
    };
  };
}
export interface DescribeClusterRequest {
  ClusterName?: string;
}
export type ClusterStatus =
  | "Creating"
  | "Deleting"
  | "Failed"
  | "InService"
  | "RollingBack"
  | "SystemUpdating"
  | "Updating"
  | (string & {});
export type ClusterNonNegativeInstanceCount = number;
export interface ClusterInstanceRequirementDetails {
  CurrentInstanceTypes?: ClusterInstanceType[];
  DesiredInstanceTypes?: ClusterInstanceType[];
}
export interface ClusterInstanceTypeDetail {
  InstanceType?: ClusterInstanceType;
  CurrentCount?: number;
  ThreadsPerCore?: number;
}
export type ClusterInstanceTypeDetails = ClusterInstanceTypeDetail[];
export type InstanceGroupStatus =
  | "InService"
  | "Creating"
  | "Updating"
  | "Failed"
  | "Degraded"
  | "SystemUpdating"
  | "Deleting"
  | (string & {});
export type InstanceGroupTrainingPlanStatus = string;
export interface ClusterPatchScheduleDetails {
  NextPatchDate?: Date;
}
export interface ClusterAutoPatchConfigDetails {
  PatchingStrategy?: ClusterPatchingStrategy;
  CurrentPatchSchedule?: ClusterPatchScheduleDetails;
  DesiredPatchSchedule?: ClusterPatchScheduleDetails;
  DeploymentConfig?: DeploymentConfiguration;
}
export type ClusterImageVersionStatus =
  | "UpToDate"
  | "UpdateAvailable"
  | "SecurityUpdateRequired"
  | "EndOfLife"
  | (string & {});
export type ActiveClusterOperationName = "Scaling" | (string & {});
export type ActiveClusterOperationCount = number;
export type ActiveOperations = { [key in ActiveClusterOperationName]?: number };
export interface ClusterKubernetesConfigDetails {
  CurrentLabels?: { [key: string]: string | undefined };
  DesiredLabels?: { [key: string]: string | undefined };
  CurrentTaints?: ClusterKubernetesTaint[];
  DesiredTaints?: ClusterKubernetesTaint[];
}
export type SoftwareUpdateStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "RollbackInProgress"
  | "RollbackComplete"
  | (string & {});
export interface ClusterSlurmConfigDetails {
  NodeType: ClusterSlurmNodeType;
  PartitionNames?: string[];
}
export interface ClusterNetworkInterfaceDetails {
  InterfaceType?: ClusterInterfaceType;
}
export interface ClusterInstanceGroupDetails {
  CurrentCount?: number;
  TargetCount?: number;
  MinCount?: number;
  InstanceGroupName?: string;
  InstanceType?: ClusterInstanceType;
  InstanceRequirements?: ClusterInstanceRequirementDetails;
  InstanceTypeDetails?: ClusterInstanceTypeDetail[];
  LifeCycleConfig?: ClusterLifeCycleConfig;
  ExecutionRole?: string;
  ThreadsPerCore?: number;
  InstanceStorageConfigs?: ClusterInstanceStorageConfig[];
  OnStartDeepHealthChecks?: DeepHealthCheckType[];
  Status?: InstanceGroupStatus;
  TrainingPlanArn?: string;
  TrainingPlanStatus?: string;
  OverrideVpcConfig?: VpcConfig;
  ScheduledUpdateConfig?: ScheduledUpdateConfig;
  AutoPatchConfig?: ClusterAutoPatchConfigDetails;
  CurrentImageId?: string;
  DesiredImageId?: string;
  CurrentImageReleaseVersion?: string;
  DesiredImageReleaseVersion?: string;
  ImageVersionStatus?: ClusterImageVersionStatus;
  ActiveOperations?: { [key: string]: number | undefined };
  KubernetesConfig?: ClusterKubernetesConfigDetails;
  CapacityRequirements?: ClusterCapacityRequirements;
  TargetStateCount?: number;
  SoftwareUpdateStatus?: SoftwareUpdateStatus;
  ActiveSoftwareUpdateConfig?: DeploymentConfiguration;
  SlurmConfig?: ClusterSlurmConfigDetails;
  NetworkInterface?: ClusterNetworkInterfaceDetails;
}
export type ClusterInstanceGroupDetailsList = ClusterInstanceGroupDetails[];
export interface EnvironmentConfigDetails {
  FSxLustreConfig?: FSxLustreConfig;
  S3OutputPath?: string;
}
export interface ClusterRestrictedInstanceGroupDetails {
  CurrentCount?: number;
  TargetCount?: number;
  InstanceGroupName?: string;
  InstanceType?: ClusterInstanceType;
  ExecutionRole?: string;
  ThreadsPerCore?: number;
  InstanceStorageConfigs?: ClusterInstanceStorageConfig[];
  OnStartDeepHealthChecks?: DeepHealthCheckType[];
  Status?: InstanceGroupStatus;
  TrainingPlanArn?: string;
  TrainingPlanStatus?: string;
  OverrideVpcConfig?: VpcConfig;
  ScheduledUpdateConfig?: ScheduledUpdateConfig;
  EnvironmentConfig?: EnvironmentConfigDetails;
}
export type ClusterRestrictedInstanceGroupDetailsList =
  ClusterRestrictedInstanceGroupDetails[];
export interface ClusterSharedEnvironmentConfigDetails {
  CurrentFSxLustreConfig?: FSxLustreConfig;
  DesiredFSxLustreConfig?: FSxLustreConfig;
  CurrentFSxLustreDeletionPolicy?: ClusterFSxLustreDeletionPolicy;
  DesiredFSxLustreDeletionPolicy?: ClusterFSxLustreDeletionPolicy;
}
export interface ClusterRestrictedInstanceGroupsConfigOutput {
  SharedEnvironmentConfig?: ClusterSharedEnvironmentConfigDetails;
}
export type ClusterAutoScalingStatus =
  | "InService"
  | "Failed"
  | "Creating"
  | "Deleting"
  | (string & {});
export interface ClusterAutoScalingConfigOutput {
  Mode: ClusterAutoScalingMode;
  AutoScalerType?: ClusterAutoScalerType;
  Status: ClusterAutoScalingStatus;
  FailureMessage?: string;
}
export interface DescribeClusterResponse {
  ClusterArn: string;
  ClusterName?: string;
  ClusterStatus: ClusterStatus;
  CreationTime?: Date;
  FailureMessage?: string;
  InstanceGroups: (ClusterInstanceGroupDetails & {
    OverrideVpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
    ScheduledUpdateConfig: ScheduledUpdateConfig & {
      ScheduleExpression: CronScheduleExpression;
      DeploymentConfig: DeploymentConfiguration & {
        RollingUpdatePolicy: RollingDeploymentPolicy & {
          MaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
          RollbackMaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
        };
        AutoRollbackConfiguration: (AlarmDetails & { AlarmName: AlarmName })[];
      };
    };
    AutoPatchConfig: ClusterAutoPatchConfigDetails & {
      DeploymentConfig: DeploymentConfiguration & {
        RollingUpdatePolicy: RollingDeploymentPolicy & {
          MaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
          RollbackMaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
        };
        AutoRollbackConfiguration: (AlarmDetails & { AlarmName: AlarmName })[];
      };
    };
    ActiveSoftwareUpdateConfig: DeploymentConfiguration & {
      RollingUpdatePolicy: RollingDeploymentPolicy & {
        MaximumBatchSize: CapacitySizeConfig & {
          Type: NodeUnavailabilityType;
          Value: NodeUnavailabilityValue;
        };
        RollbackMaximumBatchSize: CapacitySizeConfig & {
          Type: NodeUnavailabilityType;
          Value: NodeUnavailabilityValue;
        };
      };
      AutoRollbackConfiguration: (AlarmDetails & { AlarmName: AlarmName })[];
    };
  })[];
  RestrictedInstanceGroups?: (ClusterRestrictedInstanceGroupDetails & {
    OverrideVpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
    ScheduledUpdateConfig: ScheduledUpdateConfig & {
      ScheduleExpression: CronScheduleExpression;
      DeploymentConfig: DeploymentConfiguration & {
        RollingUpdatePolicy: RollingDeploymentPolicy & {
          MaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
          RollbackMaximumBatchSize: CapacitySizeConfig & {
            Type: NodeUnavailabilityType;
            Value: NodeUnavailabilityValue;
          };
        };
        AutoRollbackConfiguration: (AlarmDetails & { AlarmName: AlarmName })[];
      };
    };
    EnvironmentConfig: EnvironmentConfigDetails & {
      FSxLustreConfig: FSxLustreConfig & {
        SizeInGiB: FSxLustreSizeInGiB;
        PerUnitStorageThroughput: FSxLustrePerUnitStorageThroughput;
      };
    };
  })[];
  RestrictedInstanceGroupsConfig?: ClusterRestrictedInstanceGroupsConfigOutput & {
    SharedEnvironmentConfig: ClusterSharedEnvironmentConfigDetails & {
      CurrentFSxLustreConfig: FSxLustreConfig & {
        SizeInGiB: FSxLustreSizeInGiB;
        PerUnitStorageThroughput: FSxLustrePerUnitStorageThroughput;
      };
      DesiredFSxLustreConfig: FSxLustreConfig & {
        SizeInGiB: FSxLustreSizeInGiB;
        PerUnitStorageThroughput: FSxLustrePerUnitStorageThroughput;
      };
    };
  };
  VpcConfig?: VpcConfig & {
    SecurityGroupIds: VpcSecurityGroupIds;
    Subnets: Subnets;
  };
  Orchestrator?: ClusterOrchestrator & {
    Eks: ClusterOrchestratorEksConfig & { ClusterArn: EksClusterArn };
  };
  TieredStorageConfig?: ClusterTieredStorageConfig & {
    Mode: ClusterConfigMode;
  };
  NodeRecovery?: ClusterNodeRecovery;
  NodeProvisioningMode?: ClusterNodeProvisioningMode;
  ClusterRole?: string;
  AutoScaling?: ClusterAutoScalingConfigOutput;
}
export type EventId = string;
export interface DescribeClusterEventRequest {
  EventId?: string;
  ClusterName?: string;
}
export type ClusterEventResourceType =
  | "Cluster"
  | "InstanceGroup"
  | "Instance"
  | (string & {});
export type EksRoleAccessEntries = string[];
export interface ClusterMetadata {
  FailureMessage?: string;
  EksRoleAccessEntries?: string[];
  SlrAccessEntry?: string;
}
export type CapacityReservationType = "ODCR" | "CRG" | (string & {});
export interface CapacityReservation {
  Arn?: string;
  Type?: CapacityReservationType;
}
export interface InstanceGroupMetadata {
  FailureMessage?: string;
  AvailabilityZoneId?: string;
  CapacityReservation?: CapacityReservation;
  SubnetId?: string;
  SecurityGroupIds?: string[];
  AmiOverride?: string;
}
export type TargetCount = number;
export interface InstanceGroupScalingMetadata {
  InstanceCount?: number;
  TargetCount?: number;
  MinCount?: number;
  FailureMessage?: string;
}
export type EfaEnis = string[];
export interface AdditionalEnis {
  EfaEnis?: string[];
}
export interface InstanceRequirementsEniConfiguration {
  CustomerEni?: string;
  AdditionalEnis?: AdditionalEnis;
}
export type InstanceRequirementsEniConfigurations =
  InstanceRequirementsEniConfiguration[];
export interface InstanceMetadata {
  CustomerEni?: string;
  AdditionalEnis?: AdditionalEnis;
  InstanceRequirementsEniConfigurations?: InstanceRequirementsEniConfiguration[];
  CapacityReservation?: CapacityReservation;
  FailureMessage?: string;
  LcsExecutionState?: string;
  NodeLogicalId?: string;
}
export type EventMetadata =
  | {
      Cluster: ClusterMetadata;
      InstanceGroup?: never;
      InstanceGroupScaling?: never;
      Instance?: never;
    }
  | {
      Cluster?: never;
      InstanceGroup: InstanceGroupMetadata;
      InstanceGroupScaling?: never;
      Instance?: never;
    }
  | {
      Cluster?: never;
      InstanceGroup?: never;
      InstanceGroupScaling: InstanceGroupScalingMetadata;
      Instance?: never;
    }
  | {
      Cluster?: never;
      InstanceGroup?: never;
      InstanceGroupScaling?: never;
      Instance: InstanceMetadata;
    };
export interface EventDetails {
  EventMetadata?: EventMetadata;
}
export type ClusterEventLevel = "Info" | "Warn" | "Error" | (string & {});
export interface ClusterEventDetail {
  EventId?: string;
  ClusterArn?: string;
  ClusterName?: string;
  InstanceGroupName?: string;
  InstanceId?: string;
  ResourceType?: ClusterEventResourceType;
  EventTime?: Date;
  EventDetails?: EventDetails;
  Description?: string;
  EventLevel?: ClusterEventLevel;
}
export interface DescribeClusterEventResponse {
  EventDetails?: ClusterEventDetail & {
    EventId: EventId;
    ClusterArn: ClusterArn;
    ClusterName: ClusterName;
    ResourceType: ClusterEventResourceType;
    EventTime: Date;
  };
}
export interface DescribeClusterNodeRequest {
  ClusterName?: string;
  NodeId?: string;
  NodeLogicalId?: string;
}
export interface ClusterInstanceStatusDetails {
  Status?: ClusterInstanceStatus;
  Message?: string;
}
export type ClusterPrivatePrimaryIp = string;
export type ClusterPrivatePrimaryIpv6 = string;
export type ClusterPrivateDnsHostname = string;
export type ClusterAvailabilityZoneId = string;
export interface ClusterInstancePlacement {
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
}
export interface UltraServerInfo {
  Id?: string;
  Type?: string;
}
export interface ClusterKubernetesConfigNodeDetails {
  CurrentLabels?: { [key: string]: string | undefined };
  DesiredLabels?: { [key: string]: string | undefined };
  CurrentTaints?: ClusterKubernetesTaint[];
  DesiredTaints?: ClusterKubernetesTaint[];
}
export type ClusterCapacityType = "Spot" | "OnDemand" | (string & {});
export interface ClusterNodeDetails {
  InstanceGroupName?: string;
  InstanceId?: string;
  NodeLogicalId?: string;
  InstanceStatus?: ClusterInstanceStatusDetails;
  InstanceType?: ClusterInstanceType;
  LaunchTime?: Date;
  LastSoftwareUpdateTime?: Date;
  LifeCycleConfig?: ClusterLifeCycleConfig;
  OverrideVpcConfig?: VpcConfig;
  ThreadsPerCore?: number;
  InstanceStorageConfigs?: ClusterInstanceStorageConfig[];
  PrivatePrimaryIp?: string;
  PrivatePrimaryIpv6?: string;
  PrivateDnsHostname?: string;
  Placement?: ClusterInstancePlacement;
  CurrentImageId?: string;
  DesiredImageId?: string;
  CurrentImageReleaseVersion?: string;
  DesiredImageReleaseVersion?: string;
  ImageVersionStatus?: ClusterImageVersionStatus;
  UltraServerInfo?: UltraServerInfo;
  KubernetesConfig?: ClusterKubernetesConfigNodeDetails;
  CapacityType?: ClusterCapacityType;
  NetworkInterface?: ClusterNetworkInterfaceDetails;
}
export interface DescribeClusterNodeResponse {
  NodeDetails: ClusterNodeDetails & {
    InstanceStatus: ClusterInstanceStatusDetails & {
      Status: ClusterInstanceStatus;
    };
    OverrideVpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
}
export interface DescribeClusterSchedulerConfigRequest {
  ClusterSchedulerConfigId?: string;
  ClusterSchedulerConfigVersion?: number;
}
export type SchedulerResourceStatus =
  | "Creating"
  | "CreateFailed"
  | "CreateRollbackFailed"
  | "Created"
  | "Updating"
  | "UpdateFailed"
  | "UpdateRollbackFailed"
  | "Updated"
  | "Deleting"
  | "DeleteFailed"
  | "DeleteRollbackFailed"
  | "Deleted"
  | (string & {});
export type SchedulerConfigComponent =
  | "PriorityClasses"
  | "FairShare"
  | "IdleResourceSharing"
  | (string & {});
export type StatusDetailsMap = {
  [key in SchedulerConfigComponent]?: SchedulerResourceStatus;
};
export interface DescribeClusterSchedulerConfigResponse {
  ClusterSchedulerConfigArn: string;
  ClusterSchedulerConfigId: string;
  Name: string;
  ClusterSchedulerConfigVersion: number;
  Status: SchedulerResourceStatus;
  FailureReason?: string;
  StatusDetails?: { [key: string]: SchedulerResourceStatus | undefined };
  ClusterArn?: string;
  SchedulerConfig?: SchedulerConfig & {
    PriorityClasses: (PriorityClass & {
      Name: ClusterSchedulerPriorityClassName;
      Weight: PriorityWeight;
    })[];
  };
  Description?: string;
  CreationTime: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export interface DescribeCodeRepositoryInput {
  CodeRepositoryName?: string;
}
export type LastModifiedTime = Date;
export interface DescribeCodeRepositoryOutput {
  CodeRepositoryName: string;
  CodeRepositoryArn: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  GitConfig?: GitConfig & { RepositoryUrl: GitConfigUrl };
}
export interface DescribeCompilationJobRequest {
  CompilationJobName?: string;
}
export type CompilationJobStatus =
  | "INPROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STARTING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type InferenceImage = string;
export interface ModelArtifacts {
  S3ModelArtifacts?: string;
}
export type ArtifactDigest = string;
export interface ModelDigests {
  ArtifactDigest?: string;
}
export interface DerivedInformation {
  DerivedDataInputConfig?: string;
}
export interface DescribeCompilationJobResponse {
  CompilationJobName: string;
  CompilationJobArn: string;
  CompilationJobStatus: CompilationJobStatus;
  CompilationStartTime?: Date;
  CompilationEndTime?: Date;
  StoppingCondition: StoppingCondition;
  InferenceImage?: string;
  ModelPackageVersionArn?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  FailureReason: string;
  ModelArtifacts: ModelArtifacts & { S3ModelArtifacts: S3Uri };
  ModelDigests?: ModelDigests;
  RoleArn: string;
  InputConfig: InputConfig & { S3Uri: S3Uri; Framework: Framework };
  OutputConfig: OutputConfig & {
    S3OutputLocation: S3Uri;
    TargetPlatform: TargetPlatform & {
      Os: TargetPlatformOs;
      Arch: TargetPlatformArch;
    };
  };
  VpcConfig?: NeoVpcConfig & {
    SecurityGroupIds: NeoVpcSecurityGroupIds;
    Subnets: NeoVpcSubnets;
  };
  DerivedInformation?: DerivedInformation;
}
export interface DescribeComputeQuotaRequest {
  ComputeQuotaId?: string;
  ComputeQuotaVersion?: number;
}
export interface DescribeComputeQuotaResponse {
  ComputeQuotaArn: string;
  ComputeQuotaId: string;
  Name: string;
  Description?: string;
  ComputeQuotaVersion: number;
  Status: SchedulerResourceStatus;
  FailureReason?: string;
  ClusterArn?: string;
  ComputeQuotaConfig?: ComputeQuotaConfig & {
    ComputeQuotaResources: (ComputeQuotaResourceConfig & {
      InstanceType: ClusterInstanceType;
      AcceleratorPartition: AcceleratorPartitionConfig & {
        Type: MIGProfileType;
        Count: number;
      };
    })[];
    ResourceSharingConfig: ResourceSharingConfig & {
      Strategy: ResourceSharingStrategy;
      AbsoluteBorrowLimits: (ComputeQuotaResourceConfig & {
        InstanceType: ClusterInstanceType;
        AcceleratorPartition: AcceleratorPartitionConfig & {
          Type: MIGProfileType;
          Count: number;
        };
      })[];
    };
  };
  ComputeQuotaTarget: ComputeQuotaTarget & {
    TeamName: ComputeQuotaTargetTeamName;
  };
  ActivationState?: ActivationState;
  CreationTime: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export type ContextNameOrArn = string;
export interface DescribeContextRequest {
  ContextName?: string;
}
export interface DescribeContextResponse {
  ContextName?: string;
  ContextArn?: string;
  Source?: ContextSource & { SourceUri: SourceUri };
  ContextType?: string;
  Description?: string;
  Properties?: { [key: string]: string | undefined };
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  LineageGroupArn?: string;
}
export interface DescribeDataQualityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DescribeDataQualityJobDefinitionResponse {
  JobDefinitionArn: string;
  JobDefinitionName: string;
  CreationTime: Date;
  DataQualityBaselineConfig?: DataQualityBaselineConfig;
  DataQualityAppSpecification: DataQualityAppSpecification & {
    ImageUri: ImageUri;
  };
  DataQualityJobInput: DataQualityJobInput & {
    EndpointInput: EndpointInput & {
      EndpointName: EndpointName;
      LocalPath: ProcessingLocalPath;
    };
    BatchTransformInput: BatchTransformInput & {
      DataCapturedDestinationS3Uri: DestinationS3Uri;
      DatasetFormat: MonitoringDatasetFormat;
      LocalPath: ProcessingLocalPath;
    };
  };
  DataQualityJobOutputConfig: MonitoringOutputConfig & {
    MonitoringOutputs: (MonitoringOutput & {
      S3Output: MonitoringS3Output & {
        S3Uri: MonitoringS3Uri;
        LocalPath: ProcessingLocalPath;
      };
    })[];
  };
  JobResources: MonitoringResources & {
    ClusterConfig: MonitoringClusterConfig & {
      InstanceCount: ProcessingInstanceCount;
      InstanceType: ProcessingInstanceType;
      VolumeSizeInGB: ProcessingVolumeSizeInGB;
    };
  };
  NetworkConfig?: MonitoringNetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  RoleArn: string;
  StoppingCondition?: MonitoringStoppingCondition & {
    MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
  };
}
export interface DescribeDeviceRequest {
  NextToken?: string;
  DeviceName?: string;
  DeviceFleetName?: string;
}
export type DeviceArn = string;
export type DeviceDescription = string;
export type ThingName = string;
export interface EdgeModel {
  ModelName?: string;
  ModelVersion?: string;
  LatestSampleTime?: Date;
  LatestInference?: Date;
}
export type EdgeModels = EdgeModel[];
export interface DescribeDeviceResponse {
  DeviceArn?: string;
  DeviceName: string;
  Description?: string;
  DeviceFleetName: string;
  IotThingName?: string;
  RegistrationTime: Date;
  LatestHeartbeat?: Date;
  Models?: (EdgeModel & { ModelName: EntityName; ModelVersion: EdgeVersion })[];
  MaxModels?: number;
  NextToken?: string;
  AgentVersion?: string;
}
export interface DescribeDeviceFleetRequest {
  DeviceFleetName?: string;
}
export type DeviceFleetArn = string;
export type IotRoleAlias = string;
export interface DescribeDeviceFleetResponse {
  DeviceFleetName: string;
  DeviceFleetArn: string;
  OutputConfig: EdgeOutputConfig & { S3OutputLocation: S3Uri };
  Description?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  RoleArn?: string;
  IotRoleAlias?: string;
}
export interface DescribeDomainRequest {
  DomainId?: string;
}
export type ResourceId = string;
export type DomainStatus =
  | "Deleting"
  | "Failed"
  | "InService"
  | "Pending"
  | "Updating"
  | "Update_Failed"
  | "Delete_Failed"
  | (string & {});
export interface DescribeDomainResponse {
  DomainArn?: string;
  DomainId?: string;
  DomainName?: string;
  HomeEfsFileSystemId?: string;
  SingleSignOnManagedApplicationInstanceId?: string;
  SingleSignOnApplicationArn?: string;
  Status?: DomainStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  FailureReason?: string;
  SecurityGroupIdForDomainBoundary?: string;
  AuthMode?: AuthMode;
  DefaultUserSettings?: UserSettings & {
    JupyterServerAppSettings: JupyterServerAppSettings & {
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    KernelGatewayAppSettings: KernelGatewayAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    RSessionAppSettings: RSessionAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    CodeEditorAppSettings: CodeEditorAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    JupyterLabAppSettings: JupyterLabAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    SpaceStorageSettings: DefaultSpaceStorageSettings & {
      DefaultEbsStorageSettings: DefaultEbsStorageSettings & {
        DefaultEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
        MaximumEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
      };
    };
    CustomPosixUserConfig: CustomPosixUserConfig & { Uid: Uid; Gid: Gid };
  };
  DomainSettings?: DomainSettings & {
    RStudioServerProDomainSettings: RStudioServerProDomainSettings & {
      DomainExecutionRoleArn: RoleArn;
    };
    TrustedIdentityPropagationSettings: TrustedIdentityPropagationSettings & {
      Status: FeatureStatus;
    };
  };
  AppNetworkAccessType?: AppNetworkAccessType;
  HomeEfsFileSystemKmsKeyId?: string;
  SubnetIds?: string[];
  Url?: string;
  VpcId?: string;
  KmsKeyId?: string;
  AppSecurityGroupManagement?: AppSecurityGroupManagement;
  HomeEfsFileSystemCreation?: HomeEfsFileSystemCreation;
  TagPropagation?: TagPropagation;
  DefaultSpaceSettings?: DefaultSpaceSettings & {
    JupyterServerAppSettings: JupyterServerAppSettings & {
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    KernelGatewayAppSettings: KernelGatewayAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    JupyterLabAppSettings: JupyterLabAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    SpaceStorageSettings: DefaultSpaceStorageSettings & {
      DefaultEbsStorageSettings: DefaultEbsStorageSettings & {
        DefaultEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
        MaximumEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
      };
    };
    CustomPosixUserConfig: CustomPosixUserConfig & { Uid: Uid; Gid: Gid };
  };
}
export type DeploymentStageMaxResults = number;
export interface DescribeEdgeDeploymentPlanRequest {
  EdgeDeploymentPlanName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type StageStatus =
  | "CREATING"
  | "READYTODEPLOY"
  | "STARTING"
  | "INPROGRESS"
  | "DEPLOYED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface EdgeDeploymentStatus {
  StageStatus?: StageStatus;
  EdgeDeploymentSuccessInStage?: number;
  EdgeDeploymentPendingInStage?: number;
  EdgeDeploymentFailedInStage?: number;
  EdgeDeploymentStatusMessage?: string;
  EdgeDeploymentStageStartTime?: Date;
}
export interface DeploymentStageStatusSummary {
  StageName?: string;
  DeviceSelectionConfig?: DeviceSelectionConfig;
  DeploymentConfig?: EdgeDeploymentConfig;
  DeploymentStatus?: EdgeDeploymentStatus;
}
export type DeploymentStageStatusSummaries = DeploymentStageStatusSummary[];
export interface DescribeEdgeDeploymentPlanResponse {
  EdgeDeploymentPlanArn: string;
  EdgeDeploymentPlanName: string;
  ModelConfigs: (EdgeDeploymentModelConfig & {
    ModelHandle: EntityName;
    EdgePackagingJobName: EntityName;
  })[];
  DeviceFleetName: string;
  EdgeDeploymentSuccess?: number;
  EdgeDeploymentPending?: number;
  EdgeDeploymentFailed?: number;
  Stages: (DeploymentStageStatusSummary & {
    StageName: EntityName;
    DeviceSelectionConfig: DeviceSelectionConfig & {
      DeviceSubsetType: DeviceSubsetType;
    };
    DeploymentConfig: EdgeDeploymentConfig & {
      FailureHandlingPolicy: FailureHandlingPolicy;
    };
    DeploymentStatus: EdgeDeploymentStatus & {
      StageStatus: StageStatus;
      EdgeDeploymentSuccessInStage: number;
      EdgeDeploymentPendingInStage: number;
      EdgeDeploymentFailedInStage: number;
    };
  })[];
  NextToken?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface DescribeEdgePackagingJobRequest {
  EdgePackagingJobName?: string;
}
export type EdgePackagingJobArn = string;
export type EdgePackagingJobStatus =
  | "STARTING"
  | "INPROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type EdgePresetDeploymentArtifact = string;
export type EdgePresetDeploymentStatus = "COMPLETED" | "FAILED" | (string & {});
export interface EdgePresetDeploymentOutput {
  Type?: EdgePresetDeploymentType;
  Artifact?: string;
  Status?: EdgePresetDeploymentStatus;
  StatusMessage?: string;
}
export interface DescribeEdgePackagingJobResponse {
  EdgePackagingJobArn: string;
  EdgePackagingJobName: string;
  CompilationJobName?: string;
  ModelName?: string;
  ModelVersion?: string;
  RoleArn?: string;
  OutputConfig?: EdgeOutputConfig & { S3OutputLocation: S3Uri };
  ResourceKey?: string;
  EdgePackagingJobStatus: EdgePackagingJobStatus;
  EdgePackagingJobStatusMessage?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  ModelArtifact?: string;
  ModelSignature?: string;
  PresetDeploymentOutput?: EdgePresetDeploymentOutput & {
    Type: EdgePresetDeploymentType;
  };
}
export interface DescribeEndpointInput {
  EndpointName?: string;
}
export interface DeployedImage {
  SpecifiedImage?: string;
  ResolvedImage?: string;
  ResolutionTime?: Date;
}
export type DeployedImages = DeployedImage[];
export interface InstancePoolSummary {
  InstanceType?: ProductionVariantInstanceType;
  CurrentInstanceCount?: number;
}
export type InstancePoolSummaryList = InstancePoolSummary[];
export type VariantStatus =
  | "Creating"
  | "Updating"
  | "Deleting"
  | "ActivatingTraffic"
  | "Baking"
  | (string & {});
export type VariantStatusMessage = string;
export interface ProductionVariantStatus {
  Status?: VariantStatus;
  StatusMessage?: string;
  StartTime?: Date;
}
export type ProductionVariantStatusList = ProductionVariantStatus[];
export type Ec2CapacityReservationId = string;
export interface Ec2CapacityReservation {
  Ec2CapacityReservationId?: string;
  TotalInstanceCount?: number;
  AvailableInstanceCount?: number;
  UsedByCurrentEndpoint?: number;
}
export type Ec2CapacityReservationsList = Ec2CapacityReservation[];
export interface ProductionVariantCapacityReservationSummary {
  MlReservationArn?: string;
  CapacityReservationPreference?: CapacityReservationPreference;
  TotalInstanceCount?: number;
  AvailableInstanceCount?: number;
  UsedByCurrentEndpoint?: number;
  Ec2CapacityReservations?: Ec2CapacityReservation[];
}
export interface ProductionVariantSummary {
  VariantName?: string;
  DeployedImages?: DeployedImage[];
  CurrentWeight?: number;
  DesiredWeight?: number;
  CurrentInstanceCount?: number;
  DesiredInstanceCount?: number;
  InstancePools?: InstancePoolSummary[];
  VariantStatus?: ProductionVariantStatus[];
  CurrentServerlessConfig?: ProductionVariantServerlessConfig;
  DesiredServerlessConfig?: ProductionVariantServerlessConfig;
  ManagedInstanceScaling?: ProductionVariantManagedInstanceScaling;
  RoutingConfig?: ProductionVariantRoutingConfig;
  CapacityReservationConfig?: ProductionVariantCapacityReservationSummary;
}
export type ProductionVariantSummaryList = ProductionVariantSummary[];
export type CaptureStatus = "Started" | "Stopped" | (string & {});
export interface DataCaptureConfigSummary {
  EnableCapture?: boolean;
  CaptureStatus?: CaptureStatus;
  CurrentSamplingPercentage?: number;
  DestinationS3Uri?: string;
  KmsKeyId?: string;
}
export type EndpointStatus =
  | "OutOfService"
  | "Creating"
  | "Updating"
  | "SystemUpdating"
  | "RollingBack"
  | "InService"
  | "Deleting"
  | "Failed"
  | "UpdateRollbackFailed"
  | (string & {});
export interface PendingProductionVariantSummary {
  VariantName?: string;
  DeployedImages?: DeployedImage[];
  CurrentWeight?: number;
  DesiredWeight?: number;
  CurrentInstanceCount?: number;
  DesiredInstanceCount?: number;
  InstanceType?: ProductionVariantInstanceType;
  InstancePools?: InstancePoolSummary[];
  AcceleratorType?: ProductionVariantAcceleratorType;
  VariantStatus?: ProductionVariantStatus[];
  CurrentServerlessConfig?: ProductionVariantServerlessConfig;
  DesiredServerlessConfig?: ProductionVariantServerlessConfig;
  ManagedInstanceScaling?: ProductionVariantManagedInstanceScaling;
  RoutingConfig?: ProductionVariantRoutingConfig;
}
export type PendingProductionVariantSummaryList =
  PendingProductionVariantSummary[];
export interface PendingDeploymentSummary {
  EndpointConfigName?: string;
  ProductionVariants?: PendingProductionVariantSummary[];
  StartTime?: Date;
  ShadowProductionVariants?: PendingProductionVariantSummary[];
}
export interface DescribeEndpointOutput {
  EndpointName: string;
  EndpointArn: string;
  EndpointConfigName?: string;
  ProductionVariants?: (ProductionVariantSummary & {
    VariantName: VariantName;
    InstancePools: (InstancePoolSummary & {
      InstanceType: ProductionVariantInstanceType;
      CurrentInstanceCount: TaskCount;
    })[];
    VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
    CurrentServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    DesiredServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
      ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
        Strategy: ManagedInstanceScalingScaleInStrategy;
      };
    };
    RoutingConfig: ProductionVariantRoutingConfig & {
      RoutingStrategy: RoutingStrategy;
    };
  })[];
  DataCaptureConfig?: DataCaptureConfigSummary & {
    EnableCapture: EnableCapture;
    CaptureStatus: CaptureStatus;
    CurrentSamplingPercentage: SamplingPercentage;
    DestinationS3Uri: DestinationS3Uri;
    KmsKeyId: KmsKeyId;
  };
  EndpointStatus: EndpointStatus;
  FailureReason?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  LastDeploymentConfig?: DeploymentConfig & {
    BlueGreenUpdatePolicy: BlueGreenUpdatePolicy & {
      TrafficRoutingConfiguration: TrafficRoutingConfig & {
        Type: TrafficRoutingConfigType;
        WaitIntervalInSeconds: WaitIntervalInSeconds;
        CanarySize: CapacitySize & {
          Type: CapacitySizeType;
          Value: CapacitySizeValue;
        };
        LinearStepSize: CapacitySize & {
          Type: CapacitySizeType;
          Value: CapacitySizeValue;
        };
      };
    };
    RollingUpdatePolicy: RollingUpdatePolicy & {
      MaximumBatchSize: CapacitySize & {
        Type: CapacitySizeType;
        Value: CapacitySizeValue;
      };
      WaitIntervalInSeconds: WaitIntervalInSeconds;
      RollbackMaximumBatchSize: CapacitySize & {
        Type: CapacitySizeType;
        Value: CapacitySizeValue;
      };
    };
  };
  AsyncInferenceConfig?: AsyncInferenceConfig & {
    OutputConfig: AsyncInferenceOutputConfig;
  };
  PendingDeploymentSummary?: PendingDeploymentSummary & {
    EndpointConfigName: EndpointConfigName;
    ProductionVariants: (PendingProductionVariantSummary & {
      VariantName: VariantName;
      InstancePools: (InstancePoolSummary & {
        InstanceType: ProductionVariantInstanceType;
        CurrentInstanceCount: TaskCount;
      })[];
      VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
      CurrentServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
      DesiredServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
      ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
        ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
          Strategy: ManagedInstanceScalingScaleInStrategy;
        };
      };
      RoutingConfig: ProductionVariantRoutingConfig & {
        RoutingStrategy: RoutingStrategy;
      };
    })[];
    ShadowProductionVariants: (PendingProductionVariantSummary & {
      VariantName: VariantName;
      InstancePools: (InstancePoolSummary & {
        InstanceType: ProductionVariantInstanceType;
        CurrentInstanceCount: TaskCount;
      })[];
      VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
      CurrentServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
      DesiredServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
      ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
        ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
          Strategy: ManagedInstanceScalingScaleInStrategy;
        };
      };
      RoutingConfig: ProductionVariantRoutingConfig & {
        RoutingStrategy: RoutingStrategy;
      };
    })[];
  };
  ExplainerConfig?: ExplainerConfig & {
    ClarifyExplainerConfig: ClarifyExplainerConfig & {
      ShapConfig: ClarifyShapConfig & {
        ShapBaselineConfig: ClarifyShapBaselineConfig;
        TextConfig: ClarifyTextConfig & {
          Language: ClarifyTextLanguage;
          Granularity: ClarifyTextGranularity;
        };
      };
    };
  };
  ShadowProductionVariants?: (ProductionVariantSummary & {
    VariantName: VariantName;
    InstancePools: (InstancePoolSummary & {
      InstanceType: ProductionVariantInstanceType;
      CurrentInstanceCount: TaskCount;
    })[];
    VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
    CurrentServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    DesiredServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
      ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
        Strategy: ManagedInstanceScalingScaleInStrategy;
      };
    };
    RoutingConfig: ProductionVariantRoutingConfig & {
      RoutingStrategy: RoutingStrategy;
    };
  })[];
  MetricsConfig?: MetricsConfig;
}
export interface DescribeEndpointConfigInput {
  EndpointConfigName?: string;
}
export interface DescribeEndpointConfigOutput {
  EndpointConfigName: string;
  EndpointConfigArn: string;
  ProductionVariants: (ProductionVariant & {
    VariantName: VariantName;
    InstancePools: (InstancePool & {
      InstanceType: ProductionVariantInstanceType;
      Priority: InstancePoolPriority;
    })[];
    CoreDumpConfig: ProductionVariantCoreDumpConfig & {
      DestinationS3Uri: DestinationS3Uri;
    };
    ServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
      ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
        Strategy: ManagedInstanceScalingScaleInStrategy;
      };
    };
    RoutingConfig: ProductionVariantRoutingConfig & {
      RoutingStrategy: RoutingStrategy;
    };
  })[];
  DataCaptureConfig?: DataCaptureConfig & {
    InitialSamplingPercentage: SamplingPercentage;
    DestinationS3Uri: DestinationS3Uri;
    CaptureOptions: (CaptureOption & { CaptureMode: CaptureMode })[];
  };
  KmsKeyId?: string;
  CreationTime: Date;
  AsyncInferenceConfig?: AsyncInferenceConfig & {
    OutputConfig: AsyncInferenceOutputConfig;
  };
  ExplainerConfig?: ExplainerConfig & {
    ClarifyExplainerConfig: ClarifyExplainerConfig & {
      ShapConfig: ClarifyShapConfig & {
        ShapBaselineConfig: ClarifyShapBaselineConfig;
        TextConfig: ClarifyTextConfig & {
          Language: ClarifyTextLanguage;
          Granularity: ClarifyTextGranularity;
        };
      };
    };
  };
  ShadowProductionVariants?: (ProductionVariant & {
    VariantName: VariantName;
    InstancePools: (InstancePool & {
      InstanceType: ProductionVariantInstanceType;
      Priority: InstancePoolPriority;
    })[];
    CoreDumpConfig: ProductionVariantCoreDumpConfig & {
      DestinationS3Uri: DestinationS3Uri;
    };
    ServerlessConfig: ProductionVariantServerlessConfig & {
      MemorySizeInMB: ServerlessMemorySizeInMB;
      MaxConcurrency: ServerlessMaxConcurrency;
    };
    ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
      ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
        Strategy: ManagedInstanceScalingScaleInStrategy;
      };
    };
    RoutingConfig: ProductionVariantRoutingConfig & {
      RoutingStrategy: RoutingStrategy;
    };
  })[];
  ExecutionRoleArn?: string;
  VpcConfig?: VpcConfig & {
    SecurityGroupIds: VpcSecurityGroupIds;
    Subnets: Subnets;
  };
  EnableNetworkIsolation?: boolean;
  MetricsConfig?: MetricsConfig;
}
export interface DescribeExperimentRequest {
  ExperimentName?: string;
}
export type ExperimentSourceArn = string;
export type SourceType = string;
export interface ExperimentSource {
  SourceArn?: string;
  SourceType?: string;
}
export interface DescribeExperimentResponse {
  ExperimentName?: string;
  ExperimentArn?: string;
  DisplayName?: string;
  Source?: ExperimentSource & { SourceArn: ExperimentSourceArn };
  Description?: string;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export type FeatureGroupNameOrArn = string;
export interface DescribeFeatureGroupRequest {
  FeatureGroupName?: string;
  NextToken?: string;
}
export interface ThroughputConfigDescription {
  ThroughputMode?: ThroughputMode;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedWriteCapacityUnits?: number;
}
export type FeatureGroupStatus =
  | "Creating"
  | "Created"
  | "CreateFailed"
  | "Deleting"
  | "DeleteFailed"
  | (string & {});
export type OfflineStoreStatusValue =
  | "Active"
  | "Blocked"
  | "Disabled"
  | (string & {});
export type BlockedReason = string;
export interface OfflineStoreStatus {
  Status?: OfflineStoreStatusValue;
  BlockedReason?: string;
}
export type LastUpdateStatusValue =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export interface LastUpdateStatus {
  Status?: LastUpdateStatusValue;
  FailureReason?: string;
}
export type OnlineStoreTotalSizeBytes = number;
export interface DescribeFeatureGroupResponse {
  FeatureGroupArn: string;
  FeatureGroupName: string;
  RecordIdentifierFeatureName: string;
  EventTimeFeatureName: string;
  FeatureDefinitions: (FeatureDefinition & {
    FeatureName: FeatureName;
    FeatureType: FeatureType;
  })[];
  CreationTime: Date;
  LastModifiedTime?: Date;
  OnlineStoreConfig?: OnlineStoreConfig;
  OfflineStoreConfig?: OfflineStoreConfig & {
    S3StorageConfig: S3StorageConfig & { S3Uri: S3Uri };
    DataCatalogConfig: DataCatalogConfig & {
      TableName: TableName;
      Catalog: Catalog;
      Database: Database;
    };
  };
  ThroughputConfig?: ThroughputConfigDescription & {
    ThroughputMode: ThroughputMode;
  };
  RoleArn?: string;
  FeatureGroupStatus?: FeatureGroupStatus;
  OfflineStoreStatus?: OfflineStoreStatus & { Status: OfflineStoreStatusValue };
  LastUpdateStatus?: LastUpdateStatus & { Status: LastUpdateStatusValue };
  FailureReason?: string;
  Description?: string;
  NextToken: string;
  OnlineStoreTotalSizeBytes?: number;
}
export interface DescribeFeatureMetadataRequest {
  FeatureGroupName?: string;
  FeatureName?: string;
}
export type FeatureDescription = string;
export type FeatureParameterKey = string;
export type FeatureParameterValue = string;
export interface FeatureParameter {
  Key?: string;
  Value?: string;
}
export type FeatureParameters = FeatureParameter[];
export interface DescribeFeatureMetadataResponse {
  FeatureGroupArn: string;
  FeatureGroupName: string;
  FeatureName: string;
  FeatureType: FeatureType;
  CreationTime: Date;
  LastModifiedTime: Date;
  Description?: string;
  Parameters?: FeatureParameter[];
}
export interface DescribeFlowDefinitionRequest {
  FlowDefinitionName?: string;
}
export type FlowDefinitionStatus =
  | "Initializing"
  | "Active"
  | "Failed"
  | "Deleting"
  | (string & {});
export interface DescribeFlowDefinitionResponse {
  FlowDefinitionArn: string;
  FlowDefinitionName: string;
  FlowDefinitionStatus: FlowDefinitionStatus;
  CreationTime: Date;
  HumanLoopRequestSource?: HumanLoopRequestSource & {
    AwsManagedHumanLoopRequestSource: AwsManagedHumanLoopRequestSource;
  };
  HumanLoopActivationConfig?: HumanLoopActivationConfig & {
    HumanLoopActivationConditionsConfig: HumanLoopActivationConditionsConfig & {
      HumanLoopActivationConditions: HumanLoopActivationConditions;
    };
  };
  HumanLoopConfig?: HumanLoopConfig & {
    WorkteamArn: WorkteamArn;
    HumanTaskUiArn: HumanTaskUiArn;
    TaskTitle: FlowDefinitionTaskTitle;
    TaskDescription: FlowDefinitionTaskDescription;
    TaskCount: FlowDefinitionTaskCount;
  };
  OutputConfig: FlowDefinitionOutputConfig & { S3OutputPath: S3Uri };
  RoleArn: string;
  FailureReason?: string;
}
export interface DescribeHubRequest {
  HubName?: string;
}
export type HubStatus =
  | "InService"
  | "Creating"
  | "Updating"
  | "Deleting"
  | "CreateFailed"
  | "UpdateFailed"
  | "DeleteFailed"
  | (string & {});
export interface DescribeHubResponse {
  HubName: string;
  HubArn: string;
  HubDisplayName?: string;
  HubDescription?: string;
  HubSearchKeywords?: string[];
  S3StorageConfig?: HubS3StorageConfig;
  HubStatus: HubStatus;
  FailureReason?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
}
export interface DescribeHubContentRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  HubContentName?: string;
  HubContentVersion?: string;
}
export type DocumentSchemaVersion = string;
export type HubContentDisplayName = string;
export type HubContentDescription = string;
export type HubContentMarkdown = string;
export type HubContentDocument = string;
export type ReferenceMinVersion = string;
export type HubContentSupportStatus =
  | "Supported"
  | "Deprecated"
  | "Restricted"
  | (string & {});
export type HubContentSearchKeyword = string;
export type HubContentSearchKeywordList = string[];
export type DependencyOriginPath = string;
export type DependencyCopyPath = string;
export interface HubContentDependency {
  DependencyOriginPath?: string;
  DependencyCopyPath?: string;
}
export type HubContentDependencyList = HubContentDependency[];
export type HubContentStatus =
  | "Available"
  | "Importing"
  | "Deleting"
  | "ImportFailed"
  | "DeleteFailed"
  | "PendingImport"
  | "PendingDelete"
  | (string & {});
export interface DescribeHubContentResponse {
  HubContentName: string;
  HubContentArn: string;
  HubContentVersion: string;
  HubContentType: HubContentType;
  DocumentSchemaVersion: string;
  HubName: string;
  HubArn: string;
  HubContentDisplayName?: string;
  HubContentDescription?: string;
  HubContentMarkdown?: string;
  HubContentDocument: string;
  SageMakerPublicHubContentArn?: string;
  ReferenceMinVersion?: string;
  SupportStatus?: HubContentSupportStatus;
  HubContentSearchKeywords?: string[];
  HubContentDependencies?: HubContentDependency[];
  HubContentStatus: HubContentStatus;
  FailureReason?: string;
  CreationTime: Date;
  LastModifiedTime?: Date;
}
export interface DescribeHumanTaskUiRequest {
  HumanTaskUiName?: string;
}
export type HumanTaskUiStatus = "Active" | "Deleting" | (string & {});
export type TemplateUrl = string;
export type TemplateContentSha256 = string;
export interface UiTemplateInfo {
  Url?: string;
  ContentSha256?: string;
}
export interface DescribeHumanTaskUiResponse {
  HumanTaskUiArn: string;
  HumanTaskUiName: string;
  HumanTaskUiStatus?: HumanTaskUiStatus;
  CreationTime: Date;
  UiTemplate: UiTemplateInfo;
}
export interface DescribeHyperParameterTuningJobRequest {
  HyperParameterTuningJobName?: string;
}
export type HyperParameterTuningJobStatus =
  | "Completed"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | "Deleting"
  | "DeleteFailed"
  | (string & {});
export type TrainingJobStatusCounter = number;
export interface TrainingJobStatusCounters {
  Completed?: number;
  InProgress?: number;
  RetryableError?: number;
  NonRetryableError?: number;
  Stopped?: number;
}
export type ObjectiveStatusCounter = number;
export interface ObjectiveStatusCounters {
  Succeeded?: number;
  Pending?: number;
  Failed?: number;
}
export type TrainingJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | (string & {});
export interface FinalHyperParameterTuningJobObjectiveMetric {
  Type?: HyperParameterTuningJobObjectiveType;
  MetricName?: string;
  Value?: number;
}
export interface HyperParameterTrainingJobSummary {
  TrainingJobDefinitionName?: string;
  TrainingJobName?: string;
  TrainingJobArn?: string;
  TuningJobName?: string;
  CreationTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  TrainingJobStatus?: TrainingJobStatus;
  TunedHyperParameters?: { [key: string]: string | undefined };
  FailureReason?: string;
  FinalHyperParameterTuningJobObjectiveMetric?: FinalHyperParameterTuningJobObjectiveMetric;
  ObjectiveStatus?: ObjectiveStatus;
}
export interface HyperParameterTuningJobCompletionDetails {
  NumberOfTrainingJobsObjectiveNotImproving?: number;
  ConvergenceDetectedTime?: Date;
}
export interface HyperParameterTuningJobConsumedResources {
  RuntimeInSeconds?: number;
}
export interface DescribeHyperParameterTuningJobResponse {
  HyperParameterTuningJobName: string;
  HyperParameterTuningJobArn: string;
  HyperParameterTuningJobConfig: HyperParameterTuningJobConfig & {
    Strategy: HyperParameterTuningJobStrategyType;
    ResourceLimits: ResourceLimits & {
      MaxParallelTrainingJobs: MaxParallelTrainingJobs;
    };
    HyperParameterTuningJobObjective: HyperParameterTuningJobObjective & {
      Type: HyperParameterTuningJobObjectiveType;
      MetricName: MetricName;
    };
    ParameterRanges: ParameterRanges & {
      IntegerParameterRanges: (IntegerParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      ContinuousParameterRanges: (ContinuousParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      CategoricalParameterRanges: (CategoricalParameterRange & {
        Name: ParameterKey;
        Values: ParameterValues;
      })[];
      AutoParameters: (AutoParameter & {
        Name: ParameterKey;
        ValueHint: ParameterValue;
      })[];
    };
  };
  TrainingJobDefinition?: HyperParameterTrainingJobDefinition & {
    AlgorithmSpecification: HyperParameterAlgorithmSpecification & {
      TrainingInputMode: TrainingInputMode;
      MetricDefinitions: (MetricDefinition & {
        Name: MetricName;
        Regex: MetricRegex;
      })[];
    };
    RoleArn: RoleArn;
    OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
    StoppingCondition: StoppingCondition;
    TuningObjective: HyperParameterTuningJobObjective & {
      Type: HyperParameterTuningJobObjectiveType;
      MetricName: MetricName;
    };
    HyperParameterRanges: ParameterRanges & {
      IntegerParameterRanges: (IntegerParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      ContinuousParameterRanges: (ContinuousParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      CategoricalParameterRanges: (CategoricalParameterRange & {
        Name: ParameterKey;
        Values: ParameterValues;
      })[];
      AutoParameters: (AutoParameter & {
        Name: ParameterKey;
        ValueHint: ParameterValue;
      })[];
    };
    InputDataConfig: (Channel & {
      ChannelName: ChannelName;
      DataSource: DataSource & {
        S3DataSource: S3DataSource & {
          S3DataType: S3DataType;
          S3Uri: S3Uri;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: HubAccessConfig & { HubContentArn: HubContentArn };
        };
        FileSystemDataSource: FileSystemDataSource & {
          FileSystemId: FileSystemId;
          FileSystemAccessMode: FileSystemAccessMode;
          FileSystemType: FileSystemType;
          DirectoryPath: DirectoryPath;
        };
      };
      ShuffleConfig: ShuffleConfig & { Seed: Seed };
    })[];
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
    ResourceConfig: ResourceConfig & {
      InstanceGroups: (InstanceGroup & {
        InstanceType: TrainingInstanceType;
        InstanceCount: TrainingInstanceCount;
        InstanceGroupName: InstanceGroupName;
      })[];
      InstancePlacementConfig: InstancePlacementConfig & {
        PlacementSpecifications: (PlacementSpecification & {
          InstanceCount: TrainingInstanceCount;
        })[];
      };
    };
    HyperParameterTuningResourceConfig: HyperParameterTuningResourceConfig & {
      InstanceConfigs: (HyperParameterTuningInstanceConfig & {
        InstanceType: TrainingInstanceType;
        InstanceCount: TrainingInstanceCount;
        VolumeSizeInGB: VolumeSizeInGB;
      })[];
    };
    CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
    RetryStrategy: RetryStrategy & {
      MaximumRetryAttempts: MaximumRetryAttempts;
    };
  };
  TrainingJobDefinitions?: (HyperParameterTrainingJobDefinition & {
    AlgorithmSpecification: HyperParameterAlgorithmSpecification & {
      TrainingInputMode: TrainingInputMode;
      MetricDefinitions: (MetricDefinition & {
        Name: MetricName;
        Regex: MetricRegex;
      })[];
    };
    RoleArn: RoleArn;
    OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
    StoppingCondition: StoppingCondition;
    TuningObjective: HyperParameterTuningJobObjective & {
      Type: HyperParameterTuningJobObjectiveType;
      MetricName: MetricName;
    };
    HyperParameterRanges: ParameterRanges & {
      IntegerParameterRanges: (IntegerParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      ContinuousParameterRanges: (ContinuousParameterRange & {
        Name: ParameterKey;
        MinValue: ParameterValue;
        MaxValue: ParameterValue;
      })[];
      CategoricalParameterRanges: (CategoricalParameterRange & {
        Name: ParameterKey;
        Values: ParameterValues;
      })[];
      AutoParameters: (AutoParameter & {
        Name: ParameterKey;
        ValueHint: ParameterValue;
      })[];
    };
    InputDataConfig: (Channel & {
      ChannelName: ChannelName;
      DataSource: DataSource & {
        S3DataSource: S3DataSource & {
          S3DataType: S3DataType;
          S3Uri: S3Uri;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: HubAccessConfig & { HubContentArn: HubContentArn };
        };
        FileSystemDataSource: FileSystemDataSource & {
          FileSystemId: FileSystemId;
          FileSystemAccessMode: FileSystemAccessMode;
          FileSystemType: FileSystemType;
          DirectoryPath: DirectoryPath;
        };
      };
      ShuffleConfig: ShuffleConfig & { Seed: Seed };
    })[];
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
    ResourceConfig: ResourceConfig & {
      InstanceGroups: (InstanceGroup & {
        InstanceType: TrainingInstanceType;
        InstanceCount: TrainingInstanceCount;
        InstanceGroupName: InstanceGroupName;
      })[];
      InstancePlacementConfig: InstancePlacementConfig & {
        PlacementSpecifications: (PlacementSpecification & {
          InstanceCount: TrainingInstanceCount;
        })[];
      };
    };
    HyperParameterTuningResourceConfig: HyperParameterTuningResourceConfig & {
      InstanceConfigs: (HyperParameterTuningInstanceConfig & {
        InstanceType: TrainingInstanceType;
        InstanceCount: TrainingInstanceCount;
        VolumeSizeInGB: VolumeSizeInGB;
      })[];
    };
    CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
    RetryStrategy: RetryStrategy & {
      MaximumRetryAttempts: MaximumRetryAttempts;
    };
  })[];
  HyperParameterTuningJobStatus: HyperParameterTuningJobStatus;
  CreationTime: Date;
  HyperParameterTuningEndTime?: Date;
  LastModifiedTime?: Date;
  TrainingJobStatusCounters: TrainingJobStatusCounters;
  ObjectiveStatusCounters: ObjectiveStatusCounters;
  BestTrainingJob?: HyperParameterTrainingJobSummary & {
    TrainingJobName: TrainingJobName;
    TrainingJobArn: TrainingJobArn;
    CreationTime: Date;
    TrainingJobStatus: TrainingJobStatus;
    TunedHyperParameters: HyperParameters;
    FinalHyperParameterTuningJobObjectiveMetric: FinalHyperParameterTuningJobObjectiveMetric & {
      MetricName: MetricName;
      Value: MetricValue;
    };
  };
  OverallBestTrainingJob?: HyperParameterTrainingJobSummary & {
    TrainingJobName: TrainingJobName;
    TrainingJobArn: TrainingJobArn;
    CreationTime: Date;
    TrainingJobStatus: TrainingJobStatus;
    TunedHyperParameters: HyperParameters;
    FinalHyperParameterTuningJobObjectiveMetric: FinalHyperParameterTuningJobObjectiveMetric & {
      MetricName: MetricName;
      Value: MetricValue;
    };
  };
  WarmStartConfig?: HyperParameterTuningJobWarmStartConfig & {
    ParentHyperParameterTuningJobs: ParentHyperParameterTuningJobs;
    WarmStartType: HyperParameterTuningJobWarmStartType;
  };
  Autotune?: Autotune & { Mode: AutotuneMode };
  FailureReason?: string;
  TuningJobCompletionDetails?: HyperParameterTuningJobCompletionDetails;
  ConsumedResources?: HyperParameterTuningJobConsumedResources;
}
export interface DescribeImageRequest {
  ImageName?: string;
}
export type ImageStatus =
  | "CREATING"
  | "CREATED"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface DescribeImageResponse {
  CreationTime?: Date;
  Description?: string;
  DisplayName?: string;
  FailureReason?: string;
  ImageArn?: string;
  ImageName?: string;
  ImageStatus?: ImageStatus;
  LastModifiedTime?: Date;
  RoleArn?: string;
}
export interface DescribeImageVersionRequest {
  ImageName?: string;
  Version?: number;
  Alias?: string;
}
export type ImageContainerImage = string;
export type ImageVersionStatus =
  | "CREATING"
  | "CREATED"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface DescribeImageVersionResponse {
  BaseImage?: string;
  ContainerImage?: string;
  CreationTime?: Date;
  FailureReason?: string;
  ImageArn?: string;
  ImageVersionArn?: string;
  ImageVersionStatus?: ImageVersionStatus;
  LastModifiedTime?: Date;
  Version?: number;
  VendorGuidance?: VendorGuidance;
  JobType?: JobType;
  MLFramework?: string;
  ProgrammingLang?: string;
  Processor?: Processor;
  Horovod?: boolean;
  ReleaseNotes?: string;
}
export interface DescribeInferenceComponentInput {
  InferenceComponentName?: string;
}
export interface InferenceComponentContainerSpecificationSummary {
  DeployedImage?: DeployedImage;
  ArtifactUrl?: string;
  Environment?: { [key: string]: string | undefined };
  ContainerMetricsConfig?: ContainerMetricsConfig;
}
export interface InferenceComponentDataCacheConfigSummary {
  EnableCaching?: boolean;
}
export interface InferenceComponentSpecificationSummary {
  InstanceType?: ProductionVariantInstanceType;
  ModelName?: string;
  Container?: InferenceComponentContainerSpecificationSummary;
  StartupParameters?: InferenceComponentStartupParameters;
  ComputeResourceRequirements?: InferenceComponentComputeResourceRequirements;
  BaseInferenceComponentName?: string;
  DataCacheConfig?: InferenceComponentDataCacheConfigSummary;
  SchedulingConfig?: InferenceComponentSchedulingConfig;
}
export type InferenceComponentSpecificationSummaryList =
  InferenceComponentSpecificationSummary[];
export interface InferenceComponentPlacementStatus {
  InstanceType?: ProductionVariantInstanceType;
  CurrentCopyCount?: number;
}
export type InferenceComponentPlacementStatusList =
  InferenceComponentPlacementStatus[];
export interface InferenceComponentRuntimeConfigSummary {
  DesiredCopyCount?: number;
  CurrentCopyCount?: number;
  PlacementStatus?: InferenceComponentPlacementStatus[];
}
export type InferenceComponentStatus =
  | "InService"
  | "Creating"
  | "Updating"
  | "Failed"
  | "Deleting"
  | (string & {});
export type InferenceComponentCapacitySizeType =
  | "COPY_COUNT"
  | "CAPACITY_PERCENT"
  | (string & {});
export interface InferenceComponentCapacitySize {
  Type?: InferenceComponentCapacitySizeType;
  Value?: number;
}
export interface InferenceComponentRollingUpdatePolicy {
  MaximumBatchSize?: InferenceComponentCapacitySize;
  WaitIntervalInSeconds?: number;
  MaximumExecutionTimeoutInSeconds?: number;
  RollbackMaximumBatchSize?: InferenceComponentCapacitySize;
}
export interface InferenceComponentDeploymentConfig {
  RollingUpdatePolicy?: InferenceComponentRollingUpdatePolicy;
  AutoRollbackConfiguration?: AutoRollbackConfig;
}
export interface DescribeInferenceComponentOutput {
  InferenceComponentName: string;
  InferenceComponentArn: string;
  EndpointName: string;
  EndpointArn: string;
  VariantName?: string;
  FailureReason?: string;
  Specification?: InferenceComponentSpecificationSummary & {
    Container: InferenceComponentContainerSpecificationSummary & {
      ContainerMetricsConfig: ContainerMetricsConfig & {
        MetricsEndpoints: (MetricsEndpoint & {
          MetricsEndpointPath: MetricsEndpointPath;
        })[];
      };
    };
    ComputeResourceRequirements: InferenceComponentComputeResourceRequirements & {
      MinMemoryRequiredInMb: MemoryInMb;
    };
    DataCacheConfig: InferenceComponentDataCacheConfigSummary & {
      EnableCaching: EnableCaching;
    };
    SchedulingConfig: InferenceComponentSchedulingConfig & {
      PlacementStrategy: InferenceComponentPlacementStrategy;
      AvailabilityZoneBalance: InferenceComponentAvailabilityZoneBalance & {
        EnforcementMode: AvailabilityZoneBalanceEnforcementMode;
      };
    };
  };
  Specifications?: (InferenceComponentSpecificationSummary & {
    Container: InferenceComponentContainerSpecificationSummary & {
      ContainerMetricsConfig: ContainerMetricsConfig & {
        MetricsEndpoints: (MetricsEndpoint & {
          MetricsEndpointPath: MetricsEndpointPath;
        })[];
      };
    };
    ComputeResourceRequirements: InferenceComponentComputeResourceRequirements & {
      MinMemoryRequiredInMb: MemoryInMb;
    };
    DataCacheConfig: InferenceComponentDataCacheConfigSummary & {
      EnableCaching: EnableCaching;
    };
    SchedulingConfig: InferenceComponentSchedulingConfig & {
      PlacementStrategy: InferenceComponentPlacementStrategy;
      AvailabilityZoneBalance: InferenceComponentAvailabilityZoneBalance & {
        EnforcementMode: AvailabilityZoneBalanceEnforcementMode;
      };
    };
  })[];
  RuntimeConfig?: InferenceComponentRuntimeConfigSummary & {
    PlacementStatus: (InferenceComponentPlacementStatus & {
      InstanceType: ProductionVariantInstanceType;
      CurrentCopyCount: InferenceComponentCopyCount;
    })[];
  };
  CreationTime: Date;
  LastModifiedTime: Date;
  InferenceComponentStatus?: InferenceComponentStatus;
  LastDeploymentConfig?: InferenceComponentDeploymentConfig & {
    RollingUpdatePolicy: InferenceComponentRollingUpdatePolicy & {
      MaximumBatchSize: InferenceComponentCapacitySize & {
        Type: InferenceComponentCapacitySizeType;
        Value: CapacitySizeValue;
      };
      WaitIntervalInSeconds: WaitIntervalInSeconds;
      RollbackMaximumBatchSize: InferenceComponentCapacitySize & {
        Type: InferenceComponentCapacitySizeType;
        Value: CapacitySizeValue;
      };
    };
  };
}
export interface DescribeInferenceExperimentRequest {
  Name?: string;
}
export type InferenceExperimentStatus =
  | "Creating"
  | "Created"
  | "Updating"
  | "Running"
  | "Starting"
  | "Stopping"
  | "Completed"
  | "Cancelled"
  | (string & {});
export type InferenceExperimentStatusReason = string;
export interface EndpointMetadata {
  EndpointName?: string;
  EndpointConfigName?: string;
  EndpointStatus?: EndpointStatus;
  FailureReason?: string;
}
export type ModelVariantStatus =
  | "Creating"
  | "Updating"
  | "InService"
  | "Deleting"
  | "Deleted"
  | (string & {});
export interface ModelVariantConfigSummary {
  ModelName?: string;
  VariantName?: string;
  InfrastructureConfig?: ModelInfrastructureConfig;
  Status?: ModelVariantStatus;
}
export type ModelVariantConfigSummaryList = ModelVariantConfigSummary[];
export interface DescribeInferenceExperimentResponse {
  Arn: string;
  Name: string;
  Type: InferenceExperimentType;
  Schedule?: InferenceExperimentSchedule;
  Status: InferenceExperimentStatus;
  StatusReason?: string;
  Description?: string;
  CreationTime?: Date;
  CompletionTime?: Date;
  LastModifiedTime?: Date;
  RoleArn?: string;
  EndpointMetadata: EndpointMetadata & { EndpointName: EndpointName };
  ModelVariants: (ModelVariantConfigSummary & {
    ModelName: ModelName;
    VariantName: ModelVariantName;
    InfrastructureConfig: ModelInfrastructureConfig & {
      InfrastructureType: ModelInfrastructureType;
      RealTimeInferenceConfig: RealTimeInferenceConfig & {
        InstanceType: ProductionVariantInstanceType;
        InstanceCount: TaskCount;
      };
    };
    Status: ModelVariantStatus;
  })[];
  DataStorageConfig?: InferenceExperimentDataStorageConfig & {
    Destination: DestinationS3Uri;
  };
  ShadowModeConfig?: ShadowModeConfig & {
    SourceModelVariantName: ModelVariantName;
    ShadowModelVariants: (ShadowModelVariantConfig & {
      ShadowModelVariantName: ModelVariantName;
      SamplingPercentage: Percentage;
    })[];
  };
  KmsKey?: string;
}
export interface DescribeInferenceRecommendationsJobRequest {
  JobName?: string;
}
export type RecommendationJobStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type UtilizationMetric = number;
export type ModelSetupTime = number;
export interface RecommendationMetrics {
  CostPerHour?: number;
  CostPerInference?: number;
  MaxInvocations?: number;
  ModelLatency?: number;
  CpuUtilization?: number;
  MemoryUtilization?: number;
  ModelSetupTime?: number;
}
export type InitialInstanceCount = number;
export interface EndpointOutputConfiguration {
  EndpointName?: string;
  VariantName?: string;
  InstanceType?: ProductionVariantInstanceType;
  InitialInstanceCount?: number;
  ServerlessConfig?: ProductionVariantServerlessConfig;
}
export interface EnvironmentParameter {
  Key?: string;
  ValueType?: string;
  Value?: string;
}
export type EnvironmentParameters = EnvironmentParameter[];
export type RecommendationJobCompilationJobName = string;
export interface ModelConfiguration {
  InferenceSpecificationName?: string;
  EnvironmentParameters?: EnvironmentParameter[];
  CompilationJobName?: string;
}
export type InvocationEndTime = Date;
export type InvocationStartTime = Date;
export interface InferenceRecommendation {
  RecommendationId?: string;
  Metrics?: RecommendationMetrics;
  EndpointConfiguration?: EndpointOutputConfiguration;
  ModelConfiguration?: ModelConfiguration;
  InvocationEndTime?: Date;
  InvocationStartTime?: Date;
}
export type InferenceRecommendations = InferenceRecommendation[];
export interface InferenceMetrics {
  MaxInvocations?: number;
  ModelLatency?: number;
}
export interface EndpointPerformance {
  Metrics?: InferenceMetrics;
  EndpointInfo?: EndpointInfo;
}
export type EndpointPerformances = EndpointPerformance[];
export interface DescribeInferenceRecommendationsJobResponse {
  JobName: string;
  JobDescription?: string;
  JobType: RecommendationJobType;
  JobArn: string;
  RoleArn: string;
  Status: RecommendationJobStatus;
  CreationTime: Date;
  CompletionTime?: Date;
  LastModifiedTime: Date;
  FailureReason?: string;
  InputConfig: RecommendationJobInputConfig & {
    EndpointConfigurations: (EndpointInputConfiguration & {
      ServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
      EnvironmentParameterRanges: EnvironmentParameterRanges & {
        CategoricalParameterRanges: (CategoricalParameter & {
          Name: String64;
          Value: CategoricalParameterRangeValues;
        })[];
      };
    })[];
    VpcConfig: RecommendationJobVpcConfig & {
      SecurityGroupIds: RecommendationJobVpcSecurityGroupIds;
      Subnets: RecommendationJobVpcSubnets;
    };
  };
  StoppingConditions?: RecommendationJobStoppingConditions;
  InferenceRecommendations?: (InferenceRecommendation & {
    EndpointConfiguration: EndpointOutputConfiguration & {
      EndpointName: string;
      VariantName: string;
      ServerlessConfig: ProductionVariantServerlessConfig & {
        MemorySizeInMB: ServerlessMemorySizeInMB;
        MaxConcurrency: ServerlessMaxConcurrency;
      };
    };
    ModelConfiguration: ModelConfiguration & {
      EnvironmentParameters: (EnvironmentParameter & {
        Key: string;
        ValueType: string;
        Value: string;
      })[];
    };
  })[];
  EndpointPerformances?: (EndpointPerformance & {
    Metrics: InferenceMetrics & {
      MaxInvocations: number;
      ModelLatency: number;
    };
    EndpointInfo: EndpointInfo;
  })[];
}
export interface DescribeJobRequest {
  JobName?: string;
  JobCategory?: JobCategory;
}
export type JobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | "DeleteFailed"
  | (string & {});
export type JobSecondaryStatus =
  | "Starting"
  | "Downloading"
  | "Training"
  | "Uploading"
  | "Stopping"
  | "Stopped"
  | "MaxRuntimeExceeded"
  | "Interrupted"
  | "Failed"
  | "Completed"
  | "Restarting"
  | "Pending"
  | "Evaluating"
  | "Deleting"
  | "DeleteFailed"
  | (string & {});
export interface JobSecondaryStatusTransition {
  Status?: JobSecondaryStatus;
  StartTime?: Date;
  EndTime?: Date;
  StatusMessage?: string;
}
export type JobSecondaryStatusTransitions = JobSecondaryStatusTransition[];
export interface DescribeJobResponse {
  JobName: string;
  JobArn: string;
  RoleArn: string;
  JobCategory: JobCategory;
  JobConfigSchemaVersion: string;
  JobConfigDocument?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  EndTime?: Date;
  JobStatus: JobStatus;
  SecondaryStatus: JobSecondaryStatus;
  SecondaryStatusTransitions: (JobSecondaryStatusTransition & {
    Status: JobSecondaryStatus;
    StartTime: Date;
  })[];
  FailureReason?: string;
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export interface DescribeJobSchemaVersionRequest {
  JobCategory?: JobCategory;
  JobConfigSchemaVersion?: string;
}
export interface DescribeJobSchemaVersionResponse {
  JobCategory: JobCategory;
  JobConfigSchemaVersion: string;
  JobConfigSchema: string;
}
export interface DescribeLabelingJobRequest {
  LabelingJobName?: string;
}
export type LabelingJobStatus =
  | "Initializing"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type LabelCounter = number;
export interface LabelCounters {
  TotalLabeled?: number;
  HumanLabeled?: number;
  MachineLabeled?: number;
  FailedNonRetryableError?: number;
  Unlabeled?: number;
}
export type JobReferenceCode = string;
export interface LabelingJobOutput {
  OutputDatasetS3Uri?: string;
  FinalActiveLearningModelArn?: string;
}
export interface DescribeLabelingJobResponse {
  LabelingJobStatus: LabelingJobStatus;
  LabelCounters: LabelCounters;
  FailureReason?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  JobReferenceCode: string;
  LabelingJobName: string;
  LabelingJobArn: string;
  LabelAttributeName?: string;
  InputConfig: LabelingJobInputConfig & {
    DataSource: LabelingJobDataSource & {
      S3DataSource: LabelingJobS3DataSource & { ManifestS3Uri: S3Uri };
      SnsDataSource: LabelingJobSnsDataSource & { SnsTopicArn: SnsTopicArn };
    };
  };
  OutputConfig: LabelingJobOutputConfig & { S3OutputPath: S3Uri };
  RoleArn: string;
  LabelCategoryConfigS3Uri?: string;
  StoppingConditions?: LabelingJobStoppingConditions;
  LabelingJobAlgorithmsConfig?: LabelingJobAlgorithmsConfig & {
    LabelingJobAlgorithmSpecificationArn: LabelingJobAlgorithmSpecificationArn;
    LabelingJobResourceConfig: LabelingJobResourceConfig & {
      VpcConfig: VpcConfig & {
        SecurityGroupIds: VpcSecurityGroupIds;
        Subnets: Subnets;
      };
    };
  };
  HumanTaskConfig: HumanTaskConfig & {
    WorkteamArn: WorkteamArn;
    UiConfig: UiConfig;
    TaskTitle: TaskTitle;
    TaskDescription: TaskDescription;
    NumberOfHumanWorkersPerDataObject: NumberOfHumanWorkersPerDataObject;
    TaskTimeLimitInSeconds: TaskTimeLimitInSeconds;
    AnnotationConsolidationConfig: AnnotationConsolidationConfig & {
      AnnotationConsolidationLambdaArn: LambdaFunctionArn;
    };
  };
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  LabelingJobOutput?: LabelingJobOutput & { OutputDatasetS3Uri: S3Uri };
}
export interface DescribeLineageGroupRequest {
  LineageGroupName?: string;
}
export interface DescribeLineageGroupResponse {
  LineageGroupName?: string;
  LineageGroupArn?: string;
  DisplayName?: string;
  Description?: string;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export interface DescribeMlflowAppRequest {
  Arn?: string;
}
export type MlflowAppStatus =
  | "Creating"
  | "Created"
  | "CreateFailed"
  | "Updating"
  | "Updated"
  | "UpdateFailed"
  | "Deleting"
  | "DeleteFailed"
  | "Deleted"
  | (string & {});
export type MaintenanceStatus =
  | "MaintenanceInProgress"
  | "MaintenanceComplete"
  | "MaintenanceFailed"
  | (string & {});
export interface DescribeMlflowAppResponse {
  Arn?: string;
  Name?: string;
  ArtifactStoreUri?: string;
  MlflowVersion?: string;
  RoleArn?: string;
  KmsKeyId?: string;
  Status?: MlflowAppStatus;
  ModelRegistrationMode?: ModelRegistrationMode;
  AccountDefaultStatus?: AccountDefaultStatus;
  DefaultDomainIdList?: string[];
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  WeeklyMaintenanceWindowStart?: string;
  MaintenanceStatus?: MaintenanceStatus;
}
export interface DescribeMlflowTrackingServerRequest {
  TrackingServerName?: string;
}
export type TrackingServerStatus =
  | "Creating"
  | "Created"
  | "CreateFailed"
  | "Updating"
  | "Updated"
  | "UpdateFailed"
  | "Deleting"
  | "DeleteFailed"
  | "Stopping"
  | "Stopped"
  | "StopFailed"
  | "Starting"
  | "Started"
  | "StartFailed"
  | "MaintenanceInProgress"
  | "MaintenanceComplete"
  | "MaintenanceFailed"
  | (string & {});
export type TrackingServerMaintenanceStatus =
  | "MaintenanceInProgress"
  | "MaintenanceComplete"
  | "MaintenanceFailed"
  | (string & {});
export type IsTrackingServerActive = "Active" | "Inactive" | (string & {});
export interface DescribeMlflowTrackingServerResponse {
  TrackingServerArn?: string;
  TrackingServerName?: string;
  ArtifactStoreUri?: string;
  TrackingServerSize?: TrackingServerSize;
  MlflowVersion?: string;
  RoleArn?: string;
  TrackingServerStatus?: TrackingServerStatus;
  TrackingServerMaintenanceStatus?: TrackingServerMaintenanceStatus;
  IsActive?: IsTrackingServerActive;
  TrackingServerUrl?: string;
  WeeklyMaintenanceWindowStart?: string;
  AutomaticModelRegistration?: boolean;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  S3BucketOwnerAccountId?: string;
  S3BucketOwnerVerification?: boolean;
}
export interface DescribeModelInput {
  ModelName?: string;
}
export type RecommendationStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "NOT_APPLICABLE"
  | (string & {});
export interface RealTimeInferenceRecommendation {
  RecommendationId?: string;
  InstanceType?: ProductionVariantInstanceType;
  Environment?: { [key: string]: string | undefined };
}
export type RealTimeInferenceRecommendations =
  RealTimeInferenceRecommendation[];
export interface DeploymentRecommendation {
  RecommendationStatus?: RecommendationStatus;
  RealTimeInferenceRecommendations?: RealTimeInferenceRecommendation[];
}
export interface DescribeModelOutput {
  ModelName: string;
  PrimaryContainer?: ContainerDefinition & {
    ImageConfig: ImageConfig & {
      RepositoryAccessMode: RepositoryAccessMode;
      RepositoryAuthConfig: RepositoryAuthConfig & {
        RepositoryCredentialsProviderArn: RepositoryCredentialsProviderArn;
      };
    };
    ModelDataSource: ModelDataSource & {
      S3DataSource: S3ModelDataSource & {
        S3Uri: S3ModelUri;
        S3DataType: S3ModelDataType;
        CompressionType: ModelCompressionType;
        ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
        HubAccessConfig: InferenceHubAccessConfig & {
          HubContentArn: HubContentArn;
        };
      };
    };
    AdditionalModelDataSources: (AdditionalModelDataSource & {
      ChannelName: AdditionalModelChannelName;
      S3DataSource: S3ModelDataSource & {
        S3Uri: S3ModelUri;
        S3DataType: S3ModelDataType;
        CompressionType: ModelCompressionType;
        ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
        HubAccessConfig: InferenceHubAccessConfig & {
          HubContentArn: HubContentArn;
        };
      };
    })[];
    ContainerMetricsConfig: ContainerMetricsConfig & {
      MetricsEndpoints: (MetricsEndpoint & {
        MetricsEndpointPath: MetricsEndpointPath;
      })[];
    };
  };
  Containers?: (ContainerDefinition & {
    ImageConfig: ImageConfig & {
      RepositoryAccessMode: RepositoryAccessMode;
      RepositoryAuthConfig: RepositoryAuthConfig & {
        RepositoryCredentialsProviderArn: RepositoryCredentialsProviderArn;
      };
    };
    ModelDataSource: ModelDataSource & {
      S3DataSource: S3ModelDataSource & {
        S3Uri: S3ModelUri;
        S3DataType: S3ModelDataType;
        CompressionType: ModelCompressionType;
        ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
        HubAccessConfig: InferenceHubAccessConfig & {
          HubContentArn: HubContentArn;
        };
      };
    };
    AdditionalModelDataSources: (AdditionalModelDataSource & {
      ChannelName: AdditionalModelChannelName;
      S3DataSource: S3ModelDataSource & {
        S3Uri: S3ModelUri;
        S3DataType: S3ModelDataType;
        CompressionType: ModelCompressionType;
        ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
        HubAccessConfig: InferenceHubAccessConfig & {
          HubContentArn: HubContentArn;
        };
      };
    })[];
    ContainerMetricsConfig: ContainerMetricsConfig & {
      MetricsEndpoints: (MetricsEndpoint & {
        MetricsEndpointPath: MetricsEndpointPath;
      })[];
    };
  })[];
  InferenceExecutionConfig?: InferenceExecutionConfig & {
    Mode: InferenceExecutionMode;
  };
  ExecutionRoleArn?: string;
  VpcConfig?: VpcConfig & {
    SecurityGroupIds: VpcSecurityGroupIds;
    Subnets: Subnets;
  };
  CreationTime: Date;
  ModelArn: string;
  EnableNetworkIsolation?: boolean;
  DeploymentRecommendation?: DeploymentRecommendation & {
    RecommendationStatus: RecommendationStatus;
    RealTimeInferenceRecommendations: (RealTimeInferenceRecommendation & {
      RecommendationId: string;
      InstanceType: ProductionVariantInstanceType;
    })[];
  };
}
export interface DescribeModelBiasJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DescribeModelBiasJobDefinitionResponse {
  JobDefinitionArn: string;
  JobDefinitionName: string;
  CreationTime: Date;
  ModelBiasBaselineConfig?: ModelBiasBaselineConfig;
  ModelBiasAppSpecification: ModelBiasAppSpecification & {
    ImageUri: ImageUri;
    ConfigUri: S3Uri;
  };
  ModelBiasJobInput: ModelBiasJobInput & {
    GroundTruthS3Input: MonitoringGroundTruthS3Input;
    EndpointInput: EndpointInput & {
      EndpointName: EndpointName;
      LocalPath: ProcessingLocalPath;
    };
    BatchTransformInput: BatchTransformInput & {
      DataCapturedDestinationS3Uri: DestinationS3Uri;
      DatasetFormat: MonitoringDatasetFormat;
      LocalPath: ProcessingLocalPath;
    };
  };
  ModelBiasJobOutputConfig: MonitoringOutputConfig & {
    MonitoringOutputs: (MonitoringOutput & {
      S3Output: MonitoringS3Output & {
        S3Uri: MonitoringS3Uri;
        LocalPath: ProcessingLocalPath;
      };
    })[];
  };
  JobResources: MonitoringResources & {
    ClusterConfig: MonitoringClusterConfig & {
      InstanceCount: ProcessingInstanceCount;
      InstanceType: ProcessingInstanceType;
      VolumeSizeInGB: ProcessingVolumeSizeInGB;
    };
  };
  NetworkConfig?: MonitoringNetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  RoleArn: string;
  StoppingCondition?: MonitoringStoppingCondition & {
    MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
  };
}
export type IncludedData = "AllData" | "MetadataOnly" | (string & {});
export interface DescribeModelCardRequest {
  ModelCardName?: string;
  ModelCardVersion?: number;
  IncludedData?: IncludedData;
}
export type ModelCardProcessingStatus =
  | "DeleteInProgress"
  | "DeletePending"
  | "ContentDeleted"
  | "ExportJobsDeleted"
  | "DeleteCompleted"
  | "DeleteFailed"
  | (string & {});
export interface DescribeModelCardResponse {
  ModelCardArn: string;
  ModelCardName: string;
  ModelCardVersion: number;
  Content: string | redacted.Redacted<string>;
  ModelCardStatus: ModelCardStatus;
  SecurityConfig?: ModelCardSecurityConfig;
  CreationTime: Date;
  CreatedBy: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  ModelCardProcessingStatus?: ModelCardProcessingStatus;
}
export interface DescribeModelCardExportJobRequest {
  ModelCardExportJobArn?: string;
}
export type ModelCardExportJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export interface ModelCardExportArtifacts {
  S3ExportArtifacts?: string;
}
export interface DescribeModelCardExportJobResponse {
  ModelCardExportJobName: string;
  ModelCardExportJobArn: string;
  Status: ModelCardExportJobStatus;
  ModelCardName: string;
  ModelCardVersion: number;
  OutputConfig: ModelCardExportOutputConfig & { S3OutputPath: S3Uri };
  CreatedAt: Date;
  LastModifiedAt: Date;
  FailureReason?: string;
  ExportArtifacts?: ModelCardExportArtifacts & { S3ExportArtifacts: S3Uri };
}
export interface DescribeModelExplainabilityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DescribeModelExplainabilityJobDefinitionResponse {
  JobDefinitionArn: string;
  JobDefinitionName: string;
  CreationTime: Date;
  ModelExplainabilityBaselineConfig?: ModelExplainabilityBaselineConfig;
  ModelExplainabilityAppSpecification: ModelExplainabilityAppSpecification & {
    ImageUri: ImageUri;
    ConfigUri: S3Uri;
  };
  ModelExplainabilityJobInput: ModelExplainabilityJobInput & {
    EndpointInput: EndpointInput & {
      EndpointName: EndpointName;
      LocalPath: ProcessingLocalPath;
    };
    BatchTransformInput: BatchTransformInput & {
      DataCapturedDestinationS3Uri: DestinationS3Uri;
      DatasetFormat: MonitoringDatasetFormat;
      LocalPath: ProcessingLocalPath;
    };
  };
  ModelExplainabilityJobOutputConfig: MonitoringOutputConfig & {
    MonitoringOutputs: (MonitoringOutput & {
      S3Output: MonitoringS3Output & {
        S3Uri: MonitoringS3Uri;
        LocalPath: ProcessingLocalPath;
      };
    })[];
  };
  JobResources: MonitoringResources & {
    ClusterConfig: MonitoringClusterConfig & {
      InstanceCount: ProcessingInstanceCount;
      InstanceType: ProcessingInstanceType;
      VolumeSizeInGB: ProcessingVolumeSizeInGB;
    };
  };
  NetworkConfig?: MonitoringNetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  RoleArn: string;
  StoppingCondition?: MonitoringStoppingCondition & {
    MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
  };
}
export interface DescribeModelPackageInput {
  ModelPackageName?: string;
  IncludedData?: IncludedData;
}
export type DetailedModelPackageStatus =
  | "NotStarted"
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export interface ModelPackageStatusItem {
  Name?: string;
  Status?: DetailedModelPackageStatus;
  FailureReason?: string;
}
export type ModelPackageStatusItemList = ModelPackageStatusItem[];
export interface ModelPackageStatusDetails {
  ValidationStatuses?: ModelPackageStatusItem[];
  ImageScanStatuses?: ModelPackageStatusItem[];
}
export type ApprovalDescription = string;
export interface DescribeModelPackageOutput {
  ModelPackageName: string;
  ModelPackageGroupName?: string;
  ModelPackageVersion?: number;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
  ModelPackageArn: string;
  ModelPackageDescription?: string;
  CreationTime: Date;
  InferenceSpecification?: InferenceSpecification & {
    Containers: (ModelPackageContainerDefinition & {
      ModelDataSource: ModelDataSource & {
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      };
      ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
      AdditionalModelDataSources: (AdditionalModelDataSource & {
        ChannelName: AdditionalModelChannelName;
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      })[];
      AdditionalS3DataSource: AdditionalS3DataSource & {
        S3DataType: AdditionalS3DataSourceDataType;
        S3Uri: S3Uri;
      };
    })[];
  };
  SourceAlgorithmSpecification?: SourceAlgorithmSpecification & {
    SourceAlgorithms: (SourceAlgorithm & {
      AlgorithmName: ArnOrName;
      ModelDataSource: ModelDataSource & {
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      };
    })[];
  };
  ValidationSpecification?: ModelPackageValidationSpecification & {
    ValidationRole: RoleArn;
    ValidationProfiles: (ModelPackageValidationProfile & {
      ProfileName: EntityName;
      TransformJobDefinition: TransformJobDefinition & {
        TransformInput: TransformInput & {
          DataSource: TransformDataSource & {
            S3DataSource: TransformS3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
            };
          };
        };
        TransformOutput: TransformOutput & { S3OutputPath: S3Uri };
        TransformResources: TransformResources & {
          InstanceType: TransformInstanceType;
          InstanceCount: TransformInstanceCount;
        };
      };
    })[];
  };
  ModelPackageStatus: ModelPackageStatus;
  ModelPackageStatusDetails: ModelPackageStatusDetails & {
    ValidationStatuses: (ModelPackageStatusItem & {
      Name: EntityName;
      Status: DetailedModelPackageStatus;
    })[];
    ImageScanStatuses: (ModelPackageStatusItem & {
      Name: EntityName;
      Status: DetailedModelPackageStatus;
    })[];
  };
  CertifyForMarketplace?: boolean;
  ModelApprovalStatus?: ModelApprovalStatus;
  CreatedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
  ModelMetrics?: ModelMetrics & {
    ModelQuality: ModelQuality & {
      Statistics: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      Constraints: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
    };
    ModelDataQuality: ModelDataQuality & {
      Statistics: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      Constraints: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
    };
    Bias: Bias & {
      Report: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      PreTrainingReport: MetricsSource & {
        ContentType: ContentType;
        S3Uri: S3Uri;
      };
      PostTrainingReport: MetricsSource & {
        ContentType: ContentType;
        S3Uri: S3Uri;
      };
    };
    Explainability: Explainability & {
      Report: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
    };
  };
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  ApprovalDescription?: string;
  Domain?: string;
  Task?: string;
  SamplePayloadUrl?: string;
  CustomerMetadataProperties?: { [key: string]: string | undefined };
  DriftCheckBaselines?: DriftCheckBaselines & {
    Bias: DriftCheckBias & {
      ConfigFile: FileSource & { S3Uri: S3Uri };
      PreTrainingConstraints: MetricsSource & {
        ContentType: ContentType;
        S3Uri: S3Uri;
      };
      PostTrainingConstraints: MetricsSource & {
        ContentType: ContentType;
        S3Uri: S3Uri;
      };
    };
    Explainability: DriftCheckExplainability & {
      Constraints: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      ConfigFile: FileSource & { S3Uri: S3Uri };
    };
    ModelQuality: DriftCheckModelQuality & {
      Statistics: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      Constraints: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
    };
    ModelDataQuality: DriftCheckModelDataQuality & {
      Statistics: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
      Constraints: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
    };
  };
  AdditionalInferenceSpecifications?: (AdditionalInferenceSpecificationDefinition & {
    Name: EntityName;
    Containers: (ModelPackageContainerDefinition & {
      ModelDataSource: ModelDataSource & {
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      };
      ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
      AdditionalModelDataSources: (AdditionalModelDataSource & {
        ChannelName: AdditionalModelChannelName;
        S3DataSource: S3ModelDataSource & {
          S3Uri: S3ModelUri;
          S3DataType: S3ModelDataType;
          CompressionType: ModelCompressionType;
          ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
          HubAccessConfig: InferenceHubAccessConfig & {
            HubContentArn: HubContentArn;
          };
        };
      })[];
      AdditionalS3DataSource: AdditionalS3DataSource & {
        S3DataType: AdditionalS3DataSourceDataType;
        S3Uri: S3Uri;
      };
    })[];
  })[];
  SkipModelValidation?: SkipModelValidation;
  SourceUri?: string;
  SecurityConfig?: ModelPackageSecurityConfig & { KmsKeyId: KmsKeyId };
  ModelCard?: ModelPackageModelCard;
  ModelLifeCycle?: ModelLifeCycle & {
    Stage: EntityName;
    StageStatus: EntityName;
  };
  ManagedStorageType?: ManagedStorageType;
}
export interface DescribeModelPackageGroupInput {
  ModelPackageGroupName?: string;
}
export type ModelPackageGroupStatus =
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | "DeleteFailed"
  | (string & {});
export interface DescribeModelPackageGroupOutput {
  ModelPackageGroupName: string;
  ModelPackageGroupArn: string;
  ModelPackageGroupDescription?: string;
  CreationTime: Date;
  CreatedBy: UserContext;
  ModelPackageGroupStatus: ModelPackageGroupStatus;
  ManagedConfiguration?: ManagedConfiguration;
}
export interface DescribeModelQualityJobDefinitionRequest {
  JobDefinitionName?: string;
}
export interface DescribeModelQualityJobDefinitionResponse {
  JobDefinitionArn: string;
  JobDefinitionName: string;
  CreationTime: Date;
  ModelQualityBaselineConfig?: ModelQualityBaselineConfig;
  ModelQualityAppSpecification: ModelQualityAppSpecification & {
    ImageUri: ImageUri;
  };
  ModelQualityJobInput: ModelQualityJobInput & {
    GroundTruthS3Input: MonitoringGroundTruthS3Input;
    EndpointInput: EndpointInput & {
      EndpointName: EndpointName;
      LocalPath: ProcessingLocalPath;
    };
    BatchTransformInput: BatchTransformInput & {
      DataCapturedDestinationS3Uri: DestinationS3Uri;
      DatasetFormat: MonitoringDatasetFormat;
      LocalPath: ProcessingLocalPath;
    };
  };
  ModelQualityJobOutputConfig: MonitoringOutputConfig & {
    MonitoringOutputs: (MonitoringOutput & {
      S3Output: MonitoringS3Output & {
        S3Uri: MonitoringS3Uri;
        LocalPath: ProcessingLocalPath;
      };
    })[];
  };
  JobResources: MonitoringResources & {
    ClusterConfig: MonitoringClusterConfig & {
      InstanceCount: ProcessingInstanceCount;
      InstanceType: ProcessingInstanceType;
      VolumeSizeInGB: ProcessingVolumeSizeInGB;
    };
  };
  NetworkConfig?: MonitoringNetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  RoleArn: string;
  StoppingCondition?: MonitoringStoppingCondition & {
    MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
  };
}
export interface DescribeMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
}
export type ScheduleStatus =
  | "Pending"
  | "Failed"
  | "Scheduled"
  | "Stopped"
  | (string & {});
export type ExecutionStatus =
  | "Pending"
  | "Completed"
  | "CompletedWithViolations"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface MonitoringExecutionSummary {
  MonitoringScheduleName?: string;
  ScheduledTime?: Date;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MonitoringExecutionStatus?: ExecutionStatus;
  ProcessingJobArn?: string;
  EndpointName?: string;
  FailureReason?: string;
  MonitoringJobDefinitionName?: string;
  MonitoringType?: MonitoringType;
}
export interface DescribeMonitoringScheduleResponse {
  MonitoringScheduleArn: string;
  MonitoringScheduleName: string;
  MonitoringScheduleStatus: ScheduleStatus;
  MonitoringType?: MonitoringType;
  FailureReason?: string;
  CreationTime: Date;
  LastModifiedTime: Date;
  MonitoringScheduleConfig: MonitoringScheduleConfig & {
    ScheduleConfig: ScheduleConfig & { ScheduleExpression: ScheduleExpression };
    MonitoringJobDefinition: MonitoringJobDefinition & {
      MonitoringInputs: (MonitoringInput & {
        EndpointInput: EndpointInput & {
          EndpointName: EndpointName;
          LocalPath: ProcessingLocalPath;
        };
        BatchTransformInput: BatchTransformInput & {
          DataCapturedDestinationS3Uri: DestinationS3Uri;
          DatasetFormat: MonitoringDatasetFormat;
          LocalPath: ProcessingLocalPath;
        };
      })[];
      MonitoringOutputConfig: MonitoringOutputConfig & {
        MonitoringOutputs: (MonitoringOutput & {
          S3Output: MonitoringS3Output & {
            S3Uri: MonitoringS3Uri;
            LocalPath: ProcessingLocalPath;
          };
        })[];
      };
      MonitoringResources: MonitoringResources & {
        ClusterConfig: MonitoringClusterConfig & {
          InstanceCount: ProcessingInstanceCount;
          InstanceType: ProcessingInstanceType;
          VolumeSizeInGB: ProcessingVolumeSizeInGB;
        };
      };
      MonitoringAppSpecification: MonitoringAppSpecification & {
        ImageUri: ImageUri;
      };
      RoleArn: RoleArn;
      StoppingCondition: MonitoringStoppingCondition & {
        MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
      };
      NetworkConfig: NetworkConfig & {
        VpcConfig: VpcConfig & {
          SecurityGroupIds: VpcSecurityGroupIds;
          Subnets: Subnets;
        };
      };
    };
  };
  EndpointName?: string;
  LastMonitoringExecutionSummary?: MonitoringExecutionSummary & {
    MonitoringScheduleName: MonitoringScheduleName;
    ScheduledTime: Date;
    CreationTime: Date;
    LastModifiedTime: Date;
    MonitoringExecutionStatus: ExecutionStatus;
  };
}
export interface DescribeNotebookInstanceInput {
  NotebookInstanceName?: string;
}
export type NotebookInstanceStatus =
  | "Pending"
  | "InService"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "Deleting"
  | "Updating"
  | "PendingMaintenance"
  | "InMaintenance"
  | (string & {});
export type NetworkInterfaceId = string;
export interface DescribeNotebookInstanceOutput {
  NotebookInstanceArn?: string;
  NotebookInstanceName?: string;
  NotebookInstanceStatus?: NotebookInstanceStatus;
  FailureReason?: string;
  Url?: string;
  InstanceType?: InstanceType;
  IpAddressType?: IPAddressType;
  SubnetId?: string;
  SecurityGroups?: string[];
  RoleArn?: string;
  KmsKeyId?: string;
  NetworkInterfaceId?: string;
  LastModifiedTime?: Date;
  CreationTime?: Date;
  NotebookInstanceLifecycleConfigName?: string;
  DirectInternetAccess?: DirectInternetAccess;
  VolumeSizeInGB?: number;
  AcceleratorTypes?: NotebookInstanceAcceleratorType[];
  DefaultCodeRepository?: string;
  AdditionalCodeRepositories?: string[];
  RootAccess?: RootAccess;
  PlatformIdentifier?: string;
  InstanceMetadataServiceConfiguration?: InstanceMetadataServiceConfiguration & {
    MinimumInstanceMetadataServiceVersion: MinimumInstanceMetadataServiceVersion;
  };
}
export interface DescribeNotebookInstanceLifecycleConfigInput {
  NotebookInstanceLifecycleConfigName?: string;
}
export interface DescribeNotebookInstanceLifecycleConfigOutput {
  NotebookInstanceLifecycleConfigArn?: string;
  NotebookInstanceLifecycleConfigName?: string;
  OnCreate?: NotebookInstanceLifecycleHook[];
  OnStart?: NotebookInstanceLifecycleHook[];
  LastModifiedTime?: Date;
  CreationTime?: Date;
}
export interface DescribeOptimizationJobRequest {
  OptimizationJobName?: string;
}
export type OptimizationJobStatus =
  | "INPROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STARTING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface OptimizationOutput {
  RecommendedInferenceImage?: string;
}
export interface DescribeOptimizationJobResponse {
  OptimizationJobArn: string;
  OptimizationJobStatus: OptimizationJobStatus;
  OptimizationStartTime?: Date;
  OptimizationEndTime?: Date;
  CreationTime: Date;
  LastModifiedTime: Date;
  FailureReason?: string;
  OptimizationJobName: string;
  ModelSource: OptimizationJobModelSource & {
    S3: OptimizationJobModelSourceS3 & {
      ModelAccessConfig: OptimizationModelAccessConfig & {
        AcceptEula: OptimizationModelAcceptEula;
      };
    };
  };
  OptimizationEnvironment?: { [key: string]: string | undefined };
  DeploymentInstanceType: OptimizationJobDeploymentInstanceType;
  MaxInstanceCount?: number;
  OptimizationConfigs: OptimizationConfig[];
  OutputConfig: OptimizationJobOutputConfig & { S3OutputLocation: S3Uri };
  OptimizationOutput?: OptimizationOutput;
  RoleArn: string;
  StoppingCondition: StoppingCondition;
  VpcConfig?: OptimizationVpcConfig & {
    SecurityGroupIds: OptimizationVpcSecurityGroupIds;
    Subnets: OptimizationVpcSubnets;
  };
  TrainingPlanArns?: string[];
}
export interface DescribePartnerAppRequest {
  Arn?: string;
  IncludeAvailableUpgrade?: boolean;
}
export type PartnerAppStatus =
  | "Creating"
  | "Updating"
  | "Deleting"
  | "Available"
  | "Failed"
  | "UpdateFailed"
  | "Deleted"
  | (string & {});
export interface ErrorInfo {
  Code?: string;
  Reason?: string;
}
export type MajorMinorVersion = string;
export type ReleaseNotesList = string[];
export interface AvailableUpgrade {
  Version?: string;
  ReleaseNotes?: string[];
}
export type ApplicationArn = string;
export interface IdcConfigOutput {
  InstanceArn: string;
  ApplicationArn?: string;
}
export interface DescribePartnerAppResponse {
  Arn?: string;
  Name?: string;
  Type?: PartnerAppType;
  Status?: PartnerAppStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  ExecutionRoleArn?: string;
  KmsKeyId?: string;
  BaseUrl?: string;
  MaintenanceConfig?: PartnerAppMaintenanceConfig;
  Tier?: string;
  Version?: string;
  ApplicationConfig?: PartnerAppConfig;
  AuthType?: PartnerAppAuthType;
  EnableIamSessionBasedIdentity?: boolean;
  Error?: ErrorInfo;
  EnableAutoMinorVersionUpgrade?: boolean;
  CurrentVersionEolDate?: Date;
  AvailableUpgrade?: AvailableUpgrade;
  IdcConfig?: IdcConfigOutput;
}
export type PipelineNameOrArn = string;
export type PipelineVersionId = number;
export interface DescribePipelineRequest {
  PipelineName?: string;
  PipelineVersionId?: number;
}
export type PipelineStatus = "Active" | "Deleting" | (string & {});
export type PipelineVersionName = string;
export type PipelineVersionDescription = string;
export interface DescribePipelineResponse {
  PipelineArn?: string;
  PipelineName?: string;
  PipelineDisplayName?: string;
  PipelineDefinition?: string;
  PipelineDescription?: string;
  RoleArn?: string;
  PipelineStatus?: PipelineStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastRunTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedBy?: UserContext;
  ParallelismConfiguration?: ParallelismConfiguration & {
    MaxParallelExecutionSteps: MaxParallelExecutionSteps;
  };
  PipelineVersionDisplayName?: string;
  PipelineVersionDescription?: string;
}
export type PipelineExecutionArn = string;
export interface DescribePipelineDefinitionForExecutionRequest {
  PipelineExecutionArn?: string;
}
export interface DescribePipelineDefinitionForExecutionResponse {
  PipelineDefinition?: string;
  CreationTime?: Date;
}
export interface DescribePipelineExecutionRequest {
  PipelineExecutionArn?: string;
}
export type PipelineExecutionName = string;
export type PipelineExecutionStatus =
  | "Executing"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "Succeeded"
  | (string & {});
export type PipelineExecutionDescription = string;
export interface PipelineExperimentConfig {
  ExperimentName?: string;
  TrialName?: string;
}
export type PipelineExecutionFailureReason = string;
export interface SelectedStep {
  StepName?: string;
}
export type SelectedStepList = SelectedStep[];
export interface SelectiveExecutionConfig {
  SourcePipelineExecutionArn?: string;
  SelectedSteps?: SelectedStep[];
}
export type MLflowArn = string;
export type MlflowExperimentEntityName = string;
export interface MLflowConfiguration {
  MlflowResourceArn?: string;
  MlflowExperimentName?: string;
}
export interface DescribePipelineExecutionResponse {
  PipelineArn?: string;
  PipelineExecutionArn?: string;
  PipelineExecutionDisplayName?: string;
  PipelineExecutionStatus?: PipelineExecutionStatus;
  PipelineExecutionDescription?: string;
  PipelineExperimentConfig?: PipelineExperimentConfig;
  FailureReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedBy?: UserContext;
  ParallelismConfiguration?: ParallelismConfiguration & {
    MaxParallelExecutionSteps: MaxParallelExecutionSteps;
  };
  SelectiveExecutionConfig?: SelectiveExecutionConfig & {
    SelectedSteps: (SelectedStep & { StepName: String256 })[];
  };
  PipelineVersionId?: number;
  MLflowConfig?: MLflowConfiguration;
}
export interface DescribeProcessingJobRequest {
  ProcessingJobName?: string;
}
export type ProcessingJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type ExitMessage = string;
export interface DescribeProcessingJobResponse {
  ProcessingInputs?: (ProcessingInput & {
    InputName: string;
    S3Input: ProcessingS3Input & {
      S3Uri: S3Uri;
      S3DataType: ProcessingS3DataType;
    };
    DatasetDefinition: DatasetDefinition & {
      AthenaDatasetDefinition: AthenaDatasetDefinition & {
        Catalog: AthenaCatalog;
        Database: AthenaDatabase;
        QueryString: AthenaQueryString;
        OutputS3Uri: S3Uri;
        OutputFormat: AthenaResultFormat;
      };
      RedshiftDatasetDefinition: RedshiftDatasetDefinition & {
        ClusterId: RedshiftClusterId;
        Database: RedshiftDatabase;
        DbUser: RedshiftUserName;
        QueryString: RedshiftQueryString;
        ClusterRoleArn: RoleArn;
        OutputS3Uri: S3Uri;
        OutputFormat: RedshiftResultFormat;
      };
    };
  })[];
  ProcessingOutputConfig?: ProcessingOutputConfig & {
    Outputs: (ProcessingOutput & {
      OutputName: string;
      S3Output: ProcessingS3Output & {
        S3Uri: S3Uri;
        S3UploadMode: ProcessingS3UploadMode;
      };
      FeatureStoreOutput: ProcessingFeatureStoreOutput & {
        FeatureGroupName: FeatureGroupName;
      };
    })[];
  };
  ProcessingJobName: string;
  ProcessingResources: ProcessingResources & {
    ClusterConfig: ProcessingClusterConfig & {
      VolumeSizeInGB: ProcessingVolumeSizeInGB;
    };
  };
  StoppingCondition?: ProcessingStoppingCondition & {
    MaxRuntimeInSeconds: ProcessingMaxRuntimeInSeconds;
  };
  AppSpecification: AppSpecification & { ImageUri: ImageUri };
  Environment?: { [key: string]: string | undefined };
  NetworkConfig?: NetworkConfig & {
    VpcConfig: VpcConfig & {
      SecurityGroupIds: VpcSecurityGroupIds;
      Subnets: Subnets;
    };
  };
  RoleArn?: string;
  ExperimentConfig?: ExperimentConfig;
  ProcessingJobArn: string;
  ProcessingJobStatus: ProcessingJobStatus;
  ExitMessage?: string;
  FailureReason?: string;
  ProcessingEndTime?: Date;
  ProcessingStartTime?: Date;
  LastModifiedTime?: Date;
  CreationTime: Date;
  MonitoringScheduleArn?: string;
  AutoMLJobArn?: string;
  TrainingJobArn?: string;
}
export interface DescribeProjectInput {
  ProjectName?: string;
}
export type ProvisionedProductStatusMessage = string;
export interface ServiceCatalogProvisionedProductDetails {
  ProvisionedProductId?: string;
  ProvisionedProductStatusMessage?: string;
}
export type ProjectStatus =
  | "Pending"
  | "CreateInProgress"
  | "CreateCompleted"
  | "CreateFailed"
  | "DeleteInProgress"
  | "DeleteFailed"
  | "DeleteCompleted"
  | "UpdateInProgress"
  | "UpdateCompleted"
  | "UpdateFailed"
  | (string & {});
export interface CfnStackParameter {
  Key?: string;
  Value?: string;
}
export type CfnStackParameters = CfnStackParameter[];
export type CfnStackName = string;
export type CfnStackId = string;
export type CfnStackStatusMessage = string;
export interface CfnStackDetail {
  Name?: string;
  Id?: string;
  StatusMessage?: string;
}
export interface CfnTemplateProviderDetail {
  TemplateName?: string;
  TemplateURL?: string;
  RoleARN?: string;
  Parameters?: CfnStackParameter[];
  StackDetail?: CfnStackDetail;
}
export interface TemplateProviderDetail {
  CfnTemplateProviderDetail?: CfnTemplateProviderDetail;
}
export type TemplateProviderDetailList = TemplateProviderDetail[];
export interface DescribeProjectOutput {
  ProjectArn: string;
  ProjectName: string;
  ProjectId: string;
  ProjectDescription?: string;
  ServiceCatalogProvisioningDetails?: ServiceCatalogProvisioningDetails & {
    ProductId: ServiceCatalogEntityId;
  };
  ServiceCatalogProvisionedProductDetails?: ServiceCatalogProvisionedProductDetails;
  ProjectStatus: ProjectStatus;
  TemplateProviderDetails?: (TemplateProviderDetail & {
    CfnTemplateProviderDetail: CfnTemplateProviderDetail & {
      TemplateName: CfnTemplateName;
      TemplateURL: CfnTemplateURL;
      Parameters: (CfnStackParameter & { Key: CfnStackParameterKey })[];
      StackDetail: CfnStackDetail & { StatusMessage: CfnStackStatusMessage };
    };
  })[];
  CreatedBy?: UserContext;
  CreationTime: Date;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export type ReservedCapacityArn = string;
export interface DescribeReservedCapacityRequest {
  ReservedCapacityArn?: string;
}
export type ReservedCapacityType = "UltraServer" | "Instance" | (string & {});
export type ReservedCapacityStatus =
  | "Pending"
  | "Active"
  | "Scheduled"
  | "Expired"
  | "Failed"
  | (string & {});
export type AvailabilityZone = string;
export type ReservedCapacityDurationHours = number;
export type ReservedCapacityDurationMinutes = number;
export type ReservedCapacityInstanceType =
  | "ml.p4d.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.p5e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn2.48xlarge"
  | "ml.p6-b200.48xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p6e-gb200.36xlarge"
  | "ml.p5.4xlarge"
  | "ml.p6-b300.48xlarge"
  | (string & {});
export type TotalInstanceCount = number;
export type AvailableInstanceCount = number;
export type InUseInstanceCount = number;
export type UltraServerType = string;
export type UltraServerCount = number;
export type AvailableSpareInstanceCount = number;
export type UnhealthyInstanceCount = number;
export interface UltraServerSummary {
  UltraServerType?: string;
  InstanceType?: ReservedCapacityInstanceType;
  UltraServerCount?: number;
  AvailableSpareInstanceCount?: number;
  UnhealthyInstanceCount?: number;
}
export interface DescribeReservedCapacityResponse {
  ReservedCapacityArn: string;
  ReservedCapacityType?: ReservedCapacityType;
  Status?: ReservedCapacityStatus;
  AvailabilityZone?: string;
  DurationHours?: number;
  DurationMinutes?: number;
  StartTime?: Date;
  EndTime?: Date;
  InstanceType: ReservedCapacityInstanceType;
  TotalInstanceCount: number;
  AvailableInstanceCount?: number;
  InUseInstanceCount?: number;
  UltraServerSummary?: UltraServerSummary & {
    UltraServerType: UltraServerType;
    InstanceType: ReservedCapacityInstanceType;
  };
}
export interface DescribeSpaceRequest {
  DomainId?: string;
  SpaceName?: string;
}
export type EfsUid = string;
export type SpaceStatus =
  | "Deleting"
  | "Failed"
  | "InService"
  | "Pending"
  | "Updating"
  | "Update_Failed"
  | "Delete_Failed"
  | (string & {});
export interface DescribeSpaceResponse {
  DomainId?: string;
  SpaceArn?: string;
  SpaceName?: string;
  HomeEfsFileSystemUid?: string;
  Status?: SpaceStatus;
  LastModifiedTime?: Date;
  CreationTime?: Date;
  FailureReason?: string;
  SpaceSettings?: SpaceSettings & {
    JupyterServerAppSettings: JupyterServerAppSettings & {
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    KernelGatewayAppSettings: KernelGatewayAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    JupyterLabAppSettings: SpaceJupyterLabAppSettings & {
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    SpaceStorageSettings: SpaceStorageSettings & {
      EbsStorageSettings: EbsStorageSettings & {
        EbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
      };
    };
  };
  OwnershipSettings?: OwnershipSettings & {
    OwnerUserProfileName: UserProfileName;
  };
  SpaceSharingSettings?: SpaceSharingSettings & { SharingType: SharingType };
  SpaceDisplayName?: string;
  Url?: string;
}
export interface DescribeStudioLifecycleConfigRequest {
  StudioLifecycleConfigName?: string;
}
export interface DescribeStudioLifecycleConfigResponse {
  StudioLifecycleConfigArn?: string;
  StudioLifecycleConfigName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  StudioLifecycleConfigContent?: string;
  StudioLifecycleConfigAppType?: StudioLifecycleConfigAppType;
}
export interface DescribeSubscribedWorkteamRequest {
  WorkteamArn?: string;
}
export interface SubscribedWorkteam {
  WorkteamArn?: string;
  MarketplaceTitle?: string;
  SellerName?: string;
  MarketplaceDescription?: string;
  ListingId?: string;
}
export interface DescribeSubscribedWorkteamResponse {
  SubscribedWorkteam: SubscribedWorkteam & { WorkteamArn: WorkteamArn };
}
export interface DescribeTrainingJobRequest {
  TrainingJobName?: string;
}
export type SecondaryStatus =
  | "Starting"
  | "LaunchingMLInstances"
  | "PreparingTrainingStack"
  | "Downloading"
  | "DownloadingTrainingImage"
  | "Training"
  | "Uploading"
  | "Stopping"
  | "Stopped"
  | "MaxRuntimeExceeded"
  | "Completed"
  | "Failed"
  | "Interrupted"
  | "MaxWaitTimeExceeded"
  | "Updating"
  | "Restarting"
  | "Pending"
  | (string & {});
export type WarmPoolResourceStatus =
  | "Available"
  | "Terminated"
  | "Reused"
  | "InUse"
  | (string & {});
export type ResourceRetainedBillableTimeInSeconds = number;
export interface WarmPoolStatus {
  Status?: WarmPoolResourceStatus;
  ResourceRetainedBillableTimeInSeconds?: number;
  ReusedByJob?: string;
}
export type StatusMessage = string;
export interface SecondaryStatusTransition {
  Status?: SecondaryStatus;
  StartTime?: Date;
  EndTime?: Date;
  StatusMessage?: string;
}
export type SecondaryStatusTransitions = SecondaryStatusTransition[];
export interface MetricData {
  MetricName?: string;
  Value?: number;
  Timestamp?: Date;
}
export type FinalMetricDataList = MetricData[];
export type TrainingTimeInSeconds = number;
export type BillableTimeInSeconds = number;
export type BillableTokenCount = number;
export type RuleEvaluationStatus =
  | "InProgress"
  | "NoIssuesFound"
  | "IssuesFound"
  | "Error"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type StatusDetails = string;
export interface DebugRuleEvaluationStatus {
  RuleConfigurationName?: string;
  RuleEvaluationJobArn?: string;
  RuleEvaluationStatus?: RuleEvaluationStatus;
  StatusDetails?: string;
  LastModifiedTime?: Date;
}
export type DebugRuleEvaluationStatuses = DebugRuleEvaluationStatus[];
export interface ProfilerRuleEvaluationStatus {
  RuleConfigurationName?: string;
  RuleEvaluationJobArn?: string;
  RuleEvaluationStatus?: RuleEvaluationStatus;
  StatusDetails?: string;
  LastModifiedTime?: Date;
}
export type ProfilerRuleEvaluationStatuses = ProfilerRuleEvaluationStatus[];
export type ProfilingStatus = "Enabled" | "Disabled" | (string & {});
export type MlflowExperimentId = string;
export type MlflowRunId = string;
export interface MlflowDetails {
  MlflowExperimentId?: string;
  MlflowRunId?: string;
}
export type TotalStepCountPerEpoch = number;
export type TrainingStepIndex = number;
export type TrainingEpochIndex = number;
export type TrainingEpochCount = number;
export interface TrainingProgressInfo {
  TotalStepCountPerEpoch?: number;
  CurrentStep?: number;
  CurrentEpoch?: number;
  MaxEpoch?: number;
}
export interface DescribeTrainingJobResponse {
  TrainingJobName: string;
  TrainingJobArn: string;
  TuningJobArn?: string;
  LabelingJobArn?: string;
  AutoMLJobArn?: string;
  ModelArtifacts: ModelArtifacts & { S3ModelArtifacts: S3Uri };
  TrainingJobStatus: TrainingJobStatus;
  SecondaryStatus: SecondaryStatus;
  FailureReason?: string;
  HyperParameters?: { [key: string]: string | undefined };
  AlgorithmSpecification?: AlgorithmSpecification & {
    TrainingInputMode: TrainingInputMode;
    MetricDefinitions: (MetricDefinition & {
      Name: MetricName;
      Regex: MetricRegex;
    })[];
    TrainingImageConfig: TrainingImageConfig & {
      TrainingRepositoryAccessMode: TrainingRepositoryAccessMode;
      TrainingRepositoryAuthConfig: TrainingRepositoryAuthConfig & {
        TrainingRepositoryCredentialsProviderArn: TrainingRepositoryCredentialsProviderArn;
      };
    };
  };
  RoleArn?: string;
  InputDataConfig?: (Channel & {
    ChannelName: ChannelName;
    DataSource: DataSource & {
      S3DataSource: S3DataSource & {
        S3DataType: S3DataType;
        S3Uri: S3Uri;
        ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
        HubAccessConfig: HubAccessConfig & { HubContentArn: HubContentArn };
      };
      FileSystemDataSource: FileSystemDataSource & {
        FileSystemId: FileSystemId;
        FileSystemAccessMode: FileSystemAccessMode;
        FileSystemType: FileSystemType;
        DirectoryPath: DirectoryPath;
      };
    };
    ShuffleConfig: ShuffleConfig & { Seed: Seed };
  })[];
  OutputDataConfig?: OutputDataConfig & { S3OutputPath: S3Uri };
  ResourceConfig?: ResourceConfig & {
    InstanceGroups: (InstanceGroup & {
      InstanceType: TrainingInstanceType;
      InstanceCount: TrainingInstanceCount;
      InstanceGroupName: InstanceGroupName;
    })[];
    InstancePlacementConfig: InstancePlacementConfig & {
      PlacementSpecifications: (PlacementSpecification & {
        InstanceCount: TrainingInstanceCount;
      })[];
    };
  };
  WarmPoolStatus?: WarmPoolStatus & { Status: WarmPoolResourceStatus };
  VpcConfig?: VpcConfig & {
    SecurityGroupIds: VpcSecurityGroupIds;
    Subnets: Subnets;
  };
  StoppingCondition: StoppingCondition;
  CreationTime: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  LastModifiedTime?: Date;
  SecondaryStatusTransitions?: (SecondaryStatusTransition & {
    Status: SecondaryStatus;
    StartTime: Date;
  })[];
  FinalMetricDataList?: MetricData[];
  EnableNetworkIsolation?: boolean;
  EnableInterContainerTrafficEncryption?: boolean;
  EnableManagedSpotTraining?: boolean;
  CheckpointConfig?: CheckpointConfig & { S3Uri: S3Uri };
  TrainingTimeInSeconds?: number;
  BillableTimeInSeconds?: number;
  BillableTokenCount?: number;
  DebugHookConfig?: DebugHookConfig & { S3OutputPath: S3Uri };
  ExperimentConfig?: ExperimentConfig;
  DebugRuleConfigurations?: (DebugRuleConfiguration & {
    RuleConfigurationName: RuleConfigurationName;
    RuleEvaluatorImage: AlgorithmImage;
  })[];
  TensorBoardOutputConfig?: TensorBoardOutputConfig & { S3OutputPath: S3Uri };
  DebugRuleEvaluationStatuses?: DebugRuleEvaluationStatus[];
  ProfilerConfig?: ProfilerConfig;
  ProfilerRuleConfigurations?: (ProfilerRuleConfiguration & {
    RuleConfigurationName: RuleConfigurationName;
    RuleEvaluatorImage: AlgorithmImage;
  })[];
  ProfilerRuleEvaluationStatuses?: ProfilerRuleEvaluationStatus[];
  ProfilingStatus?: ProfilingStatus;
  Environment?: { [key: string]: string | undefined };
  RetryStrategy?: RetryStrategy & {
    MaximumRetryAttempts: MaximumRetryAttempts;
  };
  RemoteDebugConfig?: RemoteDebugConfig;
  InfraCheckConfig?: InfraCheckConfig;
  ServerlessJobConfig?: ServerlessJobConfig;
  MlflowConfig?: MlflowConfig;
  ModelPackageConfig?: ModelPackageConfig;
  MlflowDetails?: MlflowDetails;
  ProgressInfo?: TrainingProgressInfo;
  OutputModelPackageArn?: string;
}
export interface DescribeTrainingPlanRequest {
  TrainingPlanName?: string;
}
export type TrainingPlanStatus =
  | "Pending"
  | "Active"
  | "Scheduled"
  | "Expired"
  | "Failed"
  | (string & {});
export type TrainingPlanStatusMessage = string;
export type TrainingPlanDurationHours = number;
export type TrainingPlanDurationMinutes = number;
export type CurrencyCode = string;
export type SageMakerResourceName =
  | "training-job"
  | "hyperpod-cluster"
  | "endpoint"
  | "studio-apps"
  | (string & {});
export type SageMakerResourceNames = SageMakerResourceName[];
export type AvailabilityZoneId = string;
export interface ReservedCapacitySummary {
  ReservedCapacityArn?: string;
  ReservedCapacityType?: ReservedCapacityType;
  UltraServerType?: string;
  UltraServerCount?: number;
  InstanceType?: ReservedCapacityInstanceType;
  TotalInstanceCount?: number;
  Status?: ReservedCapacityStatus;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  DurationHours?: number;
  DurationMinutes?: number;
  StartTime?: Date;
  EndTime?: Date;
}
export type ReservedCapacitySummaries = ReservedCapacitySummary[];
export interface DescribeTrainingPlanResponse {
  TrainingPlanArn: string;
  TrainingPlanName: string;
  Status: TrainingPlanStatus;
  StatusMessage?: string;
  DurationHours?: number;
  DurationMinutes?: number;
  StartTime?: Date;
  EndTime?: Date;
  UpfrontFee?: string;
  CurrencyCode?: string;
  TotalInstanceCount?: number;
  AvailableInstanceCount?: number;
  InUseInstanceCount?: number;
  UnhealthyInstanceCount?: number;
  AvailableSpareInstanceCount?: number;
  TotalUltraServerCount?: number;
  TargetResources?: SageMakerResourceName[];
  ReservedCapacitySummaries?: (ReservedCapacitySummary & {
    ReservedCapacityArn: ReservedCapacityArn;
    InstanceType: ReservedCapacityInstanceType;
    TotalInstanceCount: TotalInstanceCount;
    Status: ReservedCapacityStatus;
  })[];
}
export interface DescribeTrainingPlanExtensionHistoryRequest {
  TrainingPlanArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TrainingPlanExtensionOfferingId = string;
export type TrainingPlanExtensionDurationHours = number;
export interface TrainingPlanExtension {
  TrainingPlanExtensionOfferingId?: string;
  ExtendedAt?: Date;
  StartDate?: Date;
  EndDate?: Date;
  Status?: string;
  PaymentStatus?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  DurationHours?: number;
  UpfrontFee?: string;
  CurrencyCode?: string;
}
export type TrainingPlanExtensions = TrainingPlanExtension[];
export interface DescribeTrainingPlanExtensionHistoryResponse {
  TrainingPlanExtensions: (TrainingPlanExtension & {
    TrainingPlanExtensionOfferingId: TrainingPlanExtensionOfferingId;
  })[];
  NextToken?: string;
}
export interface DescribeTransformJobRequest {
  TransformJobName?: string;
}
export type TransformJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface DescribeTransformJobResponse {
  TransformJobName: string;
  TransformJobArn: string;
  TransformJobStatus: TransformJobStatus;
  FailureReason?: string;
  ModelName: string;
  MaxConcurrentTransforms?: number;
  ModelClientConfig?: ModelClientConfig;
  MaxPayloadInMB?: number;
  BatchStrategy?: BatchStrategy;
  Environment?: { [key: string]: string | undefined };
  TransformInput: TransformInput & {
    DataSource: TransformDataSource & {
      S3DataSource: TransformS3DataSource & {
        S3DataType: S3DataType;
        S3Uri: S3Uri;
      };
    };
  };
  TransformOutput?: TransformOutput & { S3OutputPath: S3Uri };
  DataCaptureConfig?: BatchDataCaptureConfig & { DestinationS3Uri: S3Uri };
  TransformResources: TransformResources & {
    InstanceType: TransformInstanceType;
    InstanceCount: TransformInstanceCount;
  };
  CreationTime: Date;
  TransformStartTime?: Date;
  TransformEndTime?: Date;
  LabelingJobArn?: string;
  AutoMLJobArn?: string;
  DataProcessing?: DataProcessing;
  ExperimentConfig?: ExperimentConfig;
}
export interface DescribeTrialRequest {
  TrialName?: string;
}
export type TrialSourceArn = string;
export interface TrialSource {
  SourceArn?: string;
  SourceType?: string;
}
export interface DescribeTrialResponse {
  TrialName?: string;
  TrialArn?: string;
  DisplayName?: string;
  ExperimentName?: string;
  Source?: TrialSource & { SourceArn: TrialSourceArn };
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
}
export interface DescribeTrialComponentRequest {
  TrialComponentName?: string;
}
export type TrialComponentSourceArn = string;
export interface TrialComponentSource {
  SourceArn?: string;
  SourceType?: string;
}
export type OptionalDouble = number;
export type OptionalInteger = number;
export interface TrialComponentMetricSummary {
  MetricName?: string;
  SourceArn?: string;
  TimeStamp?: Date;
  Max?: number;
  Min?: number;
  Last?: number;
  Count?: number;
  Avg?: number;
  StdDev?: number;
}
export type TrialComponentMetricSummaries = TrialComponentMetricSummary[];
export type TrialComponentSources = TrialComponentSource[];
export interface DescribeTrialComponentResponse {
  TrialComponentName?: string;
  TrialComponentArn?: string;
  DisplayName?: string;
  Source?: TrialComponentSource & { SourceArn: TrialComponentSourceArn };
  Status?: TrialComponentStatus;
  StartTime?: Date;
  EndTime?: Date;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  Parameters?: { [key: string]: TrialComponentParameterValue | undefined };
  InputArtifacts?: {
    [key: string]:
      | (TrialComponentArtifact & { Value: TrialComponentArtifactValue })
      | undefined;
  };
  OutputArtifacts?: {
    [key: string]:
      | (TrialComponentArtifact & { Value: TrialComponentArtifactValue })
      | undefined;
  };
  MetadataProperties?: MetadataProperties;
  Metrics?: TrialComponentMetricSummary[];
  LineageGroupArn?: string;
  Sources?: (TrialComponentSource & { SourceArn: TrialComponentSourceArn })[];
}
export interface DescribeUserProfileRequest {
  DomainId?: string;
  UserProfileName?: string;
}
export type UserProfileStatus =
  | "Deleting"
  | "Failed"
  | "InService"
  | "Pending"
  | "Updating"
  | "Update_Failed"
  | "Delete_Failed"
  | (string & {});
export interface DescribeUserProfileResponse {
  DomainId?: string;
  UserProfileArn?: string;
  UserProfileName?: string;
  HomeEfsFileSystemUid?: string;
  Status?: UserProfileStatus;
  LastModifiedTime?: Date;
  CreationTime?: Date;
  FailureReason?: string;
  SingleSignOnUserIdentifier?: string;
  SingleSignOnUserValue?: string;
  UserSettings?: UserSettings & {
    JupyterServerAppSettings: JupyterServerAppSettings & {
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    KernelGatewayAppSettings: KernelGatewayAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    RSessionAppSettings: RSessionAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    CodeEditorAppSettings: CodeEditorAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
    };
    JupyterLabAppSettings: JupyterLabAppSettings & {
      CustomImages: (CustomImage & {
        ImageName: ImageName;
        AppImageConfigName: AppImageConfigName;
      })[];
      CodeRepositories: (CodeRepository & { RepositoryUrl: RepositoryUrl })[];
    };
    SpaceStorageSettings: DefaultSpaceStorageSettings & {
      DefaultEbsStorageSettings: DefaultEbsStorageSettings & {
        DefaultEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
        MaximumEbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
      };
    };
    CustomPosixUserConfig: CustomPosixUserConfig & { Uid: Uid; Gid: Gid };
  };
}
export interface DescribeWorkforceRequest {
  WorkforceName?: string;
}
export interface OidcConfigForResponse {
  ClientId?: string;
  Issuer?: string;
  AuthorizationEndpoint?: string;
  TokenEndpoint?: string;
  UserInfoEndpoint?: string;
  LogoutEndpoint?: string;
  JwksUri?: string;
  Scope?: string;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
}
export type WorkforceVpcEndpointId = string;
export interface WorkforceVpcConfigResponse {
  VpcId?: string;
  SecurityGroupIds?: string[];
  Subnets?: string[];
  VpcEndpointId?: string;
}
export type WorkforceStatus =
  | "Initializing"
  | "Updating"
  | "Deleting"
  | "Failed"
  | "Active"
  | (string & {});
export type WorkforceFailureReason = string;
export interface Workforce {
  WorkforceName?: string;
  WorkforceArn?: string;
  LastUpdatedDate?: Date;
  SourceIpConfig?: SourceIpConfig;
  SubDomain?: string;
  CognitoConfig?: CognitoConfig;
  OidcConfig?: OidcConfigForResponse;
  CreateDate?: Date;
  WorkforceVpcConfig?: WorkforceVpcConfigResponse;
  Status?: WorkforceStatus;
  FailureReason?: string;
  IpAddressType?: WorkforceIpAddressType;
}
export interface DescribeWorkforceResponse {
  Workforce: Workforce & {
    WorkforceName: WorkforceName;
    WorkforceArn: WorkforceArn;
    SourceIpConfig: SourceIpConfig & { Cidrs: Cidrs };
    CognitoConfig: CognitoConfig & {
      UserPool: CognitoUserPool;
      ClientId: ClientId;
    };
    WorkforceVpcConfig: WorkforceVpcConfigResponse & {
      VpcId: WorkforceVpcId;
      SecurityGroupIds: WorkforceSecurityGroupIds;
      Subnets: WorkforceSubnets;
    };
  };
}
export interface DescribeWorkteamRequest {
  WorkteamName?: string;
}
export type ProductListings = string[];
export interface Workteam {
  WorkteamName?: string;
  MemberDefinitions?: MemberDefinition[];
  WorkteamArn?: string;
  WorkforceArn?: string;
  ProductListingIds?: string[];
  Description?: string;
  SubDomain?: string;
  CreateDate?: Date;
  LastUpdatedDate?: Date;
  NotificationConfiguration?: NotificationConfiguration;
  WorkerAccessConfiguration?: WorkerAccessConfiguration;
}
export interface DescribeWorkteamResponse {
  Workteam: Workteam & {
    WorkteamName: WorkteamName;
    MemberDefinitions: (MemberDefinition & {
      CognitoMemberDefinition: CognitoMemberDefinition & {
        UserPool: CognitoUserPool;
        UserGroup: CognitoUserGroup;
        ClientId: ClientId;
      };
    })[];
    WorkteamArn: WorkteamArn;
    Description: String200;
  };
}
export interface DetachClusterNodeVolumeRequest {
  ClusterArn?: string;
  NodeId?: string;
  VolumeId?: string;
}
export interface DetachClusterNodeVolumeResponse {
  ClusterArn: string;
  NodeId: string;
  VolumeId: string;
  AttachTime: Date;
  Status: VolumeAttachmentStatus;
  DeviceName: string;
}
export interface DisableSagemakerServicecatalogPortfolioInput {}
export interface DisableSagemakerServicecatalogPortfolioOutput {}
export interface DisassociateTrialComponentRequest {
  TrialComponentName?: string;
  TrialName?: string;
}
export interface DisassociateTrialComponentResponse {
  TrialComponentArn?: string;
  TrialArn?: string;
}
export interface EnableSagemakerServicecatalogPortfolioInput {}
export interface EnableSagemakerServicecatalogPortfolioOutput {}
export interface ExtendTrainingPlanRequest {
  TrainingPlanExtensionOfferingId?: string;
}
export interface ExtendTrainingPlanResponse {
  TrainingPlanExtensions: (TrainingPlanExtension & {
    TrainingPlanExtensionOfferingId: TrainingPlanExtensionOfferingId;
  })[];
}
export interface GetDeviceFleetReportRequest {
  DeviceFleetName?: string;
}
export interface DeviceStats {
  ConnectedDeviceCount?: number;
  RegisteredDeviceCount?: number;
}
export interface AgentVersion {
  Version?: string;
  AgentCount?: number;
}
export type AgentVersions = AgentVersion[];
export interface EdgeModelStat {
  ModelName?: string;
  ModelVersion?: string;
  OfflineDeviceCount?: number;
  ConnectedDeviceCount?: number;
  ActiveDeviceCount?: number;
  SamplingDeviceCount?: number;
}
export type EdgeModelStats = EdgeModelStat[];
export interface GetDeviceFleetReportResponse {
  DeviceFleetArn: string;
  DeviceFleetName: string;
  OutputConfig?: EdgeOutputConfig & { S3OutputLocation: S3Uri };
  Description?: string;
  ReportGenerated?: Date;
  DeviceStats?: DeviceStats & {
    ConnectedDeviceCount: number;
    RegisteredDeviceCount: number;
  };
  AgentVersions?: (AgentVersion & {
    Version: EdgeVersion;
    AgentCount: number;
  })[];
  ModelStats?: (EdgeModelStat & {
    ModelName: EntityName;
    ModelVersion: EdgeVersion;
    OfflineDeviceCount: number;
    ConnectedDeviceCount: number;
    ActiveDeviceCount: number;
    SamplingDeviceCount: number;
  })[];
}
export type LineageGroupNameOrArn = string;
export interface GetLineageGroupPolicyRequest {
  LineageGroupName?: string;
}
export type ResourcePolicyString = string;
export interface GetLineageGroupPolicyResponse {
  LineageGroupArn?: string;
  ResourcePolicy?: string;
}
export interface GetModelPackageGroupPolicyInput {
  ModelPackageGroupName?: string;
}
export type PolicyString = string;
export interface GetModelPackageGroupPolicyOutput {
  ResourcePolicy: string;
}
export interface GetSagemakerServicecatalogPortfolioStatusInput {}
export type SagemakerServicecatalogStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export interface GetSagemakerServicecatalogPortfolioStatusOutput {
  Status?: SagemakerServicecatalogStatus;
}
export type UtilizationPercentagePerCore = number;
export interface ScalingPolicyObjective {
  MinInvocationsPerMinute?: number;
  MaxInvocationsPerMinute?: number;
}
export interface GetScalingConfigurationRecommendationRequest {
  InferenceRecommendationsJobName?: string;
  RecommendationId?: string;
  EndpointName?: string;
  TargetCpuUtilizationPerCore?: number;
  ScalingPolicyObjective?: ScalingPolicyObjective;
}
export interface ScalingPolicyMetric {
  InvocationsPerInstance?: number;
  ModelLatency?: number;
}
export interface PredefinedMetricSpecification {
  PredefinedMetricType?: string;
}
export type Statistic =
  | "Average"
  | "Minimum"
  | "Maximum"
  | "SampleCount"
  | "Sum"
  | (string & {});
export interface CustomizedMetricSpecification {
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
}
export type MetricSpecification =
  | { Predefined: PredefinedMetricSpecification; Customized?: never }
  | { Predefined?: never; Customized: CustomizedMetricSpecification };
export interface TargetTrackingScalingPolicyConfiguration {
  MetricSpecification?: MetricSpecification;
  TargetValue?: number;
}
export type ScalingPolicy = {
  TargetTracking: TargetTrackingScalingPolicyConfiguration;
};
export type ScalingPolicies = ScalingPolicy[];
export interface DynamicScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  ScalingPolicies?: ScalingPolicy[];
}
export interface GetScalingConfigurationRecommendationResponse {
  InferenceRecommendationsJobName?: string;
  RecommendationId?: string;
  EndpointName?: string;
  TargetCpuUtilizationPerCore?: number;
  ScalingPolicyObjective?: ScalingPolicyObjective;
  Metric?: ScalingPolicyMetric;
  DynamicScalingConfiguration?: DynamicScalingConfiguration;
}
export type ResourceType =
  | "TrainingJob"
  | "Experiment"
  | "ExperimentTrial"
  | "ExperimentTrialComponent"
  | "Endpoint"
  | "Model"
  | "ModelPackage"
  | "ModelPackageGroup"
  | "Pipeline"
  | "PipelineExecution"
  | "FeatureGroup"
  | "FeatureMetadata"
  | "Image"
  | "ImageVersion"
  | "Project"
  | "HyperParameterTuningJob"
  | "ModelCard"
  | "PipelineVersion"
  | "Job"
  | (string & {});
export type PropertyNameHint = string;
export interface PropertyNameQuery {
  PropertyNameHint?: string;
}
export interface SuggestionQuery {
  PropertyNameQuery?: PropertyNameQuery;
}
export interface GetSearchSuggestionsRequest {
  Resource?: ResourceType;
  SuggestionQuery?: SuggestionQuery;
}
export type ResourcePropertyName = string;
export interface PropertyNameSuggestion {
  PropertyName?: string;
}
export type PropertyNameSuggestionList = PropertyNameSuggestion[];
export interface GetSearchSuggestionsResponse {
  PropertyNameSuggestions?: PropertyNameSuggestion[];
}
export interface ImportHubContentRequest {
  HubContentName?: string;
  HubContentVersion?: string;
  HubContentType?: HubContentType;
  DocumentSchemaVersion?: string;
  HubName?: string;
  HubContentDisplayName?: string;
  HubContentDescription?: string;
  HubContentMarkdown?: string;
  HubContentDocument?: string;
  SupportStatus?: HubContentSupportStatus;
  HubContentSearchKeywords?: string[];
  Tags?: Tag[];
}
export interface ImportHubContentResponse {
  HubArn: string;
  HubContentArn: string;
}
export type SortActionsBy = "Name" | "CreationTime" | (string & {});
export type SortOrder = "Ascending" | "Descending" | (string & {});
export interface ListActionsRequest {
  SourceUri?: string;
  ActionType?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortActionsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ActionSummary {
  ActionArn?: string;
  ActionName?: string;
  Source?: ActionSource;
  ActionType?: string;
  Status?: ActionStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ActionSummaries = ActionSummary[];
export interface ListActionsResponse {
  ActionSummaries?: (ActionSummary & {
    Source: ActionSource & { SourceUri: SourceUri };
  })[];
  NextToken?: string;
}
export type NameContains = string;
export type ListAIBenchmarkJobsSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListAIBenchmarkJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  StatusEquals?: AIBenchmarkJobStatus;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortBy?: ListAIBenchmarkJobsSortBy;
  SortOrder?: SortOrder;
}
export interface AIBenchmarkJobSummary {
  AIBenchmarkJobName?: string;
  AIBenchmarkJobArn?: string;
  AIBenchmarkJobStatus?: AIBenchmarkJobStatus;
  CreationTime?: Date;
  EndTime?: Date;
  AIWorkloadConfigName?: string;
}
export type AIBenchmarkJobSummaryList = AIBenchmarkJobSummary[];
export interface ListAIBenchmarkJobsResponse {
  AIBenchmarkJobs: (AIBenchmarkJobSummary & {
    AIBenchmarkJobName: AIEntityName;
    AIBenchmarkJobArn: AIBenchmarkJobArn;
    AIBenchmarkJobStatus: AIBenchmarkJobStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type ListAIRecommendationJobsSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListAIRecommendationJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  StatusEquals?: AIRecommendationJobStatus;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortBy?: ListAIRecommendationJobsSortBy;
  SortOrder?: SortOrder;
}
export interface AIRecommendationJobSummary {
  AIRecommendationJobName?: string;
  AIRecommendationJobArn?: string;
  AIRecommendationJobStatus?: AIRecommendationJobStatus;
  CreationTime?: Date;
  EndTime?: Date;
}
export type AIRecommendationJobSummaryList = AIRecommendationJobSummary[];
export interface ListAIRecommendationJobsResponse {
  AIRecommendationJobs: (AIRecommendationJobSummary & {
    AIRecommendationJobName: AIEntityName;
    AIRecommendationJobArn: AIRecommendationJobArn;
    AIRecommendationJobStatus: AIRecommendationJobStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type ListAIWorkloadConfigsSortBy =
  | "Name"
  | "CreationTime"
  | (string & {});
export interface ListAIWorkloadConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortBy?: ListAIWorkloadConfigsSortBy;
  SortOrder?: SortOrder;
}
export interface AIWorkloadConfigSummary {
  AIWorkloadConfigName?: string;
  AIWorkloadConfigArn?: string;
  CreationTime?: Date;
}
export type AIWorkloadConfigSummaryList = AIWorkloadConfigSummary[];
export interface ListAIWorkloadConfigsResponse {
  AIWorkloadConfigs: (AIWorkloadConfigSummary & {
    AIWorkloadConfigName: AIEntityName;
    AIWorkloadConfigArn: AIWorkloadConfigArn;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type AlgorithmSortBy = "Name" | "CreationTime" | (string & {});
export interface ListAlgorithmsInput {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: AlgorithmSortBy;
  SortOrder?: SortOrder;
}
export interface AlgorithmSummary {
  AlgorithmName?: string;
  AlgorithmArn?: string;
  AlgorithmDescription?: string;
  CreationTime?: Date;
  AlgorithmStatus?: AlgorithmStatus;
}
export type AlgorithmSummaryList = AlgorithmSummary[];
export interface ListAlgorithmsOutput {
  AlgorithmSummaryList: (AlgorithmSummary & {
    AlgorithmName: EntityName;
    AlgorithmArn: AlgorithmArn;
    CreationTime: CreationTime;
    AlgorithmStatus: AlgorithmStatus;
  })[];
  NextToken?: string;
}
export interface ListAliasesRequest {
  ImageName?: string;
  Alias?: string;
  Version?: number;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListAliasesResponse {
  SageMakerImageVersionAliases?: string[];
  NextToken?: string;
}
export type AppImageConfigSortKey =
  | "CreationTime"
  | "LastModifiedTime"
  | "Name"
  | (string & {});
export interface ListAppImageConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  ModifiedTimeBefore?: Date;
  ModifiedTimeAfter?: Date;
  SortBy?: AppImageConfigSortKey;
  SortOrder?: SortOrder;
}
export interface AppImageConfigDetails {
  AppImageConfigArn?: string;
  AppImageConfigName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  KernelGatewayImageConfig?: KernelGatewayImageConfig;
  JupyterLabAppImageConfig?: JupyterLabAppImageConfig;
  CodeEditorAppImageConfig?: CodeEditorAppImageConfig;
}
export type AppImageConfigList = AppImageConfigDetails[];
export interface ListAppImageConfigsResponse {
  NextToken?: string;
  AppImageConfigs?: (AppImageConfigDetails & {
    KernelGatewayImageConfig: KernelGatewayImageConfig & {
      KernelSpecs: (KernelSpec & { Name: KernelName })[];
    };
  })[];
}
export type AppSortKey = "CreationTime" | (string & {});
export interface ListAppsRequest {
  NextToken?: string;
  MaxResults?: number;
  SortOrder?: SortOrder;
  SortBy?: AppSortKey;
  DomainIdEquals?: string;
  UserProfileNameEquals?: string;
  SpaceNameEquals?: string;
}
export interface AppDetails {
  DomainId?: string;
  UserProfileName?: string;
  SpaceName?: string;
  AppType?: AppType;
  AppName?: string;
  Status?: AppStatus;
  CreationTime?: Date;
  ResourceSpec?: ResourceSpec;
}
export type AppList = AppDetails[];
export interface ListAppsResponse {
  Apps?: AppDetails[];
  NextToken?: string;
}
export type SortArtifactsBy = "CreationTime" | (string & {});
export interface ListArtifactsRequest {
  SourceUri?: string;
  ArtifactType?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortArtifactsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ArtifactSummary {
  ArtifactArn?: string;
  ArtifactName?: string;
  Source?: ArtifactSource;
  ArtifactType?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ArtifactSummaries = ArtifactSummary[];
export interface ListArtifactsResponse {
  ArtifactSummaries?: (ArtifactSummary & {
    Source: ArtifactSource & {
      SourceUri: SourceUri;
      SourceTypes: (ArtifactSourceType & {
        SourceIdType: ArtifactSourceIdType;
        Value: String256;
      })[];
    };
  })[];
  NextToken?: string;
}
export type SortAssociationsBy =
  | "SourceArn"
  | "DestinationArn"
  | "SourceType"
  | "DestinationType"
  | "CreationTime"
  | (string & {});
export interface ListAssociationsRequest {
  SourceArn?: string;
  DestinationArn?: string;
  SourceType?: string;
  DestinationType?: string;
  AssociationType?: AssociationEdgeType;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortAssociationsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface AssociationSummary {
  SourceArn?: string;
  DestinationArn?: string;
  SourceType?: string;
  DestinationType?: string;
  AssociationType?: AssociationEdgeType;
  SourceName?: string;
  DestinationName?: string;
  CreationTime?: Date;
  CreatedBy?: UserContext;
}
export type AssociationSummaries = AssociationSummary[];
export interface ListAssociationsResponse {
  AssociationSummaries?: AssociationSummary[];
  NextToken?: string;
}
export type AutoMLNameContains = string;
export type AutoMLSortOrder = "Ascending" | "Descending" | (string & {});
export type AutoMLSortBy = "Name" | "CreationTime" | "Status" | (string & {});
export type AutoMLMaxResults = number;
export interface ListAutoMLJobsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: AutoMLJobStatus;
  SortOrder?: AutoMLSortOrder;
  SortBy?: AutoMLSortBy;
  MaxResults?: number;
  NextToken?: string;
}
export interface AutoMLJobSummary {
  AutoMLJobName?: string;
  AutoMLJobArn?: string;
  AutoMLJobStatus?: AutoMLJobStatus;
  AutoMLJobSecondaryStatus?: AutoMLJobSecondaryStatus;
  CreationTime?: Date;
  EndTime?: Date;
  LastModifiedTime?: Date;
  FailureReason?: string;
  PartialFailureReasons?: AutoMLPartialFailureReason[];
}
export type AutoMLJobSummaries = AutoMLJobSummary[];
export interface ListAutoMLJobsResponse {
  AutoMLJobSummaries: (AutoMLJobSummary & {
    AutoMLJobName: AutoMLJobName;
    AutoMLJobArn: AutoMLJobArn;
    AutoMLJobStatus: AutoMLJobStatus;
    AutoMLJobSecondaryStatus: AutoMLJobSecondaryStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
  })[];
  NextToken?: string;
}
export type CandidateSortBy =
  | "CreationTime"
  | "Status"
  | "FinalObjectiveMetricValue"
  | (string & {});
export type AutoMLMaxResultsForTrials = number;
export interface ListCandidatesForAutoMLJobRequest {
  AutoMLJobName?: string;
  StatusEquals?: CandidateStatus;
  CandidateNameEquals?: string;
  SortOrder?: AutoMLSortOrder;
  SortBy?: CandidateSortBy;
  MaxResults?: number;
  NextToken?: string;
}
export type AutoMLCandidates = AutoMLCandidate[];
export interface ListCandidatesForAutoMLJobResponse {
  Candidates: (AutoMLCandidate & {
    CandidateName: CandidateName;
    ObjectiveStatus: ObjectiveStatus;
    CandidateSteps: (AutoMLCandidateStep & {
      CandidateStepType: CandidateStepType;
      CandidateStepArn: CandidateStepArn;
      CandidateStepName: CandidateStepName;
    })[];
    CandidateStatus: CandidateStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
    FinalAutoMLJobObjectiveMetric: FinalAutoMLJobObjectiveMetric & {
      MetricName: AutoMLMetricEnum;
      Value: MetricValue;
    };
    InferenceContainers: (AutoMLContainerDefinition & {
      Image: ContainerImage;
      ModelDataUrl: Url;
    })[];
    CandidateProperties: CandidateProperties & {
      CandidateArtifactLocations: CandidateArtifactLocations & {
        Explainability: ExplainabilityLocation;
      };
    };
    InferenceContainerDefinitions: {
      [key: string]:
        | (AutoMLContainerDefinition & {
            Image: ContainerImage;
            ModelDataUrl: Url;
          })[]
        | undefined;
    };
  })[];
  NextToken?: string;
}
export type EventSortBy = "EventTime" | (string & {});
export type ClusterEventMaxResults = number;
export interface ListClusterEventsRequest {
  ClusterName?: string;
  InstanceGroupName?: string;
  NodeId?: string;
  EventTimeAfter?: Date;
  EventTimeBefore?: Date;
  SortBy?: EventSortBy;
  SortOrder?: SortOrder;
  ResourceType?: ClusterEventResourceType;
  MaxResults?: number;
  NextToken?: string;
}
export interface ClusterEventSummary {
  EventId?: string;
  ClusterArn?: string;
  ClusterName?: string;
  InstanceGroupName?: string;
  InstanceId?: string;
  ResourceType?: ClusterEventResourceType;
  EventTime?: Date;
  Description?: string;
  EventLevel?: ClusterEventLevel;
}
export type ClusterEventSummaries = ClusterEventSummary[];
export interface ListClusterEventsResponse {
  NextToken?: string;
  Events?: (ClusterEventSummary & {
    EventId: EventId;
    ClusterArn: ClusterArn;
    ClusterName: ClusterName;
    ResourceType: ClusterEventResourceType;
    EventTime: Date;
  })[];
}
export type ClusterSortBy = "CREATION_TIME" | "NAME" | (string & {});
export type IncludeNodeLogicalIdsBoolean = boolean;
export interface ListClusterNodesRequest {
  ClusterName?: string;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  InstanceGroupNameContains?: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: ClusterSortBy;
  SortOrder?: SortOrder;
  IncludeNodeLogicalIds?: boolean;
}
export interface ClusterNodeSummary {
  InstanceGroupName?: string;
  InstanceId?: string;
  NodeLogicalId?: string;
  InstanceType?: ClusterInstanceType;
  LaunchTime?: Date;
  LastSoftwareUpdateTime?: Date;
  InstanceStatus?: ClusterInstanceStatusDetails;
  UltraServerInfo?: UltraServerInfo;
  PrivateDnsHostname?: string;
  CurrentImageReleaseVersion?: string;
  ImageVersionStatus?: ClusterImageVersionStatus;
}
export type ClusterNodeSummaries = ClusterNodeSummary[];
export interface ListClusterNodesResponse {
  NextToken?: string;
  ClusterNodeSummaries: (ClusterNodeSummary & {
    InstanceGroupName: ClusterInstanceGroupName;
    InstanceId: string;
    InstanceType: ClusterInstanceType;
    LaunchTime: Date;
    InstanceStatus: ClusterInstanceStatusDetails & {
      Status: ClusterInstanceStatus;
    };
  })[];
}
export interface ListClustersRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: ClusterSortBy;
  SortOrder?: SortOrder;
  TrainingPlanArn?: string;
}
export type TrainingPlanArns = string[];
export interface ClusterSummary {
  ClusterArn?: string;
  ClusterName?: string;
  CreationTime?: Date;
  ClusterStatus?: ClusterStatus;
  TrainingPlanArns?: string[];
  ImageVersionStatus?: ClusterImageVersionStatus;
}
export type ClusterSummaries = ClusterSummary[];
export interface ListClustersResponse {
  NextToken?: string;
  ClusterSummaries: (ClusterSummary & {
    ClusterArn: ClusterArn;
    ClusterName: ClusterName;
    CreationTime: Date;
    ClusterStatus: ClusterStatus;
  })[];
}
export type SortClusterSchedulerConfigBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListClusterSchedulerConfigsRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  NameContains?: string;
  ClusterArn?: string;
  Status?: SchedulerResourceStatus;
  SortBy?: SortClusterSchedulerConfigBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ClusterSchedulerConfigSummary {
  ClusterSchedulerConfigArn?: string;
  ClusterSchedulerConfigId?: string;
  ClusterSchedulerConfigVersion?: number;
  Name?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  Status?: SchedulerResourceStatus;
  ClusterArn?: string;
}
export type ClusterSchedulerConfigSummaryList = ClusterSchedulerConfigSummary[];
export interface ListClusterSchedulerConfigsResponse {
  ClusterSchedulerConfigSummaries?: (ClusterSchedulerConfigSummary & {
    ClusterSchedulerConfigArn: ClusterSchedulerConfigArn;
    ClusterSchedulerConfigId: ClusterSchedulerConfigId;
    Name: EntityName;
    CreationTime: Date;
    Status: SchedulerResourceStatus;
  })[];
  NextToken?: string;
}
export type CodeRepositoryNameContains = string;
export type CodeRepositorySortBy =
  | "Name"
  | "CreationTime"
  | "LastModifiedTime"
  | (string & {});
export type CodeRepositorySortOrder =
  | "Ascending"
  | "Descending"
  | (string & {});
export interface ListCodeRepositoriesInput {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: CodeRepositorySortBy;
  SortOrder?: CodeRepositorySortOrder;
}
export interface CodeRepositorySummary {
  CodeRepositoryName?: string;
  CodeRepositoryArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  GitConfig?: GitConfig;
}
export type CodeRepositorySummaryList = CodeRepositorySummary[];
export interface ListCodeRepositoriesOutput {
  CodeRepositorySummaryList: (CodeRepositorySummary & {
    CodeRepositoryName: EntityName;
    CodeRepositoryArn: CodeRepositoryArn;
    CreationTime: CreationTime;
    LastModifiedTime: LastModifiedTime;
    GitConfig: GitConfig & { RepositoryUrl: GitConfigUrl };
  })[];
  NextToken?: string;
}
export type ListCompilationJobsSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListCompilationJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: CompilationJobStatus;
  SortBy?: ListCompilationJobsSortBy;
  SortOrder?: SortOrder;
}
export interface CompilationJobSummary {
  CompilationJobName?: string;
  CompilationJobArn?: string;
  CreationTime?: Date;
  CompilationStartTime?: Date;
  CompilationEndTime?: Date;
  CompilationTargetDevice?: TargetDevice;
  CompilationTargetPlatformOs?: TargetPlatformOs;
  CompilationTargetPlatformArch?: TargetPlatformArch;
  CompilationTargetPlatformAccelerator?: TargetPlatformAccelerator;
  LastModifiedTime?: Date;
  CompilationJobStatus?: CompilationJobStatus;
}
export type CompilationJobSummaries = CompilationJobSummary[];
export interface ListCompilationJobsResponse {
  CompilationJobSummaries: (CompilationJobSummary & {
    CompilationJobName: EntityName;
    CompilationJobArn: CompilationJobArn;
    CreationTime: CreationTime;
    CompilationJobStatus: CompilationJobStatus;
  })[];
  NextToken?: string;
}
export type SortQuotaBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | "ClusterArn"
  | (string & {});
export interface ListComputeQuotasRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  NameContains?: string;
  Status?: SchedulerResourceStatus;
  ClusterArn?: string;
  SortBy?: SortQuotaBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ComputeQuotaSummary {
  ComputeQuotaArn?: string;
  ComputeQuotaId?: string;
  Name?: string;
  ComputeQuotaVersion?: number;
  Status?: SchedulerResourceStatus;
  ClusterArn?: string;
  ComputeQuotaConfig?: ComputeQuotaConfig;
  ComputeQuotaTarget?: ComputeQuotaTarget;
  ActivationState?: ActivationState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ComputeQuotaSummaryList = ComputeQuotaSummary[];
export interface ListComputeQuotasResponse {
  ComputeQuotaSummaries?: (ComputeQuotaSummary & {
    ComputeQuotaArn: ComputeQuotaArn;
    ComputeQuotaId: ComputeQuotaId;
    Name: EntityName;
    Status: SchedulerResourceStatus;
    ComputeQuotaTarget: ComputeQuotaTarget & {
      TeamName: ComputeQuotaTargetTeamName;
    };
    CreationTime: Date;
    ComputeQuotaConfig: ComputeQuotaConfig & {
      ComputeQuotaResources: (ComputeQuotaResourceConfig & {
        InstanceType: ClusterInstanceType;
        AcceleratorPartition: AcceleratorPartitionConfig & {
          Type: MIGProfileType;
          Count: number;
        };
      })[];
      ResourceSharingConfig: ResourceSharingConfig & {
        Strategy: ResourceSharingStrategy;
        AbsoluteBorrowLimits: (ComputeQuotaResourceConfig & {
          InstanceType: ClusterInstanceType;
          AcceleratorPartition: AcceleratorPartitionConfig & {
            Type: MIGProfileType;
            Count: number;
          };
        })[];
      };
    };
  })[];
  NextToken?: string;
}
export type SortContextsBy = "Name" | "CreationTime" | (string & {});
export interface ListContextsRequest {
  SourceUri?: string;
  ContextType?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortContextsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ContextSummary {
  ContextArn?: string;
  ContextName?: string;
  Source?: ContextSource;
  ContextType?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ContextSummaries = ContextSummary[];
export interface ListContextsResponse {
  ContextSummaries?: (ContextSummary & {
    Source: ContextSource & { SourceUri: SourceUri };
  })[];
  NextToken?: string;
}
export type MonitoringJobDefinitionSortKey =
  | "Name"
  | "CreationTime"
  | (string & {});
export interface ListDataQualityJobDefinitionsRequest {
  EndpointName?: string;
  SortBy?: MonitoringJobDefinitionSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface MonitoringJobDefinitionSummary {
  MonitoringJobDefinitionName?: string;
  MonitoringJobDefinitionArn?: string;
  CreationTime?: Date;
  EndpointName?: string;
}
export type MonitoringJobDefinitionSummaryList =
  MonitoringJobDefinitionSummary[];
export interface ListDataQualityJobDefinitionsResponse {
  JobDefinitionSummaries: (MonitoringJobDefinitionSummary & {
    MonitoringJobDefinitionName: MonitoringJobDefinitionName;
    MonitoringJobDefinitionArn: MonitoringJobDefinitionArn;
    CreationTime: Date;
    EndpointName: EndpointName;
  })[];
  NextToken?: string;
}
export type ListMaxResults = number;
export type ListDeviceFleetsSortBy =
  | "NAME"
  | "CREATION_TIME"
  | "LAST_MODIFIED_TIME"
  | (string & {});
export interface ListDeviceFleetsRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  SortBy?: ListDeviceFleetsSortBy;
  SortOrder?: SortOrder;
}
export interface DeviceFleetSummary {
  DeviceFleetArn?: string;
  DeviceFleetName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type DeviceFleetSummaries = DeviceFleetSummary[];
export interface ListDeviceFleetsResponse {
  DeviceFleetSummaries: (DeviceFleetSummary & {
    DeviceFleetArn: DeviceFleetArn;
    DeviceFleetName: EntityName;
  })[];
  NextToken?: string;
}
export interface ListDevicesRequest {
  NextToken?: string;
  MaxResults?: number;
  LatestHeartbeatAfter?: Date;
  ModelName?: string;
  DeviceFleetName?: string;
}
export interface EdgeModelSummary {
  ModelName?: string;
  ModelVersion?: string;
}
export type EdgeModelSummaries = EdgeModelSummary[];
export interface DeviceSummary {
  DeviceName?: string;
  DeviceArn?: string;
  Description?: string;
  DeviceFleetName?: string;
  IotThingName?: string;
  RegistrationTime?: Date;
  LatestHeartbeat?: Date;
  Models?: EdgeModelSummary[];
  AgentVersion?: string;
}
export type DeviceSummaries = DeviceSummary[];
export interface ListDevicesResponse {
  DeviceSummaries: (DeviceSummary & {
    DeviceName: EntityName;
    DeviceArn: DeviceArn;
    Models: (EdgeModelSummary & {
      ModelName: EntityName;
      ModelVersion: EdgeVersion;
    })[];
  })[];
  NextToken?: string;
}
export interface ListDomainsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DomainDetails {
  DomainArn?: string;
  DomainId?: string;
  DomainName?: string;
  Status?: DomainStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  Url?: string;
}
export type DomainList = DomainDetails[];
export interface ListDomainsResponse {
  Domains?: DomainDetails[];
  NextToken?: string;
}
export type ListEdgeDeploymentPlansSortBy =
  | "NAME"
  | "DEVICE_FLEET_NAME"
  | "CREATION_TIME"
  | "LAST_MODIFIED_TIME"
  | (string & {});
export interface ListEdgeDeploymentPlansRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  DeviceFleetNameContains?: string;
  SortBy?: ListEdgeDeploymentPlansSortBy;
  SortOrder?: SortOrder;
}
export interface EdgeDeploymentPlanSummary {
  EdgeDeploymentPlanArn?: string;
  EdgeDeploymentPlanName?: string;
  DeviceFleetName?: string;
  EdgeDeploymentSuccess?: number;
  EdgeDeploymentPending?: number;
  EdgeDeploymentFailed?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type EdgeDeploymentPlanSummaries = EdgeDeploymentPlanSummary[];
export interface ListEdgeDeploymentPlansResponse {
  EdgeDeploymentPlanSummaries: (EdgeDeploymentPlanSummary & {
    EdgeDeploymentPlanArn: EdgeDeploymentPlanArn;
    EdgeDeploymentPlanName: EntityName;
    DeviceFleetName: EntityName;
    EdgeDeploymentSuccess: number;
    EdgeDeploymentPending: number;
    EdgeDeploymentFailed: number;
  })[];
  NextToken?: string;
}
export type ListEdgePackagingJobsSortBy =
  | "NAME"
  | "MODEL_NAME"
  | "CREATION_TIME"
  | "LAST_MODIFIED_TIME"
  | "STATUS"
  | (string & {});
export interface ListEdgePackagingJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  ModelNameContains?: string;
  StatusEquals?: EdgePackagingJobStatus;
  SortBy?: ListEdgePackagingJobsSortBy;
  SortOrder?: SortOrder;
}
export interface EdgePackagingJobSummary {
  EdgePackagingJobArn?: string;
  EdgePackagingJobName?: string;
  EdgePackagingJobStatus?: EdgePackagingJobStatus;
  CompilationJobName?: string;
  ModelName?: string;
  ModelVersion?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type EdgePackagingJobSummaries = EdgePackagingJobSummary[];
export interface ListEdgePackagingJobsResponse {
  EdgePackagingJobSummaries: (EdgePackagingJobSummary & {
    EdgePackagingJobArn: EdgePackagingJobArn;
    EdgePackagingJobName: EntityName;
    EdgePackagingJobStatus: EdgePackagingJobStatus;
  })[];
  NextToken?: string;
}
export type EndpointConfigSortKey = "Name" | "CreationTime" | (string & {});
export type OrderKey = "Ascending" | "Descending" | (string & {});
export type PaginationToken = string;
export type EndpointConfigNameContains = string;
export interface ListEndpointConfigsInput {
  SortBy?: EndpointConfigSortKey;
  SortOrder?: OrderKey;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface EndpointConfigSummary {
  EndpointConfigName?: string;
  EndpointConfigArn?: string;
  CreationTime?: Date;
}
export type EndpointConfigSummaryList = EndpointConfigSummary[];
export interface ListEndpointConfigsOutput {
  EndpointConfigs: (EndpointConfigSummary & {
    EndpointConfigName: EndpointConfigName;
    EndpointConfigArn: EndpointConfigArn;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type EndpointSortKey =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export type EndpointNameContains = string;
export interface ListEndpointsInput {
  SortBy?: EndpointSortKey;
  SortOrder?: OrderKey;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  StatusEquals?: EndpointStatus;
}
export interface EndpointSummary {
  EndpointName?: string;
  EndpointArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  EndpointStatus?: EndpointStatus;
}
export type EndpointSummaryList = EndpointSummary[];
export interface ListEndpointsOutput {
  Endpoints: (EndpointSummary & {
    EndpointName: EndpointName;
    EndpointArn: EndpointArn;
    CreationTime: Date;
    LastModifiedTime: Date;
    EndpointStatus: EndpointStatus;
  })[];
  NextToken?: string;
}
export type SortExperimentsBy = "Name" | "CreationTime" | (string & {});
export interface ListExperimentsRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortExperimentsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ExperimentSummary {
  ExperimentArn?: string;
  ExperimentName?: string;
  DisplayName?: string;
  ExperimentSource?: ExperimentSource;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ExperimentSummaries = ExperimentSummary[];
export interface ListExperimentsResponse {
  ExperimentSummaries?: (ExperimentSummary & {
    ExperimentSource: ExperimentSource & { SourceArn: ExperimentSourceArn };
  })[];
  NextToken?: string;
}
export type FeatureGroupNameContains = string;
export type FeatureGroupSortOrder = "Ascending" | "Descending" | (string & {});
export type FeatureGroupSortBy =
  | "Name"
  | "FeatureGroupStatus"
  | "OfflineStoreStatus"
  | "CreationTime"
  | (string & {});
export type FeatureGroupMaxResults = number;
export interface ListFeatureGroupsRequest {
  NameContains?: string;
  FeatureGroupStatusEquals?: FeatureGroupStatus;
  OfflineStoreStatusEquals?: OfflineStoreStatusValue;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortOrder?: FeatureGroupSortOrder;
  SortBy?: FeatureGroupSortBy;
  MaxResults?: number;
  NextToken?: string;
}
export interface FeatureGroupSummary {
  FeatureGroupName?: string;
  FeatureGroupArn?: string;
  CreationTime?: Date;
  FeatureGroupStatus?: FeatureGroupStatus;
  OfflineStoreStatus?: OfflineStoreStatus;
}
export type FeatureGroupSummaries = FeatureGroupSummary[];
export interface ListFeatureGroupsResponse {
  FeatureGroupSummaries: (FeatureGroupSummary & {
    FeatureGroupName: FeatureGroupName;
    FeatureGroupArn: FeatureGroupArn;
    CreationTime: Date;
    OfflineStoreStatus: OfflineStoreStatus & {
      Status: OfflineStoreStatusValue;
    };
  })[];
  NextToken?: string;
}
export interface ListFlowDefinitionsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface FlowDefinitionSummary {
  FlowDefinitionName?: string;
  FlowDefinitionArn?: string;
  FlowDefinitionStatus?: FlowDefinitionStatus;
  CreationTime?: Date;
  FailureReason?: string;
}
export type FlowDefinitionSummaries = FlowDefinitionSummary[];
export interface ListFlowDefinitionsResponse {
  FlowDefinitionSummaries: (FlowDefinitionSummary & {
    FlowDefinitionName: FlowDefinitionName;
    FlowDefinitionArn: FlowDefinitionArn;
    FlowDefinitionStatus: FlowDefinitionStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type HubContentSortBy =
  | "HubContentName"
  | "CreationTime"
  | "HubContentStatus"
  | (string & {});
export interface ListHubContentsRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  NameContains?: string;
  MaxSchemaVersion?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  SortBy?: HubContentSortBy;
  SortOrder?: SortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export interface HubContentInfo {
  HubContentName?: string;
  HubContentArn?: string;
  SageMakerPublicHubContentArn?: string;
  HubContentVersion?: string;
  HubContentType?: HubContentType;
  DocumentSchemaVersion?: string;
  HubContentDisplayName?: string;
  HubContentDescription?: string;
  SupportStatus?: HubContentSupportStatus;
  HubContentSearchKeywords?: string[];
  HubContentStatus?: HubContentStatus;
  CreationTime?: Date;
  OriginalCreationTime?: Date;
}
export type HubContentInfoList = HubContentInfo[];
export interface ListHubContentsResponse {
  HubContentSummaries: (HubContentInfo & {
    HubContentName: HubContentName;
    HubContentArn: HubContentArn;
    HubContentVersion: HubContentVersion;
    HubContentType: HubContentType;
    DocumentSchemaVersion: DocumentSchemaVersion;
    HubContentStatus: HubContentStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export interface ListHubContentVersionsRequest {
  HubName?: string;
  HubContentType?: HubContentType;
  HubContentName?: string;
  MinVersion?: string;
  MaxSchemaVersion?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  SortBy?: HubContentSortBy;
  SortOrder?: SortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListHubContentVersionsResponse {
  HubContentSummaries: (HubContentInfo & {
    HubContentName: HubContentName;
    HubContentArn: HubContentArn;
    HubContentVersion: HubContentVersion;
    HubContentType: HubContentType;
    DocumentSchemaVersion: DocumentSchemaVersion;
    HubContentStatus: HubContentStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type HubSortBy =
  | "HubName"
  | "CreationTime"
  | "HubStatus"
  | "AccountIdOwner"
  | (string & {});
export interface ListHubsRequest {
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  SortBy?: HubSortBy;
  SortOrder?: SortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export interface HubInfo {
  HubName?: string;
  HubArn?: string;
  HubDisplayName?: string;
  HubDescription?: string;
  HubSearchKeywords?: string[];
  HubStatus?: HubStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type HubInfoList = HubInfo[];
export interface ListHubsResponse {
  HubSummaries: (HubInfo & {
    HubName: HubName;
    HubArn: HubArn;
    HubStatus: HubStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
  })[];
  NextToken?: string;
}
export interface ListHumanTaskUisRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface HumanTaskUiSummary {
  HumanTaskUiName?: string;
  HumanTaskUiArn?: string;
  CreationTime?: Date;
}
export type HumanTaskUiSummaries = HumanTaskUiSummary[];
export interface ListHumanTaskUisResponse {
  HumanTaskUiSummaries: (HumanTaskUiSummary & {
    HumanTaskUiName: HumanTaskUiName;
    HumanTaskUiArn: HumanTaskUiArn;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type HyperParameterTuningJobSortByOptions =
  | "Name"
  | "Status"
  | "CreationTime"
  | (string & {});
export interface ListHyperParameterTuningJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  SortBy?: HyperParameterTuningJobSortByOptions;
  SortOrder?: SortOrder;
  NameContains?: string;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  StatusEquals?: HyperParameterTuningJobStatus;
}
export interface HyperParameterTuningJobSummary {
  HyperParameterTuningJobName?: string;
  HyperParameterTuningJobArn?: string;
  HyperParameterTuningJobStatus?: HyperParameterTuningJobStatus;
  Strategy?: HyperParameterTuningJobStrategyType;
  CreationTime?: Date;
  HyperParameterTuningEndTime?: Date;
  LastModifiedTime?: Date;
  TrainingJobStatusCounters?: TrainingJobStatusCounters;
  ObjectiveStatusCounters?: ObjectiveStatusCounters;
  ResourceLimits?: ResourceLimits;
}
export type HyperParameterTuningJobSummaries = HyperParameterTuningJobSummary[];
export interface ListHyperParameterTuningJobsResponse {
  HyperParameterTuningJobSummaries: (HyperParameterTuningJobSummary & {
    HyperParameterTuningJobName: HyperParameterTuningJobName;
    HyperParameterTuningJobArn: HyperParameterTuningJobArn;
    HyperParameterTuningJobStatus: HyperParameterTuningJobStatus;
    Strategy: HyperParameterTuningJobStrategyType;
    CreationTime: Date;
    TrainingJobStatusCounters: TrainingJobStatusCounters;
    ObjectiveStatusCounters: ObjectiveStatusCounters;
    ResourceLimits: ResourceLimits & {
      MaxParallelTrainingJobs: MaxParallelTrainingJobs;
    };
  })[];
  NextToken?: string;
}
export type ImageNameContains = string;
export type ImageSortBy =
  | "CREATION_TIME"
  | "LAST_MODIFIED_TIME"
  | "IMAGE_NAME"
  | (string & {});
export type ImageSortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListImagesRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: ImageSortBy;
  SortOrder?: ImageSortOrder;
}
export interface Image {
  CreationTime?: Date;
  Description?: string;
  DisplayName?: string;
  FailureReason?: string;
  ImageArn?: string;
  ImageName?: string;
  ImageStatus?: ImageStatus;
  LastModifiedTime?: Date;
}
export type Images = Image[];
export interface ListImagesResponse {
  Images?: (Image & {
    CreationTime: Date;
    ImageArn: ImageArn;
    ImageName: ImageName;
    ImageStatus: ImageStatus;
    LastModifiedTime: Date;
  })[];
  NextToken?: string;
}
export type ImageVersionSortBy =
  | "CREATION_TIME"
  | "LAST_MODIFIED_TIME"
  | "VERSION"
  | (string & {});
export type ImageVersionSortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListImageVersionsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  ImageName?: string;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: ImageVersionSortBy;
  SortOrder?: ImageVersionSortOrder;
}
export interface ImageVersion {
  CreationTime?: Date;
  FailureReason?: string;
  ImageArn?: string;
  ImageVersionArn?: string;
  ImageVersionStatus?: ImageVersionStatus;
  LastModifiedTime?: Date;
  Version?: number;
}
export type ImageVersions = ImageVersion[];
export interface ListImageVersionsResponse {
  ImageVersions?: (ImageVersion & {
    CreationTime: Date;
    ImageArn: ImageArn;
    ImageVersionArn: ImageVersionArn;
    ImageVersionStatus: ImageVersionStatus;
    LastModifiedTime: Date;
    Version: ImageVersionNumber;
  })[];
  NextToken?: string;
}
export type InferenceComponentSortKey =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export type InferenceComponentNameContains = string;
export interface ListInferenceComponentsInput {
  SortBy?: InferenceComponentSortKey;
  SortOrder?: OrderKey;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  StatusEquals?: InferenceComponentStatus;
  EndpointNameEquals?: string;
  VariantNameEquals?: string;
}
export interface InferenceComponentSummary {
  CreationTime?: Date;
  InferenceComponentArn?: string;
  InferenceComponentName?: string;
  EndpointArn?: string;
  EndpointName?: string;
  VariantName?: string;
  InferenceComponentStatus?: InferenceComponentStatus;
  LastModifiedTime?: Date;
}
export type InferenceComponentSummaryList = InferenceComponentSummary[];
export interface ListInferenceComponentsOutput {
  InferenceComponents: (InferenceComponentSummary & {
    CreationTime: Date;
    InferenceComponentArn: InferenceComponentArn;
    InferenceComponentName: InferenceComponentName;
    EndpointArn: EndpointArn;
    EndpointName: EndpointName;
    VariantName: VariantName;
    LastModifiedTime: Date;
  })[];
  NextToken?: string;
}
export type SortInferenceExperimentsBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListInferenceExperimentsRequest {
  NameContains?: string;
  Type?: InferenceExperimentType;
  StatusEquals?: InferenceExperimentStatus;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  SortBy?: SortInferenceExperimentsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface InferenceExperimentSummary {
  Name?: string;
  Type?: InferenceExperimentType;
  Schedule?: InferenceExperimentSchedule;
  Status?: InferenceExperimentStatus;
  StatusReason?: string;
  Description?: string;
  CreationTime?: Date;
  CompletionTime?: Date;
  LastModifiedTime?: Date;
  RoleArn?: string;
}
export type InferenceExperimentList = InferenceExperimentSummary[];
export interface ListInferenceExperimentsResponse {
  InferenceExperiments?: (InferenceExperimentSummary & {
    Name: InferenceExperimentName;
    Type: InferenceExperimentType;
    Status: InferenceExperimentStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
  })[];
  NextToken?: string;
}
export type ListInferenceRecommendationsJobsSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListInferenceRecommendationsJobsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: RecommendationJobStatus;
  SortBy?: ListInferenceRecommendationsJobsSortBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  ModelNameEquals?: string;
  ModelPackageVersionArnEquals?: string;
}
export interface InferenceRecommendationsJob {
  JobName?: string;
  JobDescription?: string;
  JobType?: RecommendationJobType;
  JobArn?: string;
  Status?: RecommendationJobStatus;
  CreationTime?: Date;
  CompletionTime?: Date;
  RoleArn?: string;
  LastModifiedTime?: Date;
  FailureReason?: string;
  ModelName?: string;
  SamplePayloadUrl?: string;
  ModelPackageVersionArn?: string;
}
export type InferenceRecommendationsJobs = InferenceRecommendationsJob[];
export interface ListInferenceRecommendationsJobsResponse {
  InferenceRecommendationsJobs: (InferenceRecommendationsJob & {
    JobName: RecommendationJobName;
    JobDescription: RecommendationJobDescription;
    JobType: RecommendationJobType;
    JobArn: RecommendationJobArn;
    Status: RecommendationJobStatus;
    CreationTime: CreationTime;
    RoleArn: RoleArn;
    LastModifiedTime: LastModifiedTime;
  })[];
  NextToken?: string;
}
export type RecommendationStepType = "BENCHMARK" | (string & {});
export interface ListInferenceRecommendationsJobStepsRequest {
  JobName?: string;
  Status?: RecommendationJobStatus;
  StepType?: RecommendationStepType;
  MaxResults?: number;
  NextToken?: string;
}
export type RecommendationFailureReason = string;
export interface RecommendationJobInferenceBenchmark {
  Metrics?: RecommendationMetrics;
  EndpointMetrics?: InferenceMetrics;
  EndpointConfiguration?: EndpointOutputConfiguration;
  ModelConfiguration?: ModelConfiguration;
  FailureReason?: string;
  InvocationEndTime?: Date;
  InvocationStartTime?: Date;
}
export interface InferenceRecommendationsJobStep {
  StepType?: RecommendationStepType;
  JobName?: string;
  Status?: RecommendationJobStatus;
  InferenceBenchmark?: RecommendationJobInferenceBenchmark;
}
export type InferenceRecommendationsJobSteps =
  InferenceRecommendationsJobStep[];
export interface ListInferenceRecommendationsJobStepsResponse {
  Steps?: (InferenceRecommendationsJobStep & {
    StepType: RecommendationStepType;
    JobName: RecommendationJobName;
    Status: RecommendationJobStatus;
    InferenceBenchmark: RecommendationJobInferenceBenchmark & {
      ModelConfiguration: ModelConfiguration & {
        EnvironmentParameters: (EnvironmentParameter & {
          Key: string;
          ValueType: string;
          Value: string;
        })[];
      };
      EndpointMetrics: InferenceMetrics & {
        MaxInvocations: number;
        ModelLatency: number;
      };
      EndpointConfiguration: EndpointOutputConfiguration & {
        EndpointName: string;
        VariantName: string;
        ServerlessConfig: ProductionVariantServerlessConfig & {
          MemorySizeInMB: ServerlessMemorySizeInMB;
          MaxConcurrency: ServerlessMaxConcurrency;
        };
      };
    };
  })[];
  NextToken?: string;
}
export type SortBy = "Name" | "CreationTime" | "Status" | (string & {});
export interface ListJobsRequest {
  JobCategory?: JobCategory;
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
  StatusEquals?: JobStatus;
}
export interface JobSummary {
  JobArn?: string;
  JobName?: string;
  JobCategory?: JobCategory;
  JobStatus?: JobStatus;
  JobSecondaryStatus?: JobSecondaryStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  EndTime?: Date;
}
export type JobSummaries = JobSummary[];
export interface ListJobsResponse {
  NextToken?: string;
  JobSummaries: (JobSummary & {
    JobArn: JobArn;
    JobName: JobName;
    JobCategory: JobCategory;
    JobStatus: JobStatus;
    JobSecondaryStatus: JobSecondaryStatus;
    CreationTime: Date;
    LastModifiedTime: Date;
  })[];
}
export interface ListJobSchemaVersionsRequest {
  JobCategory?: JobCategory;
  NextToken?: string;
  MaxResults?: number;
}
export interface JobConfigSchemaVersionSummary {
  JobConfigSchemaVersion?: string;
}
export type JobConfigSchemas = JobConfigSchemaVersionSummary[];
export interface ListJobSchemaVersionsResponse {
  NextToken?: string;
  JobConfigSchemas: (JobConfigSchemaVersionSummary & {
    JobConfigSchemaVersion: JobSchemaVersion;
  })[];
}
export interface ListLabelingJobsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
  StatusEquals?: LabelingJobStatus;
}
export interface LabelingJobSummary {
  LabelingJobName?: string;
  LabelingJobArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LabelingJobStatus?: LabelingJobStatus;
  LabelCounters?: LabelCounters;
  WorkteamArn?: string;
  PreHumanTaskLambdaArn?: string;
  AnnotationConsolidationLambdaArn?: string;
  FailureReason?: string;
  LabelingJobOutput?: LabelingJobOutput;
  InputConfig?: LabelingJobInputConfig;
}
export type LabelingJobSummaryList = LabelingJobSummary[];
export interface ListLabelingJobsResponse {
  LabelingJobSummaryList?: (LabelingJobSummary & {
    LabelingJobName: LabelingJobName;
    LabelingJobArn: LabelingJobArn;
    CreationTime: Date;
    LastModifiedTime: Date;
    LabelingJobStatus: LabelingJobStatus;
    LabelCounters: LabelCounters;
    WorkteamArn: WorkteamArn;
    LabelingJobOutput: LabelingJobOutput & { OutputDatasetS3Uri: S3Uri };
    InputConfig: LabelingJobInputConfig & {
      DataSource: LabelingJobDataSource & {
        S3DataSource: LabelingJobS3DataSource & { ManifestS3Uri: S3Uri };
        SnsDataSource: LabelingJobSnsDataSource & { SnsTopicArn: SnsTopicArn };
      };
    };
  })[];
  NextToken?: string;
}
export type JobReferenceCodeContains = string;
export type ListLabelingJobsForWorkteamSortByOptions =
  | "CreationTime"
  | (string & {});
export interface ListLabelingJobsForWorkteamRequest {
  WorkteamArn?: string;
  MaxResults?: number;
  NextToken?: string;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  JobReferenceCodeContains?: string;
  SortBy?: ListLabelingJobsForWorkteamSortByOptions;
  SortOrder?: SortOrder;
}
export interface LabelCountersForWorkteam {
  HumanLabeled?: number;
  PendingHuman?: number;
  Total?: number;
}
export interface LabelingJobForWorkteamSummary {
  LabelingJobName?: string;
  JobReferenceCode?: string;
  WorkRequesterAccountId?: string;
  CreationTime?: Date;
  LabelCounters?: LabelCountersForWorkteam;
  NumberOfHumanWorkersPerDataObject?: number;
}
export type LabelingJobForWorkteamSummaryList = LabelingJobForWorkteamSummary[];
export interface ListLabelingJobsForWorkteamResponse {
  LabelingJobSummaryList: (LabelingJobForWorkteamSummary & {
    JobReferenceCode: JobReferenceCode;
    WorkRequesterAccountId: AccountId;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type SortLineageGroupsBy = "Name" | "CreationTime" | (string & {});
export interface ListLineageGroupsRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortLineageGroupsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface LineageGroupSummary {
  LineageGroupArn?: string;
  LineageGroupName?: string;
  DisplayName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type LineageGroupSummaries = LineageGroupSummary[];
export interface ListLineageGroupsResponse {
  LineageGroupSummaries?: LineageGroupSummary[];
  NextToken?: string;
}
export type SortMlflowAppBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListMlflowAppsRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  Status?: MlflowAppStatus;
  MlflowVersion?: string;
  DefaultForDomainId?: string;
  AccountDefaultStatus?: AccountDefaultStatus;
  SortBy?: SortMlflowAppBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface MlflowAppSummary {
  Arn?: string;
  Name?: string;
  Status?: MlflowAppStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MlflowVersion?: string;
}
export type MlflowAppSummaries = MlflowAppSummary[];
export interface ListMlflowAppsResponse {
  Summaries?: MlflowAppSummary[];
  NextToken?: string;
}
export type SortTrackingServerBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListMlflowTrackingServersRequest {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  TrackingServerStatus?: TrackingServerStatus;
  MlflowVersion?: string;
  SortBy?: SortTrackingServerBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface TrackingServerSummary {
  TrackingServerArn?: string;
  TrackingServerName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  TrackingServerStatus?: TrackingServerStatus;
  IsActive?: IsTrackingServerActive;
  MlflowVersion?: string;
}
export type TrackingServerSummaryList = TrackingServerSummary[];
export interface ListMlflowTrackingServersResponse {
  TrackingServerSummaries?: TrackingServerSummary[];
  NextToken?: string;
}
export interface ListModelBiasJobDefinitionsRequest {
  EndpointName?: string;
  SortBy?: MonitoringJobDefinitionSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface ListModelBiasJobDefinitionsResponse {
  JobDefinitionSummaries: (MonitoringJobDefinitionSummary & {
    MonitoringJobDefinitionName: MonitoringJobDefinitionName;
    MonitoringJobDefinitionArn: MonitoringJobDefinitionArn;
    CreationTime: Date;
    EndpointName: EndpointName;
  })[];
  NextToken?: string;
}
export type ModelCardExportJobSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export type ModelCardExportJobSortOrder =
  | "Ascending"
  | "Descending"
  | (string & {});
export interface ListModelCardExportJobsRequest {
  ModelCardName?: string;
  ModelCardVersion?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  ModelCardExportJobNameContains?: string;
  StatusEquals?: ModelCardExportJobStatus;
  SortBy?: ModelCardExportJobSortBy;
  SortOrder?: ModelCardExportJobSortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ModelCardExportJobSummary {
  ModelCardExportJobName?: string;
  ModelCardExportJobArn?: string;
  Status?: ModelCardExportJobStatus;
  ModelCardName?: string;
  ModelCardVersion?: number;
  CreatedAt?: Date;
  LastModifiedAt?: Date;
}
export type ModelCardExportJobSummaryList = ModelCardExportJobSummary[];
export interface ListModelCardExportJobsResponse {
  ModelCardExportJobSummaries: (ModelCardExportJobSummary & {
    ModelCardExportJobName: EntityName;
    ModelCardExportJobArn: ModelCardExportJobArn;
    Status: ModelCardExportJobStatus;
    ModelCardName: EntityName;
    ModelCardVersion: number;
    CreatedAt: Date;
    LastModifiedAt: Date;
  })[];
  NextToken?: string;
}
export type ModelCardSortBy = "Name" | "CreationTime" | (string & {});
export type ModelCardSortOrder = "Ascending" | "Descending" | (string & {});
export interface ListModelCardsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  ModelCardStatus?: ModelCardStatus;
  NextToken?: string;
  SortBy?: ModelCardSortBy;
  SortOrder?: ModelCardSortOrder;
}
export interface ModelCardSummary {
  ModelCardName?: string;
  ModelCardArn?: string;
  ModelCardStatus?: ModelCardStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ModelCardSummaryList = ModelCardSummary[];
export interface ListModelCardsResponse {
  ModelCardSummaries: (ModelCardSummary & {
    ModelCardName: EntityName;
    ModelCardArn: ModelCardArn;
    ModelCardStatus: ModelCardStatus;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type ModelCardVersionSortBy = "Version" | (string & {});
export interface ListModelCardVersionsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  ModelCardName?: string;
  ModelCardStatus?: ModelCardStatus;
  NextToken?: string;
  SortBy?: ModelCardVersionSortBy;
  SortOrder?: ModelCardSortOrder;
}
export interface ModelCardVersionSummary {
  ModelCardName?: string;
  ModelCardArn?: string;
  ModelCardStatus?: ModelCardStatus;
  ModelCardVersion?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ModelCardVersionSummaryList = ModelCardVersionSummary[];
export interface ListModelCardVersionsResponse {
  ModelCardVersionSummaryList: (ModelCardVersionSummary & {
    ModelCardName: EntityName;
    ModelCardArn: ModelCardArn;
    ModelCardStatus: ModelCardStatus;
    ModelCardVersion: number;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export interface ListModelExplainabilityJobDefinitionsRequest {
  EndpointName?: string;
  SortBy?: MonitoringJobDefinitionSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface ListModelExplainabilityJobDefinitionsResponse {
  JobDefinitionSummaries: (MonitoringJobDefinitionSummary & {
    MonitoringJobDefinitionName: MonitoringJobDefinitionName;
    MonitoringJobDefinitionArn: MonitoringJobDefinitionArn;
    CreationTime: Date;
    EndpointName: EndpointName;
  })[];
  NextToken?: string;
}
export type ModelMetadataFilterType =
  | "Domain"
  | "Framework"
  | "Task"
  | "FrameworkVersion"
  | (string & {});
export interface ModelMetadataFilter {
  Name?: ModelMetadataFilterType;
  Value?: string;
}
export type ModelMetadataFilters = ModelMetadataFilter[];
export interface ModelMetadataSearchExpression {
  Filters?: ModelMetadataFilter[];
}
export interface ListModelMetadataRequest {
  SearchExpression?: ModelMetadataSearchExpression;
  NextToken?: string;
  MaxResults?: number;
}
export interface ModelMetadataSummary {
  Domain?: string;
  Framework?: string;
  Task?: string;
  Model?: string;
  FrameworkVersion?: string;
}
export type ModelMetadataSummaries = ModelMetadataSummary[];
export interface ListModelMetadataResponse {
  ModelMetadataSummaries: (ModelMetadataSummary & {
    Domain: string;
    Framework: string;
    Task: string;
    Model: string;
    FrameworkVersion: string;
  })[];
  NextToken?: string;
}
export type ModelPackageGroupSortBy = "Name" | "CreationTime" | (string & {});
export type CrossAccountFilterOption =
  | "SameAccount"
  | "CrossAccount"
  | (string & {});
export interface ListModelPackageGroupsInput {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: ModelPackageGroupSortBy;
  SortOrder?: SortOrder;
  CrossAccountFilterOption?: CrossAccountFilterOption;
}
export interface ModelPackageGroupSummary {
  ModelPackageGroupName?: string;
  ModelPackageGroupArn?: string;
  ModelPackageGroupDescription?: string;
  CreationTime?: Date;
  ModelPackageGroupStatus?: ModelPackageGroupStatus;
  ManagedConfiguration?: ManagedConfiguration;
}
export type ModelPackageGroupSummaryList = ModelPackageGroupSummary[];
export interface ListModelPackageGroupsOutput {
  ModelPackageGroupSummaryList: (ModelPackageGroupSummary & {
    ModelPackageGroupName: EntityName;
    ModelPackageGroupArn: ModelPackageGroupArn;
    CreationTime: CreationTime;
    ModelPackageGroupStatus: ModelPackageGroupStatus;
  })[];
  NextToken?: string;
}
export type ModelPackageType =
  | "Versioned"
  | "Unversioned"
  | "Both"
  | (string & {});
export type ModelPackageSortBy = "Name" | "CreationTime" | (string & {});
export interface ListModelPackagesInput {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  ModelApprovalStatus?: ModelApprovalStatus;
  ModelPackageGroupName?: string;
  ModelPackageType?: ModelPackageType;
  NextToken?: string;
  SortBy?: ModelPackageSortBy;
  SortOrder?: SortOrder;
}
export interface ModelPackageSummary {
  ModelPackageName?: string;
  ModelPackageGroupName?: string;
  ModelPackageVersion?: number;
  ModelPackageArn?: string;
  ModelPackageDescription?: string;
  CreationTime?: Date;
  ModelPackageStatus?: ModelPackageStatus;
  ModelApprovalStatus?: ModelApprovalStatus;
  ModelLifeCycle?: ModelLifeCycle;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
}
export type ModelPackageSummaryList = ModelPackageSummary[];
export interface ListModelPackagesOutput {
  ModelPackageSummaryList: (ModelPackageSummary & {
    ModelPackageArn: ModelPackageArn;
    CreationTime: CreationTime;
    ModelPackageStatus: ModelPackageStatus;
    ModelLifeCycle: ModelLifeCycle & {
      Stage: EntityName;
      StageStatus: EntityName;
    };
  })[];
  NextToken?: string;
}
export interface ListModelQualityJobDefinitionsRequest {
  EndpointName?: string;
  SortBy?: MonitoringJobDefinitionSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface ListModelQualityJobDefinitionsResponse {
  JobDefinitionSummaries: (MonitoringJobDefinitionSummary & {
    MonitoringJobDefinitionName: MonitoringJobDefinitionName;
    MonitoringJobDefinitionArn: MonitoringJobDefinitionArn;
    CreationTime: Date;
    EndpointName: EndpointName;
  })[];
  NextToken?: string;
}
export type ModelSortKey = "Name" | "CreationTime" | (string & {});
export type ModelNameContains = string;
export interface ListModelsInput {
  SortBy?: ModelSortKey;
  SortOrder?: OrderKey;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export interface ModelSummary {
  ModelName?: string;
  ModelArn?: string;
  CreationTime?: Date;
}
export type ModelSummaryList = ModelSummary[];
export interface ListModelsOutput {
  Models: (ModelSummary & {
    ModelName: ModelName;
    ModelArn: ModelArn;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type MonitoringAlertName = string;
export type MonitoringAlertHistorySortKey =
  | "CreationTime"
  | "Status"
  | (string & {});
export type MonitoringAlertStatus = "InAlert" | "OK" | (string & {});
export interface ListMonitoringAlertHistoryRequest {
  MonitoringScheduleName?: string;
  MonitoringAlertName?: string;
  SortBy?: MonitoringAlertHistorySortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  StatusEquals?: MonitoringAlertStatus;
}
export interface MonitoringAlertHistorySummary {
  MonitoringScheduleName?: string;
  MonitoringAlertName?: string;
  CreationTime?: Date;
  AlertStatus?: MonitoringAlertStatus;
}
export type MonitoringAlertHistoryList = MonitoringAlertHistorySummary[];
export interface ListMonitoringAlertHistoryResponse {
  MonitoringAlertHistory?: (MonitoringAlertHistorySummary & {
    MonitoringScheduleName: MonitoringScheduleName;
    MonitoringAlertName: MonitoringAlertName;
    CreationTime: Date;
    AlertStatus: MonitoringAlertStatus;
  })[];
  NextToken?: string;
}
export interface ListMonitoringAlertsRequest {
  MonitoringScheduleName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type MonitoringDatapointsToAlert = number;
export type MonitoringEvaluationPeriod = number;
export interface ModelDashboardIndicatorAction {
  Enabled?: boolean;
}
export interface MonitoringAlertActions {
  ModelDashboardIndicator?: ModelDashboardIndicatorAction;
}
export interface MonitoringAlertSummary {
  MonitoringAlertName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  AlertStatus?: MonitoringAlertStatus;
  DatapointsToAlert?: number;
  EvaluationPeriod?: number;
  Actions?: MonitoringAlertActions;
}
export type MonitoringAlertSummaryList = MonitoringAlertSummary[];
export interface ListMonitoringAlertsResponse {
  MonitoringAlertSummaries?: (MonitoringAlertSummary & {
    MonitoringAlertName: MonitoringAlertName;
    CreationTime: Date;
    LastModifiedTime: Date;
    AlertStatus: MonitoringAlertStatus;
    DatapointsToAlert: MonitoringDatapointsToAlert;
    EvaluationPeriod: MonitoringEvaluationPeriod;
    Actions: MonitoringAlertActions;
  })[];
  NextToken?: string;
}
export type MonitoringExecutionSortKey =
  | "CreationTime"
  | "ScheduledTime"
  | "Status"
  | (string & {});
export interface ListMonitoringExecutionsRequest {
  MonitoringScheduleName?: string;
  EndpointName?: string;
  SortBy?: MonitoringExecutionSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  ScheduledTimeBefore?: Date;
  ScheduledTimeAfter?: Date;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  StatusEquals?: ExecutionStatus;
  MonitoringJobDefinitionName?: string;
  MonitoringTypeEquals?: MonitoringType;
}
export type MonitoringExecutionSummaryList = MonitoringExecutionSummary[];
export interface ListMonitoringExecutionsResponse {
  MonitoringExecutionSummaries: (MonitoringExecutionSummary & {
    MonitoringScheduleName: MonitoringScheduleName;
    ScheduledTime: Date;
    CreationTime: Date;
    LastModifiedTime: Date;
    MonitoringExecutionStatus: ExecutionStatus;
  })[];
  NextToken?: string;
}
export type MonitoringScheduleSortKey =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListMonitoringSchedulesRequest {
  EndpointName?: string;
  SortBy?: MonitoringScheduleSortKey;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  StatusEquals?: ScheduleStatus;
  MonitoringJobDefinitionName?: string;
  MonitoringTypeEquals?: MonitoringType;
}
export interface MonitoringScheduleSummary {
  MonitoringScheduleName?: string;
  MonitoringScheduleArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MonitoringScheduleStatus?: ScheduleStatus;
  EndpointName?: string;
  MonitoringJobDefinitionName?: string;
  MonitoringType?: MonitoringType;
}
export type MonitoringScheduleSummaryList = MonitoringScheduleSummary[];
export interface ListMonitoringSchedulesResponse {
  MonitoringScheduleSummaries: (MonitoringScheduleSummary & {
    MonitoringScheduleName: MonitoringScheduleName;
    MonitoringScheduleArn: MonitoringScheduleArn;
    CreationTime: Date;
    LastModifiedTime: Date;
    MonitoringScheduleStatus: ScheduleStatus;
  })[];
  NextToken?: string;
}
export type NotebookInstanceLifecycleConfigSortKey =
  | "Name"
  | "CreationTime"
  | "LastModifiedTime"
  | (string & {});
export type NotebookInstanceLifecycleConfigSortOrder =
  | "Ascending"
  | "Descending"
  | (string & {});
export type NotebookInstanceLifecycleConfigNameContains = string;
export interface ListNotebookInstanceLifecycleConfigsInput {
  NextToken?: string;
  MaxResults?: number;
  SortBy?: NotebookInstanceLifecycleConfigSortKey;
  SortOrder?: NotebookInstanceLifecycleConfigSortOrder;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
}
export interface NotebookInstanceLifecycleConfigSummary {
  NotebookInstanceLifecycleConfigName?: string;
  NotebookInstanceLifecycleConfigArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type NotebookInstanceLifecycleConfigSummaryList =
  NotebookInstanceLifecycleConfigSummary[];
export interface ListNotebookInstanceLifecycleConfigsOutput {
  NextToken?: string;
  NotebookInstanceLifecycleConfigs?: (NotebookInstanceLifecycleConfigSummary & {
    NotebookInstanceLifecycleConfigName: NotebookInstanceLifecycleConfigName;
    NotebookInstanceLifecycleConfigArn: NotebookInstanceLifecycleConfigArn;
  })[];
}
export type NotebookInstanceSortKey =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export type NotebookInstanceSortOrder =
  | "Ascending"
  | "Descending"
  | (string & {});
export type NotebookInstanceNameContains = string;
export type CodeRepositoryContains = string;
export interface ListNotebookInstancesInput {
  NextToken?: string;
  MaxResults?: number;
  SortBy?: NotebookInstanceSortKey;
  SortOrder?: NotebookInstanceSortOrder;
  NameContains?: string;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  StatusEquals?: NotebookInstanceStatus;
  NotebookInstanceLifecycleConfigNameContains?: string;
  DefaultCodeRepositoryContains?: string;
  AdditionalCodeRepositoryEquals?: string;
}
export interface NotebookInstanceSummary {
  NotebookInstanceName?: string;
  NotebookInstanceArn?: string;
  NotebookInstanceStatus?: NotebookInstanceStatus;
  Url?: string;
  InstanceType?: InstanceType;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  NotebookInstanceLifecycleConfigName?: string;
  DefaultCodeRepository?: string;
  AdditionalCodeRepositories?: string[];
}
export type NotebookInstanceSummaryList = NotebookInstanceSummary[];
export interface ListNotebookInstancesOutput {
  NextToken?: string;
  NotebookInstances?: (NotebookInstanceSummary & {
    NotebookInstanceName: NotebookInstanceName;
    NotebookInstanceArn: NotebookInstanceArn;
  })[];
}
export type ListOptimizationJobsSortBy =
  | "Name"
  | "CreationTime"
  | "Status"
  | (string & {});
export interface ListOptimizationJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  OptimizationContains?: string;
  NameContains?: string;
  StatusEquals?: OptimizationJobStatus;
  SortBy?: ListOptimizationJobsSortBy;
  SortOrder?: SortOrder;
}
export type OptimizationType = string;
export type OptimizationTypes = string[];
export interface OptimizationJobSummary {
  OptimizationJobName?: string;
  OptimizationJobArn?: string;
  CreationTime?: Date;
  OptimizationJobStatus?: OptimizationJobStatus;
  OptimizationStartTime?: Date;
  OptimizationEndTime?: Date;
  LastModifiedTime?: Date;
  DeploymentInstanceType?: OptimizationJobDeploymentInstanceType;
  MaxInstanceCount?: number;
  OptimizationTypes?: string[];
}
export type OptimizationJobSummaries = OptimizationJobSummary[];
export interface ListOptimizationJobsResponse {
  OptimizationJobSummaries: (OptimizationJobSummary & {
    OptimizationJobName: EntityName;
    OptimizationJobArn: OptimizationJobArn;
    CreationTime: CreationTime;
    OptimizationJobStatus: OptimizationJobStatus;
    DeploymentInstanceType: OptimizationJobDeploymentInstanceType;
    OptimizationTypes: OptimizationTypes;
  })[];
  NextToken?: string;
}
export interface ListPartnerAppsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface PartnerAppSummary {
  Arn?: string;
  Name?: string;
  Type?: PartnerAppType;
  Status?: PartnerAppStatus;
  CreationTime?: Date;
}
export type PartnerAppSummaries = PartnerAppSummary[];
export interface ListPartnerAppsResponse {
  Summaries?: PartnerAppSummary[];
  NextToken?: string;
}
export type SortPipelineExecutionsBy =
  | "CreationTime"
  | "PipelineExecutionArn"
  | (string & {});
export interface ListPipelineExecutionsRequest {
  PipelineName?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortPipelineExecutionsBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export type String3072 = string;
export interface PipelineExecutionSummary {
  PipelineExecutionArn?: string;
  StartTime?: Date;
  PipelineExecutionStatus?: PipelineExecutionStatus;
  PipelineExecutionDescription?: string;
  PipelineExecutionDisplayName?: string;
  PipelineExecutionFailureReason?: string;
}
export type PipelineExecutionSummaryList = PipelineExecutionSummary[];
export interface ListPipelineExecutionsResponse {
  PipelineExecutionSummaries?: PipelineExecutionSummary[];
  NextToken?: string;
}
export interface ListPipelineExecutionStepsRequest {
  PipelineExecutionArn?: string;
  NextToken?: string;
  MaxResults?: number;
  SortOrder?: SortOrder;
}
export type StepName = string;
export type StepDisplayName = string;
export type StepDescription = string;
export type StepStatus =
  | "Starting"
  | "Executing"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "Succeeded"
  | (string & {});
export interface CacheHitResult {
  SourcePipelineExecutionArn?: string;
}
export interface TrainingJobStepMetadata {
  Arn?: string;
}
export interface ProcessingJobStepMetadata {
  Arn?: string;
}
export interface TransformJobStepMetadata {
  Arn?: string;
}
export interface TuningJobStepMetaData {
  Arn?: string;
}
export interface ModelStepMetadata {
  Arn?: string;
}
export interface RegisterModelStepMetadata {
  Arn?: string;
}
export type ConditionOutcome = "True" | "False" | (string & {});
export interface ConditionStepMetadata {
  Outcome?: ConditionOutcome;
}
export type CallbackToken = string;
export interface OutputParameter {
  Name?: string;
  Value?: string;
}
export type OutputParameterList = OutputParameter[];
export interface CallbackStepMetadata {
  CallbackToken?: string;
  SqsQueueUrl?: string;
  OutputParameters?: OutputParameter[];
}
export interface LambdaStepMetadata {
  Arn?: string;
  OutputParameters?: OutputParameter[];
}
export interface EMRStepMetadata {
  ClusterId?: string;
  StepId?: string;
  StepName?: string;
  LogFilePath?: string;
}
export interface QualityCheckStepMetadata {
  CheckType?: string;
  BaselineUsedForDriftCheckStatistics?: string;
  BaselineUsedForDriftCheckConstraints?: string;
  CalculatedBaselineStatistics?: string;
  CalculatedBaselineConstraints?: string;
  ModelPackageGroupName?: string;
  ViolationReport?: string;
  CheckJobArn?: string;
  SkipCheck?: boolean;
  RegisterNewBaseline?: boolean;
}
export interface ClarifyCheckStepMetadata {
  CheckType?: string;
  BaselineUsedForDriftCheckConstraints?: string;
  CalculatedBaselineConstraints?: string;
  ModelPackageGroupName?: string;
  ViolationReport?: string;
  CheckJobArn?: string;
  SkipCheck?: boolean;
  RegisterNewBaseline?: boolean;
}
export interface FailStepMetadata {
  ErrorMessage?: string;
}
export interface AutoMLJobStepMetadata {
  Arn?: string;
}
export interface EndpointStepMetadata {
  Arn?: string;
}
export interface EndpointConfigStepMetadata {
  Arn?: string;
}
export interface BedrockCustomModelMetadata {
  Arn?: string;
}
export interface BedrockCustomModelDeploymentMetadata {
  Arn?: string;
}
export interface BedrockProvisionedModelThroughputMetadata {
  Arn?: string;
}
export interface BedrockModelImportMetadata {
  Arn?: string;
}
export interface InferenceComponentMetadata {
  Arn?: string;
}
export type MapString2048 = { [key: string]: string | undefined };
export interface AssociationInfo {
  SourceArn?: string;
  DestinationArn?: string;
}
export type AssociationInfoList = AssociationInfo[];
export interface LineageMetadata {
  ActionArns?: { [key: string]: string | undefined };
  ArtifactArns?: { [key: string]: string | undefined };
  ContextArns?: { [key: string]: string | undefined };
  Associations?: AssociationInfo[];
}
export interface JobStepMetadata {
  Arn?: string;
}
export interface PipelineExecutionStepMetadata {
  TrainingJob?: TrainingJobStepMetadata;
  ProcessingJob?: ProcessingJobStepMetadata;
  TransformJob?: TransformJobStepMetadata;
  TuningJob?: TuningJobStepMetaData;
  Model?: ModelStepMetadata;
  RegisterModel?: RegisterModelStepMetadata;
  Condition?: ConditionStepMetadata;
  Callback?: CallbackStepMetadata;
  Lambda?: LambdaStepMetadata;
  EMR?: EMRStepMetadata;
  QualityCheck?: QualityCheckStepMetadata;
  ClarifyCheck?: ClarifyCheckStepMetadata;
  Fail?: FailStepMetadata;
  AutoMLJob?: AutoMLJobStepMetadata;
  Endpoint?: EndpointStepMetadata;
  EndpointConfig?: EndpointConfigStepMetadata;
  BedrockCustomModel?: BedrockCustomModelMetadata;
  BedrockCustomModelDeployment?: BedrockCustomModelDeploymentMetadata;
  BedrockProvisionedModelThroughput?: BedrockProvisionedModelThroughputMetadata;
  BedrockModelImport?: BedrockModelImportMetadata;
  InferenceComponent?: InferenceComponentMetadata;
  Lineage?: LineageMetadata;
  Job?: JobStepMetadata;
}
export interface SelectiveExecutionResult {
  SourcePipelineExecutionArn?: string;
}
export interface PipelineExecutionStep {
  StepName?: string;
  StepDisplayName?: string;
  StepDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  StepStatus?: StepStatus;
  CacheHitResult?: CacheHitResult;
  FailureReason?: string;
  Metadata?: PipelineExecutionStepMetadata;
  AttemptCount?: number;
  SelectiveExecutionResult?: SelectiveExecutionResult;
}
export type PipelineExecutionStepList = PipelineExecutionStep[];
export interface ListPipelineExecutionStepsResponse {
  PipelineExecutionSteps?: (PipelineExecutionStep & {
    Metadata: PipelineExecutionStepMetadata & {
      Callback: CallbackStepMetadata & {
        OutputParameters: (OutputParameter & {
          Name: String256;
          Value: String1024;
        })[];
      };
      Lambda: LambdaStepMetadata & {
        OutputParameters: (OutputParameter & {
          Name: String256;
          Value: String1024;
        })[];
      };
      Lineage: LineageMetadata & {
        Associations: (AssociationInfo & {
          SourceArn: String2048;
          DestinationArn: String2048;
        })[];
      };
    };
  })[];
  NextToken?: string;
}
export interface ListPipelineParametersForExecutionRequest {
  PipelineExecutionArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type PipelineParameterName = string;
export interface Parameter {
  Name?: string;
  Value?: string;
}
export type ParameterList = Parameter[];
export interface ListPipelineParametersForExecutionResponse {
  PipelineParameters?: (Parameter & {
    Name: PipelineParameterName;
    Value: String1024;
  })[];
  NextToken?: string;
}
export type SortPipelinesBy = "Name" | "CreationTime" | (string & {});
export interface ListPipelinesRequest {
  PipelineNamePrefix?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortPipelinesBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface PipelineSummary {
  PipelineArn?: string;
  PipelineName?: string;
  PipelineDisplayName?: string;
  PipelineDescription?: string;
  RoleArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastExecutionTime?: Date;
}
export type PipelineSummaryList = PipelineSummary[];
export interface ListPipelinesResponse {
  PipelineSummaries?: PipelineSummary[];
  NextToken?: string;
}
export interface ListPipelineVersionsRequest {
  PipelineName?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface PipelineVersionSummary {
  PipelineArn?: string;
  PipelineVersionId?: number;
  CreationTime?: Date;
  PipelineVersionDescription?: string;
  PipelineVersionDisplayName?: string;
  LastExecutionPipelineExecutionArn?: string;
}
export type PipelineVersionSummaryList = PipelineVersionSummary[];
export interface ListPipelineVersionsResponse {
  PipelineVersionSummaries?: PipelineVersionSummary[];
  NextToken?: string;
}
export interface ListProcessingJobsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: ProcessingJobStatus;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface ProcessingJobSummary {
  ProcessingJobName?: string;
  ProcessingJobArn?: string;
  CreationTime?: Date;
  ProcessingEndTime?: Date;
  LastModifiedTime?: Date;
  ProcessingJobStatus?: ProcessingJobStatus;
  FailureReason?: string;
  ExitMessage?: string;
}
export type ProcessingJobSummaries = ProcessingJobSummary[];
export interface ListProcessingJobsResponse {
  ProcessingJobSummaries: (ProcessingJobSummary & {
    ProcessingJobName: ProcessingJobName;
    ProcessingJobArn: ProcessingJobArn;
    CreationTime: Date;
    ProcessingJobStatus: ProcessingJobStatus;
  })[];
  NextToken?: string;
}
export type ProjectSortBy = "Name" | "CreationTime" | (string & {});
export type ProjectSortOrder = "Ascending" | "Descending" | (string & {});
export interface ListProjectsInput {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  MaxResults?: number;
  NameContains?: string;
  NextToken?: string;
  SortBy?: ProjectSortBy;
  SortOrder?: ProjectSortOrder;
}
export interface ProjectSummary {
  ProjectName?: string;
  ProjectDescription?: string;
  ProjectArn?: string;
  ProjectId?: string;
  CreationTime?: Date;
  ProjectStatus?: ProjectStatus;
}
export type ProjectSummaryList = ProjectSummary[];
export interface ListProjectsOutput {
  ProjectSummaryList: (ProjectSummary & {
    ProjectName: ProjectEntityName;
    ProjectArn: ProjectArn;
    ProjectId: ProjectId;
    CreationTime: Date;
    ProjectStatus: ProjectStatus;
  })[];
  NextToken?: string;
}
export type ResourceCatalogName = string;
export type ResourceCatalogSortOrder =
  | "Ascending"
  | "Descending"
  | (string & {});
export type ResourceCatalogSortBy = "CreationTime" | (string & {});
export interface ListResourceCatalogsRequest {
  NameContains?: string;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  SortOrder?: ResourceCatalogSortOrder;
  SortBy?: ResourceCatalogSortBy;
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceCatalogArn = string;
export type ResourceCatalogDescription = string;
export interface ResourceCatalog {
  ResourceCatalogArn?: string;
  ResourceCatalogName?: string;
  Description?: string;
  CreationTime?: Date;
}
export type ResourceCatalogList = ResourceCatalog[];
export interface ListResourceCatalogsResponse {
  ResourceCatalogs?: (ResourceCatalog & {
    ResourceCatalogArn: ResourceCatalogArn;
    ResourceCatalogName: ResourceCatalogName;
    Description: ResourceCatalogDescription;
    CreationTime: Date;
  })[];
  NextToken?: string;
}
export type SpaceSortKey = "CreationTime" | "LastModifiedTime" | (string & {});
export interface ListSpacesRequest {
  NextToken?: string;
  MaxResults?: number;
  SortOrder?: SortOrder;
  SortBy?: SpaceSortKey;
  DomainIdEquals?: string;
  SpaceNameContains?: string;
}
export interface SpaceSettingsSummary {
  AppType?: AppType;
  RemoteAccess?: FeatureStatus;
  SpaceStorageSettings?: SpaceStorageSettings;
}
export interface SpaceSharingSettingsSummary {
  SharingType?: SharingType;
}
export interface OwnershipSettingsSummary {
  OwnerUserProfileName?: string;
}
export interface SpaceDetails {
  DomainId?: string;
  SpaceName?: string;
  Status?: SpaceStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  SpaceSettingsSummary?: SpaceSettingsSummary;
  SpaceSharingSettingsSummary?: SpaceSharingSettingsSummary;
  OwnershipSettingsSummary?: OwnershipSettingsSummary;
  SpaceDisplayName?: string;
}
export type SpaceList = SpaceDetails[];
export interface ListSpacesResponse {
  Spaces?: (SpaceDetails & {
    SpaceSettingsSummary: SpaceSettingsSummary & {
      SpaceStorageSettings: SpaceStorageSettings & {
        EbsStorageSettings: EbsStorageSettings & {
          EbsVolumeSizeInGb: SpaceEbsVolumeSizeInGb;
        };
      };
    };
  })[];
  NextToken?: string;
}
export interface ListStageDevicesRequest {
  NextToken?: string;
  MaxResults?: number;
  EdgeDeploymentPlanName?: string;
  ExcludeDevicesDeployedInOtherStage?: boolean;
  StageName?: string;
}
export type DeviceDeploymentStatus =
  | "READYTODEPLOY"
  | "INPROGRESS"
  | "DEPLOYED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface DeviceDeploymentSummary {
  EdgeDeploymentPlanArn?: string;
  EdgeDeploymentPlanName?: string;
  StageName?: string;
  DeployedStageName?: string;
  DeviceFleetName?: string;
  DeviceName?: string;
  DeviceArn?: string;
  DeviceDeploymentStatus?: DeviceDeploymentStatus;
  DeviceDeploymentStatusMessage?: string;
  Description?: string;
  DeploymentStartTime?: Date;
}
export type DeviceDeploymentSummaries = DeviceDeploymentSummary[];
export interface ListStageDevicesResponse {
  DeviceDeploymentSummaries: (DeviceDeploymentSummary & {
    EdgeDeploymentPlanArn: EdgeDeploymentPlanArn;
    EdgeDeploymentPlanName: EntityName;
    StageName: EntityName;
    DeviceName: DeviceName;
    DeviceArn: DeviceArn;
  })[];
  NextToken?: string;
}
export type StudioLifecycleConfigSortKey =
  | "CreationTime"
  | "LastModifiedTime"
  | "Name"
  | (string & {});
export interface ListStudioLifecycleConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  NameContains?: string;
  AppTypeEquals?: StudioLifecycleConfigAppType;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
  ModifiedTimeBefore?: Date;
  ModifiedTimeAfter?: Date;
  SortBy?: StudioLifecycleConfigSortKey;
  SortOrder?: SortOrder;
}
export interface StudioLifecycleConfigDetails {
  StudioLifecycleConfigArn?: string;
  StudioLifecycleConfigName?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  StudioLifecycleConfigAppType?: StudioLifecycleConfigAppType;
}
export type StudioLifecycleConfigsList = StudioLifecycleConfigDetails[];
export interface ListStudioLifecycleConfigsResponse {
  NextToken?: string;
  StudioLifecycleConfigs?: StudioLifecycleConfigDetails[];
}
export interface ListSubscribedWorkteamsRequest {
  NameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SubscribedWorkteams = SubscribedWorkteam[];
export interface ListSubscribedWorkteamsResponse {
  SubscribedWorkteams: (SubscribedWorkteam & { WorkteamArn: WorkteamArn })[];
  NextToken?: string;
}
export type ListTagsMaxResults = number;
export interface ListTagsInput {
  ResourceArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTagsOutput {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  NextToken?: string;
}
export interface ListTrainingJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: TrainingJobStatus;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
  WarmPoolStatusEquals?: WarmPoolResourceStatus;
  TrainingPlanArnEquals?: string;
}
export interface TrainingJobSummary {
  TrainingJobName?: string;
  TrainingJobArn?: string;
  CreationTime?: Date;
  TrainingEndTime?: Date;
  LastModifiedTime?: Date;
  TrainingJobStatus?: TrainingJobStatus;
  SecondaryStatus?: SecondaryStatus;
  WarmPoolStatus?: WarmPoolStatus;
  TrainingPlanArn?: string;
}
export type TrainingJobSummaries = TrainingJobSummary[];
export interface ListTrainingJobsResponse {
  TrainingJobSummaries: (TrainingJobSummary & {
    TrainingJobName: TrainingJobName;
    TrainingJobArn: TrainingJobArn;
    CreationTime: Date;
    TrainingJobStatus: TrainingJobStatus;
    WarmPoolStatus: WarmPoolStatus & { Status: WarmPoolResourceStatus };
  })[];
  NextToken?: string;
}
export type TrainingJobSortByOptions =
  | "Name"
  | "CreationTime"
  | "Status"
  | "FinalObjectiveMetricValue"
  | (string & {});
export interface ListTrainingJobsForHyperParameterTuningJobRequest {
  HyperParameterTuningJobName?: string;
  NextToken?: string;
  MaxResults?: number;
  StatusEquals?: TrainingJobStatus;
  SortBy?: TrainingJobSortByOptions;
  SortOrder?: SortOrder;
}
export type HyperParameterTrainingJobSummaries =
  HyperParameterTrainingJobSummary[];
export interface ListTrainingJobsForHyperParameterTuningJobResponse {
  TrainingJobSummaries: (HyperParameterTrainingJobSummary & {
    TrainingJobName: TrainingJobName;
    TrainingJobArn: TrainingJobArn;
    CreationTime: Date;
    TrainingJobStatus: TrainingJobStatus;
    TunedHyperParameters: HyperParameters;
    FinalHyperParameterTuningJobObjectiveMetric: FinalHyperParameterTuningJobObjectiveMetric & {
      MetricName: MetricName;
      Value: MetricValue;
    };
  })[];
  NextToken?: string;
}
export type TrainingPlanSortBy =
  | "TrainingPlanName"
  | "StartTime"
  | "Status"
  | (string & {});
export type TrainingPlanSortOrder = "Ascending" | "Descending" | (string & {});
export type TrainingPlanFilterName = "Status" | (string & {});
export interface TrainingPlanFilter {
  Name?: TrainingPlanFilterName;
  Value?: string;
}
export type TrainingPlanFilters = TrainingPlanFilter[];
export interface ListTrainingPlansRequest {
  NextToken?: string;
  MaxResults?: number;
  StartTimeAfter?: Date;
  StartTimeBefore?: Date;
  SortBy?: TrainingPlanSortBy;
  SortOrder?: TrainingPlanSortOrder;
  Filters?: TrainingPlanFilter[];
}
export interface TrainingPlanSummary {
  TrainingPlanArn?: string;
  TrainingPlanName?: string;
  Status?: TrainingPlanStatus;
  StatusMessage?: string;
  DurationHours?: number;
  DurationMinutes?: number;
  StartTime?: Date;
  EndTime?: Date;
  UpfrontFee?: string;
  CurrencyCode?: string;
  TotalInstanceCount?: number;
  AvailableInstanceCount?: number;
  InUseInstanceCount?: number;
  TotalUltraServerCount?: number;
  TargetResources?: SageMakerResourceName[];
  ReservedCapacitySummaries?: ReservedCapacitySummary[];
}
export type TrainingPlanSummaries = TrainingPlanSummary[];
export interface ListTrainingPlansResponse {
  NextToken?: string;
  TrainingPlanSummaries: (TrainingPlanSummary & {
    TrainingPlanArn: TrainingPlanArn;
    TrainingPlanName: TrainingPlanName;
    Status: TrainingPlanStatus;
    ReservedCapacitySummaries: (ReservedCapacitySummary & {
      ReservedCapacityArn: ReservedCapacityArn;
      InstanceType: ReservedCapacityInstanceType;
      TotalInstanceCount: TotalInstanceCount;
      Status: ReservedCapacityStatus;
    })[];
  })[];
}
export interface ListTransformJobsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  LastModifiedTimeAfter?: Date;
  LastModifiedTimeBefore?: Date;
  NameContains?: string;
  StatusEquals?: TransformJobStatus;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export interface TransformJobSummary {
  TransformJobName?: string;
  TransformJobArn?: string;
  CreationTime?: Date;
  TransformEndTime?: Date;
  LastModifiedTime?: Date;
  TransformJobStatus?: TransformJobStatus;
  FailureReason?: string;
}
export type TransformJobSummaries = TransformJobSummary[];
export interface ListTransformJobsResponse {
  TransformJobSummaries: (TransformJobSummary & {
    TransformJobName: TransformJobName;
    TransformJobArn: TransformJobArn;
    CreationTime: Date;
    TransformJobStatus: TransformJobStatus;
  })[];
  NextToken?: string;
}
export type SortTrialComponentsBy = "Name" | "CreationTime" | (string & {});
export interface ListTrialComponentsRequest {
  ExperimentName?: string;
  TrialName?: string;
  SourceArn?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortTrialComponentsBy;
  SortOrder?: SortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export interface TrialComponentSummary {
  TrialComponentName?: string;
  TrialComponentArn?: string;
  DisplayName?: string;
  TrialComponentSource?: TrialComponentSource;
  Status?: TrialComponentStatus;
  StartTime?: Date;
  EndTime?: Date;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export type TrialComponentSummaries = TrialComponentSummary[];
export interface ListTrialComponentsResponse {
  TrialComponentSummaries?: (TrialComponentSummary & {
    TrialComponentSource: TrialComponentSource & {
      SourceArn: TrialComponentSourceArn;
    };
  })[];
  NextToken?: string;
}
export type SortTrialsBy = "Name" | "CreationTime" | (string & {});
export interface ListTrialsRequest {
  ExperimentName?: string;
  TrialComponentName?: string;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  SortBy?: SortTrialsBy;
  SortOrder?: SortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export interface TrialSummary {
  TrialArn?: string;
  TrialName?: string;
  DisplayName?: string;
  TrialSource?: TrialSource;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type TrialSummaries = TrialSummary[];
export interface ListTrialsResponse {
  TrialSummaries?: (TrialSummary & {
    TrialSource: TrialSource & { SourceArn: TrialSourceArn };
  })[];
  NextToken?: string;
}
export interface ListUltraServersByReservedCapacityRequest {
  ReservedCapacityArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ConfiguredSpareInstanceCount = number;
export type UltraServerHealthStatus =
  | "OK"
  | "Impaired"
  | "Insufficient-Data"
  | (string & {});
export interface UltraServer {
  UltraServerId?: string;
  UltraServerType?: string;
  AvailabilityZone?: string;
  InstanceType?: ReservedCapacityInstanceType;
  TotalInstanceCount?: number;
  ConfiguredSpareInstanceCount?: number;
  AvailableInstanceCount?: number;
  InUseInstanceCount?: number;
  AvailableSpareInstanceCount?: number;
  UnhealthyInstanceCount?: number;
  HealthStatus?: UltraServerHealthStatus;
}
export type UltraServers = UltraServer[];
export interface ListUltraServersByReservedCapacityResponse {
  NextToken?: string;
  UltraServers: (UltraServer & {
    UltraServerId: NonEmptyString256;
    UltraServerType: UltraServerType;
    AvailabilityZone: AvailabilityZone;
    InstanceType: ReservedCapacityInstanceType;
    TotalInstanceCount: TotalInstanceCount;
  })[];
}
export type UserProfileSortKey =
  | "CreationTime"
  | "LastModifiedTime"
  | (string & {});
export interface ListUserProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
  SortOrder?: SortOrder;
  SortBy?: UserProfileSortKey;
  DomainIdEquals?: string;
  UserProfileNameContains?: string;
}
export interface UserProfileDetails {
  DomainId?: string;
  UserProfileName?: string;
  Status?: UserProfileStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type UserProfileList = UserProfileDetails[];
export interface ListUserProfilesResponse {
  UserProfiles?: UserProfileDetails[];
  NextToken?: string;
}
export type ListWorkforcesSortByOptions = "Name" | "CreateDate" | (string & {});
export interface ListWorkforcesRequest {
  SortBy?: ListWorkforcesSortByOptions;
  SortOrder?: SortOrder;
  NameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Workforces = Workforce[];
export interface ListWorkforcesResponse {
  Workforces: (Workforce & {
    WorkforceName: WorkforceName;
    WorkforceArn: WorkforceArn;
    SourceIpConfig: SourceIpConfig & { Cidrs: Cidrs };
    CognitoConfig: CognitoConfig & {
      UserPool: CognitoUserPool;
      ClientId: ClientId;
    };
    WorkforceVpcConfig: WorkforceVpcConfigResponse & {
      VpcId: WorkforceVpcId;
      SecurityGroupIds: WorkforceSecurityGroupIds;
      Subnets: WorkforceSubnets;
    };
  })[];
  NextToken?: string;
}
export type ListWorkteamsSortByOptions = "Name" | "CreateDate" | (string & {});
export interface ListWorkteamsRequest {
  SortBy?: ListWorkteamsSortByOptions;
  SortOrder?: SortOrder;
  NameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Workteams = Workteam[];
export interface ListWorkteamsResponse {
  Workteams: (Workteam & {
    WorkteamName: WorkteamName;
    MemberDefinitions: (MemberDefinition & {
      CognitoMemberDefinition: CognitoMemberDefinition & {
        UserPool: CognitoUserPool;
        UserGroup: CognitoUserGroup;
        ClientId: ClientId;
      };
    })[];
    WorkteamArn: WorkteamArn;
    Description: String200;
  })[];
  NextToken?: string;
}
export interface PutModelPackageGroupPolicyInput {
  ModelPackageGroupName?: string;
  ResourcePolicy?: string;
}
export interface PutModelPackageGroupPolicyOutput {
  ModelPackageGroupArn: string;
}
export type QueryLineageStartArns = string[];
export type Direction = "Both" | "Ascendants" | "Descendants" | (string & {});
export type String40 = string;
export type QueryTypes = string[];
export type LineageType =
  | "TrialComponent"
  | "Artifact"
  | "Context"
  | "Action"
  | (string & {});
export type QueryLineageTypes = LineageType[];
export type QueryProperties = { [key: string]: string | undefined };
export interface QueryFilters {
  Types?: string[];
  LineageTypes?: LineageType[];
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  ModifiedBefore?: Date;
  ModifiedAfter?: Date;
  Properties?: { [key: string]: string | undefined };
}
export type QueryLineageMaxDepth = number;
export type QueryLineageMaxResults = number;
export type String8192 = string;
export interface QueryLineageRequest {
  StartArns?: string[];
  Direction?: Direction;
  IncludeEdges?: boolean;
  Filters?: QueryFilters;
  MaxDepth?: number;
  MaxResults?: number;
  NextToken?: string;
}
export interface Vertex {
  Arn?: string;
  Type?: string;
  LineageType?: LineageType;
}
export type Vertices = Vertex[];
export interface Edge {
  SourceArn?: string;
  DestinationArn?: string;
  AssociationType?: AssociationEdgeType;
}
export type Edges = Edge[];
export interface QueryLineageResponse {
  Vertices?: Vertex[];
  Edges?: Edge[];
  NextToken?: string;
}
export interface Device {
  DeviceName?: string;
  Description?: string;
  IotThingName?: string;
}
export type Devices = Device[];
export interface RegisterDevicesRequest {
  DeviceFleetName?: string;
  Devices?: Device[];
  Tags?: Tag[];
}
export interface RegisterDevicesResponse {}
export type TaskInput = string;
export interface RenderableTask {
  Input?: string;
}
export interface RenderUiTemplateRequest {
  UiTemplate?: UiTemplate;
  Task?: RenderableTask;
  RoleArn?: string;
  HumanTaskUiArn?: string;
}
export interface RenderingError {
  Code?: string;
  Message?: string;
}
export type RenderingErrorList = RenderingError[];
export interface RenderUiTemplateResponse {
  RenderedContent: string;
  Errors: (RenderingError & { Code: string; Message: string })[];
}
export interface RetryPipelineExecutionRequest {
  PipelineExecutionArn?: string;
  ClientRequestToken?: string;
  ParallelismConfiguration?: ParallelismConfiguration;
}
export interface RetryPipelineExecutionResponse {
  PipelineExecutionArn?: string;
}
export type Operator =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "GreaterThanOrEqualTo"
  | "LessThan"
  | "LessThanOrEqualTo"
  | "Contains"
  | "Exists"
  | "NotExists"
  | "In"
  | (string & {});
export type FilterValue = string;
export interface Filter {
  Name?: string;
  Operator?: Operator;
  Value?: string;
}
export type FilterList = Filter[];
export interface NestedFilters {
  NestedPropertyName?: string;
  Filters?: Filter[];
}
export type NestedFiltersList = NestedFilters[];
export type SearchExpressionList = SearchExpression[];
export type BooleanOperator = "And" | "Or" | (string & {});
export interface SearchExpression {
  Filters?: Filter[];
  NestedFilters?: NestedFilters[];
  SubExpressions?: SearchExpression[];
  Operator?: BooleanOperator;
}
export type SearchSortOrder = "Ascending" | "Descending" | (string & {});
export type VisibilityConditionsKey = string;
export type VisibilityConditionsValue = string;
export interface VisibilityConditions {
  Key?: string;
  Value?: string;
}
export type VisibilityConditionsList = VisibilityConditions[];
export interface SearchRequest {
  Resource?: ResourceType;
  SearchExpression?: SearchExpression;
  SortBy?: string;
  SortOrder?: SearchSortOrder;
  NextToken?: string;
  MaxResults?: number;
  CrossAccountFilterOption?: CrossAccountFilterOption;
  VisibilityConditions?: VisibilityConditions[];
}
export interface TrainingJob {
  TrainingJobName?: string;
  TrainingJobArn?: string;
  TuningJobArn?: string;
  LabelingJobArn?: string;
  AutoMLJobArn?: string;
  ModelArtifacts?: ModelArtifacts;
  TrainingJobStatus?: TrainingJobStatus;
  SecondaryStatus?: SecondaryStatus;
  FailureReason?: string;
  HyperParameters?: { [key: string]: string | undefined };
  AlgorithmSpecification?: AlgorithmSpecification;
  RoleArn?: string;
  InputDataConfig?: Channel[];
  OutputDataConfig?: OutputDataConfig;
  ResourceConfig?: ResourceConfig;
  WarmPoolStatus?: WarmPoolStatus;
  VpcConfig?: VpcConfig;
  StoppingCondition?: StoppingCondition;
  CreationTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  LastModifiedTime?: Date;
  SecondaryStatusTransitions?: SecondaryStatusTransition[];
  FinalMetricDataList?: MetricData[];
  EnableNetworkIsolation?: boolean;
  EnableInterContainerTrafficEncryption?: boolean;
  EnableManagedSpotTraining?: boolean;
  CheckpointConfig?: CheckpointConfig;
  TrainingTimeInSeconds?: number;
  BillableTimeInSeconds?: number;
  DebugHookConfig?: DebugHookConfig;
  ExperimentConfig?: ExperimentConfig;
  DebugRuleConfigurations?: DebugRuleConfiguration[];
  TensorBoardOutputConfig?: TensorBoardOutputConfig;
  DebugRuleEvaluationStatuses?: DebugRuleEvaluationStatus[];
  OutputModelPackageArn?: string;
  ModelPackageConfig?: ModelPackageConfig;
  ProfilerConfig?: ProfilerConfig;
  Environment?: { [key: string]: string | undefined };
  RetryStrategy?: RetryStrategy;
  Tags?: Tag[];
}
export interface Experiment {
  ExperimentName?: string;
  ExperimentArn?: string;
  DisplayName?: string;
  Source?: ExperimentSource;
  Description?: string;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  Tags?: Tag[];
}
export interface TrialComponentSimpleSummary {
  TrialComponentName?: string;
  TrialComponentArn?: string;
  TrialComponentSource?: TrialComponentSource;
  CreationTime?: Date;
  CreatedBy?: UserContext;
}
export type TrialComponentSimpleSummaries = TrialComponentSimpleSummary[];
export interface Trial {
  TrialName?: string;
  TrialArn?: string;
  DisplayName?: string;
  ExperimentName?: string;
  Source?: TrialSource;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
  Tags?: Tag[];
  TrialComponentSummaries?: TrialComponentSimpleSummary[];
}
export interface ProcessingJob {
  ProcessingInputs?: ProcessingInput[];
  ProcessingOutputConfig?: ProcessingOutputConfig;
  ProcessingJobName?: string;
  ProcessingResources?: ProcessingResources;
  StoppingCondition?: ProcessingStoppingCondition;
  AppSpecification?: AppSpecification;
  Environment?: { [key: string]: string | undefined };
  NetworkConfig?: NetworkConfig;
  RoleArn?: string;
  ExperimentConfig?: ExperimentConfig;
  ProcessingJobArn?: string;
  ProcessingJobStatus?: ProcessingJobStatus;
  ExitMessage?: string;
  FailureReason?: string;
  ProcessingEndTime?: Date;
  ProcessingStartTime?: Date;
  LastModifiedTime?: Date;
  CreationTime?: Date;
  MonitoringScheduleArn?: string;
  AutoMLJobArn?: string;
  TrainingJobArn?: string;
  Tags?: Tag[];
}
export interface TransformJob {
  TransformJobName?: string;
  TransformJobArn?: string;
  TransformJobStatus?: TransformJobStatus;
  FailureReason?: string;
  ModelName?: string;
  MaxConcurrentTransforms?: number;
  ModelClientConfig?: ModelClientConfig;
  MaxPayloadInMB?: number;
  BatchStrategy?: BatchStrategy;
  Environment?: { [key: string]: string | undefined };
  TransformInput?: TransformInput;
  TransformOutput?: TransformOutput;
  DataCaptureConfig?: BatchDataCaptureConfig;
  TransformResources?: TransformResources;
  CreationTime?: Date;
  TransformStartTime?: Date;
  TransformEndTime?: Date;
  LabelingJobArn?: string;
  AutoMLJobArn?: string;
  DataProcessing?: DataProcessing;
  ExperimentConfig?: ExperimentConfig;
  Tags?: Tag[];
}
export interface TrialComponentSourceDetail {
  SourceArn?: string;
  TrainingJob?: TrainingJob;
  ProcessingJob?: ProcessingJob;
  TransformJob?: TransformJob;
}
export interface Parent {
  TrialName?: string;
  ExperimentName?: string;
}
export type Parents = Parent[];
export interface TrialComponent {
  TrialComponentName?: string;
  DisplayName?: string;
  TrialComponentArn?: string;
  Source?: TrialComponentSource;
  Status?: TrialComponentStatus;
  StartTime?: Date;
  EndTime?: Date;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  Parameters?: { [key: string]: TrialComponentParameterValue | undefined };
  InputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  OutputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  Metrics?: TrialComponentMetricSummary[];
  MetadataProperties?: MetadataProperties;
  SourceDetail?: TrialComponentSourceDetail;
  LineageGroupArn?: string;
  Tags?: Tag[];
  Parents?: Parent[];
  RunName?: string;
}
export interface MonitoringSchedule {
  MonitoringScheduleArn?: string;
  MonitoringScheduleName?: string;
  MonitoringScheduleStatus?: ScheduleStatus;
  MonitoringType?: MonitoringType;
  FailureReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MonitoringScheduleConfig?: MonitoringScheduleConfig;
  EndpointName?: string;
  LastMonitoringExecutionSummary?: MonitoringExecutionSummary;
  Tags?: Tag[];
}
export type MonitoringScheduleList = MonitoringSchedule[];
export interface Endpoint {
  EndpointName?: string;
  EndpointArn?: string;
  EndpointConfigName?: string;
  ProductionVariants?: ProductionVariantSummary[];
  DataCaptureConfig?: DataCaptureConfigSummary;
  EndpointStatus?: EndpointStatus;
  FailureReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MonitoringSchedules?: MonitoringSchedule[];
  Tags?: Tag[];
  ShadowProductionVariants?: ProductionVariantSummary[];
}
export interface ModelPackage {
  ModelPackageName?: string;
  ModelPackageGroupName?: string;
  ModelPackageVersion?: number;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
  ModelPackageArn?: string;
  ModelPackageDescription?: string;
  CreationTime?: Date;
  InferenceSpecification?: InferenceSpecification;
  SourceAlgorithmSpecification?: SourceAlgorithmSpecification;
  ValidationSpecification?: ModelPackageValidationSpecification;
  ModelPackageStatus?: ModelPackageStatus;
  ModelPackageStatusDetails?: ModelPackageStatusDetails;
  CertifyForMarketplace?: boolean;
  ModelApprovalStatus?: ModelApprovalStatus;
  CreatedBy?: UserContext;
  MetadataProperties?: MetadataProperties;
  ModelMetrics?: ModelMetrics;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  ApprovalDescription?: string;
  Domain?: string;
  Task?: string;
  SamplePayloadUrl?: string;
  AdditionalInferenceSpecifications?: AdditionalInferenceSpecificationDefinition[];
  SourceUri?: string;
  SecurityConfig?: ModelPackageSecurityConfig;
  ModelCard?: ModelPackageModelCard;
  ModelLifeCycle?: ModelLifeCycle;
  Tags?: Tag[];
  CustomerMetadataProperties?: { [key: string]: string | undefined };
  DriftCheckBaselines?: DriftCheckBaselines;
  SkipModelValidation?: SkipModelValidation;
}
export interface ModelPackageGroup {
  ModelPackageGroupName?: string;
  ModelPackageGroupArn?: string;
  ModelPackageGroupDescription?: string;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  ModelPackageGroupStatus?: ModelPackageGroupStatus;
  Tags?: Tag[];
}
export interface Pipeline {
  PipelineArn?: string;
  PipelineName?: string;
  PipelineDisplayName?: string;
  PipelineDescription?: string;
  RoleArn?: string;
  PipelineStatus?: PipelineStatus;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastRunTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedBy?: UserContext;
  ParallelismConfiguration?: ParallelismConfiguration;
  Tags?: Tag[];
}
export interface PipelineExecution {
  PipelineArn?: string;
  PipelineExecutionArn?: string;
  PipelineExecutionDisplayName?: string;
  PipelineExecutionStatus?: PipelineExecutionStatus;
  PipelineExecutionDescription?: string;
  PipelineExperimentConfig?: PipelineExperimentConfig;
  FailureReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedBy?: UserContext;
  ParallelismConfiguration?: ParallelismConfiguration;
  SelectiveExecutionConfig?: SelectiveExecutionConfig;
  PipelineParameters?: Parameter[];
  PipelineVersionId?: number;
  PipelineVersionDisplayName?: string;
}
export interface PipelineVersion {
  PipelineArn?: string;
  PipelineVersionId?: number;
  PipelineVersionDisplayName?: string;
  PipelineVersionDescription?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedBy?: UserContext;
  LastExecutedPipelineExecutionArn?: string;
  LastExecutedPipelineExecutionDisplayName?: string;
  LastExecutedPipelineExecutionStatus?: PipelineExecutionStatus;
}
export interface FeatureGroup {
  FeatureGroupArn?: string;
  FeatureGroupName?: string;
  RecordIdentifierFeatureName?: string;
  EventTimeFeatureName?: string;
  FeatureDefinitions?: FeatureDefinition[];
  CreationTime?: Date;
  LastModifiedTime?: Date;
  OnlineStoreConfig?: OnlineStoreConfig;
  OfflineStoreConfig?: OfflineStoreConfig;
  RoleArn?: string;
  FeatureGroupStatus?: FeatureGroupStatus;
  OfflineStoreStatus?: OfflineStoreStatus;
  LastUpdateStatus?: LastUpdateStatus;
  FailureReason?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface FeatureMetadata {
  FeatureGroupArn?: string;
  FeatureGroupName?: string;
  FeatureName?: string;
  FeatureType?: FeatureType;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  Description?: string;
  Parameters?: FeatureParameter[];
}
export interface Project {
  ProjectArn?: string;
  ProjectName?: string;
  ProjectId?: string;
  ProjectDescription?: string;
  ServiceCatalogProvisioningDetails?: ServiceCatalogProvisioningDetails;
  ServiceCatalogProvisionedProductDetails?: ServiceCatalogProvisionedProductDetails;
  ProjectStatus?: ProjectStatus;
  CreatedBy?: UserContext;
  CreationTime?: Date;
  TemplateProviderDetails?: TemplateProviderDetail[];
  Tags?: Tag[];
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
}
export interface HyperParameterTuningJobSearchEntity {
  HyperParameterTuningJobName?: string;
  HyperParameterTuningJobArn?: string;
  HyperParameterTuningJobConfig?: HyperParameterTuningJobConfig;
  TrainingJobDefinition?: HyperParameterTrainingJobDefinition;
  TrainingJobDefinitions?: HyperParameterTrainingJobDefinition[];
  HyperParameterTuningJobStatus?: HyperParameterTuningJobStatus;
  CreationTime?: Date;
  HyperParameterTuningEndTime?: Date;
  LastModifiedTime?: Date;
  TrainingJobStatusCounters?: TrainingJobStatusCounters;
  ObjectiveStatusCounters?: ObjectiveStatusCounters;
  BestTrainingJob?: HyperParameterTrainingJobSummary;
  OverallBestTrainingJob?: HyperParameterTrainingJobSummary;
  WarmStartConfig?: HyperParameterTuningJobWarmStartConfig;
  FailureReason?: string;
  TuningJobCompletionDetails?: HyperParameterTuningJobCompletionDetails;
  ConsumedResources?: HyperParameterTuningJobConsumedResources;
  Tags?: Tag[];
}
export interface ModelCard {
  ModelCardArn?: string;
  ModelCardName?: string;
  ModelCardVersion?: number;
  Content?: string | redacted.Redacted<string>;
  ModelCardStatus?: ModelCardStatus;
  SecurityConfig?: ModelCardSecurityConfig;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  Tags?: Tag[];
  ModelId?: string;
  RiskRating?: string;
  ModelPackageGroupName?: string;
}
export interface Model {
  ModelName?: string;
  PrimaryContainer?: ContainerDefinition;
  Containers?: ContainerDefinition[];
  InferenceExecutionConfig?: InferenceExecutionConfig;
  ExecutionRoleArn?: string;
  VpcConfig?: VpcConfig;
  CreationTime?: Date;
  ModelArn?: string;
  EnableNetworkIsolation?: boolean;
  Tags?: Tag[];
  DeploymentRecommendation?: DeploymentRecommendation;
}
export interface ModelDashboardEndpoint {
  EndpointName?: string;
  EndpointArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  EndpointStatus?: EndpointStatus;
}
export type ModelDashboardEndpoints = ModelDashboardEndpoint[];
export interface ModelDashboardMonitoringSchedule {
  MonitoringScheduleArn?: string;
  MonitoringScheduleName?: string;
  MonitoringScheduleStatus?: ScheduleStatus;
  MonitoringType?: MonitoringType;
  FailureReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  MonitoringScheduleConfig?: MonitoringScheduleConfig;
  EndpointName?: string;
  MonitoringAlertSummaries?: MonitoringAlertSummary[];
  LastMonitoringExecutionSummary?: MonitoringExecutionSummary;
  BatchTransformInput?: BatchTransformInput;
}
export type ModelDashboardMonitoringSchedules =
  ModelDashboardMonitoringSchedule[];
export interface ModelDashboardModelCard {
  ModelCardArn?: string;
  ModelCardName?: string;
  ModelCardVersion?: number;
  ModelCardStatus?: ModelCardStatus;
  SecurityConfig?: ModelCardSecurityConfig;
  CreationTime?: Date;
  CreatedBy?: UserContext;
  LastModifiedTime?: Date;
  LastModifiedBy?: UserContext;
  Tags?: Tag[];
  ModelId?: string;
  RiskRating?: string;
}
export interface ModelDashboardModel {
  Model?: Model;
  Endpoints?: ModelDashboardEndpoint[];
  LastBatchTransformJob?: TransformJob;
  MonitoringSchedules?: ModelDashboardMonitoringSchedule[];
  ModelCard?: ModelDashboardModelCard;
}
export interface Job {
  JobName?: string;
  JobArn?: string;
  RoleArn?: string;
  JobCategory?: JobCategory;
  JobConfigSchemaVersion?: string;
  JobConfigDocument?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  EndTime?: Date;
  JobStatus?: JobStatus;
  SecondaryStatus?: JobSecondaryStatus;
  SecondaryStatusTransitions?: JobSecondaryStatusTransition[];
  FailureReason?: string;
  Tags?: Tag[];
}
export interface SearchRecord {
  TrainingJob?: TrainingJob;
  Experiment?: Experiment;
  Trial?: Trial;
  TrialComponent?: TrialComponent;
  Endpoint?: Endpoint;
  ModelPackage?: ModelPackage;
  ModelPackageGroup?: ModelPackageGroup;
  Pipeline?: Pipeline;
  PipelineExecution?: PipelineExecution;
  PipelineVersion?: PipelineVersion;
  FeatureGroup?: FeatureGroup;
  FeatureMetadata?: FeatureMetadata;
  Project?: Project;
  HyperParameterTuningJob?: HyperParameterTuningJobSearchEntity;
  ModelCard?: ModelCard;
  Model?: ModelDashboardModel;
  Job?: Job;
}
export type SearchResultsList = SearchRecord[];
export type Relation = "EqualTo" | "GreaterThanOrEqualTo" | (string & {});
export interface TotalHits {
  Value?: number;
  Relation?: Relation;
}
export interface SearchResponse {
  Results?: (SearchRecord & {
    TrainingJob: TrainingJob & {
      ModelArtifacts: ModelArtifacts & { S3ModelArtifacts: S3Uri };
      AlgorithmSpecification: AlgorithmSpecification & {
        TrainingInputMode: TrainingInputMode;
        MetricDefinitions: (MetricDefinition & {
          Name: MetricName;
          Regex: MetricRegex;
        })[];
        TrainingImageConfig: TrainingImageConfig & {
          TrainingRepositoryAccessMode: TrainingRepositoryAccessMode;
          TrainingRepositoryAuthConfig: TrainingRepositoryAuthConfig & {
            TrainingRepositoryCredentialsProviderArn: TrainingRepositoryCredentialsProviderArn;
          };
        };
      };
      InputDataConfig: (Channel & {
        ChannelName: ChannelName;
        DataSource: DataSource & {
          S3DataSource: S3DataSource & {
            S3DataType: S3DataType;
            S3Uri: S3Uri;
            ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
            HubAccessConfig: HubAccessConfig & { HubContentArn: HubContentArn };
          };
          FileSystemDataSource: FileSystemDataSource & {
            FileSystemId: FileSystemId;
            FileSystemAccessMode: FileSystemAccessMode;
            FileSystemType: FileSystemType;
            DirectoryPath: DirectoryPath;
          };
        };
        ShuffleConfig: ShuffleConfig & { Seed: Seed };
      })[];
      OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
      ResourceConfig: ResourceConfig & {
        InstanceGroups: (InstanceGroup & {
          InstanceType: TrainingInstanceType;
          InstanceCount: TrainingInstanceCount;
          InstanceGroupName: InstanceGroupName;
        })[];
        InstancePlacementConfig: InstancePlacementConfig & {
          PlacementSpecifications: (PlacementSpecification & {
            InstanceCount: TrainingInstanceCount;
          })[];
        };
      };
      WarmPoolStatus: WarmPoolStatus & { Status: WarmPoolResourceStatus };
      VpcConfig: VpcConfig & {
        SecurityGroupIds: VpcSecurityGroupIds;
        Subnets: Subnets;
      };
      SecondaryStatusTransitions: (SecondaryStatusTransition & {
        Status: SecondaryStatus;
        StartTime: Date;
      })[];
      CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
      DebugHookConfig: DebugHookConfig & { S3OutputPath: S3Uri };
      DebugRuleConfigurations: (DebugRuleConfiguration & {
        RuleConfigurationName: RuleConfigurationName;
        RuleEvaluatorImage: AlgorithmImage;
      })[];
      TensorBoardOutputConfig: TensorBoardOutputConfig & {
        S3OutputPath: S3Uri;
      };
      RetryStrategy: RetryStrategy & {
        MaximumRetryAttempts: MaximumRetryAttempts;
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    Experiment: Experiment & {
      Source: ExperimentSource & { SourceArn: ExperimentSourceArn };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    Trial: Trial & {
      Source: TrialSource & { SourceArn: TrialSourceArn };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      TrialComponentSummaries: (TrialComponentSimpleSummary & {
        TrialComponentSource: TrialComponentSource & {
          SourceArn: TrialComponentSourceArn;
        };
      })[];
    };
    TrialComponent: TrialComponent & {
      Source: TrialComponentSource & { SourceArn: TrialComponentSourceArn };
      InputArtifacts: {
        [key: string]:
          | (TrialComponentArtifact & { Value: TrialComponentArtifactValue })
          | undefined;
      };
      OutputArtifacts: {
        [key: string]:
          | (TrialComponentArtifact & { Value: TrialComponentArtifactValue })
          | undefined;
      };
      SourceDetail: TrialComponentSourceDetail & {
        TrainingJob: TrainingJob & {
          ModelArtifacts: ModelArtifacts & { S3ModelArtifacts: S3Uri };
          AlgorithmSpecification: AlgorithmSpecification & {
            TrainingInputMode: TrainingInputMode;
            MetricDefinitions: (MetricDefinition & {
              Name: MetricName;
              Regex: MetricRegex;
            })[];
            TrainingImageConfig: TrainingImageConfig & {
              TrainingRepositoryAccessMode: TrainingRepositoryAccessMode;
              TrainingRepositoryAuthConfig: TrainingRepositoryAuthConfig & {
                TrainingRepositoryCredentialsProviderArn: TrainingRepositoryCredentialsProviderArn;
              };
            };
          };
          InputDataConfig: (Channel & {
            ChannelName: ChannelName;
            DataSource: DataSource & {
              S3DataSource: S3DataSource & {
                S3DataType: S3DataType;
                S3Uri: S3Uri;
                ModelAccessConfig: ModelAccessConfig & {
                  AcceptEula: AcceptEula;
                };
                HubAccessConfig: HubAccessConfig & {
                  HubContentArn: HubContentArn;
                };
              };
              FileSystemDataSource: FileSystemDataSource & {
                FileSystemId: FileSystemId;
                FileSystemAccessMode: FileSystemAccessMode;
                FileSystemType: FileSystemType;
                DirectoryPath: DirectoryPath;
              };
            };
            ShuffleConfig: ShuffleConfig & { Seed: Seed };
          })[];
          OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
          ResourceConfig: ResourceConfig & {
            InstanceGroups: (InstanceGroup & {
              InstanceType: TrainingInstanceType;
              InstanceCount: TrainingInstanceCount;
              InstanceGroupName: InstanceGroupName;
            })[];
            InstancePlacementConfig: InstancePlacementConfig & {
              PlacementSpecifications: (PlacementSpecification & {
                InstanceCount: TrainingInstanceCount;
              })[];
            };
          };
          WarmPoolStatus: WarmPoolStatus & { Status: WarmPoolResourceStatus };
          VpcConfig: VpcConfig & {
            SecurityGroupIds: VpcSecurityGroupIds;
            Subnets: Subnets;
          };
          SecondaryStatusTransitions: (SecondaryStatusTransition & {
            Status: SecondaryStatus;
            StartTime: Date;
          })[];
          CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
          DebugHookConfig: DebugHookConfig & { S3OutputPath: S3Uri };
          DebugRuleConfigurations: (DebugRuleConfiguration & {
            RuleConfigurationName: RuleConfigurationName;
            RuleEvaluatorImage: AlgorithmImage;
          })[];
          TensorBoardOutputConfig: TensorBoardOutputConfig & {
            S3OutputPath: S3Uri;
          };
          RetryStrategy: RetryStrategy & {
            MaximumRetryAttempts: MaximumRetryAttempts;
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
        ProcessingJob: ProcessingJob & {
          ProcessingInputs: (ProcessingInput & {
            InputName: string;
            S3Input: ProcessingS3Input & {
              S3Uri: S3Uri;
              S3DataType: ProcessingS3DataType;
            };
            DatasetDefinition: DatasetDefinition & {
              AthenaDatasetDefinition: AthenaDatasetDefinition & {
                Catalog: AthenaCatalog;
                Database: AthenaDatabase;
                QueryString: AthenaQueryString;
                OutputS3Uri: S3Uri;
                OutputFormat: AthenaResultFormat;
              };
              RedshiftDatasetDefinition: RedshiftDatasetDefinition & {
                ClusterId: RedshiftClusterId;
                Database: RedshiftDatabase;
                DbUser: RedshiftUserName;
                QueryString: RedshiftQueryString;
                ClusterRoleArn: RoleArn;
                OutputS3Uri: S3Uri;
                OutputFormat: RedshiftResultFormat;
              };
            };
          })[];
          ProcessingOutputConfig: ProcessingOutputConfig & {
            Outputs: (ProcessingOutput & {
              OutputName: string;
              S3Output: ProcessingS3Output & {
                S3Uri: S3Uri;
                S3UploadMode: ProcessingS3UploadMode;
              };
              FeatureStoreOutput: ProcessingFeatureStoreOutput & {
                FeatureGroupName: FeatureGroupName;
              };
            })[];
          };
          ProcessingResources: ProcessingResources & {
            ClusterConfig: ProcessingClusterConfig & {
              VolumeSizeInGB: ProcessingVolumeSizeInGB;
            };
          };
          StoppingCondition: ProcessingStoppingCondition & {
            MaxRuntimeInSeconds: ProcessingMaxRuntimeInSeconds;
          };
          AppSpecification: AppSpecification & { ImageUri: ImageUri };
          NetworkConfig: NetworkConfig & {
            VpcConfig: VpcConfig & {
              SecurityGroupIds: VpcSecurityGroupIds;
              Subnets: Subnets;
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
        TransformJob: TransformJob & {
          TransformInput: TransformInput & {
            DataSource: TransformDataSource & {
              S3DataSource: TransformS3DataSource & {
                S3DataType: S3DataType;
                S3Uri: S3Uri;
              };
            };
          };
          TransformOutput: TransformOutput & { S3OutputPath: S3Uri };
          DataCaptureConfig: BatchDataCaptureConfig & {
            DestinationS3Uri: S3Uri;
          };
          TransformResources: TransformResources & {
            InstanceType: TransformInstanceType;
            InstanceCount: TransformInstanceCount;
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    Endpoint: Endpoint & {
      EndpointName: EndpointName;
      EndpointArn: EndpointArn;
      EndpointConfigName: EndpointConfigName;
      EndpointStatus: EndpointStatus;
      CreationTime: Date;
      LastModifiedTime: Date;
      ProductionVariants: (ProductionVariantSummary & {
        VariantName: VariantName;
        InstancePools: (InstancePoolSummary & {
          InstanceType: ProductionVariantInstanceType;
          CurrentInstanceCount: TaskCount;
        })[];
        VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
        CurrentServerlessConfig: ProductionVariantServerlessConfig & {
          MemorySizeInMB: ServerlessMemorySizeInMB;
          MaxConcurrency: ServerlessMaxConcurrency;
        };
        DesiredServerlessConfig: ProductionVariantServerlessConfig & {
          MemorySizeInMB: ServerlessMemorySizeInMB;
          MaxConcurrency: ServerlessMaxConcurrency;
        };
        ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
          ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
            Strategy: ManagedInstanceScalingScaleInStrategy;
          };
        };
        RoutingConfig: ProductionVariantRoutingConfig & {
          RoutingStrategy: RoutingStrategy;
        };
      })[];
      DataCaptureConfig: DataCaptureConfigSummary & {
        EnableCapture: EnableCapture;
        CaptureStatus: CaptureStatus;
        CurrentSamplingPercentage: SamplingPercentage;
        DestinationS3Uri: DestinationS3Uri;
        KmsKeyId: KmsKeyId;
      };
      MonitoringSchedules: (MonitoringSchedule & {
        MonitoringScheduleConfig: MonitoringScheduleConfig & {
          ScheduleConfig: ScheduleConfig & {
            ScheduleExpression: ScheduleExpression;
          };
          MonitoringJobDefinition: MonitoringJobDefinition & {
            MonitoringInputs: (MonitoringInput & {
              EndpointInput: EndpointInput & {
                EndpointName: EndpointName;
                LocalPath: ProcessingLocalPath;
              };
              BatchTransformInput: BatchTransformInput & {
                DataCapturedDestinationS3Uri: DestinationS3Uri;
                DatasetFormat: MonitoringDatasetFormat;
                LocalPath: ProcessingLocalPath;
              };
            })[];
            MonitoringOutputConfig: MonitoringOutputConfig & {
              MonitoringOutputs: (MonitoringOutput & {
                S3Output: MonitoringS3Output & {
                  S3Uri: MonitoringS3Uri;
                  LocalPath: ProcessingLocalPath;
                };
              })[];
            };
            MonitoringResources: MonitoringResources & {
              ClusterConfig: MonitoringClusterConfig & {
                InstanceCount: ProcessingInstanceCount;
                InstanceType: ProcessingInstanceType;
                VolumeSizeInGB: ProcessingVolumeSizeInGB;
              };
            };
            MonitoringAppSpecification: MonitoringAppSpecification & {
              ImageUri: ImageUri;
            };
            RoleArn: RoleArn;
            StoppingCondition: MonitoringStoppingCondition & {
              MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
            };
            NetworkConfig: NetworkConfig & {
              VpcConfig: VpcConfig & {
                SecurityGroupIds: VpcSecurityGroupIds;
                Subnets: Subnets;
              };
            };
          };
        };
        LastMonitoringExecutionSummary: MonitoringExecutionSummary & {
          MonitoringScheduleName: MonitoringScheduleName;
          ScheduledTime: Date;
          CreationTime: Date;
          LastModifiedTime: Date;
          MonitoringExecutionStatus: ExecutionStatus;
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })[];
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      ShadowProductionVariants: (ProductionVariantSummary & {
        VariantName: VariantName;
        InstancePools: (InstancePoolSummary & {
          InstanceType: ProductionVariantInstanceType;
          CurrentInstanceCount: TaskCount;
        })[];
        VariantStatus: (ProductionVariantStatus & { Status: VariantStatus })[];
        CurrentServerlessConfig: ProductionVariantServerlessConfig & {
          MemorySizeInMB: ServerlessMemorySizeInMB;
          MaxConcurrency: ServerlessMaxConcurrency;
        };
        DesiredServerlessConfig: ProductionVariantServerlessConfig & {
          MemorySizeInMB: ServerlessMemorySizeInMB;
          MaxConcurrency: ServerlessMaxConcurrency;
        };
        ManagedInstanceScaling: ProductionVariantManagedInstanceScaling & {
          ScaleInPolicy: ProductionVariantManagedInstanceScalingScaleInPolicy & {
            Strategy: ManagedInstanceScalingScaleInStrategy;
          };
        };
        RoutingConfig: ProductionVariantRoutingConfig & {
          RoutingStrategy: RoutingStrategy;
        };
      })[];
    };
    ModelPackage: ModelPackage & {
      InferenceSpecification: InferenceSpecification & {
        Containers: (ModelPackageContainerDefinition & {
          ModelDataSource: ModelDataSource & {
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          };
          ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
          AdditionalModelDataSources: (AdditionalModelDataSource & {
            ChannelName: AdditionalModelChannelName;
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          })[];
          AdditionalS3DataSource: AdditionalS3DataSource & {
            S3DataType: AdditionalS3DataSourceDataType;
            S3Uri: S3Uri;
          };
        })[];
      };
      SourceAlgorithmSpecification: SourceAlgorithmSpecification & {
        SourceAlgorithms: (SourceAlgorithm & {
          AlgorithmName: ArnOrName;
          ModelDataSource: ModelDataSource & {
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          };
        })[];
      };
      ValidationSpecification: ModelPackageValidationSpecification & {
        ValidationRole: RoleArn;
        ValidationProfiles: (ModelPackageValidationProfile & {
          ProfileName: EntityName;
          TransformJobDefinition: TransformJobDefinition & {
            TransformInput: TransformInput & {
              DataSource: TransformDataSource & {
                S3DataSource: TransformS3DataSource & {
                  S3DataType: S3DataType;
                  S3Uri: S3Uri;
                };
              };
            };
            TransformOutput: TransformOutput & { S3OutputPath: S3Uri };
            TransformResources: TransformResources & {
              InstanceType: TransformInstanceType;
              InstanceCount: TransformInstanceCount;
            };
          };
        })[];
      };
      ModelPackageStatusDetails: ModelPackageStatusDetails & {
        ValidationStatuses: (ModelPackageStatusItem & {
          Name: EntityName;
          Status: DetailedModelPackageStatus;
        })[];
        ImageScanStatuses: (ModelPackageStatusItem & {
          Name: EntityName;
          Status: DetailedModelPackageStatus;
        })[];
      };
      ModelMetrics: ModelMetrics & {
        ModelQuality: ModelQuality & {
          Statistics: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          Constraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
        ModelDataQuality: ModelDataQuality & {
          Statistics: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          Constraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
        Bias: Bias & {
          Report: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
          PreTrainingReport: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          PostTrainingReport: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
        Explainability: Explainability & {
          Report: MetricsSource & { ContentType: ContentType; S3Uri: S3Uri };
        };
      };
      AdditionalInferenceSpecifications: (AdditionalInferenceSpecificationDefinition & {
        Name: EntityName;
        Containers: (ModelPackageContainerDefinition & {
          ModelDataSource: ModelDataSource & {
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          };
          ModelInput: ModelInput & { DataInputConfig: DataInputConfig };
          AdditionalModelDataSources: (AdditionalModelDataSource & {
            ChannelName: AdditionalModelChannelName;
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          })[];
          AdditionalS3DataSource: AdditionalS3DataSource & {
            S3DataType: AdditionalS3DataSourceDataType;
            S3Uri: S3Uri;
          };
        })[];
      })[];
      SecurityConfig: ModelPackageSecurityConfig & { KmsKeyId: KmsKeyId };
      ModelLifeCycle: ModelLifeCycle & {
        Stage: EntityName;
        StageStatus: EntityName;
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      DriftCheckBaselines: DriftCheckBaselines & {
        Bias: DriftCheckBias & {
          ConfigFile: FileSource & { S3Uri: S3Uri };
          PreTrainingConstraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          PostTrainingConstraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
        Explainability: DriftCheckExplainability & {
          Constraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          ConfigFile: FileSource & { S3Uri: S3Uri };
        };
        ModelQuality: DriftCheckModelQuality & {
          Statistics: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          Constraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
        ModelDataQuality: DriftCheckModelDataQuality & {
          Statistics: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
          Constraints: MetricsSource & {
            ContentType: ContentType;
            S3Uri: S3Uri;
          };
        };
      };
    };
    ModelPackageGroup: ModelPackageGroup & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    Pipeline: Pipeline & {
      ParallelismConfiguration: ParallelismConfiguration & {
        MaxParallelExecutionSteps: MaxParallelExecutionSteps;
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    PipelineExecution: PipelineExecution & {
      ParallelismConfiguration: ParallelismConfiguration & {
        MaxParallelExecutionSteps: MaxParallelExecutionSteps;
      };
      SelectiveExecutionConfig: SelectiveExecutionConfig & {
        SelectedSteps: (SelectedStep & { StepName: String256 })[];
      };
      PipelineParameters: (Parameter & {
        Name: PipelineParameterName;
        Value: String1024;
      })[];
    };
    FeatureGroup: FeatureGroup & {
      FeatureDefinitions: (FeatureDefinition & {
        FeatureName: FeatureName;
        FeatureType: FeatureType;
      })[];
      OfflineStoreConfig: OfflineStoreConfig & {
        S3StorageConfig: S3StorageConfig & { S3Uri: S3Uri };
        DataCatalogConfig: DataCatalogConfig & {
          TableName: TableName;
          Catalog: Catalog;
          Database: Database;
        };
      };
      OfflineStoreStatus: OfflineStoreStatus & {
        Status: OfflineStoreStatusValue;
      };
      LastUpdateStatus: LastUpdateStatus & { Status: LastUpdateStatusValue };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    Project: Project & {
      ServiceCatalogProvisioningDetails: ServiceCatalogProvisioningDetails & {
        ProductId: ServiceCatalogEntityId;
      };
      TemplateProviderDetails: (TemplateProviderDetail & {
        CfnTemplateProviderDetail: CfnTemplateProviderDetail & {
          TemplateName: CfnTemplateName;
          TemplateURL: CfnTemplateURL;
          Parameters: (CfnStackParameter & { Key: CfnStackParameterKey })[];
          StackDetail: CfnStackDetail & {
            StatusMessage: CfnStackStatusMessage;
          };
        };
      })[];
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    HyperParameterTuningJob: HyperParameterTuningJobSearchEntity & {
      HyperParameterTuningJobConfig: HyperParameterTuningJobConfig & {
        Strategy: HyperParameterTuningJobStrategyType;
        ResourceLimits: ResourceLimits & {
          MaxParallelTrainingJobs: MaxParallelTrainingJobs;
        };
        HyperParameterTuningJobObjective: HyperParameterTuningJobObjective & {
          Type: HyperParameterTuningJobObjectiveType;
          MetricName: MetricName;
        };
        ParameterRanges: ParameterRanges & {
          IntegerParameterRanges: (IntegerParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          ContinuousParameterRanges: (ContinuousParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          CategoricalParameterRanges: (CategoricalParameterRange & {
            Name: ParameterKey;
            Values: ParameterValues;
          })[];
          AutoParameters: (AutoParameter & {
            Name: ParameterKey;
            ValueHint: ParameterValue;
          })[];
        };
      };
      TrainingJobDefinition: HyperParameterTrainingJobDefinition & {
        AlgorithmSpecification: HyperParameterAlgorithmSpecification & {
          TrainingInputMode: TrainingInputMode;
          MetricDefinitions: (MetricDefinition & {
            Name: MetricName;
            Regex: MetricRegex;
          })[];
        };
        RoleArn: RoleArn;
        OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
        StoppingCondition: StoppingCondition;
        TuningObjective: HyperParameterTuningJobObjective & {
          Type: HyperParameterTuningJobObjectiveType;
          MetricName: MetricName;
        };
        HyperParameterRanges: ParameterRanges & {
          IntegerParameterRanges: (IntegerParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          ContinuousParameterRanges: (ContinuousParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          CategoricalParameterRanges: (CategoricalParameterRange & {
            Name: ParameterKey;
            Values: ParameterValues;
          })[];
          AutoParameters: (AutoParameter & {
            Name: ParameterKey;
            ValueHint: ParameterValue;
          })[];
        };
        InputDataConfig: (Channel & {
          ChannelName: ChannelName;
          DataSource: DataSource & {
            S3DataSource: S3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: HubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
            FileSystemDataSource: FileSystemDataSource & {
              FileSystemId: FileSystemId;
              FileSystemAccessMode: FileSystemAccessMode;
              FileSystemType: FileSystemType;
              DirectoryPath: DirectoryPath;
            };
          };
          ShuffleConfig: ShuffleConfig & { Seed: Seed };
        })[];
        VpcConfig: VpcConfig & {
          SecurityGroupIds: VpcSecurityGroupIds;
          Subnets: Subnets;
        };
        ResourceConfig: ResourceConfig & {
          InstanceGroups: (InstanceGroup & {
            InstanceType: TrainingInstanceType;
            InstanceCount: TrainingInstanceCount;
            InstanceGroupName: InstanceGroupName;
          })[];
          InstancePlacementConfig: InstancePlacementConfig & {
            PlacementSpecifications: (PlacementSpecification & {
              InstanceCount: TrainingInstanceCount;
            })[];
          };
        };
        HyperParameterTuningResourceConfig: HyperParameterTuningResourceConfig & {
          InstanceConfigs: (HyperParameterTuningInstanceConfig & {
            InstanceType: TrainingInstanceType;
            InstanceCount: TrainingInstanceCount;
            VolumeSizeInGB: VolumeSizeInGB;
          })[];
        };
        CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
        RetryStrategy: RetryStrategy & {
          MaximumRetryAttempts: MaximumRetryAttempts;
        };
      };
      TrainingJobDefinitions: (HyperParameterTrainingJobDefinition & {
        AlgorithmSpecification: HyperParameterAlgorithmSpecification & {
          TrainingInputMode: TrainingInputMode;
          MetricDefinitions: (MetricDefinition & {
            Name: MetricName;
            Regex: MetricRegex;
          })[];
        };
        RoleArn: RoleArn;
        OutputDataConfig: OutputDataConfig & { S3OutputPath: S3Uri };
        StoppingCondition: StoppingCondition;
        TuningObjective: HyperParameterTuningJobObjective & {
          Type: HyperParameterTuningJobObjectiveType;
          MetricName: MetricName;
        };
        HyperParameterRanges: ParameterRanges & {
          IntegerParameterRanges: (IntegerParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          ContinuousParameterRanges: (ContinuousParameterRange & {
            Name: ParameterKey;
            MinValue: ParameterValue;
            MaxValue: ParameterValue;
          })[];
          CategoricalParameterRanges: (CategoricalParameterRange & {
            Name: ParameterKey;
            Values: ParameterValues;
          })[];
          AutoParameters: (AutoParameter & {
            Name: ParameterKey;
            ValueHint: ParameterValue;
          })[];
        };
        InputDataConfig: (Channel & {
          ChannelName: ChannelName;
          DataSource: DataSource & {
            S3DataSource: S3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: HubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
            FileSystemDataSource: FileSystemDataSource & {
              FileSystemId: FileSystemId;
              FileSystemAccessMode: FileSystemAccessMode;
              FileSystemType: FileSystemType;
              DirectoryPath: DirectoryPath;
            };
          };
          ShuffleConfig: ShuffleConfig & { Seed: Seed };
        })[];
        VpcConfig: VpcConfig & {
          SecurityGroupIds: VpcSecurityGroupIds;
          Subnets: Subnets;
        };
        ResourceConfig: ResourceConfig & {
          InstanceGroups: (InstanceGroup & {
            InstanceType: TrainingInstanceType;
            InstanceCount: TrainingInstanceCount;
            InstanceGroupName: InstanceGroupName;
          })[];
          InstancePlacementConfig: InstancePlacementConfig & {
            PlacementSpecifications: (PlacementSpecification & {
              InstanceCount: TrainingInstanceCount;
            })[];
          };
        };
        HyperParameterTuningResourceConfig: HyperParameterTuningResourceConfig & {
          InstanceConfigs: (HyperParameterTuningInstanceConfig & {
            InstanceType: TrainingInstanceType;
            InstanceCount: TrainingInstanceCount;
            VolumeSizeInGB: VolumeSizeInGB;
          })[];
        };
        CheckpointConfig: CheckpointConfig & { S3Uri: S3Uri };
        RetryStrategy: RetryStrategy & {
          MaximumRetryAttempts: MaximumRetryAttempts;
        };
      })[];
      BestTrainingJob: HyperParameterTrainingJobSummary & {
        TrainingJobName: TrainingJobName;
        TrainingJobArn: TrainingJobArn;
        CreationTime: Date;
        TrainingJobStatus: TrainingJobStatus;
        TunedHyperParameters: HyperParameters;
        FinalHyperParameterTuningJobObjectiveMetric: FinalHyperParameterTuningJobObjectiveMetric & {
          MetricName: MetricName;
          Value: MetricValue;
        };
      };
      OverallBestTrainingJob: HyperParameterTrainingJobSummary & {
        TrainingJobName: TrainingJobName;
        TrainingJobArn: TrainingJobArn;
        CreationTime: Date;
        TrainingJobStatus: TrainingJobStatus;
        TunedHyperParameters: HyperParameters;
        FinalHyperParameterTuningJobObjectiveMetric: FinalHyperParameterTuningJobObjectiveMetric & {
          MetricName: MetricName;
          Value: MetricValue;
        };
      };
      WarmStartConfig: HyperParameterTuningJobWarmStartConfig & {
        ParentHyperParameterTuningJobs: ParentHyperParameterTuningJobs;
        WarmStartType: HyperParameterTuningJobWarmStartType;
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    ModelCard: ModelCard & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
    Model: ModelDashboardModel & {
      Model: Model & {
        PrimaryContainer: ContainerDefinition & {
          ImageConfig: ImageConfig & {
            RepositoryAccessMode: RepositoryAccessMode;
            RepositoryAuthConfig: RepositoryAuthConfig & {
              RepositoryCredentialsProviderArn: RepositoryCredentialsProviderArn;
            };
          };
          ModelDataSource: ModelDataSource & {
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          };
          AdditionalModelDataSources: (AdditionalModelDataSource & {
            ChannelName: AdditionalModelChannelName;
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          })[];
          ContainerMetricsConfig: ContainerMetricsConfig & {
            MetricsEndpoints: (MetricsEndpoint & {
              MetricsEndpointPath: MetricsEndpointPath;
            })[];
          };
        };
        Containers: (ContainerDefinition & {
          ImageConfig: ImageConfig & {
            RepositoryAccessMode: RepositoryAccessMode;
            RepositoryAuthConfig: RepositoryAuthConfig & {
              RepositoryCredentialsProviderArn: RepositoryCredentialsProviderArn;
            };
          };
          ModelDataSource: ModelDataSource & {
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          };
          AdditionalModelDataSources: (AdditionalModelDataSource & {
            ChannelName: AdditionalModelChannelName;
            S3DataSource: S3ModelDataSource & {
              S3Uri: S3ModelUri;
              S3DataType: S3ModelDataType;
              CompressionType: ModelCompressionType;
              ModelAccessConfig: ModelAccessConfig & { AcceptEula: AcceptEula };
              HubAccessConfig: InferenceHubAccessConfig & {
                HubContentArn: HubContentArn;
              };
            };
          })[];
          ContainerMetricsConfig: ContainerMetricsConfig & {
            MetricsEndpoints: (MetricsEndpoint & {
              MetricsEndpointPath: MetricsEndpointPath;
            })[];
          };
        })[];
        InferenceExecutionConfig: InferenceExecutionConfig & {
          Mode: InferenceExecutionMode;
        };
        VpcConfig: VpcConfig & {
          SecurityGroupIds: VpcSecurityGroupIds;
          Subnets: Subnets;
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        DeploymentRecommendation: DeploymentRecommendation & {
          RecommendationStatus: RecommendationStatus;
          RealTimeInferenceRecommendations: (RealTimeInferenceRecommendation & {
            RecommendationId: string;
            InstanceType: ProductionVariantInstanceType;
          })[];
        };
      };
      Endpoints: (ModelDashboardEndpoint & {
        EndpointName: EndpointName;
        EndpointArn: EndpointArn;
        CreationTime: Date;
        LastModifiedTime: Date;
        EndpointStatus: EndpointStatus;
      })[];
      LastBatchTransformJob: TransformJob & {
        TransformInput: TransformInput & {
          DataSource: TransformDataSource & {
            S3DataSource: TransformS3DataSource & {
              S3DataType: S3DataType;
              S3Uri: S3Uri;
            };
          };
        };
        TransformOutput: TransformOutput & { S3OutputPath: S3Uri };
        DataCaptureConfig: BatchDataCaptureConfig & { DestinationS3Uri: S3Uri };
        TransformResources: TransformResources & {
          InstanceType: TransformInstanceType;
          InstanceCount: TransformInstanceCount;
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
      MonitoringSchedules: (ModelDashboardMonitoringSchedule & {
        MonitoringScheduleConfig: MonitoringScheduleConfig & {
          ScheduleConfig: ScheduleConfig & {
            ScheduleExpression: ScheduleExpression;
          };
          MonitoringJobDefinition: MonitoringJobDefinition & {
            MonitoringInputs: (MonitoringInput & {
              EndpointInput: EndpointInput & {
                EndpointName: EndpointName;
                LocalPath: ProcessingLocalPath;
              };
              BatchTransformInput: BatchTransformInput & {
                DataCapturedDestinationS3Uri: DestinationS3Uri;
                DatasetFormat: MonitoringDatasetFormat;
                LocalPath: ProcessingLocalPath;
              };
            })[];
            MonitoringOutputConfig: MonitoringOutputConfig & {
              MonitoringOutputs: (MonitoringOutput & {
                S3Output: MonitoringS3Output & {
                  S3Uri: MonitoringS3Uri;
                  LocalPath: ProcessingLocalPath;
                };
              })[];
            };
            MonitoringResources: MonitoringResources & {
              ClusterConfig: MonitoringClusterConfig & {
                InstanceCount: ProcessingInstanceCount;
                InstanceType: ProcessingInstanceType;
                VolumeSizeInGB: ProcessingVolumeSizeInGB;
              };
            };
            MonitoringAppSpecification: MonitoringAppSpecification & {
              ImageUri: ImageUri;
            };
            RoleArn: RoleArn;
            StoppingCondition: MonitoringStoppingCondition & {
              MaxRuntimeInSeconds: MonitoringMaxRuntimeInSeconds;
            };
            NetworkConfig: NetworkConfig & {
              VpcConfig: VpcConfig & {
                SecurityGroupIds: VpcSecurityGroupIds;
                Subnets: Subnets;
              };
            };
          };
        };
        MonitoringAlertSummaries: (MonitoringAlertSummary & {
          MonitoringAlertName: MonitoringAlertName;
          CreationTime: Date;
          LastModifiedTime: Date;
          AlertStatus: MonitoringAlertStatus;
          DatapointsToAlert: MonitoringDatapointsToAlert;
          EvaluationPeriod: MonitoringEvaluationPeriod;
          Actions: MonitoringAlertActions;
        })[];
        LastMonitoringExecutionSummary: MonitoringExecutionSummary & {
          MonitoringScheduleName: MonitoringScheduleName;
          ScheduledTime: Date;
          CreationTime: Date;
          LastModifiedTime: Date;
          MonitoringExecutionStatus: ExecutionStatus;
        };
        BatchTransformInput: BatchTransformInput & {
          DataCapturedDestinationS3Uri: DestinationS3Uri;
          DatasetFormat: MonitoringDatasetFormat;
          LocalPath: ProcessingLocalPath;
        };
      })[];
      ModelCard: ModelDashboardModelCard & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    };
    Job: Job & {
      SecondaryStatusTransitions: (JobSecondaryStatusTransition & {
        Status: JobSecondaryStatus;
        StartTime: Date;
      })[];
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
  })[];
  NextToken?: string;
  TotalHits?: TotalHits;
}
export type ReservedCapacityInstanceCount = number;
export type TrainingPlanDurationHoursInput = number;
export interface SearchTrainingPlanOfferingsRequest {
  InstanceType?: ReservedCapacityInstanceType;
  InstanceCount?: number;
  UltraServerType?: string;
  UltraServerCount?: number;
  StartTimeAfter?: Date;
  EndTimeBefore?: Date;
  DurationHours?: number;
  TargetResources?: SageMakerResourceName[];
  TrainingPlanArn?: string;
}
export interface ReservedCapacityOffering {
  ReservedCapacityType?: ReservedCapacityType;
  UltraServerType?: string;
  UltraServerCount?: number;
  InstanceType?: ReservedCapacityInstanceType;
  InstanceCount?: number;
  AvailabilityZone?: string;
  DurationHours?: number;
  DurationMinutes?: number;
  StartTime?: Date;
  EndTime?: Date;
  ExtensionStartTime?: Date;
  ExtensionEndTime?: Date;
}
export type ReservedCapacityOfferings = ReservedCapacityOffering[];
export interface TrainingPlanOffering {
  TrainingPlanOfferingId?: string;
  TargetResources?: SageMakerResourceName[];
  RequestedStartTimeAfter?: Date;
  RequestedEndTimeBefore?: Date;
  DurationHours?: number;
  DurationMinutes?: number;
  UpfrontFee?: string;
  CurrencyCode?: string;
  ReservedCapacityOfferings?: ReservedCapacityOffering[];
}
export type TrainingPlanOfferings = TrainingPlanOffering[];
export interface TrainingPlanExtensionOffering {
  TrainingPlanExtensionOfferingId?: string;
  AvailabilityZone?: string;
  StartDate?: Date;
  EndDate?: Date;
  DurationHours?: number;
  UpfrontFee?: string;
  CurrencyCode?: string;
}
export type TrainingPlanExtensionOfferings = TrainingPlanExtensionOffering[];
export interface SearchTrainingPlanOfferingsResponse {
  TrainingPlanOfferings: (TrainingPlanOffering & {
    TrainingPlanOfferingId: TrainingPlanOfferingId;
    TargetResources: SageMakerResourceNames;
    ReservedCapacityOfferings: (ReservedCapacityOffering & {
      InstanceType: ReservedCapacityInstanceType;
      InstanceCount: ReservedCapacityInstanceCount;
    })[];
  })[];
  TrainingPlanExtensionOfferings?: (TrainingPlanExtensionOffering & {
    TrainingPlanExtensionOfferingId: TrainingPlanExtensionOfferingId;
  })[];
}
export interface SendPipelineExecutionStepFailureRequest {
  CallbackToken?: string;
  FailureReason?: string;
  ClientRequestToken?: string;
}
export interface SendPipelineExecutionStepFailureResponse {
  PipelineExecutionArn?: string;
}
export interface SendPipelineExecutionStepSuccessRequest {
  CallbackToken?: string;
  OutputParameters?: OutputParameter[];
  ClientRequestToken?: string;
}
export interface SendPipelineExecutionStepSuccessResponse {
  PipelineExecutionArn?: string;
}
export type InstanceIds = string[];
export type DeepHealthChecks = DeepHealthCheckType[];
export interface InstanceGroupHealthCheckConfiguration {
  InstanceGroupName: string;
  InstanceIds?: string[];
  DeepHealthChecks: DeepHealthCheckType[];
}
export type DeepHealthCheckConfigurations =
  InstanceGroupHealthCheckConfiguration[];
export interface StartClusterHealthCheckRequest {
  ClusterName: string;
  DeepHealthCheckConfigurations: InstanceGroupHealthCheckConfiguration[];
}
export interface StartClusterHealthCheckResponse {
  ClusterArn: string;
}
export interface StartEdgeDeploymentStageRequest {
  EdgeDeploymentPlanName?: string;
  StageName?: string;
}
export interface StartEdgeDeploymentStageResponse {}
export interface StartInferenceExperimentRequest {
  Name?: string;
}
export interface StartInferenceExperimentResponse {
  InferenceExperimentArn: string;
}
export interface StartMlflowTrackingServerRequest {
  TrackingServerName?: string;
}
export interface StartMlflowTrackingServerResponse {
  TrackingServerArn?: string;
}
export interface StartMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
}
export interface StartMonitoringScheduleResponse {}
export interface StartNotebookInstanceInput {
  NotebookInstanceName?: string;
}
export interface StartNotebookInstanceResponse {}
export interface StartPipelineExecutionRequest {
  PipelineName?: string;
  PipelineExecutionDisplayName?: string;
  PipelineParameters?: Parameter[];
  PipelineExecutionDescription?: string;
  ClientRequestToken?: string;
  ParallelismConfiguration?: ParallelismConfiguration;
  SelectiveExecutionConfig?: SelectiveExecutionConfig;
  PipelineVersionId?: number;
  MlflowExperimentName?: string;
}
export interface StartPipelineExecutionResponse {
  PipelineExecutionArn?: string;
}
export type ResourceIdentifier = string;
export interface StartSessionRequest {
  ResourceIdentifier?: string;
}
export type SessionId = string;
export type StreamUrl = string;
export type TokenValue = string;
export interface StartSessionResponse {
  SessionId?: string;
  StreamUrl?: string;
  TokenValue?: string;
}
export interface StopAIBenchmarkJobRequest {
  AIBenchmarkJobName?: string;
}
export interface StopAIBenchmarkJobResponse {
  AIBenchmarkJobArn: string;
}
export interface StopAIRecommendationJobRequest {
  AIRecommendationJobName?: string;
}
export interface StopAIRecommendationJobResponse {
  AIRecommendationJobArn: string;
}
export interface StopAutoMLJobRequest {
  AutoMLJobName?: string;
}
export interface StopAutoMLJobResponse {}
export interface StopCompilationJobRequest {
  CompilationJobName?: string;
}
export interface StopCompilationJobResponse {}
export interface StopEdgeDeploymentStageRequest {
  EdgeDeploymentPlanName?: string;
  StageName?: string;
}
export interface StopEdgeDeploymentStageResponse {}
export interface StopEdgePackagingJobRequest {
  EdgePackagingJobName?: string;
}
export interface StopEdgePackagingJobResponse {}
export interface StopHyperParameterTuningJobRequest {
  HyperParameterTuningJobName?: string;
}
export interface StopHyperParameterTuningJobResponse {}
export type ModelVariantAction =
  | "Retain"
  | "Remove"
  | "Promote"
  | (string & {});
export type ModelVariantActionMap = {
  [key: string]: ModelVariantAction | undefined;
};
export type InferenceExperimentStopDesiredState =
  | "Completed"
  | "Cancelled"
  | (string & {});
export interface StopInferenceExperimentRequest {
  Name?: string;
  ModelVariantActions?: { [key: string]: ModelVariantAction | undefined };
  DesiredModelVariants?: ModelVariantConfig[];
  DesiredState?: InferenceExperimentStopDesiredState;
  Reason?: string;
}
export interface StopInferenceExperimentResponse {
  InferenceExperimentArn: string;
}
export interface StopInferenceRecommendationsJobRequest {
  JobName?: string;
}
export interface StopInferenceRecommendationsJobResponse {}
export interface StopJobRequest {
  JobName?: string;
  JobCategory?: JobCategory;
}
export interface StopJobResponse {}
export interface StopLabelingJobRequest {
  LabelingJobName?: string;
}
export interface StopLabelingJobResponse {}
export interface StopMlflowTrackingServerRequest {
  TrackingServerName?: string;
}
export interface StopMlflowTrackingServerResponse {
  TrackingServerArn?: string;
}
export interface StopMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
}
export interface StopMonitoringScheduleResponse {}
export interface StopNotebookInstanceInput {
  NotebookInstanceName?: string;
}
export interface StopNotebookInstanceResponse {}
export interface StopOptimizationJobRequest {
  OptimizationJobName?: string;
}
export interface StopOptimizationJobResponse {}
export interface StopPipelineExecutionRequest {
  PipelineExecutionArn?: string;
  ClientRequestToken?: string;
}
export interface StopPipelineExecutionResponse {
  PipelineExecutionArn?: string;
}
export interface StopProcessingJobRequest {
  ProcessingJobName?: string;
}
export interface StopProcessingJobResponse {}
export interface StopTrainingJobRequest {
  TrainingJobName?: string;
}
export interface StopTrainingJobResponse {}
export interface StopTransformJobRequest {
  TransformJobName?: string;
}
export interface StopTransformJobResponse {}
export type ListLineageEntityParameterKey = string[];
export interface UpdateActionRequest {
  ActionName?: string;
  Description?: string;
  Status?: ActionStatus;
  Properties?: { [key: string]: string | undefined };
  PropertiesToRemove?: string[];
}
export interface UpdateActionResponse {
  ActionArn?: string;
}
export interface UpdateAppImageConfigRequest {
  AppImageConfigName?: string;
  KernelGatewayImageConfig?: KernelGatewayImageConfig;
  JupyterLabAppImageConfig?: JupyterLabAppImageConfig;
  CodeEditorAppImageConfig?: CodeEditorAppImageConfig;
}
export interface UpdateAppImageConfigResponse {
  AppImageConfigArn?: string;
}
export interface UpdateArtifactRequest {
  ArtifactArn?: string;
  ArtifactName?: string;
  Properties?: { [key: string]: string | undefined };
  PropertiesToRemove?: string[];
}
export interface UpdateArtifactResponse {
  ArtifactArn?: string;
}
export type ClusterInstanceGroupsToDelete = string[];
export interface UpdateClusterRequest {
  ClusterName?: string;
  InstanceGroups?: ClusterInstanceGroupSpecification[];
  RestrictedInstanceGroups?: ClusterRestrictedInstanceGroupSpecification[];
  RestrictedInstanceGroupsConfig?: ClusterRestrictedInstanceGroupsConfig;
  TieredStorageConfig?: ClusterTieredStorageConfig;
  NodeRecovery?: ClusterNodeRecovery;
  InstanceGroupsToDelete?: string[];
  NodeProvisioningMode?: ClusterNodeProvisioningMode;
  ClusterRole?: string;
  AutoScaling?: ClusterAutoScalingConfig;
  Orchestrator?: ClusterOrchestrator;
}
export interface UpdateClusterResponse {
  ClusterArn: string;
}
export interface UpdateClusterSchedulerConfigRequest {
  ClusterSchedulerConfigId?: string;
  TargetVersion?: number;
  SchedulerConfig?: SchedulerConfig;
  Description?: string;
}
export interface UpdateClusterSchedulerConfigResponse {
  ClusterSchedulerConfigArn: string;
  ClusterSchedulerConfigVersion: number;
}
export interface UpdateClusterSoftwareInstanceGroupSpecification {
  InstanceGroupName?: string;
  ImageReleaseVersion?: string;
}
export type UpdateClusterSoftwareInstanceGroups =
  UpdateClusterSoftwareInstanceGroupSpecification[];
export interface UpdateClusterSoftwareRequest {
  ClusterName?: string;
  InstanceGroups?: UpdateClusterSoftwareInstanceGroupSpecification[];
  DeploymentConfig?: DeploymentConfiguration;
  ImageId?: string;
}
export interface UpdateClusterSoftwareResponse {
  ClusterArn: string;
}
export interface GitConfigForUpdate {
  SecretArn?: string;
}
export interface UpdateCodeRepositoryInput {
  CodeRepositoryName?: string;
  GitConfig?: GitConfigForUpdate;
}
export interface UpdateCodeRepositoryOutput {
  CodeRepositoryArn: string;
}
export interface UpdateComputeQuotaRequest {
  ComputeQuotaId?: string;
  TargetVersion?: number;
  ComputeQuotaConfig?: ComputeQuotaConfig;
  ComputeQuotaTarget?: ComputeQuotaTarget;
  ActivationState?: ActivationState;
  Description?: string;
}
export interface UpdateComputeQuotaResponse {
  ComputeQuotaArn: string;
  ComputeQuotaVersion: number;
}
export interface UpdateContextRequest {
  ContextName?: string;
  Description?: string;
  Properties?: { [key: string]: string | undefined };
  PropertiesToRemove?: string[];
}
export interface UpdateContextResponse {
  ContextArn?: string;
}
export interface UpdateDeviceFleetRequest {
  DeviceFleetName?: string;
  RoleArn?: string;
  Description?: string;
  OutputConfig?: EdgeOutputConfig;
  EnableIotRoleAlias?: boolean;
}
export interface UpdateDeviceFleetResponse {}
export interface UpdateDevicesRequest {
  DeviceFleetName?: string;
  Devices?: Device[];
}
export interface UpdateDevicesResponse {}
export interface RStudioServerProDomainSettingsForUpdate {
  DomainExecutionRoleArn?: string;
  DefaultResourceSpec?: ResourceSpec;
  RStudioConnectUrl?: string;
  RStudioPackageManagerUrl?: string;
}
export interface DomainSettingsForUpdate {
  RStudioServerProDomainSettingsForUpdate?: RStudioServerProDomainSettingsForUpdate;
  ExecutionRoleIdentityConfig?: ExecutionRoleIdentityConfig;
  SecurityGroupIds?: string[];
  TrustedIdentityPropagationSettings?: TrustedIdentityPropagationSettings;
  DockerSettings?: DockerSettings;
  AmazonQSettings?: AmazonQSettings;
  UnifiedStudioSettings?: UnifiedStudioSettings;
  IpAddressType?: IPAddressType;
}
export interface UpdateDomainRequest {
  DomainId?: string;
  DefaultUserSettings?: UserSettings;
  DomainSettingsForUpdate?: DomainSettingsForUpdate;
  AppSecurityGroupManagement?: AppSecurityGroupManagement;
  DefaultSpaceSettings?: DefaultSpaceSettings;
  SubnetIds?: string[];
  AppNetworkAccessType?: AppNetworkAccessType;
  TagPropagation?: TagPropagation;
  HomeEfsFileSystemCreation?: HomeEfsFileSystemCreation;
  VpcId?: string;
}
export interface UpdateDomainResponse {
  DomainArn?: string;
}
export type VariantPropertyType =
  | "DesiredInstanceCount"
  | "DesiredWeight"
  | "DataCaptureConfig"
  | (string & {});
export interface VariantProperty {
  VariantPropertyType?: VariantPropertyType;
}
export type VariantPropertyList = VariantProperty[];
export interface UpdateEndpointInput {
  EndpointName?: string;
  EndpointConfigName?: string;
  RetainAllVariantProperties?: boolean;
  ExcludeRetainedVariantProperties?: VariantProperty[];
  DeploymentConfig?: DeploymentConfig;
  RetainDeploymentConfig?: boolean;
}
export interface UpdateEndpointOutput {
  EndpointArn: string;
}
export interface ProductionVariantServerlessUpdateConfig {
  MaxConcurrency?: number;
  ProvisionedConcurrency?: number;
}
export interface DesiredWeightAndCapacity {
  VariantName?: string;
  DesiredWeight?: number;
  DesiredInstanceCount?: number;
  ServerlessUpdateConfig?: ProductionVariantServerlessUpdateConfig;
}
export type DesiredWeightAndCapacityList = DesiredWeightAndCapacity[];
export interface UpdateEndpointWeightsAndCapacitiesInput {
  EndpointName?: string;
  DesiredWeightsAndCapacities?: DesiredWeightAndCapacity[];
}
export interface UpdateEndpointWeightsAndCapacitiesOutput {
  EndpointArn: string;
}
export interface UpdateExperimentRequest {
  ExperimentName?: string;
  DisplayName?: string;
  Description?: string;
}
export interface UpdateExperimentResponse {
  ExperimentArn?: string;
}
export type FeatureAdditions = FeatureDefinition[];
export interface OnlineStoreConfigUpdate {
  TtlDuration?: TtlDuration;
}
export interface ThroughputConfigUpdate {
  ThroughputMode?: ThroughputMode;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedWriteCapacityUnits?: number;
}
export interface UpdateFeatureGroupRequest {
  FeatureGroupName?: string;
  FeatureAdditions?: FeatureDefinition[];
  OnlineStoreConfig?: OnlineStoreConfigUpdate;
  ThroughputConfig?: ThroughputConfigUpdate;
}
export interface UpdateFeatureGroupResponse {
  FeatureGroupArn: string;
}
export type FeatureParameterAdditions = FeatureParameter[];
export type FeatureParameterRemovals = string[];
export interface UpdateFeatureMetadataRequest {
  FeatureGroupName?: string;
  FeatureName?: string;
  Description?: string;
  ParameterAdditions?: FeatureParameter[];
  ParameterRemovals?: string[];
}
export interface UpdateFeatureMetadataResponse {}
export interface UpdateHubRequest {
  HubName?: string;
  HubDescription?: string;
  HubDisplayName?: string;
  HubSearchKeywords?: string[];
}
export interface UpdateHubResponse {
  HubArn: string;
}
export interface UpdateHubContentRequest {
  HubName?: string;
  HubContentName?: string;
  HubContentType?: HubContentType;
  HubContentVersion?: string;
  HubContentDisplayName?: string;
  HubContentDescription?: string;
  HubContentMarkdown?: string;
  HubContentSearchKeywords?: string[];
  SupportStatus?: HubContentSupportStatus;
}
export interface UpdateHubContentResponse {
  HubArn: string;
  HubContentArn: string;
}
export interface UpdateHubContentReferenceRequest {
  HubName?: string;
  HubContentName?: string;
  HubContentType?: HubContentType;
  MinVersion?: string;
}
export interface UpdateHubContentReferenceResponse {
  HubArn: string;
  HubContentArn: string;
}
export type ImageDeleteProperty = string;
export type ImageDeletePropertyList = string[];
export interface UpdateImageRequest {
  DeleteProperties?: string[];
  Description?: string;
  DisplayName?: string;
  ImageName?: string;
  RoleArn?: string;
}
export interface UpdateImageResponse {
  ImageArn?: string;
}
export interface UpdateImageVersionRequest {
  ImageName?: string;
  Alias?: string;
  Version?: number;
  AliasesToAdd?: string[];
  AliasesToDelete?: string[];
  VendorGuidance?: VendorGuidance;
  JobType?: JobType;
  MLFramework?: string;
  ProgrammingLang?: string;
  Processor?: Processor;
  Horovod?: boolean;
  ReleaseNotes?: string;
}
export interface UpdateImageVersionResponse {
  ImageVersionArn?: string;
}
export interface UpdateInferenceComponentInput {
  InferenceComponentName?: string;
  Specification?: InferenceComponentSpecification;
  Specifications?: InferenceComponentSpecification[];
  RuntimeConfig?: InferenceComponentRuntimeConfig;
  DeploymentConfig?: InferenceComponentDeploymentConfig;
}
export interface UpdateInferenceComponentOutput {
  InferenceComponentArn: string;
}
export interface UpdateInferenceComponentRuntimeConfigInput {
  InferenceComponentName?: string;
  DesiredRuntimeConfig?: InferenceComponentRuntimeConfig;
}
export interface UpdateInferenceComponentRuntimeConfigOutput {
  InferenceComponentArn: string;
}
export interface UpdateInferenceExperimentRequest {
  Name?: string;
  Schedule?: InferenceExperimentSchedule;
  Description?: string;
  ModelVariants?: ModelVariantConfig[];
  DataStorageConfig?: InferenceExperimentDataStorageConfig;
  ShadowModeConfig?: ShadowModeConfig;
}
export interface UpdateInferenceExperimentResponse {
  InferenceExperimentArn: string;
}
export interface UpdateMlflowAppRequest {
  Arn?: string;
  Name?: string;
  ArtifactStoreUri?: string;
  ModelRegistrationMode?: ModelRegistrationMode;
  WeeklyMaintenanceWindowStart?: string;
  DefaultDomainIdList?: string[];
  AccountDefaultStatus?: AccountDefaultStatus;
}
export interface UpdateMlflowAppResponse {
  Arn?: string;
}
export interface UpdateMlflowTrackingServerRequest {
  TrackingServerName?: string;
  ArtifactStoreUri?: string;
  TrackingServerSize?: TrackingServerSize;
  AutomaticModelRegistration?: boolean;
  WeeklyMaintenanceWindowStart?: string;
  S3BucketOwnerAccountId?: string;
  S3BucketOwnerVerification?: boolean;
}
export interface UpdateMlflowTrackingServerResponse {
  TrackingServerArn?: string;
}
export interface UpdateModelCardRequest {
  ModelCardName?: string;
  Content?: string | redacted.Redacted<string>;
  ModelCardStatus?: ModelCardStatus;
}
export interface UpdateModelCardResponse {
  ModelCardArn: string;
}
export type CustomerMetadataKeyList = string[];
export interface UpdateModelPackageInput {
  ModelPackageArn?: string;
  ModelApprovalStatus?: ModelApprovalStatus;
  ModelPackageRegistrationType?: ModelPackageRegistrationType;
  ApprovalDescription?: string;
  CustomerMetadataProperties?: { [key: string]: string | undefined };
  CustomerMetadataPropertiesToRemove?: string[];
  AdditionalInferenceSpecificationsToAdd?: AdditionalInferenceSpecificationDefinition[];
  InferenceSpecification?: InferenceSpecification;
  SourceUri?: string;
  ModelCard?: ModelPackageModelCard;
  ModelLifeCycle?: ModelLifeCycle;
  ClientToken?: string;
}
export interface UpdateModelPackageOutput {
  ModelPackageArn: string;
}
export interface UpdateMonitoringAlertRequest {
  MonitoringScheduleName?: string;
  MonitoringAlertName?: string;
  DatapointsToAlert?: number;
  EvaluationPeriod?: number;
}
export interface UpdateMonitoringAlertResponse {
  MonitoringScheduleArn: string;
  MonitoringAlertName?: string;
}
export interface UpdateMonitoringScheduleRequest {
  MonitoringScheduleName?: string;
  MonitoringScheduleConfig?: MonitoringScheduleConfig;
}
export interface UpdateMonitoringScheduleResponse {
  MonitoringScheduleArn: string;
}
export type DisassociateNotebookInstanceLifecycleConfig = boolean;
export type DisassociateNotebookInstanceAcceleratorTypes = boolean;
export type DisassociateDefaultCodeRepository = boolean;
export type DisassociateAdditionalCodeRepositories = boolean;
export interface UpdateNotebookInstanceInput {
  NotebookInstanceName?: string;
  InstanceType?: InstanceType;
  IpAddressType?: IPAddressType;
  PlatformIdentifier?: string;
  RoleArn?: string;
  LifecycleConfigName?: string;
  DisassociateLifecycleConfig?: boolean;
  VolumeSizeInGB?: number;
  DefaultCodeRepository?: string;
  AdditionalCodeRepositories?: string[];
  AcceleratorTypes?: NotebookInstanceAcceleratorType[];
  DisassociateAcceleratorTypes?: boolean;
  DisassociateDefaultCodeRepository?: boolean;
  DisassociateAdditionalCodeRepositories?: boolean;
  RootAccess?: RootAccess;
  InstanceMetadataServiceConfiguration?: InstanceMetadataServiceConfiguration;
}
export interface UpdateNotebookInstanceOutput {}
export interface UpdateNotebookInstanceLifecycleConfigInput {
  NotebookInstanceLifecycleConfigName?: string;
  OnCreate?: NotebookInstanceLifecycleHook[];
  OnStart?: NotebookInstanceLifecycleHook[];
}
export interface UpdateNotebookInstanceLifecycleConfigOutput {}
export interface UpdatePartnerAppRequest {
  Arn?: string;
  MaintenanceConfig?: PartnerAppMaintenanceConfig;
  Tier?: string;
  ApplicationConfig?: PartnerAppConfig;
  IdcConfig?: IdcConfigInput;
  AuthType?: PartnerAppAuthType;
  EnableIamSessionBasedIdentity?: boolean;
  EnableAutoMinorVersionUpgrade?: boolean;
  AppVersion?: string;
  ClientToken?: string;
  Tags?: Tag[];
}
export interface UpdatePartnerAppResponse {
  Arn?: string;
}
export interface UpdatePipelineRequest {
  PipelineName?: string;
  PipelineDisplayName?: string;
  PipelineDefinition?: string;
  PipelineDefinitionS3Location?: PipelineDefinitionS3Location;
  PipelineDescription?: string;
  RoleArn?: string;
  ParallelismConfiguration?: ParallelismConfiguration;
}
export interface UpdatePipelineResponse {
  PipelineArn?: string;
  PipelineVersionId?: number;
}
export interface UpdatePipelineExecutionRequest {
  PipelineExecutionArn?: string;
  PipelineExecutionDescription?: string;
  PipelineExecutionDisplayName?: string;
  ParallelismConfiguration?: ParallelismConfiguration;
}
export interface UpdatePipelineExecutionResponse {
  PipelineExecutionArn?: string;
}
export interface UpdatePipelineVersionRequest {
  PipelineArn?: string;
  PipelineVersionId?: number;
  PipelineVersionDisplayName?: string;
  PipelineVersionDescription?: string;
}
export interface UpdatePipelineVersionResponse {
  PipelineArn?: string;
  PipelineVersionId?: number;
}
export interface ServiceCatalogProvisioningUpdateDetails {
  ProvisioningArtifactId?: string;
  ProvisioningParameters?: ProvisioningParameter[];
}
export interface CfnStackUpdateParameter {
  Key?: string;
  Value?: string;
}
export type CfnStackUpdateParameters = CfnStackUpdateParameter[];
export interface CfnUpdateTemplateProvider {
  TemplateName?: string;
  TemplateURL?: string;
  Parameters?: CfnStackUpdateParameter[];
}
export interface UpdateTemplateProvider {
  CfnTemplateProvider?: CfnUpdateTemplateProvider;
}
export type UpdateTemplateProviderList = UpdateTemplateProvider[];
export interface UpdateProjectInput {
  ProjectName?: string;
  ProjectDescription?: string;
  ServiceCatalogProvisioningUpdateDetails?: ServiceCatalogProvisioningUpdateDetails;
  Tags?: Tag[];
  TemplateProvidersToUpdate?: UpdateTemplateProvider[];
}
export interface UpdateProjectOutput {
  ProjectArn: string;
}
export interface UpdateSpaceRequest {
  DomainId?: string;
  SpaceName?: string;
  SpaceSettings?: SpaceSettings;
  SpaceDisplayName?: string;
}
export interface UpdateSpaceResponse {
  SpaceArn?: string;
}
export interface ProfilerConfigForUpdate {
  S3OutputPath?: string;
  ProfilingIntervalInMilliseconds?: number;
  ProfilingParameters?: { [key: string]: string | undefined };
  DisableProfiler?: boolean;
}
export interface ResourceConfigForUpdate {
  KeepAlivePeriodInSeconds?: number;
}
export interface RemoteDebugConfigForUpdate {
  EnableRemoteDebug?: boolean;
}
export interface UpdateTrainingJobRequest {
  TrainingJobName?: string;
  ProfilerConfig?: ProfilerConfigForUpdate;
  ProfilerRuleConfigurations?: ProfilerRuleConfiguration[];
  ResourceConfig?: ResourceConfigForUpdate;
  RemoteDebugConfig?: RemoteDebugConfigForUpdate;
}
export interface UpdateTrainingJobResponse {
  TrainingJobArn: string;
}
export interface UpdateTrialRequest {
  TrialName?: string;
  DisplayName?: string;
}
export interface UpdateTrialResponse {
  TrialArn?: string;
}
export type TrialComponentKey256 = string;
export type ListTrialComponentKey256 = string[];
export interface UpdateTrialComponentRequest {
  TrialComponentName?: string;
  DisplayName?: string;
  Status?: TrialComponentStatus;
  StartTime?: Date;
  EndTime?: Date;
  Parameters?: { [key: string]: TrialComponentParameterValue | undefined };
  ParametersToRemove?: string[];
  InputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  InputArtifactsToRemove?: string[];
  OutputArtifacts?: { [key: string]: TrialComponentArtifact | undefined };
  OutputArtifactsToRemove?: string[];
}
export interface UpdateTrialComponentResponse {
  TrialComponentArn?: string;
}
export interface UpdateUserProfileRequest {
  DomainId?: string;
  UserProfileName?: string;
  UserSettings?: UserSettings;
}
export interface UpdateUserProfileResponse {
  UserProfileArn?: string;
}
export interface UpdateWorkforceRequest {
  WorkforceName?: string;
  SourceIpConfig?: SourceIpConfig;
  OidcConfig?: OidcConfig;
  WorkforceVpcConfig?: WorkforceVpcConfigRequest;
  IpAddressType?: WorkforceIpAddressType;
}
export interface UpdateWorkforceResponse {
  Workforce: Workforce & {
    WorkforceName: WorkforceName;
    WorkforceArn: WorkforceArn;
    SourceIpConfig: SourceIpConfig & { Cidrs: Cidrs };
    CognitoConfig: CognitoConfig & {
      UserPool: CognitoUserPool;
      ClientId: ClientId;
    };
    WorkforceVpcConfig: WorkforceVpcConfigResponse & {
      VpcId: WorkforceVpcId;
      SecurityGroupIds: WorkforceSecurityGroupIds;
      Subnets: WorkforceSubnets;
    };
  };
}
export interface UpdateWorkteamRequest {
  WorkteamName?: string;
  MemberDefinitions?: MemberDefinition[];
  Description?: string;
  NotificationConfiguration?: NotificationConfiguration;
  WorkerAccessConfiguration?: WorkerAccessConfiguration;
}
export interface UpdateWorkteamResponse {
  Workteam: Workteam & {
    WorkteamName: WorkteamName;
    MemberDefinitions: (MemberDefinition & {
      CognitoMemberDefinition: CognitoMemberDefinition & {
        UserPool: CognitoUserPool;
        UserGroup: CognitoUserGroup;
        ClientId: ClientId;
      };
    })[];
    WorkteamArn: WorkteamArn;
    Description: String200;
  };
}
export type AddAssociationError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates an *association* between the source and the destination. A source can be associated with multiple destinations, and a destination can be associated with multiple sources. An association is a lineage tracking entity. For more information, see Amazon SageMaker ML Lineage Tracking.
 */
export const addAssociation: API.OperationMethod<
  AddAssociationRequest,
  AddAssociationResponse,
  AddAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SourceArn: 0, DestinationArn: 0, AssociationType: 0 },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAssociation",
})) as any;

export type AddTagsError = CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified SageMaker resource. You can add tags to notebook instances, training jobs, hyperparameter tuning jobs, batch transform jobs, models, labeling jobs, work teams, endpoint configurations, and endpoints.
 *
 * Each tag consists of a key and an optional value. Tag keys must be unique per resource. For more information about tags, see For more information, see Amazon Web Services Tagging Strategies.
 *
 * Tags that you add to a hyperparameter tuning job by calling this API are also added to any training jobs that the hyperparameter tuning job launches after you call this API, but not to training jobs that the hyperparameter tuning job launched before you called this API. To make sure that the tags associated with a hyperparameter tuning job are also added to all training jobs that the hyperparameter tuning job launches, add the tags when you first create the tuning job by specifying them in the `Tags` parameter of CreateHyperParameterTuningJob
 *
 * Tags that you add to a SageMaker Domain or User Profile by calling this API are also added to any Apps that the Domain or User Profile launches after you call this API, but not to Apps that the Domain or User Profile launched before you called this API. To make sure that the tags associated with a Domain or User Profile are also added to all Apps that the Domain or User Profile launches, add the tags when you first create the Domain or User Profile by specifying them in the `Tags` parameter of CreateDomain or CreateUserProfile.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

export type AssociateTrialComponentError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Associates a trial component with a trial. A trial component can be associated with multiple trials. To disassociate a trial component from a trial, call the DisassociateTrialComponent API.
 */
export const associateTrialComponent: API.OperationMethod<
  AssociateTrialComponentRequest,
  AssociateTrialComponentResponse,
  AssociateTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrialComponentName: 0, TrialName: 0 } },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTrialComponent",
})) as any;

export type AttachClusterNodeVolumeError = ResourceNotFound | CommonErrors;
/**
 * Attaches your Amazon Elastic Block Store (Amazon EBS) volume to a node in your EKS orchestrated HyperPod cluster.
 *
 * This API works with the Amazon Elastic Block Store (Amazon EBS) Container Storage Interface (CSI) driver to manage the lifecycle of persistent storage in your HyperPod EKS clusters.
 */
export const attachClusterNodeVolume: API.OperationMethod<
  AttachClusterNodeVolumeRequest,
  AttachClusterNodeVolumeResponse,
  AttachClusterNodeVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterArn: 0, NodeId: 0, VolumeId: 0 },
    output: { AttachTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachClusterNodeVolume",
})) as any;

export type BatchAddClusterNodesError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Adds nodes to a HyperPod cluster by incrementing the target count for one or more instance groups. This operation returns a unique `NodeLogicalId` for each node being added, which can be used to track the provisioning status of the node. This API provides a safer alternative to `UpdateCluster` for scaling operations by avoiding unintended configuration changes.
 *
 * This API is only supported for clusters using `Continuous` as the `NodeProvisioningMode`.
 */
export const batchAddClusterNodes: API.OperationMethod<
  BatchAddClusterNodesRequest,
  BatchAddClusterNodesResponse,
  BatchAddClusterNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      ClientToken: D.m({ idempotency: true }),
      NodesToAdd: D.list({
        InstanceGroupName: 0,
        IncrementTargetCountBy: 0,
        AvailabilityZones: 0,
        InstanceTypes: 0,
      }),
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAddClusterNodes",
})) as any;

export type BatchDeleteClusterNodesError = ResourceNotFound | CommonErrors;
/**
 * Deletes specific nodes within a SageMaker HyperPod cluster. `BatchDeleteClusterNodes` accepts a cluster name and a list of node IDs.
 *
 * - To safeguard your work, back up your data to Amazon S3 or an FSx for Lustre file system before invoking the API on a worker node group. This will help prevent any potential data loss from the instance root volume. For more information about backup, see Use the backup script provided by SageMaker HyperPod.
 *
 * - If you want to invoke this API on an existing cluster, you'll first need to patch the cluster by running the UpdateClusterSoftware API. For more information about patching a cluster, see Update the SageMaker HyperPod platform software of a cluster.
 */
export const batchDeleteClusterNodes: API.OperationMethod<
  BatchDeleteClusterNodesRequest,
  BatchDeleteClusterNodesResponse,
  BatchDeleteClusterNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NodeIds: 0, NodeLogicalIds: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteClusterNodes",
})) as any;

export type BatchDescribeModelPackageError = CommonErrors;
/**
 * This action batch describes a list of versioned model packages
 */
export const batchDescribeModelPackage: API.OperationMethod<
  BatchDescribeModelPackageInput,
  BatchDescribeModelPackageOutput,
  BatchDescribeModelPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelPackageArnList: 0 },
    output: { ModelPackageSummaries: D.map({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeModelPackage",
})) as any;

export type BatchRebootClusterNodesError = ResourceNotFound | CommonErrors;
/**
 * Reboots specific nodes within a SageMaker HyperPod cluster using a soft recovery mechanism. `BatchRebootClusterNodes` performs a graceful reboot of the specified nodes by calling the Amazon Elastic Compute Cloud `RebootInstances` API, which attempts to cleanly shut down the operating system before restarting the instance.
 *
 * This operation is useful for recovering from transient issues or applying certain configuration changes that require a restart.
 *
 * - Rebooting a node may cause temporary service interruption for workloads running on that node. Ensure your workloads can handle node restarts or use appropriate scheduling to minimize impact.
 *
 * - You can reboot up to 25 nodes in a single request.
 *
 * - For SageMaker HyperPod clusters using the Slurm workload manager, ensure rebooting nodes will not disrupt critical cluster operations.
 */
export const batchRebootClusterNodes: API.OperationMethod<
  BatchRebootClusterNodesRequest,
  BatchRebootClusterNodesResponse,
  BatchRebootClusterNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NodeIds: 0, NodeLogicalIds: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRebootClusterNodes",
})) as any;

export type BatchReplaceClusterNodesError = ResourceNotFound | CommonErrors;
/**
 * Replaces specific nodes within a SageMaker HyperPod cluster with new hardware. `BatchReplaceClusterNodes` terminates the specified instances and provisions new replacement instances with the same configuration but fresh hardware. The Amazon Machine Image (AMI) and instance configuration remain the same.
 *
 * This operation is useful for recovering from hardware failures or persistent issues that cannot be resolved through a reboot.
 *
 * - **Data Loss Warning:** Replacing nodes destroys all instance volumes, including both root and secondary volumes. All data stored on these volumes will be permanently lost and cannot be recovered.
 *
 * - To safeguard your work, back up your data to Amazon S3 or an FSx for Lustre file system before invoking the API on a worker node group. This will help prevent any potential data loss from the instance root volume. For more information about backup, see Use the backup script provided by SageMaker HyperPod.
 *
 * - If you want to invoke this API on an existing cluster, you'll first need to patch the cluster by running the UpdateClusterSoftware API. For more information about patching a cluster, see Update the SageMaker HyperPod platform software of a cluster.
 *
 * - You can replace up to 25 nodes in a single request.
 */
export const batchReplaceClusterNodes: API.OperationMethod<
  BatchReplaceClusterNodesRequest,
  BatchReplaceClusterNodesResponse,
  BatchReplaceClusterNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NodeIds: 0, NodeLogicalIds: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchReplaceClusterNodes",
})) as any;

export type CreateActionError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates an *action*. An action is a lineage tracking entity that represents an action or activity. For example, a model deployment or an HPO job. Generally, an action involves at least one input or output artifact. For more information, see Amazon SageMaker ML Lineage Tracking.
 */
export const createAction: API.OperationMethod<
  CreateActionRequest,
  CreateActionResponse,
  CreateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActionName: 0,
      Source: { SourceUri: 0, SourceType: 0, SourceId: 0 },
      ActionType: 0,
      Description: 0,
      Status: 0,
      Properties: 0,
      MetadataProperties: i_MetadataProperties,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAction",
})) as any;

export type CreateAIBenchmarkJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a benchmark job that runs performance benchmarks against inference infrastructure using a predefined AI workload configuration. The benchmark job measures metrics such as latency, throughput, and cost for your generative AI inference endpoints.
 */
export const createAIBenchmarkJob: API.OperationMethod<
  CreateAIBenchmarkJobRequest,
  CreateAIBenchmarkJobResponse,
  CreateAIBenchmarkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AIBenchmarkJobName: 0,
      BenchmarkTarget: {
        Endpoint: {
          Identifier: 0,
          TargetContainerHostname: 0,
          InferenceComponents: D.list({ Identifier: 0 }),
        },
      },
      OutputConfig: { S3OutputLocation: 0, MlflowConfig: i_AIMlflowConfig },
      AIWorkloadConfigIdentifier: 0,
      RoleArn: 0,
      NetworkConfig: { VpcConfig: i_VpcConfig },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIBenchmarkJob",
})) as any;

export type CreateAIRecommendationJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a recommendation job that generates intelligent optimization recommendations for generative AI inference deployments. The job analyzes your model, workload configuration, and performance targets to recommend optimal instance types, model optimization techniques (such as quantization and speculative decoding), and deployment configurations.
 */
export const createAIRecommendationJob: API.OperationMethod<
  CreateAIRecommendationJobRequest,
  CreateAIRecommendationJobResponse,
  CreateAIRecommendationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AIRecommendationJobName: 0,
      ModelSource: { S3: { S3Uri: 0 } },
      OutputConfig: {
        S3OutputLocation: 0,
        ModelPackageGroupIdentifier: 0,
        MlflowConfig: i_AIMlflowConfig,
      },
      AIWorkloadConfigIdentifier: 0,
      PerformanceTarget: { Constraints: D.list({ Metric: 0 }) },
      RoleArn: 0,
      InferenceSpecification: { Framework: 0 },
      OptimizeModel: 0,
      ComputeSpec: {
        InstanceTypes: 0,
        CapacityReservationConfig: {
          CapacityReservationPreference: 0,
          MlReservationArns: 0,
        },
      },
      AdapterSource: {
        ModelPackageArns: D.list({ AdapterId: 0, ModelPackageArn: 0 }),
        S3Uris: D.list({ AdapterId: 0, S3Uri: 0 }),
      },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIRecommendationJob",
})) as any;

export type CreateAIWorkloadConfigError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a reusable AI workload configuration that defines datasets, data sources, and benchmark tool settings for consistent performance testing of generative AI inference deployments on Amazon SageMaker AI.
 */
export const createAIWorkloadConfig: API.OperationMethod<
  CreateAIWorkloadConfigRequest,
  CreateAIWorkloadConfigResponse,
  CreateAIWorkloadConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AIWorkloadConfigName: 0,
      DatasetConfig: {
        InputDataConfig: D.list({
          ChannelName: 0,
          DataSource: { S3DataSource: { S3Uri: 0 } },
        }),
      },
      AIWorkloadConfigs: { WorkloadSpec: { Inline: 0 } },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIWorkloadConfig",
})) as any;

export type CreateAlgorithmError = CommonErrors;
/**
 * Create a machine learning algorithm that you can use in SageMaker and list in the Amazon Web Services Marketplace.
 */
export const createAlgorithm: API.OperationMethod<
  CreateAlgorithmInput,
  CreateAlgorithmOutput,
  CreateAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AlgorithmName: 0,
      AlgorithmDescription: 0,
      TrainingSpecification: {
        TrainingImage: 0,
        TrainingImageDigest: 0,
        SupportedHyperParameters: D.list({
          Name: 0,
          Description: 0,
          Type: 0,
          Range: {
            IntegerParameterRangeSpecification: { MinValue: 0, MaxValue: 0 },
            ContinuousParameterRangeSpecification: { MinValue: 0, MaxValue: 0 },
            CategoricalParameterRangeSpecification: { Values: 0 },
          },
          IsTunable: 0,
          IsRequired: 0,
          DefaultValue: 0,
        }),
        SupportedTrainingInstanceTypes: 0,
        SupportsDistributedTraining: 0,
        MetricDefinitions: D.list(i_MetricDefinition),
        TrainingChannels: D.list({
          Name: 0,
          Description: 0,
          IsRequired: 0,
          SupportedContentTypes: 0,
          SupportedCompressionTypes: 0,
          SupportedInputModes: 0,
        }),
        SupportedTuningJobObjectiveMetrics: D.list(
          i_HyperParameterTuningJobObjective,
        ),
        AdditionalS3DataSource: i_AdditionalS3DataSource,
      },
      InferenceSpecification: i_InferenceSpecification,
      ValidationSpecification: {
        ValidationRole: 0,
        ValidationProfiles: D.list({
          ProfileName: 0,
          TrainingJobDefinition: {
            TrainingInputMode: 0,
            HyperParameters: 0,
            InputDataConfig: D.list(i_Channel),
            OutputDataConfig: i_OutputDataConfig,
            ResourceConfig: i_ResourceConfig,
            StoppingCondition: i_StoppingCondition,
          },
          TransformJobDefinition: i_TransformJobDefinition,
        }),
      },
      CertifyForMarketplace: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlgorithm",
})) as any;

export type CreateAppError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a running app for the specified UserProfile. This operation is automatically invoked by Amazon SageMaker AI upon access to the associated Domain, and when new kernel configurations are selected by the user. A user may have multiple Apps active simultaneously.
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      UserProfileName: 0,
      SpaceName: 0,
      AppType: 0,
      AppName: 0,
      Tags: D.list(i_Tag),
      ResourceSpec: i_ResourceSpec,
      RecoveryMode: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApp",
})) as any;

export type CreateAppImageConfigError = ResourceInUse | CommonErrors;
/**
 * Creates a configuration for running a SageMaker AI image as a KernelGateway app. The configuration specifies the Amazon Elastic File System storage volume on the image, and a list of the kernels in the image.
 */
export const createAppImageConfig: API.OperationMethod<
  CreateAppImageConfigRequest,
  CreateAppImageConfigResponse,
  CreateAppImageConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AppImageConfigName: 0,
      Tags: D.list(i_Tag),
      KernelGatewayImageConfig: i_KernelGatewayImageConfig,
      JupyterLabAppImageConfig: i_JupyterLabAppImageConfig,
      CodeEditorAppImageConfig: i_CodeEditorAppImageConfig,
    },
  },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppImageConfig",
})) as any;

export type CreateArtifactError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates an *artifact*. An artifact is a lineage tracking entity that represents a URI addressable object or data. Some examples are the S3 URI of a dataset and the ECR registry path of an image. For more information, see Amazon SageMaker ML Lineage Tracking.
 */
export const createArtifact: API.OperationMethod<
  CreateArtifactRequest,
  CreateArtifactResponse,
  CreateArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArtifactName: 0,
      Source: i_ArtifactSource,
      ArtifactType: 0,
      Properties: 0,
      MetadataProperties: i_MetadataProperties,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateArtifact",
})) as any;

export type CreateAutoMLJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an Autopilot job also referred to as Autopilot experiment or AutoML job.
 *
 * An AutoML job in SageMaker AI is a fully automated process that allows you to build machine learning models with minimal effort and machine learning expertise. When initiating an AutoML job, you provide your data and optionally specify parameters tailored to your use case. SageMaker AI then automates the entire model development lifecycle, including data preprocessing, model training, tuning, and evaluation. AutoML jobs are designed to simplify and accelerate the model building process by automating various tasks and exploring different combinations of machine learning algorithms, data preprocessing techniques, and hyperparameter values. The output of an AutoML job comprises one or more trained models ready for deployment and inference. Additionally, SageMaker AI AutoML jobs generate a candidate model leaderboard, allowing you to select the best-performing model for deployment.
 *
 * For more information about AutoML jobs, see https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html in the SageMaker AI developer guide.
 *
 * We recommend using the new versions CreateAutoMLJobV2 and DescribeAutoMLJobV2, which offer backward compatibility.
 *
 * `CreateAutoMLJobV2` can manage tabular problem types identical to those of its previous version `CreateAutoMLJob`, as well as time-series forecasting, non-tabular problem types such as image or text classification, and text generation (LLMs fine-tuning).
 *
 * Find guidelines about how to migrate a `CreateAutoMLJob` to `CreateAutoMLJobV2` in Migrate a CreateAutoMLJob to CreateAutoMLJobV2.
 *
 * You can find the best-performing model after you run an AutoML job by calling DescribeAutoMLJobV2 (recommended) or DescribeAutoMLJob.
 */
export const createAutoMLJob: API.OperationMethod<
  CreateAutoMLJobRequest,
  CreateAutoMLJobResponse,
  CreateAutoMLJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoMLJobName: 0,
      InputDataConfig: D.list({
        DataSource: i_AutoMLDataSource,
        CompressionType: 0,
        TargetAttributeName: 0,
        ContentType: 0,
        ChannelType: 0,
        SampleWeightAttributeName: 0,
      }),
      OutputDataConfig: i_AutoMLOutputDataConfig,
      ProblemType: 0,
      AutoMLJobObjective: i_AutoMLJobObjective,
      AutoMLJobConfig: {
        CompletionCriteria: i_AutoMLJobCompletionCriteria,
        SecurityConfig: i_AutoMLSecurityConfig,
        CandidateGenerationConfig: {
          FeatureSpecificationS3Uri: 0,
          AlgorithmsConfig: D.list(i_AutoMLAlgorithmConfig),
        },
        DataSplitConfig: i_AutoMLDataSplitConfig,
        Mode: 0,
      },
      RoleArn: 0,
      GenerateCandidateDefinitionsOnly: 0,
      Tags: D.list(i_Tag),
      ModelDeployConfig: i_ModelDeployConfig,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoMLJob",
})) as any;

export type CreateAutoMLJobV2Error =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an Autopilot job also referred to as Autopilot experiment or AutoML job V2.
 *
 * An AutoML job in SageMaker AI is a fully automated process that allows you to build machine learning models with minimal effort and machine learning expertise. When initiating an AutoML job, you provide your data and optionally specify parameters tailored to your use case. SageMaker AI then automates the entire model development lifecycle, including data preprocessing, model training, tuning, and evaluation. AutoML jobs are designed to simplify and accelerate the model building process by automating various tasks and exploring different combinations of machine learning algorithms, data preprocessing techniques, and hyperparameter values. The output of an AutoML job comprises one or more trained models ready for deployment and inference. Additionally, SageMaker AI AutoML jobs generate a candidate model leaderboard, allowing you to select the best-performing model for deployment.
 *
 * For more information about AutoML jobs, see https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html in the SageMaker AI developer guide.
 *
 * AutoML jobs V2 support various problem types such as regression, binary, and multiclass classification with tabular data, text and image classification, time-series forecasting, and fine-tuning of large language models (LLMs) for text generation.
 *
 * CreateAutoMLJobV2 and DescribeAutoMLJobV2 are new versions of CreateAutoMLJob and DescribeAutoMLJob which offer backward compatibility.
 *
 * `CreateAutoMLJobV2` can manage tabular problem types identical to those of its previous version `CreateAutoMLJob`, as well as time-series forecasting, non-tabular problem types such as image or text classification, and text generation (LLMs fine-tuning).
 *
 * Find guidelines about how to migrate a `CreateAutoMLJob` to `CreateAutoMLJobV2` in Migrate a CreateAutoMLJob to CreateAutoMLJobV2.
 *
 * For the list of available problem types supported by `CreateAutoMLJobV2`, see AutoMLProblemTypeConfig.
 *
 * You can find the best-performing model after you run an AutoML job V2 by calling DescribeAutoMLJobV2.
 */
export const createAutoMLJobV2: API.OperationMethod<
  CreateAutoMLJobV2Request,
  CreateAutoMLJobV2Response,
  CreateAutoMLJobV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoMLJobName: 0,
      AutoMLJobInputDataConfig: D.list({
        ChannelType: 0,
        ContentType: 0,
        CompressionType: 0,
        DataSource: i_AutoMLDataSource,
      }),
      OutputDataConfig: i_AutoMLOutputDataConfig,
      AutoMLProblemTypeConfig: {
        ImageClassificationJobConfig: {
          CompletionCriteria: i_AutoMLJobCompletionCriteria,
        },
        TextClassificationJobConfig: {
          CompletionCriteria: i_AutoMLJobCompletionCriteria,
          ContentColumn: 0,
          TargetLabelColumn: 0,
        },
        TimeSeriesForecastingJobConfig: {
          FeatureSpecificationS3Uri: 0,
          CompletionCriteria: i_AutoMLJobCompletionCriteria,
          ForecastFrequency: 0,
          ForecastHorizon: 0,
          ForecastQuantiles: 0,
          Transformations: { Filling: 0, Aggregation: 0 },
          TimeSeriesConfig: {
            TargetAttributeName: 0,
            TimestampAttributeName: 0,
            ItemIdentifierAttributeName: 0,
            GroupingAttributeNames: 0,
          },
          HolidayConfig: D.list({ CountryCode: 0 }),
          CandidateGenerationConfig: i_CandidateGenerationConfig,
        },
        TabularJobConfig: {
          CandidateGenerationConfig: i_CandidateGenerationConfig,
          CompletionCriteria: i_AutoMLJobCompletionCriteria,
          FeatureSpecificationS3Uri: 0,
          Mode: 0,
          GenerateCandidateDefinitionsOnly: 0,
          ProblemType: 0,
          TargetAttributeName: 0,
          SampleWeightAttributeName: 0,
        },
        TextGenerationJobConfig: {
          CompletionCriteria: i_AutoMLJobCompletionCriteria,
          BaseModelName: 0,
          TextGenerationHyperParameters: 0,
          ModelAccessConfig: i_ModelAccessConfig,
        },
      },
      RoleArn: 0,
      Tags: D.list(i_Tag),
      SecurityConfig: i_AutoMLSecurityConfig,
      AutoMLJobObjective: i_AutoMLJobObjective,
      ModelDeployConfig: i_ModelDeployConfig,
      DataSplitConfig: i_AutoMLDataSplitConfig,
      AutoMLComputeConfig: {
        EmrServerlessComputeConfig: { ExecutionRoleARN: 0 },
      },
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoMLJobV2",
})) as any;

export type CreateClusterError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an Amazon SageMaker HyperPod cluster. SageMaker HyperPod is a capability of SageMaker for creating and managing persistent clusters for developing large machine learning models, such as large language models (LLMs) and diffusion models. To learn more, see Amazon SageMaker HyperPod in the *Amazon SageMaker Developer Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      InstanceGroups: D.list(i_ClusterInstanceGroupSpecification),
      RestrictedInstanceGroups: D.list(
        i_ClusterRestrictedInstanceGroupSpecification,
      ),
      RestrictedInstanceGroupsConfig: i_ClusterRestrictedInstanceGroupsConfig,
      VpcConfig: i_VpcConfig,
      Tags: D.list(i_Tag),
      Orchestrator: i_ClusterOrchestrator,
      NodeRecovery: 0,
      TieredStorageConfig: i_ClusterTieredStorageConfig,
      NodeProvisioningMode: 0,
      ClusterRole: 0,
      AutoScaling: i_ClusterAutoScalingConfig,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateClusterSchedulerConfigError =
  | ConflictException
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Create cluster policy configuration. This policy is used for task prioritization and fair-share allocation of idle compute. This helps prioritize critical workloads and distributes idle compute across entities.
 */
export const createClusterSchedulerConfig: API.OperationMethod<
  CreateClusterSchedulerConfigRequest,
  CreateClusterSchedulerConfigResponse,
  CreateClusterSchedulerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ClusterArn: 0,
      SchedulerConfig: i_SchedulerConfig,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSchedulerConfig",
})) as any;

export type CreateCodeRepositoryError = CommonErrors;
/**
 * Creates a Git repository as a resource in your SageMaker AI account. You can associate the repository with notebook instances so that you can use Git source control for the notebooks you create. The Git repository is a resource in your SageMaker AI account, so it can be associated with more than one notebook instance, and it persists independently from the lifecycle of any notebook instances it is associated with.
 *
 * The repository can be hosted either in Amazon Web Services CodeCommit or in any other Git repository.
 */
export const createCodeRepository: API.OperationMethod<
  CreateCodeRepositoryInput,
  CreateCodeRepositoryOutput,
  CreateCodeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CodeRepositoryName: 0,
      GitConfig: { RepositoryUrl: 0, Branch: 0, SecretArn: 0 },
      Tags: D.list(i_Tag),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeRepository",
})) as any;

export type CreateCompilationJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Starts a model compilation job. After the model has been compiled, Amazon SageMaker AI saves the resulting model artifacts to an Amazon Simple Storage Service (Amazon S3) bucket that you specify.
 *
 * If you choose to host your model using Amazon SageMaker AI hosting services, you can use the resulting model artifacts as part of the model. You can also use the artifacts with Amazon Web Services IoT Greengrass. In that case, deploy them as an ML resource.
 *
 * In the request body, you provide the following:
 *
 * - A name for the compilation job
 *
 * - Information about the input model artifacts
 *
 * - The output location for the compiled model and the device (target) that the model runs on
 *
 * - The Amazon Resource Name (ARN) of the IAM role that Amazon SageMaker AI assumes to perform the model compilation job.
 *
 * You can also provide a `Tag` to track the model compilation job's resource use and costs. The response body contains the `CompilationJobArn` for the compiled job.
 *
 * To stop a model compilation job, use StopCompilationJob. To get information about a particular model compilation job, use DescribeCompilationJob. To get information about multiple model compilation jobs, use ListCompilationJobs.
 */
export const createCompilationJob: API.OperationMethod<
  CreateCompilationJobRequest,
  CreateCompilationJobResponse,
  CreateCompilationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CompilationJobName: 0,
      RoleArn: 0,
      ModelPackageVersionArn: 0,
      InputConfig: {
        S3Uri: 0,
        DataInputConfig: 0,
        Framework: 0,
        FrameworkVersion: 0,
      },
      OutputConfig: {
        S3OutputLocation: 0,
        TargetDevice: 0,
        TargetPlatform: { Os: 0, Arch: 0, Accelerator: 0 },
        CompilerOptions: 0,
        KmsKeyId: 0,
      },
      VpcConfig: { SecurityGroupIds: 0, Subnets: 0 },
      StoppingCondition: i_StoppingCondition,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCompilationJob",
})) as any;

export type CreateComputeQuotaError =
  | ConflictException
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Create compute allocation definition. This defines how compute is allocated, shared, and borrowed for specified entities. Specifically, how to lend and borrow idle compute and assign a fair-share weight to the specified entities.
 */
export const createComputeQuota: API.OperationMethod<
  CreateComputeQuotaRequest,
  CreateComputeQuotaResponse,
  CreateComputeQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ClusterArn: 0,
      ComputeQuotaConfig: i_ComputeQuotaConfig,
      ComputeQuotaTarget: i_ComputeQuotaTarget,
      ActivationState: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputeQuota",
})) as any;

export type CreateContextError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates a *context*. A context is a lineage tracking entity that represents a logical grouping of other tracking or experiment entities. Some examples are an endpoint and a model package. For more information, see Amazon SageMaker ML Lineage Tracking.
 */
export const createContext: API.OperationMethod<
  CreateContextRequest,
  CreateContextResponse,
  CreateContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContextName: 0,
      Source: { SourceUri: 0, SourceType: 0, SourceId: 0 },
      ContextType: 0,
      Description: 0,
      Properties: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContext",
})) as any;

export type CreateDataQualityJobDefinitionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a definition for a job that monitors data quality and drift. For information about model monitor, see Amazon SageMaker AI Model Monitor.
 */
export const createDataQualityJobDefinition: API.OperationMethod<
  CreateDataQualityJobDefinitionRequest,
  CreateDataQualityJobDefinitionResponse,
  CreateDataQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobDefinitionName: 0,
      DataQualityBaselineConfig: {
        BaseliningJobName: 0,
        ConstraintsResource: i_MonitoringConstraintsResource,
        StatisticsResource: i_MonitoringStatisticsResource,
      },
      DataQualityAppSpecification: {
        ImageUri: 0,
        ContainerEntrypoint: 0,
        ContainerArguments: 0,
        RecordPreprocessorSourceUri: 0,
        PostAnalyticsProcessorSourceUri: 0,
        Environment: 0,
      },
      DataQualityJobInput: {
        EndpointInput: i_EndpointInput,
        BatchTransformInput: i_BatchTransformInput,
      },
      DataQualityJobOutputConfig: i_MonitoringOutputConfig,
      JobResources: i_MonitoringResources,
      NetworkConfig: i_MonitoringNetworkConfig,
      RoleArn: 0,
      StoppingCondition: i_MonitoringStoppingCondition,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataQualityJobDefinition",
})) as any;

export type CreateDeviceFleetError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a device fleet.
 */
export const createDeviceFleet: API.OperationMethod<
  CreateDeviceFleetRequest,
  CreateDeviceFleetResponse,
  CreateDeviceFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeviceFleetName: 0,
      RoleArn: 0,
      Description: 0,
      OutputConfig: i_EdgeOutputConfig,
      Tags: D.list(i_Tag),
      EnableIotRoleAlias: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceFleet",
})) as any;

export type CreateDomainError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a `Domain`. A domain consists of an associated Amazon Elastic File System volume, a list of authorized users, and a variety of security, application, policy, and Amazon Virtual Private Cloud (VPC) configurations. Users within a domain can share notebook files and other artifacts with each other.
 *
 * **EFS storage**
 *
 * When a domain is created, an EFS volume is created for use by all of the users within the domain. Each user receives a private home directory within the EFS volume for notebooks, Git repositories, and data files.
 *
 * SageMaker AI uses the Amazon Web Services Key Management Service (Amazon Web Services KMS) to encrypt the EFS volume attached to the domain with an Amazon Web Services managed key by default. For more control, you can specify a customer managed key. For more information, see Protect Data at Rest Using Encryption.
 *
 * **VPC configuration**
 *
 * All traffic between the domain and the Amazon EFS volume is through the specified VPC and subnets. For other traffic, you can specify the `AppNetworkAccessType` parameter. `AppNetworkAccessType` corresponds to the network access type that you choose when you onboard to the domain. The following options are available:
 *
 * - `PublicInternetOnly` - Non-EFS traffic goes through a VPC managed by Amazon SageMaker AI, which allows internet access. This is the default value.
 *
 * - `VpcOnly` - All traffic is through the specified VPC and subnets. Internet access is disabled by default. To allow internet access, you must specify a NAT gateway.
 *
 * When internet access is disabled, you won't be able to run a Amazon SageMaker AI Studio notebook or to train or host models unless your VPC has an interface endpoint to the SageMaker AI API and runtime or a NAT gateway and your security groups allow outbound connections.
 *
 * NFS traffic over TCP on port 2049 needs to be allowed in both inbound and outbound rules in order to launch a Amazon SageMaker AI Studio app successfully.
 *
 * For more information, see Connect Amazon SageMaker AI Studio Notebooks to Resources in a VPC.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      AuthMode: 0,
      DefaultUserSettings: i_UserSettings,
      DomainSettings: {
        SecurityGroupIds: 0,
        RStudioServerProDomainSettings: {
          DomainExecutionRoleArn: 0,
          RStudioConnectUrl: 0,
          RStudioPackageManagerUrl: 0,
          DefaultResourceSpec: i_ResourceSpec,
        },
        ExecutionRoleIdentityConfig: 0,
        TrustedIdentityPropagationSettings:
          i_TrustedIdentityPropagationSettings,
        DockerSettings: i_DockerSettings,
        AmazonQSettings: i_AmazonQSettings,
        UnifiedStudioSettings: i_UnifiedStudioSettings,
        IpAddressType: 0,
      },
      SubnetIds: 0,
      VpcId: 0,
      Tags: D.list(i_Tag),
      AppNetworkAccessType: 0,
      HomeEfsFileSystemKmsKeyId: 0,
      KmsKeyId: 0,
      AppSecurityGroupManagement: 0,
      HomeEfsFileSystemCreation: 0,
      TagPropagation: 0,
      DefaultSpaceSettings: i_DefaultSpaceSettings,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type CreateEdgeDeploymentPlanError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an edge deployment plan, consisting of multiple stages. Each stage may have a different deployment configuration and devices.
 */
export const createEdgeDeploymentPlan: API.OperationMethod<
  CreateEdgeDeploymentPlanRequest,
  CreateEdgeDeploymentPlanResponse,
  CreateEdgeDeploymentPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EdgeDeploymentPlanName: 0,
      ModelConfigs: D.list({ ModelHandle: 0, EdgePackagingJobName: 0 }),
      DeviceFleetName: 0,
      Stages: D.list(i_DeploymentStage),
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEdgeDeploymentPlan",
})) as any;

export type CreateEdgeDeploymentStageError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a new stage in an existing edge deployment plan.
 */
export const createEdgeDeploymentStage: API.OperationMethod<
  CreateEdgeDeploymentStageRequest,
  CreateEdgeDeploymentStageResponse,
  CreateEdgeDeploymentStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgeDeploymentPlanName: 0, Stages: D.list(i_DeploymentStage) },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEdgeDeploymentStage",
})) as any;

export type CreateEdgePackagingJobError = ResourceLimitExceeded | CommonErrors;
/**
 * Starts a SageMaker Edge Manager model packaging job. Edge Manager will use the model artifacts from the Amazon Simple Storage Service bucket that you specify. After the model has been packaged, Amazon SageMaker saves the resulting artifacts to an S3 bucket that you specify.
 */
export const createEdgePackagingJob: API.OperationMethod<
  CreateEdgePackagingJobRequest,
  CreateEdgePackagingJobResponse,
  CreateEdgePackagingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EdgePackagingJobName: 0,
      CompilationJobName: 0,
      ModelName: 0,
      ModelVersion: 0,
      RoleArn: 0,
      OutputConfig: i_EdgeOutputConfig,
      ResourceKey: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEdgePackagingJob",
})) as any;

export type CreateEndpointError =
  | ResourceLimitExceeded
  | EndpointConfigNotFound
  | EndpointAlreadyExists
  | CommonErrors;
/**
 * Creates an endpoint using the endpoint configuration specified in the request. SageMaker uses the endpoint to provision resources and deploy models. You create the endpoint configuration with the CreateEndpointConfig API.
 *
 * Use this API to deploy models using SageMaker hosting services.
 *
 * You must not delete an `EndpointConfig` that is in use by an endpoint that is live or while the `UpdateEndpoint` or `CreateEndpoint` operations are being performed on the endpoint. To update an endpoint, you must create a new `EndpointConfig`.
 *
 * The endpoint name must be unique within an Amazon Web Services Region in your Amazon Web Services account.
 *
 * When it receives the request, SageMaker creates the endpoint, launches the resources (ML compute instances), and deploys the model(s) on them.
 *
 * When you call CreateEndpoint, a load call is made to DynamoDB to verify that your endpoint configuration exists. When you read data from a DynamoDB table supporting `Eventually Consistent Reads` , the response might not reflect the results of a recently completed write operation. The response might include some stale data. If the dependent entities are not yet in DynamoDB, this causes a validation error. If you repeat your read request after a short time, the response should return the latest data. So retry logic is recommended to handle these possible issues. We also recommend that customers call DescribeEndpointConfig before calling CreateEndpoint to minimize the potential impact of a DynamoDB eventually consistent read.
 *
 * When SageMaker receives the request, it sets the endpoint status to `Creating`. After it creates the endpoint, it sets the status to `InService`. SageMaker can then process incoming requests for inferences. To check the status of an endpoint, use the DescribeEndpoint API.
 *
 * If any of the models hosted at this endpoint get model data from an Amazon S3 location, SageMaker uses Amazon Web Services Security Token Service to download model artifacts from the S3 path you provided. Amazon Web Services STS is activated in your Amazon Web Services account by default. If you previously deactivated Amazon Web Services STS for a region, you need to reactivate Amazon Web Services STS for that region. For more information, see Activating and Deactivating Amazon Web Services STS in an Amazon Web Services Region in the *Amazon Web Services Identity and Access Management User Guide*.
 *
 * To add the IAM role policies for using this API operation, go to the IAM console, and choose Roles in the left navigation pane. Search the IAM role that you want to grant access to use the CreateEndpoint and CreateEndpointConfig API operations, add the following policies to the role.
 *
 * - Option 1: For a full SageMaker access, search and attach the `AmazonSageMakerFullAccess` policy.
 *
 * - Option 2: For granting a limited access to an IAM role, paste the following Action elements manually into the JSON file of the IAM role:
 *
 * `"Action": ["sagemaker:CreateEndpoint", "sagemaker:CreateEndpointConfig"]`
 *
 * `"Resource": [`
 *
 * `"arn:aws:sagemaker:region:account-id:endpoint/endpointName"`
 *
 * `"arn:aws:sagemaker:region:account-id:endpoint-config/endpointConfigName"`
 *
 * `]`
 *
 * For more information, see SageMaker API Permissions: Actions, Permissions, and Resources Reference.
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointInput,
  CreateEndpointOutput,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      EndpointConfigName: 0,
      DeploymentConfig: i_DeploymentConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ResourceLimitExceeded,
    EndpointConfigNotFound,
    EndpointAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
})) as any;

export type CreateEndpointConfigError =
  | ResourceLimitExceeded
  | EndpointConfigAlreadyExists
  | CommonErrors;
/**
 * Creates an endpoint configuration that SageMaker hosting services uses to deploy models. In the configuration, you identify one or more models, created using the `CreateModel` API, to deploy and the resources that you want SageMaker to provision. Then you call the CreateEndpoint API.
 *
 * Use this API if you want to use SageMaker hosting services to deploy models into production.
 *
 * In the request, you define a `ProductionVariant`, for each model that you want to deploy. Each `ProductionVariant` parameter also describes the resources that you want SageMaker to provision. This includes the number and type of ML compute instances to deploy.
 *
 * If you are hosting multiple models, you also assign a `VariantWeight` to specify how much traffic you want to allocate to each model. For example, suppose that you want to host two models, A and B, and you assign traffic weight 2 for model A and 1 for model B. SageMaker distributes two-thirds of the traffic to Model A, and one-third to model B.
 *
 * When you call CreateEndpoint, a load call is made to DynamoDB to verify that your endpoint configuration exists. When you read data from a DynamoDB table supporting `Eventually Consistent Reads` , the response might not reflect the results of a recently completed write operation. The response might include some stale data. If the dependent entities are not yet in DynamoDB, this causes a validation error. If you repeat your read request after a short time, the response should return the latest data. So retry logic is recommended to handle these possible issues. We also recommend that customers call DescribeEndpointConfig before calling CreateEndpoint to minimize the potential impact of a DynamoDB eventually consistent read.
 */
export const createEndpointConfig: API.OperationMethod<
  CreateEndpointConfigInput,
  CreateEndpointConfigOutput,
  CreateEndpointConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointConfigName: 0,
      ProductionVariants: D.list(i_ProductionVariant),
      DataCaptureConfig: {
        EnableCapture: 0,
        InitialSamplingPercentage: 0,
        DestinationS3Uri: 0,
        KmsKeyId: 0,
        CaptureOptions: D.list({ CaptureMode: 0 }),
        CaptureContentTypeHeader: i_CaptureContentTypeHeader,
      },
      Tags: D.list(i_Tag),
      KmsKeyId: 0,
      AsyncInferenceConfig: {
        ClientConfig: { MaxConcurrentInvocationsPerInstance: 0 },
        OutputConfig: {
          KmsKeyId: 0,
          S3OutputPath: 0,
          NotificationConfig: {
            SuccessTopic: 0,
            ErrorTopic: 0,
            IncludeInferenceResponseIn: 0,
          },
          S3FailurePath: 0,
        },
      },
      ExplainerConfig: {
        ClarifyExplainerConfig: {
          EnableExplanations: 0,
          InferenceConfig: {
            FeaturesAttribute: 0,
            ContentTemplate: 0,
            MaxRecordCount: 0,
            MaxPayloadInMB: 0,
            ProbabilityIndex: 0,
            LabelIndex: 0,
            ProbabilityAttribute: 0,
            LabelAttribute: 0,
            LabelHeaders: 0,
            FeatureHeaders: 0,
            FeatureTypes: 0,
          },
          ShapConfig: {
            ShapBaselineConfig: {
              MimeType: 0,
              ShapBaseline: 0,
              ShapBaselineUri: 0,
            },
            NumberOfSamples: 0,
            UseLogit: 0,
            Seed: 0,
            TextConfig: { Language: 0, Granularity: 0 },
          },
        },
      },
      ShadowProductionVariants: D.list(i_ProductionVariant),
      ExecutionRoleArn: 0,
      VpcConfig: i_VpcConfig,
      EnableNetworkIsolation: 0,
      MetricsConfig: {
        EnableEnhancedMetrics: 0,
        EnableDetailedObservability: 0,
        MetricPublishFrequencyInSeconds: 0,
      },
    },
  },
  errors: [ResourceLimitExceeded, EndpointConfigAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointConfig",
})) as any;

export type CreateExperimentError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates a SageMaker *experiment*. An experiment is a collection of *trials* that are observed, compared and evaluated as a group. A trial is a set of steps, called *trial components*, that produce a machine learning model.
 *
 * In the Studio UI, trials are referred to as *run groups* and trial components are referred to as *runs*.
 *
 * The goal of an experiment is to determine the components that produce the best model. Multiple trials are performed, each one isolating and measuring the impact of a change to one or more inputs, while keeping the remaining inputs constant.
 *
 * When you use SageMaker Studio or the SageMaker Python SDK, all experiments, trials, and trial components are automatically tracked, logged, and indexed. When you use the Amazon Web Services SDK for Python (Boto), you must use the logging APIs provided by the SDK.
 *
 * You can add tags to experiments, trials, trial components and then use the Search API to search for the tags.
 *
 * To add a description to an experiment, specify the optional `Description` parameter. To add a description later, or to change the description, call the UpdateExperiment API.
 *
 * To get a list of all your experiments, call the ListExperiments API. To view an experiment's properties, call the DescribeExperiment API. To get a list of all the trials associated with an experiment, call the ListTrials API. To create a trial call the CreateTrial API.
 */
export const createExperiment: API.OperationMethod<
  CreateExperimentRequest,
  CreateExperimentResponse,
  CreateExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ExperimentName: 0,
      DisplayName: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExperiment",
})) as any;

export type CreateFeatureGroupError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Create a new `FeatureGroup`. A `FeatureGroup` is a group of `Features` defined in the `FeatureStore` to describe a `Record`.
 *
 * The `FeatureGroup` defines the schema and features contained in the `FeatureGroup`. A `FeatureGroup` definition is composed of a list of `Features`, a `RecordIdentifierFeatureName`, an `EventTimeFeatureName` and configurations for its `OnlineStore` and `OfflineStore`. Check Amazon Web Services service quotas to see the `FeatureGroup`s quota for your Amazon Web Services account.
 *
 * Note that it can take approximately 10-15 minutes to provision an `OnlineStore` `FeatureGroup` with the `InMemory` `StorageType`.
 *
 * You must include at least one of `OnlineStoreConfig` and `OfflineStoreConfig` to create a `FeatureGroup`.
 */
export const createFeatureGroup: API.OperationMethod<
  CreateFeatureGroupRequest,
  CreateFeatureGroupResponse,
  CreateFeatureGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FeatureGroupName: 0,
      RecordIdentifierFeatureName: 0,
      EventTimeFeatureName: 0,
      FeatureDefinitions: D.list(i_FeatureDefinition),
      OnlineStoreConfig: {
        SecurityConfig: { KmsKeyId: 0 },
        EnableOnlineStore: 0,
        TtlDuration: i_TtlDuration,
        StorageType: 0,
      },
      OfflineStoreConfig: {
        S3StorageConfig: { S3Uri: 0, KmsKeyId: 0, ResolvedOutputS3Uri: 0 },
        DisableGlueTableCreation: 0,
        DataCatalogConfig: { TableName: 0, Catalog: 0, Database: 0 },
        TableFormat: 0,
      },
      ThroughputConfig: {
        ThroughputMode: 0,
        ProvisionedReadCapacityUnits: 0,
        ProvisionedWriteCapacityUnits: 0,
      },
      RoleArn: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFeatureGroup",
})) as any;

export type CreateFlowDefinitionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a flow definition.
 */
export const createFlowDefinition: API.OperationMethod<
  CreateFlowDefinitionRequest,
  CreateFlowDefinitionResponse,
  CreateFlowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FlowDefinitionName: 0,
      HumanLoopRequestSource: { AwsManagedHumanLoopRequestSource: 0 },
      HumanLoopActivationConfig: {
        HumanLoopActivationConditionsConfig: {
          HumanLoopActivationConditions: 0,
        },
      },
      HumanLoopConfig: {
        WorkteamArn: 0,
        HumanTaskUiArn: 0,
        TaskTitle: 0,
        TaskDescription: 0,
        TaskCount: 0,
        TaskAvailabilityLifetimeInSeconds: 0,
        TaskTimeLimitInSeconds: 0,
        TaskKeywords: 0,
        PublicWorkforceTaskPrice: i_PublicWorkforceTaskPrice,
      },
      OutputConfig: { S3OutputPath: 0, KmsKeyId: 0 },
      RoleArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlowDefinition",
})) as any;

export type CreateHubError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Create a hub.
 */
export const createHub: API.OperationMethod<
  CreateHubRequest,
  CreateHubResponse,
  CreateHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubDescription: 0,
      HubDisplayName: 0,
      HubSearchKeywords: 0,
      S3StorageConfig: { S3OutputPath: 0 },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHub",
})) as any;

export type CreateHubContentPresignedUrlsError = CommonErrors;
/**
 * Creates presigned URLs for accessing hub content artifacts. This operation generates time-limited, secure URLs that allow direct download of model artifacts and associated files from Amazon SageMaker hub content, including gated models that require end-user license agreement acceptance.
 */
export const createHubContentPresignedUrls: API.PaginatedOperationMethod<
  CreateHubContentPresignedUrlsRequest,
  CreateHubContentPresignedUrlsResponse,
  CreateHubContentPresignedUrlsError,
  Credentials | HttpClient.HttpClient,
  AuthorizedUrl
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentType: 0,
      HubContentName: 0,
      HubContentVersion: 0,
      AccessConfig: { AcceptEula: 0, ExpectedS3Url: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHubContentPresignedUrls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthorizedUrlConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type CreateHubContentReferenceError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Create a hub content reference in order to add a model in the JumpStart public hub to a private hub.
 */
export const createHubContentReference: API.OperationMethod<
  CreateHubContentReferenceRequest,
  CreateHubContentReferenceResponse,
  CreateHubContentReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      SageMakerPublicHubContentArn: 0,
      HubContentName: 0,
      MinVersion: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHubContentReference",
})) as any;

export type CreateHumanTaskUiError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Defines the settings you will use for the human review workflow user interface. Reviewers will see a three-panel interface with an instruction area, the item to review, and an input area.
 */
export const createHumanTaskUi: API.OperationMethod<
  CreateHumanTaskUiRequest,
  CreateHumanTaskUiResponse,
  CreateHumanTaskUiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HumanTaskUiName: 0,
      UiTemplate: i_UiTemplate,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHumanTaskUi",
})) as any;

export type CreateHyperParameterTuningJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Starts a hyperparameter tuning job. A hyperparameter tuning job finds the best version of a model by running many training jobs on your dataset using the algorithm you choose and values for hyperparameters within ranges that you specify. It then chooses the hyperparameter values that result in a model that performs the best, as measured by an objective metric that you choose.
 *
 * A hyperparameter tuning job automatically creates Amazon SageMaker experiments, trials, and trial components for each training job that it runs. You can view these entities in Amazon SageMaker Studio. For more information, see View Experiments, Trials, and Trial Components.
 *
 * Do not include any security-sensitive information including account access IDs, secrets, or tokens in any hyperparameter fields. As part of the shared responsibility model, you are responsible for any potential exposure, unauthorized access, or compromise of your sensitive data if caused by any security-sensitive information included in the request hyperparameter variable or plain text fields..
 */
export const createHyperParameterTuningJob: API.OperationMethod<
  CreateHyperParameterTuningJobRequest,
  CreateHyperParameterTuningJobResponse,
  CreateHyperParameterTuningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HyperParameterTuningJobName: 0,
      HyperParameterTuningJobConfig: {
        Strategy: 0,
        StrategyConfig: {
          HyperbandStrategyConfig: { MinResource: 0, MaxResource: 0 },
        },
        HyperParameterTuningJobObjective: i_HyperParameterTuningJobObjective,
        ResourceLimits: {
          MaxNumberOfTrainingJobs: 0,
          MaxParallelTrainingJobs: 0,
          MaxRuntimeInSeconds: 0,
        },
        ParameterRanges: i_ParameterRanges,
        TrainingJobEarlyStoppingType: 0,
        TuningJobCompletionCriteria: {
          TargetObjectiveMetricValue: 0,
          BestObjectiveNotImproving: { MaxNumberOfTrainingJobsNotImproving: 0 },
          ConvergenceDetected: { CompleteOnConvergence: 0 },
        },
        RandomSeed: 0,
      },
      TrainingJobDefinition: i_HyperParameterTrainingJobDefinition,
      TrainingJobDefinitions: D.list(i_HyperParameterTrainingJobDefinition),
      WarmStartConfig: {
        ParentHyperParameterTuningJobs: D.list({
          HyperParameterTuningJobName: 0,
        }),
        WarmStartType: 0,
      },
      Tags: D.list(i_Tag),
      Autotune: { Mode: 0 },
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHyperParameterTuningJob",
})) as any;

export type CreateImageError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a custom SageMaker AI image. A SageMaker AI image is a set of image versions. Each image version represents a container image stored in Amazon ECR. For more information, see Bring your own SageMaker AI image.
 */
export const createImage: API.OperationMethod<
  CreateImageRequest,
  CreateImageResponse,
  CreateImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      DisplayName: 0,
      ImageName: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImage",
})) as any;

export type CreateImageVersionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a version of the SageMaker AI image specified by `ImageName`. The version represents the Amazon ECR container image specified by `BaseImage`.
 */
export const createImageVersion: API.OperationMethod<
  CreateImageVersionRequest,
  CreateImageVersionResponse,
  CreateImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BaseImage: 0,
      ClientToken: D.m({ idempotency: true }),
      ImageName: 0,
      Aliases: 0,
      VendorGuidance: 0,
      JobType: 0,
      MLFramework: 0,
      ProgrammingLang: 0,
      Processor: 0,
      Horovod: 0,
      ReleaseNotes: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageVersion",
})) as any;

export type CreateInferenceComponentError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an inference component, which is a SageMaker AI hosting object that you can use to deploy a model to an endpoint. In the inference component settings, you specify the model, the endpoint, and how the model utilizes the resources that the endpoint hosts. You can optimize resource utilization by tailoring how the required CPU cores, accelerators, and memory are allocated. You can deploy multiple inference components to an endpoint, where each inference component contains one model and the resource utilization needs for that individual model. After you deploy an inference component, you can directly invoke the associated model when you use the InvokeEndpoint API action.
 */
export const createInferenceComponent: API.OperationMethod<
  CreateInferenceComponentInput,
  CreateInferenceComponentOutput,
  CreateInferenceComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InferenceComponentName: 0,
      EndpointName: 0,
      VariantName: 0,
      Specification: i_InferenceComponentSpecification,
      Specifications: D.list(i_InferenceComponentSpecification),
      RuntimeConfig: i_InferenceComponentRuntimeConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceComponent",
})) as any;

export type CreateInferenceExperimentError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an inference experiment using the configurations specified in the request.
 *
 * Use this API to setup and schedule an experiment to compare model variants on a Amazon SageMaker inference endpoint. For more information about inference experiments, see Shadow tests.
 *
 * Amazon SageMaker begins your experiment at the scheduled time and routes traffic to your endpoint's model variants based on your specified configuration.
 *
 * While the experiment is in progress or after it has concluded, you can view metrics that compare your model variants. For more information, see View, monitor, and edit shadow tests.
 */
export const createInferenceExperiment: API.OperationMethod<
  CreateInferenceExperimentRequest,
  CreateInferenceExperimentResponse,
  CreateInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Type: 0,
      Schedule: i_InferenceExperimentSchedule,
      Description: 0,
      RoleArn: 0,
      EndpointName: 0,
      ModelVariants: D.list(i_ModelVariantConfig),
      DataStorageConfig: i_InferenceExperimentDataStorageConfig,
      ShadowModeConfig: i_ShadowModeConfig,
      KmsKey: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceExperiment",
})) as any;

export type CreateInferenceRecommendationsJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Starts a recommendation job. You can create either an instance recommendation or load test job.
 */
export const createInferenceRecommendationsJob: API.OperationMethod<
  CreateInferenceRecommendationsJobRequest,
  CreateInferenceRecommendationsJobResponse,
  CreateInferenceRecommendationsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      JobType: 0,
      RoleArn: 0,
      InputConfig: {
        ModelPackageVersionArn: 0,
        ModelName: 0,
        JobDurationInSeconds: 0,
        TrafficPattern: {
          TrafficType: 0,
          Phases: D.list({
            InitialNumberOfUsers: 0,
            SpawnRate: 0,
            DurationInSeconds: 0,
          }),
          Stairs: { DurationInSeconds: 0, NumberOfSteps: 0, UsersPerStep: 0 },
        },
        ResourceLimit: { MaxNumberOfTests: 0, MaxParallelOfTests: 0 },
        EndpointConfigurations: D.list({
          InstanceType: 0,
          ServerlessConfig: i_ProductionVariantServerlessConfig,
          InferenceSpecificationName: 0,
          EnvironmentParameterRanges: {
            CategoricalParameterRanges: D.list({ Name: 0, Value: 0 }),
          },
        }),
        VolumeKmsKeyId: 0,
        ContainerConfig: {
          Domain: 0,
          Task: 0,
          Framework: 0,
          FrameworkVersion: 0,
          PayloadConfig: { SamplePayloadUrl: 0, SupportedContentTypes: 0 },
          NearestModelName: 0,
          SupportedInstanceTypes: 0,
          SupportedEndpointType: 0,
          DataInputConfig: 0,
          SupportedResponseMIMETypes: 0,
        },
        Endpoints: D.list({ EndpointName: 0 }),
        VpcConfig: { SecurityGroupIds: 0, Subnets: 0 },
      },
      JobDescription: 0,
      StoppingConditions: {
        MaxInvocations: 0,
        ModelLatencyThresholds: D.list({
          Percentile: 0,
          ValueInMilliseconds: 0,
        }),
        FlatInvocations: 0,
      },
      OutputConfig: { KmsKeyId: 0, CompiledOutputConfig: { S3OutputUri: 0 } },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceRecommendationsJob",
})) as any;

export type CreateJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a model customization job in Amazon SageMaker. A job runs a workload based on the job category and configuration you provide. You specify the job category, a schema-versioned configuration document, and an IAM role that grants Amazon SageMaker permission to access resources on your behalf.
 *
 * Use the `AgentRFT` category to fine-tune a model using multi-turn reinforcement learning with reward signals. Use the `AgentRFTEvaluation` category to evaluate a fine-tuned or base model by running multi-turn rollouts against a held-out prompt dataset and computing metrics such as pass@k and mean reward.
 *
 * Before creating a job, call `ListJobSchemaVersions` and `DescribeJobSchemaVersion` to retrieve the configuration schema for your job category. The `JobConfigDocument` must conform to the schema specified by `JobConfigSchemaVersion`.
 *
 * The following operations are related to `CreateJob`:
 *
 * - `DescribeJob`
 *
 * - `ListJobs`
 *
 * - `StopJob`
 *
 * - `DeleteJob`
 *
 * - `ListJobSchemaVersions`
 *
 * - `DescribeJobSchemaVersion`
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      RoleArn: 0,
      JobCategory: 0,
      JobConfigSchemaVersion: 0,
      JobConfigDocument: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
})) as any;

export type CreateLabelingJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a job that uses workers to label the data objects in your input dataset. You can use the labeled data to train machine learning models.
 *
 * You can select your workforce from one of three providers:
 *
 * - A private workforce that you create. It can include employees, contractors, and outside experts. Use a private workforce when want the data to stay within your organization or when a specific set of skills is required.
 *
 * - One or more vendors that you select from the Amazon Web Services Marketplace. Vendors provide expertise in specific areas.
 *
 * - The Amazon Mechanical Turk workforce. This is the largest workforce, but it should only be used for public data or data that has been stripped of any personally identifiable information.
 *
 * You can also use *automated data labeling* to reduce the number of data objects that need to be labeled by a human. Automated data labeling uses *active learning* to determine if a data object can be labeled by machine or if it needs to be sent to a human worker. For more information, see Using Automated Data Labeling.
 *
 * The data objects to be labeled are contained in an Amazon S3 bucket. You create a *manifest file* that describes the location of each object. For more information, see Using Input and Output Data.
 *
 * The output can be used as the manifest file for another labeling job or as training data for your machine learning models.
 *
 * You can use this operation to create a static labeling job or a streaming labeling job. A static labeling job stops if all data objects in the input manifest file identified in `ManifestS3Uri` have been labeled. A streaming labeling job runs perpetually until it is manually stopped, or remains idle for 10 days. You can send new data objects to an active (`InProgress`) streaming labeling job in real time. To learn how to create a static labeling job, see Create a Labeling Job (API) in the Amazon SageMaker Developer Guide. To learn how to create a streaming labeling job, see Create a Streaming Labeling Job.
 */
export const createLabelingJob: API.OperationMethod<
  CreateLabelingJobRequest,
  CreateLabelingJobResponse,
  CreateLabelingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LabelingJobName: 0,
      LabelAttributeName: 0,
      InputConfig: {
        DataSource: {
          S3DataSource: { ManifestS3Uri: 0 },
          SnsDataSource: { SnsTopicArn: 0 },
        },
        DataAttributes: { ContentClassifiers: 0 },
      },
      OutputConfig: { S3OutputPath: 0, KmsKeyId: 0, SnsTopicArn: 0 },
      RoleArn: 0,
      LabelCategoryConfigS3Uri: 0,
      StoppingConditions: {
        MaxHumanLabeledObjectCount: 0,
        MaxPercentageOfInputDatasetLabeled: 0,
      },
      LabelingJobAlgorithmsConfig: {
        LabelingJobAlgorithmSpecificationArn: 0,
        InitialActiveLearningModelArn: 0,
        LabelingJobResourceConfig: {
          VolumeKmsKeyId: 0,
          VpcConfig: i_VpcConfig,
        },
      },
      HumanTaskConfig: {
        WorkteamArn: 0,
        UiConfig: { UiTemplateS3Uri: 0, HumanTaskUiArn: 0 },
        PreHumanTaskLambdaArn: 0,
        TaskKeywords: 0,
        TaskTitle: 0,
        TaskDescription: 0,
        NumberOfHumanWorkersPerDataObject: 0,
        TaskTimeLimitInSeconds: 0,
        TaskAvailabilityLifetimeInSeconds: 0,
        MaxConcurrentTaskCount: 0,
        AnnotationConsolidationConfig: { AnnotationConsolidationLambdaArn: 0 },
        PublicWorkforceTaskPrice: i_PublicWorkforceTaskPrice,
      },
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLabelingJob",
})) as any;

export type CreateMlflowAppError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates an MLflow Tracking Server using a general purpose Amazon S3 bucket as the artifact store.
 */
export const createMlflowApp: API.OperationMethod<
  CreateMlflowAppRequest,
  CreateMlflowAppResponse,
  CreateMlflowAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ArtifactStoreUri: 0,
      RoleArn: 0,
      KmsKeyId: 0,
      ModelRegistrationMode: 0,
      WeeklyMaintenanceWindowStart: 0,
      AccountDefaultStatus: 0,
      DefaultDomainIdList: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMlflowApp",
})) as any;

export type CreateMlflowTrackingServerError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an MLflow Tracking Server using a general purpose Amazon S3 bucket as the artifact store. For more information, see Create an MLflow Tracking Server.
 */
export const createMlflowTrackingServer: API.OperationMethod<
  CreateMlflowTrackingServerRequest,
  CreateMlflowTrackingServerResponse,
  CreateMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrackingServerName: 0,
      ArtifactStoreUri: 0,
      TrackingServerSize: 0,
      MlflowVersion: 0,
      RoleArn: 0,
      AutomaticModelRegistration: 0,
      WeeklyMaintenanceWindowStart: 0,
      Tags: D.list(i_Tag),
      S3BucketOwnerAccountId: 0,
      S3BucketOwnerVerification: 0,
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMlflowTrackingServer",
})) as any;

export type CreateModelError =
  | ResourceLimitExceeded
  | ModelAlreadyExists
  | CommonErrors;
/**
 * Creates a model in SageMaker. In the request, you name the model and describe a primary container. For the primary container, you specify the Docker image that contains inference code, artifacts (from prior training), and a custom environment map that the inference code uses when you deploy the model for predictions.
 *
 * Use this API to create a model if you want to use SageMaker hosting services or run a batch transform job.
 *
 * To host your model, you create an endpoint configuration with the `CreateEndpointConfig` API, and then create an endpoint with the `CreateEndpoint` API. SageMaker then deploys all of the containers that you defined for the model in the hosting environment.
 *
 * To run a batch transform using your model, you start a job with the `CreateTransformJob` API. SageMaker uses your model and your dataset to get inferences which are then saved to a specified S3 location.
 *
 * In the request, you also provide an IAM role that SageMaker can assume to access model artifacts and docker image for deployment on ML compute hosting instances or for batch transform jobs. In addition, you also use the IAM role to manage permissions the inference code needs. For example, if the inference code access any other Amazon Web Services resources, you grant necessary permissions via this role.
 */
export const createModel: API.OperationMethod<
  CreateModelInput,
  CreateModelOutput,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      PrimaryContainer: i_ContainerDefinition,
      Containers: D.list(i_ContainerDefinition),
      InferenceExecutionConfig: { Mode: 0 },
      ExecutionRoleArn: 0,
      Tags: D.list(i_Tag),
      VpcConfig: i_VpcConfig,
      EnableNetworkIsolation: 0,
    },
  },
  errors: [ResourceLimitExceeded, ModelAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
})) as any;

export type CreateModelBiasJobDefinitionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates the definition for a model bias job.
 */
export const createModelBiasJobDefinition: API.OperationMethod<
  CreateModelBiasJobDefinitionRequest,
  CreateModelBiasJobDefinitionResponse,
  CreateModelBiasJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobDefinitionName: 0,
      ModelBiasBaselineConfig: {
        BaseliningJobName: 0,
        ConstraintsResource: i_MonitoringConstraintsResource,
      },
      ModelBiasAppSpecification: { ImageUri: 0, ConfigUri: 0, Environment: 0 },
      ModelBiasJobInput: {
        EndpointInput: i_EndpointInput,
        BatchTransformInput: i_BatchTransformInput,
        GroundTruthS3Input: i_MonitoringGroundTruthS3Input,
      },
      ModelBiasJobOutputConfig: i_MonitoringOutputConfig,
      JobResources: i_MonitoringResources,
      NetworkConfig: i_MonitoringNetworkConfig,
      RoleArn: 0,
      StoppingCondition: i_MonitoringStoppingCondition,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelBiasJobDefinition",
})) as any;

export type CreateModelCardError =
  | ConflictException
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an Amazon SageMaker Model Card.
 *
 * For information about how to use model cards, see Amazon SageMaker Model Card.
 */
export const createModelCard: API.OperationMethod<
  CreateModelCardRequest,
  CreateModelCardResponse,
  CreateModelCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelCardName: 0,
      SecurityConfig: { KmsKeyId: 0 },
      Content: 0,
      ModelCardStatus: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCard",
})) as any;

export type CreateModelCardExportJobError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates an Amazon SageMaker Model Card export job.
 */
export const createModelCardExportJob: API.OperationMethod<
  CreateModelCardExportJobRequest,
  CreateModelCardExportJobResponse,
  CreateModelCardExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelCardName: 0,
      ModelCardVersion: 0,
      ModelCardExportJobName: 0,
      OutputConfig: { S3OutputPath: 0 },
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCardExportJob",
})) as any;

export type CreateModelExplainabilityJobDefinitionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates the definition for a model explainability job.
 */
export const createModelExplainabilityJobDefinition: API.OperationMethod<
  CreateModelExplainabilityJobDefinitionRequest,
  CreateModelExplainabilityJobDefinitionResponse,
  CreateModelExplainabilityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobDefinitionName: 0,
      ModelExplainabilityBaselineConfig: {
        BaseliningJobName: 0,
        ConstraintsResource: i_MonitoringConstraintsResource,
      },
      ModelExplainabilityAppSpecification: {
        ImageUri: 0,
        ConfigUri: 0,
        Environment: 0,
      },
      ModelExplainabilityJobInput: {
        EndpointInput: i_EndpointInput,
        BatchTransformInput: i_BatchTransformInput,
      },
      ModelExplainabilityJobOutputConfig: i_MonitoringOutputConfig,
      JobResources: i_MonitoringResources,
      NetworkConfig: i_MonitoringNetworkConfig,
      RoleArn: 0,
      StoppingCondition: i_MonitoringStoppingCondition,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelExplainabilityJobDefinition",
})) as any;

export type CreateModelPackageError =
  | ConflictException
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a model package that you can use to create SageMaker models or list on Amazon Web Services Marketplace, or a versioned model that is part of a model group. Buyers can subscribe to model packages listed on Amazon Web Services Marketplace to create models in SageMaker.
 *
 * To create a model package by specifying a Docker container that contains your inference code and the Amazon S3 location of your model artifacts, provide values for `InferenceSpecification`. To create a model from an algorithm resource that you created or subscribed to in Amazon Web Services Marketplace, provide a value for `SourceAlgorithmSpecification`.
 *
 * There are two types of model packages:
 *
 * - Versioned - a model that is part of a model group in the model registry.
 *
 * - Unversioned - a model package that is not part of a model group.
 */
export const createModelPackage: API.OperationMethod<
  CreateModelPackageInput,
  CreateModelPackageOutput,
  CreateModelPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelPackageName: 0,
      ModelPackageGroupName: 0,
      ModelPackageDescription: 0,
      ModelPackageRegistrationType: 0,
      InferenceSpecification: i_InferenceSpecification,
      ValidationSpecification: {
        ValidationRole: 0,
        ValidationProfiles: D.list({
          ProfileName: 0,
          TransformJobDefinition: i_TransformJobDefinition,
        }),
      },
      SourceAlgorithmSpecification: {
        SourceAlgorithms: D.list({
          ModelDataUrl: 0,
          ModelDataSource: i_ModelDataSource,
          ModelDataETag: 0,
          AlgorithmName: 0,
        }),
      },
      CertifyForMarketplace: 0,
      Tags: D.list(i_Tag),
      ModelApprovalStatus: 0,
      MetadataProperties: i_MetadataProperties,
      ModelMetrics: {
        ModelQuality: {
          Statistics: i_MetricsSource,
          Constraints: i_MetricsSource,
        },
        ModelDataQuality: {
          Statistics: i_MetricsSource,
          Constraints: i_MetricsSource,
        },
        Bias: {
          Report: i_MetricsSource,
          PreTrainingReport: i_MetricsSource,
          PostTrainingReport: i_MetricsSource,
        },
        Explainability: { Report: i_MetricsSource },
      },
      ClientToken: D.m({ idempotency: true }),
      Domain: 0,
      Task: 0,
      SamplePayloadUrl: 0,
      CustomerMetadataProperties: 0,
      DriftCheckBaselines: {
        Bias: {
          ConfigFile: i_FileSource,
          PreTrainingConstraints: i_MetricsSource,
          PostTrainingConstraints: i_MetricsSource,
        },
        Explainability: {
          Constraints: i_MetricsSource,
          ConfigFile: i_FileSource,
        },
        ModelQuality: {
          Statistics: i_MetricsSource,
          Constraints: i_MetricsSource,
        },
        ModelDataQuality: {
          Statistics: i_MetricsSource,
          Constraints: i_MetricsSource,
        },
      },
      AdditionalInferenceSpecifications: D.list(
        i_AdditionalInferenceSpecificationDefinition,
      ),
      SkipModelValidation: 0,
      SourceUri: 0,
      SecurityConfig: { KmsKeyId: 0 },
      ModelCard: i_ModelPackageModelCard,
      ModelLifeCycle: i_ModelLifeCycle,
      ManagedStorageType: 0,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelPackage",
})) as any;

export type CreateModelPackageGroupError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates a model group. A model group contains a group of model versions.
 */
export const createModelPackageGroup: API.OperationMethod<
  CreateModelPackageGroupInput,
  CreateModelPackageGroupOutput,
  CreateModelPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelPackageGroupName: 0,
      ModelPackageGroupDescription: 0,
      Tags: D.list(i_Tag),
      ManagedConfiguration: { ManagedStorageType: 0 },
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelPackageGroup",
})) as any;

export type CreateModelQualityJobDefinitionError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a definition for a job that monitors model quality and drift. For information about model monitor, see Amazon SageMaker AI Model Monitor.
 */
export const createModelQualityJobDefinition: API.OperationMethod<
  CreateModelQualityJobDefinitionRequest,
  CreateModelQualityJobDefinitionResponse,
  CreateModelQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobDefinitionName: 0,
      ModelQualityBaselineConfig: {
        BaseliningJobName: 0,
        ConstraintsResource: i_MonitoringConstraintsResource,
      },
      ModelQualityAppSpecification: {
        ImageUri: 0,
        ContainerEntrypoint: 0,
        ContainerArguments: 0,
        RecordPreprocessorSourceUri: 0,
        PostAnalyticsProcessorSourceUri: 0,
        ProblemType: 0,
        Environment: 0,
      },
      ModelQualityJobInput: {
        EndpointInput: i_EndpointInput,
        BatchTransformInput: i_BatchTransformInput,
        GroundTruthS3Input: i_MonitoringGroundTruthS3Input,
      },
      ModelQualityJobOutputConfig: i_MonitoringOutputConfig,
      JobResources: i_MonitoringResources,
      NetworkConfig: i_MonitoringNetworkConfig,
      RoleArn: 0,
      StoppingCondition: i_MonitoringStoppingCondition,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelQualityJobDefinition",
})) as any;

export type CreateMonitoringScheduleError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a schedule that regularly starts Amazon SageMaker AI Processing Jobs to monitor the data captured for an Amazon SageMaker AI Endpoint.
 */
export const createMonitoringSchedule: API.OperationMethod<
  CreateMonitoringScheduleRequest,
  CreateMonitoringScheduleResponse,
  CreateMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitoringScheduleName: 0,
      MonitoringScheduleConfig: i_MonitoringScheduleConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitoringSchedule",
})) as any;

export type CreateNotebookInstanceError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates an SageMaker AI notebook instance. A notebook instance is a machine learning (ML) compute instance running on a Jupyter notebook.
 *
 * In a `CreateNotebookInstance` request, specify the type of ML compute instance that you want to run. SageMaker AI launches the instance, installs common libraries that you can use to explore datasets for model training, and attaches an ML storage volume to the notebook instance.
 *
 * SageMaker AI also provides a set of example notebooks. Each notebook demonstrates how to use SageMaker AI with a specific algorithm or with a machine learning framework.
 *
 * After receiving the request, SageMaker AI does the following:
 *
 * - Creates a network interface in the SageMaker AI VPC.
 *
 * - (Option) If you specified `SubnetId`, SageMaker AI creates a network interface in your own VPC, which is inferred from the subnet ID that you provide in the input. When creating this network interface, SageMaker AI attaches the security group that you specified in the request to the network interface that it creates in your VPC.
 *
 * - Launches an EC2 instance of the type specified in the request in the SageMaker AI VPC. If you specified `SubnetId` of your VPC, SageMaker AI specifies both network interfaces when launching this instance. This enables inbound traffic from your own VPC to the notebook instance, assuming that the security groups allow it.
 *
 * After creating the notebook instance, SageMaker AI returns its Amazon Resource Name (ARN). You can't change the name of a notebook instance after you create it.
 *
 * After SageMaker AI creates the notebook instance, you can connect to the Jupyter server and work in Jupyter notebooks. For example, you can write code to explore a dataset that you can use for model training, train a model, host models by creating SageMaker AI endpoints, and validate hosted models.
 *
 * For more information, see How It Works.
 */
export const createNotebookInstance: API.OperationMethod<
  CreateNotebookInstanceInput,
  CreateNotebookInstanceOutput,
  CreateNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NotebookInstanceName: 0,
      InstanceType: 0,
      SubnetId: 0,
      SecurityGroupIds: 0,
      IpAddressType: 0,
      RoleArn: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag),
      LifecycleConfigName: 0,
      DirectInternetAccess: 0,
      VolumeSizeInGB: 0,
      AcceleratorTypes: 0,
      DefaultCodeRepository: 0,
      AdditionalCodeRepositories: 0,
      RootAccess: 0,
      PlatformIdentifier: 0,
      InstanceMetadataServiceConfiguration:
        i_InstanceMetadataServiceConfiguration,
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebookInstance",
})) as any;

export type CreateNotebookInstanceLifecycleConfigError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a lifecycle configuration that you can associate with a notebook instance. A *lifecycle configuration* is a collection of shell scripts that run when you create or start a notebook instance.
 *
 * Each lifecycle configuration script has a limit of 16384 characters.
 *
 * The value of the `$PATH` environment variable that is available to both scripts is `/sbin:bin:/usr/sbin:/usr/bin`.
 *
 * View Amazon CloudWatch Logs for notebook instance lifecycle configurations in log group `/aws/sagemaker/NotebookInstances` in log stream `[notebook-instance-name]/[LifecycleConfigHook]`.
 *
 * Lifecycle configuration scripts cannot run for longer than 5 minutes. If a script runs for longer than 5 minutes, it fails and the notebook instance is not created or started.
 *
 * For information about notebook instance lifestyle configurations, see Step 2.1: (Optional) Customize a Notebook Instance.
 *
 * Lifecycle configuration scripts execute with root access and the notebook instance's IAM execution role privileges. Grant this permission only to trusted principals. See Customize a Notebook Instance Using a Lifecycle Configuration Script for security best practices.
 */
export const createNotebookInstanceLifecycleConfig: API.OperationMethod<
  CreateNotebookInstanceLifecycleConfigInput,
  CreateNotebookInstanceLifecycleConfigOutput,
  CreateNotebookInstanceLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NotebookInstanceLifecycleConfigName: 0,
      OnCreate: D.list(i_NotebookInstanceLifecycleHook),
      OnStart: D.list(i_NotebookInstanceLifecycleHook),
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebookInstanceLifecycleConfig",
})) as any;

export type CreateOptimizationJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a job that optimizes a model for inference performance. To create the job, you provide the location of a source model, and you provide the settings for the optimization techniques that you want the job to apply. When the job completes successfully, SageMaker uploads the new optimized model to the output destination that you specify.
 *
 * For more information about how to use this action, and about the supported optimization techniques, see Optimize model inference with Amazon SageMaker.
 */
export const createOptimizationJob: API.OperationMethod<
  CreateOptimizationJobRequest,
  CreateOptimizationJobResponse,
  CreateOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OptimizationJobName: 0,
      RoleArn: 0,
      ModelSource: {
        S3: { S3Uri: 0, ModelAccessConfig: { AcceptEula: 0 } },
        SageMakerModel: i_OptimizationSageMakerModel,
      },
      DeploymentInstanceType: 0,
      MaxInstanceCount: 0,
      OptimizationEnvironment: 0,
      OptimizationConfigs: D.list({
        ModelQuantizationConfig: { Image: 0, OverrideEnvironment: 0 },
        ModelCompilationConfig: { Image: 0, OverrideEnvironment: 0 },
        ModelShardingConfig: { Image: 0, OverrideEnvironment: 0 },
        ModelSpeculativeDecodingConfig: {
          Technique: 0,
          TrainingDataSource: { S3Uri: 0, S3DataType: 0 },
        },
      }),
      OutputConfig: {
        KmsKeyId: 0,
        S3OutputLocation: 0,
        SageMakerModel: i_OptimizationSageMakerModel,
      },
      StoppingCondition: i_StoppingCondition,
      Tags: D.list(i_Tag),
      VpcConfig: { SecurityGroupIds: 0, Subnets: 0 },
      TrainingPlanArns: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOptimizationJob",
})) as any;

export type CreatePartnerAppError =
  | ConflictException
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates an Amazon SageMaker Partner AI App.
 */
export const createPartnerApp: API.OperationMethod<
  CreatePartnerAppRequest,
  CreatePartnerAppResponse,
  CreatePartnerAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Type: 0,
      ExecutionRoleArn: 0,
      KmsKeyId: 0,
      MaintenanceConfig: i_PartnerAppMaintenanceConfig,
      Tier: 0,
      ApplicationConfig: i_PartnerAppConfig,
      IdcConfig: i_IdcConfigInput,
      AuthType: 0,
      EnableIamSessionBasedIdentity: 0,
      EnableAutoMinorVersionUpgrade: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartnerApp",
})) as any;

export type CreatePartnerAppPresignedUrlError = ResourceNotFound | CommonErrors;
/**
 * Creates a presigned URL to access an Amazon SageMaker Partner AI App.
 */
export const createPartnerAppPresignedUrl: API.OperationMethod<
  CreatePartnerAppPresignedUrlRequest,
  CreatePartnerAppPresignedUrlResponse,
  CreatePartnerAppPresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Arn: 0,
      ExpiresInSeconds: 0,
      SessionExpirationDurationInSeconds: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartnerAppPresignedUrl",
})) as any;

export type CreatePipelineError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a pipeline using a JSON pipeline definition.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineName: 0,
      PipelineDisplayName: 0,
      PipelineDefinition: 0,
      PipelineDefinitionS3Location: i_PipelineDefinitionS3Location,
      PipelineDescription: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      RoleArn: 0,
      Tags: D.list(i_Tag),
      ParallelismConfiguration: i_ParallelismConfiguration,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
})) as any;

export type CreatePresignedDomainUrlError = ResourceNotFound | CommonErrors;
/**
 * Creates a URL for a specified UserProfile in a Domain. When accessed in a web browser, the user will be automatically signed in to the domain, and granted access to all of the Apps and files associated with the Domain's Amazon Elastic File System volume. This operation can only be called when the authentication mode equals IAM.
 *
 * The IAM role or user passed to this API defines the permissions to access the app. Once the presigned URL is created, no additional permission is required to access this URL. IAM authorization policies for this API are also enforced for every HTTP request and WebSocket frame that attempts to connect to the app.
 *
 * You can restrict access to this API and to the URL that it returns to a list of IP addresses, Amazon VPCs or Amazon VPC Endpoints that you specify. For more information, see Connect to Amazon SageMaker AI Studio Through an Interface VPC Endpoint .
 *
 * - The URL that you get from a call to `CreatePresignedDomainUrl` has a default timeout of 5 minutes. You can configure this value using `ExpiresInSeconds`. If you try to use the URL after the timeout limit expires, you are directed to the Amazon Web Services console sign-in page.
 *
 * - The JupyterLab session default expiration time is 12 hours. You can configure this value using SessionExpirationDurationInSeconds.
 */
export const createPresignedDomainUrl: API.OperationMethod<
  CreatePresignedDomainUrlRequest,
  CreatePresignedDomainUrlResponse,
  CreatePresignedDomainUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      UserProfileName: 0,
      SessionExpirationDurationInSeconds: 0,
      ExpiresInSeconds: 0,
      SpaceName: 0,
      LandingUri: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedDomainUrl",
})) as any;

export type CreatePresignedMlflowAppUrlError = ResourceNotFound | CommonErrors;
/**
 * Returns a presigned URL that you can use to connect to the MLflow UI attached to your MLflow App. For more information, see Launch the MLflow UI using a presigned URL.
 */
export const createPresignedMlflowAppUrl: API.OperationMethod<
  CreatePresignedMlflowAppUrlRequest,
  CreatePresignedMlflowAppUrlResponse,
  CreatePresignedMlflowAppUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Arn: 0,
      ExpiresInSeconds: 0,
      SessionExpirationDurationInSeconds: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedMlflowAppUrl",
})) as any;

export type CreatePresignedMlflowTrackingServerUrlError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a presigned URL that you can use to connect to the MLflow UI attached to your tracking server. For more information, see Launch the MLflow UI using a presigned URL.
 */
export const createPresignedMlflowTrackingServerUrl: API.OperationMethod<
  CreatePresignedMlflowTrackingServerUrlRequest,
  CreatePresignedMlflowTrackingServerUrlResponse,
  CreatePresignedMlflowTrackingServerUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrackingServerName: 0,
      ExpiresInSeconds: 0,
      SessionExpirationDurationInSeconds: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedMlflowTrackingServerUrl",
})) as any;

export type CreatePresignedNotebookInstanceUrlError = CommonErrors;
/**
 * Returns a URL that you can use to connect to the Jupyter server from a notebook instance. In the SageMaker AI console, when you choose `Open` next to a notebook instance, SageMaker AI opens a new tab showing the Jupyter server home page from the notebook instance. The console uses this API to get the URL and show the page.
 *
 * The IAM role or user used to call this API defines the permissions to access the notebook instance. Once the presigned URL is created, no additional permission is required to access this URL. IAM authorization policies for this API are also enforced for every HTTP request and WebSocket frame that attempts to connect to the notebook instance.
 *
 * You can restrict access to this API and to the URL that it returns to a list of IP addresses that you specify. Use the `NotIpAddress` condition operator and the `aws:SourceIP` condition context key to specify the list of IP addresses that you want to have access to the notebook instance. For more information, see Limit Access to a Notebook Instance by IP Address.
 *
 * The URL that you get from a call to CreatePresignedNotebookInstanceUrl is valid only for 5 minutes. If you try to use the URL after the 5-minute limit expires, you are directed to the Amazon Web Services console sign-in page.
 */
export const createPresignedNotebookInstanceUrl: API.OperationMethod<
  CreatePresignedNotebookInstanceUrlInput,
  CreatePresignedNotebookInstanceUrlOutput,
  CreatePresignedNotebookInstanceUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookInstanceName: 0, SessionExpirationDurationInSeconds: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedNotebookInstanceUrl",
})) as any;

export type CreateProcessingJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a processing job.
 */
export const createProcessingJob: API.OperationMethod<
  CreateProcessingJobRequest,
  CreateProcessingJobResponse,
  CreateProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcessingInputs: D.list({
        InputName: 0,
        AppManaged: 0,
        S3Input: {
          S3Uri: 0,
          LocalPath: 0,
          S3DataType: 0,
          S3InputMode: 0,
          S3DataDistributionType: 0,
          S3CompressionType: 0,
        },
        DatasetDefinition: {
          AthenaDatasetDefinition: {
            Catalog: 0,
            Database: 0,
            QueryString: 0,
            WorkGroup: 0,
            OutputS3Uri: 0,
            KmsKeyId: 0,
            OutputFormat: 0,
            OutputCompression: 0,
          },
          RedshiftDatasetDefinition: {
            ClusterId: 0,
            Database: 0,
            DbUser: 0,
            QueryString: 0,
            ClusterRoleArn: 0,
            OutputS3Uri: 0,
            KmsKeyId: 0,
            OutputFormat: 0,
            OutputCompression: 0,
          },
          LocalPath: 0,
          DataDistributionType: 0,
          InputMode: 0,
        },
      }),
      ProcessingOutputConfig: {
        Outputs: D.list({
          OutputName: 0,
          S3Output: { S3Uri: 0, LocalPath: 0, S3UploadMode: 0 },
          FeatureStoreOutput: { FeatureGroupName: 0 },
          AppManaged: 0,
        }),
        KmsKeyId: 0,
      },
      ProcessingJobName: 0,
      ProcessingResources: {
        ClusterConfig: {
          InstanceCount: 0,
          InstanceType: 0,
          VolumeSizeInGB: 0,
          VolumeKmsKeyId: 0,
        },
      },
      StoppingCondition: { MaxRuntimeInSeconds: 0 },
      AppSpecification: {
        ImageUri: 0,
        ContainerEntrypoint: 0,
        ContainerArguments: 0,
      },
      Environment: 0,
      NetworkConfig: i_NetworkConfig,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      ExperimentConfig: i_ExperimentConfig,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProcessingJob",
})) as any;

export type CreateProjectError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates a machine learning (ML) project that can contain one or more templates that set up an ML pipeline from training to deploying an approved model.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProjectName: 0,
      ProjectDescription: 0,
      ServiceCatalogProvisioningDetails: {
        ProductId: 0,
        ProvisioningArtifactId: 0,
        PathId: 0,
        ProvisioningParameters: D.list(i_ProvisioningParameter),
      },
      Tags: D.list(i_Tag),
      TemplateProviders: D.list({
        CfnTemplateProvider: {
          TemplateName: 0,
          TemplateURL: 0,
          RoleARN: 0,
          Parameters: D.list({ Key: 0, Value: 0 }),
        },
      }),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateSpaceError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a private space or a space used for real time collaboration in a domain.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceRequest,
  CreateSpaceResponse,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      SpaceName: 0,
      Tags: D.list(i_Tag),
      SpaceSettings: i_SpaceSettings,
      OwnershipSettings: { OwnerUserProfileName: 0 },
      SpaceSharingSettings: { SharingType: 0 },
      SpaceDisplayName: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSpace",
})) as any;

export type CreateStudioLifecycleConfigError = ResourceInUse | CommonErrors;
/**
 * Creates a new Amazon SageMaker AI Studio Lifecycle Configuration.
 */
export const createStudioLifecycleConfig: API.OperationMethod<
  CreateStudioLifecycleConfigRequest,
  CreateStudioLifecycleConfigResponse,
  CreateStudioLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StudioLifecycleConfigName: 0,
      StudioLifecycleConfigContent: 0,
      StudioLifecycleConfigAppType: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudioLifecycleConfig",
})) as any;

export type CreateTrainingJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Starts a model training job. After training completes, SageMaker saves the resulting model artifacts to an Amazon S3 location that you specify.
 *
 * If you choose to host your model using SageMaker hosting services, you can use the resulting model artifacts as part of the model. You can also use the artifacts in a machine learning service other than SageMaker, provided that you know how to use them for inference.
 *
 * In the request body, you provide the following:
 *
 * - `AlgorithmSpecification` - Identifies the training algorithm to use.
 *
 * - `HyperParameters` - Specify these algorithm-specific parameters to enable the estimation of model parameters during training. Hyperparameters can be tuned to optimize this learning process. For a list of hyperparameters for each training algorithm provided by SageMaker, see Algorithms.
 *
 * Do not include any security-sensitive information including account access IDs, secrets, or tokens in any hyperparameter fields. As part of the shared responsibility model, you are responsible for any potential exposure, unauthorized access, or compromise of your sensitive data if caused by security-sensitive information included in the request hyperparameter variable or plain text fields.
 *
 * - `InputDataConfig` - Describes the input required by the training job and the Amazon S3, EFS, or FSx location where it is stored.
 *
 * - `OutputDataConfig` - Identifies the Amazon S3 bucket where you want SageMaker to save the results of model training.
 *
 * - `ResourceConfig` - Identifies the resources, ML compute instances, and ML storage volumes to deploy for model training. In distributed training, you specify more than one instance.
 *
 * - `EnableManagedSpotTraining` - Optimize the cost of training machine learning models by up to 80% by using Amazon EC2 Spot instances. For more information, see Managed Spot Training.
 *
 * - `RoleArn` - The Amazon Resource Name (ARN) that SageMaker assumes to perform tasks on your behalf during model training. You must grant this role the necessary permissions so that SageMaker can successfully complete model training.
 *
 * - `StoppingCondition` - To help cap training costs, use `MaxRuntimeInSeconds` to set a time limit for training. Use `MaxWaitTimeInSeconds` to specify how long a managed spot training job has to complete.
 *
 * - `Environment` - The environment variables to set in the Docker container.
 *
 * Do not include any security-sensitive information including account access IDs, secrets, or tokens in any environment fields. As part of the shared responsibility model, you are responsible for any potential exposure, unauthorized access, or compromise of your sensitive data if caused by security-sensitive information included in the request environment variable or plain text fields.
 *
 * - `RetryStrategy` - The number of times to retry the job when the job fails due to an `InternalServerError`.
 *
 * For more information about SageMaker, see How It Works.
 */
export const createTrainingJob: API.OperationMethod<
  CreateTrainingJobRequest,
  CreateTrainingJobResponse,
  CreateTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrainingJobName: 0,
      HyperParameters: 0,
      AlgorithmSpecification: {
        TrainingImage: 0,
        AlgorithmName: 0,
        TrainingInputMode: 0,
        MetricDefinitions: D.list(i_MetricDefinition),
        EnableSageMakerMetricsTimeSeries: 0,
        ContainerEntrypoint: 0,
        ContainerArguments: 0,
        TrainingImageConfig: {
          TrainingRepositoryAccessMode: 0,
          TrainingRepositoryAuthConfig: {
            TrainingRepositoryCredentialsProviderArn: 0,
          },
        },
      },
      RoleArn: 0,
      InputDataConfig: D.list(i_Channel),
      OutputDataConfig: i_OutputDataConfig,
      ResourceConfig: i_ResourceConfig,
      VpcConfig: i_VpcConfig,
      StoppingCondition: i_StoppingCondition,
      Tags: D.list(i_Tag),
      EnableNetworkIsolation: 0,
      EnableInterContainerTrafficEncryption: 0,
      EnableManagedSpotTraining: 0,
      CheckpointConfig: i_CheckpointConfig,
      DebugHookConfig: {
        LocalPath: 0,
        S3OutputPath: 0,
        HookParameters: 0,
        CollectionConfigurations: D.list({
          CollectionName: 0,
          CollectionParameters: 0,
        }),
      },
      DebugRuleConfigurations: D.list({
        RuleConfigurationName: 0,
        LocalPath: 0,
        S3OutputPath: 0,
        RuleEvaluatorImage: 0,
        InstanceType: 0,
        VolumeSizeInGB: 0,
        RuleParameters: 0,
      }),
      TensorBoardOutputConfig: { LocalPath: 0, S3OutputPath: 0 },
      ExperimentConfig: i_ExperimentConfig,
      ProfilerConfig: {
        S3OutputPath: 0,
        ProfilingIntervalInMilliseconds: 0,
        ProfilingParameters: 0,
        DisableProfiler: 0,
      },
      ProfilerRuleConfigurations: D.list(i_ProfilerRuleConfiguration),
      Environment: 0,
      RetryStrategy: i_RetryStrategy,
      RemoteDebugConfig: { EnableRemoteDebug: 0 },
      InfraCheckConfig: { EnableInfraCheck: 0 },
      SessionChainingConfig: { EnableSessionTagChaining: 0 },
      ServerlessJobConfig: {
        BaseModelArn: 0,
        AcceptEula: 0,
        JobType: 0,
        CustomizationTechnique: 0,
        Peft: 0,
        EvaluationType: 0,
        EvaluatorArn: 0,
        SequenceLength: 0,
      },
      MlflowConfig: {
        MlflowResourceArn: 0,
        MlflowExperimentName: 0,
        MlflowRunName: 0,
      },
      ModelPackageConfig: { ModelPackageGroupArn: 0, SourceModelPackageArn: 0 },
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainingJob",
})) as any;

export type CreateTrainingPlanError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates a new training plan in SageMaker to reserve compute capacity.
 *
 * Amazon SageMaker Training Plan is a capability within SageMaker that allows customers to reserve and manage GPU capacity for large-scale AI model training. It provides a way to secure predictable access to computational resources within specific timelines and budgets, without the need to manage underlying infrastructure.
 *
 * **How it works**
 *
 * Plans can be created for specific resources such as SageMaker Training Jobs or SageMaker HyperPod clusters, automatically provisioning resources, setting up infrastructure, executing workloads, and handling infrastructure failures.
 *
 * **Plan creation workflow**
 *
 * - Users search for available plan offerings based on their requirements (e.g., instance type, count, start time, duration) using the ` SearchTrainingPlanOfferings ` API operation.
 *
 * - They create a plan that best matches their needs using the ID of the plan offering they want to use.
 *
 * - After successful upfront payment, the plan's status becomes `Scheduled`.
 *
 * - The plan can be used to:
 *
 * - Queue training jobs.
 *
 * - Allocate to an instance group of a SageMaker HyperPod cluster.
 *
 * - When the plan start date arrives, it becomes `Active`. Based on available reserved capacity:
 *
 * - Training jobs are launched.
 *
 * - Instance groups are provisioned.
 *
 * **Plan composition**
 *
 * A plan can consist of one or more Reserved Capacities, each defined by a specific instance type, quantity, Availability Zone, duration, and start and end times. For more information about Reserved Capacity, see ` ReservedCapacitySummary `.
 */
export const createTrainingPlan: API.OperationMethod<
  CreateTrainingPlanRequest,
  CreateTrainingPlanResponse,
  CreateTrainingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrainingPlanName: 0,
      TrainingPlanOfferingId: 0,
      SpareInstanceCountPerUltraServer: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainingPlan",
})) as any;

export type CreateTransformJobError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Starts a transform job. A transform job uses a trained model to get inferences on a dataset and saves these results to an Amazon S3 location that you specify.
 *
 * To perform batch transformations, you create a transform job and use the data that you have readily available.
 *
 * In the request body, you provide the following:
 *
 * - `TransformJobName` - Identifies the transform job. The name must be unique within an Amazon Web Services Region in an Amazon Web Services account.
 *
 * - `ModelName` - Identifies the model to use. `ModelName` must be the name of an existing Amazon SageMaker model in the same Amazon Web Services Region and Amazon Web Services account. For information on creating a model, see CreateModel.
 *
 * - `TransformInput` - Describes the dataset to be transformed and the Amazon S3 location where it is stored.
 *
 * - `TransformOutput` - Identifies the Amazon S3 location where you want Amazon SageMaker to save the results from the transform job.
 *
 * - `TransformResources` - Identifies the ML compute instances and AMI image versions for the transform job.
 *
 * For more information about how batch transformation works, see Batch Transform.
 */
export const createTransformJob: API.OperationMethod<
  CreateTransformJobRequest,
  CreateTransformJobResponse,
  CreateTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TransformJobName: 0,
      ModelName: 0,
      MaxConcurrentTransforms: 0,
      ModelClientConfig: {
        InvocationsTimeoutInSeconds: 0,
        InvocationsMaxRetries: 0,
      },
      MaxPayloadInMB: 0,
      BatchStrategy: 0,
      Environment: 0,
      TransformInput: i_TransformInput,
      TransformOutput: i_TransformOutput,
      DataCaptureConfig: {
        DestinationS3Uri: 0,
        KmsKeyId: 0,
        GenerateInferenceId: 0,
      },
      TransformResources: i_TransformResources,
      DataProcessing: { InputFilter: 0, OutputFilter: 0, JoinSource: 0 },
      Tags: D.list(i_Tag),
      ExperimentConfig: i_ExperimentConfig,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTransformJob",
})) as any;

export type CreateTrialError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Creates an SageMaker *trial*. A trial is a set of steps called *trial components* that produce a machine learning model. A trial is part of a single SageMaker *experiment*.
 *
 * When you use SageMaker Studio or the SageMaker Python SDK, all experiments, trials, and trial components are automatically tracked, logged, and indexed. When you use the Amazon Web Services SDK for Python (Boto), you must use the logging APIs provided by the SDK.
 *
 * You can add tags to a trial and then use the Search API to search for the tags.
 *
 * To get a list of all your trials, call the ListTrials API. To view a trial's properties, call the DescribeTrial API. To create a trial component, call the CreateTrialComponent API.
 */
export const createTrial: API.OperationMethod<
  CreateTrialRequest,
  CreateTrialResponse,
  CreateTrialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrialName: 0,
      DisplayName: 0,
      ExperimentName: 0,
      MetadataProperties: i_MetadataProperties,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrial",
})) as any;

export type CreateTrialComponentError = ResourceLimitExceeded | CommonErrors;
/**
 * Creates a *trial component*, which is a stage of a machine learning *trial*. A trial is composed of one or more trial components. A trial component can be used in multiple trials.
 *
 * Trial components include pre-processing jobs, training jobs, and batch transform jobs.
 *
 * When you use SageMaker Studio or the SageMaker Python SDK, all experiments, trials, and trial components are automatically tracked, logged, and indexed. When you use the Amazon Web Services SDK for Python (Boto), you must use the logging APIs provided by the SDK.
 *
 * You can add tags to a trial component and then use the Search API to search for the tags.
 */
export const createTrialComponent: API.OperationMethod<
  CreateTrialComponentRequest,
  CreateTrialComponentResponse,
  CreateTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrialComponentName: 0,
      DisplayName: 0,
      Status: i_TrialComponentStatus,
      StartTime: 0,
      EndTime: 0,
      Parameters: D.map(i_TrialComponentParameterValue),
      InputArtifacts: D.map(i_TrialComponentArtifact),
      OutputArtifacts: D.map(i_TrialComponentArtifact),
      MetadataProperties: i_MetadataProperties,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrialComponent",
})) as any;

export type CreateUserProfileError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a user profile. A user profile represents a single user within a domain, and is the main way to reference a "person" for the purposes of sharing, reporting, and other user-oriented features. This entity is created when a user onboards to a domain. If an administrator invites a person by email or imports them from IAM Identity Center, a user profile is automatically created. A user profile is the primary holder of settings for an individual user and has a reference to the user's private Amazon Elastic File System home directory.
 */
export const createUserProfile: API.OperationMethod<
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  CreateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      UserProfileName: 0,
      SingleSignOnUserIdentifier: 0,
      SingleSignOnUserValue: 0,
      Tags: D.list(i_Tag),
      UserSettings: i_UserSettings,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserProfile",
})) as any;

export type CreateWorkforceError = CommonErrors;
/**
 * Use this operation to create a workforce. This operation will return an error if a workforce already exists in the Amazon Web Services Region that you specify. You can only create one workforce in each Amazon Web Services Region per Amazon Web Services account.
 *
 * If you want to create a new workforce in an Amazon Web Services Region where a workforce already exists, use the DeleteWorkforce API operation to delete the existing workforce and then use `CreateWorkforce` to create a new workforce.
 *
 * To create a private workforce using Amazon Cognito, you must specify a Cognito user pool in `CognitoConfig`. You can also create an Amazon Cognito workforce using the Amazon SageMaker console. For more information, see Create a Private Workforce (Amazon Cognito).
 *
 * To create a private workforce using your own OIDC Identity Provider (IdP), specify your IdP configuration in `OidcConfig`. Your OIDC IdP must support *groups* because groups are used by Ground Truth and Amazon A2I to create work teams. For more information, see Create a Private Workforce (OIDC IdP).
 */
export const createWorkforce: API.OperationMethod<
  CreateWorkforceRequest,
  CreateWorkforceResponse,
  CreateWorkforceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CognitoConfig: { UserPool: 0, ClientId: 0 },
      OidcConfig: i_OidcConfig,
      SourceIpConfig: i_SourceIpConfig,
      WorkforceName: 0,
      Tags: D.list(i_Tag),
      WorkforceVpcConfig: i_WorkforceVpcConfigRequest,
      IpAddressType: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkforce",
})) as any;

export type CreateWorkteamError =
  | ResourceInUse
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Creates a new work team for labeling your data. A work team is defined by one or more Amazon Cognito user pools. You must first create the user pools before you can create a work team.
 *
 * You cannot create more than 25 work teams in an account and region.
 */
export const createWorkteam: API.OperationMethod<
  CreateWorkteamRequest,
  CreateWorkteamResponse,
  CreateWorkteamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkteamName: 0,
      WorkforceName: 0,
      MemberDefinitions: D.list(i_MemberDefinition),
      Description: 0,
      NotificationConfiguration: i_NotificationConfiguration,
      WorkerAccessConfiguration: i_WorkerAccessConfiguration,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkteam",
})) as any;

export type DeleteActionError = ResourceNotFound | CommonErrors;
/**
 * Deletes an action.
 */
export const deleteAction: API.OperationMethod<
  DeleteActionRequest,
  DeleteActionResponse,
  DeleteActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ActionName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAction",
})) as any;

export type DeleteAIBenchmarkJobError = ResourceNotFound | CommonErrors;
/**
 * Deletes the specified AI benchmark job.
 */
export const deleteAIBenchmarkJob: API.OperationMethod<
  DeleteAIBenchmarkJobRequest,
  DeleteAIBenchmarkJobResponse,
  DeleteAIBenchmarkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AIBenchmarkJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIBenchmarkJob",
})) as any;

export type DeleteAIRecommendationJobError = ResourceNotFound | CommonErrors;
/**
 * Deletes the specified AI recommendation job.
 */
export const deleteAIRecommendationJob: API.OperationMethod<
  DeleteAIRecommendationJobRequest,
  DeleteAIRecommendationJobResponse,
  DeleteAIRecommendationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AIRecommendationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIRecommendationJob",
})) as any;

export type DeleteAIWorkloadConfigError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes the specified AI workload configuration. You cannot delete a configuration that is referenced by an active benchmark job.
 */
export const deleteAIWorkloadConfig: API.OperationMethod<
  DeleteAIWorkloadConfigRequest,
  DeleteAIWorkloadConfigResponse,
  DeleteAIWorkloadConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AIWorkloadConfigName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIWorkloadConfig",
})) as any;

export type DeleteAlgorithmError = ConflictException | CommonErrors;
/**
 * Removes the specified algorithm from your account.
 */
export const deleteAlgorithm: API.OperationMethod<
  DeleteAlgorithmInput,
  DeleteAlgorithmResponse,
  DeleteAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AlgorithmName: 0 } },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlgorithm",
})) as any;

export type DeleteAppError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Used to stop and delete an app.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      UserProfileName: 0,
      SpaceName: 0,
      AppType: 0,
      AppName: 0,
    },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
})) as any;

export type DeleteAppImageConfigError = ResourceNotFound | CommonErrors;
/**
 * Deletes an AppImageConfig.
 */
export const deleteAppImageConfig: API.OperationMethod<
  DeleteAppImageConfigRequest,
  DeleteAppImageConfigResponse,
  DeleteAppImageConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AppImageConfigName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppImageConfig",
})) as any;

export type DeleteArtifactError = ResourceNotFound | CommonErrors;
/**
 * Deletes an artifact. Either `ArtifactArn` or `Source` must be specified.
 */
export const deleteArtifact: API.OperationMethod<
  DeleteArtifactRequest,
  DeleteArtifactResponse,
  DeleteArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArtifactArn: 0, Source: i_ArtifactSource },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArtifact",
})) as any;

export type DeleteAssociationError = ResourceNotFound | CommonErrors;
/**
 * Deletes an association.
 */
export const deleteAssociation: API.OperationMethod<
  DeleteAssociationRequest,
  DeleteAssociationResponse,
  DeleteAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SourceArn: 0, DestinationArn: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssociation",
})) as any;

export type DeleteClusterError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Delete a SageMaker HyperPod cluster.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterName: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteClusterSchedulerConfigError = ResourceNotFound | CommonErrors;
/**
 * Deletes the cluster policy of the cluster.
 */
export const deleteClusterSchedulerConfig: API.OperationMethod<
  DeleteClusterSchedulerConfigRequest,
  DeleteClusterSchedulerConfigResponse,
  DeleteClusterSchedulerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterSchedulerConfigId: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSchedulerConfig",
})) as any;

export type DeleteCodeRepositoryError = CommonErrors;
/**
 * Deletes the specified Git repository from your account.
 */
export const deleteCodeRepository: API.OperationMethod<
  DeleteCodeRepositoryInput,
  DeleteCodeRepositoryResponse,
  DeleteCodeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CodeRepositoryName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCodeRepository",
})) as any;

export type DeleteCompilationJobError = ResourceNotFound | CommonErrors;
/**
 * Deletes the specified compilation job. This action deletes only the compilation job resource in Amazon SageMaker AI. It doesn't delete other resources that are related to that job, such as the model artifacts that the job creates, the compilation logs in CloudWatch, the compiled model, or the IAM role.
 *
 * You can delete a compilation job only if its current status is `COMPLETED`, `FAILED`, or `STOPPED`. If the job status is `STARTING` or `INPROGRESS`, stop the job, and then delete it after its status becomes `STOPPED`.
 */
export const deleteCompilationJob: API.OperationMethod<
  DeleteCompilationJobRequest,
  DeleteCompilationJobResponse,
  DeleteCompilationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CompilationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCompilationJob",
})) as any;

export type DeleteComputeQuotaError = ResourceNotFound | CommonErrors;
/**
 * Deletes the compute allocation from the cluster.
 */
export const deleteComputeQuota: API.OperationMethod<
  DeleteComputeQuotaRequest,
  DeleteComputeQuotaResponse,
  DeleteComputeQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ComputeQuotaId: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComputeQuota",
})) as any;

export type DeleteContextError = ResourceNotFound | CommonErrors;
/**
 * Deletes an context.
 */
export const deleteContext: API.OperationMethod<
  DeleteContextRequest,
  DeleteContextResponse,
  DeleteContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ContextName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContext",
})) as any;

export type DeleteDataQualityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a data quality monitoring job definition.
 */
export const deleteDataQualityJobDefinition: API.OperationMethod<
  DeleteDataQualityJobDefinitionRequest,
  DeleteDataQualityJobDefinitionResponse,
  DeleteDataQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobDefinitionName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataQualityJobDefinition",
})) as any;

export type DeleteDeviceFleetError = ResourceInUse | CommonErrors;
/**
 * Deletes a fleet.
 */
export const deleteDeviceFleet: API.OperationMethod<
  DeleteDeviceFleetRequest,
  DeleteDeviceFleetResponse,
  DeleteDeviceFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DeviceFleetName: 0 } },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeviceFleet",
})) as any;

export type DeleteDomainError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Used to delete a domain. If you onboarded with IAM mode, you will need to delete your domain to onboard again using IAM Identity Center. Use with caution. All of the members of the domain will lose access to their EFS volume, including data, notebooks, and other artifacts.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, RetentionPolicy: { HomeEfsFileSystem: 0 } },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DeleteEdgeDeploymentPlanError = ResourceInUse | CommonErrors;
/**
 * Deletes an edge deployment plan if (and only if) all the stages in the plan are inactive or there are no stages in the plan.
 */
export const deleteEdgeDeploymentPlan: API.OperationMethod<
  DeleteEdgeDeploymentPlanRequest,
  DeleteEdgeDeploymentPlanResponse,
  DeleteEdgeDeploymentPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EdgeDeploymentPlanName: 0 } },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEdgeDeploymentPlan",
})) as any;

export type DeleteEdgeDeploymentStageError = ResourceInUse | CommonErrors;
/**
 * Delete a stage in an edge deployment plan if (and only if) the stage is inactive.
 */
export const deleteEdgeDeploymentStage: API.OperationMethod<
  DeleteEdgeDeploymentStageRequest,
  DeleteEdgeDeploymentStageResponse,
  DeleteEdgeDeploymentStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgeDeploymentPlanName: 0, StageName: 0 },
  },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEdgeDeploymentStage",
})) as any;

export type DeleteEndpointError = EndpointNotFound | CommonErrors;
/**
 * Deletes an endpoint. SageMaker frees up all of the resources that were deployed when the endpoint was created.
 *
 * SageMaker retires any custom KMS key grants associated with the endpoint, meaning you don't need to use the RevokeGrant API call.
 *
 * When you delete your endpoint, SageMaker asynchronously deletes associated endpoint resources such as KMS key grants. You might still see these resources in your account for a few minutes after deleting your endpoint. Do not delete or revoke the permissions for your ` ExecutionRoleArn `, otherwise SageMaker cannot delete these resources.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointInput,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointName: 0 } },
  errors: [EndpointNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type DeleteEndpointConfigError = EndpointConfigNotFound | CommonErrors;
/**
 * Deletes an endpoint configuration. The `DeleteEndpointConfig` API deletes only the specified configuration. It does not delete endpoints created using the configuration.
 *
 * You must not delete an `EndpointConfig` in use by an endpoint that is live or while the `UpdateEndpoint` or `CreateEndpoint` operations are being performed on the endpoint. If you delete the `EndpointConfig` of an endpoint that is active or being created or updated you may lose visibility into the instance type the endpoint is using. The endpoint must be deleted in order to stop incurring charges.
 */
export const deleteEndpointConfig: API.OperationMethod<
  DeleteEndpointConfigInput,
  DeleteEndpointConfigResponse,
  DeleteEndpointConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointConfigName: 0 } },
  errors: [EndpointConfigNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointConfig",
})) as any;

export type DeleteExperimentError = ResourceNotFound | CommonErrors;
/**
 * Deletes an SageMaker experiment. All trials associated with the experiment must be deleted first. Use the ListTrials API to get a list of the trials associated with the experiment.
 */
export const deleteExperiment: API.OperationMethod<
  DeleteExperimentRequest,
  DeleteExperimentResponse,
  DeleteExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExperimentName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExperiment",
})) as any;

export type DeleteFeatureGroupError = ResourceNotFound | CommonErrors;
/**
 * Delete the `FeatureGroup` and any data that was written to the `OnlineStore` of the `FeatureGroup`. Data cannot be accessed from the `OnlineStore` immediately after `DeleteFeatureGroup` is called.
 *
 * Data written into the `OfflineStore` will not be deleted. The Amazon Web Services Glue database and tables that are automatically created for your `OfflineStore` are not deleted.
 *
 * Note that it can take approximately 10-15 minutes to delete an `OnlineStore` `FeatureGroup` with the `InMemory` `StorageType`.
 */
export const deleteFeatureGroup: API.OperationMethod<
  DeleteFeatureGroupRequest,
  DeleteFeatureGroupResponse,
  DeleteFeatureGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FeatureGroupName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeatureGroup",
})) as any;

export type DeleteFlowDefinitionError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes the specified flow definition.
 */
export const deleteFlowDefinition: API.OperationMethod<
  DeleteFlowDefinitionRequest,
  DeleteFlowDefinitionResponse,
  DeleteFlowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FlowDefinitionName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlowDefinition",
})) as any;

export type DeleteHubError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Delete a hub.
 */
export const deleteHub: API.OperationMethod<
  DeleteHubRequest,
  DeleteHubResponse,
  DeleteHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HubName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHub",
})) as any;

export type DeleteHubContentError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Delete the contents of a hub.
 */
export const deleteHubContent: API.OperationMethod<
  DeleteHubContentRequest,
  DeleteHubContentResponse,
  DeleteHubContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentType: 0,
      HubContentName: 0,
      HubContentVersion: 0,
    },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHubContent",
})) as any;

export type DeleteHubContentReferenceError = ResourceNotFound | CommonErrors;
/**
 * Delete a hub content reference in order to remove a model from a private hub.
 */
export const deleteHubContentReference: API.OperationMethod<
  DeleteHubContentReferenceRequest,
  DeleteHubContentReferenceResponse,
  DeleteHubContentReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HubName: 0, HubContentType: 0, HubContentName: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHubContentReference",
})) as any;

export type DeleteHumanTaskUiError = ResourceNotFound | CommonErrors;
/**
 * Use this operation to delete a human task user interface (worker task template).
 *
 * To see a list of human task user interfaces (work task templates) in your account, use ListHumanTaskUis. When you delete a worker task template, it no longer appears when you call `ListHumanTaskUis`.
 */
export const deleteHumanTaskUi: API.OperationMethod<
  DeleteHumanTaskUiRequest,
  DeleteHumanTaskUiResponse,
  DeleteHumanTaskUiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HumanTaskUiName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHumanTaskUi",
})) as any;

export type DeleteHyperParameterTuningJobError = CommonErrors;
/**
 * Deletes a hyperparameter tuning job. The `DeleteHyperParameterTuningJob` API deletes only the tuning job entry that was created in SageMaker when you called the `CreateHyperParameterTuningJob` API. It does not delete training jobs, artifacts, or the IAM role that you specified when creating the model.
 */
export const deleteHyperParameterTuningJob: API.OperationMethod<
  DeleteHyperParameterTuningJobRequest,
  DeleteHyperParameterTuningJobResponse,
  DeleteHyperParameterTuningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HyperParameterTuningJobName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHyperParameterTuningJob",
})) as any;

export type DeleteImageError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Deletes a SageMaker AI image and all versions of the image. The container images aren't deleted.
 */
export const deleteImage: API.OperationMethod<
  DeleteImageRequest,
  DeleteImageResponse,
  DeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ImageName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImage",
})) as any;

export type DeleteImageVersionError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a version of a SageMaker AI image. The container image the version represents isn't deleted.
 */
export const deleteImageVersion: API.OperationMethod<
  DeleteImageVersionRequest,
  DeleteImageVersionResponse,
  DeleteImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ImageName: 0, Version: 0, Alias: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImageVersion",
})) as any;

export type DeleteInferenceComponentError = CommonErrors;
/**
 * Deletes an inference component.
 */
export const deleteInferenceComponent: API.OperationMethod<
  DeleteInferenceComponentInput,
  DeleteInferenceComponentResponse,
  DeleteInferenceComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InferenceComponentName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInferenceComponent",
})) as any;

export type DeleteInferenceExperimentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes an inference experiment.
 *
 * This operation does not delete your endpoint, variants, or any underlying resources. This operation only deletes the metadata of your experiment.
 */
export const deleteInferenceExperiment: API.OperationMethod<
  DeleteInferenceExperimentRequest,
  DeleteInferenceExperimentResponse,
  DeleteInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInferenceExperiment",
})) as any;

export type DeleteJobError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Deletes a job. This operation is idempotent. If the job is currently running, you must stop it before deleting it by calling `StopJob`.
 *
 * The following operations are related to `DeleteJob`:
 *
 * - `CreateJob`
 *
 * - `StopJob`
 *
 * - `DescribeJob`
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0, JobCategory: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteMlflowAppError = ResourceNotFound | CommonErrors;
/**
 * Deletes an MLflow App.
 */
export const deleteMlflowApp: API.OperationMethod<
  DeleteMlflowAppRequest,
  DeleteMlflowAppResponse,
  DeleteMlflowAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMlflowApp",
})) as any;

export type DeleteMlflowTrackingServerError = ResourceNotFound | CommonErrors;
/**
 * Deletes an MLflow Tracking Server. For more information, see Clean up MLflow resources.
 */
export const deleteMlflowTrackingServer: API.OperationMethod<
  DeleteMlflowTrackingServerRequest,
  DeleteMlflowTrackingServerResponse,
  DeleteMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrackingServerName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMlflowTrackingServer",
})) as any;

export type DeleteModelError = ModelNotFound | CommonErrors;
/**
 * Deletes a model. The `DeleteModel` API deletes only the model entry that was created in SageMaker when you called the `CreateModel` API. It does not delete model artifacts, inference code, or the IAM role that you specified when creating the model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelInput,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelName: 0 } },
  errors: [ModelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
})) as any;

export type DeleteModelBiasJobDefinitionError = ResourceNotFound | CommonErrors;
/**
 * Deletes an Amazon SageMaker AI model bias job definition.
 */
export const deleteModelBiasJobDefinition: API.OperationMethod<
  DeleteModelBiasJobDefinitionRequest,
  DeleteModelBiasJobDefinitionResponse,
  DeleteModelBiasJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobDefinitionName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelBiasJobDefinition",
})) as any;

export type DeleteModelCardError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes an Amazon SageMaker Model Card.
 */
export const deleteModelCard: API.OperationMethod<
  DeleteModelCardRequest,
  DeleteModelCardResponse,
  DeleteModelCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelCardName: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelCard",
})) as any;

export type DeleteModelExplainabilityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes an Amazon SageMaker AI model explainability job definition.
 */
export const deleteModelExplainabilityJobDefinition: API.OperationMethod<
  DeleteModelExplainabilityJobDefinitionRequest,
  DeleteModelExplainabilityJobDefinitionResponse,
  DeleteModelExplainabilityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobDefinitionName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelExplainabilityJobDefinition",
})) as any;

export type DeleteModelPackageError = ConflictException | CommonErrors;
/**
 * Deletes a model package.
 *
 * A model package is used to create SageMaker models or list on Amazon Web Services Marketplace. Buyers can subscribe to model packages listed on Amazon Web Services Marketplace to create models in SageMaker.
 */
export const deleteModelPackage: API.OperationMethod<
  DeleteModelPackageInput,
  DeleteModelPackageResponse,
  DeleteModelPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelPackageName: 0 } },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelPackage",
})) as any;

export type DeleteModelPackageGroupError = ConflictException | CommonErrors;
/**
 * Deletes the specified model group.
 */
export const deleteModelPackageGroup: API.OperationMethod<
  DeleteModelPackageGroupInput,
  DeleteModelPackageGroupResponse,
  DeleteModelPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelPackageGroupName: 0 } },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelPackageGroup",
})) as any;

export type DeleteModelPackageGroupPolicyError = CommonErrors;
/**
 * Deletes a model group resource policy.
 */
export const deleteModelPackageGroupPolicy: API.OperationMethod<
  DeleteModelPackageGroupPolicyInput,
  DeleteModelPackageGroupPolicyResponse,
  DeleteModelPackageGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelPackageGroupName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelPackageGroupPolicy",
})) as any;

export type DeleteModelQualityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes the secified model quality monitoring job definition.
 */
export const deleteModelQualityJobDefinition: API.OperationMethod<
  DeleteModelQualityJobDefinitionRequest,
  DeleteModelQualityJobDefinitionResponse,
  DeleteModelQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobDefinitionName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelQualityJobDefinition",
})) as any;

export type DeleteMonitoringScheduleError = ResourceNotFound | CommonErrors;
/**
 * Deletes a monitoring schedule. Also stops the schedule had not already been stopped. This does not delete the job execution history of the monitoring schedule.
 */
export const deleteMonitoringSchedule: API.OperationMethod<
  DeleteMonitoringScheduleRequest,
  DeleteMonitoringScheduleResponse,
  DeleteMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitoringScheduleName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitoringSchedule",
})) as any;

export type DeleteNotebookInstanceError = CommonErrors;
/**
 * Deletes an SageMaker AI notebook instance. Before you can delete a notebook instance, you must call the `StopNotebookInstance` API.
 *
 * When you delete a notebook instance, you lose all of your data. SageMaker AI removes the ML compute instance, and deletes the ML storage volume and the network interface associated with the notebook instance.
 */
export const deleteNotebookInstance: API.OperationMethod<
  DeleteNotebookInstanceInput,
  DeleteNotebookInstanceResponse,
  DeleteNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NotebookInstanceName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebookInstance",
})) as any;

export type DeleteNotebookInstanceLifecycleConfigError = CommonErrors;
/**
 * Deletes a notebook instance lifecycle configuration.
 */
export const deleteNotebookInstanceLifecycleConfig: API.OperationMethod<
  DeleteNotebookInstanceLifecycleConfigInput,
  DeleteNotebookInstanceLifecycleConfigResponse,
  DeleteNotebookInstanceLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookInstanceLifecycleConfigName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebookInstanceLifecycleConfig",
})) as any;

export type DeleteOptimizationJobError = ResourceNotFound | CommonErrors;
/**
 * Deletes an optimization job.
 */
export const deleteOptimizationJob: API.OperationMethod<
  DeleteOptimizationJobRequest,
  DeleteOptimizationJobResponse,
  DeleteOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OptimizationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOptimizationJob",
})) as any;

export type DeletePartnerAppError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a SageMaker Partner AI App.
 */
export const deletePartnerApp: API.OperationMethod<
  DeletePartnerAppRequest,
  DeletePartnerAppResponse,
  DeletePartnerAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, ClientToken: D.m({ idempotency: true }) },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartnerApp",
})) as any;

export type DeletePipelineError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a pipeline if there are no running instances of the pipeline. To delete a pipeline, you must stop all running instances of the pipeline using the `StopPipelineExecution` API. When you delete a pipeline, all instances of the pipeline are deleted.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PipelineName: 0, ClientRequestToken: D.m({ idempotency: true }) },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
})) as any;

export type DeleteProcessingJobError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a processing job. After Amazon SageMaker deletes a processing job, all of the metadata for the processing job is lost. You can delete only processing jobs that are in a terminal state (`Stopped`, `Failed`, or `Completed`). You cannot delete a job that is in the `InProgress` or `Stopping` state. After deleting the job, you can reuse its name to create another processing job.
 */
export const deleteProcessingJob: API.OperationMethod<
  DeleteProcessingJobRequest,
  DeleteProcessingJobResponse,
  DeleteProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProcessingJobName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProcessingJob",
})) as any;

export type DeleteProjectError = ConflictException | CommonErrors;
/**
 * Delete the specified project.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProjectName: 0 } },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

export type DeleteSpaceError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Used to delete a space.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0, SpaceName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
})) as any;

export type DeleteStudioLifecycleConfigError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes the Amazon SageMaker AI Studio Lifecycle Configuration. In order to delete the Lifecycle Configuration, there must be no running apps using the Lifecycle Configuration. You must also remove the Lifecycle Configuration from UserSettings in all Domains and UserProfiles.
 */
export const deleteStudioLifecycleConfig: API.OperationMethod<
  DeleteStudioLifecycleConfigRequest,
  DeleteStudioLifecycleConfigResponse,
  DeleteStudioLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StudioLifecycleConfigName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudioLifecycleConfig",
})) as any;

export type DeleteTagsError = CommonErrors;
/**
 * Deletes the specified tags from an SageMaker resource.
 *
 * To list a resource's tags, use the `ListTags` API.
 *
 * When you call this API to delete tags from a hyperparameter tuning job, the deleted tags are not removed from training jobs that the hyperparameter tuning job launched before you called this API.
 *
 * When you call this API to delete tags from a SageMaker Domain or User Profile, the deleted tags are not removed from Apps that the SageMaker Domain or User Profile launched before you called this API.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsInput,
  DeleteTagsOutput,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DeleteTrainingJobError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a training job. After SageMaker deletes a training job, all of the metadata for the training job is lost. You can delete only training jobs that are in a terminal state (`Stopped`, `Failed`, or `Completed`) and don't retain an `Available` managed warm pool. You cannot delete a job that is in the `InProgress` or `Stopping` state. After deleting the job, you can reuse its name to create another training job.
 */
export const deleteTrainingJob: API.OperationMethod<
  DeleteTrainingJobRequest,
  DeleteTrainingJobResponse,
  DeleteTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrainingJobName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrainingJob",
})) as any;

export type DeleteTrialError = ResourceNotFound | CommonErrors;
/**
 * Deletes the specified trial. All trial components that make up the trial must be deleted first. Use the DescribeTrialComponent API to get the list of trial components.
 */
export const deleteTrial: API.OperationMethod<
  DeleteTrialRequest,
  DeleteTrialResponse,
  DeleteTrialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrialName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrial",
})) as any;

export type DeleteTrialComponentError = ResourceNotFound | CommonErrors;
/**
 * Deletes the specified trial component. A trial component must be disassociated from all trials before the trial component can be deleted. To disassociate a trial component from a trial, call the DisassociateTrialComponent API.
 */
export const deleteTrialComponent: API.OperationMethod<
  DeleteTrialComponentRequest,
  DeleteTrialComponentResponse,
  DeleteTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrialComponentName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrialComponent",
})) as any;

export type DeleteUserProfileError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes a user profile. When a user profile is deleted, the user loses access to their EFS volume, including data, notebooks, and other artifacts.
 */
export const deleteUserProfile: API.OperationMethod<
  DeleteUserProfileRequest,
  DeleteUserProfileResponse,
  DeleteUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DomainId: 0, UserProfileName: 0 } },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserProfile",
})) as any;

export type DeleteWorkforceError = CommonErrors;
/**
 * Use this operation to delete a workforce.
 *
 * If you want to create a new workforce in an Amazon Web Services Region where a workforce already exists, use this operation to delete the existing workforce and then use CreateWorkforce to create a new workforce.
 *
 * If a private workforce contains one or more work teams, you must use the DeleteWorkteam operation to delete all work teams before you delete the workforce. If you try to delete a workforce that contains one or more work teams, you will receive a `ResourceInUse` error.
 */
export const deleteWorkforce: API.OperationMethod<
  DeleteWorkforceRequest,
  DeleteWorkforceResponse,
  DeleteWorkforceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkforceName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkforce",
})) as any;

export type DeleteWorkteamError = ResourceLimitExceeded | CommonErrors;
/**
 * Deletes an existing work team. This operation can't be undone.
 */
export const deleteWorkteam: API.OperationMethod<
  DeleteWorkteamRequest,
  DeleteWorkteamResponse,
  DeleteWorkteamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkteamName: 0 } },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkteam",
})) as any;

export type DeregisterDevicesError = CommonErrors;
/**
 * Deregisters the specified devices. After you deregister a device, you will need to re-register the devices.
 */
export const deregisterDevices: API.OperationMethod<
  DeregisterDevicesRequest,
  DeregisterDevicesResponse,
  DeregisterDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DeviceFleetName: 0, DeviceNames: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDevices",
})) as any;

export type DescribeActionError = ResourceNotFound | CommonErrors;
/**
 * Describes an action.
 */
export const describeAction: API.OperationMethod<
  DescribeActionRequest,
  DescribeActionResponse,
  DescribeActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ActionName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAction",
})) as any;

export type DescribeAIBenchmarkJobError = ResourceNotFound | CommonErrors;
/**
 * Returns details of an AI benchmark job, including its status, configuration, target endpoint, and timing information.
 */
export const describeAIBenchmarkJob: API.OperationMethod<
  DescribeAIBenchmarkJobRequest,
  DescribeAIBenchmarkJobResponse,
  DescribeAIBenchmarkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AIBenchmarkJobName: 0 },
    output: { CreationTime: D.ts, StartTime: D.ts, EndTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAIBenchmarkJob",
})) as any;

export type DescribeAIRecommendationJobError = ResourceNotFound | CommonErrors;
/**
 * Returns details of an AI recommendation job, including its status, model source, performance targets, optimization recommendations, and deployment configurations.
 */
export const describeAIRecommendationJob: API.OperationMethod<
  DescribeAIRecommendationJobRequest,
  DescribeAIRecommendationJobResponse,
  DescribeAIRecommendationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AIRecommendationJobName: 0 },
    output: { CreationTime: D.ts, StartTime: D.ts, EndTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAIRecommendationJob",
})) as any;

export type DescribeAIWorkloadConfigError = ResourceNotFound | CommonErrors;
/**
 * Returns details of an AI workload configuration, including the dataset configuration, benchmark tool settings, tags, and creation time.
 */
export const describeAIWorkloadConfig: API.OperationMethod<
  DescribeAIWorkloadConfigRequest,
  DescribeAIWorkloadConfigResponse,
  DescribeAIWorkloadConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AIWorkloadConfigName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAIWorkloadConfig",
})) as any;

export type DescribeAlgorithmError = CommonErrors;
/**
 * Returns a description of the specified algorithm that is in your account.
 */
export const describeAlgorithm: API.OperationMethod<
  DescribeAlgorithmInput,
  DescribeAlgorithmOutput,
  DescribeAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AlgorithmName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlgorithm",
})) as any;

export type DescribeAppError = ResourceNotFound | CommonErrors;
/**
 * Describes the app.
 */
export const describeApp: API.OperationMethod<
  DescribeAppRequest,
  DescribeAppResponse,
  DescribeAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      UserProfileName: 0,
      SpaceName: 0,
      AppType: 0,
      AppName: 0,
    },
    output: {
      LastHealthCheckTimestamp: D.ts,
      LastUserActivityTimestamp: D.ts,
      CreationTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApp",
})) as any;

export type DescribeAppImageConfigError = ResourceNotFound | CommonErrors;
/**
 * Describes an AppImageConfig.
 */
export const describeAppImageConfig: API.OperationMethod<
  DescribeAppImageConfigRequest,
  DescribeAppImageConfigResponse,
  DescribeAppImageConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AppImageConfigName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppImageConfig",
})) as any;

export type DescribeArtifactError = ResourceNotFound | CommonErrors;
/**
 * Describes an artifact.
 */
export const describeArtifact: API.OperationMethod<
  DescribeArtifactRequest,
  DescribeArtifactResponse,
  DescribeArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArtifactArn: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeArtifact",
})) as any;

export type DescribeAutoMLJobError = ResourceNotFound | CommonErrors;
/**
 * Returns information about an AutoML job created by calling CreateAutoMLJob.
 *
 * AutoML jobs created by calling CreateAutoMLJobV2 cannot be described by `DescribeAutoMLJob`.
 */
export const describeAutoMLJob: API.OperationMethod<
  DescribeAutoMLJobRequest,
  DescribeAutoMLJobResponse,
  DescribeAutoMLJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoMLJobName: 0 },
    output: {
      CreationTime: D.ts,
      EndTime: D.ts,
      LastModifiedTime: D.ts,
      BestCandidate: o_AutoMLCandidate,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoMLJob",
})) as any;

export type DescribeAutoMLJobV2Error = ResourceNotFound | CommonErrors;
/**
 * Returns information about an AutoML job created by calling CreateAutoMLJobV2 or CreateAutoMLJob.
 */
export const describeAutoMLJobV2: API.OperationMethod<
  DescribeAutoMLJobV2Request,
  DescribeAutoMLJobV2Response,
  DescribeAutoMLJobV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoMLJobName: 0 },
    output: {
      CreationTime: D.ts,
      EndTime: D.ts,
      LastModifiedTime: D.ts,
      BestCandidate: o_AutoMLCandidate,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoMLJobV2",
})) as any;

export type DescribeClusterError = ResourceNotFound | CommonErrors;
/**
 * Retrieves information of a SageMaker HyperPod cluster.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0 },
    output: {
      CreationTime: D.ts,
      InstanceGroups: D.list({
        AutoPatchConfig: {
          CurrentPatchSchedule: o_ClusterPatchScheduleDetails,
          DesiredPatchSchedule: o_ClusterPatchScheduleDetails,
        },
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
})) as any;

export type DescribeClusterEventError = ResourceNotFound | CommonErrors;
/**
 * Retrieves detailed information about a specific event for a given HyperPod cluster. This functionality is only supported when the `NodeProvisioningMode` is set to `Continuous`.
 */
export const describeClusterEvent: API.OperationMethod<
  DescribeClusterEventRequest,
  DescribeClusterEventResponse,
  DescribeClusterEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventId: 0, ClusterName: 0 },
    output: { EventDetails: { EventTime: D.ts } },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterEvent",
})) as any;

export type DescribeClusterNodeError = ResourceNotFound | CommonErrors;
/**
 * Retrieves information of a node (also called a *instance* interchangeably) of a SageMaker HyperPod cluster.
 */
export const describeClusterNode: API.OperationMethod<
  DescribeClusterNodeRequest,
  DescribeClusterNodeResponse,
  DescribeClusterNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NodeId: 0, NodeLogicalId: 0 },
    output: { NodeDetails: { LaunchTime: D.ts, LastSoftwareUpdateTime: D.ts } },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterNode",
})) as any;

export type DescribeClusterSchedulerConfigError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Description of the cluster policy. This policy is used for task prioritization and fair-share allocation. This helps prioritize critical workloads and distributes idle compute across entities.
 */
export const describeClusterSchedulerConfig: API.OperationMethod<
  DescribeClusterSchedulerConfigRequest,
  DescribeClusterSchedulerConfigResponse,
  DescribeClusterSchedulerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterSchedulerConfigId: 0, ClusterSchedulerConfigVersion: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSchedulerConfig",
})) as any;

export type DescribeCodeRepositoryError = CommonErrors;
/**
 * Gets details about the specified Git repository.
 */
export const describeCodeRepository: API.OperationMethod<
  DescribeCodeRepositoryInput,
  DescribeCodeRepositoryOutput,
  DescribeCodeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CodeRepositoryName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCodeRepository",
})) as any;

export type DescribeCompilationJobError = ResourceNotFound | CommonErrors;
/**
 * Returns information about a model compilation job.
 *
 * To create a model compilation job, use CreateCompilationJob. To get information about multiple model compilation jobs, use ListCompilationJobs.
 */
export const describeCompilationJob: API.OperationMethod<
  DescribeCompilationJobRequest,
  DescribeCompilationJobResponse,
  DescribeCompilationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CompilationJobName: 0 },
    output: {
      CompilationStartTime: D.ts,
      CompilationEndTime: D.ts,
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCompilationJob",
})) as any;

export type DescribeComputeQuotaError = ResourceNotFound | CommonErrors;
/**
 * Description of the compute allocation definition.
 */
export const describeComputeQuota: API.OperationMethod<
  DescribeComputeQuotaRequest,
  DescribeComputeQuotaResponse,
  DescribeComputeQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ComputeQuotaId: 0, ComputeQuotaVersion: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputeQuota",
})) as any;

export type DescribeContextError = ResourceNotFound | CommonErrors;
/**
 * Describes a context.
 */
export const describeContext: API.OperationMethod<
  DescribeContextRequest,
  DescribeContextResponse,
  DescribeContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ContextName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContext",
})) as any;

export type DescribeDataQualityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Gets the details of a data quality monitoring job definition.
 */
export const describeDataQualityJobDefinition: API.OperationMethod<
  DescribeDataQualityJobDefinitionRequest,
  DescribeDataQualityJobDefinitionResponse,
  DescribeDataQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobDefinitionName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataQualityJobDefinition",
})) as any;

export type DescribeDeviceError = ResourceNotFound | CommonErrors;
/**
 * Describes the device.
 */
export const describeDevice: API.OperationMethod<
  DescribeDeviceRequest,
  DescribeDeviceResponse,
  DescribeDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, DeviceName: 0, DeviceFleetName: 0 },
    output: {
      RegistrationTime: D.ts,
      LatestHeartbeat: D.ts,
      Models: D.list({ LatestSampleTime: D.ts, LatestInference: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDevice",
})) as any;

export type DescribeDeviceFleetError = ResourceNotFound | CommonErrors;
/**
 * A description of the fleet the device belongs to.
 */
export const describeDeviceFleet: API.OperationMethod<
  DescribeDeviceFleetRequest,
  DescribeDeviceFleetResponse,
  DescribeDeviceFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeviceFleetName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeviceFleet",
})) as any;

export type DescribeDomainError = ResourceNotFound | CommonErrors;
/**
 * The description of the domain.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResponse,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
})) as any;

export type DescribeEdgeDeploymentPlanError = ResourceNotFound | CommonErrors;
/**
 * Describes an edge deployment plan with deployment status per stage.
 */
export const describeEdgeDeploymentPlan: API.OperationMethod<
  DescribeEdgeDeploymentPlanRequest,
  DescribeEdgeDeploymentPlanResponse,
  DescribeEdgeDeploymentPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgeDeploymentPlanName: 0, NextToken: 0, MaxResults: 0 },
    output: {
      Stages: D.list({
        DeploymentStatus: { EdgeDeploymentStageStartTime: D.ts },
      }),
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEdgeDeploymentPlan",
})) as any;

export type DescribeEdgePackagingJobError = ResourceNotFound | CommonErrors;
/**
 * A description of edge packaging jobs.
 */
export const describeEdgePackagingJob: API.OperationMethod<
  DescribeEdgePackagingJobRequest,
  DescribeEdgePackagingJobResponse,
  DescribeEdgePackagingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgePackagingJobName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEdgePackagingJob",
})) as any;

export type DescribeEndpointError = EndpointNotFound | CommonErrors;
/**
 * Returns the description of an endpoint.
 */
export const describeEndpoint: API.OperationMethod<
  DescribeEndpointInput,
  DescribeEndpointOutput,
  DescribeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointName: 0 },
    output: {
      ProductionVariants: D.list(o_ProductionVariantSummary),
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      PendingDeploymentSummary: {
        ProductionVariants: D.list(o_PendingProductionVariantSummary),
        StartTime: D.ts,
        ShadowProductionVariants: D.list(o_PendingProductionVariantSummary),
      },
      ShadowProductionVariants: D.list(o_ProductionVariantSummary),
    },
  },
  errors: [EndpointNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoint",
})) as any;

export type DescribeEndpointConfigError = EndpointConfigNotFound | CommonErrors;
/**
 * Returns the description of an endpoint configuration created using the `CreateEndpointConfig` API.
 */
export const describeEndpointConfig: API.OperationMethod<
  DescribeEndpointConfigInput,
  DescribeEndpointConfigOutput,
  DescribeEndpointConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointConfigName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [EndpointConfigNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointConfig",
})) as any;

export type DescribeExperimentError = ResourceNotFound | CommonErrors;
/**
 * Provides a list of an experiment's properties.
 */
export const describeExperiment: API.OperationMethod<
  DescribeExperimentRequest,
  DescribeExperimentResponse,
  DescribeExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExperimentName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExperiment",
})) as any;

export type DescribeFeatureGroupError = ResourceNotFound | CommonErrors;
/**
 * Use this operation to describe a `FeatureGroup`. The response includes information on the creation time, `FeatureGroup` name, the unique identifier for each `FeatureGroup`, and more.
 */
export const describeFeatureGroup: API.OperationMethod<
  DescribeFeatureGroupRequest,
  DescribeFeatureGroupResponse,
  DescribeFeatureGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FeatureGroupName: 0, NextToken: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeatureGroup",
})) as any;

export type DescribeFeatureMetadataError = ResourceNotFound | CommonErrors;
/**
 * Shows the metadata for a feature within a feature group.
 */
export const describeFeatureMetadata: API.OperationMethod<
  DescribeFeatureMetadataRequest,
  DescribeFeatureMetadataResponse,
  DescribeFeatureMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FeatureGroupName: 0, FeatureName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeatureMetadata",
})) as any;

export type DescribeFlowDefinitionError = ResourceNotFound | CommonErrors;
/**
 * Returns information about the specified flow definition.
 */
export const describeFlowDefinition: API.OperationMethod<
  DescribeFlowDefinitionRequest,
  DescribeFlowDefinitionResponse,
  DescribeFlowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FlowDefinitionName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowDefinition",
})) as any;

export type DescribeHubError = ResourceNotFound | CommonErrors;
/**
 * Describes a hub.
 */
export const describeHub: API.OperationMethod<
  DescribeHubRequest,
  DescribeHubResponse,
  DescribeHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HubName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHub",
})) as any;

export type DescribeHubContentError = ResourceNotFound | CommonErrors;
/**
 * Describe the content of a hub.
 */
export const describeHubContent: API.OperationMethod<
  DescribeHubContentRequest,
  DescribeHubContentResponse,
  DescribeHubContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentType: 0,
      HubContentName: 0,
      HubContentVersion: 0,
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHubContent",
})) as any;

export type DescribeHumanTaskUiError = ResourceNotFound | CommonErrors;
/**
 * Returns information about the requested human task user interface (worker task template).
 */
export const describeHumanTaskUi: API.OperationMethod<
  DescribeHumanTaskUiRequest,
  DescribeHumanTaskUiResponse,
  DescribeHumanTaskUiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HumanTaskUiName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHumanTaskUi",
})) as any;

export type DescribeHyperParameterTuningJobError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a description of a hyperparameter tuning job, depending on the fields selected. These fields can include the name, Amazon Resource Name (ARN), job status of your tuning job and more.
 */
export const describeHyperParameterTuningJob: API.OperationMethod<
  DescribeHyperParameterTuningJobRequest,
  DescribeHyperParameterTuningJobResponse,
  DescribeHyperParameterTuningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HyperParameterTuningJobName: 0 },
    output: {
      CreationTime: D.ts,
      HyperParameterTuningEndTime: D.ts,
      LastModifiedTime: D.ts,
      BestTrainingJob: o_HyperParameterTrainingJobSummary,
      OverallBestTrainingJob: o_HyperParameterTrainingJobSummary,
      TuningJobCompletionDetails: o_HyperParameterTuningJobCompletionDetails,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHyperParameterTuningJob",
})) as any;

export type DescribeImageError = ResourceNotFound | CommonErrors;
/**
 * Describes a SageMaker AI image.
 */
export const describeImage: API.OperationMethod<
  DescribeImageRequest,
  DescribeImageResponse,
  DescribeImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImage",
})) as any;

export type DescribeImageVersionError = ResourceNotFound | CommonErrors;
/**
 * Describes a version of a SageMaker AI image.
 */
export const describeImageVersion: API.OperationMethod<
  DescribeImageVersionRequest,
  DescribeImageVersionResponse,
  DescribeImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageName: 0, Version: 0, Alias: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageVersion",
})) as any;

export type DescribeInferenceComponentError = CommonErrors;
/**
 * Returns information about an inference component.
 */
export const describeInferenceComponent: API.OperationMethod<
  DescribeInferenceComponentInput,
  DescribeInferenceComponentOutput,
  DescribeInferenceComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InferenceComponentName: 0 },
    output: {
      Specification: o_InferenceComponentSpecificationSummary,
      Specifications: D.list(o_InferenceComponentSpecificationSummary),
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInferenceComponent",
})) as any;

export type DescribeInferenceExperimentError = ResourceNotFound | CommonErrors;
/**
 * Returns details about an inference experiment.
 */
export const describeInferenceExperiment: API.OperationMethod<
  DescribeInferenceExperimentRequest,
  DescribeInferenceExperimentResponse,
  DescribeInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: {
      Schedule: o_InferenceExperimentSchedule,
      CreationTime: D.ts,
      CompletionTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInferenceExperiment",
})) as any;

export type DescribeInferenceRecommendationsJobError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Provides the results of the Inference Recommender job. One or more recommendation jobs are returned.
 */
export const describeInferenceRecommendationsJob: API.OperationMethod<
  DescribeInferenceRecommendationsJobRequest,
  DescribeInferenceRecommendationsJobResponse,
  DescribeInferenceRecommendationsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobName: 0 },
    output: {
      CreationTime: D.ts,
      CompletionTime: D.ts,
      LastModifiedTime: D.ts,
      InferenceRecommendations: D.list({
        InvocationEndTime: D.ts,
        InvocationStartTime: D.ts,
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInferenceRecommendationsJob",
})) as any;

export type DescribeJobError = ResourceNotFound | CommonErrors;
/**
 * Returns detailed information about a job, including its current status, secondary status, configuration, and timestamps. Use `SecondaryStatus` for granular progress tracking and `SecondaryStatusTransitions` to see the full history of status changes with timestamps.
 *
 * The following operations are related to `DescribeJob`:
 *
 * - `CreateJob`
 *
 * - `ListJobs`
 *
 * - `StopJob`
 *
 * - `DeleteJob`
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResponse,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobName: 0, JobCategory: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      EndTime: D.ts,
      SecondaryStatusTransitions: D.list(o_JobSecondaryStatusTransition),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
})) as any;

export type DescribeJobSchemaVersionError = ResourceNotFound | CommonErrors;
/**
 * Returns the JSON schema for a specified job category and schema version. Use this schema to validate your `JobConfigDocument` before calling `CreateJob`. If you don't specify a schema version, the latest version is returned. The schema defines required fields, allowed values, and constraints for the job configuration.
 *
 * The following operations are related to `DescribeJobSchemaVersion`:
 *
 * - `ListJobSchemaVersions`
 *
 * - `CreateJob`
 */
export const describeJobSchemaVersion: API.OperationMethod<
  DescribeJobSchemaVersionRequest,
  DescribeJobSchemaVersionResponse,
  DescribeJobSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobCategory: 0, JobConfigSchemaVersion: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobSchemaVersion",
})) as any;

export type DescribeLabelingJobError = ResourceNotFound | CommonErrors;
/**
 * Gets information about a labeling job.
 */
export const describeLabelingJob: API.OperationMethod<
  DescribeLabelingJobRequest,
  DescribeLabelingJobResponse,
  DescribeLabelingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LabelingJobName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLabelingJob",
})) as any;

export type DescribeLineageGroupError = ResourceNotFound | CommonErrors;
/**
 * Provides a list of properties for the requested lineage group. For more information, see Cross-Account Lineage Tracking in the *Amazon SageMaker Developer Guide*.
 */
export const describeLineageGroup: API.OperationMethod<
  DescribeLineageGroupRequest,
  DescribeLineageGroupResponse,
  DescribeLineageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LineageGroupName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLineageGroup",
})) as any;

export type DescribeMlflowAppError = ResourceNotFound | CommonErrors;
/**
 * Returns information about an MLflow App.
 */
export const describeMlflowApp: API.OperationMethod<
  DescribeMlflowAppRequest,
  DescribeMlflowAppResponse,
  DescribeMlflowAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMlflowApp",
})) as any;

export type DescribeMlflowTrackingServerError = ResourceNotFound | CommonErrors;
/**
 * Returns information about an MLflow Tracking Server.
 */
export const describeMlflowTrackingServer: API.OperationMethod<
  DescribeMlflowTrackingServerRequest,
  DescribeMlflowTrackingServerResponse,
  DescribeMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrackingServerName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMlflowTrackingServer",
})) as any;

export type DescribeModelError = ModelNotFound | CommonErrors;
/**
 * Describes a model that you created using the `CreateModel` API.
 */
export const describeModel: API.OperationMethod<
  DescribeModelInput,
  DescribeModelOutput,
  DescribeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ModelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModel",
})) as any;

export type DescribeModelBiasJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a description of a model bias job definition.
 */
export const describeModelBiasJobDefinition: API.OperationMethod<
  DescribeModelBiasJobDefinitionRequest,
  DescribeModelBiasJobDefinitionResponse,
  DescribeModelBiasJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobDefinitionName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelBiasJobDefinition",
})) as any;

export type DescribeModelCardError = ResourceNotFound | CommonErrors;
/**
 * Describes the content, creation time, and security configuration of an Amazon SageMaker Model Card.
 *
 * To retrieve only metadata about a model card without requiring `kms:Decrypt` permission on the associated customer-managed Amazon Web Services KMS key, set `IncludedData` to `MetadataOnly`. The default is `AllData`, which returns the full model card `Content` and requires `kms:Decrypt` permission when a customer-managed key is configured.
 */
export const describeModelCard: API.OperationMethod<
  DescribeModelCardRequest,
  DescribeModelCardResponse,
  DescribeModelCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelCardName: 0, ModelCardVersion: 0, IncludedData: 0 },
    output: { Content: D.secret, CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelCard",
})) as any;

export type DescribeModelCardExportJobError = ResourceNotFound | CommonErrors;
/**
 * Describes an Amazon SageMaker Model Card export job.
 */
export const describeModelCardExportJob: API.OperationMethod<
  DescribeModelCardExportJobRequest,
  DescribeModelCardExportJobResponse,
  DescribeModelCardExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelCardExportJobArn: 0 },
    output: { CreatedAt: D.ts, LastModifiedAt: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelCardExportJob",
})) as any;

export type DescribeModelExplainabilityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a description of a model explainability job definition.
 */
export const describeModelExplainabilityJobDefinition: API.OperationMethod<
  DescribeModelExplainabilityJobDefinitionRequest,
  DescribeModelExplainabilityJobDefinitionResponse,
  DescribeModelExplainabilityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobDefinitionName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelExplainabilityJobDefinition",
})) as any;

export type DescribeModelPackageError = CommonErrors;
/**
 * Returns a description of the specified model package, which is used to create SageMaker models or list them on Amazon Web Services Marketplace.
 *
 * If you provided a KMS Key ID when you created your model package, you will see the KMS Decrypt API call in your CloudTrail logs when you use this API. To call this operation without requiring `kms:Decrypt` permission on the customer-managed key, set `IncludedData` to `MetadataOnly`; the response is returned with the embedded `ModelCard.ModelCardContent` field sanitized.
 *
 * To create models in SageMaker, buyers can subscribe to model packages listed on Amazon Web Services Marketplace.
 */
export const describeModelPackage: API.OperationMethod<
  DescribeModelPackageInput,
  DescribeModelPackageOutput,
  DescribeModelPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelPackageName: 0, IncludedData: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      ModelCard: o_ModelPackageModelCard,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelPackage",
})) as any;

export type DescribeModelPackageGroupError = CommonErrors;
/**
 * Gets a description for the specified model group.
 */
export const describeModelPackageGroup: API.OperationMethod<
  DescribeModelPackageGroupInput,
  DescribeModelPackageGroupOutput,
  DescribeModelPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelPackageGroupName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelPackageGroup",
})) as any;

export type DescribeModelQualityJobDefinitionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a description of a model quality job definition.
 */
export const describeModelQualityJobDefinition: API.OperationMethod<
  DescribeModelQualityJobDefinitionRequest,
  DescribeModelQualityJobDefinitionResponse,
  DescribeModelQualityJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobDefinitionName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelQualityJobDefinition",
})) as any;

export type DescribeMonitoringScheduleError = ResourceNotFound | CommonErrors;
/**
 * Describes the schedule for a monitoring job.
 */
export const describeMonitoringSchedule: API.OperationMethod<
  DescribeMonitoringScheduleRequest,
  DescribeMonitoringScheduleResponse,
  DescribeMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MonitoringScheduleName: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      LastMonitoringExecutionSummary: o_MonitoringExecutionSummary,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMonitoringSchedule",
})) as any;

export type DescribeNotebookInstanceError = CommonErrors;
/**
 * Returns information about a notebook instance.
 */
export const describeNotebookInstance: API.OperationMethod<
  DescribeNotebookInstanceInput,
  DescribeNotebookInstanceOutput,
  DescribeNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookInstanceName: 0 },
    output: { LastModifiedTime: D.ts, CreationTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotebookInstance",
})) as any;

export type DescribeNotebookInstanceLifecycleConfigError = CommonErrors;
/**
 * Returns a description of a notebook instance lifecycle configuration.
 *
 * For information about notebook instance lifestyle configurations, see Step 2.1: (Optional) Customize a Notebook Instance.
 */
export const describeNotebookInstanceLifecycleConfig: API.OperationMethod<
  DescribeNotebookInstanceLifecycleConfigInput,
  DescribeNotebookInstanceLifecycleConfigOutput,
  DescribeNotebookInstanceLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookInstanceLifecycleConfigName: 0 },
    output: { LastModifiedTime: D.ts, CreationTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotebookInstanceLifecycleConfig",
})) as any;

export type DescribeOptimizationJobError = ResourceNotFound | CommonErrors;
/**
 * Provides the properties of the specified optimization job.
 */
export const describeOptimizationJob: API.OperationMethod<
  DescribeOptimizationJobRequest,
  DescribeOptimizationJobResponse,
  DescribeOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OptimizationJobName: 0 },
    output: {
      OptimizationStartTime: D.ts,
      OptimizationEndTime: D.ts,
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptimizationJob",
})) as any;

export type DescribePartnerAppError = ResourceNotFound | CommonErrors;
/**
 * Gets information about a SageMaker Partner AI App.
 */
export const describePartnerApp: API.OperationMethod<
  DescribePartnerAppRequest,
  DescribePartnerAppResponse,
  DescribePartnerAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, IncludeAvailableUpgrade: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      CurrentVersionEolDate: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartnerApp",
})) as any;

export type DescribePipelineError = ResourceNotFound | CommonErrors;
/**
 * Describes the details of a pipeline.
 */
export const describePipeline: API.OperationMethod<
  DescribePipelineRequest,
  DescribePipelineResponse,
  DescribePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PipelineName: 0, PipelineVersionId: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts, LastRunTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipeline",
})) as any;

export type DescribePipelineDefinitionForExecutionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Describes the details of an execution's pipeline definition.
 */
export const describePipelineDefinitionForExecution: API.OperationMethod<
  DescribePipelineDefinitionForExecutionRequest,
  DescribePipelineDefinitionForExecutionResponse,
  DescribePipelineDefinitionForExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PipelineExecutionArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipelineDefinitionForExecution",
})) as any;

export type DescribePipelineExecutionError = ResourceNotFound | CommonErrors;
/**
 * Describes the details of a pipeline execution.
 */
export const describePipelineExecution: API.OperationMethod<
  DescribePipelineExecutionRequest,
  DescribePipelineExecutionResponse,
  DescribePipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PipelineExecutionArn: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipelineExecution",
})) as any;

export type DescribeProcessingJobError = ResourceNotFound | CommonErrors;
/**
 * Returns a description of a processing job.
 */
export const describeProcessingJob: API.OperationMethod<
  DescribeProcessingJobRequest,
  DescribeProcessingJobResponse,
  DescribeProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProcessingJobName: 0 },
    output: {
      ProcessingEndTime: D.ts,
      ProcessingStartTime: D.ts,
      LastModifiedTime: D.ts,
      CreationTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProcessingJob",
})) as any;

export type DescribeProjectError = CommonErrors;
/**
 * Describes the details of a project.
 */
export const describeProject: API.OperationMethod<
  DescribeProjectInput,
  DescribeProjectOutput,
  DescribeProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProjectName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
})) as any;

export type DescribeReservedCapacityError = ResourceNotFound | CommonErrors;
/**
 * Retrieves details about a reserved capacity.
 */
export const describeReservedCapacity: API.OperationMethod<
  DescribeReservedCapacityRequest,
  DescribeReservedCapacityResponse,
  DescribeReservedCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReservedCapacityArn: 0 },
    output: { StartTime: D.ts, EndTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedCapacity",
})) as any;

export type DescribeSpaceError = ResourceNotFound | CommonErrors;
/**
 * Describes the space.
 */
export const describeSpace: API.OperationMethod<
  DescribeSpaceRequest,
  DescribeSpaceResponse,
  DescribeSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, SpaceName: 0 },
    output: { LastModifiedTime: D.ts, CreationTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpace",
})) as any;

export type DescribeStudioLifecycleConfigError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Describes the Amazon SageMaker AI Studio Lifecycle Configuration.
 */
export const describeStudioLifecycleConfig: API.OperationMethod<
  DescribeStudioLifecycleConfigRequest,
  DescribeStudioLifecycleConfigResponse,
  DescribeStudioLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StudioLifecycleConfigName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStudioLifecycleConfig",
})) as any;

export type DescribeSubscribedWorkteamError = CommonErrors;
/**
 * Gets information about a work team provided by a vendor. It returns details about the subscription with a vendor in the Amazon Web Services Marketplace.
 */
export const describeSubscribedWorkteam: API.OperationMethod<
  DescribeSubscribedWorkteamRequest,
  DescribeSubscribedWorkteamResponse,
  DescribeSubscribedWorkteamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkteamArn: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscribedWorkteam",
})) as any;

export type DescribeTrainingJobError = ResourceNotFound | CommonErrors;
/**
 * Returns information about a training job.
 *
 * Some of the attributes below only appear if the training job successfully starts. If the training job fails, `TrainingJobStatus` is `Failed` and, depending on the `FailureReason`, attributes like `TrainingStartTime`, `TrainingTimeInSeconds`, `TrainingEndTime`, and `BillableTimeInSeconds` may not be present in the response.
 */
export const describeTrainingJob: API.OperationMethod<
  DescribeTrainingJobRequest,
  DescribeTrainingJobResponse,
  DescribeTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrainingJobName: 0 },
    output: {
      CreationTime: D.ts,
      TrainingStartTime: D.ts,
      TrainingEndTime: D.ts,
      LastModifiedTime: D.ts,
      SecondaryStatusTransitions: D.list(o_SecondaryStatusTransition),
      FinalMetricDataList: D.list(o_MetricData),
      DebugRuleEvaluationStatuses: D.list(o_DebugRuleEvaluationStatus),
      ProfilerRuleEvaluationStatuses: D.list({ LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrainingJob",
})) as any;

export type DescribeTrainingPlanError = ResourceNotFound | CommonErrors;
/**
 * Retrieves detailed information about a specific training plan.
 */
export const describeTrainingPlan: API.OperationMethod<
  DescribeTrainingPlanRequest,
  DescribeTrainingPlanResponse,
  DescribeTrainingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrainingPlanName: 0 },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      ReservedCapacitySummaries: D.list(o_ReservedCapacitySummary),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrainingPlan",
})) as any;

export type DescribeTrainingPlanExtensionHistoryError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Retrieves the extension history for a specified training plan. The response includes details about each extension, such as the offering ID, start and end dates, status, payment status, and cost information.
 */
export const describeTrainingPlanExtensionHistory: API.PaginatedOperationMethod<
  DescribeTrainingPlanExtensionHistoryRequest,
  DescribeTrainingPlanExtensionHistoryResponse,
  DescribeTrainingPlanExtensionHistoryError,
  Credentials | HttpClient.HttpClient,
  TrainingPlanExtension
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TrainingPlanArn: 0, NextToken: 0, MaxResults: 0 },
    output: { TrainingPlanExtensions: D.list(o_TrainingPlanExtension) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrainingPlanExtensionHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrainingPlanExtensions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeTransformJobError = ResourceNotFound | CommonErrors;
/**
 * Returns information about a transform job.
 */
export const describeTransformJob: API.OperationMethod<
  DescribeTransformJobRequest,
  DescribeTransformJobResponse,
  DescribeTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TransformJobName: 0 },
    output: {
      CreationTime: D.ts,
      TransformStartTime: D.ts,
      TransformEndTime: D.ts,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTransformJob",
})) as any;

export type DescribeTrialError = ResourceNotFound | CommonErrors;
/**
 * Provides a list of a trial's properties.
 */
export const describeTrial: API.OperationMethod<
  DescribeTrialRequest,
  DescribeTrialResponse,
  DescribeTrialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrialName: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrial",
})) as any;

export type DescribeTrialComponentError = ResourceNotFound | CommonErrors;
/**
 * Provides a list of a trials component's properties.
 */
export const describeTrialComponent: API.OperationMethod<
  DescribeTrialComponentRequest,
  DescribeTrialComponentResponse,
  DescribeTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrialComponentName: 0 },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Metrics: D.list(o_TrialComponentMetricSummary),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrialComponent",
})) as any;

export type DescribeUserProfileError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Describes a user profile. For more information, see `CreateUserProfile`.
 */
export const describeUserProfile: API.OperationMethod<
  DescribeUserProfileRequest,
  DescribeUserProfileResponse,
  DescribeUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, UserProfileName: 0 },
    output: { LastModifiedTime: D.ts, CreationTime: D.ts },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserProfile",
})) as any;

export type DescribeWorkforceError = CommonErrors;
/**
 * Lists private workforce information, including workforce name, Amazon Resource Name (ARN), and, if applicable, allowed IP address ranges (CIDRs). Allowable IP address ranges are the IP addresses that workers can use to access tasks.
 *
 * This operation applies only to private workforces.
 */
export const describeWorkforce: API.OperationMethod<
  DescribeWorkforceRequest,
  DescribeWorkforceResponse,
  DescribeWorkforceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkforceName: 0 },
    output: { Workforce: o_Workforce },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkforce",
})) as any;

export type DescribeWorkteamError = CommonErrors;
/**
 * Gets information about a specific work team. You can see information such as the creation date, the last updated date, membership information, and the work team's Amazon Resource Name (ARN).
 */
export const describeWorkteam: API.OperationMethod<
  DescribeWorkteamRequest,
  DescribeWorkteamResponse,
  DescribeWorkteamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkteamName: 0 },
    output: { Workteam: o_Workteam },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkteam",
})) as any;

export type DetachClusterNodeVolumeError = ResourceNotFound | CommonErrors;
/**
 * Detaches your Amazon Elastic Block Store (Amazon EBS) volume from a node in your EKS orchestrated SageMaker HyperPod cluster.
 *
 * This API works with the Amazon Elastic Block Store (Amazon EBS) Container Storage Interface (CSI) driver to manage the lifecycle of persistent storage in your HyperPod EKS clusters.
 */
export const detachClusterNodeVolume: API.OperationMethod<
  DetachClusterNodeVolumeRequest,
  DetachClusterNodeVolumeResponse,
  DetachClusterNodeVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterArn: 0, NodeId: 0, VolumeId: 0 },
    output: { AttachTime: D.ts },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachClusterNodeVolume",
})) as any;

export type DisableSagemakerServicecatalogPortfolioError = CommonErrors;
/**
 * Disables using Service Catalog in SageMaker. Service Catalog is used to create SageMaker projects.
 */
export const disableSagemakerServicecatalogPortfolio: API.OperationMethod<
  DisableSagemakerServicecatalogPortfolioInput,
  DisableSagemakerServicecatalogPortfolioOutput,
  DisableSagemakerServicecatalogPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSagemakerServicecatalogPortfolio",
})) as any;

export type DisassociateTrialComponentError = ResourceNotFound | CommonErrors;
/**
 * Disassociates a trial component from a trial. This doesn't effect other trials the component is associated with. Before you can delete a component, you must disassociate the component from all trials it is associated with. To associate a trial component with a trial, call the AssociateTrialComponent API.
 *
 * To get a list of the trials a component is associated with, use the Search API. Specify `ExperimentTrialComponent` for the `Resource` parameter. The list appears in the response under `Results.TrialComponent.Parents`.
 */
export const disassociateTrialComponent: API.OperationMethod<
  DisassociateTrialComponentRequest,
  DisassociateTrialComponentResponse,
  DisassociateTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrialComponentName: 0, TrialName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTrialComponent",
})) as any;

export type EnableSagemakerServicecatalogPortfolioError = CommonErrors;
/**
 * Enables using Service Catalog in SageMaker. Service Catalog is used to create SageMaker projects.
 */
export const enableSagemakerServicecatalogPortfolio: API.OperationMethod<
  EnableSagemakerServicecatalogPortfolioInput,
  EnableSagemakerServicecatalogPortfolioOutput,
  EnableSagemakerServicecatalogPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSagemakerServicecatalogPortfolio",
})) as any;

export type ExtendTrainingPlanError = ResourceNotFound | CommonErrors;
/**
 * Extends an existing training plan by purchasing an extension offering. This allows you to add additional compute capacity time to your training plan without creating a new plan or reconfiguring your workloads.
 *
 * To find available extension offerings, use the ` SearchTrainingPlanOfferings ` API with the `TrainingPlanArn` parameter.
 *
 * To view the history of extensions for a training plan, use the ` DescribeTrainingPlanExtensionHistory ` API.
 */
export const extendTrainingPlan: API.OperationMethod<
  ExtendTrainingPlanRequest,
  ExtendTrainingPlanResponse,
  ExtendTrainingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TrainingPlanExtensionOfferingId: 0 },
    output: { TrainingPlanExtensions: D.list(o_TrainingPlanExtension) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExtendTrainingPlan",
})) as any;

export type GetDeviceFleetReportError = CommonErrors;
/**
 * Describes a fleet.
 */
export const getDeviceFleetReport: API.OperationMethod<
  GetDeviceFleetReportRequest,
  GetDeviceFleetReportResponse,
  GetDeviceFleetReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeviceFleetName: 0 },
    output: { ReportGenerated: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceFleetReport",
})) as any;

export type GetLineageGroupPolicyError = ResourceNotFound | CommonErrors;
/**
 * The resource policy for the lineage group.
 */
export const getLineageGroupPolicy: API.OperationMethod<
  GetLineageGroupPolicyRequest,
  GetLineageGroupPolicyResponse,
  GetLineageGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LineageGroupName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLineageGroupPolicy",
})) as any;

export type GetModelPackageGroupPolicyError = CommonErrors;
/**
 * Gets a resource policy that manages access for a model group. For information about resource policies, see Identity-based policies and resource-based policies in the *Amazon Web Services Identity and Access Management User Guide.*.
 */
export const getModelPackageGroupPolicy: API.OperationMethod<
  GetModelPackageGroupPolicyInput,
  GetModelPackageGroupPolicyOutput,
  GetModelPackageGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ModelPackageGroupName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelPackageGroupPolicy",
})) as any;

export type GetSagemakerServicecatalogPortfolioStatusError = CommonErrors;
/**
 * Gets the status of Service Catalog in SageMaker. Service Catalog is used to create SageMaker projects.
 */
export const getSagemakerServicecatalogPortfolioStatus: API.OperationMethod<
  GetSagemakerServicecatalogPortfolioStatusInput,
  GetSagemakerServicecatalogPortfolioStatusOutput,
  GetSagemakerServicecatalogPortfolioStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSagemakerServicecatalogPortfolioStatus",
})) as any;

export type GetScalingConfigurationRecommendationError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Starts an Amazon SageMaker Inference Recommender autoscaling recommendation job. Returns recommendations for autoscaling policies that you can apply to your SageMaker endpoint.
 */
export const getScalingConfigurationRecommendation: API.OperationMethod<
  GetScalingConfigurationRecommendationRequest,
  GetScalingConfigurationRecommendationResponse,
  GetScalingConfigurationRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InferenceRecommendationsJobName: 0,
      RecommendationId: 0,
      EndpointName: 0,
      TargetCpuUtilizationPerCore: 0,
      ScalingPolicyObjective: {
        MinInvocationsPerMinute: 0,
        MaxInvocationsPerMinute: 0,
      },
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScalingConfigurationRecommendation",
})) as any;

export type GetSearchSuggestionsError = CommonErrors;
/**
 * An auto-complete API for the search functionality in the SageMaker console. It returns suggestions of possible matches for the property name to use in `Search` queries. Provides suggestions for `HyperParameters`, `Tags`, and `Metrics`.
 */
export const getSearchSuggestions: API.OperationMethod<
  GetSearchSuggestionsRequest,
  GetSearchSuggestionsResponse,
  GetSearchSuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Resource: 0,
      SuggestionQuery: { PropertyNameQuery: { PropertyNameHint: 0 } },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchSuggestions",
})) as any;

export type ImportHubContentError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Import hub content.
 */
export const importHubContent: API.OperationMethod<
  ImportHubContentRequest,
  ImportHubContentResponse,
  ImportHubContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubContentName: 0,
      HubContentVersion: 0,
      HubContentType: 0,
      DocumentSchemaVersion: 0,
      HubName: 0,
      HubContentDisplayName: 0,
      HubContentDescription: 0,
      HubContentMarkdown: 0,
      HubContentDocument: 0,
      SupportStatus: 0,
      HubContentSearchKeywords: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportHubContent",
})) as any;

export type ListActionsError = ResourceNotFound | CommonErrors;
/**
 * Lists the actions in your account and their properties.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsRequest,
  ListActionsResponse,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceUri: 0,
      ActionType: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ActionSummaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAIBenchmarkJobsError = CommonErrors;
/**
 * Returns a list of AI benchmark jobs in your account. You can filter the results by name, status, and creation time, and sort the results. The response is paginated.
 */
export const listAIBenchmarkJobs: API.PaginatedOperationMethod<
  ListAIBenchmarkJobsRequest,
  ListAIBenchmarkJobsResponse,
  ListAIBenchmarkJobsError,
  Credentials | HttpClient.HttpClient,
  AIBenchmarkJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      StatusEquals: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { AIBenchmarkJobs: D.list({ CreationTime: D.ts, EndTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIBenchmarkJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AIBenchmarkJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAIRecommendationJobsError = CommonErrors;
/**
 * Returns a list of AI recommendation jobs in your account. You can filter the results by name, status, and creation time, and sort the results. The response is paginated.
 */
export const listAIRecommendationJobs: API.PaginatedOperationMethod<
  ListAIRecommendationJobsRequest,
  ListAIRecommendationJobsResponse,
  ListAIRecommendationJobsError,
  Credentials | HttpClient.HttpClient,
  AIRecommendationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      StatusEquals: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      AIRecommendationJobs: D.list({ CreationTime: D.ts, EndTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIRecommendationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AIRecommendationJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAIWorkloadConfigsError = CommonErrors;
/**
 * Returns a list of AI workload configurations in your account. You can filter the results by name and creation time, and sort the results. The response is paginated.
 */
export const listAIWorkloadConfigs: API.PaginatedOperationMethod<
  ListAIWorkloadConfigsRequest,
  ListAIWorkloadConfigsResponse,
  ListAIWorkloadConfigsError,
  Credentials | HttpClient.HttpClient,
  AIWorkloadConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { AIWorkloadConfigs: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIWorkloadConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AIWorkloadConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAlgorithmsError = CommonErrors;
/**
 * Lists the machine learning algorithms that have been created.
 */
export const listAlgorithms: API.PaginatedOperationMethod<
  ListAlgorithmsInput,
  ListAlgorithmsOutput,
  ListAlgorithmsError,
  Credentials | HttpClient.HttpClient,
  AlgorithmSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { AlgorithmSummaryList: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlgorithms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AlgorithmSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAliasesError = ResourceNotFound | CommonErrors;
/**
 * Lists the aliases of a specified image or image version.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  SageMakerImageVersionAlias
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ImageName: 0, Alias: 0, Version: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SageMakerImageVersionAliases",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppImageConfigsError = CommonErrors;
/**
 * Lists the AppImageConfigs in your account and their properties. The list can be filtered by creation time or modified time, and whether the AppImageConfig name contains a specified string.
 */
export const listAppImageConfigs: API.PaginatedOperationMethod<
  ListAppImageConfigsRequest,
  ListAppImageConfigsResponse,
  ListAppImageConfigsError,
  Credentials | HttpClient.HttpClient,
  AppImageConfigDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      ModifiedTimeBefore: 0,
      ModifiedTimeAfter: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      AppImageConfigs: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppImageConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AppImageConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppsError = CommonErrors;
/**
 * Lists apps.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsRequest,
  ListAppsResponse,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  AppDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortOrder: 0,
      SortBy: 0,
      DomainIdEquals: 0,
      UserProfileNameEquals: 0,
      SpaceNameEquals: 0,
    },
    output: { Apps: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Apps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListArtifactsError = ResourceNotFound | CommonErrors;
/**
 * Lists the artifacts in your account and their properties.
 */
export const listArtifacts: API.PaginatedOperationMethod<
  ListArtifactsRequest,
  ListArtifactsResponse,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient,
  ArtifactSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceUri: 0,
      ArtifactType: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ArtifactSummaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ArtifactSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssociationsError = ResourceNotFound | CommonErrors;
/**
 * Lists the associations in your account and their properties.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest,
  ListAssociationsResponse,
  ListAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceArn: 0,
      DestinationArn: 0,
      SourceType: 0,
      DestinationType: 0,
      AssociationType: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { AssociationSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAutoMLJobsError = CommonErrors;
/**
 * Request a list of jobs.
 */
export const listAutoMLJobs: API.PaginatedOperationMethod<
  ListAutoMLJobsRequest,
  ListAutoMLJobsResponse,
  ListAutoMLJobsError,
  Credentials | HttpClient.HttpClient,
  AutoMLJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortOrder: 0,
      SortBy: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      AutoMLJobSummaries: D.list({
        CreationTime: D.ts,
        EndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutoMLJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutoMLJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCandidatesForAutoMLJobError = ResourceNotFound | CommonErrors;
/**
 * List the candidates created for the job.
 */
export const listCandidatesForAutoMLJob: API.PaginatedOperationMethod<
  ListCandidatesForAutoMLJobRequest,
  ListCandidatesForAutoMLJobResponse,
  ListCandidatesForAutoMLJobError,
  Credentials | HttpClient.HttpClient,
  AutoMLCandidate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoMLJobName: 0,
      StatusEquals: 0,
      CandidateNameEquals: 0,
      SortOrder: 0,
      SortBy: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Candidates: D.list(o_AutoMLCandidate) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCandidatesForAutoMLJob",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Candidates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterEventsError = ResourceNotFound | CommonErrors;
/**
 * Retrieves a list of event summaries for a specified HyperPod cluster. The operation supports filtering, sorting, and pagination of results. This functionality is only supported when the `NodeProvisioningMode` is set to `Continuous`.
 */
export const listClusterEvents: API.PaginatedOperationMethod<
  ListClusterEventsRequest,
  ListClusterEventsResponse,
  ListClusterEventsError,
  Credentials | HttpClient.HttpClient,
  ClusterEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      InstanceGroupName: 0,
      NodeId: 0,
      EventTimeAfter: 0,
      EventTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      ResourceType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Events: D.list({ EventTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterNodesError = ResourceNotFound | CommonErrors;
/**
 * Retrieves the list of instances (also called *nodes* interchangeably) in a SageMaker HyperPod cluster.
 */
export const listClusterNodes: API.PaginatedOperationMethod<
  ListClusterNodesRequest,
  ListClusterNodesResponse,
  ListClusterNodesError,
  Credentials | HttpClient.HttpClient,
  ClusterNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      InstanceGroupNameContains: 0,
      MaxResults: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
      IncludeNodeLogicalIds: 0,
    },
    output: {
      ClusterNodeSummaries: D.list({
        LaunchTime: D.ts,
        LastSoftwareUpdateTime: D.ts,
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterNodeSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError = CommonErrors;
/**
 * Retrieves the list of SageMaker HyperPod clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
      TrainingPlanArn: 0,
    },
    output: { ClusterSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterSchedulerConfigsError = CommonErrors;
/**
 * List the cluster policy configurations.
 */
export const listClusterSchedulerConfigs: API.PaginatedOperationMethod<
  ListClusterSchedulerConfigsRequest,
  ListClusterSchedulerConfigsResponse,
  ListClusterSchedulerConfigsError,
  Credentials | HttpClient.HttpClient,
  ClusterSchedulerConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      NameContains: 0,
      ClusterArn: 0,
      Status: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ClusterSchedulerConfigSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterSchedulerConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterSchedulerConfigSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCodeRepositoriesError = CommonErrors;
/**
 * Gets a list of the Git repositories in your account.
 */
export const listCodeRepositories: API.PaginatedOperationMethod<
  ListCodeRepositoriesInput,
  ListCodeRepositoriesOutput,
  ListCodeRepositoriesError,
  Credentials | HttpClient.HttpClient,
  CodeRepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      CodeRepositorySummaryList: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeRepositories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CodeRepositorySummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCompilationJobsError = CommonErrors;
/**
 * Lists model compilation jobs that satisfy various filters.
 *
 * To create a model compilation job, use CreateCompilationJob. To get information about a particular model compilation job you have created, use DescribeCompilationJob.
 */
export const listCompilationJobs: API.PaginatedOperationMethod<
  ListCompilationJobsRequest,
  ListCompilationJobsResponse,
  ListCompilationJobsError,
  Credentials | HttpClient.HttpClient,
  CompilationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      CompilationJobSummaries: D.list({
        CreationTime: D.ts,
        CompilationStartTime: D.ts,
        CompilationEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompilationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CompilationJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComputeQuotasError = CommonErrors;
/**
 * List the resource allocation definitions.
 */
export const listComputeQuotas: API.PaginatedOperationMethod<
  ListComputeQuotasRequest,
  ListComputeQuotasResponse,
  ListComputeQuotasError,
  Credentials | HttpClient.HttpClient,
  ComputeQuotaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      NameContains: 0,
      Status: 0,
      ClusterArn: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComputeQuotaSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputeQuotas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComputeQuotaSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContextsError = ResourceNotFound | CommonErrors;
/**
 * Lists the contexts in your account and their properties.
 */
export const listContexts: API.PaginatedOperationMethod<
  ListContextsRequest,
  ListContextsResponse,
  ListContextsError,
  Credentials | HttpClient.HttpClient,
  ContextSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceUri: 0,
      ContextType: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ContextSummaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContexts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContextSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityJobDefinitionsError = CommonErrors;
/**
 * Lists the data quality job definitions in your account.
 */
export const listDataQualityJobDefinitions: API.PaginatedOperationMethod<
  ListDataQualityJobDefinitionsRequest,
  ListDataQualityJobDefinitionsResponse,
  ListDataQualityJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  MonitoringJobDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: {
      JobDefinitionSummaries: D.list(o_MonitoringJobDefinitionSummary),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityJobDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobDefinitionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeviceFleetsError = CommonErrors;
/**
 * Returns a list of devices in the fleet.
 */
export const listDeviceFleets: API.PaginatedOperationMethod<
  ListDeviceFleetsRequest,
  ListDeviceFleetsResponse,
  ListDeviceFleetsError,
  Credentials | HttpClient.HttpClient,
  DeviceFleetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      DeviceFleetSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceFleets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DeviceFleetSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDevicesError = CommonErrors;
/**
 * A list of devices.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      LatestHeartbeatAfter: 0,
      ModelName: 0,
      DeviceFleetName: 0,
    },
    output: {
      DeviceSummaries: D.list({
        RegistrationTime: D.ts,
        LatestHeartbeat: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DeviceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainsError = CommonErrors;
/**
 * Lists the domains.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Domains: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Domains",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEdgeDeploymentPlansError = CommonErrors;
/**
 * Lists all edge deployment plans.
 */
export const listEdgeDeploymentPlans: API.PaginatedOperationMethod<
  ListEdgeDeploymentPlansRequest,
  ListEdgeDeploymentPlansResponse,
  ListEdgeDeploymentPlansError,
  Credentials | HttpClient.HttpClient,
  EdgeDeploymentPlanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      DeviceFleetNameContains: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      EdgeDeploymentPlanSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEdgeDeploymentPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EdgeDeploymentPlanSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEdgePackagingJobsError = CommonErrors;
/**
 * Returns a list of edge packaging jobs.
 */
export const listEdgePackagingJobs: API.PaginatedOperationMethod<
  ListEdgePackagingJobsRequest,
  ListEdgePackagingJobsResponse,
  ListEdgePackagingJobsError,
  Credentials | HttpClient.HttpClient,
  EdgePackagingJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      ModelNameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      EdgePackagingJobSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEdgePackagingJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EdgePackagingJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEndpointConfigsError = CommonErrors;
/**
 * Lists endpoint configurations.
 */
export const listEndpointConfigs: API.PaginatedOperationMethod<
  ListEndpointConfigsInput,
  ListEndpointConfigsOutput,
  ListEndpointConfigsError,
  Credentials | HttpClient.HttpClient,
  EndpointConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: { EndpointConfigs: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEndpointsError = CommonErrors;
/**
 * Lists endpoints.
 */
export const listEndpoints: API.PaginatedOperationMethod<
  ListEndpointsInput,
  ListEndpointsOutput,
  ListEndpointsError,
  Credentials | HttpClient.HttpClient,
  EndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      StatusEquals: 0,
    },
    output: {
      Endpoints: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentsError = CommonErrors;
/**
 * Lists all the experiments in your account. The list can be filtered to show only experiments that were created in a specific time range. The list can be sorted by experiment name or creation time.
 */
export const listExperiments: API.PaginatedOperationMethod<
  ListExperimentsRequest,
  ListExperimentsResponse,
  ListExperimentsError,
  Credentials | HttpClient.HttpClient,
  ExperimentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ExperimentSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperiments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExperimentSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFeatureGroupsError = CommonErrors;
/**
 * List `FeatureGroup`s based on given filter and order.
 */
export const listFeatureGroups: API.PaginatedOperationMethod<
  ListFeatureGroupsRequest,
  ListFeatureGroupsResponse,
  ListFeatureGroupsError,
  Credentials | HttpClient.HttpClient,
  FeatureGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NameContains: 0,
      FeatureGroupStatusEquals: 0,
      OfflineStoreStatusEquals: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortOrder: 0,
      SortBy: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { FeatureGroupSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFeatureGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FeatureGroupSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowDefinitionsError = CommonErrors;
/**
 * Returns information about the flow definitions in your account.
 */
export const listFlowDefinitions: API.PaginatedOperationMethod<
  ListFlowDefinitionsRequest,
  ListFlowDefinitionsResponse,
  ListFlowDefinitionsError,
  Credentials | HttpClient.HttpClient,
  FlowDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { FlowDefinitionSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowDefinitionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHubContentsError = ResourceNotFound | CommonErrors;
/**
 * List the contents of a hub.
 */
export const listHubContents: API.OperationMethod<
  ListHubContentsRequest,
  ListHubContentsResponse,
  ListHubContentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentType: 0,
      NameContains: 0,
      MaxSchemaVersion: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      SortBy: 0,
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { HubContentSummaries: D.list(o_HubContentInfo) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHubContents",
})) as any;

export type ListHubContentVersionsError = ResourceNotFound | CommonErrors;
/**
 * List hub content versions.
 */
export const listHubContentVersions: API.OperationMethod<
  ListHubContentVersionsRequest,
  ListHubContentVersionsResponse,
  ListHubContentVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentType: 0,
      HubContentName: 0,
      MinVersion: 0,
      MaxSchemaVersion: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      SortBy: 0,
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { HubContentSummaries: D.list(o_HubContentInfo) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHubContentVersions",
})) as any;

export type ListHubsError = CommonErrors;
/**
 * List all existing hubs.
 */
export const listHubs: API.OperationMethod<
  ListHubsRequest,
  ListHubsResponse,
  ListHubsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      SortBy: 0,
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      HubSummaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHubs",
})) as any;

export type ListHumanTaskUisError = CommonErrors;
/**
 * Returns information about the human task user interfaces in your account.
 */
export const listHumanTaskUis: API.PaginatedOperationMethod<
  ListHumanTaskUisRequest,
  ListHumanTaskUisResponse,
  ListHumanTaskUisError,
  Credentials | HttpClient.HttpClient,
  HumanTaskUiSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { HumanTaskUiSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHumanTaskUis",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HumanTaskUiSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHyperParameterTuningJobsError = CommonErrors;
/**
 * Gets a list of HyperParameterTuningJobSummary objects that describe the hyperparameter tuning jobs launched in your account.
 */
export const listHyperParameterTuningJobs: API.PaginatedOperationMethod<
  ListHyperParameterTuningJobsRequest,
  ListHyperParameterTuningJobsResponse,
  ListHyperParameterTuningJobsError,
  Credentials | HttpClient.HttpClient,
  HyperParameterTuningJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortBy: 0,
      SortOrder: 0,
      NameContains: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      StatusEquals: 0,
    },
    output: {
      HyperParameterTuningJobSummaries: D.list({
        CreationTime: D.ts,
        HyperParameterTuningEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHyperParameterTuningJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HyperParameterTuningJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImagesError = CommonErrors;
/**
 * Lists the images in your account and their properties. The list can be filtered by creation time or modified time, and whether the image name contains a specified string.
 */
export const listImages: API.PaginatedOperationMethod<
  ListImagesRequest,
  ListImagesResponse,
  ListImagesError,
  Credentials | HttpClient.HttpClient,
  Image
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { Images: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Images",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImageVersionsError = ResourceNotFound | CommonErrors;
/**
 * Lists the versions of a specified image and their properties. The list can be filtered by creation time or modified time.
 */
export const listImageVersions: API.PaginatedOperationMethod<
  ListImageVersionsRequest,
  ListImageVersionsResponse,
  ListImageVersionsError,
  Credentials | HttpClient.HttpClient,
  ImageVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      ImageName: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      MaxResults: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      ImageVersions: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ImageVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceComponentsError = CommonErrors;
/**
 * Lists the inference components in your account and their properties.
 */
export const listInferenceComponents: API.PaginatedOperationMethod<
  ListInferenceComponentsInput,
  ListInferenceComponentsOutput,
  ListInferenceComponentsError,
  Credentials | HttpClient.HttpClient,
  InferenceComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      StatusEquals: 0,
      EndpointNameEquals: 0,
      VariantNameEquals: 0,
    },
    output: {
      InferenceComponents: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InferenceComponents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceExperimentsError = CommonErrors;
/**
 * Returns the list of all inference experiments.
 */
export const listInferenceExperiments: API.PaginatedOperationMethod<
  ListInferenceExperimentsRequest,
  ListInferenceExperimentsResponse,
  ListInferenceExperimentsError,
  Credentials | HttpClient.HttpClient,
  InferenceExperimentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NameContains: 0,
      Type: 0,
      StatusEquals: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      InferenceExperiments: D.list({
        Schedule: o_InferenceExperimentSchedule,
        CreationTime: D.ts,
        CompletionTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceExperiments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InferenceExperiments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceRecommendationsJobsError = CommonErrors;
/**
 * Lists recommendation jobs that satisfy various filters.
 */
export const listInferenceRecommendationsJobs: API.PaginatedOperationMethod<
  ListInferenceRecommendationsJobsRequest,
  ListInferenceRecommendationsJobsResponse,
  ListInferenceRecommendationsJobsError,
  Credentials | HttpClient.HttpClient,
  InferenceRecommendationsJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      ModelNameEquals: 0,
      ModelPackageVersionArnEquals: 0,
    },
    output: {
      InferenceRecommendationsJobs: D.list({
        CreationTime: D.ts,
        CompletionTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceRecommendationsJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InferenceRecommendationsJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceRecommendationsJobStepsError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Returns a list of the subtasks for an Inference Recommender job.
 *
 * The supported subtasks are benchmarks, which evaluate the performance of your model on different instance types.
 */
export const listInferenceRecommendationsJobSteps: API.PaginatedOperationMethod<
  ListInferenceRecommendationsJobStepsRequest,
  ListInferenceRecommendationsJobStepsResponse,
  ListInferenceRecommendationsJobStepsError,
  Credentials | HttpClient.HttpClient,
  InferenceRecommendationsJobStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobName: 0, Status: 0, StepType: 0, MaxResults: 0, NextToken: 0 },
    output: {
      Steps: D.list({
        InferenceBenchmark: {
          InvocationEndTime: D.ts,
          InvocationStartTime: D.ts,
        },
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceRecommendationsJobSteps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Steps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError = CommonErrors;
/**
 * Lists jobs in a specified category. You can filter results by creation time, last modified time, name, and status. Results are sorted by the field you specify in `SortBy`. Use pagination to retrieve large result sets efficiently.
 *
 * The following operations are related to `ListJobs`:
 *
 * - `CreateJob`
 *
 * - `DescribeJob`
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      JobCategory: 0,
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      SortBy: 0,
      SortOrder: 0,
      StatusEquals: 0,
    },
    output: {
      JobSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        EndTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobSchemaVersionsError = ResourceNotFound | CommonErrors;
/**
 * Lists available configuration schema versions for a specified job category. Use the schema versions with `DescribeJobSchemaVersion` to retrieve the full schema document.
 *
 * The following operations are related to `ListJobSchemaVersions`:
 *
 * - `DescribeJobSchemaVersion`
 *
 * - `CreateJob`
 */
export const listJobSchemaVersions: API.PaginatedOperationMethod<
  ListJobSchemaVersionsRequest,
  ListJobSchemaVersionsResponse,
  ListJobSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  JobConfigSchemaVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobCategory: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobConfigSchemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelingJobsError = CommonErrors;
/**
 * Gets a list of labeling jobs.
 */
export const listLabelingJobs: API.PaginatedOperationMethod<
  ListLabelingJobsRequest,
  ListLabelingJobsResponse,
  ListLabelingJobsError,
  Credentials | HttpClient.HttpClient,
  LabelingJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      SortBy: 0,
      SortOrder: 0,
      StatusEquals: 0,
    },
    output: {
      LabelingJobSummaryList: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabelingJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LabelingJobSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelingJobsForWorkteamError = ResourceNotFound | CommonErrors;
/**
 * Gets a list of labeling jobs assigned to a specified work team.
 */
export const listLabelingJobsForWorkteam: API.PaginatedOperationMethod<
  ListLabelingJobsForWorkteamRequest,
  ListLabelingJobsForWorkteamResponse,
  ListLabelingJobsForWorkteamError,
  Credentials | HttpClient.HttpClient,
  LabelingJobForWorkteamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkteamArn: 0,
      MaxResults: 0,
      NextToken: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      JobReferenceCodeContains: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { LabelingJobSummaryList: D.list({ CreationTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabelingJobsForWorkteam",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LabelingJobSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLineageGroupsError = CommonErrors;
/**
 * A list of lineage groups shared with your Amazon Web Services account. For more information, see Cross-Account Lineage Tracking in the *Amazon SageMaker Developer Guide*.
 */
export const listLineageGroups: API.PaginatedOperationMethod<
  ListLineageGroupsRequest,
  ListLineageGroupsResponse,
  ListLineageGroupsError,
  Credentials | HttpClient.HttpClient,
  LineageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      LineageGroupSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLineageGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LineageGroupSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMlflowAppsError = CommonErrors;
/**
 * Lists all MLflow Apps
 */
export const listMlflowApps: API.PaginatedOperationMethod<
  ListMlflowAppsRequest,
  ListMlflowAppsResponse,
  ListMlflowAppsError,
  Credentials | HttpClient.HttpClient,
  MlflowAppSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      Status: 0,
      MlflowVersion: 0,
      DefaultForDomainId: 0,
      AccountDefaultStatus: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Summaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMlflowApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMlflowTrackingServersError = CommonErrors;
/**
 * Lists all MLflow Tracking Servers.
 */
export const listMlflowTrackingServers: API.PaginatedOperationMethod<
  ListMlflowTrackingServersRequest,
  ListMlflowTrackingServersResponse,
  ListMlflowTrackingServersError,
  Credentials | HttpClient.HttpClient,
  TrackingServerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      TrackingServerStatus: 0,
      MlflowVersion: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      TrackingServerSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMlflowTrackingServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrackingServerSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelBiasJobDefinitionsError = CommonErrors;
/**
 * Lists model bias jobs definitions that satisfy various filters.
 */
export const listModelBiasJobDefinitions: API.PaginatedOperationMethod<
  ListModelBiasJobDefinitionsRequest,
  ListModelBiasJobDefinitionsResponse,
  ListModelBiasJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  MonitoringJobDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: {
      JobDefinitionSummaries: D.list(o_MonitoringJobDefinitionSummary),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelBiasJobDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobDefinitionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelCardExportJobsError = CommonErrors;
/**
 * List the export jobs for the Amazon SageMaker Model Card.
 */
export const listModelCardExportJobs: API.PaginatedOperationMethod<
  ListModelCardExportJobsRequest,
  ListModelCardExportJobsResponse,
  ListModelCardExportJobsError,
  Credentials | HttpClient.HttpClient,
  ModelCardExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelCardName: 0,
      ModelCardVersion: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      ModelCardExportJobNameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ModelCardExportJobSummaries: D.list({
        CreatedAt: D.ts,
        LastModifiedAt: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCardExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelCardExportJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelCardsError = CommonErrors;
/**
 * List existing model cards.
 */
export const listModelCards: API.PaginatedOperationMethod<
  ListModelCardsRequest,
  ListModelCardsResponse,
  ListModelCardsError,
  Credentials | HttpClient.HttpClient,
  ModelCardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      ModelCardStatus: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      ModelCardSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelCardSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelCardVersionsError = ResourceNotFound | CommonErrors;
/**
 * List existing versions of an Amazon SageMaker Model Card.
 */
export const listModelCardVersions: API.PaginatedOperationMethod<
  ListModelCardVersionsRequest,
  ListModelCardVersionsResponse,
  ListModelCardVersionsError,
  Credentials | HttpClient.HttpClient,
  ModelCardVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      ModelCardName: 0,
      ModelCardStatus: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      ModelCardVersionSummaryList: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCardVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelCardVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelExplainabilityJobDefinitionsError = CommonErrors;
/**
 * Lists model explainability job definitions that satisfy various filters.
 */
export const listModelExplainabilityJobDefinitions: API.PaginatedOperationMethod<
  ListModelExplainabilityJobDefinitionsRequest,
  ListModelExplainabilityJobDefinitionsResponse,
  ListModelExplainabilityJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  MonitoringJobDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: {
      JobDefinitionSummaries: D.list(o_MonitoringJobDefinitionSummary),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelExplainabilityJobDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobDefinitionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelMetadataError = CommonErrors;
/**
 * Lists the domain, framework, task, and model name of standard machine learning models found in common model zoos.
 */
export const listModelMetadata: API.PaginatedOperationMethod<
  ListModelMetadataRequest,
  ListModelMetadataResponse,
  ListModelMetadataError,
  Credentials | HttpClient.HttpClient,
  ModelMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SearchExpression: { Filters: D.list({ Name: 0, Value: 0 }) },
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelMetadataSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelPackageGroupsError = CommonErrors;
/**
 * Gets a list of the model groups in your Amazon Web Services account.
 */
export const listModelPackageGroups: API.PaginatedOperationMethod<
  ListModelPackageGroupsInput,
  ListModelPackageGroupsOutput,
  ListModelPackageGroupsError,
  Credentials | HttpClient.HttpClient,
  ModelPackageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
      CrossAccountFilterOption: 0,
    },
    output: { ModelPackageGroupSummaryList: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelPackageGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelPackageGroupSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelPackagesError = CommonErrors;
/**
 * Lists the model packages that have been created.
 */
export const listModelPackages: API.PaginatedOperationMethod<
  ListModelPackagesInput,
  ListModelPackagesOutput,
  ListModelPackagesError,
  Credentials | HttpClient.HttpClient,
  ModelPackageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      ModelApprovalStatus: 0,
      ModelPackageGroupName: 0,
      ModelPackageType: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { ModelPackageSummaryList: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelPackages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ModelPackageSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelQualityJobDefinitionsError = CommonErrors;
/**
 * Gets a list of model quality monitoring job definitions in your account.
 */
export const listModelQualityJobDefinitions: API.PaginatedOperationMethod<
  ListModelQualityJobDefinitionsRequest,
  ListModelQualityJobDefinitionsResponse,
  ListModelQualityJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  MonitoringJobDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: {
      JobDefinitionSummaries: D.list(o_MonitoringJobDefinitionSummary),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelQualityJobDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobDefinitionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelsError = CommonErrors;
/**
 * Lists models created with the `CreateModel` API.
 */
export const listModels: API.PaginatedOperationMethod<
  ListModelsInput,
  ListModelsOutput,
  ListModelsError,
  Credentials | HttpClient.HttpClient,
  ModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
    },
    output: { Models: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Models",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitoringAlertHistoryError = ResourceNotFound | CommonErrors;
/**
 * Gets a list of past alerts in a model monitoring schedule.
 */
export const listMonitoringAlertHistory: API.PaginatedOperationMethod<
  ListMonitoringAlertHistoryRequest,
  ListMonitoringAlertHistoryResponse,
  ListMonitoringAlertHistoryError,
  Credentials | HttpClient.HttpClient,
  MonitoringAlertHistorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitoringScheduleName: 0,
      MonitoringAlertName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      StatusEquals: 0,
    },
    output: { MonitoringAlertHistory: D.list({ CreationTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitoringAlertHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MonitoringAlertHistory",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitoringAlertsError = ResourceNotFound | CommonErrors;
/**
 * Gets the alerts for a single monitoring schedule.
 */
export const listMonitoringAlerts: API.PaginatedOperationMethod<
  ListMonitoringAlertsRequest,
  ListMonitoringAlertsResponse,
  ListMonitoringAlertsError,
  Credentials | HttpClient.HttpClient,
  MonitoringAlertSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MonitoringScheduleName: 0, NextToken: 0, MaxResults: 0 },
    output: { MonitoringAlertSummaries: D.list(o_MonitoringAlertSummary) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitoringAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MonitoringAlertSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitoringExecutionsError = CommonErrors;
/**
 * Returns list of all monitoring job executions.
 */
export const listMonitoringExecutions: API.PaginatedOperationMethod<
  ListMonitoringExecutionsRequest,
  ListMonitoringExecutionsResponse,
  ListMonitoringExecutionsError,
  Credentials | HttpClient.HttpClient,
  MonitoringExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitoringScheduleName: 0,
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      ScheduledTimeBefore: 0,
      ScheduledTimeAfter: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      StatusEquals: 0,
      MonitoringJobDefinitionName: 0,
      MonitoringTypeEquals: 0,
    },
    output: {
      MonitoringExecutionSummaries: D.list(o_MonitoringExecutionSummary),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitoringExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MonitoringExecutionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitoringSchedulesError = CommonErrors;
/**
 * Returns list of all monitoring schedules.
 */
export const listMonitoringSchedules: API.PaginatedOperationMethod<
  ListMonitoringSchedulesRequest,
  ListMonitoringSchedulesResponse,
  ListMonitoringSchedulesError,
  Credentials | HttpClient.HttpClient,
  MonitoringScheduleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      StatusEquals: 0,
      MonitoringJobDefinitionName: 0,
      MonitoringTypeEquals: 0,
    },
    output: {
      MonitoringScheduleSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitoringSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MonitoringScheduleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotebookInstanceLifecycleConfigsError = CommonErrors;
/**
 * Lists notebook instance lifestyle configurations created with the CreateNotebookInstanceLifecycleConfig API.
 */
export const listNotebookInstanceLifecycleConfigs: API.PaginatedOperationMethod<
  ListNotebookInstanceLifecycleConfigsInput,
  ListNotebookInstanceLifecycleConfigsOutput,
  ListNotebookInstanceLifecycleConfigsError,
  Credentials | HttpClient.HttpClient,
  NotebookInstanceLifecycleConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortBy: 0,
      SortOrder: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
    },
    output: {
      NotebookInstanceLifecycleConfigs: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookInstanceLifecycleConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotebookInstanceLifecycleConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotebookInstancesError = CommonErrors;
/**
 * Returns a list of the SageMaker AI notebook instances in the requester's account in an Amazon Web Services Region.
 */
export const listNotebookInstances: API.PaginatedOperationMethod<
  ListNotebookInstancesInput,
  ListNotebookInstancesOutput,
  ListNotebookInstancesError,
  Credentials | HttpClient.HttpClient,
  NotebookInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortBy: 0,
      SortOrder: 0,
      NameContains: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      StatusEquals: 0,
      NotebookInstanceLifecycleConfigNameContains: 0,
      DefaultCodeRepositoryContains: 0,
      AdditionalCodeRepositoryEquals: 0,
    },
    output: {
      NotebookInstances: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotebookInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOptimizationJobsError = CommonErrors;
/**
 * Lists the optimization jobs in your account and their properties.
 */
export const listOptimizationJobs: API.PaginatedOperationMethod<
  ListOptimizationJobsRequest,
  ListOptimizationJobsResponse,
  ListOptimizationJobsError,
  Credentials | HttpClient.HttpClient,
  OptimizationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      OptimizationContains: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      OptimizationJobSummaries: D.list({
        CreationTime: D.ts,
        OptimizationStartTime: D.ts,
        OptimizationEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOptimizationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OptimizationJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPartnerAppsError = CommonErrors;
/**
 * Lists all of the SageMaker Partner AI Apps in an account.
 */
export const listPartnerApps: API.PaginatedOperationMethod<
  ListPartnerAppsRequest,
  ListPartnerAppsResponse,
  ListPartnerAppsError,
  Credentials | HttpClient.HttpClient,
  PartnerAppSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Summaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineExecutionsError = ResourceNotFound | CommonErrors;
/**
 * Gets a list of the pipeline executions.
 */
export const listPipelineExecutions: API.PaginatedOperationMethod<
  ListPipelineExecutionsRequest,
  ListPipelineExecutionsResponse,
  ListPipelineExecutionsError,
  Credentials | HttpClient.HttpClient,
  PipelineExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineName: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { PipelineExecutionSummaries: D.list({ StartTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineExecutionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineExecutionStepsError = ResourceNotFound | CommonErrors;
/**
 * Gets a list of `PipeLineExecutionStep` objects.
 */
export const listPipelineExecutionSteps: API.PaginatedOperationMethod<
  ListPipelineExecutionStepsRequest,
  ListPipelineExecutionStepsResponse,
  ListPipelineExecutionStepsError,
  Credentials | HttpClient.HttpClient,
  PipelineExecutionStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineExecutionArn: 0,
      NextToken: 0,
      MaxResults: 0,
      SortOrder: 0,
    },
    output: {
      PipelineExecutionSteps: D.list({ StartTime: D.ts, EndTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineExecutionSteps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineExecutionSteps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineParametersForExecutionError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Gets a list of parameters for a pipeline execution.
 */
export const listPipelineParametersForExecution: API.PaginatedOperationMethod<
  ListPipelineParametersForExecutionRequest,
  ListPipelineParametersForExecutionResponse,
  ListPipelineParametersForExecutionError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PipelineExecutionArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineParametersForExecution",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineParameters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelinesError = CommonErrors;
/**
 * Gets a list of pipelines.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  PipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineNamePrefix: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      PipelineSummaries: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        LastExecutionTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineVersionsError = ResourceNotFound | CommonErrors;
/**
 * Gets a list of all versions of the pipeline.
 */
export const listPipelineVersions: API.PaginatedOperationMethod<
  ListPipelineVersionsRequest,
  ListPipelineVersionsResponse,
  ListPipelineVersionsError,
  Credentials | HttpClient.HttpClient,
  PipelineVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineName: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { PipelineVersionSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineVersionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProcessingJobsError = CommonErrors;
/**
 * Lists processing jobs that satisfy various filters.
 */
export const listProcessingJobs: API.PaginatedOperationMethod<
  ListProcessingJobsRequest,
  ListProcessingJobsResponse,
  ListProcessingJobsError,
  Credentials | HttpClient.HttpClient,
  ProcessingJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ProcessingJobSummaries: D.list({
        CreationTime: D.ts,
        ProcessingEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProcessingJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProcessingJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProjectsError = CommonErrors;
/**
 * Gets a list of the projects in an Amazon Web Services account.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      MaxResults: 0,
      NameContains: 0,
      NextToken: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: { ProjectSummaryList: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceCatalogsError = CommonErrors;
/**
 * Lists Amazon SageMaker Catalogs based on given filters and orders. The maximum number of `ResourceCatalog`s viewable is 1000.
 */
export const listResourceCatalogs: API.PaginatedOperationMethod<
  ListResourceCatalogsRequest,
  ListResourceCatalogsResponse,
  ListResourceCatalogsError,
  Credentials | HttpClient.HttpClient,
  ResourceCatalog
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NameContains: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      SortOrder: 0,
      SortBy: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ResourceCatalogs: D.list({ CreationTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceCatalogs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceCatalogs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSpacesError = CommonErrors;
/**
 * Lists spaces.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortOrder: 0,
      SortBy: 0,
      DomainIdEquals: 0,
      SpaceNameContains: 0,
    },
    output: { Spaces: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Spaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStageDevicesError = CommonErrors;
/**
 * Lists devices allocated to the stage, containing detailed device information and deployment status.
 */
export const listStageDevices: API.PaginatedOperationMethod<
  ListStageDevicesRequest,
  ListStageDevicesResponse,
  ListStageDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceDeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      EdgeDeploymentPlanName: 0,
      ExcludeDevicesDeployedInOtherStage: 0,
      StageName: 0,
    },
    output: {
      DeviceDeploymentSummaries: D.list({ DeploymentStartTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStageDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DeviceDeploymentSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStudioLifecycleConfigsError = ResourceInUse | CommonErrors;
/**
 * Lists the Amazon SageMaker AI Studio Lifecycle Configurations in your Amazon Web Services Account.
 */
export const listStudioLifecycleConfigs: API.PaginatedOperationMethod<
  ListStudioLifecycleConfigsRequest,
  ListStudioLifecycleConfigsResponse,
  ListStudioLifecycleConfigsError,
  Credentials | HttpClient.HttpClient,
  StudioLifecycleConfigDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      NameContains: 0,
      AppTypeEquals: 0,
      CreationTimeBefore: 0,
      CreationTimeAfter: 0,
      ModifiedTimeBefore: 0,
      ModifiedTimeAfter: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      StudioLifecycleConfigs: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudioLifecycleConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StudioLifecycleConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSubscribedWorkteamsError = CommonErrors;
/**
 * Gets a list of the work teams that you are subscribed to in the Amazon Web Services Marketplace. The list may be empty if no work team satisfies the filter specified in the `NameContains` parameter.
 */
export const listSubscribedWorkteams: API.PaginatedOperationMethod<
  ListSubscribedWorkteamsRequest,
  ListSubscribedWorkteamsResponse,
  ListSubscribedWorkteamsError,
  Credentials | HttpClient.HttpClient,
  SubscribedWorkteam
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NameContains: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribedWorkteams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubscribedWorkteams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError = CommonErrors;
/**
 * Returns the tags for the specified SageMaker resource.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsInput,
  ListTagsOutput,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrainingJobsError = CommonErrors;
/**
 * Lists training jobs.
 *
 * When `StatusEquals` and `MaxResults` are set at the same time, the `MaxResults` number of training jobs are first retrieved ignoring the `StatusEquals` parameter and then they are filtered by the `StatusEquals` parameter, which is returned as a response.
 *
 * For example, if `ListTrainingJobs` is invoked with the following parameters:
 *
 * `{ ... MaxResults: 100, StatusEquals: InProgress ... }`
 *
 * First, 100 trainings jobs with any status, including those other than `InProgress`, are selected (sorted according to the creation time, from the most current to the oldest). Next, those with a status of `InProgress` are returned.
 *
 * You can quickly test the API using the following Amazon Web Services CLI code.
 *
 * `aws sagemaker list-training-jobs --max-results 100 --status-equals InProgress`
 */
export const listTrainingJobs: API.PaginatedOperationMethod<
  ListTrainingJobsRequest,
  ListTrainingJobsResponse,
  ListTrainingJobsError,
  Credentials | HttpClient.HttpClient,
  TrainingJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
      WarmPoolStatusEquals: 0,
      TrainingPlanArnEquals: 0,
    },
    output: {
      TrainingJobSummaries: D.list({
        CreationTime: D.ts,
        TrainingEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainingJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrainingJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrainingJobsForHyperParameterTuningJobError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Gets a list of TrainingJobSummary objects that describe the training jobs that a hyperparameter tuning job launched.
 */
export const listTrainingJobsForHyperParameterTuningJob: API.PaginatedOperationMethod<
  ListTrainingJobsForHyperParameterTuningJobRequest,
  ListTrainingJobsForHyperParameterTuningJobResponse,
  ListTrainingJobsForHyperParameterTuningJobError,
  Credentials | HttpClient.HttpClient,
  HyperParameterTrainingJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      HyperParameterTuningJobName: 0,
      NextToken: 0,
      MaxResults: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
    },
    output: {
      TrainingJobSummaries: D.list(o_HyperParameterTrainingJobSummary),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainingJobsForHyperParameterTuningJob",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrainingJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrainingPlansError = CommonErrors;
/**
 * Retrieves a list of training plans for the current account.
 */
export const listTrainingPlans: API.PaginatedOperationMethod<
  ListTrainingPlansRequest,
  ListTrainingPlansResponse,
  ListTrainingPlansError,
  Credentials | HttpClient.HttpClient,
  TrainingPlanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      StartTimeAfter: 0,
      StartTimeBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      Filters: D.list({ Name: 0, Value: 0 }),
    },
    output: {
      TrainingPlanSummaries: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        ReservedCapacitySummaries: D.list(o_ReservedCapacitySummary),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainingPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrainingPlanSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTransformJobsError = CommonErrors;
/**
 * Lists transform jobs.
 */
export const listTransformJobs: API.PaginatedOperationMethod<
  ListTransformJobsRequest,
  ListTransformJobsResponse,
  ListTransformJobsError,
  Credentials | HttpClient.HttpClient,
  TransformJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CreationTimeAfter: 0,
      CreationTimeBefore: 0,
      LastModifiedTimeAfter: 0,
      LastModifiedTimeBefore: 0,
      NameContains: 0,
      StatusEquals: 0,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      TransformJobSummaries: D.list({
        CreationTime: D.ts,
        TransformEndTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransformJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TransformJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrialComponentsError = ResourceNotFound | CommonErrors;
/**
 * Lists the trial components in your account. You can sort the list by trial component name or creation time. You can filter the list to show only components that were created in a specific time range. You can also filter on one of the following:
 *
 * - `ExperimentName`
 *
 * - `SourceArn`
 *
 * - `TrialName`
 */
export const listTrialComponents: API.PaginatedOperationMethod<
  ListTrialComponentsRequest,
  ListTrialComponentsResponse,
  ListTrialComponentsError,
  Credentials | HttpClient.HttpClient,
  TrialComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ExperimentName: 0,
      TrialName: 0,
      SourceArn: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      TrialComponentSummaries: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrialComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrialComponentSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrialsError = ResourceNotFound | CommonErrors;
/**
 * Lists the trials in your account. Specify an experiment name to limit the list to the trials that are part of that experiment. Specify a trial component name to limit the list to the trials that associated with that trial component. The list can be filtered to show only trials that were created in a specific time range. The list can be sorted by trial name or creation time.
 */
export const listTrials: API.PaginatedOperationMethod<
  ListTrialsRequest,
  ListTrialsResponse,
  ListTrialsError,
  Credentials | HttpClient.HttpClient,
  TrialSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ExperimentName: 0,
      TrialComponentName: 0,
      CreatedAfter: 0,
      CreatedBefore: 0,
      SortBy: 0,
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      TrialSummaries: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrials",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrialSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUltraServersByReservedCapacityError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Lists all UltraServers that are part of a specified reserved capacity.
 */
export const listUltraServersByReservedCapacity: API.PaginatedOperationMethod<
  ListUltraServersByReservedCapacityRequest,
  ListUltraServersByReservedCapacityResponse,
  ListUltraServersByReservedCapacityError,
  Credentials | HttpClient.HttpClient,
  UltraServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReservedCapacityArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUltraServersByReservedCapacity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UltraServers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserProfilesError = CommonErrors;
/**
 * Lists user profiles.
 */
export const listUserProfiles: API.PaginatedOperationMethod<
  ListUserProfilesRequest,
  ListUserProfilesResponse,
  ListUserProfilesError,
  Credentials | HttpClient.HttpClient,
  UserProfileDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      SortOrder: 0,
      SortBy: 0,
      DomainIdEquals: 0,
      UserProfileNameContains: 0,
    },
    output: {
      UserProfiles: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserProfiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkforcesError = CommonErrors;
/**
 * Use this operation to list all private and vendor workforces in an Amazon Web Services Region. Note that you can only have one private workforce per Amazon Web Services Region.
 */
export const listWorkforces: API.PaginatedOperationMethod<
  ListWorkforcesRequest,
  ListWorkforcesResponse,
  ListWorkforcesError,
  Credentials | HttpClient.HttpClient,
  Workforce
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NameContains: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Workforces: D.list(o_Workforce) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkforces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workforces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkteamsError = CommonErrors;
/**
 * Gets a list of private work teams that you have defined in a region. The list may be empty if no work team satisfies the filter specified in the `NameContains` parameter.
 */
export const listWorkteams: API.PaginatedOperationMethod<
  ListWorkteamsRequest,
  ListWorkteamsResponse,
  ListWorkteamsError,
  Credentials | HttpClient.HttpClient,
  Workteam
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SortBy: 0,
      SortOrder: 0,
      NameContains: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Workteams: D.list(o_Workteam) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkteams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workteams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutModelPackageGroupPolicyError = ConflictException | CommonErrors;
/**
 * Adds a resouce policy to control access to a model group. For information about resoure policies, see Identity-based policies and resource-based policies in the *Amazon Web Services Identity and Access Management User Guide.*.
 */
export const putModelPackageGroupPolicy: API.OperationMethod<
  PutModelPackageGroupPolicyInput,
  PutModelPackageGroupPolicyOutput,
  PutModelPackageGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelPackageGroupName: 0, ResourcePolicy: 0 },
  },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutModelPackageGroupPolicy",
})) as any;

export type QueryLineageError = ResourceNotFound | CommonErrors;
/**
 * Use this action to inspect your lineage and discover relationships between entities. For more information, see Querying Lineage Entities in the *Amazon SageMaker Developer Guide*.
 */
export const queryLineage: API.PaginatedOperationMethod<
  QueryLineageRequest,
  QueryLineageResponse,
  QueryLineageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StartArns: 0,
      Direction: 0,
      IncludeEdges: 0,
      Filters: {
        Types: 0,
        LineageTypes: 0,
        CreatedBefore: 0,
        CreatedAfter: 0,
        ModifiedBefore: 0,
        ModifiedAfter: 0,
        Properties: 0,
      },
      MaxDepth: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryLineage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RegisterDevicesError = ResourceLimitExceeded | CommonErrors;
/**
 * Register devices.
 */
export const registerDevices: API.OperationMethod<
  RegisterDevicesRequest,
  RegisterDevicesResponse,
  RegisterDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeviceFleetName: 0,
      Devices: D.list(i_Device),
      Tags: D.list(i_Tag),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDevices",
})) as any;

export type RenderUiTemplateError = ResourceNotFound | CommonErrors;
/**
 * Renders the UI template so that you can preview the worker's experience.
 */
export const renderUiTemplate: API.OperationMethod<
  RenderUiTemplateRequest,
  RenderUiTemplateResponse,
  RenderUiTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UiTemplate: i_UiTemplate,
      Task: { Input: 0 },
      RoleArn: 0,
      HumanTaskUiArn: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenderUiTemplate",
})) as any;

export type RetryPipelineExecutionError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Retry the execution of the pipeline.
 */
export const retryPipelineExecution: API.OperationMethod<
  RetryPipelineExecutionRequest,
  RetryPipelineExecutionResponse,
  RetryPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineExecutionArn: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ParallelismConfiguration: i_ParallelismConfiguration,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryPipelineExecution",
})) as any;

export type SearchError = CommonErrors;
/**
 * Finds SageMaker resources that match a search query. Matching resources are returned as a list of `SearchRecord` objects in the response. You can sort the search results by any resource property in a ascending or descending order.
 *
 * You can query against the following value types: numeric, text, Boolean, and timestamp.
 *
 * The Search API may provide access to otherwise restricted data. See Amazon SageMaker API Permissions: Actions, Permissions, and Resources Reference for more information.
 */
export const search: API.PaginatedOperationMethod<
  SearchRequest,
  SearchResponse,
  SearchError,
  Credentials | HttpClient.HttpClient,
  SearchRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Resource: 0,
      SearchExpression: i_SearchExpression,
      SortBy: 0,
      SortOrder: 0,
      NextToken: 0,
      MaxResults: 0,
      CrossAccountFilterOption: 0,
      VisibilityConditions: D.list({ Key: 0, Value: 0 }),
    },
    output: {
      Results: D.list({
        TrainingJob: o_TrainingJob,
        Experiment: { CreationTime: D.ts, LastModifiedTime: D.ts },
        Trial: {
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          TrialComponentSummaries: D.list({ CreationTime: D.ts }),
        },
        TrialComponent: {
          StartTime: D.ts,
          EndTime: D.ts,
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          Metrics: D.list(o_TrialComponentMetricSummary),
          SourceDetail: {
            TrainingJob: o_TrainingJob,
            ProcessingJob: {
              ProcessingEndTime: D.ts,
              ProcessingStartTime: D.ts,
              LastModifiedTime: D.ts,
              CreationTime: D.ts,
            },
            TransformJob: o_TransformJob,
          },
        },
        Endpoint: {
          ProductionVariants: D.list(o_ProductionVariantSummary),
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          MonitoringSchedules: D.list({
            CreationTime: D.ts,
            LastModifiedTime: D.ts,
            LastMonitoringExecutionSummary: o_MonitoringExecutionSummary,
          }),
          ShadowProductionVariants: D.list(o_ProductionVariantSummary),
        },
        ModelPackage: {
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          ModelCard: o_ModelPackageModelCard,
        },
        ModelPackageGroup: { CreationTime: D.ts },
        Pipeline: {
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          LastRunTime: D.ts,
        },
        PipelineExecution: { CreationTime: D.ts, LastModifiedTime: D.ts },
        PipelineVersion: { CreationTime: D.ts, LastModifiedTime: D.ts },
        FeatureGroup: { CreationTime: D.ts, LastModifiedTime: D.ts },
        FeatureMetadata: { CreationTime: D.ts, LastModifiedTime: D.ts },
        Project: { CreationTime: D.ts, LastModifiedTime: D.ts },
        HyperParameterTuningJob: {
          CreationTime: D.ts,
          HyperParameterTuningEndTime: D.ts,
          LastModifiedTime: D.ts,
          BestTrainingJob: o_HyperParameterTrainingJobSummary,
          OverallBestTrainingJob: o_HyperParameterTrainingJobSummary,
          TuningJobCompletionDetails:
            o_HyperParameterTuningJobCompletionDetails,
        },
        ModelCard: {
          Content: D.secret,
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
        },
        Model: {
          Model: { CreationTime: D.ts },
          Endpoints: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
          LastBatchTransformJob: o_TransformJob,
          MonitoringSchedules: D.list({
            CreationTime: D.ts,
            LastModifiedTime: D.ts,
            MonitoringAlertSummaries: D.list(o_MonitoringAlertSummary),
            LastMonitoringExecutionSummary: o_MonitoringExecutionSummary,
          }),
          ModelCard: { CreationTime: D.ts, LastModifiedTime: D.ts },
        },
        Job: {
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
          EndTime: D.ts,
          SecondaryStatusTransitions: D.list(o_JobSecondaryStatusTransition),
        },
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTrainingPlanOfferingsError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Searches for available training plan offerings based on specified criteria.
 *
 * - Users search for available plan offerings based on their requirements (e.g., instance type, count, start time, duration).
 *
 * - And then, they create a plan that best matches their needs using the ID of the plan offering they want to use.
 *
 * For more information about how to reserve GPU capacity for your SageMaker training jobs or SageMaker HyperPod clusters using Amazon SageMaker Training Plan , see ` CreateTrainingPlan `.
 */
export const searchTrainingPlanOfferings: API.OperationMethod<
  SearchTrainingPlanOfferingsRequest,
  SearchTrainingPlanOfferingsResponse,
  SearchTrainingPlanOfferingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceType: 0,
      InstanceCount: 0,
      UltraServerType: 0,
      UltraServerCount: 0,
      StartTimeAfter: 0,
      EndTimeBefore: 0,
      DurationHours: 0,
      TargetResources: 0,
      TrainingPlanArn: 0,
    },
    output: {
      TrainingPlanOfferings: D.list({
        RequestedStartTimeAfter: D.ts,
        RequestedEndTimeBefore: D.ts,
        ReservedCapacityOfferings: D.list({
          StartTime: D.ts,
          EndTime: D.ts,
          ExtensionStartTime: D.ts,
          ExtensionEndTime: D.ts,
        }),
      }),
      TrainingPlanExtensionOfferings: D.list({
        StartDate: D.ts,
        EndDate: D.ts,
      }),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTrainingPlanOfferings",
})) as any;

export type SendPipelineExecutionStepFailureError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Notifies the pipeline that the execution of a callback step failed, along with a message describing why. When a callback step is run, the pipeline generates a callback token and includes the token in a message sent to Amazon Simple Queue Service (Amazon SQS).
 */
export const sendPipelineExecutionStepFailure: API.OperationMethod<
  SendPipelineExecutionStepFailureRequest,
  SendPipelineExecutionStepFailureResponse,
  SendPipelineExecutionStepFailureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CallbackToken: 0,
      FailureReason: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendPipelineExecutionStepFailure",
})) as any;

export type SendPipelineExecutionStepSuccessError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Notifies the pipeline that the execution of a callback step succeeded and provides a list of the step's output parameters. When a callback step is run, the pipeline generates a callback token and includes the token in a message sent to Amazon Simple Queue Service (Amazon SQS).
 */
export const sendPipelineExecutionStepSuccess: API.OperationMethod<
  SendPipelineExecutionStepSuccessRequest,
  SendPipelineExecutionStepSuccessResponse,
  SendPipelineExecutionStepSuccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CallbackToken: 0,
      OutputParameters: D.list({ Name: 0, Value: 0 }),
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendPipelineExecutionStepSuccess",
})) as any;

export type StartClusterHealthCheckError = ResourceNotFound | CommonErrors;
/**
 * Start deep health checks for a SageMaker HyperPod cluster. You can use DescribeClusterNode API to track progress of the deep health checks. The unhealthy nodes will be automatically rebooted or replaced. Please see Resilience-related Kubernetes labels by SageMaker HyperPod for details.
 */
export const startClusterHealthCheck: API.OperationMethod<
  StartClusterHealthCheckRequest,
  StartClusterHealthCheckResponse,
  StartClusterHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      DeepHealthCheckConfigurations: D.list({
        InstanceGroupName: 0,
        InstanceIds: 0,
        DeepHealthChecks: 0,
      }),
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartClusterHealthCheck",
})) as any;

export type StartEdgeDeploymentStageError = CommonErrors;
/**
 * Starts a stage in an edge deployment plan.
 */
export const startEdgeDeploymentStage: API.OperationMethod<
  StartEdgeDeploymentStageRequest,
  StartEdgeDeploymentStageResponse,
  StartEdgeDeploymentStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgeDeploymentPlanName: 0, StageName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEdgeDeploymentStage",
})) as any;

export type StartInferenceExperimentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Starts an inference experiment.
 */
export const startInferenceExperiment: API.OperationMethod<
  StartInferenceExperimentRequest,
  StartInferenceExperimentResponse,
  StartInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInferenceExperiment",
})) as any;

export type StartMlflowTrackingServerError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Programmatically start an MLflow Tracking Server.
 */
export const startMlflowTrackingServer: API.OperationMethod<
  StartMlflowTrackingServerRequest,
  StartMlflowTrackingServerResponse,
  StartMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrackingServerName: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMlflowTrackingServer",
})) as any;

export type StartMonitoringScheduleError = ResourceNotFound | CommonErrors;
/**
 * Starts a previously stopped monitoring schedule.
 *
 * By default, when you successfully create a new schedule, the status of a monitoring schedule is `scheduled`.
 */
export const startMonitoringSchedule: API.OperationMethod<
  StartMonitoringScheduleRequest,
  StartMonitoringScheduleResponse,
  StartMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitoringScheduleName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringSchedule",
})) as any;

export type StartNotebookInstanceError = ResourceLimitExceeded | CommonErrors;
/**
 * Launches an ML compute instance with the latest version of the libraries and attaches your ML storage volume. After configuring the notebook instance, SageMaker AI sets the notebook instance status to `InService`. A notebook instance's status must be `InService` before you can connect to your Jupyter notebook.
 */
export const startNotebookInstance: API.OperationMethod<
  StartNotebookInstanceInput,
  StartNotebookInstanceResponse,
  StartNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NotebookInstanceName: 0 } },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookInstance",
})) as any;

export type StartPipelineExecutionError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Starts a pipeline execution.
 */
export const startPipelineExecution: API.OperationMethod<
  StartPipelineExecutionRequest,
  StartPipelineExecutionResponse,
  StartPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineName: 0,
      PipelineExecutionDisplayName: 0,
      PipelineParameters: D.list({ Name: 0, Value: 0 }),
      PipelineExecutionDescription: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ParallelismConfiguration: i_ParallelismConfiguration,
      SelectiveExecutionConfig: {
        SourcePipelineExecutionArn: 0,
        SelectedSteps: D.list({ StepName: 0 }),
      },
      PipelineVersionId: 0,
      MlflowExperimentName: 0,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipelineExecution",
})) as any;

export type StartSessionError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Initiates a remote connection session between a local integrated development environments (IDEs) and a remote SageMaker space.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceIdentifier: 0 } },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
})) as any;

export type StopAIBenchmarkJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a running AI benchmark job.
 */
export const stopAIBenchmarkJob: API.OperationMethod<
  StopAIBenchmarkJobRequest,
  StopAIBenchmarkJobResponse,
  StopAIBenchmarkJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AIBenchmarkJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAIBenchmarkJob",
})) as any;

export type StopAIRecommendationJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a running AI recommendation job.
 */
export const stopAIRecommendationJob: API.OperationMethod<
  StopAIRecommendationJobRequest,
  StopAIRecommendationJobResponse,
  StopAIRecommendationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AIRecommendationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAIRecommendationJob",
})) as any;

export type StopAutoMLJobError = ResourceNotFound | CommonErrors;
/**
 * A method for forcing a running job to shut down.
 */
export const stopAutoMLJob: API.OperationMethod<
  StopAutoMLJobRequest,
  StopAutoMLJobResponse,
  StopAutoMLJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AutoMLJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutoMLJob",
})) as any;

export type StopCompilationJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a model compilation job.
 *
 * To stop a job, Amazon SageMaker AI sends the algorithm the SIGTERM signal. This gracefully shuts the job down. If the job hasn't stopped, it sends the SIGKILL signal.
 *
 * When it receives a `StopCompilationJob` request, Amazon SageMaker AI changes the `CompilationJobStatus` of the job to `Stopping`. After Amazon SageMaker stops the job, it sets the `CompilationJobStatus` to `Stopped`.
 */
export const stopCompilationJob: API.OperationMethod<
  StopCompilationJobRequest,
  StopCompilationJobResponse,
  StopCompilationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CompilationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCompilationJob",
})) as any;

export type StopEdgeDeploymentStageError = CommonErrors;
/**
 * Stops a stage in an edge deployment plan.
 */
export const stopEdgeDeploymentStage: API.OperationMethod<
  StopEdgeDeploymentStageRequest,
  StopEdgeDeploymentStageResponse,
  StopEdgeDeploymentStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EdgeDeploymentPlanName: 0, StageName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEdgeDeploymentStage",
})) as any;

export type StopEdgePackagingJobError = CommonErrors;
/**
 * Request to stop an edge packaging job.
 */
export const stopEdgePackagingJob: API.OperationMethod<
  StopEdgePackagingJobRequest,
  StopEdgePackagingJobResponse,
  StopEdgePackagingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EdgePackagingJobName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEdgePackagingJob",
})) as any;

export type StopHyperParameterTuningJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a running hyperparameter tuning job and all running training jobs that the tuning job launched.
 *
 * All model artifacts output from the training jobs are stored in Amazon Simple Storage Service (Amazon S3). All data that the training jobs write to Amazon CloudWatch Logs are still available in CloudWatch. After the tuning job moves to the `Stopped` state, it releases all reserved resources for the tuning job.
 */
export const stopHyperParameterTuningJob: API.OperationMethod<
  StopHyperParameterTuningJobRequest,
  StopHyperParameterTuningJobResponse,
  StopHyperParameterTuningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HyperParameterTuningJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopHyperParameterTuningJob",
})) as any;

export type StopInferenceExperimentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Stops an inference experiment.
 */
export const stopInferenceExperiment: API.OperationMethod<
  StopInferenceExperimentRequest,
  StopInferenceExperimentResponse,
  StopInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ModelVariantActions: 0,
      DesiredModelVariants: D.list(i_ModelVariantConfig),
      DesiredState: 0,
      Reason: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInferenceExperiment",
})) as any;

export type StopInferenceRecommendationsJobError =
  | ResourceNotFound
  | CommonErrors;
/**
 * Stops an Inference Recommender job.
 */
export const stopInferenceRecommendationsJob: API.OperationMethod<
  StopInferenceRecommendationsJobRequest,
  StopInferenceRecommendationsJobResponse,
  StopInferenceRecommendationsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInferenceRecommendationsJob",
})) as any;

export type StopJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a running job. When you call `StopJob`, Amazon SageMaker sets the job status to `Stopping`. After the job stops, the status changes to `Stopped`. Partial results may be available in the output location if the job was in progress. To delete a stopped job, call `DeleteJob`.
 *
 * The following operations are related to `StopJob`:
 *
 * - `CreateJob`
 *
 * - `DescribeJob`
 *
 * - `DeleteJob`
 */
export const stopJob: API.OperationMethod<
  StopJobRequest,
  StopJobResponse,
  StopJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0, JobCategory: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
})) as any;

export type StopLabelingJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a running labeling job. A job that is stopped cannot be restarted. Any results obtained before the job is stopped are placed in the Amazon S3 output bucket.
 */
export const stopLabelingJob: API.OperationMethod<
  StopLabelingJobRequest,
  StopLabelingJobResponse,
  StopLabelingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LabelingJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopLabelingJob",
})) as any;

export type StopMlflowTrackingServerError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Programmatically stop an MLflow Tracking Server.
 */
export const stopMlflowTrackingServer: API.OperationMethod<
  StopMlflowTrackingServerRequest,
  StopMlflowTrackingServerResponse,
  StopMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrackingServerName: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMlflowTrackingServer",
})) as any;

export type StopMonitoringScheduleError = ResourceNotFound | CommonErrors;
/**
 * Stops a previously started monitoring schedule.
 */
export const stopMonitoringSchedule: API.OperationMethod<
  StopMonitoringScheduleRequest,
  StopMonitoringScheduleResponse,
  StopMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitoringScheduleName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMonitoringSchedule",
})) as any;

export type StopNotebookInstanceError = CommonErrors;
/**
 * Terminates the ML compute instance. Before terminating the instance, SageMaker AI disconnects the ML storage volume from it. SageMaker AI preserves the ML storage volume. SageMaker AI stops charging you for the ML compute instance when you call `StopNotebookInstance`.
 *
 * To access data on the ML storage volume for a notebook instance that has been terminated, call the `StartNotebookInstance` API. `StartNotebookInstance` launches another ML compute instance, configures it, and attaches the preserved ML storage volume so you can continue your work.
 */
export const stopNotebookInstance: API.OperationMethod<
  StopNotebookInstanceInput,
  StopNotebookInstanceResponse,
  StopNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NotebookInstanceName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopNotebookInstance",
})) as any;

export type StopOptimizationJobError = ResourceNotFound | CommonErrors;
/**
 * Ends a running inference optimization job.
 */
export const stopOptimizationJob: API.OperationMethod<
  StopOptimizationJobRequest,
  StopOptimizationJobResponse,
  StopOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OptimizationJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopOptimizationJob",
})) as any;

export type StopPipelineExecutionError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Stops a pipeline execution.
 *
 * **Callback Step**
 *
 * A pipeline execution won't stop while a callback step is running. When you call `StopPipelineExecution` on a pipeline execution with a running callback step, SageMaker Pipelines sends an additional Amazon SQS message to the specified SQS queue. The body of the SQS message contains a "Status" field which is set to "Stopping".
 *
 * You should add logic to your Amazon SQS message consumer to take any needed action (for example, resource cleanup) upon receipt of the message followed by a call to `SendPipelineExecutionStepSuccess` or `SendPipelineExecutionStepFailure`.
 *
 * Only when SageMaker Pipelines receives one of these calls will it stop the pipeline execution.
 *
 * **Lambda Step**
 *
 * A pipeline execution can't be stopped while a lambda step is running because the Lambda function invoked by the lambda step can't be stopped. If you attempt to stop the execution while the Lambda function is running, the pipeline waits for the Lambda function to finish or until the timeout is hit, whichever occurs first, and then stops. If the Lambda function finishes, the pipeline execution status is `Stopped`. If the timeout is hit the pipeline execution status is `Failed`.
 */
export const stopPipelineExecution: API.OperationMethod<
  StopPipelineExecutionRequest,
  StopPipelineExecutionResponse,
  StopPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineExecutionArn: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipelineExecution",
})) as any;

export type StopProcessingJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a processing job.
 */
export const stopProcessingJob: API.OperationMethod<
  StopProcessingJobRequest,
  StopProcessingJobResponse,
  StopProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProcessingJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopProcessingJob",
})) as any;

export type StopTrainingJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a training job. To stop a job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms might use this 120-second window to save the model artifacts, so the results of the training is not lost.
 *
 * When it receives a `StopTrainingJob` request, SageMaker changes the status of the job to `Stopping`. After SageMaker stops the job, it sets the status to `Stopped`.
 */
export const stopTrainingJob: API.OperationMethod<
  StopTrainingJobRequest,
  StopTrainingJobResponse,
  StopTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrainingJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTrainingJob",
})) as any;

export type StopTransformJobError = ResourceNotFound | CommonErrors;
/**
 * Stops a batch transform job.
 *
 * When Amazon SageMaker receives a `StopTransformJob` request, the status of the job changes to `Stopping`. After Amazon SageMaker stops the job, the status is set to `Stopped`. When you stop a batch transform job before it is completed, Amazon SageMaker doesn't store the job's output in Amazon S3.
 */
export const stopTransformJob: API.OperationMethod<
  StopTransformJobRequest,
  StopTransformJobResponse,
  StopTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformJobName: 0 } },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTransformJob",
})) as any;

export type UpdateActionError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates an action.
 */
export const updateAction: API.OperationMethod<
  UpdateActionRequest,
  UpdateActionResponse,
  UpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActionName: 0,
      Description: 0,
      Status: 0,
      Properties: 0,
      PropertiesToRemove: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAction",
})) as any;

export type UpdateAppImageConfigError = ResourceNotFound | CommonErrors;
/**
 * Updates the properties of an AppImageConfig.
 */
export const updateAppImageConfig: API.OperationMethod<
  UpdateAppImageConfigRequest,
  UpdateAppImageConfigResponse,
  UpdateAppImageConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AppImageConfigName: 0,
      KernelGatewayImageConfig: i_KernelGatewayImageConfig,
      JupyterLabAppImageConfig: i_JupyterLabAppImageConfig,
      CodeEditorAppImageConfig: i_CodeEditorAppImageConfig,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppImageConfig",
})) as any;

export type UpdateArtifactError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates an artifact.
 */
export const updateArtifact: API.OperationMethod<
  UpdateArtifactRequest,
  UpdateArtifactResponse,
  UpdateArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArtifactArn: 0,
      ArtifactName: 0,
      Properties: 0,
      PropertiesToRemove: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateArtifact",
})) as any;

export type UpdateClusterError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a SageMaker HyperPod cluster.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      InstanceGroups: D.list(i_ClusterInstanceGroupSpecification),
      RestrictedInstanceGroups: D.list(
        i_ClusterRestrictedInstanceGroupSpecification,
      ),
      RestrictedInstanceGroupsConfig: i_ClusterRestrictedInstanceGroupsConfig,
      TieredStorageConfig: i_ClusterTieredStorageConfig,
      NodeRecovery: 0,
      InstanceGroupsToDelete: 0,
      NodeProvisioningMode: 0,
      ClusterRole: 0,
      AutoScaling: i_ClusterAutoScalingConfig,
      Orchestrator: i_ClusterOrchestrator,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
})) as any;

export type UpdateClusterSchedulerConfigError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Update the cluster policy configuration.
 */
export const updateClusterSchedulerConfig: API.OperationMethod<
  UpdateClusterSchedulerConfigRequest,
  UpdateClusterSchedulerConfigResponse,
  UpdateClusterSchedulerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSchedulerConfigId: 0,
      TargetVersion: 0,
      SchedulerConfig: i_SchedulerConfig,
      Description: 0,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterSchedulerConfig",
})) as any;

export type UpdateClusterSoftwareError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the platform software of a SageMaker HyperPod cluster for security patching. To learn how to use this API, see Update the SageMaker HyperPod platform software of a cluster.
 *
 * The `UpgradeClusterSoftware` API call may impact your SageMaker HyperPod cluster uptime and availability. Plan accordingly to mitigate potential disruptions to your workloads.
 */
export const updateClusterSoftware: API.OperationMethod<
  UpdateClusterSoftwareRequest,
  UpdateClusterSoftwareResponse,
  UpdateClusterSoftwareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      InstanceGroups: D.list({ InstanceGroupName: 0, ImageReleaseVersion: 0 }),
      DeploymentConfig: i_DeploymentConfiguration,
      ImageId: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterSoftware",
})) as any;

export type UpdateCodeRepositoryError = ConflictException | CommonErrors;
/**
 * Updates the specified Git repository with the specified values.
 */
export const updateCodeRepository: API.OperationMethod<
  UpdateCodeRepositoryInput,
  UpdateCodeRepositoryOutput,
  UpdateCodeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CodeRepositoryName: 0, GitConfig: { SecretArn: 0 } },
  },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeRepository",
})) as any;

export type UpdateComputeQuotaError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Update the compute allocation definition.
 */
export const updateComputeQuota: API.OperationMethod<
  UpdateComputeQuotaRequest,
  UpdateComputeQuotaResponse,
  UpdateComputeQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ComputeQuotaId: 0,
      TargetVersion: 0,
      ComputeQuotaConfig: i_ComputeQuotaConfig,
      ComputeQuotaTarget: i_ComputeQuotaTarget,
      ActivationState: 0,
      Description: 0,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputeQuota",
})) as any;

export type UpdateContextError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a context.
 */
export const updateContext: API.OperationMethod<
  UpdateContextRequest,
  UpdateContextResponse,
  UpdateContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContextName: 0,
      Description: 0,
      Properties: 0,
      PropertiesToRemove: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContext",
})) as any;

export type UpdateDeviceFleetError = ResourceInUse | CommonErrors;
/**
 * Updates a fleet of devices.
 */
export const updateDeviceFleet: API.OperationMethod<
  UpdateDeviceFleetRequest,
  UpdateDeviceFleetResponse,
  UpdateDeviceFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeviceFleetName: 0,
      RoleArn: 0,
      Description: 0,
      OutputConfig: i_EdgeOutputConfig,
      EnableIotRoleAlias: 0,
    },
  },
  errors: [ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceFleet",
})) as any;

export type UpdateDevicesError = CommonErrors;
/**
 * Updates one or more devices in a fleet.
 */
export const updateDevices: API.OperationMethod<
  UpdateDevicesRequest,
  UpdateDevicesResponse,
  UpdateDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeviceFleetName: 0, Devices: D.list(i_Device) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevices",
})) as any;

export type UpdateDomainError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the default settings for new user profiles in the domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainRequest,
  UpdateDomainResponse,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      DefaultUserSettings: i_UserSettings,
      DomainSettingsForUpdate: {
        RStudioServerProDomainSettingsForUpdate: {
          DomainExecutionRoleArn: 0,
          DefaultResourceSpec: i_ResourceSpec,
          RStudioConnectUrl: 0,
          RStudioPackageManagerUrl: 0,
        },
        ExecutionRoleIdentityConfig: 0,
        SecurityGroupIds: 0,
        TrustedIdentityPropagationSettings:
          i_TrustedIdentityPropagationSettings,
        DockerSettings: i_DockerSettings,
        AmazonQSettings: i_AmazonQSettings,
        UnifiedStudioSettings: i_UnifiedStudioSettings,
        IpAddressType: 0,
      },
      AppSecurityGroupManagement: 0,
      DefaultSpaceSettings: i_DefaultSpaceSettings,
      SubnetIds: 0,
      AppNetworkAccessType: 0,
      TagPropagation: 0,
      HomeEfsFileSystemCreation: 0,
      VpcId: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomain",
})) as any;

export type UpdateEndpointError =
  | ResourceLimitExceeded
  | EndpointConfigNotFound
  | EndpointNotFound
  | CommonErrors;
/**
 * Deploys the `EndpointConfig` specified in the request to a new fleet of instances. SageMaker shifts endpoint traffic to the new instances with the updated endpoint configuration and then deletes the old instances using the previous `EndpointConfig` (there is no availability loss). For more information about how to control the update and traffic shifting process, see Update models in production.
 *
 * When SageMaker receives the request, it sets the endpoint status to `Updating`. After updating the endpoint, it sets the status to `InService`. To check the status of an endpoint, use the DescribeEndpoint API.
 *
 * You must not delete an `EndpointConfig` in use by an endpoint that is live or while the `UpdateEndpoint` or `CreateEndpoint` operations are being performed on the endpoint. To update an endpoint, you must create a new `EndpointConfig`.
 *
 * If you delete the `EndpointConfig` of an endpoint that is active or being created or updated you may lose visibility into the instance type the endpoint is using. The endpoint must be deleted in order to stop incurring charges.
 */
export const updateEndpoint: API.OperationMethod<
  UpdateEndpointInput,
  UpdateEndpointOutput,
  UpdateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      EndpointConfigName: 0,
      RetainAllVariantProperties: 0,
      ExcludeRetainedVariantProperties: D.list({ VariantPropertyType: 0 }),
      DeploymentConfig: i_DeploymentConfig,
      RetainDeploymentConfig: 0,
    },
  },
  errors: [ResourceLimitExceeded, EndpointConfigNotFound, EndpointNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpoint",
})) as any;

export type UpdateEndpointWeightsAndCapacitiesError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Updates variant weight of one or more variants associated with an existing endpoint, or capacity of one variant associated with an existing endpoint. When it receives the request, SageMaker sets the endpoint status to `Updating`. After updating the endpoint, it sets the status to `InService`. To check the status of an endpoint, use the DescribeEndpoint API.
 */
export const updateEndpointWeightsAndCapacities: API.OperationMethod<
  UpdateEndpointWeightsAndCapacitiesInput,
  UpdateEndpointWeightsAndCapacitiesOutput,
  UpdateEndpointWeightsAndCapacitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      DesiredWeightsAndCapacities: D.list({
        VariantName: 0,
        DesiredWeight: 0,
        DesiredInstanceCount: 0,
        ServerlessUpdateConfig: {
          MaxConcurrency: 0,
          ProvisionedConcurrency: 0,
        },
      }),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointWeightsAndCapacities",
})) as any;

export type UpdateExperimentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Adds, updates, or removes the description of an experiment. Updates the display name of an experiment.
 */
export const updateExperiment: API.OperationMethod<
  UpdateExperimentRequest,
  UpdateExperimentResponse,
  UpdateExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExperimentName: 0, DisplayName: 0, Description: 0 },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperiment",
})) as any;

export type UpdateFeatureGroupError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the feature group by either adding features or updating the online store configuration. Use one of the following request parameters at a time while using the `UpdateFeatureGroup` API.
 *
 * You can add features for your feature group using the `FeatureAdditions` request parameter. Features cannot be removed from a feature group.
 *
 * You can update the online store configuration by using the `OnlineStoreConfig` request parameter. If a `TtlDuration` is specified, the default `TtlDuration` applies for all records added to the feature group *after the feature group is updated*. If a record level `TtlDuration` exists from using the `PutRecord` API, the record level `TtlDuration` applies to that record instead of the default `TtlDuration`. To remove the default `TtlDuration` from an existing feature group, use the `UpdateFeatureGroup` API and set the `TtlDuration` `Unit` and `Value` to `null`.
 */
export const updateFeatureGroup: API.OperationMethod<
  UpdateFeatureGroupRequest,
  UpdateFeatureGroupResponse,
  UpdateFeatureGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FeatureGroupName: 0,
      FeatureAdditions: D.list(i_FeatureDefinition),
      OnlineStoreConfig: { TtlDuration: i_TtlDuration },
      ThroughputConfig: {
        ThroughputMode: 0,
        ProvisionedReadCapacityUnits: 0,
        ProvisionedWriteCapacityUnits: 0,
      },
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeatureGroup",
})) as any;

export type UpdateFeatureMetadataError = ResourceNotFound | CommonErrors;
/**
 * Updates the description and parameters of the feature group.
 */
export const updateFeatureMetadata: API.OperationMethod<
  UpdateFeatureMetadataRequest,
  UpdateFeatureMetadataResponse,
  UpdateFeatureMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FeatureGroupName: 0,
      FeatureName: 0,
      Description: 0,
      ParameterAdditions: D.list({ Key: 0, Value: 0 }),
      ParameterRemovals: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeatureMetadata",
})) as any;

export type UpdateHubError = ResourceNotFound | CommonErrors;
/**
 * Update a hub.
 */
export const updateHub: API.OperationMethod<
  UpdateHubRequest,
  UpdateHubResponse,
  UpdateHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubDescription: 0,
      HubDisplayName: 0,
      HubSearchKeywords: 0,
    },
  },
  errors: [ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHub",
})) as any;

export type UpdateHubContentError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates SageMaker hub content (either a `Model` or `Notebook` resource).
 *
 * You can update the metadata that describes the resource. In addition to the required request fields, specify at least one of the following fields to update:
 *
 * - `HubContentDescription`
 *
 * - `HubContentDisplayName`
 *
 * - `HubContentMarkdown`
 *
 * - `HubContentSearchKeywords`
 *
 * - `SupportStatus`
 *
 * For more information about hubs, see Private curated hubs for foundation model access control in JumpStart.
 *
 * If you want to update a `ModelReference` resource in your hub, use the `UpdateHubContentResource` API instead.
 */
export const updateHubContent: API.OperationMethod<
  UpdateHubContentRequest,
  UpdateHubContentResponse,
  UpdateHubContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HubName: 0,
      HubContentName: 0,
      HubContentType: 0,
      HubContentVersion: 0,
      HubContentDisplayName: 0,
      HubContentDescription: 0,
      HubContentMarkdown: 0,
      HubContentSearchKeywords: 0,
      SupportStatus: 0,
    },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHubContent",
})) as any;

export type UpdateHubContentReferenceError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the contents of a SageMaker hub for a `ModelReference` resource. A `ModelReference` allows you to access public SageMaker JumpStart models from within your private hub.
 *
 * When using this API, you can update the `MinVersion` field for additional flexibility in the model version. You shouldn't update any additional fields when using this API, because the metadata in your private hub should match the public JumpStart model's metadata.
 *
 * If you want to update a `Model` or `Notebook` resource in your hub, use the `UpdateHubContent` API instead.
 *
 * For more information about adding model references to your hub, see Add models to a private hub.
 */
export const updateHubContentReference: API.OperationMethod<
  UpdateHubContentReferenceRequest,
  UpdateHubContentReferenceResponse,
  UpdateHubContentReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HubName: 0, HubContentName: 0, HubContentType: 0, MinVersion: 0 },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHubContentReference",
})) as any;

export type UpdateImageError = ResourceInUse | ResourceNotFound | CommonErrors;
/**
 * Updates the properties of a SageMaker AI image. To change the image's tags, use the AddTags and DeleteTags APIs.
 */
export const updateImage: API.OperationMethod<
  UpdateImageRequest,
  UpdateImageResponse,
  UpdateImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeleteProperties: 0,
      Description: 0,
      DisplayName: 0,
      ImageName: 0,
      RoleArn: 0,
    },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImage",
})) as any;

export type UpdateImageVersionError =
  | ResourceInUse
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the properties of a SageMaker AI image version.
 */
export const updateImageVersion: API.OperationMethod<
  UpdateImageVersionRequest,
  UpdateImageVersionResponse,
  UpdateImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ImageName: 0,
      Alias: 0,
      Version: 0,
      AliasesToAdd: 0,
      AliasesToDelete: 0,
      VendorGuidance: 0,
      JobType: 0,
      MLFramework: 0,
      ProgrammingLang: 0,
      Processor: 0,
      Horovod: 0,
      ReleaseNotes: 0,
    },
  },
  errors: [ResourceInUse, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImageVersion",
})) as any;

export type UpdateInferenceComponentError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Updates an inference component.
 */
export const updateInferenceComponent: API.OperationMethod<
  UpdateInferenceComponentInput,
  UpdateInferenceComponentOutput,
  UpdateInferenceComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InferenceComponentName: 0,
      Specification: i_InferenceComponentSpecification,
      Specifications: D.list(i_InferenceComponentSpecification),
      RuntimeConfig: i_InferenceComponentRuntimeConfig,
      DeploymentConfig: {
        RollingUpdatePolicy: {
          MaximumBatchSize: i_InferenceComponentCapacitySize,
          WaitIntervalInSeconds: 0,
          MaximumExecutionTimeoutInSeconds: 0,
          RollbackMaximumBatchSize: i_InferenceComponentCapacitySize,
        },
        AutoRollbackConfiguration: i_AutoRollbackConfig,
      },
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInferenceComponent",
})) as any;

export type UpdateInferenceComponentRuntimeConfigError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Runtime settings for a model that is deployed with an inference component.
 */
export const updateInferenceComponentRuntimeConfig: API.OperationMethod<
  UpdateInferenceComponentRuntimeConfigInput,
  UpdateInferenceComponentRuntimeConfigOutput,
  UpdateInferenceComponentRuntimeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InferenceComponentName: 0,
      DesiredRuntimeConfig: i_InferenceComponentRuntimeConfig,
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInferenceComponentRuntimeConfig",
})) as any;

export type UpdateInferenceExperimentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates an inference experiment that you created. The status of the inference experiment has to be either `Created`, `Running`. For more information on the status of an inference experiment, see DescribeInferenceExperiment.
 */
export const updateInferenceExperiment: API.OperationMethod<
  UpdateInferenceExperimentRequest,
  UpdateInferenceExperimentResponse,
  UpdateInferenceExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Schedule: i_InferenceExperimentSchedule,
      Description: 0,
      ModelVariants: D.list(i_ModelVariantConfig),
      DataStorageConfig: i_InferenceExperimentDataStorageConfig,
      ShadowModeConfig: i_ShadowModeConfig,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInferenceExperiment",
})) as any;

export type UpdateMlflowAppError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates an MLflow App.
 */
export const updateMlflowApp: API.OperationMethod<
  UpdateMlflowAppRequest,
  UpdateMlflowAppResponse,
  UpdateMlflowAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Arn: 0,
      Name: 0,
      ArtifactStoreUri: 0,
      ModelRegistrationMode: 0,
      WeeklyMaintenanceWindowStart: 0,
      DefaultDomainIdList: 0,
      AccountDefaultStatus: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMlflowApp",
})) as any;

export type UpdateMlflowTrackingServerError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates properties of an existing MLflow Tracking Server.
 */
export const updateMlflowTrackingServer: API.OperationMethod<
  UpdateMlflowTrackingServerRequest,
  UpdateMlflowTrackingServerResponse,
  UpdateMlflowTrackingServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrackingServerName: 0,
      ArtifactStoreUri: 0,
      TrackingServerSize: 0,
      AutomaticModelRegistration: 0,
      WeeklyMaintenanceWindowStart: 0,
      S3BucketOwnerAccountId: 0,
      S3BucketOwnerVerification: 0,
    },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMlflowTrackingServer",
})) as any;

export type UpdateModelCardError =
  | ConflictException
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Update an Amazon SageMaker Model Card.
 *
 * You cannot update both model card content and model card status in a single call.
 */
export const updateModelCard: API.OperationMethod<
  UpdateModelCardRequest,
  UpdateModelCardResponse,
  UpdateModelCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ModelCardName: 0, Content: 0, ModelCardStatus: 0 },
  },
  errors: [ConflictException, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModelCard",
})) as any;

export type UpdateModelPackageError = ConflictException | CommonErrors;
/**
 * Updates a versioned model.
 */
export const updateModelPackage: API.OperationMethod<
  UpdateModelPackageInput,
  UpdateModelPackageOutput,
  UpdateModelPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ModelPackageArn: 0,
      ModelApprovalStatus: 0,
      ModelPackageRegistrationType: 0,
      ApprovalDescription: 0,
      CustomerMetadataProperties: 0,
      CustomerMetadataPropertiesToRemove: 0,
      AdditionalInferenceSpecificationsToAdd: D.list(
        i_AdditionalInferenceSpecificationDefinition,
      ),
      InferenceSpecification: i_InferenceSpecification,
      SourceUri: 0,
      ModelCard: i_ModelPackageModelCard,
      ModelLifeCycle: i_ModelLifeCycle,
      ClientToken: 0,
    },
  },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModelPackage",
})) as any;

export type UpdateMonitoringAlertError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Update the parameters of a model monitor alert.
 */
export const updateMonitoringAlert: API.OperationMethod<
  UpdateMonitoringAlertRequest,
  UpdateMonitoringAlertResponse,
  UpdateMonitoringAlertError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitoringScheduleName: 0,
      MonitoringAlertName: 0,
      DatapointsToAlert: 0,
      EvaluationPeriod: 0,
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitoringAlert",
})) as any;

export type UpdateMonitoringScheduleError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a previously created schedule.
 */
export const updateMonitoringSchedule: API.OperationMethod<
  UpdateMonitoringScheduleRequest,
  UpdateMonitoringScheduleResponse,
  UpdateMonitoringScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitoringScheduleName: 0,
      MonitoringScheduleConfig: i_MonitoringScheduleConfig,
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitoringSchedule",
})) as any;

export type UpdateNotebookInstanceError = ResourceLimitExceeded | CommonErrors;
/**
 * Updates a notebook instance. NotebookInstance updates include upgrading or downgrading the ML compute instance used for your notebook instance to accommodate changes in your workload requirements.
 *
 * This API can attach lifecycle configurations to notebook instances. Lifecycle configuration scripts execute with root access and the notebook instance's IAM execution role privileges. Principals with this permission and access to lifecycle configurations can execute code with the execution role's credentials. See Customize a Notebook Instance Using a Lifecycle Configuration Script for security best practices.
 */
export const updateNotebookInstance: API.OperationMethod<
  UpdateNotebookInstanceInput,
  UpdateNotebookInstanceOutput,
  UpdateNotebookInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NotebookInstanceName: 0,
      InstanceType: 0,
      IpAddressType: 0,
      PlatformIdentifier: 0,
      RoleArn: 0,
      LifecycleConfigName: 0,
      DisassociateLifecycleConfig: 0,
      VolumeSizeInGB: 0,
      DefaultCodeRepository: 0,
      AdditionalCodeRepositories: 0,
      AcceleratorTypes: 0,
      DisassociateAcceleratorTypes: 0,
      DisassociateDefaultCodeRepository: 0,
      DisassociateAdditionalCodeRepositories: 0,
      RootAccess: 0,
      InstanceMetadataServiceConfiguration:
        i_InstanceMetadataServiceConfiguration,
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebookInstance",
})) as any;

export type UpdateNotebookInstanceLifecycleConfigError =
  | ResourceLimitExceeded
  | CommonErrors;
/**
 * Updates a notebook instance lifecycle configuration created with the CreateNotebookInstanceLifecycleConfig API.
 *
 * Updates to lifecycle configurations affect all notebook instances using that configuration upon their next start. Lifecycle configuration scripts execute with root access and the notebook instance's IAM execution role privileges. Grant this permission only to trusted principals. See Customize a Notebook Instance Using a Lifecycle Configuration Script for security best practices.
 */
export const updateNotebookInstanceLifecycleConfig: API.OperationMethod<
  UpdateNotebookInstanceLifecycleConfigInput,
  UpdateNotebookInstanceLifecycleConfigOutput,
  UpdateNotebookInstanceLifecycleConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NotebookInstanceLifecycleConfigName: 0,
      OnCreate: D.list(i_NotebookInstanceLifecycleHook),
      OnStart: D.list(i_NotebookInstanceLifecycleHook),
    },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebookInstanceLifecycleConfig",
})) as any;

export type UpdatePartnerAppError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates all of the SageMaker Partner AI Apps in an account.
 */
export const updatePartnerApp: API.OperationMethod<
  UpdatePartnerAppRequest,
  UpdatePartnerAppResponse,
  UpdatePartnerAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Arn: 0,
      MaintenanceConfig: i_PartnerAppMaintenanceConfig,
      Tier: 0,
      ApplicationConfig: i_PartnerAppConfig,
      IdcConfig: i_IdcConfigInput,
      AuthType: 0,
      EnableIamSessionBasedIdentity: 0,
      EnableAutoMinorVersionUpgrade: 0,
      AppVersion: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerApp",
})) as any;

export type UpdatePipelineError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a pipeline.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineName: 0,
      PipelineDisplayName: 0,
      PipelineDefinition: 0,
      PipelineDefinitionS3Location: i_PipelineDefinitionS3Location,
      PipelineDescription: 0,
      RoleArn: 0,
      ParallelismConfiguration: i_ParallelismConfiguration,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
})) as any;

export type UpdatePipelineExecutionError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a pipeline execution.
 */
export const updatePipelineExecution: API.OperationMethod<
  UpdatePipelineExecutionRequest,
  UpdatePipelineExecutionResponse,
  UpdatePipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineExecutionArn: 0,
      PipelineExecutionDescription: 0,
      PipelineExecutionDisplayName: 0,
      ParallelismConfiguration: i_ParallelismConfiguration,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipelineExecution",
})) as any;

export type UpdatePipelineVersionError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a pipeline version.
 */
export const updatePipelineVersion: API.OperationMethod<
  UpdatePipelineVersionRequest,
  UpdatePipelineVersionResponse,
  UpdatePipelineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PipelineArn: 0,
      PipelineVersionId: 0,
      PipelineVersionDisplayName: 0,
      PipelineVersionDescription: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipelineVersion",
})) as any;

export type UpdateProjectError = ConflictException | CommonErrors;
/**
 * Updates a machine learning (ML) project that is created from a template that sets up an ML pipeline from training to deploying an approved model.
 *
 * You must not update a project that is in use. If you update the `ServiceCatalogProvisioningUpdateDetails` of a project that is active or being created, or updated, you may lose resources already created by the project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProjectName: 0,
      ProjectDescription: 0,
      ServiceCatalogProvisioningUpdateDetails: {
        ProvisioningArtifactId: 0,
        ProvisioningParameters: D.list(i_ProvisioningParameter),
      },
      Tags: D.list(i_Tag),
      TemplateProvidersToUpdate: D.list({
        CfnTemplateProvider: {
          TemplateName: 0,
          TemplateURL: 0,
          Parameters: D.list({ Key: 0, Value: 0 }),
        },
      }),
    },
  },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

export type UpdateSpaceError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the settings of a space.
 *
 * You can't edit the app type of a space in the `SpaceSettings`.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainId: 0,
      SpaceName: 0,
      SpaceSettings: i_SpaceSettings,
      SpaceDisplayName: 0,
    },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
})) as any;

export type UpdateTrainingJobError =
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Update a model training job to request a new Debugger profiling configuration or to change warm pool retention length.
 */
export const updateTrainingJob: API.OperationMethod<
  UpdateTrainingJobRequest,
  UpdateTrainingJobResponse,
  UpdateTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrainingJobName: 0,
      ProfilerConfig: {
        S3OutputPath: 0,
        ProfilingIntervalInMilliseconds: 0,
        ProfilingParameters: 0,
        DisableProfiler: 0,
      },
      ProfilerRuleConfigurations: D.list(i_ProfilerRuleConfiguration),
      ResourceConfig: { KeepAlivePeriodInSeconds: 0 },
      RemoteDebugConfig: { EnableRemoteDebug: 0 },
    },
  },
  errors: [ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrainingJob",
})) as any;

export type UpdateTrialError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates the display name of a trial.
 */
export const updateTrial: API.OperationMethod<
  UpdateTrialRequest,
  UpdateTrialResponse,
  UpdateTrialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrialName: 0, DisplayName: 0 } },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrial",
})) as any;

export type UpdateTrialComponentError =
  | ConflictException
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates one or more properties of a trial component.
 */
export const updateTrialComponent: API.OperationMethod<
  UpdateTrialComponentRequest,
  UpdateTrialComponentResponse,
  UpdateTrialComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrialComponentName: 0,
      DisplayName: 0,
      Status: i_TrialComponentStatus,
      StartTime: 0,
      EndTime: 0,
      Parameters: D.map(i_TrialComponentParameterValue),
      ParametersToRemove: 0,
      InputArtifacts: D.map(i_TrialComponentArtifact),
      InputArtifactsToRemove: 0,
      OutputArtifacts: D.map(i_TrialComponentArtifact),
      OutputArtifactsToRemove: 0,
    },
  },
  errors: [ConflictException, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrialComponent",
})) as any;

export type UpdateUserProfileError =
  | ResourceInUse
  | ResourceLimitExceeded
  | ResourceNotFound
  | CommonErrors;
/**
 * Updates a user profile.
 */
export const updateUserProfile: API.OperationMethod<
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UpdateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainId: 0, UserProfileName: 0, UserSettings: i_UserSettings },
  },
  errors: [ResourceInUse, ResourceLimitExceeded, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProfile",
})) as any;

export type UpdateWorkforceError = ConflictException | CommonErrors;
/**
 * Use this operation to update your workforce. You can use this operation to require that workers use specific IP addresses to work on tasks and to update your OpenID Connect (OIDC) Identity Provider (IdP) workforce configuration.
 *
 * The worker portal is now supported in VPC and public internet.
 *
 * Use `SourceIpConfig` to restrict worker access to tasks to a specific range of IP addresses. You specify allowed IP addresses by creating a list of up to ten CIDRs. By default, a workforce isn't restricted to specific IP addresses. If you specify a range of IP addresses, workers who attempt to access tasks using any IP address outside the specified range are denied and get a `Not Found` error message on the worker portal.
 *
 * To restrict public internet access for all workers, configure the `SourceIpConfig` CIDR value. For example, when using `SourceIpConfig` with an `IpAddressType` of `IPv4`, you can restrict access to the IPv4 CIDR block "10.0.0.0/16". When using an `IpAddressType` of `dualstack`, you can specify both the IPv4 and IPv6 CIDR blocks, such as "10.0.0.0/16" for IPv4 only, "2001:db8:1234:1a00::/56" for IPv6 only, or "10.0.0.0/16" and "2001:db8:1234:1a00::/56" for dual stack.
 *
 * Amazon SageMaker does not support Source Ip restriction for worker portals in VPC.
 *
 * Use `OidcConfig` to update the configuration of a workforce created using your own OIDC IdP.
 *
 * You can only update your OIDC IdP configuration when there are no work teams associated with your workforce. You can delete work teams using the DeleteWorkteam operation.
 *
 * After restricting access to a range of IP addresses or updating your OIDC IdP configuration with this operation, you can view details about your update workforce using the DescribeWorkforce operation.
 *
 * This operation only applies to private workforces.
 */
export const updateWorkforce: API.OperationMethod<
  UpdateWorkforceRequest,
  UpdateWorkforceResponse,
  UpdateWorkforceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkforceName: 0,
      SourceIpConfig: i_SourceIpConfig,
      OidcConfig: i_OidcConfig,
      WorkforceVpcConfig: i_WorkforceVpcConfigRequest,
      IpAddressType: 0,
    },
    output: { Workforce: o_Workforce },
  },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkforce",
})) as any;

export type UpdateWorkteamError = ResourceLimitExceeded | CommonErrors;
/**
 * Updates an existing work team with new member definitions or description.
 */
export const updateWorkteam: API.OperationMethod<
  UpdateWorkteamRequest,
  UpdateWorkteamResponse,
  UpdateWorkteamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkteamName: 0,
      MemberDefinitions: D.list(i_MemberDefinition),
      Description: 0,
      NotificationConfiguration: i_NotificationConfiguration,
      WorkerAccessConfiguration: i_WorkerAccessConfiguration,
    },
    output: { Workteam: o_Workteam },
  },
  errors: [ResourceLimitExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkteam",
})) as any;

const i_AIMlflowConfig: D.LazyStruct = () => ({
  MlflowResourceArn: 0,
  MlflowExperimentName: 0,
  MlflowRunName: 0,
});
const i_AdditionalInferenceSpecificationDefinition: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  Containers: D.list(i_ModelPackageContainerDefinition),
  SupportedTransformInstanceTypes: 0,
  SupportedRealtimeInferenceInstanceTypes: 0,
  SupportedContentTypes: 0,
  SupportedResponseMIMETypes: 0,
});
const i_AdditionalS3DataSource: D.LazyStruct = () => ({
  S3DataType: 0,
  S3Uri: 0,
  CompressionType: 0,
  ETag: 0,
});
const i_AmazonQSettings: D.LazyStruct = () => ({ Status: 0, QProfileArn: 0 });
const i_ArtifactSource: D.LazyStruct = () => ({
  SourceUri: 0,
  SourceTypes: D.list({ SourceIdType: 0, Value: 0 }),
});
const i_AutoMLAlgorithmConfig: D.LazyStruct = () => ({ AutoMLAlgorithms: 0 });
const i_AutoMLDataSource: D.LazyStruct = () => ({
  S3DataSource: { S3DataType: 0, S3Uri: 0 },
});
const i_AutoMLDataSplitConfig: D.LazyStruct = () => ({ ValidationFraction: 0 });
const i_AutoMLJobCompletionCriteria: D.LazyStruct = () => ({
  MaxCandidates: 0,
  MaxRuntimePerTrainingJobInSeconds: 0,
  MaxAutoMLJobRuntimeInSeconds: 0,
});
const i_AutoMLJobObjective: D.LazyStruct = () => ({ MetricName: 0 });
const i_AutoMLOutputDataConfig: D.LazyStruct = () => ({
  KmsKeyId: 0,
  S3OutputPath: 0,
});
const i_AutoMLSecurityConfig: D.LazyStruct = () => ({
  VolumeKmsKeyId: 0,
  EnableInterContainerTrafficEncryption: 0,
  VpcConfig: i_VpcConfig,
});
const i_AutoRollbackConfig: D.LazyStruct = () => ({
  Alarms: D.list({ AlarmName: 0 }),
});
const i_BatchTransformInput: D.LazyStruct = () => ({
  DataCapturedDestinationS3Uri: 0,
  DatasetFormat: { Csv: { Header: 0 }, Json: { Line: 0 }, Parquet: {} },
  LocalPath: 0,
  S3InputMode: 0,
  S3DataDistributionType: 0,
  FeaturesAttribute: 0,
  InferenceAttribute: 0,
  ProbabilityAttribute: 0,
  ProbabilityThresholdAttribute: 0,
  StartTimeOffset: 0,
  EndTimeOffset: 0,
  ExcludeFeaturesAttribute: 0,
});
const i_CandidateGenerationConfig: D.LazyStruct = () => ({
  AlgorithmsConfig: D.list(i_AutoMLAlgorithmConfig),
});
const i_CaptureContentTypeHeader: D.LazyStruct = () => ({
  CsvContentTypes: 0,
  JsonContentTypes: 0,
});
const i_Channel: D.LazyStruct = () => ({
  ChannelName: 0,
  DataSource: {
    S3DataSource: {
      S3DataType: 0,
      S3Uri: 0,
      S3DataDistributionType: 0,
      AttributeNames: 0,
      InstanceGroupNames: 0,
      ModelAccessConfig: i_ModelAccessConfig,
      HubAccessConfig: { HubContentArn: 0 },
    },
    FileSystemDataSource: {
      FileSystemId: 0,
      FileSystemAccessMode: 0,
      FileSystemType: 0,
      DirectoryPath: 0,
    },
    DatasetSource: { DatasetArn: 0 },
  },
  ContentType: 0,
  CompressionType: 0,
  RecordWrapperType: 0,
  InputMode: 0,
  ShuffleConfig: { Seed: 0 },
});
const i_CheckpointConfig: D.LazyStruct = () => ({ S3Uri: 0, LocalPath: 0 });
const i_ClusterAutoScalingConfig: D.LazyStruct = () => ({
  Mode: 0,
  AutoScalerType: 0,
});
const i_ClusterInstanceGroupSpecification: D.LazyStruct = () => ({
  InstanceCount: 0,
  MinInstanceCount: 0,
  InstanceGroupName: 0,
  InstanceType: 0,
  InstanceRequirements: { InstanceTypes: 0 },
  LifeCycleConfig: { SourceS3Uri: 0, OnCreate: 0, OnInitComplete: 0 },
  ExecutionRole: 0,
  ThreadsPerCore: 0,
  InstanceStorageConfigs: D.list(i_ClusterInstanceStorageConfig),
  OnStartDeepHealthChecks: 0,
  TrainingPlanArn: 0,
  OverrideVpcConfig: i_VpcConfig,
  ScheduledUpdateConfig: i_ScheduledUpdateConfig,
  ImageId: 0,
  AutoPatchConfig: {
    PatchingStrategy: 0,
    PatchSchedule: { NextPatchDate: 0 },
    DeploymentConfig: i_DeploymentConfiguration,
  },
  ImageReleaseVersion: 0,
  KubernetesConfig: {
    Labels: 0,
    Taints: D.list({ Key: 0, Value: 0, Effect: 0 }),
  },
  SlurmConfig: { NodeType: 0, PartitionNames: 0 },
  CapacityRequirements: { Spot: {}, OnDemand: {} },
  NetworkInterface: { InterfaceType: 0 },
});
const i_ClusterOrchestrator: D.LazyStruct = () => ({
  Eks: { ClusterArn: 0 },
  Slurm: { SlurmConfigStrategy: 0 },
});
const i_ClusterRestrictedInstanceGroupSpecification: D.LazyStruct = () => ({
  InstanceCount: 0,
  InstanceGroupName: 0,
  InstanceType: 0,
  ExecutionRole: 0,
  ThreadsPerCore: 0,
  InstanceStorageConfigs: D.list(i_ClusterInstanceStorageConfig),
  OnStartDeepHealthChecks: 0,
  TrainingPlanArn: 0,
  OverrideVpcConfig: i_VpcConfig,
  ScheduledUpdateConfig: i_ScheduledUpdateConfig,
  EnvironmentConfig: { FSxLustreConfig: i_FSxLustreConfig },
});
const i_ClusterRestrictedInstanceGroupsConfig: D.LazyStruct = () => ({
  SharedEnvironmentConfig: {
    FSxLustreDeletionPolicy: 0,
    FSxLustreConfig: i_FSxLustreConfig,
  },
});
const i_ClusterTieredStorageConfig: D.LazyStruct = () => ({
  Mode: 0,
  InstanceMemoryAllocationPercentage: 0,
});
const i_CodeEditorAppImageConfig: D.LazyStruct = () => ({
  FileSystemConfig: i_FileSystemConfig,
  ContainerConfig: i_ContainerConfig,
});
const i_ComputeQuotaConfig: D.LazyStruct = () => ({
  ComputeQuotaResources: D.list(i_ComputeQuotaResourceConfig),
  ResourceSharingConfig: {
    Strategy: 0,
    BorrowLimit: 0,
    AbsoluteBorrowLimits: D.list(i_ComputeQuotaResourceConfig),
  },
  PreemptTeamTasks: 0,
});
const i_ComputeQuotaTarget: D.LazyStruct = () => ({
  TeamName: 0,
  FairShareWeight: 0,
});
const i_ContainerDefinition: D.LazyStruct = () => ({
  ContainerHostname: 0,
  Image: 0,
  ImageConfig: {
    RepositoryAccessMode: 0,
    RepositoryAuthConfig: { RepositoryCredentialsProviderArn: 0 },
  },
  Mode: 0,
  ModelDataUrl: 0,
  ModelDataSource: i_ModelDataSource,
  AdditionalModelDataSources: D.list(i_AdditionalModelDataSource),
  Environment: 0,
  ModelPackageName: 0,
  InferenceSpecificationName: 0,
  MultiModelConfig: { ModelCacheSetting: 0 },
  ContainerMetricsConfig: i_ContainerMetricsConfig,
});
const i_DefaultSpaceSettings: D.LazyStruct = () => ({
  ExecutionRole: 0,
  SecurityGroups: 0,
  JupyterServerAppSettings: i_JupyterServerAppSettings,
  KernelGatewayAppSettings: i_KernelGatewayAppSettings,
  JupyterLabAppSettings: i_JupyterLabAppSettings,
  SpaceStorageSettings: i_DefaultSpaceStorageSettings,
  CustomPosixUserConfig: i_CustomPosixUserConfig,
  CustomFileSystemConfigs: D.list(i_CustomFileSystemConfig),
});
const i_DeploymentConfig: D.LazyStruct = () => ({
  BlueGreenUpdatePolicy: {
    TrafficRoutingConfiguration: {
      Type: 0,
      WaitIntervalInSeconds: 0,
      CanarySize: i_CapacitySize,
      LinearStepSize: i_CapacitySize,
    },
    TerminationWaitInSeconds: 0,
    MaximumExecutionTimeoutInSeconds: 0,
  },
  RollingUpdatePolicy: {
    MaximumBatchSize: i_CapacitySize,
    WaitIntervalInSeconds: 0,
    MaximumExecutionTimeoutInSeconds: 0,
    RollbackMaximumBatchSize: i_CapacitySize,
  },
  AutoRollbackConfiguration: i_AutoRollbackConfig,
});
const i_DeploymentConfiguration: D.LazyStruct = () => ({
  RollingUpdatePolicy: {
    MaximumBatchSize: i_CapacitySizeConfig,
    RollbackMaximumBatchSize: i_CapacitySizeConfig,
  },
  WaitIntervalInSeconds: 0,
  AutoRollbackConfiguration: D.list({ AlarmName: 0 }),
});
const i_DeploymentStage: D.LazyStruct = () => ({
  StageName: 0,
  DeviceSelectionConfig: {
    DeviceSubsetType: 0,
    Percentage: 0,
    DeviceNames: 0,
    DeviceNameContains: 0,
  },
  DeploymentConfig: { FailureHandlingPolicy: 0 },
});
const i_Device: D.LazyStruct = () => ({
  DeviceName: 0,
  Description: 0,
  IotThingName: 0,
});
const i_DockerSettings: D.LazyStruct = () => ({
  EnableDockerAccess: 0,
  VpcOnlyTrustedAccounts: 0,
  RootlessDocker: 0,
});
const i_EdgeOutputConfig: D.LazyStruct = () => ({
  S3OutputLocation: 0,
  KmsKeyId: 0,
  PresetDeploymentType: 0,
  PresetDeploymentConfig: 0,
});
const i_EndpointInput: D.LazyStruct = () => ({
  EndpointName: 0,
  LocalPath: 0,
  S3InputMode: 0,
  S3DataDistributionType: 0,
  FeaturesAttribute: 0,
  InferenceAttribute: 0,
  ProbabilityAttribute: 0,
  ProbabilityThresholdAttribute: 0,
  StartTimeOffset: 0,
  EndTimeOffset: 0,
  ExcludeFeaturesAttribute: 0,
});
const i_ExperimentConfig: D.LazyStruct = () => ({
  ExperimentName: 0,
  TrialName: 0,
  TrialComponentDisplayName: 0,
  RunName: 0,
});
const i_FeatureDefinition: D.LazyStruct = () => ({
  FeatureName: 0,
  FeatureType: 0,
  CollectionType: 0,
  CollectionConfig: { VectorConfig: { Dimension: 0 } },
});
const i_FileSource: D.LazyStruct = () => ({
  ContentType: 0,
  ContentDigest: 0,
  S3Uri: 0,
});
const i_HyperParameterTrainingJobDefinition: D.LazyStruct = () => ({
  DefinitionName: 0,
  TuningObjective: i_HyperParameterTuningJobObjective,
  HyperParameterRanges: i_ParameterRanges,
  StaticHyperParameters: 0,
  AlgorithmSpecification: {
    TrainingImage: 0,
    TrainingInputMode: 0,
    AlgorithmName: 0,
    MetricDefinitions: D.list(i_MetricDefinition),
  },
  RoleArn: 0,
  InputDataConfig: D.list(i_Channel),
  VpcConfig: i_VpcConfig,
  OutputDataConfig: i_OutputDataConfig,
  ResourceConfig: i_ResourceConfig,
  HyperParameterTuningResourceConfig: {
    InstanceType: 0,
    InstanceCount: 0,
    VolumeSizeInGB: 0,
    VolumeKmsKeyId: 0,
    AllocationStrategy: 0,
    InstanceConfigs: D.list({
      InstanceType: 0,
      InstanceCount: 0,
      VolumeSizeInGB: 0,
    }),
  },
  StoppingCondition: i_StoppingCondition,
  EnableNetworkIsolation: 0,
  EnableInterContainerTrafficEncryption: 0,
  EnableManagedSpotTraining: 0,
  CheckpointConfig: i_CheckpointConfig,
  RetryStrategy: i_RetryStrategy,
  Environment: 0,
});
const i_HyperParameterTuningJobObjective: D.LazyStruct = () => ({
  Type: 0,
  MetricName: 0,
});
const i_IdcConfigInput: D.LazyStruct = () => ({ InstanceArn: 0 });
const i_InferenceComponentCapacitySize: D.LazyStruct = () => ({
  Type: 0,
  Value: 0,
});
const i_InferenceComponentRuntimeConfig: D.LazyStruct = () => ({
  CopyCount: 0,
});
const i_InferenceComponentSpecification: D.LazyStruct = () => ({
  InstanceType: 0,
  ModelName: 0,
  Container: {
    Image: 0,
    ArtifactUrl: 0,
    Environment: 0,
    ContainerMetricsConfig: i_ContainerMetricsConfig,
  },
  StartupParameters: {
    ModelDataDownloadTimeoutInSeconds: 0,
    ContainerStartupHealthCheckTimeoutInSeconds: 0,
  },
  ComputeResourceRequirements: {
    NumberOfCpuCoresRequired: 0,
    NumberOfAcceleratorDevicesRequired: 0,
    MinMemoryRequiredInMb: 0,
    MaxMemoryRequiredInMb: 0,
  },
  BaseInferenceComponentName: 0,
  DataCacheConfig: { EnableCaching: 0 },
  SchedulingConfig: {
    PlacementStrategy: 0,
    AvailabilityZoneBalance: { EnforcementMode: 0, MaxImbalance: 0 },
  },
});
const i_InferenceExperimentDataStorageConfig: D.LazyStruct = () => ({
  Destination: 0,
  KmsKey: 0,
  ContentType: i_CaptureContentTypeHeader,
});
const i_InferenceExperimentSchedule: D.LazyStruct = () => ({
  StartTime: 0,
  EndTime: 0,
});
const i_InferenceSpecification: D.LazyStruct = () => ({
  Containers: D.list(i_ModelPackageContainerDefinition),
  SupportedTransformInstanceTypes: 0,
  SupportedRealtimeInferenceInstanceTypes: 0,
  SupportedContentTypes: 0,
  SupportedResponseMIMETypes: 0,
});
const i_InstanceMetadataServiceConfiguration: D.LazyStruct = () => ({
  MinimumInstanceMetadataServiceVersion: 0,
});
const i_JupyterLabAppImageConfig: D.LazyStruct = () => ({
  FileSystemConfig: i_FileSystemConfig,
  ContainerConfig: i_ContainerConfig,
});
const i_KernelGatewayImageConfig: D.LazyStruct = () => ({
  KernelSpecs: D.list({ Name: 0, DisplayName: 0 }),
  FileSystemConfig: i_FileSystemConfig,
});
const i_MemberDefinition: D.LazyStruct = () => ({
  CognitoMemberDefinition: { UserPool: 0, UserGroup: 0, ClientId: 0 },
  OidcMemberDefinition: { Groups: 0 },
});
const i_MetadataProperties: D.LazyStruct = () => ({
  CommitId: 0,
  Repository: 0,
  GeneratedBy: 0,
  ProjectId: 0,
});
const i_MetricDefinition: D.LazyStruct = () => ({ Name: 0, Regex: 0 });
const i_MetricsSource: D.LazyStruct = () => ({
  ContentType: 0,
  ContentDigest: 0,
  S3Uri: 0,
});
const i_ModelAccessConfig: D.LazyStruct = () => ({ AcceptEula: 0 });
const i_ModelDataSource: D.LazyStruct = () => ({
  S3DataSource: i_S3ModelDataSource,
});
const i_ModelDeployConfig: D.LazyStruct = () => ({
  AutoGenerateEndpointName: 0,
  EndpointName: 0,
});
const i_ModelLifeCycle: D.LazyStruct = () => ({
  Stage: 0,
  StageStatus: 0,
  StageDescription: 0,
});
const i_ModelPackageModelCard: D.LazyStruct = () => ({
  ModelCardContent: 0,
  ModelCardStatus: 0,
});
const i_ModelVariantConfig: D.LazyStruct = () => ({
  ModelName: 0,
  VariantName: 0,
  InfrastructureConfig: {
    InfrastructureType: 0,
    RealTimeInferenceConfig: { InstanceType: 0, InstanceCount: 0 },
  },
});
const i_MonitoringConstraintsResource: D.LazyStruct = () => ({ S3Uri: 0 });
const i_MonitoringGroundTruthS3Input: D.LazyStruct = () => ({ S3Uri: 0 });
const i_MonitoringNetworkConfig: D.LazyStruct = () => ({
  EnableInterContainerTrafficEncryption: 0,
  EnableNetworkIsolation: 0,
  VpcConfig: i_VpcConfig,
});
const i_MonitoringOutputConfig: D.LazyStruct = () => ({
  MonitoringOutputs: D.list({
    S3Output: { S3Uri: 0, LocalPath: 0, S3UploadMode: 0 },
  }),
  KmsKeyId: 0,
});
const i_MonitoringResources: D.LazyStruct = () => ({
  ClusterConfig: {
    InstanceCount: 0,
    InstanceType: 0,
    VolumeSizeInGB: 0,
    VolumeKmsKeyId: 0,
  },
});
const i_MonitoringScheduleConfig: D.LazyStruct = () => ({
  ScheduleConfig: {
    ScheduleExpression: 0,
    DataAnalysisStartTime: 0,
    DataAnalysisEndTime: 0,
  },
  MonitoringJobDefinition: {
    BaselineConfig: {
      BaseliningJobName: 0,
      ConstraintsResource: i_MonitoringConstraintsResource,
      StatisticsResource: i_MonitoringStatisticsResource,
    },
    MonitoringInputs: D.list({
      EndpointInput: i_EndpointInput,
      BatchTransformInput: i_BatchTransformInput,
    }),
    MonitoringOutputConfig: i_MonitoringOutputConfig,
    MonitoringResources: i_MonitoringResources,
    MonitoringAppSpecification: {
      ImageUri: 0,
      ContainerEntrypoint: 0,
      ContainerArguments: 0,
      RecordPreprocessorSourceUri: 0,
      PostAnalyticsProcessorSourceUri: 0,
    },
    StoppingCondition: i_MonitoringStoppingCondition,
    Environment: 0,
    NetworkConfig: i_NetworkConfig,
    RoleArn: 0,
  },
  MonitoringJobDefinitionName: 0,
  MonitoringType: 0,
});
const i_MonitoringStatisticsResource: D.LazyStruct = () => ({ S3Uri: 0 });
const i_MonitoringStoppingCondition: D.LazyStruct = () => ({
  MaxRuntimeInSeconds: 0,
});
const i_NetworkConfig: D.LazyStruct = () => ({
  EnableInterContainerTrafficEncryption: 0,
  EnableNetworkIsolation: 0,
  VpcConfig: i_VpcConfig,
});
const i_NotebookInstanceLifecycleHook: D.LazyStruct = () => ({ Content: 0 });
const i_NotificationConfiguration: D.LazyStruct = () => ({
  NotificationTopicArn: 0,
});
const i_OidcConfig: D.LazyStruct = () => ({
  ClientId: 0,
  ClientSecret: 0,
  Issuer: 0,
  AuthorizationEndpoint: 0,
  TokenEndpoint: 0,
  UserInfoEndpoint: 0,
  LogoutEndpoint: 0,
  JwksUri: 0,
  Scope: 0,
  AuthenticationRequestExtraParams: 0,
});
const i_OptimizationSageMakerModel: D.LazyStruct = () => ({ ModelName: 0 });
const i_OutputDataConfig: D.LazyStruct = () => ({
  KmsKeyId: 0,
  S3OutputPath: 0,
  CompressionType: 0,
});
const i_ParallelismConfiguration: D.LazyStruct = () => ({
  MaxParallelExecutionSteps: 0,
});
const i_ParameterRanges: D.LazyStruct = () => ({
  IntegerParameterRanges: D.list({
    Name: 0,
    MinValue: 0,
    MaxValue: 0,
    ScalingType: 0,
  }),
  ContinuousParameterRanges: D.list({
    Name: 0,
    MinValue: 0,
    MaxValue: 0,
    ScalingType: 0,
  }),
  CategoricalParameterRanges: D.list({ Name: 0, Values: 0 }),
  AutoParameters: D.list({ Name: 0, ValueHint: 0 }),
});
const i_PartnerAppConfig: D.LazyStruct = () => ({
  AdminUsers: 0,
  Arguments: 0,
  AssignedGroupPatterns: 0,
  RoleGroupAssignments: D.list({ RoleName: 0, GroupPatterns: 0 }),
});
const i_PartnerAppMaintenanceConfig: D.LazyStruct = () => ({
  MaintenanceWindowStart: 0,
});
const i_PipelineDefinitionS3Location: D.LazyStruct = () => ({
  Bucket: 0,
  ObjectKey: 0,
  VersionId: 0,
});
const i_ProductionVariant: D.LazyStruct = () => ({
  VariantName: 0,
  ModelName: 0,
  InitialInstanceCount: 0,
  InstanceType: 0,
  InstancePools: D.list({ InstanceType: 0, ModelNameOverride: 0, Priority: 0 }),
  VariantInstanceProvisionTimeoutInSeconds: 0,
  InitialVariantWeight: 0,
  AcceleratorType: 0,
  CoreDumpConfig: { DestinationS3Uri: 0, KmsKeyId: 0 },
  ServerlessConfig: i_ProductionVariantServerlessConfig,
  VolumeSizeInGB: 0,
  ModelDataDownloadTimeoutInSeconds: 0,
  ContainerStartupHealthCheckTimeoutInSeconds: 0,
  EnableSSMAccess: 0,
  ManagedInstanceScaling: {
    Status: 0,
    MinInstanceCount: 0,
    MaxInstanceCount: 0,
    ScaleInPolicy: { Strategy: 0, MaximumStepSize: 0, CooldownInMinutes: 0 },
  },
  RoutingConfig: {
    RoutingStrategy: 0,
    PrefixAwareRoutingConfig: { PrefixLength: 0, ConcurrencyThreshold: 0 },
  },
  InferenceAmiVersion: 0,
  CapacityReservationConfig: {
    CapacityReservationPreference: 0,
    MlReservationArn: 0,
  },
});
const i_ProductionVariantServerlessConfig: D.LazyStruct = () => ({
  MemorySizeInMB: 0,
  MaxConcurrency: 0,
  ProvisionedConcurrency: 0,
});
const i_ProfilerRuleConfiguration: D.LazyStruct = () => ({
  RuleConfigurationName: 0,
  LocalPath: 0,
  S3OutputPath: 0,
  RuleEvaluatorImage: 0,
  InstanceType: 0,
  VolumeSizeInGB: 0,
  RuleParameters: 0,
});
const i_ProvisioningParameter: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_PublicWorkforceTaskPrice: D.LazyStruct = () => ({
  AmountInUsd: { Dollars: 0, Cents: 0, TenthFractionsOfACent: 0 },
});
const i_ResourceConfig: D.LazyStruct = () => ({
  InstanceType: 0,
  InstanceCount: 0,
  VolumeSizeInGB: 0,
  VolumeKmsKeyId: 0,
  KeepAlivePeriodInSeconds: 0,
  InstanceGroups: D.list({
    InstanceType: 0,
    InstanceCount: 0,
    InstanceGroupName: 0,
  }),
  TrainingPlanArn: 0,
  InstancePlacementConfig: {
    EnableMultipleJobs: 0,
    PlacementSpecifications: D.list({ UltraServerId: 0, InstanceCount: 0 }),
  },
});
const i_ResourceSpec: D.LazyStruct = () => ({
  SageMakerImageArn: 0,
  SageMakerImageVersionArn: 0,
  SageMakerImageVersionAlias: 0,
  InstanceType: 0,
  LifecycleConfigArn: 0,
  TrainingPlanArn: 0,
});
const i_RetryStrategy: D.LazyStruct = () => ({ MaximumRetryAttempts: 0 });
const i_SchedulerConfig: D.LazyStruct = () => ({
  PriorityClasses: D.list({ Name: 0, Weight: 0 }),
  FairShare: 0,
  IdleResourceSharing: 0,
});
const i_SearchExpression: D.LazyStruct = () => ({
  Filters: D.list(i_Filter),
  NestedFilters: D.list({ NestedPropertyName: 0, Filters: D.list(i_Filter) }),
  SubExpressions: D.list(i_SearchExpression),
  Operator: 0,
});
const i_ShadowModeConfig: D.LazyStruct = () => ({
  SourceModelVariantName: 0,
  ShadowModelVariants: D.list({
    ShadowModelVariantName: 0,
    SamplingPercentage: 0,
  }),
});
const i_SourceIpConfig: D.LazyStruct = () => ({ Cidrs: 0 });
const i_SpaceSettings: D.LazyStruct = () => ({
  JupyterServerAppSettings: i_JupyterServerAppSettings,
  KernelGatewayAppSettings: i_KernelGatewayAppSettings,
  CodeEditorAppSettings: {
    DefaultResourceSpec: i_ResourceSpec,
    AppLifecycleManagement: i_SpaceAppLifecycleManagement,
  },
  JupyterLabAppSettings: {
    DefaultResourceSpec: i_ResourceSpec,
    CodeRepositories: D.list(i_CodeRepository),
    AppLifecycleManagement: i_SpaceAppLifecycleManagement,
  },
  AppType: 0,
  SpaceStorageSettings: { EbsStorageSettings: { EbsVolumeSizeInGb: 0 } },
  SpaceManagedResources: 0,
  CustomFileSystems: D.list({
    EFSFileSystem: { FileSystemId: 0 },
    FSxLustreFileSystem: { FileSystemId: 0 },
    S3FileSystem: { S3Uri: 0 },
  }),
  RemoteAccess: 0,
});
const i_StoppingCondition: D.LazyStruct = () => ({
  MaxRuntimeInSeconds: 0,
  MaxWaitTimeInSeconds: 0,
  MaxPendingTimeInSeconds: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TransformInput: D.LazyStruct = () => ({
  DataSource: { S3DataSource: { S3DataType: 0, S3Uri: 0 } },
  ContentType: 0,
  CompressionType: 0,
  SplitType: 0,
});
const i_TransformJobDefinition: D.LazyStruct = () => ({
  MaxConcurrentTransforms: 0,
  MaxPayloadInMB: 0,
  BatchStrategy: 0,
  Environment: 0,
  TransformInput: i_TransformInput,
  TransformOutput: i_TransformOutput,
  TransformResources: i_TransformResources,
});
const i_TransformOutput: D.LazyStruct = () => ({
  S3OutputPath: 0,
  Accept: 0,
  AssembleWith: 0,
  KmsKeyId: 0,
});
const i_TransformResources: D.LazyStruct = () => ({
  InstanceType: 0,
  InstanceCount: 0,
  VolumeKmsKeyId: 0,
  TransformAmiVersion: 0,
});
const i_TrialComponentArtifact: D.LazyStruct = () => ({
  MediaType: 0,
  Value: 0,
});
const i_TrialComponentParameterValue: D.LazyStruct = () => ({
  StringValue: 0,
  NumberValue: 0,
});
const i_TrialComponentStatus: D.LazyStruct = () => ({
  PrimaryStatus: 0,
  Message: 0,
});
const i_TrustedIdentityPropagationSettings: D.LazyStruct = () => ({
  Status: 0,
});
const i_TtlDuration: D.LazyStruct = () => ({ Unit: 0, Value: 0 });
const i_UiTemplate: D.LazyStruct = () => ({ Content: 0 });
const i_UnifiedStudioSettings: D.LazyStruct = () => ({
  StudioWebPortalAccess: 0,
  DomainAccountId: 0,
  DomainRegion: 0,
  DomainId: 0,
  ProjectId: 0,
  EnvironmentId: 0,
  ProjectS3Path: 0,
  SingleSignOnApplicationArn: 0,
});
const i_UserSettings: D.LazyStruct = () => ({
  ExecutionRole: 0,
  SecurityGroups: 0,
  SharingSettings: { NotebookOutputOption: 0, S3OutputPath: 0, S3KmsKeyId: 0 },
  JupyterServerAppSettings: i_JupyterServerAppSettings,
  KernelGatewayAppSettings: i_KernelGatewayAppSettings,
  TensorBoardAppSettings: { DefaultResourceSpec: i_ResourceSpec },
  RStudioServerProAppSettings: { AccessStatus: 0, UserGroup: 0 },
  RSessionAppSettings: {
    DefaultResourceSpec: i_ResourceSpec,
    CustomImages: D.list(i_CustomImage),
  },
  CanvasAppSettings: {
    TimeSeriesForecastingSettings: { Status: 0, AmazonForecastRoleArn: 0 },
    ModelRegisterSettings: { Status: 0, CrossAccountModelRegisterRoleArn: 0 },
    WorkspaceSettings: { S3ArtifactPath: 0, S3KmsKeyId: 0 },
    IdentityProviderOAuthSettings: D.list({
      DataSourceName: 0,
      Status: 0,
      SecretArn: 0,
    }),
    DirectDeploySettings: { Status: 0 },
    KendraSettings: { Status: 0 },
    GenerativeAiSettings: { AmazonBedrockRoleArn: 0 },
    EmrServerlessSettings: { ExecutionRoleArn: 0, Status: 0 },
  },
  CodeEditorAppSettings: {
    DefaultResourceSpec: i_ResourceSpec,
    CustomImages: D.list(i_CustomImage),
    LifecycleConfigArns: 0,
    AppLifecycleManagement: i_AppLifecycleManagement,
    BuiltInLifecycleConfigArn: 0,
  },
  JupyterLabAppSettings: i_JupyterLabAppSettings,
  SpaceStorageSettings: i_DefaultSpaceStorageSettings,
  DefaultLandingUri: 0,
  StudioWebPortal: 0,
  CustomPosixUserConfig: i_CustomPosixUserConfig,
  CustomFileSystemConfigs: D.list(i_CustomFileSystemConfig),
  StudioWebPortalSettings: {
    HiddenMlTools: 0,
    HiddenAppTypes: 0,
    HiddenInstanceTypes: 0,
    HiddenSageMakerImageVersionAliases: D.list({
      SageMakerImageName: 0,
      VersionAliases: 0,
    }),
    ExecutionRoleSessionNameMode: 0,
  },
  AutoMountHomeEFS: 0,
});
const i_VpcConfig: D.LazyStruct = () => ({ SecurityGroupIds: 0, Subnets: 0 });
const i_WorkerAccessConfiguration: D.LazyStruct = () => ({
  S3Presign: { IamPolicyConstraints: { SourceIp: 0, VpcSourceIp: 0 } },
});
const i_WorkforceVpcConfigRequest: D.LazyStruct = () => ({
  VpcId: 0,
  SecurityGroupIds: 0,
  Subnets: 0,
});
const o_AutoMLCandidate: D.LazyStruct = () => ({
  CreationTime: D.ts,
  EndTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_ClusterPatchScheduleDetails: D.LazyStruct = () => ({
  NextPatchDate: D.ts,
});
const o_DebugRuleEvaluationStatus: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
});
const o_HubContentInfo: D.LazyStruct = () => ({
  CreationTime: D.ts,
  OriginalCreationTime: D.ts,
});
const o_HyperParameterTrainingJobSummary: D.LazyStruct = () => ({
  CreationTime: D.ts,
  TrainingStartTime: D.ts,
  TrainingEndTime: D.ts,
});
const o_HyperParameterTuningJobCompletionDetails: D.LazyStruct = () => ({
  ConvergenceDetectedTime: D.ts,
});
const o_InferenceComponentSpecificationSummary: D.LazyStruct = () => ({
  Container: { DeployedImage: o_DeployedImage },
});
const o_InferenceExperimentSchedule: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_JobSecondaryStatusTransition: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_MetricData: D.LazyStruct = () => ({ Timestamp: D.ts });
const o_ModelPackageModelCard: D.LazyStruct = () => ({
  ModelCardContent: D.secret,
});
const o_MonitoringAlertSummary: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_MonitoringExecutionSummary: D.LazyStruct = () => ({
  ScheduledTime: D.ts,
  CreationTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_MonitoringJobDefinitionSummary: D.LazyStruct = () => ({
  CreationTime: D.ts,
});
const o_PendingProductionVariantSummary: D.LazyStruct = () => ({
  DeployedImages: D.list(o_DeployedImage),
  VariantStatus: D.list(o_ProductionVariantStatus),
});
const o_ProductionVariantSummary: D.LazyStruct = () => ({
  DeployedImages: D.list(o_DeployedImage),
  VariantStatus: D.list(o_ProductionVariantStatus),
});
const o_ReservedCapacitySummary: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_SecondaryStatusTransition: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_TrainingJob: D.LazyStruct = () => ({
  CreationTime: D.ts,
  TrainingStartTime: D.ts,
  TrainingEndTime: D.ts,
  LastModifiedTime: D.ts,
  SecondaryStatusTransitions: D.list(o_SecondaryStatusTransition),
  FinalMetricDataList: D.list(o_MetricData),
  DebugRuleEvaluationStatuses: D.list(o_DebugRuleEvaluationStatus),
});
const o_TrainingPlanExtension: D.LazyStruct = () => ({
  ExtendedAt: D.ts,
  StartDate: D.ts,
  EndDate: D.ts,
});
const o_TransformJob: D.LazyStruct = () => ({
  CreationTime: D.ts,
  TransformStartTime: D.ts,
  TransformEndTime: D.ts,
});
const o_TrialComponentMetricSummary: D.LazyStruct = () => ({ TimeStamp: D.ts });
const o_Workforce: D.LazyStruct = () => ({
  LastUpdatedDate: D.ts,
  CreateDate: D.ts,
});
const o_Workteam: D.LazyStruct = () => ({
  CreateDate: D.ts,
  LastUpdatedDate: D.ts,
});
const i_AdditionalModelDataSource: D.LazyStruct = () => ({
  ChannelName: 0,
  S3DataSource: i_S3ModelDataSource,
});
const i_AppLifecycleManagement: D.LazyStruct = () => ({
  IdleSettings: {
    LifecycleManagement: 0,
    IdleTimeoutInMinutes: 0,
    MinIdleTimeoutInMinutes: 0,
    MaxIdleTimeoutInMinutes: 0,
  },
});
const i_CapacitySize: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_CapacitySizeConfig: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_ClusterInstanceStorageConfig: D.LazyStruct = () => ({
  EbsVolumeConfig: { VolumeSizeInGB: 0, VolumeKmsKeyId: 0, RootVolume: 0 },
  FsxLustreConfig: { DnsName: 0, MountName: 0, MountPath: 0 },
  FsxOpenZfsConfig: { DnsName: 0, MountPath: 0 },
});
const i_CodeRepository: D.LazyStruct = () => ({ RepositoryUrl: 0 });
const i_ComputeQuotaResourceConfig: D.LazyStruct = () => ({
  InstanceType: 0,
  Count: 0,
  Accelerators: 0,
  VCpu: 0,
  MemoryInGiB: 0,
  AcceleratorPartition: { Type: 0, Count: 0 },
});
const i_ContainerConfig: D.LazyStruct = () => ({
  ContainerArguments: 0,
  ContainerEntrypoint: 0,
  ContainerEnvironmentVariables: 0,
});
const i_ContainerMetricsConfig: D.LazyStruct = () => ({
  MetricsEndpoints: D.list({
    MetricsEndpointPath: 0,
    MetricPublishFrequencyInSeconds: 0,
  }),
});
const i_CustomFileSystemConfig: D.LazyStruct = () => ({
  EFSFileSystemConfig: { FileSystemId: 0, FileSystemPath: 0 },
  FSxLustreFileSystemConfig: { FileSystemId: 0, FileSystemPath: 0 },
  S3FileSystemConfig: { MountPath: 0, S3Uri: 0 },
});
const i_CustomImage: D.LazyStruct = () => ({
  ImageName: 0,
  ImageVersionNumber: 0,
  AppImageConfigName: 0,
});
const i_CustomPosixUserConfig: D.LazyStruct = () => ({ Uid: 0, Gid: 0 });
const i_DefaultSpaceStorageSettings: D.LazyStruct = () => ({
  DefaultEbsStorageSettings: {
    DefaultEbsVolumeSizeInGb: 0,
    MaximumEbsVolumeSizeInGb: 0,
  },
});
const i_FSxLustreConfig: D.LazyStruct = () => ({
  SizeInGiB: 0,
  PerUnitStorageThroughput: 0,
});
const i_FileSystemConfig: D.LazyStruct = () => ({
  MountPath: 0,
  DefaultUid: 0,
  DefaultGid: 0,
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Operator: 0, Value: 0 });
const i_JupyterLabAppSettings: D.LazyStruct = () => ({
  DefaultResourceSpec: i_ResourceSpec,
  CustomImages: D.list(i_CustomImage),
  LifecycleConfigArns: 0,
  CodeRepositories: D.list(i_CodeRepository),
  AppLifecycleManagement: i_AppLifecycleManagement,
  EmrSettings: { AssumableRoleArns: 0, ExecutionRoleArns: 0 },
  BuiltInLifecycleConfigArn: 0,
});
const i_JupyterServerAppSettings: D.LazyStruct = () => ({
  DefaultResourceSpec: i_ResourceSpec,
  LifecycleConfigArns: 0,
  CodeRepositories: D.list(i_CodeRepository),
});
const i_KernelGatewayAppSettings: D.LazyStruct = () => ({
  DefaultResourceSpec: i_ResourceSpec,
  CustomImages: D.list(i_CustomImage),
  LifecycleConfigArns: 0,
});
const i_ModelPackageContainerDefinition: D.LazyStruct = () => ({
  ContainerHostname: 0,
  Image: 0,
  ImageDigest: 0,
  ModelDataUrl: 0,
  ModelDataSource: i_ModelDataSource,
  ProductId: 0,
  Environment: 0,
  ModelInput: { DataInputConfig: 0 },
  Framework: 0,
  FrameworkVersion: 0,
  NearestModelName: 0,
  AdditionalModelDataSources: D.list(i_AdditionalModelDataSource),
  AdditionalS3DataSource: i_AdditionalS3DataSource,
  ModelDataETag: 0,
  IsCheckpoint: 0,
  BaseModel: { HubContentName: 0, HubContentVersion: 0, RecipeName: 0 },
});
const i_S3ModelDataSource: D.LazyStruct = () => ({
  S3Uri: 0,
  S3DataType: 0,
  CompressionType: 0,
  ModelAccessConfig: i_ModelAccessConfig,
  HubAccessConfig: { HubContentArn: 0 },
  ManifestS3Uri: 0,
  ETag: 0,
  ManifestEtag: 0,
});
const i_ScheduledUpdateConfig: D.LazyStruct = () => ({
  ScheduleExpression: 0,
  DeploymentConfig: i_DeploymentConfiguration,
});
const i_SpaceAppLifecycleManagement: D.LazyStruct = () => ({
  IdleSettings: { IdleTimeoutInMinutes: 0 },
});
const o_DeployedImage: D.LazyStruct = () => ({ ResolutionTime: D.ts });
const o_ProductionVariantStatus: D.LazyStruct = () => ({ StartTime: D.ts });
