import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "GreengrassV2",
  target: "GreengrassV2",
  version: "2020-11-30",
  sigv4: "greengrass",
  protocol: restJson1Protocol,
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
                `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://greengrass.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://greengrass.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "dataplane-us-gov-east-1") {
            return e(
              "https://greengrass-ats.iot.us-gov-east-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "greengrass",
                    signingRegion: "us-gov-east-1",
                  },
                ],
              },
              {},
            );
          }
          if (Region === "dataplane-us-gov-west-1") {
            return e(
              "https://greengrass-ats.iot.us-gov-west-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "greengrass",
                    signingRegion: "us-gov-west-1",
                  },
                ],
              },
              {},
            );
          }
          return e(
            `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class RequestAlreadyInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestAlreadyInProgressException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly quotaCode: string;
    readonly serviceCode: string;
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
    readonly fields?: ValidationExceptionField[];
  }> {}
export interface AssociateServiceRoleToAccountRequest {
  roleArn: string;
}
export interface AssociateServiceRoleToAccountResponse {
  associatedAt?: string;
}
export type IoTThingName = string;
export interface AssociateClientDeviceWithCoreDeviceEntry {
  thingName: string;
}
export type AssociateClientDeviceWithCoreDeviceEntryList =
  AssociateClientDeviceWithCoreDeviceEntry[];
export interface BatchAssociateClientDeviceWithCoreDeviceRequest {
  entries?: AssociateClientDeviceWithCoreDeviceEntry[];
  coreDeviceThingName: string;
}
export type NonEmptyString = string;
export interface AssociateClientDeviceWithCoreDeviceErrorEntry {
  thingName?: string;
  code?: string;
  message?: string;
}
export type AssociateClientDeviceWithCoreDeviceErrorList =
  AssociateClientDeviceWithCoreDeviceErrorEntry[];
export interface BatchAssociateClientDeviceWithCoreDeviceResponse {
  errorEntries?: AssociateClientDeviceWithCoreDeviceErrorEntry[];
}
export interface DisassociateClientDeviceFromCoreDeviceEntry {
  thingName: string;
}
export type DisassociateClientDeviceFromCoreDeviceEntryList =
  DisassociateClientDeviceFromCoreDeviceEntry[];
export interface BatchDisassociateClientDeviceFromCoreDeviceRequest {
  entries?: DisassociateClientDeviceFromCoreDeviceEntry[];
  coreDeviceThingName: string;
}
export interface DisassociateClientDeviceFromCoreDeviceErrorEntry {
  thingName?: string;
  code?: string;
  message?: string;
}
export type DisassociateClientDeviceFromCoreDeviceErrorList =
  DisassociateClientDeviceFromCoreDeviceErrorEntry[];
export interface BatchDisassociateClientDeviceFromCoreDeviceResponse {
  errorEntries?: DisassociateClientDeviceFromCoreDeviceErrorEntry[];
}
export interface CancelDeploymentRequest {
  deploymentId: string;
}
export interface CancelDeploymentResponse {
  message?: string;
}
export type RecipeBlob = Uint8Array;
export type ComponentNameString = string;
export type ComponentVersionString = string;
export type PlatformAttributesMap = { [key: string]: string | undefined };
export interface ComponentPlatform {
  name?: string;
  attributes?: { [key: string]: string | undefined };
}
export type ComponentPlatformList = ComponentPlatform[];
export type ComponentDependencyType = "HARD" | "SOFT" | (string & {});
export interface ComponentDependencyRequirement {
  versionRequirement?: string;
  dependencyType?: ComponentDependencyType;
}
export type ComponentDependencyMap = {
  [key: string]: ComponentDependencyRequirement | undefined;
};
export type TopicString = string;
export type LambdaEventSourceType = "PUB_SUB" | "IOT_CORE" | (string & {});
export interface LambdaEventSource {
  topic: string;
  type: LambdaEventSourceType;
}
export type LambdaEventSourceList = LambdaEventSource[];
export type OptionalInteger = number;
export type OptionalBoolean = boolean;
export type LambdaInputPayloadEncodingType = "json" | "binary" | (string & {});
export type LambdaExecArg = string;
export type LambdaExecArgsList = string[];
export type LambdaEnvironmentVariables = { [key: string]: string | undefined };
export type LambdaIsolationMode =
  | "GreengrassContainer"
  | "NoContainer"
  | (string & {});
