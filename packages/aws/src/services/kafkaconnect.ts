import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "KafkaConnect",
  target: "KafkaConnect",
  version: "2021-09-14",
  sigv4: "kafkaconnect",
  protocol: restJson1Protocol,
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
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
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
export interface WorkerSetting {
  capacity?: CapacityDescription;
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
export interface ListWorkerConfigurationsResponse {
  nextToken?: string;
  workerConfigurations?: WorkerConfigurationSummary[];
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
export type ConnectorConfigurationUpdate = {
  [key: string]: string | undefined;
};
export interface UpdateConnectorRequest {
  capacity?: CapacityUpdate;
  connectorConfiguration?: { [key: string]: string | undefined };
  connectorArn: string;
  currentVersion: string;
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
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/connectors",
    input: {
      capacity: {
        autoScaling: {
          maxWorkerCount: 0,
          mcuCount: 0,
          minWorkerCount: 0,
          scaleInPolicy: { cpuUtilizationPercentage: 0 },
          scaleOutPolicy: { cpuUtilizationPercentage: 0 },
          maxAutoscalingTaskCount: 0,
        },
        provisionedCapacity: { mcuCount: 0, workerCount: 0 },
      },
      connectorConfiguration: 0,
      connectorDescription: 0,
      connectorName: 0,
      kafkaCluster: {
        apacheKafkaCluster: {
          bootstrapServers: 0,
          vpc: { securityGroups: 0, subnets: 0 },
        },
      },
      kafkaClusterClientAuthentication: { authenticationType: 0 },
      kafkaClusterEncryptionInTransit: { encryptionType: 0 },
      kafkaConnectVersion: 0,
      logDelivery: {
        workerLogDelivery: {
          cloudWatchLogs: { enabled: 0, logGroup: 0 },
          firehose: { deliveryStream: 0, enabled: 0 },
          s3: { bucket: 0, enabled: 0, prefix: 0 },
        },
      },
      networkType: 0,
      plugins: D.list({ customPlugin: { customPluginArn: 0, revision: 0 } }),
      serviceExecutionRoleArn: 0,
      workerConfiguration: { revision: 0, workerConfigurationArn: 0 },
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  CreateCustomPluginRequest,
  CreateCustomPluginResponse,
  CreateCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/custom-plugins",
    input: {
      contentType: 0,
      description: 0,
      location: { s3Location: { bucketArn: 0, fileKey: 0, objectVersion: 0 } },
      name: 0,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  CreateWorkerConfigurationRequest,
  CreateWorkerConfigurationResponse,
  CreateWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/worker-configurations",
    input: { description: 0, name: 0, propertiesFileContent: 0, tags: 0 },
    output: {
      creationTime: D.ts,
      latestRevision: o_WorkerConfigurationRevisionSummary,
    },
    body: true,
  },
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
})) as any;

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
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/connectors/{connectorArn}",
    input: {
      connectorArn: 0,
      currentVersion: D.m({ query: "currentVersion" }),
    },
  },
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
})) as any;

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
  DeleteCustomPluginRequest,
  DeleteCustomPluginResponse,
  DeleteCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/custom-plugins/{customPluginArn}",
    input: { customPluginArn: 0 },
  },
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
})) as any;

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
  DeleteWorkerConfigurationRequest,
  DeleteWorkerConfigurationResponse,
  DeleteWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/worker-configurations/{workerConfigurationArn}",
    input: { workerConfigurationArn: 0 },
  },
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
})) as any;

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
  DescribeConnectorRequest,
  DescribeConnectorResponse,
  DescribeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/connectors/{connectorArn}",
    input: { connectorArn: 0 },
    output: { creationTime: D.ts },
  },
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
})) as any;

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
  DescribeConnectorOperationRequest,
  DescribeConnectorOperationResponse,
  DescribeConnectorOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/connectorOperations/{connectorOperationArn}",
    input: { connectorOperationArn: 0 },
    output: { creationTime: D.ts, endTime: D.ts },
  },
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
})) as any;

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
  DescribeCustomPluginRequest,
  DescribeCustomPluginResponse,
  DescribeCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/custom-plugins/{customPluginArn}",
    input: { customPluginArn: 0 },
    output: {
      creationTime: D.ts,
      latestRevision: o_CustomPluginRevisionSummary,
    },
  },
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
})) as any;

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
  DescribeWorkerConfigurationRequest,
  DescribeWorkerConfigurationResponse,
  DescribeWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/worker-configurations/{workerConfigurationArn}",
    input: { workerConfigurationArn: 0 },
    output: {
      creationTime: D.ts,
      latestRevision: { creationTime: D.ts, propertiesFileContent: D.secret },
    },
  },
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
})) as any;

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
  ListConnectorOperationsRequest,
  ListConnectorOperationsResponse,
  ListConnectorOperationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/connectors/{connectorArn}/operations",
    input: {
      connectorArn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      connectorOperations: D.list({ creationTime: D.ts, endTime: D.ts }),
    },
  },
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
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/connectors",
    input: {
      connectorNamePrefix: D.m({ query: "connectorNamePrefix" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { connectors: D.list({ creationTime: D.ts }) },
  },
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
  ListCustomPluginsRequest,
  ListCustomPluginsResponse,
  ListCustomPluginsError,
  Credentials | HttpClient.HttpClient,
  CustomPluginSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/custom-plugins",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      namePrefix: D.m({ query: "namePrefix" }),
    },
    output: {
      customPlugins: D.list({
        creationTime: D.ts,
        latestRevision: o_CustomPluginRevisionSummary,
      }),
    },
  },
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
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  ListWorkerConfigurationsRequest,
  ListWorkerConfigurationsResponse,
  ListWorkerConfigurationsError,
  Credentials | HttpClient.HttpClient,
  WorkerConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/worker-configurations",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      namePrefix: D.m({ query: "namePrefix" }),
    },
    output: {
      workerConfigurations: D.list({
        creationTime: D.ts,
        latestRevision: o_WorkerConfigurationRevisionSummary,
      }),
    },
  },
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
})) as any;

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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
 * Updates the specified connector. For request body, specify only one parameter: either `capacity` or `connectorConfiguration`.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/connectors/{connectorArn}",
    input: {
      capacity: {
        autoScaling: {
          maxWorkerCount: 0,
          mcuCount: 0,
          minWorkerCount: 0,
          scaleInPolicy: { cpuUtilizationPercentage: 0 },
          scaleOutPolicy: { cpuUtilizationPercentage: 0 },
          maxAutoscalingTaskCount: 0,
        },
        provisionedCapacity: { mcuCount: 0, workerCount: 0 },
      },
      connectorConfiguration: 0,
      connectorArn: 0,
      currentVersion: D.m({ query: "currentVersion" }),
    },
    body: true,
  },
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
})) as any;

const o_CustomPluginRevisionSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
});
const o_WorkerConfigurationRevisionSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
});
