import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "KafkaConnect",
  serviceShapeName: "KafkaConnect",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kafkaconnect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-09-14");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(`https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://kafkaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kafkaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kafkaconnect.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "KafkaConnect",
  service: "KafkaConnect",
  propagate: TxXray.propagate,
} as const;

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type __integerMin1Max8 = number;
export type __integerMin1Max100 = number;
export interface ScaleInPolicy {
  cpuUtilizationPercentage: number;
}
export interface ScaleOutPolicy {
  cpuUtilizationPercentage: number;
}
export interface AutoScaling {
  maxWorkerCount: number;
  mcuCount: number;
  minWorkerCount: number;
  scaleInPolicy?: ScaleInPolicy;
  scaleOutPolicy?: ScaleOutPolicy;
  maxAutoscalingTaskCount?: number;
}
export interface ProvisionedCapacity {
  mcuCount: number;
  workerCount: number;
}
export interface Capacity {
  autoScaling?: AutoScaling;
  provisionedCapacity?: ProvisionedCapacity;
}
export type ConnectorConfiguration = { [key: string]: string | undefined };
export type __stringMax1024 = string;
export type __stringMin1Max128 = string;
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c27, 0);
export interface Vpc {
  securityGroups?: string[];
  subnets: string[];
}
export interface ApacheKafkaCluster {
  bootstrapServers: string;
  vpc: Vpc;
}
export interface KafkaCluster {
  apacheKafkaCluster: ApacheKafkaCluster;
}
export type KafkaClusterClientAuthenticationType = string;
export interface KafkaClusterClientAuthentication {
  authenticationType: string;
}
export type KafkaClusterEncryptionInTransitType = string;
export interface KafkaClusterEncryptionInTransit {
  encryptionType: string;
}
export interface CloudWatchLogsLogDelivery {
  enabled: boolean;
  logGroup?: string;
}
export interface FirehoseLogDelivery {
  deliveryStream?: string;
  enabled: boolean;
}
export interface S3LogDelivery {
  bucket?: string;
  enabled: boolean;
  prefix?: string;
}
export interface WorkerLogDelivery {
  cloudWatchLogs?: CloudWatchLogsLogDelivery;
  firehose?: FirehoseLogDelivery;
  s3?: S3LogDelivery;
}
export interface LogDelivery {
  workerLogDelivery: WorkerLogDelivery;
}
export type NetworkType = string;
export type __longMin1 = number;
export interface CustomPlugin {
  customPluginArn: string;
  revision: number;
}
export interface Plugin {
  customPlugin: CustomPlugin;
}
export type __listOfPlugin = Plugin[];
const __listOfPlugin = /*@__PURE__*/ __L.at(__c28, 4);
export interface WorkerConfiguration {
  revision: number;
  workerConfigurationArn: string;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateConnectorRequest {
  capacity: Capacity;
  connectorConfiguration: { [key: string]: string | undefined };
  connectorDescription?: string;
  connectorName: string;
  kafkaCluster: KafkaCluster;
  kafkaClusterClientAuthentication: KafkaClusterClientAuthentication;
  kafkaClusterEncryptionInTransit: KafkaClusterEncryptionInTransit;
  kafkaConnectVersion: string;
  logDelivery?: LogDelivery;
  networkType?: string;
  plugins: Plugin[];
  serviceExecutionRoleArn: string;
  workerConfiguration?: WorkerConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type ConnectorState = string;
export interface CreateConnectorResponse {
  connectorArn?: string;
  connectorName?: string;
  connectorState?: string;
}
export type CustomPluginContentType = string;
export interface S3Location {
  bucketArn: string;
  fileKey: string;
  objectVersion?: string;
}
export interface CustomPluginLocation {
  s3Location: S3Location;
}
export interface CreateCustomPluginRequest {
  contentType: string;
  description?: string;
  location: CustomPluginLocation;
  name: string;
  tags?: { [key: string]: string | undefined };
}
export type CustomPluginState = string;
export interface CreateCustomPluginResponse {
  customPluginArn?: string;
  customPluginState?: string;
  name?: string;
  revision?: number;
}
export type __sensitiveString = string | redacted.Redacted<string>;
export interface CreateWorkerConfigurationRequest {
  description?: string;
  name: string;
  propertiesFileContent: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export type __timestampIso8601 = Date;
export interface WorkerConfigurationRevisionSummary {
  creationTime?: Date;
  description?: string;
  revision?: number;
}
export type WorkerConfigurationState = string;
export interface CreateWorkerConfigurationResponse {
  creationTime?: Date;
  latestRevision?: WorkerConfigurationRevisionSummary;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export interface DeleteConnectorRequest {
  connectorArn: string;
  currentVersion?: string;
}
export interface DeleteConnectorResponse {
  connectorArn?: string;
  connectorState?: string;
}
export interface DeleteCustomPluginRequest {
  customPluginArn: string;
}
export interface DeleteCustomPluginResponse {
  customPluginArn?: string;
  customPluginState?: string;
}
export interface DeleteWorkerConfigurationRequest {
  workerConfigurationArn: string;
}
export interface DeleteWorkerConfigurationResponse {
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export interface DescribeConnectorRequest {
  connectorArn: string;
}
export interface ScaleInPolicyDescription {
  cpuUtilizationPercentage?: number;
}
export interface ScaleOutPolicyDescription {
  cpuUtilizationPercentage?: number;
}
export interface AutoScalingDescription {
  maxWorkerCount?: number;
  mcuCount?: number;
  minWorkerCount?: number;
  scaleInPolicy?: ScaleInPolicyDescription;
  scaleOutPolicy?: ScaleOutPolicyDescription;
  maxAutoscalingTaskCount?: number;
}
export interface ProvisionedCapacityDescription {
  mcuCount?: number;
  workerCount?: number;
}
export interface CapacityDescription {
  autoScaling?: AutoScalingDescription;
  provisionedCapacity?: ProvisionedCapacityDescription;
}
export interface VpcDescription {
  securityGroups?: string[];
  subnets?: string[];
}
export interface ApacheKafkaClusterDescription {
  bootstrapServers?: string;
  vpc?: VpcDescription;
}
export interface KafkaClusterDescription {
  apacheKafkaCluster?: ApacheKafkaClusterDescription;
}
export interface KafkaClusterClientAuthenticationDescription {
  authenticationType?: string;
}
export interface KafkaClusterEncryptionInTransitDescription {
  encryptionType?: string;
}
export interface CloudWatchLogsLogDeliveryDescription {
  enabled?: boolean;
  logGroup?: string;
}
export interface FirehoseLogDeliveryDescription {
  deliveryStream?: string;
  enabled?: boolean;
}
export interface S3LogDeliveryDescription {
  bucket?: string;
  enabled?: boolean;
  prefix?: string;
}
export interface WorkerLogDeliveryDescription {
  cloudWatchLogs?: CloudWatchLogsLogDeliveryDescription;
  firehose?: FirehoseLogDeliveryDescription;
  s3?: S3LogDeliveryDescription;
}
export interface LogDeliveryDescription {
  workerLogDelivery?: WorkerLogDeliveryDescription;
}
export interface CustomPluginDescription {
  customPluginArn?: string;
  revision?: number;
}
export interface PluginDescription {
  customPlugin?: CustomPluginDescription;
}
export type __listOfPluginDescription = PluginDescription[];
const __listOfPluginDescription = /*@__PURE__*/ __L.at(__c7, 6);
export interface WorkerConfigurationDescription {
  revision?: number;
  workerConfigurationArn?: string;
}
export interface StateDescription {
  code?: string;
  message?: string;
}
export interface DescribeConnectorResponse {
  capacity?: CapacityDescription;
  connectorArn?: string;
  connectorConfiguration?: { [key: string]: string | undefined };
  connectorDescription?: string;
  connectorName?: string;
  connectorState?: string;
  creationTime?: Date;
  currentVersion?: string;
  kafkaCluster?: KafkaClusterDescription;
  kafkaClusterClientAuthentication?: KafkaClusterClientAuthenticationDescription;
  kafkaClusterEncryptionInTransit?: KafkaClusterEncryptionInTransitDescription;
  kafkaConnectVersion?: string;
  logDelivery?: LogDeliveryDescription;
  networkType?: string;
  plugins?: PluginDescription[];
  serviceExecutionRoleArn?: string;
  workerConfiguration?: WorkerConfigurationDescription;
  stateDescription?: StateDescription;
}
export interface DescribeConnectorOperationRequest {
  connectorOperationArn: string;
}
export type ConnectorOperationState = string;
export type ConnectorOperationType = string;
export type ConnectorOperationStepType = string;
export type ConnectorOperationStepState = string;
export interface ConnectorOperationStep {
  stepType?: string;
  stepState?: string;
}
export type __listOfConnectorOperationStep = ConnectorOperationStep[];
const __listOfConnectorOperationStep = /*@__PURE__*/ __L.at(__c9, 2);
export interface WorkerSetting {
  capacity?: CapacityDescription;
  plugins?: PluginDescription[];
  workerConfiguration?: WorkerConfigurationDescription;
  useDefaultWorkerConfiguration?: boolean;
}
export interface DescribeConnectorOperationResponse {
  connectorArn?: string;
  connectorOperationArn?: string;
  connectorOperationState?: string;
  connectorOperationType?: string;
  operationSteps?: ConnectorOperationStep[];
  originWorkerSetting?: WorkerSetting;
  originConnectorConfiguration?: { [key: string]: string | undefined };
  targetWorkerSetting?: WorkerSetting;
  targetConnectorConfiguration?: { [key: string]: string | undefined };
  errorInfo?: StateDescription;
  creationTime?: Date;
  endTime?: Date;
}
export interface DescribeCustomPluginRequest {
  customPluginArn: string;
}
export interface CustomPluginFileDescription {
  fileMd5?: string;
  fileSize?: number;
}
export interface S3LocationDescription {
  bucketArn?: string;
  fileKey?: string;
  objectVersion?: string;
}
export interface CustomPluginLocationDescription {
  s3Location?: S3LocationDescription;
}
export interface CustomPluginRevisionSummary {
  contentType?: string;
  creationTime?: Date;
  description?: string;
  fileDescription?: CustomPluginFileDescription;
  location?: CustomPluginLocationDescription;
  revision?: number;
}
export interface DescribeCustomPluginResponse {
  creationTime?: Date;
  customPluginArn?: string;
  customPluginState?: string;
  description?: string;
  latestRevision?: CustomPluginRevisionSummary;
  name?: string;
  stateDescription?: StateDescription;
}
export interface DescribeWorkerConfigurationRequest {
  workerConfigurationArn: string;
}
export interface WorkerConfigurationRevisionDescription {
  creationTime?: Date;
  description?: string;
  propertiesFileContent?: string | redacted.Redacted<string>;
  revision?: number;
}
export interface DescribeWorkerConfigurationResponse {
  creationTime?: Date;
  description?: string;
  latestRevision?: WorkerConfigurationRevisionDescription;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export type MaxResults = number;
export interface ListConnectorOperationsRequest {
  connectorArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ConnectorOperationSummary {
  connectorOperationArn?: string;
  connectorOperationType?: string;
  connectorOperationState?: string;
  creationTime?: Date;
  endTime?: Date;
}
export type __listOfConnectorOperationSummary = ConnectorOperationSummary[];
const __listOfConnectorOperationSummary = /*@__PURE__*/ __L.at(__c13, 2);
export interface ListConnectorOperationsResponse {
  connectorOperations?: ConnectorOperationSummary[];
  nextToken?: string;
}
export interface ListConnectorsRequest {
  connectorNamePrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ConnectorSummary {
  capacity?: CapacityDescription;
  connectorArn?: string;
  connectorDescription?: string;
  connectorName?: string;
  connectorState?: string;
  creationTime?: Date;
  currentVersion?: string;
  kafkaCluster?: KafkaClusterDescription;
  kafkaClusterClientAuthentication?: KafkaClusterClientAuthenticationDescription;
  kafkaClusterEncryptionInTransit?: KafkaClusterEncryptionInTransitDescription;
  kafkaConnectVersion?: string;
  logDelivery?: LogDeliveryDescription;
  networkType?: string;
  plugins?: PluginDescription[];
  serviceExecutionRoleArn?: string;
  workerConfiguration?: WorkerConfigurationDescription;
}
export type __listOfConnectorSummary = ConnectorSummary[];
const __listOfConnectorSummary = /*@__PURE__*/ __L.at(__c14, 2);
export interface ListConnectorsResponse {
  connectors?: ConnectorSummary[];
  nextToken?: string;
}
export interface ListCustomPluginsRequest {
  maxResults?: number;
  nextToken?: string;
  namePrefix?: string;
}
export interface CustomPluginSummary {
  creationTime?: Date;
  customPluginArn?: string;
  customPluginState?: string;
  description?: string;
  latestRevision?: CustomPluginRevisionSummary;
  name?: string;
}
export type __listOfCustomPluginSummary = CustomPluginSummary[];
const __listOfCustomPluginSummary = /*@__PURE__*/ __L.at(__c15, 2);
export interface ListCustomPluginsResponse {
  customPlugins?: CustomPluginSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListWorkerConfigurationsRequest {
  maxResults?: number;
  nextToken?: string;
  namePrefix?: string;
}
export interface WorkerConfigurationSummary {
  creationTime?: Date;
  description?: string;
  latestRevision?: WorkerConfigurationRevisionSummary;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export type __listOfWorkerConfigurationSummary = WorkerConfigurationSummary[];
const __listOfWorkerConfigurationSummary = /*@__PURE__*/ __L.at(__c17, 2);
export interface ListWorkerConfigurationsResponse {
  nextToken?: string;
  workerConfigurations?: WorkerConfigurationSummary[];
}
export interface PauseConnectorRequest {
  connectorArn: string;
}
export interface PauseConnectorResponse {
  connectorArn?: string;
  connectorOperationArn?: string;
}
export interface RestartConnectorRequest {
  connectorArn: string;
  onlyFailedTasks?: boolean;
}
export interface RestartConnectorResponse {
  connectorArn?: string;
  connectorOperationArn?: string;
}
export interface ResumeConnectorRequest {
  connectorArn: string;
}
export interface ResumeConnectorResponse {
  connectorArn?: string;
  connectorOperationArn?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
const TagKeyList = __listOf__string as any as S.Schema<TagKeyList>;
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface ScaleInPolicyUpdate {
  cpuUtilizationPercentage: number;
}
export interface ScaleOutPolicyUpdate {
  cpuUtilizationPercentage: number;
}
export interface AutoScalingUpdate {
  maxWorkerCount: number;
  mcuCount: number;
  minWorkerCount: number;
  scaleInPolicy: ScaleInPolicyUpdate;
  scaleOutPolicy: ScaleOutPolicyUpdate;
  maxAutoscalingTaskCount?: number;
}
export interface ProvisionedCapacityUpdate {
  mcuCount: number;
  workerCount: number;
}
export interface CapacityUpdate {
  autoScaling?: AutoScalingUpdate;
  provisionedCapacity?: ProvisionedCapacityUpdate;
}
export type ConnectorConfigurationUpdate = { [key: string]: string | undefined };
export interface CustomPluginUpdate {
  customPluginArn: string;
  revision: number;
}
export interface PluginUpdate {
  customPlugin: CustomPluginUpdate;
}
export type __listOfPluginUpdate = PluginUpdate[];
const __listOfPluginUpdate = __listOfPlugin as any as S.Schema<__listOfPluginUpdate>;
export interface WorkerConfigurationUpdate {
  revision: number;
  workerConfigurationArn: string;
}
export interface UpdateConnectorRequest {
  capacity?: CapacityUpdate;
  connectorConfiguration?: { [key: string]: string | undefined };
  skipHealthValidation?: boolean;
  connectorArn: string;
  currentVersion: string;
  plugins?: PluginUpdate[];
  workerConfiguration?: WorkerConfigurationUpdate;
  useDefaultWorkerConfiguration?: boolean;
}
export interface UpdateConnectorResponse {
  connectorArn?: string;
  connectorState?: string;
  connectorOperationArn?: string;
}
export type CreateConnectorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a connector using the specified properties.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest & RegionInput,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(428, __c26, 12) as any as S.Schema<CreateConnectorRequest>,
  output: __S(429, __c26, 13) as any as S.Schema<CreateConnectorResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
  telemetry: TELEMETRY,
  span: "CreateConnector",
}));

export type CreateCustomPluginError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a custom plugin using the specified properties.
 */
export const createCustomPlugin: API.OperationMethod<
  CreateCustomPluginRequest & RegionInput,
  CreateCustomPluginResponse,
  CreateCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(482, __c30, 2) as any as S.Schema<CreateCustomPluginRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<CreateCustomPluginResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomPlugin",
  telemetry: TELEMETRY,
  span: "CreateCustomPlugin",
}));

export type CreateWorkerConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a worker configuration using the specified properties.
 */
export const createWorkerConfiguration: API.OperationMethod<
  CreateWorkerConfigurationRequest & RegionInput,
  CreateWorkerConfigurationResponse,
  CreateWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateWorkerConfigurationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateWorkerConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkerConfiguration",
  telemetry: TELEMETRY,
  span: "CreateWorkerConfiguration",
}));

export type DeleteConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest & RegionInput,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<DeleteConnectorResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
  telemetry: TELEMETRY,
  span: "DeleteConnector",
}));