export type FileSystemPath = string;
export type LambdaFilesystemPermission = "ro" | "rw" | (string & {});
export interface LambdaVolumeMount {
  sourcePath: string;
  destinationPath: string;
  permission?: LambdaFilesystemPermission;
  addGroupOwner?: boolean;
}
export type LambdaVolumeList = LambdaVolumeMount[];
export interface LambdaDeviceMount {
  path: string;
  permission?: LambdaFilesystemPermission;
  addGroupOwner?: boolean;
}
export type LambdaDeviceList = LambdaDeviceMount[];
export interface LambdaContainerParams {
  memorySizeInKB?: number;
  mountROSysfs?: boolean;
  volumes?: LambdaVolumeMount[];
  devices?: LambdaDeviceMount[];
}
export interface LambdaLinuxProcessParams {
  isolationMode?: LambdaIsolationMode;
  containerParams?: LambdaContainerParams;
}
export interface LambdaExecutionParameters {
  eventSources?: LambdaEventSource[];
  maxQueueSize?: number;
  maxInstancesCount?: number;
  maxIdleTimeInSeconds?: number;
  timeoutInSeconds?: number;
  statusTimeoutInSeconds?: number;
  pinned?: boolean;
  inputPayloadEncodingType?: LambdaInputPayloadEncodingType;
  execArgs?: string[];
  environmentVariables?: { [key: string]: string | undefined };
  linuxProcessParams?: LambdaLinuxProcessParams;
}
export interface LambdaFunctionRecipeSource {
  lambdaArn: string;
  componentName?: string;
  componentVersion?: string;
  componentPlatforms?: ComponentPlatform[];
  componentDependencies?: {
    [key: string]: ComponentDependencyRequirement | undefined;
  };
  componentLambdaParameters?: LambdaExecutionParameters;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientTokenString = string;
export interface CreateComponentVersionRequest {
  inlineRecipe?: Uint8Array;
  lambdaFunction?: LambdaFunctionRecipeSource;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type ComponentVersionARN = string;
export type CloudComponentState =
  | "REQUESTED"
  | "INITIATED"
  | "DEPLOYABLE"
  | "FAILED"
  | "DEPRECATED"
  | (string & {});
export type StringMap = { [key: string]: string | undefined };
export type VendorGuidance =
  | "ACTIVE"
  | "DISCONTINUED"
  | "DELETED"
  | (string & {});
export interface CloudComponentStatus {
  componentState?: CloudComponentState;
  message?: string;
  errors?: { [key: string]: string | undefined };
  vendorGuidance?: VendorGuidance;
  vendorGuidanceMessage?: string;
}
export interface CreateComponentVersionResponse {
  arn?: string;
  componentName: string;
  componentVersion: string;
  creationTimestamp: Date;
  status: CloudComponentStatus;
}
export type TargetARN = string;
export type DeploymentNameString = string;
export type ComponentConfigurationString = string;
export type ComponentConfigurationPath = string;
export type ComponentConfigurationPathList = string[];
export interface ComponentConfigurationUpdate {
  merge?: string;
  reset?: string[];
}
export type Memory = number;
export type CPU = number;
export interface SystemResourceLimits {
  memory?: number;
  cpus?: number;
}
export interface ComponentRunWith {
  posixUser?: string;
  systemResourceLimits?: SystemResourceLimits;
  windowsUser?: string;
}
export interface ComponentDeploymentSpecification {
  componentVersion: string;
  configurationUpdate?: ComponentConfigurationUpdate;
  runWith?: ComponentRunWith;
}
export type ComponentDeploymentSpecifications = {
  [key: string]: ComponentDeploymentSpecification | undefined;
};
export type IoTJobRolloutBaseRatePerMinute = number;
export type IoTJobRolloutIncrementFactor = number;
export type IoTJobNumberOfThings = number;
export interface IoTJobRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export interface IoTJobExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: IoTJobRateIncreaseCriteria;
}
export type IoTJobMaxExecutionsPerMin = number;
export interface IoTJobExecutionsRolloutConfig {
  exponentialRate?: IoTJobExponentialRolloutRate;
  maximumPerMinute?: number;
}
export type IoTJobExecutionFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export type IoTJobAbortAction = "CANCEL" | (string & {});
export type IoTJobAbortThresholdPercentage = number;
export type IoTJobMinimumNumberOfExecutedThings = number;
export interface IoTJobAbortCriteria {
  failureType: IoTJobExecutionFailureType;
  action: IoTJobAbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export type IoTJobAbortCriteriaList = IoTJobAbortCriteria[];
export interface IoTJobAbortConfig {
  criteriaList: IoTJobAbortCriteria[];
}
export type IoTJobInProgressTimeoutInMinutes = number;
export interface IoTJobTimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export interface DeploymentIoTJobConfiguration {
  jobExecutionsRolloutConfig?: IoTJobExecutionsRolloutConfig;
  abortConfig?: IoTJobAbortConfig;
  timeoutConfig?: IoTJobTimeoutConfig;
}
export type DeploymentFailureHandlingPolicy =
  | "ROLLBACK"
  | "DO_NOTHING"
  | (string & {});
export type DeploymentComponentUpdatePolicyAction =
  | "NOTIFY_COMPONENTS"
  | "SKIP_NOTIFY_COMPONENTS"
  | (string & {});
export interface DeploymentComponentUpdatePolicy {
  timeoutInSeconds?: number;
  action?: DeploymentComponentUpdatePolicyAction;
}
export interface DeploymentConfigurationValidationPolicy {
  timeoutInSeconds?: number;
}
export interface DeploymentPolicies {
  failureHandlingPolicy?: DeploymentFailureHandlingPolicy;
  componentUpdatePolicy?: DeploymentComponentUpdatePolicy;
  configurationValidationPolicy?: DeploymentConfigurationValidationPolicy;
}
export type ThingGroupARN = string;
export interface CreateDeploymentRequest {
  targetArn: string;
  deploymentName?: string;
  components?: { [key: string]: ComponentDeploymentSpecification | undefined };
  iotJobConfiguration?: DeploymentIoTJobConfiguration;
  deploymentPolicies?: DeploymentPolicies;
  parentTargetArn?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type IoTJobARN = string;
export interface CreateDeploymentResponse {
  deploymentId?: string;
  iotJobId?: string;
  iotJobArn?: string;
}
export interface DeleteComponentRequest {
  arn: string;
}
export interface DeleteComponentResponse {}
export type CoreDeviceThingName = string;
export interface DeleteCoreDeviceRequest {
  coreDeviceThingName: string;
}
export interface DeleteCoreDeviceResponse {}
export interface DeleteDeploymentRequest {
  deploymentId: string;
}
export interface DeleteDeploymentResponse {}
export interface DescribeComponentRequest {
  arn: string;
}
export type PublisherString = string;
export type DescriptionString = string;
export interface DescribeComponentResponse {
  arn?: string;
  componentName?: string;
  componentVersion?: string;
  creationTimestamp?: Date;
  publisher?: string;
  description?: string;
  status?: CloudComponentStatus;
  platforms?: ComponentPlatform[];
  tags?: { [key: string]: string | undefined };
}
export interface DisassociateServiceRoleFromAccountRequest {}
export interface DisassociateServiceRoleFromAccountResponse {
  disassociatedAt?: string;
}
export type RecipeOutputFormat = "JSON" | "YAML" | (string & {});
export interface GetComponentRequest {
  recipeOutputFormat?: RecipeOutputFormat;
  arn: string;
}
export interface GetComponentResponse {
  recipeOutputFormat: RecipeOutputFormat;
  recipe: Uint8Array;
  tags?: { [key: string]: string | undefined };
}
export type S3EndpointType = "REGIONAL" | "GLOBAL" | (string & {});
export type IotEndpointType = "fips" | "standard" | (string & {});
export interface GetComponentVersionArtifactRequest {
  arn: string;
  artifactName: string;
  s3EndpointType?: S3EndpointType;
  iotEndpointType?: IotEndpointType;
}
export interface GetComponentVersionArtifactResponse {
  preSignedUrl: string;
}
export interface GetConnectivityInfoRequest {
  thingName: string;
}
export type PortNumberInt = number;
export interface ConnectivityInfo {
  id?: string;
  hostAddress?: string;
  portNumber?: number;
  metadata?: string;
}
export type ConnectivityInfoList = ConnectivityInfo[];
export interface GetConnectivityInfoResponse {
  connectivityInfo?: ConnectivityInfo[];
  message?: string;
}
export interface GetCoreDeviceRequest {
  coreDeviceThingName: string;
}
export type GGCVersion = string;
export type CoreDevicePlatformString = string;
export type CoreDeviceArchitectureString = string;
export type CoreDeviceRuntimeString = string;
export type CoreDeviceStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export interface GetCoreDeviceResponse {
  coreDeviceThingName?: string;
  coreVersion?: string;
  platform?: string;
  architecture?: string;
  runtime?: string;
  status?: CoreDeviceStatus;
  lastStatusUpdateTimestamp?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetDeploymentRequest {
  deploymentId: string;
}
export type NullableString = string;
export type DeploymentStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELED"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export type IsLatestForTarget = boolean;
export interface GetDeploymentResponse {
  targetArn?: string;
  revisionId?: string;
  deploymentId?: string;
  deploymentName?: string;
  deploymentStatus?: DeploymentStatus;
  iotJobId?: string;
  iotJobArn?: string;
  components?: { [key: string]: ComponentDeploymentSpecification | undefined };
  deploymentPolicies?: DeploymentPolicies;
  iotJobConfiguration?: DeploymentIoTJobConfiguration;
  creationTimestamp?: Date;
  isLatestForTarget?: boolean;
  parentTargetArn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetServiceRoleForAccountRequest {}
export interface GetServiceRoleForAccountResponse {
  associatedAt?: string;
  roleArn?: string;
}
export type DefaultMaxResults = number;
export type NextTokenString = string;
export interface ListClientDevicesAssociatedWithCoreDeviceRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AssociatedClientDevice {
  thingName?: string;
  associationTimestamp?: Date;
}
export type AssociatedClientDeviceList = AssociatedClientDevice[];
export interface ListClientDevicesAssociatedWithCoreDeviceResponse {
  associatedClientDevices?: AssociatedClientDevice[];
  nextToken?: string;
}
export type ComponentVisibilityScope = "PRIVATE" | "PUBLIC" | (string & {});
export interface ListComponentsRequest {
  scope?: ComponentVisibilityScope;
  maxResults?: number;
  nextToken?: string;
}
export type ComponentARN = string;
export interface ComponentLatestVersion {
  arn?: string;
  componentVersion?: string;
  creationTimestamp?: Date;
  description?: string;
  publisher?: string;
  platforms?: ComponentPlatform[];
}
export interface Component {
  arn?: string;
  componentName?: string;
  latestVersion?: ComponentLatestVersion;
}
export type ComponentList = Component[];
export interface ListComponentsResponse {
  components?: Component[];
  nextToken?: string;
}
export interface ListComponentVersionsRequest {
  arn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ComponentVersionListItem {
  componentName?: string;
  componentVersion?: string;
  arn?: string;
}
export type ComponentVersionList = ComponentVersionListItem[];
export interface ListComponentVersionsResponse {
  componentVersions?: ComponentVersionListItem[];
  nextToken?: string;
}
export interface ListCoreDevicesRequest {
  thingGroupArn?: string;
  status?: CoreDeviceStatus;
  maxResults?: number;
  nextToken?: string;
  runtime?: string;
}
export interface CoreDevice {
  coreDeviceThingName?: string;
  status?: CoreDeviceStatus;
  lastStatusUpdateTimestamp?: Date;
  platform?: string;
  architecture?: string;
  runtime?: string;
}
export type CoreDevicesList = CoreDevice[];
export interface ListCoreDevicesResponse {
  coreDevices?: CoreDevice[];
  nextToken?: string;
}
export type DeploymentHistoryFilter = "ALL" | "LATEST_ONLY" | (string & {});
export interface ListDeploymentsRequest {
  targetArn?: string;
  historyFilter?: DeploymentHistoryFilter;
  parentTargetArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface Deployment {
  targetArn?: string;
  revisionId?: string;
  deploymentId?: string;
  deploymentName?: string;
  creationTimestamp?: Date;
  deploymentStatus?: DeploymentStatus;
  isLatestForTarget?: boolean;
  parentTargetArn?: string;
}
export type DeploymentList = Deployment[];
export interface ListDeploymentsResponse {
  deployments?: Deployment[];
  nextToken?: string;
}
export interface ListEffectiveDeploymentsRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
}
export type DeploymentID = string;
export type DeploymentName = string;
export type IoTJobId = string;
export type Description = string;
export type EffectiveDeploymentExecutionStatus =
  | "IN_PROGRESS"
  | "QUEUED"
  | "FAILED"
  | "COMPLETED"
  | "TIMED_OUT"
  | "CANCELED"
  | "REJECTED"
  | "SUCCEEDED"
  | (string & {});
export type Reason = string;
export type EffectiveDeploymentErrorCode = string;
export type EffectiveDeploymentErrorStack = string[];
export type EffectiveDeploymentErrorType = string;
export type EffectiveDeploymentErrorTypeList = string[];
export interface EffectiveDeploymentStatusDetails {
  errorStack?: string[];
  errorTypes?: string[];
}
export interface EffectiveDeployment {
  deploymentId: string;
  deploymentName: string;
  iotJobId?: string;
  iotJobArn?: string;
  description?: string;
  targetArn: string;
  coreDeviceExecutionStatus: EffectiveDeploymentExecutionStatus;
  reason?: string;
  creationTimestamp: Date;
  modifiedTimestamp: Date;
  statusDetails?: EffectiveDeploymentStatusDetails;
}
export type EffectiveDeploymentsList = EffectiveDeployment[];
export interface ListEffectiveDeploymentsResponse {
  effectiveDeployments?: EffectiveDeployment[];
  nextToken?: string;
}
export type InstalledComponentTopologyFilter = "ALL" | "ROOT" | (string & {});
export interface ListInstalledComponentsRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
  topologyFilter?: InstalledComponentTopologyFilter;
}
export type InstalledComponentLifecycleState =
  | "NEW"
  | "INSTALLED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "ERRORED"
  | "BROKEN"
  | "FINISHED"
  | (string & {});
export type LifecycleStateDetails = string;
export type IsRoot = boolean;
export type InstalledComponentLifecycleStatusCode = string;
export type InstalledComponentLifecycleStatusCodeList = string[];
export interface InstalledComponent {
  componentName?: string;
  componentVersion?: string;
  lifecycleState?: InstalledComponentLifecycleState;
  lifecycleStateDetails?: string;
  isRoot?: boolean;
  lastStatusChangeTimestamp?: Date;
  lastReportedTimestamp?: Date;
  lastInstallationSource?: string;
  lifecycleStatusCodes?: string[];
}
export type InstalledComponentList = InstalledComponent[];
export interface ListInstalledComponentsResponse {
  installedComponents?: InstalledComponent[];
  nextToken?: string;
}
export type GenericV2ARN = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ComponentVersionRequirementMap = {
  [key: string]: string | undefined;
};
export interface ComponentCandidate {
  componentName?: string;
  componentVersion?: string;
  versionRequirements?: { [key: string]: string | undefined };
}
export type ComponentCandidateList = ComponentCandidate[];
export interface ResolveComponentCandidatesRequest {
  platform?: ComponentPlatform;
  componentCandidates?: ComponentCandidate[];
}
export interface ResolvedComponentVersion {
  arn?: string;
  componentName?: string;
  componentVersion?: string;
  recipe?: Uint8Array;
  vendorGuidance?: VendorGuidance;
  message?: string;
}
export type ResolvedComponentVersionsList = ResolvedComponentVersion[];
export interface ResolveComponentCandidatesResponse {
  resolvedComponentVersions?: ResolvedComponentVersion[];
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
export interface UpdateConnectivityInfoRequest {
  thingName: string;
  connectivityInfo: ConnectivityInfo[];
}
export interface UpdateConnectivityInfoResponse {
  version?: string;
  message?: string;
}
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateServiceRoleToAccountError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Greengrass service role with IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region. IoT Greengrass
 * uses this role to verify the identity of client devices and manage core device connectivity
 * information. The role must include the AWSGreengrassResourceAccessRolePolicy managed policy or a custom policy that
 * defines equivalent permissions for the IoT Greengrass features that you use. For more information, see
 * Greengrass service role in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const associateServiceRoleToAccount: API.OperationMethod<
  AssociateServiceRoleToAccountRequest,
  AssociateServiceRoleToAccountResponse,
  AssociateServiceRoleToAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /greengrass/servicerole",
    input: { roleArn: D.m({ wire: "RoleArn" }) },
    output: { associatedAt: D.m({ wire: "AssociatedAt" }) },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
})) as any;

export type BatchAssociateClientDeviceWithCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a list of client devices with a core device. Use this API operation to specify
 * which client devices can discover a core device through cloud discovery. With cloud discovery,
 * client devices connect to IoT Greengrass to retrieve associated core devices' connectivity information
 * and certificates. For more information, see Configure cloud
 * discovery in the *IoT Greengrass V2 Developer Guide*.
 *
 * Client devices are local IoT devices that connect to and communicate with an IoT Greengrass core
 * device over MQTT. You can connect client devices to a core device to sync MQTT messages and
 * data to Amazon Web Services IoT Core and interact with client devices in Greengrass components. For more information,
 * see Interact with
 * local IoT devices in the *IoT Greengrass V2 Developer Guide*.
 */
export const batchAssociateClientDeviceWithCoreDevice: API.OperationMethod<
  BatchAssociateClientDeviceWithCoreDeviceRequest,
  BatchAssociateClientDeviceWithCoreDeviceResponse,
  BatchAssociateClientDeviceWithCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/coreDevices/{coreDeviceThingName}/associateClientDevices",
    input: { entries: D.list({ thingName: 0 }), coreDeviceThingName: 0 },
    body: true,
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
  operationName: "BatchAssociateClientDeviceWithCoreDevice",
})) as any;

export type BatchDisassociateClientDeviceFromCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of client devices from a core device. After you disassociate a client
 * device from a core device, the client device won't be able to use cloud discovery to retrieve
 * the core device's connectivity information and certificates.
 */
export const batchDisassociateClientDeviceFromCoreDevice: API.OperationMethod<
  BatchDisassociateClientDeviceFromCoreDeviceRequest,
  BatchDisassociateClientDeviceFromCoreDeviceResponse,
  BatchDisassociateClientDeviceFromCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/coreDevices/{coreDeviceThingName}/disassociateClientDevices",
    input: { entries: D.list({ thingName: 0 }), coreDeviceThingName: 0 },
    body: true,
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
  operationName: "BatchDisassociateClientDeviceFromCoreDevice",
})) as any;

export type CancelDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a deployment. This operation cancels the deployment for devices that haven't yet
 * received it. If a device already received the deployment, this operation doesn't change
 * anything for that device.
 */
export const cancelDeployment: API.OperationMethod<
  CancelDeploymentRequest,
  CancelDeploymentResponse,
  CancelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/deployments/{deploymentId}/cancel",
    input: { deploymentId: 0 },
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
  operationName: "CancelDeployment",
})) as any;

export type CreateComponentVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestAlreadyInProgressException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a component. Components are software that run on Greengrass core devices. After you
 * develop and test a component on your core device, you can use this operation to upload your
 * component to IoT Greengrass. Then, you can deploy the component to other core devices.
 *
 * You can use this operation to do the following:
 *
 * - **Create components from recipes**
 *
 * Create a component from a recipe, which is a file that defines the component's
 * metadata, parameters, dependencies, lifecycle, artifacts, and platform capability. For
 * more information, see IoT Greengrass component recipe
 * reference in the *IoT Greengrass V2 Developer Guide*.
 *
 * To create a component from a recipe, specify `inlineRecipe` when you call
 * this operation.
 *
 * - **Create components from Lambda functions**
 *
 * Create a component from an Lambda function that runs on IoT Greengrass. This creates a recipe
 * and artifacts from the Lambda function's deployment package. You can use this operation to
 * migrate Lambda functions from IoT Greengrass V1 to IoT Greengrass V2.
 *
 * This function accepts Lambda functions in all supported versions of Python, Node.js,
 * and Java runtimes. IoT Greengrass doesn't apply any additional restrictions on deprecated Lambda
 * runtime versions.
 *
 * To create a component from a Lambda function, specify `lambdaFunction` when
 * you call this operation.
 *
 * IoT Greengrass currently supports Lambda functions on only Linux core devices.
 */
