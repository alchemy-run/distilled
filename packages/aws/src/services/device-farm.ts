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
  sdkId: "Device Farm",
  target: "DeviceFarm_20150623",
  version: "2015-06-23",
  sigv4: "devicefarm",
  protocol: awsJson1_1Protocol,
  xmlns: "http://devicefarm.amazonaws.com/doc/2015-06-23/",
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
                `https://devicefarm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://devicefarm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ArgumentException
  extends /*@__PURE__*/ TE.TaggedError("ArgumentException")<{
    readonly message?: string;
  }> {}
export class CannotDeleteException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotDeleteException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class IdempotencyException
  extends /*@__PURE__*/ TE.TaggedError("IdempotencyException")<{
    readonly message?: string;
  }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class NotEligibleException
  extends /*@__PURE__*/ TE.TaggedError("NotEligibleException")<{
    readonly message?: string;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError("NotFoundException")<{
    readonly message?: string;
  }> {}
export class ServiceAccountException
  extends /*@__PURE__*/ TE.TaggedError("ServiceAccountException")<{
    readonly message?: string;
  }> {}
export class TagOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class TagPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export type AmazonResourceName = string;
export type Name = string;
export type Message = string;
export type DeviceAttribute =
  | "ARN"
  | "PLATFORM"
  | "FORM_FACTOR"
  | "MANUFACTURER"
  | "REMOTE_ACCESS_ENABLED"
  | "REMOTE_DEBUG_ENABLED"
  | "APPIUM_VERSION"
  | "INSTANCE_ARN"
  | "INSTANCE_LABELS"
  | "FLEET_TYPE"
  | "OS_VERSION"
  | "MODEL"
  | "AVAILABILITY"
  | (string & {});
export type RuleOperator =
  | "EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "IN"
  | "NOT_IN"
  | "CONTAINS"
  | (string & {});
export interface Rule {
  attribute?: DeviceAttribute;
  operator?: RuleOperator;
  value?: string;
}
export type Rules = Rule[];
export interface CreateDevicePoolRequest {
  projectArn: string;
  name: string;
  description?: string;
  rules: Rule[];
  maxDevices?: number;
}
export type DevicePoolType = "CURATED" | "PRIVATE" | (string & {});
export interface DevicePool {
  arn?: string;
  name?: string;
  description?: string;
  type?: DevicePoolType;
  rules?: Rule[];
  maxDevices?: number;
}
export interface CreateDevicePoolResult {
  devicePool?: DevicePool;
}
export type PackageIds = string[];
export interface CreateInstanceProfileRequest {
  name: string;
  description?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
}
export interface InstanceProfile {
  arn?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
  name?: string;
  description?: string;
}
export interface CreateInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export type NetworkProfileType = "CURATED" | "PRIVATE" | (string & {});
export type PercentInteger = number;
export interface CreateNetworkProfileRequest {
  projectArn: string;
  name: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export interface NetworkProfile {
  arn?: string;
  name?: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export interface CreateNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export type JobTimeoutMinutes = number;
export type SecurityGroupId = string;
export type VpcSecurityGroupIds = string[];
export type SubnetId = string;
export type VpcSubnetIds = string[];
export type NonEmptyString = string;
export interface VpcConfig {
  securityGroupIds: string[];
  subnetIds: string[];
  vpcId: string;
}
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export interface EnvironmentVariable {
  name: string;
  value: string;
}
export type EnvironmentVariables = EnvironmentVariable[];
export type AmazonRoleResourceName = string;
export interface CreateProjectRequest {
  name: string;
  defaultJobTimeoutMinutes?: number;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export interface Project {
  arn?: string;
  name?: string;
  defaultJobTimeoutMinutes?: number;
  created?: Date;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export interface CreateProjectResult {
  project?: Project;
}
export type AuxiliaryAppArnList = string[];
export type BillingMethod = "METERED" | "UNMETERED" | (string & {});
export type AmazonResourceNames = string[];
export type DeviceProxyHost = string;
export type DeviceProxyPort = number;
export interface DeviceProxy {
  host: string;
  port: number;
}
export type RemoteAccessParameterKey = string;
export type RemoteAccessParameterValue = string;
export type RemoteAccessParameters = { [key: string]: string | undefined };
export interface CreateRemoteAccessSessionConfiguration {
  auxiliaryApps?: string[];
  billingMethod?: BillingMethod;
  vpceConfigurationArns?: string[];
  deviceProxy?: DeviceProxy;
  parameters?: { [key: string]: string | undefined };
}
export type InteractionMode =
  | "INTERACTIVE"
  | "NO_VIDEO"
  | "VIDEO_ONLY"
  | (string & {});
export interface CreateRemoteAccessSessionRequest {
  projectArn: string;
  deviceArn: string;
  appArn?: string;
  instanceArn?: string;
  name?: string;
  configuration?: CreateRemoteAccessSessionConfiguration;
  interactionMode?: InteractionMode;
  skipAppResign?: boolean;
}
export type ExecutionStatus =
  | "PENDING"
  | "PENDING_CONCURRENCY"
  | "PENDING_DEVICE"
  | "PROCESSING"
  | "SCHEDULING"
  | "PREPARING"
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | (string & {});
export type ExecutionResult =
  | "PENDING"
  | "PASSED"
  | "WARNED"
  | "FAILED"
  | "SKIPPED"
  | "ERRORED"
  | "STOPPED"
  | (string & {});
export type DeviceFormFactor = "PHONE" | "TABLET" | (string & {});
export type DevicePlatform = "ANDROID" | "IOS" | (string & {});
export interface CPU {
  frequency?: string;
  architecture?: string;
  clock?: number;
}
export interface Resolution {
  width?: number;
  height?: number;
}
export type InstanceLabels = string[];
export type InstanceStatus =
  | "IN_USE"
  | "PREPARING"
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
export interface DeviceInstance {
  arn?: string;
  deviceArn?: string;
  labels?: string[];
  status?: InstanceStatus;
  udid?: string;
  instanceProfile?: InstanceProfile;
}
export type DeviceInstances = DeviceInstance[];
export type DeviceAvailability =
  | "TEMPORARY_NOT_AVAILABLE"
  | "BUSY"
  | "AVAILABLE"
  | "HIGHLY_AVAILABLE"
  | (string & {});
export interface Device {
  arn?: string;
  name?: string;
  manufacturer?: string;
  model?: string;
  modelId?: string;
  formFactor?: DeviceFormFactor;
  platform?: DevicePlatform;
  os?: string;
  cpu?: CPU;
  resolution?: Resolution;
  heapSize?: number;
  memory?: number;
  image?: string;
  carrier?: string;
  radio?: string;
  remoteAccessEnabled?: boolean;
  remoteDebugEnabled?: boolean;
  fleetType?: string;
  fleetName?: string;
  instances?: DeviceInstance[];
  availability?: DeviceAvailability;
}
export interface DeviceMinutes {
  total?: number;
  metered?: number;
  unmetered?: number;
}
export type SkipAppResign = boolean;
export type SensitiveURL = string | redacted.Redacted<string>;
export interface RemoteAccessEndpoints {
  remoteDriverEndpoint?: string | redacted.Redacted<string>;
  interactiveEndpoint?: string | redacted.Redacted<string>;
}
export interface RemoteAccessSession {
  arn?: string;
  name?: string;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  message?: string;
  started?: Date;
  stopped?: Date;
  device?: Device;
  instanceArn?: string;
  billingMethod?: BillingMethod;
  deviceMinutes?: DeviceMinutes;
  endpoint?: string;
  deviceUdid?: string;
  interactionMode?: InteractionMode;
  skipAppResign?: boolean;
  vpcConfig?: VpcConfig;
  deviceProxy?: DeviceProxy;
  appUpload?: string;
  endpoints?: RemoteAccessEndpoints;
}
export interface CreateRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export type ResourceName = string;
export type ResourceDescription = string;
export type SecurityGroupIds = string[];
export type SubnetIds = string[];
export interface TestGridVpcConfig {
  securityGroupIds: string[];
  subnetIds: string[];
  vpcId: string;
}
export interface CreateTestGridProjectRequest {
  name: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
}
export type DeviceFarmArn = string;
export interface TestGridProject {
  arn?: string;
  name?: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
  created?: Date;
}
export interface CreateTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export type TestGridUrlExpiresInSecondsInput = number;
export interface CreateTestGridUrlRequest {
  projectArn: string;
  expiresInSeconds: number;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface CreateTestGridUrlResult {
  url?: string | redacted.Redacted<string>;
  expires?: Date;
}
export type UploadType =
  | "ANDROID_APP"
  | "IOS_APP"
  | "WEB_APP"
  | "EXTERNAL_DATA"
  | "APPIUM_JAVA_JUNIT_TEST_PACKAGE"
  | "APPIUM_JAVA_TESTNG_TEST_PACKAGE"
  | "APPIUM_PYTHON_TEST_PACKAGE"
  | "APPIUM_NODE_TEST_PACKAGE"
  | "APPIUM_RUBY_TEST_PACKAGE"
  | "APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE"
  | "APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE"
  | "APPIUM_WEB_PYTHON_TEST_PACKAGE"
  | "APPIUM_WEB_NODE_TEST_PACKAGE"
  | "APPIUM_WEB_RUBY_TEST_PACKAGE"
  | "CALABASH_TEST_PACKAGE"
  | "INSTRUMENTATION_TEST_PACKAGE"
  | "UIAUTOMATION_TEST_PACKAGE"
  | "UIAUTOMATOR_TEST_PACKAGE"
  | "XCTEST_TEST_PACKAGE"
  | "XCTEST_UI_TEST_PACKAGE"
  | "APPIUM_JAVA_JUNIT_TEST_SPEC"
  | "APPIUM_JAVA_TESTNG_TEST_SPEC"
  | "APPIUM_PYTHON_TEST_SPEC"
  | "APPIUM_NODE_TEST_SPEC"
  | "APPIUM_RUBY_TEST_SPEC"
  | "APPIUM_WEB_JAVA_JUNIT_TEST_SPEC"
  | "APPIUM_WEB_JAVA_TESTNG_TEST_SPEC"
  | "APPIUM_WEB_PYTHON_TEST_SPEC"
  | "APPIUM_WEB_NODE_TEST_SPEC"
  | "APPIUM_WEB_RUBY_TEST_SPEC"
  | "INSTRUMENTATION_TEST_SPEC"
  | "XCTEST_UI_TEST_SPEC"
  | (string & {});
export type ContentType = string;
export interface CreateUploadRequest {
  projectArn: string;
  name: string;
  type: UploadType;
  contentType?: string;
}
export type UploadStatus =
  | "INITIALIZED"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type Metadata = string;
export type UploadCategory = "CURATED" | "PRIVATE" | (string & {});
export interface Upload {
  arn?: string;
  name?: string;
  created?: Date;
  type?: UploadType;
  status?: UploadStatus;
  url?: string | redacted.Redacted<string>;
  metadata?: string;
  contentType?: string;
  message?: string;
  category?: UploadCategory;
}
export interface CreateUploadResult {
  upload?: Upload;
}
export type VPCEConfigurationName = string;
export type VPCEServiceName = string;
export type ServiceDnsName = string;
export type VPCEConfigurationDescription = string;
export interface CreateVPCEConfigurationRequest {
  vpceConfigurationName: string;
  vpceServiceName: string;
  serviceDnsName: string;
  vpceConfigurationDescription?: string;
}
export interface VPCEConfiguration {
  arn?: string;
  vpceConfigurationName?: string;
  vpceServiceName?: string;
  serviceDnsName?: string;
  vpceConfigurationDescription?: string;
}
export interface CreateVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export interface DeleteDevicePoolRequest {
  arn: string;
}
export interface DeleteDevicePoolResult {}
export interface DeleteInstanceProfileRequest {
  arn: string;
}
export interface DeleteInstanceProfileResult {}
export interface DeleteNetworkProfileRequest {
  arn: string;
}
export interface DeleteNetworkProfileResult {}
export interface DeleteProjectRequest {
  arn: string;
}
export interface DeleteProjectResult {}
export interface DeleteRemoteAccessSessionRequest {
  arn: string;
}
export interface DeleteRemoteAccessSessionResult {}
export interface DeleteRunRequest {
  arn: string;
}
export interface DeleteRunResult {}
export interface DeleteTestGridProjectRequest {
  projectArn: string;
}
export interface DeleteTestGridProjectResult {}
export interface DeleteUploadRequest {
  arn: string;
}
export interface DeleteUploadResult {}
export interface DeleteVPCEConfigurationRequest {
  arn: string;
}
export interface DeleteVPCEConfigurationResult {}
export interface GetAccountSettingsRequest {}
export type AWSAccountNumber = string;
export type PurchasedDevicesMap = { [key in DevicePlatform]?: number };
export interface TrialMinutes {
  total?: number;
  remaining?: number;
}
export type MaxSlotMap = { [key: string]: number | undefined };
export interface AccountSettings {
  awsAccountNumber?: string;
  unmeteredDevices?: { [key: string]: number | undefined };
  unmeteredRemoteAccessDevices?: { [key: string]: number | undefined };
  maxJobTimeoutMinutes?: number;
  trialMinutes?: TrialMinutes;
  maxSlots?: { [key: string]: number | undefined };
  defaultJobTimeoutMinutes?: number;
  skipAppResign?: boolean;
}
export interface GetAccountSettingsResult {
  accountSettings?: AccountSettings;
}
export interface GetDeviceRequest {
  arn: string;
}
export interface GetDeviceResult {
  device?: Device;
}
export interface GetDeviceInstanceRequest {
  arn: string;
}
export interface GetDeviceInstanceResult {
  deviceInstance?: DeviceInstance;
}
export interface GetDevicePoolRequest {
  arn: string;
}
export interface GetDevicePoolResult {
  devicePool?: DevicePool;
}
export type TestType =
  | "BUILTIN_FUZZ"
  | "APPIUM_JAVA_JUNIT"
  | "APPIUM_JAVA_TESTNG"
  | "APPIUM_PYTHON"
  | "APPIUM_NODE"
  | "APPIUM_RUBY"
  | "APPIUM_WEB_JAVA_JUNIT"
  | "APPIUM_WEB_JAVA_TESTNG"
  | "APPIUM_WEB_PYTHON"
  | "APPIUM_WEB_NODE"
  | "APPIUM_WEB_RUBY"
  | "INSTRUMENTATION"
  | "XCTEST"
  | "XCTEST_UI"
  | (string & {});
export type Filter = string;
export type TestParameters = { [key: string]: string | undefined };
export interface ScheduleRunTest {
  type: TestType;
  testPackageArn?: string;
  testSpecArn?: string;
  filter?: string;
  parameters?: { [key: string]: string | undefined };
}
export interface Location {
  latitude: number;
  longitude: number;
}
export type IosPaths = string[];
export type AndroidPaths = string[];
export type DeviceHostPaths = string[];
export interface CustomerArtifactPaths {
  iosPaths?: string[];
  androidPaths?: string[];
  deviceHostPaths?: string[];
}
export interface Radios {
  wifi?: boolean;
  bluetooth?: boolean;
  nfc?: boolean;
  gps?: boolean;
}
export type InsightsType = "TEST_REPORT" | (string & {});
export type InsightsTypes = InsightsType[];
export interface ScheduleRunConfiguration {
  extraDataPackageArn?: string;
  networkProfileArn?: string;
  locale?: string;
  location?: Location;
  vpceConfigurationArns?: string[];
  deviceProxy?: DeviceProxy;
  customerArtifactPaths?: CustomerArtifactPaths;
  radios?: Radios;
  auxiliaryApps?: string[];
  billingMethod?: BillingMethod;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
  insightsTypes?: InsightsType[];
}
export interface GetDevicePoolCompatibilityRequest {
  devicePoolArn: string;
  appArn?: string;
  testType?: TestType;
  test?: ScheduleRunTest;
  configuration?: ScheduleRunConfiguration;
  projectArn?: string;
}
export interface IncompatibilityMessage {
  message?: string;
  type?: DeviceAttribute;
}
export type IncompatibilityMessages = IncompatibilityMessage[];
export interface DevicePoolCompatibilityResult {
  device?: Device;
  compatible?: boolean;
  incompatibilityMessages?: IncompatibilityMessage[];
}
export type DevicePoolCompatibilityResults = DevicePoolCompatibilityResult[];
export interface GetDevicePoolCompatibilityResult {
  compatibleDevices?: DevicePoolCompatibilityResult[];
  incompatibleDevices?: DevicePoolCompatibilityResult[];
}
export interface GetInstanceProfileRequest {
  arn: string;
}
export interface GetInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export interface GetJobRequest {
  arn: string;
}
export interface Counters {
  total?: number;
  passed?: number;
  failed?: number;
  warned?: number;
  errored?: number;
  stopped?: number;
  skipped?: number;
}
export type VideoCapture = boolean;
export type ReportStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "SKIPPED"
  | "ERRORED"
  | (string & {});
export type ReportMessage = string;
export interface TestReportMetrics {
  testsTotal?: number;
  testsPassed?: number;
  testsFailed?: number;
  testsSkipped?: number;
  testsErrored?: number;
  testsOther?: number;
  testsPassedPercentage?: number;
  totalTestExecutionDurationSeconds?: number;
  medianTestExecutionDurationSeconds?: number;
}
export interface TestReport {
  message?: string;
  metrics?: TestReportMetrics;
  testDetailsUrl?: string | redacted.Redacted<string>;
}
export interface JobInsights {
  status?: ReportStatus;
  testReport?: TestReport;
}
export interface Job {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  device?: Device;
  instanceArn?: string;
  deviceMinutes?: DeviceMinutes;
  videoEndpoint?: string;
  videoCapture?: boolean;
  insights?: JobInsights;
}
export interface GetJobResult {
  job?: Job;
}
export interface GetNetworkProfileRequest {
  arn: string;
}
export interface GetNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export type PaginationToken = string;
export interface GetOfferingStatusRequest {
  nextToken?: string;
}
export type OfferingIdentifier = string;
export type OfferingTransactionType =
  | "PURCHASE"
  | "RENEW"
  | "SYSTEM"
  | (string & {});
export type OfferingType = "RECURRING" | (string & {});
export type CurrencyCode = "USD" | (string & {});
export interface MonetaryAmount {
  amount?: number;
  currencyCode?: CurrencyCode;
}
export type RecurringChargeFrequency = "MONTHLY" | (string & {});
export interface RecurringCharge {
  cost?: MonetaryAmount;
  frequency?: RecurringChargeFrequency;
}
export type RecurringCharges = RecurringCharge[];
export interface Offering {
  id?: string;
  description?: string;
  type?: OfferingType;
  platform?: DevicePlatform;
  recurringCharges?: RecurringCharge[];
}
export interface OfferingStatus {
  type?: OfferingTransactionType;
  offering?: Offering;
  quantity?: number;
  effectiveOn?: Date;
}
export type OfferingStatusMap = { [key: string]: OfferingStatus | undefined };
export interface GetOfferingStatusResult {
  current?: { [key: string]: OfferingStatus | undefined };
  nextPeriod?: { [key: string]: OfferingStatus | undefined };
  nextToken?: string;
}
export interface GetProjectRequest {
  arn: string;
}
export interface GetProjectResult {
  project?: Project;
}
export interface GetRemoteAccessSessionRequest {
  arn: string;
}
export interface GetRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export interface GetRunRequest {
  arn: string;
}
export type ExecutionResultCode =
  | "PARSING_FAILED"
  | "VPC_ENDPOINT_SETUP_FAILED"
  | (string & {});
export type DeviceFilterAttribute =
  | "ARN"
  | "PLATFORM"
  | "OS_VERSION"
  | "MODEL"
  | "AVAILABILITY"
  | "FORM_FACTOR"
  | "MANUFACTURER"
  | "REMOTE_ACCESS_ENABLED"
  | "REMOTE_DEBUG_ENABLED"
  | "INSTANCE_ARN"
  | "INSTANCE_LABELS"
  | "FLEET_TYPE"
  | (string & {});
export type DeviceFilterValues = string[];
export interface DeviceFilter {
  attribute: DeviceFilterAttribute;
  operator: RuleOperator;
  values: string[];
}
export type DeviceFilters = DeviceFilter[];
export interface DeviceSelectionResult {
  filters?: DeviceFilter[];
  matchedDevicesCount?: number;
  maxDevices?: number;
}
export interface JobReportMetrics {
  jobsTotal?: number;
  jobsPassed?: number;
  jobsFailed?: number;
  jobsSkipped?: number;
  jobsErrored?: number;
  jobsStopped?: number;
  jobsPassedPercentage?: number;
  totalJobExecutionDurationSeconds?: number;
  averageJobExecutionDurationSeconds?: number;
  medianJobExecutionDurationSeconds?: number;
}
export interface JobReport {
  message?: string;
  metrics?: JobReportMetrics;
  jobDetailsUrl?: string | redacted.Redacted<string>;
}
export interface RunInsights {
  status?: ReportStatus;
  jobReport?: JobReport;
}
export interface Run {
  arn?: string;
  name?: string;
  type?: TestType;
  platform?: DevicePlatform;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  totalJobs?: number;
  completedJobs?: number;
  billingMethod?: BillingMethod;
  deviceMinutes?: DeviceMinutes;
  networkProfile?: NetworkProfile;
  deviceProxy?: DeviceProxy;
  parsingResultUrl?: string;
  resultCode?: ExecutionResultCode;
  seed?: number;
  appUpload?: string;
  eventCount?: number;
  jobTimeoutMinutes?: number;
  devicePoolArn?: string;
  locale?: string;
  radios?: Radios;
  location?: Location;
  customerArtifactPaths?: CustomerArtifactPaths;
  webUrl?: string;
  skipAppResign?: boolean;
  testSpecArn?: string;
  deviceSelectionResult?: DeviceSelectionResult;
  vpcConfig?: VpcConfig;
  executionRoleArn?: string;
  environmentVariables?: EnvironmentVariable[];
  insightsTypes?: InsightsType[];
  insights?: RunInsights;
}
export interface GetRunResult {
  run?: Run;
}
export interface GetSuiteRequest {
  arn: string;
}
export interface Suite {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  deviceMinutes?: DeviceMinutes;
}
export interface GetSuiteResult {
  suite?: Suite;
}
export interface GetTestRequest {
  arn: string;
}
export interface Test {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  deviceMinutes?: DeviceMinutes;
}
export interface GetTestResult {
  test?: Test;
}
export interface GetTestGridProjectRequest {
  projectArn: string;
}
export interface GetTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export type ResourceId = string;
export interface GetTestGridSessionRequest {
  projectArn?: string;
  sessionId?: string;
  sessionArn?: string;
}
export type TestGridSessionStatus =
  | "ACTIVE"
  | "CLOSED"
  | "ERRORED"
  | (string & {});
export interface TestGridSession {
  arn?: string;
  status?: TestGridSessionStatus;
  created?: Date;
  ended?: Date;
  billingMinutes?: number;
  seleniumProperties?: string;
}
export interface GetTestGridSessionResult {
  testGridSession?: TestGridSession;
}
export interface GetUploadRequest {
  arn: string;
}
export interface GetUploadResult {
  upload?: Upload;
}
export interface GetVPCEConfigurationRequest {
  arn: string;
}
export interface GetVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export interface InstallToRemoteAccessSessionRequest {
  remoteAccessSessionArn: string;
  appArn: string;
}
export interface InstallToRemoteAccessSessionResult {
  appUpload?: Upload;
}
export type ArtifactCategory = "SCREENSHOT" | "FILE" | "LOG" | (string & {});
export interface ListArtifactsRequest {
  arn: string;
  type: ArtifactCategory;
  nextToken?: string;
}
export type ArtifactType =
  | "UNKNOWN"
  | "SCREENSHOT"
  | "DEVICE_LOG"
  | "MESSAGE_LOG"
  | "VIDEO_LOG"
  | "RESULT_LOG"
  | "SERVICE_LOG"
  | "WEBKIT_LOG"
  | "INSTRUMENTATION_OUTPUT"
  | "EXERCISER_MONKEY_OUTPUT"
  | "CALABASH_JSON_OUTPUT"
  | "CALABASH_PRETTY_OUTPUT"
  | "CALABASH_STANDARD_OUTPUT"
  | "CALABASH_JAVA_XML_OUTPUT"
  | "AUTOMATION_OUTPUT"
  | "APPIUM_SERVER_OUTPUT"
  | "APPIUM_JAVA_OUTPUT"
  | "APPIUM_JAVA_XML_OUTPUT"
  | "APPIUM_PYTHON_OUTPUT"
  | "APPIUM_PYTHON_XML_OUTPUT"
  | "EXPLORER_EVENT_LOG"
  | "EXPLORER_SUMMARY_LOG"
  | "APPLICATION_CRASH_REPORT"
  | "XCTEST_LOG"
  | "VIDEO"
  | "CUSTOMER_ARTIFACT"
  | "CUSTOMER_ARTIFACT_LOG"
  | "TESTSPEC_OUTPUT"
  | (string & {});
export type URL = string;
export interface Artifact {
  arn?: string;
  name?: string;
  type?: ArtifactType;
  extension?: string;
  url?: string;
}
export type Artifacts = Artifact[];
export interface ListArtifactsResult {
  artifacts?: Artifact[];
  nextToken?: string;
}
export interface ListDeviceInstancesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ListDeviceInstancesResult {
  deviceInstances?: DeviceInstance[];
  nextToken?: string;
}
export interface ListDevicePoolsRequest {
  arn: string;
  type?: DevicePoolType;
  nextToken?: string;
}
export type DevicePools = DevicePool[];
export interface ListDevicePoolsResult {
  devicePools?: DevicePool[];
  nextToken?: string;
}
export interface ListDevicesRequest {
  arn?: string;
  nextToken?: string;
  filters?: DeviceFilter[];
}
export type Devices = Device[];
export interface ListDevicesResult {
  devices?: Device[];
  nextToken?: string;
}
export interface ListInstanceProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export type InstanceProfiles = InstanceProfile[];
export interface ListInstanceProfilesResult {
  instanceProfiles?: InstanceProfile[];
  nextToken?: string;
}
export interface ListJobsRequest {
  arn: string;
  nextToken?: string;
}
export type Jobs = Job[];
export interface ListJobsResult {
  jobs?: Job[];
  nextToken?: string;
}
export interface ListNetworkProfilesRequest {
  arn: string;
  type?: NetworkProfileType;
  nextToken?: string;
}
export type NetworkProfiles = NetworkProfile[];
export interface ListNetworkProfilesResult {
  networkProfiles?: NetworkProfile[];
  nextToken?: string;
}
export interface ListOfferingPromotionsRequest {
  nextToken?: string;
}
export type OfferingPromotionIdentifier = string;
export interface OfferingPromotion {
  id?: string;
  description?: string;
}
export type OfferingPromotions = OfferingPromotion[];
export interface ListOfferingPromotionsResult {
  offeringPromotions?: OfferingPromotion[];
  nextToken?: string;
}
export interface ListOfferingsRequest {
  nextToken?: string;
}
export type Offerings = Offering[];
export interface ListOfferingsResult {
  offerings?: Offering[];
  nextToken?: string;
}
export interface ListOfferingTransactionsRequest {
  nextToken?: string;
}
export type TransactionIdentifier = string;
export interface OfferingTransaction {
  offeringStatus?: OfferingStatus;
  transactionId?: string;
  offeringPromotionId?: string;
  createdOn?: Date;
  cost?: MonetaryAmount;
}
export type OfferingTransactions = OfferingTransaction[];
export interface ListOfferingTransactionsResult {
  offeringTransactions?: OfferingTransaction[];
  nextToken?: string;
}
export interface ListProjectsRequest {
  arn?: string;
  nextToken?: string;
}
export type Projects = Project[];
export interface ListProjectsResult {
  projects?: Project[];
  nextToken?: string;
}
export interface ListRemoteAccessSessionsRequest {
  arn: string;
  nextToken?: string;
}
export type RemoteAccessSessions = RemoteAccessSession[];
export interface ListRemoteAccessSessionsResult {
  remoteAccessSessions?: RemoteAccessSession[];
  nextToken?: string;
}
export interface ListRunsRequest {
  arn: string;
  nextToken?: string;
}
export type Runs = Run[];
export interface ListRunsResult {
  runs?: Run[];
  nextToken?: string;
}
export interface ListSamplesRequest {
  arn: string;
  nextToken?: string;
}
export type SampleType =
  | "CPU"
  | "MEMORY"
  | "THREADS"
  | "RX_RATE"
  | "TX_RATE"
  | "RX"
  | "TX"
  | "NATIVE_FRAMES"
  | "NATIVE_FPS"
  | "NATIVE_MIN_DRAWTIME"
  | "NATIVE_AVG_DRAWTIME"
  | "NATIVE_MAX_DRAWTIME"
  | "OPENGL_FRAMES"
  | "OPENGL_FPS"
  | "OPENGL_MIN_DRAWTIME"
  | "OPENGL_AVG_DRAWTIME"
  | "OPENGL_MAX_DRAWTIME"
  | (string & {});
export interface Sample {
  arn?: string;
  type?: SampleType;
  url?: string;
}
export type Samples = Sample[];
export interface ListSamplesResult {
  samples?: Sample[];
  nextToken?: string;
}
export interface ListSuitesRequest {
  arn: string;
  nextToken?: string;
}
export type Suites = Suite[];
export interface ListSuitesResult {
  suites?: Suite[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type MaxPageSize = number;
export interface ListTestGridProjectsRequest {
  maxResult?: number;
  nextToken?: string;
}
export type TestGridProjects = TestGridProject[];
export interface ListTestGridProjectsResult {
  testGridProjects?: TestGridProject[];
  nextToken?: string;
}
export interface ListTestGridSessionActionsRequest {
  sessionArn: string;
  maxResult?: number;
  nextToken?: string;
}
export interface TestGridSessionAction {
  action?: string;
  started?: Date;
  duration?: number;
  statusCode?: string;
  requestMethod?: string;
}
export type TestGridSessionActions = TestGridSessionAction[];
export interface ListTestGridSessionActionsResult {
  actions?: TestGridSessionAction[];
  nextToken?: string;
}
export type TestGridSessionArtifactCategory = "VIDEO" | "LOG" | (string & {});
export interface ListTestGridSessionArtifactsRequest {
  sessionArn: string;
  type?: TestGridSessionArtifactCategory;
  maxResult?: number;
  nextToken?: string;
}
export type TestGridSessionArtifactType =
  | "UNKNOWN"
  | "VIDEO"
  | "SELENIUM_LOG"
  | (string & {});
export interface TestGridSessionArtifact {
  filename?: string;
  type?: TestGridSessionArtifactType;
  url?: string | redacted.Redacted<string>;
}
export type TestGridSessionArtifacts = TestGridSessionArtifact[];
export interface ListTestGridSessionArtifactsResult {
  artifacts?: TestGridSessionArtifact[];
  nextToken?: string;
}
export interface ListTestGridSessionsRequest {
  projectArn: string;
  status?: TestGridSessionStatus;
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  endTimeAfter?: Date;
  endTimeBefore?: Date;
  maxResult?: number;
  nextToken?: string;
}
export type TestGridSessions = TestGridSession[];
export interface ListTestGridSessionsResult {
  testGridSessions?: TestGridSession[];
  nextToken?: string;
}
export interface ListTestsRequest {
  arn: string;
  nextToken?: string;
}
export type Tests = Test[];
export interface ListTestsResult {
  tests?: Test[];
  nextToken?: string;
}
export interface ListUniqueProblemsRequest {
  arn: string;
  nextToken?: string;
}
export interface ProblemDetail {
  arn?: string;
  name?: string;
}
export interface Problem {
  run?: ProblemDetail;
  job?: ProblemDetail;
  suite?: ProblemDetail;
  test?: ProblemDetail;
  device?: Device;
  result?: ExecutionResult;
  message?: string;
}
export type Problems = Problem[];
export interface UniqueProblem {
  message?: string;
  problems?: Problem[];
}
export type UniqueProblems = UniqueProblem[];
export type UniqueProblemsByExecutionResultMap = {
  [key in ExecutionResult]?: UniqueProblem[];
};
export interface ListUniqueProblemsResult {
  uniqueProblems?: { [key: string]: UniqueProblem[] | undefined };
  nextToken?: string;
}
export interface ListUploadsRequest {
  arn: string;
  type?: UploadType;
  nextToken?: string;
}
export type Uploads = Upload[];
export interface ListUploadsResult {
  uploads?: Upload[];
  nextToken?: string;
}
export interface ListVPCEConfigurationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type VPCEConfigurations = VPCEConfiguration[];
export interface ListVPCEConfigurationsResult {
  vpceConfigurations?: VPCEConfiguration[];
  nextToken?: string;
}
export interface PurchaseOfferingRequest {
  offeringId: string;
  quantity: number;
  offeringPromotionId?: string;
}
export interface PurchaseOfferingResult {
  offeringTransaction?: OfferingTransaction;
}
export interface RenewOfferingRequest {
  offeringId: string;
  quantity: number;
}
export interface RenewOfferingResult {
  offeringTransaction?: OfferingTransaction;
}
export interface DeviceSelectionConfiguration {
  filters: DeviceFilter[];
  maxDevices: number;
}
export type AccountsCleanup = boolean;
export type AppPackagesCleanup = boolean;
export interface ExecutionConfiguration {
  jobTimeoutMinutes?: number;
  accountsCleanup?: boolean;
  appPackagesCleanup?: boolean;
  videoCapture?: boolean;
  skipAppResign?: boolean;
}
export interface ScheduleRunRequest {
  projectArn: string;
  appArn?: string;
  devicePoolArn?: string;
  deviceSelectionConfiguration?: DeviceSelectionConfiguration;
  name?: string;
  test: ScheduleRunTest;
  configuration?: ScheduleRunConfiguration;
  executionConfiguration?: ExecutionConfiguration;
}
export interface ScheduleRunResult {
  run?: Run;
}
export interface StopJobRequest {
  arn: string;
}
export interface StopJobResult {
  job?: Job;
}
export interface StopRemoteAccessSessionRequest {
  arn: string;
}
export interface StopRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export interface StopRunRequest {
  arn: string;
}
export interface StopRunResult {
  run?: Run;
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
export interface UpdateDeviceInstanceRequest {
  arn: string;
  profileArn?: string;
  labels?: string[];
}
export interface UpdateDeviceInstanceResult {
  deviceInstance?: DeviceInstance;
}
export interface UpdateDevicePoolRequest {
  arn: string;
  name?: string;
  description?: string;
  rules?: Rule[];
  maxDevices?: number;
  clearMaxDevices?: boolean;
}
export interface UpdateDevicePoolResult {
  devicePool?: DevicePool;
}
export interface UpdateInstanceProfileRequest {
  arn: string;
  name?: string;
  description?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
}
export interface UpdateInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export interface UpdateNetworkProfileRequest {
  arn: string;
  name?: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export interface UpdateNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export interface UpdateProjectRequest {
  arn: string;
  name?: string;
  defaultJobTimeoutMinutes?: number;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export interface UpdateProjectResult {
  project?: Project;
}
export interface UpdateTestGridProjectRequest {
  projectArn: string;
  name?: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
}
export interface UpdateTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export interface UpdateUploadRequest {
  arn: string;
  name?: string;
  contentType?: string;
  editContent?: boolean;
}
export interface UpdateUploadResult {
  upload?: Upload;
}
export interface UpdateVPCEConfigurationRequest {
  arn: string;
  vpceConfigurationName?: string;
  vpceServiceName?: string;
  serviceDnsName?: string;
  vpceConfigurationDescription?: string;
}
export interface UpdateVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export type ExceptionMessage = string;
export type CreateDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a device pool.
 */
export const createDevicePool: API.OperationMethod<
  CreateDevicePoolRequest,
  CreateDevicePoolResult,
  CreateDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      name: 0,
      description: 0,
      rules: D.list(i_Rule),
      maxDevices: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevicePool",
})) as any;

export type CreateInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a profile that can be applied to one or more private fleet device
 * instances.
 */
export const createInstanceProfile: API.OperationMethod<
  CreateInstanceProfileRequest,
  CreateInstanceProfileResult,
  CreateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      packageCleanup: 0,
      excludeAppPackagesFromCleanup: 0,
      rebootAfterUse: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
})) as any;

export type CreateNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a network profile.
 */
export const createNetworkProfile: API.OperationMethod<
  CreateNetworkProfileRequest,
  CreateNetworkProfileResult,
  CreateNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      name: 0,
      description: 0,
      type: 0,
      uplinkBandwidthBits: 0,
      downlinkBandwidthBits: 0,
      uplinkDelayMs: 0,
      downlinkDelayMs: 0,
      uplinkJitterMs: 0,
      downlinkJitterMs: 0,
      uplinkLossPercent: 0,
      downlinkLossPercent: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkProfile",
})) as any;

export type CreateProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | TagOperationException
  | CommonErrors;
/**
 * Creates a project.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResult,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      defaultJobTimeoutMinutes: 0,
      vpcConfig: i_VpcConfig,
      environmentVariables: D.list(i_EnvironmentVariable),
      executionRoleArn: 0,
    },
    output: { project: o_Project },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
    TagOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Specifies and starts a remote access session.
 */
export const createRemoteAccessSession: API.OperationMethod<
  CreateRemoteAccessSessionRequest,
  CreateRemoteAccessSessionResult,
  CreateRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      deviceArn: 0,
      appArn: 0,
      instanceArn: 0,
      name: 0,
      configuration: {
        auxiliaryApps: 0,
        billingMethod: 0,
        vpceConfigurationArns: 0,
        deviceProxy: i_DeviceProxy,
        parameters: 0,
      },
      interactionMode: 0,
      skipAppResign: 0,
    },
    output: { remoteAccessSession: o_RemoteAccessSession },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRemoteAccessSession",
})) as any;

export type CreateTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a Selenium testing project. Projects are used to track TestGridSession
 * instances.
 */
export const createTestGridProject: API.OperationMethod<
  CreateTestGridProjectRequest,
  CreateTestGridProjectResult,
  CreateTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, vpcConfig: i_TestGridVpcConfig },
    output: { testGridProject: o_TestGridProject },
  },
  errors: [ArgumentException, InternalServiceException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridProject",
})) as any;

export type CreateTestGridUrlError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Creates a signed, short-term URL that can be passed to a Selenium `RemoteWebDriver`
 * constructor.
 */
export const createTestGridUrl: API.OperationMethod<
  CreateTestGridUrlRequest,
  CreateTestGridUrlResult,
  CreateTestGridUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectArn: 0, expiresInSeconds: 0 },
    output: { url: D.secret, expires: D.ts },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridUrl",
})) as any;

export type CreateUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Uploads an app or test scripts.
 */
export const createUpload: API.OperationMethod<
  CreateUploadRequest,
  CreateUploadResult,
  CreateUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectArn: 0, name: 0, type: 0, contentType: 0 },
    output: { upload: o_Upload },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpload",
})) as any;

export type CreateVPCEConfigurationError =
  | ArgumentException
  | LimitExceededException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a configuration record in Device Farm for your Amazon Virtual Private Cloud
 * (VPC) endpoint.
 */
export const createVPCEConfiguration: API.OperationMethod<
  CreateVPCEConfigurationRequest,
  CreateVPCEConfigurationResult,
  CreateVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      vpceConfigurationName: 0,
      vpceServiceName: 0,
      serviceDnsName: 0,
      vpceConfigurationDescription: 0,
    },
  },
  errors: [ArgumentException, LimitExceededException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVPCEConfiguration",
})) as any;

export type DeleteDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a device pool given the pool ARN. Does not allow deletion of curated pools
 * owned by the system.
 */
export const deleteDevicePool: API.OperationMethod<
  DeleteDevicePoolRequest,
  DeleteDevicePoolResult,
  DeleteDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevicePool",
})) as any;

export type DeleteInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a profile that can be applied to one or more private device instances.
 */
export const deleteInstanceProfile: API.OperationMethod<
  DeleteInstanceProfileRequest,
  DeleteInstanceProfileResult,
  DeleteInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
})) as any;

export type DeleteNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a network profile.
 */
export const deleteNetworkProfile: API.OperationMethod<
  DeleteNetworkProfileRequest,
  DeleteNetworkProfileResult,
  DeleteNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkProfile",
})) as any;

export type DeleteProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes an AWS Device Farm project, given the project ARN. You cannot delete a project if it has an active run or session.
 *
 * You cannot undo this operation.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResult,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

export type DeleteRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a completed remote access session and its results. You cannot delete a remote access session if it is still active.
 *
 * You cannot undo this operation.
 */
export const deleteRemoteAccessSession: API.OperationMethod<
  DeleteRemoteAccessSessionRequest,
  DeleteRemoteAccessSessionResult,
  DeleteRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRemoteAccessSession",
})) as any;

export type DeleteRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes the run, given the run ARN. You cannot delete a run if it is still active.
 *
 * You cannot undo this operation.
 */
export const deleteRun: API.OperationMethod<
  DeleteRunRequest,
  DeleteRunResult,
  DeleteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRun",
})) as any;

export type DeleteTestGridProjectError =
  | ArgumentException
  | CannotDeleteException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a Selenium testing project and all content generated under it. You cannot delete a project if it has active sessions.
 *
 * You cannot undo this operation.
 */
export const deleteTestGridProject: API.OperationMethod<
  DeleteTestGridProjectRequest,
  DeleteTestGridProjectResult,
  DeleteTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { projectArn: 0 } },
  errors: [
    ArgumentException,
    CannotDeleteException,
    InternalServiceException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestGridProject",
})) as any;

export type DeleteUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes an upload given the upload ARN.
 */
export const deleteUpload: API.OperationMethod<
  DeleteUploadRequest,
  DeleteUploadResult,
  DeleteUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUpload",
})) as any;

export type DeleteVPCEConfigurationError =
  | ArgumentException
  | InvalidOperationException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a configuration for your Amazon Virtual Private Cloud (VPC) endpoint.
 */
export const deleteVPCEConfiguration: API.OperationMethod<
  DeleteVPCEConfigurationRequest,
  DeleteVPCEConfigurationResult,
  DeleteVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVPCEConfiguration",
})) as any;

export type GetAccountSettingsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns the number of unmetered iOS or unmetered Android devices that have been purchased by the
 * account.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResult,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetDeviceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a unique device type.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResult,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
})) as any;

export type GetDeviceInstanceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about a device instance that belongs to a private device fleet.
 */
export const getDeviceInstance: API.OperationMethod<
  GetDeviceInstanceRequest,
  GetDeviceInstanceResult,
  GetDeviceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceInstance",
})) as any;

export type GetDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a device pool.
 */
export const getDevicePool: API.OperationMethod<
  GetDevicePoolRequest,
  GetDevicePoolResult,
  GetDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePool",
})) as any;

export type GetDevicePoolCompatibilityError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about compatibility with a device pool.
 */
export const getDevicePoolCompatibility: API.OperationMethod<
  GetDevicePoolCompatibilityRequest,
  GetDevicePoolCompatibilityResult,
  GetDevicePoolCompatibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      devicePoolArn: 0,
      appArn: 0,
      testType: 0,
      test: i_ScheduleRunTest,
      configuration: i_ScheduleRunConfiguration,
      projectArn: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePoolCompatibility",
})) as any;

export type GetInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the specified instance profile.
 */
export const getInstanceProfile: API.OperationMethod<
  GetInstanceProfileRequest,
  GetInstanceProfileResult,
  GetInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceProfile",
})) as any;

export type GetJobError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResult,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { job: o_Job } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
})) as any;

export type GetNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about a network profile.
 */
export const getNetworkProfile: API.OperationMethod<
  GetNetworkProfileRequest,
  GetNetworkProfileResult,
  GetNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkProfile",
})) as any;

export type GetOfferingStatusError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets the current status and future status of all offerings purchased by an AWS account. The response
 * indicates how many offerings are currently available and the offerings that will be available in the next
 * period. The API returns a `NotEligible` error if the user is not permitted to invoke the
 * operation. If you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const getOfferingStatus: API.PaginatedOperationMethod<
  GetOfferingStatusRequest,
  GetOfferingStatusResult,
  GetOfferingStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0 },
    output: {
      current: D.map(o_OfferingStatus),
      nextPeriod: D.map(o_OfferingStatus),
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferingStatus",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type GetProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a project.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest,
  GetProjectResult,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: { project: o_Project },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
})) as any;

export type GetRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a link to a currently running remote access session.
 */
export const getRemoteAccessSession: API.OperationMethod<
  GetRemoteAccessSessionRequest,
  GetRemoteAccessSessionResult,
  GetRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: { remoteAccessSession: o_RemoteAccessSession },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemoteAccessSession",
})) as any;

export type GetRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a run.
 */
export const getRun: API.OperationMethod<
  GetRunRequest,
  GetRunResult,
  GetRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { run: o_Run } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRun",
})) as any;

export type GetSuiteError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a suite.
 */
export const getSuite: API.OperationMethod<
  GetSuiteRequest,
  GetSuiteResult,
  GetSuiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { suite: o_Suite } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuite",
})) as any;

export type GetTestError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a test.
 */
export const getTest: API.OperationMethod<
  GetTestRequest,
  GetTestResult,
  GetTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { test: o_Test } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
})) as any;

export type GetTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves information about a Selenium testing project.
 */
export const getTestGridProject: API.OperationMethod<
  GetTestGridProjectRequest,
  GetTestGridProjectResult,
  GetTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectArn: 0 },
    output: { testGridProject: o_TestGridProject },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridProject",
})) as any;

export type GetTestGridSessionError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * A session is an instance of a browser created through a `RemoteWebDriver` with the URL from
 * CreateTestGridUrlResult. You can use the following to look up sessions:
 *
 * - The session ARN.
 *
 * - The project ARN and a session ID.
 */
export const getTestGridSession: API.OperationMethod<
  GetTestGridSessionRequest,
  GetTestGridSessionResult,
  GetTestGridSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectArn: 0, sessionId: 0, sessionArn: 0 },
    output: { testGridSession: o_TestGridSession },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridSession",
})) as any;

export type GetUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about an upload.
 */
export const getUpload: API.OperationMethod<
  GetUploadRequest,
  GetUploadResult,
  GetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { upload: o_Upload } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpload",
})) as any;

export type GetVPCEConfigurationError =
  | ArgumentException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the configuration settings for your Amazon Virtual Private
 * Cloud (VPC) endpoint.
 */
export const getVPCEConfiguration: API.OperationMethod<
  GetVPCEConfigurationRequest,
  GetVPCEConfigurationResult,
  GetVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [ArgumentException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVPCEConfiguration",
})) as any;

export type InstallToRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Installs an application to the device in a remote access session. For Android
 * applications, the file must be in .apk format. For iOS applications, the file must be in
 * .ipa format.
 */
export const installToRemoteAccessSession: API.OperationMethod<
  InstallToRemoteAccessSessionRequest,
  InstallToRemoteAccessSessionResult,
  InstallToRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { remoteAccessSessionArn: 0, appArn: 0 },
    output: { appUpload: o_Upload },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InstallToRemoteAccessSession",
})) as any;

export type ListArtifactsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about artifacts.
 */
export const listArtifacts: API.PaginatedOperationMethod<
  ListArtifactsRequest,
  ListArtifactsResult,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient,
  Artifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { arn: 0, type: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifacts",
  } as const,
})) as any;

export type ListDeviceInstancesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the private device instances associated with one or more AWS
 * accounts.
 */
export const listDeviceInstances: API.OperationMethod<
  ListDeviceInstancesRequest,
  ListDeviceInstancesResult,
  ListDeviceInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { maxResults: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceInstances",
})) as any;

export type ListDevicePoolsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about device pools.
 */
export const listDevicePools: API.PaginatedOperationMethod<
  ListDevicePoolsRequest,
  ListDevicePoolsResult,
  ListDevicePoolsError,
  Credentials | HttpClient.HttpClient,
  DevicePool
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { arn: 0, type: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicePools",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devicePools",
  } as const,
})) as any;

export type ListDevicesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about unique device types.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResult,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  Device
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0, filters: D.list(i_DeviceFilter) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
  } as const,
})) as any;

export type ListInstanceProfilesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about all the instance profiles in an AWS account.
 */
export const listInstanceProfiles: API.OperationMethod<
  ListInstanceProfilesRequest,
  ListInstanceProfilesResult,
  ListInstanceProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { maxResults: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfiles",
})) as any;

export type ListJobsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about jobs for a given test run.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { jobs: D.list(o_Job) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
  } as const,
})) as any;

export type ListNetworkProfilesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns the list of available network profiles.
 */
export const listNetworkProfiles: API.OperationMethod<
  ListNetworkProfilesRequest,
  ListNetworkProfilesResult,
  ListNetworkProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, type: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkProfiles",
})) as any;

export type ListOfferingPromotionsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of offering promotions. Each offering promotion record contains the ID and description
 * of the promotion. The API returns a `NotEligible` error if the caller is not permitted to invoke
 * the operation. Contact aws-devicefarm-support@amazon.com if you must be able to invoke this operation.
 */
export const listOfferingPromotions: API.OperationMethod<
  ListOfferingPromotionsRequest,
  ListOfferingPromotionsResult,
  ListOfferingPromotionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferingPromotions",
})) as any;

export type ListOfferingsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of products or offerings that the user can manage through the API. Each offering record
 * indicates the recurring price per unit and the frequency for that offering. The API returns a
 * `NotEligible` error if the user is not permitted to invoke the operation. If you must be
 * able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const listOfferings: API.PaginatedOperationMethod<
  ListOfferingsRequest,
  ListOfferingsResult,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offerings",
  } as const,
})) as any;

export type ListOfferingTransactionsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of all historical purchases, renewals, and system renewal transactions for an AWS
 * account. The list is paginated and ordered by a descending timestamp (most recent transactions are first).
 * The API returns a `NotEligible` error if the user is not permitted to invoke the operation. If
 * you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const listOfferingTransactions: API.PaginatedOperationMethod<
  ListOfferingTransactionsRequest,
  ListOfferingTransactionsResult,
  ListOfferingTransactionsError,
  Credentials | HttpClient.HttpClient,
  OfferingTransaction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0 },
    output: { offeringTransactions: D.list(o_OfferingTransaction) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferingTransactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offeringTransactions",
  } as const,
})) as any;

export type ListProjectsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResult,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  Project
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { projects: D.list(o_Project) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projects",
  } as const,
})) as any;

export type ListRemoteAccessSessionsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of all currently running remote access sessions.
 */
export const listRemoteAccessSessions: API.OperationMethod<
  ListRemoteAccessSessionsRequest,
  ListRemoteAccessSessionsResult,
  ListRemoteAccessSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { remoteAccessSessions: D.list(o_RemoteAccessSession) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRemoteAccessSessions",
})) as any;

export type ListRunsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about runs, given an AWS Device Farm project ARN.
 */
export const listRuns: API.PaginatedOperationMethod<
  ListRunsRequest,
  ListRunsResult,
  ListRunsError,
  Credentials | HttpClient.HttpClient,
  Run
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { runs: D.list(o_Run) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "runs",
  } as const,
})) as any;

export type ListSamplesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about samples, given an AWS Device Farm job ARN.
 *
 * Device Farm does not support performance data samples during test executions.
 */
export const listSamples: API.PaginatedOperationMethod<
  ListSamplesRequest,
  ListSamplesResult,
  ListSamplesError,
  Credentials | HttpClient.HttpClient,
  Sample
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { arn: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSamples",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "samples",
  } as const,
})) as any;

export type ListSuitesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about test suites for a given job.
 */
export const listSuites: API.PaginatedOperationMethod<
  ListSuitesRequest,
  ListSuitesResult,
  ListSuitesError,
  Credentials | HttpClient.HttpClient,
  Suite
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { suites: D.list(o_Suite) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuites",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "suites",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | CommonErrors;
/**
 * List the tags for an AWS Device Farm resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTestGridProjectsError =
  | ArgumentException
  | InternalServiceException
  | CommonErrors;
/**
 * Gets a list of all Selenium testing projects in your account.
 */
export const listTestGridProjects: API.PaginatedOperationMethod<
  ListTestGridProjectsRequest,
  ListTestGridProjectsResult,
  ListTestGridProjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResult: 0, nextToken: 0 },
    output: { testGridProjects: D.list(o_TestGridProject) },
  },
  errors: [ArgumentException, InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionActionsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of the actions taken in a TestGridSession.
 */
export const listTestGridSessionActions: API.PaginatedOperationMethod<
  ListTestGridSessionActionsRequest,
  ListTestGridSessionActionsResult,
  ListTestGridSessionActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sessionArn: 0, maxResult: 0, nextToken: 0 },
    output: { actions: D.list({ started: D.ts }) },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionArtifactsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a list of artifacts created during the session.
 */
export const listTestGridSessionArtifacts: API.PaginatedOperationMethod<
  ListTestGridSessionArtifactsRequest,
  ListTestGridSessionArtifactsResult,
  ListTestGridSessionArtifactsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sessionArn: 0, type: 0, maxResult: 0, nextToken: 0 },
    output: { artifacts: D.list({ url: D.secret }) },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a list of sessions for a TestGridProject.
 */
export const listTestGridSessions: API.PaginatedOperationMethod<
  ListTestGridSessionsRequest,
  ListTestGridSessionsResult,
  ListTestGridSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      status: 0,
      creationTimeAfter: 0,
      creationTimeBefore: 0,
      endTimeAfter: 0,
      endTimeBefore: 0,
      maxResult: 0,
      nextToken: 0,
    },
    output: { testGridSessions: D.list(o_TestGridSession) },
  },
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about tests in a given test suite.
 */
export const listTests: API.PaginatedOperationMethod<
  ListTestsRequest,
  ListTestsResult,
  ListTestsError,
  Credentials | HttpClient.HttpClient,
  Test
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, nextToken: 0 },
    output: { tests: D.list(o_Test) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tests",
  } as const,
})) as any;

export type ListUniqueProblemsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about unique problems, such as exceptions or crashes.
 *
 * Unique problems are defined as a single instance of an error across a run, job, or suite. For example,
 * if a call in your application consistently raises an exception (OutOfBoundsException in
 * MyActivity.java:386), `ListUniqueProblems` returns a single entry instead of many
 * individual entries for that exception.
 */
export const listUniqueProblems: API.PaginatedOperationMethod<
  ListUniqueProblemsRequest,
  ListUniqueProblemsResult,
  ListUniqueProblemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { arn: 0, nextToken: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUniqueProblems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uniqueProblems",
  } as const,
})) as any;

export type ListUploadsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about uploads, given an AWS Device Farm project ARN.
 */
export const listUploads: API.PaginatedOperationMethod<
  ListUploadsRequest,
  ListUploadsResult,
  ListUploadsError,
  Credentials | HttpClient.HttpClient,
  Upload
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, type: 0, nextToken: 0 },
    output: { uploads: D.list(o_Upload) },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUploads",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uploads",
  } as const,
})) as any;

export type ListVPCEConfigurationsError =
  | ArgumentException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about all Amazon Virtual Private Cloud (VPC) endpoint
 * configurations in the AWS account.
 */
export const listVPCEConfigurations: API.OperationMethod<
  ListVPCEConfigurationsRequest,
  ListVPCEConfigurationsResult,
  ListVPCEConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { maxResults: 0, nextToken: 0 } },
  errors: [ArgumentException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCEConfigurations",
})) as any;

export type PurchaseOfferingError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Immediately purchases offerings for an AWS account. Offerings renew with the latest total purchased
 * quantity for an offering, unless the renewal was overridden. The API returns a `NotEligible`
 * error if the user is not permitted to invoke the operation. If you must be able to invoke this operation,
 * contact aws-devicefarm-support@amazon.com.
 */
export const purchaseOffering: API.OperationMethod<
  PurchaseOfferingRequest,
  PurchaseOfferingResult,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { offeringId: 0, quantity: 0, offeringPromotionId: 0 },
    output: { offeringTransaction: o_OfferingTransaction },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
})) as any;

export type RenewOfferingError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Explicitly sets the quantity of devices to renew for an offering, starting from the
 * `effectiveDate` of the next period. The API returns a `NotEligible` error if the
 * user is not permitted to invoke the operation. If you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const renewOffering: API.OperationMethod<
  RenewOfferingRequest,
  RenewOfferingResult,
  RenewOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { offeringId: 0, quantity: 0 },
    output: { offeringTransaction: o_OfferingTransaction },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewOffering",
})) as any;

export type ScheduleRunError =
  | ArgumentException
  | IdempotencyException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Schedules a run.
 */
export const scheduleRun: API.OperationMethod<
  ScheduleRunRequest,
  ScheduleRunResult,
  ScheduleRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      appArn: 0,
      devicePoolArn: 0,
      deviceSelectionConfiguration: {
        filters: D.list(i_DeviceFilter),
        maxDevices: 0,
      },
      name: 0,
      test: i_ScheduleRunTest,
      configuration: i_ScheduleRunConfiguration,
      executionConfiguration: {
        jobTimeoutMinutes: 0,
        accountsCleanup: 0,
        appPackagesCleanup: 0,
        videoCapture: 0,
        skipAppResign: 0,
      },
    },
    output: { run: o_Run },
  },
  errors: [
    ArgumentException,
    IdempotencyException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ScheduleRun",
})) as any;

export type StopJobError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Initiates a stop request for the current job. AWS Device Farm immediately stops the job on the device
 * where tests have not started. You are not billed for this device. On the device where tests have started,
 * setup suite and teardown suite tests run to completion on the device. You are billed for setup, teardown,
 * and any tests that were in progress or already completed.
 */
export const stopJob: API.OperationMethod<
  StopJobRequest,
  StopJobResult,
  StopJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { job: o_Job } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
})) as any;

export type StopRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Ends a specified remote access session.
 */
export const stopRemoteAccessSession: API.OperationMethod<
  StopRemoteAccessSessionRequest,
  StopRemoteAccessSessionResult,
  StopRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: { remoteAccessSession: o_RemoteAccessSession },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRemoteAccessSession",
})) as any;

export type StopRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Initiates a stop request for the current test run. AWS Device Farm immediately stops the run on devices
 * where tests have not started. You are not billed for these devices. On devices where tests have started
 * executing, setup suite and teardown suite tests run to completion on those devices. You are billed for
 * setup, teardown, and any tests that were in progress or already completed.
 */
export const stopRun: API.OperationMethod<
  StopRunRequest,
  StopRunResult,
  StopRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { run: o_Run } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRun",
})) as any;

export type TagResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags
 * on a resource are not specified in the request parameters, they are not changed. When a resource is deleted,
 * the tags associated with that resource are also deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, Tags: D.list({ Key: 0, Value: 0 }) },
  },
  errors: [
    ArgumentException,
    NotFoundException,
    TagOperationException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | CommonErrors;
/**
 * Deletes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDeviceInstanceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about a private device instance.
 */
export const updateDeviceInstance: API.OperationMethod<
  UpdateDeviceInstanceRequest,
  UpdateDeviceInstanceResult,
  UpdateDeviceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, profileArn: 0, labels: 0 } },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceInstance",
})) as any;

export type UpdateDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Modifies the name, description, and rules in a device pool given the attributes and
 * the pool ARN. Rule updates are all-or-nothing, meaning they can only be updated as a
 * whole (or not at all).
 */
export const updateDevicePool: API.OperationMethod<
  UpdateDevicePoolRequest,
  UpdateDevicePoolResult,
  UpdateDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      description: 0,
      rules: D.list(i_Rule),
      maxDevices: 0,
      clearMaxDevices: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevicePool",
})) as any;

export type UpdateInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about an existing private device instance profile.
 */
export const updateInstanceProfile: API.OperationMethod<
  UpdateInstanceProfileRequest,
  UpdateInstanceProfileResult,
  UpdateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      description: 0,
      packageCleanup: 0,
      excludeAppPackagesFromCleanup: 0,
      rebootAfterUse: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceProfile",
})) as any;

export type UpdateNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates the network profile.
 */
export const updateNetworkProfile: API.OperationMethod<
  UpdateNetworkProfileRequest,
  UpdateNetworkProfileResult,
  UpdateNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      description: 0,
      type: 0,
      uplinkBandwidthBits: 0,
      downlinkBandwidthBits: 0,
      uplinkDelayMs: 0,
      downlinkDelayMs: 0,
      uplinkJitterMs: 0,
      downlinkJitterMs: 0,
      uplinkLossPercent: 0,
      downlinkLossPercent: 0,
    },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkProfile",
})) as any;

export type UpdateProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Modifies the specified project name, given the project ARN and a new
 * name.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResult,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      defaultJobTimeoutMinutes: 0,
      vpcConfig: i_VpcConfig,
      environmentVariables: D.list(i_EnvironmentVariable),
      executionRoleArn: 0,
    },
    output: { project: o_Project },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

export type UpdateTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Change details of a project.
 */
export const updateTestGridProject: API.OperationMethod<
  UpdateTestGridProjectRequest,
  UpdateTestGridProjectResult,
  UpdateTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectArn: 0,
      name: 0,
      description: 0,
      vpcConfig: i_TestGridVpcConfig,
    },
    output: { testGridProject: o_TestGridProject },
  },
  errors: [
    ArgumentException,
    InternalServiceException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestGridProject",
})) as any;

export type UpdateUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates an uploaded test spec.
 */
export const updateUpload: API.OperationMethod<
  UpdateUploadRequest,
  UpdateUploadResult,
  UpdateUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, name: 0, contentType: 0, editContent: 0 },
    output: { upload: o_Upload },
  },
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUpload",
})) as any;

export type UpdateVPCEConfigurationError =
  | ArgumentException
  | InvalidOperationException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about an Amazon Virtual Private Cloud (VPC) endpoint configuration.
 */
export const updateVPCEConfiguration: API.OperationMethod<
  UpdateVPCEConfigurationRequest,
  UpdateVPCEConfigurationResult,
  UpdateVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      vpceConfigurationName: 0,
      vpceServiceName: 0,
      serviceDnsName: 0,
      vpceConfigurationDescription: 0,
    },
  },
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVPCEConfiguration",
})) as any;

const i_DeviceFilter: D.LazyStruct = () => ({
  attribute: 0,
  operator: 0,
  values: 0,
});
const i_DeviceProxy: D.LazyStruct = () => ({ host: 0, port: 0 });
const i_EnvironmentVariable: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_Rule: D.LazyStruct = () => ({ attribute: 0, operator: 0, value: 0 });
const i_ScheduleRunConfiguration: D.LazyStruct = () => ({
  extraDataPackageArn: 0,
  networkProfileArn: 0,
  locale: 0,
  location: { latitude: 0, longitude: 0 },
  vpceConfigurationArns: 0,
  deviceProxy: i_DeviceProxy,
  customerArtifactPaths: { iosPaths: 0, androidPaths: 0, deviceHostPaths: 0 },
  radios: { wifi: 0, bluetooth: 0, nfc: 0, gps: 0 },
  auxiliaryApps: 0,
  billingMethod: 0,
  environmentVariables: D.list(i_EnvironmentVariable),
  executionRoleArn: 0,
  insightsTypes: 0,
});
const i_ScheduleRunTest: D.LazyStruct = () => ({
  type: 0,
  testPackageArn: 0,
  testSpecArn: 0,
  filter: 0,
  parameters: 0,
});
const i_TestGridVpcConfig: D.LazyStruct = () => ({
  securityGroupIds: 0,
  subnetIds: 0,
  vpcId: 0,
});
const i_VpcConfig: D.LazyStruct = () => ({
  securityGroupIds: 0,
  subnetIds: 0,
  vpcId: 0,
});
const o_Job: D.LazyStruct = () => ({
  created: D.ts,
  started: D.ts,
  stopped: D.ts,
  insights: { testReport: { testDetailsUrl: D.secret } },
});
const o_OfferingStatus: D.LazyStruct = () => ({ effectiveOn: D.ts });
const o_OfferingTransaction: D.LazyStruct = () => ({
  offeringStatus: o_OfferingStatus,
  createdOn: D.ts,
});
const o_Project: D.LazyStruct = () => ({ created: D.ts });
const o_RemoteAccessSession: D.LazyStruct = () => ({
  created: D.ts,
  started: D.ts,
  stopped: D.ts,
  endpoints: { remoteDriverEndpoint: D.secret, interactiveEndpoint: D.secret },
});
const o_Run: D.LazyStruct = () => ({
  created: D.ts,
  started: D.ts,
  stopped: D.ts,
  insights: { jobReport: { jobDetailsUrl: D.secret } },
});
const o_Suite: D.LazyStruct = () => ({
  created: D.ts,
  started: D.ts,
  stopped: D.ts,
});
const o_Test: D.LazyStruct = () => ({
  created: D.ts,
  started: D.ts,
  stopped: D.ts,
});
const o_TestGridProject: D.LazyStruct = () => ({ created: D.ts });
const o_TestGridSession: D.LazyStruct = () => ({ created: D.ts, ended: D.ts });
const o_Upload: D.LazyStruct = () => ({ created: D.ts, url: D.secret });
