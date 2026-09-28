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
  sdkId: "Rekognition",
  target: "RekognitionService",
  version: "2016-06-27",
  sigv4: "rekognition",
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
                `https://rekognition-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rekognition-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rekognition.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rekognition.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class HumanLoopQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "HumanLoopQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly ResourceType?: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatchException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ImageTooLargeException
  extends /*@__PURE__*/ TE.TaggedError("ImageTooLargeException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidImageFormatException
  extends /*@__PURE__*/ TE.TaggedError("InvalidImageFormatException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidManifestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidManifestException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPaginationTokenException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPolicyRevisionIdException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class InvalidS3ObjectException
  extends /*@__PURE__*/ TE.TaggedError("InvalidS3ObjectException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError("MalformedPolicyDocumentException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedThroughputExceededException",
  )<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotReadyException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class SessionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("SessionNotFoundException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export class VideoTooLargeException
  extends /*@__PURE__*/ TE.TaggedError("VideoTooLargeException")<{
    readonly message?: string;
    readonly Code?: string;
    readonly Logref?: string;
  }> {}
export type CollectionId = string;
export type UserId = string;
export type FaceId = string;
export type UserFaceIdList = string[];
export type Percent = number;
export type ClientRequestToken = string;
export interface AssociateFacesRequest {
  CollectionId: string;
  UserId: string;
  FaceIds: string[];
  UserMatchThreshold?: number;
  ClientRequestToken?: string;
}
export interface AssociatedFace {
  FaceId?: string;
}
export type AssociatedFacesList = AssociatedFace[];
export type UnsuccessfulFaceAssociationReason =
  | "FACE_NOT_FOUND"
  | "ASSOCIATED_TO_A_DIFFERENT_USER"
  | "LOW_MATCH_CONFIDENCE"
  | (string & {});
export type UnsuccessfulFaceAssociationReasons =
  UnsuccessfulFaceAssociationReason[];
export interface UnsuccessfulFaceAssociation {
  FaceId?: string;
  UserId?: string;
  Confidence?: number;
  Reasons?: UnsuccessfulFaceAssociationReason[];
}
export type UnsuccessfulFaceAssociationList = UnsuccessfulFaceAssociation[];
export type UserStatus =
  | "ACTIVE"
  | "UPDATING"
  | "CREATING"
  | "CREATED"
  | (string & {});
export interface AssociateFacesResponse {
  AssociatedFaces?: AssociatedFace[];
  UnsuccessfulFaceAssociations?: UnsuccessfulFaceAssociation[];
  UserStatus?: UserStatus;
}
export type ImageBlob = Uint8Array;
export type S3Bucket = string;
export type S3ObjectName = string;
export type S3ObjectVersion = string;
export interface S3Object {
  Bucket?: string;
  Name?: string;
  Version?: string;
}
export interface Image {
  Bytes?: Uint8Array;
  S3Object?: S3Object;
}
export type QualityFilter =
  | "NONE"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export interface CompareFacesRequest {
  SourceImage: Image;
  TargetImage: Image;
  SimilarityThreshold?: number;
  QualityFilter?: QualityFilter;
}
export interface BoundingBox {
  Width?: number;
  Height?: number;
  Left?: number;
  Top?: number;
}
export interface ComparedSourceImageFace {
  BoundingBox?: BoundingBox;
  Confidence?: number;
}
export type LandmarkType =
  | "eyeLeft"
  | "eyeRight"
  | "nose"
  | "mouthLeft"
  | "mouthRight"
  | "leftEyeBrowLeft"
  | "leftEyeBrowRight"
  | "leftEyeBrowUp"
  | "rightEyeBrowLeft"
  | "rightEyeBrowRight"
  | "rightEyeBrowUp"
  | "leftEyeLeft"
  | "leftEyeRight"
  | "leftEyeUp"
  | "leftEyeDown"
  | "rightEyeLeft"
  | "rightEyeRight"
  | "rightEyeUp"
  | "rightEyeDown"
  | "noseLeft"
  | "noseRight"
  | "mouthUp"
  | "mouthDown"
  | "leftPupil"
  | "rightPupil"
  | "upperJawlineLeft"
  | "midJawlineLeft"
  | "chinBottom"
  | "midJawlineRight"
  | "upperJawlineRight"
  | (string & {});
export interface Landmark {
  Type?: LandmarkType;
  X?: number;
  Y?: number;
}
export type Landmarks = Landmark[];
export type Degree = number;
export interface Pose {
  Roll?: number;
  Yaw?: number;
  Pitch?: number;
}
export interface ImageQuality {
  Brightness?: number;
  Sharpness?: number;
}
export type EmotionName =
  | "HAPPY"
  | "SAD"
  | "ANGRY"
  | "CONFUSED"
  | "DISGUSTED"
  | "SURPRISED"
  | "CALM"
  | "UNKNOWN"
  | "FEAR"
  | (string & {});
export interface Emotion {
  Type?: EmotionName;
  Confidence?: number;
}
export type Emotions = Emotion[];
export interface Smile {
  Value?: boolean;
  Confidence?: number;
}
export interface ComparedFace {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Landmarks?: Landmark[];
  Pose?: Pose;
  Quality?: ImageQuality;
  Emotions?: Emotion[];
  Smile?: Smile;
}
export interface CompareFacesMatch {
  Similarity?: number;
  Face?: ComparedFace;
}
export type CompareFacesMatchList = CompareFacesMatch[];
export type CompareFacesUnmatchList = ComparedFace[];
export type OrientationCorrection =
  | "ROTATE_0"
  | "ROTATE_90"
  | "ROTATE_180"
  | "ROTATE_270"
  | (string & {});
export interface CompareFacesResponse {
  SourceImageFace?: ComparedSourceImageFace;
  FaceMatches?: CompareFacesMatch[];
  UnmatchedFaces?: ComparedFace[];
  SourceImageOrientationCorrection?: OrientationCorrection;
  TargetImageOrientationCorrection?: OrientationCorrection;
}
export type ProjectArn = string;
export type ProjectVersionArn = string;
export type VersionName = string;
export type S3KeyPrefix = string;
export interface OutputConfig {
  S3Bucket?: string;
  S3KeyPrefix?: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type KmsKeyId = string;
export interface CopyProjectVersionRequest {
  SourceProjectArn: string;
  SourceProjectVersionArn: string;
  DestinationProjectArn: string;
  VersionName: string;
  OutputConfig: OutputConfig;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
}
export interface CopyProjectVersionResponse {
  ProjectVersionArn?: string;
}
export interface CreateCollectionRequest {
  CollectionId: string;
  Tags?: { [key: string]: string | undefined };
}
export type UInteger = number;
export interface CreateCollectionResponse {
  StatusCode?: number;
  CollectionArn?: string;
  FaceModelVersion?: string;
}
export interface GroundTruthManifest {
  S3Object?: S3Object;
}
export type DatasetArn = string;
export interface DatasetSource {
  GroundTruthManifest?: GroundTruthManifest;
  DatasetArn?: string;
}
export type DatasetType = "TRAIN" | "TEST" | (string & {});
export interface CreateDatasetRequest {
  DatasetSource?: DatasetSource;
  DatasetType: DatasetType;
  ProjectArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export type LivenessS3KeyPrefix = string;
export interface LivenessOutputConfig {
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export type AuditImagesLimit = number;
export type ChallengeType =
  | "FaceMovementAndLightChallenge"
  | "FaceMovementChallenge"
  | (string & {});
export type Version = string;
export interface Versions {
  Minimum?: string;
  Maximum?: string;
}
export interface ChallengePreference {
  Type: ChallengeType;
  Versions?: Versions;
}
export type ChallengePreferences = ChallengePreference[];
export interface CreateFaceLivenessSessionRequestSettings {
  OutputConfig?: LivenessOutputConfig;
  AuditImagesLimit?: number;
  ChallengePreferences?: ChallengePreference[];
}
export interface CreateFaceLivenessSessionRequest {
  KmsKeyId?: string;
  Settings?: CreateFaceLivenessSessionRequestSettings;
  ClientRequestToken?: string;
}
export type LivenessSessionId = string;
export interface CreateFaceLivenessSessionResponse {
  SessionId: string;
}
export type ProjectName = string;
export type CustomizationFeature =
  | "CONTENT_MODERATION"
  | "CUSTOM_LABELS"
  | (string & {});
export type ProjectAutoUpdate = "ENABLED" | "DISABLED" | (string & {});
export interface CreateProjectRequest {
  ProjectName: string;
  Feature?: CustomizationFeature;
  AutoUpdate?: ProjectAutoUpdate;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateProjectResponse {
  ProjectArn?: string;
}
export interface Asset {
  GroundTruthManifest?: GroundTruthManifest;
}
export type Assets = Asset[];
export interface TrainingData {
  Assets?: Asset[];
}
export interface TestingData {
  Assets?: Asset[];
  AutoCreate?: boolean;
}
export type VersionDescription = string;
export interface CustomizationFeatureContentModerationConfig {
  ConfidenceThreshold?: number;
}
export interface CustomizationFeatureConfig {
  ContentModeration?: CustomizationFeatureContentModerationConfig;
}
export interface CreateProjectVersionRequest {
  ProjectArn: string;
  VersionName: string;
  OutputConfig: OutputConfig;
  TrainingData?: TrainingData;
  TestingData?: TestingData;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
  VersionDescription?: string;
  FeatureConfig?: CustomizationFeatureConfig;
}
export interface CreateProjectVersionResponse {
  ProjectVersionArn?: string;
}
export type KinesisVideoArn = string;
export interface KinesisVideoStream {
  Arn?: string;
}
export interface StreamProcessorInput {
  KinesisVideoStream?: KinesisVideoStream;
}
export type KinesisDataArn = string;
export interface KinesisDataStream {
  Arn?: string;
}
export interface S3Destination {
  Bucket?: string;
  KeyPrefix?: string;
}
export interface StreamProcessorOutput {
  KinesisDataStream?: KinesisDataStream;
  S3Destination?: S3Destination;
}
export type StreamProcessorName = string;
export interface FaceSearchSettings {
  CollectionId?: string;
  FaceMatchThreshold?: number;
}
export type ConnectedHomeLabel = string;
export type ConnectedHomeLabels = string[];
export interface ConnectedHomeSettings {
  Labels: string[];
  MinConfidence?: number;
}
export interface StreamProcessorSettings {
  FaceSearch?: FaceSearchSettings;
  ConnectedHome?: ConnectedHomeSettings;
}
export type RoleArn = string;
export type SNSTopicArn = string;
export interface StreamProcessorNotificationChannel {
  SNSTopicArn: string;
}
export interface Point {
  X?: number;
  Y?: number;
}
export type Polygon = Point[];
export interface RegionOfInterest {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export type RegionsOfInterest = RegionOfInterest[];
export interface StreamProcessorDataSharingPreference {
  OptIn: boolean;
}
export interface CreateStreamProcessorRequest {
  Input: StreamProcessorInput;
  Output: StreamProcessorOutput;
  Name: string;
  Settings: StreamProcessorSettings;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  NotificationChannel?: StreamProcessorNotificationChannel;
  KmsKeyId?: string;
  RegionsOfInterest?: RegionOfInterest[];
  DataSharingPreference?: StreamProcessorDataSharingPreference;
}
export type StreamProcessorArn = string;
export interface CreateStreamProcessorResponse {
  StreamProcessorArn?: string;
}
export interface CreateUserRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
}
export interface CreateUserResponse {}
export interface DeleteCollectionRequest {
  CollectionId: string;
}
export interface DeleteCollectionResponse {
  StatusCode?: number;
}
export interface DeleteDatasetRequest {
  DatasetArn: string;
}
export interface DeleteDatasetResponse {}
export type FaceIdList = string[];
export interface DeleteFacesRequest {
  CollectionId: string;
  FaceIds: string[];
}
export type UnsuccessfulFaceDeletionReason =
  | "ASSOCIATED_TO_AN_EXISTING_USER"
  | "FACE_NOT_FOUND"
  | (string & {});
export type UnsuccessfulFaceDeletionReasons = UnsuccessfulFaceDeletionReason[];
export interface UnsuccessfulFaceDeletion {
  FaceId?: string;
  UserId?: string;
  Reasons?: UnsuccessfulFaceDeletionReason[];
}
export type UnsuccessfulFaceDeletionsList = UnsuccessfulFaceDeletion[];
export interface DeleteFacesResponse {
  DeletedFaces?: string[];
  UnsuccessfulFaceDeletions?: UnsuccessfulFaceDeletion[];
}
export interface DeleteProjectRequest {
  ProjectArn: string;
}
export type ProjectStatus = "CREATING" | "CREATED" | "DELETING" | (string & {});
export interface DeleteProjectResponse {
  Status?: ProjectStatus;
}
export type ProjectPolicyName = string;
export type ProjectPolicyRevisionId = string;
export interface DeleteProjectPolicyRequest {
  ProjectArn: string;
  PolicyName: string;
  PolicyRevisionId?: string;
}
export interface DeleteProjectPolicyResponse {}
export interface DeleteProjectVersionRequest {
  ProjectVersionArn: string;
}
export type ProjectVersionStatus =
  | "TRAINING_IN_PROGRESS"
  | "TRAINING_COMPLETED"
  | "TRAINING_FAILED"
  | "STARTING"
  | "RUNNING"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "DELETING"
  | "COPYING_IN_PROGRESS"
  | "COPYING_COMPLETED"
  | "COPYING_FAILED"
  | "DEPRECATED"
  | "EXPIRED"
  | (string & {});
export interface DeleteProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export interface DeleteStreamProcessorRequest {
  Name: string;
}
export interface DeleteStreamProcessorResponse {}
export interface DeleteUserRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
}
export interface DeleteUserResponse {}
export interface DescribeCollectionRequest {
  CollectionId: string;
}
export type ULong = number;
export interface DescribeCollectionResponse {
  FaceCount?: number;
  FaceModelVersion?: string;
  CollectionARN?: string;
  CreationTimestamp?: Date;
  UserCount?: number;
}
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export type DatasetStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export type StatusMessage = string;
export type DatasetStatusMessageCode =
  | "SUCCESS"
  | "SERVICE_ERROR"
  | "CLIENT_ERROR"
  | (string & {});
export interface DatasetStats {
  LabeledEntries?: number;
  TotalEntries?: number;
  TotalLabels?: number;
  ErrorEntries?: number;
}
export interface DatasetDescription {
  CreationTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Status?: DatasetStatus;
  StatusMessage?: string;
  StatusMessageCode?: DatasetStatusMessageCode;
  DatasetStats?: DatasetStats;
}
export interface DescribeDatasetResponse {
  DatasetDescription?: DatasetDescription;
}
export type ExtendedPaginationToken = string;
export type ProjectsPageSize = number;
export type ProjectNames = string[];
export type CustomizationFeatures = CustomizationFeature[];
export interface DescribeProjectsRequest {
  NextToken?: string;
  MaxResults?: number;
  ProjectNames?: string[];
  Features?: CustomizationFeature[];
}
export interface DatasetMetadata {
  CreationTimestamp?: Date;
  DatasetType?: DatasetType;
  DatasetArn?: string;
  Status?: DatasetStatus;
  StatusMessage?: string;
  StatusMessageCode?: DatasetStatusMessageCode;
}
export type DatasetMetadataList = DatasetMetadata[];
export interface ProjectDescription {
  ProjectArn?: string;
  CreationTimestamp?: Date;
  Status?: ProjectStatus;
  Datasets?: DatasetMetadata[];
  Feature?: CustomizationFeature;
  AutoUpdate?: ProjectAutoUpdate;
}
export type ProjectDescriptions = ProjectDescription[];
export interface DescribeProjectsResponse {
  ProjectDescriptions?: ProjectDescription[];
  NextToken?: string;
}
export type VersionNames = string[];
export type ProjectVersionsPageSize = number;
export interface DescribeProjectVersionsRequest {
  ProjectArn: string;
  VersionNames?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type InferenceUnits = number;
export interface ValidationData {
  Assets?: Asset[];
}
export interface TrainingDataResult {
  Input?: TrainingData;
  Output?: TrainingData;
  Validation?: ValidationData;
}
export interface TestingDataResult {
  Input?: TestingData;
  Output?: TestingData;
  Validation?: ValidationData;
}
export interface Summary {
  S3Object?: S3Object;
}
export interface EvaluationResult {
  F1Score?: number;
  Summary?: Summary;
}
export interface ProjectVersionDescription {
  ProjectVersionArn?: string;
  CreationTimestamp?: Date;
  MinInferenceUnits?: number;
  Status?: ProjectVersionStatus;
  StatusMessage?: string;
  BillableTrainingTimeInSeconds?: number;
  TrainingEndTimestamp?: Date;
  OutputConfig?: OutputConfig;
  TrainingDataResult?: TrainingDataResult;
  TestingDataResult?: TestingDataResult;
  EvaluationResult?: EvaluationResult;
  ManifestSummary?: GroundTruthManifest;
  KmsKeyId?: string;
  MaxInferenceUnits?: number;
  SourceProjectVersionArn?: string;
  VersionDescription?: string;
  Feature?: CustomizationFeature;
  BaseModelVersion?: string;
  FeatureConfig?: CustomizationFeatureConfig;
}
export type ProjectVersionDescriptions = ProjectVersionDescription[];
export interface DescribeProjectVersionsResponse {
  ProjectVersionDescriptions?: ProjectVersionDescription[];
  NextToken?: string;
}
export interface DescribeStreamProcessorRequest {
  Name: string;
}
export type StreamProcessorStatus =
  | "STOPPED"
  | "STARTING"
  | "RUNNING"
  | "FAILED"
  | "STOPPING"
  | "UPDATING"
  | (string & {});
export interface DescribeStreamProcessorResponse {
  Name?: string;
  StreamProcessorArn?: string;
  Status?: StreamProcessorStatus;
  StatusMessage?: string;
  CreationTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  Input?: StreamProcessorInput;
  Output?: StreamProcessorOutput;
  RoleArn?: string;
  Settings?: StreamProcessorSettings;
  NotificationChannel?: StreamProcessorNotificationChannel;
  KmsKeyId?: string;
  RegionsOfInterest?: RegionOfInterest[];
  DataSharingPreference?: StreamProcessorDataSharingPreference;
}
export interface DetectCustomLabelsRequest {
  ProjectVersionArn: string;
  Image: Image;
  MaxResults?: number;
  MinConfidence?: number;
}
export interface Geometry {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export interface CustomLabel {
  Name?: string;
  Confidence?: number;
  Geometry?: Geometry;
}
export type CustomLabels = CustomLabel[];
export interface DetectCustomLabelsResponse {
  CustomLabels?: CustomLabel[];
}
export type Attribute =
  | "DEFAULT"
  | "ALL"
  | "AGE_RANGE"
  | "BEARD"
  | "EMOTIONS"
  | "EYE_DIRECTION"
  | "EYEGLASSES"
  | "EYES_OPEN"
  | "GENDER"
  | "MOUTH_OPEN"
  | "MUSTACHE"
  | "FACE_OCCLUDED"
  | "SMILE"
  | "SUNGLASSES"
  | (string & {});
export type Attributes = Attribute[];
export interface DetectFacesRequest {
  Image: Image;
  Attributes?: Attribute[];
}
export interface AgeRange {
  Low?: number;
  High?: number;
}
export interface Eyeglasses {
  Value?: boolean;
  Confidence?: number;
}
export interface Sunglasses {
  Value?: boolean;
  Confidence?: number;
}
export type GenderType = "Male" | "Female" | (string & {});
export interface Gender {
  Value?: GenderType;
  Confidence?: number;
}
export interface Beard {
  Value?: boolean;
  Confidence?: number;
}
export interface Mustache {
  Value?: boolean;
  Confidence?: number;
}
export interface EyeOpen {
  Value?: boolean;
  Confidence?: number;
}
export interface MouthOpen {
  Value?: boolean;
  Confidence?: number;
}
export interface FaceOccluded {
  Value?: boolean;
  Confidence?: number;
}
export interface EyeDirection {
  Yaw?: number;
  Pitch?: number;
  Confidence?: number;
}
export interface FaceDetail {
  BoundingBox?: BoundingBox;
  AgeRange?: AgeRange;
  Smile?: Smile;
  Eyeglasses?: Eyeglasses;
  Sunglasses?: Sunglasses;
  Gender?: Gender;
  Beard?: Beard;
  Mustache?: Mustache;
  EyesOpen?: EyeOpen;
  MouthOpen?: MouthOpen;
  Emotions?: Emotion[];
  Landmarks?: Landmark[];
  Pose?: Pose;
  Quality?: ImageQuality;
  Confidence?: number;
  FaceOccluded?: FaceOccluded;
  EyeDirection?: EyeDirection;
}
export type FaceDetailList = FaceDetail[];
export interface DetectFacesResponse {
  FaceDetails?: FaceDetail[];
  OrientationCorrection?: OrientationCorrection;
}
export type DetectLabelsFeatureName =
  | "GENERAL_LABELS"
  | "IMAGE_PROPERTIES"
  | (string & {});
export type DetectLabelsFeatureList = DetectLabelsFeatureName[];
export type GeneralLabelsFilterValue = string;
export type GeneralLabelsFilterList = string[];
export interface GeneralLabelsSettings {
  LabelInclusionFilters?: string[];
  LabelExclusionFilters?: string[];
  LabelCategoryInclusionFilters?: string[];
  LabelCategoryExclusionFilters?: string[];
}
export type DetectLabelsMaxDominantColors = number;
export interface DetectLabelsImagePropertiesSettings {
  MaxDominantColors?: number;
}
export interface DetectLabelsSettings {
  GeneralLabels?: GeneralLabelsSettings;
  ImageProperties?: DetectLabelsImagePropertiesSettings;
}
export interface DetectLabelsRequest {
  Image: Image;
  MaxLabels?: number;
  MinConfidence?: number;
  Features?: DetectLabelsFeatureName[];
  Settings?: DetectLabelsSettings;
}
export interface DominantColor {
  Red?: number;
  Blue?: number;
  Green?: number;
  HexCode?: string;
  CSSColor?: string;
  SimplifiedColor?: string;
  PixelPercent?: number;
}
export type DominantColors = DominantColor[];
export interface Instance {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  DominantColors?: DominantColor[];
}
export type Instances = Instance[];
export interface Parent {
  Name?: string;
}
export type Parents = Parent[];
export interface LabelAlias {
  Name?: string;
}
export type LabelAliases = LabelAlias[];
export interface LabelCategory {
  Name?: string;
}
export type LabelCategories = LabelCategory[];
export interface Label {
  Name?: string;
  Confidence?: number;
  Instances?: Instance[];
  Parents?: Parent[];
  Aliases?: LabelAlias[];
  Categories?: LabelCategory[];
}
export type Labels = Label[];
export interface DetectLabelsImageQuality {
  Brightness?: number;
  Sharpness?: number;
  Contrast?: number;
}
export interface DetectLabelsImageForeground {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
}
export interface DetectLabelsImageBackground {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
}
export interface DetectLabelsImageProperties {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
  Foreground?: DetectLabelsImageForeground;
  Background?: DetectLabelsImageBackground;
}
export interface DetectLabelsResponse {
  Labels?: Label[];
  OrientationCorrection?: OrientationCorrection;
  LabelModelVersion?: string;
  ImageProperties?: DetectLabelsImageProperties;
}
export type HumanLoopName = string;
export type FlowDefinitionArn = string;
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export type ContentClassifiers = ContentClassifier[];
export interface HumanLoopDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export interface HumanLoopConfig {
  HumanLoopName: string;
  FlowDefinitionArn: string;
  DataAttributes?: HumanLoopDataAttributes;
}
export type ProjectVersionId = string;
export interface DetectModerationLabelsRequest {
  Image: Image;
  MinConfidence?: number;
  HumanLoopConfig?: HumanLoopConfig;
  ProjectVersion?: string;
}
export interface ModerationLabel {
  Confidence?: number;
  Name?: string;
  ParentName?: string;
  TaxonomyLevel?: number;
}
export type ModerationLabels = ModerationLabel[];
export type HumanLoopArn = string;
export type HumanLoopActivationReason = string;
export type HumanLoopActivationReasons = string[];
export type SynthesizedJsonHumanLoopActivationConditionsEvaluationResults =
  string;
export interface HumanLoopActivationOutput {
  HumanLoopArn?: string;
  HumanLoopActivationReasons?: string[];
  HumanLoopActivationConditionsEvaluationResults?: string;
}
export interface ContentType {
  Confidence?: number;
  Name?: string;
}
export type ContentTypes = ContentType[];
export interface DetectModerationLabelsResponse {
  ModerationLabels?: ModerationLabel[];
  ModerationModelVersion?: string;
  HumanLoopActivationOutput?: HumanLoopActivationOutput;
  ProjectVersion?: string;
  ContentTypes?: ContentType[];
}
export type ProtectiveEquipmentType =
  | "FACE_COVER"
  | "HAND_COVER"
  | "HEAD_COVER"
  | (string & {});
export type ProtectiveEquipmentTypes = ProtectiveEquipmentType[];
export interface ProtectiveEquipmentSummarizationAttributes {
  MinConfidence: number;
  RequiredEquipmentTypes: ProtectiveEquipmentType[];
}
export interface DetectProtectiveEquipmentRequest {
  Image: Image;
  SummarizationAttributes?: ProtectiveEquipmentSummarizationAttributes;
}
export type BodyPart =
  | "FACE"
  | "HEAD"
  | "LEFT_HAND"
  | "RIGHT_HAND"
  | (string & {});
export interface CoversBodyPart {
  Confidence?: number;
  Value?: boolean;
}
export interface EquipmentDetection {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Type?: ProtectiveEquipmentType;
  CoversBodyPart?: CoversBodyPart;
}
export type EquipmentDetections = EquipmentDetection[];
export interface ProtectiveEquipmentBodyPart {
  Name?: BodyPart;
  Confidence?: number;
  EquipmentDetections?: EquipmentDetection[];
}
export type BodyParts = ProtectiveEquipmentBodyPart[];
export interface ProtectiveEquipmentPerson {
  BodyParts?: ProtectiveEquipmentBodyPart[];
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Id?: number;
}
export type ProtectiveEquipmentPersons = ProtectiveEquipmentPerson[];
export type ProtectiveEquipmentPersonIds = number[];
export interface ProtectiveEquipmentSummary {
  PersonsWithRequiredEquipment?: number[];
  PersonsWithoutRequiredEquipment?: number[];
  PersonsIndeterminate?: number[];
}
export interface DetectProtectiveEquipmentResponse {
  ProtectiveEquipmentModelVersion?: string;
  Persons?: ProtectiveEquipmentPerson[];
  Summary?: ProtectiveEquipmentSummary;
}
export type BoundingBoxHeight = number;
export type BoundingBoxWidth = number;
export interface DetectionFilter {
  MinConfidence?: number;
  MinBoundingBoxHeight?: number;
  MinBoundingBoxWidth?: number;
}
export interface DetectTextFilters {
  WordFilter?: DetectionFilter;
  RegionsOfInterest?: RegionOfInterest[];
}
export interface DetectTextRequest {
  Image: Image;
  Filters?: DetectTextFilters;
}
export type TextTypes = "LINE" | "WORD" | (string & {});
export interface TextDetection {
  DetectedText?: string;
  Type?: TextTypes;
  Id?: number;
  ParentId?: number;
  Confidence?: number;
  Geometry?: Geometry;
}
export type TextDetectionList = TextDetection[];
export interface DetectTextResponse {
  TextDetections?: TextDetection[];
  TextModelVersion?: string;
}
export interface DisassociateFacesRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
  FaceIds: string[];
}
export interface DisassociatedFace {
  FaceId?: string;
}
export type DisassociatedFacesList = DisassociatedFace[];
export type UnsuccessfulFaceDisassociationReason =
  | "FACE_NOT_FOUND"
  | "ASSOCIATED_TO_A_DIFFERENT_USER"
  | (string & {});
export type UnsuccessfulFaceDisassociationReasons =
  UnsuccessfulFaceDisassociationReason[];
export interface UnsuccessfulFaceDisassociation {
  FaceId?: string;
  UserId?: string;
  Reasons?: UnsuccessfulFaceDisassociationReason[];
}
export type UnsuccessfulFaceDisassociationList =
  UnsuccessfulFaceDisassociation[];
export interface DisassociateFacesResponse {
  DisassociatedFaces?: DisassociatedFace[];
  UnsuccessfulFaceDisassociations?: UnsuccessfulFaceDisassociation[];
  UserStatus?: UserStatus;
}
export interface DistributeDataset {
  Arn: string;
}
export type DistributeDatasetMetadataList = DistributeDataset[];
export interface DistributeDatasetEntriesRequest {
  Datasets: DistributeDataset[];
}
export interface DistributeDatasetEntriesResponse {}
export type RekognitionUniqueId = string;
export interface GetCelebrityInfoRequest {
  Id: string;
}
export type Url = string;
export type Urls = string[];
export type KnownGenderType =
  | "Male"
  | "Female"
  | "Nonbinary"
  | "Unlisted"
  | (string & {});
export interface KnownGender {
  Type?: KnownGenderType;
}
export interface GetCelebrityInfoResponse {
  Urls?: string[];
  Name?: string;
  KnownGender?: KnownGender;
}
export type JobId = string;
export type MaxResults = number;
export type PaginationToken = string;
export type CelebrityRecognitionSortBy = "ID" | "TIMESTAMP" | (string & {});
export interface GetCelebrityRecognitionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: CelebrityRecognitionSortBy;
}
export type VideoJobStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type VideoColorRange = "FULL" | "LIMITED" | (string & {});
export interface VideoMetadata {
  Codec?: string;
  DurationMillis?: number;
  Format?: string;
  FrameRate?: number;
  FrameHeight?: number;
  FrameWidth?: number;
  ColorRange?: VideoColorRange;
}
export interface CelebrityDetail {
  Urls?: string[];
  Name?: string;
  Id?: string;
  Confidence?: number;
  BoundingBox?: BoundingBox;
  Face?: FaceDetail;
  KnownGender?: KnownGender;
}
export interface CelebrityRecognition {
  Timestamp?: number;
  Celebrity?: CelebrityDetail;
}
export type CelebrityRecognitions = CelebrityRecognition[];
export interface Video {
  S3Object?: S3Object;
}
export type JobTag = string;
export interface GetCelebrityRecognitionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Celebrities?: CelebrityRecognition[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export type ContentModerationSortBy = "NAME" | "TIMESTAMP" | (string & {});
export type ContentModerationAggregateBy =
  | "TIMESTAMPS"
  | "SEGMENTS"
  | (string & {});
export interface GetContentModerationRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: ContentModerationSortBy;
  AggregateBy?: ContentModerationAggregateBy;
}
export interface ContentModerationDetection {
  Timestamp?: number;
  ModerationLabel?: ModerationLabel;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
  ContentTypes?: ContentType[];
}
export type ContentModerationDetections = ContentModerationDetection[];
export interface GetContentModerationRequestMetadata {
  SortBy?: ContentModerationSortBy;
  AggregateBy?: ContentModerationAggregateBy;
}
export interface GetContentModerationResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  ModerationLabels?: ContentModerationDetection[];
  NextToken?: string;
  ModerationModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
  GetRequestMetadata?: GetContentModerationRequestMetadata;
}
export interface GetFaceDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface FaceDetection {
  Timestamp?: number;
  Face?: FaceDetail;
}
export type FaceDetections = FaceDetection[];
export interface GetFaceDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Faces?: FaceDetection[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export interface GetFaceLivenessSessionResultsRequest {
  SessionId: string;
}
export type LivenessSessionStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "EXPIRED"
  | (string & {});
export type LivenessImageBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface AuditImage {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Object?: S3Object;
  BoundingBox?: BoundingBox;
}
export type AuditImages = AuditImage[];
export interface Challenge {
  Type: ChallengeType;
  Version: string;
}
export interface GetFaceLivenessSessionResultsResponse {
  SessionId: string;
  Status: LivenessSessionStatus;
  Confidence?: number;
  ReferenceImage?: AuditImage;
  AuditImages?: AuditImage[];
  Challenge?: Challenge;
}
export type FaceSearchSortBy = "INDEX" | "TIMESTAMP" | (string & {});
export interface GetFaceSearchRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: FaceSearchSortBy;
}
export type PersonIndex = number;
export interface PersonDetail {
  Index?: number;
  BoundingBox?: BoundingBox;
  Face?: FaceDetail;
}
export type ImageId = string;
export type ExternalImageId = string;
export type IndexFacesModelVersion = string;
export interface Face {
  FaceId?: string;
  BoundingBox?: BoundingBox;
  ImageId?: string;
  ExternalImageId?: string;
  Confidence?: number;
  IndexFacesModelVersion?: string;
  UserId?: string;
}
export interface FaceMatch {
  Similarity?: number;
  Face?: Face;
}
export type FaceMatchList = FaceMatch[];
export interface PersonMatch {
  Timestamp?: number;
  Person?: PersonDetail;
  FaceMatches?: FaceMatch[];
}
export type PersonMatches = PersonMatch[];
export interface GetFaceSearchResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  NextToken?: string;
  VideoMetadata?: VideoMetadata;
  Persons?: PersonMatch[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export type LabelDetectionSortBy = "NAME" | "TIMESTAMP" | (string & {});
export type LabelDetectionAggregateBy =
  | "TIMESTAMPS"
  | "SEGMENTS"
  | (string & {});
export interface GetLabelDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: LabelDetectionSortBy;
  AggregateBy?: LabelDetectionAggregateBy;
}
export interface LabelDetection {
  Timestamp?: number;
  Label?: Label;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
}
export type LabelDetections = LabelDetection[];
export interface GetLabelDetectionRequestMetadata {
  SortBy?: LabelDetectionSortBy;
  AggregateBy?: LabelDetectionAggregateBy;
}
export interface GetLabelDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Labels?: LabelDetection[];
  LabelModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
  GetRequestMetadata?: GetLabelDetectionRequestMetadata;
}
export type MediaAnalysisJobId = string;
export interface GetMediaAnalysisJobRequest {
  JobId: string;
}
export type MediaAnalysisJobName = string;
export interface MediaAnalysisDetectModerationLabelsConfig {
  MinConfidence?: number;
  ProjectVersion?: string;
}
export interface MediaAnalysisOperationsConfig {
  DetectModerationLabels?: MediaAnalysisDetectModerationLabelsConfig;
}
export type MediaAnalysisJobStatus =
  | "CREATED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type MediaAnalysisJobFailureCode =
  | "INTERNAL_ERROR"
  | "INVALID_S3_OBJECT"
  | "INVALID_MANIFEST"
  | "INVALID_OUTPUT_CONFIG"
  | "INVALID_KMS_KEY"
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "RESOURCE_NOT_READY"
  | "THROTTLED"
  | (string & {});
export interface MediaAnalysisJobFailureDetails {
  Code?: MediaAnalysisJobFailureCode;
  Message?: string;
}
export interface MediaAnalysisInput {
  S3Object: S3Object;
}
export type MediaAnalysisS3KeyPrefix = string;
export interface MediaAnalysisOutputConfig {
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export interface MediaAnalysisModelVersions {
  Moderation?: string;
}
export interface MediaAnalysisResults {
  S3Object?: S3Object;
  ModelVersions?: MediaAnalysisModelVersions;
}
export interface MediaAnalysisManifestSummary {
  S3Object?: S3Object;
}
export interface GetMediaAnalysisJobResponse {
  JobId: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Status: MediaAnalysisJobStatus;
  FailureDetails?: MediaAnalysisJobFailureDetails;
  CreationTimestamp: Date;
  CompletionTimestamp?: Date;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
  Results?: MediaAnalysisResults;
  ManifestSummary?: MediaAnalysisManifestSummary;
}
export type PersonTrackingSortBy = "INDEX" | "TIMESTAMP" | (string & {});
export interface GetPersonTrackingRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: PersonTrackingSortBy;
}
export interface PersonDetection {
  Timestamp?: number;
  Person?: PersonDetail;
}
export type PersonDetections = PersonDetection[];
export interface GetPersonTrackingResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Persons?: PersonDetection[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export interface GetSegmentDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type VideoMetadataList = VideoMetadata[];
export interface AudioMetadata {
  Codec?: string;
  DurationMillis?: number;
  SampleRate?: number;
  NumberOfChannels?: number;
}
export type AudioMetadataList = AudioMetadata[];
export type SegmentType = "TECHNICAL_CUE" | "SHOT" | (string & {});
export type Timecode = string;
export type TechnicalCueType =
  | "ColorBars"
  | "EndCredits"
  | "BlackFrames"
  | "OpeningCredits"
  | "StudioLogo"
  | "Slate"
  | "Content"
  | (string & {});
export type SegmentConfidence = number;
export interface TechnicalCueSegment {
  Type?: TechnicalCueType;
  Confidence?: number;
}
export interface ShotSegment {
  Index?: number;
  Confidence?: number;
}
export interface SegmentDetection {
  Type?: SegmentType;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
  StartTimecodeSMPTE?: string;
  EndTimecodeSMPTE?: string;
  DurationSMPTE?: string;
  TechnicalCueSegment?: TechnicalCueSegment;
  ShotSegment?: ShotSegment;
  StartFrameNumber?: number;
  EndFrameNumber?: number;
  DurationFrames?: number;
}
export type SegmentDetections = SegmentDetection[];
export interface SegmentTypeInfo {
  Type?: SegmentType;
  ModelVersion?: string;
}
export type SegmentTypesInfo = SegmentTypeInfo[];
export interface GetSegmentDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata[];
  AudioMetadata?: AudioMetadata[];
  NextToken?: string;
  Segments?: SegmentDetection[];
  SelectedSegmentTypes?: SegmentTypeInfo[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export interface GetTextDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TextDetectionResult {
  Timestamp?: number;
  TextDetection?: TextDetection;
}
export type TextDetectionResults = TextDetectionResult[];
export interface GetTextDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  TextDetections?: TextDetectionResult[];
  NextToken?: string;
  TextModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export type MaxFacesToIndex = number;
export interface IndexFacesRequest {
  CollectionId: string;
  Image: Image;
  ExternalImageId?: string;
  DetectionAttributes?: Attribute[];
  MaxFaces?: number;
  QualityFilter?: QualityFilter;
}
export interface FaceRecord {
  Face?: Face;
  FaceDetail?: FaceDetail;
}
export type FaceRecordList = FaceRecord[];
export type Reason =
  | "EXCEEDS_MAX_FACES"
  | "EXTREME_POSE"
  | "LOW_BRIGHTNESS"
  | "LOW_SHARPNESS"
  | "LOW_CONFIDENCE"
  | "SMALL_BOUNDING_BOX"
  | "LOW_FACE_QUALITY"
  | (string & {});
export type Reasons = Reason[];
export interface UnindexedFace {
  Reasons?: Reason[];
  FaceDetail?: FaceDetail;
}
export type UnindexedFaces = UnindexedFace[];
export interface IndexFacesResponse {
  FaceRecords?: FaceRecord[];
  OrientationCorrection?: OrientationCorrection;
  FaceModelVersion?: string;
  UnindexedFaces?: UnindexedFace[];
}
export type PageSize = number;
export interface ListCollectionsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type CollectionIdList = string[];
export type FaceModelVersionList = string[];
export interface ListCollectionsResponse {
  CollectionIds?: string[];
  NextToken?: string;
  FaceModelVersions?: string[];
}
export type DatasetLabel = string;
export type DatasetLabels = string[];
export type IsLabeled = boolean;
export type QueryString = string;
export type HasErrors = boolean;
export type ListDatasetEntriesPageSize = number;
export interface ListDatasetEntriesRequest {
  DatasetArn: string;
  ContainsLabels?: string[];
  Labeled?: boolean;
  SourceRefContains?: string;
  HasErrors?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export type DatasetEntry = string;
export type DatasetEntries = string[];
export interface ListDatasetEntriesResponse {
  DatasetEntries?: string[];
  NextToken?: string;
}
export type ListDatasetLabelsPageSize = number;
export interface ListDatasetLabelsRequest {
  DatasetArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DatasetLabelStats {
  EntryCount?: number;
  BoundingBoxCount?: number;
}
export interface DatasetLabelDescription {
  LabelName?: string;
  LabelStats?: DatasetLabelStats;
}
export type DatasetLabelDescriptions = DatasetLabelDescription[];
export interface ListDatasetLabelsResponse {
  DatasetLabelDescriptions?: DatasetLabelDescription[];
  NextToken?: string;
}
export interface ListFacesRequest {
  CollectionId: string;
  NextToken?: string;
  MaxResults?: number;
  UserId?: string;
  FaceIds?: string[];
}
export type FaceList = Face[];
export interface ListFacesResponse {
  Faces?: Face[];
  NextToken?: string;
  FaceModelVersion?: string;
}
export type ListMediaAnalysisJobsPageSize = number;
export interface ListMediaAnalysisJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface MediaAnalysisJobDescription {
  JobId: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Status: MediaAnalysisJobStatus;
  FailureDetails?: MediaAnalysisJobFailureDetails;
  CreationTimestamp: Date;
  CompletionTimestamp?: Date;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
  Results?: MediaAnalysisResults;
  ManifestSummary?: MediaAnalysisManifestSummary;
}
export type MediaAnalysisJobDescriptions = MediaAnalysisJobDescription[];
export interface ListMediaAnalysisJobsResponse {
  NextToken?: string;
  MediaAnalysisJobs: MediaAnalysisJobDescription[];
}
export type ListProjectPoliciesPageSize = number;
export interface ListProjectPoliciesRequest {
  ProjectArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ProjectPolicyDocument = string;
export interface ProjectPolicy {
  ProjectArn?: string;
  PolicyName?: string;
  PolicyRevisionId?: string;
  PolicyDocument?: string;
  CreationTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export type ProjectPolicies = ProjectPolicy[];
export interface ListProjectPoliciesResponse {
  ProjectPolicies?: ProjectPolicy[];
  NextToken?: string;
}
export interface ListStreamProcessorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface StreamProcessor {
  Name?: string;
  Status?: StreamProcessorStatus;
}
export type StreamProcessorList = StreamProcessor[];
export interface ListStreamProcessorsResponse {
  NextToken?: string;
  StreamProcessors?: StreamProcessor[];
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export type MaxUserResults = number;
export interface ListUsersRequest {
  CollectionId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface User {
  UserId?: string;
  UserStatus?: UserStatus;
}
export type UserList = User[];
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export interface PutProjectPolicyRequest {
  ProjectArn: string;
  PolicyName: string;
  PolicyRevisionId?: string;
  PolicyDocument: string;
}
export interface PutProjectPolicyResponse {
  PolicyRevisionId?: string;
}
export interface RecognizeCelebritiesRequest {
  Image: Image;
}
export interface Celebrity {
  Urls?: string[];
  Name?: string;
  Id?: string;
  Face?: ComparedFace;
  MatchConfidence?: number;
  KnownGender?: KnownGender;
}
export type CelebrityList = Celebrity[];
export type ComparedFaceList = ComparedFace[];
export interface RecognizeCelebritiesResponse {
  CelebrityFaces?: Celebrity[];
  UnrecognizedFaces?: ComparedFace[];
  OrientationCorrection?: OrientationCorrection;
}
export type MaxFaces = number;
export interface SearchFacesRequest {
  CollectionId: string;
  FaceId: string;
  MaxFaces?: number;
  FaceMatchThreshold?: number;
}
export interface SearchFacesResponse {
  SearchedFaceId?: string;
  FaceMatches?: FaceMatch[];
  FaceModelVersion?: string;
}
export interface SearchFacesByImageRequest {
  CollectionId: string;
  Image: Image;
  MaxFaces?: number;
  FaceMatchThreshold?: number;
  QualityFilter?: QualityFilter;
}
export interface SearchFacesByImageResponse {
  SearchedFaceBoundingBox?: BoundingBox;
  SearchedFaceConfidence?: number;
  FaceMatches?: FaceMatch[];
  FaceModelVersion?: string;
}
export interface SearchUsersRequest {
  CollectionId: string;
  UserId?: string;
  FaceId?: string;
  UserMatchThreshold?: number;
  MaxUsers?: number;
}
export interface MatchedUser {
  UserId?: string;
  UserStatus?: UserStatus;
}
export interface UserMatch {
  Similarity?: number;
  User?: MatchedUser;
}
export type UserMatchList = UserMatch[];
export interface SearchedFace {
  FaceId?: string;
}
export interface SearchedUser {
  UserId?: string;
}
export interface SearchUsersResponse {
  UserMatches?: UserMatch[];
  FaceModelVersion?: string;
  SearchedFace?: SearchedFace;
  SearchedUser?: SearchedUser;
}
export interface SearchUsersByImageRequest {
  CollectionId: string;
  Image: Image;
  UserMatchThreshold?: number;
  MaxUsers?: number;
  QualityFilter?: QualityFilter;
}
export interface SearchedFaceDetails {
  FaceDetail?: FaceDetail;
}
export type UnsearchedFaceReason =
  | "FACE_NOT_LARGEST"
  | "EXCEEDS_MAX_FACES"
  | "EXTREME_POSE"
  | "LOW_BRIGHTNESS"
  | "LOW_SHARPNESS"
  | "LOW_CONFIDENCE"
  | "SMALL_BOUNDING_BOX"
  | "LOW_FACE_QUALITY"
  | (string & {});
export type UnsearchedFaceReasons = UnsearchedFaceReason[];
export interface UnsearchedFace {
  FaceDetails?: FaceDetail;
  Reasons?: UnsearchedFaceReason[];
}
export type UnsearchedFacesList = UnsearchedFace[];
export interface SearchUsersByImageResponse {
  UserMatches?: UserMatch[];
  FaceModelVersion?: string;
  SearchedFace?: SearchedFaceDetails;
  UnsearchedFaces?: UnsearchedFace[];
}
export interface NotificationChannel {
  SNSTopicArn: string;
  RoleArn: string;
}
export interface StartCelebrityRecognitionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export interface StartCelebrityRecognitionResponse {
  JobId?: string;
}
export interface StartContentModerationRequest {
  Video: Video;
  MinConfidence?: number;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export interface StartContentModerationResponse {
  JobId?: string;
}
export type FaceAttributes = "DEFAULT" | "ALL" | (string & {});
export interface StartFaceDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  FaceAttributes?: FaceAttributes;
  JobTag?: string;
}
export interface StartFaceDetectionResponse {
  JobId?: string;
}
export interface StartFaceSearchRequest {
  Video: Video;
  ClientRequestToken?: string;
  FaceMatchThreshold?: number;
  CollectionId: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export interface StartFaceSearchResponse {
  JobId?: string;
}
export type LabelDetectionFeatureName = "GENERAL_LABELS" | (string & {});
export type LabelDetectionFeatureList = LabelDetectionFeatureName[];
export interface LabelDetectionSettings {
  GeneralLabels?: GeneralLabelsSettings;
}
export interface StartLabelDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  MinConfidence?: number;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Features?: LabelDetectionFeatureName[];
  Settings?: LabelDetectionSettings;
}
export interface StartLabelDetectionResponse {
  JobId?: string;
}
export interface StartMediaAnalysisJobRequest {
  ClientRequestToken?: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
}
export interface StartMediaAnalysisJobResponse {
  JobId: string;
}
export interface StartPersonTrackingRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export interface StartPersonTrackingResponse {
  JobId?: string;
}
export interface StartProjectVersionRequest {
  ProjectVersionArn: string;
  MinInferenceUnits: number;
  MaxInferenceUnits?: number;
}
export interface StartProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export type MaxPixelThreshold = number;
export type MinCoveragePercentage = number;
export interface BlackFrame {
  MaxPixelThreshold?: number;
  MinCoveragePercentage?: number;
}
export interface StartTechnicalCueDetectionFilter {
  MinSegmentConfidence?: number;
  BlackFrame?: BlackFrame;
}
export interface StartShotDetectionFilter {
  MinSegmentConfidence?: number;
}
export interface StartSegmentDetectionFilters {
  TechnicalCueFilter?: StartTechnicalCueDetectionFilter;
  ShotFilter?: StartShotDetectionFilter;
}
export type SegmentTypes = SegmentType[];
export interface StartSegmentDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Filters?: StartSegmentDetectionFilters;
  SegmentTypes: SegmentType[];
}
export interface StartSegmentDetectionResponse {
  JobId?: string;
}
export type KinesisVideoStreamFragmentNumber = string;
export interface KinesisVideoStreamStartSelector {
  ProducerTimestamp?: number;
  FragmentNumber?: string;
}
export interface StreamProcessingStartSelector {
  KVSStreamStartSelector?: KinesisVideoStreamStartSelector;
}
export type MaxDurationInSecondsULong = number;
export interface StreamProcessingStopSelector {
  MaxDurationInSeconds?: number;
}
export interface StartStreamProcessorRequest {
  Name: string;
  StartSelector?: StreamProcessingStartSelector;
  StopSelector?: StreamProcessingStopSelector;
}
export type StartStreamProcessorSessionId = string;
export interface StartStreamProcessorResponse {
  SessionId?: string;
}
export interface StartTextDetectionFilters {
  WordFilter?: DetectionFilter;
  RegionsOfInterest?: RegionOfInterest[];
}
export interface StartTextDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Filters?: StartTextDetectionFilters;
}
export interface StartTextDetectionResponse {
  JobId?: string;
}
export interface StopProjectVersionRequest {
  ProjectVersionArn: string;
}
export interface StopProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export interface StopStreamProcessorRequest {
  Name: string;
}
export interface StopStreamProcessorResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type GroundTruthBlob = Uint8Array;
export interface DatasetChanges {
  GroundTruth: Uint8Array;
}
export interface UpdateDatasetEntriesRequest {
  DatasetArn: string;
  Changes: DatasetChanges;
}
export interface UpdateDatasetEntriesResponse {}
export interface ConnectedHomeSettingsForUpdate {
  Labels?: string[];
  MinConfidence?: number;
}
export interface StreamProcessorSettingsForUpdate {
  ConnectedHomeForUpdate?: ConnectedHomeSettingsForUpdate;
}
export type StreamProcessorParameterToDelete =
  | "ConnectedHomeMinConfidence"
  | "RegionsOfInterest"
  | (string & {});
export type StreamProcessorParametersToDelete =
  StreamProcessorParameterToDelete[];
export interface UpdateStreamProcessorRequest {
  Name: string;
  SettingsForUpdate?: StreamProcessorSettingsForUpdate;
  RegionsOfInterestForUpdate?: RegionOfInterest[];
  DataSharingPreferenceForUpdate?: StreamProcessorDataSharingPreference;
  ParametersToDelete?: StreamProcessorParameterToDelete[];
}
export interface UpdateStreamProcessorResponse {}
export type AssociateFacesError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more faces with an existing UserID. Takes an array of
 * `FaceIds`. Each `FaceId` that are present in the `FaceIds`
 * list is associated with the provided UserID. The number of FaceIds that can be used as input
 * in a single request is limited to 100.
 *
 * Note that the total number of faces that can be associated with a single
 * `UserID` is also limited to 100. Once a `UserID` has 100 faces
 * associated with it, no additional faces can be added. If more API calls are made after the
 * limit is reached, a `ServiceQuotaExceededException` will result.
 *
 * The `UserMatchThreshold` parameter specifies the minimum user match confidence
 * required for the face to be associated with a UserID that has at least one `FaceID`
 * already associated. This ensures that the `FaceIds` are associated with the right
 * UserID. The value ranges from 0-100 and default value is 75.
 *
 * If successful, an array of `AssociatedFace` objects containing the associated
 * `FaceIds` is returned. If a given face is already associated with the given
 * `UserID`, it will be ignored and will not be returned in the response. If a given
 * face is already associated to a different `UserID`, isn't found in the collection,
 * doesn’t meet the `UserMatchThreshold`, or there are already 100 faces associated
 * with the `UserID`, it will be returned as part of an array of
 * `UnsuccessfulFaceAssociations.`
 *
 * The `UserStatus` reflects the status of an operation which updates a UserID
 * representation with a list of given faces. The `UserStatus` can be:
 *
 * - ACTIVE - All associations or disassociations of FaceID(s) for a UserID are
 * complete.
 *
 * - CREATED - A UserID has been created, but has no FaceID(s) associated with it.
 *
 * - UPDATING - A UserID is being updated and there are current associations or
 * disassociations of FaceID(s) taking place.
 */
export const associateFaces: API.OperationMethod<
  AssociateFacesRequest,
  AssociateFacesResponse,
  AssociateFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      UserId: 0,
      FaceIds: 0,
      UserMatchThreshold: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFaces",
})) as any;

export type CompareFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Compares a face in the *source* input image with each of the 100
 * largest faces detected in the *target* input image.
 *
 * If the source image contains multiple faces, the service detects the largest face and
 * compares it with each face detected in the target image.
 *
 * CompareFaces uses machine learning algorithms, which are probabilistic. A false negative
 * is an incorrect prediction that a face in the target image has a low similarity confidence
 * score when compared to the face in the source image. To reduce the probability of false
 * negatives, we recommend that you compare the target image against multiple source images. If
 * you plan to use `CompareFaces` to make a decision that impacts an individual's
 * rights, privacy, or access to services, we recommend that you pass the result to a human for
 * review and further validation before taking action.
 *
 * You pass the input and target images either as base64-encoded image bytes or as
 * references to images in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes isn't
 * supported. The image must be formatted as a PNG or JPEG file.
 *
 * In response, the operation returns an array of face matches ordered by similarity score
 * in descending order. For each face match, the response provides a bounding box of the face,
 * facial landmarks, pose details (pitch, roll, and yaw), quality (brightness and sharpness), and
 * confidence value (indicating the level of confidence that the bounding box contains a face).
 * The response also provides a similarity score, which indicates how closely the faces match.
 *
 * By default, only faces with a similarity score of greater than or equal to 80% are
 * returned in the response. You can change this value by specifying the
 * `SimilarityThreshold` parameter.
 *
 * `CompareFaces` also returns an array of faces that don't match the source
 * image. For each face, it returns a bounding box, confidence value, landmarks, pose details,
 * and quality. The response also returns information about the face in the source image,
 * including the bounding box of the face and confidence value.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. Use `QualityFilter` to set the quality bar by specifying `LOW`,
 * `MEDIUM`, or `HIGH`. If you do not want to filter detected faces,
 * specify `NONE`. The default value is `NONE`.
 *
 * If the image doesn't contain Exif metadata, `CompareFaces` returns
 * orientation information for the source and target images. Use these values to display the
 * images with the correct image orientation.
 *
 * If no faces are detected in the source or target images, `CompareFaces`
 * returns an `InvalidParameterException` error.
 *
 * This is a stateless API operation. That is, data returned by this operation doesn't
 * persist.
 *
 * For an example, see Comparing Faces in Images in the Amazon Rekognition Developer
 * Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:CompareFaces` action.
 */