export type DeleteCustomPluginError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a custom plugin.
 */
export const deleteCustomPlugin: API.OperationMethod<
  DeleteCustomPluginRequest & RegionInput,
  DeleteCustomPluginResponse,
  DeleteCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteCustomPluginRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<DeleteCustomPluginResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomPlugin",
  telemetry: TELEMETRY,
  span: "DeleteCustomPlugin",
}));

export type DeleteWorkerConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified worker configuration.
 */
export const deleteWorkerConfiguration: API.OperationMethod<
  DeleteWorkerConfigurationRequest & RegionInput,
  DeleteWorkerConfigurationResponse,
  DeleteWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteWorkerConfigurationRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<DeleteWorkerConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkerConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteWorkerConfiguration",
}));

export type DescribeConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns summary information about the connector.
 */
export const describeConnector: API.OperationMethod<
  DescribeConnectorRequest & RegionInput,
  DescribeConnectorResponse,
  DescribeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DescribeConnectorRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<DescribeConnectorResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnector",
  telemetry: TELEMETRY,
  span: "DescribeConnector",
}));

export type DescribeConnectorOperationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about the specified connector's operations.
 */
export const describeConnectorOperation: API.OperationMethod<
  DescribeConnectorOperationRequest & RegionInput,
  DescribeConnectorOperationResponse,
  DescribeConnectorOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DescribeConnectorOperationRequest>,
  output: __S(148, __c9, 4) as any as S.Schema<DescribeConnectorOperationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectorOperation",
  telemetry: TELEMETRY,
  span: "DescribeConnectorOperation",
}));