export const createComponentVersion: API.OperationMethod<
  CreateComponentVersionRequest,
  CreateComponentVersionResponse,
  CreateComponentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/createComponentVersion",
    input: {
      inlineRecipe: 0,
      lambdaFunction: {
        lambdaArn: 0,
        componentName: 0,
        componentVersion: 0,
        componentPlatforms: D.list(i_ComponentPlatform),
        componentDependencies: D.map({
          versionRequirement: 0,
          dependencyType: 0,
        }),
        componentLambdaParameters: {
          eventSources: D.list({ topic: 0, type: 0 }),
          maxQueueSize: 0,
          maxInstancesCount: 0,
          maxIdleTimeInSeconds: 0,
          timeoutInSeconds: 0,
          statusTimeoutInSeconds: 0,
          pinned: 0,
          inputPayloadEncodingType: 0,
          execArgs: 0,
          environmentVariables: 0,
          linuxProcessParams: {
            isolationMode: 0,
            containerParams: {
              memorySizeInKB: 0,
              mountROSysfs: 0,
              volumes: D.list({
                sourcePath: 0,
                destinationPath: 0,
                permission: 0,
                addGroupOwner: 0,
              }),
              devices: D.list({ path: 0, permission: 0, addGroupOwner: 0 }),
            },
          },
        },
      },
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestAlreadyInProgressException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponentVersion",
})) as any;