export const compareFaces: API.OperationMethod<
  CompareFacesRequest,
  CompareFacesResponse,
  CompareFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceImage: i_Image,
      TargetImage: i_Image,
      SimilarityThreshold: 0,
      QualityFilter: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompareFaces",
})) as any;

export type CopyProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Copies a version of an Amazon Rekognition Custom Labels model from a source project to a destination project. The source and
 * destination projects can be in different AWS accounts but must be in the same AWS Region.
 * You can't copy a model to another AWS service.
 *
 * To copy a model version to a different AWS account, you need to create a resource-based policy known as a
 * *project policy*. You attach the project policy to the
 * source project by calling PutProjectPolicy. The project policy
 * gives permission to copy the model version from a trusting AWS account to a trusted account.
 *
 * For more information creating and attaching a project policy, see Attaching a project policy (SDK)
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * If you are copying a model version to a project in the same AWS account, you don't need to create a project policy.
 *
 * Copying project versions is supported only for Custom Labels models.
 *
 * To copy a model, the destination project, source project, and source model version
 * must already exist.
 *
 * Copying a model version takes a while to complete. To get the current status, call DescribeProjectVersions and check the value of `Status` in the
 * ProjectVersionDescription object. The copy operation has finished when
 * the value of `Status` is `COPYING_COMPLETED`.
 *
 * This operation requires permissions to perform the `rekognition:CopyProjectVersion` action.
 */
