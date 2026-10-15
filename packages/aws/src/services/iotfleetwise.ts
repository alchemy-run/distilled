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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "IoTFleetWise",
  serviceShapeName: "IoTAutobahnControlPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iotfleetwise" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-06-17");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://iotfleetwise.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resource: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DecoderManifestValidationException
  extends /*@__PURE__*/ S.TaggedError<DecoderManifestValidationException>()(
    "DecoderManifestValidationException",
    {
      invalidSignals: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(737, __c23, 1)).annotate({
          identifier: "InvalidSignalDecoders",
        }),
      ),
      invalidNetworkInterfaces: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(739, __c23, 3)).annotate({
          identifier: "InvalidNetworkInterfaces",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNodeException
  extends /*@__PURE__*/ S.TaggedError<InvalidNodeException>()(
    "InvalidNodeException",
    {
      invalidNodes: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1510, __c47, 6)).annotate({ identifier: "Nodes" }),
      ),
      reason: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSignalsException
  extends /*@__PURE__*/ S.TaggedError<InvalidSignalsException>()(
    "InvalidSignalsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      invalidSignals: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1889, __c59, 1)).annotate({
          identifier: "InvalidSignals",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2465, __c77, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type TimeUnit = "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | (string & {});
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
  | { timeBasedCollectionScheme: TimeBasedCollectionScheme; conditionBasedCollectionScheme?: never }
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
  | { s3Config?: never; timestreamConfig: TimestreamConfig; mqttTopicConfig?: never }
  | { s3Config?: never; timestreamConfig?: never; mqttTopicConfig: MqttTopicConfig };
export type DataDestinationConfigs = DataDestinationConfig[];
export type StorageMaximumSizeUnit = "MB" | "GB" | "TB" | (string & {});
export type StorageMaximumSizeValue = number;
export interface StorageMaximumSize {
  unit: StorageMaximumSizeUnit;
  value: number;
}
export type StorageLocation = string | redacted.Redacted<string>;
export type StorageMinimumTimeToLiveUnit = "HOURS" | "DAYS" | "WEEKS" | (string & {});
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
export type StructuredMessageDefinition = StructuredMessageFieldNameAndDataTypePair[];
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
export type ManifestStatus = "ACTIVE" | "DRAFT" | "INVALID" | "VALIDATING" | (string & {});
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
export type EncryptionStatus = "PENDING" | "SUCCESS" | "FAILURE" | (string & {});
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
export type UpdateCampaignAction = "APPROVE" | "SUSPEND" | "RESUME" | "UPDATE" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateVehicleFleetRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<AssociateVehicleFleetResponse>,
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
}));

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
  input: __S(66, __c2, 2) as any as S.Schema<BatchCreateVehicleRequest>,
  output: __S(70, __c2, 6) as any as S.Schema<BatchCreateVehicleResponse>,
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
}));

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
  input: __S(258, __c8, 2) as any as S.Schema<BatchUpdateVehicleRequest>,
  output: __S(262, __c8, 6) as any as S.Schema<BatchUpdateVehicleResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateCampaignRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<CreateCampaignResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CreateDecoderManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateDecoderManifestResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<CreateFleetRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<CreateFleetResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateModelManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateModelManifestResponse>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<CreateSignalCatalogRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateSignalCatalogResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<CreateStateTemplateRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateStateTemplateResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CreateVehicleRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<CreateVehicleResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteCampaignRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<DeleteCampaignResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteDecoderManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteDecoderManifestResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteFleetRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<DeleteFleetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteModelManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteModelManifestResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteSignalCatalogRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteSignalCatalogResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DeleteStateTemplateRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<DeleteStateTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateTemplate",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteVehicleRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<DeleteVehicleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVehicle",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DisassociateVehicleFleetRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DisassociateVehicleFleetResponse>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<GetCampaignRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<GetCampaignResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<GetDecoderManifestRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<GetDecoderManifestResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDecoderManifest",
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<GetEncryptionConfigurationRequest>,
  output: __S(1121, __c35, 1) as any as S.Schema<GetEncryptionConfigurationResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<GetFleetRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<GetFleetResponse>,
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
}));