export type DescribeCustomPluginError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A summary description of the custom plugin.
 */
export const describeCustomPlugin: API.OperationMethod<
  DescribeCustomPluginRequest & RegionInput,
  DescribeCustomPluginResponse,
  DescribeCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeCustomPluginRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<DescribeCustomPluginResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomPlugin",
  telemetry: TELEMETRY,
  span: "DescribeCustomPlugin",
}));

export type DescribeWorkerConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a worker configuration.
 */
export const describeWorkerConfiguration: API.OperationMethod<
  DescribeWorkerConfigurationRequest & RegionInput,
  DescribeWorkerConfigurationResponse,
  DescribeWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DescribeWorkerConfigurationRequest>,
  output: __S(194, __c12, 2) as any as S.Schema<DescribeWorkerConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkerConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeWorkerConfiguration",
}));

export type ListConnectorOperationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a connector's operation(s).
 */
export const listConnectorOperations: API.PaginatedOperationMethod<
  ListConnectorOperationsRequest & RegionInput,
  ListConnectorOperationsResponse,
  ListConnectorOperationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListConnectorOperationsRequest>,
  output: __S(211, __c13, 3) as any as S.Schema<ListConnectorOperationsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectorOperations",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConnectorOperations",
})) as any;

export type ListConnectorsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the connectors in this account and Region. The list is limited to connectors whose name starts with the specified prefix. The response also includes a description of each of the listed connectors.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest & RegionInput,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<ListConnectorsRequest>,
  output: __S(227, __c14, 3) as any as S.Schema<ListConnectorsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectors",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConnectors",
})) as any;