export const copyProjectVersion: API.OperationMethod<
  CopyProjectVersionRequest,
  CopyProjectVersionResponse,
  CopyProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceProjectArn: 0,
      SourceProjectVersionArn: 0,
      DestinationProjectArn: 0,
      VersionName: 0,
      OutputConfig: i_OutputConfig,
      Tags: 0,
      KmsKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyProjectVersion",
})) as any;

export type CreateCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a collection in an AWS Region. You can add faces to the collection using the
 * IndexFaces operation.
 *
 * For example, you might create collections, one for each of your application users. A
 * user can then index faces using the `IndexFaces` operation and persist results in a
 * specific collection. Then, a user can search the collection for faces in the user-specific
 * container.
 *
 * When you create a collection, it is associated with the latest version of the face model
 * version.
 *
 * Collection names are case-sensitive.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateCollection` action. If you want to tag your collection, you
 * also require permission to perform the `rekognition:TagResource`
 * operation.
 */
export const createCollection: API.OperationMethod<
  CreateCollectionRequest,
  CreateCollectionResponse,
  CreateCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CollectionId: 0, Tags: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollection",
})) as any;

export type CreateDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Creates a new Amazon Rekognition Custom Labels dataset. You can create a dataset by using
 * an Amazon Sagemaker format manifest file or by copying an existing Amazon Rekognition Custom Labels dataset.
 *
 * To create a training dataset for a project, specify `TRAIN` for the value of
 * `DatasetType`. To create the test dataset for a project,
 * specify `TEST` for the value of `DatasetType`.
 *
 * The response from `CreateDataset` is the Amazon Resource Name (ARN) for the dataset.
 * Creating a dataset takes a while to complete. Use DescribeDataset to check the
 * current status. The dataset created successfully if the value of `Status` is
 * `CREATE_COMPLETE`.
 *
 * To check if any non-terminal errors occurred, call ListDatasetEntries
 * and check for the presence of `errors` lists in the JSON Lines.
 *
 * Dataset creation fails if a terminal error occurs (`Status` = `CREATE_FAILED`).
 * Currently, you can't access the terminal error information.
 *
 * For more information, see Creating dataset in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * This operation requires permissions to perform the `rekognition:CreateDataset` action.
 * If you want to copy an existing dataset, you also require permission to perform the `rekognition:ListDatasetEntries` action.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatasetSource: {
        GroundTruthManifest: i_GroundTruthManifest,
        DatasetArn: 0,
      },
      DatasetType: 0,
      ProjectArn: 0,
      Tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateFaceLivenessSessionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API operation initiates a Face Liveness session. It returns a `SessionId`,
 * which you can use to start streaming Face Liveness video and get the results for a Face
 * Liveness session.
 *
 * You can use the `OutputConfig` option in the Settings parameter to provide an
 * Amazon S3 bucket location. The Amazon S3 bucket stores reference images and audit images. If no Amazon S3
 * bucket is defined, raw bytes are sent instead.
 *
 * You can use `AuditImagesLimit` to limit the number of audit images returned
 * when `GetFaceLivenessSessionResults` is called. This number is between 0 and 4. By
 * default, it is set to 0. The limit is best effort and based on the duration of the
 * selfie-video.
 */
export const createFaceLivenessSession: API.OperationMethod<
  CreateFaceLivenessSessionRequest,
  CreateFaceLivenessSessionResponse,
  CreateFaceLivenessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      KmsKeyId: 0,
      Settings: {
        OutputConfig: { S3Bucket: 0, S3KeyPrefix: 0 },
        AuditImagesLimit: 0,
        ChallengePreferences: D.list({
          Type: 0,
          Versions: { Minimum: 0, Maximum: 0 },
        }),
      },
      ClientRequestToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFaceLivenessSession",
})) as any;

export type CreateProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new Amazon Rekognition project. A project is a group of resources (datasets, model
 * versions) that you use to create and manage a Amazon Rekognition Custom Labels Model or custom adapter. You can
 * specify a feature to create the project with, if no feature is specified then Custom Labels
 * is used by default. For adapters, you can also choose whether or not to have the project
 * auto update by using the AutoUpdate argument. This operation requires permissions to
 * perform the `rekognition:CreateProject` action.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProjectName: 0, Feature: 0, AutoUpdate: 0, Tags: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new version of Amazon Rekognition project (like a Custom Labels model or a custom adapter)
 * and begins training. Models and adapters are managed as part of a Rekognition project. The
 * response from `CreateProjectVersion` is an Amazon Resource Name (ARN) for the
 * project version.
 *
 * The FeatureConfig operation argument allows you to configure specific model or adapter
 * settings. You can provide a description to the project version by using the
 * VersionDescription argment. Training can take a while to complete. You can get the current
 * status by calling DescribeProjectVersions. Training completed
 * successfully if the value of the `Status` field is
 * `TRAINING_COMPLETED`. Once training has successfully completed, call DescribeProjectVersions to get the training results and evaluate the
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateProjectVersion` action.
 *
 * The following applies only to projects with Amazon Rekognition Custom Labels as the chosen
 * feature:
 *
 * You can train a model in a project that doesn't have associated datasets by specifying manifest files in the
 * `TrainingData` and `TestingData` fields.
 *
 * If you open the console after training a model with manifest files, Amazon Rekognition Custom Labels creates
 * the datasets for you using the most recent manifest files. You can no longer train
 * a model version for the project by specifying manifest files.
 *
 * Instead of training with a project without associated datasets,
 * we recommend that you use the manifest
 * files to create training and test datasets for the project.
 */
