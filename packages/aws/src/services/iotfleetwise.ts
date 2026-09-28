import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "IoTFleetWise",
  target: "IoTAutobahnControlPlane",
  version: "2021-06-17",
  sigv4: "iotfleetwise",
  protocol: awsJson1_0Protocol,
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
                `https://iotfleetwise-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iotfleetwise-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resource: string;
    readonly resourceType: string;
  }> {}
export class DecoderManifestValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DecoderManifestValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly invalidSignals?: InvalidSignalDecoder[];
    readonly invalidNetworkInterfaces?: InvalidNetworkInterface[];
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class InvalidNodeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNodeException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly invalidNodes?: Node[];
    readonly reason?: string;
    readonly message?: string;
  }> {}
export class InvalidSignalsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSignalsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly invalidSignals?: InvalidSignal[] }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly quotaCode?: string;
    readonly serviceCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type VehicleName = string;
export type FleetId = string;
export interface AssociateVehicleFleetRequest {
  vehicleName: string;
  fleetId: string;
}
export interface AssociateVehicleFleetResponse {}
export type Arn = string;
export type AttributeName = string;
export type AttributeValue = string;
export type AttributesMap = { [key: string]: string | undefined };
export type VehicleAssociationBehavior =
  | "CreateIotThing"
  | "ValidateIotThingExists"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type ResourceIdentifier = string;
export type TimeUnit =
  | "MILLISECOND"
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | (string & {});
export type PositiveInteger = number;
export interface TimePeriod {
  unit: TimeUnit;
  value: number;
}
export interface PeriodicStateTemplateUpdateStrategy {
  stateTemplateUpdateRate: TimePeriod;
}
export interface OnChangeStateTemplateUpdateStrategy {}
export type StateTemplateUpdateStrategy =
  | { periodic: PeriodicStateTemplateUpdateStrategy; onChange?: never }
  | { periodic?: never; onChange: OnChangeStateTemplateUpdateStrategy };
export interface StateTemplateAssociation {
  identifier: string;
  stateTemplateUpdateStrategy: StateTemplateUpdateStrategy;
}
export type StateTemplateAssociations = StateTemplateAssociation[];
export interface CreateVehicleRequestItem {
  vehicleName: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  attributes?: { [key: string]: string | undefined };
  associationBehavior?: VehicleAssociationBehavior;
  tags?: Tag[];
  stateTemplates?: StateTemplateAssociation[];
}
export type CreateVehicleRequestItems = CreateVehicleRequestItem[];
export interface BatchCreateVehicleRequest {
  vehicles: CreateVehicleRequestItem[];
}
export interface CreateVehicleResponseItem {
  vehicleName?: string;
  arn?: string;
  thingArn?: string;
}
export type CreateVehicleResponses = CreateVehicleResponseItem[];
export interface CreateVehicleError_ {
  vehicleName?: string;
  code?: string;
  message?: string;
}
export type CreateVehicleErrors = CreateVehicleError_[];
export interface BatchCreateVehicleResponse {
  vehicles?: CreateVehicleResponseItem[];
  errors?: CreateVehicleError_[];
}
export type UpdateMode = "Overwrite" | "Merge" | (string & {});
export type StateTemplateAssociationIdentifiers = string[];
export interface UpdateVehicleRequestItem {
  vehicleName: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  attributeUpdateMode?: UpdateMode;
  stateTemplatesToAdd?: StateTemplateAssociation[];
  stateTemplatesToRemove?: string[];
  stateTemplatesToUpdate?: StateTemplateAssociation[];
}
export type UpdateVehicleRequestItems = UpdateVehicleRequestItem[];
export interface BatchUpdateVehicleRequest {
  vehicles: UpdateVehicleRequestItem[];
}
export interface UpdateVehicleResponseItem {
  vehicleName?: string;
  arn?: string;
}
export type UpdateVehicleResponseItems = UpdateVehicleResponseItem[];
export interface UpdateVehicleError_ {
  vehicleName?: string;
  code?: number;
  message?: string;
}
export type UpdateVehicleErrors = UpdateVehicleError_[];
export interface BatchUpdateVehicleResponse {
  vehicles?: UpdateVehicleResponseItem[];
  errors?: UpdateVehicleError_[];
}
export type CampaignName = string;
export type Description = string;
export type Uint32 = number;
export type DiagnosticsMode = "OFF" | "SEND_ACTIVE_DTCS" | (string & {});
export type SpoolingMode = "OFF" | "TO_DISK" | (string & {});
export type Compression = "OFF" | "SNAPPY" | (string & {});
export type Priority = number;
export type WildcardSignalName = string;
export type MaxSampleCount = number;
export type DataPartitionId = string;
export interface SignalInformation {
  name: string;
  maxSampleCount?: number;
  minimumSamplingIntervalMs?: number;
  dataPartitionId?: string;
}
export type SignalInformationList = SignalInformation[];
export type CollectionPeriodMs = number;
export interface TimeBasedCollectionScheme {
  periodMs: number;
}
export type EventExpression = string | redacted.Redacted<string>;
export type TriggerMode = "ALWAYS" | "RISING_EDGE" | (string & {});
export type LanguageVersion = number;
export interface ConditionBasedCollectionScheme {
  expression: string | redacted.Redacted<string>;
  minimumTriggerIntervalMs?: number;
  triggerMode?: TriggerMode;
  conditionLanguageVersion?: number;
}
export type CollectionScheme =
  | {
      timeBasedCollectionScheme: TimeBasedCollectionScheme;
      conditionBasedCollectionScheme?: never;
    }
  | {
      timeBasedCollectionScheme?: never;
      conditionBasedCollectionScheme: ConditionBasedCollectionScheme;
    };
export type NodePath = string;
export type DataExtraDimensionNodePathList = string[];
export type S3BucketArn = string;
export type DataFormat = "JSON" | "PARQUET" | (string & {});
export type StorageCompressionFormat = "NONE" | "GZIP" | (string & {});
export type Prefix = string;
export interface S3Config {
  bucketArn: string;
  dataFormat?: DataFormat;
  storageCompressionFormat?: StorageCompressionFormat;
  prefix?: string;
}
export type TimestreamTableArn = string;
export type IAMRoleArn = string;
export interface TimestreamConfig {
  timestreamTableArn: string;
  executionRoleArn: string;
}
export type MqttTopicArn = string;
export interface MqttTopicConfig {
  mqttTopicArn: string;
  executionRoleArn: string;
}
export type DataDestinationConfig =
  | { s3Config: S3Config; timestreamConfig?: never; mqttTopicConfig?: never }
  | {
      s3Config?: never;
      timestreamConfig: TimestreamConfig;
      mqttTopicConfig?: never;
    }
  | {
      s3Config?: never;
      timestreamConfig?: never;
      mqttTopicConfig: MqttTopicConfig;
    };
export type DataDestinationConfigs = DataDestinationConfig[];
export type StorageMaximumSizeUnit = "MB" | "GB" | "TB" | (string & {});
export type StorageMaximumSizeValue = number;
export interface StorageMaximumSize {
  unit: StorageMaximumSizeUnit;
  value: number;
}
export type StorageLocation = string | redacted.Redacted<string>;
export type StorageMinimumTimeToLiveUnit =
  | "HOURS"
  | "DAYS"
  | "WEEKS"
  | (string & {});
export type StorageMinimumTimeToLiveValue = number;
export interface StorageMinimumTimeToLive {
  unit: StorageMinimumTimeToLiveUnit;
  value: number;
}
export interface DataPartitionStorageOptions {
  maximumSize: StorageMaximumSize;
  storageLocation: string | redacted.Redacted<string>;
  minimumTimeToLive: StorageMinimumTimeToLive;
}
export interface DataPartitionUploadOptions {
  expression: string | redacted.Redacted<string>;
  conditionLanguageVersion?: number;
}
export interface DataPartition {
  id: string;
  storageOptions: DataPartitionStorageOptions;
  uploadOptions?: DataPartitionUploadOptions;
}
export type DataPartitions = DataPartition[];
export type PositiveLong = number;
export interface TimeBasedSignalFetchConfig {
  executionFrequencyMs: number;
}
export type FetchConfigEventExpression = string | redacted.Redacted<string>;
export interface ConditionBasedSignalFetchConfig {
  conditionExpression: string | redacted.Redacted<string>;
  triggerMode: TriggerMode;
}
export type SignalFetchConfig =
  | { timeBased: TimeBasedSignalFetchConfig; conditionBased?: never }
  | { timeBased?: never; conditionBased: ConditionBasedSignalFetchConfig };
export type ActionEventExpression = string | redacted.Redacted<string>;
export type EventExpressionList = (string | redacted.Redacted<string>)[];
export interface SignalFetchInformation {
  fullyQualifiedName: string;
  signalFetchConfig: SignalFetchConfig;
  conditionLanguageVersion?: number;
  actions: (string | redacted.Redacted<string>)[];
}
export type SignalFetchInformationList = SignalFetchInformation[];
export interface CreateCampaignRequest {
  name: string;
  description?: string;
  signalCatalogArn: string;
  targetArn: string;
  startTime?: Date;
  expiryTime?: Date;
  postTriggerCollectionDuration?: number;
  diagnosticsMode?: DiagnosticsMode;
  spoolingMode?: SpoolingMode;
  compression?: Compression;
  priority?: number;
  signalsToCollect?: SignalInformation[];
  collectionScheme: CollectionScheme;
  dataExtraDimensions?: string[];
  tags?: Tag[];
  dataDestinationConfigs?: DataDestinationConfig[];
  dataPartitions?: DataPartition[];
  signalsToFetch?: SignalFetchInformation[];
}
export type CampaignArn = string;
export interface CreateCampaignResponse {
  name?: string;
  arn?: string;
}
export type ResourceName = string;
export type FullyQualifiedName = string;
export type SignalDecoderType =
  | "CAN_SIGNAL"
  | "OBD_SIGNAL"
  | "MESSAGE_SIGNAL"
  | "CUSTOM_DECODING_SIGNAL"
  | (string & {});
export type InterfaceId = string;
export type NonNegativeInteger = number;
export type CanSignalName = string;
export type SignalValueType = "INTEGER" | "FLOATING_POINT" | (string & {});
export interface CanSignal {
  messageId: number;
  isBigEndian: boolean;
  isSigned: boolean;
  startBit: number;
  offset: number;
  factor: number;
  length: number;
  name?: string;
  signalValueType?: SignalValueType;
}
export type ObdByteLength = number;
export type ObdBitmaskLength = number;
export interface ObdSignal {
  pidResponseLength: number;
  serviceMode: number;
  pid: number;
  scaling: number;
  offset: number;
  startByte: number;
  byteLength: number;
  bitRightShift?: number;
  bitMaskLength?: number;
  isSigned?: boolean;
  signalValueType?: SignalValueType;
}
export type TopicName = string;
export type ROS2PrimitiveType =
  | "BOOL"
  | "BYTE"
  | "CHAR"
  | "FLOAT32"
  | "FLOAT64"
  | "INT8"
  | "UINT8"
  | "INT16"
  | "UINT16"
  | "INT32"
  | "UINT32"
  | "INT64"
  | "UINT64"
  | "STRING"
  | "WSTRING"
  | (string & {});
export type MaxStringSize = number;
export interface ROS2PrimitiveMessageDefinition {
  primitiveType: ROS2PrimitiveType;
  offset?: number;
  scaling?: number;
  upperBound?: number;
}
export type PrimitiveMessageDefinition = {
  ros2PrimitiveMessageDefinition: ROS2PrimitiveMessageDefinition;
};
export type StructureMessageName = string;
export type StructuredMessageListType =
  | "FIXED_CAPACITY"
  | "DYNAMIC_UNBOUNDED_CAPACITY"
  | "DYNAMIC_BOUNDED_CAPACITY"
  | (string & {});
export interface StructuredMessageListDefinition {
  name: string;
  memberType: StructuredMessage;
  listType: StructuredMessageListType;
  capacity?: number;
}
export interface StructuredMessageFieldNameAndDataTypePair {
  fieldName: string;
  dataType: StructuredMessage;
}
export type StructuredMessageDefinition =
  StructuredMessageFieldNameAndDataTypePair[];
export type StructuredMessage =
  | {
      primitiveMessageDefinition: PrimitiveMessageDefinition;
      structuredMessageListDefinition?: never;
      structuredMessageDefinition?: never;
    }
  | {
      primitiveMessageDefinition?: never;
      structuredMessageListDefinition: StructuredMessageListDefinition;
      structuredMessageDefinition?: never;
    }
  | {
      primitiveMessageDefinition?: never;
      structuredMessageListDefinition?: never;
      structuredMessageDefinition: StructuredMessageFieldNameAndDataTypePair[];
    };
export interface MessageSignal {
  topicName: string;
  structuredMessage: StructuredMessage;
}
export type CustomDecodingId = string;
export interface CustomDecodingSignal {
  id: string;
}
export interface SignalDecoder {
  fullyQualifiedName: string;
  type: SignalDecoderType;
  interfaceId: string;
  canSignal?: CanSignal;
  obdSignal?: ObdSignal;
  messageSignal?: MessageSignal;
  customDecodingSignal?: CustomDecodingSignal;
}
export type SignalDecoders = SignalDecoder[];
export type NetworkInterfaceType =
  | "CAN_INTERFACE"
  | "OBD_INTERFACE"
  | "VEHICLE_MIDDLEWARE"
  | "CUSTOM_DECODING_INTERFACE"
  | (string & {});
export type CanInterfaceName = string;
export type ProtocolName = string;
export type ProtocolVersion = string;
export interface CanInterface {
  name: string;
  protocolName?: string;
  protocolVersion?: string;
}
export type ObdInterfaceName = string;
export type ObdStandard = string;
export interface ObdInterface {
  name: string;
  requestMessageId: number;
  obdStandard?: string;
  pidRequestIntervalSeconds?: number;
  dtcRequestIntervalSeconds?: number;
  useExtendedIds?: boolean;
  hasTransmissionEcu?: boolean;
}
export type VehicleMiddlewareName = string;
export type VehicleMiddlewareProtocol = "ROS_2" | (string & {});
export interface VehicleMiddleware {
  name: string;
  protocolName: VehicleMiddlewareProtocol;
}
export type CustomDecodingSignalInterfaceName = string;
export interface CustomDecodingInterface {
  name: string;
}
export interface NetworkInterface {
  interfaceId: string;
  type: NetworkInterfaceType;
  canInterface?: CanInterface;
  obdInterface?: ObdInterface;
  vehicleMiddleware?: VehicleMiddleware;
  customDecodingInterface?: CustomDecodingInterface;
}
export type NetworkInterfaces = NetworkInterface[];
export type DefaultForUnmappedSignalsType = "CUSTOM_DECODING" | (string & {});
export interface CreateDecoderManifestRequest {
  name: string;
  description?: string;
  modelManifestArn: string;
  signalDecoders?: SignalDecoder[];
  networkInterfaces?: NetworkInterface[];
  defaultForUnmappedSignals?: DefaultForUnmappedSignalsType;
  tags?: Tag[];
}
export interface CreateDecoderManifestResponse {
  name: string;
  arn: string;
}
export interface CreateFleetRequest {
  fleetId: string;
  description?: string;
  signalCatalogArn: string;
  tags?: Tag[];
}
export interface CreateFleetResponse {
  id: string;
  arn: string;
}
export type ListOfStrings = string[];
export interface CreateModelManifestRequest {
  name: string;
  description?: string;
  nodes: string[];
  signalCatalogArn: string;
  tags?: Tag[];
}
export interface CreateModelManifestResponse {
  name: string;
  arn: string;
}
export type Message = string;
export interface Branch {
  fullyQualifiedName: string;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
}
export type NodeDataType =
  | "INT8"
  | "UINT8"
  | "INT16"
  | "UINT16"
  | "INT32"
  | "UINT32"
  | "INT64"
  | "UINT64"
  | "BOOLEAN"
  | "FLOAT"
  | "DOUBLE"
  | "STRING"
  | "UNIX_TIMESTAMP"
  | "INT8_ARRAY"
  | "UINT8_ARRAY"
  | "INT16_ARRAY"
  | "UINT16_ARRAY"
  | "INT32_ARRAY"
  | "UINT32_ARRAY"
  | "INT64_ARRAY"
  | "UINT64_ARRAY"
  | "BOOLEAN_ARRAY"
  | "FLOAT_ARRAY"
  | "DOUBLE_ARRAY"
  | "STRING_ARRAY"
  | "UNIX_TIMESTAMP_ARRAY"
  | "UNKNOWN"
  | "STRUCT"
  | "STRUCT_ARRAY"
  | (string & {});
export interface Sensor {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export interface Actuator {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  assignedValue?: string;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export interface Attribute {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  assignedValue?: string;
  defaultValue?: string;
  deprecationMessage?: string;
  comment?: string;
}
export interface CustomStruct {
  fullyQualifiedName: string;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
}
export type NodeDataEncoding = "BINARY" | "TYPED" | (string & {});
export interface CustomProperty {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  dataEncoding?: NodeDataEncoding;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export type Node =
  | {
      branch: Branch;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor: Sensor;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator: Actuator;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute: Attribute;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct: CustomStruct;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property: CustomProperty;
    };
export type Nodes = Node[];
export interface CreateSignalCatalogRequest {
  name: string;
  description?: string;
  nodes?: Node[];
  tags?: Tag[];
}
export interface CreateSignalCatalogResponse {
  name: string;
  arn: string;
}
export type StateTemplateProperties = string[];
export type StateTemplateDataExtraDimensionNodePathList = string[];
export type StateTemplateMetadataExtraDimensionNodePathList = string[];
export interface CreateStateTemplateRequest {
  name: string;
  description?: string;
  signalCatalogArn: string;
  stateTemplateProperties: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
  tags?: Tag[];
}
export type ResourceUniqueId = string;
export interface CreateStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export interface CreateVehicleRequest {
  vehicleName: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  attributes?: { [key: string]: string | undefined };
  associationBehavior?: VehicleAssociationBehavior;
  tags?: Tag[];
  stateTemplates?: StateTemplateAssociation[];
}
export interface CreateVehicleResponse {
  vehicleName?: string;
  arn?: string;
  thingArn?: string;
}
export interface DeleteCampaignRequest {
  name: string;
}
export interface DeleteCampaignResponse {
  name?: string;
  arn?: string;
}
export interface DeleteDecoderManifestRequest {
  name: string;
}
export interface DeleteDecoderManifestResponse {
  name: string;
  arn: string;
}
export interface DeleteFleetRequest {
  fleetId: string;
}
export interface DeleteFleetResponse {
  id?: string;
  arn?: string;
}
export interface DeleteModelManifestRequest {
  name: string;
}
export interface DeleteModelManifestResponse {
  name: string;
  arn: string;
}
export interface DeleteSignalCatalogRequest {
  name: string;
}
export interface DeleteSignalCatalogResponse {
  name: string;
  arn: string;
}
export interface DeleteStateTemplateRequest {
  identifier: string;
}
export interface DeleteStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export interface DeleteVehicleRequest {
  vehicleName: string;
}
export interface DeleteVehicleResponse {
  vehicleName: string;
  arn: string;
}
export interface DisassociateVehicleFleetRequest {
  vehicleName: string;
  fleetId: string;
}
export interface DisassociateVehicleFleetResponse {}
export interface GetCampaignRequest {
  name: string;
}
export type CampaignStatus =
  | "CREATING"
  | "WAITING_FOR_APPROVAL"
  | "RUNNING"
  | "SUSPENDED"
  | (string & {});
export interface GetCampaignResponse {
  name?: string;
  arn?: string;
  description?: string;
  signalCatalogArn?: string;
  targetArn?: string;
  status?: CampaignStatus;
  startTime?: Date;
  expiryTime?: Date;
  postTriggerCollectionDuration?: number;
  diagnosticsMode?: DiagnosticsMode;
  spoolingMode?: SpoolingMode;
  compression?: Compression;
  priority?: number;
  signalsToCollect?: SignalInformation[];
  collectionScheme?: CollectionScheme;
  dataExtraDimensions?: string[];
  creationTime?: Date;
  lastModificationTime?: Date;
  dataDestinationConfigs?: DataDestinationConfig[];
  dataPartitions?: DataPartition[];
  signalsToFetch?: SignalFetchInformation[];
}
export interface GetDecoderManifestRequest {
  name: string;
}
export type ManifestStatus =
  | "ACTIVE"
  | "DRAFT"
  | "INVALID"
  | "VALIDATING"
  | (string & {});
export interface GetDecoderManifestResponse {
  name: string;
  arn: string;
  description?: string;
  modelManifestArn?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
  message?: string;
}
export interface GetEncryptionConfigurationRequest {}
export type EncryptionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILURE"
  | (string & {});
export type EncryptionType =
  | "KMS_BASED_ENCRYPTION"
  | "FLEETWISE_DEFAULT_ENCRYPTION"
  | (string & {});
export type ErrorMessage = string;
export interface GetEncryptionConfigurationResponse {
  kmsKeyId?: string;
  encryptionStatus: EncryptionStatus;
  encryptionType: EncryptionType;
  errorMessage?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
}
export interface GetFleetRequest {
  fleetId: string;
}
export interface GetFleetResponse {
  id: string;
  arn: string;
  description?: string;
  signalCatalogArn: string;
  creationTime: Date;
  lastModificationTime: Date;
}
export interface GetLoggingOptionsRequest {}
export type LogType = "OFF" | "ERROR" | (string & {});
export type CloudWatchLogGroupName = string;
export interface CloudWatchLogDeliveryOptions {
  logType: LogType;
  logGroupName?: string;
}
export interface GetLoggingOptionsResponse {
  cloudWatchLogDelivery: CloudWatchLogDeliveryOptions;
}
export interface GetModelManifestRequest {
  name: string;
}
export interface GetModelManifestResponse {
  name: string;
  arn: string;
  description?: string;
  signalCatalogArn?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export interface GetRegisterAccountStatusRequest {}
export type CustomerAccountId = string;
export type RegistrationStatus =
  | "REGISTRATION_PENDING"
  | "REGISTRATION_SUCCESS"
  | "REGISTRATION_FAILURE"
  | (string & {});
export type TimestreamDatabaseName = string;
export type TimestreamTableName = string;
export interface TimestreamRegistrationResponse {
  timestreamDatabaseName: string;
  timestreamTableName: string;
  timestreamDatabaseArn?: string;
  timestreamTableArn?: string;
  registrationStatus: RegistrationStatus;
  errorMessage?: string;
}
export interface IamRegistrationResponse {
  roleArn: string;
  registrationStatus: RegistrationStatus;
  errorMessage?: string;
}
export interface GetRegisterAccountStatusResponse {
  customerAccountId: string;
  accountStatus: RegistrationStatus;
  timestreamRegistrationResponse?: TimestreamRegistrationResponse;
  iamRegistrationResponse: IamRegistrationResponse;
  creationTime: Date;
  lastModificationTime: Date;
}
export interface GetSignalCatalogRequest {
  name: string;
}
export interface NodeCounts {
  totalNodes?: number;
  totalBranches?: number;
  totalSensors?: number;
  totalAttributes?: number;
  totalActuators?: number;
  totalStructs?: number;
  totalProperties?: number;
}
export interface GetSignalCatalogResponse {
  name: string;
  arn: string;
  description?: string;
  nodeCounts?: NodeCounts;
  creationTime: Date;
  lastModificationTime: Date;
}
export interface GetStateTemplateRequest {
  identifier: string;
}
export interface GetStateTemplateResponse {
  name?: string;
  arn?: string;
  description?: string;
  signalCatalogArn?: string;
  stateTemplateProperties?: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
  creationTime?: Date;
  lastModificationTime?: Date;
  id?: string;
}
export interface GetVehicleRequest {
  vehicleName: string;
}
export interface GetVehicleResponse {
  vehicleName?: string;
  arn?: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  stateTemplates?: StateTemplateAssociation[];
  creationTime?: Date;
  lastModificationTime?: Date;
}
export type NextToken = string;
export type MaxResults = number;
export interface GetVehicleStatusRequest {
  nextToken?: string;
  maxResults?: number;
  vehicleName: string;
}
export type VehicleState =
  | "CREATED"
  | "READY"
  | "HEALTHY"
  | "SUSPENDED"
  | "DELETING"
  | "READY_FOR_CHECKIN"
  | (string & {});
export interface VehicleStatus {
  campaignName?: string;
  vehicleName?: string;
  status?: VehicleState;
}
export type VehicleStatusList = VehicleStatus[];
export interface GetVehicleStatusResponse {
  campaigns?: VehicleStatus[];
  nextToken?: string;
}
export type NetworkFileBlob = Uint8Array;
export type NetworkFilesList = Uint8Array[];
export type ModelSignalsMap = { [key: string]: string | undefined };
export interface CanDbcDefinition {
  networkInterface: string;
  canDbcFiles: Uint8Array[];
  signalsMap?: { [key: string]: string | undefined };
}
export type NetworkFileDefinition = { canDbc: CanDbcDefinition };
export type NetworkFileDefinitions = NetworkFileDefinition[];
export interface ImportDecoderManifestRequest {
  name: string;
  networkFileDefinitions: NetworkFileDefinition[];
}
export interface ImportDecoderManifestResponse {
  name: string;
  arn: string;
}
export type FormattedVss = { vssJson: string };
export interface ImportSignalCatalogRequest {
  name: string;
  description?: string;
  vss?: FormattedVss;
  tags?: Tag[];
}
export interface ImportSignalCatalogResponse {
  name: string;
  arn: string;
}
export type StatusStr = string;
export type ListResponseScope = "METADATA_ONLY" | (string & {});
export interface ListCampaignsRequest {
  nextToken?: string;
  maxResults?: number;
  status?: string;
  listResponseScope?: ListResponseScope;
}
export interface CampaignSummary {
  arn?: string;
  name?: string;
  description?: string;
  signalCatalogArn?: string;
  targetArn?: string;
  status?: CampaignStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export type CampaignSummaries = CampaignSummary[];
export interface ListCampaignsResponse {
  campaignSummaries?: CampaignSummary[];
  nextToken?: string;
}
export interface ListDecoderManifestNetworkInterfacesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListDecoderManifestNetworkInterfacesResponse {
  networkInterfaces?: NetworkInterface[];
  nextToken?: string;
}
export interface ListDecoderManifestsRequest {
  modelManifestArn?: string;
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export interface DecoderManifestSummary {
  name?: string;
  arn?: string;
  modelManifestArn?: string;
  description?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
  message?: string;
}
export type DecoderManifestSummaries = DecoderManifestSummary[];
export interface ListDecoderManifestsResponse {
  summaries?: DecoderManifestSummary[];
  nextToken?: string;
}
export interface ListDecoderManifestSignalsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListDecoderManifestSignalsResponse {
  signalDecoders?: SignalDecoder[];
  nextToken?: string;
}
export interface ListFleetsRequest {
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export interface FleetSummary {
  id: string;
  arn: string;
  description?: string;
  signalCatalogArn: string;
  creationTime: Date;
  lastModificationTime?: Date;
}
export type FleetSummaries = FleetSummary[];
export interface ListFleetsResponse {
  fleetSummaries?: FleetSummary[];
  nextToken?: string;
}
export interface ListFleetsForVehicleRequest {
  vehicleName: string;
  nextToken?: string;
  maxResults?: number;
}
export type Fleets = string[];
export interface ListFleetsForVehicleResponse {
  fleets?: string[];
  nextToken?: string;
}
export interface ListModelManifestNodesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListModelManifestNodesResponse {
  nodes?: Node[];
  nextToken?: string;
}
export interface ListModelManifestsRequest {
  signalCatalogArn?: string;
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export interface ModelManifestSummary {
  name?: string;
  arn?: string;
  signalCatalogArn?: string;
  description?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export type ModelManifestSummaries = ModelManifestSummary[];
export interface ListModelManifestsResponse {
  summaries?: ModelManifestSummary[];
  nextToken?: string;
}
export type SignalNodeType =
  | "SENSOR"
  | "ACTUATOR"
  | "ATTRIBUTE"
  | "BRANCH"
  | "CUSTOM_STRUCT"
  | "CUSTOM_PROPERTY"
  | (string & {});
export interface ListSignalCatalogNodesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
  signalNodeType?: SignalNodeType;
}
export interface ListSignalCatalogNodesResponse {
  nodes?: Node[];
  nextToken?: string;
}
export interface ListSignalCatalogsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface SignalCatalogSummary {
  name?: string;
  arn?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
}
export type SignalCatalogSummaries = SignalCatalogSummary[];
export interface ListSignalCatalogsResponse {
  summaries?: SignalCatalogSummary[];
  nextToken?: string;
}
export interface ListStateTemplatesRequest {
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export interface StateTemplateSummary {
  name?: string;
  arn?: string;
  signalCatalogArn?: string;
  description?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
  id?: string;
}
export type StateTemplateSummaries = StateTemplateSummary[];
export interface ListStateTemplatesResponse {
  summaries?: StateTemplateSummary[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type AttributeNamesList = string[];
export type AttributeValuesList = string[];
export type ListVehiclesMaxResults = number;
export interface ListVehiclesRequest {
  modelManifestArn?: string;
  attributeNames?: string[];
  attributeValues?: string[];
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export interface VehicleSummary {
  vehicleName: string;
  arn: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  creationTime: Date;
  lastModificationTime: Date;
  attributes?: { [key: string]: string | undefined };
}
export type VehicleSummaries = VehicleSummary[];
export interface ListVehiclesResponse {
  vehicleSummaries?: VehicleSummary[];
  nextToken?: string;
}
export interface ListVehiclesInFleetRequest {
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export type Vehicles = string[];
export interface ListVehiclesInFleetResponse {
  vehicles?: string[];
  nextToken?: string;
}
export interface PutEncryptionConfigurationRequest {
  kmsKeyId?: string;
  encryptionType: EncryptionType;
}
export interface PutEncryptionConfigurationResponse {
  kmsKeyId?: string;
  encryptionStatus: EncryptionStatus;
  encryptionType: EncryptionType;
}
export interface PutLoggingOptionsRequest {
  cloudWatchLogDelivery: CloudWatchLogDeliveryOptions;
}
export interface PutLoggingOptionsResponse {}
export interface TimestreamResources {
  timestreamDatabaseName: string;
  timestreamTableName: string;
}
export interface IamResources {
  roleArn: string;
}
export interface RegisterAccountRequest {
  timestreamResources?: TimestreamResources;
  iamResources?: IamResources;
}
export interface RegisterAccountResponse {
  registerAccountStatus: RegistrationStatus;
  timestreamResources?: TimestreamResources;
  iamResources: IamResources;
  creationTime: Date;
  lastModificationTime: Date;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type UpdateCampaignAction =
  | "APPROVE"
  | "SUSPEND"
  | "RESUME"
  | "UPDATE"
  | (string & {});
export interface UpdateCampaignRequest {
  name: string;
  description?: string;
  dataExtraDimensions?: string[];
  action: UpdateCampaignAction;
}
export interface UpdateCampaignResponse {
  arn?: string;
  name?: string;
  status?: CampaignStatus;
}
export type Fqns = string[];
export type InterfaceIds = string[];
export interface UpdateDecoderManifestRequest {
  name: string;
  description?: string;
  signalDecodersToAdd?: SignalDecoder[];
  signalDecodersToUpdate?: SignalDecoder[];
  signalDecodersToRemove?: string[];
  networkInterfacesToAdd?: NetworkInterface[];
  networkInterfacesToUpdate?: NetworkInterface[];
  networkInterfacesToRemove?: string[];
  status?: ManifestStatus;
  defaultForUnmappedSignals?: DefaultForUnmappedSignalsType;
}
export interface UpdateDecoderManifestResponse {
  name: string;
  arn: string;
}
export interface UpdateFleetRequest {
  fleetId: string;
  description?: string;
}
export interface UpdateFleetResponse {
  id?: string;
  arn?: string;
}
export type NodePaths = string[];
export interface UpdateModelManifestRequest {
  name: string;
  description?: string;
  nodesToAdd?: string[];
  nodesToRemove?: string[];
  status?: ManifestStatus;
}
export interface UpdateModelManifestResponse {
  name: string;
  arn: string;
}
export interface UpdateSignalCatalogRequest {
  name: string;
  description?: string;
  nodesToAdd?: Node[];
  nodesToUpdate?: Node[];
  nodesToRemove?: string[];
}
export interface UpdateSignalCatalogResponse {
  name: string;
  arn: string;
}
export interface UpdateStateTemplateRequest {
  identifier: string;
  description?: string;
  stateTemplatePropertiesToAdd?: string[];
  stateTemplatePropertiesToRemove?: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
}
export interface UpdateStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export interface UpdateVehicleRequest {
  vehicleName: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  attributeUpdateMode?: UpdateMode;
  stateTemplatesToAdd?: StateTemplateAssociation[];
  stateTemplatesToRemove?: string[];
  stateTemplatesToUpdate?: StateTemplateAssociation[];
}
export interface UpdateVehicleResponse {
  vehicleName?: string;
  arn?: string;
}
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type SignalDecoderFailureReason =
  | "DUPLICATE_SIGNAL"
  | "CONFLICTING_SIGNAL"
  | "SIGNAL_TO_ADD_ALREADY_EXISTS"
  | "SIGNAL_NOT_ASSOCIATED_WITH_NETWORK_INTERFACE"
  | "NETWORK_INTERFACE_TYPE_INCOMPATIBLE_WITH_SIGNAL_DECODER_TYPE"
  | "SIGNAL_NOT_IN_MODEL"
  | "CAN_SIGNAL_INFO_IS_NULL"
  | "OBD_SIGNAL_INFO_IS_NULL"
  | "NO_DECODER_INFO_FOR_SIGNAL_IN_MODEL"
  | "MESSAGE_SIGNAL_INFO_IS_NULL"
  | "SIGNAL_DECODER_TYPE_INCOMPATIBLE_WITH_MESSAGE_SIGNAL_TYPE"
  | "STRUCT_SIZE_MISMATCH"
  | "NO_SIGNAL_IN_CATALOG_FOR_DECODER_SIGNAL"
  | "SIGNAL_DECODER_INCOMPATIBLE_WITH_SIGNAL_CATALOG"
  | "EMPTY_MESSAGE_SIGNAL"
  | "CUSTOM_DECODING_SIGNAL_INFO_IS_NULL"
  | (string & {});
export interface InvalidSignalDecoder {
  name?: string;
  reason?: SignalDecoderFailureReason;
  hint?: string;
}
export type InvalidSignalDecoders = InvalidSignalDecoder[];
export type NetworkInterfaceFailureReason =
  | "DUPLICATE_NETWORK_INTERFACE"
  | "CONFLICTING_NETWORK_INTERFACE"
  | "NETWORK_INTERFACE_TO_ADD_ALREADY_EXISTS"
  | "CAN_NETWORK_INTERFACE_INFO_IS_NULL"
  | "OBD_NETWORK_INTERFACE_INFO_IS_NULL"
  | "NETWORK_INTERFACE_TO_REMOVE_ASSOCIATED_WITH_SIGNALS"
  | "VEHICLE_MIDDLEWARE_NETWORK_INTERFACE_INFO_IS_NULL"
  | "CUSTOM_DECODING_SIGNAL_NETWORK_INTERFACE_INFO_IS_NULL"
  | (string & {});
export interface InvalidNetworkInterface {
  interfaceId?: string;
  reason?: NetworkInterfaceFailureReason;
}
export type InvalidNetworkInterfaces = InvalidNetworkInterface[];
export interface InvalidSignal {
  name?: string;
  reason?: string;
}
export type InvalidSignals = InvalidSignal[];
export type AssociateVehicleFleetError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds, or associates, a vehicle with a fleet.
 */
export const associateVehicleFleet: API.OperationMethod<
  AssociateVehicleFleetRequest,
  AssociateVehicleFleetResponse,
  AssociateVehicleFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { vehicleName: 0, fleetId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateVehicleFleet",
})) as any;

export type BatchCreateVehicleError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group, or batch, of vehicles.
 *
 * You must specify a decoder manifest and a vehicle model (model manifest) for each
 * vehicle.
 *
 * For more information, see Create multiple
 * vehicles (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const batchCreateVehicle: API.OperationMethod<
  BatchCreateVehicleRequest,
  BatchCreateVehicleResponse,
  BatchCreateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      vehicles: D.list({
        vehicleName: 0,
        modelManifestArn: 0,
        decoderManifestArn: 0,
        attributes: 0,
        associationBehavior: 0,
        tags: D.list(i_Tag),
        stateTemplates: D.list(i_StateTemplateAssociation),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateVehicle",
})) as any;

export type BatchUpdateVehicleError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a group, or batch, of vehicles.
 *
 * You must specify a decoder manifest and a vehicle model (model manifest) for each
 * vehicle.
 *
 * For more information, see Update multiple
 * vehicles (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const batchUpdateVehicle: API.OperationMethod<
  BatchUpdateVehicleRequest,
  BatchUpdateVehicleResponse,
  BatchUpdateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      vehicles: D.list({
        vehicleName: 0,
        modelManifestArn: 0,
        decoderManifestArn: 0,
        attributes: 0,
        attributeUpdateMode: 0,
        stateTemplatesToAdd: D.list(i_StateTemplateAssociation),
        stateTemplatesToRemove: 0,
        stateTemplatesToUpdate: D.list(i_StateTemplateAssociation),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateVehicle",
})) as any;

export type CreateCampaignError =
  | AccessDeniedException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an orchestration of data collection rules. The Amazon Web Services IoT FleetWise Edge Agent software
 * running in vehicles uses campaigns to decide how to collect and transfer data to the
 * cloud. You create campaigns in the cloud. After you or your team approve campaigns,
 * Amazon Web Services IoT FleetWise automatically deploys them to vehicles.
 *
 * For more information, see Collect and transfer data
 * with campaigns in the *Amazon Web Services IoT FleetWise Developer Guide*.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      signalCatalogArn: 0,
      targetArn: 0,
      startTime: 0,
      expiryTime: 0,
      postTriggerCollectionDuration: 0,
      diagnosticsMode: 0,
      spoolingMode: 0,
      compression: 0,
      priority: 0,
      signalsToCollect: D.list({
        name: 0,
        maxSampleCount: 0,
        minimumSamplingIntervalMs: 0,
        dataPartitionId: 0,
      }),
      collectionScheme: {
        timeBasedCollectionScheme: { periodMs: 0 },
        conditionBasedCollectionScheme: {
          expression: 0,
          minimumTriggerIntervalMs: 0,
          triggerMode: 0,
          conditionLanguageVersion: 0,
        },
      },
      dataExtraDimensions: 0,
      tags: D.list(i_Tag),
      dataDestinationConfigs: D.list({
        s3Config: {
          bucketArn: 0,
          dataFormat: 0,
          storageCompressionFormat: 0,
          prefix: 0,
        },
        timestreamConfig: { timestreamTableArn: 0, executionRoleArn: 0 },
        mqttTopicConfig: { mqttTopicArn: 0, executionRoleArn: 0 },
      }),
      dataPartitions: D.list({
        id: 0,
        storageOptions: {
          maximumSize: { unit: 0, value: 0 },
          storageLocation: 0,
          minimumTimeToLive: { unit: 0, value: 0 },
        },
        uploadOptions: { expression: 0, conditionLanguageVersion: 0 },
      }),
      signalsToFetch: D.list({
        fullyQualifiedName: 0,
        signalFetchConfig: {
          timeBased: { executionFrequencyMs: 0 },
          conditionBased: { conditionExpression: 0, triggerMode: 0 },
        },
        conditionLanguageVersion: 0,
        actions: 0,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
})) as any;

export type CreateDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the decoder manifest associated with a model manifest. To create a decoder
 * manifest, the following must be true:
 *
 * - Every signal decoder has a unique name.
 *
 * - Each signal decoder is associated with a network interface.
 *
 * - Each network interface has a unique ID.
 *
 * - The signal decoders are specified in the model manifest.
 */
export const createDecoderManifest: API.OperationMethod<
  CreateDecoderManifestRequest,
  CreateDecoderManifestResponse,
  CreateDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      modelManifestArn: 0,
      signalDecoders: D.list(i_SignalDecoder),
      networkInterfaces: D.list(i_NetworkInterface),
      defaultForUnmappedSignals: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDecoderManifest",
})) as any;

export type CreateFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a fleet that represents a group of vehicles.
 *
 * You must create both a signal catalog and vehicles before you can create a fleet.
 *
 * For more information, see Fleets in the
 * *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResponse,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      fleetId: 0,
      description: 0,
      signalCatalogArn: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
})) as any;

export type CreateModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a vehicle model (model manifest) that specifies signals (attributes,
 * branches, sensors, and actuators).
 *
 * For more information, see Vehicle models
 * in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createModelManifest: API.OperationMethod<
  CreateModelManifestRequest,
  CreateModelManifestResponse,
  CreateModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      nodes: 0,
      signalCatalogArn: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelManifest",
})) as any;

export type CreateSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InvalidNodeException
  | InvalidSignalsException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a collection of standardized signals that can be reused to create vehicle
 * models.
 */
export const createSignalCatalog: API.OperationMethod<
  CreateSignalCatalogRequest,
  CreateSignalCatalogResponse,
  CreateSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      nodes: D.list(i_Node),
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidNodeException,
    InvalidSignalsException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalCatalog",
})) as any;

export type CreateStateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a state template. State templates contain state properties, which are signals that belong to a signal catalog that is synchronized between the Amazon Web Services IoT FleetWise Edge and the Amazon Web Services Cloud.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createStateTemplate: API.OperationMethod<
  CreateStateTemplateRequest,
  CreateStateTemplateResponse,
  CreateStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      signalCatalogArn: 0,
      stateTemplateProperties: 0,
      dataExtraDimensions: 0,
      metadataExtraDimensions: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStateTemplate",
})) as any;

export type CreateVehicleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a vehicle, which is an instance of a vehicle model (model manifest). Vehicles
 * created from the same vehicle model consist of the same signals inherited from the
 * vehicle model.
 *
 * If you have an existing Amazon Web Services IoT thing, you can use Amazon Web Services IoT FleetWise to create a
 * vehicle and collect data from your thing.
 *
 * For more information, see Create a vehicle
 * (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createVehicle: API.OperationMethod<
  CreateVehicleRequest,
  CreateVehicleResponse,
  CreateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      vehicleName: 0,
      modelManifestArn: 0,
      decoderManifestArn: 0,
      attributes: 0,
      associationBehavior: 0,
      tags: D.list(i_Tag),
      stateTemplates: D.list(i_StateTemplateAssociation),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVehicle",
})) as any;

export type DeleteCampaignError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data collection campaign. Deleting a campaign suspends all data collection
 * and removes it from any vehicles.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
})) as any;

export type DeleteDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a decoder manifest. You can't delete a decoder manifest if it has vehicles
 * associated with it.
 */
export const deleteDecoderManifest: API.OperationMethod<
  DeleteDecoderManifestRequest,
  DeleteDecoderManifestResponse,
  DeleteDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDecoderManifest",
})) as any;

export type DeleteFleetError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a fleet. Before you delete a fleet, all vehicles must be
 * dissociated from the fleet. For more information, see Delete a fleet (AWS
 * CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { fleetId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
})) as any;

export type DeleteModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a vehicle model (model manifest).
 */
export const deleteModelManifest: API.OperationMethod<
  DeleteModelManifestRequest,
  DeleteModelManifestResponse,
  DeleteModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelManifest",
})) as any;

export type DeleteSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a signal catalog.
 */
export const deleteSignalCatalog: API.OperationMethod<
  DeleteSignalCatalogRequest,
  DeleteSignalCatalogResponse,
  DeleteSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalCatalog",
})) as any;

export type DeleteStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a state template.
 */
export const deleteStateTemplate: API.OperationMethod<
  DeleteStateTemplateRequest,
  DeleteStateTemplateResponse,
  DeleteStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateTemplate",
})) as any;

export type DeleteVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a vehicle and removes it from any campaigns.
 */
export const deleteVehicle: API.OperationMethod<
  DeleteVehicleRequest,
  DeleteVehicleResponse,
  DeleteVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { vehicleName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVehicle",
})) as any;

export type DisassociateVehicleFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes, or disassociates, a vehicle from a fleet. Disassociating a vehicle from a
 * fleet doesn't delete the vehicle.
 */
export const disassociateVehicleFleet: API.OperationMethod<
  DisassociateVehicleFleetRequest,
  DisassociateVehicleFleetResponse,
  DisassociateVehicleFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { vehicleName: 0, fleetId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateVehicleFleet",
})) as any;

export type GetCampaignError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a campaign.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const getCampaign: API.OperationMethod<
  GetCampaignRequest,
  GetCampaignResponse,
  GetCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: {
      startTime: D.ts,
      expiryTime: D.ts,
      collectionScheme: {
        conditionBasedCollectionScheme: { expression: D.secret },
      },
      creationTime: D.ts,
      lastModificationTime: D.ts,
      dataPartitions: D.list({
        storageOptions: { storageLocation: D.secret },
        uploadOptions: { expression: D.secret },
      }),
      signalsToFetch: D.list({
        signalFetchConfig: {
          conditionBased: { conditionExpression: D.secret },
        },
        actions: D.list(D.secret),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
})) as any;

export type GetDecoderManifestError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a created decoder manifest.
 */
export const getDecoderManifest: API.OperationMethod<
  GetDecoderManifestRequest,
  GetDecoderManifestResponse,
  GetDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDecoderManifest",
})) as any;

export type GetEncryptionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the encryption configuration for resources and data in Amazon Web Services IoT FleetWise.
 */
export const getEncryptionConfiguration: API.OperationMethod<
  GetEncryptionConfigurationRequest,
  GetEncryptionConfigurationResponse,
  GetEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncryptionConfiguration",
})) as any;

export type GetFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a fleet.
 */
export const getFleet: API.OperationMethod<
  GetFleetRequest,
  GetFleetResponse,
  GetFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { fleetId: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFleet",
})) as any;

export type GetLoggingOptionsError =
  | AccessDeniedException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the logging options.
 */
export const getLoggingOptions: API.OperationMethod<
  GetLoggingOptionsRequest,
  GetLoggingOptionsResponse,
  GetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
})) as any;

export type GetModelManifestError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a vehicle model (model manifest).
 */
export const getModelManifest: API.OperationMethod<
  GetModelManifestRequest,
  GetModelManifestResponse,
  GetModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelManifest",
})) as any;

export type GetRegisterAccountStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the status of registering your Amazon Web Services account, IAM, and
 * Amazon Timestream resources so that Amazon Web Services IoT FleetWise can transfer your vehicle data to the Amazon Web Services
 * Cloud.
 *
 * For more information, including step-by-step procedures, see Setting up Amazon Web Services IoT FleetWise.
 *
 * This API operation doesn't require input parameters.
 */
export const getRegisterAccountStatus: API.OperationMethod<
  GetRegisterAccountStatusRequest,
  GetRegisterAccountStatusResponse,
  GetRegisterAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegisterAccountStatus",
})) as any;

export type GetSignalCatalogError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a signal catalog.
 */
export const getSignalCatalog: API.OperationMethod<
  GetSignalCatalogRequest,
  GetSignalCatalogResponse,
  GetSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalCatalog",
})) as any;

export type GetStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a state template.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const getStateTemplate: API.OperationMethod<
  GetStateTemplateRequest,
  GetStateTemplateResponse,
  GetStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStateTemplate",
})) as any;

export type GetVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a vehicle.
 */
export const getVehicle: API.OperationMethod<
  GetVehicleRequest,
  GetVehicleResponse,
  GetVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { vehicleName: 0 },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVehicle",
})) as any;

export type GetVehicleStatusError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the status of campaigns, decoder manifests, or state templates
 * associated with a vehicle.
 */
export const getVehicleStatus: API.PaginatedOperationMethod<
  GetVehicleStatusRequest,
  GetVehicleStatusResponse,
  GetVehicleStatusError,
  Credentials | HttpClient.HttpClient,
  VehicleStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, vehicleName: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVehicleStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaigns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ImportDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | InvalidSignalsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a decoder manifest using your existing CAN DBC file from your local device.
 *
 * The CAN signal name must be unique and not repeated across CAN message definitions in a .dbc file.
 */
export const importDecoderManifest: API.OperationMethod<
  ImportDecoderManifestRequest,
  ImportDecoderManifestResponse,
  ImportDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      networkFileDefinitions: D.list({
        canDbc: { networkInterface: 0, canDbcFiles: 0, signalsMap: 0 },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    InvalidSignalsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDecoderManifest",
})) as any;

export type ImportSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a signal catalog using your existing VSS formatted content from your local
 * device.
 */
export const importSignalCatalog: API.OperationMethod<
  ImportSignalCatalogRequest,
  ImportSignalCatalogResponse,
  ImportSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      vss: { vssJson: 0 },
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSignalCatalog",
})) as any;

export type ListCampaignsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about created campaigns.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, status: 0, listResponseScope: 0 },
    output: {
      campaignSummaries: D.list({
        creationTime: D.ts,
        lastModificationTime: D.ts,
      }),
    },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaignSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestNetworkInterfacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the network interfaces specified in a decoder manifest.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifestNetworkInterfaces: API.PaginatedOperationMethod<
  ListDecoderManifestNetworkInterfacesRequest,
  ListDecoderManifestNetworkInterfacesResponse,
  ListDecoderManifestNetworkInterfacesError,
  Credentials | HttpClient.HttpClient,
  NetworkInterface
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifestNetworkInterfaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkInterfaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists decoder manifests.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifests: API.PaginatedOperationMethod<
  ListDecoderManifestsRequest,
  ListDecoderManifestsResponse,
  ListDecoderManifestsError,
  Credentials | HttpClient.HttpClient,
  DecoderManifestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      modelManifestArn: 0,
      nextToken: 0,
      maxResults: 0,
      listResponseScope: 0,
    },
    output: {
      summaries: D.list({ creationTime: D.ts, lastModificationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestSignalsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of information about signal decoders specified in a decoder manifest.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifestSignals: API.PaginatedOperationMethod<
  ListDecoderManifestSignalsRequest,
  ListDecoderManifestSignalsResponse,
  ListDecoderManifestSignalsError,
  Credentials | HttpClient.HttpClient,
  SignalDecoder
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifestSignals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "signalDecoders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information for each created fleet in an Amazon Web Services account.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsRequest,
  ListFleetsResponse,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, listResponseScope: 0 },
    output: {
      fleetSummaries: D.list({
        creationTime: D.ts,
        lastModificationTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsForVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of IDs for all fleets that the vehicle is associated with.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listFleetsForVehicle: API.PaginatedOperationMethod<
  ListFleetsForVehicleRequest,
  ListFleetsForVehicleResponse,
  ListFleetsForVehicleError,
  Credentials | HttpClient.HttpClient,
  FleetId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { vehicleName: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetsForVehicle",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelManifestNodesError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about nodes specified in a vehicle model (model manifest).
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listModelManifestNodes: API.PaginatedOperationMethod<
  ListModelManifestNodesRequest,
  ListModelManifestNodesResponse,
  ListModelManifestNodesError,
  Credentials | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelManifestNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelManifestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of vehicle models (model manifests).
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listModelManifests: API.PaginatedOperationMethod<
  ListModelManifestsRequest,
  ListModelManifestsResponse,
  ListModelManifestsError,
  Credentials | HttpClient.HttpClient,
  ModelManifestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      signalCatalogArn: 0,
      nextToken: 0,
      maxResults: 0,
      listResponseScope: 0,
    },
    output: {
      summaries: D.list({ creationTime: D.ts, lastModificationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelManifests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSignalCatalogNodesError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists of information about the signals (nodes) specified in a signal catalog.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listSignalCatalogNodes: API.PaginatedOperationMethod<
  ListSignalCatalogNodesRequest,
  ListSignalCatalogNodesResponse,
  ListSignalCatalogNodesError,
  Credentials | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, nextToken: 0, maxResults: 0, signalNodeType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalCatalogNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSignalCatalogsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the created signal catalogs in an Amazon Web Services account.
 *
 * You can use to list information about
 * each signal (node) specified in a signal catalog.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listSignalCatalogs: API.PaginatedOperationMethod<
  ListSignalCatalogsRequest,
  ListSignalCatalogsResponse,
  ListSignalCatalogsError,
  Credentials | HttpClient.HttpClient,
  SignalCatalogSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      summaries: D.list({ creationTime: D.ts, lastModificationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalCatalogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStateTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about created state templates.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const listStateTemplates: API.PaginatedOperationMethod<
  ListStateTemplatesRequest,
  ListStateTemplatesResponse,
  ListStateTemplatesError,
  Credentials | HttpClient.HttpClient,
  StateTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, listResponseScope: 0 },
    output: {
      summaries: D.list({ creationTime: D.ts, lastModificationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStateTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags (metadata) you have assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVehiclesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of summaries of created vehicles.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listVehicles: API.PaginatedOperationMethod<
  ListVehiclesRequest,
  ListVehiclesResponse,
  ListVehiclesError,
  Credentials | HttpClient.HttpClient,
  VehicleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      modelManifestArn: 0,
      attributeNames: 0,
      attributeValues: 0,
      nextToken: 0,
      maxResults: 0,
      listResponseScope: 0,
    },
    output: {
      vehicleSummaries: D.list({
        creationTime: D.ts,
        lastModificationTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVehicles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vehicleSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVehiclesInFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of summaries of all vehicles associated with a fleet.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listVehiclesInFleet: API.PaginatedOperationMethod<
  ListVehiclesInFleetRequest,
  ListVehiclesInFleetResponse,
  ListVehiclesInFleetError,
  Credentials | HttpClient.HttpClient,
  VehicleName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { fleetId: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVehiclesInFleet",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vehicles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutEncryptionConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the encryption configuration. Amazon Web Services IoT FleetWise can encrypt your data and
 * resources using an Amazon Web Services managed key. Or, you can use a KMS key that you own and
 * manage. For more information, see Data
 * encryption in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const putEncryptionConfiguration: API.OperationMethod<
  PutEncryptionConfigurationRequest,
  PutEncryptionConfigurationResponse,
  PutEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { kmsKeyId: 0, encryptionType: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEncryptionConfiguration",
})) as any;

export type PutLoggingOptionsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the logging option.
 */
export const putLoggingOptions: API.OperationMethod<
  PutLoggingOptionsRequest,
  PutLoggingOptionsResponse,
  PutLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cloudWatchLogDelivery: { logType: 0, logGroupName: 0 } },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingOptions",
})) as any;

export type RegisterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API operation contains deprecated parameters. Register your account again
 * without the Timestream resources parameter so that Amazon Web Services IoT FleetWise can remove the Timestream
 * metadata stored. You should then pass the data destination into the CreateCampaign API operation.
 *
 * You must delete any existing campaigns that include an empty data destination
 * before you register your account again. For more information, see the DeleteCampaign API operation.
 *
 * If you want to delete the Timestream inline policy from the service-linked role, such
 * as to mitigate an overly permissive policy, you must first delete any existing
 * campaigns. Then delete the service-linked role and register your account again to
 * enable CloudWatch metrics. For more information, see DeleteServiceLinkedRole in the Identity and Access Management API
 * Reference.
 *
 * Registers your Amazon Web Services account, IAM, and Amazon Timestream resources so Amazon Web Services IoT FleetWise can
 * transfer your vehicle data to the Amazon Web Services Cloud. For more information, including
 * step-by-step procedures, see Setting up
 * Amazon Web Services IoT FleetWise.
 *
 * An Amazon Web Services account is **not** the same thing as a
 * "user." An Amazon Web Services user is an identity that you create using Identity and Access Management (IAM) and
 * takes the form of either an IAM user or an IAM role, both
 * with credentials. A single Amazon Web Services account can, and typically does,
 * contain many users and roles.
 */
export const registerAccount: API.OperationMethod<
  RegisterAccountRequest,
  RegisterAccountResponse,
  RegisterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      timestreamResources: {
        timestreamDatabaseName: 0,
        timestreamTableName: 0,
      },
      iamResources: { roleArn: 0 },
    },
    output: { creationTime: D.ts, lastModificationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAccount",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be
 * used to manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the given tags (metadata) from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCampaignError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, dataExtraDimensions: 0, action: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
})) as any;

export type UpdateDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a decoder manifest.
 *
 * A decoder manifest can only be updated when the status is `DRAFT`. Only
 * `ACTIVE` decoder manifests can be associated with vehicles.
 */
export const updateDecoderManifest: API.OperationMethod<
  UpdateDecoderManifestRequest,
  UpdateDecoderManifestResponse,
  UpdateDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      signalDecodersToAdd: D.list(i_SignalDecoder),
      signalDecodersToUpdate: D.list(i_SignalDecoder),
      signalDecodersToRemove: 0,
      networkInterfacesToAdd: D.list(i_NetworkInterface),
      networkInterfacesToUpdate: D.list(i_NetworkInterface),
      networkInterfacesToRemove: 0,
      status: 0,
      defaultForUnmappedSignals: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDecoderManifest",
})) as any;

export type UpdateFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description of an existing fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResponse,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { fleetId: 0, description: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
})) as any;

export type UpdateModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a vehicle model (model manifest). If created vehicles are associated with a
 * vehicle model, it can't be updated.
 */
export const updateModelManifest: API.OperationMethod<
  UpdateModelManifestRequest,
  UpdateModelManifestResponse,
  UpdateModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      nodesToAdd: 0,
      nodesToRemove: 0,
      status: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModelManifest",
})) as any;

export type UpdateSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidNodeException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a signal catalog.
 */
export const updateSignalCatalog: API.OperationMethod<
  UpdateSignalCatalogRequest,
  UpdateSignalCatalogResponse,
  UpdateSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      nodesToAdd: D.list(i_Node),
      nodesToUpdate: D.list(i_Node),
      nodesToRemove: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidNodeException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSignalCatalog",
})) as any;

export type UpdateStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a state template.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const updateStateTemplate: API.OperationMethod<
  UpdateStateTemplateRequest,
  UpdateStateTemplateResponse,
  UpdateStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      description: 0,
      stateTemplatePropertiesToAdd: 0,
      stateTemplatePropertiesToRemove: 0,
      dataExtraDimensions: 0,
      metadataExtraDimensions: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStateTemplate",
})) as any;

export type UpdateVehicleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a vehicle.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const updateVehicle: API.OperationMethod<
  UpdateVehicleRequest,
  UpdateVehicleResponse,
  UpdateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      vehicleName: 0,
      modelManifestArn: 0,
      decoderManifestArn: 0,
      attributes: 0,
      attributeUpdateMode: 0,
      stateTemplatesToAdd: D.list(i_StateTemplateAssociation),
      stateTemplatesToRemove: 0,
      stateTemplatesToUpdate: D.list(i_StateTemplateAssociation),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVehicle",
})) as any;

const i_NetworkInterface: D.LazyStruct = () => ({
  interfaceId: 0,
  type: 0,
  canInterface: { name: 0, protocolName: 0, protocolVersion: 0 },
  obdInterface: {
    name: 0,
    requestMessageId: 0,
    obdStandard: 0,
    pidRequestIntervalSeconds: 0,
    dtcRequestIntervalSeconds: 0,
    useExtendedIds: 0,
    hasTransmissionEcu: 0,
  },
  vehicleMiddleware: { name: 0, protocolName: 0 },
  customDecodingInterface: { name: 0 },
});
const i_Node: D.LazyStruct = () => ({
  branch: {
    fullyQualifiedName: 0,
    description: 0,
    deprecationMessage: 0,
    comment: 0,
  },
  sensor: {
    fullyQualifiedName: 0,
    dataType: 0,
    description: 0,
    unit: 0,
    allowedValues: 0,
    min: 0,
    max: 0,
    deprecationMessage: 0,
    comment: 0,
    structFullyQualifiedName: 0,
  },
  actuator: {
    fullyQualifiedName: 0,
    dataType: 0,
    description: 0,
    unit: 0,
    allowedValues: 0,
    min: 0,
    max: 0,
    assignedValue: 0,
    deprecationMessage: 0,
    comment: 0,
    structFullyQualifiedName: 0,
  },
  attribute: {
    fullyQualifiedName: 0,
    dataType: 0,
    description: 0,
    unit: 0,
    allowedValues: 0,
    min: 0,
    max: 0,
    assignedValue: 0,
    defaultValue: 0,
    deprecationMessage: 0,
    comment: 0,
  },
  struct: {
    fullyQualifiedName: 0,
    description: 0,
    deprecationMessage: 0,
    comment: 0,
  },
  property: {
    fullyQualifiedName: 0,
    dataType: 0,
    dataEncoding: 0,
    description: 0,
    deprecationMessage: 0,
    comment: 0,
    structFullyQualifiedName: 0,
  },
});
const i_SignalDecoder: D.LazyStruct = () => ({
  fullyQualifiedName: 0,
  type: 0,
  interfaceId: 0,
  canSignal: {
    messageId: 0,
    isBigEndian: 0,
    isSigned: 0,
    startBit: 0,
    offset: 0,
    factor: 0,
    length: 0,
    name: 0,
    signalValueType: 0,
  },
  obdSignal: {
    pidResponseLength: 0,
    serviceMode: 0,
    pid: 0,
    scaling: 0,
    offset: 0,
    startByte: 0,
    byteLength: 0,
    bitRightShift: 0,
    bitMaskLength: 0,
    isSigned: 0,
    signalValueType: 0,
  },
  messageSignal: { topicName: 0, structuredMessage: i_StructuredMessage },
  customDecodingSignal: { id: 0 },
});
const i_StateTemplateAssociation: D.LazyStruct = () => ({
  identifier: 0,
  stateTemplateUpdateStrategy: {
    periodic: { stateTemplateUpdateRate: { unit: 0, value: 0 } },
    onChange: {},
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_StructuredMessage: D.LazyStruct = () => ({
  primitiveMessageDefinition: {
    ros2PrimitiveMessageDefinition: {
      primitiveType: 0,
      offset: 0,
      scaling: 0,
      upperBound: 0,
    },
  },
  structuredMessageListDefinition: {
    name: 0,
    memberType: i_StructuredMessage,
    listType: 0,
    capacity: 0,
  },
  structuredMessageDefinition: D.list({
    fieldName: 0,
    dataType: i_StructuredMessage,
  }),
});