export type ListCustomPluginsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all of the custom plugins in this account and Region.
 */
export const listCustomPlugins: API.PaginatedOperationMethod<
  ListCustomPluginsRequest & RegionInput,
  ListCustomPluginsResponse,
  ListCustomPluginsError,
  Credentials | HttpClient.HttpClient,
  CustomPluginSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListCustomPluginsRequest>,
  output: __S(243, __c15, 3) as any as S.Schema<ListCustomPluginsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomPlugins",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "customPlugins",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCustomPlugins",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all the tags attached to the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListWorkerConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all of the worker configurations in this account and Region.
 */
export const listWorkerConfigurations: API.PaginatedOperationMethod<
  ListWorkerConfigurationsRequest & RegionInput,
  ListWorkerConfigurationsResponse,
  ListWorkerConfigurationsError,
  Credentials | HttpClient.HttpClient,
  WorkerConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListWorkerConfigurationsRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<ListWorkerConfigurationsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkerConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workerConfigurations",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListWorkerConfigurations",
})) as any;

export type PauseConnectorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Pauses the specified connector. The operation runs asynchronously. To track the pause, pass the connector operation ARN from the response to `DescribeConnectorOperation`.
 */
export const pauseConnector: API.OperationMethod<
  PauseConnectorRequest & RegionInput,
  PauseConnectorResponse,
  PauseConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<PauseConnectorRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<PauseConnectorResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseConnector",
  telemetry: TELEMETRY,
  span: "PauseConnector",
}));