export type CreateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestAlreadyInProgressException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a continuous deployment for a target, which is a Greengrass core device or group of core
 * devices. When you add a new core device to a group of core devices that has a deployment, IoT Greengrass
 * deploys that group's deployment to the new device.
 *
 * You can define one deployment for each target. When you create a new deployment for a
 * target that has an existing deployment, you replace the previous deployment. IoT Greengrass applies the
 * new deployment to the target devices.
 *
 * Every deployment has a revision number that indicates how many deployment revisions you
 * define for a target. Use this operation to create a new revision of an existing
 * deployment.
 *
 * For more information, see the Create deployments in the
 * *IoT Greengrass V2 Developer Guide*.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/deployments",
    input: {
      targetArn: 0,
      deploymentName: 0,
      components: D.map({
        componentVersion: 0,
        configurationUpdate: { merge: 0, reset: 0 },
        runWith: {
          posixUser: 0,
          systemResourceLimits: { memory: 0, cpus: 0 },
          windowsUser: 0,
        },
      }),
      iotJobConfiguration: {
        jobExecutionsRolloutConfig: {
          exponentialRate: {
            baseRatePerMinute: 0,
            incrementFactor: 0,
            rateIncreaseCriteria: {
              numberOfNotifiedThings: 0,
              numberOfSucceededThings: 0,
            },
          },
          maximumPerMinute: 0,
        },
        abortConfig: {
          criteriaList: D.list({
            failureType: 0,
            action: 0,
            thresholdPercentage: 0,
            minNumberOfExecutedThings: 0,
          }),
        },
        timeoutConfig: { inProgressTimeoutInMinutes: 0 },
      },
      deploymentPolicies: {
        failureHandlingPolicy: 0,
        componentUpdatePolicy: { timeoutInSeconds: 0, action: 0 },
        configurationValidationPolicy: { timeoutInSeconds: 0 },
      },
      parentTargetArn: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestAlreadyInProgressException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
})) as any;