export const createProjectVersion: API.OperationMethod<
  CreateProjectVersionRequest,
  CreateProjectVersionResponse,
  CreateProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProjectArn: 0,
      VersionName: 0,
      OutputConfig: i_OutputConfig,
      TrainingData: { Assets: D.list(i_Asset) },
      TestingData: { Assets: D.list(i_Asset), AutoCreate: 0 },
      Tags: 0,
      KmsKeyId: 0,
      VersionDescription: 0,
      FeatureConfig: { ContentModeration: { ConfidenceThreshold: 0 } },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectVersion",
})) as any;

export type CreateStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Amazon Rekognition stream processor that you can use to detect and recognize faces or to detect labels in a streaming video.
 *
 * Amazon Rekognition Video is a consumer of live video from Amazon Kinesis Video Streams. There are two different settings for stream processors in Amazon Rekognition: detecting faces and detecting labels.
 *
 * - If you are creating a stream processor for detecting faces, you provide as input a Kinesis video stream
 * (`Input`) and a Kinesis data stream (`Output`) stream for receiving
 * the output. You must use the `FaceSearch` option in
 * `Settings`, specifying the collection that contains the faces you
 * want to recognize. After you have finished analyzing a streaming video, use
 * StopStreamProcessor to stop processing.
 *
 * - If you are creating a stream processor to detect labels, you provide as input a Kinesis video stream
 * (`Input`), Amazon S3 bucket information (`Output`), and an
 * Amazon SNS topic ARN (`NotificationChannel`). You can also provide a KMS
 * key ID to encrypt the data sent to your Amazon S3 bucket. You specify what you want
 * to detect by using the `ConnectedHome` option in settings, and
 * selecting one of the following: `PERSON`, `PET`,
 * `PACKAGE`, `ALL` You can also specify where in the
 * frame you want Amazon Rekognition to monitor with `RegionsOfInterest`. When
 * you run the StartStreamProcessor operation on a label
 * detection stream processor, you input start and stop information to determine
 * the length of the processing time.
 *
 * Use `Name` to assign an identifier for the stream processor. You use `Name`
 * to manage the stream processor. For example, you can start processing the source video by calling StartStreamProcessor with
 * the `Name` field.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateStreamProcessor` action. If you want to tag your stream processor, you also require permission to perform the `rekognition:TagResource` operation.
 */
export const createStreamProcessor: API.OperationMethod<
  CreateStreamProcessorRequest,
  CreateStreamProcessorResponse,
  CreateStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Input: { KinesisVideoStream: { Arn: 0 } },
      Output: {
        KinesisDataStream: { Arn: 0 },
        S3Destination: { Bucket: 0, KeyPrefix: 0 },
      },
      Name: 0,
      Settings: {
        FaceSearch: { CollectionId: 0, FaceMatchThreshold: 0 },
        ConnectedHome: { Labels: 0, MinConfidence: 0 },
      },
      RoleArn: 0,
      Tags: 0,
      NotificationChannel: { SNSTopicArn: 0 },
      KmsKeyId: 0,
      RegionsOfInterest: D.list(i_RegionOfInterest),
      DataSharingPreference: i_StreamProcessorDataSharingPreference,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamProcessor",
})) as any;

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new User within a collection specified by `CollectionId`. Takes
 * `UserId` as a parameter, which is a user provided ID which should be unique
 * within the collection. The provided `UserId` will alias the system generated UUID
 * to make the `UserId` more user friendly.
 *
 * Uses a `ClientToken`, an idempotency token that ensures a call to
 * `CreateUser` completes only once. If the value is not supplied, the AWS SDK
 * generates an idempotency token for the requests. This prevents retries after a network error
 * results from making multiple `CreateUser` calls.
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
      CollectionId: 0,
      UserId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified collection. Note that this operation removes all faces in the
 * collection. For an example, see Deleting a
 * collection.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteCollection` action.
 */
export const deleteCollection: API.OperationMethod<
  DeleteCollectionRequest,
  DeleteCollectionResponse,
  DeleteCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CollectionId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollection",
})) as any;

export type DeleteDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Deletes an existing Amazon Rekognition Custom Labels dataset.
 * Deleting a dataset might take while. Use DescribeDataset to check the
 * current status. The dataset is still deleting if the value of `Status` is
 * `DELETE_IN_PROGRESS`. If you try to access the dataset after it is deleted, you get
 * a `ResourceNotFoundException` exception.
 *
 * You can't delete a dataset while it is creating (`Status` = `CREATE_IN_PROGRESS`)
 * or if the dataset is updating (`Status` = `UPDATE_IN_PROGRESS`).
 *
 * This operation requires permissions to perform the `rekognition:DeleteDataset` action.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatasetArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
})) as any;