export type RestartConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Restarts the specified connector. By default, this operation restarts the connector and all of its tasks. This operation is asynchronous and returns a connector operation ARN that you can pass to `DescribeConnectorOperation` to track the state of the restart.
 */
export const restartConnector: API.OperationMethod<
  RestartConnectorRequest & RegionInput,
  RestartConnectorResponse,
  RestartConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<RestartConnectorRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<RestartConnectorResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartConnector",
  telemetry: TELEMETRY,
  span: "RestartConnector",
}));

export type ResumeConnectorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Resumes the specified paused connector. The operation runs asynchronously. To track the resume, pass the connector operation ARN from the response to `DescribeConnectorOperation`.
 */
export const resumeConnector: API.OperationMethod<
  ResumeConnectorRequest & RegionInput,
  ResumeConnectorResponse,
  ResumeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ResumeConnectorRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<ResumeConnectorResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeConnector",
  telemetry: TELEMETRY,
  span: "ResumeConnector",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(368, __c23, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(368, __c23, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified connector. In the request body, you can update either the connector's worker setting or its connector configuration, but not both in the same request. To update the worker setting, specify one or more of `capacity`, `plugins`, `workerConfiguration`, or `useDefaultWorkerConfiguration`. To update the connector configuration, specify only `connectorConfiguration`.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest & RegionInput,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(402, __c25, 2) as any as S.Schema<UpdateConnectorRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<UpdateConnectorResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
  telemetry: TELEMETRY,
  span: "UpdateConnector",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          name: S.String,
          propertiesFileContent: SensitiveString,
          tags: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/worker-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkerConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          latestRevision: S.optional(__S(16, __c1, 0)),
          name: S.optional(S.String),
          workerConfigurationArn: S.optional(S.String),
          workerConfigurationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWorkerConfigurationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          revision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WorkerConfigurationRevisionSummary" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
          currentVersion: S.optional(S.String).pipe(T.HttpQuery("currentVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/connectors/{connectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ connectorArn: S.optional(S.String), connectorState: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteConnectorResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ customPluginArn: S.String.pipe(T.HttpLabel("customPluginArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/custom-plugins/{customPluginArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomPluginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          customPluginArn: S.optional(S.String),
          customPluginState: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteCustomPluginResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workerConfigurationArn: S.String.pipe(T.HttpLabel("workerConfigurationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/worker-configurations/{workerConfigurationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkerConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workerConfigurationArn: S.optional(S.String),
          workerConfigurationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteWorkerConfigurationResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectorArn: S.String.pipe(T.HttpLabel("connectorArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/connectors/{connectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(__S(115, __c7, 3)),
          connectorArn: S.optional(S.String),
          connectorConfiguration: S.optional(__S(464, __c29, 0)),
          connectorDescription: S.optional(S.String),
          connectorName: S.optional(S.String),
          connectorState: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          currentVersion: S.optional(S.String),
          kafkaCluster: S.optional(__S(130, __c8, 2)),
          kafkaClusterClientAuthentication: S.optional(__S(131, __c8, 3)),
          kafkaClusterEncryptionInTransit: S.optional(__S(132, __c8, 4)),
          kafkaConnectVersion: S.optional(S.String),
          logDelivery: S.optional(__S(137, __c8, 9)),
          networkType: S.optional(S.String),
          plugins: S.optional(__listOfPluginDescription),
          serviceExecutionRoleArn: S.optional(S.String),
          workerConfiguration: S.optional(__S(119, __c7, 7)),
          stateDescription: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "DescribeConnectorResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "StateDescription" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ cpuUtilizationPercentage: S.optional(S.Number) })).annotate(
        { identifier: "ScaleInPolicyDescription" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxWorkerCount: S.optional(S.Number),
          mcuCount: S.optional(S.Number),
          minWorkerCount: S.optional(S.Number),
          scaleInPolicy: S.optional(__S(112, __c7, 0)),
          scaleOutPolicy: S.optional(__S(112, __c7, 0)),
          maxAutoscalingTaskCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutoScalingDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({ mcuCount: S.optional(S.Number), workerCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ProvisionedCapacityDescription" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          autoScaling: S.optional(__S(113, __c7, 1)),
          provisionedCapacity: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "CapacityDescription" });
    case 4:
      return S.suspend(() =>
        S.Struct({ customPluginArn: S.optional(S.String), revision: S.optional(S.Number) }),
      ).annotate({ identifier: "CustomPluginDescription" });
    case 5:
      return S.suspend(() => S.Struct({ customPlugin: S.optional(__S(116, __c7, 4)) })).annotate({
        identifier: "PluginDescription",
      });
    case 6:
      return S.Array(__S(117, __c7, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ revision: S.optional(S.Number), workerConfigurationArn: S.optional(S.String) }),
      ).annotate({ identifier: "WorkerConfigurationDescription" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityGroups: S.optional(__listOf__string),
          subnets: S.optional(__listOf__string),
        }),
      ).annotate({ identifier: "VpcDescription" });
    case 1:
      return S.suspend(() =>
        S.Struct({ bootstrapServers: S.optional(S.String), vpc: S.optional(__S(128, __c8, 0)) }),
      ).annotate({ identifier: "ApacheKafkaClusterDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({ apacheKafkaCluster: S.optional(__S(129, __c8, 1)) }),
      ).annotate({ identifier: "KafkaClusterDescription" });
    case 3:
      return S.suspend(() => S.Struct({ authenticationType: S.optional(S.String) })).annotate({
        identifier: "KafkaClusterClientAuthenticationDescription",
      });
    case 4:
      return S.suspend(() => S.Struct({ encryptionType: S.optional(S.String) })).annotate({
        identifier: "KafkaClusterEncryptionInTransitDescription",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), logGroup: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLogsLogDeliveryDescription" });
    case 6:
      return S.suspend(() =>
        S.Struct({ deliveryStream: S.optional(S.String), enabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "FirehoseLogDeliveryDescription" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3LogDeliveryDescription" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          cloudWatchLogs: S.optional(__S(133, __c8, 5)),
          firehose: S.optional(__S(134, __c8, 6)),
          s3: S.optional(__S(135, __c8, 7)),
        }),
      ).annotate({ identifier: "WorkerLogDeliveryDescription" });
    case 9:
      return S.suspend(() =>
        S.Struct({ workerLogDelivery: S.optional(__S(136, __c8, 8)) }),
      ).annotate({ identifier: "LogDeliveryDescription" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorOperationArn: S.String.pipe(T.HttpLabel("connectorOperationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/connectorOperations/{connectorOperationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConnectorOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ stepType: S.optional(S.String), stepState: S.optional(S.String) }),
      ).annotate({ identifier: "ConnectorOperationStep" });
    case 2:
      return S.Array(__S(145, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(__S(115, __c7, 3)),
          plugins: S.optional(__listOfPluginDescription),
          workerConfiguration: S.optional(__S(119, __c7, 7)),
          useDefaultWorkerConfiguration: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WorkerSetting" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.optional(S.String),
          connectorOperationArn: S.optional(S.String),
          connectorOperationState: S.optional(S.String),
          connectorOperationType: S.optional(S.String),
          operationSteps: S.optional(__listOfConnectorOperationStep),
          originWorkerSetting: S.optional(__S(147, __c9, 3)),
          originConnectorConfiguration: S.optional(__S(464, __c29, 0)),
          targetWorkerSetting: S.optional(__S(147, __c9, 3)),
          targetConnectorConfiguration: S.optional(__S(464, __c29, 0)),
          errorInfo: S.optional(__S(96, __c6, 0)),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DescribeConnectorOperationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ customPluginArn: S.String.pipe(T.HttpLabel("customPluginArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/custom-plugins/{customPluginArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCustomPluginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          customPluginArn: S.optional(S.String),
          customPluginState: S.optional(S.String),
          description: S.optional(S.String),
          latestRevision: S.optional(__S(179, __c11, 3)),
          name: S.optional(S.String),
          stateDescription: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "DescribeCustomPluginResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileMd5: S.optional(S.String), fileSize: S.optional(S.Number) }),
      ).annotate({ identifier: "CustomPluginFileDescription" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bucketArn: S.optional(S.String),
          fileKey: S.optional(S.String),
          objectVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3LocationDescription" });
    case 2:
      return S.suspend(() => S.Struct({ s3Location: S.optional(__S(177, __c11, 1)) })).annotate({
        identifier: "CustomPluginLocationDescription",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          fileDescription: S.optional(__S(176, __c11, 0)),
          location: S.optional(__S(178, __c11, 2)),
          revision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CustomPluginRevisionSummary" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workerConfigurationArn: S.String.pipe(T.HttpLabel("workerConfigurationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/worker-configurations/{workerConfigurationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkerConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          propertiesFileContent: S.optional(SensitiveString),
          revision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WorkerConfigurationRevisionDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          latestRevision: S.optional(__S(193, __c12, 1)),
          name: S.optional(S.String),
          workerConfigurationArn: S.optional(S.String),
          workerConfigurationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeWorkerConfigurationResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/connectors/{connectorArn}/operations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectorOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectorOperationArn: S.optional(S.String),
          connectorOperationType: S.optional(S.String),
          connectorOperationState: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ConnectorOperationSummary" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          connectorOperations: S.optional(__listOfConnectorOperationSummary),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectorOperationsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorNamePrefix: S.optional(S.String).pipe(T.HttpQuery("connectorNamePrefix")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(__S(115, __c7, 3)),
          connectorArn: S.optional(S.String),
          connectorDescription: S.optional(S.String),
          connectorName: S.optional(S.String),
          connectorState: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          currentVersion: S.optional(S.String),
          kafkaCluster: S.optional(__S(130, __c8, 2)),
          kafkaClusterClientAuthentication: S.optional(__S(131, __c8, 3)),
          kafkaClusterEncryptionInTransit: S.optional(__S(132, __c8, 4)),
          kafkaConnectVersion: S.optional(S.String),
          logDelivery: S.optional(__S(137, __c8, 9)),
          networkType: S.optional(S.String),
          plugins: S.optional(__listOfPluginDescription),
          serviceExecutionRoleArn: S.optional(S.String),
          workerConfiguration: S.optional(__S(119, __c7, 7)),
        }),
      ).annotate({ identifier: "ConnectorSummary" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          connectors: S.optional(__listOfConnectorSummary),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          namePrefix: S.optional(S.String).pipe(T.HttpQuery("namePrefix")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/custom-plugins" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCustomPluginsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          customPluginArn: S.optional(S.String),
          customPluginState: S.optional(S.String),
          description: S.optional(S.String),
          latestRevision: S.optional(__S(179, __c11, 3)),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomPluginSummary" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          customPlugins: S.optional(__listOfCustomPluginSummary),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomPluginsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(464, __c29, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          namePrefix: S.optional(S.String).pipe(T.HttpQuery("namePrefix")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/worker-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkerConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          latestRevision: S.optional(__S(16, __c1, 0)),
          name: S.optional(S.String),
          workerConfigurationArn: S.optional(S.String),
          workerConfigurationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkerConfigurationSummary" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          workerConfigurations: S.optional(__listOfWorkerConfigurationSummary),
        }),
      ).annotate({ identifier: "ListWorkerConfigurationsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectorArn: S.String.pipe(T.HttpLabel("connectorArn")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/connectors/{connectorArn}/pause" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PauseConnectorRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.optional(S.String),
          connectorOperationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "PauseConnectorResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
          onlyFailedTasks: S.optional(S.Boolean).pipe(T.HttpQuery("onlyFailedTasks")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/connectors/{connectorArn}/restart" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestartConnectorRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectorArn: S.String.pipe(T.HttpLabel("connectorArn")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/connectors/{connectorArn}/resume" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResumeConnectorRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(464, __c29, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxWorkerCount: S.Number,
          mcuCount: S.Number,
          minWorkerCount: S.Number,
          scaleInPolicy: __S(448, __c28, 0),
          scaleOutPolicy: __S(448, __c28, 0),
          maxAutoscalingTaskCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutoScalingUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoScaling: S.optional(__S(400, __c25, 0)),
          provisionedCapacity: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "CapacityUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(__S(401, __c25, 1)),
          connectorConfiguration: S.optional(__S(464, __c29, 0)),
          skipHealthValidation: S.optional(S.Boolean),
          connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
          currentVersion: S.String.pipe(T.HttpQuery("currentVersion")),
          plugins: S.optional(__listOfPluginUpdate),
          workerConfiguration: S.optional(__S(453, __c28, 5)),
          useDefaultWorkerConfiguration: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/connectors/{connectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.optional(S.String),
          connectorState: S.optional(S.String),
          connectorOperationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateConnectorResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxWorkerCount: S.Number,
          mcuCount: S.Number,
          minWorkerCount: S.Number,
          scaleInPolicy: S.optional(__S(448, __c28, 0)),
          scaleOutPolicy: S.optional(__S(448, __c28, 0)),
          maxAutoscalingTaskCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutoScaling" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoScaling: S.optional(__S(416, __c26, 0)),
          provisionedCapacity: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "Capacity" });
    case 2:
      return S.suspend(() =>
        S.Struct({ securityGroups: S.optional(__listOf__string), subnets: __listOf__string }),
      ).annotate({ identifier: "Vpc" });
    case 3:
      return S.suspend(() =>
        S.Struct({ bootstrapServers: S.String, vpc: __S(418, __c26, 2) }),
      ).annotate({ identifier: "ApacheKafkaCluster" });
    case 4:
      return S.suspend(() => S.Struct({ apacheKafkaCluster: __S(419, __c26, 3) })).annotate({
        identifier: "KafkaCluster",
      });
    case 5:
      return S.suspend(() => S.Struct({ authenticationType: S.String })).annotate({
        identifier: "KafkaClusterClientAuthentication",
      });
    case 6:
      return S.suspend(() => S.Struct({ encryptionType: S.String })).annotate({
        identifier: "KafkaClusterEncryptionInTransit",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ enabled: S.Boolean, logGroup: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLogsLogDelivery" });
    case 8:
      return S.suspend(() =>
        S.Struct({ deliveryStream: S.optional(S.String), enabled: S.Boolean }),
      ).annotate({ identifier: "FirehoseLogDelivery" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          enabled: S.Boolean,
          prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3LogDelivery" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          cloudWatchLogs: S.optional(__S(423, __c26, 7)),
          firehose: S.optional(__S(424, __c26, 8)),
          s3: S.optional(__S(425, __c26, 9)),
        }),
      ).annotate({ identifier: "WorkerLogDelivery" });
    case 11:
      return S.suspend(() => S.Struct({ workerLogDelivery: __S(426, __c26, 10) })).annotate({
        identifier: "LogDelivery",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          capacity: __S(417, __c26, 1),
          connectorConfiguration: __S(464, __c29, 0),
          connectorDescription: S.optional(S.String),
          connectorName: S.String,
          kafkaCluster: __S(420, __c26, 4),
          kafkaClusterClientAuthentication: __S(421, __c26, 5),
          kafkaClusterEncryptionInTransit: __S(422, __c26, 6),
          kafkaConnectVersion: S.String,
          logDelivery: S.optional(__S(427, __c26, 11)),
          networkType: S.optional(S.String),
          plugins: __listOfPlugin,
          serviceExecutionRoleArn: S.String,
          workerConfiguration: S.optional(__S(453, __c28, 5)),
          tags: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.optional(S.String),
          connectorName: S.optional(S.String),
          connectorState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectorResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ cpuUtilizationPercentage: S.Number })).annotate({
        identifier: "ScaleInPolicy",
      });
    case 1:
      return S.suspend(() => S.Struct({ mcuCount: S.Number, workerCount: S.Number })).annotate({
        identifier: "ProvisionedCapacity",
      });
    case 2:
      return S.suspend(() => S.Struct({ customPluginArn: S.String, revision: S.Number })).annotate({
        identifier: "CustomPlugin",
      });
    case 3:
      return S.suspend(() => S.Struct({ customPlugin: __S(450, __c28, 2) })).annotate({
        identifier: "Plugin",
      });
    case 4:
      return S.Array(__S(451, __c28, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ revision: S.Number, workerConfigurationArn: S.String }),
      ).annotate({ identifier: "WorkerConfiguration" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketArn: S.String, fileKey: S.String, objectVersion: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
    case 1:
      return S.suspend(() => S.Struct({ s3Location: __S(480, __c30, 0) })).annotate({
        identifier: "CustomPluginLocation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          contentType: S.String,
          description: S.optional(S.String),
          location: __S(481, __c30, 1),
          name: S.String,
          tags: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/custom-plugins" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomPluginRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          customPluginArn: S.optional(S.String),
          customPluginState: S.optional(S.String),
          name: S.optional(S.String),
          revision: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateCustomPluginResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