export type DeleteComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a version of a component from IoT Greengrass.
 *
 * This operation deletes the component's recipe and artifacts. As a result, deployments
 * that refer to this component version will fail. If you have deployments that use this
 * component version, you can remove the component from the deployment or update the deployment
 * to use a valid version.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/v2/components/{arn}",
    input: { arn: 0 },
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
  operationName: "DeleteComponent",
})) as any;

export type DeleteCoreDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Greengrass core device, which is an IoT thing. This operation removes the core
 * device from the list of core devices. This operation doesn't delete the IoT thing. For more
 * information about how to delete the IoT thing, see DeleteThing in the
 * *IoT API Reference*.
 */
export const deleteCoreDevice: API.OperationMethod<
  DeleteCoreDeviceRequest,
  DeleteCoreDeviceResponse,
  DeleteCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/v2/coreDevices/{coreDeviceThingName}",
    input: { coreDeviceThingName: 0 },
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
  operationName: "DeleteCoreDevice",
})) as any;

export type DeleteDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a deployment. To delete an active deployment, you must first cancel it. For more
 * information, see CancelDeployment.
 *
 * Deleting a deployment doesn't affect core devices that run that deployment, because core
 * devices store the deployment's configuration on the device. Additionally, core devices can
 * roll back to a previous deployment that has been deleted.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/v2/deployments/{deploymentId}",
    input: { deploymentId: 0 },
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
  operationName: "DeleteDeployment",
})) as any;

export type DescribeComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a version of a component.
 */
export const describeComponent: API.OperationMethod<
  DescribeComponentRequest,
  DescribeComponentResponse,
  DescribeComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/components/{arn}/metadata",
    input: { arn: 0 },
    output: { creationTimestamp: D.ts },
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
  operationName: "DescribeComponent",
})) as any;

export type DisassociateServiceRoleFromAccountError =
  | InternalServerException
  | CommonErrors;
/**
 * Disassociates the Greengrass service role from IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region.
 * Without a service role, IoT Greengrass can't verify the identity of client devices or manage core device
 * connectivity information. For more information, see Greengrass service role in
 * the *IoT Greengrass Version 2 Developer Guide*.
 */
export const disassociateServiceRoleFromAccount: API.OperationMethod<
  DisassociateServiceRoleFromAccountRequest,
  DisassociateServiceRoleFromAccountResponse,
  DisassociateServiceRoleFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/servicerole",
    input: {},
    output: { disassociatedAt: D.m({ wire: "DisassociatedAt" }) },
  },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
})) as any;