export type DeleteFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes faces from a collection. You specify a collection ID and an array of face IDs
 * to remove from the collection.
 *
 * This operation requires permissions to perform the `rekognition:DeleteFaces`
 * action.
 */
export const deleteFaces: API.OperationMethod<
  DeleteFacesRequest,
  DeleteFacesResponse,
  DeleteFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CollectionId: 0, FaceIds: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFaces",
})) as any;

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Amazon Rekognition project. To delete a project you must first delete all models or
 * adapters associated with the project. To delete a model or adapter, see DeleteProjectVersion.
 *
 * `DeleteProject` is an asynchronous operation. To check if the project is
 * deleted, call DescribeProjects. The project is deleted when the project
 * no longer appears in the response. Be aware that deleting a given project will also delete
 * any `ProjectPolicies` associated with that project.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteProject` action.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProjectArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

export type DeleteProjectPolicyError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidPolicyRevisionIdException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Deletes an existing project policy.
 *
 * To get a list of project policies attached to a project, call ListProjectPolicies. To attach a project policy to a project, call PutProjectPolicy.
 *
 * This operation requires permissions to perform the `rekognition:DeleteProjectPolicy` action.
 */
export const deleteProjectPolicy: API.OperationMethod<
  DeleteProjectPolicyRequest,
  DeleteProjectPolicyResponse,
  DeleteProjectPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProjectArn: 0, PolicyName: 0, PolicyRevisionId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidPolicyRevisionIdException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectPolicy",
})) as any;

export type DeleteProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Rekognition project model or project version, like a Amazon Rekognition Custom Labels model or a custom
 * adapter.
 *
 * You can't delete a project version if it is running or if it is training. To check
 * the status of a project version, use the Status field returned from DescribeProjectVersions. To stop a project version call StopProjectVersion. If the project version is training, wait until it
 * finishes.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteProjectVersion` action.
 */
export const deleteProjectVersion: API.OperationMethod<
  DeleteProjectVersionRequest,
  DeleteProjectVersionResponse,
  DeleteProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProjectVersionArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectVersion",
})) as any;

export type DeleteStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the stream processor identified by `Name`. You assign the value for `Name` when you create the stream processor with
 * CreateStreamProcessor. You might not be able to use the same name for a stream processor for a few seconds after calling `DeleteStreamProcessor`.
 */
export const deleteStreamProcessor: API.OperationMethod<
  DeleteStreamProcessorRequest,
  DeleteStreamProcessorResponse,
  DeleteStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStreamProcessor",
})) as any;

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified UserID within the collection. Faces that are associated with the
 * UserID are disassociated from the UserID before deleting the specified UserID. If the
 * specified `Collection` or `UserID` is already deleted or not found, a
 * `ResourceNotFoundException` will be thrown. If the action is successful with a
 * 200 response, an empty HTTP body is returned.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      UserId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified collection. You can use `DescribeCollection` to get
 * information, such as the number of faces indexed into a collection and the version of the
 * model used by the collection for face detection.
 *
 * For more information, see Describing a Collection in the
 * Amazon Rekognition Developer Guide.
 */
export const describeCollection: API.OperationMethod<
  DescribeCollectionRequest,
  DescribeCollectionResponse,
  DescribeCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CollectionId: 0 },
    output: { CreationTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCollection",
})) as any;

export type DescribeDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Describes an Amazon Rekognition Custom Labels dataset. You can get information such as the current status of a dataset and
 * statistics about the images and labels in a dataset.
 *
 * This operation requires permissions to perform the `rekognition:DescribeDataset` action.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetArn: 0 },
    output: {
      DatasetDescription: {
        CreationTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
})) as any;

export type DescribeProjectsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about your Rekognition projects.
 *
 * This operation requires permissions to perform the `rekognition:DescribeProjects` action.
 */
export const describeProjects: API.PaginatedOperationMethod<
  DescribeProjectsRequest,
  DescribeProjectsResponse,
  DescribeProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, ProjectNames: 0, Features: 0 },
    output: {
      ProjectDescriptions: D.list({
        CreationTimestamp: D.ts,
        Datasets: D.list({ CreationTimestamp: D.ts }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeProjectVersionsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists and describes the versions of an Amazon Rekognition project. You can specify up to 10 model or
 * adapter versions in `ProjectVersionArns`. If you don't specify a value,
 * descriptions for all model/adapter versions in the project are returned.
 *
 * This operation requires permissions to perform the `rekognition:DescribeProjectVersions`
 * action.
 */
export const describeProjectVersions: API.PaginatedOperationMethod<
  DescribeProjectVersionsRequest,
  DescribeProjectVersionsResponse,
  DescribeProjectVersionsError,
  Credentials | HttpClient.HttpClient,
  ProjectVersionDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ProjectArn: 0, VersionNames: 0, NextToken: 0, MaxResults: 0 },
    output: {
      ProjectVersionDescriptions: D.list({
        CreationTimestamp: D.ts,
        TrainingEndTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProjectVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectVersionDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about a stream processor created by CreateStreamProcessor. You can get information about the input and output streams, the input parameters for the face recognition being performed,
 * and the current status of the stream processor.
 */
export const describeStreamProcessor: API.OperationMethod<
  DescribeStreamProcessorRequest,
  DescribeStreamProcessorResponse,
  DescribeStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreationTimestamp: D.ts, LastUpdateTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamProcessor",
})) as any;

export type DetectCustomLabelsError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Detects custom labels in a supplied image by using an Amazon Rekognition Custom Labels model.
 *
 * You specify which version of a model version to use by using the `ProjectVersionArn` input
 * parameter.
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in
 * an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, passing
 * image bytes is not supported. The image must be either a PNG or JPEG formatted file.
 *
 * For each object that the model version detects on an image, the API returns a
 * (`CustomLabel`) object in an array (`CustomLabels`).
 * Each `CustomLabel` object provides the label name (`Name`), the level
 * of confidence that the image contains the object (`Confidence`), and
 * object location information, if it exists, for the label on the image (`Geometry`).
 *
 * To filter labels that are returned, specify a value for `MinConfidence`.
 * `DetectCustomLabelsLabels` only returns labels with a confidence that's higher than
 * the specified value.
 *
 * The value of `MinConfidence` maps to the assumed threshold values
 * created during training. For more information, see *Assumed threshold*
 * in the Amazon Rekognition Custom Labels Developer Guide.
 * Amazon Rekognition Custom Labels metrics expresses an assumed threshold as a floating point value between 0-1. The range of
 * `MinConfidence` normalizes the threshold value to a percentage value (0-100). Confidence
 * responses from `DetectCustomLabels` are also returned as a percentage.
 * You can use `MinConfidence` to change the precision and recall or your model.
 * For more information, see
 * *Analyzing an image* in the Amazon Rekognition Custom Labels Developer Guide.
 *
 * If you don't specify a value for `MinConfidence`, `DetectCustomLabels`
 * returns labels based on the assumed threshold of each label.
 *
 * This is a stateless API operation. That is, the operation does not persist any
 * data.
 *
 * This operation requires permissions to perform the
 * `rekognition:DetectCustomLabels` action.
 *
 * For more information, see
 * *Analyzing an image* in the Amazon Rekognition Custom Labels Developer Guide.
 */
export const detectCustomLabels: API.OperationMethod<
  DetectCustomLabelsRequest,
  DetectCustomLabelsResponse,
  DetectCustomLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProjectVersionArn: 0,
      Image: i_Image,
      MaxResults: 0,
      MinConfidence: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectCustomLabels",
})) as any;

export type DetectFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects faces within an image that is provided as input.
 *
 * `DetectFaces` detects the 100 largest faces in the image. For each face
 * detected, the operation returns face details. These details include a bounding box of the
 * face, a confidence value (that the bounding box contains a face), and a fixed set of
 * attributes such as facial landmarks (for example, coordinates of eye and mouth), pose,
 * presence of facial occlusion, and so on.
 *
 * The face-detection algorithm is most effective on frontal faces. For non-frontal or
 * obscured faces, the algorithm might not detect the faces or might detect faces with lower
 * confidence.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations,
 * passing image bytes is not supported. The image must be either a PNG or JPEG formatted file.
 *
 * This is a stateless API operation. That is, the operation does not persist any
 * data.
 *
 * This operation requires permissions to perform the `rekognition:DetectFaces`
 * action.
 */
export const detectFaces: API.OperationMethod<
  DetectFacesRequest,
  DetectFacesResponse,
  DetectFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Image: i_Image, Attributes: 0 } },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectFaces",
})) as any;

export type DetectLabelsError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects instances of real-world entities within an image (JPEG or PNG) provided as
 * input. This includes objects like flower, tree, and table; events like wedding, graduation,
 * and birthday party; and concepts like landscape, evening, and nature.
 *
 * For an example, see Analyzing images stored in an Amazon S3 bucket in the
 * Amazon Rekognition Developer Guide.
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in
 * an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * **Optional Parameters**
 *
 * You can specify one or both of the `GENERAL_LABELS` and
 * `IMAGE_PROPERTIES` feature types when calling the DetectLabels API. Including
 * `GENERAL_LABELS` will ensure the response includes the labels detected in the
 * input image, while including `IMAGE_PROPERTIES `will ensure the response includes
 * information about the image quality and color.
 *
 * When using `GENERAL_LABELS` and/or `IMAGE_PROPERTIES` you can
 * provide filtering criteria to the Settings parameter. You can filter with sets of individual
 * labels or with label categories. You can specify inclusive filters, exclusive filters, or a
 * combination of inclusive and exclusive filters. For more information on filtering see Detecting
 * Labels in an Image.
 *
 * When getting labels, you can specify `MinConfidence` to control the
 * confidence threshold for the labels returned. The default is 55%. You can also add the
 * `MaxLabels` parameter to limit the number of labels returned. The default and
 * upper limit is 1000 labels. These arguments are only valid when supplying GENERAL_LABELS as a
 * feature type.
 *
 * **Response Elements**
 *
 * For each object, scene, and concept the API returns one or more labels. The API
 * returns the following types of information about labels:
 *
 * - Name - The name of the detected label.
 *
 * - Confidence - The level of confidence in the label assigned to a detected object.
 *
 * - Parents - The ancestor labels for a detected label. DetectLabels returns a
 * hierarchical taxonomy of detected labels. For example, a detected car might be assigned
 * the label car. The label car has two parent labels: Vehicle (its parent) and
 * Transportation (its grandparent). The response includes the all ancestors for a label,
 * where every ancestor is a unique label. In the previous example, Car, Vehicle, and
 * Transportation are returned as unique labels in the response.
 *
 * - Aliases - Possible Aliases for the label.
 *
 * - Categories - The label categories that the detected label belongs to.
 *
 * - BoundingBox — Bounding boxes are described for all instances of detected common
 * object labels, returned in an array of Instance objects. An Instance object contains a
 * BoundingBox object, describing the location of the label on the input image. It also
 * includes the confidence for the accuracy of the detected bounding box.
 *
 * The API returns the following information regarding the image, as part of the
 * ImageProperties structure:
 *
 * - Quality - Information about the Sharpness, Brightness, and Contrast of the input
 * image, scored between 0 to 100. Image quality is returned for the entire image, as well as
 * the background and the foreground.
 *
 * - Dominant Color - An array of the dominant colors in the image.
 *
 * - Foreground - Information about the sharpness, brightness, and dominant colors of the
 * input image’s foreground.
 *
 * - Background - Information about the sharpness, brightness, and dominant colors of the
 * input image’s background.
 *
 * The list of returned labels will include at least one label for every detected object,
 * along with information about that label. In the following example, suppose the input image has
 * a lighthouse, the sea, and a rock. The response includes all three labels, one for each
 * object, as well as the confidence in the label:
 *
 * `{Name: lighthouse, Confidence: 98.4629}`
 *
 * `{Name: rock,Confidence: 79.2097}`
 *
 * ` {Name: sea,Confidence: 75.061}`
 *
 * The list of labels can include multiple labels for the same object. For example, if the
 * input image shows a flower (for example, a tulip), the operation might return the following
 * three labels.
 *
 * `{Name: flower,Confidence: 99.0562}`
 *
 * `{Name: plant,Confidence: 99.0562}`
 *
 * `{Name: tulip,Confidence: 99.0562}`
 *
 * In this example, the detection algorithm more precisely identifies the flower as a
 * tulip.
 *
 * If the object detected is a person, the operation doesn't provide the same facial
 * details that the DetectFaces operation provides.
 *
 * This is a stateless API operation that doesn't return any data.
 *
 * This operation requires permissions to perform the
 * `rekognition:DetectLabels` action.
 */
export const detectLabels: API.OperationMethod<
  DetectLabelsRequest,
  DetectLabelsResponse,
  DetectLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Image: i_Image,
      MaxLabels: 0,
      MinConfidence: 0,
      Features: 0,
      Settings: {
        GeneralLabels: i_GeneralLabelsSettings,
        ImageProperties: { MaxDominantColors: 0 },
      },
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectLabels",
})) as any;

export type DetectModerationLabelsError =
  | AccessDeniedException
  | HumanLoopQuotaExceededException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects unsafe content in a specified JPEG or PNG format image. Use
 * `DetectModerationLabels` to moderate images depending on your requirements. For
 * example, you might want to filter images that contain nudity, but not images containing
 * suggestive content.
 *
 * To filter images, use the labels returned by `DetectModerationLabels` to
 * determine which types of content are appropriate.
 *
 * For information about moderation labels, see Detecting Unsafe Content in the
 * Amazon Rekognition Developer Guide.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * You can specify an adapter to use when retrieving label predictions by providing a
 * `ProjectVersionArn` to the `ProjectVersion` argument.
 */
export const detectModerationLabels: API.OperationMethod<
  DetectModerationLabelsRequest,
  DetectModerationLabelsResponse,
  DetectModerationLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Image: i_Image,
      MinConfidence: 0,
      HumanLoopConfig: {
        HumanLoopName: 0,
        FlowDefinitionArn: 0,
        DataAttributes: { ContentClassifiers: 0 },
      },
      ProjectVersion: 0,
    },
  },
  errors: [
    AccessDeniedException,
    HumanLoopQuotaExceededException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectModerationLabels",
})) as any;

export type DetectProtectiveEquipmentError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects Personal Protective Equipment (PPE) worn by people detected in an image. Amazon Rekognition can detect the
 * following types of PPE.
 *
 * - Face cover
 *
 * - Hand cover
 *
 * - Head cover
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in an Amazon S3 bucket.
 * The image must be either a PNG or JPG formatted file.
 *
 * `DetectProtectiveEquipment` detects PPE worn by up to 15 persons detected in an image.
 *
 * For each person detected in the image the API returns an array of body parts (face, head, left-hand, right-hand).
 * For each body part, an array of detected items of PPE is returned, including an indicator of whether or not the PPE
 * covers the body part. The API returns the confidence it has in each detection
 * (person, PPE, body part and body part coverage). It also returns a bounding box (BoundingBox) for each detected
 * person and each detected item of PPE.
 *
 * You can optionally request a summary of detected PPE items with the `SummarizationAttributes` input parameter.
 * The summary provides the following information.
 *
 * - The persons detected as wearing all of the types of PPE that you specify.
 *
 * - The persons detected as not wearing all of the types PPE that you specify.
 *
 * - The persons detected where PPE adornment could not be determined.
 *
 * This is a stateless API operation. That is, the operation does not persist any data.
 *
 * This operation requires permissions to perform the `rekognition:DetectProtectiveEquipment` action.
 */
export const detectProtectiveEquipment: API.OperationMethod<
  DetectProtectiveEquipmentRequest,
  DetectProtectiveEquipmentResponse,
  DetectProtectiveEquipmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Image: i_Image,
      SummarizationAttributes: { MinConfidence: 0, RequiredEquipmentTypes: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectProtectiveEquipment",
})) as any;

