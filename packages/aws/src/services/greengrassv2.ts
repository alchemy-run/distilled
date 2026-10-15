import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "GreengrassV2",
  serviceShapeName: "GreengrassV2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "greengrass" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-30");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if (Region === "dataplane-us-gov-east-1") {
          return e(
            "https://greengrass-ats.iot.us-gov-east-1.amazonaws.com",
            {
              authSchemes: [
                { name: "sigv4", signingName: "greengrass", signingRegion: "us-gov-east-1" },
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
                { name: "sigv4", signingName: "greengrass", signingRegion: "us-gov-west-1" },
              ],
            },
            {},
          );
        }
        return e(`https://greengrass.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://greengrass.{R}.{D}","properties":{},"headers":{}}');

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
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class RequestAlreadyInProgressException
  extends /*@__PURE__*/ S.TaggedError<RequestAlreadyInProgressException>()(
    "RequestAlreadyInProgressException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      quotaCode: S.String,
      serviceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(561, __c35, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ComponentDependencyMap = { [key: string]: ComponentDependencyRequirement | undefined };
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
export type LambdaIsolationMode = "GreengrassContainer" | "NoContainer" | (string & {});
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
  componentDependencies?: { [key: string]: ComponentDependencyRequirement | undefined };
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
export type VendorGuidance = "ACTIVE" | "DISCONTINUED" | "DELETED" | (string & {});
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
export type DeploymentFailureHandlingPolicy = "ROLLBACK" | "DO_NOTHING" | (string & {});
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
export type ComponentVersionRequirementMap = { [key: string]: string | undefined };
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
  input: __S(576, __c36, 0) as any as S.Schema<AssociateServiceRoleToAccountRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<AssociateServiceRoleToAccountResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<BatchAssociateClientDeviceWithCoreDeviceRequest>,
  output: __S(612, __c38, 4) as any as S.Schema<BatchAssociateClientDeviceWithCoreDeviceResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<BatchDisassociateClientDeviceFromCoreDeviceRequest>,
  output: __S(
    612,
    __c38,
    4,
  ) as any as S.Schema<BatchDisassociateClientDeviceFromCoreDeviceResponse>,
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
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<CancelDeploymentRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<CancelDeploymentResponse>,
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
}));

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
  input: __S(44, __c2, 12) as any as S.Schema<CreateComponentVersionRequest>,
  output: __S(45, __c2, 13) as any as S.Schema<CreateComponentVersionResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateDeploymentResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<DeleteComponentRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DeleteComponentResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<DeleteCoreDeviceRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DeleteCoreDeviceResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<DeleteDeploymentRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DeleteDeploymentResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<DescribeComponentRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<DescribeComponentResponse>,
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
}));

export type DisassociateServiceRoleFromAccountError = InternalServerException | CommonErrors;
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
  input: __S(240, __c15, 0) as any as S.Schema<DisassociateServiceRoleFromAccountRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<DisassociateServiceRoleFromAccountResponse>,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<GetComponentRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetComponentResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<GetComponentVersionArtifactRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetComponentVersionArtifactResponse>,
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
}));

export type GetConnectivityInfoError = InternalServerException | ValidationException | CommonErrors;
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
  input: __S(288, __c18, 0) as any as S.Schema<GetConnectivityInfoRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetConnectivityInfoResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<GetCoreDeviceRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<GetCoreDeviceResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<GetDeploymentRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetDeploymentResponse>,
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
}));

export type GetServiceRoleForAccountError = InternalServerException | CommonErrors;
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
  input: __S(352, __c22, 0) as any as S.Schema<GetServiceRoleForAccountRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetServiceRoleForAccountResponse>,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<ListClientDevicesAssociatedWithCoreDeviceRequest>,
  output: __S(371, __c23, 3) as any as S.Schema<ListClientDevicesAssociatedWithCoreDeviceResponse>,
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
  input: __S(384, __c24, 0) as any as S.Schema<ListComponentsRequest>,
  output: __S(388, __c24, 4) as any as S.Schema<ListComponentsResponse>,
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
  input: __S(400, __c25, 0) as any as S.Schema<ListComponentVersionsRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<ListComponentVersionsResponse>,
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
  input: __S(416, __c26, 0) as any as S.Schema<ListCoreDevicesRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<ListCoreDevicesResponse>,
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
  input: __S(432, __c27, 0) as any as S.Schema<ListDeploymentsRequest>,
  output: __S(435, __c27, 3) as any as S.Schema<ListDeploymentsResponse>,
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
  input: __S(448, __c28, 0) as any as S.Schema<ListEffectiveDeploymentsRequest>,
  output: __S(452, __c28, 4) as any as S.Schema<ListEffectiveDeploymentsResponse>,
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
  input: __S(464, __c29, 0) as any as S.Schema<ListInstalledComponentsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListInstalledComponentsResponse>,
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
  input: __S(480, __c30, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(498, __c31, 2) as any as S.Schema<ResolveComponentCandidatesRequest>,
  output: __S(501, __c31, 5) as any as S.Schema<ResolveComponentCandidatesResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<UpdateConnectivityInfoRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<UpdateConnectivityInfoResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          entries: S.optional(__S(609, __c38, 1)),
          coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/disassociateClientDevices",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDisassociateClientDeviceFromCoreDeviceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/v2/deployments/{deploymentId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelDeploymentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "CancelDeploymentResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          versionRequirement: S.optional(S.String),
          dependencyType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentDependencyRequirement" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(32, __c2, 0).pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ topic: S.String, type: S.String })).annotate({
        identifier: "LambdaEventSource",
      });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          sourcePath: S.String,
          destinationPath: S.String,
          permission: S.optional(S.String),
          addGroupOwner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LambdaVolumeMount" });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          path: S.String,
          permission: S.optional(S.String),
          addGroupOwner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LambdaDeviceMount" });
    case 7:
      return S.Array(__S(38, __c2, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          memorySizeInKB: S.optional(S.Number),
          mountROSysfs: S.optional(S.Boolean),
          volumes: S.optional(__S(37, __c2, 5)),
          devices: S.optional(__S(39, __c2, 7)),
        }),
      ).annotate({ identifier: "LambdaContainerParams" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          isolationMode: S.optional(S.String),
          containerParams: S.optional(__S(40, __c2, 8)),
        }),
      ).annotate({ identifier: "LambdaLinuxProcessParams" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          eventSources: S.optional(__S(35, __c2, 3)),
          maxQueueSize: S.optional(S.Number),
          maxInstancesCount: S.optional(S.Number),
          maxIdleTimeInSeconds: S.optional(S.Number),
          timeoutInSeconds: S.optional(S.Number),
          statusTimeoutInSeconds: S.optional(S.Number),
          pinned: S.optional(S.Boolean),
          inputPayloadEncodingType: S.optional(S.String),
          execArgs: S.optional(__S(64, __c4, 0)),
          environmentVariables: S.optional(__S(48, __c3, 0)),
          linuxProcessParams: S.optional(__S(41, __c2, 9)),
        }),
      ).annotate({ identifier: "LambdaExecutionParameters" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          lambdaArn: S.String,
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          componentPlatforms: S.optional(__S(96, __c6, 0)),
          componentDependencies: S.optional(__S(33, __c2, 1)),
          componentLambdaParameters: S.optional(__S(42, __c2, 10)),
        }),
      ).annotate({ identifier: "LambdaFunctionRecipeSource" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          inlineRecipe: S.optional(T.Blob),
          lambdaFunction: S.optional(__S(43, __c2, 11)),
          tags: S.optional(__S(48, __c3, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/v2/createComponentVersion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateComponentVersionRequest" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          componentName: S.String,
          componentVersion: S.String,
          creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: __S(80, __c5, 0),
        }),
      ).annotate({ identifier: "CreateComponentVersionResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentState: S.optional(S.String),
          message: S.optional(S.String),
          errors: S.optional(__S(48, __c3, 0)),
          vendorGuidance: S.optional(S.String),
          vendorGuidanceMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudComponentStatus" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(112, __c7, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), attributes: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "ComponentPlatform" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.String,
          deploymentName: S.optional(S.String),
          components: S.optional(__S(148, __c9, 4)),
          iotJobConfiguration: S.optional(__S(156, __c9, 12)),
          deploymentPolicies: S.optional(__S(159, __c9, 15)),
          parentTargetArn: S.optional(S.String),
          tags: S.optional(__S(48, __c3, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/v2/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          iotJobId: S.optional(S.String),
          iotJobArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDeploymentResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ merge: S.optional(S.String), reset: S.optional(__S(64, __c4, 0)) }),
      ).annotate({ identifier: "ComponentConfigurationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({ memory: S.optional(S.Number), cpus: S.optional(S.Number) }),
      ).annotate({ identifier: "SystemResourceLimits" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          posixUser: S.optional(S.String),
          systemResourceLimits: S.optional(__S(145, __c9, 1)),
          windowsUser: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentRunWith" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          componentVersion: S.String,
          configurationUpdate: S.optional(__S(144, __c9, 0)),
          runWith: S.optional(__S(146, __c9, 2)),
        }),
      ).annotate({ identifier: "ComponentDeploymentSpecification" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(147, __c9, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          numberOfNotifiedThings: S.optional(S.Number),
          numberOfSucceededThings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IoTJobRateIncreaseCriteria" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          baseRatePerMinute: S.Number,
          incrementFactor: S.Number,
          rateIncreaseCriteria: __S(149, __c9, 5),
        }),
      ).annotate({ identifier: "IoTJobExponentialRolloutRate" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          exponentialRate: S.optional(__S(150, __c9, 6)),
          maximumPerMinute: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IoTJobExecutionsRolloutConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          failureType: S.String,
          action: S.String,
          thresholdPercentage: S.Number,
          minNumberOfExecutedThings: S.Number,
        }),
      ).annotate({ identifier: "IoTJobAbortCriteria" });
    case 9:
      return S.Array(__S(152, __c9, 8));
    case 10:
      return S.suspend(() => S.Struct({ criteriaList: __S(153, __c9, 9) })).annotate({
        identifier: "IoTJobAbortConfig",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({ inProgressTimeoutInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "IoTJobTimeoutConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          jobExecutionsRolloutConfig: S.optional(__S(151, __c9, 7)),
          abortConfig: S.optional(__S(154, __c9, 10)),
          timeoutConfig: S.optional(__S(155, __c9, 11)),
        }),
      ).annotate({ identifier: "DeploymentIoTJobConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ timeoutInSeconds: S.optional(S.Number), action: S.optional(S.String) }),
      ).annotate({ identifier: "DeploymentComponentUpdatePolicy" });
    case 14:
      return S.suspend(() => S.Struct({ timeoutInSeconds: S.optional(S.Number) })).annotate({
        identifier: "DeploymentConfigurationValidationPolicy",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          failureHandlingPolicy: S.optional(S.String),
          componentUpdatePolicy: S.optional(__S(157, __c9, 13)),
          configurationValidationPolicy: S.optional(__S(158, __c9, 14)),
        }),
      ).annotate({ identifier: "DeploymentPolicies" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/v2/components/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteComponentRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteComponentResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCoreDeviceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/v2/deployments/{deploymentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeploymentRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/components/{arn}/metadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          publisher: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(__S(80, __c5, 0)),
          platforms: S.optional(__S(96, __c6, 0)),
          tags: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "DescribeComponentResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/servicerole" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateServiceRoleFromAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ disassociatedAt: S.optional(S.String) }).pipe(
          S.encodeKeys({ disassociatedAt: "DisassociatedAt" }),
        ),
      ).annotate({ identifier: "DisassociateServiceRoleFromAccountResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recipeOutputFormat: S.optional(S.String).pipe(T.HttpQuery("recipeOutputFormat")),
          arn: S.String.pipe(T.HttpLabel("arn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/components/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recipeOutputFormat: S.String,
          recipe: T.Blob,
          tags: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "GetComponentResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          artifactName: S.String.pipe(T.HttpLabel("artifactName")),
          s3EndpointType: S.optional(S.String).pipe(T.HttpQuery("s3EndpointType")),
          iotEndpointType: S.optional(S.String).pipe(T.HttpHeader("x-amz-iot-endpoint-type")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/v2/components/{arn}/artifacts/{artifactName+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComponentVersionArtifactRequest" });
    case 1:
      return S.suspend(() => S.Struct({ preSignedUrl: S.String })).annotate({
        identifier: "GetComponentVersionArtifactResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/things/{thingName}/connectivityInfo" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectivityInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectivityInfo: S.optional(__S(305, __c19, 1)),
          message: S.optional(S.String),
        }).pipe(S.encodeKeys({ connectivityInfo: "ConnectivityInfo", message: "Message" })),
      ).annotate({ identifier: "GetConnectivityInfoResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          hostAddress: S.optional(S.String),
          portNumber: S.optional(S.Number),
          metadata: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            id: "Id",
            hostAddress: "HostAddress",
            portNumber: "PortNumber",
            metadata: "Metadata",
          }),
        ),
      ).annotate({ identifier: "ConnectivityInfo" });
    case 1:
      return S.Array(__S(304, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreDeviceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          coreDeviceThingName: S.optional(S.String),
          coreVersion: S.optional(S.String),
          platform: S.optional(S.String),
          architecture: S.optional(S.String),
          runtime: S.optional(S.String),
          status: S.optional(S.String),
          lastStatusUpdateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "GetCoreDeviceResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/deployments/{deploymentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.optional(S.String),
          revisionId: S.optional(S.String),
          deploymentId: S.optional(S.String),
          deploymentName: S.optional(S.String),
          deploymentStatus: S.optional(S.String),
          iotJobId: S.optional(S.String),
          iotJobArn: S.optional(S.String),
          components: S.optional(__S(148, __c9, 4)),
          deploymentPolicies: S.optional(__S(159, __c9, 15)),
          iotJobConfiguration: S.optional(__S(156, __c9, 12)),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          isLatestForTarget: S.optional(S.Boolean),
          parentTargetArn: S.optional(S.String),
          tags: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "GetDeploymentResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/servicerole" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceRoleForAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ associatedAt: S.optional(S.String), roleArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ associatedAt: "AssociatedAt", roleArn: "RoleArn" }),
        ),
      ).annotate({ identifier: "GetServiceRoleForAccountResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/associatedClientDevices",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListClientDevicesAssociatedWithCoreDeviceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          associationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AssociatedClientDevice" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          associatedClientDevices: S.optional(__S(370, __c23, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListClientDevicesAssociatedWithCoreDeviceResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/components" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComponentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          componentVersion: S.optional(S.String),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          publisher: S.optional(S.String),
          platforms: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "ComponentLatestVersion" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          componentName: S.optional(S.String),
          latestVersion: S.optional(__S(385, __c24, 1)),
        }),
      ).annotate({ identifier: "Component" });
    case 3:
      return S.Array(__S(386, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ components: S.optional(__S(387, __c24, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListComponentsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/components/{arn}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComponentVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentVersionListItem" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          componentVersions: S.optional(__S(402, __c25, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListComponentVersionsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupArn: S.optional(S.String).pipe(T.HttpQuery("thingGroupArn")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          runtime: S.optional(S.String).pipe(T.HttpQuery("runtime")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/coreDevices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreDevicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          coreDeviceThingName: S.optional(S.String),
          status: S.optional(S.String),
          lastStatusUpdateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          platform: S.optional(S.String),
          architecture: S.optional(S.String),
          runtime: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreDevice" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ coreDevices: S.optional(__S(418, __c26, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCoreDevicesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.optional(S.String).pipe(T.HttpQuery("targetArn")),
          historyFilter: S.optional(S.String).pipe(T.HttpQuery("historyFilter")),
          parentTargetArn: S.optional(S.String).pipe(T.HttpQuery("parentTargetArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/v2/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.optional(S.String),
          revisionId: S.optional(S.String),
          deploymentId: S.optional(S.String),
          deploymentName: S.optional(S.String),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentStatus: S.optional(S.String),
          isLatestForTarget: S.optional(S.Boolean),
          parentTargetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Deployment" });
    case 2:
      return S.Array(__S(433, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ deployments: S.optional(__S(434, __c27, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeploymentsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/effectiveDeployments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEffectiveDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          errorStack: S.optional(__S(64, __c4, 0)),
          errorTypes: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "EffectiveDeploymentStatusDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          deploymentName: S.String,
          iotJobId: S.optional(S.String),
          iotJobArn: S.optional(S.String),
          description: S.optional(S.String),
          targetArn: S.String,
          coreDeviceExecutionStatus: S.String,
          reason: S.optional(S.String),
          creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          statusDetails: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "EffectiveDeployment" });
    case 3:
      return S.Array(__S(450, __c28, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          effectiveDeployments: S.optional(__S(451, __c28, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEffectiveDeploymentsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          topologyFilter: S.optional(S.String).pipe(T.HttpQuery("topologyFilter")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/installedComponents",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInstalledComponentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          lifecycleState: S.optional(S.String),
          lifecycleStateDetails: S.optional(S.String),
          isRoot: S.optional(S.Boolean),
          lastStatusChangeTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastReportedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastInstallationSource: S.optional(S.String),
          lifecycleStatusCodes: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "InstalledComponent" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          installedComponents: S.optional(__S(466, __c29, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInstalledComponentsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          versionRequirements: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "ComponentCandidate" });
    case 1:
      return S.Array(__S(496, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          platform: S.optional(__S(112, __c7, 0)),
          componentCandidates: S.optional(__S(497, __c31, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/v2/resolveComponentCandidates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResolveComponentCandidatesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          componentName: S.optional(S.String),
          componentVersion: S.optional(S.String),
          recipe: S.optional(T.Blob),
          vendorGuidance: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolvedComponentVersion" });
    case 4:
      return S.Array(__S(499, __c31, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ resolvedComponentVersions: S.optional(__S(500, __c31, 4)) }),
      ).annotate({ identifier: "ResolveComponentCandidatesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(64, __c4, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          connectivityInfo: __S(305, __c19, 1),
        })
          .pipe(S.encodeKeys({ thingName: "ThingName", connectivityInfo: "ConnectivityInfo" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/greengrass/things/{thingName}/connectivityInfo" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateConnectivityInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ version: S.optional(S.String), message: S.optional(S.String) }).pipe(
          S.encodeKeys({ version: "Version", message: "Message" }),
        ),
      ).annotate({ identifier: "UpdateConnectivityInfoResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(560, __c35, 0));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String })
          .pipe(S.encodeKeys({ roleArn: "RoleArn" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/greengrass/servicerole" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AssociateServiceRoleToAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ associatedAt: S.optional(S.String) }).pipe(
          S.encodeKeys({ associatedAt: "AssociatedAt" }),
        ),
      ).annotate({ identifier: "AssociateServiceRoleToAccountResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          entries: S.optional(__S(609, __c38, 1)),
          coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/associateClientDevices",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchAssociateClientDeviceWithCoreDeviceRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ thingName: S.String })).annotate({
        identifier: "AssociateClientDeviceWithCoreDeviceEntry",
      });
    case 1:
      return S.Array(__S(608, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          code: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateClientDeviceWithCoreDeviceErrorEntry" });
    case 3:
      return S.Array(__S(610, __c38, 2));
    case 4:
      return S.suspend(() => S.Struct({ errorEntries: S.optional(__S(611, __c38, 3)) })).annotate({
        identifier: "BatchAssociateClientDeviceWithCoreDeviceResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