export type GetComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the recipe for a version of a component.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/components/{arn}",
    input: { recipeOutputFormat: D.m({ query: "recipeOutputFormat" }), arn: 0 },
    output: { recipe: D.blob },
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
  operationName: "GetComponent",
})) as any;

export type GetComponentVersionArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the pre-signed URL to download a public or a Lambda component artifact. Core devices
 * call this operation to identify the URL that they can use to download an artifact to
 * install.
 */
export const getComponentVersionArtifact: API.OperationMethod<
  GetComponentVersionArtifactRequest,
  GetComponentVersionArtifactResponse,
  GetComponentVersionArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/components/{arn}/artifacts/{artifactName+}",
    input: {
      arn: 0,
      artifactName: 0,
      s3EndpointType: D.m({ query: "s3EndpointType" }),
      iotEndpointType: D.m({ header: "x-amz-iot-endpoint-type" }),
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
  operationName: "GetComponentVersionArtifact",
})) as any;

export type GetConnectivityInfoError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves connectivity information for a Greengrass core device.
 *
 * Connectivity information includes endpoints and ports where client devices
 * can connect to an MQTT broker on the core device. When a client device
 * calls the IoT Greengrass discovery API,
 * IoT Greengrass returns connectivity information for all of the core devices where the client device can
 * connect. For more information, see Connect client devices to
 * core devices in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const getConnectivityInfo: API.OperationMethod<
  GetConnectivityInfoRequest,
  GetConnectivityInfoResponse,
  GetConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/things/{thingName}/connectivityInfo",
    input: { thingName: 0 },
    output: {
      connectivityInfo: D.m({
        wire: "ConnectivityInfo",
        shape: D.list({
          id: D.m({ wire: "Id" }),
          hostAddress: D.m({ wire: "HostAddress" }),
          portNumber: D.m({ wire: "PortNumber" }),
          metadata: D.m({ wire: "Metadata" }),
        }),
      }),
      message: D.m({ wire: "Message" }),
    },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
})) as any;

export type GetCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a Greengrass core device.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - When the status of any component on the core device becomes
 * `BROKEN`
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const getCoreDevice: API.OperationMethod<
  GetCoreDeviceRequest,
  GetCoreDeviceResponse,
  GetCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/coreDevices/{coreDeviceThingName}",
    input: { coreDeviceThingName: 0 },
    output: { lastStatusUpdateTimestamp: D.ts },
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
  operationName: "GetCoreDevice",
})) as any;

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a deployment. Deployments define the components that run on Greengrass core devices.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/deployments/{deploymentId}",
    input: { deploymentId: 0 },
    output: { creationTimestamp: D.ts },
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
  operationName: "GetDeployment",
})) as any;

export type GetServiceRoleForAccountError =
  | InternalServerException
  | CommonErrors;
/**
 * Gets the service role associated with IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region.
 * IoT Greengrass uses this role to verify the identity of client devices and manage core device
 * connectivity information. For more information, see Greengrass service role in
 * the *IoT Greengrass Version 2 Developer Guide*.
 */
export const getServiceRoleForAccount: API.OperationMethod<
  GetServiceRoleForAccountRequest,
  GetServiceRoleForAccountResponse,
  GetServiceRoleForAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/servicerole",
    input: {},
    output: {
      associatedAt: D.m({ wire: "AssociatedAt" }),
      roleArn: D.m({ wire: "RoleArn" }),
    },
  },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
})) as any;

export type ListClientDevicesAssociatedWithCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of client devices that are associated with a core
 * device.
 */