export type DetectTextError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects text in the input image and converts it into machine-readable text.
 *
 * Pass the input image as base64-encoded image bytes or as a reference to an image in an
 * Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, you must pass it as a
 * reference to an image in an Amazon S3 bucket. For the AWS CLI, passing image bytes is not
 * supported. The image must be either a .png or .jpeg formatted file.
 *
 * The `DetectText` operation returns text in an array of TextDetection elements, `TextDetections`. Each
 * `TextDetection` element provides information about a single word or line of text
 * that was detected in the image.
 *
 * A word is one or more script characters that are not separated by spaces.
 * `DetectText` can detect up to 100 words in an image.
 *
 * A line is a string of equally spaced words. A line isn't necessarily a complete
 * sentence. For example, a driver's license number is detected as a line. A line ends when there
 * is no aligned text after it. Also, a line ends when there is a large gap between words,
 * relative to the length of the words. This means, depending on the gap between words, Amazon Rekognition
 * may detect multiple lines in text aligned in the same direction. Periods don't represent the
 * end of a line. If a sentence spans multiple lines, the `DetectText` operation
 * returns multiple lines.
 *
 * To determine whether a `TextDetection` element is a line of text or a word,
 * use the `TextDetection` object `Type` field.
 *
 * To be detected, text must be within +/- 90 degrees orientation of the horizontal
 * axis.
 *
 * For more information, see Detecting text in the Amazon Rekognition Developer
 * Guide.
 */
export const detectText: API.OperationMethod<
  DetectTextRequest,
  DetectTextResponse,
  DetectTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Image: i_Image,
      Filters: {
        WordFilter: i_DetectionFilter,
        RegionsOfInterest: D.list(i_RegionOfInterest),
      },
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectText",
})) as any;

export type DisassociateFacesError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a `Face` supplied in an array of
 * `FaceIds` and the User. If the User is not present already, then a
 * `ResourceNotFound` exception is thrown. If successful, an array of faces that are
 * disassociated from the User is returned. If a given face is already disassociated from the
 * given UserID, it will be ignored and not be returned in the response. If a given face is
 * already associated with a different User or not found in the collection it will be returned as
 * part of `UnsuccessfulDisassociations`. You can remove 1 - 100 face IDs from a user
 * at one time.
 */
export const disassociateFaces: API.OperationMethod<
  DisassociateFacesRequest,
  DisassociateFacesResponse,
  DisassociateFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      UserId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      FaceIds: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFaces",
})) as any;

export type DistributeDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Distributes the entries (images) in a training dataset across the training dataset and the test dataset for a project.
 * `DistributeDatasetEntries` moves 20% of the training dataset images to the test dataset.
 * An entry is a JSON Line that describes an image.
 *
 * You supply the Amazon Resource Names (ARN) of a project's training dataset and test dataset.
 * The training dataset must contain the images that you want to split. The test dataset
 * must be empty. The datasets must belong to the same project. To create training and test datasets for a project, call CreateDataset.
 *
 * Distributing a dataset takes a while to complete. To check the status call `DescribeDataset`. The operation
 * is complete when the `Status` field for the training dataset and the test dataset is `UPDATE_COMPLETE`.
 * If the dataset split fails, the value of `Status` is `UPDATE_FAILED`.
 *
 * This operation requires permissions to perform the `rekognition:DistributeDatasetEntries` action.
 */
export const distributeDatasetEntries: API.OperationMethod<
  DistributeDatasetEntriesRequest,
  DistributeDatasetEntriesResponse,
  DistributeDatasetEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Datasets: D.list({ Arn: 0 }) } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DistributeDatasetEntries",
})) as any;

export type GetCelebrityInfoError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the name and additional information about a celebrity based on their Amazon Rekognition ID.
 * The additional information is returned as an array of URLs. If there is no additional
 * information about the celebrity, this list is empty.
 *
 * For more information, see Getting information about a celebrity in the
 * Amazon Rekognition Developer Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:GetCelebrityInfo` action.
 */
export const getCelebrityInfo: API.OperationMethod<
  GetCelebrityInfoRequest,
  GetCelebrityInfoResponse,
  GetCelebrityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCelebrityInfo",
})) as any;

export type GetCelebrityRecognitionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the celebrity recognition results for a Amazon Rekognition Video analysis started by
 * StartCelebrityRecognition.
 *
 * Celebrity recognition in a video is an asynchronous operation. Analysis is started by a
 * call to StartCelebrityRecognition which returns a job identifier
 * (`JobId`).
 *
 * When the celebrity recognition operation finishes, Amazon Rekognition Video publishes a completion
 * status to the Amazon Simple Notification Service topic registered in the initial call to
 * `StartCelebrityRecognition`. To get the results of the celebrity recognition
 * analysis, first check that the status value published to the Amazon SNS topic is
 * `SUCCEEDED`. If so, call `GetCelebrityDetection` and pass the job
 * identifier (`JobId`) from the initial call to `StartCelebrityDetection`.
 *
 * For more information, see Working With Stored Videos in the Amazon Rekognition Developer Guide.
 *
 * `GetCelebrityRecognition` returns detected celebrities and the time(s) they
 * are detected in an array (`Celebrities`) of CelebrityRecognition
 * objects. Each `CelebrityRecognition`
 * contains information about the celebrity in a CelebrityDetail object and the
 * time, `Timestamp`, the celebrity was detected. This CelebrityDetail object stores information about the detected celebrity's face
 * attributes, a face bounding box, known gender, the celebrity's name, and a confidence
 * estimate.
 *
 * `GetCelebrityRecognition` only returns the default facial
 * attributes (`BoundingBox`, `Confidence`, `Landmarks`,
 * `Pose`, and `Quality`). The `BoundingBox` field only
 * applies to the detected face instance. The other facial attributes listed in the
 * `Face` object of the following response syntax are not returned. For more
 * information, see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the `Celebrities` array is sorted by time (milliseconds from the start of the video).
 * You can also sort the array by celebrity by specifying the value `ID` in the `SortBy` input parameter.
 *
 * The `CelebrityDetail` object includes the celebrity identifer and additional information urls. If you don't store
 * the additional information urls, you can get them later by calling GetCelebrityInfo with the celebrity identifer.
 *
 * No information is returned for faces not recognized as celebrities.
 *
 * Use MaxResults parameter to limit the number of labels returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a
 * pagination token for getting the next set of results. To get the next page of results, call `GetCelebrityDetection`
 * and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetCelebrityRecognition`.
 */
export const getCelebrityRecognition: API.PaginatedOperationMethod<
  GetCelebrityRecognitionRequest,
  GetCelebrityRecognitionResponse,
  GetCelebrityRecognitionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0, SortBy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCelebrityRecognition",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetContentModerationError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the inappropriate, unwanted, or offensive content analysis results for a Amazon Rekognition Video analysis started by
 * StartContentModeration. For a list of moderation labels in Amazon Rekognition, see
 * Using the image and video moderation APIs.
 *
 * Amazon Rekognition Video inappropriate or offensive content detection in a stored video is an asynchronous operation. You start analysis by calling
 * StartContentModeration which returns a job identifier (`JobId`).
 * When analysis finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartContentModeration`.
 * To get the results of the content analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call `GetContentModeration` and pass the job identifier
 * (`JobId`) from the initial call to `StartContentModeration`.
 *
 * For more information, see Working with Stored Videos in the
 * Amazon Rekognition Devlopers Guide.
 *
 * `GetContentModeration` returns detected inappropriate, unwanted, or offensive content moderation labels,
 * and the time they are detected, in an array, `ModerationLabels`, of
 * ContentModerationDetection objects.
 *
 * By default, the moderated labels are returned sorted by time, in milliseconds from the start of the
 * video. You can also sort them by moderated label by specifying `NAME` for the `SortBy`
 * input parameter.
 *
 * Since video analysis can return a large number of results, use the `MaxResults` parameter to limit
 * the number of labels returned in a single call to `GetContentModeration`. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a
 * pagination token for getting the next set of results. To get the next page of results, call `GetContentModeration`
 * and populate the `NextToken` request parameter with the value of `NextToken`
 * returned from the previous call to `GetContentModeration`.
 *
 * For more information, see moderating content in the Amazon Rekognition Developer Guide.
 */
export const getContentModeration: API.PaginatedOperationMethod<
  GetContentModerationRequest,
  GetContentModerationResponse,
  GetContentModerationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0, SortBy: 0, AggregateBy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentModeration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFaceDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets face detection results for a Amazon Rekognition Video analysis started by StartFaceDetection.
 *
 * Face detection with Amazon Rekognition Video is an asynchronous operation. You start face detection by calling StartFaceDetection
 * which returns a job identifier (`JobId`). When the face detection operation finishes, Amazon Rekognition Video publishes a completion status to
 * the Amazon Simple Notification Service topic registered in the initial call to `StartFaceDetection`. To get the results
 * of the face detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * If so, call GetFaceDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceDetection`.
 *
 * `GetFaceDetection` returns an array of detected faces (`Faces`) sorted by the time the faces were detected.
 *
 * Use MaxResults parameter to limit the number of labels returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a pagination token for getting the next set
 * of results. To get the next page of results, call `GetFaceDetection` and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetFaceDetection`.
 *
 * Note that for the `GetFaceDetection` operation, the returned values for
 * `FaceOccluded` and `EyeDirection` will always be "null".
 */
export const getFaceDetection: API.PaginatedOperationMethod<
  GetFaceDetectionRequest,
  GetFaceDetectionResponse,
  GetFaceDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFaceLivenessSessionResultsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | SessionNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the results of a specific Face Liveness session. It requires the
 * `sessionId` as input, which was created using
 * `CreateFaceLivenessSession`. Returns the corresponding Face Liveness confidence
 * score, a reference image that includes a face bounding box, and audit images that also contain
 * face bounding boxes. The Face Liveness confidence score ranges from 0 to 100.
 *
 * The number of audit images returned by `GetFaceLivenessSessionResults` is
 * defined by the `AuditImagesLimit` paramater when calling
 * `CreateFaceLivenessSession`. Reference images are always returned when
 * possible.
 */
export const getFaceLivenessSessionResults: API.OperationMethod<
  GetFaceLivenessSessionResultsRequest,
  GetFaceLivenessSessionResultsResponse,
  GetFaceLivenessSessionResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0 },
    output: { ReferenceImage: o_AuditImage, AuditImages: D.list(o_AuditImage) },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    SessionNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceLivenessSessionResults",
})) as any;

export type GetFaceSearchError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the face search results for Amazon Rekognition Video face search started by
 * StartFaceSearch. The search returns faces in a collection that match the faces
 * of persons detected in a video. It also includes the time(s) that faces are matched in the video.
 *
 * Face search in a video is an asynchronous operation. You start face search by calling
 * to StartFaceSearch which returns a job identifier (`JobId`).
 * When the search operation finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartFaceSearch`.
 * To get the search results, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call `GetFaceSearch` and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceSearch`.
 *
 * For more information, see Searching Faces in a Collection in the
 * Amazon Rekognition Developer Guide.
 *
 * The search results are retured in an array, `Persons`, of
 * PersonMatch objects. Each`PersonMatch` element contains
 * details about the matching faces in the input collection, person information (facial attributes,
 * bounding boxes, and person identifer)
 * for the matched person, and the time the person was matched in the video.
 *
 * `GetFaceSearch` only returns the default
 * facial attributes (`BoundingBox`, `Confidence`,
 * `Landmarks`, `Pose`, and `Quality`). The other facial attributes listed
 * in the `Face` object of the following response syntax are not returned. For more information,
 * see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the `Persons` array is sorted by the time, in milliseconds from the
 * start of the video, persons are matched.
 * You can also sort by persons by specifying `INDEX` for the `SORTBY` input
 * parameter.
 */
export const getFaceSearch: API.PaginatedOperationMethod<
  GetFaceSearchRequest,
  GetFaceSearchResponse,
  GetFaceSearchError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0, SortBy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceSearch",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetLabelDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the label detection results of a Amazon Rekognition Video analysis started by StartLabelDetection.
 *
 * The label detection operation is started by a call to StartLabelDetection which returns a job identifier (`JobId`). When
 * the label detection operation finishes, Amazon Rekognition publishes a completion status to the
 * Amazon Simple Notification Service topic registered in the initial call to `StartlabelDetection`.
 *
 * To get the results of the label detection operation, first check that the status value
 * published to the Amazon SNS topic is `SUCCEEDED`. If so, call GetLabelDetection and pass the job identifier (`JobId`) from the
 * initial call to `StartLabelDetection`.
 *
 * `GetLabelDetection` returns an array of detected labels
 * (`Labels`) sorted by the time the labels were detected. You can also sort by the
 * label name by specifying `NAME` for the `SortBy` input parameter. If
 * there is no `NAME` specified, the default sort is by
 * timestamp.
 *
 * You can select how results are aggregated by using the `AggregateBy` input
 * parameter. The default aggregation method is `TIMESTAMPS`. You can also aggregate
 * by `SEGMENTS`, which aggregates all instances of labels detected in a given
 * segment.
 *
 * The returned Labels array may include the following attributes:
 *
 * - Name - The name of the detected label.
 *
 * - Confidence - The level of confidence in the label assigned to a detected object.
 *
 * - Parents - The ancestor labels for a detected label. GetLabelDetection returns a hierarchical
 * taxonomy of detected labels. For example, a detected car might be assigned the label car.
 * The label car has two parent labels: Vehicle (its parent) and Transportation (its
 * grandparent). The response includes the all ancestors for a label, where every ancestor is
 * a unique label. In the previous example, Car, Vehicle, and Transportation are returned as
 * unique labels in the response.
 *
 * - Aliases - Possible Aliases for the label.
 *
 * - Categories - The label categories that the detected label belongs to.
 *
 * - BoundingBox — Bounding boxes are described for all instances of detected common object labels,
 * returned in an array of Instance objects. An Instance object contains a BoundingBox object, describing
 * the location of the label on the input image. It also includes the confidence for the accuracy of the detected bounding box.
 *
 * - Timestamp - Time, in milliseconds from the start of the video, that the label was detected.
 * For aggregation by `SEGMENTS`, the `StartTimestampMillis`,
 * `EndTimestampMillis`, and `DurationMillis` structures are what
 * define a segment. Although the “Timestamp” structure is still returned with each label,
 * its value is set to be the same as `StartTimestampMillis`.
 *
 * Timestamp and Bounding box information are returned for detected Instances, only if
 * aggregation is done by `TIMESTAMPS`. If aggregating by `SEGMENTS`,
 * information about detected instances isn’t returned.
 *
 * The version of the label model used for the detection is also returned.
 *
 * Note `DominantColors` isn't returned for `Instances`,
 * although it is shown as part of the response in the sample seen below.
 *
 * Use `MaxResults` parameter to limit the number of labels returned. If
 * there are more results than specified in `MaxResults`, the value of
 * `NextToken` in the operation response contains a pagination token for getting the
 * next set of results. To get the next page of results, call `GetlabelDetection` and
 * populate the `NextToken` request parameter with the token value returned from the
 * previous call to `GetLabelDetection`.
 *
 * If you are retrieving results while using the Amazon Simple Notification Service, note that you will receive an
 * "ERROR" notification if the job encounters an issue.
 */
export const getLabelDetection: API.PaginatedOperationMethod<
  GetLabelDetectionRequest,
  GetLabelDetectionResponse,
  GetLabelDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0, SortBy: 0, AggregateBy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLabelDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMediaAnalysisJobError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the results for a given media analysis job.
 * Takes a `JobId` returned by StartMediaAnalysisJob.
 */
export const getMediaAnalysisJob: API.OperationMethod<
  GetMediaAnalysisJobRequest,
  GetMediaAnalysisJobResponse,
  GetMediaAnalysisJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { CreationTimestamp: D.ts, CompletionTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaAnalysisJob",
})) as any;

export type GetPersonTrackingError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * *End of support notice:* On October 31, 2025, AWS will discontinue
 * support for Amazon Rekognition People Pathing. After October 31, 2025, you will no
 * longer be able to use the Rekognition People Pathing capability. For more information,
 * visit this blog post.
 *
 * Gets the path tracking results of a Amazon Rekognition Video analysis started by StartPersonTracking.
 *
 * The person path tracking operation is started by a call to `StartPersonTracking`
 * which returns a job identifier (`JobId`). When the operation finishes, Amazon Rekognition Video publishes a completion status to
 * the Amazon Simple Notification Service topic registered in the initial call to `StartPersonTracking`.
 *
 * To get the results of the person path tracking operation, first check
 * that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * If so, call GetPersonTracking and pass the job identifier
 * (`JobId`) from the initial call to `StartPersonTracking`.
 *
 * `GetPersonTracking` returns an array, `Persons`, of tracked persons and the time(s) their
 * paths were tracked in the video.
 *
 * `GetPersonTracking` only returns the default
 * facial attributes (`BoundingBox`, `Confidence`,
 * `Landmarks`, `Pose`, and `Quality`). The other facial attributes listed
 * in the `Face` object of the following response syntax are not returned.
 *
 * For more information, see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the array is sorted by the time(s) a person's path is tracked in the video.
 * You can sort by tracked persons by specifying `INDEX` for the `SortBy` input parameter.
 *
 * Use the `MaxResults` parameter to limit the number of items returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a pagination token for getting the next set
 * of results. To get the next page of results, call `GetPersonTracking` and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetPersonTracking`.
 */