export type GetLoggingOptionsError = AccessDeniedException | ThrottlingException | CommonErrors;
/**
 * Retrieves the logging options.
 */
export const getLoggingOptions: API.OperationMethod<
  GetLoggingOptionsRequest,
  GetLoggingOptionsResponse,
  GetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetLoggingOptionsRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<GetLoggingOptionsResponse>,
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<GetModelManifestRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<GetModelManifestResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelManifest",
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<GetRegisterAccountStatusRequest>,
  output: __S(1283, __c40, 3) as any as S.Schema<GetRegisterAccountStatusResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<GetSignalCatalogRequest>,
  output: __S(1314, __c41, 2) as any as S.Schema<GetSignalCatalogResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalCatalog",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<GetStateTemplateRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<GetStateTemplateResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<GetVehicleRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<GetVehicleResponse>,
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
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<GetVehicleStatusRequest>,
  output: __S(1411, __c44, 3) as any as S.Schema<GetVehicleStatusResponse>,
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
  input: __S(1444, __c45, 4) as any as S.Schema<ImportDecoderManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<ImportDecoderManifestResponse>,
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
}));

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
  input: __S(1537, __c48, 1) as any as S.Schema<ImportSignalCatalogRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<ImportSignalCatalogResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<ListCampaignsRequest>,
  output: __S(1571, __c49, 3) as any as S.Schema<ListCampaignsResponse>,
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
  input: __S(1600, __c50, 0) as any as S.Schema<ListDecoderManifestNetworkInterfacesRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<ListDecoderManifestNetworkInterfacesResponse>,
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
  input: __S(1632, __c51, 0) as any as S.Schema<ListDecoderManifestsRequest>,
  output: __S(1635, __c51, 3) as any as S.Schema<ListDecoderManifestsResponse>,
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
  input: __S(1664, __c52, 0) as any as S.Schema<ListDecoderManifestSignalsRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<ListDecoderManifestSignalsResponse>,
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
  input: __S(1696, __c53, 0) as any as S.Schema<ListFleetsRequest>,
  output: __S(1699, __c53, 3) as any as S.Schema<ListFleetsResponse>,
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
  input: __S(1728, __c54, 0) as any as S.Schema<ListFleetsForVehicleRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<ListFleetsForVehicleResponse>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<ListModelManifestNodesRequest>,
  output: __S(1792, __c56, 0) as any as S.Schema<ListModelManifestNodesResponse>,
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
  input: __S(1824, __c57, 0) as any as S.Schema<ListModelManifestsRequest>,
  output: __S(1827, __c57, 3) as any as S.Schema<ListModelManifestsResponse>,
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
  input: __S(1856, __c58, 0) as any as S.Schema<ListSignalCatalogNodesRequest>,
  output: __S(1792, __c56, 0) as any as S.Schema<ListSignalCatalogNodesResponse>,
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
  input: __S(1920, __c60, 0) as any as S.Schema<ListSignalCatalogsRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListSignalCatalogsResponse>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<ListStateTemplatesRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListStateTemplatesResponse>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<ListVehiclesRequest>,
  output: __S(2019, __c63, 3) as any as S.Schema<ListVehiclesResponse>,
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
  input: __S(2048, __c64, 0) as any as S.Schema<ListVehiclesInFleetRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<ListVehiclesInFleetResponse>,
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
  input: __S(2080, __c65, 0) as any as S.Schema<PutEncryptionConfigurationRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<PutEncryptionConfigurationResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<PutLoggingOptionsRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<PutLoggingOptionsResponse>,
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
}));

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
  input: __S(2146, __c67, 2) as any as S.Schema<RegisterAccountRequest>,
  output: __S(2147, __c67, 3) as any as S.Schema<RegisterAccountResponse>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<UpdateCampaignRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<UpdateCampaignResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<UpdateDecoderManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateDecoderManifestResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<UpdateFleetRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<UpdateFleetResponse>,
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
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<UpdateModelManifestRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateModelManifestResponse>,
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
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<UpdateSignalCatalogRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateSignalCatalogResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<UpdateStateTemplateRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdateStateTemplateResponse>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<UpdateVehicleRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateVehicleResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
          fleetId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/vehicles/{vehicleName}/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateVehicleFleetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateVehicleFleetResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String,
          modelManifestArn: S.String,
          decoderManifestArn: S.String,
          attributes: S.optional(__S(128, __c4, 0)),
          associationBehavior: S.optional(S.String),
          tags: S.optional(__S(193, __c6, 1)),
          stateTemplates: S.optional(__S(163, __c5, 3)),
        }),
      ).annotate({ identifier: "CreateVehicleRequestItem" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ vehicles: __S(65, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/vehicles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchCreateVehicleRequest" });
    case 3:
      return S.Array(__S(224, __c7, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.optional(S.String),
          code: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateVehicleError" });
    case 5:
      return S.Array(__S(68, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ vehicles: S.optional(__S(67, __c2, 3)), errors: S.optional(__S(69, __c2, 5)) }),
      ).annotate({ identifier: "BatchCreateVehicleResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ unit: S.String, value: S.Number })).annotate({
        identifier: "TimePeriod",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ stateTemplateUpdateRate: __S(96, __c3, 0) })).annotate({
        identifier: "PeriodicStateTemplateUpdateStrategy",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ periodic: __S(160, __c5, 0) }),
        /*@__PURE__*/ S.Struct({ onChange: __S(32, __c1, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ identifier: S.String, stateTemplateUpdateStrategy: __S(161, __c5, 1) }),
      ).annotate({ identifier: "StateTemplateAssociation" });
    case 3:
      return S.Array(__S(162, __c5, 2));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(192, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.optional(S.String),
          arn: S.optional(S.String),
          thingArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateVehicleResponseItem" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String,
          modelManifestArn: S.optional(S.String),
          decoderManifestArn: S.optional(S.String),
          attributes: S.optional(__S(128, __c4, 0)),
          attributeUpdateMode: S.optional(S.String),
          stateTemplatesToAdd: S.optional(__S(163, __c5, 3)),
          stateTemplatesToRemove: S.optional(__S(1472, __c46, 0)),
          stateTemplatesToUpdate: S.optional(__S(163, __c5, 3)),
        }),
      ).annotate({ identifier: "UpdateVehicleRequestItem" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ vehicles: __S(257, __c8, 1) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/vehicles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchUpdateVehicleRequest" });
    case 3:
      return S.Array(__S(288, __c9, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.optional(S.String),
          code: S.optional(S.Number),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateVehicleError" });
    case 5:
      return S.Array(__S(260, __c8, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          vehicles: S.optional(__S(259, __c8, 3)),
          errors: S.optional(__S(261, __c8, 5)),
        }),
      ).annotate({ identifier: "BatchUpdateVehicleResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vehicleName: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateVehicleResponseItem" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          signalCatalogArn: S.String,
          targetArn: S.String,
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          postTriggerCollectionDuration: S.optional(S.Number),
          diagnosticsMode: S.optional(S.String),
          spoolingMode: S.optional(S.String),
          compression: S.optional(S.String),
          priority: S.optional(S.Number),
          signalsToCollect: S.optional(__S(385, __c12, 1)),
          collectionScheme: __S(388, __c12, 4),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          tags: S.optional(__S(193, __c6, 1)),
          dataDestinationConfigs: S.optional(__S(393, __c12, 9)),
          dataPartitions: S.optional(__S(397, __c12, 13)),
          signalsToFetch: S.optional(__S(403, __c12, 19)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/campaigns/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCampaignRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateCampaignResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          maxSampleCount: S.optional(S.Number),
          minimumSamplingIntervalMs: S.optional(S.Number),
          dataPartitionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SignalInformation" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() => S.Struct({ periodMs: S.Number })).annotate({
        identifier: "TimeBasedCollectionScheme",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          expression: SensitiveString,
          minimumTriggerIntervalMs: S.optional(S.Number),
          triggerMode: S.optional(S.String),
          conditionLanguageVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConditionBasedCollectionScheme" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ timeBasedCollectionScheme: __S(386, __c12, 2) }),
        /*@__PURE__*/ S.Struct({ conditionBasedCollectionScheme: __S(387, __c12, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          bucketArn: S.String,
          dataFormat: S.optional(S.String),
          storageCompressionFormat: S.optional(S.String),
          prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Config" });
    case 6:
      return S.suspend(() =>
        S.Struct({ timestreamTableArn: S.String, executionRoleArn: S.String }),
      ).annotate({ identifier: "TimestreamConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({ mqttTopicArn: S.String, executionRoleArn: S.String }),
      ).annotate({ identifier: "MqttTopicConfig" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Config: __S(389, __c12, 5) }),
        /*@__PURE__*/ S.Struct({ timestreamConfig: __S(390, __c12, 6) }),
        /*@__PURE__*/ S.Struct({ mqttTopicConfig: __S(391, __c12, 7) }),
      ]);
    case 9:
      return S.Array(__S(392, __c12, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          maximumSize: __S(96, __c3, 0),
          storageLocation: SensitiveString,
          minimumTimeToLive: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "DataPartitionStorageOptions" });
    case 11:
      return S.suspend(() =>
        S.Struct({ expression: SensitiveString, conditionLanguageVersion: S.optional(S.Number) }),
      ).annotate({ identifier: "DataPartitionUploadOptions" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          storageOptions: __S(394, __c12, 10),
          uploadOptions: S.optional(__S(395, __c12, 11)),
        }),
      ).annotate({ identifier: "DataPartition" });
    case 13:
      return S.Array(__S(396, __c12, 12));
    case 14:
      return S.suspend(() => S.Struct({ executionFrequencyMs: S.Number })).annotate({
        identifier: "TimeBasedSignalFetchConfig",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({ conditionExpression: SensitiveString, triggerMode: S.String }),
      ).annotate({ identifier: "ConditionBasedSignalFetchConfig" });
    case 16:
      return S.Union([
        /*@__PURE__*/ S.Struct({ timeBased: __S(398, __c12, 14) }),
        /*@__PURE__*/ S.Struct({ conditionBased: __S(399, __c12, 15) }),
      ]);
    case 17:
      return S.Array(SensitiveString);
    case 18:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          signalFetchConfig: __S(400, __c12, 16),
          conditionLanguageVersion: S.optional(S.Number),
          actions: __S(401, __c12, 17),
        }),
      ).annotate({ identifier: "SignalFetchInformation" });
    case 19:
      return S.Array(__S(402, __c12, 18));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          modelManifestArn: S.String,
          signalDecoders: S.optional(__S(523, __c16, 11)),
          networkInterfaces: S.optional(__S(485, __c15, 5)),
          defaultForUnmappedSignals: S.optional(S.String),
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/decoder-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDecoderManifestRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, arn: S.String })).annotate({
        identifier: "CreateDecoderManifestResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          protocolName: S.optional(S.String),
          protocolVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CanInterface" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          requestMessageId: S.Number,
          obdStandard: S.optional(S.String),
          pidRequestIntervalSeconds: S.optional(S.Number),
          dtcRequestIntervalSeconds: S.optional(S.Number),
          useExtendedIds: S.optional(S.Boolean),
          hasTransmissionEcu: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ObdInterface" });
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, protocolName: S.String })).annotate({
        identifier: "VehicleMiddleware",
      });
    case 3:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({
        identifier: "CustomDecodingInterface",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          interfaceId: S.String,
          type: S.String,
          canInterface: S.optional(__S(480, __c15, 0)),
          obdInterface: S.optional(__S(481, __c15, 1)),
          vehicleMiddleware: S.optional(__S(482, __c15, 2)),
          customDecodingInterface: S.optional(__S(483, __c15, 3)),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 5:
      return S.Array(__S(484, __c15, 4));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageId: S.Number,
          isBigEndian: S.Boolean,
          isSigned: S.Boolean,
          startBit: S.Number,
          offset: S.Number,
          factor: S.Number,
          length: S.Number,
          name: S.optional(S.String),
          signalValueType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CanSignal" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pidResponseLength: S.Number,
          serviceMode: S.Number,
          pid: S.Number,
          scaling: S.Number,
          offset: S.Number,
          startByte: S.Number,
          byteLength: S.Number,
          bitRightShift: S.optional(S.Number),
          bitMaskLength: S.optional(S.Number),
          isSigned: S.optional(S.Boolean),
          signalValueType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ObdSignal" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          primitiveType: S.String,
          offset: S.optional(S.Number),
          scaling: S.optional(S.Number),
          upperBound: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ROS2PrimitiveMessageDefinition" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ros2PrimitiveMessageDefinition: __S(514, __c16, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          memberType: S.suspend(() => __S(519, __c16, 7)).annotate({
            identifier: "StructuredMessage",
          }),
          listType: S.String,
          capacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StructuredMessageListDefinition" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          fieldName: S.String,
          dataType: S.suspend(() => __S(519, __c16, 7)).annotate({
            identifier: "StructuredMessage",
          }),
        }),
      ).annotate({ identifier: "StructuredMessageFieldNameAndDataTypePair" });
    case 6:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<StructuredMessageFieldNameAndDataTypePair> =>
          __S(517, __c16, 5),
        ).annotate({ identifier: "StructuredMessageFieldNameAndDataTypePair" }),
      );
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ primitiveMessageDefinition: __S(515, __c16, 3) }),
        /*@__PURE__*/ S.Struct({
          structuredMessageListDefinition: /*@__PURE__*/ S.suspend(
            (): S.Schema<StructuredMessageListDefinition> => __S(516, __c16, 4),
          ).annotate({ identifier: "StructuredMessageListDefinition" }),
        }),
        /*@__PURE__*/ S.Struct({
          structuredMessageDefinition: /*@__PURE__*/ S.suspend(() => __S(518, __c16, 6)).annotate({
            identifier: "StructuredMessageDefinition",
          }),
        }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({ topicName: S.String, structuredMessage: __S(519, __c16, 7) }),
      ).annotate({ identifier: "MessageSignal" });
    case 9:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "CustomDecodingSignal",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          type: S.String,
          interfaceId: S.String,
          canSignal: S.optional(__S(512, __c16, 0)),
          obdSignal: S.optional(__S(513, __c16, 1)),
          messageSignal: S.optional(__S(520, __c16, 8)),
          customDecodingSignal: S.optional(__S(521, __c16, 9)),
        }),
      ).annotate({ identifier: "SignalDecoder" });
    case 11:
      return S.Array(__S(522, __c16, 10));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          description: S.optional(S.String),
          signalCatalogArn: S.String,
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/fleets/{fleetId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFleetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, arn: S.String })).annotate({
        identifier: "CreateFleetResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          nodes: __S(1472, __c46, 0),
          signalCatalogArn: S.String,
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateModelManifestRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          nodes: S.optional(__S(1510, __c47, 6)),
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/signal-catalogs/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSignalCatalogRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          signalCatalogArn: S.String,
          stateTemplateProperties: __S(1472, __c46, 0),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          metadataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/state-templates/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStateTemplateRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateStateTemplateResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
          modelManifestArn: S.String,
          decoderManifestArn: S.String,
          attributes: S.optional(__S(128, __c4, 0)),
          associationBehavior: S.optional(S.String),
          tags: S.optional(__S(193, __c6, 1)),
          stateTemplates: S.optional(__S(163, __c5, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/vehicles/{vehicleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVehicleRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          reason: S.optional(S.String),
          hint: S.optional(S.String),
        }),
      ).annotate({ identifier: "InvalidSignalDecoder" });
    case 1:
      return S.Array(__S(736, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ interfaceId: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "InvalidNetworkInterface" });
    case 3:
      return S.Array(__S(738, __c23, 2));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/campaigns/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/decoder-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDecoderManifestRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fleetId: S.String.pipe(T.HttpLabel("fleetId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/fleets/{fleetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFleetRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteFleetResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/model-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteModelManifestRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/signal-catalogs/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSignalCatalogRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/state-templates/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStateTemplateRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vehicleName: S.String.pipe(T.HttpLabel("vehicleName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/vehicles/{vehicleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVehicleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ vehicleName: S.String, arn: S.String })).annotate({
        identifier: "DeleteVehicleResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
          fleetId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/vehicles/{vehicleName}/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateVehicleFleetRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/campaigns/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          postTriggerCollectionDuration: S.optional(S.Number),
          diagnosticsMode: S.optional(S.String),
          spoolingMode: S.optional(S.String),
          compression: S.optional(S.String),
          priority: S.optional(S.Number),
          signalsToCollect: S.optional(__S(385, __c12, 1)),
          collectionScheme: S.optional(__S(388, __c12, 4)),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dataDestinationConfigs: S.optional(__S(393, __c12, 9)),
          dataPartitions: S.optional(__S(397, __c12, 13)),
          signalsToFetch: S.optional(__S(403, __c12, 19)),
        }),
      ).annotate({ identifier: "GetCampaignResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/decoder-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDecoderManifestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          modelManifestArn: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDecoderManifestResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/encryptionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEncryptionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          kmsKeyId: S.optional(S.String),
          encryptionStatus: S.String,
          encryptionType: S.String,
          errorMessage: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetEncryptionConfigurationResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fleetId: S.String.pipe(T.HttpLabel("fleetId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/fleets/{fleetId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFleetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          description: S.optional(S.String),
          signalCatalogArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetFleetResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/loggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLoggingOptionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ cloudWatchLogDelivery: __S(1216, __c38, 0) })).annotate({
        identifier: "GetLoggingOptionsResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logType: S.String, logGroupName: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLogDeliveryOptions" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelManifestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetModelManifestResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/account/registration_status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegisterAccountStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timestreamDatabaseName: S.String,
          timestreamTableName: S.String,
          timestreamDatabaseArn: S.optional(S.String),
          timestreamTableArn: S.optional(S.String),
          registrationStatus: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimestreamRegistrationResponse" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          registrationStatus: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "IamRegistrationResponse" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          customerAccountId: S.String,
          accountStatus: S.String,
          timestreamRegistrationResponse: S.optional(__S(1281, __c40, 1)),
          iamRegistrationResponse: __S(1282, __c40, 2),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetRegisterAccountStatusResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signal-catalogs/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSignalCatalogRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          totalNodes: S.optional(S.Number),
          totalBranches: S.optional(S.Number),
          totalSensors: S.optional(S.Number),
          totalAttributes: S.optional(S.Number),
          totalActuators: S.optional(S.Number),
          totalStructs: S.optional(S.Number),
          totalProperties: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NodeCounts" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          nodeCounts: S.optional(__S(1313, __c41, 1)),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetSignalCatalogResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/state-templates/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStateTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          stateTemplateProperties: S.optional(__S(1472, __c46, 0)),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          metadataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetStateTemplateResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vehicleName: S.String.pipe(T.HttpLabel("vehicleName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vehicles/{vehicleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVehicleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.optional(S.String),
          arn: S.optional(S.String),
          modelManifestArn: S.optional(S.String),
          decoderManifestArn: S.optional(S.String),
          attributes: S.optional(__S(128, __c4, 0)),
          stateTemplates: S.optional(__S(163, __c5, 3)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetVehicleResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vehicles/{vehicleName}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVehicleStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          campaignName: S.optional(S.String),
          vehicleName: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "VehicleStatus" });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ campaigns: S.optional(__S(1410, __c44, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetVehicleStatusResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(T.Blob);
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkInterface: S.String,
          canDbcFiles: __S(1440, __c45, 0),
          signalsMap: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "CanDbcDefinition" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ canDbc: __S(1441, __c45, 1) })]);
    case 3:
      return S.Array(__S(1442, __c45, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          networkFileDefinitions: __S(1443, __c45, 3),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/decoder-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportDecoderManifestRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          description: S.optional(S.String),
          deprecationMessage: S.optional(S.String),
          comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "Branch" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          dataType: S.String,
          description: S.optional(S.String),
          unit: S.optional(S.String),
          allowedValues: S.optional(__S(1472, __c46, 0)),
          min: S.optional(S.Number),
          max: S.optional(S.Number),
          deprecationMessage: S.optional(S.String),
          comment: S.optional(S.String),
          structFullyQualifiedName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Sensor" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          dataType: S.String,
          description: S.optional(S.String),
          unit: S.optional(S.String),
          allowedValues: S.optional(__S(1472, __c46, 0)),
          min: S.optional(S.Number),
          max: S.optional(S.Number),
          assignedValue: S.optional(S.String),
          deprecationMessage: S.optional(S.String),
          comment: S.optional(S.String),
          structFullyQualifiedName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Actuator" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          dataType: S.String,
          description: S.optional(S.String),
          unit: S.optional(S.String),
          allowedValues: S.optional(__S(1472, __c46, 0)),
          min: S.optional(S.Number),
          max: S.optional(S.Number),
          assignedValue: S.optional(S.String),
          defaultValue: S.optional(S.String),
          deprecationMessage: S.optional(S.String),
          comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "Attribute" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          fullyQualifiedName: S.String,
          dataType: S.String,
          dataEncoding: S.optional(S.String),
          description: S.optional(S.String),
          deprecationMessage: S.optional(S.String),
          comment: S.optional(S.String),
          structFullyQualifiedName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomProperty" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ branch: __S(1504, __c47, 0) }),
        /*@__PURE__*/ S.Struct({ sensor: __S(1505, __c47, 1) }),
        /*@__PURE__*/ S.Struct({ actuator: __S(1506, __c47, 2) }),
        /*@__PURE__*/ S.Struct({ attribute: __S(1507, __c47, 3) }),
        /*@__PURE__*/ S.Struct({ struct: __S(1504, __c47, 0) }),
        /*@__PURE__*/ S.Struct({ property: __S(1508, __c47, 4) }),
      ]);
    case 6:
      return S.Array(__S(1509, __c47, 5));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ vssJson: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          vss: S.optional(__S(1536, __c48, 0)),
          tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/signal-catalogs/{name}/nodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportSignalCatalogRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/campaigns" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCampaignsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CampaignSummary" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          campaignSummaries: S.optional(__S(1570, __c49, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCampaignsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/decoder-manifests/{name}/network-interfaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDecoderManifestNetworkInterfacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkInterfaces: S.optional(__S(485, __c15, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDecoderManifestNetworkInterfacesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelManifestArn: S.optional(S.String).pipe(T.HttpQuery("modelManifestArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/decoder-manifests" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDecoderManifestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          modelManifestArn: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DecoderManifestSummary" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(1634, __c51, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDecoderManifestsResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/decoder-manifests/{name}/signals" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDecoderManifestSignalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          signalDecoders: S.optional(__S(523, __c16, 11)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDecoderManifestSignalsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/fleets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFleetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          description: S.optional(S.String),
          signalCatalogArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FleetSummary" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          fleetSummaries: S.optional(__S(1698, __c53, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFleetsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vehicles/{vehicleName}/fleets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFleetsForVehicleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ fleets: S.optional(__S(1472, __c46, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFleetsForVehicleResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-manifests/{name}/nodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListModelManifestNodesRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nodes: S.optional(__S(1510, __c47, 6)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListModelManifestNodesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          signalCatalogArn: S.optional(S.String).pipe(T.HttpQuery("signalCatalogArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/model-manifests" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListModelManifestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ModelManifestSummary" });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(1826, __c57, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListModelManifestsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          signalNodeType: S.optional(S.String).pipe(T.HttpQuery("signalNodeType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/signal-catalogs/{name}/nodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSignalCatalogNodesRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "InvalidSignal" });
    case 1:
      return S.Array(__S(1888, __c59, 0));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/signal-catalogs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSignalCatalogsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SignalCatalogSummary" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(1922, __c60, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSignalCatalogsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/state-templates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListStateTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          signalCatalogArn: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "StateTemplateSummary" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(1954, __c61, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStateTemplatesResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(193, __c6, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelManifestArn: S.optional(S.String).pipe(T.HttpQuery("modelManifestArn")),
          attributeNames: S.optional(__S(1472, __c46, 0)).pipe(T.HttpQuery("attributeNames")),
          attributeValues: S.optional(__S(1472, __c46, 0)).pipe(T.HttpQuery("attributeValues")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          listResponseScope: S.optional(S.String).pipe(T.HttpQuery("listResponseScope")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/vehicles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVehiclesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String,
          arn: S.String,
          modelManifestArn: S.String,
          decoderManifestArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          attributes: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "VehicleSummary" });
    case 2:
      return S.Array(__S(2017, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          vehicleSummaries: S.optional(__S(2018, __c63, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVehiclesResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/fleets/{fleetId}/vehicles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVehiclesInFleetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ vehicles: S.optional(__S(1472, __c46, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVehiclesInFleetResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsKeyId: S.optional(S.String), encryptionType: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/encryptionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEncryptionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          kmsKeyId: S.optional(S.String),
          encryptionStatus: S.String,
          encryptionType: S.String,
        }),
      ).annotate({ identifier: "PutEncryptionConfigurationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cloudWatchLogDelivery: __S(1216, __c38, 0) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/loggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutLoggingOptionsRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ timestreamDatabaseName: S.String, timestreamTableName: S.String }),
      ).annotate({ identifier: "TimestreamResources" });
    case 1:
      return S.suspend(() => S.Struct({ roleArn: S.String })).annotate({
        identifier: "IamResources",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          timestreamResources: S.optional(__S(2144, __c67, 0)),
          iamResources: S.optional(__S(2145, __c67, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/account/registration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterAccountRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          registerAccountStatus: S.String,
          timestreamResources: S.optional(__S(2144, __c67, 0)),
          iamResources: __S(2145, __c67, 1),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "RegisterAccountResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")),
          Tags: __S(193, __c6, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")),
          TagKeys: __S(1472, __c46, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(T.all(T.Http({ method: "DELETE", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          action: S.String,
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/campaigns/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateCampaignResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          signalDecodersToAdd: S.optional(__S(523, __c16, 11)),
          signalDecodersToUpdate: S.optional(__S(523, __c16, 11)),
          signalDecodersToRemove: S.optional(__S(1472, __c46, 0)),
          networkInterfacesToAdd: S.optional(__S(485, __c15, 5)),
          networkInterfacesToUpdate: S.optional(__S(485, __c15, 5)),
          networkInterfacesToRemove: S.optional(__S(1472, __c46, 0)),
          status: S.optional(S.String),
          defaultForUnmappedSignals: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/decoder-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDecoderManifestRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/fleets/{fleetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFleetRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          nodesToAdd: S.optional(__S(1472, __c46, 0)),
          nodesToRemove: S.optional(__S(1472, __c46, 0)),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/model-manifests/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateModelManifestRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          nodesToAdd: S.optional(__S(1510, __c47, 6)),
          nodesToUpdate: S.optional(__S(1510, __c47, 6)),
          nodesToRemove: S.optional(__S(1472, __c46, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/signal-catalogs/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSignalCatalogRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(S.String),
          stateTemplatePropertiesToAdd: S.optional(__S(1472, __c46, 0)),
          stateTemplatePropertiesToRemove: S.optional(__S(1472, __c46, 0)),
          dataExtraDimensions: S.optional(__S(1472, __c46, 0)),
          metadataExtraDimensions: S.optional(__S(1472, __c46, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/state-templates/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStateTemplateRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
          modelManifestArn: S.optional(S.String),
          decoderManifestArn: S.optional(S.String),
          attributes: S.optional(__S(128, __c4, 0)),
          attributeUpdateMode: S.optional(S.String),
          stateTemplatesToAdd: S.optional(__S(163, __c5, 3)),
          stateTemplatesToRemove: S.optional(__S(1472, __c46, 0)),
          stateTemplatesToUpdate: S.optional(__S(163, __c5, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/vehicles/{vehicleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVehicleRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(2464, __c77, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