export const listClientDevicesAssociatedWithCoreDevice: API.PaginatedOperationMethod<
  ListClientDevicesAssociatedWithCoreDeviceRequest,
  ListClientDevicesAssociatedWithCoreDeviceResponse,
  ListClientDevicesAssociatedWithCoreDeviceError,
  Credentials | HttpClient.HttpClient,
  AssociatedClientDevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/coreDevices/{coreDeviceThingName}/associatedClientDevices",
    input: {
      coreDeviceThingName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { associatedClientDevices: D.list({ associationTimestamp: D.ts }) },
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
  operationName: "ListClientDevicesAssociatedWithCoreDevice",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedClientDevices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of component summaries. This list includes components that you
 * have permission to view.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  Component
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/components",
    input: {
      scope: D.m({ query: "scope" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      components: D.list({ latestVersion: { creationTimestamp: D.ts } }),
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
  operationName: "ListComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "components",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of all versions for a component. Greater versions are listed
 * first.
 */
export const listComponentVersions: API.PaginatedOperationMethod<
  ListComponentVersionsRequest,
  ListComponentVersionsResponse,
  ListComponentVersionsError,
  Credentials | HttpClient.HttpClient,
  ComponentVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/components/{arn}/versions",
    input: {
      arn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListComponentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCoreDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of Greengrass core devices.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - For Greengrass nucleus 2.12.2 and earlier, the core device sends status updates when the
 * status of any component on the core device becomes `ERRORED` or
 * `BROKEN`.
 *
 * - For Greengrass nucleus 2.12.3 and later, the core device sends status updates when the
 * status of any component on the core device becomes `ERRORED`,
 * `BROKEN`, `RUNNING`, or `FINISHED`.
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const listCoreDevices: API.PaginatedOperationMethod<
  ListCoreDevicesRequest,
  ListCoreDevicesResponse,
  ListCoreDevicesError,
  Credentials | HttpClient.HttpClient,
  CoreDevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/coreDevices",
    input: {
      thingGroupArn: D.m({ query: "thingGroupArn" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      runtime: D.m({ query: "runtime" }),
    },
    output: { coreDevices: D.list({ lastStatusUpdateTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "coreDevices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of deployments.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  Deployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/deployments",
    input: {
      targetArn: D.m({ query: "targetArn" }),
      historyFilter: D.m({ query: "historyFilter" }),
      parentTargetArn: D.m({ query: "parentTargetArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { deployments: D.list({ creationTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEffectiveDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of deployment jobs that IoT Greengrass sends to Greengrass core devices.
 */
export const listEffectiveDeployments: API.PaginatedOperationMethod<
  ListEffectiveDeploymentsRequest,
  ListEffectiveDeploymentsResponse,
  ListEffectiveDeploymentsError,
  Credentials | HttpClient.HttpClient,
  EffectiveDeployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/coreDevices/{coreDeviceThingName}/effectiveDeployments",
    input: {
      coreDeviceThingName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      effectiveDeployments: D.list({
        creationTimestamp: D.ts,
        modifiedTimestamp: D.ts,
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
  operationName: "ListEffectiveDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "effectiveDeployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInstalledComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the components that a Greengrass core device runs. By default,
 * this list doesn't include components that are deployed as dependencies of other components. To
 * include dependencies in the response, set the `topologyFilter` parameter to
 * `ALL`.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - When the status of any component on the core device becomes
 * `BROKEN`
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const listInstalledComponents: API.PaginatedOperationMethod<
  ListInstalledComponentsRequest,
  ListInstalledComponentsResponse,
  ListInstalledComponentsError,
  Credentials | HttpClient.HttpClient,
  InstalledComponent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/v2/coreDevices/{coreDeviceThingName}/installedComponents",
    input: {
      coreDeviceThingName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      topologyFilter: D.m({ query: "topologyFilter" }),
    },
    output: {
      installedComponents: D.list({
        lastStatusChangeTimestamp: D.ts,
        lastReportedTimestamp: D.ts,
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
  operationName: "ListInstalledComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "installedComponents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of tags for an IoT Greengrass resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ResolveComponentCandidatesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of components that meet the component, version, and platform requirements
 * of a deployment. Greengrass core devices call this operation when they receive a deployment to
 * identify the components to install.
 *
 * This operation identifies components that meet all dependency requirements for a
 * deployment. If the requirements conflict, then this operation returns an error and the
 * deployment fails. For example, this occurs if component `A` requires version
 * `>2.0.0` and component `B` requires version `<2.0.0`
 * of a component dependency.
 *
 * When you specify the component candidates to resolve, IoT Greengrass compares each component's
 * digest from the core device with the component's digest in the Amazon Web Services Cloud. If the digests
 * don't match, then IoT Greengrass specifies to use the version from the Amazon Web Services Cloud.
 *
 * To use this operation, you must use the data plane API endpoint and authenticate with an
 * IoT device certificate. For more information, see IoT Greengrass endpoints and quotas.
 */
export const resolveComponentCandidates: API.OperationMethod<
  ResolveComponentCandidatesRequest,
  ResolveComponentCandidatesResponse,
  ResolveComponentCandidatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/v2/resolveComponentCandidates",
    input: {
      platform: i_ComponentPlatform,
      componentCandidates: D.list({
        componentName: 0,
        componentVersion: 0,
        versionRequirements: 0,
      }),
    },
    output: { resolvedComponentVersions: D.list({ recipe: D.blob }) },
    body: true,
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
  operationName: "ResolveComponentCandidates",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an IoT Greengrass resource. If a tag already exists for the resource, this operation
 * updates the tag's value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from an IoT Greengrass resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConnectivityInfoError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates connectivity information for a Greengrass core device.
 *
 * Connectivity information includes endpoints and ports where client devices
 * can connect to an MQTT broker on the core device. When a client device
 * calls the IoT Greengrass discovery API,
 * IoT Greengrass returns connectivity information for all of the core devices where the client device can
 * connect. For more information, see Connect client devices to
 * core devices in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const updateConnectivityInfo: API.OperationMethod<
  UpdateConnectivityInfoRequest,
  UpdateConnectivityInfoResponse,
  UpdateConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /greengrass/things/{thingName}/connectivityInfo",
    input: {
      thingName: 0,
      connectivityInfo: D.m({
        wire: "ConnectivityInfo",
        shape: D.list({
          id: D.m({ wire: "Id" }),
          hostAddress: D.m({ wire: "HostAddress" }),
          portNumber: D.m({ wire: "PortNumber" }),
          metadata: D.m({ wire: "Metadata" }),
        }),
      }),
    },
    output: {
      version: D.m({ wire: "Version" }),
      message: D.m({ wire: "Message" }),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
})) as any;

const i_ComponentPlatform: D.LazyStruct = () => ({ name: 0, attributes: 0 });