export const getPersonTracking: API.PaginatedOperationMethod<
  GetPersonTrackingRequest,
  GetPersonTrackingResponse,
  GetPersonTrackingError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0, SortBy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonTracking",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSegmentDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the segment detection results of a Amazon Rekognition Video analysis started by StartSegmentDetection.
 *
 * Segment detection with Amazon Rekognition Video is an asynchronous operation. You start segment detection by
 * calling StartSegmentDetection which returns a job identifier (`JobId`).
 * When the segment detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartSegmentDetection`. To get the results
 * of the segment detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * if so, call `GetSegmentDetection` and pass the job identifier (`JobId`) from the initial call
 * of `StartSegmentDetection`.
 *
 * `GetSegmentDetection` returns detected segments in an array (`Segments`)
 * of SegmentDetection objects. `Segments` is sorted by the segment types
 * specified in the `SegmentTypes` input parameter of `StartSegmentDetection`.
 * Each element of the array includes the detected segment, the precentage confidence in the acuracy
 * of the detected segment, the type of the segment, and the frame in which the segment was detected.
 *
 * Use `SelectedSegmentTypes` to find out the type of segment detection requested in the
 * call to `StartSegmentDetection`.
 *
 * Use the `MaxResults` parameter to limit the number of segment detections returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains
 * a pagination token for getting the next set of results. To get the next page of results, call `GetSegmentDetection`
 * and populate the `NextToken` request parameter with the token value returned from the previous
 * call to `GetSegmentDetection`.
 *
 * For more information, see Detecting video segments in stored video in the Amazon Rekognition Developer Guide.
 */
export const getSegmentDetection: API.PaginatedOperationMethod<
  GetSegmentDetectionRequest,
  GetSegmentDetectionResponse,
  GetSegmentDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTextDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the text detection results of a Amazon Rekognition Video analysis started by StartTextDetection.
 *
 * Text detection with Amazon Rekognition Video is an asynchronous operation. You start text detection by
 * calling StartTextDetection which returns a job identifier (`JobId`)
 * When the text detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartTextDetection`. To get the results
 * of the text detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * if so, call `GetTextDetection` and pass the job identifier (`JobId`) from the initial call
 * of `StartLabelDetection`.
 *
 * `GetTextDetection` returns an array of detected text (`TextDetections`) sorted by
 * the time the text was detected, up to 100 words per frame of video.
 *
 * Each element of the array includes the detected text, the precentage confidence in the acuracy
 * of the detected text, the time the text was detected, bounding box information for where the text
 * was located, and unique identifiers for words and their lines.
 *
 * Use MaxResults parameter to limit the number of text detections returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains
 * a pagination token for getting the next set of results. To get the next page of results, call `GetTextDetection`
 * and populate the `NextToken` request parameter with the token value returned from the previous
 * call to `GetTextDetection`.
 */
export const getTextDetection: API.PaginatedOperationMethod<
  GetTextDetectionRequest,
  GetTextDetectionResponse,
  GetTextDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTextDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type IndexFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects faces in the input image and adds them to the specified collection.
 *
 * Amazon Rekognition doesn't save the actual faces that are detected. Instead, the underlying
 * detection algorithm first detects the faces in the input image. For each face, the algorithm
 * extracts facial features into a feature vector, and stores it in the backend database.
 * Amazon Rekognition uses feature vectors when it performs face match and search operations using the
 * SearchFaces and SearchFacesByImage operations.
 *
 * For more information, see Adding faces to a collection in the Amazon Rekognition
 * Developer Guide.
 *
 * To get the number of faces in a collection, call DescribeCollection.
 *
 * If you're using version 1.0 of the face detection model, `IndexFaces`
 * indexes the 15 largest faces in the input image. Later versions of the face detection model
 * index the 100 largest faces in the input image.
 *
 * If you're using version 4 or later of the face model, image orientation information is not
 * returned in the `OrientationCorrection` field.
 *
 * To determine which version of the model you're using, call DescribeCollection and supply the collection ID. You can also get the model
 * version from the value of `FaceModelVersion` in the response from
 * `IndexFaces`
 *
 * For more information, see Model Versioning in the Amazon Rekognition Developer
 * Guide.
 *
 * If you provide the optional `ExternalImageId` for the input image you
 * provided, Amazon Rekognition associates this ID with all faces that it detects. When you call the ListFaces operation, the response returns the external ID. You can use this
 * external image ID to create a client-side index to associate the faces with each image. You
 * can then use the index to find all faces in an image.
 *
 * You can specify the maximum number of faces to index with the `MaxFaces` input
 * parameter. This is useful when you want to index the largest faces in an image and don't want
 * to index smaller faces, such as those belonging to people standing in the background.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. By default, `IndexFaces` chooses the quality bar that's used to filter
 * faces. You can also explicitly choose the quality bar. Use `QualityFilter`, to set
 * the quality bar by specifying `LOW`, `MEDIUM`, or `HIGH`. If
 * you do not want to filter detected faces, specify `NONE`.
 *
 * To use quality filtering, you need a collection associated with version 3 of the face
 * model or higher. To get the version of the face model associated with a collection, call
 * DescribeCollection.
 *
 * Information about faces detected in an image, but not indexed, is returned in an array of
 * UnindexedFace objects, `UnindexedFaces`. Faces aren't indexed
 * for reasons such as:
 *
 * - The number of faces detected exceeds the value of the `MaxFaces` request
 * parameter.
 *
 * - The face is too small compared to the image dimensions.
 *
 * - The face is too blurry.
 *
 * - The image is too dark.
 *
 * - The face has an extreme pose.
 *
 * - The face doesn’t have enough detail to be suitable for face search.
 *
 * In response, the `IndexFaces` operation returns an array of metadata for all
 * detected faces, `FaceRecords`. This includes:
 *
 * - The bounding box, `BoundingBox`, of the detected face.
 *
 * - A confidence value, `Confidence`, which indicates the confidence that the
 * bounding box contains a face.
 *
 * - A face ID, `FaceId`, assigned by the service for each face that's detected
 * and stored.
 *
 * - An image ID, `ImageId`, assigned by the service for the input image.
 *
 * If you request `ALL` or specific facial attributes (e.g.,
 * `FACE_OCCLUDED`) by using the detectionAttributes parameter, Amazon Rekognition
 * returns detailed facial attributes, such as facial landmarks (for example, location of eye and
 * mouth), facial occlusion, and other facial attributes.
 *
 * If you provide the same image, specify the same collection, and use the same external ID
 * in the `IndexFaces` operation, Amazon Rekognition doesn't save duplicate face
 * metadata.
 *
 * The input image is passed either as base64-encoded image bytes, or as a reference to an
 * image in an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations,
 * passing image bytes isn't supported. The image must be formatted as a PNG or JPEG file.
 *
 * This operation requires permissions to perform the `rekognition:IndexFaces`
 * action.
 */
export const indexFaces: API.OperationMethod<
  IndexFacesRequest,
  IndexFacesResponse,
  IndexFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      Image: i_Image,
      ExternalImageId: 0,
      DetectionAttributes: 0,
      MaxFaces: 0,
      QualityFilter: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IndexFaces",
})) as any;

export type ListCollectionsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns list of collection IDs in your account. If the result is truncated, the
 * response also provides a `NextToken` that you can use in the subsequent request to
 * fetch the next set of collection IDs.
 *
 * For an example, see Listing collections in the Amazon Rekognition Developer
 * Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:ListCollections` action.
 */
export const listCollections: API.PaginatedOperationMethod<
  ListCollectionsRequest,
  ListCollectionsResponse,
  ListCollectionsError,
  Credentials | HttpClient.HttpClient,
  CollectionId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CollectionIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Lists the entries (images) within a dataset. An entry is a
 * JSON Line that contains the information for a single image, including
 * the image location, assigned labels, and object location bounding boxes. For
 * more information, see Creating a manifest file.
 *
 * JSON Lines in the response include information about non-terminal
 * errors found in the dataset.
 * Non terminal errors are reported in `errors` lists within each JSON Line. The
 * same information is reported in the training and testing validation result manifests that
 * Amazon Rekognition Custom Labels creates during model training.
 *
 * You can filter the response in variety of ways, such as choosing which labels to return and returning JSON Lines created after a specific date.
 *
 * This operation requires permissions to perform the `rekognition:ListDatasetEntries` action.
 */
export const listDatasetEntries: API.PaginatedOperationMethod<
  ListDatasetEntriesRequest,
  ListDatasetEntriesResponse,
  ListDatasetEntriesError,
  Credentials | HttpClient.HttpClient,
  DatasetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      DatasetArn: 0,
      ContainsLabels: 0,
      Labeled: 0,
      SourceRefContains: 0,
      HasErrors: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetEntries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetLabelsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Lists the labels in a dataset. Amazon Rekognition Custom Labels uses labels to describe images. For more information, see
 * Labeling images.
 *
 * Lists the labels in a dataset. Amazon Rekognition Custom Labels uses labels to describe images. For more information, see Labeling images
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 */
export const listDatasetLabels: API.PaginatedOperationMethod<
  ListDatasetLabelsRequest,
  ListDatasetLabelsResponse,
  ListDatasetLabelsError,
  Credentials | HttpClient.HttpClient,
  DatasetLabelDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DatasetArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetLabelDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns metadata for faces in the specified collection. This metadata
 * includes information such as the bounding box coordinates, the confidence (that the bounding
 * box contains a face), and face ID. For an example, see Listing Faces in a Collection in the
 * Amazon Rekognition Developer Guide.
 *
 * This operation requires permissions to perform the `rekognition:ListFaces`
 * action.
 */
export const listFaces: API.PaginatedOperationMethod<
  ListFacesRequest,
  ListFacesResponse,
  ListFacesError,
  Credentials | HttpClient.HttpClient,
  Face
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      NextToken: 0,
      MaxResults: 0,
      UserId: 0,
      FaceIds: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Faces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaAnalysisJobsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of media analysis jobs. Results are sorted by `CreationTimestamp` in descending order.
 */
export const listMediaAnalysisJobs: API.PaginatedOperationMethod<
  ListMediaAnalysisJobsRequest,
  ListMediaAnalysisJobsResponse,
  ListMediaAnalysisJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      MediaAnalysisJobs: D.list({
        CreationTimestamp: D.ts,
        CompletionTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaAnalysisJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProjectPoliciesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Gets a list of the project policies attached to a project.
 *
 * To attach a project policy to a project, call PutProjectPolicy. To remove a project policy from a project, call DeleteProjectPolicy.
 *
 * This operation requires permissions to perform the `rekognition:ListProjectPolicies` action.
 */
export const listProjectPolicies: API.PaginatedOperationMethod<
  ListProjectPoliciesRequest,
  ListProjectPoliciesResponse,
  ListProjectPoliciesError,
  Credentials | HttpClient.HttpClient,
  ProjectPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ProjectArn: 0, NextToken: 0, MaxResults: 0 },
    output: {
      ProjectPolicies: D.list({
        CreationTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamProcessorsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of stream processors that you have created with CreateStreamProcessor.
 */
export const listStreamProcessors: API.PaginatedOperationMethod<
  ListStreamProcessorsRequest,
  ListStreamProcessorsResponse,
  ListStreamProcessorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamProcessors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of tags in an Amazon Rekognition collection, stream processor, or Custom Labels
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:ListTagsForResource` action.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListUsersError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns metadata of the User such as `UserID` in the specified collection.
 * Anonymous User (to reserve faces without any identity) is not returned as part of this
 * request. The results are sorted by system generated primary key ID. If the response is
 * truncated, `NextToken` is returned in the response that can be used in the
 * subsequent request to retrieve the next set of identities.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CollectionId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
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

export type PutProjectPolicyError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidPolicyRevisionIdException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Attaches a project policy to a Amazon Rekognition Custom Labels project in a trusting AWS account. A
 * project policy specifies that a trusted AWS account can copy a model version from a
 * trusting AWS account to a project in the trusted AWS account. To copy a model version
 * you use the CopyProjectVersion operation. Only applies to Custom Labels
 * projects.
 *
 * For more information about the format of a project policy document, see Attaching a project policy (SDK)
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * The response from `PutProjectPolicy` is a revision ID for the project policy.
 * You can attach multiple project policies to a project. You can also update an existing
 * project policy by specifying the policy revision ID of the existing policy.
 *
 * To remove a project policy from a project, call DeleteProjectPolicy.
 * To get a list of project policies attached to a project, call ListProjectPolicies.
 *
 * You copy a model version by calling CopyProjectVersion.
 *
 * This operation requires permissions to perform the `rekognition:PutProjectPolicy` action.
 */
export const putProjectPolicy: API.OperationMethod<
  PutProjectPolicyRequest,
  PutProjectPolicyResponse,
  PutProjectPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProjectArn: 0,
      PolicyName: 0,
      PolicyRevisionId: 0,
      PolicyDocument: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidPolicyRevisionIdException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProjectPolicy",
})) as any;

export type RecognizeCelebritiesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns an array of celebrities recognized in the input image. For more
 * information, see Recognizing celebrities in the Amazon Rekognition Developer Guide.
 *
 * `RecognizeCelebrities` returns the 64 largest faces in the image. It lists
 * the recognized celebrities in the `CelebrityFaces` array and any unrecognized faces
 * in the `UnrecognizedFaces` array. `RecognizeCelebrities` doesn't return
 * celebrities whose faces aren't among the largest 64 faces in the image.
 *
 * For each celebrity recognized, `RecognizeCelebrities` returns a
 * `Celebrity` object. The `Celebrity` object contains the celebrity
 * name, ID, URL links to additional information, match confidence, and a
 * `ComparedFace` object that you can use to locate the celebrity's face on the
 * image.
 *
 * Amazon Rekognition doesn't retain information about which images a celebrity has been recognized
 * in. Your application must store this information and use the `Celebrity` ID
 * property as a unique identifier for the celebrity. If you don't store the celebrity name or
 * additional information URLs returned by `RecognizeCelebrities`, you will need the
 * ID to identify the celebrity in a call to the GetCelebrityInfo
 * operation.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * For an example, see Recognizing celebrities in an image in the Amazon Rekognition
 * Developer Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:RecognizeCelebrities` operation.
 */
export const recognizeCelebrities: API.OperationMethod<
  RecognizeCelebritiesRequest,
  RecognizeCelebritiesResponse,
  RecognizeCelebritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Image: i_Image } },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeCelebrities",
})) as any;

export type SearchFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * For a given input face ID, searches for matching faces in the collection the face
 * belongs to. You get a face ID when you add a face to the collection using the IndexFaces operation. The operation compares the features of the input face with
 * faces in the specified collection.
 *
 * You can also search faces without indexing faces by using the
 * `SearchFacesByImage` operation.
 *
 * The operation response returns an array of faces that match, ordered by similarity
 * score with the highest similarity first. More specifically, it is an array of metadata for
 * each face match that is found. Along with the metadata, the response also includes a
 * `confidence` value for each face match, indicating the confidence that the
 * specific face matches the input face.
 *
 * For an example, see Searching for a face using its face ID in the Amazon Rekognition
 * Developer Guide.
 *
 * This operation requires permissions to perform the `rekognition:SearchFaces`
 * action.
 */
export const searchFaces: API.OperationMethod<
  SearchFacesRequest,
  SearchFacesResponse,
  SearchFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CollectionId: 0, FaceId: 0, MaxFaces: 0, FaceMatchThreshold: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFaces",
})) as any;

export type SearchFacesByImageError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * For a given input image, first detects the largest face in the image, and then searches
 * the specified collection for matching faces. The operation compares the features of the input
 * face with faces in the specified collection.
 *
 * To search for all faces in an input image, you might first call the IndexFaces operation, and then use the face IDs returned in subsequent calls
 * to the SearchFaces operation.
 *
 * You can also call the `DetectFaces` operation and use the bounding boxes
 * in the response to make face crops, which then you can pass in to the
 * `SearchFacesByImage` operation.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * The response returns an array of faces that match, ordered by similarity score with
 * the highest similarity first. More specifically, it is an array of metadata for each face
 * match found. Along with the metadata, the response also includes a `similarity`
 * indicating how similar the face is to the input face. In the response, the operation also
 * returns the bounding box (and a confidence level that the bounding box contains a face) of the
 * face that Amazon Rekognition used for the input image.
 *
 * If no faces are detected in the input image, `SearchFacesByImage` returns an
 * `InvalidParameterException` error.
 *
 * For an example, Searching for a Face Using an Image in the Amazon Rekognition
 * Developer Guide.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. Use `QualityFilter` to set the quality bar for filtering by specifying
 * `LOW`, `MEDIUM`, or `HIGH`. If you do not want to filter
 * detected faces, specify `NONE`. The default value is `NONE`.
 *
 * To use quality filtering, you need a collection associated with version 3 of the face
 * model or higher. To get the version of the face model associated with a collection, call
 * DescribeCollection.
 *
 * This operation requires permissions to perform the
 * `rekognition:SearchFacesByImage` action.
 */
export const searchFacesByImage: API.OperationMethod<
  SearchFacesByImageRequest,
  SearchFacesByImageResponse,
  SearchFacesByImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      Image: i_Image,
      MaxFaces: 0,
      FaceMatchThreshold: 0,
      QualityFilter: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFacesByImage",
})) as any;

export type SearchUsersError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for UserIDs within a collection based on a `FaceId` or
 * `UserId`. This API can be used to find the closest UserID (with a highest
 * similarity) to associate a face. The request must be provided with either `FaceId`
 * or `UserId`. The operation returns an array of UserID that match the
 * `FaceId` or `UserId`, ordered by similarity score with the highest
 * similarity first.
 */
export const searchUsers: API.OperationMethod<
  SearchUsersRequest,
  SearchUsersResponse,
  SearchUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      UserId: 0,
      FaceId: 0,
      UserMatchThreshold: 0,
      MaxUsers: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsers",
})) as any;

export type SearchUsersByImageError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for UserIDs using a supplied image. It first detects the largest face in the
 * image, and then searches a specified collection for matching UserIDs.
 *
 * The operation returns an array of UserIDs that match the face in the supplied image,
 * ordered by similarity score with the highest similarity first. It also returns a bounding box
 * for the face found in the input image.
 *
 * Information about faces detected in the supplied image, but not used for the search, is
 * returned in an array of `UnsearchedFace` objects. If no valid face is detected in
 * the image, the response will contain an empty `UserMatches` list and no
 * `SearchedFace` object.
 */
export const searchUsersByImage: API.OperationMethod<
  SearchUsersByImageRequest,
  SearchUsersByImageResponse,
  SearchUsersByImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CollectionId: 0,
      Image: i_Image,
      UserMatchThreshold: 0,
      MaxUsers: 0,
      QualityFilter: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsersByImage",
})) as any;

export type StartCelebrityRecognitionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous recognition of celebrities in a stored video.
 *
 * Amazon Rekognition Video can detect celebrities in a video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video.
 * `StartCelebrityRecognition`
 * returns a job identifier (`JobId`) which you use to get the results of the analysis.
 * When celebrity recognition analysis is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the results of the celebrity recognition analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetCelebrityRecognition and pass the job identifier
 * (`JobId`) from the initial call to `StartCelebrityRecognition`.
 *
 * For more information, see Recognizing celebrities in the Amazon Rekognition Developer Guide.
 */
export const startCelebrityRecognition: API.OperationMethod<
  StartCelebrityRecognitionRequest,
  StartCelebrityRecognitionResponse,
  StartCelebrityRecognitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCelebrityRecognition",
})) as any;

export type StartContentModerationError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of inappropriate, unwanted, or offensive content in a stored video. For a list of moderation labels in Amazon Rekognition, see
 * Using the image and video moderation APIs.
 *
 * Amazon Rekognition Video can moderate content in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartContentModeration`
 * returns a job identifier (`JobId`) which you use to get the results of the analysis.
 * When content analysis is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the content analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetContentModeration and pass the job identifier
 * (`JobId`) from the initial call to `StartContentModeration`.
 *
 * For more information, see Moderating content in the Amazon Rekognition Developer Guide.
 */
export const startContentModeration: API.OperationMethod<
  StartContentModerationRequest,
  StartContentModerationResponse,
  StartContentModerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      MinConfidence: 0,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentModeration",
})) as any;

export type StartFaceDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of faces in a stored video.
 *
 * Amazon Rekognition Video can detect faces in a video stored in an Amazon S3 bucket.
 * Use Video to specify the bucket name and the filename of the video.
 * `StartFaceDetection` returns a job identifier (`JobId`) that you
 * use to get the results of the operation.
 * When face detection is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the results of the face detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetFaceDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceDetection`.
 *
 * For more information, see Detecting faces in a stored video in the
 * Amazon Rekognition Developer Guide.
 */
export const startFaceDetection: API.OperationMethod<
  StartFaceDetectionRequest,
  StartFaceDetectionResponse,
  StartFaceDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      FaceAttributes: 0,
      JobTag: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFaceDetection",
})) as any;

export type StartFaceSearchError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts the asynchronous search for faces in a collection that match the faces of persons detected in a stored video.
 *
 * The video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartFaceSearch`
 * returns a job identifier (`JobId`) which you use to get the search results once the search has completed.
 * When searching is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the search results, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetFaceSearch and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceSearch`. For more information, see
 * Searching stored videos for faces.
 */
export const startFaceSearch: API.OperationMethod<
  StartFaceSearchRequest,
  StartFaceSearchResponse,
  StartFaceSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      FaceMatchThreshold: 0,
      CollectionId: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFaceSearch",
})) as any;

export type StartLabelDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of labels in a stored video.
 *
 * Amazon Rekognition Video can detect labels in a video. Labels are instances of real-world entities.
 * This includes objects like flower, tree, and table; events like
 * wedding, graduation, and birthday party; concepts like landscape, evening, and nature; and activities
 * like a person getting out of a car or a person skiing.
 *
 * The video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video.
 * `StartLabelDetection` returns a job identifier (`JobId`) which you use to get the
 * results of the operation. When label detection is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the label detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetLabelDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartLabelDetection`.
 *
 * *Optional Parameters*
 *
 * `StartLabelDetection` has the `GENERAL_LABELS` Feature applied by
 * default. This feature allows you to provide filtering criteria to the `Settings`
 * parameter. You can filter with sets of individual labels or with label categories. You can
 * specify inclusive filters, exclusive filters, or a combination of inclusive and exclusive
 * filters. For more information on filtering, see Detecting labels in a
 * video.
 *
 * You can specify `MinConfidence` to control the confidence threshold for the
 * labels returned. The default is 50.
 */
export const startLabelDetection: API.OperationMethod<
  StartLabelDetectionRequest,
  StartLabelDetectionResponse,
  StartLabelDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      MinConfidence: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
      Features: 0,
      Settings: { GeneralLabels: i_GeneralLabelsSettings },
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLabelDetection",
})) as any;

export type StartMediaAnalysisJobError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidManifestException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a new media analysis job. Accepts a manifest file in an Amazon S3 bucket. The
 * output is a manifest file and a summary of the manifest stored in the Amazon S3 bucket.
 */
export const startMediaAnalysisJob: API.OperationMethod<
  StartMediaAnalysisJobRequest,
  StartMediaAnalysisJobResponse,
  StartMediaAnalysisJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      JobName: 0,
      OperationsConfig: {
        DetectModerationLabels: { MinConfidence: 0, ProjectVersion: 0 },
      },
      Input: { S3Object: i_S3Object },
      OutputConfig: { S3Bucket: 0, S3KeyPrefix: 0 },
      KmsKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidManifestException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMediaAnalysisJob",
})) as any;

export type StartPersonTrackingError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * *End of support notice:* On October 31, 2025, AWS will discontinue
 * support for Amazon Rekognition People Pathing. After October 31, 2025, you will no
 * longer be able to use the Rekognition People Pathing capability. For more information,
 * visit this blog post.
 *
 * Starts the asynchronous tracking of a person's path in a stored video.
 *
 * Amazon Rekognition Video can track the path of people in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartPersonTracking`
 * returns a job identifier (`JobId`) which you use to get the results of the operation.
 * When label detection is finished, Amazon Rekognition publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the person detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetPersonTracking and pass the job identifier
 * (`JobId`) from the initial call to `StartPersonTracking`.
 */
export const startPersonTracking: API.OperationMethod<
  StartPersonTrackingRequest,
  StartPersonTrackingResponse,
  StartPersonTrackingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPersonTracking",
})) as any;

export type StartProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Starts the running of the version of a model. Starting a model takes a while to
 * complete. To check the current state of the model, use DescribeProjectVersions.
 *
 * Once the model is running, you can detect custom labels in new images by calling
 * DetectCustomLabels.
 *
 * You are charged for the amount of time that the model is running. To stop a running
 * model, call StopProjectVersion.
 *
 * This operation requires permissions to perform the
 * `rekognition:StartProjectVersion` action.
 */
export const startProjectVersion: API.OperationMethod<
  StartProjectVersionRequest,
  StartProjectVersionResponse,
  StartProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProjectVersionArn: 0, MinInferenceUnits: 0, MaxInferenceUnits: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProjectVersion",
})) as any;

export type StartSegmentDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of segment detection in a stored video.
 *
 * Amazon Rekognition Video can detect segments in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name and
 * the filename of the video. `StartSegmentDetection` returns a job identifier (`JobId`) which you use to get
 * the results of the operation. When segment detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 * that you specify in `NotificationChannel`.
 *
 * You can use the `Filters` (StartSegmentDetectionFilters)
 * input parameter to specify the minimum detection confidence returned in the response.
 * Within `Filters`, use `ShotFilter` (StartShotDetectionFilter)
 * to filter detected shots. Use `TechnicalCueFilter` (StartTechnicalCueDetectionFilter)
 * to filter technical cues.
 *
 * To get the results of the segment detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. if so, call GetSegmentDetection and pass the job identifier (`JobId`)
 * from the initial call to `StartSegmentDetection`.
 *
 * For more information, see Detecting video segments in stored video in the Amazon Rekognition Developer Guide.
 */
export const startSegmentDetection: API.OperationMethod<
  StartSegmentDetectionRequest,
  StartSegmentDetectionResponse,
  StartSegmentDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
      Filters: {
        TechnicalCueFilter: {
          MinSegmentConfidence: 0,
          BlackFrame: { MaxPixelThreshold: 0, MinCoveragePercentage: 0 },
        },
        ShotFilter: { MinSegmentConfidence: 0 },
      },
      SegmentTypes: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSegmentDetection",
})) as any;

export type StartStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts processing a stream processor. You create a stream processor by calling CreateStreamProcessor.
 * To tell `StartStreamProcessor` which stream processor to start, use the value of the `Name` field specified in the call to
 * `CreateStreamProcessor`.
 *
 * If you are using a label detection stream processor to detect labels, you need to provide a `Start selector` and a `Stop selector` to determine the length of the stream processing time.
 */
export const startStreamProcessor: API.OperationMethod<
  StartStreamProcessorRequest,
  StartStreamProcessorResponse,
  StartStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      StartSelector: {
        KVSStreamStartSelector: { ProducerTimestamp: 0, FragmentNumber: 0 },
      },
      StopSelector: { MaxDurationInSeconds: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartStreamProcessor",
})) as any;

export type StartTextDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of text in a stored video.
 *
 * Amazon Rekognition Video can detect text in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name and
 * the filename of the video. `StartTextDetection` returns a job identifier (`JobId`) which you use to get
 * the results of the operation. When text detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 * that you specify in `NotificationChannel`.
 *
 * To get the results of the text detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. if so, call GetTextDetection and pass the job identifier (`JobId`)
 * from the initial call to `StartTextDetection`.
 */
export const startTextDetection: API.OperationMethod<
  StartTextDetectionRequest,
  StartTextDetectionResponse,
  StartTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Video: i_Video,
      ClientRequestToken: 0,
      NotificationChannel: i_NotificationChannel,
      JobTag: 0,
      Filters: {
        WordFilter: i_DetectionFilter,
        RegionsOfInterest: D.list(i_RegionOfInterest),
      },
    },
  },
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTextDetection",
})) as any;

export type StopProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Stops a running model. The operation might take a while to complete. To check the
 * current status, call DescribeProjectVersions. Only applies to Custom
 * Labels projects.
 *
 * This operation requires permissions to perform the `rekognition:StopProjectVersion` action.
 */
export const stopProjectVersion: API.OperationMethod<
  StopProjectVersionRequest,
  StopProjectVersionResponse,
  StopProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProjectVersionArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopProjectVersion",
})) as any;

export type StopStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Stops a running stream processor that was created by CreateStreamProcessor.
 */
export const stopStreamProcessor: API.OperationMethod<
  StopStreamProcessorRequest,
  StopStreamProcessorResponse,
  StopStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStreamProcessor",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds one or more key-value tags to an Amazon Rekognition collection, stream processor, or Custom
 * Labels model. For more information, see Tagging AWS
 * Resources.
 *
 * This operation requires permissions to perform the `rekognition:TagResource`
 * action.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from an Amazon Rekognition collection, stream processor, or Custom Labels
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:UntagResource` action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Adds or updates one or more entries (images) in a dataset. An entry is a JSON Line which contains the
 * information for a single image, including
 * the image location, assigned labels, and object location bounding boxes. For more information,
 * see Image-Level labels in manifest files and Object localization in manifest files in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * If the `source-ref` field in the JSON line references an existing image, the existing image in the dataset
 * is updated.
 * If `source-ref` field doesn't reference an existing image, the image is added as a new image to the dataset.
 *
 * You specify the changes that you want to make in the `Changes` input parameter.
 * There isn't a limit to the number JSON Lines that you can change, but the size of `Changes` must be less
 * than 5MB.
 *
 * `UpdateDatasetEntries` returns immediatly, but the dataset update might take a while to complete.
 * Use DescribeDataset to check the
 * current status. The dataset updated successfully if the value of `Status` is
 * `UPDATE_COMPLETE`.
 *
 * To check if any non-terminal errors occured, call ListDatasetEntries
 * and check for the presence of `errors` lists in the JSON Lines.
 *
 * Dataset update fails if a terminal error occurs (`Status` = `UPDATE_FAILED`).
 * Currently, you can't access the terminal error information from the Amazon Rekognition Custom Labels SDK.
 *
 * This operation requires permissions to perform the `rekognition:UpdateDatasetEntries` action.
 */
export const updateDatasetEntries: API.OperationMethod<
  UpdateDatasetEntriesRequest,
  UpdateDatasetEntriesResponse,
  UpdateDatasetEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetArn: 0, Changes: { GroundTruth: 0 } },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetEntries",
})) as any;

export type UpdateStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to update a stream processor. You can change some settings and regions of interest and delete certain parameters.
 */
export const updateStreamProcessor: API.OperationMethod<
  UpdateStreamProcessorRequest,
  UpdateStreamProcessorResponse,
  UpdateStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      SettingsForUpdate: {
        ConnectedHomeForUpdate: { Labels: 0, MinConfidence: 0 },
      },
      RegionsOfInterestForUpdate: D.list(i_RegionOfInterest),
      DataSharingPreferenceForUpdate: i_StreamProcessorDataSharingPreference,
      ParametersToDelete: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamProcessor",
})) as any;

const i_Asset: D.LazyStruct = () => ({
  GroundTruthManifest: i_GroundTruthManifest,
});
const i_DetectionFilter: D.LazyStruct = () => ({
  MinConfidence: 0,
  MinBoundingBoxHeight: 0,
  MinBoundingBoxWidth: 0,
});
const i_GeneralLabelsSettings: D.LazyStruct = () => ({
  LabelInclusionFilters: 0,
  LabelExclusionFilters: 0,
  LabelCategoryInclusionFilters: 0,
  LabelCategoryExclusionFilters: 0,
});
const i_GroundTruthManifest: D.LazyStruct = () => ({ S3Object: i_S3Object });
const i_Image: D.LazyStruct = () => ({ Bytes: 0, S3Object: i_S3Object });
const i_NotificationChannel: D.LazyStruct = () => ({
  SNSTopicArn: 0,
  RoleArn: 0,
});
const i_OutputConfig: D.LazyStruct = () => ({ S3Bucket: 0, S3KeyPrefix: 0 });
const i_RegionOfInterest: D.LazyStruct = () => ({
  BoundingBox: { Width: 0, Height: 0, Left: 0, Top: 0 },
  Polygon: D.list({ X: 0, Y: 0 }),
});
const i_S3Object: D.LazyStruct = () => ({ Bucket: 0, Name: 0, Version: 0 });
const i_StreamProcessorDataSharingPreference: D.LazyStruct = () => ({
  OptIn: 0,
});
const i_Video: D.LazyStruct = () => ({ S3Object: i_S3Object });
const o_AuditImage: D.LazyStruct = () => ({ Bytes: D.secretBlob });
